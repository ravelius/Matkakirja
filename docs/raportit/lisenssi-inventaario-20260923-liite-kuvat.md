# Liput, ulkoiset kuvat ja julisteet — lisenssiselvitys

Repo tarkastettu: haara siirtoseppa-lisenssit (main 0891b81dd) (EI muutettu).
Vienti ajettu haarassa `siirtoseppa-vienti`: `node tools/vienti/vie-sisalto.mjs`
→ `dist/vienti/media.json` (20 391 viitettä) + `dist/vienti/moduulit/**.json`.
Rivinumerot tarkistettu suoraan lisenssit-repon tiedostoista (`grep -n`).

---

## 1. LIPUT (lajin `lippu-commons` 183 viitettä)

**Lähteet dataksi:** `js/packs/lippu-tekijat.js` (`LIPPU_TEKIJAT`, 8 lippua joiden
CC BY / CC BY-SA -lisenssi vaatii tekijän nimeämisen — nämä on jo
merkitty) ja `js/packs/lipputiedot.js` (`LIPPUTIEDOT`, 124 lippua joiden
`lahde`-kenttä mainitsee lisenssin, valtaosin "(PD)"). En löytänyt yhtään
`lisenssi:`-kenttää itse `lippu:`-avaimen sisarkentäksi missään
maapaketissa (africa/asia/europe/...-countries.js ja -maatiedot.js) —
lisenssi asuu vain noissa kahdessa erillisessä taulukossa.

- 183 lippuviitettä (kaikki eri tiedostoja)
- 8 löytyy `LIPPU_TEKIJAT`:sta (lisenssi jo tiedossa, CC BY/BY-SA)
- 124 löytyy `LIPPUTIEDOT`:sta (lisenssi jo tiedossa tekstissä, 1 näistä on sama kuin `LIPPU_TEKIJAT`-lippu)
- **52 lippua EI löydy kummastakaan** → näille haettiin lisenssi Commonsin
  API:sta (`action=query&prop=imageinfo&iiprop=extmetadata`, User-Agent
  "Matkakirja-lisenssitarkistus/1", 50 titleä/pyyntö, ~1,2 s
  viive pyyntöjen välissä; ei 429:iä).

Omistajan mainitsema "edellinen laskenta: 34" ei täsmää omaan laskuuni (52).
En löytänyt mitään muuta lippulistaa reposta, joten en tiedä mistä 34
on laskettu — epäilen, että se on laskenut vain jonkun suppeamman
maajoukon (esim. vain Euroopan) tai käyttänyt eri poikkeussääntöä.
**Merkitsen tämän epävarmaksi** ja suosittelen tarkistamaan, tarkoittiko
omistaja jotain rajatumpaa osajoukkoa.

### Tulos: kaikki 52 ovat Public Domain tai CC0 — ei yhtään attribuutiota vaativaa

Commonsin `AttributionRequired` oli `false` kaikilla 52:lla (2 on CC0,
50 Public domain). Mitään ei siis tarvitse lisätä `LIPPU_TEKIJAT`-tauluun
(se listaa vain CC BY / CC BY-SA -liput). Rivinumero on ensimmäinen
sisältötiedosto, jossa lippu esiintyy `lippu:`-kenttänä (jos lippu näkyy
myös `js/packs/liput-paikalliset.js`:ssä ja `maailmankartta.js`:ssä, se
jätettiin pois — ne ovat pelkkä tiedostonimen peilaustaulu eikä
oikea käyttökohta).

| Lippu | Lisenssi | Tekijä (Commons Artist) | Attribuutio pakollinen | Lähde: rivi |
|---|---|---|---|---|
| Berber flag.svg | Public domain | Mysid | ei | js/packs/africa-maatiedot.js:35 |
| Flag of Afghanistan.svg | Public domain | Original: Taliban Vector: Lexicon | ei | js/packs/asia-maatiedot.js:92 |
| Flag of Albania.svg | Public domain | Sadik Kaceli | ei | js/packs/maailmankartta.js:1031 |
| Flag of Armenia.svg | Public domain | Original: Stepan Malkhasyants Vector: SKopp | ei | js/packs/maailmankartta.js:1087 |
| Flag of Assyria.svg | Public domain | Assyrian Congress | ei | js/packs/asia-maatiedot.js:814 |
| Flag of Bali.svg | Public domain | AnonyLog / GunkartaMuffin Wizard (Inkscape) | ei | js/packs/asia-maatiedot.js:248 |
| Flag of Bashkortostan.svg | Public domain | multiple, Автор: Conscious | ei | js/packs/europe-maatiedot.js:563 |
| Flag of Belarus.svg | Public domain | ks. tiedostohistoria | ei | js/packs/maailmankartta.js:1033 |
| Flag of Belgium (civil).svg | Public domain | Dbenbenn | ei | js/packs/maailmankartta.js:1032 |
| Flag of Bhutan.svg | Public domain | ks. tiedostohistoria | ei | js/packs/maailmankartta.js:1103 |
| Flag of Catalonia.svg | Public domain | Motoroil | ei | js/packs/europe-maatiedot.js:88 |
| Flag of Cebu Province.svg | CC0 | IllationGroup2000 | ei | js/packs/asia-maatiedot.js:700 |
| Flag of Friesland.svg | Public domain | P.H. Wagemakers and Joh. Koopmans | ei | js/packs/europe-maatiedot.js:338 |
| Flag of Galicia.svg | Public domain | Pedro A. Gracia Fajardo | ei | js/packs/europe-maatiedot.js:89 |
| Flag of Georgia.svg | Public domain | Last update by MapGrid, SKopp | ei | js/packs/maailmankartta.js:1089 |
| Flag of Haiti.svg | Public domain | Madden, Vzb83, Denelson83 ym. (lippu); Lokal_Profil, Myriam Thyes (vaakuna) | ei | js/packs/northamerica-maatiedot.js:121 |
| Flag of Jeju Province.svg | Public domain | Jeju Province Government | ei | js/packs/asia-maatiedot.js:438 |
| Flag of Jordan.svg | Public domain | Unknown | ei | js/packs/maailmankartta.js:1070 |
| Flag of Karakalpakstan.svg | Public domain | (ei koneluettavaa tekijää; Urmas oletettu) | ei | js/packs/asia-maatiedot.js:942 |
| Flag of Kurdistan.svg | Public domain | Unknown author | ei | js/packs/asia-maatiedot.js:310 |
| Flag of Kyrgyzstan.svg | Public domain | Shakiev N.T., Primov U.B. | ei | js/packs/maailmankartta.js:1108 |
| Flag of Latgale.svg | Public domain | President of Latvia (alkup.), Great Brightstar (vekt.) | ei | js/packs/europe-maatiedot.js:611 |
| Flag of Luxembourg.svg | Public domain | User:SKopp | ei | js/packs/europe-maatiedot.js:782 |
| Flag of Malta.svg | Public domain | ks. tiedostohistoria | ei | js/packs/europe-maatiedot.js:806 |
| Flag of Moldova.svg | Public domain | Gheorghe Vrabie | ei | js/packs/maailmankartta.js:1035 |
| Flag of Montenegro.svg | Public domain | B1mbo, Froztbyte, Great Brightstar | ei | js/packs/maailmankartta.js:1038 |
| Flag of North Korea.svg | Public domain | Unknown (alkup.), Zscout370 (vekt.) | ei | js/packs/maailmankartta.js:1093 |
| Flag of North Macedonia.svg | Public domain | User:SKopp, redrawn by Gabbe | ei | js/packs/maailmankartta.js:1036 |
| Flag of Nunavut.svg | Public domain | Kooma (original) | ei | js/packs/northamerica-maatiedot.js:85 |
| Flag of Occitania.svg | Public domain | Nimlar | ei | js/packs/europe-maatiedot.js:66 |
| Flag of Okinawa Prefecture.svg | Public domain | Zach Harden (Zscout370), opt. Wrightbus | ei | js/packs/asia-maatiedot.js:385 |
| Flag of Quebec.svg | Public domain | René Chaloult (alkup.), Krun (vekt.) | ei | js/packs/northamerica-maatiedot.js:84 |
| Flag of Saint Helena.svg | Public domain | Patricia Fidi | ei | js/packs/maailmankartta.js:1058 |
| Flag of Samoa.svg | Public domain | Malietoa Tanumafili II, Tupua Tamasese Meaʻole | ei | js/packs/oceania-maatiedot.js:136 |
| Flag of Scotland.svg | Public domain | none known | ei | js/packs/europe-maatiedot.js:263 |
| Flag of Sindh.svg | CC0 | User:Baba66 | ei | js/packs/asia-maatiedot.js:674 |
| Flag of Sorbs.svg | Public domain | Mysid | ei | js/packs/europe-maatiedot.js:363 |
| Flag of Syria (1980–2024).svg | Public domain | ks. tiedostohistoria | ei | js/packs/maailmankartta.js:1080 |
| Flag of Tajikistan.svg | Public domain | Unknown author | ei | js/packs/asia-maatiedot.js:941 |
| Flag of Tatarstan.svg | Public domain | Urmas | ei | js/packs/europe-maatiedot.js:562 |
| Flag of Turkmenistan.svg | Public domain | (tuntematon, Commons ei anna nimeä) | ei | js/packs/maailmankartta.js:1110 |
| Flag of Upper Silesia.svg | CC0 | Andrew J. Kurbiko | ei | js/packs/europe-maatiedot.js:112 |
| Flag of Wales.svg | Public domain | Unknown, vekt. Tobias Jakobs | ei | js/packs/europe-maatiedot.js:262 |
| Flag of West Java.svg | Public domain | Indonesian Government | ei | js/packs/asia-maatiedot.js:247 |
| Flag of et-Võru.svg | Public domain | (tuntematon, Commons ei anna nimeä) | ei | js/packs/europe-maatiedot.js:587 |
| Flag of the Crimean Tatar people.svg | Public domain | Riwnodennyk | ei | js/packs/europe-maatiedot.js:538 |
| Flag of the Faroe Islands.svg | Public domain | User:IceKarma (Jeffrey Connell) | ei | js/packs/europe-maatiedot.js:738 |
| Flag of the Mapuches (1992).svg | Public domain | Huhsunqu | ei | js/packs/southamerica-maatiedot.js:182 |
| Flag of the Romani people.svg | Public domain | AdiJapan | ei | js/packs/europe-maatiedot.js:237 |
| Sami flag.svg | Public domain | Jeltz | ei | js/packs/europe-maatiedot.js:660 |
| Tino Rangatiratanga Maori sovereignty movement flag.svg | Public domain | of code: -xfi-; of flag: Linda Munn, Jan Dobson, Hiraina Marsden | ei | js/packs/oceania-maatiedot.js:135 |
| Wiphala.svg | Public domain | Huhsunqu | ei | js/packs/southamerica-maatiedot.js:112 |

**Epävarmat/huomiot:**
- "Flag of Turkmenistan.svg" ja "Flag of et-Võru.svg": Commons ei anna
  konekelpoista tekijänimeä extmetadatassa (Artist-kenttä tyhjä). Ei
  vaikuta attribuutiovelvoitteeseen (molemmat PD), mutta jos joskus
  tarvitaan tekijä, se pitää etsiä tiedoston historiasta käsin.
- Osa Artist-kentistä on Commonsin omaa hallinnollista tekstiä ("See
  File history below for details.", "Unknown author") — kopioitu
  sellaisenaan Commonsista, ei minun päätelmä.
- Koska kaikki 52 ovat PD/CC0 eikä yksikään vaadi attribuutiota, en
  näe tarvetta lisätä niitä `LIPPU_TEKIJAT`-tauluun (sen tarkoitus on
  nimenomaan CC BY / CC BY-SA -liput, `tools/lisaa-tekijat.mjs`:n
  kommentin mukaan).

---

## 2. 24 ULKOISTA KUVAA (lajin `kuva-url`)

**Tärkeä löydös ensin:** `tools/vienti/tarkista-media.mjs` (rivi 16)
sanoo suoraan: *"ulkoiset kuva-URLit (hahmotelmien viitekuvat) [...]
ne eivät ole pelin omaa mediaa"* — eli suuri osa `kuva-url`-lajin 6 456
viitteestä ON tarkoituksella hahmotelma/tausta-aineistoa, ei pelaajalle
näkyviä kuvia. Tämä selittyi vielä tarkemmin `js/packs/fokusvirta-*.js`
-tiedostoissa: `pollo.kuvat[i].lahteet`-taulukko on nimenomaisesti
kommentoitu *"tausta-aineisto (ei näy pelaajalle)"* — itse näytettävä
kuva on `pollo.kuvat[i].osoite`, jonka sisarkenttä `lahde` on jo
`'Matkakirjan havainnekuva'`.

**Menetelmä:** kävin läpi kaikki 6 456 `kuva-url`-viitettä, resolvain
jokaisen JSON-osoittimen (`polku`) `dist/vienti/moduulit/**.json`:sta
vasten ja tarkistin sisarkentät (`lahde`, `lisenssi`, `lisenssiUrl`,
`tekija`, `lahdeUrl`) 1–3 tasoa ylöspäin. Tarkistin sekä erillisen
`lisenssi`-kentän että `lahde`-tekstin sisällä olevan lisenssimaininnan
(esim. `"Dominik Maximilián Ramík, Commons (CC BY 4.0)"`), koska
molempia muotoja käytetään koodikannassa.

En pystynyt toistamaan täsmälleen lukua 24 — oma laskentani antoi eri
tuloksen riippuen siitä, lasketaanko hahmotelma-taustaviitteet mukaan.
**Merkitsen tämän epävarmaksi** ja kerron tarkka jaottelu, jotta
omistaja/päätoimittaja voi verrata omaan aiempaan laskuunsa.

### Jaottelu

| Ryhmä | Määrä | Tila |
|---|---|---|
| `js/linssit/satelliitti-data.js` (NASA-astronauttikuvat) | 166 viitettä (83 kuvaa × 2 kenttää) | **Kunnossa.** Lisenssi on moduulin ylätason vakiossa `SATELLIITTI_LAHDE = {tekija:'NASA', lisenssi:'Public domain', ...}`, ei rivikohtaisesti — siksi näytti "tuntemattomalta" rivitasolla. |
| `js/packs/fokusvirta-*.js` `pollo.kuvat[i].lahteet[]` ja vastaava `luentakuva.lahteet[]` | ~16 URLia (Firenze, Dublin, Venetsia, Marseille, Istanbul, Lontoo, Oslo, Tromssa, Berliini) | **Ei näytetä pelaajalle** — koodikommentti sanoo sen suoraan (esim. `js/packs/fokusvirta-firenze.js:242`). Nämä ovat toimituksen tausta-aineistoa, jolla itse kuva (`osoite`) on ankkuroitu todellisuuteen; itse näytettävällä kuvalla on jo `lahde: 'Matkakirjan havainnekuva'`. Ei toimenpidettä. |
| `js/packs/elaintakyt.js` VUT (kookoskrapu) | 2 kenttää (`lahdeUrl`+`url`), 1 kuva | **Kunnossa**, mutten löytänyt sitä ensimmäisellä yhden tason tarkistuksella. `kuvat[0].lahde` = `'Dominik Maximilián Ramík, Commons (CC BY 4.0)'`, `lahdeUrl` osoittaa Commons-sivulle (js/packs/elaintakyt.js:2508-2512). Kommentissa lukee jopa valmiiksi: *"LISENSSI JA TEKIJÄ ON LUETTU COMMONSIN extmetadatasta [...] LicenseShortName 'CC BY 4.0', Artist 'Dominik Maximilián Ramík' [...] AttributionRequired true."* Attribuutio ON siis pakollinen ja on jo tehty. |
| `js/packs/linssi-yokartta.js` (yökartan pohjakuva) | 1 | **Kunnossa.** Export-tason `lahde`/`lisenssi`-objektit (rivit 85–96): NASA Black Marble 2016, "Public domain (Yhdysvaltain liittovaltion virasto)". Sisarkenttä on vain yhden tason kauempana kuin `osoite`, minkä takia rivikohtainen tarkistus ei sitä ensin löytänyt. |
| `js/packs/linssi-topografia-kuva.js` (reliefikartta) | 1 | **Kunnossa.** Tiedoston yläkommentissa (rivit 10–17): NOAA NGDC ETOPO1, "Public domain — Yhdysvaltain liittovaltion viraston tuottamana". |
| `js/packs/etusivun-isoisakuvat.js` (`ETUSIVUN_ISOISAKUVAT`) | 27/29 riviä | **Todellinen dokumentaatioaukko**, ks. alla. |
| `js/isoisan-valokuvat.js` (`kanton`, `bombay`) | 2/3 riviä | **Sama aukko**, ks. alla. |

### Ainoa todellinen löydös: 29 "isoisä"-kuvaa ilman `lahde`-kenttää

`js/packs/etusivun-isoisakuvat.js`:n taulukossa `ETUSIVUN_ISOISAKUVAT` on
29 riviä, joista 27:ltä puuttuu `lahde`-kenttä kokonaan. Kaksi
saman taulukon riviä (Pariisi, Kalkutta — lisätty myöhemmin
9.9.2026 kuvatoimituksella) sen sijaan KANTAVAT kentän arvolla
`'Matkakirjan havainnekuva'`. Samoin `js/isoisan-valokuvat.js`:n
kolmesta rivistä kahdelta (`kanton`, `bombay`) puuttuu `lahde`, mutta
kolmannella (`lento`) on `lahde: 'Kuvaputken generoitu valokuva'`.

Kaikki nämä kuvat ovat Matkakirjan OMAA ämpäriä
(`https://media.matkakirja.app/kohtaamiset/isoisa/...`) — eivät siis
aidosti "ulkoisia" kolmannen osapuolen kuvia — ja tiedoston oma
kommentti (`js/packs/etusivun-isoisakuvat.js:157-`) kertoo niiden
tulleen "kuvatoimituksesta" (kuvaputki/tekoälygenerointi), ei
Commonsista. Kyse on siis puuttuvasta merkinnästä, ei puuttuvasta
lisenssistä: naapuririveillä on jo kaksi eri vakiintunutta ilmausta
(`'Matkakirjan havainnekuva'` ja `'Kuvaputken generoitu valokuva'`),
ja nämä 29 riviä pitäisi täydentää samalla tavalla johdonmukaisuuden
vuoksi.

- `js/packs/etusivun-isoisakuvat.js` (rivit, esim. 159–166 malli, puuttuvat
  rivit alkaen 178 `isoisa-cairo-aged...` jne. — 27 kpl, indeksit
  media.jsonin `esiintymat[].polku`:ssa `/0/osoite`…`/28/osoite` paitsi
  `/1/osoite` (Pariisi) ja `/4/osoite`-tyyppiset jo-merkityt)
- `js/isoisan-valokuvat.js:43` (`kanton`) ja `:55` (`bombay`)

**Suositus:** ei tarvita ulkoista lisenssitutkimusta (kuvat eivät ole
Commonsista), vaan pelkkä kenttätäydennys — lisää näille `lahde:
'Kuvaputken generoitu valokuva'` (sama ilmaus kuin `lento`-rivillä)
tai `'Matkakirjan havainnekuva'` (sama kuin Pariisi/Kalkutta-riveillä),
kumpi tiedoston omistaja/Fable katsoo oikeaksi ilmaisuksi.

**Yhteenveto epävarmuudesta:** jos "24 ulkoista kuvaa" tarkoitti
nimenomaan aidosti kolmannen osapuolen isäntien kuvia (ei
media.matkakirja.app, ei hahmotelma-taustaviitteitä), en löytänyt
YHTÄÄN sellaista, jolta lisenssi puuttuisi — kaikki tarkistamani (VUT-
kookoskrapu, yökartta, reliefikartta, satelliittikuvat) olivat jo
asianmukaisesti dokumentoituja, vain eri syvyydellä objektipuussa kuin
mistä rivikohtainen tarkistus ensin katsoi. Jos taas "24" sisältää
isoisä-pakan kuvat, oma laskuni antoi 29 eikä 24 — ero saattaa johtua
siitä, että 2+1 riviä on jo korjattu tämän laskennan jälkeen, tai eri
rajauksesta.

---

## 3. 114 JULISTETTA (js/packs/julisteet.js)

**Selitys sille, miksi kaikki 114 näyttivät "tuntemattomalta":**
`JULISTEET`-taulukon yksikään rivi ei kanna `lahde`-kenttää — tarkistin
koodilla, että kaikilla 114:llä `lahde` on `undefined`. Tämä EI ole
aukko vaan tarkoituksellinen ratkaisu: tiedoston oma kommentti
(js/packs/julisteet.js:63-69) sanoo suoraan: *"Julisteiden yhteinen
lähderivi. Sama teksti joka julisteella, joten se on vakio eikä kenttä"*
— lähde on moduulitason vakio `export const JULISTE_LAHDE = 'Matkakirjan
oma paino'` (rivi 69), jota `js/ui.js` soveltaa kaikkiin julisteisiin
yhteisesti. Rivikohtainen skanneri, joka etsii `lahde`-kenttää
JULISTEET-objektin sisältä, ei tätä löydä ja merkitsee kaikki
"tuntemattomaksi" — vaikka lähde on täysin dokumentoitu, vain yhdessä
paikassa 114:n sijaan.

### Ovatko julisteet generoituja vai Commons-pohjaisia?

**Puhtaasti generoituja, ei Commons-johdannaisia.** Ketju:
`tools/juliste-ajuri.mjs` → lukee `tools/juliste-tyolista-1.mjs` /
`-2.mjs` → POST `POLLOPALVELIN` (`https://matkakirja-pollo.
samireivinen.workers.dev`, `js/packs/pollo-asetukset.js:19`) →
`tools/pollo/worker.js`. Worker-tiedostossa oletusmalli on
`KUVA_MALLI_OLETUS = 'gpt-image-2'` (OpenAI, `tools/pollo/worker.js:1374`,
tukee myös gpt-image-1/1.5:tä `input_fidelity`-parametrilla). Ajurin
POST-rungossa (`{tehtava:'kuva', prompti, koko:'pysty'}`) EI ole
`viitteet`-kenttää, joten kutsu menee workerin `/v1/images/generations`
-reittiin — pelkkä tekstipromptista generointi, ei mitään Commons-kuvaa
pohjana. Tyylimääre on kiinteä teksti (`TYYLI`-vakio,
`tools/juliste-ajuri.mjs:11`): "19th century COPPER ENGRAVING [...]".
Tuotantosarjan päiväys tiedoston kommentissa on 22.8.2026 (tarkkoja
per-juliste-päiviä ei ole taulukoitu erikseen).

→ Ei periytyvää lisenssiä mistään Commons-kuvasta. Nykyinen
`JULISTE_LAHDE = 'Matkakirjan oma paino'` on asiallisesti oikea.

**Suositeltu lähderivin sisältö** (jos halutaan tarkempi, konekielinen
teksti nykyisen vakion sijaan/lisäksi):
`"Matkakirjan oma paino, tuotettu OpenAI gpt-image-2, 22.8.2026 alkaen"`
— ilman "pohjana"-osaa, koska mitään pohjakuvaa ei käytetä.

### Kulttuuri-kategoriat.js:n `ampari`-herokuvat — sama kysymys, eri vastaus osittain

`tools/hero-ajuri.mjs` + `docs/moduulit/viitekuvat.md` kuvaavat
TOISENLAISEN, kehittyneemmän putken kuin julisteilla: kun työlistan
kohdassa on `tarkkaKohde: true`, ajuri hakee `tools/hae-viitekuvat.mjs`:llä
2–4 **Commonsista** haettua vapaasti lisensoitua (vain PD/CC0/CC BY/
CC BY-SA, ks. `docs/moduulit/viitekuvat.md` "Lisenssit ja kuvavalinta")
nykyvalokuvaa ERI kuvaajilta/-kulmilta, lähettää ne workerin
`/v1/images/edits`-reittiin `viitteet`-kenttänä (kuva "ankkuroidaan"
oikeaan kohteeseen, ei kopioida). Jokaisesta viitteestä kirjataan
tekijä, lisenssi ja lähdesivu tiedostoon `<kohdekansio>/
viitekuvat-loki.txt` (en löytänyt tätä lokia repossa — se on
ilmeisesti generointiajon paikallinen sivutuote, ei committoitu).
Yleisnäkymät (ei `tarkkaKohde`) generoidaan ilman viitteitä, kuten
julisteet.

`js/packs/kulttuuri-kategoriat.js`:ssä on 394 `ampari:`-riviä ja 4181
`lahde:`-mainintaa (koko tiedosto on iso, `lahde` kattaa muutakin kuin
heroja). Pistokokeella (Lontoo, rivit 100-127) `lahde`-kenttä ON jo
merkitty riveittäin, esim. rivi 121: `lahde: 'Matkakirjan havainnekuva'`
— eli tässä tiedostossa rivikohtainen merkintä NÄYTTÄÄ olevan
normi (toisin kuin julisteet.js:ssä). **En ehtinyt/pystynyt tässä
kierroksessa auditoimaan kaikkia 394 ampari-riviä yksitellen** sen
selvittämiseksi, kuinka moni niistä mainitsee Commons-viitteen
(→ periytyvä lisenssi) vs. onko puhdas yleisnäkymägenerointi — tämä on
merkittävä epävarmuus ja suosittelen erillistä, kohdennettua ajoa jos
tarkka luku halutaan.

**Suositeltu lähderivin sisältö kun Commons-viitteitä käytetty:**
`"Matkakirjan oma paino, tuotettu OpenAI gpt-image-2 <pvm>, pohjana
<Commons-tiedosto>, <tekijä>, <lisenssi>"` — tiedot löytyvät
generointiajon `viitekuvat-loki.txt`:stä, jos se on tallessa, tai
muuten pitää päätellä työlistan `wiki`/`kategoria`-kentästä ja hakea
uudelleen Commonsin API:sta samalla tavalla kuin osiossa 1.

---

## Yhteenveto epävarmuuksista

1. Liput: oma laskuni (52 ilman lisenssiä) ei täsmää annettuun
   "34":een — syytä ei löytynyt, kaikki 52 osoittautuivat kuitenkin
   PD/CC0:ksi eikä yksikään vaadi attribuutiota.
2. Ulkoiset kuvat: en löytänyt yhtään aidosti ulkoista, näytettävää
   kuvaa jolta lisenssi puuttuisi — kaikki tarkistetut olivat jo
   dokumentoituja syvemmällä objektipuussa. Ainoa oikea aukko on 29
   oman ämpärin "isoisä"-kuvaa, joilta puuttuu pelkkä `lahde`-kenttä
   (ei lisenssiongelma, koska eivät ole Commons-peräisiä). Luku ei
   täsmää annettuun "24":ään.
3. Julisteet: 114/114 selittyy täysin moduulitason vakiolla, ei
   todellinen aukko. Kaikki puhtaasti tekstipohjaisesti generoituja
   (OpenAI gpt-image-2), ei Commons-johdannaisia.
4. `ampari`-herokuvat: putki VOI käyttää Commons-viitteitä
   (`tarkkaKohde: true`), mutta en auditoinut kaikkia 394 riviä sen
   selvittämiseksi kuinka moni näin tekee — vaatisi erillisen ajon.
