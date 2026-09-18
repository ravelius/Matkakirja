# Viesti Fablelle: kamera lähemmäs nappulaa hyppyjen ajaksi (PAATOKSET 40)

*Opus-erä 18.9.2026, haara `claude/bold-ride-vow4ki-siirtozoomi`.
Raamattu, KARTTAUUDISTUKSEN PAATOKSET 40. Omistaja sanatarkasti
(puhelintesti v1944, kuva Marseillen siirtovaiheesta): "kartan pitaisi
zoomautua lahemmas pelinappulaa kun se liftaa pisteiden valilla".*

## 1. Juurisyy — MITATTU, ja se oli eri kuin oletettiin

Tehtävänannon hypoteesi oli, että jokin katto (siirtonäkymän katto,
pelaajan lähin porras, PALLO_KORKEUS-rajat tai ENNAKON_ASKELIA) pitää
kameran kaukana. Mittaus 390 × 844, Marseille → Lyonin suunta
(kolmen askeleen maasiirto, askel 58,9 lautayksikköä) löysi kaksi
toisistaan riippumatonta syytä, eikä kumpikaan ollut katto.

### JUURISYY 1 (iso): kamera nykäistiin KOKO PALLOLLE siirron alussa

Pinotiedot Chromiumista (`pallo.pointOfView` kääritty):

```
t = 15 ms   pointOfView altitude 2.500  kesto 0
   at tahdistaZoomirajat (js/pallolauta/lauta.js:1699)
   at paivita             (js/pallolauta/lauta.js:4222)
   at Object.matkanKerma  (js/pallolauta/lauta.js:4433)
```

Ketju: siirron ENSIMMÄINEN teko `animatePawnSisalla`ssa on
`matkanKermattomuus(true)` → `pallolauta.matkanKerma(true)` →
`paivita()`. Siinä korostusmaa katoaa (nappula lähtee kaupungista
reitille), joten `maanLaatikko = null` ja maan uloszoomauskatto häviää.
`tahdistaZoomirajat` näki katon NOUSEVAN, ja odottamassa ollut
`kattoPuristus` PALAUTTI kameran siihen korkeuteen, jossa se oli ennen
saapumista:

| | ennen siirtoa | yhden kehyksen jälkeen |
| --- | --- | --- |
| korkeus (altitude) | 0,2049 | **2,500** |
| näkyvä leveys | 177,0 lautayksikköä | **2 118,5 lautayksikköä** |
| askel ruudulla (374 px) | 124 px (33 % lyhyemmästä sivusta) | **10 px (2,8 %)** |

Ennakkozoomi lähti siitä alas, mutta sen lupaus ratkesi heti, joten
nappula lähti liikkeelle kameran ollessa vielä korkeudessa ~2,45.

**Ja saatto jäi kokonaan ajamatta:** koska kamera oli avaruudessa,
määränpää oli enää **15,7 px** päässä kameran keskipisteestä, mikä
alittaa `SAATON_VAHIN_PX` 24 → `aloitaSaattavaKamera` palasi heti.
Mitattuna siirrossa oli siis VAIN YKSI kamera-ajo (ennakko), ei
saattoa lainkaan.

### JUURISYY 2 (jäljellä, ks. luku 5): ennakkozoomin ajo ei toteudu

Mitattuna `kamera.ajaKamera(...)` palauttaa ennakkozoomissa `false`
samalla millisekunnilla kuin se kutsutaan — sekä vanhalla
matkarajauksella että uudella askelleveydellä. Siksi `await` ei odota
mitään: saatto alkaa 121–123 ms ennakon jälkeen (= pelkkä
`ENNAKON_HENGAHDYS_MS` 120), eikä ennakkozoomi ehdi viedä kameraa
mihinkään. Tämä on VANHA vika (se näkyy myös korjaamattomassa
koodissa), ei tämän erän tuoma.

### Sivulöydös: matkarajaus teki päinvastaista kuin tilaus

Ilman juurisyytä 1:täkin ennakkozoomin tavoite oli KOKO MATKAN laatikko
(`ui.matkarajaus`, marginaali 0,25, vähimmäiskoko 120 lautayksikköä).
Mitä pidempi heitto, sitä kauempana kamera: kuutosella yksi askel on
kuudesosa ruudusta. Mitattu tavoite kolmen askeleen matkalla oli
laatikko 120 × 159,9 → näkyvä leveys ~180 yksikköä.

## 2. Uusi kaava

`js/siirtokoreografia.js`:

```
ASKELEN_VAHIN_OSUUS = 0,25
askelenSiirtoleveys(askelYks, leveysPx, korkeusPx) =
    leveysPx · askelYks / (0,25 · min(leveysPx, korkeusPx))
```

Eli näkyvä leveys valitaan niin, että YKSI askel on ruudulla vähintään
neljännes ruudun LYHYEMMÄSTÄ sivusta. Pystyruudulla (390 × 844) se on
leveys → näkyvä leveys = 4 × askel; vaakaruudulla (1400 × 900) se on
korkeus → näkyvä leveys ≈ 6,2 × askel.

Kutsuja `js/ui.js`:

- `askelenNakymaleveys(from, path)` laskee askelen MEDIAANIN laudan
  yksiköissä (`pixelOf`) ja kysyy leveyden yllä olevalta kaavalta.
- `ennakoiSiirtoZoomi` käyttää sitä kulkutavoilla `land` ja `bus`
  (hyppyjen kulkutavat). Tavoite on VÄHIMMÄISMITTA: leveys rajataan
  `min(nykyinen, askelleveys)`, joten siirto ei koskaan vie ULOS
  pelaajan omasta lähikuvasta.
- Kattoa ei kirjoiteta tänne: kamera ei päästä pyydettyä leveyttä
  laitteen syvimmän zoomin alle (`korkeusMin()`, PAATOKSET 34 kohta
  15 c: puhelin 40, muut 60 lautayksikköä).
- Laiva pitää `matkarajaus`-rajauksensa (kaari on pallolla pitkä), ja
  ilman kulkutapaa kaikki on ennallaan (`SIIRTOZOOMIN_LAHENNYS` 2,0).
- `aloitaSaattavaKamera` saa saman luvun (`ui.siirtozoominLeveys`):
  saatto pitää ennakkozoomin mittakaavan KIRJATTUNA eikä perittynä.
  Kestot (`STEP_MS`, `JALKAMATKA`, `siirtoajonKesto`) ja kamera-ajon
  käyrä (`SAATON_PEHMENNYS`) ovat koskemattomat.

`js/pallolauta/lauta.js`: kun korostusmaa katoaa ja `maanLaatikko`
nollataan, nollataan myös `kattoPuristus` — sama perustelu kuin
maailmatilassa jo ennestään (*"katto nousee tahallaan, eikä
kattoPuristus saa vetää kameraa mukanaan avaruuteen"*). Tämä poistaa
juurisyyn 1.

## 3. Luvut ennen ja jälkeen

Savuke `tools/savukkeet/savuke-siirtozoomi.mjs`, Marseille, maasiirto
silmäluvulla 3 (3 askelta, askel 58,9 lautayksikköä), dpr 2.

### 390 × 844 (karttaruutu 374 × 771 px)

| mitta | ENNEN | JÄLKEEN |
| --- | --- | --- |
| näkyvä leveys ennen siirtoa | 177,0 yks | 177,0 yks |
| näkyvä leveys ennakon jälkeen | — (kamera 2 118,5 yks) | 177,3 yks |
| näkyvä leveys saatossa | — (saattoa ei ajettu) | 177,3 yks |
| kameran korkeus ennen → siirrossa | 0,2049 → **2,4519** | 0,2049 → 0,2052 |
| askel ruudulla | **10 px (2,8 %)** | **124 px (33 %)** |
| nappula keskimmäisellä 60 %:lla | ei mitattavissa (ei saattoa) | **206 / 206 näytettä** |
| saaton kesto | **ei ajettu** | 3 160 ms (= odotettu) |
| kamera-ajoja siirrossa | 1 | 2 (ennakko + saatto) |

Askelleveys 4 × 58,9 = 235,8 yks on LEVEÄMPI kuin lähtönäkymä 177,0,
joten rajaus `min(nykyinen, askel)` pitää näkymän ennallaan — ja askel
on silti 33 % lyhyemmästä sivusta. Juuri niin kuin päätös haluaa:
lähemmäs tarvittaessa, ei koskaan kauemmas.

### 1400 × 900 (karttaruutu 1379 × 821 px)

| mitta | ENNEN | JÄLKEEN |
| --- | --- | --- |
| näkyvä leveys ennen siirtoa | 613,1 yks | 613,1 yks |
| näkyvä leveys ennakon jälkeen | — (kamera 2 118,5 yks) | 609,3 yks |
| näkyvä leveys saatossa (mediaani) | — (saattoa ei ajettu) | 488,5 yks |
| pyydetty tavoiteleveys | — | 396,0 yks |
| askel ruudulla (mediaanileveydellä) | **10 px (1,2 %)** | 166 px (20 %) |
| askel ruudulla tavoiteleveydellä | — | **205 px (25 %)** |
| nappula keskimmäisellä 60 %:lla | ei mitattavissa | 175 / 203 näytettä |
| saaton kesto | ei ajettu | 3 160 ms (= odotettu) |

Työpöydällä tavoite 396,0 yks on lähempänä kuin lähtönäkymä 613,1, eli
siellä siirto AIDOSTI zoomaa. Kamera ei kuitenkaan ehdi tavoitteeseen
ennen nappulan lähtöä, koska ennakkozoomin ajo ei toteudu (juurisyy 2):
zoomaus tapahtuu vasta saaton aikana, ja siksi saaton mediaanileveys on
488,5 eikä 396,0. Kaksi vartiota jää siitä punaiseksi (luku 5).

## 4. Savuke ja kaappaukset

Uusi `tools/savukkeet/savuke-siirtozoomi.mjs` (kuusi vartiota per ruutu,
390 ja 1400 px, PORTTI 8826, ämpäri Noden kautta):

1. siirto ei vie kauemmas kuin lähtönäkymä
2. askel ruudulla ≥ 25 % lyhyemmästä sivusta
3. katto pitää — ei syvimmän sallitun zoomin alle (40 / 60 yks)
4. nappula ruudun keskimmäisellä 60 %:lla kaikissa saaton näytteissä
5. saaton kesto ±10 % `siirtoajonKesto`n antamasta
6. ei sivuvirheitä

**Tulos: 10 / 12 läpi.** Punaisena `2 1400` (askel 166 px < 205 px) ja
`4 1400` (28 / 203 näytettä keskialueen ulkopuolella, kaikki saaton
alkupuolelta, kun kamera on vielä matkalla tavoiteleveyteen).
390 px:llä kaikki kuusi ovat vihreitä.

Savuketta EI lisätty julkaisusarjaan (`tools/savukkeet/sarjat.json`),
koska kaksi vartiota on vielä punaisena — lisätään siihen, kun luvun 5
kohta 1 on ratkaistu.

Kaappaukset saaton keskeltä (nykytila korjauksen jälkeen):

- `tools/savukkeet/kaappaukset/siirtozoomi/saatto-390.png`
- `tools/savukkeet/kaappaukset/siirtozoomi/saatto-1400.png`

*Huom.* "Ennen"-kaappaus ehti jäädä toisen ajon alle; ennen-tila on
dokumentoitu luvun 3 mitatuilla luvuilla (kamera korkeudessa 2,45,
näkyvä leveys 2 118,5 yks, askel 10 px, ei saattoa lainkaan).

`node --test tests/*.test.mjs`: **# pass 3628, # fail 0** (skipped 13).
`node tools/build-standalone.mjs`: dist 32 728 kt, ok.
Versiota EI nostettu, PR:ää ei avattu.

## 5. Avoimet — Fablen päätettäväksi

1. **Ennakkozoomin ajo ei toteudu (juurisyy 2).** `ajaKamera` palauttaa
   ennakkozoomissa `false` samalla millisekunnilla, jolloin `await`
   ei odota ja koreografian *"zoomi ensin, sitten nappula"* jää
   toteutumatta kokonaan. Nyt saatto kantaa saman tavoiteleveyden, joten
   zoomaus tapahtuu silti — mutta saaton aikana eikä ennen sitä. Tämä on
   oma erä: pitää selvittää, kuka kutsuu `pysaytaKameraAjo`ta heti ajon
   alussa (ehdokkaat: `heraa()` → `paivita()` → `tahdistaZoomirajat` →
   `pointOfView(...,0)`, tai kotelon `wheel`-kaappaus). Sen jälkeen
   1400 px:n kaksi punaista vartiota menevät vihreäksi ilman uusia
   lukuja.
2. **`SAATON_VAHIN_PX` on vaarallinen kynnys.** Mittauksessa se esti
   saaton kokonaan, kun kamera sattui olemaan kaukana. Kynnys on
   tarkoitettu estämään värähdys, mutta se osuu myös tilanteeseen,
   jossa saattoa eniten tarvittaisiin. Ehdotus: kynnys mitataan
   TAVOITEmittakaavassa eikä siinä, missä kamera sattuu olemaan.
3. **`kattoPuristus`-palautus muualla.** Sama nykäisy voi periaatteessa
   tulla mistä tahansa kohdasta, jossa maan katto häviää kesken
   animaation. Nyt korjattu kohta on `paivita`n maanvaihdos; muut
   kutsupaikat (`asetaZoomirajat`, linssit) nollaavat muistin jo.
4. **`SIIRTOZOOMIN_LAHENNYS` 2,0 on enää laivan ja tuntemattoman
   kulkutavan luku.** Liftaus ja bussi eivät käytä sitä lainkaan. Jos
   Fable haluaa, myös laiva voidaan siirtää askelmittaan — silloin
   `MATKARAJAUKSEN_MARGINAALI` kutistuu yhden arvon taulukoksi.
