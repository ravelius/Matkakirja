# Linssisepän luovutus 16.10.2026 klo 15.20 (KOVA RAJA 35 %, Postivahti)

Proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto (paikalliset haarat, ei pushia). Ajot proto-3d/tyokalut/linssiseppa-ajot/.
Tarkistus `zsh tyokalut/tarkista.sh`, testit `sh Linssit-testit/kaanna.sh [nimi]` worktreessa (komento `</dev/null`).
Viestit AINA send_message id:llä (/Users/Shared/Claude/osoitekirja.md): PT local_5df52e10-10e4-4b72-9554-0049db300dfe (≤ 3 riviä),
Julkaisija local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914, NS local_674b9ec4-e2f3-48e9-a810-a129f20a4f03, Valoseppä local_c238f4af-ae73-44e7-81f1-92848acd9217.
Simu iPad 00CF62C2 vain Julkaisijan SIMU NYT -vuorolla; jokaisessa odottajassa `while pgrep -f "era …"` -esto. Taustaodottajat kuolevat nollauksessa.
LEVY (PT 13.4x): omassa _tyo/linssiseppa:ssa enintään 2 uusinta .app + käytössä oleva; edellinen pois heti kun uusi varmistettu.

## 1. KESKEN: WIENIN JA ROOMAN KIERROSTEN HIONTA (PT 14.5x, junaan 197)
- PT: "jatka hiontaa kahteen seuraavaan hiomattomaan kaupunkiin, vakiokuvista heikoin, korjaa jos onnistuu ilman uusia pohjia; kuvat _valmiit/ + LUE.md,
  yksi rivi PT:lle". Pallokierros-dataa on vain 4 kaupungilla (praha, lontoo, koopenhamina, ateena) → valitsin Wienin ja Rooman yleisen oppaan kierrokset
  (opas-kierrokset, 8 kohdetta; PT:lle kerrottu).
- Vakioajo KÄYNNISSÄ 15.16 (kone kuormaton): `ajo-wiroovakio197.zsh` (sk-wien-vakio-197.txt + sk-rooma-vakio-197.txt peräkkäin, ateena197b-app fa200d35),
  lokit proto-3d/lokit/todistus-wienvakio197-ipad-20261016-1516 ja todistus-roomavakio197-ipad-*. Odottaja kuolee nollauksessa, MUTTA todistusajo voi
  jatkua: ENSIN `pgrep -fl "era wienvakio197|era roomavakio197"` ja `tail ajo-wiroovakio197.log`. Jos Wien valmis mutta Rooma ei alkanut, aja Rooma
  (pyydä SIMU NYT). Ajon jälkeen SIMU VAPAA Julkaisijalle.
- Korjaustapa (ei datatiedostoa näille): Ydin/Kierros/OpasKatseOletukset.cs (kohdekohtainen katse_suunta/kaari/koko_m, kuten Notre-Dame ja Akershus;
  testi KippiPysahdyksetTestit). Kokeilu ensin simulla (kulmavaihtoehdot), sitten uusi haara linssiseppa/praha-v7-197:n päälle, NS:lle junaan 197.
- Ajossa skenaariot odottavat `oleta-uusi opas: saapui` 8 kertaa (nimiä ei käytetty) → tarkista kuvat.tsv:stä mikä kohde on mikin eNN.

## 2. VALMIIT TÄSSÄ VUOROSSA (kaikki NS:llä junaan 197 tai jo yhdistetty)
- ATEENA v13 + ei puukortteja: linssiseppa/ateena-hionta-197 ab01db1d8 (Erekhtheion katse 225 → 245; 255+ venytti liu'un Parthenonille > 15 s;
  PuuRuudukko.VainGooglenPuut = {ateena}). Data ämpärissä (Julkaisija 12.42). Varmistus fa200d35 ok; e07:n oikean reunan kaistale = Googlen laatta
  (kierros 2: silmä 40–65 ei auta). Kuvat _valmiit/ateena-hionta-197-20261016/ (LUE.md).
- PRAHA v7: linssiseppa/praha-v7-197 91251af40 (Malá Strana 200°, silmä 95–115; testien poikkeuslistat). Data ämpärissä (Julkaisija 15.0x).
  LONTOO ennallaan (Greenwichin tumma möykky = Googlen purppurapyökki; silmän nosto 55+ rikkoo LoppuNouseeYleiskuvaan 0,97–0,99).
  Kuvat _valmiit/lontoo-praha-hionta-197-20261016/ (LUE.md).
- TELAKOINTI: k4b 3f3abd730 (Valoseppä junaan 196), k5 fasettirypyt d3d18903b (fasetti 0,5; NS yhdisti juna 196 -runkoon 8fb0fe65f).
  Kuvat _valmiit/telakointi-havainne-196-k4-20261016/ ja telakointi-k5-197-20261016/.

## 3. AVOIMET
- Worktreet: ateenahionta + prahav7 (NS 197), telakointi + telakointik5 (yhdistetty → poista kun juna 196/197 lukittu), aariviiva, peking197,
  porttitasanne, reittiedella, korostusmaa, kehysvari, kierrokset195 (todistusajo.sh – älä poista), puutomat191.
- _tyo/linssiseppa: vain ateena197b-app (Wien/Rooma-ajo käyttää; poista kun seuraava käännös varmistettu).
- tools/gpu-vapaa.sh ja .claude/settings.local.json* checkoutissa eivät ole minun (älä committaa).

## ALOITUSVIESTI SEURAAJALLE
Olet Linssiseppä (Opus, high). Lue CLAUDE.md ja tämä luovutus (git show <sha>:docs/raportit/viesti-linssiseppa-luovutus-20261016-1520.md).
Ensin kohta 1: tarkista Wien/Rooma-ajo (pgrep + loki), SIMU VAPAA, heikoin kohta per kaupunki → OpasKatseOletukset-korjaus → PT:lle yksi rivi.
