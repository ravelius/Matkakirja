/*
 * SKANDAALIT KARTALLA — maan kohut ja huijaukset kohdemerkkeinä.
 *
 * Raamatun kirjaus (SYMBOLITAKSONOMIA → Skandaalit-pääkategoria):
 * kartan selitevalikon Skandaalit-rivi (huuto-symboli) saa oman
 * sisältönsä — opettavia skandaaleja, kohuja ja kuuluisia huijauksia,
 * 2–3 per maa. Data on js/packs/skandaalit.js (maa → skandaalit,
 * Fablen katselmoima erä 30.8.2026); tämä moduuli piirtää ne kartalle
 * ja avaa kortin.
 *
 * Reitti on YHTENÄISEN KOHDEMALLIN mukainen ja seuraa syvennys-
 * tarinoita (js/syvennys.js) rivi riviltä: skandaali on kohteiden
 * kerroksen tavallinen lisäkohde (js/fokuskohteet.js
 * rekisteroiLisakohteet), joka löytyy selitevalikon aihevalolla
 * huuto-symbolinsa kautta — ei uutta merkkilajia, ei uutta
 * mekaniikkaa. Laudalle projisoidaan ajossa (js/fokusmitat.js
 * projisoiLaudalle), joten sama data palvelee jokaista lautaa.
 *
 * ── MIKÄ EROAA SYVENNYKSISTÄ ───────────────────────────────────────
 *
 *   1. AVAIN ON MAA, EI KAUPUNKI. Syvennystarinat kuuluvat fokus-
 *      kaupungeilleen; skandaalit kuuluvat maalleen, joten lähde lukee
 *      SKANDAALIT[iso]-listan suoraan eikä kierrä kaupunkien kautta.
 *   2. KUVIA ON LISTA, JA LISTA ON VALINNAINEN. Erä 30.8.2026 tehtiin
 *      kuvattomana, ja kuvaton kortti taittuu yhä kokonaisena: ylärivi,
 *      nimiö, päiväysrivi, otsikko, ingressi, juttu ja minivisa. Kuvat
 *      asuvat `kuvat`-listassa (`[{ osoite | tiedosto, selite, lahde }]`),
 *      jonka ensimmäinen on Matkakirjan oma havainnekuva ja loput
 *      aikalaiskuvia Commonsista (omistajan linjaus 2.9.2026:
 *      *"ensimmäisenä kuvana generoitu parempilaatuinen kuva, ja jos
 *      valokuvia/aikalaiskuvia on, ne liitetään mukaan"*). Yhden kuvan
 *      skandaali piirtyy samalla apurilla kuin syvennystarina
 *      (js/fokusnosto.js piirraNostonKuva), useamman kuvan skandaali
 *      saa selailunuolet ja laskurin kuten historian hetki
 *      (js/historian-hetket.js) ja lehden nostogalleria (js/ui.js
 *      kaariNostoGalleria). Vanha yhden kuvan `kuva`-kenttä kelpaa
 *      yhä: se luetaan yhden alkion listana (skandaalinKuvat), joten
 *      erän 1.9.2026 kolme Wienin havainnekuvaa toimivat ennallaan.
 *   3. MINITEHTÄVÄAVAIN on skandaali:<id> (kirjanpito game.js
 *      actionMinitehtava, koko avain <lauta>:<maa>:skandaali:<id>),
 *      joten sama visa ei voi maksaa kahdesti. Palkkio on sama
 *      TAKY_PALKKIO (50 puntaa) kuin syvennysvisassa — sisar-
 *      mekaniikka, sama hinta. Julistetta ei myönnetä: juliste on
 *      kaupungin palkinto, ja skandaali on maan juttu.
 *
 * ── NIMET ON PREFIKSOITU ───────────────────────────────────────────
 *
 * Yhden tiedoston versio ketjuttaa moduulit samaan näkyvyysalueeseen
 * (tools/tarkista-niputus.mjs), joten kaikki top-level-nimet alkavat
 * SKANDAALI_/skandaali-etuliitteellä.
 */
import {
  fokusmoodiPaalla, html, jaaKappaleiksi, nielaiseSulkevaNapautus, TOAST_MS,
} from './ui-apurit.js';
import { natiiviVastaus } from './natiivi.js';
import { SKANDAALIT } from './packs/skandaalit.js';
import {
  avaaKohdeSuurennos, rekisteroiLisakohteet, rekisteroiMaanKohteet,
  suljeKohdeSuurennos,
} from './fokuskohteet.js';
import { nostosymKortinYlarivi } from './fokusnosto-symbolit.js';
import { asetaNostonKuva, piirraNostonKuva } from './fokusnosto.js';
import { nostokuvaAloita } from './nostokuva.js';
import { taytaLahderivi } from './tekijakortti.js';
import { kuvatekstiLyhyt } from './kuvatekstit.js';
import { TAKY_PALKKIO } from './fokusvirta.js';
import { projisoiLaudalle } from './fokusmitat.js';
import { sfx } from './sound.js';
import { lisaaLukijanappi } from './lukija.js';

/** Kortin kuvan leveys (sama kuin syvennystarinalla). */
const SKANDAALI_KUVA_PX = 800;

/*
 * KAKSI TYYLITIEDOSTOA, MOLEMMAT LAINASSA — sama järjestely ja sama
 * perustelu kuin syvennystarinoilla (js/syvennys.js): kortin sisus on
 * täkynoston (css/fokusnosto.css) ja minivisa fokusvirran
 * (css/fokusvirta.css) luokkia, ja tunnukset ovat samat kuin
 * omistajilla, joten kumpikin tiedosto ladataan sivulle enintään
 * kerran. Yhden tiedoston versiossa tyylit ovat jo <style>-lohkossa.
 */
const SKANDAALI_TYYLIT = [
  ['fokusnosto-tyyli', 'fokusnosto.css'],
  ['fokusvirta-tyyli', 'fokusvirta.css'],
];

function skandaaliLataaTyyli() {
  if (typeof document === 'undefined') return;
  const peruslinkki = document.querySelector('link[rel="stylesheet"][href*="styles.css"]');
  if (!peruslinkki) return;
  for (const [tunnus, tiedosto] of SKANDAALI_TYYLIT) {
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
 * MAAN SKANDAALIT KARTTARIVEIKSI — LAUDAN DATASTA, ILMAN PELIÄ.
 *
 * Viety ulos 31.8.2026 samasta syystä kuin syvennystarinoilla
 * (js/syvennys.js syvennysKarttarivit): laattageneraattori polttaa
 * nämä merkit, ja niiden tunnus, nimi, symboli ja paikka on saatava
 * samasta koodista kuin pelin oma merkki.
 */
export function skandaaliKarttarivit(iso, lauta) {
  const rivit = [];
  for (const skandaali of SKANDAALIT[iso] ?? []) {
    const paikka = projisoiLaudalle(lauta, skandaali.lon, skandaali.lat);
    if (!paikka) continue;
    rivit.push({
      skandaali,
      kohde: {
        id: `skandaali-${skandaali.id}`,
        nimi: skandaali.nimio ?? skandaali.otsikko,
        nimio: skandaali.nimio ?? null,
        tyyppi: 'skandaali',
        symboli: 'huuto',
        // Kaupunkinostojen katto ei koske kaupungin ulkopuolista
        // skandaalia (js/fokuskohteet.js, osio KATTOVAPAA).
        ...(skandaali.kattoVapaa ? { kattoVapaa: true } : {}),
      },
      paikka: { x: paikka.x, y: paikka.y },
    });
  }
  return rivit;
}

/**
 * NYKYISEN MAAN SKANDAALIT LISÄKOHTEIKSI.
 *
 * Sama näkyvyysehto kuin syvennystarinoilla (js/syvennys.js
 * syvennysLisakohteet): fokusmoodi päällä ja pelaaja ihminen. Maa
 * luetaan laudan omasta taulusta (cityCountry) — kartta näyttää maan,
 * joten maan kaikki skandaalit piirtyvät yhtä aikaa.
 */
function skandaaliLisakohteet(ui) {
  if (typeof document === 'undefined') return [];
  if (!ui || ui.dead || ui.katselu) return [];
  const city = ui.game?.cityOf?.();
  if (!city || ui.game.player?.isBot) return [];
  if (!fokusmoodiPaalla()) return [];
  const iso = ui.game.pack?.map?.cityCountry?.[city.id] || null;
  if (!iso) return [];
  return skandaaliKarttarivit(iso, ui.game.pack?.id)
    .map(({ skandaali, kohde, paikka }) => ({
      kohde: {
        ...kohde,
        avaa: (kaytto) => avaaSkandaali(kaytto ?? ui, iso, skandaali),
      },
      paikka,
    }));
}

/* ==================== KORTTI ==================== */

/**
 * SKANDAALIKORTTI — ylärivi ja sen alle lisälehden taitto (nimiö,
 * päiväysrivi, otsikko, ingressi, kuvat, juttu, minivisa).
 *
 * Kortti on kartan päällä kelluva paperi, ei koko ruudun modaali —
 * sama sääntö, samat sisusluokat ja sama sulkusopimus kuin
 * syvennystarinalla (js/syvennys.js avaaSyvennys). Ulkokuori on oma
 * (`skandaali-*`), koska kukin korttiperhe siivoaa omat kerroksensa
 * valitsimella.
 *
 * LÖÖPPITAITTO KAIKISSA SKANDAALEISSA (omistaja 3.9.2026: *"lööppi
 * lisälehti on nyt hyvä. monista kaikkiin muihinkin"*). Kuori saa
 * skandaali-luokkansa rinnalle täkynostojen lööppiluokan
 * `fokusnosto-looppi`, jolloin leveämpi mitta ja keltaisempi paperi
 * tulevat SAMASTA säännöstä kuin pilotissa (css/fokusnosto.css osio 9)
 * eikä skandaalille kirjoiteta omaa ulkonäköä. Skandaali on aina
 * lisälehti — dataan ei siis tule `taitto`-lippua niin kuin
 * täkynostoilla (js/fokusnosto.js nostonTaitto), joilla oletus on
 * tavallinen kortti.
 */
export function avaaSkandaali(ui, iso, skandaali) {
  if (!skandaali) return;
  sfx.play('paper');
  skandaaliLataaTyyli();
  suljeSkandaali(ui);

  const kerros = html('div', 'skandaali-kerros');
  const kortti = html('div', 'skandaali-kortti fokusnosto-looppi');
  kortti.setAttribute('role', 'dialog');
  kortti.setAttribute('aria-modal', 'false');
  kortti.setAttribute('aria-label', skandaali.otsikko ?? 'Skandaali');

  const sulje = html('button', 'fokusnosto-kortti-sulje', '✕');
  sulje.type = 'button';
  sulje.title = 'Sulje';
  sulje.setAttribute('aria-label', 'Sulje');
  kortti.appendChild(sulje);

  const sisalto = html('div', 'fokusnosto-sisalto');
  const latoSkandaali = (kotelo, kuvakehys) => {
    // Kohdemallin yhteinen ylärivi: aihesymboli ja luokan nimi.
    kotelo.appendChild(nostosymKortinYlarivi('huuto', 'fokusnosto-ylarivi'));
    piirraSkandaalinSisus(ui, kotelo, iso, skandaali, kuvakehys);
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
   * KUVA EDELLÄ (omistaja 11.9.2026, js/nostokuva.js). Kuvallinen
   * skandaali avautuu ensin pelkkänä isona kuvana — GALLERIASSA SEN
   * ENSIMMÄISENÄ KUVANA, ilman nuolia — ja "Lisää" latoo lisälehden
   * SAMAN kuvan ympärille. Nuolet ja laskuri ilmaantuvat silloin saman
   * kuvan päälle (ks. piirraSkandaalinGalleria). Kuvaton skandaali
   * aukeaa suoraan tekstikorttina kuten ennenkin.
   */
  const paakuva = skandaalinKuvat(skandaali)[0] ?? null;
  let kuvakehysRef = null;
  const kaksivaihe = paakuva ? nostokuvaAloita({
    kortti,
    sisalto,
    kuva: paakuva,
    aseta: (img, leveys, onVirhe) => asetaNostonKuva(img, paakuva, leveys, onVirhe),
    // Suurennos näyttää sen kuvan, joka on kohdalla — galleria
    // kirjoittaa valintansa kuvakehykseen (kehys.nostokuvaKuva).
    avaaSuurennos: (nappi) => avaaKohdeSuurennos(
      ui, kuvakehysRef?.nostokuvaKuva ?? paakuva, () => nappi, 'skandaaliZoom',
    ),
    latoNosto: latoSkandaali,
  }) : null;
  kuvakehysRef = kaksivaihe?.kehys ?? null;
  if (!kaksivaihe) latoSkandaali(sisalto, undefined);
  // Kaiutin kortin otsikkoriville (omistaja 6.9.2026, juuri tästä
  // kortista: "Kaikissa missä on tekstiä, saisi olla striimi lukijan
  // symboli") — js/lukija.js lisaaLukijanappi.
  lisaaLukijanappi(kortti, { otsikko: 'Kuuntele lisälehti' });

  const kiinni = () => {
    sfx.play('paper');
    suljeSkandaali(ui);
  };
  sulje.addEventListener('click', kiinni);
  // Napautus kortin ULKOPUOLELLE sulkee; nielu estää saman napautuksen
  // valumisen kartalle (ks. ui-apurit nielaiseSulkevaNapautus).
  kerros.addEventListener('pointerdown', (tapahtuma) => {
    if (tapahtuma.target?.closest?.('.skandaali-kortti')) return;
    nielaiseSulkevaNapautus(tapahtuma);
    kiinni();
  });
  const nappain = (tapahtuma) => {
    if (tapahtuma.key !== 'Escape') return;
    // Kuvan suurennos sulkeutuu ensin — sama väistö kuin syvennyksellä.
    if (ui?.skandaaliZoom) return;
    tapahtuma.stopPropagation();
    suljeSkandaali(ui);
  };
  document.addEventListener('keydown', nappain, true);

  ui.skandaaliKortti = {
    kerros,
    purku: () => document.removeEventListener('keydown', nappain, true),
  };
  void kerros.offsetWidth;
  kerros.classList.add('skandaali-auki');
}

/**
 * SKANDAALIN SISUS LEHDEN TAITOSSA — nimiö, päiväysrivi, pääotsikko,
 * ingressi, kuvat, leipäteksti ja minivisa.
 *
 * Erotettu omaksi funktiokseen 31.8.2026 (kategoria per kaupunki):
 * sama sisus latoutuu joko oman kortin ylärivin alle tai osiona
 * yhdistetyllä lehdellä (js/fokuskohteet.js piirraRyhmanOsiot). Tyyli
 * ladataan tässä samasta syystä kuin syvennystarinalla — osiona
 * kutsuttaessa korttia ei avata lainkaan.
 *
 * ── LÖÖPPITAITTO (omistaja 3.9.2026) ───────────────────────────────
 *
 * Rivit ovat samat kuin täkynoston lööppipilotissa (js/fokusnosto.js
 * piirraNostonSisus, haara `looppi`) ja käyttävät SAMOJA luokkia, joten
 * ulkonäkö tulee yhdestä paikasta (css/fokusnosto.css osio 9):
 *
 *   1. `looppi-nimio` — "Lisälehti". 1800-luvulla skandaaliuutinen tuli
 *      lisälehtenä varsinaisen numeron väliin.
 *   2. `looppi-paivays` — paikka · vuosi kaksoisviivojen välissä. SAMA
 *      SISÄLTÖ kuin ennen ollut metarivi (`fokusnosto-lahde`), uusi asu.
 *   3. `looppi-otsikko` — pääotsikko lehden kokoisena. Kortin oma
 *      otsikkoluokka on rinnalla, jotta kirjasin ja väri periytyvät.
 *   4. `looppi-ingressi` — `kortti`-kenttä, kappale kerrallaan omana
 *      kappaleenaan (Fablen 3–4 virkkeen ingressi; monikappaleinen
 *      ingressi latoutuu useaksi ingressikappaleeksi).
 *   5. kuvat entiseen tapaan — yksi kuva tai selattava galleria.
 *      77/83 skandaalia on kuvattomia, ja taitto on tehty kestämään se:
 *      kuvaton kortti menee ingressistä suoraan leipätekstiin eikä
 *      kuvalle varata paikkaa etukäteen.
 *   6. `looppi-leipa` — `teksti` kappaleittain; anfangi ja leveän
 *      ruudun kaksi palstaa tulevat CSS:stä.
 *
 * Vanha `skandaali-ingressi` -luokka jäi pois: ingressi on nyt lehden
 * ingressi eikä leipätekstin ensimmäinen kappale, joten sen sekä oma
 * paikkansa taitossa että oma luokkansa vaihtuivat.
 *
 * @param {Element|null} [valmisKuva] KUVA EDELLÄ -avauksen valmis
 *   kuvakehys (js/nostokuva.js): `undefined` piirtää kuvat kuten ennen,
 *   elementti ottaa juuri sen kehyksen gallerian pääkuvaksi, ja `null`
 *   jättää pääkuvan pois — se on peruttu kuvaesittely, jonka kuva ei
 *   latautunut.
 */
function piirraSkandaalinSisus(ui, sailio, iso, skandaali, valmisKuva) {
  skandaaliLataaTyyli();
  sailio.appendChild(html('p', 'looppi-nimio', 'Lisälehti'));
  const paivays = [skandaali.paikka, skandaali.vuosi].filter(Boolean).join(' · ');
  if (paivays) sailio.appendChild(html('p', 'looppi-paivays', paivays));
  sailio.appendChild(html('h3', 'fokusnosto-kortti-otsikko looppi-otsikko', skandaali.otsikko));
  for (const kappale of jaaKappaleiksi(skandaali.kortti ?? '')) {
    sailio.appendChild(html('p', 'looppi-ingressi', kappale));
  }
  piirraSkandaalinKuvat(ui, sailio, skandaali, valmisKuva);
  const teksti = html('div', 'fokusnosto-teksti looppi-leipa');
  for (const kappale of jaaKappaleiksi(skandaali.teksti ?? '')) {
    teksti.appendChild(html('p', '', kappale));
  }
  // Jututon skandaali ei saa jättää tyhjää palstalaatikkoa ingressin ja
  // visan väliin (kaikilla 83:lla on `teksti`, mutta kenttä ei ole
  // pakollinen tests/skandaalit.test.mjs:ssä).
  if (teksti.childElementCount) sailio.appendChild(teksti);
  piirraSkandaaliVisa(ui, sailio, iso, skandaali);
}

/**
 * KORTIN KUVAT YHTENÄ LISTANA.
 *
 * Uusi `kuvat` voittaa, vanha yhden kuvan `kuva` kelpaa yhä (ks.
 * moduulin otsake, kohta 2). Kuvaton alkio karsitaan tässä, jotta
 * galleria ei koskaan näytä laskurissa kuvaa, jota ei ole.
 *
 * @param {object} skandaali skandaalin tietue
 * @returns {object[]} kuvat piirtojärjestyksessä
 */
export function skandaalinKuvat(skandaali) {
  const lista = Array.isArray(skandaali?.kuvat) ? skandaali.kuvat : [];
  if (lista.length) return lista.filter((kuva) => kuva?.osoite || kuva?.tiedosto);
  return skandaali?.kuva ? [skandaali.kuva] : [];
}

/**
 * KUVAT KORTTIIN: yksi kuva entiseen tapaan, useampi selailunuolin.
 *
 * Yhden kuvan reitti on tarkoituksella muuttumaton — se on sama kutsu,
 * sama leveys ja sama zoomiavain kuin syvennystarinalla (js/syvennys.js
 * piirraSyvennysSisus), joten Wienin kolme havainnekuvaa piirtyvät
 * täsmälleen kuten ennen. Galleria on oma haaransa ja seuraa historian
 * hetken mallia (js/historian-hetket.js piirraHetkenKuvat): pääkuva
 * isona, nuolet ja laskuri kuvan päällä, kuvateksti ja lähderivi
 * vaihtuvat kuvan mukana.
 */
function piirraSkandaalinKuvat(ui, sailio, skandaali, valmisKuva) {
  const kaikki = skandaalinKuvat(skandaali);
  if (!kaikki.length) return;
  /*
   * PERUTTU KUVAESITTELY VIE VAIN PÄÄKUVAN. Kuvaesittely peruuntuu, kun
   * gallerian ENSIMMÄINEN kuva ei latautunut (js/nostokuva.js peru);
   * sarjan loput kuvat ovat silti olemassa, joten ne ladotaan tavalliseen
   * tapaan eikä koko sarja katoa yhden puuttuvan tiedoston takia.
   */
  const kuvat = valmisKuva === null ? kaikki.slice(1) : kaikki;
  if (!kuvat.length) return;
  if (kuvat.length === 1 && !valmisKuva) {
    piirraNostonKuva(ui, sailio, kuvat[0], 'fokusnosto-kuva', SKANDAALI_KUVA_PX, 'skandaaliZoom');
    return;
  }
  if (kuvat.length === 1) {
    sailio.appendChild(valmisKuva);
    return;
  }
  piirraSkandaalinGalleria(ui, sailio, skandaali, kuvat, valmisKuva ?? undefined);
}

/**
 * SELATTAVA KUVASARJA.
 *
 * PUUTTUVA KUVA POISTUU SARJASTA. Havainnekuva syntyy kuvajonossa
 * skandaali kerrallaan, joten sarjassa voi olla osoite, jota ämpärissä
 * ei vielä ole. Virheen sattuessa kuva pudotetaan listalta ja
 * seuraava näytetään; jos yksikään ei lataudu, koko kehys piiloutuu
 * eikä kortille jää tyhjää laatikkoa lupaamaan kuvaa, jota ei ole.
 */
function piirraSkandaalinGalleria(ui, sailio, skandaali, kuvat, valmisKehys) {
  const jaljella = [...kuvat];
  /*
   * VALMIS KUVAKEHYS ON GALLERIAN PÄÄKUVA (js/nostokuva.js).
   *
   * Vaiheessa 1 kortissa on pelkkä sarjan ENSIMMÄINEN kuva isona,
   * lyhyt kuvateksti ja "Lisää" — ei nuolia. Vaiheessa 2 galleria
   * rakennetaan SAMAN kehyksen ympärille: sama figure, sama nappi,
   * sama img ja sama src, joten kuva ei liiku eikä lataudu uudestaan.
   * Nuolet ja laskuri ilmaantuvat kuvan päälle, ja kuvatekstin sekä
   * lähderivin paikan ottavat kehyksen omat rivit (.nostokuva-teksti,
   * .nostokuva-lahde), joita selaus päivittää kuvan mukana.
   */
  const kehys = valmisKehys
    ?? html('figure', 'fokusnosto-kuva skandaali-kuva');
  const nappi = valmisKehys
    ? valmisKehys.querySelector('.nostokuva-nappi')
    : html('button', 'fokusnosto-kuvanappi');
  const img = valmisKehys
    ? valmisKehys.querySelector('.nostokuva-img')
    : document.createElement('img');
  if (valmisKehys) kehys.classList.add('skandaali-kuva');
  else {
    nappi.type = 'button';
    nappi.title = 'Katso kuva suurempana';
    img.decoding = 'async';
    img.draggable = false;
    nappi.appendChild(img);
    kehys.appendChild(nappi);
  }

  const selite = valmisKehys
    ? valmisKehys.querySelector('.nostokuva-teksti')
    : html('span', 'fokusnosto-kuvaselite');
  const lahderivi = valmisKehys
    ? valmisKehys.querySelector('.nostokuva-lahde')
    : html('span', 'fokusnosto-kuvalahde');
  if (!valmisKehys) {
    const kuvateksti = html('figcaption', 'fokusnosto-kuvateksti');
    kuvateksti.append(selite, lahderivi);
    kehys.appendChild(kuvateksti);
  }

  const laskuri = html('span', 'skandaali-kuvalaskuri');
  let kohdalla = 0;

  /**
   * @param {boolean} [lataa] `false` jättää kuvan koskematta: valmis
   *   kehys näyttää jo oikeaa kuvaa, eikä src:ää saa kirjoittaa
   *   uudestaan (selain lataisi kuvan ja se välähtäisi).
   */
  const nayta = (lataa = true) => {
    if (!jaljella.length) {
      kehys.hidden = true;
      return;
    }
    kohdalla = ((kohdalla % jaljella.length) + jaljella.length) % jaljella.length;
    const kuva = jaljella[kohdalla];
    // Kortilla lyhyt, suurennoksessa pitkä (js/kuvatekstit.js;
    // avaaKohdeSuurennos saa kuvatiedon sellaisenaan).
    img.alt = kuvatekstiLyhyt(kuva) || skandaali.otsikko || '';
    nappi.setAttribute('aria-label', `${kuvatekstiLyhyt(kuva) || 'Kuva'} — avaa suurena`);
    selite.textContent = kuvatekstiLyhyt(kuva);
    /*
     * LÄHDERIVI ON KUVAN OMA, ja se kulkee taytaLahderivin läpi, joten
     * "Matkakirjan havainnekuva" saa painettavan selitteen joka kerta
     * (js/havainnekuva.js) ja Commons-kuvan tekijä näkyy niin kuin
     * lisenssi vaatii.
     */
    taytaLahderivi(lahderivi, kuva.lahde ?? '', kuva);
    laskuri.textContent = jaljella.length > 1 ? `${kohdalla + 1} / ${jaljella.length}` : '';
    laskuri.hidden = jaljella.length < 2;
    // Suurennos näyttää sen kuvan, joka on kohdalla — myös silloin kun
    // napin avaa js/nostokuva.js (ks. avaaSkandaali avaaSuurennos).
    kehys.nostokuvaKuva = kuva;
    if (!lataa) return;
    asetaNostonKuva(img, kuva, SKANDAALI_KUVA_PX, () => {
      const paikka = jaljella.indexOf(kuva);
      if (paikka < 0) return;
      jaljella.splice(paikka, 1);
      if (kohdalla > paikka) kohdalla -= 1;
      nayta();
    });
  };
  nayta(!valmisKehys);

  // Napautus suurentaa, kuten kortin muillakin kuvilla; suurennos saa
  // sen kuvan, joka on kohdalla. Valmiilla kehyksellä kuuntelija on jo
  // paikallaan (js/nostokuva.js) eikä sitä saa lisätä toista kertaa.
  if (!valmisKehys) {
    nappi.addEventListener('click', (tapahtuma) => {
      tapahtuma.stopPropagation();
      if (!jaljella.length) return;
      avaaKohdeSuurennos(ui, jaljella[kohdalla], () => nappi, 'skandaaliZoom');
    });
  }

  const nuoli = (luokka, merkki, nimi, suunta) => {
    const nap = html('button', `skandaali-kuvanuoli ${luokka}`, merkki);
    nap.type = 'button';
    nap.setAttribute('aria-label', nimi);
    nap.addEventListener('click', (tapahtuma) => {
      tapahtuma.stopPropagation();
      if (jaljella.length < 2) return;
      kohdalla += suunta;
      sfx.play('paper');
      nayta();
    });
    nappi.appendChild(nap);
  };
  nuoli('edellinen', '‹', 'Edellinen kuva', -1);
  nuoli('seuraava', '›', 'Seuraava kuva', 1);
  nappi.appendChild(laskuri);

  sailio.appendChild(kehys);
}

/**
 * MINIVISA JA PALKKIO — sama kirjanpito kuin syvennysvisassa
 * (js/syvennys.js piirraSyvennysVisa), avain skandaali:<id>. Jo
 * maksettu visa näyttää kuittauksen eikä nappeja.
 */
function piirraSkandaaliVisa(ui, sisalto, iso, skandaali) {
  const visa = skandaali.visa;
  if (!visa) return;
  const laatikko = html('div', 'fokusvirta-visa skandaali-visa');
  laatikko.appendChild(html('p', 'fokusvirta-visa-kysymys', visa.kysymys));
  const tulos = html('p', 'fokusvirta-visa-tulos');
  const avain = `${ui.game.pack.id}:${iso}:skandaali:${skandaali.id}`;
  if (ui.game.minitehtavatVastatut?.has(avain)) {
    tulos.textContent = 'Tähän on jo vastattu.';
    laatikko.appendChild(tulos);
    sisalto.appendChild(laatikko);
    return;
  }
  // Palkkio näkyviin ennen vastaamista, kuten syvennysvisassa
  // (omistaja 1.9.2026: "lopussa oleva kysymys ei mainitse, mitä
  // siitä voi voittaa").
  laatikko.appendChild(html('p', 'fokusvirta-visa-palkkio',
    `Oikeasta vastauksesta saat ${TAKY_PALKKIO} puntaa.`));
  const vaihtoehdot = html('div', 'fokusvirta-vaihtoehdot');
  visa.vaihtoehdot.forEach((tekstiRivi, i) => {
    const nap = html('button', '', tekstiRivi);
    nap.type = 'button';
    nap.addEventListener('click', () => {
      const oikein = i === visa.oikea;
      const vastaus = ui.game.actionMinitehtava(
        iso, `skandaali:${skandaali.id}`, oikein, TAKY_PALKKIO,
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
          text: `+${TAKY_PALKKIO} puntaa`, sub: 'Skandaali selvisi',
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
export function suljeSkandaali(ui) {
  const auki = ui?.skandaaliKortti;
  if (ui) ui.skandaaliKortti = null;
  auki?.purku?.();
  // Kuvan suurennos on kortin oma jatke — sama siivous kuin
  // syvennystarinalla (js/syvennys.js suljeSyvennys).
  suljeKohdeSuurennos(ui, 'skandaaliZoom');
  if (typeof document === 'undefined') return;
  for (const vanha of document.querySelectorAll('.skandaali-kerros')) {
    // Kuvaesittelyn ikkunakuuntelijat pois (js/nostokuva.js).
    vanha.querySelector('.nostokuva-kortti')?.nostokuvaPurku?.();
    vanha.remove();
  }
}

/* ==================== KYTKENTÄ ==================== */

/**
 * KYTKENTÄKOHTA js/main.js:ssä — sama kaava ja sama perustelu kuin
 * syvennystarinoilla (js/syvennys.js kytkeSyvennys): rekisteröinti
 * tekee skandaaleista kohdekerroksen lisäkohteita, ja niputuksen
 * vartija näkee staattisen tuonnin.
 */
export function kytkeSkandaalit() {
  rekisteroiLisakohteet(skandaaliLisakohteet);
  // Sama aineisto myös naapurimaalle (js/fokuskohteet.js
  // naapurienPoltetutVaraukset) — ks. js/syvennys.js kytkeSyvennys.
  rekisteroiMaanKohteet((iso, lauta) => skandaaliKarttarivit(iso, lauta)
    .map(({ kohde, paikka }) => ({ kohde, paikka })), 2);
}

/** Laudan vaihto tai uusi peli: kortti pois. */
export function nollaaSkandaalit(ui) {
  suljeSkandaali(ui);
}
