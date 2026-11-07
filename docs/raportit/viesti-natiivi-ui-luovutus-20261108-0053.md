# Natiivi-UI: luovutus 8.11.2026 klo 00.53 (puut koko 2,5 odottaa PT:n sanaa)

Korvaa luovutuksen -2352 (c047a8785). Muistin vaihe 1, kartan elämä, varjostinselvitys, kyltit, huudot, opit: ennallaan luovutuksessa -2208 (git show aab93be4f:docs/raportit/viesti-natiivi-ui-luovutus-20261107-2208.md).
PT local_5df52e10-10e4-4b72-9554-0049db300dfe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7, KS local_740947d7-aa79-4b1e-948e-1b7dfc734364, Postivahti local_afae44f0-722b-4541-a3b8-30ca4f76543b. Viestit send_messagella id:llä, PT:lle enintään 3 riviä.
Proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto, etäpää natiivi-backup. Työkopio /Users/Shared/Claude/wt/proto-natiivi-ui-lahto-vahvistus (puhdas, haaralla natiivi-ui/kohokartta-sulku). Kääntö sh Peli-testit/unity-tarkistus.sh, linssitestit sh Linssit-testit/kaanna.sh, pohjavahti python3 -I tyokalut/pohjavahti.py. Ajoja ei tehdä itse: vuoro JU:lta.

## 1. Pariisi kohta 8: VALMIS
2c12b920a ajettu (lokit/nui-nimet-reuna-1-2c12b920a) ja katsottu (_tyo/natiivi-ui/nimet-reuna-1-katsottu/, kohta8-auki-20261107.md lopussa). PT kuittasi 00.4x, JU liitti junaan 221 (0ac8cd436). Työlistan rivi päivitetty.

## 2. Kohokartta: ajettu ja katsottu, odottaa PT:n sanaa
- b276782bd ajettu (lokit/nui-kohokartta-kytkin-1-b276782bd, arkki _tyo/natiivi-ui/kohokartta-kytkin-1-arkki.jpg): kytkin ☰:n vasemmalla, kerroin 15 ↔ palautuu, suljettu ok. Kuvat PT:lle (PT vie KK:lle) 00.4x.
- Jatkohaara natiivi-ui/kohokartta-sulku (pohja b276782bd, pushattu), ajamatta, 2255/2255:
  - b7e283c23 (c) MissingReferenceException pelin sulkeutuessa (LinssiOhjain.OnDestroy → Topografia.Sulje → AjaKamera tuhottuun PalloKiertoon; ei linssistä palatessa): AjaKamera ja KokoPallonKorkeus tarkistavat kierron. (d) LinssienEsilataaja: topografia esilataa valitun ulkoasun sarjan ja vaihtaa kytkimen jälkeen.
  - e9045150d (b) Topografia.KohokartanSelite KS:n riveillä (v5) + NykyinenSelite. HUOM: natiivi ei piirrä linssin selitettä missään (vain data).
- (a) KS:n koko maailman sarja v5: file:///Users/Shared/Claude/proto-3d/_tyo/karttaseppa-kohokartta-laatat/v5/{z}/{x}/{y}.jpg (z0–8, 1,1 Gt). Ämpärin osoite JU:lta vasta PT:n kuittauksen jälkeen → silloin KohokarttaSarja-oletus koodiin. Meri vaihtuu v6:ssa, selite pysyy.
- Auki: (e) iPad-ajo suunnitelman kohdassa 7.

## 3. Puut Pariisin kartalle (OMISTAJAN PÄÄTÖS 8.11. 00.4x PT:n kautta "lisää puut", suunnitelman kohta 6; koe, ei junaan ilman korttia)
Haara natiivi-ui/kartan-puut 55540336f (pushattu): juna 221 (6e7981306) + kartan elämä ebec14c89 (KaupunkiPuu-kortit, KS:n puut-pariisi-kartta.bytes 261 519 puuta = 2.204-suodatus puistoihin ja puuriveihin, ei Cesiumia eikä Googlen siirtoa) + oma commit:
- KartanElama.VainPuut (oletus 1): vain origo paketista, ei savua/lippuja/veneitä/lintuja/autoja; `ui kartanelama vainpuut 0|1`. Kartan elämä itse yhä oletus pois (`ui kartanelama 1`).
- Puun tyvi kartan piirretystä pinnasta (PuunMaa: TasaKorkeusM, Montmartre IGN-taulukosta, muualla kaava). Ajossa: tasainen 261 382, Montmartre 63, kaava 74.
Ajot: lokit/nui-kartan-puut-1-55540336f (p1 = p2: kaari 0,0126 leikkautuu lähimpään 1,68 km, skenaarion virhe) ja lokit/nui-kartan-puut-2-55540336f (koot 1/2,5/4). Arkit _tyo/natiivi-ui/kartan-puut-1-katsottu/ ja kartan-puut-2-katsottu/arkki-koot.jpg.
Havainto: koko 1,0 = pisteitä Louvren palikkapuiden vieressä. SUOSITUS 2,5 (PT:lle 00.53 parien kanssa). Seuraavaksi PT:n sanalla: PuuKoko-oletus 2,5 koodiin (KartanElama.Puut.cs), sitten iPad-muistiero JU:n vuorolla (vain puut päällä vs pois). Isot kyyhkyt p1-päällä-kuvassa eivät ole puukoetta (lähde selvittämättä).

## Opit (uudet)
- Esikatselun `aja` Pariisissa: kaari alle noin 0,014 = lähin (1,68 km); 0,04 = 4,8 km.
- Kartan elämän koodi elää haarassa ebec14c89; uusi koe kannattaa yhdistää sen päälle uusimpaan junaan (merge meni puhtaasti 40 commitin yli).
