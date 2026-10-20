# Laitetestaaja: luovutus 20.10.2026 klo 17.2x (Postivahti pyysi, konteksti 41 %)

## Tila: LEPO, KAIKKI iPad-AJOT ODOTTAVAT KK:n VAPAUTUSTA
Ei käynnissä olevia ajoja eikä taustaprosesseja (kaikki skriptit päättyneet 17.14, konsoliprosessit tapettu, ei simuja: oma simuni poistettu). iPad Pro 13 M1 (00008103-001819421413401E, pariliitetty) on **omistajan käytössä** (KK 17.06: omistaja pelaa ja "iPad jäätyy juoksupelin aikana").

## PYSYVÄ SÄÄNTÖ (PT 17.1x, sitova)
Ennen JOKAISTA asennusta ja käynnistystä isolla iPadilla tarkista viimeisin KK:n tai PT:n vapautus. Vanha lupa ei riitä, jos sen jälkeen on tullut KK:n viesti omistajan pelaamisesta. Jos laitteessa on auki Matkakirja3D-prosessi (`xcrun devicectl device info processes --device $U | grep Matkakirja3D`), jota et itse käynnistänyt, oletus: se on omistajan. `--terminate-existing` sulkisi hänen pelinsä. (Rikoin tämän 17.03–17.14: ajoin f861b6fd3-mittaukset KK:n 16.3x-luvalla, vaikka omistaja oli palannut; ilmoitettu PT:lle ja KK:lle.)

## Jono (aja vasta KK:n/PT:n vapautuksella, tässä järjestyksessä)
1. **Mittausappi 10e6a5a68** (NS 17.14, ⊃ e10aebfc9 jäätymiskorjaus ⊃ a53817ef2; korvaa e10aebfc9:n): `/Users/Shared/Claude/proto-3d/lokit/natiiviseppa-app-208-jaatyminen-10e6a5a68-laite/Matkakirja3D.app`. PK:n sarja raskaasta kohdasta (777, ~14 s juoksusta, `ui juoksupeli valo jaady 1`), kukin 10 s, gpuMs + p50/p95: **P0** oletus; **P1** `valo skaala 0.8`; **P2** `valo msaa 2`; **P3** skaala 0.8 + msaa 2 (suositus); **P4** P3 + `valo sumea 0`; **P5** P3 + `valo syva 0`; **P6** P3 + `valo liike kamera`. Palautus: skaala 1, msaa 4, sumea 1, syva 1, liike kappaleet. Sitten **J** (25 s alusta, P3-asetuksin) + kuvapari P0/P3 samasta ruudusta (terävyys, mittari `/Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/tyokalut/vyoero.py paalla pois`; ehto Puyi + lähikorttelit ≥ 95 % pois-kuvasta). Raportoi myös yli 100 ms:n ruudut ja konsolin "aarre … paikalleen" -rivien ajat. Taulukko `/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/gpu-208/lt-10e6.txt`, rivi PK:lle (local_11aca9cd-eda6-4db9-9019-8a153c8b8795) + VS:lle (local_e675f86d-210c-416b-8d83-926194307a44) + PT:lle.
2. VS:n kierrokset 2 ja 3 (`varjot-koko/lt-gpu-komennot-2/-3.txt`) vain jos PK pyytää (PT antoi GPU-vedon PK:lle). Vanhat PK:n a53817ef2/e10aebfc9-sarjat (X1–X4, M1 = `ui lampo kuuma` oli tuntematon komento) on korvattu jonon kohdalla 1.

## Mitattu tänään (iPad Pro 13 Release, sokkelo botti siemen 777; aineisto proto-3d/lokit/laitetestaaja-*-ipad-20261020/, taulukot RAPORTTI.md alin osio + varjot-koko/lt-gpu-tulos.txt)
- 206: 0,5 s:n jaksollinen nykäys (Lasipohja/KehysNapit); korjattu 207-lasihaulla b8198b4e (runko 8886657d4 ja 208-runko df83610ab: 0 pitkää ruutua, GPU 9,7).
- Syväterävyys (yhteinen16 385125259): GPU +0,5–0,65 ms, mutta terävyys päällä/pois 9–23 % joka vyöhykkeellä (KK:n ehto ≥ 95 % ei täyty); DoF jäi pois junasta 208.
- 208-yhdistelmä aec730d95 (VS juoksu-208 + PK halli): GPU 10,4, 60 fps. SSAO oli +20 ms:n syy (cd3502cfe pois).
- **Raskas kohta (~14 s juoksusta, iso piha)** GPU 34–45 ms (cd1391001 → f861b6fd3): varjot EIVÄT syy (−0–3 ms); farClip 400 −7…−9,5; jälkikäsittely pois −11…−12,5; yhdessä (b6e253a6d) 34,5 → 10,3 ms; `kauko kaikki` +5; kokoluokat/sirpaleet (0f505827c, f861b6fd3) eivät auta. Liikkeessä GPU 21–24 ms, 83–118 ruutua > 25 ms/25 s. Kauko-rivi (kerroin 1): 2413 kohdetta, 10042 piirtäjää, 9,2 M kolmiota; L4 (1000 m) 2/3.
- Kontrolliajojen vaihtelu ±3 ms; kaikki ajot Release iPad Pro 13, lämpö 0.

## Menetelmä ja sudenkuopat (skriptit: docs/raportit/laitetestaaja-pelaaja-tyokalut-20261020/ — ajo-ipad-f861.zsh täydellisin, ajo-ipad-pk2.zsh = vaihesarja, ajo-ipad-varjo2.zsh = A–H)
- Asennus `xcrun devicectl device install app --device $U <.app>`; ajo = skripti, joka kirjoittaa komentotiedostot sovelluksen Documents-kansioon (`devicectl device copy to … --domain-type appDataContainer --domain-identifier fi.matkakirja.peli.kehitys`): `ui-komento.txt` (`ui …`, luetaan ~1 s välein, **jätä 2,5 s peräkkäisten ui-kirjoitusten väliin, muuten edellinen ylikirjoittuu**), `komento.txt` (`mittaus alku <n>`/`odota`/`mittaus loppu` → Documents/mittaus-<n>.txt raaka ms; `kuva <n>` → <n>.png 2048×2732), `peli-komento.txt` (`uusi-peli 5 amsterdam`), `muisti-tarkka.txt` (1000 → muisti-tarkka.log).
- Käynnistys `devicectl device process launch --terminate-existing --console` taustalle; **älä tapa konsoliprosessia (kill) ennen kuin kaikki mittaukset on ajettu: se päättää myös sovelluksen** (menetin kerran SSAO-ajot).
- Sokkelo: `ui juoksupeli botti 1; ui juoksupeli v4`, odota ~25 s, `uudestaan 777`. **Jäädytys on `ui juoksupeli valo jaady 1` (ei `ui juoksupeli jaady 1`: se ei jäädytä).** GPU-ms: `ui lasi mittaa N nimi` (konsolirivi "ruutuaika"). Analyysi `python3 -I /Users/Shared/Claude/proto-3d/tyokalut/natiivi-ui-ajot/ruutuaika-analyysi.py nimi=mittaus.txt …`.
- Muisti: `muisti-tarkka.log` rivit `N <ms> fp <Mt> vapaa <Mt>`; viimeisin huippu 3,1–3,6 Gt, pienin vapaa 1,5–2,0 Gt, ei jetsameja.
- Scratchpad tyhjenee session vaihtuessa: kopioi skriptit docs/raportit/-kansiosta.
- Näyttötallennetta fyysisestä iPadista ei saa (ei kaappauslaite): käytä `kuva`-sarjaa (32 kuvaa/16 s) + ffmpeg `-framerate 2`.
- Kuvat täysikokoisina, kuvateksti omalle raidalleen (`docs/raportit/laitetestaaja-pelaaja-tyokalut-20261012/merkitse.py`); terävyysparit vain vyoero.py-luvuin, ei silmäarviota (PT 02.3x).

## Muut pysyvät
- iPad Pro 13: vain KK:n/PT:n vapautuksella (yllä). Omistajan iPhonea ei käytetä. Simu vain JU:n "SIMU NYT" -viestillä; oma luotu simu poistetaan ajon jälkeen.
- Laitekierros ennen ulkoista TF-jakoa (Raamattu 9.11): pohja `docs/raportit/laitekierros-tarkistuslista-pohja.md`; juna 206 iPad+simu ajettu (löydökset RAPORTTI.md).

## Kanavat
PT "PÄÄTOIMITTAJA (Opus, medium)" local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31; KK local_8e4fcfed-fc40-464c-854a-1d031b005332; PK local_11aca9cd-eda6-4db9-9019-8a153c8b8795; VS local_e675f86d-210c-416b-8d83-926194307a44; NS local_fcc10552-5810-49bf-b0cf-188456f1231c; JU local_24e63224-112c-449a-b6a3-e10e4ed43f4b; NUI local_c6d63773-0270-4873-96f8-63c66cf52794; Postivahti local_0a4f4c68-d24d-4b1f-83d7-d3c098cec96b. Viestit vain valmis erä/jumi/kysymys.
