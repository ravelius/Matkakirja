# Viesti Fablelle: kaupunkimerkit katosivat uudesta nostotasosta (18.9.2026)

Haara `claude/bold-ride-vow4ki-kaupunkimerkit-poltettu`
(base `claude/bold-ride-vow4ki-julkaisu-v1938`). Yksi erä, aikakatto 45 min.

## Juurisyy yhdellä virkkeellä

Uusi nostotaso `2026-09-18-nostot` polttaa laattaan myös kaupunkipisteet
(`nakyva-kaupunki-*`), ja koska poltettu merkki ei saa elävää DOM-solmua,
Ranskan seitsemän lisäkaupunkia katosivat kartalta kokonaan — nimiö, 11,5 px:n
kaupunkimitta ja liuskan avaava napautus mukaan lukien.

## Mitä luettelot sanovat

Vanha `ampari-varmuuskopio-20260918-1033.json` (`2026-09-08a-nostot`): 1609
nostoa, joista **ei yhtään** `nakyva-kaupunki-*`-tunnusta. Uusi `pyramidi.json`
(`2026-09-18-nostot`): 1612 nostoa, joista 70 on uusia — ja niissä ovat kaikki
seitsemän Ranskan lisäkaupunkia:

```
nakyva-kaupunki-lyon, -bordeaux, -lille, -strasbourg, -nizza, -toulouse, -nantes
```

Pakka `js/packs/nakyvat-kaupungit-fra.js` syntyi 15.9.2026 (v1894), eli vanhan
polton jälkeen. Kaupunkipisteitä ei siis ole koskaan aiemmin poltettu: ne ovat
olleet eläviä koko olemassaolonsa ajan.

## Mikä on tarkoitettu käytös (Raamattu)

- **PAATOKSET 34 kohta 1–2**: *"jokainen kaupunki on kartalla YKSI piste
  (kaupunkimerkki + nimi); napautus avaa kaupungin nostot"*. Poltetulla
  merkillä ei ole DOM-solmua eikä siis liuskan avaavaa napautusta.
- **PAATOKSET 25 kohta 2**: *"Isommaksi, n. 11-12 px"* ja **PAATOKSET 27
  kohta 5**: *"kaupunkien nimiot 11,5 px pysyvat"*. Polttoketju piirtää nimiön
  noston omalla 8,5 px:n mitalla, koska kaupunkikerroin koskee vain elävää
  merkkiä (`js/pallolauta/nostot.js`, KAUPUNKIMERKIN NIMIÖ ON ISOMPI KUIN
  NOSTON: *"Poltettua mustetta ei voi suurentaa jälkikäteen"*).
- **PAATOKSET 25 kohta 3**: *"nostojen nimiot pienemmalla kuin kaupunkien"* —
  mahdoton, jos kaupungin nimiö on laatassa noston kokoisena.

Kolme omistajan päätöstä sanoo siis samaa: **kaupunkipiste on elävä merkki.**
Fablen rajaus kohta a (*"kaupunkipisteet (nakyva-kaupunki-\*) ja elaintaky kuten
ennen"*) luettiin polttoketjussa muotoon *"palavat kuten muutkin"*; "kuten
ennen" tarkoittaa vanhan luettelon todistuksen mukaan eläviä.

## Muutos

| Tiedosto | Muutos |
| --- | --- |
| `js/nostoladonta.js` | Uusi jaettu sääntö `onKaupunkipiste(tunnus)` perusteluineen — pelin ja polttoketjun yhteinen kappale, kuten tiiviste samassa tiedostossa. |
| `js/fokuskohteet.js` | `kohdeOnPoltettu` ja `poltettuTynka`: kaupunkipiste ei koskaan ole poltettu, vaikka luettelo niin sanoisi. |
| `tools/fokuskartta/nostot.mjs` | Paikallinen `onKaupunkipiste`-kopio pois; kaupunkipiste asetetaan `poltettava: false`, ja ajon yhteenveto kertoo *"N kaupunkipistettä eläväksi"*. |

Peli korjaantuu heti nykyisellä ämpärin luettelolla: kaupunki piirtyy elävänä
ja luettelon rivi jää vaikutuksetta.

## Mittaus (savuke-nimikyltti.mjs, Mac, PR:n oma ajo todentaa lahizoom 1c)

"Ennen" on Fablen toimittama PR-ajon lukema commitilla d965e2b6 luettelon
viennin jälkeen; "jälkeen" on tämän haaran paikallinen ajo Macilla.

| Väite | Ennen | Jälkeen |
| --- | --- | --- |
| 8b puhelin/työpöytä: lisäkaupungin nimiö 11–12 px | FAIL 0.00 px, kaupunkimerkkejä 0 | **OK** |
| 8c puhelin/työpöytä: noston nimiö pienempi kuin kaupungin | FAIL nosto 8.50, kaupunki 0.00 | **OK** |
| koko savuke | — | **58/60** |

Jäljelle jää `4. puhelin/tyopoyta: kyltti / maapaneelin teksti sama zoomista
riippumatta — hajonta 50.30 %` kummallakin ruudulla. Tämä ei liity nostotasoon:
Raamattu kirjaa sen jo vanhentuneeksi (PAATOKSET 34 kohta 13 tila:
*"nimikyltin vartiot 4 ja 6 vanhentuneet (yksi koko = kerroin 1)"*).

`node --test tests/*.test.mjs`: **# pass 3604, # fail 0** (13 skipped).
`node tools/tarkista-niputus.mjs`: 396 moduulia, ei törmäyksiä.

## Fablelle jäävä polttovelka ja muut havainnot

1. **POLTTOVELKA (tärkein).** Ämpärin nostotaso `2026-09-18-nostot` sisältää yhä
   seitsemän kaupunkipistettä laattamusteena. Peli piirtää kaupungin nyt elävänä
   sen musteen päälle, eli niissä seitsemässä kohdassa on kaksoiskuva (pieni
   poltettu piste + 8,5 px:n nimi ison elävän alla), kunnes nostotaso poltetaan
   uudelleen tämän haaran polttoketjulla. Uusi poltto poistaa ne itsestään —
   muuta ei tarvita, ja sen jälkeen `nakyva-kaupunki-*`-tunnuksia ei enää ole
   luettelossa.
2. Uusi luettelo poisti 67 tunnusta (mm. koko `traakianmeri`-, Istanbul- ja
   Egypti-ryhmiä) ja muutti 198 tiivistettä. Poistuneet piirtyvät nyt elävinä;
   se on odotettu polton tulos, mutta jos jokin niistä oli tarkoitus säilyä
   laatassa, se kannattaa tarkistaa erikseen — tämä erä ei koskenut niihin.
3. `onKaupunginSisainen` palauttaa epätoden poltetulle nostolle. Kun kaupungin
   sisäisiä nostoja ei enää polteta (rajaus a), sääntö on kunnossa, mutta
   vanhaan laattaan jääneet sisäiset nostot pysyvät liuskan ulkopuolella siihen
   asti kun ne on poltettu pois. Sama uusi poltto hoitaa tämänkin.
