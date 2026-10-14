# Pelikoodarin luovutus 14.10.2026 aamu (nollaus, PT: konteksti 80 %)

## Valmistunut tässä sessiossa (kaikki proto-gitissä, push natiivi-backup)
- **Maapallobugi raketin lopussa (omistajan iPhone-kuva)** — juurisyy: tileset-varjostimen `_maaKeski`/akselit lasketaan vain
  `KorkeusKerroin.Asetassa`; `OrigoAlustalle` jätti keskipisteeksi alustan → yli ~6 400 km:n päässä Andøyasta laatat "nousivat" ulos
  kuvasta ja näkyi Pohjapallon (25, 55, 105) sininen. Korjaus 674cdbf2f (PT hyväksyi), liioittelu 1 laukaisussa 46035083b (LS2 savu11).
  Lisäksi: ennakkokamera lennon loppukuvaan 8f0c1d21c, kello kerran kehyksessä ennen kameraa e66747799 (LS2:n kiertoradan nykiminen),
  lähikuvan laattavalinta 8693f92fe (leijuva laatta kiertoradalla). Raketti-paketti on junassa 189 LS2:n ed26d18b1:n kautta.
  Testikomento `linssi raketti pito <s>` (loppukuvan pito + PitoMittaus).
- **ISS-kupoli** (pelikoodari/iss-kupoli-190, junassa 189 PT:n kuittauksella 6a116f054 + LS2:n ilmakehäkorjaus f3b8c7160):
  V1 manifestin tapahtumat ja PT:n soittosäännöt (v1-aika vain kun kelaus pelissä, v3-kuva-* kerran per tila); V2 Cupolan napautus →
  `Ylilennot.Seuraava` 500 km/72 h koko maailma → kelaus, LCD "HUOMENNA 04.12 / 14 KIERROSTA" (IssOhjaamo, NUI:lle kerrottu);
  V3a ylilentokohteet koko maailmasta; V3b kuvan synnyn kertoja; `IssAlbumi.Kuva.Kohde` (NUI:n V3c-galleria odottaa omistajaa);
  lyhyen lennon raitahyppy Cupolan repliikkiin. Testikomento `linssi raketti kelaa <lat> <lon>`. LS2:n kevyt pallo 98d4de0f3 yhdistetty.
- **Telakointi** (pelikoodari/telakointi-190, kärki bf8183158; LS2 malli/kamera `Iss.Telakointi`, minä kytkentä): vaihe Telakointi
  lennon perään (KestoS 10 s), kertojan klippi `KupoliAanet.Tapahtuma("telakointi")` (manifesti audio/iss-kupoli-v2.json, v1 varalla),
  raita pysähtyy Cupolan repliikin alkuun, origo ISS:lle kehyksen alussa ja palautus 1,2 s viiveellä Cupolan mustan alle
  (`OrigonPalautus`: ei sinisiä välikehyksiä, varmistettu 10 fps videolla fe27919ad), kuva-ala `Telakointi.KentanKerroin`.

## Kesken / seuraavaksi
1. **Telakointi PT:n kuittaukseen**: äänellinen video valmis (bec080137 = f7d398b4a): proto-3d/lokit/pk-kupoli-v2-20261014/telakointi3/
   telakointi-aanella.mp4 – klippi soi (7,5 s). Siinä näkyvä virhe (Cupolan raitarepliikki alkoi 2 s ennen Cupolaa, katto laukesi
   telakoinnissa) on korjattu bf8183158, ajamatta simussa → seuraava ajo bf8183158:lla (L2/L1 + oma simu) ennen PT:n kuittausta;
   PT kuittaa telakoinnin omana eränään (LS2:n yhteisajo telakointi4 samalla kärjellä).
2. **Pääkaupunkien pidemmät esittelyt** (PT 14.10.): SK toimittaa e04–e14 kohdekartta.esittely-tekstit → kytke
   `node tools/paakaupungit/kytke-pilvisisalto.mjs <repo> <paakaupungit-pilvi>` ja PR.
3. Simussa ajamatta: v2-kiihdytys (kaasuvipu), v2-nyt (NYT-nappi), IssAlbumi.Kohde (kuva Cupolassa).
4. Raketin video (vanha jono 3) vain PT:n pyynnöstä.

## Työkalut
- proto-3d/_tyo/pelikoodari/iss-kupoli/: ajo-kupoli-v2.sh (V2-koe), ajo-kupoli-tallenne.sh (video koko kupolikäynnistä + aikaleimat),
  ajo-telakointi.sh (video laukaisusta Cupolaan), kokoa-aani.py `<kansio> [-|loppu_s] [video.mp4]` (ääni pelin klipeistä aikaleimoilla:
  lennon raita, Cupolan repliikki, kupolin jaksot ja tapahtumat). raketti-pallo/ajo-raketti-pito.sh (pito-koe).
- Simun video: `simctl io recordVideo` pysäytetään lapselle (`pkill -INT -P $VP`); raakavideon aikaleimat eivät ole nousevia →
  muunnos ensin 30 fps:ksi (kokoa-aani.py tekee).

## Opit
- Origon siirto → aina `KorkeusKerroin.Aseta(Arvo, g)`; Avaruuden kuoret ja yökuori keskitetään nyt joka kehys (LS2).
  Tasainen sininen pallossa → ensin `pallo pohja pois` (musta = laatat eivät tuota pikseleitä) ja renderer.isVisible.
- Rekisterin `Auki` on linssin sovitin: AstronauttiLinssi haetaan `FindAnyObjectByType<AstronauttiKerros>()?.Linssi`.

## Työtilat
Proto-worktreet: wt/proto-pelikoodari-laukaisu (raketti-laukaisu-189), wt/proto-pelikoodari-kupoli (iss-kupoli-190),
wt/proto-pelikoodari-telakointi (telakointi-190). Simu pelikoodari-iPad13 (39644E75…). Levy oli 97 % (poistin omat raakatallenteet).
