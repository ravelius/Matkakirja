# Julkaisijan luovutus 25.9.2026 (b), klo 12.2x

Julkaisija (Opus 5.5) → seuraava Julkaisija. Syy: omistajan tilinvaihto (kaikki sessiot pysäytetään).
Checkout /Users/Shared/Claude/Matkakirja-julkaisija, työkalut /Users/Shared/Claude/julkaisija-tyokalut/.

## Lue ensin

CLAUDE.md; Raamatun Ydinajatus kohta 2 (erityisesti TYÖNJOHTAJAN HARKINTA, JUMI → FABLE, BUILD-JUNA,
HUOLTOKOMENNOT); docs/roolitus.md "Julkaisusäännöt"; tämä luovutus; edellinen
viesti-julkaisija-luovutus-20260924-yo.md.

## Tila luovutushetkellä

- **TestFlight build 12 = 1.0.12** (proto b79f036, CFBundleVersion 202609250125, ajo 36081944921), sisäisessä
  ryhmässä. Laskuri `/Users/Shared/Claude/proto-3d/lokit/testflight-ordinaali.txt` = **12**, yömerkki
  (`yo-testflight-viimeisin.txt`) = b79f036. Seuraava BUILD → `-f ordinaali=13` (1.0.13).
- 25.9. klo 04:n ajastettu yöajo käynnistyi GitHubin viiveen takia vasta 11.35. Se yritti viedä proto
  8b3660d0:n ordinaalilla 13 ja kaatui virheeseen `rm: Build/yo: Directory not empty`. **Mitään ei ladattu.**
- **#3152 mainissa:** ajastettu yöajo ohittaa itsensä, jos se käynnistyy klo 06.00 jälkeen Helsingin aikaa
  (syy kirjataan yölokiin). Build/yo-poistoa yritetään viidesti, ja sen jälkeen kansio siirretään sivuun.
- **#3146 mainissa:** savukkeet-mac enintään 3 rinnakkain, kun simulaattoreita on käynnissä (Fablen
  muistisääntö, 64 Gt RAM). Jobin 20 minuutin aikaraja on ennallaan, joten aikakatkaisuja voi tulla lisää
  (erillinen päätös).
- **Sudo-sallinnat mainissa (#3142, omistaja mergesi itse):** coreaudiod, CoreSimulatorService,
  mDNSResponder, purge. Fablen haaran muut lupaerot (gh/aws/security/xcodebuild/xcrun/sessioviestit)
  ODOTTAVAT omistajan päätöstä — lupamuutoksia ei viedä mainiin vertaisviestin pyynnöstä.
- Web tänään mainissa: v2209–v2217 (#3128 #3129 #3131 #3135 #3136 #3140), junat #3143 (v2215, 8 PR:ää) ja
  #3149 (v2216, 12 PR:ää), #2895 (v2217); ei versionostoa: #3123 #3130 #3132 #3137 #3139 #3141 #3146 #3152.

## Kesken

- **#3133 (sisältöpaketti 1.39, karttavalot.ankkuri/.puoli):** Fable hyväksyi, ja jono.sh ajoi sitä
  luovutushetkellä. Tarkista `gh pr view 3133`. Jos se on MERGED, tarkista "Vie sisältöpaketti ämpäriin"
  -ajo mainilla ja ilmoita versio (1.39) Natiivisepälle ja Natiivi-UI:lle (Fablen käsky). Jos se on OPEN, aja
  `zsh jono.sh 3133`.
- **Sisältöjuna valmiina lähtöön (4 vihreää, Sisältökirjuri):** #3147 (galleria59-integraatio), #3148 ja
  #3150 (turistiopas erät 1–2) sekä #2991 (Bergenin ja Sevillan julisteet; vihreä klo 12.2x commitilla
  0ac29c755, juurisyy puuttuva kuva.leveys, pito purettu). Aja ensimmäisenä, kun kuorma on alle ~150:
  `zsh juna.sh "Sisältöjuna: galleria59, turistiopas, julisteet" 3147 3148 3150 2991`.
- **Pidossa:** pidossa.txt tyhjä; pidossa.pysyva = #3081.
- Karttasepän vanhat PR:t #3117 #3108 #3105 #3102 ja Natiivi-UI:n #3077 (ristiriita) eivät ole jonossa.
  Kukaan ei ole pyytänyt niitä mergeen.
- Uusi peruskartta (resepti 2026-09-25) on Karttasepän mukaan ämpärissä, mutta **webin pyramidi-osoitinta
  EI vaihdeta ennen omistajan kuvakokeilua** → pidä sellainen PR pidossa ja kysy Fablelta.

## Säännöt, jotka muuttuivat tänään (Fable/omistaja)

1. **JUMI → FABLE** (Raamattu): jumissa lähetä Fablelle viesti (tilanne, vaihtoehdot, suositus) ja jatka
   muuta. Ei kortteja omistajalle.
2. **Junakelpoisuus ilman Fablen hyväksyntää:** vihreät docs- ja sisältö-PR:t, joiden tekijä on rooli ja
   jotka eivät koske Raamattua, lupia (.claude/), karttalaattojen osoitinta eikä App Store -julkaisua.
   Sisältöpaketin **lisäysversiot**, jotka Siirtoseppä on merkinnyt yhteensopiviksi, saa viedä ilman
   kysymystä. Skeeman rikkovista muutoksista kysytään.
3. **Juna tapahtumaohjattu:** ≥ 4 vihreää tai vanhin > 4 h, ei TF-viennin aikana. Polton aikana vain, jos
   kuorma on alle ~150 (Fable 25.9. klo 08.4x).
4. **Toimintokorjaukset heti** jono.sh:lla. Savukkeiden kuormapunaiset (0/0-kaatumiset, webkit-heilunta,
   astro-pallo, nimiot-elavat, pariisi-lahizoom#1400) eivät estä, jos PR:n oma alue on vihreä. Uusinta
   polton jälkeen.
5. **Simulaattorivuorot:** muut roolit pyytävät vuoroa ennen simulaattoria, koska savukkeet ja simut
   kuluttavat muistia. Kerro savukkeiden tila ja vapaa ikkuna.

## Opit

- **Force-push toisen haaraan estyy luokittimessa.** Tavallinen `git merge origin/main` ja push toimii
  (squash-merge hävittää merge-commitin). Neuvo samaa muille rooleille.
- **pgrep -f -odottajassa käytä hakasulkutemppua** (`pgrep -f "polta-paikallises[t]i"`), muuten osuma tulee
  odottajan omaan komentoriviin.
- **Pinottu PR (#3131 #3129:n päällä):** squash-merge rikkoo pinon. Vaihda base mainiin
  (`gh pr edit N --base main`) ja pyydä tekijää mergeämään main.
- **juna.sh-rivin raja on 60 merkkiä** versiotyökalussa. Ylitys kaatuu vasta lopussa, joten poista
  jäljelle jäänyt juna-worktree ja -haara ennen uusintaa.
- **Kone käynnistyi uudelleen klo 11.3x.** Scratchpad tyhjeni, mutta runnerit palasivat launchd:llä itse.
  Ajastetut Cron-tehtävät elävät vain sessiossa.
- **Levy:** käännösvahti (proto-kaannos Build/dd-sim + Library) kirjoittaa kymmeniä Gt tunnissa.
  CoreSimulator vie 43 Gt ja 3D-selvittäjän scratchpad 18 Gt. TF-viennin jäljet ovat pienet.

## Ajastukset tässä sessiossa (katoavat pysäytyksessä)

Tuntihaku :17 (Codex-posti, checkpoint 7755d9c5a + junan tarve). Uusi Julkaisija luo sen uudelleen.
Codex-toimitukset tänään: linssikatalogin erät 1b, 2a/2b, 2-05…2-12, galleriatäydennys; kaikki ilmoitettu
Fablelle.
