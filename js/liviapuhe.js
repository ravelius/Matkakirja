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
 *                  (äänitteitä on viisi; näytettäviä voi olla vähemmän,
 *                  ks. js/livia.js livianAvausSarja — numero on aina
 *                  kaanonin oma)
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
 * äänite häivytetään pois.
 *
 * MUTTA KUPLA ODOTTAA PUHEEN LOPPUUN (7.9.2026): jos äänite on
 * lukuaikaansa pidempi, kuplan ajastin venyy sen mittaan
 * (livianKuplanAjastin) eikä lause enää katkea kesken. Repliikkien
 * lyhyys on silti tavoite — pitkä kupla seisoo ruudulla pitkään — ja
 * tools/generoi-pulu.mjs varoittaa yhä ylityksestä.
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

/**
 * LINSSIEN VÄLIHUOMIOT: linssin tunnus → ne jaksot, joissa pulu
 * kommentoi, siinä järjestyksessä jossa ne saavat tiedostonumeronsa.
 *
 * Sama kirjanpito kuin kaupungeilla (LIVIAN_KAUPUNKILAHTEET), eri
 * aineisto: kaupungin kentät asuvat pakkauksessa, linssin jaksot
 * kertomuksen kaanonissa (js/linssit/ihmisen-matka-kertomus.js, kenttä
 * `pulu`). Raamattu KAARI HYVAKSYTTY, TUTKIMUSVAIHE, VIISI NAPPIA
 * kohta 5: *"kertomuksen keskelle 1–3 pulun lyhyttä välihuomiota omaan
 * tyyliin, ettei kertoja ole monotoninen"* — ja lopun välihuomio on se,
 * jolla pulu kertoo olevansa autettavissa (kohta 4).
 *
 * JÄRJESTYSTÄ EI SAA MUUTTAA jälkikäteen: numero on tiedostonimessä
 * (`livia-ihmisen-matka-1.mp3`). Uusi jakso lisätään listan LOPPUUN.
 * Listan on vastattava kertomuksen `pulu`-kenttiä; ristiriita kaataa
 * tools/generoi-pulu.mjs:n eikä maksa yhtäkään kutsua
 * (tests/ihmisen-matka-esitys.test.mjs vartioi saman koneellisesti).
 *
 * TEKSTIT ODOTTAVAT AJOA 7.9.2026: ämpärissä ei ole vielä yhtään
 * `livia-ihmisen-matka-*.mp3`-tiedostoa, joten kupla näkyy ja pulu on
 * hiljaa (LIVIAN_AANITETYT). Se on tila, ei vika.
 */
export const LIVIAN_LINSSILAHTEET = {
  'ihmisen-matka': ['ranta', 'denisova', 'beringia', 'loppu'],
};

/**
 * VÄLIHUOMION VAIMENNUS: pulu soi kertojan päälle hiljempaa eikä
 * kertoja väisty. Sama luku kuin fokusvirran huudahduksella
 * (js/fokusvirta.js HUUDAHDUKSEN_VAIMENNUS) — se on sama ilmiö.
 */
export const LIVIAN_VALIHUOMION_VAIMENNUS = 0.7;

/** Repliikkilähteet siinä nimeämisjärjestyksessä, jota työkalu käyttää. */
export const LIVIAN_AANILAHTEET = [
  'avaus', 'paljastus', 'mannerivihje', 'lehtivinkki',
  ...Object.keys(LIVIAN_KAUPUNKILAHTEET),
  ...Object.keys(LIVIAN_LINSSILAHTEET),
];

/**
 * Linssin välihuomion järjestysnumero jakson tunnuksesta.
 *
 * Kutsupaikka sanoo "Ihmisen matka, jakso denisova" eikä numeroa:
 * numeron omistaa LIVIAN_LINSSILAHTEET.
 *
 * @param {string} linssi linssin tunnus
 * @param {string} jakso kertomusjakson tunnus
 * @returns {number|null} indeksi tai null, jos jaksolla ei ole huomiota
 */
export function livianLinssiIndeksi(linssi, jakso) {
  const i = (LIVIAN_LINSSILAHTEET[linssi] ?? []).indexOf(jakso);
  return i < 0 ? null : i;
}

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
  // Euroopan 18 kaupunkia generoitu 7.9.2026 (erät 1 ja 2), "Kääk."-huudahdukset
  // (sofia-2, wien-2) uusinta-ajossa.
  // Kaupunkirepliikit: Ateenan maadoitus on generoitu 6.9.2026 eikä sen
  // teksti ole muuttunut. Uuden kulun kaupungit (Sofia, Istanbul,
  // Bukarest, Sarajevo, Budapest, Wien, Praha, Krakova, Varsova, Riika,
  // Vilna) odottavat ajoa — rivit lisätään kuivan ajon tulostamasta
  // taulusta, ja pulu on niissä siihen asti hiljaa.
  'ateena-1': '3f39d123',
  'sofia-1': 'eecfb26c',
  'sofia-3': '82771368',
  'sofia-4': '179d0591',
  'sofia-5': '1e64f9d0',
  'sofia-6': '2618c9dd',
  'sofia-7': '9118b3f7',
  'sofia-8': '559c7574',
  'sofia-9': '8f1fd7d8',
  'sofia-10': '153d43f5',
  'sofia-11': 'a25842d0',
  'sofia-12': '75c13aff',
  'sofia-13': 'bc7f04ef',
  'sofia-14': 'ced3fd34',
  'istanbul-1': 'aa460185',
  'istanbul-2': '8b0409a2',
  'istanbul-3': '97b8ba5a',
  'istanbul-4': 'ae40ccd7',
  'istanbul-5': '180c037b',
  'bukarest-1': '252e181c',
  'bukarest-2': '1a1c72e4',
  'bukarest-3': 'aee2c92a',
  'bukarest-4': '2a4c0a1a',
  'sarajevo-1': '09ad5616',
  'sarajevo-2': 'afce962e',
  'sarajevo-3': '4ec98aa1',
  'sarajevo-4': '4133a86b',
  'budapest-1': '6af968e0',
  'budapest-2': '93b5b31b',
  'budapest-3': '979edb25',
  'budapest-4': 'e80ad81d',
  'wien-1': '495f2c8b',
  'wien-3': 'd2399e33',
  'wien-4': 'f4a7f68b',
  'praha-1': 'e97c4ae2',
  'praha-2': 'eb978aac',
  'praha-3': '614f7f30',
  'praha-4': '6517ff2c',
  'krakova-1': '4457b03f',
  'krakova-2': '858824f0',
  'krakova-3': 'ce7224cd',
  'krakova-4': '8f1350d9',
  'varsova-1': 'bc9cde76',
  'varsova-2': '0cb21b42',
  'varsova-3': '5c732ab7',
  'varsova-4': '250213c7',
  'pietari-1': '960dedeb',
  'pietari-2': 'a3cd7368',
  'pietari-3': '5845dc3f',
  'pietari-4': '00b07b33',
  'moskova-1': 'bb36cfeb',
  'moskova-2': 'c6f397c0',
  'moskova-3': '246d4a35',
  'moskova-4': '05552091',
  'kiova-1': '8a817819',
  'kiova-2': 'c5a4c07a',
  'kiova-3': '46b284b5',
  'kiova-4': 'b1417379',
  'odessa-1': 'ce0c53d0',
  'odessa-2': 'c40bb6fa',
  'odessa-3': '2678dada',
  'odessa-4': 'e1ab4cec',
  'helsinki-1': 'de7f17ff',
  'helsinki-2': '7ab40e12',
  'helsinki-3': '517dea08',
  'helsinki-4': 'e19cf727',
  'tampere-1': '4d3595f2',
  'tampere-2': 'fca8a7fe',
  'tampere-3': 'a9036aa1',
  'tampere-4': 'cf9e3cbc',
  'tallinna-1': 'd258c3e5',
  'tallinna-2': '081ec104',
  'tallinna-3': 'ed338f86',
  'tallinna-4': 'c1ec3087',
  'riika-1': 'cb5606bd',
  'riika-2': '3eae9de7',
  'riika-3': 'aa3997d2',
  'riika-4': '8f8ca699',
  'riika-5': '0bab2ae3',
  'vilna-1': 'c4c9a5d5',
  'vilna-2': '0f49e6bf',
  'vilna-3': 'b5b7ea25',
  'vilna-4': '1bfc8e0c',
  'vilna-5': 'ba380765',
  // Ihmisen matkan neljä välihuomiota generoitu 7.9.2026 illalla
  // (generoi-pulu, ääni Dr. Von, pakota; omistaja: "laita ihmislinssin
  // puheet generoitumaan"). Tiivisteet ajon manifestista.
  'ihmisen-matka-1': '019b7159',
  'ihmisen-matka-2': '45dafd6e',
  'ihmisen-matka-3': '77366164',
  'ihmisen-matka-4': 'dbfd92fe',
  'sofia-2': '3eae9de7',
  'wien-2': '3eae9de7',
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
 * SAMA KOSKEE LINSSILÄHTEITÄ (LIVIAN_LINSSILAHTEET): kertomuksen
 * `pulu`-tekstit asuvat kaanonissa ja muuttuvat siellä.
 */
export function livianAaniAjanTasalla(lahde, indeksi, teksti = null) {
  if (teksti == null) return !LIVIAN_KAUPUNKILAHTEET[lahde] && !LIVIAN_LINSSILAHTEET[lahde];
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

/* ------------------------------------------------------------------ *
 * Kupla odottaa puheen loppuun
 * ------------------------------------------------------------------ */

/*
 * KUPLA ODOTTAA PUHEEN LOPPUUN (omistaja, Raamattu PULU PUHUU
 * 6.9.2026 — korjaus 7.9.2026).
 *
 * Kuplan näkyvä aika laskettiin pelkästä tekstin pituudesta
 * (js/livia.js lukuaika, 78 ms/merkki). Generoitu puhe ei kuitenkaan
 * ole tasatahtista: Dr. Vonin ajossa 7.9.2026 kymmenen repliikkiä
 * 85:stä puhui kuplaansa pidempään (esim. 7,37 s puhetta 5,38 s
 * kuplassa), ja koska seuraava kupla häivyttää edellisen äänitteen
 * pois (pysaytaLivianAani), lause katkesi kesken.
 *
 * Nyt ajastin on `max(lukuaika, äänitteen kesto + LIVIAN_PUHEEN_HANTA_MS)`.
 * Kesto luetaan siitä samasta `<audio>`-elementistä, joka soi — ei
 * manifestista eikä uudesta verkkohausta: peli ei lue manifestia
 * lainkaan, ja `duration` on selaimella jo valmiina heti metatietojen
 * saavuttua (loadedmetadata).
 *
 * EI ÄÄNITETTÄ, EI MUUTOSTA. Puuttuva tiedosto, mykistys tai vielä
 * tuntematon kesto antaa `null`-keston, ja kuplan aika on tasan se
 * mikä ennenkin. Napautus jatkaa yhä heti (kutsupaikan `kuittaus`),
 * ja se häivyttää äänen kuten tähänkin asti.
 */

/** Hengähdys puheen lopun ja seuraavan kuplan välissä. */
export const LIVIAN_PUHEEN_HANTA_MS = 400;

/**
 * Äänitteen kesto MILLISEKUNTEINA — tai null, jos sitä ei tiedetä.
 *
 * `duration` on NaN ennen metatietoja, Infinity virrassa ja 0 puretulla
 * soittimella (pysaytaLivianAani poistaa srcin); kaikissa niissä
 * vastaus on "ei tietoa", jolloin kupla pitää entisen aikansa.
 *
 * @param {HTMLAudioElement|{duration:number}|null} audio
 * @returns {number|null}
 */
export function livianAanenKesto(audio) {
  const kesto = Number(audio?.duration);
  return Number.isFinite(kesto) && kesto > 0 ? Math.round(kesto * 1000) : null;
}

/**
 * KUPLAN NÄKYVÄ AIKA: lukuaika tai puheen mitta, kumpi on pidempi.
 *
 * @param {number} perusaika kuplan lukuaika millisekunteina
 *   (js/livia.js livianKuplanLukuaika)
 * @param {HTMLAudioElement|(() => HTMLAudioElement|null)|null} audio
 *   soiva äänite — tai funktio, joka kertoo sen vasta kutsuhetkellä
 *   (silloin kahvaa ei tarvitse kuljettaa kutsupaikan läpi).
 * @returns {number} millisekunteina
 */
export function livianKuplanAika(perusaika, audio) {
  const kahva = typeof audio === 'function' ? audio() : audio;
  const kesto = livianAanenKesto(kahva);
  if (kesto === null) return perusaika;
  return Math.max(perusaika, kesto + LIVIAN_PUHEEN_HANTA_MS);
}

/**
 * KUPLASARJAN AJASTIN, JOKA VENYY PUHEEN MITTAAN.
 *
 * Kesto ei ole tiedossa silloin kun kupla ilmestyy — `new Audio(url)`
 * on juuri luotu eikä metatietoja ole vielä haettu — joten aikaa ei
 * voi laskea kerralla valmiiksi. Ajastin herää siis ensin kuplan
 * LUKUAJAN kohdalla, kysyy vasta silloin äänitteen keston (metatiedot
 * ovat ehtineet tulla kauan sitten: lyhinkin lukuaika on 3,2 s) ja
 * odottaa tarvittaessa loput.
 *
 * Kahva on tavallinen setTimeout-tunnus, joten kutsupaikkojen
 * `clearTimeout` peruu sarjan täsmälleen kuten ennen. Koska tunnus
 * vaihtuu jatkoajastimen myötä, kutsupaikka antaa `aseta`-funktion,
 * joka päivittää oman muuttujansa.
 *
 * @param {number} perusaika kuplan lukuaika millisekunteina
 * @param {HTMLAudioElement|(() => HTMLAudioElement|null)|null} audio
 * @param {() => void} jatka mitä tehdään ajan kuluttua
 * @param {((id:number) => void)|null} [aseta] kahvan päivitys
 * @returns {number} ajastimen kahva
 */
export function livianKuplanAjastin(perusaika, audio, jatka, aseta = null) {
  const kaynnista = (ms, kutsu) => {
    const id = setTimeout(kutsu, Math.max(0, ms));
    aseta?.(id);
    return id;
  };
  return kaynnista(perusaika, () => {
    const jaljella = livianKuplanAika(perusaika, audio) - perusaika;
    if (jaljella > 0) {
      kaynnista(jaljella, jatka);
      return;
    }
    jatka();
  });
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

/**
 * LINSSIN VÄLIHUOMION ÄÄNI JAKSON TUNNUKSELLA (js/linssit/
 * ihmisen-matka-esitys.js).
 *
 * Kutsupaikka sanoo linssin ja jakson — "ihmisen-matka, denisova" —
 * eikä numeroa: numeron omistaa LIVIAN_LINSSILAHTEET. Jakso, jota ei
 * ole taulussa, on hiljainen ilman että kutsupaikan tarvitsee tietää
 * siitä mitään.
 *
 * VÄLIHUOMIO EI VÄISTÄ eikä huuda: oletuksena sama vaimennus ja sama
 * `vaista: false` kuin fokusvirran huudahduksella (js/fokusvirta.js
 * HUUDAHDUKSEN_VAIMENNUS) — kertoja jatkaa entisellä voimallaan.
 *
 * @param {object} ui pelin käyttöliittymä
 * @param {string} linssi linssin tunnus
 * @param {string} jakso kertomusjakson tunnus
 * @param {object} [asetukset]
 * @param {string|null} [asetukset.teksti] kuplan teksti tiivisteportille
 * @param {number} [asetukset.vaimennus] voimakkuuden kerroin
 * @param {boolean} [asetukset.vaista] väistääkö tausta
 * @returns {HTMLAudioElement|null} soittimen kahva tai null
 */
export function soitaLivianLinssiAani(ui, linssi, jakso,
  { teksti = null, vaimennus = LIVIAN_VALIHUOMION_VAIMENNUS, vaista = false } = {}) {
  const indeksi = livianLinssiIndeksi(linssi, jakso);
  if (indeksi === null) return null;
  return soitaLivianAani(ui, linssi, indeksi, { teksti, vaimennus, vaista });
}
