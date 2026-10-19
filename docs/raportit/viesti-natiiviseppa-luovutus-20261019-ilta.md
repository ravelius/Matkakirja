# Natiivisepän luovutus 19.10.2026 klo 17.4x (Postivahti: KOVA RAJA 35 %)

Lue ensin: CLAUDE.md, Raamatun Ydinajatus kohta 2 ja tämä kokonaan. Pysyvät säännöt: proto-3d/tyokalut/natiiviseppa-skriptit/juna183/luovutus-huomiot.txt.
Jono (lopusta alkuun = uusin tila): natiiviseppa-skriptit/juna204/jono-204.txt. Id:t AINA osoitekirjasta (gmail-tili 19.10.; PT local_8d8ebf72-…).
Käynnissä EI ole omaa käännöstä, lukitusta eikä pitkää ajoa (viimeiset testit valmiit 17.19).

## TILA: JUNA 204 – runko VIHREÄ, odottaa 3 ehtoa + PT:n "LUKITSE 204"
- **Runko natiiviseppa/juna-204 = d16ab89a56850e165f5207ab2b7a7ec6d722cbe6** (wt/proto-natiiviseppa-ehdokas), pohja BUILD 203 fe492a7ff.
  Testit 17.19: Linssit 2135, Peli 632, Kartta 517, tarkista 0, peili 0. Peili peili/proto/natiiviseppa/juna-204.
- Mukana (first-parent fe492a7ff..): PK ISS B6/B7/C2/C4 + iPad-vipu + Natal/Mazatlán (poiminta 71d9f6c43) + juoksupeli Rata v4 e5016f4ce; NUI ISS-otsikot,
  ympyräikkuna, B1 + krediitit, C1e logo 945577013, valikko-204 348fa6b76, lenna-itse ada01496b; LS Louvren nainen, Mona Lisa, Kamerajohtaja a+b,
  kamerajohtaja c9a9a6ddf, Kysy 8 / hiljaa 17425466c, museo cb166ad2b, Kööpenhamina ba13ebaf9; KS kohdekaupungit, lentojen kamera, PalloKierto 579b175c6;
  Lavastaja sali-v2q, grafiikan kehys, kehysvarjo, kehyssävy 429cb6099; VS ISS-kamerat fc1d0a3f0, nostokortti 5ffefb69e + b e696164d9 (⊃ NUI x-sulku-reuna 3c17f1f32);
  Työkaluseppä tarkistukset f3fb0c3b3.
- EI mukana (tarkoituksella): PK d1fcf02d6 (korvattu), NUI aarnin-luettelo-204 1b25928b5 (PERUTTU), NUI x-sulku-204 suoraan (tuli VS:n kautta), VS iss-nostot-204
  (omistaja 16.56: ilman ISS-ilmiöitä), 3 uutta aarretta (omistaja 17.11 → juna 205).
- **EHDOT ennen LUKITSE 204 (PT 17.3x), kaikki yhdistyvät puhtaasti d16ab89a5:een:** ☐ NUI valikko-jatko-204 90127efc5 (Sheba/Montezuma + Aarnin luettelo, +B3 iPad),
  ☐ PK kuvalahde-linkki-204 5890ccd32, ☐ Lavastaja kehyskiilto-204 ea0fe613a. Ota kukin vasta PT:n simukuittauksella → testit204.sh → sha PT:lle.
- OMISTAJA PYYSI JULKAISUA 13.31 (ehdollinen): "junan voi julkaista sitten kun kaikki pyyntöni ovat tehty. linnaa tai juoksupeliä ei tarvitse sisällyttää".
  Omistaja 17.09: ILMAN Laitetestaajan kierrosta → LUKITSE 204 → TF suoraan ulkoisille.
- **LUKITUS valmiina**: juna204/lukitse204-ajo.sh <runko> → -a.sh → -b.sh <runko> "<käännös>" "<muisti>" "<testit>" (juna/b32, pohja master fe492a7ff), mac204.sh.
  Ennen -b: täytä build204-viesti.txt:n "TÄYTÄ LUKITSE" (PT:n LUKITSE 204 -viesti sanatarkasti) ja muutosloki-204.txt (PT:n kuittaama; luonnos
  muutosloki-204-luonnos.txt 268 mrk, täydennä valikko-jatkolla). Muutosloki-PR (tools/vienti/muutosloki-natiivi.json) mergetään ITSE ennen lukituskäännöstä.

## OPITUT 19.10.
- PT voi antaa käännöspalvelun yhdistelmä-shan ("Käännöspalvelu: …"-merge) → ota roolin OMA haarakärki; tarkista ettei mukana kuittaamatonta.
- Roolin "PT kuittasi" ilman PT:n omaa viestiä → kysy PT:ltä (PT vahvisti aina; ehtolistalla olevan saa ottaa ja kertoa jälkikäteen).
- Kahden erän yhteisvaikutus (kameravahti × juoksupeli) → palauta runko edelliseen vihreään, talteen natiiviseppa/juna-204-*-haara, peili -f.
- kameravahti.json-ristiriita: ota pienempi lähtötaso hunkittain, sitten kameravahti.py rc 0.
- Mediariippuvaiset erät: tarkista ämpäri (curl + SHA256SUMS) ennen mergeä; JU ei ylikirjoita ämpäriä → uusi polku.
- Kuorma 400+ (swap): enintään 1 testisarja kerrallaan; tarkista.sh voi ylittää 2 min → aja testit204.sh taustalla.

## LEVY
- Siirretty T7 _siirretyt/natiiviseppa-lokit-20261019 (Mac-TF-203-appi 644 M + vanhat lokit/metat). wt: ehdokas = runko, tyokalut YHTEINEN, unity-* symlinkit T7:lle.
