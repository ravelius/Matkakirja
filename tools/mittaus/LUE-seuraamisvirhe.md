# Seuraamisvirhe-mittaus: ohje

Mittaa kameran seuraamisvirheen aidolla hiirellä/sormella (ei synteettinen
syöte — CGEvent ja Playwright-dispatch eivät tässä kelpaa, ks. skriptin
oma header ja docs/raportit/seuraamisvirhe-v2106-20260922.md). Käytetään
sulavuuskatsauksen kohdan 13 (syöte kerran per rAF-kehys, ei per tapahtuma)
korjauksen todentamiseen.

## Ajo

```bash
node tools/mittaus/seuraamisvirhe-palvelin.mjs
```

Avaa tulostettu osoite (esim. `http://127.0.0.1:8794/?lauta=pallo&dev=marseille&koe=mittaus&luonnollinen=1`)
oikeassa Safarissa JA oikeassa Chromessa (kaksi erillistä ajoa, sama
palvelin kelpaa molemmille). Vedä hiirellä/sormella kartalla jatkuvasti
tallennuksen ajan — sivu poistaa saapumiskortin ja käynnistää tallennuksen
itsestään noin 8-9 sekunnin kuluttua latauksesta, kesto oletuksena
8 × 2,2 s ≈ 21 s.

Tulokset kirjautuvat suoraan `docs/raportit/data/seuraamisvirhe-<pvm>.jsonl`-
tiedostoon (EI /tmp:hen — ensimmäisen ajon raakadata menetettiin Mac-
kaatumisessa 22.9.2026, koska se oli vielä /tmp:ssä).

## Lähde: syöteloki vs. onBeforeRender-vertailu

Oletus (`koe=mittaus,syoteloki`) lukee ENSISIJAISESTI pelin oman lokin
`ui.pallonSyote.loki` (Pelikoodari 22.9.2026, haara pelikoodari-syote-
interpolointi, commit 3a9d34bfc): rivi jokaisesta kamerakirjoituksesta
`{t,x,y,lat,lng,alt,ohitus}`, jossa x/y = käytetty osoittimen paikka ja
lat/lng/alt = kamera HETI sen jälkeen — lukuhetki ei voi mennä väärin,
koska kirjaus tapahtuu kirjoituskohdassa itsessään. Jos lokia ei ole
(vanhempi haara, tai `syoteloki`-lippu puuttuu osoitteesta), harnessi
palaa `seurantaVertailu`-kenttään: passiivinen pointer-kuuntelu + kameran
luku `scene.onBeforeRender`-koukusta (ei enää erillinen oma rAF — Fable
22.9.2026 huomautti, että erillinen rAF kilpailisi kirjaston piirto-
silmukan kanssa ja voisi tuottaa 0/2×-kuvion; ensimmäisen mittauskierroksen
[docs/raportit/seuraamisvirhe-v2106-20260922.md] data kärsi tästä).

Vastauksen tulostuksesta ja jsonl-rivistä näkyy kumpaa lähdettä käytettiin
(`seuranta` = syöteloki, `seurantaVertailu` = aina mukana vertailuksi).
`laskurit`-kenttä (`interpolointeja`, `ekstrapolointeja`, `viiveMs`,
`sovelluksia`, `interpVanha`) kertoo suoraan datasta kumpaa polkua ajettiin,
ei vain osoitteesta.

## Muut mittauspisteet

Oletus on Ranska/Marseille z6 (`--dev marseille --lat 46.5 --lng 2.5 --alt 0.2`).
Camarguen z8-pisteelle:

```bash
node tools/mittaus/seuraamisvirhe-palvelin.mjs --dev marseille --lat 43.55 --lng 4.5 --alt 0.05
```

## Tarkistus hyväksymisrajaa vasten

```bash
node tools/mittaus/seuraamisvirhe-palvelin.mjs --tarkista docs/raportit/data/<tiedosto>.jsonl
```

Hyväksymisraja (Fable/omistaja 22.9.2026): **p10 > 0,7 JA p90 < 1,4**
jokaisella kierroksella, sekä Safarissa että Chromessa. Perustaso ennen
Pelikoodarin interpolointikorjausta: p10 = 0 kaikissa 16 kierroksessa
kummallakin moottorilla (ks. seuraamisvirhe-v2106-20260922.md) — työkalu
tulostaa PASS/FAIL rivin per kierros ja yhteenvedon.

Omat rajat: `--p10 0.7 --p90 1.4` (samat oletuksena, muutettavissa jos
hyväksymisraja tarkentuu).

## Kehysprofiili puhelimesta (`?koe=profiili`)

Sama palvelin ottaa vastaan myös kehysprofiilin jaksot, joten puhelinta
ei tarvitse kytkeä Web Inspectoriin nähdäkseen, MIKÄ pitkän kehyksen
aiheutti (Pelikoodari 22.9.2026, omistajan tilaus Fablen kautta).

```bash
node tools/mittaus/seuraamisvirhe-palvelin.mjs
```

Avaa puhelimella tulostettu osoite ja lisää `koe=profiili` (yhdistettävissä
muihin kokeisiin pilkulla, esim. `?lauta=pallo&koe=profiili`). Kartan
vasempaan alakulmaan ilmestyy pieni musta laatikko, joka päivittyy noin
kolmen sekunnin välein:

- **pisin kehys** ja sen jakauma: `varattu` = pääsäikeen työ, siitä
  `js` = rAF-kutsut, `render` = three.js, `muu` = tyyli, asettelu ja
  maalaus. Loppu (`dt − varattu`) on odotusta GPU:lta tai vsynciltä.
- **syy**: kolme eniten aikaa vienyttä rAF-kutsua nimeltä.
- **med / p95 / >25 ms** koko jaksolta.
- **voimassa olevat asetukset** (vedon seuranta, tarkkuus liikkeessä) ja
  lepopiirron tila — kuvakaappaus kertoo siis itsessään, missä tilassa
  peli oli.

Jokainen jakso lähtee myös POSTina polkuun `/__profiili`, ja palvelin
kirjoittaa sen tiedostoon `docs/raportit/data/profiili-<pvm>.jsonl`
(yksi rivi per jakso, ei koko kehyslistaa). Konsoliin tulostuu sama
tiivistettynä. Tuotanto-osoitteessa polkua ei ole, ja lähetys
epäonnistuu hiljaa — overlay toimii silti.
