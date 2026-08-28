/*
 * REAKTIOT: symbolit, kohdeavaimet, oma ääni, jaetut laskurit ja
 * virheilmoituksen jono.
 *
 * KAKSI ASIAA, JOTKA EIVÄT SAA MENNÄ RIKKI:
 *
 *   1. KOHDEAVAIN. Ääni kiinnittyy avaimeen, ja avain on ainoa side
 *      pelaajan napautuksen ja laskurin välillä. Jos väliotsikon
 *      ankkuri muuttuu pilkun lisäämisestä, kaikki sen äänet katoavat
 *      pelaajien silmistä eikä kukaan huomaa mitään — siksi ankkurin
 *      vakaudella on omat testinsä.
 *   2. VIRHEILMOITUKSEN KUORMA. Se kulkee ehdotuskanavan läpi
 *      (js/ehdotukset.js lahetaEhdotus → workerin POST /laheta), joka
 *      on kirjoitettu juttuideoille eikä reaktioille: jos etuliite
 *      katoaa tekstin tai tarkenteen alusta, omistajan Lukijoilta-
 *      lehteen valuu nimettömiä lappuja, joita ei voi lajitella.
 *
 * Kolmas on jono: lähetys ei saa koskaan kaataa peliä eikä kadota
 * ilmoitusta verkkokatkoon.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  REAKTIO_AANET_TALLE, REAKTIO_ETULIITTEET, REAKTIO_JONO_TALLE, REAKTIO_SYMBOLIT,
  REAKTIO_TEKSTIN_KATTO, asetaOmaAani, haeReaktiolaskurit, jonotaReaktio, lahetaAani,
  nollaaReaktiot, omaAani, otsikkoAvain, puraReaktiojono, reaktioSymboli, reaktioVersio,
  reaktionKuorma, reaktiotKaytossa, tyhjatAanet, voittajaSymboli,
} from '../js/reaktiot.js';

/** Muistissa elävä localStorage — sama sopimus kuin selaimen. */
function asennaVarasto() {
  const arvot = new Map();
  globalThis.localStorage = {
    getItem: (k) => (arvot.has(k) ? arvot.get(k) : null),
    setItem: (k, v) => { arvot.set(k, String(v)); },
    removeItem: (k) => { arvot.delete(k); },
  };
  return arvot;
}

/** Yksi fetch-vastaus, ja kirjanpito siitä mitä pyydettiin. */
function asennaVerkko(vastaus) {
  const kutsut = [];
  const alkuperainen = globalThis.fetch;
  globalThis.fetch = async (url, asetukset = {}) => {
    kutsut.push({ url: String(url), asetukset });
    return new Response(JSON.stringify(vastaus),
      { status: 200, headers: { 'content-type': 'application/json' } });
  };
  return { kutsut, palauta: () => { globalThis.fetch = alkuperainen; } };
}

/* ------------------------------------------------------------------ *
 * Symbolit
 * ------------------------------------------------------------------ */

test('kanava on kytketty (muuten nappia ei piirretä lainkaan)', () => {
  // Sama portti kuin ehdotuslomakkeella: tyhjä EHDOTUS_OSOITE piilottaa
  // koko toiminnon. Testi vahtii, ettei osoite katoa vahingossa.
  assert.equal(reaktiotKaytossa(), true);
});

test('viisi symbolia omistajan järjestyksessä ja suomenkielisin nimin', () => {
  assert.deepEqual(REAKTIO_SYMBOLIT.map((s) => s.id),
    ['hieno', 'ihana', 'mielenkiintoinen', 'tylsa', 'virhe']);
  assert.deepEqual(REAKTIO_SYMBOLIT.map((s) => s.nimi),
    ['Hieno', 'Ihana', 'Mielenkiintoinen', 'Tylsä', 'Virhe']);
  // Jokaisella on piirros: tyhjä polku olisi näkymätön nappi.
  for (const symboli of REAKTIO_SYMBOLIT) {
    assert.ok(symboli.polku.includes('<path') || symboli.polku.includes('<circle'),
      `${symboli.id}: ei piirrosta`);
  }
  assert.equal(reaktioSymboli('tylsa').nimi, 'Tylsä');
  assert.equal(reaktioSymboli('peukku'), null);
});

test('voittajasymboli on eniten ääniä saanut, tasapelissä listan ensimmäinen', () => {
  assert.equal(voittajaSymboli(tyhjatAanet()), null);
  assert.deepEqual(voittajaSymboli({ ...tyhjatAanet(), ihana: 3, tylsa: 1 }),
    { id: 'ihana', maara: 3 });
  // Tasapeli: hieno on listalla ennen ihanaa, joten se voittaa.
  assert.equal(voittajaSymboli({ ...tyhjatAanet(), hieno: 2, ihana: 2 }).id, 'hieno');
  // Mustetahra voittaa siinä missä muutkin — virhe on julkisesti
  // näkyvissä, kunnes omistaja merkitsee sen korjatuksi.
  assert.equal(voittajaSymboli({ ...tyhjatAanet(), hieno: 1, virhe: 5 }).id, 'virhe');
});

/* ------------------------------------------------------------------ *
 * Kohdeavaimet
 * ------------------------------------------------------------------ */

test('väliotsikon avain on sivun avain ja otsikosta johdettu ankkuri', () => {
  assert.equal(otsikkoAvain('aihe:lontoo:historia', 'Sumu ja savu'),
    'otsikko:aihe:lontoo:historia:sumu-ja-savu');
});

test('ankkuri kestää välimerkit, ison alkukirjaimen ja skandit', () => {
  const perus = otsikkoAvain('aihe:helsinki:ruoka', 'Kalakukko');
  // Sama otsikko eri kirjoitusasuissa antaa saman avaimen: muuten
  // yhden pilkun lisääminen hukkaisi kaikki kohteen äänet.
  assert.equal(otsikkoAvain('aihe:helsinki:ruoka', 'KALAKUKKO!'), perus);
  assert.equal(otsikkoAvain('aihe:helsinki:ruoka', '  Kalakukko  '), perus);
  // Skandit taittuvat perusmuotoon, ja sama otsikko yhdistelmämerkeillä
  // (NFD) antaa saman avaimen kuin valmiiksi yhdistettynä (NFC).
  assert.equal(otsikkoAvain('aihe:oulu:luonto', 'Yötön yö'),
    'otsikko:aihe:oulu:luonto:yoton-yo');
  assert.equal(otsikkoAvain('aihe:oulu:luonto', 'Yötön yö'.normalize('NFD')),
    otsikkoAvain('aihe:oulu:luonto', 'Yötön yö'));
});

test('puuttuva sivu tai pelkkiä välimerkkejä oleva otsikko ei tuota avainta', () => {
  assert.equal(otsikkoAvain('', 'Otsikko'), null);
  assert.equal(otsikkoAvain('aihe:lontoo:historia', ''), null);
  assert.equal(otsikkoAvain('aihe:lontoo:historia', '— · —'), null);
});

/* ------------------------------------------------------------------ *
 * Virheilmoituksen kuorma
 * ------------------------------------------------------------------ */

test('virheen kuorma kantaa etuliitteen sekä tekstissä että tarkenteessa', () => {
  const kuorma = reaktionKuorma('virhe', 'juttu:lontoo:Tower Bridge',
    { otsikko: 'Tower Bridge' });
  assert.ok(kuorma.teksti.startsWith(`${REAKTIO_ETULIITTEET.virhe}: Tower Bridge`));
  assert.ok(kuorma.tarkenne.startsWith(REAKTIO_ETULIITTEET.virhe));
  assert.equal(kuorma.sivu, 'juttu:lontoo:Tower Bridge');
  assert.ok(kuorma.teksti.includes('Sisältö: juttu:lontoo:Tower Bridge'));
});

test('virheilmoituksen vapaateksti tulee mukaan ja katkeaa kattoon', () => {
  const pitka = 'x'.repeat(REAKTIO_TEKSTIN_KATTO + 50);
  const kuorma = reaktionKuorma('virhe', 'kohde:thessaloniki',
    { teksti: pitka, otsikko: 'Thessaloniki' });
  const rivit = kuorma.teksti.split('\n');
  const vapaa = rivit.find((r) => r.startsWith('x'));
  assert.equal(vapaa.length, REAKTIO_TEKSTIN_KATTO);
});

test('tyhjä vapaateksti ei jätä tyhjää lohkoa kuormaan', () => {
  const kuorma = reaktionKuorma('virhe', 'ihme:Knossos', { otsikko: 'Knossos' });
  assert.ok(!/\n\n\n/.test(kuorma.teksti), kuorma.teksti);
  assert.ok(kuorma.teksti.includes('Otsikko: Knossos'));
});

test('worker saa aina epätyhjän tekstin — myös ilman otsikkoa ja versiota', () => {
  // POST /laheta hylkää lähetyksen, jossa ei ole tekstiä eikä kuvaa.
  const kuorma = reaktionKuorma('virhe', 'otsikko:aihe:praha:historia:kellotorni');
  assert.ok(kuorma.teksti.trim().length > 0);
  assert.ok(kuorma.tarkenne.includes('otsikko:aihe:praha:historia:kellotorni'));
});

test('versio luetaan DOMista eikä muutoslokista', () => {
  // js/muutokset.js on niputuksessa vasta ui.js:n jälkeen, joten
  // reaktiot ei voi tuoda sitä. Puuttuva elementti on tyhjä merkkijono,
  // ei kaatuminen.
  assert.equal(reaktioVersio(null), '');
  assert.equal(reaktioVersio({ getElementById: () => ({ textContent: ' 2026-08-09.1245 ' }) }),
    '2026-08-09.1245');
});

/* ------------------------------------------------------------------ *
 * Laitteen oma ääni
 * ------------------------------------------------------------------ */

test('yksi ääni per laite per kohde, vaihdettavissa ja peruttavissa', () => {
  asennaVarasto();
  assert.equal(omaAani('kohde:akropolis'), '');
  assert.equal(asetaOmaAani('kohde:akropolis', 'ihana'), '');
  assert.equal(omaAani('kohde:akropolis'), 'ihana');
  // Vaihto palauttaa edellisen, jotta laskurista voi vähentää oikean.
  assert.equal(asetaOmaAani('kohde:akropolis', 'hieno'), 'ihana');
  assert.equal(omaAani('kohde:akropolis'), 'hieno');
  // Peruminen tyhjentää.
  assert.equal(asetaOmaAani('kohde:akropolis', ''), 'hieno');
  assert.equal(omaAani('kohde:akropolis'), '');
  // Eri kohde on eri ääni.
  asetaOmaAani('kohde:delfoi', 'tylsa');
  assert.equal(omaAani('kohde:akropolis'), '');
  assert.equal(omaAani('kohde:delfoi'), 'tylsa');
});

test('tuntematon symboli muistissa ei pääse läpi omana äänenä', () => {
  const arvot = asennaVarasto();
  arvot.set(REAKTIO_AANET_TALLE, JSON.stringify({ 'kohde:x': 'peukku' }));
  assert.equal(omaAani('kohde:x'), '');
});

test('yksityinen selaus ei kaada äänestystä', () => {
  globalThis.localStorage = {
    getItem: () => { throw new Error('ei käytössä'); },
    setItem: () => { throw new Error('ei käytössä'); },
    removeItem: () => { throw new Error('ei käytössä'); },
  };
  assert.doesNotThrow(() => asetaOmaAani('kohde:patras', 'hieno'));
  assert.equal(omaAani('kohde:patras'), '');
});

/* ------------------------------------------------------------------ *
 * Jaetut laskurit
 * ------------------------------------------------------------------ */

test('laskurihaku koodaa kohdeavaimet ja täydentää puuttuvat nolliksi', async () => {
  const verkko = asennaVerkko({ reaktiot: { 'juttu:lontoo:Tower Bridge': { hieno: 3 } } });
  try {
    const tulos = await haeReaktiolaskurit(['juttu:lontoo:Tower Bridge', 'kohde:delfoi']);
    // Kaksoispiste ja välilyönti on koodattava, tai kysely hajoaa.
    assert.ok(verkko.kutsut[0].url.includes('/reaktiot?kohteet='));
    assert.ok(verkko.kutsut[0].url.includes('Tower%2520Bridge')
      || verkko.kutsut[0].url.includes('Tower%20Bridge'), verkko.kutsut[0].url);
    assert.equal(tulos['juttu:lontoo:Tower Bridge'].hieno, 3);
    assert.equal(tulos['juttu:lontoo:Tower Bridge'].virhe, 0);
    assert.deepEqual(tulos['kohde:delfoi'], tyhjatAanet());
  } finally {
    verkko.palauta();
  }
});

test('verkkovirhe laskureissa on nollanäkymä eikä poikkeus', async () => {
  const alkuperainen = globalThis.fetch;
  globalThis.fetch = async () => { throw new Error('offline'); };
  try {
    assert.deepEqual(await haeReaktiolaskurit(['kohde:delfoi']), {});
    assert.equal(await lahetaAani('kohde:delfoi', 'hieno', ''), null);
  } finally {
    globalThis.fetch = alkuperainen;
  }
});

test('ääni lähtee uutena ja edellisenä, jotta vaihto ei kasvata summaa', async () => {
  const verkko = asennaVerkko({ ok: true, aanet: { ...tyhjatAanet(), hieno: 1 } });
  try {
    const aanet = await lahetaAani('kohde:akropolis', 'hieno', 'ihana', 'Akropolis');
    const runko = JSON.parse(verkko.kutsut[0].asetukset.body);
    assert.equal(runko.kohde, 'kohde:akropolis');
    assert.equal(runko.symboli, 'hieno');
    assert.equal(runko.edellinen, 'ihana');
    assert.equal(runko.otsikko, 'Akropolis');
    assert.equal(aanet.hieno, 1);
  } finally {
    verkko.palauta();
  }
});

test('peruminen lähtee ilman uutta symbolia, tyhjä ele ei lähetä mitään', async () => {
  const verkko = asennaVerkko({ ok: true, aanet: tyhjatAanet() });
  try {
    await lahetaAani('kohde:akropolis', '', 'hieno');
    assert.equal(JSON.parse(verkko.kutsut[0].asetukset.body).symboli, null);
    assert.equal(await lahetaAani('kohde:akropolis', '', ''), null);
    assert.equal(verkko.kutsut.length, 1);
  } finally {
    verkko.palauta();
  }
});

/* ------------------------------------------------------------------ *
 * Jono
 * ------------------------------------------------------------------ */

test('istunnon virhe-esto on tyhjennettävissä', () => {
  nollaaReaktiot();
  // reaktioIlmoitettu on piirtäjän käyttämä lippu; ilman piirtoa se on
  // aina epätosi, ja nollaus palauttaa saman tilan.
  assert.doesNotThrow(() => nollaaReaktiot());
});

test('epäonnistunut lähetys jää jonoon eikä katoa', async () => {
  const arvot = asennaVarasto();
  const kuorma = reaktionKuorma('virhe', 'kohde:delfoi', { otsikko: 'Delfoi' });
  jonotaReaktio(kuorma);
  assert.equal(JSON.parse(arvot.get(REAKTIO_JONO_TALLE)).length, 1);

  // Verkko yhä poikki: kuorma palaa jonoon, se ei häviä purkuyrityksessä.
  const alkuperainen = globalThis.fetch;
  globalThis.fetch = async () => { throw new Error('offline'); };
  try {
    assert.equal(await puraReaktiojono(), 0);
  } finally {
    globalThis.fetch = alkuperainen;
  }
  assert.equal(JSON.parse(arvot.get(REAKTIO_JONO_TALLE)).length, 1);
});

test('verkon palatessa jono tyhjenee', async () => {
  const arvot = asennaVarasto();
  jonotaReaktio(reaktionKuorma('virhe', 'kohde:nafplio', { teksti: 'Vuosiluku väärin.' }));
  const alkuperainen = globalThis.fetch;
  globalThis.fetch = async () => new Response('{"ok":true}',
    { status: 200, headers: { 'content-type': 'application/json' } });
  try {
    assert.equal(await puraReaktiojono(), 1);
  } finally {
    globalThis.fetch = alkuperainen;
  }
  assert.equal(arvot.get(REAKTIO_JONO_TALLE), undefined);
});

test('yksityinen selaus ei kaada lähetystä', () => {
  globalThis.localStorage = {
    getItem: () => { throw new Error('ei käytössä'); },
    setItem: () => { throw new Error('ei käytössä'); },
    removeItem: () => { throw new Error('ei käytössä'); },
  };
  assert.doesNotThrow(() => jonotaReaktio(reaktionKuorma('virhe', 'kohde:patras')));
});
