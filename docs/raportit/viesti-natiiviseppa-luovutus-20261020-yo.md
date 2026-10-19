# Natiivisepän luovutus 20.10.2026 klo 01.2x (BUILD 206 LUKITTU, TF käynnissä; juna 207 auki)

Lue ensin: CLAUDE.md, Raamatun Ydinajatus kohta 2 ja tämä kokonaan. Pysyvät säännöt: proto-3d/tyokalut/natiiviseppa-skriptit/juna183/luovutus-huomiot.txt.
Jonot (lopusta alkuun = uusin tila): natiiviseppa-skriptit/juna207/jono-207.txt ja juna206/jono-206.txt. Id:t AINA osoitekirjasta (PT local_8d8ebf72-…, JU local_24e63224-…, LT local_36a45147-…).

## TILA
- **BUILD 206 = proto master 82e263c7927805a31400471dea75d352009a41e0** (puu = juna/b34 = runko e1a0a464d; lukituskäännös 5f857b38d L1 00.58–01.03).
  LUKITSE 206 PT 00.57 (OMISTAJA PYYSI JULKAISUA 00.30, ehto KK + PT OK sokkelolle). Sisältö: sokkelo PK 208fd103e, VS aabbb84fa (jälki, taivas sky005,
  kaukomaa, syväterävyys, seinät k3, hento liike-epäterävyys), NUI logo + palsta-haku + varjostimet, PK raketti (ei Käynnistä-nappia), ☰/loppukortti-korjaukset.
  Testit e1a0a464d: Linssit 2145, Peli 651, Kartta 517, tarkista 0. Muutosloki #5017 = main 17ee9f83f.
- **Muistiajo 206** 82e263c79 iPad Pro 13: huippu 3110 Mt, vapaa min 2009 Mt, varoituksia 0, ei kaatumista → julkaisija-tyokalut/muistiajo-206.txt "OK 82e263c79 1,96 natiiviseppa".
- **TF iOS 206** JU käynnisti 01.15 (ajo 39333654702; sisäinen, ulkoiset vasta LT:n kierroksen jälkeen).
- **Mac 206 IRROTETTU AJO**: `mac206.sh e1a0a464d` (nohup, L2-jonossa) → loki proto-3d/lokit/natiiviseppa-mac206.log. **ENSIN**: kun lokin lopussa "TF-AJO <id>" → numero JU:lle.
  Jos "VIKA" → syy JU:lle + PT:lle (≤ 3 riviä). Asemataulu talo/eteneminen v70 = matka 2/5; JU jatkaa 3–5.
- **iPad Pro 13 on LT:llä** (Release-laite lokit/natiiviseppa-app-206-laite, BUILD 82e263c79). ÄLÄ ota takaisin ennen LT:n valmis-ilmoitusta.

## JUNA 207 (auki, ei takarajaa)
- Runko natiiviseppa/juna-207 (wt/proto-natiiviseppa-ehdokas, HEAD tällä haaralla) = 63713c20d = 08b2c5366 (BUILD 206 82e263c79, tyhjä puumuutos) + Lavastaja rengas-v8f c35eca1e8 (PT 01.4x OK).
  **testit207.sh irrotettuna** → lokit/natiiviseppa-testit207-63713c20d.log: tarkista tulos → sha PT:lle + JU:lle.
- Odottaa KK:n OK:ta (vain PT:n OK-rivillä): VS seinät k4 e4b91f296; LS Mona Lisa 9d88dae16 + askeleet d88d7f1e9 (videot KK:lla). EI: PK leveä piha b6e8c1148.
- Skriptit juna207/: testit207, lukitse207-a/-b/-ajo, mac207, muisti207 (sed 206→207, b34→b35). lukitse207-b: update-ref "" (b35 uusi), mukana-lista 82e263c79..runko.
  build207-viesti.txt: "TÄYTÄ LUKITSE" estää -b:n kunnes PT:n LUKITSE 207 -teksti sanatarkasti. muutosloki-207.txt puuttuu → -b estää (PT:n teksti + korjaus-PR).

## OPITUT 19.–20.10. yö
- Toinen lukitus samalle junalle: juna/bNN on jo olemassa → update-ref vaatii vanhan arvon (korjattu lukitse206-b.sh:ään).
- macOS `cut -c` on tavu-pohjainen → katkaisee ä/ö:n ja commit-viesti ei ole UTF-8. Lyhennä pythonilla tai jätä katkaisu pois; tarkista `iconv -f UTF-8 -t UTF-8`.
- "Valmistele yhdistys" ≠ yhdistä: PT haluaa usein liittää vasta simuparin OK:n jälkeen → kysy tai odota; peruin 1089d4cd6:n (ei ehtinyt peiliin).
- Simun aikana ei raskaita testejä (kuorma vääristää todisteen) → keskeytä ja aja simun jälkeen.
- Raketin valaistus seuraa oikeaa kelloa: klo 23 aurinko −25° = yö (ei vika). Vertaa lokin "raketti: valo aurinko" -riviä.
- PK:n skenaariossa `ui juoksupeli pois` + `uudestaan` = peli kiinni → kuvat kartasta. Tarkista oleta-uusi PUUTE-rivit ennen kuvien lähetystä.
- Ämpäripolut: juoksupeli/maailma-v4/ + kansio (avoimet-v2/, taivas-codex-v3/, sokkelo-693/); curl -r 0-0 → 206 = ok.
- Irrotettu ajo (nohup … & disown) kestää nollauksen; session run_in_background ei.
