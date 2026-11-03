# Karttaseppä: luovutus 3.11.2026 klo 13.05 (KS)
Edellinen: viesti-karttaseppa-luovutus-20261103-1235.md (käsitelty, lisäys 12.50). Syy: kontekstivahti 25 %.
P = `/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-valmis-runko-20261102/`, E = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/esittelypaikat-20261103/`,
N = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/tasangot-poltto-20261103/`. Venv: "/Volumes/T7 4TB/Matkakirja-karttaseppa/venv-kartta/bin/python".

## TEHTY
1. **Pariisi v5 (PT hylkäsi v4:n 12.5x) → PT KUITTASI 12.5x.** `P/tarkistus/koonti/v5.py`: puistomaskin (rungon puistovärit ∪ vihreän
   tiheys) ja veden alueella v2:n pikselit sellaisinaan, pehmeä reuna, muualla v3. Tulos `pariisi-koko-rgba-v5.png`, parit
   `pariisi-v2-v5-pari.jpg`, `pariisi-v2-v5-bois-1x1.jpg`; LUE.md "v5"; ketjutettu `kokoa_pariisi.sh`:n loppuun.
2. **v5 tasoiksi + Big Ben samaan haaraan (PT 12.5x): proto 347711dd9** haarassa `karttaseppa/bigben-lahi-218` (9b442edc5 päällä;
   worktree `/Users/Shared/Claude/wt/proto-karttaseppa-bigben-218`; proto on paikallinen repo, ei pushia).
   - `P/tasot-v5/tee-tasot-v5.py`: laaja 12 (1128 × 751, 1 laatta), vali 6 (2255 × 1503, 2), lahig 2,48 m/px = kangas (5454 × 3634, 6);
     maski = alfa × ~250 m reuna; tasot.json (alueet 2 suorakaidetta). PiirrosKerros.Tasot uusiksi, TasoVersio `isoisa-20261103`,
     alku/loppuMpp vali 14/8,5, lahig 6/3,7.
   - Siltaleikkeet `P/tasot-v5/sillat-v5.py` (27 kpl: joen poikkileikkaukset reitiltä, silta = uoma ∩ ei vettä; mukana Eiffelin jalat,
     Orsayn uloke, saarten kärjet), SiltaVersio `leikkeet-sillat-isoisa-20261103`, Sillat-taulukko nui-rivit.txt:stä (eiffel-joki pois).
     Tarkistusarkki `P/tasot-v5/pari-sillat.jpg`.
   - Venereitti: vanha reitti lat/lonin kautta v5-kankaalle ja joen keskelle (`reitti-v5.py`, `reitti-v5-vesi.json`, 215 pistettä);
     veneet, vanavesi, päätyhäivytys ja tangentti 0,4× (lähitaso 0,99 → 2,48 m/px), vanan skaala h / 20.
   - Kartta-testit `./kaanna.sh Piirros` 5/5. Paketti `/Users/Shared/Claude/proto-3d/_valmiit/pariisi-tasot-isoisa-20261103-vienti-20261103`
     (45 tiedostoa, SHA256SUMS, LAHTEET.md). **JU:lle 13.00** (käännös/simu vuorollaan + vienti samaan junaan), rivi PT:lle 13.00.

## AVOIN (PT:n järjestys)
1. **Odota PT:n vastausta** 13.00-rivin avoimiin: (a) lähin zoom `LahinLeveys` 0,45 (~1,5 km) ennallaan → 2,48 m/px suurenee iPadilla
   ~4×; ehdotettu lahig `lahinLeveys` ~1,05 (~3,5 km; testi PiirroksenLahimmatTasot sitoo LahinLeveys-vakion 1,3–1,7 km:iin, joten
   tee erillinen vakio). (b) Turisti-info/lehtikioski-leikkeet (leikkeet-20261102) ovat vanhaa tyyliä, paikka lat/lon ennallaan.
   JU:n simun jälkeen: korjaa löydökset samaan haaraan.
2. **Esittelypaikat 58 kaupunkia** (PT: tasojen jälkeen). Ajo pid 23585 yhä käynnissä 13.01 (Overpass 502/504 hidastaa, loki
   `E/ajo-muut.log`). Valmis = `pgrep -f esittelypaikat.mjs` tyhjä → worktree `/Users/Shared/Claude/wt/karttaseppa-esittelypaikat`
   (haara karttaseppa/esittelypaikat-muut): `git diff --stat data/esittelypaikat.json` → vienti (`tools/vienti`) + skeemasopimus
   (sama kenttä, ei versionnostoa) + `node --test tests/vienti.test.mjs tests/sisaltopaketti.test.mjs` → PR → rivi PT:lle.
   Kuoli: komento luovutuksessa -1235 AVOIN 2 (välimuisti E/ov-valimuisti jatkaa).
3. Tasankopoltto: ketju odottaa joutilasta Macia (N/ketju.out 12.18; ei ketju.valmis 13.01). Valmis → N/LUE.md "Ketjun jälkeen" →
   rivi PT:lle; kuoli → `zsh N/jatka.sh`. Levyä 34 Gi.
4. Pariisi jatko (luovutus 20261102-2210 AVOIN 2): kylttisiirrot peliin (`P/kylttisiirrot-palaNN.json`), vasen yläkulma jää (PT 12.5x).
5. Vanhat: 27.10. poltto T7-arkistointi vain jos levy < 50 Gi (PT:n luvalla); NUI:n maamerkkien alat.
