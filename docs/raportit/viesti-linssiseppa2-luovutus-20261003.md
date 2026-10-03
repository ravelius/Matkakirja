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

## 2. Juna 132: MERGE-PYYNNÖT NATIIVISEPÄLLÄ (3.10. klo 04.0x), rooli levossa

- `linssiseppa2/pulu-vaaka-alas` 07e7ecca (sis. pulu-mittaus): Pulu puomin piirretystä alareunasta 6 pt pöydän yläpuolelle; vaakana
  kypärä 67 % ja puomi nousee pienen paneelin yli (A/B `astro kyyti pulualas 0|1`). Kuitattu (vaihtoehto B).
  Pystyosan lyhennys vain, jos omistaja pyytää Pulua alemmas TF 132:n jälkeen.
- `linssiseppa2/ajattelijat-v11` d3fcd459 (sis. kierrokset 18df338f + kaiku-suunta 20c4b0d9 + master BUILD 131): Sokrateen ja
  Marcuksen kierrokset 2–3, taustavirta 25 mm/s ±15 %, ✕ KUVANÄKYMÄ-pohjalla piilossa napautukseen asti (4 s; Päätoimittaja: pyöreä ✕
  on tarkoitus, 0f703701:n "ei omaa pyöreää ✕:ää" oli ylitulkinta), v11-luvut + intro.tayte, kytkinääni v2. Auringon normalisointi
  ennallaan (web palautti). Kuvat lokit/linssiseppa2-ajattelijat-v11-20261003/merkinnat-*.png.
- Webin vertailukuvat: lokit/linssiseppa2-ajattelijat-v11-web-20261003 (skripti ajattelija-webkuvat-v11.mjs). Natiivin skriptit
  ajattelija-v11.sh / -v11-x.sh (✕-kuvaan ≥ 1,5 s odotus: ui-komento käsitellään viiveellä).

## 3. Seuraavaksi
- Platon datana, kun web saa sen (muunnin tyokalut/ajattelijat-natiiviin.mjs).
- TF 132:n palaute (Pulun korkeus, ajattelijat).
- Sokrateen lopullinen kertoja (Iv4 William) ämpärissä ajattelijat/sokrates/v3/kertoja.mp3 + ajat.json (Sisältökirjuri 3.10.;
  ei v2:een). Natiiviin vasta, kun webin data viittaa siihen: aja muunnin webin mainista ja peilaa uusi raita ajoon.

## 4. Muut
- Lokeissa vain uusin .app: proto-3d/lokit/linssiseppa2-astro-app-<sha>.
- Proto-worktreet: wt/proto-linssiseppa2-astro (haara pulu-mittaus), wt/proto-linssiseppa2-pulu-vaaka, wt/proto-linssiseppa2-ajattelijat
  (haara kaiku-suunta).
