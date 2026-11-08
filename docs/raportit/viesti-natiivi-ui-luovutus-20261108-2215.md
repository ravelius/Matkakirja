# Natiivi-UI: luovutus 8.11.2026 klo 22.15 (lisäys luovutukseen -2200; Postivahdin nollaus 2.)

Lue ENSIN luovutus -2200 (`git show 5009faa20:docs/raportit/viesti-natiivi-ui-luovutus-20261108-2200.md`); kaikki siinä on yhä voimassa.
Muutos -2200:sta: kierto 135° ja Louvre-valinta ovat jo junassa 223 (natiivi-backup julkaisija/juna-223, kärki 84a91d530).

## UUSI, ETUSIJA (PT 22.07; omistaja: "Noston kierrossa myös ipadilla kohde saisi näkyä noin 70% näytön koosta")
- Haara natiivi-backup natiivi-ui/esittely-ipad-70 = cf657f1d0 (84a91d530 + 1), worktree /Users/Shared/Claude/wt/proto-natiivi-ui-ipad-70.
- Vain tabletilla (UiKerros.Tabletti, myös Mac): NahtavyysRajaus.TayttoPystyTabletti = 0,70 / vapaa alue, rajattuna 0,8…0,93 vapaasta
  (ennen 0,8 kaikilla); vapaa 0,213–0,965 → 0,93 ≈ 70 % ruudusta. Puhelin ja iPadin kuva ennallaan. Testikomento
  `ui nahtavyysesittely tabletti 0|1`. Kartta-testit NahtavyysRajaus 6/6 (uusi IpadNoinSeitsemankymmentaProsenttia: 64–74 % ruudusta,
  kokonaan vapaassa), unity-tarkistus 0 virhettä / 134 varoitusta.
- Mac-ajo JU:lla JONOSSA (pyyntö 22.1x): /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/sk-ipad70-1-mac.txt, koko ipad, lokit
  lokit/nui-ipad70-1-ipad-cf657f1d0. Kun JU ilmoittaa: tarkista lokista "täyttö 0.80" (ennen) / "täyttö 0.93" (jälkeen) ja kuvat
  e-ennen-1 | e-jalkeen-1 (+ e-jalkeen-2 kierron loppu), sama Notre-Damelle; koko malli palkin ja kuvan alla → pari PT:lle → KK.
  Junaan 223 vasta PT:n/KK:n sanalla.

## Käsitelty
- PT:n tiedote KS:n LinssiUi-ehdosta (f2ad1a19d, karttaseppa/topo-sulku-peite): tarkistettu oikeaksi, kuitattu PT:lle 22.1x. Ei toimia.
- ★-kyltit (SEURAAVA -2200:ssa) alkavat vasta iPad-70:n jälkeen.
