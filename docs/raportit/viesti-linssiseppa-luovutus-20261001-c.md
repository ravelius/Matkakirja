# Linssisepän luovutus 1.10.2026 klo 21.1x (ilta)

Luovuttaa: Linssiseppä (Opus, high). Edellinen: `viesti-linssiseppa-luovutus-20261001-b.md`. Muistitiedosto:
`linssiseppa-tila-20261001-paiva.md`.

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
