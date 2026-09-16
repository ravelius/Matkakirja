# Viesti Fablelle: Pariisin lähizoomi — nimiön ruutupikselikatto, rykelmän näkyvyys ja luentakuvapakka pois kartalta

**Opus-sessio 16.9.2026. Haara `claude/bold-ride-vow4ki-pariisi-lahizoom`
(pohja origin/main v1923). Ei PR:ää, ei versionostoa, ei
Raamattu-muokkausta.**

Omistaja 16.9.2026 klo 16.05 UTC, iPhone-kuva Pariisista lähizoomilla
(Raamattu, KARTTAUUDISTUKSEN PAATOKSET 31), sanatarkasti:
*"Piilotetaan nuo kuvat kartalta toistaiseksi. Täytyy miettiä niille
joku parempi paikka. Mutta miksi tuolla Pariisin alueella ei näy niitä
nostoja, enkä pysty noitakaan klikkaamaan?"* — ja saman päivän korjaus:
*"Anteeksi korjaus, pystyn kyllä noita näkyviä nostoja klikkaamaan,
mutta ilmeisesti iso osa nostoista on jossain piilossa."*

Klikattavuus EI siis ollut vika, ja mittaus vahvistaa sen (vartio 4
alla). Viat olivat nimiön koko, merkkien sumeus ja rykelmän katoaminen
— kolme eri juurisyytä, jotka kaikki näkyvät vasta sillä zoomilla,
johon omistaja oli mennyt.

**Kuva (ennen | jälkeen, 390 × 844 dpr 2, sisin mahdollinen zoomi):**
`docs/raportit/kuvat/pariisi-lahizoom-390-20260916.jpg`

---

## 0. Mistä zoomista puhutaan

Uloszoomauksen esto (`js/pallolauta/lauta.js maanZoomiraja`) antaa
Ranskassa puhelimella **osuudeksi 0,341 uloimmasta** (`pointOfView()
.altitude` 0,0698). Se on pohja: syvemmälle pelaaja ei pääse. Kaikki
alla olevat luvut on mitattu siellä, Chromiumilla 390 × 844 dpr 2,
Ranska-tallenteella, pelaaja Pariisissa, saapumissarja loppuun ajettuna.
Kotelo on 373,6 × 775 px ja näkymä 60,0 lautayksikköä leveä eli
**6,23 px lautayksikköä kohden**.

---

## 1. Juurisyy A — nimiöllä ei ollut ruutupikselikattoa

Nimiö on PAATOKSET 14:stä lähtien KARTAN mitta: kerroin = kameran
mittakaava / saapumisnäkymän mittakaava. Koska kerroin kasvaa rajatta
sisäänpäin zoomatessa, myös nimiön RUUTUKOKO kasvoi rajatta:

| osuus uloimmasta | kerroin | noston nimiö | kaupunkimerkin nimiö |
|---|---|---|---|
| 1,000 (saapuminen) | 1,00 | 8,5 px | 11,5 px |
| 0,700 | 1,43 | 12,1 px | 16,4 px |
| 0,500 | 2,00 | 17,0 px | 23,0 px |
| **0,341 (sisin mahdollinen)** | **2,94** | **25,0 px** | **33,8 px** |

25 px / 33,8 px ei ole reunatapaus vaan se, mitä pelaaja näkee. Mitatut
nimiölaatikot 373,6 px:n kotelossa ENNEN korjausta: *Torni
romuraudaksi* 208→447 (239 px), *Notre-Damen kukko* 208→447, *Mona
Lisan varkaus* 46→251 (205 px), *Kaulanauhajuttu* 209→416 (207 px) —
viisi laatikkoa valui ruudun laidasta ulos ja loput peittivät toisiaan.
Juuri tämän omistaja kuvasi jättimäisiksi nimiöiksi.

**Korjaus** (`js/pallolauta/nostot.js`): `NOSTON_NIMIO_KATTO_PX = 16`.
Katto on MERKIN OMASSA MITASSA eikä kertoimessa, koska sama kerroin
ajaa sekä nostoa (perusnimiö 8,5 px) että kaupunkimerkkiä (11,5 px):
yksi kerroinkatto antaisi niille eri lopputuloksen. Nimiön kirjasinkoko
ruudulla on `mitta × NOSTOSYM_NIMIO_KOKO`, joten mitta katkaistaan
kohtaan `16 / 11 = 1,4545`. Molemmat pysähtyvät silloin **täsmälleen
16,00 px:iin**, kumpikin omalla zoomillaan (nosto 0,53 · uloimmasta,
kaupunkimerkki 0,72 ·). Mitattu jälkeen: 18 nimiötä, suurin 16,00 px,
pienin 16,00 px; rykelmän laatikoista **0** valuu laidan yli.

Katto ei ole uusi ajatus pallolaudalla vaan puuttui juuri tästä
yhdestä mitasta: kaupungin PISTEELLÄ on jo ruutupikselikatto
(`js/pallolauta/lauta.js KAUPUNKIPISTEEN_KATTO_PX` = 2 × 11,44 px), ja
nimiö oli ainoa kartan mitta, joka kasvoi rajatta.

Kaupunkien NIMIKYLTTEIHIN (`js/pallolauta/nimet.js`) ei kosketa: ne ovat
PAATOKSET 14:n mukaan samaa mittaa kuin maapaneelin leipäteksti, ja
katto irrottaisi ne siitä. Omistajan kuvan jättimäiset nimiöt ovat
kaikki NOSTOJEN nimiöitä, ja PAATOKSET 25 kohta 3 sallii nimenomaan
nostojen nimiön jäädä kaupunkien alle.

---

## 2. Juurisyy B — merkit olivat sumeita, koska pallo ei koskaan tilannut niille tarkkuutta

Kartan merkki ei ole vektoria vaan yksi `<image>`, joka paistetaan
canvasille PORTAALLA (= laitepikseliä kirjaston yksikköä kohti,
`js/fokusnosto-symbolit.js NOSTOSYM_PORTAAT [1,5 · 3 · 6 · 9]`), ja
`asetteleNosto` venyttää sen ruudulle CSS-muunnoksella `scale(mitta)`.
Portaan tilaa kutsuja — ja koko koodipohjassa tilaajia oli **yksi**:
tasokartta (`js/fokuskohteet.js paivitaRasteriporras`). Pallolauta ei
kutsunut `nostosymAsetaPorras`ta kertaakaan, joten pallolla porras oli
se, minkä tasokartta oli viimeksi jättänyt — käytännössä oletus **1,5**.

Tarve on merkin NÄKYVÄ koko, `mitta × devicePixelRatio`. Mitattu
390 × 844 dpr 2: saapumisnäkymässä **2,09**, sisimmällä zoomilla
**2,91** — ja ilman nimiökattoa (kaupunkimerkki 33,8 px) **6,1**. Kuva
siis venytettiin 1,4–4-kertaiseksi omasta tarkkuudestaan. Siitä sumeus.

**Korjaus:** `js/pallolauta/nostot.js` `tahdistaRasteriporras()` ajetaan
ladonnan lopussa (levossa, laudan kuristamana): se tilaa portaan
suurimman piirretyn mitan ja pikselitiheyden mukaan ja vaihtaa
valmistuvien rasterien osoitteet erissä (`nostosymVirkistaRasterit`,
8 merkkiä kehystä kohti) purkamatta kerrosta. Mitattu jälkeen: tarve
2,909, **porras 3**. Vastakokeena oletusporras 1,5 ei riittäisi.

Katto ja terävyys liittyvät toisiinsa: koska nimiö ei enää kasva yli
16 px:n, suurin mahdollinen tarve on `1,4545 × tiheys` = 2,91 (dpr 2)
tai 4,36 (dpr 3) — porras 3 riittää puhelimelle koko zoomivälille ja
porras 6 retinalle. Tarve lasketaan silti mitatusta mitasta eikä
katosta, jotta uloin zoomi ei tilaa lähikuvan rasteria.

Uusi vientifunktio `nostosymPorrasNyt()` on savukkeiden mittari:
terävyys on täsmälleen se, että porras ≥ tarve, joten sen voi mitata
luvuilla eikä kuvavertailulla.

---

## 3. Juurisyy C — ryhmitys sammui ZOOMIPORTAASTA eikä limityksestä

Tämä on se, minkä omistaja näki *"iso osa nostoista on jossain
piilossa"*.

`js/pallolauta/nostot.js` teki ryhmityspäätöksen kahdella ehdolla:

```js
const ryhmitysPaalla = ryhmitysSallittu() && !lahizoomiAuki(uloinOsuus);
```

eli **aihemerkit sammuivat heti, kun kamera ohitti osuuden 0,7**
(`LAHIZOOMIN_OSUUS_ULOIMMASTA`). Sen jälkeen Pariisin 21 nostoa latoivat
nimiönsä yksi kerrallaan — vaikka ne eivät olleet erkaantuneet.

Mitattu rykelmän OMISTA ruutupisteistä (ei sovittelun siirtämistä),
390 × 844 dpr 2:

| osuus uloimmasta | px / lautayksikkö | rykelmän ala | lyhin väli | pareja ≤ 44 px |
|---|---|---|---|---|
| 1,000 | 2,12 | 26,6 × 135,4 px | 13,4 px | 97 / 210 |
| 0,700 | 3,03 | 38,0 × 193,3 px | 19,1 px | 65 / 210 |
| 0,500 | 4,25 | 53,2 × 270,6 px | 26,7 px | 19 / 210 |
| **0,341 (pohja)** | 6,23 | 78,1 × 396,9 px | **39,2 px** | 19 / 210 |

Uloszoomauksen esto pysähtyy 0,341:een, joten **lyhin väli ei koskaan
ylitä sormen 44 px:ää** (`RYHMITYKSEN_ETAISYYS_PX`): rykelmä ei voi
hajota kokonaan millään pelin sallimalla zoomilla puhelimella. Portti
avautui silti jo 0,7:ssä.

Seuraukset mitattuna:

- saapumisnäkymässä Pariisin alueen 24 nostosta 21 oli aihemerkeissä
  (9 ryhmää) — juuri kuten PAATOKSET 27 tilaa;
- yhden portaan sisällä (0,7 ja tiukemmin) aihemerkkejä **0**, ja
  sovittelun oli singottava 21 nimiötä tikapuiksi. Koska nimiö oli
  lisäksi 25 px korkea ja jopa 239 px leveä (juurisyy A), **viisi
  nimiölaatikkoa valui 373,6 px:n kotelon laidoista ulos**:
  pelaajalle jäi kasa palloja ja viisi päällekkäistä nimeä.

**Portin perustelu oli, ettei limitys voi purkautua itsestään**, koska
nimiö kasvoi samaa tahtia kuin merkkien väli (`js/pallolauta/
aihemerkit.js`, KAKSI EHTOA). Ruutupikselikatto (juurisyy A) kumoaa
sen: katon yläpuolella teksti seisoo ja väli kasvaa, joten limitys
purkautuu siellä, missä merkit oikeasti erkanevat.

**Korjaus:** ehto on nyt pelkkä `ryhmitysSallittu()`, eli PAATOKSET 27
kohta 3 sellaisenaan — merkit hajoavat omiksi nostoiksi nimiöineen
*"kun nostot mahtuvat limittymättä"*, oma mitta eikä kameran kello.
Mitattu jälkeen (osuus 0,341, puhelin): Pariisin 21 nostosta **14 on
omana merkkinään ja 7 neljän aihemerkin jäsenenä — yksikään ei ole
piilossa**, ja aihemerkin napautus avaa viuhkan nimineen.

Vastakoe `?aihemerkit=0` ajetaan samassa savukkeessa ja mittaa
PAATOKSET 27:n omaa mittaria — montako rykelmän nimiöparia menee
toistensa päälle — **saapumisnäkymässä**, jolle päätös kirjoitettiin.
Mitattu puhelimella: ryhmityksen kanssa **0 paria**, ilman ryhmitystä
**5 paria**. Lähizoomissa ero on katon jälkeen kadonnut (0 paria
kummallakin):
kun nimiö on 16 px eikä 25 px, sovittelu mahtuu latomaan kaikki 21
limittymättä ilmankin ryhmitystä. Se on katon ansio eikä vastakokeen
epäonnistuminen, mutta se on rehellistä kirjata: **lähizoomissa
ryhmitys ei enää ole limityksen takia pakollinen, vaan siksi että
39,2 px:n päässä toisistaan olevia merkkejä sormi ei erota** (44 px,
PAATOKSET 27 kohta 1). Jos Fable haluaa lähizoomiin kaikki nimiöt
näkyviin omina merkkeinään, se onnistuu nyt laskemalla
`RYHMITYKSEN_ETAISYYS_PX`:ää — ja se on oma päätöksensä, ei tämän
erän.

---

## 3.1 Nostokohtainen taulukko (mitattu, 390 × 844, osuus 0,341)

ENNEN-sarake on ajettu **tämän haaran koodin peruutetulla kopiolla**
(HEAD:n `js/pallolauta/*`, `js/fokusvirta.js`, `css/fokusvirta.css`
erilliseen kansioon, sama savuke) 16.9.2026, JÄLKEEN-sarake samasta
savukkeesta haaran koodilla. Molemmat rivit tulevat savukkeen
INFO-rivistä *"rykelmän nostot tiloittain"* ja *"rykelmän laidan yli
valuvat laatikot"*.

| nosto (nimiö) | tunnus | ENNEN, 390 × 844 osuus 0,341 | JÄLKEEN |
|---|---|---|---|
| Tuileriain rauniot | `tuileries` | näkyi | oma merkki |
| Bastilji | `bastilji` | näkyi | oma merkki |
| Tuileriain rauniot (syvennys) | `syvennys-pariisi-tuileriat` | PIILOSSA — nimiölaatikko kotelon laidan yli | oma merkki |
| Kyyhkyposti | `syvennys-pariisi-kyyhkyposti` | näkyi | aihemerkissä |
| Impressionistit | `syvennys-pariisi-impressionistit` | PIILOSSA — nimiölaatikko kotelon laidan yli | oma merkki |
| Mona Lisan varkaus | `skandaali-mona-lisan-varkaus-1911` | näkyi, mutta nimiö 205 px leveä ja päällekkäin | aihemerkissä |
| Vrain-Lucas | `skandaali-vrain-lucas-kirjevaarennokset` | näkyi | oma merkki |
| Torni romuraudaksi | `nosto-lustig-eiffel` | PIILOSSA — nimiölaatikko kotelon laidan yli (239 px leveä) | oma merkki |
| Kirahvin kävelymatka | `nosto-kirahvin-kavelymatka` | näkyi | oma merkki |
| Carmenin ensi-ilta | `nosto-carmenin-ensi-ilta` | PIILOSSA — nimiölaatikko kotelon laidan yli | aihemerkissä |
| 72 nimeä | `nosto-pariisin-72-nimea` | näkyi | aihemerkissä |
| Metron sisäänkäynti | `nosto-guimardin-metro` | näkyi, nimiö leikkautui ("Metron.") | oma merkki |
| Notre-Damen kukko | `nosto-notre-damen-kukko` | PIILOSSA — nimiölaatikko kotelon laidan yli | aihemerkissä |
| Paras patonki | `nosto-pariisin-patonki` | PIILOSSA — nimiölaatikko kotelon laidan yli | oma merkki |
| Pariisi soi | `nosto-pariisi-soi` | näkyi | oma merkki |
| Pariisin vuosisadat | `nosto-pariisin-vuosisadat` | näkyi | oma merkki |
| Braillen pisteet | `nosto-maalehti-braille` | PIILOSSA — nimiölaatikko kotelon laidan yli | oma merkki |
| Joseph Meister | `nosto-maalehti-pasteur-meister` | PIILOSSA — nimiölaatikko kotelon laidan yli | aihemerkissä |
| Tour 1903 | `nosto-maalehti-tour-de-france-1903` | näkyi | oma merkki |
| Roland Garros | `nosto-maalehti-roland-garros` | PIILOSSA — nimiölaatikko kotelon laidan yli | aihemerkissä |
| Seinen kirjalaatikot | `nosto-maalehti-bouquinistit` | näkyi | oma merkki |

**Yhteenveto ennen → jälkeen (puhelin, sama zoomi):** aihemerkkejä
0 → 4 · nimiön koko 24,96–33,77 px → 16,00 px (kaikki) · nimiölaatikoita
kotelon laidan yli **9 → 0** · limittyviä nimiöpareja 3 → 0 ·
rasteriporras −1 (ei tilattu; tasokartan jäljiltä 1,5, tarve 6,14)
→ 3 (tarve 2,91) · savukkeen vartioita läpi **15/24 → 24/24**.

**SYY OLI YKSI JA SAMA KAIKILLA YHDEKSÄLLÄ:** ryhmitys sammui
zoomiportista (juurisyy C), jolloin 21 nostoa latoi oman nimiönsä, ja
koska nimiö oli katottomana 25 px korkea ja jopa 239 px leveä
(juurisyy A), sovittelu joutui singottamaan laatikot niin kauas, että
yhdeksän valui 373,6 px:n kotelon ulkopuolelle — ne eivät olleet
DOMista poissa vaan **ruudun ulkopuolella**, ja juuri siltä se näyttää
pelaajalle. Merkkikatto (PAATOKSET 21/25) ei pidättänyt yhtäkään:
kohdemaalla ei ole kattoa. Kohdemaan suodatin ei pudottanut yhtäkään.
Työpöydällä (1400 × 900) samalla karttamitalla laidan yli ei valunut
yhtään, mutta limittyviä pareja oli 3 → 0.

---

## 4. Luentakuvapakka pois kartalta (PAATOKSET 31 kohta 1)

Kytkin `LUENTAKUVAPAKKA_KARTALLA = false` (`js/fokusvirta.js`), koska
omistaja sanoi *"toistaiseksi"*: kun kuville löytyy parempi paikka,
tämä palautetaan yhdellä rivillä. Kolme porttia, jotta elementtiä ei
edes rakenneta:

1. `nostaPieniPakka` ei nosta pakkaa eikä ankkuroi luentakuvaa sarjan
   jälkeen;
2. `naytaPulunKuvapakka` ei rakenna pakkaa (pulun ISO sarja on jo
   tarjottu ennen tätä porttia ja jää voimaan);
3. `pienennaLuentakuva` **piilottaa** paneelin sen sijaan että
   kutistaisi sen — tämä on se polku, jolla kartan liike jätti
   peukalonkynnen kartalle myös ilman sarjaa (yksi luentakuva, ei pulun
   kuvia).

Neljäntenä varmistuksena `css/fokusvirta.css`:
`.fokusvirta-luentakuva.pieni { display: none }`.

**Isot luentakuvat luennan aikana ja Pulu Cam säilyvät** — ne eivät ole
kartalle jäävää tavaraa vaan hetkiä, jotka menevät ohi.

**Pakkavartiot on käännetty kytkimen mukaan, ei poistettu:**
`tests/luentakuvasarja.test.mjs` sai apurin `vaadiPakkaKartalla`, joka
vaatii kytkimen ollessa pois "kartalle ei jää mitään" ja kytkimen
palatessa vanhan väitteen sanasta sanaan;
`tools/savukkeet/savuke-luentakuvan-kerros.mjs` ketjuvartio merkitty
KUMOTTU-haaralla ja sen odotussilmukan lopetusehto siirretty pulun oman
ison sarjan päättymiseen; `savuke-kaiutin-luentakuvat.mjs` -vartio
"kesken sarjan pakkaa ei ole kartalla" pitää kytkimestä riippumatta ja
jätettiin siksi ennalleen (vain vastakokeen otsikko tarkennettiin).

---

## 5. Klikattavuus: ei vikaa, mitattuna

Omistajan korjauksen mukaisesti tähän ei käytetty aikaa muuhun kuin
mittaukseen. Uusi savuke napauttaa kolmea rykelmän nostoa **aidolla
napautuksella merkin omasta ruutupisteestä** (`sivu.mouse.click`,
kankaan koordinaatit) ja vaatii, että kustakin avautuu nostokortti;
tunnuksellinen kortti tarkistetaan lisäksi 44 px:n osumasäteeltä
(rykelmässä lähin merkki saa voittaa — se ON osumasääntö). Sama
kierros aihemerkille: napautus avaa viuhkan ja viuhkan kohta kortin.

Yksi mittausten sivulöydös kannattaa tietää: viuhkasta avautuva nosto
tulee usein **KUVA EDELLÄ -korttina** (`.fokusnosto-kerros`), joka ei
aseta `ui.fokuskohdeAuki`-tunnusta lainkaan. Savuke lukee siksi kortin
kahdesta paikasta (tunnus tai kerroksen luokka) — sama kahvapari kuin
`savuke-ranska-sisalto.mjs`:llä. Ilman sitä vartio olisi väittänyt
"kortti ei auennut", vaikka kortti oli ruudulla.

---

## 6. Mitä EI korjattu — mitattuna, Fablen päätettäväksi

1. **Poltettu muste ei tunne kattoa.** Osa nostoista on poltettu
   laattoihin (`pallonNostoOnPoltettu`), jolloin merkillä ei ole
   elävää elementtiä lainkaan ja nimiö tulee LAATAN tekstuurista.
   Tekstuuri venyy zoomin mukana ilman kattoa, joten sellainen nimiö on
   lähikuvassa yhä iso ja sumea (omistajan kuvan *"Metron."*,
   *"Kaulanauhajuttu"*, *"Chartresin."*). Korjaus on nostotason
   uudelleenpoltto (`tools/tee-pallolaatat.mjs --nostot`), joka on
   R2-ajo eikä kuulunut tähän erään. Puhelimen sisimmällä zoomilla
   Pariisin rykelmässä poltettuja oli 0, joten tämä ei vaikuta
   omistajan näkemään Pariisiin — mutta työpöydällä syvemmällä
   laattatasolla niitä on.
2. **Syvä työpöytäzoomi työntää osan rykelmästä ruudun ulkopuolelle.**
   Kaupunkiin ankkuroidut nostot ladotaan riveiksi kaupungin ympärille
   LAUTAYKSIKÖISSÄ (`js/fokuskohteet.js`), joten rivistö kasvaa zoomin
   mukana: puhelimen pohjalla se on 78 × 397 px, ja työpöydällä, jonka
   zoomipohja on 0,098 eli paljon syvempi kuin puhelimen 0,341, se
   kasvaa yli ruudun. Mitattu 1400 × 900: osuudella 0,125 (näkyvä
   leveys 76,6 lautayksikköä) kaikki 21 Pariisin nostoa ovat DOMissa,
   mutta pohjalla 0,098 (60,0 yksikköä) **7 on kokonaan kotelon
   ulkopuolella** (`ruudulla()` pudottaa ne, eivätkä ne ole edes
   osumalistalla). Tämä on rivistön mitoitus eikä tämän erän vika;
   ratkaisu olisi antaa rivistön askeleelle ruutupikselikatto samaan
   tapaan kuin nimiölle. Savuke mittaa siksi molemmilla ruuduilla
   SAMAN karttamitan (osuus 0,34) eikä kummankin omaa pohjaa.
3. **Turisti-info-kyltti kasvaa yhä rajatta.** Se on eri mitoitus
   (`kaupunkimerkinMitta`, kaupunkipisteen sarja) eikä nostojen nimiö,
   ja se näkyy jälkeen-kuvassa ruudun oikeassa laidassa leikkautuneena
   (*"Turisti-in"*). Sama ruutupikselikatto sopisi siihen, mutta se
   koskee PAATOKSET 14:n paneelimitoitusta, joten jätän sen Fablen
   päätettäväksi.

---

## 7. Muutetut tiedostot

| tiedosto | muutos |
|---|---|
| `js/pallolauta/nostot.js` | nimiön ruutupikselikatto (`NOSTON_NIMIO_KATTO_PX`, `NOSTON_MITAN_KATTO`, `nostonMitta(omaKerroin)`), rasteriportaan tilaus (`tahdistaRasteriporras`), ryhmityksen zoomiportin poisto |
| `js/pallolauta/aihemerkit.js` | säännön dokumentaatio: yksi ehto (limitys), zoomiportin poiston mitattu perustelu |
| `js/fokusnosto-symbolit.js` | uusi `nostosymPorrasNyt()` savukkeiden mittariksi |
| `js/fokusvirta.js` | `LUENTAKUVAPAKKA_KARTALLA = false` ja kolme porttia |
| `css/fokusvirta.css` | `.fokusvirta-luentakuva.pieni { display: none }` |
| `tests/luentakuvasarja.test.mjs` | pakkavartiot kytkimen mukaan (`vaadiPakkaKartalla`) |
| `tools/savukkeet/savuke-pariisi-lahizoom.mjs` | **uusi savuke** (390 ja 1400) |
| `tools/savukkeet/savuke-nimikyltti.mjs` | vartio 6 mittaa katon alapuolelta, uusi 6b (katto), 9e käännetty uuden säännön mukaiseksi |
| `tools/savukkeet/savuke-luentakuvan-kerros.mjs` | ketjuvartio ja odotussilmukka kytkimen mukaan |
| `tools/savukkeet/savuke-kaiutin-luentakuvat.mjs` | vastakokeen otsikon tarkennus |
| `tools/savukkeet/README.md` | uuden savukkeen rivi |

---

## 8. Ajot

Kaikki 16.9.2026, tässä haarassa, etualalla yksi kerrallaan.

| ajo | tulos |
|---|---|
| `node --test tests/aihemerkit.test.mjs tests/nimiolimitys.test.mjs tests/pallonimikyltti.test.mjs tests/karttamerkit.test.mjs tests/luentakuvasarja.test.mjs` | 54/54 |
| `node --test tests/rules.test.mjs tests/dokumentit.test.mjs` | 337/337 |
| `node --check` muutetuille tiedostoille | puhdas |
| `savuke-pariisi-lahizoom.mjs` (uusi) | **24/24** — ja peruutetulla koodilla samalla savukkeella 15/24 |
| `savuke-nimikyltti.mjs` | 61/68; FAIL-rivit ovat tunnetut punaiset 4 (kyltti/paneeli-suhde, hajonta 50,30 %), 9b (limittyviä pareja 5 > 4) ja 7a/7b (Venetsian ja Firenzen ankkurin kylki kääntyy) — ei uusia, eikä yksikään näistä koske katettua nimiötä. Uusi vartio **6b (nimiön katto) on vihreä** molemmilla ruuduilla, ja vanha 9e on käännetty INFOksi (perustelu tiedostossa) |
| `savuke-ranska-sisalto.mjs` | 28/30 — samat kaksi tunnettua punaista (8a Strasbourg/Nizza osumalistalta, 9 +25 puntaa) |
| `savuke-kaiutin-luentakuvat.mjs` | **89/89** |
| `savuke-luentakuvan-kerros.mjs` | **29/29** — ketjun viimeinen mitattava lenkki on nyt pulun oman ison sarjan päättyminen, ja KUMOTTU-haara vaatii ettei pakkaa jää kartalle |

Savukkeiden lokit ovat ajossa syntyneitä; kuvat
`pariisi-lahizoom-{390,1400}.png` ja
`pariisi-lahizoom-ilman-ryhmitysta-{390,1400}.png` syntyvät savukkeelle
annettuun kuvakansioon. Raportin ennen–jälkeen-kuva on
`docs/raportit/kuvat/pariisi-lahizoom-390-20260916.jpg` (85 kt).

