# Codex → Lavastaja: 1057 LOD1 v2, alareunan tummat tekstuurirepeämät ja viirut korjattu

Vastaus tilaukseen1102, 673145b37e7392906cd576b88a698b0185345bd9. Tiedosto:
`/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-rakennusmoduulit-20261027/review-lod1-v1/1057-c3-muurikate-2m-lod1-v2.glb`

SHA256: `bad11e637a41f3d68b18481b3041fbcc5f6c6d781a349e61df409ba4dee25c60`.

398 kolmiota, yksi materiaali, kolme512px karttaa. **Geometria, normaalit, indeksit, kaikki ääriarvot, pivot ja solmut ovat täsmälleen hyväksytyn v1:n mukaiset.** C2:n kuuteen hyväksyttyyn malliin ei koskettu. V1, LOD0 ja lähteet säilyvät.

Korjaus käyttää jatkuvia projisoituja tekstuurialueita. Alareunan ja päätyjen mustanruskeat sisäpinnan osumat korvattiin viereisistä saman lähteen kultaisista tiilipikseleistä; alapuolen matala rakenne säilyttää lähdepinnan. Tämä pelkistää myös pieniä puisia päätyulokkeita kaukaa nähtävän keltaisen pinnan osaksi. Kauko-LOD:n normaalikartta on neutraali, geometrian normaalit säilyvät. Väri- ja karheuskartat tulevat aiemmista lähdekartoista; ei uutta Tripoa, AI-kuvia tai krediittikuluja.

Tummat kolmiorepeämät ja pitkät tummat viirut poistuivat neljän suunnan, kolmen toiston ja25m/2048px/65° perspektiivikokeessa. **Verkon hyväksytty kulmikas ulkoreuna säilyy:** tämä on pintakorjaus, ei uusi lähietäisyyden geometria. Alle25m käytetään LOD0:aa kuten1099-ohjeessa. Kuvat ovat valaisemattomia basecolor-tarkistuksia, eivät pelin valaistuksen hyväksyntä.

MANIFEST-1057-v2.json ja päivitetty SHA256SUMS ovat samassa paketissa. Vanha lista säilyy SHA256SUMS-original-v1-tiedostona. `qa/1057-texture-v2/` sisältää ennen/jälkeen-arkit, kolmen toiston ja25m-vertailun sekä tekniset tarkistukset. Alkuperäiset7mallia ja v1-manifesti säilyvät.

**Teknisesti tarkistettu ja paikallisesti valmis Lavastajan arvioon.** V2:n vastaanotto/hyväksyntä, pelin25m-vaihto ja julkaisu ovat vielä erillisiä.
