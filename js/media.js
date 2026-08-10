// Peili: pelin kaikista repon ulkopuolelta ladattavista kuvista ja
// äänistä on oma kopio yhdessä paikassa (ämpäri, ks. R2_JUURI alla).
// Peli hakee aineiston ensisijaisesti sieltä, jottei yksi kaatunut
// palvelin tai poistettu tiedosto riko peliä kesken matkan. Alkuperäinen
// osoite jää varareitiksi.
//
// Peilin polku LASKETAAN samalla säännöllä kuin peilaustyökalussa
// (tools/peilaa-media.mjs). Erillistä hakemistotiedostoa ei siis tarvita
// eikä 298 tiedostonimeä toisteta pelin koodissa. tests/media.test.mjs
// vartioi, etteivät säännöt pääse eriytymään: se tarkistaa jokaisen
// paketeissa mainitun tiedoston peilin manifestia vasten.

/*
 * Koko peili on omassa ämpärissään (Cloudflare R2).
 *
 * Aineisto oli GitHub Pagesissa, jonka suositusraja on 1 Gt sivustoa
 * kohti. Pelkkä Euroopan äänipuoli vei 569 Mt, eikä koko maailma olisi
 * mahtunut. Äänet siirtyivät ensin, kuvat ja liput perässä — nyt
 * media-repoa ei enää tarvita lainkaan.
 *
 * Juuria on kaksi vakiota, vaikka ne osoittavat samaan paikkaan. Ne
 * ovat eri asioita: kuvat ja äänet voi tarvittaessa erottaa taas eri
 * palvelimille vaihtamalla toisen. Katkaisija erottaa lajit polusta
 * (peilinLaji alla), ei juuresta, joten yhteinen osoite ei sekoita
 * niitä keskenään.
 *
 * Alkuperäinen lähde (Wikimedia Commons, archive.org, Freesound) jää
 * yhä varareitiksi, jos ämpäri ei vastaa.
 *
 * Ämpärillä on CORS-sääntö, joka sallii GETin osoitteesta
 * https://ravelius.github.io. Sitä tarvitaan kahteen kohtaan:
 * js/sound.js loadRealSamples hakee tehosteet fetchillä ja purkaa ne
 * decodeAudioDatalla, ja sw.js noutaa kuvat omaan pitkäikäiseen
 * koriinsa mode: 'cors' -pyynnöllä. Tavallinen <audio>- ja
 * <img>-lataus ei CORSia tarvitse, joten muualta avattuna — esimerkiksi
 * yhden tiedoston versio levyltä — peli toimii silti: nuo kaksi kohtaa
 * putoavat alkuperäiseen lähteeseen.
 */
const R2_JUURI = 'https://pub-7bc0ed2083a74a68bd7115618bca4709.r2.dev/';
export const PEILI_JUURI = R2_JUURI;
export const AANI_JUURI = R2_JUURI;

/**
 * Turvallinen tiedostonimi mistä tahansa merkkijonosta.
 *
 * Tämä on peilin nimeämissäännön AINOA kopio. Peilaustyökalu
 * (tools/peilaa-media.mjs) tuo tämän ja alla olevat polkufunktiot
 * täältä eikä toista sääntöä omassa koodissaan: kaksi kopiota ehtivät
 * kerran eriytyä niin, että työkalu kirjoitti tiedoston yhdellä
 * nimellä ja peli haki sitä toisella.
 */
export function turvanimi(teksti, pate) {
  const puhdas = teksti
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
    .slice(0, 90);
  /*
   * KOKONAAN EI-LATINALAINEN NIMI EI SAA KADOTA.
   *
   * Seula pudottaa kaiken a-z0-9:n ulkopuolisen, joten kyrillinen,
   * kreikkalainen, japanilainen tai arabialainen tiedostonimi kutistui
   * tyhjäksi tai pelkäksi välimerkiksi — ja peli haki niitä KAIKKIA
   * samasta osoitteesta. Ämpärissä on tälläkin hetkellä tiedostot
   * `kuvat/.jpg` ja `kuvat/..jpg`, eli oikeita kuvia on jo mennyt
   * toistensa päälle (mitattu 10.8.2026: molemmat vastaavat 200:lla ja
   * ovat kelvollisia JPEG-kuvia — väärä kuva latautuu siis huomaamatta).
   *
   * Ehto on "yksikään KIRJAIN ei jäänyt jäljelle" eikä pelkkä tyhjä.
   * Kaksi askelta opetti sen:
   *   1. Nimestä "Тебердинский заповедник. Вид…" jäi piste, joka kelpasi
   *      nimeksi mutta ei erottanut mitään.
   *   2. Kiinalaisista nimistä "…玉珠峰雪山 02.jpg" ja "…昆仑山 02.jpg"
   *      jäi pelkkä "02" — kaksi eri vuorikuvaa ja yksi ruokakuva
   *      hakivat kaikki osoitetta `kuvat/02.jpg`.
   * Pelkän numeron jättävä nimi on siis yhtä hyödytön kuin tyhjä.
   * Kirjaimen sisältävät nimet eivät muutu, joten jo peilatut
   * tiedostot pysyvät paikallaan.
   *
   * Tiiviste lasketaan ALKUPERÄISESTÄ nimestä, joten se on eri
   * jokaiselle tiedostolle ja aina sama samalle tiedostolle.
   * Latinalaiset nimet eivät muutu tästä lainkaan, joten jo peilatut
   * tiedostot pysyvät paikallaan.
   */
  const nimi = /[a-z]/.test(puhdas) ? puhdas : `kuva-${tiiviste(teksti)}`;
  return pate ? `${nimi}.${pate}` : nimi;
}

/**
 * Lyhyt vakaa tiiviste merkkijonosta (FNV-1a, 32 bittiä).
 *
 * Omatekoinen eikä crypto.subtle: nimi tarvitaan synkronisesti sekä
 * pelissä että peilaustyökalussa, ja tiivisteeltä vaaditaan tässä vain
 * se, että eri nimet eivät osu yhteen — ei salausominaisuuksia.
 */
function tiiviste(teksti) {
  let luku = 0x811c9dc5;
  for (let i = 0; i < teksti.length; i += 1) {
    luku ^= teksti.charCodeAt(i);
    luku = Math.imul(luku, 0x01000193) >>> 0;
  }
  return luku.toString(36);
}

/** Commons-tiedostonimestä peilin polku. Kansio on 'kuvat' tai 'liput'. */
export function peiliKuvaPolku(tiedosto, kansio) {
  const pate = (tiedosto.split('.').pop() ?? 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg';
  // Peilissä SVG-liput on tallennettu PNG:nä, koska ne haetaan
  // valmiiksi skaalattuina Commonsin renderöijältä.
  return `${kansio}/${turvanimi(tiedosto.replace(/\.[^.]+$/, ''), pate === 'svg' ? 'png' : pate)}`;
}

/*
 * Peilattavia ääniosoitteita on tasan kaksi muotoa, ja molemmat
 * osoittavat suoraan tiedostoon:
 *
 *   https://cdn.freesound.org/previews/511/511005_571436-lq.mp3
 *   https://archive.org/download/aporee_21876_25420/marrakesh.mp3
 *
 * Tunnus otetaan osoitteen pysyvästä osasta: Freesoundin äänen
 * numerosta ja archive.orgin kohteen (item) tunnuksesta. Kumpikin on
 * arkiston oma pysyvä tunniste, joten sama äänite saa saman nimen
 * riippumatta siitä, missä kohtaa lähdelistaa se sattuu olemaan.
 *
 * NIMI EI SAA RIIPPUA JÄRJESTYKSESTÄ. Ennen tätä peilaustyökalu nimesi
 * tunnistamattoman osoitteen silmukan indeksillä (`aporee-50`) ja peli
 * tyhjällä merkkijonolla — sama tiedosto sai kaksi eri nimeä, eikä peli
 * löytänyt sitä peilistä kertaakaan. Indeksi oli lisäksi hiljainen
 * aikapommi: yksi uusi ääni listan alkuun olisi vaihtanut kaikkien
 * perässä olevien nimet, ja jo peilatut tiedostot olisivat jääneet
 * ämpäriin tavoittamattomiksi. Arvausta ei siis ole: joko tunnus
 * luetaan osoitteesta tai osoitetta ei peilata lainkaan.
 */
const AANIMUODOT = [
  [/^https?:\/\/cdn\.freesound\.org\/previews\/\d+\/(\d+)/, 'freesound'],
  [/^https?:\/\/archive\.org\/download\/([^/]+)\/[^/]+$/, 'aporee'],
];

/**
 * Peilin polku äänen osoitteesta, tai null jos osoite ei ole peilattava
 * äänitiedosto.
 *
 * Null on tavallinen vastaus eikä virhe. Paketeissa on archive.org-
 * osoitteita myös lähdeviitteinä — kirjaskannien ja viritysäänten
 * lisenssisivut ovat muotoa `archive.org/details/<tunnus>` — ja ne ovat
 * HTML-sivuja, eivät äänitiedostoja. Sellaista ei ole peilissä eikä
 * pidäkään olla: peli soittaa viritysäänet repon omasta
 * assets/audio-kansiosta ja käyttää details-osoitetta vain linkkinä.
 *
 * Peilaustyökalu päättää tällä samalla funktiolla, minkä osoitteiden
 * kopion se lataa. Kirjoittaja ja lukija eivät siis voi olla eri mieltä
 * siitä, mitä peilissä on ja millä nimellä.
 */
export function peiliAaniPolku(url) {
  if (typeof url !== 'string') return null;
  // Valinta voi kantaa aloituskohdan (#alku=20&voima=1.5). Se ei kuulu
  // tiedoston nimeen.
  const osoite = url.split('#')[0].split('?')[0];
  const osuma = AANIMUODOT
    .map(([kuvio, etuliite]) => [osoite.match(kuvio), etuliite])
    .find(([m]) => m);
  if (!osuma) return null;
  const [m, etuliite] = osuma;
  // Pääte luetaan tiedostonimestä, mutta vain jos se on uskottava pääte.
  // Muuten peilistä tulisi nimiä kuten `…​.2k-hz`.
  const pate = (osoite.split('/').pop() ?? '').split('.').pop()?.toLowerCase() ?? '';
  return `aanet/${turvanimi(`${etuliite}-${m[1]}`, /^[a-z0-9]{2,4}$/.test(pate) ? pate : 'mp3')}`;
}

// --- katkaisija ---------------------------------------------------------------
//
// Peiliä ei kannata kysellä loputtomiin, jos sitä ei ole vielä julkaistu
// tai se on nurin: silloin jokainen kuva maksaisi turhan epäonnistuneen
// pyynnön. Muutaman virheen jälkeen peili jätetään hetkeksi väliin ja
// aineisto haetaan suoraan alkuperäisestä lähteestä. Katkaisu on
// määräaikainen — ks. KATKAISUN_KESTO_MS alla.
//
// Katkaisija on lähdekohtainen. Kuvat ja äänet ovat eri palvelimilla,
// eikä toisen kaatuminen kerro toisesta mitään: yhteinen laskuri sammutti
// kuvapeilin kolmen ääniongelman jälkeen, vaikka kuvapalvelin olisi ollut
// koko ajan kunnossa. Sama koskee tilannetta, jossa osa äänistä
// tarkoituksella jätetään peilaamatta — niiden 404:t eivät saa viedä
// kuvia mukanaan.

const VIRHERAJA = 3;
const LAJIT = ['kuvat', 'aanet'];
const poisAvain = (laji) => `matkakirja-peili-pois-${laji}`;

/*
 * KATKAISIJA PARANEE ITSESTÄÄN VIIDESSÄ MINUUTISSA.
 *
 * Aiemmin katkaisu kesti koko istunnon: `sessionStorage` säilyy myös
 * sivun uudelleenlatauksen yli, joten kerran lauettuaan peili oli
 * poissa käytöstä siihen asti kunnes VÄLILEHTI suljettiin. Omistaja
 * raportoi 6.8.2026: *"Kuvat menevät vieläkin välillä rikki, vaikka
 * lataan sivun uudestaan ja vaikka olen käynnistänyt pelinkin
 * uudestaan."* Juuri niin sen piti käyttäytyä — eikä uusi peli auta,
 * koska kyse ei ole pelitilasta vaan välilehden muistista.
 *
 * Laukeaminen on lisäksi HELPPOA syystä, joka ei kerro peilin
 * kunnosta: R2:n kehitysosoite (pub-*.r2.dev) on Cloudflaren oma
 * rajoitettu osoite, ja lehden kansi pyytää kymmeniä kuvia kerralla.
 * Yksi purske riittää kolmeen virheeseen.
 *
 * Viisi minuuttia on kompromissi: kaatunutta peiliä ei jauheta joka
 * kuvalla, mutta ohimenevä purskerajoitus ei jää päälle. Aika
 * tallennetaan, jotta se kestää uudelleenlatauksen — vanha arvo '1'
 * tulkitsee itsensä ikivanhaksi, eli päivitys avaa peilin heti.
 */
const KATKAISUN_KESTO_MS = 5 * 60 * 1000;

const virheita = { kuvat: 0, aanet: 0 };
const poisAsti = { kuvat: 0, aanet: 0 };
for (const laji of LAJIT) {
  try {
    const tallennettu = Number(globalThis.sessionStorage?.getItem(poisAvain(laji)));
    if (Number.isFinite(tallennettu)) poisAsti[laji] = tallennettu;
  } catch { /* selain voi kieltää tallennuksen — mennään oletuksella */ }
}

/** Onko peili juuri nyt käytössä tälle lajille? */
export function peiliKaytossa(laji = 'kuvat') {
  // Paikallisesti avattu tiedosto (file:) ei saa verkkoyhteyttä samalla
  // tavalla, mutta peili on tavallinen https-osoite ja toimii silti.
  if (Date.now() < (poisAsti[laji] ?? 0)) return false;
  // Katkaisu vanheni: laskuri alkaa alusta, muuten kolme vanhaa
  // virhettä sulkisi peilin heti uudelleen ensimmäisestä yskähdyksestä.
  if (poisAsti[laji]) {
    poisAsti[laji] = 0;
    virheita[laji] = 0;
    try { globalThis.sessionStorage?.removeItem(poisAvain(laji)); } catch { /* ks. yllä */ }
  }
  return true;
}

/** Peili petti: kolmannen virheen jälkeen se laji jätetään hetkeksi väliin. */
export function peiliPetti(laji = 'kuvat') {
  if (!LAJIT.includes(laji) || !peiliKaytossa(laji)) return;
  virheita[laji] += 1;
  if (virheita[laji] < VIRHERAJA) return;
  poisAsti[laji] = Date.now() + KATKAISUN_KESTO_MS;
  try {
    globalThis.sessionStorage?.setItem(poisAvain(laji), String(poisAsti[laji]));
  } catch { /* ks. yllä */ }
}

/** Vain testejä varten: nollaa katkaisijan tila. */
export function nollaaPeili() {
  for (const laji of LAJIT) {
    virheita[laji] = 0;
    poisAsti[laji] = 0;
    try { globalThis.sessionStorage?.removeItem(poisAvain(laji)); } catch { /* ks. yllä */ }
  }
}

// --- äänet --------------------------------------------------------------------

/**
 * Äänitteen osoite peilistä, jos se on peilattu. Vain Freesoundin ja
 * archive.orgin äänitteet ovat peilissä; muut (esim. omat assets-
 * tiedostot) palautuvat sellaisenaan.
 */
export function aaniOsoite(url) {
  if (!url || !peiliKaytossa('aanet')) return url;
  // peiliAaniPolku tunnistaa itse, mitkä osoitteet ovat peilissä:
  // se palauttaa null kaikelle muulle (repon omat tiedostot, arkiston
  // lähdesivut). Erillistä esikarsintaa ei tarvita — se olisi toinen
  // paikka, jossa sääntö voisi eriytyä.
  const polku = peiliAaniPolku(url);
  return polku ? `${AANI_JUURI}${polku}` : url;
}

/**
 * Hakee äänitteen puskuriin peilistä ja putoaa tarvittaessa
 * alkuperäiseen lähteeseen. Palauttaa saman kuin fetch.
 */
export async function haeAani(url) {
  const peili = aaniOsoite(url);
  if (peili !== url) {
    const vastaus = await fetch(peili).catch(() => null);
    if (vastaus?.ok) return vastaus;
    peiliPetti('aanet');
  }
  return fetch(url);
}

/**
 * Onko osoite peilistä, ja mistä lajista? Kertoo sekä sen, kannattaako
 * varareittiä yrittää, että sen kummalle katkaisijalle virhe kuuluu.
 * Palauttaa 'kuvat', 'aanet' tai null.
 */
export function peilinLaji(osoite) {
  if (typeof osoite !== 'string') return null;
  if (osoite.startsWith(AANI_JUURI) && /\/aanet\//.test(osoite)) return 'aanet';
  if (osoite.startsWith(PEILI_JUURI)) return 'kuvat';
  return null;
}

/** Onko osoite peilistä? Kertoo, kannattaako varareittiä yrittää. */
export function onPeilista(osoite) {
  return peilinLaji(osoite) !== null;
}

// --- kuvan asettaminen --------------------------------------------------------

/**
 * Asettaa kuvan osoitteen niin, että peilin pettäessä siirrytään
 * varareitille. `onVirhe` kutsutaan vasta, kun kumpikin osoite on
 * epäonnistunut — silloin kuvaa ei oikeasti ole.
 *
 * Sama <img> uusiokäytetään galleriassa, joten kuuntelija tarkistaa
 * ennen toimintaansa, että kuva yhä yrittää juuri sitä osoitetta jolle
 * se asetettiin. Muuten vanha kuuntelija voisi pudottaa uuden kuvan
 * edellisen varareitille. Ketju on enintään kahden pyynnön mittainen
 * eikä voi jäädä silmukkaan.
 */
export function asetaKuva(kuva, osoite, vara, onVirhe = null) {
  const kohde = osoite ?? vara;
  if (!kohde) return;
  if (kuva.getAttribute('src') === kohde) return;

  const varalla = Boolean(vara) && vara !== kohde;
  const yha = (odotettu) => kuva.getAttribute('src') === odotettu;

  /*
   * UUSINTA HETKEN PÄÄSTÄ, LISÄPARAMETRILLA.
   *
   * Kun kuvia pyydetään kymmeniä kerralla (lehden kansi), palvelin
   * rajoittaa purskeita ja osa pyynnöistä kaatuu ohimenevästi. Lyhyt
   * odotus riittää yleensä avaamaan rajan. Lisäparametri on pakollinen:
   * ilman sitä selain tarjoilee äsken epäonnistuneen vastauksen omasta
   * välimuististaan eikä pyydä mitään.
   */
  const uusiHetkenPaasta = (nykyinen, sitten) => {
    setTimeout(() => {
      if (!yha(nykyinen)) return;
      const uusi = `${nykyinen}${nykyinen.includes('?') ? '&' : '?'}yritys=2`;
      kuva.addEventListener('error', () => { if (yha(uusi)) sitten(); }, { once: true });
      kuva.src = uusi;
    }, 4000);
  };

  kuva.addEventListener('error', () => {
    if (!yha(kohde)) return;
    if (!varalla) {
      /*
       * EI ERILLISTÄ VARAREITTIÄ — MUTTA EI MYÖSKÄÄN HETI LUOVUTETA.
       *
       * Näin käy aina, kun peilin katkaisija on lauennut: silloin
       * valokuvaUrl palauttaa jo valmiiksi Commonsin osoitteen, ja
       * varareitti on sama osoite. Aiemmin tässä luovutettiin
       * ENSIMMÄISESTÄ virheestä ilman yhtään uusintaa — ja koska
       * katkaisija kesti koko välilehden eliniän, kuva jäi rikki myös
       * sivun uudelleenlatauksen jälkeen (omistajan havainto
       * 6.8.2026). Nyt sama uusinta kuin varareitilläkin.
       */
      uusiHetkenPaasta(kohde, () => onVirhe?.());
      return;
    }
    peiliPetti(peilinLaji(kohde) ?? 'kuvat');
    kuva.addEventListener('error', () => {
      if (!yha(vara)) return;
      // Kolmas yritys hetken päästä (omistajan havainto 6.8.2026:
      // Venetsian kannesta puuttui kuvia).
      uusiHetkenPaasta(vara, () => onVirhe?.());
    }, { once: true });
    kuva.src = vara;
  }, { once: true });

  kuva.src = kohde;
}
