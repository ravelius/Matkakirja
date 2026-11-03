# Valosepän luovutus 2.11.2026 klo 15.45

Syy: konteksti 25 % (pehmeä raja, kontekstivahti). Edellinen: viesti-valoseppa-luovutus-20261102-1445.md (PR 5997; pysyvät työtavat
-20261101-2124.md ja -2220.md voimassa). Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (02.11. 14.5x–15.4x).
Skriptit `_tyo/linssiseppa2/skriptit-20261031/` (*-ajo.zsh + *-skenaario.txt; uusin salit1). Mittari juova.py (10 riviä, kirjoita
uudelleen tarvittaessa): lattia-alue 1024×768 y 420–768, x 100–920; juova = L > j0:n L + 25 (maski t0:sta, kun sävy muuttuu).

## VALMIS JA RUNGOSSA
- Salin varjon sävy: 2181a7288 → runko 218 744e72d03 (NS, ancestry tarkistettu). Syy: 04:n salin lattia (juhlasali floor-materiaalit)
  piirtyy Lattia-varjostimella leivottu 0 → varjossa ambient = pelkkä _JuoksuTaivas. JuoksuElavaYmparisto (JuoksuValo.hlsl): salissa
  maan heijastuksen sävy kirkkaus säilyttäen, oletus ValoKohteet.JuoksuSaliLampo 0,35. salilampo5: 159/161/173 → 166/161/160
  (havainne 159/148/152), L ennallaan. Pari _tyo/linssiseppa2/salilampo5/salilampo-pari.jpg. PT kuittasi 15.3x.

## KESKEN: PT:n erä 15.4x – junan 218 uusien salien valo/varjo havainnetta vasten
PT: 储秀宫 c, 翊坤宫 y, 永寿宫 ys, 体和殿 th, 太极殿 tj, 体元殿 ty. Valon puolen poikkeamat itse, mallin viat rivinä LAV:lle, lopuksi
yksi koostepari (sali per rivi: nyt | havainne 04) PT:lle.
- Koehaara linssiseppa2/salit-218 9a82eb9c9 (natiivi-backup) = runko 744e72d03 + tausta-v106, rakennukset-v106, esto-v31 (LAV:n viennit,
  mediassa). EI JUNAAN (paketit tulevat NS:n kautta).
- Paikat (rakennukset.json paikka_pohja = sijoitus-kehys, kierto 0, akseli ~+1,6°; lattia LAV:n kehys_c LATTIA / LUE.md):
  c (−110,95; 430,40) 1,2 · y (−108,21; 378,76) 0,54 · ys (−107,145; 327,20) 0,56 · th (−109,365; 401,88) 0,56 ·
  tj (−162,405; 324,08) 0,54 · ty (−163,01; 343,25) 0,46. Hallit ~26,7 × 13 m itä–länsi; sisään etelän keskiovesta.
- salit1 (esikatselu-20261102-153722; keisari 2 m keskeltä länteen, katse itään 91,6°, kamera havainne 04):
  * y ja ys: mallit puuttuivat (media v106:n y-/ys-glb 404 ajon aikana, JU:n vienti kesken) → piha kuvassa. Nyt 568/568 glb mediassa → uusinta.
  * c: kamera huonekalun/väliseinän sisällä → uusi paikka (esim. keskussali etelän ovelta katse pohjoiseen, ovi u 13,83).
  * th, tj, ty: sisätila näkyy, mutta lattia p50 60/71/71 (04 168, havainne ~163), varjopuoli 85/51/34 · 70/56/44 · 69/55/40
    (04 159/154/153), mustat 1,0–1,2 % (04 0,24). Seinät tasaisen ruskeita ja keltaisia ilman kuviota. Selvitä ensin
    `valo pintatieto 4` + `valo kattotieto` (leivottu 0/1, Maailma/Lattia, katto piilossa/heittääkö) ja onko tumma lattia materiaali
    (LAV:n V4_lattia tumma laatta → rivi LAV:lle) vai valo (leivonta/täyttö/katon varjo → korjaus itse, kuten salilampo 04:lle:
    JuoksuSaliSisalla koskee vain juhlasalin kattoja, saliKattoJoukko JuoksuSokkeloMaailma.Palatsi.cs ~911).
- Seuraava: salit2 = uusinta y/ys + c uudella paikalla + pintatieto kaikille → mittaus → korjaukset → koostepari PT:lle.

## Muuta
- Haaran linssiseppa2/salilampo-218 työ on rungossa; wt/proto-linssiseppa2-seinat218 on nyt haaralla linssiseppa2/salit-218.
