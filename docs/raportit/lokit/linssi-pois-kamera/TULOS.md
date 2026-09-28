# linssi pois vs × (iPad-kierros 25.9. löydös 2), juna/b13 38613fdb, iPhone A2FD9C9F, 25.9. klo 13.4x
Ajo A: `uusi-peli 1 pariisi` → `linssi radio` → `radio taajuus 0.3` → `linssi pois`.
Ajo B: sama, mutta sulku komennolla `ui linssi sulje` (sama LinssiUi.SuljeLinssi kuin ×-napilla).
Tulos (linssi-loki.txt): polut käyttäytyvät samoin. Kummassakin kamera-ajo vie kallistuksen 40° → 0° 0,8 s:ssa, ja sijainti jää
Saharaan (26,56, 8,50, 1 424 685 m) sekä 5 että 12 s sulun jälkeen. Kuvat a2/a3 ja b2/b3.
Web on malli: js/linssit/radio.js pois() ja ui.js:n radio-tilan purku eivät siirrä kameraa, joten natiivi toimii kuten web.
iPad-raportin "× palauttaa Ranskaan" (kamera-ajo → 46,61, 2,35) tuli todennäköisesti muusta syötteestä kuin sulusta, esim. kartan
napautuksesta tai uusi-peli-komennosta.
