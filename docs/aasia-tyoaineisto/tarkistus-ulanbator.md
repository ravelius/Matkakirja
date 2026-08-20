# Ulan Bator -faktapohjan riippumaton tarkistus

Tarkistin `faktapohja-ulanbator.md`:n väitteet hakemalla en-Wikipedian
raakatekstin itse (`action=raw`, NODE_USE_ENV_PROXY=1, #REDIRECT seurattu)
seuraavista artikkeleista: Ulaanbaatar, Winter Palace of the Bogd Khan,
Naadam, Ger district, Yurt, Ulaanbaatar railway station, Sükhbaatar Square,
National Museum of Mongolia, Choijin Lama Temple, Gandantegchinlen
Monastery, Zaisan Memorial, Bogd Khan Mountain, Bogd Khan, Ger (disambig),
Bogd Khan Palace Museum (404, vahvistaa väärän otsikon), National Sports
Stadium (Mongolia) ja Manjusri Monastery. Laskin kaikki kohdekartan
etäisyydet ja ilmansuunnat itse haversine-kaavalla, ja tarkistin kaksi
puuttuvaksi väitettyä koordinaattia myös Overpassista (OSM).

**Yleisarvio: koostaja on tehnyt erittäin huolellista työtä.** Lähes
kaikki numerot, vuosiluvut, sitaatit ja koordinaatit täsmäävät
sanatarkasti lähteeseen. Löysin kaksi todellista asiavirhettä (molemmat
osiossa 7/osiossa 4, "ei löytynyt koordinaattia" -väitteet) ja muutaman
pienen tarkkuusvirheen. Yksikään noston tai jakson lukijalle näkyvä
päälause ei ole virheellinen — virheet ovat koosteen omissa
tausta-analyyseissä (ilmansuunnat, yksi rajausperustelu, yksi ajallinen
sanamuoto).

---

## Virheet (väite → oikea tieto → lähde)

### 1. Naadamin päänäyttämöllä ON koordinaatti Wikipediassa — väite väärä

**Väite (osio 7, kohta 2 ja osio 4):** "National Sports Stadiumin...
Wikipedia-infoboksin koordinaattikenttä on tyhjä" ja se on siksi
jätetty kokonaan pois kohdekarttataulukosta.

**Oikea tieto:** Infoboksin `coordinates`-kenttä on tosiaan tyhjä, MUTTA
artikkelin lopussa on erillinen `{{Coord}}`-malline — täsmälleen sama
kuvio kuin rautatieasemalla, jonka koostaja itse osasi löytää ja käyttää.
Koordinaatti on **47°54′07,7″N 106°54′58,5″E**. Vahvistin tämän myös
Overpassista/OSM:sta riippumattomasti: OSM-way 108195289, tagattu
`wikidata=Q1451543` ja `wikipedia=en:National Sports Stadium (Mongolia)`
(siis varmasti sama kohde), keskipiste 47,902166°N 106,916296°E — eroaa
Wikipedian koordinaatista alle 10 metriä, ei ristiriitaa (Overpass-sääntö
>100 m ei laukea). Etäisyys Sükhbaatarin aukiolta on **~1,9 km** suoraan
etelään (oma haversine-laskelma, bearing 182,9°) — siis reilusti
kohteiden 1–7 tiiviin 4×4 km:n rajauksen sisällä.

**Suositus kirjoittajalle:** stadion kannattaa lisätä kohdekartalle
(esim. kohde 8 tai 9), koska se on Naadamin päänäyttämö ja nostoon K3
suoraan liittyvä paikka, eikä sen lisääminen riko tiivistä rajausta
lainkaan.

**Lähde:** en-Wikipedia "National Sports Stadium (Mongolia)" (raakateksti,
rivi 52: `{{Coord|47|54|7.7|N|106|54|58.5|E|...}}`); Overpass API
(overpass-api.de/api/interpreter), way 108195289.

### 2. Manjusri-luostarilla ON oma artikkeli ja koordinaatti — väite väärä

**Väite (osio 7, kohta 2):** "Manjusri-luostarin raunioille... ei
löytynyt omaa artikkelia eikä koordinaattia lainkaan."

**Oikea tieto:** Wikipediassa on oma artikkeli **"Manjusri Monastery"**
(myös kirjoitusasu "Manjushri Monastery" tekstissä), ja sen infoboksissa
on suora koordinaatti: **47°45′52″N 106°59′32″E**. Artikkeli on jopa
suoraan wikilinkitetty koostajan itsensä käyttämästä "Ulaanbaatar"-
artikkelin Parks-osiosta ("The ruins of [[Manjusri Monastery]] are
located on the southern flank of Bogd Khan Mountain") — sama lause josta
koostaja poimi Bogd Khan -vuoren pituuden (31 km). Tarkistin koordinaatin
myös Overpassista: OSM-rakennus (way 271049501, `tourism=museum`,
nimi "Manzushir") sijaitsee 47,760442°N 106,994734°E — **483 m** Wikipedian
infoksoordinaatista, ylittää 100 m:n Overpass-voittaa-kynnyksen, joten
tarkempaan sijaintiin kannattaa käyttää Overpass-koordinaattia, jos
kohde joskus halutaan kartalle.

**Tämä EI kuitenkaan muuta koostajan lopputulosta** (jättää Manjusri pois
kohdekarttataulukosta) — se on silti oikea ratkaisu, mutta väärällä
perusteella. Oma laskelmani: Manjusri on **~18,1 km** Sükhbaatarin
aukiolta Wikipedia-koordinaatilla, **~18,5 km** Overpass-koordinaatilla —
siis vielä kauempana kuin Bogd Khan -vuoren huippu (13,8 km) eikä mahdu
edes B-vaihtoehdon "laajaan" rajaukseen. Oikea perustelu poisjättöön on
siis etäisyys, ei tiedon puute.

**Lähde:** en-Wikipedia "Ulaanbaatar" (Parks-osio, rivi 516, wikilinkki
[[Manjusri Monastery]]); en-Wikipedia "Manjusri Monastery" (raakateksti,
rivi 9: infoboksin `coordinates`); Overpass API, way 271049501.

### 3. Kohdekarttataulukon ilmansuunnissa kolme epätarkkuutta (etäisyydet OK)

Laskin osion 4 taulukon kaikki etäisyydet ja ilmansuunnat itse
haversine-kaavalla samasta keskipisteestä (Sükhbaatarin aukio,
47,918889°N 106,9175°E). **Kaikki etäisyysluvut (0,3 / 0,4 / 1,7 / 2,8 /
2,5 / 3,9 / 13,8 km) täsmäävät omaan laskelmaani senttimetrin tarkkuudella**
— tässä ei ole virhettä. Sen sijaan taulukon ilmansuuntakirjaimissa on
kolme pientä epätarkkuutta (koostajan oman P/E/L/I-legendan mukaan
laskettuna):

| Kohde | Taulukon suunta | Oma laskettu bearing | Lähin oikea suunta |
|---|---|---|---|
| 5 Rautatieasema | **LL** (ei ole legendassa määritelty yhdistelmä) | 244,9° | **EL** (lounas) — todennäköisesti kirjoitusvirhe |
| 6 Bogd Khanin talvipalatsi | EL (lounas) | 198,8° | **E** (etelä) — 198,8° on selvästi etelä-oktantissa (157,5–202,5°) |
| 4 Gandantegchinlen | LP (luode) | 285,5° | rajatapaus: 15,5° länteen, 29,5° luoteeseen — lähempänä **L**:ää (länsi) |

Etäisyydet ja itse kartan rajausehdotus eivät muutu näiden korjausten
myötä — kyse on vain kompassikirjainten tarkkuudesta, ei sijainneista.

**Lähde:** oma haversine/bearing-laskelma taulukon 4 koordinaateista
(`WGS84`, R=6371,0088 km).

### 4. Nosto H4:n sanamuoto ristiriidassa oman faktalistansa kanssa

**Väite (nosto H4, leipäteksti):** "...osa niistä, kuten Gandan,
avattiin uudelleen **sodan jälkeen**."

**Oikea tieto:** Koostajan oma faktalista samassa nostossa sanoo oikein:
"Gandan suljettiin 1939 ja avattiin uudelleen 1944." Toinen maailmansota
päättyi 1945 — tammikuu 1944 on siis kesken sodan, ei sen jälkeen.
Vahvistin päivämäärät myös artikkelista "Gandantegchinlen Monastery":
"Gandan was closed in 1939... In January 1944, the monastery was
reopened by dictator Khorloogiin Choibalsan (on the recommendation of
Joseph Stalin)." Pieni mutta todellinen ristiriita leipätekstin ja
lähteen välillä; suosittelen muotoilua esim. "...avattiin uudelleen jo
sodan kestäessä, 1944" tai poistamaan ajallisen määreen kokonaan.

**Lähde:** en-Wikipedia "Gandantegchinlen Monastery" (raakateksti, rivi
34).

---

## Vahvistetut, oikein todetut asiat (poiminta)

Näitä ei tarvitse muuttaa — listattu, koska tehtävänanto pyysi
riippumatonta tarkistusta jokaisesta väitteestä:

- **Kaikki 7 kohdekartan ydinkoordinaattia** (Sükhbaatarin aukio,
  kansallismuseo, Choijin Laman temppeli, Gandantegchinlen, rautatieasema,
  Bogd Khanin talvipalatsi, Zaisanin muistomerkki, Bogd Khan -vuoren
  huippu) täsmäävät sanatarkasti artikkelien infoboksien/`{{Coord}}`-
  mallineiden kanssa.
- **Winter Palace of the Bogd Khan** -nosto (K1): 1893–1903, ainoa
  neljästä säilyneestä residenssistä, 8 600 esinettä, ~20 rakennusta / 6
  temppeliä, Nikolai II:n saappaat — kaikki täsmää sanasta sanaan.
- **Naadam**-nosto (K3): 512/1024 painijaa, 9–10 kierrosta, 15–30 km
  hevoskilpailut, jopa 1000 hevosta, 5–13-vuotiaat jokeyt, jousiammunta
  65/75 m, "uuhai" — kaikki täsmää sanasta sanaan.
- **Ilmastotaulukko** (osio 5): jokainen kuukausiluku täsmää en-
  Wikipedian ilmastolaatikkoon täsmälleen; myös 1303 m / 1350 m -
  korkeusristiriita oli jo itse oikein huomattu ja merkitty.
- **Nimihistoria** (H1): Örgöö 1639 → Nomiin Khüree 1651 → Ikh Khüree
  1706 → Niislel Khüree 1911 → Ulaanbaatar 29.10.1924, mukaan lukien
  "Ulan Bator" postin hyväksymänä muotona — täsmää sanasta sanaan.
- **"29 kertaa" -väite (H3)** on suora lainaus artikkelin johdannosta
  ("changing location 29 times"). Huom, ei virhe mutta tarkennus: itse
  liikkumislistassa (Mobile monastery -osio) on vain 25 päivättyä
  sijaintia (24 muuttoa), ei 29 — Wikipedian oma sisäinen epätarkkuus,
  ei koostajan virhe, mutta osion 7 kohdan 9 muotoilu "29 sijainnin
  luettelo artikkelissa" on turhan täsmällinen kuvaus tästä.
- **1930-luvun uhriluku (yli 32 000)** on todellinen ja löytyy
  artikkelista ("Memorial Museum of Victims of Political Repression" /
  "Demolition of historic buildings" -osio) — koostaja tunnisti sen
  oikein ja jätti perustellusti pois nostotekstistä sisältölinjauksen
  mukaisesti.
- **"Bogd Khan Palace Museum" väärä otsikko**: hain sen itse — palauttaa
  HTTP 404, vahvistaa että oikea otsikko on "Winter Palace of the Bogd
  Khan".
- **"Ger" on täsmennyssivu**: vahvistettu, ei käsittele mongolialaista
  telttaa.
- **Zaisanin muistomerkki**: 1969 (rakennus alkoi) – 1971 (paljastus),
  neuvostoaikainen toisen maailmansodan muistomerkki — täsmää.
- **Kaksi kolmasosaa asukkaista ger-alueilla** (K2): täsmää Ulaanbaatar-
  artikkelin Demographics-osioon. Huom: artikkelin Pollution-osiossa
  lukee toisaalla "almost half" — Wikipedian oma sisäinen ristiriita eri
  osioiden välillä, ei koostajan virhe (koostaja käytti oikeaa,
  nimenomaan Demographics-osion lukua).

---

## Sisältölinjaus ja näyttönimi

**Näyttönimi "Ulan Bator":** tarkistin pelin koodin — `js/packs/asia.js`
rivi 146: `{ id: 'ulanbator', name: 'Ulan Bator', wiki: 'Ulan Bator', ... }`,
ja `asia-questions.js`/`asia-saapumiset.js` käyttävät "Ulan Bator" -
muotoa läpi tekstien. Tarkistin myös Kappadokia-ennakkotapauksen
(`js/tyohuone-tilanne.js`): siellä artikkelin Wikipedia-pohjainen
kirjoitusasu **korjattiin nimenomaan vastaamaan laudan omaa nimeä**
("Saarivin kirjoitusasu korjattiin muotoon Kappadokia (laudan nimi)").
Tämä ennakkotapaus osoittaa selvästi samaan suuntaan täällä: lehden
näyttönimeksi kannattaa valita **"Ulan Bator"**, ei "Ulaanbaatar" —
suosittelen ratkaisemaan osion 7 kohdan 1 avoimen kysymyksen tähän
suuntaan.

**A/B-rajaus (Bogd Khan -vuori, ~13,8 km):** tarkistin viitatun Uhud-
ennakkotapauksen suoraan `docs/arkisto/faktapohja-medina.md`:stä. Siellä
A-vaihtoehto (tiivis rajaus, vuori pois kartalta) oli suositus, vaikka
Uhud oli vain ~4,5 km keskustasta — jo tuolloin selvästi yli 2–4 km:n
ohjeen. Bogd Khan -vuori on tässä ~13,8 km (oma laskelmani vahvistaa
koostajan luvun täsmälleen), siis moninkertaisesti kauempana kuin Uhud
oli. Ennakkotapaus puoltaa siis **A-vaihtoehtoa vielä selvemmin** täällä
kuin Medinassa — vuori jää pois kohdekartasta, mutta elää kuvissa ja
nostoissa (H3, H4).

**Zaisanin muistomerkki:** vahvistin, että se on 1969–1971 rakennettu
neuvostoaikainen sotamuistomerkki eikä 1873-henkinen kohde. Koostajan
ratkaisu (pelkkä koordinaattipinni kartalla, ei omaa nostoa, ei
Venäjä-linjauksen laajempaa käsittelyä) on perusteltu — muistomerkki on
tunnettu nykynäköalapaikka, mutta sen poliittinen sisältö (Neuvostoliiton
rooli) ei kuulu 1873-linjaukseen eikä nykypolitiikka-rajaukseen, joten
neutraali maamerkkimerkintä ilman tulkitsevaa nostotekstiä on oikea
ratkaisu.

**1930-luvun vainot ja buddhalaisuus:** vahvistettu — draft mainitsee
vainot vain yhdellä lauseella ilman lukuja (H4), täsmälleen kuten
tehtävänanto edellytti, ja tarkka uhriluku (32 000+) on olemassa mutta
oikein jätetty pois.

---

## Yhteenveto

Faktapohja on erittäin luotettava — kaikki tarkastamani numeeriset
väitteet, sitaatit, vuosiluvut ja koordinaatit (paitsi kaksi
koordinaattiväitettä) täsmäsivät en-Wikipedian raakatekstiin sanasta
sanaan. Kaksi todellista virhettä löytyi, molemmat samaa tyyppiä:
väitetään ettei koordinaattia löydy, vaikka löytyy (National Sports
Stadium ja Manjusri Monastery — molemmat ovat jopa suoraan artikkeleissa
löydettävissä samalla menetelmällä, jota koostaja itse käytti
onnistuneesti rautatieasemalle). Näistä National Sports Stadium kannattaa
harkita lisättäväksi kohdekartalle (vain 1,9 km keskustasta), kun taas
Manjusri kannattaa jättää pois — mutta oikealla perusteella (18 km
etäisyys, ei tiedon puute). Lisäksi kolme pientä ilmansuuntakirjainten
epätarkkuutta taulukossa (etäisyydet olivat kaikki oikein) ja yksi
ajallinen sanamuotoristiriita nostossa H4 ("sodan jälkeen" pitäisi olla
"sodan aikana"/1944). Näyttönimi- ja rajaussuositukset: "Ulan Bator"
(Kappadokia-ennakkotapaus) ja A-vaihtoehto tiiviille rajaukselle
(Uhud-ennakkotapaus, jota Bogd Khan -vuoren suurempi etäisyys tukee vielä
vahvemmin).
