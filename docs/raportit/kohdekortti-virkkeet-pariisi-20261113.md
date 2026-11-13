# Kohdekorttien virkkeet ja vuosien kaksi lähdettä (SK 13.11.2026; KK 13.19 ja 13.24)

Sääntö (KK 13.24, kortti lahteet-ja-tarkistus 2–3): jokaisella päätevuodella kaksi ITSENÄISTÄ lähdettä (Wikipedia ja sen kieliversiot = yksi); ristiriidassa arvoa ei valita. Vain docs; PK vie data-PR:ssä vasta, kun KK on kuitannut. Lähderiviä ei näytetä tehtävässä (omistaja 13.09).

## Tila: kolme valmista, kaksi pidätetty

| Kohde | Lappu | Tila |
|---|---|---|
| Saint-Eustache | **1532–1637** | VALMIS: 1532 ja 1637 kahdesta+ lähteestä; 1754 kahdesta |
| Centre Pompidou | **1972–1977** | VALMIS: 1972 ja 1977 kahdesta itsenäisestä |
| Palais Garnier | 1861–1875 | **PIDÄTETTY: alku 1861 ei saa toista lähdettä, kaksi virallista lähdettä sanoo 1862** |
| Tour Saint-Jacques | 1509–1523 | **ALKU 1509 valmis; LOPPU 1523 ristiriidassa (Mérimée 1525, Structurae 1522)** |

## Korttivirkkeet

| Kohde | Virke | Mihin korttiin |
|---|---|---|
| Saint-Eustache | **Saint-Eustachea alettiin rakentaa vuonna 1532, ja kirkko vihittiin vuonna 1637. Länsijulkisivu on myöhempi: sitä alettiin rakentaa uudelleen vuonna 1754.** | Ei korttia datassa (`grep` js/ ja data/: ei osumaa) → **uusi kortti** `js/packs/nahtavyysjutut.js`, avain `'Saint-Eustache'`, `aika: '1532–1637'`; virke tekstin ensimmäiseksi. |
| Centre Pompidou | **Pompidou-keskuksen rakennustyöt alkoivat vuonna 1972, ja keskus avattiin vuonna 1977.** | Olemassa oleva kokoelmakortti `js/packs/maa-kategoriat.js` rivi 10070 (`teksti`:n alkuun, ennen "Centre Pompidou on Pariisin nykytaiteen museo…"); tai oma kohdekortti, `aika: '1972–1977'`. |
| Palais Garnier | *(ehdotus, EI VIEDÄ ennen KK:n sanaa)* "Rakennustyöt alkoivat vuonna 1861, ja ooppera avattiin vuonna 1875." | Olemassa oleva kortti `'Palais Garnier'` (`nahtavyysjutut.js` r. ~5096; `aika` nyt '1875' → '1861–1875'). Jos KK valitsee 1862: "Rakennustyöt alkoivat vuonna 1862, ja ooppera avattiin vuonna 1875.", `aika: '1862–1875'`. |
| Tour Saint-Jacques | *(ei uutta virkettä; vuodet ovat jo Matkaopas-kuvatekstissä `kulttuuri-kategoriat.js` r. 6478)* | Pidätetty, kunnes KK ratkaisee lopun 1523/1525. |

## Lähteet (haettu 13.11.2026; itse sivut luettu, ellei toisin mainita)

**Saint-Eustache 1532–1637; julkisivu 1754 — kaksi+ itsenäistä lähdettä.**
- 1532: Pariisin kaupunki (`paris.fr/pages/restauration-de-la-facade-occidentale-de-l-eglise-saint-eustache-26163`): "est construite à partir de 1532"; Structurae (`structurae.net/fr/ouvrages/eglise-saint-eustache`): "Début des travaux 1532", peruskivi 9.8.1532 (Jean de La Barre); en-Wikipedia "Saint-Eustache, Paris": "began in 1532".
- 1637 (vihkiminen): Structurae (kronologia "L'église est consacrée", 1637, infolaatikon valmistuminen 1637); en-Wikipedia: "in 1637, it was consecrated". Paris.fr sanoo valmistuneeksi 1634 ja en-Wikipedia työn jatkuneen 1632 asti — nämä ovat valmistumisvuosia, eivät vihkiminen; KK:n lappu käyttää alkua ja vihkimistä, joten ristiriita ei koske lappua.
- 1754: Pariisin kaupunki: länsijulkisivu "reconstruite à partir de 1754 sur un projet de Jean Mansart de Jouy"; en-Wikipedia: "rebuilt in 1754 under the direction of … Jean Mansart de Jouy". (Structurae lisää: alkuperäinen julkisivu 1617–1624, purettu 1688, rakennettu uudelleen 1754.)

**Centre Pompidou 1972–1977 — kaksi itsenäistä lähdettä.**
- 1972 (työn alku): Centre Pompidou, `mediation.centrepompidou.fr/education/ressources/ENS-architecture-Centre-Pompidou/comment_ca_fonctionne/p3.htm`: "Les travaux pour la construction du Centre Beaubourg commencent en mai 1972"; Fondazione Renzo Piano, `fondazionerenzopiano.org/en/project/centre-georges-pompidou/`: "Construction 1972 – 1977" (kilpailu 1970–1971).
- 1977 (avaus): Centre Pompidou (sama sivu): "2 février 1977 : le bâtiment terminé ouvre ses portes au public"; Fondazione Renzo Piano: Construction …–1977 ja näyttely Forumissa alkaen 2.2.1977; fr-Wikipedia (haettu): vihkiäiset 31.1.1977. Avaus 1977 kaikissa.
- Ristiriita, joka ei koske lappua: fr-Wikipedia "construction a duré de 1971 à 1977" ja RSHP:n sivu "1971–1977" ovat projektin (kilpailun) vuosia; rakennustyö alkoi 1972 (centrepompidou.fr, Fondazione Renzo Piano).

**Palais Garnier 1861–1875 — PIDÄTETTY (alku).**
- Alku 1861: vain en-Wikipedia "Palais Garnier" ("built … from 1861 to 1875"; kaivu 27.8.–31.12.1861, betoniperustukset tammikuussa 1862). Ei toista itsenäistä lähdettä.
- Alku 1862 (kaksi virallista, KUMOAA 1861): Mérimée/POP, `pop.culture.gouv.fr/notice/merimee/PA00089004` (haettu): "Campagnes de construction: 1862; 1875", Garnier "remporte le concours en 1860", työt "durent près de 15 ans"; Opéra national de Paris, `operadeparis.fr/apropos/theatres-et-ateliers/palais-garnier` (haettu): "Work began in 1862, when the first stone was laid on 21 July" (peruskivi 21.7.1862). Britannica ("begun in 1861") on hakutuloksen ote, sivu antoi 403 → ei luettu.
- Avaus 1875 vahvistettu kolmesta (Opéra de Paris "Le 5 janvier, le nouvel Opéra de Paris est inauguré", Mérimée "n'est inauguré qu'en 1875", en-Wikipedia 5.1.1875).
- **Päätös KK:lle:** lappu 1861–1875 (en-Wikipedia, kaivu) vai 1862–1875 (Mérimée + Opéra de Paris). Oma suositus: 1862–1875, koska kaksi itsenäistä virallista lähdettä.

**Tour Saint-Jacques 1509–1523 — loppu ristiriidassa.**
- Alku 1509: Pariisin kaupunki (`paris.fr/pages/sept-choses-a-savoir-sur-la-tour-saint-jacques-23432`): "En 1509 débute la construction d'un nouveau clocher"; Mérimée/POP (`pop.culture.gouv.fr/notice/merimee/PA00086479`): "s'échelonne de 1509 à 1525"; en-Wikipedia: "built in 1509 to 1523". Alku 1509 kolmesta lähteestä (Structurae 1508 on poikkeava, hakutuloksen ote).
- Loppu: Pariisin kaupunki: "La construction s'achève en 1523"; en-Wikipedia 1523; **Mérimée/POP 1525** (asennettu kellot 1525); Structurae 1522 (hakutuloksen ote, sivua ei luettu). Ristiriita: 1523 (paris.fr + en-Wikipedia) vs 1525 (Mérimée). **KK:lle:** lappu 1509–1523 vai vain alku "alettiin rakentaa 1509"; ei viedä dataan ennen KK:n sanaa.
