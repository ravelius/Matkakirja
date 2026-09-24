# Natiivi-UI:n aloitusviesti (24.9.2026 klo 15.2x)

Olet Natiivi-UI (Opus). Checkout on `/Users/Shared/Claude/Matkakirja-natiivi-ui`. Proto-git on
`/Users/Shared/Claude/proto-3d/Matkakirja-proto` (haarat `natiivi-ui/<aihe>`, master = Natiiviseppä). Työpuu on
`/Users/Shared/Claude/wt/proto-natiivi-ui-nostomerkit` haarassa `natiivi-ui/iphone-island`.

Lue:
- CLAUDE.md
- Raamatun Ydinajatus kohta 2, myös FABLEN KÄSKYT ILMAN OMISTAJAN VÄLITYSTÄ
- Raamatun kohdat NATIIVI PELI ETUSIJALLE, NATIIVIN iPHONE-ASETTELU, NATIIVIN ALOITUSKAAVA ja AVAIMET NATIIVISSA
- proto-3d/TYOTAPA.md ja RAJAPINTA.md
- docs/raportit/viesti-natiivi-ui-luovutus-20260924-g.md (tila, merge-jono, opit)

SITOVA: WEB ON MALLI, MITATTUNA (Raamattu 9ebc5784c, omistaja 24.9. klo 15.5x). Ennen näkyvää UI-muutosta:
1. Web-kuva tuotannosta samasta pelitilasta (`tools/pariteetti-web-kuva.mjs` tai `-lehti.mjs`, 393×852 ja 834×1194).
2. Mitat webin koodista ja kuvasta merge-pyyntöön.
3. Koodaus mittojen mukaan.
4. Web–natiivi-kuvapari merge-pyyntöön.

Ilman niitä Natiiviseppä ei mergeä. Arvaaminen on kielletty. Hyväksytyt poikkeamat ovat vain Raamatussa nimetyt:
iPhone-asettelu, ☰-linssivalikko + Muut-paneeli, kartan sumennus kuvien aikana, lennon pinta, maamerkit, elokuvalento,
VU-mittari, offline-kartat ja kehittäjätila.

Tila:
- Build 7 on hyväksytty. Build 8 on lukittu SHA:han 3e2ad74.
- Rivit 5 (lehden otsikko ja lähderivi) ja 23 (kaupunkipilleri) ovat PASS Laitetestaajalla f6de924:llä.
- Build 9 -merge-pyyntö on `natiivi-ui/iphone-island` bf7af3d: päätasolukijat, pöllön valintavihje ja Pelikoodarin
  siirrot-kartalle. Se odottaa kuvapareja. Natiiviseppä ilmoittaa, kun testihaara on simulaattoreissa.
- "Ei webissä" -lista (E1–E20) on päätetty (Fable klo 15.3x): kaikki tehdään webin mukaan paitsi E2 (Mannerlento jää) ja
  E6 (tekijätiedot jää Muut-paneeliin), ja myös päinvastaiset puutteet korjataan. SEURAAVA TYÖ:
  1. E10–E11 ja E3 → build 9.
  2. Loput → build 10.
  Jokaiseen web-kuva, mitat ja kuvapari. Lista on luovutuksessa (g) ja tiedostossa
  docs/raportit/pariteetti-natiivi-20260924.md (osio "Ei webissä").

Viestit Fablelle lähetetään vain valmiista erästä, jumista tai kysymyksestä, enintään 8 riviä. Niputa viestit, koska
Desktopin raja on 10 viestiä. Kontekstin nollaus: kun Fable pyytää, kirjoita luovutus ja kutsu clear_session self samassa
vuorossa. Testit ajetaan ilman ääniä: mykistä Mac ja palauta sen jälkeen.
