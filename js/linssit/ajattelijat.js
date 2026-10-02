/*
 * AJATTELIJAT-LINSSI LINSSILISTASSA, VAIN KEHITTÄJÄTILASSA (omistaja 2.10.2026 klo 12.27, Päätoimittajan kautta: "HETI"
 * omistajan kokeiltavaksi). Kerrokseton linssi: valinta avaa KORTTI-pohjalla ajattelijan valinnan, ja ajattelija avautuu
 * samaan näkymään kuin kehityslippu ?ajattelija=<tunnus> (js/linssit/ajattelija.js). Ajattelijat luetaan rekisteristä
 * (AJATTELIJAT), joten uusi ajattelija näkyy valinnassa ilman muutosta tähän tiedostoon.
 *
 * Pelaajille linssi ei näy: se on rekisterin KEHITTAJALINSSIT-listassa (ei LINSSIT), ja linssivalikko näyttää sen vain
 * eikä koskaan tietäjäpistepalkintona).
 */
import { AJATTELIJAT, avaaAjattelija } from './ajattelija.js';
import { luoPohjaKortti } from '../pohjat/pohjat.js';

export const LINSSI = {
  tunnus: 'ajattelijat',
  jarjestys: 95,
  kerros: false,
  kesken: true,
  /*
   * PALLOLLA: valinta avaa ajattelijakortin; kahva purkaa kortin ja näkymän. Ajattelijan sulkeminen palauttaa kartan
   * (ui.valitseLinssi(null)), kuten Astronautin kameran ✕.
   */
  pallolle(_lauta, _tila, ui) {
    let kortti = null;
    let nakyma = null;
    let purettu = false;
    const poistu = () => { if (!purettu) ui?.valitseLinssi?.(null); };
    const avaa = async (tunnus) => {
      kortti?.sulje?.();
      nakyma = await avaaAjattelija(tunnus, { sulkeutui: poistu }).catch((syy) => { console.warn('ajattelija', syy); return null; });
      if (!nakyma) poistu();
    };
    const toiminnot = Object.fromEntries(Object.keys(AJATTELIJAT).map((t) => [t, () => { avaa(t); }]));
    kortti = luoPohjaKortti({
      yla: 'Ajattelijat',
      otsikko: 'Kenen ajatteluun tutustut?',
      kappaleet: [{ teksti: 'Kehitysvaihe: näkyy vain kehittäjätilassa.' }],
      napit: Object.values(AJATTELIJAT).map((a) => ({ teksti: a.nimi, tyyppi: 'toiminto', toiminto: a.tunnus })),
    }, {
      toiminnot,
      sulje: () => { if (!nakyma) poistu(); },
    });
    if (kortti) {
      document.body.appendChild(kortti.el);
      kortti.avaa();
    }
    return {
      pura() {
        purettu = true;
        kortti?.sulje?.();
        kortti?.el?.remove?.();
        nakyma?.sulje?.();
      },
    };
  },

  nimi: 'Ajattelijat',
  lyhyt: 'Kipsibysti herää eloon: ajattelijan ajatuksia valona kasvoilla (kehitysvaihe).',
  esittely: 'Kipsibysti herää eloon: ajattelijan ajatuksia valona kasvoilla (kehitysvaihe).',
  // Bystin siluetti: pää, kaula ja sokkeli.
  ikoni: '<circle cx="12" cy="8" r="4.2"/>'
    + '<path d="M9.4 12.4c-.4 1.6-.4 2.8 0 3.8M14.6 12.4c.4 1.6.4 2.8 0 3.8"/>'
    + '<path d="M6.5 20.6c.8-2.6 3-4.2 5.5-4.2s4.7 1.6 5.5 4.2z"/>',
  valokuva: false,
  laudat: ['*'],
  lahde: {
    aineisto: 'SMK – Statens Museum for Kunst: kipsivalosten 3D-skannaukset (Scan the World / SMK)',
    lisenssi: 'Public Domain Mark 1.0',
    osoite: 'https://open.smk.dk/',
    haettu: '2026-10-01',
  },
};
