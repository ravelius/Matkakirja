# Julkaisijan luovutus 22.9.2026 ilta (klo 17.12 EEST, konteksti 69 %)

Työhakemisto (rooli-worktree): `/Users/samireivinen/Matkakirja-julkaisija`.
Tämä raportti kirjoitettu väliaikaisesta worktreestä
`/Users/koodaus/wt-julkaisija-luovutus` (haara
`julkaisija-luovutus-20260922-ilta`), koska rooli-worktree on
työhaarassa eikä sitä mergetä (ks. "Voimassa olevat työtavat").
Edellinen luovutus: `docs/raportit/viesti-julkaisija-luovutus-20260922.md`.

## 1. Lue ensin

1. `CLAUDE.md`
2. `docs/roolitus.md` — erityisesti "Julkaisusäännöt"
3. Raamatun (`js/tyohuone-raamattu.js`) osiot: "TYÖTAPA JA SESSIOT"
   (roolit, worktreet, viestisäännöt), "MAC STUDIO: UUDEN SESSION
   ALOITUS ILMAN OMISTAJAN OHJETTA, JA MISSA AVAIMET OVAT"
4. Tämä raportti kokonaan ennen ensimmäistä mergeä

## 2. Tila

**main = v2114, commit `ea2cd8303`** (koodimuutosten viimeinen
versionosto). Sen jälkeen mainiin on mergetty vielä kolme
raportti/työkalu-PR:ää ilman versionostoa: #2817 (laikut,
`d501785e5`) ja #2819 (tasonvaihtomittaus, `657077b71` — tämä on
mainin todellinen HEAD juuri nyt).

Istunnon alussa main oli v2083. Tässä vuorossa julkaistiin v2084→v2114
(31 versionostoa) yhden session aikana — ks. taulukko.

### Julkaistut versiot (v2084 → v2114)

| Versio | PR | Sisältö |
| --- | --- | --- |
| v2084 | #2754 | Kerma laatan shaderissa |
| v2086 | #2755 | Zoomin karkea taso lyhyemmäksi (v2085 meni Codexin C2-kohtaamiskuville PR #2751:ssä) |
| v2087 | #2756 | Pilven varjo pois kartan liikkeestä |
| v2088 | #2757 | Karttaselite: välilehdet ja Maakunnat-tila |
| v2089 | #2763 | Maakuntien pitka+kuva+pulu: 97 aluetta (kuvat vietiin R2:een ennen mergeä) |
| v2090 | #2764 | Laattojen esilataus levossa |
| v2091 | #2767 | Preconnect ja dns-prefetch ämpäriin |
| v2092 | #2769 | Laattapyynnöille katkaisija |
| v2093 | #2771 | Kohtaamiset C4-C7: 20 kaupunkia (4 erää yhdistettynä yhteen PR:ään) |
| v2094 | #2776 | **HOTFIX** kerma-shaderin laatat eivät piirtyneet (vUv ei r155:ssä) |
| v2095 | #2775 | C3-kohtaamiskuvat kytketty visoihin (Codex) |
| v2096 | #2780 | 97 maakunnan vuoden 1873 havainnekuvat (Codex) |
| v2097 | #2782 | Sulavuus 13-15: syöte kehyksessä, kameraloki |
| v2098 | #2784 | Sulavuus 1-3: ilmakehä ja kerma ilman pow |
| v2099 | #2785 | Sulavuus 7,17: shaderien esikäännös, Livian ramppi, pöllövahti |
| v2100 | #2787 | C4-C7-kohtaamiskuvat kytketty (mergetty suoraan mainiin toisen session toimesta) |
| v2101 | #2790 | Sulavuus 18: lepopiirto sykkeellä |
| v2102 | #2792 | Sulavuus 11-12: yksi häivytysjono, atlaksen osittainen päivitys |
| v2103 | #2793 | Pulun karttapaikka |
| v2104 | #2795 | **HOTFIX** esikäännön sivuvirhe puretulla laatalla (compileAsync) |
| v2105 | #2798 | **HOTFIX** lepopiirto oletuksena pois (kartan strobovälke iPhonella) |
| v2106 | #2799 | Ryhmittele Pulun eleet katselusivulla (Codex, poiminta yhdestä commitista) |
| v2107 | #2802 | Lepopiirto tickin tasolle, WebKit |
| v2108 | #2804 | Tiivistä Pulun gallerian valinta (Codex, poiminta yhdestä commitista) |
| v2109 | #2806 | Lepopiirto oletukseksi (rebase pudotti 2 jo-mainissa-olevaa commitia) |
| v2110 | #2811 | Syöte herättää lepopiirron |
| v2111 | #2812 | GL-nimiöiden atlas värihallintaan |
| v2112 | #2813 | Neljä luontevaa Pulun katselueletta (Codex, poiminta yhdestä commitista) |
| v2113 | #2816 | Atlaksen osapäivitys atlaskankaasta |
| v2114 | #2818 | Kohdemerkit GL-kerrokseen |

Lisäksi ilman versionostoa (raportit/työkalut, eivät vaikuta peliin):
#2740, #2741, #2745, #2750, #2758, #2759, #2765, #2766, #2768, #2772,
#2770, #2781, #2800, #2796, #2808, #2803, #2814, #2817, #2819.

## 3. Pushatut mutta julkaisemattomat haarat / avoimet PR:t

**Ei avoimia PR:iä juuri nyt.** Kaikki tämän vuoron haarat on joko
mergetty tai suljettu korvattuna (ks. kohta 6, "julkaisija-julkaise-*"
-haarat jäävät historiaan, ei tarvitse siivota — Fablen sääntö: ei
`--delete-branch`, roolihaaroja ei poisteta).

## 4. Kesken — tee nämä ensin

1. **Karttasepän pohjapoltto 2026-09-22c** (vesiviivat + laikut,
   #2808/#2817 jo mainissa) käynnistyy ~klo 17.30, kesto ~2 h
   (17.30–19.30), odottaa omistajan lähtölupaa Fablen kautta.
   **CI-tauko koko ajaksi: ei savukkeet-mac-ajoja, ei dispatcheja, ei
   uusia PR-pushauksia.** Testit (ubuntu) saa jatkua. Kun poltto on
   ohi ja Karttaseppä ilmoittaa laattojen+pallosarjan olevan ämpärissä
   ja PR valmis: **älä vie mitään ämpäriin ennen kuin
   `js/pallo.js`:n `PALLO_LAATTAVERSIO` osoittaa `2026-09-22c-pohja` /
   `PALLO_LAATTATUNNISTE` `20260922c` mainissa** — se on tämän session
   oma vaihe.
2. **Tulossa Pelikoodarilta:** interpolointi-erä ja erät C–E (ei vielä
   PR:ää auki tätä kirjoittaessa). Käsittele normaalina jonona kun
   Fable antaa tehtävän.
3. Seuraa Fablen ja muiden roolien viestejä jonojärjestyksestä — tässä
   vuorossa jono on tullut lähes kokonaan suorina cross-session-
   viesteinä, ei etukäteissuunnitelmana.

## 5. Odottaa omistajan päätöstä

Ei avoimia kysymyksiä juuri nyt. Karttasepän polton lähtölupa on
omistajalla Fablen kautta — Julkaisijan ei tarvitse kysyä sitä
uudelleen, vain odottaa Karttasepän "poltto alkaa" / "poltto ohi"
-ilmoitusta.

## 6. Voimassa olevat työtavat (viittaukset, ei kopioita)

- Raamattu "TYÖTAPA JA SESSIOT" ja `docs/roolitus.md`
  "Julkaisusäännöt" ovat ennallaan.
- **Tässä vuorossa muuttunut/vahvistunut:**
  - **Ei koskaan `gh pr merge --delete-branch`.** Se on kaatanut
    kahden roolin (Karttaseppä, Sisältökirjuri) worktreen heti kun
    niiden checkout-haara on mergetty. Käytä `gh pr merge <n>
    --squash` ilman lippua; jos etähaara pitää poistaa, tarkista ensin
    `git worktree list` ettei mikään worktree ole sillä haaralla, ja
    poista sitten erikseen `git push origin --delete <haara>`. Älä
    koskaan `git worktree prune`/`remove` toisen roolin worktreetä.
  - **Rebase, ei aina merge, kun haara sisältää jo-mainissa-olevaa
    työtä.** Jos `git merge origin/main` tuottaa konfliktin ja
    epäilet, että haaran ensimmäiset commitit ovat jo mainissa toista
    kautta (esim. sama korjaus toimitettu kahdesti), kokeile
    `git rebase origin/main` — git pudottaa automaattisesti commitit,
    joiden sisältö on jo ylävirrassa ("patch contents already
    upstream"), ja jäljelle jää vain aito uusi työ (esim. v2109).
  - **Konfliktin suunta jaetuissa append-tiedostoissa** (kohtaamiset.js,
    muutokset.js, pallolaatat.js, savuke-*.mjs): kun konfliktin toinen
    puoli on tyhjä (`=======` `>>>>>>> origin/main` ilman sisältöä),
    kyse on puhtaasta lisäyksestä — ota HEAD kokonaan. Kun molemmilla
    puolilla on sisältöä samassa kohdassa (esim. kaksi versionumeroa
    tai kaksi toteutusta samasta ehdosta), tarkista kumpi on
    laajennus/uudempi (yleensä HEAD, jos HEAD on sisältöhaara jota
    mergetään main-pohjaiseen julkaisuhaaraan) ja yhdistä käsin — älä
    koskaan liitä molempia peräkkäin sellaisenaan.
  - **`savukkeet-mac` ei ole pakollinen portti.** Koko vuoron ajan
    riitti `testit` (ubuntu) + `reitti` vihreänä ennen mergeä; useampi
    hätäkorjaus nimenomaan ohitti savukkeet-macin eksplisiittisesti.
  - **Mittausikkunat ja CI-tauot:** kun Laitetestaaja tai Karttaseppä
    ilmoittaa mittausikkunan/CI-tauon alkavan, älä pushaa mitään
    (myös uuden julkaisuhaaran push laukaisee CI:n samalla koneella) —
    tee versionosto+build+commit paikallisesti valmiiksi ja push vasta
    kun ikkuna on ilmoitettu päättyneeksi.
  - **Codex-poiminnat vain nimetystä commitista.** Kun Fable pyytää
    poimimaan yhden commitin Codexin haarasta (esim. livia-svg-sivun
    päivitykset), käytä `git cherry-pick <sha>` **origin/mainista**
    haarautuvaan uuteen haaraan — älä mergetä koko Codex-haaraa. Aja
    aina readback (`curl -sI <url>` → 200, `curl -s <url> | grep -c
    <merkkijono>` → >0) sen jälkeen kun Pages-julkaisu (workflow
    "Julkaise peli", ~3–4 min) on valmistunut, ja raportoi tulos
    Fablelle.
  - Docs/tools-only-PR:t (raportit, mittaustyökalut) mergetään ilman
    versionostoa, kun ne eivät kosketa pelin koodia tai testejä.

## 7. Julkaisukaava (tässä vuorossa käytetty)

```
git fetch origin main
git checkout -B julkaisija-julkaise-<nimi> origin/<lähdehaara>
git merge origin/main --no-edit   # tai git rebase origin/main jos konflikti näyttää duplikaatilta
# ratkaise konfliktit (ks. kohta 6)
node --test tests/*.test.mjs
node tools/tarkista-kaksoisavaimet.mjs
node tools/tarkista-niputus.mjs
node tools/uusi-versio.mjs "Lyhyt kuvaus (≤60 merkkiä)"
node tools/build-standalone.mjs
git add -A && git commit -m "vNNNN: Kuvaus"
git push -u origin julkaisija-julkaise-<nimi>
gh pr create --base main --title "vNNNN: Kuvaus" --body "..."
gh pr close <alkuperäinen PR> --comment "Korvattu yllä..."
# odota CI (testit+reitti vihreä, savukkeet-mac ei portti)
gh pr merge <uusi PR> --squash   # EI --delete-branch
```

Codex-poiminnalle sama kaava, mutta `git cherry-pick <sha>`
`git checkout -B ... origin/main`:n jälkeen `git merge`/`rebase`:n
sijaan, ja lopuksi readback-tarkistus.

## 8. Ympäristö ja infra

- Työkansio: `/Users/samireivinen/Matkakirja-julkaisija` (rooli-
  worktree, haara vaihtelee `julkaisija-julkaise-*`:n mukaan — ei
  koskaan `main`).
- Väliaikainen luovutus-worktree `/Users/koodaus/wt-julkaisija-
  luovutus` (tämä raportti) — voidaan poistaa turvallisesti
  seuraavan session toimesta `git worktree remove` kun PR on
  mergetty, koska se ei ole kenenkään roolin pysyvä työtila.
- R2-ämpäri (`matkakirja`): maakuntien nostokuvat + 1873-havainnekuvat
  ladattu `karttanostot/20260922/`-polkuun tässä vuorossa (v2089,
  v2096). Karttasepän poltto lisää `2026-09-22c-pohja`-sarjan
  poltettuaan — **ei viedä ämpäriin ennen kuin osoitin on mainissa**
  (kohta 4.1).
- Avaimet: `~/.matkakirja-avaimet.zsh` (source `.zshrc`:n kautta,
  Bash-työkalu ei lataa `.zshrc`:tä automaattisesti — käytä
  `zsh -c 'source ~/.zshrc; ...'`). R2-tunnukset (`R2_ACCOUNT_ID`,
  `R2_BUCKET`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`,
  `AWS_ACCESS_KEY_ID`/`AWS_SECRET_ACCESS_KEY`-aliakset) samassa
  tiedostossa. `aws`-cli asennettu Homebrew’lla.
- gh-CLI kirjautunut (ravelius, repo+workflow-scope).
- Sähke-token yhä vanhentunut — älä aja `sahke-worker.yml`.

## 9. Avoimet velat ja opetukset

### Velat

1. Karttasepän poltto 2026-09-22c kesken tätä kirjoitettaessa — ei
   tuotantoon vielä. Seuraava sessio hoitaa ämpärivienti+merge kun
   Karttaseppä ilmoittaa valmiiksi.
2. Pelikoodarin tuleva interpolointi/C–E-erä ei vielä PR:ssä — ei
   konkreettista tehtävää vielä annettavissa.

### Opetukset

- **`--delete-branch` on tuhoisa muiden roolien worktreille.** Kaksi
  eri roolia menetti worktreensä samana iltana, kun niiden oma
  checkout-haara mergettiin tällä lipulla. Korjaus (kohta 6) on nyt
  pysyvä käytäntö.
- **Rebase ratkaisee "sama työ kahdesti" -konfliktit siistimmin kuin
  merge + käsinvalinta.** v2109:ssä (`git rebase --skip` kahdesti)
  tämä säästi kymmeniä rivejä turhaa konfliktinratkaisua verrattuna
  merge-yritykseen, joka olisi vaatinut koko tiedoston käsinvertailun.
- **Pages-julkaisu ("Julkaise peli") ei ole välitön** — build ~3 min +
  deploy ~1 min ennen kuin `matkakirja.app/docs/*`-sivut päivittyvät.
  Readback-curl heti mergen jälkeen näyttää vanhan sisällön; odota
  workflow'n valmistumista (`gh run list` / `gh run view <id>`) ennen
  kuin raportoit tuloksen vikana.
- **Git-merge osaa itse yhdistää saman rivin oikein**, kun kaksi
  haaraa laajentaa samaa listaa peräkkäisillä, ei päällekkäisillä
  elementeillä (esim. E0-tuontilistan `['a','b','c']` →
  `['a','b','c','d']` kahdesta eri haarasta) — `ort`-strategia teki
  tämän oikein ilman konfliktia useaan kertaan, kun etukäteen ennakoitu
  konflikti (Karttasepän varoitus #2760/#2762:sta) osoittautuikin
  turhaksi huoleksi.
- **Mac voi kaataa session minä hetkenä hyvänsä** — kesken mergen
  (main jo mergetty paikalliseen haaraan, ei vielä pushattu) sessio
  jatkoi ongelmitta uudelleenkäynnistyksen jälkeen, koska git-tila on
  levyllä. Tarkista aina `git status` + `git log` + mainin SHA ennen
  jatkamista epäselvän katkon jälkeen, älä oleta mitään kadonneen.

## 10. Aloitusviesti seuraavalle sessiolle

```
Olet Julkaisija, Matkakirjan julkaisusessio (Sonnet). Työhakemisto
/Users/samireivinen/Matkakirja-julkaisija. Lue CLAUDE.md,
docs/roolitus.md ("Julkaisusäännöt") ja edellinen luovutuksesi
docs/raportit/viesti-julkaisija-luovutus-20260922-ilta.md kokonaan
ennen ensimmäistä mergeä — erityisesti kohdat 4 (kesken), 6 (muuttuneet
työtavat: EI --delete-branch, rebase duplikaattityölle, konfliktin
suunta) ja 9 (opetukset). Mainissa v2114 (main-HEAD 657077b71 sisältää
lisäksi kaksi versiotonta raportti/työkalu-PR:ää).

Ensimmäinen komento:
git fetch origin main && git status

Tarkista sitten Karttasepän pohjapoltto 2026-09-22c: onko se käynnissä,
päättynyt vai ei vielä alkanut (kysy tai lue viimeisimmät cross-
session-viestit). Jos poltto on kesken, ÄLÄ pushaa mitään äläkä aja
savukkeita ennen kuin Karttaseppä ilmoittaa sen päättyneen. Jos poltto
on valmis ja js/pallo.js:n PALLO_LAATTAVERSIO osoittaa jo mainissa
2026-09-22c-pohja/20260922c, ensimmäinen tehtäväsi on viedä Karttasepän
laatat+pallosarja R2-ämpäriin ja mergetä sen PR (kuvaputken
vakiotapa, Node-välitys, otos ≥5 osoitetta HTTP 200 ennen mergeä).

Sitovat säännöt tiiviisti: agentteina vain Opus/Sonnet; ei
--delete-branch gh pr merge -komennossa; kysymykset omistajalle vain
kysymyskorttina; Suomen aika (Europe/Helsinki), älä arvaa kellonaikaa
(aja date). Vastaa suomeksi, tiiviisti.
```
