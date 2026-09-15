# Viesti Fablelle — luennan tekstit piiloon kaikilla laitteilla

**Opus-työagentti, 15.9.2026.** Haara
`claude/bold-ride-vow4ki-tekstit-piiloon`, pohjana
`claude/bold-ride-vow4ki-kaiutin` (PR #2504) — **ei mainista**, koska
#2504 muokkaa samoja tiedostoja (kaiutin ja luentakuvat). PR sisältää
siis myös #2504:n muutokset.

Toimeksianto: omistajan päätös 15.9.2026 (Raamattu "TEKSTIT PIILOON
KAIKILLA LAITTEILLA"): luennan aikana isoisän matkakirjamerkinnän
teksti (saapumiskortin lappu) ja pulun puhekupla piilotetaan **kaikilla
laitteilla**, ei vain puhelimella. Näkyviin jää kuva ja kuvateksti.
Merkinnän saa esiin lappua napauttamalla, pulun repliikin pluskuplasta.
Luennan jälkeen tekstit palaavat kuten ennen.

**Lyhyesti:** mekanismia ei tarvinnut keksiä uudelleen — se oli jo
olemassa puhelimelle (v1891:n lappu + 14.9. pluskupla). Muutos on
**ehdon vaihto**: ruutukoko → luennan tila. Piilotus on nyt yhden
portin takana (`js/ui-apurit.js tekstitPiilossa()` = puhelin **tai**
kertojan luenta), ja luennan tilan kirjoittaa bodyn luokkaan sama
luentavahti, joka piilottaa Liiku-napin. Luennan ulkopuolella työpöytä
on bitilleen ennallaan.

---

## 1. Miten puhelinpiilotus oli ehdollistettu (ENNEN)

| Piilotus | Ehto ennen | Missä |
|---|---|---|
| Isoisän merkintä lapuksi | `puhelinTila()` uudessa merkinnässä | `js/ui.js uusiFactKey` |
| Pulun kupla pluskuplaan | `puhelinTila()` uudessa kuplassa | `js/pollo.js lisaaPinoon` |
| Yksittäinen ohjekupla pois | `@media (max-width: 699px), (max-height: 520px)` | `css/styles.css` |
| Kaiutin lapun riville | sama mediakysely | `css/styles.css` |

`puhelinTila()` = `matchMedia(PUHELIN_KYSELY)`, ja
`PUHELIN_KYSELY = '(max-width: 699px), (max-height: 520px)'`
(`js/ui-apurit.js`). Sama merkkijono on css:ssä. Kaikki neljä olivat
siis **ruudun mitan** takana.

## 2. Mitä muuttui

**Pienin muutos oli sitoa piilotus luennan tilaan, ei ruutukokoon.**

1. `js/ui-apurit.js` sai portin:
   `LUENNAN_TEKSTIPIILO = 'luenta-tekstit-piiloon'`,
   `luennanTekstipiilo()` (lukee bodyn luokan) ja
   `tekstitPiilossa() = puhelinTila() || luennanTekstipiilo()`.
   Sama paikka kuin `PUHELIN_KYSELY`, koska myös `js/pollo.js` tarvitsee
   portin eikä saa tuoda `ui.js`:ää.
2. `js/ui.js kaynnistaLuentavahti` kirjoittaa luokan. Ehto on
   **kertoja**, ei koko luenta: jos pulun oma puhe nostaisi piilon,
   pulun repliikki imeytyisi pluskuplaan aina, ja työpöydän kuplakäytös
   muuttuisi kaikkialla. Piilolla on oma välirauhansa
   (`LUENNAN_VALIRAUHA_MS`), jottei lappu välähdä auki äänitteiden
   välissä.
3. Kortti kutistuu ja palautuu **vain reunalla** (tila vaihtuu), ei joka
   200 ms:n kyselyssä — muuten pelaajan napauttama lappu kutistuisi heti
   takaisin. Paluu tehdään vain, jos kutistus oli vahdin oma
   (`luennanKortinKutistus`), jotta kartan liikkeestä kutistunut lappu
   ei aukea luennan lopusta.
4. `js/ui.js uusiFactKey`: `asetaPaivakirjanKoko(tekstitPiilossa())`.
   Kesken luennan syntyvä merkintä alkaa siis lappuna joka laitteella.
5. `ajastaKortinPalautus` ei enää nosta korttia auki kesken kertojan
   luennan (`luennanTekstipiilo()`), vaikka kartta rauhoittuisi.
6. `js/pollo.js lisaaPinoon`: portti `puhelinTila()` →
   `tekstitPiilossa()`. Lisäksi uusi `piilotaLuennanKuplat()`
   (vienti `polloLuennanKuplatPiiloon`): luennan alkaessa **jo ruudulla
   oleva** repliikki siirtyy pluskuplaan — muuten se jäisi peittämään
   kuvaa koko luennan ajaksi.
7. `css/styles.css`: `body.luenta-tekstit-piiloon .pollo-vihje-yksin`
   piiloon (pinon ulkopuolinen kupla, jota pluskuplan muisti ei hallitse
   — sama poikkeus kuin puhelimella). **Kaiutin lapun rivillä nostettiin
   pois puhelinmediakyselystä**: kortti on nyt lappu myös työpöydällä ja
   tabletilla, joten merkki ja mykistyskytkin tarvitaan samalla rivillä
   joka ruudulla.

Mitään kuplapinon css-piilotusta ei lisätty (`.pollo-kuplapino-kehys
{ display: none }` on yhä kielletty): se piilottaisi myös pelaajan itse
avaaman kuplan.

## 3. Mittaukset (Chromium `/opt/pw-browsers/chromium`, Dubrovnik)

Luennan aikana, kolme ruutua. `rivi` = `.fact-teksti-rivi`
(merkinnän tekstilohko), `kuvateksti` = `.fokusvirta-isokuva-teksti`.

| Ruutu | body-luokka | kortti | merkinnän teksti | kuvateksti | kuva |
|---|---|---|---|---|---|
| 390 × 844 | `luenta-tekstit-piiloon` | lappu 228 × 24 | **0 × 640 px** | 290 × 28 px | 367 × 256 px |
| 1024 × 1366 (iPad) | `luenta-tekstit-piiloon` | lappu 254 × 27 | **0 × 740 px** | 290 × 28 px | 964 × 665 px |
| 1400 × 900 | `luenta-tekstit-piiloon` | lappu 254 × 27 | **0 × 793 px** | 290 × 28 px | 1071 × 738 px |

Teksti ei ole `display: none` vaan mitaton (`width: 0; overflow:
hidden`) — sama v317:ssä valittu tapa kuin puhelimella, jotta
kutistuminen liukuu eikä nytkähdä ja jotta lapun leveys ei veny
piilossa olevan tekstin mukaan.

Napautukset (aito hiiritapahtuma CDP:n kautta):

| Teko | 390 × 844 | 1024 × 1366 | 1400 × 900 |
|---|---|---|---|
| Lapun napautus kesken luennan | teksti 329 px | 329 px | 329 px |
| Pulun uusi repliikki | pinossa 0 kuplaa, pluskupla 44 × 44 | sama | sama |
| Pluskuplan napautus | repliikki näkyy | näkyy | näkyy |

Luennan jälkeen 1400 × 900: luokka poistuu, kortti **auki 340 × 251
px**, teksti 329 × 188 px — kuten main-versiossa.

Kuvakaappaus: `docs/raportit/kuvat/tekstit-piiloon-1400-20260915.jpg`
(1400 × 900, luennan aikana).

## 4. Vastakoe

`savuke-kaiutin-luentakuvat.mjs` ajaa 1400 × 900 -ruudulla saman
luennan **ilman piilotusta** (luokka pois, kortti auki, vahti seis):
merkinnän teksti on silloin 329 px leveä ja tekstipiilovartio kääntyy
punaiseksi. Vartio mittaa siis piilotusta eikä ruudun kokoa.
`savuke-iphone-tekstit.mjs`:ssä on oma parinsa: sama työpöytäruutu
luennan ULKOPUOLELLA pitää kortin auki (vanha vastakoe) ja luennan
jälkeen se palaa auki (uusi vastakoe).

## 5. Portit

| Portti | Tulos |
|---|---|
| `npm test` | **3440 testiä, fail 0** (13 skipped) |
| `tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |
| `tools/tarkista-niputus.mjs` | 391 moduulia, ei törmäyksiä |
| `tools/tarkista-savukkeet.mjs` | 1710 ui-viittausta, 407 metodia, 538 kenttää |
| `tests/rules.test.mjs` (ei css-suodatinanimaatioita) | 334/334 |
| `tests/dokumentit.test.mjs` | läpi (raportit ovat kartan ulkopuolella) |
| `savuke-kaiutin-luentakuvat.mjs` | **41/41 vartiota** (19 vanhaa + 22 uutta, molemmat vastakokeet) |
| `savuke-iphone-tekstit.mjs` | **36/36 vartiota** (33 vanhaa + 3 uutta työpöytävartiota) |

## 6. Huomioita

- **`tests/rules.test.mjs` vaati ennen `asetaPaivakirjanKoko(puhelinTila())`.**
  Vartio päivitettiin seuraamaan porttia (`tekstitPiilossa()`) ja
  vaatimaan lisäksi, että portti on määritelty vain yhdessä paikassa ja
  että pollo kysyy samaa porttia. Kiinteä epätosi ja ruutukokoehto ovat
  yhä kiellettyjä.
- **`savuke-iphone-tekstit.mjs` vaati `fact-kaiutin-syke` -animaatiota**,
  jonka #2504 poisti (merkki on nyt VU-mittari). Vartio luki siis
  poistettua ominaisuutta ja oli punaisena jo pohjahaarassa; se
  päivitettiin lukemaan kaarien tilaa. Tämä ei ole tämän muutoksen
  aiheuttama vika vaan #2504:n jälki.
- **Varaventtiili koskee myös tekstipiiloa:** jos luenta jää roikkumaan
  yli 30 s (`LUENNAN_VARAVENTTIILI_MS`), piilo purkautuu samalla kuin
  Liiku-nappi palaa. Tämä on tahallista: piiloon jäänyt teksti olisi
  umpikuja.
- Versionostoa, mergeä eikä Raamatun muokkausta ei tehty (toimeksianto).
