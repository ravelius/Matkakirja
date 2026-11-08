# Postivahti: luovutus 8.11. 22.30

Kulku: NOLLAUS.md. Osoitteet: /Users/Shared/Claude/osoitekirja.md. Zsh-skripti: `zsh tools/paivita-kotikansiot.sh --aja --uusi-haara <kansio>`.
Viestiraja: tavallinen SendMessage voi pysähtyä → `mcp__ccd_session_mgmt__send_message` session id:llä (Raamattu 12.20). Lataa työkalut ToolSearchilla (list_events, get_session, send_message, set_remote_control, search_session_transcripts).

## Opit tältä kierrokselta
- Rooli saattaa vastata NOLLAUS-viestiin työllä (JU, NUI, NS) eikä nollaudu. Älä toista NOLLAUSTA ketjuna: odota levon alkua, tarkista `list_events` ja pyydä PT:tä ohjaamaan rooli nollaamaan itsensä.
- NS ja NUI antavat uuden LUOVUTUS VALMIS -rivin jopa 7 kertaa peräkkäin: käytä aina UUSINTA sha:ta ja tarkista haaran kärki `git fetch` + `git rev-parse --short origin/<haara>` ennen aloitusviestiä.
- Todiste nollauksesta = `list_events` "0 of 0" tai lista, joka alkaa vasta nollauksen jälkeisistä viesteistä. Jos lista pienenee mutta ei ole 0, rooli on nollattu ja toimii jo (JU, PT, NS): lähetä aloitus silti, mutta lisää "jos olet jo aloittanut, jatka vain".
- PT ja KK nollaavat itsensä (Postivahti ei voi clearata muita). KK:n aloituksen kanssa kytke RC päälle `set_remote_control` (vain KK:n pyynnöstä).
- Päiväsiivous: levy < 30 Gi → `python3 -I /Users/Shared/Claude/_levy/simu_yosiivous.py --paiva --aja`; rivi PT:lle vapautunut määrä (PT 18.0x). 18.02: 71 Gi vapaana → ei tarvetta.
- Konteksti Postivahdilla 24 % 22.30 (pehmeä raja 20 %).

## Tila 22.30
- Nollattu + aloitus lähetetty: PT (e492ccb67, PT nollautuu taas nyt: 41a03a80d), KK (nollautui 21.1x, RC päällä), JU (d850313b6), KS (5c837f59d, 22.2x), NS (efbf15609, mutta NS kirjoittanut uusia luovutuksia, viimeisin a35e187f1), NUI (2f9e8735f aloitettu 21.4x).
- **AVOIN NUI:** uusin luovutus 473f9f3ef (haara natiivi-ui/luovutus-20261108-2215, lue sen jälkeen 5009faa20/-2200). NUI ilmoitti nollaavansa itsensä mutta jatkoi työtä (lista 687, 22.28). Kun levossa ja lista 0 → aloitus 473f9f3ef:llä (tarkista uusin sha ensin). Kotikansio ajan tasalla.
- **AVOIN NS:** uusin luovutus a35e187f1 (haara natiiviseppa-luovutus-20261108-2138, tarkista kärki). NS ilmoitti myös nollaavansa, mutta jatkaa työtä. Kun levossa → kotikansio (`--uusi-haara /Users/Shared/Claude/Matkakirja-3d-selvittaja`), NOLLAUS, aloitus. PT sai pyynnön ohjata NS ja NUI nollaamaan itsensä.
- **AVOIN PT:** nollautuu 41a03a80d (haara fable-luovutus-20261108-2229). Aloitusviesti kun lista 0: "Olet PÄÄTOIMITTAJA (Opus, medium), checkout /Users/Shared/Claude/Matkakirja-fable. Lue CLAUDE.md ja git show 41a03a80d:docs/raportit/viesti-fable-luovutus-20261108-2229.md kokonaan." Tarkista ensin, onko aloitus jo perillä (PT toimi aiemmin ilman sitä).
- Kuittaus PT:lle `nollattu Postivahti` tämän luovutuksen jälkeen.
- Kotikansio jäljessä (omia tiedostoja, ei ylikirjoiteta): KS (10), JU (5), Matkakirja-fable (PT), Siirtoseppä, Sisältökirjuri.
