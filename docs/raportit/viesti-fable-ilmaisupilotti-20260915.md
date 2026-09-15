# Viesti Fablelle: ilmaisupilotin generointi 15.9.2026


Opus-työagentti. Kolme erää ajettu yksi kerrallaan. Erät 1 ja 2 menivät läpi ja ovat mitattuina kunnossa; erä 3 (kertojan saapumisnimet) kaatui ajon esitarkistukseen ENNEN yhtäkään API-kutsua — mitään ei veloitettu eikä uusittu. Kuuntelu on omistajan tehtävä.

### Ajot

- Erä 1, Livian kuusi ilmaisukoetta: https://github.com/ravelius/Matkakirja/actions/runs/34922759755 — conclusion **success** (02:51:17 → 02:53:15 UTC)
- Erä 2, Sofian ja Venetsian iskulauseet: https://github.com/ravelius/Matkakirja/actions/runs/34922961465 — conclusion **success**
- Erä 3, saapumisnimet kertojan äänellä: https://github.com/ravelius/Matkakirja/actions/runs/34923063972 — conclusion **failure**, ei maksua

Kaikissa: haara codex/livia-ilmaisu-20260914, head_sha 2068c51061e834d4427a76dafb73e6f78819b70f (omistajan vaatima commit), toiminto=generoi, malli=eleven_v3, vakaus=natural, pakota=ei, haku/kuitti/retry_reason tyhjät.

### Completed-kuitit (kaikki HTTP 200 paitsi erä 3)

- Erä 1: https://media.matkakirja.app/aanet/pulu/kuitit/pulu-e9238a4e21558e7a245e.completed.json — batchId täsmää odotettuun, 6/6 generated, generationStatus completed
- Erä 2: https://media.matkakirja.app/aanet/pulu/kuitit/pulu-f41f77c89c56eee08fe8.completed.json — batchId täsmää odotettuun, 2/2 generated, generationStatus completed
- Erä 3: pulu-a9d7b33c0d3215857ee9 — sekä .planned.json että .completed.json HTTP **404**. Kuittia ei synny, koska ajo pysähtyi ennen suunnitelmakuittia ja ennen verkkokutsuja.

### Mitattu (ei arvattu)

Latasin jokaisesta kahdeksasta repliikistä sekä raaka- että final-tiedoston ja laskin sha256:t itse:

- raaka sha256 = final sha256 kaikilla 8:lla (ei uudelleenkoodausta, sama tavujono)
- HTTP 200 kaikkiin 16 osoitteeseen (8 raakaa + 8 final)
- ID3/muxer-tunniste jokaisessa vain **Lavf60.16.101** — ei Lavc-, ei LAME-jälkeä, eli ffmpeg ei ole koodannut ääntä uudelleen
- ulostulomuoto mp3_44100_192 (192 kbps) kaikissa kuitin riveissä
- ajon loki: "jälkikäsittely: EI MITÄÄN — mallin mp3 sellaisenaan, sama sha256 raaka- ja final-avaimessa" ja "ei käsittelyä (omistaja 14.9.2026)" jokaisen repliikin kohdalla
- postprocess: {"kind":"none"} kaikilla riveillä; promotionStatus pending-code-deploy (live-avaimia ei muutettu)
- raakavienti aanet/pulu/raaka/<batchId>/ tehty ja HEAD 200

### Kahdeksan kuuntelulinkkiä

Livian kuusi ilmaisukoetta (ääni piI8Kku0DcvcL6TTSeQt, flicker):

- ilmaisu-istanbul-3 — 13,871 s, 333 575 tavua, sha256 6a08d2e48f75deceb78f55d43cb48ca5be8cad2c25b5407e243f1f6060f735e3
  https://media.matkakirja.app/aanet/pulu/versiot/2068c51061e8/pulu-e9238a4e21558e7a245e/livia-ilmaisu-istanbul-3.mp3
- ilmaisu-helsinki-3 — 17,789 s, 427 616 tavua, sha256 abd5df59f0a58a3b60df5b2890e3d6a16f2d8e2ef1aa14895a3b87893688e643
  https://media.matkakirja.app/aanet/pulu/versiot/2068c51061e8/pulu-e9238a4e21558e7a245e/livia-ilmaisu-helsinki-3.mp3
- ilmaisu-berliini-3 — 22,909 s, 550 496 tavua, sha256 e7710b439ade9d0202d9de66598da1abefba2eee7a6b5d13fadde475e86526c0
  https://media.matkakirja.app/aanet/pulu/versiot/2068c51061e8/pulu-e9238a4e21558e7a245e/livia-ilmaisu-berliini-3.mp3
- ilmaisu-amsterdam-3 — 22,909 s, 550 496 tavua, sha256 8673f653999738c6a359e1643b131ed1d1ddcd0400280046c22150110531b621
  https://media.matkakirja.app/aanet/pulu/versiot/2068c51061e8/pulu-e9238a4e21558e7a245e/livia-ilmaisu-amsterdam-3.mp3
- ilmaisu-tampere-3 — 16,509 s, 396 896 tavua, sha256 2cda6990533399b94aa92ca1c65e7784385e52f5bbfc957da27b15464637c843
  https://media.matkakirja.app/aanet/pulu/versiot/2068c51061e8/pulu-e9238a4e21558e7a245e/livia-ilmaisu-tampere-3.mp3
- ilmaisu-barcelona-3 — 12,669 s, 304 736 tavua, sha256 7890f44b8845684f923fc2265b3d7567a990916c139c31635cbe5ab6b39ffd02
  https://media.matkakirja.app/aanet/pulu/versiot/2068c51061e8/pulu-e9238a4e21558e7a245e/livia-ilmaisu-barcelona-3.mp3

Huomio berliini/amsterdam: kesto ja tavumäärä ovat sattumalta samat, mutta sha256:t eroavat ja tekstit ovat eri — kyse ei ole samasta tiedostosta kahdesti. Varmistin lataamalla molemmat erikseen.

Kaksi Livian iskulausetta (ääni piI8Kku0DcvcL6TTSeQt, flicker):

- iskulause-sofia — 2,586 s, 62 737 tavua, sha256 3e61941453a0cbe86aff76437b9b3cc30a32059142701fbedcb3702df55021c1
  "Kuumia lähteitä keskellä kaupunkia!"
  https://media.matkakirja.app/aanet/pulu/versiot/2068c51061e8/pulu-f41f77c89c56eee08fe8/livia-iskulause-sofia.mp3
- iskulause-venetsia — 5,642 s, 136 089 tavua, sha256 915612e4fc95ff51edd4c24066e7b3f8b830467d585ae027cda1b655ea5de83e
  "Täällä kadut ovat vettä. Ja minulla on tuttu."
  https://media.matkakirja.app/aanet/pulu/versiot/2068c51061e8/pulu-f41f77c89c56eee08fe8/livia-iskulause-venetsia.mp3

### Puuttuvat kaksi: saapumisnimi-sofia ja saapumisnimi-venetsia

Ajo pysähtyi askeleeseen "Kuiva ajo (repliikit ja kestot)" tähän virheeseen:

> kertojan saapumisnimi vaatii voice_id:n Sz0tRTEpybtDJ9ru2kgD, sai piI8Kku0DcvcL6TTSeQt. Ajo keskeytettiin ennen kuittia ja verkkokutsuja.

Syy ei ole väärä syöte: annoin aani=Sz0tRTEpybtDJ9ru2kgD niin kuin ohjeessa. Kyse on workflow'n askeleesta .github/workflows/generoi-pulu.yml riveillä 248–260 (haarassa codex/livia-ilmaisu-20260914): kuivan ajon askel välittää tools/generoi-pulu.mjs:lle vain REPLIIKIT, PULU_MALLI ja PULU_VAKAUS — ei AANIa. Työkalu käyttää siis kuivassa ajossa oletusääntä flicker, ja saapumisnimien äänilukko (tools/generoi-pulu.mjs rivit 1083–1091) hylkää sen. Maksullinen askel, joka saisi oikean äänen, ei ehdi koskaan käynnistyä.

Korjaus on yhden rivin lisäys kuivan ajon env-lohkoon (AANI: ${{ inputs.aani }}) ja --aani "$AANI" komentoriville, mutta se on muutos Codexin haaran workflow'hun enkä tee sitä omin päin. En myöskään uusinut ajoa: identtinen uusinta kaatuisi identtisesti, eikä sokko uusinta kuulu tehtävääni. Kaksi saapumisnimeä jäävät siis generoimatta, kunnes workflow korjataan — mikään ei ole veloittunut eikä puoliksi tehtynä ämpärissä.

Erän 3 kohdalla ei ole osittaista tulosta: ämpärissä ei ole yhtäkään tiedostoa eikä kuittia tunnuksella pulu-a9d7b33c0d3215857ee9.

### Rajaukset pidetty

Ei muita ajoja: ei loppu38-erää, ei 43:a saapumisparia, ei pulu-bab26ef7:n (hyväksytyt sofia-3/venetsia-3) uusintaa. Ei muutoksia pelin dataan, Raamattuun, versionumeroon; ei mergejä; ei avaimia lokiin. Äänten käyttö peliin on Codexin linjauksen mukaan eri vaihe.

