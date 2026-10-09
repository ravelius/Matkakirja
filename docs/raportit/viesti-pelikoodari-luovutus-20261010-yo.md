# Pelikoodarin luovutus 10.10.2026 klo 00.1x (kontekstin nollaus, PT)

Ensimmäinen tehtävä: **oma suositus yhdellä rivillä PT:lle** ja aloitus, jos se on omalla alueellasi eikä vaadi ostoja eikä generointia
(PT 10.10.). Puheäänten PCM-mittaus ja äänimuistivahti on jo tehty (alla kohta 4).

## 1. Junaan 174 kuitattu (proto-git, pushattu natiivi-backupiin, SHA:t Natiivisepällä)
- **pelikoodari/muisti-174 e48dae34a** = kärki, yläjoukko: Siirtosepän siirtoseppa/juna174-silmukat d7dc17f07 + pelikoodari/silmukat-ristihaivytys
  f1f3fc15c (yhdistetty ilman ristiriitoja) + Olavinlinnan pakkaus a522a1988 + äänimuistivahti e48dae34a. Worktree
  /Users/Shared/Claude/wt/proto-pelikoodari-silmukat (poista, kun juna 174 on mergetty: `git -C proto-3d/Matkakirja-proto worktree remove`).
- Sisältö: SaumatonSilmukka (Linssit/Unity) + Ydin Silmukkasauma: 34 loop=true-mp3-silmukkaa ilman ~51 ms saumakatkoa (iOS-FMOD ei leikkaa
  LAME-viivettä, 2257 näytettä). Ohjauslähde mykistetään (prioriteetti 256), kaksoslähteet soittavat: PCM- ja tagilliset pakatut klipit
  hakuttomalla liitoksella (seuraava kierros klipin alusta alkuviiveen verran ennen loppua), muut ristihäivytyksellä. Lentomoottorin silmukka
  (täyte pois, 1 s ristihäivytys), loppumusiikin silmukka pakattuna + liitos, radion viritys.
- Muisti (PT:n muistikatselmus, _tyo/aani-laatu/muistikatselmus.md): Pariisi −45, Tukholma −40, Olavinlinna −71 (≥ 10 s silmukat pakattuina),
  ISS −11 Mt (Cupolan humina 16 kHz:nä, aanet/cupola/v3). Pariisin avauksen kaatuminen (juna 173) EI johdu äänistä: kaatumisikkunassa
  ladattiin vain ~4 Mt; vapaa muisti putosi tekstuurien ja laattojen kasvaessa (Linssisepän ajo 11, lokit/muistiajo-173.txt).
- **Avoin ristiriita**: LS1:n linssiseppa/kaupunkisilmukat-174 7863be925 ↔ PalloAanimaisemaSoitin.Lataa (yksi rivi): pidä LS1:n
  GetAudioClip(KaupunkiSilmukat.Osoite(…))-rivi + Pelikoodarin seuraavat rivit (compressed = true, tagi r.url:sta). Natiiviseppä tietää.

## 2. Ämpäriin viedyt (kaikki 200, Julkaisija)
- aanet/laatu-korvaajat-v1 (lapset-puisto, kanava-liplatus, keittiö, sydän 58/100 BPM, hiipiminen-10), aanet/silmukat-korjaukset-v1
  (keittio-ambienssi-03 < 600 kt, laituri-02 90 s), aanet/kaupunkisilmukat-v1 (Pariisin metro/tori/kyyhkyt, Tukholman tori, metro-02,
  lokkiparvi-02, raitiovaunu-03; Soundly erä 1e), aanet/kaupunkisilmukat-v2 (tukholma-metro-02), aanet/cupola/v3 (humina 16 kHz).
- Kytkennät tehty: Siirtoseppä (814235c0a, d0bbaadd9: keittiö-03, sydän, hiipiminen, koira → Soundly yo, askel-porras-1 +2,5 dB),
  LS1 (7863be925 kaupunkisilmukat-v1; tukholma-metro-02 pyydetty).
- Taulukot: _tyo/aani-laatu/laatu-taulukko.tsv (657 tehosteääntä, AST+CLAP+nimi+sanaportti), silmukat-taulukko.tsv (136 silmukkaa),
  silmukkasoittimet.tsv (soittimet koodista). Työkalut: tunnista.py, paata.py, silmukat.py, silmukat-paata.py, korvaajat/*.py.

## 3. Odottaa
- **Freesound-OAuth odottaa omistajaa koneella** (PT pyytää): koodivahti `node /Users/Shared/Claude/proto-3d/tyokalut/pelikoodari-ajot/freesound-oauth.mjs`
  (odottaa 30 min ~/.freesound-koodi; linkki `--linkki`). Lataaja `freesound-originaalit.mjs` on irrotettuna käynnissä (odottaa ~/.freesound-tokenia
  12 h, alkoi 9.10. 21.4x → aikakatkaisu ~10.10. 09.4x; käynnistä uudelleen `_tyo/soundly-erat/aja-originaalit.zsh` perl setsid -kaavalla,
  loki originaalit.log). Lista _tyo/soundly-erat/freesound-originaalit.tsv (39).
- **Vesisanko** (Olavinlinna, Freesound "plastic bucket" → hylätty) odottaa originaalia (r074 "täysi ämpäri"); varalla Soundly SND78032.
- "Kuuntele ensin" omistajan TF-kuunteluun: rakennus.kappeli-ambienssi (AST hevonen 0,28), rakennus.porras-kaiku (jyrinä).

## 4. Tehty viimeksi (10.10. 00.0x)
- Puheäänet mitattu: kertoja pitää muistissa vain nykyisen + seuraavan + jatkon (VapautaVanhatAanet), PCM-virta mono 24 kHz short (24 s ≈ 1,2 Mt),
  historia yksi klippi kerrallaan → ei korjattavaa.
- Äänimuistivahti (e48dae34a): Linssit-testit AanimuistivahtiTestit: GetAudioClip ilman compressed/streamAudio = true vaatii Perustellut-listan
  merkinnän (11). Kokeiltu: VeneAanetin pakkausrivin poisto kaataa testin.

## 5. Opit (tarkista ennen vastaavaa)
- Pidennetty silmukka + PCM-lataaja = muistiloukku (lokit 110 s olisivat olleet 19 Mt): tarkista lataajan compressed ennen pidennystä.
- Whisper-sanaportti hallusinoi puheensorinaan ("you.", "JR東日本…", "to the side"): vertaa hyväksyttyihin kerroksiin ennen hylkäystä.
- CLAP ei erota materiaaleja eikä alle 1 s ääniä; AST + lähdenimi ratkaisevat.
- LS1 ohjaa latausosoitteita (KaupunkiSilmukat.Osoite) → hae tagit pyynnön r.url:sta, ei vakio-osoitteesta.
- SHA256SUMS: manifest.json viimeiselle riville (Julkaisija).
