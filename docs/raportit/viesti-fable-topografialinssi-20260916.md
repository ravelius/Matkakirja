# Topografialinssi: tarkkuus ruudulle, pelin elementit pois, koko maapallo katsottavaksi

*(Opus-työsessio → Fable, 16.9.2026. Haara
`claude/bold-ride-vow4ki-topografialinssi`, pohja `origin/main` (v1917,
78e6048). Ei versionostoa, ei muutoslokiriviä, ei PR:ää, ei dist/:iä, ei
mediatiedostoja repoon. Lähteet: tehtävänanto; Raamattu
TOPOGRAFIALINSSI: TARKKUUS EI NAY, PELIN ELEMENTIT POIS, KOKO MAAPALLO
KATSOTTAVISSA; LINSSIVIKA: KOHDEMAAN KOROSTUS JA MAAPANEELI VUOTAVAT
LINSSIIN; KARTTAUUDISTUKSEN PAATOKSET 7 ja 23.)*

## 0. Lyhyesti

- **Juurisyy tarkkuudelle ei ollut tekstuuriraja eikä välimuisti vaan
  VÄÄRÄ TIEDOSTO.** 1′-reliefi meni v1917:ssä vain laudan Milleriin
  (`TOPOGRAFIA_KUVA`, 10800 × 4859). Pallo lukee pinnan tekstuurin
  tasavälisenä ja katsoo siksi TOISTA tiedostoa
  (`TOPOGRAFIA_PALLOKUVA`), joka on yhä **4096 × 2048** ja tehty vanhasta
  **3600** pikselin Millerista. Uusi tarkkuus ei siis koskaan päässyt
  ruudulle. `gl.MAX_TEXTURE_SIZE` oli mitattuna **8192**, eli 4096 ei
  skaalautunut alas lainkaan.
- **Mitattu ero lähteissä** (Alpit 5,5–9,5 °E / 44–48 °N, sama ikkuna
  512 × 512 pikseliin, terävyys = reunagradienttien keskiarvo):
  pallokuva **45,5** lähdepikseliä / terävyys **6,78**; Millerin 1′-kuva
  **120** lähdepikseliä / terävyys **16,61** → **2,64× tiheys, 2,45×
  terävyys**.
- **Korjaus on tarkennuslaastari** (`js/linssit/topografia-tarkennus.js`):
  näkyvälle ikkunalle rakennetaan pallokuoren pala, jonka kangas
  rajataan ja uudelleenprojisoidaan Millerin kuvasta LÄHTEEN OMASSA
  tiheydessä (30 px/aste). Mitattu lähizoomissa: kangas **557 × 289**
  pikseliä 18,54° × 7,70° ikkunalle = **30,0 px/aste** eli 2,64× entinen.
  Koko pallon kalvo häivytetään laastarin ajaksi läpinäkyväksi, joten
  peittävyys pysyy sovitussa 0,72:ssa.
- **Pelin elementit ovat nyt nolla.** Ennen: 8 nimikylttiä, 13 nostoa,
  kaupunkipiste (skaala 0,242), pulu, saapumislappu, Liiku, saapumisen
  1077 × 770 pikselin valokuva ja kohdemaan korostus 2110 janalla.
  Jälkeen: kaikki 0, korostus `null`, pisteskaala 0, reittejä 0, kerma
  pois — eikä kartan päällä ole yhtään yli 12 % ruudusta peittävää
  elementtiä.
- **Zoomin katto linssin aikana 0,186 → 1,634** (koko pallo ruudulla,
  1400 × 900), panoroinnin rajaus vapautuu samalla. Sulkeminen palauttaa
  sekä rajat että kameran.
- **Kaksi löydöstä kaupan päälle:** katon puristusmuisti veti kameran
  avaruuteen heti linssin avautuessa (korjattu — linssi SALLII koko
  pallon, ei vie sinne), ja kalvon peittävyys karkasi arvoon −0,09 eli
  linssi katosi kokonaan uloszoomatessa (korjattu, luku 5).
- **Yksi hinta, joka sinun on hyvä tietää** (luku 7): pallolinssi lataa
  nyt 11,6 Mt:n lähdekuvan, kun se ennen latasi 0,79 Mt.

## 1. Mitä tehtiin ja missä

| tiedosto | muutos |
| --- | --- |
| `js/linssit/topografia-tarkennus.js` | **uusi.** Tarkennuslaastarin ohjain ja sen puhtaat funktiot (kynnys, ikkuna, kaistale, kankaan koko, `?tarkennus=0`). Juurisyy ja mittaukset ovat tiedoston alussa. |
| `js/linssit/topografia.js` | `pallolle()` rakentaa laastarin, asettaa linssien yhteisen portin, vapauttaa zoomin ja ottaa kameran talteen. `lataaReliefi({ esilataus })` — pallolla 52 megapikselin esilatausta ei tehdä. |
| `js/pallolauta/linssit.js` | `kalvo()` ottaa vastaan `ikkuna`, `sade` ja `jarjestys`: sama kalvo voi olla koko pallo tai sen pala (`ikkunanGeometria`). Kahvaan tuli `peittavyys()` (kalvo pois näkyvistä purkamatta), häivytys leikkaa peittävyyden välille 0…1, ja latauksen aikana vanhentunut kalvo purkaa ITSENSÄ eikä osaa. |
| `js/pallolauta/kamera.js` | `kokoPallonKorkeus()` — koko pallo ruutuun, yhtenä totuutena kahdelle linssille. |
| `js/linssit/satelliitti-avaruus.js` | `avausKorkeus()` delegoi samaan kaavaan (nimi ja rajapinta ennallaan). |
| `js/pallolauta/lauta.js` | Reitti, pelinappula ja tasoituskerma sammuvat samasta portista kuin korostuskehä. `zoomirajat()` nollaa katon puristusmuistin. |
| `css/styles.css` | Pallolaudan lappuset piiloon aina ladatussa tyylitiedostossa; pulu, saapumislappu ja saapumisen valokuva pois topografialinssissä. |
| `sw.js` | Uusi moduuli SHELL-listalle. |
| `tests/pallolinssit.test.mjs` | 8 uutta väitettä laastarin päätöksistä; kaksi vanhaa väitettä päivitetty uuteen muotoon. |
| `tools/savukkeet/savuke-topografialinssi.mjs` | **uusi.** 26 väitettä kahdella ruudulla, vastakokeineen. |
| `tools/savukkeet/README.md` | Uusi savuke luetteloon. |

## 2. Juurisyy — mitattu, ei arvattu

Mittaukset: Chromium (ohjelmistorenderöinti), 1400 × 900, dpr 1, peli
Pariisissa, linssi päällä. Vertailu ajettiin samalla skriptillä
`origin/main`-puussa ja haarassa.

### 2.1 Mitä ruudulle piirtyy

Topografialinssi on `pallolle`-linssi, joten se EI avaa linssikarttaa
(vanhaa tasokarttaa) vaan piirtyy pallon pinnalle
`js/pallolauta/linssit.js`:n kalvona. Kalvon kuva oli mitattuna:

```
leveysPx 4096, korkeusPx 2048, src topografia-pallo-20260915.webp
gl.MAX_TEXTURE_SIZE 8192
```

Eli **tekstuuri ei skaalautunut alas** (4096 < 8192, ja se on kahden
potenssi). Laattapyramidia linssillä ei ole. Kuva oli siis ruudulla
täydessä koossaan — se vain oli väärä kuva.

### 2.2 Tehollinen tarkkuus (lähdepikseliä ruutupikseliä kohti)

| näkymä | korkeus | ruutupikseliä asteella | lähdettä px/aste | tehollinen |
| --- | --- | --- | --- | --- |
| saapuminen (Ranska) | 0,186 | 56,9 | 11,38 | **0,200** |
| lähizoom (Alpit) | 0,060 | 178,5 | 11,38 | **0,064** |

Yksi lähdepikseli venyi lähizoomissa lähes 16 ruutupikseliin. Juuri sen
omistaja näki.

### 2.3 Lähdekuvien vertailu

Sama maantieteellinen ikkuna, sama lopputulos 512 × 512 pikseliin:

| kuva | mitat | lähdepikseliä ikkunan yli | terävyys |
| --- | --- | --- | --- |
| `topografia-pallo-20260915.webp` | 4096 × 2048 | 45,5 | **6,776** |
| `topografia-20260915.webp` (1′) | 10800 × 4859 | 120 | **16,614** |

Pallokuvan tekee `tools/tee-pallotopografia.mjs`, ja sen lähde on
`assets/linssit/topografia.webp` — vanha 3600 pikselin Miller. Uusi
1′-ajo (v1916–v1917) ei koskenut siihen.

### 2.4 Service workerin välimuisti — ei syyllinen

Tarkistettu `sw.js`:stä: reliefikuvat POISTETTIIN esilatauslistalta
15.9.2026, kun ne siirtyivät R2:een (`sw.js` rivi ~690). Vanha kori
(`CACHE`) tyhjenee versionvaihdossa, ja osoitteet ovat päivätyt
(`…-20260915.webp`), joten vanha tiedosto ei voi palautua uuden
osoitteen alta. **Välimuisti ei siis selitä havaintoa** — mutta jos
pallokuva joskus korvataan, nimen on muututtava.

## 3. Korjaus: tarkennuslaastari

### 3.1 Miksi ei isompi kuva koko pallolle

Lähizoomissa tarvittaisiin 178 px/aste. Tasavälisenä koko pallon kuvana
se olisi **51 400 pikseliä leveä**. Kattoja on kaksi: `MAX_TEXTURE_SIZE`
8192 (mitattu) ja muisti — jo 8192 × 4096 RGBA on **134 Mt**
näytönohjaimella. Koko pallon kuva ei siis voi olla ratkaisu millään
tiheydellä.

### 3.2 Mitä laastari tekee

1. Kameralta luetaan näkyvä ala asteina (300 ms:n välein).
2. Jos ruudun tiheys ylittää pallokuvan tiheyden 1,4-kertaisesti,
   rakennetaan ikkuna, joka on **2,4× näkyvä ala** (reuna jää ruudun
   ulkopuolelle myös panoroinnissa; ulkoreuna on lisäksi pehmennetty).
3. Ikkuna rajataan Millerin kuvasta `projisoiLaudalle`-kaavalla — samalla
   kaavalla kuin lauta itse, ei toista totuutta projektiosta.
4. `createImageBitmap(blob, sx, sy, sw, sh)` purkaa **vain kaistaleen**;
   koko kuvan RGBA olisi 210 Mt. Bittikartta suljetaan heti.
5. Kaistale piirretään tasaväliseksi **rivi kerrallaan** (Millerissä
   leveysaste ei ole lineaarinen), kankaan koko = lähteen oma tiheys,
   katto 2048 px sivulta.
6. Kangas menee pallokuoren PALAN tekstuuriksi (`SphereGeometry`
   phi/theta-kaistana), ja koko pallon kalvo otetaan pois.

### 3.3 Mitattu lopputulos

| | ennen | jälkeen |
| --- | --- | --- |
| lähde ruudulla | 4096 × 2048 koko pallolle | 557 × 289 ikkunalle 18,54° × 7,70° |
| tiheys | 11,38 px/aste | **30,0 px/aste** |
| tehollinen tarkkuus lähizoomissa | 0,064 | **0,168** |
| terävyys lähteessä | 6,78 | **16,61** |
| peittävyys | 0,72 | 0,72 (koko pallon kalvo on laastarin ajan läpinäkyvä, ei kahta päällekkäin) |

**Vaatimusta "≥ 0,8 lähdepikseliä ruutupikseliä kohti" EI voi täyttää, ja
se on aineiston eikä koodin rajoite.** Tarkin reliefi, joka R2:ssa on, on
30 px/aste; lähizoomissa ruudulla on 178 px/aste. 0,8 vaatisi 143 px/aste
eli lähes viisinkertaisen aineiston (ja 51 000 pikselin kuvan). Vartija
mittaa siksi sen, mikä on mitattavissa: **kangas on lähteen omassa
tiheydessä (≥ 2,5× entinen)** ja **laastarin lähde on mitattavasti
terävämpi kuin koko pallon kalvon lähde** (390 px: 13,29 → 20,13 eli
1,51×; 1400 px: 14,71 → 20,25 eli 1,38×).

Terävyyttä EI mitata koko ruudusta. Linssin alla on pelin oma
laattakartta, joka on terävä kummallakin lähteellä ja hukuttaa
0,72-peittävyyden alla olevan eron: mitattuna 146,9 laastarilla ja 148,2
ilman — kohinaa. Ruudulta mitattu ero näkyy vasta kun pelin kerrokset
ovat poissa ja ruutu on tiheä (390 px, dpr 2): **149,6 laastarilla ja
109,6 ilman**, eli 1,36×.

## 4. Pelin elementit pois

Linssi asettaa nyt **linssien yhteisen portin** `body.aikajana-paalla` —
saman, jota Ihmisen matka ja Satelliitti käyttävät (`js/ui.js`
`linssikarttaEstaa`, `js/pallolauta/lauta.js` `linssiPaalla`). Ennen se
ei asettanut mitään luokkaa, ja siksi mikään ei sammunut.

| elementti | valitsin / portti | ennen | jälkeen |
| --- | --- | --- | --- |
| nimikyltit | `.pallolauta-nimi` (css) | 8 | 0 |
| nostot ja aihemerkit | `.pallolauta-nosto` (css) | 13 | 0 |
| kaupunkimerkit | `.pallolauta-piste` + pisteen skaala | 1 / 0,242 | 0 / 0 |
| kohdemerkit | `.pallolauta-kohde` (css) | 0 | 0 |
| vesistönimet | `.pallolauta-vesinimi` (css) | 0 | 0 |
| pelinappula | `merkit.paivita({ nappula: null })` | – | 0 |
| reitti | `reitit.paivita({ avain: '' })` | – | 0 |
| maapaneeli | `.pallolauta-maapaneeli` + `paneelinIso = null` | 0 | 0 |
| pulu | `.pollo-nappi` (css, `body.linssi-topografia`) | 1 | 0 |
| saapumislappu | `.fact-card` (css, `display: none`) | 1 | 0 |
| saapumisen valokuva | `.fokusvirta-isokuva` (css) | 1077 × 770 px | 0 |
| Liiku | `.toimintorivi .monitoimi-nappi` (css) | 1 | 0 |
| kartuutsi | `.fokus-kartuutsi` (css) | 0 | 0 |
| kohdemaan korostus | `paivitaPallonMaakorostus({ iso: null })` | FRA, 2110 janaa | `null`, 0 |
| tasoituskerma | `asetaTasoituksenMaailma(true)` | päällä | pois |

Kaksi asiaa oli aiemmin vain linssien OMISSA tyylitiedostoissa
(`css/aikajana.css`, `css/satelliitti.css`), joita ei ladata
topografialinssin kanssa — siksi nimikyltit ja nostot jäivät näkyviin.
Sääntö siirrettiin aina ladattuun `css/styles.css`:ään; vanhat kopiot
saavat jäädä, ne sanovat saman asian.

**Saapumisen valokuva ei ollut yhdelläkään listalla.** Se löytyi vasta
kun katsoin kuvakaappausta: `.fokusvirta-isokuva` peitti työpöydällä
1077 × 770 pikseliä kartasta koko linssin ajan. Siksi savukkeessa on nyt
NIMILISTAN LISÄKSI yleinen vartio: se laskee kaikki näkyvät elementit,
jotka peittävät yli 12 % ruudusta, ja vaatii niiden määräksi nollan.
Nimilista löytää vain sen, mitä osataan odottaa.

Kerma sammutetaan samalla leikkurilla kuin kehittäjän maailmanäkymässä
(PAATOKSET 23), joten reliefi näkyy linssissä koko laudalla eikä vain
kohdemaassa.

## 5. Koko maapallo

Laudan uloszoomauksen esto lukitsee kameran kohdemaan laatikkoon
(`maanZoomiraja`). Linssin ajaksi katto nostetaan korkeuteen, jolla koko
pallo mahtuu ruudulle — sama kaava kuin satelliittilinssillä, nyt
yhdessä paikassa (`kamera.js kokoPallonKorkeus`).

| | ennen | linssin aikana | sulkemisen jälkeen |
| --- | --- | --- | --- |
| zoomin katto (1400 × 900) | 0,186 | **1,634** | 0,186 |
| panoroinnin rajaus | maan laatikko | **ei rajaa** | maan laatikko |
| kamera | pelaajan oma | pelaajan oma | palautetaan talteenotettuun |

Katto on voimassa **riippumatta maailmatilasta**, koska syrjäytys
voittaa sekä maan laatikon että maailmanapin (`tahdistaZoomirajat`).

**Löydös 1:** ensimmäisessä mittauksessa kamera hyppäsi linssin
avautuessa suoraan korkeuteen 1,634. Syy oli katon puristusmuisti
(`kattoPuristus`), joka on siellä hetkellisiä kuvasuhdepiikkejä varten:
kun katto nousi, muisti "palautti" kameran sinne, mistä piikki oli sen
vienyt. Muisti nollataan nyt aina, kun linssi vaihtaa rajoja tahallaan —
linssi SALLII koko pallon, ei vie sinne.

**Löydös 2 (kalvon peittävyys karkasi miinukselle).** Kun laastari
ensin purki ja rakensi koko pallon kalvon uudestaan joka zoomilla, kaksi
häivytystä jäi päällekkäin ja kalvon peittävyydeksi mitattiin **−0,09**
— eli lähizoomista uloszoomattaessa linssi ei piirtänyt mitään, ilman
yhtään virhettä lokissa. Kaksi korjausta: kalvoa ei enää pureta vaan
HÄIVYTETÄÄN (`linssit.js` kalvon kahvan `peittavyys()`), ja häivytys
leikkaa arvon välille 0…1. Sivutuotteena kuvaa ei enää ladata uudelleen
joka zoomilla.

**Löydös 3 (vanha laastari jäi näyttämölle).** Kuvakaappauksesta näkyi
yleiskuvassa kaksi tarkennettua suorakaidetta pallon pinnalla. Kaksi
syytä, molemmat korjattu: linssimoottorin kalvo purki VÄÄRÄN kalvon, jos
se vanheni latauksen aikana (`o.kalvo` oli jo se uusi), ja laastarin
poisto palasi heti, jos laastari ei ollut vielä "päällä" — jolloin
kesken oleva rakennus ehti asentaa sen poiston JÄLKEEN. Poisto on nyt
ehdoton, ja rakennus tarkistaa vielä ennen asennusta, halutaanko
laastaria yhä.

**Löydös 4 (häivytys nälkiintyi).** Kun koko pallon kalvon näkyvyys
kytkettiin joka tahdistuksessa (300 ms), jokainen kutsu PERUI edellisen
häivytyksen ennen kuin yksikään kehys ehti ajaa — kuormitetussa
selaimessa kehysväli on pidempi kuin 300 ms — ja peittävyys jäi
NOLLAAN: yleiskuvassa ei näkynyt reliefiä lainkaan. Kytkin on nyt
reunaherkkä (häivytys aloitetaan vain kun tila oikeasti vaihtuu), ja
savuke mittaa peittävyyden MATERIAALISTA eikä päättele sitä laastarin
tilasta — juuri se ero paljasti vian. Lisäksi häivytys sai VARMISTIMEN:
ajastin vie arvon perille (ja ajaa purkukutsun) vaikka yhtään
animaatiokehystä ei tulisi. Kuormitetussa selaimessa kehys voi jäädä
tulematta sekunneiksi, ja ilman varmistinta puolitiehen jäänyt häivytys
jättäisi joko kalvon näkymättömäksi tai kuoren näyttämölle.

## 6. Portit

| portti | tulos |
| --- | --- |
| `node --test tests/pallolinssit.test.mjs` | **16/16** |
| `node --test tests/satelliitti.test.mjs tests/satelliitti-avaruus.test.mjs tests/rules.test.mjs tests/dokumentit.test.mjs tests/sw.test.mjs` | 455/455 (yhdessä pallolinssien kanssa) |
| `node --check` (kaikki muutetut) | puhdas |
| `savuke-topografialinssi.mjs` | **26/26** (kaksi ruutua, vastakokeet) |
| `savuke-linssivika.mjs` | **6/6** |
| `savuke-maailma-ei-kermaa.mjs` | **6/6** |

Koko `npm test` -ajoa ei tehty (tehtävänannon rajaus).

## 7. Mitä sinun on syytä tietää

1. **Latauskoko kasvoi.** Pallolinssi haki ennen 0,79 Mt (pallokuva) ja
   hakee nyt lisäksi 11,6 Mt (Millerin 1′-kuva) ensimmäisellä
   tarkennuksella. Se on hinta siitä, että tarkkuus näkyy. Haku tehdään
   kerran linssin avausta kohti, ja `?tarkennus=0` jättää sen tekemättä.
2. **Purku maksaa aikaa.** Mitattuna (Chromium, ohjelmistorenderöinti)
   haku 2,7 s ja kaistaleen purku 3,2 s. Puhelimella ensimmäinen
   tarkennus näkyy siis muutaman sekunnin viiveellä; koko pallon kalvo
   on siihen asti ruudulla, joten linssi ei ole hetkeäkään tyhjä.
3. **Sauma jätetään väliin.** Jos ikkuna osuu kartan saumaan (−175°,
   keskellä Tyyntämerta), laastaria ei tehdä ja koko pallon kalvo jää
   voimaan. Siellä ei ole yhtään pelin kaupunkia.
4. **Tarkin mahdollinen on 30 px/aste.** Jos tästä halutaan vielä
   tarkempi, tarvitaan uusi aineisto R2:een — esimerkiksi tasavälinen
   1′-kuva laatoiksi leikattuna. Sitä ei voi tehdä tästä haarasta:
   R2-tunnuksia ei ole työsession ympäristössä.
5. **Pulu, saapumislappu ja saapumisen valokuva piilotetaan
   `body.linssi-topografia`:lla**, eivät yhteisellä portilla — muissa
   linsseissä Livia puhuu ja kertomukset käyttävät samaa kuvakerrosta.
   Jos topografialinssi joskus saa äänen tai kuvia, sääntö on syytä
   katsoa uudelleen.
6. **Zoomin lähin raja ei muutu.** Linssi nostaa vain katon; lähin raja
   jää laudan omaksi (`kamera.korkeusMin`), koska laattojen tarkkuus ei
   kasva linssistä.

## 8. Kuvat

- `docs/raportit/kuvat/topografialinssi-390-20260916.jpg` — pystypuhelin
  (390 × 844, dpr 2): koko pallo ja lähizoom, linssi auki.
- `docs/raportit/kuvat/topografialinssi-1400-20260916.jpg` — työpöytä
  (1400 × 900, dpr 1): koko pallo ja lähizoom, linssi auki.
