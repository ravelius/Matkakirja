# Horatio–Livia r2 — parimitta, TTS ja cue-ehdotus

Sisältörevisio: `eu-hl-pilot-20260912-r2-candidate1`  
Vertailurevisio: julkaistu nykykaanon, `origin/main`
`079284e1cf09f650ed7e5f3d54f54c4e3da933b1` (v1819); neljän kaupungin
tekstipakit ovat muuttumattomat aiemmasta `dd7154a`-vertailusta  
Tila: sisältöehdokas parikatselmukseen; ei audio- tai julkaisuvaltuutta

R1 säilyy muuttamattomana rinnakkaisena luonnoksena tiedostossa
`docs/raportit/horatio-livia-pilottikortit-20260912.md`. R2 ei ole kirjoitettu
kaupunkipakkeihin eikä nykyiseen RC:n TTS-ajopakettiin.

## Yhteinen kuuntelubudjetti

Merkit ja sanat lasketaan näkyvistä teksteistä. Arvio käyttää vain toimituksen
vertailulukuna 14 merkkiä sekunnissa; se ei ole mitattu äänen kesto. Lopullinen
kesto, puheen rajat ja cue-ajat saadaan hyväksytystä audiosta ja forced
alignmentista.

| Kaupunki | Lähtö Horatio | Lähtö Livia | Lähtö pari | r2 Horatio | r2 Livia | r2 pari | Muutos |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Marseille | 341 m / 45 s / ~24,4 s | 89 m / 11 s / ~6,4 s | 430 m / 56 s / ~30,7 s | 252 m / 31 s / ~18,0 s | 149 m / 19 s / ~10,6 s | 401 m / 50 s / ~28,6 s | −29 m / −6 s / −6,7 % merkeistä |
| Ateena | 346 m / 43 s / ~24,7 s | 103 m / 14 s / ~7,4 s | 449 m / 57 s / ~32,1 s | 261 m / 32 s / ~18,6 s | 152 m / 21 s / ~10,9 s | 413 m / 53 s / ~29,5 s | −36 m / −4 s / −8,0 % merkeistä |
| Sarajevo | 328 m / 39 s / ~23,4 s | 108 m / 15 s / ~7,7 s | 436 m / 54 s / ~31,1 s | 238 m / 27 s / ~17,0 s | 177 m / 25 s / ~12,6 s | 415 m / 52 s / ~29,6 s | −21 m / −2 s / −4,8 % merkeistä |
| Venetsia | 348 m / 45 s / ~24,9 s | 106 m / 14 s / ~7,6 s | 454 m / 59 s / ~32,4 s | 227 m / 28 s / ~16,2 s | 215 m / 30 s / ~15,4 s | 442 m / 58 s / ~31,6 s | −12 m / −1 s / −2,6 % merkeistä |

Taulukossa `m` = merkkiä, `s` = sanaa. Kaikkien neljän parin sana- ja
merkkisumma pienenee. Lyhennys syntyy sanojen poistamisesta, ei pelkästä
välimerkkien yhdistämisestä tai puheen nopeuttamisesta. Painotus vaihtelee:
Sarajevo ja Venetsia siirtävät aikaa Livialle, Marseille ja Ateena pitävät
Horation selvemmin etualalla.

## Täsmälliset TTS-ehdokkaat

Tagien poisto palauttaa näkyvän tekstin sanasta sanaan. Flicker-äänen
tuotantoasetukset kuuluvat RC-vetäjälle; tässä omistetaan vain sanat ja
sisältöön sidotut tunneohjeet.

### Marseille

Horatio:

> [curious] Marseillen satamassa saippuaa myytiin tiiliskivinä, kuulemma koko maailman pesuun. Kauppiaan mustat kynnet kertoivat köysitöistä. Ostin palan, mutta terva, kala ja suolavesi seurasivat majataloon. [softly] Maailma jäi likaiseksi; käteni olivat jo toista mieltä.

Livia:

> [curious] Marseillen saippuaa tehdään yhä. [warmly] Minä erotan Vieux-Portin jo äänestä ja suolasta höyhenissä. [mischievously] Lokit tuntevat jokaisen pöydän. [softly] Minä vasta harjoittelen.

### Ateena

Horatio:

> [curious] Ateenassa Troijan kullasta puhuttiin kuin kaikki olisivat olleet kaivamassa. Kahvilan isäntä piti Schliemannia nerona, asiakas varkaana; kultaa ei ollut kummallakaan näyttää. Akropolis ei tarvinnut mainosta. [softly] Maksoin kahvin kolikolla, jonka alkuperää ei kysytty.

Livia:

> [curious] Schliemannin talo on nyt rahamuseo, ja puutarhassa toimii kahvila. [mischievously] Minä etsin varjoa — ja kurkin samalla, [softly] saisiko vitriinejä katsella kahvikupin kanssa.

### Sarajevo

Horatio:

> [curious] Sarajevon kupariseppä naputti pannua vasaralla, jonka olisin hukannut taskuun. Viereisessä puodissa oli samanlainen kahvipannu. Olin juonut aamulla katsomatta; nyt näin jokaisen jäljen. [softly] Basaarin kilkutuksessa aamiainen muuttui käsityöksi.

Livia:

> [softly] Kuparisepät naputtavat basaarissa yhä. [curious] Minun piti vain piipahtaa, mutta jäin kuuntelemaan yhtä vasaraa. [softly] Kun havahduin, kahvi oli jo jäähtynyt. [mischievously] Harmitti vähän — mutta vain vähän.

### Venetsia

Horatio:

> [curious] Venetsiassa majatalon ovi avautui veteen, ja olin astua uimaan. Gondolieri piti ilmeensä suorana. Palatsien välissä kuulin lusikan osuvan kahvikuppiin yläkerrassa. [softly] Taloilla oli hienot julkisivut; vesi kuunteli niiden aamiaista.

Livia:

> [brightly] Venetsiassa kuljetaan yhä vesibusseilla. [warmly] Minä lennän nykyään vähän pidempää reittiä. [whispers] Yhden tutun takia. Hetkinen — nuo kuvat ovat yksityisiä! [mischievously] Hän vain sattui jokaiseen hyvään kuvakulmaan. [softly] No, ehkä minä vähän odotin.

## Livian r2-cuet

Poistettua cue-ID:tä ei käytetä uudelleen. `occurrence` on jokaisessa 1.
Tarkoitusavaimet ovat teknisiä ASCII-avaimia; näkyvän tekstin sävy ei riipu
pelkästä tagista.

| cueId | ankkuri | occurrence | tarkoitus | voima |
| --- | --- | ---: | --- | ---: |
| `marseille.livia.c1` | `saippuaa tehdään yhä` | 1 | `selittaa` | 0,40 |
| `marseille.livia.c3` | `Vieux-Portin jo äänestä` | 1 | `lammin` | 0,45 |
| `marseille.livia.c2` | `Lokit tuntevat jokaisen pöydän` | 1 | `ilo` | 0,45 |
| `marseille.livia.c4` | `Minä vasta harjoittelen` | 1 | `miettiva` | 0,35 |
| `ateena.livia.c1` | `nyt rahamuseo` | 1 | `selittaa` | 0,45 |
| `ateena.livia.c3` | `Minä etsin varjoa` | 1 | `ilo` | 0,35 |
| `ateena.livia.c4` | `saisiko vitriinejä katsella` | 1 | `miettiva` | 0,45 |
| `sarajevo.livia.c1` | `basaarissa yhä` | 1 | `selittaa` | 0,40 |
| `sarajevo.livia.c3` | `jäin kuuntelemaan yhtä vasaraa` | 1 | `lammin` | 0,45 |
| `sarajevo.livia.c4` | `kahvi oli jo jäähtynyt` | 1 | `hammentynyt` | 0,45 |
| `sarajevo.livia.c5` | `Harmitti vähän` | 1 | `ilo` | 0,40 |
| `venetsia.livia.c1` | `kuljetaan yhä vesibusseilla` | 1 | `selittaa` | 0,40 |
| `venetsia.livia.c5` | `vähän pidempää reittiä` | 1 | `lammin` | 0,45 |
| `venetsia.livia.c6` | `Yhden tutun takia` | 1 | `rakkaus` | 0,70 |
| `venetsia.livia.c2` | `kuvat ovat yksityisiä` | 1 | `hammentynyt` | 0,55 |
| `venetsia.livia.c3` | `jokaiseen hyvään kuvakulmaan` | 1 | `rakkaus` | 0,80 |
| `venetsia.livia.c7` | `ehkä minä vähän odotin` | 1 | `hammentynyt` | 0,60 |

Varatut mutta r2:ssa poistetut r1-tunnisteet: `ateena.livia.c2`,
`sarajevo.livia.c2` ja `venetsia.livia.c4`. Niitä ei numeroida uudelleen
eikä anneta toiselle merkitykselle.

## Sisältö-QA ennen teknistä RC:tä

1. R2-lukukopio hyväksytään tai palautetaan sanamuutoksiin kokonaisena
   neljän kaupungin settinä.
2. Vasta hyväksynnän jälkeen RC-vetäjä päivittää runtime-cuet, tagirekisterin,
   tekstitiivisteet ja ääniajopaketin.
3. Tagiton TTS tarkistetaan samasanaisuuteen, ja jokainen ankkuri tarkistetaan
   täsmälleen yhteen osumaan.
4. Rajattu maksullinen neljän kaupungin ajo tarvitsee erillisen luvan.
5. Lopulliset sekunnit, SHA:t ja cue-ajat kirjataan vasta valmiista audiosta.
