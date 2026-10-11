# Pääkaupungit e04–e14: Macin puoli valmiiksi ennen Codexin eriä (Karttaseppä 11.10.2026)

PT:n tilaus 11.10.2026: laudan x/y, nimiöt (la/lx/ly), lentokenttälippu, reitit, maakoodit ja kohdekarttojen pohjat
kaikille Codexin erien kaupungeille sekä lista "≤60"- ja "päällekkäin"-tapauksista suosituksineen. Tarkoitus on, että
Pelikoodarin kytkentä on nopea, kun erät tulevat.
Erissä e04–e14 on **95 kaupunkia** (`erat.md`; PT:n viestissä 96).

## Tiedostot

| Tiedosto | Mitä |
|---|---|
| `tools/paakaupungit/laudan-rivit-e04-e14.json` | Kaupunkikohtaiset tiedot: laudan rivi (x, y, la, lx, ly, airport), `pallo`-pisteen lat/lon, `cityCountry`, `cityManner`, ehdotetut reitit (`reitit`, halkaisussa `korvaa`), paikka (maa, rannikko tai saari), lähin laudan kaupunki ja lähin uusi kaupunki, kohdekartan tila ja suositus syineen. |
| `tools/paakaupungit/laudan-valmistelu.mjs` | Laskee yllä olevan tiedoston. Aja uudelleen, jos lauta muuttuu: `node tools/paakaupungit/laudan-valmistelu.mjs <erat.md> <ulos.json> [ulos.md]` |
| `tools/paakaupungit/kohdekartat.mjs` | Kohdekarttojen pohjat erä kerrallaan, kun Codexin `sisalto.json` on tullut (luku 4). |

## 1. Miten laudan rivit on laskettu

Kaikki ehdotukset on tarkistettu samoilla säännöillä kuin `tests/rules.test.mjs`. Koeajossa lisättiin laudalle samaan aikaan 62 kaupunkia: 57 sellaisenaan kelpaavaa ja luvun 2 parivalinnat (Bissau, Lomé, Libreville, Kinshasa, Kigali, Maputo ja neljä Antillien saarta). Kaikki säännöt täyttyivät: 0 virhettä 60 yksikön välissä, nimikylteissä ja pallojen peitossa, maalla olossa (saaret `islands`-listalla) ja merireiteissä, ja `buildBoard` toimi. Pelikoodari vahvistaa ehdotukset vielä `npm test`illä kytkennässä.

- **x ja y:** paikka saadaan pelin projektiolla (`projisoiLaudalle`).
  - Laudan x/y on käsin sommiteltu, joten paikkaan lisätään neljän lähimmän laudan kaupungin keskimääräinen siirtymä. Siirtymä painotetaan etäisyydellä ja vaimennetaan yli 300 yksikön päässä.
  - Jos todellinen paikka on meressä, siirtymää ei käytetä. Rannikkokaupunki tuodaan lähimpään maapisteeseen enintään 20 yksikön päästä; muuten kaupunki on saari.
- **Saaret (23):** praia, saotome, moroni, portlouis, victoria, male, kingston, nassau, saintjohns, basseterre, roseau, castries, kingstown, bridgetown, stgeorges, apia, nukualofa, funafuti, southtarawa, majuro, palikir, yaren ja ngerulmud.
  - Saaret lisätään `islands`-listaan, koska testi "kaupungit ovat mantereella" ohittaa vain sen.
  - Niiden reitit ovat merireittejä satamakaupunkeihin, eli kaupunkeihin, joilla on jo merireitti.
- **Nimiö:** laudan yleisimmät sijoitukset käydään läpi järjestyksessä (start 20,5 → end −20,5 → middle 0,−24 → …), ja ensimmäinen sopiva valitaan.
  - Ehtona on, ettei kyltti mene toisen kyltin päälle, ei peitä toisen kaupungin palloa tai laattaa, eikä toisen kyltti peitä uutta kaupunkia.
  - Kaupungit käsitellään ahtaimmasta väljimpään.
- **Reitit:** reitit valitaan kolmessa järjestyksessä.
  1. **Halkaisu:** jos kaupunki on suoran maareitin varrella (enintään 45 yksikköä janasta), reitti A–B korvataan reiteillä A–uusi ja uusi–B, ja askeleet jaetaan.
  2. **Maareitit:** muuten kaksi lähintä maareittiä, jotka kulkevat maalla (enintään 400 yksikköä).
  3. **Merireitit:** muuten merireitit, jotka kulkevat vedessä (sataman pätkä 55 yksikköä kuten testissä).
  - Askelia tulee yksi jokaista 74 yksikköä kohti (laudan maareittien mediaani).
- **Lentokenttä:** `airport: false` kaikille. Jokaiselle löytyi maa- tai merireitti, ja laudalla on 63 kenttää, jotka ovat aloitus- ja solmukaupungeissa. Uusi kenttä on PT:n päätös.
- **Maakoodit:** `cityCountry` on pisteen maa (ISO3). `cityManner` on saman maan laudan kaupunkien manner; jos maalla ei ole kaupunkeja, käytetään erän mannerta.

## 2. Suositus

**Oletuksena kaikki kevyiksi pisteiksi kuten e01–e03.**
- Tämä noudattaa PT:n suositusta A: lehti avautuu maakortin pääkaupunkirivistä, eikä kevyt piste tarvitse laudan riviä.
- Laudan rivit ovat valmiina siltä varalta, että PT tai omistaja päättää tehdä pääkaupungista pelikaupungin.
- Pelikaupungiksi kelpaa sellaisenaan 57 kaupunkia. Muut 38 on listattu alla syineen.

### ≤60 laudan kaupungista (14) — suositus: kevyt piste

Lähimmän laudan kaupungin etäisyys sommitellussa paikassa:

| Kaupunki | Lähin laudan kaupunki | Etäisyys |
|---|---|---|
| Rabat | Fes | 47 yks / 131 km |
| Banjul | Dakar | 49 yks |
| Conakry | Sierra Leone | 41 yks |
| Tunis | Karthago | 5 yks / 14 km |
| Freetown | Sierra Leone | 12 yks |
| Accra | Kumasi | 34 yks |
| Porto-Novo | Lagos | 44 yks |
| N'Djamena | Tšadjärvi | 50 yks |
| Kampala | Victoriajärvi | 33 yks |
| Antananarivo | Madagaskar | 53 yks |
| Sri Jayawardenepura Kotte | Colombo | 2 yks / 6 km |
| San Salvador | Guatemala | 55 yks |
| La Paz | Titicaca | 46 yks |
| Santiago de Chile | Valparaíso | 35 yks |

Erojen syy: `erat.md`:n ≤60-merkinnät on laskettu raa'asta projektiosta, tämä lista sommitellusta paikasta. Siksi Yaoundé ei ole tässä ≤60, mutta Rabat ja Porto-Novo ovat.

### Päällekkäin pelin lehden kanssa (4) — suositus PT:lle ennen kuin Codex pääsee niihin

Codexin järjestyksessä nämä ovat erän viimeisinä.

| Kaupunki | Päällekkäin | Suositus |
|---|---|---|
| **Freetown** (e04) | Laudan Sierra Leone on Freetownin lehti (55 mainintaa) | **Jätä Codexilta pois**, koska sisältö toistuisi. |
| **Sri Jayawardenepura Kotte** (e10) | Colombo on 6 km:n päässä | **Jätä pois**: Kotte on Colombon hallintoesikaupunki, ja Colombon lehti kattaa sen. |
| **Tunis** (e04) | Karthago 14 km | **Tee kevyenä pisteenä**: Tunis (medina, Bardo) on eri kaupunki kuin Karthagon rauniot. Codexille huomio, ettei Karthagoa käsitellä uudelleen. |
| **Antananarivo** (e08) | Madagaskar-lehden kannessa Kuninkaanmäki ja Hopeapalatsi | **Tee kevyenä pisteenä**, mutta Codexille huomio, ettei kannen kohteita toisteta: kohteet Analakely, Anosy ja Andohalo. Vaihtoehtoisesti jätetään pois. |

### ≤60 toisesta uudesta pääkaupungista (vain jos molemmista tehdään pelikaupunki)

| Pari | Suositeltu pelikaupungiksi |
|---|---|
| Banjul – Bissau | **Bissau** (Banjul on myös ≤60 Dakarista) |
| Conakry – Freetown | ei kumpikaan |
| Accra – Lomé | **Lomé** (Accra on ≤60 Kumasista) |
| Libreville – Ciudad de la Paz | **Libreville** (Ciudad de la Paz on keskeneräinen uusi kaupunki) |
| Brazzaville – Kinshasa | **Kinshasa**; välimatka on 2 yks, samat koordinaatit Kongojoen eri rannoilla |
| Kigali – Gitega | **Kigali** |
| Maputo – Mbabane | **Maputo** |

**Pienet Antillit (8 saarta 30–54 yks välein):** jos niistä tehdään pelikaupunkeja, valitaan väestön mukaan ne, jotka mahtuvat: **Bridgetown, Port of Spain, Saint John's ja Roseau**. Castries, Basseterre, Kingstown ja St. George's jäävät kevyiksi pisteiksi.

### Nimikyltti ei mahdu automaattisesti (17)

tunis, accra, lome, yaounde, saotome, kinshasa, maputo, maseru, srijayawardenepurakotte, ottawa, tegucigalpa, portauprince, saintjohns, castries, kingstown, bridgetown ja santiagodechile.

- Monet niistä ovat jo ≤60-listalla.
- Muille (Yaoundé, Maseru, Ottawa, Tegucigalpa ja Port-au-Prince) nimiö sijoitetaan käsin kytkennässä tai kaupunkia siirretään 5–10 yksikköä. Molemmat tarkistetaan testillä.

## 3. Huomioita reiteistä

- **Hispaniola:** Santo Domingosta ja Port-au-Princesta on vain merireitit. Jos molemmista tehdään pelikaupunki, lisätään maareitti `santodomingo–portauprince` (noin 86 yks, 1 askel).
- **Oseanian saaret:** merireitit Suvaan, Port Vilaan ja Honiaraan ovat pitkiä, 6–12 askelta. Pelikaupunkina ne tarvitsevat todennäköisesti lentokentän, mikä on PT:n päätös.
- **Halkaisu:** kun reitti halkaistaan (esim. Washington: `appalakit–newyork` → `appalakit–washington` + `washington–newyork`), vanha reitti poistetaan. Jos reitillä on `via`-pisteitä, halkaisua ei ehdoteta.

## 4. Kohdekarttojen pohjat

- **Valmiina 42** (Afrikka, #4405 + #4412).
- **Puuttuu 53:** Afrikan 6 (Yamoussoukro, Ciudad de la Paz, Gitega, Dodoma, Mbabane ja Moroni) sekä kaikki Aasian, Amerikkojen ja Oseanian kaupungit.
- Rajat tulevat Codexin kohteista (PILVIOHJE: "`rajat` kattaa kaikki kohteet noin 300 m marginaalilla"). Siksi karttaa ei piirretä etukäteen: etukäteen piirretty kuva jouduttaisiin tekemään uudelleen. Tilalla on työkalu, joka tekee pohjat yhdellä komennolla, kun erä tulee:

```
node tools/paakaupungit/kohdekartat.mjs <paakaupungit-pilvi> <erä> [--piirra]
```

Työkalu kirjoittaa tiedoston `<erä>/kohdekartat-mac.json`. Jokainen kaupunki saa jommankumman päätöksen:

- **VANHA KUVA** — kaupungilla on jo kartta, ja kaikki Codexin kohteet ovat sen rajojen sisällä vähintään 150 metrin päässä reunasta. Kuva ja rajat säilyvät, ja vain kohteet ja esittely vaihtuvat.
- **PIIRRÄ** — kuva piirretään. Rajat ovat Codexin rajat korjattuina: vähintään 150 m kohteista, leveys vähintään 1,2 km ja sivusuhde 0,6–1,4. Valitsimella `--piirra` työkalu lisää kaupungin `tools/piirra-kaupunkikartta.mjs`:n tauluun ja piirtää sen.

Koeajo e03:n pilvidatalla: 6/7 sai päätöksen VANHA KUVA. Beirut sai päätöksen PIIRRÄ, koska Raouchén kalliot ovat vanhan rajauksen ulkopuolella; pelissä kohde on nyt pudotettu.

**TÄRKEÄ Pelikoodarille:** `tools/paakaupungit/kytke-pilvisisalto.mjs` lisää `KAUPUNKIKARTAT`-rivin taulun loppuun.
- Afrikan 42 kaupungille rivi on jo olemassa, joten taulun avain tulisi kahdesti: myöhempi voittaisi hiljaa, ja vanha rivi jäisi roikkumaan.
- Kytkennän pitää siksi **korvata** olemassa oleva rivi.
- Rivin `polku` ja `rajat` (ja mahdollinen `laajennus`) otetaan `kohdekartat-mac.json`:sta; `kohteet` ja `esittely` tulevat Codexilta.

**Työnjako:** Karttaseppä ajaa `kohdekartat.mjs --piirra`n, katsoo kuvat ja ajaa `tarkista-karttapisteet`in kytkennän jälkeen. Kuvat tulevat Pelikoodarin kytkentähaaraan.

## 5. Kaupungit erittäin (ehdotettu laudan rivi)

### e04

| id | x, y | nimiö | reitit | maa / manner | kohdekartta | suositus |
|---|---|---|---|---|---|---|
| rabat | 5621, 2040.9 | end -20,5 | fes–rabat 1; tanger–rabat 1 | MAR / africa | valmis (8 kohdetta) | **kevyt**: ≤60: 47 yks (131 km) kaupungista fes |
| alger | 5917.7, 1934.5 | start 20,5 | fes–alger 4 | DZA / africa | valmis (7 kohdetta) | pelikaupunki |
| nouakchott | 5319.4, 2604.4 | start 20,5 | dakar–nouakchott 2; sierraleone–nouakchott 4 | MRT / africa | valmis (6 kohdetta) | pelikaupunki |
| praia | 5049.7, 2710.6 | start 20,5 | dakar–praia 3 meri; joaopessoa–praia 11 meri | CPV / africa | valmis (6 kohdetta) | pelikaupunki |
| banjul | 5305.5, 2763.9 | start 20,5 | dakar–banjul 1 | GMB / africa | valmis (5 kohdetta) | **kevyt**: ≤60: 49 yks (158 km) kaupungista dakar; ≤60 toisesta uudesta: bissau 57 yks |
| bissau | 5328.9, 2815.4 | start 20,5 | (korvaa dakar–sierraleone (2)) dakar–bissau 1; bissau–sierraleone 1 | GNB / africa | valmis (5 kohdetta) | **kevyt**: ≤60 toisesta uudesta: banjul 57 yks |
| conakry | 5376.8, 2892 | start 20,5 | sierraleone–conakry 1; kappalmas–conakry 4 | GIN / africa | valmis (7 kohdetta) | **kevyt**: ≤60: 41 yks (136 km) kaupungista sierraleone; ≤60 toisesta uudesta: freetown 41 yks |
| monrovia | 5484.8, 2997.8 | start 20,5 | (korvaa sierraleone–kappalmas (2)) sierraleone–monrovia 1; monrovia–kappalmas 1 | LBR / africa | valmis (5 kohdetta) | pelikaupunki |
| tunis | 6104, 1925 | start 20,5 ⚠ | karthago–tunis 1 | TUN / africa | valmis (8 kohdetta) | **kevyt**: ≤60: 5 yks (14 km) kaupungista karthago; päällekkäin pelin lehden kanssa; nimikyltti ei mahdu |
| freetown | 5393.7, 2929.4 | end -20,5 | sierraleone–freetown 1; kappalmas–freetown 3 | SLE / africa | valmis (5 kohdetta) | **kevyt**: ≤60: 12 yks (41 km) kaupungista sierraleone; ≤60 toisesta uudesta: conakry 41 yks; päällekkäin pelin lehden kanssa |

### e05

| id | x, y | nimiö | reitit | maa / manner | kohdekartta | suositus |
|---|---|---|---|---|---|---|
| bamako | 5560.5, 2780.5 | start 20,5 | timbuktu–bamako 3; sierraleone–bamako 3 | MLI / africa | valmis (6 kohdetta) | pelikaupunki |
| ouagadougou | 5774.1, 2800 | start 20,5 | (korvaa timbuktu–kumasi (3)) timbuktu–ouagadougou 1; ouagadougou–kumasi 2 | BFA / africa | valmis (5 kohdetta) | pelikaupunki |
| niamey | 5902.8, 2750.4 | start 20,5 | gao–niamey 2; orjarannikko–niamey 3 | NER / africa | valmis (6 kohdetta) | pelikaupunki |
| yamoussoukro | 5682.2, 2994.4 | start 20,5 | kappalmas–yamoussoukro 1; kumasi–yamoussoukro 2 | CIV / africa | puuttuu | pelikaupunki |
| accra | 5825.4, 3027.5 | start 20,5 ⚠ | kumasi–accra 1; orjarannikko–accra 2 | GHA / africa | valmis (8 kohdetta) | **kevyt**: ≤60: 34 yks (112 km) kaupungista kumasi; ≤60 toisesta uudesta: lome 51 yks; nimikyltti ei mahdu |
| lome | 5872.7, 3008.3 | start 20,5 ⚠ | (korvaa kumasi–orjarannikko (1)) kumasi–lome 1; lome–orjarannikko 1 | TGO / africa | valmis (4 kohdetta) | **kevyt**: ≤60 toisesta uudesta: accra 51 yks; nimikyltti ei mahdu |
| portonovo | 6022.6, 3025.1 | end -20,5 | lagos–portonovo 1; orjarannikko–portonovo 1 | BEN / africa | valmis (4 kohdetta) | **kevyt**: ≤60: 44 yks (147 km) kaupungista lagos |
| abuja | 6121.3, 2905.6 | start 20,5 | lagos–abuja 2; kano–abuja 2 | NGA / africa | valmis (6 kohdetta) | pelikaupunki |
| ndjamena | 6337.4, 2805.1 | start 20,5 | tshadjarvi–ndjamena 1; kano–ndjamena 3 | TCD / africa | valmis (5 kohdetta) | **kevyt**: ≤60: 50 yks (163 km) kaupungista tshadjarvi |
| yaounde | 6250, 3126.6 | start 20,5 ⚠ | kamerun–yaounde 1; kongo–yaounde 3 | CMR / africa | valmis (6 kohdetta) | **kevyt**: nimikyltti ei mahdu |

### e06

| id | x, y | nimiö | reitit | maa / manner | kohdekartta | suositus |
|---|---|---|---|---|---|---|
| libreville | 6179.3, 3231.5 | end -20,5 | (korvaa kamerun–kongo (3)) kamerun–libreville 1; libreville–kongo 2 | GAB / africa | valmis (4 kohdetta) | **kevyt**: ≤60 toisesta uudesta: ciudaddelapaz 57 yks |
| ciudaddelapaz | 6225, 3198.1 | start 20,5 | (korvaa kamerun–kongo (3)) kamerun–ciudaddelapaz 1; ciudaddelapaz–kongo 2 | GNQ / africa | puuttuu | **kevyt**: ≤60 toisesta uudesta: libreville 57 yks |
| saotome | 6057.6, 3200.3 | start 20,5 ⚠ | kamerun–saotome 2 meri; kappalmas–saotome 6 meri | STP / africa | valmis (4 kohdetta) | **kevyt**: nimikyltti ei mahdu |
| bangui | 6460.9, 3080.2 | start 20,5 | kamerun–bangui 4; bahrelghazal–bangui 4 | CAF / africa | valmis (4 kohdetta) | pelikaupunki |
| brazzaville | 6343.8, 3356.2 | start 20,5 | kongo–brazzaville 1; angola–brazzaville 3 | COG / africa | valmis (4 kohdetta) | **kevyt**: ≤60 toisesta uudesta: kinshasa 2 yks |
| kinshasa | 6345.1, 3357.9 | start 20,5 ⚠ | kongo–kinshasa 1; angola–kinshasa 3 | COD / africa | valmis (6 kohdetta) | **kevyt**: ≤60 toisesta uudesta: brazzaville 2 yks; nimikyltti ei mahdu |
| luanda | 6275.8, 3509 | start 20,5 | (korvaa kongo–angola (2)) kongo–luanda 1; luanda–angola 1 | AGO / africa | valmis (5 kohdetta) | pelikaupunki |
| kigali | 6840.6, 3266.5 | start 20,5 | (korvaa viktoria–tanganjika (2)) viktoria–kigali 1; kigali–tanganjika 1 | RWA / africa | valmis (5 kohdetta) | **kevyt**: ≤60 toisesta uudesta: gitega 48 yks |
| gitega | 6837.5, 3314.4 | start 20,5 | (korvaa viktoria–tanganjika (2)) viktoria–gitega 1; gitega–tanganjika 1 | BDI / africa | puuttuu | **kevyt**: ≤60 toisesta uudesta: kigali 48 yks |

### e07

| id | x, y | nimiö | reitit | maa / manner | kohdekartta | suositus |
|---|---|---|---|---|---|---|
| khartum | 6917, 2687 | start 20,5 | suakin–khartum 3; lalibela–khartum 3 | SDN / africa | valmis (6 kohdetta) | pelikaupunki |
| juba | 6889.8, 3031.6 | start 20,5 | bahrelghazal–juba 2; viktoria–juba 2 | SDS / africa | valmis (4 kohdetta) | pelikaupunki |
| asmara | 7130.8, 2696.2 | start 20,5 | (korvaa lalibela–suakin (2)) lalibela–asmara 1; asmara–suakin 1 | ERI / africa | valmis (8 kohdetta) | pelikaupunki |
| djibouti | 7271.6, 2823.1 | middle 0,-24 | lalibela–djibouti 2; addisabeba–djibouti 2 | DJI / africa | valmis (5 kohdetta) | pelikaupunki |
| mogadishu | 7367.8, 3129.4 | start 20,5 | nairobi–mogadishu 4; rashafun–mogadishu 4 | SOM / africa | valmis (6 kohdetta) | pelikaupunki |
| kampala | 6921, 3197.2 | start 20,5 | viktoria–kampala 1; nairobi–kampala 2 | UGA / africa | valmis (7 kohdetta) | **kevyt**: ≤60: 33 yks (109 km) kaupungista viktoria |
| dodoma | 7084.4, 3443.9 | start 20,5 | kilimandzaro–dodoma 1; tanganjika–dodoma 4 | TZA / africa | puuttuu | pelikaupunki |
| lilongwe | 6904.2, 3738.9 | start 20,5 | mosambik–lilongwe 2; viktorianputoukset–lilongwe 3 | MWI / africa | valmis (5 kohdetta) | pelikaupunki |
| lusaka | 6742.5, 3689.6 | start 20,5 | (korvaa viktorianputoukset–tanganjika (2)) viktorianputoukset–lusaka 1; lusaka–tanganjika 1 | ZMB / africa | valmis (7 kohdetta) | pelikaupunki |

### e08

| id | x, y | nimiö | reitit | maa / manner | kohdekartta | suositus |
|---|---|---|---|---|---|---|
| harare | 6818.3, 3796.8 | start 20,5 | viktorianputoukset–harare 2; mosambik–harare 2 | ZWE / africa | valmis (6 kohdetta) | pelikaupunki |
| maputo | 6882.2, 4100.3 | start 20,5 ⚠ | kimberley–maputo 3; mosambik–maputo 3 | MOZ / africa | valmis (7 kohdetta) | **kevyt**: ≤60 toisesta uudesta: mbabane 38 yks; nimikyltti ei mahdu |
| mbabane | 6845.3, 4107 | start 20,5 | kimberley–mbabane 3; mosambik–mbabane 4 | SWZ / africa | puuttuu | **kevyt**: ≤60 toisesta uudesta: maputo 38 yks |
| maseru | 6750.5, 4212 | start 20,5 ⚠ | kimberley–maseru 1; kapkaupunki–maseru 4 | LSO / africa | valmis (5 kohdetta) | **kevyt**: nimikyltti ei mahdu |
| gaborone | 6692.7, 4032 | start 20,5 | (korvaa kimberley–viktorianputoukset (2)) kimberley–gaborone 1; gaborone–viktorianputoukset 1 | BWA / africa | valmis (4 kohdetta) | pelikaupunki |
| windhoek | 6401.9, 3974.6 | start 20,5 | namib–windhoek 1; kimberley–windhoek 5 | NAM / africa | valmis (8 kohdetta) | pelikaupunki |
| moroni | 7275.1, 3603.4 | start 20,5 | sansibar–moroni 1 meri; kilimandzaro–moroni 4 meri | COM / africa | puuttuu | pelikaupunki |
| portlouis | 7750, 3892.6 | start 20,5 | madagaskar–portlouis 4 meri | MUS / africa | valmis (7 kohdetta) | pelikaupunki |
| victoria | 7681.8, 3057.3 | start 20,5 | rashafun–victoria 3 meri; salalah–victoria 6 meri | SYC / africa | valmis (6 kohdetta) | pelikaupunki |
| antananarivo | 7411.8, 3855.5 | end -20,5 | madagaskar–antananarivo 1 | MDG / africa | valmis (8 kohdetta) | **kevyt**: ≤60: 53 yks (167 km) kaupungista madagaskar; päällekkäin pelin lehden kanssa |

### e09

| id | x, y | nimiö | reitit | maa / manner | kohdekartta | suositus |
|---|---|---|---|---|---|---|
| taskent | 8140.5, 1749.6 | start 20,5 | samarkand–taskent 1; kashgar–taskent 3 | UZB / asia | puuttuu | pelikaupunki |
| biskek | 8316.7, 1687 | start 20,5 | kashgar–biskek 2; samarkand–biskek 4 | KGZ / asia | puuttuu | pelikaupunki |
| dusanbe | 8123.8, 1857.4 | start 20,5 | (korvaa samarkand–kashgar (4)) samarkand–dusanbe 1; dusanbe–kashgar 3 | TJK / asia | puuttuu | pelikaupunki |
| asgabat | 7778.9, 1882.4 | start 20,5 | (korvaa teheran–samarkand (5)) teheran–asgabat 2; asgabat–samarkand 3 | TKM / asia | puuttuu | pelikaupunki |
| islamabad | 8263.5, 2044.6 | start 20,5 | kabul–islamabad 2; delhi–islamabad 3 | PAK / asia | puuttuu | pelikaupunki |
| thimphu | 8824, 2259.4 | start 20,5 | lhasa–thimphu 2; kathmandu–thimphu 2 | BTN / asia | puuttuu | pelikaupunki |
| dhaka | 8848.1, 2402.6 | start 20,5 | kolkata–dhaka 1; mandalay–dhaka 3 | BGD / asia | puuttuu | pelikaupunki |

### e10

| id | x, y | nimiö | reitit | maa / manner | kohdekartta | suositus |
|---|---|---|---|---|---|---|
| male | 8283.6, 3072.2 | start 20,5 | colombo–male 3 meri; mumbai–male 7 meri | MDV / asia | puuttuu | pelikaupunki |
| naypyidaw | 9038.2, 2544.1 | start 20,5 | (korvaa yangon–mandalay (3)) yangon–naypyidaw 2; naypyidaw–mandalay 1 | MMR / asia | puuttuu | pelikaupunki |
| vientiane | 9254, 2605.4 | start 20,5 | (korvaa bangkok–hanoi (4)) bangkok–vientiane 2; vientiane–hanoi 2 | LAO / asia | puuttuu | pelikaupunki |
| phnompenh | 9329.5, 2821.1 | start 20,5 | bangkok–phnompenh 2; hanoi–phnompenh 4 | KHM / asia | puuttuu | pelikaupunki |
| kualalumpur | 9219.2, 3096.2 | start 20,5 | singapore–kualalumpur 1 | MYS / asia | puuttuu | pelikaupunki |
| bandarseribegawan | 9665.9, 3047.5 | start 20,5 | singapore–bandarseribegawan 5 meri | BRN / asia | puuttuu | pelikaupunki |
| pjongjang | 10023.3, 1838.8 | start 20,5 | soul–pjongjang 1; vladivostok–pjongjang 3 | PRK / asia | puuttuu | pelikaupunki |
| srijayawardenepurakotte | 8518.2, 2961.8 | start 20,5 ⚠ | colombo–srijayawardenepurakotte 1 | LKA / asia | puuttuu | **kevyt**: ≤60: 2 yks (6 km) kaupungista colombo; päällekkäin pelin lehden kanssa; nimikyltti ei mahdu |

### e11

| id | x, y | nimiö | reitit | maa / manner | kohdekartta | suositus |
|---|---|---|---|---|---|---|
| washington | 3262.5, 1840.3 | start 20,5 | (korvaa appalakit–newyork (3)) appalakit–washington 2; washington–newyork 1 | USA / northamerica | puuttuu | pelikaupunki |
| ottawa | 3315.1, 1563.6 | start 20,5 ⚠ | (korvaa toronto–montreal (3)) toronto–ottawa 2; ottawa–montreal 1 | CAN / northamerica | puuttuu | **kevyt**: nimikyltti ei mahdu |
| belmopan | 2873.2, 2638.1 | start 20,5 | (korvaa merida–guatemala (4)) merida–belmopan 2; belmopan–guatemala 2 | BLZ / northamerica | puuttuu | pelikaupunki |
| sansalvador | 2861.1, 2744.3 | start 20,5 | guatemala–sansalvador 1; merida–sansalvador 3 | SLV / northamerica | puuttuu | **kevyt**: ≤60: 55 yks (180 km) kaupungista guatemala |
| tegucigalpa | 2926.2, 2731.6 | start 20,5 ⚠ | (korvaa guatemala–managua (3)) guatemala–tegucigalpa 2; tegucigalpa–managua 1 | HND / northamerica | puuttuu | **kevyt**: nimikyltti ei mahdu |
| sanjose | 3028.2, 2871.1 | start 20,5 | managua–sanjose 1 | CRI / northamerica | puuttuu | pelikaupunki |
| santodomingo | 3488.5, 2595 | end -20,5 | caracas–santodomingo 4 meri | DOM / northamerica | puuttuu | pelikaupunki |
| portauprince | 3402.8, 2597 | start 20,5 ⚠ | caracas–portauprince 5 meri | HTI / northamerica | puuttuu | **kevyt**: nimikyltti ei mahdu |
| kingston | 3273.6, 2606.1 | end -20,5 | havanna–kingston 4 meri; panama–kingston 4 meri | JAM / northamerica | puuttuu | pelikaupunki |

### e12

| id | x, y | nimiö | reitit | maa / manner | kohdekartta | suositus |
|---|---|---|---|---|---|---|
| nassau | 3255.4, 2357.9 | start 20,5 | miami–nassau 2 meri; sanjuan–nassau 6 meri | BHS / northamerica | puuttuu | pelikaupunki |
| saintjohns | 3771.8, 2635.3 | start 20,5 ⚠ | sanjuan–saintjohns 2 meri; caracas–saintjohns 4 meri | ATG / northamerica | puuttuu | **kevyt**: ≤60 toisesta uudesta: basseterre 30 yks; nimikyltti ei mahdu |
| basseterre | 3742.2, 2629.2 | start 20,5 | sanjuan–basseterre 2 meri; caracas–basseterre 4 meri | KNA / northamerica | puuttuu | **kevyt**: ≤60 toisesta uudesta: saintjohns 30 yks |
| roseau | 3787.2, 2697.6 | start 20,5 | sanjuan–roseau 3 meri; caracas–roseau 3 meri | DMA / northamerica | puuttuu | **kevyt**: ≤60 toisesta uudesta: castries 46 yks |
| castries | 3800.4, 2741.5 | start 20,5 ⚠ | sanjuan–castries 3 meri; caracas–castries 3 meri | LCA / northamerica | puuttuu | **kevyt**: ≤60 toisesta uudesta: kingstown 30 yks; nimikyltti ei mahdu |
| kingstown | 3792.4, 2770.5 | start 20,5 ⚠ | caracas–kingstown 3 meri; sanjuan–kingstown 3 meri | VCT / northamerica | puuttuu | **kevyt**: ≤60 toisesta uudesta: castries 30 yks; nimikyltti ei mahdu |
| bridgetown | 3846.1, 2772.5 | start 20,5 ⚠ | caracas–bridgetown 4 meri; sanjuan–bridgetown 4 meri | BRB / northamerica | puuttuu | **kevyt**: ≤60 toisesta uudesta: kingstown 54 yks; nimikyltti ei mahdu |
| stgeorges | 3774.9, 2807.8 | start 20,5 | caracas–stgeorges 2 meri; sanjuan–stgeorges 4 meri | GRD / northamerica | puuttuu | **kevyt**: ≤60 toisesta uudesta: kingstown 41 yks |
| portofspain | 3764.1, 2853 | start 20,5 | caracas–portofspain 2 meri | TTO / northamerica | puuttuu | **kevyt**: ≤60 toisesta uudesta: stgeorges 46 yks |

### e13

| id | x, y | nimiö | reitit | maa / manner | kohdekartta | suositus |
|---|---|---|---|---|---|---|
| georgetown | 3890.6, 2987.2 | start 20,5 | boavista–georgetown 2; caracas–georgetown 4 | GUY / southamerica | puuttuu | pelikaupunki |
| paramaribo | 3984.4, 3020.7 | start 20,5 | cayenne–paramaribo 1; boavista–paramaribo 3 | SUR / southamerica | puuttuu | pelikaupunki |
| brasilia | 4227, 3721.7 | start 20,5 | bananal–brasilia 2; ouropreto–brasilia 3 | BRA / southamerica | puuttuu | pelikaupunki |
| lapaz | 3561.8, 3765.9 | start 20,5 | titicaca–lapaz 1; santacruz–lapaz 2 | BOL / southamerica | puuttuu | **kevyt**: ≤60: 46 yks (149 km) kaupungista titicaca |
| santiagodechile | 3492, 4367.2 | start 20,5 ⚠ | valparaiso–santiagodechile 1; puertomontt–santiagodechile 4 | CHL / southamerica | puuttuu | **kevyt**: ≤60: 35 yks (98 km) kaupungista valparaiso; nimikyltti ei mahdu |

### e14

| id | x, y | nimiö | reitit | maa / manner | kohdekartta | suositus |
|---|---|---|---|---|---|---|
| canberra | 10798.6, 4427.8 | start 20,5 | (korvaa sydney–melbourne (4)) sydney–canberra 1; canberra–melbourne 3 | AUS / oceania | puuttuu | pelikaupunki |
| apia | 105.6, 3675.5 | start 20,5 | suva–apia 5 meri; portvila–apia 9 meri | WSM / oceania | puuttuu | pelikaupunki |
| nukualofa | 11993.3, 3926.4 | start 20,5 | suva–nukualofa 3 meri; portvila–nukualofa 8 meri | TON / oceania | puuttuu | pelikaupunki |
| funafuti | 11803.9, 3495.7 | start 20,5 | suva–funafuti 4 meri; portvila–funafuti 6 meri | TUV / oceania | puuttuu | pelikaupunki |
| southtarawa | 11598.9, 3167 | start 20,5 | honiara–southtarawa 8 meri; portvila–southtarawa 9 meri | KIR / oceania | puuttuu | pelikaupunki |
| majuro | 11546, 2974.7 | start 20,5 | honiara–majuro 9 meri; portvila–majuro 11 meri | MHL / oceania | puuttuu | pelikaupunki |
| palikir | 11106.2, 2980.5 | start 20,5 | honiara–palikir 7 meri; portvila–palikir 12 meri | FSM / oceania | puuttuu | pelikaupunki |
| yaren | 11397.4, 3229.8 | start 20,5 | honiara–yaren 5 meri; portvila–yaren 8 meri | NRU / oceania | puuttuu | pelikaupunki |
| ngerulmud | 10320.8, 2961 | start 20,5 | dili–ngerulmud 8 meri; taipei–ngerulmud 10 meri | PLW / oceania | puuttuu | pelikaupunki |
