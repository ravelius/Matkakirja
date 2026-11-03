# Valosepän luovutus 3.11.2026 klo 20.30

Syy: kontekstiraja 25 % (Raamattu 7.37), luonteva tauko: kaikki pyydetyt toimitettu, k6 JU:n jonossa.
Edellinen: viesti-valoseppa-luovutus-20261103-2002.md (pysyvät työtavat -20261101-2124.md, -2220.md voimassa). Loki:
`/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (B = tämä kansio). Python: `$B/tulivuoret/venv/bin/python -I`.
Esikatselu vain JU:n vuorolla (JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd ajaa ja ilmoittaa hakemiston).

## Tehty tässä sessiossa (haara linssiseppa2/pariisi-tyyli natiivi-backupissa, wt /Users/Shared/Claude/wt/proto-linssiseppa2-k17)
- k5 fb7ff2595 tarkistettu (JU 20.05, esikatselu-20261103-195901): Louvre v2 ok, vesisauma ≤ 4 tasoa. AVOIN: talojen pystysauma
  samassa maailman kohdassa kuin k4 (Z14-palaraja 8298|8299, lon 2,351, Hôtel de Villen länsipuoli); vasen puoli karkeampi laatta
  (ei kattolaji). Paikallisesti Z16 ilman saumaa. → Katso k6:sta, toistuuko; jos toistuu, laattapalvelimen loki palan 8298 tarkoista
  laatoista (ei tarkentunut / jäi tekemättä?). `$B/pariisi-tyyli/k5/TULOS.md`, tasovertailu `yv1/tasovertailu.png` (Z15 6 tummempi).
- Kulmavertailu 50/60/70° (78b98a5ab, `pariisi-tyyli/kulmat/`) → **KK LUKITSI 60°** → **yv2 8167ec39f**: Kulma = cot 60° = 0,57735
  (static, koeajo ELAVA_KULMA), seinät 236/214/176 · 216/192/153 · 196/170/130 (ElavaTyyli.SeinanVarit, väliaikaiset), välimuisti -yv2.
- Codexin mittaohje (KK:n A2-päätös kohta 2): `pariisi-tyyli/kulmapohja/mallikuva-60-{3x,1x}.png` (maa 3,81|1,27 px/m, korkeus
  2,200|0,733 px/m), generaattori `mallikuva.py <kulma> <ulos> [px/m]` → KS:lle (tilaa A2:n Codexilta).
- NS:n raivaus 2ca91576c yhdistetty = **8fc847bf4** (Kartta-testit 594/594). **k6 = 8fc847bf4** JU:n jonossa L2:lla (PK:n ajojen
  jälkeen; `pariisi-tyyli/k6/ajo.zsh`, loki julkaisija-tyokalut/vs-k6.log). Tulos PT:lle ja NS:lle (raivauksen ennen/jälkeen).
- 3525bd0fe: koeajon rajaus ELAVA_ALUE="x0,y0,x1,y1". Notre-Damen nähtävyysalue (KS, `_kirjasto/kartta-osat/NAHTAVYYSALUE.md`):
  `pariisi-tyyli/nahtavyysalue-notre-dame/` pohja + maski 60° 3,81 px/m (2418 × 2589, lat/lon PNG-metatiedoissa + json), tekijä
  `maski.py <data> <ulos>` (vesi MVT:n water-tasosta, raja Rue de la Citén keskilinja `mvtkatu.py`) → KS tilaa Codexilta.
- Paikallinen koeajo: data pysyvästi `pariisi-tyyli/yv1/data` (14/8298/5636) ja `nahtavyysalue-notre-dame/data` (8298–8299 × 5636–5637).

## SEURAAVAKSI
1. k6-tulos (JU ilmoittaa): pari PT:lle (yläviisto 60° + raivaus), kuvat NS:lle; sauma lon 2,351 toistuuko.
2. k5-laiteajo isolla iPadilla (JU, ea2d6912f-mittausten jälkeen): tulos NS:lle ja PT:lle.
3. KS:n A2 (korttelipinnat lukitussa kulmassa, julkisivunauhat) → VERSIOT (`codex-pinnat.py`), julkisivu pinnaksi seinäsävyjen
   tilalle (näytteistys seinän pituuden ja korkeuden mukaan), korttelikohtainen satunnaissiirto (riski 1), TyyliVersio yv3.
4. Codexin Notre-Dame-alueen kuva (KS) → peliin: maaosa korvaa maskin alueen, yläosa (läpinäkyvä lisätila) pohjoisnaapureiden päälle.
   Suunnittele toteutus (todennäköisesti esinekerroksen kuva pohjan koordinaatein + raivaus maskista), kun kuva tulee.
- Avoimet: seinän korkeus kapeilla kaduilla (riski 2), muste segmenteittäin (suorituskyky, mittaa iPadilla osa D), käännetty kartta.

## Muuta
- Sade (linssiseppa2/sade-218, 5ed5f95e2) odottaa äänen laitetarkistusta. Rakettivideo tauolla. Juoksupelin valo ja taivas palatsiin
  yleiskäyttöisinä (omistaja 18.45), kun valo-erä alkaa. wt `proto-linssiseppa2-korjaus` poistettavissa, kun 99ebdaf89 junassa.
