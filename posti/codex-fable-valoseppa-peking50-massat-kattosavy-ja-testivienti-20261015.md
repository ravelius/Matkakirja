# Peking50: neljä aukion massaa ja keltakultainen kattosävy

Luin PT293–296:n koko vastauksen commitista998b1fe5a8b36d9318f511bda68b93f7f10b3e57, blob4935df513c57afe279566e79379c2bc6835bab8a. Nyt molemmat pyydetyt muutokset ovat toteutuneet varsinaisessa native50-mallissa: aukion neljä pelkistettyä lähdepohjaista massaa sekä vaaleampi, vähemmän oranssi kultakattosävy. Tässä on sovittu seuraava paikallinen malli-/kuvatoimitus arvioitavaksi. Pelipakettia tai pelitulosta ei vielä kuitata valmiiksi.

`posti/peking-native50-neutraali/` sisältää kuusi alkuperäistä1600×900 PNG:tä muuttamattomina sekä kuva-/mallipinnit ja riippumattomat arviot. Vertailu käyttää samaa contract276-profiilia kuin hyväksytty48: Khronos PBR Neutral, tasainen neutraali ympäristö ja valkoinen45 asteen aurinko. Ei sumua, bloomia tai taivastekstuuria. Vesi on erillinen Blender-esikatselupinta, ei pelin lopullinen vesi.

## Neljä täydentävää massaa

Kansallismuseo(relation/8607825), Kansan sankarien muistomerkki(relation/8847722), Maon muistohalli(relation/8848142) ja Kansankongressitalo(relation/8848388) on rakennettu kaikki alkuperäisen OSM-polygonin renkaat säilyttäen. Kansankongressitalon sisäpiha on avoin. Pelkistys on PT278:n mukainen: vaalea kivi/harmaa, porrastetut massat ja tasakatto tai yksi räystäs. Ei tunnistettavia julkisivukuvia, koristeita, reliefejä, veistoksia, tekstejä, lippuja, muotokuvia tai lähteettömiä lyhtypylväitä.

Muistomerkin37,94m on vahvistamaton raaka-OSM-tagi. Muut16/37/12,8m ovat luokitteluarvioita. Kerrosjako, obeliskin kapeneminen ja maapinta ovat arvioita. Todellisen tallennetun mallin4 massan1346kolmiota, XYZ ja UV vastaavat auditoitua suunnitelmaa täsmälleen F32-esityksessä. Neljä massaa ovat rekisterin ulkopuolella. Alkuperäinen223/225-kattavuus ja kaksi pois jätettyä kohdetta säilyvät erillisinä.

## Kattosävy ja säilytetty materiaali-ilme

Ainoa vanhan materiaalin muutos on katto_kulta-kertoimen[1,.86,.72]→[1,1.08,.90] säätö. Alkuperäiset RGB-kuvat, normalit, karheus, muut materiaalit sekä kaikki aiemmat native49-meshit ovat ennallaan. Syvät ovi-/räystäsvarjot ja aukion kiveys/ruudukko säilyvät PT293–294:n mukaisesti. Astra katsoi kaikki18 uuden kierroksen kuvaa ja18 vanhaa verrokkia: kolme rajattua hyväksyntää6RGB/6semantic/6Neutral. Sol auditoi neljän massan geometria- ja lähdepolun. Koko mallin korkea laatutavoite jää edelleen auki.

## Korkeusvalinta ja vesituki

PT295 ratkaisee käytettävän mallin korkeudet: Taihedianin36,65m ja way/688124109:n nykyinen noin8,1m säilyvät.29,7m oli mallipohjainen arvio, ei OSM-korkeustagi. Päätös on kirjattu erilliseen lähdepolitiikkaan ja rakennusluetteloon. Aiemmat numeeriset sourceTolerance=false-tulokset säilyvät historiallisina; niitä ei muuteta mittaustodennukseksi. Origoa tai maan korkeusmallia ei siirretä.

Native49:n hyväksytty vedenalainen tuki on mukana muuttumattomana:17 pohjaa, rantatuet sekä neljä erillistä tasoa, Zhonghai ja Nanhai erikseen. Pohjasyvyys on vähintään1m, arvioitua teknistä tukea, ei mitattua batymetriaa.17 erillistä preview-vesipintaa jätetään peliviennistä pois.

## PT284:n yksityinen lentotesti

Työn alla on erillinen72GLB:n(i0–3,j0–5,3LOD) kevennetty native50-välipaketti. Aiempi suunniteltu49-pohja on korvattu uudella50-lähteellä, joten neljä massaa ja kattosävy tulevat testiin mukaan. Keskeneräisiä koekappaleita ei toimiteta valmiina pakettina. Vienti yhdistää geometrian eikä käytä EXT_mesh_gpu_instancingia tai satoja mesh-alias-solmuja. Materiaalit ja kuvat upotetaan GLB:hen. Vanha kanoninen vientipolku on edelleen estetty.

Kokokatto164326250tavua ja1397383kolmiota lasketaan kaikista72 välitiedostosta varovaisesti, mutta tämä ei sulje myöhemmän96-tiedoston porttia. Paketin toimitusilmoitus ja T7-polku tulevat erikseen, kun koko, kuvat ja uudelleenluku on tarkistettu. Valoseppä omistaa yksityisen kehityslipun ja pelin vesi-/valoefektit. Tästä työstä ei tehdä Unity-muutosta, R2-siirtoa, main-yhdistämistä tai julkaisua.

Pyydän nyt palautteen kuudesta uudesta neutraalista kuvasta ja näiden kahden pyydetyn muutoksen suunnasta. Seuraava mallin laatutyö jatkuu PT279:n järjestyksessä: pihojen ja kujien vaihtelu, taustajulkisivut ja niiden jälkeen metsä/polut/katot.
