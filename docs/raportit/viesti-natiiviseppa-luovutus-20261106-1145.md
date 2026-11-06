# Natiivisepän luovutus 6.11.2026 klo 11.45 (konteksti 33 %, pehmeä raja, 7.37)

Korvaa -1140:n SEURAAVA TYÖ -kohdat 1 ja 2 (ajopyyntö). Muu -1140 pätee (haara natiiviseppa-luovutus-1140: mitä koodissa on, avoimet, opit, huomiot, Concorden testirivi 61e6bdcfe seuraavaan committiin). Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja. Luo ensin cron "4 9 * * *" (Raamattu 7.41, proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py).

## SEURAAVA TYÖ
1. PALAT-V10, KK:N SANA TULI, MENEE PALIKKAKOKEEN EDELLE. Ei omaa ajoa, ei junaan; sha KS:lle seuraavaan yhteiseen ajoon. Uusi kansio, ei koodin oletusta.
   - Tehdään: Canopéen katto way/630511331 taloksi; Palais-Royal'n eteläosa auki maskista KS:n koordinaateilla, EHDOLLA ettei yksikään talo lävistä mallia (tarkista).
   - Puiston 6 palaa: KK:n viestit ovat ristiriidassa. A: poisto + KS:n karttamuutos samaan seuraavaan ajoon, jos muutos on pieni (omistaja 5.11. 20.51 "Näitä mini rakennuksia ei saa olla"); jos muutos ei ole pieni, palat jäävät ja kerrotaan KK:lle, joka oikaisee omistajalle. B: palat jäävät v10:ssä ja lähtevät myöhemmin erikseen KK:n sanalla. Kysyin 11.4x KK:lta, kumpi on voimassa. Ilman vastausta palat jäävät: poistoa ei voi tehdä ilman KS:n muutosta.
   - KS:ltä pyydetty 11.4x: Palais-Royal'n tarkka rajaus ja arvio karttamuutoksen koosta. Vastaukset tulevat tähän sessioon: jos eivät näy, katso list_events; älä lähetä samaa uudelleen.
   - Toteutus: -1113 kohta 1 (siisti-json-avain "_taloksi" tai vastaava, tee-palat-v9-louvre-halles.zsh mallina, tarkista-palat.py). Palais-Royal korvaus.json:n kautta (tee-palat.py:n 3. argumentti). Sha KS:lle ja KK:lle.
2. PALIKKAKOE: JU ajaa skenaarion /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/palikkakoe/sk-mac-1.txt (L2, b8, 2aa245334, 0.465). JU palautti aiemman ajopyynnön, koska aja-komennon kolmas luku on kaari eikä metrejä; ajopyynto-mac-1.md on vanhentunut, skenaario on voimassa. Skenaariota ei ole ajettu.
   - Tuloksesta eteenpäin kuten -1140 kohta 2: loki, kuvat täysikokoisina, KK ensin, sitten iPad.
   - Omistaja (PT 11.4x, kirjattu suunnitelma.md:hen): nopeusmittaus isolla iPadilla riittää, pieni vain kahteen rinnakkaiseen ajoon. Kirjasto alkaa Euroopasta ja moskeijasta.

## LISÄYS 11.5x: KS:n vastaus (tuli ennen nollausta)
- Palais-Royal: relation/3300400, building=palace, height 30, 14 336 m², bbox lat 48.86277–48.86426, lon 2.33576–2.33808. Eteläosan rajaa KK ei antanut: etelä alkaa 48.86277:stä; puolivälin leveys noin 48.8635 on KS:n oma lasku bboxista, ei KK:n sana. Kysy KK:lta vain, jos tarkempi raja tarvitaan. Kamera: pr-rivoli, aja 48.86370 2.33655 0.003 2, suunta 200. Louvren pohja: NotreDameKoe/louvre-pohja-talot3, alfa talomaskin mukaan (_tyo/karttaseppa/louvre-talomaski); jos maskia pitää muuttaa alueella, kerro KS:lle.
- Puiston 6 palaa: UUSIN KK:N SANA, KORVAA "B on voimassa" -VIESTIN JA KOHDAN 1 RISTIRIITA-ALAKOHDAN: 6 palaa POIS NYT. KS:n karttakorjaus on pieni, ja KK antoi sille sanan samaan ajoon (11 rakennusta kartalta, 6 palan jäljet mukana). Poista way/951307699, 942327083, 626410285, 626410286, 626406824 ja 942327082 samassa versiossa Canopéen katon ja Palais-Royal'n kanssa; sama kansio, jos v10 on vielä viemättä KS:lle, muuten uusi versio. Sha KS:lle, ei omaa ajoa. (KS:n aiempi "6 palaa jää" on tällä vanhentunut.)
- Forumin litteät: rivin neljä neliötä ovat way/626410287–290 (building=roof, 0,5 m), minun suodattamani, kartan piirtämiä. Kartan korjaus on KK:lla, älä muuta niiden takia mitään.
