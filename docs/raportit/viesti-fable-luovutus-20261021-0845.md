# Päätoimittajan luovutus 21.10.2026 klo 08.45 (konteksti 30 %; PT-sessio "PÄÄTOIMITTAJA (Opus, medium)")

Id:t /Users/Shared/Claude/osoitekirja.md. Edellinen luovutus -20261021-0610 (taustana). Omistaja hereillä; matkalla to 22.10. – ma 26.10.
KK nollautuu 08.35 jälkeen (omistajan "Kyllä, nollaa").

## 0. AJASTIMET JA VAHDIT (kuolevat nollauksessa → luo HETI uudelleen)
- Codex-postin Monitor: ls-remote claude/postilaatikko 60 s, diff → rivit posti/codex-* (30 min, uudelleen aina). KK:n 7.47-herätys
  on jo tehty (peruttu, omistaja heräsi 07.01).
- Postiin kirjoitus ilman checkoutia: väliaikainen GIT_INDEX_FILE + read-tree origin/claude/postilaatikko + hash-object +
  update-index + commit-tree + push (Monitorin fetch voi kilpailla → yritä uudelleen).

## 1. JUNA 209 (avoin; lukitus/TF vain "OMISTAJA PYYSI JULKAISUA")
- JUOKSUPELI: 209r → 209w tarkistettu. Kunnossa: w1 (ei räystästä), w2/w3, h1/h2, e3, kuja-338, muisti NS 3428/3436 Mt (≤ 3500) ✓,
  nykäykset 0. 40 s: portin kivijalusta sai marmorikaiteen ja laatoituksen (Lavastaja, muurikate-v4) ✓. Ylävasen vinot palat =
  muurikate risteää katon kanssa ~30 m päässä → Lavastaja muurikate-v5 (kate pois muureilta, joiden vieressä katto nousee harjan
  yli), JU vie, PK kytkee → SEURAAVA ARKKI (209x) PT tarkistaa r05:n ylävasemman. HarjaVara-kokeilu peruttu (taantui w1).
  KK sai 209t-arkin 07.1x maininnalla 40 s kohdasta.
- #791 LÄPIJUOSTAVAT RAKENNUKSET: 4 osamallia (Codex kuvat-session Tripo, 400 kr) → Lavastaja viimeisteli: porras ✓, tasanne ✓,
  palatsiovi (9×9 kultanastaa, kivikynnys) ✓, ristikko-ovi (alapaneelit, paperi) ✓ → JU:lla. Reitit 1–3 hyväksytty (内务府 sisäpiha,
  läntisen kujan uusi avoin huone, 弘义阁 terassi + U-galleria); Lavastaja tekee kuoret, PK:n koodi 1379bff2e. ODOTTAA: PK:n arkki
  reiteistä → PT → omistajalle Codexin havainnekuvan rinnalle ennen junaa (7.15).
- MUSEO: Johannes Kastajan kehys korjattu okra–kultaan (LS 22959c39c) → ODOTTAA LT:n A1-775-kuvaa rungosta → PT.
- junat.json päivitetty 06.1x ja 07.0x (museon 3 riviä Valmiina, muistikevennys Valmiina).

## 2. CODEX (kaksi sessiota, Raamattu 7.15, omistaja 08.32)
- Matkakirjan kuvat = kuvat, tekstuurit, havainnekuvat; Tripo 3D = kaikki 3D-mallit. Osoite otsikkoon ja tiedostonimeen
  (paatoimittaja-codex-kuvat-… / paatoimittaja-codex-tripo3d-…).
- #794 (6 posliinia, 12 ottoa, 540 kr) RAUENNUT; mallit arkistossa, ei peliin.
- 8 ESINETTÄ (omistaja + Codex): raja ENINTÄÄN 17 Tripo-generointia (08.32 kortti), Tripo 3D kuittasi osaluettelon; bambusermi
  jo 1/17. Osakuvat (15) tilattu kuvat-sessiolta 54e64edb2 → Tripo 3D jatkaa. AVOIN omistajalle: lautaspino → ~65 cm
  tarjoilupöytä + kolme pinoa (lautaspoyta-v2-ehdotus.png), lähetetty KK:lle korttiin.
- HUUDAHDUKSET: omistaja hylkäsi 08.34; tehdään uudelleen KK + omistaja, tekstit VIESTINÄ listana, ei korttina (7.27).
- MUISTOKUPLAT: 38 kuplaa, toistoryhmät ja vääristymät koottu (KK, arkit scratchpad/keskustelukanava/kuvat-20261021/) →
  korjauslista omistajan kanssa (seuraava KK). Työlistarivi "Muistokuplien korjaus".
- #772 Kolme veljestä -renderöinti yönä 21.–22.10. ennallaan.

## 3. RAAMATTU JA PR:T
- #5127 mergetty (5.1: 3 % per ajo; loki 07.40, 08.02). #5128 (7.15 Codexin sessiot, 7.27 tekstit eivät kortteihin, loki
  08.21–08.35, tämä luovutus) – testit ajossa → merge vihreänä, sitten `tools/uusi-worktree.sh --poista fable-raamattu-codex-sessiot-0832`.

## 4. ROOLIT
- PK: 209x (muurikate-v5) ja #791-reitit. Lavastaja: kuoret reiteille 1–3. LS: odottaa LT:n Johannes-kuvaa. NS: runko ja muistiajo
  tehty. LT: A1-775. Asemataulu: työlista 15 työn alla (raja 15) – uusi rivi vaatii yhdistämisen.

## LISÄYS 08.5x
- 209x (muurikate-v5): PK:n mukaan ylävasen puhdas, w1 ✓; e3:n häivytysympyrä jätetty omistajan 20.10. päätöksen mukaiseksi. PT ei katsonut arkkia itse → tarkista r05.
- MUISTOKUPLAT (omistaja 08.53): Codexin kuvasessiolle tilaus be12c7be3 (toistoryhmät ensin, sitten vääristyneet; vertailuarkki → PT → PK vaihtaa). PK: vanha sivellin-1.jpg pois junaan 209.
- Osakuvat #799 erät 1–2 postissa (Tripo 3D jatkaa). Omistaja 08.45: Codexin/Tripon ehdotuksista ei kortteja, toimi postin mukaan (loki).
