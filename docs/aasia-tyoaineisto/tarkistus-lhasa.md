# Lhasa — faktantarkistus

Tarkistettu 21.8.2026. Lähteet: en-Wikipedia raakateksti (action=raw,
uusinnat verkkovirheissä) artikkeleista Lhasa, Potala Palace,
Norbulingka, Sera Monastery, Drepung Monastery, Ganden Monastery,
History of Tibet, Barkhor, British expedition to Tibet, Tibet.
Koordinaattien ristiintarkistus: Nominatim (nominatim.openstreetmap.org)
ja Overpass API (overpass-api.de sekä peili
maps.mail.ru/osm/tools/overpass/api/interpreter, jota käytettiin koska
overpass-api.de katkoi yhteyden/aikakatkaisi toistuvasti).

## 1. Virheet ja korjaukset

### 1.1 Jokhangin koordinaatti on virheellinen Wikipediassa (RATKAISTU)

**Väite faktapohjassa:** Jokhang-temppelin koordinaatti olisi
29°39′11″N 91°02′51″E (suoraan en-Wikipedian infoboksista), ja tämä
merkittiin epävarmaksi, koska (a) se on identtinen Drepung-luostarin
pituusasteen kanssa ja (b) Jokhang-artikkelin oma leipäteksti väittää
temppelin sijaitsevan n. 1000 m Potalan ITÄPUOLELLA, mikä ei täsmää
annetun koordinaatin kanssa (joka asettaisi Jokhangin Potalan
LÄNSIPUOLELLE).

**Oikea tieto:** Jokhang-artikkelin infoboksin koordinaattirivi
(`{{coord|29|39|11|N|91|2|51|E|...}}`) on virheellinen pituusasteeltaan
— se on todennäköisesti kopiointivirhe, jossa Jokhangin riville on
päätynyt Drepung-luostarin pituusaste (91°02′51″E on myös Drepungin
oikea, vahvistettu pituusaste, ks. kohta 1.2). Sekä Nominatim että
Overpass paikantavat todellisen Jokhang-temppelin osoitteeseen
**29,6529°N, 91,1318°E** (≈ 29°39′10″N 91°07′55″E) — n. 8,1 km
Wikipedian ilmoittamaa pituusastetta idempänä. Leveysaste (29°39′11″N)
sen sijaan on Wikipediassa oikein (ero todelliseen ~20 m).

Tämä korjattu sijainti täsmää Jokhang-artikkelin oman leipätekstin
väitteen kanssa: Potala on 91°07′01″E, joten korjattu Jokhang
(91°07′55″E) on n. 1,4 km Potalan itäpuolella — samaa suuruusluokkaa
kuin artikkelin oma "n. 1000 m itään" -väite.

- Lähde (koordinaatit): Nominatim-haku "Jokhang Temple Lhasa" →
  lat 29,6528598, lon 91,1317978 (osm relation 2358701).
- Lähde (koordinaatit): Overpass-haku `name:en~"Jokhang"` bbox-rajattuna
  → way 226201282 keskipiste lat 29,6526903 lon 91,1316006; relation
  2358701 keskipiste lat 29,6528713 lon 91,1318443 — kaikki kolme
  lähdettä yhtenevät (~20 m sisällä toisistaan), Overpass ja Nominatim
  eivät ole ristiriidassa (<100 m ero), joten Overpassin arvoa
  käytetään taulukossa 3 alla.

### 1.2 Drepung-luostarin koordinaatti on OIKEIN Wikipediassa (RATKAISTU)

Toisin kuin faktapohjan epäily antoi ymmärtää, Drepungin oma
Wikipedia-koordinaatti (29°40′35″N 91°02′51″E ≈ 29,6764°N, 91,0475°E)
on tarkka: Overpass löytää Drepung-luostarin (node 345009556, way
176874374) osoitteesta 29,6768°N, 91,0469°E — ero Wikipediaan vain
~65 m, alle 100 m:n kynnyksen. Nominatim antaa saman (29,676°N,
91,048°E). Drepungin koordinaattia EI siis tarvitse korjata; vain
Jokhangin rivi oli virheellinen, ja sekaannus syntyi identtisestä
pituusasteesta kahdella eri kohteella.

**Johtopäätös molemmista:** kohdekartan taulukossa (osio 4 alla)
Jokhangin koordinaatti on korvattu Overpass-arvolla, Drepungin
alkuperäinen Wikipedia-arvo on säilytetty sellaisenaan (vahvistettuna).

### 1.3 Lhasan korkeusristiriita — kannanotto

En-Wikipedia "Lhasa" -artikkelissa esiintyy todellakin kolme lukua:
- leipäteksti: "about 3600 m" (lähde: *National Geographic Atlas of
  China*, 2008)
- infoboksin `elevation_m`: 3656
- säälaatikon otsikkorivi: "elevation 3649 m" (1991–2020-normaalit)
- (neljäskin luku samasta artikkelista: Chengguan-piirin — Lhasan
  keskuskaupunkipiirin — elevaatio ilmoitetaan erikseen 3650 m:ksi)

**Kannanotto:** Kolmesta pääluvusta 3649 m ja 3656 m ovat lähempänä
toisiaan ja lähempänä myös neljättä (Chengguan-piirin 3650 m) —
nämä kolme muodostavat n. 3649–3656 m:n haarukan, joka vaikuttaa
tarkemmalta/virallisemmalta mittaustavalta (infoboksin ja
säähavaintoaseman arvot). Leipätekstin "about 3600 m" on
todennäköisesti karkeampi pyöristys yleisatlaksesta eikä paikkakohtainen
mittaus. Suositus: käytä lehtitekstissä ensisijaisesti n. 3 650–3 656 m
ja mainitse "n. 3 600 m" vain karkeana pyöristyksenä, jos molempia
halutaan käyttää. Tätä ei ole varmennettu Wikipedian ulkopuolisella
lähteellä (esim. Wikidata-haku epäonnistui rate limit -virheeseen),
joten kyseessä on sisäiseen johdonmukaisuuteen perustuva kannanotto,
ei lopullinen ratkaisu.

## 2. Muut varmennetut faktat (ei virheitä)

Seuraavat faktapohjan väitteet tarkistettiin suoraan artikkelien
raakatekstistä ja todettiin paikkansapitäviksi sellaisenaan:

- Potala: rakennustyöt alkoivat 1645, Dalai-lama muutti Valkoiseen
  palatsiin 1649, rakennustyöt jatkuivat 1694 asti, Punainen palatsi
  1690–1694, "ulkoseinät 3 vuodessa, sisustus 45 vuodessa" (suora
  lainaus artikkelista), 13 kerrosta, yli 1000 huonetta, 10 000
  pyhäkköä, 200 000 patsasta, 119 m kukkulasta / yli 300 m laaksosta.
  — en-Wikipedia "Potala Palace"
- Gushri Khan luovutti 1642 "kolmetoista osaa" Tiibetiä Viidennelle
  dalai-lamalle ("the thirteen parts of Tibet, which is the whole").
  — sama
- Norbulingka: Seitsemäs dalai-lama, rakentaminen alkoi 1755
  (huom: artikkelin yhdessä lauseessa myös "1740s" — pieni sisäinen
  epätarkkuus Wikipediassa itsessään, mutta valtaosa artikkelista ja
  infoboksi käyttävät 1755:tä, kuten faktapohjakin), aiemmin
  joutomaata/pensaikkoa, 36 ha, dalai-lamojen kesäasunto 1780-luvulta,
  Shoton/jogurttijuhla elokuun alussa. — en-Wikipedia "Norbulingka"
- Sera 1419 (Jamchen Chojey), Drepung 1416 (Jamyang Chojey/Choge),
  Ganden 1409 (Je Tsongkhapa) — kaikki täsmäävät. — vastaavat artikkelit
- Drepung: Freddie Spencer Chapmanin 1936–37-raportti, 7 700 munkkia
  ("sometimes as many as 10,000"), "largest monastery in the world" —
  suora lainaus. — en-Wikipedia "Drepung Monastery"
- Ganden: Wangbur-vuori, 4 300 m, n. 40 km koilliseen Lhasasta,
  perustaja Tsongkhapa 1409. — en-Wikipedia "Ganden Monastery"
- Barkhor: alkuperä 600-luvulla (7th century A.D.), n. 1000 m pitkä
  kehätie, myötäpäivään kierto. — en-Wikipedia "Barkhor"
- Tiibetin sulkeutuminen 1792, 1800-luvulla vain kolme länsimaalaista
  (Thomas Manning sekä Huc ja Gabet) pääsi Lhasaan. — en-Wikipedia
  "History of Tibet"
- Britannian salainen kartoitus alkoi 1865, panditit, Nain Singh
  mittasi Lhasan pituus-/leveysasteen ja korkeuden sekä jäljitti
  Yarlung Tsangpo -jokea. — sama
- Younghusbandin retkikunta: lähti joulukuussa 1903, 3000 taistelijaa
  + 7000 tukijoukkoa, syy Lordi Curzonin pelko Venäjän vaikutuksesta
  Agvan Dorzhievin kautta, saapui Lhasaan elokuussa 1904, Dalai-lama
  paennut Mongoliaan, tappiot 202 kaatunutta + 411 muuta kuolemaa
  brittipuolella, 2000–3000 tiibetiläispuolella, Lhasan sopimus,
  vetäytyminen syyskuussa. — en-Wikipedia "British expedition to Tibet"
- Qinghai-Tiibet-rata avautui 2006, kohoaa 5072 m:iin, lisähappea
  ilmastoinnissa ja henkilökohtaiset happinaamarit. Lhasa Gonggarin
  lentokenttä rakennettu 1965. Lhasan joki (Kyi Chu) 315 km, laskee
  Yarlung Zangpoon Qüxüssä. — en-Wikipedia "Lhasa"
- Tsampa Tiibetin peruselintarvike, momo-nyytit, jakinjogurtti/-voi
  arkiruokaa ja jogurtti arvostuksen kohde, voitee suosittu juoma. —
  en-Wikipedia "Tibet"

## 3. Korjattu/varmennettu koordinaattitaulukko

| # | Kohde | Alkuperäinen Wikipedia-koordinaatti | Tila | Overpass/Nominatim-koordinaatti | Etäisyys keskustasta (uusi laskelma) |
|---|---|---|---|---|---|
| 1 | Lhasa, keskipiste | 29°39′14″N 91°07′03″E (Wikipedia-rajapinta) | ennallaan | — | (keskipiste) |
| 2 | Potala-palatsi | 29°39′28″N 91°07′01″E | ennallaan | — | ~0,44 km (P) |
| 3 | Ramoche-temppeli | 29°39′31″N 91°07′49″E | ennallaan | — | ~1,34 km (IK) |
| 4 | Norbulingka | 29°39′14″N 91°05′30″E | ennallaan | — | ~2,49 km (L) |
| 5 | **Jokhang-temppeli** | ~~29°39′11″N 91°02′51″E~~ | **KORJATTU** | 29,6529°N 91,1318°E (≈29°39′10″N 91°07′55″E) | ~1,38 km (IE/ESE) |
| 6 | Drepung-luostari | 29°40′35″N 91°02′51″E | **VAHVISTETTU** (ero Overpassiin ~65 m) | 29,6768°N 91,0469°E | ~7,19 km (LL/NW) |
| 7 | Sera-luostari | 29°41′53″N 91°08′00″E | ennallaan (laskelma tarkennettu) | — | ~5,13 km (P) — alkup. dok. ilmoitti ~4,5 km, oma uusintalaskelma antaa ~5,1 km |
| 8 | Ganden-luostari | 29°45′28,8″N 91°28′30″E | ennallaan (laskelma tarkennettu) | — | ~36,3 km (IK) — alkup. dok. ilmoitti ~38 km, ero pieni |
| 9 | Lhasan rautatieasema | 29°37′30″N 91°04′07″E | ennallaan (laskelma tarkennettu) | — | ~5,70 km (LL) — alkup. dok. ilmoitti ~5,0 km, ero pieni |

(P = pohjoinen, IK = itäkoillinen, L = länsi, LL = lounas, IE/ESE =
itäkaakko/itäkoillinen väli, NW = luode)

Etäisyydet laskettu pallogeometrialla (asteet × 111 km, pituusasteille
× cos(29,65°) ≈ 0,868).

**Rajausehdotus (päivitetty):** Kohteet 1–5 (nyt myös korjattu
Jokhang) mahtuvat n. 2,5 km × 2,5 km neliöön keskustan ympärillä —
tiiviimpi kuin alkuperäinen ehdotus, koska Jokhang siirtyi 6,5 km:n
"epävarmasta" sijainnista 1,4 km:n päähän keskustasta. Drepung (~7,2 km
LL) ja Sera (~5,1 km P) ovat selvästi kauempana; Ganden (~36 km) on
aivan omissa sfääreissään — suositus jättää Ganden pois kohdekartasta
kokonaan, kuten alkuperäinen faktapohja jo ehdotti.

## 4. Post-1959-sisällön tarkistus

Kaikki faktapohjan sivuehdotukset, nostot, jaksot ja kuvatekstiehdotukset
käytiin läpi: yksikään ei viittaa vuoden 1959 jälkeisiin tapahtumiin
(kansannousu, kulttuurivallankumous, museoituminen, nykyinen
hallintoasema, kävijärajoitukset). Uudempi materiaali, jota Wikipedia-
artikkeleissa runsaasti on (esim. Lhasa-artikkelin rivi 163: "In 1959,
following a failed uprising, the 14th Dalai Lama and his associates
fled Tibet..." ja rivi 453 Kulttuurivallankumouksesta), on tunnistettu
mutta jätetty tarkoituksella käyttämättä — linjaus pitää. Ainoa
ajallisesti myöhäisin tapahtuma on H4-noston Younghusband-retkikunta
(1903–1904), joka on selvästi ennen 1950 ja saman "1873-hengen"
tutkimusmatkailija-aihepiiriä kuin muutkin hyväksytyt kohteet.

## Yhteenveto

Lhasan faktapohja on pääosin tarkka: kaikki tarkistetut päivämäärät,
mitat ja tapahtumakuvaukset täsmäävät en-Wikipedian raakatekstiin.
Merkittävin löydös on Jokhang-temppelin Wikipedia-koordinaatin
pituusastevirhe (todennäköinen kopiointivirhe Drepungin arvosta),
joka on nyt korjattu Overpass/Nominatim-mittauksella 29,6529°N,
91,1318°E:ksi — tämä myös vahvistaa artikkelin oman tekstiväitteen
Jokhangin sijainnista Potalan itäpuolella. Drepungin koordinaatti
osoittautui alun perin oikeaksi. Korkeusristiriidassa suositellaan
haarukkaa n. 3 650–3 656 m ensisijaisena arvona. Post-1959-rajaus on
noudatettu johdonmukaisesti koko aineistossa.
