# Liikevara-korjausten mittaus oikealla iPhonella (Laitetestaaja)

22.9.2026 n. klo 01.15–01.25. iPhone 18 Pro -simulaattori (oikea
Safari/Metal), haara `pelikoodari-nostojen-liikevara` (ace00538a):
liikkeessä ei täyttä ladontaa, rasteroinnit jonoon ≤1/kehys, rungon
rakennus kerran per ladonta, peiton osapäivitys, nostojen/nimien
liikevara. Sama menetelmä kuin
docs/raportit/sulavuus-ablaatio-iphone-20260921.md (synteettiset
pointer-tapahtumat kotelolle panorointiin, kirjaston `pointOfView`-
tween zoomiin, tulos luettu näytön päälle kirjoitetusta tekstistä).
Portaat 3, 4, 6 (Pelikoodarin pyyntö), Ranska z6 ja Camargue z8, pan +
zoom. Lisäksi vertailuksi nykyinen main (v2049, ei liikevara-korjauksia).

## Tulokset

| porras | näkymä | pan p95/max (ms) | pan >50 | zoom p95/max (ms) | zoom >50 | ladonta (ajettu/ohitettu/lykätty, pan→zoom) |
| --- | --- | --- | --- | --- | --- | --- |
| 3 +GL-nimet | ranska | 19/26 | 0 | 17/24 | 0 | 24/2/0 → 29/9/0 |
| 3 +GL-nimet | camargue | 29/81 | 1 | 25/85 | 1 | 47/11/1 → 57/13/1 |
| 4 +nostot/nappula | ranska | 24/78 | 3 | 18/36 | 0 | 25/2/2 → 29/9/2 |
| 4 +nostot/nappula | camargue | 24/97 | 4 | 22/83 | 2 | 48/10/16 → 59/12/26 |
| 6 tuotanto (liikevara) | ranska | 33/88 | 1 | 50/194 | 8 | 25/3/2 → 36/7/13 |
| 6 tuotanto (liikevara) | camargue | 25/77 | 1 | 31/79 | 4 | 54/8/18 → 72/9/36 |
| 6 tuotanto (**main v2049**, ei korjauksia) | ranska | 40/181 | 7 | 53/208 | 8 | — |
| 6 tuotanto (**main v2049**, ei korjauksia) | camargue | 25/114 | 4 | 22/84 | 1 | — |

## Havainnot

1. **Porras 3 ja 4 paranivat rajusti verrattuna 21.9. ablaatioon**
   (docs/raportit/sulavuus-ablaatio-iphone-20260921.md): Camargue
   porras 4 pan oli ennen 38/79 kehystä > 50 ms, nyt 4/209 — käytännössä
   korjattu. Porras 3 Camargue pan 20/134 → 1/203.
2. **Tavoite p95 < 25 ms täyttyy portailla 3–4 lähes kaikkialla**
   (yksi ylitys: camargue pan porras 3, p95 29 ms). Portaalla 6
   (tuotanto, kaikki kerrokset + pulu/ui/äänet) p95 nousee taas —
   erityisesti **Ranska zoom pysyy ongelmana molemmissa versioissa**
   (main p95 53/max208, liikevara p95 50/max194 — ei merkittävää eroa).
3. **Main-vertailu on ristiriitainen, ei yksiselitteinen parannus**:
   Ranska pan selvästi parempi liikevaralla (p95 40→33, >50 7→1),
   Camargue pan parempi (max 114→77, >50 4→1), mutta **Camargue zoom
   on huonompi liikevaralla** (p95 22→31, >50 1→4) ja Ranska zoom
   suunnilleen sama. `lykattyja`-laskuri kasvaa rajusti zoomissa
   (camargue porras6: 18→36) — lykätyt ladonnat saattavat purkautua
   zoomin lopussa yhtenä raskaana ladontana, mikä selittäisi Camarguen
   zoomin regression.
4. Portaalla 6 ladonta(ajettu) on selvästi pienempi kuin portailla 3–4
   (esim. ranska pan 25 vs. 24–25, mutta zoom-puolen `ohitettu` nousee
   portaalla 6 asti 7:ään Ranskassa) — CSS2D-kohteiden ja pulun lisäys
   näyttää muuttavan ladontatahtia, ei pelkkä nostot/nimet-kerros.

## Rajoitteet

Yksi ajo per kohta (ei toistoja), sama kohina-varaus kuin edellisessä
raportissa. Main-vertailu on eri sivulataus/eri hetki kuin
liikevara-ajo, ei rinnakkainen A/B — pieniä eroja (Camargue pan max
114 vs. 97) ei pidä ylitulkita.

## Ympäristö

iPhone 18 Pro -simulaattori, käynnistetty/sammutettu, Julkaisijalle
ilmoitettu. Mac Studion kaiuttimet käytössä, palautettu Scarlett Solo
USB:hen. Kaikki tilapäiset tiedostot (harness, laitepalvelin.mjs,
index.html-rivi) EI committoitu, poistettu; testihaarat
`laitetestaaja-liikevara` ja `laitetestaaja-main-vertailu` poistettu
paikallisesti.
