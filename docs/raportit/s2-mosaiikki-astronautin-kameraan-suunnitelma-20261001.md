# Euroopan S2-mosaiikki astronautin kameraan — suunnitelma (Linssiseppä 2, 1.10.2026)

Pohja: Helsinki 50/400 mm ja S2-Alppikoe (bdfa3e39) näyttivät eron BMNG:hen; nyt laatat paikallisesti (file://, rajattu jako).
1. **Ämpäri ja polku (Karttaseppä):** `media.matkakirja.app/linssit/astronautin-kamera/s2-eurooppa/v1/{z}/{x}/{y}.jpg`, XYZ, z6–z10
   (~76 m/px 60° N), versio polussa (v1, v2 …); vesimaski `…/vesi/` vain jos Yokuori käyttää.
2. **Laattajako pysyvästi (Linssiseppä 2):** `KarttaKerrokset.RasterinJako` (9901302c) kyydin pinnalle: suorakulmio Yokuorin
   alue z6-sarakkeet 27–39 × rivit 13–25 (W −28,125°, E 45,0°, N 72,40°, S 31,95°), juuri 13 × 13, taso = z − 6.
   Ilman tätä Cesium pyytää koko maailmaa ja tarkentuminen jumittuu (Helsinki-loki 30.9.: 7 900 × 404).
3. **Paikat kyydissä (Linssiseppä 2):** linssin reliefi pois kyydin ajaksi (kuten `astro kyyti pinta pohja`), BMNG paikkaan 1 alle,
   S2 paikkaan 2 päälle (AstronauttiKerros.PaivitaKuukaudenPinta). Euroopan ulkopuolella näkyy BMNG kuten nyt.
4. **Merilohkot (ratkaistu 1.10.):** Karttaseppä vie kaikkiin 13 × 13 lohkoon täydet tasot (merellä tasaväriset), ei 404:iä.
   Ämpärivienti v1 (rajattu asettelu, lähde 2026-10-01b, 57 233 laattaa, ~0,8 Gt) noin klo 12; vesimaskia ei toistaiseksi.
5. **Koko ämpärissä:** z6 2 Mt, z7 9, z8 38, z9 150, z10 561 Mt = ~760 Mt (53 200 laattaa, 1.10. klo 05). Ei sisältöpakettiin.
6. **Pelaajan lataus:** laatat tarpeen mukaan (Cesium + levyvälimuisti). Yksi kyytinäkymä ~150–400 laattaa (~2–6 Mt);
   ylilento Euroopan yli ~20–40 Mt. Levyvälimuistin katto 200 Mt (LRU), ei esilatausta.
7. **Muisti laitteella:** Cesium lataa overlay-laatat RGBA8:na (~340 kt mipeineen) → 300 laattaa ≈ 100 Mt GPU. Katto:
   täysi laatu z10; kevyt laite (≤ iPhone 15 Pro, Kyytipino.KevytLaite) maxLevel z9 ja maximumScreenSpaceError ylös.
   Mitataan iPadilla ja iPhone 15:llä ennen junaa.
8. **Kuka tekee mitä:**
   - Karttaseppä: ämpärivienti v1 (+ manifesti), merilohkopäätös, puuttuvat lohkot (rivit 13–14).
   - Linssiseppä 2: rajattu jako + paikkajärjestys AstronauttiKerrokseen, A/B `astro kyyti s2 0|1`, muistimittaus, kuvaparit.
   - Linssiseppä: fotorealismin sävytys S2-pinnalle (S2 on BMNG:tä vaaleampi; Ilmakeha2/valotus), NASA-vertailu.
   - Julkaisija/Natiiviseppä: käännös ja juna; web myöhemmin (web tauolla).
9. **Aika-arvio:** Karttaseppä vienti ~1–2 h (koneaika); Linssiseppä 2 koodi 2–3 h + mittaus/kuvat 1–2 vuoroa; Linssiseppä
   sävytys 1–2 h. Yhteensä ~1 työpäivä, junaan omistajan kuvan hyväksynnän jälkeen.
10. **Tila 1.10. klo 06:** koodi linssiseppa2/s2-kyyti e9ac04c0 (Linssisepän haarassa), kuittaukset Karttaseppä/Linssiseppä/Natiiviseppä.
    **Riskit:** muisti vanhoilla laitteilla (katto kohdassa 7), sävyero BMNG-rajalla
    Euroopan ulkopuolella (Ilmakeha2-usva peittää etäällä; Helsinki 50 mm osoitti, että raja katoaa horisonttiin).
