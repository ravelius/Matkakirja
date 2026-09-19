# Viesti Fablelle: Belgian hahmotelmanostot valmiina (vaihe 2 ja 3)

19.9.2026 klo 18.37 Suomen aikaa, Sonnet-sisältösessio "Matkakirja Sonnet nostot",
haara `sonnet-nostot-bel` (pohja origin/main 5e02e295, v1959). Versiota ei nostettu,
PR:ää ei avattu, ämpäriin ei viety, Raamattuun ei koskettu.

**Tulos: 26 nostoa (Fablen hyväksymä lista, ei korvauksia), 57 Commons-kuvaa, 9 rahavisaa.**
Uusi tiedosto `js/packs/hahmotelma-bel.js` (`HAHMOTELMA_BEL`, rakenne täsmälleen kuin hahmotelma-fra.js ja muut EU-pakat).
Rekisteröinti: `js/fokuskohteet.js` (import + `KOHDE_MAAT.BEL`), `sw.js` SHELL, `tools/build-standalone.mjs`. HUOM: haara on v1959:n päällä ilman
NLD-rivejä (ne tulevat v1960:ssä), joten rekisteröintirivit tulevat hahmotelma-fra-rivien jälkeen samoihin kohtiin kuin NLD:n — merge tuottaa
triviaalin konfliktin, ja kaikki rivit jäävät.

## KORJAUS VAIHEEN 1 LISTAAN: renkaan ulkopuolella on KAKSI kohdetta, ei kolmea rajalla

Listassa (vaihe 1) väitin kaikkien 26 olevan renkaan sisällä. Luin tulostaulukon väärin: **Semois (2,7 yksikköä) ja Zwin (0,1) ovat pelin karkean BEL-renkaan
ULKOPUOLELLA** (`maalla` = false), muut 24 sisällä. Aivan renkaan reunalla sisäpuolella: Orval 0,4 ja Ében-Émael 0,5. Anchor-lukko kattaa, jos tarvitaan;
koordinaatit ovat Wikipedian todelliset. Kaikki 26 osuvat Belgian fokuslehteen.

## Nostot, kuvat ja lisenssit

| id | nimi | tyyppi | teksti (merkkiä) | kuvia | tekijät | lisenssit | etäisyys BEL-renkaan reunaan (lautayks.) |
| --- | --- | --- | ---: | ---: | --- | --- | --- |
| high-fens | Hautes Fagnes | vuori | 641 | 2 | Horst J. Meuter, Rhetos | CC BY-SA 4.0, CC0 | 3 |
| semois | Semois | joki | 525 | 2 | FrDr, Trougnouf (Benoit Brummer) | CC BY-SA 4.0, CC BY 4.0 | 2.7 (ulkopuolella) |
| han-sur-lesse | Han-sur-Lessen luolat | joki | 575 | 2 | Jean-Pol GRANDMONT, Musicaline | CC BY 3.0, CC BY-SA 4.0 | 10.9 |
| zwin | Zwin | meri | 671 | 2 | DimiTalen, FrDr | CC0, CC BY-SA 4.0 | 0.1 (ulkopuolella) |
| hoge-kempen | Hoge Kempen | kulttuuri | 576 | 2 | Trougnouf (Benoit Brummer), FrDr | CC BY 4.0, CC BY-SA 4.0 | 2.3 |
| kalmthout | Kalmthoutse Heide | kulttuuri | 588 | 2 | Campinia88 | CC BY-SA 4.0 | 2.1 |
| lions-mound | Waterloon leijonakumpu | historia | 596 | 2 | Jean-Pol GRANDMONT, Johan's-brother-in-law | CC BY 3.0, CC BY-SA 3.0 | 20.4 |
| menin-gate | Menin Gate | historia | 597 | 2 | Marc Ryckaert | CC BY 3.0, CC BY-SA 4.0 | 5.3 |
| bastogne | Bastognen tähtimuistomerkki | historia | 727 | 2 | Marc Ryckaert, Zairon | CC BY 3.0, CC BY-SA 4.0 | 2.4 |
| bouillon | Bouillonin linna | historia | 499 | 2 | Eebie, Zairon | CC BY-SA 4.0 | 2.4 |
| tournai | Tournain tuomiokirkko | historia | 675 | 2 | Jean-Pol GRANDMONT, Ymblanter | CC BY 2.5, CC BY-SA 4.0 | 4.1 |
| eben-emael | Ében-Émaelin linnake | historia | 588 | 2 | Paul Hermans, Vincent de Groot | CC BY-SA 4.0 | 0.5 |
| kortrijk | Kultaisten kannusten taistelu | historia | 784 | 2 | Flamenc, Vanzieleghem | CC BY-SA 3.0, CC BY-SA 4.0 | 5.7 |
| orval | Orvalin luostari | ruoka | 720 | 3 | Dennis G. Jarvis, LionelCallewaert, Souvaroff | CC BY-SA 2.0, CC BY 4.0, CC BY-SA 3.0 | 0.4 |
| chimay | Chimay | ruoka | 585 | 2 | Jean-Pol GRANDMONT | CC BY 3.0, CC BY-SA 2.0 | 3.9 |
| dinant | Dinant | kulttuuri | 750 | 2 | DimiTalen, Jorge Franganillo | CC0, CC BY 2.0 | 5.8 |
| spa | Spa | kulttuuri | 726 | 2 | Romaine, Norbert Schnitzler | CC0, CC BY-SA 3.0 | 10.4 |
| brugge-belfry | Bruggen Belfry | kulttuuri | 746 | 2 | Wolfgang Staudt, Giles Laurent | CC BY 2.0, CC BY-SA 4.0 | 5.7 |
| tervuren | Tervurenin Afrikka-museo | kulttuuri | 790 | 2 | Nenea hartia, Smiley.toerist | CC BY-SA 4.0 | 23.6 |
| durbuy | Durbuy | kulttuuri | 560 | 2 | JackyM59 | CC BY-SA 4.0 | 18.8 |
| oudenaarde | Oudenaarde | kulttuuri | 645 | 3 | Herman.vandenbroeck, Pierre François Poelman, Sailko | CC BY-SA 4.0, Public domain, CC BY 3.0 | 14.6 |
| canal-du-centre | Canal du Centren laivanostimet | tekniikka | 710 | 3 | Willem123, Trougnouf (Benoit Brummer), Jleclerc | CC BY-SA 3.0, CC BY 4.0, CC BY-SA 4.0 | 8 |
| grand-hornu | Grand-Hornu | tekniikka | 453 | 3 | Schwickerath, Jean-Pol GRANDMONT, Davidh820 | CC BY-SA 3.0, CC BY 3.0 | 4.1 |
| bois-du-cazier | Bois du Cazier | tekniikka | 791 | 2 | Bourgeois.A, Jmh2o | CC BY-SA 3.0, CC BY-SA 4.0 | 10.7 |
| seraing | Seraingin terästehdas | tekniikka | 639 | 3 | Avandalen, Adrien Canelle, Borvan53 | CC BY-SA 4.0, Public domain | 11.2 |
| turnhout | Turnhout | kauppa | 698 | 2 | Dablond, Nenea hartia | CC BY-SA 4.0 | 4.9 |

Kuvia yhteensä 57; lisenssijakauma: CC BY-SA 4.0 27, CC BY-SA 3.0 8, CC BY 3.0 7, CC0 4, CC BY 4.0 4, CC BY-SA 2.0 2, CC BY 2.0 2, Public domain 2, CC BY 2.5 1.

## Rahavisat (9 noston kenttä `visa`, muoto kuten NLD:ssä ja fokusvirta-*.js:ssä)

Neljä vaihtoehtoa, oikea-indeksit 2,0,3,1,3,0,2,1,2 (tasainen), vastaus noston omasta tekstistä; `fakta` on saman artikkelin muu tieto. Tyypit: vuori, meri, historia ×2, ruoka, kulttuuri ×2, tekniikka, kauppa.

| nosto | tyyppi | kysymys | oikea |
| --- | --- | --- | --- |
| high-fens | vuori | Miksi osa Hautes Fagnesin suojelualueesta on suljettu kävijöiltä keväisin? | Uhanalaisen teeren pesimisen vuoksi (2) |
| zwin | meri | Mikä loi Zwin-salmen vuonna 1134? | Myrsky, joka puhkaisi Flanderin rannikon (0) |
| lions-mound | historia | Minkä tapahtuman muistoksi Leijonakumpu rakennettiin juuri tähän kohtaan? | Vilhelm Oranialaisen haavoittumisen Waterloon taistelussa (3) |
| kortrijk | historia | Mistä Kultaisten kannusten taistelu on saanut nimensä? | Noin 500 saaliiksi saadusta kannusparista (1) |
| orval | ruoka | Miksi Orvalin luostarissa elvytettiin oluenpano vuonna 1931? | Luostarin jälleenrakennuksen rahoittamiseksi (3) |
| spa | kulttuuri | Mistä sana spa eli kylpylä on saanut alkunsa? | Belgialaisen Spa-kaupungin nimestä (0) |
| tervuren | kulttuuri | Mitä varten Tervurenin Kongon museo perustettiin vuonna 1898? | Siirtomaapropagandan ja -toiminnan tueksi (2) |
| canal-du-centre | tekniikka | Miksi Thieun ja Houdeng-Gœgnies'n välillä käytettiin laivanostimia sulkujen sijaan? | Nousu oli liian jyrkkä sulkuportaille (1) |
| turnhout | kauppa | Minkä tuotteen teollisuudesta Turnhout on erityisen tunnettu? | Pelikorttien valmistuksesta (2) |

## Koneellinen tarkistus (vaihe 3)

| Mittari | Tulos |
| --- | --- |
| Nostoja | 26 |
| Teksti ≥ 200 merkkiä | 26/26 (453–791 merkkiä) |
| `lahde`-rivi (artikkeli + 19.9.2026) | 26/26 |
| 2 kysymystä pululle | 26/26 |
| ≥ 2 kuvaa | 26/26 (5 kohteella vähintään 2, viidellä 3) |
| Kuvan kentät (osoite, lyhyt, selite, lahde, tekija, lahdeUrl, lisenssi, lisenssiUrl) | 57/57 |
| Lisenssi kelvollinen (PD / CC0 / CC BY / CC BY-SA) | 57/57; **luettu uudelleen Commonsin extmetadata-rajapinnasta erikseen** (4 rinnakkain) |
| Kuvatiedostot olemassa, sha256-etuliite = tiedostonimen tunniste | 57/57 |
| Korostukset löytyvät tekstistä | 26/26 |
| Fokuslehden rajaus (`osuuLehteen('BEL')`) | 26/26 |
| Karttarivi pelin omalla passilla (`nostojenKarttapaikat`) | 26/26 pääkartalla, `kaupunginKohdalla` = null kaikilla (Belgiassa ei pelikaupunkia) |
| Nostojen etäisyys toisistaan (pääkartta, lautayks.) | pienin High Fens – Spa 7,5, Lion's Mound – Tervuren 7,7, Zwin – Bruggen Belfry 8,1; raja 7 |
| Päällekkäisyys nykyisten BEL-nostojen kanssa | ei nykyisiä BEL-nostoja |
| Visat: 4 vaihtoehtoa, oikea-indeksi kelvollinen, ei kaksoisvaihtoehtoja, ei selvästi pisin oikea | 9/9 |
| `node --test tests/*.test.mjs` | # tests 3667, # pass 3654, # fail 0, # skipped 13 (myös `tests/nimiolimitys.test.mjs`: ei nimiö–nimiö-limityksiä) |
| `node tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |

## Poikkeamat ja päätettävää (lähdesääntö: jos artikkeli ei tue listan väitettä, kohteen tyyppi/teksti vaihdettu ja kirjattu)

1. **Dinant**: en-Wikipedia mainitsee Adolphe Saxin vain rakennus- ja henkilöluettelossa (talo ja pieni museo); teksti kertoo Saxin talosta, ei syntymävuodesta tai muusta.
   Nappi sanoo "Sax on jo keksinyt saksofonin" (artikkeli: 1800-luvun keksijä). 1914 verilöylystä ei kirjoiteta (sovittu). Dinantin couque on artikkelin mukaan Euroopan kovin keksi.
2. **Chimay**: artikkelin johdanto kertoo vain luostarin panimosta ja juustoista ("kansainvälisesti tunnettuja"); tekstiin ei lisätty juustotyyppejä.
3. **Orval**: olut ja juusto ovat artikkelin johdannon mukaan; oluenpanon elvytys 1931 rahoittamaan jälleenrakennusta artikkelin osiosta "Second foundation".
4. **Hautes Fagnes**: Signal de Botrange on tekstissä (ei erillistä nostoa, koska < 7 yksikköä). Tyyppi `vuori` (ylänkö), kuten listassa.
5. **Hoge Kempen ja Kalmthoutse Heide**: tyyppi `kulttuuri` (ei metsä-/nummityyppiä), kuten listassa; Kalmthoutse Heide on Belgian ja Alankomaiden yhteispuisto.
6. **Menin Gate ja Bastogne** (muistopaikat): tekstit kertovat rakennuksesta ja muistamisesta; ei taisteluyksityiskohtia; kuvissa ei hautoja eikä nimiä (Menin Gate -kuvissa ei sisätilaa; päiväkuvassa pieni ihmisryhmä).
7. **Tervuren** (Fablen ohjeen mukaan asiallisesti, ei pehmennetä): teksti kertoo artikkelin mukaan Kongon vapaavaltion näyttelystä 1897, "ihmistarhasta" (60 kongolaista, seitsemän kuoli Belgiassa),
   Kongon museon perustamisesta 1898 siirtomaapropagandan välineeksi ja museon uudistuksesta 2013–2018 (aiempi näyttely ei ollut kriittinen siirtomaahistoriaa kohtaan). Kuvina vain rakennus ja puisto.
8. **Oudenaarde**: ei tekstissä Kaarle V:n avioton tytär (artikkelin sivuseikka); kuvakudokset ja kaupungintalo ovat pääaihe.
9. **Canal du Centre**: tekstin väite "32 sulkua" on nappi-alaotsikossa (artikkeli: "as many as 32 locks"); Strépy-Thieun uusi nostin (2002) on visan faktassa, ei tekstissä.
10. **Seraing**: kohde on Cockerillin teräs (artikkeli: rautatehtaat 1809, John Cockerill & Cie 1817); Val-Saint-Lambertin kristallitehdas mainitaan vain nähtävyytenä.
11. **1873-näkökulma**: nappi-alaotsikot katsovat 1873 → eteenpäin (Ében-Émael 1935, Bastogne 1946–50, Menin Gate 1927, Bois du Cazier 1956, Tervuren 1897).
12. **Kuvarajoitukset**: Zwinin ensimmäinen kuva (rantaniitty) on otettu Alankomaiden puolelta (Retranchement), mutta alue on sama Zwin. Waterloon taistelun PD-maalaus/piirros ei ollut kelvollinen (vertakuvia ja tekstiä),
   joten Lion's Mound -kuvina ovat kumpu ja leijonapatsas (patsaskuvassa yksi ohikulkija). Menin Gaten sisäkuvat hylättiin (nimitaulut). Bastognen tähtimuotoa ylhäältä ei löytynyt. Kortrijkin PD-miniatyyrit ja Ensorin maalaus hylättiin
   (veri/paspartuu); kuvina Groeningen muistomerkki. Kolme Orvalin, Canal du Centren, Grand-Hornun, Oudenaarden ja Seraingin kuvaa (kolmas eri näkökulmasta). Kuvia 1920 px leveitä (1800 sijaan), koska Commonsin pikkukuvarajapinta antaa vakiokoon;
   alle 1800 px: Kortrijk-pääkuva 985 px, Lions Mound -patsas 1728 px. Seraingin litografia rajattu (paperin reunat ja alateksti pois; tiedostonimen sha laskettu rajauksen jälkeen: 2a28943e). Spa-sisäkuva näyttää keskeneräisen remontin.
   `lisenssiUrl` on osalla kuvista Commonsin antamassa muodossa (`http://…/3.0/`).

## Mitä jäi tekemättä

- **Kuvien vienti ämpäriin** (Fable): 57 tiedostoa kansiosta
  `/Users/samireivinen/Matkakirja-nostot-kuvat/bel/` osoitteeseen
  `https://media.matkakirja.app/karttanostot/20260920/<tiedosto>`; osoitteet on kirjattu pakkaan
  etukäteen, ennen vientiä ne vastaavat 404:llä (puuttuva kuva pudotetaan sarjasta). Kuvia ei ole
  committoitu. JSON-metatiedot ovat kansiossa `_json/`.
- HEAD-tarkistus ämpäriosoitteille (vasta viennin jälkeen).
- Belgian nostoankkureita ei ole lukittu (`LUKITUT_MAAT` on vain FRA). Semois ja Zwin renkaan ulkopuolella jäävät ankkurilukon varaan.
- Peliä ei avattu selaimessa; piirto todettu samalla reitillä kuin hahmotelma-fra.js (KOHDE_MAAT) ja testit ovat vihreitä.
- Silmäpistokoe: itse en katsonut yksittäisiä kuvia tässä erässä; viisi Sonnet-kuva-agenttia katsoi jokaisen ja listasi hylätyt ehdokkaat.
- Visat: vastauksen esiintyminen tekstissä tarkistettu käsin, ei koneellisesti.

## Kuvat ja kansio

`/Users/samireivinen/Matkakirja-nostot-kuvat/bel/`: 57 kpl `bel-nosto-<id>-<sha8>.jpg`, alikansio
`_json/` (kuvatiedot kohteittain).
