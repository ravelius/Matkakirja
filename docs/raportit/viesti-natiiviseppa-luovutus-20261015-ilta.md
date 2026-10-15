# Natiivisepän luovutus 15.10.2026 klo 17.2x (konteksti, PT:n pyyntö)

Lue ensin: CLAUDE.md, Raamatun Ydinajatus kohta 2 ja tämä kokonaan. Pysyvät säännöt: proto-3d/tyokalut/natiiviseppa-skriptit/juna183/luovutus-huomiot.txt
(lopussa uusi Asemataulun osoite). Jonot (lopusta alkuun = uusin tila): natiiviseppa-skriptit/juna195/jono-195.txt, juna194/jono-194.txt, juna193/jono-193.txt.
Viestit AINA session id:llä osoitekirjasta /Users/Shared/Claude/osoitekirja.md (tilinvaihto 15.10. 12.1x: kaikki id:t uusia; PT = local_5df52e10-…,
Julkaisija = local_5cb16c00-…). PT:lle ≤ 3 riviä. Asemataulu: https://claude.ai/artifact/Qo5w6Wk4JSYRwYbyf2fJrm (talo/eteneminen).

## TILA

- **BUILD 193 julkaistu**: proto master 39784f0ed (juna/b21 = runko 1595cae5a, L1 a1047f763), muutosloki #4614 (M 684c434c8), Mac TF 38726408684 SUCCESS,
  iOS TF Julkaisijalla. Muistiajo OHITETTU (omistaja 09.36 "Ei testejä junaan").
- **BUILD 194 julkaistu**: proto master **b110dff52** (juna/b22 = runko da6b64860, L1 fd13650bd 16.35, virheitä 0), muutosloki #4626 (M 5f48994bf),
  web #4625 (isoisä v3) mergetty 100b07b42 + vienti v745 ennen TF:ää, iOS TF 38749089375 (Julkaisija, sisäisille jako 17.2x), Mac 1.1 (194) TF 38749142197 SUCCESS 17.25.
  Muistiajo OHITETTU (/Users/Shared/Claude/julkaisija-tyokalut/muistiajo-194.txt).
- **Juna 195 -runko** natiiviseppa/juna-195 (wt/proto-natiiviseppa-ehdokas) = **bd8172744**, testit 1865/586/492 vihreät, tarkista 0, PT kirjasi.
  Sisältö BUILD 194:n päälle: NUI aloitus-195 2a9db0956 + 465910243 + 8eaf6307c (aloitusjuliste, aloitusvalinnan pallo, kaupunki-intron pehmeys),
  Siirtoseppä vapaalento-195 2468450eb, LS1 kierrokset-195 f0a07ccb1 + 66c5be330 (DTM-korostus, historiaosio pysähdyksen lopussa, Ateena v10).
  Web #4629 (apurahan pallokuva) junan 195 web-joukossa.
- **OMISTAJAN PÄÄTÖS 17.24**: "tehdään juna 195 vasta sitten kun pyydän" → kertyy, EI lukitusta eikä TF-käännöstä ennen omistajan pyyntöä (PT välittää).
- Lukitusehto 195: Julkaisija vie opas-pallokierros-ateena-v10 ennen TF:ää. Tulossa myöhemmin: Prahan ja Ateenan historiaosiot (PT 16.2x, siirtyivät 194:stä).
- Ei ajoja käynnissä. Unity-beetaseuranta: CronCreate "4 9 * * *" oli istuntokohtainen → luo uudelleen (15.10. tarkistettu: ei uutta).

## LUKITUS 195 (kun omistaja pyytää)

Kopioi juna194/lukitse194-{a,ajo,b}.sh, mac194.sh, build194-viesti.txt → juna195 (scratchpad-pohja: korvaa BUILD 193→194 edellisenä, 39784f0ed→b110dff52,
juna/b22→juna/b23, 194→195, pyyntörivi; shutil.copymode). Testit: `zsh juna195/testit195.sh` run_in_backgroundilla (peilin push 2>/dev/null, ettei
remote-rivit sotke tail -8:aa). Järjestys: muutosloki ≤ 280 mrk / ≤ 3 lausetta → PT kuittaa → `tools/uusi-worktree.sh natiiviseppa muutosloki-195`,
`node <wt>/tools/vienti/muutosloki-natiivi.mjs --versio "1.1 (195)" --teksti "…"` → PR → `gh pr merge N --squash` ITSE ennen käännöstä → M Julkaisijalle;
poisto `tools/uusi-worktree.sh --poista natiiviseppa-muutosloki-195` (+ .DS_Store jää: poista kansio). KÄÄNNÖS NYT (Julkaisija antaa linjat):
`PROTO_LINJA=1 zsh juna195/lukitse195-a.sh <runko>` + Mac `PROTO_LINJA=2 zsh juna186/mac186.sh <runko> 195` → lukitse195-b → BUILD-SHA (täysi)
Julkaisijalle + PT:lle. Jos Julkaisija sanoo "TF vasta viennin jälkeen", Mac-TF erikseen (juna194/mac194-tf.sh pohjaksi). Asemataulu talo/eteneminen
(get → update if_version; ts = `date +%s000`, ÄLÄ arvaa).

## OPITUT 15.10. ILTAPÄIVÄ

- Myöhässä tullut kuitattu erä ennen käännöstä (Akropolis 193): keskeytä käynnissä olevat testit (TaskStop), yhdistä, aja käännös + testit rinnakkain
  (proto-kaanna.sh kääntää omassa kopiossaan, ei worktreestä).
- Toisen roolin "PT kuittasi" -väite → vahvista PT:ltä ennen yhdistystä (fccae7f47, a6741fd04 vahvistettiin; f0a07ccb1 ei ollut vielä kuitattu).
- Isoisän kaariäänet: natiivi lukee kokoelmat/tarinakaari.json ajonaikaisesti (PeliOhjain.HaeTiedosto, ei tilannekuvassa) → ei runkomuutosta; ehto = web-PR
  mergetty + sisältövienti ennen TF:ää. Maanpinnan versiot (OmaKorkeus.MaaVersiot -v3→-v2→v1) samoin datavientinä.
- Muutosloki näkyy kaikille pelaajille: ei "valitsemallasi"-muotoa (PT hyväksyi neutraalin).

## TYÖTILAT

wt/proto-natiiviseppa-ehdokas (natiiviseppa/juna-195 bd8172744, puhdas), wt/proto-natiiviseppa-tyokalut (YHTEINEN todistusajon polku – ei poisteta),
wt/proto-natiiviseppa-unity67. Haarat natiiviseppa/juna-193 ja juna-194 mergetty masteriin (BUILD 193/194).
