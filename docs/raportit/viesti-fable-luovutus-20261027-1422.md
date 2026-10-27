# Päätoimittajan luovutus 27.10.2026 klo 14.22 (tili sami.reivinen@vvi.fi, PT local_8d8ebf72, konteksti 29 %)

Id:t: /Users/Shared/Claude/osoitekirja.md. Edellinen -20261027-1145.
Taulu https://claude.ai/artifact/R6VQFTUNq629zSzah719Uy; **ArtifactData-luku toimii taas PT:llä**. Kirjoitukset: muokkaa
paikallista scratchpad/asemataulu/data/talo/*.json (.tmp + os.replace) ja pyydä Asemataulua (local_9faa33de) viemään
(nyt junat v139, tyolista v166). Omistaja hereillä; KK johtaa juoksupeliä. Lokikirjaukset: oma haara pt/… → PR → squash.

## 1. JUNAT
- 211 testaajilla. 212 auki, runko e57834a60 (NS, testit vihreät); lukitus/TF vain omistajan pyynnöstä.
- 212 Valmiina tänään: koko pallo loitonnettavissa (12.27), vain 2D-merkit + karsinta + Kielletty kaupunki + nipistys +
  pallokytkin (12.43), lippu ei kasva + kuumailmapallot pystyssä + musta avaruus (13.25), tietokortti + noston sumennus (NUI).
- 212 Työn alla: Kartta-välilehti (NUI 8f51992aa valmis, odottaa KS:n Sisaltokerrokset.cs:ää, haara kerrokset-212),
  Unesco-koe (KS valitsee 18 → lista KK:lle → Codex 18 × 1 otto), tyyppikuvakkeet (Codex 153c05e4b → NUI), juoksupeli.
- Worker PR 5323 julkaistu 2b69a5a92 (tietokortit 2: osat, kohdetyypit, neutraali teksti). Näytteet pelistä KS → KK.

## 2. OMISTAJAN PÄÄTÖKSET TÄNÄÄN (kaikki lokissa + Raamattu)
- 12.27 loitonnus koko palloon (2.15/2.136) · 12.43 merkkien valinta, lippu, nipistys, pallokytkin (2.167) · 12.47 ääniotot
- 13.23 tietokorttien korjaukset · 13.25 lippu/pallot/sumennus · 13.38 latausmerkki pisteet · 13.48 kivetyksen kiilto (VS)
- 13.52 tietokortin teksti asiatekstiä, ei Pulun puhetta (2.203) · 14.00 + 14.04 Kartta-välilehti, 5 ryhmää + maailmanperintö (2.73)
- 14.15 Unesco-koe 3 kohdetta / maanosa = 18 (1.12); laajennus vasta kun omistaja nähnyt pelissä.

## 3. JUOKSUPELI (KK johtaa)
- PK (3. nollaus 14.0x, luovutus f06d1cc73): kiinniotto sivukameralla + peek_call hyväksytty Codexille; rimpuilu 84d3ea888
  ja sivukiinniotot f97bebb26 tarkistettavana; muurikate C3 + C2-kaiteet GPU-instansseina, LOD1 25 m (Codexin 7 mallia,
  1057 v2 hyväksytty); C2-kaiteiden näkyvyys selvitettävä.
- LR (4 nollausta tänään, kontekstisäästöohje aloitusviestissä): C3 muurikatteeksi, C1 vain rakennusräystäisiin (PT kuittasi),
  porraskaiteet G-jalustaan valmiit, seuraavaksi C1 1055 + 1056. Jonossa juoksupelin jälkeen: Olavinlinnan palatsi-v2.glb.
- VS: kivetyksen ympäristöheijastus (seinat-211 d7358dfff); 1066 kattomateriaali varalla.
- iPad-MITTAUKSET (PT hyväksyi, uutta tekniikkaa): JU kääntää PK:n instanssit + VS:n heijastuksen peräkkäin, LT mittaa
  p50/p95 molemmista → PK/VS/PT. LT kysyi vahvistusta 22.17-lepo-ohjeen takia → vahvistettu.

## 4. MUUT
- Olavinlinna: palatsi #1003 rakenne + v2 pinnat hyväksytty (NS); #3 osat Codexilla (raja 15.01).
- Nollaukset tänään: PT 12.10, LR ×4, PK ×3, NUI ×2, NS 12.28, KK 13.39.
- Levy 37 Gi vakaa (Postivahti seuraa; < 35 → VS/JU siivoavat).
