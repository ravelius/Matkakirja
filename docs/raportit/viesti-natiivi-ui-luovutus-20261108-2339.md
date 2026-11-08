# Natiivi-UI: luovutus -2325 lisäys 8.11.2026 klo 23.39 (PT:n nollauskäsky; korvaa -2325:n jonon kohdat 1 ja nostokuvat-1)

Pohja: `git show ba3d7e1e9:docs/raportit/viesti-natiivi-ui-luovutus-20261108-2325.md` (avoin tehtävä: kuvateksti iPadilla, yhä aloittamatta).

## Tehty -2325:n jälkeen
- KAMERATAPPI-3 bee8b407b: iphone + iphone-vaaka katsottu, tappi Pulun yläpuolella, ei Pulun/nappien päällä; parit PT:lle 23.38
  (proto-3d/lokit/nui-kameratappi-3-{iphone,iphone-vaaka}-bee8b407b/pari-t0-ennen-jalkeen.jpg ja pari-t0-t1-t2-t3.jpg).
  PT 23.39: KK kuittasi, JU vie junaan. Ei enää NUI:n työtä.
- NOSTOKUVAT-1 10845cd24 (JU katsoi 6/6): kokoruutu ok (iphone/ipad); tarina j-0 ja j-1 ok, MUTTA j-2..j-4 eivät vierittäneet:
  skenaarion `komento veto` on KARTAN ele (Komennot.cs PalloKierto.AloitaEle), ei mene UI Toolkitiin. Kortin vieritys = `ui nostonappi vierita`
  (Nostokortti.Testaa → VieritaAlas: sisus-ScrollView, askel ikkuna − 2 riviä, loppuun rajattu; lehden taitto on sisuksessa).
  Uusi skenaario proto-3d/_tyo/natiivi-ui/sk-nostokuvat-1b-tarina.txt (vain JÄLKEEN, kuvat j-1..j-5, 12× vierita loppuun).
  JU: jonossa ketjussa O (pid 91117) ketjun L jälkeen, iphone + ipad, lokit nui-nostokuvat-1b-tarina-{iphone,ipad}-10845cd24.
  SEURAAVA: katso j-1..j-5 (lehti vierii, kuvat vuorotellen vasen/oikea, loppu ja lähteet) → parit PT:lle (pari.py: PIL vierekkäin, 3600 px).
- Lokien "POIKKEUS ArgumentOutOfRangeException" (SearchDatabase.EnumerateAll) = editorin QuickSearch, ei peli; harmiton.
- Kuvateksti-1 korvautuu kuvateksti-2:lla (JU:n ketjussa L kohta 5).

## JU:n ketju L yhä: ipad70-4 a7866450f, pariisipallo-2 5fa61ed04, tahtikyltit-1 0f62c5656, kuvateksti-2 b2a7046da (tarkistukset -2325:ssä).
