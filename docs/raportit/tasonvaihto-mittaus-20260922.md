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

---

# Toisto poltolla 2026-09-22c (22.9.2026 klo 18.38)

Sama mittaus uusilla laatoilla (vesiviivat laudan yksiköissä, laikut
maailmaan). Osoitin mainissa v2116, luettelo viety ämpäriin.

| ajo | näkymä | A (z7) | B (z8) | A − B | C − (A+B)/2 |
| --- | --- | --- | --- | --- | --- |
| ennen (22a) | rannikko | 8,10 | 8,40 | **5,68** | 0,60 |
| **jälkeen (22c)** | rannikko | 8,15 | 8,68 | **5,95** | 1,53 |
| ennen (22a) | avomeri | 4,00 | 3,98 | **2,24** | 0,82 |
| **jälkeen (22c)** | avomeri | 4,01 | 4,00 | **2,24** | 0,97 |

## Tulos suoraan sanottuna: A − B ei parantunut

Korjaus ei pienentänyt tasojen välistä eroa tällä mittarilla lainkaan
(rannikko 5,68 → 5,95, avomeri 2,24 → 2,24). Kaksi asiaa on syytä erottaa:

1. **Korjaus tekee sen, mihin se on suunniteltu.** Vedoksissa
   (`poltto-22c-rannikko-z5-z8.jpg`) sama viiva on samassa
   maantieteellisessä kohdassa joka tasolla — vanhassa viivasto
   levittäytyi joka tasolla eri kauas merelle. Tämä on silmällä selvä.
2. **Mutta viivat ovat pieni osa ruudun hienorakennetta.** Sama havainto
   kuin erä 2:ssa (poltettu rae ~3 % laatan energiasta): A − B:tä
   hallitsevat rantaviivan ja maaston tarkentuminen, paperin rae (yhä
   paperivakiona) ja laatan häviöllinen pakkaus. Ne eroavat tasojen
   välillä väistämättä, koska z+1 NÄYTTÄÄ ENEMMÄN.

Huom. `C − (A+B)/2` ei ole vertailukelpoinen ajojen välillä: kaappaus
osui häiveessä eri kohtaan (peitto 50 % vs 35 % rannikolla, 20 % vs 35 %
avomerellä), ja jäännös riippuu siitä. Kumpikin luku on silti pieni
suhteessa siihen, mitä häive sekoittaa — johtopäätös "sekoitus on
uskollinen" pätee yhä.

## Mitä tämä mittaus EI kata

Mittaus vaihtaa tason z7 → z8. Juuri siinä välissä vesiviivojen
**harvennus ei tee mitään**: laskettu viivaväli on z7:llä 5,1 px ja
z8:lla 10,1 px, eli molemmilla yli kolmen pikselin rajan ja kaikki
viivat piirtyvät. Harvennus puree vasta karkeammalla:

| taso | viivaväli (sisin → uloin, px) | harvennusaskel |
| --- | --- | --- |
| z5 | 1,3 … 4,4 | 4, 2, 2, 1, 1, 1 |
| z6 | 2,5 … 8,7 | 2, 1, 1, 1, 1, 1 |
| z7 | 5,1 … 17,4 | 1 (ei harvennusta) |
| z8 | 10,1 … 34,9 | 1 (ei harvennusta) |

Eli z6 → z7 -vaihdossa uusia viivoja ilmestyy sisimpään vyöhykkeeseen, ja
z5 → z6:ssa vielä enemmän. Se on omistajan tilaama käytös ("karkealla
tasolla harvempi eikä tummempi"), mutta se tarkoittaa myös, että juuri
niissä vaihdoissa ruudulle tulee jotain uutta. Jos tuntumatestissä lika
näkyy nimenomaan karkeilla tasoilla, seuraava mittaus on z6 → z7 ja
z5 → z6 — ja korjaus olisi silloin häivyttää harvennetut viivat esiin
vaimeina eikä jättää niitä kokonaan pois.
