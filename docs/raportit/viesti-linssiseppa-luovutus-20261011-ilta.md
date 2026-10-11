# Linssisepän luovutus 11.10.2026 ilta (päivitetty 17.0x, nollaus PT:n pyynnöstä)

Proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto (paikalliset haarat, ei pushia). Simu- ja käännösvuorot vain Julkaisijalta;
**LS1 = käännöslinja 2** (`PROTO_LINJA=2`), linja 1 vain Julkaisijan luvalla (ilman PROTO_LINJA:a). Ajoskriptit ja skenaariot:
proto-3d/tyokalut/linssiseppa-ajot/ (ketju-*.zsh, sk-*.txt; portit `<nimi>.nyt`). Ketjut irrotettuna `perl -MPOSIX=setsid …`.
HUOM: kaksi ketjua samalla iPhonella (BD64C8E4) ei saa ajaa yhtä aikaa – järjestä portit peräkkäin.
Testit: `sh Linssit-testit/kaanna.sh` / `sh Kartta-testit/kaanna.sh` / `sh Peli-testit/kaanna.sh` (EI zsh), `zsh tyokalut/tarkista.sh`.

## Kuitattu junaan 182 ja SHA Natiivisepällä
- **Alkulento** linssiseppa/alkulento-kaupungit-182 **8b6ac5542**: Ateena, Pariisi (ohitus Picardiessa), Tukholma; taivas korkeuden
  mukaan (musta > 40 km, ilmakehä < 10 km, Ilmakeha.cs); QA `ui aloita <id> lento`.
- **Aloitusintro** linssiseppa/aloitusintro-182 **44929af18** (⊃ 56fa83c34 …): 18 s intro Ateena/Pariisi/Tukholma joka käynnillä
  (William + oma nopea + 6 isoa kuvaa 3 s, Ohita), Introesitys.cs, NUI-rajapinta KaupunkiIntro.Paattyi/PuluValmis/TuleeAloitusintro;
  QA `ui aloitusintro <k>|ohita`. NUI:n pulu-opastus yhdessä (Natiiviseppä yhdistää).
- **Aukiot-monumentit** linssiseppa/aukiot-monumentit-182 **f40982d9d**: pystykuvan aukiokehys kiertää keskusmonumenttia 23 aukiolla
  (Q-id), silmä ≥ 65 m, kamera aukion puolella; Sergelin rivi pois (suojattu teos). Arkki
  lokit/todistus-monumentit-jalkeen2-182-20261011-1615/ennen-jalkeen2-9s.jpg.
- Pariisin KIIRE 11.5x: EI VIKA (omistajan iPad mykistetty; toistot A–F simulla ok).

## Kuitattu 182 myös (17.0x)
- **Euroopan loitonnus + houkuttimet** linssiseppa/eurooppa-loitonnus-182 **1c47a1e52** (⊃ 52d92cec2, 8ba7da773, 412672fc5, 8ca6f2c7f,
  e357dfd06, 74809bd71, 54cf34839, d271700cc), SHA Natiivisepällä. Loitonnus koko Eurooppaan (EurooppaLoitonnus.cs), huntu pysyy,
  rajat ohuina hunnun päällä; houkuttimet (Kartta/Houkuttimet.cs): violetti linssi (alpit, lontoo, edinburgh, istanbul, amsterdam,
  Andøya vapaa piste ISS-raketille), sininen (berliini, ateena, Olavinlinna vapaa piste), ydin 9 pt, hehku < 2×; pallot 84 → 52 pt
  Euroopassa ja kallistus poispäin houkuttimista. Yhdistys juna-182:een: Tyylikirja.* = junan versio, Kartta-testit/kaanna.sh molemmat
  (malli testihaarassa linssiseppa/testi-182-houkuttimet 4a075e90d, wt proto-linssiseppa-testi182h). Arkit
  lokit/todistus-houkuttimet-iphone-182d-20261011-1652/arkki-houkuttimet-iphone.jpg (+ ipad-182d-1654).
  Avoin (ei pyydetty): tavalliset himmeät pisteet jäävät iPhonella Italia–Balkan-alueella Kalusteet-laatikon (luult. Pulu.alue) alle.

## Lisäys 18.0x
- **Houkuttimet 182e KUITATTU** (PT 18.0x) linssiseppa/eurooppa-loitonnus-182 **0d83ffedb**: Berliinin ja Ateenan sininen houkutin pois
  (omistaja 17.1x: lautapeleihin ei värikorostusta), SHA Natiivisepällä. Testihaara linssiseppa/testi-182-houkuttimet-e 79e9a201f
  (wt proto-linssiseppa-testi182h). Kuva lokit/todistus-houkuttimet-iphone-182e-20261011-1751/kuvat/h2-eurooppa.png.
- **Pariisin aukiot 183** linssiseppa/aukiot-pariisi-183 **e5ce4097d** (⊃ cacc9ce4f; wt proto-linssiseppa-monumentit): Vendôme, Bastille,
  République, Saint-Michel AukionMonumentit-tauluun Karttasepän datasta (T7 _tyo/karttaseppa/kippi-pariisi-20261011/); Tertre pois (PT 17.4x).
  Kamera noudattaa workerin katse_suunta/katse_kaari (Bastille 0 ±20: Opéra Bastille ei näy) — tarkista että Pelikoodari vie ne workeriin.
  kamera_ehdotus (18–30 m) EI käytössä: silmä ≥ 65 m. Simu kun aukiot workerissa.

## Seuraavaksi (juna 183)
- **Stortorgetin ja Pariisin aukioiden kamera (PT 17.0x, juna 183)** Karttasepän datasta: Karttaseppä toimitti /Volumes/T7 4TB/koodaus/proto-3d/_tyo/karttaseppa/kippi-tukholma-20261011/
  kippi-aukiot-tukholma.json (+ LAHTEET.md). Pelikoodari lisää Stortorgetin (Q3048023) liiku-listaan ja esittely-v3c:hen;
  LS1 tarkistaa kameran (monumentti = kaivo Q10681422, rivi jo taulukossa) simulla pystykuvassa kun data workerissa.
  Sergels torg EI kierrokselle (PT). Pariisin aukiot (Concorde, Place des Vosges): tarkista samalla Karttasepän datasta, kun
  hän toimittaa (kysy polku); kamerasäännöt OpasKuvaus (aukiomonumentti 58 %, silmä ≥ 65 m, aukion puolelta).
- Kippijatkot luovutuksesta 20261011-paiva: (2) Quattro Canti oletuskorkeus 60 m, (3) kierto < 3 °/s kaukaisilla kehyksillä → kysy PT.
- Suojatarkastus (Karttaseppä, docs/raportit/kippi-suojatarkastus-20261011.md): A3-lista lokit/linssiseppa-kippi-omat-mallit-20261011.md;
  Eiffelin valot ok (ei omaa valoa/välkettä; maskissa 0 pikseliä). Notre-Damen CC BY-SA -johdannainen PT:llä.

## Worktreet ja siivous
- Proto: proto-linssiseppa-eurooppa (odottaa kuittausta), proto-linssiseppa-testi182h (testihaara, poista kuittauksen jälkeen),
  proto-linssiseppa-monumentit, -aloitusintro, -alkulento (kuitattu, poista kun junassa), proto-linssiseppa-leveat ja -testi182
  (vanhat, poista kun juna 182 TF:ssä). Matkakirja: /Users/Shared/Claude/wt/linssiseppa-tyylikirja-linssi (NUI:n PR #4409:ssä).
- App-kopiot lokit/linssiseppa-app: alkulento-182, aloitusintro-182, monumentit-182(c), houkuttimet-182(b/c), eurooppa-182 → poista
  kun juna 182 on TF:ssä.
