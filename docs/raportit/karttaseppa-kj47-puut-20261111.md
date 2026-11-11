# Karttaseppä: KJ47 kevyet puut, ennen 797404a3c | jälkeen 9f26843a1 (11.11.2026 klo 19.0x)

Ajot: /Users/Shared/Claude/proto-3d/lokit/ks-kj47-puut-{ennen-797404a3c,jalkeen-9f26843a1}, molemmat valmiit (714 s), 22/22 kuvaa, Shader-virheet 0.
Parit (ennen | jälkeen): /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/koodijuna/parit-kj47/pari-ym47-*.jpg (22 kpl)
+ varjoraja-00028-vs-00048-jalkeen.jpg.

## Kuvat
- Puut näkyvät kaikilla neljällä alueella (Eiffel, GP+PP, Invalidit, Louvre), joten instansointivariantti ei karsiutunut. Notre-Damen puisto on ennallaan.
- Eiffelin alla ei ole Tripo-pohjaa: Champ-de-Mars jatkuu jalkoihin, puut ovat jalkojen ympärillä eivätkä tornin alla, ja allas näkyy.
- ND:n parvis'n haamukuviot ovat poissa.
- HUOM 1, harmaanpunaiset "kivipuut": noin joka neljäs puu on lajia puu-3, joka on kukkiva vaaleanpunakirjava puu jo alkuperäisessä mallissa
  (kevyt/vertaa.png, ylärivi). Pelin valossa se näyttää harmaalta lohkareelta (pari-ym47-20, -01-eiffel-b). Syy ei ole kevennys.
  Ehdotus: uusilla alueilla vain lajit 1, 2 ja 4 (pieni muutos tee-puut.py:ssä).
- HUOM 2, esplanadin rivit: puut ovat OSM-pisteissä ja 20 m:n täytössä. Rivit erottuvat, mutta eivät ole yhtä suoria kuin oikeat lehmuskujat.
- Pallon hiekkakenttä (Louvre) on vapaa, eikä puita ole katoilla.

## Luvut (PiirtoTilasto, 30 kehyksen keskiarvo; ennen → jälkeen)
| kohta | ruutu kolmiot | piirtokutsut | puukolmiot (oma laskuri) | varattu / tekstuurit / gfx / verkot Mt |
|---|---|---|---|---|
| yleis-viisto 0.05 | 10 973 → 10 973 | 46 → 51 | 0 → 206 143 | 1492/398/1567/437 → 1491/399/1569/437 |
| yleis-ylhäältä | 11 113 → 11 113 | 49 → 53 | 0 → 206 143 | 1494/398/1913/439 → 1485/399/1907/440 |
| keski-viisto 0.015 | 7 399 → 7 399 | 26 → 27 | 0 → 206 143 | 1495/402/1920/460 → 1499/408/1927/460 |
| lähi kevyt (265 m) | 7 378 → 7 378 | 24 → 25 | 0 → 213 326 (101 varjoa) | ≈ sama |

- MUISTI: ero on käytännössä 0 (varattu ±5 Mt, tekstuurit +1…+6, verkot 0, gfx ±7). Ehto ≤ +5 % täyttyy.
- PIIRTOKUTSUT: +5…+6 yleisnäkymässä (+8…+11 %).
- KOLMIOT: EI MITATTAVISSA RUUDUN LASKURILLA. Unityn "Triangles Count" on ennen ja jälkeen tavulleen sama, vaikka 206 143 puukolmiota piirretään.
  Laskuri ei siis näe instansoituja piirtoja. Lisäksi 11 000 kolmiota koko Pariisille on liian vähän: laskuri ei näytä näkevän talojen ja laattojen
  päägeometriaa (verkkomuisti 437 Mt). Siksi +10 %:n ehtoa ei voi todentaa tällä laskurilla.
- Oma laskuri: kaikki 636 puuta lähetetään jokaisessa kehyksessä (598 kevyttä × 250 + ND:n 38 × ~1 490 = 206 143). Alueen erä karsitaan vain kokonaisena.

## Varjoraja (d)
EI TODENNETTU: kuvat 0.0028/0.0034/0.0040/0.0048 ja liikkeessä-kuva ovat samasta etäisyydestä (lähin kevyt puu 354 m kaikissa, 32 varjoa kutistumassa).
Skriptin kaari-komento ei siis loitontanut kameraa. Uusinta vaatii toimivan etäisyyskomennon (esim. aja … <kaari> ennen jokaista kuvaa).

## Ehdotus KK:lle
1. Mittaa kolmiot näkyvistä renderöijistä: PiirtoTilastoon "näkyvät kolmiot" = isVisible-renderöijien verkkojen kolmiot + puuerät näkymässä,
   ennen ja jälkeen. Mittaus perustuu kohtauksen tilaan, ei arvioon. Unityn laskuri ei toimi tässä ajossa.
2. puu-3 pois uusilta alueilta.
3. Varjorajan uusinta oikealla etäisyyskomennolla.
Kaikki samaan uuteen ajoon (KJ47b). Junaan vasta KK:n sanalla.
