# Natiivisepän luovutus 1.11.2026 klo 00.05 (konteksti 30 %, 7.37; uusi tili org b408744a)

Vain voimassa oleva tila. Edellinen: viesti-natiiviseppa-luovutus-20261031-2205.md (JONO-kohdat 1 ja 2 ennallaan alla).
Id:t: /Users/Shared/Claude/osoitekirja.md. Yksi Unity kerrallaan linjalla (lukot). Ei keskeneräisiä ajoja eikä agentteja.

## JONO
1. **60 fps -jatko (PT 1.11. 00.0x): GC ja Nimikerros**, sama kaava kuin joutilaskorjauksessa: Time Profiler -löydös ja
   YKSI korjausehdotus PT:lle (≤ 3 riviä) ennen isoa muutosta, mittaus ennen ja jälkeen iPadilla, junaan vain erillisellä kuittauksella.
   - Ennen-loki valmiina: proto-3d/lokit/natiiviseppa-fps-jalkeen-ipad-20261031-2352 (= nykyinen runko-puu 4e055290c):
     ≥ 60 ms työjaksot 3 (kaikki GC, 60–79 ms), ≥ 40 ms 10 (GC 5, Nimikerros 3 ≤ 51 ms, Cesium 1, muu 1).
     Jatkuvat kulut (ms/210 s, ennen-ajo): Nimikerros 7776, InternetReachability 3544 (GetInternetReachability joka ruutu?),
     NostoKerros 3530, KokoSivuPeitto.Peittaa 3299 (UQuery-läpikäynti joka ruutu), Laattapalvelin 3003, Cesium 2849.
   - Työkalut proto-3d/_tyo/natiiviseppa/fps60/: ajo-laite.zsh (KS:n skenaario + xctrace Time Profiler --all-processes,
     käyttö `IPAD_ROOLI=NS zsh …/ipad-lukko.sh kaari NS -- zsh ajo-laite.zsh ipad sk-fps.txt <nimi>`, ~8 min),
     piikit-trace.py <loki> [ms] (työjaksot + raskaimmat funktiot), osuudet.py <loki> (ryhmät), kutsujat.py <loki> <kuvio>
     (kuka kutsuu). Raportti LOYDOS.md. `--attach` ei löydä prosessia → siksi --all-processes.
   - Huom: rungon mittaus-fps-*.txt ei merkitse liikekehyksiä (" L" vain KS:n koehaarassa karttaseppa/fps-d-216) → vertaa
     Time Profilerin työjaksoja. devicectl-lähetys epäonnistuu ajoittain yhden komennon kohdalla (myös "aani mykistys").
   - Laiteäpin käännös: vuoro JU:lta (KÄÄNNÖS NYT), skriptimalli scratchpadissa: laite-sha.sh <sha> <lokikansio>
     (PROTO_LAITE_KOPIO=…/proto-natiiviseppa-unity-b7) + devicectl install ipad-lukko.sh kaari NS:n kautta.
2. **VS:n kiiltokoe piha 06** koehaaralla natiiviseppa/koe67-piha06 = 5a51c8181 (worktree wt/proto-natiiviseppa-koe67, ÄLÄ poista):
   VS ajoi 22.08 ja 22.18 (pari-k06i, pari-k06j, exit 0), tulos VS:ltä ei vielä tullut. Ohjeet edellisessä luovutuksessa.
3. **PK:n taustan LOD -erä EI junaan 216** (PT 31.10. TILINVAIHTO VALMIS -viesti).
4. Muut merge-pyynnöt junaan 216 (PT OK → merge, testit, SHA PT:lle ≤ 3 riviä).

## TILA
- **Juna 216 runko = a29bb5d3f** (peilissä natiivi-backup peili/proto/natiiviseppa/juna-216; wt/proto-natiiviseppa-ehdokas):
  ca536d93e (ec0554ca8 + NUI museo-metro fb8391171) + fps-joutilas 4e055290c (PT kuittasi 1.11.). Puu = 4e055290c, testit 2223/782/575, tarkista 0.
- Laiteäpit: lokit/natiiviseppa-app-216-runko (ca536d93e), -fps-joutilas (4e055290c = runko-puu, asennettu Isolle iPadille 23.52),
  -ks-fps-d (KS:n koe 51415e442). iPadilla nyt 4e055290c = sama puu kuin runko → ei palautustarvetta.
- Korjaushaara natiiviseppa/fps-joutilas-216 (peilissä), worktree wt/proto-natiiviseppa-fps (voi käyttää GC/Nimikerros-erään uudella haaralla).
- R2-osoittimet ennallaan (uusin-5 → v6k28, uusin-4 → v6k26, uusin-3 → v6h3).
- Cron Unity-beeta "4 9 * * *" (python3 proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py) → luo uudelleen uudessa sessiossa.

## JATKOKOMENNOT
- Merge: wt/proto-natiiviseppa-ehdokas: `git merge --no-ff <sha>` → testit → `git push -q natiivi-backup HEAD:refs/heads/peili/proto/natiiviseppa/juna-216` → SHA PT:lle.
- Testit: `EI_PEILIA=1 nice -n 15 zsh /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna210/testit210-rinn.sh <työpuu>`
- ÄLÄ poista wt/proto-natiiviseppa-ehdokas, -muisti, -tyokalut, -koe67, -fps eikä T7-kopioita.
