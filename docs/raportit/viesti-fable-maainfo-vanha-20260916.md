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

## Valtiomuodot v. 1873

**Sonnet-sessio 16.9.2026 · haara `claude/bold-ride-vow4ki-valtiomuodot`**
(pohja: tämä haara, `claude/bold-ride-vow4ki-maainfo-vanha`). Jatkoa
edelliseen "Datapuutteet"-osioon: `valtiomuoto` on nyt **kaikilla 37
maalla**, joilla on `paikallinen`-kenttä (`js/packs/fokus-grc.js`
`FOKUS_MAANIMET`). Jokainen rivi on omalla lyhyellä kommentillaan
tiedostossa (lähde: yleistieto/en-Wikipedian tunnetut tapahtumat, ei
uutta hakua — omistajan antama kaava ja vuosiluvut on ensisijainen
lähde).

| maa | rivi (`valtiomuoto`) | huomiot |
| --- | --- | --- |
| GRC | kuningaskunta v. 1873 | Ennallaan (Sonnet-riippumaton, jo olemassa). |
| ALB | osmanivaltakuntaa v. 1873 | Ennallaan. |
| BGR | osmanivaltakuntaa v. 1873 | Ennallaan. |
| TUR | osmanivaltakunta v. 1873 | Ennallaan. |
| MKD | osmanivaltakuntaa v. 1873 | Ennallaan. |
| AUT | Itävalta-Unkari, kaksoismonarkia v. 1873 | Ausgleich 1867; Itävallan puolisko (Cisleithania). |
| HUN | Itävalta-Unkari, kaksoismonarkia v. 1873 | Ausgleich 1867; Unkarin kruunun puolisko. |
| BEL | kuningaskunta v. 1873 | Itsenäinen 1830. |
| DNK | kuningaskunta v. 1873 | — |
| ESP | tasavalta v. 1873 | **KORJATTU 16.9.2026** (omistajan vahvistus): Ensimmäinen tasavalta 11.2.1873 kesti koko vuoden 1873; Alfonso XII:n kuningaskunta palautui vasta 29.12.1874. Alun perin kirjoitettu "kuningaskunta v. 1873" annetun kaavan mukaan — merkittiin epävarmaksi raportissa, omistaja vahvisti Sonnetin huomion ja rivi korjattiin. |
| ITA | kuningaskunta v. 1873 | Italian kuningaskunta 1861, pääkaupunki Roomassa 1871. |
| NLD | kuningaskunta v. 1873 | — |
| PRT | kuningaskunta v. 1873 | Tasavalta vasta 1910. |
| SWE | kuningaskunta v. 1873 | Unionissa Norjan kanssa. |
| NOR | kuningaskunta, unionissa Ruotsin kanssa v. 1873 | Ruotsi-Norja 1814–1905, oma perustuslaki ja hallitus. |
| DEU | keisarikunta v. 1873 | Perustettu 18.1.1871. |
| FRA | tasavalta v. 1873 | Kolmas tasavalta julistettu 4.9.1870 (perustuslait vasta 1875, mutta tasavaltamuoto oli olemassa 1873). |
| CHE | liittovaltio v. 1873 | Liittovaltio vuoden 1848 perustuslaista. |
| FIN | suuriruhtinaskunta Venäjän yhteydessä v. 1873 | Autonominen osa Venäjän keisarikuntaa. |
| LUX | suurherttuakunta v. 1873 | **PIENI YKSINKERTAISTUS:** rivi ei mainitse, että suurherttuakunta oli persoonallisessa liitossa Alankomaiden kruunun kanssa vuoteen 1890 (Lontoon sopimus 1867 teki siitä pysyvästi puolueettoman, itsenäisen valtion, mutta hallitsija oli sama kuin Alankomailla). Ei ristiriidassa annetun kaavan kanssa, mutta lisätieto puuttuu tilan vuoksi. |
| ROU | ruhtinaskunta, osmanien alainen v. 1873 | Moldovan ja Valakian liitto; itsenäisyys vasta 1877. |
| SRB | ruhtinaskunta, osmanien alainen v. 1873 | Itsenäisyys vasta 1878 (Berliini). |
| MNE | ruhtinaskunta v. 1873 | Tosiasiassa itsehallinnollinen, ei osmanien veronalainen enää 1870-luvulla — annettu kaava jätti osmani-maininnan pois, ja se on oikein. |
| IRL | osa Yhdistynyttä kuningaskuntaa v. 1873 | Koko Irlanti osa UK:ta 1801–1922. |
| POL | jaettu Venäjän, Preussin ja Itävallan kesken v. 1873 | **TERMINOLOGIAHUOMIO:** "Preussin" on vakiintunut historiankirjoituksen nimitys Puolan jaoille, vaikka Preussi oli 1873 muodollisesti osa Saksan keisarikuntaa (yhdistyminen 1871) — alue hallinnoitiin yhä Preussin kuningaskuntana Saksan sisällä, niin kuin annettu kaava sanoi. Ei muutettu. |
| CZE | Itävalta-Unkaria (Böömi) v. 1873 | Böömin kruunumaa, Itävallan puolisko (Cisleithania). |
| SVK | Itävalta-Unkaria (Unkari) v. 1873 | Ylä-Unkari, Unkarin kruunun puolisko. |
| SVN | Itävalta-Unkaria v. 1873 | Slovenian alue (Krain ym.) Itävallan puoliskon (Cisleithania) kruunumaata. |
| HRV | Itävalta-Unkaria (Unkari) v. 1873 | **TÄSMENNETTY 16.9.2026** (omistajan vahvistus): Kroatia-Slavonia oli Unkarin kruunun (Unkarin puoliskon) alainen autonominen kuningaskunta Nagodban (1868) nojalla — sama tarkkuus kuin SVK:lla, ei Itävallan puoliskon (Cisleithania) kruunumaa kuten Slovenia. Alun perin kirjoitettu yleisrivinä "Itävalta-Unkaria v. 1873" annetun kaavan mukaan; merkittiin yksinkertaistukseksi raportissa, omistaja vahvisti ja rivi täsmennettiin. |
| BIH | osmanivaltakuntaa v. 1873 | Bosnian vilajetti; Itävalta-Unkari miehitti vasta 1878. |
| EST | Venäjän keisarikuntaa v. 1873 | Viron ja osin Liivinmaan kuvernementit. |
| LVA | Venäjän keisarikuntaa v. 1873 | Liivinmaan ja Kuurinmaan kuvernementit. |
| BLR | Venäjän keisarikuntaa v. 1873 | Luoteis-alue (Vitebsk, Minsk ym.). |
| UKR | Venäjän keisarikuntaa v. 1873 | Lounaisalue ja Novorossija. |
| MDA | Venäjän keisarikuntaa (Bessarabia) v. 1873 | Nykyisen Moldovan alue on pääosin Bessarabia (Venäjän 1812); Romanian ruhtinaskunnalla oli 1873 vain Preutin länsipuoli. |
| ISL | Tanskan alainen v. 1873 | Home Rule vasta 1904, itsenäisyys 1918/1944. |
| CYP | osmanivaltakuntaa v. 1873 | Brittihallintaan vasta 1878. |

**Omistaja vahvisti 16.9.2026 molemmat raportissa merkityt
epävarmuudet** ja pyysi korjaukset: ESP → *tasavalta v. 1873*, HRV →
*Itävalta-Unkaria (Unkari) v. 1873* (rivit ja `js/packs/fokus-grc.js`
lähdekommentit päivitetty yllä olevaan tauluun). LUX pysyy
ennallaan (*suurherttuakunta v. 1873*, persoonaliitto-huomio jää
kommentiksi eikä riviin). Fokus-kartuutsia (`.fokus-kartuutsi-alarivi`)
ei muuteta tässä vaiheessa — pysyy omistajan päätöksellä ennallaan.

**Pituudet ja rivitys.** 33/37 riviä on ≤ 40 merkkiä. Neljä ylittää
ohjeen tietoisesti annetun sisällön vuoksi: **POL** (52), **NOR** (47),
**FIN** (45), **MDA** (42) — kaikki juuri niin kuin tehtävänanto
sanamuotoili ne, koska historiallinen tarkkuus ohitti mittarajan.
Näiden neljän lisäksi **AUT/HUN** (40, juuri rajalla) ovat pisimmät
seuraavaksi.

Mitattu (oma mittaus, sama tekniikka kuin
`tools/savukkeet/savuke-maapaneeli.mjs`: `scrollWidth` vs. `clientWidth`
kalusteen `.maapaneeli-alarivi`-elementissä, ei pelin sisällä vaan
samalla CSS:llä ja DOM-rakenteella): **Puola, Norja ja Moldova
ylittivät alarivin leveyden jo 390 px:n ruudulla** (ja Suomi/Itävalta
320 px:llä) `white-space: nowrap`illa. Korjaus:
`css/styles.css` `.maapaneeli-alarivi` saa nyt `white-space: normal`
-säännön olemassa olevaan `@media (max-width: 700px)`-lohkoon, joka
sallii pitkän rivin **kietoutua kahdelle riville** — lyhyt rivi pysyy
yhdellä, koska selain rivittää vain kun sisältö ei mahdu. Uudella
mittauksella yksikään testattu leveys (320, 390, 460, 461, 500, 700 px)
ei enää ylitä (`scrollWidth === clientWidth` kaikilla viidellä pisimmällä
rivillä). `tools/savukkeet/savuke-maapaneeli.mjs`-savuke ei mittaa
tätä suoraan (pilottimaa on Ranska, lyhyt rivi), mutta savukkeen
"tekstirivit === 2" -väite ei riko rivitystä, koska se laskee
elementtien Y-alkukohtia (`.maapaneeli-alarivi` on yhä yksi elementti)
eikä sisäisiä tekstiriveja — savuke pysyi **17/17**.

**HUOMIO Fablelle fokus-kartuutsista.** `js/fokusmitat.js` /
`css/styles.css` `.fokus-kartuutsi-alarivi` (tasokartan/linssikartan
zoomattu maanäkymä, eri kaluste kuin pallolaudan `maapaneeli.js`) lukee
SAMAA `FOKUS_MAANIMET`-taulua, mutta sen oma suunnitteludokumentti
(rivi 1005–1007) sanoo nimenomaan: *"jos rivi ei mahtuisi kapealle
ruudulle, kentän saa jättää pois taulusta — sitä ei typistetä tässä"*
eli sen malli on käsin kuratoitu sisältö, ei CSS-rivitys. Tätä kalustetta
EI muutettu tässä erässä (tehtävänanto rajasi työn `maapaneeli.js`:ään),
mutta koska taulu on nyt yhteinen ja neljä riviä ylittää 390 px:n
leveyden nowrap-tyylillä, **`.fokus-kartuutsi-alarivi` saattaa nyt
ylivuotaa Puolalla, Norjalla ja Moldovalla siinä näkymässä** samalla
tavalla kuin `maapaneeli.js`:ssä ennen tätä korjausta. Fablen
päätettävä: sama rivitys-korjaus toiseenkin kalusteeseen, tai
kentät pois taulusta juuri näiltä maailta tuon näkymän osalta (taulu on
yhteinen, ei per-näkymä).

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
