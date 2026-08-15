// Taustaäänten tasaus.
//
// Omistajan havainto 2.8.2026: "Toiset tausta-äänet ovat aika hiljaisia
// ja toiset taas häiritsevät liikaa puhetta." Kertoimet oli asetettu
// korvakuulolta yksi kerrallaan, eikä korva muista edellistä äänitettä.
// Nyt ne mitataan (tools/mittaa-aanet.mjs) ja kirjoitetaan koneellisesti.
//
// Nämä testit vartioivat kahta asiaa: ettei mitattua tasausta vahingossa
// pyyhitä pois, ja ettei kerroin lupaa enempää kuin soitinketju pystyy
// toteuttamaan.

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { keraaOsoitteet, voimaTasolle, pyorista } from '../tools/mittaa-aanet.mjs';
import { jaaAlku } from '../js/aani-ehdokkaat.js';

const LAHDE = readFileSync(new URL('../js/aani-ehdokkaat.js', import.meta.url), 'utf8');
const VIRTA = readFileSync(new URL('../js/ambience-stream.js', import.meta.url), 'utf8');

test('kerroin ei ylitä sitä mitä soitinketju pystyy toistamaan', () => {
  // Taustaääni soi tasolla VOIMA * voima, ja HTML-soittimen volume ei voi
  // ylittää ykköstä. Sitä suurempi kerroin vain leikkautuisi pois, jolloin
  // tasaus valehtelisi: kaksi eri kerrointa soisi samalla tasolla.
  const perus = Number(VIRTA.match(/const VOIMA = ([\d.]+)/)[1]);
  assert.ok(perus > 0 && perus < 1, `odottamaton perustaso ${perus}`);
  const katto = 1 / perus;
  for (const { url, voima } of keraaOsoitteet(LAHDE)) {
    assert.ok(voima <= katto,
      `${url.split('/').pop()}: kerroin ${voima} leikkautuisi (katto ${katto.toFixed(2)})`);
  }
});

test('taustaäänille on mitattu kerroin eikä oletusta', () => {
  const osoitteet = keraaOsoitteet(LAHDE);
  assert.ok(osoitteet.length > 100, `äänitteitä pitäisi olla yli 100, nyt ${osoitteet.length}`);
  // Mittaus antaa jokaiselle oman kertoimensa. Jos suuri osa on tasan 1,
  // tasaus on pyyhitty pois tai jäänyt ajamatta uusille äänitteille.
  const oletuksella = osoitteet.filter((o) => !o.asetettu).length;
  assert.ok(oletuksella < osoitteet.length * 0.1,
    `${oletuksella}/${osoitteet.length} äänitteellä ei ole mitattua kerrointa — aja tools/mittaa-aanet.mjs`);
});

test('jokainen taustaääni on LUFS-mitattu — uusi äänite mitataan heti', () => {
  /*
   * Omistajan linjaus 15.8.2026: "tulevat uudet taustaäänet mitataan
   * heti luotaessa että ongelmaa ei tule jatkossa". Tausta: tavoitteen
   * noston ja uusien kaupunkien jälkeen mittaus jäi ajamatta, ja
   * efektiivisten tasojen hajonta kasvoi 35 desibeliin — osa raidoista
   * huusi ja osa hukkui puheväistön alle (v692 korjasi).
   *
   * Tämä testi tekee säännöstä koneellisen: uusi äänite ei pääse
   * mainiin ilman mittausta, koska sen URL puuttuu aanitasot.jsonista.
   * Korjaus on aina sama komento: node tools/mittaa-aanet.mjs
   * --kirjoita (konttiverkossa työkalu hoitaa proxyn itse).
   */
  const data = JSON.parse(readFileSync(new URL('../tools/aanitasot.json', import.meta.url), 'utf8'));
  const mitatut = new Map(data.mitattu.map((m) => [m.url, m]));
  for (const { url } of keraaOsoitteet(LAHDE)) {
    const m = mitatut.get(url);
    assert.ok(m && Number.isFinite(m.lufs),
      `${url.split('/').pop()}: ei LUFS-mittausta — aja node tools/mittaa-aanet.mjs --kirjoita`);
  }
});

test('kertoimet jakautuvat molempiin suuntiin', () => {
  // Tasaus sekä vaimentaa että vahvistaa. Jos kaikki ovat samalla
  // puolella ykköstä, tavoitetaso on valittu väärin — silloin koko
  // taustakerros olisi liian kova tai liian hiljainen.
  const voimat = keraaOsoitteet(LAHDE).map((o) => o.voima);
  assert.ok(voimat.some((v) => v < 0.9), 'yksikään äänite ei vaimene');
  assert.ok(voimat.some((v) => v > 1.1), 'yksikään äänite ei vahvistu');
});

test('jaaAlku lukee mitatun kertoimen oikein', () => {
  // Työkalu kirjoittaa säädöt tässä muodossa; peli lukee ne jaaAlkulla.
  // Jos muodot eriytyvät, kertoimet jäisivät hiljaa huomiotta.
  assert.deepEqual(jaaAlku('https://x/y.mp3#voima=0.42'),
    { url: 'https://x/y.mp3', alku: 0, voima: 0.42 });
  assert.deepEqual(jaaAlku('https://x/y.mp3#alku=20&voima=2.5'),
    { url: 'https://x/y.mp3', alku: 20, voima: 2.5 });
  // Aloituskohta ei saa kadota tasauksessa: se on omistajan valitsema
  // kohta äänitteestä eikä liity voimakkuuteen.
  const alkuKanssa = [...LAHDE.matchAll(/#alku=(\d+)&voima=/g)];
  assert.ok(alkuKanssa.length > 0, 'alku-säädöt katosivat tasauksessa');
});

test('voimaTasolle laskee oikean suunnan', () => {
  // Tavoitetta hiljaisempi äänite vahvistuu, kovempi vaimenee.
  assert.ok(voimaTasolle(-40, -30) > 1);
  assert.ok(voimaTasolle(-20, -30) < 1);
  assert.equal(voimaTasolle(-30, -30), 1);
  // 6 dB on kaksinkertainen amplitudi.
  assert.ok(Math.abs(voimaTasolle(-36, -30) - 2) < 0.01);
  // Rajat pitävät.
  assert.equal(pyorista(99), 6);
  assert.equal(pyorista(0.001), 0.15);
});

test('kertoja väistää taustan ja laskuri palautuu', async () => {
  // Omistaja: "Vieläkin on vaikea kuulla puhetta." Syy oli, ettei
  // kertoja väistänyt taustaa lainkaan — vain näyte ja zoomausääni.
  const ui = readFileSync(new URL('../js/ui.js', import.meta.url), 'utf8');
  assert.match(ui, /puheAlkoi\(\)/, 'kertoja ei ilmoita väistöstä');
  assert.match(ui, /puheLoppui\(\)/, 'väistöä ei vapauteta');
  // Molemmat kertojat: avausteksti ja päiväkirja.
  const kutsut = [...ui.matchAll(/this\.merkitsePuhuja\(/g)].length;
  assert.ok(kutsut >= 2, `vain ${kutsut} kertojaa merkitty — molemmat tarvitaan`);
  // Pysäytys vapauttaa, muuten laskuri jäisi plussalle eikä tausta
  // palaisi enää koskaan täyteen voimaan.
  assert.match(ui, /vapautaPuhuja\(audio\)/);

  const { puheAlkoi, puheLoppui, nollaaPuhujat } = await import('../js/ambience-stream.js');
  nollaaPuhujat();
  // Päällekkäiset luennat: ensimmäisen loppuminen ei saa palauttaa taustaa.
  assert.doesNotThrow(() => { puheAlkoi(); puheAlkoi(); puheLoppui(); puheLoppui(); });
  // Ylimääräinen vapautus ei saa viedä laskuria pakkaselle.
  assert.doesNotThrow(() => { puheLoppui(); puheAlkoi(); puheLoppui(); });
});

test('jokainen luennan lopetus vapauttaa myös puhujan', () => {
  /*
   * v342: tausta katosi kehittäjätilassa, kun kartalla hyppi (omistajan
   * havainto). Syy oli haivytaLuenta: se häivytti luennan, pysäytti sen
   * ja poisti luennat-joukosta — mutta ei vapauttanut puhujan roolista.
   *
   * Pysäytetty äänielementti ei laukaise enää 'ended'- eikä
   * 'error'-tapahtumaa, ja juuri niiden varassa merkitsePuhujan oma
   * vapautus on. Niinpä puhujalaskuri jäi plussalle, tausta jäi
   * pysyvästi puheen alle (0,25) eikä palannut enää istunnon aikana —
   * ei edes stopDiaryVoicella, koska laskuri oli jo vuotanut.
   *
   * Vanha testi vaati vain, että vapautaPuhuja esiintyy jossain
   * ui.js:ssä. Se ehto täyttyi koko vian ajan. Siksi tämä testi kysyy
   * jokaiselta luennan pudottavalta kohdalta erikseen: jos pudotat
   * luennan, vapauta se.
   */
  const ui = readFileSync(new URL('../js/ui.js', import.meta.url), 'utf8');

  /** Metodin runko nimellä: seuraavaan sarakkeeseen 2 asti. */
  const runko = (nimi) => {
    const alku = ui.indexOf(`\n  ${nimi}(`);
    assert.ok(alku > 0, `${nimi}: metodia ei löydy ui.js:stä`);
    return ui.slice(alku, ui.indexOf('\n  }\n', alku));
  };

  /*
   * v513: stopIntroVoice ei pysäytä ääntä itse vaan delegoi
   * siivoavalle häivytykselle (pehmeä ulosfeidaus, omistajan toive).
   * Vapautus saa siis tulla myös välillisesti — mutta silloin
   * välikäden on itse vapautettava, ja se tarkistetaan tässä samalla.
   *
   * v530: välikäden nimi on haivytaJaSiivoa. Se oli aiemmin
   * haivytaAani, mutta luokassa oli TOINEN saman niminen metodi
   * (luentojen pause-häivytys ilman siivousta), ja myöhempi
   * ylikirjoitti siivousversion äänettömästi — tämä testi katsoi
   * ensimmäistä määrittelyä ja meni läpi, vaikka ajossa oli toinen.
   * Siksi tässä vaaditaan myös, ettei haivytaAani-nimeä ole
   * määritelty kahdesti.
   */
  assert.equal(
    [...ui.matchAll(/\n {2}haivyta\w*\(/g)].map((m) => m[0].trim()).filter((n, i, l) => l.indexOf(n) !== i).length,
    0,
    'kaksi saman nimistä häivytysmetodia — myöhempi ylikirjoittaa aiemman äänettömästi',
  );
  const vapauttaa = (teksti) => /vapautaPuhuja\(/.test(teksti)
    || (/haivytaJaSiivoa\(/.test(teksti) && /vapautaPuhuja\(/.test(runko('haivytaJaSiivoa')));
  for (const nimi of ['stopIntroVoice', 'stopDiaryVoice', 'haivytaLuenta']) {
    assert.ok(
      vapauttaa(runko(nimi)),
      `${nimi}: luenta pysäytetään vapauttamatta puhujaa — tausta jää pysyvästi väistöön`,
    );
  }

  /*
   * Sama sääntö koneellisesti: jokainen kohta, joka poistaa luennan
   * luennat-joukosta, on lopetuskohta ja sen on vapautettava puhuja.
   * Näin uusi lopetusreitti ei pääse syntymään ilman vapautusta.
   */
  const metodit = [...ui.matchAll(/\n {2}([a-zA-ZäöåÄÖÅ][\w]*)\(/g)].map((m) => m[1]);
  for (const nimi of new Set(metodit)) {
    const teksti = runko(nimi);
    if (!/luennat\?\.(delete|clear)\(/.test(teksti)) continue;
    assert.match(
      teksti,
      /vapautaPuhuja\(/,
      `${nimi}: pudottaa luennan joukosta mutta ei vapauta puhujaa`,
    );
  }
});

test('kuollut soitin purkaa Web Audio -solmunsa', () => {
  /*
   * v344: jokainen ambienssisoitin reititetään Web Audion läpi
   * (createMediaElementSource -> kompressori -> vahvistin ->
   * destination). Pysäytetty ja src:tön elementti NÄYTTÄÄ siivotulta,
   * mutta reititys on pysyvä: ilman purkua ketju jää kiinni
   * destinationiin eikä elementti voi vapautua muistista, koska
   * lähdesolmu viittaa siihen.
   *
   * Mitattuna (40 kaupunkia kartalla hyppien): ennen 40 lähdesolmua
   * ja 0 purettua, jälkeen 38 purettua ja 2 jäljellä — tasan ne kaksi,
   * jotka olivat yhä soimassa.
   *
   * Testi lukee lähdetekstin, koska Web Audiota ei ole Nodessa.
   */
  const virta = readFileSync(new URL('../js/ambience-stream.js', import.meta.url), 'utf8');

  // Solmut on otettava talteen, muuten niihin ei pääse enää käsiksi.
  // Mittari (hiljaisuusvahdin AnalyserNode) kuuluu samaan ketjuun ja
  // samaan purkuun: se on läpimenevä solmu, ei sivuhaara.
  assert.match(virta, /audio\.aaniSolmut = \[lahde, komp, vahvistin, mittari\]/,
    'liitaKompressori ei tallenna solmuja purkua varten');
  assert.match(virta, /function vapautaSoitin\(audio\)/, 'vapautaSoitin puuttuu');
  assert.match(virta, /solmu\.disconnect\(\)/, 'vapautaSoitin ei pura solmuja');

  /*
   * Vapautus vain yhtä reittiä. Aiemmin sama kaksirivinen kuvio
   * (pause + removeAttribute) oli kopioitu viiteen paikkaan, ja juuri
   * siksi purku unohtui niistä kaikista. Jos kuvio ilmestyy uudestaan
   * vapautaSoitimen ulkopuolelle, se on uusi vuoto.
   */
  const runko = virta.slice(virta.indexOf('function vapautaSoitin'));
  const omaLoppu = runko.indexOf('\n}\n');
  const muuKoodi = virta.replace(runko.slice(0, omaLoppu), '');
  assert.doesNotMatch(muuKoodi, /removeAttribute\('src'\)/,
    'soitin vapautetaan vapautaSoitimen ohi — solmut jäisivät roikkumaan');
});

test('kompressointi on ennen voimakkuussäätöä ja varareitti on olemassa', () => {
  const virta = readFileSync(new URL('../js/ambience-stream.js', import.meta.url), 'utf8');
  // Kompressori ennen vahvistinta: kertoimet vaihtelevat 32 dB, joten
  // säädön jälkeen kiinteä kynnys osuisi eri kohtaan joka äänitteellä.
  assert.match(virta, /lahde\.connect\(komp\)\.connect\(vahvistin\)/,
    'ketjun järjestys väärin — kompressorin pitää olla ennen vahvistinta');
  // Reititys vain käynnissä olevaan kontekstiin: pysähtyneessä
  // elementti ei enää soi suoraan eikä konteksti soita mitään.
  assert.match(virta, /ctx\.state !== 'running'/,
    'reititys ilman tilatarkistusta veisi äänen iOS:llä kokonaan');
  // CORS-lupa pyydetään, jotta puuttuva lupa näkyy latausvirheenä eikä
  // hiljaisuutena.
  assert.match(virta, /audio\.crossOrigin = 'anonymous'/);
  // Varareitti ilman kompressoria.
  assert.match(virta, /ilmanKompressoria = true/,
    'ilman varareittiä CORS-ongelma veisi taustan kokonaan');
});

test('luentaVastaaTekstia: äänite soi vain kun teksti täsmää (15.8.2026)', async () => {
  const { luentaVastaaTekstia } = await import('../js/aani-ehdokkaat.js');
  // Tunnetagit, taukotagit, taukopisteet, lainausmerkit ja
  // kirjainkoko eivät kuulu puheessa — ne eivät erota.
  assert.ok(luentaVastaaTekstia({
    luenta: '[curious] Sähke odotti: "PALATKAA HETI." … Jatkoin matkaa. <break time="1.0s" />',
    kuvaus: 'Sähke odotti: „Palatkaa heti.” Jatkoin matkaa.',
  }));
  // Nosto lasketaan mukaan, kun luenta kattaa sen.
  assert.ok(luentaVastaaTekstia({
    luenta: 'Ensimmäinen virke. Toinen virke.',
    kuvaus: 'Ensimmäinen virke.',
    nosto: 'Toinen virke.',
  }));
  // Sanamuutos pudottaa äänitteen pois — juuri tätä varten vertailu on.
  assert.ok(!luentaVastaaTekstia({
    luenta: 'Kirjoitin merkinnän satamassa.',
    kuvaus: 'Kirjoitin merkinnän rautatieasemalla.',
  }));
  // Ilman luentaa tai kuvausta ei ole mitään verrattavaa.
  assert.ok(!luentaVastaaTekstia({ kuvaus: 'Teksti.' }));
  assert.ok(!luentaVastaaTekstia(null));
});

test('saapumisäänitteiden enemmistö on ajan tasalla (kanarialintu)', async () => {
  /*
   * Linjauksen hetkellä 39/42 äänitteellisestä merkinnästä täsmäsi.
   * Jos tämä luku romahtaa, joku on muuttanut tekstejä kirjaamatta —
   * se ei ole virhe sinänsä (muutokset striimataan), mutta iso
   * pudotus ansaitsee katseen. Raja on väljä tahallaan.
   */
  const { luentaVastaaTekstia } = await import('../js/aani-ehdokkaat.js');
  const { EUROPE_SAAPUMISET } = await import('../js/packs/europe-saapumiset.js');
  const { AFRICA_SAAPUMISET } = await import('../js/packs/africa-saapumiset.js');
  let luennallisia = 0;
  let tasalla = 0;
  for (const pakka of [EUROPE_SAAPUMISET, AFRICA_SAAPUMISET]) {
    for (const m of Object.values(pakka)) {
      if (!m.luenta) continue;
      luennallisia += 1;
      if (luentaVastaaTekstia(m)) tasalla += 1;
    }
  }
  assert.ok(luennallisia >= 40, `luennallisia merkintöjä vain ${luennallisia}`);
  assert.ok(tasalla / luennallisia > 0.5,
    `vain ${tasalla}/${luennallisia} äänitettä ajan tasalla — tekstejä muutettu laajasti?`);
});
