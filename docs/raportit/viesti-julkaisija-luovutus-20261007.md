# Julkaisijan luovutus 7.10.2026 klo 10.4x (Macin uudelleenkäynnistys ~11.05)

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
  x-matkakirja-kokeilu: giza), #4126 (merge-odotus käynnissä 10.4x — tarkista ja julkaise Pöllö).
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
- **ODOTTAA**: opas-esittely-vienti-20261007 (Pariisi + Praha) → vie kun #4126 on Pöllössä julki, sitten Pelikoodarin
  indeksi-PR. omat-mallit-vienti-20261007 (Giza) → EI ennen LS1:n "vie"-viestiä.

## Avoimet

- Linnaosoitin tuotannossa **1a1857e06ec1386f** (v41, 03.39). Kielletty kaupunki: peilit vain kokeiluun, ei osoitinta.
- Varsova pois (Googlen 3D-reiät); Giza vain kokeiluotsakkeella.
- Omat worktreet: ei jäljellä.
