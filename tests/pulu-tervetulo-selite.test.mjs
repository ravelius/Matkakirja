/*
 * PULUN TERVETULO EI VAIENNA ITSEÄÄN SELITTEEN LUENNALLA (löydös:
 * Linssiseppä 1 / Päätoimittaja 29.9.2026, PR ravelius/Matkakirja#3575).
 *
 * JUURISYY (alkuperäinen A–C-jakso): C1 avasi väärän kohteen valokuvan
 * tervetulon omalla avaaKohde-kutsulla, ja kuvan avautuessa satelliitti.js:n
 * `nayta()` kutsui automaattisesti `lueSelite(h)`:tä, joka käynnisti
 * kertoja-äänisen striimiluennan (js/lukija.js lueAaneen). Kertoja
 * merkittiin puhujaksi (js/luenta.js merkitsePuhuja), ja koska
 * js/liviapuhe.js:n soitaLivianAani ei ala kertojan päälle, C2:n Livian
 * ääni jäi soimatta.
 *
 * KORJAUS JÄÄ VOIMAAN, vaikka B ja C poistuivat (omistaja 29.9.2026):
 * satelliitti.js:n avaaHavaintokortti saa parametrin
 * `automaattiluentaSallittu`, ja `lueSelite` ohittaa automaattisen
 * luennan, kun se on false. `avaaKohde` laskee arvon `tervetuloKesken()`-
 * apufunktiolla ('odottaa' ja 'puhuu' ovat kesken olevat vaiheet), joten
 * kuva, joka aukeaa paljastuksen ja A1:n välissä, ei vaienna tervetuloa.
 *
 * Tämä testi varmistaa kaksi asiaa ilman selainta (satelliitti.js:n
 * avaaHavaintokortti vaatii oikean DOM:n, samoin kuin
 * tests/astronautin-kuvaselain.test.mjs perustelee — lähdetekstin
 * rakenne riittää sille osalle):
 *
 *   1. LÄHDETEKSTI: portti on oikeasti kytketty lueSelitteeseen,
 *      avaaHavaintokorttiin ja avaaKohteeseen, ja tervetuloKesken
 *      käyttää samaa vaihe-tarkistusta kuin pulu-taulu.js.
 *   2. KÄYTTÄYTYMINEN: aloitaPulunTervetulo()-kahvan tila().vaihe — jota
 *      tervetuloKesken lukee — on 'odottaa' tai 'puhuu' koko A1:stä
 *      A2:n loppuun asti, ja siirtyy päättyneeksi ('valmis') heti jakson
 *      jälkeen tai ('ohitettu') heti ohituksesta.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { aloitaPulunTervetulo, nollaaPulunTervetuloIstunto } from '../js/linssit/pulu-tervetulo.js';
import { pulunIssRepliikki } from '../js/linssit/pulu-iss.js';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');
const lahde = lue('../js/linssit/satelliitti.js');

/* ---------- 1. lähdeteksti: portti kytketty ---------- */

test('lueSelite ohittaa automaattisen luennan, kun automaattiluentaSallittu() on false', () => {
  assert.match(
    lahde,
    /function lueSelite\(h\) \{\s*if \(!luentaKytkinPaalla\(\)\) return;\s*(?:\/\*[\s\S]*?\*\/\s*)?if \(!automaattiluentaSallittu\(\)\) return;/,
  );
});

test('avaaHavaintokortti ottaa automaattiluentaSallittu-parametrin (oletus: sallittu)', () => {
  assert.match(
    lahde,
    /function avaaHavaintokortti\(\{\s*kohde, valikko, onSuljettu, alkuIndeksi, sisaan = 0, siirry = null, naapuriKohde = null,\s*automaattiluentaSallittu = \(\) => true,/,
  );
});

test('avaaKohde antaa automaattiluentaSallittu: () => !tervetuloKesken() joka avaukselle', () => {
  assert.match(lahde, /automaattiluentaSallittu: \(\) => !tervetuloKesken\(\),/);
  // Sama tervetulo-kahva, jonka vaihetta portti lukee.
  assert.match(lahde, /const tervetulo = avaruus && PULUN_TERVETULO_KAYTOSSA \? vaihe\('pulun-tervetulo', \(\) => aloitaPulunTervetulo\(\{/);
});

test('omistaja 29.9.: Pulun ääni toistaiseksi pois ISS-kohtauksesta (tervetulo ei ala)', async () => {
  const { PULUN_TERVETULO_KAYTOSSA } = await import('../js/linssit/pulu-tervetulo.js');
  assert.equal(PULUN_TERVETULO_KAYTOSSA, false);
});

test('tervetuloKesken käyttää samaa vaihe-tarkistusta kuin pulu-taulu.js:n automaattiKierros', () => {
  const taulu = lue('../js/linssit/pulu-taulu.js');
  assert.match(lahde, /const tervetuloKesken = \(\) => \{\s*if \(!tervetulo\) return false;\s*let vaihe = null;\s*try \{ vaihe = tervetulo\.tila\?\.\(\)\?\.vaihe \?\? null; \} catch \{ vaihe = null; \}\s*return \['odottaa', 'puhuu'\]\.includes\(vaihe\);\s*\};/);
  assert.match(taulu, /const tervetuloKesken = \(\) => \{\s*let vaihe = null;\s*try \{ vaihe = tervetulo\?\.tila\?\.\(\)\?\.vaihe \?\? null; \} catch \{ vaihe = null; \}\s*return \['odottaa', 'puhuu'\]\.includes\(vaihe\);\s*\};/);
});

/* ---------- 2. käyttäytyminen: tila().vaihe koko A1–A2:n ajan ---------- */

function luoKello() {
  let nyt = 0;
  let seuraavaId = 1;
  const jono = new Map();
  return {
    setTimeout(fn, ms) {
      const id = seuraavaId++;
      jono.set(id, { fn, aika: nyt + Math.max(0, Number(ms) || 0) });
      return id;
    },
    clearTimeout(id) { jono.delete(id); },
    kulje(ms) {
      const loppu = nyt + ms;
      for (;;) {
        let seuraava = null;
        for (const [id, t] of jono) if (t.aika <= loppu && (!seuraava || t.aika < seuraava[1].aika)) seuraava = [id, t];
        if (!seuraava) break;
        jono.delete(seuraava[0]);
        nyt = seuraava[1].aika;
        seuraava[1].fn();
      }
      nyt = loppu;
    },
  };
}

function luoSoitin() {
  const kuuntelijat = new Map();
  return {
    paused: true,
    addEventListener(nimi, fn) { (kuuntelijat.get(nimi) ?? kuuntelijat.set(nimi, new Set()).get(nimi)).add(fn); },
    removeEventListener(nimi, fn) { kuuntelijat.get(nimi)?.delete(fn); },
    laukaise(nimi) { for (const fn of [...(kuuntelijat.get(nimi) ?? [])]) fn(); },
  };
}

function luoPuhuja() {
  const sanotut = [];
  const soittimet = [];
  return {
    sanotut,
    soittimet,
    sano: (_ui, repliikki) => {
      sanotut.push(repliikki.avain);
      const audio = luoSoitin();
      soittimet.push(audio);
      return { audio, repliikki };
    },
  };
}

function luoKamera() {
  return {
    paljastettu: () => true,
    aloitustila: () => ({ pov: { lat: 10, lng: 20, altitude: 3 }, seuranta: true, pyori: false }),
    katsoKohteeseen: () => true,
    palaaAloitukseen: () => true,
  };
}

function luoMuisti() {
  const data = new Map();
  return { getItem: (k) => data.get(k) ?? null, setItem: (k, v) => data.set(k, String(v)), data };
}

function luoDokumentti() {
  const kuuntelijat = new Map();
  return {
    addEventListener(nimi, fn) { (kuuntelijat.get(nimi) ?? kuuntelijat.set(nimi, new Set()).get(nimi)).add(fn); },
    removeEventListener(nimi, fn) { kuuntelijat.get(nimi)?.delete(fn); },
    napauta() { for (const fn of [...(kuuntelijat.get('pointerdown') ?? [])]) fn(); },
  };
}

const avaimesta = (avain) => {
  const [, ryhma, n] = /^iss-([a-d])-(\d+)$/.exec(avain);
  return [ryhma, Number(n) - 1];
};

function soitaLoppuun(kello, puhuja) {
  const audio = puhuja.soittimet.at(-1);
  const repliikki = pulunIssRepliikki(...avaimesta(puhuja.sanotut.at(-1)));
  audio.paused = false;
  audio.laukaise('playing');
  kello.kulje(repliikki.kestoMs);
  audio.laukaise('ended');
}

/** Vastaa satelliitti.js:n tervetuloKesken()-apufunktiota. */
const kesken = (kahva) => ['odottaa', 'puhuu'].includes(kahva.tila().vaihe);

test.beforeEach(() => nollaaPulunTervetuloIstunto());

test('tervetulo: automaattiluenta on estetty jo odotusvaiheessa (ennen A1:tä)', () => {
  const kahva = aloitaPulunTervetulo({
    avaruus: luoKamera(), kello: luoKello(), varasto: luoMuisti(), doc: luoDokumentti(),
    sano: luoPuhuja().sano, mykistetty: () => false,
  });
  assert.ok(kahva);
  assert.equal(kesken(kahva), true, 'odottaa-vaihe estää automaattiluennan jo ennen A1:tä');
});

test('tervetulo: A1–A2 asti kesken, ja heti A2:n jälkeen luenta vapautuu (valmis)', () => {
  const kello = luoKello();
  const puhuja = luoPuhuja();
  const kahva = aloitaPulunTervetulo({
    avaruus: luoKamera(), kello, varasto: luoMuisti(), doc: luoDokumentti(), sano: puhuja.sano,
    mykistetty: () => false,
  });
  kello.kulje(1000); // verho pois + hengähdys → A1 alkaa
  assert.equal(puhuja.sanotut.at(-1), 'iss-a-1');
  assert.equal(kesken(kahva), true);
  soitaLoppuun(kello, puhuja);
  assert.equal(kesken(kahva), true, 'hengähdys A1:n ja A2:n välissä on yhä kesken');
  kello.kulje(400); // A1 → A2
  assert.equal(puhuja.sanotut.at(-1), 'iss-a-2');
  assert.equal(kesken(kahva), true);
  soitaLoppuun(kello, puhuja); kello.kulje(400); // A2 loppuu → jakso valmis
  assert.equal(kahva.tila().vaihe, 'valmis');
  assert.equal(kesken(kahva), false, 'jakson jälkeen automaattiluenta vapautuu');
});

test('tervetulo: ohitus vapauttaa automaattiluennan heti (vaihe muuttuu ohitetuksi)', () => {
  const kello = luoKello();
  const puhuja = luoPuhuja();
  const doc = luoDokumentti();
  const kahva = aloitaPulunTervetulo({
    avaruus: luoKamera(), kello, varasto: luoMuisti(), doc, sano: puhuja.sano,
    mykistetty: () => false,
  });
  kello.kulje(1000);
  assert.equal(kesken(kahva), true);
  doc.napauta(); // pelaaja ohittaa kesken A1:n
  assert.equal(kahva.tila().vaihe, 'ohitettu');
  assert.equal(kesken(kahva), false, 'ohitus vapauttaa automaattiluennan heti');
});
