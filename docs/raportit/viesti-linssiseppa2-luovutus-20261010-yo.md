# Linssiseppä 2 – luovutus 10.10.2026 klo 01.1x (konteksti 70 %, PT:n nollaus)

Rooli: Linssiseppä 2 (Opus, high): kaupunkinäkymän ilmakehä ja valo, omat 3D-mallit (putki + ämpäri), varjot, vesi, kaukomaa.
Proto: `/Users/Shared/Claude/proto-3d/Matkakirja-proto` (paikallinen git). Oma checkout `Matkakirja-linssiseppa-2` (haara `linssiseppa2-tyo-20260928`).
Edellinen luovutus: `viesti-linssiseppa2-luovutus-20261009-yo.md` (varjot, utu, vesi, reikätäyte: ne ovat ennallaan).

## Lue ensin
CLAUDE.md, Raamatun Ydinajatus kohta 2 (vain se) ja tämä tiedosto. Testaus: vain automaattiset testit ja käännöstarkistus.
Simu vain PT:n pyytämiin kuviin Julkaisijan SIMULAATTORI NYT -vuorolla (yksi raskas simu kerrallaan, muistivahti); ilmoita "simu vapaa".
SendMessage-raja 10/vuoro: varakanava `mcp__ccd_session_mgmt__send_message` (hookin ohje).

## 1. SEURAAVAKSI: laattavarjo-KOE (ensimmäisenä Julkaisijan seuraavalla vuorolla)
- PT 01.0x: Googlen leivotut (kiinteät) varjot vs. LIVE-aurinko omille malleille, kuvapari kahdella auringon asennolla → PT.
- Valmis skripti `proto-3d/_tyo/linssiseppa2/skriptit-20261009/laattavarjo2.sh` (ei käännöstä): appi `lokit/linssiseppa2-app-varjot173`
  (OmatVarjot), mallit v6h3, variantit `lv2-var.txt` (klo 10/16 × omavarjot 0/1), kulmat `lv2-pariisi.txt` (prefektuuri, ND) ja
  `lv2-tukholma.txt` (KL). Simu A26BC7D0. Pyyntö on Julkaisijan jonossa (arvio ~01.27); jos vuoro ehti tulla nollauksen aikana, pyydä uudelleen.
- Tulokset `lokit/linssiseppa2-laattavarjo2-<kaupunki>/<kaupunki>/<kulma>-<variantti>.png` → arkki (pohja `arkki-v6i.py`/`arkki-ktx.py`) → PT.

## 2. Omien mallien muisti: valmiit (PT kuitannut)
- **ND-puukorjaus** (Natiivisepän mittaus `Matkakirja-3d-selvittaja/docs/raportit/muistimittaus-juna173-20261010.md`: junan 173 / TF 172
  iPad-jetsam = ND:n 90 puusolmua → Cesium 103 tekstuuria, 557 Mt). `tyokalut/omat_mallit_instanssit.mjs` leipoo jaetut teksturoidut meshit
  ja saman teksturoidun materiaalin primitiivit yhdeksi (maailmarajat ja kolmiot tarkistetaan; spiira-solmu pidetään).
- **Vientiportti** proto `linssiseppa2/ktx2-174` **f6f775947**: `tyokalut/omat_mallit_ktx2.py --portti <paketti>` hylkää teksturoidun meshin
  useassa solmussa ja teksturoidun materiaalin useassa primitiivissä; testit `tyokalut/omat_mallit_portti_testi.py` 7/7. Julkaisija teki
  portista pakollisen `vie-paketti.sh`:ssa (kopio `proto-3d/tyokalut/linssiseppa2-omat-mallit/`, kunnes juna 174 on mainissa).
- **KTX2** (`omat_mallit_ktx2.py`, sama haara): värit/atlakset ETC1S, normaalit UASTC ≤ 1024, mipit, Draco takaisin, `--tarkista`.
  LOD0 GPU-arvio: Pariisi 159 → 21, Tukholma 173 → 27, Giza 643 → 73 Mt. Kuvapari KL v6h | v6hk (4 kulmaa) ei eroa, ei lohkoja 170 m:ssä
  (`kaappaukset/linssiseppa2-ktx2-20261010/`, f043c05f6). Työkalut T7: `/Volumes/T7 4TB/koodaus/linssiseppa2-tyokalut/` (KTX-Software 4.4.2
  purettuna, gltf-transform 4.5.0).
- **Junaan 174 kuitattu** 4ffe2aa0c (CesiumOmatMallit: osoitin uusin-4.json, varalla uusin-3.json); SHA Natiivisepällä. Haaran kärki f6f775947
  lisää vain tyokalut/.

## 3. *3-paketit (Julkaisija vienyt; portti 0 virhettä) ja osoittimet
| paketti | _valmiit/ | osoitin (Julkaisija, vasta Natiivisepän laiteajon jälkeen) |
|---|---|---|
| v6b3 | omat-mallit-vienti-20261010e | uusin-2 → v6b3 (TF 172) |
| v6h3 | omat-mallit-vienti-20261010f | uusin-3 → v6h3 (173) |
| v6hk3 | omat-mallit-vienti-20261010g | uusin-4 → v6hk3 (174, KTX2; uusin-4.json luodaan vasta 174:n laitemuistiajon jälkeen) |
| v6k3 | omat-mallit-vienti-20261010h | (v6j:n KTX2-versio, vain jos omistaja hyväksyy v6j:n) |
*2-paketit (10a–d) jäävät käyttämättä (v6h2 ei läpäise porttia). Natiivisepälle kerrottu (PT).

## 4. Kuninkaanlinnan tekoälypinnat (v6j) – omistajan päätös aamulla
- v6j (`_valmiit/omat-mallit-vienti-20261009p`, raportti `docs/raportit/linssiseppa2-kl-tekoalypinnat-v6i-20261009.md`, arkki
  `kaappaukset/linssiseppa2-kl6i-20261009/omistajalle-kl-valokuva-v6h-v6j.jpg` 573d9e509): kaksi sävyä, Logården leikkaukseen, suorat
  pilasterit, ei sahalaitaa. PT lähetti omistajalle; v6h pysyy, kunnes omistaja päättää (aamun kortti).
- v6j:n atlas oli 7 primitiivissä (JPEG ~7 × 89 Mt GPU) → korjattu **v6k3**:ssa (portti). Jos omistaja hyväksyy: pelikuva v6j | v6k3
  (vain kyllä-vastauksella), sitten uusin-4 → v6k3 PT:n päätöksellä.
- Ketju: `proto-3d/_tyo/linssiseppa2/kl-tekoaly/` (aja-v6j.zsh, savyta.py, tyokalut/ = LR:n työkalujen kopiot muutoksin, kl-v6j/ = LR:n
  mallilähteiden kopio: alue Logården + 8 m itä, itapuoli() päällä, porrasreunat, sisäpihan taso > 4 m reunasta).
- Auki (pieniä): listojen vaaleat vaakaviivat vaimennettu, Logårdenin nurmi tasainen, itäjulkisivun tekoälykuva haaleampi;
  portiikin edustan 2 vaaleaa kappaletta ovat Googlen (näkyvät myös v6h:ssa; PT: leikkaukseen myöhemmin, jos helppo).

## Muuta
- Siivottu 17 vanhaa .app-kopiota (säilyvät 173pbr2, reika, utuvm, varjot173). Worktreet: `wt/proto-linssiseppa2-laivat171` on nyt haara
  `linssiseppa2/ktx2-174`, `-talvi` = varjot-173, `-muisti` = reikatayte.
- Skriptit `proto-3d/_tyo/linssiseppa2/skriptit-20261009/`: kuvat-v6i.sh / kuvat-ktx.sh (VERSIOT, KULMAT, KAUPUNGIT), arkki-v6i.py /
  arkki-ktx.py (ARKKI, LOKI), vienti-v6i/v6j/puut/materiaalit.py, kl6i-tukholma.txt (4 KL-kulmaa).

## Aloitusviesti
```
Olet Linssiseppä 2 (Opus, high). Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 ja docs/raportit/viesti-linssiseppa2-luovutus-20261010-yo.md
(haara linssiseppa2-tyo-20260928). Ensimmäisenä laattavarjo-KOE Julkaisijan seuraavalla SIMULAATTORI NYT -vuorolla (laattavarjo2.sh) → kuvapari PT:lle.
Viestit PT:lle vain valmis erä, jumi tai kysymys, ≤ 8 riviä.
```
