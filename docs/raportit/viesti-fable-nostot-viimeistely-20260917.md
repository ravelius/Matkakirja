# Viesti Fablelle: nostojen viimeistely (PAATOKSET 32 kohta 5, PAATOKSET 33 kohta 3)

**Opus-agentti 17.9.2026 klo 23.00 Suomen aikaa.** Haara
`claude/bold-ride-vow4ki-nostot-viimeistely` = origin/main (v1933)
+ `…-nostoankkurit` (PR #2565) + `…-viuhkalista` (PR #2566), molemmat
mergattuina konflikteitta (`nostot.js`, `lauta.js`, `aihemerkit.js`
sulautuivat automaattisesti). **Vaatii versionoston**;
`tools/uusi-versio.mjs` on ajamatta.

## 1. Lista ei jää toisen tekstin päälle (PAATOKSET 32 kohta 5)

Viuhkalistan esteistössä oli kaksi vikaa: muiden nostojen **nimiöt
eivät olleet esteitä lainkaan** (`laatikot` on ikonien ja poltetun
musteen joukko) ja este oli **pelkkä sakko** — ahtaassa paikassa
pienin sakko on silti päällekkäisyys. Nyt:

- **Kaksi esteluokkaa.** Kaupungin nimi ja pelinappula ovat kovia
  (`KOVAN_ESTEEN_PAINO` 50, js/pallolauta/aihemerkit.js): lista väistää
  niitä aina. Muiden nostojen nimiöt ja merkit ovat esteitä painolla 1.
- **Piilotus, kun tila loppuu.** Kun paras asento yhä osuu toisen
  noston nimiöön, se nimiö piilotetaan listan ajaksi
  (`datum.nimioNakyy = false`); jos lista peittää itse merkinkin, merkki
  piiloutuu (`.pallolauta-nosto-piilossa`, `visibility: hidden`).
  Palautus on paluu normaaliin: seuraava ladonta rakentaa datumit taas
  rivin omista kentistä, joten listan sulkeutuminen riittää.
- Määrä on luettavissa (`nostot.viuhkanPiilotetut()`) ja se kirjataan
  mittaan.

Tämä poikkeaa PAATOKSET 32 TARKENNUKSEN sanamuodosta (*"ahtaudessa EI
piiloteta nimiöitä"*): noudatin Fablen erän ohjetta, jossa piilotus on
nimenomaan sallittu **listan ajaksi**. Ankkurien levitys (TARKENNUS)
on yhä ensisijainen keino ja pysyy voimassa; piilotus on vasta viimeinen.

## 2. Kaikki nostopisteet poltetun merkin kokoa (PAATOKSET 33 kohta 3)

**Mitattu juurisyy:** `AIHEMERKIN_R` oli `NOSTOSYM_MINI_RUUTU` 7,4 —
mutta se on merkin **laatikko**, ei sen muste. Ruudulla lautanen oli
2 × 7,4 × 0,773 ≈ **11,4 px**, kun laattaan poltettu piste on
2 × `NOSTOSYM_PISTE_R` × 0,773 ≈ **5,25 px**. Yli kaksinkertainen —
juuri se, minkä omistaja näki. Erä 1 oli siis pienentänyt lautasen
merkin ruudun kokoiseksi, ei poltetun pisteen kokoiseksi.

- `NOSTOSYM_PISTE_R` (3,4 yks) viety ulos js/fokusnosto-symbolit.js:stä
  ja `AIHEMERKIN_R` on nyt se — yksi mitta, ei kopiota.
- **Symboli jää pois lautasen sisältä.** Viivamerkki piirtyy ±6,5
  yksikölle eikä mahdu 3,4:n säteiseen pisteeseen luettavana; poltettu
  piste on muutenkin pelkkä värillinen kiekko mustereunassa. Aiheen
  kertoo nimiö, joka pysyy 8,5 px:ssä.
- Lehtinostot ja muut nostot käyttivät jo samaa pistepiirrosta
  (`nostosymPisteLuonnos`, r = 3,4) samalla mitalla kuin poltto, ja
  kyltti on erän 1 jäljiltä noston mitassa — **mitattu 5,25 px kaikilla
  kolmella zoomilla** (vartio 6, 3/3 vihreä).

## 3. Kaupungin nimi ja pelinappula — osittain auki

Korjasin kaksi kohtaa: **nimen lukko purkautuu**, jos lukittu paikka
osuu pelimerkkiin (js/pallolauta/nimet.js; ennen lukko palautti nimen
vanhaan paikkaansa pelkän ruutuehdon nojalla, ja nappula ilmestyy nimen
alle vasta saapumisen jälkeen), ja **pelimerkin varaus levitetään 4 px**
(nimen elementti on ruudulla kirjasinmittaansa korkeampi).

**Kumpikaan ei riittänyt: vartio 5 on yhä punainen** saapumisessa ja
välizoomissa. Lisäsin mittariin lähteen nimeämisen, ja vastaus on
yksiselitteinen: **`Pariisi [nimikerros]`** — kyse on CSS2D-nimestä,
ei nostokerroksen kaupunkimerkistä. Ladonta kuitenkin varaa nappulan
`pinot`-listasta ennen ensimmäistäkään nimeä ja `pakota: false`
pudottaisi nimen ennemmin kuin latoisi päälle, joten jäljelle jää kaksi
selitystä, joita en ehtinyt erottaa: (a) ladottu paikka on vapaa mutta
nappulan laatikko **kasvaa ladonnan jälkeen** (kamera asettuu, nappulan
svg on ylivuotoa), tai (b) nimi tulee ladontaan reittiä, joka ohittaa
varausruudukon. **Seuraava askel on yhden mittauksen kokoinen:** dumppaa
samassa levossa nimen ladontalaatikko, nimen DOM-laatikko ja nappulan
laatikko — kolme lukua kertovat kumpi.

## 4. Mitat (Mac, Chrome for Testing)

`tools/savukkeet/mittaa-nostoankkurit.mjs` (Pariisi 390 × 844, kolme
zoomia), **14/19**; uudet vartiot 6 (pallon halkaisija) ja 7 (piilotetut).

| vartio | tulos |
| --- | --- |
| **6 nostopallon halkaisija = poltettu ±0,5 px** | **vihreä 3/3: 5,25 px = 5,25 px** |
| 7 lista kiinni → piilotettuja 0 | vihreä 3/3 |
| 3 kaikki nostot poltetun kartan kokoa | vihreä 3/3 (0,773) |
| 4 kyltin mitta = poltettu | vihreä 3/3 |
| 5 nappulan päällä | lähizoomi vihreä; saapuminen ja välizoomi **1 (Pariisi [nimikerros])** |
| 2 limittyvät parit | lähizoomi 0; välizoomi 1, saapuminen 4 (Marseillen rykelmä + Camarguen poltettu pari + Pariisi × nappula) |
| 1 ankkuri ei liiku | 2 merkkiä, 0,102° — erän 1 tunnettu, tarkoitettu irtoaminen nappulan alta |

`tools/savukkeet/savuke-pariisi-lahizoom.mjs`, **62/76**:

- **4c viuhkalista vihreä molemmilla ruuduilla** (limityksiä 0, musteen
  päällä 0 — nyt myös muiden nostojen nimiöt mukana —, reunan yli 0,
  listan alle piilotettuja 0).
- **4b punainen molemmilla ruuduilla: viuhka ei auennut lainkaan**
  (kohtia 0/6, napautus meni kartalle asti). Tämä on **merkittävä
  löydös** eikä ollut punainen kummassakaan lähtöhaarassa erikseen:
  todennäköisin syy on erien yhteisvaikutus — ankkuroinnin itsekorjaava
  uudelleenladonta (PR #2565: *"kiinteän esteen alle jäänyt ankkuri
  ladotaan uudelleen"*) siirtää merkkiä juuri avauksen jälkeen, ja
  viuhkan lepotesti (`VIUHKAN_LEPO_PX`) sulkee sen heti. Suositus: oma
  pieni erä, jossa avattu viuhka pidetään auki ankkurin uudelleenladonnan
  yli (lepotesti ankkuriin eikä ruutupisteeseen).
- Punaiset **7d, 7f, 7g, 7h, 7i ovat vanhentuneita vartioita**, eivät
  uusia vikoja: ne lukitsevat kyltin vanhan mitan (11,5 / 16 px), jonka
  PAATOKSET 32 TARKENNUS 2 kohta a kumosi. Ne kannattaa päivittää
  noston mittaan samalla kun 4b korjataan.

Kaappaukset (390 px ja 1400 px),
`tools/savukkeet/kaappaukset/nostot-viimeistely/`:

- saapuminen: `nostoankkurit-saapuminen.png`
- välizoomi: `nostoankkurit-valizoomi.png`
- lähizoomi: `nostoankkurit-lahizoomi.png`, `pariisi-lahizoom-390.png`,
  `pariisi-lahizoom-1400.png`
- lista auki (tässä ajossa lista ei auennut, ks. 4b):
  `pariisi-viuhkalista-390.png`, `pariisi-viuhkalista-1400.png`

`node --test tests/*.test.mjs`: **3588 testiä, 0 punaista** (3575
vihreää, 13 ohitettua).

## 5. Oletukset (päätin itse, aikakaton alla)

1. **Piilotus ennen nimiön lyhentämistä.** Fablen ohje nimesi
   piilotuksen; lyhentäminen olisi toinen tie, mutta se muuttaisi
   nostojen sisältöä, mikä oli kielletty.
2. **Symboli pois lautasesta, ei kutistettuna.** 5,25 px:n pisteessä
   kutistettu viivamerkki olisi tahra; omistajan sääntö sallii
   poisjäännin sanatarkasti.
3. **Muotomerkkeihin (vuori, aalto) ei koskettu.** Ne ovat poltetun
   kartan kanssa identtisiä viivamerkkejä samalla mitalla — eivät
   "palloja". Jos omistaja tarkoitti myös niitä, se on oma eränsä
   (kutistus vain kartan rasteriin, ei polttoon).
4. **Kaupunkimerkkien 11,5 px säilyy** (PAATOKSET 25 kohta 2), kuten
   erässä 1.
5. **Vastakoetta ei ajettu** (UI-säätö, Fablen ohje). Liput
   `?nostoankkurit=0` ja `?nostokoko=0` ovat yhä koodissa.

## 6. Muutetut tiedostot

`js/pallolauta/aihemerkit.js` (lautasen mitta, esteen paino),
`js/pallolauta/nostot.js` (listan esteluokat ja piilotus, API),
`js/pallolauta/nimet.js` (lukko purkautuu pelimerkistä, varauksen rako),
`js/fokusnosto-symbolit.js` (`NOSTOSYM_PISTE_R` ulos),
`css/styles.css` (piilotusluokka),
`tools/savukkeet/mittaa-nostoankkurit.mjs` (vartiot 6–7, lähteen nimi),
`tools/savukkeet/savuke-pariisi-lahizoom.mjs` (4c lukee muidenkin
nostojen nimiöt ja piilotettujen määrän).
