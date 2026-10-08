# Linssiseppä 2:n luovutus 5.10.2026 (klo 06.0x)

Edellinen: viesti-linssiseppa2-luovutus-20261004.md. Päätoimittaja local_5df52e10-10e4-4b72-9554-0049db300dfe.
VUOROT: käännös- ja simuvuoro aina Julkaisijalta ("NYT käännös", "SIMU NYT"). Ilmoita: "KÄÄNNETTY <sha>, lukko vapaa" ja "simu vapaa".

## ALOITUSVIESTI UUDELLE SESSIOLLE (VAIHTO NYT 7.10. 23.30, lopullinen)
Olet Linssiseppä 2 (Opus, high). Lue CLAUDE.md, tämä tiedosto (OMISTAJA- ja TILA-osiot ylhäältä alas) ja Raamatun Ydinajatus kohta 2.
Proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto. TYÖTAPA (omistaja 7.10. 15.5x/16.0x): ei omia käännöksiä, savuja, stillejä
eikä toistoajoja; haaralle unity-tarkistus (tyokalut/tarkista.sh) + testiajurit (Kartta-/Linssit-/Peli-testit/kaanna.sh); kuittaus
Päätoimittajalta 1 rivillä → SHA Natiivisepälle junaan. Simu/käännös vain vian syyn selvittämiseen, ilmoitus PT:lle etukäteen.
Ajoskriptit pysyvästi: proto-3d/lokit/linssiseppa2-3d-kattavuus/ajot/ (scratchpad ei säily). Simut F2D9B022 (iPhone), 4CE6C737 (iPad).
Taustalla: LS2:lla ei omia taustaajoja. Karttasepän talvi2d-poltto jatkuu (talvi/v1 → avoin työ 1). Odottaa: Natiivisepän
junat 162/163 (E3-nousu d75b33031 + Siirtosepän 1e48174e yhdessä; kevät 08a6891a0; pallot-maailma 2739ded66).
Avoimet työt:
1. S2-KAUDET talvi (kevät tehty): kun Karttaseppä ilmoittaa s2-eurooppa/talvi/v1 ja kevat/v1 olevan ämpärissä, lisää ne
   Ydin/Iss/Vuodenaika.S2EuroopanVersio-taulukkoon (nyt vain syksy; talvella myös Vuodenaika.S2Nakyy(Talvi) = true, jos talvi-S2 korvaa
   BMNG:n – kysy PT:ltä) + VuodenaikaTestit → PT:n kuittaus → Natiiviseppä. Syksy f6e4a8495 on junassa 162.
   KEVÄT TEHTY 7.10. 20.1x: 08a6891a0 (peili/proto/linssiseppa2/s2-kevat, worktree wt/proto-linssiseppa2-kevat, syksyn päällä),
   PT KUITTASI junaan 163, SHA lähetetty Natiivisepälle. Talvi (talvi/v1) Karttasepältä ~23.xx → tee
   samaan tapaan uutena committina kevään päälle.
2. Worktreet (poista `git worktree remove`, kun haara on masterissa): wt/proto-linssiseppa2-pallo-puoli (aa32b618b, juna 161),
   -hiiri (2d8da858f + ui hiiri juna 161; 6ec5dcff4 -ei-lepoa vain testihaarassa), -hiiri160 (testi, ei junaan), -paikannimet
   (59d44e87b juna 160), -swe-rajat (95cf8eb97 juna 161), -kaudet (f6e4a8495 juna 162).
3. Siirrytään-ruutu jää peittämään, jos opas suljetaan kesken siirtymän: LS1 korjaa (linssiseppa/pallo-latauskuva, juna 162).
4. E3-NOUSU (PT 17.5x, kuitattu 18.0x): SeikkailuNousu + NousuReitti d75b33031 (peili/proto/linssiseppa2/e3-nousu, worktree
   wt/proto-linssiseppa2-e3nousu). Kulkee samassa junassa kuin Siirtosepän kutsu 1e48174e (162 jos Natiiviseppä ehtii ennen 21.15,
   muuten 163). Ei toimia, ellei Natiiviseppä pyydä. Myöhemmin: komeron mitat merkistä "nakyma:kellotorni-kaari", kun Linnanrakentaja
   vie sen merkit.json:iin (nyt staattiset kentät SeikkailuNousu.KaariUnity jne.). Poista worktree, kun haara on masterissa.
5. KAUPUNKIPALLOT MAAILMANÄKYMÄSSÄ (omistaja TF 162, PT 22.2x kiire): 2739ded66 (peili/proto/linssiseppa2/pallot-maailma, worktree
   wt/proto-linssiseppa2-pallot-maailma, korjausjunan rungon 5a99dda77 päällä): Paavalikko.MaailmaNakyma → kaikkien maiden pallot
   (KaupunkiPalloMitat.Nakyy), pelissä vain nykyinen maa. SHA Natiivisepälle + PT:lle 22.34 (korjausjuna 163 tai 164).

## OMISTAJA 7.10. 15.5x (sitova): ennen junaa VAIN automaattiset testit + käännös; ei savuja, stillejä, iPad-mittauksia,
## toistoajoja; kuittaus 1 rivi (muutos, testit, SHA) → Natiiviseppä. Simu vain, jos vian syy muuten epäselvä.
## 21.5x: raskaat poltot/paistot (kartta, Blender, ääni) eivät käynnisty junakäännöksen aikana (kaannospalvelun lukko varattu).
## 16.0x: EI omia käännöksiä (iOS/Mac); haaralle unity-tarkistus + testit; täysi käännös vain juna/TF; poikkeus vian selvitys + ilmoitus PT:lle.

## TILA 9.10. klo 01.3x (uusin)
- TAIVAS: jälkeen-kuva junasta 168 OK (PT kuittasi); lokit/linssiseppa2-taivas-jalkeen-0100/kuvapari-*.png.
- PILVIKERROS: käännös 694b0077 (ilmakeha-170 masterin päälle; app-kopio lokit/linssiseppa2-app-170-694b00776), pilvet 1 näkyy
  (lokit/linssiseppa2-pilvet-0115/pilvet1); pilvet0-ajo epäonnistui (app ei käynnistynyt), vertailukohtana jalkeen168. Kytkin pois.
- OMAT 3D-MALLIT: raportti docs/raportit/pallo-omat-mallit-pariisi-tukholma-20261009.md (884277ae6), kuvat lokit/linssiseppa2-kohteet-0100
  (+ mallilahteet-liite.md). Odottaa PT:n/omistajan päätöstä ostoista (Notre-Dame ~20 USD, Riddarholmen ~15 USD).
- MUISTI: muistitesti-168 20bea87c6 (v45u, hahmojen ASTC oikein): Ultra keittiö 1010 / tupa 1019 / tyrmä 963, pinnat 440/450.
- VIKA löydetty: junat 168/170 pala sulkeutuu latausvirheeseen (hahmot 10/13) → korjaus 1b43eb127 junan 169 rungossa (Siirtoseppä).
  UI-stillien ja pala-kuvien uusinta junan 169 simukäännöksellä (pyydetty Julkaisijalta).

## TILA 9.10. klo 00.4x
- TAIVAAN RAIDAT (PT kuittasi junaan 168): proto linssiseppa2/ilmakeha-168 989685f09 (= 911f772d8 + dither eca114064 + vanha
  DioraamaTaivas 989685f09, Dither.hlsl); syy B10G11R11-HDR-puskurin 5-bittinen sininen. Ennen-kuva lokit/linssiseppa2-taivas-ennen-0015
  (Sacré-Cœur, JALKEEN="opas kamera 48.8867 2.3431 700 76 350 175"); JÄLKEEN-kuva junan 168 simukäännöksestä samalla ajolla.
  Sama dither myös ilmakeha-170:ssä (ccd7d3594, cdeb31829). Varjostimia ei ole Unity-käännetty (simukäännös todentaa).
- SEINE: nosto 2,0 m (pariisi2), tukholma2 0,4 m → Karttaseppä vei index-v3:n Julkaisijalle.
- MUISTI: muistitesti-168 80c4e0ade: v45r (rekvisiitta 112 Mt) OK; juna 169 v45s + huonelataus (Ultra keittiö 1041 / tupa 1039 /
  tyrmä 994), UltraAtlaksetMt 300 (Natiiviseppä 9747db7f4) riittää. Siirtosepälle: lataushetken huippu, linnantupa ei kävelyosa.
- UUSITTAVA seuraavassa simuvuorossa: pala-kuvat (aja.sh) ja UI-stillit (ui-stillit.sh) – korjattu 96d1e43db (odottaa latauspalkki
  100 %); kävelyosadiagnoosi vaatii buildin, jossa "poikki kavely 0" on (167c:ssä ei ole). Pilvikerroksen kuvapari ilmakeha-170:n
  käännöksestä (pilvet 0 vs 1).

## TILA 8.10. klo 23.3x
- MUISTITESTI v45o (junan 168 ehto, PT kuittasi 23.28): proto linssiseppa2/muistitesti-168 9a43856fc (pallo-168 + pinnat 150/70 +
  Natiivisepän UltraAtlaksetMt 135 1b755328f); kultainen olavinlinna-v45o-muisti.json; Ultra 665 → 838, muut +42 Mt, ei ylityksiä.
  Auki LR:lle: esine-glb:iden upotetut normaali-PNG:t (+21 Mt keko).
- PILVIKERROS (PT 23.28, kohta 6a, juna 169/170): ilmakeha-170 8e9ad7fa4, kytkin "pilvet 0|1" oletus pois; SEURAAVAKSI TF 167:n
  jälkeen VarjostinTarkistus (Unity batch) ja kuvapari kaupunki-vertailu.sh "p0=pilvet 0" "p1=pilvet 1" (käännös tarvitaan).
- SIMUVUORO ~00.15 (Julkaisijan SIMULAATTORI NYT, tarkista 167c): Seine nosto KAUPUNGIT=pariisi "n04=vesinosto 0.4;vesijuuri
  file://<scratchpad>/vesi-t2/" … 0.8 / 1.2 (vesi-t2 = Karttasepän vesi-koe-b pariisi2 + tukholma2 id-nimillä, 167-appi lukee index-v2),
  tulos Karttasepälle; Tukholma A/B samalla juurella vs ilman; pala-FP + kävelyosadiagnoosi (PT); UI-stillit (Natiivi-UI).
  Skripti grafiikkavertailu 1fd00b4e3 (vesijuuri-asetus).

## TILA 8.10. klo 22.4x
- JUNA 167: ilmakehä + vesi PÄÄLLÄ kehityskaupungeissa (PT 22.35; rungossa ilmakeha-170 8107c0022). Kuvapari
  lokit/linssiseppa2-kaupunki-kuvapari2-2226 (OSM-rivi näkyy). HUOM ajoskriptin vanha asennus -virhe korjattu (58e775f5f).
- JUNAAN 168 valmiina ilmakeha-170 6986c7580: asetukset ennen LuoDataa, try/catch, vesi piiloon, valotus 12.
- AUKI: Pariisin Seinen vaaleat soikiot (verkko ehjä → Googlen vesi noston läpi?) → testi vesinosto 0,4/0,8/1,2 simuvuorossa ~00.15;
  samalla pala-FP-kuvat, kävelyosadiagnoosi (PT) ja Natiivi-UI:n UI-stillit (ui-stillit.sh).

## TILA 8.10. klo 20.5x
- GROUNDER (juna 167 B): testi linssiseppa2/grounder-testi-4 f94cf9841 (Editor GrounderTesti, play mode batch, GROUNDER_KOE/NOUSU);
  final-ik-167 71d34bb97 (maxStep 0,5 + invertFootCenter + Best + heightOffset −0,02): kantapää 30,5 → 3,9, leijunta 11,2 → 4,2–4,6,
  varpaat 21,6 → 2,6 cm, ponnahdukset 0. Worktree poistettu (Library 6 Gt).
- VALOVIHJE (omistaja: Pulu pois, juna 168): linssiseppa2/valovihje 44546ee12 (ValoVihje + SeikkailuVihjeet). Pressutesti
  linssiseppa2/pressu-testi 3abd996af (Siirtoseppä korjaa: oppitunti päättyy veneen perillä).
- MUISTITESTI: linssiseppa2/muistitesti 2a30d791d (LinnanMuistiTestit, kultainen olavinlinna-v45i-muisti.json, Natiivisepän portaat
  peilattuina c4c3018ba; vaihda suoraan LinnaMuistibudjettiin BUILD 169:n jälkeen).
- VERTAILUAJURI: linssiseppa2/grafiikkavertailu 529bf79b1 (tyokalut/grafiikkavertailu, simu UDID Julkaisijalta); tyrmä odottaa palan avausta.
- ILMAKEHÄ (PT: LS2 tekee maiseman varjostimet): linssiseppa2/ilmakeha-170 5b21bf22c (LS1:n pallo-grafiikka-170 päällä): LUTit +
  IlmakehaLut (Ydin, testit) + IlmakehaTaivas/IlmakehaLaatat + KaupunkiIlmakeha + 3 liitosta (LS1 katselmoi). SEURAAVAKSI: varjostimien
  Unity-käännös (Library-klooni + batch) ja kuvapari vertailuajurilla (asetus "ilmakeha 1" kaupunki-kuva-asetukset.txt:hen), sitten vesi
  Tukholmaan (Karttasepän vesi-tukholma-20261008, 6 m + 16 m LOD).

## TILA 8.10. ilta, myöhemmin
- m167 kokonaan mergetty (historia-m cc70cf219, e99c36130 asti: tarkistuspistetestit 7–8, piilotarkistuspiste 16fe2b69a, AjaHuone);
  Siirtoseppä vie junaan 167 LR:n v45c:n kanssa (kuittaus erikseen klo 21 jälkeen, jos v45c ei ehdi). Worktreet m-jumi, kevat, m167 poistettu.
- PARIISIN PALLO (PT kiireellinen, omistajan TF 166): Linssit-testit/Testit/PalloKierrosTestit.cs (linssiseppa2/pallo-pariisi ed7455817,
  worktree wt/proto-linssiseppa2-pallo-pariisi; LS1 cherry-pickasi haaraansa linssiseppa/ukkonen-saa-167 72a22b17c, siellä 7/7).
  Toisti viat 768906539:llä (Élysée-kumpu 390 m taakse, hitaalla verkolla 5,8 s seisonta, toisen kehyksen nykäys, lähtö ei levosta).
  Worktree poistettavissa, kun LS1:n haara on mergetty.
- AjaHuone(w, huone) LS1:lle: ThiefAjuri.Huoneet 2: 1–8, 3: 8–12, 4: 12–20, 6: 21–64, 7: 64–88, 8: 88–92; AjaHuoneTestit. Jono tyhjä.

## TILA 8.10. ilta, klo 18
- PT: työjonot /Users/Shared/Claude/Matkakirja-fable/scratchpad/tyojonot.md (oma kohta "Linssiseppä 2"); valmis erä → 1 rivi PT:lle ja heti
  seuraava kohta; [LUPA]/[PT] ohitetaan; tyhjä → "JONO TYHJÄ: Linssiseppä 2". Juna 167: lukitus 21.30, kuittauspyynnöt PT:lle ≤ 21.15.
- linssiseppa2/m167 (historia-m 12116991c + merge m-jumi), worktree wt/proto-linssiseppa2-m167: df4c36cf7 kultaiset v45a + PelattavaPala v45a
  (Huonesimulaatio lukee Versio-vakiosta), db2ce3883 MTila jumimalliin + SeikkailuKomero.PalautaM-arkkukorjaus. 959/959, tarkistus 0.
  SHAt Siirtosepälle (hän pyytää PT:n kuittauksen junaan 167), 1 rivi PT:lle. Vanha worktree wt/proto-linssiseppa2-m-jumi poistettavissa kun m167 mergetty.
- Jonon kohta 1: yhteinen rajapinta LS1:n läpipeluuajurin kanssa — ehdotettu ThiefAjuri.AjaHuone(w, huone); odottaa LS1:n vastausta.
- AVOIN: muuriportaiden tarkistuspiste (70 → 66).

## TILA 8.10. ilta
- Juna 167 M-osa, Siirtosepän jako: minulle (1) jumitestit T6a–T10a + valppaus + anteeksianto, (2) vihjeportaat 6–10 (SeikkailuVihjeet vapaa).
  Lukossa Siirtosepällä: SeikkailuEsineet/Vartijat/Pelaaja/Sali/Kappeli/Tietokerros/Tallennus/Tallentaja; SeikkailuPako/Komero jaettuja (kerro ensin).
- linssiseppa2/m-jumi (e0c46d263 päällä), worktree wt/proto-linssiseppa2-m-jumi: 5f0f19943 MOsanJumiTestit + Pako.Kiinni;
  568bb9651 tarkistuspisteet huoneessa 6 + anteeksianto + Vartija-valppauskorjaus (torkkuja) + ThiefAjuri laaja varahaku/Tilat/KiinniAlkaa;
  bf80a22ae MVihjeet + SeikkailuVihjeet-kytkentä + testit. 957/957, tarkistus 0. SHAt Siirtosepälle; Linssiseppä (LS1) tekee läpipeluuajurin
  haaraan linssiseppa/lapipeluu-167 m-jumin päälle.
- AVOIN: kiinni muuriportailla (70) → tarkistus Tott-kammio 66 → ajuri jumissa (ehdotettu T7a muuriporras-komeroon).
- ODOTTAA: (3) Siirtosepän M-tallennusrajapinta → Kirjoita/Lue-testi; SeikkailuKomero.Ydin (nyt heijastus); LR v45a (6a4e9cad: tiili+köysi-esineet) kultaisiin seuraavassa erässä.
- Kone kuormitettu (load ~86) → testiajat moninkertaiset.

## TILA 8.10. iltapäivä, myöhemmin
- v44z-haarat MERGETTY (historia-m e0c46d263), worktreet poistettu. PT: M-osa junaan 167; työnjako Siirtosepän kanssa:
  (1) huonesimulaatio LR:n 1499-M-geometrialla, kun hash tulee; (2) M-jumitestit; (3) SeikkailuTallennuksen M-tila → Kirjoita/Lue-testi.
- (2) VALMIS: linssiseppa2/m-jumi 5f0f19943 (e0c46d263 päällä), worktree wt/proto-linssiseppa2-m-jumi: MOsanJumiTestit (3) + JUMI KORJATTU
  Pako.Kiinni (kiinni köysilaskussa/kalliolla → Kello, uusi yritys; SeikkailuPako kuuntelee Kiinnijaatiin). 952/952, tarkistus 0. SHA Siirtosepälle.
- ODOTTAA: (3) rajapinta Siirtosepältä; (1) LR:n hash; vihjeportaat 6–10 (tarjottu, Siirtoseppä ei vielä vastannut).

## TILA 8.10. iltapäivä
- v44z (LR 92f60298: harja 5 m liitoksesta + silta itäkyljestä) TODENNETTU: P linssiseppa2/v44x-p aba56d9f9 (historia-valot b73018ba5,
  913/913, pala 1–5 134 s, rajattu 20 pisteeseen) ja M linssiseppa2/v44x-m 4ac32a5df (historia-m f4286888c, 947/947, HarjaKorjattu=true).
  SHAt Siirtosepälle. Poista worktreet wt/proto-linssiseppa2-v44x-p ja -v44x-m mergen jälkeen.

## TILA 8.10. keskipäivä
- v44x (LR B, d1695f96) AJETTU: worktreet wt/proto-linssiseppa2-v44x-p (historia-valot b73018ba5, haara linssiseppa2/v44x-p) ja
  -v44x-m (historia-m f4286888c, linssiseppa2/v44x-m), kultaiset v44x vaihdettu, EI COMMITTIA (pala kaatuu). Tulos: P 912/913, M 946/947:
  VarjoreittiKokoPala jumissa 3/20 — silta alkaa laiturin juuresta 1,2–1,3 m portinvartijasta hänen riitakatseensa sektorissa (25°),
  lyhdyn valossa 0,63–0,72 → B ei junakuntoinen. M-osa OK (harja tiedoksi). Luvut + vaihtoehdot Siirtosepälle.
- ODOTTAA: LR:n korjattu hash → aja molemmat uudelleen samoissa worktreeissä, commit + SHA kun pala menee.

## TILA 8.10. aamupäivä, myöhemmin
- muuri-v44w MERGETTY; Siirtosepän harjakorjaus 00ddd3c12 (Uppoutunut, talonpojan kääntö, kuulon korkeus).
- proto linssiseppa2/harja 64a1fc4ca (00ddd3c12 päällä), worktree wt/proto-linssiseppa2-harja: klooni päivitetty; harja pääsee 90:een,
  sakara (91) 0,83 m vartijan edessä 17° katseesta valossa 0,81 → HarjaKorjattu=false. Luvut + vaihtoehdot Siirtosepälle.
- harja 64a1fc4ca MERGETTY (historia-m = 64a1fc4ca); worktree poistettu.
- ODOTTAA: LR:n hash (sakara + ote 1 > 55° katseesta ja ≥ 2,5 m vartijasta, tai vartija sivuun) → uusi worktree historia-m:stä,
  kultaiset, todenna HarjaHiipien, HarjaKorjattu=true jos läpi.

## TILA 8.10. aamupäivä
- LR v44w (f8aa682f): proto linssiseppa2/muuri-v44w 8aa45baf4 (historia-m 3cd1e87e3 päällä), worktree wt/proto-linssiseppa2-muuri.
  Kultaiset v44w, MuurikaytavaHiipien OK (30 s), HarjaHiipien tiedoksi (HarjaKorjattu=false): tikkaiden yläpää 0,9/1,5 m harjan
  hahmoista soihdun valossa → epäily. Kuulo ilman pystyrajaa (osa muurikaytava = käytävä+harja+ranta). SHA Siirtosepälle, kopio LR:lle.
- ODOTTAA: Siirtosepän/LR:n harjakorjaus → todenna (2,5 m vain arvio), vaihda HarjaKorjattu=true.

## TILA 8.10. aamu, myöhemmin
- huonesim-m2 MERGETTY (historia-m 3cd1e87e3, 944/944): SeikkailuSali käyttää VoudinKiistaa, KiistaValiS 20 s (pisin odotus 32 s).
  Worktree poistettu. ODOTTAA LR:n muurikäytävän hashia (tulee suoraan LS2:lle) → uusi worktree historia-m:n kärjestä, kultaiset päivitys.

## TILA 8.10. aamu
- huonesim-m 6c3ad3865 MERGETTY; PT:n päätökset historia-m 80095efaa (naamio ei muurilla, RantaEsiinS 25; LR:ltä piilot muurikäytävään).
- linssiseppa2/huonesim-m2 4fff570f6 (80095efaa päällä), worktree wt/proto-linssiseppa2-huonesim-m2: Huonesimulaatio naamiosääntö,
  M-testi jaettu (muurikäytävä odottaa LR:n piilo:muurikaytava-* → päivitä kultaiset hashista), VoudinKiista Ydin + 3 testiä
  (kytkentä Siirtosepälle, SeikkailuSali lukossa). 944/944, tarkistus 0. SHA Siirtosepälle.
- ODOTTAA: LR:n muurikäytävän piilomerkit + heitettävä kivi (hash Siirtosepältä/LR:ltä) → kultaiset v44w, MuurikaytavaJaHarjaHiipien ajetaan.

## TILA 8.10. aamuyö
- HUONESIMULAATIO 6–10: proto linssiseppa2/huonesim-m 6c3ad3865 (historia-m a04573945 päällä), worktree wt/proto-linssiseppa2-huonesim-m.
  Kultaiset v44v (LR 89d543ae), ThiefAjuri.cs erotettu, OlavinlinnaMOsaTestit (reitti 21→92 212 s, kiipeily 19,5 s, komero, pako K4 22,1 s).
  940/940, tarkistus 0. SHA Siirtosepälle + PT. Löydökset: naamio kelpaa muurilla/harjalla; ilman naamiota muurikäytävä mahdoton
  (partio koko käytävä, ei piiloja); RantaEsiinS 20 < sujuva 22 s (malli 25). Poista worktree mergen jälkeen.

## TILA 8.10. yö, myöhemmin
- m-osa 67344b937 MERGETTY (historia-m a04573945, 938/938); Siirtoseppä lisäsi SeikkailuVartijat.Odottamaan(reitti) UusiYritys-kohtaan.
  m-osa-worktree poistettu. Jäljellä vain wt/proto-linssiseppa2-kevat (juna 164).
- SEURAAVA: LR:n v44v (reitti:pelaaja-21…94, huoneet 6–10) → LR ilmoittaa hashin → huonesimulaatio 6–10 historia-m:n päälle
  (kultaiset v44v, Huonesimulaatio laajennus: naamio, linnaväki, muurikäytävän lyhty, kiipeily/pako ohjattuina jaksoina).

## TILA 8.10. yö
- Kappelin kytkentä 950532c9b MERGETTY (Siirtoseppä teki saumakorjauksen 26f558be); worktreet poistettu.
- M-OSA: proto linssiseppa2/m-osa 67344b937 (historia-m a2077efce päällä), worktree wt/proto-linssiseppa2-m-osa:
  b20c18c8d MOsaRajatTestit (12) + 3 Kiipeily-korjausta MOsa.cs:ään; 67344b937 Ydin Pako + Komero (+.meta), PakoJaKomeroTestit (6),
  SeikkailuPako/SeikkailuKomero kytketty (pakon myöhästymisjumi korjattu). 908/908, tarkistus 0. SHA Siirtosepälle + PT.
  Avoin rajapinta: SeikkailuVartijat-tapa piilottaa rannan vartijat uudelleen (UusiYritys) — Siirtosepän päätös.
- ODOTTAA: Linnanrakentajan reitti:pelaaja-21… (pyydetty) → huonesimulaatio huoneille 6–10 (Huonesimulaatio.cs + Thief-ajuri).

## TILA 8.10. myöhäisilta
- KAPPELIN KYTKENTÄ (Siirtoseppä antoi, juna 165): proto linssiseppa2/kappeli-kytkenta 950532c9b (historia-valot 6f41c3396 + kappeli-vaiheet),
  worktree wt/proto-linssiseppa2-kappeli-kytkenta. SeikkailuKappeli.Arvoitus seuraa vaiheita, Havaitse joka kehys, tallennus + Pulun edistys.
  Malli: kiinni kuten Unityssa. 882/882, tarkistus 0. SHA Siirtosepälle. Löydös: Kynttilat.SaumatNakyvat ei katso alttarikynttilöitä.
  (kappeli-vaiheet-worktree poistettu, haara sisältyy kytkentään.)
- SEURAAVA (PT): M-osan (historia-m) Ydin-testit + huonesimulaatio 6–10; tarjous Siirtosepälle lähetetty, odottaa vastausta.

## TILA 8.10. ilta
- e4faa4144 MERGETTY (Siirtoseppä korjasi löydökset 1–5: 7aab3f25). Olavinlinna-worktree poistettu.
- KAPPELIN VAIHEET: proto linssiseppa2/kappeli-vaiheet 57c4e3220 (7aab3f25 päällä), worktree wt/proto-linssiseppa2-kappeli:
  Ydin/Seikkailu/KappelinArvoitus.cs (+.meta) + KappelinArvoitusTestit (8) + Huonesimulaatio 7aab3f25:n sääntöihin. 881/881, tarkistus 0.
  SHA Siirtosepälle + PT. Kytkentä SeikkailuKappeliin: Siirtoseppä päättää (tarjottu LS2:lle). Poista worktree mergen jälkeen.

## TILA 8.10. iltapäivä
- SIMUT T7:LLÄ 8.10. alkaen (Natiiviseppä): omien zsh-ajoskriptien alkuun `source /Users/Shared/Claude/proto-3d/tyokalut/simusarja.sh || exit 2`
  (vanhat UDID:t F2D9B022/4CE6C737 käännetään; taulu tyokalut/simusarja-udid.tsv). Ilman sitä xcrun simctl osuu vanhaan sarjaan. MCP-simu
  ei näe T7:ää → napautukset simkosketuksella/todistusajolla. Ajoskriptejä (lokit/linssiseppa2-3d-kattavuus/ajot/) ei vielä päivitetty.
  nohup/xargs/timeout/env ohittavat funktion: niissä `xcrun simctl --set "$MK_SIMSET" …` ja UDID T7-muodossa (`mk_kaanna <UDID>`).
- OLAVINLINNA-TESTIT (PT 8.10.): proto linssiseppa2/olavinlinna-testit e4faa4144 (Siirtosepän historia-valot 7d8408f98 päällä),
  worktree wt/proto-linssiseppa2-olavinlinna. Linssit-testit/Testit/Huonesimulaatio.cs (sovittimen säännöt, Kopioi), OlavinlinnaPala-
  Testit (Thief-ajuri reitti 1–20: 173 s / 0 kiinni; valoreitti, harhautus, Pulu 180 s), PelattavuusmalliTestit (Ydin-rajat).
  Kultaiset v44s + liekit (tee-olavinlinna-liekit.mjs). 870/870, tarkistus 0. SHA Siirtosepälle (yhdistää junaan 164) + PT.
  Löydökset Siirtosepälle: odotus_s ei luettu (KavelyData), tarjottimen askeleet herättävät/tutkituttavat, yaw0-merkki, Pinta ilman
  kiertoa, lyhty kaikista, kappeli 1–11 vain Unityssä (odottaa Ydin-luokkaa → LS2 kirjoittaa jumitestin).
  Poista worktree, kun haara on masterissa.

## TILA 8.10. 07.2x
- Uusi sessio aloitti (PT local_593b89a1-2514-4d74-b956-2a73db862382). Mergetyt worktreet poistettu (e3nousu, hiiri, hiiri160, kaudet,
  paikannimet, pallo-puoli, pallot-maailma, swe-rajat; haarat jäävät). Jäljellä wt/proto-linssiseppa2-kevat (08a6891a0, juna 164).
- Talvi odottaa Karttasepän uutta näytettä (lumitodennäköisyys). Merkkiä "nakyma:kellotorni-kaari" ei vielä masterissa.

## TILA 7.10. 18.0x
- E3:n loppu (PT 17.5x, juna 163): SeikkailuNousu + NousuReitti, haara peili/proto/linssiseppa2/e3-nousu kärki d75b33031
  (BUILD 161:n päällä), worktree wt/proto-linssiseppa2-e3nousu. Kellotornin komero Linnanrakentajalta: Unity (−51,0; 15,8; 5,5),
  ulos (−0,985; 0; 0,174), päälinna (−20; 15; 0) r 90, pysähdys 9 m. NousuReitti-testit 5/5, unity-tarkistus 0.
  PT KUITTASI 18.0x junaan 163; SHA lähetetty Natiivisepälle. PT: Siirtosepän E3d:n loppu kutsuu SeikkailuNousu.Aloita
  nykyisen yksinkertaisen nousun tilalla. Siirtoseppä kuittasi rajapinnan: SeikkailuKappeli.Loppu kutsuu heijastuksella
  (7a95377d, haarassa historia-juna164 @ 1e48174e, varanousu jos luokkaa ei ole). PT 18.2x: d75b33031 ja 1e48174e samassa junassa, 162 jos Natiiviseppä saa puhtaasti ennen 21.15, muuten 163.
  Natiiviseppä tietää; LS2:lta ei toimia, ellei Natiiviseppä pyydä.
  Myöhemmin: lue merkki "nakyma:kellotorni-kaari" merkit.jsonista, kun Linnanrakentaja vie sen.

## TILA 7.10. 15.3x
- JUNA 161 pallon klikkaus TODENNETTU (68429b27, Natiivisepän koeappi): iPhone Ateena, iPad Kreeta+Pariisi, Mac Ateena (oma 6ec5dcff).
  Korjaus 2d8da858f + ui hiiri 5b61d14f4 junassa; -ei-lepoa (6ec5dcff4) vain testihaarassa. Still lokit/linssiseppa2-kaupunkipallo-161-stillit/osuma-161-68429b27.jpg.
- Lisälöydös: Siirrytään-ruutu jää, jos opas suljetaan kesken siirtymän → LS1 korjaa (linssiseppa/pallo-latauskuva, SiirtymaPeru, juna 162).
  (NUI:n toistopyyntö peruttu: omistaja 15.5x "testaus vielä kevyemmin" – vain automaattiset testit + käännös ennen junaa.)
- S2-KAUDET todennettu iPadilla (c3c9bc115): lokit/linssiseppa2-s2-kaudet/syksy-kesa-c3c9bc115.jpg → KUITATTU junaan 162 (15.4x), SHA Natiivisepälle
  (f6e4a8495). Pari ei täsmälleen samasta kohdasta (ISS liikkui); tarvittaessa uusi pari kiinteällä kellolla. Talvi/kevät taulukkoon kun ämpärissä.
- Mac-ajotapa: lokit/linssiseppa2-3d-kattavuus/ajot/mac-pallo.sh; Mac-appi -ei-lepoa-lipulla, komennot ~/Library/Application Support/Matkakirja/Matkakirja 3D/.

## TILA 7.10. 15.0x
- MAC-PALLOVIKA (omistaja 14.5x: Ateenan/Kreetan palloa ei voi klikata Macilla): juurisyy pallokerros SendToBack Nostot-kerroksessa
  → nimiöt/merkit/nappula sieppaavat. Korjaus linssiseppa2/hiiri-testi 2d8da858f (juna-161-koe:n päällä): PalloNappi.ContainsPoint
  (kuori+kori), BringToFront; testikomento ui hiiri (klikkaa|pallo|poimi|paina|vapauta), UiKerros.Poimi. Ennen-haara hiiri-160 109020012.
  Mac-ketju scratchpad/mac-pallo.sh (setsid, odottaa kaannos-lupa-mac): mac-kaanna.sh molemmat → ditto lokit/linssiseppa2-mac-pallo/
  → ajot (Ateena, Kreeta, Pariisi) → loki lokit/linssiseppa2-mac-pallo.log ("KLIKKAUS OSUI"/"EI osunut"), kuvat samaan kansioon.
  Natiivisepän ohje: ~/Library/Application Support/Matkakirja/Matkakirja 3D/ komentotiedostot, EI hiiri-/näppäinautomaatiota.
  iOS: skenaario pallo-osuma.txt (tap-kohta 0.26 0.18 kaupunkipallo-<id>) iPhone+iPad. Tulos 1 rivi + still Päätoimittajalle.
- S2-KAUDET: linssiseppa2/s2-kaudet f6e4a8495 (masterin d8b0e0fc päällä; syksy/v1 ämpärissä 57 630/57 630): Laattapalvelin.
  S2EuroopanKausi, Vuodenaika.S2EuroopanVersio. Skenaario s2-kaudet.txt (m10 vs m7 pari). Junaan 162 kuvaparin jälkeen.
- Ajot kopioina lokit/linssiseppa2-3d-kattavuus/ajot/.

## TILA 7.10. 12.5x
- SWE-RAJAT (Karttaseppä 7.10., PT kuittasi): proto linssiseppa2/swe-rajat 95cf8eb97 (wt/proto-linssiseppa2-swe-rajat): Vektorikerros
  KorkeusVersio 2026-10-07-swe-korkeus / WebVersio 2026-10-07-swe, Maaraja Geojson/Maamaa 2026-10-07. 14.19 kaikki 200 (web-sarja
  vielä viennissä, vain vertailukomento) → junaan 161 Natiisepälle ilmoitettu. Todenna junan appilla: Krim ja Kypros pallolla.
- PALLO 161 TEHTY 13.2x: simu af5922b9 OK (oma maa, puoli; 13 kaupunkia oikealle), stillit lokit/linssiseppa2-kaupunkipallo-161-stillit/
  → Päätoimittaja. Löydös (toisen kaupungin kortti käänsi naapuripallon) korjattu aa32b618b → Natiivisepälle junaan 161
  e16d100db:n tilalle. Todenna aa32b618b junan 161 käännöksellä (esim. sevilla + tampere: vain oma pallo päättää).
- KAUPUNKIPALLOT juna 161: proto linssiseppa2/pallo-puoli e16d100db (wt/proto-linssiseppa2-pallo-puoli, masterin b00c06f7 päällä):
  (1) pallo kutsukortista poispäin (omistaja 12.4x Ateena; KaupunkiPalloMitat.Oikealle, peilaus, puoli kerran per kaupunki),
  (2) vain pelaajan nykyisen maan pallot kaikilla zoomeilla (omistaja 12.5x; NostoKerros.NykyinenMaa, UiSisalto.Kaupunki.Maa).
  Ketju scratchpad/ketju-puoli.sh: simu-lupa-p1 (toisto ennen 19ef80cc Ateena) → kaannos-lupa-p → simu-lupa-p2 (37 kaupunkia
  iPhone + Ateena/Pariisi iPad, skenaariot puoli-kaikki.txt / puoli-ipad.txt). Yhdistelmä yövalot-161 mahdollinen (Julkaisija).
  12.43 toistoajo ennen tehty (lokit/todistus-puoli-ennen-19ef80cc-*): iPhonella Ateenan kortti oikealla, pallo ei peitossa (vika ei
  toistunut iPhonella; omistajan näkymä todennäköisesti iPad), mutta Sofian (BGR) pallo näkyi Kreikassa → 12.5x-sääntö korjaa.
  Ketju lopetettu: pallo-puoli kääntyy Natiivisepän iOS-yhdistelmässä (074c95a3 + yövalot 47622521f + e16d100db, 12.47–).
  15.00 jälkeen: Natiiviseppä lähettää appin polun, Julkaisija simuvuoron → APP=… SHA=… perl setsid scratchpad/ajo-puoli-yhd.sh
  (kopio lokit/linssiseppa2-3d-kattavuus/ajot/), tulos lokit/linssiseppa2-puoli.log (AJO VALMIS).
  Tulos: lista kaupungeista, joissa puoli vaihtui (loki "kaupunkipallot: <id> oikealle"), + stillit Kreikka/Ranska → Päätoimittaja.

## TILA 7.10. 12.2x
- APURAHAKUVA LOPULLINEN: lokit/apuraha-kuvat/iss-cupola-biskaja-lopullinen-3936ab68.png (iPad 13" vaaka, ISS-jalka näkyy) → Päätoimittaja.
- Apurahakuvat v2 lähetetty: lokit/apuraha-kuvat/iss-cupola-{lansi-eurooppa,itameri-suomi}-ipad-vaaka.png (19ef80cc, LCD ajantasainen).
- PAIKANNIMET: proto linssiseppa2/paikannimet 4ad028d78 (worktree wt/proto-linssiseppa2-paikannimet): Resources/IssPaikat/nimet-fi.json
  (337 Euroopan paikkaa, Wikidata fi + SFS 4900), IssSijaintiLataaja lukee (vain LCD), IssNimetTestit. Muutoslista
  lokit/linssiseppa2-paikannimet/muutoslista.md. + 59d44e87b kiistanalaiset maat (Krim UKR, P-Kypros CYP, Kosovo). KUITATTU junaan 160/161, SHA Natiivisepälle.
- Kaupunkipallo junassa 159 (VIE OK). Worktree wt/proto-linssiseppa2-kaupunkipallo poistetaan, kun 159 on masterissa.

## TILA 7.10. 10.5x
- VIE 159 kaupunkipallo OK (19ef80cc iPhone: oikea napautus → kaupunkitila Rooma, kortti ei peitä). PUUTE torjuntalaatikko < 4 s
  (LS1/NUI), raportoitu Päätoimittajalle, Julkaisijalle ja Natiivisepälle. Stillit lokit/linssiseppa2-kaupunkipallo-159-stillit/.
- Apurahakuva valmis: lokit/apuraha-kuvat/iss-cupola-mustameri-ipad-vaaka-{1,2}.png (iPad vaaka, Mustameri). Länsi-Eurooppa tarvittaessa.
- AVOIN (Päätoimittaja 10.49): (1) LCD:n SIJAINTI-nimet vanhentuneita (Illichivsk → Tšornomorsk, Dnipropetrovsk → Dnipro,
  Kirovohrad → Kropyvnytskyi): lähde Resources/IssPaikat/paikat.json (NE 5.1.2). Korjaus omana eränä Wikidatasta (fi-nimike /
  nykyinen nimi suomal. translitteroinnilla), muutoslista Päätoimittajalle, EI junaan ilman kuittausta. (2) Uusi apurahakuva,
  2 vaihtoehtoa: Länsi-Eurooppa ja Itämeri/Suomi päivällä, iPad vaaka, täysi res., ei kehittäjäpeitteitä, LCD:ssä ajantasainen nimi.
- Ei keskeneräisiä ajoja. Worktree wt/proto-linssiseppa2-kaupunkipallo (a04d12f7c, junassa 159) → poista, kun 159 on mainissa.
- Ajoskriptit scratchpadissa (b02a8297): ajo-kp159.sh, kaupunkipallo.txt, apuraha-cupola.txt; kattavuus3d/ (mittaa.py, sallitut.py)
  kopioina lokit/linssiseppa2-3d-kattavuus/.

## TILA 7.10. 09.3x
- KAUPUNKIPALLO juna 159: runko fc44bc51 sis. 44090c1a + 9718c4bd + 7f3dbefd7 (koko 84–120 pt, näkyy ≤ 2 600 km). Stillit 159koe 81409e09
  (iPhone + iPad): lokit/linssiseppa2-kaupunkipallo-159-stillit/ → Päätoimittajan kuittaus odottaa. iPad: oikea napautus → kaupunkitila OK.
  LÖYDÖS iPhone: pelaajan kaupungin kutsukortti peittää pallon → korjaus a04d12f7c (peilattu kallistus vasemmalle), ehdotettu junaan 159.
- Giza sallituissa (sallitut.py LISAA, omistajan poikkeus; Pöllö näyttää vain kokeiluotsakkeella). Sallitut 38 (37 + Giza).
- LS1 kysyi Cupolan liikkeen mallia korinäkymään → IssKyytiNakyma.Ajelehdi + ErikoisnostoMitat.Heilahda.
- Appikopiot poistettu (7ec948289); omia appeja lokit/:ssa ei ole.

## TILA 7.10. 09.xx
- KAUPUNKIOPAS KARTTAELEMENTTINÄ (Päätoimittaja/omistaja 08.3x): proto linssiseppa2/kaupunkipallo 44090c1a4 (LS1:n kaupunkitila-159
  1be5518db päällä), worktree wt/proto-linssiseppa2-kaupunkipallo. UI/KaupunkiPallot.cs (Erikoisnostot-malli), UI/KaupunkiPalloKuva.cs
  (Linnanrakentajan ilmapallo-v1 keski Resources/KaupunkiPallo, RT kerran), Kartta/KaupunkiPalloMitat.cs (+testit), ui kaupunkipallot.
  Näkyy ≤ 1 500 km, koko 52→76 pt; napautus OpasSovitin.AvaaKaupunkitila(id). Tarkistus 0, Kartta-testit 447/447.
  Ketju scratchpad(b02a8297)/ketju-kp.sh: touch kaannos-lupa-kp (KÄÄNNÖS NYT) → simu-lupa-kp (SIMU NYT) → todistusajo kaupunkipallo.txt.
  Pelikuvat Päätoimittajalle ennen junaa. Avoin: näkyykö vain kehittäjätilassa (nyt kaikille, ui kaupunkipallot 0|1).
- Vanhat worktreet meri ja pilvet poistettu (haarat masterissa).

## TILA 7.10. 03.2x
- Sallitut 38 (Varsova pakotettu SALLITTU; Sisilia/Kreeta/Islanti mitattu Palermo/Heraklion/Reykjavík P625) → Pelikoodarin PR #4098.
  sallitut.py:ssä PAKOTA-taulu; tulokset lokit/linssiseppa2-3d-kattavuus/ (sallitut-3d.json, renkaat-tulokset.json).
- RAJA-stillit: Päätoimittaja 03.3x: Kiova, Sarajevo, Tromssa POIS (PAKOTA); sallitut 38 (#4098), raja-lista tyhjä. 07.1x Varsova POIS (Googlen 404-reiät yleiskuvassa, LS1 k158) → 37; palaa LS1:n etäisyyskorjauksella.
  (vanha: Tromssa tarkka
  ~0,5 km (ehdotettu SALLITTU r 500 m tai POIS) – odottaa Päätoimittajan päätöstä; jos SALLITTU, lisää PAKOTA + rivi Pelikoodarille.
- KAUDET (Karttaseppä 7.10. 04.xx): Euroopan S2 kausikerrokset s2-eurooppa/<syksy|talvi|kevat>/v1 (sama jako kuin v2, laatat.json + kausi).
  Syksy viennissä Julkaisijalla; talvi/kevät 7.10. päivällä. LS2 tekee natiivin kausivalinnan, kun syksy on ämpärissä:
  Laattapalvelin.cs:401 (S2Polku + "/" + versio) ja AstronauttiKerros.S2Juuri → kauden versio (Vuodenaika.Kausi), puuttuva kausi
  → kesä v2 (talvi nyt BMNG, Vuodenaika.S2Nakyy). Myös KuvanTyosto/IssKameraKuva käyttävät S2Juurta.
- Pallopisteiden siirto (Sisilia, Kreeta, Islanti) kuuluu Karttasepälle/Päätoimittajalle; Venetsia jo San Marcolla pelissä.

## TILA 7.10. 03.1x
- 3D-stillit valmiit: lokit/linssiseppa2-3d-kattavuus/stillit-11d043c75/3d-luokat-helsinki-varsova-tallinna.jpg → Päätoimittaja.
  Tallinna litteä (karkea), Varsovan keskusta näyttää kunnolliselta 3D:ltä → ehdotettu SALLITTU (päätös Päätoimittaja/omistaja).
- Odottaa: Sisilian uusintamittaus Pelikoodarin pistekorjauksen jälkeen (renkaat kuten sallitut.py; lisää tulos sallitut-3d.json:iin).
- Simut F2D9B022/4CE6C737 erase tehty (levy), appikopiot poistettu.

## TILA 7.10. 01.2x
- Helsinki-olkapääpari VALMIS ja lähetetty Päätoimittajalle: lokit/linssiseppa2-helsinki-olkapaa-11d043c75/ (pari + pilvet 1:1),
  kello kiinteä 21.6. 17.00.00 UTC molemmissa. Ero hienovarainen (pilvissä enemmän sävyä).
- SALLITUT 3D-KAUPUNGIT (omistaja 7.10. 00.4x): proto-3d/lokit/linssiseppa2-3d-kattavuus/sallitut-3d.json (36 sallittua, 5 rajaa,
  10 pois; r_m 2–20 km), lähetetty LS1:lle (natiivi OpasSallitut, sallitut-157 824af089, katselmoitu) ja Pelikoodarille (Pöllö).
  Uudelleenlaskenta: sallitut.py <kansio> renkaat-tulokset.json. Venetsia mitattu San Marcosta (pelin piste 10 km idässä).
- 3D-stillit (RAJA-kaupungit + Helsinki + Tallinna) odottavat Julkaisijan SIMU NYT (~01.40): touch scratchpad(b02a8297)/simu-lupa-3d,
  ketju-3d.sh → tyokalut/linssiseppa-ajot/ajo-3d-stillit.sh (opas kamera kiinteä), kuvat lokit/linssiseppa2-3d-kattavuus/stillit-11d043c75.

## TILA 7.10. 00.3x
- Helsinki-olkapääpari: ajo147 korjattu kiinteäksi kelloksi (kohdehetki kerran per paikka) → pysyvä proto-3d/tyokalut/linssiseppa-ajot/ajo-iss-kamera.sh.
  155b-appi oli poistunut → ketju scratchpad(b02a8297)/ketju-hp.sh (perl setsid) kääntää gibs-pehmean ja ottaa parin o0/o1
  (KELLO_helsinki 2026-06-21T17:00, suunta 170, 2017 px). Luvat: touch kaannos-lupa-hp (KÄÄNNÖS NYT ~00.28) ja simu-lupa-hp (SIMU NYT ~01.30).
  Loki lokit/linssiseppa2-kaannos-hp.log (LUKKO VAPAA / AJO VALMIS), kuvat lokit/linssiseppa2-helsinki-olkapaa-<SHA>.
- 3D-KATTAVUUS (Päätoimittaja 00.2x, LS1:ltä): työkalu scratchpad(b02a8297)/kattavuus3d/mittaa.py (Cesium ion → Google 3D Tiles,
  lehtilaatan Draco-verkko). Mittari = kolmioiden mediaanireuna 25 m säteellä: tarkka ≤ 2 m, karkea > 4 m. Pilotti 10 lähetetty.
  Ajo 95 kohdetta (kaikki.json → kaikki/). Seuraavaksi taulukko + kohdistuslista + 1 simustill per luokka.

## TILA 6.10. 23.3x
- KUITATTU junaan 155: gibs-pehmea 640eb7b4 (merisumun pinnanmuoto 5adaf326 + valotuksen olkapää 8f2db691 + A/B 640eb7b4), worktree wt/proto-linssiseppa2-pilvet.
  - Saman näkymän pari kiinteällä kellolla tarvitaan vasta omistajan Helsinki-julisteeseen (ajo147 laskee kellon kuvakohtaisesti: korjaa ensin).
- POIS: opas-vapaa-lataus 5683ffaf (vauhtirajaus ei poista sumeutta). Sumeus kirjataan suoratoiston normaaliksi viiveeksi: +5 s:ssa tarkentuu. Haara jää, worktree poistettu.
- KUITATTU junaan 154: s2-meri 0f6e4e89 (worktree wt/proto-linssiseppa2-meri).
- Tulokset: lokit/linssiseppa2-155b-3ac7ce47 ja todistus-tarkentuminen155-3ac7ce47-20261006-2324.

## TILA 6.10. 22.4x
- Juna 155, merisumu: juurisyy on Valota (×1,35), joka leikkasi pilvet 255:een.
  - gibs-pehmea 8f2db691 lisää pehmeän olkapään (polvi 160), 640eb7b4 A/B-komennon `astro kyyti kuvaa olkapaa 0|1`.
  - Päätoimittaja hyväksyy, jos pilvikansi saa muotoa eivätkä lumi ja jää harmaannu.
- Juna 155, 14d/14e: vauhtirajaus toimii, mutta sumeus jää. Päätoimittaja: +5 s still. Jos kuva tarkentuu, alarajaa ei tehdä.
- Ketju scratchpad/ketju-155b.sh odottaa lupia:
  - Julkaisijan KÄÄNNÖS NYT → `touch scratchpad/kaannos-lupa-155b`, ilmoita "lukko vapaa" (rivi LUKKO VAPAA lokissa).
  - SIMU NYT → `touch scratchpad/simu-lupa-155b`.
  - Loki: lokit/linssiseppa2-kaannos-155b.log. Ajat: noin 23.55 Mac v1:n jälkeen.
  - Tulokset Päätoimittajalle: olkapää-parit (o0-/o1-kuvat) ja 14d/14e-5s.

## TILA 6.10. 21.5x
- Juna 153 on testaajilla. Päätoimittaja kuittasi Eiffel 14b/14c/14f (7920e6a0). Meri s2-meri 0f6e4e89 on KUITATTU junaan 154.
- Junaan 155 menevät:
  - gibs-pehmea 5adaf326: merisumu vahvempana. Simussa 19814f64 nosti hajonnan vain 1,9 → 2,2, esikatselussa 5adaf326 2,9 → 8,3.
  - opas-vapaa-lataus 5683ffaf.
  Yhteinen käännös on pyydetty Julkaisijalta. Ajoskripti on scratchpad/aja-155.sh <app> <sha> (lupa simu-lupa-155): Helsinki-juliste + skenaario 14 iPadilla.
  Tulokset Päätoimittajalle: Helsinki-pari (vertailu linssiseppa2-merisumu-153/jalkeen) ja 14d/14e.
- Tulokset: lokit/linssiseppa2-meri-ab, todistus-eiffel153-daf949ed-20261006-2144, linssiseppa2-merisumu-153.

## TILA 6.10. 21.0x
- Simuajot hiljaisessa vuorossa noin 21.15 (scratchpad, ketju odottaa lupaa):
  1. aja-153s.sh: Helsinki ennen/jälkeen. Lupa: `touch scratchpad/simu-lupa-153s`.
  2. aja-eiffel153.sh: iPad 4CE6C737, app junan 153 koe a9cae09c (eiffel-app.txt), skenaario 14. Todennetaan 14c/14f.
  3. aja-meri.sh: meri 0/1 Kanada, Davis ja Bretagne, app 099db12b.
  Tulokset Päätoimittajalle: merisumupari, Eiffel 14c/14f ja meripari.
- Vapaa tila:
  - opas-vapaa-2 ee22b18d (120/180 m, nousu 0,5) on opas-153:ssa (LS1 d4827b33).
  - Juna 154: linssiseppa2/opas-vapaa-lataus 5683ffaf, matalan lennon vauhti latausasteen mukaan, tasaus 0,5 s. Tarvitsee käännöksen ja ennen/jälkeen-parin (14d/14e). Kova alaraja enintään 60 m vain, jos rajaus ei riitä.
- Meriläntit: linssiseppa2/s2-meri 0f6e4e89 (worktree wt/proto-linssiseppa2-meri), BMNG:n meri S2:n väriin varjostimessa.
  - Käännetty 099db12b, shader-virheitä 0.
  - Karttasepän korjaus5 jää viemättä (Päätoimittaja).
- Merisumu (153): gibs-pehmea 19814f64 on junan 153 kokeessa.

## TILA 6.10. 19.1x
- 152: S2-jatko 1354ef53 ja juliste b7a32d4a + 81cedf76 on KUITATTU (koe 7e91ce76, kuvat lokit/linssiseppa2-koe152c).
- Vapaa tila 6fac9fe2 on mika-152:ssa.
  - Käännetty: a6b61595, app lokit/linssiseppa2-app-vapaa2-a6b61595. Eiffel-toisto on pyydetty Pelikoodarilta.
  - Skenaario 14 on haarassa (worktree wt/proto-linssiseppa2-vapaa2).
- Merisumu (153, Päätoimittajan pyyntö): haara linssiseppa2/gibs-pehmea 19814f64 (worktree wt/proto-linssiseppa2-pilvet).
  - Muutokset: pilvikannen kirkkausvenytys, pinnanmuoto auringon suuntaan ja kolmen kehän sulkareuna.
  - Esikatselu: scratchpad/sumu (GIBS_TASO=8, ESI_Z=8).
  - Seuraavaksi: käännös ja Helsinki-juliste ennen/jälkeen F2D9B022:lla (aja-152c.sh:n juliste-osa, LEVEYS=1920) Päätoimittajalle.

## TILA 6.10. 18.4x
- Juliste 4bac4faa ja lasizoom e0b5f049 on kuitattu junaan 152. Juliste meni omistajalle, ja hänen OK:llaan se lähtee 152:ssa.
- Vapaa tila, Eiffel: haara linssiseppa2/opas-vapaa-2 2be5ec83 (worktree wt/proto-linssiseppa2-vapaa2, mika-152 d3d7104e:n
  päällä).
  - Syvyysluotain: OpasLahiluotain + Varjostimet/OpasSyvyys.
  - Lähin este < 40 m → nousu, vaakavauhti enintään (este − 20) m/s, ja näytteiden ollessa kesken ei laskeuduta.
  - Testit 744 ja unity-tarkistus 0. Merge-pyyntö on LS1:llä.
  - Käännös odottaa T7-siirron levyvapautusta (Päätoimittaja). Sen jälkeen pyydetään käännös ja Pelikoodarin Eiffel-toisto
    (skenaario 14). Todennäköisesti juna 153.
- S2-pari, juliste ja ISS-still ajetaan koeappista 7e91ce76: scratchpad/aja-152c.sh, ulostulo lokit/linssiseppa2-koe152c/{s2,juliste}.
  - Ajo odottaa lupaa: `touch scratchpad/simu-lupa-152c` vasta Julkaisijan SIMU NYT -viestin jälkeen.
  - Sen jälkeen tehdään montaasi b151 (lokit/linssiseppa2-koe152/b151) vs. koe152c Päätoimittajalle ja ilmoitetaan "simu vapaa".
- Pallolukko pysyy ulkona: Pelikoodari ei saanut vikaa toistumaan, joten se odottaa omistajan toistoa.

## ISS-ohjaamo, proto-haara linssiseppa2/iss-ohjaamo (worktree /Users/Shared/Claude/wt/proto-linssiseppa2-ohjaamo)
Ohjaamo siirtyy junaan 143 (Päätoimittaja 02.36). Sen ehtona on, että kuusi maailmakuvaa hyväksytään.
Kuvat lähtevät Päätoimittajalle vasta, kun olen tyytyväinen niihin: ei sumeutta, kiiloja eikä saumoja. Mukana Meksiko täysikokoisena.
- LCD (9f2af091) ja cupola cold open (06ce558b, BUILD 139) ovat valmiit. Natiivi-UI:lla on 9f2af091. Kun kuvat on hyväksytty,
  pyydä Natiivi-UI:ta mergeämään iss-ohjaamon kärki.
- Commitit 5.10.:
  - d87b90a6: S2-limitys ristihäivytetään 9,8 km:n leveydeltä, varakuva vain aukkoon.
  - 2d53f9f5: indeksin versio on vakio S2Maailma.Versio, ja välimuisti on versioitu.
  - ad726e1f: usvatasoitus mitataan limitysparien saman maan mediaanierotuksena. Vanha tummin 1 % luki meren usvattomaksi
    (Meksikon kaista −40).
  - 69e49d69: **v2-juuri** (Karttaseppä: luvallinen, 6/6 indeksiä ämpärissä). Kierros 2 hakee datattomille lehdille
    toisen radan täytekuvan ("toinen_rata", valinta 3).
- Testit: Linssit 647+ läpi, unity-tarkistus 0.

## Avoinna
1. **Käännä 69e49d69** (Julkaisijalta vuoro) ja aja kuusi kuvaa F2D9B022:lla: lokit/linssiseppa2-skriptit-20261001/maailma-kuvat.sh
   (APP=, OUT=, LUPA=, PAIKAT=). Päätoimittajan toiveesta paikat ovat: amazonia -3.1 -60.0, **amazonia-20mrc -2.26 -59.85**,
   sahara 25.0 9.0, australia -25.3 131.0, pohjois-amerikka 36.1 -112.1, meksiko 31.8 -114.8, venetsia 45.44 12.33 ja
   **kanaria-28sca 32.08 -16.59**. Täytekiilan sauma tarkistetaan 20MRC:stä (tummempi) ja 28SCA:sta (vaaleampi). Jos sauma
   näkyy, seuraava erä on Karttasepän kiilan sävytasaus indeksiin. Huom.: usvatasoitus ad726e1f vertaa myös täytekuvaa
   limitykseen, joten se voi tasata kiilan jo itse.
2. **Meksikon suiston vaalea suorakulmio** (ecf0883f, lokit/linssiseppa2-maailma-ecf0883f/kuvat/20261005-024336.jpg) näkyy yhä.
   Todennäköinen syy on, että SCL merkitsee kirkkaat suola- ja vuorovesitasangot pilveksi. Silloin pilvisen lehden varakuva
   (valinta 1, eri päivä) näkyy lehden muotoisena suorakulmiona. Offline-toisto:
   `INDEKSI_JSON=<ix-amerikka.json> TASOT_PPM=mx.ppm TASOT_KULMA="31.258 -117.525 424 31.858 -114.447 122" TASO=11
   PILVIMASKI=1 USVA=1 ./kaanna.sh KaikkiTasot` (Linssit-testit; hidas, hakee koko resoluution curlilla). Korjausehdotus: pilveksi
   merkitty pikseli vaihdetaan varakuvaan vain, jos varakuva on selvästi tummempi (oikea pilvi). Kirkas pinta, joka on molemmissa
   kirkas, pidetään ensisijaisena.
3. Saharan ohut suora katkoviiva vasemmassa alakulmassa: todennäköisesti 1 px:n nodata-rako ruudun 32RNN radan reunassa (nodata 3 %).
4. Pilvien "popcorn"-ilme on omistajan 1.10. linjaus, ei muuteta. Meksikon aavikon vaaleus on dataa.

## Muut
- Poistettu wt/linssiseppa2-web-main (Päätoimittaja, levy). HEAD on mainissa squashina 5441e20e8.
- Scratchpadin *-app-kopiot siivotaan käännösten jälkeen (~440 Mt kpl).

## Päivitys 5.10. klo 06.4x: v2-ajo 10c31692 (kahdeksan kuvaa, laattavedos)
Kuvat: /Users/Shared/Claude/proto-3d/lokit/linssiseppa2-maailma-10c31692/kuvat. Vedos: …/laatat/laatat-<id>/<taso>/<x>/<y>.png.
- **Amazonian kiila on poistunut** toisen radan täytteellä (20261005-033346.jpg). Venetsia, Australia ja Pohjois-Amerikka ovat hyviä.
- 20MRC (033507): täytteen raja näkyy lievänä pystysaumana, ja täyte on hieman samea. Karttaseppä tekee kiilan sävytasauksen.
- Kanaria 28SCA (034056): avomerellä on selvät suorat heijastussaumat, eri ottopäivien auringon heijastus. Ei vielä kunnossa.
- Meksikon suiston suorakulmio (033930) näkyy myös laatoissa (taso 4: x 9, y 16). Syy on 11SPR:n (2024-08-27) ja 11SQR:n
  (2023-07-01) eri ottopäivä, koska vuorovesitasangon kirkkaus vaihtelee. Usvasiirto ei korjaa tätä. Pyyntö Karttasepälle:
  naapuriruuduille sama datatake aina kun mahdollista. Offline-toisto v1-indeksillä ei näyttänyt tätä (eri lehtijako ja tarkkuus).
- Viestit Päätoimittajalle ja Karttasepälle 06.4x. Kuvia EI ole lähetetty: Kanaria ja Meksiko eivät ole vielä kunnossa.
- Seuraavaksi, kun Karttasepän indeksi päivittyy: sama kahdeksan kuvan ajo (vaihda vain APP ja OUT), sitten tarkistus ja lähetys.
- 06.4x: **v2b-tuki valmis** (iss-ohjaamo d227d4c9): valinta.savy {vahvistus, siirto} → TCI · vahvistus + siirto ennen usvaa ja lutia.
  Juuri on yhä "v2". Karttasepän v2b valmistuu noin klo 8 polkuun s2-indeksi/v2b/. Vaihda S2Maailma.Versio = "v2b" VASTA
  Päätoimittajan kuittauksen jälkeen, käännä ja aja kahdeksan kuvaa. Saman datataken indeksi (v2c, 3–4 h) odottaa
  Päätoimittajan etusijapäätöstä.

## Päivitys 5.10. klo 09.5x (uusi Päätoimittaja local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31)
- **78f1a7ed** radan reunan syövytys 2 px: Saharan tumma pisteviiva on COG-yleiskuvatasojen (40/80 m) keskiarvoistama reunapikseli
  (COG häviötön Deflate, ei JPEG). Kehä tarkistetaan vain nodatalaattojen lähellä (NodataLaatat-lippu).
- **231c3c21** vesitaso ruuduittain (TasaaVesi): Kanarian meri on kaikkialla SCL 6, mutta sunglint-päivät (28SBA 2025-06-13,
  28SCB 2023-06-27) ovat 40–50 kirkkaampia; ruudun oman meren mediaani → merenväri, vain poikkeama jää 25 %:lla. Linssit 649/649.
- Avoin: radan reunan ristihäivytyksen askel (datapuolen paino hyppää ~0,56:sta 0:aan, eri päivät 7–26 % eri kirkkaus). Katso
  kuvista ennen korjausta (vaatisi etäisyyskentän nodataan).
- Jonossa: käännös 231c3c21 Siirtosepän jälkeen (~11.45), simu F2D9B022 ~12.20 (Julkaisija). Karttasepän v2b julkaisu ~11–12.
  Jos v2b on ämpärissä simuvuoroon mennessä: toinen ajo MAAILMA=<v2b maailma.json> VERSIO=v2 (maailma-kuvat.sh kopioi nyt
  versioidulle nimelle), jolloin v2b:n voi todentaa ilman versiovakion vaihtoa.

## Päivitys 5.10. klo 13.0x — ohjaamo junaan 144 (VIE-ikkuna klo 20)
- Proto linssiseppa2/iss-ohjaamo: c598aecf v2b-vakio · 43c7e0f2+8b780990 meri mosaiikin vakioon (48,64,85; Karttasepän
  euromosaiikki-v2.mjs MERI) → Kanarian sauma 31,95° N poissa · a693e5e1 vesitaso myös kulmasta haetulle ruudulle (28SCB-kiila).
- Päätoimittaja HYVÄKSYI 8b780990: Sahara, Amazonia, 20MRC (parit lokit/linssiseppa2-kuvaparit-20261005/).
- Avoinna: Kanarian pari a693e5e1:n ajosta (käännös junan 143 jälkeen, simu ~13.15; skripti scratchpad/aja-a693.sh,
  LUPA-tiedosto simu-lupa), Meksikon pari kun Karttasepän v2c valmis (13–15; vaihda Versio "v2c" vasta kuittauksella).
  Sitten Natiivi-UI:lle iss-ohjaamon kärjen merge-pyyntö junaan 144.

## Päivitys 5.10. klo 15.4x
- Proto iss-ohjaamo-kärki 962ff4ee: d9bc4a58 vesitaso tasona (sunglint-liuku) · 962ff4ee pilvikuori pois ISS-kuvan
  renderöinnistä (Päätoimittaja hyväksyi). Kanaria HYVÄKSYTTY (pari kanaria-10c31692-8b780990.png). Sahara/Amazonia/20MRC hyväksytty.
- Käännökset tehdään yhdistelmänä `linssiseppa2/iss-ohjaamo+pelikoodari/testimykistys-natiivi`, kunnes mykistys on masterissa;
  maailma-kuvat.sh asettaa `aani mykistys 1` ja kirjaa tilan.
- Avoinna: Meksiko odottaa v2c:tä (vahti; vaihda Versio "v2c" vasta kuittauksella → käännös → kuvapari). Sitten Natiivi-UI:lle
  iss-ohjaamon merge-pyyntö junaan 144 (VIE 20). Euromosaiikin saarisädekehät: Karttasepän korjaussarja uuteen polkuun →
  vaihda AstronauttiKerros.S2Juuri.
- SEURAAVA ERÄ (Päätoimittaja hyväksyi): GIBS 250 m -pilvimaski ISS-kuvaan (VIIRS paikkaa MODIS-raot, pinta S2, attribuutio
  "NASA EOSDIS GIBS"), kuvapari pilvinen/pilvetön + Cupola samaan aikaan; tavoite juna 145.

## Päivitys 5.10. klo 16.5x — GIBS-pilvet
- OMISTAJAN PÄÄTÖS 15.5x: "aina selkein 7 päivästä" (ISS-kuva; Cupola ennallaan).
- Proto-haara linssiseppa2/gibs-pilvet (worktree wt/proto-linssiseppa2-gibs, iss-ohjaamon 962ff4ee:n päällä): c2927bd8 + 5b1a018a.
  GibsPilvet.cs (maski, selkein päivä, pysyvä valkoinen pois, varjo, terävä reuna), KuvanTyosto.PiirraPilvet (kuvauspaikat),
  IssKameraKuva.HaeGibs, A/B `astro kyyti kuvaa gibs 0|1`, offline-esikatselu GIBS_PPM (Linssit-testit). Testit 656/656.
- Kuvaparit Päätoimittajalle 16.5x: lokit/linssiseppa2-kuvaparit-20261005/gibs-{helsinki,amazonia}-7032ae79.png. EI mergeä ennen
  ohjaamon junaa 144; sitten gibs-pilvet rebase/merge iss-ohjaamon junaversion päälle → juna 145.
- Esiselvitys: lokit/linssiseppa2-gibs-esiselvitys-20261005/YHTEENVETO.md. Ajoskripti scratchpad/aja-gibs2.sh (KAARI2="kuvaa gibs 0").

## Päivitys 5.10. klo 18.1x — OHJAAMO JUNAAN 144 (omistaja: lähtee joka tapauksessa)
- Merge-pyyntö Natiivisepälle 18.0x: linssiseppa2/iss-ohjaamo **a2941f8f** (lopullinen): v2d, avomeri tasainen (f6d3a436),
  paikat.json maanosa (87863aae, Natiivi-UI:n elävä opas). Testit Linssit 651, Kartta 442, Peli 388, unity 0. Simu e3c7217b OK.
- Avoinna indeksinä (ei koodia): Meksikon 11SPR radan reuna (pyydetty Karttasepältä v2e = koko suiston kattava päivä; vaihda
  vain S2Maailma.Versio). Euromosaiikin saarisädekehät → Karttasepän korjaussarja (polku tulossa).
- JUNA 145 järjestys (Päätoimittaja): (a) GIBS-pilvet (valmis, haara linssiseppa2/gibs-pilvet 5b1a018a; rebase ohjaamon päälle),
  (b) s2-maailma/v2 natiiviin: Cupola + ISS-kuvan kaukoalue koko maailmaan (laatat.json: yksi puu {z}/{x}/{y}.jpg z6–z10,
  saatavuus-bittikartta; korjaus.json tulossa) — kuvapari 3 aluetta Euroopan ulkopuolelta nyt vs v2 ennen merge-pyyntöä,
  (c) euromosaiikin korjaussarjan polku.
- Worktreet wt/proto-linssiseppa2-ohjaamo ja -gibs poistetaan mergen jälkeen (git worktree remove, proto-gitissä).

## Päivitys 5.10. klo 19.5x
- JUNA 144: iss-ohjaamon kärki **eea832b1** (a2941f8f + v2e) Natiivisepällä; Meksiko v2e todennettu (meksiko-v2d-v2e.png).
- JUNA 145 (proto-haarat, worktree wt/proto-linssiseppa2-gibs, nyt haarassa linssiseppa2/s2-maailma):
  - (a) linssiseppa2/gibs-pilvet **30e870d9** (GIBS + ohjaamo) — Päätoimittaja hyväksyi.
  - (b+c) linssiseppa2/s2-maailma **032129c8** (= gibs + s2-maailma v2 + korjaussarja (korjaus.json "korjatut", vakio
    S2MaailmaLaatat.KorjausKansio) + Euroopan mosaiikki v2 (vakio Laattapalvelin.S2EuroopanVersio)). Natiiviseppä kuittasi
    lisäysversion ehdoin: vanhat buildit ennallaan, mittaus (phys_footprint Cupola/ISS-kuva Euroopan ulkopuolella nyt vs v2,
    S2-välimuisti levyllä 10 min kyydin jälkeen ≤ 384/192, verkon Mt), purku taustalla (< 16 ms), hakuvirhe = nykyinen.
  - Koeajo 1 (b4f9eba3): ISS-kuvat OK (Australian suolajärvi valkoinen), Saharassa MGRS-saumat (Karttasepän tasaus →
    v2-korjaus2), Cupola v2 sumea → koeajo 2 käännöksellä 11bae6ef (CUPOLA_ODOTUS=25, muisti fp) simuvuorolla ~20.35.
  - Kuvapari Päätoimittajalle ennen merge-pyyntöä: 3 aluetta Euroopan ulkopuolelta nyt vs v2.
- maailma-kuvat.sh: KAARI2 toinen kierros (A/B), CUPOLA_ODOTUS, muisti (footprint, PID ps:stä), S2-välimuisti lopussa.
  HUOM: ajo.log sisältää binäärimerkkejä → grep -a (vahdit jäivät jumiin ilman sitä).

## 23.0x: lokit arkistoitu
proto-3d/lokit/linssiseppa2-* (skriptit, kuvaparit, gibs-esiselvitys, maailma-ajot) on siirretty arkistoon
/Volumes/T7 4TB/proto-3d-lokit-arkisto/ (sama nimi). maailma-kuvat.sh ajetaan sieltä; tulosteet (OUT) edelleen lokit/-kansioon.
S2-maailman koeajo 2 (käännös 11bae6ef, aja-s2m2.sh → lokit/linssiseppa2-s2maailma-koe3) odottaa yhä simuvuoroa (siirtyi junan 144 takia).
TYÖTAPA (Päätoimittaja 23.1x): vika toistetaan ennen korjausta, sitten sama ajo korjattuna (ennen/jälkeen-parit).

## 6.10. klo 00.0x — ohjaamon pallon kosketus (omistajan palaute, juna 146)
- Haara linssiseppa2/ohjaamo-kosketus **2c2ad7ac** (cad8ede1 + PalloKierto.EleetMuualla, CupolaVeto asettaa/nollaa,
  A/B `astro kyyti pallolukko 0|1`). Merge-pyyntö Natiivisepälle junan 146 ensimmäiseen käännökseen (Julkaisija: ei omaa
  käännöstä). Todennus junan appilla: scratchpad/kosketus-ajo.sh (APP=, OUT=, LUPA=) → `valmis`-tiedosto → oikeat eleet
  simulaattorityökalulla videolle pallolukko 0 ja 1 → `touch $OUT/loppu`. Kuittaus Päätoimittajalle ennen 9.30.
- S2-maailman koeajo (11bae6ef, aja-s2m2.sh) tulee sen jälkeen. GIBS f810ec54 junaan 145/146 Päätoimittajan kuittauksella.

## 6.10. klo 01.2x — tila (viestit muille sessioille tauolla, 10 viestin raja; jatkuu omistajan seuraavasta viestistä)
- Pallolukko 2c2ad7ac: toisto oikeilla eleillä EI tehty – simulaattoripaneelin lupa (F2D9B022, "Let Claude use it") odottaa
  omistajaa. Ajoskripti scratchpad/kosketus-ajo.sh (APP lokit/natiiviseppa-app-146toisto2-7ac47be9). Kuittaus Päätoimittajalle ennen 9.30.
- Juliste (juna 147), proto-haara linssiseppa2/iss-kamera-juliste: 172915f6 siluetti → 7ee03d6a Päätoimittajan palaute
  (sommittelu kaari 22 %, GIBS lähialue tarkempi saman selkeimmän päivän mukaan, paikan oma aika paikat.json TIMEZONE)
  → d977f81d (kuvaa suunta -testikomento, siluetti kaaren kohdalle; EI käännetty). Stillit 2504ef45:
  lokit/linssiseppa2-juliste-2504ef45/kuvat/20261005-220332.jpg (Helsinki: sommittelu ok, mutta Suomenlahti kiiltää
  valkoisena – kamera luoteesta kohti aurinkoa; seuraavaksi kuvaa suunta 170) ja 220534.jpg (Manaus ok, klo 10.30 paikallista).
  Siluetti katosi mustaa avaruutta vasten → d977f81d. Ei vielä Päätoimittajalle.
- S2-maailma v2 koeajo 11bae6ef tehty 01.11–01.18: lokit/linssiseppa2-s2maailma-koe3/kuvapari-cupola.png (v2 vs nyt, 0/25 s).
  v2 selvästi tarkempi ja luonnollisempi; näkyviä laattojen sävysaumoja (Amazonia vino raja, Australia suorakaiteet) →
  korjaussarja. ISS-kuvat v2:lla 0 Mt haettua (mosaiikki) vs 21–30 Mt nyt. phys_footprint Cupola 1015–1488 Mt (v2) vs 1292–1515 (nyt).
- Natiivi-UI kysyi (vastaamatta): nopein onnistuva kuva = astro kyyti; kello +X (päivä); siirra 60.17 24.94; kuvaa 4:5 1080.
  UI on piilossa vain renderöintivaiheessa (kamera.targetTexture = rt, Edistyminen 0,85→1); KEHITETÄÄN-palkki näkyy haku- ja
  työstövaiheissa (0→0,85). Ehdotus: näyttökamera renderöinnin ajaksi, tai kehittyvä kuva (RT) UI:hin.
- Natiivi-UI 2. kysymys (vastaamatta, viestit tauolla): meren yllä ei kuvaa tarkoituksella. Lopputila on IssKameraKuva.Tila, kun
  Kaynnissa → false: "valmis" | "ei maata" (näkymässä < 3 % maata) | "ei kuvauspaikkaa" (S2-indeksin ulkopuolella) |
  "keskeytyi" (muu virhe) | "osta" (kuvat loppu, heti Laukaise-kutsussa). LCD-ehdotus 2 s: EI MAATA KUVASSA / EI KUVA-AINEISTOA /
  KUVAUS KESKEYTYI. Nopea onnistuva kuva simussa: astro kyyti; astro kyyti kello +<h> (paikallinen päivä); astro kyyti siirra 60.17 24.94;
  astro kyyti kuvaa 4:5 1080.
- Pelikoodari (todistusajon skenaario 12, pallolukko) – vastaus valmiina, lähettämättä:
  1) Yhden sormen veto pallon päällä riittää (PalloKierto: veto liikuttaa karttakameraa ja PelaajanEle lopettaa seurannan);
     nipistys zoomaa samoin, mutta ei ole välttämätön. iPhone 402×874 pt: (150, 300) → (260, 460), 0,8 s + pito 1 s
     (vältä vasen säätönappi ~(30, 315), Pulu oikealla alhaalla ja kytkinpöytä y > 700).
  2) Tunniste: `astro kyyti tila` → rivi "astro kyyti: <Tila> … kamera (lat, lon) N km kall K° suunt S°". Kysy ennen vetoa ja
     pidon aikana (komento kesken pidon): vika = kameran lat/lon/km/kall muuttuu selvästi (yli ISS:n oman liikkeen,
     ~0,07°/s 1×:llä); korjaus = ennallaan. Korjauksen läsnäolo: `astro kyyti pallolukko` → "pallo (lukittu|auki)" (vain 146:ssa).
  3) Veto + pito riittää; kahden sormen ele vain lisävarmistukseksi.

## 6.10. klo 08.3x — juliste E v3 ja pallolukko (viestit taas tauolla)
- Juliste proto-haara linssiseppa2/iss-kamera-juliste @ a3fd4d94 (EI käännetty): E v3 -asettelu (41658bec), tarkka aineisto
  (b45dd8b2: budjettiarvio mosaiikin jälkeen, raja 100 Mt; filmi + ilmavoima 3,5; ohjaamo näkyviin haun ajaksi), kehitys
  (81cedf76: paikallinen kontrasti, sinisyys, hehku; halo kaarisini 1,2 + syvä 1), a3fd4d94: SUOMENLAHTI polygonista, nimen varjo,
  GIBS-pilvet kuvan hetkeltä. Stillit d06ffe2c:llä (b45dd8b2): lokit/linssiseppa2-juliste-b45dd8b2/kuvat/20261006-052215.jpg
  (Helsinki 21.6. 17 UTC, z6–9 mosaiikista, 1,1 Mt; 52 mm, 869 km → ~220 m/px, eli 10 m ei näy tällä etäisyydellä) ja 052429.jpg
  (Manaus 202 Mt: haku 100 + datattomien kiilojen varakuvat 102 → raja ylittyy, ehdotus: varakuvat budjettiin).
  Helsingissä lokakuun GIBS-pilvet harmaana laattana → a3fd4d94 hakee pilvet kuvan päivältä. Seuraavaksi käännös + Helsinki ~5 min.
- Pallolukko 2c2ad7ac → juna 147 (Päätoimittaja). Pelikoodarin A/B ei toistanut vikaa yhdellä sormella: Cupolassa (Ikkuna) yhden
  sormen veto oli estetty jo ennen (CupolaVeto: YhdenSormenVetoMuualla = cupola) → vika on kahden sormen eleessä (nipistys/kierto)
  ohjaamossa. Tilarivit ristissä = ruudun viive (EleetMuualla päivittyy seuraavassa ruudussa) → korjattu 7cc8f2be
  (linssiseppa2/ohjaamo-kosketus). Kerrottava Pelikoodarille: kahden sormen nipistys pallon päällä ohjaamossa.
- Cupola-palaute (omistaja 08.3x, juna 147): kehys iss-cupola-kokonainen-{iphone-1206x2622,ipad-1536x2732}.png + heijastus on
  Codexin kuvatoimitus 26.9. (bf8a6101d, posti/kuvatoimitus-iss-cupola-20260926.json, NASA-viitekuvat iss035e010551 ym.), ämpäri
  karttanostot/20260926/. LasiZoom 1,3 (IssKyyti.cs, LS1:n tiedosto) suurentaa sen → pehmeä. Tarkempi (≥ 2,6× = 3136 × 6817 /
  3994 × 7103) vaatii Codexin uuden toimituksen tai uudelleenpiirron (generointi omistajan luvalla). iPad: LasiZoom pienemmäksi
  (esim. 1,15) vain iPadilla (CupolaKerros.HaeKuvat ipad-tunnistus) – LS1:n kuittaus.
- Täysi vauhti (omistaja 09.0x, juna 147/148): proto-haara linssiseppa2/iss-nopeus @ 7a995ada (worktree wt/proto-linssiseppa2-nopeus,
  masterin 9544a1b4 päällä; ei käännetty). AstronauttiLinssi.AsetaKaasuPortaaton(double) + KaasuKerroin (Natiivi-UI:n kahva);
  Nopeustehoste: Voima 0 (< ~160×) … 1 (1000×), Lens Distortion 0,10 + Chromatic Aberration 0,45 (vain reunat), tärinä
  projektion siirtona ~0,12 % ruudusta; Natiivi-UI lukee Nopeustehoste.Tarina (−1…1) ja Voima paneelitärinään (sama ajastus).
  Testit 696/444/415, unity-tarkistus 0. Video 1× → 1000× Päätoimittajalle käännöksen ja simuvuoron jälkeen.

## 6.10. klo 17.3x — tila (juna 151 VIE:n jälkeen käännökset; levyraja 40 Gi)
- JULISTE (juna 152): proto-haara linssiseppa2/iss-kamera-juliste @ b7a32d4a (Cupola-kehys Codexilta ämpärissä
  karttanostot/20261006-juliste/, aukko alfasta; logo avaruudessa; ikkuna 12 % suurempi; 2D-halo; pilvet sivuilla + sulkareuna,
  utu 1,25; vientikoko 2160 × 2700). Koko koe: linssiseppa2/koe-147 @ 9b3b2c44 (juliste + s2 9479a9ee + nopeus 9948d1dc +
  pallolukko 7cc8f2be). Viimeisin still: lokit/linssiseppa2-juliste-halo2d/kuvat/juliste-helsinki-e315f33e.jpg (Päätoimittaja OK
  halo/kehys; omistaja: logo ylös, ikkuna suuremmaksi → b7a32d4a, still odottaa käännöstä). Ajo: scratchpad/aja-julistef.sh.
- OPAS: oikean tapin vaakasuunta f55cf1ce → LS1:n silta-150 1ec7d900 (juna 151), Pelikoodari todensi ennen/jälkeen.
  Vapaa tila linssiseppa2/opas-vapaa @ 254b113b (juna 152; LS1 hyväksyi; OpasVapaaLento, 3D-pinnan näytteet, skenaario 14);
  video Pelikoodarilta käännöksen jälkeen.
- S2: juna 147 kuitattu (9479a9ee); jatko linssiseppa2/s2-jatko (korjaus4 c67294a3 juna 149, indeksi v2f 1354ef53 147 VIE:n jälkeen).
- Cupola: iPad lasizoom 1,15 linssiseppa2/cupola-ipad 3708977e (juna 148+); Codexin tarkempi kehys tilattu (Päätoimittaja postitti).
- Pallolukko 7cc8f2be: vika ei toistunut (iPhone/iPad, kaikki tilat) → juna 149 sellaisenaan, omistajalta tarkennus.
