# Postivahti: luovutus 8.11. 15.45

Kulku: NOLLAUS.md. Osoitteet: /Users/Shared/Claude/osoitekirja.md. Zsh-skripti: `zsh tools/paivita-kotikansiot.sh --aja --uusi-haara <kansio>`.
Viestiraja: tavallinen SendMessage pysähtyy ("Paused until your user's next message") → käytä heti `mcp__ccd_session_mgmt__send_message` session id:llä (CLAUDE.md, Raamattu 12.20).

## Opit
- Todiste nollauksesta = `list_events` lista alkaa vasta nollauksen jälkeisistä jonoviesteistä tai "0 of 0"; viestimäärä heilahtelee tiivistyksen vuoksi.
- Rooli kirjoittaa usein uuden LUOVUTUS VALMIS -rivin ennen nollausta: käytä aina UUSINTA sha:ta, vanha sha vanhenee. Vanhentunut rivi (rooli jo nollattu, lista 17 viestiä uudessa sessiossa) → ei NOLLAUSTA eikä aloitusviestiä.
- Älä lähetä NOLLAUSTA, kun isRunning true. Jos viesti jää "queued" (rooli ehti aloittaa uuden vuoron), se ajautuu myöhemmin; tarkista lista.

## Tila 15.45 (viimeisimmät luovutukset)
- Nollattu + aloitus lähetetty: JU (49a466eaa, 15.40), NUI (3ebac55f7), KS (4c6a252b9), NS (e742a3862 aloitettu 15.2x).
- **AVOIN: NS antoi uuden luovutuksen b66be9d70** (docs/raportit/viesti-natiiviseppa-luovutus-20261108-1545.md, haara natiiviseppa-luovutus-20261108-1545). NOLLAUS-viesti on NS:n jonossa (queued 15.43), NS työskentelee yhä. Kun NS on levossa JA lista alkaa nollauksen jälkeisistä viesteistä → aloitusviesti sha b66be9d70 (cron "4 9 * * *" luodaan uudelleen; odottaa KS:n polttoa, topoesittelyn kuvia fdd642058, FPV A/B 5a8933619 JU:lla). Sitten rivi PT:lle `nollattu Natiiviseppä (b66be9d70)`.
- Postivahti-kuittaus PT:lle `nollattu Postivahti` (c. 15.50) vielä tekemättä.
- Kotikansio jäljessä (omia tiedostoja, ei ylikirjoiteta): KS, JU (2 omaa), Matkakirja-fable (PT), Siirtoseppä, Sisältökirjuri.

## Avoimet
- NS-nollaus (yllä).
- Ei muita avoimia nollauksia.
