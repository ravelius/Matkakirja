/*
 * HISTORIAN HETKET KARTALLA — kuuluisa hetki omana kohdemerkkinään.
 *
 * Raamatun kirjaus (SYMBOLITAKSONOMIA → Historian hetket): kartan
 * selitevalikko saa yhdeksännen rivin, tiimalasin, ja sen takana on
 * uusi nostolaji — havainnekuva hetkestä, jossa katsoja on paikalla
 * silmien korkeudella. Data on js/packs/historian-hetket.js; tämä
 * moduuli piirtää kartalle merkityt hetket ja avaa kortin.
 *
 * REITTI ON YHTENÄISEN KOHDEMALLIN MUKAINEN ja seuraa skandaaleja
 * (js/skandaalit.js) rivi riviltä: hetki on kohteiden kerroksen
 * tavallinen lisäkohde (js/fokuskohteet.js rekisteroiLisakohteet),
 * joka löytyy selitevalikon aihevalolla oman symbolinsa kautta — ei
 * uutta merkkilajia, ei uutta mekaniikkaa, ei omaa kerrosta. Laudalle
 * projisoidaan ajossa (js/fokusmitat.js projisoiLaudalle), joten sama
 * data palvelee jokaista lautaa, ja elävä ruutukatto ja nimiö tulevat
 * kohdekerrokselta sellaisinaan (js/nostoladonta.js).
 *
 * ── MIKÄ EROAA SKANDAALEISTA ───────────────────────────────────────
 *
 *   1. KORTISSA ON KUVA, JA NIITÄ VOI OLLA KOLME. Hetkellä on
 *      kuvalista (js/packs/historian-hetket.js `kuvat`): lähikuva
 *      ihmisistä, kaukokuva koko kohtauksesta ja neljällä hetkellä
 *      kolmantena aikakauden lehtisivun rekonstruktio. Kortti näyttää
 *      listan ensimmäisen isona ja tarjoaa lopuille selailunuolet ja
 *      laskurin — sama malli kuin lehden nostogalleriassa (js/ui.js
 *      kaariNostoGalleria). Kuvan alla on kuvateksti ja lähderivi,
 *      jonka "Matkakirjan havainnekuva" -maininnasta kasvaa painettava
 *      selite (js/havainnekuva.js js/tekijakortti.js taytaLahderivi).
 *
 *      LEHTIKUVA ON PYSTYKUVA (1024 × 1536), ja se on ainoa kohta,
 *      jossa kortin kuvakehyksen on kestettävä pystysuhde. Kuva
 *      mitoittuu korkeuskattoon ja kapenee keskelle (css/fokusnosto.css
 *      `.fokusnosto-kuva img`), ja kuvanappi kutistuu kuvan levyiseksi,
 *      jotta selailunuolet ja laskuri pysyvät kuvan päällä eivätkä
 *      leiju sen viereisessä tyhjässä. Vartija:
 *      tools/savukkeet/savuke-historian-hetket.mjs.
 *   2. KAIKKI HETKET EIVÄT OLE KARTALLA. Hetki on kartalla
 *      (`kartalla: true`), ellei sen pistettä voi projisoida laudalle
 *      lainkaan; poikkeukset on merkitty datassa
 *      `kartanUlkopuolella`-lipulla ja ne asuvat pelkästään lehdessä.
 *      Suodatus on datassa eikä täällä.
 *   3. MINITEHTÄVÄAVAIN on hetki:<id> (kirjanpito game.js
 *      actionMinitehtava, koko avain <lauta>:<maa>:hetki:<id>), ja
 *      palkkio on sama TAKY_PALKKIO kuin skandaalilla ja
 *      syvennysvisassa — sisarmekaniikka, sama hinta. Julistetta ei
 *      myönnetä: juliste on kaupungin palkinto.
 *
 * ── NIMET ON PREFIKSOITU ───────────────────────────────────────────
 *
 * Yhden tiedoston versio ketjuttaa moduulit samaan näkyvyysalueeseen
 * (tools/tarkista-niputus.mjs), joten kaikki top-level-nimet alkavat
 * HETKI_/hetki-etuliitteellä.
 */
import {
  fokusmoodiPaalla, html, jaaKappaleiksi, nielaiseSulkevaNapautus, TOAST_MS,
} from './ui-apurit.js';
import { natiiviVastaus } from './natiivi.js';
import { HISTORIAN_HETKET, hetkenKuvat } from './packs/historian-hetket.js';
import {
  avaaKohdeSuurennos, rekisteroiLisakohteet, rekisteroiMaanKohteet,
} from './fokuskohteet.js';
import { nostosymKortinYlarivi } from './fokusnosto-symbolit.js';
import { nostokuvaAloita } from './nostokuva.js';
import { TAKY_PALKKIO } from './fokusvirta.js';
import { projisoiLaudalle } from './fokusmitat.js';
import { taytaLahderivi } from './tekijakortti.js';
import { kuvatekstiLyhyt } from './kuvatekstit.js';
import { sfx } from './sound.js';
import { lisaaLukijanappi } from './lukija.js';

/*
 * KAKSI TYYLITIEDOSTOA, MOLEMMAT LAINASSA — sama järjestely ja sama
 * perustelu kuin skandaaleilla (js/skandaalit.js): kortin sisus on
 * täkynoston (css/fokusnosto.css) ja minivisa fokusvirran
 * (css/fokusvirta.css) luokkia, ja tunnukset ovat samat kuin
 * omistajilla, joten kumpikin tiedosto ladataan sivulle enintään
 * kerran. Yhden tiedoston versiossa tyylit ovat jo <style>-lohkossa.
 */
const HETKI_TYYLIT = [
  ['fokusnosto-tyyli', 'fokusnosto.css'],
  ['fokusvirta-tyyli', 'fokusvirta.css'],
];

function hetkiLataaTyyli() {
  if (typeof document === 'undefined') return;
  const peruslinkki = document.querySelector('link[rel="stylesheet"][href*="styles.css"]');
  if (!peruslinkki) return;
  for (const [tunnus, tiedosto] of HETKI_TYYLIT) {
    if (document.getElementById(tunnus)) continue;
    const linkki = document.createElement('link');
    linkki.id = tunnus;
    linkki.rel = 'stylesheet';
    linkki.href = new URL(tiedosto, peruslinkki.href).href;
    document.head.appendChild(linkki);
  }
}

/* ==================== MERKIT KOHDEKERROKSEEN ==================== */

/**
 * MAAN HISTORIAN HETKET KARTTARIVEIKSI — LAUDAN DATASTA, ILMAN PELIÄ.
 *
 * Viety ulos samasta syystä kuin skandaaleilla (js/skandaalit.js
 * skandaaliKarttarivit): laattageneraattori polttaa nämä merkit, ja
 * niiden tunnus, nimi, symboli ja paikka on saatava samasta koodista
 * kuin pelin oma merkki.
 */
export function hetkiKarttarivit(iso, lauta) {
  const rivit = [];
  for (const hetki of HISTORIAN_HETKET) {
    if (!hetki.kartalla || hetki.iso !== iso) continue;
    const paikka = projisoiLaudalle(lauta, hetki.lon, hetki.lat);
    if (!paikka) continue;
    rivit.push({
      hetki,
      kohde: {
        id: `hetki-${hetki.id}`,
        nimi: hetki.nimio ?? hetki.otsikko,
        nimio: hetki.nimio ?? null,
        tyyppi: 'hetki',
        symboli: 'hetki',
        // Kaupunkinostojen katto ei koske hetkeä, joka ei mahdu
        // kaupungin kohdekartalle (js/fokuskohteet.js, KATTOVAPAA).
        ...(hetki.kattoVapaa ? { kattoVapaa: true } : {}),
      },
      paikka: { x: paikka.x, y: paikka.y },
    });
  }
  return rivit;
}

/**
 * NYKYISEN MAAN HETKET LISÄKOHTEIKSI.
 *
 * Sama näkyvyysehto kuin skandaaleilla (js/skandaalit.js
 * skandaaliLisakohteet): fokusmoodi päällä ja pelaaja ihminen. Maa
 * luetaan laudan omasta taulusta (cityCountry) — kartta näyttää maan,
 * joten maan kaikki hetket piirtyvät yhtä aikaa.
 */
function hetkiLisakohteet(ui) {
  if (typeof document === 'undefined') return [];
  if (!ui || ui.dead || ui.katselu) return [];
  const city = ui.game?.cityOf?.();
  if (!city || ui.game.player?.isBot) return [];
  if (!fokusmoodiPaalla()) return [];
  const iso = ui.game.pack?.map?.cityCountry?.[city.id] || null;
  if (!iso) return [];
  return hetkiKarttarivit(iso, ui.game.pack?.id)
    .map(({ hetki, kohde, paikka }) => ({
      kohde: {
        ...kohde,
        avaa: (kaytto) => avaaHetki(kaytto ?? ui, iso, hetki),
      },
      paikka,
    }));
}

/* ==================== KORTTI ==================== */

/**
 * HISTORIAN HETKEN KORTTI — ylärivi, otsikko, paikka–päiväys-rivi,
 * kuva(t), teksti ja minivisa.
 *
 * Kortti on kartan päällä kelluva paperi, ei koko ruudun modaali —
 * sama sääntö, samat sisusluokat ja sama sulkusopimus kuin
 * skandaalilla (js/skandaalit.js avaaSkandaali). Ulkokuori on oma
 * (`hetki-*`), koska kukin korttiperhe siivoaa omat kerroksensa
 * valitsimella.
 */
export function avaaHetki(ui, iso, hetki) {
  if (!hetki) return;
  sfx.play('paper');
  hetkiLataaTyyli();
  suljeHetki(ui);

  const kerros = html('div', 'hetki-kerros');
  const kortti = html('div', 'hetki-kortti');
  kortti.setAttribute('role', 'dialog');
  kortti.setAttribute('aria-modal', 'false');
  kortti.setAttribute('aria-label', hetki.otsikko ?? 'Historian hetki');

  const sulje = html('button', 'fokusnosto-kortti-sulje', '✕');
  sulje.type = 'button';
  sulje.title = 'Sulje';
  sulje.setAttribute('aria-label', 'Sulje');
  kortti.appendChild(sulje);

  const sisalto = html('div', 'fokusnosto-sisalto');
  const latoHetki = (kotelo, kuvakehys) => {
    // Kohdemallin yhteinen ylärivi: aihesymboli ja luokan nimi.
    kotelo.appendChild(nostosymKortinYlarivi('hetki', 'fokusnosto-ylarivi'));
    piirraHetkenSisus(ui, kotelo, iso, hetki, kuvakehys);
  };

  kortti.appendChild(sisalto);
  kerros.appendChild(kortti);
  /*
   * KERROS DOMIIN ENNEN KUVAESITTELYÄ: js/nostokuva.js mittaa kortin ja
   * kuvan oikeista ruutulaatikoista, eikä irrallisella elementillä ole
   * laatikkoa lainkaan.
   */
  document.body.appendChild(kerros);
  /*
   * KUVA EDELLÄ (omistaja 11.9.2026, js/nostokuva.js). Hetki avautuu
   * ensin pelkkänä isona kuvana — sarjan ENSIMMÄISENÄ, ilman nuolia —
   * ja "Lisää" latoo kortin SAMAN kuvan ympärille. Nuolet ja laskuri
   * ilmaantuvat silloin saman kuvan päälle (ks. piirraHetkenKuvat).
   */
  const paakuva = hetkenKuvat(hetki)[0] ?? null;
  let kuvakehysRef = null;
  const kaksivaihe = paakuva ? nostokuvaAloita({
    kortti,
    sisalto,
    kuva: paakuva,
    aseta: (img, leveys, onVirhe) => {
      // Hetken kuvat ovat ämpärin valmiita osoitteita: ei thumb-putkea
      // eikä varareittiä, joten virhe luovuttaa heti (ks. hetkenKuvat).
      img.addEventListener('error', () => onVirhe(), { once: true });
      img.src = paakuva.osoite;
    },
    // Suurennos näyttää sen kuvan, joka on kohdalla — galleria
    // kirjoittaa valintansa kuvakehykseen (kehys.nostokuvaKuva).
    avaaSuurennos: (nappi) => avaaKohdeSuurennos(
      ui, kuvakehysRef?.nostokuvaKuva ?? paakuva, () => nappi, 'hetkiZoom',
    ),
    latoNosto: latoHetki,
  }) : null;
  kuvakehysRef = kaksivaihe?.kehys ?? null;
  if (!kaksivaihe) latoHetki(sisalto, undefined);
  // Kaiutin kortin otsikkoriville (js/lukija.js lisaaLukijanappi).
  lisaaLukijanappi(kortti, { otsikko: 'Kuuntele hetki' });

  const kiinni = () => {
    sfx.play('paper');
    suljeHetki(ui);
  };
  sulje.addEventListener('click', kiinni);
  // Napautus kortin ULKOPUOLELLE sulkee; nielu estää saman napautuksen
  // valumisen kartalle (ks. ui-apurit nielaiseSulkevaNapautus).
  kerros.addEventListener('pointerdown', (tapahtuma) => {
    if (tapahtuma.target?.closest?.('.hetki-kortti')) return;
    nielaiseSulkevaNapautus(tapahtuma);
    kiinni();
  });
  const nappain = (tapahtuma) => {
    if (tapahtuma.key !== 'Escape') return;
    /*
     * KUVAN SUURENNOS SULKEUTUU ENSIN. Kortin kuuntelija on
     * rekisteröity ennen suurennoksen omaa (js/fokuskohteet.js
     * avaaKohdeSuurennos) ja ehtisi siis ensin — sama väistösääntö
     * kuin eläintäyn kortilla (js/elaintaky.js).
     */
    if (ui?.hetkiZoom) return;
    tapahtuma.stopPropagation();
    suljeHetki(ui);
  };
  document.addEventListener('keydown', nappain, true);

  ui.hetkiKortti = {
    kerros,
    purku: () => document.removeEventListener('keydown', nappain, true),
  };
  void kerros.offsetWidth;
  kerros.classList.add('hetki-auki');
}

/**
 * HETKEN SISUS — otsikko, paikka–päiväys-rivi, kuvat, teksti ja visa.
 *
 * Erotettu omaksi funktiokseen samasta syystä kuin skandaalilla: sama
 * sisus latoutuu joko oman kortin ylärivin alle tai osiona
 * yhdistetyllä lehdellä (js/fokuskohteet.js piirraRyhmanOsiot).
 *
 * @param {Element|null} [valmisKuva] KUVA EDELLÄ -avauksen valmis
 *   kuvakehys (js/nostokuva.js): `undefined` piirtää kuvat kuten ennen,
 *   elementti ottaa juuri sen kehyksen gallerian pääkuvaksi, ja `null`
 *   jättää pääkuvan pois — kuvaesittely peruttiin, koska kuva ei
 *   latautunut.
 */
function piirraHetkenSisus(ui, sailio, iso, hetki, valmisKuva) {
  hetkiLataaTyyli();
  sailio.appendChild(html('h3', 'fokusnosto-kortti-otsikko', hetki.otsikko));
  /*
   * PAIKKA JA PÄIVÄYS lähderivin luokalla otsikon alle — hiljainen
   * pikkurivi, ei uutta UI-kieltä (sama ratkaisu kuin skandaalilla).
   * Rivi ladotaan tyhjänä ja täytetään tekstillä, jottei se näytä
   * apurin ohi kirjoitetulta lähderiviltä (tests/havainnekuva.test.mjs).
   */
  const meta = [hetki.paikka, hetki.paivays].filter(Boolean).join(' · ');
  if (meta) {
    const metarivi = html('p', 'fokusnosto-lahde');
    metarivi.textContent = meta;
    sailio.appendChild(metarivi);
  }
  piirraHetkenKuvat(ui, sailio, hetki, valmisKuva);
  const teksti = html('div', 'fokusnosto-teksti');
  for (const kappale of jaaKappaleiksi(hetki.teksti ?? '')) {
    teksti.appendChild(html('p', '', kappale));
  }
  sailio.appendChild(teksti);
  piirraHetkiVisa(ui, sailio, iso, hetki);
}

/**
 * KORTIN KUVAT — pääkuva isona, loput selailunuolilla.
 *
 * Kuva haetaan VASTA TÄSSÄ eli kortin avautuessa: havainnekuvat ovat
 * satojen kilotavujen kokoisia eivätkä ne ole palvelutyöntekijän
 * esilatauksessa (sama sääntö kuin eläintäyllä, js/elaintaky.js).
 * Rikkinäinen tai lataamaton kuva piilottaa kehyksensä — teksti kantaa
 * kortin yksinkin.
 *
 * NUOLET ILMESTYVÄT VASTA KAHDESTA KUVASTA. Jokaisella hetkellä on
 * lähikuva ja kaukokuva, joten nuolet ovat aina näkyvissä; neljällä
 * hetkellä kolmas kuva on aikakauden lehtisivu, ja laskuri sanoo "1 / 3".
 */
function piirraHetkenKuvat(ui, sailio, hetki, valmisKuva) {
  const kaikki = hetkenKuvat(hetki);
  if (!kaikki.length) return;
  /*
   * PERUTTU KUVAESITTELY VIE VAIN PÄÄKUVAN (sama sääntö kuin
   * skandaalilla): sarjan loput kuvat ovat olemassa, joten ne ladotaan
   * tavalliseen tapaan eikä koko sarja katoa yhden puuttuvan takia.
   */
  const kuvat = valmisKuva === null ? kaikki.slice(1) : kaikki;
  if (!kuvat.length) return;

  /*
   * VALMIS KUVAKEHYS ON GALLERIAN PÄÄKUVA (js/nostokuva.js): sama
   * figure, sama nappi, sama img ja sama src kuin vaiheessa 1 — kuva ei
   * liiku eikä lataudu uudestaan, ja nuolet, laskuri sekä kuvatekstin
   * päivitys tulevat sen ympärille.
   */
  const kehys = valmisKuva ?? html('figure', 'fokusnosto-kuva hetki-kuva');
  const nappi = valmisKuva
    ? valmisKuva.querySelector('.nostokuva-nappi')
    : html('button', 'fokusnosto-kuvanappi');
  const img = valmisKuva
    ? valmisKuva.querySelector('.nostokuva-img')
    : document.createElement('img');
  if (valmisKuva) kehys.classList.add('hetki-kuva');
  else {
    nappi.type = 'button';
    nappi.title = 'Katso kuva suurempana';
    img.decoding = 'async';
    img.loading = 'lazy';
    img.draggable = false;
    img.addEventListener('error', () => { kehys.hidden = true; }, { once: true });
    nappi.appendChild(img);
    kehys.appendChild(nappi);
  }

  const selite = valmisKuva
    ? valmisKuva.querySelector('.nostokuva-teksti')
    : html('span', 'fokusnosto-kuvaselite');
  const lahde = valmisKuva
    ? valmisKuva.querySelector('.nostokuva-lahde')
    : html('span', 'fokusnosto-kuvalahde');
  if (!valmisKuva) {
    const teksti = html('figcaption', 'fokusnosto-kuvateksti');
    teksti.append(selite, lahde);
    kehys.appendChild(teksti);
  }

  let kohdalla = 0;
  /**
   * @param {boolean} [lataa] `false` jättää kuvan koskematta: valmis
   *   kehys näyttää jo oikeaa kuvaa, eikä src:ää saa kirjoittaa
   *   uudestaan (selain lataisi kuvan ja se välähtäisi).
   */
  const nayta = (lataa = true) => {
    const kuva = kuvat[kohdalla];
    // Suurennos näyttää sen kuvan, joka on kohdalla — myös silloin kun
    // napin avaa js/nostokuva.js (ks. avaaHetki avaaSuurennos).
    kehys.nostokuvaKuva = kuva;
    if (lataa) img.src = kuva.osoite;
    // Kortilla lyhyt, suurennoksessa pitkä (js/kuvatekstit.js;
    // avaaKohdeSuurennos saa kuvatiedon sellaisenaan).
    img.alt = kuvatekstiLyhyt(kuva) || hetki.otsikko;
    nappi.setAttribute('aria-label', `${kuvatekstiLyhyt(kuva) || hetki.otsikko} — avaa suurena`);
    selite.textContent = kuvatekstiLyhyt(kuva);
    /*
     * LÄHDERIVI ON KUVAN OMA. Jokainen havainnekuva kertoo, mitä juuri
     * siinä kuvassa on, joten rivi vaihtuu kuvan mukana — ja koska rivi
     * kulkee taytaLahderivin läpi, "Matkakirjan havainnekuva" saa
     * painettavan selitteen joka kerta (js/havainnekuva.js).
     */
    taytaLahderivi(lahde, kuva.lahde ?? 'Matkakirjan havainnekuva', kuva);
  };
  nayta(!valmisKuva);

  /*
   * NAPAUTUS SUURENTAA (omistajan raportti 30.8.2026: kaikki popupien
   * kuvat aukeavat koko näytölle). Sama suurennos kuin kartan
   * kohteilla ja eläintäyllä (js/fokuskohteet.js avaaKohdeSuurennos);
   * ämpärikuva kulkee `osoite`-kenttänä, jolla ei ole thumb-putkea.
   * Koko sarja menee mukaan, joten suurennoksesta voi selata toiseen
   * kuvaan ilman että kortille pitää palata.
   */
  // Valmiilla kehyksellä kuuntelija on jo paikallaan (js/nostokuva.js)
  // eikä sitä saa lisätä toista kertaa.
  if (!valmisKuva) {
    nappi.addEventListener('click', (tapahtuma) => {
      tapahtuma.stopPropagation();
      avaaKohdeSuurennos(ui, kuvat[kohdalla], () => nappi, 'hetkiZoom');
    });
  }

  if (kuvat.length > 1) {
    const laskuri = html('span', 'hetki-kuvalaskuri');
    const paivitaLaskuri = () => {
      laskuri.textContent = `${kohdalla + 1} / ${kuvat.length}`;
    };
    const nuoli = (luokka, merkki, nimi, suunta) => {
      const nap = html('button', `hetki-kuvanuoli ${luokka}`, merkki);
      nap.type = 'button';
      nap.setAttribute('aria-label', nimi);
      nap.addEventListener('click', (tapahtuma) => {
        tapahtuma.stopPropagation();
        kohdalla = (kohdalla + suunta + kuvat.length) % kuvat.length;
        sfx.play('paper');
        nayta();
        paivitaLaskuri();
      });
      nappi.appendChild(nap);
    };
    nuoli('edellinen', '‹', 'Edellinen kuva', -1);
    nuoli('seuraava', '›', 'Seuraava kuva', 1);
    paivitaLaskuri();
    nappi.appendChild(laskuri);
  }

  sailio.appendChild(kehys);
}

/**
 * MINIVISA JA PALKKIO — sama kirjanpito kuin skandaalivisassa
 * (js/skandaalit.js piirraSkandaaliVisa), avain hetki:<id>. Jo
 * maksettu visa näyttää kuittauksen eikä nappeja.
 */
function piirraHetkiVisa(ui, sisalto, iso, hetki) {
  const visa = hetki.visa;
  if (!visa) return;
  const laatikko = html('div', 'fokusvirta-visa hetki-visa');
  laatikko.appendChild(html('p', 'fokusvirta-visa-kysymys', visa.kysymys));
  const tulos = html('p', 'fokusvirta-visa-tulos');
  const avain = `${ui.game.pack.id}:${iso}:hetki:${hetki.id}`;
  if (ui.game.minitehtavatVastatut?.has(avain)) {
    tulos.textContent = 'Tähän on jo vastattu.';
    laatikko.appendChild(tulos);
    sisalto.appendChild(laatikko);
    return;
  }
  // Palkkio näkyviin ennen vastaamista, kuten skandaalivisassa.
  laatikko.appendChild(html('p', 'fokusvirta-visa-palkkio',
    `Oikeasta vastauksesta saat ${TAKY_PALKKIO} puntaa.`));
  const vaihtoehdot = html('div', 'fokusvirta-vaihtoehdot');
  visa.vaihtoehdot.forEach((tekstiRivi, i) => {
    const nap = html('button', '', tekstiRivi);
    nap.type = 'button';
    nap.addEventListener('click', () => {
      const oikein = i === visa.oikea;
      const vastaus = ui.game.actionMinitehtava(
        iso, `hetki:${hetki.id}`, oikein, TAKY_PALKKIO,
      );
      if (!vastaus.ok) return;
      vaihtoehdot.replaceChildren();
      tulos.className = `fokusvirta-visa-tulos ${oikein ? 'oikein-tulos' : 'vaarin-tulos'}`;
      tulos.textContent = oikein
        ? `Oikein! +${TAKY_PALKKIO} puntaa.`
        : `Oikea vastaus: ${visa.vaihtoehdot[visa.oikea]}.`;
      sfx.play(oikein ? 'correct' : 'wrong');
      natiiviVastaus(oikein);
      if (oikein) {
        const leima = ui.buildToast?.({
          kind: 'stamp', icon: 'kukkaro',
          text: `+${TAKY_PALKKIO} puntaa`, sub: 'Historian hetki',
        });
        if (leima) setTimeout(() => ui.removeToast(leima), TOAST_MS.default);
      }
      ui.onChange?.(ui.game);
      ui.renderTurnPill?.();
    });
    vaihtoehdot.appendChild(nap);
  });
  laatikko.append(vaihtoehdot, tulos);
  sisalto.appendChild(laatikko);
}

/** Kortti pois ja kuuntelijat puretaan. */
export function suljeHetki(ui) {
  const auki = ui?.hetkiKortti;
  if (ui) ui.hetkiKortti = null;
  auki?.purku?.();
  if (typeof document === 'undefined') return;
  for (const vanha of document.querySelectorAll('.hetki-kerros')) {
    // Kuvaesittelyn ikkunakuuntelijat pois (js/nostokuva.js).
    vanha.querySelector('.nostokuva-kortti')?.nostokuvaPurku?.();
    vanha.remove();
  }
}

/* ==================== KYTKENTÄ ==================== */

/**
 * KYTKENTÄKOHTA js/main.js:ssä — sama kaava ja sama perustelu kuin
 * skandaaleilla (js/skandaalit.js kytkeSkandaalit): rekisteröinti
 * tekee hetkistä kohdekerroksen lisäkohteita, ja niputuksen vartija
 * näkee staattisen tuonnin.
 */
export function kytkeHistorianHetket() {
  rekisteroiLisakohteet(hetkiLisakohteet);
  // Sama aineisto myös naapurimaalle (js/fokuskohteet.js
  // naapurienPoltetutVaraukset) — ks. js/syvennys.js kytkeSyvennys.
  rekisteroiMaanKohteet((iso, lauta) => hetkiKarttarivit(iso, lauta)
    .map(({ kohde, paikka }) => ({ kohde, paikka })), 3);
}
