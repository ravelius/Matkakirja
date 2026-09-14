# Ranskan pohjalaatat: POLTTOA EI TEHTY, koska mittaus kumosi syyn

*Opus-työagentti Fablelle 14.9.2026. Haara
`claude/bold-ride-vow4ki-poltto`, pohja origin/main (8d14e8ae, v1875).
Ei R2-vientiä, ei `pyramidi.json`-muutoksia, ei versionostoa, ei
muutoslokiriviä, ei mergeä.*

## 0. Lyhyesti — kolme asiaa, kaksi niistä yllätyksiä

1. **ELÄVÄ POHJA ON JO OIKEA.** Tehtävä nojasi selvitykseen
   `viesti-fable-rantaviiva-20260914.md`, jonka mukaan elävä pohja on
   poltettu vanhalla ETOPO-säännöllä ja nykykoodi polttaisi toisen
   rannan. **Se ei pidä paikkaansa.** Poltin Ranskan koko laatikon
   z0–z8 (269 laattaa) tämän puun koodilla ja vertasin TAVU TAVULTA
   elävään ämpäriin: laatat ovat samat. Maa/meri-geometria ei muutu
   uudelleenpoltosta yhtään — **ainoa ero on poltetun rantaviivan
   muste**, ja sekin vain siksi, että elävässä pyramidissa se on
   epäjohdonmukaisesti (z0–z7 ilman, z8 kanssa). Luku 2.
2. **PUNAINEN RAJA MYÖTÄILEE POLTETTUA RANTAA YHDEN PIKSELIN
   TARKKUUDELLA** — mitattuna elävistä laatoista, ei simuloidusta
   säännöstä: mediaani 0,069 lautayksikköä z8:lla, 0,139 z7:llä,
   0,278 z6:lla. Jokainen on TÄSMÄLLEEN yksi laattapikseli eli
   mittauksen pohja. Tavoite "mediaani ≤ 0,1 yks" **täyttyy jo nyt**.
   Sama pätee Kreikan Kykladeihin: saarilla on poltettu maa. Luku 3.
3. **NOSTOTASON MERKKIPORTTI ON TEHTY** (koodi + testi + vastakoe):
   polttoketju ajaa merkit `merkkiPortti`n läpi uloimman zoomin
   asetuksella. 32 merkkiä seitsemästä maasta jää polttamatta.
   Ranskaan se ei kosketa (20 merkkiä, katto 21). Luku 4.

**Siksi polttoa EI ajettu.** Ajo olisi kirjoittanut ämpäriin
tavulleen saman geometrian, nostanut pohjan version ja **sammuttanut
koko laattakerroksen** jokaiselta pelaajalta siihen asti, kunnes
pallon Mercator-sarja on poltettu uudestaan ja `js/pallo.js`
julkaistu — eli hinta olisi ollut julkaistun pelin rikkoutuminen ja
hyöty nolla. Perustelu ja mitattu versiovahti luvussa 5.

Mitä ajon valmistelusta löytyi ja korjattiin: **kolme vikaa
`generoi-pyramidi.yml`:ssä**, joista yksi olisi pyyhkinyt 27 maan
tasoituslaatastot luettelosta. Luku 6.

---

## 1. Mitä ajettiin: paikallinen poltto, ei ämpäriä

Kaksi täyttä ajoa tässä kontissa, Ranskan laatikko
`-5.2,41.3,9.6,51.1` (sama kuin selvityksessä):

| ajo | tasot | laattoja | kesto | nopeus | lippu |
| --- | --- | ---: | ---: | ---: | --- |
| A | z0–z6 (3′) | 33 | 103 s | 0,33 Mpx/s | `--ilman-rantaviivaa` |
| A | z7–z8 (1′) | 236 | 360 s | 0,33 Mpx/s | `--ilman-rantaviivaa` |
| B | z0–z6 (3′) | 33 | 101 s | 0,33 Mpx/s | (oletus: rantaviiva mukana) |
| B | z7–z8 (1′) | 236 | 352 s | 0,33 Mpx/s | (oletus) |

Yhteensä **269 laattaa / 7,7 min per ajo**. Selvityksen arvio (269
laattaa, ~1 min Macilla 1,39 Mpx/s) osui laattamäärään tarkasti;
tämän kontin nopeus on 0,33 Mpx/s eli poltto on täällä nelinkertainen.

Aineisto: Natural Earth GitHubista, ETOPO 3′ reposta, 1′-korkeuspalat
julkisesta ämpäristä. **Yhtään tavua ei kirjoitettu R2:een.**

## 2. TAVUVERTAILU: elävä pohja = tämän puun koodi

Jokainen 269 laatasta haettiin elävästä ämpäristä
(`julisteet/pyramidi/2026-09-07a/z…`) ja verrattiin `cmp`:llä.

| ajo | sama tavulleen | eri | selitys |
| --- | ---: | ---: | --- |
| A (`--ilman-rantaviivaa`) | **190 / 269** | 79 | erot ovat **kaikki z8:lla** (180 laattaa) + 7 muuta |
| B (oletus, rantaviiva) | **202 / 269** | 67 | erot ovat **z0–z7:llä**, z8:lla vain 3 |

Kuvio on yksikäsitteinen ja se selittää sekä A:n että B:n:

> **Elävässä pyramidissa 2026-09-07a tasot z0–z7 on poltettu ILMAN
> rantaviivaa ja taso z8 SEN KANSSA.**

Todistus yksittäisellä laatalla: poltin z8/162/72 ja z8/163/72
oletuslipuilla (rantaviiva mukana) — **molemmat tavulleen samat kuin
ämpärissä**. Ja z7/81/36 oletuslipuilla eroaa elävästä 4,1 %:ssa
pikseleistä, koska elävässä ei ole rantaviivan mustetta
(`docs/raportit/kuvat/poltto-gironde-z7-ei-rantaviivaa.jpg`).

**Maa/meri-täyttö on kummassakin sama.** Pikselivertailu z8-laatalle
161/70 (Bretagne, ajo A vs. elävä): 1,94 % pikseleistä eroaa ja niistä
937 muuttaa maa/meri-luokkaa — ne 937 ovat itse rantaviivan tummat
pikselit, eivät täytön reuna. z8/170/72 (ajo B vs. elävä): 110
pikseliä eroaa, joista **2** on maa/meri-luokan ero.

Loput 7 laattaa (z6 42/16, 42/18, 43/17, 43/18 ja z7 85/36, 86/35,
86/36) eroavat ajossa A pienesti myös ilman rantaviivaa: z6/43/17
eroaa 30 pikselissä (0,011 %) 16 × 50 pikselin laatikossa, yksi
maa/meri-ero. Se on yhden nimen tai rajanpätkän kokoinen muutos 7.9.
jälkeen, ei rannikko.

**Johtopäätös: uudelleenpoltto ei siirtäisi rantaa yhtään.**

## 3. Punaisen rajan etäisyys poltettuun rantaan — mitattuna LAATASTA

Selvityksen luku 4.2 mittasi eron **simuloimalla vanhan ETOPO-säännön**
ja vertaamalla sitä meripolygoniin. Koska elävä laatta ei ole sillä
säännöllä poltettu (luku 2), luvut eivät kuvaa ruutua. Mittasin siksi
suoraan laatasta: maa/meri luokitellaan väristä (meri 215,207,187 —
maa 234,228,184; kynnys keskellä), rajapikselit 4-naapurustosta,
etäisyysmuunnos, ja jokaiselle `maapolygonit.json`in kärkipisteelle
etäisyys lähimpään rajapikseliin.

| laatta | alue | pisteitä | mediaani | p95 | max | 1 px on |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| z8/159/70 | Bretagnen kärki | 81 | **0,069** | 0,278 | 0,584 | 0,069 |
| z8/160/70 | Bretagne | 58 | **0,069** | 0,347 | 0,671 | 0,069 |
| z8/161/71 | Etelä-Bretagne | 132 | **0,069** | 0,295 | 0,462 | 0,069 |
| z8/163/73 | Gironde | 25 | **0,069** | 0,295 | 0,462 | 0,069 |
| z8/162/74 | Arcachon | 8 | **0,069** | 0,139 | 0,139 | 0,069 |
| z8/162/69 | Normandia | 57 | **0,069** | 0,278 | 0,589 | 0,069 |
| z7/79/35 | Bretagne | 80 | 0,139 | 0,589 | 0,728 | 0,139 |
| z7/81/36 | Gironde | 124 | 0,139 | 0,589 | 0,833 | 0,139 |
| z6/39/17 | Bretagne | 72 | 0,278 | 1,341 | 1,782 | 0,278 |
| z6/40/18 | Gironde | 178 | 0,278 | 1,111 | 4,560 | 0,278 |
| z7/93/41 | **Kyklades (GRC)** | 391 | 0,139 | 0,474 | 0,867 | 0,139 |
| z8/187/82 | Syros–Naxos | 92 | 0,139 | 0,278 | 0,434 | 0,069 |
| z8/190/84 | Rodos | 36 | 0,098 | 0,278 | 0,364 | 0,069 |

**Mediaani on joka tasolla täsmälleen yksi laattapikseli.** Se on
mittauksen pohja: tarkempaa ei voi mitata rasterista. Tavoite
"mediaani ≤ 0,1 lautayksikköä" täyttyy z8:lla (0,069) ja z7:llä ollaan
0,139:ssä — ei siksi, että jokin olisi korjattu, vaan siksi että
raja ja täyttö tulevat jo samasta vektorista.

**"Punaisia pisteitä meressä ≤ 3 %" ei ole tällä tarkkuudella
mitattava suure.** Raaka luku on 49–78 %, mutta se kertoo vain, kummalle
puolelle yhden pikselin rajaa kärkipiste sattuu. Mitattava muoto on
"meressä JA kauempana kuin ääriviivan oma yksinkertaistustoleranssi
(Douglas–Peucker 0,2 yks)":

| taso | meressä yli 0,2 yks |
| --- | ---: |
| z8 (6 laattaa) | **0,0–8,3 %** (mediaani 4,9 %) |
| z7 (2 laattaa) | 14,5–20,0 % |
| z6 (2 laattaa) | 33,7–54,2 % |

Luku kasvaa ulospäin zoomatessa, koska yksi pikseli on ulompana
suurempi osa yksikköä — ei koska ranta siirtyisi. **z8:lla ollaan
kolmen prosentin tuntumassa ja se on ääriviivan oman harvennuksen
jäännös, ei polton.**

**Kuvat** (`docs/raportit/kuvat/`):

* `poltto-bretagne-z8-aariviiva.jpg` — ELÄVÄ laatta z8/161/70 ja
  punainen ääriviiva päällä. Viiva kulkee rannalla.
* `poltto-kyklades-z7-maa.jpg` — ELÄVÄ laatta z7/93/41. **Kykladeilla
  on poltettu maa jokaisella saarella**, ja punainen raja myötäilee
  sitä. Selvityksen luku 4.3 ("Egeanmerellä joka viides saari on
  kartalla pelkkä ääriviiva") ei pidä paikkaansa pohjalaatoissa —
  saarten maa on siellä. 39 596 maapikseliä tässä yhdessä laatassa.
* `poltto-gironde-z7-ei-rantaviivaa.jpg` — ELÄVÄ z7/81/36: ei
  poltettua rantaviivaa (vrt. z8, jossa se on).

## 4. Nostotason merkkiportti — TEHTY

`docs/raportit/viesti-fable-merkkirajat-20260914.md` luvun 7 askel 1.

**Muutos:** `tools/fokuskartta/nostot.mjs` ajaa maan valmiin ladonnan
`js/pallolauta/nostot.js merkkiPortti`n läpi `lahella = false` eli
uloimman zoomin asetuksella ja merkitsee poltettaviksi vain portin
päästämät. Sama funktio, sama tärkeysjärjestys ja sama katto kuin
elävällä kerroksella (v1867) — ei omaa kopiota säännöstä.

**Portti ajetaan VASTA kolmen passin jälkeen**, kuten pelissä
(`maanKohdemerkit` latoo kaikki, portti karsii valmiista). Jos portti
karsisi ennen kasausta, poltettujen merkkien paikat eroaisivat
elävistä — juuri se, minkä Raamattu kieltää.

**Mitattu vaikutus** (`keraaNostot`, maailmankartta):

| | ennen | jälkeen |
| --- | ---: | ---: |
| merkkejä yhteensä | 1 800 | 1 800 |
| poltetaan | 1 675 | **1 645** |
| portin taakse | — | **32** |

Maittain: GRC 33 merkkiä / 12 yli katon, TUR 29 / 8, DEU 28 / 7,
HRV 23 / 2, ESP 22 / 1, ITA 22 / 1, RUS 22 / 1. Poltettavien määrä
putoaa 30:llä (ESP:n merkkejä ei polteta muutenkaan — täkyesto).
**Ranska: 20 merkkiä, 0 yli katon — portti ei kosketa Ranskaan.**

**Ylimääräinen merkki jätetään kokonaan polttamatta, ei poltetakaan
lähizoomilaatoille.** Tehtävänanto pyysi jälkimmäistä; mittaus
osoittaa sen mahdottomaksi ilman uutta vikaa: nostolaatan
tunnus→tiiviste-luettelo (`nostotaso.nostot`) EI ole tasokohtainen,
vaan peli päättää siitä, onko merkki laatassa VAI elävä
(`js/pallo.js pallonNostoOnPoltettu`). Kaksi vaihtoehtoa:

* merkki laatoille z6–z7 **ja** luetteloon → uloimmalla zoomilla se on
  näkymätön mutta yhä napautettava, ja **polttovelka ei nollaudu**;
* merkki laatoille **mutta ei** luetteloon → lähizoomilla piirtyy sekä
  laatan muste että elävä merkki, eli **kaksoiskuva**.

Kun merkki jää polttamatta, elävä kerros hoitaa sen kokonaan omalla
portillaan: näkyy lähizoomilla, piilossa uloimmalla. **Ruudulla sama
lopputulos, nolla polttovelkaa, ei kaksoiskuvaa.** Luvun 7 oma sanamuoto
("ennen kuin merkitsee ne poltettaviksi") on juuri tämä.

**Testi:** uusi `tests/nostopoltto-merkkiportti.test.mjs`, 4 väitettä:
(1) yksikään maa ei polta yli katon, (2) poltettavat ovat osajoukko
siitä, minkä ELÄVÄ pää (`js/fokuskohteet.js maanKohdemerkit` +
`merkkiPortti`) päästäisi — eli kaksi päätä eivät voi ajautua eri
vastauksiin, (3) `lahi: true` ei pala (aineistossa ei ole vielä
yhtäkään, joten väite ajetaan myös tekosyötteellä), (4) portti ei
siirrä ladontaa: poltetun merkin tiiviste on luettelossa ja
polttamattoman ei ole.

**Vastakoe (ajettu):** `poltettava: !estetty && paastetyt.has(r.id)`
takaisin muotoon `poltettava: !estetty`:

```
not ok 1 - yksikään maa ei polta yli pääkartan merkkikaton
not ok 2 - poltettavat ovat täsmälleen ne, jotka elävä portti päästäisi
           ('GRC/traakianmeri palaa, vaikka elävä portti piilottaisi sen')
ok 3 - lähizoomin kohde (lahi: true) ei pala koskaan
ok 4 - portti ei siirrä ladontaa
# pass 2 · # fail 2
```

Täsmälleen ne kaksi väitettä, jotka porttia mittaavat — ei enempää.
Väitteet 3 ja 4 pysyvät vihreinä, koska portti ei muuta ladontaa
eikä aineistossa ole `lahi`-kohteita.

## 5. Miksi ajoa EI ajettu: versiovahti sammuttaa koko kerroksen

**Mitattu ämpäristä 14.9.2026:**

```
pyramidi.json     versio 2026-09-07a · nostotaso 2026-09-08a-nostot
                  viivataso 2026-09-08a-viivat · rantataso 2026-09-07a-ranta
                  varitasot 27 maata (2026-09-14-tasoitus)
pallon sarja      julisteet/pallo/laatat/2026-09-07a-nostot-f/laatat.json
                  versio 2026-09-07a · nostot 2026-09-08a-nostot
js/pallo.js       PALLO_LAATTAVERSIO '2026-09-07a' · PALLO_LAATTATUNNISTE 'f'
```

`js/pallolaatat.js lepokerroksenKerrokset` (rivit 352–358):

```js
if (pallonLuettelo.versio !== pyramidi.versio) return null;
if (nostot && nostot !== (pyramidi.nostotaso?.versio ?? null)) return null;
```

`null` = **koko laattakerros pois**; kartta on sumea Mercator-pallo
eikä mikään kerro pelaajalle miksi. Tämä koskee **yhtä lailla pohjan
kuin nostotason** versionostoa. Ketju uuteen versioon on siis:

1. laatat uuteen versiopolkuun (pohja ja/tai nostotaso),
2. pallon Mercator-sarja uudestaan kansioon `<uusi>-nostot-<kirjain>`
   (`tee-pallolaatat.yml`, dokumentoitu 20–40 min z0–z7),
3. **`js/pallo.js` osoittamaan siihen → koodimuutos → julkaisu**,
4. vasta sitten `pyramidi.json` uuteen versioon.

Tehtävänanto kielsi versionoston (`ÄLÄ aja tools/uusi-versio.mjs`),
joten askelta 3 ei voinut tehdä — ja ilman sitä askel 4 rikkoo
julkaistun pelin. Sama päätös ja sama perustelu kuin
`viesti-fable-laattapolku-20260914.md` luvussa 7: **asiakas ensin
mainiin, sitten ajot.**

Kun syy osoittautui olemattomaksi (luvut 2–3), ajo olisi ollut tämä
hinta nollaa hyötyä vastaan. **Nostotason poltto on samassa asemassa:**
sen uusi nostoversio sammuttaisi kerroksen samalla vahdilla, joten
portin polttovelan purku odottaa samaa julkaisuketjua.

### 5.1 Jos erä kuitenkin ajetaan — tarkka järjestys ja kesto

| # | ajo | työnkulku ja syötteet | kesto (arvio) |
| --- | --- | --- | ---: |
| 1 | nostotaso | `generoi-pyramidi.yml` `tasot=vain-nostotaso`, `versio=2026-09-07a`, `nostoversio=2026-09-15-nostot`, **`vie_luettelo=false`** | ~10 min |
| 2 | pohja (jos halutaan z8:n rantaviiva pois) | `tasot=paikkaus`, `lahdeversio=2026-09-07a`, `versio=2026-09-15-ranta`, `alue=-5.2,41.3,9.6,51.1`, `vie_luettelo=false` | kopio ~93 000 objektia + 269 laattaa; **kopio on ajon hinta**, piirto ~2 min ajokoneella |
| 3 | pallon sarja | `tee-pallolaatat.yml` `nostot=kylla`, `tunniste=g` | 20–40 min |
| 4 | asiakas | `js/pallo.js` PALLO_LAATTAVERSIO + TUNNISTE, PR, merge, julkaisu | — |
| 5 | luettelo | sama työnkulku `vie_luettelo=true` (tai pelkkä luettelojobi) | ~2 min |

**Ranska on pilotti — muita maita ei ajettu eikä pidä ajaa** (Raamattu
PÄÄTÖKSET 9 kohta 1). Muiden maiden ajo ei ole maakohtainen: pohja on
globaali, joten "muut maat" tarkoittaa koko maailman pyramidia
(92 968 laattaa z0–z8, selvityksen arvio 4,9 h yhtenä prosessina,
sharditettuna ~1 h) — ja se kannattaa tehdä vasta, kun on syy.

## 6. Kolme vikaa työnkulussa, korjattu (`generoi-pyramidi.yml`)

Nämä löytyivät ajoa valmistellessa. Jokainen olisi purrut heti.

**6.1 Luettelojobi olisi pyyhkinyt 27 maan tasoituslaatastot.**
`yhdistaLuettelo` täydentää ajokansiossa olevaa vanhaa luetteloa,
mutta tämän työnkulun luettelojobi ei pohjustanut ajokansiota ämpärin
luettelolla lainkaan — `vanha` oli `null`, ja tuore luettelo ilman
`varitasot`-taulua olisi mennyt päälle. Seuraus olisi ollut juuri sama
hiljainen vika kuin `viesti-fable-laattapolku-20260914.md` luvussa 4:
ei 404:ää, ei virhettä, kerros vain poissa 27 maalta. `generoi-
varitaso.yml` tekee tämän askeleen; tässä se puuttui. **Lisätty.**

**6.2 Paikkaus ei olisi piirtänyt z8:aa.** Ajokomento oli
`aja "$ALIN-6" 3; aja "7" 1` — kirjoitettu kun pyramidi oli z0–z7.
Elävä pyramidi on z0–z8 (luettelo 14.9.2026), ja paikkauksen tasot
luetaan lähdeluettelosta (`0-8`), joten z8 olisi jäänyt piirtämättä ja
saanut KOPIOIDUT vanhat laatat — eli täsmälleen sen tason, jonka takia
paikkaus ajetaan. **Korjattu:** `aja "7-$YLIN" 1` (sama 1′-ruudukko
kelpaa molemmille).

**6.3 Paikkaus olisi hakenut koko maailman 1′-korkeuspalat.**
`--vain-palat`-lista ajettiin ilman `--alue`-rajausta, eli 612 palaa
ja 194 Mt jokaiseen paikkausajoon, vaikka piirto koskee yhtä laatikkoa.
**Korjattu:** paikkausajossa listaan annetaan sama `--alue` kuin
piirtoon.

**6.4 (uusi ominaisuus) `vie_luettelo`.** Laatat voi nyt viedä ämpäriin
JULKAISEMATTA niitä. Se on luvun 5.1 järjestyksen edellytys: uusi
versio odottaa valmiina, kunnes pallosarja ja asiakas ovat mainissa.
Oletus `true`, eli entinen käytös.

## 7. Sivuhavainnot

**7.1 Elävän pyramidin z8 kantaa poltetun rantaviivan, z0–z7 ei
(luku 2).** Peli piirtää rannan erikseen — rantataso
`2026-09-07a-ranta` ja pallon vektorirannikko (`js/pallovektorit.js`)
— joten **syvimmällä tasolla ranta on kahteen kertaan**. Tämä on
ainoa mittaamani asia, joka oikeasti muuttuisi uudelleenpoltossa, ja
se on luvun 5.1 taulukon rivi 2. Se on myös ehdokas omistajan
havainnon selitykseksi siltä osin kuin vika näkyy vain lähizoomilla.
**Ei korjattu tässä erässä**, koska korjaus on sama R2-ajo ja sama
julkaisuketju.

**7.2 Pelissä ei ole yhtään laatta-404:ää.** Mitattu Playwrightilla
(Chromium `/opt/pw-browsers/chromium`, laatat elävästä ämpäristä,
koodi tästä puusta), Ranskan saapumisnäkymä 390 × 844 ja 1400 × 900 +
zoomaus Bretagneen ja Girondeen: **pyramidin ja pallon laattojen
404-vastauksia 0**, molemmilla ruuduilla. Ainoa 404 on
`assets/varusteet/varuste-satelliitti.jpg` (4 pyyntöä) — repon oma
kuva puuttuu, ei liity laattoihin. **Tämä on oma havainto, jota ei
tässä selvitetty.**

**7.3 Saapumisnäkymän mitat** (mitattu): 390 × 844 näkyvä leveys
388,7 lautayksikköä (pov altitude 0,452), 1400 × 900 leveys 557,3
(altitude 0,186). Kamera osoittaa lat 46,35 lon 1,78.

## 8. Portit

```
npm test                    # pass 3359 · # fail 0 (# skipped 13, 3372 väitettä)
tarkista-kaksoisavaimet     ei kaksoisavaimia
tarkista-niputus            kunnossa: 387 moduulia, 4218 top-level-julistusta
tarkista-savukkeet          kunnossa: 1645 ui-viittausta, 405 metodia, 534 kenttää
```

## 9. Mitä EI tehty

Ei R2-vientiä, ei `pyramidi.json`-muutoksia, ei versionostoa, ei
muutoslokiriviä, ei Raamattu-kirjausta, ei mergeä, ei dist/:iä, ei
laattatiedostoja repoon, ei muiden maiden polttoa. `js/pallo.js`,
`js/pallolauta/*`, `js/kaupunkinosto.js` ja ääni-integraatio
koskemattomat.

## 10. Fablen päätettäväksi

1. **Kumotaanko selvityksen `viesti-fable-rantaviiva-20260914.md`
   luvut 3–4?** Sen johtopäätös ("pohja on poltettu vanhalla
   säännöllä") ei kestä tavuvertailua. Luvut 1–2 (lähteet, 0,03
   yksikön ero) pitävät paikkansa ja tukevat tätä mittausta.
2. **Mistä omistajan havainto sitten johtuu?** Kolme mittaamatonta
   ehdokasta, tässä järjestyksessä: (a) z8:n kaksinkertainen ranta
   (luku 7.1), (b) tasoituskerroksen kerma, joka peittää meren ja jättää
   punaisen rajan ainoaksi rannan merkiksi lähizoomilla, (c) kerroksen
   sammuminen versiovahdista jollakin hetkellä. Yksikään ei vaadi
   pohjan uudelleenpolttoa.
3. **Milloin nostotason polttovelka puretaan?** Koodi on valmis; ajo
   odottaa luvun 5.1 julkaisuketjua.
