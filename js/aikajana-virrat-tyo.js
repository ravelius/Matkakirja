/*
 * IHMISEN MATKA VÄRIVIRTOINA — LASKENTA TYÖSÄIKEESSÄ (Web Worker).
 *
 * Hionta 6.9.2026: saapumisaikojen laskenta kesti puhelimen
 * pääsäikeessä 1,2–2,4 s setTimeout-paloinakin, ja nopealla
 * Käynnistyksellä Afrikka ehti näkyä hetken värittömänä. Nyt
 * js/aikajana-virrat.js käynnistää tämän moduulityösäikeen heti
 * linssin auetessa; pääsäie jatkaa avausjakson kirjoituskonetta ja
 * nappia, ja tulos tulee viestinä valmiina piirrettäväksi.
 *
 * Tiedosto on tarkoituksella pelkkä kuori: kaikki laskenta on
 * js/aikajana-virrat-laskenta.js:ssä, jota myös testit ja työkalut
 * ajavat Nodessa. Jos Worker ei käynnisty (yhden tiedoston versio,
 * file://-osoite, vanha selain), piirtäjä ajaa saman laskennan
 * pääsäikeessä — tulos on sama, vain säie eri.
 *
 * Viesti sisään:  { aineisto: { virrat, retki, vanha, maamaski }, kerroin }
 * Viesti ulos:    { kentat: { aika, virta }, tarkka } siirrettyinä puskureina
 *                 tai { virhe } jos laskenta kaatui.
 */
import {
  puraMaamaski, puraPeitto, laskeKentat, tarkennaKentat,
} from './aikajana-virrat-laskenta.js';

self.onmessage = (viesti) => {
  const { aineisto, kerroin = 2 } = viesti.data ?? {};
  try {
    const { maamaski } = aineisto;
    const leveys = maamaski.leveys;
    const korkeus = maamaski.korkeus;
    const maa = puraMaamaski(maamaski.juoksut, leveys * korkeus);
    const peitto = puraPeitto(maamaski.peitot, leveys * korkeus);
    const kentat = laskeKentat(
      { virrat: aineisto.virrat, retki: aineisto.retki ?? null, vanha: aineisto.vanha ?? null },
      { maa, leveys, korkeus },
    );
    const tarkka = tarkennaKentat(kentat, { maa, peitto, leveys, korkeus, kerroin });
    const siirto = [kentat.aika.buffer, kentat.virta.buffer];
    for (const arvo of Object.values(tarkka)) {
      if (ArrayBuffer.isView(arvo)) siirto.push(arvo.buffer);
    }
    self.postMessage({ kentat: { aika: kentat.aika, virta: kentat.virta }, tarkka }, siirto);
  } catch (virhe) {
    self.postMessage({ virhe: String(virhe?.message ?? virhe) });
  }
};
