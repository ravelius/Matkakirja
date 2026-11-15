# Raportti 12 (Valoseppä 15.11.2026): KK 07.25 kierros 6 – pudonneet kaistat, paljas pohja, lähikuvat, Lontoo. EI JUNAAN.

## 1. Pudonneet kaistat puolikkaina (yleinen sääntö)
- hallit.py: kaista, jonka pätkä < kaistan leveys, yritetään KERRAN kahtena puolileveänä kaistana samalla leikkaussäännöllä; puolikas pois vasta,
  jos sen pätkä < puolikkaan leveys. Valinnan (h, kulma) pinta-alaan lasketaan puolikkaat. Julkisivu vain kokonaisille kaistoille; puolikkaat
  lasipääty molemmissa päissä, holvi kapeampi (nousu min(18, 0,3 · leveys)).
- TIEDOSTOMUOTO 2 (yli 5 hallia: way/4959629 = 6): tyyppi 7 a = kaistoja | julkisivukaistat << 3; b | c << 8 = kaistakartta (bitti 15 = 1, kaistan
  tila 3 bittiä: 0 ei, 1 kokonainen, 2/3 vain 1./2. puolikas, 4 molemmat); hallitavut (alku, loppu u8) jonossa p3 + varattu + JATKORIVI (seuraava
  mallirivi, tyyppi 11, 23 tavua; ei merkkejä). p0 p1 p2 ennallaan. Kaikki b c p3 varattu 0 = vanha malli.
  Peli: MerkkiTiedosto.Malli.Jatko (tyyppi 11 vain muodon 2 asemarivin perässä ja aina siellä; merkki ei voi osoittaa jatkoriviin → FormatException),
  MalliAsema(…, jatko), TyAsemaHallit (hallikohtaiset z0 z1 keskiviiva leveys); TyAsema = tasakaistainen erikoistapaus.
- KATETTU OSUUS pohjasta ((hallit + julkisivu) ∩ OSM-pohja / pohja, rasteri 0,5 m, reiät parillisuussäännöllä), kierros 5 → 6:

| Asema | kaistoja | halleja | katettu % |
|---|---|---|---|
| Gare de Lyon | 5 | 5 | 80,4 → 84,1 |
| Gare de l'Est (way/280670907) | 4 | 4 | 65,3 → 78,7 |
| Gare d'Austerlitz | 5 | 4 | 78,0 → 79,1 |
| Gare du Nord (way/63197091) | 5 | 5 | 78,5 → 88,6 |
| Gare Saint-Lazare | 5 | 5 | 63,9 → 79,0 |
| King's Cross | 2 (lista) | 2 | 59,1 → 76,0 |
| St Pancras | 4 | 4 | 76,2 → 80,9 |
| Liverpool Street (way/4959629) | 5 | 6 | 68,6 → 86,0 |
| Paddington | 5 | 5 | 66,3 → 76,2 |

  ALLE 80 % (syyt kuvasta kattavuus-kuva.py → lokit/valoseppa-tyyppimallit6-koonti/kattavuus.png):
  - Saint-Lazare 79,0: viisikulmainen pohja, vinot kulmat ja eteläkärki eivät mahdu suorakaidekaistoihin (puolikkaat jo mukana molemmilla reunoilla).
  - Gare de l'Est 78,7: julkisivun eteläpuolinen kieleke ja pohjoisreunan sahalaita (kapeampi kuin puolikas).
  - Austerlitz 79,1: kaista 4 putoaa puolikkainakin (luoteissiipi kapea); loput = kaistaruudukon reunasuikaleet.
  - King's Cross 76,0: läntinen puoliympyrähalli (Western Concourse) + kiila; kaistoja 2 nimilistalta (KK), joten ruudukko on karkea.
  - Paddington 76,2: itään jatkuva kapea varsi (alle puolikkaan leveyden) ja kolmiopää.
- Testit: testi_hallit.py LÄPI 9/9 (naapurit hallien alla 0 m², way/63197091 24 m² reunakosketus kuten ennen); Kartta 855/855
  (AsemahallitKaistojenSisalla muoto 2: jokainen kärki hallin/julkisivun sisällä, puolikkaita ≥ 9, synteettinen puolikasrivi, ei bittiä 15 = null);
  Linssit 2341/2341 (TyyppiMerkitTestit: Jatkorivi uusi, PelinTiedostot muoto 2); unity-tarkistus 0 virhettä. Peli 0591af019. Tiiviste 99/99 ja OBJ 28/28 tavulleen samat.
  Pariisi 08b793d9 (30 riviä, 7 256 t), Lontoo d0b4150c (27 riviä, 10 976 t); muut rivit ja merkit ennallaan, poisOsm ennallaan.

## 2. Paljas pohja (ruskea laatta)
- SYY: elävän kartan MAALAATTA (ElavaTyyli, rakennustaso z ≥ 13/14) piirtää OSM-rakennusten pohjat; asema = julkinen → Kulta-sävy (p5 Uusi
  mitattu #B39475 vs. hallin katto). 3D-talo lähtee KS:n paloista (poisOsm), mutta 2D-pohja jää, koska merkkien poisOsm ei ole TaloPoistot-
  /TaloPoistotLontoo-taulussa (TaloAlue.PoistoPois, KS:n tee-poistot.py). Ei TyAsema eikä lattia.
- KORJAUS: merkkien poisOsm (vienti-<k>.json) KS:n tee-poistot.py:n POIS_OSM-joukkoon → uusi poistotaulu; silloin yli jäävä pohja = sama maa kuin
  ympärillä. Pyydetty KS:ltä 15.11. (kokeena, ei junaan).

## 3. Kirkot ja palatsi
- `aja lat lon <kaari>`: korkeus = KorkeusKaarelle(kaari) RAJATTUNA MinKorkeus()-arvoon, ja `linssi kaista lahelle` ajaa aina MinKorkeuteen → 0,006 ei
  voinut laskea kameraa. Oikea vipu: `komento lahizoomi <k>` (k > 0 jakaa lähimmän leveyden k:lla, PalloKierto.MinKorkeus). Skenaario 6: lähikuvat
  lahizoomi 4 (Palais Royal 3), kallistus 50.
- p9 (Palais Royal) mitattu: mallin katto #959996 vs. naapuritalojen katot #ABAFB1 (≈ 13 % tummempi, vihertävämpi); mallin julkisivu #A79579 vs.
  taloseinä #A6947A (sama). → Ero on MALLIN VÄRI (TyKatto #8E979D, kun Pariisin talokattojen perusväri #949EAA) + mansardin jyrkkä lape, EI
  leipomaton tila. Ehdotus (KK päättää): tyyppimallien katto kaupungin talokattojen perusväristä samoin kuin asemahalleissa (kattovari()).

## 4. Lontoo ja kuva-ajo: KESKEN (luovutus)
- Skenaario sk-tyyppimallit6-pariisi.txt valmis (p5–p7, p12, p13 asemat; p8–p11 lähikuvat lahizoomi). Lontoon skenaario tekemättä: KS:ltä kysytty
  kansio, jossa l3d + MUOTO2 + väistö B JA merkkien poisOsm (lontoo-v2-yhd-20261115/palat: poisOsm EI mukana). KS:ltä pyydetty myös poistotaulu (kohta 2).
