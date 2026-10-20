# Valoseppä – luovutus 20.10.2026 klo 09.50 (Postivahdin KOVA RAJA 35 %)

Luovuttaja: Valoseppä (Opus, high). Id:t /Users/Shared/Claude/osoitekirja.md: PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31 (≤ 3 riviä),
KK local_8e4fcfed-fc40-464c-854a-1d031b005332 (kuvaparit, kopio PT), JU local_24e63224-112c-449a-b6a3-e10e4ed43f4b,
NS local_fcc10552-5810-49bf-b0cf-188456f1231c, PK local_11aca9cd-eda6-4db9-9019-8a153c8b8795, LS local_7a457b99-7ecd-4634-93a0-0c02b53e8d24,
Lavastaja local_cd402541-241c-4e2a-99e7-70bd8daa1c35, Postivahti local_0a4f4c68-d24d-4b1f-83d7-d3c098cec96b.
D=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2 (päiväkirja $D/JONO.md – lue loppu ensin). Proto-wt /Users/Shared/Claude/wt/proto-linssiseppa2-jalki
(haarat paikallisia; nyt checkoutattuna linssiseppa2/louvre-valo-208). Simu vain JU:n SIMU NYT -viestillä, perään SIMU VAPAA.

## 0. ENSIN: LOUVREN VALO -ERÄ (PT 09.3x, omistaja 09.33 Kallioluolan madonnasta iPadilla)
Omistaja: "Taulun ympärillä on luonnottoman näköinen valokehä. Tuollaista valoa ei voi olla todellisessa museossa."
KK:n tavoite: tasaisen valoisa seinä, taulu tasaisesti valaistu, EI kehää (myös tummat salit: Romantiikan punainen kehä otsikon
kohdalla), kehyksen alla luonnollinen pehmeä varjo. Todiste KK + PT: Kallioluolan madonna + Horatiusten vala, iPhone + iPad, ennen/jälkeen.
- SYY (tutkittu): EI leivottu. sali-v2q:n atlaksessa seinät ovat tasaisia (keilat vain lattioilla ja katoissa; tarkistettu UV1 → materiaali
  → normaali). Kehä = pysähdyksen salin himmennyksen KOROSTUSLAATIKKO (MuseoValaistu.shader: _MuseoHimmennys/_MuseoKorostus*, laatikko
  8 cm + 14 cm pehmeä reuna kehyksen yli jää kirkkaaksi, muu sali 70 %:iin → kirkas suorakaide seinässä + otsikon kohdalle puolihimmeä
  juova) + kohdevalokartion kiilto seinässä (spot-silmukan spek-termi pystypinnoilla). LS:n vertailukuva lokit/louvre-kehykset-208/
  kehykset-v2-peli-vs-louvre-ipad-1.jpg (Mona Lisa, Kallioluolan madonna) näyttää kehän.
- KORJAUS: proto linssiseppa2/louvre-valo-208 **ef8489157** (natiiviseppa/juna-208 2ac71852f päällä): globaali _MuseoSeinaTasainen
  (MuseoPaivanvalo.SeinaTasainen; Louvren avauksessa 1, Pois() → 0, muut museot ennallaan): seinät ja lattiat (_Valokerroin < 1, ei
  _TeosKeski eikä _TeosN) himmenevät tasaisesti ilman laatikkoa, kohdevalo ei kiillä pystypinnoissa. Teos ja kehys ennallaan. QA
  `linssi museo seinatasainen 0|1`. Lisäksi kattoikkunavalo myös da, mo, on, ig (oikeassa lasikatto; mm ja rb sivuikkunat; Commonsia EI
  tarkistettu, oma tieto): MuseoPaivanvalo.Osat, MuseoKattoikkunat.Enintaan 8 → 16 (varjostimen taulukot 16), nauhan palat ≤ 5.
  Testit Linssit 2165/2165 (+ MuseoKattoikkunaTestit.LasikattoisetOsatMahtuvat), unity-tarkistus 0, valovahti ok. Merge LS:n
  linssiseppa/louvre-kehykset-208 kanssa puhdas (LS: shader vain kaari-discard-rivi; MuseoRakennus.cs ja sali.json ovat LS:n).
- TILA: JU kääntää ef8489157 L2:lla → _tyo/julkaisija/louvre-valo-208-app. Simujono LS → NUI teoskortti → minä (SIMU NYT erikseen).
- AJO (valmis): `zsh $D/louvre-valo/aja.zsh <käännöksen sha>` (skenaariot $D/louvre-valo/sk-louvre-valo-{iphone,ipad}.txt = LS:n
  sk-kehykset-208:n alku + louvre-inv-777 ja louvre-inv-3692, S1 = seinä tasainen, S0 = ennen; parit $D/louvre-valo/parit, parit.py
  "S"). Katso parit täysikokoisina: onko kehä poissa, jääkö kehyksen alle pehmeä varjo, onko seinä liian tumma pysähdyksessä
  (himmennys nyt koko seinään 70 %). Sitten parit KK:lle (kopio PT) ja SIMU VAPAA JU:lle.
- KUN KK OK: kerro LS:lle (hän mittaa kehysten kullan sävyt uudelleen uudella valolla, 1 simukierros) ja PT:lle "PT OK?" → NS.
- Jos kehä näkyy yhä: seuraava epäilty on kohdevalon HAJAOSA ei-atlaspinnoilla (hajaSpot = 1) tai MuseoRakennuksen teoskohtainen
  korostus; kokeile `linssi museo himmennys 0` (erottaa laatikon) ja katso _MuseoSpotP/D puolikulma (sali.json teospaikat.valokeila
  puolikulma 8,9°, reunahäivä 0,35).
- HYLÄTTY: atlaksen keilojen poisto kuvankäsittelyllä ($D/louvre-valo/tasaa_seinat.py) – tummensi seiniä väärin, eikä keiloja ollut seinillä.

## 1. MUUT HAARAT JA TILA (proto)
- PALATSIN PINNAT v2 (KK OK 08.4x, PT OK 208): linssiseppa2/pinnat-208 1dfc80671 (⊃ simuttu 613212163 + v2-maa) → NS:llä PIDOSSA,
  junaan yhdessä PK:n palatsi v2:n kanssa (PT 08.5x, ei toimia minulta). Paletti _JuoksuPaletti (QA `valo paletti 0|1`): punainen
  ×0,87/0,77/0,93, kate ×0,86/1,00/1,38 (albedopaletti, ei valopoikkeusta – PT OK). KK: katon harjat EI okraa pidemmälle
  (keisarinkeltainen auringossa). Laji 16 marmori (V4_marmori/V4_marble). Ämpäri sokkelo-pinnat-v2 viety (JU 07.58).
- KK-VEDET: linssiseppa2/kk-vesi-208 32a3c10a7. Palatsi v1-ruudukossa omat vesiverkot (JuoksuVesi + MaaReiilla, testit 671/671);
  palatsi v2:ssa (PK cbb1e82c0, oletus) vedet tulevat Lavastajan laatoista (V4_vesi y −2,25 → laji 15), minulta vain LuoMaaV2 (maa +
  reikä tausta.json-palojen alueella, HorisonttiY −4,5). PK on mergennyt molemmat haaraan pelikoodari/palatsi-208 a56e22c61
  (kulma PT:n päätöksellä 2,0335°). Palatsi v2 -todiste tulee PK:n palatsi-simusta (_tyo/pelikoodari/palatsi-208v2-app); oma
  skenaario $D/sokkelo/sk-pinnat208.txt (v2, mallit file://$D/palatsi-mallit/ symlinkeillä) tarvittaessa.
- juoksu-208 f4f6a4317 (SSAO pois + vesiuoma k5) junassa 208; LT mittasi aec730d95: GPU +0,7 ms vs 207, 60 fps (PT 07.5x).

## 2. AVOIMET
- Tulivuoret k13 ja pimennys L1 PIDOSSA; rakettivideo yöllä kun kone vapaa.
- Sillan heijastus (palatsin vaihe 4, KK:n ehdotus peilattu tummennettu sillan kopio) → ehdota PT:lle kun vaihe 4 alkaa.
- Worktreet: proto-linssiseppa2-jalki (kaikki), -sumea206 (mergetty → poista), -juoksuvalo, -nostot, -tulivuoret, -pimennys,
  -rakettivideo, -mrivi.

## 3. OPIT
- Museon "valokehä" ei välttämättä ole leivottu: tarkista atlas UV1 → materiaali/normaali ennen kuvankäsittelyä (keilat olivat lattioilla).
- Valovahti lukee globaalin nimestä (Savy/Valo/Taivas…): albedopaletti nimetään paletiksi, ei sävyksi.
- JU poistaa vanhan .app:n ennen uutta käännöstä samaan kansioon → pyydä uusi kansio, jos ajo on käynnissä.
- Palatsin kehys: JuoksuPalatsi.Maailmaan(x, z, y) → Unity (X, Y, −Z) on kierto (ei peilausta), kolmioita ei käännetä.
- Python numpy/scipy: /opt/homebrew/bin/python3 ilman -I:tä (-I piilottaa site-packagesin).
