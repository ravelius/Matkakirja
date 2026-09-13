import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { Game } from '../js/game.js';
import { packById } from '../js/pack.js';
import { puraFokusvirtaKortti, puraFokusvirtaPaikanvaihdossa } from '../js/fokusvirta.js';

const UI = readFileSync(new URL('../js/ui.js', import.meta.url), 'utf8');

test('jumissa ja uusi linssi kantavat vakaata emit-metadataa', () => {
  const jumissa = new Game({ players: [{ name: 'Fogg', color: '#123', start: 'marseille' }], pack: packById('maailmankartta'), seed: 1 });
  jumissa.phase = 'roll';
  jumissa.travelMode = 'sea';
  jumissa.rollDie = () => 1;
  const heitto = jumissa.actionRoll();
  assert.equal(heitto.moved, false);
  assert.deepEqual(jumissa.takeEvents().filter(({ kind }) => kind === 'stuck')
    .map(({ kind, tilanne }) => ({ kind, tilanne })),
  [{ kind: 'stuck', tilanne: 'matka.jumissa' }]);

  const linssi = new Game({ players: [{ name: 'Fogg', color: '#123', start: 'lontoo' }], pack: packById('maailmankartta'), seed: 1 });
  linssi.player.xp = 399;
  linssi.awardXp(linssi.player, 1);
  const tapahtuma = linssi.takeEvents().find(({ tilanne }) => tilanne === 'peli.linssi.avautui');
  assert.equal(tapahtuma?.kind, 'aid');
  assert.equal(typeof tapahtuma?.linssi, 'string');
});

test('UI reagoi vain vakaaseen jumissa-, linssi- ja pankkiapumetadataan', () => {
  const playEvents = UI.slice(UI.indexOf('async playEvents()'), UI.indexOf('async naytaTietajaNousut()'));
  for (const tunnus of ['peli.vararikko.pankkiapu', 'matka.jumissa', 'peli.linssi.avautui']) {
    assert.ok(playEvents.includes(`event.tilanne === '${tunnus}'`));
  }
  assert.doesNotMatch(playEvents, /event\.kind === 'aid'/);
});

test('maitse ja meritse reagoivat kerran vain kaupungista lähdettäessä', () => {
  const doMove = UI.slice(UI.indexOf('doMove(key)'), UI.indexOf('\n  doFly(destination)'));
  assert.match(doMove, /after: \(result\) => \{[\s\S]*?result\?\.ok && from\.type === 'city'/);
  assert.match(doMove, /matka\.kavely\.lahto/);
  assert.match(doMove, /matka\.laiva\.lahto/);
  assert.equal((doMove.match(/ilmoitaLivianTunne\(/g) ?? []).length, 1);
});

test('kelvollinen lento reagoi ennen flight-active-kalvoa', () => {
  const doFly = UI.slice(UI.indexOf('doFly(destination)'), UI.indexOf('\n  async animateFlight'));
  assert.match(doFly, /kelvollinenLento = !this\.busy && !this\.dead && game\.phase === 'action'[\s\S]*?game\.airportDestinations\(\)\.includes\(destination\)/);
  assert.match(doFly, /if \(kelvollinenLento\) \{[\s\S]*?matka\.lento\.lahto/);
  const tunne = doFly.indexOf("tunnus: 'matka.lento.lahto'");
  const kalvo = doFly.indexOf("classList.add('flight-active')");
  assert.ok(tunne > 0 && kalvo > tunne);
  assert.equal((doFly.match(/matka\.lento\.lahto/g) ?? []).length, 1);
});

test('onnistunut kaupunkilähtö purkaa vanhan fokuskuplan ja kuuntelijat', t => {
  const irrotukset = [];
  const vanhaIrrota = globalThis.removeEventListener;
  globalThis.removeEventListener = (...args) => irrotukset.push(args);
  t.after(() => {
    if (vanhaIrrota) globalThis.removeEventListener = vanhaIrrota;
    else delete globalThis.removeEventListener;
  });
  let poistot = 0;
  const asemoi = () => {};
  const ui = { fokusvirtaKortti: { remove: () => { poistot += 1; } }, fokusvirtaAsemointi: asemoi };
  puraFokusvirtaKortti(ui);
  assert.equal(poistot, 1);
  assert.equal(ui.fokusvirtaKortti, null);
  assert.equal(ui.fokusvirtaAsemointi, null);
  assert.deepEqual(irrotukset.map(([laji]) => laji), ['resize', 'orientationchange']);
  puraFokusvirtaKortti(ui);
  assert.equal(poistot, 1, 'purku ei ole idempotentti');

  const doMove = UI.slice(UI.indexOf('doMove(key)'), UI.indexOf('\n  doFly(destination)'));
  assert.match(doMove, /if \(result\?\.ok && from\.type === 'city'\) \{\s*puraFokusvirtaPaikanvaihdossa\(this\);/,
    'maa- tai merimatka ei pura lähtökaupungin kuplaa onnistumisen jälkeen');
  const doFly = UI.slice(UI.indexOf('doFly(destination)'), UI.indexOf('\n  async animateFlight'));
  assert.match(doFly, /after: async \(result\) => \{\s*if \(result\?\.ok && from\.type === 'city'\) puraFokusvirtaPaikanvaihdossa\(this\);/,
    'lento ei pura lähtökaupungin kuplaa onnistumisen jälkeen');
  // Pääte: doWalkin ohjekommentti (entinen "Jalan", karttauudistuksen
  // erässä 8 "Liftaus" — omistajan uusi nimi samalle teolle).
  const vaienna = UI.slice(UI.indexOf('\n  vaiennaPaikanPuhe() {'), UI.indexOf('\n  /** Liftaus'));
  assert.doesNotMatch(vaienna, /puraFokusvirta(?:Kortti|Paikanvaihdossa)/,
    'pelkkä nopanheitto tai hylätty lähtö ei saa sulkea fokuskuplaa');

  const fokusvirta = readFileSync(new URL('../js/fokusvirta.js', import.meta.url), 'utf8');
  const pura = fokusvirta.slice(fokusvirta.indexOf('export function puraFokusvirtaKortti'),
    fokusvirta.indexOf('export function suljeFokusvirta'));
  assert.doesNotMatch(pura, /piilotaSaapumistraileri/,
    'paikanvaihdon kuplapurku ei saa kajota saapumistraileriin');
  const sulje = fokusvirta.slice(fokusvirta.indexOf('export function suljeFokusvirta'),
    fokusvirta.indexOf('function suljeKasin'));
  assert.match(sulje, /piilotaSaapumistraileri\(ui, \{ peru: true \}\);\s*puraFokusvirtaKortti\(ui\);/,
    'varsinainen fokusvirran sulku menetti traileripurkunsa');
});

test('paikanvaihto peruu molemmat vanhan kaupungin viivekuplat vasta onnistuttuaan', t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });

  let onnistuneenVanhatKuplat = 0;
  const onnistunut = {
    fokusvirtaKortti: { remove() {} },
    fokusKuittausAjastin: setTimeout(() => { onnistuneenVanhatKuplat += 1; }, 2500),
    fokusaarreAjastin: setTimeout(() => { onnistuneenVanhatKuplat += 1; }, 700),
  };
  puraFokusvirtaPaikanvaihdossa(onnistunut);
  t.mock.timers.tick(3000);
  assert.equal(onnistuneenVanhatKuplat, 0);
  assert.equal(onnistunut.fokusvirtaKortti, null);
  assert.equal(onnistunut.fokusKuittausAjastin, null);
  assert.equal(onnistunut.fokusaarreAjastin, null);

  let hylatynVanhatKuplat = 0;
  const nykyinenKortti = { remove() {} };
  const hylatty = {
    fokusvirtaKortti: nykyinenKortti,
    fokusKuittausAjastin: setTimeout(() => { hylatynVanhatKuplat += 1; }, 2500),
    fokusaarreAjastin: setTimeout(() => { hylatynVanhatKuplat += 1; }, 700),
  };
  const kuittaus = hylatty.fokusKuittausAjastin;
  const aarre = hylatty.fokusaarreAjastin;
  assert.equal(hylatty.fokusvirtaKortti, nykyinenKortti);
  assert.equal(hylatty.fokusKuittausAjastin, kuittaus);
  assert.equal(hylatty.fokusaarreAjastin, aarre);
  t.mock.timers.tick(3000);
  assert.equal(hylatynVanhatKuplat, 2);

  const fokusvirta = readFileSync(new URL('../js/fokusvirta.js', import.meta.url), 'utf8');
  const paikanvaihto = fokusvirta.slice(fokusvirta.indexOf('export function puraFokusvirtaPaikanvaihdossa'),
    fokusvirta.indexOf('export function suljeFokusvirta'));
  for (const avain of ['fokusKuittausAjastin', 'fokusaarreAjastin']) {
    assert.match(paikanvaihto, new RegExp(`clearTimeout\\(ui\\[avain\\]\\)[\\s\\S]*?ui\\[avain\\] = null`));
    assert.match(fokusvirta, new RegExp(`ui\\.${avain} = setTimeout`), `${avain} ei enää kytkeydy tuottajaansa`);
  }
  assert.match(paikanvaihto, /puraFokusvirtaKortti\(ui\);/);
  const yleinenPurku = fokusvirta.slice(fokusvirta.indexOf('export function puraFokusvirtaKortti'),
    fokusvirta.indexOf('export function puraFokusvirtaPaikanvaihdossa'));
  assert.doesNotMatch(yleinenPurku, /fokus(?:Kuittaus|aarre)Ajastin/);
  const sulje = fokusvirta.slice(fokusvirta.indexOf('export function suljeFokusvirta'),
    fokusvirta.indexOf('function suljeKasin'));
  assert.doesNotMatch(sulje, /puraFokusvirtaPaikanvaihdossa/);
});

test('aikataulu-, päivä- ja rahapalkkioreaktioita ei lisätty', () => {
  for (const tunnus of ['peli.aikataulu.merkinta', 'peli.ennatys.ohi', 'eteneminen.raha.nousi']) {
    assert.equal(UI.includes(`tunnus: '${tunnus}'`), false);
  }
});
