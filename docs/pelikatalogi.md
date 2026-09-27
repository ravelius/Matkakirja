# Pelikatalogi — Euroopan perinteiset pelit maittain

Ensimmäinen versio: 27.9.2026 (Sisältökirjuri, tutkimusagentit maittain).
Omistajan suunta 27.9.2026 klo 09.5x: pelit ovat yhtä merkittävä osa
Matkakirjaa kuin linssit, ja niille tehdään oma suunnittelusivu samalla
mallilla kuin [docs/linssikatalogi.md](linssikatalogi.md). Tämä on
**elävä luettelo** — pelejä lisätään ja tila päivittyy. Koneluettava
data-tiedosto ja HTML/Pages-kopio (pelikatalogi.html) eivät kuulu
Sisältökirjurin vastuulle — ne tekee Pelikoodari, kun peliä aletaan
toteuttaa.

Kohderyhmä on 13 vuotta täyttäneet ja aikuiset (peli EI ole lastenpeli,
ks. CLAUDE.md ja Raamatun perustuslaki). Linja: **vähemmän pelkkää
tietovisaa, enemmän pelejä joissa opitaan tekemällä** — korttipelin
pisteytys opettaa laskemista, lautapelin reitti tai muodostelma opettaa
geometriaa, ja niin edelleen. Jokainen peli on pelattavissa joko bottia
(tekoälyvastustajaa) tai oikeaa kaveria vastaan matkan varrella.

## Näin katalogi on järjestetty

Yksi peli = yksi rivi, maittain ryhmiteltynä kahdeksaan maantieteelliseen
osaan (samalla logiikalla kuin linssikatalogin ryhmät ovat aiheittain).
Id:t eivät muutu: muoto on `<ISO3>-N` (esim. `FIN-2`), jossa ISO3 on
maan kolmikirjaiminen koodi (sama kuin pelin oma `map.cityCountry`).

Sarakkeet:

- **peli**: pelin nimi suomeksi + alkuperäinen nimi/kieli suluissa.
- **sääntö**: säännöt tiiviisti 1–2 virkkeenä — miten pelataan ja
  voitetaan.
- **oppimiskytkös**: yksi konkreettinen asia, jonka pelaaja (13+) oppii
  pelistä (historia, kieli, laskenta, maantieto, kulttuuri, fysiikka).
- **sopivuus 13+**: onko peli aidosti aikuiselle/13+ kohderyhmälle
  sopiva — perinteisesti lasten leikiksi mielletyt pelit on merkitty
  erikseen ja perusteltu, miksi ne silti toimivat (tai jätettävä pois).
- **botti/kaveri**: pelataanko tekoälyä ("botti") vai oikeaa kaveria
  vastaan — vai kumpaakin.
- **pelikytkös**: ehdotus, miten peli kytkeytyy matkakirjaan (yleensä:
  peli avautuu saapuessa kaupunkiin/kohteeseen, voitosta pelimerkki
  tai aarrevihje). Nämä ovat ehdotuksia, ei lopullisia päätöksiä.
- **oikeudet**: **SUORA** (kansanperinnettä, PD, ei nykyistä
  tekijänoikeutta tai tavaramerkkiä — voidaan toteuttaa suoraan samalla
  nimellä ja mekaniikalla) tai **OMA VERSIO** (nykyinen nimi, ulkoasu
  tai virallinen sääntöteksti on suojattu — sama mekaniikka, mutta oma
  nimi/ulkoasu, tai sääntöjä on muokattava esim. turvallisuussyistä
  digitaaliseen peliin sopivaksi). Katso tarkennukset kunkin osan
  huomiot-kappaleesta.
- **lähde**: tarkistettava lähde (yleensä Wikipedia tai vastaava),
  josta tieto on peräisin. Tutkimusagentit käyttivät oikeaa
  web-hakua — sääntöjä tai lähteitä ei ole sepitetty.
- **tila**: **idea** (kaikki rivit tällä hetkellä — mikään peli ei ole
  vielä suunniteltu tai toteutettu) tai **tarkista** (lähde ohut tai
  peli vaatii merkittävää muokkausta ennen toteutusta, ks. osan
  huomiot).

### Oikeudet-selite

- **SUORA** — kansanperinnettä tai antiikista/keskiajalta periytyvää;
  ei nykyistä tekijänoikeutta tai tavaramerkkiä, joka estäisi suoran
  toteutuksen samalla nimellä.
- **OMA VERSIO** — peli-idea/mekaniikka on vanhaa, mutta nykyinen nimi
  tai tarkka sääntöteksti on jonkun omistama (esim. Mölkky on Tactic
  Games Oy:n rekisteröity tavaramerkki, vaikka mekaniikka juontuu
  vanhemmasta kyykkäperinteestä) — tai peli vaatii yksinkertaistusta
  fyysisen kontaktin/turvallisuuden vuoksi (esim. sormipaini,
  keppitaistelu). Toteutetaan oma nimi ja ulkoasu, sama mekaniikka.

---

## 1. Pohjoismaat

*(Tanska, Suomi, Islanti, Norja, Ruotsi — 13 peliä)*

| id | peli | maa | sääntö | oppimiskytkös | sopivuus 13+ | botti/kaveri | pelikytkös | oikeudet | lähde | tila |
|---|---|---|---|---|---|---|---|---|---|---|
| DNK-1 | Langbold (tanskalainen "pitkäpallo") | Tanska | Kaksi 11 hengen joukkuetta; lyöjä lyö pallon ja juoksee takarajalle ja takaisin ilman kiinnijäämistä, turvallisesta paluusta piste. | Rounders/baseball-pelisuvun eurooppalainen alkuperä + riskinarviointi (milloin juosta takaisin). | Kyllä — koulu- ja aikuisurheilua 1950-luvulle asti. | Kaveri (joukkuepeli); yksinkertaistettu heitto/juoksu-minipeli bottia vastaan. | Avautuu Kööpenhaminassa; onnistuneesta juoksusta pelimerkki. | SUORA — kirjattu jo 1700-luvun sanakirjaan. | [Danish longball – Wikipedia](https://en.wikipedia.org/wiki/Danish_longball) | idea |
| DNK-2 | Gnav | Tanska | Pelaajat vaihtavat piilotettuja kortteja/nappuloita vuorotellen; heikoimman jäänyt häviää kierroksen, erikoiskortit (mm. käki) estävät/kääntävät vaihdon. | Tanska–Norja-unionin historia (peli levisi Norjaan) ja sanan matka Italiasta Tanskaan. | Kyllä — alun perin aikuisten uhkapeli, lastenpeliksi vasta 1800-l. | Molemmat. | Korttiminipeli Tanska–Norja-reitillä; hävinneen kortin paljastuminen antaa vihjeen. | SUORA — perinnepeli 1820-luvulta, geneerinen nimi. | [Gnav – Wikipedia](https://en.wikipedia.org/wiki/Gnav) | idea |
| FIN-1 | Kyykkä (Karjalan kyykkä) | Suomi | Kaksi joukkuetta heittää puukapuloilla vastarinnan ruudusta kymmenen pystypölkkyä pois mahdollisimman harvalla heitolla. | Karjalan raja-alueen historia (elvytetty 1951) + heittokulman arviointi. | Kyllä — aikuisten kilpaurheilulaji (SM-sarja). | Molemmat. | Avautuu Karjalan/Itä-Suomen kohteessa; tarkka heitto paljastaa vihjeen. | SUORA — kansanperinnelaji. | [Finnish skittles – Wikipedia](https://en.wikipedia.org/wiki/Finnish_skittles) | idea |
| FIN-2 | Mölkky | Suomi | Heitetään puukeilaa numeroituja tappikeiloja kohti; pisteet lasketaan tarkasti 50:een (yli menevä heitto pudottaa pisteet 25:een). | Vähennyslasku ja tarkka pistelaskenta täsmälukuun. | Kyllä — yleinen aikuisten kesäjuhlapeli. | Molemmat. | Avautuu kesämökki-/järvikohteella; oikea pistesumma avaa vihjeen. | OMA VERSIO — nimi on Tactic Games Oy:n rekisteröity tavaramerkki (1996); mekaniikka juontuu vanhemmasta kyykkä/gorodki-perinteestä. | [Mölkky – Wikipedia](https://en.wikipedia.org/wiki/M%C3%B6lkky) | idea |
| FIN-3 | Ristiseiska | Suomi | 3–5 pelaajaa rakentaa pöytään neljä maakohtaista riviä ristiseiskasta lähtien; ensin korteista eroon pääsevä voittaa. | Nousevan/laskevan lukujonon hahmottaminen. | Kyllä — yleinen suomalainen aikuisten/perheen korttipeli. | Molemmat. | Juna-/kahvilaminipeli, voitosta sivu isoisän päiväkirjasta. | SUORA — perinteinen korttipeli, geneerinen nimi. | [Ristiseiska – Wikipedia](https://en.wikipedia.org/wiki/Ristiseiska) | idea |
| ISL-1 | Glíma | Islanti | Kaksi painijaa pitää kiinni toisen housujen pitimistä ja yrittää kaataa vastustajan niin että tämä koskettaa maata polven yläpuolelta; lyönnit kielletty. | Islannin keskiaikainen lakihistoria (Jónsbók 1325) + tekniikka voiman sijaan. | Kyllä — Islannin virallinen kansallislaji aikuisille. | Ensisijaisesti kaveri; digitaalisena ajoitus/tasapainominipelinä botti mahdollinen. | Avautuu Reykjavíkin turnajaisessa; voitosta viikinkiaiheinen merkki. | SUORA — kansallinen perinnelaji. | [Glíma – Wikipedia](https://en.wikipedia.org/wiki/Glima) | idea |
| ISL-2 | Brús | Islanti | Neljä pelaajaa kahdessa parissa, 36 kortin pakka; erikoinen arvojärjestys (mm. ristipoika, hertan kuningas) ratkaisee tikit — ensin viiteen voittaa. | Havainnollistaa, että sääntöjen arvojärjestykset ovat sopimuksenvaraisia (Euroopan vanhimman korttipelin, Karnöffelin, perintöä). | Kyllä — aikuisten seurapeli erityisesti Svarfaðardalurissa. | Molemmat. | Avautuu maalaistalossa/kylässä; erikoissääntöjen läpäisy antaa vihjeen. | SUORA — alueellinen perinnekorttipeli. | [Brús – Wikipedia](https://en.wikipedia.org/wiki/Br%C3%BAs) | idea |
| ISL-3 | Vikivaki | Islanti | Ryhmä tanssii käsi kädessä piirissä/ketjussa laulun tahtiin; laulu ohjaa muodonmuutoksia. | Keskiaikainen tarinatanssiperintö ("sagnadansar") + pohjoismainen kulttuurivaihto. | Kyllä — perinteisesti häissä/juhlissa tanssittu aikuisten yhteisötanssi. | Kaveri (ryhmätanssi); digitaalisena rytminappipelinä botti mahdollinen. | Avautuu kyläjuhlassa; oikea rytmi paljastaa piilotetun vihjeen. | SUORA — keskiaikainen kansantanssiperinne. | [islit.is: Dance](https://www.islit.is/en/art-and-culture-in-iceland/dance/) | idea |
| NOR-1 | Hnefatafl | Norja | Epäsymmetrinen lauta (11×11 tai 13×13): hyökkääjät piirittävät ja yrittävät vangita kuninkaan, puolustajat vievät kuninkaan turvaan reunalle. | Viikinkiajan strategiahistoria + esimerkki lähdekritiikistä (1732 käännösvirhe vääristi säännöt vuoteen 1900-l. asti). | Kyllä — aikuisten strategiapeli. | Molemmat — klassinen 2-pelaajan abstrakti peli sopii botille hyvin. | Avautuu viikinkikohteessa/museossa; strateginen voitto paljastaa osan kartasta. | SUORA — historiallinen geneerinen pelinimi (kuten shakki). | [Historical rules of Hnefatafl](https://aagenielsen.dk/historical_hnefatafl_rules.php) | idea |
| NOR-2 | Slåball | Norja | Kaksi joukkuetta ("sisä"/"ulko"); sisäjoukkue lyö palloa mailalla ja juoksee kannasten kautta ilman kiinnijäämistä. | Rounders/baseball-pelisuvun eurooppalais-amerikkalainen yhteys + juoksuriskin arviointi. | Kyllä — koulujen ja aikuisten kesäjuhlien joukkuepeli. | Kaveri (joukkuepeli); yksinkertaistettu botti-versio mahdollinen. | Avautuu koulupiha-/kaupunkikohteessa; onnistunut kotiinjuoksu antaa pelimerkin. | SUORA — geneerinen alueittain vaihteleva perinnepeli. | [Slåball – norjankielinen Wikipedia](https://no.wikipedia.org/wiki/Sl%C3%A5ball) | idea |
| SWE-1 | Kubb | Ruotsi | Kaksi joukkuetta heittää kapuloilla kaataakseen vastustajan puupölkyt (kubbit) ja lopuksi keskellä olevan "kuninkaan". | Heittoradan geometria + lähdekritiikki (dokumentoitu vasta 1911, ei todistetusti viikinkiaikainen). | Kyllä — aikuisten pihapeli, MM-kisat Gotlannissa. | Molemmat — vuoropohjainen heittopeli sopii botille hyvin. | Avautuu Gotlanti-/maaseutukohteessa; kuninkaan kaataminen paljastaa aarteen sijainnin. | SUORA — geneerinen nimi, ei yksittäistä tavaramerkkiä. | [Kubb – Wikipedia](https://en.wikipedia.org/wiki/Kubb) | idea |
| SWE-2 | Brännboll | Ruotsi | Lyöjä heittää itse pallon ja lyö sitä, juoksee 4 kannaksen kautta jäämättä kiinni väliltä. | Riskiajattelu (milloin juosta) + ruotsalainen kesäjuhlaperinne. | Kyllä — aikuisten kesäjuhla-/turnauspeli. | Kaveri (joukkuepeli); yksinkertaistettu botti-versio mahdollinen. | Avautuu kesäjuhlakohteessa; onnistunut kierros antaa yhteisömerkin. | SUORA — geneerinen perinnepeli. | [Brännboll – Wikipedia](https://en.wikipedia.org/wiki/Br%C3%A4nnboll) | idea |
| SWE-3 | Vira | Ruotsi | Kolme pelaajaa, 13 korttia; bridge-tyyppinen tarjouskierros, voittaja pelaa yksin kahta muuta vastaan valitsemillaan valteilla. | Tarjous-/huutokauppalogiikka ja todennäköisyysarviointi; 1800-luvun seurapiirihistoria. | Kyllä — "Ruotsin kansallinen korttipeli". | Molemmat — botti hoitaa kaksi muuta pelaajaa. | Avautuu kartanossa/kahvilassa; onnistunut tarjous avaa vihjeen. | SUORA — 1800-luvun perinnekorttipeli. | [Vira (card game) – Wikipedia](https://en.wikipedia.org/wiki/Vira_(card_game)) | idea |

**Huomiot:** Tanska ja Norja olivat vaikeimmat — moni "kansanpeli" on koko
Pohjolan yhteinen peliperhe (Gnav on yhtä lailla norjalainen; Kubb
leimataan usein virheellisesti viikinkiperäiseksi, vaikka dokumentoitu
alkuperä on ruotsalainen Gotlanti). **Mölkky (FIN-2)** on ainoa selvä
OMA VERSIO tässä ryhmässä: nimi on rekisteröity tavaramerkki, vaikka
mekaniikka on vanhempaa perinnettä.

---

## 2. Brittein saaret ja Benelux

*(Iso-Britannia, Irlanti, Belgia, Alankomaat, Luxemburg — 15 peliä)*

| id | peli | maa | sääntö | oppimiskytkös | sopivuus 13+ | botti/kaveri | pelikytkös | oikeudet | lähde | tila |
|---|---|---|---|---|---|---|---|---|---|---|
| GBR-1 | Cribbage | Iso-Britannia | 2+ pelaajaa laskee kädestä ja pöydästä yhdistelmiä (15:t, parit, putket) ja merkitsee pisteet tapilla laudalle; ensimmäinen 121 pisteeseen voittaa. | Päässälasku: korttiarvojen summaaminen 15:een ja 31:een. | Kyllä — aito 1600-luvun pubipeli aikuisille. | Molemmat. | Avautuu englantilaisessa pubikohtauksessa isoisän reitillä; voitosta pelimerkki. | SUORA — n. 1630, ei tavaramerkkiä. | [Britannica: Cribbage](https://www.britannica.com/topic/cribbage) | idea |
| GBR-2 | Yhdeksän miehen mylly (Nine Men's Morris) | Iso-Britannia | 2 pelaajaa asettaa/siirtää 9 nappulaa risteyskohdissa; 3 nappulan suora rivi ("mylly") poistaa vastustajan napin. | Looginen päättely ja geometria (rivit/risteykset). | Kyllä — pelattiin keskiajan katedraaleissa ja kartanoissa. | Molemmat. | Avautuu keskiaikaisessa englantilaiskaupungissa/katedraalissa. | SUORA — antiikista/keskiajalta, ei tavaramerkkiä. | [Nine men's morris – Wikipedia](https://en.wikipedia.org/wiki/Nine_men%27s_morris) | idea |
| GBR-3 | Kastanjapeli (Conkers) | Iso-Britannia | 2 pelaajaa lyö vuorotellen narussa roikkuvalla hevoskastanjalla toisen kastanjaa, kunnes toinen hajoaa. | Fysiikka/materiaalioppi: kastanjan kovetus ja heiluriliikkeen törmäysenergia. | Kyllä perustellusti — aikuisten MM-kisat (World Conker Championships) v. 1965 alk. | Kaveri (vuorottelu); botti voi simuloida kastanjan lujuutta. | Avautuu syksyisessä brittiläisessä maaseutukohteessa. | SUORA — 1800-luvulta, ei tavaramerkkiä. | [Conkers – Wikipedia](https://en.wikipedia.org/wiki/Conkers) | idea |
| IRL-1 | Kaksikymmentäviisi (Twenty-Five) | Irlanti | 2–9 pelaajaa pelaa 5 kortin tikkipeliä, jossa valttiviitonen, valttisotamies ja hertta-ässä ovat vahvimmat; ensimmäinen 25 pisteeseen voittaa. | Päässälasku (pisteiden kertymä 25:een) + valttihierarkian looginen päättely. | Kyllä — Irlannin "kansallinen korttipeli". | Molemmat. | Avautuu irlantilaisessa maalaistalossa/pubissa. | SUORA — 1700–1800-luvulta. | [Twenty-five (card game) – Wikipedia](https://en.wikipedia.org/wiki/Twenty-five_(card_game)) | idea |
| IRL-2 | Tienvarsikeilailu (Irish road bowling) | Irlanti | 2 pelaajaa/joukkuetta heittää vuorotellen n. 800 g rautakuulaa pitkin maaseututietä; vähimmällä heittomäärällä maaliin voittaa. | Fysiikka (heittokulma/voima vs. matka) + maantieto (Cork/Armagh-reitit). | Kyllä — aikuisurheilua, MM-kisat vuodesta 1985. | Molemmat (kaveri heittää vuoron, botti simuloi fysiikalla). | Avautuu Corkin/Armaghin maaseututiellä, voitto avaa oikoreitin kartalla. | SUORA — kansanperinnettä. | [Irish road bowling – Wikipedia](https://en.wikipedia.org/wiki/Irish_road_bowling) | idea |
| IRL-3 | Kettu ja hanhet (Fox and Geese) | Irlanti | Epäsymmetrinen lauta: yksi ohjaa kettua, toinen 13–15 hanhea; kettu syö hanhia hyppäämällä yli, hanhet yrittävät saartaa ketun. | Strategia: epäsymmetrisen taistelun logiikka (vähemmistö vs. enemmistö). | Kyllä — pelattu myös hoveissa (kuningatar Victorian suosikki). | Molemmat. | Avautuu vanhan tilan pihalla Irlannin maaseudulla. | SUORA — keskiaikaista kansanperinnettä (juuret jaettuja Irlanti/Skandinavia/Britannia). | [Fox games – Wikipedia](https://en.wikipedia.org/wiki/Fox_games) | idea |
| BEL-1 | Lintutikka (Vogelpik) | Belgia | Pelaaja heittää vuorotellen tikkoja kuuden renkaan tauluun; useamman erän jälkeen eniten pisteitä kerännyt voittaa. | Käsi-silmäkoordinaatio + pistelasku (6 eriarvoista rengasta). | Kyllä — flaamilainen pubipeli 1790-luvulta. | Molemmat. | Avautuu flaamilaisessa kylässä/pubissa. | SUORA — n. 1792, ei tavaramerkkiä. | [vogelpiks.com: The Game of Vogelpik](https://vogelpiks.com/) | idea |
| BEL-2 | Kaarikeilailu (Rolle bolle) | Belgia | 2 joukkuetta vierittää epäkeskistä kiekkoa kohti tolppaa; lähimmät kiekot tuovat pisteitä, ensin 8 pisteeseen voittaa. | Fysiikka: epäkeskisen kappaleen kaartuva rata (vrt. curling) + etäisyysarvio. | Kyllä — aikuisten maaseutupeli. | Molemmat. | Avautuu flaamilaisen kylän pelikentällä. | SUORA — 1800-luvulta. | [Rolle bolle – Wikipedia](https://en.wikipedia.org/wiki/Rolle_bolle) | idea |
| BEL-3 | Wiisi (Wiezen) | Belgia | 4 pelaajaa muodostaa tarjousten kautta tilapäisiä liittoja (1v3 tai 2v2) tikkipelissä; eniten pisteitä kerännyt osapuoli voittaa erän. | Strategia ja tarjousmekaniikka: oman käden vahvuuden arviointi ennen liittoa. | Kyllä — aito belgialainen kahvila-/pubipeli. | Molemmat. | Avautuu belgialaisessa kahvilassa matkan varrella. | SUORA — Whistin belgialainen muunnos. | [pagat.com: Wiezen](https://www.pagat.com/whist/wiezen.html) | idea |
| NLD-1 | Sjoelen | Alankomaat | Pelaaja liu'uttaa 30 kiekkoa kolmessa erässä neljän portin (arvot 1–4) läpi; täysi sarja tuo 20 lisäpistettä. | Päässälasku: pisteiden summa + "sarjojen" tunnistaminen. | Kyllä — jouluperinteen aikuis-/perhepeli, kilpalaji vuodesta 1977. | Molemmat. | Avautuu hollantilaiskodissa joulun/uudenvuoden kohtauksessa. | SUORA — n. 1900. | [Sjoelen – Wikipedia](https://en.wikipedia.org/wiki/Sjoelen) | idea |
| NLD-2 | Klaverjassen | Alankomaat | 4 pelaajaa parittain pelaa 32 kortin tikkipeliä, valtin sotamies ja yhdeksän (manilja) korkeimmat; yli puolet pisteistä kerännyt joukkue voittaa erän. | Päässälasku: yhdistelmäpisteet (esim. 4 sotamiestä = 200 p). | Kyllä — Alankomaiden kansallinen korttipeli. | Molemmat. | Avautuu hollantilaisessa kahvilassa. | SUORA — 1700-luvulta. | [Klaverjas – Wikipedia](https://en.wikipedia.org/wiki/Klaverjas) | idea |
| NLD-3 | Kaatsen (friisiläinen käsipallo) | Alankomaat | 2 joukkuetta (3 hlöä) nurmikentällä; pallo lyödään paljaalla/kintaalla suojatulla kädellä vastapuolen alueelle, pisteytys kuin tenniksessä. | Fysiikka (lyöntikulma/-voima) + alueellinen identiteetti (Friisinmaa). | Kyllä — aikuisten kilpaurheilua, vanhin turnaus (P.C.) v. 1854. | Molemmat. | Avautuu Friisinmaan kylässä. | SUORA — keskiajalta. | [Frisian handball – Wikipedia](https://en.wikipedia.org/wiki/Frisian_handball) | idea |
| LUX-1 | Keilat (Quilles / Keelen) | Luxemburg | Pelaaja vierittää pientä reiätöntä palloa rataa pitkin kaatamaan 9 keilaa; eniten keiloja kaatanut voittaa erän. | Fysiikka: pallon pyörimisliikkeen ja tarkkuuden hallinta. | Kyllä — Luxemburgin aikuisten "kansallislaji". | Molemmat. | Avautuu luxemburgilaisen kylän Keelebunn-radalla. | SUORA — kansanperinnettä. | [journal.lu: The Luxembourgish Sport](https://journal.lu/) | idea |
| LUX-2 | Konter a Matt | Luxemburg | 4 pelaajaa parittain, 24 kortin tikkipeli, jossa 3 kuningatarta ovat pysyviä valtteja; yli 21 pistettä kerännyt joukkue voittaa erän. | Päässälasku ja strategia: korttiarvot + tarjousten riskinarviointi. | Kyllä — Luxemburgin suosituin korttipeli. | Molemmat. | Avautuu luxemburgilaisessa kahvilassa erikoisvihjeenä. | SUORA. | [Konter a Matt – Wikipedia](https://en.wikipedia.org/wiki/Konter_a_Matt) | idea |
| LUX-3 | Kujong | Luxemburg | Yksinkertaisempi 2v2-tikkipeli 24 kortilla (ässä=4, kuningas=3, kuningatar=2, sotamies=1). | Päässälasku: yksinkertaisten korttiarvojen yhteenlasku. | Kyllä — aikuisten/nuorten kahvilapeli. | Molemmat. | "Harjoituspeli" ennen Konter a Mattia matkakirjassa. | SUORA — Couillon/Kwajongen-muunnos. | [pagat.com: Couillon](https://www.pagat.com/jass/couillon.html) | tarkista |

**Huomiot:** Luxemburg oli vaikein — syvällisempiä lähteitä Kujongin
tarkoista säännöistä ei löytynyt, kuvaus nojaa Couillon-perheen
yleistietoon (merkitty **tarkista**). Fox and Geeseen (IRL-3) alkuperä
on kiistanalainen: jaettua pohjois-eurooppalaista perinnettä, ei
yksinomaan irlantilainen.

---

## 3. Länsi- ja Etelä-Eurooppa

*(Ranska, Espanja, Portugali, Italia, Malta — 15 peliä)*

| id | peli | maa | sääntö | oppimiskytkös | sopivuus 13+ | botti/kaveri | pelikytkös | oikeudet | lähde | tila |
|---|---|---|---|---|---|---|---|---|---|---|
| FRA-1 | Pétanque (Boules) | Ranska | Heitä metalliset boulet mahdollisimman lähelle pientä puista tavoitepalloa (cochonnet) seisten paikallaan; ensimmäinen 13 pisteeseen voittaa. | Etäisyyksien ja kulmien silmämääräinen arviointi (käytännön geometria). | Kyllä — aikuisten peli kylän toreilla ja puistoissa kautta Ranskan. | Molemmat. | Avautuu Etelä-Ranskan kaupungissa (esim. Marseille); voitosta pelimerkki. | SUORA. | [Pétanque – Wikipedia](https://en.wikipedia.org/wiki/P%C3%A9tanque) | idea |
| FRA-2 | Belote | Ranska | 4 pelaajaa kahdessa parissa, 32 kortin pakka; voitetaan tikkejä valtin avulla, pisteet korttien arvoista ja kuningas+rouva-yhdistelmästä (20 p). | Päässälaskua (pisteiden ja korttiarvojen yhteenlasku, todennäköisyys). | Kyllä — Ranskan kansallinen korttipeli, baarit ja perhejuhlat. | Molemmat, parhaimmillaan 4 kaverin kesken. | Pelataan kahvilassa/junassa matkan aikana; hyvä käsi avaa vihjeen. | SUORA. | [Belote – Wikipedia](https://en.wikipedia.org/wiki/Belote) | idea |
| FRA-3 | Hanhipeli (Jeu de l'Oie) | Ranska | Nopanheitolla edetään spiraalimaisella 63-ruutuisella radalla; hanhikuvat antavat lisäsiirron, sudenkuoppa/silta/kuolema-ruudut rankaisevat. | Maantieto — alkuperäinen ranskalainen versio oli 1600-luvun karttapeli, jossa rata kuvasi oikeaa matkareittiä. | Kyllä perustellusti — historiallisesti myös aikuisten seura-/uhkapeli ja opetusväline. | Molemmat. | Isoisän päiväkirjan reitti muutetaan pelilaudaksi. | SUORA (mekaniikka/nimi 1600-luvulta; oma laudan ulkoasu tehtävä itse). | ["The geographical Jeux de l'Oie of Europe"](https://journals.openedition.org/belgeo/11907) | idea |
| ESP-1 | Mus | Espanja | 4 pelaajaa, 2 paria, espanjalainen 40 kortin pakka; veikataan 4 kategoriasta bluffaten parin kanssa merkein; ensimmäinen 40 pisteeseen voittaa. | Ei-sanallinen parimerkkikieli ja strateginen bluffauspäättely. | Kyllä — Espanjan suosituin korttipeli, opiskelijoiden/aikuisten baaripeli. | Molemmat, pariviestintä toimii parhaiten oikean kaverin kanssa. | Avautuu Baskimaan/Pohjois-Espanjan kaupungissa; onnistunut bluffi tuo vihjepisteen. | SUORA. | [Mus (card game) – Wikipedia](https://en.wikipedia.org/wiki/Mus_(card_game)) | idea |
| ESP-2 | Ranan peli (Juego de la Rana) | Espanja | Heitetään 10 metallikiekkoa n. 3,5 m päästä pöytään; sammakon suuhun 50 p, muut reiät vähemmän. | Käytännön fysiikkaa/geometriaa (heittokulma, etäisyys) ja pisteiden yhteenlaskua. | Kyllä — perinteinen aikuisten baari-/toripeli. | Molemmat. | Löytyy torilta/kylän baarista; tarkka heitto avaa piilovihjeen. | OMA VERSIO — nykyvalmistajilla omia pöytämalleja, suositeltavaa oma ulkoasu. | [tradgames.org.uk: Pitching Discs](https://www.tradgames.org.uk/games/Pitching-Discs.htm) | idea |
| ESP-3 | Chinchón | Espanja | 40 kortin rypäspeli (7 kortin käsi); kerätään sarjoja/putkia, jäljelle jääneet kortit tuovat miinuspisteitä. | Päässälaskua — pistearvojen yhteen-/vähennyslasku joka kierroksella. | Kyllä — suosittu perhe-/baaripeli teineille ja aikuisille. | Molemmat. | Pelataan majatalossa illalla; voitto antaa lisäaikaa vihjeen etsintään. | SUORA. | [Chinchón (card game) – Wikipedia](https://en.wikipedia.org/wiki/Chinch%C3%B3n_(card_game)) | idea |
| PRT-1 | Sueca | Portugali | 4 pelaajaa, 2 paria, 40 kortin pakka; valttimaa (manilha, yleensä 7) vahvistaa tikinottoa, eniten korttipisteitä kerännyt pari voittaa. | Muisti ja todennäköisyys (mitä kortteja on jo pelattu) + portugalin sanastoa. | Kyllä — Portugalin kansallispeli, kahvilat ja perhejuhlat. | Molemmat, parhaiten 4 hengen porukalla. | Pelataan Lissabonin kahvilassa; voitto paljastaa päiväkirjan seuraavan sivun. | SUORA. | [Sueca (card game) – Wikipedia](https://en.wikipedia.org/wiki/Sueca_(card_game)) | idea |
| PRT-2 | Jogo da Malha | Portugali | 2 joukkuetta heittää rautakiekkoja kohti maahan pystytettyä tappia; tapin kaato 6 p, lähin kiekko 3 p, 30 pisteeseen ensin voittaa. | Fysiikkaa/geometriaa (heittorata) + maaseudun ammattihistoriaa (paimenten peli 1400-luvulta). | Kyllä — perinteisesti aikuisten sunnuntai-/iltapeli kylissä. | Molemmat. | Löytyy maaseutukylän torilta; joukkuevoitto avaa yhteisen vihjeen. | SUORA. | [pt.wikipedia.org: Jogo da malha](https://pt.wikipedia.org/wiki/Jogo_da_malha) | idea |
| ITA-1 | Briscola | Italia | 2–6 pelaajaa, italialainen 40 kortin pakka; nostettu valttikortti määrää maan, yli 60/120 korttipistettä kerännyt voittaa. | Päässälaskua (korttien pisteytys, esim. ässä 11) ja todennäköisyyspäättelyä. | Kyllä — Italian suosituin korttipeli baareissa/perheissä. | Molemmat. | Pelataan Venetsian/Napolin kahvilassa; voitto tuo aarrevihjeen. | SUORA. | [Briscola – Wikipedia](https://en.wikipedia.org/wiki/Briscola) | idea |
| ITA-2 | Morra | Italia | 2+ pelaajaa näyttää samaan aikaan 0–5 sormea ja huutaa arvion sormien summasta; oikea arvaus = piste. | Nopeaa päässälaskua/todennäköisyyttä + antiikin Rooman kulttuurihistoriaa ("micatio"). | Kyllä — äänekäs aikuisten toripeli, historiallisesti jopa kielletty riehakkuuden vuoksi. | Vaatii oikean kaverin (huuto kasvokkain, botti toimii huonosti). | Spontaani minipeli torilla; nopea voitto = pieni aarremerkki. | SUORA. | [Morra (game) – Wikipedia](https://en.wikipedia.org/wiki/Morra_(game)) | idea |
| ITA-3 | Bocce | Italia | Joukkueet vierittävät painavia palloja lähelle pientä tavoitepalloa (pallino); lähimmät pallot pisteyttävät, ensimmäinen 13 pisteeseen voittaa. | Geometriaa/etäisyysarviointia + aluehistoriaa (Piemonte, Liguria). | Kyllä — aikuisten puisto-/kyläpeli, myös liigatoimintaa. | Molemmat. | Avautuu Piemonten/Ligurian kylässä; joukkuevoitosta aarrepalanen. | SUORA. | [Britannica: Bocce](https://www.britannica.com/sports/bocce) | idea |
| MLT-1 | Boċċi | Malta | Kuten italialainen bocce: joukkueet heittävät metallipalloja lähelle pientä tavoitepalloa (ġakk); lähin pallo pisteyttää. | Geometriaa/etäisyysarviointia + Maltan historiaa (Johanniittiritarikunnan ajan peli). | Kyllä — kansallislaji, jota pelaavat pääasiassa aikuiset każin-kerhoissa. | Molemmat. | Avautuu Vallettan/kylän boċċi-kentällä; joukkuevoitosta pelimerkki. | SUORA. | [ohmymalta.com: Boċċi](https://ohmymalta.com.mt/2022/10/05/the-traditional-game-of-bocci-in-malta/) | idea |
| MLT-2 | Tombla | Malta | Vetäjä nostaa numeroita satunnaisesti, pelaajat merkitsevät osumat lapulta; ensimmäinen joka saa täyden rivin voittaa. | Numeroiden tunnistus + maltan kielen numerosanoja/lempinimiä. | Kyllä — kylän festa-tapahtumissa ja perhejuhlissa aikuisten kesken. | Molemmat (botti sopii hyvin vetäjäksi). | Kylän festa matkan varrella; voitosta pieni aarrevihje. | OMA VERSIO — mekaniikka sama kuin kaupallisella Bingo-tuotenimellä; käytä nimeä "Tombla" ja omaa ulkoasua. | [MaltaToday: origin of tombola](https://www.maltatoday.com.mt/announcements/announcements/130297/the_origin_of_tombola_tracing_bingos_name_in_maltese_tradition) | idea |
| MLT-3 | Bixkla | Malta | Maltalainen Briscola-versio, 40 kortin pakka, poikkeava korttijärjestys; nostettu kortti määrää valtin, eniten korttipisteitä voittaa. | Korttien arvojärjestyksen/pisteytyksen päässälaskua + kielihistoriaa (koppi, dinari, spadi periytyvät italiasta). | Kyllä — perinteinen każin-aikuispeli, harvinaistunut mutta elossa. | Molemmat. | Löytyy Maltan każinista; peli avaa ritarikunnan ajan aarrevihjeen. | SUORA — oma maltalainen muunnos, oma nimi ja korttijärjestys. | [pagat.com: Malta](https://www.pagat.com/national/malta.html) | tarkista |

**Huomiot:** Malta oli vaikein — Bixklan tarkat pisteytyssäännöt on
osin rekonstruoitu Briscola-analogiasta (merkitty **tarkista**).
Tomblan oikeustilanne (mekaniikka identtinen Bingo-brändin kanssa)
kannattaa vielä varmistaa ennen toteutusta; nimi "Tombla" ja oma
ulkoasu riittänevät.

---

## 4. Keski-Eurooppa

*(Saksa, Itävalta, Sveitsi, Puola, Tšekki — 15 peliä)*

| id | peli | maa | sääntö | oppimiskytkös | sopivuus 13+ | botti/kaveri | pelikytkös | oikeudet | lähde | tila |
|---|---|---|---|---|---|---|---|---|---|---|
| DEU-1 | Skat | Saksa | 3 pelaajaa, 32 kortin pakka; huutokauppa määrää valtin ja pelin, tikkien kortit tuovat pisteitä, korkein pistesumma voittaa. | Päässälasku ja todennäköisyysarviointi (korttien pistearvot huutokaupan pohjana). | Kyllä — Saksan kansallispeli, aikuisten strategiapeli. | Molemmat. | Avautuu saksalaisessa kaupungissa/kahvilassa, voitosta pelimerkki. | SUORA — n. 1810 Altenburgista. | [Skat (card game) – Wikipedia](https://en.wikipedia.org/wiki/Skat_(card_game)) | idea |
| DEU-2 | Mylly (Mühle / Nine Men's Morris) | Saksa | 2 pelaajaa asettaa vuorotellen 9 kiveä risteyksiin, sitten siirtää niitä; kolmen kiven suora rivi poistaa vastustajan kiven. | Geometrinen hahmotus ja siirtostrategia. | Kyllä — abstrakti strategiapeli sopii aikuisille. | Molemmat. | Aarnin luettelon vihje muotoiltuna myllykuvioarvoitukseksi. | SUORA — antiikin/roomalaisajan peli. | [Nine men's morris – Wikipedia](https://en.wikipedia.org/wiki/Nine_men%27s_morris) | idea |
| DEU-3 | Keilailu (Kegeln) | Saksa | Pallo vieritetään/heitetään rataa pitkin yhdeksän timanttimuodostelmassa olevan keilan kaatamiseksi. | Pistelaskenta ja keskiarvon vertailu heittokierrosten välillä. | Kyllä — aikuisten pubi-/Oktoberfest-perinne. | Molemmat. | Kylän keilarata avautuu, voitosta aarrevihje. | SUORA — keskiaikainen luostariperinne, erillinen nykyisistä bowling-brändeistä. | [Nine-pin bowling – Wikipedia](https://en.wikipedia.org/wiki/Nine-pin_bowling) | idea |
| AUT-1 | Schnapsen | Itävalta | 2 pelaajaa, 20 kortin pakka; kerätään pisteitä tikeistä ja kuningas-rouva-pareista ("avioliitot"); ensin 66 pisteeseen voittaa. | Päässälasku (66 raja) ja todennäköisyyspäättely jäljellä olevista korteista. | Kyllä — Itävallan kansallispeli, aikuisten kahvilapeli. | Molemmat. | Avautuu Wienin kahvilassa, voitosta aarremerkki. | SUORA — 1800-luvun kansanperinne. | [Schnapsen – Wikipedia](https://en.wikipedia.org/wiki/Schnapsen) | idea |
| AUT-2 | Jääkelkkailu (Eisstockschießen) | Itävalta | Kaksi joukkuetta liu'uttaa painavia kelkkoja jäällä kohti maalimerkkiä; lähimmät kelkat tuovat pisteitä kuudella erällä. | Etäisyyden/geometrian arviointi ja pisteiden laskenta joukkueittain (kuten curlingissa). | Kyllä — aikuisten alppitalviurheilu. | Molemmat. | Alppikylän jäärata avautuu talvitapahtumassa, voitosta vuoristoaarre. | SUORA — 1800-luvun alppilainen kansanurheilu. | [Ice stock sport – Wikipedia](https://en.wikipedia.org/wiki/Ice_stock_sport) | idea |
| AUT-3 | Sormipaini (Fingerhakeln) | Itävalta | Kaksi kilpailijaa koukkaa keskisormet nahkalenkin läpi pöydän yli ja yrittää vetää vastustajan puolelleen. | Voiman/vipuvarren fysiikka — miksi ote ja asento ratkaisevat vedon. | Kyllä — aikuisten voimainkoetus, EI lastenleikki. | Parhaiten kaveria vastaan (fyysinen kontakti); botti voimamittari-simulaationa. | Alppikylän kisatapahtuma, voitosta vahvuusmitali. | OMA VERSIO — fyysinen liike korvattava symbolisella voimamittarilla digiversiossa. | [Washington Post: German finger wrestling](https://www.washingtonpost.com/world/2024/05/13/german-finger-wrestling-competition-fingerhakeln/) | idea |
| CHE-1 | Jass | Sveitsi | 4 pelaajaa (2 joukkuetta), 36 kortin sveitsiläinen pakka; valttikortit nostavat arvoa, eniten tikkipisteitä voittaa erän. | Pistelaskenta per tikki ja päätöksenteko todennäköisyyksien pohjalta. | Kyllä — Sveitsin kansallispeli, aikuisten perhe-/kahvilapeli. | Molemmat. | Avautuu vuoristomajassa, voitosta juustokauppiaan vihje. | SUORA — erityiset korttipakat kaupallisia, peli-idea vapaa. | [Jass – Wikipedia](https://en.wikipedia.org/wiki/Jass) | idea |
| CHE-2 | Hornussen | Sveitsi | Lyöjä lyö kumisen "Nossin" pitkällä joustavalla mailalla pellolle; puolustava joukkue yrittää pysäyttää sen ilmassa heittämällä mailoja. | Ratalaskenta/mittayksiköiden arviointi ja tiimityö. | Kyllä — aikuisten maaseutu-urheilu. | Parhaiten kaveriporukalla; botti simuloi vastajoukkuetta. | Maalaiskylän kesäjuhla, voitosta maatilan vihje. | SUORA — 1600-luvun kansanurheilu. | [Swiss national sports – Wikipedia](https://en.wikipedia.org/wiki/Swiss_national_sports) | idea |
| CHE-3 | Schwingen | Sveitsi | Kaksi painijaa juuttihousuissa tarttuu toistensa lahkeisiin ja yrittää painaa vastustajan molemmat lapaluut hiekkaan. | Painiotteiden nimeäminen ja tasapainon/vivun fysiikka. | Kyllä — aikuisten paimenperinnelaji (ESAF-festivaali). | Kaveria vastaan realistisempi; botti mahdollinen ottelusimulaationa. | Vuoristofestivaali, voitosta paimenaarre. | SUORA — kansanperinne. | [Schwingen – Wikipedia](https://en.wikipedia.org/wiki/Schwingen) | idea |
| POL-1 | Palant | Puola | 2 joukkuetta (7–15 pelaajaa); lyöjä heittää ja lyö oman pallonsa mailalla, juoksee tukikohtien kautta. | Joukkuepisteytys ja käsi-silmäkoordinaation/heittofysiikan ymmärrys. | Kyllä — aikuisten/nuorten joukkuepeli ("Puolan esi-baseball"). | Parhaiten kaveriporukalla; botti simuloi vastajoukkuetta. | Avautuu Ylä-Sleesian kylässä, voitosta kylän vihje. | SUORA — keskiaikainen kansanperinne. | [Palant – Wikipedia](https://en.wikipedia.org/wiki/Palant) | idea |
| POL-2 | Tysiąc | Puola | 3 pelaajaa, 24 kortin pakka; huutokauppa (min. 100 pistettä), valttia voi vaihtaa julistamalla kuningas-rouva-pareja; ensin 1000 pisteeseen voittaa. | Laskutaito suurilla luvuilla ja maiden arvojärjestys — kertolasku/järjestys. | Kyllä — Puolan suosituin 3 pelaajan korttipeli. | Molemmat. | Avautuu junassa/kahvilassa matkan varrella. | SUORA — kansanperinne, jaettua itäeurooppalaista perua. | [pagat.com: 1000](https://www.pagat.com/marriage/1000.html) | idea |
| POL-3 | Baśka | Puola | 4 pelaajaa, 16 kortin pakka; tikkapeli pareittain; neljän rouvan käsi voittaa suoraan, muuten yli puolet 104 pisteestä voittaa. | Murtolukujen/puolittamisen hahmotus (yli puolet pisteistä) ja Kašubian alueen tunnistaminen. | Kyllä — aikuisten kalastaja-/pubipeli Kašubiassa. | Molemmat. | Avautuu Gdanskin/Kašubian rannikolla. | SUORA — johdettu saksalaisesta Schafkopfista mutta oma kansanmuoto. | [pagat.com: Kop and Baśka](https://www.pagat.com/schafkopf/kop.html) | idea |
| CZE-1 | Mariáš | Tšekki | 3 pelaajaa (huutaja kahta muuta vastaan), 32 kortin pakka; kuningas-ylä-jätkä-pari samassa maassa tuo lisäpisteitä. | Pisteiden laskenta, maiden arvojärjestys ja bluffaus/päättely. | Kyllä — Tšekin suosituin korttipeli. | Molemmat. | Avautuu Prahan pubissa. | SUORA — 1700–1800-luvulta. | [Mariáš – Wikipedia](https://en.wikipedia.org/wiki/Mari%C3%A1%C5%A1) | idea |
| CZE-2 | Kuželky | Tšekki | Pallo vieritetään rataa pitkin yhdeksän timanttimuodostelmassa olevan keilan kaatamiseksi. | Pistelaskenta ja tilastollinen keskiarvovertailu heittokierrosten välillä. | Kyllä — aikuisten seurapeli/kilpaurheilu. | Molemmat. | Kylän keilarata avautuu. | SUORA — keskiaikainen kansanperinne, erillinen 10-keilan brändeistä. | [cs.wikipedia.org: Kuželky](https://cs.wikipedia.org/wiki/Ku%C5%BEelky) | idea |
| CZE-3 | Vrhcáby | Tšekki | 2 pelaajaa, 15 nappulaa kumpikin; nappuloita siirretään laudalla noppaheittojen mukaan kohti maalia (backgammon-tyyppinen). | Todennäköisyyslaskenta (noppayhdistelmät) ja strategisten riskien punninta. | Kyllä — dokumentoitu Vyšehradilla jo 900–1000-luvulla. | Molemmat. | Linnan raunio -tapahtuma, voitosta muinaismerkki. | SUORA — mekaniikka vapaa, käytä paikallista nimeä. | [cs.wikipedia.org: Vrhcáby](https://cs.wikipedia.org/wiki/Vrhc%C3%A1by) | idea |

**Huomiot:** Puola ja Tšekki olivat hieman haastavampia löytää täysin
riippumattomia kolmansia pelejä ilman päällekkäisyyttä — Baśka
(POL-3) on Schafkopfin kansanmuoto Kašubiassa, ja Vrhcáby (CZE-3) on
backgammon-perheen tšekkiläinen muoto. Kaikkien 15 pelin oikeustilanne
on SUORA paitsi **Fingerhakeln (AUT-3)**, jonka fyysinen liike
korvataan digiversiossa symbolisella mekaniikalla.

---

## 5. Baltia ja Itä-Eurooppa

*(Viro, Latvia, Liettua, Valko-Venäjä, Ukraina — 14 peliä)*

| id | peli | maa | sääntö | oppimiskytkös | sopivuus 13+ | botti/kaveri | pelikytkös | oikeudet | lähde | tila |
|---|---|---|---|---|---|---|---|---|---|---|
| EST-1 | Brus | Viro | 4 pelaajaa (2 paria), 36 kortin tikkipeli; enemmän tikkejä ottanut pari saa pisteen, 5 tikkiä peräkkäin = tuplapisteet. | Tikkipelin todennäköisyyspäättely + 1800-luvun virolais-tanskalainen seurustelukulttuuri. | Kyllä — historiallisesti aikuisten iltapeli. | Molemmat. | Avautuu majatalokohtauksessa isoisän matkan varrella; voitosta paikallinen vihje. | SUORA. | [Brus (card game) – Wikipedia](https://en.wikipedia.org/wiki/Brus_(card_game)) | idea |
| EST-2 | Sasku (Saskop) | Viro | 4 pelaajaa, 36 kortin pakka, huutokaupalla valittu valtti; pari joka saa yli 60/120 pistettä voittaa erän, 16 erävoittoa voittaa pelin. | Yhteenlasku (120 pisteen jako) + riskinarviointi huutokaupassa. | Kyllä — aikuisten/nuorten strategiapeli. | Molemmat. | Toinen virolainen korttipeli eri kylässä/kaupungissa kuin Brus. | SUORA. | [pagat.com: Saskop](https://www.pagat.com/schafkopf/saskop.html) | idea |
| EST-3 | Külakiik (Jaanipäivän kyläkiikku) | Viro | Pari heiluttaa yhdessä korkeaa puukiikkua Jaanipäivän yönä mahdollisimman korkealle/pitkään pysähtymättä — perinteinen tutustumisleikki. | Heilurin fysiikka (amplitudi, jakso) konkreettisesti koettuna. | Kyllä — nuorten pariperinne (ei sekoiteta moderniin "Kiiking"-extreme-lajiin). | Kaveri (kiikku vaatii parin); botti NPC-pariksi rytmiminipelinä. | Jaanipäivä-kokkokohtaus, rytminappi-minipeli kiikun heiluttamiseen. | SUORA — perinne (erillinen nykyisestä "Kiiking"-lajista, jolla on oma liitto/säännöstö). | [Kiiking – Wikipedia](https://en.wikipedia.org/wiki/Kiiking) | idea |
| LVA-1 | Zole (Zolīte) | Latvia | 3–5 pelaajaa, 26 kortin pakka; yksi pelaaja pelaa yksin ("suuri peli") valitulla valtilla muita vastaan, tikkipisteiden mukaan ratkeaa voitto. | Strateginen päättely, riskinarviointi (pass vai peli), pisteiden laskenta. | Kyllä — Latvian virallinen kansallispeli. | Molemmat. | Avautuu latvialaisessa kapakassa; voitosta aarrevihje. | SUORA — mekaniikka vapaa; Latvian liiton (LZSF) 1996 sääntötekstiä ei kopioida sanasta sanaan. | [Zole – Wikipedia](https://en.wikipedia.org/wiki/Zole) | idea |
| LVA-2 | Novuss | Latvia | 2 (tai 4 parina) pelaajaa, n. 1×1 m puulauta nurkkapusseilla; lyödään pienellä mailalla omat 8 nappulaa pusseihin ennen vastustajaa. | Geometria/kulma- ja voima-arviointi (biljardifysiikka), hienomotoriikka. | Kyllä — Latvian kansallislaji (MM-kisat 1993 alk.). | Molemmat. | Taitopeli-minipeli torilla/kapakassa. | SUORA — synty jaettu Viron ja Latvian kesken (1925–27). | [Novuss – Wikipedia](https://en.wikipedia.org/wiki/Novuss) | idea |
| LVA-3 | Kazas un vilks (Vuohet ja susi) | Latvia | "Jāņi-äiti" ja "vuohet" toisella puolella niittyä, "susi" piilossa; dialogilauluin vuohet lopulta juoksevat äidin luo suden yrittäessä napata. | Latvian kielen dialogi-/lorurakenteet, ryhmädynamiikka roolileikin kautta. | Kyllä — lähde vahvistaa suoraan kaikenikäisille sopivaksi. | Kaveri/ryhmä tarvitaan (ei toimi yksin bottia vastaan sellaisenaan). | Jāņi-kokkojuhla-kohtaus, ryhmäminipeli josta NPC antaa vihjeen. | SUORA. | [LSM: traditional Latvian games](https://eng.lsm.lv/article/culture/culture/play-traditional-latvian-games-for-ligo-and-jani.a323249/) | idea |
| LTU-1 | Ritinis (Ripka) | Liettua | 2 joukkuetta (7 pelaajaa); kumilevy heitetään käsin vastustajan takarajan yli (1 p) tai maaliin (3 p), torjunta vain mailalla. | Joukkuetaktiikka, heittotarkkuus/lentoratafysiikka, historia (Vytautas-ajan sotilaskoulutus). | Kyllä — aikuisten joukkueurheilua. | Kaveri/joukkue (yksinkertaistettu 1v1-botti-versio mahdollinen). | Kylän pelikentän minipeli, joukkuevoitosta aarrevihje. | SUORA. | [Ritinis – Wikipedia](https://en.wikipedia.org/wiki/Ritinis) | idea |
| LTU-2 | Durnius | Liettua | 2–5 pelaajaa, 36 kortin pakka; hyökkääjä/puolustaja-vuorottelu, viimeinen kortteineen jäävä on "hölmö". | Korttien arvojärjestys/valttilogiikka, riskinhallinta (milloin purkaa käsi). | Kyllä — aikuisten seurapeli huumorirangaistuksin. | Molemmat. | Majatalokohtaus, häviäjän "hölmö"-leima + lohdutusvihje. | SUORA — sukua venäläiselle Durak-perheelle, mutta liettualainen muunnos dokumentoitu omana perinteenään. | [pagat.com: Lithuania](https://www.pagat.com/national/lithuania.html) | idea |
| LTU-3 | Margučių ridenimas (pääsiäismunien vierittäminen) | Liettua | Munaa vieritetään kaltevaa kourua pitkin yrittäen osua toisen munaan — osuma = saat vastustajan munan; eniten munia lopussa voittaa. | Kaltevan pinnan/liike-energian intuitiivinen fysiikka + pääsiäisperinteen kulttuurihistoria. | Kyllä — perhe-/aikuisperinne pääsiäispöydässä. | Molemmat. | Pääsiäiskohtaus Liettuassa, voitosta koriste-/aarremerkki. | SUORA. | Blogi: "Easter Egg Rolling (Lithuanian Game)" | tarkista |
| BLR-1 | Gorodki (Гарадкі) | Valko-Venäjä | Heitetään puukapula n. 13 m päästä kaataakseen 5 puunuppulan muodostelma mahdollisimman harvalla heitolla. | Geometria/kulmalaskenta (muodostelmat), heittotarkkuus, optimointiajattelu. | Kyllä — aikuisten/nuorten kilpaurheilua, kansainvälinen liitto. | Molemmat. | Kylätorin tarkkuusheittominipeli, läpäisystä aarrevihje. | SUORA — alun perin venäläinen kansanperinne, laajasti omaksuttu myös Valko-Venäjällä. | [Gorodki – Wikipedia](https://en.wikipedia.org/wiki/Gorodki) | idea |
| BLR-2 | Цярэшкава вяселле (Tereshkan häät) | Valko-Venäjä | Nuoret kahdessa rivissä; kuulutusmies johdattaa pojan tytön luo musiikin tahdissa — jos tyttö suostuu, pari tanssii, jos ei, pakenee. | Kylän talvijuhla-/Kolyada-perinne, tanssiaskeleet, seurustelukulttuuri. | Kyllä — nuorten seurusteluleikki, ei lasten leikki. | Kaveri/ryhmä (NPC-versio mahdollinen). | Talvinen Kolyada-kohtaus, tanssiminipeli avaa vihjeen. | SUORA. | [Belarus Travel: Belarusian Folk Games](https://en.belarus.travel/news/belarusian-folk-games) | idea |
| UKR-1 | Гилка (Hylka) | Ukraina | Lyöjä lyö mailalla pallon kentälle, kentällä oleva yrittää ottaa sen kiinni ilmasta ennen maahan putoamista vaihtaakseen rooleja. | Käsi-silmäkoordinaatio, kentän sektoreiden hahmottaminen, joukkuetaktiikka. | Kyllä — dokumentoitu partiolais-/yliopistoliikunnan pelinä 1904 alk., ei pikkulasten leikki. | Molemmat (kaveri parhaiten). | Kylän/pellon minipeli, onnistuneesta lyönnistä/otosta aarrevihje. | SUORA — nykyisen urheiluliiton virallinen sääntökirja voisi vaatia oman version. | [uk.wikipedia.org: Гилка](https://uk.wikipedia.org/wiki/%D0%93%D0%B8%D0%BB%D0%BA%D0%B0) | idea |
| UKR-2 | Тисяча (1000) | Ukraina | 2–3 pelaajaa, 24 kortin pakka; tikkipelissä kerätään korttipisteitä ja kuningas-rouva-pareja kunnes joku saavuttaa 1000/1001 pistettä. | Yhteen- ja allekkainlasku (pisteiden kertyminen kohti 1000:ta) + valttistrategia. | Kyllä — aikuisten/nuorten strategiapeli. | Molemmat. | Kaupunkikahvila-/torikohtaus, pistelaskuminipeli. | SUORA — yhteistä itäeurooppalaista perua, ei yksinomaan ukrainalainen keksintö. | [1000 (card game) – Wikipedia](https://en.wikipedia.org/wiki/1000_(card_game)) | idea |
| UKR-3 | Вербова дощечка (Verbovaya Doshchechka, "Pajulauta") | Ukraina | Kevätriitipeli: nuoret muodostavat "sillan"/jonon laulaen kevätlaulua ja vaihtavat paikkoja laulun tahdissa. | Ukrainalainen kevät-/pääsiäisperinne, kansanlaulun sanat, aluekulttuuri. | Perinteisesti lasten/nuorten pääsiäisleikki — esitettävä kulttuurikohtauksena 13+:lle, ei kilpapelinä, tai jätettävä pois. | Kaveri/ryhmä (laulu-/liikeleikki). | Kylän pääsiäiskohtaus, rytminappipeli laulun tahtiin. | SUORA. | [Verbovaya Doshchechka – Wikipedia](https://en.wikipedia.org/wiki/Verbovaya_Doshchechka) | tarkista |

**Huomiot:** Valko-Venäjälle löytyi luotettavasti vain 2 peliä eikä 3 —
englanninkieliset lähteet ovat ohuita, kolmas ehdokas vaatisi
valkovenäjänkielisiä etnografisia lähteitä. **Gorodki** ja
**Tysiacha/1000** ovat jaettua itäeurooppalaista/venäläistä
yhteisperintöä, ei yksinomaan Valko-Venäjän/Ukrainan omia keksintöjä —
tekstissä ei pidä väittää muuta. **UKR-3** on lasten pääsiäisleikki ja
**LTU-3** nojaa heikkoon blogilähteeseen — molemmat merkitty
**tarkista**. **Zole (LVA-1):** Latvian liiton 1996 sääntöteksti on
todennäköisesti suojattua — vain pelimekaniikka, ei sääntötekstiä.

---

## 6. Länsi-Balkan

*(Slovenia, Kroatia, Bosnia ja Hertsegovina, Serbia, Montenegro — 15 peliä)*

| id | peli | maa | sääntö | oppimiskytkös | sopivuus 13+ | botti/kaveri | pelikytkös | oikeudet | lähde | tila |
|---|---|---|---|---|---|---|---|---|---|---|
| SVN-1 | Tarok | Slovenia | 54 kortin pakalla (22 tarottia + 32 maakorttia) pelataan 3–4 pelaajalla; 6 korttia jää "talon"-pinoon, tikissä seurattava maata. | Todennäköisyyspäättely (mitä kortteja on jäljellä) ja Itävalta–Unkarin kulttuurihistoria Sloveniassa. | Kyllä — aikuisten kahvilapeli. | Molemmat (botti täydentää puuttuvat pelaajat). | Rautatieasemakahvila, jossa matkustajat pelaavat tarokkia junaa odottaessa. | SUORA. | [slovenski-tarok.si: pravila](https://slovenski-tarok.si/pravila) | idea |
| SVN-2 | Keilailu (kegljanje) | Slovenia | Pallo vieritetään/heitetään puukeiloja kohti, tavoite kaataa mahdollisimman monta. | Kulman ja voiman arviointi (yksinkertainen fysiikka). | Kyllä — kylien kegljišče on aikuisten iltapeli. | Molemmat. | Kylän keilarata isoisän reitillä, paikallista vanhinta vastaan pelaaminen avaa vihjeen. | SUORA. | [medvedkiigrace.si: keglanje](https://medvedkiigrace.si/) | idea |
| SVN-3 | Hevosenkengän heitto (metanje podkev) | Slovenia | Kolme hevosenkenkää heitetään viivalta 10 m päässä maahan lyötyä tolppaa kohti, lähimmät heitot voittavat. | Etäisyyden/mittayksiköiden arviointi + 1800-luvun hevoskuljetushistoria. | Kyllä. | Molemmat. | Hylätty hevosenkenkä isoisän 1873 hevosvaunureitiltä, peli paikallisen kanssa. | SUORA. | [sdloka.si: metanje podkev](https://www.sdloka.si/) | idea |
| HRV-1 | Picigin | Kroatia | 5 hengen joukkue seisoo matalassa merivedessä ja lyö pientä kuorittua tennispalloa avokämmenellä toisilleen niin ettei se koskaan kastu. | Fysiikka (heittoradat, veden vastus) + paikallishistoria (syntyi Splitin opiskelijoiden kokeilusta 1908–1923). | Kyllä — nuorten aikuisten rantapeli, virallinen kilpailumuoto olemassa. | Molemmat. | Bačvicen ranta Splitissä, paikallisten kanssa pelaaminen avaa satamavihjeen. | OMA VERSIO — Kroatian suojeltu aineeton kulttuuriperintö, kilpailusäännöt omistaa ED Picigin Bačvice; vapaamuotoinen rantaversio on vapaata kansanperinnettä. | [croatia.hr: Picigin](https://croatia.hr/) | idea |
| HRV-2 | Briškula | Kroatia | 40 kortin italialaispakalla 2 (tai 4 pareittain) pelaajaa pudottaa vuorotellen kortin; vahvin valttimaan tai arvokkain kortti voittaa tikin. | Pistelaskenta/laskutaito + Venetsian tasavallan historia Dalmatiassa. | Kyllä — perinteinen aikuisten kahvilapeli. | Molemmat. | Satamakahvila, jossa isoisän tuttava pelasi laivaa odottaessa. | SUORA. | [hr.wikipedia.org: Briškula](https://hr.wikipedia.org/wiki/Bri%C5%A1kula) | idea |
| HRV-3 | Balote (boćanje) | Kroatia | Kaksi joukkuetta heittää painavia palloja mahdollisimman lähelle pientä maalipalloa 4×15 m kentällä, peli 13 pisteeseen. | Geometria ja etäisyyden arviointi. | Kyllä — koko rannikon sukupolvipeli. | Molemmat. | Kylätori, jossa vanhukset pelaavat joka ilta, haastaminen avaa vihjeen. | SUORA. | [hr.wikipedia.org: Boćanje](https://hr.wikipedia.org/wiki/Bo%C4%87anje) | idea |
| BIH-1 | Klis | Bosnia ja Hertsegovina | Maahan kaivetusta kuopasta lyödään teroitettu puukapula ilmaan pidemmällä kepillä; vastustaja yrittää ottaa sen kiinni tai heittää lähelle kuoppaa, etäisyys mitataan kepin pituuksin. | Mittaaminen/pituusyksiköt + Balkanin paimentolaishistoria. | Kyllä — aikuisten kyläpeli. | Molemmat. | Vuoristopaimen opettaa pelin, oikea mittaustaito avaa kartanpalan. | SUORA. | [domaljevac-samac.com: stare igre](https://www.domaljevac-samac.com/) | idea |
| BIH-2 | Piljanje | Bosnia ja Hertsegovina | Pieni kivi heitetään ilmaan, ja samalla poimitaan maasta kasvava määrä pieniä kiviä ennen kuin ilmaan heitetty kivi putoaa takaisin käteen. | Käsi-silmäkoordinaatio + laskeminen (kasvava lukusarja). | Kyllä — aidosti kaikenikäisten taitopeli. | Molemmat, erityisesti kaveria vastaan. | Markkinatorin lapset opettavat pelin matkalaiselle tiedon hinnalla. | SUORA. | [uosisb-knin.hr: narodne igre](https://uosisb-knin.hr/) | idea |
| BIH-3 | Sudet ja lampaat (vukovi i ovce) | Bosnia ja Hertsegovina | Asymmetrinen lautapeli: 2 "sutta" syövät hyppäämällä "lampaita" (20 kpl), lampaiden tavoite ajaa 9 karsinaan tai jumittaa sudet. | Epäsymmetrinen strateginen ajattelu (heikko enemmistö vs. vahva vähemmistö) + pelin leviämishistoria (Hnefatafl → Balkan). | Kyllä — aito aikuistenkin strategiapeli. | Molemmat. | Kylän portaisiin piirretty pelilauta, vanhus haastaa matkalaisen viisaudesta. | SUORA — kuuluu Fox&Geese/Hnefatafl-peliperheeseen. | [nkc-tisno.hr: vukovi i ovce](https://nkc-tisno.hr/) | idea |
| SRB-1 | Klis | Serbia | Sama periaate kuin Bosniassa: puukapula lyödään kuopasta ilmaan pidemmällä kepillä, etäisyys mitataan kepin pituuksin. | Mittaaminen/pituusyksiköt + paimentolaishistoria. | Kyllä. | Molemmat. | Serbian maaseutukylä isoisän reitillä, lapset pelaavat pellolla. | SUORA. | [srbijuvolimo.rs: Klis](https://srbijuvolimo.rs/) | idea |
| SRB-2 | Belot | Serbia | 32 kortin pakalla 4 pelaajaa pareittain; valttimaa nostetaan tikkien myötä, tietyt yhdistelmät tuovat lisäpisteitä. | Parityöskentely/päättely + pistelaskenta. | Kyllä — Serbian suosituin aikuisten kahvilapeli. | Molemmat. | Belgradin kahvila, jossa isoisän matkatuttava pelasi belotia. | SUORA. | [pagat.com: Belote](https://www.pagat.com/jass/belote.html) | idea |
| SRB-3 | Mlin (Nine Men's Morris) | Serbia | 2 pelaajaa asettaa vuorotellen 9 nappulaa 24-pisteiselle laudalle; kolmen nappulan suora rivi antaa oikeuden poistaa vastustajan nappula. | Geometrinen hahmottaminen + usean siirron ennakointi. | Kyllä. | Molemmat. | Kivilattiaan piirretty vanha lauta, isoisä mainitsee pelanneensa sitä maissinjyvillä. | SUORA — keskiaikainen PD-lautapeli. | [net.hr: Mlin pravila](https://net.hr/) | tarkista |
| MNE-1 | Balote (boćanje) | Montenegro | Sama periaate kuin Kroatiassa: painavat pallot mahdollisimman lähelle maalipalloa, 13 pisteeseen. | Geometria ja etäisyyden arviointi. | Kyllä. | Molemmat. | Kotorin vanhankaupungin tori, kapteeni pelaa odottaessaan tuulta. | SUORA. | [hr.wikipedia.org: Boćanje](https://hr.wikipedia.org/wiki/Bo%C4%87anje) | idea |
| MNE-2 | Trešeta | Montenegro | 40 kortin italialaispakalla yleensä pareittain; ei valttimaata eikä korttien nostoa, ässä tuo eniten pisteitä vaikkei ole maansa vahvin. | Muistipeli/looginen päättely + Venetsian vaikutus Adrianmeren rannikolla. | Kyllä. | Molemmat. | Kotorin/Boka Kotorskan kahvila. | SUORA. | [Tressette – Wikipedia](https://en.wikipedia.org/wiki/Tressette) | idea |
| MNE-3 | Oro (crnogorsko oro) | Montenegro | Piirileikki/kansantanssi: nuoret miehet ja naiset kahdessa puoliympyrässä laulavat/tanssivat vuorotellen, lopuksi miehet nostavat toisiaan näyttävällä liikkeellä. | Musiikillinen/rytminen kulttuuri + aluemaantieto (eri seutujen oro-tyylit). | Kyllä — historiallisesti nuorten aikuisten seurustelutanssi. | Kaveri/ryhmä (botti voi opastaa askeleet muttei korvaa ryhmää). | Vuoristokylän juhla, oro-piiriin osallistuminen avaa paikallisten luottamuksen. | SUORA. | [Montenegrin Oro – Wikipedia](https://en.wikipedia.org/wiki/Montenegrin_Oro) | idea |

**Huomiot:** Klis (BIH-1/SRB-1), Balote/Boćanje (HRV-3/MNE-1) ja osin
Trešeta/Briškula (HRV-2/MNE-2) ovat aidosti jaettua Balkanin/Adrian
rannikon perinnettä usean maan kesken — ei virhe, mutta kannattaa
tiedostaa ettei näytä kopioidulta. **Mlin (SRB-3):** en löytänyt
nimenomaan Serbia-kohtaista lähdettä, vain pan-balkanilaista/
keskiaikaista alkuperää — merkitty **tarkista**. **Picigin (HRV-1)**
on Kroatiassa suojeltu aineeton kulttuuriperintö, ja virallisen
kilpailun säännöt omistaa yhdistys — siksi OMA VERSIO.

---

## 7. Itä-Balkan

*(Albania, Pohjois-Makedonia, Bulgaria, Romania, Kreikka — 15 peliä)*

| id | peli | maa | sääntö | oppimiskytkös | sopivuus 13+ | botti/kaveri | pelikytkös | oikeudet | lähde | tila |
|---|---|---|---|---|---|---|---|---|---|---|
| ALB-1 | Murlan | Albania | 3–5 pelaajaa, ranskalaispakka; kiipeilypeli — pelaaja pinoaa saman/korkeamman arvon kortteja, viimeinen käteen jäänyt kortti häviää. | Laskutaito, todennäköisyys, korttien seuranta. | Kyllä — aikuisten kahvilapeli. | Molemmat. | Isoisän päiväkirjan majatalossa pelataan iltaisin korttia. | SUORA. | [pagat.com: Albania](https://www.pagat.com/national/albania.html) | idea |
| ALB-2 | Top e shkopinj (keppi-pallopeli) | Albania | Kaksi joukkuetta nurmella työntää/lyö palloa kepeillä eteenpäin; säännöt sovitaan paikallisesti, ei kiinteää sääntökirjaa. | Historia/kulttuuri — dokumentoitu jo 1900-l. alussa ylänköjen elinkeinona. | Kyllä — fyysinen peli nuorille aikuisille. | Kaveri (joukkuepeli; botti-versio vaatisi yksinkertaistuksen). | Ylängöllä pelaaja osallistuu paikallispoikien peliin ja voittaa luottamuksen. | SUORA — säännöt epäviralliset, peliin täytyy kiteyttää oma minisääntö. | balkanacademia.com (2025), viittaa historiallisiin kuvauksiin | tarkista |
| ALB-3 | Cic Mic | Albania | Kivipeli: pelaajat asettavat vuorotellen 3 kiveä (à 6 yht.) ja yrittävät saada 3 omaa riviin estäen vastustajaa — sukua myllypeleille. | Strateginen ajattelu, geometria. | Kyllä. | Molemmat. | Torin kivilauta — voitto antaa vihjeen paikalliselta vanhukselta. | SUORA. | "Traditional Albanian games" -esitys (slideshare) | idea |
| MKD-1 | Öljypaini (Pelivansko borenje) | Pohjois-Makedonia | Kaksi öljyttyä painijaa nahkahousuissa (kispet) pyrkii kaatamaan/hallitsemaan vastustajan; osa kylä-/perhejuhlia. | Historia — osmani-persialainen painiperintö, elävä traditio erityisesti Pohjois-Makedoniassa. | Kyllä (aikuisten kilpailulaji, EI lastenleikki). | Molemmat (kevennetty minipeli-versio suositeltava kontaktilajina). | Kyläjuhlassa pelaaja seuraa/osallistuu otteluun matkan varrella. | OMA VERSIO — fyysinen kontakti kevennettävä digiversiossa (esim. voimamittausmekaniikka). | [traditionalsports.org: Pelivansko borenje](https://www.traditionalsports.org/) | idea |
| MKD-2 | Juran Akman | Pohjois-Makedonia | Ympyrä piirretään maahan, kolmihaarainen keppi lyödään ilmaan pitkällä kepillä ja lyödään uudelleen mahdollisimman kauas ennen kuin vastajoukkue nappaa sen. | Silmä-käsi-koordinaatio, paimenkulttuurin historia. | Kyllä. | Molemmat. | Pelaaja haastaa paikallisen pojan Akman-otteluun paimenkylässä. | SUORA. | dmwc.org.mk: "Children's Games and Toys in Macedonia 1918–1941" | idea |
| MKD-3 | Oro (esim. Teškoto) | Pohjois-Makedonia | Piiritanssi, tanssijat pitävät kiinni käsistä/olkapäistä ja seuraavat askelkuviota, joka nopeutuu kappaleen edetessä; johtaja ohjaa muodonmuutoksia. | Rytmi, yhteisöllisyys, kulttuurihistoria (Galičnikin miesten Teškoto). | Kyllä. | Kaveri (ryhmätanssi; botti voi opettaa askeleet). | Häissä pelaaja opettelee askeleet päästäkseen juhlaan mukaan. | SUORA. | [folkdancefootnotes.org](https://folkdancefootnotes.org/) | idea |
| BGR-1 | Belot | Bulgaria | 4 pelaajaa kahdessa parissa, 32 kortin pakka, tikkipeli "kaikki valtti"/"ei valttia" -tarjouksin, tavoite 151 pistettä. | Laskutaito, paritiimityö. | Kyllä — Bulgarian suosituin aikuisten korttipeli. | Molemmat. | Kahvilassa isoisän oppima peli — pelaaja pelaa paikallisia vastaan. | SUORA. | [pagat.com: Bulgaria](https://www.pagat.com/national/bulgaria.html) | idea |
| BGR-2 | Öljypaini (Pehlivanski borbi) | Bulgaria | Kaksi öljyttyä painijaa nahkahousuissa; tavoite kaataa/hallita vastustaja. Suurkilpailu mm. Asenovgradissa helmikuussa. | Historia — osmanikautinen perintö + slaavilainen "kuivapaini"-erikoispiirre. | Kyllä. | Molemmat (kevennetty versio). | Kevätjuhlassa Asenovgradin tyyliin pelaaja osallistuu/seuraa otteluun. | SUORA (fyysinen kontakti kevennettävä digiversiossa). | [Sport in Bulgaria – Wikipedia](https://en.wikipedia.org/wiki/Sport_in_Bulgaria) | idea |
| BGR-3 | Horo (esim. Gankino/Krivo horo) | Bulgaria | Piiri- tai käärmemuotoinen käsistä pidettävä tanssi; rivin päissä parhaat tanssijat johtavat liinoja heiluttaen. | Rytmilaskenta (epätasainen tahtilaji), aluehistoria (Šopin alue). | Kyllä. | Kaveri (ryhmätanssi). | Kyläjuhlassa pelaaja opettelee horon askeleet. | SUORA. | [folkdancefootnotes.org](https://folkdancefootnotes.org/) | idea |
| ROU-1 | Oina | Romania | 11 vastaan 11: lyöjä lyö palloa mailalla ja juoksee, kenttäjoukkue yrittää napata pallon tai osua juoksijaan ennen maalia. | Historia — dokumentoitu 1364, pakollinen kouluissa 1897 alk., pidetty baseballin esiasteena. | Kyllä — virallinen kansallislaji. | Molemmat (botti simuloi joukkueita). | Maaseudulla pelaaja pelaa ottelun paimenten kanssa. | SUORA. | [Oină – Wikipedia](https://en.wikipedia.org/wiki/Oin%C4%83) | idea |
| ROU-2 | Șeptică | Romania | 4 pelaajaa, 32 kortin pakka; kortti peitetään saman värin/arvon kortilla, viimeinen samanarvoinen voittaa pinon; 7 vaihtaa väriä, 2 pakottaa nostamaan. | Laskutaito, muisti. | Kyllä. | Molemmat. | Majatalon illanvietossa opittu peli. | SUORA. | [pagat.com: Romania](https://www.pagat.com/national/romania.html) | idea |
| ROU-3 | Hora | Romania | Suuri suljettu piiritanssi: kolme askelta eteen, yksi taakse, vastapäivään käsistä kiinni pitäen. | Kulttuurihistoria (Hora Unirii 1859 — Valakian ja Moldovan yhdistyminen), rytmi. | Kyllä. | Kaveri (ryhmätanssi). | Häissä matkan varrella pelaaja oppii askeleet päästäkseen mukaan. | SUORA. | [Hora (dance) – Wikipedia](https://en.wikipedia.org/wiki/Hora_(dance)) | idea |
| GRC-1 | Tavli | Kreikka | Kahden pelaajan noppapeli, 3 muunnelmaa peräkkäin (Portes=backgammon, Plakoto, Fevga); 5 tai 7 pisteeseen. | Todennäköisyyslaskenta, strateginen päättely. | Kyllä — joka kahvilan ("kafeneio") kansallispeli. | Molemmat. | Kahvilassa pelaaja haastaa paikallisen ukon vihjeen toivossa. | SUORA. | [Tavli – Wikipedia](https://en.wikipedia.org/wiki/Tavli) | idea |
| GRC-2 | Xeri | Kreikka | 2 pelaajaa, 52 kortin pakka; kortti kaadetaan pöytään, jos se täsmää ylimpään korttiin pelaaja kerää koko pinon ("xeri" = tyhjä pöytä = bonus). | Laskutaito, muisti. | Kyllä. | Molemmat. | Tavernassa/veneessä pelattava täytepeli. | SUORA. | [pagat.com: Xeri](https://www.pagat.com/beat/xeri.html) | idea |
| GRC-3 | Kalamatianos | Kreikka | 7/8-tahtinen (3+2+2) piiritanssi, 12 askelta 4 tahdissa — 10 vastapäivään, 2 myötäpäivään; johtaja pitää seuraavaa liinasta. | Rytmilaskenta (epätasainen tahtilaji), kulttuurihistoria (juuret antiikin piiritansseihin). | Kyllä. | Kaveri (ryhmätanssi; botti opettaa kuvion). | Häissä pelaaja opettelee askeleet. | SUORA. | [Kalamatianos – Wikipedia](https://en.wikipedia.org/wiki/Kalamatianos) | idea |

**Huomiot:** Öljypaini (Pehlivan/Pelivansko borenje/Pehlivanski borbi)
on jaettu osmanivallan perintö kolmessa naapurimaassa — sisällytetty
vain Makedonialle ja Bulgarialle duplikoinnin välttämiseksi.
Kontaktilajina peliin ehdotetaan kevennettyä, ei-väkivaltaista
minipeliä. **Top e shkopinj (ALB-2):** täsmällistä sääntökirjaa ei ole
(paikallisyhteisön sopimia sääntöjä) — merkitty **tarkista**. Romanian
Țurca/Capra (vuodenvaihteen naamiokulkue) ja Popice-keilailu tutkittiin
mutta hylättiin: edellinen on rituaali eikä pelattava peli, jälkimmäisen
tarkkoja sääntöjä ei löytynyt luotettavasti.

---

## 8. Unkari, Slovakia, Moldova, Turkki, Venäjä

*(15 peliä)*

| id | peli | maa | sääntö | oppimiskytkös | sopivuus 13+ | botti/kaveri | pelikytkös | oikeudet | lähde | tila |
|---|---|---|---|---|---|---|---|---|---|---|
| HUN-1 | Méta (Longa méta) | Unkari | Viisikulmion muotoisilla "pesillä" pelattava lyöntipeli: lyöjä lyö pallon ja juoksee pesien kautta takaisin ilman osumaa; kiinniotto ilmasta = ulos. | Historia: méta oli Unkarin suosituin pihapeli ennen jalkapallon nousua n. 1900. | Kyllä. | Molemmat. | Isoisän päiväkirjan kylämaininta métaottelusta 1873 → minipeli avaa vihjeen Aarnin luettelosta. | SUORA. | protoball.org: "Meta, or Longa Meta" | idea |
| HUN-2 | Ulti | Unkari | Kolmen pelaajan tikkauspeli 32 kortilla; voitetaan ässät/kymppiset tikkeinä, "ulti"-ilmoitus = viimeinen tikki matalimmalla valtilla (7). | Laskenta: pisteiden ja tikkien seuranta, todennäköisyyspäättely vastustajien korteista. | Kyllä. | Molemmat (botti kahtena vastustajana). | Junavaunussa isoisä pelaa kauppiaiden kanssa — pelaaja opettelee säännöt hahmolta. | SUORA — säännöt PD, kortti-ilme oma. | [pagat.com: Ulti](https://www.pagat.com/marriage/ulti.html) | idea |
| HUN-3 | Csülközés | Unkari | Kaksi pelaajaa lyövät puukepeillä kolmijalkaista "vuohi"-kapulaa yrittäen lyödä sen vastustajan alueen ulos; miekkailua muistuttava leikkitaistelu. | Kulttuurihistoria: paimen-/maalaiskulttuuri, kansanleikin muuntuminen koululiikunnaksi. | Kyllä sovellettuna. | Molemmat. | Paimenten kilpaleikki kylässä — pelaaja/botti "lyö vuohen" kolme kertaa. | OMA VERSIO — fyysinen keppitaistelu korvattava symbolisella osumalaskennalla turvallisuussyistä. | traditionalsports.org: "Csürközés" | idea |
| SVK-1 | Mariáš | Slovakia | Kolmen pelaajan tikkauspeli 32 kortin saksalaispakalla; yksinpelaaja vs. kaksi yhdessä, K+ylirenki-pari = "mariáš"-bonus. | Kieli/laskenta: korttien slovakiankieliset nimet ja pistelaskenta. | Kyllä. | Molemmat. | Isoisä pelaa Mariášia bratislavalaisessa majatalossa. | SUORA. | [pagat.com: Mariáš](https://www.pagat.com/marriage/marias.html) | idea |
| SVK-2 | Kolky | Slovakia | Pallo vieritetään yhdeksää keilaa kohti neljällä radalla, 120 heittoa yhteensä; kaadetuista keiloista pisteet. | Geometria: heittokulman/voiman arviointi, pisteiden yhteenlasku. | Kyllä. | Molemmat. | Kyläkeilarata matkan varrella ennen junaa. | SUORA — käytä slovakialaista nimeä/sääntöjä erotukseksi nykykeilailusta. | littlebigslovakia.com: "10 Traditional Slovak Games" | idea |
| SVK-3 | Hra v kostky (jednotky a pätky) | Slovakia | Kuusi noppaa; pisteet lasketaan sovituin säännöin ykkösistä/viitosista, muut luvut voivat mitätöidä heiton; ensin sovittuun pistemäärään voittaa. | Todennäköisyys: heittojen arviointi ja riskinotto. | Kyllä. | Molemmat (botti = RNG). | Majatalon taukopeli junamatkojen välissä. | SUORA. | littlebigslovakia.com | idea |
| MDA-1 | Oina | Moldova | Kaksi joukkuetta; lyöjä lyö pallon puukapulalla ja juoksee radan päähän/takaisin, vastajoukkue yrittää osua juoksijaan pallolla. | Historia/kieli: paimentolaiskulttuuri, Bessarabian koulujen 1930-luvun mestaruudet. | Kyllä. | Molemmat. | Isoisän Bessarabia-luvun kyläottelu → minipeli avaa kartan seuraavaan kohteeseen. | OMA VERSIO — täydet joukkuesäännöt yksinkertaistettu 1v1/botti-versioksi. | unesco-centerbg.org: "Oina Game" | idea |
| MDA-2 | Moara (mylly) | Moldova | Kahden pelaajan strategiapeli 24 pisteen laudalla; 9 nappulaa per pelaaja, kolmen rivi poistaa vastustajan nappulan. | Looginen päättely: siirtojen suunnittelu useita askelia eteenpäin. | Kyllä. | Molemmat (botti = minimax). | Kylän vanhukset pelaavat torilla — voitto antaa aarrevihjeen. | SUORA — yleiseurooppalainen kansanperinne (tunnetaan myös Nine Men's Morris -nimellä). | [Nine men's morris – Wikipedia](https://en.wikipedia.org/wiki/Nine_men%27s_morris) | idea |
| MDA-3 | Țurca | Moldova | Nuorukainen pukeutuu peto-/haarukkanaamariin ja kiertää taloja tanssien uudenvuoden aikaan, leikkimielinen esitys. | Kulttuuri: uudenvuoden naamiaisperinteet ja symboliikka. | Rituaali, ei kilpapeli sellaisenaan. | Molemmat (naamiaiskohtaus muokattavissa). | Uudenvuoden juhla, pelaaja pukeutuu naamioon ja kerää vihjeitä talosta taloon. | OMA VERSIO — rituaali muokattava vuorovaikutteiseksi minipeliksi. | [Capra (goat dance) – Wikipedia](https://en.wikipedia.org/wiki/Capra_(goat_dance)) | tarkista |
| TUR-1 | Mangala | Turkki | Laudalla 12 kuoppaa + 2 aittaa; kivet jaetaan vastapäivään, viimeisen kiven osuessa omaan aittaan saa lisävuoron; kerää eniten kiviä. | Laskenta/strategia: ennakoiva jakolaskenta; UNESCO:n aineeton kulttuuriperintö. | Kyllä. | Molemmat. | Istanbulin torilla paikallinen opettaa pelin. | SUORA — PD, UNESCO-listattu. | [Mangala (game) – Wikipedia](https://en.wikipedia.org/wiki/Mangala_(game)) | idea |
| TUR-2 | Çelik çomak | Turkki | Suippopäinen tikku lyödään kuopasta ilmaan isommalla kepillä, lyödään uudelleen mahdollisimman pitkälle; pisteet matkasta/tarkkuudesta. | Fysiikka/maantieto: kulman ja voiman vaikutus, juuret Keski-Aasian paimentolaiskulttuureissa. | Kyllä. | Molemmat. | Anatolian kylätorin kilpailu matkan varrella. | SUORA. | kureansiklopedi.com | idea |
| TUR-3 | Aşık oyunu | Turkki | Lampaan/vuohen nilkkaluita heitetään; neljä eri asentoa antavat pisteitä/vuoron; voi myös näpätä vastustajan luita omalla heitolla. | Todennäköisyys/historia: yksi maailman vanhimmista tunnetuista peleistä. | Kyllä sovellettuna. | Molemmat. | Kylän tori — pelaaja oppii pelin paikalliselta pienenä minipelinä. | OMA VERSIO — oikeat eläimenluut korvataan symbolisella pelivälineellä digiversiossa. | researchgate.net: Türk Kültürlerindeki Geleneksel Oyunlar | idea |
| RUS-1 | Lapta | Venäjä | Kaksi joukkuetta; lyöjä lyö pallon mailalla, juoksee kentän päähän ja takaisin, vastajoukkue yrittää osua juoksijaan. | Historia: mainitaan jo "Igorin sotaretken tarinassa" (1200-l.), Pietari Suuri käytti kaartinsa kuntoiluun. | Kyllä. | Molemmat. | Pietarin-luvun kaartilaisottelu puistossa → minipeli. | OMA VERSIO — joukkuesäännöt sovitettu yksinkertaistetuksi 1v1/botti-versioksi. | [Lapta (game) – Wikipedia](https://en.wikipedia.org/wiki/Lapta_(game)) | idea |
| RUS-2 | Gorodki | Venäjä | Viiden puunastan "kaupunkikuvioita" heitetään kumoon puukapulalla neliönmuotoiselta heittoalueelta mahdollisimman harvalla heitolla. | Geometria: yli 15 virallista kuviota, heittokulman/voiman laskenta. | Kyllä. | Molemmat. | Tehtaan piha / lomakeskus matkan varrella. | SUORA — virallistettu laji 1933. | [Gorodki – Wikipedia](https://en.wikipedia.org/wiki/Gorodki) | idea |
| RUS-3 | Durak | Venäjä | 36 kortin pakalla hyökkäys/puolustus-vuoroin; puolustaja torjuu kortin korkeammalla samaa maata tai valtilla; viimeinen kortillinen = "hölmö". | Strategia/muisti: korttien arvojärjestys, valttimekaniikka, pelattujen korttien muistaminen. | Kyllä. | Molemmat. | Junavaunun matkustajat pelaavat Durakia eri hahmojen kanssa. | SUORA. | [Durak – Wikipedia](https://en.wikipedia.org/wiki/Durak) | idea |

**Huomiot:** Csülközés (HUN-3) ja Aşık oyunu (TUR-3) vaativat OMA
VERSIO -sovitusta turvallisuuden/materiaalin takia (keppitaistelu ja
oikeat eläimenluut korvattava symbolisilla mekaniikoilla). Oina
(MDA-1) ja Lapta (RUS-1) ovat täysimittaisia joukkuepelejä (9–11
pelaajaa/joukkue) — yksinkertaistettu 1v1-versioksi botti/kaveri
-minipeliin. Țurca (MDA-3) on rituaali/naamiaisesitys, ei sääntöpeli —
heikoin löydös, harkitse korvaamista toisella moldovalaisella pelillä.

---

## Ehdotus: ensimmäiset 10 peliä

Valittu kattamaan eri pelityypit (piha/tarkkuus, lauta/strategia,
lauta/noppa, kortti) ja laajasti eri maita, sekä helppoutta toteuttaa
digitaalisesti (botille yksinkertainen tekoäly tai selkeä
fysiikkasimulaatio):

| järjestys | peli | id | tyyppi | perustelu |
|---|---|---|---|---|
| 1 | Mölkky | FIN-2 | piha/tarkkuus | Tuttu kotimainen peli, yksinkertainen pistelaskentamekaniikka (täsmä-50), helppo botti (RNG-heitto); huom. oma nimi/ulkoasu tavaramerkin vuoksi. |
| 2 | Kubb | SWE-1 | piha/tarkkuus | Selkeä vuoropohjainen heittopeli, helppo toteuttaa fysiikkasimulaationa, ei oikeudellisia esteitä. |
| 3 | Mangala | TUR-1 | lauta/strategia | UNESCO-listattu, yksinkertainen mutta syvä mekaniikka (pit-and-sow), erinomainen botti-AI, hyvä laskukytkös. |
| 4 | Mylly (Nine Men's Morris) | DEU-2 | lauta/strategia | Klassinen 2-pelaajan abstrakti peli, esiintyy useassa maassa (myös Serbia, Moldova) — yksi toteutus, monta kytköspaikkaa. |
| 5 | Cribbage | GBR-1 | kortti | Vahva laskentaoppimiskytkös (15/31-summat), selkeä pistetaulu, helppo botti. |
| 6 | Briscola | ITA-1 | kortti | Yksinkertainen tikinottopeli, nopea oppia, laajalti tunnettu malli (sama mekaniikka toistuu Kroatian Briškulassa ja Maltan Bixklassa). |
| 7 | Tavli (kreikkalainen backgammon) | GRC-1 | lauta/noppa | Todennäköisyyslaskenta konkreettisesti, tuttu mekaniikka (backgammon-perhe, toistuu Tšekin Vrhcábyssä), helppo botti. |
| 8 | Pétanque | FRA-1 | piha/tarkkuus | Tunnettu kansainvälisesti, yksinkertainen etäisyysmekaniikka, hyvä fysiikkaoppimiskytkös. |
| 9 | Schnapsen | AUT-1 | kortti | Kahden pelaajan tikkipeli — helpoin korttipelityyppi botille (ei tarvitse simuloida useaa vastustajaa), selkeä pisteraja (66). |
| 10 | Hnefatafl | NOR-1 | lauta/strategia | Epäsymmetrinen strategiapeli, vahva historiakytkös (viikinkiaika, lähdekritiikki-tarina), erottuu Myllystä ja Mangalasta pelityypiltään. |

---

## Omistajan ideat

*(Omistajan 27.9.2026 suunnasta poimitut aloitusideat — omistaja voi
lisätä/muokata rivejä myöhemmin, tätä listaa ei täytetä valmiiksi
muuten.)*

| idea | kuvaus | tila |
|---|---|---|
| Ruokaraha | Matkan aikana kertyvä/kuluva pieni pistevaluutta, jota pelit tuottavat tai kuluttavat (ei oikeaa rahaa) — mekaniikka avoinna. | idea |
| Pulu sekoilee ±10 p | Pulu-hahmo voi satunnaisesti sotkea pelitilanteen kesken pelin, siirtäen pisteitä ±10 suuntaan tai toiseen (huumori-/yllätyselementti). | idea |
| Aarreruksi +100 p | Erikoistason voitto (esim. vaikea peli tai aarteen lopullinen löytyminen) palkitsee kertaluonteisesti +100 pisteellä. | idea |
| Huvipuistopelit 30/100 p | Tori-/huvipuistotyyppiset minipelit (esim. narunveto, pallonheitto) antavat pienempiä palkintotasoja: 30 tai 100 pistettä. | idea |
| *(omistaja lisää tähän)* | | |
