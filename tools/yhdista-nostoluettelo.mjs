/*
 * NOSTOTASON LUETTELO ÄMPÄRIN LUETTELOON — YKSI KENTTÄ KERRALLAAN.
 *
 *   node tools/yhdista-nostoluettelo.mjs \
 *     --ampari <ämpäristä ladattu pyramidi.json> \
 *     --poltto <nostotasoajon kansio>/pyramidi.json \
 *     --ulos  <kirjoitettava pyramidi.json>
 *
 * MIKSI TÄMÄ ON OLEMASSA (mitattu 18.9.2026, Mac).
 *
 * Nostotasoajo (`--nostotaso`) kirjoittaa oman `pyramidi.json`:insa,
 * mutta se tuntee VAIN nostotason: sen `rantataso` on null, `varitasot`
 * on null, `tasot` kuvaa vain ajetut tasot ja `erat` alkaa tyhjästä.
 * Jos se vietäisiin ämpäriin sellaisenaan, kartalta katoaisivat
 * rantataso ja 27 maan väritasot — hiljaa, ilman 404:ää, koska peli
 * lukee kerroksen olemassaolon juuri luettelosta.
 *
 * Työnkulun luettelojobi (.github/workflows/generoi-pyramidi.yml) on
 * varautunut tähän pohjustamalla ajokansion ämpärin luettelolla, mutta
 * MITATTU 18.9.2026: `--vain-luettelo` kirjoittaa `teeLuettelo()`:n
 * suoraan päälle eikä kutsu `yhdistaLuettelo`a lainkaan
 * (tools/generoi-laattapyramidi.mjs, `if (lippu('vain-luettelo'))`),
 * joten pohjustus ei tällä hetkellä vaikuta mihinkään. Sama kenttien
 * katoaminen uhkaa siis myös työnkulun kautta.
 *
 * Tämä skripti tekee yhdistämisen samalla säännöllä, jota piirtoajo
 * käyttää: `yhdistaLuettelo(..., { merkkitaso: true })`
 * (tools/pyramidiluettelo.mjs). Merkkitasoehto on se, joka sanoo
 * "tämä ajo ei polttanut yhtään pohjalaattaa": pohjan tasot, meriSävy,
 * ala ja rantaviivatieto kannetaan vanhasta eteenpäin, ja vain
 * `nostotaso` ja eräkirjanpito vaihtuvat.
 *
 * Tulos on tarkoitettu vietäväksi ämpäriin lyhyellä välimuistilla:
 *   aws s3 cp <ulos> s3://$AMPARI/julisteet/pyramidi/pyramidi.json \
 *     --content-type application/json --cache-control 'public, max-age=300'
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { yhdistaLuettelo } from './pyramidiluettelo.mjs';

const argv = process.argv.slice(2);
const valitsin = (nimi) => {
  const i = argv.indexOf(`--${nimi}`);
  return i >= 0 ? argv[i + 1] : null;
};

const amparipolku = valitsin('ampari');
const polttopolku = valitsin('poltto');
const ulospolku = valitsin('ulos');
if (!amparipolku || !polttopolku || !ulospolku) {
  console.error('käyttö: --ampari <pyramidi.json> --poltto <pyramidi.json> --ulos <pyramidi.json>');
  process.exit(2);
}

const vanha = JSON.parse(readFileSync(amparipolku, 'utf8'));
const poltto = JSON.parse(readFileSync(polttopolku, 'utf8'));

if (!poltto.nostotaso?.versio) {
  console.error(`${polttopolku}: ei nostotaso-kenttää — onko ajo tehty lipulla --nostotaso?`);
  process.exit(1);
}
/*
 * POHJAN VERSIO EI SAA VAIHTUA NOSTOAJOSSA. Nostotaso asuu oman
 * versionsa polussa ja pohja pysyy ikuisessa välimuistissaan; jos
 * ajossa on annettu eri `--versio`, luettelo osoittaisi pohjan
 * laatat polkuun, jota ei ole ajettu.
 */
if (poltto.versio !== vanha.versio) {
  console.error(`pohjan versio eroaa: ämpärissä ${vanha.versio}, poltossa ${poltto.versio}. `
    + 'Aja nostotaso lipulla --versio ' + vanha.versio);
  process.exit(1);
}

const uusi = yhdistaLuettelo(poltto, vanha, {
  merkkitaso: true,
  era: { tasot: (poltto.nostotaso.tasot ?? []).join(','), nostotaso: true },
});

/*
 * VIIVA- JA RANTATASO OVAT TOISEN AJON TIETOJA (mitattu 18.9.2026).
 *
 * `yhdistaLuettelo` kantaa vanhan kentän eteenpäin vain, jos uusi on
 * null — mutta nostotasoajon luettelossa `viivataso` EI ole null: se
 * rakentuu pelkästä geometriasta ja saa versiokseen `--viivaversio`:n
 * oletuksen eli pohjan version. Koeajossa ämpärin
 * `2026-09-08a-viivat` olisi siis vaihtunut `2026-09-07a`:ksi, ja
 * viivakerros olisi osoittanut polkuun, jota ei ole ajettu.
 *
 * Nostotasoajo ei polttanut yhtään viiva- eikä rantalaattaa, joten
 * kummankin kentän ainoa totuus on ämpärin luettelo.
 */
uusi.viivataso = vanha.viivataso ?? uusi.viivataso ?? null;
uusi.rantataso = vanha.rantataso ?? uusi.rantataso ?? null;
/*
 * PATINA on POHJAN painojälki (`--patina`), ei nostotason: nostolaatta
 * on läpinäkyvä kangas, jolle ei piirretä paperia lainkaan. Kenttä
 * kuvaa siis sitä ajoa, joka pohjalaatat poltti, ja se kannetaan
 * vanhasta eteenpäin riippumatta siitä, millä oletuksella nostoajo
 * sattui pyörimään.
 */
uusi.patina = vanha.patina ?? uusi.patina ?? null;

/*
 * VARTIO: nostoajo saa muuttaa TÄSMÄLLEEN kahta kenttää. Jos jokin
 * muu kenttä eroaa ämpärin luettelosta, julkaisu veisi mukanaan
 * jotain, mitä tämä ajo ei polttanut — ja peli näkisi kerroksen
 * katoavan ilman virhettä.
 */
// `nostotasot`: maittainen nostotaso (PAATOKSET 34 kohta 17 d, tools/kokoa-
// nostotasot.mjs) on nostoajon oma tuote, joten sen saa muuttaa.
const sallitut = new Set(['nostotaso', 'nostotasot', 'erat']);
const muuttuneet = [...new Set([...Object.keys(uusi), ...Object.keys(vanha)])]
  .filter((k) => JSON.stringify(uusi[k]) !== JSON.stringify(vanha[k]));
const luvattomat = muuttuneet.filter((k) => !sallitut.has(k));
if (luvattomat.length) {
  console.error(`nostoajo muuttaisi kenttiä, joita se ei polttanut: ${luvattomat.join(', ')}`);
  process.exit(1);
}

writeFileSync(ulospolku, `${JSON.stringify(uusi, null, 2)}\n`);

const nostoja = (o) => Object.keys(o?.nostotaso?.nostot ?? {}).length;
console.log(`nostotaso ${vanha.nostotaso?.versio ?? '-'} (${nostoja(vanha)} nostoa)`
  + ` → ${uusi.nostotaso.versio} (${nostoja(uusi)} nostoa), tasot ${(uusi.nostotaso.tasot ?? []).join(',')}`);
console.log(`pohja ${uusi.versio} · viivataso ${uusi.viivataso?.versio ?? '-'}`
  + ` · rantataso ${uusi.rantataso?.versio ?? '-'}`
  + ` · väritasot ${Object.keys(uusi.varitasot ?? {}).length} maata`
  + ` · tasot ${(uusi.tasot ?? []).map((t) => `z${t.z}`).join(' ')}`);
console.log(`kirjoitettu ${ulospolku}`);
