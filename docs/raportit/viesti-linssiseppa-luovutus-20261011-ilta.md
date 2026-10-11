# Linssisepän luovutus 11.10.2026 ilta (16.4x, nollaus PT:n pyynnöstä)

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

## Odottaa PT:n kuittausta (junan 182 ehto)
- **Euroopan loitonnus + houkuttimet** linssiseppa/eurooppa-loitonnus-182 **8ba7da773** (wt proto-linssiseppa-eurooppa):
  loitonnus koko Eurooppaan (EurooppaLoitonnus.cs), huntu pysyy, rajat ohuina hunnun päällä, himmeät pisteet; houkuttimet
  (Kartta/Houkuttimet.cs): violetti linssi (alpit, lontoo, edinburgh, istanbul, amsterdam, Andøya vapaa piste ISS-raketille),
  sininen (berliini, ateena, Olavinlinna vapaa piste); pisteet eivät kasva loitonnettaessa (omistaja 16.0x). Sisältää
  54cf34839 = NUI:n videopeli-tokenit (cherry-pick e6ac80acb:stä). Tyylikirjan linssi-hehku (#b57bff) web-haarassa
  linssiseppa-tyylikirja-linssi e9ee7e291 → NUI:n tyylikirja-PR #4409. Arkki rungon päältä (testihaara
  linssiseppa/testi-182-houkuttimet 4cd085e69 = juna-182 + tämä, wt proto-linssiseppa-testi182h; ristiriidat Tyylikirja.* =
  junan versio, Kartta-testit/kaanna.sh molemmat): lokit/todistus-houkuttimet-{iphone,ipad}-182b-20261011-162x/arkki-*.jpg.
  Avoimet: pisteet Euroopassa ~6 px iPadilla (PT/omistaja voi pyytää isommiksi: yksi luku); tavalliset himmeät pisteet jäävät
  iPhonella Italia–Balkan-alueella Kalusteet-laatikon (luult. Pulu.alue) alle – loki listaa laatikot.
  Kun kuitattu: SHA Natiivisepälle (yhdistettäessä samat ristiriidat kuin testihaarassa).

## Seuraavaksi (juna 183)
- **Stortorgetin kamera**: Karttaseppä toimitti /Volumes/T7 4TB/koodaus/proto-3d/_tyo/karttaseppa/kippi-tukholma-20261011/
  kippi-aukiot-tukholma.json (+ LAHTEET.md). Pelikoodari lisää Stortorgetin (Q3048023) liiku-listaan ja esittely-v3c:hen;
  LS1 tarkistaa kameran (monumentti = kaivo Q10681422, rivi jo taulukossa) simulla pystykuvassa kun data workerissa.
  Sergels torg EI kierrokselle (PT).
- Kippijatkot luovutuksesta 20261011-paiva: (2) Quattro Canti oletuskorkeus 60 m, (3) kierto < 3 °/s kaukaisilla kehyksillä → kysy PT.
- Suojatarkastus (Karttaseppä, docs/raportit/kippi-suojatarkastus-20261011.md): A3-lista lokit/linssiseppa-kippi-omat-mallit-20261011.md;
  Eiffelin valot ok (ei omaa valoa/välkettä; maskissa 0 pikseliä). Notre-Damen CC BY-SA -johdannainen PT:llä.

## Worktreet ja siivous
- Proto: proto-linssiseppa-eurooppa (odottaa kuittausta), proto-linssiseppa-testi182h (testihaara, poista kuittauksen jälkeen),
  proto-linssiseppa-monumentit, -aloitusintro, -alkulento (kuitattu, poista kun junassa), proto-linssiseppa-leveat ja -testi182
  (vanhat, poista kun juna 182 TF:ssä). Matkakirja: /Users/Shared/Claude/wt/linssiseppa-tyylikirja-linssi (NUI:n PR #4409:ssä).
- App-kopiot lokit/linssiseppa-app: alkulento-182, aloitusintro-182, monumentit-182(c), houkuttimet-182(b/c), eurooppa-182 → poista
  kun juna 182 on TF:ssä.
