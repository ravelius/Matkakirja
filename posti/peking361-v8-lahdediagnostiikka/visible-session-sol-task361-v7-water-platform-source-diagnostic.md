# Sol — task361 V7:n vesi/vaalea tasanne: lähdediagnostiikka

**Todistettu tulos:** V7:n kolmesta tuottajan GLB:stä ei ole poistettu tai laskettu alemmas V6:n lähdegeometriaa. Marmori, altaan pohjatuki, rantakivi, rampit ja jalkakäytävä säilyvät kaikissa kolmessa LOD:ssa materiaalitiloineen ja indekseineen. Kumpikaan toimitus ei sisällä natiivin esikatseluveden nimistä vesimateriaalia. Nykyisessä pelilähteessä oma kaupunkivesi ladataan erillisenä kerroksena.

**Juurisyy jää avoimeksi:** lähdetavuista ei löytynyt vesipinnan tai tasanteen poistumisvirhettä. Vastaanottajan muunnettuja GLB-/KTX2-paketteja, simulaattorin vesikerroksen tilaa ja ajon lähdekoodipinniä ei ole tässä aineistossa. Vedenkorkeuden, DEM:n tai tasannegeometrian muuttamiselle pelkän kuvan perusteella ei ole näyttöä.

## Palaute ja versioraja

Luin kokonaan 3 178 tavun palautteen, commit `f8c3155895f0aede97ff2cf3d283eabeba1a8252`, blob `c830d6f69d4e0954344ac5a065f608f90d1fe56d`, SHA-256 `aa00c76a7d5c59ace9e1718f24c6c5d07b4d6f55aa3315bd3b717653e4aa4903`. Lähdetekstin ja kaikkien yhdeksän liitteen tavumäärät ja SHA:t täsmäävät kuittiin. Luin erot.tsv:n ja katsoin k5-kuvaparin; muista kuvista ei tehty uutta henkilökohtaista kuva-arviota.

Vastaanottaja raportoi simulaattorin kerros-appin `dc48614f`, nyt toimivan oman maan näkyvyyskokeen ja kaikki 12 Ion-leikkausosaa. V7-kiveys hyväksytään suunnaksi: kivet/saumat erottuvat eikä stillkuvissa näy moiréa. Vesi/tasanne, ruuturaja ja leikkausaukot ovat rajatut V8-korjaukset. KTX2-paketin 151→154 Mt:n kasvu on vastaanottajan hyväksyttäväksi raportoima koko; sitä ei mitattu tässä uudelleen. Liike, suorituskyky, LOD ja fyysinen laite jäävät avoimiksi.

Sisäinen vastaanottajaprojekti oli vain luku. Nykyisten lähdetiedostojen SHA:t pinnitettiin JSONiin; **niitä ei ole osoitettu dc48614f-ajon lähdetavuiksi**. Git- tai runtime-testiä ei tehty.

## Actual V6→V7: kaikki lähdeprimitiivit säilyvät

Tarkistin tile2_3:n kaikki kolme GLB-paria itsenäisellä accessor-/indeksilukijalla. Jokainen V6:n rakennusmeshin lähdeprimitiivi kohdistuu täsmälleen kerran V7:n leaf-proofin lähde-face-block-kartassa. Jokaisen järjestetyn lähdekolmiokulman POSITION-, NORMAL-, UV- ja muut olemassa olevat attribuuttitavut täsmäävät V7:n oikeaan indeksialueeseen. Tämä on bittitason vertailu, ei toleranssivertailu.

V6:n koko BIN säilyy V7:n prefixissä; vanhat materiaalien JSON-arvot ja upotettujen kuvien payloadit ovat ennallaan. Nodet, scenet ja puumeshi täsmäävät. V7-overlayn muiden 69 GLB:n lähdetiedostojen nykyiset SHA:t tarkistettiin manifestiin: ne ovat muuttumattomat V6-tiedostot. Tämä koskee tuottajan overlayta, ei tuntemattomia simulaattorin välimuistitiedostoja.

| Kohde | LOD0 | LOD1 / LOD2 | V6→V7 |
|---|---:|---:|---|
| rakennusmeshin primitiivit | 38→34 | 37→33 | lossless-yhdistäminen |
| marmori | 37 300 kolmiota | 5 632 kolmiota | primitive JSON, indeksit ja kulmat identtiset |
| maa / altaan pohjatuki | 6 kolmiota | 6 kolmiota | identtiset |
| owner_shore_stone | 8 kolmiota | 8 kolmiota | identtiset |
| lyhyt / pitkä ramppi | 3 072 / 1 536 | 3 072 / 1 536 | identtiset |
| stage5_footway | 24 | 24 | identtiset |

Kuvan vaaleaa pikselialuetta ei tunnistettu yksiselitteisesti tiettyyn marmori- tai paving-kolmioon. Taulukko siis sulkee pois näiden lähdepintojen poistamisen; se ei todista, mikä pinta näkyy harmaassa kohdassa.

Earth/grass/paving-batcheissa indeksit reindeksoidaan yhdistettyyn attribuuttipooliin, joten niiden raakaindeksit eivät ole yleisesti V6:n tavuilleen samat. **Dekoodatut järjestetyt kulmat ovat samat.** Muissa yllä mainituissa pinnoissa myös alkuperäiset raakaindeksit ja primitive JSON säilyvät. Ainoa materiaalikytkennän vaihto kohdistuu aiempiin AO-paving-primitiiveihin: LOD0:ssa 28+29→27 ja LOD1/2:ssa 27+28→26, coherentPBR-klooniin. Marmorin tai rantatuen materiaalia ei vaihdeta.

V7:n leaf `losslessSourcePrimitiveFaceBlocks` sekä yhdistettyjen primitiivien sisäiset `sourcePrimitiveFaceBlocks/sourceExtras` tarkistettiin todelliseen aineistoon. Ne kohdistuvat oikein. Lähdeprimitiivin numero ja nykyinen primitiivinumero ovat tarkoituksellisesti eri asioita. Näistä kentistä ei löytynyt tarkastetuissa vastaanottajan konversioskripteissä vesivalinnan lukijaa.

## Vesi on erillinen riippuvuus

Pinnitetty alkuperäinen vientiadapteri `export-test284-tile-v5-roofdiag.py` ohittaa `WATER.is_preview_water_surface` -objektit. `owner_water_support.py:12–17` tunnistaa ne semanttisista esikatselumerkinnöistä, VESI_-nimestä tai vesi-materiaalista. Sama lähdepohja koskee V6:ta ja V7:ää. Kummankaan tile2_3-GLB:n materiaaleissa ei ole vesi/water/basin-nimistä materiaalia. Maa-materiaalilla on erillinen arvioitu altaan pohjatuki ja owner_shore_stone-materiaalilla rantatuki; ne eivät ole sama asia kuin runtime-vesipinta.

Nykyinen `CesiumKaupunki.cs:809–816` avaa omat GLB-mallit ja `KaupunkiVesi`-kerroksen erikseen. Veden lähde on vesihakemiston indeksi ja kohteen JSON/bytes-verkko, ei GLB:n primitiivi. `KaupunkiVesi.cs:123–203` sisältää Pakotettu-valinnan, kohdehaun, datalataukset ja oman shaderin; 219–253 hoitaa Ion-maaston painamista vesiverkon perusteella. `VesiMaastoPainallus` sallii veden Ion-datalla ja rajoittaa maaston painamisen siihen.

Nykyisen OletusKohteet-listan joukossa ei ole peking. Siten Pakotettu=null ei yksin ohita kohdevalinnan oletusrajausta; ajon Pakotettu-arvoa, indeksiä tai lataustulosta ei tiedetä. Tämä on konkreettinen tarkistettava nykykoodin ehto, **ei väite että dc48614f:n V7-ajossa vesi olisi ollut pois**.

Tarkastetut kutsut eivät valitse tätä vettä oman GLB:n node-/materiaalinimellä, displayRolella tai primitiivin numerolla. V6-kuvan tumma vesimäinen pinta ei yksin todista sen olevan V6:n GLB:n vesiprimitiivi. Erillisen vesikerroksen lataus/visibility, maaston painallus tai kyseisessä kohdassa näkyvä muu pinta on erotettava runtime-lähteellä.

## Esikäsittelyn todellinen haarautuminen

Nykyisen `omat_mallit_ktx2.py`:n puhdas portti-funktio arvioitiin muistissa ilman konversiota tai tiedostokirjoituksia. Kaikissa kolmessa V6-LOD:ssa se löytää kolme materiaaliansa-virhettä: earth 2 primitiivissä, grass 3:ssa ja AO-paving 2:ssa. V7 läpäisee portin. Lähteen texture-slot-arvio on 68 vastaan 61; se ei ole GPU-muistimittaus.

`instanssit` (92–105) kutsuu V6:lle yhdistämisskriptiä mutta kopioi portin läpäisevän V7:n tavuilleen ennen KTX2-vaihetta. `omat_mallit_instanssit.mjs` yhdistää materiaalin ja attribuuttiskeeman mukaan sekä voi nimetä luodun alisolmun materiaalinimellä. Kokonaisrajat ja kolmiomäärä tarkistetaan, mutta se ei ole materiaalikohtainen vesi/tasanne-vastaavuustesti.

**Haarautuminen on todistettu nykykoodin riippuvuus, ei todistettu ajon juurisyy.** Tarkastetuissa skripteissä ei ole vesinimeen perustuvaa poistoehtoa eikä lähde-face-block-metadatan lukijaa. Mahdollinen muunnetun aineiston, tileset-kehyksen tai välimuistin ero pitää osoittaa vastaanottajan oikeista tulostiedostoista.

## Ion-leikkaukset ja säilytetyt aukot

Sekä 12-osainen GeoJSON että reikaversio ovat V6:ssa ja V7:ssä tavuilleen samat. 12-osaisen SHA on `77fa13fce4fe61d4dc5014601ccfcc5e6ea0374555d5fbd8c0a47a6ce6ad7ef7`. Metadata ilmoittaa vesiväylien 10 m:n retention-puolileveyden ja nimenomaan, ettei se ole mitattu veden leveys.

Reikaversiossa on kahdeksan sisärengasta. Jokaisesta löytyi deterministisessä pistekokeessa sisäpisteitä, jotka jäävät kaikkien 12 leikkausosan ulkopuolelle. Pitkän aukon lon/lat-raja on noin [116,3866271; 39,9132212]–[116,3896571; 39,9198953]. Tämä vahvistaa, että osiin jakaminen säilyttää aukkoja. Pistekoe ei ole koko polygoniyhdisteen tarkka ekvivalenssitodistus eikä kuvapikselin maailmakoordinaattikohdistus.

Siksi kaikkien 12 osan latautuminen ei tarkoita, että koko palatsin ulkovaippa olisi leikattu umpeen. Sama säilytetty aukko voi näkyä molemmissa versioissa; tämän staattisen leikkauksen identtisyys ei yksin selitä V6/V7:n vesieroa. Parentin cut-/kamera-analyysi ratkaisee, onko kuvassa kyse tarkoitetusta vesi-aukosta vai tahattomasta kuivapinnan raosta. Nykyinen CesiumOmatMallit kohdistaa ion_leikkauksen Ion-tilesetiin, ei erillisen vesikerroksen meshien valintaan.

## Rajatut hypoteesit ja minimikorjaus

Ensisijaisesti on erotettava vastaanottajan muunnetun paketin ero erillisen vesikerroksen tilasta. Ion voi myös peittää oman geometrian leikkaamattomalla alueella; lähdegeometrian muuttumattomuus ei takaa ladatun maaston tai veden ajonaikaisen tilan identtisyyttä. Vaalea alue voi lisäksi kuulua tarkoituksella muuttuneeseen paving-materiaaliin tai eri valaistukseen, kunnes se kohdistetaan lähdekolmioon.

Suositeltava minimikorjaus on säilyttää todistetusti ennallaan oleva marmori-/pohja-/rantageometria ja selvittää ensin vastaanottajan tulostavu sekä vesikerroksen tila. Jos virhe osoittautuu konversioon, lataukseen tai vesikerroksen/maaston käsittelyyn, korjataan juuri kyseinen ehto. Vedenkorkeutta, DEM:ää tai tuottajan vesitasoa ei nosteta kuvaperusteisesti. V8:n cut-muutos rajataan mitattuun tahattomaan aukkoon ja kiveyskorjaus valtuutettuun ruuturajaan; tarkoituksellisia veden säilytysalueita ei täytetä summittaisesti.

Vastaanottajalta tarvittava vähimmäislähde parentin kautta:

- Ajon todelliset V6/V7 tile2_3:n kolmen LOD:n KTX2-GLB:t SHA:ineen sekä konversiokomennot, skripti-/työkalupinnit ja mahdolliset ennen-KTX2-välitiedostot.
- Molempien ajopakettien mallit.json ja tile2_3 tileset.json: kaikki 12 ion_leikkaus-koordinaattijoukkoa, transformit/korkeus, LOD-URI:t ja välimuistista todella ratkenneet tiedostohashit.
- dc48614f:n pinnitetyt vesi-/loader-lähteet ja vastaavat Pakotettu/Nosto/index/kohde- sekä vesiverkon JSON/bytes-lähdetunnisteet.
- Samasta k5-ajosta veden avaus/lataus/palalokit ja maaston painallusloki sekä aktiivisuus-, transformi- ja syvyys-/korkeusnäyte yhdestä täsmällisestä vallihautapisteestä ja yhdestä tasannepisteestä.

Lähdegeometrian säilyminen: **PASS**. Runtime-juurisyy: **avoin**. Vanha 399c814:n V6-AO-arvio pysyy kumottuna; uusi AO-arvio on vastaanottajan myöhempi työ. V8 on tässä vain #361:n korjauksille. Toimittamattoman #362 roof-red-candidate3:n paikallinen revision8 ei ole tämä V8 eikä sitä sisällytetä.

Vain nimetyt kaksi uutta raporttia kirjoitettiin T7:lle ulkoisella Python-wrapperilla nice15:llä. Ei Blenderiä, Unityä, Gitiä, assetti-/generaattorimuutoksia, delegointia, kaupunginlaajennusta, runtime-testiä tai vastaanottaja-/vahtiviestejä.
