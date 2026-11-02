# Karttaseppä: luovutus 2.11.2026 klo 10.11 (KS)
Edellinen: viesti-karttaseppa-luovutus-20261102-0853.md (käsitelty). Syy: kontekstivahti 26 %.
C = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-pohja/codex-pseudo3d/`, CX = `/Users/Shared/Claude/proto-3d/_tyo/codex/`,
V = `/Users/Shared/Claude/proto-3d/_valmiit/`. Koko kulku: `C/lahitaso-20261101/MUISTIO.md` (merkinnät 2.11. 08.59–10.1x).
KK:n suunnitelma: `/Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261102-pariisi-piirroskaupunki.md`
(KS:n osat C tähdet, G info+kioski, I monistus vasta Pariisin jälkeen).

## TEHTY (08.59–10.11)
1. Kadonneet ihmeet 5/5 Codexilta (c42384a4e; Grand Châtelet -poikkeama (860,137) KS hyväksyi c5da60a2d, PT kuittasi), käsitelty
   `C/ihmeet-20261102/kasittele.py` → `V/pariisi-leikkeet-20261102/`; parit PT:lle, kaistattomat `C/ihmeet-20261102/omistajalle/` KK:lle.
   **OMISTAJA 09.4x: leikkeet EIVÄT kartalle** → arkistoon (Codexille kerrottu cd6916ba7). NUI:lle lähti 09.25 leikerivit: NUI nollautui,
   PT/Postivahti hoitaa seuraajalle tiedon, että leikkeitä ei käytetä (varmista PT:ltä).
2. **Pyörivä tähti tilattu** (cd6916ba7): yksi tähti, tahti-001…072 RGBA 256², hehku.png, saumaton silmukka →
   `CX/pariisi-kadonneet-ihmeet/_review-tahti-20261102/`. Paikat valmiina: `C/tahdet-20261102/paikat.py` → tahdet.json + nui-rivit.txt
   (9: 5 kadonnutta, Châtelet 5240,3660 ja Tuileries 4470,3280 historiallisille paikoille; 4 nykyrakennuksen viereen ankkuri + siirto).
3. **Info + kioski VALMIS:** piirroksessa ei ollut aukiota → Codex maalasi Place de l'Hôtel de Villen (7d3772f4e → 03c17a648); natiivi
   liitetty todellisen muutosalueen mukaan (`C/info-kioski-20261102/aukio/alue-natiivi.py` + `liita.py`, SIGMA 6) → koottu-68a →
   kokoelma/G-tasot-68a-hill (4/54 muuttui) → `V/pariisi-tasot-aukio-20261102-vienti-20261102/` (TasoVersio "aukio-20261102", SHA256SUMS).
   Leikkeet + rivit: `V/pariisi-info-kioski-20261102/` (info-kioski.json, nui-rivit.txt, 4×-masterit); sijainnit.json → "rakennukset".
   Pari PT:lle `C/info-kioski-20261102/aukio/pari-hdv-aukio.jpg` (10.1x). Codexille kuitattu b9ab72dce.
4. Forum des Halles = Q939893 (KYLTIT-NUI.md, sijainnit.json).

## AVOIN (järjestyksessä)
1. **Tähti TOIMITETTU** (Codex acb2831ee, `_review-tahti-20261102/`, SHA ok 81/81; kuitattu f3079c3dd). PT teki videon → KK omistajalle.
   Omistajan vastauksen jälkeen: OK → sarja + hehku uuteen kansioon V/:hen ja C/tahdet-20261102/nui-rivit.txt (9 paikkaa, vaihe i·8) NUI:lle;
   korjattavaa → tyylikorjaustilaus Codexille (omistajan sanat). Oma video tarvittaessa: C/tahdet-20261102/esikatselu.py <review> <ulos.mp4>.
2. **Aukio-laatat VIETY** (JU 10.12, PT kuittasi: piirroskartta/pariisi/aukio-20261102/ 54/54, julkinen SHA ok). TasoVersion vaihto
   "aukio-20261102" samaan junaan NUI:n info+kioski-leikkeiden kanssa (rivit NUI:n seuraajalle Postivahdin aloitusviestissä).
3. Postilaatikon worktree `/Users/Shared/Claude/wt/karttaseppa-postilaatikko-veneet` (claude/postilaatikko): pidä tähteen asti.
4. Vanhat: NUI:n vastaus maamerkkien alojen muotoon; I monistus (paketti + tarkistuslista) vasta kun Pariisi valmis; 7.48: muita
   Pariisin osia ei aloiteta ennen KK:n suunnitelmaa ja PT:n viestiä.
Vahti: scratchpadin vahti.sh (review-kansiot + postilaatikko) oli tämän session Monitorissa; käynnistä omasi.
Huom: Wikidata-haussa 09.0x User-Agentissa meni vahingossa omistajan sähköposti; älä toista (vain projektinimi).
