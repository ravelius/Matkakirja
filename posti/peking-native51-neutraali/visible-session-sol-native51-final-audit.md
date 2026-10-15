# Native51: lähde- ja todellisen pilottigeometrian auditointi

**TEKNINEN PASS native51:n lähteelle, pilottitaulukoille sekä valmistuneelle tallennus-/uudelleenavaus-/pakkaustositeketjulle. Saved-native51:n tekninen portti SULJETTU tässä kuvatun näytön laajuudessa. Ei visuaalista omistaja-, vienti- tai pelihyväksyntää.**

## Itsenäisesti tarkistettu

Stable-manifestin271pinniä täsmäävät. Native50:een nähden vain ilmoitetut5tiedostoa muuttuvat: LAHTEET.md, uusi owner-square-coarse51.json, owner-trial.json sekä owner_square_coarse.py/rakenna.py. Muut kuva-, source-input-, korkeus-, footprint-, rekisteri- ja kameratavut täsmäävät.51planin varsinaiset4recordia ja värit vastaavat aiemmin auditoitua suunnitelmaa; alkuperäisen planin SHA on sidottu erikseen. Kummankin kanonisen vientifunktion RuntimeError säilyy.

Luin actual-native-readback.jsonin todelliset vertices/triangles/triangleUV/triangleMaterialNames-taulukot. Yhdistin actualvertexit lähdesuunnitelman koordinaatteihin ja vertasin kaikkien kolmioiden suunnattuja syklejä, vertexkohtaisiaF32UV:itä ja materiaalinimiä monijoukkoina. Vastakkainen winding ei kelpaa samaan sykliin. Kaikki1582kolmiota täsmäävät; producerin PASS-lippuja ei käytetty tämän vertailun korvikkeena.

|Massa|Kolmiot|Huippu groundista m|Footprintin rajapoikkeama m|Tilavuusero50:stä m³|
|---|---:|---:|---:|---:|
|relation/8607825|236|16.000000229|0.00005855|+0.001975739|
|relation/8847722|286|37.939999390|0.00005980|+0.000000000|
|relation/8848142|356|37.000001068|0.00006077|+0.000000000|
|relation/8848388|704|12.799999847|0.00006063|+0.004289276|

Jokaisen kuoren reunoilla2vastakkaissuuntaista pintaa ja vertexlinkit suljettuja yksittäisiä syklejä. Euler2muille ja0Kansankongressitalolle. Sisäaukko säilyy. Kaikki alkuperäiset tiervertexit sekä XYZmin/max säilyvät; korkeudet/tagit/groundit ja arvioluokitukset eivät muutu. Suurin spatial-poikkeama on alle0.0001m. Museon/Kongressitalon pienet tilavuuserot ovat suunnitelmanF32-leikkauspisteiden pyöristystä; muistomerkin/Maon vanhat kolmiot ja materiaalinimet täsmäävät.

Suoritin oikean source51-helperin build-funktion ilmanBlenderiä fake-object-sinkillä: only_ids rajaa rakentamisen täsmälleen kahteen nimettyyn massaan, kaikki UV-face-lockit säilyvät ja lähdekorkeuden assertit läpäisevät. Applierin source/candidate/camera/SHA-provenienssi täsmää approval-tiedostoon. Candidate.blendin ja alkuperäisen native50.blendin todelliset SHA:t täsmäävät readbackiin.

## Pilottivaiheen näytön taso (historia)

Puun/muiden massojen mesh-fingerprintin ja vanhojen materiaalien ennen/jälkeen-yhtäläisyyden producer tarkisti Blenderissä; luin nämä vertailut tekevät skriptit. Tarkistaja ei laskenut koko muun Blender-skenen opaque-fingerprintiä uudelleen. Pilottiraportin newColors/newRoughness ovat lisäksi ilmoitettuja arvoja, eivät täydellisiä serialisoituja node-stateja. Lopullisen uudelleenavausraportin varsinaiset materialStates-rivit tulee tarkistaa erikseen, kun ne saapuvat.

PT303tintin pilottiarvo[1,1.08000004,.89999998,1]vastaaF32-toleranssilla lukittua[1,1.08,.9,1]. Rootin tallennettu malli,6RGB+6semantic,6neutral, final-native-mass-readback.json, surface/heritage/packedQA ja niidenSHA-ketju ovat vielä avoin portti; keskeneräistä renderiajoa ei hyväksytty valmiiksi. Tilannepilottiluvun lopussa: {'savedNative51ReadbackPresent': False, 'renderDeviceProofPresent': True, 'RGBCount': 6, 'semanticCount': 6, 'lastCompleteNativeRound': 50}.

Native50:n72GLB-pakettia ei muutettu.51-sävyt kuuluvat seuraavaan malliin; ei96vientiä tai peli-/runtimehyväksyntää. OFFGAME. Vain nimetyt MD/JSON kirjoitettiin; eiBlenderiä, toteutusmuutoksia, muita viestejä tai delegointia.

## Valmistunut saved-native51-jatkotarkistus

Lopputosite saapui tämän auditin aikana ja tarkistettiin:

- Saved native51 SHA **0572b74e033361077de63ec10eba5d5194f6cf65da6d63681e21d9bbb84adfc2** täsmää todelliseen tiedostoon, render-device-, neutral-, surface-, heritage- ja18frame-manifesteihin. CandidateSHA säilyy6b958d3c…; kamerat/renderit selittävät tiedostoversion vaihdon.
- Candidate/saved-raporttien kaikki79materiaalin node/input/link/image-statea ja56imageSHA:ta ovat syvävertailussa täsmälleen samat. Tarkistin uusien3plain-materiaalien todelliset Principled BaseColor/Roughness/Metallic/Alpha-arvot sekä texture-nodejen puuttumisen ja BSDF→Surface-linkin. Roughness0.85000002vastaa.85:tä. Lukittu kultakaton MIX-B onF32-toleranssilla[1,1.08,.9,1].
- Candidate/saved-skenaarioiden completeMeshFingerprint ja other50MeshFingerprint täsmäävät. Raw-pilottimassat vertailtiin yllä itsenäisesti; saved-massin vastaavuus nojaa tässä producerin uudelleenavattuun digestiin ja tiedostoSHA:han. Tarkistaja ei avannut Blenderiä.
- Kaikki18alkuperäistäPNG:tä ovat olemassa, dekoodautuvat1600×900:nä ja niidenSHA:t täsmäävät lopulliseen18frame-manifestiin:6RGB,6semantic,6neutral. RGB128samples/MetalGPU ja neutraalinKhronos-profile ovat eri tositeketjut. Tämä ei ole18kuvan visuaalinen hyväksyntä.
- Build-auditin ordinary- ja northContext-rivit täsmäävät native50:n perittyihin riveihin;223rekisterijäsentä, ei uutta korkeusmittausta. Surface-use51 ja heritage51 on sidottu oikeaan savedSHA:han. PT295:n valitut mallihuiput36.65/~8.1säilyvät; historialliset tolerance=false-tulokset eivät muutu fyysisiksi mittauksiksi.
- Packed review SHA **6fe272101e263d675f2abb487804c30080844f0c8561c254963cf529c5447d05** täsmää varsinaiseen163MBtiedostoon ja packing-proofiin. Kaikkien56image-rivin alkuperäiset tiedostot/SHA:t täsmäävät saved-reporttiin. Lisäksi purin .blendin zstd-pakkauksen vain muistiin, luin BlenderinDATA-blockit ilmanBlenderiä ja laskin paketin sisältä itsenäisesti kaikkien56erillisen alkuperäisenkuvapayloadinSHA:t: kaikki mukana tavulleen. Näin packed-image-väite ei nojaa vainproducerbooleaniin.
- Packing-skriptin geometriafingerprint kattaaXYZ/topologian/objektimatriisit/render-visibilityn; se ei erikseen kataUV- tai material-slot-tauluja. Niiden saved-equality tarkistettiin candidate/saved-digestiketjussa, eikä pakatusta mallista väitetä erillistä rawUV-uutuusmittausta.
- Kaikki6ajovaihetta ovatPASS ja NATIVE51_TECHNICAL_CHECKPOINT_COMPLETE löytyy lokista.271lähdepinniä täsmäävät edelleen. Ei uusiaP1/P2-löydöksiä.

Saved-portin yllä oleva AVOIN-teksti kuvaa ensimmäistä pilottisnapshotia; valmistunut jatkotarkistus sulkee teknisen saved-portin. Native51:n visuaalinen loppuarvio, omistajahyväksyntä, omaGLB-vienti/final96 ja peli-integraatio jäävät erillisiksi. Rootin ilmoittama PT284-native50-toimitus ei ole tämän auditin suorittama lähetys eikä osoita peli-integraation kuittausta. OFFGAME.

Vain sovitut native51MD/JSON päivitettiin. EiBlenderiä, toteutusmuutoksia, muita viestejä tai alidelegointia.
