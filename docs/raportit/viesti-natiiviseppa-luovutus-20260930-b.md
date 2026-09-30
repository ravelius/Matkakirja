# Natiivisepän luovutus 30.9.2026 klo 16.4x (b) — konteksti 66 %

Luovuttaja: Natiiviseppä (Opus 5.5, high, Macin käyttäjä koodaus). Edellinen: -20260930.md (käytännöt voimassa, ellei tässä toisin).

## TILA HETI

- **proto master 47275fed = BUILD 74** (TF 1.1 (74)). Juna/b13 = a7e3422f (käännetty 9fce4922).
- **1.1 (75) = natiiviseppa/juna-1075 f0b5a4f4**, testit 0/413/364/519. Taustaskripti avaa juna/b13:n, kun TF-lukko vapautuu
  (lukee haaran kärjen avaushetkellä → uudet erät voi lisätä haaraan). Sisältö: natiivi-ui/visa-kortti 36dd0938,
  natiivi-ui/lisakaupunki-esilataus e89751a4, linssiseppa2/esittely-linssit 30d0dd6d, siirtoseppa/linna-kertoja 1eca8bbe
  (↻-ikoni, DioraamaLaatu piirin mukaan), pelikoodari/aani-kerran 62eb8ac9 (maisema/musiikki kerran läpi; savukkeeseen
  Aanisoitin-JSON: maisema "alku":0,"kerran":true,"silmukka":false, pohja "silmukka":false), pelikoodari/apuraha-rajaus
  90412d84 (todennus vasta web #3708:n jälkeen), natiiviseppa/testimykistys 3ab222b4.
  Avaus irrotettuna (nohup, pid 25701): proto-3d/lokit/natiiviseppa-skriptit/avaa-1075.sh, loki avaa-1075.log.
  KÄÄNNETTY → savukeohje Laitetestaajalle (yllä olevat + regressio) → PASS → BUILD 75 → SHA + muutosrivi Julkaisijalle.
- **Testimykistys** (TestiMykistys.cs): simulaattorissa lopullinen ulostulo nollaan oletuksena, `aani mittaa` näkee signaalin
  (todennettu FBBD41D7: sini rms 0,124 mykistettynä ja ilman). Peli-komento `aani mykistys 1|0|tila`. KUN BUILD 75 on tehty:
  ilmoita kaikille simulaattoreita ajaville (Laitetestaaja, Linssiseppä, Linssiseppä 2, Siirtoseppä, Natiivi-UI, Pelikoodari,
  Linnanrakentaja): "mykistys on oletuksena päällä simulaattorissa; `aani mykistys 0` peli-komento.txt:hen, kun kuuluvaa ääntä
  tarvitaan; `aani mittaa` toimii mykistettynä". Päätoimittajalle valmis-rivi.
- **Odottaa:** Linssisepän ISS-paneeli e4551446 (kuvapari ensin), Natiivi-UI saaret-rajat 09b74c8d (kuvapari ensin),
  PCM-laitekäännös iPadiin 00008103 (ajastus pysäytetty; PCM on jo BUILD 68:ssa, Linssiseppä 2 ei ole pyytänyt uudelleen),
  paperirae f5b1d5e5 (odottaa Karttasepän raetonta pohjasarjaa), Siirtosepän havainto `poikki aanet` silmukoita 0.
- **Mac-versio:** tie A (TF for Mac) — ASC-asetukset olivat jo päällä, omistaja kokeilee TF:ää Macilla; palaute Päätoimittajan
  kautta. Tie B (Mac 00006041-000268813402801C kehityslaitteeksi) vain juurisyyhyn; koodaus-käyttäjällä ei Xcode-tiliä.

## TÄNÄÄN (30.9.) TEHDYT

BUILD 59 62d1eba5 · 60 44b95c0d · 61 f44da597 · 62 22e01061 (valikko, Krim) · 63 fd7e171d · 64 01051a6f · 65 1f7fb665 ·
66 219c8fdf · 67 3c3038ae · 68 8cedc21c (lippu, istunto, PCM) · 69 d832284f · 70 2499d43f · 71 191dbe8b · 72 ece68930 ·
73 4d451936 (TF 1.1 (73)) · 74 47275fed. FAILit: 1.0.66 lippu ×2 (Linssiseppä korjasi d7d204c3), 1.0.73 maakunta luennalla.

## UUDET PYSYVÄT SÄÄNNÖT (30.9.)

- **TF-numerointi:** versio kiinteä 1.1, build = juokseva ordinaali (Julkaisija laskee), BUILD N ↔ 1.1 (N).
- **Uudelleen koottu juna:** vanha kärki vanhemmaksi (git commit-tree puu sama, -p uusi -p vanha), muuten varmuuskopion
  proto/juna/b13 ei ff ja varmuuskopio-viimeisin ei päivity.
- **proto-kaanna.sh** poistaa Build/**/.DS_Store ennen IosSimulaattoria (omistajan lupa, varmuuskopio *.ennen-dsstore-20260930).
  Juurisyy kaatumisiin 08.34/11.56/15.56 oli "IOException: Directory not empty", ei Burst.
- **Käännöslukko** = /tmp/matkakirja-kaannospalvelu.lukko (ei matkakirja-proto-kaannos.lukko). laite-sha.sh varaa sen.
- **iPad 00008103:** omistajan suora lupa kaikkiin iPad-testeihin (laite-sha.sh <SHA>, NYT + swap < 12 Gt). EI iPhone
  00008150 eikä iPad Pro 11 ilman erillistä lupaa. Luokitin esti aiemmin vertaisen välittämän luvan.
- **Toisen roolin simulaattori** (F989814A ym.) vain roolin pyynnöstä + NYT-vuorolla (16.17 asennus katkaisi Siirtosepän ajon).
- **Yksi simulaattori kerrallaan**, ei käynnistyksen uusintayrityksiä täydellä swapilla (16.29 SpringBoard kaatui 6× omistajan
  ruudulle; mykistys-testi.sh korjattu lopettamaan ensimmäisestä epäonnistumisesta).

## TYÖKALUT

- Junan kokoaminen: worktree /Users/Shared/Claude/wt/proto-natiiviseppa-<x> kärjestä, merge --no-ff, 4 sarjaa rinnakkain
  (Linssit-testit/unity-tarkistus.sh, Kartta-/Peli-/Linssit-testit/kaanna.sh), worktree remove --force + rm -rf + prune.
- Avausajastin: taustalla `while [ -d lukko ]; sleep 15; done` → tarkista kierros (1572C658|3B4CDACB|C1D5E34C|993F8873
  booted = kierros) → update-ref juna/b13 <haara> <vanha> + juna.log-rivi.
- .app talteen aina Laitetestaajan laitteen asennuksesta: ~/Library/Developer/CoreSimulator/Devices/1572C658-…/data/
  Containers/Bundle/Application/*/Matkakirja3D.app → proto-3d/lokit/juna-<versio>-<sha>/.
- Skriptit: proto-3d/lokit/natiiviseppa-skriptit/{laite-sha.sh, mykistys-testi.sh, asenna.sh}.
