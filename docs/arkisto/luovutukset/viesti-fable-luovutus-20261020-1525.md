# Päätoimittajan luovutus 20.10.2026 klo 15.25 (konteksti 30 %, pehmeä raja)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31. KK local_8e4fcfed-fc40-464c-854a-1d031b005332. Id:t /Users/Shared/Claude/osoitekirja.md.
Asemataulu https://claude.ai/artifact/R6VQFTUNq629zSzah719Uy. Viestit: mcp__ccd_session_mgmt__send_message session-id:llä.
Vain voimassa oleva tila (Raamattu 7.22); historia: docs/raamattu-loki/paatokset-2026-10.md ja edelliset luovutukset.

## 0. HETI ALUSSA
1. Monitorit odottajat-vahti.py ja codex-posti-vahti.sh (30 min, uudelleen). set_remote_control self true.
2. PR #5042 (Raamattu 7.22: vain voimassa oleva tila + tiedostokokojen vahti, omistaja 15.11 ja 15.23): merge kun KAIKKI
   tarkistukset valmiit (`gh pr checks 5042` ilman pending-rivejä), sitten `tools/uusi-worktree.sh --poista fable-tila-tiedostot-kevyiksi`.
   HUOM: PR #5040 mergettiin 14.1x testien ollessa vielä kesken (testit menivät myöhemmin läpi) – älä toista.
3. Odotettavat PT:n tarkistukset:
   - PK v4 d72d6e3a0 (pelikoodari/ilmestymiset-208, LOD-lämmitys, 4 nykäystä 210–345 ms pois + katon takana käyvä kamera G:ssä):
     JU kääntää → simu → pitkat-ruudut + kuva-arkki PT:lle → täysikokoisina → "PT OK 208" NS:lle (korvaa v3 2a825f04d).
   - TKS tools/tarkista-tiedostokoot.sh (rajat 15 kt / MEMORY.md 10 kt / rivi ≤ 100): PR vihreänä → Postivahti ajaa joka kierroksella.
   - TKS:n esikatselukoe (piilossa, open -g -j): ajetaan vasta kun Mac käyttämättä ≥ 20 min / näyttö lukossa, viimeistään yöllä;
     tulos PT:lle → PT kertoo KK:lle, kun esikatselu on roolien käytössä (lupaus omistajalle). Ruutukoko 693×390 vs 1206×2622 auki.
   - KK: MEMORY.md:ssä 52 riviä yli 100 merkkiä (Postivahti 15.2x) → kysytty KK:lta lyhennystä samana päivänä.
   - LT:n GPU-mittaus rungosta e17a87ca7 (varjot 140 m, arvio 9,7 → ~11 ms): kysytty KK:lta lupa (ei omistajan pelatessa).

## 1. Juna 208 (AUKI, julkaisu VAIN omistajan pyynnöstä 09.47)
Uusin runko e17a87ca7 vihreä, iPad Pro 13:ssa 15.13 (⊃ 8c9fe4fce ⊃ 7aa1e43cd). PT OK annettu ja rungossa:
VS Louvre k7 db430a614 → keilaton atlas af60d60f8 → seinäspotti fbeae02dc (SeinaSpotti 0,35, yksi parametri);
VS juoksun lattia 0dad6f92c; VS varjot 140 m c8c12fef4 (⊃ 41096802e); NUI madonnan nimi 7c10e9f71; NUI museo 9aabbb409
(kuva ei zoomaudu kehyksessä, rauhallinen automaattinen zoomaus, yhteinen läpikuultava oranssi päällä-tila);
paketit AI Navigation 2.0.16, VS Editor 2.0.28, Cesium 1.26.0 (simu ok). PT OK lähetetty, ei vielä rungossa: PK v3 2a825f04d.
Candle/Money VFX jätetty päivittämättä (Asset Store, ei toimia omistajalle).
Kun PK v4 kuitattu ja LT:n GPU ok → PT → KK "208 valmis julkaistavaksi" (KK kysyy omistajalta).

## 2. Omistajan voimassa olevat linjaukset tänään (Raamattu 9.11 ja 7.22; loki paatokset-2026-10.md)
- 12.59 → 13.57: NS asentaa jokaisen vihreän rungon langattomasti VAIN isoon iPadiin (iPad Pro 13, 00008103); iPad Pro 11 ja
  iPhone vain omistajan erillisestä pyynnöstä. Auki olevasta pelistä kysytään KK:n kautta (14.56 "Asenna nyt" oli kertalupa).
  LT ei käytä omistajan laitteita omistajan pelatessa.
- 11.45 SIMU HARVOIN (9.11): simu vain uuteen tekniikkaan, omistajan pyytämiin kuviin ja yöjunaan.
- 15.11 + 15.23: tilatiedostot ≤ 5–10 kt (raja 15 kt), historia arkistoon, vahti Postivahdilla; ylitys → PT pyytää roolia
  arkistoimaan samana päivänä. Postivahti lisää säännön jokaiseen nollauksen aloitusviestiin.

## 3. Muut
- Kone käynnistettiin uudelleen ~14.0x (swap 15/16 Gt); levy nyt ~108 Gi. Sovellus kaatui 13.02 → kaikki roolit herätetty.
- Lepäävät (vko 87 %): Valoseppä, Natiivi-UI, Karttaseppä, Äänittäjä, Sisältökirjuri, Projektiseppä, Lavastaja, Linssiseppä.
- Codex: PT733–737 yhä toimittamatta (postilaatikko). Kun tulevat: Lavastaja → rakennukset-v13, LS → Louvren kulmakoristeet.
- Asemataulun työlistalla tänään lisätyt rivit: museo 14.37, juoksupeli koko ruudulle 14.40, aloituskonteksti pienemmäksi
  15.11/15.23 (edistys 60). Päivitä tilanne, kun PK v4 ja vahti valmiit.
