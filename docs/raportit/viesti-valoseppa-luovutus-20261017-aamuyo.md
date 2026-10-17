# Valoseppä – luovutus 17.10.2026 aamuyö (03.4x, KOVA RAJA 37 %)

Luovuttaja: Valoseppä (Opus, high), sessio local_c238f4af. Edellinen: viesti-valoseppa-luovutus-20261017-yo.md (95cc64917).
Viestit `send_message` TÄYDELLÄ id:llä (/Users/Shared/Claude/osoitekirja.md): PT local_5df52e10-10e4-4b72-9554-0049db300dfe (≤ 3 riviä),
Julkaisija (JU) local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914, LR local_996d60ab-b4af-4172-ad31-f8e948f141a3, NS local_674b9ec4-e2f3-48e9-a810-a129f20a4f03,
KS local_eec7f158-d9f3-4b93-9368-c50935bd19ab, Postivahti local_a24c43c0-8094-4141-b734-90b9555f5044.
D=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2. Päiväkirja: $D/JONO.md (kaikki rivit 00.48–03.3x lopussa). proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto.
Käännökset ja simut VAIN Julkaisijan viesteillä "KÄÄNNÖS NYT …" / "SIMU NYT …"; heti simun jälkeen "SIMU VAPAA" JU:lle. Taustaseurannassa ei simun pgrep-sanoja.

## 0. ENSIMMÄISENÄ: LOUVRE k64 -PARI PT:LLE (KK odottaa; lasi pakko näkyä)
1) **KÄÄNNÖS NYT pyramidi** (JU arvio ~04.10) → `zsh $D/louvre1/k62-kaanna.zsh` (c49687f22 lasivarjostin → $D/t199-pyramidi; ei simuasennusta).
   Ilmoita JU:lle "KÄÄNNÖS VALMIS <sha>". Appeja ≤ 2: t198-linnunrata saa mennä T7:lle (linnunrata junassa), kun t199 on valmis.
2) **SIMU NYT k64** → `zsh $D/louvre1/pari-kuvat.zsh k64vs` (A26BC7D0, ~12 min; vaatii t199-pyramidi, ei varaappia) → simu alas → "SIMU VAPAA" JU:lle.
   Arkki tekee itse: $D/louvre1/lahi-L1-L3/k64vs/arkki.jpg (k63s | k64vs | Codex; L1b/L2/L3 160° päivä) + pari-pyramidi.jpg + mittaukset.txt
   (kivi-mittaus: kirkkain 40 %, S ja R/B). PT:lle 3 riviä: md5 **4b5182b4/064b26be/0d72f13f + sävy 0,80×**, kivi S/R/B vs Codex, lasi näkyy?, polku.
   - k64 LUKITTU (LR "LOPULLINEN" 03.1x; LR ei vie mitään ennen PT:n paria). Ristiin menneet viestit 113c1c68/0,88 ohitetaan. Seuraava LR-muutos = k65.
   - Tavoite PT: L2-julkisivu ≈ Codex 126,110,91 tai harmaampi. Mittaus k63 (kirkkain 40 %): peli S 0,31–0,33, Codex 0,26–0,28, kirkkaus sama
     → laskettu 0,80× = L2 S ~0,25 R/B ~1,33, L1b ~0,27/1,36. Jos pari näyttää yhä oranssilta: `zsh louvre1/ketju.zsh k64 0.72 --vain-savy`.
3) Sitten valas k3: **KÄÄNNÖS NYT valas** → `zsh $D/valas-havainne/k3/valas-k3.zsh --vain-kaannos` (11e20b600 → t197-valas; vanha appi on T7:llä);
   **SIMU NYT valas** → `--vain-kuvat` (iPad A26BC7D0 + iPhone 8D1FD618, pysty+vaaka, pelin oma kamera) → k3/arkki.jpg + valas-k3.mp4 → PT.

## 1. TEHTY TÄLLÄ VUOROLLA
- **ISS-LINNUNRATA** (omistaja 00.43 "katkeaa oudosti"): linssiseppa2/iss-linnunrata-198 4ca02d476 – KyydinLinnunrata säteen sivuamiskorkeudesta
  (maa 0, 8–150 km smoothstep², WGS84-säde), A/B `astro kyyti linnunrata maa 0|1`. Kuvattu ba5432828 (linnunrata/kuvat/pari-a270-rajaus.jpg, arkki 8 suuntaa).
  PT/KK HYVÄKSYI 03.0x → NS: rungossa 198 = 0253f6b30 (puhdas yhdistys). VALMIS.
- **Vihjevarjo** (NUI → KS): ValoProfiilit.KarttaVarjo linssiseppa2/valopohja 8bfa353a8 (1944/1944). KS:n kuvapari cbd0ad793 hyväksytty (laatikot pois).
  KS:n VihjeVarjo lukee arvot pohjasta, kun valopohja-haara on junassa.
- **VALOPOHJA V4 ULKO** (PT: V3 odottaa, Olavinlinna tauolla): linssiseppa2/valopohja-v4 (wt/proto-linssiseppa2-v4, 8bfa353a8 päällä):
  pala 1 6b57f97db (kori + elävä kaupunki: Valopohja.AsetaUlko/UlkoMaailmaan/UlkoNakymaan, _Vp*-sanasto + aliakset _Elava*/_Kori* ennallaan),
  pala 2 9a11d23fb (KaupunkiKuvan volyymi → Valitse(Ulko, kameraAsetukset:false) + elävä kerros 45; ULKO = kaupungin arvot, käyrä None myös
  vertailutilassa). 1945/1945, valovahti 1074 → 1050, tarkista 0. **Nollaero EI todennettu**: valopohja/V4/kaanna.zsh (ennen 8bfa353a8 + jälkeen
  9a11d23fb) + kuvat.zsh (Praha päivä/ilta/yö/vertailu, iPhone) JU:n jonossa valaan jälkeen. Riski: ULKO ohittaa nyt hehkun/vinjetin Perus-arvoilla
  (ennen ei ohittanut) → jos Filmipino (10) on päällä kaupungissa, näkyy ero. Seuraava pala: utu, KaupunkiFilmi deltaksi, HDR-päätös kuvaparilla.
- **Louvre**: k63 (LR koristelu, 62f9e6c4…) kuvattu linnunrata-apilla → PT: oikeaan suuntaan, ei KK:lle (kivi oranssi, lasi ei näy).
  Uudet työkalut: syvyys/glb-savy.py (kylläisyys lineaarisena baseColor-kuviin/-kertoimiin, pyramidin osat/lasit/vesi ohi), louvre1/ketju.zsh <kN>
  [ky] [--vain-savy], louvre1/pari-kuvat.zsh <paketti> + pari-arkki.zsh, lahi-L1-L3/kivi-mittaus.py. k64vs-paketti valmis 03.21 (portti 0).
- **LEVY**: T7 arkisto-20261017-0110: testi-196-videot, valopohja V2 -videot, Louvren k57–k62-paketit ja välituotteet, valas k1, nd3 v6k16/17,
  appit t197-valas + t197-varjopuoli, hylätyt k64-välituotteet. _tyo/linssiseppa2 ~1,6 G. Palautus: mv takaisin.

## 2. JONO (järjestys)
1) Kohta 0 (k64-pari → PT; valas k3).  2) V4 nollaero-kuvapari (JU-jonossa) → PT; poikkeama → korjaa ennen seuraavaa palaa.
3) V4 pala 3 (utu, KaupunkiFilmi deltaksi).  4) Savun jatkot + LR:n raketin valaisinpäät (uusi haara juna 197:n päältä, SHA LR:lle).
5) Vesi-/taivasheijastus valopohjaan (pyramidin altaat, lasi).  V3 (linnan sisätilat) vasta kun Olavinlinnan tauko päättyy.
