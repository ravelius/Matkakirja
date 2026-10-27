# Päätoimittajan luovutus 27.10.2026 klo 16.41 (tili sami.reivinen@vvi.fi, PT local_8d8ebf72, konteksti 27 %)

Id:t: /Users/Shared/Claude/osoitekirja.md. Edellinen -20261027-1422.
Taulu https://claude.ai/artifact/R6VQFTUNq629zSzah719Uy; ArtifactData-luku toimii. Kirjoitukset: muokkaa paikallista
scratchpad/asemataulu/data/talo/*.json (.tmp + os.replace) ja pyydä Asemataulua (local_9faa33de) viemään
(nyt junat v150, tyolista v173). Lokikirjaukset: tools/uusi-worktree.sh fable <aihe> → raamattu-kirjaa → PR → squash →
`tools/uusi-worktree.sh --poista fable-<aihe>`. Huom: raamattu-kirjaa-tekstissä ei \" -lainauksia (jäävät kenoviivoina).

## 1. JUNAT
- 211 testaajilla. 212 auki, runko 3132fae7a (NS, testit vihreät); lukitus/TF vain omistajan pyynnöstä.
- 212 Valmiina tänään (iltapäivä): tietokortit (tyyppikuvakkeet, 1. kappale, väliotsikoille tilaa; ulkoasu hyväksytty 15.21),
  Kartta-välilehti (14.04), noston sumennus (lippu, päiväkirjakortti, maan nimi, isot paikannimet), VS:n juoksupinnat
  (kiilto, heijastus, sävyt, vertailuvalo; ad9759bc6).
- 212 Työn alla: NUI sumennus-erä 3 (UI-merkit + Pulu 4,5 pt, simu JU:lta → kuva PT:lle); KS Thames väistää maakortin +
  Stonehengen nimi ei jättikokoisena lähellä + Pulun kysymykset; Unesco-kuvat Codexin jonossa Olavinlinnan jälkeen (15.51);
  juoksupeli (alla).

## 2. OMISTAJAN PÄÄTÖKSET (lokissa)
- 14.34 Unesco 18 kohdetta (PR 5336) · 14.39 tietokortti 1. kappale (5339/5340) · 15.21 tietokortin ulkoasu (5343)
- 15.41 rimpuilu: ei rengasta, hehku voimakkaammaksi, yläkulma, repliikit (5348) · 15.43 boordit + kivireunus (5349)
- 16.03 reunakivi pitkinä kivinä, kaikki kivet samaa sävyä (5356) · 16.05 kamera ennallaan, isommat käsien rimpuilut (5359)
- PT:n omat linjaukset: päiväkirjakortti ja kaikki noston takana sumenee (13.25-linja); kuvaSumennusPt nosto toteutusta;
  kartuscha näyttää pelaajan maata (ei vika); KS:n PR 5338 maailmanperintökortti katettu 14.15/14.34:llä (JU mergesi).

## 3. JUOKSUPELI (KK johtaa)
- PK (6. nollaus 16.42, luovutus PR 5360): G-portaat pilkottu, a210bfa50 = G-kaiteet + rimpuilun hehku; LT:n A/B käynnissä
  (todisterivit "porraskaiteet mukana (18 ruutua)"). Rimpuilu v2 käsille Codexilta; Äänittäjä tekee repliikit (15.41).
  v53 + c1-sijoitukset.json (LR) samaan erään. C3 A/B pätevä: ei GPU-eroa.
- VS (nollattu 16.05, luovutus PR 5351): väreily kuja02 10,5 % → korjaus 34ea8094d (bias varjostimessa), LT mittaa uudelleen
  G-kaiteiden jälkeen; video ei tarvita. Kivet: reunus laji 18 (617af4400) + sävyt b57097f24, parit KK:lle.
  seinat-211 merge-pyyntö NS:lle KK-parin jälkeen ok.
- LR (5. nollaus 15.41): C1 v3 neljään halliin, vanha kultareuna pois (v53); reunus kavennetaan 0,4:ään (varmista PK:lta),
  kivet 1,2–2 m vaihtelevina; sini-violetit korvattu teal-1536:lla.

## 4. MUUT
- Olavinlinna (NS): rakenteet kuitattu 3a, 3b, 3c, 3d (tyrmä); V2-pinnat Codexilla (3c: tiilen mittakaava + liitokset;
  3d: ilma-aukon valo kattoon). Kokki + portinvartija: ARKit-morphit jälkikäsittelynä (NS 5c37d8709).
- Rimpuilu-/väreily-oppi kirjattu lokiin (erolista: materiaali, kivijako, sävyjen suhde, liikkeen väreily) — vienti
  tuotantoputkeen tai Raamattuun tekemättä (periaate 10).
- iPad: lopuksi aina 212-runko takaisin (JU). Esikatselut vain L2:lla (VS ajoi L1:llä, ohjeistettu).
- Levy 38 Gi (swap + laiteappit; JU siivoaa L1 Intermediates). KK 38 %. Postivahti ei mergeä: pyytää PT:tä.
