# Natiiviseppä: luovutus 10.10.2026 klo 02.1x (konteksti 66 %; juurisyy mitattu, junan 173 muistikorjaus odottaa PT:n päätöstä)

Rooli: Natiiviseppä (Opus, high; juurisyy oli max). Checkout /Users/Shared/Claude/Matkakirja-3d-selvittaja (haara selvittaja-3d-luovutus),
proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto. Edellinen luovutus: viesti-natiiviseppa-luovutus-20261009-yo.md.
**Istuntoviestit (SendMessage) olivat 10 viestin rajalla 00.46 alkaen** → kaikki sen jälkeen postissa
docs/raportit/posti-natiiviseppa-20261010.md (lue kokonaan). Raportti: docs/raportit/muistimittaus-juna173-20261010.md.

## Tulos lyhyesti
- Jetsam-raja iPad Pro 13 (00008103, 8 Gt) ~5,1 Gt. Juurisyy oli Notre-Damen glb: 90 puusolmua, ja Cesium luo jokaiselle oman
  tekstuurin = 557 Mt/LOD. Sama data kaatoi BUILD 172:n (R4). Datakorjaus v6h3/v6b3 (LS2) on ämpärissä, ja v6h3 on laitteella OK (R11).
  **Osoitinvaihto uusin-3 → v6h3 / uusin-2 → v6b3 on Julkaisijalla (posti 00.46 ja 02.0x).**
- Muut pienen muistin erät mitattu (posti 02.0x): omien mallien kaikki LOD-tasot muistissa (b), leikkausmaski SSE 0,5/4096
  (~0,27 Gt, d), hätä 1,0/1,3 jäädytti kaupungin pysyvästi (e). Ehdokkaalla B-polku menee läpi (vapaa min 0,50 Gt).
  A-polulla (intro) vapaa min on 0,35–0,43 Gt, ilman jetsameja.

## Haarat (proto)
- `natiiviseppa/juna-173` **9abe4b3b9** = 571b31309 + Siirtosepän pala odottaa (PT kuittasi). Tämä on junan runko ilman muistikorjauksia.
- `natiiviseppa/juna173-ehdokas-mt` **1ef5bd1dc** (wt/proto-natiiviseppa-ehd173) = runko + c (PieniKarkeinLisa 1,6 → 2,72) + b (omat
  mallit kevyesti) + d (kevyt maski) + e (hätä 0,6/0,8, 0,5 s) + MuistiTarkka + diagnostiikka-asetukset (omatmallit, leikkaus,
  leikkaustarkka, hataraja, Documents/omat-mallit-osoitin.txt). Testit 1258/442/453, unity 0, tarkista ok. PT:n OK:n jälkeen:
  juna-173 fast-forward tähän (tai ilman diagnostiikkaa PT:n mukaan) → simukäännös → laiteportti v6h3:lla → muutosloki VIE:hen.
- `natiiviseppa/omat-katto-173` ff22f4763 (omien mallien SSE 64 -katto + varoitus > 32 tekstuuria; EI ehdokkaassa, varalla).
- Mittaushaarat: muistitarkka-173 b5b927bda, muistitarkka-172 65db09ce5 (172 + loki), omat-katto-173-mt 99846bdb3.

## PT:n päätökset (jonossa olleet viestit, luettu 02.2x)
- "KYLLÄ b + c junaan 173 (omien mallien kevyt lataus pienellä muistilla, PieniKarkeinLisa 1,6), kerroin 4,25 pois". a = LS2:n data,
  osoitinvaihto korjaa myös TF 172:n. Portti: **LS1:n iPad-ajo korjatulla datalla + b + c**. Effort takaisin highiin portin jälkeen.
- Lisäksi b-puolustus: **omien mallien SSE-katto pienellä muistilla budjettina** (jos omien mallien GPU-tekstuurit > ~250 Mt →
  karkeampi LOD, ettei tuleva datavirhe kaada). Muuten ND enintään lod1 korjatulla ja lod2 vanhalla datalla. EI TOTEUTETTU vielä:
  ff22f4763 on kiinteä SSE 64, ei budjetti. Ehdotus: MalliLadattu laskee omien laattojen tekstuurit, ja kun summa > 250 Mt pienellä
  muistilla, kyseisen mallin tileset saa SSE 64 (asetin luo tilesetin uudelleen, kertaluonteinen) + lokirivi.
- Mittaukseni 01.1x–02.0x (posti) näyttävät, että b + c yksin jäädyttää kaupungin (hätä 1,0). Tarvitaan myös d + e (ehdokas
  1ef5bd1dc). PT ei ollut vielä nähnyt näitä: kerro portin yhteydessä.

## Odottaa PT:tä
1. Junan 173 muistisarja ja portti: B läpi; A 0,35–0,43 Gt. Vaihtoehdot: f = pienen muistin hätä uusiksi (taso 1 esilatauskamerat
   pois päivityksen jatkuessa, taso 2 seis; tarvitsee mittauksen ~30 min), tai portiksi B-polku + "ei jetsamia" ja A 174:ään.
2. Junan 174 jono (kaikki PT:n kuittaamia viestien mukaan): Pelikoodari muisti-174-ls1 8ac72eada (korvaa muisti-174:n ja LS1
   kaupunkisilmukat-174:n; LS1:n kärki 6e7c12b11 mukana), LS1 katse-kaari-174 b812d51b0, LS1 osm-yovalot-174 bbaaf0092 (GPU 0 Mt),
   LS2 ktx2-174 4ffe2aa0c (uusin-4 → v6hk3; 2cc5880df vain työkaluja), Siirtoseppä juna174-soundly-v2 b4efe8e32 (korvaa d7dc17f07)
   + LR linnanrakentaja-linna-v45d fbffee576, Pelikoodari pulu-valmiit-testi a4826d2fe (NUI nosto-kerro-174 569ffce3d pohjana).
   loppumusiikki-esilataus 1ffa074a1 ei vielä kuitattu (+1,4–6,5 Mt).
   PÄIVITYKSET 02.2x (viestit): Pelikoodari **muisti-174 e48dae34a** = yläjoukko (Siirtosepän juna174-silmukat d7dc17f07 + silmukat-
   ristihaivytys f1f3fc15c + Olavinlinnan pakkaus + AanimuistivahtiTestit; ääni-PCM Pariisi 45 → 0 Mt, Olavinlinna 102 → 31 Mt).
   LS1 7863be925:n yhden rivin ristiriita PalloAanimaisemaSoitin.Lataa: pidä LS1:n GetAudioClip(KaupunkiSilmukat.Osoite(…)) ja
   Pelikoodarin perässä olevat rivit. Siirtoseppä juna174-soundly-v2 b4efe8e32 (korvaa d7dc17f07). NUI: turva-sivut-174 6c6c54687,
   aanentasot-174 5324d7b22, laukku-mylly-174 e0d51dfb6, peli-kortti-174 de35270f8, nosto-kerro-174 569ffce3d (korvaa 5c8c4e5e6),
   asettelutesti-174 **259426778** (korvaa aiemmat). HUOM: Pelikoodarin pulu-valmiit-testi (c18460a25/a4826d2fe):
   TunnetutRikkinaisetJatkot kaatuu tarkoituksella 569ffce3d:n kanssa → Pelikoodari poistaa rivit. Tarkista kaikki SHA:t
   git logista ennen yhdistämistä (useita korvauksia yön aikana). Edellisen luovutuksen 174-jono (NUI kysy-viiva/chat-pin/
   asettelutesti, pelikoodari silmukat) on edelleen voimassa.
3. Siivous (PT, ei kiireellinen, junan 173 jälkeen): wt/:ssä 11 proto-natiiviseppa-worktreetä (raja 3). Poistettavat: j172, m174,
   lt174, mt172, mt173, okmt, ok173 (varmista ensin `grep -r` skripteistä). unity67 on jo T7:llä (tarkista symlinkki ja 44 muutosta).
   Rivi PT:lle.

## Työkalut
- iPad-ajo: `[OSOITIN=v6h3/mallit.json] zsh proto-3d/tyokalut/natiiviseppa-ajot/muistitarkka-ipad.sh <nimi> <kerroin|0> "<asetukset|->"
  <intro 0|1> <s>`. Analyysi: `muistitarkka-analyysi.py <log>`. Lokit: proto-3d/lokit/natiiviseppa-muistitarkka-*.
- Laitekäännös: `laite-jonossa.sh <SHA>` perl-setsidillä (odottaa lukkoa). Ilmoita Julkaisijalle "lukko vapaa".
- iPadissa on nyt diagnostiikkakäännös 1ef5bd1dc. Osoitinohitus ja kuva-asetukset on tyhjennetty. Documents/muisti-tarkka.txt
  jää (lokia vain tällä käännöksellä).
