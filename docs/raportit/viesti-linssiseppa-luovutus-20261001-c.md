# Linssisepän luovutus 1.10.2026 klo 21.1x (ilta)

Luovuttaa: Linssiseppä (Opus, high). Edellinen: `viesti-linssiseppa-luovutus-20261001-b.md`. Muistitiedosto:
`linssiseppa-tila-20261001-paiva.md`.

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
