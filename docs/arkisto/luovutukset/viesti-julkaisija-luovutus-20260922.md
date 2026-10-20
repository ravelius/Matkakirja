# Julkaisijan luovutus 22.9.2026 (session nollaus, konteksti 73 %)

Työhakemisto: `/Users/samireivinen/Matkakirja-julkaisija`. Mainissa
**v2083**. Edellinen luovutus: docs/raportit/viesti-julkaisija-luovutus-20260921-ilta.md.
Rutiini ennallaan (docs/roolitus.md): `git checkout -B julkaisija-julkaise-<nimi> origin/<haara>`,
`git merge origin/main --no-edit`, `node tools/uusi-versio.mjs "kuvaus"`,
`node --test tests/*.test.mjs` + tarkista-kaksoisavaimet/niputus/savukkeet,
`node tools/build-standalone.mjs`, push, `gh pr create`, merge kun
testit+reitti vihreä (savukkeet-mac ei ole pakollinen portti tänä iltana).

## Mergetty tänä iltana (karkea järjestys)

- **Kartuscha**: bih v2033, ukr v2034, rus v2035, isl v2036 (DEU/ITA/ESP-
  haarat osoittautuivat kokonaan jo mainissa oleviksi — ei mergeä).
- **Maakuntien luonnehdinnat** v2037 (97 aluetta, 7 maata).
- **Nostotaso, 30 maata** (SRB pois, ei dataa) v2038–v2082: GBR POL AUT
  NLD BEL CHE PRT GRC CZE HUN SWE NOR DNK FIN IRL + HRV SVN SVK ROU BGR
  BIH LTU LVA EST ISL LUX MLT CYP UKR RUS TUR.
- **Nostojen tyyppimerkit** v2039, **kortin turva-alue** v2041,
  **karttaseppä-pyyntötahditus** (#2699/#2699-tyyppinen, ei versionostoa).
- **Pelikoodarin 3 CI-punaiskorjausta**: ci-punaiset v2046,
  savukkeet-punaiset v2047, savukkeet-webkit v2048.
- **Nostojen liikevara + ablaatiopohja** v2056, **glnostot-savuke**-korjaus
  v2059, **hehkupiste** v2060, **linssikatalogi-maanosat** v2061
  (omistajan lupa julkaista ilman korttia).
- **Zoomi-piirto** (laattojen valmistelu väistää pitkää kehystä) v2078,
  **tasaisuus** (laatta odottaa suojaa, tukivara 0,75) v2080 — rakennettu
  zoomi-piirron päälle, samassa PR:ssä kaksi add/add-konfliktia
  (kehysprofiili.js, mittaa-zoomipiirto.mjs) ratkaistu ottamalla
  tasaisuus-haaran superset-versio kokonaan.
- **Karttasepän #2741** (maapolygoni-työkalu --taso=admin0) ja **#2745**
  (maakuntavektorit M1, js/pallomaakunnat.js, lippu `?maakunnat=1`
  oletuksena pois — ei vaikuta tuotantoon).
- **Kohtaamiset**: C1 (Fabrizio/Saana/Kemal) mergetty suoraan jonkun
  toisen toimesta ennen kuin ehdin; C2 (Ateena/Budapest/Firenze/
  Lissabon/Sofia/København) + C3 (Bukarest/Oslo/Tampere/Dublin/Granada/
  Pietari) yhdistettynä samaan PR:ään v2083, 26 kaupunkia yhteensä,
  ei duplikaatteja (tarkistettu moduulin importilla, ei vain syntaksilla).

## Avoimet asiat — TÄRKEIN ENSIN

1. **Maakuntien kuvavienti R2-ämpäriin** (Fablen lupa annettu tälle
   erälle): haara `sisalto-maakunnat-era2` sisältää nyt erät 2+3
   yhdessä + `js/packs/maakunnat-pulu.js` (uusi tiedosto, rekisteröity
   sw.js SHELLiin + NIPUTTAMATTOMAT-poikkeuslistalle kuten
   luonnehdinnat, ei vielä tuojaa — Pelikoodari kytkee myöhemmin).
   Kuvat paikallisessa kansiossa
   `/Users/samireivinen/Matkakirja-nostot-kuvat/maakunnat/<ISO>/kuvat/`,
   data viittaa jo R2-osoitteisiin (media.matkakirja.app/karttanostot/
   20260922/). **Vie kuvat ämpäriin kuvaputken vakiotavalla (Node-
   välitys CORS:n takia, sama kuin nostokuvilla) ENNEN mergeä, tarkista
   otos (≥5 osoitetta HTTP 200), vasta sitten merge.** Tätä ei ehditty
   aloittaa.
2. **Kohtaamiset C4** (Sisältökirjuri, haara `sisalto-kohtaamiset-c4`,
   commit ed25483b9, Fable hyväksynyt): Tallinna/Vilna/Barcelona/Praha/
   Moskova/Ljubljana, sama tiedosto js/packs/kohtaamiset.js — käytä
   samaa menetelmää kuin C2/C3:ssa (kohta "Opitut asiat" alla).
3. **Sähke-token** on yhä vanhentunut — älä aja `sahke-worker.yml`.
4. **Mittausikkunat**: Laitetestaaja ilmoittaa "mittausikkuna alkaa/
   päättyy" (enintään 15 min, Fablen sääntö) — sen aikana EI saa
   käynnistää savukkeet-mac-ajoja eikä dispatch-ajoja (uuden PR:n
   pushaus laukaisee CI:n, myös se pitää välttää); Testit (ubuntu) saa
   jatkua normaalisti.
5. **Codex-toimitukset**: mergeä suoraan kun testit vihreät, kuten
   #2697 ja aiemmat.
6. **Worktree-varoitus**: Fable kysyi, poistaako Julkaisijan siivous
   toisten roolien worktreejä — vastaus oli ei (ainoa siivouskomento on
   `gh pr merge --squash --delete-branch`, joka poistaa vain etähaaran
   ja jonka omat turvat estävät paikallisen poiston toisessa
   worktreessä checkoutissa olevalta haaralta); PR #2697:n mergessä ei
   näkynyt tavanomaista "skipping local delete" -viestiä, joten syytä ei
   voitu varmistaa — jos worktree-katoamisia jatkuu, syy on muualla.

## Opitut asiat (tärkeää seuraavalle Julkaisija-sessiolle)

1. **Versionumerotörmäykset**: aja AINA `git merge origin/main` haaraan
   (ei pelkkää fetch+käsinasetusta) ENNEN `uusi-versio.mjs`:n ajoa.
   Tarkista mergesuunta konfliktia ratkaistessa: kun HEAD on tuore
   `origin/main`-pohjainen haara ja sisältöhaara mergataan SISÄÄN,
   konfliktit ratkaistaan `--ours` (= main); kun HEAD on sisältöhaara ja
   `origin/main` mergataan SISÄÄN, konfliktit ratkaistaan `--theirs`
   (= main). Suunnan sekoittaminen ei näy virheenä, vaan main palautuu
   hiljaa vanhempaan tilaan ja paljastuu vasta testien epäonnistumisena
   — tarkista APP_VERSION aina konfliktin ratkaisun jälkeen ja aja koko
   testisarja uudelleen.
2. **Vanhentuneet sisältöhaarat**: useampi nostotaso/DEU/ITA/ESP-haara
   oli hyvin vanhan mainin pohjalta ja täysin jo mainissa olevan
   sisällön korvaama. Ennen vanhan haaran mergeä tarkista, onko sen
   diff nykyistä mainia vastaan itse asiassa TYHJÄ (ei mergettävää) —
   muuten haara tuo mukanaan tuhansia rivejä vanhentunutta
   duplikaattisisältöä.
3. **Jaetun tiedoston append-konfliktit** (sarjat.json, kohtaamiset.js,
   muutokset.js): kun kaksi haaraa lisää uusia rivejä saman taulukon/
   objektin loppuun, gitin diff saattaa täsmätä identtisen
   loppuboilerplatetin (esim. samat oletustunnetagit) kautta, jolloin
   konfliktin molempien puolten suora peräkkäin liittäminen rikkoo
   rakenteen. Luotettava korjaus: eristä kummankin haaran puhdas lisäys
   OMAA merge-baseaan vasten otetulla diffillä ja liitä se puhtaana
   olemassa olevan sisällön perään; varmista lopuksi oikealla moduulin
   importilla (ei vain syntaksitarkistuksella), että kaikki odotetut
   avaimet ovat mukana eikä duplikaatteja synny.
4. **Counts-laskurit**: kun kaksi sisältöhaaraa kasvattaa samaa
   numeerista laskurikenttää rinnakkain, git mergaa hiljaa ilman
   konfliktia mutta tulos voi olla väärä — tarkista käsin
   rinnakkaisten sisältöhaarojen mergen jälkeen.
