// Dioraaman henkilöpankki (erä 1, speksi docs/raportit/dioraama-rajapinnat-20260929.md
// kohta 1). Erä 1: paikkamerkit (yksiväriset vartalot tunnuspiirtein) —
// oikea atlas piirretään rakennusajossa A5:n teePaikkamerkkiAtlas(henkilo):lla
// (ks. speksin kohta 3). ruutu = atlaksen ruudun koko pikseleinä [leveys,
// korkeus], sarakkeet = ruutuja per rivi, pivot = ankkuri ruudun
// alaosassa (u-keskitys, y ylhäältä), korkeus_m = hahmon todellinen
// pituus maailmassa (billboard-skaalaus). Kaikilla sama silmukka-asettelu
// (rivi/ruudut/fps), jotta 'tyo' ja 'kavely' löytyvät joka hahmolta.
//
// Erä 2 (docs/raportit/dioraama-rajapinnat-era2-20260929.md kohta 2 "HENKILOT"):
// valinnainen `maalattu` kuvaa Codexin oikean RGBA-atlaksen omalla ruudukollaan
// (eri kuin paikkamerkin 128×192/8 sarr.) — rakennuskone (media.mjs) käyttää
// sitä jos lähde löytyy, muuten palautuu paikkamerkkiin. `paikkamerkki` säilyy
// kokilla varalähteenä siihen asti.
//
// Erä 2b (docs/raportit/dioraama-rajapinnat-era2b-20260929.md kohta 4 "3D-HAHMOT"):
// `malli3d` kuvaa pienoisfiguurin (tools/dioraama/hahmot3d.mjs, teeHahmo3d).
// mittasuhteet: pituus_m = korkeus_m; hartiat_m/lantio_m/paa_m = tunnetut
// ihmisvartalon likisuhteet × pituus_m (aikuinen: 0,245/0,20/0,135; vesipoika
// on lapsi (< 1,5 m): 0,22/0,205/0,16 — isompi pää, kapeammat hartiat).
// vaatteet: paita/housut/hame/esiliina ovat läsnäolo-lippuja (VÄRI tulee
// AINA varit-kentästä, ei näistä) — hahmot3d.mjs:n kiinteä sääntö: paita →
// pinta 'vaate', housut/hame → 'vaate2', esiliina → 'esiliina'. paahine
// 'myssy'|'huivi'|null (ei 'hattu':a näillä kolmella). varit.vaate/vaate2/
// esiliina on poimittu/johdettu paikkamerkki-kentistä (vaate2 = vaate
// tummennettuna kertoimella 0,75, pyöristys per kanava) — iho/hiukset/
// kengät/silmät käyttävät js/dioraama/pankit/pinnat.js:n yhteistä oletusta.
// esine: kädessä pidettävä rekvisiitta (oikea käsi, kasi_o) tai null.
export const HENKILOT = {
  'kokki-1500': {
    nimi: 'Kokki',
    paikkamerkki: { vari: '#7a3b2e', esiliina: '#e8e0cc', paine: 'myssy' },
    ruutu: [128, 192], sarakkeet: 8, pivot: [0.5, 0.04], korkeus_m: 1.72,
    silmukat: {
      idle: { rivi: 0, ruudut: 4, fps: 6 }, tyo: { rivi: 1, ruudut: 8, fps: 10 },
      puhe: { rivi: 2, ruudut: 4, fps: 8 }, kavely: { rivi: 3, ruudut: 8, fps: 10 },
    },
    lisenssi: 'oma paikkamerkki',
    maalattu: {
      lahde: 'hahmot/kokki-1500.png',
      ruutu: [256, 384],
      sarakkeet: 8,
      pivot: [0.5, 15 / 384],
      px_per_m: 196,
      silmukat: {
        idle: { rivi: 0, ruudut: 8, fps: 10 }, tyo: { rivi: 1, ruudut: 12, fps: 10 },
        puhe: { rivi: 3, ruudut: 6, fps: 10 },
      },
      lisenssi: 'Codex (Päätoimittajan tilaus), omistajan oikeudet',
    },
    malli3d: {
      mittasuhteet: { pituus_m: 1.72, hartiat_m: 0.42, lantio_m: 0.34, paa_m: 0.23 },
      vaatteet: { paita: true, housut: true, esiliina: true, paahine: 'myssy' },
      varit: { vaate: '#7a3b2e', vaate2: '#5c2c22', esiliina: '#e8e0cc' },
      esine: 'kauha',
    },
  },
  'apulainen-1500': {
    nimi: 'Apulainen',
    paikkamerkki: { vari: '#4f5d3a', esiliina: '#cdbf9e', paine: 'huivi' },
    ruutu: [128, 192], sarakkeet: 8, pivot: [0.5, 0.04], korkeus_m: 1.65,
    silmukat: {
      idle: { rivi: 0, ruudut: 4, fps: 6 }, tyo: { rivi: 1, ruudut: 8, fps: 10 },
      puhe: { rivi: 2, ruudut: 4, fps: 8 }, kavely: { rivi: 3, ruudut: 8, fps: 10 },
    },
    lisenssi: 'oma paikkamerkki',
    malli3d: {
      mittasuhteet: { pituus_m: 1.65, hartiat_m: 0.40, lantio_m: 0.33, paa_m: 0.22 },
      vaatteet: { paita: true, hame: true, esiliina: true, paahine: 'huivi' },
      varit: { vaate: '#4f5d3a', vaate2: '#3b462c', esiliina: '#cdbf9e' },
      esine: null,
    },
  },
  'vesipoika-1500': {
    nimi: 'Vesipoika',
    paikkamerkki: { vari: '#5a4a6e', paine: 'paljas' },
    ruutu: [128, 192], sarakkeet: 8, pivot: [0.5, 0.04], korkeus_m: 1.45,
    silmukat: {
      idle: { rivi: 0, ruudut: 4, fps: 6 }, tyo: { rivi: 1, ruudut: 8, fps: 10 },
      puhe: { rivi: 2, ruudut: 4, fps: 8 }, kavely: { rivi: 3, ruudut: 8, fps: 10 },
    },
    lisenssi: 'oma paikkamerkki',
    malli3d: {
      mittasuhteet: { pituus_m: 1.45, hartiat_m: 0.32, lantio_m: 0.30, paa_m: 0.23 },
      vaatteet: { paita: true, housut: true, paahine: null },
      varit: { vaate: '#5a4a6e', vaate2: '#443852' },
      esine: 'sanko',
    },
  },
};
