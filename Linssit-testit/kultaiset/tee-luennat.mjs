// Keksintöjen pysäkkiluentojen kultaiset arvot (js/linssipuhe.js luennanTiedosto,
// valinaytoksenRunko, kaarenPuheet, puheenTiiviste, LUENNAN_VIIVE_MS ja
// LINSSILUENTA_JUURI; js/linssit/keksinnot.js pysäkit).
//
// 1. Kopioi sisältöpaketin kokoelmat/linssiaineisto.json karsittuna paketti/-kansioon
//    (vain alkio linssiluennat; muut alkiot ovat suuria maskeja).
// 2. Kirjoittaa luennat.json: jokaiselle pysäkille webin tiedosto ja välinäytöksen
//    runko, esittelyn versiotiiviste, vakiot.
//
// Käyttö: node tee-luennat.mjs [pelin checkout] [sisältöpaketti]
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const tama = dirname(fileURLToPath(import.meta.url));
const juuri = process.argv[2] ?? '/Users/Shared/Claude/Matkakirja-linssiseppa';
const paketti = process.argv[3] ?? '/Users/Shared/Claude/sisalto-koe/v11';
const P = await import(join(juuri, 'js/linssipuhe.js'));
const { LINSSI, KEKSINNOT } = await import(join(juuri, 'js/linssit/keksinnot.js'));

const aineisto = JSON.parse(readFileSync(join(paketti, 'kokoelmat/linssiaineisto.json'), 'utf8'));
writeFileSync(join(tama, 'paketti', 'linssiaineisto.json'), JSON.stringify({
  ...aineisto,
  alkiot: aineisto.alkiot.filter((a) => a.id === 'linssiluennat'),
}));

const kaari = LINSSI.aikajana;
const tapahtumat = kaari.tapahtumat ?? KEKSINNOT;
const puheet = P.kaarenPuheet(kaari);
const esittely = puheet.find((p) => p.avain === 'esittely');
writeFileSync(join(tama, 'luennat.json'), JSON.stringify({
  juuri: P.LINSSILUENTA_JUURI,
  viiveMs: P.LUENNAN_VIIVE_MS,
  esittelynRunko: P.ESITTELYN_RUNKO,
  esittelynVersio: kaari.esittely?.teksti ? P.puheenTiiviste(kaari.esittely.teksti) : null,
  loppupuhe: Boolean(kaari.loppupuhe),
  pysakit: tapahtumat.map((t) => ({
    vuosi: t.vuosi,
    otsikko: t.otsikko,
    hiljainen: Boolean(t.hiljainen),
    tiedosto: P.luennanTiedosto(t),
    valinaytos: t.valinaytos ? P.valinaytoksenRunko(t) : null,
  })),
  puheet: puheet.map((p) => ({ avain: p.avain, runko: p.runko })),
}, null, 1));
console.log(`luennat: ${tapahtumat.length} pysäkkiä, puheet ${puheet.map((p) => p.avain).join(', ')}`);
