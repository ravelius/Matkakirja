/*
 * Uutislähteet maittain (omistajan toive 5.8.2026): lehden
 * maaosastossa näkyy muutama ajankohtainen uutisotsikko paikallisella
 * kielellä. Otsikoita EI lyhennetä eikä mukailla — ne ovat aitoa
 * paikallista mediaa sellaisenaan.
 *
 * Selain ei voi hakea RSS-syötteitä suoraan (CORS), joten haku kulkee
 * pienen Cloudflare Worker -välityksen kautta. Workerin lähdekoodi ja
 * käyttöönotto-ohje: tools/uutisproxy/. Kun omistaja on ottanut
 * workerin käyttöön, sen osoite kirjoitetaan UUTISPROXY-vakioon —
 * siihen asti uutisosio pysyy piilossa eikä peli yritä hakuja.
 *
 * Rakenne per maa (avain = ISO-3, sama kuin map.cityCountry):
 *   nimi  — lähteen nimi lähderiville
 *   kieli — syötteen kieli (MyMemory-käännöksen lähdekieli)
 *   syote — RSS-syötteen osoite (lisää myös workerin sallittujen
 *           listaan, tools/uutisproxy/worker.js)
 */
// Omistajan worker, otettu käyttöön 5.8.2026 (ks. tools/uutisproxy/).
// HUOM: https://-alku on pakollinen — ilman sitä selain tulkitsisi
// osoitteen suhteelliseksi poluksi pelin omalle sivustolle.
export const UUTISPROXY = 'https://matkakirja-uutiset.samireivinen.workers.dev';

export const UUTISLAHTEET = {
  // BBC:n syöte ja artikkelisivut aukeavat workerin läpi ongelmitta
  // (testattu 6.8.2026: <article> jäsentyy, og:image löytyy).
  GBR: {
    nimi: 'BBC News',
    kieli: 'en',
    syote: 'https://feeds.bbci.co.uk/news/rss.xml',
  },
  // Youm7 (اليوم السابع) on Egyptin luetuimpia uutissivustoja.
  // Al-Ahramin syötteet ovat botti-eston takana (testattu 5.8.2026),
  // Youm7:n RSS ja artikkelisivut aukeavat workerin läpi ongelmitta.
  EGY: {
    nimi: 'Youm7',
    kieli: 'ar',
    syote: 'https://www.youm7.com/rss/SectionRss?SectionID=65',
  },
  ITA: {
    nimi: 'ANSA',
    kieli: 'it',
    syote: 'https://www.ansa.it/sito/ansait_rss.xml',
  },
  /*
   * 20minutos on Espanjan luetuimpia uutissivustoja ja ilmainen.
   *
   * El País kokeiltiin ensin (omistajan ehdotus): SYÖTE aukeaa, mutta
   * ARTIKKELISIVUT palauttavat 403 botti-estosta (testattu 6.8.2026),
   * jolloin popupiin jäisi vain syötteen parin lauseen kuvaus. RTVE:n
   * syötteen linkit osoittavat vanhentuneisiin osoitteisiin, jotka
   * sekin palauttaa 403:na. 20minutoksen syöte (190 juttua) ja
   * artikkelisivut aukeavat molemmat: <article> jäsentyy, leipäteksti
   * poimiutuu ja og:image löytyy.
   */
  ESP: {
    nimi: '20minutos',
    kieli: 'es',
    syote: 'https://www.20minutos.es/rss/',
  },
  /*
   * SVT on Ruotsin yleisradio ja maan luetuimpia uutissivustoja.
   * Testattu 7.8.2026 (UA matkakirja-uutisvalitys/1.0): syöte antaa
   * sata juttua ja artikkelisivulta jäsentyy <article> sekä
   * og:image, eli popup saa koko leipätekstin.
   *
   * Sveriges Radion Ekot kokeiltiin ensin (omistajan ehdotus), mutta
   * api.sr.se palauttaa ATOM-syötteen (<entry>), ja peli lukee RSS:n
   * <item>-alkioita — syötteestä ei siis irtoaisi yhtään otsikkoa
   * ilman koodimuutosta. Aftonbladetin RSS ja artikkelisivut
   * läpäisivät molemmat testit; yleisradio valittiin samalla
   * perusteella kuin Britanniassa BBC.
   *
   * HUOM: osoite www.svt.se/nyheter/rss.xml ohjaa osoitteeseen
   * www.svt.se/rss.xml. Tässä on ohjauksen päätepiste, koska worker
   * ei seuraa uudelleenohjauksia.
   */
  SWE: {
    nimi: 'SVT Nyheter',
    kieli: 'sv',
    syote: 'https://www.svt.se/rss.xml',
  },
  /*
   * tagesschau on Saksan yleisradion (ARD) uutissivusto ja maan
   * seuratuimpia lähteitä. Syöte JA artikkelisivut testattu 7.8.2026:
   * syötteessä 40 juttua, artikkelissa <article> jäsentyy (11 pitkää
   * kappaletta) ja og:image löytyy. Osoite on lopullinen kohde —
   * tagesschau.de/xml/rss2 ohjaa tänne 301:llä, ja suora osoite
   * säästää yhden hypyn workerissa.
   */
  DEU: {
    nimi: 'tagesschau',
    kieli: 'de',
    syote: 'https://www.tagesschau.de/infoservices/alle-meldungen-100~rss2.xml',
  },
};
