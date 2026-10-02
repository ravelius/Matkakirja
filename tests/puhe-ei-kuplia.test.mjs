// PUHE ÄÄNENÄ, EI KUPLANA (omistaja 2.10.2026 klo 14.09): äänite ensin, kupla vain jos ääntä ei tule tai se ei
// käynnisty (js/liviapuhe.js puhuTaiKupla, js/pollo.js Pollo.puheTaiKupla).
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { puhuTaiKupla } from '../js/liviapuhe.js';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');

class ValeAani {
  constructor() { this.kuuntelijat = {}; this.ended = false; this.currentTime = 0; }
  addEventListener(nimi, f) { (this.kuuntelijat[nimi] ??= []).push(f); }
  laukaise(nimi) { for (const f of this.kuuntelijat[nimi] ?? []) f(); }
}

test('ääntä ei tule → kupla heti', () => {
  let kuplia = 0;
  const { audio, kupla } = puhuTaiKupla(() => null, () => { kuplia += 1; return 'kupla'; });
  assert.equal(audio, null);
  assert.equal(kupla, 'kupla');
  assert.equal(kuplia, 1);
});

test('ääni soi → ei kuplaa, chat-loki; lataus kaatuu → kupla varalta kerran', () => {
  const a = new ValeAani();
  let kuplia = 0; let lokiin = 0;
  const { audio, kupla } = puhuTaiKupla(() => a, () => { kuplia += 1; }, { ilmanKuplaa: () => { lokiin += 1; }, varaMs: 50 });
  assert.equal(audio, a);
  assert.equal(kupla, true);
  assert.equal(kuplia, 0);
  assert.equal(lokiin, 1);
  a.laukaise('error');
  a.laukaise('error');
  assert.equal(kuplia, 1);
});

test('ääni ei käynnisty varaajassa → kupla varalta; käynnistyi → ei kuplaa', async () => {
  const jumissa = new ValeAani();
  let kuplia = 0;
  puhuTaiKupla(() => jumissa, () => { kuplia += 1; }, { varaMs: 20 });
  await new Promise((ok) => { setTimeout(ok, 40); });
  assert.equal(kuplia, 1);
  const soi = new ValeAani();
  let kuplia2 = 0;
  puhuTaiKupla(() => soi, () => { kuplia2 += 1; }, { varaMs: 20 });
  soi.currentTime = 0.4;
  soi.laukaise('playing');
  await new Promise((ok) => { setTimeout(ok, 40); });
  assert.equal(kuplia2, 0);
});

test('kutsupaikat: Livian avaus, paljastus, mannerivihje, sähkepaluu ja Pollon puheenvuoron osat puhuvat ensin', () => {
  const livia = lue('../js/livia.js');
  for (const lahde of ["'avaus', rivi.indeksi", "'paljastus', i", "'mannerivihje', 0"]) {
    assert.ok(livia.includes(`() => soitaLivianAani(ui, ${lahde}`), lahde);
  }
  assert.match(lue('../js/fokusvirta.js'), /puhuTaiKupla\(\n\s*\(\) => soitaLivianKaupunkiAani\(ui, city\?\.id, kentta, \{ kupla: i, teksti \}\),/);
  const pollo = lue('../js/pollo.js');
  assert.match(pollo, /const voiPuhua = Boolean\(aani\) && !this\.nappi\.hidden && !this\.auki;/);
  // Tarkennetut poikkeukset (Päätoimittaja 2.10.2026): muotokuvarepliikistä jää äänen kanssa vain kuva, lehtivinkistä
  // ympyröity avainsana lehdessä tai yksinään kuplassa; ilman ääntä molemmat kuplat kuten ennen.
  assert.match(livia, /muotokuva \? kupla\(true\) : polloPuheIlmanKuplaa\(teksti\)/);
  assert.match(pollo, /if \(vainKuva\) \{[\s\S]{0,120}kupla\.append\(kuvapaikka\);/);
  const fokus = lue('../js/fokusvirta.js');
  assert.match(fokus, /\(\) => soitaLivianAani\(ui, 'lehtivinkki', 0, \{ teksti: LIVIAN_LEHTIVINKKI \}\),\n\s*\(\) => kuplaan\(LIVIAN_LEHTIVINKKI\),/);
  assert.match(fokus, /lehdenAvainsana\(ui\.arrivalDialog, LIVIAN_LEHTIVINKIN_SANA\);\n\s*if \(!lehdessa\) return kuplaan\(LIVIAN_LEHTIVINKIN_SANA\);/);
  assert.match(lue('../css/styles.css'), /\.pollo-vihje-muotokuva\.pollo-vihje-vain-kuva \{/);
});

test('lehdenAvainsana löytää lehden näkyvän tekstisolmun avainsanan ja ohittaa piilotetut', async () => {
  const { lehdenAvainsana } = await import('../js/fokusvirta.js');
  const teksti = (data) => ({ nodeType: 3, data });
  const el = (solmut, piilossa = false) => ({ childNodes: solmut, closest: () => (piilossa ? {} : null) });
  const piilo = el([teksti('Tämän sivun aarrekysymys')], true);
  const osuma = el([teksti('Lehden aarrekysymys: missä?')]);
  const lehti = { querySelectorAll: () => [el([teksti('Uutisia')]), piilo, osuma] };
  assert.equal(lehdenAvainsana(lehti, 'aarrekysymys'), osuma);
  assert.equal(lehdenAvainsana({ querySelectorAll: () => [piilo] }, 'aarrekysymys'), null);
  assert.equal(lehdenAvainsana(null, 'aarrekysymys'), null);
});
