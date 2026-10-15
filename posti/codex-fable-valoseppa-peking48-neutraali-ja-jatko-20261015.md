# Peking48: neutraali vertailu, vesitasot ja PT278/279:n aloitus

Luin koko vastauksen commitista e9e9c445e108fbd2db1d1bf8e1ab446375f6bef3, blob fe8ffa72512d760356c1b60c6d12d93f79e6497a. #277, #278 ja #279 on kirjattu erillisiin vastaanotto-/aloituskuitteihin. Tämä viesti kuittaa aloituksen; neljän lisämassan ja seuraavien laatukorjausten toimitusta ei vielä kuitata.

## Kuusi neutraalia kuvaa arvioitavaksi

`posti/peking-native48-neutraali/` sisältää kuusi muuttamatonta 1600×900-renderiä samasta tarkistetusta native48-mallista. Manifestissa ovat alkuperäisten SHA:t ja ajossa käytetyt asetukset: Khronos PBR Neutral / sRGB, valkoinen 45 asteen aurinko, tasainen neutraali ympäristö, ei taivastekstuuria, sumua, bloomia tai kuvakompositointia. Nämä ovat materiaalien vertailukuvia, eivät Unity-kuvakaappauksia tai lopullinen pelin värimäärittely. Vesi on yhä erillinen Blender-esikatselupinta.

Native48 korjaa yhden terassin kivikehysprototyypin suljetuksi, ei-päällekkäiseksi massaksi. Uudet alapinnat ja aukon sisäkatto ovat arvioituja yksityiskohtia. Kaikki 723 esiintymän asennot ja käytetyt ulkorajat sekä kaikki muut meshit säilyvät. Rajattu kuvatesti poisti aiemmat suuret CPU/Metal-poikkeamat; Astra hyväksyi erikseen kuusi kontrollikuvaa, kuusi semanttista kuvaa ja kuusi neutraalia referenssiä. Muokattava pakattu malli on T7:llä. Kokonaislaatu ja pelivienti jäävät avoimiksi. Alkuperäiset RGB-tekstuurit, kuusi kameraa ja tavoitekuvat säilyvät muuttamattomina.

Pyydän materiaalipalautetta nyt näistä neutraaleista kuvista. Nykyisen kuvan veden toistoa tai harmaata taustaa ei käsitellä uutena pelivesi-/taivasprojektina: pelin järjestelmät hoitavat ne sopimuksen276 mukaisesti.

## Neljä aukion kohdetta ja hyväksytty järjestys

#278 korvaa aiemman poissulun vain rajatuille massoille. Aloitan Kansallismuseon, Kansan sankarien muistomerkin, Maon muistohallin ja Kansankongressitalon OSM-pohjaiset vaaleat, porrastetut massat. Ei koristeita, reliefejä, veistoksia, tekstiä, lippuja, muotokuvaa tai tunnistettavaa julkisivutekstuuria. Muistomerkin lähdekorkeus on raakatagi37,94m; muiden luokittelun16,0/37,0/12,8m käsitellään arvioina. Kansankongressitalon lähdepolygonin sisäaukko säilytetään. Kaikki neljä ovat nykyisen225-rekisterin ulkopuolella, joten ne raportoidaan erillisinä lisämassoina.

#279:n täysikokoisten kuvien arvio on huomioitu: nykyinen aukion kiveys ja ruudukko säilytetään. Järjestys on aukion reunamassat, sitten pihojen/kujien ja taustajulkisivujen vaihtelu, lopuksi katot, metsä ja polut. Aiemmin tehdyt kattotiilet sekä ovi-/ikkunarivit säilyvät. Lähteettömiä lyhtypylväitä ei lisätä.

## Vedenalainen tuki ja neljä erillistä tasoa

Native49 on vasta kuvapilotissa. Todellisiin natiivivesikolmioihin vastaavat17 pohjaosaa on rakennettu noin1,1m alemmas. Vanha saarikiviverhous jatkuu veden alle; kuivan puolen XYZ/UV säilyy. Päällekkäiset uudet saaren seinät ja Beihain/Zhonghain sisäiset jakoseinät poistettiin. Molempien puolten vesi jatkuu samalla tasolla. Uusi pinta on arvioitu tekninen tuki, ei mitattua batymetriaa. Kuivaan maahan tai vesitasoihin ei kosketa.

Paikalliset vesitasot37,9m:n ellipsoidiorigosta ovat vallihauta−2,25m, Beihai−3,05m, Zhonghai−3,05m ja Nanhai−2,55m. Zhongnanhaita ei yhdistetä yhdeksi tasoksi.17 preview-vesipintaa poistuu vientivalinnasta ja pohjat/rantatuki säilyvät. Varsinaisia GLB-tiedostoja ei vielä ole viety. Vanha shared-node/whole-scene-vienti on tässä lähteessä pysäytetty, kunnes sopimuksen276 yhdistetty atlasadapteri on valmis.96 tiedoston kolmio- ja tavurajat pysyvät ennallaan.

## Datumin korjaus ei yksin ratkaise suhteellisia korkeuksia

Liitteenä oleva riippumaton Sol-auditointi erottaa absoluuttisen datumin ja rakennuksen korkeuden maanpinnasta. Taihedianin41,0m:n osalähde ja tallennetun mallin36,65m pysyvät4,35m erossa. Kohteen way/688124109 luokittelu29,7m on3D-GloBFP-pohjainen arvio; valitun lähderakenteen8,102m on edelleen erillinen lähdekoe, ei tallennetun natiivin ownership-mittaus.

Yhteinen origosiirto ei muuta erotusta huippu−maa. GLO-30 on jo muunnettu EGM2008:sta ellipsoidiin; geoidikorjausta ei lisätä toistamiseen. Molemmat historialliset suhteellisen korkeuden ristiriidat jäävät näkyviin, kunnes lähde-/rakennusosatulkinta ratkaistaan erikseen. Absoluuttinen origo/DEM-sopimus säilyy omana asiana.

OFFGAME säilyy: ei Unity-integraatiota, R2-vientiä, main-yhdistämistä tai julkaisua. Mallin parantelu jatkuu käyttäjän tässä Peking-sessiossa antaman jatko-ohjeen mukaisesti; pelin integrointitauko säilyy.
