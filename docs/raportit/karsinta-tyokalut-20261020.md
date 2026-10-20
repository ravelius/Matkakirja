# Karsinnan työkalut (omistajan päätös 20.10.2026 klo 22.24, loki #5071) – Valoseppä PT:n pyynnöstä

Suunnitelma: /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/karsinta-suunnitelma-20261020.md (B3, B4, B6, C1, C4).

| kohta | työkalu | oletus |
|---|---|---|
| B3 | `zsh tools/paivita-kotikansiot.sh [--aja]` | kuiva-ajo; --aja vain PT:n päätöksellä |
| B6 | `node tools/raamattu-luku.mjs <luku\|kohta> \| --sisallys` | lukee origin/mainista (fetch + git show) |
| C1 | `zsh tools/tarkista-ohjeet.sh` | vain luku, Postivahdin kierrokselle |
| B4 | `zsh tools/arkistoi-vanhat.sh [--aja]` | kuiva-ajo; --aja = git mv, commit erikseen |

## Kuiva-ajot 20.10. klo 22.4x
- B3: 16 kotikansiota (Mallinseppä on symlinkki arkistoon → ohitetaan). Päivittyisi 2 (Natiivi-UI 9, Sisältökirjuri 54
  committia → haara koti/<kansio>). JÄLJESSÄ 14: 8 kansiossa muutettu seurattu tiedosto (useimmiten .claude/settings.local.json,
  Siirtoseppä .claude/launch.json, Matkakirja-fable ja Postivahti 3 tiedostoa; lupa-asetukset → vain omistaja), 6 kansiota haarassa mainista puuttuvaa sisältöä
  (3d-selvittaja 79, Julkaisija 53, Linssiseppä 154, Linssiseppä-2 288, Pelikoodari 1, Työkaluseppä 1 tiedostoa).
- C1: 13 kansiota yli 50 committia jäljessä; 42 vanhaa id-viittausta 15 muistiinpanossa (osoitekirjassa 17 id:tä).
- B4: 197 / 207 luovutusta siirtyisi docs/arkisto/luovutukset/ (fable 128, sisältökirjuri 28, laitetestaaja 14, …);
  uusin per rooli säilyy (commit-ajan mukaan).

## C4: mistä Codex lukee ohjeensa
Codexilla ei ole automaattisesti luettavaa ohjetta: sen kansioissa (/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2,
game-src, game-mailbox) ei ole AGENTS.md:tä eikä ~/.codex/AGENTS.md:tä; game-src (HEAD 366beda3e 3.9.2026, 1729 committia
jäljessä) sisältää vain vanhan CLAUDE.md:n, jota Codex ei lue. Repon mainissa on AGENTS.md, mutta se ei ole game-src:ssä →
Codex saa ohjeet vain postin/kehotteen kautta. Korjaus (PT päättää): game-src mainiin tai AGENTS.md Codexin työkansioon
viittauksena Raamattuun (tools/raamattu-luku.mjs).
