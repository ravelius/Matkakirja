/*
 * Sähkejärjestelmä-workerin käsittelijä (worker/sahke/).
 *
 * Käsittelijä ottaa varastonsa apureista juuri tätä varten: koko
 * logiikan voi ajaa Nodessa ilman wrangleria ja ilman D1:tä, kun
 * varasto on muistissa elävä toteutus samasta rajapinnasta
 * (worker/sahke/varasto.js kuvaa rajapinnan).
 *
 * Testit vartioivat sitä, mikä moninpelissä on vaarallista mennä
 * pieleen: vapaan tekstin livahtaminen sähkeeseen, vieras origin,
 * toisen retkikunnan tirkistely, väärä avain, rajaton lähetystahti ja
 * nimimerkki sanalistojen ulkopuolelta.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  JASENIA_ENINTAAN, KIRJOITUKSIA_IKKUNASSA, KYSYMYKSEN_KATTO, POHJAT,
  SAILYTYS_VRK, VAIHTOEHDON_KATTO, kasittele, normalisoiKoodi, sallittuOrigin,
  siivoaTeksti, vertaaSalaisuus, ylimaarainenKentta,
} from '../worker/sahke/kasittelija.js';
import { ADJEKTIIVIT, SUBSTANTIIVIT, normalisoiNimimerkki } from '../worker/sahke/nimimerkit.js';

const PELI = 'https://ravelius.github.io';
const OSOITE = 'https://esimerkki.workers.dev';
const VRK_MS = 24 * 60 * 60 * 1000;

/**
 * Muistissa elävä varasto: sama rajapinta kuin D1-varastolla, mutta
 * taulut ovat taulukoita. Jos rajapinta muuttuu, tämä hajoaa heti —
 * juuri niin kuin pitääkin.
 */
function teeVarasto() {
  const retkikunnat = new Map();
  const jasenet = [];
  const sahkeet = [];
  const apupyynnot = [];
  const apuvastaukset = [];
  const uusinEnsin = (a, b) => b.aika - a.aika;
  return {
    retkikunnat,
    jasenet,
    sahkeet,
    apupyynnot,
    apuvastaukset,
    async luoRetkikunta(koodi, nyt) {
      if (retkikunnat.has(koodi)) return false;
      retkikunnat.set(koodi, { koodi, luotu: nyt, nahty: nyt });
      return true;
    },
    async haeRetkikunta(koodi) {
      return retkikunnat.get(koodi) ? { ...retkikunnat.get(koodi) } : null;
    },
    async koskeRetkikuntaan(koodi, nyt) {
      const rivi = retkikunnat.get(koodi);
      if (rivi) rivi.nahty = nyt;
    },
    async haeJasenet(koodi) {
      // Sama järjestys kuin D1:llä: liittymisaika, tasapelissä tunnus.
      return jasenet.filter((j) => j.koodi === koodi)
        .sort((a, b) => a.liittyi - b.liittyi || a.jasenId.localeCompare(b.jasenId))
        .map((j) => ({ ...j }));
    },
    async haeJasen(koodi, jasenId) {
      const rivi = jasenet.find((j) => j.koodi === koodi && j.jasenId === jasenId);
      return rivi ? { ...rivi } : null;
    },
    async lisaaJasen(rivi) {
      jasenet.push({ ...rivi, ikkuna: 0, laskuri: 0 });
    },
    async paivitaKirjoitusIkkuna(koodi, jasenId, ikkuna, laskuri) {
      const rivi = jasenet.find((j) => j.koodi === koodi && j.jasenId === jasenId);
      if (rivi) Object.assign(rivi, { ikkuna, laskuri });
    },
    async lisaaSahke(rivi) {
      if (sahkeet.some((s) => s.koodi === rivi.koodi && s.id === rivi.id)) return;
      sahkeet.push({ ...rivi });
    },
    async haeSahkeet(koodi, raja) {
      return sahkeet.filter((s) => s.koodi === koodi).sort(uusinEnsin).slice(0, raja)
        .map((s) => ({ ...s }));
    },
    async haeApupyynto(koodi, apuId) {
      const rivi = apupyynnot.find((a) => a.koodi === koodi && a.apuId === apuId);
      return rivi ? { ...rivi, vaihtoehdot: [...rivi.vaihtoehdot] } : null;
    },
    async lisaaApupyynto(rivi) {
      if (apupyynnot.some((a) => a.koodi === rivi.koodi && a.apuId === rivi.apuId)) return;
      apupyynnot.push({ ...rivi, vaihtoehdot: [...rivi.vaihtoehdot] });
    },
    async haeApupyynnot(koodi, raja) {
      return apupyynnot.filter((a) => a.koodi === koodi).sort(uusinEnsin).slice(0, raja)
        .map((a) => ({ ...a, vaihtoehdot: [...a.vaihtoehdot] }));
    },
    async tallennaApuvastaus(rivi) {
      const vanha = apuvastaukset.findIndex((v) => v.koodi === rivi.koodi
        && v.apuId === rivi.apuId && v.vastaaja === rivi.vastaaja);
      if (vanha >= 0) apuvastaukset[vanha] = { ...rivi };
      else apuvastaukset.push({ ...rivi });
    },
    async haeApuvastaukset(koodi, raja) {
      return apuvastaukset.filter((v) => v.koodi === koodi).sort(uusinEnsin).slice(0, raja)
        .map((v) => ({ ...v }));
    },
    async siivoa(sisaltoRaja, retkikuntaRaja) {
      for (const taulu of [sahkeet, apupyynnot, apuvastaukset]) {
        for (let i = taulu.length - 1; i >= 0; i -= 1) {
          if (taulu[i].aika < sisaltoRaja) taulu.splice(i, 1);
        }
      }
      const kuolleet = [...retkikunnat.values()]
        .filter((r) => r.nahty < retkikuntaRaja).map((r) => r.koodi);
      for (const koodi of kuolleet) retkikunnat.delete(koodi);
      for (let i = jasenet.length - 1; i >= 0; i -= 1) {
        if (kuolleet.includes(jasenet[i].koodi)) jasenet.splice(i, 1);
      }
    },
  };
}

const YMPARISTO = { SAHKE_ORIGINIT: PELI };

/** Kello, jota testit siirtävät käsin. */
function teeKello(alku = Date.parse('2026-08-25T10:00:00Z')) {
  let hetki = alku;
  return {
    nyt: () => hetki,
    siirra(ms) { hetki += ms; },
  };
}

function pyynto(polku, { metodi = 'POST', runko = null, origin = PELI } = {}) {
  return new Request(`${OSOITE}${polku}`, {
    method: metodi,
    headers: {
      ...(origin ? { origin } : {}),
      ...(runko ? { 'content-type': 'application/json' } : {}),
    },
    body: runko ? JSON.stringify(runko) : undefined,
  });
}

/** Pyyntö läpi käsittelijän; palauttaa statuksen ja jäsennetyn rungon. */
async function aja(polku, asetukset, apurit) {
  const vastaus = await kasittele(pyynto(polku, asetukset), YMPARISTO, apurit);
  return { status: vastaus.status, data: await vastaus.json(), vastaus };
}

/** Perustaa retkikunnan ja liittää siihen halutun määrän jäseniä. */
async function teeRetkikunta(apurit, nimet = ['Utelias Ilves']) {
  const ensimmainen = await aja('/retkikunta/luo',
    { runko: { nimimerkki: nimet[0] } }, apurit);
  assert.equal(ensimmainen.status, 200, JSON.stringify(ensimmainen.data));
  const { koodi } = ensimmainen.data;
  const jasenet = [ensimmainen.data];
  for (const nimi of nimet.slice(1)) {
    // eslint-disable-next-line no-await-in-loop
    const liittyja = await aja('/retkikunta/liity',
      { runko: { koodi, nimimerkki: nimi } }, apurit);
    assert.equal(liittyja.status, 200, JSON.stringify(liittyja.data));
    jasenet.push({ koodi, ...liittyja.data });
  }
  return { koodi, jasenet };
}

/* ---------------------------------------------------------------- */
/* Apurit                                                            */
/* ---------------------------------------------------------------- */

test('avainvertailu ei hyväksy tyhjää eikä väärää', () => {
  assert.equal(vertaaSalaisuus('abc', 'abc'), true);
  assert.equal(vertaaSalaisuus('abc', 'abd'), false);
  assert.equal(vertaaSalaisuus('', ''), false, 'tyhjä tiiviste ei saa avata ovea');
  assert.equal(vertaaSalaisuus(null, 'abc'), false);
});

test('origin kelpaa vain listalta tai localhostista', () => {
  const sallitut = [PELI];
  assert.ok(sallittuOrigin(PELI, sallitut));
  assert.ok(sallittuOrigin('http://localhost:8000', sallitut));
  assert.ok(!sallittuOrigin('https://paha.example', sallitut));
  assert.ok(!sallittuOrigin(null, sallitut));
});

test('ylimääräinen kenttä rungossa löytyy nimeltä', () => {
  assert.equal(ylimaarainenKentta({ a: 1 }, ['a']), '');
  assert.equal(ylimaarainenKentta({ a: 1, viesti: 'moi' }, ['a']), 'viesti');
  assert.equal(ylimaarainenKentta(null, ['a']), '(runko)');
  assert.equal(ylimaarainenKentta([1, 2], ['a']), '(runko)');
});

test('liittymiskoodi siedetään väliviivoin ja pienellä', () => {
  assert.equal(normalisoiKoodi('abc-234'), 'ABC234');
  assert.equal(normalisoiKoodi(' k7m 2pq '), 'K7M2PQ');
});

test('teksti siivotaan ja katkaistaan tallennettaessa', () => {
  assert.equal(siivoaTeksti('  Onko   tämä <b>oikein</b>? ', 100),
    'Onko tämä &lt;b&gt;oikein&lt;/b&gt;?');
  assert.equal(siivoaTeksti('a'.repeat(500), 10), 'a'.repeat(10));
  assert.equal(siivoaTeksti(null, 10), '');
});

/* ---------------------------------------------------------------- */
/* Nimimerkit                                                        */
/* ---------------------------------------------------------------- */

test('sanalistat ovat oikean mittaiset eikä niissä ole kaksoiskappaleita', () => {
  assert.equal(ADJEKTIIVIT.length, 24);
  assert.equal(SUBSTANTIIVIT.length, 24);
  assert.equal(new Set(ADJEKTIIVIT).size, 24);
  assert.equal(new Set(SUBSTANTIIVIT).size, 24);
});

test('nimimerkki kelpaa vain sanalistoilta ja palautuu kanonisena', () => {
  assert.equal(normalisoiNimimerkki('utelias   ilves'), 'Utelias Ilves');
  assert.equal(normalisoiNimimerkki('HÖYRYÄVÄ MAJAKKA'), 'Höyryävä Majakka');
  assert.equal(normalisoiNimimerkki('Utelias Ilves Extra'), '');
  assert.equal(normalisoiNimimerkki('Ilves Utelias'), '', 'sanajärjestys on osa muotoa');
  assert.equal(normalisoiNimimerkki('Paha <script>'), '');
  assert.equal(normalisoiNimimerkki('a'.repeat(200)), '');
});

/* ---------------------------------------------------------------- */
/* Retkikunta                                                        */
/* ---------------------------------------------------------------- */

test('perustaminen antaa koodin, tunnuksen ja avaimen', async () => {
  const kello = teeKello();
  const apurit = { varasto: teeVarasto(), nyt: kello.nyt };
  const { status, data } = await aja('/retkikunta/luo',
    { runko: { nimimerkki: 'Utelias Ilves' } }, apurit);
  assert.equal(status, 200);
  assert.match(data.koodi, /^[ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{6}$/);
  assert.match(data.jasenId, /^[a-z2-9]{12}$/);
  assert.match(data.avain, /^[a-z2-9]{32}$/);
  // Avain on salaisuus: varastossa saa olla vain sen tiiviste.
  assert.ok(!JSON.stringify(apurit.varasto.jasenet).includes(data.avain),
    'jäsenavain päätyi varastoon selväkielisenä');
});

test('liittyminen palauttaa koko jäsenlistan', async () => {
  const apurit = { varasto: teeVarasto(), nyt: teeKello().nyt };
  const { koodi } = await teeRetkikunta(apurit);
  const { status, data } = await aja('/retkikunta/liity',
    { runko: { koodi: koodi.toLowerCase(), nimimerkki: 'höyryävä majakka' } }, apurit);
  assert.equal(status, 200);
  assert.deepEqual(data.jasenet.map((j) => j.nimimerkki),
    ['Utelias Ilves', 'Höyryävä Majakka']);
  assert.ok(data.avain && data.jasenId);
});

test('tuntematon koodi, täysi retkikunta ja varattu nimi torjutaan', async () => {
  const apurit = { varasto: teeVarasto(), nyt: teeKello().nyt };
  const puuttuva = await aja('/retkikunta/liity',
    { runko: { koodi: 'ZZZZZZ', nimimerkki: 'Utelias Ilves' } }, apurit);
  assert.equal(puuttuva.status, 404);

  const nimet = ADJEKTIIVIT.slice(0, JASENIA_ENINTAAN)
    .map((adj, i) => `${adj} ${SUBSTANTIIVIT[i]}`);
  // Yksi paikka jätetään auki, jotta varattu nimi todella törmää
  // nimeen eikä jäsenmäärään.
  const { koodi } = await teeRetkikunta(apurit, nimet.slice(0, JASENIA_ENINTAAN - 1));

  const varattu = await aja('/retkikunta/liity',
    { runko: { koodi, nimimerkki: nimet[0] } }, apurit);
  assert.equal(varattu.status, 409);
  assert.match(varattu.data.virhe, /käytössä/i);

  const viimeinen = await aja('/retkikunta/liity',
    { runko: { koodi, nimimerkki: nimet[JASENIA_ENINTAAN - 1] } }, apurit);
  assert.equal(viimeinen.status, 200);

  const tayteen = await aja('/retkikunta/liity',
    { runko: { koodi, nimimerkki: 'Iloinen Villihanhi' } }, apurit);
  assert.equal(tayteen.status, 409);
  assert.match(tayteen.data.virhe, /täynnä/i);
});

test('vapaa nimimerkki ei mene läpi', async () => {
  const apurit = { varasto: teeVarasto(), nyt: teeKello().nyt };
  const { status } = await aja('/retkikunta/luo',
    { runko: { nimimerkki: 'Kalle Kuutamo' } }, apurit);
  assert.equal(status, 400);
});

/* ---------------------------------------------------------------- */
/* Sähke                                                             */
/* ---------------------------------------------------------------- */

test('sähke tallentuu ja näkyy tilannekuvassa virstanpylväänä', async () => {
  const kello = teeKello();
  const apurit = { varasto: teeVarasto(), nyt: kello.nyt };
  const { koodi, jasenet } = await teeRetkikunta(apurit,
    ['Utelias Ilves', 'Höyryävä Majakka']);
  const [ilves, majakka] = jasenet;

  const lahetys = await aja('/sahke', {
    runko: {
      koodi, jasenId: ilves.jasenId, avain: ilves.avain,
      pohjaId: 'aarre-loytyi', paikkaId: 'madrid',
    },
  }, apurit);
  assert.equal(lahetys.status, 200, JSON.stringify(lahetys.data));
  assert.equal(lahetys.data.sahke.pohjaId, 'aarre-loytyi');

  const tila = await aja(
    `/retkikunta/tila?koodi=${koodi}&jasenId=${majakka.jasenId}&avain=${majakka.avain}`,
    { metodi: 'GET' }, apurit,
  );
  assert.equal(tila.status, 200);
  assert.equal(tila.data.sahkeet.length, 1);
  assert.deepEqual(
    Object.keys(tila.data.sahkeet[0]).sort(),
    ['aika', 'id', 'lahettaja', 'paikkaId', 'pohjaId'],
  );
  assert.equal(tila.data.sahkeet[0].lahettaja, ilves.jasenId);
  const lahettaja = tila.data.jasenet.find((j) => j.jasenId === ilves.jasenId);
  assert.deepEqual(lahettaja.virstanpylvaat.map((v) => v.paikkaId), ['madrid']);
  const lukija = tila.data.jasenet.find((j) => j.jasenId === majakka.jasenId);
  assert.deepEqual(lukija.virstanpylvaat, []);
});

test('sähkeeseen ei voi liittää vapaata tekstiä', async () => {
  const apurit = { varasto: teeVarasto(), nyt: teeKello().nyt };
  const { koodi, jasenet: [ilves] } = await teeRetkikunta(apurit);
  const { status, data } = await aja('/sahke', {
    runko: {
      koodi, jasenId: ilves.jasenId, avain: ilves.avain,
      pohjaId: 'saavuin', paikkaId: 'madrid', viesti: 'Terveisiä!',
    },
  }, apurit);
  assert.equal(status, 400);
  assert.match(data.virhe, /viesti/);
  assert.equal(apurit.varasto.sahkeet.length, 0);
});

test('tuntematon pohja ja kelvoton paikka torjutaan', async () => {
  const apurit = { varasto: teeVarasto(), nyt: teeKello().nyt };
  const { koodi, jasenet: [ilves] } = await teeRetkikunta(apurit);
  const tunnukset = { koodi, jasenId: ilves.jasenId, avain: ilves.avain };

  const pohja = await aja('/sahke',
    { runko: { ...tunnukset, pohjaId: 'oma-pohja', paikkaId: 'madrid' } }, apurit);
  assert.equal(pohja.status, 400);

  const paikka = await aja('/sahke',
    { runko: { ...tunnukset, pohjaId: POHJAT[0], paikkaId: 'Madrid <b>' } }, apurit);
  assert.equal(paikka.status, 400);
  assert.equal(apurit.varasto.sahkeet.length, 0);
});

test('väärä avain ja vieras retkikunta eivät pääse sisään', async () => {
  const apurit = { varasto: teeVarasto(), nyt: teeKello().nyt };
  const oma = await teeRetkikunta(apurit, ['Utelias Ilves']);
  const vieras = await teeRetkikunta(apurit, ['Rohkea Kompassi']);

  const vaaraAvain = await aja('/sahke', {
    runko: {
      koodi: oma.koodi, jasenId: oma.jasenet[0].jasenId,
      avain: 'z'.repeat(32), pohjaId: 'saavuin', paikkaId: 'madrid',
    },
  }, apurit);
  assert.equal(vaaraAvain.status, 401);

  // Oikea avain mutta toisen retkikunnan koodi: jäsentä ei ole siellä.
  const vaaraKoodi = await aja(
    `/retkikunta/tila?koodi=${vieras.koodi}&jasenId=${oma.jasenet[0].jasenId}`
    + `&avain=${oma.jasenet[0].avain}`,
    { metodi: 'GET' }, apurit,
  );
  assert.equal(vaaraKoodi.status, 401);
});

test('vieras origin ei pääse mihinkään', async () => {
  const apurit = { varasto: teeVarasto(), nyt: teeKello().nyt };
  const { status } = await aja('/retkikunta/luo',
    { runko: { nimimerkki: 'Utelias Ilves' }, origin: 'https://paha.example' }, apurit);
  assert.equal(status, 403);
  assert.equal(apurit.varasto.retkikunnat.size, 0);
});

test('kirjoitusrajoitin katkaisee tulvan', async () => {
  const kello = teeKello();
  const apurit = { varasto: teeVarasto(), nyt: kello.nyt };
  const { koodi, jasenet: [ilves] } = await teeRetkikunta(apurit);
  const runko = {
    koodi, jasenId: ilves.jasenId, avain: ilves.avain,
    pohjaId: 'saavuin', paikkaId: 'madrid',
  };
  let viimeinen = 200;
  for (let i = 0; i < KIRJOITUKSIA_IKKUNASSA + 1; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    viimeinen = (await aja('/sahke', { runko }, apurit)).status;
  }
  assert.equal(viimeinen, 429);

  // Ikkuna aukeaa uudelleen, kun minuutti on kulunut.
  kello.siirra(2 * 60 * 1000);
  const uusi = await aja('/sahke', { runko }, apurit);
  assert.equal(uusi.status, 200);
});

/* ---------------------------------------------------------------- */
/* Apupyynnöt                                                        */
/* ---------------------------------------------------------------- */

test('apupyyntö ja veikkaus kulkevat tilannekuvaan', async () => {
  const apurit = { varasto: teeVarasto(), nyt: teeKello().nyt };
  const { koodi, jasenet } = await teeRetkikunta(apurit,
    ['Utelias Ilves', 'Höyryävä Majakka']);
  const [kysyja, vastaaja] = jasenet;

  const kysy = await aja('/apu/kysy', {
    runko: {
      koodi, jasenId: kysyja.jasenId, avain: kysyja.avain, apuId: 'madrid-laatta-3',
      kysymys: 'Mikä joki virtaa <b>Madridin</b> läpi?',
      vaihtoehdot: ['Manzanares', 'Tajo', 'Ebro'],
    },
  }, apurit);
  assert.equal(kysy.status, 200, JSON.stringify(kysy.data));
  assert.equal(kysy.data.apu.kysymys, 'Mikä joki virtaa &lt;b&gt;Madridin&lt;/b&gt; läpi?');

  const vastaus = await aja('/apu/vastaa', {
    runko: {
      koodi, jasenId: vastaaja.jasenId, avain: vastaaja.avain,
      apuId: 'madrid-laatta-3', veikkaus: 0,
    },
  }, apurit);
  assert.equal(vastaus.status, 200);

  const tila = await aja(
    `/retkikunta/tila?koodi=${koodi}&jasenId=${kysyja.jasenId}&avain=${kysyja.avain}`,
    { metodi: 'GET' }, apurit,
  );
  assert.equal(tila.data.apupyynnot.length, 1);
  assert.deepEqual(tila.data.apupyynnot[0].vaihtoehdot, ['Manzanares', 'Tajo', 'Ebro']);
  assert.equal(tila.data.apuvastaukset[0].veikkaus, 0);
  assert.equal(tila.data.apuvastaukset[0].vastaaja, vastaaja.jasenId);
});

test('apupyynnön mitat ja veikkauksen rajat pitävät', async () => {
  const apurit = { varasto: teeVarasto(), nyt: teeKello().nyt };
  const { koodi, jasenet } = await teeRetkikunta(apurit,
    ['Utelias Ilves', 'Höyryävä Majakka']);
  const [kysyja, vastaaja] = jasenet;
  const tunnukset = { koodi, jasenId: kysyja.jasenId, avain: kysyja.avain };

  const liikaa = await aja('/apu/kysy', {
    runko: {
      ...tunnukset, apuId: 'a1', kysymys: 'Mikä?',
      vaihtoehdot: ['a', 'b', 'c', 'd', 'e'],
    },
  }, apurit);
  assert.equal(liikaa.status, 400);

  const yksi = await aja('/apu/kysy',
    { runko: { ...tunnukset, apuId: 'a2', kysymys: 'Mikä?', vaihtoehdot: ['a'] } }, apurit);
  assert.equal(yksi.status, 400);

  const pitka = await aja('/apu/kysy', {
    runko: {
      ...tunnukset, apuId: 'a3', kysymys: 'k'.repeat(KYSYMYKSEN_KATTO + 200),
      vaihtoehdot: ['v'.repeat(VAIHTOEHDON_KATTO + 50), 'b'],
    },
  }, apurit);
  assert.equal(pitka.status, 200);
  const tallennettu = apurit.varasto.apupyynnot.find((a) => a.apuId === 'a3');
  assert.equal(tallennettu.kysymys.length, KYSYMYKSEN_KATTO);
  assert.equal(tallennettu.vaihtoehdot[0].length, VAIHTOEHDON_KATTO);

  const omaan = await aja('/apu/vastaa',
    { runko: { ...tunnukset, apuId: 'a3', veikkaus: 0 } }, apurit);
  assert.equal(omaan.status, 409, 'omaan pyyntöön ei vastata');

  const ohi = await aja('/apu/vastaa', {
    runko: {
      koodi, jasenId: vastaaja.jasenId, avain: vastaaja.avain, apuId: 'a3', veikkaus: 7,
    },
  }, apurit);
  assert.equal(ohi.status, 400);

  const puuttuva = await aja('/apu/vastaa', {
    runko: {
      koodi, jasenId: vastaaja.jasenId, avain: vastaaja.avain, apuId: 'ei-ole', veikkaus: 0,
    },
  }, apurit);
  assert.equal(puuttuva.status, 404);
});

/* ---------------------------------------------------------------- */
/* Siivous ja reititys                                               */
/* ---------------------------------------------------------------- */

test('siivous pyyhkii vanhat sähkeet mutta jättää tuoreet', async () => {
  const kello = teeKello();
  const apurit = { varasto: teeVarasto(), nyt: kello.nyt };
  const { koodi, jasenet: [ilves] } = await teeRetkikunta(apurit);
  const runko = {
    koodi, jasenId: ilves.jasenId, avain: ilves.avain,
    pohjaId: 'saavuin', paikkaId: 'madrid',
  };
  await aja('/sahke', { runko }, apurit);

  kello.siirra((SAILYTYS_VRK + 1) * VRK_MS);
  await aja('/sahke', { runko: { ...runko, paikkaId: 'lissabon' } }, apurit);
  // Siivous ajetaan uuden retkikunnan perustamisessa (ja cronissa).
  await aja('/retkikunta/luo', { runko: { nimimerkki: 'Rohkea Kompassi' } }, apurit);

  assert.deepEqual(apurit.varasto.sahkeet.map((s) => s.paikkaId), ['lissabon']);
  assert.ok(apurit.varasto.retkikunnat.has(koodi), 'elossa oleva retkikunta ei saa kadota');
});

test('väärä metodi ja tuntematon reitti vastaavat siististi', async () => {
  const apurit = { varasto: teeVarasto(), nyt: teeKello().nyt };
  const metodi = await aja('/retkikunta/luo', { metodi: 'GET' }, apurit);
  assert.equal(metodi.status, 405);
  const reitti = await aja('/jotain-muuta', { metodi: 'GET' }, apurit);
  assert.equal(reitti.status, 404);
});

test('OPTIONS avaa portin vain pelin originille', async () => {
  const apurit = { varasto: teeVarasto(), nyt: teeKello().nyt };
  const oma = await kasittele(pyynto('/sahke', { metodi: 'OPTIONS' }), YMPARISTO, apurit);
  assert.equal(oma.status, 204);
  assert.equal(oma.headers.get('access-control-allow-origin'), PELI);

  const vieras = await kasittele(
    pyynto('/sahke', { metodi: 'OPTIONS', origin: 'https://paha.example' }),
    YMPARISTO, apurit,
  );
  assert.equal(vieras.status, 403);
});

test('ilman tietokantaa worker kertoo sen eikä kaadu', async () => {
  const vastaus = await kasittele(
    pyynto('/retkikunta/luo', { runko: { nimimerkki: 'Utelias Ilves' } }),
    { SAHKE_ORIGINIT: PELI },
  );
  assert.equal(vastaus.status, 503);
});
