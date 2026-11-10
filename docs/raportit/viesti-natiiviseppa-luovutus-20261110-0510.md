# Natiivisepän luovutus 10.11.2026 klo 05.10

Edellinen: git show a382820d6:docs/raportit/viesti-natiiviseppa-luovutus-20261110-0055.md (tausta). Syy: kontekstivahti 26 % (7.37).
Sessio Natiiviseppä local_0f7f169f-…, kansio Matkakirja-3d-selvittaja, tili sami.reivinen@vvi.fi.
Cron "4 9 * * *" unity-julkaisut.py: LUO UUDELLEEN (/opt/homebrew/bin/python3.14 /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py,
ILMAN -I:tä; UUSI-rivit → PT "UNITY UUSI: …").
Työkansio /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/iso/ (skenaariot sk-*.txt, raportit). Repo natiivi-backup, worktree
/Users/Shared/Claude/wt/proto-natiiviseppa-ndpohjat (haara vaihtelee: nd-pohjat-astc / laite-astc-polku / laattapalvelin-jono). Älä poista mitään.

## VALMIS / KUITATTU
- KOODIKOKO osa 4 313e146eb KUITATTU (PT 02.xx), JU poimi junaan 224 ilman QA-ohitusta. Karsinta-iPad: ipad-3/-4 e2c3be586 (313e146eb +
  PK:n muistivahdin ohitus ccd8531d2, vain testi) 0 × MissingMethod/TypeLoad/AOT; juoksupeli ISS+Cesiumin päälle → signal 9 (muisti).
- LAITEKÄÄNNÖS RIKKI 224 (minun 4b332e927: ASTC-parit Palvelimelta/-kansioon, Rakennus.cs tarkisti vanhaa) → korjaus 69cd72344 junassa
  224 d7a8cdc19; laitekäännös ok, ladattava 295 Mt, asennettu 645 Mt. PT:lle raportoitu.
- VALKOISET TALOT savu3/savu5 = testiajon ionin varadata ("automaattiajo True → Ion", OSM Buildings pinnaton), EI regressio. PT hyväksyi.

## UUSI TILAUS (PT 05.0x, ENSIMMÄISENÄ)
Tee omaan haaraan jo nyt (testit, EI junaan): (a) kartan purku ennen Cesium-kaupunkia ja ISS:ää (talot, nähtävyysalueet, elävän kartan
laatat, kuvat; palautus sulkiessa), (b) ISS:n yövalojen pakkaus (maailma-z3-0-3 4096² × 4 paikkaa; tarkista muoto). Yhdistä 98974a244:n
kanssa ja aja iPadilla YHTENÄ ajona A/B-ajojen jälkeen. JUNAEHTO: Cesium + ISS ilman muistivahdin VIKAA, kuvat otettu, paluu kartalle
ehjä → pari PT:lle. Pohja: d7a8cdc19 / natiiviseppa/laattapalvelin-jono.

## ODOTTAA (JU:n jono, iso iPad; tulokset lokit/<nimi>-<sha>)
1. cesium-muisti A/B (KT): 85d3bab39 (juna 223) | d7a8cdc19, sk-cesium-muisti-ipad.txt → vertaa VIKA-Mt ja muisti-tarkka huippu.
   PT:n kysymys: oliko Cesiumin > 4080 Mt jo 223:ssa? Sama → Tekninen kunto -työ; 224 isompi → TF-este, ehdota korjaus (kartan purku).
2. iss-muisti A/B (KX): samat shat, sk-iss-muisti-ipad.txt (ISS yksin) → VIKA, huippu, "Exception while creating asset" -määrä.
3. cesium-google-ipad (KS): d7a8cdc19 "linssi kaupunki google 1" → kuva G6c; PARI PT:lle: savu3 S6c-cesium-pariisi.png (Ion) | G6c (Google).
4. nd-pohjat-ipad-2 (KU): 69cd72344 | 7a9c1a971 (natiiviseppa/nd-pohjat-astc: 10 NotreDameKoe-pohjaa nPOTScale 1 → ASTC, −~68 Mt arvio),
   sk-nd-pohjat-ipad-2.txt, kuvat Q1–Q6 → pari (kohde kokonaan, sama rajaus) PT:lle. PT hyväksyi erän; ipad-1 kelvoton (liian ylhäältä).
   Kuitattuna: JU poimii 7a9c1a971 junaan.
5. iss-jono-ipad: 98974a244 (natiiviseppa/laattapalvelin-jono, d7a8cdc19 + 1): Laattapalvelin jono 64→512 + 4 Accept-silmukkaa.
   Syy: ISS:n "muu"-portti torjuu ryöpyn (Curl error 7) → Cesium "Exception while creating asset" (savu4 54, karsinta-3 148). Vertaa
   iss-muisti-ipad-d7a8cdc19:n määriin; 0 → PT:lle kuittaukseen.
Analyysi: _tyo/natiiviseppa/iso/raportti-muisti-cesium-iss.md (kartta 2,4 Gt jää, ISS +1,7 Gt, tekstuurit 269→1203 Mt).
HUOM: savuajojen muisti-tarkka.log voi olla edellisen ajon jäänne (tarkista ALKU-aika).

## TOP 10 (raportti-top10.md) jatko
#1 NotreDameKoe pohjat = kohta 4. Seuraavat: Museo 50,7, KavelyKerrokset 16,9, IssPaneeli 15,7 + Raketti 14,2 (iso-kuvat-astc.py).

## VS:lle (kun herää, EI VIELÄ LÄHETETTY)
- "Tulivuorten kuvat nyt palvelimella (osa tulivuoret), lataaja IsoSisalto; lähteet Linssit/Lahteet~/Tulivuoret, muunnos tyokalut/iso-kuvat-astc.py."
- Revontulet.PaivitaNakyvyys:207 MissingReference (NUI teki revontulet-sulku-ajot, tarkista ennen viestiä).
