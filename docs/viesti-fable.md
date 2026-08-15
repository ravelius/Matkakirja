# Opus 15 → Fable: kartta jatkuu reunojen yli (+ värikarttanäyte)

Haara `claude/opus15-karttareunus`, rakennettu tuoreen mainin päälle
(v691). Molemmat osat valmiit, portit ajettu, kaikki uudet kuvat
katsottu silmin.

## OSA A — kartta jatkuu reunojen yli (kytketty peliin)

Neljän uuden mallin kaupungin juliste on piirretty **1,6-kertaiselta
alalta samasta keskipisteestä**. **Lepotilassa lehti näyttää
täsmälleen entisen rajauksen** — reunus paljastuu vasta zoomatessa,
kun panorointi jatkuu sen puolelle sen sijaan että pysähtyisi kuvan
reunaan.

| Kaupunki | Ydinrajaus (lepotila) | Piirretty ala | PNG |
| --- | --- | --- | --- |
| Berliini | 10,2 × 7,7 km | 16,3 × 12,3 km | 2560 × 1935, 3,5 Mt |
| Lontoo | 8,7 × 4,5 km | 13,9 × 7,2 km | 2560 × 1339, 3,1 Mt |
| Pariisi | 8,3 × 6,2 km | 13,3 × 10,0 km | 2560 × 1934, 4,2 Mt |
| Helsinki | 4,7 × 4,1 km | 7,5 × 6,6 km | 2560 × 2253, 2,2 Mt |

Reunukselle tuli oikeaa kaupunkia: Berliinissä Tiergartenin länsipää
ja Kreuzberg, Lontoossa Regent's Park ja Kensington Gardens,
Pariisissa Périphérique kokonaan, Bois de Boulognen itälaita ja
Père-Lachaise, Helsingissä Seurasaari, Meilahti, Vallila ja
Korkeasaari.

### Miten se on tehty

**maakartat.js** — kaupungille valinnainen `piirtoRajat` (koko
piirretty ala); `rajat` säilyy leponäkymänä. Uusi `ydinAla(kartta)`
kertoo, missä kohtaa kuvaa ydinrajaus on, ja `karttapiste`,
`mittakaava` ja kainalot laskevat prosenttinsa piirretystä kuvasta.
**Ilman `piirtoRajat`-lohkoa `ydinAla` palauttaa koko kuvan, jolloin
jokainen kaava palautuu sanasta sanaan entiselleen** — 48 vanhaa
kohdekarttaa eivät muutu millään tavalla (testi vahtii tämän).

**ui.js** — lava mitoitetaan `piirtoRajat/rajat`-suhteella kehystä
suuremmaksi ja asemoidaan niin, että ydinrajaus täyttää kehyksen.
**Invariantti pidetty: lepotilassa (k = 1) lavalla EI ole
transformia** — asemointi on left/top-asettelua, ja savuke mittaa
nyt sen suoraan (`getComputedStyle(lava).transform === 'none'`).
Kehys saa korkeutensa ydinrajauksen kuvasuhteesta (`aspect-ratio`,
`box-sizing: content-box`, jotta reunaviiva ei vääristä sitä).

**Panoroinnin rajat** yleistettiin: sallittu ala kasvaa
ydinrajauksesta koko lavaan kertoimen mukana ja on kertoimesta 1,25
ylöspäin koko piirretty ala. Kertoimella 1 väli kutistuu pisteeksi
nolla, eli näkymä palaa ydinrajaukseen ja lava jää ilman muunnosta.
Liukuma 1 → 1,25 on siellä yhtä syytä varten: ilman sitä pohjaan
loitonnettaessa reunukselta ydinrajaukseen palattaisiin hyppäyksellä
viimeisellä pykälällä. Zoomin yläraja (3) ja pisteiden vastaskaalaus
(`--zoom`) ovat ennallaan.

**Kuvan leveys kasvoi samassa suhteessa** (1600 → 2560 px), ja se on
tarkoituksellista: ydinrajaus pysyy 1600 pikselinä, joten lepotilan
terävyys ja viivojen paksuus ovat täsmälleen entiset eikä zoomin
yläraja ala näyttää selaimen venytystä.

**Suomenlinnan kainalo** (helsinki): prosentit ovat kuvasta, joten ne
muunnettiin kaavalla `18,75 + vanha × 0,625` (mitat × 0,625):
x 76 → 66.25, y 69.15 → 61.97, leveys 22 → 13.75, korkeus 28.81 → 18.
Ruutu on lepotilassa pikselilleen entisessä kohdassaan ja entisen
kokoinen, ja kohde 7 osuu sen sisään (tarkistin sanoo "maalla").

### Satelliitti — ero, joka on tiedossa ja tahallinen

Satelliittikuvia **ei haettu uudelleen**; ne ovat vanhalla
rajauksella. Lepotilan kohdistus ei siitä muutu (kuva asetetaan
tarkalleen ydinrajauksen päälle), mutta **satelliittinäkymässä
panorointi rajataan vanhaan tapaan kuvan reunaan** — muuten reunukselle
panoroiva pelaaja näkisi tyhjää. Savuke mittaa molemmat tapaukset
erikseen. `tools/hae-satelliittikartat.mjs` päivitettiin vastaamaan
tätä (hakee yhä pelkän ydinrajauksen ja muuntaa kainalon prosentit),
**mutta sitä ei ajettu** — kuvatiedostot ovat ennallaan. Jos reunus
joskus halutaan satelliittiinkin, muutos on yhden rivin mittainen,
mutta kuva kasvaa 2,6-kertaiseksi eikä s2cloudless (10 m/px) siitä
tarkennu. **Omistajan päätettäväksi.**

### Portit

- `node tools/tarkista-karttapisteet.mjs` × 4 → kaikki pisteet maalla,
  yksikään ei peitä mittajanaa. Työkalu korjattiin samalla laskemaan
  ruudulla olevat mitat lavan pikseleissä (muuten reunuksellisen
  kartan numeroympyrät näyttivät 1,6× lähempänä toisiaan kuin ovat).
- `node tools/savuke-karttazoom.mjs` × 4 → **SAVUKE LÄPI** kaikilla.
  Savuketta laajennettiin: reunukselle panorointi, paluu lepotilaan
  (kehyksessä on tarkalleen ydinrajaus), muunnoksettomuus k = 1:ssä ja
  satelliitin oma rajaus.
- `node --test tests/*.test.mjs` → **711 tests, 710 pass, 0 fail.**
  Uusi `tests/karttareunus.test.mjs` (6 testiä) vahtii geometrian:
  keskipiste, kehyksen kuvasuhde, kohdepisteiden paikka lepotilassa,
  kainalo näkymän sisällä, janan mitta ja se, ettei laajentamaton
  kartta muutu.
- `node tools/tarkista-kaksoisavaimet.mjs` → puhdas.
- `node tools/build-standalone.mjs` → dist uusittu.
- Silmätarkistus: kaikki neljä uutta PNG:tä katsottu sekä koko
  julisteena että lepotilan rajauksessa, ja lepotila verrattiin
  mainin vanhaan kuvaan (Berliini ja Helsinki pikselivertailuna
  silmällä — identtiset). Lisäksi lehden kaappaukset selaimesta.

### Kaksi asiaa tiedoksi, ei korjattu

1. **Kohdekarttojen PNG:t kasvoivat yhteensä ~7,2 Mt** (5,7 → 12,9 Mt
   näillä neljällä), ja kaikki neljä ovat `sw.js`:n SHELL-listassa eli
   jokainen asennus lataa ne. Jos tämä on liikaa, oikea korjaus on
   siirtää kohdekartat SHELListä lennossa haettaviksi — se on oma
   päätöksensä eikä kuulunut tähän tehtävään.
2. **Esittelytekstien sijaintiviittaukset** ("oikeassa alanurkassa on
   oma pieni kartta Suomenlinnasta", "kartan keskellä näkyy saari")
   pitävät edelleen paikkansa, koska leponäkymä ei muuttunut.
   Tarkistettu silmällä kaikista neljästä.

## OSA B — värikarttanäyte (EI kytketty peliin)

`tools/piirra-kaupunkikartta.mjs` sai `--vari`-lipun ja toisen
palettinsa. Näyte: **`assets/kartat/berliini-varikartta-nayte.png`**
(sama rajaus ja sama aineisto kuin julisteessa). **Ei vipuun eikä
sw.js:ään** — työkalu tulostaa sen omaan tiedostoonsa eikä koske
julisteeseen.

Paletissa on:

| Kohde | Juliste | Värinäyte |
| --- | --- | --- |
| Vesi | `#e8d5a9` hiekka | `#c3d5da` harmaansininen, reuna `#95afb6` |
| Puistot | `#efe6ca` kuiskaus | `#d6dcba` salvianvihreä |
| Pohja (korttelit) | `#f6eeda` paperi | `#f3e8ce` lämmin hiekka |
| Radat | `#d5c9b0` | `#cec2a8` |
| Rauniot | `#ece0c2` | `#ead9b4` |
| Kadut ja muuri | musteruskeat | **täsmälleen samat** |

Kadut jätettiin tahallaan julisteen sävyihin: ensimmäisessä versiossa
myös katuja tummennettiin, ja kuva alkoi näyttää tavalliselta
verkkokartalta. Nyt ero julisteeseen on täsmälleen se, mitä omistaja
kysyi — vesi ja puistot saavat värin, muu pysyy paperina. Sinistä ja
vihreää on harmaannutettu: sini kallistuu teräksiseen ja vihreä
salviaan.

Työkalu ei piirrä rakennuksia (tunnettu rajoite, kirjattu useaan
kaupunkilohkoon), joten "korttelit" tarkoittaa katujen väliin jäävää
pohjaa. Rakennusten piirto olisi oma työnsä, ei paletin.

Näyte on 3,6 Mt eikä sitä ladata pelissä. Jos omistaja hylkää idean,
tiedoston voi poistaa yhdellä commitilla.

## Julkaisu

Versionosto tehty `tools/uusi-versio.mjs`:llä juuri ennen buildia
(`git fetch origin main` sitä ennen). PR auki; Testit-tarkistuksen
pitäisi olla vihreä.
