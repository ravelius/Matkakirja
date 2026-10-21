# Lavastajan luovutus 20.10.2026 klo 19.25 (Opus, medium)

Edellinen: `viesti-lavastaja-luovutus-20261020-1750.md` (70c46e621). Työkalut, opit ja säännöt ovat ennallaan. PT:lle enintään 3 riviä.

## ENSIN (uusi Lavastaja)
1. **Louvren Tripo-henkilöt → juna 209** (omistaja 19.12 PT:n kautta "käytä niitä"): proto-haara `lavastaja/louvre-tripo-liike` 2dada40f9
   (worktree `/Users/Shared/Claude/wt/proto-lavastaja-monalisa`, pohja natiiviseppa/juna-208 00aefd136). Merge-pyyntö lähetetty NS:lle
   (local_a9af6995) 19.2x. Proto-repolla ei ole etärepoa, joten haara on paikallinen.
   - `MuseoHenkilot.Paalla = true`. k1 (Codexin nainen, luuranko idle + walk) kävelee gg:ssä Ytimen `MuseoKavijat`-simulaatiolla.
     Walk-tahti on mitattu glb:stä (2 × 1,28 m / 2,333 s, `KavelySykliM`/`KavelyKestoS`). k2 ja vartija ovat kiinteitä esteitä
     (`MuseoKavijat.LisaaKiintea`, uusi `Ydin/Museo/MuseoKavijatKiinteat.cs`).
   - Testit: `MuseoKiinteatTestit` 1/1, Linssit 2184/2184, tarkista.sh ok. NS kirjasi 209-jonoon (yhdistää, kun 208 on lukittu).
   - LS 19.3x: opaskierros ei tarvitse muutoksia. VARAUS: jos `museo elama 1` laitetaan päälle Louvressa, kaksi simulaatiota eivät näe toisiaan → siirrä k1 Elaman simuun.
   - Älä aja kaanna.sh:ta ja tarkista.sh:ta yhtä aikaa (sama rakennus-dll → Abort trap 6).
   - Kuvapari PT:lle 21.1x (PT:n pyyntö ennen 209:n lukitusta): `proto-3d/_tyo/linnanrakentaja/louvre-tripo-henkilot/` (esikatsele.py,
     kuvapari-1/2.jpg). k1:n paikat on otettu Ytimen simusta väliaikaisella testillä, jota ei ole committattu.
1b. **avoimet-v3** (PT 21.0x: huoneiden vihreät seinät → j9:n punainen, ristikot tummaa puuta): `avoimet_varit.py` (vain baseColorFactor) →
   `_valmiit/juoksupeli-avoimet-v3-vienti-20261020/` (SHA256SUMS ea7e7a0744a0). Lähetetty JU:lle ja PK:lle; sijoitus.json viittaa avoimet-v2/, ja PK vaihtaa etuliitteen.
2. **k2:n ja vartijan luuranko** (omistaja 19.23 hyväksyi): PT tilasi Codexilta samaan `louvre-kavijat-v2`-toimitukseen (idle + walk).
   Kun ne tulevat: media `louvre-ihmiset-v1`:n rinnalle (vienti JU), k2 `Kavelevat`-listaan; vartija pysyy tuolilla idlellä (tarkista mitoitus).
3. **Codex PT738-K1…K4** (4 uutta kävijää, posti 7ccc398a2): kokoa, kun ne tulevat. Ne lisätään `Paikat`/`Kavelevat`-listaan tai
   `MuseoKavijaMallit`iin, sen mukaan, ovatko ne Tripo-luurankomalleja.
4. **Codex PT734–737 → rakennukset-v13**: 19.25 vielä 0 glb:tä. Ohje on edellisessä luovutuksessa (pohja v12).
5. **Niken jalusta → juna 209** (omistaja 19.47, PT 19.5x): Codexin Tripo-jalusta (marmorinen laivan keula, posti 1d373f09d) tulee
   Salon Carrén päätyyn, nykyiseen paikkaan sc-nike (sali.json veistospaikat, jalusta ala (0, 0, −7,5), koko 2,2 × 2,4 × 3,2; Nike y 2,4).
   Portaikkoa ei tilata. Syy: sali-GLB:stä puuttuu jalusta, ja MuseoRakennus.cs:n väliaikainen laatikko (r. ~480) poistetaan, kun GLB
   latautuu, joten Nike leijuu. Kun keula tulee: mitoita niin, että sen yläpinta on Niken alapinnan tasolla (tai säädä paikka_y), lisää se
   veistokseksi tai jalustamalliksi MuseoRakennukseen ja vie media JU:lla. Kuva: Matkakirja-fable/docs/raportit/kaappaukset/omistaja-20261020/kk-1947-louvre-nike-ilman-jalustaa.png.
6. **Juoksupeli j9/j10-ilme → juna 209 eteenpäin, Louvren 209-työn JÄLKEEN** (omistaja 20.14, PT + PK 20.2x; havainnekuvat posti/juoksupeli-havainnekuvat-20261017b/):
   (1) VALMIS 20.5x: avoimet-v2:n 4 huonetta (juhlasali, tyohuone, puutarha, varasto) kuja-75:n molemmin puolin, ulkoseinä reunamuurin
       paikalla. Työkalut: `avoimet_sijoitus.py` → `avoimet/sijoitus.json`, `peking_tausta.py` 4. argumentti (AV-alueet), `aja_tausta_v7.zsh`
       → `peking/tausta8`, `pakkaa_tausta_v7.zsh` → `_valmiit/juoksupeli-kk-tausta-peking-v7-vienti-20261020/` (SHA256SUMS 8096cc91371b, mukana
       avoimet-sijoitus.json), `esikatsele_avoimet.py` → `esikatselu/avoimet-t8-lod0-*.png`. Ovet (16, säteillä auki) PK:lle, vienti JU:lle,
       NS:lle 209-jonoon. PK kytkee huoneet ja TaustaKansio v7 sekä porttiaukot pohja.json-muuriin kujan ovien kohdalle.
       **v8 (PK 20.4x–20.5x: alue jäi verkon saarekkeeksi):** sijoitus.json:iin `liitokset[]` (kuja-75 → poikkikuja z 293,5 → käytävä x −159,5 →
       pääverkon kuja z ≈ 191) ja `avaukset[]` (kuja-75:n suu, kaista x −158,5) → peking_tausta.py AA-alueet. `aja_tausta_v8.zsh` → `peking/tausta9`,
       `pakkaa_tausta_v8.zsh` → `_valmiit/juoksupeli-kk-tausta-peking-v8-vienti-20261020/` (SHA256SUMS 4efc5e665569). Korkeuskartan BFS (vapaa < 0,5 m,
       1,2 m väljyys): kaikki 4 kujaovea → pääverkon solmut. Vienti JU:lle, NS:lle 209-jonoon, PK testaa. Korkeuskarttaskriptit olivat scratchpadissa
       (Blender BVH-säde ylhäältä 0,5 m ruuduin); tee uudelleen tarvittaessa.
       PK 20.5x: liitokset toimivat (PK 4a928209a/782ce0de2, 3/4 läpijuostavia; juhlasalin S/N umpinaiset).
       **v9 (PK 20.5x, juna 209):** 3 huonekopiota (varasto-k1 (−240,5; 534), tyohuone-k2 (−214,5; 534), juhlasali-k3 (−43; 532,5)) pitkän
       läntisen kujan (PK:n lyhin reitti maaliin, z ≈ 515–528) pohjoispuolelle, kierto 87,97°, kukin sivuovi + päätyovi liitoksella kujalle;
       sekä juhlasalin S-avaus + liitos (silmukka). sijoitus.json: huoneet[] 7 (kopio=true), liitokset[] 10, avaukset[] 3. `aja_tausta_v9.zsh` →
       `peking/tausta10`, `pakkaa_tausta_v9.zsh` → `_valmiit/juoksupeli-kk-tausta-peking-v9-vienti-20261020/` (SHA256SUMS 72560662aaff).
       Lähetetty PK:lle, JU:lle (vienti) ja NS:lle (209-jono). Odottaa PK:n testiä.
       **v10 (PT/omistaja 21.3x–21.4x: katot leijuivat kujan yllä):** syy = Pekingin lähteen kujamuurit 7,6 m ja hallien seinät 0,5 m katon alla,
       lappeet näkyivät kujalle. Korjaus: kuja-75:n kaistat (13,5 m, z 300–450) tyhjiksi + 6 huonekopiota (huoneet[] 13, liitokset[] 39) + saumojen avaukset;
       koko taustassa muurit ≤ pohja-korkeus + 0,5 (kasvo vyöhykkeellä + kohtisuora etäisyys), seinät kattoon (BVH-säde ylös), rakennukset yhtenä
       kappaleena tasauksessa (pohja.json-rasteri). peking_tausta.py (TAUSTA_KAARI=1 = vanha), `aja_tausta_v10.zsh` (LODIT="…") → `peking/tausta11`,
       `pakkaa_tausta_v10.zsh` → `_valmiit/juoksupeli-kk-tausta-peking-v10-vienti-20261020/` (SHA256SUMS 9af806a84a2d). Kuva esikatselu/kuvapari-kuja75-v9-v10.jpg.
       Lähetetty PK/JU/NS/PT (viestiraja täyttyi → varakanava mcp send_message). Seuraavaksi: muut botin/nuolen kujat (läntinen z 515), jos lappeita.
       **Juna 210: muurinharjaketju** (nousu → muuriristeys → kattotasanne + toinen nousu alas): PK tukee y > 0 -reittejä; lähetä PK:lle
       ketjun reitti y-profiileineen ja kohdat (t, laji: rako 1,8 m muuriristeys/pre_gap→post_gap, este pre_hurdle→post_hurdle, tasapainopalkki
       katto/start→end) ja sijoitus kujan varrelle. Solmut ovat Codexin world-manifest.json route_graphissa (avoimet-rakennukset-v2 delivery/scenes).
   (2) Kasvit ja puut pihoille: ruukkukasvit, granaattiomenapuut ja männyt (Tripo Codexilta).
   (3) VAIN Tripo: leluesteiden tilalle esineet (arkut, maljakot, pöydät, kantotuolit) ja eunukit luurangolla. Kun mallit ovat valmiit,
       mallien nimet PK:lle, joka vaihtaa esteet. Lavastajan tilausjärjestys PK:lle 20.2x: eunukit → esteet → kasvit.
7. **Pulu**: oma lippu `MuseoPulu.Paalla` pysyy pois. Koodikyyhky on omistajan hylkäämä. Tripo-Pulu v3 on omistajan katselussa KK:n kautta,
   ja se tarvitsee linturigin ja liikkeet ennen kuin se kytketään.

## YÖ 21.10. (PT:n yösuunnitelma, Raamattu 7.46; jono järjestyksessä, seuraava aloitetaan kysymättä)
1. **Codex-portti VALMIS:** PR #5112 (30dba592c), liikkumaton hahmo + LIIKE (MANIFEST.json files[].liike/tyyppi tai .md "LIIKE x.glb: ei liikettä").
2. **Kalusteet:** Louvre valmis (6abf7e4d4, sali-v2s mediassa JU 00.23). Pelikuva PT:lle `proto-3d/_tyo/linnanrakentaja/museo-kalusteet/kalusteet-kirjastosta.jpg`
   (`kalustekuva.py`; kirjaston OBJ:t tehtiin väliaikaisella testillä, ei committia) – odottaa PT:n OK:ta ennen NS:n mergeä.
   Amsterdam sali-v7 = v6 ilman penkkejä ja jalustoja (`_valmiit/taidemuseo-alankomaat-v7-vienti-20261021`, 8b5adfbeee07; v6 ladattu mediasta
   `museo-kalusteet/nl-v6/`) → JU vienti; LS lisää sali.json:iin glb sali-v7 + kalusteet:false + penkit_malli (rivit LS:lle 21.10. 00.5x).
   Amsterdamin kävijät: ei Tripo-malleja ennen omistajan korttia.
3. **Ulkorengas VALMIS:** `tyokalut/peking_ulkorengas.py` (Peking v11 kaikki 28 laattaa, palatsin ulkopuolelta 1,8 km, LOD2, harvennus 18 %)
   → `_valmiit/juoksupeli-kk-ulkorengas-v1-vienti-20261021/` (kielletty-ulkorengas-v1/, 24 palaa, 285 k kolm., 15 Mt, 435fc4becb8e) → PK + JU.
4. **Kuja-338 VALMIS 21.10. 01.1x:** tausta-v11 (`_valmiit/juoksupeli-kk-tausta-peking-v11-vienti-20261021`, 21ee6b35ba51; kiveys tasoon 0 vain
   KIVEYS_ALUEET = kuja-338, koska koko palatsissa siirto avasi saumoja) → JU/PK/NS. Laatat ennallaan: esikatselu/aukot-t7-t12.jpg. Liitokset 63/64.
   **Tavoiteluuppi (omistaja 01.02, koko yö VS:n kanssa):** k1 huoneseinille kivinen harjakate → avoimet-v4 (`tyokalut/avoimet_harjat.py`,
   `_valmiit/juoksupeli-avoimet-v4-vienti-20261021`, 5cebafd008b6) → JU, PK vaihtaa kansion. k2 reitin muurit r07–r10 (keltainen lasitiilikate)
   = kk-taustan muurit (PK) → `tyokalut/kk_muurikate.py` → `_valmiit/juoksupeli-kk-muurikate-v1-vienti-20261021` (0c97c12d42e1, erillinen glb).
   Muurikate-v2 (855552db239e): räystäät +3 cm (v1 samassa tasossa, välkkyi). JU vei v1:n ja avoimet-v5:n 01.18–01.19; PK lataa (6514f47ab).
   **k4 (PT 01.5x, Codexin #762 matot + #773–774 paneeli/kääröt):** `tyokalut/avoimet_sisustus.py` → avoimet-v6 (581823596ecb) → JU, PK.
   **k5 (PT 02.0x):** avoimet-v7 (f1976537c870): kääröt 0,95 × 1,9 m silmän korkeudella myös sivuseinillä, huonematto + 2 käytävämattoa + ovimatot,
   lattia 0,62/0,50/0,34 (`avoimet_lattia.py v4 tmp 0.62,0.50,0.34` → `avoimet_sisustus.py tmp v7 <matot-zip> <paneelit-zip>`).
   **k6 (PT 02.1x, j9:n tiheys):** avoimet-v8 (7000a15c2cf8, `tyokalut/avoimet_kalusteet.py`): Codexin esineet kopioina huoneesta toiseen.
   **k7 (PT 02.2x):** avoimet-v9 (a6c578a93d9d): `avoimet_kalusteet.py` (ryhmät + päällekkäisyystarkistus) v7:stä + `avoimet_k7.py`
   (keltainen harjakate, kulunut lattia). Piikit (209i k1, z 446–480): muurien madallus venytti naapurikasvojen yhteisiä kärkiä →
   (madallus EI ollut syy). Oikea syy (pikselisäde): KORVAA-tyhjennys keskipisteen mukaan jätti seinäneliöistä puolikkaita kiiloja →
   peking_tausta.py v12: KIILAT (pystykolmio, vino reunasärmä > 4 m, 1 kierros) + SUIKALEET pois → `aja_tausta_v12.zsh` → peking/tausta13,
   `pakkaa_tausta_v12.zsh`. Kuva esikatselu/piikit-t12-t13.jpg. **k8:** avoimet-v10 (630203c7873d, `avoimet_k8.py`): kourutiilikate + laatat.
   PT: editoriluuppi TAUOLLA kunnes PK:n v9-pelikuva on PT:llä.
   Tausta v12 HYLÄTTY (PK: −21 % seinäalaa; v12 mediassa käyttämättä) → v12c-säännöt (kiila = reunasärmä lävistäjä alimmasta ylimpään,
   suikaleet < 6 cm; seinäala −0,7 %) → `pakkaa_tausta_v13.zsh` → kielletty-tausta-v13 (LOD1/2 ajossa). 209k-raita kuja-75:llä EI avoimet-v9:ssä
   (renderöity) → PK tunnistaa pelissä. **Louvre delivery-v3:** media louvre-ihmiset-v2 (b56c1e7e5f75, JU 02.32; `glb_tekstuurit_1024.py`),
   proto `lavastaja/louvre-k4-vartija-209` d7121d8ce (k4 rf-2511:n vieressä, vartija Daru-oven vieressä) → NS; simuarkki pyydetty.
   Nike: toleranssit postissa (07a2b31e3), koe2-sijoitus −0,25 m OK (museo-kalusteet/nike-koe2-sijoitus.jpg) → Codex teksturoi.
   **Nike valmis peliin:** delivery-v1 + `museo-kalusteet/nike_jalusta_tummat.py` (musta kiila = tekstuuria) → media louvre-ihmiset-v3
   (3b26d59e3d7e, JU 02.55); proto `lavastaja/louvre-nike-jalusta-209` 0ab06b9ae (Jalusta.Malli, sali.json jalusta.malli = henkilot.json-tunnus;
   MuseoKaideTestit-raja 44°) → NS runkoon 28064d13f. **Penkit + Rodin:** proto `lavastaja/louvre-penkit-rodin-209` 3fa65b78b
   (henkilot.json "malli"-kenttä; Linssit 2205/2205) → NS. Simuarkki (sk-louvre-hahmot-209.txt, H1–H6) odottaa NS:n polkua → JU:n vuoro.
   Testit ajetaan yksi kerrallaan (rinnakkain → Bus error).
   Niken keulan sovitustiedot Codexille: posti/lavastaja-codex-nike-sovitus-20261021.md (postilaatikko 5f25d26cc).
   **K3-kävelijä (kun Codex toimittaa):** LS:n kävelijätesti 0beee9946 (`sh Linssit-testit/kaanna.sh KavelijatEivat`, ≥ 0,8 m kamerasta;
   k1 nyt 1,20 m) ottaa henkilot.json:n kavelee:true-hahmot automaattisesti; aja ennen NS:lle lähettämistä.
   **Louvren k2 (LS 01.2x, lentävän kameran kaari):** proto `lavastaja/louvre-k2-paikka-209` b28f3d9a9 (LS:n d6c28c31e:n päällä) → NS.
   k3 lämmin lattia → `tyokalut/avoimet_lattia.py` → avoimet-v5 (b031aca09b13). Molemmat JU:lle; PK kytkee JU:n kuittauksen jälkeen (404-välimuisti). Kierrokset ja aamulista PT:lle: side-session-notes/<PT>/lavastaja-tavoiteluuppi-20261021.md.
   Vanha:  avoimet_sijoitus.py `KUJAT`-lohko (yleinen kuja: muurilohkot, 8 huonetta, kaistat,
   päiden avaukset, liitokset) → tausta-v11 `aja_tausta_v11.zsh` → `peking/tausta12` (ajossa). Seuraavaksi liitostarkistus + korkeuskartan
   BFS kuja-285 (z 361) ja kuja-290/335 (z 465) → pakkaa v11 → PK, JU, NS.
   21.10. 00.4x: kuja-338:n kiveys oli taustassa 0,5–1,4 m (huoneet ja juoksija jäivät alle) → peking_tausta.py "KIVEYS"-vaihe (palatsin
   vaakasuorat V4_lattia-kasvot 0,05–2,5 m → 0); v11 ajetaan uudelleen. Portti #5112 MERGATTU; pohjan luku 5 korjattu PR #5117.
   PT: kalusteiden pelikuvat hyväksytty, NS ottaa 6abf7e4d4:n. LS lisäsi Amsterdamin penkit_malli (99ee6f7d7) ja vaihtaa glb sali-v7 + kalusteet:false
   JU:n kuittauksen jälkeen. Ulkorengas mediassa (JU 00.35), PK kytki 2142fc39b.
   **Kalustekirjaston Tripo-vaihtoehdotus myöhemmin (PT 00.4x, KK:n kortti, kun omistaja on nähnyt nykyiset pelissä):** Niken jalusta on nyt harmaa
   laatikko, oikea on marmorinen laivan keula (Codexin Tripo-keula tilattu posti 1d373f09d); lisäksi penkit ja kaiteet.
5. Jono sen jälkeen: puuttuvat laatat (kysy PT:ltä, mitä tarkoitetaan), Louvren 4 kävijää (kun Codex toimittaa; vain K3 liikkuu, omistaja 00.10), kartan 3D-maamerkit VS:n kanssa.

## MUSEOT (omistaja 23.4x ja 23.50 PT:n kautta; jono järjestyksessä)
- **(3) Louvre-testi 209 VALMIS:** `proto-3d/_tyo/linnanrakentaja/louvre-tripo-henkilot/salikierros.py` → `louvre-209-salit.jpg` (10 salia; henkilöt
  vain GG ja Salle des États). Omistaja 23.50: K1 Salon Carré Niken edessä, K2 Daru istuu, K3 Mollien kävelee, K4 Orsay; 4 kävijää, lisää vasta kun
  omistaja on nähnyt. PT738-täydennys Codexille (posti 72505b752: luurangot, idle + walk, K2 sit). Pohjaan PR #5104.
- **(2) Kävijät dataan VALMIS:** proto lavastaja/louvre-tripo-liike **db9e86c3d** (NS:n 209-jono): Ydin `MuseoHenkiloData`,
  `Resources/Museo/<maa>/henkilot.json`, MuseoHenkilot lukee datan. Kun PT738 tulee: lisää K1–K4 ranska/henkilot.json:iin (Daru: leike_seisoo "sit").
- **(1) Yhteinen kirjasto, LOUVRE VALMIS (PT 21.10.: nykyinen geometria sellaisenaan, ei Tripoa):** proto **749d1657f + 6abf7e4d4**: Ydin
  `MuseoKalusteet` (penkit nahka/lasi/pyorea, kaide, kaarikaide, jalustat = sali_blender.py C#:na; väliseinä jää GLB:hen), MuseoRakennus piirtää,
  kun sali.json `"glb": {"kalusteet": false}`. Louvre: sali-v2s = v2r ilman kalusteita (`proto-3d/_tyo/linnanrakentaja/museo-kalusteet/kalusteet_pois_glb.py`,
  uudet indeksi-accessorit, koska Blenderin vienti jakaa indeksejä), `_valmiit/taidemuseo-ranska-v2s-vienti-20261021/` (SHA256SUMS 5ba9c4d7eb2e) → JU vienti,
  NS 209-jono (vaatii median). Vertailukuva `museo-kalusteet/v2r-v2s.jpg`.
  **AMSTERDAM KESKEN:** odottaa LS:n `penkit_malli`-dataa alankomaat/sali.json:iin; sitten kalusteet_pois_glb.py Amsterdamin GLB:lle + kalusteet:false.

## LINJAUS (omistaja 19.25 PT:n kautta, pysyvä): "käytä vain tripo Malleja"
Kaikki hahmot, eläimet, esineet, koristeet ja kalusteet tehdään Tripolla Codexin kautta, ei käsin tai koodilla. Codexin koristeet 751–756
siirtyvät Tripoon. TARKENNUS omistaja 19.28: koskee vain UUSIA malleja; vanhoja ei etsitä eikä muuteta. Rakennukset-v13 jatkuu normaalisti.
PT 19.4x PÄÄTTI: 208 lähtee ennallaan. Junassa 209 Mona Lisan katsojat ja kävijät vaihdetaan Tripo-kävijöihin (PT738-K1…K4 + k1, k2, vartija),
ja vaihdon jälkeen Quaternius-ihmiset (kavijat-v1/v2) pois kokonaan, ei sekaisin. Odottaa Codexin toimitusta (louvre-kavijat-v2).

## Valmiit tällä vuorolla
- Tausta-v6 oli jo valmis (459cd7ebb2a4). Rivi "JONO TYHJÄ" lähetettiin PT:lle 18.1x.
- **Meridiaaniportin keskiaukko** (omistaja 18.39): säteillä tarkistettu auki läpi asti (lod0/1/2, törmäys, tausta-v6). Ei korjausta.
  PK:lle mitat: keskilinja x = 13,186 − 0,0355·(z + 380,906), z −394,70…−367,12, leveys 6,0, lattia 0, holvi 6,0 → laki 9,0.
  PK otti ne käyttöön (palaute-208 7980a4cb9, drone 4 m:n korkeudella). Skriptiä ei säilytetty (scratchpad).

## 21.10. aamu (Lavastaja)
- Mac-esikatselu: --batch oletus (proto lavastaja/esikatselu-jumi 335bbfbd4, JU kelaa tyokaluseppa/esikatselu); pelin puoli a5b733c2b (EsikatseluSkaala) NS:llä junaan 209. Museon batch-skenaario tyokalut/natiiviseppa-skriptit/juna209/sk-louvre-hahmot-209-esikatselu.txt (odota nykyintro pois, rivi kahdesti).
- Muistikevennys: avoimet-v12 (kuvat ≤ 1024 px, GPU 254 → 154 Mt) ämpärissä 06.05; PK 951e747ef lataa huoneet kerran.
- V3:n seinämosaiikki: laitteella 209q:n w3 puhdas; tarkistetaan seuraavassa laiteajossa kohdasta 827 m (pelin materiaali, PK).
- Portin marmorikaide: muurikate-v4 (jalusta + terassit, kaide, reunalista, laatat) → v5 (ei katetta muureille, joiden vieressä katto nousee harjan yli; 6,1 km). PK kytkenyt v4, v5 kytkettävänä.
- #791 osamallit (Codex Tripo) viimeistelty: tyokalu proto-3d/_tyo/linnanrakentaja/osamallit791/viimeistele791.py; ämpärissä osamallit791-v1 (porras-suora, tasanne, palatsiovi, ristikko-ovi). Solmut ja mitat PK:lla. Palatsioven oikeassa lehdessä hiusviivaura jäljellä (näkyy vain lähikuvassa).
- #791-reitit (PT hyväksyi 08.5x): kuoret osamallit791/kuoret791.py, sijoitus tee_sijoitus.py (v3, PK:n lukijan muoto), tarkistus kokoa791.py; tausta-v14 (avaukset r791-*, aja/pakkaa_tausta_v14.zsh; peking_tausta.py nollapituisten kasvojen suoja). JU:lle viety pyyntö 09.xx; PK kytkee ja tekee arkin.
- Katot (OMISTAJAN PÄÄTÖS 21.10. 10.43): avoimet-v13 (avoimet_katot.py, solmut katto/katto_raystas) ja osamallit791-v3 (弘义阁-kuoren katto) ämpärissä 10.51; PK vaihtaa AvoimetKansion ja osamallikansion.
- Tasainen lattia (OMISTAJAN PALAUTE 21.10. 11.17): peking_tausta.py v15/v15b/v15c (maa-H 2 m, kohonneet laatat 0…0,6 → 0, korvausalueilta matalat kiilat pois); #791-korvausalueet korjattu taustan kehykseen (v14 virhe). Ämpärissä: kielletty-tausta-v16 (v15 käyttämättä), muurikate-v6, osamallit791-v4 (luotaa_v15.py, porras-terassi). PK kytkee.
- 21.10. ilta: tavoiteluuppi k1 sokkeli (tausta-v17 + avoimet-v14, proto lavastaja/sokkeli-k1 5629b166a, PT hyväksyi; LT mittaa VS:n 97875ec26 = k1+k2). #791-reitit akselinsuuntaisiksi: osamallit791-v5 (ämpärissä 17.56), proto lavastaja/osamallit791-v5-209 31744174c → NS. Amsterdamin NL1–NL4 Codex-tilaus PT:llä. Tarkista ennen -osiot PR #5142.
- Amsterdamin kävijät NL1–NL4 (Codex PT834–837): media taidemuseo/amsterdam-ihmiset-v1 (nl2 +3 cm, nl3 +1,1 cm), proto lavastaja/amsterdam-kavijat-209 5a3aff69d; VS:n päivänvalo fa8442d1f päällä → PT hyväksyi kuvaparin v2 → NS junaan 210. Kuvat _tyo/linnanrakentaja/amsterdam-kavijat/.
