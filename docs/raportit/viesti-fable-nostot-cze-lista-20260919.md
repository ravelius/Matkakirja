# Viesti Fablelle: Tšekin hahmotelmanostojen kohdelista (vaihe 1)

19.9.2026, Sonnet-sisältösessio "Matkakirja Sonnet nostot", haara `sonnet-nostot-cze`
(pohja origin/main bc0996c4, v1960). **27 ehdotusta, odotan hyväksyntää ennen vaihetta 2.**
Sisältöjä ei ole vielä kirjoitettu. Vaiheessa 2 mukaan tulevat myös rahavisat (~10 noston kenttä `visa`).

## Miten lista tarkistettiin

- Koordinaatit haettu en-Wikipedian rajapinnasta (`prop=coordinates`, 19.9.2026); artikkeli taulukossa. Yhtään lukua ei ole arvattu.
- Laudat ja fokuslehden osuma laskettu pelin omalla työkalulla (`tools/johda-maastokohteet.mjs` `laudat`, `osuuLehteen('CZE')`): **27/27 osuu Tšekin fokuslehteen ja on pelin karkean CZE-renkaan sisällä** (renkaan reunalla Adršpach 0,5, Podyjí 0,8, Lipno 1,9, Cheb 1,9; muut ≥ 4,3).
- **Pelikaupunki: Praha** (`cityCountry`); lähin ehdotus on Křivoklát 18,3, joten yksikään ei ole kaupungin kohdalla (raja 7).
- **Tšekissä on jo 24 nostoa** (`nostojenKarttapaikat()`): Sněžka, Labe, Vltava, **Kutná Hora, Český Krumlov, Plzeňský Prazdroj**, Mendelin luostari, Litomyšl, hevosrautatie, Jablonec, Děčín, Tábor, Olomouc, Jáchymov, **Moravský kras**, Boubín,
  **Lednice ja Valtice**, **Karlštejn** sekä Prahan syvennykset ja kolme skandaalia. Siksi pyytämäsi Karlštejn, Český Krumlov, Kutná Hora, Plzeň, Sněžka, Moravian karst ja Lednice–Valtice **ovat jo pelissä eivätkä ole listalla**. Terezín ja muut leirit jätetty pois ohjeen mukaan.
- **Lähimmät nykyisiin (lautayksikköä)**: **Slavkov (Austerlitz) – Mendelin luostari 6,2 ja Karlovy Vary – Jáchymov 6,5 (kumpikin alle rajan 7; Karlovy Vary pyysit, Austerlitz on tärkein taistelupaikka; Fable voi hyväksyä kuten Kinderdijkin 6,1)**,
  Kamenický Šenov – Děčín 9,2, Bohemian Paradise – Jablonec 9,0, Zatec – Kelleyn skandaali 8,8, Lipno – Český Krumlov 9,5; muut ≥ 10,5. Nostot keskenään ≥ 7,4 (Kuks – Königgrätz 7,4 pienin).
- **Pudotettu liian lähellä olevana**: Böömin Sveitsi/Hřensko (3,2 Děčínistä), Hluboká-linna (3,5 hevosrautatiestä), Mikulov (5,5 Lednicestä), Ještěd (6,1 Jablonecista), Rožmberkin lammikko (6,9 hevosrautatiestä).
- Ei suuria kaupunkeja: Praha, Brno, Ostrava, Plzeň, České Budějovice, Olomouc ym. jätetty pois. Mukana on pieniä kaupunkeja ja paikkoja, joiden merkitys on kohde: Karlovy Vary, Mariánské Lázně (kylpylät), Cheb (Wallenstein), Telč, Třebíč, Žďár, Kroměříž.
- Tyypit ovat pelin oman `KOHDE_TYYPPISYMBOLIT`-taulun arvot (luonto = vuori / saari / jarvi / meri / joki; muut historia, kulttuuri, ruoka, kauppa, tekniikka). Luolalle (Hranice) ja hiekkakivikaupungeille ei ole omaa tyyppiä: Hranice `jarvi` (Hranice Lake), kalliot `vuori`.
- **1873-näkökulma (Böömi ja Määri Itävalta-Unkarissa)**: nappi-alaotsikoissa hallitsija Franz Joseph tarvittaessa; Königgrätz 1866 on vasta 7 vuotta sitten, Hussiitit ym. taustaa. Wallenstein murhattiin Chebissä 1634.
- Lähdesääntö: artikkelien johdanto-osat on luettu ja avainväitteet grep-tarkistettu (Sax-tyyppiset sivuväitteet vain jos koko artikkeli tukee). Vaiheessa 2 kirjoitan tekstit vain artikkelin tukemista väitteistä ja kirjaan poikkeamat.

## Lista

### Luonto (8)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 1 | hahmotelma-bohemian-paradise | Böömin paratiisi | vuori | 50,5197 / 15,1706 | Bohemian Paradise | Hiekkakalliomuodostelmien maisema Jičínin ja Turnovin välissä; kaupungit on rakennettu hiekkakivestä. |
| 2 | hahmotelma-adrspach | Adršpach-Teplicen kalliot | vuori | 50,6114 / 16,115 | Adršpach-Teplice Rocks | Hiekkakivipylväiden kalliokaupunki Kuninkaanhovin maakunnassa. Renkaan reunalla 0,5. |
| 3 | hahmotelma-praded | Praděd | vuori | 50,0833 / 17,2333 | Praděd | Hrubý Jeseníkin korkein vuori, 1 491 m, Tšekin viidenneksi korkein. |
| 4 | hahmotelma-hranice | Hranicen syvänne | jarvi | 49,532 / 17,7508 | Hranice Abyss | Maailman syvin tulvinut luola (yli 519 m), Hranice-järven pohjaton kuilu. |
| 5 | hahmotelma-machovo | Máchovo jezero | jarvi | 50,5831 / 14,6497 | Lake Mácha | Doksyn lampi, joka on nimetty runoilija Karel Hynek Máchan mukaan. |
| 6 | hahmotelma-lipno | Lipnon tekojärvi | jarvi | 48,7 / 14,0667 | Lipno Reservoir | Vltavan padotun tekojärven Tšekin suurin vesialue. Renkaan reunalla 1,9. |
| 7 | hahmotelma-podyji | Podyjín kansallispuisto | joki | 48,85 / 15,9 | Podyjí National Park | Dyje-joen syvä metsälaakso Itävallan rajalla; yhdessä Thayatalin kanssa "kansainvälinen puisto". Renkaan reunalla 0,8. |
| 8 | hahmotelma-lysa-hora | Lysá hora | vuori | 49,5458 / 18,4475 | Lysá hora | Moravian–Sleesian Beskidien korkein vuori. |

### Historia (8)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 9 | hahmotelma-slavkov | Austerlitzin taistelu | historia | 49,1281 / 16,7625 | Battle of Austerlitz | 2.12.1805: Napoleon löi Venäjän ja Itävallan yhdistetyn armeijan Slavkovin luona. **Mendel 6,2.** |
| 10 | hahmotelma-pernstejn | Pernštejnin linna | historia | 49,4508 / 16,3183 | Pernštejn Castle | Marmorilinnaksi kutsuttu goottilainen linna Etelä-Määrissä. |
| 11 | hahmotelma-kromeriz | Kroměřížin arkkipiispanlinna | historia | 49,2989 / 17,3931 | Kroměříž | Olomoucin piispojen ja arkkipiispojen kaupunki; linna ja puutarhat Unescon perintöä. |
| 12 | hahmotelma-krivoklat | Křivoklátin linna | historia | 50,0378 / 13,8725 | Křivoklát Castle | Böömin kuninkaiden linna 1100-luvulta metsästysmetsän keskellä. |
| 13 | hahmotelma-cheb | Cheb | historia | 50,0794 / 12,3706 | Cheb | Kaupunki, jossa Albrecht von Wallenstein murhattiin 24.2.1634. Renkaan reunalla 1,9. |
| 14 | hahmotelma-kuks | Kuks | historia | 50,4017 / 15,8889 | Kuks | Kreivi Sporckin barokkinen kylpylä ja sairaala (1707–1715), Matthias Braunin veistokset. |
| 15 | hahmotelma-koniggratz | Königgrätzin taistelu | historia | 50,27 / 15,75 | Battle of Königgrätz | 3.7.1866: Preussi löi Itävallan Sadován luona Hradec Královén lähellä (7 vuotta ennen 1873). |
| 16 | hahmotelma-zvikov | Zvíkovin linna | historia | 49,437 / 14,1885 | Zvíkov Castle | Varhaisgoottilainen linna Vltavan ja Otavan yhtymäkohdan yllä. |

### Kulttuuri ja ruoka (8)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 17 | hahmotelma-karlovy-vary | Karlovy Vary | kulttuuri | 50,2306 / 12,8725 | Karlovy Vary | Kaarle IV:n perustama kylpyläkaupunki (Karlsbad). **Jáchymov 6,5.** |
| 18 | hahmotelma-marianske-lazne | Mariánské Lázně | kulttuuri | 49,9647 / 12,7011 | Mariánské Lázně | Marienbad, 1800-luvun kulta-ajan kylpyläkaupunki, jonne tulivat Euroopan hallitsijat. |
| 19 | hahmotelma-telc | Telč | kulttuuri | 49,1842 / 15,4528 | Telč | Renessanssin vanhakaupunki linnoineen, Unescon perintöä. |
| 20 | hahmotelma-trebic | Třebíč | kulttuuri | 49,215 / 15,8817 | Třebíč | Juutalaiskortteli ja Pyhän Procopiuksen basilika yhdessä Unescon perintöä. |
| 21 | hahmotelma-zdar | Vihreä vuori (Žďár) | kulttuuri | 49,5802 / 15,9421 | Pilgrimage Church of Saint John of Nepomuk | Santini Aichelin viimeinen työ: tähtimuotoinen pyhiinvaelluskirkko (1719 alkaen), Unescon perintöä. |
| 22 | hahmotelma-zatec | Žatec | ruoka | 50,33 / 13,5444 | Žatec | Yli 700 vuotta vanha Saaz-humalan viljelyperinne. |
| 23 | hahmotelma-lostice | Loštice | ruoka | 49,7425 / 16,9278 | Loštice | Olomoucké tvarůžky -aromijuuston kotikaupunki. |
| 24 | hahmotelma-stramberk | Štramberk | ruoka | 49,5917 / 18,1175 | Štramberk | Štramberkin korvat -leivonnaisten kotikaupunki. |

### Tekniikka ja kauppa (3)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 25 | hahmotelma-mlada-boleslav | Mladá Boleslav | tekniikka | 50,4125 / 14,9044 | Mladá Boleslav | Laurin & Klementin autotehdas 1895 (myöhemmin Škoda); Tšekin autoteollisuuden keskus. |
| 26 | hahmotelma-pribram | Příbram | tekniikka | 49,6883 / 14,0092 | Příbram | Habsburgien monarkian tuottoisin hopeakaivos 1700-luvulla; Svatá Hora -pyhiinvaellus. |
| 27 | hahmotelma-kamenicky-senov | Kamenický Šenov | kauppa | 50,7775 / 14,4711 | Kamenický Šenov | 1600-luvulta lasinvalmistuksen kaupunki, lasikoulu ja lasimuseo. |

## Huomiot Fablelle

1. **Alle 7:n parit**: Slavkov – Mendel 6,2, Karlovy Vary – Jáchymov 6,5. Vaihtoehdot: pudota Slavkov (Austerlitzin voi jättää pois) tai hyväksy.
2. **Herkät kohteet**: ei leirejä; Königgrätz, Austerlitz ja Cheb ovat taistelu-/murhapaikkoja ilman verta kuvissa (tekstissä asiallinen); Wallenstein tekstissä lyhyesti.
3. **Kuvariskit**: Adršpach (kalliot), Kroměříž ja Kuks voivat olla vaikeita; varasuunnitelma Jizerské hory, Kladruby (hevosjalostus) tai Konopiště, jos kaksi kelvollista kuvaa ei löydy.
4. **Rahavisat**: vaiheessa 2 kirjoitan ~10 visaa (joka kolmas nosto, eri tyyppejä, 4 vaihtoehtoa, vastaus noston tekstistä).
