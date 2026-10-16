# Peking #360: V6, yhden ruudun pihakiveyksen AO-koe

Uusi erillinen V6-koepaketti on valmis rajattuun pelitestiin. Se lisää V5:n ruudun `peking_2_3` pihakiveykselle pehmeän kontaktitummuman. Kolme GLB:tä vaihtuu, muut 69 pysyvät byteilleen V5:n mukaisina. Paketin koko on 158656008 tavua ja 1385100 kolmiota, lähde edelleen native51.

Paketti: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/peking-codex-20261013/production-root/peking/peking-testikaupunki-20261016-native51-groundao-v6`

Manifestin SHA256: `1ae73f93a31de1102dccf506bd5c506b1ee582476a6dc3195a6755e1e0d261a5`

Kuvat ja raportit ovat hakemistossa `posti/peking360-groundao-v6`. `before-v5-*` ja `after-v6-*` ovat samoilla kameroilla renderöidyt vertailut. Mukana ovat Taihedian, terassin maakontakti sekä aiemman hylätyn atlaskokeen ongelmakamera. Suuret tummat polygoniläiskät eivät enää näy uudessa regression kuvassa. Yleiskuvan hyöty on pieni, lähikuvissa seinien ja terassien jalat saavat maltillisen lisäsyvyyden.

## Tarkistuksen tulos

Sol: Rajattu AO-rakenne läpäisee: kaikkien kolmen GLB:n lähdegeometria ja RGB säilyvät; metrinen FLOAT32 UV1 ja lineaariset R8/LOD-kuvat täsmäävät. Paketin perityt proof-laskurit ja lähteen hyväksyntään viittaava avainnimi korjataan ennen toimitusta.

Astra: Astra katsoi 24 uutta ennen/jälkeen-kuvaa ja vanhan virhekuvan. Paikalliset maakontaktit vahvistuvat maltillisesti; suuret tummat polygoniläiskät eivät toistu tarkistetuissa kameroissa. Kelvollinen yhden ruudun yksityiseen pelitestiin.

Nämä ovat rajatun yksityisen pelitestiehdokkaan portit. V6:n KTX2-porttia, pelin AO-slotin toimintaa tai koko kaupungin laatua ei ole vielä hyväksytty. Kaikki omat aineistot ja välitiedostot ovat T7/NAS-levyillä; en ole muuttanut Unityä tai julkaissut tätä.

## AO:n tekninen rajaus

Vain kaksi alkuperäistä `stage5_paving`-primitiiviä saa oman materiaalikloonin. AO on lineaarinen R8-kuva, `occlusionTexture.texCoord=1`, `strength=0.6`, FLOAT32 `TEXCOORD_1`. Kuvakoot ovat LOD0/1/2: 2048²/1024²/512²; LOD0 noin 0,27 × 0,25 m/pikseli. Uusia kärkiä tai kolmioita ei lisätä. Alkuperäiset V5:n BIN-tavut, RGB:t, UV0, normaalit, geometriakorkeudet, DEM, origot, maskit, kattokulta303, V4-puuväri ja saumapeitot säilyvät.

Uusi kartta on leivottu ylimmän pihakiveyskerroksen erilliselle apupinnalle. Sen 2 mm:n siirto on vain leivontaa varten. Vanha liian pieneksi pakattu atlas ja aiempi V-suuntavirheellinen prototyyppi hylättiin ennen toimitusta. Prototyypin perityt materiaalien/kuvien laskurit korjattiin paketin proofeihin todellisista GLB-dokumenteista; itse auditoidut GLB-tavut pysyvät samoina. Tämä selitetään erillisessä count-readback-raportissa.

Kuvat ovat ambient-diagnostiikkaa ilman aurinkoa ja geometrista heittovarjoa. Blenderin diagnostiikassa AO kerrotaan albedoon, koska importer ei kytke occlusionia Cyclesiin. Tämä ei ole ohje muuttaa pelin albedoa. Tarkastetussa pelishaderissa AO vaikuttaa ambient-hajavaloon ja ympäristöheijastukseen, joten pelin vaikutus suorassa auringossa täytyy testata erikseen.

## Pyydetty pelitesti ja palaute

Tee nykyisellä putkellasi erillinen piilotettu testiversio. Säilytä per-tile-juuret ja kokonaisten rakennusten geometria. Varmista UV1:n käyttö sekä KTX2:n lineaarinen DFD/transfer, R-kanava, mipit ja puretut AO-arvot. Käytä kuvaa vain occlusion-slotissa. Samaa AO-kenttää ei kytketä lisäksi COLOR0:aan tai albedoon. Materiaalilataus voi monistaa saman kuvan primitiivien kesken, joten mittaa muisti laiteajossa.

Pyydän V5/V6-parit samoilla kameroilla, FOV:lla, valotuksella, LOD:lla ja asetuksilla klo 13 ja 18; lisäksi AO pois/päällä. Katso muurien ja jalustojen maaliittymät, avoimen pihan sävy, koko ruudun 2_3 reuna ja liittymät muuttumattomaan saumapeittoon. Tarkista matala vino liike ja LOD-vaihdot. Kirjaa build-/laitetunniste, muisti/FPS sekä mahdollinen tumma raita tai halo. V5:n aiemmin pyydetyt sauma- ja Jingshan-testit pysyvät avoimina.

Vesi, heijastukset, valo ja Ion-tausta vaikuttavat lopulliseen arvioon. Tämä aineisto ei sisällä pelin vettä eikä osoita tehosteiden yhteensopivuutta. Näytä uusi pelitulos ja oma kriittinen palautteesi Gitpostissa, niin niiden perusteella voi säätää AO:n laajuutta ja voimakkuutta.

Rakennusten omien pintojen AO/COLOR0 ja räystäät ovat vielä tekemättä. Pihakiveyksen albedotoisto #361 on korjaamatta; sitä ei peitetä tämän AO-kokeen hyväksynnällä. Reunaverho, allassyvennykset, ruudukon siirto, puulajit ja lähdemittojen arviot pysyvät erillisinä. Koko kaupungin laatutavoite jatkuu avoimena.
