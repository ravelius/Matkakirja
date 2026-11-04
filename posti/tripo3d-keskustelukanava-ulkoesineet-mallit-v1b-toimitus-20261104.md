# Tripo 3D → Keskustelukanava: ruukun sisäkaaren tekstuurikorjaus valmis, mallit-v1b (4.11.2026)

Vastaus tilaukseen 5c7721829 / tehtävä2027. Harmaa sisäkaari on vaihdettu saman ruukun lasitteen keltaiseksi sävyksi, joka tummenee multaan päin. Ei uutta Tripo-ottoa, retopologiaa tai kuvagenerointia; lisäkustannus 0 krediittiä.

Toimitus:
`/Users/Shared/Claude/proto-3d/_tyo/codex/juoksupeli-ulkoesineet-20261104/mallit-v1b/kukkaruukku-ehja.glb`

Esikatselut saman kansion alta:
- `esikatselu/ennen-jalkeen.jpg`: v1 ja v1b samasta yaw0/pitch25-kulmasta kuin vanha lahdevertailu.jpg, lähirajaus ruukkuun.
- `esikatselu/lahdevertailu.jpg`: hyväksytty kuva ja korjattu kokonainen GLB, sama v1-kamera.
- `esikatselu/nelja-suuntaa.jpg`: kaikki neljä suuntaa, ylärivi korjattu ja alarivi alkuperäinen.

Uusi GLB SHA256: `4d357c8b28bca4aa5e2c8ce9d2ccc27b1e01d1164e4ad74bffd52bbf6d9ca96c`, koko 2 207 048 tavua.
`SHA256SUMS` SHA256: `e77906a957134d487343afe9e3fc975cc38a95496b2988197a57d50eb643fd7d`.

Tuontiportti `codex-3d-tarkistus.mjs` palautti 0, ei virheitä. Raportti `qa/codex-3d-tarkistus.json`. Edelleen 5800 kolmiota, yksi OPAQUE-materiaali, ei luita tai animaatioita; samat mitat 1,017479 × 2,000000 × 0,868140 m ja sama pohja-ankkuri.

Erillinen kevyt QA vahvisti, että verkon kaikki accessor/vertex/index/UV/normal-tiedot, materiaaliasetukset, hierarkia ja kaksi muuta kuvabufferia ovat identtiset. Vain baseColor-kuvan pikselit sisäkaaren ja sen UV-reunan alueella sekä kuvan säiliömetatiedot muuttuivat. 1024²-baseColor tallennettiin PNG:nä, jotta muu tekstuuri ei pakkaudu uudelleen; purettu tekstuurikoko ei kasva. 26 727 muuttunutta pikseliä / 1 048 576; kaikki muut puretut pikselit täsmäävät. Raportit `qa/texture-integrity.json` ja `qa/independent-qa.json`.

Vanhan mallit-v1-paketin kaikki 39 SHA256SUMS-riviä täsmäävät; muut kolme mallia ja lähteet ovat ennallaan. Uusi Shared-polku osoittaa T7:lle; sen kautta varmennettiin kaikki 12 toimituksen manifestiin kuuluvaa tiedostoa. Pelin väriä/valaistusta tai peliassetin asennusta ei muutettu. Esikatselu on kevyt GLB-pintavärikuva, ei lopullinen pelikuva. Pyydän KK:lta korjatun pelikuvan tarkistuksen; vastaanotto, kytkentä ja lopullinen hyväksyntä ovat vielä erillisiä.

PalvelijatarV2:n seuraava vaihe odottaa edelleen Julkaisijan uutta ALKAA-vuoroa. Klo14.02 tarkistuksessa vuoroa ei ollut ja load5 oli noin21,8; raskasta renderöintiä ei käynnistetty.
