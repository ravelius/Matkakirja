/*
 * Kuvatekstiauditointi: mittaa niiden selite-kenttien pituudet, jotka
 * OIKEASTI renderöityvät ruudulle kuvatekstinä (figcaption / p.kuvateksti /
 * p.selite / .nahtavyys-kuvateksti / .wiki-kuvateksti).
 *
 * Renderöintipolut (js/ui.js, js/pollo.js) — tarkistettu 14.8.2026:
 *   kansikuvat[].selite        -> piirraLehtiKuvat, figcaption.kuvateksti
 *   nostot[].selite            -> p.selite kuvan alla lehtisivulla
 *   nostot[].galleria[].selite -> sama p.selite (vaihtuu nuolista)
 *   kategoria.lista[].kohteet[0].selite (ensimmäinen kuvallinen)
 *                              -> figcaption.vinkki-hero-teksti
 *   nahtavyysjutut kuvat[].selite -> figcaption.nahtavyys-kuvateksti
 *   matkailijalle.kuva.selite  -> figcaption.kuvateksti (etusivun osio)
 *   matkailijalle.artikkeli.jaksot[].kuva(t).selite
 *                              -> figcaption.nahtavyys-kuvateksti (opas)
 *   VUORIKUVAT[].selite        -> #wiki-kuvateksti (kuratoituGalleria)
 *   maasto-tekstit kappaleet[].selite -> #wiki-kuvateksti
 *   valokuvat-pakettien selite -> postikortti p.kuvateksti
 *   pollo-reittikuvien selite  -> figcaption.pollo-kuvateksti
 *
 * EI mitata: vinkkilistan rivien selite (vain img.alt), maakartat.js:n
 * kohteet (kartan pinnit), quiz.selite (visan selitysteksti), lahde-kentät.
 *
 * Käyttö: node tools/kuvateksti-audit.mjs [--raja 260] [--json]
 */

const RAJA = Number(process.argv.find((a) => a.startsWith('--raja='))?.slice(7) ?? 260);
const JSON_ULOS = process.argv.includes('--json');

const load = async (p) => import(new URL(`../js/packs/${p}`, import.meta.url).href);

const havainnot = [];

function mittaa(polku, tiedosto, selite, extra = {}) {
  if (typeof selite !== 'string' || !selite.trim()) return;
  const merkit = selite.length;
  // Virkelaskuri: pisteet, huutomerkit ja kysymysmerkit lopetusmerkkeinä.
  // Lyhenteet (esim. "n.", "1700-l.") eivät ole yleisiä selitteissä,
  // mutta desimaalipilkut ja numeropisteet suodatetaan pois.
  const virkkeet = (selite.replace(/\d+\.\d+/g, 'X').match(/[.!?](\s|$)/g) ?? []).length || 1;
  havainnot.push({ polku, tiedosto, merkit, virkkeet, selite, ...extra });
}

// --- Lehdet: kaupunkilehdet ja maalehdet -------------------------------
async function lehdet() {
  const { KULTTUURI_KATEGORIAT } = await load('kulttuuri-kategoriat.js');
  const { MAA_KATEGORIAT } = await load('maa-kategoriat.js');
  const laji = (lahde, nimi) => {
    for (const [avain, kategoriat] of Object.entries(lahde)) {
      for (const kat of kategoriat ?? []) {
        const paikka = `${avain}/${kat.id ?? kat.nimi}`;
        for (const k of kat.kansikuvat ?? []) {
          mittaa('kansikuva', nimi, k.selite, { paikka, kuva: k.tiedosto });
        }
        for (const n of kat.nostot ?? []) {
          mittaa('nosto', nimi, n.selite, { paikka, kuva: n.tiedosto });
          for (const g of n.galleria ?? []) {
            mittaa('galleria', nimi, g.selite, { paikka, kuva: g.tiedosto });
          }
        }
        // Menovinkkisivun hero = ensimmäinen kuvallinen kohde.
        const eka = (kat.lista ?? []).flatMap((r) => r.kohteet ?? []).find((k) => k.tiedosto);
        if (eka) mittaa('vinkki-hero', nimi, eka.selite, { paikka, kuva: eka.tiedosto });
        /*
         * MATKAILIJALLE-OSIO JA MATKAILIJAN OPAS (lisätty 16.8.2026).
         * Tämä aukko oli Opus 25:n avoin havainto ja omistajan ehto
         * oppaan monistukselle: opasjaksojen kuvatekstit renderöityvät
         * ruudulle (ui.js opasJakso -> figcaption.nahtavyys-kuvateksti)
         * mutta jäivät auditin ulkopuolelle, joten niiden pituutta ei
         * mitannut mikään.
         *
         * Jakson `kuva` voi olla YKSI KUVA TAI LISTA (karuselli,
         * paketti O3): molemmat muodot mitataan, muuten karusellin
         * selitteet katoaisivat mittauksesta juuri kun niitä tulee
         * lisää.
         */
        const matkailijalle = kat.matkailijalle;
        if (matkailijalle?.kuva?.selite) {
          mittaa('matkailijalle', nimi, matkailijalle.kuva.selite,
            { paikka, kuva: matkailijalle.kuva.tiedosto });
        }
        for (const jakso of matkailijalle?.artikkeli?.jaksot ?? []) {
          const kuvat = Array.isArray(jakso.kuva) ? jakso.kuva : [jakso.kuva];
          for (const k of kuvat) {
            if (k?.selite) {
              mittaa('opasjakso', nimi, k.selite,
                { paikka: `${paikka}/${jakso.otsikko ?? '?'}`, kuva: k.tiedosto });
            }
          }
        }
        for (const k of matkailijalle?.artikkeli?.kuvat ?? []) {
          mittaa('opaskuva', nimi, k.selite, { paikka, kuva: k.tiedosto });
        }
      }
    }
  };
  laji(KULTTUURI_KATEGORIAT, 'kulttuuri-kategoriat.js');
  laji(MAA_KATEGORIAT, 'maa-kategoriat.js');
}

// --- Nähtävyysjutut ----------------------------------------------------
async function nahtavyydet() {
  const { NAHTAVYYSJUTUT } = await load('nahtavyysjutut.js');
  for (const [kaupunki, jutut] of Object.entries(NAHTAVYYSJUTUT)) {
    for (const [avain, juttu] of Object.entries(jutut ?? {})) {
      for (const k of juttu.kuvat ?? []) {
        mittaa('nahtavyys', 'nahtavyysjutut.js', k.selite,
          { paikka: `${kaupunki}/${avain}`, kuva: k.tiedosto });
      }
    }
  }
}

// --- Wiki-artikkelin kuvateksti: vuorikuvat ja maastotekstit ----------
async function maastot() {
  const { VUORIKUVAT } = await load('vuori-valokuvat.js');
  for (const [avain, kuvat] of Object.entries(VUORIKUVAT)) {
    for (const k of kuvat ?? []) {
      mittaa('vuorikuva', 'vuori-valokuvat.js', k.selite, { paikka: avain, kuva: k.tiedosto });
    }
  }
  for (const t of ['maasto-tekstit.js', 'maasto-tekstit-malli.js']) {
    const mod = await load(t);
    const data = mod.MAASTO_TEKSTIT ?? mod.MAASTO_TEKSTIT_MALLI ?? {};
    for (const [laji, kohteet] of Object.entries(data)) {
      for (const [avain, teksti] of Object.entries(kohteet ?? {})) {
        for (const kap of teksti.kappaleet ?? []) {
          mittaa('maasto-kappale', t, kap.selite, { paikka: `${laji}/${avain}`, kuva: kap.tiedosto });
        }
      }
    }
  }
}

// --- Postikortit: valokuvapaketit --------------------------------------
async function postikortit() {
  const paketit = [
    ['africa-valokuvat.js', 'AFRICA_VALOKUVAT'],
    ['europe-valokuvat.js', 'EUROPE_VALOKUVAT'],
    ['asia-valokuvat.js', 'ASIA_VALOKUVAT'],
    ['asia-lisat-valokuvat.js', 'ASIA_LISAT_VALOKUVAT'],
    ['northamerica-valokuvat.js', 'NORTHAMERICA_VALOKUVAT'],
    ['southamerica-valokuvat.js', 'SOUTHAMERICA_VALOKUVAT'],
    ['oceania-valokuvat.js', 'OCEANIA_VALOKUVAT'],
  ];
  for (const [tiedosto, nimi] of paketit) {
    let mod;
    try { mod = await load(tiedosto); } catch { continue; }
    const data = mod[nimi] ?? {};
    for (const [id, kuva] of Object.entries(data)) {
      mittaa('postikortti', tiedosto, kuva.selite, { paikka: id, kuva: kuva.tiedosto });
      for (const l of kuva.lisat ?? []) {
        mittaa('postikortti-lisa', tiedosto, l.selite, { paikka: id, kuva: l.tiedosto });
      }
    }
  }
}

// --- Pöllön reittikuvat -------------------------------------------------
async function pollo() {
  let mod;
  try { mod = await load('pollo-asetukset.js'); } catch { return; }
  const kokoa = (obj, polku = '') => {
    if (!obj || typeof obj !== 'object') return;
    if (Array.isArray(obj)) { obj.forEach((v, i) => kokoa(v, `${polku}[${i}]`)); return; }
    if (typeof obj.selite === 'string' && typeof obj.tiedosto === 'string') {
      mittaa('pollo', 'pollo-asetukset.js', obj.selite, { paikka: polku, kuva: obj.tiedosto });
    }
    for (const [k, v] of Object.entries(obj)) kokoa(v, polku ? `${polku}.${k}` : k);
  };
  for (const v of Object.values(mod)) kokoa(v);
}

await lehdet();
await nahtavyydet();
await maastot();
await postikortit();
await pollo();

const yli = havainnot.filter((h) => h.merkit > RAJA);
yli.sort((a, b) => b.merkit - a.merkit);

if (JSON_ULOS) {
  console.log(JSON.stringify({ raja: RAJA, yhteensa: havainnot.length, yli }, null, 2));
} else {
  console.log(`Kuvatekstejä yhteensä: ${havainnot.length}`);
  console.log(`Rajan (${RAJA} merkkiä) ylittäviä: ${yli.length}\n`);
  const ryhma = {};
  for (const h of havainnot) {
    const avain = `${h.tiedosto} · ${h.polku}`;
    ryhma[avain] ??= { kaikki: 0, yli: 0, pisin: 0 };
    ryhma[avain].kaikki += 1;
    if (h.merkit > RAJA) ryhma[avain].yli += 1;
    ryhma[avain].pisin = Math.max(ryhma[avain].pisin, h.merkit);
  }
  const rivit = Object.entries(ryhma).sort((a, b) => b[1].yli - a[1].yli);
  console.log('TIEDOSTO · POLKU'.padEnd(50), 'YLI/KAIKKI', 'PISIN');
  for (const [avain, s] of rivit) {
    console.log(avain.padEnd(50), `${String(s.yli).padStart(4)}/${String(s.kaikki).padEnd(5)}`, String(s.pisin).padStart(5));
  }
  console.log('\nPahimmat 25:');
  for (const h of yli.slice(0, 25)) {
    console.log(`  ${String(h.merkit).padStart(4)} mrk / ${h.virkkeet} virk · ${h.tiedosto} · ${h.polku} · ${h.paikka}`);
  }
}
