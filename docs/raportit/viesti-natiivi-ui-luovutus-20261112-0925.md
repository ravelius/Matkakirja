# Natiivi-UI: luovutus 12.11.2026 klo 09.25 (tiivis, Raamattu 7.37)

Natiivikoodi: natiivi-backup-remote, worktreet /Users/Shared/Claude/wt/nui-*. Mac-ajot JU:lla, lokit /Users/Shared/Claude/proto-3d/lokit/,
skenaariot /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/. Käännöstarkistus: <worktree>/Peli-testit/unity-tarkistus.sh (rc 0 = 0 virhettä).
Kello date-komennosta. Kuvat ≤ 1000 px pienennöksinä omaan katseluun, KK:lle täysikokoiset rajaukset.

## AUKI (järjestyksessä)

1. TARINAMERKKI-7 — 7fb733b3d, haara natiivi-ui/tarinamerkki-koe-2, worktree wt/nui-tarina. JU:n Mac-jonossa (pyydetty 09.3x),
   skenaario sk-tarinamerkki-7.txt → lokit/nui-tarinamerkki-7-7fb733b3d (l-, k-, kk-tiimalasi-B).
   - KK 09.12 valinta: TIIMALASI B (paperipohja), kirja ja A pois koodista (tehty 2cdb03e2d). Korjaukset: ympyrä 0,75× (tehty),
     kosketus ≥ 44 pt (TarinamerkkiOsuma; napautus kytketään vasta oikean datan kanssa, suunnitelman osa 3), nimet eivät jää alle.
   - KK 09.21: syvyys KUTEN TÄHTI (LessEqual), taulun alareuna 40 m (TarinaPohjaM), jotta viereiset katot eivät tule läpi (tehty 7fb733b3d).
   - -6 (2cdb03e2d, ZTest Always): katot ok, koko ok, MUTTA "Jardin des Plantes" jäi yhä merkin alle: kiinteä ladonta ei väistä
     kalusteita (omistaja 8.11. 12.40: nimi ei väistä). Siksi 7fb733b3d: merkki siirtyy ruudulla ylös nimen yli
     (Nimikerros.KiinteatLaatikot). Kaupunkinimet ja nostonimiöt väistävät merkkiä kalusteena (KaupunkiMerkit.Kalusteet, UiNakymat.KartanNapit).
   - TARKISTA -7:stä: tila-rivit ("piirretty 3", "siirto ylös N pt" puistolle > 0), täysikokoiset rajaukset kolmesta taustasta
     (katot 48.8420/2.3476, puisto 48.8438/2.3600, joki 48.8475/2.3622) + kaukonäkymä: Jardin-nimi näkyy, katot eivät tule läpi,
     edessä oleva rakennus saa peittää. Tila-rivin pt-luvut ovat batchin 640×480-ruudusta: älä raportoi niitä laitteen pt:nä.
   - OK → rajaukset KK:lle yhtenä viestinä → junasana → pt-ok PT:ltä. Rajausskripti: PIL crop ±300×200 px keskipisteen ympäriltä.

2. LUENNAT-ASETUS — 0b7f0e02f, natiivi-ui/luennat-asetus (98e8e9f10:n päällä), worktree wt/nui-luennat. Puhe hakee manifestin uudelleen
   Asetus.Vaihtui-tapahtumasta (ennen luki ennen sisältöpaketin asetuksia → v12–v14 eivät olisi tulleet viennillä), KertojanEsilataus
   ajaa kaupungin uudelleen Valmisluennat.Versiolla. KK 09.21 JUNASANA EHDOLLA: JU:n koekansiokoe (asetukset.json v12) skenaariolla
   sk-mac-luennat-v12.txt näyttää "valmisluennat: 9278 … v11" → "9286 … v12" JA erän 1 pala soi (Sainte-Chapelle #3 5f2b0ca0… tai
   Invalidit #3 3b2dc370…; "puhe: alkoi … <heksa>.mp3"). Täyttyy → kooste KK:lle + pt-ok-pyyntö PT:lle. Ei → syy lokista, korjaa.

3. INTRORIVIT ERÄ 3 — 755936ac8, natiivi-ui/intro-rivit-era3, worktree wt/nui-intro: 237 riviä 24 kohteesta (SK b27110ebe json).
   KK:n junasana 09.21; pt-ok PYYDETTY PT:ltä 09.24. Bergenin 4 Valletta-kuvaa EI tauluun (PR 6593 poistaa ne Bergenistä).

## VALMIIT TÄNÄÄN (ei toimia)
- Luennat v11 224.103 linkissä (98e8e9f10); KK:n ehto täyttyi (9278, ei valmista 0, Invalidit .mp3). Kooste KK:lle lähetetty.
- Introrivit erät 1–2 linkissä 224.102.

## HUOM
- Koodin ManifestiOletus on v11; sitä ei nosteta erä kerrallaan (erät viennillä 0b7f0e02f:n jälkeen), vasta viimeisen erän jälkeen.
- Kohde-komento `ui nahtavyysesittely kohde <id> <lat> <lon>`: id ilman välilyöntejä (Orsayn taidemuseo, Tuileries'n palatsi eivät käy).
- Scratchpad-skriptit (era3_vertaa.py, era3_lisaa.py) jäävät edellisen session scratchpadiin; erän 4 tullessa SK:n json → IntroNimet
  (SaapumisKuvat.cs) osion loppuun samalla kaavalla, vertailu 100 % ennen commitia.
