/*
 * MITTANAUHA: MONELTAKO NOSTOLTA NIMIÖ PUTOAA — JA MIKSI.
 *
 * Tämä ei ole savuke vaan MITTA. Omistajan kuvakaappaus 1.9.2026 aamu
 * (iPad, Bulgaria): *"osalta nostoista puuttuu nimiö poltetuista
 * laatoista"* — ja Koillis-Bulgarian harvassa maastossa pudotus ei
 * näyttänyt törmäykseltä. Väistö (js/fokuskohteet.js
 * paivitaKohdeNimiot) vain vaikenee, joten syytä ei voi tietää ilman
 * mittaa; tämä ajaa saman ladonnan kuin laattageneraattori ja lukee
 * pudotuksen syyn merkki kerrallaan.
 *
 * SELAINTA EI TARVITA. Ladonta on Raamatun ehdon mukaan puhdas funktio
 * laudan datasta (js/nostoladonta.js), joten sama laskenta ajaa
 * Nodessa. Laattoja EI renderöidä: pyramidin ajo on erikseen
 * luvitettava työnkulku.
 *
 * Ajo:
 *   node tools/savukkeet/mittaa-nostonimiot.mjs          koko maailma
 *   node tools/savukkeet/mittaa-nostonimiot.mjs BGR      + maan rivit
 *
 * TULOS on kolme lukua ja yksi taulukko:
 *   1. nimellisiä nostoja (merkki, jolla on kartalle tuleva nimi)
 *   2. nimiöttömiä (kohteenNimio päätti, että nimi on jo kartalla —
 *      kaupungin oma nimi tai laattaan poltettu maastonimi)
 *   3. pudonneita (väistö ei löytänyt yhdellekään neljästä kyljelle
 *      tilaa) ja niiden syyt kyljittäin
 */
import { FOKUS_POHJAT } from '../../js/packs/fokus-grc.js';
import { MAAILMANKARTTA } from '../../js/packs/maailmankartta.js';
import {
  eritteleKohdeRyhmat, kohdeKarttarivit, kohdeMerkinLadonta, paivitaKohdeNimiot,
} from '../../js/fokuskohteet.js';
import { niputaFokusmerkit } from '../../js/fokusniput.js';
import { nostoladontaSkaala } from '../../js/nostoladonta.js';
import { nostoKarttarivit, nostoKaupunginPooli } from '../../js/fokusnosto.js';
import { skandaaliKarttarivit } from '../../js/skandaalit.js';
import { syvennysKarttarivit } from '../../js/syvennys.js';

const KOHDEMAA = process.argv[2] ?? null;
const pack = MAAILMANKARTTA;

let nimellisia = 0;
let nimiottomia = 0;
let pudonneita = 0;
const syittain = new Map();
const maittain = new Map();

for (const [iso, pohja] of Object.entries(FOKUS_POHJAT)) {
  if (pohja.lauta !== pack.id) continue;
  const rajaus = pohja?.rajaus;
  const bbox = pohja?.bbox;
  const s = nostoladontaSkaala(rajaus);
  if (!(s > 0) || !bbox) continue;
  const taulu = pack.map?.cityCountry ?? {};
  const kaupungit = (pack.cities ?? []).filter((c) => taulu[c.id] === iso);
  const pohjanAlla = (x, y) => x >= bbox.x && x <= bbox.x + bbox.w
    && y >= bbox.y && y <= bbox.y + bbox.h;
  /*
   * TÄKYPOOLI ENSIMMÄISESTÄ KAUPUNGISTA — sama kuin poltossa
   * (tools/fokuskartta/nostot.mjs). Mitta ei ota kantaa siihen, onko
   * maa poltettava; se mittaa LADONTAA, ja ladonnassa täky on mukana
   * myös estetyissä maissa.
   */
  const pooli = kaupungit.length ? nostoKaupunginPooli(iso, kaupungit[0].id) : [];
  const { rivit: takyRivit } = nostoKarttarivit(pooli, pack.id);
  const lisat = [
    ...syvennysKarttarivit(iso, pack.id, taulu).map(({ kohde, paikka }) => ({ kohde, paikka })),
    ...skandaaliKarttarivit(iso, pack.id).map(({ kohde, paikka }) => ({ kohde, paikka })),
    ...takyRivit.map(({ kohde, paikka }) => ({ kohde, paikka })),
  ];
  const rivit = kohdeKarttarivit({
    iso, lauta: pack.id, kaupungit, pohjanAlla, lisat,
  });
  if (!rivit.length) continue;
  const ui = {
    fokusmoodi: true,
    katselu: false,
    game: { pack, cityOf: () => kaupungit[0] ?? null },
    fokusPohjaRajaus: rajaus,
    fokusPohjaBbox: bbox,
    fokusPohjanAlla: pohjanAlla,
    kiertoKohdat: (x) => [x],
    fokuskohdeKaupungit: kaupungit,
    fokuskohdeAvain: `${iso}:mitta`,
    fokuskohdeEroAvain: null,
    fokuskohdeNimioAvain: null,
    fokuskohdeRyhmat: [],
    // Kirjanpito päälle: pelissä tämä kenttä on tyhjä eikä väistö
    // kirjaa mitään (js/fokuskohteet.js kirjaaNimionPudotus).
    fokuskohdeNimioSyyt: new Map(),
  };
  ui.fokuskohdeRyhmat = rivit.map(({ kohde, paikka }) => ({
    id: kohde.id, x: paikka.x, y: paikka.y, kohde, ...kohdeMerkinLadonta(ui, kohde),
  }));
  niputaFokusmerkit(ui, s);
  eritteleKohdeRyhmat(ui, s);
  paivitaKohdeNimiot(ui, s);
  for (const r of ui.fokuskohdeRyhmat) {
    if (!r.nimi) {
      nimiottomia += 1;
      if (KOHDEMAA === iso) {
        console.log(`  ${iso} ${r.id.padEnd(30)} — ei nimiötä (nimi on jo kartalla)`);
      }
      continue;
    }
    nimellisia += 1;
    if (r.nimioNakyy !== false) continue;
    pudonneita += 1;
    maittain.set(iso, (maittain.get(iso) ?? 0) + 1);
    const syyt = ui.fokuskohdeNimioSyyt.get(r.id) ?? [];
    const avain = syyt.map((x) => `${x.puoli}:${x.este}`).sort().join(' + ');
    syittain.set(avain, (syittain.get(avain) ?? 0) + 1);
    if (KOHDEMAA === iso) {
      console.log(`  ${iso} ${r.id.padEnd(30)} "${r.nimi}" -> ${avain}`);
    }
  }
}

console.log(`\nnimellisiä nostoja   ${nimellisia}`);
console.log(`nimiöttömiä          ${nimiottomia}  (nimi on kartalla jo muuta kautta)`);
console.log(`nimiö pudonnut       ${pudonneita}  `
  + `(${((100 * pudonneita) / Math.max(1, nimellisia)).toFixed(1)} %)`);
console.log('\npudotukset maittain:');
console.log(`  ${[...maittain].sort((a, b) => b[1] - a[1])
  .map(([k, v]) => `${k}:${v}`).join(' ')}`);
console.log('\npudotuksen syy (kaikki neljä kylkeä):');
for (const [avain, n] of [...syittain].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(n).padStart(3)}  ${avain}`);
}
