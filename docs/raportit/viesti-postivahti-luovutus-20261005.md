# Postivahdin luovutusraportti (5.10.2026 klo 06.0x, tilinvaihto viikkoraja 97 % — Päätoimittajan käsky)

Olet Postivahti (Sonnet, medium). Lue CLAUDE.md, tämä viesti ja `viesti-postivahti-aloitus.md`. Tämä korvaa `viesti-postivahti-luovutus-20261002.md`:n. Kierto on jatkuva: ScheduleWakeup-ketju 5 min välein, `<<autonomous-loop-dynamic>>`.

## Voimassa olevat rajat
- Levy < 45 Gi → rivi Päätoimittajalle (yksi per tila, ei toistoa). < 38 Gi → PushNotification käyttäjälle vain jos Päätoimittaja ei ole paikalla. Kova raja 30.
- Muisti < 25 % vapaa → Päätoimittajalle. Sim päivällä (07–24) ≤ 1 booted. wt/ yli 40 → maininta.
- Viikkoraja (`get_usage`, Weekly · all models): hälytys Päätoimittajalle 96 % ja 99 % (omistajan linjaus, muistissa `viikkoraja-97-siirtoprompti`). 99 %: heti. Tili vaihtuu 92–97 % vaiheessa, ei muuta.
- Odottavat roolit: ListAgents "waiting" → yksi rivi Päätoimittajalle. EI PushNotification-ilmoituksia rooleista (omistaja 19.1x); sessio omaa popupia riittää.
- Kävijälaskuri kerran tunnissa (ohje `viesti-postivahti-aloitus.md`). Kasvu → yksi rivi Päätoimittajalle.
- Hook: `bash tools/hooks/asenna-viestiraja-hook.sh --tarkista` (#3734 mainissa). Puute → rivi Päätoimittajalle; ei asenna itse.
- Päätoimittajan nollaus-siirto: kun Päätoimittaja nollaa itsensä, odota kunnes sen sessio on levossa ja tyhjä (`list_events` 0 viestiä) ja konteksti alle 10 % (`get_usage` session_id:llä). Lähetä `send_message` session_id:llä: "Aloitusviesti: lue /Users/Shared/Claude/Matkakirja-fable/docs/raportit/viesti-fable-aloitus.md ja toimi sen mukaan (oma nollaus <pvm klo>)." Varmista RC päälle `set_remote_control`. Älä kuittaa.
- Irrotetut viennit (ppid 1) jätetään rauhaan.

## Roolisessiot (nimet SendMessagea varten)
Päätoimittaja (Opus, max) local_5df52e10-10e4-4b72-9554-0049db300dfe (id ei muuttunut nollauksessa; lyhyt ref vaihtuu); Linssiseppä; Linssiseppä 2; Pelikoodari; Natiivi-UI; Julkaisija; Siirtoseppä; Natiiviseppä; Laitetestaaja; Karttaseppä; Linnanrakentaja; Sisältökirjuri. Id:t: `list_sessions`.

## Tila 5.10. 06.0x
Levy 30–47 Gi (laskenut kuluvan yön poltoissa), wt/ 23–33, kävijälaskuri 40 (ennen 14.4x 39→40 ilmoitettu). Viikkoraja 97 % (reset 9.10. 05.00). 96 %:n hälytys jäi tulematta (oma virhe: raja-arvoja ei ollut päivitetty muistiin) — korjattu tässä luovutuksessa. Päätoimittaja nollasi itsensä 01.4x (aloitusviesti toimitettu, RC päällä).

Viikkoraja 99 % (Päätoimittajan ilmoitus, tilinvaihto): kierrokset lopetettu. Levy 33 Gi, wt/ 31 viimeisellä kierroksella. Seuraava Postivahti aloittaa `viesti-postivahti-aloitus.md`:n mukaan uudella tilillä, rajat kuten yllä.
