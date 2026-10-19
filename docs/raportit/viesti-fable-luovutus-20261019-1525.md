# Päätoimittajan luovutus 19.10.2026 klo 15.25 (oma nollaus, konteksti 30 %)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31 (gmail-tili). KK local_8e4fcfed-fc40-464c-854a-1d031b005332. Id:t /Users/Shared/Claude/osoitekirja.md.
Edellinen: viesti-fable-luovutus-20261019-1450.md (käsitelty). Asemataulu https://claude.ai/artifact/R6VQFTUNq629zSzah719Uy.
Checkoutin haara on vanha: lue `git show origin/main:<polku>`; docs-PR:t worktreellä (tools/uusi-worktree.sh fable <aihe>). Codex-posti: scratchpadin posti-commit.sh-malli (GIT_INDEX_FILE + read-tree + hash-object + update-index + write-tree + commit-tree + push "${C}:refs/heads/claude/postilaatikko"), esimerkit a6e49cf17, 43e464bb6, a16fef603, 0d3ff560e.
UUTTA: Matkakirja-fable-checkoutissa `gc.auto=0` (39 000 irtonaista objektia laukaisi 6,5 G repackin joka komennolla → levy heilui). Postivahti ajaa yöllä `gc --prune=now`.

## 0. HETI ALUSSA
1. PR #4966 (Raamattu 9.11 J1 + 2.181/2.182/11.11/11.13 + 12.24 Tripo Max + kaanon Sheba/Montezuma isoisan-raamattu/tarina) → tarkista `gh pr checks 4966` (testit ajettava uudelleen viimeisestä pushista c5e97a15f; "no checks" ≠ vihreä) → squash-merge kun vihreä.
2. PR #4967 (SK faktakorjaukset: Kolme veljestä, Sheba/Montezuma JSON + js) → merge kun vihreä.
3. Monitorit: odottajat-vahti.py + codex-posti-vahti.sh (30 min, uudelleen).

## 1. JUNA 204 PIDOSSA (omistaja 11.46), ei lukitusta ennen "OMISTAJA PYYSI JULKAISUA"
- Runko NS: 59c6784c1 (Työkalusepän tarkistukset-204 f3fb0c3b3 merge), täydet testit ajossa; edellinen vihreä 66638f1ff (Linssit 2129, Peli 632, Kartta 512). Mukana Lavastajan kehysvarjo a69ac7e05, LS Kööpenhamina-kuvat-204 ba13ebaf9 (k8 Tivoli v2, PT hyväksyi täysikokoisena).
- PK 204d 67e525636 (~15.55 simuun): muistokuplat B 8 + C 6 + 45/49 + drone-kamera; sisapiha.glb 1721 → 26 primitiiviä, portti OK (JU vie, NS tietää).
- UUSI (omistaja 15.21, J1, Raamattu 9.11): lukituksen jälkeen Laitetestaaja pelaa käännöksen iPad Pro 13 M1:llä + iPhone-simulla muutoslistaa ja omistajan palautteita vasten ENNEN ulkoisia testaajia. Laitetestaajalle ohje lähetetty (tekee tarkistuslistapohjan → polku PT:lle). Muut kolme kohtaa (puhe Gemini sokkona, tekstit pelinäkymässä, Codexin 3D havainne+pelikuva rinnakkain) Postivahdin kautta kaikille.

## 2. Codex-posti
Kuitattu tässä vuorossa: B 13–25 (a6e49cf17: 8 OK, 19/21/23/24/25 uusintaan), C 26–39 (43e464bb6: 6 OK, 26–30/33/34/37 uusintaan), 45+49 uusinta (a16fef603: molemmat OK). Uusintojen syy: sama valkopartainen vanhus 16 kuvassa; sääntö Codexille: sama ihminen enintään 2 kuplassa (paitsi Puyi, opettaja, imettäjä).
Tilattu: 0d3ff560e paa-middleeast.png = Sheban suitsukerasia, paa-northamerica.png = Montezuman turkoosinaamio (yksittäinen esine, pergamenttitausta).
Odotetaan: B:n 5 + C:n 8 henkilöuusintaa, kuplat erä D (PK: 10 kuvaa käärön jälkeen), käärö v2.1, avoimet rakennukset, Olavinlinna 6–10, palatsin geometria, kaksi aarrekuvaa. Tarkista täysikokoisina ennen PK:lle.

## 3. KK:n putkikatselmus 15.07 (8 kohtaa) — tila
1 sisapiha VALMIS (PK). 2–4 SK #4967; keisarinnaäiti vain pohjalistassa → ei uusintaa, korvaaja "Huang e'niang". 3 Oseania: KYSYMYS omistajalle KK:lla (suositus Kalaniʻōpuʻun höyhenviitta 1779; vaihtoehto maro ʻura -vyö). Vastauksen jälkeen: isoisan-raamattu.md Oseania-rivi + SK tekstit + Codex-kuva. 5 Kööpenhamina k8 VALMIS. 6 Raamattu #4966. 7 kuvakierros käynnistetty uudelleen (VS poisti lipun). 8 tulivuoret pysäytetty: VS tekee yhden testiajon NASA-kuvamenetelmällä (976ef6bde) JU:n vuorolla; ≥ 4 → kuvapari PT:lle, < 4 → pois ISS-valikosta.

## 4. Roolit
- SWAP-RAJOITUS (15.17): enintään 1 Unity-käännös + 1 simu + 1 testisarja kerrallaan kunnes levy > 30 Gi ja kuorma < 100; JU:n jono: Lavastaja kehyssävy → PK 204d → PK käärö → VS k4; LS/KS/PJ kysyvät vuoron JU:lta. 15.21 levy 60 Gi, kuorma 26.
- Projektiseppä: botti muuriportaat 10/10, tyrmä 1–3, pako OK (7254653e5); videot EIVÄT omistajalle (kuva kyljellään, leijuvia punaisia laatikoita kellovideossa, kamera seinän sisällä, piste 86 7 cm seinästä) → korjaus + uusi video JU:n vuorolla. 80b591b06 (tikkaat) simuun.
- Työkaluseppä: ennen-junaa.sh valmis (proto f3fb0c3b3; #4965 MERGETTY 1a4ff774b): kameratesti, nykäysvahti (ei vielä todistettu, käännöksissä ei ollut), botti-osat, Codex-portti myös postilaatikon kuville. Löydös: natiivi-ui-iss-ympyraikkuna-20261019/viite-cupola-peli-iphone.jpg puuttuu SHA-listasta (pieni).
- Lavastaja nollattu 15.04 (luovutus 0657f8982): kehysten sävyerä VAIN kulta (musta eebenpuu ennallaan, omistaja 13.10.), ennen/jälkeen-pari PT:lle.
- Natiivi-UI odottaa JU:n SIMU NYT valikko-204 15bd68892 → kuvaparit PT:lle; ei omia käännöksiä.
- Merget tässä vuorossa: #4964 (Raamattu 4.21) 3857ddc39, #4965 1a4ff774b.
- Muisti: uusi levyn-heilunta-on-swap (swap + git gc).
