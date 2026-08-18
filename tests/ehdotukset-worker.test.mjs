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
  ETULIITE, KUVIA_ENINTAAN, TILAT, kasittele, sallittuOrigin, turvallinenPolku,
  vertaaSalaisuus,
} from '../worker/ehdotukset/kasittelija.js';

const PELI = 'https://ravelius.github.io';
const AVAIN = 'salainen-avain-123';

/** Muistissa elävä R2-ämpäri: put, get ja list samoilla nimillä. */
function teeAmpari() {
  const sisalto = new Map();
  return {
    sisalto,
    async put(avain, arvo, asetukset = {}) {
      const tavut = typeof arvo === 'string' ? new TextEncoder().encode(arvo).buffer : arvo;
      sisalto.set(avain, { tavut, httpMetadata: asetukset.httpMetadata ?? {} });
    },
    async get(avain) {
      const kohde = sisalto.get(avain);
      if (!kohde) return null;
      return {
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

/** Lomakelähetys pelin originista. */
function lahetys(kentat = {}, kuvat = [], { origin = PELI } = {}) {
  const lomake = new FormData();
  for (const [nimi, arvo] of Object.entries(kentat)) lomake.append(nimi, arvo);
  for (const kuva of kuvat) lomake.append('kuvat', kuva);
  return new Request('https://esimerkki.workers.dev/laheta', {
    method: 'POST',
    headers: origin ? { origin } : {},
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
