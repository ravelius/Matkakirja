# PT336–340: globaalin maapintakentän loppuauditointi

**Rajattu tekninen PASS. Ei visuaalista, pelin runtime-, toimitus- tai koko kaupungin laatuhyväksyntää.** Ei uusia korjausta vaativia löydöksiä tässä teknisessä rajauksessa.

Arvioitu lukittu juuri: /Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/peking-codex-20261013/production-root/peking/peking-testikaupunki-20261016-native51-v3-lentotesti

V2-vertailu: /Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/peking-codex-20261013/production-root/peking/peking-testikaupunki-20261015-native50-materiaalit-v2

Kaikki **72 GLB:tä** luettiin riippumattomasti: **156 529 080 tavua / 1 377 183 kolmiota**. Kattoihin 164 326 250 B / 1 397 383 kolmiota jää **7 797 170 tavua / 20 200 kolmiota**. Kaikki 72 SHA256:tä tarkistettiin uudelleen suljettaessa; samat. Aiempi ylittänyt saumat-ehdokas ei ole tämän raportin kohde.

## Korkeuskenttä ja maapintojen jatkuvuus

Oma kenttätarkistus vahvisti **150 korotettua solmua / 484 kolmiota**, 25 m hilavälin ja 0/0,31 m solmuarvot. Jokaisen hilasolmun turvasääntö laskettiin itsenäisesti alkuperäisestä palatsirajasta ja 105 355,311969 m²:n near-contact-suojajoukosta, turvaetäisyys **35,365339 m**.

Kenttäkolmiot ovat yksikäsitteisiä ja pinta-alaltaan päällekkäisyydettömiä. Jaettujen kenttäreunojen pääte- ja keskipisteiden korkeuslisät täsmäävät enintään **1,78e−15 m** erolla. Kaikkien **202 ulkoreunan** korkeuslisä on nolla. Koska lisä on kullakin kolmiolla affiini, tämä varmistaa myös koko reunojen jatkuvuuden. Alkuperäinen kontaktisuojajoukko sisältyy kokonaan **650 875,750952 m²:n nollakenttään**, erotus 0 m²; ei-nolla-alue on 151 250 m² ja pysyy palatsin sisällä.

Todelliset uudet maakolmiot verrattiin saman materiaalin alkuperäisiin v2-kolmioihin: lähteen XYZ-taso + yhteinen kenttä sekä lähteen UV-interpolointi. Tarkistus kattoi **3 003 uutta LOD0-kolmiota**. Suurin kärkipisteen korkovirhe **0,000000532 m**, UV-virhe **0,000015259**. Myös jokaisen uuden kolmion ja kaikkien sen leikkaamien kenttäkolmioiden päällekkäisalueiden kärkipisteet tarkistettiin: sama **0,000000532 m** enimmäisvirhe. Tämä testaa paloittain lineaarisen pinnan kolmioiden sisäosista, ei pelkästään alkuperäisistä kärjistä, ja poistaa aiemman erillisten per-face-nostointerpolaatioiden saumasyyn.

Kaikki **47 618 säilynyttä LOD0-maakolmiota** ovat v2-indeksien suunnan säilyttäviä osajoukkoja; niiden päälle tulevan kentän enimmäislisä on **0 m**. Näiden säilyneiden pintojen joukossa ei ollut pinta-alatarkistuksesta ohitettavia XY-degeneraatteja. Kaikki alkuperäiset ja uudet position/normal/UV/indeksi-maataulukot ovat laatoittain samat kaikissa kolmessa LOD:ssa. Tämä on tekninen jatkuvuustarkistus; tumman Q336-sauman visuaalinen poistuminen arvioidaan uusista kuvista erikseen.

## Lopullinen float32-geometria ja peitto

Kaikkien LOD:ien **9 009 uudessa maakolmiossa**: **0 romahtanutta kolmiota, 0 normaalin/geometrian suuntavirhettä**, vähimmäispistetulo **0,999999970198**. Normaalit verrattiin lopullisten float32-koordinaattien ristituloihin. Uusien kolmioiden suunta on ylöspäin; kaikki attribuutit ja indeksit ovat kelvollisia ja äärellisiä. Tämä uusi geometria ei ketjuta aiempien hylättyjen pintaversioiden suikalekolmioita.

Riippumattoman materiaalikohtaisen maa-peittovertailun suurin ero odotettuun v2 miinus vesivaraus -alueeseen on **0,001762 m²**. Materiaalikohtainen vesivarausleikkausten summa LOD0:ssa **0,003840 m²** sisältää päällekkäisten materiaalien mahdolliset toistot. Se ei ole koko alueen unioniluku.

Tuottajan kuitissa float32:een romahtamisen vuoksi poistettujen kolmioiden alkuperäinen projektioala on **0,001131809 m² kaikkien kolmen LOD:n summana**. Sitä ei kuitata nollaksi; kyse on kirjatusta peittotoleranssista. Lopputiedostoihin ei jää uusia nollapintaisia kolmioita. Tarkistus ei väitä täydellistä vesitiiviyttä tai matemaattisesti nollaa float32-reunasuikaleiden määrää.

## Suojatut aineistot ja värimuutos

Kaikki 72 v2-BIN-etuliitettä, vanhat accessor/bufferView-taulukot, kuvat ja kuvapayloadit, tekstuurit, samplerit, solmut ja scenet ovat täsmälleen samat. Suojatut ei-maa-/ei-massakorvausprimitiivit vastaavat v2:n JSONia ja sen tavutarkkoja viitteitä. Kattokulta, arkkitehtuuri, puiden korttigeometria, alfa, UV ja normaalipayloadit säilyvät.

Neljän source51/Mao-massan todelliset attribuutti- ja indeksitaulukot verrattiin aiemmin itsenäisesti auditoituun vesiversioon: tavutarkasti samat kaikissa LOD:eissa. Aiempi kokonaisen massan, oikean omistajalaatan, Great Hallin aukon ja omistajalaatan yli ulottuvan geometrian näyttö säilyy tällä ketjutuksella. Maon materiaalivyöhyke ei ole uusi mitattu porras tai korkeus.

Materiaalit vastaavat aiempaa auditoitua versiota lukuun ottamatta sallittua puiden kerrointa. Kaikilla puumateriaaleilla **lineaarinen RGB-kerroin 0,55**; alkuperäinen kroma säilyy. Todellisista upotetuista sRGB-kuvista ja alpha≥0,5-texeleistä laskettu LOD0-keskiarvo **(0,103836071; 0,135830907; 0,069433131)**, luminanssi **Y=0,124234886**. LOD1/2 **Y=0,123307129**. G on suurin; 0,10–0,14 tarkoittaa Y-tavoitetta eikä jokaisen RGB-kanavan alarajaa. MASK0,5, kaksipuolisuus ja normalStrength1 säilyvät. Nykyinen efektiivisen albedon kuitti vastaa omaa laskentaa.

## Sisävedet ja kaikki 12 GeoJSON-osaa

Vesivaraussuunnitelma, alkuperäinen OSM-snapshot ja molemmat WGS84-GeoJSON:t vastaavat SHA256:lla aiemmin riippumattomasti tarkistettua **9 vesipolygonin / 12 avoimen vesilinjan** versiota. Lähdeveden pinta-ala 5 647,589012 m² ja varausten unioni 39 621,217417 m². **10 m/puoli on tekninen Ion-säilytyskäytävä, ei mitattu kanavaleveys.**

Kaikki **12 Featureä** luettiin uudelleen: kelvolliset, suljetut, vastapäiväiset Polygonit ilman sisäreikiä. Keskinäinen päällekkäisyys **0 m²**; unionipinta-ala **762 504,533535 m²**. Ero odotettuun palatsi miinus vesivaraukset -alueeseen **0,000001062 m²**, vesivarausleikkaus **0,000000485 m²**. Reikäversion unioniero **0,000000275 m²**. Kaikki 12 osaa on ladattava. Eteläisen sisärantaketjun sulku jää aiemman lähdenäytön mukaiseksi tekniseksi arvioksi.

## Provenienssi ja päivitetty dokumentaatio

Source51:n **271 lähdetiedoston SHA256:t** tarkistettiin uudelleen, myös DEM- ja kuvalähteet. Origo ja kaikkien 24 laatan alue-, sijoitus- ja tiedostonimitiedot säilyvät v2:sta. Laattaindeksin kaikkien 72 tiedoston tavut sekä export-state.completed-rivien SHA/tavut/kolmiot täsmäävät omiin lukuihin. Kaikki 72 proofia vastaavat tiedostoja ja massasuunnitelmaa. Lähdeprovenienssin **14 nimettyä profiilitiedostoa** vastaavat sekä kuittia että työjuuren vastaavia tiedostoja.

LUEMINUT kuvaa nyt oikean juuren, kentän, kaikki 12 maskiosaa ja nykyiset luvut. Tila on edelleen riippumattomia arvioita odottava, ja KESKENERAINEN-merkki on paikallaan. Raportti ei muuta tätä toimituskuittaukseksi.

Uuden render-proofin **20 PNG:n SHA256:t**, **27 tuontirivin / 26 eri GLB:n** SHA:t ja kolmiomäärät sekä sidonta nykyiseen 72 tiedoston binääriraporttiin varmennettiin. Kaikkia 72 tiedostoa ei kuvattu erikseen. Tässä teknisessä auditissa ei arvioitu kuvia visuaalisesti.

## Kontaktinäyttö ja avoimet portit

Päätekijän kontaktiraportti luettiin; **76 775 näytteen kontaktirays-koetta ei toistettu**. Tulos: 0 uutta aiemmin näkyneen pinnan hautautumista, 0 kontaktisuojan nostoregressiota; **221 vesivarauksen näytettä siirtyy Ion-testille**. Raportin unionimittauksen maaero on 0,003365804 m² ja vesivarausleikkaus 0,003797856 m². Otanta ei todista kaikkien jatkuvien pintojen välejä.

Aiemmat 80 TBN-fixtureä ketjutetaan suojattujen puunormaalipayloadien kautta. Nykyinen OmaMalli.shader-SHA vastaa edelleen fixturekohdetta. Normaalikomponentin heijastusfixture ei ratkaise fyysisen koko vastanormaalivektorin tavoitetta eikä runtime-vastetta; 3,88245° on vain binning-approksimaation raja.

**Ion-väli ≥0,3 m on mittaamatta.** Vastaanottajan kaikkien maskiosien lataus, sisävesien näkyvyys ja kannatus, laitteen liikkuva LOD, päivä/ilta, TBN-runtime, FPS/muisti sekä omistajan visuaalinen hyväksyntä jäävät avoimiksi. Oma 0…0,31 m lisä ei ole Ion-korkeusmittaus. Budjettia ei korotettu eikä ylityspoikkeusta käytetty.

Blenderiä ei ajettu. Vain tämän uuden loppuauditoinnin kaksi nimettyä raporttia kirjoitettiin; pakettia, lähteitä tai malleja ei muutettu.
