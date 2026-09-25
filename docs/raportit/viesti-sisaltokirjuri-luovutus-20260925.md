# Luovutus: Sisältökirjuri — 25.9.2026 klo 08.5x

Konteksti 71 %, Fablen pyynnöstä luovutus ja nollaus. Edellinen luovutus:
`docs/raportit/viesti-sisaltokirjuri-luovutus-20260924-yo.md`. Tämä vuoro: linssikatalogin kuvitus
loppuun asti (155/155), koko tilausprosessin läpivienti postilaatikossa, ja Fablen/Julkaisijan
pyytämä vanhojen sisältö-PR:ien auditointi (12 PR:ää rebasettu, 2 suljettu vanhentuneena, 2 korjattu).

## 1. Lue ensin

1. `CLAUDE.md`, `docs/roolitus.md`, Raamatun "TYÖTAPA JA SESSIOT"
2. `docs/linssikatalogi.md` ja PR:t #3129/#3131/#3138 (linkit alla) jos linssikatalogityö jatkuu
3. Tämä raportti kokonaan

## 2. Linssikatalogi — tila

### Mergetty mainiin

- **PR #3129** (v2211): Pelikoodarin ulkoasukorjaukset (tilamerkit, mobiili, suodattimet, muu-moottorin väri).
- **PR #3131** (v2213): sivu jaettu neljäksi välilehdeksi (Moottorit/Pelissä nyt/Seuraavat/Katalogi),
  URL-hash-reititys (#moottorit/#pelissa/#seuraavat/#katalogi), puhelimen välilehtirivi mahtuu ilman leikkautumista.

### Auki: PR #3138 — kuvitus 155/155 valmis

Kuvaputki (Codex) toimitti kaikki tilatut kuvat (era1b-täydennys, 2a, 2b, 2-05…2-12 — 107 uutta
id:tä + O6:n kuvapäivitys). Kaikki 155 tilattua linssiä ovat nyt kuvitettuja
`linssikatalogi.html`:n **`KUVATEKSTIT`**-taulukossa (nimetty uudelleen `ERA1_KUVATEKSTIT`:stä, koska
kattaa nyt kaikki erät — kaksi käyttökohtaa päivitetty). **`linssikatalogi-data.js` koskematon** —
sen geneerinen `kuvat:{havainne,cc}`-URL-kaava kaikille 165 linssille oli jo oikein; Fable
vahvisti tämän arkkitehtuurin nimenomaisesti (ei siirtoa data.js:ään).

5 linssiä ilman CC-aikalaiskuvaa dokumentoidulla syyllä (C7, R4, R20, R28, R32 — ei harhaanjohtavaa
sijaiskuvaa). **O6-kuvapäivitys**: kuvaputki toimitti paremman lähdekuvan (`O6-v2-*.jpg`) samalle
jo-olemassa-olevalle linssille; koska tiedostonimi poikkeaa geneerisestä kaavasta, sivun oma JS
patchaa `LINSSIT`-taulukon O6:n kuvapolut ajon aikana (linssikatalogi.html:n `LINSSIT`-määrittelyn
jälkeen) — data.js edelleen koskematta.

PR #3138 testattu (4304/0 fail x3), kaappaukset (kaikki 4 välilehteä, työpöytä+puhelin) mukana.
**Fablen mukaan tämä menee Julkaisijan sisältöjunaan** (ks. kohta 5), ei kiireellinen erillismerge.

### Tilaus postilaatikossa

`posti/linssikatalogi-tilaus-20260924.json` (`claude/postilaatikko`, commit `3576ee735`) päivitetty
137→155 riviin Fablen tarkasti vahvistamalla rajauksella (11 poistettu roolista, 18 uutta lisätty:
X1-X7/B8/B9/D7/F5/P6/E10/R36/Q1-Q4, Y1-Y10 tietoisesti pois — renkaan 1 leikki-/katselulinssit).
Tilaus on nyt kokonaan täytetty kuvaputken toimesta. Erittely id-tasolla:
`posti/sisaltokirjuri-linssikatalogi-tilaus-paivitys-20260925.md` haarassa
`sisaltokirjuri-linssikatalogi-tilaus-paivitys` (ei PR, vain viite).

### Levyllä olevat worktreet

- `/Users/Shared/Claude/wt/sisaltokirjuri-linssikatalogi-kuvatekstit-era2` — PR #3138:n lähde.
- `/Users/Shared/Claude/wt/sisaltokirjuri-linssikatalogi-tilaus-paivitys` — tilauksen erittely-viite,
  ei PR:ää, voi siivota kun #3138 on mergetty eikä erittelyä enää tarvita.

## 3. Vanhojen sisältö-PR:ien audit (Fable+Julkaisija pyysivät, 25.9. klo 08.0x)

Kuormaa: uptime nousi 665:een auditin aikana — vältin paikallisia täysiä testiajoja, luotin
GitHub Actions -CI:hin (eri runner, ei kärsi Macin kuormasta).

### Rebasettu ja pushattu, CI vihreä

- **#3069** EnnenNyt 35 kaupunkia, **#3068** Galleria Karthago, **#3066** Galleria Kap Horn/Norfolk,
  **#3045** Sisältöinventaario 71 kaupungin täydentävät kentät (11 committia — pudotin siitä 2
  redundanttia committia, add+revert-pari samalle Managua-sää-erälle joka oli jo mergetty #3047:ksi;
  loput 9 committia sisältävät todellista uutta analyysia, mm. kohdekartan 12 kaupungin lista).
- **#3042** Laatukierros 4 korjausta, **#3000** N3 17 maan kartuscha, **#2991** Julisteet Bergen/Sevilla
  (**HUOM: CI FAIL, ks. alla**), **#2987** N1-klusteri, **#2930** Ranska Camargue/Dune du Pilat,
  **#2927** 163 kaupungin pallopisteet.

**#2927 tarkistettu erikseen** (Fable epäili vanhentumista): koordinaatit läpäisevät
`tools/tarkista-laudan-pisteet.mjs`-vartijan (>15km-poikkeamat vain alueilla, kuten pitääkin), eikä
yksikään main-koordinaatti eronnut branchin arvosta. **Ei vanhentunut, turvallinen mergeen.**

**Versionosto-oppi tästä erästä:** rebasin ensin #3069:n ja #3068:n `tools/uusi-versio.mjs`:llä
peräkkäin SAMAA mainia vasten — molemmat saivat v2214 (todellinen numerotupla kahdessa
mergettömättömässä haarassa, koska työkalu laskee origin/mainista eikä tiedä toisista
mergeämättömistä haaroista). Korjasin palauttamalla molempien js/main.js+muutokset.js+sw.js:n
mainin senhetkiseen (ei-bumpattuun) tilaan — **versionosto jätetään sille joka oikeasti mergeää**,
ei tehdä etukäteen usealle rinnakkaiselle haaralle. Loput audit-PR:t eivät koskeneet
versiotiedostoja lainkaan tai eivät konfliktoineet, joten niissä ei ollut tätä riskiä.

### Korjattu (CI oli punainen, syy löydetty ja korjattu)

- **#2897** NC-korvaus viimeiset 3/9, **#2895** NC-korvaus 6/9: `tests/lisenssit.test.mjs` vaatii
  että korvattu NC/ND-viite POISTETAAN `tools/vienti/lisenssitarkistus-tunnetut.json`:sta (tiedoston
  oma kuvaus: "Korvaus: Sisältökirjuri" — tämä on minun ylläpitovastuuni). Poistin 3+6 viitettä,
  ajoin `tests/lisenssit.test.mjs` paikallisesti (kevyt, 4 testiä, ei kuormaongelma) — vihreä.
  Pushattu, **GitHub CI oli vielä pending luovutushetkellä** — tarkista `gh pr checks 2897` ja
  `gh pr checks 2895` ennen kuin ilmoitat Julkaisijalle valmiiksi.

### EI korjattu — oikea jäljellä oleva CI-punainen

- **#2991** Julisteet: Bergen ja Sevilla. `skeema 1.20`-testi vaatii jokaiselle julisteelle
  `kuva.leveys` (kuvan leveys pikseleinä), joka tulee vientityökalun kuvamitta-hausta. Bergenin ja
  Sevillan julistekuvat (`tuotanto/tuot-bergen.png`, `tuotanto/tuot-sevilla.png`) **eivät ole
  koskaan olleet olemassa minkään mittausjärjestelmän tiedossa** — toisin kuin esim. Istanbulin
  juliste, jolla on sama koodirakenne mutta mitattu leveys. Tarkistin suoraan `kokoaVienti()`:llä:
  molemmilta puuttuu `kuva.leveys` kokonaan, `varat: []` tyhjä. **Tämä ei ole tekstikorjaus** — vaatii
  oikean julistekuvan generoinnin/tuottamisen Bergenille ja Sevillalle ennen kuin PR voi mergetä.
  En yrittänyt generoida kuvia (ei minun työkaluni/vastuuni tässä sessiossa, eikä järkevää käynnistää
  kuvageneraatiota kuorman ollessa 665). **Jätin PR:n auki punaisena — kerro Fablelle/Julkaisijalle
  tämä blokkaus, älä yritä mergetä ennen kuvien tuottamista.**

### Suljettu vanhentuneena (perusteluineen)

- **#2981** Sisältöinventaario natiiviin: ydinhavainto ("195/266 kaupunkia, 71 puuttuu") on nyt
  266/266 — tarkistin suoraan tuoreesta `KULTTUURI_KATEGORIAT`ista. Täysin vanhentunut, suljettu
  kommentilla.
- **#2935** Täydennä 5 mediaviitteen lisenssit: `git rebase origin/main` pudotti PR:n ainoan
  committin viestillä "patch contents already upstream" — koko sisältö oli jo mainissa jotain
  toista reittiä. Suljettu kommentilla.

### Yhteenveto Julkaisijalle (kopioi tarvittaessa)

| PR | Tila |
|---|---|
| #3069, #3068, #3066, #3045, #3042, #3000, #2987, #2930, #2927 | Rebasettu, CI vihreä, valmis sisältöjunaan |
| #2897, #2895 | Rebasettu + korjattu (lisenssitarkistus-tunnetut.json), CI pending — tarkista ennen mergeä |
| #2991 | Rebasettu, mutta CI PUNAINEN — puuttuva julistekuva (Bergen+Sevilla), ei mergekelpoinen ennen kuvageneraatiota |
| #2981, #2935 | Suljettu vanhentuneena |

## 4. JUMI → FABLE (sitova 25.9. klo 04.4x, korvaa 24.9. illan JUMI → KORTTI)

Jumissa (päätös puuttuu, työ ei etene, luokitin estää) EI tehdä AskUserQuestion-korttia omistajalle
eikä odoteta häntä — lähetä Fablelle YKSI viesti (tilanne, vaihtoehdot, oma suositus) ja jatka muuta
työtä. Fable päättää tai vie omistajalle omassa sessiossaan. Työpöytäsovelluksen lupaikkunasta
(harness-lupaprompti) ilmoitetaan Fablelle heti. Ks. muisti `luokitin-esto-ei-pysayta-jonoa` (jos
sama muisti-projekti on käytössä) — sääntö on jo kirjattu Raamattuun.

## 5. Sisältöjuna

Fable mainitsi kaavan **"4 PR / 4 h"** (Julkaisijan sisältöjunan tahti) — en ehtinyt varmistaa tarkkaa
mekaniikkaa tässä vuorossa (mistä juna lähtee, mitä "4 PR" tarkoittaa täsmälleen). Kysy Fablelta tai
Julkaisijalta tarkennus jos suunnittelet erien ajoitusta sen mukaan.

## 6. Avoimet velat

1. #2991:n julistekuvat (Bergen, Sevilla) tuottamatta — kerro Fablelle/Julkaisijalle, älä yritä korjata itse.
2. #2897/#2895:n CI-tila vahvistamatta (pending luovutushetkellä).
3. `sisaltokirjuri-linssikatalogi-tilaus-paivitys`-worktree siivoamatta (ei kiire, ei PR).
4. "4 PR / 4 h" -sisältöjunan mekaniikka epäselvä — kysy tarkennus.
5. Muut vanhat, konfliktittomat sisältö-PR:t (esim. #3106 Kuvatilausluonnos, monta muuta listassa
   `gh pr list --author "@me"`) — ei auditoitu tässä vuorossa, Fable pyysi vain nimetyn 14 PR:n listan.

## 7. Ympäristö

- Työkansio `/Users/Shared/Claude/Matkakirja-sisaltokirjuri`, node_modules ei symlinkkiä pääkassassa
  (se ON pääkassa). Worktree-erissä symlinkki pääkassan node_modulesiin, EI npm ci.
- `tools/uusi-worktree.sh <rooli> <aihe> [pohja]` haaraa varten; `--poista <nimi>` siivoukseen
  (poista ensin node_modules-symlinkki jos worktree on "not empty" -virheessä).
- Kuorma vaihteli rajusti tämän vuoron aikana (100 → 665 → 280) — tarkista `uptime` ennen paikallista
  `node --test tests/*.test.mjs`-ajoa; yksittäiset kevyet testitiedostot (esim.
  `tests/lisenssit.test.mjs`, `tests/sisaltopaketti.test.mjs`) ovat turvallisia ajaa kuormasta
  riippumatta.
- SendMessage/mcp-viestiraja ~10/vuoro, varakanava `mcp__ccd_session_mgmt__send_message`.
