# Linssiseppä 2:n luovutus 1.10.2026 klo 07.5x (tilinvaihto)

## Kesken: S2-mosaiikki astronautin kameraan (hyväksytty suunnitelma)
Suunnitelma: docs/raportit/s2-mosaiikki-astronautin-kameraan-suunnitelma-20261001.md. Kuittaukset: Karttaseppä, Linssiseppä,
Natiiviseppä (lisäysversio, ehdot alla), Päätoimittaja (OK koko fotorealismihaaralle junaan).
- Koodi: proto linssiseppa2/s2-kyyti e9ac04c0 = AstronauttiKerros.PaivitaS2 (reliefi pois kyydissä, BMNG paikka 1 alfa 1,
  S2 paikka 2 rajatulla jaolla 13 × 13 z6-lohkoa, kevyt laite z9), Laattapalvelin S2-alikatto 200 Mt (karsitaan ensin),
  `astro kyyti s2 0|1`, `astro kyyti s2 url <…|pois>`. Linssiseppä yhdisti ja sävytti: **linssiseppa/iss-fotorealismi 23e40639**
  (`astro kyyti s2savy k s l`, `s2ilma v`; ero NASAan 79 → 28).
- **Ämpäri:** Karttaseppä vie noin klo 12 polkuun media.matkakirja.app/linssit/astronautin-kamera/s2-eurooppa/v1/{taso}/{x'}/{y'}.jpg
  (taso = z − 6, x' = x − 27·2^t, y' = y − 13·2^t, y pohjoisesta = Cesiumin {reverseY}), lähde 2026-10-01b, täydet merilaatat,
  57 233 laattaa ~0,8 Gt, ei vesimaskia. Kysy Karttasepältä, onko vienti valmis (taustalla jatkuva ajo on hänen).
- **Seuraavat askeleet:**
  1. Käännä 23e40639 (Julkaisijan NYT, kaanna-jono.sh) ja todenna ämpäristä simulaattorissa: kyyti → `astro kyyti s2 1` → kuva
     NASA-kulmasta (alpit-kuva.sh, kulma 44.3 11.1 406 45.6 9.4 22 2022-08-21T10:49:20) ja Laattapalvelimen loki.
  2. Muistimittaus iPad 00008103 (laite-sha.sh 23e40639, Julkaisijan NYT; Natiivisepän ehto): kyyti + S2 + ylilento Euroopan yli,
     GPU/muisti ja karsintaloki ("karsittu … Mt").
  3. YKSI merge-pyyntö Natiivisepälle: linssiseppa/iss-fotorealismi 23e40639 (sisältää s2-kyydin). Mainitse: koko fotorealismihaara
     (A/B:t oletuksena pois) + kaksi oletusmuutosta ilman kytkimiä (Ilmakaari.shader ilmahehku kapeampi/himmeämpi, Yokuori
     kaupunkivalot lämpimämpi natrium), muistimittaus ja karsintaloki.
- Paikallinen testikansio rajatussa asettelussa: proto-3d/lokit/linssiseppa2-s2-rajattu/laatat (+ tee-rajattu.py, 632 Mt, vanha
  lähde 2026-10-01): `cp -R` Documents/iss-pinta ja `astro kyyti s2 url {docs}/iss-pinta/{z}/{x}/{reverseY}.jpg`.

## Valmiit tänä yönä (omistajalla / junassa)
- Helsinki ISS-kamera: 400 mm ja 50 mm -parit (proto-3d/lokit/linssiseppa2-helsinki-20260930/), omistajalla.
- S2-Alppikoe NASA-kulmasta (proto-3d/lokit/linssiseppa2-alpit-s2-20261001/), omistajalla.
- Linnan aluskasvit 3b853a78 → Siirtosepän linna-vesi → Natiivisepän juna. Pulun EVA-asu natiivi 465df46f junassa 83+;
  web #3728 luonnos (web tauolla). ElevenLabs-äänilista #3739 mainissa + natiivi 5ca7411c junassa.

## Taustat ja tilat
- Omia taustaajoja tai ajastuksia ei ole (lopetettu). Karttasepän S2-vienti ja mosaiikit ovat hänen.
- Skriptit: proto-3d/lokit/linssiseppa2-skriptit-20261001/ (helsinki-kuva.sh, alpit-kuva.sh, alus-kuva.sh, eva-kuva.sh,
  kaanna-jono.sh, pilvet*.py, reunat.py, mosaiikki2.py, tahtays.py …). Simulaattoriajot: --console-pty-loki, kuva-uusinta,
  lopuksi uninstall + shutdown omalla UDID:llä.
- Worktreet: wt/proto-linssiseppa2-saatimet (proto, haara linssiseppa2/s2-kyyti), wt/linssiseppa2-pulu-eva (#3728 luonnos).
- Opit: kameran kohde dioraamassa (X, Y, −Z); peilin hash-välimuisti ei vaihdu istunnon aikana; file://-pinta vaatii rajatun
  jaon; läpinäkyvä pinta näyttää pallon pohjavärin; UV-reunus 2 tekseliä atlaksen korteille.
