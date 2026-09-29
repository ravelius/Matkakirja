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
  },
};
