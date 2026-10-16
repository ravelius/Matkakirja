# Valoseppä – luovutus 16.10.2026 aamuyö (04.0x, KOVA RAJA 35 %)

Luovuttaja: Valoseppä (Opus, high), sessio local_c238f4af. Edellinen: viesti-valoseppa-luovutus-20261016-yo2.md.
Viestit `send_message` id:llä (/Users/Shared/Claude/osoitekirja.md); PT local_5df52e10 (≤ 3 riviä + polut). NS local_674b9ec4, Julkaisija local_5cb16c00.
D=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2. Jono ja tila: $D/JONO.md (loppu "TILA 16.10. 01.5x" →). Simuloki: $D/testi196-uusi.log.

## 0. ENSIMMÄISENÄ: TAUSTAKETJUT JA SIMU A26BC7D0 (on Valosepällä; lopuksi "SIMU VAPAA" Julkaisijalle)
Tarkista `pgrep -fl "raketti-k28|k3-ketju"` – voivat katketa nollauksessa.
1. raketti-k28.zsh: kääntää linssiseppa2/kerros28-196 (L2, PROTO_APP_KOPIO $D/k28-app; oli jonossa bb85d1808:n takana 04.0x) → raketin video
   (sk-raketti-v2.txt) → $D/iss-nyt/raketti-k28.out. TARKISTA: konsolissa "kerros 28 palasi pääkameraan (kehys N) – poistettu" ja T+2:30–2:35 puhdas.
2. k3-ketju.zsh: odottaa "LOPPU raketti-k28" → testi-196 662b346db L2:lle ($D/t196-k3) → perseidit k3, hurrikaani k3, vanat k3, tulivuoret k8.
   Arvio Sonnet-agentilla kuten ARVIO2 (KIERROKSET-20261016-ARVIO2.md); kierrosten saatimet-kN.txt ja sk-pohja.txt jo päivitetty.
Jos kuolleet: aja itse samat rivit (skriptit kansiossa $D; zsh-lokirivit lainausmerkeissä – sulut ilman lainausta kaatavat skriptin).

## 1. PT:N KÄSKY: SEURAAJALLE ENSIMMÄISIKSI
### a) Löydös 1 juurikorjaus – kerros 28 (PT 03.5x)
- Haara linssiseppa2/kerros28-196 2d99623a5 (worktree /Users/Shared/Claude/wt/proto-linssiseppa2-kerros28, pohja vareily-196 fe5046c27):
  RakettiMaasto.Paivita poistaa Kerroksen 28 pääkamerasta joka kehys + päällyskamera pinoon; palautus lokiin 3×. unity-tarkistus 0.
- Todennäköinen palauttaja: ElavaKerros.Palauta / kaappaus (`paa.cullingMask = alkuMaski`, kaapattu ennen laukaisua) – toisen roolin koodi,
  EI muutettu. Kun k28-video vahvistaa (lokirivi + ei kolmioita), PT:lle ≤ 3 riviä ja haara NS:lle PT:n kuittauksella.
- Juuren mittaus v5:ssä: "kaukolaatta 40 km: pohjassa kerros 28 True, päällys pinossa True" (lokit/todistus-iss-nyt-video-20261016-0344).
### b) Codexin Peking PT336–340 v3 -tarkistus (jatkuu)
- Kuitattu postiin acf0a8b55; lentotesti 1 tehty: peking284/p340v3 (rakenna.py PEKING_LAHDE=…-20261016-native51-v3-lentotesti/glb-v4), ajo-p340.zsh,
  arvio peking284/ARVIO-p340v3.md, parit peking340-vs-284-klo13/18.jpg. Palaute Codexille f0bd280d8: puut harmaantuvat pelissä (yksi kierros).
- AVOINNA (pelin puoli, Valoseppä): Ion-maski Codexin `palatsialue-leikkaus-wgs84.geojson` KAIKKI 12 Featureä (vain Ion-tausta piiloon),
  iltavalo klo 18 (katot oliivinruskeat), sitten vesivarausten 221 kivinäytettä + Ion-väli ≥ 0,30 m. Uusi paketti → rakenna.py → ajo → vienti
  (uusi versiokansio + uusin.json, vie-paketti.sh Julkaisijalla, ei junaa).

## 2. VALMIIT TÄLLÄ VUOROLLA (16.10. 01.5x–04.0x)
- 23.12-video, kaikki kolme: auringonnousu ✓, perseidit ✓, SALAMAT EUROOPASSA ✓ (lokit/todistus-iss-nyt-video-20261016-0200, ARVIO-0200.md;
  `nyt testi 42.3 15.0` pistetila), RAKETTI v5b ✓ (lokit/todistus-iss-nyt-video-20261016-0349, ARVIO-0349.md) → PT kuittasi, video KK:lle.
- Junaan 196: vareily-196 fe5046c27 → NS yhdisti runkoon fac4d1987 (tarkistettu: KyydinAurinko/KyydinTaivas = haara, Siirtosepän ehto mukana).
  Sisältää: alustan lämpö todellisessa ajassa (759c8ffe1), savu piiloon > 20 km + rungon yövalo (85dc11583), kaukolaatta 40→60 km (fe5046c27).
- Etsimen A/B: PT hyväksyi, yovalot-tele-196 a0f1f82a0 NS:lle (pisteet 1 = oletus). Sijaintipaneeli = aseman alapiste (omistajan linja).
- Kierrokset: salamat k3 EI (shader ennallaan – korjaus ODOTTAA omistajan palautetta Eurooppa-videosta), revontulet k11 LÄHES
  (kupolin punainen hehku puuttuu, Revontulet.cs r. 396, _Punainen 3→6 – seuraava revontulierä). k2/k7: perseidit/hurrikaani/vanat LÄHES,
  tulivuoret k7 EI → k3-korjaukset 74e74f5a1 + kuvakulmat (hurrikaani v1 siirra 29.1 -72.1, Reykjanes siirra 63.51 -23.04).
- Löydös 2 (max-q-jäätyminen 4–7 s, satunnainen): PT – seurantaan laitteella, ei nyt.

## 3. HAARAT (proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto, worktreet /Users/Shared/Claude/wt/proto-linssiseppa2-*)
- iss-efektit-196 74e74f5a1 (k3-oletukset; k1-korjaukset dd436fbdc, testizoomi daed130f2), vareily-196 fe5046c27 (junassa),
  kerros28-196 2d99623a5 (UUSI, worktree -kerros28), testi-196 662b346db (kierroksiin, EI junaan), yovalot-tele-196 a0f1f82a0 (junassa NS:llä).

## 4. HUOM
- Julkaisija 03.00: L2-linjalla muiden ehtokäännökset ensin – älä jonota useita testi-196-käännöksiä peräkkäin; tarkista lukko
  /tmp/matkakirja-kaannospalvelu-2.lukko/kuka.
- ÄLÄ aja skriptejä `zsh -x`:llä: ~/.zshenv lataa avaimet ja jäljitys kirjoittaa ne lokiin (tapahtui 03.00, tiedosto poistettu heti).
