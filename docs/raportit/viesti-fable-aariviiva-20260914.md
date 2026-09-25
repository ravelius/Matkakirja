# Viesti Fablelle: maan punainen ääriviiva — katkot, väri ja leveys

**Erä:** KARTTAUUDISTUKSEN PAATOKSET 11 kohta 2 (omistaja 14.9.2026 klo 13.20 UTC,
sanatarkasti: *"jostain syysta kartan punainen aariviiva ei piirry koko matkalta.
aariviiva saisi olla murretumpi ja tummempi punainen ja aariviiva hieman leveampi."*)
**Haara:** `claude/bold-ride-vow4ki-aariviiva` (pohja `claude/bold-ride-vow4ki`)
**Ei versionostoa** — Fable versioi ja julkaisee.

---

## 1. Juurisyy yhdellä lauseella

**Kehä piirtyy koko matkalta — se on saapumiskohtauksen kortti, joka peittää
sen: kun kortti on ruudulla, rajasta näkyy työpöydällä 0 % ja puhelimella
25–28 %, ja kun kortti on ohi, 100 %.**

Sen lisäksi viiva oli ohut (2,5 css-px) ja vaalea (`--mark` #b03a2b, kontrasti
seepiapaperiin 4,47), joten kortin puoliläpinäkyvien reunojen läpi näkyvä osuus
luki katkonaisena myös siellä, missä se oli ehjä.

## 2. Mitä mitattiin ja missä järjestyksessä

Mittaus on Playwrightilla (Chromium `/opt/pw-browsers/chromium`), Fogg
Pariisissa, pallolauta, kaksi ruutua (puhelin 390 × 844 ja työpöytä
1400 × 900) ja kaksi kameraa (saapumisnäkymä `altitude` 0,55 ja yksi
zoomiporras sisään 0,30). Menetelmä: kohdemaan renkaan JOKAINEN näkyvä piste
projisoidaan ruudulle pallon omalla `getScreenCoords`illa, ja kuvakaappauksesta
katsotaan, onko sen kohdalla (±3 css-px) rajan väriä.

Matkan varrella tuli neljä väärää jälkeä, ja ne on syytä kirjata, koska ne
selittävät miksi juurisyy näytti ensin toiselta:

| Epäilty | Mittaus | Tulos |
|---|---|---|
| Renkaita katoaa (MultiPolygon, Korsika, merentakaiset) | kerroksen `korostusRenkaita` vs. aineisto | 16 = 16, ei katoa |
| Jänteen painuma pallon pinnan alle | FRA:n jänteistä mediaani 0,031°, p99 0,16°, max 0,50° → painuma enintään 9,3 · 10⁻⁴ yksikköä (R = 100) | liian pieni selittämään |
| Syvyystesti / laattojen peitto | `depthTest` pois ja laatat pois: punapikselit 5 272 → 11 102 ja 11 140 | **artefakti**: ensimmäinen kaappaus oli otettu kortin ollessa ruudulla |
| Säteen nosto pinnasta | pyyhkäisy 0 · 10⁻⁵ … 1 · 10⁻³ | 5 898 → 5 921 px (alt 0,5) ja 7 641 → 8 191 px (alt 0,12), eli ei vaikutusta |

Viides, oikea: kaappaus kortin ollessa ruudulla ja kortin mentyä. Sama kamera,
sama peli, ainoa ero on kortti.

| Näkymä | peitto kortin kanssa | peitto kortin jälkeen |
|---|---|---|
| puhelin, saapumisnäkymä | 24,7…27,8 % | **100 %** |
| työpöytä, saapumisnäkymä | 0 % | **100 %** |
| puhelin, zoomiporras | 100 % | 100 % |
| työpöytä, zoomiporras | 100 % | 100 % |

Kortti on ruudulla noin kaksi ja puoli minuuttia, sen `pointer-events` on none
(`elementFromPoint` näkee sen läpi) eikä ohjelmallinen napautus ohita sitä —
kokeiltu kolmella tavalla. Savuke odottaa kohtauksen ohi, kuten pelaajakin.

**Sivuhavainto Fablelle:** kortin lisäksi maapaneeli (*"aivan liian iso"*,
PAATOKSET 11 kohta 1) peittää saapumisnäkymässä Biskajanlahden puolelta osan
rannikkoa. Se on toisen agentin työn alla, eikä siihen koskettu täällä.

## 3. Mitä muutettiin

### Väri: `--raja-punainen` #853124

Uusi CSS-muuttuja `--raja-punainen` (css/styles.css). `--mark` #b03a2b jää
ennalleen kartan muille merkinnöille (lentoreitti, sinettivaha, maakäyrät,
vertailuvalinta) — kehälle pyydettiin murretumpi ja tummempi sävy, eikä sitä
saa vaihtaa muiden alta. Muuttuja on silti YKSI TOTUUS: tasokartta
(`.maatummennus-viiva`) ja pallo (`js/pallovektorit.js korostuksenMuste`)
lukevat saman.

Kolme vaihtoehtoa mitattuna (kuva
`kuvat/aariviiva-varivaihtoehdot-20260914.png`: sarakkeet = vaihtoehdot,
rivit = seepiapaperi, värillinen maa, meri):

| sävy | kylläisyys | vaaleus | kontrasti paperiin #efdcb4 | värilliseen maahan (230,219,172) |
|---|---|---|---|---|
| `--mark` #b03a2b (ennen) | 61 % | 43 % | 4,47 | 4,33 |
| #8f3326 | 58 % | 35 % | 5,83 | 5,65 |
| **#853124 (valittu)** | **57 %** | **33 %** | **6,32** | **6,13** |
| #7a2e22 | 56 % | 31 % | 6,94 | 6,73 |

Keskimmäinen valittiin ohjeen mukaisesti: se on selvästi murretumpi ja
tummempi kuin `--mark` (−4 prosenttiyksikköä kylläisyyttä, −10 vaaleutta) ja
nostaa kontrastin 41 %, mutta pysyy seepiapaletin lämpimän punaisen asteikolla
eikä mene ruskean puolelle kuten uloin vaihtoehto.

### Leveys: 2,5 → 3,1 css-px (lähipää)

`VEKTORIT_KOROSTUS_LEVEYS_CSS` [1,7, 2,5] → [2,1, 3,1]. Kaukopää liukuu samassa
suhteessa, jottei yleiskuva paksune tolpaksi. Mitatut ajonaikaiset leveydet
(materiaalin `linewidth`, css-px, sisältää pehmennysvyöt):

| ruutu | saapumisnäkymä | zoomiporras |
|---|---|---|
| puhelin 390 × 844 | 2,87 | 3,07 |
| työpöytä 1400 × 900 | 3,55 | 3,55 |

**Tasokartan kehä EI leventynyt.** Siellä 3 px mitattiin 1.9.2026 tolpaksi, joka
peitti Bretagnen pikkusaaret (`js/maatummennus.js TUMMENNUS_VIIVA`); pallolla
saaret piirtyvät laatoista eri mittakaavassa eikä sama mittaus päde.

### Päätypyörylät takaisin kohdemaan kehälle

`pehmennaLineMaterial` sai valinnan `paatypyorylat`. LineSegments2 piirtää
jokaisen janan omana nelikulmiona, eivätkä peräkkäiset janat kohtaa kulmassa —
päätypyörylä on se, mikä kulman täyttää. Pyörylä leikattiin 7.9.2026 pois,
koska LÄPINÄKYVÄ rantaviivan muste kasautui kärjissä tummaksi; kohdemaan kehä
piirretään täydellä peitolla (`KOROSTUS_PEITTO` 1), eikä täysin peittävä muste
voi kasautua. Rantaviiva ja maiden raja jäävät ennalleen.

Rehellisyyden nimissä: tämä ei näy savukkeen peittomitassa (±3 css-px sieto
peittää yhden pikselin lovet), vaan se on kulmien siisteyttä lähikuvassa. Se on
kirjattu tähän eikä myyty korjauksena katkoihin.

### Ei tehty

Ei kaksoisviivaa eikä käsinpiirtojäljittelyä (PAATOKSET 7:n peruutus pysyy), ei
laattojen uudelleenpolttoa, ei Raamattuun, ei versionostoa, ei muutoslokiriviä.

## 4. Savuke ja vastakoe

`tools/savukkeet/savuke-maan-aariviiva.mjs` — 54 vartiota (2 ruutua × 2 kameraa
× 13 + sivun terveys). Vartiot: renkaita yhtä monta kuin aineistossa,
peitto ≥ 90 %, kahdeksan nimettyä kohtaa rajaa (Pyreneet, Atlantin rannikko,
Bretagne, Kanaali, Belgia, Rein, Alpit, Välimeri), väri = `--raja-punainen`
eikä `--mark`, leveys yli entisen 2,5 px.

```
54/54 vartiota läpi
  puhelin-saapuminen   peitto 100,0 %   #853124 / 2,87 px   renkaita 16/16   kaikki 8 kohtaa +
  puhelin-zoom         peitto 100,0 %   #853124 / 3,07 px   renkaita 16/16   kaikki 8 kohtaa +
  tyopoyta-saapuminen  peitto 100,0 %   #853124 / 3,55 px   renkaita 16/16   kaikki 8 kohtaa +
  tyopoyta-zoom        peitto 100,0 %   #853124 / 3,55 px   renkaita 16/16   kaikki 8 kohtaa +
```

**VASTAKOE** (`SAVUKE_VASTAKOE=1`: kehä palautetaan ajossa entiseksi —
`--mark`, 2,5 px, ei päätypyörylöitä):

```
46/54 vartiota läpi
  FAIL  <näkymä>: väri on paletin --raja-punainen — #b03a2b ≠ #853124   (4 ×)
  FAIL  <näkymä>: väri ei ole --mark — #b03a2b                          (4 ×)
```

Savuke siis mittaa juuri sitä, mikä muuttui. Peittovartio pysyy vihreänä myös
vastakokeessa, koska peitto ei ollut korjattava asia — kortti oli.

## 5. Kuvat

- `kuvat/aariviiva-tyopoyta-saapuminen-20260914.png` — työpöytä, saapumisnäkymä,
  kortin jälkeen: kehä ehjä koko matkalta.
- `kuvat/aariviiva-tyopoyta-zoom-20260914.png` — sama yksi zoomiporras sisään.
- `kuvat/aariviiva-puhelin-saapuminen-20260914.png` — puhelin 390 × 844.
- `kuvat/aariviiva-koillisraja-20260914.png` — koillisraja (Belgia–Rein–Alpit)
  lähikuvana: se rajan osa, joka on aineistossa rosoisinta siksakkia.
- `kuvat/aariviiva-varivaihtoehdot-20260914.png` — kolme sävyä kolmella
  taustalla, viivanleveydet 2,5 ja 3,1.

## 6. Portit

| portti | tulos |
|---|---|
| `npm test` | # pass 3354, # fail 0 |
| `node tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |
| `node tools/tarkista-niputus.mjs` | niputus kunnossa: 387 moduulia, 4211 top-level-julistusta |
| `savuke-maan-aariviiva.mjs` | 54/54; vastakoe 46/54 |

Huom: `tools/tarkista-savukkeet.mjs` (koko savukesarja) ei mahtunut tämän ajon
aikabudjettiin; uusi savuke ja sen vastakoe ajettiin erikseen yllä olevin
tuloksin. Sarja kannattaa ajaa ennen julkaisua.

## 7. Muutetut tiedostot

- `css/styles.css` — uusi `--raja-punainen`, `.maatummennus-viiva` lukee sen.
- `js/pallovektorit.js` — `KOROSTUS_MUSTE` #853124, `korostuksenMuste` lukee
  `--raja-punainen`, leveys [2,1, 3,1], `pehmennaLineMaterial({ paatypyorylat })`,
  mittari `korostusRenkaita`.
- `tests/maakorostus.test.mjs` — väri sidottu `--raja-punainen`iin, uusi ehto
  "murretumpi ja tummempi kuin --mark".
- `tools/savukkeet/savuke-maan-aariviiva.mjs` — uusi savuke.
- `docs/raportit/viesti-fable-aariviiva-20260914.md` ja `docs/raportit/kuvat/` —
  tämä raportti ja sen kuvat.
