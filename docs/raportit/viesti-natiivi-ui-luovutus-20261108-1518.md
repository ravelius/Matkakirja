# Natiivi-UI: luovutus 8.11.2026 klo 15.18 (FPV-erä koodattu; kl4 ja merenpohja-1 katsottu, uusinnat JU:n jonossa)

Korvaa luovutuksen -1441 (`git show 4f057400e:docs/raportit/viesti-natiivi-ui-luovutus-20261108-1441.md`); siitä yhä voimassa: Opit (-1322),
kohdan 4 AVOIN (NS 79f8a637b PalloKierto / 3D-mallin kyltti ei esittele). PT local_5df52e10-…, JU local_06f8c680-…, NS local_99130238-…,
PK local_91a1bc27-…, Postivahti local_afae44f0-…. Proto-työkopio /Users/Shared/Claude/wt/proto-natiivi-ui-lahto-vahvistus (remote natiivi-backup),
nyt haaralla natiivi-ui/kartta-lukittu-222 (puhdas). Kaikki koe, EI JUNAAN ilman PT:n/KK:n sanaa.

## TEHTY TÄLLÄ VUOROLLA
1. FPV haarassa natiivi-ui/fpv-nakyma (pushattu):
   - 92fd9c586 = PK:n lentomalli 5a7b64bba yhdistetty.
   - d1c8a074f TIETORIVI + LENTOTILA: FpvNakyma vasen yläkulma ISS-lukemakilpi "● FPV · 1 240 m · 86 km/h" (KyydinTeksti.Luku), alla
     IssOhjaus.Segmentti Automaatti | Manuaali (aktiivinen AsetaTila). Luvut FpvNakyma.Lentomalli:sta (KorkeusMerenpinnasta NaN → "–",
     NopeusMaanYllaKmh); VÄLIAIKAISESTI kamerasta (ECEF-vaakasiirtymä/aika, korkeus/KorkeusKerroin.Arvo). FpvNakyma.Tila (alkaa Automaatti
     joka Aseta(true)), TilaVaihtui, Muuttui(bool). Komennot `ui fpvnakyma lentotila auto|manu`, `tila` (TilaRivi: teksti, lähde, paikka).
     Avaimet ui.fpv.* (ui.fi.json).
   - 7ddc42970 KOSKETUSTIKUT: FpvTikut (OpasTapit.Tappi, mode 2: vasen kaasu+yaw, oikea roll+pitch) → FpvTikut.Syote (FpvSyote).
     Tappi.PidaY (Manuaali: kaasu pysyy, veto suhteellinen, neliörajaus) + AsetaY; Manuaaliin → kaasu 2·Leijuntakaasu−1, Automaattiin → 0.
     Topografian ☰ kytkin "FPV-lento" (LinssiUi karttaValikot, id topografia); muu linssi/sulku → FpvNakyma.Aseta(false). `ui fpvnakyma tikut`.
   - unity-tarkistus (sh) 0 virhettä. NS:lle kerrottu molemmat sha:t ja koukut; NS ajaa pm-kuvat d1c8a074f:llä
     (lokit/natiiviseppa-fpv-pienoismalli-d1c8a074f*), tikut näkyvät vasta 7ddc42970:ssa. Lentäminen vaatii NS:n osan 4.
2. KARTTA-LUKITTU-3 kuvat katsottu: 5°-porras vaihtaa keskustassa 0–1 nimeä → "5° riittää" PT:lle (_tyo/natiivi-ui/kartta-lukittu-3/).
3. KARTTA-LUKITTU-4 (cb3b5537d) katsottu: Musée de l'Armée Invalidesin yllä ✓, mutta Place du Carrousel 11,2 / Saint-Germain-l'Auxerrois
   15,2 / Parvis Notre-Dame 13,7 em leijuivat mallien yllä → KORJAUS ef81c021d (natiivi-ui/kartta-lukittu-222): KiinteaLadonta.MalliNostoMaxEm = 6.
   Testit KiinteaLadonta 6/6, NimiLadonta 43/43, unity 0. Parit + tulos _tyo/natiivi-ui/kartta-lukittu-4/. PT:lle kerrottu; KK:lle pari vasta kl5:stä.
4. MERENPOHJA-1 (c54d3ba0d) katsottu: skenaariovika – "maasto pois" vaihtuu vasta kohokartta 0 → 1, joten tasainen = 3d (kuollutmeri tavulleen
   sama). Koodissa ei vikaa. Uusinta sk-merenpohja-1b.txt (vain tasainen, 9 kuvaa). Arkit + tulos _tyo/natiivi-ui/merenpohja-1/.

## JONO NYT
a) JU (iso iPad, tässä järjestyksessä): napautus-3 491fdf026 → kartta-lukittu-5 ef81c021d (pid 69329, sk-kartta-lukittu-5.txt →
   lokit/nui-kartta-lukittu-5-ef81c021d) → merenpohja-1b c54d3ba0d (lokit/nui-merenpohja-1b-c54d3ba0d). JU kuittaa NUI:lle.
   - napautus-3: katso 8 kuvaa + ui-loki "kohdenostot napauta … Pick nostoissa" (luovutus -1441 kohta 4) → PT.
   - kl5: lahi-invalides (150,500,1000,1150) ja Louvre/Notre-Dame (1000,350,2000,1000) kl2 vs kl5 (skripti kuten _tyo/natiivi-ui/kartta-lukittu-4/);
     lokissa "oman mallin yllä" vain Musée de l'Armée; Carrousel/Auxerrois/Parvis eivät leiju → pari PT:lle → KK.
   - merenpohja-1b: parit mp-<paikka>-tasainen (1b) | mp-<paikka>-3d (lokit/nui-merenpohja-1-c54d3ba0d), skripti kuten
     _tyo/natiivi-ui/merenpohja-1/ → PT → KK. Sitten tallenne sk-merenpohja-2 (avaus–kytkin–sulku) Mac-videona.
b) NS:n pm-kuvat (d1c8a074f): nimet maassa, pallo, tietorivi, tilanappi → PT. Säädä KupoliNimet.DroneEmKerroin tarvittaessa.
c) FPV avoimet PT:lle kuvien kanssa: tikkujen koko 64 pt (pohja) riittääkö lentämiseen? Vuoret peittävät nimet (ZTest Always)?
