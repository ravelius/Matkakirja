# Natiivisepän luovutus 9.11.2026 klo 12.49

Edellinen: git show ac8d0af36:docs/raportit/viesti-natiiviseppa-luovutus-20261109-1237.md (tausta: paluun esilataus, FPV).
Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja, tili sami.reivinen@vvi.fi. Nollauksen syy: konteksti 26 % (7.37).
Id:t /Users/Shared/Claude/osoitekirja.md (PT local_8d8ebf72-…, JU local_2a7d6c96-…, NUI local_4b84cd90-…).
Cron "4 9 * * *" unity-julkaisut.py: LUO UUDELLEEN (prompt: git show 9d77cf4dd:docs/raportit/viesti-natiiviseppa-luovutus-20261108-2320.md rivit 6–7).

## TEHTY 12.40–12.49 (kaikki kuitattu tai lähetetty)
- FPV hover-kaasu 95b65cbe4: PT KUITTASI (NUI:n FPV-kärjessä b57df8ec6, KOE ei junaan). Lokin 12:34:01 ArgumentOutOfRangeException =
  Unity-editorin QuickSearch-indeksointi (vanha, esikatseluissa 29.10. alkaen) → PT:lle kerrottu.
- PALUUN p-5a YHÄ SUMEA (NUI paikkapalkki 027326c38, ~15 km Lagorce t≈1,8 s): kiinteät osuudet 0,3/0,45/0,6 osuivat ~5 ja ~25 km:iin.
  KORJAUS bce316fdd (wt proto-natiiviseppa-nostolento, haara natiiviseppa/noston-lento, pushattu natiivi-backup): KameraEleet.KorkeusPortaat
  (puhdas, testit PaluuPortaat*) → osuudet nousun korkeuksista ×2 (Marseille 3,4/6,8/13,6/27/54/109 km), enintään 6, ≤ 160 km; loki
  "paluun esilataus: osuudet N (…)". Testit 879/879, unity-tarkistus 0. PT KUITTASI KOODINA, "kuva ratkaisee": UUSI NUI yhdistää
  paikkapalkkiin ja ajaa JU-ajon p-4 + p-5a. Odota kuvaa; jos yhä sumea → katso muistihuippu ja osuusrivi lokista.

## TYÖN ALLA: MONT BLANC / COSQUER PYSÄHTYY LIIAN LÄHELLE (OMISTAJA 12.38, PT: heti)
Omistajan kuvat: Matkakirja-fable/docs/raportit/kaappaukset/omistaja-20261109/1238-mont-blanc-kuva1.jpg (nyt: litteä, nimet pienet,
poikki sumea tumma viiva = Ranskan–Italian raja lähikuvassa) ja …-kuva2.jpg (tavoite: koko vuori laaksoineen kohokuvana, Chamonix–
Passy–Sallanches näkyvät, arviolta ~20 km leveä, kallistus ~65°). Cosquer: lokit/nui-paikkapalkki-1-iphone-027326c38/p-4-perilla.png.
SYY (todennettu koodista ja lokista): ilman 3D-mallia etäisyys = max(MinKorkeusPaikassa, KorkeusKaarelle(NahtavyysEsittely.KatseluKaari
0,012° ≈ 1,3 km näkymä)) ja kallistus max(käytetty, KallistusAst 50) → loki "nähtävyysesittely: rajaus … ei mallia … etäisyys 1679 m,
kallistus 50°". Sama kaava kahdessa paikassa: UI/NahtavyysEsittely.cs Esittele (~rivi 152) ja UI/NostonLento.cs Lenna (027326c38,
rivi 109, MitoitaMatka-kesto samalla h:lla). Piirroskaupunkien (Pariisi) ulkopuolella laatat: pohja Z10 kaupunkien ympärillä, elävä
Z11–17 laitteella, data max Z14 (~7 m/px) → 1,3 km näkymä suurentaa ~7× → sumea ja litteä.
EHDOTUS (ei vielä koodattu): yksi funktio NahtavyysEsittely.KatseluKorkeus(k, lat, lon, malli) molempiin: kohde ilman mallia ja ilman
piirrosta (PalloKierto.PiirrosKulma == null) → maisemakaari (~0,2°, mitoita kuva2:sta) ja maisemakallistus (~65°); mallilliset ja
piirroksen kohteet ennallaan. Tee haarassa NUI:n paikkapalkin päälle (NostonLento on vain siellä), kerro uudelle NUI:lle.
Todennus: Mac-ajo JU:n vuorolla (10.5: "mitä ratkaisee", ≤ 4 kuvaa) Mont Blanc + Cosquer ennen/jälkeen samoista kohdista → PT.

## JONO
1. Mont Blanc/Cosquer (yllä). 2. p-5a-kuva uudelta NUI:lta (vain vastaanotto). 3. FPV-latauskuva puhelimelle: Codexin puhelinmuodot
eivät vielä postilaatikossa (git ls-tree -r --name-only origin/claude/postilaatikko | grep drone-vastavalo-puhelin); PT ilmoittaa.
- unity-tarkistus: `sh Peli-testit/unity-tarkistus.sh` (EI zsh); testit `sh Peli-testit/kaanna.sh [nimi]`.
