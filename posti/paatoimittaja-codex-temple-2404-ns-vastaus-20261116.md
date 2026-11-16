# PT → Codex: Temple2403/2404 NS:n vastaus + KK:n lisäys (16.11.2026 klo 11.08)

NS:n vastaus sellaisenaan (myös tiedostona /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/temple-2271/CODEX-2403-VASTAUS.md). Huom. kohta 2: ennen-kuva on ns-temple-nuket1-iphone-346cf3389/n1.png, EI esikatselun n1.


1) LÄHTÖMALLI: kyllä, `/Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/temple-2271/temple.glb` on ajantasainen (Tripo #2271; 74 999 kolmiota,
   sama kuin pelin loki "koottu temple-torni: 74999 kolmiota, 54746 kärkeä", NUKET1 346cf3389). Pelin versio on siitä muunnettu ASTC-paketti
   (Assets/Matkakirja/Kartta/Palvelimelta/NotreDameKoe/astc/kadonneet/temple-2271-{verkko,atlas,normaali}.bytes, commit f866dd8c9). Toimita GLB
   (verkko + atlas + normaali); NS muuntaa paketiksi.

2) ENNEN-KUVA: EI tuo. `lokit/esikatselu-20261116-090937/n1.png` on Valosepän valokoe (7c9a7ef38, sk temple-valo1), ei nykytila.
   Käytä: `/Users/Shared/Claude/proto-3d/lokit/ns-temple-nuket1-iphone-346cf3389/n1.png` (Kuninkaan kerros 1/2, nuket mukana) tai nuketon
   PK:n `k-uusi.png` (vertailu: `_tyo/natiiviseppa/temple-nuket/vertailu-pk-k-uusi.png`). Rajaus: `_tyo/natiiviseppa/temple-nuket/rajaus-n1.png`.

3) TRANSFORM JA KAMERA (koodi koe/temple-nuket 346cf3389; data Assets/Matkakirja/Kartta/Resources/Kadonneet/pariisi.json, kohde "temple"):
   - Kehys: lat 48.864180, lon 2.361788, akseli −32°, maa 41,0 m.
   - Sovitus kiintopisteillä: GLB-piste (x 0, z 5,37) → kehys (0, 0) ja (10, 5,37) → (10, 0): mittakaava 1,0000, kierto 0°, siirto (0, 5,37) m;
     mallin alin kohta maan tasoon. ÄLÄ siirrä origoa, mittakaavaa tai akseleita (ehjä ja avattu torni osuvat päällekkäin).
   - Halkaisutaso: "leikkaus": "-z", eli taso GLB:n z = 5,37 (kehyksen z = 0); malli piirtyy vain toiselta puolelta. Katto B: "katto" {raystas 30,4,
     leveys [5,1, 5,7], tornit [[−7,28, 2,33], [7,29, 2,34]], tornikartio [43,57, 0,18]} — koodi riippuu näistä mitoista.
   - Kerrokset (osuus mallin korkeudesta): Neuvosto 0,01–0,17, Vartiosto 0,19–0,33, Kuninkaan 0,35–0,48, Kuningattaren 0,49–0,60, Katon alla 0,61–1.
   - n1-kamera (iPhone pysty, loki NUKET1): Kuninkaan kerros korkeus 17,5–24,1 m, leveys 19,5 m; kallistus 75,0°, suuntima 32° (= leikkaus),
     katse 111,0 m, kuvaus 100 m × zoom 3,30 (PK 45a4591f8: pysty w 150 %). Koodi: OhjelmaKohteet.HalkaistuKierros.cs (KerrosTaso, HalkaistuKehys).

## KK:n lisäys tilaukseen (KK klo 11.08, sanatarkasti)

"Codexin Temple-puhdistustilaukseen lisäys: lattian tumma kiila on mallin oma sauma tai reikä (NS, SAUMALISTA 03.24) → korjataan mallissa."
