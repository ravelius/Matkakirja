# Pelikoodarin luovutus 17.10.2026 keskipäivä (KOVA RAJA 37 %, Postivahti, klo 11.27)

Rooli Pelikoodari (Opus, high), checkout /Users/Shared/Claude/Matkakirja-pelikoodari (haara pelikoodari-luovutus-20261014-paiva), proto-git
/Users/Shared/Claude/proto-3d/Matkakirja-proto (haarat pelikoodari/<aihe>, worktreet /Users/Shared/Claude/wt/proto-pelikoodari-*, peili
natiivi-backup peili/proto/<haara>). Edellinen luovutus -20261017-aamupaiva (c5351e1c9).

## Lue ensin
- CLAUDE.md, Raamatun Ydinajatus kohta 2, tämä raportti. Viestit `send_message` session id:llä osoitekirjasta
  (/Users/Shared/Claude/osoitekirja.md): PT local_5df52e10-…, JU local_5cb16c00-…, NS local_674b9ec4-…, LR local_996d60ab-…, Postivahti local_a24c43c0-….
- Simu iPhone 96044270-92AA-4BD3-BE2D-772C8495AB19 vain JU:n "SIMU NYT" -luvalla, "SIMU VAPAA" heti. Käännökset JU:n kautta (L2).
- Ennen käännöspyyntöä `zsh tyokalut/tarkista.sh` (0). Linssit-testit: `sh Linssit-testit/kaanna.sh <nimen osa>`.

## 1. ENSIN: OMISTAJAN PÄÄTÖS 11.08 (PT): FFT-MERI PELIIN, "Kyllä, sinivihreämpänä (Suositus)"
Neljä kohtaa: (1) sävy lähemmäs nykyistä sinivihreää, (2) "Korjaa meren raja alussa. Näkyy vanha meri ulompana ja sitten vasta se uusi
meri sisempänä" (3 km:n sauma), (3) kuvapari samasta kohdasta ja samassa tahdissa → PT, (4) oikea iPhone-mittaus ennen junaa.
- **Tehty:** proto pelikoodari/fft-meri **d0063697c** (191b2e8d8:n päällä, peili pushattu, tarkista.sh 0, Meri-testit 13/13):
  - Sävy: ValoKohteet.MeriSyva (0,005/0,040/0,058), MeriSironta (0,02/0,11/0,10), MeriLaatta mitatusta laattamerestä (avaus sRGB 16/34/48;
    FFT oli 16/23/31).
  - Sauma: avauksessa kamera 4,8 km korkealla 7,6 km:n päässä → 3 km:n rengas näkyi. RakettiMeri.SadeM 30 km (kaista 6 km) myös
    kaukolaatassa (kaukoAine saa _FftMeri + _FftKaari = kaarevuuden palautus veden ylärajaan), verkko 45 km, kärjissä maan kaarevuus
    r²/2R kuten RakennaKauko. Nousussa vaihto laatan mereen hajontana raketin korkeudella 4–6 km (_FftMeri.x / _Alue.w = osuus).
  - Tahti: sk-raketti-meri-200.txt odottaa nyt "raketti: lataus valmis" ennen video-alkua (edellisessä ajossa MERI=0 latasi 19,9 s, MERI=1 0 s).
- **Käynnissä:** JU:n L2-käännös d0063697c alkoi 11.26 → /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/raketti-meri-200-app/ (korvaa
  a8bc96819). Simu 2 × 5 min NUI:n jälkeen (~11.50), JU antaa SIMU NYT.
- **Seuraava:** SIMU NYT → `APP=/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/raketti-meri-200-app/Matkakirja3D.app SHA=d0063697 UDID=96044270-92AA-4BD3-BE2D-772C8495AB19 zsh /Users/Shared/Claude/proto-3d/tyokalut/pelikoodari-ajot/ajo-raketti-meri-200.zsh`
  (taustalle, ~7 min) → SIMU VAPAA JU:lle → `python3 /Users/Shared/Claude/proto-3d/tyokalut/pelikoodari-ajot/kooste-raketti-meri-200.py`
  (SIIRTO0=0 nyt, kun tahti on sama; video + kooste.txt _tyo/pelikoodari/raketti-meri-200/). Katso kuva-arkeista ENNEN PT:tä: sauma
  avauksessa (m1/m2), sävy, rannan ja maan reunat (vettä maalla = vesiF/ylärajan vika kaukolaatassa), nousun vaihto (m6/m7).
  PT:lle 3 riviä: video, kuva-arkit, ruutuajat (simu ≠ laite).
- **iPhone-mittaus:** laitekäännös kulkee NS:n kautta; JU kysyy PT:ltä tekijän ja ajan. Ei junaan ennen mittausta.
- Jos sauma yhä näkyy: `linssi raketti meri sade <m>` (500–40000, kaista 20 %); sävy ValoKohteet.Meri*.

## 2. TIVOLIN VAPAA LENTO (PT, omistaja 09.59; meren jälkeen) – EI JUNAAN ennen kuvaparia PT:lle
- proto pelikoodari/tivoli-vapaa-lento-200 **0b6427f17** (juna/b27:n päällä; 033e759fa + laatikko OSM-raja + Nimb LR:ltä; peili pushattu;
  koko Linssit-testit 1993/1993, tarkista.sh 0):
  - Ydin: VapaaLentoOsio (data Resources/Opas/osio-tivoli.json: laskeutuminen 55.6747/12.5694, 30 m, 4 s, katse 203° Himmelskibetiin;
    6–120 m, 2–14 m/s, kehät 8/20 m, laatikko lat 55.6718–55.6751 lon 12.5653–12.5718 + 40 m palautus Liikepohja.Jousella, lähisäde 35 m,
    6 tarinaa SK:n tekstein, järvi r 60 m). OpasVapaaLento.Osio (rajat osiosta, kaupunki ennallaan), OpasValys.ValysNyt/LahiSadeNyt,
    OpasSilmukka.AloitaOsio/LopetaOsio/OtaOsioTarina (Jatka kierrosta: kehys pelaajan paikalle, loppu nousee sieltä). Testit VapaaLentoOsioTestit 7.
  - Unity: OpasSovitin.Osio.cs (OsioPaivita ennen PalloPaivitaa; loppu odottaa OsioPidattaaLopun), KierrosJatkettavissa/JatkaKierrosta
    osiolle (OpasValikon nykyinen Jatka kierrosta -rivi, ei uutta UI:ta). Järven tarina isoisän äänellä (PT 11.1x:
    https://media.matkakirja.app/aanet/tivoli-v1/tivoli-lahitarina-jarvi.mp3), muut tekstinä chattiin.
- **Seuraava:** käännös JU:lta → simu: Kööpenhaminan kierros, `opas hyppy Q110289`, kerronnan jälkeen loki "opas: osio tivoli:
  laskeutuminen", kuva laskeutumisen jälkeen + lennosta (`opas vapaa 0 1 0 0 <s>`), lähitarina-rivit, `opas jatka` → loppu. Tarkista
  videosta laskeutumisen silmän nopeus (4 s:n raja voi antaa > 100 m/s, jos pysäkin kamera on kaukana) → kuvapari PT:lle.
- Tuotantopohja docs/moduulit/tuotantopohjat/vapaa-lento-osio.md: haara pelikoodari-vapaa-lento-osio **91ba4c754** (oma ee8b4061c + LR:n
  täydennys, pushattu). LUONNOS, ei PR:ää; PT päättää.

## Muut
- Worktreet: 11 junaan 199 mennyttä poistettu (vieritys-198:n hakemistoon jäi .DS_Store). Jäljellä mm. antimeridiaani-200, valoisa-kohde-200,
  latauskuva-esilataus-200, seuraa-199, kiina-*, laukaisin (peruttu), yhteis-198, fft-meri, tivoli-vapaa-lento-200; docs-wt pelikoodari-vapaa-lento-osio.
- LR:n Tivoli-GLB-tilaus: PK hyväksyi solmurakenteen lisäehdoin (samat nimet kaikissa LODeissa, +Y-akseli, lamput extras [x,y,z,r,g,b],
  rata_suljettu), LR lisäsi luonnokseen.
- _tyo/pelikoodari: yhteis-199-app, raketti-meri-200-app (≤ 2). Levyä ~36 Gt.

## Aloitusviesti uudelle Pelikoodarille
"Olet Pelikoodari (Opus, high). Lue CLAUDE.md ja docs/raportit/viesti-pelikoodari-luovutus-20261017-keskipaiva.md (haara
pelikoodari-luovutus-20261014-paiva). Ensin FFT-meren tahdistettu kuvapari JU:n SIMU NYT -luvalla (käännös d0063697c) → PT, sitten Tivoli."
