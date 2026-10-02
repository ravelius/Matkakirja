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

## 2. Juna 132 (kääntämättä/odottaa vuoroa)

- `linssiseppa2/pulu-mittaus` (829c3dd4 + kommenttisiirto): Pulun AlaVara mitataan uudelleen 1,5 s näkymän vaihdon jälkeen
  (puomi jäi ajoituksesta riippuen pienen paneelin ISS-lukeman päälle, kuva 377bb8a3). Juna 131:n piilevä vika, Päätoimittaja tietää.
- `linssiseppa2/pulu-vaaka-alas` 3657309b (sis. pulu-mittaus): Päätoimittajan tilaus "Pulu vaakana alemmas, käsi ei paneeliin" →
  Pulu turva-alueen alareunaan + puomi nousee pienen paneelin vasemman yläkulman yli 6 pt:n välillä (LiviaKuva.VarrenEste,
  A/B `astro kyyti pulualas 0|1`). Ensimmäinen A/B 377bb8a3: puomi nousee oikein; Pulun korkeus ei vielä eronnut (ajoitusvika).
  SEURAAVAKSI: käännös (Julkaisija: TF 131 -vienti pitää lukkoa ~01.25 asti, olen 1. jonossa) → skripti
  lokit/linssiseppa2-skriptit-20261001/pulu-vaaka.sh → yksi suositus kuvan kanssa Päätoimittajalle.
- `linssiseppa2/kaiku-suunta` 20c4b0d9: ajattelijoiden kaikukuva näyte (u, v) (web #3888), TODENNETTU 377bb8a3:lla Blender v10
  -otsaa vasten (lokit/linssiseppa2-kaiku-suunta-20261003). Merge-pyyntö Natiivisepälle junaan 132.

## 3. Ajattelijat natiivissa, jono (web malli, tee kun web mainissa)

- Sokrateen kierrokset 2–3 (#3884): `kierrokset`-kenttä, yksi 111 s raita, loppu 3330, lista[] (paalause 21d/49b, sivulta-säde,
  vieritys, lähde, virta, siemen, kaiku), kamera[] Blender-avaimet Hermite AUTO_CLAMPED (js/linssit/ajattelija.js kamerakayra),
  yksi kaikupaikka tekstuuri kierroksittain, aurinko hiipuu kaiun ajaksi, lappu 3330. Kuvat proto-3d/lokit/pelikoodari-sokrates-kierrokset-20261002.
- #3891 + omistaja 3.10. 00.0x: ✕ piilossa kunnes napautus, häipyy 4 s (webin AUTO_HILJAA_MS; Päätoimittaja sanoi ~3 s, web voittaa);
  kytkimen napsahdus äänitteeksi ajattelijat/yhteiset/v2/kytkin-kaiku.mp3; taustavirta.nopeus { mms 25, vaihtelu 0,15 }
  (uv/ruutu = mms/1000 × kerroin/30/(kork × laatan lev px/laatan kork px), kertoimet tasavälein 0,85–1,15 sekoitettuna siemenellä);
  kamera-avaimet Linnanrakentajan v11.
- Platon datana, kun web saa sen (muunnin tyokalut/ajattelijat-natiiviin.mjs).

## 4. Muut
- Lokeissa vain uusin .app: proto-3d/lokit/linssiseppa2-astro-app-<sha>.
- Proto-worktreet: wt/proto-linssiseppa2-astro (haara pulu-mittaus), wt/proto-linssiseppa2-pulu-vaaka, wt/proto-linssiseppa2-ajattelijat
  (haara kaiku-suunta).
