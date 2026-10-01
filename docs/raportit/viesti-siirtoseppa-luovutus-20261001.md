# Siirtosepän luovutus 1.10.2026 klo 16.3x (Opus 5.5) — päivitys

## JONON KÄRKI

1. **Ensilataus v2, viimeinen vaihe (Päätoimittaja: "ei yhtään runtime-pakkausta linnassa", mittari ruudut > 50 ms
   ennen/jälkeen):** natiivi valmis haarassa `siirtoseppa/linna-vesi` **5238055d** (proto-worktree
   /Users/Shared/Claude/wt/proto-siirtoseppa-vesi). Odottaa Linnanrakentajan kuori v23 -pakettia, jossa
   `ulkokuori.detalji.kanavat[].{diff_astc,nor_astc,keski}` ja `ymparisto.maasto.kerrokset[].{diff_astc,nor_astc,keski}`
   (hash ~18.30–19 Päätoimittajan kuittauksen jälkeen). Sitten: Julkaisija järjestää iPadin → Natiiviseppä asentaa
   Development 5238055d → `HASH=<v23> KYNNYS=50 ajo-ipad-ensilataus.sh siirtoseppa-ipad-dev50-jalkeen 2`.
   ENNEN (4014, sama käännös): linnan jälkeen > 50 ms 11/11, > 100 ms 6/5, suurin 208/192 ms
   (lokit/siirtoseppa-ipad-dev50-ennen). Jos jälkeen ≤ ~100 ms kaikki: merge-pyyntö Natiivisepälle (linna-vesi
   894d16a4 → 5238055d: ensilataus v2, DioraamaLuvut, ASTC-lukijat), + paketin kuittaus TF 98+ ja osoitin.
2. **Linnan osoitin = 4014a5746df3838c** (täysi puhepaketti, PR #3785 rakenna.mjs kerää puheet), vaihdettu 12.57,
   todennettu tuotannosta TF 98:lla (lokit/siirtoseppa-osoitin-4014), kertojan puheet soivat.

## Tämän päivän tulokset (1.10.)

- Puukortit v3: paketti 136f kuitattu ja osoitin; natiivin lukija 4fe3094a junassa 93.
- Linnan puheet: kertojan jakson kesto ≥ puhe + 0,5 s ja https-peilin äänet juuresta (linna-puheet 2ebe8493, juna 94).
- Ensilataus v2 (linna-vesi): e03887a2 ruutujako + renderöijä päälle valmiina + puiden häivytys + puhelimen
  kuori-4k (ylin mip ohi); d3c2a49b GPU-loki ruutunumerolla; f01a3e39 DioraamaLuvut (puut.json/aluskasvit ilman
  MiniJsonia); 93b246e1/d1d7e6b1 ASTC-lukija (puukortit, normaali, horisontti, taivas, aluskasvit); 5238055d detalji
  + maanpinta ASTC + esikatselu kevyen ASTC-ortosta. iPad-tulokset lokit/siirtoseppa-ipad-*.
- Juurisyyt iPad Developmentilla: LoadImage-purku + pakkaamaton GPU-lähetys (puut) ja Texture2D.Compress, joka
  odottaa grafiikkasäiettä 100–170 ms 8k-latausten aikana (detalji, maanpinta).
- Skriptit (proto-3d/tyokalut/siirtoseppa-ajot/): ajo-ipad-ensilataus.sh (HASH, KYNNYS), ajo-ensilataus-piikit.sh,
  ajo-ensilataus-abab.sh, ajo-ymparisto-kuittaus.sh (+ puheet/404-rivit), ajo-tuotanto-osoitin.sh; kaikissa
  APP-tarkistus (juna-.appit poistuvat lokeista: käytä uusinta juna-1.1.NN-*).

## Tila yhdellä silmäyksellä

- **Juna 1.1 (87, TF)**: Boat Attack -järvi + taivaskupoli + ympäristölataaja (linna-vesi 4316a3c1). BUILD 87 = b4435d40 PASS.
- **Juna 1.1 (90, sivuhaara natiiviseppa/juna-1090 12baf580)**: aluskasvit (Linssiseppä 2, 3b853a78) + ympäristöpaketin
  1.10.-muoto (3a28322a: puukortit = png + puukortit_tiedot = json, aluskasvit.atlas png + kortit json, orto .astcm).
- **Osoitin** yhä 65e2535be38cc19d. Kuitattu puhtaalla asennuksella: v17 ad021da8b8e1a93e, v18 98691896e7bf76b8
  (omistajan lupa Julkaisijalla). Päätoimittaja: osoitin ympäristöpakettiin vasta kun 3a28322a on TF 90:ssä, sitten
  kuitataan silloisen mainin kärjen paketti (v19 + v3c + puukortit todennäköisesti).
- **Juna 1.1 (90) = 27c449e4** (sis. 3a28322a + aluskasvit), savuke PASS.
- **19f1ff3246be7386 (v18 + lähimaasto v3c) KUITATTU** juna 90 .appilla (lokit/siirtoseppa-ymparisto-kuittaus-90/):
  maasto 4 lohkoa, splat, 25k puuta, 20k aluskasvia, aitat maalla, virheitä 0. Osoitin vasta TF 90 julki + omistajan lupa.
- **OSOITINKOHDE 02987940f6567fd2 (v19 + v3c + taivas) KUITATTU 06.04** juna 90 .appilla (lokit/siirtoseppa-v19-kuittaus/),
  virheitä 0. Osoitin vaihtuu, kun TF 90 julki + omistajan lupa (Julkaisija). Uusien pakettien kuittaus samalla kaavalla:
  `HASH=<hash> APP=/Users/Shared/Claude/proto-3d/lokit/juna-1.1.90-27c449e4/Matkakirja3D.app L=…/siirtoseppa-v19-kuittaus
  zsh /Users/Shared/Claude/proto-3d/tyokalut/siirtoseppa-ajot/ajo-ymparisto-kuittaus.sh` → tarkista M4 (puulaituri vesiportilla, ponttonisilta poissa), M0 (taivas-
  kuva, ei liukuväri), M1/M2 (aitat maalla), virheitä 0. Puukortit #3763 pidossa.

- **Osoitin 02987940f6567fd2** vaihdettu 07.29, todennettu TF 91:llä ämpäristä (lokit/siirtoseppa-osoitin-02987940).
- **Juna 1.1 (92) = juna/b13 b24c0702**: nopea ensilataus (linna-vesi 894d16a4): ympäristö odottaa kuoren kevyen,
  kevyt maasto ensin, puhelimessa 4k-orto. Mittaus maasto 23,1 → 10,8 s (lokit/siirtoseppa-ensilataus2-*).

## Proto-worktreet ja haarat

- `/Users/Shared/Claude/wt/proto-siirtoseppa-vesi`, haara `siirtoseppa/linna-vesi` (kärki 3a28322a). Kaikki junissa 87/90.
- `/Users/Shared/Claude/wt/proto-siirtoseppa-kertoja`, haara `siirtoseppa/linna-kertoja` (cf22b4e9, kaikki junassa 85).
  Voi poistaa, kun 90 on mainissa.

## Tärkeät koodit (linna-vesi)

- `Linssit/Unity/DioraamaYmparisto.cs`: järvi (Boat Attack -porttaus, planaariheijastus SubmitRenderRequestilla),
  taivaskupoli (liukuväri / equirect `taivas`, suunta 270 = u0 länsi), maasto KAIKISTA mesh-solmuista (juurisyy
  1.10.: vain 1/4 lohkoa), splat (`maasto`-lohko), puut, horisontti, syvyyskartta.
- Varjostimet `Resources/Varjostimet/DioraamaVesi|Maasto|Puu|Taivas.shader`, `Resources/Dioraama/VesiPinta.bytes`
  (Boat Attack WaterSurface_single, Unity Companion License).
- Kehittäjä: `poikki kamera <atsimuutti> <korkeus> <etäisyys> [fov] [x y z]` (kohde dioraaman koordinaateissa:
  z = −Blender y), `poikki vesi [heijastus 0|1|auto | siirto <m>]`, `poikki aluskasvit 0|1|osat|lajit`.

## Skriptit: /Users/Shared/Claude/proto-3d/tyokalut/siirtoseppa-ajot/

- `ajo-ymparisto-kuittaus.sh` (HASH=… APP=… L=…): puhdas asennus https-paketista, kulmat taivas, aitat viisto,
  vesi −20 m (todistaa maan), aurinkoon, vesiportti/laituri (v19), laituri-tila; virhelaskenta ilman ääniä.
- `ajo-v18.sh` (v17/v18-kaava), `ajo-vesi-tuotanto.sh` (ei peiliä), `peili-maasto.py [--taivas]`
  (peili `proto-3d/lokit/siirtoseppa-vesi-peili`, ympäristö symlinkkinä `_valmiit/olavinlinna-blender/ymparisto`).
- HUOM: ylhäältä otettu "vesi −20 m" ei erota vettä maasta; käytä viistoa kulmaa.

## Avoimet

1. Puukortit #3763 (pidossa): kun paketti tulee, natiivin puukortit v3 -lukija (kohta 3) ennen kuittausta.
2. Worktree proto-siirtoseppa-kertoja voi poistaa (kaikki junassa 85); proto-siirtoseppa-vesi jää (linna-vesi = juna 90).
3. Puukortit v3 (Linnanrakentaja): rajapinta sovittu — puut.json 7. sarake muunnos, `muunnokset[laji][muunnos]` →
   `kortit[nimi]`, atlas 2048 × 4096 (POT!), valinnainen `puukortit_normaali` (TBN-valo DioraamaPuu-varjostimeen).
   Lisää puihin myös UV-reunus 2 tekseliä (Linssiseppä 2:n aluskasvilöydös: solurajalta näyte → viivat).
4. Hämärävariantit (`ymparisto.hamara.orto`, `.puukortit`, `aluskasvit.atlas_hamara`) eivät vielä käytössä natiivissa.
5. Musta pystykapseli vasemmassa reunassa linnanäkymässä (Natiivi-UI:lle ilmoitettu).
