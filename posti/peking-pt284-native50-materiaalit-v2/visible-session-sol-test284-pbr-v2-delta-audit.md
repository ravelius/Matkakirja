# PT284 native50 materiaali-v2: riippumaton delta-auditointi

**TEKNINEN PASS kaikille72GLB:n v1→v2-deltalle. Ei uusia P1/P2-löydöksiä. Ei visuaalista omistaja- tai pelihyväksyntää.** Native51-auditointia, lähteitä tai kumpaakaan pakettia ei muutettu.

## Todellinen native50 ja sallitut muutokset

Luin saved-native50:n serialisoidut Principled-node-inputit ja linkit sekä varmistin raportin todelliseen a66aa215…native50.blend-SHA:han. BaseColor on tie[.1400000006,.1400000006,.1190000027,1] ja stupa[.6999999881,.6949999928,.6700000167,1]. Kumpaankaan Base Color -socketiin ei tule linkkiä. V2:n factorit ovat tarkalleen samat serialisoidut listat, eivät uusi sävyarvio.

Tarkistin myös kaikkien saatavilla olevien plainBSDF:n BaseColor/Roughness/Metallic-faktorien eron native50-nodeihin: 8BaseColor-,34Roughness- ja34Metallic-materiaalinimeä. V1:n ainoat erot ovat ilmoitetut2BaseColor-kenttää; V2:een ei jäänyt vertailun piirissä olevia plain-faktorieroja. Linkitetyt/tekstuuriohjatut socketit erotettiin plain-vertailusta.

## Kaikkien72tiedoston riippumaton vertailu

Jokainen V1GLB täsmää aiemman oman72auditin SHA:han. Jokaisessa v1/v2-parissa kokoBIN-chunk payload, myös padding, on tavulleen sama. Palautin uudenJSONin sallitut factorit vanhoihin arvoihin ja vertasin kokoJSONin kanonista esitystä myös numeroidenJSON-tyypit säilyttäen: kaikki muu on identtistä. Muutoksia täsmälleen75: stage5_road72tiedostossa, stupa_valkoinen3tiedostossa.

Geometria, indeksit, UV:t, normalit, kaikki upotetutkuvapayloadit, materiaalien muutPBR/alpha/sampler-kytkennät, roof303tintit ja puiden korjatutnormalit pysyvät muuttumattomina. Header/chunk/accessor-rajat ja noextensions/embedded-ehdot luettiin omalla lukijalla uudelleen. Normal-transform-witnessit toistettiin V2:sta: 6witnessiä, pahin kulmaero0.000000°. Native50:n todellinen kultakatonMIX-B vastaa[1,1.08,.9,1]; tämän faktorideltan muutokset eivät koske sitä tai sen kuvapayloadia.

|Taso|GLB|Tavua|Kolmioita|
|---|---:|---:|---:|
|LOD0|24|75797596|546799|
|LOD1|24|40262260|414355|
|LOD2|24|38296504|413023|
|Yhteensä|72|154356360|1374177|

TavumuutosV1:stä+208B tuleeJSONista. Rajaan164326250B/1397383kolmiota jää 9969890B/23206kolmiota. Tämä ei osoita lopullisen96paketin alitusta.

## Manifesti ja tositeketju

24laatan/3LOD:n tiedostojoukko on täsmälleen sama. laatat.jsonin skeema, alueENU, origot37.9m ja kaikki rivien muut kuin tavukentät täsmäävätV1:een; koot täsmäävätV2-tiedostoihin. PuuID-/omistusproofit ja neljän native50-massan geometria säilyvät BIN+JSON-identtisyyden perusteella: ei native51:n1582kolmion massavärejä.

Receiptin old/newSHA, old/newbytes, kokoBIN-SHA ja kaikki75muutosrecordia täsmäävät omiin laskuihin. Proofien topSHA/bytes ovatV2:ta; correction-record sitoo neV1-SHA:han ja actual-native50-readbackiin. Vanhan embedded-image-repack-recordin SHA kuuluu historialliselleV1-vaiheelle ja säilyy tarkoituksella; sitä ei tulkittu nykyisenV2-tiedoston SHA:ksi. Muut proofkentät täsmäävätV1:een. Kopioidut source/registry/height/water/massQA-tiedostot ja build-auditit täsmäävätV1-tavuihin. Molempien versioiden72GLB:n SHA:t tarkistettiin vielä raportoinnin lopussa: ei muutoksia auditin aikana.

## Kuvat ja toimitustila

Lopullinen render-proof sisältää15PNG:tä: kaikkien tiedostojenSHA:t, mitat sekä27import-esiintymän26eriV2-GLB:n SHA-kytkennät tarkistettu. Nämä eivät ole72erillisen tiedoston visuaalinen hyväksyntä eivätkäUnity-kuvia. Tarkistaja ei ajanutBlenderiä tai tehnyt kuvallista hyväksyntää.

LUEMINUTin V2-tavusummat täsmäävät. Tilasnapshot: material_v2_all72_readback_and15_images_complete_independent_delta_review_pending. SHA-manifesti ei vielä ollut olemassa; KESKENERAINEN-merkki oli paikallaan. Omistajan sulkeminen/toimitus ja itsenäinen15kuvan visuaalinen arvio ovat erillisiä. Native51:n suljettu tekninenPASS säilyy; V2 käyttää yhä native50:tä. Ei pelihyväksyntää. OFFGAME.

Vain nimetyt delta-MD/JSON kirjoitettiin. EiBlenderiä, paketti-/lähde-/native51-muutoksia, muita viestejä tai alidelegointia.
