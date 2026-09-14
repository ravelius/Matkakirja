# Viesti Fablelle: puhelimen saapumisnäkymä (kuvakaappaus 14.9.2026 klo 17.55 UTC)

Opus-työagentti, haara `claude/bold-ride-vow4ki-karttabugi`, pohja `origin/main` v1879.
Kaikki luvut on MITATTU Chromiumilla (`/opt/pw-browsers/chromium`), ei arvattu.
WebKitiä ei ole kontissa (`ls /opt/pw-browsers` → chromium, chromium-1194,
chromium_headless_shell-1194, ffmpeg-1011), joten Safari-ajoa ei voitu tehdä;
puhelin jäljiteltiin Playwrightin `devices['iPhone 14 Pro']` -kuvauksella
(390–393 × 844–852, dpr 3, isMobile, hasTouch, Safari-UA).

Ajossa Fogg on Pariisissa (`phase: 'action'`, sama tallenne kuin
`tools/savukkeet/savuke-era12.mjs`), ämpäri tarjoillaan välityspalvelimen läpi.

---

## 1. ZOOMI — omistajan kuva ON nykyinen main, ei vika kamerassa

**Toisto onnistui täydellisesti.** Kuva `docs/raportit/kuvat/karttabugi-saapuminen-390x844.jpg`
(390 × 844, dpr 1) näyttää täsmälleen saman rajauksen kuin omistajan kuvakaappaus:
Lontoo, Amsterdam, Madrid, Barcelona, Granada, Tanger ja Fès ruudulla, Ranska
noin kolme neljäsosaa ruudun leveydestä.

**Mitattu kameran korkeus saapumisajon jälkeen ja sen jälkeen:**

| hetki | korkeus (altitude) | näkyvä leveys (lautayks.) |
|---|---|---|
| t+1,5 s | 2,5 (oletus, ajo kesken) | — |
| t+5 s | 0,2427 / 0,4498 (ruudun mukaan) | 277,6 |
| t+10 s | sama | sama |
| t+20 s | sama | sama |
| t+40 s | sama | sama |

**Uloszoomausta ei tapahdu.** Korkeus on kehyksen tarkkuudella sama 5 s, 10 s,
20 s ja 40 s kohdalla. `controls().maxDistance` on samassa korkeudessa kuin
kamera (vara 0 %), eli ResizeObserverin mittapiikki, OrbitControlsin inertia,
kosketus-pinch, `visualViewport` ja saapumisketjun kilpajuoksu EIVÄT ole syy.
Myös tallenteesta palautus ajaa saapumisrajauksen: `js/ui.js:4315`
(`else void lauta.saavu()`) laukeaa uudelleenlatauksessa, ja mitattu korkeus on
sama kuin lennon jälkeen.

**Juurisyy on rajauksen geometria, ei ajo.** `savuke-era12` mittaa 390 × 844:

```
tyhjä X 1.08 % · Y 59.33 % → sitova X 1.08 %
```

Ranskan laatikko on pallon pinnalla noin 10,2° × 9,7° (suhde 1,05), ja puhelimen
kotelo on 373,6 × 775 px (kuvasuhde 0,482). Kun laatikko sovitetaan ruutuun
molempiin suuntiin, **X sitoo** ja pystysuunnasta jää 59 % tyhjäksi — ja se
tyhjä täyttyy naapurimailla (Britannia, Espanja, Marokko). Juuri se näyttää
"liian kaukaa zoomatulta". Erän 13 luku "tyhjä tila 1,08 %" on mitattu
SITOVALTA akselilta, joten vartija on vihreä samalla kun kuva on omistajan
mielestä väärä.

Maapaneelin osuus on pieni mutta mitattu: Ranskan laatikko on 489,8 × 406,3
lautayksikköä ja paneelin kanssa 518,9 × 406,3 — paneeli levittää laatikkoa
6 %, eli kamera on 6 % kauempana kuin pelkällä maalla.

**EN MUUTTANUT KAMERAA.** "Maa mahdollisimman isona" ja "rajaudu aivan rajojen
ulkopuolelle" eivät voi molemmat toteutua 2,08:1 ruudulla: joko pystyyn jää
60 % tyhjää (nykytila) tai Bretagne ja Elsass leikkautuvat pois. Tämä on
omistajan päätös, ei koodikorjaus. Vaihtoehdot mitattuina:

1. **Nykyinen** (sovita molempiin): Ranska 72–76 % ruudun leveydestä, 41 %
   korkeudesta.
2. **Sovita korkeuteen** (anna leveyden ylivuotaa): Ranska täyttäisi
   korkeuden, mutta laatikko olisi 138 % ruudun leveydestä — mitattu
   `osuusX 1,385` 393 × 852:lla — eli maan itä- ja länsireuna leikkautuisi.
3. **Välimuoto**: sitova akseli + sallittu ylivuoto esim. 15 %.

Odotan Fablen/omistajan valintaa ennen kuin kosken `kamera.js`:ään.

---

## 2. REPALEISET LAATAT — kaksi mitattua syytä

### 2.1 Väritason laattakerros nääntyy dpr 3:lla (pääsyy kuvassa)

Sama ajo, sama ruutu (390 × 844), 35 s lepoa, ainoa ero `deviceScaleFactor`:

| | dpr 1 | dpr 3 |
|---|---|---|
| laattoja | 24 | 30 |
| **valmiita** | **20** | **4** |
| scenessä | 19 | 0 |
| jonossa | 0 | 18 |
| purettuja | 24 | 48 |
| värillisiä | 20 | 4 |
| käytetyt tavut | 28,0 Mt | 5,6 Mt |

Yksikään laatta ei ollut 35 sekunnin jälkeen scenessä dpr 3:lla. Tavukatto
(`LAATTAKERROS_LAATTAKATTO_TAVUT` 96 Mt) ei ole rajoite — käytössä oli 5,6 Mt.
Ruudulla näkyy siis KESKEN oleva laattatila: osalla ruutua uusi tasoituslaatta,
osalla vanha, ja raja kulkee laatan reunaa pitkin. Juuri sitä omistaja kuvaa
sanoilla *"repaleiset kermaläiskät laattojen reunoilla"*.

Kuvat: `karttabugi-laatat-dpr1.jpg` (puhdas) ja `karttabugi-laatat-dpr3.jpg`
(harmaa meri ja Atlaksen rinteet läiskinä Välimerellä ja Marokossa).

**HUOM VARAUS:** kontin Chromium piirtää ohjelmistolla (SwiftShader), joten
dpr 3 tarkoittaa 1170 × 2532 piirtopuskuria ilman näytönohjainta. Oikealla
iPhonella on GPU, joten nääntymisen MÄÄRÄ on varmasti pienempi kuin täällä —
mutta suunta on sama ja se on mitattu. Tämä ei ole poltettu alfa eikä
tekstuurin suodatus: kaikki 72 laattapyyntöä (pohja, nostot, `vari/FRA`, z5)
palasivat 200:lla, yksikään ei ollut 404.

### 2.2 Tasoituksen kermanaamio on auki, kunnes maapolygonit saapuvat (korjattu)

`js/laattapyramidi.js pyramidinTasoitus()` palauttaa suojan, joka ennen
`assets/data/maapolygonit.json`:in saapumista on **koko laataston laatikko**
(`tarkka: false`). `js/pallolaatat.js` piirtää silloin laatan oman kuvan
sellaisenaan koko laatikkoon — Ranskan laatasto kattaa lon −11,8…16,2 ja
lat 30,7…59,8, eli myös Britannian, Espanjan, Välimeren ja Marokon. Tulos on
harmaa meri ja vieras maasto seepian päällä, ja se katkeaa laatan reunaan
(`karttabugi-tasoitus-karkea-suoja.jpg`).

Kun polygonit saapuvat, suoja tarkentuu Ranskan renkaiden laatikoksi
(mitattu 35 s kohdalla: `avain "FRA|T|5662|1343|490|406"`, `tarkka: true`) ja
laatat mitätöityvät — mutta hitaalla laitteella uudelleenpiirto ei ehdi
valmiiksi, ja väärä kuva jää ruudulle. Kohdat 2.1 ja 2.2 siis ruokkivat
toisiaan.

**Korjaus (pienin mahdollinen, `js/pallolaatat.js`, 1 ehtorivi + perustelu):**
väritaso jätetään kokonaan pois niin kauan kuin suoja on karkea. Kartta on sen
hetken täsmälleen se seepiakartta, joka se oli ennen tasoituskerrosta — ei
koskaan väärä kuva. Suojan tarkentuessa `tasoitus.avain` vaihtuu (L → T) ja
kerros mitätöi laattansa itse (`MAANVAIHTO MITÄTÖI LAATAT`, sama koodi kuin
ennen).

**Vastakoe** (sama ajo, palvelin tarjoilee ehdon aina tosena = entinen
käytös), mitattu keskiväri ja hajonta Välimeren yltä (klippi 170,625 200×85):

| | keskiväri | hajonta |
|---|---|---|
| ilman korjausta, dpr 3 | 204,4 / 193,0 / 166,0 | **25,6** |
| korjattu, dpr 3 | 204,7 / 198,2 / 177,1 | **11,6** |

Hajonta puolittuu: läiskäisyys vähenee. VAKIINTUNEESSA tilassa korjaus on
NOLLAMUUTOS — mitattu molemmilla dpr:illä 35 s kohdalla, että suoja on silloin
jo `tarkka: true`, jolloin ehto päästää maalauksen läpi kuten ennenkin.
`savuke-era12` (11/11) ajettiin korjauksen jälkeen uudestaan: läpi.

**En polttanut mitään enkä vienyt ämpäriin.** Jos tasoituslaattoihin halutaan
lisää varmuutta, generaattorin puolella (`tools/fokuskartta/piirto.js`,
`tools/generoi-laattapyramidi.mjs` tasoitusajo) voisi polttaa kerman myös
laataston reunavyöhykkeeseen, jolloin asiakasmaalaus olisi vain varmistus —
mutta se on oma eränsä ja vaatii omistajan luvan.

---

## 3. PARIISIN NIMI — kirjattu, ei korjattu (nimikyltti-agentin alue)

Pariisin nimi puuttuu myös omassa toistossani (kuvat 1 ja 2), vaikka muiden
maiden kaupungit näkyvät. Syy on `js/pallolauta/nimet.js` `lado()`: pelimerkkien
laatikot tulevat ladontaan `pinot`-varauksina, ja nappula seisoo täsmälleen
Pariisin pisteen päällä. Kaupunki on ehdokkaiden kärjessä
(`OMAN_KAUPUNGIN_TARKEYS`), mutta `ladoRuutunimet` ei löydä sille laatikkoa,
joka ei osuisi nappulaan — nimi putoaa. Sama ajo näyttää sen sijaan
"Turisti-info", "Chambordin linna", "Millaun silta" ja "Avignon".
Lukitus v2440 ei ole mainissa. Syy ei ole kamerassa eikä laatoissa, joten en
koskenut siihen.

---

## 4. Portit

| portti | tulos |
|---|---|
| `npm test` | 3348 pass / 1 fail / 13 skip (ensimmäinen ajo); **toinen ajo exit 0, ei yhtään `not ok`** → yksittäinen flaky, ei toistu |
| `tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |
| `tools/tarkista-niputus.mjs` | 387 moduulia, 4221 julistusta, ei törmäyksiä |
| `tools/tarkista-savukkeet.mjs` | 1651 ui-viittausta, 405 metodia, 534 kenttää — kunnossa |
| `tools/savukkeet/savuke-era12.mjs` | 11/11 vartiota läpi (korjauksen jälkeen) |
| `savuke-tasoitus-pallo`, `savuke-varilaatat-pallo`, `savuke-laattapyramidi` | OHITUS (pilottilaatastoa ei ole kontissa / vanha kartta pois) |

## 5. Koordinointi

Muutos osuu `js/pallolaatat.js`:ään, jonka siirtymämittauksen agentti (pallolaatat
UV) voi myös avata. Muutos on YKSI ehtorivi funktion `luoLaattakerros`
laatanvalmistelussa (`if (tasoitus.suoja?.tarkka)`) plus kommentti; se ei koske
UV:hen, verkkoon, tekstuuriin eikä tason valintaan. Muita agenttien tiedostoja
(`nimet.js`, `maapaneeli.js`, css:n rajaväri, fokusvirta, pollo) ei koskettu.
