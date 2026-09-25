# Julkaisu v1930 — Sonnet-agentin raportti 17.9.2026

Haara `claude/bold-ride-vow4ki-julkaisu-v1930`, pohja `origin/main` =
v1929 (`8a24acf5`). Kaksi haaraa yhdistetty. Muutoslokirivi: *"Turisti-
kyltti: napautus, sama kerroin, siirtyy sivuun"*.

## 1. Mitä haarassa on

| haara | commit | sisältö |
|---|---|---|
| claude/bold-ride-vow4ki-turisti-osuma | b428a1b3, bc5afc45 | Turisti-info-kyltti: kyltin muste voittaa kosketusvaran samalla kertoimella kuin muilla merkeillä (11,5 px saapuessa); oma ladontalaatikko; kyltti siirtyy sivuun kun aihenosto osuu laatikkoon (10 asentoa). Pohja oli v1927 (`bc5afc45`:n emo), joten haara oli main-kannasta jäljessä nostot.js:n ja savuke-pariisi-lahizoom.mjs:n osalta |
| claude/bold-ride-vow4ki (Fable) | a6682d00 | Raamattu-päivitys (PAATOKSET 31 tarkennus 3, Astronautin kamera LISAYS 13 -tarkennus mustan pinnan juurisyystä) |

## 2. Konfliktien ratkaisu

**Ei kertaakaan konfliktimerkkejä** — `git merge --no-ff` molemmille
haaroille meni läpi `ort`-strategialla ilman `CONFLICT`-rivejä,
vaikka tehtävänannossa varoitettiin turisti-osuma-haaran (pohja
v1927) ja mainin (v1929, aihenoston nimiö -haara) koskevan samoja
tiedostoja `js/pallolauta/nostot.js`:ssä ja
`savuke-pariisi-lahizoom.mjs`:ssä. Kolmisuuntainen automerge onnistui,
koska muutokset osuivat eri kohtiin tiedostoista. Varmistin silti
käsin, että molemmat toiminnot ja KAIKKI savukevartiot säilyivät:

- `node --check` kaikille viidelle muuttuneelle JS/mjs-tiedostolle: OK.
- Aihenimiön vartiot 3i ja 3i2 löytyvät `savuke-pariisi-
  lahizoom.mjs`:stä (rivit ~657–866) — säilyivät.
- Kyltin vartiot 7c–7i löytyvät samasta tiedostosta (rivit ~970–1501)
  — säilyivät kaikki seitsemän (7c, 7d, 7e, 7f, 7g, 7h, 7i).
- `tests/aihemerkit.test.mjs`, `tests/osumareititys.test.mjs`,
  `tests/pallosovittelu.test.mjs`, `tests/karttamerkit.test.mjs`:
  yhteensä 57/57 pass (ei fail).

Fablen Raamattu-haara yhdistyi myös puhtaasti (vain
`js/tyohuone-raamattu.js`, 67 lisäystä / 3 poistoa) — Raamattuun ei
kosketettu käsin.

**Vastakoe diffin laajuudelle:** `git diff --name-only
origin/main..HEAD` ennen versionostoa antoi täsmälleen tämän erän 11
tiedostoa (turisti-osuma 3 uutta + 8 muutettua, Raamattu 1 — samat
tiedostot molemmissa listoissa) — ei yhtään poistoa.

## 3. Yksi testi rikki mergen jälkeen — korjattu lisäämällä puuttuva raportti

`npm test` löysi mergen jälkeen yhden failin:
`tests/dokumentit.test.mjs` → *"Raamatun kartalla ei ole kadonneita
tiedostoja"* — Raamattu (Fablen haaran tuoma LISAYS 13 -tarkennus)
viittaa tiedostoon `docs/raportit/viesti-fable-webkit-toisto-
20260917.md`, jota ei ollut tässä haarassa. Juurisyy: tiedosto on
olemassa Opuksen Mac Studio -sessiossa kirjoitettuna haarassa
`origin/claude/bold-ride-vow4ki-webkit-toisto` (commit `0295e43c`,
"WebKit-toisto: Astronautin kamera oikealla WebKitillä, kohta 37
toistuu, juurisyy mitattu"), mutta sitä haaraa ei ollut tässä
julkaisuerässä mergelistalla eikä Fablen Raamattu-haara tuonut
tiedostoa mukanaan.

Korjaus: haettu tiedosto `git show
origin/claude/bold-ride-vow4ki-webkit-toisto:docs/raportit/viesti-
fable-webkit-toisto-20260917.md`-komennolla ja lisätty sellaisenaan
tähän haaraan (`docs/raportit/viesti-fable-webkit-toisto-
20260917.md`) — puhdas dokumentaatiotiedosto, ei pelikoodia, ei
Raamatun sisällön muokkausta. Testi vihreä tämän jälkeen. **Fablelle
huomio:** webkit-toisto-haara jää nyt mergeamättä pääbranchiin muuten
(vain sen raportti kopioitiin); jos siinä on pelikoodimuutoksia tai
Raamattu-jatkotoimia odottamassa, ne on käsiteltävä erikseen.

## 4. Testit: 3565 pass / 0 fail / 13 skip

`NODE_USE_ENV_PROXY=1 npm test` → `# tests 3578`, `# pass 3565`,
`# fail 0`, `# skipped 13`. Ohitukset samat ympäristön omat kuin
v1929:ssä (geo-kirjastot, manifesti, rantaviiva-aineisto) — ei uusia,
ei karanteenoituja.

| työkalu | tulos |
|---|---|
| `tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |
| `tools/tarkista-niputus.mjs` | 394 moduulia, 4386 julistusta, ei törmäyksiä |
| `tools/tarkista-savukkeet.mjs` | 1902 ui-viittausta, 409 metodia, 539 kenttää, 31 lehtitilan kenttää |
| sarjat.json jäsentyy (`node -e`) | validi JSON |
| `tools/build-standalone.mjs` | läpi, `dist/matkakirja.html` 32 503 kt |

## 5. Paikalliset savukkeet (nopeutussääntö: vain diffiä koskevat)

| savuke | näkymä | tulos |
|---|---|---|
| `savuke-pariisi-lahizoom.mjs` | 390 + 1400 (oletusajo) | **74/74**, sis. kyltin vartiot 7, 7b–7i ja aihenimiön 3i/3i2 |
| `savuke-pallo-nostolaput.mjs` (1. ajo) | oletus | **8/8** |
| `savuke-pallo-nostolaput.mjs` (2. ajo) | oletus | **7/8** — sama tunnettu punainen ("yksikään kaupunkinimi ei leikkaa liikkumatonta mustetta", Bukarest, limityksiä 2) |

Koska ajot eivät menneet kahdesti peräkkäin vihreinä, tunnettu
punainen **jätettiin sarjat.jsoniin** (ei poistettu listalta) —
huomautusta päivitetty kertomaan v1930:n tarkistuskierros.

## 6. sarjat.json-muutos

- **Ei poistoja** listalta (kyltin kierros 2:n jälkeenkin sama vartio
  häilyy — ks. luku 5).
- Päivitetty `savuke-pallo-nostolaput.mjs`:n huomautus: kirjattu
  17.9.2026 v1930-tarkistuksen tulos (8/8 sitten 7/8) tunnetun
  punaisen alle, jotta seuraava sessio näkee ettei kaksi peräkkäistä
  vihreää ole vielä saavutettu.
- Muut tunnetut punaiset (astro-pallo, satelliittilinssi,
  ihmisen-kappaleet, ihmisen-kehys, ihmisen-esitys, nimikyltti,
  kaupunkipopup) ennallaan — ei tämän erän koskemia.

## 7. Mitä EI tehty

- Webkit-toisto-haaraa (`claude/bold-ride-vow4ki-webkit-toisto`) ei
  mergetty tähän julkaisuun — vain sen raportti kopioitiin Raamatun
  viittauksen korjaamiseksi (ks. luku 3). Fable päättää erikseen,
  koska/miten se haara käsitellään.
- `savuke-pallo-nostolaput`:n häilyvää vartiota ("yksikään kaupunkinimi
  ei leikkaa") ei yritetty korjata koodista — sama tunnettu häily kuin
  aiemmissa julkaisuissa, ei tämän erän aiheuttama regressio.
- Muita sarjat.json:n tunnettuja punaisia ei kosketettu.

## 8. Kesto

Aloitettu n. klo 08.35 UTC (worktree luettu, haarat fetchattu).
Molemmat mergeisit puhtaina n. klo 08.36–08.37 UTC. Versionosto
(v1930) n. klo 08.42 UTC. `npm test` (1. ajo, 1 fail) valmistui n.
klo 08.44 UTC, korjaus ja uusinta-ajo (0 fail) n. klo 08.46 UTC.
Paikalliset savukkeet ja build valmiit n. klo 08.49 UTC — **kokonais-
kesto raportin kirjoitushetkeen n. 14 minuuttia**.
