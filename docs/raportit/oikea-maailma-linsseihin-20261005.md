# Oikea maailma linsseihin: suositus (Karttaseppä + Linssiseppä 2, 5.10.2026)

Omistajan ehdotus 5.10. klo 10.29 Päätoimittajan kautta: Cesium for Unity, CityGen3D, Real World Terrain tai GeoCity Forge.
Rajaus: kiireetön, ei ostoja eikä asennuksia, vain Eurooppa. Linssiseppä 2 antoi natiivin nykytilan (kohdat 1–4 alla).

## Suositus (yksi)

**Ei uusia paketteja. Laajennetaan jo käytössä olevaa Cesium for Unity -pinoa omalla, itse isännöidyllä datalla ämpärissä:**

1. **Maasto:** Copernicus GLO-30 -korkeusmalli quantized-mesh-maastoksi Euroopalle (GLO-30 on jo ladattu koneelle 25.9.).
2. **Kuva:** oma S2-Eurooppa-pyramidi (s2-eurooppa/v1) maaston päälle rasterikerroksena.
3. **Rakennukset:** OSM-rakennukset LOD1-massoina (pohja × korkeus tai kerrosluku) 3D Tiles -muodossa, vain valituille kaupungeille.
   Pilotiksi yksi kaupunki.

Ei Googlen laattoja (omistajan päätös 23.9.: EU-ehdoissa 3D-laattoja ei ole, ja ehdoissa on kielto "with or near a non-Google Map").
Ei Cesium ionia: proto ja pallo toimivat jo ilman sitä.

## Googlen 3D-laatat Cesium ionin kautta suomalaiselta tililtä (Päätoimittajan tarkistus, haettu 5.10.2026)

- **Google suoraan:** EEA-laskutusosoitteella Photorealistic 3D Tiles "are not available" (403); sivu päivitetty 28.9.2026
  ([EEA Map Tiles](https://developers.google.com/maps/comms/eea/map-tiles)).
- **ionin kautta:** Googlen asiakas on Cesium (USA), ja ionin Google-ehdot ([terms-for-google](https://cesium.com/legal/terms-for-google/),
  päivitetty 20.8.2025) kieltävät vain Googlen "Prohibited Territories" -maat (Kiina, Krim, Kuuba, Donetsk, Iran, Luhansk,
  Pohjois-Korea, Syyria, Vietnam; [lista](https://cloud.google.com/maps-platform/terms/maps-prohibited-territories/)). EEA:ta ei ole
  listalla, eikä ionin hinnastossa ole EU-rajausta. Toimiiko suomalainen ion-tili käytännössä ja kattaako sopimus julkisen
  App Store -pelin EU:ssa: **EPÄVARMA**. Cesiumin henkilökunta ei ole vastannut asiaan foorumilla. Vaatii kirjallisen vastauksen Cesiumilta.
- **Ratkaiseva este on kuitenkin ehdoissa, ei saatavuudessa:** ionin Google-ehdot sanovat sanatarkasti
  *"You will not use the Google Maps Content with or near a non-Google map in Your Application"*. Matkakirjan ydin on oma
  pergamenttikartta ja oma S2-maailma samassa sovelluksessa. Lisäksi ehdoissa on välimuistikielto, Googlen logo ja attribuutiot
  näkyviin sekä kielto luoda Googlen datasta uutta sisältöä tai 3D-malleja.
- **ion Community** (korjattu 5.10. 11.0x): "Personal and non-commercial use". Kaupallinen käyttö on sallittu vain kokeiluna ("Exploratory commercial … development"), ja maksullinen tili vaaditaan joka tapauksessa, jos liikevaihto tai rahoitus ylittää 50 k$. Pilotti on kokeilua, mutta julkaisu vaatii maksullisen tilin tai oman isännöinnin. Apuraha voi ylittää rajan
  (tarkistettava). Muuten Commercial maksaa 149 $/kk ([hinnasto](https://cesium.com/platform/cesium-ion/pricing/)).
  Communityn rajat: 1 000 Google-juurilaattaa/kk, 15 Gt striimausta/kk.
- **Johtopäätös:** omistajan 23.9. päätös "Googlen 3D-laattoja ei käytetä" pätee yhä myös ionin kautta. Syy on
  "non-Google map" -ehto, ei EU-saatavuus.

## Vaihtoehdot Googlelle

| Vaihtoehto | Kattavuus | Lisenssi ja kulu | Arvio |
|---|---|---|---|
| Cesium OSM Buildings (ion) | koko maailma, LOD1 | ODbL + ion: kaupallinen vain maksullisella tai alle 50 k$ Communitylla, vain ionista striimattuna | toimii heti, mutta sitoo ioniin |
| Cesium World Terrain + kuvat (ion) | koko maailma | ion-ehdot, kuvat (Bing/Sentinel) omin ehdoin | ei tarvita: GLO-30 ja oma S2 ovat jo käytössä |
| **Oma data ämpärissä (suositus)** | Eurooppa | GLO-30, S2 ja OSM (ODbL), ei kuukausikulua | sama pino, ei sidosta palveluun |
| Avoimet kaupunkimallit (LOD2, katot muotoineen) | kaupunkikohtainen | esim. Alankomaat 3D BAG (CC BY 4.0, koko maa), Helsinki (CC BY 4.0), Wien (CC BY 4.0), Berliini (dl-de/zero), Hampuri ja NRW (avoin dl-de), Viro (Maa-amet) | **EPÄVARMA** (lisenssit tarkistetaan kohdekohtaisesti), paras laatu siellä missä on |
| Lontoo | ei avointa koko kaupungin LOD2-mallia | OSM-pohjat + Environment Agencyn LIDAR (OGL v3) korkeuksiin | LOD1 oikeilla korkeuksilla, tunnusrakennukset omina malleina |
| Olavinlinna/Savonlinna | MML laserkeilaus 5 p/m², korkeusmalli 2 m, ortokuva | CC BY 4.0 | erinomainen; linnan oma malli on jo Linnanrakentajalla |

## Omistajan idea: kaupunkilinssi + automaattinen lentoesittely + kertoja

Esitysmoottorin suunnitelmassa (linssikatalogi) on valmiina aikajana, kamerakoreografia ja kertoja aikaleimasynkalla, joten
lentoesittely on sen "paikka"-lava Cesiumin maaston päällä. **Ehdotus pilotiksi: Olavinlinna ensin, Lontoo toisena.**
Olavinlinnaan on jo linnan malli ja Suomen parhaat avoimet aineistot. Lontoo vaatii LOD1-korkeudet LIDARista ja useamman
tunnusrakennuksen mallin.

**Prototyypin työmäärä (Olavinlinna, noin 1–1,5 viikkoa rinnakkain):**

| Erä | Rooli | Arvio |
|---|---|---|
| Pilottialueen maasto (MML 2 m + GLO-30 ympärille) quantized-meshiksi + ortokuva/S2-overlay, vienti | Karttaseppä | 2 erää |
| OSM/MML-rakennukset LOD1 3D Tilesiksi pilottialueelle | Karttaseppä | 1 erä |
| Kameran lentorata (spline, 5–8 pysähdystä), kertojan synkka, linnan malli paikalleen | Linssiseppä 2 (+ Linnanrakentaja) | 3 erää |
| Kertojateksti (Fable) ja ääni (yksi otto, William) | Fable + Sisältökirjuri | 1 erä |
| Mittaus iPadilla (fps, muisti, lataus) ja kuvapari | LS2 + Laitetestaaja | 1 erä |

Lontoo jälkeenpäin: noin +1 viikko (LIDAR-korkeudet, 3–5 tunnusrakennusta, pidempi lentorata).
Tiliä (ion tai muu) ei tarvita kummassakaan.

## Mitä linssiä se palvelee

- **Ei ISS- eikä Cupola-linssiä** (LS2): 400 km:n korkeudelta ja 400 mm:n polttovälillä rakennukset jäävät alle pikselin. ISS-linssi saa
  maastosta vain korkeusvaikutelman viistonäkymiin, esimerkiksi Alpeille matalassa auringossa, ja sekin vasta, jos ISS-putki käyttää
  maastoa. Nyt ISS-kuva on oma S2-putkensa ilman 3D-geometriaa.
- **Kyllä matalan korkeuden näkymiin:** kaupunkilinssi (lintu- tai lennokkiperspektiivi), esitysmoottorin paikka-lava
  (katalogin E8/E9 "Cesiumin maasto"), kaupunkikohteen dioraama ja saapumislennon lähestyminen. Niissä maasto + S2 + LOD1-massat
  antavat "oikean paikan" tunnun, ja tunnusrakennukset tulevat omina malleinaan kuten nyt (kaupunkien 3D-maamerkit).

## Datalähteet ja lisenssit

| Aineisto | Lisenssi | Velvoite |
|---|---|---|
| Copernicus DEM GLO-30 | vapaa, myös kaupallinen (Copernicus/ESA) | attribuutio "produced using Copernicus WorldDEM-30 © DLR e.V. 2010-2014 and © Airbus Defence and Space GmbH 2014-2018 provided under COPERNICUS by the European Union and ESA" |
| Sentinel-2 (oma pyramidi) | Copernicus vapaa käyttö | "Contains modified Copernicus Sentinel data" (jo käytössä) |
| OpenStreetMap-rakennukset | ODbL 1.0 | "© OpenStreetMap contributors" näkyviin. **Share-alike:** julkisesti käytetty johdettu tietokanta (rakennuslaatat ämpärissä) tarjotaan ODbL:llä. Peliä tämä ei koske ("produced work"). |
| Cesium for Unity | Apache 2.0 | ei maksua, jo käytössä (1.25.1) |

Ostopaketit (ei suositella): CityGen3D, Real World Terrain ja GeoCity Forge ovat maksullisia Asset Store -työkaluja. Ne paistavat
editorissa paikallisen kohtauksen (OSM + korkeus + kuvalähde), mikä kasvattaa sovelluksen tai pakettien kokoa kohdetta kohden eikä
skaalaudu Eurooppaan. Niiden kuvalähteillä (esim. Bing, Mapbox, Google) on omat lisenssiehtonsa, eikä niitä tarvita, koska oma
S2 ja GLO-30 ovat jo käytössä. RWT:n Gaia-leimat sopisivat käsin tehtyyn maisemaan, eivät oikeaan Eurooppaan.

## Mobiilisuorituskyky ja koko (iOS)

- **Sovelluksen koko ei kasva:** kaikki striimataan ämpäristä (Cesium), eikä mitään paisteta sovellukseen. Natiivisepän kuittaus
  tarvitaan vain, jos jotain lisätään pakettiin.
- **Arviot (EPÄVARMA, mitataan pilotissa):**
  - Ämpärissä maasto Euroopalle tasolle z13–14 noin 20–40 Gt ja LOD1-rakennukset noin 50–200 Mt kaupunkia kohden (Draco-pakattuna).
  - Laitteelle yksi kaupunkikäynti noin 20–80 Mt latausta.
  - LOD1-massat ovat kevyitä (ei tekstuureja, sävy varjostimessa). Cesiumin muistikatto ja samanaikaiset lataukset säädetään
    URP-budjettiin. LS2 huomautti, että natiivit TilesetOptionsit eivät ole C#:sta saatavilla, joten säätö voi vaatia pienen
    natiivilaajennuksen. Tämä selvitetään pilotissa.
- **fps:** tavoite 60 nykyisillä laitteilla, mitataan iPadilla 00008103 ABAB-pareina.

## Sopivuus nykyiseen pinoon

- Pallo on jo Cesium3DTileset FromUrl omasta pyramidista (LS2, KarttaKerrokset.cs), joten maasto ja rakennukset ovat samaa
  mekanismia: uusi tileset ja rasterikerros, ei uutta moottoria.
- S2-pyramidi (XYZ) kelpaa rasterikerrokseksi sellaisenaan (UrlTemplate-overlay). Ei uutta poltoa kuvalle.
- Laattapyramidi ja pallo säilyvät ennallaan; uusi kerros näkyy vain matalan korkeuden linsseissä.
- **Vain Eurooppa:** sekä maasto että rakennukset rajataan s2-eurooppa/v1:n alueelle. ISS:n maailmanlaajuinen S2 ei muutu.

## Työmäärä (arvio, rooleittain)

| Erä | Rooli | Arvio |
|---|---|---|
| GLO-30 → quantized-mesh Eurooppa (avoin työkalu, esim. cesium-terrain-builder, Apache 2.0), poltto + vienti | Karttaseppä | 2–3 erää + noin 1–2 vrk konetta |
| OSM → LOD1 3D Tiles, pilottikaupunki (Geofabrik-ote, korkeus tageista, oletuskorkeus; esim. py3dtiles/pg2b3dm, avoimet) | Karttaseppä | 2–3 erää |
| Natiivi: maasto- ja rakennus-tileset + S2-overlay matalan korkeuden linssiin, attribuutiot, muistikatto | Linssiseppä 2 | 2–3 erää |
| Mittaus: fps, muisti ja lataus iPadilla, kuvapari | LS2 + Laitetestaaja | 1 erä |

Yhteensä noin 2 viikkoa rinnakkain. Karttasepän osuus alkaa vasta, kun nykyiset S2-työt (v2c, tropiikki, kaudet) ovat valmiit.

## Päätettävää (omistaja Päätoimittajan kautta)

1. Hyväksytäänkö linja "oma Cesium-data, ei ostoja"?
2. Pilotti: Olavinlinna (malli ja MML-aineisto valmiina), sitten Lontoo.
3. Hyväksytäänkö ODbL-share-alike rakennuslaatoille (laatat ODbL:llä, peli ei)?
