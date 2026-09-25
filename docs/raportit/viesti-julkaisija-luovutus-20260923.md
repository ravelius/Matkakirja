# Julkaisijan luovutus 23.9.2026 (klo 11.15 EEST)

Työhakemisto (rooli-worktree): `/Users/samireivinen/Matkakirja-julkaisija`.
Tämä raportti kirjoitettu väliaikaisesta worktreestä
`/Users/koodaus/wt-julkaisija-luovutus` (haara
`julkaisija-luovutus-20260923`), koska rooli-worktree on työhaarassa
eikä sitä mergetä. Edellinen luovutus:
`docs/raportit/viesti-julkaisija-luovutus-20260922-ilta.md`.

Omistaja vaihtaa pelinkehityksen toiselle Claude-tilille pian (sama
työpöytä ja kansiot) — Fable nollaa tämän session ennen tilinvaihtoa.

## 1. Lue ensin

1. `CLAUDE.md`
2. `docs/roolitus.md` — erityisesti "Julkaisusäännöt"
3. Raamatun (`js/tyohuone-raamattu.js`) osiot: "TYÖTAPA JA SESSIOT",
   "MAC STUDIO: UUDEN SESSION ALOITUS ILMAN OMISTAJAN OHJETTA"
4. Tämä raportti kokonaan ennen ensimmäistä mergeä

## 2. Tila

**main = v2148, commit `b8cc7bc11`.** Istunnon alussa main oli v2114.
Julkaistiin v2115 → v2148 (34 versionostoa) yhden session aikana, plus
useita ilman versionnostoa mergettyjä raportti/työkalu-PR:iä.

Uusia rooleja ilmestyi tämän session aikana: **Siirtoseppä** (sisällön
siirtoputki natiivia peliä varten, tools/vienti/) ja **3D-selvittäjä**
(3D-moottorivertailu, docs/raportit/3d-*.md) — molemmat lähettävät
suoraan Julkaisijalle, ei aina Fablen kautta.

## 3. LUPASÄÄNTÖ: savukkeet-mac WebKit-launch-aikakatkaisut

Omistajan päätös (kortti 22.9. klo 21.50, uudistettu useaan kertaan):
**savukkeet-mac-punaiset joiden virhe on täsmälleen
`browserType.launch: Timeout 180000ms exceeded` ovat sallittuja** —
CI-ympäristön ajuriongelma (Laitetestaajan tutkinnassa,
`docs/raportit/ci-webkit-launch-20260922.md` ja
`docs/raportit/kaappaukset` jne.), ei koodiregressio. Vahvistin tämän
lataamalla ajon artifaktin ja lukemalla oikean lokitiedoston sanatarkasti
— ÄLÄ luota pelkkään GitHub Actionsin tiivistelmään, se ei sisällä
todellista virheviestiä.

**Ehto pysyy voimassa:** jos savukkeet-mac näyttää MITÄÄN MUUTA punaista
(ei launch-timeout), PYSÄHDY ja kysy — se voi olla oikea regressio.
Tapahtui kerran (#2850): epäilin ensin WebGL-kontekstivuotoa, mutta
lataamalla artifaktin ja vertaamalla täysin erillisiin haaroihin
kävikin ilmi, että kyse oli tästä samasta systeemisestä launch-
aikakatkaisusta. **Tarkista aina oikeasti, älä arvaa kumpaan suuntaan.**

**Testit (ubuntu, node-yksikkötestit) on AINA oikea portti** — sitä ei
koskaan ohiteta. Kolme kertaa tämä oli oikeasti punainen eikä
launch-timeout:
- **#2864**: PR:n oma menusiivous jätti `js/vedon-seuranta.js`:n orvoksi
  `tools/build-standalone.mjs`:n MODULES-listalle (niputustarkistus,
  "irrallinen listaus") — siirretty `tests/sw.test.mjs`:n
  NIPUTTAMATTOMAT-listalle.
- **#2885**: PR:n oma `js/kaiutinmittari.js`-muutos toi tuonnin
  `js/piirtokoe-asetus.js`:stä, joka oli MODULES-listalla vasta
  myöhemmin ("järjestysvirhe") — siirsin `piirtokoe-asetus.js`:n
  (ei omia riippuvuuksia) ennen tuojaansa.
- **#2903**: PR:n uusi äänite ei ollut LUFS-mitattu — ajoin
  `node tools/mittaa-aanet.mjs --kirjoita` (ks. kohta 6).

**OTA TAVAKSI:** aja `node tools/tarkista-niputus.mjs` osana omaa
tarkistuslistaa (uusi-versio.mjs → testit → **niputus** →
kaksoisavaimet → build-standalone), älä luota pelkkään CI:hin sen
löytämiseksi.

## 4. HEAD-TARKISTUS ENNEN MERGEÄ — ja sen jälkeenkin

**Sääntö (koko session ajan vahvistunut):** juuri ennen jokaista mergeä
`git fetch origin <pelikoodarin/karttasepän haara>` ja vertaa sen
HEAD-committia siihen tippiin, jonka rebasasit. Jos ne eroavat,
rebasea uudelleen — työagentit pushaavat usein lisäcommitin sillä
välin kun sinä rakennat omaa versiotasi.

**Opittu lisäys (#2843, #2888):** sama voi tapahtua **mergen
JÄLKEEN**, ennen kuin ehdit sulkea alkuperäisen PR:n. Kahdesti tänään
työagentti pushasi haaraan uuden commitin juuri sen jälkeen kun olin jo
mergennyt oman versioni — jäi huomaamatta kunnes joku (Fable tai
työagentti itse) ilmoitti erikseen. Jos näin käy: **avaa alkuperäinen
PR uudelleen** (`gh pr reopen`), rebasea uusi tippi (`git rebase --onto
origin/main <vanha-jo-mainissa-oleva-commit> HEAD` pudottaa jo-mainissa
olevat commitit puhtaasti), ja julkaise seuraavana versiona.

**Duplikaattihaarat (#2888):** joskus työagentti hylkää sotkuisen
pinotun haaran ja aloittaa puhtaan uuden samasta ominaisuudesta ilman
että kukaan sanoo sitä ääneen. Jos näet kaksi PR:ää samasta
ominaisuudesta (sama otsikko/tiedostot, eri branch), älä mergeä
kumpaakin — vertaa sisältöä, sulje vanhempi/sotkuisempi korvattuna, ja
julkaise vain puhdas versio.

## 5. Pinotut PR:t ja testitiedostokonfliktit

Kun kaksi PR:ää lisää oman testinsä samaan kohtaan samassa
testitiedostossa (esim. `tests/piirtokoe-asetus.test.mjs`,
`tests/profiilinaytto.test.mjs`), rebase antaa tavallisen
sisältökonfliktin — **molemmat testit ovat yleensä oikeita ja
riippumattomia**: yhdistä peräkkäin, älä valitse jompaakumpaa. Tapahtui
useita kertoja (#2853, #2854, #2857 x2, #2883/#2888). Aja testit
konfliktin ratkaisun jälkeen ja vertaa testimäärää PR:n ilmoittamaan —
jos täsmää, ratkaisu oli oikea.

Kun pinottu PR:n pohjahaara on jo squash-mergetty erikseen, tavallinen
`git rebase origin/main` yrittää soveltaa jo-mainissa-olevat commitit
uudelleen ja törmää turhiin konflikteihin. Käytä sen sijaan:
`git rebase --onto origin/main <viimeinen-jo-mainissa-oleva-commit>
HEAD` — se toistaa vain aidosti uudet commitit.

## 6. Sisältö-PR:t: sisältötyö EI kuulu Julkaisijalle

Kaksi eroa selkeästi:
- **Mekaaninen puuttuva vaihe, jonka voin ajaa turvallisesti itse:**
  esim. #2900:n LUFS-mittaus (`node tools/mittaa-aanet.mjs --kirjoita`,
  ympäristömuuttujat `CHROMIUM="/Users/koodaus/Library/Caches/
  ms-playwright/chromium-1234/chrome-mac-arm64/Google Chrome for
  Testing.app/Contents/MacOS/Google Chrome for Testing"
  PLAYWRIGHT_JS=/Users/samireivinen/Matkakirja-fable/node_modules/
  playwright/index.js NODE_USE_ENV_PROXY=1`) — mittaa oikeasta
  äänitiedostosta, ei arvaa mitään.
- **Sisällönhankintaa, jota EN saa arvata:** #2895 (kolme korvattua
  äänilähdettä ylittävät 180 s:n leikkausrajan: varsova 284s, sisilia
  464s, kobenhavn 420s — testi `sound.test.mjs` vaatii kesto ≤180) ja
  #2897 (kolme korvausta osoittavat Wikimedia Commonsin .ogg-tiedostoon,
  testi vaatii suoran .mp3:n). **PIDÄTETTY, ei korjattu** — vaatii
  Sisältökirjuria valitsemaan oikean lähteen/leikkauksen, en voi
  kuunnella tai leikata ääntä itse.

## 7. AVOIN JONO — päivitä ennen jatkoa

Tarkista `gh pr list --state open` heti session alussa; ainakin nämä
olivat auki luovutushetkellä:

1. **#2895** (musiikki+äänimaisemat NC-korvaus, 6/9) — PIDÄTETTY,
   kesto>180s kolmella korvauksella (kohta 6).
2. **#2897** (viimeiset 3/9: Finlandia, Sardana, bandura) — PIDÄTETTY,
   .ogg mp3:n sijaan kolmella korvauksella (kohta 6). Branchin head
   liikkui kerran (rebase, ei sisältökorjaus) — tarkista uudelleen.
3. **#2898** (Pelikoodari: äänille sama lisenssiportti kuin kuville,
   NC/ND-äänite ei soi) — **odottaa #2895 ja #2897:ää** Fablen oman
   ohjeen mukaan, koska vartija laskee NC-rivit; rebasea vasta niiden
   jälkeen.

Kun #2895/#2897 korjataan: normaali kaava (rebase, uusi-versio.mjs,
testit, niputus, kaksoisavaimet, build, PR, head-tarkistus, merge,
sulje alkuperäinen).

## 8. Worktree-säännöt (ennallaan, vahvistettu koko session ajan)

- Rooli-worktree (`/Users/samireivinen/Matkakirja-julkaisija`) pysyy
  aina työhaarassa jota ei mergetä koskaan suoraan.
- Jokainen julkaisu omaan väliaikaiseen worktreehen:
  `/Users/koodaus/wt-julkaisija-<aihe>`, haara
  `julkaisija-julkaise-<aihe>`, poista `git worktree remove --force`
  + `git branch -D` heti mergen jälkeen.
- Merge aina `gh pr merge <numero> --squash --subject "..."`, **EI**
  `--delete-branch` (Fablen sääntö: rooli-/työagenttihaarat jäävät
  historiaan).
- Ennen versionnostoa aina `git fetch origin main` ja rebase tuoreelle
  mainille — sessiot julkaisevat rinnakkain.
- `js/main.js` EI ole generoitu tiedosto; versiokonfliktissa vain
  APP_VERSION-rivi omasta haarasta, muu mainista.

## 9. Merge vaatii käyttäjän hyväksynnän

Tämän session `gh pr merge` -kutsu esti itsensä satunnaisesti
Claude Coden oman "Merge Without Review" -luokittelijan takia (ei
toistuva, ei ennustettava). Jos näin käy: älä yritä kiertää sitä,
kysy käyttäjältä lyhyesti hyväksyntä juuri sille PR:lle ja jatka.

## 10. Muuta tälle sessiolle hyödyllistä

- Cross-session-viestintä Fablelle jumiutuu ajoittain rate-limitiin
  ("already messaged Claude Desktop sessions N times") kun peräkkäisiä
  raportteja lähtee ilman että omistaja on kirjoittanut mitään väliin —
  viesti jää jonoon, ei häviä, ja lähtee kun käyttäjä kirjoittaa
  session'iin. Ei syytä paniikkiin, vain ilmoita tekstillä käyttäjälle.
- Uudet suorat lähettäjät (Karttaseppä, Pelikoodari, Siirtoseppä)
  lähettävät joskus suoraan Julkaisijalle ilman Fablen relayta —
  käsittele normaalisti kuten Fablen jonottamat, koska "vihreät PR:t
  ilman korttia" -sääntö kattaa nämä (päätoimittaja/roolit mergeävät
  rutiinit itse).
