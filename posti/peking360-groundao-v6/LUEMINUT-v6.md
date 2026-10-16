# Peking #360: yhden ruudun pihakiveyksen AO-koepaketti V6

Tämä erillinen koepaketti lisää V5:een pehmeän ympäristövarjostuksen ruudun `peking_2_3` kahdelle alkuperäiselle pihakiveyspinnalle. Muutos koskee kolmea GLB:tä; muut 69 GLB:tä ovat V5:n kanssa byteilleen samat. Paketin 72 GLB:tä ovat yhteensä 158656008 tavua ja 1385100 kolmiota. Lähdeversio on edelleen native51.

AO on oma lineaarinen R8-kuva `occlusionTexture`-slotissa, `texCoord=1`, `strength=0.6`. Uusi `TEXCOORD_1` on FLOAT32. Kuvakoot ovat 2048², 1024² ja 512². LOD0:n fyysinen pikselikoko on noin 0,27 × 0,25 m. Kartan lähde on kiveyksen ylimmästä näkyvästä kerroksesta tehty erillinen leivonta-apupinta. Sen 2 mm:n apusiirtoa ei ole viety peligeometriaan. Muuta staattista kaupunkia käytettiin peittävänä geometriana, puukortteja ei.

Alkuperäiset V5:n BIN-tavut ja RGB-kuvat säilyvät. Alkuperäinen geometria, normaalit, UV0, lähdekorkeudet, DEM, origot, maskit, kattokulta303, V4-puuväri ja V5-saumat säilyvät. Uusia kärkiä tai kolmioita ei ole lisätty. Aiemman prototyypin peritty materiaalien ja kuvien lukumäärä korjattiin tämän paketin proof-tiedostoihin lukemalla todelliset GLB-dokumentit; koemallien GLB-tavut pysyvät tarkistettuina samoina. Korjaus on kirjattu `QA/current-proof-count-readback.json`-tiedostoon.

## Näyttö ja rajaus

`QA/ground-ao-world-actual-renders` sisältää kuusi jäädytettyä kameraa ja kolme lähikuvaa ennen/jälkeen. `QA/ground-ao-world-regression-renders` näyttää lisäksi kolme aiemmin hylätyn atlaskokeen lähikameraa samoilla sijainneilla, suunnilla ja FOV:lla. Regression uudet kuvat ovat 1600 × 900, vanhat prototyyppikuvat 1280 × 720; niiden suoraa pikselivertailua ei väitetä. Kaikki kuvat on renderöity todellisista 24 GLB:stä vastaanottajan ECEF-juurimatriiseilla. Alkuperäisiä kuvia ei ole muokattu.

Tämä on ambient-diagnostiikka: ei aurinkoa tai geometrista heittovarjoa. Blenderin importer ei kytke AO:ta automaattisesti Cyclesiin, joten vain tätä diagnostiikkaa varten AO kerrotaan albedoon. Peli käyttää AO:ta ambient-hajavaloon ja ympäristöheijastukseen. Näin ollen kuvat eivät ennusta pelin suoran auringonvalon, heijastusten tai klo 13/18 lopputulosta. Aiempi liian pieneksi pakattu atlas ja V-suuntavirheen sisältänyt koe hylättiin; kumpikaan ei sisälly tähän pakettiin.

Tekninen arvio: Rajattu AO-rakenne läpäisee: kaikkien kolmen GLB:n lähdegeometria ja RGB säilyvät; metrinen FLOAT32 UV1 ja lineaariset R8/LOD-kuvat täsmäävät. Paketin perityt proof-laskurit ja lähteen hyväksyntään viittaava avainnimi korjataan ennen toimitusta.

Visuaalinen arvio: Astra katsoi 24 uutta ennen/jälkeen-kuvaa ja vanhan virhekuvan. Paikalliset maakontaktit vahvistuvat maltillisesti; suuret tummat polygoniläiskät eivät toistu tarkistetuissa kameroissa. Kelvollinen yhden ruudun yksityiseen pelitestiin.

## Vastaanottajan testi

Tee tästä erillinen piilotettu testiversio nykyisellä putkella. Säilytä per-tile-juuret, koko rakennusten geometria, maskit ja V5:n muut ominaisuudet. Varmista UV1 sekä `occlusionTexture.texCoord=1` ja `strength=0.6`. AO-kuvaa käytetään vain occlusion-slotissa. Varmista KTX2:n lineaarinen DFD/transfer, R-kanava, mipit ja puretut arvot; älä tee AO:lle sRGB-korjausta tai kytke samaa kenttää lisäksi COLOR0:aan/albedoon. Vastaanottajan materiaalilataus voi monistaa saman kuvan primitiivien kesken: mittaa muisti todellisessa laiteajossa.

Vertaa V5/V6 täsmälleen samoilla kameroilla, FOV:lla, valotuksella, render-asetuksilla ja LOD:lla klo 13 ja klo 18. Tarkista muurien ja terassien jalat, avoimen kiveyksen tasaisuus, ruudun reunat sekä matala vino liike ja LOD-siirtymät. Katso AO myös kytkettynä pois/päälle. Toimita laite-/build-tunniste ja asetukset sekä muisti/FPS-havainto. Olemassa olevat V5-saumat, Jingshanin syvin apupinta ja pelivesi tarvitsevat edelleen omat aiemmin pyydetyt testinsä.

Rakennusten COLOR0/AO, räystäät ja terassien omat pinnat eivät vielä kuulu tähän #360-osakokeeseen. Kiveyksen albedon toisto #361 on korjaamatta. Reunaverho, allassyvennykset, ruudukon siirto ja puulajien muutokset eivät sisälly. Veden, valaistuksen, heijastusten ja Ion-taustan lopullinen yhteensopivuus on vastaanottajan pelitesti. Koko kaupungin laatutavoite ja ihmisen omistajahyväksyntä pysyvät avoimina.

V5:n vanhat raportit ovat `QA/base-v5-provenance`-hakemistossa lähdehistoriana. Ne eivät ole uusi V6:n runtime-hyväksyntä. Nykyisen paketin tiedostopinnit ovat `manifest-sha256.json`-tiedostossa. Kaikki omat tuotanto- ja välitiedostot ovat T7/NAS-levyillä; Unityä, R2:ta, main-haaraa tai julkaisua ei muuteta.
