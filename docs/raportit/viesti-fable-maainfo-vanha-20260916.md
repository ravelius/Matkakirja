# Maainfo 27.8.2026 asuun: ei laatikkoa, nimi avaa, otsikot tekstinä

**Opus-sessio 16.9.2026 · haara `claude/bold-ride-vow4ki-maainfo-vanha`**
Raamattu: KARTTAUUDISTUKSEN PAATOKSET 28 **TARKENNUS 2** (omistaja 16.9.2026
klo 10.45 UTC, iPad-kuva 27.8.2026 Kreikasta) ja **TARKENNUS 3** (omistaja
16.9.2026 kortilla, kategoriaotsikot pelkkänä tekstinä).
Pohja: `claude/bold-ride-vow4ki-maainfo-alakulma` (v1921) + `origin/main` (v1920).

## Mitä omistaja pyysi

> *"se maainfon vanha versio oli sellainen missa ei ole tuota valkoista
> taustaa. Muistatko minkalainen se oli?"* — ja kortilla: *"nakyisi vain nimi
> ja alarivi ja klikkaamalla sita tulisi perustiedot seka otsikot kahdessa
> rivissa perustietojen ylapuolelle. kaikki samalla fontilla"*.

TARKENNUS 3: *kategoriaotsikot pelkkinä teksteinä, ei väripalloja;
harvennetut kapiteelit, erottimena välipiste " · " kuten alarivissä;
valittu kategoria erottuu vain ohuella alleviivauksella aiheen värissä.*

## Mistä vanha asu kaivettiin

Lähde on commit **23e05bd5 (v1827, 26.–27.8.2026)**: nurkkataulu
`.fokusmitat` ja sen kartuutsi `css/styles.css` `.fokus-kartuutsi*` sekä
`js/fokusmitat.js` (`rakenna` → nimi, viiva, alarivi; `FOKUS_MAANIMET`).
Uusi kaluste käyttää **samoja tyyliarvoja**: sama kirjasin, samat värit,
sama viiva, samat suhteet.

### Typografia: 27.8.2026 vs. nyt

| osa | v1827 `.fokus-kartuutsi*` | nyt `.maapaneeli-*` | mitattu ruudulla |
| --- | --- | --- | --- |
| kirjasin | `var(--font-type)` | `var(--font-type)` | `"American Typewriter", "Courier Prime", …` |
| maan nimi | 1,35 rem, `letter-spacing` 0,22 em, versaali | **1,9 rem**, 0,2 em, versaali | **30,4 px / 6,08 px** (1400 px) · 20,8 px / 3,33 px (390 px) |
| viiva | 1 px, `rgba(74,52,33,.55)`, `margin .22/.2rem` | sama | 146 × 1,0 px (1400) · 95 × 1,0 px (390) |
| maan oma nimi | 0,78 rem, 0,08 em | **1,1 rem**, 0,08 em | 17,6 px (1400) · 12,2 px (390) |
| valtiomuoto | 0,66 rem, kursiivi | **0,93 rem**, kursiivi | 14,9 px (1400) · 10,2 px (390) |
| nimen väri | `rgba(58,40,25,.92)` | sama | — |
| alarivin väri | `rgba(74,52,33,.88)` | sama | — |
| halo | `0 0 4px/10px rgba(244,232,205,…)` | sama + omistajan `0 0 2px rgba(255,250,240,.9)` | — |

**Miksi nimi kasvoi 1,35 → 1,9 rem.** Omistaja mittasi referenssikuvasta
28–32 px. 1,35 rem on 21,6 px; 1,9 rem on **30,4 px**, eli haarukan
keskellä. Alarivin palat kasvavat tasan samassa suhteessa (0,78/1,35 → 1,1
ja 0,66/1,35 → 0,93), joten kartuutsin **sisäiset mittasuhteet ovat
merkilleen entiset** — vain koko on isompi.

**"Antiikva" on `--font-type`.** Omistajan iPadilla `--font-type` latautuu
muotoon *American Typewriter*, joka on päätteellinen (slab serif)
kirjasin — juuri se harvennettu antiikva, jonka omistaja kuvasta tunnisti.
Vanha kartuutsi käytti samaa muuttujaa, joten fontti EI vaihtunut: koko
kaluste (nimi, alarivi, perustiedot, otsikot) on yhdellä ja samalla
perheellä, kuten omistaja pyysi. Savukkeen vartio 3 mittaa sen.

**Kapean ruudun porrastus** on sama kuin vanhalla nurkkataululla
(mediakyselyt 700 px ja 460 px), vain uuteen peruskokoon laskettuna:
1,9 → 1,5 → 1,3 rem. 390 px:llä nimi on siis 20,8 px eikä 30 px — sama
periaate, jolla v1827 pudotti 1,35 rem:n 0,92 rem:iin.

## Mitat

| | 390 × 844 | 1400 × 900 |
| --- | --- | --- |
| kaluste **levossa** | 95 × 51 px, x 15…109, y 779…829 | 146 × 63 px, x 17…163, y 820…883 |
| väli ruudun vasemmasta / alareunasta | 14,6 / 14,6 px | 17,0 / 17,0 px |
| näkyviä tekstirivejä levossa | **2** (nimi, alarivi) + viiva | **2** + viiva |
| kaluste **avattuna** | 361 × 195 px | 449 × 194 px |
| otsikkorivejä | **2** (y 635…678) | **2** (y 689…732) |
| otsikkokoko | 10 px (mediakysely) | 13 px |
| perustietorivejä | 5 (väkiluku, pinta-ala, demokratia, keskitulo, kielet) | 5 |
| perustiedot y | 683…774 (otsikoiden alla, nimen yllä) | 737…815 |
| lukurivin arvo | 11,5 px | 12,5 px |
| `--liiku-pohja` levossa | ei asetettu (kaluste ei yllä keskilinjalle) | ei asetettu |
| `--liiku-pohja` avattuna | **211 px** (sana y 597…633, kaluste alkaa y 635) | ei tarvita (sana y 848…884) |

Otsikkorivit Ranskassa:

```
HISTORIA · RUOKAA JA TAPOJA · KEKSINNÖT · LUONTO
URHEILU · ARKI JA TAVAT · TAVAT · MENOVINKIT
```

## Mitä poistui

| poistui | miksi |
| --- | --- |
| kortin kermapohja, reunus ja varjo | omistaja pyysi laatikon pois |
| käsinpiirretty kaksoisviivakehys (`.maapaneeli-kehys`, `piirraKehys`, `kasikehys`-kutsu) | kehys on laatikon osa |
| kiinteä 104 × 82 px:n kortti ja `nurkanSkaala` (katot 22 % / 58 %, rajat 1,4…3,2) | kortin mitta; typografia on nyt suoraan ruutupikseleissä |
| erillinen plus-nappi `.maapaneeli-lisaa` | maan nimi avaa ja sulkee |
| valikon väripallot `.maapaneeli-aihe-merkki` ja niiden 13 värisääntöä | TARKENNUS 3 |
| `sovitaValikko`, `VALIKON_KALUSTEET`, `VALIKON_SARAKKEET_MAX`, `--valikko-rivit`, `--valikko-siirto` | kahden sarakkeen pystyladonta korvautui kahdella vaakarivillä |

`kasikehys` itse jää `js/kasinpiirto.js`:ään koskematta.
`paneelinMitat`, `paneelinAnkkuri`, `MAAPANEELIN_ANKKURIT` ja
`paneelinLaatikko` jäävät: `paneelinLaatikko` on yhä saapumisrajauksen
väljennys (`tests/maakartuutsi.test.mjs` vahtii kutsua sanatarkasti) ja
savukkeet lukevat tauluja vastakokeissaan.

## Kaksi ratkaisua, jotka piti mitata

### 1. Napautus on osumatesti, ei osumakohde

PÄÄTÖKSET 21 vaatii, että rulla, nipistys ja raahaus menevät kalusteen
**läpi** kartalle. Erässä 19 se onnistui, koska ainoa `pointer-events:
auto` oli pieni plus-nappi nurkassa. TARKENNUS 2 poisti plussan ja teki
koko kalusteesta napautettavan — ja kalusteen **keskikohta on nyt maan
nimen päällä**, juuri siinä pisteessä, josta `savuke-era12` väite 10
rullaa. `pointer-events: auto` olisi siis kaatanut PÄÄTÖKSET 21:n.

Ratkaisu: **kaikki on `pointer-events: none`**, ja napautus poimitaan
dokumentin kaappausvaiheessa osumatestillä (`js/pallolauta/maapaneeli.js`,
lohko *NAPAUTUS ON OSUMATESTI*). Rulla ja raahaus eivät kulje tätä kautta
lainkaan; vain `click` tutkitaan, ja vain jos sormi ei ollut liikkunut yli
8 px (raahaus ei ole napautus). Näppäimistön Enter tunnistetaan
tapahtuman kohteesta ilman osumatestiä, joten painikkeet ovat yhä
`<button>`eja.

Mitattu: ctrl-rulla kalusteen päältä muutti kameran korkeutta **0,06959**
ja samasta ruutupisteestä ilman kalustetta **0,06959** — suhde **1,000**.

### 2. Kaksi otsikkoriviä mahtuu ruudulle

Otsikkorivien pituus ei ole meidän valittavissamme: se tulee maalehden
omista otsikoista (Ranskassa 74 merkkiä kahdeksassa otsikossa, Kreikassa 75
kuudessa; `MAA_KATEGORIAT`-taulussa on maita, joilla otsikoita on 15).
Rivijako tehdään js:ssä (`otsikkoRivit`: tasan puoliksi, ylärivi pidempi)
eikä `flex-wrap`in armoilla, jotta kaksi riviä on kaksi riviä. Peruskoko
tulee mediakyselystä (13 px / 11 px / 10 px), ja `sovitaOtsikot` pienentää
sitä selaimessa mitatulla suhteella, jos leveämpi rivi ei mahdu kalusteen
vasemmasta reunasta ruudun oikeaan reunaan. Alaraja 8,5 px on
luettavuuden raja: sen alle ei mennä, vaan rivit saavat kiertyä.

Ranskalla kumpikaan ruutu ei tarvinnut kutistusta (390 px:llä peruskoko
10 px riitti, rivin leveys 361 px / 375 px vapaana).

## Datapuutteet — alarivin kentät

`FOKUS_MAANIMET` (`js/packs/fokus-grc.js`) on yhä paikallaan ja sitä
käytetään sellaisenaan.

- **Maan oma nimi (`paikallinen`) on 37 maalla**: ALB, AUT, BEL, BGR, BIH,
  BLR, CHE, CYP, CZE, DEU, DNK, ESP, EST, FIN, FRA, GRC, HRV, HUN, IRL,
  ISL, ITA, LUX, LVA, MDA, MKD, MNE, NLD, NOR, POL, PRT, ROU, SRB, SVK,
  SVN, SWE, TUR, UKR.
- **Aikakauden hallintomuoto (`valtiomuoto`) on VAIN NELJÄLLÄ**:
  GRC (*kuningaskunta v. 1873*), ALB ja BGR (*osmanivaltakuntaa v. 1873*),
  TUR (*osmanivaltakunta v. 1873*).

Seuraus ruudulla: **Kreikassa alarivi on omistajan kuvaama kokonaisuus**
— `ΕΛΛΑΣ · Hellas · kuningaskunta v. 1873`. **Ranskassa alarivi on pelkkä
`France`**, koska vuoden 1873 hallintomuotoa ei ole taulussa (Kolmas
tasavalta julistettiin 1870, mutta perustuslait ovat vuodelta 1875 — väite
on tarkistettava lähteestä, ei arvattava, ja taulun oma sääntö kieltää
arvaamisen). Sama koskee kaikkia muita maita Albaniaa, Bulgariaa ja
Turkkia lukuun ottamatta.

**Ehdotus Fablelle:** jos alariville halutaan hallintomuoto joka maahan,
se on **sisältötyötä** (yksi tarkistettu rivi per maa), ei koodia — kenttä
ja ladonta ovat valmiina. Kaluste ei riko riviä puolikkaaksi: ilman
`paikallinen`-kenttää valtiomuotoa ei näytetä lainkaan, ja ilman
molempia koko alarivi kutistuu pois.

Lisäksi kirjattavaksi: 390 px:llä kolmikielisen maan (Ranska: ranska,
arabia, oksitaani) **kielirivi kiertyy kahdelle riville ja kolmas
tervehdys leikkautuu** kalusteen oikeasta reunasta. Sama tapahtui
nurkkataulussa ja erän 19 kortissa; ei korjattu tässä erässä, koska se on
sisällön mitoitus eikä omistajan pyytämä asia.

## Vartiot

`tools/savukkeet/savuke-maapaneeli.mjs` kirjoitettiin uusiksi (erä 20).
Vanhat vartiot on merkitty kumoutuneiksi tiedoston otsikkoon: 22 %:n
korkeusväite ja sen vastakoe E (10 % / 28 %), "valikko kahteen
sarakkeeseen plussan paikalle" ja "valikon värit ovat --sym-sävyjä"
väripalloina.

Uudet väitteet ja vastakokeet (**17/17 läpi**):

1. levossa vain nimi, viiva ja alarivi — 2 tekstiriviä, ei taustaa
   (kaikkien kuuden osan laskettu tausta `rgba(0,0,0,0)`, kuva `none`,
   varjo `none`, reunus `0px 0px 0px 0px`), 0 plus-nappia, 0 kehystä;
2. napautus nimeen avaa (otsikot 2 rivillä, perustiedot niiden alla ja
   nimen yllä) ja **uusi napautus sulkee** (takaisin 2 tekstiriviin);
3. nimi, alarivi, perustiedot ja otsikot samalla `font-family`llä;
4. otsikot pelkkää tekstiä: **0 väripalloa**, 6 erotinta ja jokainen "·",
   `text-transform: uppercase`, harvennus 0,120 em;
5. kaluste ei liiku eikä kasva zoomatessa (±1 px) — vastakoe C: Pariisin
   karttapiste siirtyy samassa zoomissa;
6. ctrl-rulla menee kalusteen läpi kartalle, suhde 1,000;
7. jokainen 8 otsikosta avaa oman maalehden sivunsa (historia, ruoka,
   keksinnot, luonto, urheilu, arki, tavat, menovinkit);
8. Liiku on kuultava sana alareunan keskellä (poikkeama 0,0 px, tausta
   alpha 0, peitto 0,65) eikä osu kalusteeseen — ei levossa eikä
   avattuna;
9. ei sivuvirheitä.

Vastakokeet: **A** maa ilman aiheita (kaluste on, otsikoita 0, peli ei
kaadu) · **B** `?maapaneeli=nurkka` purkaa kalusteen ja vanha nurkkataulu
palaa · **C** kartan piste liikkuu · **D** pulun nappi ei ole keskilinjalla
· **E** *laatikko takaisin* (palvelin maalaa kermapohjan, reunuksen ja
varjon → pohjattomuusväite punainen) · **F** *ei väistöä* (Liiku osuu
avattuun kalusteeseen 390 px:llä → päällekkäisyysväite punainen).

**Kumoutunut savuke:** `tools/savukkeet/savuke-kasinpiirto.mjs` vartioi
kolmea asiaa, jotka ovat kaikki maapaneelin LAATIKON ominaisuuksia
(neljäsosakoko, vaalea pohja, kaksoisviivakehys). Se tulostaa nyt viisi
`KUMOTTU`-riviä ja poistuu koodilla 0; tilalla ovat yllä olevat väitteet
1–4 ja vastakoe E.

`savuke-era12.mjs`: `.maapaneeli-lisaa` → `.maapaneeli-avain` (7 kohtaa),
väite 10 mittaa nyt "nimen napautus avaa" plussan sijaan, ja vastakokeen
J korjauskohdat osuvat yhä uuteen lähteeseen.
`savuke-iphone-tekstit.mjs` ei viitannut maapaneeliin lainkaan.

### Haaran yhdistäminen: yksi huomio kirjattavaksi

`git merge origin/main` antoi neljä ristiriitaa. `css/styles.css` on
niistä ainoa, jossa "ota oma versio" olisi ollut **väärin**: se olisi
pudottanut 261 riviä main-puolen v1917–v1920 tyylejä, muun muassa
`body.nosto-popup-auki` -säännöt (PÄÄTÖKSET 26). Se myös mitattiin —
`savuke-iphone-tekstit` kaatui neljästä kohdasta — ja ristiriita
ratkaistiin uudestaan kolmen version yhdistelynä (`git merge-file`).
Lopputulos: styles.css sisältää sekä main-puolen lisäykset että tämän
erän uuden lohkon, ja savuke on **54/54**.

## Kuvat

- `docs/raportit/kuvat/maainfo-vanha-390-kiinni-20260916.jpg` (7 kt)
- `docs/raportit/kuvat/maainfo-vanha-390-auki-20260916.jpg` (25 kt)
- `docs/raportit/kuvat/maainfo-vanha-1400-kiinni-20260916.jpg` (13 kt)
- `docs/raportit/kuvat/maainfo-vanha-1400-auki-20260916.jpg` (55 kt)

Pelitallenne on Ranskassa (Fogg Pariisissa), joten kuvissa lukee RANSKA
eikä KREIKKA — tallenne on savukkeen oma pilottipeli. Kreikan alarivi on
se, jossa kaikki kolme palaa ovat olemassa (`ΕΛΛΑΣ · Hellas ·
kuningaskunta v. 1873`).

## Tila

Työ on haarassa `claude/bold-ride-vow4ki-maainfo-vanha` ilman PR:ää,
ilman versionostoa ja Raamattuun koskematta — Fable päättää julkaisusta
(menossa v1922:een).
