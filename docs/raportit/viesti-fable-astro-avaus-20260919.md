# Opus → Fable: Astronautin kameran avaus (PAATOKSET 52, 19.9.2026)

Erä `opus-local-astro-avaus`, Matkakirja Opus local (Mac Studio), 20.58–21.15 Suomen aikaa.
Pohja origin/main (a2acffc2, v1964).

## Muutokset

### 1. Valmis pallo paljastetaan mustan alta (`js/linssit/satelliitti-avaruus.js` luku 2e, `luoPaljastus`)

- Linssi avautuu mustana kerroksena (`.astro-paljastus`, z-index 40, ottaa osoittimen).
  Keskellä on pelin oma otsikkokortti "ASTRONAUTIN KAMERA" ja rivi "kuvat: NASA".
  NASAn tunnusta ei käytetä.
- Kaikki rakentuu kerroksen alla: pallo, reliefi, pilvet, sumu, pisteet ja ISS.
  Avausajo odottaa (`osuus` pysyy 0:ssa), eikä ote palloon päätä ajoa mustan aikana.
- **Valmiuden ehto** (`valmisPaljastettavaksi`), joka täyttyy
  `PALJASTUKSEN_KEHYKSET` = 3 peräkkäisellä kehyksellä:
  - reliefin haku on päättynyt (`reliefinKesto > 0`)
  - pilvien lopullinen kuva on ratkaissut (`astro-sumu.js` uusi `pilvetValmiit`:
    aito kuva maalattu tai haku päättynyt)
  - kalvo on piirtänyt (`sadePx > 0`)
- Sen jälkeen otsikko häipyy (700 ms), sitten musta häipyy (1 100 ms), ja kerros poistuu.
- Katto `PALJASTUKSEN_KATTO_MS` = 12 s, joten ruutu ei jää mustaksi, jos jokin lataus
  ei valmistu (`katonKautta` mittarissa). Liikkeenvähennyksellä kerros poistuu ilman
  häivytyksiä.

### 2. Avauszoomi lähemmäs pilvien yläpuolelle

- `ALOITUKSEN_MARGINAALI` on nyt sama kuin `AVAUKSEN_MARGINAALI`: ajo alkaa koko
  pallosta (92 %), ei enää 65 %:sta.
- Uusi `AVAUSAJON_LOPPU` = 0,72: lepokorkeus on 0,72 × avauskorkeus. Pilvet ovat
  täydessä peitossa suhteesta `PILVIEN_TAYSI` 0,65 ylöspäin, joten varaa jää 0,07,
  ja avaruussumu on lähellä tiheintä kohtaansa.
- Avauskorkeus pysyy kaikkien profiilien mittana (pilvet, sumu, nimet, zoomirajat
  0,084–1,3 × avaus). Vain kameran lepopaikka on lähempänä, eikä `ZOOMIN_LAHIN` muuttunut.
- `tila()` antaa uudet kentät `lepokorkeus` ja `paljastus`.

### 3. ISS

- Rata on tummempi: `rgba(16, 26, 44, 0.62)`, 1,3 px (ennen `rgba(198, 222, 255, 0.34)`, 1,1 px).
- Merkki on nyt aseman piirros (SVG 24 × 12 px): runko, ristikko ja kahdeksan
  kullanruskeaa aurinkopaneelia. Ennen se oli 8 px:n valkoinen hehkupiste.
- Ei CSS-suodatinta: linssikerroksen iOS-sääntö, `tests/sw.test.mjs`.

## Vartiot (`tools/savukkeet/savuke-astro-pallo.mjs`)

- **52a**: linssi aukeaa mustana (`rgb(0,0,0)`) otsikkokortilla, ja avausajo odottaa.
- **52b**: paljastushetkellä `pilvetValmiit`, pilvipeitto ≥ 0,85 ja reliefi valmis
  eikä katon kautta.
- **52c**: pallo kasvaa ≥ 1,15× ja rajautuu ruudun yli (> 105 % kapeimmasta sivusta),
  kamera lepokorkeudessa, pilvet ≥ 0,85.
- **52d**: radan luminanssi < 60 ja ISS-piirros (≥ 10 osaa, leveämpi kuin korkea).
- Päivitetyt väitteet:
  - "avausajo … näkyy ensin kokonaan": 90–95 %
  - ISS-merkin koko: 20–28 px
  - liikkeenvähennyksen vastakoe: `lepokorkeus`
- Reuna-, varjo- ja pistemittaukset (ISS-lohkosta eteenpäin) ajetaan avauskorkeudessa
  (koko pallo ruudussa, pelaajan omassa zoomikaistassa), koska ne lukevat pallon reunaa.
- `tests/satelliitti-avaruus.test.mjs` päivitetty: avausajo 92 % → yli 105 %,
  lepokorkeus ≥ `PILVIEN_TAYSI`.

## Mittaukset (Chromium, Mac)

| | Puhelin 390 × 844 | Työpöytä 1400 × 900 |
| --- | --- | --- |
| Paljastus (ms avauksesta) | 450 (reliefi 835 ms) | 929 (reliefi 1 202 ms) |
| Pilvet paljastushetkellä | 0,9, valmiit | 0,9, valmiit |
| Pallo alussa → levossa | 344 → 451 px (1,31×, **120,6 %** ruudusta) | 809 → 1 017 px (1,26×, **115,7 %**) |
| Korkeus lepo / avaus | 3,065 / 4,257 | 1,106 / 1,536 |
| Radan luminanssi | 25 (ennen noin 219) | 25 |
| savuke-astro-pallo | **59/59** | **52/52** |

Ennen tätä muutosta avausajo meni 65 %:sta 92 %:iin, eikä mustaa kerrosta ollut. Siksi
sumu ja pilvet ilmestyivät vasta, kun aito kuva latautui (omistajan havainto).

Muut savukkeet:

- savuke-astro-sumu 8/8
- savuke-satelliittilinssi (puhelin, puhelinvaaka, pienivaaka) 95/95
- `node --test`: pass 3694, fail 0
- `tarkista-savukkeet`: kunnossa

Kaappaukset `docs/raportit/kaappaukset/astro-avaus-20260919/`:

- `astro-avaus-lepo-390.jpg`: rajattu pallo pilvineen ja sumuineen, tumma rata ja ISS-piirros
- `astro-avaus-paljastus-390.jpg`: paljastuksen hetki

Kaappausta ennen muutosta EN ottanut: vanha savuke ei kaappaa tätä hetkeä.

## Jäi tekemättä

- WebKit- ja laitemittaus: häivytykset ovat CSS-transitioita, eikä niissä ole suodattimia.
- savuke-astro-pallon vartijarivit (a, b, c), astro-valokuva, astro-aani ja
  satelliittilinssi#isot ovat ajamatta. Ne avaavat saman linssin, ja paljastus lisää
  avaukseen noin 0,5–1 s.
- Grönlanti-erä (`opus-local-gronlanti`, WIP 579dec63) jatkuu tämän jälkeen.
