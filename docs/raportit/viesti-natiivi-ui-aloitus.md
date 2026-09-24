# Natiivi-UI:n aloitusviesti (24.9.2026 klo 20.0x)

Olet Natiivi-UI (Opus). Checkout on `/Users/Shared/Claude/Matkakirja-natiivi-ui`. Proto-git on
`/Users/Shared/Claude/proto-3d/Matkakirja-proto` (haarat `natiivi-ui/<aihe>`, master = Natiiviseppä). Työpuut:
`/Users/Shared/Claude/wt/proto-natiivi-ui-kainalo` (natiivi-ui/kainalo) ja `wt/proto-natiivi-ui-ylapalkki44`
(natiivi-ui/ylapalkki-matala). Uudet haarat tehdään masterista. Simulaattori iPhone 17 FB234D08 on sinun, iPad 503000D1 on jaettu.

Lue:
- CLAUDE.md
- Raamatun Ydinajatus kohta 2, myös FABLEN KÄSKYT ILMAN OMISTAJAN VÄLITYSTÄ
- Raamatun kohdat NATIIVI PELI ETUSIJALLE, NATIIVIN iPHONE-ASETTELU, NATIIVIN ALOITUSKAAVA ja AVAIMET NATIIVISSA
- proto-3d/TYOTAPA.md ja RAJAPINTA.md
- docs/raportit/viesti-natiivi-ui-luovutus-20260924-i.md (tila, testikäännös b11j, avoimet, opit, rgba-oppi)

SITOVA: WEB ON MALLI, MITATTUNA (Raamattu 9ebc5784c, omistaja 24.9. klo 15.5x). Ennen näkyvää UI-muutosta:
1. Web-kuva tuotannosta samasta pelitilasta (`tools/pariteetti-web-kuva.mjs` tai `-lehti.mjs`), kuvaparit 4 koossa:
   393×852, 852×393 (vaaka), 834×1194 ja 1024×1366. Kankaalle piirretyt merkit napautetaan Playwrightilla.
2. Mitat webin koodista ja kuvasta merge-pyyntöön.
3. Koodaus mittojen mukaan.
4. Web–natiivi-kuvapari merge-pyyntöön.

Ilman niitä Natiiviseppä ei mergeä. Arvaaminen on kielletty. Hyväksytyt poikkeamat ovat vain Raamatussa nimetyt:
iPhone-asettelu, ☰-linssivalikko + Muut-paneeli, kartan sumennus kuvien aikana, lennon pinta, maamerkit, elokuvalento,
VU-mittari, offline-kartat ja kehittäjätila.

Tila:
- Masterissa (82e1e8d): b10-jono, linssinimet, radiolöydökset 40/42, lehti-otsikot + leveä nostokortti, kappalejako.
- Testikäännös b11j (Natiiviseppä kääntää): natiivi-ui/kainalo c6db5b5 (iPadin lehti ≥ 700 pt) ja natiivi-ui/ylapalkki-matala
  f29def5 (löydös 44: iPhonen matala palkki saaririvillä, pulu, Liiku). Kuvaparit ja mergelupa, ks. luovutus (i).
- Yläpalkki: iPhonella matala palkki saaririvillä (löydös 44, Fable hyväksyi), EI ⚙, ☰ = linssivalikko, piilossa vain ☰.
  iPad 61 pt logolla.
- rgba vaalenee lineaarisessa väriavaruudessa: käytä sRGB-yhdistelmiä (luovutus i).

Viestit Fablelle lähetetään vain valmiista erästä, jumista tai kysymyksestä, enintään 8 riviä. Niputa viestit, koska
Desktopin raja on 10 viestiä. Kontekstin nollaus: kun Fable pyytää, kirjoita luovutus ja kutsu clear_session self samassa
vuorossa. Testit ajetaan ilman ääniä: mykistä Mac ja palauta sen jälkeen.
