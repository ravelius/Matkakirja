# Natiivi-UI: luovutus 10.11.2026 klo 12.22 (kontekstivahti 26 %; korvaa -20261110-1102:n)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a.
Natiivirepo /Users/Shared/Claude/proto-3d/Matkakirja-proto (remote natiivi-backup; zsh: `${C}:polku`, ei `$C:A…`). Tarkistus `sh Linssit-testit/unity-tarkistus.sh`.
Skenaariot /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/, lokit /Users/Shared/Claude/proto-3d/lokit/. Jono: T=/Users/Shared/Claude/Matkakirja-fable/tools/asemataulu/tyolista.py.
Kuvat sips -Z 1000 / PIL-rajauksina scratchpadiin; parit _tyo/natiivi-ui/-kansioon PT:lle.

## ODOTTAA PT:N SANAA (MR JU:lle)
- LEHTI + TURISTI-INFO (OMISTAJAN PÄÄTÖS 12.05 KK:n kautta): d11281908 natiivi-ui/kaupunki-lehti-info (juna 224 0421af91a + 1; Karttaselite,
  UiKomennot `ui kaupunkinapit [lehti|info]`, ui.fi.json, Kartta.uss). Ajot lokit/nui-kaupunkinapit-1-{iphone,ipad}-mac-d11281908 katsottu OK;
  kuvat _tyo/natiivi-ui/lehti-info-napit/kaupunkinapit-1-*.png PT:llä 12.22. PT:n sanalla MR JU:lle, sitten `tehty`. Worktree /Users/Shared/Claude/wt/proto-nui-lehtiinfo.
- NOSTOVALIKON PEITTÄVÄ POHJA: e059d4f62 natiivi-ui/nostovalikko-peittava (juna 224 4444e211a + 1, vain USS: lasipinta alfa 0.88 → --tk-lasi-pinta-peitto).
  Pari _tyo/natiivi-ui/nostovalikko-peitto-1-ennen-jalkeen.png PT:llä 11.4x. PT:n sanalla MR, sitten `tehty "Nostomerkit piirtyvät nostoluettelon päälle tai läpi"`.
  Worktree /Users/Shared/Claude/wt/proto-nui-valikkopeitto.

## AJOSSA JU:LLA
- NOSTOLUETTELO KAUPUNGIT (PT 11.1x kelpaa, KK:n ehto iso iPad ennen junaa): JU ajaa sk-nostoluettelo-kaupungit-4-ipad (761535b9e) isolla iPadilla
  linkkiketjun 224.14–16 jälkeen → lokit/nui-nostoluettelo-kaupungit-4-ipad-761535b9e. Ehdot: kuvat q-1..q-4 (kuten -3), muistihuippu < 4080, VIKA 0.
  OK → MR PT:n kautta (ad96c30df + e642441b4 + 761535b9e, ILMAN PR 6553:a); uutta-teksti: "Nostoluettelossa Kaupungit-kohta ensimmäisenä, ja kaupungin
  luettelon otsikkona on kaupungin nimi". Sitten `tehty "Nostoluettelo: Kaupungit-kohta ja jaottelu"`. PR 6553 yhä pidossa.
- MUSEON LATAUSILMAISIN 37eba712e: -1:n PUUTE 5 oli skenaarion virhe (`ui pelaaja 1` sulki kehittäjätilan → "taidemuseo ei saatavilla"); i-1 testikuva ok.
  JU kuittasi sk-museo-ilmaisin-2-mac (ilman pelaaja-riviä) → lokit/nui-museo-ilmaisin-2-mac-37eba712e (12.22 vielä ei kansiota). Katso: i-2 LOUVRE + tyhjä palkki,
  i-3 täyttyvä palkki, i-4 lähestymiskuva; lokissa "odottaa palvelimen kuvia", "latausilmaisin pois". Pari PT:lle.

## TEHTY TÄLLÄ VUOROLLA
- Kerronnan tauko a8bfc9d3e: PT kelpaa, MR7 JU:lle, `tehty`. Maan pienoiskartta 224e8ea23 (+ aef4e59d1): OMISTAJA 12.06 JUNAAN, MR10 JU:lle, `tehty`
  (haara natiivi-ui/maan-pienoiskartta; worktree /Users/Shared/Claude/wt/proto-nui-maanpienois).

## ODOTTAA MUITA
- Klikattavat (3edc0a5e5): PT 11.0x: uusi ajo vasta KK:n luokittelun (osa 3) ja osan 4 jälkeen. Koodilöydös: Kohdenostot.Linkitetty piilottaa vain kartalla
  olevien kohteiden nostot (ei Tarinakohteita) → _tyo/natiivi-ui/klikattavat-tavalliset-selvitys-20261110.md.
- D) osa 4 kaupungin luettelo KK:n luokittelun jälkeen. Muut jonossa: kuvakyltti 153602c0f (koe). Lyhyt versio 14877fa07: JU:n iPad-☰-kuva katsomatta.

## LISÄYS 12.3x: museo-ilmaisin-2 ajettu (lokit/nui-museo-ilmaisin-2-mac-37eba712e, rc 0, kuvia 4/4, PUUTE 2)
- Kierros 1 (ämpäri ei vastaa) OK: lähtökysymys Louvre, "odottaa palvelimen kuvia", ilmaisin esiin (LOUVRE, RANSKA).
- Kierros 2 (paikallinen ämpäri …/museo-v1/julisteet/iso): "linssit: museo: odottaa palvelimen kuvia 79/79" toistuu 5 s välein, kuvat eivät tule;
  ilmaisin pois vasta aikarajalla 60.3 s, sitten näyttelyvalinta. PUUTE 2 = "kuvat levyllä/valmiina|VIKA" -rivejä ei tullut.
  Selvitä: (a) onko ämpärin polku oikea (NS:n raportti-museo.md; ehkä museo-v1/iso eikä julisteet/iso), (b) pitäisikö aikarajalla kirjata VIKA-rivi.
  Kuvia i-3/i-4 ei katsottu. Ilmaisin itse (esiin/pois, testikomento) toimii. Pienoiskartta-1 iphone 5d01e2c25 vanhentunut (junaan meni 224e8ea23).
