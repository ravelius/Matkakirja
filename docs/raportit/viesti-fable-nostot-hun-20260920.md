# Viesti Fablelle: Unkarin hahmotelmanostot valmiina (vaihe 2 ja 3)

19.9.2026 klo 19.34 Suomen aikaa, Sonnet-sisältösessio "Matkakirja Sonnet nostot",
haara `sonnet-nostot-hun` (pohja origin/main 883f09fb, v1961). Versiota ei nostettu,
PR:ää ei avattu, ämpäriin ei viety, Raamattuun ei koskettu.

**Tulos: 25 nostoa (Fablen hyväksymä lista, ei korvauksia; Kecskemét pysyy pudotettuna), 58 Commons-kuvaa, 10 rahavisaa.**
Uusi tiedosto `js/packs/hahmotelma-hun.js` (`HAHMOTELMA_HUN`, rakenne täsmälleen kuin hahmotelma-fra.js ja muut EU-pakat).
Rekisteröinti: `js/fokuskohteet.js` (import + `KOHDE_MAAT.HUN`), `sw.js` SHELL, `tools/build-standalone.mjs`; rivit ovat hahmotelma-nld-rivien jälkeen.
Unkarissa on jo 23 nykyistä nostoa; uudet lisätään niiden jatkoksi `KOHDE_MAAT.HUN`:iin, eikä mikään toista niitä (Balaton, Tokaj, Hortobágy, Eger, Pécs, Pannonhalma, Hollókő ja Aggtelek ovat jo pelissä).

## Etäisyys HUN-renkaaseen

**Ipolytarnóc on renkaan ULKOPUOLELLA (0,5 lautayksikköä)**; muut 24 sisällä ja osuvat Unkarin fokuslehteen. Reunalla Esztergom 0,8, Villány 1,9, Sopron 2,7, Gyula 2,9, Mohács 3,2, Fertőd 3,3, Sárospatak 4,8, Jak 4,9.

## Nostot, kuvat ja lisenssit

| id | nimi | tyyppi | teksti (merkkiä) | kuvia | tekijät | lisenssit | etäisyys HUN-renkaan reunaan (lautayks.) |
| --- | --- | --- | ---: | ---: | --- | --- | --- |
| heviz | Hévízin järvi | jarvi | 613 | 2 | Ivanhoe, Kovacsapartman | CC BY-SA 3.0 | 21.5 |
| velence | Velencei-tó | jarvi | 503 | 2 | Christo | CC BY-SA 4.0 | 24.6 |
| tiszato | Tisza-tó | jarvi | 634 | 2 | Texaner, Lajos Gál | CC BY-SA 4.0, CC BY-SA 3.0 | 32 |
| kiskunsag | Kiskunságin puszta | kulttuuri | 613 | 2 | isol, Pasztilla aka Attila Terbócs | CC BY-SA 3.0, CC BY-SA 4.0 | 30.5 |
| badacsony | Badacsony | vuori | 565 | 2 | Horsee, BeOCeKa | CC BY-SA 3.0, CC0 | 28.5 |
| gemenc | Gemenc | joki | 529 | 2 | Pear Blossom, Szeder László | CC BY-SA 3.0, CC BY-SA 4.0 | 12.3 |
| esztergom | Esztergomin basilika | historia | 727 | 2 | Gábor Bejó (artbejo), Globetrotter19 | CC0, CC BY-SA 3.0 | 0.8 |
| mohacs | Mohács | historia | 525 | 2 | Motacilla, Chmee2 or Valtameri | CC BY-SA 4.0, CC BY-SA 3.0 | 3.2 |
| szigetvar | Szigetvár | historia | 775 | 2 | Fortepan (ID 21789), lahjoittaja Lechner Nonprofit Kft. Dokumentációs Központ, Fortepan (ID 92325), lahjoittaja Ebner | CC BY-SA 3.0 | 9.2 |
| sarospatak | Sárospatak | historia | 744 | 2 | h_laca, Károly Cserna | CC BY 3.0, Public domain | 4.8 |
| sopron | Sopron | historia | 698 | 3 | Zeitblick, Zairon, Pennyjey | CC BY-SA 4.0, CC BY-SA 3.0, CC BY 2.0 | 2.7 |
| jak | Ják | historia | 467 | 3 | Tatra623, Nxr-at | CC BY-SA 4.0 | 4.9 |
| tata | Tata | historia | 597 | 3 | Barry dinning, EtelkaCsilla, Antissimo | CC BY 3.0, CC BY-SA 3.0, CC BY-SA 4.0 | 5.8 |
| diosgyor | Diósgyőrin linna | historia | 687 | 3 | ArBePa, Ödön Bartus, Palickap | CC BY-SA 4.0, Public domain | 15 |
| sumeg | Sümegin linna | historia | 607 | 2 | Peter Stehlik, Qasinka | CC BY 3.0, CC0 | 28.1 |
| ipolytarnoc | Ipolytarnóc | historia | 545 | 2 | VargaA, Darinko | CC BY-SA 4.0, Public domain | 0.5 (ulkopuolella) |
| szentendre | Szentendre | kulttuuri | 680 | 2 | Jakub Hałun, Palickap | CC BY-SA 4.0 | 12.6 |
| kalocsa | Kalocsa | ruoka | 627 | 2 | Pasztilla aka Attila Terbócs, さえぼー | CC BY-SA 4.0 | 23 |
| villany | Villány | ruoka | 533 | 2 | Thaler Tamas, Jacquesverlaeken | CC BY-SA 4.0 | 1.9 |
| fertod | Fertőd (Eszterháza) | kulttuuri | 401 | 3 | Pasztilla aka Attila Terbócs, Zairon | CC BY-SA 4.0, CC BY-SA 3.0 | 3.3 |
| mezokovesd | Mezőkövesd | kulttuuri | 659 | 3 | Fortepan / Lissák Tivadar, Naturpuur, Globetrotter19 | CC BY-SA 3.0, CC BY-SA 4.0 | 22.5 |
| godollo | Gödöllön palatsi | kulttuuri | 689 | 2 | Zizzi, Rlevente | Public domain, CC BY-SA 3.0 | 21.3 |
| gyula | Gyula | kulttuuri | 688 | 2 | Szalax, Visitgyula2024 | CC BY-SA 4.0, CC0 | 2.9 |
| opusztaszer | Ópusztaszer | kulttuuri | 634 | 3 | Pasztilla (Attila Terbócs), Árpád Feszty | CC BY-SA 4.0, Public domain | 14.2 |
| herend | Herendin posliini | kauppa | 921 | 3 | Davidi Vardi | CC BY-SA 4.0 | 27.3 |

Kuvia yhteensä 58; lisenssijakauma: CC BY-SA 4.0 29, CC BY-SA 3.0 16, Public domain 5, CC0 4, CC BY 3.0 3, CC BY 2.0 1.

## Rahavisat (10 noston kenttä `visa`, muoto kuten NLD:ssä ja fokusvirta-*.js:ssä)

Neljä vaihtoehtoa, oikea-indeksit 1,3,0,2,1,3,2,2,0,1 (tasainen), vastaus noston omasta tekstistä; `fakta` on saman artikkelin muu tieto. Tyypit: jarvi, vuori, joki, historia ×3, kulttuuri ×2, ruoka, kauppa.

| nosto | tyyppi | kysymys | oikea |
| --- | --- | --- | --- |
| heviz | jarvi | Mikä tekee Hévízin järvestä erityisen Euroopassa? | Se on Euroopan suurin uitavissa oleva lämpöjärvi (1) |
| badacsony | vuori | Kuka runoilija asui Badacsony-vuorella ja tapasi siellä tulevan vaimonsa? | Sándor Kisfaludy (3) |
| gemenc | joki | Mikä tekee Gemencistä ainutlaatuisen Unkarissa? | Se on Tonavan ainoa jäljellä oleva vuorovesialue Unkarissa (0) |
| esztergom | historia | Mitä osmanit tekivät Esztergomin katedraalille vuonna 1543? | He purkivat kuorin ja käyttivät loppua moskeijana (2) |
| szigetvar | historia | Miten sulttaani Suleiman kuoli Szigetvárin piirityksen aikana? | Hän kuoli luonnollisiin syihin vanhuudessaan (1) |
| sopron | historia | Miksi Soprónia kutsutaan uskollisimmaksi kaupungiksi? | Se äänesti kansanäänestyksessä Unkariin kuulumisen puolesta (3) |
| kalocsa | ruoka | Minkä kasvin viljelystä kalocsalaiset elävät muun muassa? | Paprikasta (2) |
| godollo | kulttuuri | Kenelle Unkarin valtio lahjoitti Gödöllön palatsin vuonna 1867 kruunajaislahjaksi? | Frans Joosefille ja keisarinna Elisabethille (2) |
| opusztaszer | kulttuuri | Mitä tapahtumaa Ópusztaszerin Feszty-panoraama kuvaa? | Unkarilaisten maahantuloa Karpaattien altaalle (0) |
| herend | kauppa | Kuka otti Herendin tehtaan haltuunsa velkojana vuonna 1839 ja aloitti taideposliinin valmistuksen? | Mór Fischer (1) |

## Koneellinen tarkistus (vaihe 3)

| Mittari | Tulos |
| --- | --- |
| Nostoja | 25 |
| Teksti ≥ 200 merkkiä | 25/25 (401–921 merkkiä) |
| `lahde`-rivi (artikkeli + 19.9.2026) | 25/25 |
| 2 kysymystä pululle | 25/25 |
| ≥ 2 kuvaa | 25/25 (8 kohteella vähintään 2, viidellä 3) |
| Kuvan kentät (osoite, lyhyt, selite, lahde, tekija, lahdeUrl, lisenssi, lisenssiUrl) | 58/58 |
| Lisenssi kelvollinen (PD / CC0 / CC BY / CC BY-SA) | 58/58; **luettu uudelleen Commonsin extmetadata-rajapinnasta erikseen** (4 rinnakkain) |
| Kuvatiedostot olemassa, sha256-etuliite = tiedostonimen tunniste | 58/58 |
| Korostukset löytyvät tekstistä | 25/25 |
| Fokuslehden rajaus (`osuuLehteen('HUN')`) | 25/25 |
| Karttarivi pelin omalla passilla (`nostojenKarttapaikat`) | 25/25 pääkartalla, `kaupunginKohdalla` = null kaikilla (pelikaupunki Budapest; lähin Kiskunságin puisto 13,3 ja Ópusztaszer 23,1 merkistä) |
| Nostojen etäisyys nykyisiin 23 HUN-nostoon (lautayks.) | pienin Szentendre – Tonava 3,5 (Fable hyväksyi); Mezőkövesd – Eger 7,7, Diósgyőr – Istállós-kő 8,0, Esztergom – Kruunuvarkaus 8,2, Badacsony – Balaton 8,7; muut ≥ 9,4. Nostot keskenään ≥ 8,7 |
| Päällekkäisyys nykyisten HUN-nostojen kanssa | ei samoja id:itä eikä nimiä |
| Visat: 4 vaihtoehtoa, oikea-indeksi kelvollinen, ei kaksoisvaihtoehtoja, ei selvästi pisin oikea | 10/10 |
| `node --test tests/*.test.mjs` | # tests 3671, # pass 3658, # fail 0, # skipped 13 (myös `tests/nimiolimitys.test.mjs`: ei nimiö–nimiö-limityksiä) |
| `node tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |

## Poikkeamat ja päätettävää (lähdesääntö: jos artikkeli ei tue listan väitettä, kohteen tyyppi/teksti vaihdettu ja kirjattu)

1. **Budapestin merkki**: laudan merkki (x 6492,7, y 1519,3) on ~33 yksikköä kaakkoon todellisesta paikastaan; Kecskemét (ja sen lähistö) pudotettu (kaupungin kohdalla 4,3). Fable antaa Opus 2:lle mittauserän kaikista pelikaupungeista. Uudet nostot eivät ole kaupungin kohdalla (lähin Kiskunságin puisto 13,3).
2. **Ipolytarnóc**: renkaan ulkopuolella 0,5; fossiilipaikan omia jalanjälkikuvia ei löytynyt kelvollisina, joten kuvina ilmakuva ja kävijäkeskuksen sisäänkäynti (PD). Tyyppi `historia` (esihistoria).
3. **Kiskunság**: tyyppi `kulttuuri` (puszta); kuvina csikós Bugacissa ja Fülöpházan dyynit. Artikkeli ei mainitse csikóseja; teksti kertoo vain puiston, pusztan tapahtumat ja dyynit.
4. **Kalocsa**: paprikamuseosta ei löytynyt hyvää kuvaa; kuvina katedraali ja koruompelu. Teksti kertoo paprikasta artikkelin mukaan.
5. **Mohács ja Szigetvár**: teksti asiallinen (1526, 1687; Suleiman kuoli luonnollisiin syihin, Zrinskin viimeinen rynnäkkö); kuvina Mohácsin muistopuiston portti (Sátorhely) ja Szigetvárin linnan vanhat Fortepan-valokuvat (mustavalkoinen ja seepia). Mohácsin nappi ja teksti kertovat myös Busójárás-karnevaalin (Unesco 2009).
6. **Fertőd, Ják**: artikkelit ovat lyhyitä (931 ja 1 690 merkkiä), tekstit lyhyitä (401 ja 467 merkkiä). Fertődin kolmas kuva on kappelin enkelinpäät (kullattuja enkeleitä sisäkuvassa jätettiin pois alastomuuden takia).
7. **Gödöllö**: teksti Franz Joseph ja Sisi; Unkarin valtio osti kartanon takaisin maaliskuussa 1867 ja lahjoitti sen kruunajaislahjana (artikkelin osio "Habsburg rule"). Pääkuva on PD (tekijä käyttäjätunnus "Zizzi").
8. **Herend**: kolmen kuvan joukossa yksi, jossa on tunnistettava henkilö (posliinimestari työssä; Commons-kuvaus sanoo häntä patsaan tekijäksi, mutta kuvassa hän tekee korikulhoa — selite kuvaa neutraalisti). **Ópusztaszer**: Feszty-panoraaman yksityiskohta (PD) valittu, kaatuneita esittävät osat hylätty; sen Commons-kuvaus on tyhjä, selite perustuu tiedostonimeen ja kuvaan.
9. **1873-näkökulma**: nappi-alaotsikot: Esztergom (1856 vihitty), Szentendre (kaupunkioikeudet 1872), Gödöllö (1867), Herend (Fischer Farkasházy 1872), Villány (postitoimisto 1867), Mezőkövesd (rautatie 1860), Ópusztaszer (panoraama maalataan 1892–94), Tisza-tó (pato 1973).
10. **Kuvat**: 10 tiedostoa nimetty uudelleen todellisen sha256:n mukaan (agentit B; JSON päivitetty); osa kuvista 1920 px leveitä (Commonsin vakiokoko); Hévízin lumpeet 1219 px. Fortepan-kuvien tekijä on kirjattu lahjoittajan mukaan (Lechner Nonprofit Kft., Ebner, Lissák Tivadar).

## Mitä jäi tekemättä

- **Kuvien vienti ämpäriin** (Fable): 58 tiedostoa kansiosta
  `/Users/samireivinen/Matkakirja-nostot-kuvat/bel/` osoitteeseen
  `https://media.matkakirja.app/karttanostot/20260920/<tiedosto>`; osoitteet on kirjattu pakkaan
  etukäteen, ennen vientiä ne vastaavat 404:llä (puuttuva kuva pudotetaan sarjasta). Kuvia ei ole
  committoitu. JSON-metatiedot ovat kansiossa `_json/`.
- HEAD-tarkistus ämpäriosoitteille (vasta viennin jälkeen).
- Unkarin nostoankkureita ei ole lukittu (`LUKITUT_MAAT` on vain FRA). Ipolytarnóc renkaan ulkopuolella ja rajan reunakohteet jäävät ankkurilukon varaan.
- Peliä ei avattu selaimessa; piirto todettu samalla reitillä kuin hahmotelma-fra.js (KOHDE_MAAT) ja testit ovat vihreitä.
- Silmäpistokoe: itse en katsonut yksittäisiä kuvia tässä erässä; viisi Sonnet-kuva-agenttia katsoi jokaisen ja listasi hylätyt ehdokkaat.
- Visat: vastauksen esiintyminen tekstissä tarkistettu käsin, ei koneellisesti.

## Kuvat ja kansio

`/Users/samireivinen/Matkakirja-nostot-kuvat/bel/`: 58 kpl `bel-nosto-<id>-<sha8>.jpg`, alikansio
`_json/` (kuvatiedot kohteittain).
