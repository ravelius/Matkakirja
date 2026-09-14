# Tiivistetty kaupunkietusivu lehden kehykseen; turisti-info suoraan isoon muotoon

Opus-työagentti Fablelle 14.9.2026. Haara
`claude/bold-ride-vow4ki-etusivu2` (pohja `claude/bold-ride-vow4ki`).
Omistajan päätös: Raamattu, osio "Kaupungit", **KARTTAUUDISTUKSEN
PAATOKSET 11**, kohdat 3–4.

> *"kaupunkia klikkaamalla piti avautua muutettu kaupunkilehti. sisalto
> on oikea, mutta sen ulkoasu saisi olla tasmalleen sama kuin
> kaupunkilehdessa kaikilta osin (myos pop upin leveys)"*
>
> *"turisti info nappi pitaisi olla pariisin vieressa ja se saisi
> suoraan aueta isoon muotoon (jata pienempi vali popup pois
> kokonaan)"*

Ei versionostoa, ei muutoslokiriviä, ei tekstimuutoksia, ei Raamattua.
Vanha kaupunkilehti on rivilleen koskematon.

## 1. Mitattu juurisyy (A): kortti ei ollut lehti vaan kartan kaluste

Erä 10 latoi tiivistetyn etusivun **karttanoston omaan korttiin**
(`.kaupunkipopup`, `js/kaupunkinosto.js` `avaaKortti`). Sisältö oli
oikea, mutta kortin leveys, paperi, kehys ja kirjasimet ovat kartan
kalusteen — eivät lehden. Mitattuna Playwright/Chromiumilla (Pariisi,
`?lauta=pallo`):

| Mitta | KAUPUNKILEHTI 390 px | vanha kortti 390 px | KAUPUNKILEHTI 1400 px | vanha kortti 1400 px |
| --- | --- | --- | --- | --- |
| leveys | 390 px | **358,8 px** | 960 px | **1154 px** |
| pehmuste | 0 / 15,2 / 41,6 px | **13,6 / 15,2 / 15,2 px** | 0 / 35,2 / 35,2 | **13,6 / 15,2 / 15,2** |
| tausta | #f5f0e2 + paperirakeisuus | #f5f0e2, **ei rakeisuutta** | sama | sama |
| kehys | leikattu reuna, 0 px pyöristys | **1 px ruskea, 12 px pyöristys** | sama | sama |
| pyöristys | 0 px | **12 px** | 0 px | **12 px** |
| otsikon kirjasin | American Typewriter 30,4 px / 700 | **Iowan Old Style 18,4 px** | 44,8 px | **18,7 px** |
| leipätekstin kirjasin | American Typewriter 16 px | **Iowan Old Style 14,7 px** | 16 px | **14,7 px** |

## 2. Korjaus (A): SAMA kehys, ei kopioitua tyyliä

`js/lehti.js` sai yhden uuden exportin **`avaaTiivisLehtiarkki`**
(tiedoston loppuun; vanhat funktiot rivi riviltä koskemattomina). Se
avaa `<dialog class="dialog lehti arkki">` -kehyksen, jonka sisällä on
`<div class="dialog-card arrival-card">` ja
`.arrival-palstat > .arrival-palsta` — **täsmälleen ne luokat, joilla
kaupunkilehti aukeaa** (index.html `#arrival-dialog`, js/ui.js
`openArrival` lisää `arkki`, `rakennaSivut` lisää `lehti`). Leveys
kirjoitetaan samalla `ui.mitoitaArkki`lla, joka sai valinnaisen
arkki-parametrin (ilman argumenttia funktio on rivilleen entinen).

Yhtään tyyliarvoa ei kopioitu. Kaksi css-sääntöä oli kirjoitettu vain
id:lle; niiden **valitsinlistaan lisättiin** sama lehden luokka, joka on
nyt myös index.html:n omassa elementissä:

- `#arrival-city` → `.lehti-nimio` (nimiön typografia, tarttuvuus, väri)
- `#arrival-intro` → `.lehti-leipa` (koko, kaksipalstaisuus, anfangi)

Vanhan elementin id-sääntö on ennallaan, joten kaupunkilehden kaskadi ei
muutu. Samoin sulkunappi (`.lehti-arkkinappi`) lisättiin lehden
hampurilaisen olemassa olevaan sääntöön ja vain peilattiin oikeaan
reunaan — mittoja ja värejä ei toisteta.

`js/kaupunkinosto.js` `latoTiivisEtusivu` latoo nyt lehden omiin
paikkoihin (`.lehti-paakuva`, `.lehti-kuvarivi`, `.lehti-leipa`, nappi
`.wiki-btn`) eikä kortin omiin kääreisiin. Sisältö on sama kuin erässä
10: herokuvat → kohdekartta → leipätekstin 1. kappale → **Lue loppuun**.

### VANHA / UUSI, erotus 0 (savukkeen mittaamat, Pariisi ja Marseille)

| Mitta | 390 px VANHA / UUSI | 1400 px VANHA / UUSI | erotus |
| --- | --- | --- | --- |
| leveys | 390 / 390 | 960 / 960 | **0** |
| pehmuste | 0px 15.2px 41.6px / sama | 0px 35.2px 35.2px / sama | **0** |
| taustaväri | rgb(245,240,226) / sama | sama | **0** |
| taustakuvio | paperirakeisuus / sama | sama | **0** |
| kehys | 0px none / sama | 1px solid rgba(0,0,0,0) / sama | **0** |
| pyöristys | 0px / 0px | 0px / 0px | **0** |
| otsikkofontti | American Typewriter 30,4 px 700 / sama | 44,8 px 700 / sama | **0** |
| leipäfontti | American Typewriter 16 px 400 / sama | 16 px 400 / sama | **0** |
| dialogin luokat | dialog·lehti·arkki / sama | sama | **0** |
| kortin luokat | dialog-card·arrival-card / sama | sama | **0** |

Vain sisällön korkeus eroaa — se on tiivistyksen tarkoitus.

### Sivulöydös: kortti oli näkymätön 1,7 sekuntia

Ensimmäisellä mittauskierroksella leveys oli 1400 px:n ruudulla 948,8
eikä 960. Syy ei ollut ladonnassa vaan avausanimaatiossa: kortti syntyy
SULJETUN dialogin sisällä, ja Chromium jätti `.dialog-card`in
`card-in`-animaation odottamaan (mitattu: tila "running", currentTime 0,
**opacity 0** vielä 1,2 s avaamisen jälkeen; se purkautui vasta ~1,7
sekunnissa). Kortti oli siis oikeasti näkymätön ja 97-prosenttinen.
Korjattu nollaamalla animaatio joka avauksella — samalla kortti liukuu
esiin joka kerta eikä vain ensimmäisellä.

## 3. Mitattu juurisyy (B): turisti-info ei pysynyt vieressä

Merkin siirto oli ASTEITA (`TURISTI_INFO_SIIRTO` 1,5° / −0,75°). Aste on
maantieteellisesti kiinteä, mutta ruudulla se on sitä useampi pikseli
mitä lähempänä kamera on. Mitattu Pariisissa saapumisnäkymässä:

| Ruutu | kaupunkipiste | turisti-info | etäisyys |
| --- | --- | --- | --- |
| 390 × 844 | (203, 394) | (236, 409) | **36 px** |
| 1400 × 900 | (722, 326) | (815, 370) | **103 px** |

Sama siirto siis kolminkertaistui työpöydällä: merkki ei ollut enää
Pariisin vieressä vaan sen naapurissa.

## 4. Korjaus (B): ruutusiirto, joka mitataan kamerasta

Uusi `TURISTI_INFO_RUUTUSIIRTO = { dx: 36, dy: 16 }` on **ruutupikseleitä**
(≈ 39 px, sama luku, joka erässä 4 mitattiin hyväksi). Asteet lasketaan
siitä käänteisellä Jacobin matriisilla, jonka alkiot mitataan kamerasta
joka ladonnassa: kolme `getScreenCoords`-näytettä (kaupunki, +1° lev,
+1° pit) kertovat, montako pikseliä yksi aste juuri nyt on. Kaava ei siis
oleta projektiosta mitään. Merkki on yhä karttaan kiinnitetty datum
(PAATOKSET 2) — asteet lasketaan uudestaan joka levossa. Jos näytteet
eivät kelpaa (kaupunki pallon reunalla), palataan vanhaan astesiirtoon.

**Turisti-infon uusi paikka lukuina** (savukkeen mittaama, kaupungin
merkistä):

| Ruutu | Pariisi | Marseille |
| --- | --- | --- |
| 390 × 844 | **40 px** | **40 px** |
| 1400 × 900 | **40 px** | **40 px** |

Kaupungin nimen päälle merkki ei mene: merkin ruutulaatikko on jo
nimiladonnan varaus (`js/pallolauta/lauta.js`: `varaukset: [...nostoTulos
.laatikot, ...infoTulos]`), ja savuke mittaa erikseen, ettei yksikään
ladottu nimilaatikko limity sen kanssa (0/N molemmilla ruuduilla).

**Napautus avaa suoraan ison muodon.** Merkin `avaa` kutsuu nyt
`avaaTuristiOpas`ia, joka avaa saman `avaaNahtavyys`-arkin
(`#nahtavyys-dialog`, `opas-arkki`) kuin matkailuliitteen kolme
sisäänkäyntiä. Välipop-up `avaaTuristiInfo` jää moduuliin tyyleineen ja
testeineen, mutta **poistuu tästä polusta kokonaan** — savuke vaatii,
ettei `.kaupunkipopup-info` ole DOMissa napautuksen jälkeen. Kaikilla
190 kaupungilla, joilla on `matkailijalle`, on myös `artikkeli.teksti`
(tarkistettu datasta), joten merkin ehto riittää oppaan ehdoksi.

## 5. Savuke ja vastakokeet

`tools/savukkeet/savuke-kaupunkietusivu.mjs` laajennettiin: se avaa nyt
myös VANHAN kaupunkilehden samassa selaimessa ja vertaa kymmentä mittaa,
sekä mittaa turisti-infon etäisyyden, limityksen nimien kanssa ja
oppaan avautumisen.

```
NODE_USE_ENV_PROXY=1 PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers \
  node tools/savukkeet/savuke-kaupunkietusivu.mjs
→ 144/144 vartiota läpi
```

**VASTAKOE A** (`avaaTiivisKaupunkietusivu` takaisin `avaaKortti`-kehykseen):
`FAIL tiivis etusivu on kaupunkilehden kehyksessä — uusi null vanha
["arkki dialog lehti","arrival-card dialog-card"]`. Vartio punainen. ✅

**VASTAKOE B** (merkin `avaa` takaisin `avaaTuristiInfo`iin): 8 vartiota
punaiseksi, mm. `FAIL merkin napautus avaa SUORAAN ison oppaan —
{"auki":false,...,"valipopup":1}` ja `FAIL välipop-upia ei ole DOMissa —
1 kpl`; 136/144. ✅

Molemmat vastakokeet purettiin ja lopullinen ajo on 144/144.

## 6. Portit

| Portti | Tulos |
| --- | --- |
| `npm test` | pass 3353, fail 1 (`haku on nopea myös koko aineistolla`, ks. alla) |
| `node tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |
| `node tools/tarkista-niputus.mjs` | 387 moduulia, ei törmäyksiä |
| `tools/tarkista-savukkeet.mjs` | läpi |

**Ainoa punainen on kuormavartio, ei koodi.** `tests/pollo.test.mjs`:n
kaksi SUORITUSKYKYvartiota ("indeksi rakentuu ja on kokoluokaltaan
järkevä", "haku on nopea myös koko aineistolla") ovat seinäkelloon
sidottuja (`kesto < 250 ms`, `indeksointi < 3000 ms`). Kolmella
peräkkäisellä koko sarjan ajolla punaiseksi meni joka kerta ERI vartio
näistä kahdesta (3329 ms / 4240 ms / 376 ms) — tyypillinen kuormaheitto
konttiympäristössä. **Yksinään ajettuna sama tiedosto on 124/124, fail
0** (varmistettu kahdesti). Muutokset eivät koske Pulun indeksiä,
hakua eivätkä mitään niiden lähdettä.

## 7. Mitä EI tehty

- Ei tekstimuutoksia, ei uutta sisältöä.
- Ei muutoksia vanhaan kaupunkilehteen (`rakennaSivut`,
  `naytaTutkiSivu`, sivupino, `ui.lehtitila`) eikä sen dataan.
- Ei versionostoa, ei muutoslokiriviä, ei Raamattua, ei mergeä, ei dist/.
- Ei koskettu `js/pallolauta/maapaneeli.js`:ään eikä maan rajaviivan
  piirtoon (toisen agentin työ).

## 8. Kysymys Fablelle

Tiiviissä etusivussa EI ole lehden mastoa ("Unohdettu aarre" -kicker
eikä päiväysriviä), koska toimeksianto rajasi sisällön neljään lohkoon.
Jos omistajan *"täsmälleen sama ulkoasu kaikilta osin"* tarkoittaa myös
mastoa, se on yhden rivin lisäys samoilla piirtäjillä — sano, niin
lisätään.

## 9. Kuvat

| Kuva | Mitä |
| --- | --- |
| `kuvat/era11-kartta-390.jpg`, `kuvat/era11-kartta-1400.jpg` | turisti-infon merkki Pariisin vieressä (40 px molemmilla) |
| `kuvat/era11-etusivu-390.jpg`, `kuvat/era11-etusivu-1400.jpg` | tiivistetty etusivu kaupunkilehden kehyksessä |
| `kuvat/era11-opas-390.jpg`, `kuvat/era11-opas-1400.jpg` | merkin napautus → iso matkailijan opas, ei välipop-upia |
