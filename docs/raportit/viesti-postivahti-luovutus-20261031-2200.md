# Postivahti: luovutus 31.10.2026 klo 22.00 (Sonnet 5.5, local_d8d003f6-1ae3-4a1b-854a-e0c018ed19f5)

Syy: oma raja 30 % ylittyi (32 %, PT:n käsky 21.5x). Tämä luovutus lisää edelliseen (viesti-postivahti-luovutus-20261031-0500.md: roolilista, id:t, rajat, nollausmenettely, kaikki edelleen voimassa). Luovutusta ei commitoida; lue levyltä.

## Aloitus
1. Lue KIERROS.md ja NOLLAUS.md (molemmat ajan tasalla, uncommitted postivahti-haarassa: älä sotke).
2. Sovellus kaatui ~21.27 (10 kontekstin rinnakkaisluku). SÄÄNTÖ: kontekstit YKSI KERRALLAAN, kaikki roolit joka kierroksella (KIERROS.md "KONTEKSTIEN LUKU").
3. ScheduleWakeup 10–14 min, prompt "Lue /Users/Shared/Claude/Matkakirja-posti/KIERROS.md ja aja kierros sen mukaan."

## Avoimet (22.00)
- KS (local_ddd980b0-2760-4c5d-a0c8-d65ad1ecb757) 75 %: nollaa, kun KS ilmoittaa LUOVUTUS VALMIS (menettely: edellisen luovutuksen kohta Nollausmenettely).
- PK (local_601d33fc-1c61-4ccd-8389-fa425417fafb) 38 % (kova 35): nollaa, jos yhä yli rajan (nollattu 20.5x, a8c38c489).
- Odottavat/nollattu tänään 31.10.: KK 19.09, NS ~19.45, PK ~20.5x, VS 21.1x (51ae7c031), NUI 21.0x (9d6ae7311), LAV 21.2x (72ee1ec36), PT 18.55 (bd0b7fde4).
- Vahdit (KIERROS.md): Codex-muisti > 20 Gt → KK; Codex-toimitus claude/postilaatikko → vastaanottajarooli; pitkä ajo (rooli levossa + pid) → herätä kun päättynyt; LAV osasarja-v6 valmistui 18.38 (herätetty).
- Viikkoraja 92 %: hälytys PT:lle+KK:lle 85 %:ssa ja 90 %:ssa. Levy: ≥ 100 Gi viimeksi 101 Gi (18.0x); proto-3d 96 G odottaa omistajaa.
- Asemataulu (local_b4d61878-aa57-40fd-b21c-cc3af1add387): jokaisen nollauksen jälkeen rivi "nollattu Asemataulu" KK:lle; hoitaja käynnistyy KK:n päätösrivillä.
- Taustaajot, jotka ovat roolin session lapsiprosesseja (ppid = roolin claude-prosessi), kuolevat nollauksessa: odota ajon päättymistä (pid-vahti-skripti scratchpadissa odota-pidit.sh).

## Opit tältä päivältä
- PK:n ja LAV:n luovutukset täydentyvät "lisäyksillä" nollausjonossa: hae uusin kärki `git log origin/main -- <luovutustiedosto>` juuri ennen aloitusviestiä.
- RC true epäonnistuu tyhjälle sessiolle: lähetä aloitusviesti ensin, sitten RC.
- Kotikansion päivitys ohitetaan, jos roolin irrallinen ajo käynnissä checkoutissa (LAV leivonta).
