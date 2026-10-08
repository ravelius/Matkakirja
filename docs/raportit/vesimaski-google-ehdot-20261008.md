# Vesimaski Googlen 3D-laattojen päällä: ehdot (Karttaseppä, 8.10.2026)

Tilaaja Päätoimittaja (20.2x): voiko pallon kaupunkinäkymässä varjostaa Googlen Photorealistic 3D Tiles -laattojen vesipintaa
omalla vesimaskilla (ESA WorldCover 2021, CC BY 4.0)? **Omistaja päättää.** Tämä on tulkinta, ei juridinen neuvo.
Ehdot on luettu 8.10.2026. Lainausten sijaan kohdat on kerrottu omin sanoin pykäläviittein; tarkka sanamuoto on lähdelinkeissä.

## Vastaus lyhyesti

| Tapa | Ehtojen riski | Miksi |
|---|---|---|
| **B: oma vesimesh** (ESA/OSM-vesialueista, piirretään laattojen päälle) | **Pieni** | Googlen Map Tiles -käytännöt sallivat nimenomaan omien 3D-kohteiden piirtämisen 3D-laattojen päälle, kun kohteita ei ole johdettu laatoista. ESA-data ei ole Googlelta. |
| **A: rasterimaski Googlen pinnan varjostimessa** (LS2:n tekninen suosikki) | **Epäselvä, keskisuuri** | Google-sisällön muokkaus ja kielto käyttää palvelua "ei-Googlen kartan kanssa" (kohta 3.2.3(e)) voidaan tulkita kattamaan sen. Kumpaakaan ei ole määritelty varjostukselle. |
| **C: veden tunnistus laattojen omasta väristä varjostimessa** (PT:n vaihtoehto) | Pieni–keskisuuri | Ei ulkopuolista dataa, ja tunnistus on pelkkä ajonaikainen kuvasuodin kuten värisävytys. Toisaalta "konetulkinta" on kielletty muissa kuin visualisointikäytöissä, ja tämä on visualisointia. Laaturiski on suuri: tummat katot ja varjot näyttävät vedeltä. |

**Suositus:** B. Jos A halutaan, pyydetään ensin kirjallinen vahvistus Cesiumilta (olemme ion-asiakas) tai Googlelta.
Kaikissa tavoissa krediitteihin lisätään oma rivi, esim. "Vesi: ESA WorldCover 2021, CC BY 4.0", erillään Googlen krediiteistä.

## Mitkä ehdot koskevat meitä

Emme ole Googlen suora asiakas: laatat tulevat **Cesium ionin** kautta (ion-asset 2275207), joten sitovat ovat:
1. **Cesium ion Terms of Service, Appendix B-2 ja Schedule I** ("Terms for Google"), jotka siirtävät Googlen käyttörajoitukset meille.
2. **Googlen Map Tiles API -käytännöt** (Policies-sivu), joihin Cesiumin ohjeet viittaavat (krediitit, logo, hybridivisualisointi).
3. **Google Maps Platform Terms of Service, kohta 3.2**, johon Schedule I vastaa lähes sanasta sanaan.

## Kohdat ja tulkinta

### 1. Ei käyttöä ei-Googlen kartan kanssa (Google ToS 3.2.3(e); Cesium Schedule I ¶3(e))
- Sisältö: Google Maps -palveluja ei saa käyttää ei-Googlen kartan kanssa tai sen lähellä. Syyksi mainitaan laatuongelmat ja brändisekaannus.
  Esimerkit: Places-sisältö ei-Googlen kartalla, Street View ja ei-Googlen kartta samalla ruudulla, Google-kartan linkitys ei-Googlen karttasisältöön.
- "Ei-Googlen karttaa" ei ole määritelty. Map Tiles API kuuluu palveluluetteloon (Google Maps Core Services).
- **Tulkinta:**
  - A: ESA-pohjainen maski määrää, miltä Googlen pinta näyttää. Sitä voi pitää ei-Googlen karttatietona, joka on yhdistetty Google-sisältöön samassa kuvassa.
  - B: erillinen 3D-kohde, jota käsittelee kohta 3 (sallittu).
  - C: ei ulkopuolista karttaa lainkaan.

### 2. Ei muokkausta eikä johdannaisia (Google ToS 3.2.1(a); Cesium Appendix B-2 ¶2(a))
- Sisältö: palvelua tai Google Maps -sisältöä ei saa kopioida, muokata eikä tehdä siitä johdannaista. Googlen versio koskee sanamuodoltaan palvelua ja lähdekoodia; Cesiumin versio koskee suoraan Google Maps -sisältöä.
- Varjostusta, valaistusta ja jälkikäsittelyä ei mainita kummassakaan.
- **Tulkinta:** renderöintitehosteet ovat yleisesti hyväksyttyjä. CesiumJS, Cesium for Unreal ja Cesium for Unity piirtävät Googlen laatat omalla valaistuksellaan, ilmakehällään ja sumullaan, ja Cesium esittelee julkisesti FOX Sportsin työn, jossa laattojen päälle on lisätty omia pilviä ja vettä 3D-malleina.
  Ilmaperspektiivi, taivas, pilvet, pilvien varjot ja värisävytys (raportin kohdat 1–3, 8) ovat siksi samaa luokkaa kuin Cesiumin omat tehosteet. Pinnan värin korvaaminen paikoittain ulkoisen maskin mukaan (A) on lähempänä sisällön muokkausta.

### 3. Omat kohteet 3D-laattojen päällä (Map Tiles API -käytännöt, "Geodata overlays with Photorealistic 3D Tiles")
- Sisältö: omien 3D-kohteiden piirtäminen 3D-laattojen päälle on sallittu, kunhan kohteita ei ole johdettu laatoista käsin eikä koneellisesti (jäljentämällä, digitoimalla). Johdettu kohde on kielletty.
- Samassa osiossa vaaditaan, että hybridivisualisoinnissa käyttäjä pystyy erottamaan Googlen datan omasta (krediitit tai käyttöliittymä).
- **Tulkinta:** B (vesimesh ESA- tai OSM-datasta) on juuri tätä. Vesialueita ei saa johtaa Googlen laatoista, eikä sitä tehdä. C ei luo kohdetta eikä tallenna mitään, mutta tunnistaa vettä Googlen pikseleistä. Se ei ole kohde vaan suodin, joten tähän kohtaan se ei suoraan osu.

### 4. Ei sisällön luontia Google-sisällöstä (Google ToS 3.2.3(c); Schedule I ¶3(c)) ja ei muuta kuin visualisointia (Policies, välimuisti)
- Sisältö: Google-sisällöstä ei saa luoda uutta sisältöä (esim. jäljentää rakennuksia, tehdä maastomalleja). Käytännöt kieltävät muun kuin visualisoivan käytön, mukaan lukien kuva-analyysin, konetulkinnan ja kohteiden tunnistuksen.
- **Tulkinta:** C tunnistaa vettä pikselin väristä vain piirtäessä, eikä mitään tallenneta. Se on visualisointia, mutta lähellä "konetulkintaa". A ja B eivät käytä Googlen sisältöä lähteenä.

### 5. Välimuisti, krediitit ja alue
- **Välimuisti:** ei omaa tallennusta (vain HTTP-otsakkeiden mukainen). Koskee laattoja, ei meidän maskiamme.
- **Krediitit:** Googlen logo ja datakrediitit ruudulla (Cesiumin "Show Credits On Screen"), eikä niitä saa peittää. Oma krediittirivi erilleen (Policies: Third-party data attributions).
- **EEA:** Googlen EEA-ehdoissa (8.7.2025 alkaen, EEA-laskutusosoitteelliset Google-projektit) 3D-laatat eivät ole saatavilla (403). Cesium on Googlen asiakas EEA:n ulkopuolella, ja Cesiumin Google-ehdot koskevat Euroopassa vain henkilötietoja (¶5(b)).
  Riski on sama kuin raportissa 3d-google-laatat-eu-20260923.md: ehdollinen, eikä vesimaski muuta sitä.
- **Kielletyt alueet (¶3(g)):** sovellusta ei saa jakaa Googlen kieltämille alueille (luettelo ulkoinen). Ei liity vesimaskiin.

## Tekninen seuraus valinnasta

- **B (suositus):**
  - Vesimesh per kaupunkikohde ESA- tai OSM-vesialueista (sama ESA-aineisto kuin koeajossa, vektoroituna).
  - Piirretään vedenpinnan korkeuteen (geoidi + 0,5–1 m) syvyyspoikkeamalla. Googlen vesipinnan kohina peittyy.
  - Sillat ja laivat jäävät veden alle, jos ne ovat pinnan tasolla. Korjaus: meshiin aukko OSM-siltojen kohdalle, ja laivat jäävät pinnan alle (hyväksyttävä).
  - LS2:n arvio tarvitaan. Työmäärä noin +2 pv A:han verrattuna.
- **A:** valmis koeaineisto (Tukholma). Käyttöön vain kirjallisen vahvistuksen jälkeen.
- **C:** ei aineistoa, vain varjostin. Laatu kokeiltava: väärät osumat tummissa katoissa ja varjoissa.

## Lähteet (luettu 8.10.2026)

- [Google Maps Platform Terms of Service](https://cloud.google.com/maps-platform/terms) (viimeksi muutettu 26.8.2026): 3.2.1(a), 3.2.3(a)–(g), määritelmät "Google Maps Content" ja "Services"
- [Google Maps Platform -palveluluettelo](https://cloud.google.com/maps-platform/terms/maps-services) (Map Tiles API kuuluu Core Services -palveluihin)
- [Map Tiles API Policies](https://developers.google.com/maps/documentation/tile/policies): Geodata overlays with Photorealistic 3D Tiles, hybridivisualisointi, krediitit, välimuisti, EEA
- [Map Tiles API adjustments for EEA customers](https://developers.google.com/maps/comms/eea/map-tiles?hl=en)
- [Cesium: Terms for Google (Appendix B-2, Schedule I)](https://cesium.com/legal/terms-for-google/) (merkittävät päivitykset 20.8.2025) ·
  [Cesium ion Content Usage and Attribution Guide](https://cesium.com/learn/ion/content-usage-and-attribution-guide/) ·
  [Cesium ion Terms of Service](https://cesium.com/legal/terms-of-service/)
- [FOX Sports + Cesium (omat pilvet ja vesi Googlen laattojen päällä)](https://community.cesium.com/t/fox-sports-using-cesium-to-orient-and-immerse-football-fans/37315)
- docs/raportit/3d-google-laatat-eu-20260923.md, docs/raportit/pallo-unreal-vertailu-20261008.md
