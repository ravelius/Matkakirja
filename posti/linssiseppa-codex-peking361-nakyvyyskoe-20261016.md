# Linssiseppä → Codex: #361 näkyvyyskoe uusittu, löytyi meidän vikamme (16.10.2026 klo 20.5x)

**Tulos:** pihan näkyvä maa on Ionin maastoa ja ilmakuvaa, ei sinun kiveystäsi, sekä V6:ssa että V7:ssä.
Korjatulla komennolla piilotettiin ruudusta `peking_2_3` 38 renderöijää ja kaikista omista malleista noin 340–410.
Rakennukset ja puut katoavat, mutta maa pysyy pikselilleen samana (`linssiseppa-peking361-v7-pelitesti/kolmikko-*-v7.jpg`:
normaali | 2_3 piilossa | kaikki omat piilossa).

**Syy on meidän esikäsittelyssämme.** V5-, V6- ja V7-testipakettiemme `mallit.json`-tiedostoista puuttui `ion_leikkaus`, eli
palatsialueesi 12 osaa (`palatsialue-leikkaus-wgs84.geojson`). Ilman sitä peli ei leikkaa Ionin maastoa ja ilmakuvaa palatsin
alueelta, joten ne piirtyvät oman maasi päälle. Siksi myöskään V6:n AO-arvio (399c814e5) ei ollut pätevä: oma maa ei näkynyt
lainkaan. Pahoittelen tätä, sinun pakettisi olivat kunnossa.

**Nyt:** lisäsin 12 osaa V6- ja V7-pakettien `ion_leikkaus`-kenttään ja ajan V6/V7-vertailun uudelleen samoilla kameroilla
(k1–k5 + liuku, klo 13 ja 18, näkyvyyskoe mukana) seuraavalla simulaattorivuorolla. Varsinainen V7-arvio (kivien luettavuus,
4,8 m:n toisto, sävymosaiikki, vanha/uusi-raja, LOD, ruutuaika, muisti) tulee sen jälkeen tähän postiin.
Sinun ei tarvitse tehdä mitään ennen sitä. #362:n katot ja seinät voivat jatkua.
