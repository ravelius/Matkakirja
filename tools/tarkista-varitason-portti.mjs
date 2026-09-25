/*
 * Tarkista, näkyykö väri-/tasoituskerros näillä kahdella luettelolla.
 *
 *   node tools/tarkista-varitason-portti.mjs \
 *        --pallo laatat.json --pyramidi pyramidi.json --maa FRA
 *
 * === MIKSI TÄMÄ ON OMA TYÖKALUNSA ==================================
 *
 * Erän 1b raportti (luku 8, ehto 4) ja suunnitelman riski 4.2 sanovat
 * saman: jos pallon sarja (laatat.json) ja pyramidi (pyramidi.json)
 * ovat eri versiota, KOKO laattakerros sammuu — ei vain väri. Se on
 * mitattu vastakokeella (erän 1b luku 4.3: 4/11 väitettä läpi), ja se
 * on juuri se virhe, jonka omistaja näki v1650:ssa: kartta näytti
 * "päällä olevalta" mutta oli pelkkää sumeaa Mercator-sarjaa.
 *
 * Työnkulku, joka vie värilaatat ämpäriin, ei saa jättää tätä
 * silmämääräiseksi. Portti luetaan siksi PELIN OMASTA FUNKTIOSTA
 * (js/pallolaatat.js lepokerroksenKerrokset) eikä kirjoiteta uudestaan
 * YAML:iin — kaksi toteutusta samasta ehdosta ehtisi eriytyä, eikä
 * kukaan huomaisi sitä kuin karttaa katsomalla.
 *
 * === MITÄ LAATAT.JSON:IIN PITÄÄ KIRJOITTAA — EI MITÄÄN =============
 *
 * MITATTU 13.9.2026 (erä 1c). Pallon sarjan luettelo kertoo neljä
 * asiaa: `versio`, `viivat`, `nostot`, `ranta` (tools/tee-pallolaatat.mjs
 * riviltä 602). Väritasosta siinä ei ole kenttää eikä tarvitse olla:
 * väri ei ole poltettu Mercator-sarjaan vaan piirretään elävänä pallon
 * LAATTAKERROKSEEN (js/pallolaatat.js), ja portti lukee sen
 * `pyramidi.varitasot[ISO]`-taulusta.
 *
 * "Molempien luetteloiden päivittäminen samassa ajossa" tarkoittaa
 * siis TÄTÄ: pyramidi.json:in on säilytettävä se pohjan `versio`,
 * jonka laatat.json jo nimeää. Uusi luettelo, joka vaihtaisi pohjan
 * version, sammuttaisi kerroksen — ja sen tämä työkalu näkee ennen
 * kuin yhtään tavua on ämpärissä.
 *
 * Poistumiskoodi 0 = kerros näkyy ja väri on päällä; 1 = ei.
 */
import { readFileSync } from 'node:fs';
import { lepokerroksenKerrokset } from '../js/pallolaatat.js';
import { varitasonKansio } from '../js/laattapyramidi.js';

const argv = process.argv.slice(2);
const valitsin = (nimi, oletus = null) => {
  const i = argv.indexOf(`--${nimi}`);
  return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : oletus;
};
const PALLO = valitsin('pallo');
const PYRAMIDI = valitsin('pyramidi');
const MAA = (valitsin('maa') ?? '').toUpperCase() || null;
/* `--vain-pohja`: vaadi vain, että laattakerros on ylipäätään päällä. */
const VAIN_POHJA = argv.includes('--vain-pohja');

if (!PALLO || !PYRAMIDI) {
  console.error('Käyttö: node tools/tarkista-varitason-portti.mjs '
    + '--pallo <laatat.json> --pyramidi <pyramidi.json> [--maa ISO] [--vain-pohja]');
  process.exit(2);
}

const pallo = JSON.parse(readFileSync(PALLO, 'utf8'));
const pyramidi = JSON.parse(readFileSync(PYRAMIDI, 'utf8'));
const kerrokset = lepokerroksenKerrokset(pallo, pyramidi, MAA);

console.log(`  pallon sarja    versio ${pallo.versio} · viivat ${pallo.viivat ?? '–'} `
  + `· nostot ${pallo.nostot ?? '–'} · ranta ${pallo.ranta ?? '–'}`);
console.log(`  pyramidi        versio ${pyramidi.versio} · viivataso ${pyramidi.viivataso?.versio ?? '–'} `
  + `· nostotaso ${pyramidi.nostotaso?.versio ?? '–'} · rantataso ${pyramidi.rantataso?.versio ?? '–'}`);
const kirjaus = MAA ? (pyramidi.varitasot?.[MAA] ?? null) : null;
console.log(`  varitasot[${MAA ?? '–'}]  ${kirjaus
  ? `versio ${kirjaus.versio} · paletti ${kirjaus.paletti} · tasot ${kirjaus.tasot?.join(',')}`
  : 'EI KIRJAUSTA'}`);
/*
 * POLKU NÄKYVIIN (14.9.2026). Kaistat-raportin luku 5: 27 maan laatat
 * kirjoitettiin samaan avaimeen, eikä luettelosta voinut nähdä sitä —
 * kirjaukset olivat kumpikin kelvollisia. Nyt portti tulostaa sen
 * osoitteen, jota peli TODELLA pyytää, samasta funktiosta jota peli
 * käyttää. Vanha kirjaus (ei `maaPolussa`) näkyy maattomana polkuna,
 * uusi maakohtaisena — ja ero on silmällä nähtävissä ajon lokissa.
 */
if (kirjaus) {
  console.log(`  laattapolku     julisteet/pyramidi/${varitasonKansio(kirjaus)}`
    + '/z<taso>/<sarake>/<rivi>.webp'
    + (kirjaus.maaPolussa ? '' : '   (VANHA MAATON POLKU)'));
}
console.log(`  kerrokset       ${JSON.stringify(kerrokset)}`);

if (!kerrokset) {
  console.error('::error::VERSIOPORTTI SAMMUTTAISI KOKO LAATTAKERROKSEN — '
    + 'pallon sarja ja pyramidi eivät ole samaa versiota. Ämpäriin ei saa viedä tätä luetteloa.');
  process.exit(1);
}
if (VAIN_POHJA) {
  console.log('  TULOS           laattakerros on päällä.');
  process.exit(0);
}
if (!kerrokset.vari) {
  console.error(`::error::Laattakerros on päällä mutta ${MAA}:n väritaso EI ole — `
    + 'varitasot-kirjaus puuttuu tai on tyhjä.');
  process.exit(1);
}
console.log(`  TULOS           laattakerros on päällä ja ${MAA}:n väritaso näkyy.`);
