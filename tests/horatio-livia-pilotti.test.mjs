import test from 'node:test';
import assert from 'node:assert/strict';

import { FOKUSVIRRAT } from '../js/packs/fokusvirrat.js';

const PILOTIT = ['marseille', 'ateena', 'sarajevo', 'venetsia'];

const LAHTOBUDJETIT = {
  marseille: { merkit: 430, sanat: 56 },
  ateena: { merkit: 449, sanat: 57 },
  sarajevo: { merkit: 436, sanat: 54 },
  venetsia: { merkit: 454, sanat: 59 },
};

const HYVAKSYTYT_TTS = {
  marseille: {
    horatio: '[curious] Marseillen satamassa saippuaa myytiin tiiliskivinä, kuulemma koko maailman pesuun. Kauppiaan mustat kynnet kertoivat köysitöistä. Ostin palan, mutta terva, kala ja suolavesi seurasivat majataloon. [softly] Maailma jäi likaiseksi; käteni olivat jo toista mieltä.',
    livia: '[curious] Marseillen saippuaa tehdään yhä. [warmly] Minä erotan Vieux-Portin jo äänestä ja suolasta höyhenissä. [mischievously] Lokit tuntevat jokaisen pöydän. [softly] Minä vasta harjoittelen.',
    liviaAnkkurit: ['saippuaa tehdään yhä', 'Vieux-Portin jo äänestä', 'Lokit tuntevat jokaisen pöydän', 'Minä vasta harjoittelen'],
  },
  ateena: {
    horatio: '[curious] Ateenassa Troijan kullasta puhuttiin kuin kaikki olisivat olleet kaivamassa. Kahvilan isäntä piti Schliemannia nerona, asiakas varkaana; kultaa ei ollut kummallakaan näyttää. Akropolis ei tarvinnut mainosta. [softly] Maksoin kahvin kolikolla, jonka alkuperää ei kysytty.',
    livia: '[curious] Schliemannin talo on nyt rahamuseo. [mischievously] Etsin puutarhasta varjoa, mutta kahvilan pöytien alta löytyi pullanmuruja. [brightly] Siinä unohtui varjo hetkeksi!',
    liviaAnkkurit: ['nyt rahamuseo', 'Etsin puutarhasta varjoa', 'pöytien alta löytyi pullanmuruja', 'unohtui varjo hetkeksi'],
  },
  sarajevo: {
    horatio: '[curious] Sarajevon kupariseppä naputti pannua vasaralla, jonka olisin hukannut taskuun. Viereisessä puodissa oli samanlainen kahvipannu. Olin juonut aamulla katsomatta; nyt näin jokaisen jäljen. [softly] Basaarin kilkutuksessa aamiainen muuttui käsityöksi.',
    livia: '[softly] Kuparisepät naputtavat basaarissa yhä. [curious] Minun piti vain piipahtaa, mutta jäin kuuntelemaan yhtä vasaraa. [mischievously] Yritin naputtaa nokalla samaa tahtia — seppä oli kyllä nopeampi!',
    liviaAnkkurit: ['basaarissa yhä', 'jäin kuuntelemaan yhtä vasaraa', 'naputtaa nokalla samaa tahtia', 'seppä oli kyllä nopeampi'],
  },
  venetsia: {
    horatio: '[curious] Venetsiassa majatalon ovi avautui veteen, ja olin astua uimaan. Gondolieri piti ilmeensä suorana. Palatsien välissä kuulin lusikan osuvan kahvikuppiin yläkerrassa. [softly] Taloilla oli hienot julkisivut; vesi kuunteli niiden aamiaista.',
    livia: '[brightly] Venetsiassa kuljetaan yhä vesibusseilla. [warmly] Minä lennän nykyään vähän pidempää reittiä. [whispers] Yhden tutun takia. Hetkinen — nuo kuvat ovat yksityisiä! [mischievously] Hän vain sattui jokaiseen hyvään kuvakulmaan. [softly] No, ehkä minä vähän odotin.',
    liviaAnkkurit: ['kuljetaan yhä vesibusseilla', 'vähän pidempää reittiä', 'Yhden tutun takia', 'kuvat ovat yksityisiä', 'jokaiseen hyvään kuvakulmaan', 'ehkä minä vähän odotin'],
  },
};

function ilmanTageja(teksti) {
  return String(teksti ?? '').replace(/\[[^\]]+\]\s*/g, '').trim();
}

function virkkeita(teksti) {
  return (String(teksti ?? '').match(/[.!?](?=\s|$)/g) ?? []).length;
}

function sanoja(teksti) {
  return String(teksti ?? '').trim().split(/\s+/u).filter(Boolean).length;
}

test('pilotin Horatio-teksti ja TTS ovat samasanaiset', () => {
  for (const cityId of PILOTIT) {
    const matkakirja = FOKUSVIRRAT[cityId].matkakirja;
    assert.equal(ilmanTageja(matkakirja.luenta), matkakirja.teksti, cityId);
    assert.doesNotMatch(matkakirja.teksti, /\[[^\]]+\]/, `${cityId}: tagi näkyy pelaajalle`);
    assert.ok(virkkeita(matkakirja.teksti) <= 5, `${cityId}: Horatio ei tiivistynyt`);
  }
});

test('pilotin yhteinen Horatio–Livia-pari alittaa julkaistun lähtöbudjetin', () => {
  for (const cityId of PILOTIT) {
    const virta = FOKUSVIRRAT[cityId];
    const kommentit = virta.pollo.kommentti;
    assert.equal(kommentit.length, 1, `${cityId}: pilotti on yksi kupla`);
    assert.ok(virkkeita(kommentit[0]) >= 3, `${cityId}: näkökulman vaihto jäi liian lyhyeksi`);
    assert.doesNotMatch(kommentit[0], /\[[^\]]+\]/, `${cityId}: TTS-tagi näkyy kuplassa`);
    const pari = `${virta.matkakirja.teksti}${kommentit[0]}`;
    assert.ok(pari.length <= LAHTOBUDJETIT[cityId].merkit,
      `${cityId}: pari ylittää lähtöparin merkkibudjetin`);
    assert.ok(sanoja(pari) <= LAHTOBUDJETIT[cityId].sanat,
      `${cityId}: pari ylittää lähtöparin sanabudjetin`);
  }
});

test('pilotin Horatio-cueilla on pysyvät yksikäsitteiset ankkurit', () => {
  for (const cityId of PILOTIT) {
    const matkakirja = FOKUSVIRRAT[cityId].matkakirja;
    const ids = new Set();
    for (const cue of matkakirja.reaktiot) {
      assert.match(cue.id, new RegExp(`^${cityId}\\.r\\d+$`), `${cityId}: cueId`);
      assert.ok(!ids.has(cue.id), `${cityId}: cueId toistuu`);
      ids.add(cue.id);
      assert.equal(matkakirja.teksti.split(cue.ankkuri).length - 1, 1,
        `${cue.id}: ankkurin pitää esiintyä tasan kerran`);
    }
  }
});

test('hyväksytyt r2-sanat, TTS-tagit ja Livian cue-ankkurit ovat tarkat', () => {
  for (const cityId of PILOTIT) {
    const virta = FOKUSVIRRAT[cityId];
    const hyvaksytty = HYVAKSYTYT_TTS[cityId];
    assert.equal(virta.matkakirja.luenta, hyvaksytty.horatio, `${cityId}: Horatio TTS`);
    assert.equal(ilmanTageja(hyvaksytty.horatio), virta.matkakirja.teksti,
      `${cityId}: Horatio näkyvät sanat`);
    assert.equal(ilmanTageja(hyvaksytty.livia), virta.pollo.kommentti[0],
      `${cityId}: Livia näkyvät sanat`);
    for (const ankkuri of hyvaksytty.liviaAnkkurit) {
      assert.equal(virta.pollo.kommentti[0].split(ankkuri).length - 1, 1,
        `${cityId}: Livian ankkurin pitää esiintyä tasan kerran: ${ankkuri}`);
    }
  }
});
