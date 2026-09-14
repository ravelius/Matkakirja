# Viesti Fablelle: Osumareititys — vihjepiste ruutuavaruuteen (ei versionostoa)

Rootin havainto 13.9.2026: kaupungin vihjepiste (kohtaamispiste) jää kaupungin
merkin alle, ja keskustanapautus avaa kaupungin tietoruudun vihjeen sijaan.
Korjattu ja mitattu.

## Mitattu juurisyy

Ongelma ei ollut kynnysluvussa vaan **koordinaatistossa**. Vanha sääntö
(`js/fokuspiste.js` `fokuspisteenSiirto`) on kynnysfunktio LAUDAN
YKSIKÖISSÄ, ja pallolla laudan yksikkö ei ole merkin mitta. Kaksi mitattua
osasyytä:

**1. Kynnys mitattiin väärästä pisteestä.** Kaupunki EI ole pallolla laudan
kohdassaan: sillä on oma pallopiste (`js/pallo.js` `pallonOmatPisteet`,
`c.pallo`), joka siirtää PIIRRETYN merkin jopa 236 km laudan pisteestä
(`js/packs/maailmankartta-pallopisteet.js`: Riika 236,1 km, Tallinna 184,7 km,
Sarajevo 127,5 km). `fokuspisteenSiirto` vertaa kohtaamispistettä laudan
pisteeseen, joten Budapestin 32,45 laudan yksikköä putosivat kynnyksen (14) yli
eikä siirtoa tullut — vaikka pallolla piste ja kaupungin merkki ovat samassa
pikselissä (mitattu selaimesta **0,2 px**).

**Vika ei ollut vain Budapestissa.** Sama mittaus kaikille 40
kohtaamispisteelle löysi neljä kaupunkia, joissa piste on kaupungin merkin
alla. Luvut alla ovat kameramallista (yksikkötestin mitta,
saapumisleveys 240 lautayksikköä, 390 px ruutu); Budapestin luku on
lisäksi todennettu selaimella (0,2 px, ks. vastakoe):

| kaupunki | piste | laudalla | ruudulla ENNEN |
|---|---|---|---|
| Barcelona | Canaletesin lähde | 17,26 yks | **0,1 px** |
| Budapest | Rudasin kylpylä | 32,45 yks | **0,2 px** |
| Marseille | Vanhan sataman laituri | 17,46 yks | **0,5 px** |
| Helsinki | Suomenlinnan salmi | 17,37 yks | **1,9 px** |

**2. Siirto oli vakio laudan yksiköissä.** Pituusaste kutistuu ruudulla
kertoimella cos(lat), joten sama 14 yksikön siirto antoi eri sormenvaran eri
leveysasteilla: Ateenassa (38° N) 22,4 px mutta Helsingissä (60° N) 15,3 px.
Sääntö oli laudan mitta, ongelma ruudun mitta.

**3. Osumakilpailun järjestys.** `js/pallolauta/lauta.js` `lahinMerkki` antoi
kohtaamispisteelle etuoikeuden vain KILPAILUN VOITTAJANA
(`voittaja?.o?.perhe === 'piste'`), ja se sääntö on vasta kaupunkipisteen oman
musteen jälkeen. Kun kaupunkipiste on pikselin verran lähempänä, kaupunki
palautetaan ennen kuin pisteen sääntöä ehditään lukea — juuri tämä avasi
tietoruudun vihjeen sijaan.

## Korjaus (pienin mahdollinen)

Kaava on **täsmälleen sama kuin turisti-infolla, ei uusi keksintö**
(`js/kaupunkinosto.js` `turistiInfonAsteet`, `TURISTI_INFO_SIIRTO`): siirto on
ASTEITA, pituusaste jaetaan kosinilla, kosinille on napalattia, ja mitta on
valittu MITTAAMALLA ruudulta. Turisti-info menee kaakkoon, kohtaamispiste
koilliseen — eri suunta, sama kaava, ei päällekkäin.

| tiedosto:rivi | muutos |
|---|---|
| `js/fokuspiste.js:116–204` | uusi `fokuspisteenAsteet(kaupunki, piste)` + vakiot `FOKUSPISTE_SIIRTO_AST` (lon 0,33 / lat 0,26), `FOKUSPISTE_ERO_MIN_AST` (0,35), `FOKUSPISTE_KOSINIRAJA` (0,25), `FOKUSPISTE_MUSTE_R_PX` |
| `js/fokuspiste.js:109–114` | `fokuspisteenSiirto` **ennallaan** — se on nyt nimenomaan tasokartan sääntö (siellä laudan yksikkö ON merkin mitta) |
| `js/pallolauta/nostot.js:47` | import `fokuspisteenSiirto` → `fokuspisteenAsteet` |
| `js/pallolauta/nostot.js:605` | `fokuspisteenAsteet(asteet({ x: city.x, y: city.y }), asteet(piste))` — sekä kynnys että siirto mitataan kaupungin PIIRRETYSTÄ pallopisteestä |
| `js/pallolauta/lauta.js:86` | import `FOKUSPISTE_MUSTE_R_PX` |
| `js/pallolauta/lauta.js:2114–2135` | kohtaamispisteen "pitää paikkansa" -etuoikeus **ennen** kaupunkipisteen omaa mustetta: sormi pisteen oman hehkukehän (5,5 px) sisällä tarkoittaa pistettä |

**Mitta on omistajan jo hyväksymä ero, ei uusi.** hypot(0,26; 0,33) = 0,42° on
täsmälleen se ruutuero, jonka Ateena sai vanhalla säännöllä (0,4125°) ja jonka
omistaja hyväksyi 6.9.2026. Nyt jokainen kaupunki saa sen, joka leveysasteella.
Kynnys 0,35° on sama ruutuero kuin laudan vanha 14 yksikköä Ateenan leveydellä.

**Turisti-infon omaan sääntöön ei koskettu**, ei myöskään kaupunkipisteen omaan
myönnytykseen, nimimusteen kilpailuun, linssin merkkeihin eikä tasokarttaan.
Osumasääntöihin lisättiin täsmälleen yksi ehto.

## Mittaustaulukko

Ruutuero kaupungin PIIRRETYSTÄ merkistä, **mitattu selaimesta**
(Chromium, 390 × 844, dpr 2, `pallo.getScreenCoords`, sama lähde jota
osumatesti itse lukee). "Avautuuko vihje" = napautus pisteen ruutupisteeseen.

| kaupunki | piste | lautayks. | zoomi | ENNEN px | JÄLKEEN px | avautuuko vihje |
|---|---|---|---|---|---|---|
| Budapest | Rudasin kylpylä | 32,45 | saapuminen (alt 0,2893) | **0,2** | **21,0** | ENNEN ei (kaupungin tietoruutu) → JÄLKEEN kyllä |
| Budapest | Rudasin kylpylä | 32,45 | lähi (alt 0,0723) | **0,7** | **83,8** | ENNEN ei → JÄLKEEN kyllä |
| Ateena | Akropolis | 0,51 | saapuminen (alt 0,3675) | 16,3 | **16,6** | ENNEN kyllä → JÄLKEEN kyllä |
| Ateena | Akropolis | 0,51 | lähi (alt 0,0919) | 64,9 | **66,1** | ENNEN kyllä → JÄLKEEN kyllä |

Yksikkötestin kameramallilla mitattuna (kaikki 40 kohtaamispistettä,
saapumisleveys 240 lautayksikköä) ero on korjauksen jälkeen **22,8 px joka
kaupungissa ja joka leveysasteella**; ennen se vaihteli 0,1 px:stä 24,5 px:ään.
Oslo (43,2 px) ja Riika (97,0 px) eivät saa siirtoa kumpanakaan — niiden piste
on oikeasti muualla, ja datan suunta on sen oma tieto.

## Testit

**Yksikkötesti `tests/osumareititys.test.mjs`** (9 vartiota, uusi):
juurisyy (vanha sääntö jätti neljä pistettä alle 2 px:n), ruutuero kahdella
zoomitasolla neljälle viallisille ja kolmelle hienosäädetylle kaupungille,
leveysasteriippumattomuus, kaukaisen pisteen koskemattomuus (Oslo, Riika),
`fokuspisteenAsteet`in suunta/kosini/tyhjä data, osumakilpailu sormi pisteen
päällä, `lahinMerkki`in sääntöjärjestys (piste ennen kaupunkipisteen mustetta,
turisti-infon ja kaupungin omat säännöt koskematta) ja tasokartan säännön
säilyminen.

**Päivitetty `tests/pallopiste.test.mjs`**: pallon reitti lukee nyt
`fokuspisteenAsteet`ia eikä `fokuspisteenSiirto`a.

**Playwright-savuke `tools/savukkeet/savuke-osumareititys.mjs`** (18 vartiota,
uusi): oikea peli pallolaudalla Budapestissa ja Ateenassa, kaksi zoomia
kummassakin, aidot napautukset kankaaseen (`sivu.mouse.click` merkin
ruutupisteeseen — savuke ei kutsu avaajia suoraan). Vartiot: piste on kartalla
ja auki, ruutuero ≥ 14 px, pisteen napautus avaa vihjeen eikä kaupungin
tietoruutua, ja vastavartiona kaupungin napautus avaa yhä kaupungin tietoruudun.
Avautuvaa pintaa ODOTETAAN (`avoinPinta`, enintään 8 s) eikä arvata kiinteällä
viiveellä: napautus kulkee `ui.doAction`in läpi, ja kuormitetulla koneella
visalaatikko aukesi mitattuna yli sekunnissa — kiinteä odotus teki vartiosta 3
satunnaisen.

Julkaisukaava:

- `npm test` → **# pass 3317, # fail 0** (3330 testiä, 13 skipped)
- `node tools/tarkista-kaksoisavaimet.mjs` → ei kaksoisavaimia
- `node tools/tarkista-niputus.mjs` → 387 moduulia, ei törmäyksiä
- `node tools/tarkista-savukkeet.mjs` → savukkeet kunnossa
  (1604 ui-viittausta, 404 metodia, 533 kenttää)
- `grep -rn '^<<<<<<<' js css tests tools` → tyhjä
- `node tools/uusi-versio.mjs` **ei ajettu** (tehtävänannon mukaisesti);
  versionoston tekee Fable.

## Vastakoe (pakollinen, tehty)

Korjaus kumottiin väliaikaisesti: `js/pallolauta/nostot.js` palautettiin
laudan yksikköiseen siirtoon ja `lahinMerkki`in lisätty etuoikeus poistettiin.
Muuta ei muutettu.

| | korjattuna | korjaus kumottuna |
|---|---|---|
| savuke `savuke-osumareititys.mjs` | **18/18 läpi** | **14/18 läpi** |
| node `osumareititys` + `pallopiste` | **# pass 22, # fail 0** | **# pass 20, # fail 2** |
| Budapest saapuminen, ruutuero | **21,0 px** | **0,2 px** |
| Budapest, pisteen napautus | visa aukesi | **kaupungin tietoruutu aukesi** |

Vastakokeen rivi `INFO Budapest @ saapuminen: pisteen napautus:
{"kaupunkipopup":true,...,"visa":false}` on sanatarkasti se oire, jonka root
raportoi: napautus vihreään pisteeseen avasi kaupungin tietoruudun. Korjattuna
sama napautus antaa `{"kaupunkipopup":false,...,"visa":true}`.

Node-vastakokeessa punaisiksi kääntyivät juuri ne kaksi vartiota, jotka
mittaavat KYTKENNÄN (`lahinMerkki`in sääntöjärjestys ja pallon reitin lähde);
geometriavartiot mittaavat sääntöfunktiota suoraan ja pysyvät vihreinä, kuten
pitääkin. Korjaus palautettiin ja molemmat ovat jälleen täysin vihreitä.

## Kuvat (omistajan silmäystä varten)

- `docs/raportit/kuvat/osuma-budapest-saapuminen.png`
- `docs/raportit/kuvat/osuma-budapest-lahi.png`
- `docs/raportit/kuvat/osuma-ateena-saapuminen.png`
- `docs/raportit/kuvat/osuma-ateena-lahi.png`

Kaikki neljä ovat samasta korjatusta 18/18-ajosta (320 × 240 px rajaus
kaupungin ja pisteen puolivälistä). Selvin näyttö on
`osuma-budapest-lahi.png`: vihreä piste on nyt selvästi erillään
Budapestin nappulasta — ennen korjausta se oli nappulan alla. "Ennen"-kuvaa ei ole erikseen, koska ennen-tila on se, että
merkkejä on ruudussa yksi: vihreä piste on kaupungin merkin alla eikä erotu
kuvassa mitenkään — ero on numeroissa (0,2 px → 21,0 px) ja siinä, mikä
napautuksesta aukeaa.

## Mitä EI tehty ja miksi

1. **Siirtoa ei kasvatettu turisti-infon 39 pikseliin.** Tehtävänanto viittasi
   turisti-infon mittaan; kaava on nyt sama, mutta MITTA pidettiin omistajan
   6.9.2026 hienosäätämässä arvossa (Ateenan oma ero). Turisti-infon
   1,5°/0,75° olisi ≈ 187 km, jolloin "Akropolis" syttyisi keskelle
   Egeanmerta — turisti-info on geneerinen merkki, kohtaamispiste on nimetty
   oikea paikka. Jos omistaja haluaa enemmän ilmaa, muutos on yhden vakion
   (`FOKUSPISTE_SIIRTO_AST`) kokoinen.
2. **Tasokartan sääntöön ei koskettu.** Mitattu vika on pallon vika; tasokartta
   on lehdetön varapolku, jossa laudan yksikkö on merkin mitta ja zoomi kertoo
   koko näkymän samalla kertoimella. Yhden säännön periaate (omistaja
   6.9.2026) säilyy kaavana; vain mittayksikkö on kummallakin laudalla se,
   jossa merkit oikeasti piirretään.
3. **Muiden merkkien osumasääntöjä ei muutettu**: turisti-infon oma sääntö,
   kaupunkipisteen oma halkaisijamyönnytys, nimimusteen kilpailu
   (`musteeseenOsunut`), linssin merkit ja kohdemerkit ovat bitilleen ennallaan.

## Havainto Fablelle (EI korjattu, ei tämän erän asia)

**Kohtaamispiste perii laudan projektiovirheen, kaupungin merkki ei.** Kaupunki
saa pallolla oman pallopisteensä (`c.pallo`), mutta kohtaamispiste käännetään
laudan koordinaateista suoraan. Kaupungeissa, joissa laudan piste on kaukana
oikeasta sijainnista, piste jää satojen kilometrien päähän kaupungistaan,
vaikka data sanoo "keskustassa":

| kaupunki | laudan virhe | pisteen etäisyys kaupungin merkistä (saapuminen) |
|---|---|---|
| Riika | 236,1 km | 97,0 px |
| Tallinna | 184,7 km | 79,1 px |
| Sarajevo | 127,5 km | 62,2 px |

Nämä eivät ole osumavika (merkit erottuvat hyvin), vaan SIJOITTELUVIKA: vihreä
piste on väärässä paikassa kartalla. Korjaus olisi soveltaa kaupungin oma
siirtymä (`pallonOmatPisteet().siirtymat`) myös kohtaamispisteeseen — se on
semanttinen muutos (siirtäisi Riian pisteen 200 km) ja siksi oma eränsä ja
oma omistajan silmäyksensä. Kirjattu tähän, ei korjattu.

## Tiedostot

- `js/fokuspiste.js` — uusi `fokuspisteenAsteet` + vakiot
- `js/pallolauta/nostot.js` — pallo lukee asteet, ei laudan yksikköjä
- `js/pallolauta/lauta.js` — `lahinMerkki`in etuoikeus kohtaamispisteelle
- `tests/osumareititys.test.mjs` — uusi
- `tests/pallopiste.test.mjs` — päivitetty kytkentävartio
- `tools/savukkeet/savuke-osumareititys.mjs` — uusi
- `docs/raportit/kuvat/osuma-*.png` — neljä kaappausta
