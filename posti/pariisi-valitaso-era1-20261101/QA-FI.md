# Pariisin välitaso, erä 1 — vertailuversioiden QA 1.11.2026

Tilaus #1586–1587 ja d2d1386:n kokolisäys. Valittu r2c2 otto6 ja r2c3 otto7; yhteensä14 kokonaan uuden kuvan generointia (7+7). Alkuperäiset ja hylätyt otot säilyvät tuotantohistoriassa. r2c2:n viimeisin otto7 pienensi Louvren noin170px:iin, joten sitä ei valittu250px-tavoitteeseen. Yhtään kuvaa ei paikallisesti skaalattu, värikorjattu, rajattu tai paikattu lopputulokseksi. Toimituskuvat ovat alkuperäiset1536×1024RGB PNG:t tavumuuttumattomina. Diagnostiset rajaukset ja viivaimet ovat vain mittausta varten.

## Tulos: ARVIOON, MITTA- JA SAUMAPOIKKEAMIA

Kuvapari on toimituskelpoinen natiivina arviointia varten. Se EI läpäise kaikkien fyysisten kokotavoitteiden tai saumattoman zoomauksen lopullista hyväksyntää. Kokolisäys on mukana uusissa otoissa, mutta kaikkia kokoja ei saatu toteutumaan samanaikaisesti. Suurin tunnettu virhe on r2c2:n Louvre: koko palatsin kaikkien siipien leveys noin370px tavoitteen250px sijaan. Pelkän itäosan mittaaminen antaisi harhaanjohtavan pienemmän luvun. Sainte-Chapelle on myös tavoitetta leveämpi.

| Pala | Kohde | Tavoite px | Mitattu noin px |
| --- | --- | ---: | ---: |
| r2c2 | Louvre | 250 | 370 ± 10 |
| r2c2 | Notre-Dame | 165 | 155 ± 5 |
| r2c2 | Sainte-Chapelle | 40 | 50 ± 5 |
| r2c2 | Eiffel-base | 145 | 153 ± 5 |
| r2c2 | Pantheon | 125 | 126 ± 5 |
| r2c2 | Invalides-gold-cup | 70 | 75 ± 5 |
| r2c2 | Arc-de-Triomphe | 50 | 50 ± 3 |
| r2c3 | Louvre | 250 | rajautuu pois |
| r2c3 | Notre-Dame | 165 | 154 ± 5 |
| r2c3 | Sainte-Chapelle | 40 | 52 ± 5 |
| r2c3 | Pantheon | 125 | 127 ± 5 |

Mitat ovat käsin luettuja vaakasuuntaisia näkyvän siluetin arvioita natiivikuvasta. Pihat, puutarhat, kadut ja varjot eivät ole rakennuksen kokoa. Invalidit tarkoittaa kultaisen kupolilakin leveyttä laajan v3:n lähteen mukaisesti. Tarkka segmentointi tai metrigeometria ei ole varmennettu.

## Ulkoasu ja limitys

- Valkoinen suorakulmainen G-kehys ei jatku erillisenä kehyskatuna. Korttelit ylittävät entiset länsi- ja etelärajat.
- Vahvasti korostetut pääkohteet, pienemmät tavalliset talot, yksityiskohtaiset katot ja puut. Ei näkyviä tekstejä, lentokoneita tai lintuja.
- r2c2 x1203–1535 vastaa r2c3 x0–332. Joen pääkohdat ja maamerkit ovat lähellä samoja paikkoja. Rakennusten yksityiskohdat, sillat, veneet, puut ja rantaviivojen reunat eivät ole pikseli-identtiset.
- Vesivärin HSV-heuristiikan kylläisyysmediaanit: r2c2 0,386; r2c3 0,283; hyväksytty lähitason G 0,451. Oikean palan vesi on vasenta hillitympi; sävyero on olemassa.
- Limityksen vesimaskien IoU noin0,714 (y400–790). Tämä on värivalinnan diagnostiikka, ei geometrisen kohdistuksen todistus. Sarakkeissa1250↔47 päävesijaksot y563–593↔563–596; 1450↔247 y694–714↔693–715. Sarakkeessa1350↔147 jakson pituus eroaa y652–691↔651–674.

Karttaseppä kokoaa parin, vertaa saumaa ja laaja-/lähitason zoomausta sekä vie vertailun PT:lle. Tätä toimitusta ei saa tulkita tarkkojen mittojen, omistajan, runtime-kytkennän tai julkaisun hyväksynnäksi. Muut10 välitason palaa eivät ole valtuutettuja eikä niitä ole aloitettu.
