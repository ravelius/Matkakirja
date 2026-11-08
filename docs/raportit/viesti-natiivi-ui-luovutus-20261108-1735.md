# Natiivi-UI: luovutus 8.11.2026 klo 17.35 (merenpohja-2/3 videot, kohokarttalennon maastoraja KESKEN)

Korvaa luovutuksen -1552 (`git show 9995c8f42:docs/raportit/viesti-natiivi-ui-luovutus-20261108-1552.md`); siitä yhä voimassa: FPV-haara
natiivi-ui/fpv-nakyma d1c8a074f/7ddc42970, FPV avoimet (tikkujen koko 64 pt, vuoret peittävät nimet → PT kuvien kanssa), NS:n FPV A/B-tulos odottaa,
UUSI SÄÄNTÖ "TARKISTUS:"-rivi jokaiseen ajopyyntöön, junan 222 kärki 617d6ca2b (napautus-6 JU:lla 4/4 VALMIS, kuvat PT:lle 17.20 – ei NUI:n toimia).
PT local_5df52e10-…, JU local_06f8c680-…, NS local_99130238-…, KK local_37f7c945-…, Postivahti local_afae44f0-….
Proto-worktreet: wt/proto-natiivi-ui-lentoraja (haara natiivi-ui/merenpohja-pohjapallo-lentoraja, puhdas), wt/proto-natiivi-ui-napautus-puhdas.
Työkansio: /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/. Kaikki koe, EI JUNAAN ilman PT:n/KK:n sanaa.

## TEHTY TÄLLÄ VUOROLLA
1. MERENPOHJA-2 (c54d3ba0d, sk-merenpohja-2-mac): avaus–kytkin–sulku toimi; PT EI KK:lle (turkoosi Pariisi, kamera maaston läpi s. 5).
   Selvitys merenpohja-2/TULOS.md + selvitys/: turkoosi = kohokartan z8-rasterin (600 m/px) Seine 2–3 km kaistana (PT: vain maininta KK:lle,
   ei korjausta); tumma kartio = Montmartre ×15 (Sacré-Cœur huipulla; PT: kerro KK:lle videon yhteydessä); s. 5 = kamera-ajon maastoraja vain silmän alta.
2. MERENPOHJA-3 (f7cf0bd7c = c54d3ba0d + NS:n pohjapallo, sk-merenpohja-3-mac, odota-peli, avaus Biskajalla korkealta): katsottu 17.31, kulku ok,
   pallon reuna puhdas. HAVAINTO: 1. ruutu ja viimeinen ~1 s mustia (vain Ranskan lippu, kartta 2387 km), syy auki, ei leikattu.
   merenpohja-3/avainkohdat.jpg, pari-pr-topo-vs-koho.jpg, TULOS.md → PT:llä. Video PT:lle ennen KK:ta (PT päättää).
3. KOHOKARTTALENNON MAASTORAJA (OMISTAJAN/PT:N PÄÄTÖS 17.2x: koko reitillä korostetun maaston mukaan, kamera ei saa mennä maaston läpi):
   - 0b63cee60 natiivi-ui/kohokartta-lentoraja (c54d3ba0d:n päällä) ja 92ae66bea natiivi-ui/merenpohja-pohjapallo-lentoraja (f7cf0bd7c + sama), natiivi-backup.
   - MaastonMaksimi.cs + Resources/MaastonMaksimi.bytes (0,5°, 720×360 tavua × 40 m, maailma-3d15 L1:n maksimi 3×3-laajennettuna; tekoskripti
     _tyo/natiivi-ui/lentoraja-1/maksimi.py: numpy memmap, 120×120-lohkojen max, arvo/2 = m). PalloKierto.MaastoKohdassa = max(näyte, ReitinMaasto); ReitinMaasto vain ajon
     aikana ja kerroin > 2, reunapaino 6 % alussa/lopussa; loki "reitin maastoraja ajossa enintään X km". Kartta 716/716, unity 0.
   - LENTORAJA-1 Mac (sk-lentoraja-1-mac, merenpohja-2:n Pariisi-lähtö): loki "enintään 21,0 km" MUTTA kamera kulkee yhä maaston läpi s. 11,2–12,0.
     KESKEN → JONO a.

## JONO NYT
a) LENTORAJA KORJAUS LOPPUUN (PT:n päätös): lentoraja-1/TULOS.md epäilyt: (1) MaastoRakoPois (Pariisin kaupunkinäkymä) → MaastoKohdassa palauttaa 0
   ennen ReitinMaastoa; (2) LaskeAsennon Pariisin haara (pariisi ≈ 1: kallistusrajaus lerpataan pois, nosto maastoSilea-viiveellä);
   (3) reunapaino. Lisää kehyskohtainen loki lennon 2 ensimmäiseen sekuntiin (silmä z, MaastoKohdassa, ReitinMaasto, maastoRakoPois, pariisi-osuus),
   Mac-ajo JU:n vuorolla (sk-lentoraja-1-mac uudelleen uudella sha:lla), korjaa (todennäköisesti ReitinMaasto myös RakoPois-tilassa ja Pariisin
   nostoon max(sileä, reitti)), Kartta-testit + unity (sh) 0 → uusi Mac-video → PT. Uusi commit molempiin haaroihin (c54d3ba0d- ja f7cf0bd7c-pohjainen).
b) Merenpohja-3: PT:n vastaus (KK:lle? musta alku/loppu). Jos KK:lle: maininnat Seine-kaista ja Montmartre ×15.
c) FPV (luovutus -1518/-1552): NS:n A/B-tulos, avoimet PT:lle.

## OPIT
- Mac-tallenne kulkee peliajassa: tallenteen sisällä odota-peli; `komento kuva` tallenteen aikana ei tallennu → kuvat ffmpegillä videosta (muisti
  esikatselu-tallenne-odota-peli.md).
- numpy vain ilman -I:tä (user site); skripti scratchpadissa.
