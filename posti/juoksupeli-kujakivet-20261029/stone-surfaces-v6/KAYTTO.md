# Kujakivet v6 — eripituiset lattialaatat ja sokkelikivet

Lähde: Lavastajan tilaus `lavastaja-codex-kujakivet-v6-20261029.md`, commit `cac6ea6abb75b8905fd87d95b73bbf03ccecfc50`. Tehtävät #1246–1247. Molemmat lähteen v135/havainneparit on luettu. Tuottaja: Matkakirjan kuvat. Paketti on 2D/PBR-materiaalia.

## Sisältö ja mitat

| Pinta | Versio | Metrit U × V | PNG | Toisto |
|---|---|---|---|---|
| lattialaatat | v03 | 2,00 × 2,00 | 1024 × 1024 | U ja V |
| sokkeli | v03 | 2,00 × 1,20 | 1024 × 614 | U |
| sokkelin-ylapinta | v03 | 2,00 × 0,10 | 1024 × 51 | U |
| pilarin-etu | v02, ennallaan | 0,60 × 1,20 | 307 × 614 | ei |
| pilarin-sivu | v02, ennallaan | 0,40 × 1,20 | 205 × 614 | ei |
| reunakivi | v01, ennallaan | 0,70 × 0,52 | 360 × 266 | ei |

Jokaiselle pinnalle albedo, normal-opengl, roughness ja 16-bittinen height. Yhteensä 24 PNG-karttaa: 12 uutta sekä pilarin etu/sivu ja reunakivi, joiden 12 karttaa ovat tavutarkasti v5:n kanssa samat. Myös pilarien saumametadata säilyy v5:n mukaisena. Vanhoja toimituksia ei muuteta.

Lattiassa on **kolme poikittaista riviä / 2 metriä**, rivisyvyydet 0,62 / 0,68 / 0,70 m. Laattapituudet ovat riveittäin 0,60+1,40 m; 1,20+0,80 m; 0,70+1,30 m. Saumajakojen siirtymät ovat 0 / 0,27 / 0,95 m. Keskimääräinen laatan pituus on 1,00 m. Vierekkäisten rivien pystysaumat ovat vähintään 0,18 m erossa myös V-toistorajan yli. Tekstuurin reuna voi leikata kokonaisen laatan: se ei tarkoita ylimääräistä lyhyttä kiveä.

U kulkee kujan poikki, V kujan pituussuunnassa. Käytä ilmoitettuja fyysisiä mittoja ja pelissä pyydettyä UV 1:1 -mittakaavaa. Älä säilytä v135:n v02-kokokorjausta uuden pinnan päällä tai venytä suuntia erikseen.

Sokkelissa on kahdeksan 0,15 m korkeaa kerrosta. Kivien pituudet vaihtelevat 0,70–1,30 m, keskimäärin 1,00 m. Pystysaumojen porrastus vierekkäisillä riveillä on vähintään 0,15 m. Sokkelin yläpinnan U-saumat vastaavat sokkelin kuvan ylimmän rivin saumoja täsmälleen.

## Kivipohja ja juonteen mittakaava

Alkuperäinen v5:n ImageGen-kivipohja on kopioitu muuttumattomana (`sources/marble-native.png`). Uusi metrinen materiaaligraafi rakentaa uuden kivijaon: kuvaa ei skaalata yksittäisten laattojen leveyteen. Juonteen näytteistys on edelleen 0,83 lähdeyksikköä/metri sekä U:ssa että V:ssä. Sävyvaihtelu, sauma, tyynyreuna, korkeus ja karheus noudattavat v02:n graafia.

Pitkän kiven sisäiseen lähdenäytteistykseen käytetään siirrettyä toistoa peilauksen sijaan. Toistojakso on 0,90 lähdeyksikköä ja saumakohdassa 0,10 yksikön pehmeä ristihäivytys. Tämä poistaa pitkissä kivissä ilmenneen symmetrisen V-juonteen; lähteen tiedosto pysyy muuttumattomana ja mittakaava säilyy. Tämä lähteen osoitustapa on erillinen valmiin 2 m materiaalin U/V-toistosta.

V6 ei käyttänyt uusia ImageGen- tai Tripo-kutsuja. `sources/PROMPT.txt` ja `sources/imagegen-job.json` ovat v5:n kivipohjan alkuperäisen generoinnin historiaa.

## Karttojen tuonti

- Albedo: sRGB; ei esikatselun valaistusta, varjoja tai AO:ta.
- Normal: lineaarinen tangenttiavaruuden **OpenGL +Y**. PNG:n rivit alas, glTF:n V ylös. Älä käännä vihreää kanavaa kahdesti.
- Roughness: lineaarinen 8-bittinen harmaasävy; karheus, ei smoothness. Kivi noin 0,69 ja laasti 0,90.
- Height: lineaarinen 16-bittinen harmaasävy. Muunnos metreiksi: `-0.006 + (arvo / 65535) * 0.007`. Ei min–max-normalisointia.
- Metallisuus 0. Height/normal eivät muuta mallin siluettia. Normaaliin leivottu pyöristys: lattia 18 mm, sokkeli 10 mm. Älä lisää samaa pyöristystä toistamiseen shaderissa.
- Fyysinen laastisauma 5,4–7,6 mm. Mip-suodatus ja pelivalo voivat muuttaa sen havaittavaa paksuutta.

## Saumakartta

`SEAMS.json` tulee samasta metrisestä jaosta kuin uudet kuvat. Pilarien tiedot on kopioitu muuttumattomina v5:stä. `materials.<nimi>` sisältää:

- `vBoundsPngDown`: rivirajat 0–1 ylhäältä alas; `vBoundsGltfUp` samat rajat glTF-suunnassa. Rivin 0 tunnus tarkoittaa kuvan ylintä kerrosta.
- `uJointCenters`: todellisten pystysaumojen keskilinjat 0–1.
- `uClippedBounds`: mukana myös tekstuurin 0/1-reunat. Lisätty reuna ei itsessään ole sauma.
- `periodicLengthsM`, `periodicOffsetM`, `periodM`: koko 2 m:n toistojakso, myös reunan ylittävät kivet. Pilarin `faceStartM`: etu 0 ja sivu 0,60 m.

Sauman keskilinjasta molempiin suuntiin puolet `jointWidthM`-leveydestä. Laske etäisyys saumaan myös viereisessä toistojaksossa. Yläpinnan V=0/1 ovat nauhan ulkoreunoja, eivät vaakasuuntaisia laastisaumoja.

## Tarkistukset ja jatko

`qa/readback.json`: kaikki 24 karttaa avattu takaisin; koot, bittisyydet, normalien pituudet ja suunta, toistojen raja-arvot, mitat, porrastus, yläpinnan saumat ja todellinen rasterin laasti tarkistettu. Pilarien ja reunakiven 12 kartan SHA256:t sekä pilarien saumametadata vastaavat v5:ää.

`esikatselu/kivipinnat-v6-vertailu.png`: ylhäällä alkuperäiset v135/tavoiteparit, alla tekninen v6-materiaaliesikatselu. Tämä ei ole v6:n pelikuva. Erilliset lattian ja sokkelin toistokuvat näyttävät albedon ilman esikatseluvaloa.

Lavastaja kytkee paketin peliin ja kuvaa vertailuparit samoista kameroista 02/05. Postitoimitus, vastaanottajan kuittaus, peliin kytkentä, KK:n arvio, omistajan hyväksyntä ja julkaisu pidetään erillisinä tiloina.
