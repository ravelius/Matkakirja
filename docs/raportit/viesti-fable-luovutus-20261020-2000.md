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

## 4. LISÄYS 20.1x (luovutuksen jälkeen)
- Auto Zoom pystyssä (omistaja 19.56 "Kyllä, lähikuviin") → juna 209 (LS haara linssiseppa/autozoom-pysty-208; isojen taulujen nopeus + kertojan rajaus). 208:ssa vain kertojakorjaus 4a84253f9.
- Juna 209 (EI 208): PK pelikoodari/maali-209 = 4b53b5547 (maali luoteisella kulmatornilla + kokoelma + nimetyt paikat; testit 80/80).
  Maali ja suuntanuoli junaan VAIN YHDESSÄ. Nuolen ulkoasu: NUI tekee aamuksi 2 kuvaa (lasineliö ☰:n vasemmalla + "340 m" / pelkkä nuoli yläreunassa)
  → polut KK:lle, KK kortti huomenna. NUI tekee kokoelma- ja loppukortin (KORTTI-pohjan tumma). PK: näköalahetki + liu'un ääni
  (Äänittäjä: audio/juoksupeli/liuku/liuku-kivi-raahaus.mp3 + -tyonto.mp3, CC0, ei korvakuunneltu).
- Sisältökirjuri (levossa vanhalla tilillä): salien lyhyet merkitykset kokoelmaan → luo päätilille tai anna toiselle, kun 209 lähestyy.

## 5. LISÄYS 20.14 (Postivahdin nollauspyyntö)
- OMISTAJA 20.09 (KK:n kortti): suuntanuoli = vaihtoehto 1, lasineliö ☰:n vasemmalla + matka alla. Kirjattu lokiin (paatokset-2026-10). NUI: lasineliö tyylikirjaan pohjaksi – PT kysyi 20.12, vastaus auki.
- JUNA 209 RUNKO (NS:lle ilmoitettu, 208:n lukitus ensin): NUI natiivi-ui/juoksu-nuoli-209 = f2be670cd (= PK maali-209 eed78dcf1 + NUI kortit ef42706ad + nuoli; maali päällä; testit 696/696; PK ff:llä samaan) + LS 0ed56caf2 (Auto Zoom pystyssä; ei 208:aan, PT 20.0x).
  PK:n haara on paikallinen proto-repo (wt/proto-codex-pulu-kaak-rajaus-20261014), ei originia. Vanhat 7e8c0c16b/2fbdc2b8c/eed78dcf1/3a1d0e6c5 EIVÄT käy.
- 208: lukitus odottaa yhä VS:n kuvaparia (revontulet + kehysvarjo) → PT tarkistaa → OK NS:lle.
- Asemataulu: junat.json "Juna 209" -rivi ja tyolista.json "Juoksupeli täysin valmiiksi" päivitetty. 209 auki: salien merkitykset (SK), Pelit-valikko (omistaja, kohta 7), Louvren henkilöt + Niken jalusta.
- 20.18: NUI lasineliö tyylikirjaan PR #5063 (5d5c37fed; + puuttunut PYSÄYTYSKUVA-pohja), natiivi 390cac032 = 209:n NUI-kärki (korvaa f2be670cd:n; NS:lle ilmoitettu). #5063 mergetään vihreänä.
- OMISTAJAN PYYNTÖ 20.14 (KK): juoksupeli Codexin havainnekuvien j9/j10 näköiseksi. PK vetää: kuvapari "havainne j9/j10 | peli nyt" (alku + keskeltä) 208:n käännöksen jälkeen → PT tarkistaa → KK; näköisyyssuunnitelma ≤ 8 riviä PT:lle (reitti käytävissä ja avoimissa huoneissa + kamera PK, valo VS, eunukit/kasvit/Tripo-esineet Lavastaja+Codex). VS:lle ja Lavastajalle kerrottu.
