# Sisätilat, vaihe 1 — mittapiirrosten QA

## Toimitus ja tarkka tila

Tilaukset #1718–1719: Yangxindianin ja Chuxiugongin pohja sekä neljä sisäseinää, yhteensä **10 piirrosta, kukin SVG- ja PNG-muodossa**. Nämä ovat mitoitettuja **katselmuspiirroksia**, joissa lähdemitat ja arvioitu geometria on erotettu. Ulkomittatarkistus on läpäisty; koko sisustusta ei väitetä mitatuksi rakennusinventoinniksi. Lavastajan mittakatselmusta ja PT:n kuittausta ei ole vielä saatu. 3D-mallinnusta, pelikytkentää tai julkaisua ei ole tehty.

Tilaus: `posti/lavastaja-codex-sisatilat-vaihe1-piirrokset-20261101.md`, commit `658a9f6edd8bbb2bbd7e21aacd4950e0fe2b489d`, Git-blob `2cbd4fdd3e2c00886891dbb3923677e07485d4b7`. Suunnitelma luettu mainin commitista `c9665438c66a1cfcca930c6eb67f9b8d00a5a4a6`, `docs/raportit/lavastaja-sisatilat-suunnitelma-20261101.md`, blob `74e4b9c529fdcd10aa3e073603ca8349563dd59f`.

## Oma mittatarkistus

| Kohde | Piirroksen ulkokehys, m | Live-OSM projektin akselikehyksessä, m | Piirros − OSM, m | ±0,2 m |
|---|---|---|---|---|
| Yangxindian | 36,000 × 15,600 | 35,93745 × 15,60311 | +0,06255 / −0,00311 | PASS |
| Chuxiugong | 26,800 × 13,200 | 26,73868 × 13,23575 | +0,06132 / −0,03575 | PASS |

OSM:n täydet way-solmut haettiin 1.11.2026. Yangxindian: way 40606461, versio 9; Chuxiugong: way 40631826, versio 5. Laskenta: paikallinen equirectangular-projektio, maapallon säde 6 371 008,8 m, kohteen keskileveysaste. Projektin vakiintunut akselikehys on `x = east*cos(2.03°) + north*sin(2.03°)`, `y = -east*sin(2.03°) + north*cos(2.03°)`. Ääriarvojen erot antavat taulukon mitat. **Valmiita piirroksia ei kierretty:** palatsin pohjoinen on ylös. Tämä tarkistaa tilauksen OSM-kehyksen; OSM ei mittaa yksittäisiä sisäpintoja.

SVG:n todellisesta ulkokehys-elementistä mitatut leveys ja syvyys täsmäävät taulukon piirroslukuihin. Yangxindianin länsikamarin, itäkäytävän ja Sanxitangin numeroarvot toteutuvat myös piirroksen huonerajoissa, eivät pelkästään JSONissa. Koko seinäpaksuuden läpäisevät aukot on tarkistettu. Kalusteet ovat ulkokehyksen sisällä.

## Mittakaava, tiedostot ja katselusuunnat

- Pohjat: 5000 × 3000 px, 100 px/m, SVG:n nimelliskoko 500 × 300 mm → **1:100**.
- Pohjois- ja eteläseinät: 5000 × 2300 px, 100 px/m → **1:100**.
- Itä- ja länsiseinät: 5000 × 2300 px, 200 px/m → **1:50**.
- Kaikki PNG:t ovat häviöttömiä RGB-kuvia, 254 ppi. SVG:t ovat puhdasta vektoria: ei upotettuja rasterikuvia, ulkoisia kuvalinkkejä tai katon pintaa. SVG:n metatiedot sisältävät mittakehyksen; `mitat.json` kokoaa geometria- ja lähdetiedot.
- Metriruudukko näkyy täyttöjen päällä. 5 metrin mittakaavajana on pohjissa ja pitkissä seinissä 500 px, päätyseinissä 1000 px. Tulostus 100 %:ssa ilman sivulle sovitusta.
- Suffixit: `p` = pohjoinen, `e` = etelä, `i` = itä, `l` = länsi. Katse on sisältä nimettyä seinää kohti. Pohjoisnäkymän vasen on länsi; etelänäkymän vasen itä; itänäkymän vasen pohjoinen; länsinäkymän vasen etelä. Peilaukset ja kalusteiden projektio käyttävät samoja pohjakoordinaatteja.
- Seinäkuvat ovat avattuja sisäseinäkoosteita ja lähellä seinää olevien kalusteiden profiileja, eivät valokuvamaisia kameranäkymiä. Väliseinien rajat esitetään viitteinä. Koristeellinen kuvio on omaa kaaviomaista viivapiirrosta.

## Lähdemitat ja avoimet sovitukset

**Yangxindian:** Palatsimuseon D1-lähde antaa etuhallille 36 × 12 m ja kolme rakennejännettä kumpaankin suuntaan. Se on eri mittarajaus kuin tilauksen 36 × 15,6 m OSM-kehys. Tässä katselmusehdotuksessa 12 metrin sali on asetettu pohjoisosaan ja 3,6 metrin erotus eteläiseksi kulkukaistaksi. D4-pohjissa näkyy eteläisiä ulokkeita, mutta niiden yhteyttä OSM-rajaan ei ole varmistettu. **Koko leveydeltä jatkuva 3,6 metrin veranta on [A]-sovitus, ei todettu rakennusosa.** Lavastajan on ratkaistava tämä rajaus ennen 3D:tä. Piirroksen eteläinen pihalta sisäänjuoksuovi on ehdotus; ulkopuolista kujaliitosta tai uusia sivuovia ei ole keksitty.

D2:n länsikamarin 10,15 × 11,50 m, 2,14 metrin itäkäytävä sekä eteläisen vyöhykkeen 5,15 m on säilytetty. D3:n Sanxitang on 2,10 × 6,00 m ja 2,10 m korkea. Näiden lähdemittojen täsmällinen mittausreferenssi (sisäpinta vai rakenneakseli) ei ole varmistunut: soveltaminen vapaan huonetilan kehykseen ja sijainnit ovat [A]. Huonejärjestystä on verrattu D4:n pohjiin. Meiwu ja varsinainen takahalli eivät kuulu tähän tilaukseen eikä niitä ole lisätty ulkokehyksen ulkopuolelle.

**Chuxiugong:** D5 vahvistaa viisi jännettä sekä huonejärjestyksen: keskussalin valtaistuin ja viisiosainen sermi, itäpuolen bambu-/lasiseinä, lännen magnolia-/lasiseinä, idän viiniköynnös-zhao ja läntinen makuukamari tuulisuojineen. Yksittäisiä jänneleveyksiä ei löytynyt. Ehdotettu nimellinen jako 5,2 + 5,2 + 6,0 + 5,2 + 5,2 m summautuu tilauksen 26,8 metriin; pilarit ovat päädyissä 0,4 m sisällä. Nämä luvut, väliseinien paikat, 2 metrin etuveranta sekä aukotus ovat [A], eivät Palatsimuseon mittauslukuja.

**Molemmat:** pylväiden halkaisijat, seinäpaksuudet, palkin alapinnan 5,4/5,0 m korkeudet, ovien/ikkunoiden mitat, kynnys 0,14 m, laattajako 0,60 m sekä kalusteiden mitat ja paikat ovat [A]. Menetelmät ovat `mitat.json`-tiedoston `estimateMethods`-kohdassa ja objektien viittauksissa. Ne perustuvat huoneeseen sovittamiseen, symmetriaan ja kulkutilaan; niitä ei väitetä perspektiivivalokuvasta mitatuiksi. 工程做法-teoksen numeerisia moduuleja ei käytetty ilman tarkistettua kohtaa. Varmistamattomia korkeuksia ei otettu OSM:n yleisestä rakennuskorkeustagista.

Museon nykyinen alkuperäisasetelmaa kuvaava näyttely ja valokuvat eivät yksin vahvista Puyi–Wanrong-kauden täsmällistä kalustusta. Puuttuvia seinämaalausten historiallisia aiheita ei esitetä tosiasioina: piirroksen viitteelliset maisemaviivat ja käärökentät ovat [A].

## Tutkimuslähteet ja lisenssit

1. [Yangxindian, Palatsimuseo — D1](https://www.dpm.org.cn/explore/building/236442.html).
2. [Länsikamarin tutkimus, Palatsimuseo 2023 — D2](https://img.dpm.org.cn/Uploads/File/2023/07/19/u64b75fda11a18.pdf), painetut sivut 123–124.
3. [Palatsimuseon luento 4.8.2022 — D3](https://www.dpm.org.cn/classify_detail/257945.html).
4. [Palatsimuseon tutkimus 2022 — D4](https://www.dpm.org.cn/Uploads/File/2022/01/14/u61e0e8410e833.pdf), painetut sivut 91–92, pohjat katsottu kuvina.
5. [Chuxiugong, Palatsimuseo — D5](https://www.dpm.org.cn/explore/building/236486.html).
6. [OSM way 40606461](https://www.openstreetmap.org/way/40606461) ja [way 40631826](https://www.openstreetmap.org/way/40631826), © OpenStreetMap contributors, [ODbL 1.0](https://www.openstreetmap.org/copyright). Käyttö mitta- ja koordinaattatietona.

Käytetyt Commons-valokuvat, tarkat tiedostonimet:

- **养心殿东暖阁.JPG**, Gisling, [tiedostosivu](https://commons.wikimedia.org/wiki/File:养心殿东暖阁.JPG), [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/). Itäkamarin kalustetyypit, puu-, metalli- ja värivaikutelma.
- **Cité interdite les chambres de la suite impériale (2).JPG**, Pierre André Leclercq, [tiedostosivu](https://commons.wikimedia.org/wiki/File:Cité_interdite_les_chambres_de_la_suite_impériale_(2).JPG), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Kang, ikkuna ja kalusteet.
- **Cité interdite les chambres de la suite impériale (3).JPG**, Pierre André Leclercq, [tiedostosivu](https://commons.wikimedia.org/wiki/File:Cité_interdite_les_chambres_de_la_suite_impériale_(3).JPG), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Lasinen väliseinä ja kalusteet.

Toimituksen viivapiirrokset ovat omaa tuotantoa. Valokuvia, PDF-pohjia tai niiden kuvapintoja ei ole kopioitu, jäljennetty vektoriksi eikä sisällytetty toimitukseen. Ulkoiset aineistot ovat mitta-, huonejärjestys- ja materiaalitutkimuksen lähteitä. Kuvista ei johdettu varmoiksi väitettyjä metrisuhteita. Lähdetutkimuksen paikalliset kopiot ja tarkistukset säilyvät tuotantokansiossa.

## Vastaanoton katselmuskohdat

Lavastaja tarkistaa erityisesti Yangxindianin ulkokehyksen ja salisyvyyden sovituksen, sisämittojen mittausreferenssit, pylväs- ja väliseinäjaon, aukot ja kujan reittiyhteyden, seinäkorkeudet sekä kalustuksen aikakauden. Arvion muuttaminen jälkikäteen on mahdollista yhteisestä `mitat.json`-geometriasta. Tämä katselmuspiste ei ole uusi tuotannon lupakysely omistajalle; se kuuluu tilauksen nimenomaiseen vastaanottoketjuun.
