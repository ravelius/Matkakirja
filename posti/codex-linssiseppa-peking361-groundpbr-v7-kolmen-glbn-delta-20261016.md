# Peking #361: V7 valmis rajattuun yksityiseen pelitestiin

Luin V6-pelipalautteen 399c814 kaikkine seitsemine liitteineen. V6 on nyt tämän työn hyväksytty pohja simulaattorin rajauksella. AO:n lähes olematon näkyvä hyöty on kirjattu; en levennä sitä tai muuta strength-arvoa V7:ään, jotta #361:n vaikutus on erotettavissa. Esikäsittelyn jo ratkaistuja materiaalijakoja ei korjata muissa 69 tiedostossa. #362:n kuusi rakennuskohtaista 303-varianttia on nimenomaisesti sallittu ruutuun 2_3; niitä tai punaisia pintoja ei ole vielä tässä V7:ssä.

**Toimitus on pyytämäsi kolme GLB:tä V6:n päälle.** Deltakansio:

`/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/peking-codex-20261013/production-root/peking/peking-testikaupunki-20261016-native51-groundpbr-v7`

Paketin manifestin SHA256: `f12def55263dac25222c73219ddb4d1468db8f2f2cb303a3121d9c3cdf4740b7`

Pohja V6: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/peking-codex-20261013/production-root/peking/peking-testikaupunki-20261016-native51-groundao-v6`

Pohjan manifestti: `1ae73f93a31de1102dccf506bd5c506b1ee582476a6dc3195a6755e1e0d261a5`

| Vaihtuva tiedosto | Tavua | SHA256 |
|---|---:|---|
| peking_2_3_lod0.glb | 13070020 | `b7fd08dde1ae86bee5b39f2df0baf8ef4d5620cddba0d8b20fff851550ce4846` |
| peking_2_3_lod1.glb | 5517040 | `65ec98b55dfe04b2b1b8d7706d8ed544d815bcb60f94f9df86ca14205e4a21e4` |
| peking_2_3_lod2.glb | 4476024 | `26f9858e580e835f28bfcc55855febe78c8deccb7b7641aca7e2a6bf6984f28b` |

Overlay-manifesti varmentaa kaikki 72 tiedostoa: kolme yllä ja 69 muuttumatonta V6-tiedostoa. Yhdistetty raakakoko on 163991572 B ja 1385100 kolmiota. Muutos V6:een +5335564 B, budjettivara 334678 B. Itse delta sisältää kolme GLB:tä, ei koko kaupunkia. `glb-v4/laatat.json` sisältää päivitetyt koot mutta samat origot, alueet ja leikkauspolut; maskit ovat byteilleen V6:n mukaiset.

## Näkyvä muutos ja tarkistus

Kiveyksen sisäalueen 4,8 m kuvajakso korvautuu yksilöllisellä yhtenäisellä PBR-kentällä. Kivien sävyjakauma perustuu koskemattoman vanhan albedon lineaarisiin tilastoihin, eikä sen monikivistä kuvajärjestystä kopioida. Kokonaan uusi built-in-imagegen-kivipinta g31 antaa kivien sisäistä pintavaihtelua. Kivijako, normal ja karheus käyttävät samaa jakoa; AO pysyy erillisenä. Pihasuunnat ja 0,95 × 0,50 m kivien suunnittelukoko eivät ole historiallista mittatietoa.

C1, C3 ja C4 hylättiin liian sileän tai juovaisen ilmeen vuoksi, C2/C5 raakabudjetin vuoksi; niitä ei toimitettu V7:nä. Valittu C6 palauttaa limittäisten yksittäisten kivien luettavuutta. Uusi puoli jää vanhaa pehmeämmäksi, ja kivikohtaisen sävyvaihtelun mittakaava pitää arvioida pelissä. Kahdeksan metrin väliaikainen pilottireunan sovitus on mukana, joten reunaa on tarkasteltava kriittisesti. Vanha noin 7 cm pintasauma/pitkät geometriaviivat säilyvät; tämä muutos ei siirrä maata tai korjaa niitä geometrisesti.

Solin auditointi: kolme GLB:tä, kaikki vanhat BIN-prefixit/kuvat/perusmateriaalit ja jokainen järjestetty POS/NORMAL/UV0/UV1-kulma säilyvät; rankmap ja nykyinen vientiportti 3/3. Earth/grass/paving yhdistetään häviöttömästi; ei uusia kolmioita, weldiä tai korkeussiirtoa. Katto303, V4-puut, DEM, origot, maskit ja saumapeitot säilyvät. Astran ja parentin rajattu päätös on liitteissä; tämä ei ole koko kaupungin tai omistajan lopullinen laatuhyväksyntä.

`posti/peking361-groundpbr-v7` sisältää kymmenen alkuperäistä PNG:tä samoista kameroista (Taihedian, kontakti, raja, 350 m / 65°, 500 m / 78°) ja raportit. Kaikki 28 alkuperäistä actualGLB-kuvaa ovat paketin QA/actual-GLB-renders-kansiossa. Kuvat ovat Blenderin varjottomia ambient-diagnostiikoita samoilla kameroilla ja AO 0,6:lla; eivät pelin klo 13/18-kuvia. Niitä ei ole generoitu valokuviksi tai jälkieditoitu. Lähde g31 ja sen prompt/provenienssi ovat erillisinä; alkuperäinen PNG säilyy NASilla ja byte-identtinen kopio T7:llä.

## Pyydetty V6/V7-pelitesti

Esikäsittele vain nämä kolme GLB:tä V6:n päälle. Värit/MR/AO ETC1S 192, normaalit UASTC ja `--normaali-max 1024`. Säilytä albedon 4096/2048/1024-mitat; normal/MR ovat 1024/512/256. AO-kuva/sidonta/texCoord 1/strength 0,6 ovat V6:n mukaiset. Tarkista DFD/kanavat/lineaarisuus ja puretut mipit.

**Todenna ensin, mikä renderer tuottaa näkyvän kiveyksen.** Kirjaa ladattu hashversio, ruudun 2_3 LOD ja uusien base/normal/MR-karttojen sidonta. Varmista saman kameran maapikseleistä esimerkiksi palautettavalla objektitunnistuksella tai eristetyllä näkyvyyskokeella, että uusi oma paving todella näkyy. Pelipalautteen etuala näyttää erilaiselta kuin meidän GLB-renderit. Se herättää vain hypoteesin oman GLB:n/Ionin/LOD:n/shaderin vaikutuksesta; peittymistä ei ole todistettu, enkä nosta pintaa sen perusteella.

V6/V7-parit samoilla kameroilla, FOV:lla, valotuksella ja LOD:lla klo 13 ja 18. Katso kivenpäätyjä ja yleissävyä, mahdollisesti liian suurta sävymosaiikkia, 4,8 m:n toistoa/moiréa 300–500 m:n korkeudella, kallistus 55–78°, matalaa vinoa liikettä ja LOD-vaihtoja, 2_3:n vanha/uusi-rajaa sekä mustia läiskiä/haloja. Vesi, heijastukset ja varjot arvioidaan pelin omassa toteutuksessa.

Muistia pitää mitata: esikäsitelty V6 ja C6 ovat molemmat 61 slottia/LOD, joten uutta slot-säästöä ei väitetä. LOD0:n laskennallinen lisäys on noin 100,14 MB RGBA8+mipit tai 13,21 MB ETC/UASTC-formaattioletuksilla; kaikkien LOD:ien yhtäaikainen lisäys 131,40/17,33 MB. Nämä eivät ole mitattua VRAMia/FPS:ää tai todellisia KTX2-tavuja. Kirjaa KTX2-koko, muisti/streaming, ruutuaika ja build-/alustatunniste; simulaattori ja fyysinen laite erotetaan.

Pyydän kriittiset pelikuvaparit ja päätöksen tämän yhden ruudun #361-korjauksesta Gitpostissa. Laajennusta ei tehdä ennen kuvahyväksyntää. Ei Unity/R2/main/julkaisua tässä työssä; canonical native edelleen 51. Seuraavaksi #362:n rajatut katto-/punaiset materiaalit, 303:n pinta-alapainotettu keskiarvo säilyttäen.
