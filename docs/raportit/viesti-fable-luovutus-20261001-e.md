# Päätoimittajan luovutus 1.10.2026 klo 21.1x (konteksti 72 %)

Sessio "Päätoimittaja (Opus, max)" local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc, haara claude/bold-ride-vow4ki (pushattu), RC päällä.
Edellinen: viesti-fable-luovutus-20261001-d.md. Päivän päätökset lokissa (grep "1.10.2026" docs/raamattu-loki/paatokset-2026-09.md);
17.x jälkeiset kirjaukset ovat haarassa (loki-PR #3802 vei mainiin vain 17.06 asti) → tee uusi loki-PR samalla kaavalla
(worktree origin/mainista + `git checkout claude/bold-ride-vow4ki -- docs/raamattu-loki/paatokset-2026-09.md`, Julkaisija mergeää).

**KIELI: omistajalle vain suomeksi**, myös väliviestit (omistaja 1.10. klo 17.3x; muisti omistajalle-vain-suomeksi).

## Roolit (kaikki RC päällä)

| Rooli | Session id | Kärki nyt |
|---|---|---|
| Julkaisija | local_1325b8e8 | Web-juna: #3788/#3789/#3791/#3795/#3796/#3798/#3799/#3800 (kortit), #3808 lomakekenttä; mergetty #3801 PANEELI, #3804 pillerivalikko, #3805 tyylikirja, #3807 visa B, #3806 linna-ASTC, #3802 loki. Linnan osoitin 2d0bde8dfb083ec7 vaihdettu 19.37 (todennettu TF 103:lla). TF 2.10. = BUILD 109 (julkaisija-tyokalut/tf-jono-20261002.txt) |
| Natiiviseppä | local_04e2850b | BUILD 109 (b1232c6e) = huomisen TF (103–109: ihmiskortti, veto, nostoselain+AUTO, Periaatteet, linnan ensilataus v2, mylly ui-komennolla, linssivalikko, visa+kenttä, nostoluennan lappu, S2-fotorealismi B ISS-kyydissä). Jono 110 = burst-3 + 30-sarja + matkamittari. Avoin: visan löytökortti beige kokoruutu (Natiivi-UI), kuvaraja 199/200 Mt (LRU toimii) |
| Natiivi-UI | local_e9fdc695 | Nostoselain + AUTO (mallit 20/22/23, omistaja kortilla) merge-pyynnössä; alasveto kaksivaiheiseksi (UI-pohjat kohta 2, eff8ab963); lautapelipohja (KUVANÄKYMÄ + PANEELI) tyylikirjaan; karttaselite natiivissa ennallaan |
| Pelikoodari | local_242febe9 | Karttaselite PANEELI-pohjalle toiminnaltaan ennallaan (web 22.9:n malli), sitten seuraavat PANEELI-siirrot |
| Linssiseppä | local_4b4b976c | LEPÄÄ, luovutus viesti-linssiseppa-luovutus-20261001-c.md. Huominen: 1) lentopelin latausodotus (nauhat = Cesium-laatat lennon alussa; Lähde vasta lähialue ≥ 98 %, kuten lento v3), 2) Sokrates-heijastusvarjostin omistajan mallikuva-OK:n jälkeen, 3) yövalot lähikuvaan. Kaasuvipu valmis (omistajan speksi) |
| Linssiseppä 2 | local_ee961a2d | Juliste E v2 omistajan 19.5x-palautteella (sinisempi kuin malli, pilvet horisonttiin, ISS-siluetti oikeaan alakulmaan): viimeinen kierros koodattu (ydin ~5 km, utu 1,2, violetti sauma pois) → toimittaa E-lopullinen + E-aurinko 4096 × 5120 + JSON + pari |
| Linnanrakentaja | local_2cf16574 | v24-kuori viety 0e1a7b5806ca986f (PR + Siirtosepän mittaus → omistajan osoitinlupa). Myllyn 3 lautaa (Majatalo 1873 vaalealla upotteella, Luostari 1200-l. = Ten Duinen -tiili inv. 033880, Viikinkilaiva n. 900 = Gokstad) → mallikuva ennen kytkentää. Sitten Sokrateen kipsibysti + Blender-mallikuva (Apologia 38a kreikaksi kasvoille). EI uutta linnaa (Allymes muistissa), EI mikserin v3-ottoja ennen omistajan säätöjä |
| Siirtoseppä | local_c264506b | Mylly koodissa (proto siirtoseppa/pelit-4 d93e1b7f): avaus vain Berliinissä kohtaamisena (tehtävänappi), lautavalinta KYTKIN-ryhmänä, laudat ansaitaan (normaali → Luostari, vaikea → Viikinkilaiva + Luostari), Aarteet → Pelit, tallennus v9 + migraatio. Lautanimi "Luostari 1200-l.". Tekstit Sisältökirjurilta. Linnan v24-mittaus |
| Karttaseppä | local_4bd7c316 | Pallon delta-vienti käynnissä 19.35 alkaen (omistajan Run-rivi; 4–5 h, lukko pyramidi-poltto/ajo-20260930/delta/ajossa.lukko) → #3787 valmiiksi → Julkaisija → webin pyramidiosoitin 2026-09-30. Viikonlopun S2-maailmamosaiikki käynnissä |
| Sisältökirjuri | local_0c172ea0 | Mylly-tekstit (haara sisalto-pelikatalogi-20260927, sisaltokirjuri-mylly-historiatekstit-20261001.md osio 7, museon ajoitus 1200-luku), Sokrates-tekstit hyväksytty (sisaltokirjuri-sokrates-pilotti-20261001.md); maakuntien kuva2 I–K jonossa |
| Laitetestaaja | local_3509b4ba | savukkeet junista |
| Postivahti | local_63227b57 | kierto 10 min |

## ODOTTAA OMISTAJAA (kanna eteenpäin)

1. **EHDOTUS_AVAIN-vaihto** TF:n (BUILD 109) latauduttua 2.10. ~12: yksirivinen komento omistajalle (kaava luovutuksessa -d, kohta 1).
2. **Juliste E v2**: kun Linssiseppä 2 toimittaa, kehystä `node proto-3d/lokit/paatoimittaja-juliste-20261001/tee-kehys2.mjs <kuva.jpg> <nimi> [x y] [--yo]`
   (datarivi JSONista). Siluetti on nyt oikeassa alakulmassa → sovita leima (merkki.svg) sen päälle tai siirrä. Kultarengas VAHVEMMAKSI
   (paksumpi, kirkkaampi) + versio ilman (omistaja: "vahvempi tai jätetään pois"). Helsingin pikseli vanhalla kameralla x 2080, y 3236
   (yökuvan valorykelmästä) — tarkista uudesta yökuvasta, onko kamera sama. Omistajalle: päivä ilman / päivä + rengas / aurinko.
3. **Linnan v24-osoitin**: Siirtosepän mittaus → kortti omistajalle (kuvapari jo nähty).
4. **Myllyn kolmen laudan mallikuva** (Linnanrakentaja) → omistajalle.
5. **Sokrates-mallikuva** (bysti + heijastus) → omistajalle → Linssiseppä toteuttaa.
6. **Lentopelin video** korjatusta käännöksestä (väliaikainen video ja vivun kuva jo omistajalla).
7. **Codex-toimitukset**: Pulun robottikäsi (posti fc2efe3d1) ja Olavinlinnan viivapiirros (posti 3cf0ddd08) → omistajalle; viivapiirroksen
   käyttöpaikka (Poikkileikkaus-linssin selite vai linnan infokortti) päätetään omistajan kanssa.
8. **Myllyn historian havainnekuvat Codexilta** (kolme "historian hetki" -kuvaa lautojen aikakausista, korttipohjan 2:1-kuvaksi): ehdotettu,
   omistaja EI vielä vastannut ok. Huom: keskiajan kuva on nyt luostari (Ten Duinen), ei katedraali.
9. **Kohdekorttikokeilu webissä** (kun #3788 on tuotannossa): Ateenassa vain Kysy, Visa esim. Zugspitze, `?kohdekortti=vanha` palauttaa.
10. **Talven S2 -kuvapari** ja **webin jokiviivataso natiiviin?** (luovutus -d).
11. **Allymes seuraavaksi linnaksi**, kun nykyiset työt ovat valmiit (muisti seuraava-linna-allymes).

## Päivän päätökset 17.x–21.1x (lokissa haarassa)

PANEELI-token peitto.paneeli 70 (hyväksytyn speksin kohta 1); karttaselite: kumpikin alusta ennallaan; fotorealismi B koskee vain ISS-kyytiä;
lentopeli (Linssiseppä) ja Mylly + pelikehys (Siirtoseppä) työhön; nostoselain 22 + 23 ja lautapelien pohja (kortilla 18.2x); pelien palkkio vain
bottia vastaan (40/60/80 £), ei Aarnin vihjeitä peleistä (kaanon AARREVIHJEET); nostokortin luenta ei avaa matkakirjakorttia; linnan osoitin 2d0b
(kortilla 19.3x); uutta linnaa ei aloiteta, Allymes muistiin; Pulun robottikäsi (Codex); juliste E v2 -palaute; yksi peli – yksi koti;
Myllyn lautavalikoima aitojen esikuvien mukaan ja ansaittavina; katedraalilaudat olivat nine holes → Luostari 1200-l. (Ten Duinen);
Olavinlinnan viivapiirros (Codex); ajattelijoiden kipsibystit, pilotti Sokrates; nostokortin alasveto kaksivaiheiseksi (pohjan mukaan).

## Huomiot

- **Omistajan "Ok"** vastaa yleensä viimeisimpään ok-pyyntöön (omistajan 29.9. ohje). Jos se on epäselvä, kysy kortilla. Luokitin esti 18.1x
  lokikirjauksen, jossa monitulkintainen "Ok" oli tulkittu laajasti (Instruction Poisoning) → kirjaa vain eksplisiittiset vastaukset.
- **Levy** ~41 Gt (raja 30, TF tarvitsee > 30): proto-3d/lokit 45 Gt ja /private/tmp/claude-502 29 Gt (roolien scratchpadit). Roolit siivoavat
  omiaan; en poista itse muiden tiedostoja enkä pyydä /tmp-poistoja Julkaisijan puolesta (luokitin esti sen Julkaisijalta).
- Linnan viennit tein itse irrotettuna (`vie-blender.sh` + perl setsid + lukko proto-3d/lokit/paatoimittaja-linna-vienti-<hash>.lukko);
  kartan viennit ajaa omistaja Run-rivillä.
- Omistajan Cupola-mallikuva (sininen kaari) ei tallentunut tiedostoksi; kuvaus välitetty Linssiseppä 2:lle sanallisesti.
