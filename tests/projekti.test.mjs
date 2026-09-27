/*
 * Julkinen projektisivu (projekti.html, omistajan tilaus 27.9.2026).
 *
 * Vahtii kolmea asiaa:
 *   1. Tilanne-välilehden tekstit (projekti-data.js) vastaavat
 *      docs/tilannekatsaus.md:tä, ja luvut ovat järkevissä rajoissa.
 *      Lukujen tarkkaa arvoa ei verrata: ne muuttuvat jokaisen
 *      sisältömuutoksen mukana, ja Pages-julkaisu laskee ne uudelleen.
 *   2. EI SISÄISTÄ TIETOA: sivulla näytettävä data (julkinen.js:n läpi
 *      kulkenut linssi- ja pelidata, kuvatekstit, projekti-data.js) sekä
 *      sivun HTML ja moduulit eivät sisällä yhtään kiellettyä sanaa
 *      (roolien ja mallien nimet, PR-numerot, worker-osoitteet …).
 *   3. Vanhat osoitteet (linssikatalogi.html, pelikatalogi.html) ohjaavat
 *      projektisivulle, kaikki sivut ovat noindex ja Pages julkaisee ne.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import vm from 'node:vm';
import { jasennaTilannekatsaus, MD_POLKU, DATA_POLKU, OSIOT, uusinNatiivi } from '../tools/tee-projekti-data.mjs';
import {
  KIELLETYT, sisainenOsuma, julkisetLinssit, julkisetPelit, julkisetKuvatekstit, puhdista,
} from '../projekti/julkinen.js';
import { KUVATEKSTIT } from '../projekti/linssi-kuvatekstit.js';

const juuri = new URL('../', import.meta.url);
const lue = (polku) => readFileSync(new URL(polku, juuri), 'utf8');

function lataaIkkuna(...tiedostot) {
  const ikkuna = {};
  for (const t of tiedostot) vm.runInNewContext(lue(t), { window: ikkuna });
  // JSON-kierros tuo oliot tähän realmiin (deepEqual vertaa prototyyppejä).
  return JSON.parse(JSON.stringify(ikkuna));
}

test('projekti-data.js: Tilanne-tekstit vastaavat docs/tilannekatsaus.md:tä', () => {
  const md = readFileSync(MD_POLKU, 'utf8');
  const odotettu = jasennaTilannekatsaus(md);
  const { PROJEKTIDATA } = lataaIkkuna('projekti-data.js');
  assert.deepEqual(PROJEKTIDATA.tilanne, odotettu,
    'projekti-data.js on vanhentunut — aja: node tools/tee-projekti-data.mjs');
  assert.deepEqual(odotettu.osiot.map((o) => o.avain), Object.values(OSIOT),
    'osiot: Yleiskuva, Kartta ja maailma, Sisältö ja oppiminen, Linssit, Pelit, Natiivi iOS');
  for (const o of odotettu.osiot) {
    assert.ok(o.tila, `${o.otsikko}: Tila-rivi puuttuu`);
    assert.ok(o.kappaleet.length > 0, `${o.otsikko}: ei tekstiä`);
    assert.ok(o.seuraavaksi.length > 0, `${o.otsikko}: Seuraavaksi-lista puuttuu`);
  }
  assert.match(odotettu.paivitetty, /^\d{4}-\d{2}-\d{2}$/);
});

test('projekti-data.js: luvut ovat järkevissä rajoissa', () => {
  const { luvut } = lataaIkkuna('projekti-data.js').PROJEKTIDATA;
  assert.ok(luvut.kaupunkeja >= 100, `kaupunkeja ${luvut.kaupunkeja}`);
  assert.ok(luvut.kaupunkilehtia > 0 && luvut.kaupunkilehtia <= luvut.kaupunkeja);
  assert.ok(luvut.maita >= 50, `maita ${luvut.maita}`);
  assert.ok(luvut.maalehtia > 0 && luvut.maalehtia <= luvut.maita);
  assert.ok(luvut.juttuja >= 100, `juttuja ${luvut.juttuja}`);
  assert.ok(luvut.kohteita >= 500, `kohteita ${luvut.kohteita}`);
  assert.ok(luvut.kartta.syvinTaso >= 8 && luvut.kartta.tasoja === luvut.kartta.syvinTaso + 1);
  assert.equal(luvut.kartta.z10Yhteensa, luvut.kartta.z10Laatat.reduce((a, b) => a + b, 0));
  assert.match(String(luvut.versiot.web), /^\d{4,}$/);
  assert.match(luvut.versiot.natiivi, /^\d+\.\d+\.\d+$/);
  // Webin versio on päivityslokin kärki (sama luku kuin sw.js:n CACHE-nimen loppu).
  const muutokset = lue('js/muutokset.js').match(/\{ v: (\d+),/);
  assert.ok(muutokset && Number(muutokset[1]) >= luvut.versiot.web);
});

test('iOS-testiversio luetaan natiivin muutoslokin uusimmalta riviltä', () => {
  const loki = JSON.parse(lue('tools/vienti/muutosloki-natiivi.json'));
  const { versio, paiva } = uusinNatiivi(loki);
  assert.match(versio, /^\d+\.\d+\.\d+$/);
  assert.match(paiva, /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(versio, loki.rivit[0].versio.split(' ')[0]);
});

test('sanalista tunnistaa sisäiset sanat eikä kaada julkisia nimiä', () => {
  for (const s of ['Fable 24.9.', 'Pelikoodarin haara', 'Natiiviseppä tarkisti', 'Karttasepän putki',
    'Opus', 'Sonnet', 'Claude', 'ChatGPT', 'Codex', 'x.workers.dev', 'PR #3399', '#3371', 'local_593b89a1',
    'haarassa pelikoodari-kellot', 'Julkaisijan juna']) {
    assert.ok(sisainenOsuma(s), `sanalista ei tunnista: ${s}`);
  }
  for (const s of ['Claude Lorrainin etsaus', 'Codex Mendoza', 'haarapääsky', 'Prosessiotie', 'lopussa 1865', '#1']) {
    assert.equal(sisainenOsuma(s), null, `sanalista kaataa julkisen tekstin: ${s}`);
  }
  assert.equal(puhdista('M1 Kiinan dynastiat (omistajan päätös, ennallaan 24.9.2026)'), 'M1 Kiinan dynastiat');
  assert.equal(puhdista('odottaa, ensi viikko (omistaja 27.9.2026).'), 'odottaa, ensi viikko.');
  assert.ok(KIELLETYT.length >= 20);
});

test('EI SISÄISTÄ TIETOA: sivulla näytettävä data ja sivun lähteet', () => {
  const { LINSSIKATALOGI, PELIKATALOGI } = lataaIkkuna('linssikatalogi-data.js', 'pelikatalogi-data.js');
  const naytettava = {
    'linssidata (julkinen.js)': JSON.stringify(julkisetLinssit(LINSSIKATALOGI)),
    'pelidata (julkinen.js)': JSON.stringify(julkisetPelit(PELIKATALOGI)),
    'linssien kuvatekstit (julkinen.js)': JSON.stringify(julkisetKuvatekstit(KUVATEKSTIT)),
    'projekti-data.js': lue('projekti-data.js'),
    'projekti.html': lue('projekti.html'),
    'linssikatalogi.html': lue('linssikatalogi.html'),
    'pelikatalogi.html': lue('pelikatalogi.html'),
  };
  // Sivun moduulit (julkinen.js itse sisältää sanalistan, joten se jää pois).
  for (const t of readdirSync(new URL('projekti/', juuri))) {
    if (t === 'julkinen.js' || t === 'linssi-kuvatekstit.js') continue; // kuvatekstit tarkistettiin suodatettuina
    naytettava[`projekti/${t}`] = lue(`projekti/${t}`);
  }
  for (const [nimi, teksti] of Object.entries(naytettava)) {
    const osuma = sisainenOsuma(teksti);
    assert.equal(osuma, null, `${nimi}: sisäinen sana "${osuma}" näkyisi julkisella sivulla`);
  }
  // Suodatin ei saa tyhjentää katalogeja: nimet, säännöt ja moottorikuvaukset säilyvät.
  const linssit = julkisetLinssit(LINSSIKATALOGI);
  assert.equal(linssit.linssit.length, LINSSIKATALOGI.linssit.length);
  assert.ok(linssit.linssit.every((l) => l.nimi && l.id));
  assert.ok(linssit.moottorit.every((m) => m.nimi && m.kuvaus));
  assert.ok(linssit.linssit.every((l) => !('huom' in l)), 'linssin huom-kenttä (työmerkinnät) jää pois');
  const pelit = julkisetPelit(PELIKATALOGI);
  assert.equal(pelit.pelit.length, PELIKATALOGI.pelit.length);
  assert.ok(pelit.pelit.every((p) => p.nimi && p.saanto));
  const lento = pelit.kortit.find((k) => k.otsikko.startsWith('Lentopeli'));
  assert.match(lento.kentat.find((x) => x.nimi === 'Tila').teksti, /^odottaa, ensi viikko/);
});

test('projekti.html: noindex, kuusi pääosiota ja data ennen moduulia', () => {
  const sivu = lue('projekti.html');
  assert.match(sivu, /<meta name="robots" content="noindex, nofollow">/);
  for (const osio of ['tilanne', 'linssit', 'pelit', 'kartta', 'sisalto', 'natiivi']) {
    assert.match(sivu, new RegExp(`href="#${osio}" data-paa="${osio}"`), `päävälilehti ${osio}`);
    assert.match(sivu, new RegExp(`id="osio-${osio}"`), `pääosio ${osio}`);
  }
  const jarjestys = ['linssikatalogi-data.js', 'pelikatalogi-data.js', 'projekti-data.js', 'projekti/paa.js']
    .map((t) => sivu.indexOf(`src="${t}"`));
  assert.ok(jarjestys.every((i, k) => i > 0 && (k === 0 || i > jarjestys[k - 1])), 'skriptien järjestys');
  assert.ok(!existsSync(new URL('sitemap.xml', juuri)) && !existsSync(new URL('robots.txt', juuri)),
    'repossa ei ole sitemap- tai robots-listaa, johon projektisivu päätyisi');
});

test('vanhat osoitteet ohjaavat projektisivulle ja säilyttävät välilehden', () => {
  for (const [tiedosto, kohde, alat] of [
    ['linssikatalogi.html', 'projekti.html#linssit', ['moottorit', 'pelissa', 'seuraavat', 'katalogi']],
    ['pelikatalogi.html', 'projekti.html#pelit', ['suunnitelmat', 'osat', 'ensimmaiset', 'katalogi', 'ideat']],
  ]) {
    const sivu = lue(tiedosto);
    assert.match(sivu, /<meta name="robots" content="noindex, nofollow">/, `${tiedosto}: noindex`);
    assert.ok(sivu.includes(`<meta http-equiv="refresh" content="0; url=${kohde}">`), `${tiedosto}: meta refresh`);
    assert.ok(sivu.includes(`location.replace('${kohde}'`), `${tiedosto}: location.replace`);
    assert.ok(sivu.includes(`<a href="${kohde}">`), `${tiedosto}: näkyvä linkki`);
    for (const ala of alat) assert.ok(sivu.includes(`'${ala}'`), `${tiedosto}: vanha välilehti #${ala}`);
  }
});

test('Pages julkaisee projektisivun ja laskee luvut ennen kopiointia', () => {
  const pages = lue('.github/workflows/pages.yml');
  for (const t of ['projekti.html', 'projekti-data.js', 'linssikatalogi.html', 'linssikatalogi-data.js',
    'pelikatalogi.html', 'pelikatalogi-data.js']) {
    assert.match(pages, new RegExp(`cp [^\\n]*\\b${t.replace('.', '\\.')}\\b`), `pages.yml kopioi ${t}`);
  }
  assert.match(pages, /cp -r [^\n]*\bassets\b[^\n]*\bprojekti\b/, 'pages.yml kopioi projekti/ ja assets/');
  assert.ok(pages.indexOf('node tools/tee-projekti-data.mjs') > 0
    && pages.indexOf('node tools/tee-projekti-data.mjs') < pages.indexOf('Kerää julkaistavat tiedostot'),
  'luvut lasketaan ennen kopiointia');
});

test('projektisivun kuvat: olemassa, käytössä ja yhteensä alle 3 Mt', () => {
  const kansio = new URL('assets/projekti/', juuri);
  const kuvat = readdirSync(kansio);
  const tilanne = lue('projekti/tilanne.js');
  let koko = 0;
  for (const k of kuvat) {
    koko += statSync(new URL(k, kansio)).size;
    assert.ok(tilanne.includes(`assets/projekti/${k}`), `assets/projekti/${k} ei ole käytössä`);
  }
  for (const m of tilanne.matchAll(/assets\/projekti\/([\w.-]+)/g)) {
    assert.ok(kuvat.includes(m[1]), `puuttuva kuva ${m[1]}`);
  }
  assert.ok(koko < 3 * 1024 * 1024, `kuvat yhteensä ${Math.round(koko / 1024)} kt`);
  assert.ok(existsSync(DATA_POLKU));
});
