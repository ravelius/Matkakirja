/*
 * LIVIAN ÄÄNI — pulu puhuu kuplansa ääneen.
 *
 * Omistajan tilaus 6.9.2026 aamupäivä, sanatarkasti: *"Pululle täytyy
 * etsiä eleveniltä oma ääni joka vähän käheä ja nopea puhumaan.
 * Generoidaan kaikki valmiiksi kirjoitetut repliikit puheeksi."* ja
 * *"Tehdään pulusta hyvin vokaalinen ja elävä vastakohta kertojan
 * monotoonisuuteen."*
 *
 * Kertoja (Viisas Kertoja, js/luenta.js ja js/linssipuhe.js) lukee
 * isoisän tekstit tasaisella äänellä. Livia on sen vastakohta: oma
 * käheä ääni, nopea tempo ja runsaat elävöitystagit. Äänitteet
 * generoidaan tools/generoi-pulu.mjs -työkalulla ja ne asuvat
 * ämpärissä (LIVIAN_AANIJUURI) — repossa niitä ei ole.
 *
 * ── TIEDOSTONIMI ON KYTKENTÄ ───────────────────────────────────────
 *
 * Nimi EI ole kutsujan muistin varassa vaan johdetaan lähteestä ja
 * järjestysnumerosta (livianAaniNimi) — samalla funktiolla pelissä ja
 * generointityökalussa, tasan kuten linssiluennoilla (js/
 * linssipuhe.js luennanRunko). Jos nimet eriytyisivät, ajo maksaisi
 * tiedostosta, jota peli ei koskaan hae, eikä mikään kaatuisi:
 * puuttuva luenta on hiljainen.
 *
 * Lähteitä on kaksi lajia. Kolme ensimmäistä ovat js/livia.js:n
 * repliikkiryhmiä:
 *   avaus          LIVIAN_AVAUS, viisi kuplaa aloitusvalinnassa
 *   paljastus      livianPaljastus(), kolme kuplaa ensisaapumisessa
 *                  (kaksi ennen isoisän luentaa, yksi sen jälkeen)
 *   mannerivihje   MANNERIVIHJE, yksi kupla
 *   lehtivinkki    LIVIAN_LEHTIVINKKI, yksi kupla lehden avautuessa
 *
 * ── KAUPUNKIKOHTAISET LÄHTEET (Eurooppa ensin) ─────────────────────
 *
 * Raamattu, VAIN EUROOPPA TYÖN ALLA (omistaja 7.9.2026): pulutekstit
 * käydään läpi Euroopan kaupunki kerrallaan, ja ääni generoidaan vasta
 * kun omistaja on hyväksynyt tekstit. Mukana ovat Ateena, Sofia,
 * Istanbul, Riika ja Vilna. Lähteen nimi on KAUPUNGIN TUNNUS (city.id)
 * ja indeksi tulee kenttien ja niiden KUPLIEN järjestyksestä
 * (LIVIAN_KAUPUNKILAHTEET) — ei siis kutsupaikan muistista. Tekstit
 * asuvat pakkauksissa (js/packs/fokusvirta-<id>.js) eikä niitä kopioida
 * tänne: peli ja työkalu lukevat saman kentän.
 *
 * YKSI KUPLA = YKSI TIEDOSTO (omistaja 7.9.2026). Kentän arvo saa olla
 * taulukko, jonka jokainen alkio on oma kupla ja oma äänite; vanha muoto
 * (yksi merkkijono) on yhden kuplan taulukko.
 *
 * Muut kaupungit ovat hiljaisia täsmälleen kuten ennen — tuntematon
 * lähde ei saa nimeä (livianAaniNimi palauttaa null).
 *
 * ── KAIKU ON POISTETTU PULUN ALUSTA ────────────────────────────────
 *
 * Omistaja 6.9.2026 ilta, sanatarkasti: *"ota kaiku pois pulun tekstin
 * alusta"*. Se kumoaa saman päivän aiemman tilauksen (*"Voidaan
 * käyttää myös pulun ääneen efektejä (kaiku alussa kun tulee ja
 * aloittaa jo huutelemaan viestiä ennenkuin on edes ehtinyt kokonaan
 * perille)"*): kuultuna kaiku söi repliikin ensimmäiset sanat, ja pulu
 * puhuu nyt KUIVALLA ÄÄNELLÄ ALUSTA ASTI joka repliikissä.
 *
 * Päätös on yhdessä vakiossa (LIVIAN_KAIKU) eikä hajallaan
 * kutsupaikoissa: kaikuversiot ovat yhä ämpärissä (ne on kerran
 * maksettu ja generoitu, tools/generoi-pulu.mjs teeKaiku), joten
 * paluu olisi yhden rivin vaihto — mutta peli ei niitä hae.
 *
 * SAAPUMISREPLIIKIT (LIVIAN_SAAPUMISREPLIIKIT) jäävät silti tähän
 * moduuliin: generointityökalu lukee ne, ja ne kertovat manifestissa,
 * mille repliikeille kaikuversio on olemassa. Ne ovat ne kuplat,
 * joissa Livia tulee paikalle: avauksen ensimmäinen (hän lennähtää
 * mukaan, js/livia.js naytaRepliikki lennahda), paljastuksen
 * ensimmäinen ("Kaak. Sähke pöllöltä.") ja kaupunkirepliikeistä vain
 * Sofian `paluu` (hän palaa pöllön luota). Peli soittaa niistäkin nyt
 * kuivan version.
 *
 * ── LUENTA SEURAA KUPLIA ───────────────────────────────────────────
 *
 * Omistaja 6.9.2026: *"Kaiuttimen kuvake kuplassa ei ole tarpeen;
 * luenta seuraa kuplia."* Kuplien rytmi (js/livia.js lukuaika) ohjaa
 * siis ääntä eikä toisin päin: kun seuraava kupla tulee, edellinen
 * äänite häivytetään pois. Siksi repliikkien PITUUS on äänitteen
 * pituus — liian pitkä repliikki katkeaa kesken (ks. lyhennysehdotukset
 * raportissa ja tools/generoi-pulu.mjs:n kuivassa ajossa, joka
 * tulostaa jokaisen repliikin arvioidun keston).
 *
 * Kytkin on sama kuin kertojalla (js/luenta.js luentaKytkinPaalla):
 * mykistetty peli on mykistetty myös pulun osalta. Puuttuva tiedosto
 * on hiljainen — kupla toimii ilman ääntä täsmälleen kuten ennen.
 */

import { puheVoima } from './aani-ehdokkaat.js';
import { luentaKytkinPaalla, merkitsePuhuja, vapautaPuhuja } from './luenta.js';
import { AANI_JUURI } from './media.js';

/**
 * Livian äänitteiden kansio ämpärissä.
 *
 * Sama polku kirjoitetaan tools/generoi-pulu.mjs:n vientiin; peli
 * hakee tasan sen, joten äänet kuuluvat heti ajon jälkeen ilman
 * julkaisua (kuten linssiluennat).
 */
export const LIVIAN_AANIJUURI = `${AANI_JUURI}aanet/pulu/`;

/**
 * KAUPUNKIKOHTAISET LÄHTEET: kaupungin tunnus → äänitetyt kentät
 * siinä järjestyksessä, jossa ne saavat tiedostonumeronsa.
 *
 * Kenttien nimet ovat pakkausten omia (js/packs/fokusvirta-<id>.js):
 * `maadoitus` ja `teksti` ovat `pollo`-lohkosta ja loput sähketehtävän
 * vaiheita (`sahketehtava.johdanto` jne., js/fokusvirta.js).
 *
 * YKSI KUPLA = YKSI TIEDOSTO (omistaja 7.9.2026). Kenttä voi olla
 * pakkauksessa TAULUKKO, jonka jokainen alkio on oma kupla ja oma
 * äänite — siksi rivi kertoo myös KUPLIEN MÄÄRÄN: `'odotus'` on yksi
 * kupla, `['maadoitus', 2]` kaksi. Numerointi juoksee kenttien yli
 * kuplina, eli Sofian `johdanto` alkaa vasta maadoituksen kahden
 * kuplan jälkeen. Määrän on vastattava pakkauksen tekstiä; ristiriita
 * kaataa generointityökalun (tools/generoi-pulu.mjs kaupunginRepliikit)
 * ja vaientaa kuplan pelissä (LIVIAN_AANITETYT).
 *
 * Järjestystä EI saa muuttaa jälkikäteen — numero on tiedostonimessä,
 * ja uudelleennumerointi tarkoittaisi koko kaupungin
 * uudelleengenerointia. Uusi kenttä lisätään listan LOPPUUN.
 *
 * VAIN EUROOPPA TYÖN ALLA (Raamattu 7.9.2026): mukana on kahdeksantoista
 * Euroopan kaupunkia, joiden uuden kulun tekstit omistaja hyväksyi
 * 7.9.2026 kahdessa erässä. Muut kaupungit ovat hiljaisia kunnes niiden
 * tekstit on hyväksytty.
 */
export const LIVIAN_KAUPUNKILAHTEET = {
  ateena: ['maadoitus'],
  sofia: [
    'alustus', 'huudahdus', ['kommentti', 2], ['johdanto', 2], ['vinkki', 2],
    'linkkiSaate', ['oikein', 2], 'odotus', ['paluu', 2],
  ],
  istanbul: ['alustus', 'huudahdus', ['kommentti', 3]],
  bukarest: ['alustus', 'huudahdus', ['kommentti', 2]],
  sarajevo: ['alustus', 'huudahdus', ['kommentti', 2]],
  budapest: ['alustus', 'huudahdus', ['kommentti', 2]],
  wien: ['alustus', 'huudahdus', ['kommentti', 2]],
  praha: ['alustus', 'huudahdus', ['kommentti', 2]],
  krakova: ['alustus', 'huudahdus', ['kommentti', 2]],
  varsova: ['alustus', 'huudahdus', ['kommentti', 2]],
  pietari: ['alustus', 'huudahdus', ['kommentti', 2]],
  moskova: ['alustus', 'huudahdus', ['kommentti', 2]],
  kiova: ['alustus', 'huudahdus', ['kommentti', 2]],
  odessa: ['alustus', 'huudahdus', ['kommentti', 2]],
  helsinki: ['alustus', 'huudahdus', ['kommentti', 2]],
  tampere: ['alustus', 'huudahdus', ['kommentti', 2]],
  tallinna: ['alustus', 'huudahdus', ['kommentti', 2]],
  riika: ['alustus', 'huudahdus', ['kommentti', 3]],
  vilna: ['alustus', 'huudahdus', ['kommentti', 3]],
};

/**
 * KENTÄN KUPLAT PAKKAUKSESTA — sama normalisointi pelissä ja
 * työkalussa.
 *
 * Vanha muoto (yksi merkkijono) on yhä kelvollinen: se on yhden kuplan
 * taulukko. Tyhjät karsitaan, jotta puuttuva kenttä ei saa numeroa.
 *
 * @param {string|string[]|null|undefined} arvo pakkauksen kentän arvo
 * @returns {string[]} kuplat järjestyksessä
 */
export function livianKuplat(arvo) {
  // Huudahdus on olio { kohta, teksti }: kupla on sen teksti, `kohta`
  // on ajoitusta varten eikä koskaan puhetta (js/fokusvirta.js).
  const lista = Array.isArray(arvo) ? arvo
    : [arvo && typeof arvo === 'object' ? arvo.teksti : arvo];
  return lista
    .map((osa) => String(osa ?? '').trim())
    .filter(Boolean);
}

/**
 * Yhden kentän kuplat pakkauksesta kentän nimellä.
 *
 * `pollo`-lohko voittaa: `maadoitus` ja `teksti` asuvat siellä, muut
 * kentät sähketehtävässä. Näin kutsupaikan ei tarvitse tietää, kummasta
 * lohkosta kenttä tulee.
 */
export function livianKentanKuplat(pakkaus, kentta) {
  const pollo = pakkaus?.pollo ?? {};
  const arvo = kentta in pollo ? pollo[kentta] : pakkaus?.sahketehtava?.[kentta];
  return livianKuplat(arvo);
}

/**
 * Kaupungin äänitetyt kentät normalisoituna: nimi, kuplien määrä ja
 * ensimmäisen kuplan järjestysnumero.
 *
 * @param {string} kaupunkiId kaupungin tunnus (city.id)
 * @returns {Array<{kentta:string, kuplat:number, alku:number}>}
 */
export function livianKaupunkiKentat(kaupunkiId) {
  let alku = 0;
  return (LIVIAN_KAUPUNKILAHTEET[kaupunkiId] ?? []).map((rivi) => {
    const [kentta, kuplat = 1] = Array.isArray(rivi) ? rivi : [rivi, 1];
    const tieto = { kentta, kuplat, alku };
    alku += kuplat;
    return tieto;
  });
}

/**
 * KIRJOITETUT KUPLAKENTÄT (omistaja 7.9.2026).
 *
 * Näiden kenttien teksti on kirjoitettu KUPLAKSI: yhden merkkijonon
 * alustus on yksi kupla, ei kahdeksi virkkeeksi pilkottava puheenvuoro.
 * Vanhat kentät (maadoitus ja sähketehtävän vaiheet) ovat yhä pitkiä
 * merkkijonoja, jotka peli pilkkoo ruudulla (js/ui-apurit.js
 * jaaPuheenvuoroksi) — ja juuri se ero ratkaisee, mitataanko repliikin
 * näkyvä aika yhtenä kuplana vai osien summana.
 */
export const LIVIAN_KUPLAKENTAT = new Set(['alustus', 'huudahdus', 'kommentti']);

/**
 * Pilkotaanko tämä kenttä ruudulla osiin (pinoutuva puheenvuoro)?
 *
 * @param {string} kentta pakkauksen kentän nimi
 * @param {number} kuplia kentän kuplien määrä
 * @returns {boolean}
 */
export function livianKenttaPinoutuu(kentta, kuplia) {
  return !LIVIAN_KUPLAKENTAT.has(kentta) && kuplia <= 1;
}

/** Kuinka monta kuplaa kentässä on (0 = ei äänitetty). */
export function livianKaupunkiKuplia(kaupunkiId, kentta) {
  return livianKaupunkiKentat(kaupunkiId).find((k) => k.kentta === kentta)?.kuplat ?? 0;
}

/** Repliikkilähteet siinä nimeämisjärjestyksessä, jota työkalu käyttää. */
export const LIVIAN_AANILAHTEET = [
  'avaus', 'paljastus', 'mannerivihje', 'lehtivinkki',
  ...Object.keys(LIVIAN_KAUPUNKILAHTEET),
];

/**
 * Saapumisrepliikit lähteittäin: indeksit, joissa Livia tulee paikalle
 * ja joille on generoitu kaikuversio (ks. KAIKU ON POISTETTU PULUN
 * ALUSTA yllä — peli ei enää soita niitä, työkalu tuntee ne).
 *
 * Sofian `paluu` haetaan kenttälistasta eikä kirjoiteta numerona:
 * numero on nimeämisen tulos, ei erikseen ylläpidettävä vakio.
 */
export const LIVIAN_SAAPUMISREPLIIKIT = {
  avaus: [0],
  paljastus: [0],
  // Paluun ENSIMMÄINEN kupla: siinä Livia tulee ilmasta sisään.
  sofia: [livianKaupunkiKentat('sofia').find((k) => k.kentta === 'paluu').alku],
};

/**
 * Kaupunkirepliikin järjestysnumero kentän nimestä ja kuplan
 * numerosta.
 *
 * Tämä on se kohta, jossa kutsupaikka sanoo "Sofian vinkki, toinen
 * kupla" eikä "lähde sofia, indeksi 5": kutsupaikan ei kuulu tietää
 * numeroita.
 *
 * @param {string} kaupunkiId kaupungin tunnus (city.id)
 * @param {string} kentta pakkauksen kentän nimi
 * @param {number} [kuplaIndeksi] kentän monesko kupla (0-alkuinen)
 * @returns {number|null} indeksi tai null, jos kaupunkia, kenttää tai
 *   kuplaa ei ole äänitetty.
 */
export function livianKaupunkiIndeksi(kaupunkiId, kentta, kuplaIndeksi = 0) {
  const tieto = livianKaupunkiKentat(kaupunkiId).find((k) => k.kentta === kentta);
  if (!tieto) return null;
  if (!Number.isInteger(kuplaIndeksi) || kuplaIndeksi < 0) return null;
  if (kuplaIndeksi >= tieto.kuplat) return null;
  return tieto.alku + kuplaIndeksi;
}

/*
 * KAUPUNKIÄÄNET OVAT KYTKIMEN TAKANA (omistaja 6.9.2026 ilta: "älä
 * generoi ääniä vielä tässä vaiheessa"). Kytkentä ja hitaampi
 * kuplarytmi ovat koodissa valmiina, mutta ennen generointia ne
 * jäisivät hiljaisiksi ja hitaiksi: kupla odottaisi puhetta, jota ei
 * ole. Kytkin käännetään trueksi samassa julkaisussa, jossa
 * generoi-pulu.yml on vienyt ateena-/sofia-tiedostot ämpäriin.
 */
export const LIVIAN_KAUPUNKIAANET_KAYTOSSA = true; // generoitu 6.9.2026 ilta (omistaja: "saat generoida kaikki muut paitsi uuden linssin äänet")

/** Onko tälle kaupungin repliikille olemassa äänite? */
export function livianKaupunkiAanitetty(kaupunkiId, kentta) {
  return LIVIAN_KAUPUNKIAANET_KAYTOSSA && livianKaupunkiIndeksi(kaupunkiId, kentta) !== null;
}

/**
 * ÄÄNITETTY PALJASTUSVARIANTTI. Paljastuksen teksti ladotaan maasta ja
 * kaupungista (js/livia.js livianPaljastus), joten äänite on olemassa
 * vain sille variantille, joka on generoitu. Aloitusreitti on
 * kaanonissa Ateena ("Ateenasta se alkaa", LIVIAN_AVAUS), ja
 * paljastus tulee vain ENSIMMÄISELLÄ saapumisella koskaan — muualla
 * kupla toimii ilman ääntä.
 *
 * Jos aloitusreittejä tulee lisää, tähän lisätään variantit ja
 * työkalu generoi niille omat tiedostonsa (nimeen tulee maan tunnus).
 */
export const LIVIAN_AANITETTY_PALJASTUS = { paikkaan: 'Ateenaan', paikkaa: 'Ateenaa' };

/* ------------------------------------------------------------------ *
 * Vanhentunut äänite on hiljainen
 * ------------------------------------------------------------------ */

/**
 * REPLIIKIN TIIVISTE (FNV-1a, 32 bittiä heksana).
 *
 * Puhdas funktio, sama pelissä ja työkalussa — kuten tiedostonimikin.
 * Tiiviste ei ole turvatoimi vaan tunniste: se erottaa kaksi eri
 * tekstiä toisistaan lyhyellä merkkijonolla, joka mahtuu tauluun ja
 * manifestiin.
 */
export function livianTiiviste(teksti) {
  let h = 0x811c9dc5;
  for (const merkki of String(teksti ?? '').trim()) {
    h ^= merkki.codePointAt(0);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, '0');
}

/**
 * MITÄ ÄMPÄRISSÄ OIKEASTI ON: repliikin avain → sen TEKSTIN tiiviste,
 * jolla tiedosto on generoitu.
 *
 * MIKSI TÄMÄ TAULU ON OLEMASSA. Tiedostonimi johdetaan lähteestä ja
 * indeksistä (livianAaniNimi), joten repliikin tekstin muuttuminen ei
 * muuta nimeä: ämpärissä oleva vanha äänite soisi uuden kuplan alla ja
 * sanoisi eri asian kuin ruudulla lukee. Se on pahempi vika kuin
 * hiljaisuus, koska mikään ei kaadu eikä kukaan huomaa. Kun kuplan
 * teksti ei vastaa tätä taulua, äänite jätetään soittamatta — kupla
 * toimii ilman ääntä täsmälleen kuten ennen.
 *
 * PÄIVITYS: aja tools/generoi-pulu.mjs (kuiva ajo kertoo, mitkä
 * repliikit ovat UUSIA tai MUUTTUNEITA, ja generointiajo tulostaa
 * valmiin taulun tähän liitettäväksi).
 *
 * TAULU KATTAA MYÖS KAUPUNKILÄHTEET (7.9.2026). Sofian repliikit
 * kirjoitettiin uusiksi ja jaettiin kupliksi, ja ämpärissä on yhä
 * 6.9. generoitu sofia-1…7 vanhoilla teksteillä. Ilman vartiointia se
 * vanha äänite soisi uuden kuplan alla ja sanoisi eri asian kuin
 * ruudulla lukee — siksi kaupunkirepliikit kulkevat nyt samasta
 * portista kuin paljastus ja lehtivinkki, ja kutsupaikka antaa aina
 * kuplan tekstin (soitaLivianKaupunkiAani).
 *
 * TILANNE 7.9.2026 ilta: Sofian uudet kuplat sekä Istanbulin, Riian ja
 * Vilnan repliikit ODOTTAVAT AJOA — niiden rivit puuttuvat, joten pulu
 * on niissä hiljaa kunnes ääni on generoitu ja taulu päivitetty.
 * Ateenan maadoitus on ennallaan ja ajan tasalla.
 */
export const LIVIAN_AANITETYT = {
  'avaus-1': '62c6bcbd',
  'avaus-2': '30c6eb27',
  'avaus-3': '1446cf47',
  'avaus-4': 'b8bf54c6',
  'avaus-5': 'c7f488b4',
  // Uusi rytmi generoitu 7.9.2026 (generoi-pulu, ääni Dr. Von, pakota):
  // paljastus 1–3 ja lehtivinkki. Tiivisteet manifestista.
  'paljastus-1': '4dd412c2',
  'paljastus-2': '55959b90',
  'paljastus-3': '531008d4',
  'lehtivinkki-1': '676644e9',
  'mannerivihje-1': '9b1a96f3',
  // Kaupunkirepliikit: Ateenan maadoitus on generoitu 6.9.2026 eikä sen
  // teksti ole muuttunut. Uuden kulun kaupungit (Sofia, Istanbul,
  // Bukarest, Sarajevo, Budapest, Wien, Praha, Krakova, Varsova, Riika,
  // Vilna) odottavat ajoa — rivit lisätään kuivan ajon tulostamasta
  // taulusta, ja pulu on niissä siihen asti hiljaa.
  'ateena-1': '3f39d123',
};

/* ------------------------------------------------------------------ *
 * Tarkistettavat kaupungit kartalla
 * ------------------------------------------------------------------ */

/**
 * VÄLIAIKAINEN TARKISTUSAPU (omistajan tilaus 7.9.2026, sanatarkasti:
 * *"voisit merkitä kartalle nuo kaupungit korostusvärillä, missä on
 * nämä uudet generoinnit käytössä, niin minun on helpompi käydä ne läpi
 * ja antaa palaute"*).
 *
 * Korostus on TARKISTUSAPU, ei pelimekaniikka: päätoimittaja kääntää
 * tämän vakion falseksi, kun omistaja on käynyt kaupungit läpi. Se ei
 * saa muuttaa yhtäkään osumapintaa — pelkkä lisäkehä kaupungin merkin
 * ympärillä (css .kaupunki-tarkistus).
 */
export const LIVIAN_KOROSTUS_KAYTOSSA = true;

/**
 * Ne kaupungit, joissa uusi kulku on VALMIS KUUNNELTAVAKSI: kaupungilla
 * on uuden kulun repliikit (alustus tai kommentti) JA jokaiselle sen
 * kuplalle on generoitu äänite (LIVIAN_AANITETYT).
 *
 * Lista JOHDETAAN eikä ylläpidetä käsin: käsin kirjoitettu lista
 * jäisi jälkeen heti ensimmäisestä ajosta, ja kartta lupaisi ääntä,
 * jota ei ole. Tyhjä joukko ennen ensimmäistä ajoa on oikea vastaus —
 * mitään ei ole vielä kuunneltavaksi.
 *
 * @returns {Set<string>} kaupunkien tunnukset
 */
export function livianKorostetutKaupungit() {
  const joukko = new Set();
  if (!LIVIAN_KOROSTUS_KAYTOSSA) return joukko;
  for (const kaupunkiId of Object.keys(LIVIAN_KAUPUNKILAHTEET)) {
    const kentat = livianKaupunkiKentat(kaupunkiId);
    const uusiKulku = kentat.some((k) => k.kentta === 'alustus' || k.kentta === 'kommentti');
    if (!uusiKulku) continue;
    const kuplia = kentat.reduce((summa, k) => summa + k.kuplat, 0);
    let valmiita = 0;
    for (let i = 0; i < kuplia; i += 1) {
      if (LIVIAN_AANITETYT[`${kaupunkiId}-${i + 1}`]) valmiita += 1;
    }
    if (valmiita === kuplia) joukko.add(kaupunkiId);
  }
  return joukko;
}

/**
 * Onko ämpärin äänite tämän tekstin äänite?
 *
 * Ilman tekstiä (kutsupaikka ei sitä kerro) vastaus on kyllä js/livia.js:n
 * omille lähteille: portti ei saa vaientaa niitä, jotka eivät sitä käytä.
 *
 * KAUPUNKILÄHTEET OVAT AINA VARTIOITUJA (7.9.2026). Niiden tekstit
 * asuvat pakkauksissa ja muuttuvat siellä ilman että tiedostonimi
 * muuttuu, joten ilman tekstiä ei voi todeta, sanooko ämpärin äänite
 * saman kuin kupla — ja vaikeneminen on silloin ainoa oikea vastaus.
 */
export function livianAaniAjanTasalla(lahde, indeksi, teksti = null) {
  if (teksti == null) return !LIVIAN_KAUPUNKILAHTEET[lahde];
  const avain = `${lahde}-${indeksi + 1}`;
  return LIVIAN_AANITETYT[avain] === livianTiiviste(teksti);
}

/** Häivytys, kun seuraava kupla katkaisee edellisen repliikin. */
export const LIVIAN_HAIVYTYS_MS = 160;

/** Onko tämä repliikki se, jossa Livia saapuu (kaikuversio on olemassa)? */
export function livianSaapumisrepliikki(lahde, indeksi) {
  return (LIVIAN_SAAPUMISREPLIIKIT[lahde] ?? []).includes(indeksi);
}

/*
 * KAIKU POIS PULUN ALUSTA (omistaja 6.9.2026 ilta: "ota kaiku pois
 * pulun tekstin alusta"). Tämä on se yksi paikka, joka päättää, hakeeko
 * peli kaikuversion vai kuivan: false = kuiva aina, myös
 * saapumisrepliikeissä. Kaikutiedostot jäävät ämpäriin, joten päätöksen
 * peruminen on tämän rivin vaihto — ei uutta ajoa.
 */
export const LIVIAN_KAIKU = false;

/**
 * Repliikin tiedostonimi ämpärissä.
 *
 * PUHDAS FUNKTIO — sama pelissä ja työkalussa. `kaiku` valitsee
 * saapumisversion; ilman lippua nimi on kuiva perusversio. Peli ei
 * enää anna lippua (LIVIAN_KAIKU), vain generointityökalu antaa.
 * Palauttaa null, jos lähde tai indeksi ei kelpaa.
 */
export function livianAaniNimi(lahde, indeksi, { kaiku = false } = {}) {
  if (!LIVIAN_AANILAHTEET.includes(lahde)) return null;
  if (!Number.isInteger(indeksi) || indeksi < 0) return null;
  return `livia-${lahde}-${indeksi + 1}${kaiku ? '-kaiku' : ''}.mp3`;
}

/**
 * Se tiedosto, jonka PELI soittaa: aina KUIVA versio (LIVIAN_KAIKU on
 * false, omistajan päätös 6.9.2026 ilta). Null, jos repliikkiä ei ole
 * olemassa.
 */
export function livianSoitettava(lahde, indeksi) {
  const kaiku = LIVIAN_KAIKU && livianSaapumisrepliikki(lahde, indeksi);
  return livianAaniNimi(lahde, indeksi, { kaiku });
}

/** Repliikin koko osoite ämpärissä. */
export function livianAaniOsoite(lahde, indeksi, juuri = LIVIAN_AANIJUURI) {
  const nimi = livianSoitettava(lahde, indeksi);
  return nimi ? `${juuri}${nimi}` : null;
}

/**
 * KAIKKI ÄÄNITETTÄVÄT REPLIIKIT yhtenä listana — työkalun syöte ja
 * manifestin runko.
 *
 * Tekstit tulevat kutsujalta (js/livia.js on kaanonin omistaja), nimet
 * tästä moduulista: näin peli ja työkalu eivät voi eriytyä.
 *
 * @param {object} lahteet { avaus: string[], paljastus: string[],
 *   mannerivihje: string[] }
 * @returns {Array<{avain:string, lahde:string, indeksi:number,
 *   teksti:string, nimi:string, kaikuNimi:string|null, saapuu:boolean,
 *   merkit:number}>}
 */
export function livianAanitykset(lahteet = {}) {
  const rivit = [];
  for (const lahde of LIVIAN_AANILAHTEET) {
    const tekstit = Array.isArray(lahteet[lahde]) ? lahteet[lahde] : [];
    tekstit.forEach((raaka, indeksi) => {
      const teksti = String(raaka ?? '').trim();
      if (!teksti) return;
      const saapuu = livianSaapumisrepliikki(lahde, indeksi);
      rivit.push({
        avain: `${lahde}-${indeksi + 1}`,
        lahde,
        indeksi,
        teksti,
        merkit: teksti.length,
        nimi: livianAaniNimi(lahde, indeksi),
        kaikuNimi: saapuu ? livianAaniNimi(lahde, indeksi, { kaiku: true }) : null,
        saapuu,
      });
    });
  }
  return rivit;
}

/**
 * Pysäyttää soivan repliikin ja vapauttaa taustan väistön.
 *
 * Häivytys on lyhyt tarkoituksella: kupla vaihtuu, ja kova katkaisu
 * kesken sanan kuulostaisi virheeltä. Turvallista kutsua monta kertaa.
 */
export function pysaytaLivianAani(ui, { haivyta = true } = {}) {
  if (!ui) return false;
  if (ui.liviaAaniAjastin) {
    clearInterval(ui.liviaAaniAjastin);
    ui.liviaAaniAjastin = null;
  }
  const audio = ui.liviaAani;
  ui.liviaAani = null;
  if (!audio) return false;
  const lopeta = () => {
    try {
      audio.pause();
      audio.removeAttribute('src');
    } catch {
      /* soitin oli jo purettu */
    }
    // Pysäytetty äänite ei laukaise 'ended'- eikä 'error'-tapahtumaa,
    // joten puhujan rooli vapautetaan käsin (sama sopimus kuin
    // js/linssipuhe.js pysaytaLinssiluenta).
    ui.luennat?.delete(audio);
    vapautaPuhuja(ui, audio);
  };
  if (!haivyta || !(audio.volume > 0)) {
    lopeta();
    return true;
  }
  const askel = audio.volume / 4;
  const kello = setInterval(() => {
    const jaljella = audio.volume - askel;
    if (jaljella > 0.01) {
      audio.volume = jaljella;
      return;
    }
    clearInterval(kello);
    lopeta();
  }, LIVIAN_HAIVYTYS_MS / 4);
  return true;
}

/**
 * Soittaa yhden Livian repliikin. Kutsutaan kuplan ilmestyessä
 * (js/livia.js) — kupla on aina ensin, ääni seuraa sitä.
 *
 * Edellinen repliikki häivytetään pois: kaksi Livian ääntä
 * päällekkäin olisi pahempi kuin katkennut lause.
 *
 * @param {object} ui pelin käyttöliittymä
 * @param {string} lahde 'avaus' | 'paljastus' | 'mannerivihje' tai
 *   kaupungin tunnus (LIVIAN_KAUPUNKILAHTEET)
 * @param {number} indeksi repliikin järjestysnumero lähteessä (0-alkuinen)
 * @param {object} [asetukset]
 * @param {string} [asetukset.paikkaan] paljastuksen kaupunki
 *   illatiivissa (ks. LIVIAN_AANITETTY_PALJASTUS): muu kuin äänitetty
 *   variantti jää hiljaiseksi.
 * @param {string} [asetukset.paikkaa] paljastuksen kaupunki
 *   partitiivissa
 * @param {string|null} [asetukset.teksti] kuplan teksti: jos annettu,
 *   äänite soi vain kun se vastaa ämpärissä olevaa (LIVIAN_AANITETYT).
 * @param {number} [asetukset.vaimennus] äänenvoimakkuuden kerroin
 *   (1 = normaali). Välihuuto luennan päällä soi hiljempaa.
 * @param {boolean} [asetukset.vaista] väistääkö tausta puheen ajaksi.
 *   VÄLIHUUTO EI VÄISTÄ (omistaja 7.9.2026): se soi kertojan PÄÄLLE,
 *   eikä kertoja saa hiljetä sen tieltä.
 * @returns {HTMLAudioElement|null} soittimen kahva tai null
 */
export function soitaLivianAani(ui, lahde, indeksi,
  { paikkaan = '', paikkaa = '', teksti = null, vaimennus = 1, vaista = true } = {}) {
  pysaytaLivianAani(ui);
  if (!ui || ui.dead || typeof Audio === 'undefined') return null;
  // Sama kytkin kuin kertojalla: mykistetty peli on mykistetty myös
  // pulun osalta.
  if (!luentaKytkinPaalla()) return null;
  // Radiotilassa ei kaksi ääntä päällekkäin (sama ehto kuin
  // matkakirja- ja linssiluennalla).
  if (ui.radioModuuli && !ui.radioModuuli.luentaSallittu()) return null;
  if (lahde === 'paljastus'
    && (paikkaan !== LIVIAN_AANITETTY_PALJASTUS.paikkaan
      || paikkaa !== LIVIAN_AANITETTY_PALJASTUS.paikkaa)) {
    // Muu kaupunki kuin äänitetty: kupla puhuu, äänite vaikenee.
    return null;
  }
  // Vanhentunut äänite on hiljainen: ämpärissä oleva tiedosto lukee
  // vielä edellisen tekstin (ks. LIVIAN_AANITETYT).
  if (!livianAaniAjanTasalla(lahde, indeksi, teksti)) return null;
  const url = livianAaniOsoite(lahde, indeksi);
  if (!url) return null;

  const audio = new Audio(url);
  audio.preload = 'auto';
  audio.volume = Math.max(0, Math.min(1, puheVoima() * vaimennus));
  ui.liviaAani = audio;
  // Kirjanpito kaikkiin luentoihin: taustalle menevä peli hiljentää
  // myös tämän (js/luenta.js taustaHiljennaLuennat).
  (ui.luennat ??= new Set()).add(audio);
  // Tausta väistyy puheen ajaksi. Merkintä ennen soittoa, jotta se
  // pariutuu vapautuksen kanssa myös silloin kun soitto ei käynnisty.
  // Välihuuto (vaista: false) ei merkitse puhujaa, joten kertoja jatkaa
  // entisellä voimallaan sen alla.
  if (vaista) merkitsePuhuja(ui, audio);
  const vapaaksi = () => {
    ui.luennat?.delete(audio);
    if (ui.liviaAani === audio) ui.liviaAani = null;
  };
  audio.addEventListener('ended', vapaaksi);
  audio.addEventListener('error', vapaaksi);
  audio.play().then(() => {
    // play() on asynkroninen: jos repliikki ehti vaihtua, myöhässä
    // herännyt ääni pysäytetään heti.
    if (ui.liviaAani !== audio) audio.pause();
  }).catch(() => {
    /*
     * Puuttuva tiedosto tai eleeseen sitomaton soitto: hiljaisuus, ei
     * virhettä — eikä peiliPetti-kutsua (js/linssipuhe.js:n oppi:
     * puuttuva puhe ei saa katkaista koko pelin äänipeiliä).
     */
    audio.dispatchEvent(new Event('error'));
  });
  return audio;
}

/**
 * KAUPUNKIREPLIIKIN ÄÄNI KENTÄN NIMELLÄ (js/fokusvirta.js).
 *
 * Kutsupaikka sanoo kaupungin, kentän ja kuplan — "sofia, paluu, toinen
 * kupla" — eikä numeroa: numeron omistaa LIVIAN_KAUPUNKILAHTEET.
 * Kaupunki, jota ei ole äänitetty, on hiljainen ilman että kutsupaikan
 * tarvitsee tietää siitä mitään (Raamattu: VAIN EUROOPPA TYÖN ALLA).
 *
 * TEKSTI ANNETAAN AINA: kaupunkilähteet ovat tiivistevartioituja
 * (livianAaniAjanTasalla), joten ilman kuplan tekstiä äänite jää
 * soimatta — se on tarkoituksellinen, ei vahinko.
 *
 * @param {object} ui pelin käyttöliittymä
 * @param {string} kaupunkiId kaupungin tunnus (city.id)
 * @param {string} kentta pakkauksen kentän nimi
 * @param {object} [asetukset]
 * @param {number} [asetukset.kupla] kentän monesko kupla (0-alkuinen)
 * @param {string|null} [asetukset.teksti] kuplan teksti tiivisteportille
 * @param {number} [asetukset.vaimennus] voimakkuuden kerroin
 * @param {boolean} [asetukset.vaista] väistääkö tausta (välihuuto ei)
 * @returns {HTMLAudioElement|null} soittimen kahva tai null
 */
export function soitaLivianKaupunkiAani(ui, kaupunkiId, kentta,
  { kupla = 0, teksti = null, vaimennus = 1, vaista = true } = {}) {
  const indeksi = livianKaupunkiIndeksi(kaupunkiId, kentta, kupla);
  if (indeksi === null) return null;
  return soitaLivianAani(ui, kaupunkiId, indeksi, { teksti, vaimennus, vaista });
}
