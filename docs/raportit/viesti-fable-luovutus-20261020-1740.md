# Päätoimittajan luovutus 20.10.2026 klo 17.40 (konteksti 30 %, pehmeä raja)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31. KK local_8e4fcfed-fc40-464c-854a-1d031b005332. Id:t /Users/Shared/Claude/osoitekirja.md.
Asemataulu https://claude.ai/artifact/R6VQFTUNq629zSzah719Uy. Viestit: mcp__ccd_session_mgmt__send_message session-id:llä.
Vain voimassa oleva tila; historia: docs/raamattu-loki/paatokset-2026-10.md ja luovutus -1525.

## 0. HETI ALUSSA
1. Monitorit odottajat-vahti.py ja codex-posti-vahti.sh (30 min, uudelleen). set_remote_control self true.
2. PR #5048 (Raamattu 5.15: musiikki aina Lyrialla, omistaja 17.37 + tämä luovutus): merge kun KAIKKI tarkistukset valmiit
   (`gh pr checks 5048` ilman pending-rivejä), sitten `tools/uusi-worktree.sh --poista fable-raamattu-lyria-1737`.
3. KIIRE: omistaja odottaa töissä iPhone-pakettia (17.36 "odotan vielä … droneliikkeet ja nuo uudet äänet juoksupeliin").
   Arvio KK:lle annettu: ~18.30. Ketju: Äänittäjä Lyria-erhu (1 kutsu, lupa 17.37) + 4 huutoa (lupa 17.34) → PK kytkee
   avaus-208:aan → NS kokoaa (e3f88ff4e + avaus-208 1f1a75eec + VS hehku 404a63482 + NUI kuvateksti 3cf7887fa + PK:n uusi kärki)
   → NS ilmoittaa KK:lle ja PT:lle → KK asentaa iPhoneen. PT OK annettu kaikille näille. NUI:n metrokartta ja taulun zoomaus
   mukaan vain jos vihreänä ennen käännöstä. Jos joku jumittaa, PT hoputtaa.

## 1. Juna 208 (AUKI, julkaisu VAIN omistajan pyynnöstä)
Uusin runko e3f88ff4e vihreä, iPad Pro 13:ssa 17.34 (cd1391001 + salanappi f8c0bc0ce + PK jäätymiskorjaus 10e6a5a68).
cd1391001 = Louvre 15.40 kokonaan (VS kohdevalo 100042f7c, NUI siirtymä d89496ea8, katsojat c10fa7e37), LS askeleet e3e6e95f0,
PK v5 7fef1e3df. Omistajan iPhonessa cd1391001 (17.19).
VALMIS JULKAISTAVAKSI vasta kun (KK 17.2x): a) metrokartan tekstien pehmeys (omistaja 17.25) rungossa vihreänä (NUI) ja
b) juoksun GPU ≤ 14 ms isolla iPadilla. Sitten rivi KK:lle "208 valmis julkaistavaksi"; lukitus/TF vain omistajan pyynnöstä.

## 2. Juoksun GPU (iso iPad, raja 14 ms) – Valoseppä vetää
Jäätyminen juoksun alussa KORJATTU (0,3–3,2 s → max 133 ms; 133 ms hiotaan avauserässä).
Raskas kohta (14 s, siemen 777) yhä 34 ms. Syy LT:n P-sarjasta: liike-epäterävyyden kappalepassi (Camera and Objects).
0,8+msaa2 25,3 / +sumea 0 10,5 / +vain kamera-MV 11,7. Tehtävä VS:lle (KK 17.3x): rajaa liike-epäterävyys kameraan ensisijaisesti,
pois vain jos ei riitä; LT mittaa täydellä resoluutiolla ja MSAA 4:llä, hehku mukana. Puyin terävyys kuvaparilla: jos sumenee →
omistajan valinta. Tulokset: proto-3d/_tyo/linssiseppa2/varjot-koko/lt-gpu-tulos.txt. PK luovutus 6c3c4ec37.

## 3. Muut avoimet erät
- NUI (kovalla rajalla 17.31, luovutus puuttui 17.38): 1) metrokartan tekstit pehmeästi ristiin merkin tahdissa, kaikki museot
  (omistaja 17.25), 2) taulun tutkiminen ei vaihda tilaa; toinen ulos-nipistys pysähtyneenä → kysymys "Haluatko kulkea vapaasti
  museossa?" korttipohjalla (omistaja 17.31, kaikki museot). Jos uusi NUI ei tiedä näistä, lähetä uudelleen.
- Juoksun avauserä (omistaja 17.17, 17.23, 17.34): valmiina avauslento + elävä drone (PK 1f1a75eec), hehku (VS 404a63482),
  kuvateksti "Peking, kesä 1914 · Kielletty kaupunki" (NUI 3cf7887fa). Puyi ~8 v (17.23). Huudot: "Majesteetti karkasi!",
  "Majesteetti, palatkaa!", "Majesteetti!", Puyi (Kavya) "Ottakaa kiinni, jos saatte!".
- Erhu: Freesound-erhu (f432c77c3) EI käytössä; Lyria-erhu tilalle. Äänittäjältä pyydetty syy läpimenoon (PT:n oma 17.2x ohje
  "valmiista lähteestä" oli väärä). Kertojan "Moona Lisa" palautelistaan, ei vielä uutta äänitystä (17.36).
- Codex PT733–737 yhä toimittamatta (Lavastaja rakennukset-v13, LS Louvren kulmakoristeet).
- TKS: esikatselukoe yöllä (Mac käyttämättä ≥ 20 min). Postivahti ajaa tarkista-tiedostokoot.sh joka kierroksella (PR #5044).

## 4. Omistajan voimassa olevat linjaukset tänään
- 17.17 ISO IPAD VAPAASTI (Raamattu 9.11, PR #5047, muisti ipad-vapautus-kk-lta): roolit asentavat ja mittaavat aina kysymättä;
  testiversion jälkeen uusin runko takaisin. iPad Pro 11 ja omistajan iPhone vain omistajan pyynnöstä (KK asentaa).
- 17.37 MUSIIKKI AINA LYRIALLA (Raamattu 5.15, PR #5048): muu musiikki vain omistajan luvalla.
- 11.45 SIMU HARVOIN (9.11). 15.11/15.23 tilatiedostot ≤ 5–10 kt.
- Kiintiö (KK 17.3x): EI keventämistä; tili käytetään 100 %:iin, 99 %:ssa yksi rivi omistajalle. Vko 94 % klo 17.38.
- 17.07 salanappi valmis ja iPadissa (Osa II × 5; simulle matkakirja://testi/monalisa).

## 5. Asemataulu
Työlista (talo/tyolista v123) ajan tasalla 17.38: ylimpänä juoksun avaus, taulun tutkiminen, salanappi (valmis), Louvre, askeleet.
Paikallinen kopio: /Users/Shared/Claude/Matkakirja-fable/scratchpad/asemataulu/data/talo/tyolista.json (MUOKKAA AINA molemmat).
