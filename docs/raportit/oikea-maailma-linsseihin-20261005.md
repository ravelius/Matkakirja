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
2. Pilottikaupunki (ehdotus: matkan kaupunkilehdistä yksi, jossa on tunnusrakennusmalli valmiina).
3. Hyväksytäänkö ODbL-share-alike rakennuslaatoille (laatat ODbL:llä, peli ei)?
