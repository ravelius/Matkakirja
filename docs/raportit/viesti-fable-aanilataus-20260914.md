# Äänten esilataus ei enää jumita käynnistystä (2026-09-14)

Tilaus: Fable — KÄYNNISTYSERÄ. Jatkoa diagnoosierälle
(`docs/raportit/viesti-fable-ensikehys-20260914.md`, kohta 8: sivuhavainto,
jota ei korjattu). Tehtävä oli mitata, korjata ja osoittaa numeroin.

**Lyhyt vastaus Fablelle:**

1. **Fablen hypoteesi EI pidä paikkaansa.** Äänten esilataus EI viivytä pelin
   piirtymistä sekuntiakaan eikä voi laukaista index.html:n 10 sekunnin
   varaventtiiliä. Mitattu: estetyillä äänihauilla peli tuli näkyviin
   **1,17–1,94 s** ja toimivilla äänillä **1,16 s** — ero on mittauskohinaa.
   Syy on rakenteellinen, ei ajoituksellinen: `esilataaYdinaanet()` ajetaan
   PALVELUTYÖNTEKIJÄN asennuksessa, ja asennus alkaa vasta sivun
   `load`-tapahtumasta (`js/main.js:1224`), siis vasta kun peli on jo
   rakennettu ja maalattu (`js/main.js:1383`). Rootin tyhjän kehyksen
   juurisyytä tämä ei siis selitä.
2. **Mutta mitattu vika on todellinen ja isompi kuin luultiin.** Kun ämpäri
   ei vastaa, **palvelutyöntekijä ei asennu koskaan**: tila jäi arvoon
   `installing` vielä 89,7 s kohdalla, vaikka versiokori oli ollut täysi
   (1252/1252) jo 51,8 s kohdalla. Seuraus on täsmälleen sama kuin
   edellisen erän kaksoiskappaleessa: `skipWaiting()` jää ajamatta,
   offline-tuki ja koko päivitysketju jäävät syntymättä.
3. **Ja tässä muodossa sääntö "ääni ei saa estää käynnistystä" rikkoutui
   mitattavasti**: verkon katkettua asennusyrityksen jälkeen peli ei
   käynnistynyt LAINKAAN (`net::ERR_INTERNET_DISCONNECTED`, kuva
   `aanilataus-ennen-offline.png`). Korjauksen jälkeen sama koe:
   **peli näkyvissä 1,7–2,0 s** (kuva `aanilataus-jalkeen-offline.png`).

Ympäristö: Chromium `/opt/pw-browsers/chromium-1194`, Playwright 1.56.1,
paikallinen staattinen palvelin (`Cache-Control: max-age=600` kuten GitHub
Pages). `media.matkakirja.app` ohjattiin Chromiumin
`--host-resolver-rules`illa omaan palvelimeen, jonka käytös oli kokeen
muuttuja. Mittausskriptit ovat raapustuskansiossa, savuke repossa.

**Huomio edellisen erän lukuun 12,5 s:** se ei ollut ämpärin oma
aikakatkaisu vaan **konttiympäristön agenttivälityspalvelimen** aika —
Chromium lukee `https_proxy`-ympäristömuuttujan, ja pyyntö kulki sitä
kautta. Tämän erän ajoissa välityspalvelin on suljettu
(`--no-proxy-server`), ja silloin estetty ämpäri ei tuota 12,5 sekunnin
odotusta vaan **loputtoman** odotuksen. Oikea luku ei siis ole 12,5 s vaan
"ei koskaan" — vika on siis pahempi kuin diagnoosiraportissa arvioitiin.

---

## 1. Mitattu nykytila ENNEN korjausta

Mittarit: `window.matkakirja`-kirjoitushetki (peli rakennettu), `#paivitysruutu`
`hidden`-hetki (latausruutu väistyy), palvelutyöntekijän tila, versiokorin ja
äänikorin avainmäärät. Peliä ei muutettu mittausta varten.

| Äänihaku | Peli näkyvissä | Latausruutu pois | Varaventtiili | SW aktivoitui | Äänikorissa |
|---|---|---|---|---|---|
| Ämpäri vastaa heti | **1,62 s** | 1,93 s | ei | 7,98 s | 26/26 |
| **Ämpäri ei vastaa** (TCP auki, ei vastausta) | **1,57 s** | 1,89 s | ei | **ei koskaan** (90 s seurantaa) | 0/26 |

Sama ajo, offline-koe heti asennusyrityksen jälkeen:

```
ENNEN, äänihaut estetty, verkko poikki:
  page.goto → Error: net::ERR_INTERNET_DISCONNECTED
  peli näkyvissä: – (ei käynnistynyt lainkaan)
```

Eli: **varaventtiili ei laukennut kertaakaan, eikä tyhjää kehystä syntynyt
verkossa.** Tyhjä kehys syntyi vain offline — ja silloin ei syntynyt edes
kehystä, vaan selaimen oma virhesivu.

### Miksi hypoteesi kaatui — suoritusjärjestys

1. `js/main.js` moduulitaso rakentaa pelin ja kutsuu `paataPaivitysruutu()`
   (`js/main.js:1383`). Latausruutu väistyy tässä, mitattu 1,5–2,3 s.
2. Vasta kaiken alisisällön jälkeen laukeaa `load`, ja sen kuuntelija
   rekisteröi palvelutyöntekijän (`js/main.js:1224-1227`).
3. `sw.js` install: `cache.addAll(YDIN…)` → MEDIA → **`esilataaYdinaanet()`** →
   `self.skipWaiting()`.

Kohta 3 on kokonaan kohdan 1 jälkeen. Äänten esilataus ei siis voi viivyttää
ensipiirtoa millään verkolla. Hypoteesin kaksi lukua (12,5 s ja 10,9 s)
sopivat yhteen numeroina, mutta ne ovat eri ketjuista.

---

## 2. Korjaus: aikakatkaisu, joka perustuu mitattuun lukuun

**Valittu tekniikka:** aikakatkaisu esilataukseen, ei irrotusta
käynnistysketjusta. Perustelu:

- **Irrottaminen `activate`en olisi ollut huonompi.** `activate`-tapahtuman
  `waitUntil` viivyttää palvelutyöntekijän hallitsemien sivujen
  fetch-tapahtumia — silloin hidas ämpäri olisi alkanut viivyttää oikeasti
  myös pelin latausta. Nykyinen `activate` (`sw.js:2008`) on tarkoituksella
  nopea.
- **Täysin irrallinen (odottamaton) lupaus katkeaisi**: selain saa lopettaa
  työntekijän heti, kun `install`in `waitUntil` on ratkennut, jolloin puolet
  äänistä jäisi satunnaisesti hakematta. Se rikkoisi ehdon "jos ääni ehtii
  latautua, sen pitää toimia täsmälleen kuten ennen".
- **Aikakatkaisu säilyttää nykyisen käytöksen kokonaan** siinä tapauksessa,
  joka on normaali (ämpäri vastaa), ja rajaa pahimman tapauksen.

Katko on kaksinkertainen tarkoituksella: yhteinen `AbortController`
katkaisee kesken olevat noudot (jumittunut soketti todella vapautuu), ja
uloin `Promise.race` kattaa senkin tapauksen, että jumi ei ole `fetch`issä
vaan koriin pääsyssä (`caches.open`, kiintiöpaine) — sinne `AbortController`
ei yllä.

### Aikakatkaisun pituus — mitattu, ei arvattu

Sama koe, muuttujana ämpärin vastausviive (26 ääntä, ~1,3 Mt):

| Vastausviive | Ääniä korissa | Esilatauksen kesto | SW aktivoitui |
|---|---|---|---|
| 0 ms | **26/26** | **0,43 s** | 7,98 s |
| 800 ms | 21/26 | 5,96 s (katko) | 17,18 s |
| 1500 ms | 9/26 | 6,41 s (katko) | 25,17 s |
| 4000 ms | 3/26 | 6,05 s (katko) | 33,44 s |
| ei vastausta | 0/26 | 6,00 / 6,12 / 6,29 / 6,40 s (katko, 4 ajoa) | 56,9–58,7 s |

**Valittu katko 6 000 ms** = noin 14× mitattu normaaliaika 0,43 s. Toimiva
ämpäri ehtii siis aina, eikä yksikään normaalitilanne muutu. Tärkein sarake
on viimeinen: asennus valmistuu jokaisessa tilanteessa, kun ennen se ei
valmistunut ollenkaan.

*(Mittauspalvelin on HTTP/1.1, jolloin Chromium pitää yhtä isäntää kohti
kuusi yhteyttä ja 26 ääntä jonottaa viidessä erässä. Oikea ämpäri on HTTP/2,
joten hitaan yhteyden sarakkeet "ääniä korissa" ovat pessimistisiä. Katkon
kesto — se, mitä tässä perustellaan — ei riipu siitä.)*

### Muutoksen kohdat

- **`sw.js:1624-1652`** — uusi vakio `AANI_ESILATAUS_KATKO_MS` ja sen
  perustelu mittaustaulukkona.
- **`sw.js:1653`** — `const AANI_ESILATAUS_KATKO_MS = 6000;`
- **`sw.js:1673-1692`** — `esilataaYdinaanet(katkoMs = AANI_ESILATAUS_KATKO_MS)`:
  yhteinen `AbortController`, `signal` jokaiseen `fetch`iin, uloin
  `Promise.race`. Nouto, korin nimi ja virheiden nielaisu ennallaan.
- **`sw.js:1710-1713`** — install-käsittelijän kommentti kertoo, miksi
  katko on olemassa. Kutsu itse on ennallaan (`await esilataaYdinaanet().catch(…)`).

**ÄÄNI-HOLD noudatettu:** yhtään äänitiedostoa, äänen sisältöä tai äänten
valintaa ei muutettu. `YDINAANET`-lista on rivi riviltä sama. Ei
generointia, ei uusia ääniä, ei alignmentia.

---

## 3. Mitattu tila JÄLKEEN korjauksen — sama koe

| Äänihaku | Peli näkyvissä | Latausruutu pois | Varaventtiili | SW aktivoitui | Esilataus | Offline-käynnistys |
|---|---|---|---|---|---|---|
| Ämpäri vastaa heti | 1,16 s | 1,51 s | ei | 5,95 s | 0,0 s | **1,41 s** |
| Ämpäri ei vastaa (ajo 1) | 0,98 s | 1,28 s | ei | **58,39 s** | 6,29 s | 10,03 s* |
| Ämpäri ei vastaa (ajo 2) | 1,71 s | 2,04 s | ei | **58,66 s** | 6,12 s | **2,00 s** |
| Ämpäri ei vastaa (ajo 3) | 1,94 s | 2,26 s | ei | **58,31 s** | 6,40 s | **1,71 s** |
| Ämpäri ei vastaa (ajo 4) | 1,17 s | 1,47 s | ei | **56,93 s** | 6,00 s | **1,88 s** |

\* Ajossa 1 offline-lataus osui varaventtiiliin 10,0 s kohdalla ilman peliä —
sama tyhjä kehys. Se tapahtui heti aktivoitumisen jälkeen, eli ennen kuin
`clients.claim()` ehti ottaa uuden sivun haltuunsa. Kolmessa muussa ajossa ja
savukkeen kahdessa ajossa offline-käynnistys onnistui 1,7–2,0 sekunnissa.
**Tämä on avoin jäännösriski**, ei tämän erän korjaama asia — kirjaan sen
kohtaan 6 eikä sitä yritetä paikata tässä.

Vertailu suoraan ENNEN/JÄLKEEN, sama koe (äänihaut estetty):

```
ENNEN   SW-tila 90 s kuluttua: "installing"   offline: ei käynnisty (ERR_INTERNET_DISCONNECTED)
JÄLKEEN SW-tila 58 s kuluttua: "activated"    offline: peli näkyvissä 1,7–2,0 s
```

Sekunteina: asennus **∞ → 56,9–58,7 s**, esilataus **∞ → 6,0–6,4 s**,
offline-käynnistys **ei koskaan → 1,7–2,0 s**. Ensipiirto verkossa ei
muuttunut (1,0–1,9 s molemmissa) — eikä sen pitänytkään, koska hypoteesi
kaatui.

---

## 4. Portti: testi, joka mittaa säännön

Laajennettu olemassa olevaa `tests/sw.test.mjs`:ää (ei uutta tiedostoa).
Uudet testit ajavat sw.js:n OIKEAN install-käsittelijän hiekkalaatikossa
(`node:vm`) niin, että jokainen äänihaku jää roikkumaan ikuisesti. Katkon
vakio korvataan lähteestä lyhyeksi (200 ms), jotta portti ei odota kuutta
sekuntia — mitattava sääntö on "palaa katkon kuluessa".

- `tests/sw.test.mjs:620` `lataaSw()` — hiekkalaatikko (kori-, fetch- ja
  `Request`-tyngät; `Request` on tynkä, koska sw.js rakentaa suhteellisia
  osoitteita, joita Noden oikea `Request` ei jäsennä).
- `tests/sw.test.mjs:681` aikakatkaisu on kirjattu ja mitatulla alueella.
- `tests/sw.test.mjs:691` esilataus palaa, vaikka yksikään haku ei vastaisi —
  ja jokainen nouto sai keskeytyssignaalin, joka todella laukesi.
- `tests/sw.test.mjs:704` **asennus valmistuu ja `skipWaiting` ajetaan**,
  vaikka äänihaut jumittaisivat. Tämä on erän sääntö.
- `tests/sw.test.mjs:716` kun ämpäri vastaa, koko ydinsetti (26/26) päätyy
  äänikoriin kuten ennenkin — eli ehto "ääni toimii täsmälleen kuten ennen".

### Vastakoe numeroin (korjaus palautettuna)

```
node --test tests/sw.test.mjs
  korjaus paikallaan (tämä haara):  # tests 22  # pass 22  # fail 0  # cancelled 0
  korjaus palautettu (nykyinen main): # tests 22  # pass 17  # fail 2  # cancelled 3

  kaatuneet/keskeytyneet ilman korjausta:
    not ok 17 - ydinsetti esiladataan ämpäristä eikä repon polusta
    not ok 19 - äänten esilatauksen aikakatkaisu on kirjattu ja järkevä
    not ok 20 - esilataus palaa vaikka yksikään äänihaku ei koskaan vastaisi
    not ok 21 - asennus valmistuu ja skipWaiting ajetaan, vaikka äänihaut jumittaisivat
    not ok 22 - kun ämpäri vastaa, koko ydinsetti päätyy äänikoriin kuten ennenkin
```

Testit 20–22 eivät kaadu vaan **jäävät roikkumaan ja keskeytyvät** — juuri
se on vian koneellinen allekirjoitus: ilman katkoa `install` ei palaa.

---

## 5. Portti: savuke (ENNEN ja JÄLKEEN, oikea selain)

`tools/savukkeet/savuke-aanilataus.mjs` — ohjaa `media.matkakirja.app`
palvelimeen, joka **ottaa TCP-yhteyden vastaan muttei vastaa koskaan**
(estetyn ämpärin pahin muoto: ei virhettä, vain hiljaisuus). Muu media
(kuvat) vastaa 404:llä tarkoituksella, jotta savuke mittaa ääntä eikä kuvia.

```
node tools/savukkeet/savuke-aanilataus.mjs --nimio=jalkeen
```

| Vartio | ENNEN (main) | JÄLKEEN |
|---|---|---|
| peli tulee näkyviin vaikka äänihaut jumittavat | OK | OK |
| tyhjää kehystä ei synny | OK | OK |
| **palvelutyöntekijä aktivoituu** | **FAIL** (tila jäi `installing`) | **OK** |
| äänikoriin ei jäänyt vajaita ääniä | OK | OK |
| ei kaatavaa poikkeusta | OK | OK |
| **peli käynnistyy offline asennuksen jälkeen** | **FAIL** (`ERR_INTERNET_DISCONNECTED`) | **OK** |
| **Yhteensä** | **4/6** | **6/6** |

Kuvat:

- `docs/raportit/kuvat/aanilataus-ennen-kaynnistys.png` — peli auki verkossa
  (ensipiirto on sama ennen ja jälkeen; tämä kuva todistaa, ettei hypoteesi
  pidä paikkaansa).
- `docs/raportit/kuvat/aanilataus-ennen-offline.png` — **selaimen "No
  internet" -virhesivu**: ilman korjausta peli ei käynnisty offline lainkaan.
- `docs/raportit/kuvat/aanilataus-jalkeen-kaynnistys.png`
- `docs/raportit/kuvat/aanilataus-jalkeen-offline.png` — **pelin aloitusnäkymä
  offline**, äänikori tyhjänä.

---

## 6. Mitä EI tehty — ja mitä Fablen kannattaa tietää

1. **Rootin tyhjää kehystä tämä erä EI selitä eikä korjaa.** Hypoteesi
   testattiin ja kumoutui. Diagnoosiraportin kohdan 9 kolme tietoa rootilta
   ovat yhä ainoa tapa ratkaista asia.
2. **Varaventtiilin 10 s jätettiin koskematta** (ei tässä erässä, eikä sitä
   pyydetty).
3. **Sivuhavainto, jota ei korjattu — sivun `load` viivästyy estyneestä
   mediasta.** Kun `media.matkakirja.app` ei vastaa, PELIN OMAT kuvapyynnöt
   samaan isäntään jäävät roikkumaan, ja `load` laukesi vasta **46,3–47,1 s**
   kohdalla (mitattu, 4 ajoa). Koska palvelutyöntekijä rekisteröidään juuri
   `load`issa (`js/main.js:1224`), koko offline-tuki viivästyy saman verran.
   Peli itse on jo näkyvissä 1–2 s kohdalla, joten pelaaja ei näe tätä — mutta
   se on toinen kohta, jossa ämpärin este siirtyy pelin ketjuun. **Ei korjattu:
   se on eri ketju ja eri tiedosto (`js/main.js`), eikä kuulunut tähän erään.**
4. **Jäännösriski: offline-lataus heti aktivoitumisen jälkeen.** Yhdessä
   kuudesta jälkeen-ajosta offline-lataus osui varaventtiiliin 10,0 s kohdalla
   ilman peliä. Se tapahtui sekunnin sisällä `activate`sta, eli ennen kuin
   `clients.claim()` oli ottanut sivun haltuunsa. Viidessä muussa ajossa
   käynnistys onnistui 1,4–2,0 s. Tämä on kapea aikaikkuna heti asennuksen
   jälkeen eikä tavallinen pelaajan tilanne, mutta se on mitattu ja se on
   kirjattava. Ei korjattu tässä.
5. **Versiota EI nostettu** (tehtävänannon kielto). Fable versioi ja julkaisee.
6. Ääniin, äänitiedostoihin ja äänten valintaan ei koskettu lainkaan.
   Kiellettyihin tiedostoihin (`js/pallolauta/maapaneeli.js`, `css/styles.css`,
   maan rajan piirtokoodi, `js/ui.js` `matkareittienValinta`) ei koskettu.

---

## 7. Portit

```
npm test                               # tests 3366  # pass 3353  # fail 0  # skipped 13
node tools/tarkista-kaksoisavaimet.mjs ei kaksoisavaimia
node tools/tarkista-niputus.mjs        niputus kunnossa: 387 moduulia,
                                       4211 top-level-julistusta, ei törmäyksiä
node tools/tarkista-savukkeet.mjs      savukkeet kunnossa: 1604 ui-viittausta,
                                       404 metodia, 533 kenttää, 31 lehtitilan kenttää
grep -rn '^<<<<<<<' js css tests tools (tyhjä)
node tools/savukkeet/savuke-aanilataus.mjs --nimio=jalkeen   6/6 vartiota läpi
```

Muutetut tiedostot: `sw.js`, `tests/sw.test.mjs`,
`tools/savukkeet/savuke-aanilataus.mjs` (uusi),
`docs/raportit/kuvat/aanilataus-*.png` (4 kuvaa), tämä raportti.
