# Natiivisepän luovutus 10.11.2026 klo 11.05

Edellinen: -1045 (dce6b8130), käsitelty kokonaan. Syy: kontekstivahti 26 % (7.37). Kansio Matkakirja-3d-selvittaja. Älä poista mitään.
Työkansio /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/, lokit /Users/Shared/Claude/proto-3d/lokit/. Repo proto-3d/Matkakirja-proto, remote natiivi-backup.
Cron "4 9 * * *" unity-julkaisut.py: LUO UUDELLEEN (/opt/homebrew/bin/python3.14 /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py
ILMAN -I:tä; UUSI-rivit → PT "UNITY UUSI: …"). Työlista: kaikki NS-erät odottavat JU:n ajoja (alla); PT kirjoittaa työlistan.

## 1. PONT DU GARD -ESILATAUS (PT 10.4x) – iPad JU:lla (OC, 4 kylmää)
- Koe natiivi-backup natiiviseppa/pdg-esilataus 44b7cbd17 (juna 224 e46b3f251 +), wt /Users/Shared/Claude/wt/proto-natiiviseppa-museo. unity-tarkistus 0.
  AjoEnnakko.PaivitaKierto (lennossa kierron lähtöasento, kierrossa 3 s edellä), PalloKierto.KierronOdotus (≤ 6 s, pallo ≥ 95 %), loki "kohdekierto lataus"
  2 s välein, komento `maasto kierronennakko <s> [odotus]|pois|tila`, QA-lippu Documents/cesium-valimuisti-tyhjenna.txt (CesiumValimuistiNollaus.cs).
- JU: pontdugard/ajopyynto-2.md (iPad-kopiot T/sk-pdg-*-ipad.txt) → lokit/natiiviseppa-pdg-{ennen,jalkeen}-{1,2}.
  KUN VALMIS: tarkista "cesium-välimuisti: tyhjennetty N" (0 = ei kylmä!); perillä → pallo ≥ 95 % aika ennen/jälkeen, muistihuippu (muistivahti-tulos),
  kuvat 4/10/16 samasta rajauksesta täysikoossa → pari PT:lle. Kirjaa pontdugard/tulos.md. Junaan vasta PT:n/kortin jälkeen.
## 2. YKSI TARKKUUS: b2 HYLÄTTY (PT 10.5x samaa mieltä), (a) Mac JU:lla (OD)
- tulos.md loppu, pari parit-b2/pari-b2-ele-1000.png. (a) = komento `maasto yksitaso liike 1` + pito pois SAMALLA käännöksellä ab0bb5f67:
  yksi-tarkkuus/ajopyynto-4.md, sk-mac-a.txt → lokit/natiiviseppa-yksi-tarkkuus-mac-a. KUN VALMIS: hyppy.py ya-ele.mp4 (vrt. b2 763/45, nyky 518/71),
  kärkiruudut ffmpeg select (parit-b2:n tapaan) → pari PT:lle. PT: iPad-muisti vasta jos hyppy poistuu; ei junaan.
## 3. ISS-TÄRINÄ: syy löytyi, koe af969f31a, Mac A/B JU:lla
- iss-tarina/tulos.md loppu: kamera.txt siksak 1493/2250 (v2 1105) ← RakettiLaukaisu.Nyt realtimeSinceStartup kesken kehyksen.
- natiivi-backup natiiviseppa/iss-kello af969f31a (wt /Users/Shared/Claude/wt/proto-natiiviseppa-iss, 50bab43fc:n päällä): kehyskello, komento
  `linssi raketti kamera kello kehys|reaali`, loki "kello tasaisuus". JU: iss-tarina/ajopyynto-2.md → lokit/natiiviseppa-iss-tarina-2 (iss-reaali, iss-kehys).
  KUN VALMIS: python3 tyokalut/natiiviseppa-skriptit/kamera_tarina.py lokit/natiiviseppa-iss-tarina-2/iss-{reaali,kehys}/kamera.txt; jos kehys tasainen
  → iPad-ajo JU:lle (kello tasaisuus -rivit + video) → pari PT:lle. Huom: Mac-tallenteen 0,02 s peliaskel voi korostaa; iPad ratkaisee.
## 4. ISS-KUPOLI: kuvat lokit/natiiviseppa-iss-tarina-1/iss-kupoli-{normaali,suoja08,suoja10}.png EI KATSOTTU
- Katso samasta rajauksesta täysikoossa (sips -Z 1000 -kopio koko ruudusta + rajaus). Jos suoja08 selvästi pehmeämpi ja suoja10 ≈ normaali:
  korjaus koehaaraan (CupolaKerros.cs:80 suojaprofiili ilman renderScale-skaalausta), iPad GPU/lämpö-mittaus JU:lla, pari PT:lle. Ei junaan ilman paria.
## 5. Ennallaan JU:lla: muistiosuus efdb68d93 (muistiosuus/ajopyynto-1.md → lokit/natiiviseppa-muistiosuus-{1,2}; tulos PT:lle, junaan vasta kortin jälkeen),
   ISS C 630e6bc31, kertojan viive, muistikatto 3+3 (jaksot.py → tulos.md, rivi PT:lle ja KK:lle).

## VIESTIT TÄLLÄ VUOROLLA
PT: PdG-tila 10.5x, b2-pari 10.5x (PT kuittasi). JU: ajopyynnöt pdg-2 (OC kuitattu), yksi tarkkuus a (OD kuitattu), iss-tarina-2 (lähetetty 11.0x).
