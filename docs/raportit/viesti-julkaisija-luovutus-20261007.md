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
- **13.25 tila**: Natiiviseppä Mac d8b0e0fc + 28da7435 käännetty 13.21–13.23 (Mac TF 160 -ketju jatkuu setsid). LS1 giza
  käännetty cbd5ffad7 (appi lokit/linssiseppa-app-esitys-741625b8d), aloitusajo simulla 13.22–. NUI 5c3d45e6 käännös + stillit
  setsid-ketjuna 13.24– (loki proto-3d/lokit/natiivi-ui-1035/ketju-koysi.log; KETJU VALMIS → stillit Päätoimittajalle).
  Olavinlinnan repliikit viety 13.21 (63). **15.00 jälkeen ensin**: Siirtoseppä historia KÄÄNNÖS NYT, LS1 Giza v2b -simu,
  worldview-viennin tila → osoitin + #4140, S2-syksy, #4141/#4142 tulokset, TF 160 -ryhmäketju (tf160-ketju.log).
- **13.3x**: #4141 julki (Pöllö 13.28, Pelikoodari todensi). #4142 → setsid `julkaisija-tyokalut/merge4142.sh` (loki merge4142.log)
  mergeää vihreänä + Pöllö → kerro Pelikoodarille. NUI 5c3d45e6 käännetty, stillit setsid. Siirtoseppä historia kääntyy setsid
  13.28– (tulos proto-3d/lokit/siirtoseppa-historia4-kaannos.out) → 15.00 jälkeen SIMU NYT Siirtoseppä iPad 18 min + LS1 Giza v2b.
- **13.38 (viimeinen ennen taukoa)**: TF 160 TESTAAJILLA 13.37 (Päätoimittajalle ilmoitettu). Siirtoseppä historia KÄÄNNETTY
  6490286bb (lokit/siirtoseppa-historia4-app). NUI köysi-stillit 13.32 kansiossa natiivi-ui-1035/pariisi-esitys (PT:lle tieto).
  **15.00 jälkeen järjestys**: KÄÄNNÖS NYT NUI pariisi-esitys 81aa5fea (+ simu 12 min, lupa iPhone 18 Pro Max 46EC73E2);
  SIMU NYT Siirtoseppä iPad 18 min ja LS1 Giza v2b 6 min (cbd5ffad7); Natiivisepän Mac TF 160 -tulos (natiiviseppa-mac-tf-vahti.txt).

## 16.1x — UUDET OMISTAJAN SÄÄNNÖT JA ILTA
- Testaus kevyemmin (15.5x) ja käännökset harvemmin (16.0x): roolit eivät käännä itse; vain juna (Natiiviseppä), TF (Julkaisija)
  ja ilmoitettu vianselvitys. Ei savua, rutiinia, stillejä eikä toistoajoja. Max 2 TF-junaa/pv (16.1x). Säännöt: pidossa.txt.
- TF 161: iOS ladattu 15.56 (37623777958, 1. ajo kaatui mono-virheeseen → #4149), sisäinen OK 16.02, Mac TF 161 OK.
  Ulkoinen 422 ANOTHER_BUILD_IN_REVIEW (160 katselmoinnissa) → `julkaisija-tyokalut/ulkoinen161-uusinta.sh` setsid 10 min välein.
- **TF 162 testaajilla ~22.00** (omistaja): Natiiviseppä lukitsee rungon 21.15 → BUILD-SHA → muutosloki-PR → TF (tf161.sh-kaavalla
  tf162.sh) → ryhmät; Mac TF -lupa annettu etukäteen. Lukko vapaana 21.10–21.50.
- Käynnissä: S2-kevät-vienti 6 osaa (lokit/julkaisija-vienti-s2kevat-6osa*.log) → valmis: laatat.json 200 → Karttasepälle.
  #4147 (apurahakortti valmiitLinssit) merge-odottaja → Pelikoodarille kun julki. #4150 loki-PR merge vihreänä.
  LS1 diagnostiikka-ajo (iPhone 5 min) alkulento-korjauksen käännöksen jälkeen hiljaisella hetkellä.
- 18.1x: viety olavinlinna-e3-aanet, -tietokerros, ilmapallo-kori (glb), opas-esittely-aaneton (31). S2-kevät osa 0 uudelleen (-b).
- 19.5x: #4156–#4162 mergetty ja Pöllö julki; S2-kevät osat 1–5 valmiit, osa 0 (-b) kesken. tf-kaynnista.sh <N> <proto SHA> <muutosloki SHA> käynnistää TF:n + ketjun.

## 20.4x — ENNEN TILINVAIHTOA (raja ~22.15–22.50)
- **Juna 162 / TF 162 klo 22**: Natiiviseppä lukitsee rungon 21.15, lähettää muutoslokin sisältölistan 21.15 ja BUILD-masterin
  SHA:n ~21.35. Tee muutosloki-PR heti listasta (normaali push; jos git push antaa HTTP 500, `julkaisija-tyokalut/muutosloki-api.sh
  162 "<teksti>"`), sitten `julkaisija-tyokalut/tf-kaynnista.sh 162 <proto täysi SHA> <muutosloki-merge-SHA>` → TF + irrotettu
  ryhmäketju (tf162-ketju.log). Mac TF 162 -lupa on Natiivisepällä. Jos ulkoinen ryhmä antaa 422 ANOTHER_BUILD_IN_REVIEW, kopioi
  ulkoinen161-uusinta.sh → 162 ja aja setsid (161:n silmukka luovutti 20.20).
- **Pidossa**: #4168 (oppaan turvakerrokset alaikäisille, PT kuittasi) → merge + Pöllö VASTA kun TF 162 on testaajilla.
- Valmiit tänään iltapäivällä: S2-kevät 57 630 (20.02, Karttasepälle), #4140/#4145 worldview D + Kypros, #4146/#4147 apurahakortti,
  #4150/#4159/#4167 Päätoimittajan loki/Raamattu, #4152/#4156/#4157/#4158/#4162/#4164 Pöllö (sana-ajat, äänettömät esittelyt,
  yksityiskohdat Pariisi/Praha/Wien/Rooma v4/Lontoo/Kööpenhamina), #4160/#4166 Sisältökirjurin luettelot. Viennit: Olavinlinnan E3-äänet,
  tietokerros, ilmapallon kori (glb), opas-esittely-aaneton (31), opas-aaniajat.
- Merge-odotuksessa vaadi `statusCheckRollup|length == 2` ja kaikki COMPLETED + SUCCESS (keskeneräinen = tyhjä conclusion).
- **21.3x TF 162 PIDÄTETTY** (Päätoimittaja): omistaja katsoo iPad-vaakakuvat; LS1 korjaa yksityiskohtakuvien esilatauksen →
  Natiiviseppä kääntää 162:n uudelleen → kuva 2 → PT kuittaa → TF (~22.45). Muutosloki #4171 mergetty (ce50afe3).
  **Varalaukaisu**: setsid `julkaisija-tyokalut/tf162-odota-lupa.sh` odottaa tiedostoa `tf162-lupa` (BUILD 162 täysi SHA) ja
  ajaa `tf-kaynnista.sh 162 <sha> ce50afe3…`; `tf162-kaynnistetty` estää tuplan. Tarkista `tf162-odota-lupa.log` ja `tf162-ketju.log`.
  Jos TF on jo käynnissä, älä käynnistä uudelleen. #4168 merge + Pöllö vasta TF 162 testaajilla.

## 23.0x — TILANNE ENNEN KESKIYÖN TILINVAIHTOA
- **TF 162** (BUILD 30fbc374): sisäisillä 22.15, Mac TF 162 ladattu. Omistaja löysi iPad-vikoja → EI ulkoisille. Ulkoinen
  silmukka pysäytetty. 162 irrotetaan Arvioijat-ryhmästä: #4173 (--poista) mergetty, korjaus #4174 (iOS+macOS sama versio)
  odottaa testejä → taustalla merge + `gh workflow run testflight-ulkoinen.yml -f poista=162 -f build_numero=`. Tarkista lokista
  "Build 162: irrotettu"; jos ei tehty, aja itse.
- **Korjausjuna 163**: BUILD 163 = ecb11b787ac53f9e417aa3188f16b453fd891e7c (juna/b13 2739ded6; myöhemmin vielä
  79462cba/d78cd0e0-käännöksiä → Natiiviseppä ilmoittaa lopullisen). Muutosloki #4175 mergetty (6b37efec).
  Varalaukaisu setsid `tf163-odota-lupa.sh`: kun PT kuittaa, Natiiviseppä kirjoittaa BUILD 163 -SHA:n `tf163-lupa`-tiedostoon →
  TF 163 + ketju (uusi pohja `tf-ketju-pohja.sh`: sisäinen heti, vienti ennen ulkoista). `tf163-ei-ulkoista` on asetettu:
  ulkoinen ryhmä VAIN omistajan kuittauksella (PT) → silloin poista lippu ja aja testflight-ulkoinen build_numero=163.
- TF-viive: sisäinen ryhmä hasAccessToAllBuilds=True (näkyy heti Applen käsittelyn jälkeen, ~16 min).
- #4168 (turvakerrokset) julki 22.19. #4172 (TF -jobs 12) mergetty 22.05.
