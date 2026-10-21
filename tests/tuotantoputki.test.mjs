// Tuotantoputken tarkistus (omistaja 20.10.2026 19.12, tools/tuotantoputki.mjs): puhtaat osat. Ensimmäinen tapaus: Louvren mies ja
// vartija hyväksytty 18.10., ämpärissä ja koodissa, mutta MuseoHenkilot.Paalla = false → hälytys "kehityslippu pois".
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { aihe, avoimetTilaukset, glbPolut, onMallitilaus, onTripoMalli, perhe, samaAihe, uusimmat, viitteet } from '../tools/tuotantoputki.mjs';

test('Tripo-vientipaketti tunnistetaan LAHTEET.md:stä, pelkkä maininta ei riitä', () => {
  assert.ok(onTripoMalli('Tekijä: Linssiseppä, generoitu omistajan Tripo-tilillä (studio.tripo3d.ai)'));
  assert.ok(!onTripoMalli('Lisenssi: kuten v1; uusia Tripo-jobeja tai kuvagenerointeja 0'));
  assert.deepEqual(glbPolut('abc  taidemuseo/louvre-ihmiset-v1/k1.glb\ndef  a/b.json\n'), ['taidemuseo/louvre-ihmiset-v1/k1.glb']);
});

test('perheestä vain uusin versio (v8f > v8 > v3)', () => {
  assert.deepEqual(perhe('juoksupeli/hahmot-v3/puyi.glb'), { perhe: 'juoksupeli/hahmot/puyi.glb', versio: [3, ''], kansio: 'hahmot-v3/' });
  const u = uusimmat(['j/rengas-v8/a.glb', 'j/rengas-v8f/a.glb', 'j/rengas-v3/a.glb', 'j/hahmot-v1/p.glb', 'j/hahmot-v2/p.glb']);
  assert.deepEqual(u.map(x => x.polku).sort(), ['j/hahmot-v2/p.glb', 'j/rengas-v8f/a.glb']);
});

test('koodiviite ja pois oleva kehityslippu (Louvren tapaus)', () => {
  const koodi = new Map([
    ['Museo/MuseoHenkilot.cs', 'public static bool Paalla = false;\nconst string J = "https://media.matkakirja.app/taidemuseo/louvre-ihmiset-v1/";\n("k2", "gg")'],
    ['Juoksu/JuoksuHahmot.cs', 'public static bool Paalla = true; "juoksupeli/hahmot-v3/" + "puyi.glb"'],
  ]);
  assert.deepEqual(viitteet(koodi, 'taidemuseo/louvre-ihmiset-v1/k2.glb'), { tiedostot: ['Museo/MuseoHenkilot.cs'], kytkinPois: ['Museo/MuseoHenkilot.cs'] });
  assert.deepEqual(viitteet(koodi, 'juoksupeli/hahmot-v3/puyi.glb'), { tiedostot: ['Juoksu/JuoksuHahmot.cs'], kytkinPois: [] });
  assert.deepEqual(viitteet(koodi, 'taidemuseo/louvre-ihmiset-v1/k3.glb').tiedostot, [], 'tiedoston nimi ei esiinny');
  // Koottu nimi (juoksupelin aarteet): kansio + pääte tiedostossa, id muualla koodissa.
  const aarteet = new Map([['Juoksu/JuoksuV4Maailma.cs', 'const string Kansio = "aarteet799-v2/"; Hae(Polku + Kansio + id + "-ehja.glb"); Hae(Polku + Kansio + id + "-rikki.glb");']]);
  assert.deepEqual(viitteet(aarteet, 'juoksupeli/maailma-v4/aarteet799-v2/teeastiat-ehja.glb', true).tiedostot, ['Juoksu/JuoksuV4Maailma.cs']);
  assert.deepEqual(viitteet(aarteet, 'juoksupeli/maailma-v4/aarteet799-v2/teeastiat-rikki.glb', false).tiedostot, [], 'id ei koodissa → ei viitettä');
});

test('3D-tilaus: Tripo tai GLB, ei Tripoli, ei kuittausta eikä Codexin omaa viestiä', () => {
  assert.ok(onMallitilaus('paatoimittaja-codex-louvre-kavijat-20261020.md', 'tilatut Tripo-mallit peliin'));
  assert.ok(!onMallitilaus('sisaltokirjuri-codex-tripoli-20261010.md', 'Tripolin vanha kaupunki'));
  assert.ok(!onMallitilaus('paatoimittaja-codex-tripo-hahmot-kuittaus-20261019.md', 'Tripo'));
  assert.ok(!onMallitilaus('codex-paatoimittaja-tripo-hahmot-20261019.md', 'Tripo'));
  assert.ok(!onMallitilaus('fable-codex-kuvat-20261010.md', 'havainnekuva, 3D-mallin näköinen'));
});

test('aihe ja sama aihe (Codex ei aina viittaa tilaukseen)', () => {
  assert.deepEqual([...aihe('paatoimittaja-codex-juoksupeli-hahmot-tripo-20261018.md')], ['juoksupeli', 'hahmot', 'tripo']);
  assert.ok(samaAihe('paatoimittaja-codex-juoksupeli-hahmot-tripo-20261018.md', 'codex-paatoimittaja-tripo-hahmot-20261019.md'));
  assert.ok(!samaAihe('valoseppa-codex-peking46-vesi-20261015.md', 'codex-fable-peking-native46-palaute-20261015.md'));
});

test('tilaus ilman toimitusta yli 48 h hälyttää; toimitus nimellä, commitilla, aiheella tai peruminen sulkee', () => {
  const h = 3600e3, nyt = 1000 * h;
  const tilaukset = [
    { nimi: 'pt-codex-a-mallit-20261010.md', sha: '111111111aa', aika: nyt - 100 * h },
    { nimi: 'pt-codex-b-veistos-20261010.md', sha: '222222222bb', aika: nyt - 100 * h },
    { nimi: 'pt-codex-c-hahmot-tripo-20261010.md', sha: '333333333cc', aika: nyt - 100 * h },
    { nimi: 'pt-codex-d-pyora-20261010.md', sha: '444444444dd', aika: nyt - 100 * h },
    { nimi: 'pt-codex-e-tuoli-20261020.md', sha: '555555555ee', aika: nyt - 10 * h },
    { nimi: 'pt-codex-f-lamppu-20261010.md', sha: '666666666ff', aika: nyt - 100 * h },
  ];
  const postit = [
    { nimi: 'codex-pt-x-20261011.md', aika: nyt - 90 * h, teksti: 'Tilaus pt-codex-a-mallit-20261010 toimitettu' },
    { nimi: 'codex-pt-y-20261011.md', aika: nyt - 90 * h, teksti: 'tilaus 222222222 käsitelty' },
    { nimi: 'codex-pt-tripo-hahmot-20261011.md', aika: nyt - 90 * h, teksti: 'paketti' },
    { nimi: 'pt-codex-peruttu-20261011.md', aika: nyt - 90 * h, teksti: 'pt-codex-d-pyora-20261010 peruttu' },
    { nimi: 'codex-pt-z-20261001.md', aika: nyt - 300 * h, teksti: 'pt-codex-f-lamppu-20261010 (ennen tilausta, ei kelpaa)' },
  ];
  assert.deepEqual(avoimetTilaukset(tilaukset, postit, nyt).map(t => t.nimi), ['pt-codex-f-lamppu-20261010.md']);
});
