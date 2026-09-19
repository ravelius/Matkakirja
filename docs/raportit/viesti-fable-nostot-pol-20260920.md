# Viesti Fablelle: Puolan hahmotelmanostot valmiina (vaihe 2 ja 3)

19.9.2026 klo 18.57 Suomen aikaa, Sonnet-sisältösessio "Matkakirja Sonnet nostot",
haara `sonnet-nostot-pol` (pohja origin/main bc0996c4, v1960). Versiota ei nostettu,
PR:ää ei avattu, ämpäriin ei viety, Raamattuun ei koskettu.

**Tulos: 27 nostoa (Fablen hyväksymä lista, ei korvauksia), 64 Commons-kuvaa, 10 rahavisaa.**
Uusi tiedosto `js/packs/hahmotelma-pol.js` (`HAHMOTELMA_POL`, rakenne täsmälleen kuin hahmotelma-fra.js ja muut EU-pakat).
Rekisteröinti: `js/fokuskohteet.js` (import + `KOHDE_MAAT.POL`), `sw.js` SHELL, `tools/build-standalone.mjs`; rivit ovat hahmotelma-nld-rivien jälkeen.
Puolassa on jo 25 nykyistä nostoa (`maastokohteet-pol.js` ym.); uudet lisätään niiden jatkoksi `KOHDE_MAAT.POL`:iin, eikä mikään toista niitä.

## Etäisyys POL-renkaaseen

**Białowieża on renkaan ULKOPUOLELLA (2,7 lautayksikköä)**; Fable hyväksyi (lehdellä). Aivan reunalla sisäpuolella Słowiński 0,5, Tarnica 1,1, Dunajecin rotko 1,5, Szczeliniec 1,6, Wolin 2,9;
sen jälkeen Zakopane 4,6, Frombork 5,1, Żywiec 6,8. Kaikki 27 osuvat Puolan fokuslehteen.

## Nostot, kuvat ja lisenssit

| id | nimi | tyyppi | teksti (merkkiä) | kuvia | tekijät | lisenssit | etäisyys POL-renkaan reunaan (lautayks.) |
| --- | --- | --- | ---: | ---: | --- | --- | --- |
| bialowieza | Białowieżan metsä | kulttuuri | 700 | 2 | Bouke ten Cate, Charles J. Sharp | CC BY 4.0, CC BY-SA 4.0 | 2.7 (ulkopuolella) |
| biebrza | Biebrzan suot | joki | 632 | 2 | Bouke ten Cate, Jerzy Strzelecki | CC BY 4.0, CC BY-SA 3.0 | 31.6 |
| sniardwy | Śniardwy | jarvi | 519 | 2 | Matthias Bethke, Lesnydzban | CC BY-SA 4.0 | 29.9 |
| slowinski | Słowińskin dyynit | meri | 607 | 2 | Krzysztof Ziarnek, Kenraiz | CC BY-SA 4.0 | 0.5 |
| wolin | Wolinin kansallispuisto | saari | 429 | 2 | Bożena Radzikowska, Grzegorz W. Tężycki | CC BY-SA 3.0, CC BY-SA 4.0 | 2.9 |
| tarnica | Tarnica | vuori | 415 | 2 | Pudelek, Lowdown | CC BY-SA 4.0, CC BY-SA 3.0 | 1.1 |
| dunajec-gorge | Dunajecin rotko | joki | 683 | 3 | Zalasem1, Mariusz Rzepkowski (MariuszR), Walery Eljasz Radzikowski | CC BY 4.0, CC BY-SA 2.5, Public domain | 1.5 |
| szczeliniec | Szczeliniec Wielki | vuori | 587 | 2 | Filip Krejdl, Grzegorz W. Tężycki | CC BY-SA 4.0 | 1.6 |
| grunwald | Grunwaldin taistelu | historia | 708 | 2 | Łukasz Niemiec | CC BY-SA 3.0 pl | 44.1 |
| frombork | Frombork | historia | 667 | 3 | Scotch Mist, Julian Nyča, Aleksander Durkiewicz | CC BY-SA 4.0, CC BY-SA 3.0 | 5.1 |
| biskupin | Biskupin | historia | 691 | 2 | Patrik Kunec, Fazer | CC BY-SA 4.0, CC BY-SA 2.5 | 80.8 |
| legnica | Legnican taistelu | historia | 734 | 3 | Sławomir Milejski, Theodor Blätterbauer, Gliwi | CC BY 3.0, Public domain, CC0 | 21.4 |
| kalwaria | Kalwaria Zebrzydowska | historia | 713 | 2 | Ludwig Schneider | CC BY-SA 3.0 | 14.2 |
| sandomierz | Sandomierz | historia | 688 | 2 | Henryk Bielamowicz, Zala | CC BY-SA 4.0 | 55.4 |
| zakopane | Zakopane | kulttuuri | 710 | 3 | Cybularny, Daro998 (pl.wikipedia), Zemxer | CC0, CC BY-SA 3.0, CC BY-SA 4.0 | 4.6 |
| kazimierz | Kazimierz Dolny | kulttuuri | 630 | 3 | Alians PL, Stanisław Masłowski, Robsuper | CC0, Public domain, CC BY-SA 3.0 | 54.3 |
| zywiec | Żywiec | ruoka | 674 | 2 | Lesnydzban, Silar | CC BY 4.0, CC BY-SA 4.0 | 6.8 |
| kartuzy | Kartuzy | kulttuuri | 692 | 3 | Gdaniec, Jarosław Kruk (Jrkruk) | CC BY-SA 3.0, CC BY-SA 4.0 | 15.6 |
| lowicz | Łowicz | kulttuuri | 643 | 2 | Scotch Mist, Emilia Wiśniewska | CC BY-SA 4.0 | 106.6 |
| ciechocinek | Ciechocinek | kulttuuri | 690 | 2 | Scotch Mist, MichalPL | CC BY-SA 4.0 | 67.2 |
| kornik | Kórnikin linna | kulttuuri | 777 | 3 | Diego Delso, Napoleon Orda, 7oanna | CC BY-SA 4.0, Public domain | 75.4 |
| lancut | Łańcutin linna | kulttuuri | 544 | 2 | Janusz Pruchnik, Kroton | CC BY-SA 4.0, CC BY-SA 3.0 pl | 24.9 |
| pszczyna | Pszczynan linna | kulttuuri | 781 | 3 | Paterm, Jacek Cisło, Alexander Baxevanis from London, UK | CC BY-SA 3.0, CC BY-SA 3.0 pl, CC BY 2.0 | 13.3 |
| lodz | Łódź | kauppa | 957 | 2 | Lestat (Jan Mehlich), Kapitel | CC BY-SA 3.0, CC BY-SA 4.0 | 87.3 |
| bochnia | Bochnian suolakaivos | tekniikka | 607 | 2 | Kj, Adrian Tync | CC BY-SA 4.0 | 25.3 |
| tarnowskie-gory | Tarnowskie Górin hopeakaivos | tekniikka | 599 | 3 | Stowarzyszenie Miłośników Ziemi Tarnogórskiej, Paweł Michalik, Wojt ek | CC BY-SA 4.0, CC BY-SA 3.0, CC BY 3.0 | 26.5 |
| boleslawiec | Bolesławiec | kauppa | 791 | 3 | Jacek Halicki, Qasinka, Tournasol7 | CC BY-SA 4.0, CC0, CC BY 4.0 | 18.7 |

Kuvia yhteensä 64; lisenssijakauma: CC BY-SA 4.0 29, CC BY-SA 3.0 13, CC BY 4.0 5, Public domain 4, CC BY-SA 3.0 pl 4, CC0 4, CC BY-SA 2.5 2, CC BY 3.0 2, CC BY 2.0 1.

## Rahavisat (10 noston kenttä `visa`, muoto kuten NLD:ssä ja fokusvirta-*.js:ssä)

Neljä vaihtoehtoa, oikea-indeksit 1,3,0,2,1,3,2,0,1,2 (tasainen), vastaus noston omasta tekstistä; `fakta` on saman artikkelin muu tieto. Tyypit: kulttuuri ×3, jarvi, meri, historia ×2, kauppa, tekniikka ×2.

| nosto | tyyppi | kysymys | oikea |
| --- | --- | --- | --- |
| bialowieza | kulttuuri | Mitä nimi Białowieża tarkoittaa puolaksi? | Valkoista tornia (1) |
| sniardwy | jarvi | Miten Śniardwy syntyi? | Sulavan jäätikön ja tulvavesien muovaamana (3) |
| slowinski | meri | Mikä saa Słowińskin dyynit liikkumaan? | Tuuli ja aallot kuljettavat hiekkaa sisämaahan (0) |
| grunwald | historia | Mitä Saksalaiselle ritarikunnalle tapahtui Grunwaldin taistelun jälkeen? | Se kesti Malborkin piirityksen, mutta ei toipunut (2) |
| biskupin | historia | Kuka löysi Biskupinin pronssikautisen linnoitusasutuksen jäänteet vuonna 1933? | Koulunopettaja oppilaineen (1) |
| zakopane | kulttuuri | Kuka oli Zakopane-tyylin arkkitehtuurin uranuurtaja? | Stanisław Witkiewicz (3) |
| ciechocinek | kulttuuri | Miksi Puolan viranomaiset kiinnostuivat Ciechocinekin suolasta? | Wieliczka ja Bochnia joutuivat Itävallalle (2) |
| lodz | kauppa | Mikä muutos vuonna 1851 auttoi Łódźin tekstiiliteollisuutta kasvamaan? | Venäjä poisti tullimuurin Kongressi-Puolalta (0) |
| bochnia | tekniikka | Mihin Bochnian suolakaivoksen suurin säilynyt kammio on muutettu? | Sanatorioksi (1) |
| tarnowskie-gory | tekniikka | Mitä varten Walesista tuotu Newcomenin kone asennettiin Tarnowskie Góryyn vuonna 1788? | Maanalaisten vesien poistamiseen (2) |

## Koneellinen tarkistus (vaihe 3)

| Mittari | Tulos |
| --- | --- |
| Nostoja | 27 |
| Teksti ≥ 200 merkkiä | 27/27 (415–957 merkkiä) |
| `lahde`-rivi (artikkeli + 19.9.2026) | 27/27 |
| 2 kysymystä pululle | 27/27 |
| ≥ 2 kuvaa | 27/27 (10 kohteella vähintään 2, viidellä 3) |
| Kuvan kentät (osoite, lyhyt, selite, lahde, tekija, lahdeUrl, lisenssi, lisenssiUrl) | 64/64 |
| Lisenssi kelvollinen (PD / CC0 / CC BY / CC BY-SA) | 64/64; **luettu uudelleen Commonsin extmetadata-rajapinnasta erikseen** (4 rinnakkain) |
| Kuvatiedostot olemassa, sha256-etuliite = tiedostonimen tunniste | 64/64 |
| Korostukset löytyvät tekstistä | 27/27 |
| Fokuslehden rajaus (`osuuLehteen('POL')`) | 27/27 |
| Karttarivi pelin omalla passilla (`nostojenKarttapaikat`) | 27/27 pääkartalla, `kaupunginKohdalla` = null kaikilla (pelikaupungit Varsova ja Krakova; lähimmät Łowicz 37,0 ja Kalwaria 12,0) |
| Nostojen etäisyys nykyisiin 25 POL-nostoon (lautayks.; raja 7) | pienin Zakopane – Rysy 6,9 (Fable hyväksyi), Pszczyna – Auschwitz 8,3, Ciechocinek – Veiksel 8,3; muut ≥ 11,7. Nostot keskenään ≥ 15 |
| Päällekkäisyys nykyisten POL-nostojen kanssa | ei samoja id:itä eikä nimiä (Wieliczka, Malbork, Częstochowa, Toruń ym. eivät ole mukana) |
| Visat: 4 vaihtoehtoa, oikea-indeksi kelvollinen, ei kaksoisvaihtoehtoja, ei selvästi pisin oikea | 10/10 |
| `node --test tests/*.test.mjs` | # tests 3667, # pass 3654, # fail 0, # skipped 13 (myös `tests/nimiolimitys.test.mjs`: ei nimiö–nimiö-limityksiä) |
| `node tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |

## Poikkeamat ja päätettävää (lähdesääntö: jos artikkeli ei tue listan väitettä, kohteen tyyppi/teksti vaihdettu ja kirjattu)

1. **Pszczyna**: en-Wikipedian Pszczyna Castle- ja Pszczyna-artikkeli eivät mainitse visenttejä (Fablen hyväksynnän "linna ja visentit"), joten visentit on jätetty pois; teksti kertoo linnasta (Piastit, von Promnitz, von Pless, Destailleurin uudistus 1870–76, Telemann 1705). Nappi ei viittaa leiriin eikä sotaan.
2. **Białowieża**: tyyppi `kulttuuri` (ei metsätyyppiä); teksti kertoo visenteistä (yli 800), nimestä ja Venäjän hallinnosta (1795 alkaen; keisarin metsästysmetsä 1888). Nappi katsoo vuodesta 1873 (Venäjän hallitsema alkumetsä).
3. **Biebrza**: tyyppi `joki` (suot; ei suotyyppiä).
4. **Wolin**: artikkeli on lyhyt (4 virkettä johdanto); Kawczan jyrkänteestä ei löytynyt kuvaa, molemmat kuvat esittävät Gosańin jyrkännettä.
5. **Legnica**: kuvat esittävät Legnickie Polen luostarikirkkoa ja 1800-luvun piirrosta luostarista (taistelumaalaukset ja miniatyyrit olivat verisiä); ei verta eikä ruumiita.
6. **Grunwald**: tekstissä sanotaan asiallisesti "suurin osa ritarikunnan johtajista kaatui tai joutui vangiksi" (artikkelin johdanto); kuvina muistomerkki ja kukkula.
7. **Frombork**: tekstissä yksi sivulause tuomiokirkon vaurioitumisesta toisessa maailmansodassa ja jälleenrakennuksesta; ei leirejä.
8. **Łódź**: ei pelikaupunki; teksti kertoo tekstiiliteollisuuden syntyvuosista (tullimuuri poistettu 1851, Poznański 1872–92); kuvina Poznańskin palatsi ja Manufaktura. Pituus 957 merkkiä (viisi virkettä).
9. **Zakopane**: Zakopane – Rysy 6,9 (hyväksytty). Nappi katsoo 1873:sta: metallikylä, josta tulee kylpylä 1889.
10. **Żywiec**: panimo-osio artikkelin mukaan (arkkiherttua Albrecht 1852, Heineken 1990-luvulla); panimosta on kuvista vain yksi (holvikäytävä), muut olivat huonoja.
11. **Sandomierz**: mongolien ryöstöt vuosina 1241, 1260 ja 1287 artikkelin mukaan.
12. **Kuvat**: agentti D laski osan sha8-tunnisteista ennen 1800 px:n skaalausta → 15 tiedostoa nimetty uudelleen todellisen sha256:n mukaan (JSON päivitetty). Osa kuvista 1920 px leveitä (Commonsin vakiokoko).
    Lestatin (Łódź) ja Michalikin (Tarnowskie Góry) kuvissa on GFDL-kaksoislisenssi; JSONiin on merkitty vain CC BY-SA. Wolinin pääkuvan tekijä "Bożena Radzikowska" on Commonsissa katkenneena (Panoramio-käyttäjä); merkitty pelkkänä nimenä.
    Ciechocinekin sisäkuvan Commons-kuvaus on vain "Inside graduation tower"; selite kertoo lisäksi silmin nähdyn (risukimppuseinämä, valuva vesi). Kórnikin toinen kuva on Napoleon Ordan litografia 1880 (PD).
13. **1873-näkökulma**: nappi-alaotsikoissa Venäjän Kongressi-Puola (Łódź, Łowicz, Ciechocinek, Sandomierz, Białowieża, Biebrza), Preussi (Grunwald/Tannenberg, Frombork, Legnica, Bolesławiec, Tarnowskie Góry, Pszczyna, Kórnik, Kartuzy, Wolin, Słowiński, Biskupin) ja Galitsia (Zakopane, Żywiec, Kalwaria, Bochnia, Łańcut, Tarnica, Dunajecin rotko); Biskupinin nappi kertoo, ettei kylää ole vielä löydetty.

## Mitä jäi tekemättä

- **Kuvien vienti ämpäriin** (Fable): 64 tiedostoa kansiosta
  `/Users/samireivinen/Matkakirja-nostot-kuvat/bel/` osoitteeseen
  `https://media.matkakirja.app/karttanostot/20260920/<tiedosto>`; osoitteet on kirjattu pakkaan
  etukäteen, ennen vientiä ne vastaavat 404:llä (puuttuva kuva pudotetaan sarjasta). Kuvia ei ole
  committoitu. JSON-metatiedot ovat kansiossa `_json/`.
- HEAD-tarkistus ämpäriosoitteille (vasta viennin jälkeen).
- Puolan nostoankkureita ei ole lukittu (`LUKITUT_MAAT` on vain FRA). Białowieża renkaan ulkopuolella ja rannikon/rajan reunakohteet jäävät ankkurilukon varaan.
- Peliä ei avattu selaimessa; piirto todettu samalla reitillä kuin hahmotelma-fra.js (KOHDE_MAAT) ja testit ovat vihreitä.
- Silmäpistokoe: itse en katsonut yksittäisiä kuvia tässä erässä; viisi Sonnet-kuva-agenttia katsoi jokaisen ja listasi hylätyt ehdokkaat.
- Visat: vastauksen esiintyminen tekstissä tarkistettu käsin, ei koneellisesti.

## Kuvat ja kansio

`/Users/samireivinen/Matkakirja-nostot-kuvat/bel/`: 64 kpl `bel-nosto-<id>-<sha8>.jpg`, alikansio
`_json/` (kuvatiedot kohteittain).
