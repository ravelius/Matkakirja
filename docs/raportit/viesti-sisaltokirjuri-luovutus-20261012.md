# Sisältökirjurin luovutus 12.10.2026 (päivitys edelliseen: viesti-sisaltokirjuri-luovutus-20261011-ilta.md)

Rooli: Sisältökirjuri (Sonnet 5.5, high), checkout /Users/Shared/Claude/Matkakirja-sisaltokirjuri, haara sisalto-pelikatalogi-20260927 (ÄLÄ `git pull --rebase origin main` tässä haarassa; työt omissa worktreissä `tools/uusi-worktree.sh sisaltokirjuri <aihe>`, poisto `--poista` + `git branch -D`). Edellisen luovutuksen säännöt ja kohta 2 (maailman muut pakot, tulokset JSON-tiedostoissa) ovat yhä voimassa.

## UUSI SITOVA SÄÄNTÖ: ASEMATAULU "VAATII TOIMIA" (omistaja 12.10. klo 10.3x, Raamattu, PR #4489)
Kun omistajalle on kysymys tai pyyntö, joka vaatii HÄNEN toimiaan (lupaikkuna tai vastaus omassa ikkunassa, kirjautuminen, ostos, vain hänen tekemänsä päätös), nosta se heti Asemataululle: ArtifactData set, url https://claude.ai/artifact/Rq5ajPU4SraE2XKd7BYAix, kokoelma "talo", doc_id "toimi-sisaltokirjuri", data {rooli: "Sisältökirjuri", kysymys: "<yksi rivi: mitä ja missä ikkunassa>", ts: <ms>}. Jos kirjoitus ei onnistu: viesti Postivahdille "VAATII TOIMIA: Sisältökirjuri: <asia>". Kun hoidettu: poista dokumentti (get → delete if_version). Ei vielä avoimia omistajan toimia.

## Valmista / jonossa 12.10.
- Lautapelien opastustekstien tarkistus: #4480 MERGED (Pelikoodari korjasi kuvat/tekstit 7ab5fc70a).
- Kallimarmaron faktakorjaus lähteisiin: **#4481 AVOIN** (Julkaisija). Poista worktree sisaltokirjuri-kallimarmaro-fakta mergen jälkeen.
- Saapumisintron kuvasuunnitelma: **#4488 AVOIN**; pilotti (15 havainnekuvaa: Pariisi/Tukholma/Ateena, kuvat 4–8) TILATTU Codexilta, postilaatikko 06bfbb9df, omistajan luvalla. Kun toimitus tulee (posti/codex-fable-saapumisintro-<kaupunki>-<pvm>.md, R2 julisteet/saapumisintro/…): tarkista jokainen kuva (ei tekstiä/kasvoja/väkivaltaa, ei myöhäisiä rakennuksia kuvassa 8: Pariisi ei Eiffeliä/Sacré-Cœuria, Tukholma ei kaupungintaloa/valmista Grand Hôtelia, Ateena ei Zappeionia; Frankkien torni näkyy), lähetä kuvat PT:lle. Omistaja katsoo pilotin ennen loppuja 210:tä.
- Riddarholmenin tornin vuosi 1838–40: **#4490 AVOIN**.
- Kaaridata 9 kaarta: **#4469 AVOIN**, ajan tasalla mainin kanssa (86616cb1a); merge vasta 183-lukituksen jälkeen (Julkaisija). Seuranta-cron tarkistaa tunneittain.
- Codex-posti-cron tunneittain (`git fetch origin claude/postilaatikko`, ei muutoksia → ei viestiä). Omat tilaukset odottavat toimitusta: 5374cfed8 (ISL/TUN/LKA 6 kuvaa), 1c6436b76 (12 paikallisaarrekuvaa), pääkaupungit e04–e14 (pistokoe luku 13).
- Muut avoimet: PR #4326 pidossa; Raamatun siivous vaihe 2 ja museotekstit odottavat omistajaa.
