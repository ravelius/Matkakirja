// Apurahan esittelykortti (js/apuraha.js + assets/apuraha/esittely.json):
// sama tiedosto webille ja natiiville, joten sen muoto tarkistetaan tässä.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import {
  tarkistaApuraha, lataaApuraha, nollaaApuraha, APURAHA_OSOITE, ESITTELY_HASH, onEsittelyHash, esittelyOsoite,
} from '../js/apuraha.js';

const raaka = JSON.parse(readFileSync(new URL(`../${APURAHA_OSOITE}`, import.meta.url), 'utf8'));

// Versio 8 talteen (tests/fixtures/esittely-v8.json): vanha asettelu ei saa hajota, kun hetket puuttuvat.
const v8 = JSON.parse(readFileSync(new URL('./fixtures/esittely-v8.json', import.meta.url), 'utf8'));

test('esittely.json versio 9: vanhojen sovellusten kappaleet ja kuvat kelpaavat, ei apurahaa, ei linkkejä', () => {
  const vanha = { ...raaka };
  for (const kentta of ['avaus', 'hetket', 'ajatus', 'ajatusOtsikko', 'tekeillaTeksti', 'missa', 'loppu']) delete vanha[kentta];
  const d = tarkistaApuraha(vanha);
  assert.ok(d, 'tarkistus hylkäsi tiedoston');
  assert.equal(raaka.versio, 9);
  assert.equal(d.nappi, 'Pelin esittely');
  assert.equal(d.otsikko, 'Matkakirja ja unohdettu aarre');
  assert.equal(d.hetket, null, 'ilman hetkiä vanha asettelu');
  assert.match(d.kappaleet[0].teksti, /^Sinä olet nuori Fogg/);
  assert.ok(d.kappaleet.every((k) => k.korostus === false));
  assert.ok(raaka.kappaleet.every((k) => !k.linkki), 'ei linkkejä');
  for (const k of raaka.kuvat) if (k.rajaus != null) assert.match(k.rajaus, /^\d{1,3}% \d{1,3}%$/, `rajaus ${k.tiedosto}`);
  const kaikki = d.kappaleet.flatMap((k) => [k.teksti ?? '', ...(k.lista ?? [])]).join(' ');
  assert.ok(!/apuraha|arvioija|TestFlight/i.test(JSON.stringify(raaka, (k, v) => (k === '_ohje' || k === 'tiedosto' ? undefined : v))), 'apurahaviittaus');
  assert.ok(!/—/.test(kaikki), 'ei ajatusviivoja');
  assert.match(kaikki, /Vain iOS-sovelluksessa\./, 'avaruusasema merkitty iOS:n ominaisuudeksi selaimessa');
  // Kappaleiden kuvat osuvat olemassa olevaan kappaleeseen.
  for (const k of raaka.kuvat) assert.ok(Number.isInteger(k.kappale) && raaka.kappaleet[k.kappale], `kappale ${k.tiedosto}`);
  assert.equal(d.kuvat.length, 0, 'kaikki kuvat kappaleissa');
});

test('versio 9: avaus, hetket (webTeksti, tekeilla, tyhjät kuvat pois), ajatus, missa ja loppu', () => {
  const d = tarkistaApuraha(raaka);
  assert.ok(d);
  assert.equal(d.avaus.kuva.tiedosto, 'assets/apuraha/pariisi-kartta-louvre.jpg');
  assert.equal(d.avaus.kuva.rajaus, '50% 60%');
  assert.equal(d.avaus.kappaleet.length, 2);
  assert.deepEqual(d.hetket.map((h) => h.otsikko), [
    'Lennä kaupungin ylle', 'Ratkaise aarteen arvoitus', 'Lähde avaruuteen', 'Juokse Kielletyssä kaupungissa',
    'Hiivi Olavinlinnaan', 'Katso maailmaa linssin läpi',
  ]);
  assert.ok(d.hetket.every((h) => !/^\d|\(tekeillä\)/.test(h.otsikko)), 'ei numeroita eikä tekeillä-sanaa otsikossa');
  assert.deepEqual(d.hetket.map((h) => h.tekeilla), [false, false, false, true, true, false]);
  assert.deepEqual(d.hetket.map((h) => h.kuvat.length), [1, 1, 2, 0, 1, 3]);
  assert.ok(d.hetket.every((h) => h.video === null));
  // Selaimessa webTeksti korvaa tekstin.
  assert.match(d.hetket[2].teksti, /Vain iOS-sovelluksessa\.$/);
  assert.match(d.hetket[5].teksti, /Maailman radiot kuuluvat vain iOS-sovelluksessa\.$/);
  assert.equal(d.hetket[0].teksti, raaka.hetket[0].teksti);
  assert.equal(d.ajatusOtsikko, 'Pelin ajatus');
  assert.match(d.ajatus, /^Maailman kulttuuri/);
  assert.equal(d.tekeillaTeksti, 'tekeillä');
  assert.equal(d.missa.nyt.otsikko, 'Pelattavissa nyt');
  assert.match(d.missa.nyt.teksti, /Kuumailmapallo ja avaruusasema ovat vain iOS-sovelluksessa\.$/);
  assert.equal(d.missa.seuraavaksi.otsikko, 'Seuraavaksi');
  assert.equal(d.missa.seuraavaksi.lista.length, 4);
  assert.match(d.loppu, /^Täysi peli/);
  // Vanhat kentät säilyvät tiedostossa vanhoille sovellusversioille.
  assert.ok(raaka.kappaleet.length && raaka.kuvat.length && raaka.valmiitLinssit);
  // Kaikki kuvat ovat repossa, kuvatekstit yksi virke.
  const kuvat = [raaka.avaus.kuva, ...raaka.hetket.flatMap((h) => h.kuvat)];
  for (const k of kuvat) {
    assert.ok(existsSync(new URL(`../${k.tiedosto}`, import.meta.url)), `kuva puuttuu: ${k.tiedosto}`);
    assert.match(k.rajaus, /^\d{1,3}% \d{1,3}%$/, `rajaus ${k.tiedosto}`);
    assert.ok(k.teksti.split(/[.!?]/).filter(Boolean).length === 1, `kuvateksti on yksi virke: ${k.tiedosto}`);
  }
});

test('versio 9: puutteellinen hetki- ja kuvadata siistitään, oletussanat', () => {
  const d = tarkistaApuraha({
    nappi: 'x', otsikko: 'x', kappaleet: [],
    avaus: { kuva: { tiedosto: '' }, kappaleet: ['a', { teksti: 'b', webTeksti: 'B' }, 3, ''] },
    hetket: [
      { otsikko: 'Yksi', teksti: 't', tekeilla: 'kyllä', kuvat: [null, { tiedosto: ' ' }, { teksti: 'ei tiedostoa' }, { tiedosto: 'a.jpg', rajaus: 'vasen' }], video: '' },
      { otsikko: 'Kaksi', kuvat: [{ tiedosto: '1.jpg' }, { tiedosto: '2.jpg' }, { tiedosto: '3.jpg' }, { tiedosto: '4.jpg' }], video: 'v.mp4' },
      null, 'roska', {},
    ],
    missa: { seuraavaksi: { otsikko: 'S', lista: ['a', { teksti: 'b', webTeksti: 'B' }, 5] } },
  });
  assert.equal(d.avaus.kuva, null);
  assert.deepEqual(d.avaus.kappaleet, ['a', 'B']);
  assert.equal(d.hetket.length, 2);
  assert.equal(d.hetket[0].tekeilla, false, 'vain true on tekeillä');
  assert.deepEqual(d.hetket[0].kuvat, [{ tiedosto: 'a.jpg', rajaus: null, teksti: '' }]);
  assert.equal(d.hetket[0].video, null);
  assert.equal(d.hetket[1].teksti, '');
  assert.equal(d.hetket[1].kuvat.length, 3, 'enintään kolme kuvaa');
  assert.equal(d.hetket[1].video, 'v.mp4');
  assert.equal(d.ajatusOtsikko, '', 'ei väliotsikkoa ilman kenttää');
  assert.equal(d.ajatus, '');
  assert.equal(d.tekeillaTeksti, 'tekeillä', 'oletussana');
  assert.equal(d.missa.nyt, null);
  assert.deepEqual(d.missa.seuraavaksi.lista, ['a', 'B']);
  assert.equal(d.loppu, '');
});

test('versio 8 pysyy ennallaan: kappaleet ja kuvat kuten ennen, ei uusia kenttiä', () => {
  const d = tarkistaApuraha(v8);
  assert.ok(d);
  assert.equal(v8.versio, 8);
  assert.equal(d.hetket, null);
  assert.equal(d.avaus, null);
  assert.equal(d.missa, null);
  assert.deepEqual(d.kappaleet.slice(4).map((k) => k.otsikko),
    ['Pelissä nyt', 'Kartta ja Pariisi', 'Aarteet', 'Kuumailmapallo', 'ISS ja raketti', 'Linssit', 'Tulossa']);
  const kohta = (nimi) => d.kappaleet.find((k) => k.otsikko === nimi).kuvat.map((k) => k.tiedosto);
  assert.deepEqual(kohta('ISS ja raketti'), ['assets/apuraha/iss-kapseli-asemalla.jpg']);
  assert.deepEqual(kohta('Kartta ja Pariisi'), ['assets/apuraha/pariisi-kartta-louvre.jpg', 'assets/apuraha/nahtavyyden-esittely-eiffel.jpg']);
  assert.equal(d.webHuomautus, 'Selainpeli ei sisällä kaikkia ominaisuuksia. Täysi peli on iPhonen ja iPadin sovelluksessa.');
  const kaikki = d.kappaleet.flatMap((k) => [k.teksti ?? '', ...(k.lista ?? [])]).join(' ');
  assert.equal((kaikki.match(/Vain iOS-sovelluksessa\./g) ?? []).length, 2);
  const ilman = tarkistaApuraha({ ...v8, kuvat: [{ tiedosto: 'a.jpg' }, { tiedosto: 'b.jpg', kappale: 99 }] });
  assert.equal(ilman.kuvat.length, 2, 'ilman kelvollista kappaletta kortin loppuun');
});

test('suora osoite #esittely: tunnistus ja replaceStaten osoite avatessa ja sulkiessa', () => {
  assert.equal(ESITTELY_HASH, '#esittely');
  assert.equal(onEsittelyHash('#esittely'), true);
  assert.equal(onEsittelyHash('#Esittely'), true);
  assert.equal(onEsittelyHash(''), false);
  assert.equal(onEsittelyHash('#esittely2'), false);
  assert.equal(onEsittelyHash(undefined), false);
  assert.equal(esittelyOsoite({ pathname: '/', search: '?kortti=vanha', hash: '' }, true), '/?kortti=vanha#esittely');
  assert.equal(esittelyOsoite({ pathname: '/', search: '', hash: '#esittely' }, true), null, 'jo oikein');
  assert.equal(esittelyOsoite({ pathname: '/peli/', search: '?a=1', hash: '#esittely' }, false), '/peli/?a=1');
  assert.equal(esittelyOsoite({ pathname: '/', search: '', hash: '#muu' }, false), null, 'muuta hashia ei kosketa');
  assert.equal(esittelyOsoite({ pathname: '/', search: '', hash: '' }, false), null);
  // ui.js avaa kortin hashista heti latauksen jälkeen ja päivittää osoitteen avatessa ja sulkiessa.
  const ui = readFileSync(new URL('../js/ui.js', import.meta.url), 'utf8');
  assert.match(ui, /onEsittelyHash\(globalThis\.location\?\.hash\) && !this\.apurahaDialog\) this\.naytaApuraha\(esittely\)/);
  assert.match(ui, /osoite\(true\);/);
  assert.match(ui, /osoite\(false\);/);
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
  // Versio 9: "linssit" esiintyy Pelattavissa nyt -tekstissä, joten tarkistetaan napin oma teksti.
  assert.ok(raaka.kappaleet.every((x) => !x.nappi && !(x.teksti ?? '').includes(raaka.valmiitLinssit.teksti)), 'kappaleissa ei nappia eikä sen tekstiä');
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
