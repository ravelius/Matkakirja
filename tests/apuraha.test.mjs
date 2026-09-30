// Apurahan esittelykortti (js/apuraha.js + assets/apuraha/esittely.json):
// sama tiedosto webille ja natiiville, joten sen muoto tarkistetaan tässä.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { tarkistaApuraha, lataaApuraha, nollaaApuraha, APURAHA_OSOITE } from '../js/apuraha.js';

const raaka = JSON.parse(readFileSync(new URL(`../${APURAHA_OSOITE}`, import.meta.url), 'utf8'));

test('esittely.json on kelvollinen: neljä kappaletta, 4–5 kuvaa, ei videota', () => {
  const d = tarkistaApuraha(raaka);
  assert.ok(d, 'tarkistus hylkäsi tiedoston');
  assert.equal(d.nappi, 'Apurahahakemus – katso tämä ensin');
  assert.equal(d.kappaleet.length, 4);
  assert.ok(d.kuvat.length >= 4 && d.kuvat.length <= 5, `kuvia ${d.kuvat.length}`);
  assert.equal('video' in raaka, false, 'video poistettiin (omistaja 30.9. klo 15.06)');
  assert.ok(d.webHuomautus.startsWith('Selainpeli ei sisällä kaikkia ominaisuuksia.'));
  // Selain saa webTekstit: ei lupauksia iOS:n kolmiulotteisista linsseistä.
  const kaikki = d.kappaleet.flatMap((k) => [k.teksti ?? '', ...(k.lista ?? [])]).join(' ');
  assert.ok(!/poikkileikkaus|esittelylinsseistä/.test(kaikki), kaikki);
  assert.ok(/vain iOS-sovelluksessa/.test(kaikki));
});

test('paikalliset kuvat ovat repossa ja tekstissä ei ole muistiinpanoja', () => {
  for (const k of raaka.kuvat) {
    if (k.tiedosto.startsWith('https://')) continue;
    assert.ok(existsSync(new URL(`../${k.tiedosto}`, import.meta.url)), `puuttuu ${k.tiedosto}`);
  }
  const teksti = JSON.stringify({ ...raaka, _ohje: '' });
  assert.ok(!/\[TARKISTA/.test(teksti), 'TARKISTA-merkintä näkyisi arvioijalle');
  assert.ok(!/App Store[^"]*https?:/.test(raaka.webHuomautus), 'testiversion linkkiä ei julkaista sivulla');
});

test('puutteellinen esittely ei näytä nappia', () => {
  assert.equal(tarkistaApuraha(null), null);
  assert.equal(tarkistaApuraha({ otsikko: 'x', kappaleet: [] }), null);
  assert.equal(tarkistaApuraha({ nappi: ' ', otsikko: 'x', kappaleet: [] }), null);
});

test('lataus epäonnistuu hiljaa ja tehdään kerran', async () => {
  nollaaApuraha();
  let kutsut = 0;
  const hae = async () => { kutsut += 1; return { ok: false }; };
  assert.equal(await lataaApuraha(hae), null);
  await lataaApuraha(hae);
  assert.equal(kutsut, 1);
  nollaaApuraha();
  assert.ok(await lataaApuraha(async () => ({ ok: true, json: async () => raaka })));
  nollaaApuraha();
});

test('esittelylinssit avaavat kehittäjätilan linssijoukon ilman kehittäjätilaa', async () => {
  const varasto = new Map();
  globalThis.localStorage = {
    getItem: (k) => (varasto.has(k) ? varasto.get(k) : null),
    setItem: (k, v) => { varasto.set(k, String(v)); },
    removeItem: (k) => { varasto.delete(k); },
  };
  const { omistetut } = await import('../js/linssit/omistus.js');
  const { avaaEsittelylinssit, esittelylinssitAuki } = await import('../js/apuraha.js');
  const pelaaja = { linssit: [] };
  const ennen = omistetut(null, pelaaja).size;
  varasto.set('matkakirja-kehittaja', '1');
  const kehittaja = omistetut(null, pelaaja).size;
  varasto.delete('matkakirja-kehittaja');
  assert.equal(esittelylinssitAuki(), false);
  avaaEsittelylinssit();
  assert.equal(esittelylinssitAuki(), true);
  assert.equal(varasto.get('matkakirja-kehittaja'), undefined, 'kehittäjätila ei saa kytkeytyä');
  assert.ok(kehittaja > ennen);
  assert.equal(omistetut(null, pelaaja).size, kehittaja);
  delete globalThis.localStorage;
});
