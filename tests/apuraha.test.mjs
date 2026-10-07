// Apurahan esittelykortti (js/apuraha.js + assets/apuraha/esittely.json):
// sama tiedosto webille ja natiiville, joten sen muoto tarkistetaan tässä.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { tarkistaApuraha, lataaApuraha, nollaaApuraha, APURAHA_OSOITE } from '../js/apuraha.js';

const raaka = JSON.parse(readFileSync(new URL(`../${APURAHA_OSOITE}`, import.meta.url), 'utf8'));

test('esittely.json on kelvollinen: filosofia, korostettu kehitysmuutos, pelit, ei linkkejä, enintään 3 kuvaa', () => {
  const d = tarkistaApuraha(raaka);
  assert.ok(d, 'tarkistus hylkäsi tiedoston');
  assert.equal(d.nappi, 'Apurahahakemus – katso tämä ensin');
  // Omistaja 7.10.2026: ensin pelin filosofia, sitten korostettuna kehityksen siirto natiiviin, sitten Maapallo,
  // Kuumailmapallo ja ISS omina alaotsikkoinaan ja lopuksi pelit.
  assert.equal(d.kappaleet.length, 9);
  assert.deepEqual(d.kappaleet.slice(2, 5).map((k) => k.otsikko), ['Maapallo', 'Kuumailmapallo', 'ISS']);
  assert.match(d.kappaleet[0].teksti, /^Matkakirja ja unohdettu aarre on kokemuksellinen oppimispeli/);
  assert.equal(d.kappaleet[1].korostus, true);
  assert.match(d.kappaleet[1].teksti, /^Kehitys siirtyi syyskuussa/);
  assert.ok(d.kappaleet.filter((k, i) => i !== 1).every((k) => k.korostus === false));
  // Omistaja 7.10.2026: ei linkkejä; kuvat (ISS:n kupola, Olavinlinna, Kuumailmapallo) pelistä, enintään 3.
  assert.ok(raaka.kappaleet.every((k) => !k.linkki), 'linkit poistettiin (omistaja 7.10.2026)');
  assert.ok(d.kuvat.length <= 3, `kuvia ${d.kuvat.length}`);
  assert.equal('video' in raaka, false, 'video poistettiin (omistaja 30.9. klo 15.06)');
  for (const k of raaka.kuvat) if (k.rajaus != null) assert.match(k.rajaus, /^\d{1,3}% \d{1,3}%$/, `rajaus ${k.tiedosto}`);
  assert.ok(d.webHuomautus.startsWith('Selainpeli ei sisällä kaikkia ominaisuuksia.'));
  // Selain saa webTekstit: iOS:n ominaisuudet kerrotaan iOS:n ominaisuuksina.
  const kaikki = d.kappaleet.flatMap((k) => [k.teksti ?? '', ...(k.lista ?? [])]).join(' ');
  assert.ok(!/poikkileikkaus|esittelylinsseistä/.test(kaikki), kaikki);
  assert.ok(/Videopelit tulevat vain iOS-sovellukseen/.test(kaikki));
  assert.equal((kaikki.match(/Vain iOS-sovelluksessa\./g) ?? []).length, 2, 'Kuumailmapallo ja ISS merkitty iOS:n ominaisuuksiksi selaimessa');
});

test('kuvat kappaleensa vieressä (versio 7): ISS-kupola ISS-kappaleeseen, Olavinlinna Työn alla -kappaleeseen', () => {
  const d = tarkistaApuraha(raaka);
  assert.equal(raaka.versio, 7);
  const kohta = (nimi) => d.kappaleet.find((k) => k.otsikko === nimi).kuvat.map((k) => k.tiedosto);
  assert.deepEqual(kohta('ISS'), ['assets/apuraha/iss-kupola-lansi-eurooppa.jpg']);
  assert.deepEqual(kohta('Työn alla'), ['assets/apuraha/olavinlinna-hamara.jpg']);
  assert.equal(raaka.kuvat.find((k) => k.tiedosto.includes('olavinlinna')).rivi, 1, 'Olavinlinna-rivin viereen');
  assert.equal(d.kuvat.length, 0, 'kaikilla kuvilla on kappale, loppuriviä ei ole');
  for (const k of raaka.kuvat) assert.ok(Number.isInteger(k.kappale) && raaka.kappaleet[k.kappale], `kappale ${k.tiedosto}`);
  const ilman = tarkistaApuraha({ ...raaka, kuvat: [{ tiedosto: 'a.jpg' }, { tiedosto: 'b.jpg', kappale: 99 }] });
  assert.equal(ilman.kuvat.length, 2, 'ilman kelvollista kappaletta kortin loppuun');
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
