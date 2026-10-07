# Natiivisepän luovutus 7.10.2026 (tilin 5 tunnin tauko 13.45–15.00)

Luovuttaja: Natiiviseppä (Opus 5.5, high). Edellinen: viesti-natiiviseppa-luovutus-20261005-iltapaiva.md (käytännöt voimassa).
Tarkempi lokirivistö: muisti natiiviseppa-tila-20261003.md (uusin rivi ylimpänä).

## ALOITUS TILINVAIHDON JÄLKEEN (7.10. ilta) — LUE TÄMÄ ENSIN

Olet Natiiviseppä (Opus, high). Lue tämä osio, MEMORY.md (erit. testaus-kevyemmin-20261007, mac-gui-automaatio-omistajan-naytolla)
ja natiiviseppa-tila-20261003.md. Kytke Remote Control päälle. Kerro Julkaisijalle ja PÄÄTOIMITTAJALLE, että olet paikalla.
Juna-SHA:t vain PÄÄTOIMITTAJAN kuittauksella; käännökset Julkaisijan NYT-viestillä. EI savua/Laitetestaajaa/stillejä ennen junaa
(omistaja 15.5x), EI roolien omia käännöksiä (16.0x), enintään 2 junaa/pv ellei omistaja pyydä.

**JUNA 162 TÄNÄÄN (omistaja: "tee tänään yksi päivitys klo 22")** — runko natiiviseppa/juna-162-koe **b8c0a59b6** (wt/proto-natiiviseppa-j144),
HYVÄKSYTTY (Päätoimittaja 16.2x + 16.4x) = BUILD 161 9572eaff + LS1 b9f37ee8f + NUI 3f07c49b + NUI 34cf54b0 + LS2 f6e4a8495 + Siirtoseppä
ef6b092d (⊇ 78e56088) + LS1 alkulento-v3-korjaus 19dcb1d15 + Siirtoseppä historia-juna163 2d19eb49 (⊇ ee0084ee; E2 heitto + E3 kappeli, Päätoimittaja 18.0x). + NUI seikkailu-toiminto f9f48082 (toimintonappi + löytö) + LS1 alkulento-ääni b11f5e253 (18.0x) + NUI seikkailu-tietokerros cbc92a25 + Siirtoseppä historia-juna164 1e48174e (⊇ ad6ebba6 ⊇ 2d19eb49; E3 LR v44i -mallit, tietokerros, kaatumiskorjaus; 18.2x) + LS2 E3-nousu d75b33031 (18.2x). Testit 447/419/850, unity 0, kaikilla .cs:llä .meta. Testit 447/419/842, tarkista, unity iOS/Mac 0, editori ok. Testit 447/419/835, unity iOS/Mac 0. Tarkista ensin, onko jokin vaihe jo tehty (`git -C proto-3d/Matkakirja-proto
log -1 master`, `tail -3 proto-3d/lokit/kaannospalvelu/juna.log`, `tail -5 proto-3d/lokit/natiiviseppa-mac-tf-vahti.txt`).
1. 21.15 runko lukittu → muutoslokin SISÄLTÖLISTA Julkaisijalle heti: apurahakortti v7 kuvineen + Valmiit linssit -nappi (9 linssiä
   ilman kehittäjätilaa); kuumailmapallon latauskuva kaupunkiin siirryttäessä; ISS-kyydin Euroopan satelliittikuva vuodenajan mukaan
   (syksy); aloituslento: ei yöpuolta, kone näkyy heti, pehmeä kameran aloitus, lentoääni ilman nykäystä; kehittäjävalikkoon "Olavinlinna – pelattava pala (kokeilu)" laiturilta kappeliin (Fogg, vene, kävely, vartijat, heitto, kappeli, Pulun tietokortit, lopun drone-nousu; puhelimen ohjaustapit ja toimintonappi).
2. Lukko vapaa 21.10 alkaen: `cd proto-3d && PROTO_APP_KOPIO=lokit/natiiviseppa-app-162-13c1c026 zsh tyokalut/proto-kaanna.sh b8c0a59b6` (app-kopio …-162-b8c0a59b)
   (EI savua). Tulos KÄÄNNETTY → "lukko vapaa" Julkaisijalle.
3. VIE (Päätoimittaja hyväksyi): `git update-ref refs/heads/juna/b13 b8c0a59b6… c076765c4…` (täydet SHA:t, tarkista nykyinen
   juna/b13 = c076765c) + juna.log-rivi (malli edelliset natiiviseppa-rivit), proto-masterissa `git merge --no-ff juna/b13 -m "BUILD 162
   (TF 1.1 (162)): merge juna/b13 b8c0a59b BUILD 161:n masterin 9572eaff päälle"` + Co-Authored-By, `git diff --quiet b8c0a59b6 HEAD`.
4. Täysi BUILD 162 -SHA Julkaisijalle + Päätoimittajalle. Julkaisija ajaa TF 162:n.
5. Mac TF 162 (lupa annettu): iOS-latauksen jälkeen `perl -e 'use POSIX; exit if fork; setsid; exec "zsh", @ARGV'
   proto-3d/lokit/natiiviseppa-skriptit/mac-tf.sh <BUILD162-sha8> 162`, tulos mac-tf-vahti.txt + gh run list proto3d-mac-testflight.
6. JUNA 163 -ehdokkaat: LS1 yksityiskohdat-havainnekuva c2884bc97 (⊇ 8bc2a42fc); aiempi LS1 8bc2a42fc (Pariisin yksityiskohtakuvat; 3 uutta tiedostoa .metoineen, overlay-kerros 17;
   tarvitsee workerin #4152, muuten kuvat eivät näy) — LS1:n mukaan kuitattu, varmista Päätoimittajalta.
7. Muut: PR ravelius/Matkakirja#4149 (mono_crash) Julkaisijalle; Mac-ohjauslevyvika: odota omistajan Player.log (DIAGNOOSI-rivit).

## OMISTAJAN PÄÄTÖS 15.5x (SITOVA): TESTAUS KEVYEMMIN
Ennen junaa/TF:ää vain automaattiset testit (Kartta/Peli/Linssit-testit, tarkista.sh zsh, unity-tarkistus iOS+Mac, editori) ja
käännös. EI savua, EI Laitetestaajaa, EI stillejä, EI iPad-mittauksia, EI toistoja ennen korjausta. Juna 1–2/pv, kun valmista on.
Muisti testaus-kevyemmin-20261007.

## JUNA 162 TÄNÄÄN (omistaja 16.1x: "tee tänään yksi päivitys klo 22"): runko nyt **13c1c0269** (+ Siirtoseppä ef6b092d ⊇ a7adab9f ⊇ 78e56088, v44g-peili palalle; Päätoimittajalta pyydetty hyväksyntä ef6b092d:lle; testit 447/419/835, unity 0). Aiempi **3bc7680c1** (= baaa24445 + NUI 34cf54b0, KUITATTU).
Siirtoseppä 78e56088 KUITATTU → hän yhdistää 3bc7680c1:n ja ratkaisee LinssiOhjain.cs:n, SHA viimeistään 21.00.
21.15 runko lukittu → muutoslokin SISÄLTÖLISTA Julkaisijalle heti (hän tekee PR:n ennen SHA:ta) → testit → ~21.25 proto-kaanna
(lukko vapaa 21.10 alkaen) → VIE ilman savua → update-ref juna/b13 c076765c → <runko> + juna.log → BUILD 162 master-merge →
täysi SHA Julkaisijalle + Päätoimittajalle ~21.35 → Mac TF: `perl … lokit/natiiviseppa-skriptit/mac-tf.sh <sha8> 162` iOS-latauksen jälkeen.

## TILA 16.0x: JUNA 162 -RUNKO natiiviseppa/juna-162-koe **baaa24445** (wt/proto-natiiviseppa-j144) = BUILD 161 9572eaff + LS1 b9f37ee8f +
NUI 3f07c49b + LS2 f6e4a8495 + Siirtoseppä a5cd9d81 (kaikki Päätoimittajan kuittaamia 16.1x). Testit 447/419/835, tarkista, unity
iOS/Mac/App Store 0, editori ok (lokit/natiiviseppa-juna162-testit.txt).
- Omistaja: enintään 2 junaa/pv, MUTTA Julkaisijan mukaan TF 162 tänään klo 22 (omistajan pyyntö): lukko vapaana 21.10 alkaen, runko
  lukitaan ~21.15 → testit → proto-kaanna (EI savua) → VIE/AVAUS → BUILD 162 master-merge → SHA + muutoslokin sisältölista Julkaisijalle →
  Mac TF 162 heti iOS-latauksen jälkeen (lupa annettu; lokit/natiiviseppa-skriptit/mac-tf-161.sh mallina, vaihda SHA/build 162).
- Odottaa Päätoimittajan vahvistusta: Siirtoseppä 78e56088 (⊇ a5cd9d81, E1; KONFLIKTI LinssiOhjain.cs → Siirtoseppä ratkaisee
  yhdistämällä baaa24445:n) + NUI seikkailu-tapit 34cf54b0 (puhdas).

## TILA 16.1x: TF 161 + MAC TF 161 LADATTU (iOS 37623777958, Mac 37624780571; fi.matkakirja.peli build 161 = 9572eaff).
Omistaja 16.0x: roolit eivät tee omia käännöksiä; täysi käännös vain junalle (minä) ja TF:lle (Julkaisija).
JUNA 162 -ehdokkaat: LS1 pallo-latauskuva **b9f37ee8f** (korvaa cc6176356, LS1:n mukaan kuitattu), NUI apuraha-kuvat **3f07c49b** (korvaa 5e45d1da; NUI:n mukaan kuitattu, ⊇ kehittaja-tf),
LS2 s2-kaudet f6e4a8495 (LS2:n mukaan kuitattu) — pyydetty Päätoimittajalta yhden rivin vahvistus. Kokoa BUILD 161 9572eaff:n päälle
(wt/proto-natiiviseppa-j144, uusi haara natiiviseppa/juna-162-koe), aja automaattiset testit, yksi käännös, VIE.
Worktree proto-natiiviseppa-ohjauslevy poistettu (mergetty); proto-natiiviseppa-kirjoitus jäi (cherry-pickatut commitit).

## TILA 16.0x: iOS TF 161 ladattu 15.56 (37623777958). Mac TF 161 -ketju (mac-tf-161.sh) käynnissä setsid, jonottaa lukkoa.
PR ravelius/Matkakirja#4149 (mono_crash talteen) Julkaisijalle. Juna 162 -ehdokkaat: LS1 cc6176356, NUI 5e45d1da (kuittaus?),
LS2 f6e4a8495 (varmista).

## TILA 15.4x: BUILD 161 = proto master **9572eaff** (juna/b13 2309f55d → c076765c, juna.log kirjattu). Julkaisija: muutosloki-PR + TF 161;
Mac TF 161 Julkaisijan luvalla iOS-latauksen jälkeen: `MATKAKIRJA_APPSTORE=1 MATKAKIRJA_BUNDLE_ID=fi.matkakirja.peli zsh
wt/proto-natiiviseppa-mac/tyokalut/mac-kaanna.sh 9572eaff 1.1 161` → ditto lokit/natiiviseppa-mac-tf-161-9572eaff → gh workflow run
proto3d-mac-testflight.yml -f app_polku=… -f versio=1.1 -f build=161 -f lataa=true (malli: lokit/natiiviseppa-skriptit/mac-tf-160-ja-lepo.sh).

## TILA 15.2x (myöhempi): JUNA 161 VALMIS VIE-PÄÄTÖKSEEN

- VIE-EHDOT (Päätoimittaja 15.3x): Laitetestaajan rutiini OK JA LS2 todentaa pallojen klikkauksen junan koekäännöksellä 68429b27b
  (simkosketus Ateena + Kreeta, iPhone + iPad, still + lokirivi). Mac-savu TF:n jälkeen tai omistaja itse.
- Runko **c076765c4**, koekäännös 68429b27b (app lokit/natiiviseppa-app-161koe-c076765c), loppusavu OK 15.19 (stillit
  lokit/natiiviseppa-savu161-juna/, 0 poikkeusta, kirjoitusääni 16 lyöntiä). Odottaa: Laitetestaajan rutiini → Päätoimittajan VIE →
  Julkaisijan JUNAN AVAUS NYT → `git update-ref refs/heads/juna/b13 c076765c4 2309f55d…` (tarkista nykyinen juna/b13!) + juna.log,
  BUILD 161 master-merge d8b0e0fc:n päälle, SHA Julkaisijalle (hän tekee muutosloki-PR:n), Mac TF 161 Julkaisijan luvalla
  (mac-kaanna <BUILD 161 master> 1.1 161, APPSTORE=1, kopio lokit/natiiviseppa-mac-tf-161-<sha>, gh workflow run lataa=true).
- Junaan 162: LS1 pallo-latauskuva cc6176356, NUI apuraha-kuvat 5e45d1da (odottaa kuittausta), LS2 s2-kaudet f6e4a8495 (LS2:n mukaan
  Päätoimittaja kuittasi 15.4x — varmista Päätoimittajalta kokoamisessa).

## TILA 15.3x

- **JUNA 161 -RUNKO c076765c4** (= 012faf6b6 + LS2 2d8da858f pallojen klikkaus + ui hiiri; testit 419/833, unity 0). Aiempi: **012faf6b6** (Päätoimittaja vahvisti 15.1x NUI 89d98b7e + Siirtoseppä 49888505, korvaa 227529f3; EI apuraha-kuvat
  5e45d1da → 162). Testit 447/419/833, tarkista, unity iOS/Mac 0, editori ok. KÄÄNNÖS NYT + SIMULAATTORI NYT pyydetty Julkaisijalta.
  LS2 pallojen klikkaus ja LS1:n kuitattavat vain jos ehtivät ennen koekäännöstä, muuten 162.

## TILA 15.2x

- **JUNA 161 -RUNKO f3d710212** = ea1a60e73 + natiiviseppa/mac-ohjauslevy **73794c17** (DIAGNOOSI-lokirivi; Päätoimittaja: diagnostiikka
  junaan 161). Unity iOS/Mac 0. Odottaa Päätoimittajan vahvistusta: NUI pariisi-esitys **89d98b7e** ja Siirtoseppä osoitin-varmistus
  **49888505** (merge-tree puhtaat). Sitten kaikki testit (tarkista.sh zsh:llä), proto-kaanna-koekäännös, savu (Mac: piiloon → takaisin →
  panorointi + ääni; kirjoitusääni aloitusruudussa; ei hiiri-/näppäinautomaatiota omistajan käyttäessä konetta).
- Ohjauslevy: omistaja vastasi "kaikki lakkaa", Matkakirja oli aktiivinen → ei taustafokus. Omistajan loki: Päätteessä
  `cp ~/Library/Containers/fi.matkakirja.peli/Data/Library/Logs/Matkakirja/"Matkakirja 3D"/Player.log ~/Desktop/matkakirja-loki.txt`.

## TILA 15.0x

- **MAC-OHJAUSLEVYVIKA (omistaja, Mac TF 160: panorointi/zoomaus lakkaa, kunnes klikkaa karttaa):** haara natiiviseppa/mac-ohjauslevy
  **84f44457** (wt/proto-natiiviseppa-ohjauslevy, BUILD 160:n päällä): diagnostiikka (ele UI:lle → peittäjä; kartta estetty → SyoteLukko-
  omistajat/EleetMuualla) + testikomennot ui mac paikka / ui mac hiiri pohjaan|irti. Toisto lokit/natiiviseppa-skriptit/mac-ohjauslevy-
  toisto.sh (vain komentotiedostot): EI toistunut (jumiutunut nappi, lukko, peitto → kartta ottaa eleet). Havainto: maan panoraja
  (laatikko × 1,3, loitonnuksen katto) pysäyttää reunalla ilman palautetta. Kysytty Päätoimittajalta omistajan tarkennus (kaikki
  suunnat? aktiivinen ohjelma?). Epäily 2: ei-aktiivinen appi (klikkaus aktivoi) — ei testattavissa ilman fokuksen viemistä omistajalta.
  Appin käynnistys vie omistajan fokuksen → ei Mac-ajoja hänen käyttäessään konetta.
- LS2: Ateenan pallon klikkaus (eri vika), haara linssiseppa2/hiiri-testi 2d8da858f (KaupunkiPallot.cs + testikomento), merge-tree puhdas.

## TILA 14.2x

- **JUNA 161 -ESIRUNKO natiiviseppa/juna-161-koe ea1a60e73** (c4fbdd6f5 + LS2 swe-rajat 95cf8eb97 14.2x, maarajat 200 todennettu;
  Kartta 447, unity iOS/Mac 0). Aiempi: c4fbdd6f5 (wt/proto-natiiviseppa-j144) = BUILD 160 d8b0e0fc + LS1 741625b8d +
  Siirtoseppä historia-juna161 526c9373 (korvaa eleet-2 67728f0b) + NUI kehittaja-tf 767c70eb + LS2 aa32b618b + 074c95a3 →
  755597cf (kirjoitusääni + vSync + Mac lepo, KUITATTU 14.2x). Testit 447/419/833, tarkista (zsh!), unity iOS/Mac 0, editori ok.
  PUUTTUU: NUI pariisi-esitys (metrolinjan stillit Päätoimittajalle), LS2 swe-rajat 95cf8eb97 (vasta kun Karttaseppä vahvistaa
  maarajapolut, nyt 404). Karttasepän #4140 kuitattu (main-repon PR, ei proto). Karttaseppä 14.3x: maarajojen vienti
  Julkaisijalla ~15.30–16; Karttaseppä ilmoittaa, kun molemmat 200 → vasta sitten 95cf8eb97 runkoon ja TF. Juna kootaan vasta NUI:n stillikuittauksen jälkeen.
- **Junan savu (Päätoimittaja):** Mac: piiloon → takaisin → panorointi lataa uudet laatat ja ääni palaa; kirjoitusääni aloitusruudussa.
  EI hiiri/näppäinautomaatiota, kun omistaja käyttää Macia (muisti mac-gui-automaatio-omistajan-naytolla).
- **Mac lepo mitattu:** 755597cf piilossa 2,1–2,6 %, ei valittuna 7,5 % (4975a36c), täysi 15–16 %. Omistaja todentaa Mac TF 161:llä.
- **Juna 162 -ehdokas:** Siirtoseppä osoitin-varmistus **227529f3** (peilin vaihto lataa rakennuksen uudelleen; kehittäjäkomennon
  vika, pelaajilla ei) — KUITATTU junaan 162 (14.3x). Siihen asti peilivaihdossa "poikki lataa" tai puhdas asennus.
- **FACEIT VALMIS 14.30 (raportoitu):** +0,03 ms/kehys GPU (B 9,39 − A 9,36), raja 0,3 → ALLE; iPad riittää. Päätoimittaja: EI uusia
  iPad-ajoja vanhaan Olavinlinnan esittelyyn; seuraavat iPad-ajot: juna 161:n todennus ja Siirtosepän pelattava pala (E1).
- (vanha) FACEIT-uusinta 14.21 (LOHKOT "B A", puhdas asennus per lohko; aiempi 14.06-ajo antoi 2 A-jaksoa), käynnissä 14.06 (puhdas uudelleenasennus korjasi latausvirheen), tulos lokit/natiiviseppa-faceit-uusinta.txt.

## TILA 14.0x (tauko peruttu 13.47)

- **Mac lepo:** 13.36-ajon "vika" oli mittausvirhe (selain peitti ikkunan → oikein "piilossa"). mac-cpu.sh korjattu (ikkuna
  400,100 ja eteen open -a + napsautus; C = sovellus piilotettu cmd+H, koska Spacen vaihtoa ei saa automatisoitua).
  4975a36c (Cesium suspendUpdate + piirtoväli 30 piilossa): A 16,3 / B 7,5 / C 3,0 % (TF 159 ~15 % kaikissa).
  **755597cf** (+ runInBackground pois piilossa) Julkaisijan jonossa ~14.14 → mac-cpu.sh → luvut Päätoimittajalle.
- **FACEIT:** 14.02-ajo: A-peili a0e53749 antaa nyt latausvirheen (12.48 toimi) → kysytty Siirtosepältä, ajo pysäytetty.

## TAUON TILA (13.34)

- **Mac TF 160 LADATTU** (run 37606997700 success; app lokit/natiiviseppa-mac-tf-160-d8b0e0fc, fi.matkakirja.peli, build 160).
- **Mac lepo -dev 28da7435** käännetty (lokit/natiiviseppa-mac-lepo-28da7435, Nakyvyys-symboli mukana). mac-cpu.sh jälkeen-ajo
  käynnistetty 13.34 setsid → lokit/natiiviseppa-mac-cpu/jalkeen-28da7435/cpu.txt (+ "Mac-ikkuna"-lokirivit). Tarkista ja lähetä
  luvut Päätoimittajalle (ennen A 14,8 / B 14,9 / C 15,5 %; tavoite C < 2 %). Sen jälkeen Mac-intro-kaappaus ja panorointi.
- **LEPO-MITTAUS 13.36 (28da7435) — VIKA, EI VIELÄ PÄÄTOIMITTAJALLE:** A 3,7 / B 4,0 / C 4,4 / D 4,6 %. Lokissa vain YKSI rivi
  "Mac-ikkuna piilossa → 1 fps" koko ajon ajan → MatkakirjaMacSyote_Nakyvyys palautti bitin 0 = 0 myös näkyvänä, joten peli oli
  1 fps:ssä kaikissa tiloissa (A:kin). Tutki: kutsutaanko pääsäikeeltä (AppKit-ominaisuudet muualta = roskaa → dispatch_sync main
  tai NSWindowDidChangeOcclusionStateNotification-tarkkailija, joka päivittää atomista tilaa), onko Unityn ikkuna [NSApp windows]-
  listassa, occlusionState-arvo. Lisäksi 1 fps maksaa silti ~4 % → tavoite < 2 % vaatii myös esim. Cesiumin/taustasäikeiden
  pysäytyksen tai OnDemandRendering-välin. Ikkuna oli eri paikassa (560,50 1440×928), joten napsautukset eivät osuneet: aseta
  mac-cpu.sh:ssa ikkunan paikka (System Events set position/size) ennen napsautuksia. Mac TF 161:een vasta korjattuna.
- **FACEIT-uusinta KESKEN**: ipad-faceit-aabb.sh korjattu (rivinumero ilman välilyöntejä — se hylkäsi hyvät jaksot; lämmityksen
  jälkeen linssi pois + 30 s). Viimeisin ajo 13.23 kaatui: devicectl "application failed to launch (error 10002, Invalid
  argument)" — todennäköisesti edellisen konsoliajon tappamisen jälkeen. 15.00 jälkeen: tarkista iPad (devicectl list devices),
  aja `perl … faceit-uusinta-ajo.sh` (Julkaisijan lupa on), tulos lokit/natiiviseppa-faceit-uusinta.txt → yksi rivi Päätoimittajalle.
- **JUNA 161 KUITATUT (Päätoimittaja 13.3x, kokoa tauon jälkeen BUILD 160 d8b0e0fc:n päälle):** LS1 esitys-giza **741625b8d**
  (ehto: Giza vain kokeilukytkimen takana), eleet-2 **67728f0b**, kirjoitusääni **074c95a3**, kehittaja-tf **767c70eb** (⊇ 270992bd),
  kaupunkipallot **aa32b618b**, worldview-vakiot LS2:lta (SHA kysyttävä LS2:lta). EI VIELÄ: NUI pariisi-esitys (uusi SHA tauon
  jälkeen stilleistä, EI 5c3d45e6), Macin vSync + lepo 28da7435 (CPU-luvut ensin; vSync 107fabeb on 074c95a3:ssa — jos lepo ei
  ehdi, kysy Päätoimittajalta, meneekö 074c95a3 vSyncin kanssa). LS1 torjunnan kesto / NUI lippurivi: tarkista Päätoimittajalta.

## TILA HETI

- **BUILD 159 = master b00c06f7**; TF 159 ja Mac TF 159 ladattu. Mac TF -työnkulku: proto3d-mac-testflight.yml
  (`mac-kaanna.sh <SHA> 1.1 <build>` MATKAKIRJA_APPSTORE=1 + MATKAKIRJA_BUNDLE_ID=fi.matkakirja.peli, kopio
  lokit/natiiviseppa-mac-tf-<build>-<sha>, lataus vasta Julkaisijan luvalla).
- **BUILD 160 = proto master d8b0e0fc** (12.5x: juna/b13 603cfd8a → 2309f55d, juna.log kirjattu). Julkaisija tekee
  muutosloki-PR:n ja TF 160:n; Mac TF 160 (`mac-kaanna.sh d8b0e0fc 1.1 160`, APPSTORE=1) vasta Julkaisijan luvalla.
  Mac-kaanna 074c95a3 (dev) vasta NUI pariisi-esityksen jälkeen Julkaisijan uudella KÄÄNNÖS NYT -viestillä.
- **JUNA 161 -korjaukset:** haara natiiviseppa/juna161-korjaukset **074c95a3** (wt/proto-natiiviseppa-kirjoitus) =
  kirjoituskoneääni f222e5eb (Aloitusnakyma soittaa Tehoste("pen") sanoittain, kuten webin KIRJOITUSRYTMI; iOS + Mac) +
  Mac vSync 107fabeb (Ruudunpaivitys: Macilla vSyncCount = näyttö/fps, oli 0 → repeämä) + lokirivi "MATKAKIRJA ruutu: Mac vSync".
  - KÄÄNNETTY 12.53 (yhdistelmä af5922b95, polku ilmoitettu Julkaisijalle, LS1:lle ja LS2:lle): iOS-yhdistelmä 074c95a3+47622521f(LS1 yövalot)+e16d100db(LS2 pallo-puoli), loki
    lokit/kaannospalvelu/20261007-124705-*.log, app-kopio lokit/natiiviseppa-juna161-koe/. Valmistuttua appin polku ja
    yhdistelmän SHA Julkaisijalle, LS1:lle ja LS2:lle. Sitten mac-kaanna 074c95a3 (dev, 1.1).
  - iOS TODENNETTU 13.01 (Päätoimittajalle ilmoitettu): lokit/natiiviseppa-savu161-ennen/intro-ennen-aani.wav (a5b381a7) vs
    natiiviseppa-savu161b/intro-jalkeen-aani.wav (af5922b9), molemmat "Laita äänet päälle" + Aloita seikkailu, kaappaa 16:
    puhe kohdistuu 0,99, jälkeen 19 lyöntiä yli puheen (yläkaista > +10 dB), ennen 0. ÄÄNET PÄÄLLE TARVITAAN (pois = mykistys).
  - Päätoimittaja KUITTASI kirjoitusäänen junaan 161. VSync + Macin lepo kuitataan Mac-todennuksen jälkeen.
  - MACIN AUTOMAATTINEN LEPO (Päätoimittaja 13.0x, omistajan Mac TF: ~30 % CPU piilossa): **28da7435** (sama haara, 074c95a3:n
    päällä). MatkakirjaMacSyote_Nakyvyys (occlusionState/isMiniaturized/isHidden/isActive+keyWindow) → Ruudunpaivitys.MacLepo:
    piilossa 1 fps + AudioListener.pause, ei valittuna ≤ 10 fps (ääni soi), vSync-jakaja > 4,5 → vSyncCount 0. Lokirivi
    "MATKAKIRJA ruutu: Mac-ikkuna …". unity-tarkistus 0 virhettä (Mac ja iOS).
  - MAC-KÄÄNNÖS: mac-kaanna **28da7435** (dev, 1.1) Julkaisijan jonossa 15.00 jälkeen (LS1 gizan perään). Sitten
    `zsh lokit/natiiviseppa-skriptit/mac-cpu.sh "<proto-3d/Matkakirja-proto-mac/Build/mac/Matkakirja 3D.app>" lokit/natiiviseppa-mac-cpu/jalkeen-28da7435`
    (A valittuna, B näkyy ei valittuna = ikkunaton Tyhja.app etualalla, C kokonäyttö toisessa Spacessa, D takaisin) + intro-kaappaus
    + nopea panorointi. ENNEN (TF 159, aloitusnäkymä): A 14,8 %, B 14,9 %, C 15,5 %, D 15,5 % (lokit/natiiviseppa-mac-cpu/ennen-159).
    Tavoite C < 2 %. Luvut Päätoimittajalle. Huom: mac-cpu.sh:n napsautukset eivät edenneet aloitusnäkymästä (sama tila jälkeen-ajossa).
  - Mac repeämä ENNEN: TF 159 -kopiolla lokit/natiiviseppa-mac-repeama/ennen-panorointi.mov (hiiri veda 700 550 1300 550 0.25 16).
    screencapture tallentaa koostetun pinnan, joten repeämä ei näy kuvissa; juurisyy on koodissa (vSyncCount 0).
- **Muut juna 161 -ehdokkaat (odottavat Päätoimittajan SHA-vahvistusta):** LS1 torjunnan kesto, Siirtoseppä eleet-2 **67728f0b**
  (korvaa 1ca51a6b; kytkimet poikki eleet / poikki puolilahi), NUI lippurivin kielikorjaus, NUI kehittaja-tf **767c70eb**
  (korvaa 270992bd ja bb05c48a; testaajatilan pois kytkentä sulkee sen avaamat esittelylinssit, apurahakortin linssit jäävät). kehittaja-tf todennetaan App Store -käännöksellä: ilman koodia ei Kehittäjä-riviä; testaajakoodilla
  (Päätoimittajalla) kaikki linssit ja vapaa liikkuminen ilman Kehittäjä-riviä; täydellä koodilla (POLLO_KEHITTAJAKOODI
  tiedostossa ~/.matkakirja-avaimet-koodaus.zsh) kaikki, myös Giza-kytkin. Koodia ei lokiin eikä viesteihin.
- **iPad FACEIT ABAB MITÄTÖN** (lokit/natiiviseppa-ipad-faceit-20261007-1248, ilmoitettu Päätoimittajalle + Siirtosepälle): A peitto-tilassa
  300/300 piirretty (16,68 ms, GPU 9,4 ms), B jäi paikallaan-tilaan (piirretty 2–108), pari 2:n poikkileikkaus aukesi 5 min viiveellä.
  UUSINTA PÄÄTETTY (Päätoimittaja 13.1x): 15.00 jälkeen Julkaisijan iPad-vuorolla
  `perl -e 'use POSIX; exit if fork; setsid; exec "zsh", @ARGV' lokit/natiiviseppa-skriptit/ipad-faceit-aabb.sh` (lohkot A B B A, lämmitys +
  2 jaksoa, tilavahti 300/300 peitto, hylkäys), sitten `python3 faceit-analyysi.py <O>` → YKSI RIVI Päätoimittajalle:
  FACEIT-hinta ms ja raja 0,3 ms. faceit-analyysi.py regex korjattu (rivi\s+).
  SIIRTOSEPÄN SYY: DioraamaLevyvalimuisti.SiivoaVanhat pitää vain nykyisen paketin → jokainen A↔B-vaihto lataa erot uudelleen
  (Wi-Fi minuutteja). Uusinnassa: odota ennen "tila kappeli" lokia 'saapuminen alkaa|latausvirhe' (aikaraja 600 s) + 20 s, ja aja
  lohkoina AABB / BBAA (yksi vaihto, ensimmäinen avaus lämmittää).
- **Actions-ajurit** siirretty /Users/Shared/Claude/actions-runner(-2) (muisti actions-ajurit-shared-polussa).
