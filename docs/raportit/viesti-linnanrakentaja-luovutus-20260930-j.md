# Linnanrakentajan luovutus 30.9.2026 klo 15.4x (-j): äänet pidossa, uusi rakenne luonnoksena, ISS-paneeli valmis

Rooli: **Linnanrakentaja (Opus, high)**. Edellinen `…-20260930-i.md`. Päätoimittaja, Julkaisija ja Siirtoseppä: viestit NIMELLÄ.

## SITOVA (omistaja 30.9. klo 15.0x)
Uusia ääniä EI generoida ilman omistajan erillistä lupaa (ElevenLabs, xAI tai muu). CC0/PD-äänitteet eivät ole
generointia, mutta alkuperä tarkistetaan (ei tekoälyllä luotuja). Tämä koskee myös Pulun repliikkejä ja kertojaa.

## Avoinna
1. **PR #3702, linnan CC0/PD-äänet kytketty (PIDOSSA).** Järjestys: omistajan suora lupa Julkaisijalle → mp3-vienti
   `proto-3d/_valmiit/linna-aanet/vienti-v1/` (26 kpl) → `dioraama/olavinlinna/aanet/v1/` → todennus → merge.
   Siirtoseppä on kuitannut paketin (massa äänitilana, 1.0.57–BUILD 72). Worktree `wt/linnanrakentaja-linna-aanet-kytkenta`.
   Mergen jälkeen: Siirtoseppä todentaa puhtaalla asennuksella, ja valmis-viesti menee Päätoimittajalle.
2. **Luonnos-PR #3701, uusi rakenne** (omistaja 30.9. klo 15.28): kertoja 4 jaksoa (kamera + kameraPysty), lyhyt
   saapuminen 6 s, infotaulut, pulu.teksti (samassa oliossa kuin laskeutuminen), etsinta[].rivi. Tekstit v2
   Päätoimittajalta ja infotaulurivit hänen. Lähteettömät taulukohdat on korjattu (Sisältökirjuri 5684d5d81).
   Siirtoseppä tekee Unity-puolen, kuvaparin ja videon. Testipaketti: `proto-3d/_valmiit/linna-kertoja/paketti/`.
   **Rebase mainiin #3702:n jälkeen** (samat tilatiedostot). Kamerapaikat päivitetään Siirtosepän hiomilla arvoilla.
   Worktree `wt/linnanrakentaja-linna-kertoja`.
3. **Pulun repliikit P1–P17** on poistettu uudesta rakenteesta. Hahmojen repliikit jäävät, eikä niille generoida
   ääniä ilman lupaa.

## Valmiit tänään
- #3663 Blender-vienti (osoitin f384fc52), #3695 ISS-kytkinpöydän skriptit (v2 toimitettu Linssisepälle:
  `proto-3d/_valmiit/iss-paneeli/v2/`), #3698 äänisuunnitelma ja lähteet (`docs/raportit/linna-aanet-suunnitelma-20260930.md`).
- Omat simulaattorit 3AA8F853 ja F75C92E7 on poistettu levysiivouksessa (Postivahti). Laitetodennus hoidetaan Siirtosepän kautta.

## Opit
- R2 ei tue s3→s3-kopion tagikutsuja → lataa ja lähetä (vie-dioraama #3674).
- Blender-paketti suodattaa tilat, joilla ei ole leivottua glb:tä. Äänitila jätetään vain äänikentin (lisaaBlender).
- Tila.pulu on käytössä ({laskeutuminen, taulupuoli}): lisää uudet kentät samaan olioon, älä korvaa.
- Squash-mergetyn haaran päälle tehty työ: cherry-pick mainin päälle, ei rebasea.
- Commons ym. latauksissa User-Agent ilman sähköpostia.
