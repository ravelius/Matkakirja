# Liiku-symboli irti kartan reunoista puhelimella (15.9.2026)

Omistajan päätös 15.9.2026, Raamattu (js/tyohuone-raamattu.js, haara
`claude/bold-ride-vow4ki`, kohta "LIIKU-SYMBOLIN PAIKKA" IPHONE-osion
lopussa): pystypuhelimella Liiku-nappi (kompassineliö, vasen alakulma)
oli kiinni kartan vasemmassa reunassa ja liian ylhäällä. Marginaali
kartan vasempaan ja alareunaan piti tehdä yhtä suureksi — samaksi kuin
oikean yläkulman karttaselite-napin (lisää/lista-kuvake) marginaali
kartan reunoihin.

## Mikä muuttui

`css/styles.css`, sääntö `.toimintorivi.rivi-yksi .monitoimi-nappi`:

```
/* ennen */
left: calc(10px + env(safe-area-inset-left, 0px));
bottom: calc(1.7rem + env(safe-area-inset-bottom, 0px));

/* jälkeen */
left: calc(var(--gap) + 0.4rem + 1px + env(safe-area-inset-left, 0px));
bottom: calc(var(--gap) + 0.4rem + 1px + env(safe-area-inset-bottom, 0px));
```

`var(--gap)` on sama muuttuja, jonka verran `.map-pane` on aina
irrotettu ruudun reunasta (`.stage { padding: var(--gap) }`), ja
`0.4rem` on sama sisennys, jonka `.karttaselite` (oikean yläkulman
nappi) käyttää omaan `.map-pane`-vanhempaansa nähden. `+1px` korjaa
sen, että `.karttaselite` on `position: absolute` map-panen SISÄLLÄ
(sen 1 px:n reunaviiva ei kuulu sen omaan asemointikehykseen), kun
Liiku on `position: fixed` ruudun suhteen eli reunaviivan ULKOPUOLELLA.

Nappi on edelleen `position: fixed`, koko 44 × 44 px, symboli
näkyvissä ja sana piilossa — animaatiot (laajennus/kutistuminen) ja
luennan aikainen piilotus (`display: none`) ei koskettu.

## Mittaukset

Mitattu tools/savukkeet/savuke-iphone-tekstit.mjs:n
`.map-pane`-, `.monitoimi-nappi`- ja `.karttaselite`-rajaviivoilla
(tarkka `getBoundingClientRect`, ei pyöristetty).

| Ruutu | Liiku ↔ vasen | Liiku ↔ alas | Karttaselite ↔ ylös | Karttaselite ↔ oikea |
| --- | --- | --- | --- | --- |
| 390 × 844, ENNEN | 2,81 px | 19,8 px | 7,39 px | 7,39 px |
| 390 × 844, JÄLKEEN | 7,41 px | 7,41 px | 7,39 px | 7,39 px |
| 393 × 852, JÄLKEEN | 7,41 px | 7,41 px | 7,39 px | 7,39 px |
| 844 × 390 (vaaka), JÄLKEEN | 7,41 px | 7,41 px | — (ylapalkki siirtää karttaselitteen, ei vertailukelpoinen) |
| 1400 × 900 (työpöytä), JÄLKEEN | 7,41 px | 7,41 px | — (samasta syystä) |

Ennen-mittaus: nappi oli 2,81 px vasemmasta reunasta (käytännössä
kiinni) ja 19,8 px alareunasta — selvästi epäsymmetrinen ja "liian
ylhäällä". Jälkeen-mittaus: vasen ja alas täsmäävät toisiinsa (ero
0 px, vaatimus ≤ 1 px) ja karttaselitteen ylös/oikea-marginaaliin (ero
0,02 px, vaatimus ≤ 1 px). 844 × 390 ja 1400 × 900: Liikun oma
vasen/alas-marginaali pysyy samana kaavana (7,41 px molemmissa,
täsmäävät toisiinsa) — karttaselitteen oma marginaali muuttuu näillä
ruuduilla eri, tämän muutoksen ulkopuolisesta syystä (`ylapalkki-nappi`
vie tilaa lyhyellä korkeudella, `.karttaselite { right: 2.95rem }`),
eikä ollut vertailukelpoinen ennen tätäkään muutosta.

Ei päällekkäisyyttä pulun kelluvan napin (`.pollo-nappi.pollo-kelluu`,
x ≈ 300…348 kaikilla mitatuilla ruuduilla) eikä maapaneelin kortin
kanssa millä tahansa mitatulla ruudulla.

Kuvakaappaus: `docs/raportit/kuvat/liiku-paikka-390-20260915.jpg`
(390 × 844, jälkeen).

## Vartiot

`tools/savukkeet/savuke-iphone-tekstit.mjs`:

- Uusi väite "puhelin pysty: Liikun marginaali vasemmalle ja alas yhtä
  suuri (±1 px)".
- Uusi väite "puhelin pysty: Liikun marginaali sama kuin
  karttaselitteellä (±1 px)".
- Uusi vastakoe `LIIKU_INSET0`: palvelin tarjoilee css/styles.css:n
  niin, että Liikun `left`/`bottom` ovat `0px` — molemman uuden
  väitteen kaltainen vertailu karttaselitteeseen KAATUU (mitattu:
  −7,19 px vs. +7,39 px, ero 14,58 px). Ajettu ja vahvistettu
  punaiseksi ennen palautusta.
- Ajo `NODE_USE_ENV_PROXY=1 npm test` sisältää tämän tiedoston;
  suoraan ajettuna 36/36 vartiota läpi.

## Portit

- `NODE_USE_ENV_PROXY=1 npm test`: läpi (ks. ajolokin yhteenveto tässä
  PR:ssä).
- `tools/tarkista-kaksoisavaimet.mjs`: ei kaksoisavaimia.
- `tools/tarkista-niputus.mjs`: niputus kunnossa.
- `tools/tarkista-savukkeet.mjs`: savukkeet kunnossa.
- `tools/savukkeet/savuke-era12.mjs` — ei tarpeen tälle muutokselle
  (koskee maapaneelin zoomausta, ei Liiku-nappia); Liiku-vartio lisätty
  sen sijaan olemassa olevaan `savuke-iphone-tekstit.mjs`:ään, joka
  jo omisti Liiku-napin muut väitteet.

## Ei tehty

Ei versionostoa, ei mergeä, ei Raamattu-muutosta (omistajan ohje).
Työ tehtiin worktreessä `/home/user/wt-liiku`, joka poistettiin
lopuksi.
