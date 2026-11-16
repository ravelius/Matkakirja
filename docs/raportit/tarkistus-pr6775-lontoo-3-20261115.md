# Faktatarkistus PR 6775: Lontoon 3 tarinapaikkaa ja lehtitekstit (15.11.2026)

Haara sk/lontoo-3-tarinapaikkaa, sha 163946f9ca, `git diff origin/main...HEAD`. Riippumaton tarkistaja (Opus), ei koodimuutoksia.
Lyhenteet: N = js/packs/nahtavyysjutut.js, F = js/packs/fokusvirta-lontoo.js, M = js/packs/maa-kategoriat.js.
Robots tarkistettu ennen jokaista sivustoa: handelhendrix.org, english-heritage.org.uk, drjohnsonshouse.org, wiltons.org.uk,
en.wikisource.org, en.wikipedia.org, gutenberg.org (/cache/epub/), british-history.ac.uk: kaikki sallivat. Estolistan sivustoja ei käytetty.

Lähdelyhenteet:
- HH-Ha = https://handelhendrix.org/discover/learn-about-handel ; HH-Hx = https://handelhendrix.org/discover/learn-about-hendrix
- EH-Hx = https://www.english-heritage.org.uk/visit/blue-plaques/jimi-hendrix/
- WP-HHH = https://en.wikipedia.org/wiki/Handel_Hendrix_House ; WP-Mes = https://en.wikipedia.org/wiki/Messiah_(Handel)
- LDN = https://londonist.com/2016/02/jimi-hendrix-s-london (Etchinghamin kertomus levyostoksista)
- DJH = https://www.drjohnsonshouse.org/johnsons-dictionary ; BOS = https://www.gutenberg.org/cache/epub/1564/pg1564.txt (Boswell, rivit 1891–1960)
- EB-J = https://en.wikisource.org/wiki/1911_Encyclopædia_Britannica/Johnson,_Samuel
- WP-Hodge = https://en.wikipedia.org/wiki/Hodge_(cat) ; LR-Hodge = https://www.londonremembers.com/memorials/hodge-the-cat
- RFS = https://regionalfurnituresociety.org/wp-content/uploads/2022/04/rfs-nl-48-boram.pdf ; GRE = https://www.gresham.ac.uk/node/11593
- PEP62 = https://en.wikisource.org/wiki/Diary_of_Samuel_Pepys/1662/May ; PEP69 = https://www.gutenberg.org/cache/epub/4198/pg4198.txt (30.4.1669)
- EB-P = https://en.wikisource.org/wiki/1911_Encyclopædia_Britannica/Punch_(puppet)
- LR-Punch = https://londonremembers.com/memorials/punch-and-judy ; NPA = https://nationalpuppetryarchive.co.uk/guild-100-years/unveiling-plaque-st-pauls-commemorating-mr-punch-1962/
- WP-Snow = https://en.wikipedia.org/wiki/1854_Broad_Street_cholera_outbreak
- WP-221 = https://en.wikipedia.org/wiki/221B_Baker_Street ; JTR = https://www.jack-the-ripper-tour.com/generalnews/letters-to-sherlock-holmes/
- WP-Ch = https://en.wikipedia.org/wiki/Charlie_Chaplin
- WP-FA = https://en.wikipedia.org/wiki/The_Football_Association ; EB-F = https://en.wikisource.org/wiki/1911_Encyclopædia_Britannica/Football ; LR-FT = https://www.londonremembers.com/sites/freemasons-tavern-gt-queen-street
- WIL = https://wiltons.org.uk/heritage/history/ ; WP-Wil = https://en.wikipedia.org/wiki/Wilton%27s_Music_Hall

## 1. Händel ja Hendrix (N 3271–3292, F 1427–1475)

| Väite | Sijainti | Tulos | Lähteet | Korjaus |
|---|---|---|---|---|
| Händel muutti Brook Streetin numeroon 25 vuonna 1723 | N 3275, F 1445 | OK | HH-Ha, WP-HHH | – |
| Asui siellä kuolemaansa 14.4.1759 saakka | N 3276, F 1446 | OK | HH-Ha, WP-HHH | – |
| Messias 22.8.–14.9.1741, 24 päivässä | N 3277, F 1434, 1441, 1447 | OK | HH-Ha, WP-Mes | – |
| Messias syntyi "todennäköisesti" tässä talossa | N 3277, F 1447 | OK (varaus kerrottu) | WP-HHH ("is believed"), HH-Ha ei sano paikkaa | – |
| Hendrix asui numerossa 23 vuosina 1968–69 | N 3281, F 1441, 1450 | OK | EH-Hx (laatta 1968–1969; kesäkuu 1968 – maaliskuu 1969), WP-HHH | – |
| "Kerrotaan" Hendrixin ostaneen Messias-levyn kuultuaan Händelistä | N 3281–3282, F 1450–1451 | OK (kerrottu kertomuksena) | HH-Hx, LDN (Etchingham); EH-Hx: Hendrix ei tiennyt talosta muuttaessaan | – |
| "Reilut kaksisataa vuotta myöhemmin" | N 3280, F 1449 | OK (laskettu 1741→1968) | yllä | – |
| 1873: kuolleena "jo 114 vuotta" | N 3284, F 1452 | EPÄSELVÄ | laskutoimitus; 114 täyttyi vasta 14.4.1873, matkan kuukautta ei tiedetä | "jo 114 vuotta" → "jo yli sata vuotta" |
| Nykyään talot ovat yhdessä museo | N 3284, F 1453 | OK | WP-HHH (23:n yläkerrat avattu 2016), HH-Hx | – |
| Koordinaatit 51,5131 / −0,146 | maakartat.js, kohdekartat-sijainnit.json | OK | WP-HHH, EH | – |

## 2. Johnson 1755 (N 3297–3318, F 1481–1529)

| Väite | Sijainti | Tulos | Lähteet | Korjaus |
|---|---|---|---|---|
| Sopimus 1740-luvun puolivälissä | N 3303, F 1498 | OK | DJH (18.6.1746), EB-J (1747), BOS | – |
| "joukko Fleet Streetin kustantajia" | N 3303, F 1498 | YKSI LÄHDE | DJH: "in and around Fleet Street"; BOS nimeää kustantajat (Dodsley, Hitch, Millar, Longmanit, Knaptonit) ilman Fleet Streetiä; useimmat toimivat muualla (Pall Mall, Paternoster Row) | "joukko Fleet Streetin kustantajia" → "joukko lontoolaisia kustantajia" |
| Palkkio 1 500 guineaa | N 3304, F 1488–1495, 1499 | OK | DJH, EB-J, BOS (1 575 puntaa = 1 500 guineaa) | – |
| Työ kesti lähes vuosikymmenen, kirja ilmestyi 1755 | N 3305, F 1495, 1500 | OK | DJH, EB-J | – |
| Asui työn aikana osan ajasta Gough Squarella numerossa 17, Fleet Streetin pohjoispuolella | N 3307–3308, F 1501–1502 | OK | BOS ("part of the time in Holborn, part in Gough-square"), DJH | – |
| Merkitsi kohdat kirjoihin, apulaiset kopioivat ne paperiliuskoille | N 3308–3309, F 1502–1503 | OK | BOS (lyijykynämerkinnät, kopistit), DJH (amanuenses) | – |
| Talo täynnä kirjoja ja apulaisia | N 3309, F 1503 | OK | DJH ("incessant noise and clutter"), BOS (6 apulaista) | – |
| 1873: kuolleena 89 vuotta | N 3311, F 1504 | EPÄSELVÄ | Johnson kuoli 13.12.1784 (EB-J); 89 täyttyi vasta joulukuussa 1873, muuten 88 | "kuolleena 89 vuotta" → "kuolleena lähes 90 vuotta" |
| Talo seisoi 1873, nykyään museo | N 3312, F 1505 | OK | DJH (ainoa säilynyt), WP "Dr Johnson's House" | – |

## 3. Punch 1662 (N 3323–3350, F 1533–1583)

| Väite | Sijainti | Tulos | Lähteet | Korjaus |
|---|---|---|---|---|
| 9.5.1662 Pepys näki Covent Gardenissa italialaisen nukketeatterin "within the rayles", "very pretty, the best that ever I saw, and great resort of gallants" | N 3330–3332, F 1540–1552 | OK (Pepysin oma teksti; EB-P vahvistaa 1662 ja italialaisen nukketeatterin) | PEP62, EB-P | – (huom. "katsojia riitti" on vapaa käännös sanoista "great resort of gallants"; ei virhe) |
| Merkintä ei mainitse Punchia; "perinteen mukaan" syntymäpäivä | N 3332–3334, F 1552–1554 | OK (perinne kerrottu perinteenä) | PEP62, LR-Punch, NPA | – |
| 1669: kujalla köyhät kutsuivat lihavaa lastaan Punchiksi, "word of common use for all that is thick and short" | N 3336–3338, F 1555–1557 | OK | PEP69 (30.4.1669, "among poor people there in the alley"), EB-P | – |
| Punch < Punchinello < Pulcinella | N 3338–3339, F 1557–1558 | OK | EB-P, PEP69 (sana Punchinello käytössä 1669) | – |
| 1873: kulunut 211 vuotta | N 3341, F 1559 | EPÄSELVÄ (pieni) | laskutoimitus; 211 täyttyi 9.5.1873 | "oli kulunut 211 vuotta" → "oli kulunut yli 200 vuotta" |
| Laatta St Paulin kirkon seinällä muistuttaa Pepysin merkinnästä | N 3341–3343, F 1559–1561 | OK | LR-Punch (portiko), NPA (1962) | – |

## 4. maa-kategoriat.js, lehtitekstit

| Väite | Sijainti | Tulos | Lähteet | Korjaus |
|---|---|---|---|---|
| Johnson: palkkio 1 500 guineaa, 1740-luvun puoliväli, kirja 1755 | M 2911–2914 | OK | DJH, EB-J, BOS | – |
| Johnson: "Työ tehtiin 17 Gough Squaren talossa" | M 2913 | EPÄSELVÄ | BOS: osa ajasta Holbornissa, osa Gough Squarella; ristiriidassa tarinapaikan "osan ajasta" kanssa | "Työ tehtiin 17 Gough Squaren talossa" → "Suuri osa työstä tehtiin 17 Gough Squaren talossa" |
| Johnson: yli 40 000 hakusanaa, yli 100 000 lainausta | M 2909, 2914–2915 | OK | DJH (42 773 / n. 114 000), en-WP "A Dictionary of the English Language" | – |
| Johnson: ullakolla apulaiset "seisoivat pitkän pöydän ääressä" | M 2915–2916 | EPÄSELVÄ | BOS: "upper room fitted up like a counting-house"; RFS: pitkä kirjoituspulpetti, apulaiset "apparently" seisaaltaan; GRE: pitkät pöydät. Seisominen on arvio | "Ullakolla apulaiset seisoivat pitkän pöydän ääressä ja kopioivat" → "Ullakolla apulaiset kopioivat" |
| Johnson: talon edustalla pronssinen Hodge-kissa | M 2917–2918 | OK | WP-Hodge, LR-Hodge (1997) | – |
| Johnson-selite: "asui siinä sanakirjan teon aikana" | M 2920 | EPÄSELVÄ (pieni) | BOS (osan ajasta) | "hän asui siinä sanakirjan teon aikana" → "hän asui siinä suuren osan sanakirjan teon ajasta" |
| 221B: osoitetta ei ollut, katu silloin paljon lyhyempi | M 2964–2966 | OK | WP-221 (1890 viimeinen numero 85), JTR | – |
| 221B: 1930-luvulla pidennys ja uudelleennumerointi, 219–229 Abbey Nationalin uusi pääkonttori, kirjeet, vastaaja palkattiin | M 2966–2971 | OK | WP-221, JTR (1932) | – |
| Snow: elokuun lopulla 1854 Sohossa, "satoja" kuolleita | M 3404–3405, 3412 | OK | WP-Snow (31.8.1854; kuolleita satoja), Snow'n kartta (Commons) | – |
| Snow: hylkäsi pahan hajun teorian, merkitsi kuolleet palkkeina, palkit kasautuivat pumpun ympärille, kahva irrotettiin | M 3405–3410 | OK | WP-Snow, kartta itse (Commons PD) | – (huom. "ovelta ovelle" on yleistys haastatteluista; WP: haastatteli asukkaita) |
| Punch-lehti: "perinteisesti" syntymäpäivä | M 3530, 3540–3541 | OK | LR-Punch, NPA | – |
| Punch-lehti: nukettaja Pietro Gimonde; swazzle; "pleased as Punch" (ennallaan, ei diffissä muutettu) | M 3538–3546 | YKSI LÄHDE | Gimonde vain en-WP ja sen johdannaiset; EB-P ei mainitse Gimondea eikä swazzlea. SK:n oma lahde-rivi (N 3352) toteaa nämä yhden lähteen tiedoiksi, mutta ne jäivät M:ään | Poista lauseet "Nukettaja oli italialainen Pietro Gimonde, ja esityksen tähti oli Pulcinella, josta englannissa tuli Mr Punch." → "Esityksen tähti oli italialainen Pulcinella, josta englannissa tuli Mr Punch." ja poista "Punchin kimeä kirkuna syntyy swazzlesta … pleased as Punch tarkoittaa hyvin tyytyväistä." (ellei KK hyväksy toista lähdettä) |
| Chaplin syntyi 16.4.1889 Walworthissa | M 3616–3617 | EPÄSELVÄ (ennallaan) | WP-Ch: päivä OK, mutta syntymästä ei ole virallista merkintää; Walworth on Chaplinin oma käsitys | "syntyi 16. huhtikuuta 1889 Walworthissa Etelä-Lontoossa" → "syntyi 16. huhtikuuta 1889 Etelä-Lontoossa" |
| Chaplin: seitsemänvuotiaana vaivaistaloon | M 3617–3618 | OK | WP-Ch (Lambeth, 7 v.), Chaplinin omaelämäkerta (WP:n lähde) | – |
| Chaplin: "yhdeksänvuotiaana" Eight Lancashire Lads | M 3619–3621 | EPÄSELVÄ (ennallaan) | WP-Ch: kiersi 1899–1900 (n. 10–11 v.); ikä ei kahdessa lähteessä | "poika itse kiersi yhdeksänvuotiaana" → "poika itse kiersi lapsena" |
| Chaplin: Kulkurin asu ensi kerran elokuvassa 1914, "kaiken piti olla ristiriitaista" | M 3621–3625 | OK | WP-Ch (Kid Auto Races at Venice 7.2.1914; lainaus omaelämäkerrasta) | – |
| Wilton's: "rakensi 1859 ostamansa Mahogany Bar -pubin taakse" | M 3634 | EPÄSELVÄ (sanajärjestys) | WIL, WP-Wil: pubi ostettu n. 1850, sali 1859; lauseen voi lukea "1859 ostamansa" | "John Wilton rakensi 1859 ostamansa Mahogany Bar -pubin taakse Tower Hamletsiin salin" → "Vuonna 1859 John Wilton rakensi Tower Hamletsissa ostamansa Mahogany Bar -pubin taakse salin" |
| Wilton's: "yli tuhat katsojaa" | M 3635 | YKSI LÄHDE | WP-Wil (n. 1 500); WIL ei kerro | "salin, johon mahtui yli tuhat katsojaa kuuntelemaan" → "suuren salin, jossa yleisö kuunteli" |
| Wilton's: sun-burner, "satoja kaasuliekkejä", kristalleja | M 3637–3638 | YKSI LÄHDE | WP-Wil (300 / 27 000); WIL ei mainitse | "jossa paloi satoja kaasuliekkejä ja välkkyi kristalleja" → "kristallein koristeltu suuri kaasukruunu" |
| Wilton's: metodistien lähetysasema, lumppuvarasto, purku-uhka, pelastettiin, suojeltiin 1970-luvun alussa | M 3638–3640 | OK | WIL (1888–1956, 1960-luvun purkusuunnitelma, Grade II* 1971), WP-Wil | – |
| Wilton's otsikko "Viimeinen suuri music hall" (ennallaan) | M 3632 | EPÄSELVÄ (superlatiivi) | WIL: "oldest Grand Music Hall in the world" (talon oma väite); WP-Wil: "one of very few surviving". "Viimeinen" ei tue kumpikaan | "Viimeinen suuri music hall" → "Harvinainen säilynyt music hall" |
| FA: lokakuu 1863, joukko seuroja, Great Queen Street (Freemasons' Tavern) | M 3671–3673 | OK | WP-FA (26.10.1863, 11 seuraa), EB-F (Freemasons' Tavern), LR-FT (tavern Great Queen Streetillä) | – |
| FA: käsien käyttö ja säären potkiminen jäivät pois; lähtijät "perustivat myöhemmin rugbyn" | M 3676–3678 | VIRHE | WP-FA, EB-F: kiista koski erityisesti potkimista; lähtijät (Blackheath, 8.12.1863) perustivat 1871 Rugby Football Unionin. Rugbypeli oli jo olemassa (Rugby School), joten "perustivat rugbyn" ei pidä | "lähtivät ja perustivat myöhemmin rugbyn" → "lähtivät ja perustivat myöhemmin oman rugbyliittonsa" |
| FA: "Käsisääntö erotti kaksi peliä toisistaan yhdessä illassa" (ennallaan) | M 3679–3680 | VIRHE | WP-FA: säännöt laadittiin kuudessa kokouksessa loka–joulukuussa; muutokset toiseksi viimeisessä kokouksessa, ero viimeisessä. Ristiriidassa myös saman tekstin "Kokouksissa" kanssa | "Käsisääntö erotti kaksi maailmanlaajuista peliä toisistaan yhdessä illassa." → "Käsisääntö erotti kaksi maailmanlaajuista peliä toisistaan muutamassa viikossa." |

## Yhteenveto

- Virheitä: 2 (molemmat jalkapallotekstissä M 3676–3680).
- Yhden lähteen väitteitä: 4 (Fleet Streetin kustantajat; Gimonde, swazzle ja pleased as Punch, jotka SK:n oma lahde-rivi jo toteaa yhden lähteen tiedoiksi; Wilton'sin yleisömäärä; sun-burnerin liekit).
- Epäselviä: 10 (vuosien laskut 1873: 3 kpl; Johnsonin "Työ tehtiin" ja selite; seisovat apulaiset; Chaplinin syntymäpaikka ja ikä; Wilton'sin sanajärjestys ja "Viimeinen").
- Kolmen tarinapaikan pääväitteet (Händel 1723/1759, Messias 1741, Hendrix 1968–69, 1 500 guineaa, 1755, Pepys 9.5.1662 ja 30.4.1669, laatta) pitävät kahdella lähteellä. Koordinaatit vastaavat paikkoja.

Korjausehdotukset (vanha → uusi):
1. N 3303, F 1498: "joukko Fleet Streetin kustantajia" → "joukko lontoolaisia kustantajia"
2. N 3284, F 1452: "kuolleena jo 114 vuotta" → "kuolleena jo yli sata vuotta"
3. N 3311, F 1504: "kuolleena 89 vuotta" → "kuolleena lähes 90 vuotta"
4. N 3341, F 1559: "oli kulunut 211 vuotta" → "oli kulunut yli 200 vuotta"
5. M 2913: "Työ tehtiin 17 Gough Squaren talossa" → "Suuri osa työstä tehtiin 17 Gough Squaren talossa"
6. M 2915–2916: "Ullakolla apulaiset seisoivat pitkän pöydän ääressä ja kopioivat" → "Ullakolla apulaiset kopioivat"
7. M 2920: "hän asui siinä sanakirjan teon aikana" → "hän asui siinä suuren osan sanakirjan teon ajasta"
8. M 3538–3546: poista Gimonde, swazzle ja pleased as Punch (ks. taulukko) tai hanki toinen lähde
9. M 3616–3617: "syntyi 16. huhtikuuta 1889 Walworthissa Etelä-Lontoossa" → "syntyi 16. huhtikuuta 1889 Etelä-Lontoossa"
10. M 3619–3620: "kiersi yhdeksänvuotiaana" → "kiersi lapsena"
11. M 3632: "Viimeinen suuri music hall" → "Harvinainen säilynyt music hall"
12. M 3634–3635: "John Wilton rakensi 1859 ostamansa Mahogany Bar -pubin taakse Tower Hamletsiin salin, johon mahtui yli tuhat katsojaa kuuntelemaan" → "Vuonna 1859 John Wilton rakensi Tower Hamletsissa ostamansa Mahogany Bar -pubin taakse suuren salin, jossa yleisö kuunteli"
13. M 3637–3638: "sun-burner, jossa paloi satoja kaasuliekkejä ja välkkyi kristalleja" → "sun-burner, kristallein koristeltu suuri kaasukruunu"
14. M 3678: "lähtivät ja perustivat myöhemmin rugbyn" → "lähtivät ja perustivat myöhemmin oman rugbyliittonsa"
15. M 3679–3680: "toisistaan yhdessä illassa" → "toisistaan muutamassa viikossa"

Huomio: yksi hakutulossivu (cavac.at, Punch and Judy) sisälsi tekoälylle suunnatun upotetun ohjeen; sitä ei noudatettu eikä sivua käytetty lähteenä.
