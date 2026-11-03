# Natiivisepän luovutus 3.11.2026 klo 15.56 (7.37)

Vain voimassa oleva tila. Korvaa luovutuksen viesti-natiiviseppa-luovutus-20261103-1518.md.
Id:t: /Users/Shared/Claude/osoitekirja.md. Ei keskeneräisiä mergejä eikä omia käynnissä olevia ajoja. Cron Unity-beeta luotu tässä
sessiossa (10c38ac7) – nollauksen jälkeen luo uudelleen ("4 9 * * *", muisti unity67-paivitysseuranta).

## TEHTY TÄLLÄ VUOROLLA (kaikki proto-haarat peilissä natiivi-backup, tarkistus 0 virhettä)
1. **ASTC laitetodistus kuitattu** (PT 15.5x): 6a7af2d9d isolla iPadilla oikein päin, ei varapolkua (JU, lokit/julkaisija-pariisi-tarkistus-20261103/iso-1527/).
   "Not multiples of 4" -varoitukset ja 63/100 ms ruudut olivat vanhoja (jo 1420265d7/429b75faf): saapumisen leikepalat.
   ASTC (252c190dc + ee278af37) saa palata JU:n yhdistelmään.
2. **Leikepalat 56c06b836** (natiiviseppa/leikepurku-218, eed17074d:n päällä; PT 15.5x KYLLÄ): pääsäikeen leike- ja maskipurku 4 ms:n
   ruutubudjetilla (vähintään 1 pala/ruutu), Compress vain 4:n monikerroille. Todistus odottaa: iPad-loki varoitukset 0, pisin
   saapumisruutu ennen/jälkeen + kuvapari samasta kohdasta → PT.
3. **1b-simu c9ab58e88 + A/B** (lokit/natiiviseppa-paluu-pariisi-c9ab58e88-20261103-1543 ja -lataus64-40-40-20261103-1548, ruudut/):
   Pariisin paluu 64/40/40 selvästi terävämpi → **ad08abe9a** (natiiviseppa/lataus-oletus-218, c9ab58e88:n päällä): Pallo.unity
   _loadingDescendantLimit 20 → 64, tilesetin ja pohjan _maximumSimultaneousTileLoads 20 → 40.
   Kylmä Lontoo (lokit/natiiviseppa-esilataus-kylma-c9ab58e88-20261103-1540): näkyvät z15 vastasivat 0,2–0,8 s (ka 554 ms), kaikki
   pyydetyt valmiit ~8 s; ruudun alaosan eteläpaloja (z15 y 10900–10901) EI pyydetty 9 s:iin mennessä → alaosa sumea. Syy Cesiumin
   valinta, ei piirto. Tarkista 64/40/40:llä (uusi oletus) ennen lisätoimia.
4. **Pariisin pohjoiset rakennuslaatat 582fc208e** (natiiviseppa/rakennus-haivytys-218, eed17074d:n päällä): syy tasoraja Z13|Z14
   laajassa näkymässä (~22 km); Z14:n rakennukset 50 % peitolla, Z15–17 ennallaan, välimuisti vain Z14:lle uusi (e14-z14r50).
   Komento `elavakartta rakennukset z14 <0–100>`. Odottaa kuvaparia p1-laaja 100 vs 50 iPadilla. EI korvaudu B:llä (Saint-Denis on
   piirroksen ulkopuolella).
5. **Omistajan Pariisi 15.3x (PT 16.0x, suunnitelma Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261103-pariisin-piirros-zoom-ja-reunat.md)**:
   - A (lähin zoom ~1,75 km) = KS:n 9d1ce79e5 (PT 16.1x); oma A poistettu.
   - **B 3ab522752** (natiiviseppa/pariisi-zoom-reunat-218, c9ab58e88:n päällä, yhdistyy 9d1ce79e5:n kanssa ilman ristiriitoja):
     varjostimessa kankaan ulkoreunasta 1 200 m:n pehmeä häivytys (uv2 + _ReunaUV; veneet/tähdet ennallaan); striimi tauolla vain kun
     reunan sisäpuolinen osa (lähitason alueet) peittää koko ruudun → muuten tavallinen kartta piirroksen ympärillä; korkeushäivytys
     25–60 → 20–34 km (saapuminen ~19 km täysi, ~32 km ≈ 6 %), PalautusKorkeusM 16 km. Komennot `karikatyyri reunat on|pois`
     (pois = ennen) ja `karikatyyri reuna <m>`. Testi ReunatJaYmparoivaKartta, Piirros 8/8. Varjostinta EI ole käännetty Unityssä
     (tarkistus kääntää vain C#:n) → ensimmäinen käännös varmistaa.
6. Pieni iPad cb1b5d9fc kaatui kuvaa avatessa 15.34: ei .ips:ää eikä JetsamEventiä, ASTC ei mukana → ei natiivipuolta; NUI katsoo.

## JONO
0. **iPad-todistus JU:n vuorolla** (yhdistelmä PT:n kuittauksella: ad08abe9a + 3ab522752 + 9d1ce79e5 + 56c06b836 + 582fc208e + ASTC):
   Pariisi lähin/keski/laaja samoista kohdista kuin omistajan kuvat (docs/raportit/kaappaukset/omistaja-20261103/pariisi-piirros-*-1540.webp)
   + vierityksen ruutuajat `karikatyyri reunat on` vs `pois` isolla iPadilla (muista kahden kartan piirto) → PT ≤ 3 riviä.
   Jos vieritys hidastuu liikaa: piilota piirroksen alle kokonaan jäävät pallon renderöijät (EI kerma-palaa Laattapalvelimelle:
   Cesium pitäisi sen muistissa ja häivytyksessä näkyisi beige reikä).
1. Vieritysmittaus isolla iPadilla ASTC:llä (PT 15.1x): 0,27 s Compress-nykäys poissa? (JU ajaa, tulos → PT).
2. Saapumiszoomin alaosa (PT 16.0x järjestys B:n jälkeen): kylmän Lontoon eteläpalat 64/40/40:llä uudelleen.
3. 63 ms "PiirrosKerros"-ruutu saapumisessa (Paivita, ei purku; iso-1527/konsoli.txt rivi 400) – selvitä, jos toistuu.
4. Jos Lontoo yhä sumea > 1 s isolla iPadilla: z17-kohtainen SS 4 → 3 (näkyvä → kuvapari PT:lle).
5. Osa D (20 ms ruutuvahti + muistimittaus isolla iPadilla) kun NUI:n A+C rungossa. iPhone vain PT:n luvalla.
6. GC-haara runkoon vasta PT:n luvalla (2856c5cc3, natiiviseppa/gc-mvt-218). Merget PT:n kuittausten mukaan.
7. Odottavat ennallaan: UITK-sumennuksen liuku (+1 Gt) PT:llä; LAV rakennukset-v95 ei runkoon ennen PK:n korjausta; NUI:n leikehaara
   7280634c4 EI; KS:n tasankoresepti; Z11–Z12-välitasoa EI. Osa C (luoteispala) on KS:n/Codexin.
8. Jono tyhjä → rivi PT:lle "JONO TYHJÄ: Natiiviseppä".

## TILA
- Asennettu iPadeille: cb1b5d9fc (= 429b75faf − 252c190dc). JU:n uusin yhdistelmä c9ab58e88 (= eed17074d + NUI 6119d4a12).
- Omat haarat (proto): lataus-oletus-218 (ad08abe9a), pariisi-zoom-reunat-218 (3ab522752), leikepurku-218 (56c06b836),
  rakennus-haivytys-218 (582fc208e), nakyva-ensin-218 (7d122e1d1), piirros-astc-218 (ee278af37), astc-laite-218 (6a7af2d9d),
  saapuminen-ruutu-218, loppurajaus-218, lontoo-z15-218, astc-mittaus-1420265d7; yhdistelma-1b-218 vanhentunut.
- Uudet worktreet: wt/proto-natiiviseppa-lataus, -pariisi, -leike, -rakennus (+ -nakyva, -astc). Älä poista.
  Juna 218 runko = 1420265d7 (wt/proto-natiiviseppa-ehdokas, haara natiiviseppa/juna-218).
- Paluuskripti: _tyo/natiiviseppa/lahto-tulo/paluu-pariisi.zsh (LATAUS="a b c"), yhdistelma-simu.zsh (LATAUS_B = toinen paluu).
- iPad-lukko: proto-3d/Matkakirja-proto-esikatselu/tyokalut/ipad-lukko.sh; simu-lukko.sh on proto-3d/tyokalut/. Molemmat 75, jos varattu.
- Laatta-/tekstuurimuutokset tarkistetaan oikealla iPadilla, ei vain simussa (PT 15.1x).
- Testit yksi kerrallaan: `EI_PEILIA=1 nice -n 15 zsh /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna210/testit210-rinn.sh <työpuu>`;
  Kartta-testit `sh Kartta-testit/kaanna.sh [nimi]`; tarkistus `zsh tyokalut/tarkista.sh` (zsh!). Älä aja tarkistusta simun aikana.
- Worktreet: ÄLÄ poista ehdokas, -tyokalut, -varjo, -saapuminen, -gcmvt, -esilataus, -introkoe, -nakyva, -astc, -lataus, -pariisi,
  -leike, -rakennus eikä T7-kopioita. natiiviseppa-luovutus-20261103-1310, -1350, -1457, -1518 ja -1556 saa poistaa mergen jälkeen
  (tools/uusi-worktree.sh --poista <nimi>).
