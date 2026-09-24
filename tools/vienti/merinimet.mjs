/*
 * MERINIMET (skeema 1.36; Linssisepän tilaus build 11:een Fablen
 * päätöksellä 24.9.2026): natiivin linssikartan merinimet kuten webin
 * poltetulla nimiötasolla.
 *
 * WEB ON MALLI: web polttaa nimiötason generaattorilla
 * (tools/generoi-laattapyramidi.mjs `--nimiotaso --nimiot-aika pysyva`)
 * rivistä js/packs/nimisto-1873.js NIMISTO_1873, luokka 'meri', ja piirtää
 * ne tools/fokuskartta/maailmapiirto.js:n NIMIÖTASO-osion mukaan. Tyyli
 * luetaan suoraan sieltä (ei kopiota): versaali, harvennus
 * NIMION_HARVENNUS_EM kirjainkorkeudesta, NIMION_FONTTI, NIMION_VARIT.meri,
 * kirjainkorkeus NIMION_KOOT.meri ruutupikseleinä tasoittain, ei haloa,
 * nimen alla aaltomerkki (piirraAaltomerkki).
 *
 * Tuotannon luettelo (julisteet/pyramidi/pyramidi.json, nimiotaso
 * 2026-09-22g-nimiot) sisältää samat 29 merta samoissa pisteissä.
 * `tasot` on lähteen taso­joukko (webin nimioTasolla: z ≥ 4). Webin
 * ladonta väistää lisäksi päällekkäiset nimiöt, ja siksi tuotannossa
 * EGEANMERI, MARMARANMERI ja RIIANLAHTI puuttuvat tasolta z5. Väistö on
 * piirtäjän asia, ei datan.
 */
import { NIMISTO_1873 } from '../../js/packs/nimisto-1873.js';
import {
  NIMION_KOOT, NIMION_HARVENNUS_EM, NIMION_FONTTI, NIMION_VARIT, nimioTasolla,
} from '../fokuskartta/maailmapiirto.js';

/** Sama tunnus kuin generaattorin nimiötason metadatassa (nimiot[id], meri: id). */
export const merinimenTunnus = (teksti) => String(teksti).toLowerCase()
  .replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/å/g, 'a').replace(/é/g, 'e').replace(/î/g, 'i')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const LAHDE = 'Nimet: en- ja fi-Wikipedian artikkelit (js/packs/nimisto-1873.js, tarkistettu 20.9.2026); '
  + 'sijainti: Matkakirjan toimitus (avoveden kohta, ei aluerajaus).';

export function merinimiKokoelma(taulukko) {
  const tasot = Object.keys(NIMION_KOOT.meri).map(Number).sort((a, b) => a - b);
  const rivit = NIMISTO_1873
    .filter((n) => n.luokka === 'meri' && (!n.aika || n.aika === 'pysyva'))
    .map((n) => ({
      id: merinimenTunnus(n.teksti),
      nimi: n.teksti,
      lat: n.lat,
      lon: n.lon,
      kulma: Number(n.kulma) || 0,
      kaari: null,
      tasot: tasot.filter((z) => nimioTasolla(n, z)),
      lahde: LAHDE,
      lisenssi: '© Matkakirja',
    }));
  const idt = new Set();
  for (const r of rivit) {
    if (idt.has(r.id)) throw new Error(`merinimet: tunnus ${r.id} kahdesti`);
    idt.add(r.id);
  }
  const kokoelma = taulukko('js/packs/nimisto-1873.js#NIMISTO_1873 (luokka meri, aika pysyva)',
    'Merien, lahtien ja salmien nimet kuten webin poltetulla nimiötasolla. lat/lon = nimiön keskipiste '
      + '(avovedellä), kulma asteina myötäpäivään (0 = vaaka), kaari = null (webissä ei kaarevia nimiä), '
      + 'tasot = pyramidin tasot, joilla nimi näytetään. Juuren tyyli = webin piirto '
      + '(tools/fokuskartta/maailmapiirto.js NIMIÖTASO).',
    {}, rivit);
  kokoelma.tyyli = {
    versaali: true,
    harvennusEm: NIMION_HARVENNUS_EM,
    fontti: NIMION_FONTTI,
    vari: NIMION_VARIT.meri,
    kirjainkorkeusPx: Object.fromEntries(tasot.map((z) => [String(z), NIMION_KOOT.meri[z]])),
    halo: false,
    tasaus: 'keskitetty',
    aaltomerkki: {
      kuvaus: 'Webin piirraAaltomerkki: kolmen jakson aalto nimen alla, keskellä 0,95 × kirjainkorkeus '
        + 'nimen keskilinjan alapuolella. Aallon leveys w = 0,5 × nimen leveys (harvennus mukana); jokainen '
        + 'puolijakso a = w/6 on neliöllinen Bézier, jonka ohjauspiste on ±0,55·a (ylös ensin). '
        + 'Viivan paksuus max(0,8, nimen leveys/120) px, pyöreät päät, sama väri kuin nimellä.',
      alaMuutos: 0.95,
      leveysOsuus: 0.5,
      jaksot: 3,
      ohjausOsuus: 0.55,
    },
  };
  return kokoelma;
}
