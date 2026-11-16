# Temple #2403 — sisäpintakorjaus KK:n katselmukseen

Koko lähdetorni yhdessä GLB:ssä: neljän pääkerroksen sisäseinät, lattiat, pilarit ja holvikaaret on puhdistettu samalla reseptillä. Porrastornien valitut sisäpinnat käyttävät samaa kivipintaa. Alkuperäisen ulkokuoren ja katon geometria, normaalit, UV:t ja kuvat on säilytetty. Katon puuosat ja ullakon alkuperäinen kansi jäävät alkuperäisiksi. Ei pelimuutosta.

**Tila:** paikallinen tiedosto-, geometria-, uudelleentuonti- ja kuvatarkistus PASS. Toimitetaan PT → KK:n katselmus → vasta sen jälkeen NS:n koehaara. Tämä ei ole KK:n hyväksyntä eikä toimivuuden toteaminen pelissä.

## Toimitus
- `temple-2403-clean-interior.glb`: **74 999 kolmiota**, 4,493,216 tavua (noin 4,49 MB), SHA256 `afd2c044782b1b64897e8b9dcae9c7b0767710c5968dc69872bec89fff8ba0d2`.
- `king-before-local-1000.png` ja `king-after-local-1000.png`: sama paikallinen kamera/valo, 1000 × 440. Kuninkaan kerros näkyy kokonaan keskellä; ylemmän kerroksen lattian kapea kaista näkyy yläreunassa. N1:n suunta: avattu etupuoli, 15° vaakatasosta (NS 75° pystysuunnasta). Kuvat ovat paikallisia GLB-renderöintejä, eivät n1-peliruutukaappauksen pikselitarkka rekonstruktio. Nuket, UI, pelivalot ja runtime-leikkausvarjostin eivät ole mukana.
- Samat ennen/jälkeen myös pelkällä geometrialla. `whole-cutaway-front-1000.png`, `whole-cutaway-oblique-1000.png` ja `exterior-back-1000.png`: koko malli, pisin sivu 1000 px, lopullisesta GLB:stä uudelleen tuotu.
- Kolme 512 × 512 toistuvaa pintaa (`plaster.png`, `stone.png`, `planks.png`) myös irrallaan; ne ovat GLB:ssä mukana. Lähdekuvia ei ladattu eikä generoitu.
- `QA.json`, `CLEANUP.json`, `CAMERA.json`, `MATERIAL-PROVENANCE.json`, `PRODUCTION.json` ja riippumaton kuvatarkistus.

## Korjaus ja rajat
Lattioiden varmennetut tasopinnat suoristettiin; sisäseinien laajat tasopinnat oikaistiin. Suojattuihin ulkopintoihin liittyvät kärjet jäädytettiin. Pieniä kolmioita kääntävät tai romahduttavat siirrot palautettiin alkuperäiseen paikkaan. Sisäpinnoille tehtiin omat toistuvat UV:t ja siistit normaalit. Tripon sisäpinnoille leivottua ryppykuvaa ja normaalia ei enää käytetä uusissa materiaaleissa. Kaikki geometriset reunat eivät ole uusi ideaalinen CAD-rekonstruktio; alkuperäisen siluetti ja paikalliset profiilit on säilytetty.

Mustan kiilan paikannusehdokkaan lähdekolmiot 22930, 22931, 30422 ovat nyt tasossa Y = 17,525 m ja normaalit (0,1,0). Kiila ei näy paikallisessa jälkeen-kuvassa. Paikannus ja kuvavarmistus eivät korvaa NS:n tarkistusta alkuperäisestä n1-pelinäkymästä.

Tiedostotarkistus: mitat/origo/akselit/node-muunnokset ennallaan; 51 207 alkuperäiseksi jätetyn kolmion sijainnit/normaalit/UV:t samat; 39 816 kokonaan Y > 30,4 m olevan kattokolmion geometria ja materiaali samat; alkuperäiset kolme kuvaa tavutarkasti samat. Ei uusia kääntyneitä tai romahtaneita kolmioita. 1 mm yhdistetyssä reunalaskennassa lähteen 23 avointa reunaa säilyvät 23:na. Runtime-sijoitusta, `z=5.37`-leikkausparametria tai Roof B -koodin vakioita ei muutettu.

## Pintojen lähdevarmuus
Kaikki kolme pintamateriaalia ovat PT2404:n sallimia **hillittyjä B2-arvioita**. Cléry ei nimeä seinän rappausta/kalkitusta, pilarin kivilajia eikä kuninkaan huoneen lattiamateriaalia. Hauerin kuva on kuningattaren huoneesta: lankkulattia on sen pohjalta vain varovainen tulkinta. Garnerayn kattoterassi ei todista sisälattian materiaalia. Tapettia ei lisätty tähän rakenteelliseen GLB:hen: lähteessä tapetoidut lautaväliseinät ovat erillisiä peliosia, joita tässä ei muuteta.

## NS:n muunnoksessa säilytettävä
GLB:ssä on yksi mesh ja neljä materiaali-primitiveä: alkuperäinen ulkopinta sekä rappaus/kivi/lankku. Uusissa pinnoissa UV-toisto on 2,56 m, samplerit REPEAT. Alkuperäinen ulkopinnan normaalikartta säilyy; uusi sisäpinta käyttää geometrian/vertexnormaalin valaistusta ilman erillistä normaalikarttaa. Jos muunnin odottaa yhtä atlasta/normaalikarttaa, yhdistä omassa muunnosvaiheessa; älä poimi vain ensimmäistä materiaalia tai clampaaUV:ita. Kärkitietueita on 71 514 (lähteessä 54 746; UV-/normaalirajojen erotus). Kolmiot eivät kasva, mutta neljän materiaalin kustannusta tai suorituskykyä ei ole mitattu puhelimessa.

## Lähteet ja ajo
Varmennettu NS-lähde: `/Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/temple-2271/temple.glb`, SHA256 `843ec7a3e22f952299e91af8c59d199ba7d6678fe540198e86959ff79424b74e`, 3 850 504 tavua. Alkuperäinen säilyy. Oikea n1-viite on `ns-temple-nuket1-iphone-346cf3389/n1.png`, SHA256 `c2e6fb6ea30f775a7ecf7169110ab2a9c8456d8fd1f8ecd2996fdbdf9c1a258f`; erillistä Valosepän testikuvaa ei käytetty.

Tehtävälähteet: 2403 `9dacebc9cd4e50d155be16f3769fcae5a48a9ce2`, 2404 `0bb36275710010cd85f4f817b68d3df6b0748b09`, NS-tarkennus `03f46c8234e5d3825e26fd266737ddaad5902e1b`, ikkuna 2456 `6cce616bfc83d408635d664da506159cc9c56d38`.

Tuotanto alkoi 16.11. klo 18.19 EET, viimeinen raskas prosessi päättyi 18.39.23 EET. Ikkuna 18.15–20.15 EET ja load5 < 16 / ei Unityä, xcodebuildia, dotnetia tai Simulatoria tarkistettiin vartioidusti. Uusia Tripo/ImageGen-kutsuja 0, palvelukulu 0. Toimitus tehdään kevyenä tämän jälkeen; muiden prosesseja/jonolukkoja ei muutettu.
