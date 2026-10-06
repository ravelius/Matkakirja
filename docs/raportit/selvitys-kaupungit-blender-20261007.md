# Huonon 3D:n kaupungit itse Blenderillä: Tallinna ja Visby (selvitys + koe, 7.10.2026)

Linnanrakentaja (Opus, high) Päätoimittajalle. Omistajan linjaus 00.4x: huonon 3D:n kaupungit lisätään peliin, kun ne on
parannettu itse Blenderillä. Merkinnät: V = vahvistettu lähteestä, A = arvio. Liitteet (lähteet ja URLit):
selvitys-kaupungit-liite-viro-20261007.md ja selvitys-kaupungit-liite-ruotsi-20261007.md.

## Lyhyesti (suositus)

1. **Tallinna ensin.** Kaikki tarvittava data on avointa, ladattavissa ilman kirjautumista ja kaupallisesti käytettävissä:
   Maa- ja Ruumiametin LoD2-rakennukset koko Tallinnasta ja 10 cm ortokuva (lisenssi ≈ CC BY 4.0, V). Koe B (kuva alla)
   näyttää ilmasta jo selvästi oikealta vanhaltakaupungilta: oikeat kattomuodot, kattojen värit ja kattoikkunat.
   Arvio vanhankaupungin ytimelle (~1 km²) on **4–6 työpäivää**.
2. **Visby myöhemmin.** Ruotsista ei löydy avointa 3D-rakennusmallia. Lantmäterietin aineistot (CC BY 4.0) vaativat
   **omistajan Geotorget-tilin**, tuotetilauksen ja ortokuvissa sekä pistepilvessä GDPR-käyttöehdot. OSM on Visbyssä niukka:
   kattomuotoja on 0 %:lla rakennuksista. Arvio on **8–12 työpäivää**, ja aloitus edellyttää omistajan tiliä ja lisenssin
   varmistusta (geodatasupport@lm.se).
3. **Tapa molemmissa:** virallinen massamalli tai pohjat + korkeudet → katot ortokuvasta tai proseduraalisesti →
   julkisivut CC0-pintakuvista ja proseduraalisista ikkunoista → maamerkit käsin (kuten Gizan pyramidit) →
   3D Tiles korttelilaatoittain → LS1:n leikkaus Googlen laattoihin, kuten Gizassa.

## 1. Avoimet lähteet ja lisenssit

### Viro / Tallinna (V, liite-viro)
- **LoD2-rakennukset**, Maa- ja Ruumiamet: koko Tallinna yhtenä tiedostona (49 816 rakennusta; CityGML 33 Mt, OBJ 32 Mt
  zipattuna). Pistepilvi 2020–2022. Geometria ilman tekstuureja ja ilman katto- tai seinäsemantiikkaa. Raatihuoneen torni on
  katkaistu 27 m:iin, joten tornit ja kirkonhuiput pitää tehdä käsin.
- **Ortokuva** 10 cm (2023), 1 km:n lehdet ~26 Mt; **DSM** 1 m; LAZ-pistepilvet 60–300 Mt/lehti.
- **Lisenssi:** Maa- ja Ruumiameti avaandmete litsents 01.01.2025 (CC BY 4.0 -vastine): kaupallinen käyttö ja jakelu sallittu.
  Maininnassa lisenssinantaja, aineisto ja ikä: "3D buildings LoD2 (ALS 2020–2022) and orthophoto 2023, Republic of Estonia
  Land and Spatial Development Board (Maa- ja Ruumiamet)". Erikoisehto: lisenssinantaja voi kirjallisesti pyytää maininnan poistoa.
- **Tallinnan kaupungin oma tekstuuroitu LoD2 ja yli 100 LoD3-kohdetta** ovat olemassa, mutta avointa latausta tai lisenssiä
  ei löytynyt (tallinn.ee esti haun botti-suojalla). Kysymys kaupungille, jos halutaan.
- Ladattu valmiiksi: proto-3d/_lahteet/maaamet-tallinna/ (OBJ, ortolehdet 588542 ja 589542, DSM, LAHTEET.md).

### Ruotsi / Visby (V, liite-ruotsi)
- Lantmäteriet: korkeusmalli 1 m (2024), pistepilvi Laserdata Skog 2024 (1,54 p/m²), rakennuspohjat 2D (A), ortokuvat
  (~16 cm, A). STAC-metatiedot ovat auki, mutta **tiedostot palauttavat 401 ilman Geotorget-tiliä**. Lisenssi CC BY 4.0
  (englanninkielinen sivu sanoo yhä CC0, ristiriita). Maininta: tuotteen nimi, ©Lantmäteriet, maininta käsittelystä ja "CC BY 4.0".
- GDPR: pistepilvessä käyttäjä on rekisterinpitäjä. Ortokuvissa ja ehkä rakennuksissa käyttötarkoitus kuvataan hakemuksessa.
  Tämä on suurin riski julkiselle ämpärille.
- RAÄ:n Bebyggelseregistret on CC0, mutta siinä ei ole 3D:tä eikä korkeuksia. Region Gotlandin dronemallille ei löytynyt avointa lisenssiä.
- Kaupunginmuuri (Ringmuren) on OSM:ssä ilman korkeuksia. Torneista on mallinnettu 12/36 (A). Muurin ja tornien mallinnus käsin.

### OpenStreetMap
- ODbL 1.0. Pelin 3D-malli on "Produced Work", jolle riittää maininta "© OpenStreetMap contributors". Jos jaamme muokattua
  geometriaa tiedostona, siihen voi soveltua share-alike (A). Suositus: käytä OSM:ää vain tagitietona (kattomuoto, korkeus,
  väri, materiaali) ja geometria virallisesta datasta.
- Tallinna, Raekoja plats ~340 × 310 m: 238 rakennusta, 231:llä korkeus, 196:lla kattomuoto, 191 rakennusosaa (V, mitattu).
  Visby, Stora torget 300 × 300 m: 167 rakennusta, building:levels 24 %:lla, korkeus ja kattomuoto 0 %:lla (V, liite).

## 2. Tapa

1. **Massat:** Tallinna LoD2 rajattuna korttelilaatoiksi (koe B). Visby: pohjat + räystäs- ja harjakorkeus pistepilvestä
   (DSM − DTM), kattomuoto oletuksena jyrkkä harjakatto ja harjan suunta pohjan pitkästä akselista (työkalu on kokeessa A).
2. **Katot:** ortokuva projisoituna ylhäältä (koe B: oikea väri, kattoikkunat ja patinat suoraan). Jyrkkien lappeiden venymä
   ja ortokuvan kallistusvirhe korjataan: lappeelle proseduraalinen tiili- tai peltikuvio, jonka sävy otetaan ortokuvasta.
3. **Julkisivut:** proseduraaliset ikkunaruudut (kaksi rappausrytmiä ja paekivi) ja CC0-pintakuviot, väri OSM:stä tai
   satunnaisesti sallitusta pastellipaletista. Jatkossa julkisivutyypit (kauppiastalo päätyineen, barokkitalo, kirkko) ja
   maantason ovet.
4. **Maamerkit käsin:** Tallinna: raatihuone (torni ja huippu, arkadit, sakaraharja), Oleviste, Niguliste, Pühavaimu,
   Toomkirik, muuri ja tornit (Paks Margareeta, Kiek in de Kök, Pikk Hermann). Visby: Ringmuren ja tornit, tuomiokirkko,
   rauniokirkot.
5. **Sovitus:** 3D Tiles korttelilaatoittain, LOD2 = massat + kattojen ortoväri, LOD1 = katot, LOD0 = julkisivut ja
   maamerkit. LS1:n leikkauspolygoni vanhankaupungin ympäri. Maapohja ortokuvasta (kadut ja torit), korkeus avoimesta DTM:stä.
   Googlen laatoista ei oteta mitään.

## 3. Työmäärä ja iPadin kuorma

| | Tallinna (~1 km²) | Visby (~1 km² muurin sisällä) |
|---|---|---|
| Data | valmis, ladattu | omistajan Geotorget-tili + tilaus + GDPR-hakemus |
| Massat ja katot (ketju) | 1–1,5 pv | 2–3 pv (pohjat + pistepilvi + kattopäättely) |
| Julkisivutyypit, maapohja | 1 pv | 1 pv |
| Maamerkit käsin | 1,5–2,5 pv | 3–5 pv (muuri 3,4 km ja tornit, kirkot) |
| LOD, 3D Tiles, sovitus LS1:n kanssa | 0,5–1 pv | 1–1,5 pv |
| **Yhteensä** | **4–6 pv** | **8–12 pv** |

iPadin kuorma (A, mitattu kokeesta B ja skaalattu): 0,1 km² = 259 rakennusta ja 25 k kolmiota, joten 1 km² on noin
2 500 rakennusta ja 0,25 M kolmiota massoina. Julkisivu- ja maamerkkidetaljien kanssa LOD0 on ~0,6–0,8 M kolmiota, joista
näkyvissä kerrallaan noin kolmannes. Tekstuurit: ortokuva 16 laattaa × 2048² (~1 Mt JPEG / ~2 Mt GPU:ssa ASTC:nä) ja yhteiset
julkisivuatlakset ~5 Mt, eli lataus ~25–35 Mt ja GPU-muisti ~40–60 Mt. Tämä on kevyempi kuin Googlen fotogrammetria
samalla alueella. Muistikatto (Päätoimittaja 5.10.) pysyy, kun LOD-tasot vaihtuvat 3D Tilesin SSE:n mukaan.

## 4. Koe: Raekoja plats (Blender-esikatselu)

Kuva: docs/raportit/kuvat/tallinna-koe-raekoja-20261007.jpg (vasemmalla koe A, oikealla koe B; ylhäällä ilmasta luoteesta,
alhaalla torilta etelään). Työkalut: proto-3d/_valmiit/tallinna-koe/lahde/.

- **A, OSM-pohjat** (kortteli.py): 331 rakennusta tai osaa 170 m:n säteellä, katot proseduraalisesti (harja-, auma-, pyramidi- ja
  pulpettikatot, sipulit ja kupolit), 11 800 kolmiota, GLB 5,2 Mt (geometria 0,15 Mt, loput 10 jaettua 1k-tekstuuria).
  Raatihuoneen torni ja kupolit ovat mukana, mutta katot ovat siistejä "lelukattoja".
- **B, Maa-ametin LoD2 + ortokuva** (lod2_rajaa.py + kortteli_lod2.py): 259 rakennusta 180 m:n säteellä, 25 400 kolmiota,
  GLB 3,6 Mt. Kattomuodot, kattoikkunat ja kattojen värit ovat todellisia, ja raatihuoneen sakaraharja näkyy.
  Puuttuu: tornin huippu (LoD2 katkaisee 27 m:iin), jyrkkien lappeiden ortovenymä ja yksilölliset julkisivut.
- **Johtopäätös:** B on oikea pohja. A:n kattotyökalua tarvitaan Visbyssä ja maamerkeissä.

Lähteet kokeessa: Maa- ja Ruumiamet (LoD2, ortokuva 2023), © OpenStreetMap contributors (vain koe A), Poly Haven CC0
(rappaus, paekivi, savitiili, liuskekivi, mukulakivi).

## Päätettävää omistajalle
1. Aloitetaanko Tallinna (4–6 pv) Gizan pelikuvien jälkeen?
2. Visby: luoko omistaja Geotorget-tilin ja hyväksyykö Lantmäterietin GDPR-käyttöehdot, vai jätetäänkö Visby odottamaan?
3. Kysytäänkö Tallinnan kaupungilta tekstuuroidun LoD2- ja LoD3-mallin lisenssiä? Se voisi säästää maamerkkityötä.
