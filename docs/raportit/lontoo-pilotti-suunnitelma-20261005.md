# Lontoo-pilotti Cesium ion Communityllä: tutkimussuunnitelma (Karttaseppä + Linssiseppä 2, 5.10.2026)

Omistajan päätös (kortti 5.10. ~10.45): pilotti ISS:n jälkeen Cesiumin striimidatalla, ilman Googlea, ilmaisella
Community-tasolla (alle 50 k$). Ensimmäinen pilotti on Lontoo. **Tutkitaan nyt; rakentaminen alkaa vasta, kun ISS-ohjaamo on junassa.**
Aiempi vertailu: `oikea-maailma-linsseihin-20261005.md`.

## 1. ion-assetit ja ehdot (haettu 5.10.2026)

| Asset | ion-id | Käyttö | Ehdot ja huomiot |
|---|---|---|---|
| Cesium World Terrain | 1 | maasto | data-attribuutio näkyviin (Cesium tekee oletuksena); ei välimuistia pidempään kuin assetin otsakkeet sallivat |
| Cesium OSM Buildings | 96188 | rakennukset (LOD1, noin 350 milj.) | "© OpenStreetMap contributors" (ODbL); sama välimuistisääntö |
| Bing Maps Aerial | 2 | **EI käytetä** | kielto yhdistää muihin kuin Bing-karttoihin (sama ongelma kuin Googlella, koska meillä on oma kartta); Community 1 000 kuvaistuntoa/kk yhteensä; Bing poistuu käytöstä (ion lupasi pääsyn "at least through September 2026") |
| Google Photorealistic | — | **EI käytetä** | omistajan päätös 23.9. ja 5.10. |
| **Kuva maahan** | oma | **oma S2-Eurooppa-pyramidi** (UrlTemplate-overlay ämpäristä) | Copernicus, ei kiintiötä eikä yhdistämiskieltoa. 10 m:n resoluutio riittää 500–1 500 m:n lentokorkeudelle. Rakennukset sävytetään pelin tyyliin (AIKA-sääntö: kartta on nykyaikaa, estetiikka vanhaa), joten ilmakuvaa ei tarvita. |

Lähteet: [Content Usage and Attribution Guide](https://cesium.com/learn/ion/content-usage-and-attribution-guide/),
[ion pricing](https://cesium.com/platform/cesium-ion/pricing/), [terms-for-google](https://cesium.com/legal/terms-for-google/).
Avoin (**EPÄVARMA**): Environment Agencyn ilmakuvien lisenssi (OGL?) mahdollisena tarkempana maakuvana. Selvitetään vain, jos S2 ei riitä.

## 2. Community-rajat ja ylitys

- **Käyttöehto (korjattu 11.0x, Linssiseppä):** Community = "Personal and non-commercial use" + "Exploratory commercial … development". Pilotti kuuluu tähän, mutta julkaisu ei: julkaisussa rakennukset tulevat omasta ämpäristä (OSM → LOD1), ja varapolusta tulee todennäköisesti pääpolku. Omistajan linja (10.45): Community toistaiseksi, arvioidaan uudelleen ennen avointa julkaisua.
- **World Terrain jätetään pois (Linssiseppä):** oma GLO-30-maasto riittää tasaiseen Lontooseen. ionista käytetään vain OSM Buildingsia (96188).
- **Lontoon kuva:** s2-eurooppa/v1 päättyy z10:een (~95 m/px Lontoossa). Tarvitaan oma Lontoo-S2 z11–13 natiivista 10 m:stä (ks. kohta 6).

- 15 Gt striimausta/kk (sisältääkö World Terrainin ja OSM Buildingsin: **EPÄVARMA**, mitataan ion-tilin käyttösivulta pilotissa).
- **Ylitys:** "Once over quota, your account will continue to work without interruption". Cesium ottaa yhteyttä sähköpostilla
  ennen jäädytystä ([quotas](https://cesium.com/docs/tutorials/optimizing-quotas)). Pilotille riittää.
- **Mitoitusarvio (EPÄVARMA, mitataan):** yksi Lontoo-lento noin 30–80 Mt → 15 Gt riittää noin 200–500 kylmään lentoon kuussa.
  Cesium Nativen laitevälimuisti (Cache-Control) pienentää toistolentoja.
- **Julkaisuvaiheen riski:** kun pelaajia on paljon, raja ylittyy. Varapolku on valmiina: samat Cesium-komponentit, mutta
  maasto (GLO-30) ja LOD1-rakennukset (OSM) omasta ämpäristä. Vaihto on URL-muutos, ei uudelleenrakennus.

## 3. Access tokenin käsittely (LS2:n täsmennys 5.10.)

- **Yksi token, vain luku** (`assets:read`) ja **rajattu assetteihin 1 ja 96188**. Ei geokoodausta, ei listausoikeutta.
- **Ei repoon, ei käännökseen:** CesiumIonServer-assetin tokenkentät ovat nyt tyhjiä, ja ne pidetään tyhjinä. Natiivi käännetään Macilla
  (proto-kaanna.sh), ei CI:ssä. Siksi sovellus hakee tokenin ajossa ämpäristä (pieni json) ja asettaa sen C#:sta
  (`Cesium3DTileset.ionAccessToken`). Kierrätys on uusi json ilman käännöstä. Ei lokiin eikä konsoliin.
- Ajossa haettu token on aina luettavissa. Siksi rajaus assetteihin ja vain lukuoikeus ovat varsinainen suoja; väärinkäytössä token
  kierrätetään ionin hallinnasta.

## 4. Lontoon lentorata (6–8 kohdetta, noin 3–4 min)

Ehdotus. Kaanon ja tekstit ovat Fablen; kytkös vuoden 1873 matkaan: Fogg lähtee Reform Clubilta ja Charing Crossilta.

1. Greenwich, Royal Observatory ja nollameridiaani (alku, korkealta jokilaaksoon)
2. Tower of London ja Tower Bridge (silta valmistui 1894: "isoisä ei vielä nähnyt tätä")
3. St Paul's Cathedral (kupoli, kiertävä kamera)
4. Thames länteen: Somerset House ja Embankment (rakennettu 1860-luvulla, uutta 1873)
5. Charing Cross -asema (Foggin lähtöpaikka)
6. Reform Club, Pall Mall (vedonlyönti)
7. Westminster: parlamenttitalo, Big Ben ja Westminster Abbey
8. Loppu: Buckingham Palace tai London Eye nousevalla kameralla

**Natiivi (LS2):** Lontoon tilesetit samaan CesiumGeoreferenceen kuin pallo. Lennon ajaksi origo siirretään Lontooseen
(float-tarkkuus), ja kamera päivitetään ennen Cesiumia (kuten KyydinKameraEnnen). Seuraavan kohteen laatat ladataan etukäteen
hitaalla lähestymisellä tai pysähdyksellä, ja reikiä vastaan käytetään asetuksia forbidHoles ja preloadAncestors.

Tunnusrakennukset 2, 3 ja 7 tulevat tarkempina omina malleina, jos ne tehdään (Mallinseppä/Linnanrakentaja). Muuten
OSM Buildingsin massat.

**Kertoja:** koko teksti yhtenä ElevenLabs-generointina (William, eleven_v4, yksi otto, muistisääntö). Kohdemerkit
kohdistusaikaleimoista ohjaavat kameran avainkehyksiä: lähestyminen 6–10 s, kiertely tai pysähdys kertojan ajan (2–4 lausetta),
kohteen nimi ruudulle. Esitysmoottorin aikajana ja kamerakoreografia (linssikatalogi) ovat runko.

## 5. iOS-mittaus

- **Laite:** iPad 00008103 (omistajan lupa iPad-testeille), ABAB-parit, lämpö huomioiden. Lisäksi simulaattori vain toimivuuteen.
- **Mitattavat:**
  - fps (tavoite 60, alaraja 30 lennon aikana)
  - muistihuippu (Cesiumin välimuistikatto säädetään)
  - ladatut tavut per lento kylmänä ja lämpimänä (lokitetaan pyyntöjen koot, ei tokenia)
  - ensimmäisen kuvan aika
- Tulos: taulukko ja kuvapari (omistajan kuvat rajattuna, kulma ja versio kuvaan) Päätoimittajalle.

## 6. Työnjako ja järjestys (rakentaminen ISS-ohjaamon junan jälkeen)

| Erä | Rooli |
|---|---|
| S2-overlay Lontooseen (onko s2-eurooppa/v1 riittävä Lontoon kohdalla, kuvapari) | Karttaseppä (voidaan tutkia jo nyt) |
| Token-putki (.gitignore, ympäristömuuttuja, ajonaikainen asetus), World Terrain + OSM Buildings -tilesetit | Linssiseppä 2 |
| Lentorata, kertojan synkka, attribuutiot ruudulle | Linssiseppä 2 |
| Kertojateksti ja ääni | Fable + Sisältökirjuri |
| Mittaus | LS2 + Laitetestaaja |

## 7. Omistajan toimet (vasta kun rakentaminen alkaa)

1. Luo Cesium ion -tili (Community, ilmainen) osoitteessa https://ion.cesium.com/signup.
2. Luo tilillä Access Tokens → Create token:
   - nimi `matkakirja-lontoo-pilotti`
   - scope vain `assets:read`
   - "Resources": valitse vain assetit **1 (Cesium World Terrain)** ja **96188 (Cesium OSM Buildings)**
3. Lisää token avaintiedostoon `~/.matkakirja-avaimet-koodaus.zsh` riville `export CESIUM_ION_TOKEN=...`; Karttaseppä tai
   Julkaisija tekee siitä ämpäriin tokenin jsonin, jonka natiivi hakee. Tokenia ei lähetetä chattiin.
4. Lupa iPad-mittaukseen (00008103) jokaista testikertaa varten.

## 8. Julkaisun oma rakennusputki (OSM → 3D Tiles, ODbL) — työarvio (Päätoimittajan tilaus 5.10. 11.1x)

Pilotti käyttää ionin OSM Buildingsia (kokeilukäyttö). Julkaisuun rakennukset tehdään itse ja isännöidään omassa ämpärissä.
Natiivissa vaihto on vain tilesetin URL.

| Vaihe | Sisältö | Arvio |
|---|---|---|
| 1. Pohjat ja korkeudet | Geofabrikin OSM-ote (ODbL), rakennuspolygonit. Korkeus järjestyksessä: `height` → `building:levels` × 3 m + katto → tyyppikohtainen oletus. Lontoossa lisäksi Environment Agencyn LIDAR (OGL v3, nDSM = DSM − DTM, mediaani pohjan sisällä), jolloin korkeudet ovat oikeat myös ilman tageja. | 2 erää |
| 2. 3D Tiles -kirjoitin | Oma Node-skripti: earcut-kolmiointi, puristus LOD1-massoiksi, glb (meshopt-pakkaus), 3D Tiles 1.1 quadtree, geometricError tasoittain. Kaukotasoille korttelikohtaiset yhdistetyt massat. Sävy pelin tyyliin varjostimessa, ei tekstuureja. | 2–3 erää |
| 3. Tarkistus ja vienti | 3d-tiles-validator (Apache 2.0), kuvapari ionin OSM Buildingsiin, vienti omistajan Run-rivillä (aws s3 sync, paljon tiedostoja) uuteen polkuun `rakennukset/lontoo/v1/` | 1 erä |
| 4. ODbL | LAHTEET.md, "© OpenStreetMap contributors" ruudulle. Rakennuslaatat ovat johdettu tietokanta, joten ne tarjotaan ODbL:llä (pelin muu sisältö ei kuulu tähän). | 0,5 erää |
| Natiivi | ion-tilesetin vaihto omaan URL:iin, attribuutio | LS2, 0,5 erää |

**Yhteensä noin 6 erää Karttasepälle (noin viikko) ja seuraavat kaupungit noin 0,5 erää kukin** (sama putki; LIDARin
saatavuus vaihtelee maittain: NL 3D BAG ja Helsinki LOD2 suoraan, Suomessa MML:n laserkeilaus).

**Koko (EPÄVARMA, mitataan vaiheessa 2):** Lontoon reitin ydin (noin 270 km², arviolta 0,5–1 milj. rakennusta)
noin 0,5 Gt ja koko Suur-Lontoo 1–2 Gt ämpärissä. Laitteelle striimataan vain näkymän laatat (arviolta 30–80 Mt per
lento). Koko Euroopan rakennukset (yli 250 milj.) eivät ole järkevä kohde, joten edetään kaupunki kerrallaan.

**Asennukset:** ei tarvita, jos kirjoitin tehdään Nodella. PBF-lukija ja earcut tulevat npm-paketteina työkansioon
(lisenssit tarkistetaan). PostGIS/pg2b3dm olisi vaihtoehto, mutta se vaatisi asennuksen.
