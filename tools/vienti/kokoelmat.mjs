/*
 * KOKOELMAKERROS: pelin sisältö tyypitettyinä entiteetteinä.
 *
 * Raakakerros (moduulit/*.json) on häviötön mutta pelin sisäisessä
 * muodossa: kaupungin maa on eri taulussa kuin kaupunki, kysymykset ovat
 * olio kaupunki-id → taulukko, koordinaatit laudan Miller-yksiköissä.
 * Kokoelma kokoaa yhden entiteettilajin yhdeksi taulukoksi, jonka jokaisella
 * alkiolla on oma `id` ja viittaukset muihin kokoelmiin id:nä. Moottorin
 * tuoja lukee tästä; epäselvässä kohdassa raakakerros on totuus.
 *
 * Periaatteet:
 *   - alkuperäiset kentät säilyvät nimineen (`data`), johdetut kentät
 *     (id, viittaukset, lat/lon) ovat päätasolla — nimeämällä uudelleen
 *     menetettäisiin jotain, ja tuoja voi aina palata lähteeseen.
 *   - jokaisella kokoelmalla on `lahde` (moduuli#export.polku) ja
 *     `viittaukset` (kenttä → kohdekokoelma), jotta tuoja voi rakentaa
 *     id-indeksit ja testi voi tarkistaa, ettei viittaus osoita tyhjään.
 *   - alkiot kulkevat sarjallista()-muunnoksen läpi, joten funktiot ja
 *     Mapit näkyvät samoina $-merkintöinä kuin raakakerroksessa.
 */
import { sarjallista } from './sarjallista.mjs';
import { laudaltaAsteiksi } from '../../js/fokusmitat.js';
import { ISO2 } from './iso2.mjs';
import { POISTETUT_SAANNOT } from './lahteet.mjs';
import { PAAKAUPUNGIT } from './paakaupungit.mjs';
import { lueKorkeudet } from './korkeudet.mjs';
import { maarajaRivit, MAARAJOJEN_TOLERANSSI } from './maarajat.mjs';
import { lueMaakuntarajat, MAAKUNTARAJOJEN_TOLERANSSI } from './maakuntarajat.mjs';
import { MAAILMANKARTAN_NIMET } from '../../js/packs/maailmankartta-nimet.js';
import { ratkaiseMedia, sivustoReitit } from './media.mjs';
import { aaniUrl, horatioAanenKesto, musaPolku } from '../../js/media.js';
import { aikaleimojenOsoite, ratkaiseAnkkurit, AIKALEIMOJEN_VERSIO } from '../../js/luentareaktiot.js';
import { livianEleidenOsoite } from '../../js/livia-puheeleet-lataus.js';
import { livianPuheeleenTiedot, livianLuentareaktionTiedot } from '../../js/livia-tilanteet.js';
import { repliikit as livianRepliikit } from '../generoi-pulu.mjs';
import { lueLivianEleet, eleidenTila } from './livian-eleet.mjs';
import { lueRadiotarkistus } from './radiotarkistus.mjs';
import { rikastaLehdet } from './lehdet.mjs';
import { karttavaloKokoelma, rikastaKohdekartat, takynostoKokoelma } from './karttavalot.mjs';
import { saapumisKokoelmat } from './saapumiset.mjs';
import { tyypitaLoput } from './tyypitys.mjs';
import { kohtaamiskuvaKohteelle, kohtaamiskuvaTavalliselleKohtaamiselle } from '../../js/kohtaamiskuvat-data.js';
import {
  LINSSILUENTA_JUURI, luennanRunko, luennanOsoite, kaarenPuheet, puheenTiiviste,
} from '../../js/linssipuhe.js';
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync } from 'node:fs';
import { existsSync } from 'node:fs';
import { lueMuutosloki, jarjesta as jarjestaMuutosloki } from './muutosloki-natiivi.mjs';

const LAUTA = 'js/packs/maailmankartta.js';

function taulukko(lahde, kuvaus, viittaukset, alkiot) {
  return { lahde, kuvaus, viittaukset, alkiot: alkiot.map((a) => sarjallista(a)) };
}

/*
 * Skeema 1.2: kaupungin tärkeys 0–3 nimiöiden harvennukseen (3D-selvittäjä
 * 23.9.2026). Reittimäärä = kaupungin päät laudan edges + airRoutes
 * -taulukoissa; jakauma 266 kaupungilla: mediaani 3, q90 7.
 *   3  pääkaupunki (tools/vienti/paakaupungit.mjs) tai aloituskaupunki
 *   2  lentokenttä tai vähintään 6 reittiä
 *   1  vähintään 4 reittiä
 *   0  muut
 */
export function tarkeys(c, reitteja, onPaakaupunki) {
  if (onPaakaupunki || c.start) return 3;
  if (c.airport || reitteja >= 6) return 2;
  if (reitteja >= 4) return 1;
  return 0;
}

function lautaKokoelmat(ns) {
  const P = ns.MAAILMANKARTTA;
  const pallo = ns.PALLON_KAUPUNKIPISTEET ?? {};
  const saaret = new Set(P.islands);
  const korkeudet = lueKorkeudet().kaupungit ?? {};
  const reitteja = new Map();
  for (const e of [...P.edges, ...P.airRoutes]) {
    for (const id of [e.a, e.b]) reitteja.set(id, (reitteja.get(id) ?? 0) + 1);
  }
  const kaupungit = P.cities.map((c) => {
    const tarkka = c.pallo ?? pallo[c.id];
    const arvio = tarkka ? null : laudaltaAsteiksi('maailmankartta', c.x, c.y);
    const asteet = tarkka ?? arvio;
    const maa = P.map.cityCountry?.[c.id] ?? null;
    return {
      id: c.id,
      nimi: c.name,
      maa,
      // Skeema 1.1: natiivi 3D-proto lukee maan ISO2-koodina ja
      // harventaa nimiä tyypin mukaan (3D-selvittäjä 23.9.2026).
      maa2: maa ? ISO2[maa] ?? null : null,
      manner: P.map.cityManner?.[c.id] ?? null,
      lat: asteet ? Math.round(asteet.lat * 1e4) / 1e4 : null,
      lon: asteet ? Math.round(asteet.lon * 1e4) / 1e4 : null,
      sijaintiLahde: tarkka ? 'pallopiste' : 'laudalta-laskettu',
      saari: saaret.has(c.id),
      lentokentta: Boolean(c.airport),
      aloitus: Boolean(c.start),
      tyyppi: c.ambience ?? null,
      tarkeys: tarkeys(c, reitteja.get(c.id) ?? 0, Boolean(maa) && PAAKAUPUNGIT[maa] === c.id),
      // Skeema 1.5 (3D-selvittäjä 23.9.2026): natiivin reittigeometria
      // lasketaan verkkopelin kaavalla laudan pisteistä, jotta viiva osuu
      // laattoihin. Laudan Miller-yksiköt (maailmankartta).
      lauta: { x: c.x, y: c.y },
      // Skeema 1.10 (Natiiviseppä): korkeus m EGM2008, 10 m tarkkuus,
      // Copernicus GLO-30 (tools/vienti/korkeudet.mjs); null = ei ruutua.
      korkeus: korkeudet[c.id] ?? null,
      data: c,
    };
  });
  const reitit = [
    // Skeema 1.5: askelia (laudan steps) ja via (taitepisteet laudan
    // Miller-yksiköissä, [[x, y], …]; tyhjä = suora) päätasolla.
    ...P.edges.map((e, i) => ({
      id: `reitti:${i}`, laji: e.type ?? 'maa', a: e.a, b: e.b, askelia: e.steps ?? null, via: e.via ?? [], data: e,
    })),
    ...P.airRoutes.map((e, i) => ({ id: `lento:${i}`, laji: 'lento', a: e.a, b: e.b, askelia: null, via: [], data: e })),
  ];
  const kysymykset = [];
  for (const [ryhma, lista] of Object.entries(P.questions)) {
    lista.forEach((q, i) => {
      const onKaupunki = P.cities.some((c) => c.id === ryhma);
      kysymykset.push({
        id: `${ryhma}:${i}`, ryhma, kaupunki: onKaupunki ? ryhma : null, data: q,
      });
    });
  }
  const paikkatiedot = [];
  for (const [kaupunki, lista] of Object.entries(P.placeFacts)) {
    lista.forEach((f, i) => paikkatiedot.push({ id: `${kaupunki}:${i}`, kaupunki, data: f }));
  }
  return {
    kaupungit: taulukko(`${LAUTA}#MAAILMANKARTTA.cities`,
      'Pelilaudan kaupungit. lat/lon: pallopiste jos on, muuten laudan Miller-koordinaateista laskettu. maa = ISO3, maa2 = ISO2 (tools/vienti/iso2.mjs). tyyppi = laudan ambience, lentokentta ja aloitus laudan liput. tarkeys 0–3 nimiöiden harvennukseen (3 = pääkaupunki tai aloitus). lauta = { x, y } laudan Miller-yksiköissä (reittigeometriaan). data = laudan raakaolio (x, y, la, lx, ly…), johon natiivi ei nojaa.',
      {}, kaupungit),
    reitit: taulukko(`${LAUTA}#MAAILMANKARTTA.edges+airRoutes`,
      'Kaupunkien väliset yhteydet: laji maa | sea (meri) | lento. askelia = laudan steps (lennolla null), via = taitepisteet laudan Miller-yksiköissä [[x, y], …] (tyhjä = suora viiva).',
      { a: 'kaupungit', b: 'kaupungit' }, reitit),
    kysymykset: taulukko(`${LAUTA}#MAAILMANKARTTA.questions`,
      'Visakysymykset. ryhma = kaupunki-id tai yleinen ryhmä (general, claims).',
      { kaupunki: 'kaupungit' }, kysymykset),
    paikkatiedot: taulukko(`${LAUTA}#MAAILMANKARTTA.placeFacts`,
      'Kaupunkien paikkatiedot (merkkijono tai { text, voice, source, wiki }).',
      { kaupunki: 'kaupungit' }, paikkatiedot),
    // Skeema 1.5 (Pelikoodarin pyyntö 23.9.2026): natiivin laattojen jako
    // lukee tämän eikä koko 1,6 Mt:n laudan raakamoduulia.
    laatat: taulukko(`${LAUTA}#MAAILMANKARTTA.tokens`,
      'Aarrelaatat sellaisenaan yhtenä alkiona: data = { types, mannerTypes, counts } '
        + '(laattatyypit, mantereiden omat tyypit, määrät laudalla).',
      // Skeema 1.14: ryöstäjä (robber) pois, natiivissa ei rosvoa.
      {}, [{ id: 'tokens', data: { ...P.tokens,
        types: Object.fromEntries(Object.entries(P.tokens.types).filter(([t]) => t !== 'robber')) } }]),
    // Tapahtumakortit (Fablen kaanonipäätös 23.9.2026): tuodaan sellaisenaan
    // AFRICA.events-taulusta; maailmankartalla niitä ei ole, natiivi tekee
    // mekanismin yleisenä (effect.kind raha | kyyti | viive).
    tapahtumat: taulukko('js/packs/africa.js#AFRICA.events',
      'Tapahtumakortit (vain Afrikan laudalla; maailmankartalla ei tapahtumia). effect.kind: raha '
        + '(amount, kukkaro ei mene miinukselle), kyyti (ilmainen siirto rideTarget-kaupunkiin), viive '
        + '(yksi ylimääräinen vuoro paikallaan).',
      {}, (ns.AFRICA_EVENTS ?? []).map((e, i) => ({ id: `afrikka:${i}`, lauta: 'africa', data: e }))),
    pulmat: taulukko(`${LAUTA}#MAAILMANKARTTA.puzzles`,
      'Kaupunkipulmat. generaattori = arvontalogiikan tunniste (js/pulmageneraattorit.js); natiivi toteuttaa saman tunnisteen.',
      { kaupunki: 'kaupungit' }, P.puzzles.map((p) => ({ id: p.id, kaupunki: p.city, data: p }))),
  };
}

// Kaupungin suomenkielinen nimi → id samalla normalisoinnilla kuin
// kohtaamiskuvissa (js/kohtaamiskuvat-data.js: NFD, pienet, a-z0-9).
const normalisoi = (t) => String(t).normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .toLowerCase().replace(/[^a-z0-9]/g, '');

/*
 * Sisältökokoelmat. Kolme lähdemuotoa toistuu:
 *   avaimittain  { avain: olio }            → yksi alkio per avain
 *   ryhmittain   { avain: [olio, ...] }     → alkio per olio, id olion omasta id:stä
 *   sisakkain    { avain: { nimi: arvo } }  → alkio per nimi, id "avain:nimi"
 * Avain on joko kaupunki-id tai ISO3-maakoodi; viittaus kaupunkiin
 * annetaan vain, kun avain on laudan kaupunki.
 */
function sisaltoKokoelmat(hae, kaupunkiIdt) {
  const kaupunkiTaiNull = (k) => (kaupunkiIdt.has(k) ? k : null);
  const avaimittain = (lahde, arvo, kuvaus, avainOn) => taulukko(lahde, kuvaus,
    avainOn === 'kaupunki' ? { kaupunki: 'kaupungit' } : {},
    Object.entries(arvo).map(([k, v]) => ({
      id: k, ...(avainOn === 'kaupunki' ? { kaupunki: kaupunkiTaiNull(k) } : { maa: k }), data: v,
    })));
  const ryhmittain = (lahde, arvo, kuvaus, avainOn) => taulukko(lahde, kuvaus,
    avainOn === 'kaupunki' ? { kaupunki: 'kaupungit' } : {},
    Object.entries(arvo).flatMap(([k, lista]) => lista.map((v, i) => ({
      id: v.id ?? `${k}:${i}`, ...(avainOn === 'kaupunki' ? { kaupunki: kaupunkiTaiNull(k) } : { maa: k }), data: v,
    }))));
  const sisakkain = (lahde, arvo, kuvaus) => taulukko(lahde, kuvaus, { kaupunki: 'kaupungit' },
    Object.entries(arvo).flatMap(([k, olio]) => Object.entries(olio).map(([nimi, v]) => ({
      id: `${k}:${nimi}`, kaupunki: kaupunkiTaiNull(k), nimi, data: v,
    }))));

  const P = 'js/packs/';
  const hetket = hae(`${P}historian-hetket.js`).HISTORIAN_HETKET;
  const kohtaamiskuvat = hae('js/kohtaamiskuvat-data.js');
  const kaupunkiNimella = new Map([...kaupunkiIdt].map((id) => [normalisoi(id), id]));
  return {
    kaupunkilehdet: avaimittain(`${P}kulttuuri-kategoriat.js#KULTTUURI_KATEGORIAT`,
      hae(`${P}kulttuuri-kategoriat.js`).KULTTUURI_KATEGORIAT,
      'Kaupunkilehden aiheosastot kaupungeittain (kansikuvat, nostot, lähteet).', 'kaupunki'),
    maalehdet: avaimittain(`${P}maa-kategoriat.js#MAA_KATEGORIAT`, hae(`${P}maa-kategoriat.js`).MAA_KATEGORIAT,
      'Maalehden aiheosastot maittain (ISO3).', 'maa'),
    nahtavyydet: sisakkain(`${P}nahtavyysjutut.js#NAHTAVYYSJUTUT`, hae(`${P}nahtavyysjutut.js`).NAHTAVYYSJUTUT,
      'Nähtävyysjutut kaupungeittain; nimi = nähtävyyden nimi.'),
    miniatyyrit: sisakkain(`${P}miniatyyrit.js#MINIATYYRIT`, hae(`${P}miniatyyrit.js`).MINIATYYRIT,
      'Pienoismallit kaupungeittain: nähtävyyden nimi → kuvan polku tai tunnus (media.json, asset-miniatyyrit).'),
    skandaalit: ryhmittain(`${P}skandaalit.js#SKANDAALIT`, hae(`${P}skandaalit.js`).SKANDAALIT,
      'Skandaalit maittain (ISO3), sijainti lat/lon datassa.', 'maa'),
    monumentit: ryhmittain(`${P}monumentit-eurooppa.js#EUROOPAN_KADONNEET`,
      hae(`${P}monumentit-eurooppa.js`).EUROOPAN_KADONNEET, 'Euroopan kadonneet monumentit maittain (ISO3).', 'maa'),
    historianHetket: taulukko(`${P}historian-hetket.js#HISTORIAN_HETKET`,
      'Historian hetket; maa = iso (ISO3), sijainti lat/lon, kuvat hetkikuva-lajina media.json:ssa.', {},
      hetket.map((h) => ({ id: h.id, maa: h.iso ?? null, data: h }))),
    elaintayt: avaimittain(`${P}elaintakyt.js#ELAINTAKYT`, hae(`${P}elaintakyt.js`).ELAINTAKYT,
      'Eläintäyt maittain (ISO3).', 'maa'),
    paikallisaarteet: avaimittain(`${P}paikallisaarteet.js#PAIKALLISAARTEET`,
      hae(`${P}paikallisaarteet.js`).PAIKALLISAARTEET, 'Maakohtaiset pienet ja isot aarteet (ISO3).', 'maa'),
    julisteet: avaimittain(`${P}julisteet.js#JULISTEET`, hae(`${P}julisteet.js`).JULISTEET,
      'Oman painon julisteet; avain on kaupunki-id tai kaupungin alikohde.', 'kaupunki'),
    kohtaamiset: avaimittain(`${P}kohtaamiset.js#KOHTAAMISET`, hae(`${P}kohtaamiset.js`).KOHTAAMISET,
      'Kaupunkien kohtaamiset (hahmo, tervehdys, kysymykset).', 'kaupunki'),
    kohtaamiskuvat: taulukko('js/kohtaamiskuvat-data.js#kohtaamiskuvat',
      'Kohtaamiskorttien kasvokuvat. kaupunki = kohde tai normalisoitu kaupungin nimi; url valmiina.',
      { kaupunki: 'kaupungit' },
      kohtaamiskuvat.kohtaamiskuvat.map((k) => ({
        id: k.id,
        kaupunki: kaupunkiTaiNull(k.kohde ?? kaupunkiNimella.get(normalisoi(k.kaupunki)) ?? ''),
        url: `${kohtaamiskuvat.KOHTAAMIS_R2_JUURI}/${k.kansio ? `${k.kansio}/` : ''}${k.tiedosto}`,
        data: k,
      }))),
    tarinakaari: avaimittain(`${P}tarinakaari.js#TARINAKAARI`, hae(`${P}tarinakaari.js`).TARINAKAARI,
      'Tarinakaaren kohteet (luennalliset). Koko 69 kohteen lähde: js/tyohuone-kehitys-data.js#KAARI_PAKETIT raakakerroksessa.',
      'kaupunki'),
    saapumispuheet: avaimittain(`${P}saapumispuheet.js#SAAPUMISPUHEET`, hae(`${P}saapumispuheet.js`).SAAPUMISPUHEET,
      'Saapumispuheet kaupungeittain; url = valmis ääni ämpärissä.', 'kaupunki'),
    fokusvirrat: avaimittain(`${P}fokusvirrat.js#FOKUSVIRRAT`, hae(`${P}fokusvirrat.js`).FOKUSVIRRAT,
      'Kaupunkien fokusvirrat (Livian repliikit, täkynostot, kuvat).', 'kaupunki'),
  };
}

/*
 * SÄÄNNÖT JA SAAPUMINEN (skeema 1.4, sisältöpaketin osa 2 erä A).
 *
 * Natiivi porttaa matkustuksen ja saapumisen ensin (Fable 23.9.2026).
 * Sen luvut ja kaupunkikohtaiset haut ovat webissä koodia:
 *   - saannot: js/rules.js:n, js/game.js:n ja js/tokens.js:n
 *     sääntöarvot (hinnat, aloitusraha, vuoron tunnit, XP, aarteiden
 *     arvovälit, botin taito; onSaantoArvo).
 *     Kootaan nimiavaruudesta automaattisesti, joten uusi vakio tulee
 *     mukaan ilman muutosta tähän.
 *   - saapuminen: rivi per laudan kaupunki, jossa pelin saapumishakujen
 *     tulokset valmiiksi laskettuina (fokusvirtaKaupungille,
 *     kaupunginJuliste, luentakuvallisetKaupungit, radioMaalle,
 *     vanhaTallenne, paikallisaarre, hetketMaassa). Haku ajetaan pelin
 *     omilla funktioilla, joten taulu ei voi erkaantua pelistä, eikä
 *     natiivin tarvitse toistaa varasääntöjä (esim. vanha tallenne:
 *     kaupungin oma, muuten maan).
 */
const SAANTOMODUULIT = ['js/rules.js', 'js/game.js', 'js/tokens.js'];

/*
 * Sääntöarvo = luku, teksti, totuusarvo tai litteä rakenne niistä
 * (taulukko tai olio, jonka arvot ovat primitiivejä: PIENI_AARRE_ARVO
 * { min, max }, FORM_WEIGHTS). Sisäkkäiset rakenteet (TOKEN_TYPES,
 * ASKERS) ovat sisältöä ja kulkevat raakakerroksessa.
 */
const PRIMITIIVI = ['number', 'string', 'boolean'];
export function onSaantoArvo(arvo) {
  if (PRIMITIIVI.includes(typeof arvo)) return true;
  if (Array.isArray(arvo)) return arvo.every((a) => PRIMITIIVI.includes(typeof a));
  if (arvo && Object.getPrototypeOf(arvo) === Object.prototype) {
    return Object.values(arvo).every((a) => PRIMITIIVI.includes(typeof a));
  }
  return false;
}

function saantoKokoelma(hae) {
  const alkiot = [];
  const nahdyt = new Set();
  for (const moduuli of SAANTOMODUULIT) {
    for (const [nimi, arvo] of Object.entries(hae(moduuli)).sort(([a], [b]) => (a < b ? -1 : 1))) {
      if (!onSaantoArvo(arvo) || POISTETUT_SAANNOT.has(nimi)) continue;
      // game.js vie rules.js:n hinnat edelleen; alkuperäinen moduuli voittaa.
      if (nahdyt.has(nimi)) continue;
      nahdyt.add(nimi);
      alkiot.push({ id: nimi, moduuli, arvo });
    }
  }
  return taulukko(SAANTOMODUULIT.join('+'),
    'Pelin sääntövakiot: matkustuksen hinnat (SEA_FEE laiva, FLIGHT_PRICE lento, BUS_FARE bussi), '
      + 'aloitusraha, vuoron tunnit, palkkiot, XP, aarteiden arvovälit (PIENI_AARRE_ARVO, ISO_AARRE_ARVO: min–max, 10 punnan askel). id = vakion nimi koodissa. SEA_FARE (game.js) '
      + 'on SEA_FEE:n vanha kaksoiskappale.',
    {}, alkiot);
}

function saapumisKokoelma(ns, hae) {
  const P = ns.MAAILMANKARTTA;
  const P_ = 'js/packs/';
  const { fokusvirtaKaupungille, luentakuvallisetKaupungit } = hae(`${P_}fokusvirrat.js`);
  const { kaupunginJuliste } = hae(`${P_}julisteet.js`);
  const { radioMaalle } = hae(`${P_}radiot.js`);
  const { vanhaTallenne } = hae(`${P_}vanhat-aanet.js`);
  const { PAIKALLISAARTEET } = hae(`${P_}paikallisaarteet.js`);
  const { paikallisaarre } = hae(`${P_}paikallisaarteet.js`);
  const { hetketMaassa } = hae(`${P_}historian-hetket.js`);
  const { KULTTUURI_KATEGORIAT } = hae(`${P_}kulttuuri-kategoriat.js`);
  const { SAAPUMISPUHEET } = hae(`${P_}saapumispuheet.js`);
  const { KOHTAAMISET } = hae(`${P_}kohtaamiset.js`);
  const luentakuvalliset = luentakuvallisetKaupungit();
  const oma = (taulu, id) => (Object.hasOwn(taulu, id) ? id : null);
  return taulukko(`${LAUTA}#MAAILMANKARTTA.cities + saapumishaut`,
    'Saapumisen haut kaupungeittain valmiiksi laskettuina pelin omilla funktioilla. '
      + 'Viittaukset ovat id:itä muihin kokoelmiin (null = ei sisältöä); radio ja vanhaTallenne '
      + 'ovat arvoja sellaisenaan (vanhaTallenne: kaupungin oma, muuten maan).',
    {
      kaupunki: 'kaupungit', fokusvirta: 'fokusvirrat', juliste: 'julisteet', kaupunkilehti: 'kaupunkilehdet',
      saapumispuhe: 'saapumispuheet', kohtaaminen: 'kohtaamiset', paikallisaarteet: 'paikallisaarteet',
      historianHetket: 'historianHetket',
    },
    P.cities.map((c) => {
      const maa = P.map.cityCountry?.[c.id] ?? null;
      const onAarteita = maa && (paikallisaarre('pieniAarre', maa) || paikallisaarre('isoAarre', maa));
      return {
        id: c.id,
        kaupunki: c.id,
        maa,
        fokusvirta: fokusvirtaKaupungille(c.id) ? c.id : null,
        luentakuva: luentakuvalliset.has(c.id),
        juliste: kaupunginJuliste(c.id) ? c.id : null,
        kaupunkilehti: oma(KULTTUURI_KATEGORIAT, c.id),
        saapumispuhe: oma(SAAPUMISPUHEET, c.id),
        kohtaaminen: oma(KOHTAAMISET, c.id),
        paikallisaarteet: onAarteita && Object.hasOwn(PAIKALLISAARTEET, maa) ? maa : null,
        historianHetket: maa ? hetketMaassa(maa).map((h) => h.id) : [],
        radio: radioMaalle(maa),
        vanhaTallenne: vanhaTallenne(c.id, maa),
      };
    }));
}

/*
 * ESILASKETUT (skeema 1.5, osa 2 erä B): apufunktioiden tulokset, joita
 * natiivi tarvitsee mutta joita ei saa suoraan datasta (poikkeustaulu on
 * moduulin sisäinen tai tulos yhdistää kenttiä). Vienti ajaa pelin oman
 * funktion jokaiselle arvolle; tools/vienti/logiikka.mjs kertoo, mikä
 * funktio kirjoittaa minkäkin funktio-kentän.
 */
function esilaskettuKokoelma(ns, hae) {
  const P_ = 'js/packs/';
  const rivit = [];
  const lisaa = (funktio, avain, arvo) => rivit.push({ id: `${funktio}:${avain}`, funktio, avain, arvo });
  const { HISTORIAN_HETKET, hetkenKuvat } = hae(`${P_}historian-hetket.js`);
  for (const h of HISTORIAN_HETKET) lisaa('hetkenKuvat', h.id, hetkenKuvat(h));
  const { ELAINTAKYT, elaintakynKuvat } = hae(`${P_}elaintakyt.js`);
  for (const iso of Object.keys(ELAINTAKYT)) lisaa('elaintakynKuvat', iso, elaintakynKuvat(ELAINTAKYT[iso]));
  const { maanGenetiivi } = hae(`${P_}maa-kategoriat.js`);
  const maat = [...new Set(Object.values(ns.MAAILMANKARTTA.map.countryShapes).map((m) => m.nimi).filter(Boolean))].sort();
  for (const nimi of maat) lisaa('maanGenetiivi', nimi, maanGenetiivi(nimi));
  for (const linssi of ['topografia', 'vesistot']) {
    lisaa('linssiSelite', linssi, hae(`js/linssit/${linssi}.js`).LINSSI.selite());
  }
  const piirrettavat = ns.MAAILMANKARTTA.puzzles.map((p) => p.id).filter((id) => (
    hae(`${P_}africa-puzzles.js`).onAfrikanPulma(id) || hae(`${P_}europe-puzzles.js`).onEuroopanPulma(id)));
  lisaa('pulmapiirrokset', 'kaikki', piirrettavat);
  return taulukko('tools/vienti/logiikka.mjs (esilaskettu)',
    'Apufunktioiden tulokset valmiiksi laskettuina pelin omilla funktioilla. funktio = pelin funktio '
      + '(hetkenKuvat, elaintakynKuvat, maanGenetiivi, linssiSelite = LINSSI.selite(), pulmapiirrokset = '
      + 'pulmat, joille onAfrikanPulma/onEuroopanPulma), avain = sen argumentti, arvo = tulos.',
    {}, rivit);
}

/*
 * LINSSIAINEISTO (skeema 1.7, Linssisepän tarve 23.9.2026): natiivin
 * linssien tarvitsema data, joka ei ole linssien LINSSI-olioissa.
 * Reliefikuvia ja topografian tarkennusta ei viedä: natiivi käyttää
 * Karttasepän reliefipyramidia (Linssiseppä 23.9.2026).
 */
// Natiivin avauskynnykset (Fable 23.9.2026 Linssisepän kautta). Web avaa
// kynnyksillä rekisterin järjestyksessä ensimmäisen omistamattoman
// mantereettoman linssin (js/linssit/omistus.js), jolloin järjestys on
// ihmisen matka, keksinnöt, radio, satelliitti.
const NATIIVIN_AVAUSKYNNYKSET = [
  { linssi: 'ihmisen-matka', tp: 400 },
  { linssi: 'keksinnot', tp: 800 },
  { linssi: 'topografia', tp: 1400 },
  { linssi: 'satelliitti', tp: 2200 },
];

function linssiKokoelma(hae) {
  const L = 'js/linssit/';
  const { MAAMASKI } = hae(`${L}ihmisen-matka-maamaski.js`);
  const { RANTAMASKI } = hae(`${L}ihmisen-matka-rantamaski.js`);
  const { MAISEMAJUURI } = hae(`${L}ihmisen-matka-aanimaisema.js`);
  const { KERTOMUS_MANIFESTI } = hae(`${L}ihmisen-matka-luenta.js`);
  const { IHMISEN_MATKA_KUVAJUURI } = hae(`${L}ihmisen-matka-data.js`);
  const pilvet = hae(`${L}astro-sumu.js`);
  const aani = hae(`${L}satelliitti-aani.js`);
  const omistus = hae(`${L}omistus.js`);
  const RIVIJUOKSUT = 'Rivijuoksut: ruudukko riveittäin pohjoisesta etelään ja lännestä itään (rivi 0 = '
    + 'pohjoisin, sarake 0 = 180°W). juoksut = base64-tavut, joissa peräkkäiset LEB128-varint-luvut ovat '
    + 'vuorotellen meren ja maan juoksujen pituuksia, meri ensin (js/aikajana-virrat-laskenta.js puraMaamaski).';
  const rivit = [
    { id: 'maamaski', linssi: 'ihmisen-matka', laji: 'maski', muoto: 'rivijuoksut',
      kuvaus: `${RIVIJUOKSUT} 0,5° ruudut. peitot = maapeitto 0–9 piirtoa varten: pareja (tavu & 15 = arvo, `
        + 'sitten varint-pituus), puraPeitto. Kulku käyttää vain juoksuja.', data: MAAMASKI },
    { id: 'rantamaski', linssi: 'ihmisen-matka', laji: 'maski', muoto: 'rivijuoksut',
      kuvaus: `${RIVIJUOKSUT} Ruudun koko = aste.`, data: RANTAMASKI },
    { id: 'aanimaisemat', linssi: 'ihmisen-matka', laji: 'manifesti',
      kuvaus: 'Äänimaisemien manifesti ämpärissä; rivin tiedosto haetaan osoitteesta juuri + tiedosto.',
      data: { juuri: MAISEMAJUURI, manifesti: `${MAISEMAJUURI}manifesti.json` } },
    { id: 'kertomus', linssi: 'ihmisen-matka', laji: 'manifesti',
      kuvaus: 'Kertomuksen luennan manifesti (jaksot ja aikaleimat) ämpärissä; äänet samassa kansiossa.',
      data: { juuri: `${IHMISEN_MATKA_KUVAJUURI}/puhe`, manifesti: `${IHMISEN_MATKA_KUVAJUURI}/puhe/${KERTOMUS_MANIFESTI}` } },
    { id: 'pilvet', linssi: 'satelliitti', laji: 'tekstuuri',
      kuvaus: 'Astronautin kameran pilvikerros (equirectangular).',
      data: { url: pilvet.PILVIEN_OSOITE, leveys: pilvet.PILVIEN_LEVEYS, korkeus: pilvet.PILVIEN_KORKEUS, lahde: pilvet.PILVIEN_LAHDE } },
    { id: 'astronautin-aanet', linssi: 'satelliitti', laji: 'aani',
      kuvaus: 'Aseman humina (aina) ja avaruusmusiikki (musiikkiKaytossa = oletus).',
      data: { humina: aani.ASTRONAUTIN_HUMINA, musiikki: aani.ASTRONAUTIN_MUSIIKKI, musiikkiKaytossa: aani.ASTRONAUTIN_MUSIIKKI_KAYTOSSA } },
    { id: 'avauskynnykset', linssi: null, laji: 'saanto',
      kuvaus: 'Natiivin linssien avaus tietäjäpisteillä (Fable 23.9.2026; radio ei natiivissa). Web avaa samoilla '
        + 'kynnyksillä järjestyksessä ihmisen matka, keksinnöt, radio, satelliitti. perus = omistettu heti; '
        + 'optikonHyvitys = puntia, jos kynnyslinssi on jo omistettu.',
      data: { kynnykset: NATIIVIN_AVAUSKYNNYKSET, webKynnykset: omistus.LINSSIKYNNYKSET,
        perus: omistus.PERUSLINSSIT, optikonHyvitys: omistus.OPTIKON_HYVITYS } },
  ];
  return taulukko('js/linssit/* (ks. rivien kuvaus)',
    'Linssien aineisto natiiville: ihmisen matkan maa- ja rantamaski, äänimaisemien ja kertomuksen manifestit, '
      + 'astronautin kameran pilvet ja äänet sekä avauskynnykset. Reliefi = Karttasepän reliefipyramidi.',
    {}, rivit);
}

/*
 * ÄÄNITAULUT (skeema 1.8, siirtosuunnitelman #2948 korjauslistan kohta 3).
 * Webin tehosteet ja ambienssit ovat Web Audio -synteesiä (js/sound.js
 * SOUNDS, AMBIENCES), jota natiivi ei aja: se saa nimet ja näytteet ja
 * tekee äänen omilla näytteillään. Musiikin ketju lasketaan pelin omalla
 * musiikkiketju()-funktiolla jokaiselle kaupungille ilman tiloja
 * (lehti ja matkalaukku menevät ketjun kärkeen, kun ne ovat auki).
 */
/*
 * RADIOT (skeema 1.16, omistajan kortti 23.9.2026: radio hybridinä
 * luokittain). Asema maittain js/packs/radiot.js RADIOT:sta ja
 * lisenssiluokka tools/vienti/radioluokat.json:sta
 * (docs/raportit/lisenssi-inventaario-20260923-liite-radiot-hybridi.md).
 * sallittu = natiivi saa soittaa urlin; linkki = vain "Avaa aseman
 * sivu" (sivu). Omistajan tarkennus 23.9.: sallittu ja epaselva soivat,
 * kielletty on linkki. Nimen saa näyttää, logoa ei ilman lupaa.
 */
const radioTyyppi = (url) => (/\.m3u8(\?|$)/i.test(url) ? 'hls' : /\.aac(\?|$)|aac/i.test(url) ? 'aac'
  : /\.mp3(\?|$)|mp3/i.test(url) ? 'mp3' : null);
function radioKokoelma(hae) {
  const { RADIOT } = hae('js/packs/radiot.js');
  const luokat = JSON.parse(readFileSync(new URL('./radioluokat.json', import.meta.url), 'utf8')).luokat;
  const korvaavat = JSON.parse(readFileSync(new URL('./radiokorvaavat.json', import.meta.url), 'utf8')).asemat;
  // iOS ATS -kättely (tools/vienti/radiotarkistus.mjs); puuttuva tulos = tarkistamatta.
  const tarkistus = lueRadiotarkistus();
  const tila = (url) => {
    const t = tarkistus.tulokset?.[url];
    return { toimii: t ? t.toimii : null, tarkistus: t ? { pvm: tarkistus.tarkistettu, virhe: t.virhe, versio: t.versio } : null };
  };
  const rivit = [];
  for (const iso of Object.keys(RADIOT).sort()) {
    const r = RADIOT[iso]; const l = luokat[iso] ?? {};
    const alkuperainen = {
      iso3: iso, nimi: r.asema, url: r.url, tyyppi: radioTyyppi(r.url), yleisradio: Boolean(r.virallinen),
      lahde: 'radio-browser', sivu: l.sivu ?? null, luokka: l.luokka ?? 'epaselva', peruste: l.peruste ?? null,
      perusteLahde: l.lahde ?? null, varaAani: null, ...tila(r.url),
    };
    const k = korvaavat[iso];
    if (!k) { rivit.push({ id: iso, jarjestys: 1, ...alkuperainen }); continue; }
    // Kielletyn yleisradion tilalle soiva asema (radio-korvaavat-asemat-20260923.md).
    // Omistaja 23.9.2026: kielletty yleisradio ei tule pakettiin lainkaan
    // (se on vain lisenssi-inventaariossa).
    rivit.push({
      id: iso, jarjestys: 1, iso3: iso, nimi: k.nimi, url: k.url, tyyppi: radioTyyppi(k.url), yleisradio: false,
      lahde: 'korvaava', sivu: k.sivu, luokka: k.luokka, peruste: k.peruste, perusteLahde: k.lahde, varaAani: null,
      kaupunki: k.kaupunki, kuvaus: k.kuvaus, ...tila(k.url),
    });
  }
  return taulukko('js/packs/radiot.js#RADIOT + tools/vienti/radioluokat.json + tools/vienti/radiokorvaavat.json',
    'Suorat radiolähetykset maittain. Omistajan linjaus 23.9.2026: luokat sallittu ja epaselva SOIVAT '
      + 'natiivissa (url); kielletty näytetään vain nimenä ja "Avaa aseman sivu" -linkkinä (sivu), ei soittoa. '
      + 'Yksi soiva asema per maa (jarjestys 1); 17 maassa kielletyn yleisradion tilalla on korvaava asema (lahde '
      + 'korvaava). Kielletyt asemat eivät ole paketissa (docs/raportit/lisenssi-inventaario-20260923.md). sivu voi olla null. '
      + 'Logoja ei näytetä ilman aseman lupaa. tyyppi päätelty osoitteesta (mp3 | aac | hls | null). toimii = iOS ATS '
      + '-kättely onnistui (TLS 1.3 tai TLS 1.2 + ECDHE; false = älä soita, null = tarkistamatta), tarkistus = { pvm, virhe, versio }.',
    { iso3: 'maat' }, rivit);
}

function maisemakorit(P, hae) {
  const { kaupunkiKori, maaKori, tyyppiKori } = hae('js/aani-ehdokkaat.js');
  const { VAKIOPAIKAT } = hae('js/ambience-stream.js');
  const { JALKAMATKAN_MAISEMA } = hae('js/ui.js');
  const lauta = P.id;
  const cc = P.map.cityCountry ?? {};
  const kori = (paikka, tyyppi) => {
    const oma = kaupunkiKori(lauta, paikka);
    const maa = oma.length ? [] : maaKori(lauta, paikka, cc);
    const [porras, lista] = oma.length ? ['kaupunki', oma] : maa.length ? ['maa', maa] : ['tyyppi', tyyppi ? tyyppiKori(tyyppi, lauta) : []];
    return { id: `maisemakori:${paikka}`, laji: 'maisemakori', paikka, tyyppi: tyyppi ?? null, porras, vakio: VAKIOPAIKAT.has(paikka), kori: lista };
  };
  return [
    ...P.cities.map((c) => ({ ...kori(c.id, c.ambience ?? null), kaupunki: c.id })),
    kori('etusivu', 'lentoasema'), kori('lentomatka', 'lentokone'),
    kori('jalkamatka', JALKAMATKAN_MAISEMA), kori('merimatka', 'meri'),
  ];
}

function aaniKokoelma(ns, hae) {
  const aani = hae('js/sound.js');
  const siirtyma = hae('js/siirtymamusiikki.js');
  const valitsin = hae('js/musiikkivalitsin.js');
  const P = ns.MAAILMANKARTTA;
  // Radioerä (skeema 1.16): viritysäänet (radion haku), pelin osoitteella.
  const viritys = hae('js/packs/viritysaanet.js');
  const rivit = [
    ...viritys.VIRITYSAANET.map((a) => ({
      id: `viritys:${a.tiedosto}`, laji: 'viritys', nimi: a.tiedosto, synteesi: false,
      url: aaniUrl(viritys.viritysPolku(a)), kesto: a.kesto, kuvaus: a.kuvaus, tekija: a.tekija, lisenssi: a.lisenssi, lahde: a.lahde,
    })),
    ...aani.AANITEHOSTEET.map((nimi) => ({
      id: `tehoste:${nimi}`, laji: 'tehoste', nimi, synteesi: true, naytte: aani.REAL_SAMPLES[nimi] ?? null,
    })),
    ...Object.entries(aani.REAL_SAMPLES).filter(([n]) => !aani.AANITEHOSTEET.includes(n)).map(([nimi, n]) => ({
      id: `tehoste:${nimi}`, laji: 'tehoste', nimi, synteesi: false, naytte: n,
    })),
    ...aani.AMBIENCE_TYPES.map((nimi) => ({ id: `ambienssi:${nimi}`, laji: 'ambienssi', nimi, synteesi: true, naytte: null })),
    ...Object.entries(aani.PULUN_TEHOSTEET).map(([nimi, v]) => ({
      id: `pulu:${nimi}`, laji: 'pulu', nimi, juuri: aani.PULUN_TEHOSTEJUURI, data: v,
    })),
    ...Object.entries(siirtyma.RAIDAT).map(([nimi, v]) => ({ id: `siirtyma:${nimi}`, laji: 'siirtyma', nimi, data: v })),
    ...Object.entries(valitsin.TILARAIDAT).map(([nimi, v]) => ({ id: `tila:${nimi}`, laji: 'tilaraita', nimi, data: v })),
    ...Object.entries(valitsin.PAIKKARAIDAT).map(([nimi, v]) => ({ id: `paikka:${nimi}`, laji: 'paikkaraita', nimi, data: v })),
    { id: 'pohjaraita', laji: 'pohjaraita', nimi: valitsin.POHJARAITA },
    ...P.cities.map((c) => ({
      id: `musiikkiketju:${c.id}`, laji: 'musiikkiketju', kaupunki: c.id,
      ketju: valitsin.musiikkiketju(c.id, P.map.cityCountry?.[c.id] ?? null),
    })),
    // B7 (Pelikoodari 23.9.2026): äänimaiseman korit pelin omilla funktioilla
    // (js/ambience-stream.js arvoAani: kaupunkiKori → maaKori → tyyppiKori).
    ...maisemakorit(P, hae),
    // Tilaraidat ja aarreaiheet täysin poluin (musaPolku + aaniUrl).
    ...Object.entries(valitsin.TILARAIDAT).map(([nimi, v]) => ({
      id: `tilaraitaUrl:${nimi}`, laji: 'tilaraitaUrl', nimi, url: aaniUrl(musaPolku(v.tunnus)),
    })),
    ...Object.entries(hae('js/ui.js').AARRE_MUSIIKKI).map(([nimi, polku]) => ({
      id: `aarreaihe:${nimi}`, laji: 'aarreaihe', nimi, tunnus: polku.split('/').at(-1).replace(/(-lyria)?\.mp3$/, ''),
      url: aaniUrl(polku),
    })),
  ];
  return taulukko('js/sound.js + js/siirtymamusiikki.js + js/musiikkivalitsin.js',
    'Äänitaulut natiiville. tehoste/ambienssi: synteesi = webin Web Audio -synteesi (ei datana), naytte = '
      + 'äänite, jos sellainen on (REAL_SAMPLES; url + credit). pulu: pulun tehosteet (juuri + data). siirtyma: '
      + 'matkan musiikki lajeittain (jalan, laiva, lento). tilaraita/paikkaraita/pohjaraita: musiikin tasot. '
      + 'musiikkiketju: kaupungin raidat parhaasta alkaen (musiikkiketju()); soitin ottaa ensimmäisen olemassa '
      + 'olevan. Avoin tila (lehti, matkalaukku) menee ketjun kärkeen TILARAIDAT-järjestyksessä. maisemakori '
      + '(B7): kaupungin tai virtuaalipaikan (etusivu, lentomatka, jalkamatka, merimatka) äänimaisema = kori (url-lista '
      + '#alku/#voima-fragmentein, js/aani-ehdokkaat.js jaaAlku), porras (kaupunki | maa | tyyppi), tyyppi; vakio = true → '
      + 'soita kori[0], muuten arvo satunnaisesti. tilaraitaUrl ja aarreaihe (tavallinen = musa-aarre, paa = musa-paaaarre '
      + 'tähtilaatalle): valmiit osoitteet.',
    { kaupunki: 'kaupungit' }, rivit);
}

/*
 * KUVA- JA LIPPUKYSYMYKSET, PULMIEN AINEISTO (skeema 1.9, Pelikoodarin
 * tarve 23.9.2026). Järjestys on pelin järjestys, koska arvonta riippuu
 * siitä: kuvakysymykset laudan cities-järjestyksessä (js/ui.js
 * primePhotoPool), lippumaat countryShapes-järjestyksessä (js/game.js
 * flagTargets). url ja varat samoilla säännöillä kuin media.json
 * (tools/vienti/media.mjs ratkaiseMedia): repon kopio → Flickr → ämpäri
 * → Commons.
 */
function kysymyskuvaKokoelmat(ns, hae) {
  const P = ns.MAAILMANKARTTA;
  const { KAIKKI_VALOKUVAT, EI_VALOKUVAKYSYMYKSEEN } = hae('js/sisaltotaulut.js');
  const osoite = (tiedosto, laji) => {
    const { url, varat = [] } = ratkaiseMedia(tiedosto, laji);
    return { url, varat };
  };
  const kuvat = [];
  for (const c of P.cities) {
    if (EI_VALOKUVAKYSYMYKSEEN.has(c.id)) continue;
    const valokuva = KAIKKI_VALOKUVAT[c.id];
    // Nykykuva ensin, vanha vedos varalla (js/ui.js primePhotoPool).
    const valittu = valokuva?.uusi?.tiedosto ? valokuva.uusi : valokuva;
    if (!valittu?.tiedosto) continue;
    kuvat.push({ id: c.id, kaupunki: c.id, tiedosto: valittu.tiedosto, lahde: valittu.lahde ?? null,
      ...osoite(valittu.tiedosto, 'kuva-commons') });
  }
  const liput = Object.entries(P.map.countryShapes)
    .filter(([, maa]) => maa.lippu && maa.nimi)
    .map(([iso, maa]) => ({ id: iso, iso, nimi: maa.nimi, lippu: maa.lippu, ...osoite(maa.lippu, 'lippu-commons') }));
  const E = hae('js/packs/europe-puzzles.js');
  const A = hae('js/packs/africa-puzzles.js');
  const aineisto = [
    ['roomalaiset', 'ROMAANIT', E.ROMAANIT], ['pylvaat', 'PYLVAAT', E.PYLVAAT],
    ['pylvaat', 'PYLVASKUVAT', E.PYLVASKUVAT.map((k) => ({ ...k, ...osoite(k.tiedosto, 'kuva-commons') }))],
    ['kukko', 'SUUNNAT', E.SUUNNAT], ['kuunvaiheet', 'KUUT', A.KUUT],
    ['naksutus', 'NAKSUTUSVARIANTIT', A.NAKSUTUSVARIANTIT], ['vesileilit', 'LEILIVARIANTIT', A.LEILIVARIANTIT],
  ].map(([pulma, taulu, data]) => ({ id: `${pulma}:${taulu}`, pulma, taulu, data }));
  return {
    kuvakysymykset: taulukko(`${LAUTA}#MAAILMANKARTTA.cities + js/sisaltotaulut.js#KAIKKI_VALOKUVAT`,
      'Valokuvakysymysten kuvat laudan cities-järjestyksessä (arvonta riippuu järjestyksestä): nykykuva, '
        + 'muuten vanha vedos; EI_VALOKUVAKYSYMYKSEEN pois. url ja varat kuten media.json.',
      { kaupunki: 'kaupungit' }, kuvat),
    lippumaat: taulukko(`${LAUTA}#MAAILMANKARTTA.map.countryShapes`,
      'Lippukysymysten maat countryShapes-järjestyksessä (js/game.js flagTargets): vain maat, joilla on nimi '
        + 'ja lippu. iso = pelin maakoodi, lippu = Commons-tiedosto, url ja varat kuten media.json.',
      {}, liput),
    pulmaaineisto: taulukko('js/packs/europe-puzzles.js + js/packs/africa-puzzles.js',
      'Pulmageneraattorien ja -piirrosten lähdetaulut (pulma = generaattorin tunniste, taulu = vakion nimi '
        + 'koodissa). PYLVASKUVAT-kuvilla on url ja varat.',
      {}, aineisto),
  };
}

/*
 * LUENNAT (skeema 1.9, Pelikoodarin tarve 23.9.2026): isoisän
 * matkakirjaluennat valmiilla ääniosoitteella, ettei natiivin tarvitse
 * ladata media.json:ia repopolun ratkaisemiseen. url = pelin aaniUrl()
 * (versioitu Horatio-polku tai ?v=-versio), kesto = horatioAanenKesto().
 * Matkakirjaluennoilla ei ole luentokohtaista mykistyslistaa (mykistys on
 * pelaajan asetus), joten kaikki äänitteelliset ovat mukana.
 */
const ERIKOISLUENNAT = [
  { id: 'intro', aanite: 'assets/audio/intro-puhe.mp3', kuvaus: 'Pelin avaus' },
  { id: 'lento-alku', aanite: 'assets/audio/puhe-lento-alku.mp3', kuvaus: 'Avauslento' },
];

function luentoKokoelma(hae) {
  const { FOKUSVIRRAT } = hae('js/packs/fokusvirrat.js');
  // aikaleimat = sanatason ajoitus (js/luentareaktiot.js aikaleimojenOsoite);
  // aikaleimaTiedosto = sama JSON paketissa, jos se on repossa.
  // Aikaleimat kelpaavat vain, jos ne on kohdistettu täsmälleen nykyiseen
  // tekstiin (js/luentareaktiot.js tarkistaAikaleimat: versio, teksti,
  // tekstiSha256). Repon kopio on paketissa vain silloin; muuten
  // aikaleimaTiedosto ja reaktioHetket ovat null.
  const sha = (t) => createHash('sha256').update(t).digest('hex');
  const voimassaOlevat = (polku, teksti) => {
    const repo = new URL(`../../assets/aikaleimat/${polku.split('/').at(-1).replace(/\.mp3$/, '.aikaleimat.json')}`, import.meta.url);
    if (!teksti || !existsSync(repo)) return null;
    const data = JSON.parse(readFileSync(repo, 'utf8'));
    return data.versio === AIKALEIMOJEN_VERSIO && data.teksti === teksti && data.tekstiSha256 === sha(teksti) ? data : null;
  };
  const aani = (polku, teksti = null, reaktiot = null) => {
    const data = voimassaOlevat(polku, teksti);
    return {
      url: aaniUrl(polku), kesto: horatioAanenKesto(polku), aikaleimat: aikaleimojenOsoite(polku),
      tekstiSha256: teksti ? sha(teksti) : null,
      aikaleimaTiedosto: data ? `tiedostot/assets/aikaleimat/${polku.split('/').at(-1).replace(/\.mp3$/, '.aikaleimat.json')}` : null,
      // Skeema 1.11: ele = Livian tekninen ele (js/livia-tilanteet.js
      // livianLuentareaktionTiedot), null jos tarkoitukselle ei ole elettä.
      reaktiot: reaktiot ? reaktiot.map((r) => ({ ...r, ele: livianLuentareaktionTiedot(r)?.ele ?? null })) : null,
      reaktioHetket: data && reaktiot ? Object.fromEntries(ratkaiseAnkkurit(reaktiot, data).map((r) => [r.id, r.hetki])) : null,
    };
  };
  const rivit = [
    ...ERIKOISLUENNAT.map((l) => ({ id: l.id, kaupunki: null, paikkarivi: null, teksti: null, kuvaus: l.kuvaus,
      aanite: l.aanite, ...aani(l.aanite) })),
    ...Object.entries(FOKUSVIRRAT).filter(([, v]) => v?.matkakirja?.aanite).map(([kaupunki, v]) => ({
      id: `matkakirja:${kaupunki}`, kaupunki, paikkarivi: v.matkakirja.paikkarivi ?? null,
      teksti: v.matkakirja.teksti ?? null, kuvaus: null, aanite: v.matkakirja.aanite,
      ...aani(v.matkakirja.aanite, v.matkakirja.teksti ?? null, v.matkakirja.reaktiot ?? []),
    })),
  ];
  return taulukko('js/packs/fokusvirrat.js#FOKUSVIRRAT.*.matkakirja + erikoisluennat',
    'Isoisän luennat: intro ja lento-alku sekä matkakirjaluennat kaupungeittain. url = valmis https-osoite '
      + '(aaniUrl), kesto sekunteina tai null, aanite = repopolku, aikaleimat = sanatason ajoitus ämpärissä '
      + '(url + .aikaleimat.json; voi puuttua), tekstiSha256 = nykyisen tekstin tiiviste, jota aikaleimojen on '
      + 'vastattava, reaktiot = Livian kuuntelureaktiot ({id, ankkuri, tarkoitus, voimakkuus, siirtyma, ele}; ele = tekninen SVG-ele), '
      + 'reaktioHetket = {id: ms} ja aikaleimaTiedosto vain, kun paketin aikaleimat on kohdistettu nykyiseen tekstiin.',
    { kaupunki: 'kaupungit' }, rivit);
}

/*
 * LIVIAN PUHE (skeema 1.9, siirtosuunnitelman #2948 korjauslistan kohta
 * 4): Livian luentakommenttien cuet (ankkuri = sana tekstissä, tarkoitus,
 * voimakkuus) ja osoitteet. Ratkaistut ajoitukset ovat ämpärissä äänen
 * vieressä (.eleet.json, js/livia-puheeleet-lataus.js); ne on validoitu
 * tekstiSha256:ta ja cue-listaa vasten. odottaa = cuet kirjoitettu, ääni
 * tai eleet vielä tekemättä (ERA5_ODOTTAVAT_KAUPUNGIT).
 */
function livianPuheKokoelma(hae) {
  const cuet = hae('js/livia-pilotti-cuet.js');
  const { livianAaniOsoite } = hae('js/liviapuhe.js');
  const odottaa = new Set(cuet.ERA5_ODOTTAVAT_KAUPUNGIT ?? []);
  const eleet = lueLivianEleet();
  return taulukko('js/livia-pilotti-cuet.js#LIVIAN_LUENTA_CUET',
    'Livian luentakommentit kaupungeittain: aani = mp3 ämpärissä, eleet = ratkaistut cue-ajat (.eleet.json aanen '
      + 'vieressä), cuet = { id, ankkuri, esiintyma, tarkoitus, voimakkuus, ele, alku, loppu }, tekstiSha256 = '
      + 'kommentin tekstin tiiviste, jota eleet vastaavat. ele = tekninen SVG-ele (js/livia-tilanteet.js '
      + 'livianPuheeleenTiedot). eleetTila: ok = alku/loppu (ms äänen alusta) on tarkistettu pelin validaattorilla '
      + 'ja aaniTavut/aaniSha256 kertovat, mihin mp3:een ne kuuluvat; puuttuu = ämpärissä ei eleitä (alku/loppu '
      + 'null); vanhentunut = teksti vaihtunut haun jälkeen. odottaa = teksti ja ääni ovat vielä 13.9.2026 asussa '
      + '(ERA5_ODOTTAVAT_KAUPUNGIT), ei eleiden puutetta.',
    { kaupunki: 'kaupungit' },
    Object.values(cuet.LIVIAN_LUENTA_CUET).map((c) => {
      // Pelin omat osoitefunktiot: avain <kaupunki>-3 = kommenttikuplan
      // indeksi 2; versioitu polku tai ?v= kuten pelissä.
      const indeksi = Number(c.avain.split('-').at(-1)) - 1;
      const aani = livianAaniOsoite(c.kaupunki, indeksi);
      // Skeema 1.11: validoidut cue-ajat (tools/vienti/livian-eleet.mjs).
      const haettu = eleidenTila(eleet.kaupungit[c.kaupunki], c);
      const ajat = new Map((haettu.tila === 'ok' ? haettu.eleet : []).map((e) => [e.id, e]));
      return {
        id: c.kaupunki, kaupunki: c.kaupunki, revision: c.revision, kentta: c.kentta, kupla: c.kupla,
        tekstiSha256: c.tekstiSha256, aani, eleet: aani ? livianEleidenOsoite(aani) : null,
        eleetTila: haettu.tila,
        aaniTavut: haettu.aani?.tavut ?? null, aaniSha256: haettu.aani?.sha256 ?? null,
        odottaa: odottaa.has(c.kaupunki),
        cuet: c.cuet.map((q) => ({
          ...q, ele: livianPuheeleenTiedot(q)?.ele ?? null,
          alku: ajat.get(q.id)?.alku ?? null, loppu: ajat.get(q.id)?.loppu ?? null,
        })),
      };
    }));
}

/*
 * LIVIAN REPLIIKIT (skeema 1.11, Natiivi-UI): kaikki Livian äänitetyt
 * kuplat yhtenä listana samasta lähteestä kuin äänitystyökalu
 * (tools/generoi-pulu.mjs repliikit(): tekstit js/livia.js:stä, kaupunkien
 * pakkauksista ja linssikertomuksista). aani = pelin livianAaniOsoite;
 * ajanTasalla = pelin livianAaniAjanTasalla (false → peli vaikenee, koska
 * äänite sanoo eri asian kuin kupla).
 */
function livianRepliikkiKokoelma(hae, kaupunkiIdt) {
  const { livianAaniOsoite, livianAaniAjanTasalla, LIVIAN_KESTOT, LIVIAN_LINSSILAHTEET } = hae('js/liviapuhe.js');
  return taulukko('tools/generoi-pulu.mjs#repliikit (js/livia.js, js/liviapuhe.js, kaupunkien pakkaukset)',
    'Livian äänitetyt repliikit: id = avain (<lahde>-<n>), lahde (avaus, paljastus, mannerivihje, lehtivinkki, '
      + 'kaupunki-id tai linssi), kaupunki tai linssi, indeksi (0-alkuinen), teksti, aani = valmis https-osoite, '
      + 'kesto sekunteina tai null (lue äänestä), kuplaSekunteina = kuplan näkyvä vähimmäisaika, pinoutuu, saapuu '
      + '(saapumisrepliikki), ajanTasalla = äänite vastaa tekstiä (false → älä soita).',
    { kaupunki: 'kaupungit' },
    livianRepliikit().map((r) => ({
      id: r.avain, lahde: r.lahde,
      kaupunki: kaupunkiIdt.has(r.lahde) ? r.lahde : null,
      linssi: Object.hasOwn(LIVIAN_LINSSILAHTEET, r.lahde) ? r.lahde : null,
      indeksi: r.indeksi, teksti: r.teksti, aani: livianAaniOsoite(r.lahde, r.indeksi),
      kesto: LIVIAN_KESTOT[r.avain] ?? null, kuplaSekunteina: r.kuplaSekunteina,
      pinoutuu: r.pinoutuu, saapuu: r.saapuu,
      ajanTasalla: livianAaniAjanTasalla(r.lahde, r.indeksi, r.teksti),
    })));
}

/*
 * MAAT (skeema 1.9, Natiivi-UI:n kartuscha 23.9.2026): yksi rivi laudan
 * maata kohden (countryShapes, ISO3), kuten webin maapaneeli
 * (js/pallolauta/maapaneeli.js) ne kokoaa: nimi, lippu, paikallinen nimi
 * ja valtiomuoto 1873 (FOKUS_MAANIMET), tunnusluvut ja tervehdykset
 * (MAATIEDOT.maailmankartta) sekä maalehden aiheet järjestyksessä.
 */
function maaKokoelma(ns, hae) {
  const P = ns.MAAILMANKARTTA;
  const { MAATIEDOT } = hae('js/sisaltotaulut.js');
  const { FOKUS_MAANIMET } = hae('js/packs/fokus-grc.js');
  const { MAA_KATEGORIAT } = hae('js/packs/maa-kategoriat.js');
  const tiedot = MAATIEDOT.maailmankartta ?? {};
  const rivit = Object.entries(P.map.countryShapes).map(([iso, maa]) => {
    const lippu = maa.lippu ? ratkaiseMedia(maa.lippu, 'lippu-commons') : null;
    const nimet = FOKUS_MAANIMET[iso] ?? {};
    return {
      id: iso, iso2: ISO2[iso] ?? null, nimi: maa.nimi ?? null, wiki: maa.wiki ?? null,
      lippu: maa.lippu ?? null, lippuUrl: lippu?.url ?? null,
      paikallinen: nimet.paikallinen ?? null, valtiomuoto: nimet.valtiomuoto ?? null,
      tiedot: tiedot[iso] ?? null,
      maalehti: Object.hasOwn(MAA_KATEGORIAT, iso) ? iso : null,
      aiheet: (MAA_KATEGORIAT[iso] ?? []).map((a) => ({ id: a.id, nimi: a.nimi })),
    };
  });
  return taulukko(`${LAUTA}#MAAILMANKARTTA.map.countryShapes + MAATIEDOT + FOKUS_MAANIMET`,
    'Laudan maat kartuschaa varten (id = ISO3): nimi, lippu (Commons) ja lippuUrl, paikallinen nimi ja valtiomuoto '
      + '1873 (FOKUS_MAANIMET, ei kaikilla), tiedot = MAATIEDOT (vakiluku, pintaAla, sijat, demokratia {arvo, sija}, '
      + 'keskitulo {arvo, sija}, tervehdykset [{teksti, kieli, osuus, lippu}]) tai null, maalehti = maalehdet-id, '
      + 'aiheet = maalehden aiheet järjestyksessä.',
    { maalehti: 'maalehdet' }, rivit);
}

/*
 * NIPPU 4 (Natiivi-UI:n ja Linssisepän tarpeet 23.9.2026 ilta): kuvat ja
 * luennat valmiina osoitteina olemassa oleviin kokoelmiin.
 *   - kohtaamiset[].muotokuva: tavallisen visan kohtaamiskuva
 *     (kohtaamiskuvaTavalliselleKohtaamiselle), tarinakaari[].muotokuva:
 *     tarinakaaren kohtaamiskuva (kohtaamiskuvaKohteelle) — samat valinnat
 *     kuin js/visa.js. Kuvilla ei ole tekijä- eikä lisenssitietoa datassa,
 *     eikä peli näytä niille lähderiviä: tekija ja lisenssi ovat null.
 *   - laatat: kuvat tyypeittäin ja mantereittain, paikallisaarteet[].kuvat.
 *   - karttamerkit: assets/nostotyypit/merkki-*.png (karttaselite), jotka
 *     viedään ämpäriin (assets/, skeema 1.12, media.mjs sivustoReitit).
 *   - linssiaineisto: linssiluennat (pysäkkien ja kaaren puheiden osoitteet
 *     pelin omilla runkosäännöillä, js/linssipuhe.js).
 */

function muotokuva(kuva) {
  if (!kuva) return null;
  return { url: kuva.osoite, varat: [], alt: kuva.alt ?? null, lyhyt: kuva.lyhyt ?? null,
    kuvateksti: kuva.kuvateksti ?? null, tekija: null, lisenssi: null };
}

function mediaOsoite(polku) {
  if (!polku) return null;
  const { url = null, varat = [] } = ratkaiseMedia(polku, mediaLajiPolulle(polku));
  return url ? { url, varat } : null;
}
// Pelin omat asset-polut (assets/aarteet/…): media.mjs:n laji polusta.
const mediaLajiPolulle = (polku) => (polku.startsWith('assets/aarteet/') ? 'asset-aarteet' : 'repo');

function linssiluennat(hae) {
  const tulos = {};
  for (const [tunnus, moduuli] of [['keksinnot', 'js/linssit/keksinnot.js'], ['ihmisen-matka', 'js/linssit/ihmisen-matka.js']]) {
    const kaari = hae(moduuli).LINSSI?.aikajana;
    if (!kaari) continue;
    const juuri = kaari.luentajuuri ?? LINSSILUENTA_JUURI;
    const pysakit = (kaari.tapahtumat ?? []).map((t) => ({
      vuosi: t.vuosi ?? null, otsikko: t.otsikko ?? null, runko: luennanRunko(t), url: luennanOsoite(t, juuri),
    }));
    // Esittely saa versiokyselyn tekstin tiivisteestä (js/aikajana.js),
    // välinäytökset ja loppu eivät.
    const puheet = kaarenPuheet(kaari).map((p) => ({
      avain: p.avain, runko: p.runko,
      url: `${juuri}/${p.runko}.mp3${p.avain === 'esittely' && p.teksti ? `?v=${puheenTiiviste(p.teksti)}` : ''}`,
    }));
    tulos[tunnus] = { juuri, pysakit, puheet };
  }
  return tulos;
}

function rikastaNippu4(kokoelmat, ns) {
  for (const a of kokoelmat.kohtaamiset.alkiot) a.muotokuva = a.kaupunki ? muotokuva(kohtaamiskuvaTavalliselleKohtaamiselle(a.kaupunki)) : null;
  for (const a of kokoelmat.tarinakaari.alkiot) a.muotokuva = a.kaupunki ? muotokuva(kohtaamiskuvaKohteelle(a.kaupunki)) : null;
  const tokens = ns.MAAILMANKARTTA.tokens;
  const [laatta] = kokoelmat.laatat.alkiot;
  laatta.kuvat = Object.fromEntries(Object.entries(tokens.types).filter(([t]) => t !== 'robber').map(([t, v]) => [t, mediaOsoite(v.kuva)]));
  laatta.mannerKuvat = Object.fromEntries(Object.entries(tokens.mannerTypes).map(([m, tyypit]) => [m,
    Object.fromEntries(Object.entries(tyypit).map(([t, v]) => [t, mediaOsoite(v?.kuva)]))]));
  for (const a of kokoelmat.paikallisaarteet.alkiot) {
    a.kuvat = { pieniAarre: mediaOsoite(a.data?.pieniAarre?.kuva), isoAarre: mediaOsoite(a.data?.isoAarre?.kuva) };
  }
}

function karttamerkkiKokoelma() {
  const kansio = new URL('../../assets/nostotyypit/', import.meta.url);
  const rivit = readdirSync(kansio).filter((f) => /^merkki-.+\.png$/.test(f)).sort().map((f) => {
    const b = readFileSync(new URL(f, kansio));
    return { id: f.replace(/^merkki-|\.png$/g, ''), tiedosto: `assets/nostotyypit/${f}`, url: sivustoReitit(`assets/nostotyypit/${f}`)[0],
      tavuja: b.length, sha256: createHash('sha256').update(b).digest('hex') };
  });
  return taulukko('assets/nostotyypit/merkki-*.png',
    'Karttaselitteen nostotyyppien merkit (id = tyyppi). url = Pages (matkakirja.app); ämpärissä niitä ei vielä ole.',
    {}, rivit);
}

/*
 * MAASTONIMET (Natiivisepän tarve 23.9.2026 ilta). Karttavalot: skeemasta
 * 1.24 tools/vienti/karttavalot.mjs (webin pallon nostokerroksen joukko).
 * Maastonimet (MAAILMANKARTAN_NIMET: vuoret, järvet, joet) ovat webissä
 * vain tasokartan nimiökerroksessa, eivät pallolla.
 */
const asteiksi = (x, y) => {
  const a = laudaltaAsteiksi('maailmankartta', x, y);
  return a ? { lat: Math.round(a.lat * 1e4) / 1e4, lon: Math.round(a.lon * 1e4) / 1e4 } : null;
};

function maastonimiKokoelma() {
  const rivit = [];
  for (const [laji, lista] of [['vuori', MAAILMANKARTAN_NIMET.vuoret], ['jarvi', MAAILMANKARTAN_NIMET.jarvet]]) {
    for (const t of lista ?? []) {
      const p = asteiksi(t.x, t.y);
      if (p) rivit.push({ id: `${laji}:${t.avain}`, laji, nimi: t.nimi, ...p, tarkeys: t.tarkeys ?? null, viiva: null });
    }
  }
  for (const t of MAAILMANKARTAN_NIMET.joet ?? []) {
    const viiva = t.pisteet.map(([x, y]) => asteiksi(x, y)).filter(Boolean).map((p) => [p.lon, p.lat]);
    if (!viiva.length) continue;
    const [lon, lat] = viiva[Math.floor(viiva.length / 2)];
    rivit.push({ id: `joki:${t.avain}`, laji: 'joki', nimi: t.nimi, lat, lon, tarkeys: t.tarkeys ?? null, viiva });
  }
  return taulukko('js/packs/maailmankartta-nimet.js#MAAILMANKARTAN_NIMET',
    'Maastonimet (vuoret, järvet, joet) asteina: tarkeys 1–3 (1 = tärkein), joella viiva [[lon, lat], …] ja '
      + 'ankkuri keskipisteessä. Webissä vain tasokartan nimiökerroksessa, ei pallolla.',
    {}, rivit);
}

/**
 * nimiavaruudet: Map<moduulipolku, moduulin nimiavaruus>; media =
 * media.json:n rivit (skeema 1.15: lehtien kuvien url, varat ja mitat).
 */
export function kokoaKokoelmat(nimiavaruudet, { media = [] } = {}) {
  const ns = {
    AFRICA_EVENTS: nimiavaruudet.get('js/packs/africa.js')?.AFRICA?.events,
    ...nimiavaruudet.get(LAUTA),
    ...nimiavaruudet.get('js/packs/maailmankartta-pallopisteet.js'),
  };
  const hae = (polku) => {
    if (!nimiavaruudet.has(polku)) throw new Error(`kokoelmat: ${polku} ei ole viennissä`);
    return nimiavaruudet.get(polku);
  };
  const kaupunkiIdt = new Set(ns.MAAILMANKARTTA.cities.map((c) => c.id));
  const kokoelmat = {
    ...lautaKokoelmat(ns),
    ...sisaltoKokoelmat(hae, kaupunkiIdt),
    saannot: saantoKokoelma(hae),
    saapuminen: saapumisKokoelma(ns, hae),
    esilasketut: esilaskettuKokoelma(ns, hae),
    linssiaineisto: linssiKokoelma(hae),
    aanitaulut: aaniKokoelma(ns, hae),
    radiot: radioKokoelma(hae),
    ...kysymyskuvaKokoelmat(ns, hae),
    luennat: luentoKokoelma(hae),
    livianpuhe: livianPuheKokoelma(hae),
    livianrepliikit: livianRepliikkiKokoelma(hae, kaupunkiIdt),
    maat: maaKokoelma(ns, hae),
    karttamerkit: karttamerkkiKokoelma(),
    // Natiivisepän tarve 23.9.2026 ilta: sumu (PaljastaMaa) ja maatila.
    maastonimet: maastonimiKokoelma(),
    maarajat: taulukko('assets/data/maapolygonit.json (Natural Earth 10m admin-0)',
      `Maarajat asteina (id = ISO3, iso2, bbox [w, s, e, n], renkaat [[[lon, lat], …]]), harvennettu `
        + `${MAARAJOJEN_TOLERANSSI}° Douglas–Peuckerilla; sama geometria kuin laattoihin poltettu rajaviiva. `
        + 'Saaria ja reikiä ei eroteltu: täytä parillisuussäännöllä (even-odd). Päivämäärärajan ylittävän maan '
        + 'rengas voi jatkua yli ±180° (sauma purettu), joten bbox voi kattaa lähes koko pituusasteen (USA, RUS, FJI).',
      {}, maarajaRivit(new URL('../../assets/data/maapolygonit.json', import.meta.url))),
  };
  // Natiivisepän B17 (23.9.2026): maakuntien värjäys pallolla.
  const maakunnat = lueMaakuntarajat();
  kokoelmat.maakuntarajat = taulukko(`js/pallomaakunnat.js ämpäriaineisto ${maakunnat.versio ?? ''} (Natural Earth 10m admin-1)`.trim(),
    'Maakuntarajat asteina, sama muoto kuin maarajat: id = "<ISO3>:<tunnus>" (sama avain kuin '
      + 'js/karttatyokalu-maakunnat.js), iso3, nimi (suomeksi), bbox [w, s, e, n], renkaat [[[lon, lat], …]], '
      + `harvennettu ${maakunnat.toleranssi ?? MAAKUNTARAJOJEN_TOLERANSSI}° Douglas–Peuckerilla. Täytä parillisuussäännöllä. `
      + 'Maat: AUT, CHE, DEU, ESP, FRA (myös merentakaiset alueet), GBR, ITA, POL. '
      + 'Skeema 1.25: juuren kaaret [[[lon, lat], …]] = rajaviivat, jokainen sisäraja ja maiden välinen raja '
      + 'kerran sekä ulkorajat (rannikko); harvennettu kaarina solmusta solmuun, ja renkaat on rakennettu '
      + 'samoista kaarista, joten täyttö ja viiva osuvat yhteen.',
    {}, maakunnat.alueet);
  kokoelmat.maakuntarajat.kaaret = maakunnat.kaaret ?? [];
  // Skeema 1.22 (Natiivi-UI:n "Mitä uutta"): käsin kirjoitetut rivit, uusin ensin.
  const muutosloki = lueMuutosloki();
  kokoelmat['muutosloki-natiivi'] = taulukko('tools/vienti/muutosloki-natiivi.json',
    'Natiivin "Mitä uutta" -rivit uusin ensin: { id = versio, versio (build), paiva (YYYY-MM-DD), teksti }. '
      + 'Julkaisija lisää rivin jokaisesta TestFlight-buildista. Sisältöpäivitysten rivi on osoittimessa '
      + '(uusin.json muutos { paiva, teksti }); näytä se listan kärjessä, jos sen päivä on uusin.',
    {}, jarjestaMuutosloki(muutosloki.rivit).map((r) => ({ id: r.versio, versio: r.versio, paiva: r.paiva, teksti: r.teksti })));
  // Skeema 1.24: karttavalot = webin pallon nostokerroksen joukko (tools/vienti/karttavalot.mjs).
  const valot = karttavaloKokoelma(ns, hae, kokoelmat.kaupungit.alkiot, taulukko);
  kokoelmat.karttavalot = valot.kokoelma;
  rikastaNippu4(kokoelmat, ns);
  // Skeema 1.15: lehdet natiiville (tools/vienti/lehdet.mjs).
  const R = rikastaLehdet(kokoelmat, ns, hae, { media, taulukko });
  // Skeema 1.26 (2.0-polku): loput natiivin raakakentät päätasolle (tools/vienti/tyypitys.mjs).
  tyypitaLoput(kokoelmat);
  // Skeema 1.24 (Natiivi-UI:n toiveet 1, 3 ja 4): kohdekarttojen linkkien aihe,
  // saapumistekstit ja Livian saapumisrepliikit.
  rikastaKohdekartat(kokoelmat.kohdekartat, valot.haeKohde, valot.luokittele);
  kokoelmat.takynostot = takynostoKokoelma(ns, R, taulukko, kokoelmat.karttavalot);
  Object.assign(kokoelmat, saapumisKokoelmat(ns, hae, R, taulukko));
  // Kätkökuva (Pelikoodari 23.9.2026): web näyttää sen kaaren aarretekstin
  // yhteydessä (assets/kohtaamiset/kohtaaminen-katko.jpg). Ämpärissä skeemasta 1.12.
  kokoelmat.saannot.alkiot.push({
    id: 'KATKOKUVA', moduuli: 'assets/kohtaamiset/kohtaaminen-katko.jpg',
    arvo: mediaOsoite('assets/kohtaamiset/kohtaaminen-katko.jpg'),
  });
  // Livian astronauttikypärä (Natiivi-UI 23.9.2026): ainoa Livian rasteri,
  // js/livia-astronautti.js LIVIAN_ASTRONAUTTI_KYPARA.
  kokoelmat.saannot.alkiot.push({
    id: 'LIVIAN_ASTRONAUTTI_KYPARA', moduuli: 'js/livia-astronautti.js',
    arvo: mediaOsoite('assets/livia/livia-astronauttikypara-2x.png'),
  });
  kokoelmat.linssiaineisto.alkiot.push({
    id: 'linssiluennat', linssi: null, laji: 'luennat',
    kuvaus: 'Linssien luennat: juuri, pysäkit (runko = luennanRunko, url = luennanOsoite) ja kaaren puheet '
      + '(esittely ?v=tiiviste, välinäytökset, loppu). Musiikki: aanitaulut siirtyma:keksinnot ja siirtyma:ihmisen-matka.',
    data: linssiluennat(hae),
  });
  return kokoelmat;
}
