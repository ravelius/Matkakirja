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

## 2b. Juna 133: MERGE-PYYNTÖ NATIIVISEPÄLLÄ (3.10. klo 07.0x)

- `linssiseppa2/iss-humina-pulu-oikea` 16c30163 (omistaja 3.10. 06.3x, Päätoimittaja kuittasi): ISS-humina ilman rätinää (NASA-radio
  pois, CupolaAani.RadioKaytossa = false; humina v2 generoitu aanet/cupola/v2/cupola-humina-gen-90s.wav, vientipaketti
  _valmiit/cupola-humina-v2-vienti-20261003 viety); robottikäden Pulu oikealla lyhyen varren päässä Cupolassa ja kaukonäkymässä
  (A/B `astro kyyti pulu-oikealla`), +30 % (0,78), vaaka-Cupolassa kypärä 64 % teipin alla; kasvot kypärävalossa
  (Resources/LiviaEva/perus-kasvot.png), Pulu valaistu (perus 75 %). Web (cupola-aani.js) → Pelikoodari (Päätoimittaja hoitaa).
  Kuvat lokit/linssiseppa2-pulu-oikea-c|d-20261003, ääninäyte lokit/linssiseppa2-cupola-humina-nayte-20s.mp3.

## 2c. Ilta 3.10. (klo 20.3x)

- Juna 133: `linssiseppa2/sokrates-v14` 649651b2 (käännös 732737e6), jonka Päätoimittaja hyväksyi; merge-pyyntö on Natiivisepällä. Sokrates v14
  natiivina (webin 088b64d0c mukaan). Kortin aikana tehdään esivalmistelu, joten napautuksesta tulee musta 26 ms:ssa ja kytkin 1,03 s:ssa.
  Leikkausruudut toimivat askelina, ja varjolevy pysyy voimassa leikkaukseen asti (AjattelijaAikajana.RuutuValilla). valahdys.py:n
  mukaan välähdyksiä on 0. Video ja ruudut ovat kansiossa lokit/linssiseppa2-sokrates-v14-g-20261003. Marcus (Linssiseppä 1) rebasaa sen päälle.
- Juna 134: `linssiseppa2/minipallo-selain` c2a10071 (7549894a), jonka Päätoimittaja hyväksyi; merge-pyyntö on Natiivisepällä. Siinä
  pyöritettävä sijaintipallo toimii kohdeselaimena, ja mukana ovat haptiikka, tic-ääni ja lukkoääni.
- Juna 134: `linssiseppa2/cupola-veto` c5e946eb on käännetty (3e863a31). Kuvaus tehdään skriptillä
  lokit/linssiseppa2-skriptit-20261001/cupola-veto.sh (APP, OUT), kun Julkaisija antaa simuvuoron. Sen jälkeen kuvat ja videot
  menevät Päätoimittajalle, ja kuittauksen jälkeen tehdään merge-pyyntö. Riski: laatat 21–25°:n kulmassa.
- Juna 133:n jälkeen: ajattelijoiden muunnin vaihdetaan Pelikoodarin tools/ajattelija-natiivi.mjs:ään (#3905). Omistajan
  linja (3.10. 19.00) on "ei webiä lainkaan".
- #3842 (avaruuskävely webiin) on suljettu ja haara säilytetty (web-jono #3908); worktree on poistettu.
- Lokien .app-kopioita ei poisteta itse (yösiivous hoitaa ne).

## 3. Seuraavaksi
- Platon datana, kun web saa sen (muunnin tyokalut/ajattelijat-natiiviin.mjs).
- TF 132:n palaute (Pulun korkeus, ajattelijat).
- Sokrateen lopullinen kertoja (Iv4 William) ämpärissä ajattelijat/sokrates/v3/kertoja.mp3 + ajat.json (Sisältökirjuri 3.10.;
  ei v2:een). Natiiviin vasta, kun webin data viittaa siihen: aja muunnin webin mainista ja peilaa uusi raita ajoon.

## 4. Muut
- Proto-worktreet: wt/proto-linssiseppa2-astro (haara pulu-mittaus), wt/proto-linssiseppa2-pulu-vaaka, wt/proto-linssiseppa2-ajattelijat
  (haara kaiku-suunta).
