# Viesti Fablelle — laattapyramidi, erä 2 (30.8.2026)

Haara `claude/pyramidi-pilotti`. Ei versionostoa, ei PR:ää.
Oletuspolku ei muutu. **Portit: 1048 pass / 0 fail.**

Kohdat 1–6 tehty ja mitattu. **Pysähdyn tähän, kuten pyysit** —
täysgenerointia ei ole ajettu.

Täysi suunnitelma ja kaikki luvut: **docs/moduulit/laattapyramidi.md**.

---

## Portit

| portti | tulos |
| --- | --- |
| `node --test tests/*.test.mjs` | **1048 / 0** (karttarivisi vihersi sen) |
| `tarkista-kaksoisavaimet` · `tarkista-niputus` | puhtaat |
| `savuke-laattapyramidi` | **13/13** |
| `savuke-fokuskartta` | 66/80 (main-peräinen 65/80) |
| `savuke-bittikartta` · `savuke-karttazoom` | main-peräisellä tasolla |

## 1. Arkki 84 °N…66 °S — ja origo EI siirtynyt

Tämä oli erän suurin riski, ja se osoittautui olemattomaksi.
Projektion vakiot ovat koskemattomat, joten **y = 0 on yhä 76.
leveyspiiri** (todennettu: `lautaLat(0)` = 76,0000) ja **jokainen
esilaskettu piste on entisellä paikallaan** (Ateena y=1882 →
37,9699 °N, kuten ennen). Vain kuvan laatikko alkaa laudan yläpuolelta,
y = −1046,31 — täsmälleen kuten yleislehdellä jo oli.

**Mekaanista muunnosta ei siis tarvittu mihinkään.** js/fokusmitat.js
ja packien `laudat.maailmankartta` ovat koskemattomia. Merkin ja
maaston suhde ei liikkunut, koska molemmat luetaan samasta laudan
koordinaatista.

Uudet mitat: arkki 12000 × **7307,72**, syvin taso 86 400 × **52 616**,
169 × 103 = **17 407** laattaa, yhteensä **23 340** laattaa.

## 2. Atlaskehys — tehty

Kermanvalkoinen marginaali, kaksoisviivakehys kulmakorein, kartussi
"MATKAKIRJA — Unohdettu aarre", painajanrivi, kompassiruusu,
mittakaavajana. **JÄÄMERI mahtuu nyt mukaan.**

Kehys on arkilla **joka tasolla**, ei vain uloimmalla: mitat
skaalautuvat, joten se on kaikilla tasoilla saman kokoinen kartalla.
Jos marginaali olisi vain uloimmalla, arkin korkeus vaihtelisi
tasoittain eikä ruudukko olisi pyramidi.

## 3. Sisältö laattoihin — tehty ennen täysajoa

261 kaupunkia · 408 reittiä (+71 lentoreittiä) · 123 jokea polyviivoina
· 38 järveä · 52 vuorta · 197 kohdetta. Kaikki laudan yksiköissä, ei
uudelleenprojisointia — siksi merkit osuvat laattoihin pikselilleen.

**Yksi asia tehtiin ensin väärin, mitattiin ja korjattiin.** Nimiöt
mitoitettiin aluksi kuten moottorin muut mitat, eli saman kokoisiksi
KARTALLA joka tasolla. Se on oikein rannikon viivalle ja rakeelle,
mutta väärin nimiölle: koska peli katsoo valittua tasoa noin 1:1, 14
pikselin nimi olisi uloimmalla tasolla 1,5 px ja syvimmällä **189 px**.
Nimiöt, pisteet ja viivat mitoitetaan nyt laitepikseleinä.

Yleistys kynnyksin, jotka on johdettu nimiötiheydestä eikä mausta:
kaikki kaupunkinimet z3:sta, vain isot z2:sta, kohteet z5:stä.

## 4. webp 0,9 — tehty

## 5. Harva pyramidi pois — tehty (koneisto jää, oletuksena pois)

Tuore mittaus uudella arkilla vahvisti päätöksen: z7:llä 37,0 %
laatoista, mutta tavuissa vain noin viidennes — mitattu z5:ltä
oikeista tiedostokoista, 7,1 % laatoista = **4,7 % tavuista**.

## 6. Meri — tehty, mutta yksi asia on kerrottava

Vesiviivoitus pois (`VESIVIIVOITUS = null`), litistys 0,20 → 0,70.

**Syvyysrampin ensimmäinen korjaus mitattiin vääräksi ja hylättiin.**
Tihensin ensin rampin käsin 7 → 17 portaaseen. Mittasin: se **pahensi**
syvän meren pahimman gradientin taitteen 6,9:stä 12,3 sävyyn tuhatta
metriä kohti, koska jokainen silmämääräinen välipiste tuo oman
taitteensa. Banding on taite, ei portaiden vähyys.

Tilalle tuli monotoninen kuutiollinen interpolointi (Fritsch–Carlson)
alkuperäisten seitsemän ankkurin läpi, 25 m välein:

| | portaita | kontrasti | pahin taite (alle −200 m) |
| --- | --- | --- | --- |
| vanha | 7 | 42,0 | 6,94 |
| käsin tihennetty (hylätty) | 17 | 42,0 | 12,31 |
| **monotoninen kuutio** | 201 | **42,0** | **1,84** |

Kokonaiskontrasti ennallaan, jokainen ankkuri paikallaan (0,55 sävyn
tarkkuudella), ramppi monotoninen (0 nousevaa askelta).

### KERROTTAVA: pyramidi ei aja patinapassia lainkaan

`tools/patina.mjs` on erillinen jälkikäsittely, jonka
`patinoi-fokus.yml` ajaa valmiille **lehdille**. Pyramidin
generointiputki ei kutsu sitä. Siksi:

- syvyysrampin silotus **vaikuttaa pyramidiin heti** (se on
  piirtomoottorissa),
- **vesiviivoituksen sammutus ja litistyksen nosto eivät vaikuta
  pyramidiin lainkaan** — ne muuttavat vain vanhaa lehtiputkea.

Raamattu vaatii patinan poltettavaksi laattoihin. Patinapassin
liittäminen pyramidiin on siis oma tehtävänsä; en tehnyt sitä
kulukuurin takia. Sanoit "kerro se" jos meri jää tyhjäksi — pyramidin
meren sävyn vaihteluväli on nyt 11 sävyä R-kanavalla: hillitty, ei
tyhjä. En palauttanut litistystä omin päin.

## Mitatut luvut uudelle arkille

| | mitattu |
| --- | --- |
| z0–z5 koko maailma | **1 513 laattaa, 27,50 Mt, 324 s** |
| z6–z7 Kreikka | 60 laattaa, 0,79 Mt, 37 s |
| Nopeus (lohko 4×4) | **1,17 Mpx/s** |
| Koko pyramidi | 23 340 laattaa, 6 061 Mpx, **207–314 Mt** |
| **Täysajo yhdellä säikeellä** | **1,44 h** |
| Viidellä agentilla | **~25 min** |

Koko kasvoi edellisestä mittauksesta (122–166 Mt) kolmesta tunnetusta
syystä: laatu 0,82 → 0,9, arkki +14 % (kehys) ja sisältö laattoihin.
Yhä kaukana 690 Mt:n arviosta.

Selaimessa (iPhone-profiili, syvin taso z7): **25 laattaa näkymässä,
26,2 Mt purettuna, 0 epäonnistunutta hakua, päivitys alle
mittaustarkkuuden, kehysaika p50 16,7 ms** (emulaattoriluku — oikea
iOS-laite on yhä omistajan tehtävä).

## Parven työnjako (vaihe 2, kun annat luvan)

| agentti | erä | aika |
| --- | --- | --- |
| 1 | z0–z6 kokonaan | 22 min |
| 2–5 | z7 neljänä pituuskaistana (43 saraketta) | 16 min kukin |

**Kaistarajat lohkorajoille** (sarake jaollinen neljällä): alueajossa
4×4-lohko hukkaa reunoilla työtä (Kreikan ajossa 62 %, koko maailman
ajossa 0 %).

## Avoimet

1. **Patinapassi ei ole osa pyramidia** (yllä). Tämä kannattaa
   ratkaista ennen täysajoa, tai pyramidi ajetaan kahdesti — sama
   perustelu jolla sisältö tuotiin nyt.
2. **Kaupunkinimien törmäykset.** Nimet ladotaan laudan omilla
   la/lx/ly-siirtymillä eikä törmäyksenvälttelyä ole; Keski-Euroopassa
   z3:lla nimiä menee päällekkäin. Vaatii ladonta-algoritmin, oma
   työnsä. En korjannut.
3. **Syvyyskäyrät oikeasta datasta** — päätit myöhemmäksi eräksi.
4. Muistutus: jos `patinoi-fokus.yml` ajetaan uudestaan,
   `FOKUS_VUOSIKERTA` on nostettava (korkeusasteikko muuttaa yli
   2900 m maastoa).

## Laatat

Kontin scratchpadissa `scratchpad/pilotti2/` — **31 Mt / 1 573
laattaa**, ei repossa. Aineisto (`korkeus/`, `nedata/`) samassa
paikassa; uudelleenhaku ~50 s jos kontti kiertää.

## Sivussa nähtyä (en korjannut)

- `savuke-karttazoom.mjs` on `tools/`-juuressa, ei `tools/savukkeet/`.
- `tools/hero-tyolista-*.mjs` — 25 kertaluontoista ajotiedostoa juuressa.
