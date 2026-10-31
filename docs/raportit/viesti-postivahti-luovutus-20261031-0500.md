# Postivahti: luovutus 31.10.2026 klo 05.00 (Sonnet 5.5, local_d8d003f6-1ae3-4a1b-854a-e0c018ed19f5)

Syy: oma raja 30 % ylittyi (oli 77 %). Edellinen luovutus: viesti-postivahti-luovutus-20261030-1920.md (sisältö voimassa: kierros, rajat, nollausmenettely).

## Kierros (KIERROS.md, NOLLAUS.md luettava)
- ScheduleWakeup 10–14 min hiljaisella yöllä, prompt = "Lue /Users/Shared/Claude/Matkakirja-posti/KIERROS.md ja aja kierros sen mukaan." + HUOM-rivit (tila).
- Joka kierros: `date`, `df -k /` (Gi), `python3 -I codex-odottaa.py | wc -l` (7 vanhaa, ei uutta), ArtifactData get talo/boost (url https://claude.ai/artifact/Rq5ajPU4SraE2XKd7BYAix; paalla false, päättyi 20.56), `ps` esikatselu/xcodebuild/proto-kaanna/Blender, list_sessions, get_usage muuttuneille.

## Roolit ja id:t
PT local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc · KK local_231e4bad-b9fe-41b8-8b45-02e35c45ebbe (nollataan vain omistajan kortilla) · LAV local_beb68834-6c4f-4839-ac75-7876b45052c3 · PK local_601d33fc-1c61-4ccd-8389-fa425417fafb · VS local_3b36fe96-0199-4b17-9eb4-46a882ce7399 · NS local_c7344e20-fba8-433d-ba8e-184a325037ef · KS local_ddd980b0-2760-4c5d-a0c8-d65ad1ecb757 · NUI local_a3754ed8-f155-43b5-9095-b51e9e29ff53 · JU local_b4a7e82a-2522-437f-84ff-813401120931 · LT (Laitetestaaja, Sonnet 5.5 high) local_ede7e965-02ff-40a0-a77d-44f3218ca146 (/Users/Shared/Claude/Matkakirja-laitetestaaja) · Asemataulu local_b4d61878-aa57-40fd-b21c-cc3af1add387.

## Rajat
Koodi-/kartta-/sisältöroolit + JU + Asemataulu 25/35; PT 30/40; LT 30/40; KK 35 "päivitä aloitus.md", 40 "kysy omistajalta nollaus" (omistaja 22.28 "Ei vielä", sitten "Nollaa nyt" 22.27 → nollattu 22.31), 50 uudelleen; oma raja 30 %.
Levy: hälytys < 100 Gi → `python3 -I tools/levy/ika_kartoitus.py` + `siirra_t7.py --aja` (siirrettävää ei enää ole); < 82 Gi → rivi PT:lle; LAV:n leivonnan levyvahti 82 Gi (PT peruutti 78 Gi -poikkeuksen); kriittinen < 31. Swap täynnä ~27/28 Gt: Unity + Blender + laiteajo yhtä aikaa vain PT:n luvalla.

## Tila 05.00
- Levy 103,1 Gi (worktree-siivous 01.14–01.20 nosti 81,6 → 114 Gi; wt/proto-lavastaja-* 4 kpl ~1,9 G jäi LAV:n tarkistettavaksi).
- Käynnissä: LAV:n Blender-rakennusleivonta (aja_uusinta rak, 1 h 38 min; junan 216 kriittinen polku, valmis ~05.30). Kaikki muut roolit levossa.
- Nollattu tänään: NUI 20.44, LAV 21.29, KK 22.31, PT 03.17 (834599cf4), PK 23.31, KS 01.44, NS 02.19, VS 02.35.
- Viimeisimmät lukemat: LT 38 % (kova 40 → KOVA RAJA -viesti + luovutus), KK 32 %, PK 30 % (kova 35), KS 22, VS 27 (02.12), NS/VS/KS vasta nollattu. Viikko 69 %, 5 h ikkuna nollautui 05.00.
- Odottaa: NS:n koe D -äppi (ks-fps-d-216) → KS mittaa; LAV:n leivonta päättyy ~05.30 → LUOVUTUS VALMIS.

## Nollausmenettely (opitut, lisäykset)
1. Hae uusin kärki: `git ls-remote origin refs/pull/<PR>/head` (roolit päivittävät luovutusta; käytä uusinta, ei roolin ilmoittamaa sha:ta).
2. Roolin pitää olla idle (list_events "idle"). Taustaajot: ps esikatselu/xcodebuild/proto-kaanna/Blender — jos roolin oma ajo käynnissä, kysy NOLLAA/ODOTA (NS/KS/VS vastaavat yhdellä rivillä). PT:n käsky voi kumota odotuksen (LAV, PT 21.26).
3. set_remote_control false; `zsh tools/paivita-kotikansiot.sh --aja --uusi-haara <kansio>`; NOLLAUS-viesti; odota get_usage unavailable + list_events 0; aloitusviesti (git show <kärki>:<tiedosto> KOKONAAN) ; RC true; rivi PT:lle.
4. Jos rooli käynnistyy itse nollauksen jälkeen (PT:n/muiden viestistä), lähetä silti lyhyt aloitusviesti luovutukseen.
5. PT-nollaus: tuore (< 15 min) Paatoimittaja-*.md kansiossa /Users/Shared/Claude/keskustelut; pyydä PT:ltä tallennus jos ei.
6. KK: nollaa vain omistajan luvalla; KK kutsuu itse clear_session; lähetä aloitusviesti "Lue node tools/raamattu-luku.mjs 7.47 ja scratchpad/keskustelukanava/aloitus.md (Pysyvät toimintatavat + ENSIN). Jatka ENSIN-kohdista 1–2." ja RC true.

## Muuta
- Työkansion haara postivahti: M-tiedostot KIERROS.md, NOLLAUS.md, kuitatut.txt, raati-tila.json (ei sotkettavaksi).
- Oma kontekstini kasvoi 77 %:iin, koska en nollannut itseäni 30 %:ssa; seuraava Postivahti: tarkista get_usage self joka 5. kierros ja nollaa 30 %:ssa.
