# Natiivisepän luovutus 30.9.2026 klo 00.0x (x) — konteksti 66 %

Luovuttaja: Natiiviseppä (Opus 5.5, max, Macin käyttäjä koodaus). Edellinen: -20260929.md (käytännöt voimassa, ellei tässä toisin).

## PÄIVITYS 30.9. klo 00.3x — LUE TÄMÄ ENSIN

- **1.0.59 KÄÄNNETTY 00.21 = käännös c673af0d, juna/b13 4629e0ad** (BUILD 58 + 3d-pois 384218a1, linna-valo 13600240, matkamuisto 6ef574bc,
  luenta-alku cee14dc6 (iPad 49/49)). Asennettu Laitetestaajan 4 laitteeseen + F989814A (Siirtoseppä). Laitetestaajalla savukeohje.
  PASS → BUILD 59 = `merge --no-ff 4629e0ad` masteriin 3b4f2e33:n päälle, puu = c673af0d; SHA + muutosrivi Julkaisijalle ja Päätoimittajalle.
  .app talteen: proto-3d/lokit/juna-1059-4629e0ad/ (md5 UF 6568a22d…).
- **1.0.60 = sivuhaara natiiviseppa/juna-1060 8e77c475** = 4629e0ad + linssiseppa/linssi-pelielementit 28316eef (testit 0/410/362/517).
  Avaa BUILD 59:n jälkeen; Linssiseppä haluaa .appin kansioon proto-3d/lokit/juna-1060-8e77c475/.
- **VIRHEET, joista opittiin (00.2x):** (1) siirsin kärjen jo käännetyn junan päälle — ehto tarkisti vain käynnissä olevan käännöksen.
  Palautettu minuutissa (juna.log). EHTO JATKOSSA: kääntämätön = `juna-viimeisin.txt` ≠ juna/b13-kärki. (2) Kopioin .appin
  kaannos-kopion Build/dd-sim:stä, jonka Natiivi-UI:n testikäännös oli jo ylikirjoittanut → F989814A sai väärän käännöksen 00.26,
  korjattu 00.27. OTA JUNAN .app AINA Laitetestaajan laitteen asennuksesta
  (~/Library/Developer/CoreSimulator/Devices/1572C658-…/data/Containers/Bundle/Application/*/Matkakirja3D.app).

## TILA HETI (00.0x, osin vanhentunut — ks. päivitys)

- **proto master 3b4f2e33 = BUILD 58** (juna 27291efd, käännös f50f5e23, Laitetestaaja 1b6de1f32). SHA Julkaisijalle ja Päätoimittajalle
  lähetetty. TF 1.0.58 saa lähteä (iPad-laite valmis).
- **1.0.59 = sivuhaara natiiviseppa/juna-1059 d9e8bdd5** (BUILD 58:n juna + linssiseppa/3d-pois 384218a1 (2D-nostot takaisin,
  omistaja), siirtoseppa/linna-valo 13600240 (elävä linna vaihe 2), pelikoodari/matkamuisto 6ef574bc; testit 0/410/362/517).
  Avausvahti (edellisen session tausta-ajo) avaa juna/b13 → d9e8bdd5, kun lukko (Linssisepän 3d-pois-testi 23.59) vapautuu.
  TARKISTA: `tail -3 proto-3d/lokit/kaannospalvelu/juna.log` ja `git -C …/Matkakirja-proto rev-parse --short juna/b13`.
  Jos juna on yhä 27291efd ja lukko vapaa → avaa käsin (pysyvä NYT). KÄÄNNETTY → savukeohje Laitetestaajalle (2D-nostot Italiassa,
  linna vaihe 2 `poikki`, matkamuistokortti ilman kuvaa, jokainen kehittäjälinssi kerran) + .app F989814A:han Siirtosepälle
  (`proto-3d/lokit/natiiviseppa-skriptit/asenna.sh <app> F989814A`).
- **iPad Pro 13 (00008103-001819421413401E)**: 8f04fa16 = 1.0.58-juna + linssiseppa2/luenta-alku 8b4b74dd (Linssiseppä 2 mittaa luennan
  alun). Merge-pyyntö tulee mittauksen jälkeen: linssiseppa2/luenta-alku cee14dc6 (juna mergetty, ristiriita ratkaistu).
- **Odottaa Karttaseppää**: raeton pohjasarja julisteet/pallo/laatat/2026-09-30-pohja-20260930/ (TÄYSI, ei deltaa) + kerma
  2026-09-30-p060, valmis 30.9. iltapäivällä (vienti omistajan luvalla). Silloin samaan käännökseen: natiiviseppa/paperirae f5b1d5e5
  (Pohjapatina.OletusRae 0,19) + SileaUrl/kerma-kansion vaihto → kuvapari 27 vs uusi+rae (Välimeri, Pohjois-Eurooppa) Päätoimittajalle
  ENNEN TF:ää; rakeen koko/voima `pohja patina <rae> <koko> …`.

## TÄNÄÄN TEHDYT (29.9. 17–24)

BUILD 51 f3d7b408 (keittiö) · 52 d45086d3 (sepia) · 53 f2b35afb (ISS, yökartta, tähdet) · 54 4f72df0d (yhteisjuna, raja ja rannat) ·
55 99fd971f (luenta-alku, valikot, radio-kartta) · 56 e2808605 (radio-palaute) · 57 ee527350 (deltasarja, taustakorjaus) · 58 3b4f2e33.
Omat korjaukset: laattapalvelimen kuuntelijat uudelleen taustalta (TN2277; todennettu curl 4/4 → 000 → 4/4), napahyppy (ohjauksen dt ≤ 0,1 s,
liuku+kosketus pois taustalle), astro-tekstuuri SetPixelData, deltasarja (natiivi, Karttasepän speksi), raja ja rannat (maaraja 50 % 2,2 pt +
rannat saarineen 22 % 1,2 pt), kaupunkien sepia (#5a4330 0,75, nimet 0,95).

## PYSYVÄT SÄÄNNÖT (uudet tänään)

- **Omistajan lupa**: juna/b13 update-ref + juna.log-rivi Julkaisijan NYT-luvalla (muisti juna-avaus-julkaisijan-kuittauksella).
- **Julkaisijan pysyvä NYT**: avaa itse, kun testit exit 0, lukkoa ei ole, ei TF-/laitevientiä eikä Laitetestaajan kierrosta
  (1572C658/3B4CDACB booted = kierros). Lukkoa odottavan, kääntämättömän junan kärkeen saa lisätä testattuja haaroja kysymättä
  (proto-kaanna mergeää juna/b13:n vasta lukon saatuaan). Tarkistus: `pgrep -f "proto-kaanna.sh juna/b13"` (EI pelkkä proto-kaanna).
- **proto-kaanna.sh: xcodebuild -jobs 8** (omistajan lupa 19.3x), kevyt-lippu /tmp/matkakirja-kevyt tai kuormaraja → nice 15 -jobs 4.
  Varmuuskopio *.ennen-jobs8-20260929. Junakäännös nyt 3,5–10 min.
- IL2CPP Debug EI vaikuta iOS:ään (Unity: asetus Xcode-projektissa) → poistettu (8377efc0).
- Savukeohjeisiin aina: jokainen kehittäjätilan linssi avataan kerran (Päätoimittaja).
- Testiajojen laitteet: omat testit FBBD41D7; roolien simulaattoreihin asennus vain pyynnöstä, yksi kerrallaan, booted < 3
  (asenna.sh). Laitekäännös oikeaan iPadiin: proto-3d/lokit/natiiviseppa-skriptit/laite-haara.sh (päächeckout väliaikaiseen haaraan,
  palauttaa masteriin; Julkaisijan NYT).

## KÄYTÄNNÖT JA SUDENKUOPAT

- Testit rinnakkain väliaikaisessa worktreessä (4 sarjaa & + wait), ja update-ref VAIN jos kaikki "exit 0" (kerran siirsin ennen testejä
  kun vanha kansio esti worktreen — tarkista aina että worktree luotiin). Finderin .DS_Store jättää tyhjiä kansioita: rm + find -delete.
- Simulaattorin stdout-loki: kirjoita /Users/Shared/Claude/proto-3d/lokit/…, ei scratchpadiin (simulaattori ei kirjoita sinne).
  Ensimmäinen launch bootin jälkeen "Busy" → yritä uudelleen. Komennot: Documents/komento.txt (simctl get_app_container … data).
- Paikallisen laattapalvelimen portit voi testata Macista curlilla (simulaattori jakaa loopbackin).
- Burst hostmac AotLinkerException toistui kerran (21.42) → vahti käänsi uudelleen, meni läpi.

## AVOIMET

- Linssiseppä 2: luenta-alku cee14dc6 merge-pyyntö iPad-mittauksen jälkeen.
- Karttaseppä: raeton sarja + rae (yllä); deltasarjan ensimmäinen oikea deltapoltto → todenna laitteella.
- Laitetestaajan osittaiset 1.0.58: lipun kulman kuvapari (Linssiseppä kuvaa), Livian lehtireaktio.
