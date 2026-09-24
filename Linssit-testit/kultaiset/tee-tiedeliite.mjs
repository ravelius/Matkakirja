// Tiedeliitteen kultaiset arvot (js/tiedeliite.js onTiedeliitteenSivu, tiedeliitteenNaapurit,
// tiedeliitteenKuvat; js/ui-apurit.js jaaKappaleiksi; kuvatekstit.js lyhyt/pitkä) keksintöjen
// kaarella (LINSSI.aikajana.tapahtumat vuoden mukaan kuten web jarjestaTapahtumat).
//
// Käyttö: node tee-tiedeliite.mjs [pelin checkout]
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const tama = dirname(fileURLToPath(import.meta.url));
const juuri = process.argv[2] ?? '/Users/Shared/Claude/wt/linssiseppa-webmain';
const U = await import(join(juuri, 'js/ui-apurit.js'));
const T = await import(join(juuri, 'js/tiedeliite.js'));
const KT = await import(join(juuri, 'js/kuvatekstit.js'));
const { LINSSI } = await import(join(juuri, 'js/linssit/keksinnot.js'));

const tapahtumat = (LINSSI.aikajana.tapahtumat ?? []).map((t, n) => ({ t, n }))
  .sort((a, b) => a.t.vuosi - b.t.vuosi || a.n - b.n).map((x) => x.t);
const kuva = (k) => (k ? { lyhyt: KT.kuvatekstiLyhyt(k), pitka: KT.kuvatekstiPitka(k) } : null);
const sivut = tapahtumat.map((t, i) => {
  const { kasvot, ilmiot } = T.tiedeliitteenKuvat(t);
  return {
    i, vuosi: t.vuosi, sivu: T.onTiedeliitteenSivu(t), naapurit: T.tiedeliitteenNaapurit(tapahtumat, i),
    paikkarivi: [t.ajoitus ?? t.vuosi, t.paikka ?? t.kaupunki ?? ''].filter(Boolean).join(' · '),
    ingressi: U.jaaKappaleiksi(t.selite ?? ''), juttu: U.jaaKappaleiksi(t.juttu ?? ''),
    henkilojuttu: U.jaaKappaleiksi(t.henkilojuttu ?? ''),
    kasvot: kasvot.length, ilmiot: ilmiot.length, aito: Boolean(t.kuvaAito && kasvot.includes(t.kuvaAito)),
    kuva: kuva(t.kuva), aitoKuva: kuva(t.kuvaAito), ilmio: kuva(t.ilmio),
  };
});
// Kappalejaon rajatapaukset.
const tekstit = ['', 'Yksi virke.', 'Yksi. Kaksi.', 'Yksi. Kaksi. Kolme.', 'Vuonna 1783 ihminen lensi. Se oli 2. kerta? Ei! "Lainaus" alkaa. Ä-alku. é pieni.',
  'Kappale yksi.\n\nKappale kaksi.\n\n\nKolme.', '  Tyhjää ympärillä. Kaksi. Kolme. Neljä.  '];
writeFileSync(join(tama, 'tiedeliite.json'), JSON.stringify({ sivut, kappaleet: tekstit.map((t) => [t, U.jaaKappaleiksi(t)]) }, null, 1));
console.log('sivuja', sivut.length, 'tiedeliitteen sivuja', sivut.filter((s) => s.sivu).length);
