# Linssiseppä 2 – luovutus 9.10.2026 klo 20.4x (konteksti 69 %)

Rooli: Linssiseppä 2 (Opus, high): kaupunkinäkymän ilmakehä ja valo, omat 3D-mallit (putki + ämpäri), varjot, vesi, kaukomaa.
Proto: `/Users/Shared/Claude/proto-3d/Matkakirja-proto` (paikallinen git, haarat `linssiseppa2/*`). Oma checkout `Matkakirja-linssiseppa-2`
(työhaara `linssiseppa2-tyo-20260928`). Edellinen luovutus: `viesti-linssiseppa2-luovutus-20261009-ilta.md`.

## Lue ensin
CLAUDE.md, Raamatun Ydinajatus kohta 2 (vain se) ja tämä tiedosto. Testaus: vain automaattiset testit ja käännös. Kuvat vain PT:n pyynnöstä tai
erän valmiin kuvaparin osana (Julkaisija kysyy, onko pyydetty).

## Tänään valmiit (PT kuitannut tai hyväksynyt)
- **Varjot:** juurisyy on kaupunkikameran kaukotaso 12 757 km (PalloKierto), joka romahdutti URP-kaskadit 29 m:iin. Raportti `docs/raportit/varjot-juurisyy-20261009.md`.
  Tuotantohaara `linssiseppa2/varjot-173` 9acc8d4a7 (pbr-173:n päällä, OmatVarjot.cs, oletus POIS, mobiili 2048² ja 2 kaskadia). Natiiviseppä kuittasi muistin.
  Junaan 173 oletus pois. Oletus päälle iPad Pro 13 -mittauksen jälkeen (ohje `docs/raportit/ohje-varjomittaus-ipad-20261009.md`, raja +1,5 ms, Laitetestaaja).
  Laattavarjot (Googlen laatat ottavat varjon vastaan): PT hylkäsi, KOE jää haaraan `google-tyyli` ce615b071.
- **Omat mallit v6h** (KL v3c + Riddarholmen v2b, LR:n AO, Google-sävy leivottu) on ämpärissä (Julkaisija 18.04). Osoitin uusin-3 → v6h odottaa
  omistajan lupaa (PT näyttää arkin `kaappaukset/linssiseppa2-kl3-20261009/omistajalle-kl-ridd-v6h.png`). Paketti `_valmiit/omat-mallit-vienti-20261009n`.
- **Vesi 40 km:** `linssiseppa2/vesi-v5` f7d6156d2 (VesiIndeksi Ydinissä, kauko2 48 m) on kuitattu junaan 173.
- **Mitattu utu:** `linssiseppa2/utu-173` add6d023e on junassa 173 (AERONET-taulukot ämpäristä `ilmakeha/aerosoli-v1/{id}/{kausi}/`, kaukoutu 1,0,
  ilmaperspektiivi 0,7; kaukoutu rajautuu koodissa alarajaan 1,0). Levyvälimuisti `utu-valimuisti` 27761a321 on junassa, ja polun korjaus
  717424516 (temporaryCachePath) on kuitattu ja SHA annettu Natiivisepälle.
- **Reikätäyte ilmakehän sävyllä** (PT:n päätös B: ei karttakuvaa) `linssiseppa2/reikatayte` 824e213e2 (utu-173:n päällä). Testit vihreät,
  kuvat `kaappaukset/linssiseppa2-reikatayte-20261009/`. Kuittauspyyntö PT:llä, sitten SHA Natiivisepälle.

## Kesken
1. Reikätäytteen kuittaus (PT), sitten SHA Natiivisepälle (yksi rivi).
2. PT:n päätöksellä B hylätyt: kaukomaa 40c34ec85 ja yövalot d0aaf9fff (hehku näkyi vain Googlen reikien muotoisina läiskinä). Haarat jäävät talteen, eivät junaan.
3. Varjojen oletus päälle: odottaa Laitetestaajan iPad Pro 13 -mittausta (ohje `docs/raportit/ohje-varjomittaus-ipad-20261009.md`, raja +1,5 ms).
4. v6h-osoitin (uusin-3 → v6h) vasta omistajan luvalla, Julkaisija vaihtaa.

## Worktreet (Postivahti: enintään 3)
`wt/proto-linssiseppa2-talvi` = varjot-173, `-laivat171` = utu-valimuisti, `-muisti` = reikatayte (myös kaukomaa- ja yovalot-haarat). Muut on poistettu, ja haarat ovat tallessa. Tileset-työkalu
(`tyokalut/omat_mallit_tileset.py`) ajetaan talvi-worktreestä (pbr-173-pohja).

## Työkalut (`proto-3d/_tyo/linssiseppa2/skriptit-20261009/`)
`kuvat-utu.sh` (yleinen: OMAT, ILMA, ALKU = alkuasetukset, VARIANTIT = nimi<TAB>asetukset;…, TUNTI), `kuvat-kl3.sh` (VERSIOT, KULMAT),
`varjo-pari.sh` (ruutuaika stdoutin tavurajoilla, `ruutuaika.py` scratchpadissa), `utu-ab.sh`, `utu-173.sh`, `kaukomaa.sh`, `vesi-v5.sh`,
`laattavarjo.sh`, `varjot-173.sh`. Leivonta: `leivo_tyyli.py` + `leivo_kl3.py` / `leivo_ridd2.py`, viennit `vienti-v6f/g/h.py`. Oma AO-koe on
`_tyo/linssiseppa2/kokeet/` (PT valitsi LR:n Blender-AO:n).
Opetus: käynnissä olevan ketjun zsh-skriptiä ei muokata paikallaan, vaan kirjoitetaan uusi tiedosto ja tehdään `os.replace`.

## Aloitusviesti
```
Olet Linssiseppä 2 (Opus, high). Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 ja docs/raportit/viesti-linssiseppa2-luovutus-20261009-yo.md
(haara linssiseppa2-tyo-20260928). Jatka Kesken-kohdista (reikätäytteen kuittaus, varjojen iPad-mittauksen tulos). Viestit PT:lle vain valmis erä, jumi tai kysymys, ≤ 8 riviä.
```
