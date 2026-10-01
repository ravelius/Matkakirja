# Siirtosepän luovutus 1.10.2026 klo 05.2x (Opus)

## Tila yhdellä silmäyksellä

- **Juna 1.1 (87, TF)**: Boat Attack -järvi + taivaskupoli + ympäristölataaja (linna-vesi 4316a3c1). BUILD 87 = b4435d40 PASS.
- **Juna 1.1 (90, sivuhaara natiiviseppa/juna-1090 12baf580)**: aluskasvit (Linssiseppä 2, 3b853a78) + ympäristöpaketin
  1.10.-muoto (3a28322a: puukortit = png + puukortit_tiedot = json, aluskasvit.atlas png + kortit json, orto .astcm).
- **Osoitin** yhä 65e2535be38cc19d. Kuitattu puhtaalla asennuksella: v17 ad021da8b8e1a93e, v18 98691896e7bf76b8
  (omistajan lupa Julkaisijalla). Päätoimittaja: osoitin ympäristöpakettiin vasta kun 3a28322a on TF 90:ssä, sitten
  kuitataan silloisen mainin kärjen paketti (v19 + v3c + puukortit todennäköisesti).
- Varakuittaus 19f1ff3246be7386 (v18 + v3c): tiedostot 23/23 OK, natiivi 87–89 ei lue sen muotoa → odottaa 3a28322a-käännöstä.

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

## Skriptit (scratchpad, kopioi tarvittaessa)

- `ajo-ymparisto-kuittaus.sh` (HASH=… APP=… L=…): puhdas asennus https-paketista, kulmat taivas, aitat viisto,
  vesi −20 m (todistaa maan), aurinkoon, vesiportti/laituri (v19), laituri-tila; virhelaskenta ilman ääniä.
- `ajo-v18.sh` (v17/v18-kaava), `ajo-vesi-tuotanto.sh` (ei peiliä), `peili-maasto.py [--taivas]`
  (peili `proto-3d/lokit/siirtoseppa-vesi-peili`, ympäristö symlinkkinä `_valmiit/olavinlinna-blender/ymparisto`).
- HUOM: ylhäältä otettu "vesi −20 m" ei erota vettä maasta; käytä viistoa kulmaa.

## Avoimet

1. Käännös linna-vesi 3a28322a (Julkaisijan jono, NYT KÄÄNNÖS) + F989814A 5 min: `HASH=19f1ff3246be7386` kuittaus.
2. TF 90:n jälkeen: mainin kärjen ympäristöpaketin puhdas asennus → kuittaus Julkaisijalle ja Päätoimittajalle.
3. Puukortit v3 (Linnanrakentaja): rajapinta sovittu — puut.json 7. sarake muunnos, `muunnokset[laji][muunnos]` →
   `kortit[nimi]`, atlas 2048 × 4096 (POT!), valinnainen `puukortit_normaali` (TBN-valo DioraamaPuu-varjostimeen).
   Lisää puihin myös UV-reunus 2 tekseliä (Linssiseppä 2:n aluskasvilöydös: solurajalta näyte → viivat).
4. Hämärävariantit (`ymparisto.hamara.orto`, `.puukortit`, `aluskasvit.atlas_hamara`) eivät vielä käytössä natiivissa.
5. Musta pystykapseli vasemmassa reunassa linnanäkymässä (Natiivi-UI:lle ilmoitettu).
