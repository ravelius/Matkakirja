import test from 'node:test';
import assert from 'node:assert/strict';

class Elementti {
  constructor(tag) {
    this.tagName = String(tag).toUpperCase();
    this.childNodes = [];
    this.listeners = new Map();
    this.luokat = [];
    this.disabled = false;
  }
  set className(value) { this.luokat = String(value).split(/\s+/).filter(Boolean); }
  get className() { return this.luokat.join(' '); }
  get classList() {
    return {
      remove: (...names) => { this.luokat = this.luokat.filter((n) => !names.includes(n)); },
      toggle: (name, on) => on
        ? (!this.luokat.includes(name) && this.luokat.push(name))
        : (this.luokat = this.luokat.filter((n) => n !== name)),
    };
  }
  set textContent(value) { this.childNodes = []; this.teksti = String(value ?? ''); }
  get textContent() { return this.teksti ?? this.childNodes.map((n) => n.textContent).join(''); }
  appendChild(node) { this.childNodes.push(node); return node; }
  append(...nodes) { nodes.forEach((node) => this.appendChild(node)); }
  replaceChildren(...nodes) { this.childNodes = []; this.append(...nodes); }
  addEventListener(type, fn) { this.listeners.set(type, fn); }
  click() { this.listeners.get('click')?.({ target: this }); }
}

globalThis.document = { createElement: (tag) => new Elementti(tag) };

const [{ pullaOstosnappi }, { kuunteleLivianTilanteita }, { sfx }] = await Promise.all([
  import('../js/fokustehtavat.js'),
  import('../js/livia-tilanteet.js'),
  import('../js/sound.js'),
]);
sfx.enabled = false;

function rakenna({ money = 100, ostettu = false, osta = () => ({ ok: true }), nimi = 'korvapuusti', jalkeen } = {}) {
  const kotelo = new Elementti('div');
  const ui = {
    game: { player: { money } },
    onChange() {},
    renderTurnPill() {},
  };
  const rivi = pullaOstosnappi(ui, kotelo, {
    hinta: 20,
    teksti: `Osta ${nimi}`,
    varmistus: `Varmista ${nimi}`,
    koyha: `Ei varaa: ${nimi}`,
    kelluke: `${nimi} Livialle`,
    tehty: `${nimi} annettu`,
    ostettu,
    osta,
    jalkeen,
  });
  return { rivi, nappi: rivi.childNodes.find((n) => n.tagName === 'BUTTON') };
}

test('ensimmäinen napautus ei anna pullaelettä, eikä epäonnistunut toinenkaan', () => {
  const tapahtumat = [];
  const lopeta = kuunteleLivianTilanteita((laji) => tapahtumat.push(laji));
  const { nappi } = rakenna({ osta: () => ({ ok: false }) });
  nappi.click();
  assert.deepEqual(tapahtumat, []);
  nappi.click();
  assert.deepEqual(tapahtumat, []);
  lopeta();
});

test('onnistunut toinen napautus antaa yhden bunGranted-tapahtuman vasta jalkeen-kutsun jälkeen', () => {
  const jarjestys = [];
  const lopeta = kuunteleLivianTilanteita((laji, tiedot) => {
    if (laji === 'bunGranted') jarjestys.push(['ele', tiedot]);
  });
  const { nappi } = rakenna({ jalkeen: () => jarjestys.push(['jalkeen']) });
  nappi.click();
  assert.deepEqual(jarjestys, []);
  nappi.click();
  assert.equal(jarjestys.length, 2);
  assert.deepEqual(jarjestys[0], ['jalkeen']);
  assert.equal(jarjestys[1][0], 'ele');
  assert.equal(typeof jarjestys[1][1].tunnus, 'object');
  lopeta();
});

test('jo ostettu ja riittämätön raha eivät anna pullaelettä', () => {
  const tapahtumat = [];
  const lopeta = kuunteleLivianTilanteita((laji) => tapahtumat.push(laji));
  assert.equal(rakenna({ ostettu: true }).nappi, undefined);
  const koyha = rakenna({ money: 0 });
  assert.equal(koyha.nappi.disabled, true);
  assert.deepEqual(tapahtumat, []);
  lopeta();
});

test('kaupungin pullan nimi ei muuta yhteistä onnistumistapahtumaa', () => {
  const saadut = [];
  const lopeta = kuunteleLivianTilanteita((laji) => { if (laji === 'bunGranted') saadut.push(laji); });
  for (const nimi of ['wieniläinen apfelstrudel', 'istanbulilainen simit']) {
    const { nappi } = rakenna({ nimi });
    nappi.click();
    nappi.click();
  }
  assert.deepEqual(saadut, ['bunGranted', 'bunGranted']);
  lopeta();
});
