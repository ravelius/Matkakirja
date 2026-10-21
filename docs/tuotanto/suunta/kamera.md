# A Suunta: kamera

*(Linssiseppä 21.10.2026, studiojako Raamattu 4.21. Mitä kameran pitää tuntua ja miltä hyvä ja huono näyttävät. Tekotapa
on B:ssä `docs/tuotanto/tekotavat/kamera-ja-video.md`, luvat ja vaiheet D:ssä. Säännöt: Raamattu 2.68, 2.69, 2.202, 4.23,
4.24.)*

## Tuntuma yhdellä lauseella

Kamera kuljettaa katsojaa kuin rauhallinen opas: lähtee levosta, kiihtyy pehmeästi, katsoo minne mennään ja pysähtyy
pehmeästi juuri siihen, mistä seuraava asia näkyy parhaiten. Katsoja muistaa kohteen, ei kameraa.

## Omistajan päätökset

- **21.10.2026 klo 18.20:** yksi pehmeä kaari, ei mustia välähdyksiä eikä häivytyksiä siirroissa ("Kyllä", 2.202).
- **21.10.2026 klo 18.20, museot:** "Kamera voi olla pehmeä ja silti nopea. Tärkeintä on, miten siihen nopeuteen päästään.
  Kaikki kiihdytykset pitää olla hallittuja."
- **21.10.2026 klo 18.20, tyylit:** kameralla on tilanteen mukaan eri tyylejä, joilla on paljon yhteistä mutta myös eroja;
  ne eritellään alla ja käydään omistajan kanssa yksi kerrallaan (luku "Kameratyylit tilanteittain").

## Periaatteet

1. **Yksi pehmeä kaari** (2.202). Kaikki akselit (paikka, suunta, kallistus, kuvakulma) liikkuvat samalla käyrällä ja alkavat
   ja päättyvät yhtä aikaa. Ei mustia välähdyksiä eikä häivytyksiä siirroissa.
2. **Ei pyöritystä** (2.69). Kamera etenee sivuttain tai vinosti kuin sivuttain astuva ihminen. Iso suunnanmuutos tehdään
   samalla kaarella, ei paikallaan pyörähtäen.
3. **Katse menosuuntaan, sitten kohteeseen.** Salista toiseen katse siirtyy alussa oviaukkoon ja lopussa kohteeseen. Pitkää
   tyhjää seinää ei katsota.
4. **Tempo kuin elokuvassa** (2.68, 4.23). Lyhyt siirto on lyhyt liuku, pitkä matka nopeampi lento; nopeus vaihtelee
   pehmeästi, ei koskaan lineaarisesti. Kova kiihdytys vain harkittuna tehokeinona.
5. **Perillä on jo valmista** (4.24). Kun kamera pysähtyy, kohde on ladattu ja terävä. Tyhjä jalusta tai sumea kuva perillä
   on virhe, ei odotus.
6. **Kehys kohteen ehdoilla.** Pysähdyksessä kohde täyttää kuvan rauhallisesti (taulu noin 93 %, iPhonella pystyssä tilaa
   nimikyltille ja napeille) ja on keskellä tai sovitussa kohdassa.
7. **Pelaajan oma liike tuntuu samalta** kuin automaattinen: napautus, peruutus ja vapaa kävely noudattavat samaa pehmeyttä.

## Kameratyylit tilanteittain

*(LUONNOS: rivit odottavat omistajan vastausta, yksi kysymys tilannetta kohden KK:n kortilla. Hyväksytty rivi merkitään päivämäärällä.)*

### Yhteistä kaikille tyyleille

1. Lähtö ja pysähdys levosta; kiihdytys ja jarrutus pehmeitä ja hallittuja: kiihtyvyys kasvaa nollasta (rajattu nykäys), ei
   äkillistä nopeuden muutosta.
2. Kaikki akselit samalla kaarella; jatkuvuus edellisen liikkeen paikasta, suunnasta ja nopeudesta.
3. Ei pyöritystä paikallaan, ei mustia välähdyksiä eikä häivytyksiä siirroissa.
4. Perillä tarvittava on ladattu ennen liikettä; perillä ei tyhjää eikä sumeaa.
5. Ei nykäyksiä: yli 20 ms:n ruutu liikkeessä on virhe.
6. Tauko pysäyttää kameran, kertojan ja tekstityksen samalla hetkellä.

### Erot tilanteittain

| Tilanne | Tarkoitus | Nopeus ja tempo | Katse | Kuka ohjaa | Erityistä | Malli nyt |
|---|---|---|---|---|---|---|
| Aloituslento | säväyttävä alkukohtaus (2.68) | dramaattinen: kuminauhamainen kiihdytys ja jarrutus, tempo vaihtelee | pallosta kohteeseen, lopuksi kaupunkiin | automaattinen, ohitettavissa | ainoa paikka, jossa kova kiihdytys on harkittu tehokeino | `Kartta/AloituslennonRata`, `LennonV3` |
| Kartan lennot | siirtyminen paikasta toiseen pallolla | nopea mutta pehmeä, kesto matkan mukaan | menosuuntaan, perillä kohteeseen | peli (Pulun paikka, matkat) | nousukaari pitkällä matkalla; paluunappi | `PalloRata`, `PalloAjo`, `Nappula.LentoV3` |
| Linssit | kerronnan tahdissa etenevä esitys | rauhallinen, pysäkki pysäkiltä | aiheeseen; pysäkillä paikallaan | automaattinen, pelaaja keskeyttää | tahti kertojan sana-ajoista | `Kamerakoreografia`, `Aikajana/Kameramatikka` |
| Museot | opastettu kierros teoksesta toiseen | pehmeä ja silti nopea (lento ≤ 9 m/s), hallitut kiihdytykset | oviaukkoon, perillä teokseen | automaattinen; pelaaja voi napauttaa | ei mustaa; kehys teoksen ehdoilla | `Lentokaari`, `MuseoKierros.Lento` |
| Pelien seurantakamera | pelaajan liikkeen seuraaminen | seuraa pelaajaa viiveettä mutta ilman tärinää | pelaajan edelle | pelaaja | korkeus pelin mukaan (juoksupelissä drone ylhäällä, katto pois sisällä) | Seikkailu (Cinemachine `ThirdPersonFollow`), juoksupeli |
| Kohtaukset ja välivideot | elokuvamainen kerronta (4.23) | ohjaajan suunnitelman mukaan, otto kerrallaan | kohtauksen kohteeseen | käsikirjoitettu | otot ja leikkaukset kohtauksen sisällä; valo ja ääni samalla aikajanalla | pallokierrokset, dioraama (Cinemachine), esirenderöity video |
| Kävely | tunne kulkemisesta tilassa | kävelynopeus, pehmeä lähtö ja pysähdys | menosuuntaan vain vähän (~15°), lopuksi kohteeseen | automaattinen tai pelaaja | silmän korkeus, hento askeleen keinunta | museon kävely V2, Seikkailu `Kavely` |

### Avoimet kysymykset omistajalle (yksi kerrallaan)

Kortit KAMERA-1–4 suljettiin 21.10. klo 19.2x vastaamatta; kaikki odottavat omistajan paluuta ma 26.10.2026 (PT). Siihen asti
noudatetaan suositusta vain siinä, mikä on helposti muutettavissa; peliin ei lukita mitään.

| Kysymys | Suositus, odottaa omistajaa |
|---|---|
| KAMERA-1 Aloituslento | ainoa kohta, jossa kamera kiihtyy dramaattisesti (syöksy pallolta kaupunkiin); jarrutus aina pehmeä |
| KAMERA-2 Kartan lennot | katse menosuuntaan; nousukaari vain pitkillä matkoilla |
| KAMERA-3 Linssit | kertojan tahdissa pysäkiltä toiselle; pysäkillä aivan hento liike, ei täysin jähmeä |
| KAMERA-4 Museot | ei nykyistä nopeampi (pisin lento noin 14 s); kiihdytykset hallittuja |
| KAMERA-5 Seurantakamera | hieman pelaajan edellä ja ylhäällä (juoksupelissä drone, sisällä katto pois), ilman tärinää |
| KAMERA-6 Kohtausten sisällä | leikkaus otosta toiseen sallittu vain kohtausten sisällä, ei pelin siirroissa |
| KAMERA-7 Kohtausten välillä | lyhyt ristihäivytys vain videoissa, enintään 0,5 s |
| KAMERA-8a Kävelyn suunta | katse menosuuntaan vain vähän (~15°), lopuksi kohteeseen |
| KAMERA-8b Kävelyn keinunta | niin hento, ettei sitä huomaa erikseen |

## Hyvä ja huono (laatutaso)

| | Esimerkki | Miksi |
|---|---|---|
| HYVÄ | Louvre, Mona Lisa → Salon Carré, katse kulkusuuntaan (laiteajo LT kierros 13: `proto-3d/_tyo/linssiseppa2/varjot-koko/kierros13/kontakti-lento-katse1.png`) | Oviaukko näkyy ennen kuin siitä mennään; pehmeä lähtö ja pysähdys; ei mustaa |
| HUONO | Sama lento ilman kulkusuuntaa (kierros 12: `…/kierros12/kontakti-lento-se-da.png`) | Kamera katsoi neljän ruudun ajan tyhjää sinistä väliseinää |
| HUONO | Napautusliuku 55 m/s (omistaja 19.10. 08.20: "ei ole hyväksyttävä kokemus") | Liian nopea; korvattu lennolla |
| HUONO | Leiden 19.10.: perillä tyhjä jalusta (kohdepatsas ei ehtinyt latautua) | Perillä ei ollut valmista |
| HUONO | Mona Lisan ~3 m hyppy kävelyssä (19.10.) | Jatkuvuus katkesi; johti yhteen kamerajärjestelmään (4.24) |
| HYVÄ | Pariisin nykyintro (kohtauslista `docs/kohtaukset/pallokierros/pariisi-nykyintro.md`) | Jokaisella otolla nimetty liike, kesto ja lopputila |

Kuvat ovat levyllä (proto-3d/_tyo), eivät repossa; uusi hyväksytty esimerkki lisätään tähän taulukkoon polkuineen.

## Mittarit, joilla tuntuma tarkistetaan

Tuntumaa ei arvioida silmämääräisesti yksin: kameratesti ja ruutuaikavahti (B) mittaavat jatkuvuuden, pehmeän alun ja lopun,
nopeuden, kiihtyvyyden ja kääntönopeuden. Raja-arvot ovat B:ssä; tämä sivu kertoo, mihin niillä pyritään.
