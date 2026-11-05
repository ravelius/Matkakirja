# Opéra 24j — kahden oton diagnostiikka

Tämä on paikallinen diagnostinen koonti, ei toimitus eikä hyväksyntä. Molemmat raakaversiot ylittävät sitovan mittatoleranssin; kolmatta ottoa tai retopoa ei tehdä ilman tilaajan vastausta.

## Mittaportti

Molempien mallien pituus Z = 222 m. Tilaustavoitteet ovat leveys/pituus 0,678 ja korkeus/pituus 0,44 (sallittu suhteellinen ero ±7 %). Näin sallitut suhdealueet ovat leveydelle 0,63054–0,72546 ja korkeudelle 0,4092–0,4708.

| Otto | W × H × L (m) | W/L | Poikkeama tavoitteesta | H/L | Poikkeama tavoitteesta | Tulos |
|---|---:|---:|---:|---:|---:|---|
| 1 | 131,616 × 85,488 × 222 | 0,592863 | −12,557 % | 0,385083 | −12,481 % | FAIL |
| 2 | 133,323 × 84,446 × 222 | 0,600552 | −11,423 % | 0,380389 | −13,548 % | FAIL |

Poikkeamaa ei korjata akselikohtaisella venytyksellä. Retopo ei auta mittaporttiin, joten malleihin ei tehty paikallista geometriaa.

## Muut tarkistukset

- Otto 1:n shape-gate vahvisti Front +Z -päädyn, näyttämötornin kupolin takana ja sivutornien umpiset jalustat. Suuntaportti läpäisi.
- Pääagentti tarkisti kaikki 14 täysikokoista ortoesikatselua. Molemmat otot ovat samoin päin: Front on +Z/etelä, näyttämötorni on kupolin takana, kolme kupolia, kaksi kultaista patsasryhmää ja sivutornien umpipohjat säilyvät.
- Otto 2:n kupolin kultalyhdyssä on rengasmainen reikä/harva reunus. Sen itäesikatselussa oli 3 mustaa pikseliä; muut otto 2:n ortot 0. Otto 1:n seitsemässä esikatselussa mustia pikseleitä 0.
- Kattotekstuuri aaltoilee molemmissa. Visuaalisesti otto 1 on varovaisesti arvioiden parempi, jos tilaaja hyväksyy mittapoikkeaman. Tämä ei muuta mitta-Failia eikä ole hyväksyntä.

## Käyttö- ja päätösraja

Otot käyttivät Tripo-jobia `d64a7426-0dfe-45b4-a450-45afb43b401d`: ensimmäinen 45 krediittiä, toinen Free Retry 0 krediittiä; yhteensä 45. Kaksi ottoa on käytetty. Odotetaan tilaajan päätöstä: hyväksyykö hän jommankumman raakaversion mittapoikkeaman vai haluaako hän täsmentää lähteitä/tavoitesuhteita. Kolmas otto ei käynnisty ilman vastausta.

Paketin checkpoint.json päivitetty kahden epäonnistuneen otoksen päätösodotukseen. Ei kolmatta generointia.
