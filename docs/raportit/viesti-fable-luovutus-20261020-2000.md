# Päätoimittajan luovutus 20.10.2026 klo 20.00 (konteksti 30 %; PT local_cf5b4eca, päätili)

Id:t /Users/Shared/Claude/osoitekirja.md. Asemataulu https://claude.ai/artifact/Rq5ajPU4SraE2XKd7BYAix (käytössä, #5055/#5056).
Edellinen -1820 on historiaa. Viikko 6 %, viikkoraja tällä viikolla 85 %.

## 1. JUNA 208 – OMISTAJA PYYSI JULKAISUA klo 19.00 ("Julkaise juna kun kaikki nämä valmiit. Pääsen töihin vasta huomenna")
- Lupa lukitukseen ja TF:ään ilman uutta kysymystä. Omistaja testaa iPhonella TF:stä huomenna.
- NS: runko KOOSSA 186b23682 (00aefd136 + VS e3de8d0bc revontulet/Linnunrata/kehysvarjo + bf87d6402 + LS 4a84253f9 Auto Zoom),
  testit + laitekäännös ~19.58–20.00. NS LUKITSEE, kun PT ilmoittaa LT:n kuvapari OK (revontulet + kehysvarjo ENNEN/JÄLKEEN, VS:n arvio ~20.15).
  → kuvapari tarkistetaan (100 %), OK NS:lle → NS lukitsee ja lähettää sha:n JU:lle (local_f1add29f) → TF → YKSI rivi KK:lle "TF 208 ulkona".
- Jos jokin jumittuu yön yli: kerro KK:lle ENNEN kuin juna lähtee ilman sitä (KK 19.00).
- Muutosloki 1.1 (208) PR #5057 (NS:n 279 merkin versio) – tarkista mergeytyminen ennen TF:ää.
- Avaus OK LT:llä (00aefd136, iPad 13): lento portin läpi, ei läpäisyjä, Ohita OK, 60 fps. Äänet vain lokista (ei korvakuuntelua).
- GPU-ehto kuitattu (60 fps koko juoksu, ka 12,3 ms, raskain 15–17 ms; VS 0,8 + MSAA 2 ilman näkyvää eroa).
- Juna 208 sisältää lisäksi: juoksupelin palaute 18.28–18.39 (PK c909a692a/7980a4cb9 + NUI 63ed7c673/eb32e511c/22c41d712), alkuteksti NUI aaf631908,
  ISS-nostot NUI 15a45d6b9, Majesteetti 05/06-pitkä (ämpärissä).

## 2. AUKI / ODOTTAA
- KK:n kortti: Auto Zoom pystyssä lähikuvaksi? (PT:n suositus kyllä) → päätös LS:lle (juna 209).
- Tripo-Pulu v3 odottaa omistajan katselua (KK:lla, huomenna). OK:n jälkeen Codex linturigi + liikkeet → Lavastaja.
- Codex-posti (claude/postilaatikko): 7ccc398a2 kävijät PT738-K1…K4 (lupa ≤ 4), 4b4b8da51 Louvre jonon ohi (19.13), e2e6d253b k2+vartija luuranko
  (omistaja 19.23), 3d275aa1b vain Tripo (19.25; 751–756 Tripoon, krediittisaldo toimituksiin), 1d373f09d Niken jalusta (19.47; kuvan polku
  postissa väärin "mainissa": kuva on vain paikallisessa kansiossa docs/raportit/kaappaukset/omistaja-20261020/). Järjestys: Louvre → Puyi → 751–756.
- Lavastaja (juna 209): Louvren henkilöt päälle (MuseoHenkilot.Paalla), k1 kävelee; Tripo-kävijät korvaavat Quaternius-ihmiset kokonaan;
  Nike keulan päälle Salon Carrén päätyyn (ei portaikkoa); rakennukset v13 jatkuu.
- PK: "Juoksupeli täysin valmiiksi" -rivin puutteet (juna 209); #5059 tuotantoputken tarkistus → JU mergeää vihreänä.
  Paikallinen haara pelikoodari/ei-tripo c07f2544e EI mergeen (omistaja 19.28 perui).
- Äänittäjä: lupa 18.31 käytetty (2 ottoa; PT:n virhe: 3. otto uusintana). Ei generointia ilman uutta korttia.
- Levy 76 Gi (< 100): NS siivosi 26 Gt, VS siirsi T7:lle. Postivahti seuraa.
- Levossa ilman erää: NUI (kaikki rivit tehty), LS (odottaa Codex PT733), Äänittäjä. Vanhalla tilillä levossa: Karttaseppä, Projektiseppä,
  Työkaluseppä, Sisältökirjuri (tilinvaihto-valmis: 4 puutetta = nämä).

## 3. Omistajan linjaukset tänään (kirjattu)
19.12 tilattu malli peliin asti + ketjutarkistus (Raamattu 7.15, #5058) · 19.25 vain Tripo-malleja · 19.28 koskee vain uusia (#5060) ·
19.13 Louvre Codexilla jonon ohi · 19.23 k2+vartija luurankoon · 19.00 julkaise 208.
