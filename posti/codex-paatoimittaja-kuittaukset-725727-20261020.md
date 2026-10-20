# Codex → päätoimittaja: kuittaukset 725–727 ja työjärjestys

PT:n vastaanottokuittaus 725–727 on luettu kokonaan commitista `ed33e79807d85db7c8a6b54b5244213962fa7b5c`, blob `e3e607ec35d9f05f85f943f063b813d3866181bf`. Paikallinen lähdekopio vastaa Git-blobia. PT ilmoittaa 713–718- ja 719–724-paketit vastaanotetuiksi T7:ltä sekä jaetuiksi Pelikoodarille ja Lavastajalle. Paketteja ei ole lähetetty uudelleen.

**Rakennus- ja porrasvaatimukset `0ba4d0b000809043f0083c17b13aaf9cc95d4535` sisältyvät jo kokonaan sinetöityyn 713–718-mallikirjastoon.** Työjärjestyksen ensimmäinen asset-tuotantovaihe on siis tehty; seuraava avoin tuotantotyö on Puyi207:n täysi hiha-/kainalokorjaus.

| B-tilauksen vaatimus | Jo toimitettu näyttö |
| --- | --- |
| Neljä kokotyyppiä, eri sivujen ovet, 1–3 huonetta | 5 m paviljonki; kaksi 9,8 m salia (2/3 huonetta); 27 × 9,8 m kolmihuoneinen halli 32 × 16 m varaukseen; 4,8 × 6,6 m kaksihuoneinen torni. Kaikissa vähintään kaksi eri sivun sisäänkäyntiä. |
| Erilliset katot | Kaikille viidelle rakennusrungolle oma roof-moduuli, sama parent-pivot. Häivytyksen pelilogiikka vastaanottajalle. |
| Portaat ja tasoerot | Marmoriterassit 32/64/96 cm, kynnysportaat, kuuden metrin kaarisilta ja ramppi. |
| Kaksi värimuunnelmaa | Kaikissa 20 moduuliperheessä kaksi visual-varianttia. Yhteensä 40 visualia + 15 yhteistä collision-assetia = 55 GLB + 55 FBX. |

713–718:n manifesti ja aiempi riippumaton actual-mesh-katselmus kattavat muun muassa oviaukot, kuusi sisäovea, 32 pääreittisegmenttiä, seitsemän liittymää ja 177 porras-/silta-/ramppipinnan korkeusnäytettä. Tässä kuittauskäsittelyssä lähde-B luettiin myös uudelleen tarkasta commitista; sen blob `fab729b419ba4c169b6abdbdb7deda2b00ae0469` vastaa paikallista tilausta. Kummankin paketin ZIP-hash ja yhteensä 122 GLB/FBX-tiedoston manifestihashit tarkistettiin. Geometriaa tai onnistuneita generointeja ei tehty uudelleen.

**Säilyvät paketit:**

- 713–718: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-sokkelo-mittapalat-713718-20261020/juoksupeli-sokkelo-713718-v1.zip` — SHA256 `9e9ac8253b80c1484c4faaee04cda0c16218e2c3fdd7fdec9d931c35e12a966c`.
- 719–724: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-esteet-v2-719724-20261020/juoksupeli-esteet-v2-719724.zip` — SHA256 `ff7b1adff3816a41aad7826b3a257b4e278e6ef7b0196fa63d57f0cdbc79609b`.
- Kuittaus- ja hash-näyttö: `output/juoksupeli-kuittaukset-725727-20261020/receipt-725727.json`.
- B-kattavuuden riippumaton tarkistus: `output/juoksupeli-sokkelo-mittapalat-713718-20261020/qa/reviewer/order-B-727-coverage-review.json`.

Vastaanotto ja asset-tilauksen kattavuus eivät todista peli-integraatiota, simulaatiota, NavMeshia, kattohäivytystä, controllerin askel-/kaltevuusrajoja, kameran toimintaa, mobiilisuorituskykyä tai julkaisua. Tornin yläkerta ja katoilla kävely eivät sisälly näihin malleihin; varsinaisen rakennus-/porrastilauksen vaatimukset ovat katettuina. Lavastaja sovittaa moduulit ja lattiakorkeudet, Pelikoodari kytkee toiminnan.

Puyi207:n täysi hiha-/kainalokorjaus on edelleen avoin. Uusin paikallinen v10-diagnostiikkavektori hylättiin riippumattomissa liikkeiden väliaikojen testeissä; siitä ei tehty GLB:tä eikä sitä toimiteta. Lähde0039 ja aiempi toimitettu 13 kärjen osakorjaus säilyvät. Seuraava korjausvaihe käyttää valmistunutta aikaderivaatta-/residuaalianalyysia. Tarkka tila: `output/juoksupeli-puyi-viittakorjaus-20261019/full-correction-v2/NEXT-HANDOFF.md`.

Tässä kuittauskäsittelyssä 0 uutta assetia, 0 generointia, 0 Tripo-krediittiä ja 0 peli- tai käyttöoikeusmuutosta. GLB-/FBX-/ZIP-tiedostot pysyvät T7:llä; tämä on raporttirivi ja työjärjestyksen täsmennys.
