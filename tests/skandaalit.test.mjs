/*
 * SKANDAALIEN AINEISTO — 29 maata, 83 skandaalia, jokainen kartalla.
 *
 * Merkin paikka on sisältöä siinä missä teksti (sama periaate kuin
 * eläintäyillä, tests/elaintakyt.test.mjs), mutta skandaalipisteitä ei
 * voi vaatia maan monikulmion sisään: moni tapahtumapaikka on satama,
 * rantakallio tai saari (Eldey, Tallinnan satama), joka jää laudan
 * karkean maamuodon ulkopuolelle. Kone tarkistaa sen, minkä voi:
 * kentät, visan muodon, nimiöiden mitat, oikean vastauksen jakauman
 * ja sen, että jokainen piste projisoituu maailmankartalle laudan
 * rajojen sisään.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { SKANDAALIT } from '../js/packs/skandaalit.js';
import { MAAILMANKARTTA } from '../js/packs/maailmankartta.js';
import { projisoiLaudalle } from '../js/fokusmitat.js';

/** Karttanimiön enimmäismitta (js/fokusnosto-symbolit.js NOSTOSYM_NIMIO_MERKKEJA). */
const NIMION_MAKSIMI = 18;

const MAAT = Object.keys(SKANDAALIT);
const KAIKKI = MAAT.flatMap((iso) => SKANDAALIT[iso].map((s) => ({ iso, ...s })));

test('skandaaleja on 83 kappaletta 29 maassa, 2–3 per maa', () => {
  assert.equal(MAAT.length, 29, 'maita on 29');
  assert.equal(KAIKKI.length, 83, 'skandaaleja on 83');
  for (const iso of MAAT) {
    assert.match(iso, /^[A-Z]{3}$/, `${iso}: avain on kolmikirjaiminen maatunnus`);
    const n = SKANDAALIT[iso].length;
    assert.ok(n >= 2 && n <= 3, `${iso}: skandaaleja on ${n} (kiintiö 2–3)`);
  }
});

test('jokaisella skandaalilla on kortin kentät, paikka ja kelvollinen visa', () => {
  const tunnukset = new Set();
  for (const s of KAIKKI) {
    const nimi = `${s.iso}/${s.id}`;
    assert.ok(!tunnukset.has(s.id), `${nimi}: id on jo käytössä toisessa maassa — `
      + 'minitehtäväavain skandaali:<id> ei erottaisi niitä');
    tunnukset.add(s.id);
    for (const kentta of ['id', 'otsikko', 'nimio', 'vuosi', 'paikka', 'kortti']) {
      assert.ok(typeof s[kentta] === 'string' && s[kentta].trim(),
        `${nimi}: kenttä ${kentta} puuttuu tai on tyhjä`);
    }
    assert.ok(s.kortti.length > 120, `${nimi}: korttiteksti on epäilyttävän lyhyt`);
    assert.ok(s.nimio.length <= NIMION_MAKSIMI,
      `${nimi}: nimiö "${s.nimio}" on yli ${NIMION_MAKSIMI} merkkiä — kartalla se lyhennettäisiin`);
    assert.ok(Number.isFinite(s.lon) && Number.isFinite(s.lat), `${nimi}: lon/lat puuttuu`);
    assert.ok(s.visa && typeof s.visa.kysymys === 'string' && s.visa.kysymys.trim(),
      `${nimi}: visan kysymys puuttuu`);
    assert.equal(s.visa.vaihtoehdot.length, 3, `${nimi}: visassa ei ole kolmea vaihtoehtoa`);
    assert.ok(Number.isInteger(s.visa.oikea) && s.visa.oikea >= 0 && s.visa.oikea <= 2,
      `${nimi}: visan oikea ei ole indeksi 0–2`);
    for (const vaihtoehto of s.visa.vaihtoehdot) {
      assert.ok(typeof vaihtoehto === 'string' && vaihtoehto.trim(),
        `${nimi}: tyhjä visavaihtoehto`);
    }
  }
});

test('oikean vastauksen paikka ei painotu yhteen indeksiin', () => {
  // Fablen katselmointi 30.8.2026: jakauma tasataan koko erän yli.
  // Tasajako olisi ~27,7; raja 40 % sietää elävän datan mutta kaataa
  // vinouman, jossa pelaaja oppii painamaan aina samaa nappia.
  const jakauma = [0, 0, 0];
  for (const s of KAIKKI) jakauma[s.visa.oikea] += 1;
  for (const [indeksi, maara] of jakauma.entries()) {
    assert.ok(maara / KAIKKI.length <= 0.4,
      `indeksi ${indeksi} on oikea ${maara}/${KAIKKI.length} visassa — jakauma on vino: `
      + `${jakauma.join('/')}`);
    assert.ok(maara > 0, `indeksi ${indeksi} ei ole oikea kertaakaan`);
  }
});

test('maailmankartta tuntee jokaisen skandaalimaan', () => {
  // Merkit piirtyvät maan lehdelle (js/skandaalit.js lukee maan
  // cityCountry-taulusta), ja maan nimi luetaan countryShapesista.
  for (const iso of MAAT) {
    assert.ok(MAAILMANKARTTA.map.countryShapes[iso],
      `${iso}: maailmankartta ei tunne maata`);
    assert.ok(Object.values(MAAILMANKARTTA.map.cityCountry ?? {}).includes(iso),
      `${iso}: laudalla ei ole yhtään maan kaupunkia — merkit eivät näkyisi koskaan`);
  }
});

test('jokainen skandaali projisoituu maailmankartalle laudan sisään', () => {
  const { width, height } = MAAILMANKARTTA.map;
  for (const s of KAIKKI) {
    const piste = projisoiLaudalle('maailmankartta', s.lon, s.lat);
    assert.ok(piste, `${s.iso}/${s.id}: projektio ei tunne pistettä`);
    assert.ok(piste.x >= 0 && piste.x <= width && piste.y >= 0 && piste.y <= height,
      `${s.iso}/${s.id}: piste (${piste.x.toFixed(0)}, ${piste.y.toFixed(0)}) `
      + 'on laudan ulkopuolella');
  }
});

/* ------------------------------------------------------------------ *
 * PITKÄ TEKSTI JA KUVALISTA (2.9.2026)
 *
 * Omistajan havainto Sofian vihellyskohun kortista ("näyttää
 * tyngältä") toi ingressin (`kortti`) rinnalle jutun (`teksti`) ja
 * yhden kuvan tilalle kuvalistan (`kuvat`). Kumpikin on VALINNAINEN —
 * ensimmäinen erä kattaa skandaalit 1–42 — mutta kun kenttä on, sen on
 * kestettävä mitta: liian lyhyt teksti on tynkä ja liian pitkä ei mahdu
 * kortille. Sanaraja on väljempi kuin kirjoitusohje (160–240), jotta
 * yksittäinen tiivis tai runsas juttu ei kaada testiä.
 * ------------------------------------------------------------------ */

const sanoja = (teksti) => teksti.trim().split(/\s+/).length;

test('teksti-kenttä on kelvollinen juttu siellä missä se on', () => {
  const tekstilliset = KAIKKI.filter((s) => s.teksti !== undefined);
  assert.ok(tekstilliset.length >= 42,
    `pitkä teksti on vasta ${tekstilliset.length} skandaalilla — ensimmäinen erä on 42`);
  for (const s of tekstilliset) {
    const nimi = `${s.iso}/${s.id}`;
    assert.equal(typeof s.teksti, 'string', `${nimi}: teksti ei ole merkkijono`);
    const maara = sanoja(s.teksti);
    assert.ok(maara >= 120 && maara <= 260,
      `${nimi}: tekstissä on ${maara} sanaa (tavoite 160–240, raja 120–260)`);
    const kappaleet = s.teksti.split(/\n{2,}/).filter((k) => k.trim());
    assert.ok(kappaleet.length >= 3 && kappaleet.length <= 5,
      `${nimi}: kappaleita on ${kappaleet.length} (tavoite 3–4)`);
    assert.ok(!/\n[^\n]/.test(s.teksti.replace(/\n\n/g, '')),
      `${nimi}: yksittäinen rivinvaihto — kappaleraja on tyhjä rivi`);
    // Ingressiä ei toisteta jutussa sanasta sanaan: ensimmäinen virke
    // on se, jonka lukija näkee kahdesti, jos se kopioidaan.
    const ekaVirke = s.kortti.split(/(?<=\.)\s/)[0]?.trim();
    if (ekaVirke && ekaVirke.length > 30) {
      assert.ok(!s.teksti.includes(ekaVirke),
        `${nimi}: juttu toistaa ingressin ensimmäisen virkkeen sellaisenaan`);
    }
  }
});

test('kuvat-lista on kelvollinen ja lähderivi kertoo tekijän', () => {
  for (const s of KAIKKI) {
    const nimi = `${s.iso}/${s.id}`;
    if (s.kuvat === undefined) continue;
    assert.ok(Array.isArray(s.kuvat) && s.kuvat.length,
      `${nimi}: kuvat-kenttä on tyhjä — jätä se pois tai täytä se`);
    // Vanha yhden kuvan kenttä ja uusi lista eivät saa olla yhtä aikaa:
    // js/skandaalit.js skandaalinKuvat lukee listan ja unohtaisi toisen.
    assert.equal(s.kuva, undefined,
      `${nimi}: sekä kuva että kuvat — siirrä vanha kuva listan kärkeen`);
    for (const [i, kuva] of s.kuvat.entries()) {
      const kohta = `${nimi} kuva ${i + 1}`;
      assert.ok(kuva.osoite || kuva.tiedosto, `${kohta}: ei osoitetta eikä tiedostoa`);
      assert.ok(!(kuva.osoite && kuva.tiedosto), `${kohta}: kaksi kuvalähdettä`);
      assert.ok(typeof kuva.selite === 'string' && kuva.selite.trim(),
        `${kohta}: selite puuttuu`);
      assert.ok(typeof kuva.lahde === 'string' && kuva.lahde.trim(),
        `${kohta}: lähderivi puuttuu`);
      if (kuva.osoite) {
        assert.match(kuva.lahde, /Matkakirjan havainnekuva/,
          `${kohta}: pelin oma kuva ilman havainnekuvamerkintää (js/havainnekuva.js)`);
      } else {
        // CC ja PD vaativat molemmat tekijän ja lähteen näkyviin.
        assert.match(kuva.lahde, /Wikimedia Commons \(/,
          `${kohta}: Commons-kuvan lähderivistä puuttuu lisenssi`);
      }
    }
  }
});

test('lähderivi on päivätty ja tuore niillä, joilla on pitkä teksti', () => {
  for (const s of KAIKKI) {
    const nimi = `${s.iso}/${s.id}`;
    assert.ok(typeof s.lahde === 'string' && s.lahde.trim(), `${nimi}: lähde puuttuu`);
    assert.match(s.lahde, /Tarkistettu \d{1,2}\.\d{1,2}\.\d{4}\.$/,
      `${nimi}: lähderivi ei pääty tarkistuspäivään`);
    if (s.teksti === undefined) continue;
    /*
     * Pitkän tekstin väitteet ovat uusia, joten lähde on luettu
     * uudelleen — päiväys ei saa jäädä kuvattoman erän päiväykseen.
     * Raja on tekstierän ensimmäinen päivä (2.9.2026), ei tasan se:
     * jälkimmäinen puolisko kirjoitetaan omana päivänään.
     */
    const [, pv, kk, vv] = s.lahde.match(/Tarkistettu (\d{1,2})\.(\d{1,2})\.(\d{4})\.$/);
    const paiva = Date.UTC(Number(vv), Number(kk) - 1, Number(pv));
    assert.ok(paiva >= Date.UTC(2026, 8, 2),
      `${nimi}: pitkä teksti, mutta lähde on tarkistettu ${pv}.${kk}.${vv} — `
      + 'tekstierän lähteet luetaan uudelleen 2.9.2026 tai sen jälkeen');
  }
});
