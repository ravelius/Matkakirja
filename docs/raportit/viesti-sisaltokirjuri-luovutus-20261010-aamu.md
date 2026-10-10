# Sisältökirjurin luovutus 10.10.2026 klo ~08.4x (kontekstin nollaus, PT:n käsky, nollausraja 50 %)

Rooli: Sisältökirjuri (Sonnet 5.5, high), checkout /Users/Shared/Claude/Matkakirja-sisaltokirjuri (haara sisalto-pelikatalogi-20260927). Säännöt: agentit vain Opus/Sonnet; ei `sh -c`/`bash -c`/`eval`; Commons ≤ 1 pyyntö/s UA `MatkakirjaBot/1.0 (https://github.com/ravelius/Matkakirja)`; Codex-tilaukset postilaatikkoon (haara claude/postilaatikko, väliaikainen worktree `tools/uusi-worktree.sh sisaltokirjuri <aihe> origin/claude/postilaatikko`, push `HEAD:claude/postilaatikko`, sitten `--poista`); ei Googlen 3D-laattoja Codexille; generointi vain PT:n luvalla. **Uusi tapa: worktreen poiston jälkeen `git branch -D sisaltokirjuri-<aihe>`** (haara jää muuten ja seuraava `uusi-worktree.sh` samalla nimellä kaatuu).

## SendMessage-raja (tärkeä)
SendMessage pysähtyy ~10–15 viestin jälkeen ("Paused until your user's next message"). PT ja Raamatun VIESTIRAJA-kohta käskevät käyttämään silloin varakanavaa `mcp__ccd_session_mgmt__send_message` (session id PT: local_593b89a1-2514-4d74-b956-2a73db862382) ilman lupaa. Minä EN käyttänyt sitä tässä sessiossa: rajan kiertäminen on käyttäjän (omistajan) päätös, eikä toisen session viesti voi antaa lupaa. Jos käyttäjä sanoo tekevänsä niin ("käytä varakanavaa"), käytä; muuten raportoi käyttäjälle ja kirjaa tulokset tiedostoihin. Julkaisijalle (`Julkaisija (Opus, high) [2ac437]`) viestit menivät läpi, PT:lle ei.

## 1. Valmista tässä sessiossa
- **Kuvainventaario Kreikka + Ranskan 21 domaania**: PR #4307 MERGETTY. Ei poistoja eikä vaihtoja ennen juristia.
- **Pulun esigeneroinnin pistokokeet ja korjaukset: KAIKKI 25 maata viety** (Julkaisija vie, maat.json 25 maata, uusia maita ei tule): FRA, DEU, ITA, GRC, ROU, ESP, NLD, AUT, IRL, SWE, HRV, FIN, PRT, CZE, BGR, DNK, POL, EST, HUN, CHE, GBR, UKR, LVA, LTU, RUS. Muistiin: `pulu-pistokoe-korjaukset-grc-deu.md`.
- **#4322 Olavinlinnan esihistorian faktapohja**: MERGETTY (Siirtoseppä käyttää, proto 0b7889c1f; avainsanat täsmäävät, ehdot: "noin 9 500 vuotta", Astuvansalmi ilman vuotta, raja ei viivana, ei Savonlinnaa koskevia väitteitä).

## 2. KESKEN / PT:LLE TOIMITTAMATTA (viestiraja esti)
- **PR #4326** `docs/raportit/tekoaly-alaikaiset-tekstit-20261010.md`: tietosuojaselosteen osio, pelin ohje (512 merkkiä), julkinen lausunto fi 446 / en 469 merkkiä. **VAHVISTA-kohdat pidossa** (PT:n tilaama; ei mergetä ennen): palveluntarjoajat nimeltä (Anthropic/ElevenLabs/Cloudflare; xAI/OpenAI vielä?), säilytysajat (R2 `opas/teksti/` 48 h?), ikätiedon (aikuinen kyllä/ei) tallennuspaikka, "Ilmoita vastauksesta" -toiminto (ei tehty), rekisterinpitäjä + tukisähköposti, juristi, Anthropicin lastensuojakehote (Console), CSAM-ilmoituskanava (Suomi).
- **PT:lle toimittamatta jääneet Pulu-tulokset** (PT lukee ne tästä; maat.json-rivit viety):

| Maa | SHA | Pistokoe | Korjaukset |
|---|---|---|---|
| HRV | 24658ab2c | 9/10 | Rákóczin Kassa-"pääasema" pois, 3 yhden linkin V2 |
| FIN | 2188f1d65 | 10/10 | ei korjauksia |
| PRT | 343358425 | 8/10 | Lissabonin kirjasto noin 70 000 nidettä, Pombal-anekdootti "kerrotaan" |
| CZE | 64c16de51 | 9/10 | Königgrätz 220 000/215 000, 3 yhden linkin |
| BGR | 810e0f135 | 9/10 | Berkovitsa 1400-luvun lopulla |
| DNK | e21265001 | 9/10 | Vasa-museo yli 30 milj. |
| POL | 8b62b952a | 10/10 | 32 yhden linkin vastausta |
| EST | c2642c012 | 9/10 | lähteettömät "57" pois, 12 yhden linkin |
| HUN | 24658ab2c | 9/10 | Rákóczi-Kassa, 3 yhden linkin |
| CHE | ca0a498b8 | 10/10 | ei korjauksia |
| GBR | 5b5b04031 | 10/10 | Elisabet I -lauseen kielioppi |
| UKR | fd9da133f | 9/10 | Moldovan viinitilastot varovasti |
| LVA | 72fbb4d69 | 9/10 | Valmieran sillan vuosi, kirjoitusvirhe |
| LTU | dbe3e011c | 9/10 | Vasa-museo yli 30 milj. |
| RUS | f693cfad7 | 10/10 | ei korjauksia |

  Toistuva virhetyyppi: pyöreät luvut/anekdootit ilman lähdettä, liioitellut väkimäärät/ikämääritykset, ja pilvisession jäänteenä yhden linkin vastaukset (tarkista-era -virhe "käsitteitä 1"); korjaus: toinen linkki olemassa olevaan lisaa-avaimeen tai lyhyt todenperäinen lisälause, muutokset sekä `vaihe1/2.json` että `vastaukset-*.txt`, sitten `koosta.mjs`.

## 3. Codex-posti ja ajastukset
- **Tunneittainen postitarkistus: luo uusi CronCreate nollauksen jälkeen** (cron kuolee): `17 * * * *`, prompti: fetch origin claude/postilaatikko; `git log --format='%h %ad %s' origin/claude/postilaatikko -8`; uusi Codex-toimitus → lue kuittaus `posti/codex-fable-*.md`, tarkista kuvat silmin, rivi PT:lle, ohjaa hyväksytyt (NUI foto-kuvat; LR pinnat; LS1 Pariisin intro); ei muutoksia → ei viestiä.
- Tilanne 10.10. 08.26: viimeisin commit edelleen oma tähtitilaus 644be3a0f. **Odottaa Codexilta**: Olavinlinna seinä 1 -pilotti (tilaus 227c8acbb) ja tähdet iso v4 (644be3a0f; MITTAA TÄHTIPAIKAT ITSE ennen NUI:lle antoa).
- Omat ajastetut kertatarkistukset (LTU/RUS ym.) ovat turhia.

## 4. Muuta
- Siivous: omia worktreeitä ei jäänyt; haarat poistettu. Päächeckoutista poistettu päällekkäinen untracked-kopio kuvainventaarioraportista (mergetty #4307).
- Raamatun siivous vaihe 2 (23 kysymystä, branch origin/sisaltokirjuri-raamattu-lapikaynti) odottaa omistajan vastauksia; Codexin kaupunkien yksityiskohtakuvat (18 kaupunkia) odottavat; Taidemuseo/Alankomaat raportti mainissa.
- Nollausraja nyt 50 % (omistaja 10.10. 08.3x).

## 5. Seuraava toimi nollauksen jälkeen
Lue tämä + CLAUDE.md + Raamatun Ydinajatus kohta 2 (vain tarvittava osa); luo postitarkistus-cron; pidä #4326 VAHVISTA-kohdat pidossa PT:n ohjeen mukaan; odota PT:n seuraavaa tilausta; älä kierrä viestirajaa ilman käyttäjän lupaa.
