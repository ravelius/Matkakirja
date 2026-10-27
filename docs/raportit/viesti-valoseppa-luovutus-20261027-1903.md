# Valosepän luovutus 27.10.2026 klo 19.03 (juoksupeli, KK johtaa; kontekstiraja)

Lue ensin: tämä, sitten loki `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (rivit 27.10. 17.13 →).
Worktree `/Users/Shared/Claude/wt/proto-linssiseppa2-p11`, haara `linssiseppa2/seinat-211` (natiivi-backup, pushattu), kärki **b60aa63f2**.
**KUVAPARIT:** `REF=<sha> MALLIT=file://<juuri>/ zsh /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/tyokalut/editori-vs.sh 02 01 05 03`
(vie MALLIT-rivin; worktreen `tyokalut/havainne/editori.sh` ei). Esikatselut L2:lla. Kuvien katselu ja mittaukset Sonnet-agentille.

## Tehty 17.13 jälkeen
- **Reunakivi ei näkynyt v84m:ssä – kaksi syytä:**
  1. LR:n `yksikerros-v79/kielletty-tausta-v57/tausta.json` ei listannut paloja kk-tausta-kuja-0-3, kuja-1-3, aukio-1-1 (vain tausta-lodN.json);
     peli lukee vain tausta.json:n (Palatsi.cs:144). LR täydensi (työkalu vientiketjuun), juuri-v85m+, PR 5371.
  2. 93baa5d55: `Valopohja` asetti _JuoksuLaatta/Kivi/ReunusSavy = Vektori(w 1) + (0,0,0,1) → w = 2; näissä varjostin käyttää w:tä lerp-painona
     → 2·sävy − 1 (reunus sinapinkeltainen, sininen 0). QA-sävykokeet (w = 1) olivat oikein, oletusajot eivät.
- **Junassa 212:** 88a6b4273 (= 074acdf85 + if-runko omalle rivilleen, JuoksuHaivytysTestit.BooliFloatVertailuistaMetalille) + LR tausta-v59
  → NS runko fd98cb87b vihreä (2213/757/563, METAL 440/0, PIPELINE 432/0).
- **KK 17.5x (lähikuva reunus-02-lahikuva-1733):** reunus sileä ja beige → kivipinta ja sävyt (661adcb00 … b60aa63f2, EI vielä junassa):
  ReunusKivi: Codexin kivikuva UV0:sta (0,70) + pilvisyys ±20 % + hieno rakeisuus (häivytys fw), kivikohtainen ±8 % ja lämmin/viileä vivahde,
  tumma 16 mm sauma, särmä 5 %; rajat **k·0,7 + (frac(k·0,618034) − 0,5)·0,2** = LR:n yksikerros-v81:n saumaurat (2cb23fc37; TiivisteK ei
  kelpaa rajoihin, float32 kaoottinen). Sävyt: ReunusSavy 1,18/1,08/0,95, KiviSavy 0,83/0,81/0,81 (pari 180420: reunus L* 70–80 ≈ lattia,
  kivijalka 65–68). Sivupinnan kompensointi (1,15/1,25/1,52) liukuu kallistuksen mukaan ja viiste −22 % (b60aa63f2: LR:n v81-viisteet olivat
  lähes valkoisia nauhoja L* 97).
- Parit: 180420 (6c18327ed, v85m) → KK + PT lähetetty; 182730 (6c18327ed, v86m) → PT; LR 185308 (2cb23fc37, v87m); 185916 (b60aa63f2, v87m, 02/05).

## Kesken (seuraava Valoseppä)
1. **Pari 185916:** valkoiset viistenauhat poissa 3/4; yksi jäännös kohdassa (440–467, 127–141) LR:n lähikuvarajauksessa (L* 96 vs 71).
   LR tekee v82:n (urat 2 × 6 mm, 3 cm syvät) ja ajaa parin REF=b60aa63f2 → tarkista, jääkö jäännös. Jos jää: uraseinät/viiste tummaksi
   normaalista (ny) tai pienennä viisteen kirkkautta lisää. Sivu on hieman viileä (h 329–348) vs havainne → voi lämmittää hieman.
2. **KK-pari** (02/01/05/03 + reunuksen lähikuva samalla rajauksella kuin reunus-02-lahikuva-1733) LR:n v82-juuren kanssa → KK ja PT (KK pyysi).
3. **NS:** KK:n kuittauksen jälkeen seinat-211 661adcb00..kärki junaan (yhdessä LR:n v82-juuren kanssa); muista BooliFloat-testi
   (if-rivillä &&/|| + (float)x.w → runko omalle rivilleen) ja metal-tarkistus.sh tai NS:n METAL/PIPELINE.
4. **LT:n mittaus** (väreily kuja02-3 kuvabias 0/1/2, taivas aukio03/keski52) edelleen auki (JU:n asennus + PT:n vuorovahvistus).
5. 03:n aukion lattia kirjava (kerma/sinertävät laatat, soikeat läiskät kaukana) – vanha, ei tämän erän; ei vielä pyydetty.

## Huomiot
- Osoitekirja: roolit eivät viesti KK:lle, paitsi KK:n pyytämät parit (KK 17.5x pyysi pariin KK:lle ja PT:lle).
- Scratchpadin tee_juuri.py (tilapäinen juuri täydennetyllä tausta.json:lla) ei enää tarpeen.
