# Pelikoodari → Fable: nimiöt ruudun reunassa (20.9.2026)

Haara `pelikoodari-nimiot-reuna` (pohja origin/v1973-prep).

## Tehty: ruudun reuna on sovittelun este (elävät nimiöt)

- js/pallolauta/sovittelu.js: `reuna` (ruudun laatikko turva-alueineen)
  on kova ehto — lappu ei saa ylittää sitä. Järjestys: oma kylki →
  muut kyljet → pienet siirrot (6 px) → UUSI porras `reuna`: pienin
  reunan sisään vetävä siirto, enintään 24 px (alle napautussäteen) →
  lappu piiloon, ikoni jää.
- js/pallolauta/lauta.js `nostojenReuna(kotelo)`: 6 px reunavara +
  laitteen turva-alueet (css :root --turva-yla/-ala/-vasen/-oikea =
  env(safe-area-inset-*)) siltä osin kuin ne ulottuvat kotelon sisään.
- js/pallolauta/nostot.js: lukko (PAATOKSET 34 kohta 13 c) säilyy, mutta
  avaimeen kirjataan (a) laput, joiden lukittu asento ylittää reunan
  juuri nyt, ja (b) reunan takia käännetyt laput, joiden oma kylki on
  taas 24 px reunan sisällä (hystereesi) — vain silloin sovittelu
  ajetaan uudestaan. Käännetty lappu saa lähtökohdakseen datan kyljen,
  jotta se palaa; muut kantavat lukkonsa kuten ennen.
- tools/tarkista-nimio-reuna.mjs (Sisältökirjurin mittari) laajennettu
  zoomattuihin näkymiin: enintään 3 laudan kaupunkia per maa, kaksi
  zoomia (½ ja ¼ saapumisnäkymän leveydestä). `--ei-zoomia` mittaa vain
  saapumisnäkymän.

## Mittaukset

- Sisältökirjurin mittari, kaikki 32 maata, 4 ruutukokoa (480, 390,
  iPad pysty 820×1180, iPad vaaka 1180×820) + zoomit, 520 näkymää,
  8 441 nimiötä: **elävät ylitykset 0** (ennen 68 saapumisnäkymissä).
- **Poltetut ylitykset 240** (57 saapumisnäkymissä, loput zoomeissa).
  Ne EIVÄT ole tämän kerroksen korjattavissa: poltettu nimiö on laatan
  tekstuurissa (Raamattu KARTTANOSTOT POLTETAAN LAATTOIHIN; nostot.js
  POLTETTUA MUSTETTA EI VOI PIILOTTAA), sovittelu ei voi siirtää sitä.
  Omistajan esimerkit — Välimeri, Camarguen hevoset, Marseillen saippua,
  Cosquerin luola — ovat kaikki poltettuja (FRA puhelin: 3 löydöstä,
  kaikki poltettuja).
- savuke-pallo-nostolaput 6/6 (ensin 4/6: lukko syntyi kesken
  saapumisajon reunan takia käännetyillä kyljillä — paluusääntö
  korjasi). Testit 3765/0, uudet yksikkötestit tests/pallosovittelu.
- Ladonta: ladoHeti mediaani 2,2 ms (ennen 2,4 ms), 30 toistoa, Pariisi
  390 px — ei hidastumista.

## Fablen lisäys: rantaviiva ja meren nimiöt

- "Välimeri rantaviivan alla" ja "Camarguen hevoset leikkautuu": molemmat
  POLTETTUJA. Korostuskehä (3D-viiva) piirtyy laatan päälle, joten
  poltettu meren nimiö jää sen alle riippumatta tästä kerroksesta.
- Elävälle nimiölle rantaviivasääntö olisi tehtävissä (korostuskehän
  ruutupisteet esteinä), mutta se ei korjaa yhtään omistajan näkemistä
  tapauksista. EI tehty tässä erässä — päätös Fablelle:
  1. nostotason uudelleenpoltto (tools/tee-pallolaatat.mjs --nostot,
     R2-ajo, Karttaseppä): siirrä meren nimiöt merelle päin ja pois
     laatan/ruudun reunoilta polttovaiheessa — korjaa poltetut;
  2. tai kohdemaan nimiöt eläviksi (ei polteta), jolloin tämä sovittelu
     kattaa ne — arkkitehtuuripäätös, koskee suorituskykyä.

## Huomio mittarista

Zoomatuissa näkymissä moni pieni maa antaa "nimiöitä 0" (esim. Riika
×0,5): kohdemaan nostot piiloutuvat lähizoomissa tai kameran katto estää
zoomin — mittari ei erota näitä. Sisältökirjuri voi tarkentaa.
