# Postivahti: luovutus 30.10.2026 klo 19.2x (Sonnet 5.5, local_d8d003f6-1ae3-4a1b-854a-e0c018ed19f5)

Syy: PT:n pyyntö (19.0x, KK:n mittaus: konteksti mediaani 509k). PYSYVÄ MUUTOS (PT 19.0x): Postivahdin oma raja on 30 %. Kun ylität sen, kirjoita luovutus ja nollaa itsesi omalla kierroksellasi (clear_session self) ilman PT:n pyyntöä. (Tämä sessio oli 76 %:ssa.)

## Kierros (KIERROS.md, NOLLAUS.md luettava)
- Ajastettu ScheduleWakeup-kierros 10–15 min välein; prompt = "Lue /Users/Shared/Claude/Matkakirja-posti/KIERROS.md ja aja kierros sen mukaan." + HUOM-rivit (tila). Jatka samalla tavalla.
- Joka kierros: `date`, `df`, `python3 -I codex-odottaa.py` (vain UUSI tiedosto → rivi PT:lle; vanhat 3 kuitattuja), get_usage kaikille rooleille.
- Viestit toisille: `mcp__ccd_session_mgmt__send_message` (SendMessage pysähtyy 10 viestin jälkeen).

## Roolit ja id:t
PT local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc (Matkakirja-fable) · KK local_231e4bad-b9fe-41b8-8b45-02e35c45ebbe · LAV local_beb68834-6c4f-4839-ac75-7876b45052c3 (Matkakirja-linnanrakentaja, haara lavastaja-luovutus-130) · PK local_601d33fc-1c61-4ccd-8389-fa425417fafb (Matkakirja-pelikoodari) · VS local_3b36fe96-0199-4b17-9eb4-46a882ce7399 (Matkakirja-linssiseppa-2) · NS local_c7344e20-fba8-433d-ba8e-184a325037ef · KS local_ddd980b0-2760-4c5d-a0c8-d65ad1ecb757 · JU local_b4a7e82a-2522-437f-84ff-813401120931 · SK local_6daf85ea-7311-4d73-a8b7-466cec71636d · Asemataulu local_b4d61878-aa57-40fd-b21c-cc3af1add387 · NUI local_a3754ed8-f155-43b5-9095-b51e9e29ff53.

## Rajat (pehmeä/kova)
Koodi-/kartta-/sisältöroolit + JU + Asemataulu 25/35 · PT 30/40 · KK 40/50 (KK:ta ei nollata itse päivällä; vain omistajan kortilla, tänään KK nollattu omistajan päätöksellä 18.54) · Postivahti oma raja 30 % (uusi). Pehmeä → yksi rivi PT:lle per rooli-sessio; kova → KOVA RAJA roolille ("KOVA RAJA <x> % (raja 35): viimeistele käynnissä oleva askel, tee luovutus + push ja lähetä Postivahdille LUOVUTUS VALMIS <sha>") + rivi PT:lle.
Levy: <100 Gi → `python3 -I tools/levy/ika_kartoitus.py` ensin, sitten `python3 -I tools/levy/siirra_t7.py --aja` + rivi PT:lle (vapaa ennen/jälkeen); >30 Gi/h → PT + syyllinen (esikatselu/orto/editori-ajot).

## Nollausmenettely (opitut)
1. Hae uusin kärki: `git ls-remote origin <haara>` (LAV/PK päivittävät luovutusta useasti → ota uusin juuri ennen NOLLAUS-viestiä; "korvaa edellisen" -viestit tulevat).
2. Roolin pitää olla idle (list_events). Taustaajot: `pgrep -fl "esikatselu.sh|editori-lr|orto.sh|osasarja"` — huom. näyttää myös muiden roolien ajoja; kysy omalta roolilta "nollaa/odota" jos sen ajo käynnissä.
3. `set_remote_control <id> false`; `zsh tools/paivita-kotikansiot.sh --aja --uusi-haara <kansio>` (zsh!).
4. NOLLAUS: "NOLLAUS: kutsu nyt clear_session self. Älä tee mitään muuta." Odota get_usage "unavailable" + list_events 0.
5. Aloitusviesti (NOLLAUS.md vakioteksti: Olet <ROOLI> (<malli>) …; git show <sha>:<luovutustiedosto> KOKONAAN; osoitekirja; PT ≤3 riviä; LUOVUTUS VALMIS → Postivahti; vanhat viestit käsitelty; JONO TYHJÄ). Liitä uusimmat PT-ohjeet jotka eivät ole luovutuksessa.
6. RC true; rivi PT:lle "nollattu <rooli> (<sha>)".
PT-nollaus: tarvitsee tuoreen (<15 min) keskustelutallenteen /Users/Shared/Claude/keskustelut/Paatoimittaja-* ; pyydä PT:ltä "python3 tools/tallenna-keskustelu.py <uuid> Paatoimittaja". KK-aloitusviesti: "Lue node tools/raamattu-luku.mjs 7.47 ja scratchpad/keskustelukanava/aloitus.md (Pysyvät toimintatavat + ENSIN). Jatka siitä, mihin edellinen KK jäi…"

## Tila 19.2x
- Nollattu tänään: PK 18.43 (sha 0c36e6176, v3-kytkentä käynnissä), LAV 18.25 (sha 11b9eea61, jono tyhjä), PT 17.00 (7e319df09), VS 14.08 (45857c3c9), KK 18.54 (omistajan päätös).
- Viimeisimmät lukemat 19.04: PK 20 %, LAV 28 % (pehmeä ilmoitettu), KK 26 %, PT 23 %, VS 19 %, NS 24 % (soft 25 lähellä), SK 20 %, KS 14 %, JU 16 %, Asemataulu 12 %, NUI 11 %. Viikko 56 %; 5 h ikkuna nollautui 19.00 (seuraava reset 01.00). Levy 106.7 Gi.
- Työkansion haara postivahti: M-tiedostot KIERROS.md, NOLLAUS.md, kuitatut.txt, raati-tila.json (ei sotkettavaksi).
