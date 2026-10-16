# Linssisepän luovutus 16.10.2026 klo 11.57 (KOVA RAJA 36 %, Postivahti)

Proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto (paikalliset haarat, ei pushia). Ajot proto-3d/tyokalut/linssiseppa-ajot/.
Tarkistus `zsh tyokalut/tarkista.sh`, testit `sh Linssit-testit/kaanna.sh` worktreessa (komento `</dev/null`).
Viestit AINA send_message id:llä (/Users/Shared/Claude/osoitekirja.md): PT local_5df52e10-10e4-4b72-9554-0049db300dfe (≤ 3 riviä),
Julkaisija local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914, NS local_674b9ec4-e2f3-48e9-a810-a129f20a4f03, Valoseppä local_c238f4af-ae73-44e7-81f1-92848acd9217,
Pelikoodari local_7fcab04b-864c-4ec2-98bd-46e171326701, Karttaseppä local_eec7f158-d9f3-4b93-9368-c50935bd19ab.
Simu iPad 00CF62C2 vain Julkaisijan SIMU NYT -vuorolla. Taustaodottajat kuolevat nollauksessa → käynnistä uudelleen.
OPPI 09.08: kaksi odottajaa samalle simulle ajoi päällekkäin (Pekingin asennus poisti telakointiajon appin) → jokaisessa odottajassa nyt
`while pgrep -f "era …"` -esto; Julkaisija luo liput peräkkäin.

## 1. KESKEN: ATEENAN PALLOKIERROKSEN HIONTA JUNAAN 197 (PT 11.5x; vapaat roolit, työlista "Lontoon, Prahan ja Ateenan kierrosten hionta")
- PT: "Ota pallokierroksen kulmista vakiokuvat ja korjaa niistä suurimmat näkyvät puutteet: maamerkkien valo, ääriviivat ja maasto.
  Etene kierros kerrallaan, junaan 197. Kuvat PT:lle."
- Päällekkäisyys tarkistettu: Karttaseppä ei tee Ateenaa (viimeisin korkeus_m 4f8de7ea8 junassa 196; mittarit
  proto-3d/_tyo/karttaseppa/kierrostarkistus-20261015-yo/ kaista.py, maa-ateena-v3). Pelikoodari: ei mitään kesken, v12 = edb351a43
  junassa 195 → "tee v13 itse" (vain jos kierrosdataa ateena.json pitää muuttaa; valo/ääriviiva ovat koodia).
- Vakiokuva-ajo: Julkaisija kääntää linssiseppa/aariviiva-197 763827606 → _tyo/linssiseppa/ateena197-app, lippu simu-ateenavakio197.nyt.
  Odottaja: `zsh proto-3d/tyokalut/linssiseppa-ajot/ajo-ateenavakio197.zsh > …/ajo-ateenavakio197.log 2>&1` (run_in_background).
  ENSIN `pgrep -fl ajo-ateenavakio197` ja loki: jos odottaja kuoli nollauksessa ja lippu on yhä olemassa, käynnistä uudelleen;
  jos lippu kulutettu eikä ajoa käynnissä, pyydä Julkaisijalta SIMU NYT. Skenaario sk-ateena-vakio-197.txt: koko kierros 8 pysähdystä,
  e0N = pelin kuva +4 s, d0N = diagnostiikka (`opas korostus nayta 1`: kaista kulta, ääriviiva punainen), h1-lento, z01-loppu (~15 min).
- Ajon jälkeen: SIMU VAPAA Julkaisijalle; arkki 8 pysähdystä (e/d), suurimmat puutteet → korjaukset haaraan (uusi worktree
  aariviiva-197:n päältä, esim. linssiseppa/ateena-hionta-197), uusi vakioajo, kuvat _valmiit/ + PT:lle 3 riviä, Linssit → NS junaan 197.

## 2. VALMIIT TÄSSÄ VUOROSSA
- PEKING PELIPUOLI → NS junaan 197: linssiseppa/peking-pelipuoli-197 9543fa294 (varjot + heijastusvalo + taivasheijastus; ionin peitto
  oletuksena POIS, koska se vei vallihaudan ja puistot; lähiutu 0,3). Linssit 1861/1861. Kuvat _valmiit/peking-pelipuoli-197-20261016/.
- TELAKOINNIN VALO k3d → Valosepälle ISS-luuppiin: linssiseppa/telakointi-havainne-196 9591cc8a9 (käännös 43bfabd5c). Heitin, kulkuvalot,
  portin valot, satiini-MLI vain kaareville pinnoille (k3 välke = sokerihile, k3c rypyt läikittivät radiaattorit). Testikomento
  `linssi raketti telakkapito <s>|jatka`. Linssit 1914/1915 (JatkuvaSuurennus, ks. alla). Kuvat _valmiit/telakointi-havainne-196-k3d-20261016/.
  Valoseppä ei vielä kuitannut (viesti jonossa 11.2x) → jos se pyytää jatkoa, telakka7-app on tallessa.
- EREKHTHEIONIN ÄÄRIVIIVA → NS junaan 197 (PT kuittasi): linssiseppa/aariviiva-197 763827606 (pieni rakennus: ääriviiva vaakapinnoille
  min(10, 0,6 × korkeus) m DTM-maan yllä; GLO-30 jättää jyrkänteen maan 6–8 m Googlen pinnan alle). Linssit 1912/1912, simu 859e418fa.
  Kuvat _valmiit/erekhtheion-aariviiva-197-20261016/.
- JatkuvaSuurennus (PT:n kysymys, vastattu): PK:n, jo korjattu 4052e3793 (juna 196); Valosepän pohja fda1ac8f3 sisältää museon kävely V2:n
  mutta ei korjausta → vihertyy yhdistettäessä juna 196:n päälle.
- Levykierros (Postivahti 09.13): ~4,2 Gi + myöhemmin telakka2/3/4/6-, peking1- ja aariviiva-197-appit poistettu.

## 3. AVOIMET
- Worktreet: aariviiva (NS:llä 197 + Ateenan pohja), peking197 (NS:llä 197), telakointi (Valosepällä), porttitasanne (NS 197),
  reittiedella (NS 196), korostusmaa + kehysvari (poista kun juna 196 yhdistetty), kierrokset195 (todistusajo.sh – älä poista),
  puutomat191 (ei yhdistetty mihinkään).
- _tyo/linssiseppa/telakka7-app (pidä kunnes Valoseppä kuittaa telakoinnin).
- tools/gpu-vapaa.sh ja .claude/settings.local.json* checkoutissa eivät ole minun (älä committaa).

## ALOITUSVIESTI SEURAAJALLE
Olet Linssiseppä (Opus, high). Lue CLAUDE.md ja tämä luovutus (git show <sha>:docs/raportit/viesti-linssiseppa-luovutus-20261016-1157.md).
Ensin kohta 1: tarkista ajo-ateenavakio197 (pgrep + loki), käynnistä odottaja tarvittaessa, sitten vakiokuvat → korjaukset → PT.
