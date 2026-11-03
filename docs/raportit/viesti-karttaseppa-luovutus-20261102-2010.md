# Karttaseppä: luovutus 2.11.2026 klo 20.10 (KS)
Edellinen: viesti-karttaseppa-luovutus-20261102-1700.md (4ae17d52c; käsitelty: AVOIN 1 kuitattu ja ohitettu, AVOIN 2 jatkuu alla).
Syy: kontekstivahti 28 %. T = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/kohdetunnisteet-20261102/`,
I = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/isoisan-kartta-20261102/`.

## TEHTY
1. **Codexin 5,4 m/px -perusta** (513a9f3cd, SHA OK) → parit PT:lle; omistaja 17.39–17.42 hylkäsi pohjan (liian tarkka, nykykartta
   seepiana). Magnific-pari (`perusta-5_4m-20261102/pari-magnific.py`) valmis mutta PERUTTU; luonnos 74cd3b631 jää lähettämättä.
2. **Isoisän ajan kartan RUNKO** (omistaja 17.42, PT): `I/runko/` (LUE.md). `poimi.py` OSM-välimuistista (pariisi-pohja/osm) vain
   Seine, sillat, pääkadut/bulevardit, isot puistot, aukiot, nähtävyysrakennukset → `piirteet.json`; `piirra.py koepala25|kangas|pala<N>`
   → runko.png, runko-merkit.png, merkit.json (nro, nimi, lat/lon, px, rakennus_px); `tarkista.py` = piirretyt paikat merkkeihin (60 m).
   Mallikartat (Sonnet-agentti): `I/mallit/` 3 × 1878 PD Commons (Nouveau Paris monumental, Gaultier, Andriveau-Goujon), lahteet.md.
   Tilaus Codexille 827dcdeaa (aineisto `proto-3d/_tyo/codex/pariisi-isoisan-kartta-20261102/`).
3. Codexin otot A–C (6aa06eccb) ja E (6fcef081f) omistaja hylkäsi (18.31, 19.14). **Omistaja 19.17: uusi kartta tehdään ensin ilman
   paikka- ja etäisyysvaatimuksia, uusi Codex-sessio ilman runkoa; sovitus runkoon vasta tyylin hyväksynnän jälkeen.** Codex de6646e56.
   Pariisin karttaan EI ole KS:lle työtä ennen PT:n viestiä.
4. **Omistajan pyyntö 19.59 (KK → PT):** kaksi pelikuvaa nykyisestä rungosta Codexin tyyliviitteeksi, Iso iPad (2a02b6ed3 ⊃ 0ffb7e562),
   vaaka, UI piilossa (`ui pois`, lopuksi `ui paalle`): `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/kk-tyylikuvat-20261102/valmis/`
   (peli-ranska.png, peli-pariisi-lahella.png, ~100 km) → KK + PT 20.08. Ajoskriptit samassa kansiossa (ajo3.zsh = toimiva).
   Huom: tabletilla `ui matkakirja pieni` ei pienennä merkintää; `ui pois` piilottaa koko UI-kerroksen.
5. Tunnisteajo kaatui 17.4x Wikidatan DBConnectionErroriin → korjattu 91ccdbf70 (haara karttaseppa-kohdetunnisteet, pushattu),
   käynnistetty uudelleen irrallisena `zsh T/kaynnista.zsh` (pid T/ajo.pid = 21538, 17.49). Työlistan rivi päivitetty 19.5x.

## AVOIN (järjestyksessä)
1. **Tunnisteajo:** valmis = pid T/ajo.pid poissa ja T/ajo.log:n viimeinen rivi ei ole virhe (20.08: Amerikat menossa). Kaatuessa
   `zsh T/kaynnista.zsh` (EI session taustakomentona). Sitten luovutuksen 1430 AVOIN 3–4 (haarassa karttaseppa-kohdetunnisteet
   5f2f1d555): neljä käsilukkoa data/kohdetunnisteet.json:iin, `node tools/sisalto/kohdesijainnit.mjs --kaikki`, KAUKANA-lista PT:lle,
   raportti docs/raportit/kohdetunnisteet-20261102.md, PR haarasta karttaseppa-kohdetunnisteet (worktree wt/karttaseppa-kohdetunnisteet).
2. Pariisi: odota PT:n viestiä (tyylin hyväksyntä) → runko `I/runko/` uudelle Codex-sessiolle / sovitus (Seine ja Cité poikkesivat
   E:ssä rungosta, joten sovitus on isompi kuin nähtävyyksien siirto).
3. Vanhat: NUI:n vastaus maamerkkien alojen muotoon; 7.48: muita Pariisin osia ei aloiteta ennen KK:n suunnitelmaa ja PT:n viestiä.
