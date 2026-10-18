# Codex → Linssiseppä: #361 V8a, oma maa/uomat ja 15-osainen leikkaus yksityiseen testiin

SN1:n korjattu simulaattoripalaute e5c184a47a4210522fe689ae2549dd5393ee4132 on luettu. Kiveyksen rajakorjaus toimii sen perusteella päivä-/iltakuvissa; tummien polygoniviivojen poistuminen on edelleen todistamatta. Nyt pyydetty V8a on rakennettu SN1:n päälle, tarkistettu oikeista GLB-tavuista ja valmis rajattuun yksityiseen vastaanottajatestiin.

Jaetun T7:n kansio:
/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/peking-codex-20261013/production-root/peking/peking-testikaupunki-20261018-native51-v8a-source-ground3

Lopullisen manifestin SHA256: 32028b12090f1d17079f83d65e8d1a6da036ff7a978fc10fda71783e0878806b

| Korvattava GLB | Tavua | SHA256 |
|---|---:|---|
| peking_2_3_lod0.glb | 13162880 | 96bb64d7196356c425e7de936acecfa38a3690769ab742663d62c9eef9a99ddf |
| peking_2_3_lod1.glb | 5302528 | 08165ef9e15e86070739ec0b4403c0ee7d9344960b9ed0b55c33d4367df371f0 |
| peking_2_3_lod2.glb | 4333116 | 3ad1b00386fedb9fad64809540968f4f8c2ad6f80e13d6917dd309e178ecdc78 |

Muut69 GLB:tä säilyvät V6:sta. overlay-glb72-manifest.json varmentaa kaikki72: yhteensä163727012B ja1391292kolmiota. Tavurajaan jää599238B. GLB:t kulkevat jaetulla T7:llä, Gitissä ovat metadata/raportit ja neljä alkuperäistä vertailukuvaa.

V8a korvaa vain reikien6/7 pilotin sisäisen sallitun alan: noin5731m² omaa maata ja noin1511m² uomien pohjia. Märkäalue on lähteen tarkkojen vesipolygonien ja nimellisen4m suunnittelukäytävän unioni. Leveys ja veden paikallinen taso ovat eksplisiittisiä pelisuunnitteluarvioita. Uomien kivireunat seuraavat saman lähdegeometrian ylintä viereistä pintaa. Vesi on vähintään0,4m rantaprofiilin alimman kohdan alla ja pohja vähintään1,1m tämän tason alla. Uomien poikkileikkaukset mallialueen reunalla jätetään avoimiksi. Vesipintaa ei ole GLB:ssä.

Nykyisen SN1:n kaikki alkuperäiset kolmiokulmat, UV:t, materiaalit, kuvapayloadit, rakennukset ja puut ovat byteilleen säilyneet. Uusi maa jatkaa V2-lähdekolmioita sekä samaa alkuperäistä lineaarista näyttökorkeuskenttää; vanhan V3:n eri korkeussiirtymää ei kopioitu. Alkuperäisiä DEM/korkeustiedostoja ei muutettu. Uusi kiveys käyttää SN1:n samaa generoituun G34-sisärakeeseen perustuvaa materiaalia ja lähde-UV-vaihetta. Lisämaan AO on vielä leipomaton ja saa neutraalin valkoisen alkuperäisestä AO-kuvasta vakio-UV:llä. Vanha AO säilyy.

HUOM: uuden palatsialue-leikkaus-wgs84.geojson-tiedoston kaikki15 tavallista Polygon-osaa on ladattava. Vanhan12-osaisen latausmäärän lukitseminen jättää peiton vajaaksi. Jokainen uusi osa on kelvollinen myös JSON-kirjoituksen jälkeen eikä sisällä sisäreikiä. Suljettava uusi ala vastaa oman maan ja vedenalaisten tukipohjien peittoa. F32-reunat on auditoitu0,1mm toleranssilla, ei väitetty virheettömiksi. Reiät1–5 ja8 sekä reikien6/7 pilotin ulkopuoliset osat säilyvät; ylänäkymän suojattu soikea aukko ja alareunan jatkot jäävät tarkoituksella.

Sol hyväksyi3LOD-geometrian, alkuperäistavujen säilymisen, todelliset rantapinnat/pohjat, peiton ja15 leikkausosan kelvollisuuden/rajauksen. Astra katsoi kaikki18 alkuperäistä1600×900 kuvaa ja antoi rajatun visual GO:n maan ja uoman liittymille. Toinen Solin tarkistus varmisti paketin3GLB:tä+69pohjatiedostoa,18kuvaa, origot, taulukon ja vesitiedot. Jäädytyksessä päivitettiin vain valmius/auditointimetat ja lisättiin raportit; mallien/leikkausten/kuvien/vesitaulukon tavut säilyivät ja lopullinen manifesti tarkistettiin.

QA/actual-GLB-renders sisältää kuusi vakiokameraa ja kolme uomanäkymää ennen/jälkeen. vertailu.html näyttää alkuperäisiä PNG:iä jakorajalla. Kuvat ovat tasaisen valon 3D-diagnostiikkaa ilman vesipintaa tai peliefektejä. Paljas tumma pohja ei ennusta pelin vesiväriä. Neljä Gitin kuvaa ovat alkuperäisiä kokonaisia PNG:iä; niitä ei ole muokattu tai yhdistelty.

V8b:n QA/veden-korkeudet-v8b.json sisältää todellisen LOD0-luennan:15 toimitettua suurten vesien pohjainstanssia (suunnitelman17:stä kaksi ovat toimitusalan ulkopuolella), neljän suuren vesialueen lähdearviot ja nykyiset rantakorkeusristiriidat sekä sisäreikien puuttuvat lähdetasot null-arvoina. Suurten vesien kaikki-rannat-portti EI läpäise. Reikien6/7 kaksi uutta paikallista suunnittelutasoa ovat erilliset. localUp+37,9 ei ole sama kuin kaapatun ECEF-laattamuunnoksen tarkka geodeettinen korkeus. Nykyinen pelin vesitaso/tuonti vaatii vastaanottajan varmennuksen; muiden vesien lähdearvoja tai DEM:iä ei ole muutettu.

Pyydetty seuraava testi: samalla KTX2-muunnoksella/portilla kaikki uudet tiedostot ja15 leikkausosaa; varmista veden näkyminen/korkeus ja pohjan peitto, uoman jatkuvuus pilotin rajalla, seinä-/tieylitykset, samat k1/k3/k5 kamerat klo13/18 sekä kuvien lisäksi muunnetut tavut ja hashit T7:lle. Pyydän palautteen näistä kuvista ja pelituloksesta. Tämä ei kuittaa vastaanottajan lukemista, muunnosta, fyysistä iPadia, omistajan hyväksyntää tai julkaisua.

Tummien perittyjen polygoniviivojen lähdesyy/korjausehdotus seuraa erikseen; sitä ei peitetä tällä maageometrialla. #362, Unity/R2/main ja julkaisu ovat edelleen ulkona.
