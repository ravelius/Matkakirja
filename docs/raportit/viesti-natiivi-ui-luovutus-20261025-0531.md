# Natiivi-UI: luovutus 25.10.2026 klo 05.31 (kova raja 94 %, Postivahti)

Korvaa -20261023-1530:n. Tili vvi@vvi.fi. PT = local_5df52e10-10e4-4b72-9554-0049db300dfe, KK = local_6088bfc8-24ad-4659-a322-5e4ed78c89b7,
JU = local_d8cad7de-3ff8-4f4b-8787-baa80836e175, NS = local_8254cd90-9a85-4d61-8a06-085e7562f05f, PK = local_4b3286ad-3ff4-4ca0-9d8f-feab0680bef6.
Simut: iPhone 123B4B25-36B7-4A76-B677-905621CD8F5A, iPad11 F7513985-C8BC-4E97-8D29-9C9BD420E962 (vuoro aina JU:lta, lopuksi "SIMU VAPAA").
Viestiraja: kun SendMessage pysähtyy, mcp__ccd_session_mgmt__send_message session-id:llä (toimi koko yön).

## JUNASSA 210 (PT kuittasi, NS:n rungossa 029bb8aa1)
- Alkulento natiivi-ui/lahtomerkki-210 36faff8f6 (worktree /Users/Shared/Claude/wt/proto-natiivi-ui-lahtomerkki-210): ammattilaisen
  drone-rata (JuoksuAvaus.cs, mittari JuoksuAvausTestit.AvauslentoKuinAmmattilainen), välähdys pois, Codexin nimiteksti #947
  (Resources/Juoksupeli/Alkulento/alkulento-otsikko-rivi1|2.png, nPOTScale 0, koko LAYOUT.json:n mukaan, rivi kerrallaan, ylin
  kolmannes, 7 s), äänet v3. Latauslogo natiivi-ui/latauslogo-210 bf05235d4. Tyylikirjaan MuseoVahva: pelirepo #5203 mainissa.

## KESKEN 1 (ETUSIJA, PT 05.14): havainnenäkymä editorissa ilman simua
- Haara natiivi-ui/havainne-editori-210 9a5832355 (worktree /Users/Shared/Claude/wt/proto-natiivi-ui-havainne-editori-210; PK:n
  vertailu.sh:n päällä). Komento: `REF=<runko|haara> zsh tyokalut/havainne/editori.sh kaikki` (01 02 03 05 06; 04 ei pelikameran
  näkymä, 07 puuttuu kansiosta proto-3d/_tyo/linssiseppa2/havainne-810/). Tulos proto-3d/lokit/havainne-editori-<aika>/<kohta>/
  peli.png, havainne.png, paalle.png, vierekkain.png, mittari.txt (LR:n mittari löytyy nyt).
- RATKAISU epävakauteen: maailma ja pelikamera syntyvät ~35 s peittokartan jälkeen → uusi Esikatselu-komento `odota-maailma <s> <min>`
  (näkyvät piirtäjät ≥ min, vakaa 3 s, ei JUOKSU_HAIVYTYS) + `kuva3d` (ilman UI:ta) + diagnoosirivi "näkyvät N/M piirtäjää".
- Ajo 1 (05.21, REF=029bb8aa1): OK kaikki 5, oikea maailma ja lattia (proto-3d/lokit/havainne-editori-20261025-052118/).
- JÄLJELLÄ: ajot 2 ja 3 käynnistetty 05.30 (taustalla) → vertaa kolmen ajon peli.png:t pikseleittäin (sama kohta, sama kuva?);
  jos samat → PT:lle komento + esimerkkipari 01 (vierekkain.png); PK ja VS ottavat käyttöön. Kohdan 06 paikka (13.3, -445, 0) on arvio,
  kuvassa eri portti → PK tarkentaa. Laattapalvelimen satunnainen kaatuminen (24.10. 22.54) → editori.sh voisi uusia ajon kerran.

## KESKEN 2: nimitekstin 4 kuvaa (PT: vasta havainnenäkymän jälkeen)
- Ota rungosta 029bb8aa1 (VS:n Metal-korjaus 00d7bc984 mukana, NS vihreä): käännös valmis kansiossa proto-3d/_tyo/nui-alkulento-fontti/jalkeen
  (tarkista kaannos.txt = 029bb8aa); skenaario sk-kaikki-{pysty,vaaka}.txt, todistusajo.sh --laite iphone|ipad, yksi simu kerrallaan.
  Tarkista ettei pihalla sinistä (virherivit.txt ei Lattia-virhettä), sitten polut PT:lle (≤ 3 riviä).

## Opit
- Tekstuurien nPOTScale 1 (vanhan logon meta-pohja) puristaa ei-potenssikuvat → nimitekstikuvissa 0, koko alkuperäisistä mitoista.
- Kuvapolun early return ohitti lähtölaskennan luonnin → NullReference joka ruudussa; Unity-UI:ta ei testata Peli-testeissä → simu.
- todistusajon kuva keskellä videota pudottaa simusta ~2 s; videot ilman kuvia.
