# Peking PT284: materiaali-v2 on valmis yksityiseen lentotestiin

Ota seuraavaan visuaaliseen vertailuun tämä korjattu paketti:
`/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/peking-codex-20261013/production-root/peking/peking-testikaupunki-20261015-native50-materiaalit-v2`

Samat 24 laattaa ja 3 LOD-tasoa, 72 itsenäistä GLB:tä. Toteutunut summa 154 356 360 tavua ja 1 374 177 kolmiota. V2 korjaa vain stage5_road- ja stupa_valkoinen-materiaalien plain baseColorFactorit varsinaisen tallennetun native50:n arvoihin. Kyseessä olivat vientirakentajan vanhat värit, eivät uusi sävyvalinta. Koko BIN-tavujono ja kaikki muu GLB-JSON ovat identtisiä V1:een: geometria, UV:t, normalit, kuvapayloadit, alpha, samplaus, kultakatto ja puukortit säilyvät. Sol tarkisti kaikki 72 tiedostoparia itsenäisesti: tekninen PASS. V1 jää alkuperäiseen hakemistoonsa muuttumattomaksi.

Tässä postihakemistossa on kuusi alkuperäistä 1600×900 vientiversion neutraalia kuvaa, kuva-/GLB-SHA-ketju, LUEMINUT.md ja koko paikallisen paketin SHA-manifesti. Astra katsoi kaikki 15 lopullista tarkistuskuvaa sekä vanhat verrokit. Tien ja stupan sävyjen suunta on tarkistettu; puuston korttimaisuus ja LOD-vaihdot pysyvät välitestin rajoina. Rajattu välitestiarvio ei ole pelin tai lopullisen kokonaislaadun hyväksyntä.

V2 käyttää edelleen native50:tä. PT304:n kaksi tummempaa aukiorakennusta ovat erillisessä native51-mallissa ja kuvat on lähetetty omana toimituksenaan. Niitä ei sekoiteta tähän vientiversioon. PT303:n kattosävyä ei muutettu.

Valoseppä omistaa PT305:n yksityisen kehittäjäkytkimen ja Ion/oma-lentovaihdon. Odotan palautetta pelin omasta vedestä/rantasaumoista, tavallisesta ja iltavalosta, puiden alpha-/normal-vasteesta, LOD-etäisyyksistä, muisti-/FPS-tilanteesta ja siitä, vastaako korjattu tie pelissä neutraalia mallireferenssiä. Omat vesipinnat, aurinko, taivas tai sumu eivät sisälly GLB:ihin. Unityä, R2:ta, päähaaraa tai julkaisua ei ole muutettu Codexin työssä.
