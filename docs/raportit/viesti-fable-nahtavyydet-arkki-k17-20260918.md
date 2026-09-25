# Nähtävyysarkki kevennettiin — PAATOKSET 34 kohta 17 e

Opus-agentti 18.9.2026. Haara
`claude/bold-ride-vow4ki-nahtavyydet-arkki-k17` (pohja main = v1941).
EI PR:ää, EI versionnostoa, Raamattuun ja sarjat.jsoniin ei koskettu.

## Mitä tehtiin (omistajan kolme alakohtaa)

**1) Lehtimäinen yläosa pois.** `avaaTiivisLehtiarkki` (js/lehti.js) sai
NELJÄNNEN, valinnaisen parametrin `asetukset`. Ilman sitä masto ladotaan
rivilleen entisellään (kaupunkiesittely ja tiivis etusivu eivät muutu).
Kun `asetukset.otsikko` on annettu, masto jää KOKONAAN pois — ei
kicker-riviä (`.lehti-ylarivi`, "UNOHDETTU AARRE"), ei kaupungin isoa
nimeä, ei päiväysriviä (`.lehti-alarivi`, "RANSKA · 1. MATKAPÄIVÄ"), eikä
siten myöskään sen tuplaviivaa ja alaviivaa. Tilalle tulee YKSI rivi:
annettu otsikko samassa `h2.lehti-nimio`ssa, jotta sulkunappi istuu
samassa kulmassa samalla säännöllä. `avaaNahtavyysnakyma` antaa otsikoksi
"Nähtävyydet".

Yksi uusi tyyliarvo: `.tiivis-lehtiarkki-otsikko` pienentää nimiön
mitan (clamp 1,2–1,6 rem) — lehden nimiö on kaupungin nimi isolla
antiikvalla, ja "Nähtävyydet" on näkymän nimi eikä kaupungin.

**2) Lyhyt teksti kokonaan, ilman nappia.**
`latoNahtavyysnakyma` latoo tekstin yhtenä kappaleena sellaisenaan, kun
se on alle `NAHTAVYYSTEKSTIN_KATKAISURAJA` = 900 merkkiä. Pidemmällä
tekstillä kohdan 16 e "Lue lisää" -nappi ja js/lauseraja.js jäävät
täsmälleen ennalleen. Pariisin nähtävyysteksti on 549 merkkiä, joten
nappia ei enää synny.

**3) Arkki loppuu tekstiin.** Sama keino kuin lehdettömällä
kaupunkikortilla ("LYHYT KORTTI ON LYHYT"): `.dialog.arkki.nahtavyysnakyma[open]`
on flex-kehys, joka keskittää SISÄLLÖN MITTAISEN kortin, ja kortin katto
`max-height: 100 %` pitää pitkänkin sisällön ruudulla. Lisäksi alareunan
varaus pienennettiin: lehden 2,6 rem on sivunumeron paikka, jota tässä
näkymässä ei ole. Valitsimessa on `.nahtavyysnakyma`, joten kaupunkilehti
ja muut tiiviit näkymät eivät muutu.

## Mittaus (savuke-kaupunkipopup.mjs, vartio 11, molemmat ruudut)

```
Pariisi @ 390 px:  mastonRiveja 0, otsikoita 1, otsikko "Nähtävyydet",
                   pituus 549 (= koko esittely), nappi 0, herokuvia 0,
                   kartta 1, kohteita 31, luettelo 0,
                   tekstinAla 790, kortinAla 800, rivinKorkeus 25
Pariisi @ 1400 px: mastonRiveja 0, otsikoita 1, otsikko "Nähtävyydet",
                   pituus 549, nappi 0, herokuvia 0,
                   kartta 1, kohteita 31, luettelo 0,
                   tekstinAla 982, kortinAla 887, rivinKorkeus 25
```

Kaikki kohdan 17 e vartiot OK molemmilla ruuduilla:

- näkymässä EI ole lehden mastoa (0 kpl `.lehti-ylarivi`/`.lehti-alarivi`)
- ylhäällä on vain "Nähtävyydet"-otsikko
- teksti on yksi kappale ja KOKO esittely (549 = datan pituus)
- lyhyessä tekstissä EI ole "Lue lisää" -nappia
- arkin alareuna on tekstin alareunassa (≤ 1 rivi): 390 px raoksi jäi
  10 px kun rivi on 25 px; 1400 px:llä sisältö on ruutua pidempi (teksti
  jatkuu vierityksen alle), joten tyhjää alaosaa ei ole lainkaan.
- kartta ja kohteiden napautus ennallaan: kohdekartta 1 kehys, 31 kohdetta,
  "kartan kohteen napautus avaa kohteen" OK.

Savukkeen väitteet päivitettiin samassa erässä: kolme kohdan 16 e
väitettä (yksi lause, "Lue lisää" -nappi, napin napautus) kääntyi
päinvastoin tai poistui, ja tilalle tuli viisi kohdan 17 e väitettä.

**Kokonaistulos 56/59 vartiota läpi.** Kolme punaista EIVÄT liity tähän
erään: `Marseille @ 390 px` kaupunkimerkin napautus ei avannut liuskaa
(liuskan rivejä 0) ja sen perässä sama `vastakoe 1`. Sama vartio putosi
ensimmäisellä ajolla Pariisilla ja meni toisella läpi — kyse on
kamera-ajon ja napautuksen ajoituksesta (savukkeen oma selostus:
"peli nielaisee yhden napautuksen"), ei tämän erän koodista. Kaikki
napautuspolun jälkeiset vartiot (mukaan lukien nähtävyysnäkymä) menivät
läpi molemmilla ruuduilla.

## Muut portit

- `node --test tests/*.test.mjs` → `# pass 3623`, `# fail 0` (13 skipped).
- `node tools/tarkista-savukkeet.mjs` → savukkeet kunnossa.

## Muutetut tiedostot

- `js/lehti.js` — `avaaTiivisLehtiarkki` neljäs parametri, `KEVYEN_OTSIKON_LUOKKA`
- `js/kaupunkinosto.js` — `NAHTAVYYSTEKSTIN_KATKAISURAJA`,
  `NAHTAVYYSNAKYMAN_OTSIKKO`, `latoNahtavyysnakyma`, `avaaNahtavyysnakyma`
- `css/styles.css` — kevyen otsikon mitta ja nähtävyysarkin sisällön
  mittainen korkeus
- `tools/savukkeet/savuke-kaupunkipopup.mjs` — vartion 11 väitteet
