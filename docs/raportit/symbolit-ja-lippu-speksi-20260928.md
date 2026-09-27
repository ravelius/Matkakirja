# 3D-symbolit ja maan lippu: koko, näkymisraja, perspektiivi ja väistö (Linssisepän speksi 28.9.2026)

*Omistajan toiveet 27.9.2026 klo 23.2x Fablen kautta (natiivi): 1) maan lippu pitää kokonsa maailmassa, 2) 3D-kategoriasymbolit
isommiksi, perspektiivin vaihto nopeammaksi ja näkyviin yhtä zoomtasoa kauempana. Fablen rajaukset: törmäykset nimiöihin ja
erikoismalleihin ilman välkyntää, kuvakortin sääntö (ei siirry, saa piiloutua) ja kolmiobudjetti.*

**Toteutus:** proto-haara `linssiseppa/symbolit-lippu` **cd4911b1**. Pohjana on juna/b13 508761e8 ja Natiivisepän haara
natiiviseppa/symbolit-erikoismalli d1cba402, koska väistö jakaa sen piilokanavan. Kartta-testit 349/349 (uusi
SymbolienVaistoTestit 7/7), unity-tarkistus 0 virhettä. Laitekuvat otetaan aamulla yötauon jälkeen (kohta 6).

## 1. Lippu maailman kokoisena (Lipputanko.cs)

- Tanko on 120 pt korkea saapumisnäkymän mittakaavassa (kartan kerroin 1) ja kasvaa kuin oikea esine: kertoimella 2 se on
  240 pt ja kertoimella 4 noin 480 pt. Loitonnettaessa se pienenee itsestään.
- **Katto on 50 % ruudun korkeudesta.** Tanko nousee jalasta ylös, joten ruudun keskellä seisova tanko ulottuu yläreunaan
  asti ja kangas pysyy näkyvissä. Ilman kattoa lähizoomissa näkyisi pelkkä tanko ja kangas jäisi ruudun ulkopuolelle.
- Piilotus Euroopan mittakaavassa (kerroin alle 0,55, löydös 176) on ennallaan, samoin perspektiivi, liehunta, suunta ja paikka.
- A/B samasta käännöksestä: `lipputanko maailma|ruutu` ja `lipputanko katto <osuus>`.

## 2. 3D-symbolit: näkymisraja, koko ja perspektiivi (Symbolimallit.cs, SymbolienVaisto.cs)

| | 1.0.33 | uusi |
|---|---|---|
| 3D näkyy (kartan kerroin) | 2,5 | **1,25** eli yksi zoomtaso aiemmin (pienissä maissa ≤ 0,9 × suurin kuten ennen) |
| Kategoriasymboli ja arkkityyppi | 22 → 40 pt (2,5 → 6, lineaarinen) | **30 → 54 pt** (1,25 → 6, sama kasvu joka zoomtasolla) |
| Erikoismalli | 1,5 × (22 → 40 pt) | sama 1,5 × (22 → 40 pt) uudella käyrällä; täysi 60 pt ennallaan, noin 1,1 × symbolia isompi |
| Tasot 2–3 | ennallaan | ennallaan (niitä on satoja, eikä toive koske niitä) |
| Perspektiivin täysi 55° | ruudun reunalla | **jo puolivälissä** keskeltä reunaan; keskellä yhä suoraan ylhäältä (omistaja 26.9.) |

- Symbolin koko kertoimittain: 1,25 → 30 pt, 2,5 → 40,6 pt, 5 → 51,2 pt ja 6 → 54 pt. Kertoimella 2,5 symboli on siis jo
  1.0.33:n täyden koon kokoinen.
- Perspektiivi: neljänneksen matkalla reunaan kallistus on 27,5° (ennen 5,7°), joten tasokuva vaihtuu 3D:ksi paljon
  nopeammin. Kameran kallistus häivyttää liioittelun kuten ennen (0 → 40°). Käyrä on yhteinen (LiioiteltuPerspektiivi); uusi
  ramppi on käytössä vain 3D-nostoilla, ja lippu ja elävät elementit käyttävät oletusta 1,0.

## 3. Väistö: kuvakortin sääntö (ei siirry, saa piiloutua)

Tason 1 3D-symboli ei koskaan siirry. Se väistyy näin tärkeysjärjestyksessä:

1. **Erikoismalli voittaa:** Natiivisepän sääntö on ennallaan (symboli piiloon ja merkki reunapisteenä, laatikkoleikkaus tulossa).
2. **Tärkeämpi symboli:** järjestys on löydetty ensin, sitten tunniste.
   - Jos jalka on tärkeämmän symbolin laatikossa, symboli piiloutuu ja merkki näkyy reunapisteenä kuten erikoismallin alla.
   - Jos laatikot ovat päällekkäin vähintään 25 % pienemmän alasta, symboli väistyy 2D-kuvamerkiksi.
3. **Kaupunkien pisteet ja nimet** (Nimikerros): jos symbolin ydin (70 % laatikosta) osuu niihin, symboli väistyy
   2D-kuvamerkiksi. Oma paikka ei väistätä: nimilaatikko, jonka lähin kohta on enintään 8 pt jalasta, kuuluu noston omaan
   kaupunkiin.

- **Ei välkyntää:** jo väistynyt tarkistetaan 10 % suuremmalla ytimellä, uusi vaihto tulee aikaisintaan 0,6 s edellisestä
  ja häivytys kestää 0,3 s (sama piilokanava kuin erikoismallin alla; suurempi voittaa). Nimiöt eivät riipu symboleista,
  joten silmukkaa ei synny.
- **Nostolla on aina merkki:** väistynyt symboli piirtyy 2D-kuvamerkkinä (OnMalli epätosi), ja nimiö ja napautus toimivat
  ennallaan.
- **Oma nimiö symbolin viereen** (NostotKartalla, Natiivi-UI): kun 3D näkyy, tason 1 merkin ruutu on symbolin levyinen.
  Nimiö sijoittuu silloin symbolin viereen eikä sen päälle, muiden nostojen nimiöt väistävät symbolia ja napautusala on
  symbolin kokoinen. Muiden merkkien peittoalue käyttää symbolin nykyistä kokoa.

## 4. Kolmiobudjetti

- Kategoriasymbolin budjetti on ennallaan: LOD0 enintään 800 ja LOD1 enintään 200. Tasolla 1 käytetään aina LOD0:aa.
- Tason 1 nostoja on 5–6 maata kohden (maastokohteet-*.js), joten aiempi kynnys tuo 3D:nä kerralla enintään noin
  6 × 800 = 4 800 kolmiota.
- Lisäksi erikoismallit ovat enintään 1 500 kolmiota kukin. Väistö vähentää näkyviä symboleita.
- Laitteella mitataan `symbolit tila` -rivillä (kolmiot, väistyneet ja syyt).

## 5. Tiedostot ja omistajat

- **Uudet (Linssiseppä):** SymbolienVaisto.cs (puhdas geometria, testit) ja Symbolimallit.Vaisto.cs.
- **Linssiseppä:** LiioiteltuPerspektiivi.cs, jossa valinnainen reuna-parametri; oletus on ennallaan.
- **Natiivisepän tiedostot, pienet muutokset katselmoitavaksi:**
  - Symbolimallit.cs (kynnys, koot, ramppi ja kutsut)
  - Symbolimallit.Tasot23.cs (vanha käyrä säilyy)
  - Symbolimallit.ErikoismallinAlla.cs (yhteinen piilo ja reunapiste)
  - Lipputanko.cs, NostoKerros.cs (SaapumisKorkeusM) ja Komennot.cs
- **Natiivi-UI:n NostotKartalla.cs, 2 kohtaa:** merkin ruutu ja peittoalue.
- **A/B samasta käännöksestä:**
  - `symbolit vanha 1|0` palauttaa kaikki 1.0.33:n arvot kerralla.
  - Arvot erikseen: `symbolit kynnys <k>`, `symbolit symkoko <a> <b>`, `symbolit ramppi <r>` ja `symbolit vaisto 0|1`.

## 6. Todennus aamulla (Karttasepän polton jälkeen)

1. Rivi Karttasepälle, sitten käännös: `kaanna-jono.sh sl linssiseppa/symbolit-lippu`.
2. Laiteajo: `APPNIMI=sl L=<kansio> VAIHEET=129 zsh proto-3d/tyokalut/linssiseppa-ajot/ajo-symbolit-koko.sh`.
   - Näkymä: Tšekki 49,75 N 14,6 E (Plzeň, Kutná Hora ja Krumlovin erikoismalli), kertoimet 1,25, 2,5 ja 5.
   - Ennen = `symbolit vanha 1` + `lipputanko ruutu`, jälkeen = `symbolit vanha 0` + `lipputanko maailma`.
   - Koelippu on näkymän keskellä, ja video näyttää zoomauksen kertoimesta 1 kertoimeen 6.
3. Koonti: `koosta_koko.py <kansio> proto-3d/lokit/mallinseppa-toimitus-20260928 "cd4911b1"`.
   - Kuvapari on laitteen ruutuna ennen | jälkeen yhdellä zoomilla, ja jokaisessa paneelissa on kerroin, kulma ja versio.
   - Lisäksi tulee yhteenvetokuva kolmesta zoomista.
4. Kuvat Fablelle, sitten merge-pyyntö Natiivisepälle ja tiedoksi Natiivi-UI:lle (NostotKartalla).
