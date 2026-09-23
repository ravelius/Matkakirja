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
import { PAAKAUPUNGIT } from './paakaupungit.mjs';

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
      {}, [{ id: 'tokens', data: P.tokens }]),
    // Tapahtumakortit (Fablen kaanonipäätös 23.9.2026): tuodaan sellaisenaan
    // AFRICA.events-taulusta; maailmankartalla niitä ei ole, natiivi tekee
    // mekanismin yleisenä (effect.kind raha | kyyti | viive).
    tapahtumat: taulukko('js/packs/africa.js#AFRICA.events',
      'Tapahtumakortit (vain Afrikan laudalla; maailmankartalla ei tapahtumia). effect.kind: raha '
        + '(amount, kukkaro ei mene miinukselle), kyyti (ilmainen siirto rideTarget-kaupunkiin), viive '
        + '(yksi ylimääräinen vuoro paikallaan).',
      {}, (ns.AFRICA_EVENTS ?? []).map((e, i) => ({ id: `afrikka:${i}`, lauta: 'africa', data: e }))),
    kaksintaistelut: taulukko(`${LAUTA}#MAAILMANKARTTA.duels`, 'Kaksintaistelukysymykset.', {},
      P.duels.map((d, i) => ({ id: `kaksintaistelu:${i}`, data: d }))),
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
 *   - saannot: js/rules.js:n, js/game.js:n, js/tokens.js:n ja js/ai.js:n
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
const SAANTOMODUULIT = ['js/rules.js', 'js/game.js', 'js/tokens.js', 'js/ai.js'];

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
      if (!onSaantoArvo(arvo)) continue;
      // game.js vie rules.js:n hinnat edelleen; alkuperäinen moduuli voittaa.
      if (nahdyt.has(nimi)) continue;
      nahdyt.add(nimi);
      alkiot.push({ id: nimi, moduuli, arvo });
    }
  }
  return taulukko(SAANTOMODUULIT.join('+'),
    'Pelin sääntövakiot: matkustuksen hinnat (SEA_FEE laiva, FLIGHT_PRICE lento, BUS_FARE bussi), '
      + 'aloitusraha, vuoron tunnit, palkkiot, XP, aarteiden arvovälit (PIENI_AARRE_ARVO, ISO_AARRE_ARVO: min–max, 10 punnan askel) ja botin taito (BOT_SKILL). id = vakion nimi koodissa. SEA_FARE (game.js) '
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

/** nimiavaruudet: Map<moduulipolku, moduulin nimiavaruus> */
export function kokoaKokoelmat(nimiavaruudet) {
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
  return {
    ...lautaKokoelmat(ns),
    ...sisaltoKokoelmat(hae, kaupunkiIdt),
    saannot: saantoKokoelma(hae),
    saapuminen: saapumisKokoelma(ns, hae),
    esilasketut: esilaskettuKokoelma(ns, hae),
    linssiaineisto: linssiKokoelma(hae),
  };
}
