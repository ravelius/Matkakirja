# Linssiseppä 2:n luovutus 3.10.2026 (klo 00.3x)

Edellinen: viesti-linssiseppa2-luovutus-20261002.md. Päätoimittaja local_5df52e10-10e4-4b72-9554-0049db300dfe (tili vaihtui 2.10.).
VUOROT: käännös- JA simuvuoro aina Julkaisijalta ennen lukkoa/bootia ("NYT käännös", "simu sinulle"); lopuksi "KÄÄNNETTY <sha>"
ja "simu vapaa". Skriptien ehto `n == 0` (1 simu kerrallaan myös yöllä).

## 1. Astro-palaute: VALMIS, juna 131

Haara proto `linssiseppa2/astro-palaute` kärki 03f0872e (käännös caa1b719), Päätoimittaja kuittasi 3.10. 00.1x, merge-pyyntö
Natiivisepälle lähetetty (Kartta 442/442, Peli 387/387, Linssit 572/572, unity-tarkistus 0). Kuvat
proto-3d/lokit/linssiseppa2-astro-palaute-d-20261003/merkinnat-{pysty,vaaka}.png. Kuvatarkistuksen korjaukset: A Pulu häivytetään
suuren paneelin ajaksi (Pulu.Haivyta), C kasvot kasvovalon päälle, D POISTU-× 22 pt lihavoitu, E2 maapallo iPhone vaaka
vasempaan alakulmaan saaren alle (Sijaintipallo.SijoitaKulmaan, layoutista; kulma 62 pt oletus), pikkukuvat sen oikealle.
Seurantanäkymää ei ole (omistaja poisti 2.10.).

## 2. Juna 132 (tila 3.10. 01.2x): MERGE-PYYNNÖT NATIIVISEPÄLLÄ

- `linssiseppa2/ajattelijat-kierrokset` 18df338f (sis. kaiku-suunta 20c4b0d9): Sokrateen kierrokset 2–3 (web #3884) natiivissa;
  kuitattu, todennettu 4c87ada3 (lokit/linssiseppa2-ajattelijat-kierrokset-20261003), merge-pyyntö Natiivisepällä (korvaa kaiku-suunnan).
- `linssiseppa2/pulu-vaaka-alas` 07e7ecca (sis. `linssiseppa2/pulu-mittaus` 9f2deece): Pulu puomin piirretystä alareunasta 6 pt
  pöydän yläpuolelle (pysty); vaakana kypärä 67 %:n korkeudella (KyparaKorkeus 0,74 rajoittuu kyynärpään 8 pt:n väliin ruudun
  alareunaan), puomi nousee pienen paneelin yli (A/B `astro kyyti pulualas 0|1`, oletus 1). Kuitattu (vaihtoehto B), todennettu
  a7cd30f5:llä: lokit/linssiseppa2-pulu-suositus-c-20261003/merkinnat-pulu-korkeus.png. Merge-pyyntö Natiivisepällä.
  Pystyosan lyhennys vain, jos omistaja pyytää Pulua alemmas TF 132:n jälkeen (Codexin kuvan mittasuhteet).

## 3. SEURAAVAKSI: ajattelijoiden v11-erä natiiviin (kun Pelikoodarin #3888–#3892 on mainissa)

Päätoimittaja 3.10. 01.5x: (a) ✕ natiivissa astronautin kameran pyöreällä sulkunappipohjalla + piilossa napautukseen asti (4 s, sama
mekanismi kuin astron AUTO); jos pohja ei sovi → kysy Päätoimittajalta. (b) Auringon normalisointi: webin poisto oli vahinko,
Pelikoodari palautti sen #3892:een (af02da9e7) → natiivi on oikein, EI muutosta. Muut:
- #3891 + omistaja 3.10. 00.0x: ✕ piilossa kunnes napautus, häipyy 4 s (webin AUTO_HILJAA_MS; Päätoimittaja sanoi ~3 s, web voittaa);
  kytkimen napsahdus äänitteeksi ajattelijat/yhteiset/v2/kytkin-kaiku.mp3; taustavirta.nopeus { mms 25, vaihtelu 0,15 }
  (uv/ruutu = mms/1000 × kerroin/30/(kork × laatan lev px/laatan kork px), kertoimet tasavälein 0,85–1,15 sekoitettuna siemenellä);
  kamera-avaimet Linnanrakentajan v11.
- #3892 (pino #3884 → #3888 → #3891 → #3892, odottaa Päätoimittajan kuittausta): v11-alkukuvat (Linnanrakentaja d7b51a99f;
  introkamerat x = min(−|x|, −0,22): Sokrates ruutu 57 ja Marcus ruutu 51 → x −0,22; intro.valo [1, (1, −0,35, 0,45)],
  keskiavaimet (1, 0,05, 0,5), 282 ennallaan; uusi intro.tayte 0,2 = maailman täyte × kun r < ajat.nimi[0]); kaiku 1 lev 0,07 ja
  kamera.matka [0,15, 0,14]; kierrosten kamera-avaimet v11-luvuista (sokrates/marcus-luvut-v11.json, 4e9755313); Marcuksen kierrokset
  (kaiku-uhri.png, kaiku-kuolema.png, kierrokset-*.mp3, syke-kierrokset.json, ämpäri ajattelijat/marcus/v1/);
  AJATTELIJA_KYTKIN = ajattelijat/yhteiset/v2/kytkin-kaiku.mp3. Parit proto-3d/lokit/pelikoodari-ajattelijat-v11-20261003/.
- Platon datana, kun web saa sen (muunnin tyokalut/ajattelijat-natiiviin.mjs).

## 4. Muut
- Lokeissa vain uusin .app: proto-3d/lokit/linssiseppa2-astro-app-<sha>.
- Proto-worktreet: wt/proto-linssiseppa2-astro (haara pulu-mittaus), wt/proto-linssiseppa2-pulu-vaaka, wt/proto-linssiseppa2-ajattelijat
  (haara kaiku-suunta).
