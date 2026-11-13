# Kohdekorttien virkkeet: Saint-Eustache, Pompidou-keskus, Palais Garnier (SK 13.11.2026; KK 13.19)

Tehtävä: yksi virke kunkin kohteen korttiin, josta pelaaja oppii vaikeamman Yhdistä-tehtävän rakennusvuodet (Tour Saint-Jacques 1509–1523 · Saint-Eustache 1532–1632 · Palais Garnier 1861–1875 · Centre Pompidou 1972–1977). Vain docs; PK vie samassa data-PR:ssä kuin minitehtävät. Lähderiviä ei näytetä tehtävänäkymässä (omistaja 13.09); lähteet vain dataan/lähdeluetteloon.

| Kohde | Virke (suomeksi, pelin sävyyn) | Mihin korttiin |
|---|---|---|
| Saint-Eustache | **Saint-Eustachen rakentaminen kesti vuodesta 1532 vuoteen 1632, mutta länsijulkisivu on myöhempi: se rakennettiin uudelleen vuodesta 1754 alkaen.** | Ei korttia datassa (`grep` js/ ja data/: ei osumaa). **Uusi kortti** `js/packs/nahtavyysjutut.js`:iin, avain `'Saint-Eustache'`, `aika: '1532–1632'`; virke tekstin ensimmäiseksi lauseeksi. |
| Centre Pompidou | **Pompidou-keskus rakennettiin vuosina 1972–1977.** | Olemassa oleva kokoelmakortti `js/packs/maa-kategoriat.js` rivi 10070 (`nimi: 'Centre Pompidou — nykytaiteen kokoelma'`): lisää virke `teksti`:n alkuun ennen "Centre Pompidou on Pariisin nykytaiteen museo…". Jos oma kohdekortti halutaan, avain `'Centre Pompidou'`, `aika: '1972–1977'`. |
| Palais Garnier | **Palais Garnier rakennettiin vuosina 1861–1875.** | Olemassa oleva kortti `'Palais Garnier'` (`js/packs/nahtavyysjutut.js` rivi ~5096, `aika: '1875'`): lisää virke tekstin loppuun (viimeinen kappale) ja vaihda `aika: '1861–1875'`. Kortin nykyinen teksti sisältää jo kilpailun (12/1860) ja voiton (5/1861). |

## Lähteet ja huomiot (haettu 13.11.2026)

**Saint-Eustache 1532–1632; julkisivu 1754.**
- en-Wikipedia "Saint-Eustache, Paris": "Construction of the current church began in 1532 … and continued until 1632, and in 1637, it was consecrated"; "…necessitating the demolition of the facade, which was rebuilt in 1754 under the direction of … Jean Mansart de Jouy".
- Pariisin kaupunki, `paris.fr/pages/restauration-de-la-facade-occidentale-de-l-eglise-saint-eustache-26163` (haettu): kirkko "est construite à partir de 1532", rakennus "est achevée en **1634**"; länsijulkisivu "reconstruite à partir de 1754 sur un projet de Jean Mansart de Jouy". Julkisivu 1754 vahvistettu kahdesta lähteestä.
- **Päätepiste ei ole yksiselitteinen:** en-Wikipedia 1632, paris.fr 1634, vihkiminen 1637 kaikissa. Virke käyttää KK:n hyväksymää 1532–1632 (en-Wikipedia); jos KK haluaa varman päätepisteen, vaihtoehto on "vihittiin 1637". Tehtävän lappu 1532–1632 on siis lähteen "continued until 1632" mukainen; paris.fr:n 1634 on kaksi vuotta myöhemmin (KK harkitsee ennen dataa).

**Pompidou 1972–1977.**
- Centre Pompidou, `mediation.centrepompidou.fr/education/ressources/ENS-architecture-Centre-Pompidou/comment_ca_fonctionne/p3.htm` (haettu): "Les travaux pour la construction du Centre Beaubourg commencent en mai 1972"; "2 février 1977 : le bâtiment terminé ouvre ses portes au public".
- fr-Wikipedia "Centre national d'art et de culture Georges-Pompidou" (haettu): "La construction a duré de 1971 à 1977"; vihkiäiset 31.1.1977. 1971 on projektin/kilpailun vuosi; työ alkoi 1972, joten lappu 1972–1977.

**Garnier 1861–1875.**
- en-Wikipedia "Palais Garnier": "built for the Paris Opera from 1861 to 1875"; kaivu 27.8.–31.12.1861; avattu 5.1.1875.
- Opéra national de Paris (`operadeparis.fr/en/magazine/350-years/case/1314-the-palais-garnier-or-the-new-opera` ja `operadeparis.fr/apropos/histoire/lopera-au-19e-siecle`, hakutuloksen ote, EI itse sivulta): vihkiäiset 5.1.1875 (presidentti Mac Mahon), työ kesti 15 vuotta ja keskeytyi 1870 sodan ja Kommuunin vuoksi; sama sivu ajoittaa työn alun tammikuuhun 1862 (peruskivi 1862), kun en-Wikipedia laskee kaivun 1861:een. Lappu 1861–1875 on yleinen (en-Wikipedia, kaivu elokuussa 1861); poikkeama yhdellä vuodella alussa on mainittava, jos KK kysyy.
