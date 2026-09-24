/*
 * NOSTO AUKEAA KUVA EDELLÄ — KAKSIVAIHEINEN AVAUS.
 *
 * OMISTAJA 11.9.2026 illalla, sanatarkasti: *"Voisiko kaikki nostot
 * kartalla muuttaa niin että kun pelaaja painaa nostoa niin ensin
 * aukeaa vain pelkkä kuva lähes koko ruudun kokoisena, alla pelkkä
 * lyhyt kuvateksti jonka alla olisi lisää nappi mitä painamalla
 * varsinainen nosto avautuisi teksteineen. Samalla nostolaatikoiden
 * leveys kasvaisi jotta isompana avautunut kuva mahtuisi sen sisään.
 * Tässä nostolaatikon ja tekstien ilmaantumisessa on todella tärkeää
 * että kuva pysyy täysin paikallaan ja että tekstit ja muut elementit
 * ilmaantuvat sen ympärille ilman että kuva välähtää tai liikkuu
 * yhtään. Se tekee tapahtumasta visuaalisesti koukuttavamman. Kuva
 * sulkeutuu mikäli pelaaja painaa mitä tahansa kohtaa kartalla. Ja
 * tässä tärkeää että samalla painalluksella ei voi aueta uutta nostoa
 * vaan ainoastaan kuva sulkeutuu."*
 *
 * ── YKSI KUVA, YKSI ELEMENTTI, KAKSI VAIHETTA ──────────────────────
 *
 * Tämä moduuli omistaa molempien karttakorttien (kartan tietoruutu
 * js/fokuskohteet.js ja täkynoston lunastuskortti js/fokusnosto.js)
 * kuvaesittelyn. Kuvakehys (`figure`) ja sen `img` LUODAAN KERRAN
 * vaiheessa 1 ja käytetään sellaisenaan vaiheessa 2: src ei vaihdu,
 * elementtiä ei rakenneta uudelleen eikä kuvaa siirretä toiseen
 * vanhempaan — se pysyy saman `sisalto`-elementin lapsena ja vain
 * vaihtaa paikkaa sisarustensa joukossa. Siksi selain ei lataa eikä
 * dekoodaa kuvaa uudestaan, eikä välähdystä synny.
 *
 * ── KUVA EI LIIKU: KORTTI SIIRTYY, EI KUVA ─────────────────────────
 *
 * Vaiheenvaihdossa kortin ympärille ilmestyy sisältöä myös kuvan
 * YLÄPUOLELLE (ylärivi, otsikko), joka työntäisi kuvaa alaspäin.
 * Kompensointi tehdään kahdella nupilla, jotka eivät koske kuvaan
 * lainkaan:
 *
 *   1. KORTIN OMA `top` ruudulla (kortti on `position: fixed`), ja
 *   2. sisältökotelon `scrollTop`, jos kortti ei enää mahdu ylemmäs.
 *
 * Mitta otetaan kuvan `getBoundingClientRect()`-laatikosta ENNEN ja
 * JÄLKEEN ladonnan samassa tehtävässä (ennen selaimen maalausta), ja
 * korjaus lasketaan puhtaalla funktiolla `nostokuvanKorjaus`, jota
 * testit ajavat ilman selainta. Koska koko työ tapahtuu yhden
 * synkronisen tehtävän sisällä, ruudulle ei maalaudu välitilaa.
 *
 * ── LEVEYS TULEE KUVASTA ───────────────────────────────────────────
 *
 * Kortin leveys jäädytetään vaiheessa 1 siihen, minkä iso kuva vaatii
 * (`fit-content` → mitattu px). Sama luku on voimassa vaiheessa 2,
 * joten kuvan vaakapaikka ei voi muuttua ladonnan mukana.
 *
 * ── NIMET ON PREFIKSOITU ───────────────────────────────────────────
 *
 * Yhden tiedoston versio ketjuttaa moduulit samaan näkyvyysalueeseen
 * (tools/tarkista-niputus.mjs), joten top-level-nimet alkavat
 * NOSTOKUVA_/nostokuva-etuliitteellä.
 */
import { html, suurennoksenMitat } from './ui-apurit.js';
import { kortinKuvalahde, taytaLahderivi } from './tekijakortti.js';
import { kuvatekstiLyhyt } from './kuvatekstit.js';
import { lisaaHavainnekuvaMerkki } from './havainnekuva.js';

/** Oman tyylitiedoston tunnus (sama kaava kuin muilla kelluvilla pinnoilla). */
const NOSTOKUVA_TYYLIN_TUNNUS = 'nostokuva-tyyli';

/**
 * Ison kuvan pyyntöleveys pikseleinä. Kuva ladotaan lähes koko ruudun
 * kokoiseksi, joten kortin entinen 800 px olisi iPadin pystynäkymässä
 * jo venytetty.
 */
export const NOSTOKUVA_PYYNTO_PX = 1600;

/** Kortin vähimmäisetäisyys ruudun laidasta pikseleinä. */
export const NOSTOKUVA_MARGINAALI = 12;

/** Kortin vähin korkeus, kun alalaita leikataan ruudun sisään. */
export const NOSTOKUVA_VAHIN_KORKEUS = 160;

/**
 * VAIHEEN 1 YLÄRAJA — KUVA AUKEAA JO VALMIIKSI YLEMMÄS.
 *
 * Omistaja 12.9.2026, sanatarkasti: *"Lisäksi noston kuvan saisi
 * sijoittaa niin, että kun lisää nappia painetaan, niin noston
 * yläpuolelle ei jää tyhjää tilaa, mistä kartta näkyy hieman... Eli
 * kuva pitäisi aueta hieman ylemmäksi alun alkaen."*
 *
 * Vaiheessa 2 kortti siirtyy YLÖSPÄIN täsmälleen sen verran kuin kuvan
 * yläpuolelle ilmestyy sisältöä (ylärivi + otsikko), koska kuva ei saa
 * liikkua. Kortin lopullinen yläreuna on siis
 *   vaiheen 1 yläreuna − ylätekstien korkeus.
 * Mitattuna (tools/mittaa-nostokuva.mjs) ylätekstit ovat 50–230 px
 * korttityypistä riippuen: skandaalilla ja galleriakorteilla ero on
 * niin iso, että kortti nousee ruudun laitaan itsestään, mutta
 * kohdekortilla, syvennyksellä ja eläintäyllä se on vain 50–67 px.
 * Kun vaiheen 1 keskitys jätti kortin 160–260 px:n korkeudelle,
 * vaiheen 2 kortin yläpuolelle jäi juuri se kartan kaistale, jonka
 * omistaja näki.
 *
 * Tämä on vaiheen 1 yläreunan KATTO: kortti ei mene tätä alemmas,
 * vaikka keskitys sen sinne asettaisi — ja pysyy keskitettynä silloin,
 * kun iso kuva täyttää ruudun jo valmiiksi. Luku on mitoitettu ylös
 * suurimman tavallisen ylätekstiparin mukaan, jotta vaiheen 2 kortti
 * aloittaa yläpalkin kohdalta eikä kartalta, mutta vaiheen 1 kuva jää
 * silti selvästi irti ruudun yläreunasta (ei liimaudu eikä valu
 * yläpalkin alle).
 */
export const NOSTOKUVA_YLAVARA = 88;

/**
 * Kuvan ympäriltä varattava tila: vaakasuunnassa kortin reunus ja
 * sisennys, pystysuunnassa kuvateksti, "Lisää"-nappi ja sama reunus.
 * Luvut ovat väljiä tarkoituksella — kuvan on mahduttava ruudulle myös
 * kaksirivisen kuvatekstin kanssa.
 */
export const NOSTOKUVA_VAAKAVARA = 44;
export const NOSTOKUVA_PYSTYVARA = 150;

/** Kuvasuhteen oletus, kun kuva ei ole vielä latautunut (3:2 havainnekuva). */
const NOSTOKUVA_OLETUSSUHDE = 3 / 2;

/*
 * NOSTOKORTIN KAKSIPALSTATAITTO (omistaja 21.9.2026, Le Mans -kaappaus
 * työpöydällä; css/fokusnosto.css osio 13). Kaksi sääntöä samalla
 * lipulla (`kaksipalstaTaitto: true`). KAIKKI kutsujat pyytävät sen
 * 22.9.2026 alkaen (omistaja klo 23.06: *"Kaikkiin nostoihin kaksi
 * palstaa. Ja niin että ensin Kuva avautuu isona ja kun klikkaa niin
 * sitten kuva pienenee ja tulee teksti palsta mukaan oikealle."*) —
 * nostokortti, kohdekortti, skandaali, eläintäky, historian hetki ja
 * syvennys. Palstat rakentaa `nostoPalstoiksi` (alla) niille
 * kutsujille, jotka eivät rakenna niitä itse:
 *
 *   1. ALLE NOSTOKUVA_LEVEA_RAJAn kortti pysyy nykyisessä pinossa (kuva
 *      ylhäällä, teksti alla), mutta leveys ei enää kasva kuvan ehdoilla
 *      lähes ruudun levyiseksi — katto on NOSTOKUVA_KAPEA_KATTO (~760 px).
 *   2. RAJAN YLÄPUOLELLA VAIHEESSA 1 kuva on ISO (sama sovitus kuin
 *      pinossa, katettuna niin että kortti pysyy NOSTOKUVA_LEVEA_KATON
 *      alla) — omistajan "ensin kuva avautuu isona". VAIHEESSA 2
 *      koko kortti rajataan NOSTOKUVA_LEVEA_KATTOon
 *      (~1100 px, omistajan tarkennus 21.9.2026: alkuperäinen "kortti
 *      pysyy yhtä leveänä kuin ennen tätä muutosta" venytti kortin
 *      1300+ px:iin isolla ruudulla eikä rajannut sitä mitenkään). KUVA
 *      itse kapenee NOSTOKUVA_KUVAPALSTA_OSUUS-osuuteen TÄSTÄ katetusta
 *      pohjasta (pystykuvalla NOSTOKUVA_KUVAPALSTA_PYSTY_OSUUS) —
 *      vapautunut tila antaa css:n kuvapalsta/tekstipalsta-koteloille
 *      (css/fokusnosto.css osio 13) oikean levyisen tekstipalstan kuvan
 *      viereen. OSUUSLUVUT OVAT KATTOJA CSS:N PUOLELLA (`.fokusnosto-
 *      kuvapalsta max-width`), EI ainoa totuus: kuva mitoitetaan
 *      pikselilleen täällä, css varmistaa vain sen harvinaisen polun,
 *      jossa JS ei ehdi mitoittaa kuvaa.
 */
export const NOSTOKUVA_LEVEA_RAJA = 1100;
/** Vaiheen 2 kuvan kutistusliikkeen kesto leveällä (ks. kutistaNakyvasti). */
export const NOSTOKUVA_KUTISTUS_MS = 260;
export const NOSTOKUVA_LEVEA_KATTO = 1100;
export const NOSTOKUVA_KAPEA_KATTO = 760;
export const NOSTOKUVA_KUVAPALSTA_OSUUS = 0.5;
export const NOSTOKUVA_KUVAPALSTA_PYSTY_OSUUS = 0.32;
/**
 * Kortin oma tila (reunus, sisennys, mahdollinen vierityskaista) arviona
 * — `jaadytaLeveys` mittaa tarkan luvun vasta ladonnan jälkeen, mutta
 * kuvan oma leveyskatto on laskettava jo ennen sitä. Arvio on väljä
 * tarkoituksella: `jaadytaLeveys`in oma `enintaan`-katto on silti viime
 * kädessä se, joka takaa katon pitävän (kapealla ~760 px, leveällä
 * ~1100 px).
 */
const NOSTOKUVA_VARA_ARVIO = 48;

/**
 * Ison kuvan mitat ruudulla.
 *
 * Suunta ja täyttöaste tulevat talon yhteisestä linjauksesta
 * (js/ui-apurit.js suurennoksenMitat, omistaja 8.9.2026), jotta
 * kuvaesittely ja koko ruudun suurennos kasvavat samalla säännöllä.
 * Tässä varataan sen lisäksi kortin oma paperitila.
 */
export function nostokuvanMitat({
  kuvaLeveys, kuvaKorkeus, ruutuLeveys, ruutuKorkeus, enintaanLeveys = Infinity,
} = {}) {
  const kelpo = Number.isFinite(kuvaLeveys) && kuvaLeveys > 0
    && Number.isFinite(kuvaKorkeus) && kuvaKorkeus > 0;
  const { leveys, korkeus } = suurennoksenMitat({
    kuvaLeveys: kelpo ? kuvaLeveys : 3000,
    kuvaKorkeus: kelpo ? kuvaKorkeus : 3000 / NOSTOKUVA_OLETUSSUHDE,
    ruutuLeveys,
    ruutuKorkeus,
    vaakaVara: NOSTOKUVA_VAAKAVARA,
    pystyVara: NOSTOKUVA_PYSTYVARA,
    enintaanLeveys,
  });
  return { leveys, korkeus };
}

/**
 * KORTIN VAKIOLEVEYS RUUDULLA — sama kuvan muodosta riippumatta (omistaja
 * 20.9.2026, nostokortti 2 kohta 2: *"noston leveys aina sama … pystykuva
 * kapeampana kortin sisällä keskellä"*). Leveys on se, jonka vaakakuva
 * (oletussuhde 3:2) saisi tällä ruudulla — eli entinen "iso vaakakuva
 * täyttää kortin" -mitta — ja pystykuva sovitetaan siihen sisään
 * (`nostokuvanSovitus`) eikä kavenna korttia.
 *
 * @param {{ruutuLeveys:number, ruutuKorkeus:number, enintaanLeveys?:number}} p
 * @returns {number} kuva-alan vakioleveys pikseleinä (0 = ei ruutua)
 */
export function nostokuvanVakioleveys({ ruutuLeveys, ruutuKorkeus, enintaanLeveys = Infinity } = {}) {
  return nostokuvanMitat({
    kuvaLeveys: 3000, kuvaKorkeus: 3000 / NOSTOKUVA_OLETUSSUHDE, ruutuLeveys, ruutuKorkeus, enintaanLeveys,
  }).leveys;
}

/**
 * KUVAN SOVITUS VAKIOLEVYISEEN KUVA-ALAAN (contain): leveys enintään
 * vakioleveys, korkeus enintään kuvan oman muodon korkeuskatto
 * (nostokuvanMitat, ruudun korkeus miinus kuvateksti ja reunus) — kuva
 * mahtuu aina kokonaan ruudulle, ja pystykuva jää kapeammaksi keskelle.
 *
 * @param {{kuvaLeveys:number, kuvaKorkeus:number, ruutuLeveys:number,
 *   ruutuKorkeus:number, enintaanLeveys?:number}} p
 * @returns {{leveys:number, korkeus:number, vakioleveys:number}}
 */
export function nostokuvanSovitus({
  kuvaLeveys, kuvaKorkeus, ruutuLeveys, ruutuKorkeus, enintaanLeveys = Infinity,
} = {}) {
  const vakioleveys = nostokuvanVakioleveys({ ruutuLeveys, ruutuKorkeus, enintaanLeveys });
  const oma = nostokuvanMitat({
    kuvaLeveys, kuvaKorkeus, ruutuLeveys, ruutuKorkeus, enintaanLeveys,
  });
  if (!vakioleveys || !oma.leveys || !oma.korkeus) return { leveys: 0, korkeus: 0, vakioleveys };
  const kelpo = Number.isFinite(kuvaLeveys) && kuvaLeveys > 0
    && Number.isFinite(kuvaKorkeus) && kuvaKorkeus > 0;
  const suhde = kelpo ? kuvaLeveys / kuvaKorkeus : NOSTOKUVA_OLETUSSUHDE;
  let leveys = Math.min(oma.leveys, vakioleveys);
  let korkeus = leveys / suhde;
  if (korkeus > oma.korkeus) {
    korkeus = oma.korkeus;
    leveys = korkeus * suhde;
  }
  return { leveys, korkeus, vakioleveys };
}

/**
 * LUKITUN LAATIKON KORKEUS kuvan omasta suhteesta (vaihe 2).
 *
 * Leveys on jo lukittu (kortti on sen levyinen), joten korjattavaa on
 * vain korkeus: kuvan suhde × leveys, enintään ruudun korkeus
 * marginaaleineen. Palauttaa nollan, jos mitat eivät kelpaa — silloin
 * laatikkoon ei kosketa. Puhdas funktio (tests/nostokuva.test.mjs).
 *
 * @param {{laatikkoLeveys:number, kuvaLeveys:number, kuvaKorkeus:number,
 *   ruutuKorkeus:number, marginaali?:number}} p
 * @returns {number} korkeus pikseleinä, tai 0
 */
export function nostokuvanLukitunKorkeus({
  laatikkoLeveys, kuvaLeveys, kuvaKorkeus, ruutuKorkeus,
  marginaali = NOSTOKUVA_MARGINAALI,
} = {}) {
  const luvut = [laatikkoLeveys, kuvaLeveys, kuvaKorkeus];
  if (!luvut.every((n) => Number.isFinite(n) && n > 0)) return 0;
  const katto = Number.isFinite(ruutuKorkeus) && ruutuKorkeus > 0
    ? Math.max(0, ruutuKorkeus - 2 * marginaali) : Infinity;
  return Math.min(katto, laatikkoLeveys * (kuvaKorkeus / kuvaLeveys));
}

/**
 * VAIHEENVAIHDON KORJAUS — montako pikseliä korttia siirretään ja
 * paljonko sisältöä vieritetään, jotta kuva jää TÄSMÄLLEEN paikalleen.
 *
 * @param {object} p
 * @param {number} p.ylin        kortin nykyinen `top` ruudulla
 * @param {number} p.delta       paljonko kuva siirtyi ladonnasta (px, alas +)
 * @param {number} p.korkeus     kortin korkeus vaiheessa 2
 * @param {number} p.ruutuKorkeus
 * @param {number} p.vierityskatto  sisältökotelon suurin scrollTop
 * @param {number} [p.marginaali]
 * @returns {{ ylin:number, vieritys:number, siirtyma:number }}
 *   `siirtyma` on se osa, jota ei saatu kompensoitua — nolla on ainoa
 *   hyväksytty arvo, ja testit vartioivat sitä.
 */
export function nostokuvanKorjaus({
  ylin, delta, korkeus, ruutuKorkeus, vierityskatto = 0,
  marginaali = NOSTOKUVA_MARGINAALI,
} = {}) {
  const tavoite = ylin - delta;
  const ala = Math.max(marginaali, ruutuKorkeus - marginaali - korkeus);
  const rajattu = Math.max(marginaali, Math.min(tavoite, ala));
  // Kortti jouduttiin jättämään tavoitteen ALApuolelle (rajattu > tavoite):
  // sen verran kuva valuisi alas, ja sen verran sisältöä vieritetään ylös.
  const puuttuu = Math.max(0, rajattu - tavoite);
  const vieritys = Math.min(puuttuu, Math.max(0, vierityskatto));
  return { ylin: tavoite + vieritys, vieritys, siirtyma: puuttuu - vieritys };
}

/**
 * VAIHEEN 1 KORTIN YLÄREUNA RUUDULLA — puhdas funktio, jotta sääntö
 * voidaan testata ilman selainta (tests/nostokuva.test.mjs).
 *
 * Kortti keskitetään pystysuunnassa kuten ennenkin, mutta se ei jää
 * NOSTOKUVA_YLAVARAa alemmas: muuten vaiheen 2 kortin yläpuolelle jää
 * kartan kaistale (ks. vakion selitys). Marginaali on aina vähin.
 *
 * @param {object} p
 * @param {number} p.korkeus      kortin korkeus vaiheessa 1
 * @param {number} p.ruutuKorkeus
 * @param {number} [p.marginaali]
 * @param {number} [p.ylavara]
 * @returns {number} kortin `top` pikseleinä
 */
export function nostokuvanYlin({
  korkeus, ruutuKorkeus, marginaali = NOSTOKUVA_MARGINAALI,
  ylavara = NOSTOKUVA_YLAVARA,
} = {}) {
  const keskitetty = Math.round((ruutuKorkeus - korkeus) / 2);
  return Math.max(marginaali, Math.min(keskitetty, marginaali + ylavara));
}

/** Oma tyylitiedosto sivulle, jos sitä ei vielä ole. */
function nostokuvaLataaTyyli() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(NOSTOKUVA_TYYLIN_TUNNUS)) return;
  const peruslinkki = document.querySelector('link[rel="stylesheet"][href*="styles.css"]');
  if (!peruslinkki) return;
  const linkki = document.createElement('link');
  linkki.id = NOSTOKUVA_TYYLIN_TUNNUS;
  linkki.rel = 'stylesheet';
  linkki.href = new URL('nostokuva.css', peruslinkki.href).href;
  document.head.appendChild(linkki);
}

/**
 * TURVA-ALUE (omistajan iPhone-kaappaus 21.9.2026, v2021, skandaali
 * "Kuningattaren kaulanauhajuttu": kortti alkoi tilarivin alta,
 * kellonaika peitti otsikkorivin ja sulkunappi oli akkukuvakkeen
 * päällä). Sivu on viewport-fit=cover, joten `innerHeight` ulottuu
 * tilarivin ja kotipalkin alle. Insetit luetaan :root-muuttujista
 * `--turva-*` (css/styles.css, env(safe-area-inset-*)), jotka selain
 * antaa pikseleinä; ilman dokumenttia tai muuttujaa inset on 0.
 * Savuke voi pakottaa arvot samoihin muuttujiin (tools/savukkeet/
 * savuke-kortti-turva-alue.mjs). Puhdas lukija, ei tilaa.
 */
export function nostokuvaTurvaAlue(doc = globalThis.document) {
  const juuri = doc?.documentElement;
  if (!juuri || typeof getComputedStyle !== 'function') return { yla: 0, ala: 0, vasen: 0, oikea: 0 };
  const tyyli = getComputedStyle(juuri);
  const lue = (nimi) => {
    const v = Number.parseFloat(tyyli.getPropertyValue(nimi));
    return Number.isFinite(v) && v > 0 ? v : 0;
  };
  return { yla: lue('--turva-yla'), ala: lue('--turva-ala'), vasen: lue('--turva-vasen'), oikea: lue('--turva-oikea') };
}

/**
 * Ruudun mitat; testattavuuden takia yhdessä paikassa. `leveys` ja
 * `korkeus` ovat TURVA-ALUEEN SISÄPUOLINEN ruutu, ja `vasen`/`yla`
 * sen alkupiste: kaikki kortin `left`/`top`-arvot lasketaan tässä
 * ruudussa ja kirjoitetaan siirrettyinä (asetaKortinYlin/lueKortinYlin).
 */
function nostokuvaRuutu() {
  const turva = nostokuvaTurvaAlue();
  return {
    leveys: Math.max(0, (globalThis.innerWidth || 0) - turva.vasen - turva.oikea),
    korkeus: Math.max(0, (globalThis.innerHeight || 0) - turva.yla - turva.ala),
    vasen: turva.vasen,
    yla: turva.yla,
  };
}

/**
 * KAKSI PALSTAA KORTILLE, JOKA EI RAKENNA NIITÄ ITSE (omistaja 22.9.2026
 * klo 23.06, ks. NOSTOKUVA_LEVEA_RAJA yllä).
 *
 * js/fokusnosto.js latoo palstat itse (piirraNostonSisus). Muut kutsujat
 * — kohdekortti, skandaali, eläintäky, historian hetki, syvennys —
 * latovat sisällön yhtenä pinona: ylärivi, otsikko, kuva (mahdollisesti
 * gallerian tai karusellin sisällä), teksti ja loput. Tämä jakaa
 * VALMIIN pinon samaan muotoon kuin nostokortti: kuvaa edeltävät lapset
 * (ylärivi, otsikko, medianapit) jäävät palstojen yläpuolelle, kuvan
 * sisältävä lapsi — kuvateksteineen, pisteineen ja nuolineen —
 * kuvapalstaan, ja kaikki sen jälkeen tekstipalstaan. Kuvakehys
 * siirretään SOLMUNA, ei kopioida: sama <img>, ei uutta latausta, ei
 * välähdystä.
 *
 * Luokat ovat nostokortin omat (.fokusnosto-rivi, -kuvapalsta,
 * -tekstipalsta), joten css/fokusnosto.css osio 13 koskee kaikkia
 * kuoria yhdellä säännöllä. Kapealla ruudulla rivi on tavallinen
 * lohko, eli pino näyttää täsmälleen samalta kuin ennen.
 *
 * Palauttaa true, jos palstat rakennettiin; false, jos kuvaa ei ole
 * kotelossa tai palstat ovat jo olemassa (nostokortti).
 *
 * @param {Element} kotelo  kortin sisältökotelo
 * @param {Element} kehys   kuvakehys (nostokuva-kehys), joka on kotelossa
 */
export function nostoPalstoiksi(kotelo, kehys) {
  if (!kotelo || !kehys || typeof document === 'undefined') return false;
  if ([...kotelo.children].some((lapsi) => lapsi.classList?.contains('fokusnosto-rivi'))) return false;
  // parentNode ja childNodes (ei parentElement/nextSibling): toimii sekä
  // selaimessa että testien pienessä DOM-mallissa.
  let kuvaLapsi = kehys;
  while (kuvaLapsi && kuvaLapsi.parentNode !== kotelo) kuvaLapsi = kuvaLapsi.parentNode;
  if (!kuvaLapsi) return false;
  const lapset = [...kotelo.childNodes];
  const jalkeen = lapset.slice(lapset.indexOf(kuvaLapsi) + 1);
  const rivi = html('div', 'fokusnosto-rivi');
  const kuvapalsta = html('div', 'fokusnosto-kuvapalsta');
  const tekstipalsta = html('div', 'fokusnosto-tekstipalsta');
  kotelo.insertBefore(rivi, kuvaLapsi);
  kuvapalsta.appendChild(kuvaLapsi);
  tekstipalsta.append(...jalkeen);
  rivi.append(kuvapalsta, tekstipalsta);
  return true;
}

/**
 * KAKSIVAIHEINEN AVAUS PÄÄLLE.
 *
 * Kutsuja antaa valmiin kortin ja sisältökotelon, kuvadatan, kuvan
 * asettajan (moduulikohtainen: Commons-porras vs. repon oma polku) ja
 * takaisinkutsun, joka latoo VARSINAISEN noston — se saa parametrikseen
 * valmiin kuvakehyksen ja on velvollinen sijoittamaan juuri sen eikä
 * uutta kuvaa.
 *
 * @param {object} p
 * @param {Element} p.kortti      kortin juurielementti
 * @param {Element} p.sisalto     vieritettävä sisältökotelo kortin sisällä
 * @param {object}  p.kuva        kuvadatan olio (tiedosto/osoite, selite, lahde)
 * @param {(img:HTMLImageElement, leveys:number, onVirhe:() => void) => void} p.aseta
 * @param {(sisalto:Element, kuvakehys:Element) => void} p.latoNosto
 * @param {(nappi:Element) => void} [p.avaaSuurennos] vaiheen 2 kuvanapin teko
 * @param {(nappi:Element, kehys:Element) => void} [p.koristele] kutsujan
 *   oma lisä kuvan päälle (kartan tietoruudun ihmenauha)
 * @param {() => void} [p.onKuvatta] kutsutaan, kun kuvaesittely on peruttu
 *   (kuva jäi lataamatta); kortti on silloin jo ladottu tekstikorttina.
 * @param {boolean} [p.kaksipalstaTaitto] kaksipalstataitto (ks.
 *   NOSTOKUVA_LEVEA_RAJA yllä): kapea katto alle rajan; sen yläpuolella
 *   vaiheen 1 kuva on iso ja vaiheessa 2 kuva pienenee vasempaan
 *   palstaan ja teksti tulee oikealle. Kaikki kutsujat pyytävät tämän
 *   (omistaja 22.9.2026); oletus false on vain testejä ja tulevia
 *   kutsujia varten.
 * @returns {{ kehys:Element, vaihe:() => string, lisaa:() => void } | null}
 */
export function nostokuvaAloita({
  kortti, sisalto, kuva, aseta, latoNosto,
  avaaSuurennos = null, onKuvatta = null, koristele = null, kaksipalstaTaitto = false,
}) {
  if (typeof document === 'undefined' || !kortti || !sisalto || !kuva) return null;
  nostokuvaLataaTyyli();

  let vaihe = 1;
  kortti.classList.add('nostokuva-kortti', 'nostokuva-vaihe1');
  /*
   * ASEMOINTI INLINE-TYYLINÄ, EI LUOKASTA. Kortteja on kaksi
   * (.fokuskohde-popup on absolute kartan sisällä, .fokusnosto-kortti
   * kelluu flex-keskityksessä), ja niiden omat tyylitiedostot
   * ladataan ajossa — luokkien keskinäinen järjestys ei ole tiedossa.
   * Inline voittaa kummankin varmasti.
   */
  kortti.style.position = 'fixed';
  kortti.style.zIndex = '47';
  /*
   * AVAUSLIIKE POIS SAMASTA SYYSTÄ. Kumpikin kortti liukuu auki
   * pystysuunnassa (.fokuskohde-popup animaatio 6 px,
   * .fokusnosto-kortti siirtymä 12 px), ja se liike siirtäisi myös
   * kuvaa. Kuva edellä -avauksessa kuva on kortin ainoa sisältö: se
   * on paikallaan ensimmäisestä kehyksestä alkaen.
   */
  kortti.style.animation = 'none';
  kortti.style.transition = 'none';
  kortti.style.transform = 'none';
  kortti.style.opacity = '1';

  const kehys = html('figure', 'nostokuva-kehys');
  const nappi = html('button', 'nostokuva-nappi');
  nappi.type = 'button';
  const img = document.createElement('img');
  img.className = 'nostokuva-img';
  img.alt = kuvatekstiLyhyt(kuva);
  img.decoding = 'async';
  img.draggable = false;
  nappi.appendChild(img);
  // Kutsujan oma koriste kuvan päälle (kartan tietoruudussa ihmenauha):
  // se kuuluu kuvaan eikä saa kadota siitä, että kuva ladotaan täällä.
  koristele?.(nappi, kehys);
  kehys.appendChild(nappi);

  /*
   * VAIHEESSA 1 EI LÄHDERIVIÄ (omistaja 12.9.2026, sanatarkasti: *"Ota
   * yläkulman ruksi ja lähde merkintä pois kaikista nostoista. Riittää
   * kun lähde näkyy jutussa."*).
   *
   * Vaiheessa 1 näkyy vain kuva ja lyhyt kuvateksti — lähde, tekijä ja
   * lisenssi ovat vaiheen 2 kortissa, jonka kuvateksti latoo ne kuten
   * ennenkin. Lähde ei siis katoa mihinkään, se vain ei ole
   * ensivaikutelmassa. Tämä ei ole lisenssiongelma: kuva ja sen
   * lähdemerkintä ovat samassa näkymässä yhden napautuksen päässä, ja
   * satelliittilinssin ICEYE-leima on eri asia — siellä lisenssi vaatii
   * merkinnän kuvan päälle.
   */
  const selite = html('figcaption', 'nostokuva-selite');
  selite.append(
    lisaaHavainnekuvaMerkki(html('span', 'nostokuva-teksti', kuvatekstiLyhyt(kuva)), kuva),
    /*
     * LÄHDERIVI ON OLEMASSA MUTTA PIILOSSA VAIHEESSA 1. Se EI ole
     * turha: galleriakortit (skandaali, historian hetki, eläintäky)
     * kirjoittavat siihen valitun otoksen lähteen otosta vaihtaessaan,
     * ja vaiheessa 2 se on näkyvissä. Jos elementin poistaa, ne
     * kaatuvat — mitattu 12.9.2026, kaksitoista testiä.
     */
    kortinKuvalahde(html('span', 'nostokuva-lahde'), kuva.lahde ?? '', kuva),
  );
  kehys.appendChild(selite);

  const lisaa = html('button', 'nostokuva-lisaa', 'Lisää');
  lisaa.type = 'button';
  lisaa.setAttribute('aria-label', 'Lisää — avaa koko nosto');

  sisalto.replaceChildren(kehys, lisaa);

  /*
   * KUVAN LAATIKKO ON INLINE-PIKSELEITÄ, EI LADONNAN TULOS. Mitta
   * asetetaan heti oletussuhteella ja tarkennetaan vain kerran, kun
   * oikea kuva on latautunut JA ollaan yhä vaiheessa 1. Vaiheen 2
   * jälkeen mittaan ei kosketa: kuvan laatikko on silloin lukossa.
   */
  let vakioleveys = 0;
  /*
   * KORTIN OMA LEVEYSPOHJA (ks. NOSTOKUVA_LEVEA_RAJA-kommentti yllä).
   * Normaalisti sama kuin `vakioleveys` (kuvan oma laatikko), mutta
   * kaksipalstataiton LEVEÄLLÄ puolella kortin pohja on rajoittamaton
   * leveys KATETTUNA NOSTOKUVA_LEVEA_KATTOon (~1100 px) — kuva itse
   * kapenee osuuteensa siitä, ja vapautunut tila menee tekstipalstalle
   * (css/fokusnosto.css osio 13, .fokusnosto-tekstipalsta).
   */
  let korttiVakioleveys = 0;
  /** Kortin `top` turva-alueen ruudussa ↔ ruudun koordinaatit (nostokuvaRuutu). */
  const asetaKortinYlin = (ylin) => { kortti.style.top = `${nostokuvaRuutu().yla + ylin}px`; };
  const lueKortinYlin = () => (Number.parseFloat(kortti.style.top) || 0) - nostokuvaRuutu().yla;
  const mitoita = () => {
    const ruutu = nostokuvaRuutu();
    if (!ruutu.leveys || !ruutu.korkeus) return;
    const kapea = kaksipalstaTaitto && ruutu.leveys < NOSTOKUVA_LEVEA_RAJA;
    const leveaKaksi = kaksipalstaTaitto && !kapea;
    let enintaanLeveys = Infinity;
    let korttiPohja = 0;
    if (kapea) {
      /*
       * KAPEA KATTO KUVAN OMALLE LEVEYDELLE. Arvio VARAsta vähennettynä
       * KAPEA_KATTOsta, jotta kuva + kortin oma tila (reunus, sisennys,
       * vierityskaista) mahtuu KAPEA_KATTOn alle — `jaadytaLeveys` alla
       * vartioi lopullisen luvun joka tapauksessa.
       */
      enintaanLeveys = NOSTOKUVA_KAPEA_KATTO - NOSTOKUVA_VARA_ARVIO;
    } else if (leveaKaksi && vaihe !== 1) {
      /*
       * VAIHE 2 LEVEÄLLÄ: kuva kapenee palstaansa. Rajoittamaton pohja
       * ensin, sitten katettuna LEVEA_KATTOon: koko kortti — ei vain
       * kuva — pysyy ~1100 px:n rajan sisällä.
       *
       * VAIHEESSA 1 tätä haaraa EI ajeta (omistaja 22.9.2026 klo 23.06:
       * *"ensin Kuva avautuu isona ja kun klikkaa niin sitten kuva
       * pienenee"*): vaiheen 1 kuva sovitetaan kuten pinossa, eli
       * lähes ruudun kokoisena, ja kortti on kuvan levyinen.
       */
      const luonnollinenVakioleveys = nostokuvanVakioleveys({
        ruutuLeveys: ruutu.leveys, ruutuKorkeus: ruutu.korkeus,
      });
      korttiPohja = Math.min(luonnollinenVakioleveys, NOSTOKUVA_LEVEA_KATTO - NOSTOKUVA_VARA_ARVIO);
      // Pystykuva saa OMAN, kapeamman osuutensa (sama tunnistus kuin
      // kortin fokusnosto-pysty-luokka, ks. seuraaKuvanSuuntaa alla).
      const pysty = img.naturalWidth > 0 && img.naturalHeight > img.naturalWidth;
      enintaanLeveys = korttiPohja
        * (pysty ? NOSTOKUVA_KUVAPALSTA_PYSTY_OSUUS : NOSTOKUVA_KUVAPALSTA_OSUUS);
    }
    // Vakioleveys ja contain-sovitus (nostokuvanSovitus): kortti on aina
    // vaakakuvan levyinen, pystykuva kapeampana keskellä.
    const sovitus = nostokuvanSovitus({
      kuvaLeveys: img.naturalWidth,
      kuvaKorkeus: img.naturalHeight,
      ruutuLeveys: ruutu.leveys,
      ruutuKorkeus: ruutu.korkeus,
      enintaanLeveys,
    });
    if (!sovitus.leveys || !sovitus.korkeus) return;
    vakioleveys = sovitus.vakioleveys;
    korttiVakioleveys = leveaKaksi && vaihe !== 1 ? korttiPohja : vakioleveys;
    img.style.width = `${Math.round(sovitus.leveys)}px`;
    img.style.height = `${Math.round(sovitus.korkeus)}px`;
  };

  /** Elementin vaakasuora oma tila (reunus + sisennys + marginaali). */
  const reunat = (elementti) => {
    const tyyli = globalThis.getComputedStyle?.(elementti);
    if (!tyyli) return 0;
    const luku = (arvo) => Number.parseFloat(arvo) || 0;
    return luku(tyyli.paddingLeft) + luku(tyyli.paddingRight)
      + luku(tyyli.borderLeftWidth) + luku(tyyli.borderRightWidth)
      + luku(tyyli.marginLeft) + luku(tyyli.marginRight);
  };

  /**
   * KORTIN LEVEYS LASKETAAN KUVASTA, EI LADONNASTA.
   *
   * `fit-content` olisi lyhyempi mutta ei DETERMINISTINEN: se mittaa
   * sen sisällön, joka kortissa sattuu juuri sillä hetkellä olemaan,
   * ja vaiheessa 1 se riippuisi siitä, ehtikö kuva latautua ennen
   * ensimmäistä asemointia. Sama kortti sai mittauksissa kahden ajon
   * välillä eri leveyden. Nyt luku on kuvan leveys + paperin oma tila,
   * eli aina sama — ja juuri niin leveä, että iso kuva mahtuu sisään
   * sellaisenaan (omistajan tilaus 11.9.2026).
   */
  const jaadytaLeveys = () => {
    const ruutuLeveys = nostokuvaRuutu().leveys;
    let enintaan = Math.max(0, ruutuLeveys - 2 * NOSTOKUVA_MARGINAALI);
    // KATTO — VIIMEINEN VARTIO (kaksipalstaTaitto, ks. yllä): vaikka
    // kuvan oma leveys olisi arvioitu väärin, kortti ei silti ylitä
    // KAPEA_KATTOa alle NOSTOKUVA_LEVEA_RAJAn eikä LEVEA_KATTOa sen
    // yläpuolella.
    if (kaksipalstaTaitto && ruutuLeveys < NOSTOKUVA_LEVEA_RAJA) {
      enintaan = Math.min(enintaan, NOSTOKUVA_KAPEA_KATTO);
    } else if (kaksipalstaTaitto && vaihe !== 1) {
      // Vaiheessa 1 leveällä kortti on pelkkä iso kuva: katto vasta
      // vaiheessa 2, kun kortti saa tekstipalstan.
      enintaan = Math.min(enintaan, NOSTOKUVA_LEVEA_KATTO);
    }
    const kuvanLeveys = Number.parseFloat(img.style.width) || 0;
    /*
     * VIERITYSPALKIN KAISTA MUKAAN. Vaiheessa 2 sisältö vierittyy, ja
     * klassisella vierityspalkilla (työpöytä) kaista kaventaisi
     * sisältöä — keskitetty kuva siirtyisi vaakasuunnassa. CSS varaa
     * kaistan molemmissa vaiheissa (scrollbar-gutter: stable), ja
     * tässä se lasketaan mukaan kortin leveyteen.
     */
    const kaista = Math.max(0, sisalto.offsetWidth - sisalto.clientWidth);
    const vara = reunat(kortti) + reunat(sisalto) + kaista;
    kortti.style.maxWidth = `${enintaan}px`;
    // KORTIN LEVEYS ON VAKIO (nostokuvanVakioleveys), ei kuvan leveys:
    // pystykuva ei kavenna korttia (omistaja 20.9.2026). Kaksipalstataiton
    // leveällä puolella pohja on `korttiVakioleveys` (rajoittamaton), EI
    // `vakioleveys` (joka on siellä kapeampi, kuvan oma palstaosuus).
    kortti.style.width = `${Math.round(Math.min((korttiVakioleveys || vakioleveys || kuvanLeveys) + vara, enintaan))}px`;
  };

  /**
   * Kortti keskelle ruutua vaakasuunnassa, pystysuunnassa keskelle
   * mutta enintään NOSTOKUVA_YLAVARAn päähän ruudun yläreunasta
   * (ks. vakion selitys). Vain vaihe 1.
   */
  const keskita = () => {
    const ruutu = nostokuvaRuutu();
    const laatikko = kortti.getBoundingClientRect();
    const vasen = Math.max(NOSTOKUVA_MARGINAALI, Math.round((ruutu.leveys - laatikko.width) / 2));
    kortti.style.left = `${ruutu.vasen + vasen}px`;
    asetaKortinYlin(nostokuvanYlin({
      korkeus: laatikko.height, ruutuKorkeus: ruutu.korkeus,
    }));
  };

  const asemoi = () => {
    if (vaihe !== 1) return;
    kortti.style.maxHeight = `${Math.max(0, nostokuvaRuutu().korkeus - 2 * NOSTOKUVA_MARGINAALI)}px`;
    mitoita();
    jaadytaLeveys();
    keskita();
  };

  /*
   * KUVA EI TULLUT — KORTTI ON SILTI EHJÄ. Puuttuva tiedosto veisi
   * muuten pelaajalta koko noston: vaihe 1 jäisi tyhjäksi kehykseksi,
   * jonka takana teksti odottaa. Kuvaesittely perutaan silloin
   * kokonaan ja kortti latoutuu tavallisena tekstikorttina — samat
   * inline-tyylit puretaan, jotta kortti palaa omaan asemointiinsa.
   */
  const peru = () => {
    if (vaihe === 3) return;
    vaihe = 3;
    kortti.classList.remove('nostokuva-kortti', 'nostokuva-vaihe1', 'nostokuva-vaihe2');
    for (const nimi of ['width', 'maxWidth', 'maxHeight', 'left', 'top', 'position', 'zIndex',
      'animation', 'transition', 'transform', 'opacity']) {
      kortti.style[nimi] = '';
    }
    kehys.remove();
    sisalto.replaceChildren();
    latoNosto(sisalto, null);
    onKuvatta?.();
  };

  /*
   * KUVAN SUHDE VOI SELVITÄ VASTA TOISELLA LATAUKSELLA (Sonnet 1,
   * kierros 16, 20.9.2026, FRA Canigou: *"panoraamakuva täyttää vain
   * kuva-alan yläkolmanneksen ja alle jää iso tyhjä beige"*).
   *
   * Kuvan laatikko on inline-pikseleitä, ja se laskettiin vain
   * ENSIMMÄISESTÄ latauksesta (`once: true`). Jos ensimmäinen osoite
   * kaatui ja varareitti (js/media.js asetaKuva) toi eri muotoisen
   * kuvan, laatikko jäi vanhaan suhteeseen ja `object-fit: contain`
   * jätti paperin näkyviin. Kuuntelija on nyt pysyvä: vaiheessa 1
   * ladonta ajetaan uudestaan, ja vaiheessa 2 — jossa laatikon leveys
   * on lukittu — korjataan korkeus kuvan omaan suhteeseen.
   */
  const sovitaLukittuLaatikko = () => {
    const ruutu = nostokuvaRuutu();
    const korkeus = nostokuvanLukitunKorkeus({
      laatikkoLeveys: Number.parseFloat(img.style.width) || 0,
      kuvaLeveys: img.naturalWidth,
      kuvaKorkeus: img.naturalHeight,
      ruutuKorkeus: ruutu.korkeus,
    });
    if (korkeus) img.style.height = `${Math.round(korkeus)}px`;
  };
  img.addEventListener('load', () => {
    /*
     * PYSTYKUVA KAVENTAA KUVAPALSTAA kaikilla kuorilla (css/fokusnosto.css
     * osio 13 .fokusnosto-pysty). js/fokusnosto.js asettaa saman luokan
     * omalle kortilleen; tämä kattaa muut kutsujat samalla säännöllä.
     */
    if (kaksipalstaTaitto && img.naturalWidth && img.naturalHeight) {
      kortti.classList.toggle('fokusnosto-pysty', img.naturalHeight > img.naturalWidth);
    }
    if (vaihe === 1) { asemoi(); return; }
    if (vaihe === 2) sovitaLukittuLaatikko();
  });
  aseta(img, NOSTOKUVA_PYYNTO_PX, peru);
  asemoi();

  /** Vaihe 2: varsinainen nosto saman kuvan ympärille. */
  const avaaLisaa = () => {
    if (vaihe !== 1) return;
    // 1) MITTA ENNEN. Kaikki alla tapahtuu samassa tehtävässä, joten
    //    selain ei maalaa väliä — kuva ei ehdi liikkua ruudulla.
    const ennen = img.getBoundingClientRect();
    vaihe = 2;
    kortti.classList.remove('nostokuva-vaihe1');
    kortti.classList.add('nostokuva-vaihe2');
    lisaa.remove();
    if (avaaSuurennos) {
      nappi.title = 'Katso kuva suurempana';
      nappi.setAttribute('aria-label', `${kuvatekstiLyhyt(kuva) || 'Kuva'} — avaa suurena`);
      nappi.classList.add('nostokuva-nappi-zoom');
    }
    // 2) LADONTA. Kuvakehys irtoaa hetkeksi (replaceChildren) ja palaa
    //    SAMAN vanhemman lapseksi — ei uudelleenlatausta, ei uutta
    //    elementtiä, ei src:n vaihtoa.
    sisalto.replaceChildren();
    latoNosto(sisalto, kehys);
    /*
     * KAKSI PALSTAA JA KUVA PIENENEE (omistaja 22.9.2026 klo 23.06).
     * Vain leveällä (≥ NOSTOKUVA_LEVEA_RAJA): pino jaetaan palstoiksi,
     * kuva kapenee palstaansa ja kortti levenee ~1100 px:iin
     * tekstipalstaa varten. Kapealla mitään ei muuteta — pino, kuva ja
     * kortti pysyvät pikselilleen ennallaan kuten tähänkin asti.
     */
    const leveaRuutu = kaksipalstaTaitto && nostokuvaRuutu().leveys >= NOSTOKUVA_LEVEA_RAJA;
    const palstoina = leveaRuutu && nostoPalstoiksi(sisalto, kehys);
    const leveaVaihe2 = leveaRuutu
      && Boolean(palstoina || sisalto.querySelector('.fokusnosto-rivi'));
    if (leveaVaihe2) {
      mitoita();
      jaadytaLeveys();
      const ruutu = nostokuvaRuutu();
      const leveys = kortti.getBoundingClientRect().width;
      kortti.style.left = `${ruutu.vasen + Math.max(NOSTOKUVA_MARGINAALI, Math.round((ruutu.leveys - leveys) / 2))}px`;
    }
    kortti.style.maxHeight = `${Math.max(0, nostokuvaRuutu().korkeus - 2 * NOSTOKUVA_MARGINAALI)}px`;
    // 3) MITTA JÄLKEEN JA KORJAUS.
    const jalkeen = img.getBoundingClientRect();
    const korjaus = nostokuvanKorjaus({
      ylin: lueKortinYlin(),
      delta: jalkeen.top - ennen.top,
      korkeus: kortti.getBoundingClientRect().height,
      ruutuKorkeus: nostokuvaRuutu().korkeus,
      vierityskatto: Math.max(0, sisalto.scrollHeight - sisalto.clientHeight),
    });
    /*
     * OTSIKKO JA TYYPPIRIVI NÄKYVÄT AINA (omistaja 20.9.2026, nostokortti 2
     * kohta 4, kaappaus nosto-pystykuva-ylaosa-piilossa-v1982.webp:
     * pystykuvan kortissa otsikko leikkautui yläreunaan). Ennen sisältö
     * vieritettiin `korjaus.vieritys` verran, jotta KUVA pysyi
     * pikselilleen paikallaan — ja juuri se vieritys vei otsikon
     * yläreunan taakse. Nyt vieritys on nolla ja kortti alkaa
     * marginaalista: kuva saa siirtyä alaspäin otsikon verran, mikä on
     * pienempi paha kuin piilossa oleva otsikko. Vakioleveys ja
     * korkeuskatto (nostokuvanSovitus) pitävät kuvan ruudulla.
     */
    sisalto.scrollTop = 0;
    asetaKortinYlin(Math.max(NOSTOKUVA_MARGINAALI, korjaus.ylin));
    /*
     * KORTIN ALALAITA RUUDUN SISÄÄN. Kuva pysyy paikallaan siksi, että
     * kortti saa liukua alaspäin — mutta silloin sen alaosa jäisi
     * ruudun alapuolelle, ja juuri se osa on pisin: leipäteksti,
     * lähde ja pöllökysymykset. Katto leikataan alalaidasta, jolloin
     * kaikki mahtuu kortin omaan vieritykseen eikä kuva liiku
     * (yläpuolinen sisältö ei muutu).
     */
    kortti.style.maxHeight = `${Math.max(
      NOSTOKUVA_VAHIN_KORKEUS,
      nostokuvaRuutu().korkeus - korjaus.ylin - NOSTOKUVA_MARGINAALI,
    )}px`;
    /*
     * TARKISTUSMITTA — VIERITYS PYÖRISTYY, `top` EI. Selain napsauttaa
     * scrollTopin laitepikselien hilaan (Retinalla 0,5 px), joten
     * pelkkä laskettu korjaus jätti vaakanäkymässä mitatun 0,2–0,4
     * pikselin jäännöksen. Jäännös luetaan kuvan omasta laatikosta ja
     * siirretään kortin `top`-arvoon, joka on murto-osatarkka: mittari
     * (tools/mittaa-nostokuva.mjs) vaatii täsmälleen nollan.
     */
    // Jäännös korjataan vain, jos kortti ei jo lepää yläreunassa:
    // otsikon näkyvyys voittaa kuvan paikallaanpysymisen (ks. yllä).
    const jaannos = img.getBoundingClientRect().top - ennen.top;
    const yla = lueKortinYlin();
    if (jaannos && yla - jaannos >= NOSTOKUVA_MARGINAALI) {
      asetaKortinYlin(yla - jaannos);
    }
    if (leveaVaihe2) kutistaNakyvasti(ennen);
  };

  /*
   * KUVA PIENENEE NÄKYVÄSTI, EI HYPPÄÄ (omistaja 22.9.2026 klo 23.06 ja
   * 11.9.2026: kuva ei välähdä eikä hyppää vaiheenvaihdossa).
   *
   * Leveällä kuva kapenee vaiheessa 2 palstaansa, joten sen koko
   * väistämättä muuttuu — mutta sen ei pidä vaihtua yhdessä kehyksessä.
   * Sama <img> on paikallaan uudessa laatikossaan, ja siihen asetetaan
   * hetkeksi muunnos, joka piirtää sen vielä VANHAAN laatikkoonsa
   * (FLIP: first, last, invert, play). Seuraavassa kehyksessä muunnos
   * puretaan siirtymällä, jolloin kuva liukuu ja pienenee paikalleen.
   * Muunnos ei muuta ladontaa, joten tekstipalsta on heti oikeassa
   * paikassa eikä mikään muu liiku. Vähennetyllä liikkeellä
   * (prefers-reduced-motion) muunnosta ei aseteta lainkaan.
   */
  const kutistaNakyvasti = (ennen) => {
    const vahennetty = globalThis.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (vahennetty) return;
    const nyt = img.getBoundingClientRect();
    if (!nyt.width || !nyt.height || !ennen.width || !ennen.height) return;
    const sx = ennen.width / nyt.width;
    const sy = ennen.height / nyt.height;
    const dx = ennen.left - nyt.left;
    const dy = ennen.top - nyt.top;
    if (Math.abs(sx - 1) < 0.01 && Math.abs(sy - 1) < 0.01 && Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) return;
    img.style.transformOrigin = '0 0';
    img.style.transition = 'none';
    img.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`;
    img.getBoundingClientRect();
    const raf = globalThis.requestAnimationFrame ?? ((f) => setTimeout(f, 16));
    raf(() => {
      img.style.transition = `transform ${NOSTOKUVA_KUTISTUS_MS}ms cubic-bezier(0.2, 0.7, 0.2, 1)`;
      img.style.transform = '';
    });
    const siivoa = () => {
      img.style.transition = '';
      img.style.transformOrigin = '';
    };
    img.addEventListener('transitionend', siivoa, { once: true });
    setTimeout(siivoa, NOSTOKUVA_KUTISTUS_MS + 100);
  };

  lisaa.addEventListener('click', (tapahtuma) => {
    tapahtuma.stopPropagation();
    avaaLisaa();
  });
  nappi.addEventListener('click', (tapahtuma) => {
    tapahtuma.stopPropagation();
    // Vaiheessa 1 kuvan napautus on sama teko kuin "Lisää"; vaiheessa 2
    // se avaa koko ruudun suurennoksen kuten muillakin kortin kuvilla.
    if (vaihe === 1) avaaLisaa();
    else avaaSuurennos?.(nappi);
  });

  // Ikkunan koon muutos koskee vain vaihetta 1 (vaiheessa 2 kuva on
  // lukossa eikä sitä siirretä pelaajan selän takana).
  const koko = () => asemoi();
  globalThis.addEventListener?.('resize', koko);
  globalThis.addEventListener?.('orientationchange', koko);
  kortti.nostokuvaPurku = () => {
    globalThis.removeEventListener?.('resize', koko);
    globalThis.removeEventListener?.('orientationchange', koko);
  };

  return { kehys, vaihe: () => (vaihe === 1 ? 'kuva' : 'nosto'), lisaa: avaaLisaa };
}

/** Onko kortti kuvaesittelyn hallussa (asemointi ja raahaus jäävät pois)? */
export function nostokuvaKortissa(kortti) {
  return Boolean(kortti?.classList?.contains?.('nostokuva-kortti'));
}
