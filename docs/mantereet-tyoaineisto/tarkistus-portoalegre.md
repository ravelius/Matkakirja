# Porto Alegre -faktapohjan riippumaton tarkistus

Tarkistettu 24.8.2026 en-Wikipedian raakatekstistä (`action=raw`, curl +
proxy-CA-bundle; Commons-kategoriat `action=query&prop=categoryinfo` samalla
proxylla, User-Agent-otsikolla — ilman sitä Commons-API palautti 403:n,
ja rajapinta 429-rajoitti toistuvasti rinnakkaisten faktakoostaja-ajojen
takia; uusinnat kasvavalla viiveellä, aina lopulta onnistuen) seuraavista
artikkeleista: **Porto Alegre**, German Brazilians, Italian Brazilians,
Rio Grande do Sul, Ragamuffin War, History of Porto Alegre, Timeline of
Porto Alegre, Porto Alegre Public Market, Grêmio FBPA, SC Internacional,
Usina do Gasômetro, Iberê Camargo Foundation, Farroupilha Park, Kaingang,
Mbyá Guaraní people, 2024 Rio Grande do Sul floods. Koordinaatit
tarkistettu suoraan artikkeleiden `{{coord}}`-malliteista (yksi,
Fundação Iberê Camargo, Wikidata-tietueesta Q4175872) ja laskettu itse
etäisyydet/suunnat Python-skriptillä koordinaattieroista faktapohjan
ilmoittamalla menetelmällä (asteet × 111 km, pituusasteet × cos(30,034°)).
Commons-kategoriat tarkistettu `categoryinfo`-kutsulla jokaiselle 30
kategorialle (sekä oikeiksi väitetyille että vääriksi väitetyille
arvatuille nimille) erikseen.

**Yleisarvio: tämä on poikkeuksellisen huolellisesti tehty faktapohja.**
Kävin läpi käytännössä jokaisen yksittäisen vuosiluvun, päivämäärän,
nimen, lainauksen ja lukuarvon 12 nostosta, 5 jaksosta, 3 johdannosta ja
kohdekartasta — ja lähes kaikki osuivat täsmälleen oikein, mukaan lukien
kaikkein vaikein ja tehtävänannon kriittisimmäksi nimeämä kohta (saksalais-
1824 / italialais-1875-siirtolaisuuden vuosiristiriita, ks. A). Löysin
kuitenkin kaksi todellista **Commons-kategoriavirhettä** (yksi
kategorianimi ei ole olemassa lainkaan; kaksi kategoriaa sekoittaa
kategorian koon kuvamäärään) ja yhden **laskentavirheen** (kohdekartan
ilmansuunnat). Ei yhtään sisältövirhettä varsinaisessa historiallisessa
tai kulttuurisessa asiasisällössä.

---

## A. KRIITTISIN TARKISTUS — saksalais-1824/italialais-1875-kehys: OIKEIN

Tehtävänannon mukaan tämä oli koko faktapohjan kriittisin kohta, koska
Porto Alegren oma en-Wikipedia-pääartikkeli sisältää tästä sisäisen
ristiriidan. Tarkistin väitteen neljästä eri artikkelista:

- **"Porto Alegre" -pääartikkeli, History-osio** sanoo kirjaimellisesti:
  *"In 1824, immigrants from all over the world started arriving,
  especially German, Italian, Spanish, Polish, Jewish, and Lebanese"*
  — tämä on todella harhaanjohtava, koska se lukee kuin italialaiset
  olisivat saapuneet jo 1824 saksalaisten kanssa samaan aikaan.
  Faktapohja on huomannut tämän ja kirjannut sen osioon 7, huomio 3,
  täsmälleen oikealla sitaatilla.
- **"German Brazilians"** sanoo: *"On July 25, 1824, the first 39
  immigrants were settled on the southern bank of the Rio dos Sinos"*
  ja *"In March 1824, D. Pedro I instructed the president of the
  province of Rio Grande do Sul to found the colony of São Leopoldo"*
  — täsmää faktapohjan H3-nostoon täydellisesti (maaliskuu 1824 käsky,
  25.7.1824 ensimmäiset 39 siirtolaista).
- **"Italian Brazilians"** sanoo: *"The first groups of Italians arrived
  in 1875, but the boom of Italian immigration in Brazil happened
  between 1880 and 1900"*.
- **"Rio Grande do Sul"** sanoo: *"Italian immigrants started arriving
  in Rio Grande do Sul in 1875. They were mostly poor peasants from
  Trentino and Veneto... Italian immigration to the region lasted until
  1914, with a total of 100,000 Italians settling there"* — täsmää
  H3-nostoon sanasta sanaan (Trentino, Veneto, 1914, 100 000).
  Sama artikkeli vahvistaa myös H4-nostossa käytetyt luvut: *"Blacks
  were 50 percent of Rio Grande do Sul's population in 1822. This
  proportion decreased to 25 percent in 1858 and to only 5.2 percent in
  2005. Most of them were brought from Angola..."* — täsmälleen
  faktapohjan lukuihin.

**Tuomio: faktapohja on käsitellyt tämän oikein.** Se on tunnistanut
pääartikkelin harhaanjohtavan muotoilun, käyttänyt tarkempia
erikoisartikkeleita, ja kirjannut ristiriidan avoimesti sekä H3-noston
lähteet-kohtaan että osioon 7. 1940 väestönlaskennan luvut (393 934
saksankielistä / 295 995 italiankielistä) täsmäävät myös täsmälleen
"German Brazilians" -artikkeliin. Koko lehden 1873-kehys (saksalaisasutus
vakiintunut, italialaisaalto vielä kahden vuoden päässä) on siis
faktapohjan mukainen todellisuuden kanssa.

---

## B. Vuoden 2024 tulvien uhriluku (181 vs. 169): käsitelty reseptin mukaisesti, EI virhe

Tarkistin "2024 Rio Grande do Sul floods" -artikkelin suoraan:
infobox antaa **181** kuollutta (*"it resulted in 181 fatalities (as of
7 July 2024)"*, lähteinä RS:n osavaltiohallinto + YK), mutta
leipätekstin Victims-osio sanoo **169**: (*"at least 169 people were
killed"*, viitaten toukokuun 11. päivän uutislähteeseen kesken tulvan).
Molemmat luvut ovat siis todella artikkelissa, kuten faktapohja väittää.

Tehtävänannossa pyydettiin varmistamaan, että "faktapohja kirjoittaa
ristiriidan auki eikä valitse yhtä" — mutta tarkistin
`docs/aasia-tyoaineisto/lehtityo-resepti.md`-tiedoston, joka on tämän
faktapohjan oma sitova ohje, ja se sanoo eksplisiittisesti: *"Wikipedian
sisäiset ristiriidat KIRJOITETAAN AUKI lukijalle TAI valitaan tarkempi
lähde ja ero selitetään lohkokommentissa (ennakkotapaukset v925, v932,
v937: koordinaatit voittavat leipätekstin etäisyysarviot)."* Faktapohja
noudattaa jälkimmäistä vaihtoehtoa: se valitsee tuoreemman ja
virallisemman infobox-luvun (181) L4-nostoon, mutta selittää eron
avoimesti sekä L4:n lähteet-kohdassa että osiossa 7, huomio 4. Tämä on
**reseptin mukainen, hyväksytty menettely** — ei virhe, vaan täsmälleen
se, mitä ohje pyytää. Molemmat luvut (333,1 mm sadanta / 113 mm
1991–2020-keskiarvo, Guaíban 5,31 m / 1941: 4,76 m, 580 000 koditonta,
19 mrd realia / 3,7 mrd USD) täsmäävät myös täsmälleen artikkeliin.

---

## C. VIRHE — Commons-kategoria "Category:Farroupilha Park" ei ole olemassa

Faktapohja käyttää nimeä `Category:Farroupilha Park` (437 kuvaa) kahdessa
kohdassa osiossa 5: kansikuvien kohdassa 3 ja Luonto-sivun L1-kuvalistassa.
Tarkistin kategorian `categoryinfo`-kutsulla:

```
Category:Farroupilha Park => missing (ei olemassa)
Category:Parque Farroupilha => size=458, files=437, subcats=21
```

Oikea kategorianimi on **`Category:Parque Farroupilha`** — kuvamäärä 437
on faktapohjassa täysin oikein, vain kategorian NIMI on väärä. Tämä
vahvistuu myös suoraan itse en-Wikipedia-artikkelista "Farroupilha Park":
sen External links -osiossa lukee `{{commons category|Parque
Farroupilha}}` — artikkeli itse osoittaa oikeaan kategorianimeen.
Huomionarvoista: faktapohja LÖYSI ja korjasi juuri tämän tyyppisen
virheen onnistuneesti kolmessa muussa kohdassa (osio 5: "Kaingang" →
"Kaingangs", "Guarani people" → "Guaraní", "SC Internacional" → "Sport
Club Internacional", "Guaíba" → "Rio Guaíba" järvelle) — kaikki nämä
neljä korjausta tarkistin ja vahvistin oikeiksi — mutta "Farroupilha
Park" jäi tästä tarkistuksesta ilman selvää syytä väliin, vaikka
englanninkielinen Wikipedia-ARTIKKELIN nimi ja Commons-KATEGORIAN nimi
juuri tässä tapauksessa eroavat toisistaan (artikkeli "Farroupilha
Park", kategoria "Parque Farroupilha") — sama sudenkuoppa kuin muissa jo
korjatuissa tapauksissa.

**Suositus:** korvaa `Category:Farroupilha Park` kaikkialla tekstissä
(2 kohtaa osiossa 5) nimellä `Category:Parque Farroupilha`. Kuvamäärä
(437) pysyy samana.

---

## D. VIRHE — kaksi Commons-kategorian kuvamäärää sekoittaa "koon" ja "kuvien määrän"

`categoryinfo`-kutsu palauttaa erikseen `size` (kaikki jäsenet: kuvat +
sivut + alikategoriat) ja `files` (pelkät kuvatiedostot). Faktapohja
käyttää oikein `files`-lukua **26:ssa 28:sta** tarkistamastani
kategoriasta (mm. Porto Alegre 1073, Mercado Público 218, Usina do
Gasômetro 283, Grenal 8 — kaikki täsmäsivät `files`-kenttään
täsmälleen), mutta KAHDESSA tapauksessa se on ilmoittanut `size`-luvun
ikään kuin se olisi kuvamäärä:

| Kategoria | Faktapohjan ilmoittama "kuvamäärä" | Todellinen `files` | `size` (=files+subcats) |
|---|---|---|---|
| `Category:Kaingangs` (L2) | 82 kuvaa | **69** | 82 (69 kuvaa + 13 alikategoriaa) |
| `Category:Mbya Guarani` (L3) | 49 kuvaa | **31** | 49 (31 kuvaa + 18 alikategoriaa) |

Faktapohja osoittaa TIETÄVÄNSÄ tämän eron — osiossa 5 se nimenomaan
erottelee `2024 Rio Grande do Sul floods` -kategorian kohdalla "29
kuvaa, 16 kuvatiedostoa" (size=29, files=16, molemmat oikein ja
oikein nimetty) — mutta ei ole soveltanut samaa tarkkuutta Kaingangs- ja
Mbya Guarani -kategorioihin, joissa molemmissa on paljon alikategorioita
jotka nostavat `size`-lukua huomattavasti todellista kuvamäärää
suuremmaksi.

**Suositus:** korjaa "82 kuvaa" → "69 kuvaa" (Category:Kaingangs) ja "49
kuvaa" → "31 kuvaa" (Category:Mbya Guarani) osiossa 5. Ei vaikuta muuhun
sisältöön.

---

## E. VAROITUS — kohdekartan (osio 4) ilmansuunnat ovat systemaattisesti epäluotettavia, vaikka etäisyydet ovat oikein

Laskin itse Python-skriptillä kaikkien kahdeksan kohteen etäisyyden JA
todellisen kompassisuunnan (bearing) faktapohjan omista koordinaateista,
samalla kaavalla jota faktapohja ilmoittaa käyttäneensä (asteet × 111
km, pituusasteet × cos(30,034°)).

**Etäisyydet (km) täsmäsivät KAIKKI faktapohjan taulukkoon** (0,09 / 0,18
/ 0,68–0,70 / 1,06 / 1,40 / 3,59 / 5,16 km) — laskentamenetelmä ja
koordinaatit ovat siis oikein. Sen sijaan **ilmansuunnat eivät täsmää
todellisiin kompassisuuntiin** kuudessa kahdeksasta rivistä:

| Kohde | Faktapohjan suunta | Laskettu todellinen bearing | Todellinen lähin ilmansuunta |
|---|---|---|---|
| Palácio Piratini | lounaaseen | 248,7° | länsi/lounas-raja (~ok) |
| Theatro São Pedro | luoteeseen | 348,8° | **pohjoinen** |
| Cais Mauá | pohjoiseen | 344,6° | pohjoinen (ok) |
| Mercado Público | koilliseen | 15,2° | **pohjoinen** |
| Usina do Gasômetro | lounaaseen | 267,1° | **länsi** |
| Parque Farroupilha | kaakkoon | 104,0° | **itä** |
| Estádio Beira-Rio | lounaaseen | 189,4° | **etelä** |
| Fundação Iberê Camargo | lounaaseen | 197,3° | **etelä** (raja lähellä) |

Kaava vaikuttaa siltä, että suunta on päätelty vain etumerkeistä
("kohde on sekä etelämpänä että lännempänä kuin vertailupiste → lounas")
eikä todellisesta kulmasta — esim. Usina do Gasômetro on 1,057 km
lännempänä mutta vain 0,054 km etelämpänä (suhde 20:1), silti merkitty
"lounaaseen" eikä "länteen". Tämä näkyy myös sisäisenä
epäjohdonmukaisuutena: Cais Mauá ja Theatro São Pedro ovat molemmat
pohjois-länsi-kvadrantissa lähes samalla suhteella (pohjoiskomponentti
selvästi hallitseva), mutta ensimmäinen on merkitty oikein "pohjoiseksi"
ja jälkimmäinen virheellisesti "luoteeksi".

**Ei vaikuta pelin sisältöön suoraan** (kartoittaja piirtää kartan
oikeista koordinaateista, ei suuntasanoista), mutta tekstimuotoiset
suuntamerkinnät itsessään ovat epäluotettavia eivätkä täsmää faktapohjan
omaan väitteeseen "tarkistettu Node-skriptillä". Suosittelen joko
korjaamaan suunnat oikealla bearing-laskennalla tai poistamaan
suuntasanat kokonaan taulukosta ja jättämään pelkät etäisyydet (jotka
ovat oikein).

---

## F. Muita tarkistettuja ja vahvistettuja Commons-kategorioita

Kaikki seuraavat tarkistettiin `categoryinfo`-kutsulla ja täsmäsivät
faktapohjan väitteisiin (olemassaolo JA `files`-luku, ellei toisin
mainita): Porto Alegre (1073), Catedral Metropolitana de Porto Alegre
(114), Rio Guaíba (136), Cais Mauá (91), Mercado Público de Porto Alegre
(218), Sport Club Internacional (63), Grêmio Foot-Ball Porto Alegrense
(109), Grenal (8), Usina do Gasômetro (283), Fundação Iberê Camargo
(160), São Leopoldo (66), Serra Gaúcha (18), Ragamuffin War (29),
Palácio Piratini (6), Theatro São Pedro (Porto Alegre) (134), Arena do
Grêmio (225), Estádio Beira-Rio (190), Guaraní (215 kuvaa — faktapohja
ei anna tälle tarkkaa lukua, vain vaihtoehtona), Guampa (69), Bombillas
(96), Mate-based beverages (18).

Vahvistin myös faktapohjan HUOM-merkinnät vääriksi arvatuista
kategorianimistä — kaikki neljä ovat todella olemassa vain väitetyllä
korjatulla nimellä: `Category:Kaingang` puuttuu (oikea: Kaingangs),
`Category:Guarani people` puuttuu (oikea: Guaraní), `Category:SC
Internacional` puuttuu (oikea: Sport Club Internacional),
`Category:Chimarrão` on olemassa mutta tyhjä (0 kuvaa) ja
`Category:Yerba mate` samoin olemassa mutta tyhjä (0 kuvaa) — molemmat
täsmälleen faktapohjan väitteen mukaisesti. `Category:Guaíba` on
olemassa (16 kuvaa, 15 alikategoriaa) — en ehtinyt vahvistaa
riippumattomasti sisältöä (viittaako se kaupunkiin vai johonkin muuhun),
mutta tällä ei ole merkitystä, koska faktapohja joka tapauksessa ohjaa
kirjoittajan käyttämään järvelle oikeaa kategoriaa `Rio Guaíba`, jonka
olemassaolo ja kuvamäärä (136) on vahvistettu.

---

## G. Muut tarkistetut faktat — kaikki täsmäsivät

Näiden tarkistus ei paljastanut yhtään virhettä; listaan ne osoittamaan
tarkistuksen kattavuutta:

- **H1** (perustaminen): Madridin sopimus 13.1.1750, 60 atsoorilaisparia,
  Porto de Viamão, perustamispäivä 26.3.1772, pääkaupunkistatus
  24.7.1773, Manuel Sepúlveda / José Marcelino de Figueiredo — kaikki
  täsmäävät "Porto Alegre" -pääartikkeliin sanasta sanaan.
- **H2** (Farroupilha-kapina): 20.9.1835 valtaus, 15.6.1836 takaisinvaltaus
  (tarkka päivä vain "History of Porto Alegre" -artikkelissa, kuten
  faktapohja itse huomauttaa osiossa 7), kolme piiritystä (1836,
  1837–alkuvuosi 1838, kesäkuu 1838–joulukuu 1840), arvonimi 19.10.1841,
  Vihreän Ponchon sopimus 1.3.1845, 25 %:n tuontitulli — kaikki täsmäävät
  "Ragamuffin War"- ja "History of Porto Alegre" -artikkeleihin.
- **K1** (Mercado Público): 29.8.1864 aloitus, Heydtmann, 3.10.1869
  avajaiset, tulipalo 1912, toinen kerros 1913, tulva 1941, tulipalot
  1976/1979/2013 (6.7.2013, ~30 % rakenteista), 9 milj. realia
  restaurointi, 109 liikettä, 101-vuotias Bar Naval, Banca 40 — kaikki
  täsmäävät "Porto Alegre Public Market" -artikkeliin sanatarkasti.
- **K2** (jalkapalloseurat): 7.9.1903 näytösottelu, Cândido Dias lainasi
  pallon, 15.9.1903 perustaminen (32 miestä), Carlos Luiz Bohrer
  ensimmäinen presidentti, 4.4.1909 Internacional (Poppen veljekset,
  "demokraattinen instituutio ilman ennakkoluuloja"), FourFourTwo:n
  sija 8, Intercontinental Cup 1983 vs. Hamburger SV 2–1 — kaikki
  täsmäävät.
- **K3** (Usina do Gasômetro): 11.11.1928 käyttöönotto, Electric Bond &
  Share -tytäryhtiö, hiilikäyttöinen nimestä huolimatta, deaktivointi
  1974, Eletrobras luovutus 1982, suojelu 1982/1983, restaurointi 1988,
  avaus kulttuurikeskuksena 1991 — täsmää sanatarkasti.
- **K4** (Iberê Camargo Foundation): perustaminen 1995 (vuosi kuoleman
  jälkeen), Álvaro Siza, avaus toukokuussa 2008, leski Maria Coussirat
  Camargo kunniapresidenttinä — täsmää.
- **L1** (Redenção-puisto): Várzea do Portão -suoalue, 23.2.1807 pyyntö,
  mittaus 1820–1825, kapinan aikana linnoitusten ulkopuolella, nahan
  kuivatus/jäte mid-1890-luvulle, 1884 nimenmuutos "Campos da Redenção",
  1935 Agachen suunnitelma satavuotisjuhliin, 1872 sotilaskasarmin lupa
  — kaikki täsmäävät "Farroupilha Park" -artikkeliin täsmälleen.
- **L2** (Kaingang): 51 000 (2022), kamé/kanhru-jako, Jê-kieliperhe,
  marraskuu 2006 Copel 6,5 milj. USD, Apucaraninha-reservaatti — täsmää.
- **L3** (Mbyá-guaraní): 8 400, Atlantin metsä/rannikko, BR-101/BR-116,
  karaí/mburuvichá-johtajuus, tekoa-kylät — täsmää.
- **L4** (2024 tulvat): ks. kohta B — kaikki luvut täsmäävät.
- **Jaksot 1–5**: 43 998 asukasta (1872-väestönlaskenta, "Timeline of
  Porto Alegre"), 14 h/10 h valoisan ajan ero, otsoniaukko/UV, Cfa-
  ilmastoluokka, pakkasennätys -4,0 °C 11.7.1918, lämpöennätys 40,7 °C
  1.1.1943, sadanta 1 425 mm (1981–2010) / 1 498 mm (1991–2020), talvi-
  sademaksimi (toisin kuin Brasília/São Paulo/Rio), Muro da Mauá -penger
  1941-tulvan jälkeen, SoHo/Cidade Baixa João Alfredo/Moinhos de Vento
  -yöelämäkohteet — kaikki täsmäävät sanatarkasti "Porto Alegre"
  -pääartikkelin Climate- ja Nightlife-osioihin.
- **Section 7, huomio 2** (freguesia 1772 → vila 1803 → cidade 1822):
  vahvistettu "Timeline of Porto Alegre" -artikkelista täsmälleen.
- **Section 7, huomio 5** (Timeline antaa saksalaisten saapumisvuodeksi
  1825): vahvistettu — "Timeline of Porto Alegre" sanoo todella "1825 –
  German immigrants arrive", kun taas "German Brazilians" antaa
  25.7.1824. Faktapohja on valinnut oikein tarkemman erikoisartikkelin.
- **js/packs/southamerica-questions.js**: tarkistin `portoalegre`-kohdan
  (5 kysymystä) ja `SOUTHAMERICA_FACTS.portoalegre` (3 faktaa + isoisän
  repliikki) suoraan tiedostosta — faktapohjan osion 8 kuvaus
  päällekkäisyyksien välttämisestä vastaa tiedoston todellista
  sisältöä.

---

## Yhteenveto korjattavista kohdista

### VIRHEET (korjattava ennen kirjoitusvaihetta)

1. **[Commons-kategoria] Osio 5:** `Category:Farroupilha Park` ei ole
   olemassa — oikea nimi on `Category:Parque Farroupilha` (437 kuvaa,
   luku pysyy samana). Korjaa 2 kohtaa: kansikuvat #3 ja Luonto-sivun
   L1-kuvalista. Ks. kohta C.
2. **[Commons-kategoria, lukuvirhe] Osio 5:** `Category:Kaingangs`
   (L2) — "82 kuvaa" pitää olla **69 kuvaa** (82 on kategorian koko
   sisältäen 13 alikategoriaa). `Category:Mbya Guarani` (L3) — "49
   kuvaa" pitää olla **31 kuvaa** (49 sisältää 18 alikategoriaa). Ks.
   kohta D.

### VAROITUKSET

3. **[Laskentavirhe] Osio 4:** kohdekartan ilmansuunnat (lounas/koillinen/
   kaakko/luode) eivät vastaa todellista kompassisuuntaa kuudessa
   kahdeksasta rivistä, vaikka etäisyydet (km) ovat kaikki oikein.
   Suositus: laske suunnat uudelleen oikealla bearing-kaavalla tai
   poista suuntasanat. Ks. kohta E.

### EI KORJAUSTARVETTA — nimenomaisesti vahvistettu oikeaksi

- Saksalais-1824/italialais-1875-kehys (kohta A) — koko lehden 1873-
  ankkurin kannalta kriittisin väite, vahvistettu neljästä artikkelista.
- 2024 tulvien 181/169-ristiriita (kohta B) — käsitelty reseptin
  hyväksymällä tavalla, ei virhe.
- Kaikki 12 nostoa, 5 jaksoa, 3 johdantoa asiasisällöltään (kohta G).
- 8/8 kohdekartan koordinaattia ja kaikki 8 etäisyyttä (km).
- 26/28 tarkistettua Commons-kategoriaa nimeltään ja kuvamäärältään
  (kohta F), mukaan lukien kaikki neljä faktapohjan itse löytämää
  väärän arvauksen korjausta.

---

## Kelpaako-tuomio

**KELPAA kirjoitusvaiheeseen kahden pienen korjauksen jälkeen** (kohdat
C ja D — molemmat ovat yhden rivin tekstikorjauksia, eivät vaadi
uudelleentarkistusta). Osion 4 suuntavirhe (kohta E) kannattaa korjata
tai suuntasanat poistaa, mutta se ei estä kirjoitusvaihetta, koska
kartoittaja käyttää joka tapauksessa oikeita koordinaatteja, ei
tekstimuotoisia suuntia. Itse historiallinen ja kulttuurinen asiasisältö
— mukaan lukien tehtävänannon nimeämä kriittisin kohta, saksalais-/
italialaissiirtolaisuuden vuosikehys — on poikkeuksellisen tarkkaa ja
lähteistettyä läpi koko dokumentin.
