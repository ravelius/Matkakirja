#!/usr/bin/env node
/*
 * JOHDA MAASTOKOHTEET — maan vuoret, meret ja joet kohde-ehdokkaiksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Fokuslehdellä maasto on tähän asti ollut pelkkää
 * kuvaa: Kreikan Ólympos ja Egeanmeri ovat napautettavia
 * (js/packs/fokuskohteet-grc.js), mutta Espanjan Teide ja Norjan
 * Galdhøpiggen eivät ole mitään. Tämä työkalu tekee ehdokaslistan,
 * jonka teksti kirjoitetaan käsin ja koordinaatit lasketaan koneella.
 *
 * === MISTÄ LEHDEN MAASTONIMET OIKEASTI TULEVAT ===
 *
 * Tämä oli erän ensimmäinen selvitettävä asia, ja vastaus ei ole se,
 * jonka lehtiä katsomalla arvaisi. Kaksi eri reittiä:
 *
 *   1. KURATOITU REITTI (tools/fokuskartta/maat.mjs FOKUSMAAT). Maalla
 *      on käsin kirjoitettu tyyliolio, jossa on taulut `vuoret`
 *      ({ nimi, lon, lat, m, iso }), `meret` ({ nimi, lon, lat, kulma,
 *      koko }) ja `jokinimet`. Piirtomoottori (piirto.js osio 8e)
 *      polttaa niistä hachure-kolmion ja korkeuslukeman, ja
 *      `poltetutNimet`-kytkin kertoo, painetaanko nimi kuvaan vai
 *      jätetäänkö nimeäminen pelille. TÄMÄ TAULU ON EHDOKKAIDEN
 *      AUKTORITEETTI: kolmio on juuri siinä pisteessä, ja kun kohteen
 *      merkki lasketaan samasta lon/lat-parista, se istuu kolmion
 *      päälle täsmälleen kuten Kreikassa.
 *
 *      Kuratoituja maita on kuusi: GRC, HUN, HRV, DEU, RUS, CAN.
 *
 *   2. YLEINEN REITTI (maat.mjs yleinenTyyli). Kaikki muut 128
 *      fokuslehteä. Tyylissä EI OLE `vuoret`- eikä `meret`-taulua
 *      lainkaan, joten lehdellä ei ole yhtään hachure-kolmiota eikä
 *      yhtään poltettua merennimeä — vain hypsometrinen maasto, joet,
 *      järvet ja aineistosta poimitut kaupunkipisteet.
 *
 * Siitä seuraa erän tärkein rajaus, ja se on syytä lukea ennen kuin
 * lisää maita: YLEISEN REITIN MAALLA KOHDEMERKKI ON MAASTONIMEN AINOA
 * ESIINTYMÄ. Merkki ei tule poltetun symbolin päälle, koska poltettua
 * symbolia ei ole — merkki tuo nimiön kartalle itse (js/fokuskohteet.js
 * piirraNostosymKartalle). Se on sama tila, johon Kreikka päätyi
 * `poltetutNimet: { meret: false, vuoret: false, joet: false }`
 * -kytkimellä, eli tuettu ja hyväksytty; erona on vain, ettei alla ole
 * kolmiota. Kaksoisnimen vaaraa ei siis ole kummallakaan reitillä.
 *
 * === MIKSI TYÖKALU EI KEKSI HUIPPUJA ITSE ===
 *
 * Houkutus olisi etsiä huiput korkeusruudukon paikallisista
 * maksimeista. Sitä EI tehdä kahdesta syystä. Ensinnäkin ruudukko on
 * ETOPO1 eli yksi kaariminuutti: Mont Blancin kohdalla se antaa noin
 * 4700 m eikä 4808 m, ja lukema lehdellä olisi väärä. Toiseksi
 * paikallinen maksimi ei tiedä nimeään — ja nimi on juuri se, mitä
 * pelaaja napauttaa. Faktat tulevat siis aineistotiedostosta
 * (tools/maastoaineisto/<iso>.json), joka on tarkistettu Wikipediasta,
 * ja työkalu tekee sen, minkä kone tekee ihmistä paremmin: projektiot,
 * rajatarkistukset ja kaksoiskappaleiden haravoinnin.
 *
 * === MITÄ TYÖKALU LASKEE ===
 *
 * 1. MAAILMANKARTAN koordinaatit Millerin lieriöllä (LEVEYS 12000,
 *    LON0 -175, POHJOINEN 76) — sama kaava kuin tee-fokuskartta.mjs:n
 *    LAUDAT-taulussa ja piirto.js:n laudanProjektio.
 * 2. EUROOPAN LAUDAN koordinaatit tasavälikaavalla x = (lon + 11)·19,2
 *    ja y = (72 − lat)·26,3 (js/packs/fokus-grc.js FOKUS_LAUDAT).
 *    Lauta on 1000×1000, joten kaava kattaa vain lon −11…41,08 ja
 *    lat 33,98…72. RAJAN ULKOPUOLELLE JÄÄVÄ KOHDE EI SAA
 *    `europe`-riviä lainkaan — se on Kreikan pakin oma sääntö
 *    (*"Lauta, jota rivillä ei ole, ei saa kohdetta kartalle"*), ja
 *    juuri tähän Islanti ja Uralin itäpuoli osuvat.
 * 3. KAKSOISKAPPALEET: maan olemassa oleva js/packs/fokuskohteet-<iso>.js
 *    luetaan, ja jos siinä on jo sama `id` tai sama `nimi`, ehdokas
 *    merkitään ohitettavaksi. Erän sääntö on, ettei yhtäkään
 *    olemassa olevaa maastokohdetta duplikoida.
 *
 * === KÄYTTÖ ===
 *
 *   node tools/johda-maastokohteet.mjs GRC          taulukko silmälle
 *   node tools/johda-maastokohteet.mjs ESP --json   ehdokkaat JSONina
 *   node tools/johda-maastokohteet.mjs ESP --runko  pakin runko stdoutiin
 *   node tools/johda-maastokohteet.mjs --kaikki     kaikkien aineistojen tila
 *
 * `--runko` kirjoittaa valmiin tiedostorungon, jossa koordinaatit ja
 * kenttärakenne ovat paikallaan ja tekstikentät ovat aihioita. Tekstiä
 * työkalu EI keksi: `teksti`, `kysymykset`, `korostukset` ja `lahde`
 * kirjoitetaan käsin tarkistetusta lähteestä, kuten Kreikassa.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { FOKUSMAAT } from './fokuskartta/maat.mjs';
import { FOKUS_POHJAT } from '../js/packs/fokus-grc.js';

const TAALLA = dirname(fileURLToPath(import.meta.url));
const JUURI = join(TAALLA, '..');
const AINEISTOT = join(TAALLA, 'maastoaineisto');

const RAD = Math.PI / 180;

/* ------------------------------------------------------------ laudat */

/*
 * Maailmankartan Millerin lieriö. Luvut ovat tee-maailmankartta.mjs:n
 * vakioita, ja kaava on kopioitu piirto.js:n laudanProjektio-haarasta
 * `miller` — ei muunneltu. Tarkistus ajetaan joka ajossa
 * (tarkistaKaava): Ateena 23,7275 E / 37,9838 N → 6624,3 / 1881,5.
 */
const MAAILMA = { leveys: 12000, lon0: -175, pohjoinen: 76 };

const millerY = (lat) => -1.25 * Math.log(Math.tan(Math.PI / 4 + 0.4 * lat * RAD));

function maailmankartta(lon, lat) {
  const skaala = MAAILMA.leveys / (2 * Math.PI);
  const kierros = 2 * Math.PI;
  const d = (lon - MAAILMA.lon0) * RAD;
  return {
    x: (((d % kierros) + kierros) % kierros) * skaala,
    y: (millerY(lat) - millerY(MAAILMA.pohjoinen)) * skaala,
  };
}

/*
 * Euroopan lauta: tasaväli, viewBox 0…1000 molemmilla akseleilla
 * (js/packs/europe.js width/height). Kaavan kattama ikkuna on siis
 * lon −11…41,0833 ja lat 33,977…72.
 */
const EUROOPPA = { lonA: 19.2, lonB: 11 * 19.2, latA: -26.3, latB: 72 * 26.3 };

function europe(lon, lat) {
  const x = lon * EUROOPPA.lonA + EUROOPPA.lonB;
  const y = lat * EUROOPPA.latA + EUROOPPA.latB;
  if (x < 0 || x > 1000 || y < 0 || y > 1000) return null;
  return { x, y };
}

const pyorista = (n) => Math.round(n * 10) / 10;

/** Kohteen `laudat`-olio. Rajan ulkopuolinen lauta jää pois kokonaan. */
export function laudat(lon, lat) {
  const m = maailmankartta(lon, lat);
  const e = europe(lon, lat);
  const ulos = { maailmankartta: { x: pyorista(m.x), y: pyorista(m.y) } };
  if (e) ulos.europe = { x: pyorista(e.x), y: pyorista(e.y) };
  return ulos;
}

/*
 * KAAVAN TARKISTUS JOKA AJOLLA. Sama periaate kuin
 * tee-fokuskartta.mjs:n tarkistaProjektio: jos projektio ajautuu, ajo
 * kaatuu tässä eikä vasta pelissä väärään paikkaan piirrettynä
 * merkkinä. Vertailuarvot ovat js/packs/fokuskohteet-grc.js:n
 * Ólympos-rivi, joka on omistajan hyväksymällä lehdellä kohdallaan.
 */
function tarkistaKaava() {
  const l = laudat(22.3586, 40.0853);
  const virhe = (a, b) => Math.abs(a - b);
  if (virhe(l.maailmankartta.x, 6578.6) > 0.2 || virhe(l.maailmankartta.y, 1799.5) > 0.2
    || virhe(l.europe.x, 640.5) > 0.2 || virhe(l.europe.y, 839.3) > 0.2) {
    throw new Error(`Projektio ajautunut: Ólympos → ${JSON.stringify(l)}`);
  }
}

/* -------------------------------------------------------- aineistot */

/**
 * Maan lehdelle poltetut maastonimet, jos maa on kuratoidulla
 * reitillä. Palauttaa saman muotoisen ehdokaslistan kuin
 * aineistotiedosto, jotta kutsuja käsittelee molemmat yhdellä koodilla.
 */
export function poltetutMaastonimet(iso) {
  const tyyli = FOKUSMAAT[iso];
  if (!tyyli) return null;
  const vuoret = (tyyli.vuoret ?? []).map((v) => ({
    tyyppi: 'vuori', nimi: v.nimi, lon: v.lon, lat: v.lat, m: v.m, lehdella: true,
  }));
  const meret = (tyyli.meret ?? []).map((m) => ({
    /*
     * Lehden merennimi on VERSAALIA (piirto.js latoo sen sellaisenaan),
     * mutta kohteen nimi on tavallista kirjoitusasua — kortin otsikko
     * ei huuda. Muunnos on tässä, jotta ehdokas on heti oikeassa
     * asussa; nimi tarkistetaan silti käsin, koska ison alkukirjaimen
     * jälkeinen osa voi olla yhdyssana ("Egeanmeri") tai kaksi sanaa
     * ("Mustameri" ei ole, "Adrianmeri" on).
     */
    tyyppi: 'meri',
    nimi: m.nimi.charAt(0) + m.nimi.slice(1).toLowerCase(),
    lon: m.lon,
    lat: m.lat,
    lehdella: true,
  }));
  return [...vuoret, ...meret];
}

/** Käsin tarkistettu aineisto, jos maalle on sellainen kirjoitettu. */
export function aineisto(iso) {
  const polku = join(AINEISTOT, `${iso}.json`);
  if (!existsSync(polku)) return null;
  return JSON.parse(readFileSync(polku, 'utf8'));
}

/* ----------------------------------------------- osuuko kohde lehteen */

/*
 * OSUUKO KOHDE MAAN FOKUSLEHDEN IKKUNAAN?
 *
 * Tämä on erän tärkein koneellinen tarkistus, ja se löysi heti kaksi
 * oikeaa virhettä. Kohteen merkki on laudan koordinaateissa, mutta
 * fokusnäkymässä kamera ajetaan lehden RAJAUKSEEN (js/packs/fokus-grc.js
 * FOKUS_POHJAT). Rajauksen ulkopuolelle jäävä kohde on siis olemassa
 * mutta pelaajan ulottumattomissa: merkki on ruudun takana eikä sitä voi
 * napauttaa.
 *
 * Juuri niin olisi käynyt Espanjan Teidelle (Kanariansaaret, lon -16,6)
 * ja Portugalin Picolle (Azorit, lon -28). Ne ovat maidensa korkeimmat
 * huiput, mutta lehden ikkuna rakennetaan maan omasta laatikosta
 * (maat.mjs YLEINEN.saarenEtaisyys 2,5 astetta), eivätkä nuo saaret
 * mahdu siihen. Kummankin tilalla on siksi mantereen korkein huippu,
 * jonka artikkeli itse nimeää sellaiseksi — ei keksitty kiertotie vaan
 * lähteen oma rajaus.
 *
 * Rajaus on annettu vain sillä laudalla, jolle lehti on tehty; muille
 * laudoille tarkistusta ei tehdä.
 */
export function lehdenRajaus(iso) {
  const pohja = FOKUS_POHJAT[iso];
  if (!pohja?.rajaus || !pohja?.lauta) return null;
  return { lauta: pohja.lauta, ...pohja.rajaus };
}

/** Onko kohde lehden rajauksen sisällä? null = lehteä ei tunneta. */
export function osuuLehteen(iso, kohteenLaudat) {
  const r = lehdenRajaus(iso);
  if (!r) return null;
  const p = kohteenLaudat[r.lauta];
  if (!p) return false;
  return p.x >= r.x && p.x <= r.x + r.w && p.y >= r.y && p.y <= r.y + r.h;
}

/* ------------------------------------------------- kaksoiskappaleet */

/*
 * Maan olemassa olevat kohteet id:n ja nimen tarkkuudella. Tiedostoa ei
 * importoida vaan luetaan tekstinä: pakit tuovat js/media.js:n ja muuta
 * selainkoodia, joka ei käänny Nodessa ilman DOMia.
 */
export function olemassaOlevat(iso) {
  const pienet = iso.toLowerCase();
  const tunnukset = new Set();
  const nimet = new Set();
  for (const nimi of [`fokuskohteet-${pienet}.js`, `maastokohteet-${pienet}.js`]) {
    const polku = join(JUURI, 'js', 'packs', nimi);
    if (!existsSync(polku)) continue;
    const teksti = readFileSync(polku, 'utf8');
    for (const [, id] of teksti.matchAll(/^\s{4}id: '([^']+)'/gm)) tunnukset.add(id);
    for (const [, n] of teksti.matchAll(/^\s{4}nimi: '([^']+)'/gm)) nimet.add(n.toLowerCase());
  }
  return { tunnukset, nimet };
}

/* ------------------------------------------------------- ehdokkaat */

/** Kohteen tunnus nimestä: ääkköset auki, välit pois, pieniksi. */
export function tunnusNimesta(nimi) {
  return nimi
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '')
    .slice(0, 32);
}

/**
 * Maan kohde-ehdokkaat: aineisto ja lehdelle poltetut nimet yhdessä,
 * koordinaatit laskettuina ja kaksoiskappaleet merkittyinä.
 *
 * Poltettu nimi voittaa aineiston koordinaatin, koska merkin on
 * istuttava sen kolmion päälle, joka kuvassa jo on.
 */
export function ehdokkaat(iso) {
  const poltetut = poltetutMaastonimet(iso) ?? [];
  const data = aineisto(iso);
  const listat = data
    ? [...(data.vuoret ?? []).map((v) => ({ ...v, tyyppi: 'vuori' })),
      ...(data.meret ?? []).map((m) => ({ ...m, tyyppi: 'meri' })),
      ...(data.joet ?? []).map((j) => ({ ...j, tyyppi: 'joki' }))]
    : [];

  const yhdessa = new Map();
  for (const k of [...listat, ...poltetut]) {
    const avain = k.nimi.toLowerCase();
    const vanha = yhdessa.get(avain);
    // Poltettu piste voittaa: merkki istuu lehden omalle kolmiolle.
    yhdessa.set(avain, vanha ? { ...vanha, ...k } : k);
  }

  const { tunnukset, nimet } = olemassaOlevat(iso);
  return [...yhdessa.values()].map((k) => {
    const id = k.id ?? tunnusNimesta(k.nimi);
    const paikat = laudat(k.lon, k.lat);
    return {
      ...k,
      id,
      laudat: paikat,
      jo: tunnukset.has(id) || nimet.has(k.nimi.toLowerCase()),
      lehdella: Boolean(k.lehdella),
      ikkunassa: osuuLehteen(iso, paikat),
    };
  });
}

/* ----------------------------------------------------------- runko */

const lainaus = (s) => `'${String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;

function laudatRivi(l) {
  const rivit = [`      maailmankartta: { x: ${l.maailmankartta.x}, y: ${l.maailmankartta.y} },`];
  if (l.europe) rivit.push(`      europe: { x: ${l.europe.x}, y: ${l.europe.y} },`);
  else {
    rivit.push('      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):');
    rivit.push('      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.');
  }
  return rivit.join('\n');
}

/*
 * PITKÄ MERKKIJONO KATKAISTUNA. Pakit kirjoitetaan `'...' + '...'`
 * -ketjuina, koska rivin pituusraja on 100 merkkiä (.eslintrc) ja koska
 * kaikki maan olemassa olevat kohteet on ladottu samalla tavalla —
 * generoidun tiedoston on näytettävä käsin kirjoitetulta.
 */
function katko(teksti, sisennys) {
  const tila = 96 - sisennys.length - 6;
  const sanat = String(teksti).split(' ');
  const rivit = [];
  let nyt = '';
  for (const sana of sanat) {
    if (nyt && (nyt.length + 1 + sana.length) > tila) { rivit.push(nyt); nyt = sana; } else nyt = nyt ? `${nyt} ${sana}` : sana;
  }
  if (nyt) rivit.push(nyt);
  return rivit
    .map((r, i) => (i === rivit.length - 1 ? lainaus(r) : `${lainaus(`${r} `)}`))
    .map((r, i) => (i === 0 ? r : `${sisennys}  + ${r}`))
    .join('\n');
}

/** Yhden ehdokkaan olio pakkitiedoston asussa. */
export function kohdeRunko(k) {
  const asteet = `    // ${k.lon} E / ${k.lat} N`
    + (k.lahdeKoordinaatti ? ` — ${k.lahdeKoordinaatti}` : '');
  const rivit = ['  {', `    id: ${lainaus(k.id)},`, `    nimi: ${lainaus(k.nimi)},`,
    `    tyyppi: ${lainaus(k.tyyppi)},`];
  const kysymykset = k.kysymykset ?? ['AIHIO — kysymys 1', 'AIHIO — kysymys 2'];
  rivit.push('    kysymykset: [', ...kysymykset.map((q) => `      ${lainaus(q)},`), '    ],');
  if (k.korostukset?.length) {
    rivit.push(`    korostukset: [${k.korostukset.map(lainaus).join(', ')}],`);
  }
  rivit.push(`    nappi: ${lainaus(k.nappi ?? 'AIHIO — napin lupaus')},`);
  for (const rivi of asteet.split('\n')) rivit.push(rivi);
  rivit.push('    laudat: {', laudatRivi(k.laudat), '    },');
  rivit.push(`    teksti: ${katko(k.teksti ?? 'AIHIO — teksti puuttuu.', '    ')},`);
  rivit.push(`    lahde: ${katko(k.lahde ?? 'AIHIO — lähde puuttuu.', '    ')},`);
  rivit.push('  },');
  return rivit.join('\n');
}

/** Koko maan pakkitiedoston runko. */
export function pakkiRunko(iso, kohteet, huomio) {
  const lehdella = kohteet.filter((k) => k.lehdella).length;
  const reitti = FOKUSMAAT[iso]
    ? ` Maa on KURATOIDULLA reitillä (tools/fokuskartta/maat.mjs\n * FOKUSMAAT.${iso}), joten ${lehdella} kohdetta istuu suoraan lehteen poltetun\n * nimen tai hachure-kolmion päälle.`
    : ' Maa on YLEISELLÄ reitillä: lehdellä ei ole poltettuja\n * maastonimiä lainkaan, joten merkin nimiö on maastonimen ainoa\n * esiintymä kartalla. Kaksoisnimen vaaraa ei siis ole.';
  return `/*
 * MAASTOKOHTEET — ${iso}. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * \`node tools/johda-maastokohteet.mjs ${iso} --runko\`, jonka lähtöaineisto
 * on tools/maastoaineisto/${iso}.json. Työkalu laskee laudan
 * projektiot (maailmankartta = Millerin lieriö, europe = tasaväli),
 * jättää pois laudan, jonka kaavan ulkopuolelle kohde jää, ja
 * tarkistaa että jokainen kohde osuu maan fokuslehden rajaukseen —
 * ikkunan ulkopuolinen merkki olisi olemassa mutta pelaajan
 * ulottumattomissa. Faktat on tarkistettu en-Wikipediasta lähde
 * kerrallaan, ja jokaisen kohteen \`lahde\`-rivi kertoo mistä artikkelin
 * osasta se on.
 *
 *${reitti}
 *
 * Lista yhdistyy maan muihin kohteisiin js/packs/maastokohteet.js
 * -hakemiston kautta (js/fokuskohteet.js KOHDE_MAAT), joten maan
 * mahdollista olemassa olevaa fokuskohteet-pakkia EI ole tarvinnut
 * koskea eikä yhtään sen kohdetta ole toistettu täällä.${huomio ? `\n *\n * ${huomio}` : ''}
 */
export const MAASTOKOHTEET_${iso} = [
${kohteet.map(kohdeRunko).join('\n')}
];
`;
}

/* ------------------------------------------------------------- ajo */

function taulukko(iso) {
  const lista = ehdokkaat(iso);
  if (!lista.length) {
    console.log(`${iso}: ei aineistoa (tools/maastoaineisto/${iso}.json puuttuu`
      + `${FOKUSMAAT[iso] ? '' : ', eikä maa ole kuratoidulla reitillä'}).`);
    return;
  }
  console.log(`${iso} — ${lista.length} ehdokasta`
    + ` (${lista.filter((k) => k.jo).length} jo pakissa)`);
  for (const k of lista) {
    const e = k.laudat.europe ? `europe ${k.laudat.europe.x}/${k.laudat.europe.y}` : 'europe —';
    console.log(`  ${k.jo ? 'JO ' : '   '}${k.lehdella ? '▲' : ' '}`
      + `${k.ikkunassa === false ? '!' : ' '} `
      + `${k.tyyppi.padEnd(5)} ${k.nimi.padEnd(24)} `
      + `${k.m ? `${String(k.m).padStart(5)} m` : '       '} `
      + `maailma ${k.laudat.maailmankartta.x}/${k.laudat.maailmankartta.y}  ${e}`);
  }
}

function kaikki() {
  const isot = existsSync(AINEISTOT)
    ? readdirSync(AINEISTOT).filter((n) => n.endsWith('.json')).map((n) => n.slice(0, 3))
    : [];
  const kaikkiIsot = [...new Set([...isot, ...Object.keys(FOKUSMAAT)])].sort();
  let kohteita = 0;
  for (const iso of kaikkiIsot) {
    const lista = ehdokkaat(iso);
    const uudet = lista.filter((k) => !k.jo);
    kohteita += uudet.length;
    const ulkona = lista.filter((k) => k.ikkunassa === false);
    console.log(`${iso}  ehdokkaita ${String(lista.length).padStart(2)}`
      + `  uusia ${String(uudet.length).padStart(2)}`
      + `  lehdellä ${String(lista.filter((k) => k.lehdella).length).padStart(2)}`
      + (ulkona.length ? `  IKKUNAN ULKOPUOLELLA: ${ulkona.map((k) => k.nimi).join(', ')}` : ''));
  }
  console.log(`\nyhteensä ${kohteita} uutta ehdokasta ${kaikkiIsot.length} maasta`);
}

function main(argv) {
  tarkistaKaava();
  const liput = argv.filter((a) => a.startsWith('--'));
  const isot = argv.filter((a) => !a.startsWith('--')).map((a) => a.toUpperCase());
  if (liput.includes('--kaikki')) return kaikki();
  if (!isot.length) {
    console.error('Käyttö: node tools/johda-maastokohteet.mjs <ISO> [--json|--runko]');
    process.exitCode = 1;
    return undefined;
  }
  for (const iso of isot) {
    const lista = ehdokkaat(iso).filter((k) => !k.jo);
    if (liput.includes('--json')) console.log(JSON.stringify(lista, null, 2));
    else if (liput.includes('--runko')) console.log(pakkiRunko(iso, lista, aineisto(iso)?._));
    else taulukko(iso);
  }
  return undefined;
}

if (process.argv[1] && process.argv[1].endsWith('johda-maastokohteet.mjs')) {
  main(process.argv.slice(2));
}
