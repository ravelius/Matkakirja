# Viesti Fablelle — karttauudistus, erä 13: maapaneeli nostojen tekstikokoon ja lisää-valikko yhdelle riville

**Opus-työagentti, 14.9.2026.** Haara
`claude/bold-ride-vow4ki-paneelikoko`, pohjana
`claude/bold-ride-vow4ki` (v1870 + erän 12 työ). Toimeksianto:
Raamatun KARTTAUUDISTUKSEN PÄÄTÖKSET 11 kohta 1 (omistaja 14.9.2026
klo 13.20 UTC, sanatarkasti: *"maainfo on aivan liian iso. siina
tekstikoko leipatekstissa pitaisi olla samaa luokkaa kuin
karttanostojen tekstin koko."*) sekä Fablen lisätehtävä samaan erään
(omistaja klo 13.50 UTC: *"maainfon plus merkista aukeava valikko
pitaa olla paljon tiiviimpi, ilman tyhjaa tilaa ja se pitaa olla
yhdessa rivissa ja hieman irto maainfosta. plus merkkia pitaa nostaa
hieman."*).

**Lyhyesti:** noston teksti on **ruutuvakio 8,50 px** ja paneeli on
**karttaan sidottu**, joten niiden suhde on 1,00 tasan yhdellä kartan
mittakaavalla eikä kaikilla ruuduilla yhtä aikaa — tämä on mitattu ja
se on erän tärkein löydös. Ankkuriksi valitsin omistajan ruutuluokan
2560 × 1352, jossa suhde oli **1,44** (paneeli 44 % liian iso) ja on
nyt **1,00**. Kerroin on yksi luku (0,696) eikä yhtäkään tyyliarvoa
koskettu. Valikko on yhdellä rivillä, 2,7 px irti kortista, ja plussa
2 px ylempänä.

---

## 1. Mittaus ennen: mikä on noston teksti ja mikä paneelin

### 1.1 Noston teksti kartalla on nimikyltti, ja se on ruutuvakio

Karttanostolla **ei ole kartalla muuta tekstiä kuin nimikyltti**
(nimiö). Se ei ole DOM-tekstiä vaan rasteri: `nostosymRasteroi`
piirtää nimen canvasille `NOSTOSYM_NIMIO_KOKO` = 11 piirtoyksikön
kirjasimella, ja `<image>` saa mitakseen `kangas.width / porras`, joten
`porras` (dpr) supistuu pois. Ryhmän `.pallolauta-nosto-siirto`
mittakaava on `NOSTON_MITTA` = `KARTTANIMI_KOOT.kohde` /
`NOSTOSYM_NIMIO_KOKO` = 8,5 / 11 = **0,7727** (mitattu ruudulta
`getComputedStyle`in muunnosketjusta, ei koodista luettuna).

    noston nimiön ruutukoko = 11 × 0,7727 = 8,50 px

**Luku on sama joka ruudulla ja joka zoomilla** — noston kyltti ei
skaalaudu kartan mukana (se on tarkoituksella laatan poltetun nimiön
kokoinen). Todensin sen vielä musteesta: purin rasterin data-URL:n
canvasille ja mittasin nimiökaistan musterivit — ylä- ja alapidennysten
välinen korkeus on **4,64–6,70 px** (Bayeux 4,64 · Välimeri 5,67 ·
Verdun 6,18 · Millaun silta 6,18 · Avignon 6,70), mikä on tasan sitä
luokkaa kuin 8,5 px:n kaunokirjoituskirjasin antaa.

### 1.2 Paneelin leipäteksti on `.maapaneeli-arvo`, ja se seuraa karttaa

Paneelin leipäteksti (lukurivien arvot, esim. *610 000 km²*) on
`.maapaneeli-arvo` **4,75 css-px** kortin peruskoossa, ja kortilla on
`transform: scale(d.skaala)`. Ruutukoko on siis 4,75 × paneelin
ruutuskaala, ja **ruutuskaala seuraa karttaa** (PÄÄTÖKSET 9 kohta 4).
Kartan mittakaava saapumisnäkymässä riippuu ruudusta, joten sama koodi
antaa eri ruuduilla eri tekstikoon.

**Mitattu Ranskassa (Pariisi, saapumisnäkymä), Playwright + Chromium
`/opt/pw-browsers/chromium`, dpr 1, ei kehittäjätilaa:**

| Ruutu | Paneelin skaala | Leipäteksti | Noston teksti | **Suhde** | Kortti ruudulla |
|---|---|---|---|---|---|
| 390 × 844 | 0,591 | **2,81 px** | 8,50 px | **0,33** | 61,5 × 48,5 px |
| 1400 × 900 | 1,658 | **7,87 px** | 8,50 px | **0,93** | 172,4 × 135,9 px |
| 1920 × 1080 | 2,021 | **9,60 px** | 8,50 px | **1,13** | 210,2 × 165,7 px |
| **2560 × 1352** | 2,570 | **12,21 px** | 8,50 px | **1,44** | 267,3 × 210,8 px |

### 1.3 TÄRKEÄ LÖYDÖS: suhde ei voi olla 1,00 kaikilla ruuduilla

Noston kyltti on **ruutuvakio** ja paneeli **karttaan sidottu**. Silloin
niiden suhde on 1,00 **tasan yhdellä kartan mittakaavalla** — yksi
kerroin ei voi viedä sitä ykköseen sekä puhelimella että työpöydällä.
Tehtävänannon pyytämä *"1,00 ± 5 % molemmilla ruuduilla"* on siis
geometrisesti mahdoton, ja tämä kannattaa kirjata Raamattuun, jos
sääntöä joskus tarkennetaan.

Sama taulukko toisin luettuna: **1400 × 900:lla suhde oli jo 0,93** eli
paneelin teksti oli noston tekstiä pienempi. Omistaja näkee paneelin
liian isona, joten hän katsoo peliä leveämmältä ruudulta — ja
projektin oma levein todennettu työpöytä on **2560 × 1352**
(docs/raportit/viesti-fable-kaistat-20260913.md, jossa yksi vika näkyi
*"vain rootin 2560:llä"*). Sillä ruudulla suhde oli **1,44**, mikä
vastaa omistajan sanaa *"aivan liian iso"*. **Valitsin ankkuriksi
2560 × 1352.** Jos ankkuri on väärä, vaihto on yhden luvun muutos
(`MAAPANEELIN_TEKSTIKERROIN`), ja kaikki muu seuraa perässä.

---

## 2. Korjaus: yksi kerroin, ei yhtäkään tyyliarvoa

`js/pallolauta/maapaneeli.js`:

```js
export const MAAPANEELIN_TEKSTIKERROIN = 0.696;          // 8,50 / 12,21
export const MAAPANEELIN_LEVEYS_OSUUS  = 0.1916 * MAAPANEELIN_TEKSTIKERROIN;
export const MAAPANEELIN_KORKEUS_OSUUS = 0.2327 * MAAPANEELIN_TEKSTIKERROIN;
export const MAAPANEELIN_SKAALA_MIN    = 0.45 * MAAPANEELIN_TEKSTIKERROIN;
export const MAAPANEELIN_SKAALA_MAX    = 64   * MAAPANEELIN_TEKSTIKERROIN;
```

**Miksi juuri osuudet.** Paneelin lautamitta on `LEVEYS_OSUUS ×
laatikko.w`, ja `perusta` (lautayksikköä per css-px) on sama osuus
jaettuna peruskoolla. Kun vain osuudet kerrotaan, `perusta` kutistuu
täsmälleen kertoimella ja sen mukana **sekä paneelin lautamitta että
ruutukoko**: kortti on kartalla ja ruudulla 0,696-kertainen, ja kaikki
sen sisällä — kirjainperheet, lihavuudet, kirjainvälit, värit, sisältö
(mm. SIJALUKU) ja erän 12 sisennysten suhde — on **merkilleen
entinen, vain pienempänä**. Yhtään fonttikokoa, pehmustetta tai
viivamittaa ei muutettu.

**Miksi myös skaalan rajat.** Rajat ovat ruutuskaalan rajoja. Jos ne
jäisivät entisiksi, alaraja 0,45 alkaisi **sitoa** puhelimen
saapumisnäkymässä (0,591 × 0,696 = 0,411 < 0,45) ja katkaisisi juuri
sen karttaan sidotun skaalan, jonka PÄÄTÖKSET 9 kohta 4 vaatii.
Kerrottuina ne pysyvät yhtä sitomattomina kuin ennen.

**Ankkuri ja karttaan sidottu skaala pysyivät.** Paneeli on yhä
Biskajanlahdella (45,9 N / 4,6 W, 0 maaosumaa 25 näytepisteestä), ja
`skaala × korkeus` on kolmella zoomitasolla vakio: **hajonta 0 %**
molemmilla ruuduilla (savukkeen väite 3, ks. luku 5).

### 2.1 Mittaus jälkeen

| Ruutu | Paneelin skaala | Leipäteksti | Noston teksti | **Suhde** | Kortti ruudulla |
|---|---|---|---|---|---|
| 390 × 844 | 0,405 | **1,92 px** | 8,50 px | **0,23** | 42,1 × 33,2 px |
| 1400 × 900 | 1,103 | **5,24 px** | 8,50 px | **0,62** | 114,8 × 90,5 px |
| **2560 × 1352** | 1,789 | **8,50 px** | 8,50 px | **1,00** | 186,0 × 146,7 px |

Ankkuriruudulla osuma on **0,9997** (savukkeen väite 5, raja 1,00 ± 5 %;
mitta otetaan saapumisnäkymässä eikä zoomikatossa, joka on työpöydällä
4,5 % ulompana — siellä sama paneeli antaisi 0,96). Luvut ovat
savukkeen omasta ajosta uloimmalla sallitulla zoomilla; saapumiskorkeus
heilahtaa ajojen välillä prosentin pari, joten esimerkiksi 1400 px:n
leipäteksti mitattiin eri ajoissa välillä 5,24–5,48 px.

**Puhelimen teksti jäi 2,81 → 1,92 px eli alle omistajan hyväksymän
3,6 px:n.** Kirjaan sen enkä korjaa: PÄÄTÖKSET 7 kieltää fonttikoon
alarajan ja sisällön tiivistämisen, ja puhelimen pienuus tulee
**saapumisnäkymän rajauksesta** (pystyruudulla Ranska jää kauas: kartan
mittakaava on siellä 4,4× pienempi kuin ankkuriruudulla) eikä tästä
kertoimesta. Sama juuri näkyy siinä, että suhde oli puhelimella jo
ennen erää 0,33.

---

## 3. Lisää-valikko: yksi rivi, ei tyhjää tilaa, irti kortista

`css/styles.css`. Kolme muutosta, kaikki omistajan lauseesta.

### 3.1 Yksi rivi ja tyhjä tila pois

**ENNEN:** kahden palstan ruudukko kiinteällä 105 px:n leveydellä
(`grid-template-columns: repeat(2, …)`, `gap: 1px`). Ranskan kahdeksan
aihetta latoutuivat **neljälle riville**, lyhyen nimen perään jäi
tyhjää ruutua ja pitkä nimi katkesi kolmipisteeseen (*"Ruokaa ja …"*,
*"Arki ja ta…"*).

**NYT:** `display: flex; flex-wrap: nowrap; gap: 0; width: max-content`
— yksi rivi, jokainen nappi tasan nimensä levyinen, ei katkaisua.

| Mitta (1400 × 900) | ennen | nyt |
|---|---|---|
| Rivejä | **4** | **1** |
| Valikon koko | 166,5 × 282,2 px | **373,1 × 50,8 px** |
| Tyhjää tilaa (ala, joka ei ole nappia) | **12,8 %** | **9,8 %** |
| Nimen katkaisu kolmipisteeseen | kyllä | **ei** |

Puhelimella (390 × 844) sama: 4 riviä → **1**, 59,4 × 100,7 px →
**136,8 × 18,6 px**, tyhjää 12,8 % → **9,8 %**. Jäljelle jäävä 9,8 %
on nappien oma pehmuste ja valikon 1 px:n kehysvara — ei rivien eikä
nappien väliä.

**Vaaka-ankkuri vaihtui oikeasta reunasta keskelle.** Oikea reuna oli
oikea ankkuri kahdelle palstalle, joka mahtui kortin leveyteen; yksi
rivi on kortin levyinen moninkerroin, ja oikeaan reunaan
ankkuroituna se olisi karannut kokonaan vasemmalle — puhelimella
ruudun ulkopuolelle (mitattu: valikon vasen reuna olisi ollut
x ≈ −27 px). Keskitettynä se levittäytyy tasan kortin molemmin puolin
(390 px:llä x 28,9…165,8 / 0…390).

### 3.2 Rako kortin ja valikon väliin

**ENNEN** valikko meni 2 px kortin päälle (`top: calc(100% - 2px)`);
mitattuna se **leikkasi korttia** molemmilla ruuduilla.
**NYT** `top: calc(100% + 2,7px)` (ja ylöspäin auetessa
`bottom: calc(100% + 2,7px)`).

**2,7 px ei ole uusi tyyliarvo vaan kehyksen oma mitta:**
kaksoisviivakehyksen viivaväli on **1,349 px** (js/kasinpiirto.js), ja
rako on tasan kaksi sitä = 2,698 px.

| Rako kortin alareunasta (mitattu) | ennen | nyt |
|---|---|---|
| 390 × 844 | −1,13 px (**päällä**) | **+1,09 px** |
| 1400 × 900 | leikkaa korttia | **+2,97 px** |
| 2560 × 1352 | leikkaa korttia | **+4,81 px** |

Rako on kortin mitassa vakio 2,7 px, joten ruudulla se on skaalan
verran — kuten kaiken muunkin paneelissa.

### 3.3 Plussaa nostettiin

`.maapaneeli-lisaa { top: 1px }` → **`top: -1px`**.

| Plussan palkkien keskilinja kortin yläreunasta | ennen | nyt |
|---|---|---|
| kortin peruskoossa | 22,0 px | **20,0 px** |
| ruudulla 390 × 844 | 12,44 px | **8,09 px** (skaala pieneni myös) |
| ruudulla 1400 × 900 | 34,88 px | **22,07 px** (skaala pieneni myös) |

**Sivuhavainto matkan varrelta:** napin osuma-ala ei ole 14 × 14 px
niin kuin tyylitiedoston kommentti sanoo, vaan **14 × 42 px** —
yleinen `button { min-height: 42px }` (css/styles.css rivi 2203) voittaa
`.maapaneeli-lisaa`n `height: 14px`:n, ja koska palkit ovat
`place-items: center`illä laatikon keskellä, ne piirtyvät 21 px
laatikon yläreunasta eivätkä 7 px. Siksi keskilinja on 22 px eikä 8 px.
En koskenut siihen (osuma-ala on tarkoituksella iso), mutta **kommentti
on väärässä** ja plussan paikka on tämän sivuvaikutuksen tulos.
Jos omistaja haluaa plussan selvästi ylemmäs, oikea säädin on
`min-height: 0` + oma `padding`, ja se on oma eränsä.

---

## 4. Kuvat

`docs/raportit/kuvat/`, rajattuina kortin ja avatun valikon ympäriltä:

- `karttauudistus-13-ennen-390.png` · `-ennen-1400.png`
- `karttauudistus-13-jalkeen-390.png` · `-jalkeen-1400.png`

---

## 5. Portit ja vastakokeet

```
npm test                                # pass 3352, fail 2 (ks. luku 7.4 —
                                        #   sama kaksikko punaisena myös
                                        #   koskemattomalla pohjahaaralla)
node tools/tarkista-kaksoisavaimet.mjs  # ei kaksoisavaimia
node tools/tarkista-niputus.mjs         # 387 moduulia, ei törmäyksiä
node tools/tarkista-savukkeet.mjs       # 1635 ui-viittausta, kunnossa
node tools/savukkeet/savuke-era12.mjs   # 13/13 vartiota läpi
```

Savuke sai kaksi uutta väitettä (5 ja 6) ja kaksi uutta vastakoetta
(D ja E) sekä yhden kestävyyskorjauksen:

**Savuke odottaa nyt, että kamera on paikallaan.** Kylmällä
latauksella (kontti täynnä muiden agenttien ajoja) saapumisajo oli
9 s:n kohdalla joskus vielä kesken, ja kamera oli lähtökorkeudessa
(390 px: 0,0698 = sisin sallittu) eikä saapumisnäkymässä — väite 1
punastui satunnaisesti mittaamalla kesken olevaa liikettä. Nyt
odotetaan 9 s:n jälkeen enintään 15 s, että kaksi peräkkäistä
korkeuslukemaa eroavat alle 0,5 %. Väite ei löysentynyt: mitta on yhä
se korkeus, johon peli itse jää.

**VASTAKOKEET (kaikki tarjoiltavaan lähdetekstiin, joten peli ajaa
oikeasti vanhalla arvolla):**

| | Muutos | Tulos |
|---|---|---|
| **A** | `ULOSZOOMAUKSEN_KERROIN` 1,15 → 3 | vara 172,7 %, väite 1 **PUNAINEN** ✔ |
| **B** | `MAAPANEELIN_ANKKURIT` tyhjäksi | 1 maaosuma (ESP), väite 2 **PUNAINEN** ✔ |
| **C** | `MAAPANEELIN_SKAALA_MAX` → 3 | `skaala × korkeus` hajonta 7,5 %, väite 3 **PUNAINEN** ✔ |
| **D** | `MAAPANEELIN_TEKSTIKERROIN` 0,696 → **1** (erän 12 koko) | ankkuriruudulla leipäteksti **12,21 px**, suhde **1,4363**, väite 5 **PUNAINEN** ✔ |
| **E** | erän 12 valikkotyyli (kaksi palstaa, `top: calc(100% − 2px)`) | **4 riviä** ja valikko kortin päällä, väite 6 **PUNAINEN** ✔ |

Vastakoe D on tämän erän pakollinen vastakoe: vanhalla kertoimella
savuke failaa, uudella menee läpi.

---

## 6. Muutetut tiedostot

- `js/pallolauta/maapaneeli.js` — `MAAPANEELIN_TEKSTIKERROIN` 0,696 ja
  sen kertomat `LEVEYS_OSUUS`, `KORKEUS_OSUUS`, `SKAALA_MIN`,
  `SKAALA_MAX`; perustelut mittauksineen kommenttina.
- `css/styles.css` — lisää-valikko yhdelle riville (`flex`,
  `gap: 0`, `width: max-content`, keskitetty), rako 2,7 px,
  `.maapaneeli-aihe-nimi` ilman kolmipistekatkaisua, plussa `top: -1px`.
- `tools/savukkeet/savuke-era12.mjs` — väitteet 5 ja 6 sekä
  vastakokeet D ja E.
- `docs/raportit/kuvat/karttauudistus-13-{ennen,jalkeen}-{390,1400}.png`.

Ei versionostoa, ei muutoslokiriviä, ei Raamattu-muokkausta, ei
mergeä, ei dist-committia — ohjeen mukaan.

---

## 7. Avoimet havainnot (en korjannut, kirjaan)

1. **Suhde 1,00 on ruutukohtainen** (luku 1.3). Paneeli on karttaan
   sidottu ja noston kyltti ruutuvakio; ykkönen osuu tasan yhdelle
   kartan mittakaavalle. Valitsin ankkuriksi 2560 × 1352. Ainoa tapa
   saada ykkönen joka ruudulle olisi irrottaa paneelin peruskoko
   saapumisnäkymän mittakaavasta — mutta silloin kortti olisi
   puhelimella noin **48 % ruudun leveydestä** (laskettu), mitä
   omistaja on jo kertaalleen kieltänyt (PÄÄTÖKSET 9:ää edeltänyt
   *"Pitää olla paljon pienempi koko"*). En tehnyt sitä.
2. **Puhelimen leipäteksti 2,01 px** (luku 2.1). Juurisyy on
   saapumisnäkymän rajaus pystyruudulla, ei tämä kerroin.
3. **`savuke-kasinpiirto.mjs`:n vastakoe on vanhentunut jo erästä 12.**
   Se palauttaa lähdetekstistä merkkijonot
   `MAAPANEELIN_LEVEYS_PX = 95` ja `MAAPANEELIN_LEVEYS_OSUUS = 0.175`,
   joita ei ole enää olemassa (erä 12 muutti ne 104:ksi ja 0,1916:ksi),
   joten korvaus ei osu mihinkään ja vastakoe mittaa nyt eri asiaa kuin
   lupaa. Tämä erä ei pahentanut tilannetta mutta ei korjannut sitä —
   se on savukkeen oma erä.
4. **`tests/pollo.test.mjs` kaksi vartiota punaisena myös
   koskemattomalla pohjahaaralla** (indeksointi kesti 4497 ms, raja
   alempi): suorituskykymittaus, joka kaatuu kontin kuormasta.
   Todennettu `git stash`illa samalla ajolla — ei tämän erän aiheuttama.
5. **Paneelin sisällön ylivuoto puhelimella 50 px** (savukkeen INFO,
   väite 1:n rivi). Erän 12 raportissa luku oli 0 px, mutta se
   mitattiin hetkellä, jolloin saapumisajo oli vielä kesken; nyt kun
   savuke odottaa kameran lepoon, mitta osuu valmiiseen korttiin.
   **Ylivuoto ei voi tulla tästä erästä:** kortin asettelu tapahtuu
   kortin peruskoossa (104 × 82 px) eikä muunnos (scale) muuta
   `scrollHeight`iä, joten sama 50 px on ollut siellä ennenkin.
   Todennäköisin syy on kielirivin kietoutuminen (Ranskalla kolme
   kieltä + liput, jotka latautuvat viiveellä). Ansaitsee oman
   mittauksensa — en korjannut, koska tiivistäminen olisi PÄÄTÖKSET
   7:n vastaista ilman omistajan sanaa.
