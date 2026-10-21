# B Tekotavat: kamera ja video

*(Linssiseppä 21.10.2026, studiojako Raamattu 4.21; valaistus ja videon rytmi: Valoseppä täydentää luvun 7. Tuntuma ja
laatutaso: `docs/tuotanto/suunta/kamera.md`. Luvat ja vaiheet: D. Koodi proto-gitissä; polut alla ovat proton.)*

## 1. Työkalut

| Osa | Missä | Mihin |
|---|---|---|
| Kamerajohtaja | `Linssit/Ydin/Kamera/Kamerajohtaja.cs` | Ainoa kameran asennon lähde: jono, jatkuvuus rakenteesta, esilatauksen odotus (`Valmistele`/`Valmis`) |
| Nimetyt liikkeet | samassa: `Paikallaan`, `Kisko`, `Orbit`, `Kaanto`, `Zoom`, `Leikkaus`; `Lentokaari.cs` | Kaikki sallitut liikkeet (4.24); uusi liike Ytimeen testeineen |
| Käyrät | `Liikepohja.cs` (`Tasainen`, `Kaari`, `Jousi`, tyylikirjan nimetyt liikkeet) | Yksi käyräkirjasto; omat Lerp/SmoothStep-käyrät kielletty |
| Tarkastus | `Kameratarkastus.cs` (`KameraRajat`), `PalloTarkastus.cs` (`KarttaRajat`) | Ruuduittainen jatkuvuus, nopeus, kiihtyvyys, kääntö, pehmeät päät |
| Kirjoitus Unityyn | `Kartta/KameraKirjoittaja.cs` | Ainoa kirjoituspiste kameraan + 20 ms:n ruutuvahti |
| Vahdit (`tyokalut/tarkista.sh`) | `kameravahti.py`, `liikevahti.py`, `kameratesti.py`, `nykaysvahti.py` | Suorat kamerakirjoitukset, omat käyrät, testitön liike, pitkät ruudut; lähtötasot `tyylikirja/*.json` saavat vain pienentyä |
| Cinemachine 3 (paketti 6.7.0) | vain `DioraamaCinemachine.cs` (linna) ja Seikkailu (pelaaja, vene) | Orbit ja seuraaminen dioraamassa ja seikkailussa; ei museoon eikä linsseihin (ei tunne salin esteitä, ei aja Linssit-testeissä) |
| Splines (2.9.1) | vain Cesiumin leikkausmonikulmio | Ei kamerassa; kameran kisko on oma keskeis-Catmull–Rom (`Kisko.Kaari`) |

## 2. Käytännön vaiheet

1. **Kohtauslista** (4.23): jokaiselle otolle liike, kesto, alku- ja lopputila ja syy; syytön siirtymä karsitaan.
2. **Liikkeet Ytimeen**: kohtauslista nimetyiksi liikkeiksi Kamerajohtajan jonoon; sovitin ei liikuta kameraa omalla koodilla.
3. **Testi**: jokaiselle käsikirjoitetulle liikkeelle CI-testi `Kameratarkastus.Aja`:lla (jatkuvuus, pehmeä alku ja loppu,
   kesto, rajat) ja lisäksi `AjaVaihtelevalla` (vaihteleva ruutunopeus).
4. **QA-komennot** jokaiselle kameran tilalle (paikka, liike, kytkimet), jotta kuva on toistettava.
5. **Todistus kameralokilla**: `KAMERAHYPPY`-rivit 0, esilatauksen rivi "kohde Y ladattu", ruutuaikavahti koko liike + 1 s.

## 3. Rajat (oletukset)

| Käyttö | Nopeus | Kiihtyvyys | Kääntö | Muuta |
|---|---|---|---|---|
| Perusliikkeet (`KameraRajat`) | 2,0 m/s | 3,0 m/s² | 90 °/s, 360 °/s² | päät levossa (0,05 m/s, 3 °/s), kuvakulma 1,4 ln/s |
| Museon lento (`Lentokaari`) | ≤ 9 m/s | ≤ 3,4 m/s² (mutka 2,4), nykäys 3 m/s³ | kääntö 45–50 °/s, ≤ 200 °/s² | kesto 1,5·√matka (≥ 1,2 s); kallistus ≤ 2,5° |
| Kartta ja pallo (`KarttaRajat`) | 3,6 näkymää/s | 24 | 125 °/s | zoomi 5,4 ln/s |
| Ruutuaika | – | – | – | yli 20 ms:n ruutu liikkeessä tai 1 s sen jälkeen = hylkäys |

iPhone ja iPad käyttävät samoja liikerajoja; ero on kehyksessä: pysähdyksessä taulu täyttää 93 % (iPad), iPhonella pystyssä
korkean teoksen täyttö 64 % ja keskikohta 55 % (tilaa nimikyltille ja napeille).

## 4. Museon kamera nyt (kartoitus 21.10.2026)

- Yksi museomoottori (`Museo/MuseoKierros*.cs`) kaikille maille; Orsay ja Rodin ovat Ranskan salin huoneita.
- Kamerajohtajan kautta: **lento** (oletus teoksesta toiseen, `MuseoKierros.Lento.cs` + `Lentokaari`; katse kohti seuraavaa
  oviaukkoa, ajassa tasoitettu), **napautuskävely** (`Osoitus`, Kisko), **ovensuu** ja **taakse**.
- Omat asennon laskijat (yhdistetään lentoon, kun omistaja hyväksyy tavoitteen): kävely V1/V2, nopea kävely, musta siirto
  (vanha, vain QA), tauon kääntö, AutoZoomin liuku ja vapaa kävely (ei kiihtyvyysrajaa).
- Päällekkäistä: mutkien hidastus kolmesti (Kisko, Lentokaari, V1) ja smootherstep neljänä kopiona; yhdistetään Liikepohjaan.

## 5. Tallennus ja video

- **Pelin omat ruudut**: QA `museo tallenna <nimi> <s> <fps>` kiinteällä askeleella (`MuseoSovitin.Tallenne.cs`) →
  `ruudut.csv` + JPEG-ruudut; kuva-arkki `proto-3d/tyokalut/linssiseppa-ajot/lento-kuva-arkki.py` (levyllä), video ffmpegillä `ruudut.csv`:n tahdissa.
- **Ruutuvahti** (`museo ruutuvahti 1`): näytön ja salin kuvan tiivisteet 0,1 s välein; erottaa pelin hypyn simulaattorin
  hypystä. EI samaan skenaarioon tallennuksen kanssa: yhdessä ne tekevät koko 3D:stä mustan (21.10.2026).
- **Esirenderöity video** (laatu ratkaisee, ei vuorovaikutusta): `docs/moduulit/tuotantopohjat/esirenderoity-video.md`
  (pysty ja vaaka, HEVC 10-bit kevyellä rakeisuudella; teksti käyttöliittymästä, ei videoon).

## 6. Tyypilliset virheet

1. **Kameran suora siirto** sovittimessa → kameravahti hylkää; tee liike Ytimeen.
2. **Kulmien sekoitus lyhintä tietä kahden muuttuvan suunnan välillä** → ±180°:n hyppy; laske ero jatkuvana taulukkona.
3. **Raja mitattu eri tavalla kuin tarkastus** (esim. kiihtyvyys eri ikkunalla) → oma sovitus läpäisee, testi kaatuu; mittaa
   kuten `Kameratarkastus` (ruuduittain 60 fps, ±0,05 s).
4. **Yksi tiukka kohta heikentää koko lennon** (globaali kerroin) → tasoita paikallisesti ajassa.
5. **Perillä tyhjää**: pääkohde ei ehtinyt; lataa pääkohde ensin, odota enintään 10 s, sitten varakuva ja ristihäivytys.
6. **Simuvideon hyppy luultu pelin hypyksi** → todista kameralokilla ja ruutuvahdilla ennen korjausta.
7. **Testin tilavuoto**: staattinen lippu jää testin jälkeen eri arvoon (KavelyV2 21.10.) → palauta aina entinen arvo.
8. **Koordinaattinapautus skenaariossa** osuu ohi asettelun muuttuessa → käytä QA-komentoa tai `tap-teksti`.

## 7. TÄYDENTÄÄ: Valoseppä (valaistus, rytmi ja leikkaus videossa)

*(Valoseppä kirjoittaa: valo kohtauksissa ja videossa, valotus ja jälkikäsittely, rytmi ja leikkaus.)*
