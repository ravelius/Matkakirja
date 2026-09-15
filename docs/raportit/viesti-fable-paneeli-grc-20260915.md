# Maapaneeli: Kreikan ankkuri, eleiden läpäisy ja lisää-valikko

**Kenelle:** Fable · **Keneltä:** Opus-agentti · **Päivä:** 15.9.2026
**Haara:** `claude/bold-ride-vow4ki-paneeli-grc` · **Pohja:** main (80ab5b50)
**Päätökset:** Raamattu, KARTTAUUDISTUKSEN PÄÄTÖKSET 20, 21 ja 22

Kolme omistajan päätöstä samassa PR:ssä. Kaikki luvut on MITATTU ajossa
olevasta pelistä (Playwright, `tools/savukkeet/savuke-era12.mjs`), ei
luettu koodista.

---

## A) PÄÄTÖKSET 20 — Kreikan maapaneelille oma ankkuri

### Valitut ankkurit

| Ruutu | Paikka | Koordinaatti | Missä kartalla |
| --- | --- | --- | --- |
| Leveä (työpöytä, vaaka) | **Joonianmeri** | 37,8 N / 19,9 E | Peloponnesoksen länsipuolella, Kefalonian ja Zakynthoksen ulkopuolella — merikilpikonna-noston (n. Kyparissian lahti) VASEMMALLA puolella |
| Kapea (pystypuhelin) | **Aigeianmeri** | 36,15 N / 24,35 E | Peloponnesoksen ja Kreetan välisessä aukossa, Milosin eteläpuolella |

Ankkuri on kortin yläreunan keskikohta, joten kortti riippuu siitä
alaspäin. Taulut: `js/pallolauta/maapaneeli.js`
`MAAPANEELIN_ANKKURIT.GRC` ja `MAAPANEELIN_KAPEAT_ANKKURIT.GRC`.

### Ehdokkaat ja mittaukset

Jokaisesta ehdokkaasta mitattiin paneelin nelikulmion **25
näytepistettä** maapolygoneja vasten (sama aineisto kuin pelillä,
`assets/data/maapolygonit.json`; mukana GRC, ALB, TUR, ITA ja kaikki
saaret, myös Zakynthos ja Kefalonia) sekä kortin ruutupaikka
saapumisnäkymässä.

**Leveä ruutu (1400 × 900):**

| Ehdokas | Koordinaatti | Maaosumia / 25 | Kortti ruudulla (x / y) | Rako lähimpään nostoon | Arvio |
| --- | --- | --- | --- | --- | --- |
| Nykytila (eteläreunan oletus) | 34,791 N / 23,933 E | 0 | 656…723 / 768…821 | −185 px (kortti on nostojen OIKEALLA puolella) | Omistajan kuvan tilanne: Kreetan alla keskellä |
| **I1 Joonianmeri (valittu)** | **37,8 N / 19,9 E** | **0** | **283…355 / 471…528** | **+114,8 px** | Peloponnesoksen kyljessä, kilpikonnan vasemmalla puolella |
| I2 Joonianmeri, eteläisempi | 37,35 N / 19,75 E | 0 | 275…347 / 523…580 | +115 px | Sama meri, mutta kortti painuu lähemmäs ruudun alalaitaa |
| I3 Joonianmeri, pohjoisempi | 38,25 N / 19,55 E | 0 | 270…342 / 418…475 | +115 px | Nousee Korfun tasalle, kauemmas kilpikonnasta |

**Kapea ruutu (390 × 844):**

| Ehdokas | Koordinaatti | Maaosumia / 25 | Kortti ruudulla (x / y) | Väli ruudun alareunaan | Arvio |
| --- | --- | --- | --- | --- | --- |
| Nykytila (eteläreunan oletus) | 34,791 N / 23,933 E | 0 | 185…221 / 725…753 | 22 px | Kreetan alla, kiinni alalaidassa |
| K1 Libyanmeri | 34,85 N / 24,0 E | 0 | 191…227 / 725…753 | 22 px | Sama kuin oletus, ei lisäarvoa |
| **K3 Aigeianmeri (valittu)** | **36,15 N / 24,35 E** | **0** | **224…259 / 635…663** | **112 px** | Kartan omassa aukossa Peloponnesoksen ja Kreetan välissä |

Joonianmeri ei kelpaa kapealle ruudulle: korkeuteen sovitettu
saapumisnäkymä (PÄÄTÖKSET 17) näyttää Kreikasta vain noin kolme astetta
pituutta, joten 19,9 E jää ruudun ulkopuolelle länteen — täsmälleen sama
ilmiö kuin Ranskan Biskajalla (PÄÄTÖKSET 18).

### Lopputilanne vartioissa (savuke-era12, väite 9)

| Ruutu | Korkeussovitus | Mitattu ankkuri | Maaosumia | Kortti kokonaan ruudulla | Päällekkäisyyksiä (nostot, nimikyltit, kaupunkimerkit, reitti, pulu) | Rako lähimpään nostoon |
| --- | --- | --- | --- | --- | --- | --- |
| 1400 × 900 | ei | 37,8 N / 19,9 E | 0 / 25 | kyllä (283…355 / 471…528) | 0 | 114,8 px |
| 390 × 844 | kyllä | 36,15 N / 24,35 E | 0 / 25 | kyllä (224…259 / 635…663) | 0 | 37 px (nosto on kortin alapuolella) |

Paneelin leveysosuus ei muuttunut: 6,2 % (1400 px) ja 9,5 % (390 px),
katto 10 %.

### Kuvat

- `docs/raportit/kuvat/paneeli-grc-1400-20260915.jpg`
- `docs/raportit/kuvat/paneeli-grc-390-20260915.jpg`

---

## B) PÄÄTÖKSET 21 — paneeli ei estä vieritystä eikä zoomia

**Toteutus.** Kortin rungosta poistettiin neljän tapahtuman
(`pointerdown`, `touchstart`, `wheel`, `click`) `stopPropagation`, ja
runko on nyt `pointer-events: none`. Osumat ottavat vastaan vain
plus-nappi ja valikon rivit (`pointer-events: auto` omissa
lohkoissaan). Kartan rulla- ja vetokuuntelijat ovat kankaalla kortin
alla, joten ne saavat tapahtuman suoraan.

**Miksi juuri zoomi oli rikki.** Panorointi (paljas rulla) kuuntelee
kotelon kaappausvaiheessa ja toimi kortinkin päällä jo ennen tätä erää;
ZOOMIN ottaa vastaan OrbitControlsin oma kuuntelija kankaalla, ja se ei
koskaan nähnyt tapahtumaa, kun kortti oli osumakohde.

**Mitattu (savuke-era12 väite 10, Kreikka 1400 × 900):**

| Mitta | Tulos | Vaatimus |
| --- | --- | --- |
| Ctrl-rulla (6 pykälää) paneelin päällä | kameran korkeus muuttui **0,05969** | — |
| Sama rulla kartan päällä (tuore sivu, sama saapumiskorkeus) | **0,06423** | — |
| Suhde | **0,93** | ±10 % (ero on osoittimen paikka: kirjasto zoomaa kohti kursoria, ja paneeli on ruudun laidassa) |
| Raahaus paneelin päältä | panoroi **0,471°** | > 0,03° |
| Tekstivalinta raahauksen jälkeen | **""** (tyhjä) | tyhjä |
| Plus-nappi ruutunapautuksella | **avasi valikon** | avaa |

**Vastakoe J** (`stopPropagation` ja `pointer-events: auto` takaisin):
ctrl-rulla paneelin päällä muutti korkeutta **0** (kartan päällä 0,06423)
— eli ennen tätä erää zoomi kuoli paneelin kohdalla kokonaan. Väite 10
kaatuu, kuten pitääkin.

Vartio: savuke-era12 väite 10. Vastakoe J palauttaa `stopPropagation`in
ja `pointer-events: auto`n — väitteen on kaaduttava.

---

## C) PÄÄTÖKSET 22 — lisää-valikko ilman taustaa, kategoriat allekkain

**Toteutus.** `.maapaneeli-valikko`: pystysuora lista (`flex-direction:
column`), ei taustaa, ei reunusta, ei pyöristystä, ei pehmustetta.
Rivit ovat väripallo + nimi, ja luettavuus tulee tekstin omasta kerman
värisestä reunuksesta (`text-shadow` neljään suuntaan) — ei yhtään
suodatinta, joten CSS2D-kerros ei joudu omalle piirtotasolleen.
Väripallolla on sama kerman veto (`box-shadow: 0 0 0 0.5px`).
Sijoitus: valikko aukeaa kortin alle (tai ylös, jos alle ei mahdu eikä
ylös meno vie ruudun yli), ja `sovitaValikko` siirtää sen tarvittaessa
vaakasuunnassa ruudun sisään (`--valikko-siirto`, kortin omissa
yksiköissä, koska valikko on `scale`atun kortin lapsi).

**Mitattu (savuke-era12 väite 7, Ranska/Pariisi):**

| Ruutu | Nappeja | Rivejä | Valikon tausta | Reunus | Napin tausta | Tekstin reunus | Rako korttiin | Leikkaa korttia | Kokonaan ruudulla |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1400 × 900 | 8 | 8 | alfa 0 | 0 px | alfa 0 | on | 2,22 px | ei | kyllä |
| 390 × 844 | 8 | 8 | alfa 0 | 0 px | alfa 0 | on | 0,92 px | ei | kyllä |

Kreikassa kategorioita on kuusi (Luonto, Tarut ja sadut, Tiede ja
keksinnöt, Ruoka ja juhlapöytä, Musiikki, Menovinkit) ja ne latoutuvat
samoin allekkain.

Vartio päivitettiin: aiempi "yhdellä rivillä" -ehto on korvattu
kolmella mitalla (joka kategoria omalla rivillään, ei taustalaatikkoa
missään kerroksessa, kokonaan ruudulla eikä kortin päällä). Vastakoe F
palauttaa erän 12 kahden palstan tumman laatikon — väitteen on
kaaduttava.

### Kuvat

- `docs/raportit/kuvat/lisaa-valikko-1400-20260915.jpg`
- `docs/raportit/kuvat/lisaa-valikko-390-20260915.jpg`

---

## Ehdotus muille 25 maalle (EI koodia — Fablen ja omistajan katsottavaksi)

Taulukko on **ehdotus**, ei toteutus: jokainen rivi on mitattava
näytepisteillä ennen kuin se kirjataan tauluun, aivan kuten Ranska ja
Kreikka. Valintaperuste on sama kuin päätöksessä 20: kokonaan merellä,
lähellä maata, ei nostojen, nimikylttien, kaupunkimerkkien, reitin eikä
pulun päällä, ja näkyvissä saapumisnäkymässä. Kapean ruudun ehdokas on
valittu maan **x-keskilinjan** tuntumasta, koska korkeuteen sovitettu
pystyruutu näyttää vain kapean kaistan pituutta.

| Maa | Leveä ruutu (työpöytä, vaaka) | Kapea ruutu (pystypuhelin) | Perustelu |
| --- | --- | --- | --- |
| GBR Britannia | Pohjanmeri Itä-Anglian edustalla (n. 53,5 N / 2,5 E) | Englannin kanaali Wightin eteläpuolella (n. 50,0 N / 1,5 W) | Molemmat ovat maan kylkeen rajautuvaa avovettä, jossa ei ole kaupunkeja eikä nostoja; kanaali on maan x-keskilinjalla, joten se pysyy pystyruudulla näkyvissä. |
| IRL Irlanti | Atlantti Galwayn länsipuolella (n. 53,3 N / 11,0 W) | Kelttienmeri saaren eteläpuolella (n. 51,0 N / 8,5 W) | Länsipuoli on tyhjä valtameri, ja etelä on ainoa suunta, joka mahtuu korkeuteen sovitettuun pystyruutuun. |
| ISL Islanti | Tanskansalmi luoteessa (n. 66,3 N / 25,5 W) | Atlantti saaren eteläpuolella (n. 62,9 N / 19,0 W) | Islannin nostot ovat sisämaassa ja etelärannikolla, joten luode on tyhjin laita; etelä on x-keskellä. |
| NOR Norja | Norjanmeri Trondheimin edustalla (n. 64,0 N / 7,0 E) | Pohjanmeri Stavangerin eteläpuolella (n. 57,6 N / 5,5 E) | Rannikon nostot ovat vuonojen suulla, ja avomeri niiden länsipuolella on tyhjä; etelä pitää kortin pystyruudulla. |
| SWE Ruotsi | Pohjanlahti Uumajan itäpuolella (n. 63,5 N / 20,8 E) | Itämeri Öölannin ja Gotlannin välissä (n. 56,8 N / 17,3 E) | Pohjanlahti on leveä tyhjä vesi maan kyljessä; eteläinen Itämeri on maan x-keskilinjalla. |
| DNK Tanska | Pohjanmeri Jyllannin länsipuolella (n. 56,2 N / 6,8 E) | Saksanlahti Jyllannin eteläpuolella (n. 54,6 N / 8,0 E) | Tanskan saaret täyttävät idän, joten länsi ja etelä ovat ainoat tyhjät suunnat. |
| FIN Suomi | Pohjanlahti Vaasan länsipuolella (n. 63,1 N / 19,8 E) | Suomenlahti Helsingin eteläpuolella (n. 59,4 N / 24,5 E) | Pohjanlahti on iso tyhjä vesi kyljessä; Suomenlahti on maan alla ja x-keskellä. |
| EST Viro | Itämeri Saarenmaan länsipuolella (n. 58,4 N / 20,8 E) | Riianlahti maan eteläpuolella (n. 57,5 N / 23,6 E) | Länsipuolen avovesi on tyhjä, ja Riianlahti on maan alapuolella keskilinjalla. |
| LVA Latvia | Itämeri Ventspilsin länsipuolella (n. 57,3 N / 20,0 E) | Riianlahden keskusta (n. 57,5 N / 23,6 E) | Molemmat ovat maan omaa merta ilman kaupunkeja; lahti on x-keskellä. |
| LTU Liettua | Itämeri Klaipedan länsipuolella (n. 55,7 N / 19,7 E) | Itämeri maan lounaispuolella (n. 55,2 N / 20,4 E) | Rannikon ainoa kaupunki on Klaipeda, ja sen länsipuoli on tyhjä avovesi. |
| POL Puola | Itämeri Gdanskin pohjoispuolella (n. 55,4 N / 17,5 E) | Gdanskinlahti (n. 54,9 N / 19,0 E) | Puolan kaupungit ovat sisämaassa; pohjoinen meri on ainoa vesi ja se on myös x-keskellä. |
| DEU Saksa | Pohjanmeri Saksanlahdella (n. 54,6 N / 6,8 E) | Itämeri Fehmarnin pohjoispuolella (n. 54,9 N / 11,0 E) | Saksanlahti on tyhjä; Itämeren puoli osuu maan x-keskilinjalle ja mahtuu siksi pystyruutuun. |
| NLD Alankomaat | Pohjanmeri Ijmuidenin länsipuolella (n. 52,5 N / 3,3 E) | Pohjanmeri Waddenin pohjoispuolella (n. 53,8 N / 5,3 E) | Maa on pieni ja tiheä, joten kortti on pakko viedä merelle; pohjoinen on x-keskellä. |
| PRT Portugali | Atlantti Lissabonin länsipuolella (n. 38,9 N / 10,5 W) | Cádizinlahti Algarven eteläpuolella (n. 36,4 N / 8,3 W) | Atlantti on tyhjä kummallakin laidalla; etelä pitää kortin pystyruudulla. |
| ESP Espanja | Atlantti Galician länsipuolella (n. 43,0 N / 10,8 W) | Alboranmeri maan eteläpuolella (n. 35,9 N / 3,5 W) | Galician edusta on tyhjä valtameri; Alboranmeri on maan x-keskilinjalla Gibraltarin itäpuolella. |
| ITA Italia | Tyrrhenanmeri Sardinian ja niemimaan välissä (n. 40,2 N / 11,8 E) | Välimeri Sisilian eteläpuolella (n. 36,0 N / 13,5 E) | Tyrrhenanmeri on saarten rajaama tyhjä allas keskellä maata; Sisilian eteläpuoli on x-keskellä. |
| CHE Sveitsi | Ligurianmeri Genovan edustalla (n. 43,6 N / 8,6 E) | sama | SISÄMAA: lähin avovesi on Ligurianmeri, mutta se on maan laatikon ulkopuolella — vaihtoehto on jättää kortti Alppien tyhjälle vuoristolaikulle; omistajan valinta. |
| AUT Itävalta | Adrianmeri Venetsianlahdella (n. 45,2 N / 13,2 E) | sama | SISÄMAA: Venetsianlahti on lähin meri ja se on maan eteläpuolella x-keskilinjan tuntumassa. |
| CZE Tšekki | Itämeri Szczecinin pohjoispuolella (n. 54,5 N / 14,4 E) | — | SISÄMAA ja kauimpana merestä: kortti joutuisi maan päälle tai kauas laatikosta; ehdotus on mitattava erikseen, mahdollisesti Böömin metsän tyhjä laikku. |
| HUN Unkari | Adrianmeri Kvarnerin edustalla (n. 44,6 N / 14,2 E) | — | SISÄMAA: lähin meri on Kvarner, mutta pystyruudulla se jää laatikon ulkopuolelle — Balaton tai Alföldin tyhjä laikku on realistisempi, omistajan valinta. |
| HRV Kroatia | Adrianmeri Dalmatian saarten länsipuolella (n. 43,3 N / 15,2 E) | Adrianmeri Splitin lounaispuolella (n. 42,9 N / 16,2 E) | Adrianmeren keskiallas on tyhjä ja se kulkee maan koko pituudelta, joten molemmat ruudut saavat oman kohtansa samasta merestä. |
| BIH Bosnia ja Hertsegovina | Adrianmeri Neretvan suun edustalla (n. 42,7 N / 17,0 E) | Adrianmeri maan eteläpuolella (n. 42,3 N / 17,6 E) | Maalla on vain 20 km rannikkoa, mutta sen edustan avovesi on tyhjä ja lähellä. |
| ROU Romania | Mustameri Constantan itäpuolella (n. 44,2 N / 30,0 E) | mitattava erikseen | Mustanmeren avovesi on tyhjä, mutta pystyruudulla se jää maan x-keskilinjan itäpuolelle — kapea ankkuri on mitattava (Tonavan suisto tai Karpaattien tyhjä laikku). |
| BGR Bulgaria | Mustameri Varnan itäpuolella (n. 43,2 N / 29,5 E) | mitattava erikseen | Sama kuin Romanialla: meri on idässä, pystyruutu rajaa maan keskelle. |
| UKR Ukraina | Mustameri Odessan eteläpuolella (n. 44,5 N / 31,0 E) | Mustameri Krimin eteläpuolella (n. 43,8 N / 33,5 E) | Mustanmeren pohjoisosa on tyhjä ja osuu maan x-keskilinjalle, joten sama meri kelpaa molemmille ruuduille. |

**Kolme havaintoa, jotka omistajan on hyvä tietää etukäteen:**

1. **Sisämaan maat (CHE, AUT, CZE, HUN)** eivät voi täyttää sääntöä
   "kokonaan merellä". Vaihtoehtoja on kaksi: lähin avovesi (kortti
   kauas maasta) tai maan oma tyhjä laikku (kortti maan päällä).
   Tarvitaan omistajan linjaus.
2. **Mustanmeren maat (ROU, BGR)** saavat leveälle ruudulle hyvän
   paikan idästä, mutta pystypuhelimella meri jää ruudun ulkopuolelle —
   sama ilmiö kuin Ranskan Biskajalla. Kapea ankkuri on mitattava
   erikseen.
3. **TUR ja RUS** eivät ole taulukossa (omistajan luku oli 25). TUR:lle
   ehdotan leveälle Antalyanlahden eteläpuolista Välimerta (n. 35,5 N /
   31,0 E) ja kapealle Kyproksen luoteispuolta (n. 35,8 N / 32,5 E);
   RUS on niin laaja, että sen ankkuri kannattaa mitata vasta, kun
   saapumisrajaus Venäjälle on päätetty.

---

## Portit

| Portti | Tulos |
| --- | --- |
| `NODE_USE_ENV_PROXY=1 npm test` | 3441 testiä, **0 fail** (13 skip), 181 s |
| `tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |
| `tools/tarkista-niputus.mjs` | 391 moduulia, ei törmäyksiä |
| `tools/tarkista-savukkeet.mjs` | kunnossa |
| `tests/rules.test.mjs` + `tests/dokumentit.test.mjs` | 337 / 337 |
| `tools/savukkeet/savuke-era12.mjs` | **27 / 27** (10 väitettä + 10 vastakoetta + avaukset) |
| `tools/savukkeet/savuke-kaupunkikortit.mjs` | **121 / 121** |

Ranskan mittaukset eivät muuttuneet: Biskajanlahti 45,9 N / −4,6 E,
paneeli 85,9 px (1400 px) ja 35,5 px (390 px); Lyoninlahti 42,6 N /
3,77 E, kortti kokonaan ruudulla ja merellä.
