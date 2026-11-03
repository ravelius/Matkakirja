# Karttaseppä: luovutus 3.11.2026 klo 14.10 (KS)
Edellinen: viesti-karttaseppa-luovutus-20261103-1305.md (käsitelty: lisäys 13.1x tehty, AVOIN 4 kylttisiirrot tehty). Syy: kontekstivahti 25 %.
P = `/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-valmis-runko-20261102/`, E = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/esittelypaikat-20261103/`,
N = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/tasangot-poltto-20261103/`, S = `/Users/Shared/Claude/proto-3d/lokit/karttaseppa-pariisi-bigben-0c103c3a9-20261103/`.
Proto-haara `karttaseppa/bigben-lahi-218` (worktree `/Users/Shared/Claude/wt/proto-karttaseppa-bigben-218`, paikallinen repo, ei pushia).

## TEHTY
1. **Kylttisiirrot peliin (PT kuittasi 13.2x): proto 8d4142b3b + 7eebf233c.** `P/tasot-v5/kylttisiirrot-peliin.py <Merkittavat.json>` →
   `PiirrosKerros.Kylttisiirrot` (qid → ero Merkittavat-pisteeseen), Nimikerros.HaePaikka käyttää siirrettyä kohtaa vain p.siirto-laskussa
   (elävällä kartalla nimi maan kohdassa). 19 kohdetta: PT poisti Gare d'Austerlitzin ja Hôpital Lariboisièren (pohja väärässä rakennuksessa).
   Testi Kartta-testit/Testit/PiirrosKylttiTestit.cs; arkki `P/tasot-v5/pari-kylttisiirrot.jpg`; LUE.md "Kylttisiirrot pelissä".
2. **Kylttipäällekkäisyydet (PT 13.3x): proto 4301f394a.** Grand Châtelet (piirros-pariisi.json) 48.861997, 2.34734 → oman tähtensä kohta
   48.858229, 2.343925 (vanha piste Les Hallesin hallin päällä); Bastilji (kyltti, tähti Tahdet.cs, "Bastilji 1789") 48.855485, 2.369804 →
   v5:n heinäkuun pylväs 48.8533, 2.3687 (pois Place des Vosges -nimen vierestä). Kartta-testit Piirros 6/6.
   JU yhdisti: 7eebf233c → c660bbc50, 4301f394a → b39c1bc9a (sitten c16a6fac6, eb2c92eb3).
3. **Sacré-Cœurin esittelypiste NUI:lle:** hero-pariisi-sacre-coeur.jpg piste 48.88665, 2.34336 (30 m itään; nosto 17 m päässä).
   NUI vei natiivin varatiedostoon c6c7cfd85 (natiivi-ui/saapumiskuvat-nousu-218); JU:lle kerrottu, ettei se ole c16a6fac6:ssa.

## AVOIN (järjestyksessä)
1. **Simukuvat Pariisi v5 + Big Ben** (kyltit, 16 siltaa veneiden päällä, lähin zoom ~3,5 km, Big Ben vain lähellä). NUI:n ajo
   (lokit/nui-ks-kyltit-b39c1bc9a-20261103/) EPÄONNISTUI minun parametreillani: `aja lat lon <kaari ASTEINA> s` (ei lautayksiköitä) →
   kuvat ~55 km:stä, l1 = l2. Korjattu `S/ajo.zsh` (laaja 0.14, väli 0.06, lähin 0.02). **JU lupasi SIMU NYT eb2c92eb3-simun jälkeen** →
   aja `zsh S/simu.zsh` taustalla (NUI:n b39c1bc9a-app, ei käännöstä, simu-lukko kaari) → tarkista p1–p8, l1–l2 → kuvat/rivi PT:lle →
   "VAPAA" JU:lle. Korjaukset samaan proto-haaraan → SHA JU:lle.
2. **Esittelypaikat 58 kaupunkia:** pid 23585 käynnissä 14.07 (27/58, Overpass 502/504). Valmis = `pgrep -f esittelypaikat.mjs` tyhjä →
   worktree `/Users/Shared/Claude/wt/karttaseppa-esittelypaikat` (haara karttaseppa/esittelypaikat-muut): **ensin E/MUISTA.txt** (Sacré-Cœurin
   piste käsin dataan: ajo ei laske sitä, ei vientipaketin esittelykuvissa) → `git diff --stat data/esittelypaikat.json` → vienti
   (`tools/vienti`) + skeemasopimus (sama kenttä, ei versionnostoa) + `node --test tests/vienti.test.mjs tests/sisaltopaketti.test.mjs` →
   PR → rivi PT:lle. Kuoli: komento luovutuksessa -1235 AVOIN 2 (välimuisti E/ov-valimuisti jatkaa).
3. Tasankopoltto: ketju odottaa joutilasta Macia (N/ketju.out; ei ketju.valmis). Valmis → N/LUE.md "Ketjun jälkeen" → rivi PT:lle;
   kuoli → `zsh N/jatka.sh`. **Levy 23–28 Gi** (L1-käännös kaatui 13.32 rajaan 25 Gt; JU kysyi siivousta PT:ltä); N on vain 1,1 Gt.
4. Pariisi: turisti-info/lehtikioski-leikkeet vanhaa tyyliä (luovutus -1305 AVOIN 1 b), vasen yläkulma jää (PT 12.5x).
5. Vanhat: 27.10. poltto T7-arkistointi vain jos levy < 50 Gi (PT:n luvalla); NUI:n maamerkkien alat.
