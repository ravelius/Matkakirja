# Linssit Euroopassa: kartoitus aarrepalkkioiksi (Fable 21.9.2026)

Omistajan ehdotus 21.9.2026 (tekstisessio): kartoitetaan, mitkä
linssikatalogin ideat koskevat Eurooppaa ja kuinka monta niitä on, jotta
ne voidaan tehdä ensin tai ainakin ottaa mukaan suunnitteluun siitä,
mihin kaupunkeihin linssit tulevat aarrelöytöjen palkkioksi. Tällaiset
linssit voidaan ottaa peliin palkkioiksi heti omine ikoneineen, vaikka
ne eivät vielä toimi (alfa). Kun pelaaja löytää keskeneräisen linssin,
peli ilmoittaa, ettei linssi ole vielä valmis, ja antaa hyvityksenä
rahallisen korvauksen. Sen jälkeen päätetään yhdessä linssien määrä,
toteutustapa ja järjestys.

Lähde: docs/linssikatalogi.md (112 ideaa: 68 aikajanalinssiä, 31
aluelinssiä, 13 virtalinssiä). Nykyinen mekaniikka (js/linssit/omistus.js):
linssi löytyy mantereen linssilaatasta tai tietäjäpisteiden neljältä
kynnykseltä; kerran löydetty linssi säilyy passissa pelikerrasta toiseen.

## Lukumäärät

| joukko | kpl | huomio |
|---|---|---|
| selvästi Eurooppaan sijoittuvat aikajanalinssit | 21 | joista B1 Keksinnöt valmis |
| selvästi Eurooppaan sijoittuvat aluelinssit (M–Q) | 17 | joista Q1 Isoisän linssi ja Q2 Atlaslehti jo työn alla |
| **Eurooppa yhteensä** | **38** | tila: 1 valmis, 2 rakenteilla, n. 9 "seuraava", n. 26 idea |
| Eurooppaa sivuavat (alku tai osa pysäkeistä Euroopassa) | 14 | A3, B6, C1, C2, D1, D2, E4, E5, F1, F4, I3/M7, S2, T1, U1 |
| Euroopan ulkopuoliset | 60 | H–L, muut alue- ja virtalinssit |

Päällekkäisyys: G1 Taudit ja rokotukset on käytännössä B3 + P2, joten
Euroopan aidosti erillisiä aiheita on 37.

## Ankkurikaupungit (ehdotus)

Kaupungit ovat pelin nykyisiä kaupunkeja (js/packs/maakartat.js).
Lontoo, Pariisi, Berliini, Wien ja Rooma kantavat kaksi tai kolme
linssiä, koska ne ovat isoisän reitin ja historian solmuja; muut yhden.
Rengas 1 = ehdotus ensimmäiseksi eräksi (aiheet, joiden pysäkit ovat jo
pelin hetkiä tai kohteita, tai jotka omistaja on jo päättänyt).

### Aikajanalinssit (moottori 1)

| # | linssi | ankkuri | tila | rengas |
|---|---|---|---|---|
| B1 | Keksinnöt Euroopassa | Lontoo | valmis | 1 |
| A2 | Kristinusko leviää Eurooppaan | Rooma | seuraava | 1 |
| A4 | Uskonpuhdistus | Berliini (Wittenberg DEU-laudalla) | seuraava | 1 |
| B2 | Tiede ennen höyryä | Krakova (Kopernikus) | seuraava | 1 |
| B3 | Lääketieteen läpimurrot | Budapest (Semmelweis) | seuraava | 1 |
| D4 | Vallankumousten Eurooppa | Pariisi (Bastilji) | idea | 1 |
| E1 | Renessanssi | Firenze | idea | 1 |
| E2 | Säveltäjien Eurooppa | Wien | idea | 2 |
| E3 | Kirjallisuuden kaupungit | Edinburgh | idea | 2 |
| D3 | Hansa | Tallinna | idea | 2 |
| D5 | Kansallisvaltiot syntyvät | Bryssel (Belgia 1830) | idea | 2 |
| C6 | Ilmailun synty | Pariisi (Montgolfier, Blériot) | idea | 2 |
| B4 | Sähkö ja viestintä | Kööpenhamina (Ørsted) | idea | 2 |
| B5 | Kartografia ja mittaaminen | Amsterdam (Blaeu) | idea | 2 |
| E6 | Museot ja kirjastot | Pietari (Eremitaasi) | idea | 3 |
| G2 | Raha ja pankit | Amsterdam (pörssi 1602) | idea | 3 |
| G3 | Ruoan ja juoman historia | Praha (Pilsen) | idea | 3 |
| G4 | Urheilun synty | Ateena (1896) | idea | 3 |
| G6 | Posti ja sähkösanoma | Lontoo (Penny Black) | idea | 3 |
| A7 | Luostarit ja kirjat | Dublin (Iona, Kells) | idea | 3 |
| G1 | Taudit ja rokotukset | — (sulautuu B3 + P2) | idea | — |

### Aluelinssit (moottori 2)

| # | linssi | ankkuri | tila | rengas |
|---|---|---|---|---|
| Q1 | Isoisän linssi 1873 | Lontoo (tarinan lahja, ei aarre) | aineisto valittu | 1 |
| Q2 | Atlaslehti (Stieler 1875) | Berliini (Gotha DEU-laudalla) | vedos työn alla | 1 |
| N1 | Napoleonin Eurooppa | Pariisi | seuraava (2. aluelinssi) | 1 |
| N2 | Ensimmäinen maailmansota | Sarajevo | seuraava (3.) | 1 |
| M2 | Rooman nousu ja tuho | Rooma | seuraava (4.) | 1 |
| N3 | Toinen maailmansota | Berliini | seuraava (5.) | 2 |
| O6 | Euroopan kartta uusiksi 1815–1923 | Wien (kongressi 1815) | seuraava | 2 |
| M6 | Bysantti | Istanbul | idea | 2 |
| M8 | Reconquista | Granada | idea | 2 |
| M9 | Viikinkien maailma | Oslo | idea | 2 |
| M10 | Ruotsin suurvalta ja Suomi | Tukholma | idea | 2 |
| N7 | Balkanin sodat | Sofia | idea | 3 |
| N5 | Krimin sota | Odessa | idea | 3 |
| N4 | Kolmikymmenvuotinen sota | Praha | idea | 3 |
| P2 | Musta surma | Marseille | idea | 3 |
| P4 | Rautatieverkon kasvu | Bryssel | idea | 3 |
| P5 | Kirjapainon leviäminen | Venetsia | idea | 3 |

Renkaat: 1 = 12 linssiä (1 valmis, 2 rakenteilla, 9 päätettyä tai
pelin hetkiin nojaavaa), 2 = 13, 3 = 12.

### Eurooppaa sivuavat, jos halutaan mukaan

C1 Löytöretket → Lissabon · C2 Napa-alueet → Oslo · D1 Antiikin kaupungit
→ Ateena · D2 Silkkitie → Venetsia · E4 Maailmannäyttelyt → Lontoo ·
E5 Arkkitehtuurin ihmeet → Rooma · I3/M7 Osmanit → Istanbul · U1
Sähkösanomakaapelit → Lontoo · T1 Siirtolaisuus Amerikkaan → Helsinki
(Hanko) · B6 Observatoriot → Kööpenhamina · S2 Kolmiokauppa → Lissabon ·
F1, F4, A3 myöhemmin.

## Fablen arvio

1. **Idea kantaa.** Linssi paikkaan sidottuna (Uskonpuhdistus
   Wittenbergistä, Reconquista Granadasta) tekee aarteesta merkityksellisen
   ja näyttää pelaajalle jo alfassa, mihin peli kasvaa. Se antaa myös
   Codexille selkeän ikonitilauksen.
2. **38 on liikaa yhdeksi eräksi.** Ehdotan rengasta 1 (12 linssiä)
   ensimmäiseksi palkkiosarjaksi; renkaat 2 ja 3 tulevat peliin sitä mukaa
   kuin laudat ja aarreluettelo kasvavat.
3. **Kolme linssiluokkaa erilleen.** Työkalulinssit (pallo, satelliitti,
   topografia, vesistöt, vertailu, maatiedot, radio, Ihmisen matka) pysyvät
   tietäjäpistekynnyksillä ja mantereiden linssilaatoilla. Historialinssit
   (tämä lista) tulevat kaupunkien aarrepalkkioiksi. Isoisän linssi 1873 on
   tarinan lahja isoisän matkakirjan mukana, ei aarre.
4. **Keskeneräinen linssi tarinan kielellä.** Ei "ominaisuus puuttuu"
   -ilmoitusta vaan: linssi on optikolla hiottavana, ja optikko maksaa
   odotuksesta hyvityksen. Linssi näkyy laukussa harmaana ikonina
   "hiomassa"; kun se valmistuu, se herää käyttöön itsestään (sääntö
   "kerran nähtyä maailmaa ei oteta pois"). Hyvityksen suuruus sidotaan
   pelin nykyisiin palkkioihin (Pelikoodari ehdottaa).
5. **Ikonit yhtenä sarjana.** 38 ikonia samassa kädessä kuin Codexin
   nostotyyppimerkit; tilaus lähtee vasta, kun omistaja on vahvistanut
   listan ja renkaan.

## Omistajan päätettäväksi

- Renkaan 1 koko ja sisältö (ehdotus 12 yllä).
- Näkyvätkö renkaiden 2–3 linssit pelissä jo nyt hiomassa-ikoneina vai
  vasta, kun ne ovat rakenteilla.
- Hyvityksen periaate (kiinteä summa vai osuus aarteen arvosta).
- Ikonitilaus Codexille koko sarjasta vai renkaasta 1.

Kun päätökset on tehty: Fable kirjaa linjauksen Raamattuun ja lokiin,
Pelikoodari toteuttaa hiomassa-tilan ja hyvityksen, Sisältökirjuri liittää
linssit aarreluetteloon kaupungeittain, Codex piirtää ikonit.

## Linssien paino: kevyt vai raskas (omistajan kysymys 21.9.2026)

Omistaja: avaruuslinssi on kevyempi ja hauskempi (ei alkuanimaatiota,
heti tutkittavissa, visuaalinen), Ihmisen matka raskaampi (pitkä
alkuanimaatio). Jos raskaita on paljon, tarvitaan myös linssejä, jotka
ovat vain hauskoja ja pelillisiä, jotta into löytää lisää pysyy korkeana.
Peli ei saa muuttua tietoähkyksi eikä tehtäväkoneeksi. Maailmanradio on
kevyt: ei kysymyksiä, ei pakkoa oppia.

### Nykyiset linssit painon mukaan

| paino | linssi | miksi |
|---|---|---|
| kevyt (leikki, katselu) | Maailmanradio, Astronautin kamera, Karttapallo, Topografia, Vesistöt | ei kaarta, ei kysymyksiä, heti käsissä; oppi tulee sivutuotteena |
| keskiraskas (selaus) | Maiden tiedot, Vertailu | lukemista, mutta pelaaja valitsee itse mitä ja kuinka kauan |
| raskas (kaari) | Keksinnöt Euroopassa, Ihmisen matka | kello, pysäkit, alkuanimaatio, luenta; katsotaan alusta loppuun |

Katalogin 112 ideaa ovat lähes kaikki raskaita: aikajana-, alue- ja
virtalinssit ovat kaaria. Ilman vastapainoa suhde olisi 2 kevyttä : 20
raskasta jo Euroopan renkaassa 1.

### Fablen ehdotus: kolme painoluokkaa ja suhde 1 : 1 : 1

1. **Leikkilinssit** (ei kaarta, ei kysymyksiä, ei luentaa): maailma
   muuttuu heti sormen alla. Löytö palkitsee itsessään.
2. **Katselulinssit** (kevyt kaari tai vapaa selaus, enintään 1–2
   pulun kysymystä, luenta valinnaisena).
3. **Tarinalinssit** (nykyiset kaaret: kello, pysäkit, luenta, kortit).

Jokaisen tarinalinssin rinnalle tulee yksi leikki- ja yksi katselulinssi,
ja aarreluettelossa ne vuorottelevat, jotta kaksi raskasta ei tule
peräkkäin. Raskaan linssin alkuanimaatio saa aina ohituksen (Ihmisen
matkaan ensimmäisenä).

### Leikkilinssi-ideoita (uusia, ei katalogissa)

| linssi | mitä tapahtuu | huomio |
|---|---|---|
| Yökartta | maapallo yöllä, kaupunkien valot; sormella voi sammuttaa maan | rekisterissä jo tynkä `yokartta` |
| Tuulet ja pilvet | elävä tuulikartta, pilvet liukuvat, sormi pyörittää myrskyä | tynkä `tuulet`; data avoimista lähteistä |
| Tähtitaivas | isoisän yön taivas kaupungin yllä, tähdistöt syttyvät kosketuksesta | tynkä `tahdet` |
| Muuttolinnut | kurjet ja pääskyt lentävät kartalla vuodenkierron mukaan, pelaaja nopeuttaa vuotta | F2/U3 katalogissa, tehdään leikkinä |
| Isoisän kamera | kartta ja kortit vanhan valokuvan asussa, pelaaja "ottaa kuvia" laukkuun | vain visuaalinen suodatin, halpa |
| Äänikartta | jokaisella kaupungilla oma ääni (satama, tori, kellot); sormi liikkuu, äänet sekoittuvat | radion sisar, sama äänivarasto |
| Kellot | aikavyöhykkeet: mikä kello missäkin nyt ja isoisän aikaan ilman vyöhykkeitä | pieni, hauska, lukema muuttuu heti |
| Lippuarvaus | lippu nousee kartalle, pelaaja napauttaa maata; sarjat ja ennätys | pelillinen, ei opetusta suoraan |
| Laivat ja junat nyt | elävä liikenne (AIS/avoin data) pallolla | kevyt jos data saatavilla; muuten simuloitu |
| Vuodenajat | lumi ja vihreys vaeltavat pallolla, sormella kuukausi | satelliittikuvasarjat, ei kysymyksiä |

### Katselulinssi-ideoita

Maailman ruoat kartalla (G3 kevyenä: kuva ja yksi lause), Maailman
musiikki (radion jatke, soittolista kaupungeittain), Maailman eläimet
(F2 ilman kaarta), Suurimmat kaupungit vuosi vuodelta (pallot kasvavat),
Kielten kartta (tynkä `kielet`).

### Suositus

Renkaan 1 kahdentoista tarinalinssin rinnalle valitaan 6 leikkilinssiä
ja 4 katselulinssiä, jolloin ensimmäisessä sarjassa on 22 linssiä ja
raskaita alle puolet. Ikonitilaus Codexille lähtee vasta, kun tämä
kokonaisuus ja tyyli on päätetty (omistaja 21.9.2026).
