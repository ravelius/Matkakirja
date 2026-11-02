# Valosepän luovutus 2.11.2026 klo 21.00

Syy: konteksti 25 % (pehmeä raja, kontekstivahti). Edellinen: viesti-valoseppa-luovutus-20261102-2030.md (pysyvät työtavat
-20261101-2124.md ja -2220.md voimassa). Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (02.11. 20.35–21.00).

## TEHTY TÄSSÄ SESSIOSSA
- 承乾宫 c3 (LAV: rakennukset-v113, tausta-v109, esto-v34; koe proto linssiseppa2/c3-218 8ba79d224, EI junaan) pelin valossa OK:
  valtaistuin ja sokkeli ilman mustia viiruja (musta 0,2–0,4 %), lattia ja valo tasaiset; keltaisten yläpinnat oliivit 96/75/23 vs
  etupinta 214/145/47 (valo ovista, ei mallivika). Pari `_tyo/linssiseppa2/salit3/c3-pari.jpg` (esikatselu-20261102-204137, -203501)
  → rivi PT + LAV lähetetty (molemmat jonossa). c3a:n v/t-kuvat olivat seinän sisällä (sali z ≈ 383–389).
- Sarytšev-kuvasarja peliin (PT:n hyväksymä menetelmä): kierto 151° (kuvan ylös = SSE), hatun korkeus 9,7 km, 9,42 m/px; 8 kuvaa
  9026–9048 (8°→44°), lauta 13,8 km. Peli: proto **linssiseppa2/tulivuoret-sarja a46f4180d** (= runko 0ffb7e562 + 1; pushattu
  natiivi-backupiin; worktree wt/proto-linssiseppa2-tulivuoret; EI junaan ennen PT:tä): TulivuoriSarja.shader, Tulivuoret.cs
  RakennaSarja/PaivitaSarja, `tulivuori lukko 1|0` (k13:sta), `_Sarja=0` = vanha v6, `_SarjaKuva=x` = kiinteä kuva.
  Tila, skriptit ja seuraavat askeleet: `_tyo/linssiseppa2/tulivuoret/TYO-SARJA.md`.
- Testi sarja1 (esikatselu-20261102-205514, `_tyo/…/tulivuoret/sarja1/sk-sarja1.txt` + `ajo.zsh`; huom. `oleta 240 linssien aineisto
  valmis` ennen rakettia, muuten "ISS-linssi ei ole valmis"): aito kuva näkyy oikeassa paikassa ja kierrossa.

## JONO (seuraaja jatkaa tästä)
1. **Kuvan valinta:** katse 82/66/47 → sarjan paikka 0,00 / 0,90 / 2,36 (odotus ~0 / ~3,5 / ~7): pelin rata kulkee eri suuntaan
   kuin todellinen (suunta 180 maajäljestä ≠ aseman todellinen suunta) → projektio murtoviivalle jää alkuun. Korjaus: valitse
   ensisijaisesti katsekulman suuruuden mukaan (|katse| vs sarjan |katse|-arvot, Tulivuoret.cs PaivitaSarja), suunta vain apuna.
2. **Lauta näyttää tarralta merellä:** ympärillä ei pilvikantta (todellisessa kuvassa stratus joka suuntaan). Vaihtoehdot:
   v6:n Rengas-pilvikansi laudan keskipisteeseen (aukko ~0,8 × laudan säde) tai laudan reunan jatko kuvan omasta pilvikannesta.
   Lisäksi heikko vaalea vana laudan alla oikealla (lähde selvittämättä; ei v6:n osia, koska sarjatila palaa ennen niitä).
3. Sitten kuvapari (aito 9026/9048 | peli samasta kulmasta) + video ylilennosta → PT. Sen jälkeen Etna, Raikoke, Hunga Tonga,
   Reykjanes (Landsat 9 kokeilu) TYO-SARJA.md:n mukaan; lähteet Resources/Tulivuoret/LAHTEET.md + Tietoja-sivu.

## Worktreet (proto)
- wt/proto-linssiseppa2-seinat218: koehaarat (salipinnat-218, v112-218, c3-218), EI junaan.
- wt/proto-linssiseppa2-tulivuoret: linssiseppa2/tulivuoret-sarja.
