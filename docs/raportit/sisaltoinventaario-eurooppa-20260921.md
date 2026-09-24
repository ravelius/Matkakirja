# Sisältöinventaario Eurooppa — 2026-09-21

Sisältökirjuri (Sonnet), Fablen tilaus: nostostandardia vasten maittain
ja kaupungeittain — puuttuvat maalehdet/kaupunkilehdet, kohdekartat
ilman pienoismallia, kartuschat, kohtaamiset. Ei sisältömuutoksia tässä
erässä — pelkkä laskenta suoraan pelin omista paketeista.

## Yhteenveto: neljä aukkoa

1. **CYP, LUX, MLT: maalehti on, kaupunkilehteä ei ole lainkaan** —
   näillä kolmella maalla on täysi `MAA_KATEGORIAT`-maalehti (20 nostoa
   kussakin, 5 aihetta), mutta `EUROPE_CITY_COUNTRY`-taulussa ei ole
   yhtään näiden maiden kaupunkia. Ilman pelikaupunkia ei avaudu
   kaupunkilehteä eikä automaattista "Maa numeroina" -sivua — koko maa
   on pelaajalle tavoittamaton kartalta. Suurin yksittäinen aukko.
2. **Kartuscha ohut neljässä maassa:** BIH, UKR, RUS ja ISL jäävät
   selvästi alle 5–6 aiheen / 4–5 noston mitan (docs/moduulit/
   maalehti.md), vaikka menovinkit-aihe on kaikilla täynnä.
3. **Kohtaamiset puuttuvat 41/48 kaupungista** — vain 7 kaupunkia
   käyttää nimettyä paikallishahmoa, loput saavat satunnaisen ASKERS-
   kysyjän. Suurin yksittäinen sisältötyyppi, jota ei ole vielä
   monistettu.
4. **Kohdekartat ilman pienoismallia: 97 kohdetta, 12 kaupunkia** — jo
   tilattu Codexilta (branch `claude/postilaatikko`, commit `6c07a465`,
   `posti/fable-codexille-miniatyyrit-eurooppa-20260921.md`), ei vielä
   toimitettu (tarkistettu `assets/kartat/miniatyyrit/`: 0 tiedostoa
   Bryssel/Ljubljana/Kosice/Bergen-etuliitteillä). Ei vaadi uutta
   tilausta, vain kytkentää toimituksen jälkeen.

## Menetelmä

Luvut haettu suoraan pelin omista paketeista Node-importilla (ei käsin
laskettu, ei erillistä uutta työkalua tähän kertaan):

- `js/packs/europe-countries.js` → `EUROPE_CITY_COUNTRY` (48 kaupunkia,
  kaupunki→ISO-3).
- `js/packs/maa-kategoriat.js` → `MAA_KATEGORIAT[iso]` (maalehden
  aiheet ja nostot; `menovinkit`-aihe on hakemistolistamalli
  `lista`-kentässä, ei `nostot`-kentässä — js/maalehti.js "LISTAMALLI").
- `js/packs/kulttuuri-kategoriat.js` → `KULTTUURI_KATEGORIAT[city]`
  (kaupunkilehden kansiaihe `id: 'kaupunki'`).
- `js/packs/kohtaamiset.js` → `KOHTAAMISET[city]`.
- Pienoismallitilaus: `git show 6c07a465:posti/fable-codexille-
  miniatyyrit-eurooppa-20260921.md` (postilaatikkohaarassa) ja
  `assets/kartat/miniatyyrit/` nykytila.

Kohdemaajoukko on NOSTOSTANDARDI EUROOPALLE (Raamattu) 29 maata +
BEL/CYP/LUX/MLT/SVK/SVN-täydennys (35 yhteensä); ALB/AND/BLR/MDA/MKD/
MNE/SRB/XKX eivät kuulu ajon piiriin, kuten aiemminkin.

## 1. Kartuscha / maalehti: aiheiden syvyys (35 maata)

| maa | aiheet (pl. menovinkit) | nostoja | menovinkki-kohteita | tila |
|---|---:|---:|---:|---|
| BIH | 1 (arki) | 2 | 9 | **ohut** |
| UKR | 2 (ruoka, musiikki) | 4 | 10 | **ohut** |
| RUS | 2 (taide, tiede) | 4 | 10 | **ohut** |
| ISL | 3 (luonto, eläimet, arki) | 9 | 6 | **ohut** |
| CHE | 4 | 10 | 6 | vajaa (edellisen erän jälkeenkin) |
| NOR | 4 | 10 | 6 | vajaa |
| POL | 4 | 12 | 6 | vajaa |
| DNK | 4 | 13 | 6 | vajaa |
| EST/LVA/LTU/ROU/BGR/HRV | 4 kpl | 14 | 8–10 | vajaa (viime erän jälkeenkin yhä 4, ei 5) |
| BEL/CYP/LUX/MLT/SVK/SVN | 5 | 20 | **0 — ei menovinkkejä lainkaan** | osittain vajaa |
| CZE/AUT/IRL/HUN/PRT/GRC | 5 | 18 | 6 | täydessä mitassa |
| NLD | 5 | 19 | 6 | täydessä mitassa |
| TUR | 6 | 19 | 10 | täydessä mitassa |
| ITA/FRA/ESP/SWE/DEU/GBR | 6–14 | 23–68 | 6–20 | täydessä mitassa tai yli |

Huom: 20.–21.9. erä (DNK/FIN/HRV/POL + BGR/EST/ROU/LTU/LVA) nosti nämä
maat 2–3 aiheesta 4 aiheeseen — yksi aihe (5. eli tavoiteminimi) jäi
vielä puuttumaan kaikilta yhdeksältä. BIH/UKR/RUS/ISL eivät olleet
mukana kummassakaan aiemmassa erässä ja ovat nyt selvästi heikoimmat.

## 2. Maalehti ilman kaupunkilehteä: CYP, LUX, MLT

```
CYP: 0 kaupunkia EUROPE_CITY_COUNTRY-taulussa
LUX: 0 kaupunkia
MLT: 0 kaupunkia
```

Näillä on täysi maalehti (5 aihetta, 20 nostoa kullakin, ks. yllä), mutta
"MAAT ILMAN PELIKAUPUNKIA SAAVAT PELIKAUPUNGIN" -päätöstä (Raamattu,
loki #MAAT ILMAN PELIKAUPUNKIA SAAVAT PELIKAUPUNGIN) ei ole vielä
toteutettu niille. Kaikilla muilla 32 kohdemaalla on vähintään yksi
pelikaupunki.

## 3. Kohtaamiset: 7/48 kaupunkia

**On:** berliini, dubrovnik, lontoo, madrid, odessa, tukholma, venetsia.

**Puuttuu (41):** alpit, amsterdam, ateena, barcelona, bergen, bryssel,
budapest, bukarest, dublin, edinburgh, firenze, granada, helsinki,
islanti, istanbul, kiova, kobenhavn, kosice, krakova, kreeta, lappi,
lissabon, ljubljana, marseille, moskova, oslo, pariisi, pietari, praha,
riika, rooma, sarajevo, sevilla, sisilia, sofia, tallinna, tampere,
tromssa, varsova, vilna, wien.

Kaikki 48 kaupunkia käyttävät kuitenkin täyttä kaupunkilehteä
(`kaupunki`-kansiaihe löytyy jokaiselta) — kohtaaminen on ainoa
puuttuva komponentti näissä 41:ssä, ei koko lehti.

## 4. Kohdekartat ilman pienoismallia: 97/12 kaupunkia

Jo tilattu (ei toistoa tähän), Julkaisija hakee kun Codex ilmoittaa,
Sisältökirjuri kytkee `js/packs/miniatyyrit.js`-tauluun:

| kaupunki | puuttuu / kohteita | tila |
|---|---:|---|
| Bryssel | 7/7 | ei yhtään |
| Ljubljana | 8/8 | ei yhtään |
| Kosice | 8/8 | ei yhtään |
| Bergen | 8/8 | ei yhtään |
| Pariisi | 19/31 | vajaa |
| Lontoo | 14/24 | vajaa |
| Wien | 6/16 | vajaa |
| Berliini | 6/16 | vajaa |
| Madrid | 6/16 | vajaa |
| Rooma | 6/16 | vajaa |
| Amsterdam | 5/13 | vajaa |
| Istanbul, Helsinki, Ateena, Pietari | 1 kukin | lähes valmis |

Tarkistettu tänään uudelleen: `assets/kartat/miniatyyrit/` sisältää 331
tiedostoa mutta ei yhtään bryssel-/ljubljana-/kosice-/bergen-alkuista —
tilaus on yhä auki, ei uusintatilausta tarvita.

## Ehdotus seuraavaksi eräksi (Fablen päätettäväksi)

Priorisointiehdotus pienimmästä työstä suurimpaan hyötyyn:

1. **CYP/LUX/MLT pelikaupunki** — pieni erä (3 kaupunkia, sama resepti
   kuin muillakin "maa ilman pelikaupunkia" -täydennyksillä), avaa
   kaupunkilehden ja Maa numeroina -sivun kolmelle maalle joilla
   sisältö on jo olemassa.
2. **BIH/UKR/RUS/ISL kartuscha 5 aiheeseen** — sama resepti kuin
   21.9. BGR/EST/ROU/LTU/LVA-erässä, mutta nämä neljä ovat lähtötasoltaan
   heikoimmat (1–3 aihetta).
3. **Kohtaamiset, iso erä** — 41 kaupunkia, kannattaa jakaa maittain
   rinnakkaisille agenteille kuten aiemmat sisältöerät.
4. Pienoismallit odottavat Codexin toimitusta — ei sisältötyötä ennen
   sitä.
