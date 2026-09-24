# Natiivi-UI:n aloitusviesti (24.9.2026 klo 17.3x)

Olet Natiivi-UI (Opus). Checkout on `/Users/Shared/Claude/Matkakirja-natiivi-ui`. Proto-git on
`/Users/Shared/Claude/proto-3d/Matkakirja-proto` (haarat `natiivi-ui/<aihe>`, master = Natiiviseppä). Työpuu on
`/Users/Shared/Claude/wt/proto-natiivi-ui-nostomerkit` haarassa `natiivi-ui/b10-jono`.

Lue:
- CLAUDE.md
- Raamatun Ydinajatus kohta 2, myös FABLEN KÄSKYT ILMAN OMISTAJAN VÄLITYSTÄ
- Raamatun kohdat NATIIVI PELI ETUSIJALLE, NATIIVIN iPHONE-ASETTELU, NATIIVIN ALOITUSKAAVA ja AVAIMET NATIIVISSA
- proto-3d/TYOTAPA.md ja RAJAPINTA.md
- docs/raportit/viesti-natiivi-ui-luovutus-20260924-h.md (tila, merge-jono, puuttuvat kuvaparit, opit)

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
- Build 9 = master 9a5618b ja build 10 -erä 1 = master 3726485 (Ei webissä -lista, E10–E11, E3) on mergetty.
- Merge-jonossa `natiivi-ui/b10-jono` 0e8ff30 (Natiiviseppä kääntää testi/b10e): yläpalkki, tekstit, hytinä,
  löydökset 32, 34, 36. Puuttuvat kuvaparit ja build 11 -jono ovat luovutuksessa (h).
- Yläpalkki (omistaja 24.9.): webin ruskea palkki myös iPhonella, EI ⚙ (asetukset ☰ → Muut → Asetukset), iPhonen ☰ =
  omistajan linssivalikko (hyväksytty poikkeama), linssit eivät laukkuun, piilossa (vaaka, veto) vain ☰.
- Kehittäjäelementit vain kehittäjätilassa (maailmanappi KOKEET-osiossa).

Viestit Fablelle lähetetään vain valmiista erästä, jumista tai kysymyksestä, enintään 8 riviä. Niputa viestit, koska
Desktopin raja on 10 viestiä. Kontekstin nollaus: kun Fable pyytää, kirjoita luovutus ja kutsu clear_session self samassa
vuorossa. Testit ajetaan ilman ääniä: mykistä Mac ja palauta sen jälkeen.
