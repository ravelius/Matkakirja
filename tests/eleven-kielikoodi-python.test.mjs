// SUOMI AINA PAKOTETTUNA myös Python-generointiskripteissä (omistaja 18.10.2026 klo 17.55: "pidä huoli että jatkossa kaikki ovat pakotettuja").
// tools/elevenlabs_kieli.py = Python-vastine tools/elevenlabs-kieli.mjs:lle; tools/tarkista-puhekutsut.sh vartioi repon ulkopuolisia
// proto-3d-skriptejä (_tyo, tyokalut), joihin tämä testi ei yllä. Tämä testi: apurin käytös, repon .py-skannaus ja vartijan toiminta.
import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync, readdirSync, statSync, mkdtempSync, mkdirSync, writeFileSync, copyFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const TOOLS = new URL('../tools', import.meta.url).pathname;
const py = spawnSync('python3', ['-I', '-c', 'print(1)']);
const PY = py.status === 0;

function pyAjo(koodi) {
  const r = spawnSync('python3', ['-I', '-c', `import sys; sys.path.insert(0, ${JSON.stringify(TOOLS)})\n${koodi}`]);
  return { ulos: String(r.stdout).trim(), virhe: String(r.stderr), status: r.status };
}

test('elevenlabs_kieli.py: pakota lisää fi:n, hylkää multilingualin ja vieraan kielikoodin', { skip: !PY }, () => {
  const r = pyAjo(`
import json, elevenlabs_kieli as e
print(json.dumps(e.pakota({'text': 'x', 'model_id': 'eleven_v4_turbo'})))
for runko in ({'model_id': 'eleven_multilingual_v2'}, {'model_id': 'eleven_v3', 'language_code': 'en'}):
    try: e.pakota(runko); print('EI HEITTÄNYT')
    except ValueError: print('virhe')
`);
  const rivit = r.ulos.split('\n');
  assert.deepEqual(JSON.parse(rivit[0]), { text: 'x', model_id: 'eleven_v4_turbo', language_code: 'fi' });
  assert.deepEqual(rivit.slice(1), ['virhe', 'virhe'], r.virhe);
});

test('elevenlabs_kieli.pyynto: puhepäätteen runko lähtee verkkoon suomi pakotettuna; multilingual ei lähde lainkaan', { skip: !PY }, () => {
  const r = pyAjo(`
import json, urllib.request, elevenlabs_kieli as e
lahetetyt = []
class V:
    def __enter__(s): return s
    def __exit__(s, *a): return False
    def read(s): return b'{}'
urllib.request.urlopen = lambda req, timeout=0: (lahetetyt.append(json.loads(req.data)), V())[1]
e.pyynto('/v1/text-to-speech/abc/with-timestamps', {'text': 'x', 'model_id': 'eleven_v4'}, avain='k')
e.pyynto('/v1/text-to-dialogue', {'inputs': [], 'model_id': 'eleven_v3'}, avain='k')
try: e.pyynto('/v1/text-to-speech/abc', {'text': 'x', 'model_id': 'eleven_multilingual_v2'}, avain='k'); print('EI HEITTÄNYT')
except ValueError: pass
print(json.dumps([x['language_code'] for x in lahetetyt]), len(lahetetyt))
`);
  assert.equal(r.ulos, '["fi", "fi"] 2', r.virhe);
});

function pyTiedostot(hakemisto) {
  const ulos = [];
  for (const n of readdirSync(hakemisto)) {
    const p = join(hakemisto, n);
    if (statSync(p).isDirectory()) { if (n !== 'node_modules') ulos.push(...pyTiedostot(p)); } else if (n.endsWith('.py')) ulos.push(p);
  }
  return ulos;
}

test('jokainen repon .py-tiedosto, joka kutsuu ElevenLabsin puhepäätettä, pakottaa suomen', () => {
  for (const p of pyTiedostot(TOOLS)) {
    if (p.endsWith('elevenlabs_kieli.py')) continue;
    const s = readFileSync(p, 'utf8');
    if (!/\/v1\/text-to-(?:speech|dialogue)/.test(s)) continue;
    assert.match(s, /elevenlabs_kieli|kieli_fi|language_code/, `${p}: puhekutsusta puuttuu suomen pakotus (from elevenlabs_kieli import pyynto)`);
  }
});

test('tarkista-puhekutsut.sh: ilman language_code oleva puhekutsuskripti on poikkeama, apurin kautta kulkeva ei', () => {
  const juuri = mkdtempSync(join(tmpdir(), 'p3d-'));
  mkdirSync(join(juuri, 'tyokalut'), { recursive: true });
  mkdirSync(join(juuri, '_tyo', 'huono'), { recursive: true });
  mkdirSync(join(juuri, '_tyo', 'hyva'), { recursive: true });
  copyFileSync(join(TOOLS, 'elevenlabs_kieli.py'), join(juuri, 'tyokalut', 'elevenlabs_kieli.py'));
  writeFileSync(join(juuri, '_tyo', 'hyva', 'tee.py'), "from elevenlabs_kieli import pyynto\npyynto('/v1/text-to-speech/x', {})\n");
  const aja = () => spawnSync('sh', [join(TOOLS, 'tarkista-puhekutsut.sh'), juuri], { encoding: 'utf8' });
  assert.equal(aja().status, 0, aja().stdout);
  writeFileSync(join(juuri, '_tyo', 'huono', 'tee.py'), "urlopen('https://api.elevenlabs.io/v1/text-to-speech/x', body)\n");
  const r = aja();
  assert.equal(r.status, 1, r.stdout);
  assert.match(r.stdout, /PUUTTUU language_code: .*huono\/tee\.py/);
  writeFileSync(join(juuri, 'tyokalut', 'elevenlabs_kieli.py'), '# eri\n');
  writeFileSync(join(juuri, '_tyo', 'huono', 'tee.py'), "x = {'language_code': 'fi'}  # /v1/text-to-speech/x\n");
  const e = aja();
  assert.equal(e.status, 1, e.stdout);
  assert.match(e.stdout, /EROAA/);
});
