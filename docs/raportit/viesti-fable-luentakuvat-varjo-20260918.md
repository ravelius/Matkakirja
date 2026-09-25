# Viesti Fablelle: kuvan varjo pois kuvatekstistä, Ohita pysäyttää myös pulun

**Opus-agentti, 18.9.2026 klo 7.20 Suomen aikaa**
Haara `claude/bold-ride-vow4ki-luentakuvat-varjo` (origin/mainin päältä).
Raamattu: KARTTAUUDISTUKSEN PAATOKSET 35 + TARKENNUS 2 kohdat 5–6.
**Vaatii versionoston** (uusi-versio.mjs jätetty ajamatta ohjeen mukaan).

## 5. Varjo pois kuvatekstin paperilta

**Juurisyy:** varjo oli KUVAN oma (`.fokusvirta-isokuva-kuva`,
`box-shadow: 0 10px 26px`). Kuva on paperin päällä (z-index 1 vs. 0), joten
sen alaspäin (10 px, sumennus 26 px) valuva varjo maalautui suoraan paperin
yläreunaan — omistajan iPhone-kuvassa näkyvä tumma kaista. Paperilla oli
lisäksi oma samanlainen varjo, eli varjoja oli kaksi.

**Korjaus (`css/fokusvirta.css`):** varjo on nyt KOKO KORTIN varjo —
`.fokusvirta-isokuva-kotelo` (kuva + paperi yhtenä laatikkona) saa
`box-shadow: 0 10px 26px rgba(20,14,6,0.45)` ja `border-radius: 3px`, ja
sekä kuvan että paperin omat varjot poistettiin. Ulkovarjo ei maalaudu oman
laatikkonsa sisälle, joten paperille ei voi langeta mitään: valokuva ja
siihen liimattu arkki heittävät yhden varjon, kuten yksi esine heittää.
Korjaus ei ole pehmuste, peitto eikä varjon siirto sivuun.

**Pinotut kuvat:** takana olevan kortin varjo ei myöskään yllä paperille.
Jokainen pakan ruutu on oma pinonsa (`transform`), ja etummainen kortti on
DOM-järjestyksessä viimeinen — se maalautuu kokonaan takimmaisen päälle,
ja paperi on läpinäkymätön. Mitattu kahden kortin pakalla.

## 6. Ohita lopettaa myös pulun luennan

**Juurisyy mitattuna, ei arvattuna:** Ohita pysäytti vain isoisän luennan
(`stopDiaryVoice`). Pulun oma kommentti ei ole luenta vaan puheenvuoro,
joka ODOTTAA LUENNAN LOPPUA (`js/fokusvirta.js fokusvirtaSaapumiskupla` →
`kommenttiLuennanJalkeen` → `luennanLoppuun(ui)`). `stopDiaryVoice` nollaa
`ui.diaryVoicen`, ja odotus lukee juuri sen "luenta loppui" -merkiksi:
Ohita itse laukaisi pulun puheenvuoron, joka alkoi ~0,9 s myöhemmin.
`ui.luennanOhitus`-lippu ei estänyt sitä, koska lippua kysyttiin vain
isokuvapäällyksen avauksessa (`avaaIsokuvaPaallys`) — ei puheketjussa.
Sama koski välihuutoa (`fokusvirtaHuudahdus`), jonka oma ajastin jäi käymään.

**Korjaus (`js/fokusvirta.js`):**

1. `ohitaSaapumisluenta` nostaa lipun ENNEN pysäytystä ja kutsuu
   `vaiennaLivianKaupunkipuhe(ui)` — kaupungista lähdön oma polku, joka
   tyhjentää kaikki pulun kaupunkiajastimet (saapumiskupla, välihuuto,
   kuplasarja, korttisarja, vinkki) ja pysäyttää soivan repliikin
   (`pysaytaLivianAani`). Uutta rinnakkaista pysäytystä ei syntynyt.
2. Uusi yhden rivin kysely `luentaOhitettu(ui, city)` (lippu = kaupungin
   tunnus) vartioi ketjun jokaista askelta: `kommenttiLuennanJalkeen`,
   lupauksen `then`, `odotaPaljastus`, `nayta`, välihuudon `kaynnista` ja
   `nayta` sekä `naytaPulunKuvapakka`. Pelkkä ajastimien tyhjennys ei
   riittänyt, koska ketju roikkuu LUPAUKSESSA, joka täyttyy vasta
   pysäytyksen jälkeen ja asettaa uuden ajastimen tyhjennetyn tilalle.

Ohita on nyt yksi pysäytys: isoisän luenta, pulun luentareaktiot, pulun
kommentti ja välihuuto (myös myöhemmin ajastetut), isot kuvat, pakka ja
laitteen lukija. Matkakirjakorttiin ei kosketa — tekstit jäävät luettaviksi.

## Mittaus

`tools/savukkeet/mittaa-luentakuvat.mjs` (laajennettu), 390 × 844, Pariisin
saapuminen, verkoton ajo. **27/27 vartiota läpi**, yksi ajo.

| Mitta | Luku |
| --- | --- |
| Kortteja pakassa mittaushetkellä | 2 |
| Paperin pahin pikselipoikkeama kuvan alla (69 pistettä) | **0** (raja ±6) |
| Vastakoe: vanha varjo kuvassa, sama kaista | **71** (mittari näkee varjon) |
| Kuvan leveys / pienennys (ennen–jälkeen samassa ajossa) | 288 px / −21,7 % |
| Paperin limitys kuvan taakse | 15 px |
| Ohita → ääni pois, kuvat pois | 1 ms |
| Audiot 1 s Ohitan jälkeen | 0 soivaa |
| 10 s Ohitan jälkeen: uudet `play`/Web Audio `start` -kutsut | **0 / 0** |
| 10 s Ohitan jälkeen: soivia audioita / pulun kuplia / pulun solmuja | 0 / 0 / 0 |
| 10 s Ohitan jälkeen: pulun puheenvuoron kello käy | **ei** |
| Vastakoe ilman ohitusta: sama ketju, luenta loppuu | puheenvuoro **lähtee** |
| Pikkukuvat auki / pienennettynä | 3 / 0 |
| Sivuvirheitä | 0 |

Varjo mitataan PIKSELEINÄ omalla png-purulla kaappauksesta: mittapisteet
lasketaan paperin omassa koordinaatistossa ja käännetään ruudulle kortin
kiertokulmalla, joten kallistettu pakan kortti mitataan sellaisena kuin se
on. Kaista on kuvan alareunan alapuolella ja kuvatekstin yläpuolella —
juuri se ala, jolle varjo lankesi. Ääni mitataan KUTSUINA:
`HTMLMediaElement.play` ja Web Audio -lähteen `start` on vakoiltu
aikaleimoineen, joten "ei ala uutta ääntä" on laskettu eikä katsottu.

Kaksi vastakoetta pitävät mittarin rehellisenä: vanha varjo takaisin →
sama kaista tummuu 71:een; lippu alas → pulun puheenvuoro lähtee samasta
ketjusta. Ilman niitä läpimeno voisi olla tyhjän mittaamista.

Kaappaukset:

- `docs/raportit/kuvat/luentakuva-paperi-ei-varjoa.png` (paperi puhdas)
- `docs/raportit/kuvat/luentakuva-paperi-vanha-varjo.png` (vastakoe: tumma kaista)
- `docs/raportit/kuvat/luentakuva-paperi-ohita.png`, `matkakirja-pikkukuvat.png`,
  `ohita-kartta-nakyy.png`

`node --test tests/*.test.mjs`: 3594 läpi, 0 fail, 13 skip.

## Oletukset (omistajan päätettäväksi)

- **Yksi varjo koko kortille** eikä kuvalle erikseen: kortti on nyt yksi
  esine. Jos omistaja haluaa kuvan "kohoavan" paperista, se olisi eri
  linjaus (esim. ohut viiva kuvan alareunaan varjon sijaan).
- **Ohita ei vaienna kaupungin taustamusiikkia eikä ambienssia** — se
  pysäyttää saapumisen puheen ja kuvat (isoisä, pulu, reaktiot, välihuuto).
  Kaupungin oma ääni kuuluu kartalle, jonne Ohita vie.
- **Lippu nollautuu seuraavassa kaupungissa itsestään** (tunnusvertailu),
  kuten edellisessä erässä.
- Raamattuun, `sarjat.json`iin, `js/pallolauta/`- tai `js/linssit/`
  -tiedostoihin ei koskettu; tarina- ja kuvatekstejä ei muutettu.
