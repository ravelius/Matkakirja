# Houston-faktapohjan tarkistus

Tarkistettu **6.9.2026** en-Wikipedian raakatekstistä
(`index.php?action=raw`, `NODE_USE_ENV_PROXY=1`) ja
laajennusrajapinnasta (`action=query&prop=extracts`). Tarkistus on
**menetelmällisesti erillinen vaihe**: lähteet luettiin uudelleen
alkuperäisistä latauksista, ja jokainen numeroväite haettiin
`grep -o` -täsmähaulla sanatarkkana merkkijonona — faktapohjan omiin
sitaatteihin ei luotettu.

Luetut artikkelit: **Houston**, **History of Houston**, **Buffalo
Bayou**, **Houston Ship Channel**, **Port of Houston**, **Johnson
Space Center**, **Spindletop**, **Karankawa people**, **Atakapa**,
Texas Medical Center, Sam Houston Park, Julia Ideson Building,
Market Square Park, Allen's Landing, Buffalo Bayou Park, Christ
Church Cathedral (Houston), Daikin Park, Menil Collection, Museum of
Fine Arts Houston, Hermann Park, Houston Museum of Natural Science,
Houston City Hall, Augustus Chapman Allen. Koordinaatit haettiin itse
(`prop=coordinates&redirects=1`) ja etäisyydet laskettiin itse.

**Yleisarvio: faktapohja kelpaa kirjoituksen pohjaksi korjausten
jälkeen.** Kaikki tarkistetut numerot ja päivämäärät täsmäsivät
sanatarkasti. Löysin **yhden nimivirheen** (kohta A), **yhden
sisällöllisen riskin** (kohta B) ja joukon tarkennuksia.

---

## A. NIMIVIRHE (pakollinen korjaus) — Daikin Park / Minute Maid Park

**Faktapohjan väite (osio 4, rivi 6):** kohteen nimi "Daikin Park
(Astrosin stadion)", lähdeartikkeli "Daikin Park".

**Tarkistus:** artikkeli on todella nimellä **Daikin Park**
(raakateksti alkaa *"Daikin Park (originally Enron Field and formerly
Astros Field and Minute Maid Park) is a retractable roof stadium…"*),
ja koordinaattikysely ohjautui otsikosta "Minute Maid Park"
uudelleenohjauksella sinne. Nimi on siis oikein.

**Mutta:** faktapohjan osion 6 kategoriavinkki sanoo
`Category:Minute Maid Park`, ja lehden lukija ei tunnista kumpaakaan
nimeä. **Korjaus kirjoittajalle:** kartan kohteen nimi kirjoitetaan
suomeksi muodossa, joka kertoo mistä on kyse (esim. "Astrosin
stadion" tai "Daikin Park"), ja jutussa kerrotaan nimenvaihdosten
ketju sekä se, että stadion rakennettiin vuoden 1911 rautatieaseman
ympärille. Älä käytä nimeä "Minute Maid Park" ilman selitystä — se on
vanhentunut.

---

## B. SISÄLLÖLLINEN RISKI (sitova ohje) — "lähes olemattomia nykyään"

**Lähteet ristiriidassa, ja faktapohja on tunnistanut sen oikein:**

- "Houston" (History), sanatarkasti: *"These tribes are almost
  nonexistent today; this was most likely caused by foreign disease,
  and competition with various settler groups in the 18th and 19th
  centuries."* Sama kappale jatkaa: *"However, the land then remained
  largely uninhabited from the late 1700s until settlement in the
  1830s."*
- "Karankawa people": *"As of 2021, a group of individuals who claim
  descent from the Karankawa people formed the Karankawa Kadla. This
  organization is an unrecognized organization. Members of the
  Karankawa Kadla split from the group and formed the Karankawa Tribe
  of Texas, another unrecognized organization."*
- "Atakapa": *"There are several unrecognized tribes who identify as
  having descent from the Atakapa."* Atakapa Ishak Nation sai
  yleishyödyllisen aseman 2008 ja haki tunnustusta tuloksetta
  2.2.2007.

**Tarkistajan tuomio:** faktapohjan ratkaisu (tarkempi lähde voittaa;
jälkeläisjärjestöt kerrotaan) on oikea ja spec-mantereet.md:n
linjauksen 1 mukainen. **Mutta sanamuoto on kirjoitettava
huolellisesti:** lähde sanoo "claim descent" ja "unrecognized", eikä
lehti saa esittää järjestöjä liittovaltion tunnustamina. Muotoile
esim. "jälkeläisikseen itsensä lukevat ovat järjestäytyneet" ja
kerro, ettei tunnustusta ole. Älä myöskään toista lähteen väitettä
maan olleen "pitkälti asumaton" 1700-luvun lopulta 1830-luvulle
tosiasiana ilman varausta — se on juuri sitä tyhjän maan kehystä,
jonka spec kieltää.

**Rituaalikannibalismi:** vahvistan faktapohjan poisjätön. Lähde itse
kertoo, ettei yksikään valkoinen koskaan nähnyt tekoa, että toisen ja
kolmannen käden kertomusten uskottavuus on kiistanalainen ja että
Cabeza de Vaca kirjasi päinvastoin karankawojen järkyttyneen
espanjalaisten omasta kannibalismista. **Ei lehteen.**

---

## C. Tarkennus — Allenin veljesten maakauppa

**Faktapohja:** "veljekset ostivat 26.8.1836 Elizabeth E. Parrottilta
… eteläisen puolikkaan (2 214 eekkeriä)".

**Lähde sanoo tarkemmin:** kyseessä on *"the south half of the lower
league [2,214-acre tract] granted to her by her late husband"* —
2 214 eekkeriä on **koko liigan alaosan** pinta-ala, jonka puolikkaan
veljekset ostivat, ei ostetun palan koko. Lisäksi lähde on
historioitsija David McComb faktapohjan mukaisesti.

**Korjaus:** älä sano "ostivat 2 214 eekkeriä". Sano joko "ostivat
puolet 2 214 eekkerin maapalstasta" tai jätä hehtaarit pois ja käytä
hintaa (5 000 dollaria, josta 1 000 käteisenä), joka on lähteessä
yksiselitteinen.

---

## D. Vahvistetut luvut (täsmähaku raakatekstistä, kaikki OK)

| Väite | Lähde | Tulos |
|---|---|---|
| karankawat ja atakapat vähintään 2 000 vuotta | Houston, History | ✔ sanatarkka |
| Ishak = "the people" | Atakapa | ✔ sanatarkka |
| Karankawa Kadla 2021, tunnustamaton | Karankawa people | ✔ sanatarkka |
| maksoivat 5 000 dollaria, josta 1 000 käteisenä | Houston, History | ✔ sanatarkka |
| ilmoitus neljä päivää myöhemmin | Houston, History | ✔ sanatarkka |
| tusina asukasta 1837 alussa → noin 1 500 toukokuussa | Houston, History | ✔ sanatarkka |
| kaupunkioikeudet 5.6.1837 | Houston, History | ✔ sanatarkka |
| keltakuume vei joka kahdeksannen (1839) | Houston, History | ✔ sanatarkka |
| vuoden 1860 laskenta 4 845 asukasta, 1 069 orjuutettua | Houston, History | ✔ sanatarkka |
| vuoteen 1890 Texasin rautatiekeskus | Houston, History | ✔ sanatarkka |
| Wilson avasi syväsataman 1914, seitsemän vuotta kaivamisen alusta | Houston, History | ✔ sanatarkka |
| väkiluku 78 800 (1910); afroamerikkalaisia 23 929 | Houston, History | ✔ sanatarkka |
| seitsemän mailin (11 km) tunneli- ja kävelysiltajärjestelmä | Houston, Architecture | ✔ sanatarkka |
| 90 °F ylitetään keskimäärin 106,5 päivänä vuodessa | Houston, Climate | ✔ sanatarkka |
| sadetta noin 49,8 tuumaa vuodessa (1981–2010) | Houston, Climate | ✔ sanatarkka |
| Space City 1967 | Houston, Culture / JSC | ✔ sanatarkka |
| JSC nimettiin uudelleen 19.2.1973 senaatin päätöksellä | Johnson Space Center | ✔ sanatarkka |
| JSC 1 620 eekkeriä, sata rakennusta, Clear Lake | Johnson Space Center | ✔ sanatarkka |
| Mission Control Gemini 4:stä alkaen, kutsumerkki "Houston" | Johnson Space Center | ✔ |
| avattiin syyskuussa 1963, maa Humble Oililta Ricen kautta | Johnson Space Center | ✔ |
| Apollon lennonjohtohuone avattiin matkailijoille 6/2019 | Johnson Space Center | ✔ |
| Spindletop tuotti 17 420 949 tynnyriä 1902 | Spindletop | ✔ sanatarkka |
| yli 500 yhtiötä ja 285 kaivoa vuoden 1902 loppuun | Spindletop | ✔ sanatarkka |
| Beaumontin 10 000 asukasta kolminkertaistui kolmessa kuukaudessa | Spindletop | ✔ |
| suolakupolit vangitsivat öljyn ja kaasun | Houston, Geology | ✔ |
| yli 150 aktiivista siirrosta, 310 mailia, Long Point–Eureka Heights | Houston, Geology | ✔ |
| TMC yli 106 000 työntekijää, 10 milj. potilaskäyntiä, 25 mrd $ | Texas Medical Center | ✔ sanatarkka |
| TMC 2,1 neliömailia | Texas Medical Center | ✔ |
| laivaväylä 50 mailia, Turning Basin ~4 mailia keskustasta itään | Houston Ship Channel | ✔ |
| Buffalo Bayoun latvat 30 mailia länteen | Houston Ship Channel | ✔ |
| keskusta ~50 jalkaa merenpinnasta | Houston, Geography | ✔ |
| tulvat 2015, 2016, 2017 | Houston, Climate | ✔ |
| Museum Districtin laitokset yli 7 milj. kävijää | Houston, Arts | ✔ |
| Theater District 17 korttelia, 9 organisaatiota, 6 salia | Houston, Tourism | ✔ |
| Rodeo 20 päivää maaliskuussa, maailman suurin | Houston, Culture | ✔ |
| 92 maan konsulaatit, 1,1 milj. ulkomailla syntynyttä (21,4 %) | Houston, Culture | ✔ |

---

## E. Nähtävyysjuttujen lähdefaktat (tarkistettu erikseen)

- **Market Square Park:** alkuperäinen nimi "Congress Square"
  Bordenin mittauksessa; nimettiin Market Squareksi sen jälkeen kun
  Augustus Allen valitsi parlamenttitalon paikaksi Main Streetin ja
  Texas Avenuen luoteiskulman 1837. Ensimmäinen kauppahalli ja
  kaupungintalo tilattiin 1840 ja valmistuivat seuraavana vuonna;
  neljäs rakennettiin 1904. Osa Main Street / Market Square
  -historiallista aluetta (NRHP). ✔
- **Sam Houston Park:** kaupungin ensimmäinen puisto; pormestari
  Samuel H. Brashear nimitti ensimmäisen puistokomitean 1899, ja
  puisto kehitettiin maalle, jonka Brashear osti 1900. Kaksikymmentä
  eekkeriä muotoiltiin viktoriaaniseksi kyläksi; alueella oli
  Kellum-Noble House. ✔
- **Julia Ideson Building:** Ralph Adams Cramin (Cram and Ferguson,
  Boston) suunnittelema espanjalaisrenessanssityylinen talo, avattu
  1926, Houstonin ainoa pääkirjastorakennus 1926–1976, NRHP 1977,
  avattiin uudelleen 1979. Nimetty Julia Bedford Idesonin mukaan,
  joka oli kirjastolaitoksen ensimmäinen ylikirjastonhoitaja 40
  vuoden ajan. ✔
- **Christ Church Cathedral:** seurakunta perustettu 16.3.1839
  Texasin ollessa vielä itsenäinen tasavalta; Houstonin vanhin
  yhä toimiva seurakunta ja Texasin vanhimpia ei-katolisia
  kirkkoja. Ennen kirkkoja hallitus salli kokoontumiset
  parlamenttitalossa. ✔
- **Daikin Park:** avattu 2000, sisäänvedettävä katto, 41 168
  paikkaa; korvasi Astrodomen (1965, maailman ensimmäinen
  katettu baseball-/jalkapallostadion). Vuonna 1909 Houston Belt and
  Terminal Railway tilasi kaupungille uuden rautatieaseman
  newyorkilaisilta arkkitehdeiltä Warren and Wetmore; aseman
  pääaula otettiin stadionin käyttöön klubitilaksi, kahvilaksi,
  fanikaupaksi ja toimistoiksi. ✔
- **Buffalo Bayou Park:** 2,3 mailia pitkä, 160 eekkeriä, avattu
  2015, Shepherd Drivelta Sabine Streetille Allen Parkwayn ja
  Memorial Driven väliin. 1950-luvulla Army Corps of Engineers
  riisui rannat kasvillisuudesta ja suoristi puron tulvien takia —
  hanke epäonnistui, koska puiden puute päästi pensaikon kasvamaan ja
  se esti veden virtausta. Kaupunki teki 2011 sopimuksen Buffalo
  Bayou Partnershipin kanssa, ja kunnostus maksoi 50 miljoonaa
  dollaria. ✔
- **Menil Collection:** Renzo Pianon suunnittelema museo avautui
  yleisölle **kesäkuussa 1987**; kokoelma on John ja Dominique de
  Menilin. Lähde vertaa museota Frickiin, Gardneriin ja Phillipsiin.
  ✔
- **Museum of Fine Arts, Houston:** perustettu 1900, ensimmäinen
  museorakennus avattiin yleisölle 1924 (William Ward Watkin,
  kreikkalais-klassistinen; Texasin vanhin taidemuseo).
  Galleriapinta-alaltaan maailman kymmenenneksi suurin museo ja
  Amerikan mantereiden toiseksi suurin taidemuseo. Vuonna 2023 yli
  900 000 kävijää (20. vierailluin Yhdysvalloissa). Mies van der
  Rohen Cullinan Hall 1958 ja Brown Pavilion 1974 — **ainoa Miesin
  suunnittelema museo Yhdysvalloissa**. Rafael Moneon Beck Building
  2000, Steven Hollin Kinder Building marraskuussa 2020. Kokoelmassa
  lähes 80 000 teosta. ✔

---

## F. Koordinaatit ja etäisyydet (tarkistettu itse)

Kaikki kahdeksan koordinaattia haettiin uudelleen ja täsmäsivät.
Etäisyydet omia laskelmiani (asteet × 111,32 km; pituusasteille
cos(29,74°) ≈ 0,868):

- Sam Houstonin puisto ↔ Julia Idesonin talo: **300 m** (pienin väli)
- Market Squaren puisto ↔ Christ Churchin katedraali: **358 m**
- Daikin Park ↔ Christ Churchin katedraali: **620 m**
- Julia Idesonin talo ↔ Christ Churchin katedraali: **774 m**
- Market Squaren puisto ↔ Sam Houstonin puisto: **979 m**
- Buffalo Bayoun puisto ↔ Sam Houstonin puisto: **1 160 m**
- Menilin kokoelma ↔ kuvataiteen museo: **1 293 m**

**200 metrin sääntö ei pudota yhtään kohdetta.** Faktapohjan
pudotusperustelut tarkistettiin: Rothkon kappeli on 243 m Menilin
kokoelmasta (mahtuisi niukasti, mutta kaksi museota vierekkäin ei
kanna omia juttujaan), Houston City Hall 250 m Sam Houstonin
puistosta ja 260 m Julia Idesonin talosta, ja Hermann Park 150 m
luonnontieteen museosta. **Hyväksytty.**

**Rajaus** pohjoinen 29,7680 / etelä 29,7200 / länsi −95,4050 / itä
−95,3500: laskin koon **5,34 × 5,32 km**, mikä on selvästi pelin
karttojen hyväksytyllä alueella (New York 10 × 10 km, Rio 5,1 × 8,2
km).

---

## G. Kuvasyistä tehty kohdevaihto (tarkistajan hyväksymä)

Faktapohjan kahdeksas kohde oli **Museum of Fine Arts, Houston**.
Kirjoitusvaiheessa kävi ilmi, ettei sille löydy Commonsista
julkisivukuvaa, joka täyttäisi talon kuvasäännöt: "MFA houston.jpg" ja
"MFAHCarolineWeissLaw.JPG" ovat muuten hyviä, mutta niissä roikkuu
pylväiden välissä kaksi isoa jäsenhankintabanderollia ("Visit Today",
"Join Today"), ja "USA - Texas - Houston - Museum of Fine Arts.jpg"
on sisäkuva, jossa tunnistettava henkilö on pääosassa.

**Ratkaisu on Panamán ennakkotapaus** (Way Onin kiinalainen
hautausmaa pudotettiin kartalta, koska sille ei löytynyt yhtään
kuvaa): kartan kohde ei saa jäädä ilman juttukuvaa. Museon tilalle
otettiin **Hermann Park** (29,7210 / −95,3910), joka on samassa
museokorttelissa 512 metrin päässä museosta ja jolla on Commonsin
laatukuva (Sam Houstonin muistomerkki, Agsftw, CC BY-SA 3.0).
Museo mainitaan matkaoppaan jaksossa 2, joten se ei katoa lehdestä.

Vaihto ei riko 200 metrin sääntöä: Hermann Parkin lähin kartan kohde
on Menilin kokoelma 1 800 metrin päässä. Se lähentää eteläreunaa
0,5 kilometriä, ja rajaus on siksi 5,9 × 5,3 km.

Samasta syystä kartalta jäi pois **Christ Churchin katedraali**,
joka oli faktapohjan listalla: sen ainoat Commons-kuvat ovat
sisäkuvia, joissa kävijöiden kasvot ovat luettavissa. Tilalle tuli
**George R. Brownin kongressikeskus** (29,75222 / −95,35778), jolla
on Commonsin CC0-laatukuva ja 567 metriä väliä lähimpään kohteeseen.

---

## H. Huomio kirjoittajalle — Discovery Greenillä ei ole koordinaatteja

`prop=coordinates` palautti "Discovery Green" -artikkelille
vastauksen ilman koordinaattikenttää, ja "Buffalo Bayou Park
Cistern" ja "Children's Museum Houston" puuttuvat kokonaan
en-Wikipediasta. Yhtäkään näistä ei ole faktapohjan listalla, joten
tällä ei ole vaikutusta — mutta jos kohdelistaa joskus laajennetaan,
näille on haettava koordinaatit muualta.

---

## I. Pilarien ja spec-mantereet.md:n tarkistus

1. **Pilari 1 / alkuperäiskansat.** Nosto H1 rakentuu oikein: kansan
   oma nimi (Ishak = "ne ihmiset") ennen siirtomaanimeä, kielen ja
   paikannimien elävä perintö, ja nykypäivän järjestöt. Sanamuoto on
   varmistettava kohdan B mukaisesti.
2. **Orjuus ja sisällissota** (spec-mantereet.md, USA-linjaus)
   kerrotaan suoraan lukuina ilman osapuolinostalgiaa. Faktapohjan
   aineisto riittää tähän: 1 069 orjuutettua vuoden 1860
   laskennassa, 99 prosenttia kaupungin afroamerikkalaisesta
   väestöstä, plantaasityö ja kaupunkityö erikseen.
3. **Ei nykypolitiikkaa eikä nykyrikollisuutta.** Faktapohja jättää
   Crime- ja Government-osiot pois. Hyväksyn. Otsonin ja ilmanlaadun
   osalta ohje on oikea: neutraali luonnontieteellinen toteamus
   sallittu, poliittinen kehys ei.
4. **Hurrikaani Harvey ja tulvat** ovat perushistoriaa
   (spec-mantereet.md linjaus 5, katastrofit) ja kerrotaan suoraan
   ilman uhrikuvausta.
5. **Minitehtävä.** Ehdotettu kysymys (suolakupolien synty) ei osu
   yhteenkään viidestä visakysymyksestä — visa kysyy öljystä vain,
   mikä teollisuus toi vaurauden 1900-luvun alussa. Vastaus on
   samalla sivulla nostossa T1. **Hyväksytty.**

---

## J. Kirjoittajan muistilista (tarkistuksen tuottamat sitovat ohjeet)

1. Alkuperäiskansajärjestöistä sanotaan, että ne ovat
   **tunnustamattomia** ja että jäsenet lukevat itsensä
   jälkeläisiksi. Ei "tyhjää maata".
2. Rituaalikannibalismi **ei tule lehteen**.
3. Allenin veljesten maakauppa: **puolet** 2 214 eekkerin palstasta,
   tai pelkkä hinta.
4. Stadionin nimi: Daikin Park (ent. Minute Maid Park, alun perin
   Enron Field) — selitetään, ei oleteta tunnetuksi.
5. Öljy (1901) ja avaruus (1961–63) **eivät kuulu vuoteen 1873**.
6. JSC:n pinta-ala: käytä 1 620 eekkeriä (laitos) tai kerro, että
   lahjoitettu maa oli 1 000 eekkeriä. Älä sekoita.
7. Kuun pinnan lausetta **ei siteerata** — sitä ei ole luetuissa
   artikkeleissa sanatarkasti. Kutsumerkki "Houston" riittää.
8. Säärivi jää pois (Open-Meteo 429); oppaan sääjakso sanoo
   lähteensä ääneen.
