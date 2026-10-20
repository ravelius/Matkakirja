# Pelikoodarin luovutus 20.10.2026 klo 18.25 (päätili)

Edellinen: viesti-pelikoodari-luovutus-20261020-1805.md (historia). Rooli: Pelikoodari (Opus, high).
Proto-worktree /Users/Shared/Claude/wt/proto-pelikoodari-kerattavat-206 (paikallinen, ei pushia).

## TEHTY
- **Laatat / tausta-v6:** haara **pelikoodari/tausta-v6-208 = 2d832a656** (b4e384537:n päällä): TaustaKansio = kielletty-tausta-v6/,
  esto palatsi-esto-v3 jää (vaakamaa ei vaikuta leivontaan). v6 ämpärissä 18.19 (64/64 tiedostoa 200). Peitto LOD0 (YMAX 40, ruutu 1 m):
  v4 25 605 m² aukkoja → v6 pelialueella ~0 (jäljellä vain laattojen reunoilla, länsireuna x −480…−475 ja kulmat, pelialueen ulkopuolella).
  unity-tarkistus 0 virhettä, pohja-/valo-/liike-/kameravahti ok, kameratesti läpi, kielivahti ok. MaanTayte (177560643) jää varmistukseksi.
- **Esto-v3 LAHTEET.md:** läpäisee vie-paketti --kuiva; palatsi-esto-v3/esto.bin ämpärissä (200). Ei toimia.
- **"Majesteetti!"-uusinta:** jo kytketty (JuoksuAvausHuudot: avaus-puhe-v2/03, runko 37d8e8507). Ei toimia.

## AVOIMET
- 2d832a656 NS:lle (local_a9af6995) PT:n OK:lla runkoon 208.
- P7–P9 (valo liike kamera / sumea 0 / mv 0, täysi res + msaa 4) LT:n jonossa kierroksen 6 jälkeen. Kun tulos: jos P7 tai P9 ≤ 14 ms →
  oletukseksi (Jalki.cs Valopohja.JuoksuLiikeKappaleet = false tai mv-asetus) + kuvapari P0/P7 (vyoero.py) ennen päätöstä.
- GPU ≤ 14 ms isolla iPadilla on Valosepän (VS 0,8 + MSAA 2, kierros 6).

## 18.55 LISÄYS: omistajan palaute 18.28–18.39 (PT:n erät)
- Haara **pelikoodari/palaute-208 = c909a692a** (2d832a656:n päällä; väliversio 231c425d1). PT:lle ja NUI:lle kerrottu.
- 18.28: drone edestä/kaarto taakse, mikserin konteksti "pelit" (kartan musiikki pidossa koko juoksun; ennen palasi 0,3 s:ssa),
  käännösikkuna 6,5–9,8 m + avoimen puolen pyyhkäisy aina käännös, Puyi/takaa-ajaja maan pintaan (JuoksuKorkeusKartta.Maa),
  kompastus hidastaa 0,35 × 1 s ja eunukki kirii (kiinni vasta saavuttaessa).
- 18.35–18.39: alku keskeltä (PalatsiAlku "keski", JuoksuAvaus.PuyiAlku 4,6/−128 pohjassa) etelään; drone maailman avaimilla
  ulkoa Meridiaaniportin keskiaukon läpi (x 10,7–15,8, holvi 8,5 m, z −397…−366), nousu, Taihemenin yli (≤ 23,6 m), aukiolle;
  sekoitus Puyin kehykseen 10,9–11,8 s; ohjaus 15,5 s. Törmäystesti Peli-testit/Kultaiset/avauslento-esteet.bin.gz (LOD0 tausta-v6 +
  rakennukset-v12; uusi tausta/malli → proto-3d/_tyo/pelikoodari/avauslento-208/geom.py + ruudukko.py, lento.py = radan viritys).
- Huudot 3D (JuoksupeliNakyma.Eunukit3D/PaivitaEunukit, JuoksuV4Maailma.EunukkienPaikka + Kaiut), v3 05/06-pitkä porrastettuna 0,7 s.
- Ohita: NUI kytki napin OhitaAvaus():iin (eb32e511c, runko befaa32df) ja palautti Kuittaa():n (63ed7c673); PT:n päätös: NS ottaa
  **7980a4cb9** sellaisenaan (sis. turvaputkitestin). Haara pelikoodari/jatko-208 ba8bfd3e7 tarpeeton.
- AVOIN: lennon ulkonäkö, kallistuksen suunta ja huutojen tasot laitteella näkemättä; Puyi-botti voi kääntyä avauksen aikana
  risteyksessä (kamera seuraa, ei törmäysriskiä aukiolla). P7–P9 edelleen LT:n kierroksen 6 jälkeen.

## 20.03 LISÄYS: juna 209 "Juoksupeli täysin valmiiksi" (PT) ja tuotantoputki
- Haara **pelikoodari/maali-209 = f2be670cd** (NUI:n suuntanuoli, omistaja 20.09 "1 Lasinelio", maali oletuksena päällä; aiemmin eed78dcf1 maali pois, 2fbdc2b8c) (palaute-208 7980a4cb9:n päällä + NUI:n loppu- ja kokoelmakortti ef42706ad + V4Kierros.MaalinSuunta NUI:n nuolelle), EI junaan 208, EI NS:lle ennen NUI:n nuolta (PT: maali + nuoli yhdessä):
  maali luoteisella kulmatornilla (2e4904f26; JuoksuV4Reitti.MaaliSolmu/MaaliTorni, JuoksuV4Saanto.MaaliSuunta; oikealla pohjalla
  lyhin reitti keskeltä 965 m), kokoelma + nimetyt paikat (4b53b5547; JuoksuKokoelma, PlayerPrefs juoksupeli.kokoelma, pohja.json
  portit/hallit/palatsit/kulmatornit), näköala maalissa (465c46ff3; JuoksuMaaliKuva → Jingshan), liu'un ääni (7e8c0c16b; audio/juoksupeli/liuku/).
  Testit 81/81 (Juoksu), unity 0. Odottaa: NUI suuntanuoli + kokoelmakortti, SK salien merkitykset, omistaja Pelit-valikko (7).
- Tuotantoputki PR #5059 (tools/tuotantoputki.mjs, Mac-ajo päivittäin; Louvren henkilöt Paalla=false → Lavastaja junaan 209).
  Ei-Tripo-laajennus PERUTTU (omistaja 19.28): paikallinen haara pelikoodari/ei-tripo c07f2544e, ei pushattu, ei mergeä.

## 20.28 LISÄYS: havainnekuvien j9/j10 näköisyys (omistaja 20.14, PT)
- Kuvapari 208:sta (simu pelikoodari-iPad13, runko 186b23682): /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/kuvapari-208/ (PT lähetti KK:lle).
  Skenaario proto-3d/tyokalut/pelikoodari-ajot/sk-juoksupeli-kuvapari-208.txt (todistusajo.sh).
- Haara **pelikoodari/nakoisyys-209 = 510873880** (+ kamera 8/6 m ja massanosto; a763a3efc botti; 8c44cfe21 runkoon) (+ v9: 7 huonetta, ovikorjaus 04fe50214, kamera 11/6 m; aiemmin 782ce0de2 v8) (maali-209 f2be670cd:n päällä; 5d9b6dfd7 + avoimet huoneet + pakotetut linjat): kamera lähemmäs (DroneNosto kuja 9/6, aukea 12/7,5 m),
  esteiden ennakko ≤ 120 m palatsissa (JuoksuV4Maailma.LahiRaja, QA kauko lahi). Kujat: lyhin reitti maaliin 74 % ≤ 6 m kujilla → ei reittimuutosta.
- Odottaa: NS:n simukäännös → ennen/jälkeen-kuvapari + LT:n GPU ≤ 16 ms; Lavastajan avoimet-v2-ovet (läpijuoksu), Tripo-esteet ja eunukit;
  VS:n matala aurinko. Simu: JU:n SIMU NYT -vuoro.
- Avoimet huoneet (Lavastaja, tausta-v7 avoimet-sijoitus.json): JuoksuPalatsiVerkko.LueAvoimet (reitit + liitokset), mallit
  LataaPalatsiMallit(avoimet), TaustaKansio v7. AVOIN: Kuuden läntisen palatsin alue karsiutuu verkosta, koska leivottu esto
  (taustan talot) katkaisee kujien päät. Pyydetty Lavastajalta "liitokset" (tai tausta-v8). Sama karsii verkkoa laajemmin
  (1 560 vs 3 520 solmua ilman estoa); maali saavutettavissa.
- 20.5x: saareke RATKAISTU verkon puolella (4a928209a): reitit "avoin …" pakotetaan linjoiksi (JuoksuPalatsiVerkko.Pakotetut: saman
  suunnan janat yhdeksi, päät +3,5 m 2,03°:n kierron vuoksi, ei muurikujia). Oikealla pohjalla + estolla Lavastajan kolmella liitoksella
  tyohuone/puutarha/varasto läpijuostavia, juhlasalin keskusta karsiutuu (ei silmukkaa). Odottaa Lavastajan v8 + avoimet-sijoitus.json
  liitoksineen → TaustaKansio v8. Vianetsintä: JuoksuPalatsiVerkko.EiKarsintaa (internal, testit).
- 21.1x: kuvapari 209 (simu runko 10fdcb3da, sis. 782ce0de2): proto-3d/_tyo/pelikoodari/kuvapari-209/ (skenaario sk-juoksupeli-kuvapari-209.txt).
  Läntiset asuinpihat + avoimet huoneet ≈ j9 (hyvä). VIKA: 9 m:n kamera rakennusmassoissa → korjattu df0b0a42e (kuja 11/6, aukea 13,5/7,5 m),
  vaatii uuden simukäännöksen ja uusinnan ennen KK:ta. Tausta v9 kytketty (5a87c6a8a). Muurinharjaketju (Lavastaja) junaan 210:
  tarvitsee säännön aukko-/palkkikohdat.
- 21.3x: UUSINTA 209 (simu runko 1e1c9aab5): kamera ei rakennusmassassa koko ajossa (QA-loki 0, 10 ruutua puhtaat). Kuvat
  kuvapari-209/uusinta-*.jpg → PT (KK:lle PT:n hyväksynnällä). Skenaario sk-juoksupeli-kuvapari-209b.txt. Botti ei seuraa nuolta → pääjuoksu aukioilla.
- 21.4x: botti seuraa nuolta (a763a3efc, JuoksuV4Reitti.MaaliEtaisyys): oikealla pohjalla maaliin ~150 s / 997 m. Odottaa: Lavastajan
  huoneiden punaiset seinät (vihreät pois) → kytkentä; muurinharjaketju 210 (säännön aukko-/palkkikohdat).
- 21.5x: PT/KK Puyi pieni → kamera kujalla 8/6 m, aukea 11/6,5 m (DroneNosto) + MASSANOSTO (JuoksuV4Maailma: tavoite massassa → huipun yli
  1,5 m, JuoksuSokkeloMaailma.Huippu/Massassa). Vaatii simun (sk-juoksupeli-kuvapari-209b.txt + QA-loki 'kamera rakennusmassassa').
- 22.1x: TAUSTA-V10 kytketty (6f9eafdf3): TaustaKansio v10 + EstoTiedosto palatsi-esto-v4 (leivottu v10:stä, ämpärissä; paketti
  _valmiit/juoksupeli-palatsi-esto-v4-vienti-20261020). Verkkokorjaus: pakotettu sivuaskel ≥ 0,25 m (ennen 1 m; kuja-68-yhteyden 1,0 m
  pyöristyi pois → 10/13 huonetta irti). Nyt 13/13, botti maaliin 148 s. Kuva-ajoon lähtö koordinaateista `ui juoksupeli palatsi alku x,z` (ae3d9d188).
- 22.3x: UUSINTA 209c (runko f8ea8371b): proto-3d/lokit/todistus-juoksupeli-kuvapari-209c-20261020-2230/ → PT ja Lavastaja (w2/w3).
  Kuja-75 + huoneet ≈ j9. Puyi yhä ~1/12, massassa 13 ruutua. Laskettu: 65°:n kentällä Puyi ≤ 1/8 muurien yltä.
- 22.4x: TELE KUJILLA kytkimen takana (20e9379b1, oletus pois, QA `ui juoksupeli tele 0|1`): vaakakuvassa pystykenttä 40°, 7,5/8 m,
  katse 3 + 0,25 v → Puyi ~1/6 (DroneNosto.PuyinOsuus, testi TeleKujillaPuyiKuudesosa). KYSYTTY PT:ltä oletukseksi. Puomin ehdokas
  ei massaan (8b1444f52). Seuraava simu: sk-juoksupeli-kuvapari-209d.txt (tele päällä, 12 s latausodotus).
- Haaran kärki pelikoodari/nakoisyys-209 = 8b1444f52.
- 23.0x–23.2x: 209d (runko de726f827) EI OK → 825c0cc22 (huoneet peittokarttaan, kameran viimeinen massavarmistus) + b50c66c2e
  (PT 23.0x: tele myös aukioilla, kujantunnistus pois) + ff5bba4a6 (testi näkyvyys eteen ≥ 2 s). 209e (runko ae78d2ff6):
  Puyi mitattu 1/6, massassa 0, latausruudut poissa; viat 46 s räystään alla + w1 Puyi alareunassa → d97e15344 → NS → UUSINTA 209f
  (sk-juoksupeli-kuvapari-209f.txt) → PT (sama id, PT nollautui 23.2x). Kärki pelikoodari/nakoisyys-209 = d97e15344.
- JONO JUNAN 209 JÄLKEEN (PT 23.17/23.25, Raamattu 2.201 YHTEISET OSAT ENSIN): juoksupelin oma ☰ (valikkoRyhma/valikkoNappi/valikko +
  Lopeta) → NUI:n PelinValikko (natiivi-ui/yhteiset-saannot-209 aa9b8c3da, UI/Pelit/PelinValikko.cs ja PelinTuloskortti.cs). NUI:n ohje:
  RakennaHudissa `kehys = new PelinValikko(k.Turva(LinssiUi.RadioKerros), LinssiUi.RadioKerros, null, () => saanto != null && !saanto.Ohi,
  Sulje, tauko: auki => valikkoAuki = auki);` Avaa → kehys.Avautui(), Sulje → kehys.Suljettu(), Esc → kehys.Valikko.Avaa() (tauko, ei
  lopetusta), taustalle siirtyminen avaa ☰:n; YlaRaja kehys-ryhmän worldBound (julkinen getter NUI:lta tarvittaessa); JuoksuTulos.Matkalta
  = true matkalta avattaessa (kultainen nappi "Jatka matkaa"/"Pelaa uudelleen"); Tekstitys ja Musiikki ☰:n kytkiminä; alin rivi "Poistu".
  Lähde: /Users/Shared/Claude/Matkakirja-fable/scratchpad/paatoimittaja/2253/yhteiset-saannot/pelit-yhteiset-saannot.md.
- 00.2x (21.10.) 209g (runko 614177ad8) → PT: w1 OK, Puyi ~1/6, massassa 0, nykäykset vain kartalla. Kuvatekstien runko-SHA:
  scratchpad-skripti uudelleenmerkitse.py (todistusraportti.merkitse + arkki kuvat/raaka/*.png:stä) – todistusajo merkitsee kaannos.txt:n
  käännöspalvelun commitin (yksi commit rungon päällä).
- YÖJONO (PT 00.19, omistaja 00.22): 2a kamera lähemmäs ja elävämmäksi = b5281dcff (tele 36°, katse 2 + 0,2 v, Elo ×1,4; testit).
  2b taivaanranta: palatsissa kaukomaisema-rengas pois (vanhan sokkelon 226–390 m); Lavastajalta pyydetty ulkorengas Pekingin v11:stä
  1,5–2 km (kielletty-ulkorengas-v1/). 2c lisää katottomia huoneita ovineen: pyydetty Lavastajalta. 3 ☰ yhteisellä PelinValikolla: NUI
  teki jo (natiivi-ui/juoksu-valikko-209 2c2f0e7db), tarkista vain JuoksuTulos.Matkalta. 4 lentopeli WASD/nuolet = proto-haara
  pelikoodari/lento-wasd 69d50488b (worktree wt/proto-pelikoodari-lento-wasd; Lentopeli.NappainSauva + testi; NS:lle junaan). 5 raskas
  kohta 34 ms → 14 ms: kysytty Valosepältä kohta ja mittaustapa (iso iPad).
- 01.0x–02.4x (21.10., yöjono + tavoiteluuppi Lavastajan ja VS:n kanssa): kärki pelikoodari/nakoisyys-209 = a668563cc. Sisältää:
  taivaanranta ja Puyi ~1/6 (tele 29°, 7/13 m, katse 6 + 0,4 v; mitattu 209j 0,14–0,15 ennen tätä), tunnelin suu ja portin alla
  kamera (PorttiEnnakko 6 m, laaja kenttä), seinävara (sivusiirto pois muurista), katoton huone ylhäältä (12/3 m), este häivytetään
  Puyin kohdalla, maan täyte löytää lattiamateriaalin varjostimesta, kuva-ajon lähtö pisimmän suoran suuntaan, porttiloki,
  posliinin vaihtelu, aanet-v4, muurikate-v2, ulkorengas, tausta-v11 + esto-v5b, avoimet-v10 (MASK-tuki JuoksuMaailma.shaderissa
  JUOKSU_ALFA). Uusinnat 209h–209k: proto-3d/lokit/todistus-juoksupeli-kuvapari-209?-*; seuraava 209l (skenaario = 209j).
  Kuvatekstit: kaannos.txt = rungon SHA NS:n korjauksesta 48f7dc22f alkaen (ei enää uudelleenmerkintää).
- Tausta-v12 EI kytketty: esto −9 660 ruutua (oikeita seiniä lähti), Lavastaja tekee v12b:n; vertaa erokuvalla (TilapainenEstoErot).
- Lentopeli WASD (proto-haara pelikoodari/lento-wasd 9f7205708 ⊃ 69d50488b, a5ae7a14e testikomento `lentopeli nappain`): simulla
  todennettu (W nousu 3,00 → 5,47 km, D kaarto 316° → 59°); oikeat näppäimet Macilla kokeilematta. Samassa haarassa kartan
  galleria-arkki 8 (VS): KeskiLon −45, Stonehengen valli SarjassaPois, ISS-raketti ei maamerkkisoluksi, maamerkit massasäännöllä.
- 34 ms raskas kohta: vanha; LT 70bb1021c 9,16 ms ja 8d292ac8e juoksu 12,4 ms (raja 14). Seuraa yön lisäysten kasvua.
