# Hanoi-faktapohjan riippumaton tarkistus

Tarkistettu vasten en-Wikipedian raakatekstiä (`action=raw`) 20.8.2026.
Kaikki 9 käytettyä artikkelia haettiin uudelleen suoraan, ja kaikki
kahdeksan kohdekartan koordinaattia sekä kaikki nostojen/jaksojen
lukuarvot verrattiin rivi riviltä lähdetekstiin. Lisäksi lasketut
etäisyydet/suunnat laskettiin itsenäisesti uudelleen (haversine +
kompassisuunta), ja Ô Quan Chưởng -portin koordinaatti haettiin
riippumattomasta lähteestä (OpenStreetMap/Nominatim, koska Overpass-API
ei ollut tavoitettavissa tästä ympäristöstä kuuden yritys+viive-kierroksen
jälkeenkään — kaikki `overpass-api.de`- ja peilipalvelinyhteydet
katkesivat TLS-kättelyssä tai eivät muodostuneet lainkaan).

**Yleistulos: faktapohja on poikkeuksellisen tarkka.** Kymmenistä
tarkistetuista yksittäisistä väitteistä (nimet, vuosiluvut, koordinaatit,
säädata, liikennetilastot, taistelun joukkovahvuudet) käytännössä
kaikki täsmäsivät sanatarkasti lähteeseen. Alla vain poikkeamat,
lisälöydöt ja tulkintakysymykset — ei toistettu kaikkea mikä oli kunnossa.

---

## 1. Uusi virhe/epätarkkuus: Paul Doumerin virkakausi (Jakso 4)

**Väite faktapohjassa:** "kenraalikuvernööri Paul Doumer (1897–1902)
vaikutti kaupunkisuunnitteluun. — en-Wikipedia 'Hanoi'"

**Mitä lähde oikeasti sanoo:** en-Wikipedian "Hanoi"-artikkelin
leipäteksti sanoo **"(1898–1902)"**, ei 1897:
> "Gouveneur-Général Paul Doumer (1898–1902) played a role in colonial
> Hanoi's urban planning."

Tämä ei kuitenkaan ole yksiselitteinen virhe kirjoittajan puolelta:
saman lauseen oma viite on kirjan artikkeli "Building Whiteness on the
Red River: Race, Power, and Urbanism in Paul Doumer's **Hanoi,
1897–1902**" — eli artikkelin oma lähdeviite käyttää vuotta 1897, joka
on myös yleisesti tunnettu, historiallisesti vakiintunut ajanjakso
Doumerin kenraalikuvernöörikaudelle. Wikipedian leipäteksti ja sen oma
viitteen otsikko ovat siis keskenään ristiriidassa.

**Suositus:** 1897–1902 on todennäköisesti se oikea/tarkempi
vuosiluku, mutta koska se ei täsmää suoraan siihen leipätekstin
virkkeeseen, johon faktapohja viittaa lähteenä, kirjoittajan kannattaa
joko (a) vaihtaa lähdeviite osoittamaan artikkelin omaan
alaviitteeseen (jossa 1897 esiintyy), tai (b) pehmentää ilmaisu
muotoon "n. 1897/98–1902" tai pudottaa alkuvuosi kokonaan ("...Paul
Doumer vaikutti voimakkaasti kaupunkisuunnitteluun 1900-luvun alussa").

---

## 2. Ô Quan Chưởng -portti: koordinaatti löytyi riippumattomasti

Overpass ei vastannut, mutta **OpenStreetMap Nominatim** (eri palvelu,
sama taustadata) antoi osuman:

- **Koordinaatit: 21,0373307°N, 105,8522085°E**
- OSM-tagit: `historic=city_gate`, `wikidata=Q10839688`,
  `wikipedia=vi:Ô Quan Chưởng`
- Vahvistaa faktapohjan väitteen, ettei porttia ole englanninkielisessä
  Wikipediassa: kokeilin neljää eri kirjoitusasua ("Ô Quan Chưởng",
  "O Quan Chuong", "Quan Chuong Gate", "Ô Quan Chưởng Gate") — kaikki
  palauttivat 404:n. Portilla on **vain vietnaminkielinen** artikkeli.

**Etäisyys/suunta keskustasta (Hoàn Kiếm -järvi) omalla laskelmalla:**
~0,94 km pohjoiseen (kompassisuunta 358°, käytännössä suoraan
pohjoiseen). Tämä mahtuisi siististi olemassa olevaan
~2,6 km × 1,6 km -rajausneliöön, jos portti halutaan lisätä kartalle.

**Sivuhuomio (ei kriittinen):** OSM:n `start_date=1817` on eri kuin
en-Wikipedian "Hanoi"-artikkelin kuvatekstin "built in 1749". Tämä on
ristiriita Wikipedian ja OSM:n välillä, ei faktapohjan virhe — merkitään
tässä vain tiedoksi, jos porttia joskus käytetään tarkemmin
rakennusvuoden kanssa.

---

## 3. Battle of Hanoi (1873) -päivämääräristiriita: vahvistettu JA ratkaistavissa

Ristiriita on todellinen — tarkistin sen suoraan:
- Infoboksi + johdanto + "Aftermath"-osio: **20 November 1873**
- "Preparations"/"Storming"-osiot: Garnierin kirje päivätty
  **"19 October 1873"**, hyökkäys **"On the morning of 20 October..."**

Faktapohjan kirjoittaja ei löytänyt ristiriitaa ratkaisevaa lähdettä
muista käyttämistään artikkeleista — mutta **löysin vahvan
riippumattoman vahvistuksen marraskuulle kahdesta muusta
Wikipedia-artikkelista**, joita ei ollut vielä ristiin luettu tätä
varten:

1. **"Hanoi"-artikkeli** (infoboksin `established_date1` ja
   galleriakuvateksti): "**20 November 1873**"
2. **"Francis Garnier"-artikkeli**, oma yksityiskohtainen
   päivä-päivältä-kertomus, joka on täysin riippumaton
   "Battle"-osion tekstistä: Garnier lähti Saigonista 11. lokakuuta,
   saapui Hanoihin 5. marraskuuta, täydennysjoukot saapuivat
   12. marraskuuta, ja **"On 20 November at dawn, Garnier and his 180
   men stormed the citadel"**.

Kolme erillistä Wikipedia-artikkelia (Battle-artikkelin infoboksi,
Hanoi-artikkeli, Francis Garnier -artikkeli) tukevat siis
20. marraskuuta, ja vain saman Battle-artikkelin oma "Battle"-osion
proosateksti poikkeaa lokakuulle — todennäköisesti yksittäinen
Wikipedia-muokkausvirhe (esim. ranskankielisen lähteen
"novembre"/"octobre"-sekaannus), ei aito lähteiden välinen ristiriita.

**Suositus:** "Marraskuussa 1873" (K4:n nykyinen muotoilu) on hyvin
perusteltu ja turvallinen valinta. Jos tarkka päivä halutaan myöhemmin
lehteen, **20. marraskuuta on selvästi paremmin tuettu** kuin
19.–20. lokakuuta, eikä asiaa tarvitse enää jättää auki kolmatta
lähdettä odottamaan.

---

## 4. Ngọc Sơn -temppelin vuosisataristiriita: vahvistettu, EI ratkaistavissa käytetyistä lähteistä

Tarkistin molemmat: "Hoàn Kiếm Lake" -artikkeli sanoo *"The temple was
erected in the 18th century"*, "Ngọc Sơn Temple" -artikkeli sanoo
*"The temple was built in early 19th century"*. Ristiriita on todellinen
eikä lukuvirhe.

En löytänyt tästä yhdeksän artikkelin joukosta kolmatta lähdettä, joka
ratkaisisi asian. **Kirjoittajan valinta (jättää vuosisata pois
K3-noston proosasta) on oikea ja turvallisin ratkaisu** — tätä ei voi
tällä aineistolla kirjoittaa auki ilman spekulointia. Jos asia halutaan
myöhemmin selvittää, tarvitaan kolmas, ei-Wikipedia-lähde (esim.
tarkempi Hanoi-historiateos), koska molemmat Wikipedia-artikkelit
väittävät vastakkaista ilman viitteitä, jotka selittäisivät eron.

---

## 5. Jakso 3: katukauppa–killat-yhteys — suosittelen POISTOA, ei pehmennystä

Tarkistin: Wikipedian teksti ei tosiaan missään yhdistä nykyisiä
maaseudulta tulleita torikauppiaita (Economy-osio, Lincoln 2008
-lähde) Vanhankaupungin 36 killan kauppakatuihin. Lisäksi nämä ovat
sisällöllisesti **kaksi eri ilmiötä**, ei sama perinne jatkumona:

- 36 killan kadut = kiinteät, tiettyyn käsityöhön erikoistuneet
  puodit/asukkaat, jotka juontavat Lý/Trần-dynastioiden ajalta.
- Nykyiset katukauppiaat = Lincoln (2008) -lähteen mukaan
  **maaseudulta sisään muuttaneita**, kantavia/kori-myyjiä — 2006
  väestönlaskennan ilmiö, ei kytköstä pysyviin kauppahuoneisiin tai
  killan jäsenyyteen.

Näiden välillä ei ole Wikipedian mukaan historiallista jatkumoa —
kyse on kahdesta erillisestä kaupankäynnin muodosta (kiinteä
killan puoti vs. liikkuva maaseutumyyjä), vaikka molemmat tapahtuvat
samalla maantieteellisellä alueella. Koska pelin sisältölinjaus
painottaa lähdetarkkuutta, **suosittelen poistamaan viimeisen
lauseen kokonaan** sen sijaan että sitä vain pehmennettäisiin — kytkös
antaisi harhaanjohtavan kuvan historiallisesta jatkuvuudesta, jota ei
ole. Jakso toimii hyvin myös ilman sitä.

---

## 6. Kohdekartan koordinaatit ja etäisyydet: kaikki täsmäävät

Laskin itse haversine-etäisyydet ja kompassisuunnat kaikille kahdeksalle
kohteelle keskipisteestä (Hoàn Kiếm -järvi, 21,028889°N 105,852500°E) ja
sain käytännössä samat luvut kuin faktapohjan taulukossa:

| Kohde | Oma laskelma | Faktapohjan taulukko |
|---|---|---|
| Ngọc Sơn | 0,208 km, 345° (P) | ~0,2 km P ✓ |
| Pyhän Joosefin katedraali | 0,376 km, 265° (L) | ~0,4 km L ✓ |
| Đồng Xuân | 1,063 km, 346° (P) | ~1,1 km P ✓ |
| Kirjallisuuden temppeli | 1,759 km, 269° (L) | ~1,8 km L ✓ |
| Long Biên -silta | 1,738 km, **22,4°** | ~1,7 km **PI (koillinen)** — rajatapaus, ks. alla |
| Keisarilinna | 1,973 km, 306,5° (LP) | ~2,0 km LP ✓ |
| Yhden pilarin pagodi | 2,106 km, **291,5°** | ~2,1 km **LP** — rajatapaus, ks. alla |

Kaikki etäisyydet täsmäävät alle 50 metrin tarkkuudella. Kaksi
suuntamerkintää on **veitsenterällä sektorirajalla** (45°:n
kompassilohkon raja on täsmälleen 22,5°/292,5°):

- **Long Biên -silta**: laskettu suunta 22,4° on 0,1° pohjoisen (P)
  puolella koillisen (PI) rajasta — teknisesti lähempänä P:tä, mutta
  ero on mitätön (alle metrin luokkaa koordinaattien pyöristyksessä).
- **Yhden pilarin pagodi**: laskettu suunta 291,5° on n. 1° lännen (L)
  puolella luoteen (LP) rajasta — samoin käytännössä olematon ero.

Nämä eivät ole virheitä, vaan kahdeksansektorisen kompassin
pyöristysrajalla olevia arvoja, joissa kumpikin suunta on
puolustettavissa. Ei vaadi korjausta, mutta mainitsen sen avoimuuden
vuoksi.

**Rajausneliön mitat tarkistettu ja vahvistettu:** oma laskelmani antaa
leveydeksi 2,625 km ja korkeudeksi 1,639 km — täsmää faktapohjan
"n. 2,6 km × n. 1,6 km" -väitteeseen täydellisesti.

---

## 7. Kaikki muut tarkistetut faktat: ei löytynyt virheitä

Näiden osalta jokainen numero/nimi/vuosiluku täsmäsi sanatarkasti
lähteeseen (tarkistettu suoraan raakatekstistä):

- K1/H2: Lý Thái Tổ 1010, Đại La → Thăng Long, Minh Mạng → Hà Nội
  1831, välinimet Đông Đô (1397 jälk.), Đông Quan (1408–1428, Ming-
  miehitys), Đông Kinh (1428 jälk.).
- H2: Tống Bình n. 450-luvulla (Wikipedia: "middle of the fifth
  century"), Gao Pian 866, muuri 6 344 m / yli 8 m.
- H1: Kirjallisuuden temppeli 1070, Quốc Tử Giám 1076–1779, steelat
  1484 alkaen, 82 säilynyttä / 1 307 nimeä / 82 koetta (81 Lê + 1 Mạc).
- H4: kolmiosainen rengasrakenne, Gia Long 1805/Vauban, vain
  Pohjoisportti+lippulinna säästyivät, arkeologinen löytö 2002–2004
  (Hoàng Diệu 18), Unesco 2010.
- K2/H3: 36 katua/kiltaa, hàng-nimet, Hàng Tre/Hàng Đồng/Hàng Buồm,
  "only the Quan Chưởng gate remains", Ô Quan Chưởng/Đông Hà môn 1749
  (kuvateksti).
- K3: Hoàn Kiếm-legenda, Tháp Rùa, Thê Húc -silta — kaikki täsmää.
- K4: 210 miestä (180+30), kanuuniveneet Scorpion/Espingole, hyökkäys
  kahdesta portista (lounais- ja kaakkoisportti), lippu tornissa
  "shortly before 7:00 am" (alle tunti hyökkäyksen alusta), Nguyễn Tri
  Phương haavoittui lonkkaan jouhikuulasta ja vangittiin, kaupungin
  väkiluku ~80 000.
- Jakso 1: Reunification Express 1 726 km / ~33 h, 1 370 katua / yli
  2 300 km, ajoneuvot heinäkuu 2022 yli 7,6 milj. / 6,4 milj.
  moottoripyörää, metrolinja 2A avattu 6.11.2021.
- Jakso 2: Cwa-ilmasto, Ba Đình + Hoàn Kiếm -kaupunginosat, hallintoalue
  334 470 ha 1.8.2008 alkaen (Hà Tây -provinssin liittäminen).
- Jakso 3: 2006 väestönlaskenta 5 600 torikauppiasta / 90 % maaseudulta,
  heinäkuu 2008 osittainen kielto 62 kadulla, 67→1000 kauppa/markkina
  -suunnitelma vuoteen 2025.
- Jakso 4: Ranskan Indokiinan pääkaupunki 1902, Pyhän Joosefin
  katedraali valmistui joulukuu 1886 (vihitty 24.12.1886), esikuvana
  Notre-Dame, "Paris of the East" -lisänimi.
- Jakso 5 + osio 5: Köppen Cwa, neljä vuodenaikaa kuvattu oikein,
  vuosikeskilämpötila 23,6 °C, kylmin/kuumin kk 16,4/29,2 °C, ennätykset
  42,8 °C (toukokuu 1926) / 2,7 °C (12.1.1955), **koko 12 kuukauden
  taulukko (keski/ylin/alin/sade) täsmää lukuun asti**, vuosisade
  1 670,1 mm (sääruutu) vs. 1 612 mm/114 sadepäivää (leipäteksti,
  hanoi.gov.vn) — ristiriita on todellinen ja oikein raportoitu.
- Koordinaatit: kaikki 8 kohdetta (Hoàn Kiếm, Ngọc Sơn, katedraali,
  Đồng Xuân, Kirjallisuuden temppeli, Long Biên, keisarilinna, Yhden
  pilarin pagodi) täsmäävät bitintarkasti infoboksien kanssa.

---

## 8. Sisältölinjaus: ei huomautettavaa

- Ranskan valtaus (K4, Jakso 4) kuvataan neutraalisti: Garnierin
  toiminta esitetään lähteen mukaisesti omavaltaisena/käskyjen
  vastaisena ("päätyi omin päin valtaamaan"), ei sankaritekona; myöskään
  puolustajia ei kuvata yksipuolisen negatiivisesti. Vastaa
  Wikipedia-lähteiden omaa sävyä.
- Ei mainintoja Vietnamin sodasta eikä nykypolitiikasta missään
  nostossa tai jaksossa — tarkistin erikseen, ettei mikään käytetty
  lause viittaa niihin.
- Uskonto (kungfutselaisuus Kirjallisuuden temppelissä, buddhalaisuus
  Yhden pilarin pagodissa, kansanusko Hoàn Kiếm -legendassa) käsitellään
  läpeensä historiallis-kulttuurisena, ei nykyuskonnollisena sisältönä.
- Jakson 3 ja Jakson 1–2 nykytosiasiat (liikenne, hallintoalue,
  katukauppatilastot) ovat hallinnollis-tilastollisia, eivät poliittisia
  kannanottoja — sopusoinnussa "Antaa olla" -periaatteen kanssa.

---

## Yhteenveto

Faktapohja on erittäin luotettava: kymmenistä itsenäisesti
uudelleentarkistetuista väitteistä lähes kaikki täsmäsivät lähteeseen
sanatarkasti, mukaan lukien kaikki kahdeksan kohdekartan koordinaattia
ja koko 12 kuukauden säätaulukko. Löysin yhden uuden pienen
epätarkkuuden (Paul Doumerin virkakauden alkuvuosi 1897 vs. lähteen
oma "1898", vaikka artikkelin oma alaviite tukee 1897:ää) ja
onnistuin ratkaisemaan riippumattomasti kaksi asiaa, jotka kirjoittaja
oli jättänyt avoimeksi:

1. **Ô Quan Chưörng -portin koordinaatit löytyivät** (OSM/Nominatim:
   21,0373307°N, 105,8522085°E, ~0,94 km P keskustasta) — portti
   voidaan nyt lisätä kohdekartalle halutessa.
2. **Battle of Hanoi -päivämääräristiriita on ratkaistavissa**: kaksi
   muuta Wikipedia-artikkelia (Hanoi, Francis Garnier) tukevat
   riippumattomasti 20. marraskuuta, joten "marraskuussa 1873" on hyvin
   perusteltu eikä asiaa tarvitse enää pitää avoimena.

Ngọc Sơn -temppelin vuosisataristiriita jää edelleen aidosti
ratkaisematta tällä lähdeaineistolla — kirjoittajan valinta jättää se
pois nosto-proosasta on oikea. Jakson 3 katukauppa–killat-kytkös
suosittelen poistettavaksi kokonaan, ei vain pehmennettäväksi, koska
kyseessä on kaksi eri historiallista ilmiötä eikä yksi jatkuva perinne.
Kaksi kompassisuunta-merkintää (Long Biên, Yhden pilarin pagodi) ovat
laskennallisesti alle 1°:n päässä sektorirajasta — ei virheitä, vain
mainittu avoimuuden vuoksi. Sisältölinjaus (neutraali valtaus, ei
Vietnamin sotaa/nykypolitiikkaa, uskonto historiallis-kulttuurisena)
täyttyy kauttaaltaan.
