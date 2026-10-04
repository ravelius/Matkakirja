# Linssisepän luovutus 1.10.2026 klo 21.1x (ilta)

Luovuttaa: Linssiseppä (Opus, high). Edellinen: `viesti-linssiseppa-luovutus-20261001-b.md`. Muistitiedosto:
`linssiseppa-tila-20261001-paiva.md`.

## TILA 4.10. KLO 16.5x (AURINGON KIILTO JUNAAN 139 — ODOTTAA KÄÄNNÖS-/SIMUVUOROA)
- Päätoimittajan erä: hopeanvalkoinen, rakeinen, venyvä, VAIN vedessä; juovat liian vahvat. Proto linssiseppa/glint-2 = BUILD 137
  80b7dcf0 + glint-commitit (cherry-pick) + 3de304db: sävykäyrä vesimaskista riippumatta ja terävä maski 0,42…0,58 sen jälkeen (vuoto maalle
  oli sävykäyrän nostama pehmeä rantareuna), paikallinen σ² 0,75, värähtely 0,9·√(0,25σ²), rakeisuus 1,5/0,75 km (≥ 5 px:n häivytys).
- Offline-malli tyokalut/linssiseppa-ajot/kiilto_malli.py (sama hajautus/kohina/BRDF/käyrä): maalla 0 (ennen max 0,46 matalalla auringolla).
- Ajo: ketju-kiilto-2.sh (käännös → ajo-kiilto-cupola-2.sh: ennen/jälkeen/pois-kuvat + 2 videota → maavuoto.py). Julkaisija: käännös
  TF 137:n ja junan 138 jälkeen, simu D0D2CD1E Natiivisepän itsetarkistuksen jälkeen (~17.30–18); simuportti $S/sim-nyt-ki käsin NYT:llä.
- SEURAAVAKSI: tarkista kuvat suurennoksina (ydin, rakeet, juovat heikot, ei maalle) → stilli + video + maavuoto Päätoimittajalle →
  merge-pyyntö Natiivisepälle junaan 139. LinssiOhjain: vain `astro kyyti kiiltovanha` -testirivi (Yokuorin A/B, ei Cupola-koodia).

## TILA 4.10. (KELLOPÄÄTÖS: A 659c903c JUNAAN; MARCUS 92d46875 MERGE-PYYNNÖSSÄ)
- Päätoimittaja: junaan LS2:n kello (659c903c); yksi-kello 7ab396b3 EI junaan (haara säilyy, piirtää leikkauksen vasta raa'an dsp-askeleen
  jälkeen). Marcus linssiseppa/marcus-v15b 92d46875 merge-pyynnössä Natiivisepälle (yhdistyy 9c071068:aan). Jatkohuomiot: kytkimen
  valon häivytys 170–210 ms äänen jälkeen (webin v14, ei muutosta ilman omistajaa). Mittaustyökalu mittaa-tahti.py toimii myös LS2:lle.
- SEURAAVAKSI: auringon kiilto (glint c2d70795) simulla aamulla → kuvapari Päätoimittajalle.

## TILA 4.10. KLO 03.1x (YKSI KELLO PIDOSSA — LS2 MITTAA)
- Päätoimittaja perui hyväksynnän: merkki piirtyy raa'an dspTimen mukaan, joten mittaus kohtauksen samalla kellolla näyttää sopua
  rakenteellisesti. LS2 korjaa merkin reaaliaikaan ja vertaa 659c903c vs. yksi-kello 7ab396b3; voittaja junaan 135, Marcus (marcus-v15b)
  heti perään. Natiiviseppä palautti koostumuksen 9c071068:aan. ODOTA LS2:n tulosta; ei uutta merge-pyyntöä ennen sitä.

## TILA 4.10. KLO 03.0x (MARCUS 135 + YKSI KELLO — MERGE-PYYNNÖSSÄ, PERUTTU 03.1x)
- Päätoimittaja hyväksyi (tarkisti itse: kaikki leikkaukset alle 33 ms:n ruudun). Merge-pyyntö Natiivisepälle junaan 135:
  linssiseppa/yksi-kello 7ab396b3 + linssiseppa/marcus-v15b 92d46875 (yhdistelmä = mitattu puu c365db85). LS2 katselmoi ennen VIE:tä;
  huomautukset korjataan ennen TF:ää. Jatkohuomio (ei muutosta ilman omistajaa): kytkimen valo alkaa 170–210 ms äänen jälkeen (webin v14).

## TILA 4.10. KLO 02.5x (MARCUS 135 + YKSI KELLO — ODOTTAA LS2:N KUITTAUSTA)
- Juurisyy: AjattelijaTahti.Kello interpoloi dspTime + reaaliaika (≤ 0,1 s) raa'an kellon edelle → leikkaukset 52–69 ms ennen ääntä
  (tallenne B). Merkki c093efe5 ei muuttanut ajoitusta (vain AudioSource lapsiolioon).
- Korjaus (Päätoimittajan käsky, LS2 jumissa): proto linssiseppa/yksi-kello = 659c903c + 052a782b (Kello välillä [raaka − 0,1, raaka],
  leikkaus-/kytkinkiinnitys raakaan, ajastukset raa'asta) + 7ab396b3 (mittariin raaka yli / merkki yli). Linssit-testit 596/596.
  Mittaushaara linssiseppa/marcus-v15c (v15b + samat commitit, e3b7efe9), käännös 072c1384.
- Mittaus (tyokalut/linssiseppa-ajot/mittaa-tahti.py + ketju-tahti.sh; lokit/linssiseppa-tahti-{sokrates,marcus}-20261004-c):
  Sokrates −18…+4 ms (korjattu −9…+2), Marcus −17…+18 ms (korjattu +2…+16). Marcus vain PEILI=pois (LS2:n peilissä ei Marcusta).
- SEURAAVAKSI: LS2 päättää (minun commitit vai oma) → merge-pyyntö Natiivisepälle (marcus-v15c tai LS2:n kärjen päälle rebasettu),
  kopio Päätoimittajalle. Ei ennen LS2:n kuittausta.

## TILA 3.10. KLO 22.2x (AURINGON KIILTO CUPOLAN KULMISSA — KESKEN, juna 134)
- Päätoimittajan erä 21.2x: sunglint Cupolan vedon kulmissa iso tasainen kermaläiskä → aidon ISS-kiillon kaltainen. Proto-haara
  linssiseppa/glint (LS2:n linssiseppa2/cupola-veto 4aa02624:n päällä), kärki c2d70795 (TARKISTAMATTA SIMULLA, yötauko).
  Yokuori.shader: aallokon normaalin värähtely arvokohinalla (koordinaatit lon/lat km — EI p·paikallinen tangentti, joka on ≈ 0 ja teki
  pikselirakeet), karheuslaikut 25 km, hopeanvalkoinen läpäisy (ilmamassat − 2), logaritminen sävykäyrä 0…3 (ei bloom-usvaa);
  Yokuori.cs KiiltoVanha + LinssiOhjain `astro kyyti kiiltovanha 1` (A/B samalla hetkellä). _VesiTerava taas vain kuvaputkessa.
  Ajot: tyokalut/linssiseppa-ajot/ajo-kiilto-cupola.sh (S, APP, OUT; portti $S/sim-nyt-ki), kuvat lokit/linssiseppa-kiilto-cupola-{,b..e}-20261003.
  Tila e (3559411b): juovat liian voimakkaat (siveltimenvedot, ei ydintä) → c2d70795 pienensi värähtelyä. SEURAAVAKSI: simu aamulla,
  tarkista pysty-45-90 suurennos (ydin yhtenäinen + juovat reunoilla), oletus ennallaan → kuvapari Päätoimittajalle → merge-pyyntö.
- Marcus v14 2848bfe2 ja linssihampurilainen/natrium: junissa 133 (hyväksytty). BUILD 133 natrium tarkistettu silmin (ok).
- MARCUS JUNAAN 135 (Päätoimittaja 22.2x, omistajan TF 133 -löydökset): odota LS2:n moottori (dspTime + latenssikompensaatio, pehmeämpi savu),
  Pelikoodarin uudet taustarivien atlakset ja Sisältökirjurin/Linnanrakentajan Marcus-kaikukuvat (sade, uhri, kuolinvuode) → aja muunnin
  uudelleen → tarkista FYYSISELLÄ iPadilla äänen kanssa (iPad-testien ehdot muistiossa ipad-testit-omistajan-lupa).
- ISKUT (4.10.): raidan iskut 0–5 ms nimellisistä (lahde/iskut.py); moottorin off-by-one (ruudut 1-pohjaisia) korjattu LS2:n 7054e2e1:ssä
  + LAME-alkuviiveen ohitus. Marcus-haara rebasetaan LS2:n kärkeen ennen junaa 135.
- MARCUS 135 DATA (4.10. 01.2x): proto linssiseppa/marcus-v15 60c68465 (LS2:n linssiseppa2/ajattelija-tahti:n päällä), generoitu
  tools/ajattelija-natiivi.mjs (PR #3916 versio) luvuilla 5b79c21d5 → kaiut v5 + kuvalahteet[]. Kaikukuvat ämpärissä marcus/v5 (vienti
  _valmiit/marcus-kaiut-vienti-20261004). Main-PR:t: #3918 (data/ajattelijat/marcus.json osoitin), #3917 (vain musiikkirivi lahteet.js).
  Web-worktree /Users/Shared/Claude/wt/linssiseppa-lahteet-ajattelijat (haarat lahteet-ajattelijat-v5 + marcus-data-v5). ODOTTAA:
  LS2:n tahtimoottori + Pelikoodarin uudet taustarivien atlakset → generoi uudelleen → käännös → fyysinen iPad äänen kanssa.

## TILA 3.10. KLO 19.3x (MARCUS v14 NATIIVI — MERGE-PYYNNÖSSÄ)
- linssiseppa/marcus-v14 2848bfe2 (LOPULLINEN 20.3x; proto, LS2:n linssiseppa2/sokrates-v14 649651b2:n päällä, käännös 9bb5418d, kuvat lokit/linssiseppa-marcus-v14-d-20261003; vain data: tyokalut/ajattelijat-natiiviin.mjs,
  web 088b64d0c, luvut 78b883452). Päätoimittaja hyväksyi; merge-pyyntö Natiivisepälle junaan 133 Sokrateen kanssa (muuten 134).
  Käännös d41204e0 simu PASS; vertailu lokit/linssiseppa-marcus-v14-b-20261003/vertailu-*.png (korrelaatio 0,991). Punahehku/lämmin
  tausta korjattu LS2:n 69e7438c:ssä; rinta ~17 % webiä kirkkaampi kerrottu LS2:lle (ei estä). Omistaja 19.00: ajattelijat vain natiiviin.
- Web-worktree /Users/Shared/Claude/wt/linssiseppa-marcus-web (pr3902) poistettavissa mergen jälkeen (tools/uusi-worktree.sh --poista).

## TILA 3.10. (AJATTELIJOIDEN ALKU v14)
- Omistaja 14.5x: alku liian hidas → v14: kertoja musiikin 9,5 s:n kohdalla (linssissä 12,0 s), suuri sointu 2,0, iskut 3,9/4,5/5,1,
  huippu 6,1, kysymys 8,3. Sokrates (savellys.py AJAT) ja Marcus (marcus.py AJAT) *-v14.mp3 + kuunteluversiot −8 dB.
  Ajat lähetetty Linnanrakentajalle, Pelikoodarille ja Päätoimittajalle. EI ämpäriin ennen omistajan hyväksyntää.
- linssihampurilainen 1e2ea061 ja yovalot-natrium 486d8dfc merge-pyynnössä Natiivisepällä (juna 133). Taikalasiero tarkoituksellinen.

## TILA 3.10. KLO 15.xx
- YÖVALOT NATRIUMORANSSI (omistaja 14.2x): linssiseppa/yovalot-natrium 486d8dfc (1 rivi Yokuori.shader), käännös d815dc0f,
  simu PASS; Päätoimittaja kuittasi, MERGE-PYYNNÖSSÄ Natiivisepällä junaan 133. Kuvapari lokit/linssiseppa-yovalot-natrium-20261003-iphone.
- KARTTALINSSIEN HAMPURILAINEN (omistaja 14.2x, web #3899): linssiseppa/linssihampurilainen 1e2ea061 (Topografia: Korkeustasot,
  Vesistöt: Joet ja järvet; LinssiUi.Karttalinssit, komento ui linssi karttavalikko [auki|selite]), käännös 5c3cbb98, simu PASS
  oikeilla tapeilla; kuvapari lokit/linssiseppa-linssihampurilainen-20261003/kuvapari-vesistot.png. ODOTTAA Päätoimittajan kuittausta,
  sitten merge-pyyntö Natiivisepälle. Isoisän linssi 1873 pitää ✕:n (ei selitettä).
- MARCUS, OMA MUSIIKKI v1: proto-3d/_lahteet/marcus-aurelius/musiikki-oma/ (lahde/marcus.py käyttää Sokrateen moottoria; harppu lisätty
  naytteet.py:hyn). Intro, koko raita ja kuunteluversio (kertoja-v1, −8 dB) Päätoimittajalle; odottaa palautetta.
- SendMessage-raja täyttyi 15.xx → varakanava mcp send_message.

## TILA 3.10. (SOKRATES, OMA MUSIIKKI — LOPULLINEN, WILLIAM OLETUS; LEVOSSA)
- Raita proto-3d/_lahteet/sokrates/musiikki-oma/sokrates-oma-koko-vsco.mp3 (127,1 s) kertojalle Iv4 William, oletusvakauden otto
  (omistajan valinta), ajat ja kohdistus kansiosta musiikki-oma/kertoja-iv4/ (linkit Iv4-william-oletus*). Nuottien loput
  hiipuvat (naytteet.VAPAUTUS), kaiku Liverpool Philharmonic Hall IR (Freesound 423866, CC0). Ilmoitettu Pelikoodarille
  (−8 dB vaimennus), kuunteluversio sokrates-oma-william-kuuntelu-8db.mp3 Päätoimittajalle. Kertojan vaihto: päivitä
  kertoja-iv4/-linkit ja aja `naytteet.py koko` + kuuntelumiksaus (VAIMENNUS=8). Python proto-3d/_lahteet/venv-laser.
- Omistajan luvat tässä sessiossa 3.10.: VSCO 2 CE (proto-3d/_lahteet/vsco2-ce), brew cmake/libsndfile/pkg-config,
  sfizz 1.2.3 → proto-3d/_tyokalut/sfizz/sfizz_render (käännetty, ei käytössä).

## TILA 2.10. KLO 23.2x
- TOPOGRAFIAN HAMPURILAINEN 2 (Päätoimittaja 23.0x, web #3881 mallina): linssiseppa/topografia-hampurilainen-2 d015ffa1
  (d99f62c5:n päällä; d99f62c5 pois junasta 130) MERGE-PYYNNÖSSÄ junaan 131 Natiivisepällä. Korkeustasot = KYTKIN (POIS/PÄÄLLÄ,
  napautus sulkee valikon, selite yksin napin alle), otsikko KORKEUSTASOT (LinssiSelite.ValikkoOtsikko), nappi tk-teema-lasi
  (Natiivi-UI kuittasi; LinssiValikko teema-parametri, oletus harmaa). Käännös 84bdd62d, simu D0D2CD1E 23.21 PASS 3 oikealla
  tapilla (ajo-topografia-2.sh), kuvapari lokit/linssiseppa-topografia2-20261002/kuvapari-topografia2.png (koosta-topografia2.py)
  lähetetty Päätoimittajalle. Avoin pieni ero: natiivin lasi läpikuultavampi kuin webin (web blur), ei muutettu.
- PÄÄTOIMITTAJA HYVÄKSYI d015ffa1:n junaan 131 (lasin läpikuultavuus saa jäädä). LEVOSSA YÖN: Päätoimittaja kysyy aamulla omistajalta
  hampurilaisen laajennuksen muihin linsseihin, natrium-oranssin ja Mallinsepän erän 7; erä tulee kun jokin ratkeaa. Ei yövuoroja.

## TILA 2.10. KLO 22.1x (LOPULLINEN, tilinvaihto; ei uutta työtä aloitettu)
- TOPOGRAFIAN HAMPURILAINEN (omistaja 21.3x): linssiseppa/topografia-hampurilainen d99f62c5 (BUILD 129 e204abbe:n päällä)
  JUNA 130:N KOOSTUMUKSESSA (Natiiviseppä 22.1x, tilinvaihto: seuraava Natiiviseppä kokoaa). Topografiassa ✕-pilleri ja nimilappu pois; tilalle OHJAUSNAPPI (LinssiValikko-pohja,
  aanet:false): Korkeustasot (selite auki/kiinni) + Sulje linssi; kartan pikkuselite piilossa (LinssiSelite.PieniPiiloon).
  Komento `ui linssi topovalikko [auki|korkeustasot]`. Simu 22.06 PASS oikealla tapilla, kuvapari
  proto-3d/lokit/linssiseppa-topografia-20261002/kuvapari-topografia.png lähetetty Päätoimittajalle.
  AVOIN: vertaa Pelikoodarin webiin kun valmis (ero → rivi Päätoimittajalle, ei muutosta ilman lupaa).
- Kipsipäät linssiseppa/erikoisnostot-3 54358623 (Marcuksen piste #3874) junassa 129 (todennettu: e204abbe:n esi-isä), omistaja "Kelpaa". Linssit-karttanappi + Avaajat junassa 128.
- Odottaa: yövalojen natrium-oranssi (omistaja), Julisteet-galleria (UI-pohja auki Natiivi-UI:lla).
- Proto-worktree /Users/Shared/Claude/wt/proto-linssiseppa-astro-auto on haarassa topografia-hampurilainen.

## TILA 2.10. KLO 11.3x
- ISS:n rinnalla pois pelistä (omistaja 2.10. 10.4x): linssiseppa/ei-seurantaa 19e0242e merge-pyynnössä Natiivisepällä
  (juna 116); simulaattori f7826b2c PASS (lokit/linssiseppa-ei-seurantaa-20261002-iphone). Kehittäjälle `astro kyyti seuranta 1`.
- Savuke 1117 -korjaus: linssiseppa/ei-seurantaa-2 c7d3c110 (Pulun taulu: avaruuskävelyltä ja kohteen yltä "ISS:n sisälle"
  → Cupola, MoodinAskel.LopetaKavely) junassa 118 (53c5595a); simulaattori 70916e44 PASS (lokit/linssiseppa-ei-seurantaa2-20261002-iphone).
  POISTU vie aina kaukonäkymään (tarkoitettu). Pelikoodarille kävelyn kulku webiä varten lähetetty.
- Savuke 1118 -napautukset: juna 118 8ccbaaeb PASS oikeilla simulaattorinapautuksilla (lokit/linssiseppa-taulu-osuma-20261002-iphone);
  Laitetestaajan napautukset eivät päässeet sovellukseen (attach), ei koodivikaa.
- Ajattelijat (Sokrates, Marcus, Platon) natiiviin SIIRTYI Linssiseppä 2:lle (Päätoimittaja 2.10.); kartan päät Natiivi-UI/LS2.
  Linssiseppä jatkaa meren kiiltoa.
- KIILLON PYSTYLEIKKAUS juurisyy (2.10. 13.4x, lokit/linssiseppa-kiilto4-20261002-iphone): ei pilvet; kiillon huippu ruudun
  ulkopuolella, näkyvä ~25° sivuliepe (0,75) puhkeaa tonemapissa valkoiseksi tasanteeksi → pystyreuna. Python-toisto
  scratchpad kiilto_sim.py. Suositus Päätoimittajalle: ilmakehän läpäisy (Kasten–Young, τ RGB 0,15/0,20/0,33) kiiltoon,
  natiivi + web (iss-realismi-kerrokset.js r. 143) — HYVÄKSYTTY JA TEHTY: natiivi linssiseppa/kiilto-ilmakeha 797aac22
  (käännös 5c292cbe) merge-pyynnössä Natiivisepällä; web PR #3844 (Pelikoodari hyväksyi, CI vihreä). Kuvaparit
  lokit/linssiseppa-kiilto-ilmakeha-20261002/{natiivi,web}-vanha-uusi.png; web-harness scratchpad kiilto-web.mjs.
- OMISTAJA 20.5x: kipsipäät natiivissa "Kelpaa" (erikoisnostot-3 54358623 junassa 129). ROOMA-nimen ladontavika (Nimikerros,
  maakuntanimi kaukaiseen ehdokkaaseen) → Natiiviseppä natiiviseppa/nimet-maakunta + Karttaseppä data/web; ei Linssisepän.
- SAVUKE 1128 (1) KORJATTU: Linssit-nappi valitsimen Avaajiin (92a70085, juna 128 5e78c8a0); oikea sim-tap PASS f512ba86.
  OPPI: todenna napit OIKEALLA sim-tapilla (attach), ei vain ui napauta (synteettinen ohittaa wasPressedThisFrame-polun).
- LINSSIT-KARTTANAPPI (omistaja 18.3x, web #3859): linssiseppa/linssit-karttanappi 3b05a9d4 merge-pyynnössä junaan 128 (V2:n kanssa);
  simulaattori 2eaab97a PASS, kuvapari lokit/linssiseppa-linssitnappi-20261002.
- KIPSIPÄÄT KARTTAOBJEKTEINA (omistaja 16.4x/16.5x, web #3866): linssiseppa/erikoisnostot-3 2b1bffa1 (karttapiste, kipsi webin arvoin,
  varjo pään siluetista: siirto 0,24, mittakaava 0,85, sumennus 1,0, peitto 0,26; valo ylhäältä kuten web). MERGE-PYYNNÖSSÄ junaan 128
  (simulaattori 8e577065 PASS); omistajan parit lokit/linssiseppa-kipsipaat-kartta-20261002/omistaja-*-ennen-jalkeen.png.
  JATKO 54358623 (merge-pyynnössä seuraavaan junaan): päät karttamerkkikerroksen alimpana (kortit päälle), pisteet #3874
  Sokrates [39.49, 23.98], Marcus [42.82, 12.17] — simulaattori edb73ea4 ei osumia nimiin; omistajan parit uusittu samaan kansioon.
- PULU VÄISTÄÄ KIPSIPÄÄN: linssiseppa/erikoisnostot-2 1ba9ac42 (Pulu.cs Alareuna + Erikoisnostot.NakyvaAlue) merge-pyynnössä junaan 126;
  omistajan kuvat lokit/linssiseppa-kipsipaat-omistaja-20261002/omistaja-kipsipaat-{kiinni,auki}.png (ajo-kipsipaat-omistaja.sh).
- KIPSIPÄÄT JUNASSA 125 (cf3ffcf1) ja todennettu iPhonella 16.19 (lokit/linssiseppa-erikoisnostot-juna125-iphone): näkyvät, reunaehto,
  napautus avaa Ajattelijat-linssin; sävy kuten web. Avoin: minipulun jalat pään päällä (pulun väistö, omistaja kysytty Päätoimittajalta).
- ERIKOISNOSTOT TEHTY (2.10. 16.0x): linssiseppa/erikoisnostot ea412b26 (BUILD 123 + LS2 ajattelijat d817c141) merge-pyynnössä
  Natiivisepällä omistajan OK:lla ilman uusintakuvausta (loki 6a9639c08); KUVAA JUNABUILDISTA JÄLKIKÄTEEN: ajo-erikoisnostot.sh
  (Rooma/Kreikka kiinni+auki, heilahdus, napautus), web-mallit lokit/linssiseppa-erikoisnostot-web-20261002. Linssit-nappi + Julisteet:
  odottaa webin #3859 mergeä (Pelikoodari ilmoittaa).
- SEURAAVA ERÄ (Päätoimittaja 2.10. 14.2x): 1) ERIKOISNOSTOT natiiviin = ajattelijan 3D-pää kartuutsin lipun alla (web #3843,
  ajattelijapaat.js + css/pohjat/erikoisnostot.css; aloitus kun #3843 mainissa). Natiivin palat: Kartuscha.Maa (ISO3, pollaus),
  lippu mk-kartuscha__lippu (Kartuscha.cs:64, Tilarivi 15), Asetukset.Kehittaja, GlbLukija (+ normaalikartta lisättävä),
  maamerkkien lataus/välimuisti PeliOhjain.Maamerkit.cs, RT-malli Sijaintipallo.cs (vapaa layer 13–23), pinta
  Pohjat/Pinnat/erikoisnostot.uss. Napautus: AjattelijatSovitin.AvaaAjattelija(tunnus), rekisteri AjattelijatSovitin.Ajattelijat
  (KarttaMaa, KarttaGlb) LS2:n haarassa linssiseppa2/ajattelijat d817c141. GLB:t _valmiit/ajattelijat-kartta/v1 (1 mesh, väri+nor PNG).
  2) Linssit-nappi oikeaan yläkulmaan ≡:n viereen + valikkoon Julisteet Linssien tilalle, kun Pelikoodarin web valmis.
- KUVAA-osuma ad79d770 junassa 116. LS2:n 1116-kysymys (KUVAA Pariisissa, KOHDE-lista auki): vastattu — todennäköisin
  hiljainen `kaynnissa`-paluu IssKameraKuva.Laukaisessa; odottaa LS2:n koordinaattia.
- Seuraavaksi: kiillon pystyleikkaus (ajo-kiilto3.sh ilman KUVAA-lippua) seuraavalla simulaattorivuorolla.

## TILA 2.10. KLO 10.3x
- Lentopeli: latausodotus poisti nauhat; lentopeli-2 95bf46cd + astro-auto-2 7fbd363b junassa 113 (juna 113 -todennus PASS).
- Cupola-ketju (LS2:n kamera + vuodenaika/vuorokausi/v4/iso ikkuna) = linssiseppa2/cupola-ketju-3 84b8556b junassa 115.
- Yövalot lähikuvaan: linssiseppa/yovalot-4 9b2e8c9d merge-pyynnössä (erilliset valopisteet; kylläisempi oranssi vasta omistajan TF:n jälkeen).
- Seuraavaksi: kiillon pystyleikkaus (pilvihypoteesi). Sokrates odottaa omistajan OK:ta. Uudet tyylit vain Pohjat/Pinnat/*.uss (juna 112:n jako).

## HUOMISEN JONO (Päätoimittaja 1.10. 21.1x)
1. **Lentopelin latausodotus** (hyväksytty): "Lähde" vasta kun lähialue ≥ 98 % ja Cesium tasaantunut (Valmius.Tasaantunut),
   Laattapalvelin.AsetaSaapumistila lennon ajaksi, ennakkokamera koneen eteen — kuten lento v3; uusi video Päätoimittajalle.
2. **Astronautin kamera: zoom + AUTO** (omistaja 2.10. 00.1x, Hongkong-kaappaus; Päätoimittaja): natiivi webin mallin mukaan
   (Pelikoodari tekee webin ensin). a) kuvan zoom nipistyksellä ja kaksoisnapautuksella, nollautuu otosta vaihdettaessa
   (web satelliitti.js nollaaZoom, pariteetti); b) AUTO natiivin nostoselaimen AUTO-ohjaimella (ei uutta UI-elementtiä):
   kertoja lukee leipätekstin → 3 s → seuraava AstronauttiKierroksen järjestyksessä, kosketus pysäyttää; c) AUTOn aikana
   yläinforuutu minimoituna, otsikko pelkkä kaupungin nimi; d) AstronauttiAineisto.Luettava = vain leipäteksti
   (h.Teksti ?? Selite, ei "Nimi, Seutu." -alkua); e) kuvanäkymän minipallo ~30 % isommaksi (iPhone ~53 → ~70 pt, sama
   mitta kuin webissä — HUOM: minipallo on vain natiivissa, webissä ei palloa). Kuvapari web vs. natiivi merge-pyyntöön.
   **WEBIN MALLI VALMIS: PR #3817**, kuvapari proto-3d/lokit/pelikoodari-astro-auto-20261002/pari-astro-auto.png:
   AUTO-pilleri vasemmalla alhaalla, lappu "Seuraava: … 3 s Pysäytä", AUTOn aikana otsikko pelkkä nimi, luenta ilman
   otsikkoa, zoom 1–4×. Aiemmin, jos Julkaisija avaa junan.
3. **Sokrates-pilotin reaaliaikainen heijastusvarjostin**: kreikkalainen sitaatti kipsibystin kasvoille kuin
   videoprojektorista. Alkaa vasta, kun omistaja hyväksyy Linnanrakentajan mallikuvan. Tekstit:
   docs/raportit/sisaltokirjuri-sokrates-pilotti-20261001.md.
4. **Yövalot lähikuvaan** (yovalot-pisteet a91cea86 jatkuu; rebase Linssiseppä 2:n iss-kamera-kuva-2:n päälle, Yokuori).

## LENTOPELI vaihe 1 (kärkityö, Päätoimittaja: omistaja "tee lentopeli" 1.10. 17.4x)

Proto-haara **linssiseppa/lentopeli = 173d7e19** (masterin BUILD 109 päällä), worktree
/Users/Shared/Claude/wt/proto-linssiseppa-lentopeli. Viimeisin käännös 373ad97f. Testit: Kartta 433, Linssit 527,
Peli 365, unity-tarkistus 0, pohjavahti ok.

- Ydin `Kartta/Lentopeli.cs` (puhdas C#, 15 testiä) + `Nappula.Lentopeli.cs` (Tiger Moth, renkaat, takaviistokamera
  30 km / 13° / θ 30°, peukalosauva, tauko) + `UI/Linssit/LentopeliNakyma.cs` (LINSSIN OHJAIN -nauha + **kaasuvipu**
  oikeassa reunassa, omistajan speksi; nuppi --tk-toiminto). Komennot `lentopeli aloita|pois|kaasu|auto|sauva|irti|vapaa|tauko|tila`.
- Lennon ajaksi pois: nostojen ja kaupunkien nimiöt (NostoKerros.LentopeliPiilottaa), alue-/merinimet, maamerkki- ja
  symbolimallit (skaalautuivat kilometrien seiniksi), kehä/rannat/rajat/maakunnat; kaikki palautetaan.
- Ajoskripti `proto-3d/tyokalut/linssiseppa-ajot/ajo-lentopeli.sh` (PORTTI, L, DIAG=1 kerrosdiagnostiikka).
- Toimitettu Päätoimittajalle: lokit/linssiseppa-lentopeli-20261001-c-iphone/lentopeli-autopilotti-540.mp4 (76 s, ei
  nauhoja) ja vipu-pysaytyskuva.png; ensimmäinen versio -iphone/ (5ac7d518).

**AVOIN (seuraava työ):** lennon ensimmäisellä ~35 s:lla Ateenan lähellä 1–2 läpikuultavaa nauhaa. Diagnoosi
(lokit/linssiseppa-lentopeli-20261001-d-iphone/diag-koonti.jpg): ei mikään kartan kerros; ilmestyy paikallaan
seisoessa itsestään, laatat pois → valkoinen = Cesiumin maastolaatta (laatan/rasterin lataus, vrt. "harmaat
suorakulmiot" KarttaKerrokset.LentoTesti). Korjausehdotus: aloitus kuten lento v3 — odotus kunnes lähialue ladattu
ja Valmius.Tasaantunut, Laattapalvelin.AsetaSaapumistila lennon ajaksi, ennakkokamera koneen eteen.
Omistajan valinta auki: kaasuvipu (toteutettu) — Päätoimittaja vie.

## Muut tänään
- Yövalot c3d7a9ab kuvattu (lokit/linssiseppa-yovalot-20261001-*); Cupola PÄIVÄ -koonti lähetetty
  (…-iphone/koonti-ikkuna-paiva.jpg). Yövalojen jatko lentopelin jälkeen (50 mm:n pisteet näyttävät rakeelta).
- Linssiseppä 2:n kaaren säätimet: linssiseppa/kaari-saatimet 44085dd0 (LS2 jatkaa 2fee56df:ssä, vie itse).
- Kiillon pystyleikkaus: hypoteesi pilvikuvan kaistareunat (Yokuori lapi/pvarjo), testi `astro kyyti pilvet pois`.
- Laitetestaajan 103-täydennys: ilta-laikku = tunnettu kiiltovika; pilvivalo ehdotettu avoimeksi (ei TF-ehto).
- Levy siivottu (scratchpadien .app-kopiot, raakavideo). app-jako/linssiseppa-5966fe77 → poista 2.10.
