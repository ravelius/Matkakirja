# Puheohjauksen vertailutoimitus

Molemmissa GLB-tiedostoissa sama mesh.extras.targetNames:
`jawOpen`, `mouthClose`, `mouthFunnel`, `mouthPucker`, `eyeBlinkLeft`, `eyeBlinkRight`.
Käytä 0–1-arvoja. Kolme primitiiviä voivat latautua kolmeksi SkinnedMesh-olioksi: kohdistetaan nimet jokaiseen, kuten sovitussa ohjaimessa. Suun avaus + sulku 1/1 sulkee huulijaon; O-koe jawOpen=.5/mouthFunnel=1, U-koe jawOpen=.35/mouthPucker=1. Räpäytykset toimivat erikseen ja yhdessä. idle kulkee samassa tiedostossa.

Kokki 39 832 kolmiota, portinvartija 39 989, kummassakin 65 luuta, 3 primitiiviä, 2 materiaalia ja kolme 2048 px lähdetekstuuria. Tiedostojen juuren skaala on 1. Hahmojen nykyinen korkeus on kokki 0,978210 m ja portinvartija 0,979431 m; Lavastaja sovittaa ne sovitusti kohtauksen aikuisten mittoihin. Älä tulkitse raakaa noin metrin korkeutta lopulliseksi aikuisen kooksi. 1,8 m korkeuteen skaalattuna jawOpen=1:n huuliväli on noin 20,1 mm / 17,7 mm.

Tarkistettu: neutraalin lähdegeometrian ja idlen säilyminen viidessä asennossa, oikea suuaukko, jawOpen+mouthClose-huuliväli 0, kuusi ei-tyhjää säädintä, 635 näytepistettä/silmä peittyvät, kuvasarjat edestä ja sivulta. Vastaanottajan ajantasainen codex-3d-tarkistus: erillinen raportti qa/receiver-check.json. Kuvasarjat ovat todellisten GLB-tiedostojen CPU-esikatseluja, eivät uutta havainnekuvagenerointia.

Rajaus: tumma yksinkertainen suuontelo, ei hampaita eikä kieltä; kuusi sovittua säädintä, ei täysi ARKit-ilmevalikoima. Säätöjen liikeradat ovat paikallisesti tarkistettuja. Puheen ajoitus, ruudulla tapahtuva idle+puhe, keittiövalon materiaalivertailu, KK ja omistajan hyväksyntä ovat avoimet. Tämä on puhepilotiksi tarkoitettu vertailupaketti, ei lupa vaihtaa kaikkia MetaHuman-rooleja.

Lavastaja: aseta hahmot nykyisen MetaHuman-kokin ja -portinvartijan viereen samaan keittiön valoon ja kameraan. Natiiviseppä: testaa sovitulla kuuden säätimen ohjaimella. Palauta havainto tiedoston SHA:lla, säätimien arvoilla ja kuvaparilla. Ei main-mergeä, versionnostoa tai julkaisua tällä toimituksella.
