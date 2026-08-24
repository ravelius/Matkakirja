# Manaus — faktantarkistus

Riippumaton tarkistus faktapohjalle `faktapohja-manaus.md`. Kaikki lähteet
haettu uudelleen **24.8.2026** suoraan en-Wikipedian `action=raw`-raakatekstistä
(Node `fetch`, `NODE_USE_ENV_PROXY=1`) sekä MediaWikin `prop=coordinates`- ja
Wikimedia Commonsin `action=query&titles=Category:...`-rajapinnoista.
Jokainen luku-, vuosiluku- ja nimivälitteinen ydinväite on tarkistettu
erikseen alkuperäisestä artikkelista — faktapohjan omia lähdeviitteitä ei
ole hyväksytty sellaisenaan. Koordinaattien etäisyydet ja ilmansuunnat
laskettu uudelleen itsenäisellä Node-skriptillä (tasomainen approksimaatio,
1° ≈ 111 km, pituusasteet kerrottu cos(3,13°)), ei faktapohjan omaa
laskelmaa lainaten. Yksi 429-rajoitus kohdattiin (Commons-kategoriahaussa,
"Teatro Amazonas") — odotettiin kasvavalla viiveellä (2s→4s→8s), neljäs
yritys onnistui.

**Kokonaisarvio ennakkoon:** faktapohja on pääosin erittäin huolellinen —
suurin osa vuosiluvuista, nimistä, koordinaateista ja merkkimääristä
täsmää lähteisiin lähes sanatarkasti. Löysin kuitenkin **viisi pakollista
korjausta**, joista yksi osuu suoraan tehtävänannon kriittisimpään
kohtaan (1873-ankkuri) ja yksi on suoraan keksitty, lähteessä
esiintymätön selitys.

---

## 1. KRIITTINEN: Grande Seca -kuivuuden ajoitus Nostossa K3 (1873-ankkuri)

Nosto K3 ("Kaupunki kumibuumin kynnyksellä") sanoo:

> "Vuoden 1872 väestönlaskennan mukaan osavaltioon oli muuttanut 2 199
> ulkomaalaista kumin perässä, suurin osa juuri Manausiin, **ja samaan
> aikaan** Brasilian koillisosan suuri kuivuus ajoi tuhansia pakolaisia
> kaupunkiin."

Tarkistin kuivuuden oman en-Wikipedia-artikkelin "Grande Seca":

> *"The Grande Seca (English: Great Drought), or the **Brazilian drought
> of 1877–1878**, was the largest and most devastating drought in
> Brazilian history."*

**Grande Seca ajoittuu siis 1877–1878 — viisi–kuusi vuotta isoisän
1873-matkan JÄLKEEN**, ei "samaan aikaan" vuoden 1872 väestönlaskennan
kanssa. Faktapohjan lähdeluettelokin kirjaa saman ajoittamattomana:
"Samaan aikaan Brasilian koillisosan suuri kuivuus (Grande Seca) ajoi
suuria määriä pakolaisia Manausiin. — en-Wikipedia 'History of Manaus'
(Rubber era)". Tämä juontuu siitä, että "History of Manaus" -artikkelin
oma "Rubber era" -kappale mainitsee 1872 väestönlaskennan ja kuivuuden
peräkkäin ilman selkeää ajoitusta ("At that time, the Brazilian Northeast
was hit by the Great Drought...") — faktapohja on perinyt lähteen
epätäsmällisen kappalejärjestyksen sellaisenaan sen sijaan että olisi
tarkistanut kuivuuden oman, tarkasti päivätyn artikkelin.

Koska K3 on nimenomaan laudan 1873-ankkuri ja koko sivun idea on näyttää
kaupunki "juuri ennen" buumia, tämä on **pakollinen korjaus**: kuivuutta
ei voi esittää samanaikaisena 1872/1873-tapahtumien kanssa. Kaksi
korjausvaihtoehtoa: (a) poistaa kuivuusmaininta K3:sta kokonaan (sitä ei
tarvita nostossa, väestönlaskentaluku 2 199 riittää itsenäisenä
todisteena kasvavasta muuttoliikkeestä), tai (b) siirtää/muotoilla se
selvästi myöhemmäksi ("myöhemmin samalla vuosikymmenellä, 1877–1878")
eikä 1872/1873 rinnalle. Itse 1879–1912-buumiajoitus ("varsinainen buumi
ajoitetaan vasta vuosiin 1879–1912") on sen sijaan täysin oikein ja
sanatarkasti tuettu — "Amazon rubber cycle" -artikkelin infobox sanoo
suoraan `date = 1879–1912` ja pääotsikko on "First rubber boom,
1879–1912". Tätä osaa K3:sta ei tarvitse muuttaa.

---

## 2. PAKOLLINEN: Etäisyys merestä Sivu A:n johdannossa (1000 km vs. 1500 km)

Kaupunkisivun johdanto (Sivu A) sanoo: *"Manaus lepää sademetsän
keskellä, **tuhannen kilometrin päässä merestä** – silti valtamerilaivat
pääsivät sinne jokea pitkin."*

Tälle väitteelle ei ole faktapohjassa lainkaan lähdeviitettä (johdannoilla
ei ole omaa Faktat-lähteet-listaa niin kuin nostoilla). Tarkistin luvun
itse: en-Wikipedian artikkeli "Amazonas (Brazilian state)" sanoo suoraan:

> *"...the capital and largest city is Manaus, a modern city of 2.1
> million inhabitants in the middle of the jungle on the Amazon River,
> **1,500 km upstream from the Atlantic Ocean**."*

Oikea luku on siis noin **1 500 km, ei 1 000 km**. Tämä sama virheellinen
"tuhat kilometriä" -luku on jo pelissä valmiina visan Q4-faktatekstissä
("Kaupunki on tuhannen kilometrin päässä merestä...", `manaus[3].fact`,
`js/packs/southamerica-questions.js`) — vaikuttaa siltä, että luku on
kopioitu sieltä tarkistamatta sitä itse Wikipediasta, ja peliin on jo
valmiiksi kirjoitettu myös **oikea** luku toisaalla (kaupungin
paikkatietoteksti: *"Manaus on noin 1 500 kilometrin päässä merestä"*,
samassa tiedostossa rivi ~2094). Uusi johdantoteksti ei siis vain ole
virheellinen suhteessa Wikipediaan, vaan myös ristiriidassa pelin oman
olemassa olevan (oikean) tekstin kanssa. **Korjaa "tuhannen kilometrin"
→ "runsaan 1 500 kilometrin" (tms.) ja lisää lähdeviite.**

---

## 3. PAKOLLINEN: Visasääntö ei kata sivujen/teemasivun johdantoja

Faktapohjan oma johdanto-osio (rivit 11–19) selittää tarkistaneensa, ettei
mikään **nosto** anna visan vastausta sen omalla sanamuodolla. Tarkistin
saman riippumattomasti myös **johdantoja** vastaan — niitä sääntö ei ole
kattanut, ja kaksi kolmesta osuu lähelle visan fact-kenttiä:

- **Sivu A:n johdanto** (yllä, kohta 2) toistaa lähes rakenteellisesti
  visan Q4-faktan: "Kaupunki on tuhannen kilometrin päässä merestä
  sademetsän keskellä. Valtamerilaivat pääsevät sinne jokea pitkin."
  vs. faktapohjan "Manaus lepää sademetsän keskellä, tuhannen kilometrin
  päässä merestä – silti valtamerilaivat pääsivät sinne jokea pitkin."
  Sanajärjestys on vaihdettu, mutta sisältö, rakenne JA numero (1000 km)
  ovat samat.
- **Sivu B:n johdanto** (teemasivu `kumibuumi`) sanoo: *"...ja rakensi
  sademetsän keskelle oopperatalon. Rikkaus tuhoutui yhtä nopeasti kuin
  syntyi, kun kumipuun siemenet päätyivät Aasiaan."* Tämä on hyvin
  lähellä sekä visan Q1-faktaa ("...rakennettiin oopperatalo keskelle
  sademetsää. Rikkaus loppui, kun kumipuun siemeniä vietiin salaa
  Aasiaan.") että Q3-faktaa (oopperatalo/Eurooppa/sademetsä).

Koska Sivu A:n numerokin osoittautui vääräksi (kohta 2), suosittelen
korjaamaan molemmat johdannot joka tapauksessa uudelleen kirjoitetuiksi —
silloin sanamuoto-overlap poistuu samalla. Sivu C:n johdanto (alkuperäis-
kansat) ei osu minkään visakysymyksen faktaan, ei toimenpiteitä.

---

## 4. PAKOLLINEN: Tullitalon (Alfândega) tiiliseinien perustelu on keksitty

Nosto R3 sanoo: *"esivalmisteiset tiiliseinät tuotiin laivalla
Englannista Manausiin, **koska Amazonasta itsestään ei löytynyt sopivaa
rakennusmateriaalia**"*, ja sama väite toistuu Faktat-listassa täsmälleen
samalla perusteella.

Luin koko en-Wikipedia-artikkelin "Customs House, Manaus" sanasta sanaan.
Materiaalin tuonnin syy, joka artikkelissa **oikeasti** annetaan, on tyyli
— ei materiaalipula:

> *"Prefabricated exposed brick blocks imported from England were used
> **as a reproduction of London's edifices** from the early 20th
> century."*

Sanaa "material" (tai mitään materiaalipulaan viittaavaa) ei artikkelissa
esiinny lainkaan — tarkistin tämän erikseen hakemalla koko tekstin läpi.
"Ei löytynyt sopivaa rakennusmateriaalia" on siis väite, jota **mikään
lähde ei tue** (tarkistuslistan kohta 3) — todennäköisesti pääteltyä
"järkevältä kuulostavaa" selitystä, joka ei kuitenkaan ole se, mitä
lähde sanoo. Todellinen syy (Lontoon arkkitehtuurin jäljittely, osana
Manaos Harbour Limitedin satamaurakkaa) on itse asiassa kiinnostavampi
yksityiskohta kumibuumin eurooppalaisesta jäljittelystä. **Korjaa väite
vastaamaan lähdettä.**

---

## 5. PAKOLLINEN: "Mindún puisto" — puiston nimi on kirjoitettu väärin

Jaksossa 2 ("Luonto keskellä kaupunkia") ja sen Faktat-listassa käytetään
nimeä "Mindún puisto" kahdesti tekstissä ja kerran lähdeluettelossa.
En-Wikipedian "Manaus"-artikkeli käyttää nimeä johdonmukaisesti muodossa
**"Mindu Park"** / **"Parque do Mindú"** / **"Mindu Municipal Park"** —
ei koskaan "Mindún" (ylimääräinen n-kirjain lopussa). Haku koko
artikkelitekstistä ei löydä muotoa "Mindún" kertaakaan. **Korjaa "Mindún
puisto" → "Mindú puisto"** kaikkialla tekstissä. Itse asiafakta (perustettu
1989, harvoja elinympäristöjä uhanalaiselle tamariinille) on oikein.

---

## 6. Muut tarkistetut ydinväitteet — VAHVISTETTU

Seuraavat on tarkistettu itsenäisesti ja täsmäävät lähteisiin (osin
sanatarkasti):

- **Amazon-teatteri (R1, K3):** idea 1881 (Antonio José Fernandes
  Júnior), rahoitus/kilpailu 1882 (presidentti José Lustosa Paranaguá),
  rakennustyöt alkoivat 1884, pysähdyksiä 1885–1892, vihitty 31.12.1896,
  ensi-ilta La Gioconda 7.1.1897. Materiaalit: kattotiilet Alsacesta,
  teräs Glasgow'sta, Carrara-marmori Italiasta, sisustus Ranskasta
  (Louis Quinze). Kaikki VAHVISTETTU sanasta sanaan artikkelista "Amazon
  Theatre".
- **Encontro das Águas (K2):** Rio Negro ~2 km/h, 28 °C; Solimões 4–6
  km/h, 22 °C — VAHVISTETTU molemmista artikkeleista. 6 km vs. 9 km
  -ristiriita eri osioiden välillä VAHVISTETTU todeksi (myös
  {{Clarify span}}-toimittajamerkintä lähteessä olemassa). "Manaus"-
  artikkelin oma sisäinen ristiriita lämpötilan merkityksestä
  (Meeting of Waters -alaosio kieltää sen, "Meeting of Waters"
  -pääartikkeli vahvistaa sen) VAHVISTETTU sanasta sanaan.
- **Sähköistys (R2):** Manaus ensimmäinen urbanisoitu, toinen
  sähköistetty kaupunki Brasiliassa (Camposin jälkeen); Eduardo Ribeiron
  kausi alkoi 1892, toi raitiovaunut/puhelimet/sähkön/vesijohdot/kelluvan
  sataman — VAHVISTETTU sanasta sanaan.
- **Vapaakauppa-alue (K4):** Decree-Law 288, 28.2.1967; väkiluku ylitti
  miljoonan 1991, kaksi miljoonaa 2014, "kaksinkertaistuen 23 vuodessa"
  — VAHVISTETTU sanasta sanaan.
- **Siemensalakuljetus (R4):** Henry Wickham, 70 000 siementä, 1876,
  Malesia/Sri Lanka/tropiikin Afrikka; Aasian tuotanto murtaa monopolin
  1910 mennessä; kelluva kaupunki 1920-luvulla, vakiintui 1960-luvulla —
  VAHVISTETTU.
- **Ajuricaba (A2):** manaó-johtaja, liittoutui Alankomaiden kanssa,
  Hollannin lippu kanootissa, pelko muiden kansojen (ja orjuutettujen
  afrikkalaisten) innostumisesta kapinaan, hukkui n. 1728 vangittuna
  matkalla oikeuteen, kaupunki nimetty hänen kansansa mukaan —
  VAHVISTETTU.
- **Baré-kansa (A3):** 11 472 henkeä (2014), Xié-joki ja Rio Negron
  yläjuoksu, maanviljely/metsästys/kalastus/piassava-kuidun myynti,
  baré-kieli lähes sammunut (2 puhujaa 2012), nheengatu karmeliittojen
  levittämänä, protestantit/katoliset, šamaanit yhä käytössä —
  VAHVISTETTU sanasta sanaan.
- **Cabanagem (A4):** 1835–1840, väkiluku 100 000 → 60 000, Alto
  Amazonasin osallistuminen ratkaisevaa Amazonasin osavaltion synnylle —
  VAHVISTETTU.
- **Fort/nimihistoria (A1, K1):** manaó/baré/baniwa/passé auttoivat
  linnoituksen rakentamisessa 1669; kylästatus 1832, kaupunkistatus
  1848; nimi Manaus vasta 1856 (Herculano Ferreira Pena, laki 68) —
  VAHVISTETTU. 1832-nimiristiriita ("Manaus" vs. "History of Manaus")
  VAHVISTETTU todeksi molemmista artikkeleista.
- **Katedraali (K3, Jakso 4):** tuhoutui tulipalossa 1850, avattiin
  1878, kreikkalaistyylinen, materiaalit Portugalista (kellot, alttarit
  Lissabonin kalkkikivestä), hiippakunta 1892, katedraaliasema vasta
  1946 — VAHVISTETTU sanasta sanaan.
- **Sää (osio 5):** Köppen Am; vuosikeskiarvo 27,4 °C; kuukausikeskiarvot
  26,6–28,6 °C VAHVISTETTU tarkasti weatherboxista; ennätykset (weatherbox
  38,3 °C / 12,1 °C, leipäteksti 39,0 °C 2015 / 12,0 °C 1989) molemmat
  VAHVISTETTU; "extremes 1872–present" VAHVISTETTU sanasta sanaan
  weatherboxin location-kentästä; sademäärä 2300 mm (leipäteksti) ja
  2362,4 mm (oma summaus weatherboxin 12 kuukausiluvusta — laskin
  itsenäisesti, täsmää faktapohjan lukuun 2362 mm asti) VAHVISTETTU;
  rannat elo-marraskuu / vesi nousee joulukuusta VAHVISTETTU sanasta
  sanaan.
- **Kohdekartan yhdeksän pistettä (osio 4):** kaikki yhdeksän koordinaattia
  laskettu uudelleen artikkelien omista infobox-koordinaateista
  (DMS→desimaali) ja täsmäävät faktapohjan taulukkoon senttimetrin
  tarkkuudella yhtä poikkeusta lukuun ottamatta (ks. huomio 3 alla).
  Wikidata-ankkuripiste (−3,1189, −60,0217) VAHVISTETTU MediaWikin
  coordinates-rajapinnasta suoraan; ~1,3 km pohjoiseen -etäisyys Teatro
  Amazonasista VAHVISTETTU omalla laskennalla (1,28 km, valtaosin
  pohjoiseen). Kaikki yhdeksän etäisyys/suuntapari osiossa 4 laskettu
  uudelleen itsenäisesti — kaikki täsmäävät (± pyöristys).
- **Commons-kategoriat (osio 6):** kaikki 14 tarkistettavissa ollutta
  kategoriaa (Teatro Amazonas, Museu do Teatro Amazonas, Interior of
  Teatro Amazonas, Manaus, Centro (Manaus), Manaus in the 19th century,
  Mercado Municipal/Adolpho Lisboa, Alfândega de Manaus, Catedral
  Metropolitana de Manaus, Palácio Rio Negro (Manaus), Ponte Rio Negro,
  Porto de Manaus, Museu do Porto de Manaus, Meeting of Waters,
  Negro-Amazon confluence, Ponta Negra (Manaus), Praia da Ponta Negra
  (Manaus), Parque Nacional de Anavilhanas, Zoológico do CIGS, Baniwa
  people, Indigenous peoples in Amazonas (Brazil)) VAHVISTETTU OLEMASSA
  OLEVIKSI suoraan `action=query`-rajapinnalla. Faktapohjan oma huomio
  siitä, ettei "Category:Baré people" eikä "Category:Baré Indians" ole
  olemassa, VAHVISTETTU todeksi — molemmat palauttavat "missing".
- **Merkkimäärät:** mittasin kaikki 12 nostoa ja 3 johdantoa itse
  (Python, `len()` merkkijonolle). Tulos täsmää faktapohjan omiin
  ilmoitettuihin lukuihin JOKAISESSA kohdassa (216/218/223 johdannoille,
  458–569 nostoille) — kaikki sallituissa rajoissa (johdannot 154–232,
  nostot 440–660). Ei korjattavaa.
- **Palácio Rio Negro:** "kumiparonin talo, nyt museo" -kuvaus VAHVISTETTU
  (Karl Waldemar Scholzin residenssi 1903, ostettu valtiolle 1918,
  museoksi 1995).

---

## 7. Pilari 3 -arvio: alkuperäiskansat ja pakkotyö

Faktapohjan oma päätös olla sisällyttämättä yksityiskohtaista pakkotyön
kuvausta (osio 7, kohta 8) on **perusteltu**: tarkistin itse
"Amazon rubber cycle" -artikkelin "Effects on indigenous population"
-osion kokonaan. Se antaa erittäin yksityiskohtaisia, numeroituja
kuvauksia Perusta (Putumayo-genosidi, 40 000+ kuollutta), Kolumbiasta,
Boliviasta ja Venezuelasta, mutta **ei anna yhtään suoraan Manausiin tai
Amazonasin osavaltioon sidottua lukua tai tapahtumaa** — VAHVISTETTU.
Ratkaisu olla keksimättä yksityiskohtia sinne, missä lähde ei niitä anna,
on juuri oikea.

Tasapaino muuten on hyvä: alkuperäiskansat esiintyvät sekä
kaupungin nimen antajina (A1) että vastarintana (A2, Ajuricaba) että
nykyisenä elävänä kansana (A3, Baré 11 472 henkeä tänään) — ei pelkkänä
buumin taustana. Yksi pieni huomio Cabanagem-nostosta (A4) alla.

---

## 8. Huomiot (eivät vaadi korjausta ennen kirjoittajan työtä)

1. **A4:n pull-quote pudottaa "mustat" pois näkyvästä tekstistä.**
   Lähdeartikkeli "Manaus" (Cabanagem-osio) nimeää kapinallisiksi
   nimenomaan *"blacks, Native Americans, and mestizos"*, ja tämä on
   kirjattu oikein Faktat-listaan. Itse nosto A4:n lukijalle näkyvä
   pull-quote kuitenkin muotoilee: "köyhät vapaat miehet, erityisesti
   alkuperäiskansojen ja mestitsien jälkeläiset" — "mustat" puuttuu
   kokonaan näkyvästä tekstistä, vaikka lähde nimeää heidät yhtenä
   kolmesta pääryhmästä. Pilari 3:n hengessä kannattaisi harkita heidän
   sisällyttämistään myös lukijalle näkyvään tekstiin, ei vain
   alaviitteeseen.

2. **"Kaupunginvaltuutettu" Antonio José Fernandes Júnior — käännös voi
   olla epätarkka.** En-Wikipedia sanoo hänen olleen *"a member of the
   local House of Representatives"* — tämä viittaa todennäköisemmin
   provinssin/osavaltion lakiasäätävään elimeen kuin kaupunginvaltuustoon.
   Suomennos "kaupunginvaltuutettu" (K3, R1) saattaa siis olla yhden
   hallinnon tason verran väärä; harkitse "maakuntavaltuuston jäsen" tms.
   Ei vaikuta muihin faktoihin.

3. **Manausin sataman (kohde 7) pituusaste: pieni pyöristysvirhe.**
   Faktapohjan taulukko antaa 60,01706°W, mutta infoboxin
   DMS-koordinaatista ({{coord|3|8|35|S|60|1|1|W}}) laskettuna oikea
   arvo on 60,01694°W (ero ~13 m, merkityksetön kartalla, mutta "omia
   laskelmiani"-väite ei tässä yhdessä kohdassa täsmää täydellisesti).

4. **Ponta Negran etäisyys keskustasta — kolmas sisäinen ristiriita
   Wikipediassa, jota faktapohja ei ole listannut osiossa 7.**
   "Manaus"-artikkelin "Sights and attractions" -osio sanoo rannan
   olevan *"about 18 km from downtown"*, mutta saman artikkelin "Parks"
   -osio sanoo *"located 13 km from downtown Manaus"*. Faktapohjan oma
   koordinaattilaskelma (11,7 km Teatro Amazonasista) ei suoraan täsmää
   kumpaankaan, koska ankkuripiste ja "downtown" eivät välttämättä ole
   sama piste — mutta itse Wikipedia-ristiriita (18 km vs. 13 km)
   kannattaisi mainita osion 7 ristiriitalistassa muiden kolmen
   (nimi/lämpötila/matkanpituus) rinnalla, kattavuuden vuoksi. Ei
   vaikuta mihinkään yksittäiseen nostoon, koska Jakso 5 ei mainitse
   Ponta Negran etäisyyttä numerona.

5. **Port_of_Manaus-artikkeli antaa NELJÄNNEN version nimihistoriasta.**
   Sen ohessa "History"-osio sanoo: *"In 1850 it was renamed Manaos
   after a local Indian river tribe"* — kolmas, aiemmin
   dokumentoimaton versio (osion 7 kohta 1 vertailee vain "Manaus"- ja
   "History of Manaus" -artikkeleita, joiden mukaan nimi olisi joko
   1832 tai 1856). "Port of Manaus" on selvästi ohuempi/vähemmän
   ylläpidetty artikkeli eikä siihen kannata nojata, mutta maininta
   ristiriitalistassa olisi täydellisyyden vuoksi paikallaan. K1:n
   nostoteksti on jo turvallisesti muotoiltu niin, ettei se väitä
   mitään nimestä ennen 1848 — ei siis vaadi korjausta.

6. **Ajankohtainen lisätieto (ei virhe, vain mahdollisuus):** Amazon
   Theatre nimettiin heinäkuussa 2026 osaksi Unescon maailmanperintö-
   kohdetta "Amazonia Theaters" yhdessä Teatro da Paz'n kanssa
   (VAHVISTETTU infoboxista). Faktapohja jättää tämän tarkoituksella
   pois "ei nykytapahtumia" -periaatteen mukaisesti (osio 7 kohta 12) —
   johdonmukaista, mutta kirjoittaja voi halutessaan mainita sen yhden
   virkkeen mittaisena "tänään"-koukkuna teemasivulla, jos sellainen
   sopii muotoon.

---

## Korjauslista kirjoittajalle

**PAKOLLISET KORJAUKSET (5):**

1. Nosto K3: poista tai siirrä Grande Seca -kuivuusmaininta pois
   "samaan aikaan" 1872/1873-kehyksestä — kuivuus oli 1877–1878.
2. Sivu A:n johdanto: "tuhannen kilometrin päässä merestä" →
   "runsaan 1 500 kilometrin päässä merestä" (lähde: "Amazonas
   (Brazilian state)").
3. Sivu A:n ja Sivu B:n johdannot: kirjoita uudelleen niin, etteivät
   ne toista visan Q1/Q3/Q4-faktojen sanamuotoa/rakennetta (korjautuu
   osin automaattisesti korjauksen 2 myötä).
4. Nosto R3: korjaa tullitalon tiiliseinien perustelu — syy oli
   Lontoon arkkitehtuurin jäljittely, ei materiaalipula Amazonasissa.
5. Jakso 2 (kahdesti) ja sen Faktat-lista: "Mindún puisto" →
   "Mindú puisto".

**HUOMIOT (6):** ks. osio 8 yllä — eivät estä kirjoittajan työn
aloittamista, mutta kannattaa huomioida.

---

## Kelpaako-tuomio

**KELPAA KORJAUSTEN JÄLKEEN.**

Faktapohja on laajalti erittäin huolellisesti koostettu — koordinaatit,
merkkimäärät, Commons-kategoriat ja valtaosa vuosiluvuista/nimistä
täsmäävät lähteisiin sanatarkasti, ja Pilari 3:n tasapaino
(alkuperäiskansat elävinä nykykansoina, pakkotyön rajaus perusteltu)
on onnistunut. Löysin kuitenkin viisi pakollista korjausta, joista yksi
(Grande Seca -ajoitus) osuu suoraan laudan 1873-ankkuriin ja yksi
(tullitalon materiaaliselitys) on suoraan lähteessä esiintymätön keksitty
peruste — molemmat juuri sitä tyyppiä, jota riippumaton tarkistus on
tarkoitettu löytämään. Suosittelen korjaamaan nämä viisi kohtaa ennen
kuin lehteä aletaan kirjoittaa niiden pohjalta.
