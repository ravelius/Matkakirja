# Pelikoodari: luovutus 2.11.2026 klo 05.04 (konteksti 26 %, pehmeä raja) – juna 218

Edellinen: -20261102-0415 (PR 5937). Tilaus (PT 04.15): 1) bugi 13 tallenne, 2) muuriportti v95:n jälkeen, 3) kamera kapeissa muurikujissa.
JU:n vuoro käytetty ja vapautettu 04.59 (VAPAA lähetetty).

## Valmista ja junassa 218
- **ee17f6928** (bugi 13) → NS: rungossa **6889c265a** (testit vihreät). Tallenne sk-218a tarkistettu: ohjauksen siirto tasainen
  (dNyt 7,3 → 5,6 m, kenttä 30 → 33° ~1 s, ei syöksyä); bugi 10 = artefakti (alku latauskuva → kuja, ei sinistä). Video PT:lle:
  proto-3d/_tyo/pelikoodari/korjaus-218/20261102-043207-218a.mp4 (siirto ~62 s).
- **b9fe9fd69** (haara pelikoodari/kansiot-218, 60bd5c356:n päällä): LAV:n kansiot c2-v33, osamallit791-v9, tausta-v95 → NS:n rungossa 4fb470a8c.

## Tallenne sk-218b (taso1c-reitti + sarjat peittokarttaan + v95), haara pelikoodari/tallenne-218b = 7fc16be30
- Video: proto-3d/_tyo/pelikoodari/korjaus-218/20261102-044412-218b.mp4, loki proto-3d/lokit/esikatselu-20261102-044412.
- Ajo: `zsh aja-sk.zsh sk-218b.txt <nimi> pelikoodari/tallenne-218b` kansiossa _tyo/pelikoodari/korjaus-218 (3. argumentti = haara).
- KAPEAT KUJAT: punaisia ruutuja vain kaksoisportilla (alla). taso1c:n 53/55 s ja 91 s (ristikko-ovi) eivät toistu. Diagnostiikka
  f8a5e05e3 (sarjat-peitto, oletus POIS) EI ole NS:llä; ei selvitetty, mikä muutos poisti kohdat (sarjat vai v95) → selvitä tarvittaessa.
- MUURIPORTTI: v95 latautuu, peittopisteet (105, −561,5) ala 4,0; (107…115) ala 7,7 = porttihallin katon alapinta. Portti on
  PORTTIHALLI (häivytettävä katto, räystäs 6,3–9,2, "katon alla 1") x 119 → 105, z −561, päätyseinissä aukot (ala 3,3 Puyista,
  porttitunneli-loki). Kamera kulkee päätyseinien läpi 4,4–5,2 m:ssä (video 63,7–65,3 s, t 57,9–59,9; massassa 1 t 59,91).
  Syy: AlitusPelissa = false (Raamattu 2.177) ja räystäsnosto rajattu rKatto = yEt·sin72° ≈ 5,1 m (KK 31.10., keisarin koko).

## PT:n PÄÄTÖS 05.0x: B2 (TEE TÄMÄ SEURAAVAKSI)
"Häivytä päätyseinät samalla hetkellä ja samalla tavalla kuin katto, palautus ulos tultaessa; tarkista ettei kamera ole seinän
sisällä ennen häivytystä. Video PT:lle." (B1 = nousu 11 m / loitonnus 12 m hylätty: rikkoo keisarin koon rajan.)
- Selvitä ensin, mihin malliin päätyseinät kuuluvat: avoin halli (avoimet-v52, LisaaAvoimenKatto / OnAvoinHalli, Palatsi.cs ~904–1035)
  vai taustapala kk-tausta-1-2 (LAV: seinä mallikehyksessä x ≈ −109,5, ovi z 168,5…173,5). Lokin osa-nimi "v4 palatsi avoin varasto"
  voi olla vain lähin halli – varmista (esim. editorissa renderöijät pisteissä (119/105, 4–8 m, −561)).
- Toteutus: päätyseinän aukon yläosa (ala ≥ PorttiMinAla) katon Tunniste-renderöijiin (häipyy katon mukana, KattoHaivytys), tai jos
  seinä on taustan pitkä yhtenäinen verkko, pyydä LAV:lta yläosa omaksi solmukseen (oviaukon yläpala) – EI omaa ratkaisua UI-/mallipohjan
  ulkopuolelta (mallimuutos on LAV:n työtä).
- Peittokartta: häivytetty yläosa ei saa nostaa kameraa (vrt. "PORTIN AUKON YLÄOSA" AukkoY, Palatsi.cs ~952) eikä kamera saa olla
  seinässä ennen häivytystä (häivytys alkaa räystäslinjalla, OmaReuna = PorttiReuna; tarkista kameran x vs. seinän x).
- Tarkistus: sk-218b JU:n vuorolla, punaruudut `scratchpad`-skriptillä (punainen > 0,45 tai keltainen Puyi < 0,0005 /ruutu), video PT:lle.

## Muuta
- Kohta 3 lisähuomio: (−685)-alueen ohuet seinäpalat ("vinot muurit", LAV) eivät ole peittokartassa (huippu 0), mutta kamera ei osunut niihin.
- Worktreet: wt/proto-pelikoodari-korjaus-217 (korjaus-218), wt/proto-pelikoodari-kivi-216 (tallenne-218, työkalut),
  wt/proto-pelikoodari-kansiot-218 (kansiot-218, mergetty → voi poistaa), wt/proto-pelikoodari-peitto-218 (f8a5e05e3).
