# Yksityiskohdat etäisyyden mukaan: lähteet ja lisenssit (SK 17.11.2026, KK:lle ja PT:lle; omistaja P-261117-56)

Suunnitelma `20261117-yksityiskohdat-etaisyyden-mukaan` luvut 4, 9 ja 10 (SK-rivi). Vain luku ja docs; kuvia, koodia tai aineistoa ei ladattu eikä muutettu. Overpassia ei käytetty. Luku-päivä 17.11.2026. Apulaisen (Sonnet) lukemat; **pistokokein itse varmistetut** merkitty ✓.

## S0 ja S2A. Ilmakuvat (tarkistuskäyttö; kuvaa ei viedä peliin)
| Kaupunki | Lähde | Lisenssi (lähteen sivulta) | Kaupallinen | Nimeäminen | Tarkkuus | Tila |
|---|---|---|---|---|---|---|
| Pariisi / Ranska | IGN BD ORTHO ([data.gouv.fr](https://www.data.gouv.fr/datasets/bd-ortho-r)) ✓ | Licence Ouverte / Open Licence 2.0 | kyllä ("à des fins commerciales ou non", [Etalab-teksti](https://static.data.gouv.fr/resources/licence-ouverte-2-0/20260909-072646/etalab-licence-ouverte-v2.0.pdf)) | lähde + päivitysvuosi; aineistosivulla ei omaa tekstiä. Ehdotus (SK:n sovitus): "IGN, BD ORTHO®, mise à jour [vuosi]" | 20 cm | **sallittu** |
| Amsterdam / Alankomaat | PDOK Luchtfoto RGB ([pdok.nl](https://www.pdok.nl/introductie/-/article/pdok-luchtfoto-rgb-open-)) ✓ | CC BY 4.0 ("onder een CC-BY licentie", linkki 4.0-deediin) | kyllä ([pdok.nl/copyright](https://www.pdok.nl/copyright)) | sivu ei anna tekstiä, vain lisenssilinkin. Ehdotus: "Luchtfoto: Beeldmateriaal Nederland / Kadaster, CC BY 4.0" (sovitus; vanhoilta vuosilta WMTS:stä CC BY -merkintä saattoi puuttua: tarkista vuosi) | 25 cm (talvi 8 cm) | **sallittu** |
| Wien / Itävalta | Stadt Wien MA 41 Orthofoto ([wien.gv.at](https://www.wien.gv.at/stadtplanung/orthofoto-daten-beziehen)) ✓; myös basemap.at | CC BY 4.0 ("Creative Commons Namensnennung 4.0 International"); basemap.at: Open Government Data Österreich, CC BY 4.0, "any purpose, even commercially" | kyllä | **"Datenquelle: Stadt Wien - data.wien.gv.at"** ✓; basemap.at: "Data source: basemap.at" + linkki | 15 cm (basemap 29 cm) | **sallittu** |
| Lontoo / Britannia | Environment Agency Vertical Aerial Photography ([data.gov.uk](https://www.data.gov.uk/dataset/4921f8a1-d47e-458b-873b-2a489b1c8165/vertical-aerial-photography)) | "Open Government Licence" (viittaa v3.0); **ristiriita:** CKAN-peili sanoo "No Licence Provided"; OGL-tekstiä ei voitu lukea (403) | ei varmistettu | "© Environment Agency copyright and/or database right 2022. All rights reserved." | 10–50 cm | **epävarma**; Lontoon kattavuus ja vuodet lukematta; Bluesky ja Getmapping kaupallisia |
| Rooma / Italia | AGEA-ortokuva, Regione Lazion jakelu | Lazion katalogissa CC BY 4.0, mutta **AGEAn oma lisenssimalli 2022–2024 kieltää kaupallisen käytön** (art. 5), omistaja MASAF | **ei** (ristiriita) | ei saatavilla | n.d. | **ei käytetä**; Rooma Capitalelta ei avointa ortokuvaa |
| kaikki | Google Maps ja Earth; Bing, Esri, Mapbox | ehdot kieltävät jäljittämisen / lupa vain OSM:n muokkaukseen | ei | | | **ei käytetä** |

Tarkistuskäytölle ei yhdessäkään luetussa lähteessä ollut erillistä rajoitusta; sitä ei ole erikseen varmistettu. **Suositus:** ilmakuvavertailu vain Pariisille, Amsterdamille ja Wienille; Lontoo ja Rooma ilman ilmakuvaa (OSM + säännöt), kunnes lupa on selvitetty.

## S2B. Rakennusten ikä- ja rakennusvuosiaineisto
| Kaupunki | Aineisto | Kattavuus ja kenttä | Lisenssi | Käyttö | Tila |
|---|---|---|---|---|---|
| Amsterdam | BAG (Kadaster, [data.overheid.nl](https://data.overheid.nl/dataset/basisregistratie-adressen-en-gebouwen--bag-)) | koko NL, pand + bouwjaar | CC0 1.0 (Kadaster: Public Domain Mark 1.0; kumpikin sallivin) | kaupallinen ja ilman nimeämistä | **kyllä** |
| Pariisi | APUR Volume bâti ([geocatalogue.apur.org](https://geocatalogue.apur.org/catalogue/srv/api/records/urn:apur:emprise_batie_od)) | Pariisi, vuosi ja ajanjakso (ennen 1940: Loyerin 1970 suunnitelma) | ODbL | kaupallinen sallittu, **share-alike**: johdettu tietokanta julkaistava ODbL:llä | kyllä ehdoin |
| Pariisi | BDNB (CSTB, [data.gouv.fr](https://www.data.gouv.fr/datasets/base-de-donnees-nationale-des-batiments/)) | koko Ranska, "année de construction de référence" (taulu batiment_groupe_synthese_periode_construction) | Licence Ouverte 2.0 | kaupallinen, lähde + päivämäärä | **epävarma**: APUR sanoo MAJIC/DGFiP-vuosien olevan ei-avoimia; onko vuosi avoimessa osassa, ei varmistettu |
| Wien | Gebäudeinformation Wien (MA 19, OGD) | koko Wien, Baujahr/Bauperiode (vain haun mukaan) | yleensä CC BY 4.0, joillakin aineistoilla CC BY-NC 4.0 ([ogd-nutzungsbedingungen](https://digitales.wien.gv.at/open-data/ogd-nutzungsbedingungen/)) | | **epävarma**: aineistokohtainen lisenssi ja kenttä lukematta (data.gv.at-sivu ei auennut) |
| Lontoo | Colouring London / Britain ([colouringbritain.org](https://colouringbritain.org/data-extracts.html)) | crowdsourcattu, kattavuus lukematta | ODbL; "credit Colouring Cities and our contributors" | kaupallinen sallittu, share-alike | **epävarma** (jalanjälkien lähde/lisenssi epäselvä; tietosuojasopimus latauksessa) |
| Rooma | ISTAT sezione di censimento -muuttujat | vain sezione-taso, ei per rakennus; lisenssi CC BY 4.0 (note-legali) / 3.0 (open data -sivu) | | | **ei kelpaa** per rakennus; per-rakennus-aineistoa ei löytynyt |

**Seuraus talotyypeille (suunnitelma 4.2 kohta 2):** avoin ikäaineisto on käytettävissä Amsterdamille (BAG, vapaa) ja Pariisille APURilla vain, jos ODbL-jako hyväksytään; muilla kolmella käytetään sääntöjä 3 ja 4 (mitat, tunniste).

## S3. OSM:n nimeäminen näkyy pelissä
- **Natiivi** (julkaisija/juna-224, kärki 60a552702): `UI/Tietoja.cs` r. 166–172: "© OpenMapTiles © OpenStreetMap -tekijät (data OpenFreeMapista)", ODbL; kaupunkien 3D-talot: "© OpenStreetMap contributors; Pariisin korkeudet: IGN (BD TOPO®)", "ODbL, Licence Ouverte 2.0"; `ui.fi.json` r. 13–14 (`ui.krediitit.osm`, kartalla) ja r. 107 (`ui.opas.lahde.rakennukset`). **Verkko:** `js/lahteet.js` r. 447–452 ja `index.html` r. 364 (`en/index.html` r. 363).
- OSMF:n ohje ([Attribution Guidelines](https://osmfoundation.org/wiki/Licence/Attribution_Guidelines), luettu 17.11.) ✓: nimi "OpenStreetMap" ja maininta ODbL:stä; linkki openstreetmap.org/copyright riittää; pelissä krediittisivu tai valikko kelpaa. Tuotettu teos vaatii nimeämisen; teos, joka pitkälti uusii OSM-dataa, on johdettu tietokanta ja ODbL-jakoa vaativa.
- **Aukko 1:** uusi OSM-ympäristöaineisto (penkit, lyhdyt, pinnat; suunnitelma 9.1) ei ole omana rivinään. Kun K2-työkalu on junassa: Tietoja-rivi "© OpenStreetMap contributors (ODbL)" ja maininta "ympäristön kalusteet ja pinnat".
- **Aukko 2 (päätettävä, PT):** ämpäriin vietävä `ymparisto/<kohde>.json` on johdettu tietokanta. ODbL-jako vaatii, että aineisto on tarjolla ODbL-ehdoin (esim. julkinen latauslinkki krediittisivulla). Sama koskee APUR- ja Colouring London -aineistoja, jos ne otetaan käyttöön.

## Lukematta jääneet (apulaisen lista)
IGN:n oma nimeämisteksti; OGL v3 -teksti (403); Defra-aineistosivu; PDOK:n oma Luchtfoto-lisenssisivu (404); data.gv.at Gebäudeinformation; BDNB mentions légales ja `annee_construction`; ISTAT-muuttujien kuvaus; Roma Capitalen ja Lazion SITR:n oma lisenssi.

## S1. Talotyyppien lähteet (Pariisi, Amsterdam; kortti L/luonnos/kortit.mjs)
Päälähteet. Pariisi: APURin neljä tyyppitaulukkoa [1801–1850](https://www.apur.org/sites/default/files/documents/APAPU240_02.pdf), [1851–1914](https://www.apur.org/sites/default/files/documents/APAPU240_03.pdf), [1918–1939](https://www.apur.org/sites/default/files/documents/APAPU240_04.pdf), [1945–1974](https://www.apur.org/sites/default/files/documents/APAPU240_05.pdf) (sivut 6–8: kerrosluku R+n+C, katto, materiaali) ja [APUR:n rakennusten ikäjakauma](https://www.apur.org/en/open-data-maps/map-library/dating-parisian-buildings) ✓ (ennen 1800 alle 9 %, 1801–1850 14 %, 1851–1914 45 %, 1915–1939 8 %, 1945–1990 15 %). Amsterdam: virallisia lähteitä vähän; RCE:n termikanta ([klokgevel](https://kennis.cultureelerfgoed.nl/index.php/Begrip:Bd4a30f9-ae0c-4f8c-9e63-46751f8676d5), [halsgevel](https://kennis.cultureelerfgoed.nl/index.php/Begrip:469f892f-0d4e-4deb-9c5a-be33de5563a5)) antaa vain määritelmät; aikavälit yhdestä yleisteoksesta (*Kijk! Amsterdam!*, M. Bergen) ja matkailusivusta (amsterdamtourism.org), siis heikko lähde. Wikipedia-pohjaiset väitteet on merkitty (2.) = toissijainen.

### Pariisi
| Tyyppi | Täsmää | Ei täsmää tai ei lähdettä | Korjaus korttiin |
|---|---|---|---|
| Haussmannin kivitalo | Mansardi (sinkki/liuske) ✓, kivi ✓, parvekenauhat 2. ja 5. kerroksessa (tyypillinen piirre; mikään virallinen lähde ei sano pakolliseksi), 6 asuinkerrosta (R+5+C) ✓ | aika: Haussmannin oma kausi 1853–1870, APUR-tyyppi "haussmannilainen ja post-haussmannilainen" 1851–1914; leveys 15–24 m = arvio (APUR: tontin vähimmäisleveys 12 m); osuus 50 % (APUR 45 %); mitat (ikkuna, kerros, katutaso) ei lähdettä | kirjoita aika "1853–1870 + post-haussmannilainen 1914 asti"; osuus 0,45; alaraja 12 m; "tyypillinen" ei "säädetty"; mitat arvioiksi |
| Vanha rapattu talo | 1801–1850 ✓, 4–5 krs (R+4…R+5+C) ✓, rappaus ✓ (lisäksi hakattu kivi), luukut (persiennes) ✓, osuus 20 % ≈ 23 % (14 % + <9 %) ✓ | katto: harja pitkittäin ei lähteessä, mansardi yhtä yleinen; leveys 8–12 m ei lähdettä | katto arvotaan harjan ja mansardin välillä; leveys arvioksi |
| Tiilitalo 1900–1939 | paljas tiili ✓ (HBM), bow-windowit ja loggiat ✓ | **katto "tasa"** (lähteen mukaan kaksoiskaltevuus + ullakko, tasakatto vasta 1930-luvulla); 7 krs → R+5…R+6 eli [6,7]; osuus 12 % (APUR 8 % 1915–1939; 1900–1914 tiilitalot ovat jo 45 %:ssa); "1902 asetus → tiili" ei pidä (1902 sääti korkeuksia ja ulokkeita) | oletuskatto kaksoiskalteva; kerrokset [6,7]; aika "1894–1939 (HBM)"; osuus 0,08; lisää bow-window; poista 1902→tiili |
| Julkinen kivitalo | – | APUR kattaa vain asuinkerrostalot; aika, kerrosluku, leveys, osuus 8 % ei lähdettä | merkitse "kuvitteellinen tyyppi" tai poista luvut |
| Uudempi talo 1945– | 1945–1974 ✓, 7–8 krs (R+6…R+7) ✓, betonitasakatto ✓, balcons filants ✓ | osuus 10 % (APUR: 15 % + 3–4 % 2000-luvulta) | osuus 0,15–0,19 |
Pariisin osuudet ovat APUR:n lukuja koko rakennuskannasta, eivät kadunvarsijulkisivuja: niitä ei voi käyttää suoraan peliosuuksina.

### Amsterdam
| Tyyppi | Aika kortissa → lähteissä | Huomio |
|---|---|---|
| Trapgevel (porraspääty) | 1600–1665: täsmää (kaksi lähdettä) | leveys 5,5–7 m tukee (2.): tontit 18–26 jalkaa (5,1–7,3 m); kerrosluku ja osuus 10 % ei lähdettä |
| Halsgevel (kaulapääty) | 1640–1775 → "n. 1640–1780" (K!A 1640–1780, matkailusivu 1640–1770) | yksi porras, 90°:n kulmat, klauwstuk ✓ (RCE); osuus 20 % ei lähdettä |
| Klokgevel (kellopääty) | 1660–1790: täsmää (kaksi lähdettä) | kapea talo (RCE) tukee leveyttä; osuus 25 % ei lähdettä |
| Lijstgevel (listapääty) | 1700–1900 → ristiriita (K!A 1660–1775, matkailusivu 1700–1900) | kirjoita "n. 1660–1900 (rajat vaihtelevat)"; leveys 6,5–9 m (2.: Keizersgracht/Herengracht 30 jalkaa ≈ 8,5 m); osuus 35 % ei lähdettä |
| Pakhuis (varasto) | 1600–1850 → 1850 ilman lähdettä; "1600–1800" | tuitgevel ✓; ullakkoluukut ✓ (pyöreät tai suorat; kortin "kaari" yleistää); leveys 5–8 m (2.); kerrosluku ei lähdettä |
Kaikki Amsterdamin osuudet (10/20/25/35/10 %) ja kerrosluvut ovat arvauksia: merkitse arvioiksi tai poista. Leveys "4–6 m" ei löydy lähteestä; kortin 5,5–9 m on perusteltavissa.

### Mitä lähteistä ei saatu auki
Mérimée/POP, PLU ja Inventaire général (ei hakutuloksissa); APURin 50 ans -PDF (varmennevirhe); Amsterdam Monumenten ja BMA (ei suoria sivuja); UNESCO (403). Amsterdamin vuosiluvut kannattaa vahvistaa Rijksmonumentenregisteristä yksittäisiltä taloilta, jos niistä tulee pelitekstiä.

## Suositus kortille ennen peliin vientiä
Yksikään osuus-prosentti (paitsi Pariisin vanhan talon 20 % ≈ APUR) ei ole lähteistetty. Käytä suunnitelman sääntöjä 3 ja 4 (mitat, tunniste) osuuksien sijaan ja merkitse kortin luvut "arvio" kommentilla; korjaa tiilitalon katto ja kerrosluvut sekä Haussmannin osuus 0,45.
