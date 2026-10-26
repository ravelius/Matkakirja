# Luovutus: Julkaisija — 2026-09-21 ilta

Sessio nollataan kontekstin (72 %) vuoksi.

## Tuotannon tila

Main on tätä kirjoittaessa v2032 (PR #2691, Marseille-nimen välkkyminen);
PR #2687 (sisalto-kartuscha-bih, v2033: Kartuscha BIH kolme aihetta) on
juuri pushattu ja testit ajossa — seuraava Julkaisija-sessio tarkistaa
`gh pr checks 2687` ja mergeää heti kun Testit on vihreä
(`gh pr merge 2687 --squash --delete-branch`).

Mergetty tänä iltana (v2005:stä alkaen, karkea järjestys): gl-rasterit,
reaktiot-sydan, nostot-nakyviin, visat 1–4, zoomiraja, gl-nimiot (+
korjaus), pohjapoltto-osoitin (isobaatit+merikoristeet), monumentit
(26 nykykuvaa), gl-nostot (vaihe 3+4), grc-kuvat-korjaus (kuva.tiedosto),
pelikaupunki-erä A (Kypros/Nikosia, Luxemburg, Malta/Valletta),
nimion-koko-korjaus, savukkeet-webkit-vakaus, maakuntavedos-4 (docs),
gl-runko-3 (horisontin häive), zoomiennakko, glnimiot-vanha-rasteri
(Marseille-välke). Codex mergäsi suoraan kaksi omaa PR:ää (v2029
monumenttikuvat, v2030 miniatyyrit) main-haaraan CI:n kautta — ei minun
kauttani, huomasin vasta versionumeroiden törmätessä.

## Avoimet PR:t ja jono

- **PR #2687** (sisalto-kartuscha-bih, v2033) — **CI EI OLE KÄYNNISTYNYT
  KERTAAKAAN** kolmella peräkkäisellä pushilla (`gh api
  repos/.../actions/runs?per_page=100` → 0 osumaa head_branch =
  sisalto-kartuscha-bih, koko historia). Muut samaan aikaan pushatut
  haarat (esim. karttaseppa-zoomiennakko, pelikoodari-glnimiot-vanha-
  rasteri) käynnistyivät normaalisti. En ehtinyt selvittää syytä ennen
  kontekstirajaa. Seuraava askel: pushaa uusi tyhjä commit
  (`git commit --allow-empty -m "CI-triggeri" && git push`) tai avaa
  PR kokonaan uudelleen; jos CI ei silti käynnisty, tarkista GitHubin
  Actions-asetuksista onko työnkulku poistettu käytöstä juuri tälle
  haaralle/PR:lle.
- **pelikoodari-safe-area** (1e8beb96) — Fablen jonossa, ei vielä
  käsitelty. Korttien turva-alue iPhonella, savuke 40/40, testit 3838/0.
- **pelikoodari-linssikatalogi-maanosat** (54d366a17) — Pelikoodari
  ilmoitti, odottaa omistajan korttia ennen julkaisua. Älä mergeä ilman
  Fablen vahvistusta.
- **karttaseppa-che-kanttonit** (PR #2690) — näkyi CI-listassa, en ehtinyt
  käsitellä; tarkista `gh pr view 2690` tilanne.
- Sisältökirjuri ilmoitti juuri kolme lisää kartuscha-haaraa jonoon
  PR #2687:n (bih) perään: sisalto-kartuscha-ukr (a6dcba7c),
  sisalto-kartuscha-rus (cd43ea4b5), sisalto-kartuscha-isl (32a4456f8) —
  kaikki v1973-prep-pohjaisia (paitsi bih, joka on origin/main-pohjainen),
  tarvitsevat siis mergen origin/main:iin kuten tavallisesti. Yhteenveto
  docs/raportit/kartuscha-era-b-yhteenveto-20260921.md.
- Sähkelinjan CLOUDFLARE_API_TOKEN on yhä vanhentunut (worker poikki
  6.9. lähtien) — omistaja luo uuden tokenin, ÄLÄ aja
  `sahke-worker.yml` ennen kuin Fable ilmoittaa erikseen.

## Opitut asiat (tärkeää seuraavalle Julkaisija-sessiolle)

1. **Piilokonflikti: identtiset laskurikorotukset.** Kun kaksi haaraa
   samasta main-pohjasta kasvattaa samaa numerolaskuria (esim.
   `js/packs/maailmankartta.js` ja `js/packs/europe.js`:n
   `counts.pieniAarre`, +1 per uusi kaupunki) samaan lopputulokseen,
   git näkee rivit identtisinä eikä liputa konfliktia. Mergessä katoaa
   HILJAA toinen korotus (`Game.enterWorld` kaatuu vasta ajossa
   "Laattoja X, kaupunkeja Y"). Löytyi vain koska node --test ajettiin
   joka mergen jälkeen. AINA kun kaksi sisältöhaaraa lisää kaupunkeja/
   kohteita samaan pakkiin rinnakkain, laske counts-summa käsin
   (`kaupunkien määrä === counts-kenttien summa`) äläkä luota pelkkään
   git-mergeen.
2. **Sisältöhaarat main-pohjasta ilman koordinointia** (visat 1–4,
   monumentit, pelikaupunki cyp/lux/mlt) tuottavat toistuvasti
   päällekkäisiä lisäyksiä samoihin `hahmotelma-<iso>.js`-tiedostoihin
   (sama kaupunki saa visan/kuvan kahdesta haarasta). Ratkaisumalli
   joka toimi: per-konflikti tarkista kumpi puoli on tyhjä (main jo
   julkaissut saman) ja ota se; jos molemmat puolet ovat isoja UUSIA
   kohteita (bel/svk/svn-tyyppinen), yhdistä MOLEMMAT (lisää puuttuva
   sulkumerkki + pilkku, älä valitse kumpaakaan). Regeneroi
   `docs/raportit/nostoinventaario-20260920.md`
   `node tools/nostoinventaario.mjs`:llä mergen jälkeen, älä yritä
   ratkaista sitä käsin — se on generoitu tiedosto.
3. **Versionumeroiden törmäys usean rinnakkaisen PR:n kanssa.**
   `tools/uusi-versio.mjs` lukee mainin JA muutokset.js:n kärjen, mutta
   ei näe TOISIA avoimia PR:iä, jotka ovat jo varanneet seuraavan
   numeron omassa haarassaan. Kun kaksi PR:ää molemmat saavat saman
   numeron eikä kumpaakaan ole vielä mergetty, mergeä ENSIN toinen,
   sitten hae origin/main uudelleen SEN JÄLKEEN toiselle haaralle
   (`git checkout origin/main -- js/main.js sw.js js/muutokset.js`,
   sitten `node tools/uusi-versio.mjs` uudelleen) ennen kuin pushaat.
   Tämä toistui illalla useita kertoja (Codexin kaksi suoraa mergeä,
   plus omat rinnakkaiset kiireelliset erät) — se on normaalia kun
   moni sessio julkaisee samaan aikaan, ei virhe.
4. **Savukkeet-mac ja pohjapoltto.** Kun Karttaseppä polttaa, peru
   käynnissä olevat/käynnistyvät savukkeet-mac-ajot
   (`gh run cancel <id>`) äläkä käynnistä uusia dispatch-ajoja polton
   aikana (yksi self-hosted-runner, yksi job kerrallaan). Testit-portti
   ajaa ubuntulla, ei tarvitse CI-taukoa mergeille. Polton jälkeen aja
   `gh workflow run savukkeet.yml --ref main` kertaalleen jälkikäteen
   kattamaan poltontauon aikana ohitetut PR:t.
5. **CI ei aina käynnisty ensimmäisellä pushilla** ilman näkyvää syytä
   (sisalto-kartuscha-bih ei saanut yhtään check-runia kahdella
   ensimmäisellä pushilla, `gh api repos/.../commits/<branch>/check-runs`
   näytti tyhjän). Ratkaisu oli vain pushata uudelleen (tuore commit) —
   ei jäänyt selvittämättä miksi, mutta toistui vain kerran.
6. **`git checkout -B <sama-nimi> origin/<haara>`** ei aina tyhjennä
   työhakemistoa, jos siellä on committoimattomia muutoksia samannimisiä
   tiedostoja varten (esim. keskeneräinen version bump) — tarkista
   `git status` ja `git checkout -- <tiedostot>` ennen uudelleenmergeä,
   älä oleta puhdasta tilaa pelkästä `checkout -B`:stä.

## Rutiini (ennallaan)

1. `git checkout -B julkaisija-julkaise-<nimi> origin/<pelikoodari|karttaseppa|sisalto>-<nimi>`
2. `git merge origin/main --no-edit` — ratkaise konfliktit (js/main.js
   VAIN APP_VERSION-rivi omasta haarasta, muu mainista; sw.js/muutokset.js
   samoin, ota mainin versio ja aja työkalu uudelleen).
3. `node tools/uusi-versio.mjs "kuvaus"` (docs/työkalu-only-erät eivät
   tarvitse tätä).
4. `node --test tests/*.test.mjs` (LUE # pass / # fail, ei katkaistua
   häntää) + `tarkista-kaksoisavaimet.mjs` + `tarkista-niputus.mjs`
   (+ `tarkista-savukkeet.mjs` jos savuke-tiedostoja muutettu) +
   `build-standalone.mjs`.
5. Committaa, pushaa haaraan, `gh pr create` (tai päivitä olemassa
   oleva PR jos Karttaseppä/Pelikoodari avasi sen jo suoraan).
6. Odota Testit-portti vihreäksi, `gh pr merge --squash --delete-branch`
   ilman `--admin`-lippua (main ei ole suojattu, ei tarvita koskaan).
7. Ilmoita versionumero pyytäneelle sessiolle.
