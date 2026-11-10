# Pelikoodari: luovutus 10.11.2026 klo 05.10

Korvaa kaikki aiemmat. Edellinen: `git show 117f9f222:docs/raportit/viesti-pelikoodari-luovutus-20261110-0415.md` (hoidettu tai alla).
Kuvat ≤ 1000 px, laajat haut Sonnet-agenteilla. Viestit send_messagella session-id:llä. Unity-työpuu /Users/Shared/Claude/wt/proto-pelikoodari-juoksu
(NYT haaralla pelikoodari/juoksu-tahdistus = f82399238; juoksu-kylma = 28c92a109 ennallaan, remote natiivi-backup). Python ilman -I:tä.
Työkansiot /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/{juoksu-leivottu,juoksu-tahdistus,kulkukartta}/.

## TEHTY TÄSSÄ VUOROSSA
- MUISTI-3 (kylmä, v3 CDN tuore) 3841 Mt / 45,6 s; MUISTI-3b (lämmin) 3856 / 15,3 s; YHD-1 (PT 04.2x: kylmä + lämmin samassa ajossa;
  28c92a109 SISÄLTÄÄ jo esihaun 318b4a3d0) huippu 3818 (kylmä 3771), kylmä 38,0 s, lämmin 15,0 s, kuvat ilman valkoisia →
  JUNAEHTO TÄYTTYY, kuittausta pyydetty PT:ltä 05.0x. TULOS-muisti-3.md + TULOS-yhd-1.md (juoksu-leivottu/).
  Skenaariovika sk-ipad-yhd-1.txt: "oleta 300 kuva/glb-esihaku valmis" → PUUTE (odotti 2 × 300 s) → käytä oleta-uusi tai poista.
- 1e VÄRINÄ (omistaja 8.11. 22.32, PT 04.4x): MITATTU muisti-3/3b:n kehysajoista: lennolla ruudut 16,7/25/33 ms vuorotellen
  (p50 16,7–25, p95 21–32 ms, 42–49 fps, tavoite 60) = epätasainen kuvatahti. KORJAUS f82399238 (pelikoodari/juoksu-tahdistus juna 224:n
  77b1641de:n päällä, pushattu): JuoksuTahdistus (Peli/Juoksupeli) + JuoksupeliNakyma.Tahdista: 4/30 myöhässä → lento loppuun 40 fps
  (NakymanKatto, 120 Hz), dt päivitysväliin; ohjauksessa/suljettaessa katto pois; QA "ui juoksupeli tahdistus 0|1|<fps>";
  mittarin VENYNYT-raja 1,25 × tahdin ruutu. Testit JuoksuTahdistusTestit 4 (Juoksu 215/215), unity-tarkistus 0 virhettä.
  Varjomatkan jatkuva muutos lennossa (1d AlkuVarjoMatka, 9.11.) EI ole TF 223:n värinän syy (tuli myöhemmin), mutta mahdollinen
  varjojen uiminen: tarkista tahdistusparin kuvista/omistajan palautteesta.
- (2) KULKUPIIKKI + VALKOINEN KEISARI: piikki-0/1 (01.59/02.03, cf4d34ee4) → valkoiset puut VAIN leivotulla = 96ec56672:n korjaama
  viimeinen kuvaviite (28c92a109:n kuvissa keisari keltainen, puut vihreät). Piikkiä ei näkynyt piikkiparissa (kamera eri kohdassa).
  Kulkupari 0/1 (28c92a109, kulkukartta/sk-ipad-kulkupari-{0,1}.txt, sama reitti autopilotilla, maali-pelikamera + tuloskortti) AJOSSA JU:lla.

## JONO
1. KULKUPARI (lokit/pelikoodari-kulkupari-{0,1}): vertaa kulkupari{0,1}-maali-pelikamera ja -tuloskortti: piikki (venynyt kolmio oikealla
   reunalla) molemmissa = mallivika (etsi glb `ui juoksupeli mika x y`), vain 1:ssä = leivonta; keisari keltainen? 3 riviä PT:lle.
2. TAHDISTUSPARI (JU-jonossa kulkuparin jälkeen, käännös f82399238; juoksu-tahdistus/sk-ipad-tahdistus-{0,1}.txt → lokit/pelikoodari-
   tahdistus-{0,1}): kehysajat lennolta (`python3 kehys.py konsoli.txt A B`: 5 s:n p50/p95, ks. alla) + "juoksupeli tahdistus" -rivit;
   odotus 1: p50 ≈ p95 ≈ 25 ms. Kuvaaja (2 saraketta, p95 per 5 s) + rivi PT:lle; KK:lle tulos (1e). Junaan vasta PT:n kuittauksella.
   kehys.py: lue konsoli.txt-rivit "MATKAKIRJA kehysajat {json}", tulosta t, peitto/liike/lepo p50/p95/p99 (ikkuna lennon ajalta).
3. 28c92a109 junaan PT:n kuittauksella (JU merge). Sen jälkeen tahdistus-haara rebase/merge samaan junaan (eri tiedostot, ei ristiriitoja).
4. Jos huippu nousee taas > 3850: ensimmäisten kuvien +150 Mt (int + gfx, 171,1 → 171,5 s) = osasarjan valoatlakset / ulkorengas
   ennen ensimmäistä kuvaa (TULOS-muisti-3-valmistelu.md). ASTC 6x6 vain PT:n luvalla.
5. Paketti-v4/lattia ja kaupunki/maa-erä kuten edellisessä luovutuksessa (kohdat 3–4).

Testit: `sh Peli-testit/unity-tarkistus.sh` ja `sh Peli-testit/kaanna.sh Juoksu` (työpuussa, sh ei zsh).
Vahti: lokit/pelikoodari-*.ajo.log VALMIS-rivit (Monitor, 30 min, uudelleen tarvittaessa).
