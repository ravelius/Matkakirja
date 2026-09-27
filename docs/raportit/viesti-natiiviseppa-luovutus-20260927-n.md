# Natiivisepän luovutus 27.9.2026 (n), klo 20.3x

Luovuttaja: Natiiviseppä (Opus 5.5, Macin käyttäjä koodaus). Syy: konteksti 70 % (Fablen pyyntö). Edellinen: -tilinvaihto.md.

## Tila

- **BUILD 29b** = master 20ce6a28 = TF 1.0.29 (202609270957; puhevirta oletus pois). **BUILD 30** = 7b8a12c0 = TF 1.0.30.
  **BUILD 31** = a7a6d9ec (juna 8096bae5) = TF 1.0.31 (202609271444). **BUILD 32** = master **21f09914** (juna 4be1a696, käännös
  34963081, Laitetestaaja PASS fd882b2eb 7/7) → **TF 1.0.32 -vienti alkoi 20.31** (ajo 36337231338, CFBundleVersion 202609271721).
  Tagit build29-juna, build29b, build30-juna, build31-juna, build32-juna. EI mergeä masteriin ennen Julkaisijan "vienti valmis".
- `juna/b13` = **4be1a696** (= BUILD 32:n sisältö). 1.0.33-juna avataan siitä: mergeä ensin master 21f09914 junaan
  (`tyokalut/juna-merge.sh master juna/b13`) kun vienti on valmis.
- **Build-junan tauko PURETTU** 18.1x (Fablen lupa): juna-vahti kääntää 10 min niputuksella Laitetestaajan simulaattoreihin.
  Yöllä Karttasepän poltto täysillä ytimillä klo 23 alkaen → käännökset erinä, ei koekäännöksiä polton aikana.

## 1.0.32:ssa tehdyt omat erät

- **natiiviseppa/pohja-z10** c48512b5: pohjan maximumLevel 10; `Kartta/KaupunkiRasteri.cs` lukee offline.jsonin
  `lahteet.rasteri.kaupunkiRasteri` + `maat.*.kaupunkiRasteri["10"]` (13 829 laattaa); Laattapalvelin tekee puuttuvan Z10:n
  Z9-vanhemman neljänneksestä pääsäikeessä (Suurenna(6)/kehys), esilataukselle virhe (ei varalaattaa). Lippu matkakirja-pohja-z10 0.
- **natiiviseppa/pohja-savy** 65f2569a: `_pohjaSavy` tee_tileset.py:n RadioHamara-alussa (kontrasti paperin sävyn 0,78 ympäri +
  mustan nosto), `Kartta/Pohjasavy.cs` (PlayerPrefs, komento `pohja savy k n`); säätimet Natiivi-UI 5bcbc178.
- **natiiviseppa/vakio-sse** d876198e: pohja-SSE 20 Rakennuksessa, ei liikkeen varjokameraa (omistajan tarkentumislöydös).
  Lippu matkakirja-vakio-sse 0 = vanha 16/32. Mittaus iPad Pro 13: lokit/tarkennus-ab-ipad13/yhteenveto.txt; video
  lokit/tarkennus-A1/video-pari.mp4. iPhone-mittaus puuttuu (ei ollut kytkettynä).
- **natiiviseppa/offline-media** cf36d11a: Mukana.Polku → offline-kansio (Kuvat/Aanet/Puhe äänitteet ilman verkkoa);
  Alueet lataa `mediaKuvat` [{url, pieni?}] (pieni → tallennus url:n polulle), `kaupunkiMaasto` (11–12), skeema 1.54
  `lahteet.mediaKuvat.korvaaMedian` (media-listaa ei ladata), koko `tavuja.offline` (varalla yht + kaupunkiMaasto + kaupunkiRasteri
  + mediaKuvat); maasto gzipattuna levylle (Laattapalvelin.Pakkaa/Pura). Sim: MLT/maailma-lataus 6 697 .terrain kaikki 1F8B.
  HUOM testiin: portissa/aloitusnäytössä Alueet lataa 2 rinnakkain (hidas) → testaa kartalta.
- natiiviseppa/lippu-suunta 88362285 (1.0.30), lento-v3 9d318451 (1.0.30), maakuntanimet-pois 11a022dc (1.0.30),
  puhevirta-pois 49ea64ee (29b).

## Siirtosepän skeemat (kuitattu)

#3395 (1.51 kaupunkiRasteri, tuotannossa), #3432 (1.52 mediaKuvat, 4 merentakaista aluetta, tavuja.levy), #3445 (1.53 maasto z≤10
+ kaupunkiMaasto; 1.54 korvaaMedian + tavuja.offline, pienet 1024 px/JPEG 75, puheet vain puhekokoelmista, katto 100 Mt/maa),
#3479 (1.55 maakuntasalaisuudet pois; vanhat buildit kestävät, natiiviin ei tarvita muutosta) — julkaistaan #3475:n kanssa.
Kun Siirtoseppä ilmoittaa 1.52–1.55 tuotannossa: todenna maan lataus kartalta + lentotila (kuvat, puheet, maasto gz) ja ettei
Kreikan kohteita näy kahdesti.

## Jono (1.0.33, Fablen käsky 20.3x)

1. Mergeä master 21f09914 junaan TF-viennin jälkeen.
2. Natiivi-UI: salaisuudet pois e736abc4, raha "400 £" cdb455d2, saavutettavuus-silta b0a6d307 (merge-pyynnöt tulossa).
3. Linssiseppä: erikoismallit erä 4 fac195c0 (meren korjaukset 01997eca ovat jo BUILD 32:ssa).
4. gzip-maaston ja mediaKuvien todennus Siirtosepän kanssa (yllä).
5. 120 Hz -laitemittaus (Natiivi-UI:n vieritys-2, ehdot: ProMotion, kartta peitossa, lämpö normaali).
6. Siivous: NostoLaji.Salaisuus + MaakunnanSalaisuus käyttämättömiä (1.55:n jälkeen).

## Käytännöt ja työkalut

- Skriptit proto-3d/lokit/natiiviseppa-skriptit/sessio-m/: savuke.sh, lippukuvat.sh, lentov3.sh, maakuntanimet.sh,
  valintapisteet.sh, pohjaz10.sh, pohjasavy.sh, tarkennus-video.sh, tarkennus-ab.sh (iPad Pro 13, devicectl), offline-gzip.sh.
- Oma simulaattori vain FBBD41D7. Laitteet: iPad Pro 13 00008103-001819421413401E (laite-release.sh pääprojektissa:
  `git checkout --detach juna/b13` → laite-release.sh → `git checkout -- . && git checkout master`).
- Levy: omistajan skripti proto-3d/tyokalut/vapauta-levy-natiiviseppa-20260927b.sh --aja (koeajo 10,7 Gt; luokitin estää oman
  rm -rf:n). Worktreet: vain wt/proto-natiiviseppa-juna ja -offline-media (katto 3).
- Viestit Fablelle: vain valmis erä, jumi tai kysymys, enintään 8 riviä.
