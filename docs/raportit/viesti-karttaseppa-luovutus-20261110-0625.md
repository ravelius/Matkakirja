# Karttaseppä: luovutus 10.11.2026 klo 06.25 (KS)
Syy: konteksti 27 % (hook), pehmeä raja, luonteva tauko (odotan PT:tä ja JU:ta). Korvaa -0457:n (sen jono a/c/d yhä voimassa, alla).
`K=/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/katot-luuranko/`  `B=/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/b3-lontoo/`  (ei git-repoja)

## VALMIIT TÄSSÄ VUOROSSA
1. **Lontoon valkoiset talolaatikot (PT 05.5x)**: vain testiajon varadata (selvitetty jo f8b4f0995); pelaajan vara on ilman OSM-taloja
   (CesiumKaupunki.cs GoogleKiellossa, PT 7.11.). PT:lle 3 riviä 05.5x. Ei korjattavaa.
2. **PK:n 544dd537c / juna 224 = ad820c1dd** (TaloKerros.cs): ei osu katot-koe7:ään; JU:lle: I1–I2 kelpaavat kummalla tahansa rungolla, kunhan samalla.
3. **B3 Lontoo, kuvat (PT 06.1x, KK:n linjaus: ei Codexia, kuvat pelistä ja Commonsista)**:
   - **PR 6536** (haara karttaseppa/lontoo-juttukuvat, 62d277a2e, worktree /Users/Shared/Claude/wt/karttaseppa-lontoo-juttukuvat):
     8 kohdekartan juttuun Commons-kuvat (15 + Hogarth) nahtavyysjutut.js:ään; Exchange Alleyn kaksi kahvilakuvaa myös noston galleriaan
     fokusvirta-lontoo.js:ssä (tests/nostokortti-media vaatii jutun kuvat noston kuviksi). 02-a (1682, 3,5:1) pois. Testit 723/723.
     **EI yhdistetä ennen PT:n kuittausta parista.** Checks olivat pending 06.2x.
   - Parit ennen|jälkeen 390 × 844: `$B/pelinakyma/juttukuvat-62d277a2e/pari-{1..4}-*.png` (+ ennen/ jalkeen/). PT:lle lähetetty 06.2x.
     Kaappausskripti (Playwright, avaa jutut suoraan): /private/tmp/claude-502/…/scratchpad/juttukuvat.mjs → kopio
     `$B/pelinakyma/juttukuvat.mjs` (aja: `node juttukuvat.mjs <repojuuri> <kansio> [juttu …]`).
   - **Esittelykuvat**: Lontoolla 3/3 trailerikuvaa paikallaan (esittelypaikat.mjs: muilla kaupungeilla vain trailerin 3). Pariisin 13 =
     aloituslennon erikoislista (PARIISIN_INTRO + PARIISIN_LENTO). Lontoon 8 muuta kuvaa ovat jo olemassa ilman paikkoja:
     avauskuvat london-4 asuintalojen arki, london-5 Regent's Canal, london-6 näköala (Sky Garden), london-7 asuinkadun ilta (Pall Mall),
     Thames Clipper (Commons); isoisän luentakuva + luentakuva2 (Metropolitan 1873); Pulun pulu-cam-lontoo-01 (Albert Embankment).
     Paikat tehdään vasta, jos Lontoo saa Pariisin kaltaisen aloituslennon (natiivikoodi, ei KS) → PT:n sana. Uusia kuvia ei tarvita nyt.
4. **Lontoon nimilista** `$B/lontoo-kohdenimet-20261110.md`: 99 nimeä (43 nostoa/hetkeä/kadonnutta + 56 kartan kylttiä Merkittavat.json
   20 km, ei päällekkäisiä), kuten Pariisin 130 (KohdeNimiaanet.cs, media aanet/opas/pariisi-nimet-v1/nimet.json). PT:lle välitettäväksi
   KK:lle 06.2x (roolit eivät viesti KK:lle). Avoin: luetaanko englanninkieliset nimet suomalaisittain. Otto vasta KK:n sanalla
   (alle 3 % ilman lupaa, PK:n manifesti + kytkentä kuten Pariisi; Kaupungit-taulukkoon lontoo-rivi).

## TYÖN ALLA / JONO
a. **iPad-pari koe6/koe7** (JU I1–I2; klo 05.58 lokeja ei vielä): ks. -0457 kohta a. Sen jälkeen PR haarasta karttaseppa/katot-koe7.
b. **PR 6536**: PT:n kuittaus parista → checks pass → squash-merge (kaava) → valmis-rivi PT:lle sha:lla.
c. **Nimiotto**: KK:n vastaus (PT:n kautta) → PK:lle otto/manifesti tai itse PK:n tavalla (selvitä PK:lta).
d. Esittelypaikat Lontoon 8 kuvalle vain PT:n sanalla (yllä 3).
e. -0457 c (sisäkulmien rypyt, ei avata ilman PT:tä) ja d (nimiäänet = tämä c).

## Vahdit (viritä uudelleen)
- Postilaatikko: Monitor `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min, re-arm).
- Omia ajoja ei käynnissä. Worktree karttaseppa-main-ennen poistettu.
