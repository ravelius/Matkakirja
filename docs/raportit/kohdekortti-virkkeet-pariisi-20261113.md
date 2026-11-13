# Kohdekorttien virkkeet ja vuosien kaksi lähdettä (SK 13.11.2026; KK 13.19 ja 13.24)

Sääntö (KK 13.24, kortti lahteet-ja-tarkistus 2–3): jokaisella päätevuodella kaksi ITSENÄISTÄ lähdettä (Wikipedia ja sen kieliversiot = yksi); ristiriidassa arvoa ei valita. Vain docs; PK vie data-PR:ssä vasta, kun KK on kuitannut. Lähderiviä ei näytetä tehtävässä (omistaja 13.09).

## Tila: kaikki neljä valmista (KK 13.25)

| Kohde | Lappu | Tila |
|---|---|---|
| Saint-Eustache | **1532–1637** | VALMIS: 1532 ja 1637 kahdesta+ lähteestä; 1754 kahdesta |
| Centre Pompidou | **1972–1977** | VALMIS: 1972 ja 1977 kahdesta itsenäisestä |
| Palais Garnier | **1862–1875** (KK 13.25) | VALMIS: 1862 Mérimée + Opéra de Paris; 1875 kolme lähdettä |
| Tour Saint-Jacques | **1509–1523** (KK 13.25) | VALMIS: 1509 kolme lähdettä; 1523 paris.fr + en-Wikipedia (viite Villain 1758); Mérimée 1525 ja Structurae 1522 poikkeamina |

## Korttivirkkeet

| Kohde | Virke | Mihin korttiin |
|---|---|---|
| Saint-Eustache | **Saint-Eustachea alettiin rakentaa vuonna 1532, ja kirkko vihittiin vuonna 1637. Länsijulkisivu on myöhempi: sitä alettiin rakentaa uudelleen vuonna 1754.** | Ei korttia datassa (`grep` js/ ja data/: ei osumaa) → **uusi kortti** `js/packs/nahtavyysjutut.js`, avain `'Saint-Eustache'`, `aika: '1532–1637'`; virke tekstin ensimmäiseksi. |
| Centre Pompidou | **Pompidou-keskuksen rakennustyöt alkoivat vuonna 1972, ja keskus avattiin vuonna 1977.** | Olemassa oleva kokoelmakortti `js/packs/maa-kategoriat.js` rivi 10070 (`teksti`:n alkuun, ennen "Centre Pompidou on Pariisin nykytaiteen museo…"); tai oma kohdekortti, `aika: '1972–1977'`. |
| Palais Garnier | **Oopperan peruskivi muurattiin vuonna 1862, ja talo avattiin vuonna 1875.** (KK 13.25; kilpailun voitto 1861 saa jäädä kortin tekstiin, kaivua 1861 ei mainita) | Olemassa oleva kortti `'Palais Garnier'` (`nahtavyysjutut.js` r. ~5096): lisää virke tekstin loppuun, `aika: '1862–1875'` (nyt '1875'). |
| Tour Saint-Jacques | *(ei uutta virkettä; vuodet 1509–1523 ovat jo Matkaopas-kuvatekstissä `kulttuuri-kategoriat.js` r. 6478, KK 13.25)* | Ei muutosta dataan. |

## Lähteet (haettu 13.11.2026; itse sivut luettu, ellei toisin mainita)

**Saint-Eustache 1532–1637; julkisivu 1754 — kaksi+ itsenäistä lähdettä.**
- 1532: Pariisin kaupunki (`paris.fr/pages/restauration-de-la-facade-occidentale-de-l-eglise-saint-eustache-26163`): "est construite à partir de 1532"; Structurae (`structurae.net/fr/ouvrages/eglise-saint-eustache`): "Début des travaux 1532", peruskivi 9.8.1532 (Jean de La Barre); en-Wikipedia "Saint-Eustache, Paris": "began in 1532".
- 1637 (vihkiminen): Structurae (kronologia "L'église est consacrée", 1637, infolaatikon valmistuminen 1637); en-Wikipedia: "in 1637, it was consecrated". Paris.fr sanoo valmistuneeksi 1634 ja en-Wikipedia työn jatkuneen 1632 asti — nämä ovat valmistumisvuosia, eivät vihkiminen; KK:n lappu käyttää alkua ja vihkimistä, joten ristiriita ei koske lappua.
- 1754: Pariisin kaupunki: länsijulkisivu "reconstruite à partir de 1754 sur un projet de Jean Mansart de Jouy"; en-Wikipedia: "rebuilt in 1754 under the direction of … Jean Mansart de Jouy". (Structurae lisää: alkuperäinen julkisivu 1617–1624, purettu 1688, rakennettu uudelleen 1754.)

**Centre Pompidou 1972–1977 — kaksi itsenäistä lähdettä.**
- 1972 (työn alku): Centre Pompidou, `mediation.centrepompidou.fr/education/ressources/ENS-architecture-Centre-Pompidou/comment_ca_fonctionne/p3.htm`: "Les travaux pour la construction du Centre Beaubourg commencent en mai 1972"; Fondazione Renzo Piano, `fondazionerenzopiano.org/en/project/centre-georges-pompidou/`: "Construction 1972 – 1977" (kilpailu 1970–1971).
- 1977 (avaus): Centre Pompidou (sama sivu): "2 février 1977 : le bâtiment terminé ouvre ses portes au public"; Fondazione Renzo Piano: Construction …–1977 ja näyttely Forumissa alkaen 2.2.1977; fr-Wikipedia (haettu): vihkiäiset 31.1.1977. Avaus 1977 kaikissa.
- Ristiriita, joka ei koske lappua: fr-Wikipedia "construction a duré de 1971 à 1977" ja RSHP:n sivu "1971–1977" ovat projektin (kilpailun) vuosia; rakennustyö alkoi 1972 (centrepompidou.fr, Fondazione Renzo Piano).

**Palais Garnier 1862–1875 (KK 13.25) — kaksi virallista lähdettä; 1861 ei saanut toista lähdettä.**
- Alku 1861: vain en-Wikipedia "Palais Garnier" ("built … from 1861 to 1875"; kaivu 27.8.–31.12.1861, betoniperustukset tammikuussa 1862). Ei toista itsenäistä lähdettä.
- Alku 1862 (kaksi virallista, KUMOAA 1861): Mérimée/POP, `pop.culture.gouv.fr/notice/merimee/PA00089004` (haettu): "Campagnes de construction: 1862; 1875", Garnier "remporte le concours en 1860", työt "durent près de 15 ans"; Opéra national de Paris, `operadeparis.fr/apropos/theatres-et-ateliers/palais-garnier` (haettu): "Work began in 1862, when the first stone was laid on 21 July" (peruskivi 21.7.1862). Britannica ("begun in 1861") on hakutuloksen ote, sivu antoi 403 → ei luettu.
- Avaus 1875 vahvistettu kolmesta (Opéra de Paris "Le 5 janvier, le nouvel Opéra de Paris est inauguré", Mérimée "n'est inauguré qu'en 1875", en-Wikipedia 5.1.1875).
- **Päätös (KK 13.25):** lappu 1862–1875 (Mérimée + Opéra de Paris); 1861 (en-Wikipedia, kaivu 8/1861) kirjattu poikkeamana, ei dataan. Kilpailun voitto 1861 (Opéra de Paris: 30.5.1861) saa jäädä kortin tekstiin.

**Tour Saint-Jacques 1509–1523 (KK 13.25: lappu pysyy; poikkeamat kirjattu).**
- Alku 1509: Pariisin kaupunki (`paris.fr/pages/sept-choses-a-savoir-sur-la-tour-saint-jacques-23432`): "En 1509 débute la construction d'un nouveau clocher"; Mérimée/POP (`pop.culture.gouv.fr/notice/merimee/PA00086479`): "s'échelonne de 1509 à 1525"; en-Wikipedia: "built in 1509 to 1523". Alku 1509 kolmesta lähteestä (Structurae 1508 on poikkeava, hakutuloksen ote).
- Loppu: Pariisin kaupunki: "La construction s'achève en 1523"; en-Wikipedia 1523; **Mérimée/POP 1525** (asennettu kellot 1525); Structurae 1522 (hakutuloksen ote, sivua ei luettu). Poikkeamat (kirjattu, ei dataan): Mérimée 1525 (kellot asennettu), Structurae 1522. **Itsenäisyys (KK 13.25 ehto):** en-Wikipedian viite vuodelle 1509–1523 on Étienne F. Villain, *Essai d'une histoire de la paroisse de St. Jacques de la Boucherie* (Paris: Prault, 1758), s. 69 (wikitext 13.11.) — ei paris.fr tai sen kopio, joten paris.fr (1523) ja en-Wikipedia (1523, lähde Villain 1758) ovat kaksi itsenäistä lähdettä. Villainin kirjaa en voinut lukea (Google Books pyysi captchaa, ei kierretty), eli sivun 69 sanamuoto on Wikipedian välittämä.
