# Onko zoomin lika laatassa, häiveessä vai kermassa? (mittaus 22.9.2026)

Fablen tilaus: ennen kuin peliin rakennetaan ruutuavaruuden rakekerros,
selvitetään mistä meren likaantuminen zoomissa todella tulee.

## Menetelmä: kamera paikallaan, vain taso vaihtuu

Kysymys erottuu kolmeen osaan vain, jos näkymä pysyy samana ja vaihtuu
pelkkä taso. Sen tekee laattakerroksen KERTOMUSLUKKO
(`js/pallolaatat.js lukitseKertomus`): lukko naulaa nykyisen tason,
joten kameran voi viedä syvemmälle ilman tason vaihtoa.

- **A** — lukko päällä, kamera syvällä: näkymä X, taso z
- **C** — lukko auki, kaappaus kun uuden tason peitto on 0,2–0,85: X, z ja z+1 sekaisin
- **B** — häive ohi: X, taso z+1

Mitta on korkeataajuinen rms (pikselin poikkeama 9 × 9 keskiarvosta),
vain merialueelta. Työkalu `tools/savukkeet/mittaa-tasonvaihto.mjs`,
WebKit 390 × 844 dpr 3, tuotannon laatat (`2026-09-22-pohja`).

## Tulos

| ajo | näkymä | A (z7) | B (z8) | **A − B** (laattojen ero) | **C − (A+B)/2** (sekoituksen lisä) |
| --- | --- | --- | --- | --- | --- |
| perus | rannikko | 8,10 | 8,40 | **5,68** | **0,60** |
| perus | avomeri | 4,00 | 3,98 | **2,24** | **0,82** |
| `?koe=kangasaina` | rannikko | 8,10 | 8,40 | 5,68 | 0,68 |
| `?koe=kangasaina` | avomeri | 4,00 | 3,98 | 2,24 | 0,84 |

**Lika on laatassa.** Kahden tason laatat eroavat hienossa mittakaavassa
paljon (rannikolla 5,68, kun tason oma hienorakenne on 8,1–8,4), mutta
ristihäivytys itse on uskollinen: se tuottaa lähes täsmälleen lineaarisen
sekoituksen, ja poikkeama siitä on 0,6–0,8 eli kymmenesosa siitä, mitä se
sekoittaa. `?koe=kangasaina` ei muuta lukuja lainkaan, joten kerman
kangaspolku ja mipmapit eivät ole syy.

Kuva `docs/raportit/kuvat/tasonvaihto-rannikko-20260922.jpg`: A, C, B ja
kaksi erotuskuvaa nelinkertaisella vahvistuksella. Neljännessä paneelissa
(A − B) erottuu rakenteena juuri rannikon vesiviivasto; viides paneeli
(C − (A+B)/2) on lähes tasainen harmaa.

## Mitä tästä seuraa

1. Ruutuavaruuden rakekerros ei korjaa tätä yksin, eikä sitä kannata
   rakentaa tämän perusteella. Erä 2:n mittaus sanoi saman toisesta
   suunnasta: poltettu kuitu ja rae ovat vain ~3 % laatan meren
   hienorakenteesta.
2. Korjaus kuuluu polttoon: tasojen on piirrettävä sama kuvio samaan
   maantieteelliseen kohtaan. Vesiviivat on jo korjattu (#2808, mainissa)
   — mutta **tämä mittaus ajettiin tuotannon laatoilla, joissa korjaus ei
   vielä ole**. Erotuskuvan rakenne on juuri sitä vanhaa viivastoa.
3. Seuraava askel on siis mitata sama uudelleen, kun laatat on poltettu
   korjatulla reseptillä. Vasta se kertoo, paljonko A − B pienenee ja
   jääkö jäljelle jotain, joka vaatii lisätyötä.

## Toisto

```
JUURI=<repo> PLAYWRIGHT_JS=… ULOS=<kansio> [KOE='&koe=kangasaina'] \
  node tools/savukkeet/mittaa-tasonvaihto.mjs
```
Kaappaukset `<kansio>/{rannikko,avomeri}-{A,B,C}-*.png` ja lukemat
`tasonvaihto-<moottori>.json`.
