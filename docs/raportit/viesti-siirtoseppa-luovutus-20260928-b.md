# Luovutus: Siirtoseppä, 28.9.2026 klo 14.5x (kontekstin nollaus, Päätoimittajan käsky)

Korvaa luovutuksen `-20260926.md` tilaosion. Sen "Voimassa olevat työtavat" ja "Velat ja opetukset" ovat yhä voimassa.
Päätoimittaja (entinen Fable) on session local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31. Tuotanto v269, skeema 1.55.

## Junassa (Julkaisija), tarkista ämpäri jokaisen mergen jälkeen

- **#3530 mediaKuvat: vanhentuneet pienet uusiksi.** 22 % pienistä oli 1.52:n kokoa (1280/80), ja --varmista vertaa
  nyt kokoa (yli 1,2 × kirjattu → tehdään uudelleen samaan polkuun). Mergen jälkeen:
  - CI-lokista rivi `mediakuvat: N vanhentunutta`
  - otos ämpäristä (kirjattu vs. content-length)
  - aikaraja voi jättää osan seuraavaan ajoon
- **#3531 skeema 1.56:** kerma, reliefi ja yövalot offline-lataukseen; tavuja.offline = levykoko (rajauslaatikko + 4 kt
  lohkot), tavuja.siirto; maan maaston keskikoot maittain (offline.mjs --paivita-maasto, --paivita-kerrokset).
  - Natiiviseppä kuittasi, Päätoimittaja hyväksyi; maasto pysyy täytenä (Eurooppa ~1,75 Gt siirto #3530:n jälkeen).
  - Natiivi proto `siirtoseppa/offline-kerrokset` c260d593 + 31da7b02 on junassa juna/b13 → 1.0.35+.
  - Mergen jälkeen: uusin.json skeemaversio 1.56, offline.json maat.DNK.kerma + tavuja.siirto, eheysvartija.
- **#3538 muutosrivi:** osoittimen kokoelmaSha. Seuraavasta versiosta lähtien muutos.teksti nimeää muuttuneet
  kokoelmat (Natiivi-UI:n päivityslappu). Tarkista mergen jälkeen toisen viennin uusin.json muutos.teksti.
- **#3558 Maapallon vuosi -linssin runko** (f6647e8eb; ks. alla). Korjattu junan kaatumisesta: SHELL + rekisteririvi pois.

Natiivi proto `siirtoseppa/paketti-sama-versio` dbc9fd7d (laiskasti luettu sama versio käyttöön heti) on junassa
juna/b13 → 1.0.35.

## Maapallon vuosi -linssi (omistaja 28.9. klo 13.17, Päätoimittajan erä)

- Web: js/linssit/maapallon-vuosi.js + kehityssivu maapallon-vuosi.html (?kk=&kerros=&peitto=&pyori=0; paikallisesti
  ?ampari=koe-data/ampari, koska ämpäri ei anna CORS-lupaa localhostille).
  - Globe.gl-pallo, kuukausiliuku 650 ms smoothstep-häivytyksellä (alkaa kuvan latauduttua), toisto 1 400 ms.
  - kokoPallonKorkeus (vara 1,12).
  - Pohja ja kerros yhdistetään canvasilla pallon omaan tekstuuriin.
- Data ämpärissä (omistaja hyväksyi 14.03):
  - BMNG data/bmng/<kk>-4096.jpg
  - Karttasepän data/maapallon-vuosi/kerrokset.json (max-age 300): ndvi, lumi, sst, sade, pilvet, palot × 12 kk PNG
    (immutable)
  - Uusi värikansio = pelkkä luettelon osoite-kentän muutos.
  - CORS GET ravelius.github.io + matkakirja.app OK.
- **Rekisteririvi EI vielä:** se muuttaa natiivin kultaista linssijälkeä (tools/natiivi-kultaiset/tee-linssijalki.mjs).
  Päätoimittaja: rivi samaan erään Linssiseppä 2:n natiivin kanssa. Linssiseppä 2 kertoo tilan (hiomassa/valmis) ja
  ikonipolun, ja silloin teet webin rivin ja tiivisteet yhdessä.
- Kuvasarja: proto-3d/lokit/siirtoseppa-maapallon-vuosi-20260928/ (kooste-lumi.jpg sininen lumi, kooste-ndvi.jpg).
- Linssiseppä 2: natiivi seuraa webin arvoja. Erot: aloituskorkeus kulmavaralla 0,92; kerros odottaa omaa kuvaansa.
  Yhtenäistetään kuvaparin jälkeen tarvittaessa.
- Paikallinen koe-data: wt/siirtoseppa-maapallon-vuosi/koe-data/ (symlinkit, .git/info/exclude). Launch-konfiguraatio
  "maapallon-vuosi" (portti 8791) on .claude/launch.json:ssa.

## ISS-realismi webiin — KOODATTU, odottaa GPU:ta ja Pelikoodarin mergeä

- Haara `siirtoseppa-iss-realismi` e33462dce, Pelikoodarin `pelikoodari-iss-kyyti` aa80fc1ea:n päällä.
  - PR vasta, kun hänen haaransa on mainissa (odottaa #3526:tä ja selite-erää). Ei pinottuja PR:iä.
- js/linssit/iss-realismi.js: elinkaari, aurinko simuloidusta ms:stä, korvaa-liput, ab(nimi).
- js/linssit/iss-realismi-kerrokset.js: natiivin varjostimet GLSL:ksi samoin vakioin. Lähteenä Linssisepän proto
  `linssiseppa/iss-kyyti` 411b0bc7 ja suunnitelma `origin/linssiseppa-tyo-20260923:docs/raportit/iss-realismi-suunnitelma-20260928.md`.
  - pilvet: data/pilvet/uusin.png → pilvikuvanAlfa, 8 km, järjestys 2
  - yokuori: Yokuori.shader (valot, kiilto, varjo, vesi yöllä), 2,8, esikerrottu
  - revontulet: OVATION, 2,9, lisäävä
  - ilmakaari: kaari + usva + hämärä + ilmahehku, 3
- Kytketty satelliitti-avaruus.js:ään. Testit 107/0 (iss-realismi, iss-kyyti, satelliitti, astro-sumu, dokumentit).
- **TODENTAMATTA:** GLSL:n kääntyminen ja kuva ruudulla, koska GPU oli varattu omistajalle (Postivahti). Kun GPU on vapaa:
  - aja kyyti Euroopan yöhön ja päivään
  - tarkista konsoli (ISS-realismi-varoitukset) ja realismi.tila()
  - ota web–natiivi-kuvaparit laitekuvia vastaan (proto-3d/lokit/linssiseppa-laite-20260928-cl5/: hamara-seuranta-*,
    yo-seuranta-hehku-*, paiva-*)
  - kuvat Päätoimittajalle
- Huom: astro-sumu ↔ satelliitti-avaruus ↔ iss-realismi-kerrokset -tuontisykli. PILVIEN_PEITTO luetaan käyttöhetkellä.
- Kohta 4 (Kuu, tähdet, vuodenaika) tulee Linssiseppä 2:lta. Kaupunkien valot ovat Siirtosepän (Pelikoodari luovutti).

## Muut tämän vuoron tulokset

- #3523 (offline-maasto natiivin sarjasta) tuotannossa v260: 127 maata sai maaston.
- E2E-offline Tanska + Kroatia × 2 (raportti docs/raportit/siirtoseppa-e2e-offline-20260928.md). Natiivin offline-kuvat
  (Natiiviseppä 4d4b41f6) PASS. Peli poistettu F989814A:sta (Päätoimittaja: levy).
- Geysir: vienti kunnossa (kaikilla 17 ISL-kohteella lat/lon). Natiivin NostoKerros-portti → Natiiviseppä/Linssiseppä.
- Natiiviseppä: kerman 404 offline-tilassa läpinäkyväksi (hänen jonossaan).

## Worktreet (poista mergen jälkeen: sh uw.sh --poista siirtoseppa-<aihe>; proto: git worktree remove)

wt/siirtoseppa-{offline-kerrokset, pienet-uusiksi, muutosrivi, maapallon-vuosi, iss-realismi};
proto: wt/proto-siirtoseppa-{kerrokset, paketti}.

## Opetukset tästä vuorosta

- Kokoarviot: maailman otos aliarvioi maan laatat (meri). Mittaa maittain ladattavista (maastoMaista).
- Kultainen linssijälki sisältää rekisterin, joten uusi rivi on natiivin kanssa yhteinen muutos.
- ÄLÄ aja `git checkout <haara> -- .` worktreessä tarkistukseen: se kirjoittaa työpuun yli (palautus HEADista).
- Kerroskuvien canvas vaatii CORSin: kehityksessä paikallinen ämpärin peili, tuotannossa GET-otsake on kunnossa.
