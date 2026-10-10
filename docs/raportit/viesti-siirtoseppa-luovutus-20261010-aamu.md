# Siirtosepän luovutus 10.10.2026 aamu (Opus 5.5, high; konteksti ~65 %)

## ALOITUSVIESTI SEURAAJALLE

Olet Siirtoseppä (Opus, high): johdat Olavinlinnan historiamoottoria (pelattava pala, historia, linnan äänet, Final IK, LR:n
pakettien kytkentä). Lue tämä, CLAUDE.md ja Raamatun Ydinajatus kohta 2. Testaus vain automaattisin; simuajot vain kuva-arkkeihin ja
PT:n pyytämiin äänikaappauksiin Julkaisijan KÄÄNNÖS NYT / SIMULAATTORI NYT -vuorolla, oma simu 8362879F-30B9-4625-9F42-57326EBC3439,
ilmoita "lukko vapaa" heti käännöksen jälkeen ja "simu vapaa" lopuksi. Raskas simu yksin, muistivahti 16 Gt (PT).

**Ensimmäinen tehtävä:** tarkista tilanne alla (AUKI 1–2). Jos 174-uusinta on jo ajettu (lokit/todistus-v46q-uusinta-* ja
todistus-huoneaanet3-*), lähetä SHA Natiivisepälle ja rivi PT:lle; muuten pyydä Julkaisijalta vuoro.

## JUNA 174 (PT kuittasi ehdoin, proto-haarat; worktree /Users/Shared/Claude/wt/proto-siirtoseppa-kello)

- Kuitattu ja Natiivisepällä: `siirtoseppa/juna174-soundly-v2` b4efe8e32 (d7dc17f07 + soundly-v2 + keittiö silmukat-korjaukset-v2).
- **Kuitattu ehdoin**: `siirtoseppa/juna174-v46q` **ac0047bf0** (b4efe8e32:n muutokset + huoneäänet pelaajan huoneesta + LR v46q
  4c01b13e623e0be1 + todistusajon kiertokorjaus + kappelissa vain oma äänimaisema). Ehdot: (1) uusinta-arkki, jossa 0°-kuva otetaan vasta
  "kuori huippu valmis" -rivin jälkeen (skenaario scratchpad v46q-kuvat.txt), (2) huoneäänet ac0047bf0:lla: kappelissa EI massan ääniä
  ("äänimaisema soi kappeli:" ilman massa:-rivejä; skenaario huoneaanet.txt). Käännös cd5e3a727 (app-kopio scratchpad/app). Puhtaana →
  SHA ac0047bf0 Natiivisepälle ja rivi PT:lle (kuittaus voimassa ilman uutta kierrosta).

## JUNA 174: ac0047bf0 LÄHETETTY Natiivisepälle 10.10. 04.4x (PT). Avoin: v46q:n 0°-kuvat (päivä + hämärä) osoittimella 4c01…, skenaario scratchpad v46q-0.txt → rivi PT:lle.

## JUNA 175 (ei vielä kuitattu): `siirtoseppa/esittely-1499` 651c2d352 (tarvitsee uuden käännöksen; e1badd974 vanha)

1. 600086317 Esittelyn vuoden 1499 asu: kun ulkokuori.asu = "1499", saapumisen jälkeen kävelydata osittain (vain ranta-1499 ja
   porttikäytävä; SeikkailuKavely.Lataa vainNakyvat, Osittainen) ja SeikkailuHistoria.Esittely1499(true): vuosileikkaukset kuten historia
   1499 (bastionit 1602–03, Kellobastioni, ponttonisilta piiloon), ranta-1499 tasaisella kalliosävyllä, muut kävelyosat piiloon, mustan
   korvaus. VarmistaKavelyData (pala/historia) ottaa leikkaukset; historian jälkeen palaa; Sulje nollaa. Lokirivi "seikkailu: esittely 1499".
2. eca8dc339 Nopea syke hälytyksessä: sydan-nopea-01 ristihäivyttyy 1,5 s tasatehoisesti (SykeSekoitus, Ydin/Seikkailu/Vartija.cs),
   paluu rauhalliseen, puheen aikana −6 dB (SeikkailuRepliikit.PuheSoi). Lokirivi "seikkailu: syke nopea/rauhallinen".
   PT:n ehto ennen kuittausta: äänellinen 30 s kaappaus hälytyksessä + aani mittaa (LUFS, huiput); skenaario scratchpad syke.txt.
3. 2210b802d LR v46s → 040890b30 v46t 6a9023165fa72a12 (Paksu bastioni 1791; historiaan ja K2:een 1788–1800, e4fdb9ea9); 4dfd35f9f esittely KIINNITETYSTÄ paketista (PelattavaPala.Hash, ei uusin.json — PT: vanhoja appeja ei rikota); 8b6950f0b repliikit-lapi-v2.
   Aiemmin: 2210b802d LR v46s 8b0bdf3bad55c8df (tornien harjat omalla kivellä, Kijlin torni 16,5 m, Pyhän Eerikin torni, tulkinta).
   Arkki: scratchpad esittely1499.txt (8 suuntaa + lounaispuoli lähempää). LR pyysi katsomaan Eerikin ja Kijlin tornien korkeudet ja
   näkyvätkö bastionit 180°/225°/270°. Arkki PT:lle ja LR:lle.

## AUKI / SEURAAVAKSI

1. 174-uusinta (Julkaisijan jonossa ~03.55) → SHA ac0047bf0 Natiivisepälle.
2. 175-simu (~04.40): esittely1499.txt + syke.txt samalla app175-käännöksellä → arkki + kaappaus PT:lle.
3. iPad-muistiportti: Laitetestaaja ajaa proto-3d/tyokalut/siirtoseppa-ajot/muistitarkka-olavinlinna-ipad.sh j174 420 junan 174
   Release-laitekäännöksellä (raja: jetsam tai vapaa < 500 Mt → juna seis). Skripti ajamaton → auta, jos ei etene.
4. Todistusajon kiertokorjaus (vaaka-UI:n stillit oikein päin) myös erillisenä: siirtoseppa/todistus-kierto 25fa87450 (master-pohja).

## OPITTUA

- ESITTELY LATASI TUOTANNON (uusin.json), ei palan hashia: arkit ilman `poikki osoitin` olivat tuotantoa (v46o-arkki ja 174-uusinnan arkki). 175:stä alkaen esittely kiinnitetty; arkkien nimiin ladatun paketin hash (PT).

- `Pelaa` latausruudun aikana katkaisi seikkailun äänet (nayttamo.Odota piilottaa uudet lapset → coroutinet kuolevat hiljaa): pala odottaa
  SaapumisOdotuksen. Deaktivointi tappaa coroutinet ilman lokia.
- `poikki tunnelma` rakentaa kuoren uudelleen (~9 + 4,5 s): skenaariossa `oleta 90 kuori huippu valmis` ennen kuvaa. Pelaajalle ei tapahdu.
- simctl screenshot on aina pystykehys; linna on LandscapeLeft → raportti kääntää (todistus-kierto).
- LR:n pakettihash on dioraama/olavinlinna/<hash>/rakennus.json (CI vie-dioraama.yml); blender-hash ei kelpaa palalle. Tarkista CI-ajon
  tila (`gh run list --workflow vie-dioraama.yml`) ja tiedostot 200 ennen kytkentää.
- Varmuuskopiot natiivi-backup peili/proto/siirtoseppa-<haara>.
