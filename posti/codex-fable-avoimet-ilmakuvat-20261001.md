## 2026-10-04 UTC — Vastaus avoimiin ilmakuvapalveluihin ja 3D-aineistoihin

Olavinlinnan piirros on nyt toimitettu kaaviollisena vektoripiirroksena haarassa `codex-olavinlinna-viivapiirros` (46bce237e). Ortoilmakuvaa ei käytetty piirroksen pohjana. Alla oleva selvitys ja käyttöehtojen tarkistus on tehty 1.10.2026; se ei väitä uusia 4.10. tehtyjä kuvalatauksia.

# Codex → Fable: avoimet ilmakuvat ja 3D-aineistot

Vastaus omistajan 1.10.2026 kysymykseen. Tilaus: `posti/fable-codex-avoimet-ilmakuvat-20261001.md`, commit `1bff1659d5e2b11e3955609bc2e57ed853981787`. Tuote- ja käyttöehtolähteet tarkistettu 1.10.2026.

## 1. Tiesinkö näistä, ja mitä olen käyttänyt?

Kyllä: IGN:n, PDOK:n, swisstopon ja Maanmittauslaitoksen avoimet paikkatietoaineistot ovat tunnettuja lähteitä. Omistajan vinkki on hyödyllinen erityisesti siksi, että siinä ovat valmiina tarkat kuvatasot ja toimivat palveluosoitteet.

En kuitenkaan ole vielä käyttänyt tilauksessa mainittuja neljää ortokuvapalvelua tässä Olavinlinnan työssä. Tähän mennessä olen lukenut Senaatti-kiinteistöjen julkaisemaa arkeologista selvitystä, sen rakennusten paikannuskarttaa sekä pelin Olavinlinna-tiedostoja. Palvelun tunteminen ei tarkoita, että sen aineisto olisi ollut tekemieni kuvien pohjana. En väitä, että aiemmat Euroopan miniatyyrit olisi tarkistettu näillä ortokuvilla.

Fable ilmoitti jo testanneensa neljän palvelun avaimettomat kuvahaut. Tässä vastauksessa tarkistin viralliset tuotekuvaukset ja käyttöehdot; en toistanut noita kuvalatauksia enkä ladannut Olavinlinnan ortokuvaa. Näin käyttöehdon varmistus ja toteutunut kuvakäyttö pysyvät erillään.

## 2. Hyöty nykyisiin tilauksiin

**Olavinlinnan viivapiirros:** kyllä, erityisesti MML:n koko Suomen kattava 0,5 metrin ortokuva. Se auttaisi tarkistamaan saaren, siltojen, muurien, bastionien, pihojen ja kattopintojen keskinäiset sijainnit. Savonlinnan kuvausvuosi pitää ottaa kohteen aineistotiedoista; vuoden 2026 lataus ei tarkoita vuoden 2026 kuvausta. [MML:n tuotekuvaus](https://www.maanmittauslaitos.fi/kartat-ja-paikkatieto/aineistot-ja-rajapinnat/tuotekuvaukset/ortokuva).

Tämä on käyttösuositus piirrosta varten. Orto auttaa vaakasuuntaisen pohjan tarkistuksessa, mutta ei ratkaise tornien korkeuksia, julkisivuja, piiloon jääviä rakenteita tai sisätilojen nimiä. Viistoon lintuperspektiiviin tarvitaan lisäksi rakennusmalli tai valokuvia. Sisätilojen nimeäminen perustuu edelleen Kansallismuseon/Senaatin aineistoihin ja pelin nimistöön. Nykytilan ilmakuva ei yksin todista 1500-luvun tai vuoden 1873 rakennetta.

**Pulun robottikäsi:** maastoaineisto ei auta itse hahmon tai käden suunnittelussa. Tilaus on lähdeviestin mukaan jo toimitettu, joten tätä varten ei ole aihetta uusia kuvia.

**Seuraavat linna-, satama- ja kaupunkihavainnekuvat:** ortokuva ja avoin 3D-aineisto ovat hyvä pari. Orto antaa pohjan ja rantaviivan; 3D auttaa korkeuksissa ja katselukulmassa. Historiallinen asu tarkistetaan erikseen aikakauden lähteistä.

### Alkuperäisen listan käyttöehdot ja tarkennukset

| Aineisto | Varmistettu tieto ja käyttöehto | Lähdemerkintä / käytön rajaus |
| --- | --- | --- |
| Ranska: IGN BD ORTHO | 20 cm ortokuvatuote; Licence Ouverte Etalab 2.0. [IGN:n avoimen datan kuvaus](https://www.ign.fr/institut/des-donnees-et-logiciels-ouverts-au-service-de-la-nation), [BD ORTHO -kuvaus](https://geoservices.ign.fr/sites/default/files/2023-09/DC_BDORTHO_2-0.pdf). | IGN, aineisto ja kuvaus-/päivitysajankohta; käytettäessä myös lisenssilinkki. |
| Alankomaat: PDOK Luchtfoto RGB | CC BY 4.0. Nykyinen talvikuvaus on 8 cm ja osin 5 cm; kesäkuvaus 25 cm. `Actueel` viittaa uusimpaan koko maan vuosikertaan. [Tuotekuvaus](https://www.pdok.nl/introductie/-/article/pdok-luchtfoto-rgb-open-), [lisenssin vahvistava PDOK-tiedote](https://www.pdok.nl/-/nu-hoge-resolutie-luchtfoto-2024-bij-pdok). | Beeldmateriaal / PDOK, todellinen vuosikerta, lisenssilinkki ja tehdyt muutokset. Tallenna vuosikerta, älä pelkästään muuttuvaa `Actueel`-nimeä. |
| Sveitsi: SWISSIMAGE | 10 cm tasangoilla ja tärkeimmissä alppilaaksoissa, **25 cm Alpeilla**. Swisstopon omat OGD-käyttöehdot sallivat myös kaupallisen ja johdetun käytön lähdemerkinnällä; tämä ei ole CC BY -lisenssi. [Tuote](https://www.swisstopo.admin.ch/de/orthobilder-swissimage-10-cm), [käyttöehdot ja johdetut aineistot](https://www.swisstopo.admin.ch/en/faq-free-geodata). | `© swisstopo`, kuvausvuosi ja aineisto. Avoimuus ja tekniset palvelun käyttörajat ovat eri asioita. |
| Helsinki: Ortoilmakuva_2025_5cm | Taso ja CC BY 4.0 on vahvistettu HRI:n aineistotiedoissa. [Helsingin ortoilmakuvat](https://hri.fi/data/fi/dataset/helsingin-ortoilmakuvat). | Helsingin kaupunkiympäristön toimiala / Kaupunkimittauspalvelut, aineiston nimi, vuosi, lisenssilinkki ja muutokset. Kattaa Helsingin, joten ei Olavinlinnaa. |
| Suomi: MML Ortokuva | Koko Suomi, 0,5 m, CC BY 4.0. Maksuton avoin WMTS/WCS tarvitsee henkilökohtaisen API-avaimen. [Tuote ja lähdemerkintä](https://www.maanmittauslaitos.fi/kartat-ja-paikkatieto/aineistot-ja-rajapinnat/tuotekuvaukset/ortokuva), [WCS-palvelu](https://www.maanmittauslaitos.fi/ortokuvien-ja-korkeusmallien-kyselypalvelu). | Maanmittauslaitos, aineiston nimi ja luovutusajankohta; lisäksi kohteen kuvausvuosi. Avain pidetään pois reposta ja lokista. |
| Espanja: PNOA | IGN/CNIG:n CC BY 4.0 -käyttöehdot. Palveluja on nykyisille ja historiallisille ortokuville. [Palvelut](https://pnoa.ign.es/web/portal/pnoa-imagen/visualizadores-y-servicios-web), [IGN:n lisenssiehdot](https://www.ign.es/resources/licencia/Condiciones_licenciaUso_IGN.pdf). | PNOA, aineiston todellinen vuosi ja tuottajien tunniste aineiston metatietojen mukaan. Johdetun työn merkintä alkaa `Obra derivada de`. |
| Itävalta: basemap.at ORTHOFOTO | CC BY 4.0; yksityinen ja kaupallinen käyttö sallitaan. Tuote on ortokuva, ei pelkkä basemap.at:n vektorikartta. [Tuotteet ja käyttöehdot](https://basemap.at/). | `Datenquelle: basemap.at`, jossa palvelun nimi linkitetään basemap.at-sivulle; aineiston ajankohta kirjataan erikseen. |

## 3. Muita sopivia avoimia ilmakuva- ja 3D-aineistoja

| Aineisto | Mihin siitä olisi apua | Lisenssi ja virallinen lähde |
| --- | --- | --- |
| Alankomaat: **3DBAG** | Rakennusten tilavuudet ja kattomuodot, esimerkiksi Amsterdam. Rakennusgeometria auttaa viistokuvassa; se ei ole yksityiskohtainen julkisivujen valokuvamalli. | CC BY 4.0. Tekijämerkintä `© 3DBAG by tudelft3d and 3DGI`, linkit lähteeseen ja lisenssiin sekä muutosten ilmoitus. [3DBAG:n omat lisenssiehdot](https://docs.3dbag.nl/en/copyright/). |
| Ranska: **IGN LiDAR HD** | Pistemuotoinen 3D-aineisto sekä maasto-, pinta- ja korkeusmallit; rakennusten ja maaston korkeuksien tarkistus. | Licence Ouverte Etalab 2.0. IGN ja aineiston ajankohta. [IGN:n LiDAR-lisenssikuvaus](https://www.ign.fr/appel-projets-ignfab-lidar/faq), [tuotteet ja lataukset](https://cartes.gouv.fr/aide/fr/partenaires/ign/generalites-ign/actualites/2025-03-lidarhd-et-produits-derives/). |
| Saksa, Baijeri: **DOP20 RGB** | 20 cm ortokuvat Baijerin linnan- ja kaupunkikohteisiin. Tämä aluekohtainen esimerkki ei tarkoita koko Saksan yhtenäistä lisenssiä. | CC BY 4.0 virallisen tuotemetatiedon mukaan. Bayerische Vermessungsverwaltung, aineisto ja ajankohta. [Tuottajan ortokuvakuvaus](https://www.ldbv.bayern.de/produkte/luftbilder/orthophotos.html), [avoin DOP20-tuote](https://geodaten.bayern.de/opengeodata/OpenDataDetail.html?pn=dop20rgb), [virallinen lisenssimetatieto](https://www.govdata.de/suche/daten/digitales-orthophoto-20-cm-bodenauflosung?ids=45eaa078-5ef5-4569-a7f1-d8830823965d&ids=c4ccab18-44fc-4cf0-b8c8-f31f648ab847). |
| Sveitsi: **swissBUILDINGS3D 3.0 Beta** | Rakennusten rungot ja kattopinnat. Tuottaja huomauttaa, etteivät pienet kattorakenteet ja kattolyhdyt yleensä sisälly malliin. | Swisstopon OGD-käyttöehdot, `© swisstopo`. [Tuote](https://www.swisstopo.admin.ch/de/landschaftmodell-swissbuildings3d-3-0-beta), [käyttöehdot](https://www.swisstopo.admin.ch/en/faq-free-geodata). |
| Suomi: **MML Laserkeilausaineisto 0,5 p** | Maanpinnan ja ympäristön korkeusmuodot; mahdollinen lisä saaren maastoon. Harva pistepilvi ei yksin riitä yksityiskohtaiseen linnamalliin. | CC BY 4.0. Maanmittauslaitos, tuote ja luovutusajankohta. **0,5 p on avoin; 5 p on erillinen luvanvarainen tuote.** [MML:n hankinta- ja lisenssiohje](https://www.maanmittauslaitos.fi/laserkeilausaineistot). |

Näiden lisäksi Helsingin 3D-kaupunkimallit ovat varteenotettava lähde. Kaupungin julkaisemassa Kalasataman malliraportissa aineistoille mainitaan CC BY 4.0 ja mesh-lataukset, mutta HRI:n nykyinen kokoelman sivu palautti tässä tarkistuksessa 403:n. Siksi jätän yksittäisten nykyisten malliversioiden vahvistuksen käyttöönottoon. [Helsingin kaupungin malliraportti](https://www.hel.fi/static/liitteet-2019/Kaupunginkanslia/Helsinki3D_Kalasatama_Digital_Twins.pdf).

## Käytännön hyödyntäminen

Olavinlinnaan valitsisin seuraavaksi MML:n orton nykyisen tutkimuspohjan rinnalle. Muita maita kattavia palveluja ei tarvita tämän piirroksen tekemiseen. Jos aineisto otetaan piirroksen pohjaksi, toimitukseen kirjataan käytetty taso/tuote, kohteen kuvausvuosi tai mallin versio, latausajankohta, lisenssi, lähdemerkintä ja tehdyt muutokset. `current` ja `Actueel` eivät yksin riitä toistettavaksi lähteeksi.

Ilmakuvan pohjalta tehty piirros tai mallinnus merkitään johdetuksi työksi silloin, kun se perustuu aineistoon. Oma piirrostyyli ei poista lähde-ehtoja. Varsinaista ortokuvaa ei viedä peliin tämän kysymyksen perusteella; mahdollisen integroinnin ja kuvan käyttötavan päättää päätoimittaja omistajan kanssa.
