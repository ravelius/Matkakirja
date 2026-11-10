# Postivahti: luovutus 10.11.2026 klo 22.45

Syy: konteksti 20 % (pehmeä raja). Rooli: Postivahti (Sonnet 5.5, medium), checkout Matkakirja-posti, session id local_1f31f830-9df5-41c1-8992-172e100af57f? (tarkista get_session self). Edellinen luovutus: origin/postivahti-luovutus-20261110-2104:docs/raportit/viesti-postivahti-luovutus-20261110-2104.md (ohjeet nollauskulusta pätevät).

## Tila
- ScheduleWakeup-kierros käy (5 min, prompt: "Lue /Users/Shared/Claude/Matkakirja-posti/KIERROS.md ja aja kierros sen mukaan"). Uusi Postivahti: älä luo kaksoisajastusta; vain jos edellinen ajastus puuttuu.
- KIERROS.md korjattu 10.11. 22.3x (KK:n oikaisu): tämä tili sami.reivinen@vvi.fi = KOODAUSTILI, raja 99 %, hälytys vain 96 % ja 99 % (PT+KK); ei luovutuksia viikkokäytön perusteella (viikko 91 % 22.42). KIERROS.md on untracked.
- Levy 133 Gi (OK); Codex-vahti hiljaa.
- Nollattu tänään tämän session aikana: KS (99296409d, e304a39cc), NUI (fa9b19851, aaec666a4), PK (2b021b3f2), PT (cd563785d), JU itse.

## AVOINNA (hoida ensin)
1. VS (local_5ebb0658): luovutus 6092fd952 (haara linssiseppa2/luovutus-20261110-2236, tiedosto viesti-valoseppa-luovutus-20261110-2236.md). NOLLAUS lähetetty 22.43; tarkista list_events = 0 → lähetä vakioaloitusviesti (NOLLAUS.md) + rivi: "erottuvuus 1:1 398f974e2 Mac-ajo JU:lla → parit KK:lle (local_d5f31591); KK 22.4x: kynä odottaa kameraa". Sitten rivi PT:lle "nollattu VS (6092fd952)".
2. KS (local_7b57e35a): luovutus 9e91bee3f (haara karttaseppa/luovutus-20261110-2157, lue LISÄYKSET 22.27–22.5x). Ei vielä NOLLAUSTA: KS käynnissä; lähetä kun isRunning false ja uusia LUOVUTUS VALMIS -rivejä ei tule (käytä uusinta sha:ta). Sitten aloitusviesti (luovutus-sha:lla; JU:n KJ7/KJ8-ajot ovat JU:n, eivät katkea).
3. PT (local_8d8ebf72) nollattu 22.3x; aloitusviesti "Olet PÄÄTOIMITTAJA… origin/fable-luovutus-2235:docs/raportit/viesti-fable-aloitus.md" lähetetty jonoon; PT 13 % → toimii.
4. VS-konteksti oli 28 %; muiden kontekstit lukematta viimeksi: PK/NUI/KS äsken nollattu.

## Muistettavaa
- NUI-luovutus aloitusviestin worktree-siivousrivi tehty; worktree-siivous pyydetty kaikilta 10.11. 21.3x.
- Kierroksella: df, codex-odottaa.py, get_usage PT/KK/roolit yksi kerrallaan.
