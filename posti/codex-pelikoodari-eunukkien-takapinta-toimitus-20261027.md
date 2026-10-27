# Codex → Pelikoodari: eunukkien takapinnan korjaus, kumulatiivinen koekokonaisuus

Kolmen eunukin takakasvot ja selän etupuolen piirteet on poistettu uusilla H3.1-lähteillä. Kolme takareferenssiä, yksi front/back-multiview-malli per eunukki: yhteensä3 Tripo-kutsua ja135krediittiä. Ei uusintoja. Etupuolen viitekuvat pysyivät alkuperäisinä; uusien mallien pinta ei kuitenkaan ole vanhan kasvon vertex-/tekstuurikopio.

Paketti: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-eunukit-20261027/rear-source-v2/review-v1`.

Kuusi uutta eunukki-GLB:tä, sekä neljä täsmälleen muuttumatonta Puyi/vartija-parimallia kuten struggle-back-review-v2. Kaikki sen liikekirjaston nimet, ajat ja animaatioavaimet, luurangon solmut ja inverse-bind-matriisit verrattu täsmälleen samoiksi. SHA256SUMS mukana. GLB:t ovat vain T7:llä, eivät gitissä.

- `models/puyi-perus.glb`: 14422376 tavua, SHA256 `7113c05b3a91ac06995a37898eeb9713020bc354c235d777613198e9abd7d08e`.
- `models/vartija-perus.glb`: 8437340 tavua, SHA256 `cfe6effabcf0557c5fdf7c760a48442f189ad9f03077fdad14b815cc8682d0f9`.
- `models/eunukki-1-perus.glb`: 7943528 tavua, SHA256 `12db49ff4db4ee188e9b98e8f49fb49b515e461352068e57beca1be0bd3533b6`.
- `models/eunukki-2-perus.glb`: 7963180 tavua, SHA256 `523d15fa9787b143107613fcfec1930c14295563aebd660cdda3038cc4733211`.
- `models/eunukki-3-perus.glb`: 8166436 tavua, SHA256 `e91f7a970c1846176010d0628ed6e0214feef3fe88b1863222bc832bb751d579`.
- `models/puyi-viitta.glb`: 14237188 tavua, SHA256 `7f3ce1a31c20558af4ec2f6ef3031c79cf526ebc2cf9c02b6a42210aa50dca42`.
- `models/vartija-viitta.glb`: 8440452 tavua, SHA256 `6aecb7b8825c491d24a7130f3e41dcd033867fce39867687305495b7d52c1e31`.
- `models/eunukki-1-viitta.glb`: 7942932 tavua, SHA256 `d7cf13104fe982ea5c75a762611675bd5081a005a464e3f4390e02e9e073c6cd`.
- `models/eunukki-2-viitta.glb`: 7962072 tavua, SHA256 `506ebe63fbb7bc6778448a69d183b8f3509d981ef4185ca5000ebbc34e89a10b`.
- `models/eunukki-3-viitta.glb`: 8166620 tavua, SHA256 `71b2ffc749cb033a8a593701713cd30bd0d32069e4fbcda94f52b399f98f792a`.

Takakameratarkistus jokaiselle noin12m etäisyydeltä: perus- ja viittaparit samalla sijoittelulla, Puyi pysyy ottajan takana. Kameran kallistus35° ja FOV40° ovat paikallisen esikatselun oletuksia, eivät pelistä mitattuja arvoja. Kuvat qa/eunukki-N-rear-12m-pair.png, suurennos samasta ruudusta oikealla. Lisäksi lähde- ja etu/takaposearkit.

Tämä on takapintakorjaus peliin kokeiltavaksi, ei kaikkien vanhojen liikkeiden uusi hyväksyntä. Animaatioiden avaimia ei muutettu tilauksen mukaisesti. 17 näytteen/klippi tarkistuksessa vanha peek leikkaa edelleen lattiaa noin5–9mm, joskin aiempaa vähemmän. Uuden E2-mallin slide-sole näkyy pahimmillaan noin6mm lattian alla; E3:ssa muutama alle2mm osuma. Käsi-/kankaan kaikkien ruutujen törmäykset sekä0,18s pelisiirtymä ovat erillisiä. Nämä rajat kirjattu MANIFESTiin eikä niitä merkitä läpäistyiksi.

Vanhan IK-ANCHORS-tiedoston eunukin kämmenpisteet eivät ole uuden pinnan täsmällisiä pisteitä. Ranteen luut ja Puyin lähdeankkurit ovat samat; uuden pinnan etäisyystarkistus on hand-surface-QA:ssa. Ajonaikaista IK:ta ei lisätty.

peek_call on vain eunukki1:llä; 2 ja3 säilyttävät peek/call-leikkeet. door_push_run on Puyin malleissa, ei eunukeilla. Uudempia erillisiä Puyin parkour-tuonteja ei pidä korvata tämän paketin vanhemmalla parimallilla. Perus-Puyin land_heavy-palautuksen ilmoitettu korjaus tulee seuraavana.

Pyydän tuomaan kuusi eunukkia uutena hahmot-koejuurena ja kuvaamaan KK:lle sovitun takakameratarkistuksen. Ei käännettyä otetta. Vastaanotto, pelihyväksyntä ja omistajan arvio ovat vielä avoimia.
