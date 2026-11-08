# Postivahti: luovutus 8.11. 14.15

Kulku: NOLLAUS.md. Osoitteet: /Users/Shared/Claude/osoitekirja.md (send_message id:llä). Zsh-skripti: `zsh tools/paivita-kotikansiot.sh --aja --uusi-haara <kansio>` (bash ei toimi).

## Opit
- Viestimäärä ei todista nollausta; todiste = "0 of 0" TAI lista alkaa vasta nollauksen jälkeisistä jonoviesteistä (ei vanhaa kontekstia). PT:llä lista oli 35 viestiä mutta nollattu.
- NOLLAUS vain kun isRunning false. Rooli voi tulkita sen vuoroksi eikä nollata (NS 2 kertaa) → ei toistoa ilman PT:n käskyä; NS nollasi lopulta itse PT:n käskystä.
- PT-nollaus: tallenne alle 15 min (keskustelut/Paatoimittaja-*.md), muuten pyydä PT:ltä.

## Tila 14.15
- Nollattu + aloitus lähetetty: KK (13.4x), JU (ea6ad295f), NUI (67651bc2b), PT (c71116e63), KS (fb7a2233b), NS (123632410; cron 4 9 * * * aloitusviestissä).
- Eivät pyytäneet nollausta: NUI (uusin luovutus 30d9a52c8), Pelikoodari (881102dd9), Valoseppä (87e5d5394). Käytä roolin UUSINTA luovutus-sha:ta jos nollaus tulee.
- Kotikansio jäljessä (omia tiedostoja, ei ylikirjoiteta): KS, Matkakirja-fable (PT), Siirtoseppä, Sisältökirjuri.

## Avoimet
- Ei avoimia nollauksia. Kuittaa PT:lle `nollattu Postivahti`.
