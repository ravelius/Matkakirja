# Julkaisijan luovutus 12.10.2026 ilta (~19.2x, tilinvaihto tulossa)

Loki: `/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt` (tail -120; kellonajat `date`-komennosta). Edellinen luovutus
`viesti-julkaisija-luovutus-20261011-yo.md`. PT: session `local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc` (jos SendMessage nimellä ei
löydy → `mcp__ccd_session_mgmt__send_message` session_id:llä). Asemataulu: https://claude.ai/artifact/Rq5ajPU4SraE2XKd7BYAix.

## 0. Uudet pysyvät säännöt (omistaja 12.10.)

- **VAATII TOIMIA → Asemataulu heti:** omistajan toimia vaativa kysymys = ArtifactData set, collection `talo`, doc_id
  `toimi-julkaisija`, {rooli, kysymys, ts}. Epäonnistuu → viesti Postivahdille "VAATII TOIMIA: Julkaisija: …". Hoidettu → get + delete
  (if_version).
- **Kuvat omistajalle TÄYDELLÄ resoluutiolla:** yksittäin tai parina natiivikorkeudella. Ei pienennettyjä monikuva-arkkeja; jos työkalu
  tekee arkin, täysikokoiset kuvat mukaan.
- Julkaisu (junan web-merget + TF) vain "OMISTAJA PYYSI JULKAISUA" jälkeen.

## 1. Junat

- **Juna 183 VALMIS ja julkaistu:** TF iOS 38245544819, sisäinen + Testattavaa, ulkoinen, beta-arvio APPROVED, 182 vanhennettu, Mac 183
  (NS). Asemataulu talo/eteneminen v18 "5/5 VALMIS".
- **EI 183.1:tä** (omistaja): ISS-ohjaamon jumin korjaus tulee junan 184 mukana. Numero 184 jää normaalille junalle.
- **Junan 184 web-jono (mergetään vasta PT:n käskystä / omistajan julkaisupyynnöstä):** #4469 → #4470 (base sisaltokirjuri-kaari-data
  → retarget mainiin #4469:n jälkeen) → #4475; #4482, #4486 (KS, head d431113e5), #4487; SK #4514 (Rita – EI ennen Pelikoodarin ääntä),
  #4516, #4517, #4518.

## 2. Tänään mergetty / julkaistu (tiedoksi)

- Worker #4509 f4c9c0fed (retkikunta/eroa) + sahke-worker 38253993793; #4513 c30f29790 (pallot, Durable Object PalloHuone, migraatio
  v1-pallot puhtaasti lisäävä) + sahke-worker 38258771693, Version 3f831c26.
- Docs #4515 260978ec7; #4510 d7dbd3526, #4511 30e9b734c, #4512 58ccba87d (**käsin merge --match-head-commit: SK:n haaroille ei tule
  CI:tä lainkaan**, ei edes tyhjällä commitilla – merge-vihreana-sha.zsh jää odottamaan ikuisesti).
- **#4501 (pallot-suunnitelma, docs) AVOIN:** head muuttui (e9585a633), vanha odottaja pysäytetty – kysy PT:ltä ennen mergeä.
- **Cesium-tunnus vaihdettu** (PT 19.1x): pollo-julkaisu 38274250818, Version ebf26ad5; /opas/tunnus natiivi 200 / selain 403,
  tiiviste edd80992 → c915d11e (`julkaisija-tyokalut/cesium-tarkistus.zsh x-matkakirja-natiivi app.matkakirja.proto3d`, ei tulosta
  tunnusta). Macin avaintiedoston CESIUM_ION_TOKEN jää vanhalle tilille (kehitystestit).
- Viennit: taidemuseo-alankomaat-v5b 37/0 (18.10). KS vuoristo-pilotti-2 ja -3 viety.

## 3. vie-paketti.sh muutokset tänään (varmuuskopiot samassa kansiossa)

- `.terrain` → `--content-encoding gzip` + gzip-taikatarkistus; tarkistus `curl --compressed` vs. `gzip -dc | shasum` (.ennen-gzip-20261012).
- aws s3 cp 3 yritystä + `vaihe`-kenttä KESKEYTYI-riviin (KS:n osat kuolivat paluuarvoon 139 kuormassa) (.ennen-uusinta-20261012).
- Aiemmin: SIGPIPE-korjaus ääniporttiin, EXIT/TERM-trap, curl `|| true`. tf-kaynnista.sh sed vaatii numeron (`build_numero=[0-9][0-9]*`).

## 4. Olavinlinna ja MH-kuvat

- Vahti pid 58074 (setsid). Lista: laituri-varoitus, **v48r**, aanet, olavinlinna-181, tyrma-tapahtumat, kadet-oikealle, msaa-183.
  Vahti ei käännä samoja kärkiä uudelleen kaatumisen jälkeen (esim. levyvika) → käsin: `mh-kierros2.zsh` malli.
- Siirtoseppä: botti 167be0bfc 15/17; korjaukset **986f1b23e** → vahti kääntää linjalla 1 → SIMU NYT 1 botille (odottaja oli Bash-taustana,
  kuolee tilinvaihdossa: tarkista `grep 986f1b23e olavinlinna-vahti.log`).
- **MH-kuvat omistajalle:** vertailupuoli `lokit/olavinlinna-mh-v48o-1012-1848` (c62e3727f + v48o, kuitattu). Uusi puoli = LR:n **v48s**:
  kun Siirtoseppä ilmoittaa, vaihda v48s vahdin listaan v48r:n tilalle (sed + mv). Vanhat mh-v48o-1012-1652/1820 ja mh-v48r-1619/1644/1812
  saa siivota, kun Siirtoseppä sanoo MH VALMIS lopullisesti.
- LT:n Olavinlinna 5 odottaa PT:n askel 0 -arkin kuittausta (hiljainen ikkuna, kuorma < 100).

## 5. Linjat ja jono tilinvaihdon hetkellä (19.2x)

- L1: LS2 **d502a7e5d** (PT:n kiireellinen Cesium-istuntokorjaus + raketti v2 + museon lepo-esto) 19.13- → simu ~22 min omalla iPadilla
  A26BC7D0. Sen jälkeen vahti 986f1b23e.
- L2: Pelikoodari **pulu-vastaukset-184 38a945444** (KÄÄNNÖS + SIMU NYT 19.17) → simu ~8 min PT:n kuviin.
- LS1: pallokierros-184 käännetty 1344b49cc (19.16); `simu-pallokierros.nyt` avattu 19.17 (kuormaportti < 40 pitää).
- Jono: NUI pallokisa-184 7ed08d802 → NUI yhdistelmä (apuraha-184b 971b8d64d + mac-vieritys + lehtinostot + kaiutin-tauko + raha-animaatio,
  app `lokit/natiivi-ui-app-yhd184`) → **NS:n apurahatodiste sillä apilla SIMU 8 min ennen NUI:n omia simuja** → LS1 pallokisa-184 cfb100db5
  (portti kaannos-pallokisa.nyt) → NUI 184-testi, aarre-lajit, asettelutesti (kevyt kuorma).
- LT: pallokisa-uusinta 2 odottaa Pelikoodarin korjausta (yhteislähtö aikaleima, noudot) + uutta appia; ISS-appi; Olavinlinna 5.
- LS2: vuoristopilotti-3 a92eae413 (KS:n data ämpärissä) kun pyytää.
- NUI ISS 516bb285a käännetty 19.13 (simut ajossa).

## 6. Opit tältä päivältä

- **Levy:** käännösraja 25 Gt; swap (12–18 Gt) vie samaa levyä. Kaksi kaatumista (NUI ISS, vahti 18.10). PT:n siivous → ~90 Gt.
  Siivouksessa poistui `wt/proto-natiiviseppa-tyokalut` (80 skriptiä nojaa; NS palautti: natiiviseppa/todistusajo-kuittaus 80d418513).
- **Simuraja:** swap > 12 Gt → 2 simua, muuten 4. Laitesekaannus: LS2:n skriptit käyttivät NS:n iPadia D61642C8 (korjattu A26BC7D0:aan).
- **Paistoikkuna:** linjat vapaana hetken → joku käynnistää käännöksen; ikkunan alussa pidä taukolippu ja kerro rooleille etukäteen.
- **GitHub-häiriö 16.0x–16.5x:** PR-tapahtumat hävisivät; sulje/avaa ei auttanut. Docs-PR:t → käsin merge (kohta 2).
- Monen roolin käyttöraja täyttyi illalla (LS1, KS, Pelikoodari, Siirtoseppä palasivat osin): tarkista roolin tila ennen NYT-viestiä.
