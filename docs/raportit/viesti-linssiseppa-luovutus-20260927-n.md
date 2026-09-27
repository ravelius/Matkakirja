# Linssisepän luovutus 27.9.2026 (n) — Linssiseppä (Opus, max) = myös Mallinseppä

*Kirjoitettu klo 16.3x Fablen pyynnöstä (konteksti 71 % → nollaus). Edellinen -m.md (tilinvaihto 11.4x). Uudet session id:t
(tili vaihtui 11.4x): Fable local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc, Natiiviseppä local_04e2850b-d63c-481d-be73-c7d784a7cbcb,
Karttaseppä local_4bd7c316-55bc-423a-9da1-821fdd123cab, Pelikoodari local_242febe9-d6cf-45ae-8280-faf394dc6e3e, Natiivi-UI
local_e9fdc695-8421-4c14-a187-8881e73c835a, Laitetestaaja local_3509b4ba-6000-4dea-869b-ecb22f4e3270, Julkaisija
local_1325b8e8-c39c-49f0-9ba2-7cabd4f44629, Postivahti local_63227b57-d045-4b93-ab52-cddc04e3b90f. Edellisen session
scratchpad S = /private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-linssiseppa/1accffb9-cad3-4f47-990e-ff9429642a7c/scratchpad
(m29-app = 1.0.29-juna c567fa57, ml1-app = erä 1 9a2a60c1); pysyvät skriptit ovat proto-3d/tyokalut/.*

## 1. JONO (Fable 16.2x)

1. **Meren laatutaso erä 2 laitteelle → kuvaparit Fablelle** (omistaja hyväksyi tyylin; kuvapareista merge-pyyntö Natiivisepälle):
   - Proto **`linssiseppa/meri-laatu-2` abb862d2** (worktree /Users/Shared/Claude/wt/proto-linssiseppa-meri, erä 1:n päällä; erä 1
     148b2b82 on jo junassa; `git merge-tree` junaa vasten: ei konflikteja). Seitsemän lajia: kalastusvene v4 (LOD0 2 718, kauko
     1 565), lautta v6 (2 820 / 2 420), majakkalaiva v8 (2 672 / 1 472), merihirviö v8 (2 708 / 2 568), delfiinit v19 (2 870),
     lokit v7 (2 731), jäävuori v14 (2 779 / 1 727). unity-tarkistus 0 virhettä. **Ei vielä laitteella.**
   - Käännös: rivi Karttasepälle ennen ja jälkeen, sitten
     `S=<uusi S> proto-3d/tyokalut/linssiseppa-ajot/kaanna-jono.sh ml2 linssiseppa/meri-laatu-2` (app → $S/ml2-app).
   - Ennen-käännös: kopioi `proto-3d/_valmiit/juna-c567fa57/Matkakirja3D.app` → `$S/m29-app/` (tai vanha S).
   - Laiteajo: `proto-3d/tyokalut/linssiseppa-ajot/ajo-meri-ennen-jalkeen.sh` (muokkaa RIVIT, L ja jälkeen-otsikko SHA:ksi).
     Suositusrivit: `FIN kalastusvene 5 1.2 1`, `DNK lautta 5 1.5 1`, `DNK majakkalaiva 5 1.5 0`, `GRC merihirvio 6 1.0 0`,
     `GRC delfiinit 6 1.0 0`, `UKR lokit 6 1.0 0`, `NOR jaavuori 5 1.5 0` (MERIKAARI=1.8 on skriptissä). Kooste
     `koosta_meri_laatu.py` → proto-3d/lokit/mallinseppa-toimitus-20260927/meri-laatu-<laji>-ennen-jalkeen.png.
   - Omistajalle kysymykset (agentit): majakkalaivan punainen myös lyhdyn kuvussa? Nimi "UTGRUND" (yleinen pohjoismainen
     muoto, ei oikea laiva; `Merkit`-taulukko)? Kalastusvene kulkee nyt aina rannikon suuntaan verkko merelle päin.
2. **Maaspeksit (VAIN EUROOPPA, omistaja 13.5x #3416):** docs/raportit/erikoismallit/{cesky-krumlov,malbork,pannonhalma}.md
   (aebdc22a1): elämänidea A/B omistajan korttiin Fablen kautta; mallinnus agenteilla harnesseissa
   proto-3d/tyokalut/mallinseppa-esikatselu-m1…m3 (juna-mallit valmiina, kääntyvät).
3. **Lentopeli odottaa ensi viikkoa** (omistaja 27.9.): suunnitelma docs/raportit/lentopeli-suunnitelma-20260927.md (948a66567,
   omistajan 5 päätöstä kirjattu). Lento v3 menee 1.0.30:aan (Natiiviseppä 9d318451; Fable hyväksyi 15 s kaikille, Etusija,
   ääni A).

## 2. TEHTY TÄSSÄ SESSIOSSA (27.9. klo 12.0x–16.3x)

- Lentopeli-suunnitelma + lento v3 §10 (41cf81337, 948a66567).
- Meri 10/10 laitteella 1.0.29:stä (meri-10-lajia-1029.png).
- Vuori-symbolin LOD0-juuren nurin olleet tahkot 38/338 → 0 (vuori-juuri 6e721977, junassa ad444b9d).
- Maaspeksit erä 4 (Opus-agentti, aebdc22a1).
- **Meren laatutaso** (omistaja 13.0x: "Nuo voisi tehdä korkeammalla laadulla"): speksi docs/raportit/meri-laatu-speksi-20260927.md
  (§6 tila); uusi `Linssit/Resources/Varjostimet/MeriMalli.shader` (B-seepiaramppi, korostus, kaiverrusreuna, 1,2 pt:n
  ääriviiva, vesikerros UV1-merkillä, _Peitto, valo kartan luoteesta) ja `MeriLajit/MeriRakentaja.cs` (vesikolmiot aina ylös);
  ElavatElementit (Seepia-lippu, ääriviivamateriaali, kaukotaso peiton alle 0,5, piirtojärjestys roottori → lapsiryhmät, ms
  tila-rivillä). Erä 1 (merilaiva v12, purjelaiva v10, valas v8) laitteella 9a2a60c1: 2 520–2 911 kolmiota, CPU ≤ 0,03 ms,
  0 poikkeusta; omistaja HYVÄKSYI (purjeet rampissa, haalistumiskynnys ennallaan); merge-pyyntö lähetetty, erä 1 junassa.

## 3. TYÖKALUT JA OPIT

- **Harness:** proto-3d/tyokalut/meri-laatu/ (pohja/, yhteiset/MeriRakentaja.cs, lajikansiot, vanha/): `./kaanna.sh`,
  `./aja.sh <Luokka> <ajat> [harv] [kauko]`, `python3 piirra.py <verkko> <png> [--kierto --koko --kallistus --ss]`
  (MeriMalli-emulaatio, pelikoko ilman ylinäytteistystä, MSAA pois laitteella). Integrointi:
  `python3 proto-3d/tyokalut/meri-laatu/integroi_laatu.py <kansio>:<Luokka> …` (kopioi lajin worktreehen, luo metan, korvaa
  rekisteririvin, säilyttää Harvinainen/VahintaanLat).
- **Laitekuvaus:** `ajo-meri-laatu.sh` (maan lajirivi, kamera ankkuriin, `nayta`, panorointi keskelle, sarjat peli35 + peli0
  samassa näytöksessä ja lahi35 koko 3; laivoilla puoliväliin odotus). Opit: peitto < 1 yli 450 km:n korkeudella (kaari 2,4 =
  0,59) → kaari 1,8; `nayta` toimii vain maan lajiparin lajille ja vain kun ankkuri on ruudulla näytöksen alkaessa; kallistus 0
  siirtää näkymää (panorointi uudelleen); laji voi olla siirretty 140 pt ankkurista (sama kohta); paikallaan pysyvät lajit
  (valas) eivät erotu mediaanitaustasta → kiinteä rajaus; kartan sadekuuro voi osua kuvaan (keskikehys laivoille).
- **Mallien opit:** vesi tasona y ≥ 0; lapsen (x, z) pysyy kallistamattomana (LapsetOmaanPisteeseen) → kiinni pysyvät osat
  roottoriin tai lapsen origo roottorin origoon; lapset saavat ääriviivan (pienet osat alle 0,006); kameraa kohti oleva pystypinta
  on seepiaa (valo luoteesta); varjo on mallin alla, koska Animoi ei tiedä ilmansuuntia (jatkoidea MeriKoristeet.VarjoSuunta).

## 4. AVOINNA MUILLA

- ElavaHerays.cs-tynkä poistetaan, kun Natiivi-UI:n UiNakymat.cs asettaa ElavaKartta.KorttiAukiKysely/KuvapakkaLahtee suoraan.
- Natiivisepän -m-listan kohdat (lähikynnys pienissä maissa, nimiö erikoismallin päältä, Malja Kinderdijkin päällä) ennallaan.
