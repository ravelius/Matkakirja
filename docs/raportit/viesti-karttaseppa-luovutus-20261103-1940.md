# Karttaseppä: luovutus 3.11.2026 klo 19.40 (KS)
Edellinen: viesti-karttaseppa-luovutus-20261103-1815.md (PR 6199). Sen AVOIN 2 on tehty ja 1, 3, 4 ja 5 jatkuvat alla. Syy: konteksti 25 % (7.37).
P = `/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-valmis-runko-20261102/`, KA = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-koealue-20261103/`,
OK = `/Users/Shared/Claude/proto-3d/_kirjasto/kartta-osat/` (osakirjasto).

## TEHTY tässä sessiossa (18.17–19.40)
1. **Animaatiot uudelle piirrokselle** (PT 18.5x, työlistan rivi "Pariisin uuden piirroksen animaatiot" päivitetty): NUI:lle
   ReittiLat/Lon `P/tasot-v7/nui-animaatioreitti.cs.txt` (215 pistettä, 8,9 km; skripti nui-animaatioreitti.py samaan kansioon) sekä
   Sillat ja SiltaVersio proto 04b14e82d:stä. NUI kytkee reitin ja sillat itse; kytkimestä ja Veneet.cs:n poistosta päättävät NUI ja PT.
2. **Koealueen Codex k1** (45ab5636e): tarkistettu `KA/tarkistus-45ab5636e/`, työkalut KA/tarkista-toimitus.py, saumat-lahelta.py,
   sauma-profiili.py, esine-lahelta.py ja ankkurit-osm.py. Huom: ajo vaatii pythonin, jossa on numpy ja PIL:
   `/opt/homebrew/opt/python@3.14/bin/python3` ilman -I:tä.
   Uusintatilaus k2: c3e423429, lisäys 574dd2173 (VS: kattopinnat ilman puita).
3. **Koealue k2** (9439e624b): Louvre v2 ja vesi v2 hyväksytty (`KA/tarkistus-k2-9439e624b/`). Codexin kuitti 2e937714a.
   NS ajoi Louvren (2e05fe9c3). VS häivytti veden sauman muuntimessa (c90019a08).
4. **OMISTAJA 19.3x (PT):** koko kartta yläviistosta kuten tyylimalli 2029: talot samaan suuntaan julkisivut näkyvissä ja nähtävyydet
   karikatyyreinä. **Kattopintoja ei tilata Codexilta ennen KK:n suunnitelmaa.** Kirjastossa katot ovat tilassa hylatty.
   Pohja (paperi, vesi, nurmi, musteviiva) jatkuu.
5. **Osakirjasto** (omistaja 18.43, KS pitää kirjastoa): OK/hakemisto.json, osakirjasto.py (lisaa / korvaa / tila / etsi / tarkista;
   lukko ja .tmp), LUEMINUT.md, alusta-pariisi-koealue.zsh ja k2-20261103.zsh. Sisältö: 20 Codex-kuvaa versioituina
   (isoisa-2029/<id>-vN.png), tyylimalli, KS:n data ja työkalut. VS ja NS ovat kirjanneet omansa (codex-pinnat, elava-*, esinekerros-*).
   Huom: VS:n työkalut osoittavat worktreeen (wt/proto-linssiseppa2-k17); polku katkeaa, jos worktree poistetaan, joten pyydä vaihtamaan haara+commit.
6. **JU tappoi 18.50 taustaprosessit** → uudelleen 18.52: tasankoketju pid 41502 (jatka.sh; jatkaa 74/144 shardista, pohja alkoi 19.01)
   ja esittelypaikkasilmukka pid 41504.

## AVOIN (järjestyksessä)
1. **v7/v8 iso-pari (JU:n vuoro):** kuvapari isolla iPadilla (rajaus kuten julkaisija-koe-pari-6da58f32b) → PT. Tarkista siitä
   Tuileriesin yläreunan vaalea saumaviiva (PT: näkyy v7:ssä ja v8:ssa, ei estä) ja pala17:n yläreuna (v8 7e640edc4 on junassa).
2. **Koealue:** odota KK:n suunnitelmaa (yläviistotalot ja karikatyyrinähtävyydet). Pidä kirjasto ajan tasalla, kun VS tai NS lisää osia;
   `python3 -I OK/osakirjasto.py tarkista` ennen vientejä.
3. **Pitkät ruudut jatko:** seuraavan mittauksen Nimikerros-syyriveistä (Elavat/Lado/Piirra) suurin pois; tavoite < 33 ms.
4. **Esittelypaikat:** silmukka pid 41504, Overpass 502/504. Valmis = esittelypaikat-20261103/silmukka.log "VALMIS" → MUISTA.txt
   (Sacré-Cœur käsin) → worktree /Users/Shared/Claude/wt/karttaseppa-esittelypaikat → vienti + testit → PR → PT.
5. **Tasankopoltto:** ketju pid 41502 (pohja → syvä → pallo → purku → kerma), loki tasangot-poltto-20261103/ketju.out ja 1.log.
   Kun ketju.valmis: LUE.md "Ketjun jälkeen" (delta, välitaso, VIENTI.md JU:lle), poista worktree
   /Users/Shared/Claude/wt/karttaseppa-tasangot-maet (PR 6089 squash-merged) ja rivi PT:lle. Jos ketju kuolee: `zsh …/jatka.sh`.
6. Vanhat: turisti-info/lehtikioski vanhaa tyyliä (jää); 27.10. polton T7-arkistointi vain PT:n luvalla.
