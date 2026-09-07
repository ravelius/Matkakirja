# Santa Fe -faktapohjan tarkistus

Tarkistettu **7.9.2026** en-Wikipedian raakatekstistä
(`index.php?action=raw`, `NODE_USE_ENV_PROXY=1`, uusinnat kasvavalla
viiveellä) ja koordinaattirajapinnasta
(`action=query&prop=coordinates&redirects=1`). Tarkistus on
**menetelmällisesti erillinen vaihe**: lähteet luettiin uudelleen
alkuperäisistä latauksista eikä faktapohjan omiin sitaatteihin
luotettu. Väitteet haettiin `grep -o` -täsmähaulla sanatarkkoina
merkkijonoina, jotta lainaus ei voi liukua.

Luetut artikkelit: **Santa Fe, New Mexico**, **Pueblo Revolt**,
**Santa Fe Trail**, **Zozobra**, **Santa Fe Indian Market**,
**Loretto Chapel**, **San Miguel Mission**, **Santuario de
Guadalupe**, **Cathedral Basilica of St. Francis of Assisi (Santa
Fe)**, New Mexico State Capitol, New Mexico Museum of Art, Georgia
O'Keeffe Museum, Museum of International Folk Art, Santa Fe Plaza,
Canyon Road (Santa Fe, New Mexico), Santa Fe de Nuevo México, Palace
of the Governors, Pueblo peoples, Tewa.

**Yleisarvio: faktapohja kelpaa kirjoituksen pohjaksi kolmen
korjauksen jälkeen.** Päivämäärät, luvut ja koordinaatit täsmäsivät.
Kaksi lähdekritiikkiongelmaa (kohdat A ja B) ja yksi karttatekninen
huomio (kohta C) on ratkaistava ennen kirjoittamista.

---

## A. LÄHDEKRITIIKKI (pakollinen) — Loreton portaikko on legenda

**Faktapohjan väite (kohdekartan kohde 5, huomio 4):** portaikon
tarina kerrotaan kertomuksena.

**Lähde ("Loretto Chapel", Staircase), sanatarkasti:** *"According to
the version of events passed down by the Sisters of Loretto, multiple
builders were consulted but were not able to find a workable solution
due to the confined quarters. In response, the nuns prayed for nine
straight days to Saint Joseph … On the last day of the novena, a
mysterious stranger appeared and offered to build the staircase. He
worked alone using only a few simple hand tools and disappeared
afterwards without collecting his pay …"*

**Tarkistus:** artikkeli kehystää tämän nimenomaan sisarten
perimätiedoksi ja kertoo lisäksi, että "more fantastical versions"
väittävät työn tehdyksi yhdessä yössä, kun taas toisten mukaan siihen
meni kuudesta kahdeksaan kuukautta. **Sääntö kirjoittajalle:** tarina
kerrotaan *sisarten kertomuksena*, ei tapahtumana. Faktana saa kertoa
mitat, jotka lähde antaa suoraan: nousua noin **20 jalkaa** (6,1 m),
**kaksi täyttä kierrosta ilman keskipylvästä tai tolppaa**, **33
askelmaa**, koossa puutapein ilman liimaa ja nauloja, sisempi jalas
seitsemästä ja ulompi yhdeksästä osasta, puu on kuusilaji joka ei
todennäköisesti ole New Mexicon omaa, **kaiteet lisättiin 1887** ja
rautatuki myöhemmin.

Lisäksi vahvistettu: kappelin tilasivat **Loreton sisaret 1873**
tyttökoulunsa Loretto Academyn viereen; arkkipiispa Jean-Baptiste
Lamy oli tuonut kaupunkiin ranskalaisarkkitehdit Antoine Moulyn ja
tämän pojan Projectuksen katedraalityötä varten, ja Projectuksesta
tuli kappelin pääarkkitehti. Malli oli Pariisin **Sainte-Chapelle**;
lasimaalaukset tuotiin Ranskasta **Santa Fe Trailia pitkin**, ja
kappeli vihittiin **1878** viiden vuoden rakentamisen jälkeen.

## B. LÄHDEKRITIIKKI (pakollinen) — katedraalin tetragrammaton

**Lähde ("Cathedral Basilica of St. Francis of Assisi (Santa Fe)",
Keystone):** *"An story from the 19th century was that Lamy placed
the tetragrammaton on the cathedral to thank Jewish merchants in San
Antonio who contributed to its building fund. However, the story was
never verified."*

**Sääntö kirjoittajalle:** tarinaa ei esitetä faktana. Joko se
jätetään pois tai kerrotaan lähteen omalla varauksella. Faktoina saa
kertoa: hiippakunta perustettiin **1853** ja Lamysta tuli sen
ensimmäinen piispa; Lamy aloitti uuden katedraalin rakentamisen
**1869** ranskalaisarkkitehdein ja italialaisin kivimiehin; **uusi
katedraali rakennettiin vanhan La Parroquia -adobekirkon ympärille**,
ja vanha purettiin ja kannettiin ulos valmiin uuden sisältä; vain
pohjoissivun pieni kappeli säilytettiin. Rakennustyyli on
romaaninen uusrenessanssi ja kivi keltaista kalkkikiveä, joka
louhittiin nykyisen Lamyn kylän läheltä. Ruusuikkuna ja apostoli-
ikkunat tuotiin Clermont-Ferrandista. Alkuperäisessä suunnitelmassa
oli kummallekin tornille 160 jalan torninhuippu, mutta rahat
loppuivat — **pohjoistorni on yhden tiilirivin eteläistä korkeampi**.

## C. KARTTATEKNINEN HUOMIO — kahden kohteen väli alittaa 200 metriä

Etäisyydet laskettiin uudelleen itse (asteet × 111,32 km,
pituusasteille cos 35,68° ≈ 0,8123):

| pari | väli |
|---|---|
| katedraali – Loreton kappeli | **noin 170 m** |
| taidemuseo – O'Keeffen museo | noin 204 m |
| osavaltiotalo – San Miguelin kirkko | noin 223 m |
| Loreton kappeli – San Miguelin kirkko | noin 237 m |
| katedraali – taidemuseo | noin 317 m |

Vain yksi pari alittaa 200 metriä. **Suositus:** molemmat pidetään
(Nuukin ja Iqaluitin ennakkotapaus: pisteväli saa alittaa 200 metriä,
kun `tools/tarkista-karttapisteet.mjs` on vihreä ja kuva katsotaan) —
mutta jos työkalu ilmoittaa numeroympyröiden päällekkäisyydestä,
katedraali jää ja Loreton kappeli siirtyy matkaoppaan jaksoon.
Perustelu kirjataan maakartat.js:n lohkokommenttiin kumpi tahansa
ratkaisu valitaan.

## D. Tarkennus — perustamisvuosi 1607 vai 1610

Faktapohja tunnisti eron oikein. Sanatarkasti (Spanish era):
*"Don Pedro de Peralta, however, founded a new city at the foot of the
Sangre de Cristo Mountains in 1607 … In 1610, he designated it as the
capital of the province, which it has almost constantly remained,
making it the oldest state capital in the United States."*
**Ratkaisu:** molemmat vuodet kirjoitetaan auki. Peliin jo kirjattu
vuosi 1610 (visan `fact` ja saapumisteksti) on pääkaupunkivuosi eikä
ole ristiriidassa.

## E. Tarkennus — korkeus

Geography-osio: *"Located at 7,199 ft above sea level, Santa Fe is the
highest state capital in the United States."* 7 199 jalkaa = 2 194 m.
Säälaatikon otsikko antaa mittausaseman korkeudeksi 2 133 m.
**Ratkaisu:** lehdessä käytetään kaupungin lukua noin 2 190 metriä
tai sanotaan "runsaat kaksi kilometriä"; faktapohjan ehdottama
"2 130 metriä" on sääaseman luku eikä kaupungin — **tämä korjataan
faktapohjassa.**

## F. Vahvistetut väitteet (sanatarkka haku onnistui)

- *"making it the oldest state capital in the United States"* —
  Spanish era. ✔
- *"Santa Fe is the highest state capital in the United States"* —
  Geography. ✔
- Tewan nimi *Kháˀ Pʼoegeh*, "white shell water place", ja navajon
  *Yootó* — Name. ✔ (haku ei osu ASCII-merkkijonolla diakriittien
  takia; luettu osiosta suoraan.)
- *Oghá Pʼoʼoge*, tewojen taloryhmä nykyisen aukion paikalla vuoden
  900 jälkeen, ja hylkäys vähintään 200 vuodeksi ennen espanjalaisia
  — Early history. ✔
- *"the Laws of the Indies … established in 1573 by King Philip II"*
  ja aukiokeskeinen kaava — Architecture. ✔
- Pueblokapina 1680, hallinto palatsista 1680–1692, de Vargasin 1692
  "veretön takaisinvaltaus", jota *"was criticized as violent even at
  the time"* — Spanish era. ✔
- *"some 1,700 soldiers"* Kearnyn mukana 1846 ja Guadalupe Hidalgo
  1848 — United States. ✔
- Ampumatarvikkeet *"Spain 1776"* — United States. ✔
- Etelävaltioiden lippu Santa Fen yllä *"for a few days in March
  1862"*, vetäytyminen Glorieta Passin jälkeen, kansallinen
  hautausmaa 1870 — United States. ✔
- Rata vedettiin *"through Lamy"*; haararata 1880, Chili Line 1886,
  kaupungiksi **June 17, 1891** — United States. ✔
- *"in the rush to pueblofy"* ja arkkitehdit T. Charles Gaastra ja
  John Gaw Meem — Architecture. ✔
- *"more than 250 art galleries"* ja *"One-tenth of all employment is
  related to artistic and cultural industries"* — johdanto. ✔
- Unescon luovien kaupunkien verkosto 2005, ensimmäisenä
  yhdysvaltalaiskaupunkina — johdanto. ✔
- Indian Market: elokuun kolmatta torstaita seuraava viikonloppu,
  arviolta 150 000 kävijää, noin 1 000 taiteilijaa, kojut aukion
  ympärillä, todistus liittovaltion tunnustamasta kansasta, Rose
  Dougan 1922, Ramona Sakiestewa 1980–1982 — "Santa Fe Indian
  Market". ✔
- Zozobra: 50 jalkaa 6 tuumaa, poltto Labor Day -viikonlopun
  perjantaina, Fiestas de Santa Fe vuodesta 1712, ensimmäinen
  Zozobra 1924 (Will Shuster), Kiwanis vuodesta 1964, Fort Marcyn
  puisto, yli 60 000 kävijää, Guinness 7.9.2007 (15,21 m) —
  "Zozobra". ✔
- San Miguel: rakennettu noin 1610, usein sanottu Yhdysvaltain
  mantereen vanhimmaksi kirkkorakennukseksi, rakennettu joen
  toiselle puolelle Barrio de Analcoon, jossa asui pääosin
  alkuperäisväestöä ja mukana tulleita tlaxcalteekkeja; ensimmäinen
  maininta kirjallisesti 1628; vaurioitui 1680 ja rakennettiin
  uudelleen 1710; puinen alttarikaappi lisättiin 1798 ja siinä oleva
  Mikael-veistos on vähintään vuodelta 1709 — "San Miguel Mission". ✔
- Santuario de Guadalupe: **Yhdysvaltain vanhin Guadalupen Neitsyelle
  omistettu kirkko**, rakennettu todennäköisesti noin 1795 (lupa
  myönnettiin sinä vuonna), varmasti dokumentoitu vasta 1821;
  alttaritaulu tuotiin osissa Mexico Citystä Camino Realia pitkin ja
  on José de Alcíbarin signeeraama ja vuodelta 1783 —
  "Santuario de Guadalupe". ✔
- Osavaltiotalo: ainoa pyöreä osavaltiotalo Yhdysvalloissa ja yksi
  yhdestätoista ilman kupolia; rakennettu 1964–1966, vihitty
  8.12.1966; W. C. Krugerin suunnittelema; ylhäältä katsottuna se
  muistuttaa **Zian aurinkosymbolia** neljine siipineen —
  "New Mexico State Capitol". ✔
- Taidemuseo: Isaac Rappin suunnittelema, valmis **1917**, Pueblo
  Revival, julkisivun esikuvina Acoman, San Felipen, Cochitin,
  Lagunan, Santa Anan ja Pecosin lähetyskirkot; kokoelmassa yli
  20 000 teosta — "New Mexico Museum of Art". ✔
- O'Keeffe-museo: avattu **17.7.1997**, yksitoista vuotta taiteilijan
  kuoleman jälkeen; päärakennuksen suunnitteli Richard Gluckman
  yhdessä Allegretti Architectsin kanssa; maailman suurin O'Keeffe-
  kokoelma — "Georgia O'Keeffe Museum". ✔
- Kansantaiteen museo: perustaja Florence Dibell Bartlett, avattu
  yleisölle **1953**, yli 130 000 esinettä yli sadasta maasta, maailman
  suurin kansainvälisen kansantaiteen kokoelma; alkuperäisen
  rakennuksen suunnitteli **John Gaw Meem**; Girard-siiven näyttely
  *Multiple Visions: A Common Bond* avattiin 1982 ja näyttää noin
  10 % kokoelmasta — "Museum of International Folk Art". ✔

## G. Sisältölinjaukset, jotka kirjoittajan on noudatettava

1. **Pueblo-kansat elävinä toimijoina** (spec-mantereet.md linjaus 1):
   kylä oli olemassa ennen espanjalaisia, kapina 1680 onnistui, ja
   Indian Market on nykypäivän taiteilijoiden markkina — ei
   museokehystä.
2. **Oñaten karkotus kerrotaan lähteen omalla sanamuodolla** ("hänen
   hallintonsa katsottiin julmaksi alkuperäisväestöä kohtaan") ilman
   yksityiskohtia.
3. **Sisällissota perushistoriana** ilman osapuolinostalgiaa
   (spec-mantereet.md, USA).
4. **Ei nykypolitiikkaa eikä rikosuutisia**: katedraalin vuoden 2022
   kiinnitys ja sovintosumma jätetään pois.
5. **Ei Mesa Verdeä eikä Chacoa** — ne ovat karttanostoja
   (maastokohteet-usa.js).
