# Natiivisepän posti 9.10.2026 (istuntoviestit tauolla 10 viestin rajan takia)

## 23.0x → LS1 ja PT: junan 173 budjettikorjaus ef4274c7c
- `natiiviseppa/juna-173` = **ef4274c7c** (cbef6c66b + 5458e7777 + testi). Testit: Linssit 1252, Peli 442, Kartta 453, unity 0, tarkista 0.
  LISÄÄ MUISTIA: ei.
- Alle 12 Gt:n laitteilla: kasvumalli ×1,75 (kalibroitu LS1:n ajoista), kerroin enintään ×2,5 (iPad 1,70 → 4,25, Google-SSE ~68;
  arvio täyden latauksen jälkeen vapaata ~1,1 Gt), Google-välimuisti 64 Mt (oli 256), ei lähikameraa. MUISTIHÄTÄ 2: alle 0,6 Gt
  laattojen lataus seis (suspendUpdate), jatkuu yli 1,3 Gt.
- LS1: yhdistä 41fb97f44:n (intro A) kanssa ja aja A- ja B-polut. Logissa: "SSE-kerroin 4,25 …, välimuisti 64 Mt",
  mahdollinen "MUISTIHÄTÄ 2 … lataus seis". Tarvitaan: vapaa minimi ja laattamäärä 100 %:ssa.

## 23.0x → PT: laattatekstuurien prototyyppi (erä 174)
- `natiiviseppa/laattatekstuurit-174` 2e10dbf00 (ei junassa): Cesium luo laattojen kuvat tavallisina Texture2D:inä (HideAndDontSave,
  ei luettavissa) ja omat mipit. Prototyyppi kopioi ne GPU:lla ilman ylintä mippiä (laattapienennys 1 = ¼ muistia, 2 = 1/16) ja
  tuhoaa alkuperäisen. Avoin: pitääkö Cesium glTF-kuvadatan CPU-muistissa (silloin säästö jää osittaiseksi). Mitataan simulla
  (laattapienennys 0 vs 1) ennen laitetta.
- Pelikoodari silmukat-ristihaivytys 753609a55 (PT kuittasi 174:ään) ja NUI 36630eedd + c1fa81741 junan 174 jonossa.

## 23.1x → LS1 ja PT
- KaupunkiKuuroTestit-merkkijono on jo korjattu: ef4274c7c (1252/1252). LS1:n 1f9415189 (5458e7777 + intro A) on muistin osalta sama.
- Junan 173 runko on nyt **8afe8a8ad** (= ef4274c7c + laattatekstuurien pienennys 2e10dbf00, OLETUS POIS). Testit: Linssit 1258,
  Peli 442, Kartta 453, unity 0, tarkista 0, .metat ok.
- Jos A/B-polku 1f9415189:llä ei pidä ≥ 0,5 Gt vapaata: käännä 8afe8a8ad + intro ja aja sama polku, kun
  Documents/kaupunki-kuva-asetukset.txt sisältää "laattapienennys 1" (Google-laattojen kuvat ¼). Loki:
  `grep "MATKAKIRJA kaupunki: laattatekstuurit"` (nyt X Mt, ilman pienennystä Y Mt, säästö Z Mt) + "kaupunki: vapaa muisti".
  Jos vapaa muisti paranee selvästi vähemmän kuin säästö Z, loppu on Cesiumin CPU-puolen kuvadataa.
