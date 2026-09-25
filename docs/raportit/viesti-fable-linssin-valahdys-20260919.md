# Viesti Fablelle: topografialinssin "välähdys" avauksessa (19.9.2026)

Haara `claude/bold-ride-vow4ki-linssin-valahdys`, pohja
`claude/bold-ride-vow4ki-v1947` (commit 6e153cf1).

PR #2590:n Savukkeet-ajossa (run 35401819516) oli punaisena

```
FAIL  390 px, luenta: avauksessa ei ole välähdystä suhteessa linssin lopputilaan
      — kehyksiä 58 (kattavuus 99 %), maksimi 132,1 vs vakiintunut 134,6
        (raja 149,6), paluu alas 111,5 (raja 15), mediaani 3 näytteestä
```

Ääni toimii nyt (oletusäänilaite korjattu), joten luenta on päällä ja
mittaus on aito. Kysymys oli, mikä tummenee ja millä kehyksillä.

## 1. Kehyssarja — MIKÄ tummenee

Savuke sai `KEHYSSARJA=1`-lipun: se kirjoittaa avauksen (t, kirkkaus)
-sarjan JSONina ja tummimman kehyksen ympäristön PNG:inä. Mitattu
Mac Studio, Chromium 1234, 390 × 844, dpr 2, Ateena, luenta päällä.
Kirkkaus on ruudun keskiöstä (16 % × 8 %), t = 0 on `valitseLinssi`.

```
t (ms) …  -595 … -4    4     12    266   291 … 673   683   692   702 …
kirkkaus  132,1        132,1 132,1 20,5  20,4  20,6  23,4  28,3  35,2
t (ms) …  749   792    845   900+
kirkkaus  80,9  100,7  127,5 134,6
```

Tummeneva asia ei ole kartta, meri, paikanpitäjälaatta eikä napakansi
vaan **odotuspeite** — linssin oma tumma lasi
(`js/linssit/topografia.js ODOTUSPEITE = rgba(20, 16, 10, 0.96)`).
Lasketaan: 0,96 × 16,5 + 0,04 × 132 = **21,2**, ja mitattu pohja on
20,4–20,6. Kyseessä on siis täsmälleen se kerros, jonka ODOTUSPEITE-
osio lupaa ("peli → tumma lasi → maasto"), ei mikään v1947:n uusista
muutoksista.

Kolme epäilystä pois suljettuna mittauksella:

* **a) astro-yo:n valoliuku/sävy ei vuoda.** `pyramidinReliefinValoliuku`
  ja `ASTRONAUTIN_SAVY` ajetaan vain haarassa `kerrokset.astronautti`,
  joka tulee `reliefiAstronautilla()`:sta eli `linssiTila ===
  'astronautti'`. Topografialinssi asettaa `asetaReliefiLinssi(true)`
  → tila `'topografia'`. Vakiintunut kirkkaus 134,6 on sama kuin ennen
  linssiä (132,1) — laatoissa ei ole vierasta liukua.
* **b) paikanpitäjä/napakansi ei ole se, mikä tummenee.** Pohja on
  20,5 eikä mikään reliefin tai meren sävy (avomeri ~62–100, jää 236);
  sama luku pysyy kehyksestä toiseen 420 ms eikä laattojen saapuessa
  muutu vähitellen.
* **c) tumma peite EI jää pidemmäksi eikä palaa.** Se nousee kerran ja
  väistyy kerran, häivytys 683 → 900 ms (moottorin oma 220 ms).

## 2. Juurisyy on MITTARI — ja se perustellaan

Väite mittaa "paluuta ylhäältä alas" ikkunassa, joka alkaa siitä
millisekunnista, jolloin **JS-kutsu** `valitseLinssi` tehtiin. Selain ei
ole silloin vielä ehtinyt maalata mitään linssin omaa: kehykset
t = 4 ms ja t = 12 ms olivat kirkkaudeltaan 132,1 eli **bitilleen sama
kuin linssiä edeltävä ruutu** (`seepia ennen linssiä` 132,1). Vartio
luki siis pelaajan oman edellisen näkymän ikkunan huipuksi ja tumman
lasin sen pudotukseksi.

Miksi vartio oli vihreä 18.9. (paluu alas 4,0)? Silloin mitattu
`seepia ennen linssiä` oli **61,2** ja ensimmäinen ikkunaan osunut
kehys oli jo peite — ikkunan sisällä kirkkaus vain NOUSI (21 → 114).
Nyt luenta on päällä ja ruudun keskiössä on iso luentakuva
(`div.fokusvirta-isokuva-ruutu.nakyy`, 74 780 px²), joten edeltävä
ruutu on 132 eikä 61. Sama peite, sama peli, eri vertailuluku.

Väite koskee omistajan sanoin *"vaalea kartta piirtyy ensin ja
topografia sen päälle"* — VAALEAA välivaihetta. Tumma lasi ei ole se,
ja paljas kartta mitataan omalla väitteellään vastakokeineen
(`paljaita 0 / 72` peitteen kanssa, `7 / 80` ilman).

**Korjaus (ei rajan löysennys).** Pudotusraja on yhä 15 yksikköä ja
huippuraja yhä `vakiintunut + 15`. Ikkunan ALKU siirtyy siihen
kehykseen, jossa ruutu ensimmäisen kerran muuttuu: alusta jätetään pois
ne kehykset, joiden kirkkaus on yhä linssiä edeltävä kirkkaus
(± 3 yksikköä). Ensimmäinen muuttunut kehys on mukana, ja jos ruutu ei
muutu lainkaan, mitataan koko ikkuna. Ohitettujen kehysten määrä
tulostetaan INFO-riville, jotta rajaus on luettavissa eikä piilossa.

## 3. Pelin puolen havainto ja mitä sille tehtiin

Kehyssarjassa näkyy toinenkin asia: **linssin valinnasta kului 254 ms
ilman yhtäkään uutta kompositorin kehystä** (viimeinen vanha kehys
12 ms, seuraava 266 ms). Napautus ei siis vastannut mitään neljäsosaan
sekuntiin, vaikka peite oli DOMissa jo 5 ms:n kohdalla. Syy on
pääsäikeen työ: `lauta.lepokerros().kokoa()` (koko näkyvän ikkunan
laattatyö) ajettiin ENNEN kuin peite ehti maalautua — linssiketju
`kokoa-ennen 1 → peite 5`.

Korjattu `js/linssit/topografia.js`:ssä: herätys siirtyy peitteen
jälkeen ja kahden kehyksen päähän (`kokoaHerate`), ja se puretaan, jos
linssi suljetaan ennen niitä. Peitteen vahti ei myöskään enää tulkitse
"kerros luovutti" -tilaa niin kauan kuin herätys on jonossa — muuten
peite olisi väistynyt ennen kuin laattatyö edes alkoi.

**Mitattu tulos, rehellisesti:** linssiketju `peite 1 → pallolle 1 →
kokoa-ennen 33 → kokoa 36`, ensimmäinen reliefikehys 62 → **85 ms**
(vartijan raja 400 ms). Pääsäikeen katkoa tämä EI poistanut: uusi sarja
on 33 ms (vielä vanha ruutu) → 292 ms (peite). Peitteen oma 220 ms:n
häivytys ehtii kokonaan katkon sisään, joten lasi tulee ruudulle
kerralla eikä liukuen. Ordinaalinen lupaus ("peite ennen raskasta
työtä") on nyt voimassa, mutta itse katko jää.

**Velka Fablelle (ei tämän erän työtä):** tumma lasi on ruudulla
292 → 790 ms eli noin puoli sekuntia, vaikka ensimmäinen reliefilaatta
on ruudulla 85 ms:ssä; lasi odottaa koko näkyvän ikkunan valmistumista
(`reliefiRuudulla`: `ladattavia === 0 && jonossa === 0`). Ehdotus, jos
omistaja pitää lasia liian pitkänä: peitteelle oma häivytysaika —
ILMESTYMINEN heti (0 ms, jolloin napautus vastaa ensimmäisessä
kehyksessä) ja VÄISTYMINEN entinen 220 ms. Se vaatii `kalvoRuudulle`en
erilliset siirtymäajat (`js/pallolauta/linssit.js`), eikä sitä tehty
tässä erässä ilman omistajan linjausta.

## 4. Luvut ennen ja jälkeen (sama kone, sama ruutu, sama asetus)

| mitta | ennen | jälkeen |
| --- | --- | --- |
| maksimikirkkaus avausikkunassa | 132,1 | 134,3 |
| vakiintunut (2 s jälkeen) | 134,6 | 134,6 |
| suurin paluu ylhäältä alas (raja 15) | **111,5** | **0,5** |
| seepia ennen linssiä | 132,1 | 132,0 |
| ikkunan alusta ohitettuja kehyksiä | – | 2 |
| paljaan kartan näytteitä (peite / vastakoe) | 0 / 7 | 0 / 7 |
| ensimmäinen reliefikehys | 62 ms | 85 ms |
| `VAIHE=avaus` | **12/13** | **13/13** |

## 5. Portit

* `node --test tests/*.test.mjs`: **# pass 3644 / # fail 0**
  (13 skipped, # tests 3657).
* `node tools/tarkista-niputus.mjs`: 398 moduulia, ei törmäyksiä.
* `node tools/build-standalone.mjs`: dist/matkakirja.html 32 785 kt.
* `VAIHE=avaus` (PORTTI=8852): 13/13.
* `VAIHE=meret` (PORTTI=8853): **4/4** — Välimeri merivärpikseleitä
  0,00 % (varalaattoja 27, tasavärejä 0), sauman hyppy 0 / napa 0,12,
  napa beigeä 0,21 %, Siperia seepiapyyntöjä 0 (72/72 laattaa, 404 = 0).
  Reliefi-merten linjat säilyivät muuttumattomina.

## MUUTETUT TIEDOSTOT

* `js/linssit/topografia.js` — laattakerroksen herätys peitteen jälkeen
  kahden kehyksen päähän (`kokoaHerate`), purku sulkiessa, peitteen
  vahti ei luovuta herätystä odottaessa.
* `tools/savukkeet/savuke-topografialinssi.mjs` — avausikkuna alkaa
  ensimmäisestä muuttuneesta kehyksestä (ohitetut kehykset INFO-
  riville); `KEHYSSARJA=1` kirjoittaa kirkkaussarjan ja kehykset
  levylle diagnoosia varten.
