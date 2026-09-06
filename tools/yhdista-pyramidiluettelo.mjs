#!/usr/bin/env node
/*
 * YHDISTÄ PYRAMIDIN LUETTELO: ämpärin pyramidi.json + paikallisen
 * z8-polton luettelo → uusi luettelo, jossa on ämpärin kaikki vanha
 * tieto ja PELKÄSTÄÄN z8:n lisäykset.
 *
 * MIKSI. tools/polta-paikallisesti.sh polttaa z8:n olemassa oleviin
 * versiopolkuihin (pohja, viivataso, nostotaso), mutta sen kokoama
 * luettelo lasketaan nykyisestä reposta — ja nostotason `nostot`-taulu
 * (poltettujen nostojen tunnisteet, joilla peli vaientaa elävät
 * merkit) muuttuu aina, kun repoon on tullut uusia nostoja. Skripti
 * kieltäytyy silloin viemästä luetteloa (6.9.2026: "nostot: +1084").
 * Tämä työkalu ottaa pohjaksi ÄMPÄRIN luettelon (nostot-taulu ja kaikki
 * muu ennallaan) ja lisää siihen vain z8-tason: pohjan taso 8,
 * korkeusruudukon 8, viivatason 8 ja nostotason 8 laatastoineen.
 *
 * NOSTOTASON Z8 JA VANHA NOSTOT-TAULU. z8:n nostolaatat on poltettu
 * repon NYKYISELLÄ nostojoukolla, z5–z7 vanhalla. Taulu pidetään
 * vanhana, koska se vaientaa elävät merkit joka tasolla: uusi taulu
 * hävittäisi z5–z7:llä ne nostot, joita siellä ei ole poltettu. Vanhalla
 * taululla z8:lla piirtyy uusien nostojen kohdalle sekä poltettu että
 * elävä merkki — samalla ladontasäännöllä (nostotaso.saanto) ne osuvat
 * päällekkäin. Jos z8 jätettäisiin nostotasosta pois, tasokartta
 * valitsisi lähikuvassa z8:n, nostokerros sammuisi (opacity 0,
 * js/laattapyramidi.js paivitaNostotaso) ja poltetut nostot katoaisivat
 * kokonaan — se olisi selvä taantuma. Lopullinen siisti tila on koko
 * pyramidin uusintapoltto nykyisellä nostojoukolla (omistaja 6.9.2026
 * ilta: pohja ilman rantaviivaa, ks. docs/moduulit/pallon-vektoriviivat.md
 * V4); siihen asti tämä on oikea välitila. `--ilman-nostoja` jättää
 * z8:n nostotasosta pois, jos sitä joskus tarvitaan.
 *
 * Käyttö (Macilla polton jälkeen):
 *   node tools/yhdista-pyramidiluettelo.mjs \
 *     pyramidi-poltto/ampari-luettelo.json \
 *     pyramidi-poltto/luettelo/pyramidi.json \
 *     pyramidi-poltto/luettelo/pyramidi-yhdistetty.json
 *   aws s3 cp pyramidi-poltto/luettelo/pyramidi-yhdistetty.json \
 *     "s3://$AMPARI/julisteet/pyramidi/pyramidi.json" \
 *     --endpoint-url "$PAATE" --content-type application/json \
 *     --cache-control 'public, max-age=300' --no-progress
 */
import { readFileSync, writeFileSync } from 'node:fs';

const argit = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const ilmanNostoja = process.argv.includes('--ilman-nostoja');
const [vanhaPolku, uusiPolku, ulosPolku] = argit;
if (!vanhaPolku || !uusiPolku || !ulosPolku) {
  console.error('Käyttö: yhdista-pyramidiluettelo.mjs <ampari.json> <uusi.json> <ulos.json> [--ilman-nostoja]');
  process.exit(2);
}
const vanha = JSON.parse(readFileSync(vanhaPolku, 'utf8'));
const uusi = JSON.parse(readFileSync(uusiPolku, 'utf8'));
const Z = 8;

const samaVersio = (a, b, nimi) => {
  if (a !== b) throw new Error(`${nimi} eroaa: ämpäri ${a}, uusi ${b} — z8 ei ole poltettu samaan versioon`);
};
samaVersio(vanha.versio, uusi.versio, 'pohjan versio');
samaVersio(vanha.viivataso?.versio, uusi.viivataso?.versio, 'viivataso.versio');
samaVersio(vanha.nostotaso?.versio, uusi.nostotaso?.versio, 'nostotaso.versio');

const tulos = structuredClone(vanha);
const lisatty = [];

// Pohja: taso 8 ja korkeusruudukko.
const uusiTaso = (uusi.tasot ?? []).find((t) => t.z === Z);
if (!uusiTaso) throw new Error('uudessa luettelossa ei ole tasoa z8');
tulos.tasot = [...(vanha.tasot ?? []).filter((t) => t.z !== Z), uusiTaso].sort((a, b) => a.z - b.z);
if (uusi.korkeus?.kaariminuutit?.[Z] != null) {
  tulos.korkeus ??= {};
  tulos.korkeus.kaariminuutit ??= {};
  tulos.korkeus.kaariminuutit[Z] = uusi.korkeus.kaariminuutit[Z];
}
lisatty.push(`pohja z${Z} (${uusiTaso.sarakkeita} × ${uusiTaso.riveja})`);

// Viivataso: taso 8 ja laatasto.
if (uusi.viivataso?.laatastot?.[Z]) {
  tulos.viivataso.tasot = [...new Set([...(vanha.viivataso.tasot ?? []), Z])].sort((a, b) => a - b);
  tulos.viivataso.laatastot ??= {};
  tulos.viivataso.laatastot[Z] = uusi.viivataso.laatastot[Z];
  lisatty.push(`viivataso z${Z}`);
} else {
  console.warn('· uudessa luettelossa ei ole viivatason z8-laatastoa — jätetään pois');
}

// Nostotaso: z8 mukaan vanhalla nostot-taululla (perustelu yllä).
const vanhatNostot = Object.keys(vanha.nostotaso?.nostot ?? {}).length;
const uudetNostot = Object.keys(uusi.nostotaso?.nostot ?? {}).length;
if (uusi.nostotaso?.laatastot?.[Z] && !ilmanNostoja) {
  tulos.nostotaso.tasot = [...new Set([...(vanha.nostotaso.tasot ?? []), Z])].sort((a, b) => a - b);
  tulos.nostotaso.laatastot ??= {};
  tulos.nostotaso.laatastot[Z] = uusi.nostotaso.laatastot[Z];
  lisatty.push(`nostotaso z${Z}`);
  if (vanhatNostot !== uudetNostot) {
    console.warn(`· nostotaso z${Z} on poltettu ${uudetNostot} nostolla, taulu pidetään vanhana (${vanhatNostot}): `
      + 'uudet nostot piirtyvät z8:lla sekä poltettuina että elävinä, kunnes koko pyramidi poltetaan uudestaan');
  }
} else {
  console.warn(`· nostotaso z${Z} jätetään pois (${ilmanNostoja ? '--ilman-nostoja' : 'ei laatastoa'})`);
}

writeFileSync(ulosPolku, JSON.stringify(tulos, null, 2));
console.log(`· yhdistetty luettelo: ${ulosPolku}`);
console.log(`· lisätty: ${lisatty.join(', ')}`);
console.log(`· ennallaan: versio ${tulos.versio}, viivat ${tulos.viivataso?.versio}, nostot ${tulos.nostotaso?.versio} (${vanhatNostot} nostoa)`);
