# Päätoimittajan luovutus 12.10.2026 klo 02.4x (konteksti ~62 % → oma nollaus; omistaja hereillä/yövaltuutus voimassa)

Session local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc. Edellinen: viesti-fable-luovutus-20261011-yo2.md. Muisti: fable-tila-20261012-yo, yovaltuutus-20261011, lataukset-pysyva-lupa.
Keskustelu: /Users/Shared/Claude/keskustelut/Paatoimittaja-2026-10-11-klo-2335-0234.md. Työjonot: scratchpad/tyojonot.md (tyojonot-lisaa.py).

## 0. OMISTAJAN LINJAT (sitovat)
- YÖVALTUUTUS 22.4x: PT päättää ja julkaisee 183:n ilman välivaihetta; juna lähtee vasta kun kaikki valmista, ei kellonaikaa (omistaja haluaa 183:n TF:ään ma 12.10. aamuksi).
- Kuvat omistajalle heti kun valmistuvat, VAIN PELIKUVINA (ei Blender-renderöintejä); tarkista ensin. EI KYSYMYSKORTTEJA, rutiinivuoron loppuun "–", kaikki suomeksi, ei kerrota nollauksesta.
- Yön päätökset (kaikki Raamattuun/lokiin, #4464 + #4474 MERGED): raketin selostus v2 (Max Livia, Cupola "Maa ja ohut sininen ilmakehä", "Kolkuta, kolkuta" jää) ja DIALOGIT YHTENÄ OTTONA; TAIDEHALLI (näyttelyvalikko, esityksen aikana ⏸ + ☰, nimilista, Siirry 1,5 s, suurennus eleillä, kävely, tauko hiljentää kertojan, tietokortti tauolla); KIPPI ☀ pois kokonaan + ☰ oikeaan yläkulmaan.

## 1. JUNA 183 (NS kokoaa; runko 704a69542+, testit vihreinä)
KUITATTU JA RUNGOSSA: NUI kippi-taidehalli-183 15bf020f9 (⊃ kippi-ui c8214dceb) + LS2 46442ed7f; LS1 kippi-183 f6e438497 (ikkunat, kippi A–E, minihampurilainen) + puuportti ba5edb2db (+ 6323b5204); LS2 raketti v6 9f080ccbb, aluskerros d838cb35c; NS saapumisportti 245068904; LS1 aukiot f170db3e1; museon tauko 00f83a6da; Pelikoodari talous km 5aa006f5b; aiemmat (luovutus -20261011-yo2 kohta 1).
LUKITUS ODOTTAA:
- LINNA: v48e (jumi 16 + 7 MH: soutaja v1d, portinvartija, vartijat A/B, kokki, vouti, apulainen) kiinnitetty linnahaaraan 1220328c7 → botti ajossa; v48f (+ kappalainen ja aitan hoitaja v1b) LR:llä viennissä. Botti 14/17 v48d:llä: 55/61 (salin portaan alapää) kaatuu yhä. PT:N PÄÄTÖS 02.4x: v48e/v48f kelpaa 16/17:llä (61 kaatunut kaikissa ajoissa v47g:stä alkaen = ei regressio → 184; 55 oli botin oma regressio, Siirtoseppä korjasi 2ae8a6c11) → LT:n 8. kierros heti 16/17:n jälkeen → puhdas → tunnus NS:lle. MH-only-paketit (v48f) vaativat vain botin + pelikuvat, ei uutta LT-kierrosta.
- MH-MUISTIMITTAUS iPadilla 02.50–03.30 (NS) → tulos PT:lle.
- Valinnainen: LS2 täyttöväri d151a9b9d (lataamattomat kohdat maan sävyyn; simukuva → kuittaus).
LUKITSE-KETJU: PT → NS "LUKITSE 183" kun linna kuitattu → Julkaisija mergeää web #4459 (b02290977) → #4461 (4c302d87c) → NS: linnan merge → testit → käännös → iPad-muistiajo (~50 min) → BUILD → TF iOS + Mac (Matkakirja.app) → beta-arvio → vanhat vanhennetaan → omistajalle yksi rivi (muutosloki-tyyli) + aamun yhteenveto + Asemataulu (Juna 183 → TF 183).
MUUTOSLOKI: NS:n luonnos natiiviseppa-skriptit/juna183/muutosloki-183-luonnos.txt + PT:n korvaavat rivit lähetetty NS:lle 02.2x (kippi, raketti, taidehalli, Olavinlinna-MH, viisi pääkaupunkiluentaa).
OMISTAJALLE NÄYTETTY: kippi (2 arkkia), soutaja-MH pelikuvat, saapuminen ennen/nyt + oikaisu + korjattu kuva, minihampurilainen, raketti (lähikuvat + äänellinen tallenne), taidehalli. NÄYTTÄMÄTTÄ: muiden MH-hahmojen pelikuvat → Siirtosepän botti-ajosta heti kun tulevat (tarkista ensin).

## 2. JUNA 184 (merge vasta 183:n sisältöviennin jälkeen)
SK kaaret #4469 + Äänittäjä #4470 (18 luentaa, v2-nimet, −14,6 LUFS, --kuiva-korjaus) + Pelikoodarin kultaiset d88aea397; LR vesipoika v1b + renki (+ 55/61, kappalaisen v1c jos tarpeen); LS2 République-täyttö, jos ei 183:ssa.

## 3. MUUT
- KS: kaikki 59 Euroopan kohdekarttaa värikarttoina (#4462, #4467, #4471, #4473 MERGED) → yhtenäisyystarkistus käynnissä.
- SK: kaaripäätökset tehty (#4466/#4468 MERGED), lepää/Codex-posti. Pelikoodari: LUKITSE-valmius, sitten lepo. Äänittäjä: kaari-v2-vienti.
- Levy 88 Gi → siirra-ika 2 h käynnissä 02.35 (tulos scratchpad/levy/siirra-ika2-20261012-0235.log). Unreal: LR avaa hahmo kerrallaan, sulkee välissä.
- Viestiraja: SendMessage ~10/vuoro → varakanava mcp__ccd_session_mgmt__send_message (session id).
- Session id:t: PT local_cf5b4eca, Postivahti local_63227b57, Julkaisija local_1325b8e8, NS local_04e2850b, NUI local_e9fdc695, LS1 local_4b4b976c, LS2 local_ee961a2d, LR local_2cf16574, Siirtoseppä local_c264506b, KS local_4bd7c316, Pelikoodari local_242febe9, SK local_0c172ea0, LT local_3509b4ba, Äänittäjä local_0275bc7a.
