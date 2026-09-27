# Pelikoodarin luovutus 27.9.2026 klo 11.3x (-c, konteksti ~68 %)

Jatkoa luovutukselle `viesti-pelikoodari-luovutus-20260927-b.md`. Fablen jono 1–5 ja lisätehtävät on tehty tai
annettu agenteille. Tarkista PR:ien tila: `gh pr list --author @me`.

## 1. MAINISSA / JUNASSA (web)

| PR | Versio | Sisältö | Tila |
|---|---|---|---|
| #3384 | v2309 | progressiivinen lukijaääni | mainissa |
| #3385 | v2310 | mannerlennot ennallaan, löytösumu pois, maakuntasalaisuudet heti | mainissa |
| #3386 | v2311 | Pulun puhe ilman pelin äänikytkimiä | mainissa |
| #3389 | v2312 | puheraja 400 000 / IP / vrk, 6 000 000 / kk; 429/5xx pysäyttää viestillä | mainissa, worker julkaistu 10.47 |
| #3388 | v2313 | nostokortin luennan säätimet (ks. alla) | junassa |
| #3394 | v2313 | talouden vaihe 1 (ks. alla) | Fable kuittasi, junassa #3392:n jälkeen |
| #3396 | docs | talous-suunnitelmaan pelistreak (5b), avoin kysymys 11 | auki |

- **#3388** (omistaja hyväksyi): ratas (nopeus + ääni pelinimellä Aino … Väinö, `AANTEN_PELINIMET`), VU kaiuttimen
  omissa kaarissa (`luoKaiutinmittari`, `puheMittari`→`vuAnalysaattori`), keskeytys ja jatko samasta palasta.
  Niputus on korjattu (a88c41b27), ja worker ottaa äänen ilman kehittäjäkoodia.
- **#3394** — päiväkulu 12 / 20 / 32 £:
  - Hintataso: `js/packs/hintatasot.js`, karkea taulu, jonka Sisältökirjuri tarkentaa.
  - Aloitusraha 400 £, rosvo vie 50 %, pankin apu pois.
  - Rahat loppu → 2 vrk:n varoitus → loppukortti → jatko turvatallennuksesta (`matkakirja-save-turva-v1`).
    Moninpelissä rahaton putoaa pelistä.
  - Uusi kulkutapa **Odota** (`wait`), kun mihinkään ei pääse (saari ilman laivarahaa). Ilman sitä aika ei kulunut.
  - Kultaiset ajurit pysähtyvät, kun `phase === 'over'`.
- Päätökset: `docs/raportit/talous-suunnitelma-20260927.md` (omistaja 10.3x). Aarreruksi, Pulu ±10 ja kultainen
  omena määritellään pelikatalogissa, joten niitä **ei toteuteta vielä**.

## 2. NATIIVI (proto)

| Haara | Commit | Sisältö | Tila |
|---|---|---|---|
| `pelikoodari/maailma-auki` | 7041fd0e | maakunnat heränneinä heti, salaisuudet heti; `MaakuntaHeraa`/`Valmis` eivät laukea | Natiivi-UI teki osansa (0ca9c11e / 18543b3c), Linssiseppä tekee `linssiseppa/maakunta-taytto` |
| `pelikoodari/pulu-ilman-kytkimia` | bae36144 | `Puhe.PulunPuhe` | merge-pyyntö Natiivisepällä |
| `pelikoodari/puhevirta` | b6fc76d7 | progressiivinen soitto: `SoitaVirtana`, `puhe virta [pois\|paalle]`, `ViimeEkaAaniMs` | mittaamatta |
| `pelikoodari/talous-vaihe1` | — | talouden natiiviportti | kesken, ks. kohta 3 |

- **Siivous maakuntahaarojen jälkeen:** kun Linssisepän ja Natiivi-UI:n haarat ovat masterissa, poista
  tapahtumat `MaakuntaHeraa`/`MaakuntaValmis` ja pyydä Natiivisepää poistamaan `MaaKartta.Heraannyt`/`Herata`.
- **Mittaus `pelikoodari/puhevirta`:** #3389 on nyt julkaistu. Julkaisija sanoo "nyt", kun ajuri on tyhjä, ja
  mittaus tehdään silloin (`proto-kaanna.sh` + A2FD9C9F, ennen ja jälkeen `puhe virta pois/paalle`).
- **Päällekkäisyys `pelikoodari/puhevirta`:n kanssa:** Natiivi-UI:n `natiivi-ui/luennan-saatimet` (e035ef75)
  lisää `Puhe.cs`:ään `Tauko`/`Jatka`/`Tauolla`/`SoivaTaso`. Kun se on junassa, mergeä se `puhevirta`-haaraan
  ja lisää `|| tauolla` kumpaankin loppusilmukkaan (`LataaJaSoitaTiedosto` ja `SoitaVirtana`).

## 3. AGENTEILLA KESKEN (tulokset tulivat tähän sessioon; jos sessio nollattiin, tarkista haarat)

| Työ | Worktree / haara | Pyydetyt tuotokset |
|---|---|---|
| Talouden natiiviportti | `/Users/Shared/Claude/wt/proto-pelikoodari-talous`, `pelikoodari/talous-vaihe1` | `Vakiot`, `Matka.AloitaVuoro`/`PaataVuoro`, `Pelitila`-kentät (Rasti, Rahaton, Pudonnut, MatkaPaattyi), Odota, hintataulu, kultaiset uudelleen, `kaanna.sh` + `unity-tarkistus`, UI-speksi Natiivi-UI:lle |
| Astro-pallo VASTAKOE + syvazoomi | `/Users/Shared/Claude/wt/pelikoodari-astro-vastakoe`, `pelikoodari-astro-vastakoe` | `savuke-astro-pallo` kaatuu (4 tarkistusta; ajo 36301155669; pisteitä 189 eikä 64); `mittaa-syvazoomi.mjs`:n Playwright-polku samaan kaavaan kuin astro-pallo:168 |
| Pelikatalogi | `/Users/Shared/Claude/wt/pelikoodari-pelikatalogi`, `pelikoodari-pelikatalogi` | `pelikatalogi.html` + `-data.js` + generaattori ja testi, `pages.yml` cp, linkki työhuoneeseen linssikatalogin viereen; kuvat `proto-3d/lokit/pelikatalogi-*.png` |

Agentit committaavat paikallisesti eivätkä pushaa. Tarkista kunkin raportti, pushaa ja avaa PR. Natiivin
talousportti lähetetään Natiivisepälle merge-pyynnöksi ja UI-speksi Natiivi-UI:lle (1.0.29).

## 4. JONO FABLELTA (seuraavaksi)

1. **Natiivin talousportti:** valmistele merge ja lähetä UI-speksi Natiivi-UI:lle.
2. **Avauskortin web-kevennys** (omistaja 11.2x, v2296:n palaute): kutsuminiatyyri lähemmäs kaupungin merkkiä,
   ja lehden osiohakemiston linkeistä kevyemmät (pienempi kuva tai ei kuvaa, ohut rivi: otsikko + 1–2 alarivin
   nimeä, ei raskaita laatikoita). Sovi ulkoasu Natiivi-UI:n kanssa (natiivin kevyt versio saa tulla ensin).
   Kuvapari Fablelle.
3. **Pelistreak** toteutetaan, kun omistaja on vastannut kysymykseen 11 (#3396).
4. Natiivimittaus (kohta 2).

## 5. OPIT

- **Pankin avun poisto** vaatii tavan kuluttaa aikaa (Odota), muuten saarelle jäänyt peli jumittuu. Bottitesti
  `oceania: bottien peli päättyy voittoon` paljasti tämän.
- **Paikallinen puhetesti ilman rajan kulumista:** mockaa worker (`page.route` tai fetch-kääre) ja soita 24 kHz:n
  mp3:a (`ffmpeg -ar 24000 -ac 1`). Kuvapari tehtiin näin Playwrightilla (`scratchpad saatimet/kuvat.mjs`).
- **Niputus** (`tools/tarkista-niputus.mjs`) ei ole `node --test`-ajossa. Aja se itse ennen "junaan"-viestiä:
  top-level-nimien törmäykset ja MODULES-järjestys.
- **Z10 tuotannossa** (WebKit iPhone): lepokerros z9, 71 laattaa zoomissa, 60 s levossa ei laattoja → ei silmukkaa.
