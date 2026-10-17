# Pelikoodarin luovutus 17.10.2026 iltapäivä (KOVA RAJA 41 %, Postivahti, klo 12.29)

Rooli Pelikoodari (Opus, high), checkout /Users/Shared/Claude/Matkakirja-pelikoodari (haara pelikoodari-luovutus-20261014-paiva), proto-git
/Users/Shared/Claude/proto-3d/Matkakirja-proto (haarat pelikoodari/<aihe>, worktreet /Users/Shared/Claude/wt/proto-pelikoodari-*, peili
natiivi-backup peili/proto/<haara>). Edellinen luovutus -20261017-keskipaiva (787893636).

## Lue ensin
- CLAUDE.md, Raamatun Ydinajatus kohta 2, tämä raportti. Viestit `send_message` session id:llä (/Users/Shared/Claude/osoitekirja.md):
  PT local_5df52e10-…, JU local_5cb16c00-…, KS local_eec7f158-…, LR local_996d60ab-…, Postivahti local_a24c43c0-….
- Simu iPhone 96044270-92AA-4BD3-BE2D-772C8495AB19 vain JU:n "SIMU NYT" -luvalla, "SIMU VAPAA" heti. Käännökset JU:n kautta (L2).
- Ennen käännöspyyntöä `zsh tyokalut/tarkista.sh` (0). Linssit-testit: `sh Linssit-testit/kaanna.sh <nimen osa>`.
- Omistaja 12.24 (PT): DYNASTIAT ETUSIJALLA.

## 1. ENSIN: KIINAN KERTOVA KAMERA – simuajo (JU antaa SIMU NYT ~12.40, KS:n ajon jälkeen, ~4 min)
Omistaja 11.38 (PT): pelaaja zoomaa/kiertää vapaasti; joutilaana kamera kertoo: laaja kuva dynastian vaihtuessa, lähelle taisteluun, hidas
kierto pääkaupungin ympäri, vetäytyminen laajetessa; pehmeät alut/loput; ei liiku tekstin ilmestyessä.
- Koodi: Ydin/Kiina/KiinaKertovaKamera.cs (Kamerapolku/Liuku, kierto Tasainen-rampein, irtautuminen Hidastuva, jousi tekstille, kallistus
  pelaajan rajassa), KiinaSovitin (LinssiOhjain.cs) pollaa kerros.Pysakki + Ajo.Tila + VaestopintaKerros.Armeijat.Lyonnit,
  PalloKierto.PidaSuuntima (suuntima ei palaa pohjoiseen eleessä). Testit KiinaKertovaKameraTestit 8/8. QA `kiina kamera 0|1|ele|tila`.
  Tekstin ehto: KiinaSovitin.TekstiNakyy (NUI voi asettaa) tai 1,2 s pysäkin alusta (omistaja 11.55 poisti keskiotsikon).
- KS yhdisti: karttaseppa/kiina-paketti-200 (0954101f3 mukana 5ad4ca1ad:ssa, meta 11f187235). App: /Users/Shared/Claude/proto-3d/_tyo/
  karttaseppa/kiina-koko-linssi-app (eb8bb4ca6 = 5ad4ca1ad). ÄLÄ KIRJOITA KS:n kansioon.
- Aja: `APP=/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/kiina-koko-linssi-app/Matkakirja3D.app SHA=eb8bb4ca6 HAARA=karttaseppa/kiina-vaestopinta-199 UDID=96044270-92AA-4BD3-BE2D-772C8495AB19 zsh /Users/Shared/Claude/proto-3d/tyokalut/pelikoodari-ajot/ajo-kiina-kamera-200.zsh`
  (taustalle) → SIMU VAPAA JU:lle → katso lokit/todistus-kiina-kamera-200-*/kuva-arkki.png + video: avauskulma, laaja/kierto, `kiina kamera
  ele` → kamera pelaajalla → 4 s → jatkuu ilman nykäystä, taistelu → PT 3 riviä (video, arkki, havainnot). Oma haara pelikoodari/
  kiina-kertova-kamera 54fc4a3fe on vanhentunut (KS:n paketti korvaa).

## 2. FFT-MERI SÄVY 2 (omistaja 11.08 "sinivihreämpänä"; PT: kuvapari ennen omistajaa, iPhone-mittaus JU:lla PT:n hyväksynnän jälkeen)
- 11.4x-pari (96b3dd73b): sauma POISSA, nousun vaihto ja rannat OK, mutta sävy tumma (FFT 16/25/34 vs laatta 20/52/57).
- Sävy 1 b00d77e26 (_Vesi × _Valo) ei auttanut: laatan sinivihreä tulee Sentinel-kuvasta, ei _Vesi-täytteestä (12.2x: FFT 6/24/35).
  12.21-ajo (742332f48) PILALLA: kuorma 60 (xcodebuild) → tahti ja ms eivät kelpaa.
- Sävy 2 **741eb6e1a** (pelikoodari/fft-meri, peili pushattu, tarkista.sh 0): runko = ValoKohteet.MeriRunko (0,024/0,11/0,12 lin.) × _Valo,
  taivaan heijastus 0,5; QA `linssi raketti meri runkovari r g b` (lin., ilman käännöstä) ja `runko|taivas 0–1`.
- JU kääntää 741eb6e1a → _tyo/pelikoodari/raketti-meri-200-app, simu ~7 min L2 pidossa (ei rinnakkaista xcodebuildia). Ajo:
  `APP=/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/raketti-meri-200-app/Matkakirja3D.app SHA=741eb6e1a UDID=96044270-92AA-4BD3-BE2D-772C8495AB19 zsh /Users/Shared/Claude/proto-3d/tyokalut/pelikoodari-ajot/ajo-raketti-meri-200.zsh`
  → `python3 /Users/Shared/Claude/proto-3d/tyokalut/pelikoodari-ajot/kooste-raketti-meri-200.py`. Mittaa sävy:
  `python3 /Users/Shared/Claude/proto-3d/tyokalut/pelikoodari-ajot/savy-raketti-meri.py <arkki0> <arkki1>` (tai rajaa avauskuvan meri, ruutu 2 x 430–560 y 560–680) – tavoite ≈ laatan 20–25/52–59/57–61.
  Jos yhä pielessä: säädä simulla runkovari ja vie arvo ValoKohteet.MeriRunkoon. Tarkista myös lokista KUORMA-rivi (ms vain ilman kuormaa).
- Kuvapari OK → PT 3 riviä (_tyo/pelikoodari/raketti-meri-200/raketti-meri-rinnakkain.mp4, arkit, ms). Laitekäännös 741eb6e1a:sta (tai uudesta).

## 3. TIVOLI PYSÄYTETTY (omistaja 12.20 PT/LR) – ÄLÄ JATKA
- Lento, laskeutuminen, lähitarinat, äänimaisema ja 3D odottavat; Tivoliin vain kuvia (LR). Haara pelikoodari/tivoli-vapaa-lento-200
  kärki 841dc1e0d (PYSÄYTETTY-merkintä) sisältää d68929639 (LR:n arvot 35–150 m, lasku 55.67470/12.56898 45 m, lähisäde 50),
  309ddc469 (karuselli 55.67318/12.56807), f584735bd (OsioAanimaisema + ElavaKaupunki, manifest-v2 laiskana). Ei masterissa eikä junissa
  (tarkistettu). JU perui käännöksen. Vertailuajo vanhoilla arvoilla: lokit/todistus-tivoli-200-20261017-1211 (möykyt laskussa).

## Muut
- Worktreet: uusi proto-pelikoodari-kiina-kertova-kamera (vanhentunut, poistettavissa kun KS:n paketti junassa). _tyo/pelikoodari:
  raketti-meri-200-app, tivoli-200-app (pysäytetty → poistettavissa), yhteis-199-app poistettu.
- Skenaariot: tyokalut/pelikoodari-ajot/sk-kiina-kamera-200.txt, sk-tivoli-200.txt (+ ajo-*.zsh).

## Aloitusviesti uudelle Pelikoodarille
"Olet Pelikoodari (Opus, high). Lue CLAUDE.md ja docs/raportit/viesti-pelikoodari-luovutus-20261017-iltapaiva.md (haara
pelikoodari-luovutus-20261014-paiva). Ensin Kiinan kamera-ajo KS:n appilla JU:n SIMU NYT -luvalla (~12.40), sitten FFT-meren sävy 2 -pari
(741eb6e1a) → PT. Tivoli on pysäytetty."
