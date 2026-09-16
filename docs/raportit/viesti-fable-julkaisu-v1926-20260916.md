# Julkaisu v1926 — Opus-agentin raportti 16.9.2026

Haara `claude/bold-ride-vow4ki-julkaisu-v1926`, pohja `origin/main`
= v1925 (`9c698726`). Main ei liikkunut työn aikana, joten numero
v1926 pysyi. Muutoslokirivi: *"Astronautin kamera WebAppissa,
Ihmisen matka rauhallisemmin"* (59 merkkiä). PR **#2548**.

## 1. Mitä haarassa on

| haara | commit | sisältö |
|---|---|---|
| claude/bold-ride-vow4ki-astro-webkit | d904856c | pallokirjaston aikakatko + välimuistin ohittava uusinta, avauksen vaihevartijat, `avauksenPuute`-vartija, `js/linssivirhe.js`, `js/pallodiag.js`, sw.js SHELL; sisältää pallo-musta-haaran (a416ff0f + fc6084e2) |
| claude/bold-ride-vow4ki-ihmisen-matka-kappaleet | ffb394ae | ZOOMIN_JATKO_MS 2500 → 5000, Marokon ajo zoomin jälkeen, koko Afrikka avauksessa, lyhyet kappaleet, pulu pois esityksen ajaksi |
| claude/bold-ride-vow4ki-astro-chatti | 88e6d7f1 | minipulun normaali chatti, selite kelattuna + vinkkiavaus, vihreä otsikkorivi, hover-tausta pois |
| claude/bold-ride-vow4ki (Fable) | 86b269bf | Raamattu (LISÄYS 10–11) + raportit |

## 2. Konfliktit

**Yhtään tekstikonfliktia ei syntynyt** — kaikki neljä mergeä menivät
puhtaina. Raamattuun ei koskettu; `js/main.js`:ään tuli vain
`APP_VERSION`-rivi versiotyökalulta.

Ainoa kohta, jossa kaksi haaraa muokkasivat samaa tiedostoa, oli
`js/linssit/satelliitti.js` ja `tests/satelliitti.test.mjs`
(astro-webkit + astro-chatti). Auto-merge onnistui, mutta se ei ole
todiste, joten **semanttinen tulos mitattiin**:

- webkitin vaihevartijat ovat tallella `avaa()`-ketjussa:
  `vaihe('avaruus')`, `vaihe('pulu')`, `vaihe('aanet')`,
  `vaihe('linssiaani')`, `vaihe('pisteet')` sekä `avauksenPuute`-vartija
  kahdella tarkistuksella ja jälkitarkistuksella;
- chatin toiminnot ovat tallella: `polloUlkoinenKysymys`-tuonti,
  ehdotuspillerit, vinkkiavaus (`matkakirja-astro-vinkki-<kohde>`),
  kelattu lähtötila, vihreä otsikkorivi;
- `node --check` puhdas; `tests/satelliitti.test.mjs`,
  `tests/satelliitti-avaruus.test.mjs`, `tests/pallo.test.mjs` ja
  `tests/pollo.test.mjs` heti mergen jälkeen **272/272 läpi**.

### Aito korjaus: build-standalone kaatui mergen jälkeen

`node tools/build-standalone.mjs` heitti: *"js/ui.js tarvitsee
moduulin js/linssivirhe.js, joka puuttuu MODULES-listalta"*.

**Juurisyy ei ole mergen vuorovaikutus vaan astro-webkit-haaran oma
aukko.** Haara lisäsi `js/linssivirhe.js`:n ja `js/pallodiag.js`:n ja
tuo ensimmäisen `js/ui.js`:ään STAATTISESTI, mutta kumpaakaan ei
lisätty niputuksen MODULES-listalle — haaran raportti ei ajanut
buildia lainkaan. `js/pallo.js` ei ole niputuksessa (ladataan
dynaamisesti), joten vika näkyi vasta `js/ui.js`:n kautta.

Korjaus (commit b08bf5ec): molemmat lisättiin juuri ennen
`js/ui.js`:ää, `js/pallodiag.js` ensin koska `js/linssivirhe.js` tuo
sen. **Vastakoe**: build menee läpi (32 479 kt),
`tools/tarkista-niputus.mjs` 392 → 394 moduulia ilman törmäyksiä, ja
yhden tiedoston versiosta löytyvät sekä `naytaLinssivirhe` että
`pallodiagPaalla`. Koko `npm test` ajettiin korjauksen jälkeen
uudelleen samalla tuloksella.

## 3. Testit: 3540 pass / 0 fail / 13 skip

`NODE_USE_ENV_PROXY=1 npm test` → `# tests 3553`, `# pass 3540`,
`# fail 0`, `# skipped 13`. Ohitukset ovat ympäristön omia ja
ennallaan (geo-kirjastot puuttuvat 7, manifestia ei ole koneella 1,
ei rantaviiva-aineistoa 5). Yhtään testiä ei ohitettu, poistettu eikä
karanteenattu.

| työkalu | tulos |
|---|---|
| `tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |
| `tools/tarkista-niputus.mjs` | 394 moduulia, 4382 julistusta, ei törmäyksiä |
| `tools/tarkista-savukkeet.mjs` | 1893 ui-viittausta, 409 metodia, 539 kenttää, 31 lehtitilan kenttää |

## 4. Savukkeet

| savuke | näkymä | tulos |
|---|---|---|
| savuke-astro-pallo | puhelin 390×844 | **37/37** |
| savuke-astro-pallo | työpöytä 1400×900 | **41/41** (kahdesti) |
| savuke-astro-pallo | `NAKYMAT=vartija` | **4/4** |
| savuke-astro-valokuva | puhelin + työpöytä | **90/90** |
| savuke-astro-aani | — | **24/24** |
| savuke-satelliittilinssi | työpöytä | **34/34** (1. ajo 33/34) |
| savuke-ihmisen-kappaleet | 390 + 1400 | **34/34** (1. ajo 32/34) |
| savuke-ihmisen-kehys | 390 + 1400 | **20/21** |
| savuke-ihmisen-esitys | VAIN_AVAUS=1 | **13/13** |
| savuke-topografialinssi | — | **38/38** |
| savuke-pariisi-lahizoom | — | **24/24** |
| savuke-nimikyltti | puhelin + työpöytä | **61/68** |

Edellisen julkaisun avoin kohta **savuke-astro-pallo ajettiin nyt**
(portti oli v1925:ssä varattu): puhelin, työpöytä ja vartija kaikki
vihreitä.

### Häilyvät (menivät läpi uusinnassa — kirjattu, ei korjattu)

- `savuke-satelliittilinssi`: *"pallon takapuolen merkki ei ota
  napautusta"* (`ikkunoita: 1`). Tunnettu: pallo pyörii mittauksen ja
  napautuksen välissä. Uusinta 34/34.
- `savuke-ihmisen-kappaleet`: *"saapuminen siirtyy tasan
  ZOOMIN_JATKO_MS"* (mitattu ajo 16 723 ms vs. mallin 19 736 ms,
  toleranssi 2 000 ms) ja *"1400px: avauksen loppuasennossa koko
  Afrikka on ruudulla"* (`avausLoppu: null`). Molemmat näytteenoton
  jitteriä kuormitetussa kontissa. Uusinta 34/34.

### Punaiseksi jäi

**`savuke-ihmisen-kehys.mjs`**, väite *"1400px: kehys ja kartta
nousevat SAMASSA feidauksessa (piste pisteeltä)"* —
`{"naytteita":1,"eroja":0,"parit":["1.00/1.00"]}`. Väite vaatii
vähintään kaksi näytettä feidauksen ajalta; kontissa osui yksi.

**Juurisyy mitattu neljällä ajolla:**

1. tämä haara, `KOOT=1400` yksin → **11/11 vihreä**;
2. tämä haara, 390 + 1400 samassa prosessissa → **punainen**;
3. pelkkä `ihmisen-matka-kappaleet` (ffb394ae, erillinen worktree),
   `KOOT=1400` yksin → **11/11 vihreä**;
4. pelkkä `ihmisen-matka-kappaleet`, 390 + 1400 samassa prosessissa →
   **sama punainen samalla mitatulla arvolla** (`naytteita: 1`).

Kyse ei siis ole mergen vuorovaikutuksesta eikä regressiosta vaan
savukkeen omasta näytteenottoherkkyydestä, kun kaksi ruutukokoa
ajetaan samassa prosessissa. Haaran oma raportti ajoi vain
390 × 844:n, joten tätä ei oltu ennen mitattu. Mitatut arvot
kertovat, että käyrät kulkevat päällekkäin (`eroja: 0`, pari
1.00/1.00) — vain näytteitä on liian vähän. **Kynnystä ei löysätty
eikä väitettä poistettu**; korjaus kuuluu omaan työhönsä (näytteenoton
tihentäminen tai selaimen uusiminen ruutukokojen välillä).

**Tunnetut punaiset** `savuke-nimikyltti` 4, 7a, 7b, 9b ovat yhä
punaisia — täsmälleen sama nelikko kuin v1925:ssä, mainin omia.

## 5. Avoimeksi jäi

- `savuke-ihmisen-kehys` 1400 px kahden ruudun ajossa (yllä).
- `savuke-nimikyltti` 4, 7a, 7b, 9b (tunnettu, mainin oma).
- `savuke-ihmisen-esitys` ajettiin vain avausosalla (`VAIN_AVAUS=1`);
  koko kaari kestää kontissa 10–20 min.
- Kaksi pyörimisestä johtuvaa häilyvää vartiota (satelliittilinssi,
  astro-pallo varjo) odottavat yhä omaa korjaustaan: pyöriminen on
  pysäytettävä mittauksen ajaksi, ei kynnysten löysäämistä.
- Codexin WebApp-uusintatesti (astro-webkit-raportin luku 6) on yhä
  tekemättä: vasta se naulaa, oliko kirjaston aikakatko oikea juurisyy.
