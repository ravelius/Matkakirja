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
 * ── YKSI TÄKY PER MAA (omistaja 26.8.2026 ilta) ────────────────────
 *
 * *"Täkyjä josta tulee puhekupla pitää olla vain yksi per maa. Kaikki
 * muut normaaleita. Ja kun täkyä painaa niin sen pitäisi aueta suoraan
 * pop upiksi ilman pelkkää otsikko nostoa. Kreikassa vielä useampi."*
 *
 * Ennen tätä maan poolissa oli kolmesta viiteen nostoa: yksi nousi
 * kuplaan ja loput jäivät kartalle täkysymboleiksi, joiden napautus
 * NOSTI täyn kuplaan — ja vasta kuplan napista pääsi lunastukseen.
 * Kaksi napautusta, kaksi eri merkkilajia samalla lehdellä.
 *
 * Nyt jokaisen maan poolissa on TASAN YKSI nosto (nostoMaanPooli
 * leikkaa poolin, jotta sääntö on koodissa eikä pelkässä datassa), ja
 * loput entiset nostot ovat kartan tavallisia kohteita omissa
 * pakettitiedostoissaan (js/packs/fokuskohteet-*.js). Siitä seuraa
 * kolme yksinkertaistusta:
 *
 *   - symbolikerroksella on enää AKTIIVISEN täyn ankkuri, ei muita
 *     merkkejä — ja siksi symbolin napautusta ei enää ole;
 *   - kupla on kokonaisuudessaan yksi painike, joka avaa lunastuksen
 *     suoraan (piirraNostonKupla);
 *   - mekaniikka jää muuten ennalleen: luettu täky ei nouse enää, ja
 *     ohitettu (liuskan rasti) väistyy istunnon ajaksi.
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
 * ── PUHEKUPLA SIIHEN KOHTAAN KARTTAA, JOTA JUTTU KOSKEE ────────────
 *
 * Raamatun osio "Fokusmoodi", kohta TÄKYSYMBOLIT (omistaja 25.8.2026):
 * *"kartalla on tekstikuplassa VAIN YKSI täkynosto kerrallaan."*
 * Omistajan sanoin samana päivänä: *"täkyn pitäisi tulla puhekuplana
 * siihen kohtaan karttaa jota tapahtuma koskee."*
 *
 * Nosto on siis kaksiosainen:
 *
 *   1. KUPLA (tämä tiedosto) — HTML kartan päällä, koska nosto on
 *      tekstiä ja pieni kuva, ja ne HTML taittaa mutta SVG ei. Kupla
 *      seuraa ankkuriaan panoroinnissa ja zoomissa, ja sen nokka
 *      osoittaa siihen pisteeseen kartalla, jota juttu koskee. KOKO
 *      KUPLA ON PAINIKE: napautus mihin tahansa siinä avaa
 *      lunastuskortin suoraan (omistaja 26.8.2026 ilta).
 *   2. ANKKURISYMBOLI (js/fokusnosto-symbolit.js) — SVG kartan omassa
 *      kerroksessa, koska se ankkuroituu laudan koordinaatteihin ja
 *      elää kartan mukana. Se on kuplan alla oleva merkintä paikasta
 *      eikä painike; kupla on sen päällä ja hoitaa napautuksen.
 *
 * ILMAN PAIKKAA VANHA ALALAIDAN LIUSKA JÄÄ VARAPOLUKSI. Nostolla ei ole
 * pakko olla `paikka`-kenttää — sitä ilman kupla jäisi ilman ankkuria,
 * ja silloin nosto piirtyy kuten ennenkin ruudun alalaitaan.
 *
 * EI SUODATTIMIA missään muodossa (js/fokuskartta.js sääntö 3,
 * tests/rules.test.mjs): nousu on `transform` ja `opacity`, ei blur
 * eikä varjosuodatin.
 *
 * ── KARTAN LIIKE ILMAN UUTTA PIIRTOA ───────────────────────────────
 *
 * Panorointi on CSS-muunnos kartan SIIRTOKUORELLA (js/kartta.js
 * asetaPan; wrapper-siirto 26.8.2026 — ennen kohde oli SVG-juuri) eikä
 * uusi piirto, joten mikään ei kutsu tätä moduulia kesken eleen. Kupla
 * ja symbolit seuraavat siksi omaa vahtiaan: MutationObserver kartan
 * SVG:n `viewBox`- ja `style`-attribuuteilla sekä kuoren `style`-
 * attribuutilla (nostoVahdiKarttaa). Työ niputetaan yhteen
 * requestAnimationFrameen, ja se on kaksi
 * setAttributea ja yksi mittaus — ei uusia solmuja eikä uutta ladontaa.
 * js/ui.js:ään ei siis tarvita riviä lisää.
 *
 * ── MIKSI document.body EIKÄ .map-pane ─────────────────────────────
 *
 * Kartan eleet (panorointi, zoomi) kuunnellaan karttapaneelista
 * (js/kartta.js: `pane = this.ui.mapPane`), ja paneelin sisällä
 * olevan kelluvan pinnan napautus pitää erikseen tunnistaa
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
import {
  asemoiNostosymbolit, nollaaNostosymbolit, nostosymAnkkuri, NOSTOSYM_TYYPIT,
  paivitaNostosymbolit,
} from './fokusnosto-symbolit.js';
import { asetaNostopinta, fokusvirtaLukitseeLehden, fokusvirtaSisalto } from './fokusvirta.js';
import { sfx } from './sound.js';

/* ==================== POOLI ==================== */

/*
 * KREIKAN TÄKYNOSTO (omistajan valinta 25.8.2026).
 *
 * YKSI NOSTO, EI ENEMPÄÄ (omistaja 26.8.2026 ilta: *"Täkyjä josta tulee
 * puhekupla pitää olla vain yksi per maa. Kaikki muut normaaleita. …
 * Kreikassa vielä useampi."*). Poolissa oli viisi nostoa, joista yksi
 * nousi kuplaan ja neljä jäi kartalle täkysymboleiksi. Nyt jäljellä on
 * omistajan kärkivalinta eli poolin ensimmäinen, ja loput ovat kartan
 * tavallisia kohteita (js/packs/fokuskohteet-grc.js, oma erälohkonsa) —
 * kaksi niistä jäi kokonaan pois, koska niiden paikalla on jo kohde.
 *
 * Lunastus on aineiston omaa, lähteestä tarkistettua tekstiä
 * (docs/mantereet-tyoaineisto/takynostot-kreikka.md, ehdokas 2) —
 * siitä on paikoin lyhennetty, muttei lisätty eikä muutettu yhtään
 * faktaväitettä. Lähderivi on kortissa näkyvissä.
 *
 * KUVA on kysytty Commonsin imageinfo-rajapinnalta 25.8.2026 (koko,
 * lisenssi, tekijä, päiväys) — nimeä ei ole arvattu:
 *   - Sophia Schliemann wearing gold jewelry.jpg — 1093×1273, public
 *     domain, n. 1873. Kuva on JO PELISSÄ (js/packs/fokusvirta-ateena.js
 *     matkakirja.kuva), ja miniatyyri on tarkoituksella sama: pelaaja
 *     tunnistaa sen isoisän merkinnästä, ja juuri se tekee otsikosta
 *     koukun.
 *
 * IKÄSOPIVUUS (13+, Perustuslaki): Sofian tarinasta on jätetty pois
 * aineistossa erikseen hylätty avioliittokulma.
 *
 * ── PAIKKA LAUDALLA (omistaja 25.8.2026: kupla siihen kohtaan) ─────
 *
 * Koordinaatit on laskettu SAMALLA MENETELMÄLLÄ kuin kohtaamispisteillä
 * (js/packs/fokusvirta-ateena.js) ja kartan kohteilla
 * (js/packs/fokuskohteet-grc.js): pelissä EI ole projektiokoodia, vaan
 * asteet on muunnettu laudan yksiköiksi valmiiksi ja asteet jätetty
 * kommenttiin, jotta luvut voi laskea uudelleen jos lauta vaihtaa
 * projektiota.
 *
 *   maailmankartta — Millerin lieriö, LEVEYS 12000 / LON0 -175 /
 *     POHJOINEN 76 (tools/fokuskartta/piirto.js laudanProjektio).
 *   europe — tasaväli, x = (lon + 11) × 19,2 ja y = (72 − lat) × 26,3
 *     (js/packs/europe.js).
 *
 * Lauta, jota rivillä ei ole, ei saa kuplaa vaan alalaidan liuskan —
 * väärään paikkaan ankkuroitu kupla olisi pahempi kuin ankkuroimaton.
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
      /*
       * Iliou Melathron, Schliemannin oma talo Ateenassa (23,7342 E /
       * 37,9814 N — en-Wikipedia "Iliou Melathron"). Juuri siitä talosta
       * Sofia lähti korut yllään, ja se on kadun päässä siitä
       * kansallismuseosta, jonne Troijan löydöt lopulta päätyivät.
       */
      paikka: {
        nimi: 'Ateena',
        laudat: {
          maailmankartta: { x: 6624.5, y: 1881.6 },
          europe: { x: 666.9, y: 894.7 },
        },
      },
      kuva: {
        tiedosto: 'Sophia Schliemann wearing gold jewelry.jpg',
        selite: 'Sofia Schliemann "Helenan koruissa". Juuri tämä kuva '
          + 'kertoi viranomaisille, missä Troijan kulta oli.',
        lahde: 'Tuntematon kuvaaja n. 1873, Wikimedia Commons (public domain)',
      },
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
   *
   * PACKIN POOLI SAA SAMAT KENTÄT: valinnainen `paikka` (kupla ja
   * ankkurisymboli kartalle) ja valinnainen `symboli: 'elain'`
   * (pöllövauva huutomerkin sijaan) kulkevat levityksen mukana
   * sellaisenaan, joten kenttien lisääminen pakettiin ei vaadi riviä
   * tänne.
   */
  const oma = fokusvirtaSisalto(ui, city)?.takynostot;
  if (Array.isArray(oma) && oma.length) {
    return nostoYksiPerMaa(oma.map((n) => (n.teksti ? n : { ...n, teksti: n.lunastus })));
  }
  const taulu = ui?.game?.pack?.map?.cityCountry;
  const iso = (taulu && city && taulu[city.id]) || null;
  return (iso && nostoYksiPerMaa(NOSTO_MAAT[iso])) || null;
}

/**
 * YKSI TÄKY PER MAA — SÄÄNTÖ ON KOODISSA EIKÄ PELKÄSSÄ DATASSA.
 *
 * Omistaja 26.8.2026 ilta: *"Täkyjä josta tulee puhekupla pitää olla
 * vain yksi per maa."* Poolit on karsittu jo datassa (jokaisessa
 * `takynostot`-listassa ja NOSTO_MAAT-taulussa on yksi rivi), mutta
 * leikkaus on tässäkin: uusi maa tai vahingossa jäänyt toinen rivi ei
 * saa palauttaa kartalle sitä kahden merkkilajin sekamelskaa, joka
 * juuri purettiin. Jos poolia halutaan joskus taas kasvattaa, muutos
 * tehdään tietoisesti tähän yhteen kohtaan.
 */
function nostoYksiPerMaa(pooli) {
  return Array.isArray(pooli) && pooli.length ? pooli.slice(0, 1) : null;
}

/**
 * MITKÄ POOLIN NOSTOT OVAT YHÄ TARJOLLA — riippumatta siitä, onko ruutu
 * vapaa?
 *
 * NÄKYVYYSEHDOT OVAT TÄSMÄLLEEN LIUSKAN AIKAISET (omistajan tilaus:
 * sama hetki, sama pooli, sama kirjanpito). Kolme ehtoa, kaikki
 * pakollisia:
 *   1. kaupungilla on fokusvirtasisältö (eli fokusmoodi on päällä,
 *      pelaaja on ihminen ja laudalla on kevyt kulku käytössä);
 *   2. MAAN AARRE ON LÖYTYNYT — laatta on käännetty, eli lehtilukko on
 *      auennut (fokusvirtaLukitseeLehden palauttaa false). Ennen sitä
 *      pelaajalla on kesken toinen asia, eikä nosto saa kilpailla siitä;
 *   3. nosto on lukematon (laitteen muisti) ja ohittamaton (istunto).
 *
 * LUNASTETTU TÄKY EI PALAA KARTALLE: luetut karsitaan tästä yhdestä
 * listasta, josta sekä kupla että sen ankkurisymboli syntyvät.
 */
function nostoJaljella(ui) {
  if (typeof document === 'undefined') return [];
  if (!ui || ui.dead || ui.katselu) return [];
  const city = ui.game?.cityOf?.();
  if (!city || !fokusvirtaSisalto(ui, city)) return [];
  if (fokusvirtaLukitseeLehden(ui, city)) return [];
  const pooli = nostoMaanPooli(ui, city);
  if (!pooli) return [];
  const luetut = nostoLuetut();
  const ohitetut = ui.fokusnostoOhitetut ?? new Set();
  return pooli.filter((n) => !luetut.has(n.id) && !ohitetut.has(n.id));
}

/**
 * MIKÄ NOSTO ON KUPLASSA?
 *
 * Poolin ainoa tarjolla oleva — tai ei mitään, jos kuplan kiintiö on
 * jo käytetty tässä istunnossa.
 */
function nostoVuorossa(ui, jaljella) {
  if (!jaljella.length) return null;
  /*
   * VAIN YKSI KUPLA ISTUNNOSSA (omistajan tilaus v1119, kohta 20:
   * *"Ruudulle saa tulla VAIN YKSI täkykupla, eikä sen jälkeen enempää
   * kuplia"*).
   *
   * Ennen jokainen luettu täky nosti seuraavan kuplaan, ja kaupungissa
   * saattoi ponnahtaa kolme kuplaa peräkkäin. Lippu on istunnon tieto:
   * uusi kaupunki samassa istunnossa ei ala kuplasta, koska mekaniikka
   * on jo nähty.
   */
  if (ui?.fokusnostoKuplaNahty) return null;
  return jaljella[0];
}

/* ==================== PAIKKA LAUDALLA ==================== */

/**
 * NOSTON PAIKKA TÄLLÄ LAUDALLA, tai null.
 *
 * Kenttä on valinnainen ja se annetaan kahdessa muodossa: `paikka.laudat`
 * (eri koordinaatit maailmankartalle ja maanosalaudalle, kuten
 * kohtaamispisteellä ja kartan kohteilla) tai suoraan `{x, y}`, jos
 * paketti palvelee vain yhtä lautaa. Ilman kelvollisia lukuja nosto
 * jää liuskaksi.
 */
function nostonPaikka(ui, nosto) {
  const paikka = nosto?.paikka;
  if (!paikka) return null;
  const lauta = ui?.game?.pack?.id;
  const koordit = paikka.laudat ? paikka.laudat[lauta] : paikka;
  if (!Number.isFinite(koordit?.x) || !Number.isFinite(koordit?.y)) return null;
  return { x: koordit.x, y: koordit.y, nimi: paikka.nimi ?? null };
}

/**
 * KUPLAN ANKKURIMERKINTÄ, tai null jos täyllä ei ole paikkaa tällä
 * laudalla (silloin piirtyy alalaidan liuska eikä kartalle tule mitään).
 *
 * SYMBOLI TULEE DATASTA: täyn `symboli`-kenttä on Raamatun
 * SYMBOLITAKSONOMIAN kategoria ('elain', 'historia', 'ruoka', … —
 * koko lista js/fokusnosto-symbolit.js NOSTOSYM_TYYPIT). Muut arvot
 * ja puuttuva kenttä → keltainen huutomerkki, kuten alusta asti.
 */
function nostonMerkinta(ui, nosto) {
  const paikka = nosto ? nostonPaikka(ui, nosto) : null;
  if (!paikka) return null;
  return {
    id: nosto.id,
    otsikko: nosto.otsikko,
    symboli: NOSTOSYM_TYYPIT.has(nosto.symboli) ? nosto.symboli : 'huuto',
    paikka,
  };
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
/*
 * Hengähdys sen jälkeen kun ruutu vapautui (pöllön kuittauskupla,
 * lehti, lento). Omistajan tilaus v1119: *"muutaman sekunnin viive
 * pöllön kuplan jälkeen"*.
 */
const NOSTO_KUPLAN_VIIVE_MS = 2600;

/* ==================== NOSTON PIIRTO ==================== */

/**
 * KYTKENTÄ RENDERIIN (js/fokusvirta.js asetaNostopinta → kutsutaan
 * fokusvirtaSaapumisesta, jonka js/ui.js render ajaa joka piirrossa).
 *
 * TYÖ TEHDÄÄN VAIN KUN NOSTO VAIHTUU. Ruudulla oleva nosto jätetään
 * rauhaan, jottei se aloita nousuanimaatiotaan alusta joka piirrossa.
 * Sama sääntö on ankkurikerroksella: se vertaa omaa avaintaan eikä pura
 * yhtäkään solmua turhaan.
 */
export function paivitaFokusnosto(ui, yritys = 0) {
  if (typeof document === 'undefined' || !ui) return;
  clearTimeout(ui.fokusnostoAjastin);
  const jaljella = nostoJaljella(ui);
  if (!jaljella.length) {
    suljeFokusnosto(ui);
    return;
  }
  nostoLataaTyyli();
  const nosto = nostoVuorossa(ui, jaljella);
  const merkinta = nostonMerkinta(ui, nosto);
  const paikka = merkinta?.paikka ?? null;
  /*
   * ANKKURI KARTALLE ENSIN. Kerros vertaa omaa avaintaan ja tekee työtä
   * vain kun täky vaihtuu; kupla tarvitsee kerroksen ankkurin, joten sen
   * on oltava kartalla ennen kuin kuplaa asemoidaan.
   *
   * Kun kuplan vuoro on käytetty (`nosto` on null), kartalle ei jää
   * mitään: poolissa on vain tämä yksi täky, ja muut maan aiheet ovat
   * kartan tavallisia kohteita (js/fokuskohteet.js).
   */
  paivitaNostosymbolit(ui, { merkinta });
  // Vahti vain silloin kun kartalla on jotain seurattavaa: pelkkä liuska
  // on ruudun elementti eikä liiku kartan mukana.
  if (merkinta) nostoVahdiKarttaa(ui);
  else nostoLopetaVahti(ui);
  if (!nosto) { nostoPintaPois(ui); return; }
  if (!nostoRuutuVapaa()) {
    nostoPintaPois(ui);
    ui.fokusnostoRuutuOliVarattu = true;
    if (yritys < NOSTO_YRITYKSIA) {
      ui.fokusnostoAjastin = setTimeout(
        () => paivitaFokusnosto(ui, yritys + 1), NOSTO_YRITYS_MS,
      );
    }
    return;
  }
  /*
   * HENGÄHDYS PÖLLÖN KUPLAN JÄLKEEN (omistajan tilaus v1119, kohta
   * 20b: *"ENSIMMÄINEN täkynosto (kupla) tulee kartalle heti kun aarre
   * on löytynyt JA pöllön kuittauskupla on näytetty — muutaman
   * sekunnin viive pöllön kuplan jälkeen"*).
   *
   * Ruutu vapautui juuri: kuplaa ei nosteta samassa silmänräpäyksessä
   * kuin edellinen katosi, vaan sen verran myöhemmin että pelaaja
   * ehtii nähdä kartan välissä.
   */
  if (ui.fokusnostoRuutuOliVarattu) {
    ui.fokusnostoRuutuOliVarattu = false;
    ui.fokusnostoAjastin = setTimeout(() => paivitaFokusnosto(ui), NOSTO_KUPLAN_VIIVE_MS);
    return;
  }
  /*
   * RUUDULLA OLEVA NOSTO JÄTETÄÄN RAUHAAN, jottei se aloita
   * nousuanimaatiotaan alusta joka piirrossa. Avaimessa on myös MUOTO:
   * jos lauta vaihtuu sellaiseen, jolla nostolla ei ole paikkaa, kupla
   * vaihtuu liuskaksi eikä jää roikkumaan ilman ankkuria.
   */
  const avain = `${nosto.id}:${paikka ? 'kupla' : 'liuska'}`;
  if (ui.fokusnosto?.avain === avain && ui.fokusnosto.el?.isConnected) {
    /*
     * Peli piirsi uudestaan: alanapit ovat voineet ilmestyä tai kadota
     * (Liiku-nappi), joten ruudun rajat mitataan tässä kohtaa uudelleen.
     * Kartan liikkeen aikana käytetään talletettuja lukuja.
     */
    if (paikka) { nostoMittaaKupla(ui); asetaNostokuplanPaikka(ui); }
    return;
  }
  nostoPintaPois(ui);
  // Kuplan kiintiö on käytetty tässä istunnossa (ks. nostoVuorossa).
  // Lippu on istunnon tieto eikä tallennetta.
  ui.fokusnostoKuplaNahty = true;
  ui.fokusnosto = {
    avain,
    id: nosto.id,
    el: paikka ? piirraNostonKupla(ui, nosto, paikka) : piirraNosto(ui, nosto),
  };
}

/**
 * Kupla tai liuska pois ruudulta — kartan ankkurisymboli jää.
 *
 * SIIVOUS TEHDÄÄN VALITSIMELLA eikä pelkällä muistiin jääneellä
 * viitteellä: uusi peli rakentaa uuden UI-olion (js/main.js), jolloin
 * vanha viite katoaa mutta pinta jäisi bodyyn roikkumaan.
 */
function nostoPintaPois(ui) {
  if (ui) {
    ui.fokusnosto = null;
    ui.fokusnostoKupla = null;
  }
  if (typeof document === 'undefined') return;
  for (const vanha of document.querySelectorAll('.fokusnosto, .fokusnosto-kupla')) vanha.remove();
}

/**
 * Nosto pois ruudulta kokonaan: kupla tai liuska, kartan ankkurisymboli
 * ja kartan liikkeen vahti. Muistiin ei kosketa — se on eri asia.
 */
export function suljeFokusnosto(ui) {
  nostoPintaPois(ui);
  nostoLopetaVahti(ui);
  nollaaNostosymbolit(ui);
}

/* ==================== KARTAN LIIKE ==================== */

/**
 * KUPLA JA SYMBOLIT SEURAAVAT KARTTAA ILMAN UUTTA PIIRTOA.
 *
 * Panorointi on CSS-muunnos kartan SVG:llä (js/kartta.js asetaPan) ja
 * zoomi kirjoittaa sen `viewBox`-attribuutin — kummastakaan ei seuraa
 * kutsua tähän moduuliin. Vahti kuuntelee siis suoraan noita kahta
 * attribuuttia ja niputtaa työn yhteen requestAnimationFrameen: kaksi
 * setAttributea ryhmää kohti ja yksi ankkurin mittaus. Uusia solmuja ei
 * synny, joten kesken eleen ei ladota mitään.
 *
 * Vahti on IDEMPOTENTTI: se asennetaan kerran samalle SVG:lle, ja
 * laudan vaihto (uusi SVG) asentaa sen uudelleen.
 */
function nostoVahdiKarttaa(ui) {
  if (typeof document === 'undefined' || !ui?.svg) return;
  if (ui.fokusnostoVahti && ui.fokusnostoVahtiSvg === ui.svg) return;
  nostoLopetaVahti(ui);
  /*
   * PANOROINNISSA EI RESKAALATA SYMBOLEITA. Panorointi kirjoittaa vain
   * `style.transform`in, ja symbolien muunnos riippuu pelkästä
   * mittakaavasta — se taas näkyy `viewBox`issa, jonka kartta kirjoittaa
   * aina kun zoomi muuttuu (js/kartta.js fitViewBox, sovitaAloitusZoom).
   * Attribuutin lukeminen ei pakota tyylinlaskentaa; ui.nakyvaAlue()
   * mittaisi kaksi laatikkoa turhaan joka kehyksellä.
   */
  const asemoi = () => {
    const laatikko = ui.svg?.getAttribute('viewBox') ?? '';
    if (laatikko !== ui.fokusnostoViewBox) {
      ui.fokusnostoViewBox = laatikko;
      asemoiNostosymbolit(ui);
    }
    asetaNostokuplanPaikka(ui);
  };
  const pyyda = () => {
    if (ui.fokusnostoKehys) return;
    const rAF = globalThis.requestAnimationFrame;
    if (!rAF) { asemoi(); return; }
    ui.fokusnostoKehys = rAF(() => {
      ui.fokusnostoKehys = 0;
      asemoi();
    });
  };
  // Ikkunan koon muutos vaihtaa sekä paperin mitat että ruudun rajat,
  // joten silloin — ja vain silloin — ne mitataan uudelleen.
  const mittaaUudelleen = () => { nostoMittaaKupla(ui); pyyda(); };
  const vahti = typeof MutationObserver === 'undefined' ? null : new MutationObserver(pyyda);
  vahti?.observe(ui.svg, { attributes: true, attributeFilter: ['style', 'viewBox'] });
  /*
   * SIIRTOKUORI MYÖS VAHDIN ALLE (wrapper-siirto 26.8.2026).
   * Panoroinnin muunnos kirjoitetaan kuoreen eikä lautaan, joten ilman
   * tätä kupla jäisi paikalleen kun kartta liikkuu sen alta.
   */
  if (ui.karttaKuori) {
    vahti?.observe(ui.karttaKuori, { attributes: true, attributeFilter: ['style'] });
  }
  globalThis.addEventListener?.('resize', mittaaUudelleen);
  globalThis.addEventListener?.('orientationchange', mittaaUudelleen);
  ui.fokusnostoVahtiSvg = ui.svg;
  ui.fokusnostoVahti = () => {
    vahti?.disconnect();
    globalThis.removeEventListener?.('resize', mittaaUudelleen);
    globalThis.removeEventListener?.('orientationchange', mittaaUudelleen);
    if (ui.fokusnostoKehys) globalThis.cancelAnimationFrame?.(ui.fokusnostoKehys);
    ui.fokusnostoKehys = 0;
  };
}

/** Vahti pois. Jokainen lisätty kuuntelija on purettava. */
function nostoLopetaVahti(ui) {
  if (!ui) return;
  ui.fokusnostoVahti?.();
  ui.fokusnostoVahti = null;
  ui.fokusnostoVahtiSvg = null;
  ui.fokusnostoViewBox = null;
}

/**
 * ALALAIDAN LIUSKA — VARAPOLKU ILMAN PAIKKAA.
 *
 * Alkuperäinen esitystapa: yksi lause ja sen PERÄSSÄ pieni kuva, koko
 * liuska yhtenä painikkeena, rasti sen kyljessä. Tämä piirtyy enää
 * silloin, kun nostolla ei ole `paikka`-kenttää tälle laudalle — kupla
 * ilman ankkuria olisi pahempi kuin ankkuroimaton liuska. EI POISTETA
 * (omistajan tilaus): uusi maa saattaa tulla peliin ennen kuin sen
 * täkyjen koordinaatit on laskettu.
 */
function piirraNosto(ui, nosto) {
  const liuska = html('div', 'fokusnosto');
  liuska.setAttribute('role', 'group');
  liuska.setAttribute('aria-label', 'Täkynosto');
  liuska.append(nostoKlikkiotsikko(ui, nosto), nostoRasti(ui, nosto));

  document.body.appendChild(liuska);
  // Nousu alkaa vasta seuraavassa kehyksessä: ilman pakotettua
  // tyylinlaskentaa selain niputtaa lähtö- ja maalitilan samaan
  // kehykseen eikä näe niiden välillä eroa (sama oppi kuin fokusvirran
  // suurennoksella).
  void liuska.offsetWidth;
  liuska.classList.add('fokusnosto-nousee');
  return liuska;
}

/**
 * KLIKKIOTSIKKO + MINIATYYRI YHTENÄ PAINIKKEENA — sama pala kuplassa ja
 * liuskassa. Otsikkotaso, teksti ja kuva ovat samat kummassakin; vain
 * kehys ympärillä vaihtuu (omistajan tilaus: *"sama otsikkoteksti +
 * miniatyyri, klikkiotsikkotaso säilyy"*).
 *
 * KUPLASSA PAINIKE ON ITSE PAPERI. Omistaja 26.8.2026 ilta: *"kun täkyä
 * painaa niin sen pitäisi aueta suoraan pop upiksi"* — jos painike olisi
 * kuplan sisällä oma laatikkonsa, paperin reunoille jäisi kuollutta
 * pintaa, joka ei tee mitään. Siksi kutsuja antaa valmiin elementin
 * (`nappi`), ja kuplassa se on `.fokusnosto-kuplapaperi` itse.
 */
function nostoKlikkiotsikko(ui, nosto, nappi = html('button', 'fokusnosto-nappi')) {
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
  return nappi;
}

/**
 * RASTI — noston voi työntää syrjään lukematta, ja silloin se ei nouse
 * enää tässä istunnossa (`fokusnostoOhitetut`, ei laitteen muisti).
 */
function nostoRasti(ui, nosto) {
  const sulje = html('button', 'fokusnosto-sulje', '✕');
  sulje.type = 'button';
  sulje.title = 'Piilota';
  sulje.setAttribute('aria-label', 'Piilota täkynosto');
  sulje.addEventListener('click', () => {
    sfx.play('paper');
    (ui.fokusnostoOhitetut ??= new Set()).add(nosto.id);
    suljeFokusnosto(ui);
    paivitaFokusnosto(ui);
  });
  return sulje;
}

/* ==================== PUHEKUPLA KARTALLA ==================== */

/** Kuplan ja ruudun reunan väliin jäävä vara pikseleinä. */
const NOSTO_KUPLA_MARGINAALI = 8;
/** Ankkurin ja kuplan väliin jäävä rako — nokan korkeus. */
const NOSTO_NOKKA = 12;
/** Kuinka lähelle kuplan reunaa nokka saa liukua. */
const NOSTO_NOKKA_VARA = 16;

/**
 * PUHEKUPLA SIIHEN KOHTAAN KARTTAA, JOTA JUTTU KOSKEE.
 *
 * Rakenne on kolmiportainen, ja jokaisella portaalla on oma tehtävänsä:
 *
 *   .fokusnosto-kupla       kiinteä laatikko bodyssa, jonka PAIKKA
 *                           kirjoitetaan `transform`-muunnoksena — se on
 *                           kompositorin työtä, joten kartan liikkeen
 *                           aikana ei tehdä uutta ladontaa.
 *   .fokusnosto-kuplapaperi itse paperi ja sen NOUSU (opacity +
 *                           transform). Nousu on omalla portaallaan,
 *                           koska ulomman muunnos on jo varattu paikalle.
 *                           PAPERI ON MYÖS PAINIKE (ks. alla).
 *   .fokusnosto-nokka       kärki, joka osoittaa ankkuriin. Sen
 *                           vaakapaikka lasketaan erikseen, jotta se
 *                           osoittaa oikeaan kohtaan silloinkin kun
 *                           kupla on siirtynyt ruudun reunasta.
 *
 * KOKO KUPLA AVAA LUNASTUKSEN (omistaja 26.8.2026 ilta: *"kun täkyä
 * painaa niin sen pitäisi aueta suoraan pop upiksi ilman pelkkää otsikko
 * nostoa"*). Paperi ON se painike — ei laatikko, jonka sisällä on
 * pienempi painike — joten paperilla ei ole yhtään kuollutta pintaa:
 * napautus otsikkoon, miniatyyriin tai marginaaliin tekee saman asian.
 *
 * MIKSI BODY EIKÄ .map-pane: ks. tiedoston alku. Kartan eleet eivät näe
 * bodyssa olevaa pintaa lainkaan, joten js/kartta.js:n KELLUVA_UI-listaa
 * ei tarvitse koskea.
 */
function piirraNostonKupla(ui, nosto, paikka) {
  const kupla = html('div', 'fokusnosto-kupla');
  kupla.setAttribute('role', 'group');
  kupla.setAttribute('aria-label', paikka.nimi ? `Täkynosto: ${paikka.nimi}` : 'Täkynosto');

  /*
   * Kuplassa EI ole rastia (omistaja 25.8.2026: "Ota ruksi pois
   * pop-upista") — nosto poistuu lunastettaessa. Rasti elää yhä
   * liuska-varapolussa. Huutomerkkitäkyjen kupla saa kevyen keltaisen
   * taustan (sama omistajan viesti); eläintäky pysyy paperinvärisenä.
   */
  if ((nosto.symboli ?? 'huuto') !== 'elain') kupla.classList.add('fokusnosto-kupla-huuto');
  const paperi = nostoKlikkiotsikko(
    ui, nosto, html('button', 'fokusnosto-kuplapaperi fokusnosto-nappi'),
  );
  const nokka = html('span', 'fokusnosto-nokka');
  nokka.setAttribute('aria-hidden', 'true');
  paperi.appendChild(nokka);
  kupla.appendChild(paperi);

  document.body.appendChild(kupla);
  ui.fokusnostoKupla = { el: kupla, paperi, nokka, mitat: null };
  asetaNostokuplanPaikka(ui);
  const mittaaJaAsemoi = () => { nostoMittaaKupla(ui); asetaNostokuplanPaikka(ui); };
  /*
   * MITTA UUDELLEEN, kun asettelu ja tyyli ovat valmiit: ensimmäinen
   * mitta voi osua hetkeen, jolloin tyylitiedosto on vasta matkalla, ja
   * miniatyyri leventää paperia vasta latauduttuaan. Sama kaksoismittaus
   * kuin kartan tietoruudulla (js/fokuskohteet.js avaaFokuskohde).
   */
  globalThis.requestAnimationFrame?.(mittaaJaAsemoi);
  setTimeout(mittaaJaAsemoi, 220);
  /*
   * Nousu alkaa vasta seuraavassa kehyksessä (ks. piirraNosto). Kuplalla
   * on OMA nousuluokkansa: liuskan `fokusnosto-nousee` kirjoittaa
   * `transform`-ominaisuuden, joka on kuplalla varattu paikoitukseen.
   */
  void kupla.offsetWidth;
  kupla.classList.add('fokusnosto-kupla-nousee');
  return kupla;
}

/**
 * PAPERIN MITAT JA RUUDUN RAJAT TALTEEN.
 *
 * Kaksi asiaa, jotka eivät muutu kartan liikkuessa mutta jotka on silti
 * tiedettävä joka asemoinnissa: kuplan oma koko ja se laatikko, jonka
 * sisään sen on mahduttava. Rajat luetaan karttapaneelista, ja alanapit
 * mitataan ruudulta (vuorolaatikko kelluu kapealla ruudulla kartan
 * päällä) — sama pakko ja sama tapa kuin kartan tietoruudulla
 * (js/fokuskohteet.js asetaKohteenPaikka).
 */
function nostoMittaaKupla(ui) {
  const auki = ui?.fokusnostoKupla;
  if (!auki?.el?.isConnected) return null;
  const leveys = auki.paperi.offsetWidth;
  const korkeus = auki.paperi.offsetHeight;
  if (!leveys || !korkeus) return null;
  const M = NOSTO_KUPLA_MARGINAALI;
  const pane = document.querySelector('.map-pane')?.getBoundingClientRect();
  const rajat = {
    vasen: (pane?.left ?? 0) + M,
    oikea: (pane?.right ?? globalThis.innerWidth ?? leveys) - M,
    yla: (pane?.top ?? 0) + M,
    ala: (pane?.bottom ?? globalThis.innerHeight ?? korkeus) - M,
  };
  const napit = document.querySelector('.turn-card')?.getBoundingClientRect();
  if (napit && napit.height > 0 && napit.right > rajat.vasen && napit.left < rajat.oikea
    && napit.top > rajat.yla) {
    rajat.ala = Math.min(rajat.ala, napit.top - M);
  }
  auki.mitat = { leveys, korkeus, rajat };
  return auki.mitat;
}

/**
 * KUPLAN PAIKKA ANKKURIN VIEREEN — REUNAPAKKO VOITTAA.
 *
 * Kolme sääntöä:
 *
 *   1. Kupla menee mieluiten ankkurin YLÄPUOLELLE, jotta kartta jää
 *      näkyviin sen alle ja nokka osoittaa alaspäin kuten puhekuplassa
 *      kuuluu. Jos ylhäällä ei ole tilaa, kupla laskeutuu ankkurin alle
 *      ja nokka kääntyy ylöspäin.
 *   2. KUPLA EI VALU RUUDUN ULKOPUOLELLE. Rajat luetaan karttapaneelista
 *      ja alanapit mitataan ruudulta (vuorolaatikko kelluu kapealla
 *      ruudulla kartan päällä) — sama pakko kuin kartan tietoruudulla.
 *   3. Kun kupla on jouduttu siirtämään reunasta, NOKKA JÄÄ OSOITTAMAAN
 *      ANKKURIIN: sen vaakapaikka lasketaan ankkurista eikä kuplan
 *      keskeltä, mutta se pysyy kuplan pyöristettyjen kulmien sisällä.
 *
 * MITAT LUETAAN offsetWidth/offsetHeightillä: ne eivät sisällä
 * paikoitusmuunnosta, joten mittaus ei muutu sen mukaan, mihin kupla on
 * juuri asetettu.
 *
 * PANOROINNIN AIKANA MITATAAN VAIN ANKKURI. Paperin koko ja ruudun rajat
 * eivät muutu kartan liikkuessa, joten ne luetaan talteen erikseen
 * (nostoMittaaKupla) ja kartan vahti käyttää talletettuja lukuja: yksi
 * mittaus kehystä kohti, ei viittä.
 */
function asetaNostokuplanPaikka(ui) {
  const auki = ui?.fokusnostoKupla;
  if (!auki?.el?.isConnected) return;
  const mitat = auki.mitat ?? nostoMittaaKupla(ui);
  if (!mitat) return;
  const ankkuri = nostosymAnkkuri(ui);
  if (!ankkuri?.isConnected) return;
  const a = ankkuri.getBoundingClientRect();
  if (!(a.width > 0) && !(a.height > 0)) return;
  const { leveys, korkeus } = mitat;
  const {
    vasen: vasenRaja, oikea: oikeaRaja, yla: ylaRaja, ala: alaRaja,
  } = mitat.rajat;

  const ax = a.left + a.width / 2;
  const ay = a.top + a.height / 2;
  const puolikas = a.height / 2;
  const ylaTila = ay - puolikas - NOSTO_NOKKA - ylaRaja;
  const alaTila = alaRaja - (ay + puolikas + NOSTO_NOKKA);
  // Yläpuoli voittaa aina kun kupla mahtuu sinne; muuten valitaan se
  // puoli, jolla tilaa on enemmän — jotain on näytettävä joka tapauksessa.
  const ylla = ylaTila >= korkeus || ylaTila >= alaTila;

  let ylin = ylla ? ay - puolikas - NOSTO_NOKKA - korkeus : ay + puolikas + NOSTO_NOKKA;
  ylin = Math.max(ylaRaja, Math.min(ylin, alaRaja - korkeus));
  let vasen = ax - leveys / 2;
  vasen = Math.max(vasenRaja, Math.min(vasen, oikeaRaja - leveys));

  auki.el.style.transform = `translate3d(${Math.round(vasen)}px, ${Math.round(ylin)}px, 0)`;
  auki.el.classList.toggle('fokusnosto-kupla-ylla', ylla);
  auki.el.classList.toggle('fokusnosto-kupla-alla', !ylla);
  const vara = Math.min(NOSTO_NOKKA_VARA, leveys / 2);
  const nokkaX = Math.max(vara, Math.min(ax - vasen, leveys - vara));
  auki.nokka.style.left = `${Math.round(nokkaX)}px`;
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
