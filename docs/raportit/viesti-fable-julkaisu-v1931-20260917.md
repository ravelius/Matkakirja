# Julkaisu v1931 — Sonnet-agentin raportti 17.9.2026

Haara `claude/bold-ride-vow4ki-julkaisu-v1931`, pohja
`claude/bold-ride-vow4ki-julkaisu-v1930` (`9bd88d2a`, koska v1930 PR
#2554 oli vielä auki eikä main sisältänyt v1930:tä). Worktree
`/home/user/wt-julkaisu2`.

## TÄRKEIN HAVAINTO: versionosto pysäytettynä — main ei vielä sisällä v1930:tä

Tehtävänannon kohta 6 ennakoi tämän tarkasti: *"jos työkalu antaa
v1930, kerro heti raportissa ja pysähdy — silloin main ei vielä
sisällä v1930:tä ja odotamme."* Juuri näin kävi, joskin työkalu
kaatui virheeseen eikä tulostanut onnistumista:

```
$ node tools/uusi-versio.mjs "Astronautin kamera: pallo ei enää mustu uudelleenavauksessa"
v1930 on jo paikallisessa lokissa — ajoitko työkalun kahdesti?
```

Juurisyy: `tools/uusi-versio.mjs` fetchaa `origin/main` ja laskee
seuraavan numeron **mainin** `sw.js`:n CACHE-numerosta ja
`js/muutokset.js`:n kärkirivistä. `origin/main`:n CACHE on yhä
`matkakirja-2026-08-09.1929` (PR #2554 auki, ei mergetty), joten
työkalu laski seuraavaksi numeroksi **1930** — mutta tämä haara
(pohjattu v1930-julkaisuhaarasta) sisältää jo paikallisesti rivin
`{ v: 1930, ... }` `js/muutokset.js`:ssä, joten työkalun oma
tuplasuoja kieltäytyi. Työkalussa ei ole logiikkaa hypätä suoraan
1931:een tässä tilanteessa — se vain vertaa laskettua numeroa
paikalliseen lokiin ja pysähtyy, jos osuma löytyy.

**Pysäytin tehtävänannon mukaisesti version noston jälkeisen ketjun**
(build-standalone, PR:n luonti) — mainin CACHE- ja APP_VERSION-numero
ovat yhä `1929`, eikä `dist/`-tiedostoa rakennettu. Tämä on siis
odotettu, ei virhe koodissa: **odotamme PR #2554:n (v1930) mergeä
mainiin**, minkä jälkeen `node tools/uusi-versio.mjs` antaa v1931:n
tässä samassa haarassa (tai haara nollataan mainiin ja työkalu
ajetaan uudelleen roolitus.md:n kohdan 6 mukaan).

## 1. Mitä haarassa on (tehty ennen pysäytystä)

Kolme mergeä `git fetch origin` jälkeen, kaikki `--no-ff`:

| haara | commit | konflikti | sisältö |
|---|---|---|---|
| `origin/claude/bold-ride-vow4ki-astro-webkit2` | `1477626d` | ei | Astronautin kamera: `valkaiseMateriaali()` kirjoittaa uuden Color-olion, väri valkaistaan avauksessa ja sulussa, kehysvahti, pinta-musta-vartija, ladontakatto 4096×2048, pallodiag-rivit. Mac todensi oikealla WebKitillä 0/12 mustaa. |
| `origin/claude/bold-ride-vow4ki-webkit-toisto` | `93a56fc4` | KYLLÄ — add/add `docs/raportit/viesti-fable-webkit-toisto-20260917.md` (v1930-haarassa oli jo tästä raportista vanhempi versio kopioituna, ks. v1930-raportin luku 3). Ratkaistu `git checkout --theirs` eli **webkit-toisto-haaran versio voitti**, kuten tehtävänanto käski. | `tools/savukkeet/savuke-astro-webkit.mjs` + raportti (luku 7: sama matriisi webkit+chromium × 2539×1321 + 390×844 × 3 avausta, pinta-mittaus 150–161 joka avauksessa, 0/12 mustaa). |
| `origin/claude/bold-ride-vow4ki` (Fable) | tuorein | ei | Raamattu-päivitys (`js/tyohuone-raamattu.js`, 22 lisäystä / 3 poistoa). |

Kaikki kolme mergeä vahvistettu `node --check`-tasolla epäsuorasti
(täysi testisarja meni läpi, ks. luku 3) — ei yhtään
`CONFLICT`-riviä muissa kuin yllä mainitussa raporttitiedostossa.

## 2. Pieni siistiminen (Macin huomio 7.2)

`js/linssit/satelliitti-avaruus.js`: sulun `valkaiseMateriaali(materiaali, varinLahto)`
palautti materiaalin väriksi `varinLahto`-muuttujan, joka on **0
(musta)** jo laattatilassa, koska globe.gl alustaa materiaalin värin
mustaksi ennen kuin peli edes avaa linssiä. Purku siis maalasi pallon
takaisin mustaksi täsmälleen sen virheen tilalle, jonka koko
Astronautin kamera -korjaus (kohta 1) oli juuri poistanut.

- Muutettu sulun kutsu: `valkaiseMateriaali(materiaali, varinLahto)`
  → `valkaiseMateriaali(materiaali)` (käyttää oletushexiä 0xffffff eli
  valkoista).
- Kommentti korjattu vastaamaan mitattua juurisyytä (globe.gl:n oma
  alustusarvo, ei "lähtöarvo, joka joskus puuttuu").
- **Testi jouduttiin päivittämään**: `tests/satelliitti-avaruus.test.mjs`
  testi *"linssi valkaisee materiaalin sekä avatessa että sulkiessa
  (lähde)"* väitti lähdekoodista täsmälleen sitä riviä
  (`valkaiseMateriaali(materiaali, varinLahto)`), jonka tämä siistintä
  poisti — eli testi vahvisti juuri sen virheen, joka korjattiin.
  Väite päivitetty tunnistamaan uusi rivi
  (`valkaiseMateriaali(materiaali);` sulun jälkeen) ja kommentti
  laajennettu selittämään miksi lähtöarvoa ei enää käytetä. Tämä ei
  ollut tehtävänannossa erikseen pyydetty, mutta ilman sitä
  `node --test tests/satelliitti-avaruus.test.mjs` olisi jäänyt
  punaiseksi juuri tästä yhdestä testistä — **69/69 pass** korjauksen
  jälkeen (ajettu kertaalleen, kuten pyydetty).

Huom: muuttuja `varinLahto` (rivi ~2155) jäi koodiin käyttämättömänä
paitsi kommentissa — sitä ei poistettu, koska tehtävänanto rajasi
muutoksen yhteen riviin eikä `node --check` tai testit valita siitä.

## 3. Testit (kertaajo, ei uusintaa)

`NODE_USE_ENV_PROXY=1 npm test` → `# tests 3585`, `# pass 3572`,
`# fail 0`, `# skipped 13` (samat ympäristön ohitukset kuin
v1930:ssä — ei uusia, ei karanteenoituja). Kesto n. 119 s.

`node --test tests/satelliitti-avaruus.test.mjs` erikseen (kohdan 2
vaatimus): **69/69 pass**.

| työkalu | tulos |
|---|---|
| `tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |
| `tools/tarkista-niputus.mjs` | 394 moduulia, 4386 julistusta, ei törmäyksiä — sama moduulimäärä kuin v1930:ssä, ei uusia `js/`-moduuleja tässä erässä (vain olemassa olevia tiedostoja muutettu; `js/linssivirhe.js` ja `pallodiag.js` olivat jo v1926:ssa, kuten tehtävänannossa huomautettiin) |
| `tools/tarkista-savukkeet.mjs` | 1914 ui-viittausta, 409 metodia, 539 kenttää, 31 lehtitilan kenttää (nousu v1930:n 1902:sta johtuu uudesta `savuke-astro-webkit.mjs`:stä) |

## 4. Mitä EI tehty (pysäytyksen vuoksi)

- **Versionostoa ei tehty** — ks. yllä. `sw.js` CACHE ja `js/main.js`
  APP_VERSION ovat yhä `1929` (perittynä pohjahaarasta, joka itsessään
  ei ole vielä mainissa).
- `node tools/build-standalone.mjs` — ei ajettu, koska versio ei ole
  ajan tasalla eikä `dist/` committoida.
- Paikallista `savuke-astro-pallo.mjs`-ajoa (kohta 8) ei ajettu —
  koordinaattorin tarkennus kesken tehtävän (Raamattu TARKENNUS 4,
  17.9.): julkaisuagentti ei enää aja savukkeita paikallisesti, PR:n
  Savukkeet-työnkulku hoitaa sen.
- **PR:ää ei avattu.** Otsikko olisi pitänyt olla
  `v1931: <muutoslokirivi>`, mutta versionumeroa ei ole vielä
  valittu — PR:n avaaminen tässä vaiheessa antaisi harhaanjohtavan
  otsikon ja tyhjän `dist/`-päivityksen. Branch on kuitenkin pushattu
  (ks. alla), joten työ ei ole kadoksissa.

## 5. Seuraava askel (Fablelle / seuraavalle sessiolle)

1. Odota PR #2554:n (v1930) mergeä mainiin.
2. Kun main sisältää v1930:n: `git fetch origin`, tarkista onko tämä
   haara (`claude/bold-ride-vow4ki-julkaisu-v1931`) yhä ajan tasalla
   mainista roolitus.md:n kohdan 6 mukaan (nollaus mainiin +
   force-with-lease jos main on liikkunut enemmän kuin vain v1930:n
   verran), ja aja `node tools/uusi-versio.mjs "Astronautin kamera:
   pallo ei enää mustu uudelleenavauksessa"` uudelleen.
3. Sen jälkeen: `npm test`, `tools/build-standalone.mjs`, commit,
   push, PR (roolitus.md:n kaava, otsikko `v1931: <muutoslokirivi>`).

## 6. Kesto

Aloitettu n. klo 10.05 UTC. Kolme mergeä valmiit n. klo 10.10.
Siistintä ja testin korjaus n. klo 10.10–10.18. Versionosto
pysäytettynä n. klo 10.19. Täysi testisarja + tarkistimet valmiit n.
klo 12.20 (npm test n. 119 s). Raportti kirjoitettu n. klo 12.25 —
kokonaiskesto raportin kirjoitushetkeen n. 40 minuuttia (aikakatto
45 min).
