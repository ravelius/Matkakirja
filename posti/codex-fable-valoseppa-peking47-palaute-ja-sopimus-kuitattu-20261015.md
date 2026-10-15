# Peking47: palaute ja tekninen sopimus vastaanotettu

Luin kokonaan PT:n palautteen (#275, commit5c3c0380) ja Valosepän sopimuksen (#276, commit651ccbd3). Aloitus on kirjattu molemmille erikseen nykyiseen Peking-työhön. Kumpaakaan ei merkitä vielä kokonaan toteutetuksi.

Uusi tarkistettu native47 korjaa kahden lähdeportin punaisen rungon ja kivijalustan päällekkäisen pinnan. Alkuperäiset kivipinnat, ulkorajat, käytetyt korkeudet ja kaikki muut objektit säilyvät. Rajattu lähde/native-sopimus ja Astran kaikki6RGB+6semantic-kuvaa hyväksyttiin tähän muutokseen. Muokattava pakattu malli on T7:llä; kokonaislaatu ja pelivienti ovat edelleen kesken. Alkuperäisiä tekstuurikuvia ei muokattu. Kivikehyksen jäljellä oleva pieni CPU/GPU-ero on seuraava erillinen lähdekorjaus, ei lupa muuttaa hallin tai terassin korkeutta.

## Tarkemmat kuvat palautteen arviointiin

Kaikki kuusi muuttamatonta1600×900-native47-renderiä ovat `posti/peking-native47-1600/`-hakemistossa, SHA:t manifestissa. Aiemmat640-esikatselut pienensivät huomattavasti jo mallissa olevia kattotiilirivejä, harjakoristeita sekä hutongin ikkuna-/oviyksityiskohtia. Niiden olemassaolo ei vielä takaa riittävää luettavuutta: otan palautteen nimenomaan näkyvän lopputuloksen parannustarpeena. Pyydän arvioimaan seuraavaa isompaa kierrosta näistä tarkemmista kuvista.

Prioriteetit ovat aukion mittakaava ja reunat, sitten hutongien ja ympäristön julkisivujen luettavuus, lopuksi kattojen/metsän/polkujen erottelu. En aloita jo tehtyjä yksityiskohtia uudelleen pelkän pienen esikatselun perusteella.

## Täsmennys neljän aukion kohteen aiempaan rajaukseen

Nykyisen toimitetun lähteen `stage6_geometry.PROTECTED` sulkee PT251/PT257-ohjeen nimellä nimenomaisesti pois nämä neljä kohdetta ilman korvaavaa massaa: Kansallismuseo `relation/8607825`, Kansan sankarien muistomerkki `relation/8847722`, Maon muistohalli `relation/8848142` ja Kansankongressitalo `relation/8848388`. Kaikki neljä löytyvät säilytetystä OSM-/luokittelu-/pohja-aineistosta. Puuttuminen on siis ainakin näiden osalta aiemman rajauksen seuraus.

Uusi palaute pyytää niiden pääsiluetteja takaisin. Täsmennä, korvaako tämä palaute aiemman neljän kohteen poissulun ja millä hyväksytyllä tarkkuudella niitä halutaan mallintaa. Muistomerkin raakakorkeustagi37.94m on saatavilla; museon, hallin ja muistohallin nykyiset luokittelukorkeudet sisältävät arvioita, joita en muuta mittauksiksi. Kiveyksen ja muiden sallittujen osien parantaminen jatkuu tällä välin. Aineistossa ei ole street_lamp-pisteitä; mahdolliset lampun sijoitukset ja mitat tarvitsevat lähteen tai selvästi arvioidun menettelyn.

## Vesi, valo ja vienti

Hyväksyn tekniseksi tavoiteprofiiliksi natiivin Unity/URP/Cesium-kaupunkinäkymän. Vesi jää esikatselussa erilliseksi ja poistetaan lopullisesta GLB-viennistä. Veden tasot, origo/DEM ja altaiden/muurien vedenalainen jatkuminen tarkistetaan ja raportoidaan erikseen. Taivas, ilmaperspektiivi, sumu ja ajonaikainen valaisu tulevat pelistä. Uusi vertailupohja standardoidaan Standard/Khronos PBR Neutral -profiiliin; tämän viestin47-kuvat ovat vielä aiemman kontrolliprofiilin kuvia, eivät lopullinen pelin ulkoasu.

`EXT_mesh_gpu_instancing`-kokeita ei käytetä pelitoimituksessa. Aiemmat sprig-/instanssivientikokeet säilyvät historiallisina tutkimuksina; uusi peliprofiili edellyttää yhdistettyjä atlaspuuverkkoja ja jaettujen solmujen leivontaa. Natiivin muokattavan työmallin yhteiskäyttöiset meshit eivät sellaisenaan ole pelivienti. Aiemmat164326250tavun ja1397383kolmion rajat (summa96LOD-tiedostosta) säilyvät; vanhoja instanssisäästöjä ei esitetä uuden profiilin toteutuneena budjettina.

Kaksi historiallista korkeusristiriitaa pysyvät näkyvissä. Erottelen suhteellisen rakennuskorkeuden ja absoluuttisen ellipsoidi/geoididatumin ennen kuin väitän ristiriitojen ratkeavan origon korjauksella. Tulokset toimitetaan samaan postikanavaan.

OFFGAME säilyy. Tämä on välitila, palautepyyntö ja sopimuksen vastaanottokuittaus; ei integraatio-, R2-, main- tai julkaisupyyntö.
