# Rosvon kaksintaistelu ja tapahtumakortti — laitetesti (23.9.2026)

## Uusinta (build 4b47b35, aanitapahtumat 342f45f): 7/7 OK

Gate: uusi build pysähtyy Aloitus-porttiin (`natiivi-ui/aloitus` mainissa) —
`ui aloita` (Documents/ui-komento.txt) ennen peli-komento.txt:ää. HUOM:
`ui aloita pariisi` EI toimi ("ei lähtökaupunki: pariisi" — Pariisi ei ole
Aloitus-lipulla merkitty lähtökaupunki); paljas `ui aloita` oletuksena
riittää samaan Pariisiin.

Kaikki 7/7 tarkistuspistettä odotetun mukaisia: r4-vastattu (vastattu
true, oikein true), r5-kartalla (Kartta/Toiminta), t1-kortti (laji
Tapahtumakortti, vastattu true), t2-loppu (Kartta, kyyti siirsi Luxemburgiin).
`aanet`-kenttä täsmää: r2 `[quizOpen]`, r3 `[quizOpen, robber]`, r4
`[quizOpen, robber, correct]` — t2:ssa ei näy erillistä turn/coin/ferry-
tapahtumaa, vain kasautunut kysymyslista (`[quizOpen, robber, correct,
quizOpen]`); ei tutkittu tarkemmin, mainitsen varmuuden vuoksi.

---


Ajettu simulaattorissa (iPhone 18 Pro, proto-master 08a9101), käsikirjoitus
`Peli-testit/silmukka-rosvo.txt`. Kuvat ja raakadata:
`/Users/Shared/Claude/proto-3d/lokit/rosvo-tapahtuma-20260923/`
(`tulokset.json`, `peli-loki.txt`, `r2-rosvo.png`, `r3-helpotus.png`, `t1-kortti.png`).

## Tulos: 4/7 tarkistuspistettä odotetun mukaisia, 3 poikkeaa

| tila | odotus (README-silmukka.md) | saatu |
|---|---|---|
| r1-alku | OK | OK |
| r2-rosvo | OK (Kysymys, Kaksintaistelu, 8 vaihtoehtoa, 45 s) | OK |
| r3-helpotus | OK (piilotetut ei tyhjä, raha puolittui) | OK — piilotetut [2,4,6,7], raha 300→150 |
| r4-vastattu | vastattu true, oikein true, ei saalista | **POIKKEAA**: vastattu false, oikein false — `vastaa oikea` epäonnistui |
| r5-kartalla | silmukka Kartta | **POIKKEAA**: silmukka yhä Kysymys/Kaksintaistelu |
| t1-kortti | kysymys.laji Tapahtumakortti | **POIKKEAA**: yhä sama kaksintaistelu (koe tapahtuma ei mennyt läpi, koska ollaan yhä Kysymys-tilassa) |
| t2-loppu | silmukka Kartta | **POIKKEAA**: yhä sama kaksintaistelu |

## Juurisyy (peli-loki.txt)

```
254.81 aloita → VIRHE ei tervehdyssivua [Kysymys]
256.83 vastaa oikea → VIRHE kysymys ei ole auki [Kysymys]
258.83 jatka → VIRHE kysymykseen ei ole vastattu [Kysymys]
262.84 koe tapahtuma → VIRHE silmukka on tilassa Kysymys [Kysymys]
264.86 jatka → VIRHE kysymykseen ei ole vastattu [Kysymys]
```

`puolita` (Helpotus) toimi oikein (raha puolittui, 4 vaihtoehtoa piiloutui,
näkyy r3-helpotus.png:ssä). Mutta `vastaa oikea` -testikomento vastaa
"kysymys ei ole auki" — kaksintaistelu jäi pysyvästi auki eikä koskaan
vastattu, joten loput käsikirjoituksen komennot (`jatka`, `koe tapahtuma`)
epäonnistuivat ketjuna samasta syystä. `aloita`-komento (rivi 2) epäonnistui
myös ("ei tervehdyssivua") — kaksintaistelulla ei ilmeisesti ole
tervehdysvaihetta kuten tavallisella kysymyksellä, joten se rivi lienee
tarpeeton kaksintaistelulle.

**Epäilty syy:** `vastaa`-testikomento (PeliKomennot.cs) ei tunnista
kaksintaistelun kysymystä "auki olevaksi" — joko se vaatii jonkin lipun,
jonka vain tavallinen (`aloita`-alkuinen) kysymysvirta asettaa, tai
kaksintaistelun kysymysobjekti on eri kentässä kuin `vastaa` lukee.

## Kuvat

- `r2-rosvo.png`: kaksintaistelu auki, 8 vaihtoehtoa (A–H) kahdessa
  sarakkeessa, Helpotus-nappi, 43 s jäljellä. Ulkoasu vaikuttaa kunnossa.
- `r3-helpotus.png`: Helpotuksen jälkeen 4 vaihtoehtoa harmaana/yliviivattuna
  (C, E, G, H), raha £150, "Rosvo on vienyt 150 puntaa" -ilmoitus, uusi
  Helpotus (150→75£). Ulkoasu vaikuttaa kunnossa.
- `t1-kortti.png`: EI tapahtumakorttia — sama jäätynyt kaksintaistelunäkymä
  (35 s jäljellä), koska `koe tapahtuma` ei koskaan mennyt läpi. Ei käytettävä
  tapahtumakortin referenssinä.

Ääni mykistettynä koko ajon ajan.
