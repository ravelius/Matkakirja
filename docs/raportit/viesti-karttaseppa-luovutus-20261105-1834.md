# Karttaseppä: luovutus 5.11.2026 klo 18.34 (KS)
Syy: konteksti 30 % (7.37), tauko Tripon ja CI:n odotuksessa. **Lue tämä, sitten -1817 (haara karttaseppa/luovutus-20261105-1817; sen Grand Palais-, Codex- ja Tuileries'n leike -kohdat pätevät). Tämä voittaa ristiriidassa.** Overpass-osa ja Riemukaaren "odottaa omistajan sanaa" -kohta -1817:ssa on tehty. W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219, haara karttaseppa/nahtavyydet-219, etäpää natiivi-backup, kärki 9e8c8ab1e. Python /opt/homebrew/opt/python@3.14/bin/python3.

## ENSIN
1. Remote päälle. Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (käsitelty-kohta tilassa).
2. **PR 6301** (https://github.com/ravelius/Matkakirja/pull/6301, haara karttaseppa-overpass-esto, SHA 63b61c06a): katso CI. PT odottaa riviä: SHA, testin tulos, vihreä PR. Sisältää PR 6297:n commitin (3731d10e3), joten 6297 mergetään ensin. Oma ajo 5713 testiä, 5694 läpi, 0 kaatui, 19 ohitettu. Merge PT:n linjan mukaan, ei omin päin ennen sen sanaa.
3. **Kolme Codexin toimitusta odottaa katsomista:** Opéra #2095 (903646dc7, b9b2e6397, d96ad4913), Panthéon #2096 (eee35c88f, 24f0ed31a), Montparnasse #2094 (8d7c6401c, 56071e528). Sama kierto kuin -1817: täysikoossa, ilmansuunta oikeaa kuvaa ja katuja vasten, pohja-uusi kartan päällä, arkki KK:lle ennen Tripoa. Katso myös 12f03e8a2: Codex kuittasi Grand Palais 24f:n (#2119).

## Riemukaari: tilattu Tripolta (omistaja 18.21)
Kortti "Kelpaako Riemukaari malliksi?": "Kelpaa (Suositus)". KK: "molemmille kapeille sivuille Wagramin puoli, kaaret oikeasti auki, ei puistorengasta. Siisti lisäksi aukion reunan haaleat vihertävät läiskät … ennen peliä. Lupasin hänelle sen ja mallista kuvan pelistä."
- **Tilaus 24g, posti ac25f9aba:** `_tyo/codex/pariisi-sarja-20261105/TILAUS-24g-riemukaari-tripo.md`, syöte `riemukaari/tripo-syote/` (`mitat.json`, tee-syote.py kansiossa `_tyo/karttaseppa/riemukaari/`). Odotetaan `riemukaari-3d-v1/`. Front ita, Back lansi, Left ja Right pohjoinen. Mittakaava päälistan korkeudesta. Suhteet: leveys 1,00, syvyys 0,49, korkeus 0,90; suuri kaari 0,226 × 0,564, kapea 0,149 × 0,388. Pakollinen aukkotesti, ≥ 90 % taustaväriä.
- **Maapohja:** `_tyo/karttaseppa/riemukaari/pohja-siisti.png`, ei Codexin pohjaa. Neljä läiskää on nyt tässä kuvassa (LAISKAT tee-arkki.py:ssä). **Asennuksessa käytä kuvan omaa alfaa, älä maski.png:tä,** muuten läiskät palaavat. Tarkistus kartan päällä: `laiskat-siistitty.png` (katsottu, puhdas). KK:lle kerrottu, pelikuvaa ei vielä ole.
- **Kun malli tulee:** katso täysikoossa, varmista aukot, asenna eiffel-asennus/asenna.py:n mallilla. Alue.json: Suunta 115,4°, kaaret Champs-Élysées'n akselilla. Pelikoko 188 m leveä; syvyys tulee mallista noin 92 m, jalanjälki on 103 m. **Sitten kuva pelistä KK:lle: se on luvattu omistajalle.** Mac-ajo JU:lta 10.5:n mukaan (yksi kysymys, noin 5 kuvaa).

## Overpass (PT 2.183, PR 6301)
- Tuileries i1, i2, p1: sijainti ja `lahde` Geofabrikin PBF:stä (`/Volumes/T7 4TB/Matkakirja-karttaseppa/vesimaski/lahteet/ile-de-france-latest.osm.pbf`, ladattu 8.10.). i1 175 m, koska 150 m osuu Grand Bassin Rondiin. Palatsin kohta = Lemonnierin ja akselin leikkaus, minun oletukseni. `esittelypaikat.mjs` hyväksyy kolme; "ei kohdetta" 173 muualta on vanhaa.
- `tests/overpass-kielto.test.mjs` ja `tools/osm-haku-kielletty.mjs`. Kahdeksan työkalua ei ajettu, ne kaatuvat viestiin; kohdesijainneissa ei ollut hakua. Korvaava Geofabrik-haku vasta, kun työkalua tarvitaan. Välimuisti `esittelypaikat-20261103/ov-valimuisti/` jää käyttämättä ja poistamatta.

## Opit
- Testin isäntänimimalli osui testin omaan tiedostonimeen (`overpass-kielto.test`): lisää väärät osumat mallin omaan testiin.
- PT:n ja KK:n 18.21-viestit tulivat päällekkäin eri kanavia: tarkista molemmat, ennen kuin lasket tehtävän uudeksi.
