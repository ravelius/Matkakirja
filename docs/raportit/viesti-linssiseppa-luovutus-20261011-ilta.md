# Linssisepän luovutus 11.10.2026 ilta (päivitetty 12.10. 09.3x)

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

## SÄÄNTÖ 12.10. 11.1x (omistaja): omistajalle kuvat TÄYDELLÄ TARKKUUDELLA, yksittäin tai pari nykyinen | uusi natiivikorkeudella;
  ei pienennettyjä monen ruudun arkkeja (PT:lle saa arkin, täysikokoiset tehdään samalla). Kolmikko: scratchpad-skripti kolmikko.py
  (K = natiivikorkeus) tai kolme erillistä kuvaa.

## SÄÄNTÖ 12.10. 10.3x (omistaja, Raamattu ASEMATAULU: VAATII TOIMIA, PR #4489)
- Kun omistajan pitää toimia (lupaikkuna/vastaus LS1:n ikkunassa, kirjautuminen, ostos, vain hänen päätöksensä): heti Asemataululle
  ArtifactData set url https://claude.ai/artifact/Rq5ajPU4SraE2XKd7BYAix, kokoelma "talo", doc_id "toimi-linssiseppa",
  data {rooli: "Linssiseppä", kysymys: "<yksi rivi>", ts: <ms>}; epäonnistuessa Postivahdille "VAATII TOIMIA: Linssiseppä: <asia>".
  Hoidettu → get + delete if_version.

## Lisäys 12.10. 09.3x (184-pilotit; JULKAISU VASTA OMISTAJAN PYYNNÖSTÄ)
- **Lähestyminen → 184** (PT 07.5x): proto linssiseppa/museo-lahestyminen-183 (wt proto-linssiseppa-lahestyminen) **52ad8fedd**
  (⊃ 95% -portti cf32bd1b6, QA "museo lahestyminen odotus <s>" 98d11e333, lataus lokiin/s, pelin kartta pois Googlen kuvasta).
  EI 183:een. Kylmä Amsterdam simulla 95 % vasta 25–60 s:ssa → 184:n RAKENNE: lento alkaa korkealta ja laskeutuu laattojen tahdissa
  (latausaika lennon sisällä, ei esilatausta valikossa = ei lisämuistia; PT hyväksyi). Esikatselu (toinen käynti) PT:llä:
  lokit/esikatselu-lahestyminen-184/puhdas/. AVOIN: pienet vaaleat raidalliset laatat leijuvat julkisivun edessä (myös Pariisin
  oppaassa Louvren pihalla) — EI puut, EI nostot; piirtyy kalvon (Overlay) päälle → UI tai erillinen kamera; selvitä.
  Ketjut/skenaariot: tyokalut/linssiseppa-ajot/ketju-esikatselu2-184.zsh, sk-esikatselu-{iphone,ipad}.txt (kuormaportti load < 40).
- **Katso ja löydä 184** linssiseppa/katso-loyda-184 **9612b59f0** (köysi ei peitä kohdetta: kori kääntyy vain pelaajan vedosta).
  Skenaario sk-katso-184.txt korjattu (tehtävä Louvressa); uusinta ajamatta.
- **Taidehalli v3/v4 (museopilotti)**: Blender-kuvasarja _valmiit/taidemuseo-alankomaat-v3/esikatselu/v3/vertailu-kg-yovartio.png
  (EI omistajalle, PT 09.1x: vain pelikuvat). Agentti tekee v4: värit valokuvasta (≤ 10 %/kanava), muisti lod0 ≤ 25 / lod1 ≤ 10 Mt,
  paketti taidemuseo/alankomaat/sali-v4/ (+ simun JPEG-vara). Unity: linssiseppa/museo-sali3-184 (wt proto-linssiseppa-sali3,
  pohja museo-elama-184 68e7c5da6) **a0aaf4bd7** kehityslippu "museo sali uusi|vanha|lippu". Toinen agentti: teoskuvien kaukokarsinta
  samassa puussa. NS budjetti: museoajon huippu ≤ 2,57 Gt (nyt 2671/2700). Sitten vienti Julkaisijalla, iPad-ajo, NYT|UUSI|OIKEA pelistä.

## Lisäys 12.10. 02.0x (juna 183)
- **KIPPI-183 LOPULLINEN** linssiseppa/kippi-183 **f6e438497** (juna-183 493efdebe + ikkunat-183 + kippi-katse-183 + kippi-autot-183 +
  kippi-vali-183), SHA NS:llä ja PT:llä (PT kuittasi sisällön A–E). Linssit 1479, Kartta 481, Peli 529, tarkista 0; ajo testi-183-ls1d.
  Sisältö: ikkunaerä (✕ yläpuolelle, näppäimistönosto, laajenna-väkäset, asetus "Sulje napauttamalla karttaa"), minihampurilainen
  (Auto + Nostojen ohjaus kytkinriveinä, oletus pois, valikko ylöspäin puolikkaassa), A katse joka suuntaan peilikuvana (KoriKatseVeto),
  B kompassi v3 (_valmiit/ilmapallo-v1/pallokompassi-v3, ämpärissä v3), C köydet kantorenkaaseen + ydin, D autot + pisaravarjo (agentti),
  E OpasValys (korkeusnäytteet, agentti), vapaan lennon esityskorjaus 574bb5c31.
- **Aukiot 183** f170db3e1 KUITATTU ja NS:llä. **Puut-portti** 6323b5204 KUITATTU (junassa 867ff6b8f); tarkkuuskorjaus **ba5edb2db**
  KUITATTU 02.1x (NS:n Tuileries-kuvapari lokit/todistus-puut-1-b-20261012-0158) ja NS:llä. kippi-183 f6e438497 KUITATTU ja NS:llä.
- Vedokset: lokit/linssiseppa-vedokset-kippi-183/, lokit/linssiseppa-vedokset-minihampurilainen-183/, lokit/linssiseppa-vedokset-auto-183/.
- Worktreet: wt/proto-linssiseppa-{monumentit,ikkunat,autot,vali,puut}; poista kun juna 183 TF:ssä.

## Lisäys 18.0x
- **Houkuttimet 182e KUITATTU** (PT 18.0x) linssiseppa/eurooppa-loitonnus-182 **0d83ffedb**: Berliinin ja Ateenan sininen houkutin pois
  (omistaja 17.1x: lautapeleihin ei värikorostusta), SHA Natiivisepällä. Testihaara linssiseppa/testi-182-houkuttimet-e 79e9a201f
  (wt proto-linssiseppa-testi182h). Kuva lokit/todistus-houkuttimet-iphone-182e-20261011-1751/kuvat/h2-eurooppa.png.
- **Pulu 182 KUITATTU** (PT 18.1x) linssiseppa/pulu-vaisto-182 **e4050506a** (wt proto-linssiseppa-testi182h): Pulun väistö vertaa
  linnun laatikkoa (kosketus 62 × 82 pt), ei koko kuplatilaa — Euroopan näkymässä Pariisin pallo nosti Pulun kartan keskelle
  (omistaja 17.5x). SHA Natiivisepällä. Kuvat lokit/todistus-pulu-iphone-182f-20261011-1804/kuvat/.
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
