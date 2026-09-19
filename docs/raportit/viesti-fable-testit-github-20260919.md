# Opus → Fable: Testit ubuntulle, Macin savukesarja 4 rinnakkain (19.9.2026)

Erä `opus-local-testit-github`, Matkakirja Opus local (Mac Studio), 15.29–15.45 Suomen aikaa.
Omistajan hyväksyntä 19.9.2026 klo 15.30 Suomen aikaa (Fablen tehtävänanto 4).

## A) Testit-työnkulku GitHubin runnerille

`.github/workflows/testit.yml`: kytkinrivi `REITTI=mac` → `REITTI=ubuntu`,
perustelu kommenttiin. Työnkulku oli jo rakennettu kahdelle reitille
(18.9.2026, #2579/#2583), joten ubuntu-polku on valmis: `setup-node@v4`
Node 22 ajetaan vain github-hosted-koneella, `npm test`, kaksoisavaimet,
niputus, savukevartija ja build-standalone kuten ennen Mac-siirtoa.
Muuta ei muutettu.

- **Tarkistuksen nimi säilyy:** työnkulku `Testit`, jobi `testit`
  (PR:ssä "Testit / testit"); `reitti`-jobi ajaa aina ubuntulla. Portti
  ei muutu.
- **Ei npm ci:tä:** yksikään testi ei tuo npm-pakettia (tarkistettu
  importit); koko sarja ajettiin tässä worktreessä, jossa node_modules
  ei ole: pass 3650, fail 0, skipped 13. Sama kuin ennen Mac-siirtoa
  (`git show 91cdefa6^:.github/workflows/testit.yml`: ei npm ci:tä).
- **Ei Macin polkuja:** `grep -E "/Users/|homebrew" tests/*.test.mjs` →
  ei osumia. `rantataso.test.mjs` lukee FOKUSKARTTA_DATA:n tai
  tmpdir-polun ja ohittaa datakokeet ilman aineistoa (ohitukset
  kuuluvat 13 skippiin).
- **Verkko:** testien `fetch(`-osumat ovat pöllö-workerin kutsuja
  mock-pyynnöillä ja lähdetekstin jäsennystä, ei verkkohakuja. Verkotonta
  ajoa en voinut todentaa paikallisesti — ubuntu-ajo PR:ssä todentaa.
- Node-polkuaskel (`/opt/homebrew/...` GITHUB_PATHiin) jäi: ubuntulla
  polkua ei ole, joten se on vaaraton, ja se tarvitaan, jos kytkin
  palaa Macille.

## B) Macin savukesarjan rinnakkaisuus

**HUOMIO: Macin CI-ajo EI ajanut kuutta vaan KAHTATOISTA rinnakkain.**
`.github/workflows/savukkeet.yml` asettaa `SAVUKE_RINNAKKAIN: '12'`
(kierros 2, #2587, 18.9.2026); oletus 6 oli vain aja-sarja.mjs:n
paikallinen oletus. Tein tehtävänannon mukaisesti molemmat neljään:

- `.github/workflows/savukkeet.yml`: `SAVUKE_RINNAKKAIN` 12 → 4,
  perustelu ja arvio kommenttiin; yläkommentin "oletus 6" → 4.
- `tools/savukkeet/aja-sarja.mjs`: oletus 6 → 4, perustelu kommenttiin.
- `tools/savukkeet/sarjat.json` ennallaan.

### Seinäkelloarvio

Rivikestot: `docs/raportit/viesti-fable-ci-kierros2-20260918.md` (Mac,
12 rinnakkain, 23 riviä, mitattu seinäkello 264 s). Sarjassa on nyt 32
riviä; 7:lle uudelle (luentakuvat, kaupungit-piiloon, maailmatila-zoomi,
reittihelmet, siirtozoomi, kohdevalinta, astro-sumu) arvio 60 s,
laivamatka-tanger ja noppa-saapumisen-aikana 51 s (mitattu tänään
molemmilla selaimilla). Kokonaistyö 2 955 s. Jonosimulaatio samalla
järjestyksellä kuin aja-sarja (seuraava rivi vapautuvalle paikalle):

| Rinnakkain | Simuloitu seinäkello | Alaraja (työ / paikat) |
| --- | --- | --- |
| 12 (nykyinen CI) | 269 s ≈ 4 min 30 s | 246 s |
| 6 | 513 s ≈ 8 min 33 s | 492 s |
| 4 (uusi) | 759 s ≈ 12 min 40 s | 739 s |

Pisin rivi (172 s) ratkaisee vain, kun paikkoja on yhtä paljon kuin
pitkiä rivejä; neljällä paikalla seinäkello = kokonaistyö / 4. Arvio on
yläraja, koska kestot on mitattu 12 rinnakkaisen kuormassa ja rivit
lyhenevät kevyemmässä kuormassa (historia: 4 rinnakkain 9 min 40 s,
kun rivejä oli vähemmän). Mahtuu jobin `timeout-minutes: 20`:een, mutta
marginaali on noin 7 min. PR-portin seinäkello siis noin kolminkertaistuu
(4,5 → ~10–13 min). Jos se on liikaa, 6 on kompromissi (~8,5 min);
arvo on yhdellä rivillä savukkeet.yml:ssä.

## C) Testit

`node --test tests/*.test.mjs` paikallisesti: pass 3650, fail 0,
skipped 13. YAML jäsentyy (Ruby YAML.load_file molemmille
työnkuluille). Ubuntu-ajon todentaa PR.

## Jäi tekemättä

- Verkoton testiajo (ubuntu-ajo PR:ssä todentaa).
- Todellinen sarjan seinäkello neljällä rinnakkaisella (ajetaan PR:n
  Savukkeet-työnkulussa ensimmäisellä pelikoodia koskevalla PR:llä;
  tämä PR laukaisee sen, koska savukkeet.yml ja tools/savukkeet/
  muuttuvat).

## Päivitys 19.9.2026 klo 15.37 Suomen aikaa (Fablen päätös)

`savukkeet.yml` `SAVUKE_RINNAKKAIN` = **6** (PR-portti arviolta ~8,5 min,
simulaatio 513 s); `aja-sarja.mjs`:n paikallinen oletus pysyy **4**:ssä
(agenttien ja käsiajojen rinnalla). Kommentit päivitetty vastaamaan.
