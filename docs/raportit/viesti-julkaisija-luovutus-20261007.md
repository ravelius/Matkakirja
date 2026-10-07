# Julkaisijan luovutus 7.10.2026 klo 10.4x (Macin uudelleenkäynnistys ~11.05)

## PÄIVITYS 13.3x (tilin 5 h -tauko ~13.45–15.00; Päätoimittaja herättää 15.00 jälkeen)

- **TF 160**: VIE 12.5x. BUILD 160 = proto master d8b0e0fcc3c043ef8da7b6547b213c655fd2dd97 (juna/b13 2309f55d, käännös a5b381a7).
  Muutosloki #4139 merge 8b888c8d. TF-ajo 37603976295. Ryhmäketju irrotettuna (setsid): `julkaisija-tyokalut/tf160.sh`,
  loki `julkaisija-tyokalut/tf160-ketju.log` (TF → vienti ⊇ 8b888c8d → sisäinen → ulkoinen). Tarkista loki herätessä; jos
  ketju kuoli, jatka käsin. Kun TF ladattu: Mac TF 160 -lupa Natiivisepälle + rivi Päätoimittajalle (increased-memory-limit-luku).
- **Käännösjono 15.00 jälkeen** (tarkista tf-jono-lokin loppu): 1) NUI natiivi-ui/pariisi-esitys 5c3d45e6 (köysivarmistus +
  LS1 741625b8; stillit Päätoimittajalle junan 161 kuittaukseen, simu ~6 min) → 2) Natiiviseppä mac-kaanna 28da7435 (dev;
  sitten Mac-CPU-mittaus, ei simuja) → 3) Siirtoseppä historia b8724fd8 + 34cf54b0 + 73ed2612 (simu iPad 18 min).
  LS1 esitys-giza 741625b8d kääntyi 13.17–~13.30 (tarkista lokit/kaannospalvelu).
- **Simujono 15.00 jälkeen**: LS1 (yövalot OK 13.16; aloitus Ateena+Pariisi 8 min, Giza v2b 6 min,
  yksi kerrallaan), Siirtoseppä iPad 18 min. LS2:n pallo-simut af5922b95:llä ajettiin ~12.55–13.20 (setsid, jatkuu tauon yli).
- **Juna 161 -ehdokkaat**: iOS-koeyhdistelmä af5922b95 = Natiiviseppä 074c95a3 (kirjoitusääni + Mac vSync) + LS1 yövalot
  47622521f + LS2 pallo e16d100db, appi proto-3d/lokit/natiiviseppa-juna161-koe/. Natiiviseppä kokoaa rungon Päätoimittajan kuittauksilla.
- **Pöllö/Pages**: #4132, #4133, #4134, #4136, #4137 mergetty; #4135 Pages (ajo 37602905291, ilmoita Päätoimittajalle kun julki);
  #4138 (Päätoimittaja kuittasi) merge + Pöllö taustalla — tarkista `gh pr view 4138`.
- **Junavahti** (juna/b13) ottaa lukon itse ja asentaa simuihin 1572C658/3B4CDACB/C1D5E34C — ei luvaton ajo.
- S2-syksy osat 0/2/3 jatkuvat setsid-ajona (lokit -c). Valmis → laatat.json 200 → Karttasepälle.

Kirjoittaja: Julkaisija (Opus 5.5, high). Juokseva loki: /Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt
(kaikki 7.10. yön ja aamun TF-, juna-, vienti- ja vuorotapahtumat). Pitolista: julkaisija-tyokalut/pidossa.txt.
Päätoimittaja = "PÄÄTOIMITTAJA (Opus, max)".

## TestFlight (7.10.)

- Testaajilla: **155** 03.27 (e94eea7b / 061c8850), **156** 06.05 (2fbc8dda / 79d8ba7c), **157** 06.59 (e3091be5 / e2d89273),
  **158** 09.00 (dd89771b / 69e66521), **159** 10.39 (proto master b00c06f7, juna/b13 603cfd8a, käännös 19ef80cc, muutosloki #4124).
- **Mac TF** 1.1 (155–159) kaikki ladattu (Natiiviseppä, proto3d-mac-testflight lataa=true; omistajan lupa 00.5x).
- Kaava: muutosloki-PR (testit ohitetaan paths-ignorella → aja `node --test tests/vienti.test.mjs` PR:n puulla väliaikaisessa
  worktreessä) → merge → `proto3d-testflight.yml` (proto_ref = BUILD-master täysi SHA) → kun "Vie sisältöpaketti ämpäriin"
  on success (HUOM: uudempi push mainiin peruuttaa vanhemman ajon — käytä uusinta, joka sisältää muutosloki-commitin) →
  testflight-sisainen → testflight-ulkoinen → Mac TF -lupa Natiivisepälle.
- unity-vahti hälytti väärin TF 155:ssä (Burst bcl.exe, emoprosessi joutilas) → korjattu proto masteriin 26e849bb.
  #4097 TF nice 10, #4117 TF siivoaa välituotteet lopuksi (vain LUKKO_OMA).

## Junat ja jono

- **Juna 160** kootaan (Natiiviseppä). Ehdokkaat: LS1 esitys-giza 045374cab (käännetty 0bf208e9a; pariisi-esitys + Giza + #4126
  Kerro lisää + NUI apuraha 0261750e), Siirtosepän historia-yhdistelmä fc1c13e1 + 34cf54b0 + 73ed2612 (kääntyi 10.46–),
  LS1:n torjuntalaatikon kesto (< 4 s → korjaus junaan 160).
- **Simujono käynnistyksen jälkeen**: LS1 (esitys-giza, 2 simua, kesken) → NUI 4 min LS1:n appilla (lippurivi, kuvakehykset)
  → Siirtoseppä historia 20 min. iPad 00008103: Release 603cfd8a asennettu 10.41; LS1:n yövalomittaus + FACEIT ABAB ~10.57 →
  katkesi todennäköisesti käynnistykseen.
- Rajat: päivällä 2 simua, yöllä 1; käännökset ≥ 36 Gi, simut ≥ 30 Gi (yön raja), < 33 Gi hälytys Päätoimittajalle.
  Yhdistelmäkäännökset (sama pohja, puhdas merge-tree) säästävät käännöksiä — ehdota aina.

## Pöllö ja Pages

- Julki 7.10.: #4081, #4082, #4089, #4086, #4084, #4090, #4092, #4098, #4102, #4103 (kuvat-v4), #4105, #4107, #4108
  (**OPAS_SALLITUT_ESTO=1 päällä 07.18**), #4109 (sallitut 37, Varsova pois), #4116 (Giza vain otsakkeella
  x-matkakirja-kokeilu: giza), #4126 (merge da8552b3, Pöllö julki 10.55).
- Pages: #4120 apurahakortti v6 julki 10.23 (esittely.json versio 6), #4122 web-linkki pois.
- Päätoimittajan loki-PR:t #4072, #4095, #4115, #4118, #4121 mergetty.
- Pysyvä sääntö (pidossa.txt): Pelikoodarin indeksilisäys jo kuitatusta ämpärisisällöstä → merge vihreänä ilman Päätoimittajaa.

## Ämpäri (vie-paketti.sh, nyt myös `--osa=I/N` rinnakkaisvientiin)

- Viety 7.10.: tiet-v2, aanikartta (pariisi, venetsia, koopenhamina), aanimaisema-v1 silmukat + tuuli/sade, tiet-v1 31 kaupunkia,
  opas kuvat-v3 (4 063) + kuvat-v4 (58), siltalauseet-v2 (5).
- **KESKEN: s2-eurooppa-syksy-vienti-20261007** (57 630 tiedostoa, Copernicus S2): osat 1/4/5 valmiit (0 virhettä);
  osat 0/2/3 (uusinta, lokit proto-3d/lokit/julkaisija-vienti-s2syksy-6osa{0,2,3}-b.log) katkeavat käynnistyksessä →
  käynnistä uudelleen samoin (perl setsid, nice 15, `--osa=0/6` jne.; jo viedyt ohitetaan). Valmis → laatat.json 200 →
  ilmoita Karttasepälle (välittää LS2:lle). Osat kuolivat yöllä kerran hiljaa → vahdi pääprosesseja (`pgrep -P 1`).
- **ODOTTAA**: opas-esittely-vienti-20261007 (Pariisi + Praha) → vie HETI käynnistyksen jälkeen (#4126 julki 10.55), sitten Pelikoodarin
  indeksi-PR. omat-mallit-vienti-20261007 (Giza) → EI ennen LS1:n "vie"-viestiä.

## Avoimet

- Linnaosoitin tuotannossa **1a1857e06ec1386f** (v41, 03.39). Kielletty kaupunki: peilit vain kokeiluun, ei osoitinta.
- Varsova pois (Googlen 3D-reiät); Giza vain kokeiluotsakkeella.
- Omat worktreet: ei jäljellä.
- **13.2x lisäykset**: TF 160 LADATTU 13.16 (increased-memory-limit 1); Mac TF 160 -lupa annettu Natiivisepälle. #4138 julki
  13.08, #4135 Pages julki 13.06. Opas-esittely-vienti-20261007c viety 13.12; #4141 (LS1 vahvisti yhteensopivuuden) ja #4142
  merge + Pöllö taustalla → tarkista `gh pr view 4141/4142`, ilmoita Pelikoodarille. Worldview-vienti (Karttaseppä, PT kuittasi):
  `julkaisija-tyokalut/vie-worldview-20261007.sh` setsid, loki proto-3d/lokit/julkaisija-vienti-worldview-20261007.log → kun
  "VALMIS 0": pyramidi.json viivataso-kenttä = pyramidi-poltto/worldview-2026-10-07/viivataso-2026-10-07.json (osoitinvaihto,
  PT kuitannut; lataa julisteet/pyramidi/pyramidi.json, muuta vain viivataso, varmuuskopio, lataa, tarkista ?t=), sitten
  merge #4140 ja ilmoita Karttasepälle. LS1 yövalot-161 OK af5922b95:llä; LS2 pallo-simut OK. Natiiviseppä iPad FACEIT ABBA
  (luvattu setsid-ajona). NUI köysikorjaus ei vielä toiminut (metrolinja katosi).
- **13.2x Natiiviseppä**: Mac TF 160 + mac-kaanna 28da7435 setsid-ketjuna LS1:n gizan perässä (loki proto-3d/lokit/natiiviseppa-mac-tf-vahti.txt) — lukko voi olla sillä 15.00; NUI seuraavaksi kun vapaa.
