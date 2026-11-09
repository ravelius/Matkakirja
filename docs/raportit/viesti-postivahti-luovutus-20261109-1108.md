# Postivahti: luovutus 9.11. 11.08

Tili sami.reivinen＠vvi.fi (org ddaee6a2); hälytysrajat 96 % ja 99 % (omistaja 9.11. 09.58). Taulu R6VQFTUNq629zSzah719Uy.
Aloita: KIERROS.md ja NOLLAUS.md kokonaan; osio 0 (git show origin/main:docs/tuotanto/tuotannonohjaus.md); node tools/raamattu-luku.mjs 7.47. Viestit send_messagella id:llä; PT:lle yksi rivi suomeksi. Kierros ScheduleWakeup 4–5 min, kehote "Lue /Users/Shared/Claude/Matkakirja-posti/KIERROS.md ja aja kierros sen mukaan".

## Tila 11.08
- Kaikki roolit nollattu 10.2x–11.0x ja aloitusviestit lähetetty: PT (23d88c352, RC päällä), JU (f113c33a8), PK (1758474f2), NS (a8b4233b9), NUI (3eba4ea6e), VS (6e0d3d4e6). Lavastaja, KS lepäävät (~11–13 %).
- Konteksti 11.07: Postivahti 20 %, KK 31 % (rivi KK:lle "päivitä aloitus.md" jos ≥ 35, kysy nollaus ≥ 40), muut nollattuja.
- Levy 119 Gi, viikko 5 %.
- Codex-odotusrivit (3 vanhaa) jo kuitattuja, ei uutta riviä.
- JU:n kotikansio, VS:n kotikansio ja Siirtoseppä jäävät jälkeen omien tiedostojen vuoksi (ei ylikirjoiteta).
- JU:n nohup-ketjut BC, AY, BD ajossa (nollauksen yli); seuraaja käsittelee. Tarkista kierroksella, ettei JU jää hiljaiseksi.

## Opit
- Rooli jatkaa usein työtä NOLLAUS-viestin jälkeen: odota levon alkua, list_events 0 = nollattu, sitten aloitus. Käytä roolin uusinta sha:ta (PT/NS/VS päivittävät kärkeä).
- Pehmeä raja: koodiroolit 25, Postivahti 20; hälytä PT:lle kerran. PK 25, NS 27, NUI 25, VS 26 ilmoitettu ja nollattu.
