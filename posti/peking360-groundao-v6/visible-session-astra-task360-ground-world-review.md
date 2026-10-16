# Tehtävä 360: ground world AO, riippumaton visuaalinen arvio

**Tulos: kelvollinen yhden ruudun 2_3 yksityiseksi pelitestiehdokkaaksi.** Näytetyissä ambient-kuvissa ei havaittu estävää uutta polygoniläiskää, mustaa kehystä, leveää haloa tai arkkitehtuurin peittymistä. Muurien ja jalustojen maapuolelle tulee maltillinen paikallinen kontaktitummuma. Hyöty on lähikuvissa pieni mutta luettava, yleiskuvassa hyvin hienoinen.

Hyväksyntä koskee tämän rajatun ehdokkaan viemistä yksityiseen pelitestiin visuaalisen portin puolesta. Se ei korvaa teknistä auditointia eikä hyväksytä pelin AO-slotin toimintaa, koko kaupungin laatua, tehtävän 360 valmistumista tai ihmisomistajan lopputulosta. Mallia tai pelipakettia ei tässä toimitettu tai muutettu.

## Aineisto ja sidonta

Katsoin henkilökohtaisesti kaikki 18 alkuperäistä PNG:tä: before-v5 ja after-groundAO-probe, kummassakin kuusi jäädytettyä näkymää ja ground-contact-1..3. Luin yhteisen sekä molempien vaiheiden render-proofit, candidate-proofin ja world-metric-bake-proofin.

18 kuvan hashit ja 48 GLB-tuontiviitteen hashit täsmäävät. Ennen/jälkeen-tuonneista vain `peking_2_3_lod0.glb` vaihtuu. Tarkistin myös ehdokkaan kolme LOD-GLB:tä candidate-proofiin sekä lähdeleivonnan proof-hashin sidonnan. Kameroiden, yhteisen ECEF-kehyksen ja kirjattujen ambient-/varjoasetusten metadata täsmää ennen/jälkeen. Tiedostokohtaiset hashit, kameratodisteiden viitteet ja pikselitarkistukset ovat JSON-raportissa.

Ehdokas koskee vain ruudun 2_3 kahta alkuperäistä pihakiveyspintaa, primitiivejä 28 ja 29. Rakennusten COLOR_0-AO, kattovärit, V4-puuvärit, seam-cover ja tehtävän 361 toistokorjaus eivät kuulu kokeeseen. Niiden säilyttämisen teknisiä väitteitä ei toistettu tässä rakenteellisena auditointina.

## Kontaktit ja avoimet pinnat

Alla olevat rajaukset ovat alkuperäiskuvan pikseleitä `[x0,y0,x1,y1]`, lähtöpiste vasen yläkulma. Ground-contact-kuvat ovat 1280 × 720, taihedian 1600 × 900. Rajaukset sisältävät myös muuttumattomia pintoja, joten niiden keskiarvot kuvaavat vain paikallisen muutoksen suuruusluokkaa.

| Kuva / ROI | Havainto |
|---|---|
| ground-contact-1, [140,245,300,330] | Punaisen muurin alakulman maakontakti vahvistuu pehmeästi. Alueen keskimääräinen RGB-näyttöarvo muuttuu noin 57,33 → 56,41; ei mustaa kehystä. |
| ground-contact-1, [300,155,480,250] | Muurin vinon jalan lähellä paikallinen tummuma, noin 60,43 → 59,75. Julkisivun punainen säilyy. |
| ground-contact-1, [230,340,460,425] | Avoin pihakiveys säilyy lähes ennallaan, noin 82,30 → 82,27. Ei laajaa kolmiomaista tai teräväreunaista läiskää. |
| ground-contact-1, [800,250,1040,350] | Toinen avoin piha-alue säilyy tasaisena, noin 79,36 → 79,19. |
| ground-contact-2, [320,520,440,615] ja [580,305,700,415] | Pitkän ulkomuurin jalan kapea kiveysalue tummuu maltillisesti. Keskiarvomuutokset noin −1,23 ja −1,30; ei uutta leveää haloa. |
| ground-contact-2, [920,90,1010,170] | Kauempana näkyvä osa ei osoita merkittävää lisävaikutusta. Parannusta ei yleistetä koko ulkomuuriin. |
| ground-contact-3, [465,340,680,415] | Keskimmäisen vaalean jalustan maapuolen kontakti vahvistuu, noin 67,28 → 65,69. Jalustan oma pinta ei saa tässä uutta rakennus-AO:ta. |
| ground-contact-3, [735,278,850,330] | Takana olevan vaalean jalustan kulmassa paikallinen syvyys lisääntyy, noin 48,42 → 46,88. |
| ground-contact-3, [165,275,430,335] | Terassin alimman näkyvän reunan maakontakti vahvistuu hienoisesti. Tumma alareuna on osin olemassa jo ennen-kuvassa. |
| ground-contact-3, [225,375,425,490] | Avoin piha pysyy tasaisena, noin 77,39 → 77,18. Kiveyksen alkuperäinen toisto säilyy. |
| ground-contact-3, [470,580,630,655] | Lähemmän tasanteen alapuolinen maaliittymä vahvistuu paikallisesti; ei pitkää suunnattua heittovarjoa. |
| taihedian, [910,780,1250,820] | Oikean etuterassin maapuolella pieni lisäsyvyys, noin 57,51 → 57,02. |
| taihedian, [350,780,710,820] | Vasemman etureunan kontrolli on käytännössä muuttumaton. Yhden ruudun AO ei vielä kata koko etuterassia. |
| taihedian, [1060,560,1300,675] | Ylemmät terassitasot ja kaiteet säilyvät; niiden alapintojen AO-puutetta ei tämä koe ratkaise. |

Arvot ovat renderöityjen RGB-kanavien aritmeettisia keskiarvoja asteikolla 0–255, eivät lineaarisen AO-kartan arvoja, luminanssimittauksia tai metrisiä häivytysleveyksiä.

Ground-contact-1:n tumma T-muotoinen pinta ja ohut kulmikas saumaviiva, erityisesti `[0,425,570,515]`, näkyvät jo V5-vertailussa. Myös ground-contact-3:n ohut diagonaalinen viiva on vanha. Niitä ei saa raportoida tämän AO:n uusiksi polygoniläiskiksi tai korjatuiksi saumoiksi. Toimeksiannossa mainitun packed UV probe2:n hylkäystä ei avata uudelleen; sen kuvia ei tässä vertailtu. Tässä uudessa 18 kuvan sarjassa ei havaittu kuvattua laajojen uusien polygoniläiskien virhettä.

## Yleiskuvat, kontrollit ja ruudun reuna

Ilma-kuvassa hyöty on hyvin pieni normaalissa esityskoossa. Uutta suurta tummaa ruutua tai suorakulmaista AO-kehystä ei näy. Taihedianissa vaikutus pysyy maapuolen kontakteissa; kattojen, pylväsjulkisivun ja terassien näkyvyys säilyy. Aukio-kuvassa ei havaittu uutta regressiota.

Beihai, jingshan ja hutong_ilma katsottiin ennen/jälkeen negatiivisina kontrolleina. Näkyvää muutosta ei havaittu. Pikselitarkistuksessa niissä ei ole yhtään yli 10 näyttöarvon eroa missään RGB-kanavassa; keskimääräiset erot ovat alle 0,0001. Tämä tukee muutoksen paikallisuutta näissä kameroissa.

Näytetyissä näkymissä ei havaittu laatan ulkorajan laajaa sävyhyppyä. Koko ruudun 2_3 ulkorajaa ei kuitenkaan ole paikannettu kuviin erillisellä rajatodisteella, eikä yksikään näistä havainnoista hyväksytä koko reunaa kaikista kulmista. Pelitestissä on katsottava rajan molemmat puolet, LOD-vaihdot sekä liittymä muuttumattomaan seam-coveriin. Rajallisen pilotin kontaktiepäsymmetria ei ole tässä blokkeri; se jää näkyväksi rajaukseksi eikä tarkoita koko palatsin valmista AO:ta.

## Mitä tämä koe ei vielä ratkaise

Uutta AO:ta ei tule rakennusten omiin pintoihin: räystäiden alapuolet, palkiston syvennykset, terassitasojen alapinnat ja kaiteiden kontaktit jäävät tämän kokeen ulkopuolelle. Myös muilla laatoilla olevat maakontaktit puuttuvat. Ennen-kuvien valmiita tummia kohtia ei pidä laskea uuden AO:n ansioksi. Pihakiveyksen toisto on ennallaan; tehtävää 361 ei hyväksytä tässä.

Renderöintitodisteiden mukaan aurinkoa ei käytetä, geometriset heittovarjot on kytketty pois ja valo on yhdenmukainen ambient. AO on Blenderissä kytketty albedoon diagnostisesti voimakkuudella 0,6, koska tuonti ei kytke glTF-occlusionia suoraan. Tämä tekee vaikutuksen paikantamisen mahdolliseksi, mutta **ei ennusta pelin AO-slotin vaikutusta suoraan auringonvaloon, heijastuksiin tai klo 13/18 -ulkoasuun**. Myös normaalikanta ja puualphan esikatselu eroavat pelistä. Vain LOD0 renderöitiin.

## Seuraava rajattu pelitesti

Yhden ruudun yksityinen pelitesti on visuaalisesti perusteltu, eikä tämän aineiston perusteella tarvita sitä estävää uutta offline-kameraa. Tekninen portti pysyy erillisenä.

Pyydä V5 ennen / sama ruutu AO jälkeen -parit samoissa ground-contact-1..3- ja taihedian-kameroissa klo 13 ja 18. Pidä valotus, LOD ja muut materiaalit samoina ja kirjaa AO-slotin tila. Tarkista C1-wall-, C2-wall-mid- sekä C3-plinth/corner-kohdat läheltä: tummuman tulee pysyä pehmeänä myös iltavalossa. Tarkista koko 2_3-ulkoraja ja LOD1/2-vaihdot kameran liikkuessa. Oikea lineaarisen AO-datan ja pelin occlusion-slotin käyttö, voimakkuus ja mahdollinen tekstuurin monistuminen ovat erillisiä teknisiä/pelitestin tarkistuksia.

Ambient-diagnostiikan albedokytkentä ei ole hyväksytty ohje muuttaa pelin alkuperäistä albedoa. Katot, V4-puut, saumaehdokas ja alkuperäiset RGB:t säilyvät. Tämä raportti ei hyväksytä aurinkovaloa, vettä, verhoa, runtimea tai koko kaupungin laatua. Vain tämä raporttipari kirjoitettiin; aiempi baseline-raportti jäi muuttumattomaksi.


## Lisätarkistus: hylätyn probe2:n kolme kamerakulmaa

Katsoin kaikki kuusi `ground-ao-world-regression-renders`-sarjan alkuperäistä 1600 × 900 -kuvaa sekä vanhan probe2:n `ambient-diagnostic-ground-contact-2.png`-virhekuvan (1280 × 720). Tarkistin uuden sarjan kuusi kuvahashia, 48 GLB-tuontihashia, kameramäärittelyjen yhtäläisyyden sekä `priorCameraProofSHA256`-sidonnan vanhan probe2:n **before-v5/render-proof.json**-tiedostoon. Uuden regressionäkymän tuonnit vastaavat alkuperäisen 18 kuvan world-AO-sarjan tuonteja. Myös alkuperäisten 18 kuvan ja kolmen ehdokas-GLB:n hashit tarkistettiin uudelleen muuttumattomiksi.

**Tulos säilyy: yhden ruudun yksityinen pelitestiehdokas kelpaa visuaalisesti.** Vanhan 1280 × 720 -virhekuvan rakennusten välissä näkyvä tumma kulmikas pinta, noin ROI `[550,315,675,430]`, ei toistu uudessa kuvassa saman pose/FOV:n kohdalla. Vertailu vanhaan on laadullinen: eri resoluutioille ei laskettu pikselieroa, niitä ei skaalattu eikä esitetä rekisteröitynä pikseliparina.

Uuden `ambient-diagnostic-rejected-probe2-contact-2.png`-parin täsmälliset tarkistusalueet (1600 × 900):

| ROI | Uuden ennen/jälkeen-parin havainto |
|---|---|
| [690,405,840,540] | Rakennusten välissä ei laajaa kulmikasta tummaa läiskää. Keskimääräinen RGB-näyttöarvo noin 60,38 → 60,15. |
| [450,690,760,850] | Avoin etupiha pysyy tasaisena: noin 71,649 → 71,648. |
| [320,590,690,670] | Vasemman rakennuksen maakontakti vahvistuu maltillisesti, noin 56,35 → 55,61. |
| [820,680,1030,765] | Oikean rakennuksen jalustan lähellä paikallinen kontakti, noin 51,01 → 50,06. |
| [1300,300,1595,500] | Oikean puolen avoimessa kiveyksessä ei vanhan virhekuvan kaltaista suurta tummaa polygonialuetta. |

Regressiokamera 1 näyttää laajan tasaisena säilyvän pihan; vanhat ohuet viivat säilyvät. Kamera 3 näyttää maltillisia kontakteja käytävissä ilman uutta laajaa laikkuuntumista avoimella taustapihalla. Molemmissa katot peittävät osan maasta, joten piilossa olevia pintoja ei hyväksytä näiden kuvien perusteella.

Lisäsarja vahvistaa aiemman polygoniläiskävirheen poissaoloa näissä kolmessa kamerakulmassa. Se ei laajenna hyväksyntää pelin auringonvaloon, heijastuksiin, koko laatan ulkorajaan, rakennus-AO:hon, tehtävään 361 tai runtimeen. Aiemmat rajaukset ja pelitestipyynnöt pysyvät.
