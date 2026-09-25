# Nuukin faktapohjan tarkistus

Tarkistettu **7.9.2026** en-Wikipedian raakateksteistä
(`index.php?action=raw`, `NODE_USE_ENV_PROXY=1`, uusinnat kasvavalla
viiveellä). Tarkistus on **menetelmällisesti erillinen vaihe**:
lähteet luettiin uudelleen alkuperäisistä latauksista eikä faktapohjan
omiin sitaatteihin luotettu. Kiistanalaiset väitteet haettiin
`grep -o` -täsmähaulla sanatarkkoina merkkijonoina. Koordinaatit
haettiin itse (`list=geosearch`) ja kaikki 28 kohdeparin etäisyyttä
laskettiin itse haversinilla.

Luetut artikkelit: **Nuuk**, **Old Nuuk**, **Hans Egede House**,
**Nuuk Cathedral**, **Greenland National Museum**, **Qilakitsoq**,
**Kalaaliaraq Market**, **Inatsisartut**, **Katuaq**,
**Nuuk Art Museum**, **Public and National Library of Greenland**,
**University of Greenland**, **Isua Greenstone Belt**,
**Ameralik Span**, **Blok P**, **Nuup Kangerlua**,
**Moravian Brethren Mission House**, **Hans Egede**,
**Greenland ice sheet**, **Atuagkat Bookstore**.

**Yleisarvio: faktapohja kelpaa kirjoituksen pohjaksi, kun kohtien
A–G ratkaisut tehdään.** Asiavirheitä ei löytynyt. Viisi kohtaa on
Wikipedian sisäisiä ristiriitoja, yksi on katteeton väite, joka on
jätettävä pois, ja yksi on kohdevalintaa koskeva korjaus.

---

## A. RISTIRIITA — Hans Egeden talon rakennusvuosi

**Lähde 1 ("Nuuk", Cityscape › Historical buildings), sanatarkasti:**
*"built in 1721 by the Norwegian missionary Hans Egede, is Greenland's
oldest building"*

**Lähde 2 ("Hans Egede House", johdanto), sanatarkasti:**
*"built in 1728"*

**Ratkaisu:** käytetään **rakennuksen omaa artikkelia (1728)**, koska
se on aiheen tarkempi lähde ja koska 1721 on ristiriidassa saman
"Nuuk"-artikkelin oman historiaosion kanssa: siellä siirtokunta
siirrettiin Kangeqista mantereelle vasta 1728, joten mantereella ei
voinut olla taloa 1721. Ristiriita **sanotaan ääneen** nähtävyysjutussa
("kaupungin artikkeli antaa vuodeksi 1721, talon oma 1728"). Ratkaisu
kirjataan lohkokommenttiin.

---

## B. RISTIRIITA — katedraalin kellotornin vuosi

**Lähde 1 ("Nuuk", Historical buildings), sanatarkasti:**
*"the tower was added in 1884"*

**Lähde 2 ("Nuuk Cathedral", Construction), sanatarkasti:**
*"wooden church tower is a later add-on, it was erected in 1928"*

**Ratkaisu:** ero **kirjoitetaan auki** nähtävyysjutussa: torni on
myöhempi lisäys, ja lähteet antavat sille kaksi eri vuotta.
Kummankaan lukua ei esitetä varmana. Muut katedraalin luvut
(1848–1849 rakentaminen, vihkiminen 6.4.1849, katedraalin asema 1994,
urut 1970) ovat vain kirkon omassa artikkelissa eivätkä ole
ristiriidassa minkään kanssa.

---

## C. RISTIRIITA — Katuaqin salien koot

**Lähde 1 ("Nuuk", Cultural), sanatarkasti:**
*"Katuaq contains two auditoria, one seating 1,008 people and the
other 508."*

**Lähde 2 ("Katuaq", Facilities), sanatarkasti:**
*"Katuaq contains two auditoria, the larger one seating 508 people and
the smaller one 80."*

**Ratkaisu:** käytetään **rakennuksen omaa artikkelia** (508 ja 80).
Luku 1 008 on epäuskottava talossa, jonka koko kaupungissa on 20 000
asukasta ja jonka suurin sali on lähteen mukaan Hans Lynge -sali.
Ristiriita kirjataan lohkokommenttiin, mutta sitä ei kirjoiteta
lukijalle auki — juttu kertoo vain, että suurempi sali vetää runsaat
viisisataa.

---

## D. KATTEETON VÄITE — Andy Warhol Nuukin taidemuseossa

**Lähde 1 ("Nuuk", Cultural), sanatarkasti:**
*"a notable collection of local paintings, watercolors, drawings, and
graphics, some by [[Andy Warhol]]"*

**Lähde 2 ("Nuuk Art Museum"):** `grep -c "Warhol"` → **0**. Museon oma
artikkeli luettelee kokoelman taiteilijat nimeltä (Deichmann,
J.E.C. Rasmussen, Moltke, Emanuel A. Petersen, Kristoffersen,
Jacobsen, Buuti Pedersen, Hans Lynge, Anne-Birthe Hove, Pia Arke)
eikä mainitse Warholia lainkaan.

**Ratkaisu:** **väitettä EI käytetä.** Se on myös sisäisesti outo —
lause sanoo Warholin tehneen "paikallisia maalauksia". Juttu kertoo
sen sijaan museon todennetun ytimen: yli 150 Emanuel A. Petersenin
maalausta ja kokoelman kuratointiperiaate.

---

## E. RISTIRIITA — Ilimmarfikin vuosi ja opiskelijamäärä

**Lähde 1 ("Nuuk", Education), sanatarkasti:**
*"It was founded in 1987 and expanded in 2007 with the new building,
Ilimmarfik"* ja (Educational) *"the university had about 150 students"*
(vuodelta 2007 oleva lähde).

**Lähde 2 ("University of Greenland"), sanatarkasti:**
*"moved into a dedicated research complex, Ilimmarfik, in 2009"*,
leipätekstissä *"an enrollment of 205 students in 2018"*, infolaatikossa
*"students = 600"*.

**Ratkaisu:** perustamisvuosi **1987** on molemmissa lähteissä ja
käytetään. **Ilimmarfikin vuotta ei esitetä varmana** — juttu sanoo
"2000-luvun lopulla" ja mainitsee eron lohkokommentissa.
**Opiskelijamäärää ei esitetä lukuna lainkaan**: kolme lukua kolmesta
kohdasta (150 / 205 / 600) eivät ole sovitettavissa yhteen, ja
juttu sanoo vain, että yliopisto on pieni ja että useimmat
grönlantilaiset opiskelijat menevät Tanskaan — se on lähteen oma
selitys.

---

## F. LÄHTEEN VARAUS — Isuan stromatoliitit

**Lähde ("Isua Greenstone Belt", Possible signs of very early life),
sanatarkasti:** *"In August 2016, an Australia-based research team
presented evidence that the Isua Greenstone Belt contains the remains
of stromatolite microbial colonies that formed approximately 3.7
billion years ago. However, their interpretations are controversial."*
ja *"in 2018, she and a team of additional geologists published a paper
that raises significant questions as to the origin of the structures,
interpreting them as arising from deformation. Thus, the ISB
stromatolites remain a subject of ongoing investigation."*

**Ratkaisu:** varausta **ei saa pyöristää pois**. Nosto kertoo sekä
löydön että kiistan, ja nimenomaan sen, että Abigail Allwood itse
esitti 2016 ja kyseenalaisti 2018. Kiven ikä (3,7–3,8 miljardia vuotta)
ja se, että vyöhyke on maailman laajin eoarkeeinen paljastuma, ovat
artikkelin johdannossa varauksetta ja kelpaavat sellaisenaan.

---

## G. KOHDEVALINNAN KORJAUS — Atuagkat pudotettiin kartalta

Ensimmäisessä kohdelistassa oli **Atuagkat Bookstore** (64,17500 /
−51,73722), Grönlannin ainoa kirjakauppa. **Lähde ("Atuagkat
Bookstore", infolaatikko ja johdanto), sanatarkasti:** *"defunct =
15 01 2025"* ja *"Atuagkat Bookstore ... **was** Greenland's only
bookstore"*, *"It closed on 15 January 2025."*

**Ratkaisu:** kohde **poistettiin kartalta**. Kohdekartta on
kävelykartta nykyisistä kohteista, eikä sille panna liikettä, joka on
lopettanut. Tilalle otettiin **Grönlannin kansalliskirjasto**
(64,17556 / −51,73917), joka on samalla kulmalla ja avoinna.
Samasta syystä kartalta jätettiin pois **Blok P** (purettu 19.10.2012)
— se kerrotaan matkaoppaassa, jossa purku on osa juttua.

---

## H. KOORDINAATIT JA VÄLIT — laskettu itse

Koordinaatit haettiin `list=geosearch`-rajapinnasta (keskipiste
64,1770 / −51,7350, säde 4 000 m) ja ristiintarkistettiin niiden
artikkelien `coord`-malleista, joissa sellainen on (Hans Egede House
64.1782/−51.7448, Greenland National Museum 64.1772/−51.7462,
Nuuk Art Museum 64.177860/−51.729216, Kalaaliaraq 64°10′43″N
51°44′33″W). **Kaikki täsmäsivät.**

Kaikki **28 kohdeparin väliä** laskettiin haversinilla. Kuusi
pienintä:

| väli | kohteet |
|------|---------|
| 98 m | Kalaaliaraq-tori – Inatsisartut |
| 120 m | Hans Egeden talo – Kalaaliaraq-tori |
| 130 m | Grönlannin kansallismuseo – Hans Egeden talo |
| 146 m | Inatsisartut – Katuaq |
| 148 m | Nuukin katedraali – Kalaaliaraq-tori |
| 172 m | Hans Egeden talo – Nuukin katedraali |

**Riippumaton vahvistus:** "Kalaaliaraq Market" sanoo torin olevan
*"approximately 150 m to the southeast of the Nuuk Cathedral"*.
Omista koordinaateista laskettu väli on **148 m** ja suunta kaakkoon —
koordinaatit ovat siis oikein.

**Arvio:** välit alittavat kohdekarttaohjeen 200 metrin nyrkkisäännön
viidessä parissa. Se on tässä sama tilanne kuin Fèsissä (v1670,
pienin väli 98 m): Vanha Nuuk on kilometrin levyinen kaupunginosa,
eikä 200 metrin väljyyteen pääse ilman että puolet kohteista putoaa.
**Ratkaisu on tiivis rajaus:** 1,19 km leveä ruutu tarkoittaa
0,74 m/px, jolloin 98 metriä on 132 pikseliä eivätkä numeroympyrät
mene päällekkäin. `tools/tarkista-karttapisteet.mjs nuuk` vahvistaa
sen koneellisesti ennen committia.

---

## I. TARKISTETUT MUTTA RIIDATTOMAT LUVUT

Nämä haettiin uudelleen ja täsmäsivät faktapohjaan:

- Väkiluku **20 113** tammikuussa 2025 ("Nuuk", johdanto). Infolaatikko
  antaa 20 298 vuodelle 2026; **käytetään leipätekstin lukua ja
  vuotta**, koska se on lähteistetty tilastopankkiin. Lehdessä luku
  pyöristetään muotoon "runsaat kaksikymmentätuhatta", jolloin
  kumpikaan lähde ei ole väärässä.
- Sermitsiaq **1 210 m**, Store Malene **790 m**, Lille Malene **420 m**
  ("Nuuk", Geography).
- Vuono **10 km** Labradorinmereltä, **240 km** napapiiristä etelään,
  leveysaste **64°11′ N** ("Nuuk", Geography ja johdanto).
- Ameralikin jänneväli **5 376 m**, rakennettu **1993**, pylväsvuoret
  **444 m** ja **1 013 m**, pienin korkeus vedestä **128 m**
  ("Ameralik Span"). Sama 5 376 m myös "Nuuk", Energy — ei ristiriitaa.
- Tiet: **80 km** (2017), **kolme liikennevaloa, 12 liikenneympyrää,
  yksi tunneli**, ei tieyhteyttä muualle ("Nuuk", Roads).
- Qilakitsoq: löytö **9.10.1972**, tutkimukset 1978, palautus **1982**,
  ajoitus **noin 1475 ± 50 vuotta**, kahdeksan muumiota, neljä esillä
  ("Qilakitsoq").
- Blok P: **noin 320 asuntoa**, **noin 1 % saaren väestöstä**,
  purettu **19.10.2012**, rakennettu 1965–1966 ("Blok P").
- Ilmasto: **−32,5 °C 14.1.1984**, **+26,3 °C 6.7.2008**, heinäkuun
  keskiarvo **7,4 °C**, metsänraja **10 °C**, 21.12. aurinko 11.22–15.28
  ("Nuuk", Climate ja sääruutu).

---

## J. LINJAUSTARKISTUS

- **Nykypolitiikka pois:** "Nuuk"-artikkelin Government-osion
  puoluelista, istuva pormestari ja siihen liittyvä uutislähde
  (tammikuu 2026) jätetään kokonaan käyttämättä. Inatsisartutista
  kerrotaan vain instituutio: 31 paikkaa, nelivuotinen kausi,
  suhteellinen vaalitapa, perustettu 1979.
- **Kalaaliaraqin hygienia- ja trikiiniosio jätetään pois.** Se on
  nykyinen viranomaisongelma, ei kulttuurijuttu, ja sen mukaan
  ottaminen tekisi torista varoituksen eikä kohteen.
- **Perustaminen kerrotaan tapahtumana neutraalisti.** Isorokko
  1733–1734 ja siirtolaisten kuolemat mainitaan tapahtumina ilman
  yksityiskohtien korostusta (Kunnioitus-pilari). Siirtolaisten
  taustaa ("mutinous soldiers, convicts, and prostitutes") ei
  luetella kokonaan; teksti sanoo "kapinoineita sotilaita ja
  tuomittuja", mikä on lähteen kattama osajoukko.
- **Grönlannin maalehden aiheet on luettu kokonaan** (GRL:
  maa-kategoriat.js) eikä yhtäkään toisteta. Erityisesti Hans Egeden
  vuoden 1721 matka ja Atuagagdliutit ovat maalehden nostoja: tämä
  lehti kertoo Egedestä vain sen, mitä vuoden 1728 siirto ja hänen
  talonsa vaativat.
