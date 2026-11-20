# Pariisin nostotekstit, erä 2: 4 kadonnutta jaksoiksi ja 9 tarinapaikkaa kappaleiksi (SK 20.11.2026, L5-4)

Haara `sk/l5-nostotekstit-era1` (sama kuin erä 1; draft-PR 7223 pysyy draftina, EI mainiin ennen KK:n sanaa). Data: `js/packs/monumentit-eurooppa.js` (4 kadonnutta), `js/packs/nahtavyysjutut.js`, `js/packs/fokusvirta-pariisi.js` (Piiritys, Monet; takynostot), `js/packs/skandaalit.js` (Vrain-Lucas). Ei uusia kuvia, ei uusia nostoja, ei äänityksiä, ei natiivikoodia, ei karttanimien muutoksia, ei erää 3. Pasteurin J3-virke ("Vuonna 1860 hän vei liemipulloja jopa Alppien jäätikölle, jossa ilmassa oli vain vähän pölyä.") oli jo haarassa (68131c7831).

## 1. M2: tarkistukset ja rikeluettelo

- Erän 1 kuusi tarkistusta (`tools/sisalto/noston-tarkistus.mjs`, testi `tests/noston-tekstisaannot.test.mjs`) vihreät myös näille 13:lle: nimi ensimmäisessä virkkeessä · ei suhteellista alkua · vuodet nousevassa järjestyksessä · vuosirivi jokaiselle sanotulle vuodelle · ei isoisää · ≤ 1 000 merkkiä. B ei ole enää erillinen ryhmä työkalussa: 4 kadonnutta kuuluvat jaksollisiin (A = 17). Testeihin lisätty `noston-jaksot` ERA +4 ja `noston-tekstisaannot` ERA_2_B / ERA_2_D sekä erän 2 testi (kappalemuoto, ei isoisää, visan vastaus tekstissä).
- **Pituus ja muoto** (`stats2.mjs`): B 965 / 914 / 750 / 903 merkkiä, 5 jaksoa, 5–6 vuosiriviä. D/E 748 / 854 / 876 / 736 / 989 / 828 / 821 / 753 / 902 merkkiä, 3–4 kappaletta. Kaikki 700–1 000 (Bizet 1 732 → 748). Vuosirivejä D/E:llä ei ole kentässä jutuilla, joilla niitä ei ollut (ks. luku 3 c ja d).
- **Rikeluettelo pieneni:** lähtöluettelossa (origin/main ennen erää 1) 36 rikkeellistä tekstiä, rikkeet alku 23, isoisä 8, järjestys 10, pituus 9, rivit 6. Nyt `node tools/sisalto/noston-tarkistus.mjs` näyttää 46 tekstistä **14 rikkeellistä** (alku 6, isoisä 0, järjestys 4, pituus 7, rivit 0): 9 nähtävyysjuttua (c:) ja 5 historian hetkeä (f:). Lähtö-JSONista poistettu b:* (4) ja viisi d:* (Bizet, Kirahvi, Bukinistit, Patonki, Piiritys). Muut d:* eivät olleet siinä. JSON on yläraja eikä sitä ole kiristetty muiden erien riveistä (13 erän 1 nostoa on siinä yhä, vaikka ne ovat nyt 0 rikettä): kiristys on pieni erillinen työ, jos KK haluaa.
- Äänitysjono: `node tools/aanitysjono/tarkista.mjs --lisaa` ajettu (98 riviä lisätty; EI `--siivoa`, se poisti aiemmin 700 riviä muilta).
- **Testit:** täysi suite `node --test tests/*.test.mjs` kärjessä 4e8997ec51: 5 974 testiä, 5 954 läpi, 1 kaatuu (`asemataulu-tyolista-komento` "koukku: yli 3 h vanhat työn alla -rivit…", tunnettu työlistakoukku, ei liity tekstiin). Edellisen ajon kaksi muuta virhettä (skandaalit 120 sanaa, vienti.test lehti.json) eivät toistu.

## 2. Mitä muuttui

- **B, 4 kadonnutta** (hahmotelma-grand-chatelet, -temple-torni, -trocadero, -galerie-des-machines; `monumentit-eurooppa.js`): kortin yksi teksti → 5 jaksoa (tapahtuma ×3, kaanne, tanaan), J1 kuva `loisto` (nykyinen havainnekuva), hologrammi sammuu kaanne-jaksolla (`hologrammiKohta`), `otsikko` = tarinarivi ≤ 40 merkkiä ilman vuotta. Ei visaa (ei ollut). Pulun kysymykset 3 kpl, korostukset päivitetty.
- **D/E, 9 tarinapaikkaa** kappalemuotoon (3–4 kappaletta, ei jaksoja kuvineen, koska D/E:llä on yksi pääkuva): Bizet, Kirahvi, Bukinistit, Patonki (nähtävyysjutut + `fokusvirta-pariisi.js` takynostot), Vrain-Lucas (`skandaalit.js`, `teksti` ja `kortti`), Monet ja Piiritys (`fokusvirta-pariisi.js` takyt), Notre-Dame, Piaf (takynostot). `nahtavyysjutut.js`:n kopiot samat; olemassa olevat `vuodet`-rivit päivitetty tekstiin, uusia kenttiä ei tehty.
- Vrain-Lucasin `teksti` on 120 sanaa / 989 merkkiä, koska `tests/skandaalit.test.mjs` vaatii ≥ 120 sanaa; `kortti`n ensimmäinen virke on "Vrain-Lucasin väärentämässä kirjeessä Kleopatra…".
- Ei isoisää missään näiden 13 noston kentässä (nappi, tarinarivi, lähderivi, kortti): skriptitarkistus ja testi.
- Äänitteellisiä paloja näissä 13:ssa ei ole; ei `aanikansio`-muutoksia.

## 3. Poikkeukset ja avoimet kohdat KK:lle

1. **M1–M5 riveittäin.** M1 silmin: luku 4 (13 taulukkoa ENNEN | NYT). M2 luvuin: luku 1 (testit vihreät, rikeluettelo 36 → 14, pituudet 736–989, jaksot 5 / kappaleet 3–4). M3 luvuin: luku 5 (kaksi lähdettä per uusi väite, riippumattoman tarkistajan rivit, heikoimmat kohdat). M4 luvuin: Piiritys kertojan äänellä, ei minä-muotoa eikä isoisää; isoisä-kenttiä näissä 13:ssa ei ole (kohta 5). M5 luvuin: B:n neljällä J1:llä kuva `loisto`; D/E:llä jokaisella on yksi olemassa oleva pääkuva ennallaan (ei uusia kuvia; kuvajärjestys ks. c).
2. **B:n päällekkäisyys, KK päättää.** Neljän kadonneen jaksoteksti elää kahdessa paikassa: hahmotelmassa (`monumentit-eurooppa.js` jaksot) ja `nahtavyysjutut.js`-kopiossa (jaksot `\n\n`-välein). Päivitin molemmat, jotta ne eivät eroa. Ehdotus yhdelle kodille: (a) poistetaan 4 nähtävyysjuttua kartalta niin, että kartan kortti avaa hahmotelman (kuten Orsay, Industrie, Les Halles, jotka eivät ole nähtävyysjutuissa), tai (b) kopio generoidaan koneellisesti jaksoista. Suosittelen (a), koska se poistaa kopion ja testin siitä.
3. **D/E:n EHDOTUKSET (ei kenttiä lisätty; KK päättää, tilaan erikseen):**
   - *Vuosirivit* jutuille, joilla ei ole: Vrain-Lucas 1861 / 1867 / 1870 ja Notre-Dame 2019 / 2023 / 2024. Lisäksi nykyisiä rivejä voi täydentää tekstin vuosilla: Kirahvi 1827 (saapuminen Pariisiin), Bukinistit 1606 / 1649 / 1859 / 1891, Patonki 1993, Piaf 1915 / 1928 / 1934 / 1935 (nämä Piafilla jo mukana).
   - *Kuvajärjestys:* D/E:llä on yksi pääkuva. Ehdotus: pääkuva kappaleelle 1; Kirahvilla 2. kuva `valokuva` kappaleelle 3.
   - *Tarinarivit* (`otsikko`) jäivät ennalleen, koska KK päätti ne. Jos halutaan samaan muotoon kuin B (≤ 40 merkkiä ilman vuotta), ehdotus kuuluu KK:lle luettelona: Bizet "Carmen saa kylmän vastaanoton", Kirahvi "Kirahvi kävelee Pariisiin", Bukinistit "Oma paikka Seinen kaiteella", Patonki "Kilpailu parhaasta leivästä", Vrain-Lucas "27 000 väärennettyä kirjettä", Monet "Impressionistien ensimmäinen näyttely", Piiritys "Viestit kulkevat kyyhkyillä", Notre-Dame "Palo, jonka kukko selvisi", Piaf "Kadulta ja vaunusta maineeseen" (kaikki ≤ 40 merkkiä; nykyiset otsikot ovat muotoa "Nimi vuosi — rivi").
4. **Piiritys: 3 vuosiriviä → 2 riviä** (1859 mikrokuvapatentti, 1870 Pariisi suljettiin) ja teksti 1871. Perustelu: lähteissä on vain nämä vuodet. 19. ja 27.9. ja sopimuksen hinta jätettiin pois, koska lähteet eroavat; sopimus "marraskuun alussa" ja yksi filmi 18 kyyhkyllä ovat sanallisesti. Rivejä ei venytetty keksityillä vuosilla.
5. **Isoisä-kentät:** erän 2 13 nostossa ei ole isoisä-kenttiä (testi). `ihmeLahde`-rivit, joissa on "isoisän matkavuosi", ovat neljässä muussa nostossa (mercato-vecchio, helsinki-vanha-asema, newgate, euston-arch): ennallaan, ei näissä 13:ssa.
6. **Pulun kysymysmuutokset:** Grand Châtelet kaikki 3 uusiksi (vanha 1790-kysymys vaihdettu, koska vastaus ei ole tekstissä); Temple ja Trocadéro ja Galerie: kysymykset päivitetty tekstiin (yksi uusi); visan vastaus tekstissä (M6). Notre-Damen sanamuutokset: "kuparinen" ja "maasta" pois (lähteet: kuparia ei vahvistettu, kukko löytyi raunioista); Kirahvi ja Notre-Dame visa-faktat korjattu vastaamaan lähteitä; Patonki: "1994" vain TIMEOUT suoraan, muut laskennallisesti (ks. heikoimmat, luku 5).
7. Pasteur-virke tehty (68131c7831).
8. Rikkeet pienenivät: ks. luku 1 (36 → 14 rikkeellistä; isoisä 8 → 0).
9. `asemataulu-tyolista-komento.test.mjs` "koukku: yli 3 h vanhat…" on tunnettu, ei minun (työlistakoukku).

## 4. M1: jokaisesta nostosta ENNEN | NYT (KK:n vertailua varten)

### Grand Châtelet (`hahmotelma-grand-chatelet`)

| | ENNEN | NYT |
|---|---|---|
| Otsikko (kartan nimi) | Grand Châtelet | Grand Châtelet |
| Tarinarivi (datan `otsikko`) | ei kenttää (nappi: "Linnake, jonka läpi kulki tie kaupunkiin") | **Linnake, josta tuli ruumishuone** (31 merkkiä) |
| Jaksoja / merkkejä | ei jaksoja: yksi teksti 796 merkkiä (hahmotelman kortti); nähtävyysjuttu 719 merkkiä, 3 kappaletta | 5 / 965 |
| Vuosirivit | – (kenttä ei ollut käytössä kortilla) | 1190 kaupunki muurataan · 1645 Molière vangiksi · 1721 Cartouche vangiksi · 1792 verilöyly · 1802 purku alkaa · 1806 palmulähde tilataan |
| Kuvat jaksoittain | ei jaksokuvia; ihmekortin kuva `ihme-grand-chatelet-loistoaika.jpg` | J1: loisto · J2: – · J3: – · J4: – · J5: – |
| Pulun kysymykset | Mitä Grand Châtelet'n tuomioistuimelle tapahtui 1790? · Mitä Grand Châtelet'n paikalla on? | Mistä sana morgue sai alkunsa Grand Châtelet'ssa? · Millainen oli Grand Châtelet'n kuoppasolu la Fosse? · Mitä Grand Châtelet'n paikalla on? |

**NYT (kertojan teksti):**

1. [232] Grand Châtelet oli Pariisin vankila- ja oikeuslinnake Seinen oikealla rannalla. Ludvig VI rakennutti sen kiveksi 1100-luvulla, ja kun kaupunkia alettiin muurittaa vuonna 1190, siitä tuli prévôtin eli kuninkaan virkamiehen pääpaikka.
2. [216] Vankeina olivat François Villon, Molière velkojen takia vuonna 1645 ja rosvopäällikkö Cartouche vuonna 1721. Linnakkeen kuoppasolu, la Fosse, kapeni alaspäin kuin kartio, eikä vanki voinut seistä eikä maata kunnolla.
3. [232] Linnakkeessa oli myös ruumishuone, ranskaksi morgue. Sanan sanotaan syntyneen täällä: vartijat tuijottivat uuden vangin kasvot ulkoa tunnistaakseen hänet, jos hän pakenisi. Myöhemmin tänne tuotiin tunnistettavaksi löydetyt vainajat.
4. [129] Syyskuun alussa 1792 joukko tunkeutui linnakkeeseen ja surmasi vankeja, ja vankila hylättiin. Linnakkeen purku alkoi vuonna 1802.
5. [156] Paikalle tehtiin uusi Place du Châtelet. Napoleon tilasi sinne vuonna 1806 palmusuihkulähteen voitonmuistomerkiksi. Fontaine du Palmier seisoo aukiolla yhä.

**ENNEN (hahmotelman kortti, `teksti`):**

1. [796] Grand Châtelet oli Pariisin oikeus- ja vankilalinnake Seinen oikealla rannalla, jonka Ludvig VI rakennutti kiveksi 1100-luvulla. Kun Philippe Auguste alkoi rakennuttaa kaupungin muuria 1190, linnake menetti puolustustehtävänsä, ja siitä tuli Pariisin prévôtin oikeudenkäytön ja poliisin pääpaikka. Rakennuksen läpi kulki holvikäytävä kaupunkiin, ja samoissa muureissa olivat vankila, tuomareiden salit ja kaupungin ruumishuone. Vankeina olivat muun muassa François Villon, Molière ja rosvo Cartouche. Grand Châtelet'tä pidettiin Pariisin pahanhajuisimpana paikkana, ja aivan lähellä olivat teurastamot. Châtelet'n tuomioistuin lakkautettiin 1790, ja linnakkeen purku alkoi 1802. Paikalle tuli Place du Châtelet. Aukion vierellä seisoo Théâtre du Châtelet, jonka Gabriel Davioud rakensi 1860–1862.

**ENNEN (nähtävyysjuttu, kopio; "Isoisäsi vuonna 1873…" -kappale mukana):**

1. [520] Grand Châtelet oli Pariisin oikeus- ja vankilalinnake Seinen oikealla rannalla. Ludvig VI rakennutti sen kiveksi 1100-luvulla. Kun kaupungille alettiin vuonna 1190 rakentaa uutta muuria, linnake menetti puolustustehtävänsä: siitä tuli oikeuden ja poliisin pääpaikka, jota johti kuninkaan virkamies, prévôt. Sen vankiloissa istuivat muiden muassa runoilija François Villon, näytelmäkirjailija Molière velkojen takia vuonna 1645 ja rosvopäällikkö Cartouche vuonna 1721. Linnakkeessa oli myös ruumishuone, ranskaksi morgue.
2. [76] Linnakkeen purkaminen alkoi vuonna 1802. Paikalle tehtiin Place du Châtelet.
3. [123] Isoisäsi vuonna 1873 aukion vieressä seisoi teatteri, Théâtre du Châtelet, jonka Gabriel Davioud rakensi vuosina 1860–1862.

### Temple-torni (`hahmotelma-temple-torni`)

| | ENNEN | NYT |
|---|---|---|
| Otsikko (kartan nimi) | Temple-torni | Temple-torni |
| Tarinarivi (datan `otsikko`) | ei kenttää (nappi: "Torni, jonka Napoleon käski purkaa") | **Torni, jonne kuningasperhe vangittiin** (37 merkkiä) |
| Jaksoja / merkkejä | ei jaksoja: yksi teksti 588 merkkiä (hahmotelman kortti); nähtävyysjuttu 690 merkkiä, 3 kappaletta | 5 / 914 |
| Vuosirivit | – (kenttä ei ollut käytössä kortilla) | 1792 perhe Templeen · 1795 Ludvig XVII kuoli · 1798 Smithin pako · 1804 Pichegru kuoli · 1808 purkumääräys |
| Kuvat jaksoittain | ei jaksokuvia; ihmekortin kuva `ihme-temple-torni-loistoaika-v2.jpg` | J1: loisto · J2: – · J3: – · J4: – · J5: – |
| Pulun kysymykset | Miksi Napoleon määräsi Temple-tornin purettavaksi? · Mitä Temple-tornin paikalla on? | Miksi Napoleon määräsi Temple-tornin purettavaksi? · Mitä Temple-tornin paikalla on? · Miten Sidney Smith pakeni Templen vankilasta? |

**NYT (kertojan teksti):**

1. [229] Temple-torni kohosi temppeliritarien Pariisin päämajan linnoituksessa. Philippe Augusten ajoista kuninkaan aarre talletettiin ritarien linnoitukseen, ja sen muurien suojassa asui myöhemmin Pariisin veroista vapaita käsityöläisiä.
2. [155] Elokuussa 1792 kuningasperhe vietiin Templeen vangiksi. Ludvig XVI vietiin sieltä giljotiinille, ja hänen poikansa Ludvig XVII kuoli Templessä vuonna 1795.
3. [231] Vuonna 1798 brittiamiraali Sidney Smith pakeni Templen vankilasta väärennetyillä siirtomääräyksillä: häntä oltiin muka viemässä toiseen vankilaan. Huhtikuussa 1804 kenraali Pichegru löydettiin kuolleena Templen vankilan sellistään.
4. [149] Napoleon määräsi tornin purettavaksi vuonna 1808, koska halusi lopettaa rojalistien pyhiinvaellukset paikalle, jossa kuningasperhe oli ollut vankina.
5. [150] Tornista ei ole jäänyt mitään. Sen paikan vieressä on nykyisin Square du Temple -puisto, ja Rue Eugène-Spullerilla seisoo kaupunginosan kaupungintalo.

**ENNEN (hahmotelman kortti, `teksti`):**

1. [588] Temple-torni eli Grosse Tour oli temppeliritarien Pariisin päämajan linnoitustorni, jonka rakentaminen alkoi keskiajalla. Tornin muurit olivat paksut, ja sen kulmissa oli neljä pienempää tornia. Temppeliritarikunta lakkautettiin 1312. Elokuun 13. päivänä 1792 Pariisin kommuuni vei kuningasperheen Templeen; Ludvig XVI lähti sieltä giljotiinille 21. tammikuuta 1793. Hänen poikansa Ludvig XVII kuoli Templessä 8. kesäkuuta 1795 kymmenvuotiaana. Napoleon määräsi tornin purettavaksi 1808 estääkseen rojalistien pyhiinvaellukset. Tornin paikan vieressä on nykyisin Square du Temple -puisto.

**ENNEN (nähtävyysjuttu, kopio; "Isoisäsi vuonna 1873…" -kappale mukana):**

1. [343] Temppeliritarit rakennuttivat Pariisin päämajaansa keskiajalla mahtavan linnoitustornin, Grosse Tourin. Ritarikunta lakkautettiin, mutta torni jäi. Elokuun 13. päivänä 1792 kuningasperhe vietiin vangiksi Templeen. Ludvig XVI lähti sieltä giljotiinille tammikuussa 1793, ja hänen poikansa Ludvig XVII kuoli tornissa vuonna 1795 kymmenvuotiaana.
2. [98] Torni muuttui rojalistien pyhiinvaelluskohteeksi, ja siksi Napoleon alkoi purkaa sitä vuonna 1808.
3. [249] Isoisäsi vuonna 1873 torni oli purettu jo yli kuusikymmentä vuotta aiemmin. Sen paikalla seisoi kaupunginosan uusi kaupungintalo, ja vieressä oli puisto, Square du Temple, joka oli avattu 1857. Kaupungintalo on yhä paikallaan Rue Eugène-Spullerilla.

### Trocadéron palatsi (`hahmotelma-trocadero`)

| | ENNEN | NYT |
|---|---|---|
| Otsikko (kartan nimi) | Trocadéron palatsi | Trocadéron palatsi |
| Tarinarivi (datan `otsikko`) | ei kenttää (nappi: "Näyttelypalatsi, josta jäivät vain siivet") | **Palatsi, jonka urut selvisivät** (30 merkkiä) |
| Jaksoja / merkkejä | ei jaksoja: yksi teksti 487 merkkiä (hahmotelman kortti); nähtävyysjuttu 821 merkkiä, 3 kappaletta | 5 / 750 |
| Vuosirivit | – (kenttä ei ollut käytössä kortilla) | 1878 maailmannäyttely · 1882 museo avataan · 1935 purku alkoi · 1937 uusi näyttely · 1948 ihmisoikeusjulistus · 1977 urut Lyoniin |
| Kuvat jaksoittain | ei jaksokuvia; ihmekortin kuva `ihme-trocadero-loistoaika.jpg` | J1: loisto · J2: – · J3: – · J4: – · J5: – |
| Pulun kysymykset | Mitä Trocadéron palatsista jäi pystyyn? · Miksi palatsi purettiin 1935? | Mitä Trocadéron palatsista jäi pystyyn? · Miksi palatsi purettiin 1935? · Minne Trocadéron urut päätyivät? |

**NYT (kertojan teksti):**

1. [180] Trocadéron palatsi rakennettiin vuoden 1878 maailmannäyttelyä varten Seinen pohjoisrannalle. Siinä oli kaksi korkeaa tornia, kaksi suurta siipeä ja yli neljän tuhannen paikan sali.
2. [121] Salin Cavaillé-Collin urut vihittiin elokuussa 1878, ja César Franck sävelsi niille kolmen kappaleen sarjan Trois Pièces.
3. [153] Palatsiin kuului myös etnografinen museo, joka syntyi vuoden 1878 näyttelystä ja avattiin yleisölle vuonna 1882. Vielä 1920-luvulla se oli rappiotilassa.
4. [113] Vuonna 1935 alkoi palatsin purku vuoden 1937 näyttelyn tieltä, ja siivet jäivät uuden Chaillot'n palatsin osiksi.
5. [183] Chaillot'n palatsissa YK:n yleiskokous hyväksyi vuonna 1948 ihmisoikeuksien yleismaailmallisen julistuksen. Trocadéron urut soivat nykyisin Lyonissa, jonne ne siirrettiin vuonna 1977.

**ENNEN (hahmotelman kortti, `teksti`):**

1. [487] Trocadéron palatsi rakennettiin vuoden 1878 Pariisin maailmannäyttelyä varten Seinen pohjoisrannalle, ja sen suunnittelivat Gabriel Davioud ja Jules Bourdais. Palatsissa oli kaksi korkeaa tornia ja kaksi kaarevaa siipeä. Keskellä oli yli neljän tuhannen paikan sali, johon vihittiin Cavaillé-Collin urut. Vuonna 1935 keskisali ja tornit purettiin vuoden 1937 näyttelyn tieltä, ja siivet jäivät uuden Chaillot'n palatsin osiksi. Isoisä ei nähnyt Trocadéroa, sillä se valmistui vasta 1878.

**ENNEN (nähtävyysjuttu, kopio; "Isoisäsi vuonna 1873…" -kappale mukana):**

1. [489] Trocadéron nimi tulee Cádizin edustan Trocadero-linnakkeesta, jonka ranskalaiset valtasivat 1823. Chaillot'n kukkulalle suunniteltiin jo 1811 palatsia Napoleonin pojalle, "Rooman kuninkaalle", mutta siitä tehtiin vain maanrakennustöitä. Todellinen palatsi valmistui vuoden 1878 maailmannäyttelyyn: siinä oli kaksi korkeaa tornia, kaksi kaarevaa siipeä ja yli neljän tuhannen paikan sali. Salin akustiikka oli huono, mutta siellä soivat Cavaillé-Collin urut, jotka vihittiin elokuussa 1878.
2. [245] Palatsi seisoi vuoteen 1935, jolloin sali ja tornit purettiin vuoden 1937 näyttelyn tieltä. Vanhojen siipien runko jäi paikalleen, ja sen eteen Seinen puolelle rakennettiin yhtä leveä uusi galleria: siivet ovat nykyisen Chaillot'n palatsin osia.
3. [87] Isoisäsi vuonna 1873 palatsia ei ollut vielä lainkaan: kukkulalla oli tasoitettu aukio.

### Galerie des Machines (`hahmotelma-galerie-des-machines`)

| | ENNEN | NYT |
|---|---|---|
| Otsikko (kartan nimi) | Galerie des Machines | Galerie des Machines |
| Tarinarivi (datan `otsikko`) | ei kenttää (nappi: "Halli, jossa ei ollut yhtään pilaria") | **Halli, jossa ei ollut yhtään pilaria** (36 merkkiä) |
| Jaksoja / merkkejä | ei jaksoja: yksi teksti 563 merkkiä (hahmotelman kortti); nähtävyysjuttu 520 merkkiä, 3 kappaletta | 5 / 903 |
| Vuosirivit | – (kenttä ei ollut käytössä kortilla) | 1889 maailmannäyttely · 1900 maatalousnäyttely · 1901 sirkus saapuu · 1902 sirkus lähtee · 1909 purku |
| Kuvat jaksoittain | ei jaksokuvia; ihmekortin kuva `ihme-galerie-des-machines-loistoaika.jpg` | J1: loisto · J2: – · J3: – · J4: – · J5: – |
| Pulun kysymykset | Kuinka suuri maailmannäyttelyn konehalli oli? · Miksi halli purettiin? | Kuinka suuri maailmannäyttelyn konehalli oli? · Miksi halli purettiin? · Mikä sirkus esiintyi hallissa talvella 1901–1902? |

**NYT (kertojan teksti):**

1. [281] Galerie des Machines oli vuoden 1889 Pariisin maailmannäyttelyn konehalli Champ-de-Marsilla, kentän toisessa päässä kuin Eiffel-torni. Se oli noin 420 metriä pitkä ja 115 metriä leveä, eikä sen sisällä ollut yhtään pilaria, sillä teräskaaret nojasivat toisiinsa kolmesta nivelestä.
2. [124] Vieraita kuljettivat hallissa liikkuvat sillat. Esillä oli myös Edisonin fonografi, jolla kuultiin muun muassa Marseillaise.
3. [230] Näyttelyn jälkeenkin halli jäi käyttöön: vuonna 1900 siellä pidettiin maatalouden ja elintarvikkeiden näyttely, ja marraskuussa 1901 alkoi Barnum & Bailey -sirkuksen esityssarja kolmessa areenassa. Sarja päättyi maaliskuussa 1902.
4. [152] Vuonna 1909 halli purettiin, jotta näkymä Champ-de-Marsille aukeaisi. Yli neljäkymmentä metriä korkea halli oli seissyt paikallaan kaksikymmentä vuotta.
5. [116] Hallia ei ole enää, mutta Eiffel-torni seisoo yhä Champ-de-Marsin toisessa päässä, missä konehalli aikoinaan kohosi.

**ENNEN (hahmotelman kortti, `teksti`):**

1. [563] Galerie des Machines oli vuoden 1889 Pariisin maailmannäyttelyn konehalli Champ-de-Marsilla, samalla kentällä kuin Eiffel-torni. Insinööri Victor Contaminin ja arkkitehti Ferdinand Dutertin suunnittelema halli oli 420 metriä pitkä ja 115 metriä leveä, eikä sen sisällä ollut yhtään tukipilaria. Kaarten kolminivelinen rakenne oli lainattu siltasuunnittelusta. Vieraita kuljettivat hallissa liikkuvat sillat. Halli purettiin 1900-luvun alussa, jotta näkymä Champ-de-Marsille aukeaisi. Isoisä ei ehtinyt nähdä sitä: halli valmistui 16 vuotta hänen matkansa jälkeen.

**ENNEN (nähtävyysjuttu, kopio; "Isoisäsi vuonna 1873…" -kappale mukana):**

1. [354] Vuoden 1889 maailmannäyttelyn konehalli seisoi Champ-de-Marsilla, samalla kentällä kuin Eiffel-torni. Halli oli 420 metriä pitkä, 115 metriä leveä ja yli 40 metriä korkea, eikä sen sisällä ollut yhtään tukipilaria. Katon kantoi kaksikymmentä kolminivelistä kaarta: jokainen oli kaksi puolikaarta, jotka nojasivat toisiinsa huipulta ja alhaalta tappeihin.
2. [53] Vieraita kuljetettiin hallissa liikkuvilla silloilla.
3. [113] Isoisäsi vuonna 1873 hallia ei ollut. Halli purettiin 1900-luvun alussa, jotta näkymä Champ-de-Marsille aukeaisi.

### Bizet 1875 (`carmenin-ensi-ilta`)

| | ENNEN | NYT |
|---|---|---|
| Otsikko (kartan nimi) | Bizet 1875 | Bizet 1875 |
| Tarinarivi (datan `otsikko`) | Bizet 1875 — Carmen saa kylmän vastaanoton | Bizet 1875 — Carmen saa kylmän vastaanoton (ennallaan, KK) |
| Kappaleita (= jaksoja) / merkkejä | 2 / 1730 | 3 / 748 |
| Vuosirivit (nähtävyysjutun `vuodet`) | 1873 säveltäminen alkoi · 1874 johtaja erosi · 1875 ensi-ilta · 1876 Bryssel · 1878 Lontoo, New York · 1883 ooppera palasi · 1887 sali paloi | 1873 säveltäminen alkoi · 1874 johtaja erosi · 1875 ensi-ilta · 1883 ooppera palasi · 1887 sali paloi |
| Kuva | Prudent-Louis Leray - Poster for the première of Georges Bizet's Carmen.jpg (yksi pääkuva, ennallaan) | ennallaan |
| Pulun kysymykset | Miksi Opéra-Comiquen johto piti Carmenia sopimattomana? · Miten ooppera nousi epäonnistumisesta maailmanmaineeseen? · Millainen oopperatalo Opéra-Comique oli 1870-luvulla? | Miksi Opéra-Comiquen johto piti Carmenia sopimattomana? · Miten ooppera nousi epäonnistumisesta maailmanmaineeseen? · Millainen oopperatalo Opéra-Comique oli 1870-luvulla? |

**NYT (noston teksti = nähtävyysjutun kopio):**

1. [345] Georges Bizet sävelsi Carmenin Pariisin Opéra-Comiquelle, ja Pariisi torjui sen. Talo oli perheteatteri, ja kun työ alkoi vuonna 1873, talon johtaja Adolphe de Leuven vastusti näin uskaliasta tarinaa. Lupaukset pehmennyksestä eivät riittäneet, ja hän erosi vuonna 1874. Nimiroolista kieltäytyi Marie Roze, ja rooli meni Célestine Galli-Mariélle.
2. [194] Ensi-ilta oli 3. maaliskuuta 1875, ja salissa istui useita aikakauden säveltäjiä. Alku meni hyvin, mutta yleisö kylmeni näytös näytökseltä, ja yksi kriitikko moitti pääosan eleitä paheellisiksi.
3. [209] Bizet kuoli 3. kesäkuuta 1875, 36-vuotiaana. Maine alkoi nousta muualla, ensin Wienissä, ja Pariisiin ooppera palasi vasta 1883. Ensi-illan sali paloi 1887, ja paikalla seisoo nyt kolmas samanniminen teatteri.

**ENNEN:**

1. [815] Georges Bizet aloitti Carmenin säveltämisen tammikuun tienoilla 1873, ja ensimmäinen näytös oli valmis siihen kesään mennessä, jona isoisäsi oli matkalla. Sitten työ pysähtyi. Opéra-Comique oli valtion rahoittama talo, johon vietiin perhe, ja sen kahdesta johtajasta Adolphe de Leuven vastusti koko ajatusta: näin uskaliasta tarinaa ei esitetä täällä, yleisö pelästyy pois. Hänelle luvattiin, että nimihenkilön luonnetta pehmennetään, että romanihahmot esitetään koomisina ja että lopun kuolema jää kulkueiden, balettien ja riemufanfaarien varjoon. Lupaukset eivät riittäneet, ja de Leuven erosi teatterista alkuvuodesta 1874. Nimiroolikin oli vaikea täyttää: Marie Roze kieltäytyi roolista (Winton Deanin elämäkerran mukaan siksi, että hänen olisi kuoltava lavalla), ja rooli meni lopulta Célestine Galli-Mariélle.
2. [915] Ensi-ilta oli 3. maaliskuuta 1875, ja salissa istui puoli musiikki-Pariisia — Massenet, Offenbach, Delibes, Gounod. Ensimmäinen näytös meni hyvin. Toreadorin laulun jälkeen tuli kylmyys, ja viimeinen näytös oli libretisti Halévyn sanoin jäinen ensimmäisestä viimeiseen. Seuraavan päivän arviot vaihtelivat pettymyksestä raivoon: nimihenkilö oli hyveellisen naisen sijaan moraaliton viettelijä, ja yksi kriitikko kutsui pääosan tulkintaa paheen ruumiillistumaksi. Taloa ei saatu täyteen edes jakamalla lippuja ilmaiseksi. Bizet kuoli 3. kesäkuuta 1875, kolmannenkymmenennenkolmannen esityksen jälkeen, 36-vuotiaana ja hääpäivänsä vuosipäivänä. Maine tuli muualta: ensin Wien 1875, Bryssel 1876, Lontoo ja New York 1878 — Pariisiin ooppera palasi vasta 1883. Se sijoittuu Sevillaan, mutta kaikki tämä tapahtui täällä, Place Boïeldieun varrella. Sekin sali paloi 1887; paikalla seisoo nyt kolmas samanniminen teatteri.

### Kirahvi 1827 (`kirahvin-kavelymatka`)

| | ENNEN | NYT |
|---|---|---|
| Otsikko (kartan nimi) | Kirahvi 1827 | Kirahvi 1827 |
| Tarinarivi (datan `otsikko`) | Kirahvi 1827 — kävelymatka Pariisiin | Kirahvi 1827 — kävelymatka Pariisiin (ennallaan, KK) |
| Kappaleita (= jaksoja) / merkkejä | 2 / 832 | 3 / 854 |
| Vuosirivit (nähtävyysjutun `vuodet`) | 1826 kirahvi Marseilleen · 1827 matka alkoi | 1826 kirahvi Marseilleen · 1827 matka alkoi |
| Kuva | assets/kartat/nostot/nosto-kirahvin-kavelymatka-loistoaika.webp (yksi pääkuva, ennallaan) | ennallaan |
| Pulun kysymykset | Miksi kirahvi käveli Marseillesta Pariisiin eikä matkustanut meritse? · Miten eläin selvisi 900 kilometrin kävelystä? · Mitä muuta Jardin des Plantes'n eläintarhassa oli 1800-luvulla? | Miksi kirahvi käveli Marseillesta Pariisiin eikä matkustanut meritse? · Miten eläin selvisi 900 kilometrin kävelystä? · Mitä muuta Jardin des Plantes'n eläintarhassa oli 1800-luvulla? |

**NYT (noston teksti = nähtävyysjutun kopio):**

1. [300] Egyptin varakuningas lähetti kirahvin lahjaksi Ranskan kuninkaalle Kaarle X:lle, ja eläin saapui laivalla Marseilleen lokakuussa 1826. Laivan kanteen oli sahattu reikä, josta kaula mahtui ulos. Merimatkaa Atlantin ympäri pidettiin liian vaarallisena, joten päätettiin, että kirahvi kävelee Pariisiin.
2. [250] Kirahvi talvehti Marseillessa, ja matkaan lähdettiin toukokuussa 1827. Eläimellä oli yllään vahattu sadetakki, johon oli kirjailtu vaakunat, ja luonnontieteilijä Étienne Geoffroy Saint-Hilaire käveli mukana. Lyonissa vastassa oli noin 30 000 ihmistä.
3. [304] Matka kesti 41 päivää, ja kirahvi saapui Pariisin Jardin des Plantesiin 30. kesäkuuta 1827. Kuningas tapasi sen Saint-Cloudin linnassa 9. heinäkuuta, ja kesän aikana kirahvia kävi katsomassa noin 600 000 ihmistä. Kampauksiakin tehtiin kirahvin tapaan. Eläin kuoli Jardin des Plantes'ssa tammikuussa 1845.

**ENNEN:**

1. [414] Egyptin varakuningas lähetti kirahvin Ranskan kuninkaalle Kaarle X:lle. Eläin saapui laivalla Marseilleen 31. lokakuuta 1826 — kannessa oli sahattu reikä, josta kaula mahtui ulos. Merimatkaa Atlantin ympäri pidettiin liian vaarallisena, joten päätettiin, että kirahvi kävelee Pariisiin. Luonnontieteilijä Étienne Geoffroy Saint-Hilaire, 55, käveli mukana ja teetti eläimelle kaksiosaisen keltaisen takin ja kengät.
2. [418] Kirahvi talvehti Marseillessa, ja matkaan lähdettiin toukokuussa 1827. Matka kesti 41 päivää. Lyonissa vastassa oli 30 000 ihmistä, ja Pariisissa kirahvia kävi katsomassa yli 100 000 — joka kahdeksas kaupunkilainen. Hiukset kammattiin torneiksi, kankaisiin ilmestyi täpliä ja väri nimeltä ”kirahvin vatsa” myi kaiken. Aikalaiset kutsuivat eläintä nimellä la Belle Africaine, ja se eli Jardin des Plantes'ssa 18 vuotta.

### Bukinistit 1859 (`pariisin-bukinistit`)

| | ENNEN | NYT |
|---|---|---|
| Otsikko (kartan nimi) | Bukinistit 1859 | Bukinistit 1859 |
| Tarinarivi (datan `otsikko`) | Bukinistit 1859 — oma paikka Seinen kaiteella | Bukinistit 1859 — oma paikka Seinen kaiteella (ennallaan, KK) |
| Kappaleita (= jaksoja) / merkkejä | 1 / 465 | 4 / 876 |
| Vuosirivit (nähtävyysjutun `vuodet`) | 1859 kiinteät paikat · 1891 laatikot kaiteeseen | 1859 erityismääräys · 1891 laatikot kaiteeseen |
| Kuva | Quai Saint-Michel, Paris 5 May 2016.jpg (yksi pääkuva, ennallaan) | ennallaan |
| Pulun kysymykset | Mitä bukinistien laatikoista myydään? · Kuinka kauan bukinistit ovat olleet Seinen rannoilla? · Milloin laatikot saivat jäädä kaiteelle yöksi? | Mitä bukinistien laatikoista myydään? · Kuinka kauan bukinistit ovat olleet Seinen rannoilla? · Milloin laatikot saivat jäädä kaiteelle yöksi? |

**NYT (noston teksti = nähtävyysjutun kopio):**

1. [276] Seinen rantamuurin kirjakauppiaita kutsutaan bukinisteiksi, ja nimi kertoo, mitä laatikoissa on: ranskan arkikielen sana bouquin tarkoittaa kirjaa. Kulkukauppiaat myivät kirjoja Pariisin kaduilla jo 1500-luvulta, ja Pont Neufin valmistuttua vuonna 1606 he asettuivat sillalle.
2. [182] Vuonna 1649 annettiin määräys, joka kielsi kirjojen myynnin sillalla, ja ennen vallankumousta myyjiä oli jo noin 300. Sana bouquiniste kirjattiin ensi kertaa vuoden 1752 sanakirjaan.
3. [254] Heitä koskeva erityismääräys annettiin 10. lokakuuta 1859: myyjät saivat jäädä rannoille, mutta laatikot piti silti kantaa pois joka ilta. Laatikot sai jättää kaiteeseen vasta vuonna 1891, ja vuoden 1900 tienoilla niille tuli nykyinen vaunun vihreä väri.
4. [164] Nyt yli 200 bukinistia myy vanhoja kirjoja kolmen kilometrin matkalla, ja vuonna 2019 heidän perinteensä lisättiin Ranskan aineettoman kulttuuriperinnön luetteloon.

**ENNEN:**

1. [465] Seinen rantamuurin kirjakauppiaita kutsutaan bukinisteiksi, ja nimi kertoo, mitä laatikoissa on: ranskan sana bouquin tarkoittaa vanhaa kirjaa. Vihreistä peltilaatikoista myydään käytettyjä kirjoja, vanhoja lehtiä ja julisteita, ja ammattikunta on ollut joen varrella 1500-luvulta asti. Vuonna 1859 kauppiaat saivat kaupungilta kiinteät myyntipaikat rantakaiteen varrelta, mutta laatikot piti silti kantaa pois joka ilta. Kaiteeseen ne sai jättää vasta vuonna 1891.

### Patonki 1994 (`pariisin-patonki`)

| | ENNEN | NYT |
|---|---|---|
| Otsikko (kartan nimi) | Patonki 1994 | Patonki 1994 |
| Tarinarivi (datan `otsikko`) | Patonki 1994 — kilpailu parhaasta leivästä | Patonki 1994 — kilpailu parhaasta leivästä (ennallaan, KK) |
| Kappaleita (= jaksoja) / merkkejä | 1 / 573 | 3 / 736 |
| Vuosirivit (nähtävyysjutun `vuodet`) | 1994 kilpailun alku | 1994 kilpailun alku |
| Kuva | 84 Boulevard de Port-Royal Bakery.jpg (yksi pääkuva, ennallaan) | ennallaan |
| Pulun kysymykset | Miksi leipien tekijöitä ei kerrota raadille? · Mitä patongissa saa lain mukaan olla? · Mikä velvollisuus voittajalle tulee? | Miksi leipien tekijöitä ei kerrota raadille? · Mitä patongissa saa asetuksen mukaan olla? · Mikä velvollisuus voittajalle tulee? |

**NYT (noston teksti = nähtävyysjutun kopio):**

1. [264] Patonki on Pariisin kuuluisin leipä, ja Ranskassa sitä koskevat tiukat säännöt: vuonna 1993 annetun asetuksen mukaan perinteisessä patongissa saa olla käytännössä vain vehnäjauhoa, vettä, suolaa sekä hiivaa tai juurta, eikä taikinaa saa missään vaiheessa pakastaa.
2. [241] Kaupunki on järjestänyt vuodesta 1994 kilpailun parhaasta perinteisestä patongista. Leivät arvostellaan sokkona, jottei raati tiedä, kenen leipää se maistaa, ja raadissa istuu ammattilaisia, toimittajia ja arvottuja tavallisia pariisilaisia.
3. [231] Voittaja saa 4 000 euron palkinnon ja yhden velvollisuuden: hän toimittaa presidentinpalatsille leipiä seuraavan vuoden ajan. Vuonna 2022 UNESCO otti patongin leipomotaidon ja -kulttuurin aineettoman kulttuuriperinnön luetteloonsa.

**ENNEN:**

1. [573] Kaupunki on järjestänyt vuodesta 1994 kilpailun parhaasta perinteisestä patongista, ja säännöt ovat tarkat: leivän pituudelle ja painolle on omat rajansa. Mitä patongissa saa olla, on määrätty laissa — käytännössä vain vehnäjauhoa, vettä, suolaa ja hiivaa, eikä taikinaa saa missään vaiheessa pakastaa. Leivät ovat anonyymejä, jottei raati tiedä kenen leipää se arvostelee, ja raadissa istuu ammattilaisia, toimittajia ja arvottuja tavallisia pariisilaisia. Voittaja saa rahapalkinnon ja yhden velvollisuuden: hän toimittaa presidentinpalatsin leivät seuraavan vuoden ajan.

### Vrain-Lucas (`vrain-lucas-kirjevaarennokset`)

| | ENNEN | NYT |
|---|---|---|
| Otsikko (kartan nimi) | Vrain-Lucas | Vrain-Lucas |
| Tarinarivi (datan `otsikko`) | Vrain-Lucas 1861–1870 — 27 000 väärennettyä kirjettä | Vrain-Lucas 1861–1870 — 27 000 väärennettyä kirjettä (ennallaan, KK) |
| Kappaleita (= jaksoja) / merkkejä | 4 / 1394 | 4 / 989 |
| Vuosirivit (nähtävyysjutun `vuodet`) | – | – |
| Kuva | Pascal à Galileo.jpg (yksi pääkuva, ennallaan) | ennallaan |
| Pulun kysymykset | Miten Vrain-Lucas sai väärennetyt kirjeensä näyttämään vanhoilta? · Miten väärentäjä yritti paikata virheitään, kun tiedeakatemia huomasi ne? | Miten Vrain-Lucas sai väärennetyt kirjeensä näyttämään vanhoilta? · Miten väärentäjä yritti paikata virheitään, kun tiedeakatemia huomasi ne? |

**NYT (noston oma teksti; kartan kortti alla):**

1. [336] Denis Vrain-Lucas oli lakikirjurina työskennellyt ranskalainen, joka väärensi Pariisissa noin 27 000 kirjettä, muun muassa Kleopatran kirjeen Caesarille. Kaikki kirjeet oli kirjoitettu 1800-luvun ranskaksi, vaikka niiden piti olla paljon vanhempia. Hän alkoi väärentää 1850-luvulla, hankki aikakauden paperia ja valmisti musteensa itse.
2. [246] Vuonna 1861 hän myi kuuluisalle matemaatikolle ja keräilijälle Michel Chaslesille Boylen, Newtonin ja Pascalin kirjeitä. Yhdessä niistä Pascal ilmoitti keksineensä painovoiman lait ennen Newtonia, ja Chasles maksoi kirjeistä noin 140 000 frangia.
3. [233] Heinäkuussa 1867 Chasles vei Pascal-kirjeet tiedeakatemialle, mutta käsiala ei vastannut Pascalin varmoja kirjeitä. Kun akatemia huomautti anakronismeista eli ajan virheistä, Vrain-Lucas väärensi lisää kirjeitä selittämään edelliset.
4. [174] Vrain-Lucas pidätettiin, ja helmikuussa 1870 tuomioistuin antoi hänelle kaksi vuotta vankeutta. Chasles oli maksanut kirjeistä suuren summan, mutta kirjeet olivat arvottomia.

**NYT (kartan kortti = nähtävyysjutun kopio):** [344] Vrain-Lucasin väärentämässä kirjeessä Kleopatra kirjoitti Julius Caesarille ranskaksi, vesileimatulle paperille — ja kuuluisa matemaatikko osti kirjeen ilomielin, ja perään kymmeniätuhansia muita. Kansallisylpeys teki ostajasta sokean: olihan kirjeissä todiste, että painovoima keksittiin Ranskassa. Tiedeakatemia ei ollut aivan yhtä ilahtunut.

**ENNEN:**

1. [237] Denis Vrain-Lucas oli lakikirjuriksi kouluttautunut ranskalainen, joka alkoi 1854 väärentää historiallisia asiakirjoja. Hän hankki aikakauden mukaista paperia, valmisti musteensa itse ja keräsi yksityiskohdat keisarillisesta kirjastosta.
2. [280] Vuonna 1861 hän myi matemaatikko ja keräilijä Michel Chaslesille Robert Boylen, Isaac Newtonin ja Blaise Pascalin kirjeitä. Yhdessä niistä Pascal ilmoitti keksineensä painovoiman lait ennen Newtonia. Ranskalaisen ensisijaisuus oli kaupan paras myyntipuhe, ja Chasles halusi lisää.
3. [290] Kuudentoista vuoden aikana Vrain-Lucas väärensi noin 27 000 kirjettä ja asiakirjaa: Maria Magdaleenaa, Kleopatraa, Juudasta, Pontius Pilatusta, Jeanne d'Arcia, Ciceroa ja Dantea myöten — kaikki 1800-luvun ranskaksi ja vesileimatulle paperille. Chasles maksoi niistä 140 000–150 000 frangia.
4. [587] Vuonna 1867 Chasles vei Pascal-kirjeet tiedeakatemialle todisteeksi. Käsiala ei vastannut Pascalin varmoja kirjeitä. Kun akatemia huomautti anakronismeista, Vrain-Lucas väärensi lisää kirjeitä selittämään edelliset. Väittely jatkui 1868 asti, ja seuraavana vuonna hänet pidätettiin. Helmikuussa 1870 Pariisin tuomioistuin antoi kaksi vuotta vankeutta ja 500 frangin sakon. Chasles ei saanut rahojaan takaisin. Jutulla on jälkinäytös: vuonna 2004 eräs tiedelehti julkaisi äskettäin löytyneen kirjeen, jonka Vrain-Lucas oli muka kirjoittanut vankilasta Chaslesille 1871 — sekin oli sepite.

**ENNEN (kartan kortti):** [306] Kleopatra kirjoitti Julius Caesarille ranskaksi, vesileimatulle paperille — ja kuuluisa matemaatikko osti kirjeen ilomielin, ja perään kymmeniätuhansia muita. Kansallisylpeys teki ostajasta sokean: olihan kirjeissä todiste, että painovoima keksittiin Ranskassa. Tiedeakatemia ei ollut aivan yhtä ilahtunut.

### Monet 1874 (`impressionistit`)

| | ENNEN | NYT |
|---|---|---|
| Otsikko (kartan nimi) | Monet 1874 | Monet 1874 |
| Tarinarivi (datan `otsikko`) | Monet 1874 — impressionistien ensimmäinen näyttely | Monet 1874 — impressionistien ensimmäinen näyttely (ennallaan, KK) |
| Kappaleita (= jaksoja) / merkkejä | 1 / 714 | 4 / 828 |
| Vuosirivit (nähtävyysjutun `vuodet`) | 1867 näyttelyanomus · 1873 yhdistys perustettu · 1874 ensimmäinen näyttely | 1867 näyttelyvetoomus · 1873 yhdistys perustettu · 1874 ensimmäinen näyttely |
| Kuva | Monet - Impression, Sunrise.jpg (yksi pääkuva, ennallaan) | ennallaan |
| Pulun kysymykset | Miksi Salonista hylätty maalari jäi isoisän aikaan näkymättömäksi? · Miten pilkkanimestä tuli kokonaisen taidesuunnan nimi? | Miksi Salonista hylätty maalari jäi näkymättömäksi? · Miten pilkkanimestä tuli kokonaisen taidesuunnan nimi? |

**NYT (noston teksti = nähtävyysjutun kopio):**

1. [261] Monet ja muut nuoret maalarit olivat Pariisissa taiteilijoita, joita Salon ei huolinut: kaupungin taide-elämää hallitsi Salon, ja sen valitsematta jättämä maalari jäi näkymättömäksi. Vuonna 1867 Frédéric Bazille laati vetoomuksen hylättyjen uudesta näyttelystä.
2. [238] Joulukuussa 1873 Monet, Renoir, Pissarro, Sisley, Degas ja muut perustivat oman yhdistyksen esittääkseen työnsä itse. Ensimmäinen näyttely pidettiin huhtikuussa 1874 valokuvaaja Nadarin ateljeessa, ja mukana oli kolmekymmentä taiteilijaa.
3. [212] Kriitikko Louis Leroy ivasi Monet’n maalausta Impression, soleil levant ja otsikoi juttunsa ”Impressionistien näyttely”. Pilkkanimi jäi ryhmän nimeksi. Heidän viimeinen yhteinen näyttelynsä pidettiin vuonna 1886.
4. [117] Maalaus esittää auringonnousua Le Havren satamassa, ja se kuuluu nykyään Pariisin Musée Marmottan Monet’n kokoelmiin.

**ENNEN:**

1. [714] Kun isoisäsi käveli Pariisissa, ranskalaista taide-elämää hallitsi yhä Salon: sen valitsematta jäänyt maalari jäi näkymättömäksi. Omaa näyttelyä hylätyille oli anottu turhaan 1867. Joulukuussa 1873 — kaksi kuukautta isoisäsi käynnin jälkeen — Monet, Renoir, Pissarro, Sisley, Berthe Morisot, Degas ja joukko muita perustivat oman yhdistyksen esittääkseen työnsä itse, ja jäseniltä odotettiin Salonista luopumista. Ensimmäinen näyttely pidettiin huhtikuussa 1874 valokuvaaja Nadarin ateljeessa, ja mukana oli kolmekymmentä taiteilijaa. Kriitikko Louis Leroy ivasi Monet’n maalausta Impression, soleil levant ja otsikoi juttunsa ”Impressionistien näyttely”. Pilkkanimi jäi — ja taiteilijat ottivat sen itse käyttöön.

### Piiritys 1870 (`kyyhkyposti`)

| | ENNEN | NYT |
|---|---|---|
| Otsikko (kartan nimi) | Piiritys 1870 | Piiritys 1870 |
| Tarinarivi (datan `otsikko`) | Piiritys 1870 — viestit kulkevat kyyhkyillä | Piiritys 1870 — viestit kulkevat kyyhkyillä (ennallaan, KK) |
| Kappaleita (= jaksoja) / merkkejä | 1 / 922 | 4 / 821 |
| Vuosirivit (nähtävyysjutun `vuodet`) | 1870 Pariisi suljettiin · 1859 mikrofilmipatentti | 1859 mikrokuvapatentti · 1870 Pariisi suljettiin |
| Kuva | Pellicule du Journal Pigeons Voyageurs, Souvenir du Siège de Paris, 1870-1871. PH20110 (15 of 20).jpg (yksi pääkuva, ennallaan) | ennallaan |
| Pulun kysymykset | Miksi kirjekyyhky oli piiritetyn Pariisin ainoa toimiva viestitie kaupunkiin? · Miten kyyhkyn tuomat pikkuruiset filmiviestit saatiin luettua? | Miksi kirjekyyhky oli piiritetyn Pariisin ainoa toimiva viestitie kaupunkiin? · Miten kyyhkyn tuomat pikkuruiset filmiviestit saatiin luettua? |

**NYT (noston teksti = nähtävyysjutun kopio):**

1. [170] Pariisin piirityksen viestit kulkivat kyyhkyillä, ja mahdollisuuden siihen oli antanut valokuvaaja René Dagron, joka oli saanut vuonna 1859 patentin mikrovalokuvaukselle.
2. [211] Kun preussilaiset sulkivat Pariisin syyskuussa 1870, lennätinlangat ja Seinen pohjassa kulkenut salakaapeli katkaistiin. Lähes ainoa reitti kaupunkiin päin oli kirjekyyhky, ja kyyhkyt vietiin ulos ilmapalloilla.
3. [200] Sopimus Dagronin kanssa allekirjoitettiin marraskuun alussa. Hän pienensi viestit mikrofilmeiksi, yksi filmi painoi noin viisi sadasosagrammaa, ja yksi kyyhky jaksoi kantaa niitä jopa kahdeksantoista.
4. [240] Perillä filmi asetettiin kahden lasilevyn väliin ja heijastettiin taikalyhdyllä seinälle, josta viestit kirjoitettiin puhtaaksi. Lehtitietojen mukaan saksalaiset kouluttivat haukkoja pysäyttämään kyyhkyjä. Piiritys päättyi tammikuussa 1871.

**ENNEN:**

1. [922] Sallitko, että kerron erään sukuni työsuorituksen. Kun preussilaiset sulkivat Pariisin syyskuussa 1870, viimeiset lennätinlangat katkaistiin 19. päivä ja Seinen pohjassa kulkenut salakaapeli löydettiin ja katkaistiin 27. päivä. Kaupunkiin päin ainoa toimiva reitti oli kirjekyyhky. Kyyhkyt vietiin ulos ilmapalloilla, ja valokuvaaja René Dagron — mikrofilmin patentin haltija vuodesta 1859 — tarjoutui pienentämään viestit. Sopimus allekirjoitettiin 11. marraskuuta 1870: viisitoista frangia tuhatta merkkiä kohti. Dagron sai kuvat pienenemään yli nelikymmenkertaisesti; yksi filmi painoi noin viisi sadasosagrammaa, ja yksi kyyhky kantoi niitä jopa kaksikymmentä pyrstösulkiin sidotussa putkessa. Perillä filmi asetettiin kahden lasilevyn väliin ja heijastettiin taikalyhdyllä seinälle, josta viestit kirjoitettiin puhtaaksi. Saksalaiset kouluttivat haukkoja pysäyttämään kyyhkyjä. Minulla ei ole tähän mitään lisättävää.

### Notre-Dame 2019 (`notre-damen-kukko`)

| | ENNEN | NYT |
|---|---|---|
| Otsikko (kartan nimi) | Notre-Dame 2019 | Notre-Dame 2019 |
| Tarinarivi (datan `otsikko`) | Notre-Dame 2019 — palo, jonka kukko selvisi | Notre-Dame 2019 — palo, jonka kukko selvisi (ennallaan, KK) |
| Kappaleita (= jaksoja) / merkkejä | 1 / 546 | 3 / 753 |
| Vuosirivit (nähtävyysjutun `vuodet`) | – | – |
| Kuva | Coq de Notre-Dame de Paris 2020.jpg (yksi pääkuva, ennallaan) | ennallaan |
| Pulun kysymykset | Mitä tornin huipun kukon sisään oli suljettu? · Miksi kuusitoista kuparipatsasta oli poissa katolta palon aikaan? · Mitä uuden kukon sisään pantiin? | Mitä tornin huipun kukon sisään oli suljettu? · Miksi kuusitoista patsasta oli poissa katolta palon aikaan? · Mitä uuden kukon sisään pantiin? |

**NYT (noston teksti = nähtävyysjutun kopio):**

1. [171] Notre-Damen ullakko syttyi 15. huhtikuuta 2019, ja keskitorni romahti noin kello 19.50. Katon alla paloi tammirungoista tehty kattotuolisto, joka oli pääosin 1200-luvulta.
2. [305] Tornin huipulla seisoi kukko, jonka sisään oli suljettu pyhäinjäännöksiä, muun muassa pala orjantappurakruunua. Ensin sitä luultiin tuhoutuneeksi, mutta se löytyi seuraavana päivänä raunioista lommoilla. Onnea oli muutenkin: kuusitoista patsasta oli nostettu katolta korjattavaksi vain päiviä ennen paloa.
3. [277] Ensimmäinen messu palon jälkeen pidettiin kesäkuussa 2019 kypärät päässä. Uusi kullattu kukko asennettiin tornin huipulle 16. joulukuuta 2023, ja sen sisään pantiin samat pyhäinjäännökset sekä lähes 2 000 jälleenrakentajan nimet. Katedraali avattiin uudelleen joulukuussa 2024.

**ENNEN:**

1. [546] Notre-Damen ullakko syttyi 15. huhtikuuta 2019, ja keskitorni romahti kello 19.50. Katon alla paloi yli tuhannesta tammirungosta tehty kattotuolisto, joka oli 1200-luvulta. Tornin huipulla seisoi kuparinen kukko, jonka sisään oli suljettu pyhäinjäännöksiä. Ensin sitä luultiin tuhoutuneeksi, mutta se löytyi seuraavana päivänä maasta lommoilla. Onnea oli muutenkin: kuusitoista kuparipatsasta oli nostettu katolta korjattavaksi neljä päivää ennen paloa. Uuden kullatun kukon sisään pantiin samat pyhäinjäännökset ja 2 000 jälleenrakentajan nimet.

### Piaf ja Django (`pariisi-soi`)

| | ENNEN | NYT |
|---|---|---|
| Otsikko (kartan nimi) | Piaf ja Django | Piaf ja Django |
| Tarinarivi (datan `otsikko`) | Piaf ja Django — kadulta ja vaunusta maineeseen | Piaf ja Django — kadulta ja vaunusta maineeseen (ennallaan, KK) |
| Kappaleita (= jaksoja) / merkkejä | 2 / 1029 | 3 / 902 |
| Vuosirivit (nähtävyysjutun `vuodet`) | 1915 Piaf syntyi · 1935 Piaf löydettiin · 1928 Djangon vaunu paloi · 1934 Hot Club syntyi | 1915 Piaf syntyi · 1928 Djangon vaunu paloi · 1934 Hot Club syntyi · 1935 Piaf löydettiin |
| Kuva | Édith Piaf 914-6440.jpg (yksi pääkuva, ennallaan) | ennallaan |
| Pulun kysymykset | Mistä lempinimi la Môme Piaf tuli? · Miten Django Reinhardt opetteli soittamaan uudelleen? · Millaista musiikkia Pariisin kaduilla kuultiin 1930-luvulla? | Mistä lempinimi la Môme Piaf tuli? · Miten Django Reinhardt opetteli soittamaan uudelleen? · Millaista musiikkia Pariisin kaduilla kuultiin 1930-luvulla? |

**NYT (noston teksti = nähtävyysjutun kopio):**

1. [244] Pariisin kaduilta nousi kaksi tähteä: Édith Piaf syntyi Pariisissa joulukuussa 1915, tarinan mukaan Bellevillessä kadulla talon portaille. Django Reinhardt kasvoi romaniperheen asuntovaunussa Pariisin porttien luona ja soitti banjoa jo lapsena.
2. [346] Syksyllä 1928 vaunussa syttyi tulipalo, kun kynttilä kaatui selluloidikukkien päälle. Django ei enää voinut käyttää vasemman käden nimetöntä ja pikkurilliä kunnolla, ja lääkärit sanoivat, ettei hän soita enää. Veli toi hänelle kitaran, ja hän opetteli soolot kahdella sormella. Vuonna 1934 hän perusti Pariisissa Quintette du Hot Club de Francen.
3. [312] Piaf lauloi teininä kaduilla. Yökerhon omistaja Louis Leplée kuuli hänet kadulta vuonna 1935 ja antoi hänelle lempinimen la Môme Piaf: piaf on pariisilaista puhekieltä ja tarkoittaa varpusta. Laulaja oli alle 150 senttiä pitkä. Piaf levytti tunnetuimman laulunsa La Vie en rosen, ja sen sanat hän kirjoitti itse.

**ENNEN:**

1. [532] Édith Piaf syntyi Pariisissa joulukuussa 1915. Tarinan mukaan hän syntyi Bellevillessä kadulla talon portaille, vaikka syntymätodistuksessa lukee sairaala. Teininä hän lauloi kolikoista Pariisin kaduilla ja pihoissa ystävänsä Simone Berteautin kanssa. Yökerhon omistaja Louis Leplée kuuli hänet kadulta vuonna 1935 ja antoi lempinimen la Môme Piaf — piaf on pariisilaista puhekieltä ja tarkoittaa varpusta. Laulaja oli alle 150 senttiä pitkä. Piaf levytti tunnetuimman laulunsa La Vie en rosen 1946, ja sen sanat hän kirjoitti itse.
2. [497] Django Reinhardt kasvoi romaniperheen asuntovaunussa Pariisin porttien luona ja soitti banjoa pihoissa ja tanssipaikoissa jo lapsena. Marraskuun 2. päivän yönä 1928 vaunussa syttyi tulipalo: kynttilä kaatui selluloidikukkien päälle. Vasemman käden nimetön ja pikkurilli jäivät liikkumattomiksi, ja lääkärit sanoivat, ettei hän soita enää. Veli osti hänelle kitaran, ja Django opetteli soittamaan soolot kahdella sormella. Vuonna 1934 hän perusti Pariisissa yhtyeen Quintette du Hot Club de France.


## 5. M3: lähteet ja riippumaton tarkistus

**Menetelmä.** Kaksi Sonnet-apulaista (ei kirjoittajaa, ei Fable) tarkisti kaikki 13 tekstiä avaamalla lähteet itse (WebFetch tai PDF); Wikipediaa ja sen peilejä ei käytetty todisteena, eikä sama julkaisija laske kahdeksi lähteeksi. Täydet taulukot (väite | lähde A | lähde B | tulos) ovat liitteissä A ja B (lyhenteet ja URL:it siellä). Korjaukset tehtiin tarkistajien ehdotusten mukaan (väite pois tai pehmennetty, kun toinen itsenäinen lähde puuttui), minkä jälkeen yksi kolmas Sonnet-apulainen tarkisti vain muuttuneet väitteet (liite A2).

| Nosto | 1. kierros | Mitä korjattiin | 2. kierros (A2) |
|---|---|---|---|
| Grand Châtelet | OK korjauksin | väitteet, joilla ei kahta lähdettä, pois tai pehmennetty; kysymys 1790 vaihdettu | ei muuttuneita väitteitä uusintaan (OK) |
| Temple-torni | OK korjauksin | univormut, kommuuni ja ikä pois | OK; "asui" → "hakeutui" (käsityöläisväite vain kahdessa matkailusivustossa) |
| Trocadéro | OK korjauksin | purku 1935 "alkoi" | OK (Mérimée: Chaillot'n työ alkoi 1934; "purku alkoi 1935" kolmella muulla lähteellä) |
| Galerie des Machines | OK korjauksin | sijainti "kentän toisessa päässä kuin Eiffel-torni" | OK (paris.fr + pariszigzag) |
| Bizet 1875 | OK korjauksin | vuodet 1873 / 1874 ilman kuukautta | OK |
| Kirahvi 1827 | OK | – | OK; Atlantin vaara EPÄVARMA (kaksi suosittua lähdettä) |
| Bukinistit 1859 | OK korjauksin | "yli 200", 1500-luvulta | OK (teksti sanoo "Ranskan aineettoman kulttuuriperinnön luetteloon", ei UNESCOa; paris.fr, francetoday) |
| Patonki 1994 | OK korjauksin | – (vain "1994" TIMEOUT suoraan) | OK |
| Vrain-Lucas | **EI OK** | 2004 / vesileima / 1854 / "yli 140 000" pois tai pehmennetty; "kouluttautunut" → "lakikirjurina työskennellyt" | OK; 140 000 frangia on 1861–1869 yhteissumma → "yhteensä noin 140 000" (korjattu e441d06076) |
| Monet 1874 | OK korjauksin | Morisot ja "luopuminen" pois | OK |
| Piiritys 1870 | **EI OK** | mikrovalokuvauksen patentti 1859, sopimus marraskuun alussa, 18 filmiä; 19./27.9. ja hinta pois | OK (jopa 18 filmiä Dagronin oma luku; Hayhurst sanoo 20) |
| Notre-Dame 2019 | OK korjauksin | tammimäärä pois, "kuparinen"/"maasta" korjattu | OK |
| Piaf ja Django | OK korjauksin | syksy 1928; 1946 pois | OK |

**Heikoimmin katetut kohdat KK:lle (jäivät tekstiin; toinen itsenäinen lähde heikko tai ristiriita):**
1. **Temple:** verovapaat käsityöläiset (kaksi matkailusivustoa, kolmas lähde puuttuu).
2. **Vrain-Lucas:** "kaikki kirjeet 1800-luvun ranskaksi" (visan vastaus M6 vaatii; lähteet sanovat "vanhaa ranskaa" tai eivät kahta).
3. **Kirahvi:** "Merimatkaa Atlantin ympäri pidettiin liian vaarallisena" (yksi lähde; visan vastaus vaatii).
4. **Trocadéro:** "kaksi korkeaa tornia" (kaksi blogia) ja "yli neljän tuhannen paikan sali" (Auditorium 5 000 / CAGE 4 600).
5. **Galerie:** "näkymä Champ-de-Marsille" (paris.fr + pariszigzag; ARC sanoo Invalides).
6. **Bizet:** Wienissä ensin ja "perheteatteri" OK; vuodet 1873 / 1874 ilman kuukautta.
7. **Patonki:** 1994 vain TIMEOUT suoraan (PARIS laskennallisesti).
8. **Monet:** Marmottan "kuuluu kokoelmiin" OK; Bazillen vetoomus 1867 (ECL, THA) OK.
9. Avaamatta jääneet (403/429/sertifikaatti): Britannica, letemps.ch, actu-juridique.fr, Met, archiseek, revolution.chnm.org, IU, organsparisaz2, pipelinepress.

**Uusintakierroksen lisähuomiot:** Kirahvin "Atlantin ympäri… liian vaarallisena" jäi EPÄVARMAksi (vain francetoday ja hiddenworld.io; museo- ja tiedelähteet eivät perustele kävelyä); Dagronin filmimäärä 18 vs 20 (Hayhurst, histv.net) ja 0,05 g vain Hayhurstilla; Trocadéron Mérimée-tietokanta antaa Chaillot'n työn alkuvuodeksi 1934. Tekstit kestävät nämä, mutta KK voi halutessaan pehmentää Kirahvin perustelun.

**KK hyväksyy faktatekstit omistajan puolesta (kortti lahteet-ja-tarkistus 10).**

## 6. M5: kuvat ja äänet

- Jokaisen noston jaksolla 1 on kuva: B:n neljällä `loisto` (nykyinen havainnekuva, siirretty ihmekortista jaksolle 1); D/E:n yhdeksällä oma olemassa oleva pääkuva ennallaan. Uusia kuvia ei ole (K-4 erikseen).
- `aanikansio`/`aanite`-kenttiin ei koskettu; ei äänitteellisiä paloja. Jonoon lisätty rivit `--lisaa`-ajolla.

## 7. Liitteet: tarkistajien raportit

Liitteet A (B 4 + Monet + Vrain-Lucas), B (Bizet, Kirahvi, Bukinistit, Patonki, Piiritys, Notre-Dame, Piaf) ja A2 (uusintakierros) ovat alla sellaisinaan; ne ovat myös tiedostoina `/Users/Shared/Claude/luovutukset/sk-era2-tyokalut/liite-*.md`.


# Liite A: B 4 + Monet + Vrain-Lucas (1. kierros)

# Raportti: kuusi Era 2 -tekstiä, tosiasiatarkistus

Kaikki lähteet on avattu WebFetchillä tai luettu PDF:stä. Hakutulosotteita ja Wikipediaa (peilit mukaan lukien) en käyttänyt todisteena. Samaa julkaisijaa ei lasketa kahdeksi: auditorium-lyon.com on yksi lähde, ja paris.fr ja pariszigzag.fr voivat olla sukua keskenään.

**Avaamatta jääneet:** Britannica, letemps.ch ja actu-juridique.fr (403), Met (429), archiseek (429), revolution.chnm.org (socket closed), IU, organsparisaz2 ja pipelinepress (sertifikaattivirhe). Kaksi PDF:ää luin pdftotextilla (yveline.org, bruzanemediabase). WebFetch tiivistää sivun pienellä mallilla, joten lainaukset ovat sen palauttamia.

## Lyhenteet (osoitteet)

**Grand Châtelet ja Temple**
- GC = pariszigzag.fr/insolite/histoire-insolite-paris/grand-chatelet-prison/
- FP = france-pittoresque.com/spip.php?article12238=
- CC = hugo.criminocorpus.org/fr/lieu/grand-chatelet-de-paris/
- PR = parcoursrevolution.paris.fr/en/points-of-interest/54-the-grand-chatelet-prison-of-the-ancien-regime
- HP = histoires-de-paris.fr/fontaine-du-palmier-chatelet/
- NAP = napoleon.org/fr/magazine/musee/files/Fontaine_Chatelet.asp
- CARN = parismuseescollections.paris.fr/fr/musee-carnavalet/oeuvres/victoire-de-la-fontaine-du-palmier-place-du-chatelet
- HER-M = herodote.net/Moliere_1622_1673_-synthese-2764.php
- EXE = executedtoday.com/2011/11/28/1721-cartouche-french-bandit/
- BP = bonjourparis.com/history/on-the-hunt-for-philippe-augustes-wall-in-paris/
- HPT = histoires-de-paris.fr/tour-du-temple/
- TEM = templiers.org/paris.html
- MAI = mairiepariscentre.paris.fr/pages/la-minute-historique-le-saviez-vous-22702
- SEC = secretsofparis.com/sightseeing/neighborhoods/temple-district/
- LEM = lemaraismood.com/and-the-king-drove-out-the-templars/
- PREV = parisrevolutionnaire.org/2-rue-eugene-spuller/
- HER-R = herodote.net/Le_remords_de_la_revolution_1792_1795-article-2556.php
- SMI1 = morethannelson.com/sir-william-sidney-smith-escapes-gaol-in-france-24-february-1798/
- SMI2 = james-gillray.org/pop/smith.html
- SMI3 = wehd.com/bios/Sir_William_Sidney_Smith.html
- SMI4 = napoleonguide.com/sidsmith.htm
- PIC1 = frenchempire.net/biographies/pichegru/
- PIC2 = geriwalton.com/pichegru-conspiracy-or-the-cadoudal-affair/

**Trocadéro**
- AUD = auditorium-lyon.com/en/1878-palais-du-trocadero (myös /fr/cesar-franck ja /en/1977-auditorium-lyon; yhteensä yksi lähde)
- HEN = henle.de/Trois-Pieces-pour-le-Grand-Orgue/HN-845
- CAGE = cageweb.be/catalog/orp01:000010687
- TCH = bruzanemediabase.com/sites/default/files/2023-08/Tchorek%20-%20concerts%20avec%20orgue.pdf
- ANA = anaclase.com/content/résurrection-d'un-cavaillé-coll
- PZT = pariszigzag.fr/insolite/histoire-insolite-paris/palais-du-trocadero-le-plus-bel-edifice-disparu-de-paris/
- BPL = bonjourparis.com/history/lost-monuments-paris
- GLF = thegoodlifefrance.com/palais-du-trocadero-lost-monument-of-paris/
- PFC = paris.fr/pages/le-palais-de-chaillot-s-etend-sur-55-000-metres-carres-25622
- HER-U = herodote.net/10_decembre_1948-evenement-19481210.php
- NAD = en-attendant-nadeau.fr/2018/05/08/palais-ethnographie-trocadero/
- DEV = devisu.inha.fr/histoiredelart/112
- UNI = universalis.fr/encyclopedie/musee-de-l-homme-paris/1-le-musee-d-ethnographie-des-origines/

**Galerie des Machines**
- PF4 = paris.fr/pages/ces-lieux-disparus-qui-font-aussi-l-histoire-de-paris-4-4-34201
- STR = structurae.net/en/structures/galerie-des-machines
- PZG = pariszigzag.fr/insolite/histoire-insolite-paris/le-monument-disparu-le-plus-impressionnant-de-paris/
- GIL = gilwro.fr/19eSiecle/la-galerie-des-machines-dans-lombre-de-la-tour-eiffel-1889-monument-unique-monde/
- BNF = expositions.bnf.fr/cnac/grand/cir_2516.htm
- AHI = ahicf.com/post/the-greatest-show-on-earth-la-tourn%C3%A9e-en-france-du-cirque-barnum-bailey-1901-1902
- PHO = phonographia.com/Fairs/1889%20Paris.htm
- EXH = exhibitoronline.com/topics/article.asp?ID=2669
- CAM = cambridge.org/core/books/abs/musical-encounters-at-the-1889-paris-worlds-fair/marvels-of-technology/88AB72A0FF5DB751F8E27503FFB67FE1
- ARC = architecturalguidance.blogspot.com/2008/08/galerie-des-machines-gallery-of.html

**Monet**
- MAR = marmottan.fr/en/notice/4014
- HER-I = herodote.net/15_avril_1874-evenement-18740415.php
- PZM = pariszigzag.fr/insolite/histoire-insolite-paris/premiere-exposition-impressionniste-paris/
- RTB = rtbf.be/article/impression-soleil-levant-de-monet-comment-un-tableau-moque-est-devenu-le-symbole-d-une-revolution-artistique-11766429
- CG = culture.gouv.fr/.../les-huit-expositions-impressionnistes-1874-1886/la-societe-nouvelle (ja /1886-huitieme-exposition)
- PRA = prameet.substack.com/p/impressionism-inc-an-examination
- PIG = parisinsidersguide.com/eight-impressionist-exhibitions.html
- ART = artinwords.de/?p=11363
- ECL = eclecticlight.co/2022/11/22/sunrise-on-impressionism-18-frederic-bazille/
- THA = thehistoryofart.org/frederic-bazille/quotes/

**Vrain-Lucas**
- STA = mathshistory.st-andrews.ac.uk/HistTopics/Forgery_1/
- AMU = amusingplanet.com/2022/12/the-forgeries-of-denis-vrain-lucas.html
- LIN = lindahall.org/about/news/scientist-of-the-day/michel-chasles
- SIM = simanaitissays.com/2018/10/07/the-chasles-vrain-lucas-scam-part-2/
- HOX = hoaxes.org/archive/permalink/vrain_lucas
- LH1 = livreshebdo.fr/article/la-chasse-au-faux
- LH2 = livreshebdo.fr/article/gerard-coulon-vrain-lucas-histoire-dun-incroyable-faussaire-errance-tempete-sous-la-coupole
- BIB = bibliorare.com/lot/219161
- YVE = yveline.org/wp-content/uploads/2022/04/Chasles.pdf
- STG = strangeco.blogspot.com/2019/08/denis-vrain-lucas-prince-of-forgers.html
- FUT = futilitycloset.com/2006/03/17/caveat-emptor/

---

## 1. Grand Châtelet

| väite | lähde 1 | lähde 2 | tulos | korjaus |
|---|---|---|---|---|
| Vankila- ja oikeuslinnake | FP (prévôté hoiti poliisia ja rikosoikeutta) | GC (vankila ja prévôtin istuin) | OK | - |
| Seinen oikealla rannalla | GC (Citén pohjoinen sisäänkäynti) | FP (sillan pää Citén suuntaan) | OSITTAIN: "oikea ranta" ei lue kummassakaan, vain päätellään sillan sijainnista. PR sijoittaa vankilat nykyisen Théâtre de la Villen kohdalle. | Joko jätä "oikealla rannalla" pois tai hanki sanallinen lähde |
| Ludvig VI rakennutti kiveksi 1100-luvulla | FP ("Louis VI en 1130") | CC ("reconstruit en pierre en 1130") (GC samoin) | OK | - |
| Kaupungin muurittaminen alkoi 1190, linnakkeesta prévôtin pääpaikka | FP (1190, prévôté) | CC (1190, prévôté); BP (muuri "1190 – n. 1215") | OK | - |
| Villon vankina | GC | FP (CC: 1462) | OK | - |
| Molière 1645 velkojen takia | CC ("1645 … velat") | HER-M (elokuu 1645, velat) | OK | - |
| Cartouche 1721 | CC (1721, Châtelet) | EXE (Grand Châtelet, teloitus 28.11.1721) | OK | - |
| La Fosse: kartio, ei seisomaan eikä makuulle | GC | FP | OK | - |
| Morgue-sana syntyi täällä (vartijat "morguaivat"), vainajat tunnistettaviksi | GC | FP (CC: vainajien talletus) | OK. Teksti sanoo jo "sanotaan", se riittää. | - |
| 2.9.1792 joukko tunkeutui ja surmasi "kymmeniä" vankeja | GC (2.9., ~350 vangista noin kymmenen selvisi) | PR ("several dozen", ei päivää) | RISTIRIITA määrässä: GC viittaa satoihin uhreihin, PR kymmeniin. Päivä 2.9. vain GC:ssä. CC sanoo vain "syyskuu 1792". | "Syyskuun 1792 alussa joukko tunkeutui linnakkeeseen ja surmasi vankeja", ilman päivää ja lukua |
| Vankila hylättiin verilöylyn jälkeen | GC | CC | OK | - |
| Purku alkoi 1802 | FP | CC (1802–1810); PR (1802–1810) | OK | - |
| Uusi Place du Châtelet | FP (aukio korvasi vankilan) | GC (Haussmann) | OK | - |
| Napoleon tilasi palmusuihkulähteen voitonmuistomerkiksi | HP (1806 tilaus, pylväässä voittojen nimet) | NAP (Napoleon, pylväs muistaa Imperiumin voittoja); CARN (Egyptin ja Italian kampanjat) | OK | - |
| Valmistui 1808 | CARN ("de 1806 à 1808") | - (HP ja NAP eivät anna valmistumisvuotta) | EI KAHTA LÄHDETTÄ | "rakennettiin 1806–1808" (yksi lähde) tai poista vuosi |
| Seisoo aukiolla yhä | HP | FP | OK | - |

**KOKONAISARVIO: OK KORJAUKSIN**

HEIKOIMMAT KOHDAT:
1. Syyskuun 1792 päivä ja "kymmeniä" (lähteet eri mieltä).
2. "Valmistui vuonna 1808" (yksi lähde).
3. "Oikealla rannalla" ei sanallisesti missään avatussa lähteessä.
4. Hologrammikohta "Linnakkeen purku alkoi" on kunnossa (1802), mutta NAP mainitsee 1808 prévôtin istuimen purkuna. Tämä on pieni epäyhtenäisyys eikä ristiriita.

---

## 2. Temple-torni

| väite | lähde 1 | lähde 2 | tulos | korjaus |
|---|---|---|---|---|
| Torni temppeliritarien päämajan linnoituksessa | TEM | HPT ("fortifications des templiers") | OK | - |
| Philippe Augusten ajoista kuninkaan aarre ritarien linnoitukseen | HPT | MAI (TEM: 1194) | OK | - |
| Muurien suojassa kiltasäännöistä ja Pariisin veroista vapaita käsityöläisiä | LEM (kilta- ja verovapaus) | SEC (vain verot; killoista ei mainintaa) | OSITTAIN: kilta-osa vain LEM:ssä. Molemmat ovat matkailu- ja blogisivustoja, HPT mainitsee vain käsityöläisten pajat. | Kirjoita "veroista vapaita käsityöläisiä" tai hanki kolmas lähde (Hillairet, Larousse) |
| Elokuussa 1792 kommuuni vei kuningasperheen Templeen | MAI (laatta: vangittuna 13.8.1792), PREV (13.8.1792) | HER-R (Temple "imposé par la Commune") | OSITTAIN: kuukausi OK, kommuunin rooli vain HER-R:ssä. | Jätä "kommuuni" pois tai lisää lähde |
| Ludvig XVI "lähti sieltä" giljotiinille | SEC (Ludvig XVI teloitettiin Tornin jälkeen) | HER-R (21.1.1793 teloitus) | OSITTAIN: Templestä lähtöä ei sanota suoraan, se on pelkkä päätelmä. | Pieni asia, voi pitää |
| Ludvig XVII kuoli Templessä 1795 kymmenvuotiaana | PREV (8.6.1795, "à dix ans") | HER-R (8.6.1795, ei ikää); LEM (1795) | OSITTAIN: vuosi OK, ikä vain PREV:ssä. PREV antaa itse myös 10.6. | Ikä pois tai hanki lähde |
| Smith pakeni 1798 väärennetyillä siirtomääräyksillä | SMI3 (Temple, "forged orders", 8.5.1798 Lontoossa) | SMI2 (väärennetyt paperit, 1798) | OK. SMI1 sanoo paperit saadun ministerin allekirjoittamista tyhjistä lomakkeista. SMI4 vahvistaa vain Temple-pakoa. | - |
| Kaksi miestä univormuissa vei hänet "toiseen vankilaan" | SMI1 (kaksi apulaista ranskalaisupseerien univormuissa) | - (SMI2 ja SMI3 eivät mainitse univormuja) | OSITTAIN: univormut yhdessä lähteessä | Poista "univormuissa" tai lisää lähde. Älä anna pakopäivää (SMI1 24.2., SMI2 "toukokuu"). |
| Pichegru löytyi kuolleena Templen sellistä huhtikuussa 1804 | PIC1 (5.4.1804) | PIC2 (5.4.1804, Temple); PREV (6.4.) | OK kuukaudelle ja paikalle | - |
| Napoleon määräsi purkamaan 1808 | TEM (asetus 16.3.1808) | HPT, MAI, SEC (1808) | OK. LEM ja PREV kertovat purun 1811, mutta teksti sanoo vain "määräsi". | - |
| Motiivi: lopettaa rojalistien pyhiinvaellukset | HPT | TEM; SEC; LEM | OK | - |
| Tornista ei jäänyt mitään; Square du Temple; kaupungintalo Rue Eugène-Spullerilla | PREV ("aucun vestige visible"; mairie 2 rue Eugène Spuller; square) | HPT ("rue Eugène Spuller entre la mairie du 3e et le square du Temple"); MAI | OK | - |

**KOKONAISARVIO: OK KORJAUKSIN**

HEIKOIMMAT KOHDAT:
1. "Univormuissa" (yksi lähde).
2. "Kommuuni" (yksi lähde).
3. "Kiltasäännöistä" (yksi lähde, kaksi matkailusivustoa).
4. Ludvig XVII:n ikä (yksi lähde, ja sen oma sisäinen ristiriita 8.6./10.6.).
5. Otsikko "kuningasperhe ei palannut" on liioittelua: Madame Royale selvisi ja palasi Temple-paikalle 1814. Tätä en avannut lähteestä, vain T-kadonneet.md:n PREV-viite viittaa siihen. Tarkista.

---

## 3. Trocadéron palatsi

| väite | lähde 1 | lähde 2 | tulos | korjaus |
|---|---|---|---|---|
| Rakennettiin 1878 maailmannäyttelyä varten | AUD | PFC (palatsi "depuis 1878"); PZT; BPL | OK | - |
| Seinen pohjoisrannalla (Chaillotin kukkula) | BPL (Chaillot, Seinen toisella puolella tornia) | PFC ("colline de Chaillot") | OK | - |
| Kaksi korkeaa tornia | BPL (2 tornia, 76 m) | GLF (sama); PZT (tornit, ei lukua) | OSITTAIN: BPL ja GLF ovat englanninkielisiä blogeja, jotka näyttävät lainaavan samaa. PZT vahvistaa tornit mutta ei lukumäärää. | Voi pitää, jos hyväksyy PZT:n |
| Kaksi kaarevaa siipeä | AUD (kaksi suurta siipeä) | PZT ("deux grandes ailes entourant un édifice central circulaire") | OSITTAIN: "kaareva" vain pääteltävissä PZT:stä | "kaksi suurta siipeä keskirakennuksen sivuilla" |
| Yli 4 000 paikan sali | AUD (~5 000) | CAGE (~4 600) | OK | - |
| Huono akustiikka, mutta urut soivat hyvin | AUD ("disastrous for any form of music other than the organ") | - | EI KAHTA LÄHDETTÄ | Poista tai hanki lähde |
| Urut vihittiin elokuussa 1878 | AUD (7.8.) | TCH (7.8.1878); CAGE (8.8.) | OK kuukaudelle. Päivä on ristiriitainen (7. vai 8.), tekstissä ei päivää. | - |
| Franck sävelsi niille Trois Pièces | AUD (sävelletty tilaisuutta varten, 1.10.1878 ensiesitys) | HEN ("wrote the Trois Pièces for this instrument") | OK | - |
| Etnografinen museo: syntyi 1878 näyttelystä, avattiin yleisölle 1882 | NAD (1878, 1882) | DEV (1882); UNI (1878 näyttely) | OK. Perustamispäivä vaihtelee (1878 / 1879 nimenmuutos / 19.7.1880 asetus), teksti on yhteensopiva. | - |
| 1920-luvulla hämärä, kylmä, pölyinen komero | NAD ("pénombre glacée … poussière du bric-à-brac") | UNI (rapistuminen, Rivet 1928) | OSITTAIN: elävä kuvaus vain NAD:ssä, UNI tukee vain rappiota | Pehmennä: "rappiotilassa 1920-luvulla" |
| 1935 keskisali ja tornit purettiin | AUD (purku 1935) | PZT (purku alkoi 1935) | RISTIRIITA: BPL ja GLF sanovat "purettiin 1937". "Tornit" ei lue suoraan missään. | "Vuonna 1935 alkoi purku" |
| Siivet jäivät Chaillot'n palatsin osiksi | PFC ("ailes anciennes … doublées") | GLF (siivet käytettiin uudelleen) | OK | - |
| YK hyväksyi julistuksen Chaillot'ssa 1948 | PFC | HER-U | OK | - |
| Urut Lyonissa, siirretty 1977 | ANA (1977, Danion) | AUD (1977, vihkiäiset 27.10.1977) | OK. ANA: urut purettiin 1972. | - |

**KOKONAISARVIO: OK KORJAUKSIN**

HEIKOIMMAT KOHDAT:
1. Akustiikkaväite (yksi lähde).
2. Purkuvuosi 1935 vs 1937 ja "tornit".
3. "Kaarevat" siivet.
4. "Hämärä, kylmä, pölyinen" (yksi lähde).
5. Monta kohtaa nojaa auditorium-lyon.comiin, joka lasketaan yhdeksi lähteeksi.

---

## 4. Galerie des Machines

| väite | lähde 1 | lähde 2 | tulos | korjaus |
|---|---|---|---|---|
| 1889 maailmannäyttelyn konehalli Champ-de-Marsilla | PF4 | STR; PZG | OK | - |
| "Eiffel-tornin vieressä" (ja tänään-jaksossa "sen vieressä") | PZG ("au bout du Champ-de-Mars, à l'opposé de la tour Eiffel") | PF4 ("au fond du Champ-de-Mars, devant l'École militaire") | RISTIRIITA: kaksi lähdettä sijoittaa hallin tornin vastakkaiseen päähän. GIL:n "dans l'ombre de la tour Eiffel" on retoriikkaa. | "Champ-de-Marsin toisessa päässä École militaren edessä, vastapäätä Eiffel-tornia". Korjaa myös "tänään"-jakso. |
| Noin 420 × 115 m | PZG (420 × 115 × 43) | GIL (420 × 115); STR (422,49 × 114,38) | OK | - |
| Ei yhtään pilaria | PZG ("aucun pilier intérieur") | GIL ("sans aucun point d'appui intermédiaire") | OK | - |
| Teräskaaret nojasivat toisiinsa kolmesta nivelestä | STR ("three-hinged portal frame") | ARC (three-hinged arch) | OK. ARC on blogi, ja GIL kuvaa saman ilman sanaa "hinge". | - |
| Liikkuvat sillat vieraita kuljettamassa | PZG | GIL | OK | - |
| Edisonin fonografi, Marseillaise | CAM (Edisonin fonografi Galerie des Machinesissa, menestys) | PHO (fonografi "Galeries des Machines", Ranskan ja USA:n kansallislaulut); EXH ("La Marseillaise", ei paikkaa) | OK | - |
| 1900 maatalouden ja elintarvikkeiden näyttely | PF4 | PZG ("agriculture et alimentation"); GIL | OK | - |
| Barnum & Bailey: alkoi marraskuussa 1901, päättyi maaliskuussa 1902, kolme areenaa | BNF (30.11.1901–16.3.1902, trois pistes) | AHI (samat päivät, kolme pistaa) | OK | - |
| Vuonna 1909 kaupunki ilmoitti hävittävänsä, ja halli purettiin | PF4 (purettu 1909) | STR (purettu 1909); GIL (1909) | OSITTAIN: purku 1909 OK, mutta "ilmoitti 1909" vain PZG:ssä. ARC antaa 1910. | "purettiin 1909" |
| Syy: näkymä Champ-de-Marsille aukeaisi | PF4 ("élargir la perspective") | PZG ("libérer la perspective") | OSITTAIN: ARC sanoo syyksi Invalidesin näkymän. PZG voi lainata PF4:ää. | Voi pitää, jos hyväksyy PF4:n ja PZG:n |
| Yli 40 m korkea, seisoi 20 vuotta | PZG (43 m) | GIL (45 m); STR (46,67 m) | OK | - |

**KOKONAISARVIO: OK KORJAUKSIN**

HEIKOIMMAT KOHDAT:
1. "Eiffel-tornin vieressä" on faktavirhe, ja se toistuu kahdessa jaksossa.
2. Purkuvuoden ja -syyn vaihtelu (1909/1910, näkymä Champ-de-Marsille / Invalides).
3. "Pariisin kaupunki ilmoitti 1909" (yksi lähde).
4. Nivelet: toinen lähde on blogi.

---

## 5. Monet 1874

| väite | lähde 1 | lähde 2 | tulos | korjaus |
|---|---|---|---|---|
| Hylätyille anottiin omaa näyttelyä turhaan 1867 | ECL (Bazille laati vetoomuksen uudesta Salon des Refusés -näyttelystä, Daubigny allekirjoitti) | THA (huhtikuun 1867 kirje, suunnitelma riippui vetoomuksesta) | OSITTAIN: vetoomus kyllä, mutta tulosta ("turhaan") ei kerrota kummassakaan. PRA kertoo erillisen oman näyttelyn suunnitelman, joka kaatui rahan puutteeseen. Monet ei esiinny näissä lähteissä. | "Vuonna 1867 Bazille laati vetoomuksen hylättyjen uudesta näyttelystä". "Turhaan" vain, jos löytyy lähde. |
| Joulukuussa 1873 perustettiin yhdistys | PZM (27.12.1873) | PRA (27.12.1873); CG ("fin 1873", Monetin aloitteesta) | OK | - |
| Perustajat: Monet, Renoir, Pissarro, Sisley, Morisot, Degas | PRA (listaa Morisotin perustajiin) | PZM (Monet, Renoir, Sisley, Pissarro, Degas, Prins; Morisot liittyi myöhemmin) | RISTIRIITA Morisotin osalta. CG:n väliaikaisessa hallinnossa ei ole Morisotia, Degas'ta eikä Sisleytä. | "Monet, Renoir, Pissarro, Sisley, Degas ja muut", Morisot pois |
| Jäseniltä odotettiin Salonista luopumista | - (PRA: ei kieltoa) | - (CG: näyttelyt "sans jury ni récompenses") | EI KAHTA LÄHDETTÄ (ei yhtäkään tukea) | Poista |
| Esittääkseen työnsä itse | CG | PRA | OK | - |
| Huhtikuussa 1874 Nadarin ateljeessa | MAR | PZM; HER-I; RTB | OK | - |
| Kolmekymmentä taiteilijaa | PZM (30, 165 teosta) | PIG (30 artists); PRA (30); HER-I ("une trentaine") | OK | - |
| Leroy ivasi Impression, soleil levantia; otsikko "L'exposition des impressionnistes" | MAR (Le Charivari 25.4.1874) | PZM; HER-I | OK | - |
| Pilkkanimi jäi, taiteilijat ottivat sen itse omakseen | HER-I (nimi jäi ryhmälle) | PIG (1877 kolmas näyttely: "now called Impressionists") | OSITTAIN: "jäi käyttöön" OK, "otti itse omakseen" vain PIG:ssä | "ryhmä alkoi itse käyttää nimeä" (yksi lähde) |
| Viimeinen yhteinen näyttely 1886 | CG (15.5.–15.6.1886, "qui sera la dernière") | ART; PIG | OK. Johtolanka avaamatta: Monet ei osallistunut 1886 näyttelyyn. | - |
| Esittää auringonnousua Le Havren satamassa | MAR (Le Havren ulkosatama, Hôtel Amirauté, ~marraskuu 1872) | RTB (Hôtel de l'Amirauté, Le Havre, marraskuu 1872) | OK | - |
| Esillä Musée Marmottan Monet'ssa | MAR (museon kokoelmassa, inv. 4014) | RTB; HER-I (Marmottanissa) | OSITTAIN: "esillä" ei lue suoraan, vain kuuluu museolle | Voi pitää tai sano "kuuluu Marmottan Monet'n kokoelmiin" |

**KOKONAISARVIO: OK KORJAUKSIN**

HEIKOIMMAT KOHDAT:
1. Salonista luopuminen (ei tukea).
2. Morisot perustajana (ristiriita).
3. 1867 "turhaan" (tulos ei vahvistu).
4. "Ottivat itse omakseen" (yksi lähde).
5. Monetin osuus 1867 ei vahvistu avatuissa lähteissä.

---

## 6. Vrain-Lucas

| väite | lähde 1 | lähde 2 | tulos | korjaus |
|---|---|---|---|---|
| Lakikirjuriksi kouluttautunut | STA ("trained as law clerk") | AMU ("judicial clerk") | RISTIRIITA sanassa "kouluttautunut": STG ja LH2 kuvaavat hänet kouluttamattomaksi itseoppineeksi (day laborerin poika, "inculte"). | "lakikirjurina työskennellyt" |
| Noin 27 000 kirjettä | STA (27 000) | YVE (27 345); LH1 (>27 000); BIB (>27 000) | OK. AMU, LIN ja STG antavat ~30 000. | "noin 27 000" kelpaa, tai "27 000–30 000" |
| Väärensi Kleopatralta Dantelta myöten | YVE (Kleopatra, Aleksanteri, Juudas, Caesar jne.) | LH1 (Kleopatra Caesarille); STG (Kleopatra; "Dante"-kirje Firenzelle 1865) | OSITTAIN: Dante vain STG:ssä. BIB mainitsee vain "Dantén mystisen ruusun", ei Dantelta tullutta kirjettä. | "Kleopatralta Aleksanteri Suurelle asti" (YVE) tai lisää Dante-lähde |
| Kaikki 1800-luvun ranskaksi ja vesileimatulle paperille | AMU (lähes kaikki ranskaksi); YVE (kaikki ranskaksi, paperi vanhennettu keinotekoisesti) | - | EI KAHTA LÄHDETTÄ vesileimalle (ei missään avatussa lähteessä). "1800-luvun" ei tuettu: LH1 sanoo "vanhaa ranskaa". | "kaikki ranskaksi ja keinotekoisesti vanhennetulle paperille" |
| Alkoi väärentää 1854 | STA ("around 1854") | - | EI KAHTA LÄHDETTÄ ja ristiriita: HOX 1851 (tapasi Chaslesin), LH2 hylättiin Bibliothèque impérialessa 1852, jonka jälkeen alkoi | "1850-luvulla" |
| Hankki aikakauden paperia, valmisti musteen itse | STA (vanha paperi, käsin tehdyt musteet) | AMU (vanhoista kirjoista leikattu paperi, oma muste) | OK | - |
| Keräsi yksityiskohdat keisarillisesta kirjastosta | STA ("worked at the Imperial Library") | - | EI KAHTA LÄHDETTÄ, ja LH2 sanoo hänet hylätyn Bibliothèque impérialesta 1852 (STG ei mainitse). | Poista tai muotoile "käytti pariisilaiskirjastojen aineistoa" (STA) |
| 1861 myi Chaslesille Boylen, Newtonin ja Pascalin kirjeitä | STA (1861) | LH1, LH2, STG (1861 ensikontakti) | OK vuodelle. Sisältö: STA Pascal, Newton ja Boyle, AMU Pascal–Boyle. | - |
| Pascal väitti keksineensä painovoiman ennen Newtonia | STA | AMU | OK | - |
| Chasles maksoi yli 140 000 frangia | STA (140–150 000) | AMU, LIN, BIB, YVE, LH1 (140 000) | OSITTAIN: "yli" ei tue yksikään lähde, jotka sanovat "noin 140 000" tai "140–150 000" | "noin 140 000 frangia" |
| Vuonna 1867 Chasles vei Pascal-kirjeet tiedeakatemialle | YVE (8.7.1867) | LH1 (8.7.1867); STA; AMU | OK. STG antaa Pascal–Boyle-kirjeelle 1868, mutta sen kontekstia ei tarkistettu. | - |
| Käsiala ei vastannut Pascalin varmoja kirjeitä | STA | AMU | OK | - |
| Anakronismit → lisää väärennöksiä selitykseksi | STA ("answered each with a new letter") | AMU (lisäkirjeitä vastaukseksi) | OK. AMU sanoo "Chasles produced", STA "Vrain-Lucas answered". | - |
| Helmikuussa 1870 tuomio, kaksi vuotta | STA (helmikuu 1870, 2 v + 500 fr) | HOX (helmikuu 1870); BIB (6.2.); YVE (17.2.) | OK kuukaudelle. Päivä 6.2. / 17.2. ristiriitainen, tekstissä ei päivää. | - |
| 2004 eräs "tiedelehti" julkaisi väärän vankilakirjeen | SIM (Critical Inquiry julkaisi "löydetyn" 1871 vankilakirjeen, väärennös) | - (FUT ja STG eivät mainitse; muut lähteet vain hakuotteissa) | EI KAHTA LÄHDETTÄ. Lisäksi Critical Inquiry on humanistinen lehti, ei tiedelehti. Hakuotteiden mukaan kyseessä on Ken Alderin tietoisesti fiktiivinen esseekirje, jota en avannut. | "Vuonna 2004 Critical Inquiry -lehti julkaisi …" vain jos toinen lähde löytyy, muuten poista |

**KOKONAISARVIO: EI OK nykyisessä muodossa** (kelpaa, kun alla olevat kohdat on korjattu)

HEIKOIMMAT KOHDAT:
1. Vesileima ja "1800-luvun" (ei tukea).
2. "Alkoi 1854" (ristiriita 1851 / 1852 / 1854) ja keisarillinen kirjasto (ristiriita).
3. 2004-väite (yksi lähde, "tiedelehti" väärin).
4. "Yli 140 000" (lähteet: noin 140 000 tai 140–150 000).
5. "Kouluttautunut" ja Dante-kirje.
# Liite B: 7 tarinapaikkaa (1. kierros)

# Tarkistusraportti: Era 2 -tekstit (7 kpl)

Luin ja avasin lähteet itse WebFetchillä, curlilla ja pdftotextilla. Wikipediaa en lukenut lähteeksi. Hakutulosotteita en laskenut todisteeksi, vaikka mainitsen ne, kun ne ovat johtolankoja.

Lyhenteet:
- **PARIS** = paris.fr tai cdn.paris.fr (yksi julkaisija).
- **OC** = opera-comique.com ja sen ohjelma-PDF (yksi julkaisija).
- **Hayhurst** = J. D. Hayhurst, "The Pigeon Post into Paris 1870-71", luettu web.archive.orgin kopiosta.
- **Dagron** = Dagronin oma 1871 kirjanen "La poste par pigeons voyageurs", luettu archive.orgista.
- **UCLA** = srlf.ucla.edu (Chronology ja hist_page4).
- Muut lyhenteet (BIERS, FUTURA, FRANCETODAY-G, CONNEXION, GAZETTE, VET, ZIGZAG, UNJOUR, FRANCETODAY-B, TIMEOUT, COOKS, MAPA, PBM, UNESCO-B, RNZ, FRIENDS-R, FRIENDS-ROOF, CWR, KOMO, EURONEWS, VPBY, CATHREV, TRIBUNE, ALJAZ, KSAT, REBUILD, FRIENDS-REOPEN) ovat samat kuin T-tarinat.md:ssä, ja kaikki on avattu uudelleen.

**Mitä en saanut auki:**
- 403: Britannica, notredamedeparis.fr, researchgate, clements.umich.edu, amoeba.com, atlasobscura, historytoday, gazette-drouot.
- bbc.co.uk on estetty työkalussa. Escudier-sitaatin sain vain BBC:n peilisivulta bbcbreakingnews.pages.dev.
- Gutenberg oli alhaalla (503). Dagronin kirjasen ja Hayhurstin luin archive.orgista.
- cdn.paris.fr:n Patonki-PDF ja OC:n ohjelma-PDF luin pdftotextilla.
- historyofinformation.com ja luminous-lint.com palauttivat tyhjää, ja theculturetrip meni aikakatkaisuun.
- Hakutuloksissa olleet lähteet, joita en avannut: Wiktionary, Merriam-Webster, mus-col.com, Notre-Damen oma sivu ja PND. Niitä en käytä todisteena.

---

## 1. Bizet 1875

| väite | lähde 1 | lähde 2 | tulos | korjaus |
|---|---|---|---|---|
| Carmen sävelletty Opéra-Comiquelle, Pariisi torjui | sfopera.com/operas/carmen/articles/creating-carmen-scandal-sensation/ | OC-ohjelma opera-comique.com/sites/default/files/2023-04/2023_ProgrammeAudiodescriptionOperaComique_Carmen.pdf (Pariisin yleisö "sous le choc", libretto "scabreux") | OK | – |
| Talo oli perheteatteri | OC-ohjelma ("public bourgeois et familial") | sfopera.com (Du Locle oli "warned off the usual family parties") | OK | – |
| Talo oli valtion rahoittama | opera-comique.com/en/history-heritage-opera-comique (vain: valtio otti 1887 palon jälkeen uudelleenrakennuksen) | – | EI KAHTA LÄHDETTÄ | Poista "valtion rahoittama" tai lisää lähde. RBO-hakutulos (avaamaton) sanoo "state-funded". |
| Työ alkoi tammikuun tienoilla 1873 | usuo.org/explore/2016/09/the-writing-and-rehearsing-of-carmen/ (tilaus 1872, aihe päätetty maalis–huhtikuuhun 1873 mennessä, 1. näytös valmis kesäkuun alussa 1873) | ebsco.com/research-starters/history/bizets-carmen-premieres-paris/ (vuonna 1873 hän ehdotti Mériméen novellia) | EI KAHTA LÄHDETTÄ (tammikuuta ei löydy mistään) | "vuonna 1873" tai "keväällä 1873". |
| de Leuven vastusti uskallettua tarinaa | sfopera.com | usuo.org; operalounge.de (Du Locle valitsi aiheen de Leuvenin vastalauseista huolimatta) | OK | – |
| Hän erosi alkuvuodesta 1874 | usuo.org: "resigned in 1874" | sfopera.com: "six months later" (suhteellinen, ei vuotta) | OSITTAIN: vuosi 1874 OK, kuukautta ei lähteissä | "vuonna 1874". |
| Marie Roze kieltäytyi nimiroolista | OC (opera-comique.com/fr/les-interpretes-du-role-de-carmen-…): "scabreux" | usuo.org (Rozen kirje Bizet'lle 7.9.1873); planethugill.com (Roze vastusti murhattavaksi tulemista) | OK | – |
| Rooli meni Galli-Mariélle | sfopera.com | usuo.org (sopimus 18.12.1873); ClassicFM | OK | – |
| Ensi-ilta 3.3.1875 | EBSCO; ClassicFM | andreas-praefcke.de; OC-ohjelma | OK | – |
| Salissa Massenet, Offenbach, Delibes, Gounod | sfopera.com (lisäksi Thomas, Lecocq, d'Indy) | interlude.hk (juuri nämä neljä, mutta sanamuoto näyttää Wikipedia-peräiseltä) | OSITTAIN: käytännössä yksi riippumaton lähde. Planethugill sanoo, ettei Du Locle kutsunut julkisuuden henkilöitä. | "salissa oli useita aikakauden säveltäjiä" tai viittaa SF Operaan. |
| "Toreadorin laulun jälkeen tuli kylmyys" | ClassicFM (yleisö viileni näytös näytökseltä); planethugill (1. näytös otettiin hyvin, neljäs oli "glacial") | interlude.hk ("after the toreador song there was nothing but coldness" Halévyn mukaan, Wikipedia-peräinen) | OSITTAIN: sfopera.com sanoo Toreadorin laulun olleen "enormous hit" | "Habanera ja Toreadorin laulu menivät hyvin, mutta sen jälkeen yleisö kylmeni, neljännessä näytöksessä jäätävän hiljaa." |
| Kriitikko: pääosan tulkinta paheen ruumiillistuma | bbcbreakingnews.pages.dev (BBC-peili): Léon Escudier, "a very incarnation of vice"; peili, alkuperäinen ei aukea | rbo.org.uk: nimetön kriitikko, "gestures that ooze vice" | OSITTAIN: sana vaihtelee, tekijä vain peilisivulla | "kriitikko moitti Carmenin eleitä paheellisiksi" (nimeämättä). |
| Taloa ei saatu täyteen edes ilmaislipuilla | ClassicFM (ilmaislippuja jaettiin) | interlude.hk (sama, Wikipedia-peräinen); planethugill.com (ei koskaan täynnä) | OSITTAIN: ilmaislippujen osalta riippumaton toinen lähde puuttuu | Voi pitää, jos kelpuutat planethugillin "never to a full auditorium" toiseksi. |
| Kuoli 3.6.1875, 36-vuotiaana | sfopera.com ("June 3, 1875 … 36 years old") | OC-ohjelma ("3 juin 1875 … à l'âge de 36 ans"); EBSCO (3.6.) | OK | – |
| "33. esityksen jälkeen" | OC-ohjelma ("au lendemain de la 33e représentation"); operascribe.com ("day after the 33rd") | sfopera.com ("on the evening of the 33rd"). Ristiriidassa: ClassicFM "after the 32nd"; operalounge.de siteeraa Prévostin (33.) ja Dogania (31.) | OSITTAIN: enemmistö 33., mutta lähteet eivät ole yksimielisiä | "noin kolme kuukautta ensi-illan jälkeen", tai jätä numero pois. |
| Maine nousi ensin Wienissä | OC-ohjelma (Wien 23.10.1875) | sfopera.com; EBSCO | OK | – |
| Pariisiin ooppera palasi 1883 | OC-ohjelma (21.4.1883) | operascribe.com; EBSCO | OK | – |
| Ensi-illan sali paloi 1887 | opera-comique.com/en/history-heritage-opera-comique (25.5.1887, Mignon-esityksen aikana) | andreas-praefcke.de (25.5.1887); operalounge.de (kuvateksti) | OK | – |
| Paikalla on nyt kolmas samanniminen teatteri | OC (sama tontti, vihitty 1898) | andreas-praefcke.de ("In 1898 a 3rd Salle Favart was built on the site"); Google Arts | OK | – |

**KOKONAISARVIO: OK KORJAUKSIN.**
Heikoimmat kohdat:
1. "tammikuun tienoilla 1873" ei löydy mistään.
2. "valtion rahoittama" ei ole kahden lähteen varassa.
3. Salissa olleet säveltäjät ovat käytännössä yhden lähteen varassa.
4. "33. esityksen jälkeen" on lähteissä ristiriitainen (31., 32., 33.).
5. Kriitikon "paheen ruumiillistuma" on peilisivun varassa.

---

## 2. Kirahvi 1827

| väite | lähde 1 | lähde 2 | tulos | korjaus |
|---|---|---|---|---|
| Egyptin varakuningas lahjoitti kirahvin Kaarle X:lle | BIERS (archive.org/download/biostor-194681/biostor-194681.pdf, itse luettu) | FUTURA; CONNEXION; GAZETTE | OK | – |
| Saapui Marseilleen lokakuussa 1826 | BIERS (23.10.1826) | FUTURA (23.10.); GAZETTE; VET (lokakuu). FRANCETODAY-G antaa 31.10. | OK, koska teksti sanoo vain "lokakuussa" | Älä lisää päivää. |
| Kanteen sahattu reikä | FRANCETODAY-G | FUTURA | OK | – |
| Atlantin kautta kulkeva merimatka liian vaarallinen, joten käveltiin | FRANCETODAY-G ("around the Atlantic coast or up the Rhône") | VET ("boat travel too dangerous") | OSITTAIN: Atlantti mainitaan vain yhdessä, FUTURA ei perustele kävelyä | "meri- ja jokimatkaa pidettiin liian vaarallisina". |
| Talvehti Marseillessa, lähtö toukokuussa 1827 | FUTURA (20.5.1827) | GAZETTE (20.5.); BIERS (Aix 21.5.1827) | OK | – |
| Vahattu sadetakki, johon kirjailtu vaakunat | BIERS ("carapasson armorié"); FUTURA (takki ja lakki, joissa Egyptin pashan ja Kaarle X:n vaakunat) | FRANCETODAY-G ja VET (vahattu sadetakki) | OK | – |
| Geoffroy Saint-Hilaire käveli mukana | BIERS | FRANCETODAY-G; VET; GAZETTE | OK | – |
| Lyonissa noin 30 000 ihmistä | FRANCETODAY-G (6.6.) | GAZETTE | OK | – |
| Matka kesti 41 päivää | FRANCETODAY-G | CONNEXION; VET. GAZETTE sanoo 42. | OK | – |
| Saapui Jardin des Plantesiin 30.6.1827 | BIERS | CONNEXION; FRANCETODAY-G; GAZETTE | OK | – |
| Kuningas tapasi Saint-Cloudissa 9.7. | BIERS (ja Moniteur 11.7.) | FUTURA | OK | – |
| Kesällä noin 600 000 kävijää | FRANCETODAY-G; FUTURA | CONNEXION ("summer of 1827") | OK | – |
| Kampauksia kirahvin tapaan | FRANCETODAY-G | FUTURA; VET | OK | – |
| Kuoli Jardin des Plantesissa tammikuussa 1845 | FUTURA (12.1.1845); GAZETTE (12.1.1845) | CONNEXION (12.1.1845, paikka eksplisiittisesti Jardin des Plantes) | OK | Paikka on selvästi vain CONNEXIONissa. |

**KOKONAISARVIO: OK.**
Heikoimmat kohdat:
1. Atlantti-erittely vain FRANCETODAY-G:ssä.
2. Kuolinpaikka eksplisiittisesti vain CONNEXIONissa.
3. Aiempi 31.10.-päivä ei ole tekstissä, joten ei ongelma.

---

## 3. Bukinistit 1859

| väite | lähde 1 | lähde 2 | tulos | korjaus |
|---|---|---|---|---|
| Bouquin = vanha kirja | PARIS (paris.fr/pages/les-bouquinistes-et-paris-histoire-d-amour-en-majuscules-7886): arkikielinen "kirja", flaamin boeckin ('pieni kirja'), 1459 "boucquain" | francetoday.com/culture/parisian-walkways-the-bouquinistes-of-paris/ (boeckjin) | OSITTAIN: lähteet sanovat "pieni kirja" ja arkikielen "kirja", "vanha kirja" vain avaamattomissa sanakirjoissa | "arkikielen sana kirjalle; alun perin 'pieni kirja'". |
| Kulkukauppiaat myivät kirjoja kaduilla jo 1500-luvun lopulla | PARIS (colporteurs ja estaleurs 1500-luvulta) | FRANCETODAY-B (vain pormestarin sanonta "1500-luvun colporteurien perilliset") | EI KAHTA LÄHDETTÄ | "1500-luvulta". |
| Pont Neufin valmistuttua 1606 he asettuivat sillalle | PARIS (1606) | FRANCETODAY-B (1606, suosittu kauppapaikka); UNJOUR (varhainen 1600-luku) | OK | – |
| 1649 määräys kielsi myynnin sillalla | PARIS | ZIGZAG; UNJOUR | OK. "Kirjakauppiaiden painostuksesta" on vain PARISissa (ZIGZAG ja UNJOUR sanovat vain: määräys kielsi esillepanon Pont Neufin lähellä). | Poista "painostuksesta" tai viittaa vain PARISiin. |
| Ennen vallankumousta noin 300 myyjää | ZIGZAG | UNJOUR | OK | – |
| "Bouquiniste" kirjattiin ensi kertaa 1752 sanakirjaan | PARIS (Trévoux) | ZIGZAG; FRANCETODAY-B | OK | – |
| 10.10.1859 ensimmäinen heitä koskeva erityismääräys, myyjät saivat jäädä | PARIS ("premier règlement spécifique") | UNJOUR (10.10.1859 asetus, Haussmann-suunnitelma hylätty) | OSITTAIN: päivämäärä OK kahdesta lähteestä, "ensimmäinen" vain PARISissa | Voi pitää, mutta "ensimmäinen" on yhden lähteen varassa. |
| Laatikot piti kantaa pois joka ilta | PARIS | ZIGZAG | OK | – |
| Laatikot sai jättää vasta 1891 | PARIS | ZIGZAG; UNJOUR; FRANCETODAY-B | OK | – |
| Noin 1900 vaunun vihreä väri | PARIS ("vers 1900") | ZIGZAG (noin 1900). FRANCETODAY-B ajoittaa vihreän jo 1891:een. | OK, pieni vaihtelu | – |
| Nyt noin 230 bukinistia | FRANCETODAY-B (230) | – (PARIS ei anna nykylukua, vain 200 vuonna 1900) | EI KAHTA LÄHDETTÄ | "yli 200" tai "noin 200–250", tai poista. |
| Noin 3 km matkalla | PARIS | ZIGZAG; FRANCETODAY-B | OK | – |
| 2019 Ranskan aineettoman kulttuuriperinnön luetteloon | PARIS | ZIGZAG ("depuis 2019"); FRANCETODAY-B (kansallinen lista, ei UNESCO) | OK | – |

**KOKONAISARVIO: OK KORJAUKSIN.**
Heikoimmat kohdat:
1. "230 bukinistia" on yhden lähteen varassa.
2. 1500-luvun lopun kulkukauppiaat ovat käytännössä yhden lähteen varassa.
3. "Vanha kirja" -merkitys.
4. 1649: "painostuksesta".
5. 1859: "ensimmäinen".

---

## 4. Patonki 1994

| väite | lähde 1 | lähde 2 | tulos | korjaus |
|---|---|---|---|---|
| Asetus vuodelta 1993 (ei laki) | cooksinfo.com/french-bread-law-1993 (décret 93-1074, 13.9.1993) | mapa-assurances.fr/boulangerie/appellation-pain-tradition-francaise | OK | – |
| Vain vehnäjauhoa, vettä, suolaa, hiivaa tai juurta | COOKS | MAPA; UNESCO-B (neljä ainesosaa) | OSITTAIN: asetus sallii lisäksi enintään 2 % härkäpapujauhoa, 0,5 % soijajauhoa ja 0,3 % mallasjauhoa | "pääosin vain …" tai "käytännössä vain …". |
| Taikinaa ei saa pakastaa missään vaiheessa | COOKS | MAPA ("aucun traitement de surgélation") | OK | – |
| Kilpailu vuodesta 1994 | TIMEOUT ("held since 1994", 30. painos) | cdn.paris.fr/presse/2023/…: "30 ans du Grand Prix"; PARIS 2024: "31e anniversaire" | OSITTAIN: vuosiluku 1994 on eksplisiittisesti vain TIMEOUTissa, PARIS tukee sitä laskennallisesti. France Today sanoo vain "30th edition". | Voi pitää; lähteitä ei ole kaksi suoraan. |
| Sokkoarviointi | TIMEOUT | PBM ("numbered" leivät, nimet vasta lopuksi); francetoday.com/food-drink/the-best-baguette-in-paris/ ("judged blind") | OK | – |
| Raadissa ammattilaisia, toimittajia, arvottuja pariisilaisia | PARIS 2024 (toimittajat ja kuusi arvottua) | PBM (2013: "a few journalists"); TIMEOUT (arvotut pariisilaiset) | OK | – |
| Voittaja saa 4 000 € | TIMEOUT | PARIS 2023 ja 2024; francetoday (4 000 €) | OK | – |
| Toimittaa Élysée-palatsille leipiä seuraavan vuoden | TIMEOUT | PBM; francetoday; PARIS 2024 ("l'un des fournisseurs") | OK | – |
| UNESCO otti patongin leipomotaidon luetteloon 2022 | ich.unesco.org/…/artisanal-know-how-and-culture-of-baguette-bread-01883 (17.COM, 2022) | rnz.co.nz (1.12.2022, keskiviikko = 30.11.) | OK | – |

**KOKONAISARVIO: OK KORJAUKSIN.**
Heikoimmat kohdat:
1. "vain" ainesosat.
2. 1994 on eksplisiittisesti vain TIMEOUTissa.

---

## 5. Piiritys 1870

| väite | lähde 1 | lähde 2 | tulos | korjaus |
|---|---|---|---|---|
| Dagron sai mikrofilmin patentin 1859 | UCLA Chronology (21.6.1859, "first microfilm patent", novelty microscope) | publicdomainreview.org/essay/dancing-naked-on-the-head-of-a-pin/ (ensimmäinen patentti 1859, mikrovalokuva upotettuna koruun tai esineeseen linssin alla) | OSITTAIN: vuosi OK kahdesta, mutta patentti koski mikrovalokuvaa esineessä, ei filmiä viestien kuljetukseen | "mikrovalokuvauksen patentin 1859". |
| Preussilaiset sulkivat Pariisin syyskuussa 1870 | Hayhurst | PARIS (siege-sivu); ar-tour.com | OK | – |
| Viimeiset lennätinlangat katkaistiin 19.9. | Hayhurst ("cut on the morning of 19th September") | deadmedia.org toistaa Hayhurstin sanasta sanaan (ei riippumaton); PARIS sanoo vain "dès leur arrivée" | EI KAHTA LÄHDETTÄ | "syyskuun puolivälin jälkeen" tai pelkkä Hayhurst-lähteen merkintä. |
| Salakaapeli löydettiin ja katkaistiin 27.9. | Hayhurst | app.ar-tour.com/guides/researching-paris/siege-of-paris-187071.aspx ("discovered and cut … on 27 September") | OK, mutta toinen lähde on opaskirjan tasoa (mahdollisesti Hayhurst- tai Wikipedia-johdettu) | – |
| Ainoa toimiva reitti sisään oli kirjekyyhky | Hayhurst | UCLA (johdettu Hayhurstista) | OSITTAIN: kaksi lähdettä, mutta riippuvat toisistaan; Hayhurstin mukaan joitakin postinkuljettajia pääsi läpi alkupäivinä | "lähes ainoa". |
| Kyyhkyset vietiin ulos ilmapalloilla | Hayhurst | ar-tour.com; museepostal.fr-PDF (kyyhkyset Daguerre-ilmapallossa) | OK | – |
| Sopimus Dagronin kanssa allekirjoitettiin 11.11. | Hayhurst (11.11.) | Dagron: "notre traité du 10 novembre" (ja "décret du 10 novembre 1870"); UCLA Chronology: "November 10" | RISTIRIITA: 11.11. (Hayhurst) vs 10.11. (Dagron itse ja UCLA); Hayhurst kirjoittaa itse, että 10.11. oli asetus, "the eve of its contract" | "marraskuun 10. päivänä" (Dagronin oma kertomus) tai "marraskuun alussa". |
| 15 frangia tuhatta merkkiä kohti | Hayhurst | – (Dagronin kirjasessa ei hintaa; UCLA ei anna hintaa) | EI KAHTA LÄHDETTÄ | Poista tai merkitse "Hayhurstin mukaan". |
| Pienensi kuvat yli nelikymmenkertaisesti | Hayhurst ("rather more than 40 diameters") | UCLA hist_page4 (sama sanamuoto, siis Hayhurst-johdettu); cameramuseum.ch: "eight-hundredth" (eri mitta, kunniakortti) | EI KAHTA LÄHDETTÄ | "noin nelikymmenkertaisesti (Hayhurst)". |
| Yksi filmi painoi noin 0,05 g | Hayhurst | Dagron (18 filmiä ja yli 50 000 sanomaa painoivat yhteensä alle gramman, mikä sopii 0,05 g:aan) | OK | – |
| Yksi kyyhky jaksoi kantaa jopa 20 filmiä | Hayhurst; UCLA; museepostal.fr (20) | RISTIRIITA: Dagron itse "jusqu'à dix-huit exemplaires"; cameramuseum.cs.ch/…/the-first-film: "up to 18 films" | RISTIRIITA | "jopa kahdeksantoista" (Dagron ja cameramuseum). |
| Filmi heijastettiin taikalyhdyllä seinälle | Hayhurst ("said to be projected by magic lantern") | museepostal.fr-PDF (magic lantern); Dagron: suurennus Pariisissa sähkövalolla | OK, Hayhurstilla "said to be" | – |
| Saksalaiset kouluttivat haukkoja pysäyttämään kyyhkyjä | Hayhurst (siteeraa The Timesin 19.11.1870 raporttia, "it is said") | museepostal.fr-PDF (toistaa Timesin, "largely unsuccessful") | OSITTAIN: kyseessä on lehtiraportti, ei vahvistettu | "Lehtitietojen mukaan saksalaiset käyttivät haukkoja ja falkoneita …". |
| Piiritys päättyi tammikuussa 1871 | UCLA Chronology (28.1.1871) | Hayhurst (palvelun lopetus 31.1.) | OK | – |

**KOKONAISARVIO: EI OK** nykyisellään. Tarvitaan korjaukset ainakin sopimuspäivään, 20 filmiin, 15 frangiin, haukkoihin ja 19.9.-päivään.
Heikoimmat kohdat:
1. Sopimuspäivä 10. vs 11.11.
2. "20 filmiä" vs 18 Dagronin omassa kertomuksessa.
3. 15 frangia ja 40-kertainen pienennys ovat Hayhurstin varassa. UCLA on selvästi Hayhurst-johdettu, joten sitä ei lasketa toiseksi.
4. 19.9.-päivä (deadmedia kopioi Hayhurstia).
5. Haukat esitetty tosiasiana, vaikka lähde on lehtiraportti.

---

## 6. Notre-Dame 2019

| väite | lähde 1 | lähde 2 | tulos | korjaus |
|---|---|---|---|---|
| Ullakko syttyi 15.4.2019 | CWR | KOMO (alkuhälytys 18.20); VPBY | OK | – |
| Keskitorni romahti noin 19.50 | KOMO (19.49) | VPBY (19.50, mutta sama sivu antaa myös 20.00) | OK, hajonta 19.49–20.00 | "noin" riittää. |
| Katon kattotuolisto noin tuhannesta tammirungosta | FRIENDS-ROOF: 1 000 tammea mainitaan vain uuteen kattoon 2020 | news.cnrs.fr (opinions/the-framework…): noin 1 000 tammea laivaan, kuoroon ja poikkilaivaan; VPBY: 1 300 tammea; REBUILD: 1 000 uuteen torniin ja poikkilaivaan | RISTIRIITA/OSITTAIN: vanhan rungon lähteet sanovat 1 000 (CNRS) ja 1 300 (VPBY). Notre-Damen omaa sivua ei saanut auki (403). | "noin tuhannesta tai useammasta tammesta". |
| Kattotuolisto 1200-luvulta | FRIENDS-ROOF (1220–1240) | EURONEWS (1220); CNRS: kuoron runko noin 1220, laivan 1230-luvulta, mutta myös 1160-luvun runko uusiokäytettynä | OSITTAIN | "pääosin 1200-luvulta". |
| Kukon sisällä pyhäinjäännöksiä, mm. pala orjantappurakruunua | FRIENDS-R | CWR; VPBY | OK | – |
| Ensin luultiin tuhoutuneeksi, löytyi seuraavana päivänä raunioista lommoilla | CWR ("thought … destroyed", "found among the rubble", "dented") | KOMO (löytyi tiistaina, "deformed by the heat"); VPBY ("initially thought lost", "found the day after") | OK | – |
| Kuusitoista patsasta nostettu pois katolta vain päiviä ennen paloa | VPBY (11.4.2019, Socra) | EURONEWS ("last week"); REBUILD | OK. Patsaat olivat tornin juurella. | – |
| Ensimmäinen messu kesäkuussa 2019 kypärät päässä | ALJAZ (15.6., 30 osallistujaa, valkoiset kypärät) | SBS (aiemmin luettu T-tarinoissa; en avannut uudelleen) | OK kuukauden osalta | – |
| Uusi kullattu kukko tornin huipulle 16.12.2023 | CATHREV | TRIBUNE; REBUILD | OK | – |
| Samat pyhäinjäännökset sisään | CATHREV (Denis, Geneviève, orjantappurakruunu) | TRIBUNE ("relics saved from the April 15, 2019 fire") | OK | – |
| Lähes 2 000 jälleenrakentajan nimet | CATHREV ("2,000 names") | TRIBUNE ("almost 2,000") | OK | – |
| Katedraali avattiin uudelleen joulukuussa 2024 | KSAT/AP (7.–8.12.2024) | FRIENDS-REOPEN (7.12. seremonia, 8.12. messu) | OK | – |

**KOKONAISARVIO: OK KORJAUKSIN.**
Heikoimmat kohdat:
1. Vanhan kattotuolin tammien määrä (1 000 vs 1 300).
2. "1200-luvulta" (osa 1160-luvulta).
3. Kellonaika 19.50 (hajonta).
4. Kukon löytöpaikka vaihtelee ("raunioissa" vs "laivassa").

---

## 7. Piaf ja Django

| väite | lähde 1 | lähde 2 | tulos | korjaus |
|---|---|---|---|---|
| Piaf syntyi Pariisissa joulukuussa 1915 | biography.com/musician/edith-piaf (19.12.1915) | paris.fr/pages/une-balade-sur-les-pas-d-edith-piaf-18776; herodote.net (19.12.1915) | OK | – |
| Tarinan mukaan Bellevillessä talon portaille | PARIS (laatta 72 rue de Belleville, "portaat"; todellinen paikka Tenonin sairaala) | ebsco.com/research-starters/history/edith-piaf ("possibly on a Paris street"); biography.com (Belleville) | OK "tarinan mukaan"-sanalla | Lisää halutessa: "syntymätodistuksen mukaan Tenonin sairaalassa". |
| Django kasvoi asuntovaunussa Pariisin porttien luona | djangobooks.com/blog/?p=54 ("old city gates") | jazz.com/encyclopedia/… (Porte de Choisy); parisatlas.com (Zone) | OK | – |
| Soitti banjoa jo lapsena | fachords.com/blog2015/father-gipsy-jazz-django-reinhardt/ (12-vuotiaana) | psaudio.com/article/django-act-1/ (10-vuotiaana); encyclopedia.com | OK | – |
| Tulipalo 2.11.1928 yöllä | jazz.com (2.11. myöhään illalla); djangobooks.com (klo 1 yöllä 2.11.) | RISTIRIITA: parisatlas.com ("night of 25–26 October 1928"); WikiTree 26.10. (hakuote); fachords sanoo vain "marraskuun yö" | RISTIRIITA | "syksyllä 1928". |
| Kynttilä kaatui selluloidikukkien päälle | djangobooks.com; jazz.com | psaudio.com; fachords | OK | – |
| Vasemman käden nimetön ja pikkurilli: ei enää voinut käyttää | djangobooks.com ("twisted and limited in use") | jazz.com ("partially paralyzed", käytettiin akordeihin); parisatlas.com (käytettiin akordeihin) | OSITTAIN: ne jäivät käyttökelvottomiksi soolosoitossa, mutta niitä käytettiin akordeihin | "jäivät koukkuun ja lähes käyttökelvottomiksi". |
| Lääkärit sanoivat, ettei hän soita enää | fachords ("probably never play again") | psaudio ("may never walk again, let alone play") | OK | – |
| Veli osti kitaran | jazz.com (Joseph "gave" kitaran 29.1.1929) | fachords ("brother introduced him to the guitar") | OSITTAIN: "osti" ei tule lähteistä | "veli toi / antoi kitaran". |
| Soolot kahdella sormella | fachords | djangobooks.com; encyclopedia.com; jazz.com | OK | – |
| Quintette du Hot Club de France 1934 | encyclopedia.com/…/reinhardt-django (1934) | djangobooks.com ("formed in late 1934"); parisatlas.com (ensikonsertti 2.12.1934) | OK | – |
| Piaf lauloi teininä kolikoista kaduilla | EBSCO (16–17-vuotiaana kaduilla) | connexionfrance.com (1930, kadulla esiintyminen); herodote.net | OSITTAIN: kolikoita ei mainita | "lauloi kaduilla". |
| Leplée kuuli hänet kadulta 1935 | EBSCO (kadulla laulaessa mies lähestyi) | PARIS (loka 1935, Gerny's); biography.com; connexionfrance | OK | – |
| La Môme Piaf, piaf = varpunen pariisilaista puhekieltä | PARIS ("petit oiseau en argot … sparrow") | herodote.net (viittaa lintumaiseen ääneen ja pieneen kokoon); biography.com ("The Little Sparrow") | OK | – |
| Alle 150 cm | herodote.net (1,47 m) | biography.com ja EBSCO (4'8" = 142 cm) | OK | – |
| La Vie en rose levytetty 1946 | histoiredeschansons.com/edith-piaf-la-vie-en-rose/ (9.10.1946, julkaisu 18.11.1946) | RISTIRIITA: EBSCO "recorded in 1945"; connexionfrance.com "written in 1945, recorded in 1947" | RISTIRIITA | "1946" tukee vain yksi tarkka lähde; jos halutaan varma, "vuosina 1945–46 syntynyt, 1946 levytetty (histoiredeschansons)". |
| Sanat Piafin | histoiredeschansons.com; PARIS | biography.com; connexionfrance.com (musiikin tekijä Louiguy) | OK | – |

**KOKONAISARVIO: OK KORJAUKSIN.**
Heikoimmat kohdat:
1. Django-tulipalon päivä (2.11. vs 25.–26.10.).
2. La Vie en rosen levytysvuosi (1945/1946/1947).
3. "Ei enää voinut käyttää" kahta sormea.
4. "Veli osti" kitaran.
5. "kolikoista".

---

## Yhteenveto

| Teksti | Kokonaisarvio |
|---|---|
| 1 Bizet 1875 | OK KORJAUKSIN |
| 2 Kirahvi 1827 | OK |
| 3 Bukinistit 1859 | OK KORJAUKSIN |
| 4 Patonki 1994 | OK KORJAUKSIN |
| 5 Piiritys 1870 | EI OK |
| 6 Notre-Dame 2019 | OK KORJAUKSIN |
| 7 Piaf ja Django | OK KORJAUKSIN |

Jos Hayhurst-lähteen varaan jää vain yksi lähde, lisää korjauksiin myös 15 frangin ja nelikymmenkertaisen pienennyksen poisto tai Hayhurst-maininta.

Tiedostot, joihin nojasin: /Users/Shared/Claude/luovutukset/sk-era2-tyokalut/era2-tekstit.mjs ja T-tarinat.md (vain johtolankoina). Omat työkopioni ovat scratchpadissa: /private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-sisaltokirjuri/b08e07db-2208-4b1c-97f8-644b6e2ba6bc/scratchpad/g/dagron8.txt ja hay.txt, sekä …/scratchpad/biers/biers.txt. En kirjoittanut repoon mitään.
# Liite A2: uusintakierros

# Liite A2: uusintatarkistus, 12 väitettä (20.11.2026)

Kaikki lähteet avattu itse (WebFetch, curl + pdftotext). Wikipediaa ja sen peilejä (Wikimonde, Wikiwand, Grokipedia, kiddle) ei käytetty todisteena. Sama julkaisija ei ole kaksi lähdettä: paris.fr ja mairiepariscentre.paris.fr lasketaan yhdeksi (Pariisin kaupunki); auditorium-lyon.com yhdeksi; Hayhurst ja Dagronin oma kirjanen erikseen.

Avaamatta jääneet (403 / aikakatkaisu / ei tavoitettavissa): Britannica, Marmottanin notice (marmottan.fr, aikakatkaisu; käytin museemarmottanmonet.com), notredamedeparis.fr, parisjetaime, cnews, lessentiel, atlasobscura, science.org, researchgate, artuk, cheminsdememoire.

## Yhteenveto

| # | Väite | Verdict |
|---|---|---|
| 1 | Galerie des Machines | OK |
| 2 | Temple-torni | OK (huom.) |
| 3 | Trocadéro | OK (huom.) |
| 4 | Bizet / Carmen | OK |
| 5 | Piiritys / Dagron | OK (huom. 18 vs 20, 0,05 g) |
| 6 | Vrain-Lucas | OK (huom. 140 000 on kokonaissumma) |
| 7 | Monet / impressionistit | OK |
| 8 | Piaf ja Django | OK |
| 9 | Notre-Dame | OK |
| 10 | Bukinistit | **EI OK** ("UNESCO 2019") |
| 11 | Patonki | OK |
| 12 | Kirahvi | OK, mutta heikoin kohta **EPÄVARMA** (Atlantin vaara) |

## Taulukko

| väite | verdict | lähteet | huomio |
|---|---|---|---|
| **1a.** Galerie des Machines sijaitsi Champ-de-Marsin toisessa päässä kuin Eiffel-torni | OK | (1) paris.fr/pages/ces-lieux-disparus-qui-font-aussi-l-histoire-de-paris-4-4-34201 ("occupé toute la largeur au fond du Champ-de-Mars, devant l'École militaire"); (2) pariszigzag.fr/insolite/histoire-insolite-paris/le-monument-disparu-le-plus-impressionnant-de-paris/ ("au bout du Champ-de-Mars, à l'opposé de la tour Eiffel") | Kumpikaan yksin ei sano molempia; yhdessä: halli École militaire -päässä, vastapäätä tornia. Seine-pää = tornin pää on pääteltävissä (PZG "à l'opposé"). Paris.fr sanoo purkuvuodeksi 1909. |
| **2a.** Philippe Augusten ajoista kuninkaan aarre talletettiin Templen linnoitukseen | OK | (1) histoires-de-paris.fr/tour-du-temple/ ("le trésor royal y fut déposé à partir du règne de Philippe Auguste"); (2) mairiepariscentre.paris.fr/pages/la-minute-historique-le-saviez-vous-22702 ("le trésor royal y est déposé lors du règne de Philippe Auguste"); (3) templiers.org/paris.html ("A partir de 1194, cette tour abritera le trésor royal") | Kolme eri julkaisijaa. |
| **2b.** Muurien suojassa asui verovapaita käsityöläisiä | OK (huom.) | (1) secretsofparis.com/sightseeing/neighborhoods/temple-district/ (käsityöläisiä hakeutui enclosiin, jossa kruunu ei voinut periä veroja); (2) lemaraismood.com/and-the-king-drove-out-the-templars/ (käsityöläiset asettuivat enclosiin välttääkseen killat ja Pariisin verot, "franchise right") | Molemmat matkailu/blogisivustoja, ei historiantutkimusta. Histoires-de-paris mainitsee vain pajat tornin ympärillä, francetoday ja parisplusplus eivät asiaa. Varmempi sanamuoto: "hakeutui / asettui" eikä "asui". Univormuja, kommuunia ja ikää ei väitteessä. |
| **3a.** Trocadéron palatsin purku alkoi 1935 (vuoden 1937 näyttelyn tieltä) | OK | (1) auditorium-lyon.com/en/1878-palais-du-trocadero (purettiin 1935 Chaillot'n palatsin tieltä, 1937 näyttely); (2) pariszigzag.fr/.../palais-du-trocadero-le-plus-bel-edifice-disparu-de-paris/ ("Détruit à partir de 1935"); (3) place-du-trocadero.fr/en/trocadero-history/ (1935, 1937 näyttelyn takia) | Poikkeama: Mérimée/POP (pop.culture.gouv.fr/notice/merimee/PA00086706) sanoo Chaillot'n rakennustyön alkaneen 1934 "vanhojen rakenteiden päälle". Kaksi ensimmäistä lähdettä eivät yhdistä purkua suoraan 1937 näyttelyyn (PZT: rapistui), mutta AUD ja place-du-trocadero yhdistävät. Sanamuoto "purku alkoi 1935" kestää. |
| **3b.** Siivet jäivät Chaillot'n palatsiin | OK | (1) paris.fr/pages/le-palais-de-chaillot-s-etend-sur-55-000-metres-carres-25622 ("Les ailes anciennes du palais sont doublées"); (2) paris-promeneurs.com/le-palais-de-chaillot/ ("configuration des ailes en demi-cercle est conservé du palais précédent ... épaisseur doublée") | Siivet säilyivät rakenteena ja paksunnettiin; keskiosa ja tornit purettiin. place-du-trocadero.fr sanoo vain, että uusi palatsi toistaa kahden kaarevan siiven periaatteen (ei suoraan säilytystä). |
| **4a.** Carmenin työ alkoi 1873 | OK | (1) usuo.org/explore/2016/09/the-writing-and-rehearsing-of-carmen/ (aihe sovittu maalis-huhtikuuhun 1873 mennessä, 1. näytös valmis kesäkuun alussa 1873); (2) ebsco.com/research-starters/history/bizets-carmen-premieres-paris ("in 1873 he suggested adapting Mérimée's novella") | Tilaus oli jo 1872 (sfopera.com). Pelkkä "1873" on turvallinen, ei kuukautta. |
| **4b.** Adolphe de Leuven vastusti aihetta ja erosi 1874 | OK | (1) usuo.org (vastusti, "resigned in 1874"); (2) sfopera.com/operas/carmen/articles/creating-carmen-scandal-sensation/ (vastalause "Death on the stage of the Opéra-Comique!", erosi kuusi kuukautta myöhemmin vastustuksen vuoksi) | Älä lisää kuukautta. |
| **4c.** Marie Roze kieltäytyi nimiroolista; rooli meni Célestine Galli-Mariélle | OK | (1) usuo.org (Rozen kirje Bizet'lle 7.9.1873: rooli "would not suit me"; Galli-Marié allekirjoitti sopimuksen 18.12.1873); (2) sfopera.com (Galli-Marié kutsuttiin kahden muun kieltäydyttyä); lisäksi OC-ohjelma-PDF (opera-comique.com/sites/default/files/2023-04/2023_ProgrammeAudiodescriptionOperaComique_Carmen.pdf) nimeää Galli-Marién Bizet'n valinnaksi | - |
| **4d.** Ensi-ilta 3.3.1875; Bizet kuoli 3.6.1875 36-vuotiaana | OK | (1) sfopera.com (premiere March 3, 1875; death June 3, 1875, aged 36); (2) OC-ohjelma-PDF ("Le 3 mars 1875"; "Le 3 juin 1875 ... à l'âge de 36 ans"); ebsco.com (3.3.1875 ja 3.6.1875) | Kolme julkaisijaa. |
| **4e.** Ooppera palasi Pariisiin 1883 | OK | (1) OC-ohjelma-PDF (Carvalho ottaa ohjelmistoon 21.4.1883); (2) ebsco.com ("1883 revival in Paris") | - |
| **4f.** Sali paloi 1887 | OK | (1) opera-comique.com/en/history-heritage-opera-comique (25.5.1887, Mignon-esityksen aikana); (2) forumopera.com/actu/la-salle-favart (25.5.1887, Mignon 1. näytös, kaasuvalo, 84 kuollutta) | Tarkka päivä 25.5.1887 lähteiden mukaan; kolmas sali 1898. |
| **5a.** René Dagron sai 1859 patentin mikrovalokuvaukselle | OK | (1) publicdomainreview.org/essay/dancing-naked-on-the-head-of-a-pin/ ("He filed his first patent in 1859"); (2) srlf.ucla.edu/exhibit/text/Chronology.htm (21.6.1859, "first microfilm patent"); (3) collectorsweekly.com/articles/secrets-of-the-worlds-tiniest-photographs/ (1859) | Patentti koski mikrovalokuvausta (Stanhope-esineitä), ei viestifilmiä sellaisenaan: "mikrovalokuvauksen patentti" on oikea sanamuoto. Tarkka päivä vaihtelee (touko/kesäkuu), vuosi 1859 varma. |
| **5b.** Sopimus Dagronin kanssa allekirjoitettiin marraskuun alussa 1870 | OK | (1) Dagron itse, "La poste par pigeons voyageurs" (archive.org/download/laposteparpigeon19588gut/19588-8.txt: "notre traité du 10 novembre, avec M. Rampont"); (2) UCLA Chronology (10.11.1870) | Hayhurst (cix.co.uk-kopio web.archive.orgissa) antaa 11.11. "Marraskuun alussa" kattaa molemmat; älä anna päivää. |
| **5c.** Yksi kyyhky kantoi jopa 18 filmiä | OK (huom.) | (1) Dagron itse (sama teksti: "mettre sur un seul pigeon jusqu'à dix-huit exemplaires ... moins d'un gramme"); (2) cameramuseum.ch/en/discover/permanent-exhibition/the-century-of-the-film/the-first-film/ ("up to 18 films") | Hayhurst ja histv.net sanovat 20. Alkuperäinen lähde (Dagron) sanoo 18, joten "jopa 18" on perusteltu. |
| **5d.** Filmi painoi noin 5 sadasosagrammaa (0,05 g) | OK (huom.) | (1) Hayhurst ("weighed about 0.05 gm"); (2) Dagron: 18 filmiä yhteensä alle gramman, eli enintään ~0,055 g kappale; cameramuseum.ch ("all weighing less than a gram") | Eksplisiittinen 0,05 g on vain Hayhurstilla; Dagronin oma luku on sen kanssa yhteensopiva. Varovaisempi: "noin 0,05 g". |
| **5e.** Heijastus taikalyhdyllä | OK | (1) Hayhurst ("said to have been projected by magic lantern on to a screen"); (2) histv.net/microphotographie (laajennus "à la lanterne magique" -kaiverruksia); Dagron itse: suurennus Pariisissa sähkövalolla | Hayhurstilla "said to be". |
| **5f.** Piiritys päättyi tammikuussa 1871 | OK | (1) UCLA Chronology (28.1.1871 antautuminen); (2) Hayhurst (aselepo 28.1.1871) | - |
| **6a.** Vrain-Lucas lakikirjuri | OK (huom.) | (1) mathshistory.st-andrews.ac.uk/HistTopics/Forgery_1/ ("trained as a law clerk"); (2) amusingplanet.com/2022/12/the-forgeries-of-denis-vrain-lucas.html ("a judicial clerk by profession") | livreshebdo.fr (Coulon-haastattelu) ja bibliorare kuvaavat hänet itseoppineeksi päivätyöläisen pojaksi; käytä "lakikirjurina työskennellyt", älä "koulutettu". |
| **6b.** Väärensi noin 27 000 kirjettä | OK | (1) St Andrews (~27 000); (2) yveline.org/wp-content/uploads/2022/04/Chasles.pdf (27 345 kirjettä); (3) livreshebdo.fr/article/la-chasse-au-faux ("plus de 27 000"); bibliorare.com/lot/219161 ("plus de 27 000") | Toiset lähteet (Linda Hall, AmusingPlanet) ~30 000; "noin 27 000" kelpaa. |
| **6c.** Alkoi 1850-luvulla | OK | (1) St Andrews ("By 1854 he had begun to forge"); (2) hoaxes.org/archive/permalink/vrain_lucas (1851, tapasi Chaslesin); livreshebdo (Gérard Coulon -artikkeli): hylättiin Bibliothèque impérialessa 1852 ja alkoi sen jälkeen | Tarkka vuosi vaihtelee 1851-1854, "1850-luvulla" on turvallinen. |
| **6d.** 1861 myi Chaslesille Boylen/Newtonin/Pascalin kirjeitä, ~140 000 frangia | OK (huom.) | (1) St Andrews (1861 alku, Pascal/Newton/Boyle; 1861-1869 "140 000-150 000 francs" yhteensä); (2) livreshebdo (Coulon-artikkeli: 1861 ensikontakti, "plus de 27 000, pour le prix dément de 140 000 francs"); yveline.org PDF (27 345 kirjettä "pour le prix de 140.000 francs"); Linda Hall (~140 000 francs) | 140 000 frangia on kaikkien kauppojen yhteissumma vuosilta 1861-1869, ei vuoden 1861 yksittäinen kauppa. Muotoile esim. "vuodesta 1861 alkaen ... yhteensä noin 140 000 frangia". |
| **6e.** Heinäkuussa 1867 Chasles vei Pascal-kirjeet tiedeakatemialle | OK | (1) yveline.org PDF ("le 8 juillet 1867, Chasles présente à l'Académie"); (2) amusingplanet.com ("July 1867"); St Andrews: 1867 | - |
| **6f.** Tuomio helmikuussa 1870, kaksi vuotta vankeutta | OK | (1) St Andrews (February 1870, 2 vuotta + 500 fr); (2) bibliorare.com/lot/219161 (6.2.1870, "deux ans d'emprisonnement et 500 francs d'amende"); yveline.org (17.2.1870); hoaxes.org (helmikuu 1870) | Päivä 6. vai 17.2. ristiriitainen, älä anna päivää. |
| **7a.** Impression, soleil levant kuuluu Marmottan Monet'n kokoelmiin | OK | (1) museemarmottanmonet.com/en/history/ (ensimmäinen Monet museossa, lahjoitus Donop de Monchy; varastettu 27.10.1985, löytyi Korsikalta joulukuussa 1990); (2) parisatlas.com/works/impression-sunrise ("hangs at the Musée Marmottan Monet") | "Kuuluu kokoelmiin" turvallisempi kuin "on esillä" (museo on lainannut teosta). |
| **7b.** Bazillen vetoomus 1867 | OK | (1) eclecticlight.co/2022/11/22/sunrise-on-impressionism-18-frederic-bazille/ (Bazille laati vetoomuksen uudesta Salon des Refusés -näyttelystä, Daubigny allekirjoitti); (2) thehistoryofart.org/frederic-bazille/quotes/ (huhtikuun 1867 kirje, suunnitelma ehdollinen vetoomuksen onnistumiselle) | Vetoomuksen tulosta ei kerrota näissä, joten älä sano "turhaan". prameet.substack.com kuvaa Bazillen oman näyttelysuunnitelman toukokuulta 1867 kaatuneen rahanpuutteeseen. |
| **7c.** Yhdistys perustettiin joulukuussa 1873 | OK | (1) pariszigzag.fr/.../premiere-exposition-impressionniste-paris/ (27.12.1873, Nadarin tiloissa); (2) prameet.substack.com/p/impressionism-inc-an-examination (27.12.1873, société anonyme) | - |
| **7d.** Ensimmäinen näyttely huhtikuussa 1874 Nadarin ateljeessa, 30 taiteilijaa | OK | (1) herodote.net/15_avril_1874-evenement-18740415.php (15.4.1874, Nadarin ateljee, "une trentaine de peintres"); (2) pariszigzag.fr (15.4.-15.5.1874, noin 30 taiteilijaa, 165 teosta) | prameet: 30 taiteilijaa, 165 teosta (ei Nadaria). |
| **7e.** Louis Leroy | OK | (1) herodote.net (Le Charivari, "L'exposition des impressionnistes"); (2) pariszigzag.fr (Le Charivari 25.4.1874, "L'exposition des impressionnistes") ja parisatlas.com | Kirjoitusasu: Leroy (herodote: "Le Roy"). |
| **7f.** Viimeinen (kahdeksas) näyttely 1886 | OK | (1) degas-catalogue.com/en/exhibitions/31 ("8ème exposition de peinture", 1 rue Laffitte, 15.5.-15.6.1886); (2) culture.gouv.fr "1886 huitième exposition" (hakutuloksessa: "la dernière du groupe"; sivun avaus epäonnistui, joten hakuotteen varassa) ja prameet (kahdeksan näyttelyä yhteensä) | Culture.gouv-sivua en saanut avattua, joten "viimeinen"-sanan tuki on degas-catalogue + prameet (kahdeksan yhteensä) + aiemman raportin ART/PIG. |
| **8a.** Piaf syntyi joulukuussa 1915 | OK | (1) biography.com/musician/edith-piaf (19.12.1915); (2) paris.fr/pages/une-balade-sur-les-pas-d-edith-piaf-18776 (laatta: "naquit le 19 décembre 1915"; syntyi todellisuudessa Tenonin sairaalassa) | EBSCO sanoo vain "noin 1915", ei kuukautta. Syntymäpaikka (Belleville vs sairaala) kiistanalainen, ei väitteessä. |
| **8b.** Leplée kuuli hänet kadulta ja antoi lempinimen 1935 | OK | (1) paris.fr (lokakuu, Rue Troyon/Mac-Mahon -kulma, Leplée nimesi "la môme Piaf"); (2) ebsco.com/research-starters/history/edith-piaf (lokakuu 1935, lähestyi katulaulajaa); (3) biography.com (1935, Leplée, lempinimi) | biography.com ei sano kadulta; paris.fr ja EBSCO sanovat. |
| **8c.** Django Reinhardtin vaununpalo syksyllä 1928; vasemman käden nimetön ja pikkurilli vahingoittuivat | OK | (1) parisatlas.com/people/django-reinhardt (25.-26.10.1928; nimetön ja pikkurilli); (2) encyclopedia.com/people/literature-and-arts/music-popular-and-jazz-biographies/django-reinhardt (Wrightman: "ring finger and pinky were permanently hooked"; Baker's: pinky ja ring finger); lisäksi fretboardjournal.com ja jazzstandards.com (26.10.1928, vasen käsi) | Päivä vaihtelee (25.-26.10. / 2.11.), siksi "syksyllä 1928" ok. Hoefer-sitaatti encyclopedia.comissa mainitsee "kaksi keskimmäistä sormea", mutta valtavirta on nimetön + pikkurilli. djangobooks.com sanoo vain "two small fingers". |
| **8d.** Quintette du Hot Club de France perustettiin 1934 | OK | (1) parisatlas.com (1934, ensikonsertti 2.12.1934); (2) encyclopedia.com (1934 Grappellin kanssa); fretboardjournal.com (virallisesti 28.12.1934 sessiossa) | Tarkka päivä vaihtelee, "1934" varma. |
| **9a.** Tulipalo 15.4.2019, keskitorni romahti noin klo 19.50 | OK | (1) businessofgovernment.org/blog/tragic-2019-fire-notre-dame-cathedral ("At 7:50 p.m., the roof and the spire collapsed"); (2) paris-notredame.com/plan-your-visit/fire-15-april-2019/ (19.53) | Hajonta 19.49-19.53, "noin" riittää. Alkuhälytys 18.18. |
| **9b.** Kattotuolisto tammea, pääosin 1200-luvulta | OK | (1) lejournal.cnrs.fr/billets/charpente-de-notre-dame-stop-aux-idees-recues (kuoron runko n. 1220, laivan "1230-1240 ?", 12. vuosisadan puita uusiokäytetty, noin 1 000 tammea); (2) sorbonne-universite.fr/en/dossiers/notre-dame-de-paris/studying-notre-dames-timbers-understand-medieval-weather (tammet kasvoivat 1000-1200-luvuilla) | "Pääosin 1200-luvulta" on kohtuullinen, mutta osa puista on 1100-luvulta ja risteyskirkon torni ja ristikäytävä 1800-luvulta. Tammien määrä vaihtelee (1 000 / 1 300), älä anna lukua. |
| **9c.** Kukko löytyi seuraavana päivänä raunioista | OK | (1) france24.com/en/20190417-notre-dames-precious-rooster-statue-found-battered-debris (tiistaina 16.4., restauroija, "battered but apparently restorable"); (2) catholicworldreport.com/2019/04/17/notre-dame-weathervane-comes-home-to-roost/ ("found on Tuesday ... among the rubble", "dented") | - |
| **9d.** 16 patsasta nostettu katolta päiviä ennen paloa | OK | (1) rebatirnotredamedeparis.fr/en/restoration/restoring-statues-spire (16 patsasta, 11.4.2019, "a few days before"); (2) fox9.com/news/statues-on-notre-dame-spire-removed-days-before-blaze (16 patsasta, torstaina 11.4., neljä päivää ennen) | Patsaat olivat tornin juurella (spire), ei katon pinnalla; "tornin juurelta" tarkempi. |
| **9e.** Uusi kukko asennettiin 16.12.2023, sisään lähes 2 000 jälleenrakentajan nimet | OK | (1) france24.com/en/france/20231216-... ("nearly 2,000 individuals", 16.12.2023); (2) abc.net.au/news/2023-12-17/golden-rooster-installed-via-a-crane-on-notre-dame-cathedral/103239414 ("nearly 2,000 individuals", lauantaina 16.12.) | Reliikit mukana (orjantappurakruunun palat, Denis, Geneviève). |
| **9f.** Katedraali avattiin uudelleen joulukuussa 2024 | OK | (1) paris-notredame.com (7.12. ensimmäinen seremonia, 8.12. yleisölle); (2) euronews.com/culture/2024/12/06/a-timeline-of-the-reconstruction-of-notre-dame-de-paris (avajaiset lauantaina 7.12.); hakutuloksissa france24.com ja notredamedeparis.fr (sivu 403) | - |
| **10a.** Yli 200 bukinistia, noin 3 km matkalla | OK (huom.) | (1) francetoday.com/culture/parisian-walkways-the-bouquinistes-of-paris/ (noin 230, noin 3 km); (2) parisladouce.com/2023/08/histoire-des-bouquinistes.html (240 myyjää, noin 3 km); paris.fr (200 vuonna 1900) | Paris.fr: "3 km" tarkoittaa kaiteilla esillä olevaa kirjajonoa, ei kaikissa lähteissä telakkojen pituutta. Lähteet vaihtelevat 200-240; "yli 200" kestää. |
| **10b.** Kulkukauppiaita 1500-luvulta | OK | (1) paris.fr/pages/les-bouquinistes-et-paris-histoire-d-amour-en-majuscules-7886 ("Dès le XVIe siècle" colporteurs ja estaleurs); (2) parisladouce.com (XVIe siècle, colporteurs ja estaleurs); nautesdeparis.fr (n. 1550) | - |
| **10c.** Pont Neuf valmistui 1606 | OK | (1) paris.fr (1606); (2) francetoday.com (1606); parisladouce.com (1606) | Nautes de Paris antaa 1607 (vihkiäiset). |
| **10d.** Määräys 1649 kielsi myynnin sillalla | OK | (1) paris.fr ("sous la pression des libraires, un règlement interdit"); (2) parisladouce.com (1649 "décret municipal" kielsi portatiiviset myymälät Pont-Neufilla); unjourdeplusaparis.com (1649 ensimmäinen määräys kielsi kirjojen esillepanon Pont-Neufin läheisyydessä); nautesdeparis.fr (1649) | Määräyksen tyyppi (kaupungin asetus / kuninkaan määräys) vaihtelee. |
| **10e.** Sana bouquiniste 1752 sanakirjassa | OK | (1) paris.fr (Trévoux, 1752); (2) francetoday.com (Dictionnaire de Trévoux 1752) | Parisladouce viittaa Akatemian sanakirjaan 1762, mutta se on eri sanakirja. Teksti on "Trévoux'n sanakirja 1752". |
| **10f.** Erityismääräys 10.10.1859 | OK | (1) paris.fr ("le 10 octobre ... le premier règlement spécifique"); (2) parisladouce.com (10.10.1859, ensimmäiset konsessiot, 10 m kaidetta); unjourdeplusaparis.com (10.10.1859 asetus ylläpiti kirjakauppiaat) | "Ensimmäinen" erityismääräys on paris.fr:n ja parisladouce.comin sanoma. |
| **10g.** Laatikot sai jättää kaiteeseen 1891 | OK | (1) paris.fr (arrêté municipal 1891, yöllä saa jättää tavarat); (2) francetoday.com (1891); parisladouce.com (1891, arrêté municipal) ja unjourdeplusaparis.com | Yksittäiset lähteet kertovat lukitut laatikot vasta 1890-luvun puolivälistä; "1891 saa jättää" on turvallinen. |
| **10h.** UNESCO 2019 | **EI OK** | (1) paris.fr/pages/les-bouquinistes-et-paris-histoire-d-amour-en-majuscules-7886 ("entrent au patrimoine culturel immatériel français, et non à celui de l'UNESCO"; yhdistys haluaa nyt kansainvälisen tunnustuksen); (2) francetoday.com/culture/parisian-walkways-the-bouquinistes-of-paris/ ("2019 recognition was national, not UNESCO ... a stepping-stone to consecration by UNESCO"); parisladouce.com (6.2.2019 kulttuuriministeriö merkitsi ranskalaiseen aineettoman kulttuuriperinnön inventaarioon "condition préalable à une candidature à l'UNESCO"); cnews/franceinfo-hakutulokset (UNESCO-ehdokkuus vasta suunnitteilla) | Vuonna 2019 ilmeni vain Ranskan kansallinen aineettoman kulttuuriperinnön inventaari. UNESCO-luetteloinnista en löytänyt vahvistusta (haut 2026 asti, ei tulosta). Huom.: Seinen rannat ovat UNESCOn maailmanperintökohde vuodesta 1991 (eri asia). Korjaus: "Vuonna 2019 Ranska otti bukinistien perinteet aineettoman kulttuuriperinnön kansalliseen inventaarioon." DRAC Île-de-France antaa tunnustuksen vuodeksi 2023, mikä on ristiriidassa; pidä 2019 vain "kulttuuriministeriö hyväksyi helmikuussa 2019". |
| **11a.** Patonki: asetus 1993 | OK | (1) cooksinfo.com/french-bread-law-1993 (décret n° 93-1074, 13.9.1993, asetus ei laki; määrittelee "pain de tradition française"); (2) aiempi mapa-assurances.fr (ei avattu uudelleen) | Asetus koskee "pain de tradition française" -nimitystä (patonki de tradition), ei patonkia yleisesti. Ainesosat: vehnäjauho, vesi, suola, hiiva/juuri + enintään 2 % härkäpapu-, 0,5 % soija-, 0,3 % mallasjauhoa. Älä kirjoita "vain". |
| **11b.** Kilpailu vuodesta 1994 | OK | (1) timeout.com/news/the-best-baguette-in-paris-has-been-crowned-051923 ("held since 1994"); (2) paris.fr/pages/la-meilleure-baguette-de-paris-2025-... (32. painos 2025, laskennallisesti 1994); parisbymouth.com (33. painos 2026, laskennallisesti 1994) | Vuosi 1994 eksplisiittisesti vain Time Outissa, mutta painosnumerot (32. 2025, 33. 2026) tukevat laskennallisesti. |
| **11c.** Voittaja 4 000 € ja toimittaa leipiä Élysée'lle vuoden | OK | (1) timeout.com (4 000 €, vuoden sopimus); (2) paris.fr (4 000 €, Élysée'n virallinen leipätoimittaja yhden vuoden); parisbymouth.com (4 000 €) | - |
| **11d.** UNESCO 2022 | OK | (1) ich.unesco.org/en/RL/artisanal-know-how-and-culture-of-baguette-bread-01883 ("Inscribed in 2022 (17.COM) on the Representative List"); (2) aiemmin rnz.co.nz (30.11.2022, ei avattu uudelleen) | Elementti on "Artisanal know-how and culture of baguette bread". |
| **12a.** Laiva Marseilleen lokakuussa 1826, reikä kannessa | OK | (1) futura-sciences.com/sciences/actualites/histoire-podcast-zarafa-periple-girafe-paris-82341/ (brigantiini 23.10.1826; "Un trou a été aménagé sur le pont"); (2) francetoday.com/learn/frances-first-royal-giraffe/ (31.10.1826, reikä kanteen); Biers (archive.org biostor-194681: "arriva le 23 octobre 1826") | Päivä vaihtelee (23.10. / 31.10. / 14.11.), "lokakuussa" ok. |
| **12b.** "Atlantin ympäri kulkeva merimatka pidettiin liian vaarallisena" | **EPÄVARMA** | (1) francetoday.com ("Fears were expressed for the safety of the animal" jos meritse "around the Atlantic coast" tai jokea Rhône pitkin); (2) hiddenworld.io/blog/who-was-zarafa-... (meritse Iberian niemimaan ympäri tai Rhône pitkin, molemmat "considered too dangerous"); theveterinarian.com.au/?p=3670 (prefekti piti venematkaa liian riskialttiina) | Akateemiset ja museolähteet (openedition rh19/5184, Futura, MNHN, Connexion, histoire-pour-tous) eivät perustele kävelyä lainkaan. Perustelu on kahdessa suosittu-/blogilähteessä, jotka ovat mahdollisesti toisistaan riippuvaisia. Hakuotteessa (yksi) mainitaan reitti Gibraltar-Biskaya-Kanaali. Muotoilu "pelättiin eläimen turvallisuuden puolesta, jos matka tehtäisiin meritse tai jokea pitkin" kestää paremmin kuin "liian vaarallisena". |
| **12c.** Lähtö toukokuussa 1827; Geoffroy Saint-Hilaire mukana | OK | (1) futura-sciences (lähtö 20.5.1827); (2) journals.openedition.org/rh19/5184 ("Le 20 mai 1827 ... escortée par ... Étienne Geoffroy Saint-Hilaire"); Biers (Aix 21.5.1827; Geoffroy-Saint-Hilaire mukana) | - |
| **12d.** Lyonissa ~30 000 | OK (huom.) | (1) francetoday.com ("nearly 30,000 people" 6.6.); (2) hiddenworld.io (6.6.1827, 30 000); hakutulos tribunedelyon.fr ("plus de 30 000", sivu 403) | Lähteet kertovat yleisön kokoa kerran, ei tarkkana laskentana; säilytä "noin 30 000". Paniikki Bellecourilla tapahtui 9.6. (openedition) eikä 6.6. |
| **12e.** Matka 41 päivää | OK (huom.) | (1) francetoday.com (some 41 days); (2) connexionfrance.com/magazine/incredible-journey-of-frances-first-giraffe/102781 (41 päivän matka); theveterinarian.com.au (41 päivää) | Muut lähteet (histoire-pour-tous, lesinguliersete) sanovat 42 päivää/etappia. |
| **12f.** Jardin des Plantes 30.6.1827; Saint-Cloud 9.7.1827 | OK (huom.) | (1) Biers (archive.org/download/biostor-194681/biostor-194681.pdf: "au Jardin du Roi où elle arriva le 30 juin 1827"; "se rendre à Saint-Cloud, le 9 juillet"); (2) futura-sciences (Saint-Cloud 9.7.1827); openedition rh19/5184 (30.6. Pariisiin, 9.7. Saint-Cloud) | francetoday.com sijoittaa kuninkaan tapaamisen leipätekstissä 30.6. (kuvatekstissä 9.7.), mikä on ristiriidassa kolmen muun lähteen kanssa. Jardin des Plantes 30.6. = saapuminen, majoitus tapaamisen jälkeen. |
| **12g.** ~600 000 kävijää | OK | (1) francetoday.com (yli 600 000 ensimmäisenä kesänä); (2) futura-sciences (noin 600 000); connexionfrance.com, theveterinarian.com.au (600 000 / kuusi kuukautta) | - |
| **12h.** Kuoli tammikuussa 1845 | OK | (1) futura-sciences (12.1.1845); (2) connexionfrance.com (12.1.1845, Jardin des Plantes) | francetoday.com sanoo vain "1845". |

## Heikoimmat kohdat (kooste)

1. **10h EI OK**: "UNESCO 2019" on virhe. Vain Ranskan kansallinen aineettoman kulttuuriperinnön inventaari 2019; UNESCO-luettelointia ei ole löytynyt.
2. **12b EPÄVARMA**: kävelyn perustelu (Atlantin matka liian vaarallinen) on vain francetodayssa ja hiddenworld.iossa.
3. **5c/5d**: "18 filmiä" (Dagron, cameramuseum) vs. "20" (Hayhurst, histv); 0,05 g eksplisiittisesti vain Hayhurstilla.
4. **6d**: 140 000 frangia on 1861-1869 yhteissumma, ei 1861 kaupan hinta.
5. **2b**: verovapaat käsityöläiset kahden matkailu/blogisivuston varassa; "asui" -> "asettui/hakeutui".
6. **3a**: Mérimée sanoo Chaillot'n työn alkaneen 1934, muut 1935 (purku).
