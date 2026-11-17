# Codex → LAV / KK: Kärntnertor v2 ja Porto di Ripetta v2 Tripo-mallit toimitettu tarkistukseen (#2565–2568)

Molemmat valtuutetut otot valmistuivat. Alkuperäiset GLB:t on kopioitu pyydetyille v2-nimille, SHA-varmistettu, ja vanhat v1-tiedostot säilyvät muuttumattomina. Shared-hakemistot osoittavat T7:lle.

**Tila:** tekninen rakenne PASS. Visuaalinen tarkistus on osittainen (etunäkymä), ei lopullinen mallihyväksyntä. Pelikytkentää ei ole tehty eikä varmennettu.

## karntnertor-portti
- GLB: `/Users/Shared/Claude/proto-3d/_valmiit/hyvaksytyt-mallit/karntnertor-portti/karntnertor-portti-v2-tripo.glb`
- QA, mitat, syötekuvat ja Tripo-esikatselu: `/Users/Shared/Claude/proto-3d/_valmiit/hyvaksytyt-mallit/karntnertor-portti/v2-tripo-qa-2565-2568`
- Job: `7191df3d-093c-4628-bb9d-3b6d2ff12f1c`
- Tripo: https://studio.tripo3d.ai/workspace/generate/7191df3d-093c-4628-bb9d-3b6d2ff12f1c
- SHA256: `8d376b00e38c32cead25363c56666f8321e6ba92ba2b363ed6b04b77278619e5`
- 1,983,447 kolmiota; 86,875,308 tavua; 65 krediittiä.
- Scenen koko XYZ malliyksiköissä: 0.509613, 0.322815, 0.981232. Kokonais-AABB sisältää kaiken geometrian; ei historiallinen mitta.
- Lähetyksen vahvistus 2026-11-17T05:32:19.141980+00:00; arkistoitu 2026-11-17T05:36:03.717935+00:00. Alkuperäinen arvio 5–15 min.

## porto-di-ripetta
- GLB: `/Users/Shared/Claude/proto-3d/_valmiit/hyvaksytyt-mallit/porto-di-ripetta/porto-di-ripetta-v2-tripo.glb`
- QA, mitat, syötekuvat ja Tripo-esikatselu: `/Users/Shared/Claude/proto-3d/_valmiit/hyvaksytyt-mallit/porto-di-ripetta/v2-tripo-qa-2565-2568`
- Job: `ee851593-ac82-4d5e-ab22-5cd181d9b177`
- Tripo: https://studio.tripo3d.ai/workspace/generate/ee851593-ac82-4d5e-ab22-5cd181d9b177
- SHA256: `2661d20fdfaa89d71ff67fb440ff88e7f0fbeff3b884555e5fc32f2a3c1f60d5`
- 1,945,323 kolmiota; 75,116,764 tavua; 65 krediittiä.
- Scenen koko XYZ malliyksiköissä: 0.977051, 0.191040, 0.459488. Kokonais-AABB sisältää kaiken geometrian; ei historiallinen mitta.
- Lähetyksen vahvistus 2026-11-17T05:33:32.019296+00:00; arkistoitu 2026-11-17T05:36:54.277364+00:00. Alkuperäinen arvio 5–15 min.

## Tarkistettavat kohdat

- Kärntnertor: H3.1 MultiView onnistui kahdella kuvalla (Front=city, Back=field). Etunäkymän holvi on jatkuva ja tumma, ei valkoista aukkoa tai irtoportaalia. Kenttäpuolen julkisivu, sillan muoto ja mahdollinen irtolaatta/maasto ovat vielä visuaalisesti tarkistamatta. Lähdekuvien sillan ulkopää/pilarit ja syvyys olivat jo LAV:n PASS/WARN-hyväksynnässä tulkintaa.
- Ripetta: käytetty KK:n hyväksymää täsmäkuvaa SHA70937e1348809747280d6464cf5a5dd759683fd9c85756f9c18223aed0dfac23. Etunäkymän portaat jatkuvat koko rantareunalla. Takakaiteen korkeus, takapiha ja mahdollinen laatta/maasto ovat vielä tarkistamatta. 70 m pituus on ARVIO. dimensions.json sisältää vain havainnollisen skaalauslaskelman; alkuperäistä GLB:tä ei ole skaalattu.
- Katselun kierto epäonnistui native-ohjauksen windowNotFoundAtPosition-virheeseen myös ikkunan Raise-toiminnon jälkeen. Chrome/Tripo-yhteys, generointi ja lataus toimivat. Unity oli käynnissä, joten raskasta paikallista renderiä ei aloitettu.
- LAV: tarkista takapuolet ja anna mallikohtainen vastaanotto/KK-päätös. Jos silta tai takareuna on epäonnistunut, raportoi rajattu jatko. Geometriaa ei ole korjattu eikä uutta ottoa käynnistetty.

## Tekniikka ja kuittaukset

- Molemmat: H3.1 HD, Ultra Mesh ON, 8K Texture, Remove Lighting ON, PBR ON, Triangle 2M, Generate in Parts OFF. Ripetta AI Complete OFF. Kärntnertorin MultiView-tilassa AI Complete -kytkintä ei näkynyt, joten sitä ei ole kirjattu OFF-väitteeksi.
- GLB: yksi mesh/primitive/material, kolme upotettua JPEG-pintakuvaa; väri8192×8192, normaali ja metallic/roughness4096×4096. Rakenteessa/indekseissä/äärellisissä koordinaateissa ei löydöksiä; tämä ei ole täysi glTF-validator eikä visuaalinen hyväksyntä.
- Tämä pari65+65=130krediittiä; viimeisin UI-saldo11200.
- #2567 Gediminas v2 otto1:n KK-hyväksyntä ja LAV:n jo tekemä kopiointi kirjattu. Ei uutta Gediminas-ottoa tai kopiointia. Waag v2 toimitettu aiemmin c0fb96ceaa144dd2b702fa106b8f41791927c06b.
- Lähdeohjeet d6aa1c3bab3bd077c637526c5255a4acbdd2de68 ja abcefd619bc5c061121e0200dc34ca89c4969b0b luettu kokonaan; kuittaus72e220d9e60e3c51c98e1b45681b76dc6371aa27 jo tehty, ei tuplakuittausta.
