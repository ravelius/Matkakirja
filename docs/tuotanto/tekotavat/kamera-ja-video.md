# B Tekotavat: kamera ja video

*(Linssiseppä 21.10.2026, studiojako Raamattu 4.21; valaistus ja videon rytmi: Valoseppä, luku 7. Tuntuma ja
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

## 7. Valo, valotus, rytmi ja leikkaus (Valoseppä)

### 7.1 Valo kohtauksessa

| Osa | Missä | Sääntö |
|---|---|---|
| Valon arvot | `Linssit/Ydin/Valo/ValoKohteet.cs` | Kaikki värit, voimat, kulmat ja matkat ovat dataa tässä; varjostimissa ei uusia värivakioita (valovahti; poikkeus vain `// valopoikkeus: syy`) |
| Valon asetus | `Kartta/Valopohja.cs` (`PeliValo`, `PeliValoPois`) | Yksi suunnattu aurinko kohtauksen kerrokselle, globaalit varjostimille; peli ei kirjoita valoja itse; poistuessa kaikki palautetaan |
| Profiilit | `Linssit/Ydin/Valo/ValoProfiilit.cs` (`Kartta`, `Ulko`, `Sisa`, `Avaruus`, `Pienois`, `Juoksu`) | HDR, sävykäyrä, lämpötila, saturaatio, kontrasti per kohtaustyyppi; tilakohtaiset erot deltoina (`Valopohja.Saada`), ei omaa Volumea |
| Valotilat | esim. juoksu: `JuoksuKulta` (kultainen iltapäivä), `JuoksuPaiva` (aurinkoinen päivä) | Uusi tunnelma = uusi datajoukko + QA-kytkin (`ui juoksupeli valo paiva 0\|1`), vanha säilyy A/B-parina |
| Taivas | panoraama (Codex) tai proseduraalinen | Auringon suunta tulee panoraaman metatiedosta, jotta varjot osuvat kuvan aurinkoon; proseduraalisessa suunta datasta |

Mitoitus: valossa oleva vaalea pinta ≈ voima · sin(korkeus) · albedo + täyte ≲ 1,15 (ilman sävykäyrää ei pala puhki);
varjon puoli ei saa mustua (pystypinnan täyte ≈ taivaan ja maan heijastuksen keskiarvo ≥ 0,3).

### 7.2 Varjot ja välke (liikkeessä näkyvät virheet)

- **Varjomatka koko näkymään**: mobiilissa kaksi kaskadia (lähi terävä, kauko pehmeä), häivytys kameran etäisyydestä pitkällä
  matkalla (ei hyppyä). Ylhäältä katsova kamera tarvitsee pidemmän matkan kuin maan tason kamera.
- **Itsevarjoraidat**: lähes valon suuntaiset pinnat → vastaanottajan normaalisiirto (kasvaa etäisyyden mukana).
- **Varjokarttaa hienompi heittäjä** (2 cm:n tiilenpäät palkin päällä) → kohde kiinteään varjoon, ei varjokarttaa.
- **Syvyyskilpailu** (pinta 1–3 cm toisen edessä) näyttää liikkeessä välkkeeltä, pysäytetyssä ruudussa ei → siirrä pintaa
  kameraa kohti varjostimessa tai korjaa malli.
- **Tasavarjostettu tiheä lehvästö** → normaalit keskiarvoon ja hieman ylös.
- **Näkymätön ei heitä varjoa** (häivytetty katto, MASK-alfa myös varjopassissa).
- **Välkkeen mittari**: jäädytetty ruutu + alipikselin käännös (`ui juoksupeli valo jaady 1`, `katse 0.03`) → kuvapari →
  `proto-3d/_tyo/linssiseppa2/varina/varina-mittari.py` (jäännös yli 0,06 = välkkyvä pikseli, osuus erikseen vihreille).
  Vain samasta ruudusta otettu A/B on vertailukelpoinen; botin eri kohdat eivät ole. Laite on lopullinen todiste.

### 7.3 Valotus ja jälkikäsittely

- HDR päällä, valotus kiinteä per profiili (ei automaattivalotusta: kuva ei saa "hengittää" leikkauksen jälkeen).
- Jälkikäsittely profiilista: lämpötila, saturaatio, kontrasti, hento rae ja vinjetti; bloom vain kirkkaille lähteille.
- Liike-epäterävyys vain kameran ja kappaleiden liikkeestä (liikevektorit), pääkohde terävänä.
- Suorituskyky: iso iPad renderöi 0,8-skaalalla ja MSAA 2:lla; jokainen uusi passi mitataan LT:n kanssa ennen peliä.

### 7.4 Rytmi ja leikkaus

1. **Yksi asia per otto**: otto alkaa levosta, liike kantaa yhden syyn (4.23), loppu pysähtyy kohteeseen ≥ 1 s ennen leikkausta.
2. **Leikkaa liikkeessä tai levossa, ei kiihdytyksen keskellä**; peräkkäiset otot samaan suuntaan (ei hyppyä akselin yli).
3. **Valon jatkuvuus**: sama aurinko ja profiili koko kohtauksen; valotila vaihtuu vain kohtausten välissä mustan tai
   ristihäivytyksen (0,3–0,6 s) kautta.
4. **Teksti käyttöliittymästä**, ei videoon poltettuna (kieliversiot).
5. **Kohtausvideot tehdään pelistä** (kiinteä askel, pelin omat ruudut), ei generoituna.

### 7.5 Video simulaattorista (vain tarkastukseen)

- Laitesarja on T7:llä: `source proto-3d/tyokalut/simusarja.sh`, sitten `xcrun simctl --set "$MK_SIMSET" io $(mk_kaanna UDID) recordVideo`.
  Ilman `--set`:iä tulee "Invalid device".
- Pysäytä nauhoitus `kill -INT`:llä ja odota prosessin loppu; kova lopetus jättää tiedoston vajaaksi (vain alku purkautuu).
- Simulaattorin video kertoo sisällön, ei laatua: fps ja välke mitataan laitteella.

## 8. Kohtaukset ja välivideot osiin (4.23 eriteltynä)

*(Omistaja 21.10.2026 klo 18.20: kohtauksessa on "useampi asia päällekkäin", joten jokainen osa tehdään ja tarkistetaan
erikseen ja kootaan yhdelle aikajanalle. Tyyli: `docs/tuotanto/suunta/kamera.md`, rivi "Kohtaukset ja välivideot".)*

| Osa | Mitä tehdään | Tekijä | Työkalu | Tarkistus |
|---|---|---|---|---|
| 1. Ohjaajan suunnitelma | mitä katsoja muistaa; kohtauslista (alkutila, lopputila, syy), syytön siirtymä pois | kohtauksen rakentaja | kohtauksen kansio `docs/kohtaukset/<kohtaus>/` (malli `pallokierros/pariisi-nykyintro.md`) | jokaisella otolla syy |
| 2. Kameran otot | otto = yksi nimetty liike (paikallaan, kisko, orbit, kääntö), kesto ja lopputila | Linssiseppä | Kamerajohtaja (luvut 1–3) | kameratesti ja ruutuaikavahti |
| 3. Kohteiden liike | hahmot, kappaleet, ilmestymiset pehmeästi | Pelikoodari / Lavastaja | Liikepohja, animaatiot | liikevahti (ei omia käyriä) |
| 4. Kertoja ja tekstitys | sana-ajat ohjaavat ottojen ajoitusta; ei tyhjiä taukoja eikä päällekkäistä puhetta | Sisältökirjuri + Äänittäjä | ajat-JSON, tekstityskaista | tekstitys tahdissa (`virke`-loki) |
| 5. Tehosteet ja musiikki | äänet kohtauksen aikajanalla, musiikki kohtauksen mittaan | Äänittäjä | ääniportti | äänitasot ja ajoitus kuvaparilla |
| 6. Valo | sama valo ja profiili koko kohtauksessa | Valoseppä | luku 7.1–7.3 | välkemittari, kuvapari |
| 7. Leikkaus | otot kootaan: leikkaa liikkeessä tai levossa, ei kiihdytyksen keskellä; ei akselihyppyä | kohtauksen rakentaja | luku 7.4 | kuva-arkki |
| 8. Tallennus | pelin omat ruudut kiinteällä askeleella; esirenderöity video tarvittaessa | Linssiseppä / Natiivi-UI | luku 5 | `ruudut.csv`, ei tallennusta ja ruutuvahtia yhtä aikaa |
| 9. Arvio | kuva-arkki tärkeistä hetkistä ja nopeimmista siirtymistä; kolme suurinta virhettä aikaleimoin, korjaus, uusi kuvaus | kohtauksen rakentaja | `lento-kuva-arkki.py` tai vastaava | arvio ennen PT:tä |

Osat 2–6 tehdään samaan aikajanaan (kohtauksen kansio), mutta jokainen tarkistetaan omalla mittarillaan ennen kokoamista;
virhe palautetaan sille osalle, ei koko kohtaukselle.
