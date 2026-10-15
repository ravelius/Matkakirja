# PT284 native50: lopullisen paikallisen72GLB-snapshotin auditointi

**TEKNINEN PASS tarkistetuille72paikalliselleGLB:lle. Ei uusia P1/P2-löydöksiä. Paketin sulkeminen/toimitus, kuvatarkistus ja Unity-runtimehyväksyntä ovat erillisiä; tämä ei hyväksy lopullista96pakettia.**

Tarkistettu kansio: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/peking-codex-20261013/production-root/peking/peking-testikaupunki-20261015-native50/glb-v4`. Vain tämän auditoinnin MD/JSON kirjoitettiin. Ei Blenderiä, toteutusmuutoksia, muita viestejä tai delegointia.

## Omat mitatut määrät

|Taso|GLB|Tavua|Kolmioita|
|---|---:|---:|---:|
|LOD0|24|75797516|546799|
|LOD1|24|40262208|414355|
|LOD2|24|38296428|413023|
|Yhteensä|72|154356152|1374177|

Rajoihin164326250B/1397383kolmiota jää 9970098B ja 23206kolmiota. Tavut ja indekseistä lasketut kolmiot luettiin itse kaikista tiedostoista ja verrattiin proofeihin, export-stateen ja laatat.jsoniin. SHA:t pinattu JSONin72filelistaan. Mukana on tarkalleen i0…3,j0…5,LOD0…2; koko toimitusjuuren alla on vain72GLB:tä.

## Binääri, resurssit ja normalit

Oma lukija tarkisti jokaisen GLB-headerin/chunkin, BIN-/bufferView-/accessor-rajat ja stridet, finitit attribuutit, attribuuttimäärät, indeksit, triangle-moodin, POSITION-min/maxin sekä normalien yksikköpituuden. Suurin pituusvirhe 1.33e-07. Kaikissa on2identity-mesh-solmua, kumpikin mesh käytössä kerran. Rekursiivinen JSON-haku ei löytänyt laajennuksia; ei instancingia, mesh-aliaksia, ulkoisia kuva-/buffer-URI:ja tai vesi-nimistä materiaalia. Perus-PBR:n faktorien arvovälit täsmäävät.

Kaikki 3533 upotettua kuvaesiintymää dekoodautuivat JPEG/PNG:nä oikean MIME:n mukaisesti. Puiden käytetyt binimateriaalit ovat neljän sallitun ryhmän osajoukko, MASK.5/double-sided, normal-strength1. Binien käyttämättömiä materiaaleja ei vaadita jokaiseen tiedostoon. Kaikki korjatut puunormal-payloadit täsmäävät suoraan bin/LOD-manifestinSHA:han.

Proofien 6 staattista normal-transform-witnessiä luettiin lopullisista GLB:istä takaisin. Johdin lähde-face-normalin tallennetun matriisin käänteisestä ja tarkistin inverse-transposen sekä actual-position/normal-osumat; pahin poikkeama 0.000000°. Tämä on staattisen geometrian witness, ei puiden shader-/runtime-normalien hyväksyntä.

## Repackin aidot suojaukset

Kaikille72tiedostolle löytyi receiptin oldSHA:ta vastaava ulkopuolinen arkisto-GLB. Vertailin itse accessorien dekoodatut tavut ja accessori-/mesh-/node-/scene-/material-/texture-/sampler-JSONin: kaikki täsmäävät. 2045 suojattua color/alpha/emission/puunormal-kuvaesiintymää säilyivät payload-tavuiltaan identtisinä.

Muuttuneet 992kuvaesiintymää ovat vain non-tree-normal/MR. Tarkistin uudet128pxLOD0/64pxLOD1/2-koot ja receipt-SHA:t. Kaikki muuttuneet dekoodatut pikselit täsmäsivät itsenäiseen LANCZOS→normal-renorm-laskuun (130 eri lähde/tuloslaskua; toistuvat samat kuvaparit välimuistissa). Geometria-/UV-/värikuva-/alpha-suojauksesta ei jääty receiptin omien booleanien varaan.

Arkistosumma ennen repackia175704020B, lopullinen154356152B. Tämä ei säilytä non-tree-normal/MR-pikseleitä identtisinä; muutos on tarkoitettu. Kolmen uuden roofdiag-tiedoston rawSHA→repack→lopullinenSHA-ketju sekä vanhojen3arkistot täsmäävät. Muiden69geometria ja suojatut payloadit täsmäävät arkistoihin; erillistä ennen-adoptiota tallennettua69täydenSHA:n listaa ei ollut saatavilla, joten juuri sitä hetkellistä kokonais-SHA-väitettä ei toistettu riippumattomana uutena mittauksena.

## Omistus ja koordinaatit toteutuneesta geometriasta

laatat.jsonin24rivin skeema ja kaikki muut kuin tavukentät täsmäävät aiempaan glb-v4:ään.550×500ENU-ruudukko ja37.9m-origot täsmäävät. Laskin origin_latlonit ja leikkausrenkaat erikseen lähteen WGS84-paikallis-ENU-yhtälöillä:8desimaalin kentät täsmäävät. GLB `(E−cx,zLocal,−(N−cy))`-muunnos on kärjissä.

JokaisessaLOD:ssä on **7992eri puuID:tä, kukin kerran**. Lisäksi jokaisen lopullisen puukortin todelliset kulmapisteet, UV:t, materiaalibin ja kahden kolmion peitto yhdistettiin alkuperäisiin inventory-matriiseihin ja atlas-recordeihin. Kaikissa72tiedostossa vertailu täsmäsi ilman koordinaatti- tai UV-eroa (myös F32-centering/glTF-V-kääntö huomioitu).1000pohjoista puuta jää rajauksen ulkopuolelle.

Kaikkien neljän native50-lisämassan täydellinen triangle-multiset täsmää lähdesuunnitelmaan jokaisessaLOD:ssä:1346kolmiota/LOD, ei1582kolmion native51-tone-suunnitelmaa. Kansankongressitalo kuuluu1,0:aan, muut3massaa2,0:aan, kukin kerran. Museon ja Kongressitalon pohjoisreunan yli jatkuvat osat ovat kokonaisina mukana. Sisäaukko säilyy täydellisen source-triangle-vertailun perusteella. Kaikkien actual-position-virhe oli0. Ei owner-laattarajaan leikkausta.

Build-auditien lähde-SHA:t täsmäävät proofeihin. Alkuperäisestä225rekisteristä223rakennettua esiintyy kerran/LOD;3dglobfp/9094 ja way/149216919 jäävät ennalleen rakentamatta. Historical/PT295-korkeusvalinnat ovat edelleen arvioita, eivät uusia maastomittauksia. Kaikki270varsinaista native50-lähdepinniä ja kanoniset vientiguardit säilyvät.

## Roofdiag ja dokumentit

Adapteriprovenienssi69V4+3V5, V5vainlaatta2,3:n kolmelleLOD:lle. Toistin ongelmapikselin590,256säteen lopullisiin tiedostoihin: **kaikissa3LOD:ssä ensimmäinen osuma katto_kulta**. Diagonaalikorjauksen actual-geometria säilyy repackin läpi. Tämä on yhden säteen todistus, ei koko kaupungin kattojen kuva- tai runtimehyväksyntä.

LUEMINUT.md luettu kokonaan. Määrät, koordinaatit, sivuuntuvat massat/bounding-volume-ohje, atlas-/repack-rajat, vastaanottajan laatta-adapterin tarve, PT304:n lykkäysnative51:een ja72vs96-ero on kuvattu oikein. Export-state=`72_files_repacked_roof_repaired_final_readback_and_images_pending`, runtime=false,304deferred=true. manifest-sha256.json ei ollut vielä olemassa; README lupaa sen tarkistuksen sulkeuduttua. KESKENERAINEN-merkki on edelleen paikallaan. Nämä ovat omistajan sulkemisvaiheen tiloja, eivät virheellinen valmis-toimitusväite.

Tekninen72tiedoston snapshot läpäisee tämän auditin. LopullinenSHA-manifesti/tilapäivitys, kuvien hyväksyntä, omistajan toimitus, pelin lento/vesi/valaistus, muisti/FPS ja lopullinen96paketti jäävät erillisiksi porteiksi. OFFGAME.
