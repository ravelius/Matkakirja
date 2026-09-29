# Luovutus: Siirtoseppä, 29.9.2026 klo 05.1x (kontekstin nollaus, Päätoimittajan käsky)

Korvaa luovutuksen `-20260928-b.md` tilaosion. Luovutuksen `-20260926.md` osiot "Voimassa olevat työtavat" ja
"Velat ja opetukset" ovat yhä voimassa. Päätoimittaja on session local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31.

## Kärki: ISS-säätöpaneeli #3595 junaan

- PR https://github.com/ravelius/Matkakirja/pull/3595 (haara siirtoseppa-iss-paneeli-2, f8822e465, mainin päällä).
  - Omistaja kortilla "Kelpaa".
  - Testit 128/0.
  - Oma sijainti testattu oikeaa verkkoa vasten (loc=FI → "Oma sijainti · Suomi", hakupiste 51 N / 24,938 E), tulos
    PR:ssä.
- **Aja ensin savuke-iss-kyyti mainin päällä** (`PORTTI=877x`, GPU vapaa, nice 15). Edellinen 49/49 oli ennen
  mainin päälle nostoa (19037db35). css/satelliitti.css:n lopun ristiriita Pelikoodarin .astro-paneelin kanssa
  ratkaistiin säilyttämällä molemmat.
- Pyydä Julkaisijalta junaan ja tarkista merge.
- Natiivi (Linssiseppä 2) tekee saman mallin: välilehdet Nopeus | Kohde | Olosuhteet, 320/360, 9-slice.
  - Ero: webin Oma sijainti käyttää pääkaupunkia (MAAKARTAT), natiivi maan keskipistettä.
  - Hakupiste on sama, kun leveys on yli 56°. Mainitse, jos Linssiseppä 2 kysyy.

## Tällä vuorolla mainiin

- #3586 ISS-realismi web: kohdat 1–4, terävät pilvet 2b, R8-pilvet 4096, valot 60 %, kyytipeitto 0,9.
- #3587 Cupola 3 (pehmea-umpi-kuvat, iPad bg-position y 6,5 %). Natiivi c2645317 + Linssisepän jälkikäsittely.
- #3538 muutosrivi, #3530 pienet uusiksi (otos 40/40 kunnossa), #3531 skeema 1.56 (tuotannossa v279+).
- Tarkista ämpäri #3586:n ja #3587:n viennin jälkeen (eheysvartija, uusin.json).

## Auki

- #3583 maakuntakortti nostojen kokoiseksi + kuva suurennokseen: junassa, Päätoimittaja hyväksyi.
  - Mininosto (pikkukuva, väri, kehys) on natiivin → Natiivi-UI. Webin luonnehdintaan ei lisätä kuvaa.
- Kerma-404 (Natiiviseppä 306134ee) E2E PASS: _maailma z3–z5 -hakuja 0 (ennen 87), menee natiivin junaan 1.0.39:n
  jälkeen. Raportti viesteissä, lokit proto-3d/lokit/siirtoseppa-e2e-kerma404-20260928/.
- Worktreet: poista mergen jälkeen `sh uw.sh --poista siirtoseppa-<aihe>`.
  - Jäljellä: iss-realismi-3 (mergetty → poista), cupola3 (mergetty → poista), maakuntanosto (#3583),
    iss-paneeli (vanha, korvattu → poista), iss-paneeli-2 (#3595), muutosrivi (mergetty → poista).

## Opetukset tästä vuorosta

- Omistajan linjaus 28.9. klo 23.3x: rajatut tehtävät Sonnet-ali-agentille (Agent, model sonnet, effort high/max).
  Rooli todentaa ja julkaisee. Ali-agentti ei käytä simulaattoria, käännöspalvelua eikä tuotannon workeria.
- WebKit ei venytä taustakuvana käytettyä SVG:tä kuvasuhdettaan vastaan (`background-size: 100% 100%`). Codexin
  kilvet 9-slice-border-imagena (sprites.json-rajat).
- SwiftShader-Chromium (`--use-angle=swiftshader --enable-unsafe-swiftshader`) todentaa GLSL:n ilman GPU:ta
  (skripti scratchpadissa, katosi; pohja tools/savukkeet/savuke-iss-kyyti.mjs + SIMUKELLO.kelaaHetkeen).
- sisaltopaketti.test voi kestää koneen kuormassa 390 s: älä aja 120 s:n timeoutilla. Savukkeen oletusportti 8763
  voi olla varattu → PORTTI.
- Web ja natiivi: kun viestit menevät ristiin, lähetä yksi LOPULLINEN-viesti, johon päätös lukitaan.
- Web-asset-SVG:t eivät ole sw.js:n SHELLissä (testi valvoo vain js-moduuleja). Paneelin kuvien offline-välimuisti
  on ajonaikainen.
