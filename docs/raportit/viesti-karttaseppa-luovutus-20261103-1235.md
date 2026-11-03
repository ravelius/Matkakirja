# Karttaseppä: luovutus 3.11.2026 klo 12.35 (KS)
Edellinen: viesti-karttaseppa-luovutus-20261103-1050.md (käsitelty). Syy: kontekstivahti ~30 %.
P = `/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-valmis-runko-20261102/`, E = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/esittelypaikat-20261103/`,
N = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/tasangot-poltto-20261103/`. Venv: "/Volumes/T7 4TB/Matkakirja-karttaseppa/venv-kartta/bin/python".

## TEHTY
1. **Big Ben vain lähizoomilla (PT:n kiireellisin, ehto pienen iPadin asennukselle): proto 9b442edc5**, haara
   `karttaseppa/bigben-lahi-218` (juna-218:n 1420265d7 päällä), worktree `/Users/Shared/Claude/wt/proto-karttaseppa-bigben-218`.
   Linssittömät maamerkit (Big Ben, Kielletty kaupunki; `KaupunkiPallot` Malli && LinssiId null) näkyvät vasta samalla portilla kuin
   kaupungin nähtävyysnostot (`Kohdenostot.Lahella`: elävä taso + 0,6 ≥ ElavaTyyli.Ensimmainen, hystereesi 0,4); kauempaa häivytys
   Peitolla. `KaupunkiPalloMitat.MaamerkkiLahella` + Kartta-testi `MaamerkkiVainLahizoomilla` (KaupunkiPallot 11/11). Unity-käännös
   ja simu JU:n vuorolla; rivi PT:lle lähetetty (jonossa 12.1x). Linssien mallit, raketti, torni ja museot ennallaan.
2. **Pariisin koonti v3 → PT 12.33** (`P/tarkistus/koonti/pariisi-yleis-v3.jpg`, pari `pariisi-v2-v3-pari.jpg`, tulos
   `pariisi-koko-rgba-v3.png`). Uudet `varisiirto.py` (L/C/h-kvantiilit palojen mediaaniin + a*/b* L-kaistoittain, ei länttä) ja
   `saumasavy.py` (saumojen sävysilta + saumakaistan kylläisyys/yksityiskohta), `lab.py`; ketjutettu `kokoa_pariisi.sh`:n loppuun.
   Mittarit ja jäljelle jäävät huomiot `P/tarkistus/koonti/LUE.md` "v3". Mittausskriptit scratchpadissa (jakauma/saumat/profiili.py) –
   tarvittaessa kirjoita uudelleen LUE.md:n kuvauksesta.
3. Nollauksessa kuolleet ajot käynnistetty uudelleen 12.18: tasankoketju `zsh N/jatka.sh` (ketju.out: 12.18 perus CDN:ssä, odottaa
   joutilasta Macia ≥ 10 min); esittelypaikat-ajo (nohup, pid 23585) worktreessa `/Users/Shared/Claude/wt/karttaseppa-esittelypaikat`
   (haara karttaseppa/esittelypaikat-muut, ff origin/main 39729dcd3), loki `E/ajo-muut.log` (vanha `ajo-muut.log.1209`), 59 ok klo 12.33,
   Overpass 502/504 hidastaa.

## AVOIN (PT:n järjestys)
1. **Pariisi v3: odota PT:n kuittausta** → sitten tasot (laaja 12 / väli 6 / kaupunki 2,5 m/px, ruudukko.json `tasot`, uusi
   TasoVersio-kansio; luovutus 20261102-2210 AVOIN 2: siltaleikkeet, Seinen venereitti NUI:lle, kylttisiirrot peliin). Jos PT palauttaa:
   keinot LUE.md v3 kohta 3 (kattojen sävytyyli x 2612 1:1:ssä).
2. **Esittelypaikat 58 kaupunkia:** kun ajo valmis (`pgrep -f esittelypaikat.mjs` tyhjä, lokin loppu), worktreessa
   `git diff --stat data/esittelypaikat.json` → vienti (`tools/vienti`) + skeemasopimus (sama kenttä, ei versionnostoa) +
   `node --test tests/vienti.test.mjs tests/sisaltopaketti.test.mjs` → PR → rivi PT:lle. Jos ajo kuoli: sama komento uudelleen
   (välimuisti E/ov-valimuisti jatkaa): `node tools/sisalto/esittelypaikat.mjs --vienti /private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-karttaseppa/38767251-991f-46e8-8ea5-482ccf632ffc/scratchpad/vienti2 --syote E/tulos-1.json --syote E/tulos-2.json --syote E/tulos-3.json --valimuisti E/ov-valimuisti --kirjoita`
   (vienti2 voi kadota; silloin vienti uudelleen `tools/vienti`).
3. **Tasankopoltto:** ketjun valmistuttua (N/ketju.valmis) N/LUE.md "Ketjun jälkeen" → rivi PT:lle. Kuoli taas → `zsh N/jatka.sh`.
   Levyä 34 Gi (vahti pysäyttää < 15 Gi).
4. Big Ben: jos PT/KK haluaa toisen rajan (esim. vain kaupunkikartan Z12-portilla), vakio `KaupunkiPalloMitat.MaamerkkiPorttiEnnen`.
5. Vanhat: 27.10. poltto T7-arkistointi vain jos levy < 50 Gi (nyt 34 Gi → harkitse, PT:n luvalla); NUI:n maamerkkien alat.
