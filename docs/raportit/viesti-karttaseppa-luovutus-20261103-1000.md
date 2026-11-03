# Karttaseppä: luovutus 3.11.2026 klo 10.00 (KS)
Edellinen: viesti-karttaseppa-luovutus-20261103-0848.md (+ lisäykset 09.05, 09.35; käsitelty: pala09 hyväksytty, erä B aloitettu).
Syy: kontekstivahti 33 %. P = `/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-valmis-runko-20261102/`,
N = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/tasangot-poltto-20261103/`, E = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/esittelypaikat-20261103/`,
postilaatikon worktree `/Users/Shared/Claude/wt/karttaseppa-postilaatikko` (fetch + checkout --detach origin/claude/postilaatikko, commit, push HEAD:claude/postilaatikko).

## TEHTY
1. **pala09 v7 HYVÄKSYTTY** (b6a5379cc; PT kuittasi). v6 katkesi yhä → PT:n varasuunnitelma: pala05:n lukko auki kahdella kaistalla
   (`P/avatut-kaistat.json`: A x 258–378 y 124–154 kortteli Eiffelin alla, B x 440–548 y 116–154 Champ de Mars). `lukitse.py` tukee
   kaistoja; **koonnissa pala05:n tilalla käytetään** `tarkistus/paikkaa_kaistat.py 9 <pala09-liukuma.png> <ulos-pala05.png>`
   (`P/LUE.md` "Avatut kaistat"). Mittari 2,48 → 1,68. PT: itäpuolen puurivissä (x 548–700, y 154) jäännössävy 3–4 tasoa →
   tarkista koko kankaan koonnissa, ei uutta ottoa.
2. **pala14 HYVÄKSYTTY** (cbe832879): mittarit 1,56 / 1,33; katakombien kylttisiirto 137 m (`P/kylttisiirrot-pala14.json`).
   `hyvaksytyt.json` = [1, 2, 3, 5, 6, 7, 9, 10, 11, 14, 15]; `P/SHA256SUMS` ajan tasalla. Rivi PT:lle jonossa (lähetetty).
3. **Erä B, esittelykuvien paikat – osa 1 (Lontoo + Pariisi): PR 6116** (510ee5c58, CI kesken; yhdistä vihreänä).
   Esittelykuvat = trailerin 3 ensimmäistä `kansi.avauskuvat` (puuttuessa kansikuvat; natiivi Saapumistraileri.Kuvia = 3,
   UiSisalto.LueKuvat) + Pariisin C1–C4 (KaupunkiIntro.KuvaUrl; C5 matkakirjasta). Avain = osoitteen tiedostonimi.
   `data/esittelypaikat.json` + `tools/sisalto/esittelypaikat.mjs --vienti <paketti> --syote <tulos.json> --valimuisti <kansio>
   --kirjoita` (piste ≥ 25 m nostoista/kohdekartoista, maalla, Overpass – HIDAS ~50 s/piste, aja taustalla). Vienti skeema 1.69
   `kaupungit.esittelypaikat { tiedosto: { lat, lon, kohde } } | null`. Puuttuva/paikaton = keskusta (NUI).

## AVOIN (järjestyksessä)
1. **PR 6116** vihreäksi → yhdistä; rivi NUI:lle (id osoitekirjasta): "SaapumisKuvat.Paikka lukee kaupungit.esittelypaikat
   [Path.GetFileName(osoite)], puuttuva = keskusta; skeema 1.69" (NUI:n jono kohta 3).
2. **Erä B osa 2: muut 58 kaupunkia.** Sonnet-parvi: syötteet ja ryhmän 3 tulos E:ssä (`syote-1..3.json`, `tulos-3.json`
   57/57 Wikidata; Bratislavan näkymä vaihdettu linnaksi). **Ryhmät 1 ja 2 olivat kesken** – tulokset kirjoittuvat
   `/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-karttaseppa/38767251-991f-46e8-8ea5-482ccf632ffc/scratchpad/parvi/tulos-1.json` ja `tulos-2.json`;
   kopioi E:hen. Jos puuttuvat, aja ryhmä uudelleen samalla ohjeella (syote-N.json → tulos-N.json, Wikidata P625 + Q-tunnus).
   Sitten: `python3 -I` tarkastus (etäisyys, päällekkäiset), `esittelypaikat.mjs --syote E/tulos-{1,2,3}.json --kirjoita` taustalla
   (tunteja Overpassilla), vienti + `skeemasopimus` (ei versionnostoa, sama kenttä) + testit `tests/vienti.test.mjs
   tests/sisaltopaketti.test.mjs` → PR → rivi PT:lle.
3. **Pariisi, Codexin jono:** 13 ja 04 (lukitsevat 09:n ja 14:n), sitten 08 ja 12. Tarkistuskaava kuten edellisessä luovutuksessa;
   koe: saumaliukuma → `tarkistus/kokoa_monta.py` (uusin ensin). Kaikkien jälkeen koko kankaan koonti (saumaliukuma joka palaan +
   pala05 paikattuna kaistoilla) ja tasot; omistajalle vain koottu kaupunki.
4. **Tasankopoltto:** N/ketju.sh vaihe 1/5 (z8-011 valmis klo 10); ketjun jälkeen N/LUE.md "Ketjun jälkeen" → rivi PT:lle.
5. Vanhat: 27.10. poltto T7-arkistointi vain jos levy < 50 Gi (nyt 70 Gi); NUI:n maamerkkien alat.
