// Apurahan esittelykortti (js/apuraha.js + assets/apuraha/esittely.json):
// sama tiedosto webille ja natiiville, joten sen muoto tarkistetaan tässä.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { tarkistaApuraha, lataaApuraha, nollaaApuraha, APURAHA_OSOITE } from '../js/apuraha.js';

const raaka = JSON.parse(readFileSync(new URL(`../${APURAHA_OSOITE}`, import.meta.url), 'utf8'));

test('esittely.json on kelvollinen pelin esittely: Pelissä nyt, Tulossa, ei apurahaa, ei linkkejä', () => {
  const d = tarkistaApuraha(raaka);
  assert.ok(d, 'tarkistus hylkäsi tiedoston');
  // Omistaja 13.11.2026 klo 14.52 (KK 15.07): kortti on pelin esittely.
  assert.equal(d.nappi, 'Pelin esittely');
  assert.equal(d.otsikko, 'Matkakirja ja unohdettu aarre');
  assert.deepEqual(d.kappaleet.slice(4).map((k) => k.otsikko),
    ['Pelissä nyt', 'Kartta ja Pariisi', 'Aarteet', 'Kuumailmapallo', 'ISS ja raketti', 'Linssit', 'Tulossa']);
  assert.match(d.kappaleet[0].teksti, /^Pelaaja on nuori Fogg/);
  assert.ok(d.kappaleet.every((k) => k.korostus === false));
  assert.ok(raaka.kappaleet.every((k) => !k.linkki), 'ei linkkejä');
  assert.equal('video' in raaka, false);
  for (const k of raaka.kuvat) if (k.rajaus != null) assert.match(k.rajaus, /^\d{1,3}% \d{1,3}%$/, `rajaus ${k.tiedosto}`);
  assert.equal(d.webHuomautus, 'Selainpeli ei sisällä kaikkia ominaisuuksia. Täysi peli on iPhonen ja iPadin sovelluksessa.');
  const kaikki = d.kappaleet.flatMap((k) => [k.teksti ?? '', ...(k.lista ?? [])]).join(' ');
  // Apurahaviittaukset ja päiväys pois.
  assert.ok(!/apuraha|arvioija|tilanne 7\.10|Kehitys siirtyi|TestFlight/i.test(JSON.stringify({ n: raaka.nappi, o: raaka.otsikko, a: raaka.alaotsikko, k: raaka.kappaleet, w: raaka.webHuomautus, v: raaka.valmiitLinssit.teksti, t: raaka.kuvat.map((x) => x.teksti) })), 'apurahaviittaus');
  assert.ok(!/—/.test(kaikki), 'ei ajatusviivoja');
  assert.equal((kaikki.match(/Vain iOS-sovelluksessa\./g) ?? []).length, 2, 'Kuumailmapallo ja ISS merkitty iOS:n ominaisuuksiksi selaimessa');
});

test('kuvat (versio 8): kappaleeseen sidotut kuvat osuvat olemassa olevaan kappaleeseen', () => {
  const d = tarkistaApuraha(raaka);
  assert.equal(raaka.versio, 8);
  const kohta = (nimi) => d.kappaleet.find((k) => k.otsikko === nimi).kuvat.map((k) => k.tiedosto);
  assert.deepEqual(kohta('ISS ja raketti'), ['assets/apuraha/iss-kapseli-asemalla.jpg']);
  assert.deepEqual(kohta('Kartta ja Pariisi'), ['assets/apuraha/pariisi-kartta-louvre.jpg', 'assets/apuraha/nahtavyyden-esittely-eiffel.jpg']);
  assert.deepEqual(kohta('Aarteet'), ['assets/apuraha/aarretehtava-pariisi.jpg']);
  assert.deepEqual(kohta('Kuumailmapallo'), [], 'ei kuvaa (KK 13.11.: neljä uutta kuvaa, Olavinlinna pois)');
  assert.equal(raaka.kuvat.length, 4);
  assert.ok(raaka.kuvat.every((x) => x.teksti.split(/[.!?]/).filter(Boolean).length === 1), 'kuvateksti on yksi virke');
  for (const k of raaka.kuvat) assert.ok(existsSync(new URL(`../${k.tiedosto}`, import.meta.url)), `kuva puuttuu: ${k.tiedosto}`);
  for (const k of raaka.kuvat) if (k.kappale != null) assert.ok(Number.isInteger(k.kappale) && raaka.kappaleet[k.kappale], `kappale ${k.tiedosto}`);
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

test('nappi avaa valmiit linssit (omistaja 7.10.2026 klo 15.0x): sama lista webille ja natiiville, ei kehittäjälinssejä', async () => {
  // Oma ylätason kenttä: vanhat TF-appit (kappaleen toiminto "esittelylinssit") eivät näytä nappia eivätkä tekstiä.
  assert.ok(raaka.kappaleet.every((x) => !x.nappi && !/linssit/i.test(x.teksti ?? '')), 'kappaleissa ei nappia eikä sen tekstiä');
  const k = { teksti: raaka.valmiitLinssit.teksti, nappi: { linssit: raaka.valmiitLinssit.linssit } };
  assert.equal(k.teksti, 'Nappi avaa heti kaikki valmiit linssit.');
  assert.equal(raaka.valmiitLinssit.nappi, 'Avaa valmiit linssit');
  assert.deepEqual(tarkistaApuraha(raaka).valmiitLinssit.linssit, raaka.valmiitLinssit.linssit);
  assert.ok(!/kehitteillä/.test(JSON.stringify(raaka.kappaleet)), 'ei lupausta kehitteillä olevista');
  const { LINSSIT, KEHITTAJALINSSIT } = await import('../js/linssit/rekisteri.js');
  const valmiit = LINSSIT.filter((r) => r.tila !== 'hiomassa' && r.tuo).map((r) => r.tunnus);
  assert.deepEqual([...k.nappi.linssit].sort(), [...valmiit].sort(), 'lista = rekisterin valmiit linssit');
  assert.ok(KEHITTAJALINSSIT.every((r) => !k.nappi.linssit.includes(r.tunnus)), 'kehittäjälinssit eivät kuulu valmiisiin');
  // Omistus: lista rajaa; kehittäjätila ennallaan.
  const varasto = new Map();
  globalThis.localStorage = { getItem: (a) => varasto.get(a) ?? null, setItem: (a, b) => varasto.set(a, String(b)), removeItem: (a) => varasto.delete(a) };
  try {
    const { avaaEsittelylinssit, esittelylinssitAuki } = await import('../js/apuraha.js');
    const { omistetut } = await import('../js/linssit/omistus.js');
    avaaEsittelylinssit(['radio', 'vesistot']);
    assert.equal(esittelylinssitAuki(), true);
    const o = omistetut({ player: { linssit: [] } });
    assert.ok(o.has('radio') && o.has('vesistot') && !o.has('topografia'), [...o].join(','));
  } finally { delete globalThis.localStorage; }
});
