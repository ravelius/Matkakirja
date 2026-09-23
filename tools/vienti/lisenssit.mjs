#!/usr/bin/env node
/*
 * MEDIAN LISENSSITARKISTUS — YKSI LASKURI KAIKELLE (Siirtoseppä 23.9.2026).
 *
 *   node tools/vienti/lisenssit.mjs [--json]
 *
 * Pelistä tulee maksullinen (Fable 23.9.2026), joten NC- ja ND-ehtoinen
 * aineisto ei saa olla käytössä. Tämä käy läpi jokaisen viennin
 * mediaviitteen (tools/vienti/media.json: kuvat, äänet, liput, julisteet…)
 * ja luokittelee sen lisenssin samalla säännöllä kuin pelin portit
 * (js/lisenssi.js lisenssiKelpaa ja aaniLisenssiTunnus). Toistettava
 * versio docs/raportit/lisenssi-inventaario-20260923.md:n kertaskripteistä.
 *
 * MISTÄ LISENSSI LUETAAN. Viitteen omasta oliosta ja sen esivanhemmista
 * (inventaarion opetus: lisenssi on usein ylempänä, esim. NASA-kuvat),
 * lähin ensin: `<kenttä>Nimi`, `<kenttä>Lahde`, `<kenttä>Lisenssi`
 * (musiikkiNayteNimi, aaniLahde), lisenssi, license, nimi, lahde. Lopuksi saman moduulin *_LAHDE-vakio (JULISTE_LAHDE).
 * Ensimmäinen teksti, josta löytyy lisenssitunnus, ratkaisee.
 *
 * LUOKAT (viitteen huonoin esiintymä ratkaisee):
 *   nc-nd       NC- tai ND-ehtoinen: maksullisessa versiossa kielletty
 *   tuntematon  kolmannen osapuolen media ilman kirjattua lisenssiä
 *   vapaa       PD, CC0, CC BY tai CC BY-SA kirjattuna
 *   oma         oma tuotanto (julisteet, havainnekuvat, repon assetit…)
 *   commons     Commons-kuva tai -lippu: lisenssi Commonsin metatiedoissa,
 *               ei datassa → viikoittainen verkkotarkistus
 *   radio       suora radiovirta (eri lisenssiluokka, ks. inventaario)
 *   linkki      lähde- tai lisenssilinkki, ei media
 *
 * PORTTI: tests/lisenssit.test.mjs vaatii, että NC/ND-viitteet ovat
 * täsmälleen TUNNETUT_NC_ND-lista (tools/vienti/lisenssit-tunnetut.json).
 * Uusi NC/ND kaataa testin; korvattu pitää poistaa listasta, jotta lista
 * pysyy totena ja vain lyhenee. Tämä on ainoa NC/ND-laskuri: myös
 * äänten portin vartija (tests/aanilisenssit.test.mjs) nojaa tähän.
 */
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { aaniLisenssiTunnus, lisenssiKelpaa } from '../../js/lisenssi.js';

const TAMA = dirname(fileURLToPath(import.meta.url));

/** Tunnetut NC/ND-viitteet (media.json `arvo`), jotka saa vain poistaa. */
export const TUNNETUT_NC_ND = JSON.parse(readFileSync(join(TAMA, 'lisenssit-tunnetut.json'), 'utf8')).viitteet;

const OMAT_LAJIT = new Set(['juliste', 'hetkikuva', 'kohtaamiskuva', 'aani-oma', 'repo', 'ampari-avain',
  'asset-aarteet', 'asset-elaimet', 'asset-ihmeet', 'asset-miniatyyrit', 'asset-nostot', 'tiedosto']);
const COMMONS_LAJIT = new Set(['kuva-commons', 'lippu-commons']);
const OMA_TEKSTI = /matkakirjan (havainnekuva|kuvitus|oma)|oma paino|oma tuotanto|tekoälyllä tuotettu|elevenlabs|lyria|textdesk/i;
/** Kokonaan omaa tuotantoa (inventaario: Lyria-musiikki, textdesk-puheet). */
const OMAT_MODUULIT = new Set(['js/tyohuone-musiikki.js', 'js/packs/saapumispuheet.js']);
const JARJESTYS = ['nc-nd', 'tuntematon', 'commons', 'radio', 'vapaa', 'oma', 'linkki'];

/** JSON pointerin osat (~1 → /, ~0 → ~). */
const osat = (polku) => polku.split('/').slice(1).map((o) => o.replace(/~1/g, '/').replace(/~0/g, '~'));

/** Lisenssiteksti lähimmästä oliosta ylöspäin, tai null. */
function lisenssiTeksti(ketju, kentta, moduulinLahde) {
  for (let i = ketju.length - 1; i >= 0; i -= 1) {
    let olio = ketju[i];
    // Map-avain ($map-pari [avain, arvo]): lisenssi on parin arvo-oliossa.
    if (Array.isArray(olio) && olio.length === 2 && ketju[i - 2]?.$map === ketju[i - 1]) olio = olio[1];
    if (!olio || typeof olio !== 'object' || Array.isArray(olio)) continue;
    const ehdokkaat = [
      ...(i === ketju.length - 1 ? [olio[`${kentta}Nimi`], olio[`${kentta}Lahde`], olio[`${kentta}Lisenssi`]] : []),
      olio.lisenssi, olio.license, olio.nimi, olio.lahde,
    ];
    for (const e of ehdokkaat) {
      if (typeof e === 'string' && (aaniLisenssiTunnus(e) != null || OMA_TEKSTI.test(e))) return e;
    }
  }
  return moduulinLahde ?? null;
}

/**
 * Osoitteen perusteella tunnettu alkuperä: NASAn kuvat ovat Yhdysvaltain
 * liittovaltion teoksia (PD, NASA Media Usage Guidelines; myös ämpäriin
 * peilatut ISS-kuvat), ja ämpärin
 * kohtaamiset/-kansio on pelin omia kuvia (sama kuin laji kohtaamiskuva).
 */
function osoitteenLuokka(arvo) {
  if (/^https:\/\/(images-assets|eoimages\.gsfc)\.nasa\.gov\//.test(arvo)) return 'vapaa';
  // ISS-miehistön kuvat peilattuna ämpäriin NASAn tunnuksella (iss026e016287).
  if (/^https:\/\/media\.matkakirja\.app\/linssit\/astronautin-kamera\/iss\d+e\d+/.test(arvo)) return 'vapaa';
  if (/^https:\/\/media\.matkakirja\.app\/kohtaamiset\//.test(arvo)) return 'oma';
  return null;
}

function luokka(laji, teksti, moduuli, arvo) {
  if (laji === 'linkki') return 'linkki';
  const tunnus = teksti ? aaniLisenssiTunnus(teksti) : null;
  if (tunnus != null) return lisenssiKelpaa(tunnus) ? 'vapaa' : 'nc-nd';
  if (teksti && OMA_TEKSTI.test(teksti)) return 'oma';
  if (COMMONS_LAJIT.has(laji)) return 'commons';
  if (moduuli === 'js/packs/radiot.js') return 'radio';
  if (OMAT_MODUULIT.has(moduuli)) return 'oma';
  if (OMAT_LAJIT.has(laji)) return 'oma';
  return osoitteenLuokka(arvo) ?? 'tuntematon';
}

/**
 * Luokittelee viennin median. `tiedostot` = kokoaVienti():n Map
 * (polku → teksti). Palauttaa { lajeittain, viitteet } missä viitteet on
 * lista { arvo, laji, luokka, lisenssi, esiintymat }.
 */
export function luokitteleMedia(tiedostot) {
  const manifest = JSON.parse(tiedostot.get('manifest.json'));
  const moduulit = new Map();
  const moduuli = (nimi) => {
    if (!moduulit.has(nimi)) {
      const m = manifest.moduulit.find((x) => x.moduuli === nimi);
      moduulit.set(nimi, m ? JSON.parse(tiedostot.get(m.tiedosto)).exportit : {});
    }
    return moduulit.get(nimi);
  };
  const moduulinLahde = (nimi) => {
    const exportit = moduuli(nimi);
    const k = Object.keys(exportit).find((e) => /_LAHDE$/.test(e) && typeof exportit[e] === 'string');
    return k ? exportit[k] : null;
  };

  const viitteet = [];
  for (const v of JSON.parse(tiedostot.get('media.json')).viitteet) {
    /*
     * Luokan ratkaisevat esiintymät, joissa lisenssi on kirjattu; pelkkä
     * hakemisto (esim. VALOKUVAT_PAIKALLISET: tiedosto → repon kopio) ei
     * tee viitteestä tuntematonta. Jos millään esiintymällä ei ole
     * lisenssitekstiä, ratkaisee lajin ja moduulin mukainen oletus.
     * Huonoin voittaa kummassakin joukossa, joten NC/ND ei piiloudu.
     */
    const tulokset = v.esiintymat.map((e) => {
      const reitti = osat(e.polku);
      const ketju = [moduuli(e.moduuli)[e.export]];
      for (const o of reitti.slice(0, -1)) ketju.push(ketju.at(-1)?.[o]);
      const teksti = lisenssiTeksti(ketju, reitti.at(-1), moduulinLahde(e.moduuli));
      return { teksti, luokka: luokka(v.laji, teksti, e.moduuli, v.arvo) };
    });
    const kirjatut = tulokset.filter((t) => t.teksti);
    const pahin = (kirjatut.length ? kirjatut : tulokset)
      .reduce((a, b) => (JARJESTYS.indexOf(b.luokka) < JARJESTYS.indexOf(a.luokka) ? b : a));
    viitteet.push({ arvo: v.arvo, laji: v.laji, luokka: pahin.luokka, lisenssi: pahin.teksti, esiintymat: v.esiintymat.length });
  }
  const lajeittain = {};
  for (const v of viitteet) {
    lajeittain[v.laji] ??= {};
    lajeittain[v.laji][v.luokka] = (lajeittain[v.laji][v.luokka] ?? 0) + 1;
  }
  return { lajeittain, viitteet };
}

/** NC/ND-viitteiden vertailu tunnettuun listaan. */
export function vertaaTunnettuihin(viitteet, tunnetut = TUNNETUT_NC_ND) {
  const nyt = new Set(viitteet.filter((v) => v.luokka === 'nc-nd').map((v) => v.arvo));
  const lista = new Set(tunnetut.map((t) => t.arvo));
  return {
    uudet: [...nyt].filter((a) => !lista.has(a)).sort(),
    korvatut: [...lista].filter((a) => !nyt.has(a)).sort(),
    nyt: nyt.size,
  };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { kokoaVienti } = await import('./vie-sisalto.mjs');
  const { tiedostot } = await kokoaVienti();
  const { lajeittain, viitteet } = luokitteleMedia(tiedostot);
  const v = vertaaTunnettuihin(viitteet);
  if (process.argv.includes('--json')) {
    console.log(JSON.stringify({ lajeittain, vertailu: v, viitteet }, null, 1));
  } else {
    const yht = {};
    for (const x of viitteet) yht[x.luokka] = (yht[x.luokka] ?? 0) + 1;
    console.log(`Mediaviitteitä ${viitteet.length}: ${JARJESTYS.map((l) => `${l} ${yht[l] ?? 0}`).join(', ')}`);
    for (const [laji, l] of Object.entries(lajeittain).sort()) console.log(`  ${laji.padEnd(18)} ${JSON.stringify(l)}`);
    console.log(`NC/ND ${v.nyt} (tunnettuja ${TUNNETUT_NC_ND.length}).`);
    for (const a of v.uudet) console.log(`  UUSI NC/ND: ${a} — ${viitteet.find((x) => x.arvo === a).lisenssi}`);
    for (const a of v.korvatut) console.log(`  korvattu, poista tools/vienti/lisenssit-tunnetut.json:sta: ${a}`);
  }
  process.exitCode = v.uudet.length || v.korvatut.length ? 1 : 0;
}
