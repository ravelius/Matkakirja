/*
 * NOSTON VUODET (C 14: sääntö testiksi; Pelikoodari 17.11.2026, suunnitelma 20261117-noston-vuosiluvut luku 1, omistaja P-261117-70–72).
 * SK kirjoittaa noston `vuodet`-rivit käsin koneen ehdotuksista (tools/sisalto/vuosiehdokkaat.mjs). Rivi nostaa väitteen otsikkotasolle,
 * joten sen on vastattava tekstiä: `kohta` on sanatarkka pätkä luettavasta tekstistä TASAN KERRAN (se on myös ajoituksen ankkuri:
 * malli tests/fokusvirta.test.mjs, huudahduksen kohta), vuosi sisältyy kohtaan, rivejä ≤ 12 (järkevyysraja, ei katto), selite 1–3 sanaa ja ≤ 20 merkkiä,
 * rivit tekstin järjestyksessä. Kun tekstiä korjataan, rikkoutunut kohta kaatuu tähän eikä jää lappuun väärää väitettä.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { kaikkiNostot, vuosiEhdokkaat, vuosiVirheet } from '../tools/sisalto/noston-vuodet.mjs';
import { nostonVuodet } from '../tools/vienti/vuodet.mjs';

const nostot = kaikkiNostot();

test('noston vuodet: rivit vastaavat tekstiä (kohta tasan kerran, vuosi kohdassa, ≤ 5, selite ≤ 20, järjestys)', () => {
  const virheet = [];
  for (const x of nostot) for (const v of vuosiVirheet(x.teksti, x.vuodet)) virheet.push(`${x.avain} (${x.tiedosto}): ${v}`);
  assert.deepEqual(virheet, [], 'korjaa rivit (node tools/sisalto/vuosiehdokkaat.mjs --tarkista)');
});

/*
 * LUETTELO VAIN PIENENEE (malli tests/korostukset.test.mjs ja nostolahteet): nostot, joiden tekstissä on vuosia mutta ei kenttää.
 * Uusi nosto vuosineen ei saa tulla ilman kenttää; kun SK lisää kentän, rivi poistetaan luettelosta
 * (node tools/sisalto/vuosiehdokkaat.mjs --karsi-luettelo).
 */
test('noston vuodet: luettelo nostoista ilman kenttää vain pienenee', () => {
  const luettelo = new Set(readFileSync(new URL('./fixtures/noston-vuodet-puuttuvat.txt', import.meta.url), 'utf8')
    .split('\n').map((r) => r.trim()).filter(Boolean));
  const puuttuu = nostot.filter((x) => !x.vuodet && vuosiEhdokkaat(x.teksti).length).map((x) => x.avain);
  const uudet = puuttuu.filter((a) => !luettelo.has(a));
  assert.deepEqual(uudet, [], 'uusi nosto vuosineen ilman kenttää vuodet (SK: lisää kenttä; ei luetteloon)');
  const kentalla = nostot.filter((x) => x.vuodet && luettelo.has(x.avain)).map((x) => x.avain);
  assert.deepEqual(kentalla, [], 'kenttä lisätty: poista rivi luettelosta (node tools/sisalto/vuosiehdokkaat.mjs --karsi-luettelo)');
});

test('noston vuodet: tunnistin löytää suunnitelman koenoston vuodet (Palais Garnier) eikä vuosisatoja tai määriä', () => {
  // Palais Garnier -nähtävyysjuttu poistui, kun paikasta tuli jaksonosto (SK 18.11.2026, fokuskohde palais-garnier);
  // tunnistimen koeteksti on sama vanha teksti sellaisenaan.
  const g = {
    teksti: 'Uuden oopperatalon suunnittelukilpailu julkistettiin joulukuussa 1860, ja siihen osallistui 171 kilpailijaa. '
      + 'Voittajaksi julistettiin toukokuussa 1861 yksimielisesti nuori Charles Garnier, joka ei ollut vielä vakiinnuttanut '
      + 'asemaansa — viimeinen sana valinnassa oli keisari Napoleon III:lla.\n\nPaikka oli hankala: paroni Haussmannin '
      + 'osoittama tontti oli vinoneliön muotoinen, ja sen ympärille oli tulossa korkeita taloja. Peruskivi muurattiin vuonna '
      + '1862, ja talo avattiin vuonna 1875.\n\nTaloa sanottiin pitkään yksinkertaisesti Pariisin oopperaksi. Nimi vaihtui '
      + 'arkkitehdin mukaan vasta 1989, kun Opéra Bastille valmistui.',
  };
  assert.deepEqual(vuosiEhdokkaat(g.teksti).map((e) => e.vuosi), ['1860', '1861', '1862', '1875', '1989']);
  assert.deepEqual(vuosiEhdokkaat('1800-luvulla 1 200 kävijää ja 2 500 metriä; vuosina 1876–1878 ja 19 eaa. sekä 450 metriä')
    .map((e) => e.vuosi), ['1876–1878']);
  for (const e of vuosiEhdokkaat(g.teksti)) assert.equal(g.teksti.split(e.kohta).length - 1, 1, `kohta "${e.kohta}" ei yksikäsitteinen`);
});

test('noston vuodet: säännöt kaatavat väärät rivit', () => {
  const t = 'Peruskivi muurattiin vuonna 1862, ja talo avattiin vuonna 1875.';
  assert.deepEqual(vuosiVirheet(t, [{ kohta: 'vuonna 1862', vuosi: '1862', selite: 'peruskivi' }]), []);
  assert.equal(vuosiVirheet(t, [{ kohta: 'vuonna 1863', vuosi: '1863', selite: 'x' }]).length, 1);   // ei tekstissä
  assert.equal(vuosiVirheet(t, [{ kohta: 'vuonna 1862', vuosi: '1875', selite: 'x' }]).length, 1);   // vuosi ei kohdassa
  assert.equal(vuosiVirheet(t, [{ kohta: 'vuonna 1875', vuosi: '1875', selite: 'avattiin' },
    { kohta: 'vuonna 1862', vuosi: '1862', selite: 'peruskivi' }]).length, 1);                      // järjestys
  assert.ok(vuosiVirheet(t, [{ kohta: 'vuonna 1862', vuosi: '1862', selite: 'hyvin pitkä selite yli rajan' }]).length >= 1);
  assert.equal(vuosiVirheet(t, Array(13).fill(0).map(() => ({ kohta: 'vuonna 1862', vuosi: '1862', selite: 'a' }))).length, 1,
    '13 riviä ylittää järkevyysrajan 12');
});

test('noston vuodet: vienti välittää rivit sellaisenaan merkkijonoina (skeema 1.74)', () => {
  assert.equal(nostonVuodet(undefined), null);
  assert.equal(nostonVuodet([]), null);
  assert.deepEqual(nostonVuodet([{ kohta: 'vuonna 1862', vuosi: 1862, selite: 'peruskivi' }]),
    [{ kohta: 'vuonna 1862', vuosi: '1862', selite: 'peruskivi' }]);
});
