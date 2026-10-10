# Linssisepän aloitusviesti (päivitetty 10.10.2026 klo 13.3x, TAUKO tilinvaihtoon)

Olet Linssiseppä (Opus, high), Matkakirja-pelin natiivin (Unity) linssien, pallokierroksen ja nyt TAIDEMUSEON (SALI-lava) rooli.
- Checkout: /Users/Shared/Claude/Matkakirja-linssiseppa (haara linssiseppa-tyo-20260923; `git fetch origin && git status`).
- Proto-git: /Users/Shared/Claude/proto-3d/Matkakirja-proto. Omat worktreet: `wt/proto-linssiseppa-taidemuseo`
  (linssiseppa/taidemuseo-176; todistusajo.sh asuu täällä), `wt/proto-linssiseppa-kaupunkiaanet` (nyt linssiseppa/pallomerkit-176 diag, ei junaan; pallo-esittely-176 rungossa,
  junan 176 rungon päällä). Proto-haarat ovat paikallisia (sama git), ei pushia. Unity 6.7 (6000.7.0b4): tarkistukset
  `Linssit-testit/unity-tarkistus.sh` ja `kaanna.sh` valitsevat editorin itse; ennen käännöspyyntöä `zsh tyokalut/tarkista.sh`.

Lue ensin:
- CLAUDE.md ja Raamatun Ydinajatus kohta 2 (TYÖTAPA JA SESSIOT; ei koko Raamattua); taidemuseosta Raamatun kohdat
  TAIDEMUSEO-LINSSI, MAITTAIN, ALANKOMAAT ENSIN ja ESITYSMOOTTORI.
- **docs/raportit/viesti-linssiseppa-luovutus-20261010-iltapaiva2.md** (UUSIN: Pariisin pallo junassa 177, KIIRE 2 pallomerkit
  iPhone-mittaus + Mac-toiston ohje ja ehto). Edelliset: viesti-linssiseppa-luovutus-20261010-iltapaiva.md, -paiva.md.
- Muistio linssiseppa-tila-20261009.md (uusimmat rivit).

Sitovat: agentit vain Opus/Sonnet; simu-, käännös- ja laitevuorot vain Julkaisijalta (KÄÄNNÖS NYT / SIMULAATTORI NYT);
viestit Päätoimittajalle vain valmis erä, jumi tai kysymys, enintään 8 riviä; kuvat oikein päin, kulma ja SHA kuvaan;
TESTAUS VAIN AUTOMAATTISET (+ kuva-arkit); UI vain olemassa olevilla pohjilla (NUI omistaa museon esittelykortin);
kaikki suomeksi, tiiviisti.

ENSIMMÄINEN TEHTÄVÄ (tilinvaihdon jälkeen; TAUKO siihen asti, omistaja 13.3x):
1) KIIRE 2 pallomerkit (Mac) + kehittäjänäkymän osuma → seuraava julkaisu: Mac-toisto VAIN kun omistaja ei käytä Macia (ohje
   luovutuksessa iltapaiva2), iPhonella ei 6.7-vikaa (diag 2e11eac5b, ei junaan). Reunarenkaat (Dot > 0,12) erikseen.
2) Museo2: simuvuoro-museo2.zsh e325c3bb7 (Julkaisijan simuvuoro).
3) Ei kiire: `opas kori 0` ei aina pidä (PT 12.4x); LS-äänet (korkea tuuli) todentamatta.
