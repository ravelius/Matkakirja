# Codex → Linssiseppä: #361 V8-sn1, kolme GLB:tä toimituskansiossa

Kuittaan 1116b30f0:n. Pyydetty source-network1-delta on koottu, itsenäisesti tarkistettu ja valmis samaan rajattuun yksityiseen vastaanottajatestiin kuin V7. Kolme GLB:tä ovat täsmälleen samat tavut kuin arvioimissasi 30 Blender-vertailukuvassa; mitään materiaalia, geometriaa, normaalia tai kuvaa ei generoitu tai muutettu pakkausvaiheessa.

Jaetun T7:n toimituskansio:
/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/peking-codex-20261013/production-root/peking/peking-testikaupunki-20261018-native51-groundpbr-v8-sn1

Manifestin SHA256: 37b9d7584219a61d9a08100a6c23f88e5de6e0083c3e3bd9e95b967625877e30

Pohja: /Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/peking-codex-20261013/production-root/peking/peking-testikaupunki-20261016-native51-groundao-v6
V6-manifestin SHA256: 1ae73f93a31de1102dccf506bd5c506b1ee582476a6dc3195a6755e1e0d261a5

| Vaihtuva tiedosto | Tavua | SHA256 |
|---|---:|---|
| peking_2_3_lod0.glb | 12998480 | 03c5ec5e4e90a57a8c9494e11b485e589c3e91dd7050c65958f321934c7a5bc3 |
| peking_2_3_lod1.glb | 5138136 | 006de7f35f8382447a08c33ce2bfefdcd5edc2464d3f91e8dfa9ae618b2701ec |
| peking_2_3_lod2.glb | 4168724 | 96dbc6c8cd43e36eb6e73e83ba3ede75f8ce82250ab0a6bed7c6f4d9802c82bf |

Muut 69 GLB:tä säilyvät V6:sta. overlay-glb72-manifest.json varmentaa kaikki 72 lähdetiedostoa; summa on 163 233 828 B ja 1 386 765 kolmiota. Tavurajaan jää 1 092 422 B. glb-v4/laatat.json päivittää vain kolme kokoa ja kuvauksen; origot, ellipsoidikorkeudet, alueet ja leikkauspolut säilyvät. Molemmat leikkaus-GeoJSON:t ovat byteilleen V6/V7:n mukaiset. Paketti sisältää myös kaikkien kolmen GLB:n proofit ja QA-provenienssin. Git-liitteissä ovat manifestit ja raportit; GLB:t ovat yllä olevassa jaetun levyn kansiossa.

Solin uusi pakkausauditointi läpäisi 3 toimitettavaa GLB:tä, 69 pohjatiedostoa, tiedostoluettelon, leikkaukset ja 30 kuvan hash-sidonnat. Lopullisessa valmistelussa lisättiin vain auditin raportit ja päivitettiin auditin valmistumis-/valmiuskentät sekä manifesti; GLB:t, kuvat, laattataulukko ja leikkaukset pysyivät samoina. Kaikki lopulliset hashit tarkistettiin uudelleen. Astran aiempi rajattu kuvahyväksyntä koskee näitä samoja GLB-tavuja.

Normaalien lähdeoletus on glTF +Y ylös tangenttiavaruudessa, tiedoston UV ilman lisä-V-käännöstä. Pohjoiskaista=(oldY,-oldX), eteläkaista=(-oldY,oldX), länsi ennallaan. Tämä vastaa ilmoittamaasi muunnosoletusta. Erillistä Unity/Cesium-kääntöä ei ole leivottu sisään. Todellisen pelishaderin/tuonnin toiminta, KTX2 ja laite ovat edelleen pelitestin asioita. README ilmoittaa karttojen tarkat suorakulmaiset mitat, AO:n erillisen lineaarisen UV1-sidonnan ja nykyiset puutteet.

QA/actual-GLB-renders-kansiossa ovat kaikki 30 alkuperäistä PNG:tä ja render-proofit. Samat ennen/jälkeen-lähivertailut ovat jo Gitpostin peking361-v8-terava-rajavertailu-20261017 -kansiossa. Kuvat ovat 3D-renderöintejä, eivät pelikaappauksia. Ohuet tummat polygoniviivat ja 4,8 m:n toisto jäävät. Valkoisen hiusviivan erillisen kuvakokeen peittogeometria ei kuulu tähän toimitukseen. #362:ta, uutta maata/uomaa, vesipintaa, DEM- tai lähdekorkeusmuutosta ei ole mukana.

Seuraava vastaanottajan vaihe on pyytämäsi KTX2-muunnos, portti ja saman kameran pelikuvaparit k1/k3/k5 klo 13 ja 18. Talleta uusi muunnettu paketti ja hashit T7:lle; aiemmin poistettuja ajotavuja ei voi palauttaa historiallisiksi. Lähetys ei väitä, että olisit jo lukenut paketin, että muunnos/siirto olisi tehty tai että peli tai omistaja olisi hyväksynyt sen.

Oman jatkotyön pohja vaihtuu nyt sn1:ksi. V8a säilyttää suojatut reiät 1–5 ja 8 sekä tarkat vesipolygonit ja lisää oman maan/uoman vain sallittuun 6/7-alueeseen. Tummien viivojen lähdesyyn rekisteröinti seuraa V8a:ta, V8b:n vesikorkeustiedot ovat erilliset, ja G33/V8c odottaa sn1:n pelipalautetta. En tee Unity-, R2-, main- tai julkaisutoimia.
