# Horatio–Livia r2 — parimitta, TTS ja cue-ehdotus

Sisältörevisio: `eu-hl-pilot-20260913-r2-approved1`
Vertailurevisio: julkaistu nykykaanon, `origin/main`
`079284e1cf09f650ed7e5f3d54f54c4e3da933b1` (v1819); neljän kaupungin
tekstipakit ovat muuttumattomat aiemmasta `dd7154a`-vertailusta  
Tila: sanat hyväksytty tekniseen RC-jatkotyöhön; ei audio-, kuva- tai julkaisuvaltuutta

R1 säilyy muuttamattomana rinnakkaisena luonnoksena tiedostossa
`docs/raportit/horatio-livia-pilottikortit-20260912.md`. R2 on kirjoitettu
kaupunkipakkeihin sisältörevisioksi. Vanha r1-TTS-ajopaketti on merkitty
korvatuksi; RC-vetäjä muodostaa r2:n varsinaisen teknisen ajopaketin.

## Yhteinen kuuntelubudjetti

Merkit ja sanat lasketaan näkyvistä teksteistä. Arvio käyttää vain toimituksen
vertailulukuna 14 merkkiä sekunnissa; se ei ole mitattu äänen kesto. Lopullinen
kesto, puheen rajat ja cue-ajat saadaan hyväksytystä audiosta ja forced
alignmentista.

| Kaupunki | Lähtö Horatio | Lähtö Livia | Lähtö pari | r2 Horatio | r2 Livia | r2 pari | Muutos |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Marseille | 341 m / 45 sanaa / ~24,4 s | 89 m / 11 sanaa / ~6,4 s | 430 m / 56 sanaa / ~30,7 s | 252 m / 31 sanaa / ~18,0 s | 149 m / 19 sanaa / ~10,6 s | 401 m / 50 sanaa / ~28,6 s | −29 m / −6 sanaa / −6,7 % merkeistä |
| Ateena | 346 m / 43 sanaa / ~24,7 s | 103 m / 14 sanaa / ~7,4 s | 449 m / 57 sanaa / ~32,1 s | 261 m / 32 sanaa / ~18,6 s | 140 m / 18 sanaa / ~10,0 s | 401 m / 50 sanaa / ~28,6 s | −48 m / −7 sanaa / −10,7 % merkeistä |
| Sarajevo | 328 m / 39 sanaa / ~23,4 s | 108 m / 15 sanaa / ~7,7 s | 436 m / 54 sanaa / ~31,1 s | 238 m / 27 sanaa / ~17,0 s | 168 m / 23 sanaa / ~12,0 s | 406 m / 50 sanaa / ~29,0 s | −30 m / −4 sanaa / −6,9 % merkeistä |
| Venetsia | 348 m / 45 sanaa / ~24,9 s | 106 m / 14 sanaa / ~7,6 s | 454 m / 59 sanaa / ~32,4 s | 227 m / 28 sanaa / ~16,2 s | 215 m / 30 sanaa / ~15,4 s | 442 m / 58 sanaa / ~31,6 s | −12 m / −1 sana / −2,6 % merkeistä |

Taulukossa `m` = merkkiä ja `s` = sekuntia. Kaikkien neljän parin sana- ja
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

> [curious] Schliemannin talo on nyt rahamuseo. [mischievously] Etsin puutarhasta varjoa, mutta kahvilan pöytien alta löytyi pullanmuruja. [brightly] Siinä unohtui varjo hetkeksi!

### Sarajevo

Horatio:

> [curious] Sarajevon kupariseppä naputti pannua vasaralla, jonka olisin hukannut taskuun. Viereisessä puodissa oli samanlainen kahvipannu. Olin juonut aamulla katsomatta; nyt näin jokaisen jäljen. [softly] Basaarin kilkutuksessa aamiainen muuttui käsityöksi.

Livia:

> [softly] Kuparisepät naputtavat basaarissa yhä. [curious] Minun piti vain piipahtaa, mutta jäin kuuntelemaan yhtä vasaraa. [mischievously] Yritin naputtaa nokalla samaa tahtia — seppä oli kyllä nopeampi!

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
| `ateena.livia.c3` | `Etsin puutarhasta varjoa` | 1 | `ilo` | 0,35 |
| `ateena.livia.c4` | `pöytien alta löytyi pullanmuruja` | 1 | `ilo` | 0,55 |
| `ateena.livia.c5` | `unohtui varjo hetkeksi` | 1 | `ilo` | 0,45 |
| `sarajevo.livia.c1` | `basaarissa yhä` | 1 | `selittaa` | 0,40 |
| `sarajevo.livia.c3` | `jäin kuuntelemaan yhtä vasaraa` | 1 | `lammin` | 0,45 |
| `sarajevo.livia.c4` | `naputtaa nokalla samaa tahtia` | 1 | `ilo` | 0,55 |
| `sarajevo.livia.c5` | `seppä oli kyllä nopeampi` | 1 | `ilo` | 0,50 |
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
