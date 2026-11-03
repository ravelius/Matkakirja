# Valosepän luovutus 1.11.2026 klo 16.50

Syy: konteksti 25 % (pehmeä raja). Edellinen: viesti-valoseppa-luovutus-20261101-1619.md (PYSYVÄT TYÖTAVAT 1 ja 2 voimassa:
pitkä Unity-ajo Monitorilla valmis + kuolema; jokainen valmis kuva-ajo HETI omistajalle SendUserFilella + polku PT:lle).
Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (rivit 16.2x–16.5x). Skriptit: `_tyo/linssiseppa2/skriptit-20261031/`.

## UUSI TYÖTAPA (PT 16.4x)
Omistajalle lähtevissä kuvissa EI sääntöikkunaa (ui juoksupeli saannot himmentää; sulje ennen kuvaa) EIKÄ poltettua selitekaistaa:
todistusajosta lähetä `kuvat/raaka/`, teksti SendUserFilen captioniin.

## TEHTY
- **Simukuva 03/03b** rungolla 79f226be7 (yhteinen-iPad13, simu-lukko): `proto-3d/lokit/todistus-simu03-varjot-216-20261101-1631/`
  → elävät rakennus-, hahmo- ja vartijavarjot näkyvät laitteella, poikkeuksia 0. **PT KUITTASI laitetarkistuksen.**
  Ajo: `simu03c-lukko.zsh` (+ `simu03c-aja.zsh`, `sk-simu03c.txt`, app `_tyo/linssiseppa2/simu03c-app`).
- **Varjot 01/02/05 korjattu, RUNGOSSA**: proto `linssiseppa2/varjo-inst-216b` **0e357fe46** (79f226be7 + 181b2cf95 + 0e357fe46),
  NS:n runko 216 **02a7743af**. (1) Muurikate.cs PiirraInst: osasarjan leivotut instanssit heittävät kun LeivotutHeittavat
  (vaikutus ei näkynyt yksinään). (2) JuoksuMaailma.shader: leivotut vaakapinnat (n.y > 0,9) saavat elävän varjon ilman auringon rajaa
  (_JuoksuLattiaElava) – kujien kivetys on JuoksuMaailma-varjostinta, ei Lattiaa → tämä korjasi. Koonti
  `lokit/havainne-editori-20261101-163950/koonti.png` (omistajalla, PT kuittasi).

## AVOIN (järjestys)
1. **Sali 04 (PT 16.5x: tee rungon 02a7743af päälle)**. PT:n linja: salin oma aurinko 45°/70° ilman katon varjoa (loki 25.10. "SALIN OMA
   AURINKO ILMAN KATON VARJOA"), katon clip saa jäädä; havainteen juovat tulevat pylväistä ja penkeistä.
   LÖYDÖKSET: (a) salin aurinkokoodi 2732b6172 EI ole rungossa (vain linssiseppa2/omistajapari-11/12) → salissa ulkoaurinko 45°/318°.
   (b) Diagnoosi `lokit/esikatselu-20261101-164557/sali-diag-koonti.jpg` (d0 oletus, d1 heitto 1, d2 leivonta 0, d3 yläkuva): salin
   lattialla EI MITÄÄN varjoa, ei edes Puyin → vika VASTAANOTOSSA. Juhlasali = yksi yhdistetty piirtäjä "v4 palatsi avoin juhlasali …"
   (pylväät + lattia + penkit samassa), materiaalit Lattia (leivottu 0/1) ja Maailma (leivottu 1). Seuraava: tarkista salin lattian polku
   JuoksuLattia.shaderissa (_Laji < 1.5 halli, rivit ~591–605 "valo pois -tila") ja saako piirtäjä receiveShadows / onko salissa varjot
   pois (VarjotPaalla, sisätila). Sitten salin aurinko (2732b6172 + 7f9a15ee1/495ac646a/2a8ef6d7b/b767bf7be/a38d7b4a4 – kysy PT:ltä,
   tuodaanko runkoon) → koonti 04 omistajalle (ilman sääntöikkunaa ja kaistaa) + PT.
2. Vanhat: läikät 03/04, 07 usva + taivassauma. 06 = geometria (LAV).
