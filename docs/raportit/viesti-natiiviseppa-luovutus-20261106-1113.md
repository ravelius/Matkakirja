# Natiivisepän luovutus 6.11.2026 klo 11.13 (konteksti 28 %, pehmeä raja, 7.37)

Korvaa -0955:n SEURAAVA TYÖ -kohdat 1 ja 4 (Les Halles). -0955:n kohdat 2, 3, 5 ja opit sekä -0940:n viestit ja työtapa pätevät (haarat natiiviseppa-luovutus-0955, -0940). Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja. Luo ensin cron "4 9 * * *" uudelleen (Raamattu 7.41, proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py).

## SEURAAVA TYÖ
1. ENSIMMÄISENÄ palat-v10, vain KK:n sanalla (PT: Pariisin rakentaminen menee kokeen edelle). KK:n vastaus ei ollut tullut 11.13. Tarkista viestit.
   - Forum des Hallesin litteä kohta = Canopéen katto way/630511331 (building=roof, 8 629 m²), pois tee-palat.py:229 (EI_TALOJA). Siivet way/630213860 ja way/630222417 ovat paloissa. Peittokuva pariisi-talot/selvitys-yhteinen/forum-peitto-ajo7.png.
   - Suositus KK:lle: v10 tuo vain katon; IGN:ssä koko Forum on yksi 15,9 m:n rakennus. Siipien kanssa yhteisiä solmuja 36 ja 37, päällekkäin noin 104 ja 58 m² (1 m:n ruudukko). 3D-tulos näkemättä.
   - Puiston 6 palaa (way/951307699, 942327083, 626410285, 626410286, 626406824, 942327082) JÄÄVÄT suosituksessa: v6:ssa ei paloissa, v7:stä alkaen on. Peruin ensimmäisen suosituksen, koska KS mittasi kaikki 6 myös kartan rakennuksiksi: poisto jättäisi litteän jäljen. Avoin puisto = poisto + KS:n karttamuutos, vain KK:n sanalla. Kohdistus kuvaan on järjestyksestä ja muodosta, ei tarkka.
   - Toteutus: uusi kansio ja uusi siisti-json-avain (esim. "_taloksi"), ei muutosta oletuksiin, kuten v8 ja v9 (siisti-v9.json, tee-palat-v9-louvre-halles.zsh). Olemassa oleviin ei kosketa. tarkista-palat.py, sha KS:lle ja KK:lle. KS pitää palat-v9:n ajoissa siihen asti. Kartan puolelle ei tarvita muutosta (KS).
   - Ei tehdä: muut 47 isoa building=roof-kohdetta (≥ 500 m²; mm. Gare de la Rapée, Halle Pajol) jäävät pois, kuvista katsomatta. KS:lle kerrottu.
2. UUSI TYÖ, PT 11.0x (omistaja 10.47 "tutki kaikki tavat ja tee koe. eli kokeile myös GPU Resident Drawer ja Mesh LOD"): NS tekee kokeen. Ohje Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261106-rakennuspalikat-tutkimus.md osat E (11 ajoa) ja F: lue kokonaan, väitteet [T] tarkistetaan ennen toteutusta. EI ALOITETTU, ei haaraa, ei koodia.
   - Aloita A0, A1, B2, B3. Pyydä PT:ltä sana ennen C-ajoja, jos ne vaativat koko pelin asetuksia rungossa.
   - Rajat (PT): oma koehaara b8:n päälle, ei junaan, EI muistimittauksia, ei ostoja, ei Tripo- eikä Codex-tilauksia ilman omaa lupaa. Iso iPad nopeuteen (KK:n tulkinta: poikkeus 2.209:ään, omistajalle kerrottu): launch vain lukolla, ajot JU:n vuorolla, ei hiljaisella tunnilla. Kuvat ja tulos KK:lle, tiivistys PT:lle.
   - Oma luonnos toteutukseksi: /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/palikkakoe/suunnitelma.md ([E], ei mitattu). Ehdotettu pohja 9f5e3e105 (KS:n ajo 7, b8), koska runko ce65ccfe4:ssä ei ole TaloKerrosta; PT sanoi vain "b8:n päälle". Tarkista KS:n haaran kärki.
   - Valot, mastot ja sillat saa ilman latausta: T7:n ile-de-france-latest.osm.pbf (polku hae-osm.mjs:ssä). osmium puuttuu koneelta, jäsennin on hae-osm.mjs:ssä.
3. JU:n UI-uusinta addae63f2:lla L1:llä on tulossa NS:lle. Virheistä rivi PT:lle. Muut b8-testit: Kartta 605/605, Linssit 2225/2225, Peli 826/826; UI:n pallo ja linna eivät olleet valmistuneet. Junarungon kärki on nyt ce65ccfe4 (addae63f2 + 152 aiemmin puuttunutta .metaa, PT:n lupa): yhdistäessäsi runkoa ota metat.
4. Louvre: ajo 7 (lokit/karttaseppa-yhteinen-7-b8-9f5e3e105) tuli. louvre-ita.png katsottu vain Forumin kohdalta ja kuva näyttää porraskorttelit siisteinä; pohjoispuolen ja koko arvion katsominen ja tulos KK:lle tekemättä (-0940 kohta 2). Ajossa on myös louvre-ranta.png ja pr-rivoli.png. Unity.logista: Licensing-kättelyvirhe ja "ui kuva ei latautunut" (-0955 kohta 2), ei katsottu.
5. Octroin ajo-ohje odottaa KK:n paikkaa KS:llä.

## Tehty tässä sessiossa
- Cron luotu, Les Halles -syyt selvitetty ja kerrottu KK:lle, KS:lle ja PT:lle. Viesti KK:lle on jonossa: tarkista, että korjaus (katto yksin) meni perille.
- Skriptit pariisi-talot/selvitys-yhteinen/: forum-osm.py, forum-peitto.py, forum-katto.py, puisto-palat.py. Kuvat forum-peitto-ajo7.png, puisto-6-palaa-ajo7.png.

## Opit
- Ennen kuin ehdottaa 3D-palan poistoa, tarkista kartan oma rakennustäyttö: paikan litteä jälki jää.
- Sana "avoin kuten v6:ssa" oli liian vahva; v6:n kuvaa ei katsottu.
- zsh: "$B:Assets" laajenee väärin, käytä ${B}: (toistui).
- SendMessage ei löydä sessiota pienillä nimillä: käytä mcp__ccd_session_mgmt__send_message session id:llä.
