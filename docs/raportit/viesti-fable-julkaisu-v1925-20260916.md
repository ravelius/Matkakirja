# Julkaisu v1925 — Opus-agentin raportti 16.9.2026

Haara `claude/bold-ride-vow4ki-julkaisu-v1925`, main oli ja on yhä
`b298af86` (v1924), joten versionumero v1925 pysyi. Muutoslokirivi:
*"Topografialinssi ilman tökkimistä, Pariisin nostot näkyviin"*.

## 1. Mitä haarassa on

| haara | commit | sisältö |
|---|---|---|
| claude/bold-ride-vow4ki-topo-tokkii | de06a3c9 | topografialinssin odotuspeite, ImageBitmap-purku, jäänteet pois |
| claude/bold-ride-vow4ki-pariisi-lahizoom | 27b97172 | nostojen nimiökatto 16 px, rykelmän ryhmitys, luentakuvapakka pois kartalta (kytkin) |
| claude/bold-ride-vow4ki (Fable) | 0d53be38 | Raamattu: PAATOKSET 27 tarkennus 2 ym., luovutusraportti |

Fablen haara mergettiin UUDELLEEN tämän session alussa (Fable oli lisännyt
Raamattuun kohtia edellisen mergen jälkeen). Merge meni puhtaana — ei
konflikteja, ei Raamatun käsin muokkausta, ei js/main.js -konfliktia.

## 2. Testit: 3499 pass / 18 fail → 3517 pass / 0 fail

**Kaikkien 18 punaisen nimet** (nimet eivät olleet tallessa; poimittu
lokista `^not ok`):

- `tests/luentakuva.test.mjs` (3): *kartan veto pienentää kuvan eikä poista
  sitä*; *kaupungista lähtö poistaa kuvan myös pienennettynä*; *pienennys
  siirtää ankkurin kaupungin yläpuolelle, kartan kohtaan*.
- `tests/pulucam.test.mjs` (15): *luentakuva yksin ei nosta pakkaa*; *viisi
  kuvaa pulpahtaa yksitellen*; *ilman omistajan valitsemaa tarraa pulun kuvat
  näkyvät puhtaina*; *päällimmäisen kortin napautus avaa karusellin JUURI
  SIITÄ kuvasta*; *alemman kortin napautus nostaa sen päälle*; *isoisän kuva
  on pakassa yksi kortti*; *pulun kortin lyhyt kuvateksti on kiinni kortin
  omassa alalaidassa*; *lyhyt kuvateksti kertoo päällimmäisestä kuvasta*;
  *albumin lyhyessä kuvatekstissä EI ole havainnekuvalinkkiä*; *pakka asuu
  luentakuvan paneelissa*; *raahaus siirtää koko pakkaa eikä sen päätteeksi
  avaudu karuselli*; *kartan liike pienentää luentakuvan ja pakan yhdessä*;
  *kaupungista lähtö poistaa pakan ja sen pulpahdusajastimet*; *uusi pakka
  korvaa vanhan*; *ilman luentakuvaa pakka nousee samaan paikkaan ilman
  pohjakuvaa*.

### Juurisyy

Ei mergen vuorovaikutus vaan **pariisi-lahizoom-haaran oma aukko**. Sen
commit 27b97172 lisäsi js/fokusvirta.js:ään kytkimen
`LUENTAKUVAPAKKA_KARTALLA = false` (omistaja 16.9.2026 klo 16.05 UTC,
Raamattu KARTTAUUDISTUKSEN PAATOKSET 31 kohta 1: *"Piilotetaan nuo kuvat
kartalta toistaiseksi. Täytyy miettiä niille joku parempi paikka."*).
Kytkin tekee kaksi asiaa: `nostaPieniPakka` ei nosta pakkaa, ja
`pienennaLuentakuva` PIILOTTAA paneelin sen sijaan että kutistaisi sen.
Haara käänsi vartiot kytkimen mukaan vain tiedostossa
`tests/luentakuvasarja.test.mjs` — kaksi muuta tiedostoa jäi mittaamaan
kumottua käytöstä.

### Vastakokeet (kolme)

1. **origin/main**: erillisessä worktreessä `node --test
   tests/luentakuva.test.mjs tests/pulucam.test.mjs` → **50/50 vihreä**.
   Kyse ei siis ole esiolevasta viasta eikä aikarajasta.
2. **pelkkä pariisi-lahizoom** (27b97172, ilman topo-tokkia ja ilman
   Raamattua): **32 pass / 18 fail** — täsmälleen sama 18. Merge ei siis
   aiheuttanut mitään; vika on haaran oma.
3. **kytkin takaisin päälle** (`LUENTAKUVAPAKKA_KARTALLA = true`
   väliaikaisesti): korjatut tiedostot **50/50 vihreä**. Vartiot eivät siis
   tyhjentyneet vaan mittaavat yhä molempia maailmoja. Kytkin palautettiin
   heti arvoon `false` (js/fokusvirta.js ei ole diffissä).

### Korjaus (commit 192ce736)

Yhtään vartiota ei poistettu, ohitettu eikä karanteenattu. Sama kuvio kuin
luentakuvasarjassa: apuri kääntää väitteen kytkimen mukaan, ja kytkimen
ollessa pois väite on se, minkä omistaja tilasi.

- `tests/luentakuva.test.mjs`: apuri `vaadiPienennysPiilottaa` — pienennys
  vie kuvan kartalta kokonaan, ankkuri irtoaa, toinen pienennys ei tee mitään.
- `tests/pulucam.test.mjs`: apuri `vaadiPakkaKumottu` — `naytaPulunKuvapakka`
  palauttaa false, kuorta ei rakenneta, kortteja ei ole, pakka ei jää muistiin.

## 3. Tarkistustyökalut

| työkalu | tulos |
|---|---|
| `tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |
| `tools/tarkista-niputus.mjs` | 392 moduulia, 4365 julistusta, ei törmäyksiä |
| `tools/tarkista-savukkeet.mjs` | 1871 ui-viittausta, 408 metodia, 538 kenttää |

## 4. Savukkeet

| savuke | tulos |
|---|---|
| savuke-topografialinssi | **38/38** (ks. alla) |
| savuke-pariisi-lahizoom | **24/24** |
| savuke-nimikyltti | **61/68** — punaisina VAIN tunnetut vartiot 4, 7a, 7b, 9b |
| savuke-astro-valokuva | **140/140** |
| savuke-astro-aani | **24/24** |
| savuke-astro-pallo | **AJAMATTA** — portti 8754 oli toisen session ajossa (EADDRINUSE) kolmella yrityksellä |

### Savuke-topografialinssi: ainoa aito merge-vuorovaikutus

Ensimmäisellä ajolla 36/38. Toinen FAIL (*sulkeminen palauttaa pelin
kerrokset*, `pisteSkaala: null`) **ei toistunut** uusintaajossa → häilyvä
ajoitusvartio, ei regressio; kirjataan tähän eikä korjata.

Pysyvä FAIL oli esiehto *"omistajan tila toistui (luenta, saapumiskuva,
pluskupla, kuvapakka)"*: se vaatii kuvapakan ruudulle ENNEN linssin avausta,
jotta mitataan juuri se tila, jossa omistaja vian näki. Pakkaa ei enää ole —
siis topo-tokkiin savuke vs. pariisin kytkin. Esiehto lukee nyt kytkimen
lähteestä ja vaatii pakkaa tai sen puuttumista sen mukaan; luenta,
saapumiskuva ja pluskupla ovat yhä pakollisia, ja mittaukset (kirkkaus,
paljas kartta, jäänteet) ajetaan kytkimestä riippumatta. → 38/38.

## 5. Avoimeksi jäi

- **savuke-astro-pallo ajamatta** (portti varattu). Se kuuluu haaralle
  `pallo-musta`, joka ei ole tässä julkaisussa — mutta ajettava v1926:ssa.
- **savuke-nimikyltti 4, 7a, 7b, 9b** yhä punaisia (tunnettu, mainin oma).
- **`tests/luentakuvasarja.test.mjs` ei ole kaksisuuntainen**: kun kytkin
  käännettiin kokeeksi arvoon `true`, siinä jäi punaiseksi 5 vartiota
  (*kartan liike vie sarjan loppuun heti pieneen pakkaan*, *päällysikkunan
  napautus ei pura sarjaa*, *kaupungin vaihto siivoaa sarjan ajastimet*,
  *pulun kuvat tulevat isoina VAIKKA isoisän sarja on jo ehtinyt päättyä*,
  *pakka ei nouse kartalle ennen pulun kommenttia*) — syynä paneelien
  jääminen yhteiseen koeasiakirjaan. Nykytilassa (kytkin pois) tiedosto on
  vihreä. **Kun omistaja antaa kuville paremman paikan ja kytkin käännetään
  takaisin, tuo tiedosto on korjattava** — tämän julkaisun kaksi tiedostoa
  kääntyvät kumpaankin suuntaan sellaisenaan.
- Turisti-info-kyltti kasvaa lähizoomissa rajatta (Pariisi-raportin osio 6).
- Poltetun musteen nimiöt eivät tunne 16 px:n kattoa (vaatii uudelleenpolton).
