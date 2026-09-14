# Tyhjän ensikehyksen diagnoosi (2026-09-14)

Tilaus: Fable — MITTAUSERÄ, ei korjauserä. Oire (rootin QA): pelin ensimmäinen
reload jää tyhjään kehykseen, toinen tavallinen reload avaa pelin normaalisti
samalla tallenteella. Havainnot 2026-09-14 n. 04:58 UTC (v1862) ja
2026-09-13 n. 22:58 UTC. Konsolissa vain tuttu sähkeosion `Failed to fetch`.

**Lyhyt vastaus:** rootin oiretta EI saatu toistumaan sellaisenaan, mutta
mittausten aikana löytyi mitattu ja varmennettu vika, joka selittää sen
lähtötilanteen: **palvelutyöntekijä ei ole asentunut kertaakaan v1673:n
(7.9.2026) jälkeen**, koska `sw.js`:n SHELL-listalla on sama osoite kahdesti
ja `Cache.addAll` hylkää koko asennuksen. Vika on korjattu tässä PR:ssä
(yksi rivi + testi + vastakoe). Lisäksi mitattiin, millainen ruutu syntyy,
kun käynnistys ei valmistu — se on tarkalleen rootin kuvaama tyhjä kehys.

Ympäristö: Chromium `/opt/pw-browsers/chromium-1194`, Playwright
`/opt/node22/lib/node_modules/playwright`, paikallinen staattinen palvelin
(`Cache-Control: max-age=600` kuten GitHub Pages). Ulkoiset isännät
(media.matkakirja.app, sähkeworker) katkaistiin `--host-resolver-rules`illa,
koska kontista ei ole ulospääsyä. Skriptit ovat raapustuskansiossa
(`/tmp/.../scratchpad`), eivät repossa.

---

## 1. Mitä mitattiin ja monessako ajossa

| # | Koe | Ajoja | Tulos |
|---|-----|-------|-------|
| 1 | Kylmäkäynnistys v1862 (tyhjä välimuisti, tyhjä SW, tyhjä localStorage) | 3 | peli rakentui joka kerta, ei pageerroria, ei tyhjää kehystä |
| 2 | v1861 asennettuna → palvelin vaihtuu v1862:een, tallenne laitteella | 2 | peli rakentui ensimmäisellä latauksella joka kerta, "Peli päivittyi" -ikkuna aukesi, toinen reload normaali. **Mittaus ei kata rootin tilannetta** — ks. kohta 2 |
| 3 | Palvelutyöntekijän asennuskoe ENNEN korjausta | 1 (150 s seurantaa) | rekisteröinti katosi, versiokorissa **0 avainta**, ei ohjainta |
| 4 | Sama JÄLKEEN korjauksen | 1 (155 s seurantaa) | rekisteröinti pysyi, versiokorissa **1252 avainta**, tila `active`, **ohjain käytössä** |
| 5 | `Cache.addAll` kaksoiskappaleella (vastakoe) | 1 | eri osoitteet: OK, 3 avainta · kaksoiskappale: **InvalidStateError** |
| 6 | Yksi moduuli jää saamatta (oireen allekirjoitus) | 1 | latausruutu 10 s, sitten **paljas tyhjä kehys**, ei yhtään pageerroria |
| 7 | Käynnistysaika vs. index.html:n 10 s varaventtiili | 4 + 2 | peli rakentui 1,0–1,8 s (nopea) ja 4,9–5,0 s (60 ms viive) — varaventtiiliin ei osuttu kertaakaan, ks. kohta 4 |
| 8 | Ydinäänen nouto, kun ämpäri ei vastaa | 1 | 12,5 s ennen hylkäystä — install odottaa sitä ilman katkoa, ks. kohta 8 |

---

## 2. Juurisyy, joka mitattiin: palvelutyöntekijä ei asennu lainkaan

### Havainto

`sw.js`:n SHELL-listalla oli sama osoite kahdesti:

- `sw.js:257` `'./js/linssit/ihmisen-matka-kertomus.js',`
- `sw.js:270` `'./js/linssit/ihmisen-matka-kertomus.js',`

Lista on 1253 riviä, 1252 eri osoitetta. `install` tekee
`cache.addAll(YDIN.map(...))` (`sw.js` install-käsittelijä), ja selaimen
`Cache.addAll` **hylkää koko erän**, jos samassa listassa on kaksi pyyntöä
samaan osoitteeseen. Mitattu Chromiumilla sanatarkasti:

```
koe-eri  → OK,       3 avainta
koe-dup  → HYLKÄSI,  InvalidStateError: Failed to execute 'addAll' on 'Cache':
                     Cache.addAll(): duplicate requests
                     (…/js/linssit/ihmisen-matka-kertomus.js)
```

Kun `addAll` hylkää, `install`-käsittelijän `event.waitUntil`-lupaus hylkää,
eikä ketjun viimeinen `.then(() => self.skipWaiting())` ehdi ajoon:
**työntekijä ei asennu eikä aktivoidu.** Ensiasennuksessa selain hylkää koko
rekisteröinnin.

### Suoritusjärjestys

1. `js/main.js:1224` rekisteröi `sw.js`:n `load`-tapahtumassa.
2. `sw.js` install: `caches.open(CACHE)` → kori syntyy (tyhjänä) →
   `cache.addAll(YDIN…)` → **InvalidStateError** → `waitUntil` hylkää.
3. `self.skipWaiting()` jää ajamatta, `activate` ei koskaan tule,
   `clients.claim()` ei koskaan tule → `controllerchange` ei koskaan laukea.
4. Ensiasennus: rekisteröinti poistetaan. Laite, jolla on vanha työntekijä
   (≤ v1672): vanha jää ohjaksiin pysyvästi.

### Mittaus ennen ja jälkeen (vastakoe numeroin)

Sama koe, sama palvelin, sama selain; ainoa ero on kaksoiskappaleen poisto.

```
ENNEN  (scratchpad/ennen-korjausta.txt)
  34s … 149s  {"rekisterointi":false,"tila":"-","ctrl":false,
               "korit":["matkakirja-2026-08-09.1862"],"koko":0}
  ONKO OHJAIN: false      (seurattu 150 s, tila ei muuttunut kertaakaan)

JÄLKEEN (scratchpad/jalkeen2.txt)
  34s  {"rekisterointi":true,"tila":"installing","ctrl":false,
        "korit":["matkakirja-2026-08-09.1862","matkakirja-aanet-v1"],"koko":1252}
  154s {"rekisterointi":true,"tila":"active","ctrl":true,
        "korit":[…,"matkakirja-pallolaatat-v1"],"koko":1252}
  ONKO OHJAIN: true
```

Versiokorin koko: **0 → 1252 avainta.** Ohjain: **ei → kyllä.**

### Milloin vika tuli

Kaksoiskappale ilmestyi **v1673:ssa** (`a33dbf50`, 7.9.2026, "Ihmisen matka
esitys ja tutkimus, kosketus, äänikytkimet", #2144). v1672:ssa rivi oli
kerran, v1671:ssä ei lainkaan. Eli **7.9.2026 alkaen yksikään julkaistu
versio ei ole saanut palvelutyöntekijää asennettua.**

### Mitä tämä tarkoittaa laitteella

- Laitteella, jolla EI ollut työntekijää (tai jolla valikon **Päivitä**-nappi
  on ajettu — se poistaa kaikki rekisteröinnit ja korit, `js/main.js:1023`),
  peliä ei enää aja mikään palvelutyöntekijä: joka lataus tulee suoraan
  verkosta, GitHub Pagesin `max-age`-välimuistin varassa. Offline ei toimi.
- Laitteella, jolla on ≤ v1672:n työntekijä, se on yhä ohjaksissa ja
  tarjoilee **oman vanhan korinsa** — "välimuisti ensin, päivitys taustalla"
  (`sw.js` fetch-käsittelijän viimeinen haara). Peli on silloin sekoitus:
  jokainen tiedosto vaihtuu uuteen vasta SEURAAVALLA latauksella, ja
  tiedosto, jota edellinen lataus ei pyytänyt, jää useamman version vanhaksi.

Jälkimmäinen on täsmälleen se "sekoitus vanhaa ja uutta", jota tehtävänanto
epäili. **Tätä yhteyttä rootin oireeseen EI ole mitattu** — ks. kohta 5.

---

## 3. Oireen allekirjoitus mitattiin: näin syntyy tyhjä kehys

`index.html` näyttää latausruudun heti (rivit 46–67). Ruudun poistaa joko
`js/main.js:1383` `paataPaivitysruutu()` — vasta kun peli on rakennettu —
tai varaventtiili `index.html:61-66`, joka piilottaa ruudun **10 sekunnin
kuluttua riippumatta siitä, onko peliä.**

Koe: yksi moduuli (`js/lehti.js`) jätettiin saamatta. Mitattu näkymä:

```
 3,4 s  {"body":"paivittyy","ruutuNakyy":true,  "board":0,"mk":"undefined"}
 6,9 s  {"body":"paivittyy","ruutuNakyy":true,  "board":0,"mk":"undefined"}
10,9 s  {"body":"",         "ruutuNakyy":false, "board":0,"mk":"undefined"}
16,9 s  {"body":"",         "ruutuNakyy":false, "board":0,"mk":"undefined"}
PAGEERROR: (ei yhtään)
konsoli: error: Failed to load resource: net::ERR_EMPTY_RESPONSE
```

Eli: kun `js/main.js`:n moduuliketju ei valmistu, peliä ei rakenneta,
`paataPaivitysruutu()` ei aja, ja varaventtiili paljastaa **tasan 10 sekunnin
kohdalla** rungon ilman peliä — tyhjän kehyksen. **Konsoliin ei tule yhtään
JS-poikkeusta**, vain yksi resurssirivi. Se sopii siihen, että root näki
konsolissa vain sähkeen varoituksen.

Sama seuraus tulee mistä tahansa syystä, joka estää `js/main.js`:n
moduulitason koodin valmistumisen ennen 10 s:aa: kadonnut moduuli, poikkeus
käynnistyksessä TAI pelkkä hitaus.

---

## 4. Käynnistysaika vs. varaventtiili

Mittari: init-skripti ottaa talteen hetken, jona `window.matkakirja`
kirjoitetaan (`js/main.js` `attach()`), ja hetken, jona `#paivitysruutu`
saa `hidden`-lipun. Peliä ei muutettu. Palvelutyöntekijä oli estetty, eli
tilanne on sama kuin laitteella, jolla työntekijää ei ole (ks. kohta 2).

| Viive per pyyntö | Ajoja | Peli rakennettu | Latausruutu pois | Paljas kehys |
|---|---|---|---|---|
| 0 ms (paikallinen palvelin) | 4 | 1,02 / 1,05 / 1,10 / 1,75 s | 1,32–2,06 s | 0/4 |
| 60 ms (hidas mobiiliyhteys) | 2 | 4,88 / 5,03 s | 5,19 / 5,33 s | 0/2 |

Kummassakaan ei osuttu varaventtiiliin. Mutta suhde on syytä panna merkille:
60 ms:n lisäviive per pyyntö siirsi käynnistyksen 1,0 sekunnista 4,9
sekuntiin — eli kylmä ensilataus on **noin 65 ms per viivemillisekunti**
herkkä yhteyden viiveelle, koska moduuliketju on syvä. Suoraviivainen
jatkaminen samasta suhteesta osuisi 10 sekuntiin noin 130 ms:n viiveellä,
mikä on tavallinen lukema heikossa mobiiliverkossa.

Tämä EI ole mittaustulos rootin laitteelta eikä todiste. Se on se, minkä
verran marginaalia varaventtiilillä on: sitä on, mutta ei paljon — ja
juuri siksi kohdan 9 Network-välilehti ratkaisee asian.

---

## 5. Sähkeen `Failed to fetch` — vain varoitus, ei kaatanut mitään

Tarkistettu lukemalla ja mittaamalla:

- `js/main.js:2088` kutsuu `kytkeSahke()` **vasta rivin 1383
  `paataPaivitysruutu()` jälkeen** — peli on jo rakennettu ja näkyvissä.
- `js/sahke.js:1366` `kytkeSahke()` käynnistää työn `void (async () => …)()`
  -lohkossa: mikään ei jää odottamaan sitä.
- Verkkokutsuilla on oma aikakatkaisu (`js/sahke.js:337-345`,
  `AbortController`), ja virhe niellään (`js/sahke.js:452-458`,
  `console.warn('Sähkelinja ei vastaa…')`).

Mittauksissa tämä varoitus näkyi joka ainoassa ajossa, myös niissä, joissa
peli avautui täysin normaalisti. **Sähke ei ole osa käynnistysketjua eikä
voi tuottaa tyhjää kehystä.** Epäily voidaan sulkea pois.

---

## 6. Korjaus tässä PR:ssä

Pieni ja varma, tehtävänannon rajoissa. Käynnistysketjuun (`js/main.js`,
`index.html`) ei koskettu lainkaan.

- **`sw.js`** — toinen `'./js/linssit/ihmisen-matka-kertomus.js'` poistettu
  (entinen rivi 257). Tiedosto on yhä SHELLissä alemmalla rivillä omine
  perusteluineen, joten offline-kuori ei muutu. Tilalle jäi kommentti,
  joka kertoo miksi rivi ei saa palata.
- **`tests/sw.test.mjs`** — uusi testi `SHELL-listalla ei ole
  kaksoiskappaleita`. Lukee vain SHELL-listan ja poistaa kommentit ensin,
  jotta perustelut eivät laukaise testiä.

### Vastakoe numeroin

```
node --test tests/sw.test.mjs
  kaksoiskappale paikallaan (nykyinen main):  # tests 18  # pass 17  # fail 1
  kaksoiskappale poistettu (tämä haara):      # tests 18  # pass 18  # fail 0
```

Selaimessa mitattu vastakoe on kohdassa 2 (versiokori 0 → 1252 avainta,
ohjain ei → kyllä).

### Portit

```
npm test                               # tests 3362  # pass 3349  # fail 0
node tools/tarkista-kaksoisavaimet.mjs ei kaksoisavaimia
node tools/tarkista-niputus.mjs        niputus kunnossa: 387 moduulia,
                                       4211 top-level-julistusta, ei törmäyksiä
node tools/tarkista-savukkeet.mjs      savukkeet kunnossa: 1604 ui-viittausta,
                                       404 metodia, 533 kenttää, 31 lehtitilan kenttää
grep -rn '^<<<<<<<' js css tests tools (tyhjä)
```

**Versiota EI nostettu** (tehtävänannon kielto). Korjaus tulee laitteille
vasta seuraavan versionoston ja julkaisun mukana.

---

## 7. Mitä korjaus tekee julkaisun jälkeen — Fablen syytä tietää

Ensimmäisellä latauksella korjatun version jälkeen laitteella tapahtuu
kerralla se, mikä on jäänyt tekemättä 7.9. alkaen:

1. Palvelutyöntekijä asentuu ja hakee 1252 tiedostoa (`cache: 'reload'`,
   siis selaimen HTTP-välimuistin ohi). Se on iso lataus kerran.
2. `skipWaiting` + `activate` siivoaa vanhat korit ja ottaa ohjat.
3. `clients.claim()` laukaisee `controllerchange`in, ja `js/main.js:1236`
   lataa sivun **kerran** uudelleen (minuutin sulku suojaa silmukalta).
   Pelaaja näkee siistin "Päivitetään, odota hetki…" -ruudun.

Tämä on suunniteltu käytös, mutta se on ollut poissa käytöstä viikon, joten
se näyttää julkaisun jälkeen "uudelta". Suositus: julkaise korjaus omana
versionaan, ei ison sisältöerän mukana, jotta mahdollinen jälkiseuraus on
helppo tunnistaa.

---

## 8. Sivuhavainto, jota EI korjattu tässä erässä

`sw.js` `esilataaYdinaanet()` noutaa 26 ydinääntä **ilman aikakatkaisua**, ja
`install` odottaa sitä (`await esilataaYdinaanet().catch(() => {})`). Jos
ämpärin isäntä on hidas tai tavoittamaton, asennus jää roikkumaan sen ajan,
vaikka versiokori olisi jo valmis. Mitattu tässä ympäristössä: yksi estetty
äänihaku kesti **12,5 s** ennen `TypeError: Failed to fetch` -hylkäystä, ja
asennus näkyi tilassa `installing` vielä 120 s sen jälkeen kun versiokori oli
jo täysi (1252/1252).

Ehdotus Fablelle: `AbortController` + esim. 5 s katko myös äänten
esilataukseen, jolloin asennus ei koskaan jää ämpärin varaan. Ei tehty tässä,
koska se ei kuulu tähän erään.

---

## 9. Mitä EI saatu selville — ja mitä rootin pitäisi ottaa talteen

Rootin tarkkaa oiretta ei saatu toistumaan: kaikissa 5 kylmä- ja
versionvaihtoajossa peli rakentui. Syy on nyt tiedossa: koe ei voinut
toistaa rootin lähtötilannetta, koska **palvelutyöntekijä ei asennu
kummassakaan versiossa** (v1861 ja v1862 sisältävät molemmat saman
kaksoiskappaleen). Rootin laitteella on siis joko

- **ei palvelutyöntekijää lainkaan** → joka lataus tulee verkosta, ja hidas
  ensilataus uuden version jälkeen osuu 10 s varaventtiiliin (kohta 4), tai
- **≤ v1672:n työntekijä** → peli tarjoillaan vanhasta korista, joka
  päivittyy tiedosto kerrallaan (kohta 2).

Kumpaakaan ei voi erottaa toisistaan ilman laitteelta otettua tietoa.
Seuraavalla kerralla, kun tyhjä kehys osuu kohdalle, tarvitaan kolme asiaa —
ne ratkaisevat kysymyksen lopullisesti:

1. **Palvelutyöntekijän tila.** Safari: Kehittäjä → Service Workers, tai
   konsoliin liitettynä:
   `navigator.serviceWorker.getRegistration().then(r => console.log(r, r && r.active && r.active.scriptURL))`
   ja `caches.keys().then(k => console.log(k))`.
   Tyhjä tulos = työntekijää ei ole; `matkakirja-…-1673` tai vanhempi kori =
   jumissa vanhassa.
2. **Konsoli KOKONAAN** tyhjästä kehyksestä, myös punaiset resurssirivit
   (`Failed to load resource`) — juuri ne erottavat "moduuli jäi saamatta"
   -tapauksen "käynnistys kestää yli 10 s" -tapauksesta.
3. **Network-välilehti**: onko latauksia yhä kesken siinä hetkessä, kun
   ruutu muuttuu tyhjäksi, ja kauanko `js/main.js` + sen tuonnit kestivät.
   Jos pyyntöjä on kesken, kyse on hitaudesta eikä virheestä.

Lisäksi hyödyllinen yhden rivin koe rootille: jos tyhjässä kehyksessä
konsoliin kirjoittaa `window.matkakirja`, vastaus `undefined` tarkoittaa,
ettei `js/main.js` ehtinyt tai päässyt loppuun; objekti tarkoittaa, että
peli rakennettiin mutta jäi näkymättömiin (silloin vika on eri paikassa).

---

## 10. Suositus Fablelle

1. **Yhdistä tämä PR ja julkaise se omana versionaan.** Kaksoiskappale on
   mitattu ja varmennettu vika, joka on pitänyt palvelutyöntekijän poissa
   käytöstä 7.9. alkaen — riippumatta siitä, selittääkö se rootin tyhjän
   kehyksen. Offline-tuki ja "Päivitä"-ketju eivät ole toimineet sillä
   välin lainkaan.
2. **Pidä tyhjä kehys yhä seurannassa.** Älä merkitse sitä korjatuksi tämän
   perusteella: yhteys on perusteltu mutta EI mitattu.
3. **Kohdan 9 kolme tietoa rootilta** seuraavasta havainnosta — sen jälkeen
   asia ratkeaa yhdellä lukemisella.
4. Harkittavaksi erikseen (ei tässä): varaventtiilin 10 s on lyhyt
   kylmälle ensilataukselle. Jos sitä nostetaan, se on oma päätöksensä ja
   oma eränsä — varaventtiili on turvaverkko, ja sen pidentäminen pidentää
   myös rikkinäisen käynnistyksen mustaa ruutua.
