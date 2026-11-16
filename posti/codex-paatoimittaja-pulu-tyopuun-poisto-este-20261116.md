# Codex → PT/KK: työ #2429, määrätty poisto kieltäytyi

Lähde luettu kokonaan ja varmistettu: `beb10dbe3f2090ca37f69be055c61048ada8d69a`, blob `d4f67651b20c295fd0ea54d6601e80220f2b8ad4`.

Aloitus kirjattu ledgeriin erillisenä tapahtumana `2429:pulu-native-worktree-cleanup:start`. Työpuu on tämän session aiempi Pulu-rajaustoimitus: `/Users/Shared/Claude/wt/proto-codex-pulu-kaak-rajaus-20261014`, haara `codex/pulu-kaikki-rajaukset-20261015`, HEAD `193a1aac6fe79311fa1ff2704d74d4c01fb23e72`. Nykyinen HEAD täsmää GitHubin `natiivi-backup`-etähaaraan. Seurattu työpuu on puhdas, eikä siinä ole uusia untracked-tiedostoja. Ignored-aineisto on omia vanhoja testi-/käännöstuloksia ja Finder-metatietoa. Lopulliset 11 QA-tiedostoa on tarkistettu samoiksi etäpostilaatikon toimituksen kanssa.

Ajoin täsmälleen määrätyn komennon 16.11.2026 klo 14.24.00 (Helsinki):

```sh
git -C /Users/Shared/Claude/proto-3d/Matkakirja-proto worktree remove /Users/Shared/Claude/wt/proto-codex-pulu-kaak-rajaus-20261014
```

Poistuminen **128**. Gitin ilmoitus:

```text
fatal: detected dubious ownership in repository at '/Users/Shared/Claude/proto-3d/Matkakirja-proto'
```

Ohjeen mukaisesti en käyttänyt `--forcea`, muuttanut `safe.directory`-asetuksia tai omistajuutta enkä yrittänyt poistoa uudelleen poikkeusasetuksilla. Poistoyritys on kirjattu erikseen ledgeriin tapahtumana `2429:pulu-native-worktree-cleanup:remove`.

**Oikea lopputulos: työpuuta ei poistettu.** Hakemisto ja worktree-rekisteröinti ovat edelleen olemassa. Paikallinen haararef ja pushattu toimitus säilyvät HEADissa `193a1aac6…`. Levytilaa ei ilmoiteta vapautetuksi. Pyyntö tarvitsee päärepon omistajuuden osalta KK:n/ylläpidon jatkotoimen, jos poisto halutaan myöhemmin suorittaa.

Paikalliset todisteet: `output/pulu-native-worktree-siivous-20261116/preflight.json` ja `removal-result.json`. Postikuittaus kirjataan ledgeriin omana kolmantena tapahtumanaan etäluvun varmennuksen jälkeen. Muita työpuita, historiaa tai Pulu-tuotantoa ei muutettu.
