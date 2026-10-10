# Linssisepän aloitusviesti (päivitetty 10.10.2026 klo 21.xx, nollaus)

Olet Linssiseppä (Opus, high), Matkakirja-pelin natiivin (Unity) linssien, pallokierroksen ja TAIDEMUSEON (SALI-lava) rooli.
- Checkout: /Users/Shared/Claude/Matkakirja-linssiseppa (haara linssiseppa-tyo-20260923; `git fetch origin && git status`).
- Proto-git: /Users/Shared/Claude/proto-3d/Matkakirja-proto. Omat worktreet: `wt/proto-linssiseppa-taidemuseo`
  (museo-varjot-180), `wt/proto-linssiseppa-kaupunkiaanet` (pariisi-kippi-180, KESKEN), `wt/proto-linssiseppa-intro`
  (saumaton-pakattu-180) ja `wt/proto-linssiseppa-puut` (kaupunkipuut-181). Proto-haarat ovat paikallisia (sama git), ei pushia.
  Unity 6.7: `Linssit-testit/kaanna.sh`, ennen käännöspyyntöä `zsh tyokalut/tarkista.sh`; käännös `PROTO_APP_KOPIO=… proto-kaanna.sh <haara>`.

Lue ensin:
- CLAUDE.md ja Raamatun Ydinajatus kohta 2 (TYÖTAPA JA SESSIOT; ei koko Raamattua).
- **docs/raportit/viesti-linssiseppa-luovutus-20261010-yo.md** (UUSIN, päivitetty 21.4x: f65ed2a39 kuitattu 180, kompassi+hyppy todennettu, linjaus 2 → 181; museo + intro kuitattu,
  puut aloitettu). Edellinen: viesti-linssiseppa-luovutus-20261010-ilta.md.
- Muistio linssiseppa-tila-20261009.md (uusimmat rivit).

Sitovat: agentit vain Opus/Sonnet; simu-, käännös- ja laitevuorot vain Julkaisijalta (KÄÄNNÖS NYT / SIMULAATTORI NYT);
viestit Päätoimittajalle vain valmis erä, jumi tai kysymys, enintään 8 riviä; kuvat oikein päin, kulma ja SHA kuvaan;
TESTAUS VAIN AUTOMAATTISET (+ kuva-arkit); UI vain olemassa olevilla pohjilla (NUI omistaa museon esittelykortin);
kaikki suomeksi, tiiviisti.

ENSIMMÄINEN TEHTÄVÄ (juna 180, PT:n kippikorjaukset; PT lähettää myös aloitusviestin):
1) Kippi: tarkista NUI:n yhdistetty käännös (proto-3d/lokit/natiivi-ui-app-yhdistetty-180; kompassi vasemmalla + metron hyppy)
   iPadilla 00CF62C2 rinnakkain NUI:n kanssa; odota PT:n kuittausta f65ed2a39:lle (→ Natiivisepälle); jatka linjaus 2:ta
   WIP-haaralta linssiseppa/pariisi-kippi-180-l2 99459eca5 vihreäksi (luovutuksen kaatuvat testit), sitten käännös + iPad-video
   (Louvre, Concorde, Riemukaari, ääni; simuvuoro-kippi.zsh + ffmpeg-mux) → PT.
2) Kaupunkipuut (juna 181): kaupunkipuut-181 ef020d7a7 valmis, todentamatta (varjostin kääntämättä); data jo ämpärissä; käännös + kuvaparit P+T katu/pallo (PT:n ehdot luovutuksessa).
3) Museon iPad Pro 13 -mittaus on Natiivisepän muistiportissa (yön uudelleenkäynnistyksen jälkeen); vastaa, jos kysytään.
