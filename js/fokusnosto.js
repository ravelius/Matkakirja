/*
 * TÄKYNOSTO — keltaisen lehden klikkiotsikko kartan päällä.
 *
 * Raamatun osio "Fokusmoodi", kohta KEVYT KULKU -KOKEILU (omistaja
 * 25.8.2026): *"aarteen löydyttyä pöllö kertoo että nyt voi matkustaa
 * seuraavaan kaupunkiin tai jäädä tutkimaan maata …, ja samalla
 * kartalta NOUSEE YKSI TÄKYNOSTO: lyhyt KELTAISTEN LEHTIEN
 * KLIKKIOTSIKKOTASOINEN lause (henkilöskandaali tai uskomaton
 * tositarina, lupaus lunastetaan faktalla) + miniatyyrikuva perässä,
 * houkuttelemassa kohteen auki."*
 *
 * Kreikan pooli on omistajan valitsema (sama kohta, KREIKAN TÄKYNOSTOT
 * VALITTU): kartoituksen kolme kärkeä
 * docs/mantereet-tyoaineisto/takynostot-kreikka.md:stä. *"Näytetään
 * yksi kerrallaan; luetun tilalle nousee poolista seuraava."*
 *
 * ── LUPAUS LUNASTETAAN, TAI OTSIKKO ON HUIJAUS ─────────────────────
 *
 * Aineiston ensimmäinen sääntö: jokaisen otsikon takana on lähteestä
 * tarkistettu tositarina, joka vastaa nimenomaan siihen, mitä otsikko
 * lupaa. Siksi nosto avaa OMAN korttinsa, jossa lunastus on, eikä
 * pelkkää kartan tietoruutua: Delfoin tietoruutu kertoo Omfaloksesta ja
 * Pythiasta, ei kylästä joka istui oraakkelin päällä — se otsikko jäisi
 * lunastamatta ja Perustuslain totuudellisuuspilari kaatuisi. Kun
 * kohteella on lisäksi oma karttamerkki (`kohde`), kortissa on nappi
 * sinne: nosto siis houkuttelee kohteen auki, kuten tilauksessa
 * sanotaan, mutta lupaus maksetaan ensin.
 *
 * ── HTML-KERROS, EI SVG:TÄ ─────────────────────────────────────────
 *
 * Nosto on tekstiä ja pieni kuva — kaksi asiaa, jotka HTML taittaa ja
 * SVG ei. Kartan omat kerrokset (vinjetit, kohdemerkit, vihreä piste)
 * ovat SVG:tä, koska ne ankkuroituvat laudan koordinaatteihin ja
 * skaalautuvat zoomin mukana; nosto ei ankkuroidu mihinkään paikkaan
 * vaan RUUTUUN. EI SUODATTIMIA missään muodossa (js/fokuskartta.js
 * sääntö 3, tests/rules.test.mjs): nousu on `transform` ja `opacity`,
 * ei blur eikä varjosuodatin.
 *
 * ── MIKSI document.body EIKÄ .map-pane ─────────────────────────────
 *
 * Kartan eleet (panorointi, zoomi) kuunnellaan karttapaneelista
 * (js/kartta.js: `pane = this.ui.svg.parentElement`), ja paneelin
 * sisällä olevan kelluvan pinnan napautus pitää erikseen tunnistaa
 * KELLUVA_UI-listalta. Bodyssa oleva kiinteä kerros ei ole paneelin
 * jälkeläinen lainkaan, joten sen napautus ei kuplii karttaan eikä
 * js/kartta.js:ää tarvitse koskea — sama ratkaisu kuin fokusvirran
 * kuvasuurennoksella (.fokuszoom).
 *
 * ── LUETUT LAITTEEN MUISTIIN ───────────────────────────────────────
 *
 * Luettu nosto ei nouse enää: se on luettu, ei pelitilanne. Muisti on
 * siksi localStorage eikä pelitallenne — sama try/catch-kaava kuin
 * lehtivinkin ruksilla (js/ui-apurit.js lehtivinkkiPiilotettu).
 *
 * ── NIMET ON PREFIKSOITU ───────────────────────────────────────────
 *
 * Yhden tiedoston versio ketjuttaa moduulit samaan näkyvyysalueeseen
 * (tools/tarkista-niputus.mjs), joten kaikki top-level-nimet alkavat
 * NOSTO_/nosto-etuliitteellä.
 */
import { html, jaaKappaleiksi } from './ui-apurit.js';
import { asetaKuva } from './media.js';
import { valokuvaUrl, valokuvaVara } from './packs/africa-valokuvat.js';
import { avaaFokuskohde, suljeFokuskohde } from './fokuskohteet.js';
import { fokuskohteet } from './packs/fokuskohteet-grc.js';
import { asetaNostopinta, fokusvirtaLukitseeLehden, fokusvirtaSisalto } from './fokusvirta.js';
import { sfx } from './sound.js';

/* ==================== POOLI ==================== */

/*
 * KREIKAN TÄKYNOSTOT (omistajan valinta 25.8.2026).
 *
 * Jokainen lunastus on aineiston omaa, lähteestä tarkistettua tekstiä
 * (docs/mantereet-tyoaineisto/takynostot-kreikka.md, ehdokkaat 2, 6 ja
 * 10) — siitä on paikoin lyhennetty, muttei lisätty eikä muutettu
 * yhtään faktaväitettä. Lähderivi on kortissa näkyvissä.
 *
 * KUVAT on kysytty Commonsin imageinfo-rajapinnalta 25.8.2026 (koko,
 * lisenssi, tekijä, päiväys) — nimiä ei ole arvattu:
 *   - Sophia Schliemann wearing gold jewelry.jpg — 1093×1273, public
 *     domain, n. 1873. Kuva on JO PELISSÄ (js/packs/fokusvirta-ateena.js
 *     matkakirja.kuva), ja miniatyyri on tarkoituksella sama: pelaaja
 *     tunnistaa sen isoisän merkinnästä, ja juuri se tekee otsikosta
 *     koukun.
 *   - Anticythera shipwreck. Standard diving dress.jpg — 1968×1500,
 *     CC BY-SA 3.0, kuvattu 1901.
 *   - Kastri (Delphi) and the Phaedriades by Paul des Granges
 *     (1869).jpg — 7152×6608, public domain, negatiivi 1869.
 *
 * IKÄSOPIVUUS (13+, Perustuslaki). Antikytheran lunastuksessa kerrotaan
 * aineiston ohjeen mukaan, että sukellusten hinta oli kova, mutta
 * yksityiskohtia ei kuvata. Sofian tarinasta on jätetty pois
 * aineistossa erikseen hylätty avioliittokulma.
 */
const NOSTO_MAAT = {
  GRC: [
    {
      id: 'sofia-korut',
      otsikko: 'Valokuva paljasti aarrevarkauden — rouva poseerasi Troijan koruissa',
      teksti: 'Heinrich Schliemann salakuljetti Priamoksen aarteen ulos '
        + 'Ottomaanien valtakunnasta. Viranomaisille asia paljastui vasta, kun '
        + 'hänen vaimonsa Sofia esiintyi julkisesti yllään "Helenan korut" — '
        + 'kultainen otsapanta ja kaulakorut.\n\n'
        + 'Kaivausta valvomaan määrätty ottomaanivirkamies Amin Effendi sai '
        + 'vankeustuomion, Schliemannin kaivauslupa peruttiin ja Ottomaanien '
        + 'hallitus haastoi hänet oikeuteen osuudestaan kultaan.',
      lahde: 'en-Wikipedia "Priam\'s Treasure", osio "Art collection" '
        + '(tarkistettu 25.8.2026).',
      kuva: {
        tiedosto: 'Sophia Schliemann wearing gold jewelry.jpg',
        selite: 'Sofia Schliemann "Helenan koruissa". Juuri tämä kuva '
          + 'kertoi viranomaisille, missä Troijan kulta oli.',
        lahde: 'Tuntematon kuvaaja n. 1873, Wikimedia Commons (public domain)',
      },
    },
    {
      id: 'antikythera',
      otsikko: 'Sukeltaja nousi pintaan kauhuissaan: pohjalla makasi kasa ruumiita',
      teksti: 'Pääsiäisen aikaan 1900 sienisukeltajien alus jäi odottamaan '
        + 'tuulta Antikytheran saarelle. Sukeltaja Elias Stadiatis laskeutui '
        + '45 metriin ja pyysi heti ylös: hän kertoi nähneensä merenpohjalla '
        + 'kasan mätäneviä ruumiita ja hevosia. Kapteeni Dimitrios Kondos '
        + 'luuli miestä typpihumalaiseksi, sukelsi itse — ja nousi pintaan '
        + 'pronssipatsaan käsivarsi mukanaan.\n\n'
        + 'Kaksi vuotta myöhemmin, 17.5.1902, arkeologi Valerios Stais huomasi '
        + 'museossa, että yhdessä syöpyneessä pronssimöykyssä oli hammasratas '
        + 'ja kreikkalaista tekstiä: se oli Antikytheran kone, maailman vanhin '
        + 'tunnettu analogiatietokone. Hinta oli kova — sukeltajista yksi '
        + 'kuoli ja kaksi halvaantui sukeltajantautiin kesällä 1901.',
      lahde: 'en-Wikipedia "Antikythera wreck", osiot "Discovery" ja '
        + '"Artifact recovery" (tarkistettu 25.8.2026).',
      kuva: {
        tiedosto: 'Anticythera shipwreck. Standard diving dress.jpg',
        selite: 'Antikytheran hylyn sukeltajat varusteissaan vuonna 1901.',
        lahde: 'Wikimedia Commons (CC BY-SA 3.0)',
      },
    },
    {
      id: 'kastri',
      otsikko: 'Kokonainen kylä istui oraakkelin päällä — eikä lähtenyt ennen kuin maa järisi',
      teksti: 'Kun ranskalaiset halusivat kaivaa Delfoin pyhäkön esiin, sen '
        + 'päällä seisoi Kastrin kylä: noin sata taloa ja 200 asukasta, jotka '
        + 'olivat vuosisatoja louhineet antiikin kiviä omiin seiniinsä. Kylä '
        + 'piti siirtää ennen kaivauksia, mutta asukkaat kieltäytyivät.\n\n'
        + 'Tilaisuus tuli vasta kun maanjäristys vaurioitti kylää pahoin: '
        + 'asukkaille tarjottiin kokonaan uutta kylää vanhan paikan tilalle, '
        + 'ja 1893 Ranskan arkeologinen koulu kuori pois maavyöryjen massat ja '
        + 'paljasti Apollonin pyhäkön.',
      lahde: 'en-Wikipedia "Delphi", osio "Excavations" (tarkistettu 25.8.2026).',
      kuva: {
        tiedosto: 'Kastri (Delphi) and the Phaedriades by Paul des Granges (1869).jpg',
        selite: 'Kastrin kylä raunioiden päällä Phaidriades-kallioiden alla. '
          + 'Valokuva on vuodelta 1869 — neljä vuotta ennen isoisän matkaa.',
        lahde: 'Paul des Granges 1869, Wikimedia Commons (public domain)',
      },
      // Kartalla on jo Delfoin oma merkki (js/packs/fokuskohteet-grc.js),
      // joten nosto voi ohjata suoraan sen tietoruutuun.
      kohde: 'delfoi',
    },
  ],
};

/* ==================== LUETUT LAITTEEN MUISTIIN ==================== */

const NOSTO_AVAIN = 'matkakirja-takynostot-luetut';

/** Luettujen nostojen tunnukset. Rikki mennyt muisti on tyhjä muisti. */
function nostoLuetut() {
  try {
    const raaka = localStorage.getItem(NOSTO_AVAIN);
    const lista = raaka ? JSON.parse(raaka) : [];
    return new Set(Array.isArray(lista) ? lista.filter((x) => typeof x === 'string') : []);
  } catch {
    return new Set();
  }
}

/** Merkitsee noston luetuksi. Epäonnistunut kirjoitus ei kaada mitään. */
function nostoMerkitseLuetuksi(id) {
  try {
    const luetut = nostoLuetut();
    if (luetut.has(id)) return;
    luetut.add(id);
    localStorage.setItem(NOSTO_AVAIN, JSON.stringify([...luetut]));
  } catch {
    /* Yksityinen selaus tai täysi kiintiö: nosto nousee uudestaan. */
  }
}

/* ==================== TYYLI ==================== */

const NOSTO_TYYLIN_TUNNUS = 'fokusnosto-tyyli';

/**
 * Oma tyylitiedosto sivulle, jos sitä ei vielä ole. Sama kaava ja sama
 * syy kuin fokusvirralla ja fokuskohteilla: css/styles.css on toisen
 * työvaiheen hallussa. Yhden tiedoston versiossa erillistä linkkiä ei
 * ole, koska tyylit ovat jo sivun <style>-lohkossa.
 */
function nostoLataaTyyli() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(NOSTO_TYYLIN_TUNNUS)) return;
  const peruslinkki = document.querySelector('link[rel="stylesheet"][href*="styles.css"]');
  if (!peruslinkki) return;
  const linkki = document.createElement('link');
  linkki.id = NOSTO_TYYLIN_TUNNUS;
  linkki.rel = 'stylesheet';
  linkki.href = new URL('fokusnosto.css', peruslinkki.href).href;
  document.head.appendChild(linkki);
}

/* ==================== MIKÄ NOSTO NOUSEE ==================== */

/** Miniatyyrin ja kortin kuvan pyyntöleveydet pikseleinä. */
const NOSTO_MINI_PX = 160;
const NOSTO_KUVA_PX = 800;

/**
 * MINKÄ MAAN POOLI ON JUURI NYT VOIMASSA?
 *
 * Maa luetaan laudan omasta taulusta, samalla päättelyllä kuin kartan
 * kohteilla (js/fokuskohteet.js nykyisenMaanKohteet) — yksi totuus,
 * ei toista tulkintaa siitä, minkä maan sisältöä ruudulla on.
 */
function nostoMaanPooli(ui, city) {
  /*
   * Kaupungin oma pooli packista ensin (Sofia 25.8.2026: kenttä
   * `takynostot` js/packs/fokusvirta-sofia.js:ssä käyttää lunastus-
   * nimeä tekstille) — näin uusi maa ei vaadi riviä tähän tiedostoon.
   * NOSTO_MAAT jää Kreikan poolille ja varapoluksi.
   */
  const oma = fokusvirtaSisalto(ui, city)?.takynostot;
  if (Array.isArray(oma) && oma.length) {
    return oma.map((n) => (n.teksti ? n : { ...n, teksti: n.lunastus }));
  }
  const taulu = ui?.game?.pack?.map?.cityCountry;
  const iso = (taulu && city && taulu[city.id]) || null;
  return (iso && NOSTO_MAAT[iso]) || null;
}

/**
 * MIKÄ NOSTO ON POOLISSA VUOROSSA — riippumatta siitä, onko ruutu vapaa?
 *
 * Kolme ehtoa, kaikki pakollisia:
 *   1. kaupungilla on fokusvirtasisältö (eli fokusmoodi on päällä,
 *      pelaaja on ihminen ja laudalla on kevyt kulku käytössä);
 *   2. MAAN AARRE ON LÖYTYNYT — laatta on käännetty, eli lehtilukko on
 *      auennut (fokusvirtaLukitseeLehden palauttaa false). Ennen sitä
 *      pelaajalla on kesken toinen asia, eikä nosto saa kilpailla siitä;
 *   3. maan poolissa on vielä lukematon ja ohittamaton nosto.
 */
function nostoVuorossa(ui) {
  if (typeof document === 'undefined') return null;
  if (!ui || ui.dead || ui.katselu) return null;
  const city = ui.game?.cityOf?.();
  if (!city || !fokusvirtaSisalto(ui, city)) return null;
  if (fokusvirtaLukitseeLehden(ui, city)) return null;
  const pooli = nostoMaanPooli(ui, city);
  if (!pooli) return null;
  const luetut = nostoLuetut();
  const ohitetut = ui.fokusnostoOhitetut ?? new Set();
  return pooli.find((n) => !luetut.has(n.id) && !ohitetut.has(n.id)) ?? null;
}

/**
 * ONKO RUUTU VAPAA NOSTOLLE?
 *
 * Nosto on houkutus eikä pelin portti, joten se väistää kaiken, mikä on
 * pelaajalla kesken:
 *   - <dialog>: lehti, aarrelappu, valikko;
 *   - lento tai kamera-ajo (kartan muutkin kelluvat merkinnät väistyvät);
 *   - PÖLLÖN KUPLA JA FOKUSVIRRAN KORTTI. Aarrekuittaus tulee samasta
 *     hetkestä kuin nosto itse (js/fokusvirta.js aarreLoytyi) ja kupla
 *     nousee samaan alalaitaan. Kaksi kelluvaa paperia päällekkäin oli
 *     omistajan pelitesteissä toistuva vika, ja järjestys on tässä
 *     luonnostaan oikea: ensin pöllö sanoo sanottavansa, sitten otsikko
 *     nousee. Kuplan sulkeminen ajaa tämän päivityksen heti
 *     (js/fokusvirta.js suljeFokusvirta), eikä nosto siis jää odottamaan
 *     seuraavaa piirtoa.
 */
function nostoRuutuVapaa() {
  if (document.querySelector('dialog[open]')) return false;
  if (document.querySelector('.fokusvirta-kupla, .fokusvirta-kortti')) return false;
  if (document.querySelector('.fokuszoom, .fokuskohde-popup')) return false;
  return !(document.body.classList.contains('flight-active')
    || document.body.classList.contains('kartalento'));
}

/**
 * UUSI YRITYS, KUN RUUTU ON VARATTU.
 *
 * Sama kaava ja sama perustelu kuin pöllön aarrekuittauksella
 * (js/fokusvirta.js kerroAarteesta): peli ei kutsu piirtoa joka kerta
 * kun jokin kelluva pinta sulkeutuu, joten yritystä toistetaan — mutta
 * katto pitää huolen siitä, ettei ajastin jää pyörimään, jos pelaaja
 * jää lukemaan lehteä tai lähtee valikkoon. Seuraava piirto aloittaa
 * uuden yrityssarjan.
 */
const NOSTO_YRITYS_MS = 900;
const NOSTO_YRITYKSIA = 30;

/* ==================== NOSTON PIIRTO ==================== */

/**
 * KYTKENTÄ RENDERIIN (js/fokusvirta.js asetaNostopinta → kutsutaan
 * fokusvirtaSaapumisesta, jonka js/ui.js render ajaa joka piirrossa).
 *
 * TYÖ TEHDÄÄN VAIN KUN NOSTO VAIHTUU. Ruudulla oleva nosto jätetään
 * rauhaan, jottei se aloita nousuanimaatiotaan alusta joka piirrossa —
 * ja jotta luetun tilalle nouseva seuraava saa oman nousunsa.
 */
export function paivitaFokusnosto(ui, yritys = 0) {
  if (typeof document === 'undefined' || !ui) return;
  clearTimeout(ui.fokusnostoAjastin);
  const nosto = nostoVuorossa(ui);
  if (!nosto) {
    suljeFokusnosto(ui);
    return;
  }
  if (!nostoRuutuVapaa()) {
    suljeFokusnosto(ui);
    if (yritys < NOSTO_YRITYKSIA) {
      ui.fokusnostoAjastin = setTimeout(
        () => paivitaFokusnosto(ui, yritys + 1), NOSTO_YRITYS_MS,
      );
    }
    return;
  }
  if (ui.fokusnosto?.id === nosto.id && ui.fokusnosto.el?.isConnected) return;
  suljeFokusnosto(ui);
  nostoLataaTyyli();
  ui.fokusnosto = { id: nosto.id, el: piirraNosto(ui, nosto) };
}

/**
 * Nosto pois ruudulta. Muistiin ei kosketa — se on eri asia.
 *
 * SIIVOUS TEHDÄÄN VALITSIMELLA eikä pelkällä muistiin jääneellä
 * viitteellä: uusi peli rakentaa uuden UI-olion (js/main.js), jolloin
 * vanha viite katoaa mutta liuska jäisi bodyyn roikkumaan.
 */
export function suljeFokusnosto(ui) {
  if (ui) ui.fokusnosto = null;
  if (typeof document === 'undefined') return;
  for (const vanha of document.querySelectorAll('.fokusnosto')) vanha.remove();
}

/**
 * KLIKKIOTSIKKO + MINIATYYRI PERÄSSÄ.
 *
 * Rakenne on tarkalleen se, mitä tilaus sanoo: yksi lause ja sen
 * PERÄSSÄ pieni kuva, koko liuska yhtenä painikkeena. Rasti on oma
 * painikkeensa liuskan kyljessä — sillä noston voi työntää syrjään
 * lukematta, ja silloin se nousee vielä uudelleen (istunnon oma
 * `fokusnostoOhitetut`, ei laitteen muisti).
 */
function piirraNosto(ui, nosto) {
  const liuska = html('div', 'fokusnosto');
  liuska.setAttribute('role', 'group');
  liuska.setAttribute('aria-label', 'Täkynosto');

  const nappi = html('button', 'fokusnosto-nappi');
  nappi.type = 'button';
  nappi.setAttribute('aria-label', `${nosto.otsikko} — lue lisää`);
  nappi.appendChild(html('span', 'fokusnosto-otsikko', nosto.otsikko));
  if (nosto.kuva) {
    const mini = document.createElement('img');
    mini.className = 'fokusnosto-mini';
    mini.alt = '';
    mini.decoding = 'async';
    mini.draggable = false;
    // Rikkinäinen kuva ei saa jättää tyhjää laatikkoa otsikon perään:
    // otsikko kantaa noston yksinkin.
    asetaKuva(mini, valokuvaUrl(nosto.kuva.tiedosto, NOSTO_MINI_PX),
      valokuvaVara(nosto.kuva.tiedosto, NOSTO_MINI_PX), () => mini.remove());
    nappi.appendChild(mini);
  }
  nappi.addEventListener('click', () => {
    sfx.play('paper');
    nostoMerkitseLuetuksi(nosto.id);
    suljeFokusnosto(ui);
    avaaNostonKortti(ui, nosto);
  });
  liuska.appendChild(nappi);

  const sulje = html('button', 'fokusnosto-sulje', '✕');
  sulje.type = 'button';
  sulje.title = 'Piilota';
  sulje.setAttribute('aria-label', 'Piilota täkynosto');
  sulje.addEventListener('click', () => {
    sfx.play('paper');
    (ui.fokusnostoOhitetut ??= new Set()).add(nosto.id);
    suljeFokusnosto(ui);
    // Seuraava poolista saa nousta heti tilalle.
    paivitaFokusnosto(ui);
  });
  liuska.appendChild(sulje);

  document.body.appendChild(liuska);
  // Nousu alkaa vasta seuraavassa kehyksessä: ilman pakotettua
  // tyylinlaskentaa selain niputtaa lähtö- ja maalitilan samaan
  // kehykseen eikä näe niiden välillä eroa (sama oppi kuin fokusvirran
  // suurennoksella).
  void liuska.offsetWidth;
  liuska.classList.add('fokusnosto-nousee');
  return liuska;
}

/* ==================== LUNASTUSKORTTI ==================== */

/**
 * NOSTON OMA KORTTI — tässä otsikon lupaus lunastetaan.
 *
 * Kortti on kartan päällä kelluva paperi, ei koko ruudun modaali: sama
 * sääntö kuin fokusvirran kortilla — kartta on näkymä, teksti on annos
 * sen päällä. Napautus kortin ulkopuolelle tai Esc sulkee, ja
 * sulkemisen jälkeen poolin seuraava nosto saa nousta.
 */
function avaaNostonKortti(ui, nosto) {
  nostoLataaTyyli();
  suljeNostonKortti(ui);

  const kerros = html('div', 'fokusnosto-kerros');
  const kortti = html('div', 'fokusnosto-kortti');
  kortti.setAttribute('role', 'dialog');
  kortti.setAttribute('aria-modal', 'false');
  kortti.setAttribute('aria-label', nosto.otsikko);

  const sulje = html('button', 'fokusnosto-kortti-sulje', '✕');
  sulje.type = 'button';
  sulje.title = 'Sulje';
  sulje.setAttribute('aria-label', 'Sulje');
  kortti.appendChild(sulje);

  const sisalto = html('div', 'fokusnosto-sisalto');
  // Ylärivi kertoo KUKA nostoa tarjoaa: pöllö on ikivanha
  // silminnäkijä-reportteri, ja täkynostot ovat sen heiniä (Raamattu,
  // PÖLLÖN KARAKTÄÄRI).
  sisalto.appendChild(html('p', 'fokusnosto-ylarivi', 'Pöllön leikekirja'));
  sisalto.appendChild(html('h3', 'fokusnosto-kortti-otsikko', nosto.otsikko));
  if (nosto.kuva) piirraNostonKuva(sisalto, nosto.kuva);
  const teksti = html('div', 'fokusnosto-teksti');
  for (const kappale of jaaKappaleiksi(nosto.teksti)) {
    teksti.appendChild(html('p', '', kappale));
  }
  sisalto.appendChild(teksti);
  if (nosto.lahde) sisalto.appendChild(html('p', 'fokusnosto-lahde', nosto.lahde));

  /*
   * KOHDENAPPI, KUN KARTALLA ON SAMA PAIKKA. Nosto *"houkuttelee
   * kohteen auki"* (omistajan tilaus), ja kun kohteella on jo oma
   * karttamerkki, sinne mennään pelin omalla tietoruudulla eikä uudella
   * pinnalla. Kortti sulkeutuu samalla: kaksi korttia päällekkäin olisi
   * juuri sitä raskautta, jota kevyt kulku purkaa.
   */
  const kohde = nostonKarttakohde(ui, nosto);
  if (kohde) {
    const nappi = html('button', 'fokusnosto-kohdenappi', `Katso ${kohde.nimi} kartalla`);
    nappi.type = 'button';
    nappi.addEventListener('click', () => {
      suljeNostonKortti(ui);
      avaaFokuskohde(ui, kohde);
    });
    sisalto.appendChild(nappi);
  }

  kortti.appendChild(sisalto);
  kerros.appendChild(kortti);
  document.body.appendChild(kerros);

  const kiinni = () => {
    sfx.play('paper');
    suljeNostonKortti(ui);
  };
  sulje.addEventListener('click', kiinni);
  // Napautus kortin ULKOPUOLELLE sulkee; kortin päällä se ei tee mitään,
  // jotta tekstiä voi valita ja nappeja painaa.
  kerros.addEventListener('pointerdown', (tapahtuma) => {
    if (tapahtuma.target?.closest?.('.fokusnosto-kortti')) return;
    kiinni();
  });
  const nappain = (tapahtuma) => {
    if (tapahtuma.key !== 'Escape') return;
    tapahtuma.stopPropagation();
    suljeNostonKortti(ui);
  };
  document.addEventListener('keydown', nappain, true);

  ui.fokusnostoKortti = {
    kerros,
    purku: () => document.removeEventListener('keydown', nappain, true),
  };
  void kerros.offsetWidth;
  kerros.classList.add('fokusnosto-kortti-auki');
  sfx.play('paper');
}

/**
 * KOHDE KARTALLA — vain jos sinne oikeasti pääsee juuri nyt.
 *
 * Tietoruutu asemoidaan kohteen karttamerkin viereen (js/fokuskohteet.js
 * asetaKohteenPaikka), joten ilman merkkiä se jäisi ruudun nurkkaan
 * ilman ankkuria. Merkit myös SAMMUVAT, kun fokuslehti ei täytä riittävää
 * osaa näkymästä, ja silloin niiden kerros sulkee avatun ruudun heti.
 * Kummassakin tapauksessa nappi jää pois eikä lupaa mitään, mitä
 * napautus ei tekisi.
 */
function nostonKarttakohde(ui, nosto) {
  if (!nosto?.kohde) return null;
  if (!ui?.fokuskohdeMerkit?.get(nosto.kohde)?.length) return null;
  if (ui.fokuskohdeKerros?.classList?.contains('fokuskohteet-piilossa')) return null;
  return fokuskohteet([nosto.kohde])[0] ?? null;
}

/** Kortti pois, kuuntelijat puretaan ja poolin seuraava saa nousta. */
export function suljeNostonKortti(ui) {
  const auki = ui?.fokusnostoKortti;
  if (ui) ui.fokusnostoKortti = null;
  auki?.purku?.();
  if (typeof document !== 'undefined') {
    for (const vanha of document.querySelectorAll('.fokusnosto-kerros')) vanha.remove();
  }
  if (auki) paivitaFokusnosto(ui);
}

/** Kortin kuva selitteineen ja lähteineen (CC BY vaatii tekijän). */
function piirraNostonKuva(kohde, kuva) {
  const kehys = html('figure', 'fokusnosto-kuva');
  const img = document.createElement('img');
  img.alt = kuva.selite ?? '';
  img.decoding = 'async';
  img.draggable = false;
  const piilota = () => { kehys.hidden = true; };
  asetaKuva(img, valokuvaUrl(kuva.tiedosto, NOSTO_KUVA_PX),
    valokuvaVara(kuva.tiedosto, NOSTO_KUVA_PX), piilota);
  kehys.appendChild(img);
  const teksti = html('figcaption', 'fokusnosto-kuvateksti');
  teksti.append(
    html('span', 'fokusnosto-kuvaselite', kuva.selite ?? ''),
    html('span', 'fokusnosto-kuvalahde', kuva.lahde ?? ''),
  );
  kehys.appendChild(teksti);
  kohde.appendChild(kehys);
}

/* ==================== KYTKENTÄ ==================== */

/**
 * KYTKENTÄKOHTA js/main.js:ssä.
 *
 * Kutsu asettaa täkynoston fokusvirran piirtopinnaksi, ja siitä eteenpäin
 * nosto elää pelin oman renderin tahdissa ilman uutta riviä js/ui.js:ssä
 * (ks. js/fokusvirta.js asetaNostopinta).
 *
 * MIKSI ERILLINEN KUTSU EIKÄ SIVUVAIKUTUS MODUULIN LATAUKSESSA:
 * niputuksen vartija (tools/tarkista-niputus.mjs) vaatii, että jokainen
 * listattu moduuli on jonkin toisen listatun moduulin STAATTISESTI
 * tuoma — pelkkä `import './fokusnosto.js';` ei näy sille tuontina.
 * Nimetty kutsu on samalla luettava: käynnistystiedostosta näkee, että
 * täkynosto on osa peliä.
 */
export function kytkeFokusnosto() {
  asetaNostopinta(paivitaFokusnosto);
}

/**
 * Laudan vaihto tai uusi peli: nosto ja kortti pois.
 *
 * Kartan tietoruutu suljetaan samalla, koska nosto on voinut avata sen:
 * uuden laudan päälle jäänyt Delfoin kortti olisi merkintä kartasta,
 * jota ei enää ole.
 */
export function nollaaFokusnosto(ui) {
  if (ui) {
    ui.fokusnostoOhitetut = new Set();
    // Kortin muistiviite pois ENNEN sulkua: muuten sulku kutsuisi
    // paivitaFokusnostoa, joka nostaisi seuraavan noston juuri
    // nollattavan laudan päälle.
    ui.fokusnostoKortti?.purku?.();
    ui.fokusnostoKortti = null;
  }
  suljeNostonKortti(ui);
  suljeFokusnosto(ui);
  suljeFokuskohde(ui);
}
