/*
 * Lukijoiden ehdotukset -workerin käsittelijä (worker/ehdotukset/).
 *
 * Käsittelijä on omana moduulinaan juuri tätä varten: se ajetaan
 * Nodessa ilman wrangleria, ja R2-ämpäri on pieni muistivarasto.
 * Testit vartioivat sitä, mikä pelaajan lähetyksessä on vaarallista
 * mennä pieleen — avoin origin, liian iso kuva, lisenssivakuutus
 * ohitettuna, avaimeton pääsy toisten sähköposteihin.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  ETULIITE, KUVIA_ENINTAAN, NATIIVIT_OLETUS, TILAT, kasittele, sallittuNatiivi,
  sallittuOrigin, turvallinenPolku, vertaaSalaisuus,
} from '../worker/ehdotukset/kasittelija.js';

const PELI = 'https://ravelius.github.io';
const AVAIN = 'salainen-avain-123';

/**
 * Muistissa elävä R2-ämpäri: put, get ja list samoilla nimillä. Etag ja
 * onlyIf-ehto ovat mukana, jotta myös reaktiolaskurit toimivat sillä.
 */
function teeAmpari() {
  const sisalto = new Map();
  let juokseva = 0;
  return {
    sisalto,
    async put(avain, arvo, asetukset = {}) {
      const vanha = sisalto.get(avain) ?? null;
      const ehto = asetukset.onlyIf;
      if (ehto?.etagMatches && vanha?.etag !== ehto.etagMatches) return null;
      if (ehto?.etagDoesNotMatch === '*' && vanha) return null;
      juokseva += 1;
      const tavut = typeof arvo === 'string' ? new TextEncoder().encode(arvo).buffer : arvo;
      sisalto.set(avain, {
        tavut, etag: `e${juokseva}`, httpMetadata: asetukset.httpMetadata ?? {},
      });
      return { etag: `e${juokseva}` };
    },
    async get(avain) {
      const kohde = sisalto.get(avain);
      if (!kohde) return null;
      return {
        etag: kohde.etag,
        httpMetadata: kohde.httpMetadata,
        async text() { return new TextDecoder().decode(kohde.tavut); },
        async arrayBuffer() { return kohde.tavut; },
      };
    },
    async list({ prefix = '' } = {}) {
      const objects = [...sisalto.keys()]
        .filter((k) => k.startsWith(prefix)).sort().map((key) => ({ key }));
      return { objects, truncated: false };
    },
  };
}

function teeYmparisto(ampari = teeAmpari()) {
  return { EHDOTUKSET: ampari, EHDOTUS_AVAIN: AVAIN, EHDOTUS_ORIGINIT: PELI };
}

/** Lomakelähetys pelin originista (tai natiivista: origin null + otsakkeet). */
function lahetys(kentat = {}, kuvat = [], { origin = PELI, otsakkeet = {}, polku = '/laheta' } = {}) {
  const lomake = new FormData();
  for (const [nimi, arvo] of Object.entries(kentat)) lomake.append(nimi, arvo);
  for (const kuva of kuvat) lomake.append('kuvat', kuva);
  return new Request(`https://esimerkki.workers.dev${polku}`, {
    method: 'POST',
    headers: { ...(origin ? { origin } : {}), ...otsakkeet },
    body: lomake,
  });
}

/** Kuvatiedosto annetulla tyypillä ja koolla. */
function teeKuva(nimi, tyyppi, tavuja = 32) {
  return new File([new Uint8Array(tavuja)], nimi, { type: tyyppi });
}

const apurit = { nyt: () => new Date('2026-08-18T10:00:00Z'), tunnus: () => 'abc123' };

/* ---------------------------------------------------------------- */
/* Apurit                                                            */
/* ---------------------------------------------------------------- */

test('avainvertailu ei hyväksy tyhjää eikä väärää', () => {
  assert.equal(vertaaSalaisuus('abc', 'abc'), true);
  assert.equal(vertaaSalaisuus('abc', 'abd'), false);
  assert.equal(vertaaSalaisuus('', ''), false, 'tyhjä worker-salaisuus ei saa avata ovea');
  assert.equal(vertaaSalaisuus(null, 'abc'), false);
});

test('origin kelpaa vain listalta tai localhostista', () => {
  const sallitut = [PELI];
  assert.ok(sallittuOrigin(PELI, sallitut));
  assert.ok(sallittuOrigin('http://localhost:8000', sallitut));
  assert.ok(!sallittuOrigin('https://paha.example', sallitut));
  assert.ok(!sallittuOrigin(null, sallitut));
});

test('polku pysyy oman etuliitteen alla', () => {
  assert.ok(turvallinenPolku(`${ETULIITE}2026-01-01-abc/kuva-1.jpg`));
  assert.ok(!turvallinenPolku('muu/kansio/tiedosto.jpg'));
  assert.ok(!turvallinenPolku(`${ETULIITE}../salaisuus`));
});

/* ---------------------------------------------------------------- */
/* POST /laheta                                                      */
/* ---------------------------------------------------------------- */

test('lähetys tallentaa metan ja kuvat kansioon', async () => {
  const ampari = teeAmpari();
  const vastaus = await kasittele(lahetys({
    teksti: 'Tässä kuva Tampereen koskesta.',
    sivu: 'Tampere · Kaupunkilehti',
    tarkenne: 'Koski ja punatiili -sivulle',
    nimimerkki: 'Matkalainen',
    saaKrediitteihin: 'on',
    sahkoposti: 'lukija@example.com',
    lisenssivakuutus: 'on',
  }, [teeKuva('koski.jpg', 'image/jpeg')]), teeYmparisto(ampari), apurit);

  assert.equal(vastaus.status, 200);
  const { ok, kansio } = await vastaus.json();
  assert.ok(ok);
  assert.match(kansio, /^ehdotukset\/2026-08-18T10-00-00-000Z-abc123$/);

  const meta = JSON.parse(await (await ampari.get(`${kansio}/meta.json`)).text());
  assert.equal(meta.teksti, 'Tässä kuva Tampereen koskesta.');
  assert.equal(meta.sivu, 'Tampere · Kaupunkilehti');
  assert.equal(meta.nimimerkki, 'Matkalainen');
  assert.equal(meta.saaKrediitteihin, true);
  assert.equal(meta.sahkoposti, 'lukija@example.com');
  assert.deepEqual(meta.kuvat.map((k) => k.tiedosto), ['kuva-1.jpg']);
  // Palkkiokentät varataan jo lähetyksessä (vaiheen 2 lunastus).
  assert.equal(meta.tila, 'uusi');
  assert.equal(meta.kommentti, '');
  assert.equal(meta.palkkio, null);
  assert.equal(meta.lunastuskoodi, '');
  assert.ok(await ampari.get(`${kansio}/kuva-1.jpg`), 'kuva jäi tallentumatta');
});

test('vieras origin ei saa kirjoittaa', async () => {
  const ampari = teeAmpari();
  const vastaus = await kasittele(
    lahetys({ teksti: 'Hei' }, [], { origin: 'https://paha.example' }),
    teeYmparisto(ampari), apurit,
  );
  assert.equal(vastaus.status, 403);
  assert.equal(ampari.sisalto.size, 0);
});

test('hunajapurkki vaientaa robotin mutta ei tallenna mitään', async () => {
  const ampari = teeAmpari();
  const vastaus = await kasittele(
    lahetys({ teksti: 'Osta halpaa', hunaja: 'robotti' }), teeYmparisto(ampari), apurit,
  );
  assert.equal(vastaus.status, 200);
  assert.equal(ampari.sisalto.size, 0);
});

test('kuvat vaativat lisenssivakuutuksen', async () => {
  const ampari = teeAmpari();
  const vastaus = await kasittele(
    lahetys({ teksti: 'Kuva mukana' }, [teeKuva('a.jpg', 'image/jpeg')]),
    teeYmparisto(ampari), apurit,
  );
  assert.equal(vastaus.status, 400);
  assert.match((await vastaus.json()).virhe, /lisenssivakuutus/i);
  assert.equal(ampari.sisalto.size, 0);
});

test('väärä kuvatyyppi, liian iso kuva ja liian monta kuvaa torjutaan', async () => {
  const ymparisto = teeYmparisto();
  const vaaraTyyppi = await kasittele(
    lahetys({ lisenssivakuutus: 'on' }, [teeKuva('a.gif', 'image/gif')]), ymparisto, apurit,
  );
  assert.equal(vaaraTyyppi.status, 415);

  const iso = await kasittele(
    lahetys({ lisenssivakuutus: 'on' }, [teeKuva('a.jpg', 'image/jpeg', 9 * 1024 * 1024)]),
    ymparisto, apurit,
  );
  assert.equal(iso.status, 413);

  const monta = Array.from({ length: KUVIA_ENINTAAN + 1 },
    (_, i) => teeKuva(`k${i}.jpg`, 'image/jpeg'));
  const liikaa = await kasittele(
    lahetys({ lisenssivakuutus: 'on' }, monta), ymparisto, apurit,
  );
  assert.equal(liikaa.status, 400);
});

test('tyhjä lähetys ei kelpaa', async () => {
  const vastaus = await kasittele(lahetys({ teksti: '   ' }), teeYmparisto(), apurit);
  assert.equal(vastaus.status, 400);
});

/* ---------------------------------------------------------------- */
/* Avaimelliset reitit                                               */
/* ---------------------------------------------------------------- */

/** Lähettää kaksi ehdotusta eri aikoina ja palauttaa ämpärin. */
async function ampariKahdella() {
  const ampari = teeAmpari();
  const ymparisto = teeYmparisto(ampari);
  await kasittele(lahetys({ teksti: 'Vanha' }), ymparisto,
    { nyt: () => new Date('2026-08-17T10:00:00Z'), tunnus: () => 'aaa111' });
  await kasittele(lahetys({ teksti: 'Uusi' }), ymparisto,
    { nyt: () => new Date('2026-08-18T10:00:00Z'), tunnus: () => 'bbb222' });
  return { ampari, ymparisto };
}

test('lista vaatii avaimen', async () => {
  const { ymparisto } = await ampariKahdella();
  const ilman = await kasittele(new Request('https://x.dev/lista'), ymparisto);
  assert.equal(ilman.status, 401);
  const vaaralla = await kasittele(new Request('https://x.dev/lista?avain=huti'), ymparisto);
  assert.equal(vaaralla.status, 401);
});

test('lista palauttaa metat uusin ensin', async () => {
  const { ymparisto } = await ampariKahdella();
  const vastaus = await kasittele(new Request(`https://x.dev/lista?avain=${AVAIN}`), ymparisto);
  assert.equal(vastaus.status, 200);
  const { ehdotukset } = await vastaus.json();
  assert.deepEqual(ehdotukset.map((e) => e.teksti), ['Uusi', 'Vanha']);
});

test('kohde palauttaa kuvan vain avaimella', async () => {
  const ampari = teeAmpari();
  const ymparisto = teeYmparisto(ampari);
  const { kansio } = await (await kasittele(
    lahetys({ teksti: 'Kuva', lisenssivakuutus: 'on' }, [teeKuva('a.jpg', 'image/jpeg')]),
    ymparisto, apurit,
  )).json();

  const ilman = await kasittele(new Request(`https://x.dev/kohde/${kansio}/kuva-1.jpg`), ymparisto);
  assert.equal(ilman.status, 401);

  const kanssa = await kasittele(
    new Request(`https://x.dev/kohde/${kansio}/kuva-1.jpg?avain=${AVAIN}`), ymparisto,
  );
  assert.equal(kanssa.status, 200);
  assert.equal(kanssa.headers.get('content-type'), 'image/jpeg');
});

test('kuratointi kirjaa kommentin, tilan, palkkion ja koodin', async () => {
  const ampari = teeAmpari();
  const ymparisto = teeYmparisto(ampari);
  const { kansio } = await (await kasittele(
    lahetys({ teksti: 'Juttuidea' }), ymparisto, apurit,
  )).json();

  const vastaus = await kasittele(new Request(`https://x.dev/kommentti?avain=${AVAIN}`, {
    method: 'PUT',
    body: JSON.stringify({
      kansio,
      kommentti: 'Sopii Tampereen lehden Koski-sivulle.',
      tila: 'hyvaksytty',
      palkkio: 500,
      lunastuskoodi: 'LUKIJA-500-XYZ',
    }),
  }), ymparisto);
  assert.equal(vastaus.status, 200);

  const meta = JSON.parse(await (await ampari.get(`${kansio}/meta.json`)).text());
  assert.equal(meta.kommentti, 'Sopii Tampereen lehden Koski-sivulle.');
  assert.equal(meta.tila, 'hyvaksytty');
  assert.equal(meta.palkkio, 500);
  assert.equal(meta.lunastuskoodi, 'LUKIJA-500-XYZ');
  assert.ok(meta.kuratoitu, 'kuratointiaika puuttuu');
  assert.equal(meta.teksti, 'Juttuidea', 'muu meta ei saa muuttua');
});

test('tuntematon tila torjutaan', async () => {
  const ampari = teeAmpari();
  const ymparisto = teeYmparisto(ampari);
  const { kansio } = await (await kasittele(
    lahetys({ teksti: 'Juttuidea' }), ymparisto, apurit,
  )).json();
  const vastaus = await kasittele(new Request(`https://x.dev/kommentti?avain=${AVAIN}`, {
    method: 'PUT',
    body: JSON.stringify({ kansio, tila: 'julkaistu' }),
  }), ymparisto);
  assert.equal(vastaus.status, 400);
  assert.ok(TILAT.includes('kuratoitu'));
});

/* ---------------------------------------------------------------- */
/* Natiiviportti (natiivi iOS-peli ilman Originia, 23.9.2026)        */
/* ---------------------------------------------------------------- */

const NATIIVI = 'app.matkakirja.proto3d';

/** Natiivin pelin otsakkeet: tunniste omassa otsakkeessaan ja User-Agentissa. */
function natiiviOtsakkeet(tunniste = NATIIVI, agentti = `Matkakirja/1.0 (${tunniste})`) {
  return { 'x-matkakirja-natiivi': tunniste, 'user-agent': agentti };
}

/** JSON- tai GET-pyyntö natiivista (tai annetusta originista). */
function natiiviPyynto(polku, { metodi = 'POST', runko = null, origin = null, otsakkeet = natiiviOtsakkeet() } = {}) {
  return new Request(`https://esimerkki.workers.dev${polku}`, {
    method: metodi,
    headers: {
      ...(origin ? { origin } : {}),
      ...otsakkeet,
      ...(runko ? { 'content-type': 'application/json' } : {}),
    },
    body: runko ? JSON.stringify(runko) : undefined,
  });
}

/** Kelvollinen kuvavinkki (sama kuin tests/kuvavinkki-worker.test.mjs). */
const KUVAVINKKI = {
  paikka: 'Ritavuoren muistolaatta, Helsinki',
  teksti: 'Laatta talon seinässä, helppo ohittaa.',
  omakuva: 'on',
  kayttolupa: 'sellaisenaan',
};

/** Pelaajan kuusi reittiä natiivipyyntöinä; `o` = natiiviPyynto-asetukset. */
const PELAAJAN_REITIT = {
  '/laheta': (o = {}) => lahetys({ teksti: 'Natiivista' }, [], { origin: o.origin ?? null, otsakkeet: o.otsakkeet ?? natiiviOtsakkeet() }),
  '/kuvavinkki': (o = {}) => lahetys(KUVAVINKKI, [teeKuva('laatta.jpg', 'image/jpeg')],
    { origin: o.origin ?? null, otsakkeet: o.otsakkeet ?? natiiviOtsakkeet(), polku: '/kuvavinkki' }),
  '/pro-tarkista': (o = {}) => natiiviPyynto('/pro-tarkista',
    { ...o, runko: { sahkoposti: 'kuka@example.com', koodi: 'AAAAAAAA' } }),
  '/pro-profiili': (o = {}) => lahetys({ sahkoposti: 'kuka@example.com', koodi: 'AAAAAAAA' }, [],
    { origin: o.origin ?? null, otsakkeet: o.otsakkeet ?? natiiviOtsakkeet(), polku: '/pro-profiili' }),
  '/reaktiot': (o = {}) => natiiviPyynto('/reaktiot?kohteet=juttu%3Alontoo', { ...o, metodi: 'GET' }),
  '/reaktio': (o = {}) => natiiviPyynto('/reaktio',
    { ...o, runko: { kohde: 'juttu:lontoo', symboli: 'hieno', edellinen: null } }),
};

test('natiivitunniste vaatii listan ja saman tunnisteen User-Agentissa', () => {
  const h = (o) => new Headers(o);
  assert.deepEqual([...NATIIVIT_OLETUS], ['app.matkakirja.proto3d', 'app.matkakirja.peli']);
  assert.ok(sallittuNatiivi(h(natiiviOtsakkeet())));
  assert.ok(sallittuNatiivi(h(natiiviOtsakkeet('app.matkakirja.peli'))));
  assert.ok(!sallittuNatiivi(h(natiiviOtsakkeet('app.vieras.peli'))));
  assert.ok(!sallittuNatiivi(h(natiiviOtsakkeet(NATIIVI, 'Mozilla/5.0'))));
  assert.ok(!sallittuNatiivi(h({ 'user-agent': `Matkakirja/1.0 (${NATIIVI})` })));
});

test('natiivi ilman Originia pääsee kaikille kuudelle pelaajan reitille', async () => {
  for (const [polku, teePyynto] of Object.entries(PELAAJAN_REITIT)) {
    const ymparisto = teeYmparisto();
    const vastaus = await kasittele(teePyynto(), ymparisto, apurit);
    const data = await vastaus.json();
    assert.notEqual(vastaus.status, 403, `${polku}: ${JSON.stringify(data)}`);
    assert.notEqual(data.virhe, 'Origin ei ole sallittu', polku);
    // Natiivi ei tarvitse CORSia, eikä sille kaiuteta originia.
    assert.equal(vastaus.headers.get('access-control-allow-origin'), null, polku);
  }
});

test('natiivin lähetys ja kuvavinkki tallentuvat kuten selaimen', async () => {
  const ampari = teeAmpari();
  const ymparisto = teeYmparisto(ampari);
  const laheta = await kasittele(PELAAJAN_REITIT['/laheta'](), ymparisto, apurit);
  assert.equal(laheta.status, 200);
  const { kansio } = await laheta.json();
  const meta = JSON.parse(await (await ampari.get(`${kansio}/meta.json`)).text());
  assert.equal(meta.teksti, 'Natiivista');

  const vinkki = await kasittele(PELAAJAN_REITIT['/kuvavinkki'](), teeYmparisto(), apurit);
  assert.equal(vinkki.status, 200, JSON.stringify(await vinkki.clone().json()));
});

test('natiivin ääni kirjautuu reaktiolaskuriin', async () => {
  const ymparisto = teeYmparisto();
  const aani = await kasittele(PELAAJAN_REITIT['/reaktio'](), ymparisto, apurit);
  assert.equal(aani.status, 200, JSON.stringify(await aani.clone().json()));
  const haku = await kasittele(PELAAJAN_REITIT['/reaktiot'](), ymparisto, apurit);
  assert.equal(haku.status, 200);
  assert.match(JSON.stringify(await haku.json()), /"hieno":1/);
});

test('natiivin rajat ovat samat kuin selaimen: liian iso kuva torjutaan', async () => {
  const ampari = teeAmpari();
  const iso = await kasittele(lahetys({ lisenssivakuutus: 'on' },
    [teeKuva('a.jpg', 'image/jpeg', 9 * 1024 * 1024)], { origin: null, otsakkeet: natiiviOtsakkeet() }),
  teeYmparisto(ampari), apurit);
  assert.equal(iso.status, 413);
  const monta = Array.from({ length: KUVIA_ENINTAAN + 1 }, (_, i) => teeKuva(`k${i}.jpg`, 'image/jpeg'));
  const liikaa = await kasittele(lahetys({ lisenssivakuutus: 'on' }, monta,
    { origin: null, otsakkeet: natiiviOtsakkeet() }), teeYmparisto(ampari), apurit);
  assert.equal(liikaa.status, 400);
  assert.equal(ampari.sisalto.size, 0);
});

test('natiiviportti torjuu väärän tunnisteen, väärän User-Agentin ja puuttuvan otsakkeen', async () => {
  const torjuttavat = [
    natiiviOtsakkeet('app.vieras.peli'),
    natiiviOtsakkeet(NATIIVI, 'curl/8.0'),
    { 'user-agent': `Matkakirja/1.0 (${NATIIVI})` },
    {},
  ];
  for (const [polku, teePyynto] of Object.entries(PELAAJAN_REITIT)) {
    for (const otsakkeet of torjuttavat) {
      const ampari = teeAmpari();
      const vastaus = await kasittele(teePyynto({ otsakkeet }), teeYmparisto(ampari), apurit);
      assert.equal(vastaus.status, 403, `${polku} ${JSON.stringify(otsakkeet)}`);
      assert.equal(ampari.sisalto.size, 0, polku);
    }
  }
});

test('vieras origin ei muutu sallituksi natiiviotsakkeella', async () => {
  for (const [polku, teePyynto] of Object.entries(PELAAJAN_REITIT)) {
    const ampari = teeAmpari();
    const vastaus = await kasittele(teePyynto({ origin: 'https://paha.example' }), teeYmparisto(ampari), apurit);
    assert.equal(vastaus.status, 403, polku);
    assert.equal(ampari.sisalto.size, 0, polku);
  }
});

test('natiiviotsake ei avaa omistajan avainreittejä', async () => {
  const { ymparisto } = await ampariKahdella();
  for (const polku of ['/lista', '/reaktio-lista', '/pro-lista']) {
    const vastaus = await kasittele(natiiviPyynto(polku, { metodi: 'GET' }), ymparisto);
    assert.equal(vastaus.status, 401, polku);
  }
});

test('natiivi ei saa OPTIONS-esilentoa (ei tarvitse CORSia)', async () => {
  const vastaus = await kasittele(natiiviPyynto('/laheta', { metodi: 'OPTIONS' }), teeYmparisto());
  assert.equal(vastaus.status, 403);
});

test('EHDOTUS_NATIIVIT ohittaa oletuslistan, tyhjä = oletus', async () => {
  const oma = { ...teeYmparisto(), EHDOTUS_NATIIVIT: ' app.matkakirja.testi , app.muu.peli ' };
  const hyva = await kasittele(lahetys({ teksti: 'Hei' }, [],
    { origin: null, otsakkeet: natiiviOtsakkeet('app.matkakirja.testi') }), oma, apurit);
  assert.equal(hyva.status, 200);
  const oletus = await kasittele(lahetys({ teksti: 'Hei' }, [],
    { origin: null, otsakkeet: natiiviOtsakkeet(NATIIVI) }), oma, apurit);
  assert.equal(oletus.status, 403, 'oletuslistan tunniste ei kelpaa, kun lista on annettu');
  const tyhja = await kasittele(lahetys({ teksti: 'Hei' }, [],
    { origin: null, otsakkeet: natiiviOtsakkeet(NATIIVI) }), { ...teeYmparisto(), EHDOTUS_NATIIVIT: '' }, apurit);
  assert.equal(tyhja.status, 200);
});
