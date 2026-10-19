# Laitekierros junalle <NNN> — tarkistuslista (POHJA)

Perusta: Raamattu 9.11 kohta 1 (omistaja 19.10.2026 klo 15.21). Lukituskäännöksen jälkeen, ENNEN kuin TestFlight jaetaan ulkoisille testaajille. Täytä kopio nimellä `docs/raportit/laitekierros-juna<NNN>-<pvm>.md`; kuvat kansioon `docs/raportit/kuvat/laitekierros-<NNN>/`. Pohja pysyy tyhjänä.

## 0. Otsikkotiedot

| Kenttä | Arvo |
|---|---|
| Juna / BUILD | |
| Käännöksen SHA (runko) | |
| Muutoslistan lähde (NS:n muutosloki) | |
| Palautelähteet (omistajan palautteet, ulkoisten palautteet) | |
| Laite 1 (ensisijainen) | iPad Pro 13 M1 `00008103…` — iPadOS: |
| Laite 2 | iPhone-simulaattori (malli, iOS): |
| Aloitus / lopetus (date-komennosta) | |
| Edellinen käännös ulkoisilla (pysyy, jos löydös) | |

Omistajan omaa iPhonea ei käytetä.

## 1. Perusrutiini (jokaisella laitteella, ensin)

| # | Kohta | iPad | iPhone-simu | Kuva |
|---|---|---|---|---|
| P1 | Asennus ja käynnistys: logo → alkuvalikko, ei kaatumista | | | |
| P2 | Jatka olemassa olevaa peliä: tallennus latautuu | | | |
| P3 | Uusi peli alusta: aloitus ja ensimmäinen siirto | | | |
| P4 | Vierityksen sujuvuus (kartta, lehdet, listat) | | | |
| P5 | Muisti: ei jetsamia, ei hidastumista 10 min käytön jälkeen (iPad) | | | |
| P6 | Ääni soi (puhe, musiikki, tehosteet), kaiuttimen taso | | | |
| P7 | Asetusratas ⚙ aukeaa, säädöt tallentuvat | | | |

Merkintä soluihin: **OK** / **LÖYDÖS L<n>** / **—** (ei koske laitetta, syy riville).

## 2. Muutoslista (NS:n muutosloki) kohta kohdalta

Yksi rivi per muutoslokin rivi. Kopioi rivi sanatarkasti. "Odotettu" = mitä pelaajan pitää nähdä/kuulla.

| # | Muutoslokin rivi | Odotettu (pelaajan silmin) | iPad | iPhone-simu | Kuva |
|---|---|---|---|---|---|
| M1 | | | | | |
| M2 | | | | | |

## 3. Omistajan ja ulkoisten testaajien palautteet

Yksi rivi per palaute, jonka pitäisi olla korjattu tai huomioitu tässä junassa. Lähde (päivä/klo/kanava) mukaan. Toista alkuperäinen tilanne (reproa ensin, sitten tarkista korjaus).

| # | Palaute (alkuperäinen sanamuoto) | Lähde ja aika | Toistettu vanhalla tavalla? | Korjattu iPadilla | Korjattu simulla | Kuva |
|---|---|---|---|---|---|---|
| F1 | | | | | | |

## 4. Regressio (muutosten naapurit)

Lisää vain alueet, joihin muutokset koskivat välillisesti (esim. UI-muutos → tekstien mahtuminen pienellä ruudulla; ääni → tauko/jatko).

| # | Alue | iPad | iPhone-simu | Kuva |
|---|---|---|---|---|
| R1 | | | | |

## 5. Löydökset

| Tunnus | Vakavuus (PYSÄYTTÄÄ jaon / korjataan seuraavassa) | Kuvaus (mitä, missä, miten toistetaan) | Laite | Kuva |
|---|---|---|---|---|
| L1 | | | | |

Vakavuus: kaatuminen, jumi, kadonnut tallennus, hajonnut perustoiminto, uuden muutoksen puuttuminen tai nykivä/rikkinäinen oleellinen kohta = **PYSÄYTTÄÄ**. Pelkkä kosmeettinen = korjataan seuraavassa.

## 6. Päätös (yksi rivi PT:lle)

- [ ] **VIHREÄ**: ei löydöksiä, ulkoinen jako saa edetä.
- [ ] **PUNAINEN**: löydös pysäyttää ulkoisen jaon (L-numerot: …); ulkoisilla pysyy edellinen käännös, kunnes korjattu ja kierros uusittu vain muutosten osalta.

Viesti PT:lle (≤ 3 riviä): juna, SHA, VIHREÄ/PUNAINEN, löydösten määrä, raportin polku.

## Kuvasäännöt

- Täysikokoinen kuva laitteen ruudusta (iPad: fyysinen laite, ruutukaappaus; simu: `simctl io screenshot`); kohde ≥ 300 px.
- Kuvateksti omalle raidalleen kuvan ulkopuolelle: `merkitse.py ulos.png "Selite" kuva.png [ylä|ala]` (kuvapari ennen/jälkeen: kaksi kuvaa).
- Kuvan nimi: `<kohta>-<laite>-<pvm>.png` (esim. `M3-ipad-20261019.png`).
- Video vain, jos liikettä ei muuten näe (nykivä vieritys, animaatio).
