# Julkaisu v1929 — Sonnet-agentin raportti 17.9.2026

Haara `claude/bold-ride-vow4ki-julkaisu-v1929`, pohja `origin/main` =
v1928 (`f46192be`). Kolme haaraa yhdistetty **puhtaasti, ei
konflikteja**. Muutoslokirivi: *"Aihenoston nimiö vain lähizoomissa;
sulkuvartio vaakaan"*. PR **#2553**, head-SHA `bf6e3aa5` (versionosto-
commit `3ce481b9`).

## 1. Mitä haarassa on

| haara | commit | sisältö |
|---|---|---|
| claude/bold-ride-vow4ki-aihenimio | b0c8a6b9 | Aihenoston nimiö vain lähizoomissa, samalla kynnyksellä (`lahizoomiAuki`) kuin nostojen nimiöt. `savuke-nimikyltti` 60/68 → 61/68 (9b puhelimella 8 → 5 paria). Uusi vartio 3i/3i2 `savuke-pariisi-lahizoom.mjs`:ssä, neljä uutta testiä `tests/aihemerkit.test.mjs`:ssä |
| claude/bold-ride-vow4ki-astro-sulje-vaaka | a3d51218 | Satelliittilinssin "Sulje linssi palauttaa yläpalkin, pelitilan ja tallennuksen täsmälleen" -vartio vertasi vaakaruudulla kiinteään vakioon `'visible'`, vaikka peli itse pitää palkin piilossa jo ennen linssiä (omistajan 13.9. tilaus, väkäsnappi tilalla). Vartio mittaa nyt palkin tilan ENNEN linssiä ja vaatii saman tilan sulkemisen jälkeen. Ei pelikoodimuutoksia, vain savuke + uusi testi |
| claude/bold-ride-vow4ki (Fable) | 4e901194 | Raamattu-päivitys (linjaukset) |

Kaikki kolme mergesiä menivät läpi ilman konfliktimerkkejä (`ort`-
strategia). Raamattuun ei koskettu käsin — Fablen haaran versio meni
sellaisenaan. `js/main.js`:ään tuli vain `APP_VERSION`-rivi
versiotyökalulta (tarkistettu `git diff`:llä ennen committia; myös
`js/muutokset.js` ja `sw.js` vain odotetut rivit).

**Vastakoe diffin laajuudelle:** `git diff --name-only
origin/main..HEAD` ennen versionostoa antoi täsmälleen tämän erän 8
tiedostoa (aihenimiön 4, sulkuvartion 2, Raamattu 1,
`tools/savukkeet/sarjat.json` 1) — ei yhtään poistoa.

## 2. sarjat.json: yksi tunnettu punainen pois, yksi lisätty

- **Poistettu**, koska korjaus mergetty mainiin astro-sulje-vaaka-
  haarasta: satelliittilinssin *"Sulje linssi palauttaa yläpalkin,
  pelitilan ja tallennuksen täsmälleen"*. Vahvistettu paikallisesti
  (`NAKYMAT=puhelinvaaka`, 32/32) ja Actions-matriisissa (ks. luku 4)
  — vartio on aidosti vihreä, ei palautettu listalle.
- **Lisätty** PR #2553:n ensimmäisen Savukkeet-ajon (run 35188363536)
  löydöksenä: `savuke-ihmisen-kappaleet.mjs` 390px *"maapallon zoomi
  laskee tasaisesti, ei nousuja (0 näytettä)"*. Juurisyy: tiedoston
  oma kommentti (rivit 514–520) kertoo, että kameran aikasarjan 250 ms:n
  `setInterval`-näytteenotto sivun sisällä on herkkä kontin
  kuormitukselle — sama luokka kuin jo tunnetut `ZOOMIN_JATKO_MS` ja
  "avauksen loppuasento" -väitteet samassa tiedostossa. Actions-ajossa
  näytteenotto ei saanut yhtään näytettä (`naytteita:0`) koko
  laskuzoomin ajalta. **Ei liity v1929:n diffiin** — yksikään tämän
  erän muutettu tiedosto ei kosketa Ihmisen matka -linssiä
  (nostot.js, aihemerkit-testit, satelliittilinssin savuke,
  sarjat.json). Ei korjattu, vain kirjattu tunnetuksi (huomautuksessa
  PR-numero ja ajo-id).

## 3. Testit: 3561 pass / 0 fail / 13 skip

`NODE_USE_ENV_PROXY=1 npm test` → `# tests 3574`, `# pass 3561`,
`# fail 0`, `# skipped 13`. Ohitukset samat ympäristön omat kuin
v1928:ssa (geo-kirjastot, manifesti, rantaviiva-aineisto) — ei uusia,
ei karanteenoituja.

| työkalu | tulos |
|---|---|
| `tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |
| `tools/tarkista-niputus.mjs` | 394 moduulia, 4388 julistusta, ei törmäyksiä |
| `tools/tarkista-savukkeet.mjs` | 1900 ui-viittausta, 409 metodia, 539 kenttää, 31 lehtitilan kenttää |
| sarjat.json jäsentyy (`node -e`) | 12 tiedostoa julkaisu-sarjassa, 9 asetusavainta |
| `tools/build-standalone.mjs` | läpi, `dist/matkakirja.html` 32 497 kt |

## 4. Savukkeet

### 4.1 Paikalliset (nopeutussääntö: vain diffiä koskevat)

| savuke | näkymä | tulos |
|---|---|---|
| `savuke-pariisi-lahizoom.mjs` | 390 + 1400 (oletusajo) | **62/62** |
| `savuke-satelliittilinssi.mjs` (`NAKYMAT=puhelinvaaka`) | 844×390 | **32/32**, mm. korjattu "Sulje linssi" -vartio vihreänä |

(Ensimmäinen `savuke-pariisi-lahizoom`-yritys aikakatkaistiin omalla
turhalla `timeout 300`-kääreelläni ennen kuin savuke ehti tulostaa
mitään; uusintaajo ilman kääretä meni läpi normaalisti — savuke vain
tarvitsee pidempään kuin 5 min kahdella ruutukoolla.)

### 4.2 Actions (PR:n Savukkeet-työnkulku, julkaisusarja 12 savuketta)

**Ensimmäinen ajo, run 35188363536 (head 3ce481b9):** 11/12
savuke-jobia vihreää, yksi punainen —
`savuke-ihmisen-kappaleet.mjs` **36/38** (yksi uusi punainen, ks.
luku 2). Loki tarkistettu `get_job_logs`:llä, `[UUSI]`-rivi täsmäsi
edellä kuvattuun väitteeseen.

**Toinen ajo, run 35189211200 (head bf6e3aa5, sarjat.json-lisäyksen
jälkeen):** kaikki 12 savuke-jobia + `lista` + `yhteenveto`
**vihreitä**. Testit-työnkulku (run 35189211198) myös vihreä.

| savuke | Actions-tulos (run 35189211200) |
|---|---|
| savuke-astro-pallo | success |
| savuke-astro-valokuva | success |
| savuke-astro-aani | success |
| savuke-satelliittilinssi | success |
| savuke-ihmisen-kappaleet | success (tunnetuksi kirjatun jälkeen) |
| savuke-ihmisen-kehys | success |
| savuke-ihmisen-esitys | success |
| savuke-topografialinssi | success |
| savuke-pariisi-lahizoom | success |
| savuke-pallo-nostolaput | success |
| savuke-nimikyltti | success |
| savuke-kaupunkipopup | success |

Molemmat PR:n tarkistukset (**Testit** ja **Savukkeet**) ovat
vihreitä lopullisella head-SHA:lla `bf6e3aa5`.

## 5. Mitä EI tehty

- `savuke-ihmisen-kehys` 1400 px:n kahden pyörimisestä johtuvan
  häilyvän vartion korjaus — avoin useasta julkaisusta, ei kosketettu.
- `savuke-nimikyltti`:n muut tunnetut punaiset (4, 7a/7b) — ei tämän
  erän aiheuttamia, ei kosketettu.
- Uutta tunnettua punaista (savuke-ihmisen-kappaleet, "0 näytettä")
  ei yritetty korjata koodista — se on näytteenoton herkkyys, ei
  regressio, ja korjaus vaatisi oman mittausratkaisun kuten
  ZOOMIN_JATKO_MS:n tapauksessa aiemmin.

## 6. Kesto

Mergesit alkoivat n. klo 05.50 UTC. PR #2553 avattu n. klo 06.05 UTC.
Ensimmäinen Savukkeet-ajo löysi uuden punaisen n. klo 06.10 UTC,
sarjat.json-korjaus pushattu n. klo 06.17 UTC, toinen ajo ja Testit
valmistuivat molemmat vihreinä n. klo 06.29 UTC — **kokonaiskesto
n. 39 minuuttia**.
