# Natiivisepän luovutus 20.10.2026 klo 21.41 (BUILD 208 lukittu ja TF:ssä; juna 209 auki)

Vain voimassa oleva tila. Historia: juna208/jono-208.txt, juna209/jono-209.txt (proto-3d/tyokalut/natiiviseppa-skriptit/).
Pysyvät säännöt: proto-3d/tyokalut/natiiviseppa-skriptit/juna183/luovutus-huomiot.txt. Id:t AINA osoitekirjasta.

## TILA
- **BUILD 208 = proto master aa1b21b8a35b4548f4c68a7643a1efb4d014b481** (juna/b36 6c0e7ca79, puu identtinen, peilit ok).
  Muutosloki main 1d9a06c94 (#5057, 279 merkkiä). Muistiajo OK (vapaa min 1819 Mt) → julkaisija-tyokalut/muistiajo-208.txt.
  JU: TF iOS 39470886279 (21.00) → sisäinen → ulkoinen → 207 vanhennus. Mac TF 39468883657.
- **JUNA 209 auki**: runko natiiviseppa/juna-209 (wt/proto-natiiviseppa-ehdokas) = **d489e3e10** VIHREÄ (2186/697/517, tarkista 0), peilissä.
  Sisältö 0a682d9ee:n (juna-208 + BUILD 208) päälle: LS 0ed56caf2 (pysty-Auto Zoom), NUI 390cac032 (suuntanuoli + maali, ⊃ PK maali-209),
  PK nakoisyys-209 87d3961e6 (⊃ 4a928209a, 782ce0de2 tausta v8, df0b0a42e kamera + v9, 8c44cfe21, a763a3efc botti, 510873880 kamera),
  VS kulta v2 b9802d3f3 (7904bb8ac), Lavastaja 2dada40f9 (Louvren Tripo-henkilöt). Skriptit juna209/ (b37).
- **ODOTTAA**: VS pihalaatat a047fe4df (⊃ kulta v3 59ee46762; mittaus ab73721b4 LT:llä) → runkoon PT:n OK:lla. Lavastajan kattokorjaus (PK kytkee)
  → sen jälkeen 209-simu PK:n uusintaan; **viimeistään 22.30** simu sillä mitä on (proto-kaanna.sh + PROTO_APP_KOPIO=…-209-runko-<sha>-sim).
- Ennen 209-lukitusta (PT): Lavastajan henkilöt-kuvapari + VS kattosävy jos ehtii. GPU 209 OK (8,5–8,7 ms). LUKITSE vain PT:n "OMISTAJA PYYSI JULKAISUA";
  build209-viesti.txt TÄYTÄ LUKITSE, muutosloki-209.txt puuttuu (PT:n teksti; ≤ 280 merkkiä PR:ään tools/vienti/muutosloki-natiivi.mjs).
- iPad Pro 13: 7904bb8ac/ab73721b4 LT:n käytössä; iPhone 37d8e8507.

## TYÖNKULKU (opittu tänään)
- Erä runkoon: pysäytä testit (pkill ketju209/testit209 + ehdokas-cwd:n dotnet/Unity), merge --no-ff, push peiliin, testit uudelleen.
- Mittausyhdistelmä: juna209/yhdista.sh <nimi> <runko> <commit> → laite209.sh <sha> <nimi> → polku LT + pyytäjä.
- Lukitus: lukitse209-ajo.sh <runko> → lukitse209-b.sh <runko> "<käännös>" "<muisti>" "<testit>" → muisti209.sh <BUILD> → mac209.sh <runko>
  → muistiajo-209.txt julkaisija-tyokalut/ ("OK <sha> <Gt> natiiviseppa (…)") → JU: proto_ref + muutosloki-merge-sha + muistiajo.
- Tapetun käännöksen lukko /tmp/matkakirja-kaannospalvelu.lukko jää: tarkista pid, poista jos kuollut.
- kaanna-editori.sh oletus nyt AsetteluTesti*.cs (bf87d6402; 17 näennäisvirhettä oli partial class -puute).
- Levy: omat app-kansiot siivotaan ajoittain (lokit/natiiviseppa-app-*, kaannospalvelu > 2 pv). ÄLÄ poista kaannospalvelu/juna.log,
  juna-tauko (pysyvä taukolippu, ilman sitä launchd-vahti kääntää junaa 10 min välein ja kaatuu T7:ään) eikä *.txt-tiloja.
