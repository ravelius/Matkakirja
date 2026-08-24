# Salvadorin (Bahia) faktapohjan riippumaton tarkistus

Tarkistettu 24.8.2026 en-Wikipedian raakatekstistä (`action=raw`, suora `curl`
onnistui — konttiympäristön `NODE_USE_ENV_PROXY=1` ei ollut tarpeen, koska
tarkistus tehtiin suoraan `curl`illa eikä Node-fetchillä; kaksi hakua sai
Wikimedian rajapinnasta "You are making too many requests" -vastauksen,
kasvava viive 3 s → 8 s → 15 s korjasi molemmat) seuraavista artikkeleista:
**Salvador, Bahia** (pääartikkeli), Barra Lighthouse, Malê revolt, Elevador
Lacerda, Candomblé, Akara, Lavagem do Bonfim, Church of Nosso Senhor do
Bonfim — Salvador, Timeline of Salvador Bahia, Church and Convent of São
Francisco — Salvador, Modelo Market, Porto da Barra Beach, Capoeira, Lei
Áurea. Koordinaatit haettu itse MediaWiki-rajapinnasta
(`prop=coordinates`, `redirects=1`) ja tarkistettu pistokokeena
uudelleenlaskemalla kaksi etäisyyttä itse (Python, haversine-tyylinen
asteet × 111 km -menetelmä samalla tavalla kuin faktapohja itse kuvaa).
22 Commons-kategoriaa tarkistettu olemassaolon osalta suoraan Commonsin
`action=query&titles=` -rajapinnasta. Kaikki 20 merkkimäärää (4 johdantoa +
16 nostoa) mitattu itse Python-skriptillä.

**Yleisarvio: poikkeuksellisen huolellista ja tarkkaa työtä.** Lähes joka
ikinen luku, vuosiluku, nimi ja koordinaatti täsmää lähteeseen sanatarkasti
— mukaan lukien juuri ne kohdat, joita pyydettiin tarkistamaan erityisen
huolella: orjakaupan luvut (Brasilian suurin orjien tuontisatama, noin
neljä miljoonaa orjuutettua, Malê-kapinan 1835 kulku ja aikataulu),
Pelourinho-nimen merkitys (häpeäpaalu) ja Unesco-vuosi 1985, sekä
candomblén, capoeiran ja ruoan esittäminen elävänä nykykulttuurina.
Kaikki 9 kohdekartan koordinaattia ja kaikki 20 merkkimäärää täsmäävät.
Löysin kuitenkin kaksi todellista sisäistä ristiriitaa/liioittelua, jotka
kannattaa korjata ennen julkaisua (kohdat A ja B), sekä joukon pienempiä
huomioita (kohta C) — mikään ei ole niin vakava, että se estäisi laudan
hyväksymistä sellaisenaan.

---

## PAKOLLISET KORJAUKSET

### A. Sisäinen ristiriita — Nosto H3: orjakaupan lakkauttamisvuosi 1850 vai 1851?

**Väite (nosto H3, leipäteksti):** "Kapinaa pidetään käännekohtana, joka
vauhditti Brasilian orjakaupan lakkauttamista 1850."

**Väite (H3:n oma lähdeluettelo, sama fakta):** "Kapinaa pidetään
käännekohtana Brasilian orjuuden historiassa, joka vauhditti keskustelua
orjakaupan lakkauttamisesta (toteutui 1851). — en-Wikipedia 'Malê revolt'
(Aftermath), 'Salvador, Bahia' (History)"

**Ongelma:** Nostoteksti ja sen oma lähdeviittaus antavat KAKSI ERI
VUOTTA samalle tapahtumalle. Tarkistin molemmat: en-Wikipedian
"Candomblé"-artikkeli sanoo "Brazil abolished the slave trade in 1850"
(viittaa Eusébio de Queirós -lakiin, joka on historiallisesti oikea ja
laajalti tunnettu päivämäärä — laki säädettiin 4.9.1850) — tämä tukee
nostotekstin lukua 1850. En-Wikipedian oma "Malê revolt" -artikkeli
(Aftermath-osio) sen sijaan sanoo suoraan "the slave trade was abolished
in 1851" — tämä on todennäköisesti kyseisen yksittäisen artikkelin oma
epätarkkuus, mutta se on nimenomaan se artikkeli, jonka faktapohjan oma
lähdeluettelo mainitsee tämän luvun lähteeksi ja jonka sulkeissa oleva
"(toteutui 1851)" toistaa.

**Suositus:** Nostoteksti (1850) on historiallisesti oikea luku — säilytä
se. Korjaa sen sijaan lähdeluettelon rivi: poista "(toteutui 1851)" tai
korvaa se maininnalla, että "Malê revolt" -artikkeli antaa poikkeavan
vuoden 1851 kun taas "Candomblé"-artikkeli ja historiallinen
Eusébio de Queirós -laki tukevat vuotta 1850 — samaan tapaan kuin nosto
H4:n HUOM-rivi käsittelee Elevador Lacerdan sisäistä ristiriitaa.
Kirjoitusvaiheessa kannattaa varmistaa, ettei virheellinen 1851 pääse
leipätekstiin mistään muusta lähteestä.

### B. Liioittelu ja sisäinen ristiriita — Jakso 2: Liberdaden afrobrasilialaisosuus

**Väite (osio 3, Jakso 2 — Kaupungin vyöhykkeet, leipäteksti):**
"Alakaupungin Liberdaden kaupunginosassa asuu suhteessa enemmän
afrobrasilialaisia kuin missään muualla Salvadorissa tai koko
Brasiliassa."

**Väite (saman jakson oma lähdeluettelo):** "Liberdaden kaupunginosalla on
yksi suurimmista afrobrasilialaisten osuuksista sekä Salvadorissa että
koko Brasiliassa. — en-Wikipedia 'Salvador, Bahia' (Neighborhoods)"

**Ongelma:** En-Wikipedia sanoo varauksellisesti "has one of the largest
proportions of Afro-Brazilians of Salvador and Brazil" — EI, että
Liberdadessa asuisi suhteessa ENITEN afrobrasilialaisia koko Salvadorista
tai koko Brasiliasta. Jakson oma lähdeluettelo kääntää tämän oikein
("yksi suurimmista"), mutta itse leipäteksti muuttaa sen ehdottomaksi
superlatiiviksi ("enemmän ... kuin missään muualla"). Tämä on juuri
sellainen tapaus, jota tehtävänannon kohta 2 pyysi etsimään: lähteessä
varauksellinen väite on kirjoitettu leipätekstiin kategorisena.

**Suositus:** Muuta leipäteksti vastaamaan lähdettä ja jakson omaa
lähdeluetteloa, esim. "Alakaupungin Liberdaden kaupunginosassa asuu
suhteessa yksi Salvadorin ja koko Brasilian suurimmista
afrobrasilialaisväestön osuuksista."

---

## HUOMIOT

### C1. Osio 6 — Commons-kategorian nimi väärin: "Historic Centre of Salvador de Bahia"

Faktapohja väittää tarkistaneensa 24.8.2026 Commonsin hakurajapinnasta,
että `Category:Historic Centre of Salvador de Bahia` on olemassa. Tarkistin
tämän uudelleen suoraan `action=query&titles=`-kutsulla: kyseistä
tarkkaa kategorianimeä EI ole olemassa. Todellinen pääkategoria on
`Category:Historic center of Salvador (Bahia)` (amerikkalainen kirjoitusasu
"center", ei "Centre", ja maininta suluissa, ei "de Bahia" -muodossa).
Sen sijaan mainitut ALAKATEGORIAT — `Squares in the Historic Centre of
Salvador de Bahia`, `Neighborhoods in the Historic Centre of Salvador de
Bahia` jne. — KÄYTTÄVÄT juuri "de Bahia"-muotoa ja ovat olemassa
sellaisenaan (tarkistin, molemmat muodot esiintyvät Commonsin
kategoriapuussa rinnakkain, mikä on Commonsin oma epäjohdonmukaisuus).
Vain pääkategorian nimi faktapohjassa on siis väärä; korjaa se
kirjoitusvaiheessa muotoon "Historic center of Salvador (Bahia)".

### C2. Nosto K2:n itseraportoitu merkkimäärä ei täsmää mitattuun

Faktapohja ilmoittaa nosto K2:n pituudeksi 515 merkkiä. Mittasin itse
(sama menetelmä: lainauksen rivit yhdistettynä yhdellä välilyönnillä):
todellinen pituus on 510 merkkiä. Molemmat ovat mukavasti sallitulla
välillä 440–660, joten tällä ei ole vaikutusta laudan hyväksyttävyyteen —
mutta itse ilmoitettu luku ei ole tarkka. Kaikki muut 19 merkkimäärää
(3 muuta johdantoa + 15 muuta nostoa) täsmäsivät ilmoitettuun
merkilleen tarkasti.

### C3. H2: "viimeisenä koko Amerikan mantereella" — totta, mutta ei suoraan tämän kohdan lähteistä

Nosto H2 päättyy: "orjuus oli Brasiliassa yhä laillista: se lakkautettiin
vasta 1888, viimeisenä koko Amerikan mantereella." Väite on historiallisesti
täsmälleen oikea — tarkistin sen erikseen en-Wikipedian "Lei Áurea"
-artikkelista: "Brazil was the last country in the Americas to abolish
slavery." Tätä virkettä ei kuitenkaan löydy kummastakaan tälle nostolle
merkitystä lähteestä (Candomblé, Salvador Bahia -Government/politics-osio).
Ei siis virhe, mutta lähdeluetteloon kannattaisi kirjoitusvaiheessa lisätä
"Lei Áurea" -artikkeli tämän yksittäisen väitteen tueksi.

### C4. M2: Regional/Angola-erottelu ei ole "Salvador, Bahia" -artikkelin Capoeira-osiossa

Nosto M2 kertoo Mestre Bimban "ripeämmästä Regionalista" ja Mestre
Pastinhan "perinteisemmästä Angolasta". Tämä on asiasisällöltään oikein
— tarkistin sen en-Wikipedian omasta "Capoeira"-artikkelista, joka kuvaa
Bimban 1930-luvun Capoeira Regionalia muodollisena, kilpailullisena
tyylinä ja Pastinhan 1941 perustamaa Capoeira Angolaa perinteitä lähellä
pysyvänä tyylinä. En-Wikipedian "Salvador, Bahia" -artikkelin
Capoeira-osio, joka on merkitty M2:n AINOAKSI lähteeksi, ei kuitenkaan
mainitse Regional/Angola-erottelua lainkaan. Suositus: lisää "Capoeira"
lähdeluetteloon toiseksi lähteeksi.

### C5. M1: "suurin ja tunnetuin haara" — "tunnetuin" on lisäys

En-Wikipedian "Candomblé"-artikkeli vahvistaa Nagôn olevan candomblén
nations-haaroista suurin ("The Nagô nation is the largest"). Sana
"tunnetuin" nostotekstissä on kirjoittajan oma, looginen mutta lähteen
sanamuodolla tukematon lisäys — ei virhe, mutta syytä huomioida jos
kirjoitusvaiheessa halutaan sanatarkka lähdetuki jokaiselle adjektiiville.

### C6. Jakso 1: lentokentän nimeäminen "pitkäaikaiseksi poliitikoksi"

Jakso 1 kuvailee lentokentän nimen antajaa Luís Eduardo Magalhãesia
"Bahian osavaltion pitkäaikaisen poliitikon" mukaan nimetyksi. Tarkistin:
hän oli todella tunnetun bahialaisen Magalhães-poliitikkosuvun jäsen ja
edustajainhuoneen puhemies 1995–1997, mutta kuoli vain 43-vuotiaana 1998
— "pitkäaikainen" on tulkinnanvarainen luonnehdinta eikä suoraan
lähteestä. Ei vaadi korjausta, mutta kannattaa tiedostaa.

### C7. Elevador Lacerdan IPHAN-listausvuosi: infobox ja leipäteksti eroavat myös TÄSSÄ kohdassa

Faktapohja on jo hyvin dokumentoinut Elevador Lacerdan valmistumisvuoden
(1869 vs. 1873) ja matkustajalukujen (128/22s vs. 27/30s) sisäiset
ristiriidat (nosto H4:n HUOM). Löysin vielä yhden, dokumentoimattoman:
omistetun "Elevador Lacerda" -artikkelin infobox antaa kansallisperinnön
merkintänumeron vuodelle 2002 ("designation1_date = 2002"), kun taas
artikkelin leipäteksti ja faktapohjan käyttämä IPHAN:n oma
tiedotearkisto antavat päivämäärän 7.12.2006. Nämä eivät välttämättä ole
ristiriidassa (2002 saattaa olla suojeluprosessin aloitusvuosi, 2006
lopullisen listauksen vuosi), mutta koska faktapohja jo kertoo yhden
tämän artikkelin ristiriidan yksityiskohtaisesti, kannattaa tietää tästä
toisestakin. Faktapohjan valitsema 7.12.2006 on parhaiten tuettu (kaksi
lähdettä leipätekstissä ja IPHAN:n oma tiedote) eikä vaadi muutosta.

---

## Erikseen vahvistetut kohdat (ei löytynyt virhettä)

Seuraavat tehtävänannon erityispyynnöt tarkistin huolella eikä niistä
löytynyt virheitä:

- **Orjakaupan luvut:** "Brasilian suurin orjien tuontisatama" täsmää
  sanatarkasti en-Wikipedian "Salvador, Bahia" (Government and politics)
  -osioon ("the largest port for imported slaves in Brazil"). "Noin
  neljä miljoonaa orjuutettua afrikkalaista, enemmän kuin mihinkään
  muualle Amerikkaan" täsmää sanatarkasti "Candomblé"-artikkeliin.
  Malê-kapinan (1835) kulku, kellonajat (alkoi n. klo 1 yöllä, ratkaiseva
  taistelu n. klo 3, kukistui saman yön aikana) ja karkotettujen määrä
  (n. 200 Länsi-Afrikkaan) täsmäävät kaikki "Malê revolt" -artikkeliin.
- **Pelourinho:** nimi tarkoittaa häpeäpaalua, ja Unesco-vuosi 1985
  täsmäävät molemmat en-Wikipediaan.
- **Candomblé, capoeira ja ruoka elävänä nykykulttuurina:** teemasivun
  `mustarooma` ja `ruoka`-sivun nostot on kirjoitettu läpikonsekventisti
  preesensissä ("temppeli on yhä toiminnassa", "Salvadorin
  capoeira-piirit kokoontuvat yhä", "kaupungissa toimii yli 500
  acarajé-myyjää") eikä kertaakaan menneen ajan folklore-kehyksessä.
  Tämä vastaa Pilari 3:n vaatimusta ja on lähteiden tukema.
- **Visan viisi aihetta (kohta 5):** tarkistin, ettei mikään nosto
  toista visan sanamuotoa — jokainen (pääkaupunki-asema, capoeira,
  Pelourinho, acarajé, candomblé) käyttää eri näkökulmaa tai tarkempaa
  lukua, ja silti visan vastausten taustalla olevat perusfaktat löytyvät
  faktapohjasta.
- **Merkkimäärät (kohta 6):** kaikki 4 johdantoa (208, 209, 225, 195
  merkkiä) ja kaikki 16 nostoa mahtuvat vaadittuihin väleihin 154–232 ja
  440–660 (ks. kuitenkin C2 yllä yhdestä pienestä mittauserosta).
- **Koordinaatit (kohta 7):** kaikki 9 kohdekartan pistettä täsmäävät
  suoraan en-Wikipedian infobox- tai geosearch-koordinaatteihin, eikä
  yksikään osu merelle — kaikki ovat tunnistettavissa olevien
  maamerkkien (kirkot, museo, tori, majakka, ranta) sijainneissa.
  Tarkistin pistokokeena kaksi faktapohjan itse laskemaa etäisyyttä
  uudelleen (Farol da Barra ~4,81 km lounaaseen, Bonfim-kirkko ~5,48 km
  koilliseen) — molemmat täsmäsivät senttimetrin tarkkuudella.
- **Pilari 3/4 -tasapaino (kohta 8):** orjuus ja orjakauppa on kerrottu
  numeroin ja asiallisesti, Malê-kapinan uhriluvut on jätetty pois
  nostotekstistä juuri niin kuin faktapohja itse kertoo, eikä
  nykyrikollisuutta tai -politiikkaa käsitellä missään kohdassa —
  molemmat vahvistin olevan olemassa lähdeartikkelissa mutta poissuljettu
  faktapohjasta tarkoituksella.
- **Commons-kategorioiden olemassaolo (kohta 9):** tarkistin uudelleen
  22 mainittua kategoriaa suoraan Commonsin API:sta. 20/22 täsmäsi
  täydellisesti. Yksi (`Historic Centre of Salvador de Bahia`) on väärin
  nimetty, ks. C1. Toinen (`Mercado Modelo (Salvador)` / "Modelo Market")
  oli jo faktapohjan itsensä merkitsemä epävarmaksi, ja vahvistin sen
  puuttuvan — mutta faktapohjan käyttämä lyhyempi `Category:Mercado
  Modelo` (ilman sulkuja) on olemassa ja koskee juuri Salvadorin toria.
