# Päätoimittajan luovutus 24.10.2026 klo 14.55 (konteksti 30 %; tili vvi@vvi.fi)

Id:t: /Users/Shared/Claude/osoitekirja.md. PT local_5df52e10. Edellinen -20261024-1125 (lue vain tämä).
ALOITA: tuotannonohjauksen osio 0, node tools/raamattu-luku.mjs 7.47, luvut 7, 8, 9, 12, 14. OMISTAJA HEREILLÄ → kysymykset KK:n kautta.
Loki: haara fable/loki-20261024i = PR #5206 (14.36, 14.39, 14.41, 14.51 + Raamattu 2.177 KUVAKULMA, 7.32 EI TEKSTIÄ KUVAN PÄÄLLÄ,
docs/tuotanto/tekotavat/3d-ja-kuvat.md kohta 7, tämä luovutus) – JU mergeää (repo ei salli automergeä).
Codex-posti: GIT_INDEX_FILE ENSIN (export ennen read-treetä!), sitten read-tree origin/claude/postilaatikko + commit-tree + push
"${C}:refs/heads/claude/postilaatikko". 14.0x PT tyhjensi vahingossa oman indeksinsä → palautettu `git read-tree HEAD`.

## 1. JUNA 210 – videot vasta kulman B jälkeen
Runko: 4bbdc3e89 + NUI 59eba0f28 (nimitekstit, hyväksytty 4 ruudulla) + PK alkulento-210 01860f233 + lahikulma-210 b13769ca9
(kuitattu: tunnelikamera 1,0 m/22° koko portin ajan, leima 2,00 s vaaka / 2,09 pysty). NS kokosi 67f300e19 VIHREÄ – EI videoihin.
AUKI: PK tekee omistajan 14.36 kulman B (taakse 3,2 m, korkeus 2,6 m, alas 23,4°, fov 84,75; vaakaan sama paikka) ainoaksi
kulmaksi + kuvakulmanappi (45ca4b28c) pois → tarkistusajo → kärki PT:lle → NS kokoaa → PK:n omistajan videot (vaaka+pysty, ääni).
PT MITTAA ITSE (9.5): leima+ääni 2,0 s, tekstit rivi kerrallaan ~7 s, ei välähdystä, portti ~32 s (kamera keisarin takana), blackdetect.
Omistajan videoissa ei tekstiä kuvan päällä (7.32); pelin oma kenkäleima pysyy.

## 2. JUNA 211 (ämpärissä, ei TF:ää)
LR: tausta-v24, muurikate-v9, avoimet-v21 (lähtökujan ovet kiinni, saranasolmut), rakennukset-v15 (portin nastaovet). Viimeinen proto 36fc011eb.
Codex 917–926 hyväksytty (4b7fd8996 postissa). VS: kivijalka varjossa vaaleammaksi → uusi muuripari 3 kohdasta ILMAN tekstiä kuvan päällä.
Omistaja 14.39 "suunta oikea". PK: lähtökujan ovien avaus keisarin lähestyessä (LR:n spesifikaatio) + kujat/porttitunnelit juoksuverkkoon
(~1–2 pv) kulman B jälkeen. Työlista: scratchpad/paatoimittaja/juna211-loydokset.md.

## 3. 14.51 IDENTTINEN NÄKYMÄ
Suunnitelma docs/raportit/juoksupeli-identtinen-suunnitelma-20261024.md (779817484): ~40 h (LR ~22, VS ~16), tiivistelmä KK:lle 14.54;
KK kysyy omistajalta junan sisällön kortilla (ÄLÄ jaa itse 211/212). LR aloitti ristikot alfaksi → laatat, reunat, portaat.
Codex-tilaukset odottavat PT:tä: chiwen-harjapääte + eläinrivi (≤ 3 k kolm.), 2–3 lehtipuuta + kaukolehvästö (suunnitelman kohta 6/10).

## 4. MUUT
- VS raketti lyhyt-pysty täysi ajo käynnissä (~50 min); tarkista ruudut 10–12 kiertorata (päivä/yö-siirtymä, kapselin valoreuna).
- Levy 89 Gi (lasku 14.1x oli PK:n 210v-simuajo, ei VS).
- Asemataulun tyolista.json päivitetty (rivit Juna 210, alkulennon tekstit, kuvakulma, seinät, Juoksupeli täysin valmiiksi).

## 5. Opit
- Peer-viestit jonossa voivat tulla perille myöhässä: korjaus (211/212-jako) ehti vasta suunnitelman jälkeen → tarkista vastaanotto.
- Kuvapari: tarkista paikka havainnekuvaa vasten ennen omistajaa (PK:n ensimmäiset stillit aukiolta, juoksuverkossa ei kujasolmuja).
