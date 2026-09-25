#!/usr/bin/env node
/*
 * NIMETYT POLTTORESEPTIT (Karttaseppä 25.9.2026).
 *
 * Omistajan päätös 25.9.2026 klo 00 (Raamattu "PERUSKARTAN RESEPTI
 * 2026-09-25"): koko maailmalle poltetaan D2 + C-reliefi + natiivin
 * vektorirannat. Vedokset ja mittaukset:
 * docs/raportit/kaappaukset/kartta-46-20260924/LUEMINUT.md.
 *
 * Resepti on YKSI PAIKKA, jossa päätöksen liput elävät. Polttoskripti
 * (tools/polta-paikallisesti.sh --resepti 2026-09-25) lukee siltä
 * pohjan, yhteiset ja pallon liput sekä pohjan shardijaon; käsin
 * kirjoitettu lippurivi ehtisi eriytyä vedoksista, ja yksikin puuttuva
 * lippu (esim. --meri-kohina) tekisi eri kartan kuin omistaja hyväksyi.
 *
 * Ilman `--resepti`-valitsinta polttoskripti toimii tavulleen kuten
 * ennen: kaikki tämän tiedoston liput ovat generaattorissa oletuksena
 * pois (tests/peruskartta-resepti.test.mjs).
 *
 * KÄYTTÖ SKRIPTISTÄ (rivit muotoa AVAIN=arvo, shell-eval):
 *   node tools/polttoresepti.mjs liput 2026-09-25
 *   node tools/polttoresepti.mjs shardit 2026-09-25 --korkeus 1
 */

/*
 * DEM-KAISTAJAKO. Reliefi luetaan joka tasolla DEM:stä, ja ruudukon väli
 * on tason pikseli (z6 30″, z7 15″, z8 7,5″). Koko maailman ruudukko
 * olisi z6:lla 1,7 Gt, z7:llä 6,7 Gt ja z8:lla 27 Gt Int16:ta, ja
 * generaattori pitää sen muistissa ja lähettää selainsivulle yhtenä
 * tiedostona. Jokainen taso on siksi oma shardinsa (eri väli = eri
 * ruudukko, generoi-laattapyramidi.mjs "YKSI AJO, YKSI RUUDUKKO"), ja
 * z5–z8 jaetaan pituuskaistoiksi niin, että ruudukko on enintään noin
 * 330 Mt (koko korkeus 163° × kaistan leveys, mitattu --kuiva-ajolla):
 *
 *   taso  kaista (z8-sarakkeina)  kaistoja  DEM-ikkuna / shardi
 *   z0–z4 koko maailma            1 / taso  ≤ 106 Mt (z4)
 *   z5    192 (24 z5-saraketta)   2         ~240 Mt
 *   z6     64 (16 z6-saraketta)   6         ~320 Mt
 *   z7     16 (8 z7-saraketta)   22         ~320 Mt
 *   z8      4 (4 z8-saraketta)   85         ~320 Mt
 *
 * Kaista annetaan SYVIMMÄN tason (z8, `--tasoja 9`) sarakkeina, ja
 * jokaisen kaistan alku on tason lohkorajalla (LOHKO 4 saraketta):
 * lohko ei jakaudu kahdelle shardille, joten hukkaa ei synny.
 */
export const Z8_SARAKKEITA = 338;
export const LOHKO = 4;

export const RESEPTIT = Object.freeze({
  '2026-09-25': Object.freeze({
    kuvaus: 'D2 + C-reliefi + natiivin vektorirannat (omistaja 25.9.2026)',
    /* Kaikille shardeille ja luettelolle (23a:n mukaan). */
    yhteisliput: ['--rannikon-harvennus', '0.004'],
    /*
     * POHJA. D2 = ei rantamustetta (rantaviiva on webissä rantatasolla ja
     * natiivissa vektorina), maan ja meren raja AA-maskina, meri pelkkänä
     * sävyliukuna (ei syvyyskäyriä eikä vesiviivoitusta, syvyyskohina
     * viidennes). C-reliefi: lämmin monisuuntainen varjostus DEM:stä
     * kaikille tasoille. DEM-kansiot lisää polttoskripti (--dem, --dem90).
     */
    /*
     * Pohja ilman rantaviivaa: polttoskriptin oma kytkin (--ilman-
     * rantaviivaa), joka lisää lipun pohjashardeille ja luettelolle ja
     * ohjaa rantatason shardit ja pallon `"ranta": null` -valinnan.
     */
    ilmanRantaviivaa: true,
    pohjaliput: [
      '--joet-pohjaan',
      '--syvyyskohina', 'lauta',
      '--koristeet', 'assets/koristeet/meri/pallo-koristeet.json',
      '--resepti-json', '{"syvyys":{"litistys":0.8}}',
      '--maski-aa', '4',
      '--meri-kohina', '0.2',
      '--reliefi-koe', 'lammin',
      '--dem-kaikki-tasot',
      '--reseptinimi', '2026-09-25',
    ],
    /* Päätöksen vastaiset liput: polttoskripti kieltäytyy, jos ne annetaan lisäksi. */
    kielletyt: ['--syvyyskayrat', '--vesiviivoitus', '--syvyysportaat', '--rantaleveys'],
    laatu: '0.9',
    patina: 'kevyt',
    /* Pallon sarja Z0–Z9: laatikkosuodatin, JPEG 90 ilman värin alinäytteistystä. */
    palloliput: ['--suodatin', 'laatikko', '--jpeg-laatu', '90', '--jpeg-444'],
    palloTasot: '0-9',
    /* Pohjan tasot ja kaistat (z8-sarakkeina; null = koko taso yhtenä shardina). */
    kaistat: Object.freeze({
      0: null, 1: null, 2: null, 3: null, 4: null, 5: 192, 6: 64, 7: 16, 8: 4,
    }),
    /* Kaukotasot 3′-varalla kuten ennen, z7–z8 polttoskriptin --korkeus (1′). */
    karkeatTasotEnintaan: 6,
  }),
});

export function resepti(nimi) {
  const r = RESEPTIT[nimi];
  if (!r) throw new Error(`tuntematon resepti ${nimi} (tunnetut: ${Object.keys(RESEPTIT).join(', ')})`);
  return r;
}

/**
 * Pohjan shardit: [{ nimi, args }] samassa muodossa kuin
 * polta-paikallisesti.sh:n `shardit` (args ilman pohjalippuja).
 * z8:n nimet ovat entiset (`z8-001`…), jotta `--koe` löytää ne.
 */
export function reseptinShardit(nimi, { korkeus = 1, sarakkeita = Z8_SARAKKEITA } = {}) {
  const r = resepti(nimi);
  const ulos = [];
  for (const [zs, kaista] of Object.entries(r.kaistat)) {
    const z = Number(zs);
    const kaarim = z <= r.karkeatTasotEnintaan ? 3 : korkeus;
    const perus = `--tasoja 9 --tasot ${z}`;
    if (!kaista) {
      ulos.push({ nimi: `z${z}`, z, args: `${perus} --kaariminuutit ${kaarim}` });
      continue;
    }
    const jako = 2 ** (8 - z);
    if (kaista % (LOHKO * jako)) throw new Error(`z${z}: kaista ${kaista} ei ole lohkorajalla`);
    const leveys = z === 8 ? 3 : 2;
    let a = 0; let n = 1;
    while (a < sarakkeita) {
      const b = Math.min(a + kaista - 1, sarakkeita - 1);
      ulos.push({
        nimi: `z${z}-${String(n).padStart(leveys, '0')}`,
        z,
        sarakkeet: [a, b],
        args: `${perus} --sarakkeet ${a}-${b} --kaariminuutit ${kaarim}`,
      });
      a = b + 1; n += 1;
    }
  }
  return ulos;
}

/* ------------------------------------------------------------ komentorivi */

const shellArvo = (v) => `'${String(v).replace(/'/g, "'\\''")}'`;

async function paa(argv) {
  const [komento, nimi, ...muut] = argv;
  if (komento === 'liput') {
    const r = resepti(nimi);
    const rivit = {
      R_YHTEISLIPUT: r.yhteisliput.join(' '),
      R_POHJALIPUT: r.pohjaliput.join(' '),
      R_PALLOLIPUT: r.palloliput.join(' '),
      R_PALLO_TASOT: r.palloTasot,
      R_LAATU: r.laatu,
      R_PATINA: r.patina,
      R_KIELLETYT: r.kielletyt.join(' '),
      R_ILMAN_RANTAVIIVAA: r.ilmanRantaviivaa ? 1 : 0,
    };
    for (const [k, v] of Object.entries(rivit)) console.log(`${k}=${shellArvo(v)}`);
    return;
  }
  if (komento === 'shardit') {
    const i = muut.indexOf('--korkeus');
    const korkeus = i >= 0 ? Number(muut[i + 1]) : 1;
    for (const s of reseptinShardit(nimi, { korkeus })) console.log(`${s.nimi}|${s.args}`);
    return;
  }
  throw new Error('käyttö: polttoresepti.mjs liput|shardit <nimi> [--korkeus 1|3]');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  paa(process.argv.slice(2)).catch((e) => { console.error(`VIRHE: ${e.message}`); process.exit(2); });
}
