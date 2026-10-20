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
- Haara **pelikoodari/nakoisyys-209 = df0b0a42e** (+ v9: 7 huonetta, ovikorjaus 04fe50214, kamera 11/6 m; aiemmin 782ce0de2 v8) (maali-209 f2be670cd:n päällä; 5d9b6dfd7 + avoimet huoneet + pakotetut linjat): kamera lähemmäs (DroneNosto kuja 9/6, aukea 12/7,5 m),
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
