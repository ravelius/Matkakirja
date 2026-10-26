# Laattojen esilataus, erä 2: kohdekaupungit (Natiiviseppä-apuagentti 26.9.2026)

Haara `natiiviseppa/laatta-esilataus-2` (pohja master 31fd6d5f = build 25), worktree
/Users/Shared/Claude/wt/proto-natiiviseppa-laattaera2. Commitit: **ddb424df** (toteutus + testit), **c3ffd4ac**
(ennakointi ohittaa oman maan kaupungit). EI käännetty eikä ajettu laitteella/simulaattorissa (ei Unityä) —
kaikki alla oleva ajonaikainen käytös on TODENTAMATTA, kunnes Natiiviseppä kääntää haaran.

Mittaukset: simulaattori 1572C658 (iPhone 18 Pro, app ≈ build 25; 18.57 junan asennus, vain Pulu.cs), kylmä välimuisti
(vanha siirretty talteen, ei poistettu). Kansio `lokit/laatta-esilataus/era2/` (skriptit, konsolit, pyyntölokit, kuvat).

## 1. Mitoitus (pyyntöloki, ei arvausmallia)

Matkat: Ateenasta on lento vain Roomaan ja Lontoosta Madridiin/Berliiniin/Tukholmaan, joten Pariisi ja Amsterdam mitattiin
Lontoosta maitse/meritse (saapuminen on sama PeliOhjain.Saavu → maan saapumisnäkymä kaikilla kulkutavoilla).

| matka | saapumisnäkymä | Cesiumin pyynnöt ikkunassa (z ≥ 6, ≤ 12° kohteesta) |
|---|---|---|
| Ateena → Rooma, lento | ITA (42,41, 12,48), 1 526 km | pohja Z6 6 / Z7 20 / Z8 82 / Z9 11 · maasto Z6 12 / Z7 68 (1,0 Mt) / Z8–Z12 50 (1,2 Mt, lennon kaupunkipisteen korkeuskyselyt) · kerma Z6 20 / Z7 40 / Z8 83 — **392 laattaa, 4,1 Mt** |
| Lontoo → Pariisi, bussi | FRA (46,74, 2,35), 1 425 km | pohja Z6 4 / Z7 32 / Z8 64 · maasto Z6 14 / Z7 71 · kerma Z6 22 / Z7 42 / Z8 64 — **313, 2,0 Mt** |
| Lontoo → Amsterdam, laiva | NLD (52,25, 4,88), 404 km | pohja Z6 14 / Z7 35 / Z8 21 / Z9 36 · maasto Z6 44 / Z7 22 / Z8 40 / Z9 74 · kerma Z6 10 / Z7 22 / Z8 21 — **339, 1,6 Mt** |

Kaikki ikkunan pyynnöt: Rooma 700 eri laattaa (555 verkosta), Pariisi 871 (580), Amsterdam 656 (412); lisäksi kermahunnun
Z2–Z5 koko maailmalta (~200 tyhjää ~300 t:n webp:tä, _maailma-sarja) ja vektorit/rajat 5–12 tiedostoa (30–60 kt).
Mitattu joukko on ALARAJA: Cesium ei pyydä muistissa jo olevia laattoja (Pariisin näkymän pohjoisosa oli Lontoon näkymästä muistissa).

Tulos (Kartta/SaapumisLaatat.cs): näkymän päätaso = round(log2(K / h km)), rasterit K = 285 000 (vain 276–292 k täsmää kaikkiin
kolmeen), maasto K = 200 000 (146–258 k); alue = kameran kuvan maanpinta suoraan alas (FOV 50° pysty, kuvasuhde, pallo), +1
laattarengas, päätaso + 2 esivanhempaa, alin Z6 (Z0–Z5 paketissa). Ennuste per kaupunki:

| kaupunki | ennuste | kattaa mitatusta (laatat / tavut) | ennusteesta mitatussa |
|---|---|---|---|
| Rooma | 548 laattaa ≈ 4,5 Mt | 78 % / 61 % (puuttuvat: kaupunkipisteen maasto Z8–Z12 1,2 Mt) | 55 % |
| Pariisi | 628 ≈ 4,6 Mt | 97 % / 96 % | 49 % |
| Amsterdam | 400 ≈ 1,7 Mt | 72 % / 52 % (puuttuvat: siirron kameran laajat Z6–Z7) | 61 % |

Päätaso (pohja Z8/Z9, maasto Z7/Z9, kerma Z8): Pariisi ja Amsterdam 100 %, Rooma 90–91 % (Rooman mitattu Z8 ulottui lon 5,6–19,7°, kuvaa leveämmälle: saapumisajo lennon loppunäkymästä). Kaupunkipisteen maasto Z9–Z12 (lennon LennonPohja-korkeuskyselyt) haetaan jo lennon
alussa näkyvässä jonossa, joten sitä ei esiladata.

## 2. Toteutus

- `Kartta/SaapumisLaatat.cs` (puhdas): Alue, Taso, Mercator (XYZ), Maantieteellinen (TMS 2×1), Tasot, Avain; karkein taso ja
  keskipiste ensin, pituus kiertyy.
- `Laattapalvelin`: `Esilataus.Tausta` → oma `taustaJono`, palvellaan vain kun näkyvä jono, kiirejono ja esilatausjono ovat tyhjiä,
  kiirehakuja ei ole käynnissä, ei verhoa, ja enintään `TaustaPaikat` = 4 kerrallaan (näkyvälle jää ≥ 8). Perutut tyhjennetään
  jonon alusta joka kehys. `Kiireinen` ei laske taustan hakuja. `JonoTila` (valmius-rivit): `tausta N`, `taustajono N`.
- `KarttaKerrokset.EsilataaSaapumisalue(kaupunki, maa, lat, lon, taso, linssi)`: näkymä PalloKierto.SaapumisNakyma(maa, lat, lon,
  maaRajaus: true) (sama kuin PeliOhjain.Saavu), pohja + maasto (saatavuus layer.jsonista) → kerma (maan laatat.json ensin
  taustajonosta, sama VariAlue kuin Varitaso) → reliefi. Esilataaja.Tehtava(taso, laatta: true, peruttu). Lokiin
  `MATKAKIRJA saapumislaatat: …` alku ja `valmis|peruttu v/n`, pyyntölokiin `# t saapumislaatat <kaupunki> alkaa|valmis`.
  Kehittäjälippu `matkakirja-saapumislaatat` 0 = pois (A/B; App Storessa aina päällä).
- `Scripts/Kartta/SaapumisLaatatSilta.cs` (Assembly-CSharp, ei muutoksia Pelikoodarin/Natiivi-UI:n tiedostoihin): kytkeytyy
  PeliOhjain.Instanssiin (odottaa sen syntyä). SaapuminenTiedossa → SeuraavaRuutu + linssi, perii ennakoinnit ja edellisen matkan;
  KaupunkiEnnakoitu → Kohdekaupungit (oman maan kaupungit ja sama näkymä ohitetaan, enintään 3 ulkomaista näkymää); MatkaPerilla →
  kaikki perutaan (perillä Cesium hakee itse; loput olisivat tuplahakuja). Aloituslento ohitetaan (erä 1 hoitaa).

Satelliittilinssin musta: mitattu 1 799 / 1 779 / 1 799 / 1 780 / 1 778 ms ja KYLMÄNÄ (ei joutilasta, tyhjä välimuisti, 76 reliefilaattaa
verkosta, hitain 107 ms) 1 794 ms. 1,8 s on `AstronauttiLinssi.PaljastuksenMinimiMs = 1800` (webin minimi), EI latausodotus: esilataus
ei voi lyhentää sitä. Laatat ovat silti ennustettavissa (sama paikka ±55°, koko pallon korkeus), joten avausnäkymän reliefi
(≤ 150 laattaa, kylmänä ≈ 1,2 Mt, Z0–Z3 ≈ 0,6 Mt maailmanlaajuisia) lisättiin matkan kohteen erään viimeiseksi: suojaa vain
hitaalla verkolla minimin ylitykseltä. Ennakointiin ei lisätty (datamäärä).

## 3. Tarkistukset (ajettu)

- `Peli-testit/unity-tarkistus.sh`: 0 virhettä (varoitukset 2/3 olemassa olleita: Kuvat.cs, Pistenaytto.cs, Matkalaukku.cs).
- `Kartta-testit/kaanna.sh`: 288/288 (uusi SaapumisLaatatTestit 6/6: päätasot mitatuille korkeuksille, mitatut laatat ennusteessa,
  määrät = Python-mitoitus, järjestys, pituuden kierto, avain). `Peli-testit/kaanna.sh`: 321/321.

## 4. Todennettavaa käännöksen jälkeen (Natiiviseppä)

Skripti `era2/todennus.sh <kansio> <0|1> [odota_s=45]` (sim 1572C658; asettaa lipun `simctl spawn defaults write`illa, kylmä
välimuisti talteen, Lontoo → joutilas → odota → laiva Amsterdamiin → traileri ohitetaan 1 s:ssa → kuvat → palvelin, RAJA,
satelliittilinssi → `analyysi.txt` ja `yhteenveto.txt`).

ENNEN-perustaso ajettu nykyisellä buildilla (`era2/ennen-b25`, lippu 0 = ei vaikutusta vanhassa buildissa): saapumisikkunassa
475 eri laattaa, **273 verkosta**; RAJA saapuminen PASS 0 ms; musta 1 778 ms; kuvissa 1,3 s saapumisesta pohja karkea ja huntu
puuttuu, 2,7 s:ssa huntu paikallaan (arkki `ennen-b25/arkki-ennen.jpg`).

Todennettavat (lippu 0 vs 1, sama skripti):
1. Lokissa joutilaana `saapumislaatat: pariisi (FRA, Kohdekaupungit)` ja `amsterdam (NLD, …)` ja `valmis v/n` ennen matkaa; ei
   `edinburgh`-riviä (oma maa).
2. Saapumisikkunan "verkosta"-sarake: Amsterdamin pohja Z7–Z9, maasto Z7–Z9, kerma Z6–Z8 lähes 0 (loput valimuisti); kokonaisuus
   273 → odotus ≲ 100 (jäljelle siirron laajat Z6 ja kerman maailmanlaatat).
3. Kuvat 1–3 s saapumisesta (traileri ohitettu): ei karkeaa pohjaa eikä myöhästyvää huntua; lisäksi saapuminen ILMAN traileria
   (toinen käynti) — traileri peittää latauksen ensimmäisellä käynnillä.
4. Näkyvä jono ei hidastu: `VARTIJA 163b` 0 kummassakin; valmius-riveillä `tausta` > 0 vain kun `jono 0 kiire 0`; aloitusverhon
   aika ennallaan (verhon aikana tausta seis); RAJA saapuminen PASS; `palvelin`-rivin verkko-/välimuistimäärät.
5. Peruutus: `todennus.sh … 1 0` (matka heti joutilaan jälkeen) → ennakoinnit `peruttu`, matkan erä alkaa (SeuraavaRuutu), ja
   saapuessa `peruttu` (MatkaPerilla). Kohteen vaihto kesken: toinen matka ennen valmistumista → edellinen `peruttu`.
6. Satelliittilinssi saapumisen jälkeen: musta ≈ 1,8 s (minimi), ei pidempi.
7. iPad (eri kuvasuhde ja pikselikorkeus): päätaso voi olla +1 (Cesiumin SSE pikseleinä) — tarkista pyyntölokista, että päätaso osuu.

## 5. Riskit

- Malli on kalibroitu kolmella näkymällä yhdellä iPhonella; iPadilla ja hyvin korkeilla/matalilla näkymillä (SWE/NOR, MLT/LUX) mittaamatta.
- Datamäärä: 1,7–4,6 Mt per ulkomainen näkymä, ennakointi enintään 3 näkymää per joutilas (≤ ~14 Mt kerran; välimuistin katto
  600 Mt). Ennusteesta ~40–50 % ei näkynyt pyynnöissä (osin Cesiumin muistissa, osin reunaa) = mahdollista ylihakua.
- Lyhyet matkat (lento 1,5 s, bussi 4 s) ja näkyvä jono kiireinen koko matkan: matkan alun erä ehtii vähän; hyöty tulee ennakoinnista.
  Lentokohteita PeliOhjain ei ennakoi (NopanPaassa = maa/meri/bussi) → ehdotus Pelikoodarille: lentokohteet KaupunkiEnnakoitu-listaan.
- Taustajono odottaa, kunnes esilatausjono on tyhjä: pitkäikäinen esilatausjono (esim. aloitusnäytön lista) viivästää sitä.
- Kerman VariAlue rekisteröidään jo ennen saapumista (sama kuin Varitaso tekee saapuessa); jos Varitason sääntö muuttuu, pidettävä synkassa.
- Laitteella hitaampi verkko: 4 taustapaikkaa ≈ 20 laattaa/s simulaattorissa; laitteella todennettava.

## 6. Muuta havaittua

- `defaults write <kontti>/Library/Preferences/…` EI tartu käynnissä olevaan simulaattoriin; pyyntöloki päälle Documents/pyyntoloki.txt
  -tiedostolla tai `xcrun simctl spawn <UDID> defaults write …`.
- Simulaattoriin 1572C658 jäi: Documents/pyyntoloki.txt (pyyntöloki päällä), lippu `matkakirja-saapumislaatat` = 1 (oletus), ja
  Library/Caches/laatat-talteen-* (6 kansiota, ~150 Mt, siirretyt kylmät välimuistit) — ei poistettu (pysyvät poistot omistajalle).
- Reliefi Z0–Z3 (~0,6 Mt, paikasta riippumaton) sopisi laattapakettiin → astronautin kameran avaus ilman verkkoa.
