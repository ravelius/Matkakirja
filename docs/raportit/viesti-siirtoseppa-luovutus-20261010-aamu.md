# Siirtosepän luovutus 10.10.2026 aamu (Opus 5.5, high; PT:n nollaus 06.0x, konteksti 69 %)

## ALOITUSVIESTI SEURAAJALLE

Olet Siirtoseppä (Opus, high): johdat Olavinlinnan historiamoottoria (pelattava pala, esittely, historia, linnan äänet, Final IK,
LR:n pakettien kytkentä). Lue tämä, CLAUDE.md ja Raamatun Ydinajatus kohta 2. Testaus vain automaattisin; simuajot vain kuva-arkkeihin ja
PT:n pyytämiin äänikaappauksiin Julkaisijan KÄÄNNÖS NYT / SIMULAATTORI NYT -vuorolla, oma simu 8362879F-30B9-4625-9F42-57326EBC3439.
Ilmoita Julkaisijalle "lukko vapaa" heti käännöksen jälkeen ja "simu vapaa" lopuksi. Raskas simu yksin, muistivahti 16 Gt.
Proto-worktree /Users/Shared/Claude/wt/proto-siirtoseppa-kello (haara nyt siirtoseppa/esittely-1499). Varmuuskopio natiivi-backup
peili/proto/siirtoseppa-<haara>. Skenaariot: /Users/Shared/Claude/proto-3d/tyokalut/siirtoseppa-ajot/skenaariot/.

**Ensimmäinen tehtävä: junan 175 arkki.** Julkaisijan jonossa (LS1:n ajojen jälkeen, arvio ~06.30–07). Kun saat KÄÄNNÖS NYT:
`PROTO_APP_KOPIO=<scratchpad>/app175 proto-3d/tyokalut/proto-kaanna.sh b99fb5dae 8362879F-…` (lopullinen; vanha käännös 308f4b021 = v46t on
talteen kopioituna proto-3d/tyokalut/siirtoseppa-ajot/app175-308f4b021/, jos uutta ei ehditä). SIMULAATTORI NYT:ssa proto-worktreestä
`tyokalut/todistusajo/todistusajo.sh --era v46u-175 --udid 8362879F-… --app <app> --sha <käännetty> --haara siirtoseppa/esittely-1499
--skenaario …/skenaariot/v46u-kuvat.txt --nyt` ja perään `--era syke-175 … --skenaario …/skenaariot/syke.txt`. Tulokset PT:lle ja LR:lle
(arkkien nimissä ladatun paketin hash). Syke: `ffmpeg -i aani/syke-halytys.wav -af ebur128=peak=true` (LUFS) + astats (huiput), lokista
"seikkailu: syke nopea (hälytys)" ja "syke rauhallinen".

## JUNA 174 — VALMIS

`siirtoseppa/juna174-v46q` **ac0047bf0** lähetetty Natiivisepälle 04.4x (PT kuittasi). Sisältää b4efe8e32:n muutokset (soundly-v2, keittiö
silmukat-korjaukset-v2), laatu-korvaajat-v1:n, huoneäänet pelaajan huoneesta (kappelissa vain oma äänimaisema), LR v46q 4c01b13e623e0be1 ja
todistusajon kiertokorjauksen. VIE-ehto (v46q 0° päivä + hämärä) täytetty 05.18: todistus-v46q-0-20261010-0515. iPad-muistiportti:
Laitetestaaja ajaa proto-3d/tyokalut/siirtoseppa-ajot/muistitarkka-olavinlinna-ipad.sh j174 420 (skriptiä ei ole ajettu → auta, jos ei etene).

## JUNA 175 — `siirtoseppa/esittely-1499` **b99fb5dae** (ei kuitattu; Linssit 1264/1264, unity 0)

1. 600086317 Esittelyn 1499-asu: kun ulkokuori.asu = "1499", saapumisen jälkeen kävelydata osittain (ranta-1499 + porttikäytävä) ja
   SeikkailuHistoria.Esittely1499: vuosileikkaukset kuten historiassa 1499 (bastionit, Kellobastioni, ponttonisilta, Paksu bastioni),
   ranta-1499 tasaisella kalliosävyllä, muut kävelyosat piiloon, mustan korvaus. Lokirivi "seikkailu: esittely 1499".
2. eca8dc339 Nopea syke hälytyksessä (SykeSekoitus, Ydin/Seikkailu/Vartija.cs): ristihäivytys 1,5 s tasatehoisesti, paluu rauhalliseen,
   puheen aikana −6 dB. PT:n ehto: 30 s kaappaus + aani mittaa ennen kuittausta.
3. 4dfd35f9f Esittely KIINNITETYSTÄ paketista (PelattavaPala.Hash, ei uusin.json; PT: vanhoja appeja ei rikota); kehittäjän osoitin/peili voittavat.
4. e4fdb9ea9 Historia: Paksu bastioni 1791 osiin, K2-droneen 1788–1800-vaihe (K2 yhä 8 s).
5. 8b6950f0b + 651c2d352 repliikit-lapi-v2 (Pelikoodari: tyrma-vesipoika-1 −2,3 dBTP).
6. b99fb5dae LR v46u dcc0591e7f6a55ac (vain atlas: seinät 5 ja 7–10 tekoälypintoina; data sama kuin v46t 6a9023165fa72a12).
   TUNNETTU (LR): s5:n pyöreän tornin kyljet viistosti (10°, 260°) kuoppaiset → korjaus v46v:ssä (~06.30, myös s11 v2t ja kalliorannan
   kaistat s12/14/16) → kytke kuten v46u (rakennus/osat/merkit 200, vie-dioraama CI success, kultaiset v46v, PelattavaPala.Hash/Versio).

## AUKI

1. 175-arkki + syke (yllä) → PT; LR:lle arkin polku (katsottavat: s5 315°, s7, s8–s10 45°, bastionien paikat 225° ja 90°).
2. v46v kun LR ilmoittaa.
3. Todistusajon kiertokorjaus erillisenä myös siirtoseppa/todistus-kierto 25fa87450 (master-pohja) → junaan, kun Julkaisija ottaa.

## OPITTUA

- ESITTELY LATASI ENNEN TUOTANNON (uusin.json): arkit ilman `poikki osoitin` olivat tuotantoa (v46o-arkki ja 174-uusinnan arkki väärin
  nimetty). 175:stä esittely kiinnitetty. Arkkien nimiin ladatun paketin hash; tarkista lokista "Olavinlinna ladattu … juuri …/<hash>/".
- `Pelaa` latausruudun aikana katkaisi seikkailun äänet (nayttamo.Odota piilotti uudet lapset → coroutinet kuolevat hiljaa): korjattu.
- `poikki tunnelma` rakentaa kuoren uudelleen (~9 + 4,5 s): `oleta 90 kuori huippu valmis` ennen kuvaa. Pelaajalle ei tapahdu.
- simctl screenshot on aina pystykehys; linna LandscapeLeft → raportti kääntää.
- LR:n pakettihash = dioraama/olavinlinna/<hash>/rakennus.json (CI vie-dioraama.yml); blender-hash ei kelpaa. `gh run list --workflow
  vie-dioraama.yml` ja tiedostot 200 ennen kytkentää. Uusi vain-1499-leikkaus vaatii myös Historiajana.OlavinlinnanOsat-rivin (testit).
- Käännös asentaa simuun; pidä eri junien käännökset omissa PROTO_APP_KOPIO-kansioissa (todistusajo asentaa --app:n).
