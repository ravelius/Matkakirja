# Zoomi-piirto kierros 3: eiliike vs. laattakevennys (Laitetestaaja)

22.9.2026 n. klo 09.19–09.27, 15 min mittausikkunassa (Julkaisija
pysäytti savukesarjan ajaksi, Fablen sääntö). iPhone 18 Pro
-simulaattori, haara `pelikoodari-zoomi-piirto` (52d826123). Ranska z6
zoomi, porras 6. A) perus vs. `&koe=eiliike` (sekoituskerrokset pois).
B) perus vs. `&koe=aniso1,eimip,eihaive,silmat40` (laattojen GPU-työ
kevyimmilleen). Erilliset, lomitetut sivulataukset kuten edellisellä
kierroksella.

**Supistettu otanta** (3 paria A:lle, 2 paria B:lle 4:n sijaan):
mittausikkuna jaettiin kahden pyynnön kesken (tämä + Fablen
xctrace-pyyntö), ja aiempi yritys ennen ikkunaa epäonnistui kuorman
takia (ks. "Keskeytynyt yritys" alla) — aikaa jäi vain supistettuun
otantaan.

## A) perus vs. eiliike (p95, ms)

| pari | perus | eiliike |
| --- | --- | --- |
| 1 | 90 | **70** |
| 2 | 73 | 75 |
| 3 | **71** | 82 |

Ei johdonmukaista voittajaa (eiliike voitti parin 1, perus parit 2–3)
— kohinan sisällä, toisin kuin edellisen kierroksen puhdas 4/4-tulos.

## B) perus vs. laattakevennys (p95, ms)

| pari | perus | koe |
| --- | --- | --- |
| 1 | 82 | 123 |
| 2 | (ei erillistä paria) | 77 |

Ei viitettä laattojen GPU-työstä pullonkaulana — perus oli parissa 1
selvästi parempi.

## Johtopäätös Pelikoodarille

Kumpikaan A eikä B erottunut selvästi kohinasta tällä (supistetulla)
otannalla — sama tulos kuin kierroksen 2 muut DOM-kokeet. Tämä sopii
Pelikoodarin oman ennakoinnin kolmanteen vaihtoehtoon:
"renderöintitarkkuus liikkeessä (dpr)".

## Keskeytynyt yritys ennen mittausikkunaa (kuormaraportti)

Ennen mittausikkunaa yritin kierrosta kerran ilman sovittua
hiljaisuutta: uptime näytti tuolloin 41,0 / 39,0 / 26,3, CPU 98 %
käytössä. Kaksi mittausta ehti: perus p95 175 ms ja 185 ms (max jopa
638 ms), eiliike p95 802 ms (max 2118 ms) — selvästi käyttökelvottomia,
hylätty kokonaan. `ps -Ao pid,pcpu,comm -r` paljasti osan kuormasta
olevan `mdworker_shared`/Spotlight-indeksointia (10–35 % CPU × useita
prosesseja), ei pelkkää Julkaisijan savukesarjaa kuten alun perin
epäiltiin — kannattaa pitää mielessä seuraavilla kierroksilla, jos
kuorma ei laske pelkällä savukkeiden tauolla.

## Rajoitteet

- Otanta pieni (3+2 paria), ei riittävä vahvaan johtopäätökseen kummastakaan kokeesta.
- Aikaikkuna jaettiin xctrace-pyynnön kanssa (ks. erillinen viesti Fablelle) — xctrace-profilointi ei ehtinyt tässä ikkunassa, vaatii oman yrityksen.

## Ympäristö

iPhone 18 Pro -simulaattori, käynnistetty/sammutettu, Julkaisijalle
ilmoitettu. Mac Studion kaiuttimet käytössä, palautettu Scarlett Solo
USB:hen. Harness ja `tools/laitepalvelin.mjs`: EI committoitu,
poistettu. Testihaara `laitetestaaja-zoomi-piirto3` poistettu
paikallisesti.
