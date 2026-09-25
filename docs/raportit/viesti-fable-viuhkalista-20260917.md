# Viesti Fablelle: aihenoston viuhka on nyt lista (PAATOKSET 32 kohta 3)

**Opus-agentti, 17.9.2026 klo 21.20 Suomen aikaa.** Haara
`claude/bold-ride-vow4ki-viuhkalista` (origin/mainin päältä, 3abfd4c6 = v1933).
**Vaatii versionoston** — pelikoodi muuttui, `tools/uusi-versio.mjs` on ajamatta.

## Mitä tehtiin (vain kohta 3; ankkurit, koko ja levitys ovat toisen erän asia)

- **Kaari on poissa.** `viuhkanAsemat` (js/pallolauta/aihemerkit.js) latoo kohdat
  yhtenä **pystylistana** merkin kylkeen: sama `dx` kaikilla riveillä, riviväli
  30 px (≥ nimiön korkeus 26 px), ja **yksi leveys** kaikille riveille (levein
  nimiö) — siksi lista on suora reunastaan.
- **Tyhjempi puoli, ruudussa pysyen.** Oletuspuoli on kartan keskeltä poispäin;
  lista kiinnitetään ruudun sisään ja sille kokeillaan seitsemää pystysiirtoa.
  Voittaja on pienimmän sakon asento, missä sakko = ruudun ylitys (paino 1000) +
  päällekkäisyys **esteiden** kanssa: kaupunkien nimilaatikot, **pelimerkit
  (nappula, kohteet)** ja kartan muu nostomuste.
- **Pohja on kehyksetön.** Yksi paperivaalennus koko listan alla, reuna
  pehmennetty neljällä sisäkkäisellä vyöhykkeellä (peitto 0,14 → 0,94). Ei
  reunaviivaa, ei `filter`iä eikä `backdrop-filter`iä — iOS-sääntö kieltää
  suodattimet kartan kerroksilta (tests/rules.test.mjs). Yhdistysviivat merkkiin
  poistettiin.
- **Rajapinnat ennallaan.** `napautaViuhkasta(ruutupiste)` ja `kohdanLaatikko`
  ovat entiset, joten lauta.js:n `viuhkanNapautus` toimii koskematta; rivin
  napautus avaa kortin kuten ennen, ja viuhka sulkeutuu kartan napautuksesta tai
  zoomista (PAATOKSET 27 kohta 2 säilyy).

### Muutetut tiedostot

`js/pallolauta/aihemerkit.js` (lista, pohja, piirto), `js/pallolauta/nostot.js`
(esteet ladontaan, yksi leveys, pohjan välitys), `js/pallolauta/lauta.js` (yksi
rivi: pelimerkkien laatikot esteiksi), `css/styles.css` (pohjan tyyli,
viiva/osuma-tyylit pois), `tests/aihemerkit.test.mjs` (3 uutta testiä),
`tools/savukkeet/savuke-pariisi-lahizoom.mjs` (mittaus + vartio 4c).

## Mittaus

`node --test tests/*.test.mjs`: **3585 testiä, 0 punaista** (uudet: lista on
pystysuora ja samanlevyinen, rivilaatikot eivät limity, lista väistää esteen).

Savuke `savuke-pariisi-lahizoom.mjs` Macilla, **76/76 vartiota läpi**:

- `4b. puhelin/tyopoyta: aihemerkin viuhka avautuu ja sen kohta avaa kortin` — vihreä (ennallaan).
- **Uusi `4c: viuhkalista ei limity eikä valu ruudun yli`** — vihreä molemmilla ruuduilla.
  Mitattu 390 px: *rivejä 5, limityksiä 0, musteen päällä 0 (kaupungin nimi,
  nappula), reunan yli 0.* Sama 1400 px:llä.

Kaappaukset (lista auki):
`/tmp/kaappaus-viuhkalista2/pariisi-viuhkalista-390.png` ja
`/tmp/kaappaus-viuhkalista2/pariisi-viuhkalista-1400.png`.
Vastakoetta ei ajettu (UI-säätö, ohjeen mukaisesti).

## Oletukset ja avoimet

1. **Sisäinen kelaus jäi tekemättä.** Puhelimen 390 × 844 ruudulle mahtuu yli 20
   riviä 30 px:n välein, ja Pariisin suurin aiheryhmä on 5 — kelaus ei laukeaisi
   millään nykyisellä datalla. Sen sijaan riviväli kutistuu tarvittaessa nimiön
   korkeuteen (26 px) ja lista kiinnitetään ruudun sisään. Jos ryhmäkoot joskus
   kasvavat yli ruudun, kelaus on oma pieni eränsä (rivit ikkunaan + kaksi
   nuolriviä samaan osumatestiin).
2. **Kaupunkien nimilaatikot luetaan edellisestä sovittelusta** (`sovittele`
   tallettaa ne): lauta antaa nimet vasta ladonnan jälkeen, ja viuhka avataan
   aina ladonnan jälkeen, joten luku on tuore. Ei koskettu sovittelu.js:ään
   eikä nimet.js:ään.
3. **Lista voi yhä osua kartan muihin nostonimiöihin**, jos merkin ympärillä ei
   ole tyhjää: este on sakko, ei kielto. Kuvassa 390 px lista sivuaa
   *Kyyhkyposti…*- ja *Tuileriain rauniot…* -nimiöitä; vaalennettu pohja pitää
   listan luettavana. Kohdan 2 (levitys) erä tuo tähän lisää tilaa.
4. Raamattuun, sarjat.jsoniin, nostojen ladontaan, ankkureihin tai kokoihin ei
   koskettu.
