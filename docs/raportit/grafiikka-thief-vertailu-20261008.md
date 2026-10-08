# Olavinlinna vs. Thief (2014): grafiikan laatu ja parannuslista linnan sisällön puolelta (Linnanrakentaja 8.10.2026)

Omistajan kysymys 19.4x: "Mikä ero grafiikan laadussa esimerkkipeliin verrattuna ja miten saisi paremmaksi?" Työnjako sovittu
Siirtosepän kanssa: **tämä raportti = sisältö ja data** (materiaalit, tekstuurit, leivottu valo, geometria, muisti). **Renderöinti**
(liekkien reaaliaikaiset varjot, SSAO/nurkkavarjostus, renderöintiresoluutio, jälkikäsittely, sumu) on Siirtosepän; hänen
kokeilunsa ja mittauksensa tehdään junan 168 jälkeen.

## 1. Nykytila (paketti v45i, natiivi master; tarkistettu koodista ja paketista)
| Asia | Olavinlinna nyt | Thief (2014, UE3) |
|---|---|---|
| Materiaalimalli | DioraamaLeivottu: albedo × leivottu valo × AO yhdessä valoatlaksessa; ei normaali-, karheus- eikä kiiltokarttaa (Siirtoseppä 8.10.). Esineet, hahmot ja poikkileikkaus: albedo + wrap-Lambert | PBR-tyyppinen: albedo + normaalikartta + spekulaari/kiilto, märät pinnat heijastavat liekkejä |
| Tekstuurin tarkkuus seinissä | Huonekohtainen yksilöllinen atlas 4096² ASTC 4×4: kappeli 137, keittiö G 102 153, Linnantupa 117, voudin sali 131 px/m (pakkaus ja reunat syövät osan) | Toistuvat materiaalit 1024–2048², noin 512–1000 px/m + yksityiskohtatekstuuri lähellä |
| Kuori (ulkoseinät, kalliot) | Fotogrammetria 8192² yhdellä tekstuurilla koko linnalle: noin **43 px/m**, valaisematon (valokuvan päivänvalo leivottuna) | Mallinnettu modulaarinen ympäristö, sama materiaalijärjestelmä kuin sisällä |
| Epäsuora valo ja nurkkien varjostus | Leivotuissa tiloissa (kappeli, keittiöt, Linnantupa, voudin sali, Fatabuuri, Keskushalli, Kierreportaat) Cycles-GI + AO leivottu; AO-B (kontakti-AO) kuoressa, keittiössä ja kappelissa. **Kävelyosat** (muurikäytävä, palatsi, pikkupiha, porttikäytävä T102, tyrmä E101, kirkkotornin portaat, vesiportti, ranta-1499) ovat ilman leivottua valoatlasta (tasainen pinta, vain reaaliaikaiset lisävalot) | Lightmapit + dynaamiset varjot + SSAO |
| Geometrian yksityiskohta | Seinät ja holvit tasaisina pintoina, kiviaines vain tekstuurissa; kävelyosissa laatikkoseinät | Erilliset kivet, palkit, kaaret, reunalistat, roska ja rekvisiitta tiheästi |
| Esineet | Proseduraaliset, 512–1024² väri × AO, 600–12 000 kolmiota | Tiheämpi rekvisiitta, normaalikartat |
| Hahmot | Quaternius/Mixamo, 512² ilman normaalikarttaa, Faceit-ilmeet | Korkeampi resoluutio ja normaalikartat |

**Mitä +60 Mt:n raja estää:** huonekohtaisen yksilöllisen atlaksen nostamisen 4k → 8k (+16 Mt per huone ja tunnelma) ja kuoren
tarkkuuden nostamisen (8k → 16k = +256 Mt). Nykyisellä mallilla tarkkuus maksaa muistia neliöllisesti. **Ratkaisu ei ole isompi
atlas vaan toistuvat materiaalit** (kuten Thiefissä): muutama jaettu 1024²-materiaalisarja koko linnalle ja leivottu valo erikseen
matalalla tarkkuudella. Silloin tarkkuus ei riipu huoneen koosta.

## 2. Parannuslista (linnan puoli; järjestyksessä vaikutus / työ)
| # | Parannus | Vaikutus | Työ (LR) | Muisti | Riippuvuus |
|---|---|---|---|---|---|
| 1 | **Toistuvat yksityiskohtamateriaalit** kivelle, laastille, puulle, oljelle, rappaukselle ja raudalle: albedo-detalji + normaali + karheus 1024² ASTC 6×6, maailmakoordinaateista (triplanar), leivotun valoatlaksen päälle. Poly Haven CC0 -lähteet ovat jo levyllä (rustic/stacked_stone_wall, rough_wood, plastered_stone_wall, slate_floor, rock_face, rusty_metal ym. 2k nor/rough) | **Suurin**: lähietäisyyden tarkkuus 120 → ~500 px/m, kivien kohokuva valossa, märkyys heijastaa normaaleista | 1 pv (materiaalisarja, ASTC, pinta-id → materiaali, leivonnan "detaljiton" atlas) | +6 × 3 × 0,6 ≈ **11 Mt** | Siirtoseppä: DioraamaLeivottu lukee detalji- ja normaalikartan (1 erä) |
| 2 | **Kävelyosien leivonta** (muurikäytävä, palatsi, pikkupiha, porttikäytävä, tyrmä, kirkkotornin portaat, vesiportti) samalla leivo_tila-putkella kuin tilat: GI + AO + liekkien leivottu valo 2k-atlakseen | Suuri huoneissa 6–10 (nyt tasaiset) | 0,5 pv | ~1,3 Mt × 7 ≈ **9 Mt** (2k ASTC) | ei koodia (kuten tilat) |
| 3 | **Kuoren lähikuva**: kuoren päälle sama kividetalji (#1) etäisyyshäivytyksellä + kuoren normaalikartta mallista (8k → 4k ASTC) | Suuri pihoilla, laiturilla ja muurinharjalla (43 px/m) | 0,5 pv (normaalikartan leivonta) + #1 | +5 Mt | Siirtoseppä: DioraamaKuori lukee detaljin ja normaalin |
| 4 | **Geometrian yksityiskohta**: kaaret, palkit, kynnykset, reunakivet, ovenpielet, kiviaineksen kohokuva seinien reunoissa (modulaarinen sarja Blenderissä, LOD) | Keskisuuri, siluetti ja varjot | 2–3 pv koko pelattava pala | geometria +2–4 Mt | Siirtosepän liekkien varjot tuovat sen esiin |
| 5 | **Rekvisiittaa lisää** (kangas, tynnyrit, säkit, roska, olki, kynttilät, ruoka) uudelleenkäytettävinä esineinä | Keskisuuri, eloisuus | 1 pv | ~4 Mt (jaettu ASTC, glb-välimuisti) | ASTC-lukija (juna 168) |
| 6 | **Esineiden normaalikartat** (esineet.py leipoo jo geometrian; lisää normaalin leivonta 512²) | Pieni–keskisuuri (käteen otettavat) | 0,5 pv | +6 Mt | Siirtoseppä: esinevarjostin lukee normaalin |
| 7 | **Hahmojen normaalikartat** (Quaternius-pohjat ilman) | Pieni (1. persoona, hahmot hämärässä) | 1 pv | +8 Mt | varjostin |

Kohdat 1 + 2 + 3: arviolta +25 Mt, ja ne tuovat suurimman eron Thiefiin. Uusi muisti on jaettua: lisähuone ei maksa lisää.
Rajan alle mahdutaan, kun esineet ja hahmot ladataan huonekohtaisesti (v45b-raportin ehdotus 3, noin −15…−25 Mt).

## 3. Ostettava lisäosa?
- **Tekstuureihin ei tarvita ostoa:** Poly Haven ja ambientCG (CC0) kattavat kiven, laastin, puun, oljen ja raudan 2k–4k
  normaali- ja karheuskarttoineen. Osa on jo levyllä (`proto-3d/_lahteet/polyhaven/`).
- **Valon leivontaan ei tarvita ostoa:** leivomme Blender Cyclesilla (leivo_tila.py). Unityn Bakery hyödyttäisi vain, jos
  leivonta siirrettäisiin Unityyn.
- **Ainoa nopeuttava ostos:** realistinen keskiaikainen modulaarinen linnasarja ja rekvisiittasarja (kohdat 4–5): seinäosat,
  kaaret, palkit, ovet, tynnyrit, kankaat ja PBR-kartat. Se säästäisi noin 2–3 päivää. Lisenssin on sallittava mobiilipeli ja
  muokkaus, ja tyylin on oltava realistinen (ei stylized). Suositus: osto vasta, kun #1–#3 on nähty pelissä. Ne tuovat suurimman
  eron ilman ostoa.

## 4. Ehdotettu järjestys
1. Junaan 168/169: #2 (kävelyosien leivonta, ei koodia) ja #1:n materiaalisarja + Siirtosepän detaljikartan lukija.
2. Sen jälkeen #3 ja Siirtosepän renderöintikokeilu (liekkien varjot ja SSAO), sitten yhteinen vertailukuva Thiefiin.
3. #4–#7 omistajan arvion jälkeen.
