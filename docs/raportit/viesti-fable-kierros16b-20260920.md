# Opus → Fable: kierros 16b (20.9.2026)

Erä `opus-local-kierros16-korjaukset` (jatkoa), Matkakirja Opus local (Mac Studio),
03.30–04.30 Suomen aikaa. Pohja `origin/v1970-prep`.

## 1. Borgundin visa — PUDOTETTU, ei toistunut (mitä kokeilin)

Sonnet 1 toisti visan v1970:ssä toimivana, ja minä yritin avata saman noston suoraan:
`avaaNostonTunnuksella(ui, 'sauvakirkko')` palautti **false** eikä korttia syntynyt.
Syy: Borgund on **Bergenin oman fokusvirtapakan täkynosto**
(`js/packs/fokusvirta-bergen.js`), joka on olemassa vain, kun pelaaja on Bergenissä —
savukkeen tallenne on Pariisissa. Toisto vaatisi oman Bergen-tallenteen, enkä tehnyt sitä.

Sama visapolku on jo vartioitu: `savuke-nostovisa.mjs` mittaa täkynoston visan
(kysymys, palkkio, lukko väärän ja oikean jälkeen) Pariisin nostolla. Jos vika palaa,
todennäköisin selitys on yhä joko tekstivalinnan esto tai kortin sulkukorjaus, jotka
molemmat tulivat v1970:een — kumpikaan ei koske visanappien napautukseen.

## 2. Pöllön arvonimi väärästä maasta — korjattu

**Juurisyy:** `polloNimilappu(..., { arvonimi: true })` luki paikan oletuksena
`arvonimenPaikka()`-funktiosta, joka kertoo **pelaajan** sijainnin. Kohdekortti (Rumšiškės,
LTU) sai siis Pariisin arvonimen, koska pelaaja oli Pariisissa.

**Korjaus:**
- `js/ui-apurit.js`: uusi `arvonimenPaikkaMaalle(iso, game)` — maanosa päätellään samasta
  taulusta kuin pelaajalla (`pack.map.cityManner`) maan ensimmäisestä kaupungista, ja
  napapiirin takana sekä Grönlannissa arvonimet ovat `polar` kuten ennen.
- `js/fokuskohteet.js`: uusi `kohteenIso(kohde)` (hakemisto `KOHDE_MAAT`-taulusta, oma
  `iso`-kenttä voittaa) ja kortin kysy-otsikko käyttää kohteen maata.

**Vartio:** `tests/pollon-arvonimet.test.mjs` — maan kautta luettu paikka (LTU, napapiirin
NOR, GRL, tuntematon) ja `kohteenIso`.

## 3. Oslo 1873: Kristiania → Christiania — korjattu

Virallinen kirjoitusasu vaihtui 1877, joten isoisän matkavuonna 1873 se on Christiania.
Muutetut kohdat (vain 1873-tekstit):

| Tiedosto | Kohta |
| --- | --- |
| `js/packs/fokusvirta-oslo.js` | paikkarivi (ylätunniste), kolme isoisän 1873-tekstiä |
| `js/packs/julisteet.js` | julisteen otsikko, lyhyt ja selite |
| `js/packs/europe-questions.js` | isoisän ääni ("Kaupunki on Christiania") |
| `js/packs/nahtavyysjutut.js` | isoisän 1873-katselu satamassa |
| `js/packs/maakartat.js` | esittely: "Christiania, vuodesta 1877 Kristiania — aina vuoteen 1925" |

**Ennallaan jäivät** 1890- ja 1900-luvun maininnat: Nansenin Fram-lähtö 1893, Ibsen,
yliopiston arkisto 1914 ja nimen palautus Osloksi 1925.

**Vartio:** uusi `tests/oslo-christiania.test.mjs` (1873 = Christiania, 1893 = Kristiania).
Huom: paikkarivi on merkitty kaanoniksi (Fable), joten tarkista sanamuoto.

## 4. Pulu Ranskan kartuschan päällä — korjattu

**Juurisyy (mitattu 390 px):** kartuscha (`.maapaneeli-kortti.valikko-auki`) on auki
15–375 × 560–829, ja pulun nappi oli 300–348 × 735–783 sen päällä. Vahti
(`js/pulu-paneelin-ylla.js`) ei nähnyt paneelia lainkaan, koska koko kaluste on
`pointer-events: none` (PÄÄTÖKSET 21: rulla, nipistys ja raahaus menevät kartalle), eikä
`elementsFromPoint` palauta sellaista.

**Korjaus:** auki oleva kaluste merkitsee itsensä luokalla `pulu-vaistettava`
(`js/pallolauta/maapaneeli.js`), ja vahti lukee merkityt paneelit laatikosta
osumatestin lisäksi (`VAISTETTAVA_LUOKKA`). Sopimus on yleinen: mikä tahansa osoittimelle
läpinäkyvä paneeli saa väistön lisäämällä luokan.

**Mittaus:** korjattuna pulu nousee 504–552, eikä nappi eikä kasvokangas leikkaa
kartuschaa; sulkemisen jälkeen pulu palaa paikalleen (735–783).

**Vartio:** uusi `tools/savukkeet/savuke-pulu-kartuscha.mjs` (julkaisusarjassa).

| Ajo | Tulos |
| --- | --- |
| Vastakoe (vanha koodi) | **2/4**: nappi ja kangas leikkasivat kartuschaa |
| Korjattu | **4/4** |

`node --test tests/*.test.mjs`: pass 3721, fail 0. `tarkista-savukkeet`: kunnossa.

## Jäi tekemättä

- Borgund (ks. kohta 1).
- Laitemittaus kaikissa kohdissa.
- Astronautin kameran kysy-otsikko käyttää yhä pelaajan sijaintia arvonimessä; sielläkin
  se on väärä lähde, mutta se ei ollut tässä tilauksessa.
