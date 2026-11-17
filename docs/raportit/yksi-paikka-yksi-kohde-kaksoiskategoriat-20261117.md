# Yksi paikka = yksi kohde: kaksoiskategoriat viidessä kaupungissa

SK 17.11.2026, KK:lle. Omistajan syy (17.11. 09.29): hologrammia ei näy tarinapaikalla. **Tämä on vain lista ja ehdotus; datamuutoksia ei ole tehty, eikä tehdä ennen omistajan sanaa.**

## Miten lista tehtiin

- Kaupungit: Pariisi, Lontoo, Rooma, Wien, Amsterdam (`KAUPUNKIKARTAT.<id>.kohteet`, `js/packs/maakartat.js`; yhteensä 155 pistettä).
- Kaksoiskategoria = kaksi tai useampi pistettä saman kaupungin kartalla ≤ 130 m:n sisällä, ja ne ovat eri kategorioissa: kadonnut ihme (`hahmotelma-*`, `monumentit-eurooppa.js`, `fokuskohteet-*.js`), nähtävyys (tavallinen piste) tai tarinapaikka (`tarinapaikka: true`, merkki tiimalasi/lamppu/lyyra/skandaali). Sen jälkeen jokainen osuma luettiin ja arvioitiin käsin: onko kyse samasta paikasta (sama rakennus, tontti tai aukio) vai vain vierekkäisistä kohteista.
- Ei katettu: muiden kaupunkien pisteet; tarinapaikat, joilla ei ole omaa pistettä `maakartat.js`:ssä. Raja 130 m on karkea: se löytää kaksoiskategoriat, mutta jättää löytämättä tuplan, jonka koordinaatit ovat kauempana toisistaan.
- Mallitapauksia on jo kaksi (ks. alla): yksi merkki, jonka alla on useita nostoja.

## Ehdotettu sääntö koko maailmalle

1. **Yksi paikka = yksi merkki kartalla ja yksi kohde.** Paikka on sama rakennus, tontti, aukio tai katu. Naapurit (eri rakennus, > noin 50 m) pysyvät erillään, vaikka nimet menisivät päällekkäin.
2. **Merkin lajin valitsee kohde, ei tarina.** Kadonnut ihme voittaa (tähti; sääntö kartan-merkit-ja-nimet 9 sanoo jo "tähti voittaa"), muuten nähtävyys. Tarinapaikan oma merkki (tiimalasi, lamppu, lyyra, skandaali) poistuu, jos kohteella on jo merkki.
3. **Tarina muuttuu kohteen nostoksi.** Sääntö 11 ("saman aiheen nostot ovat yksi merkki, joka avautuu listaksi") on jo olemassa; kohteen nostot-kenttä on taulukko, kuten Tuileries'lla. Tarina säilyy sellaisenaan, vain sen oma piste ja oma merkki poistuvat.
4. **Hologrammi seuraa kohdetta.** Kun tarina on kadonneen kohteen noston alla, hologrammi näkyy samalla kohteella; tämä korjaa omistajan havainnon.
5. **Jos tarina ei tapahtunut kohteen paikalla**, se ei saa ankkuria väärästä paikasta (esim. Kaulanauha 1785 Panthéonissa). Silloin tarina on joko oman oikean osoitteensa piste tai pelkkä nostolista ilman karttapistettä; omistajan valinta.
6. **Testi:** `tools/tarkista-karttamerkit.mjs`-tyyppinen tarkistus, joka listaa kaksi pistettä ≤ 50 m:n sisällä, ellei toista ole merkitty `tarinapaikka: false` (kuten Bastilji 1789 tänään).

## Mallitapaukset (jo yksi merkki, ei muutosta)

| Paikka | Miten |
|---|---|
| Tuileries'n palatsi (Pariisi) | Yksi piste, `nosto: ['syvennys-pariisi-tuileriat', 'tuileries']`: palatsi ja Tuileries 1883 -tarina saman merkin alla. |
| Bastilji ja Bastilji 1789 (Pariisi) | Sama koordinaatti; tarina on `tarinapaikka: false`, joten merkkejä on yksi (tähti). |
| St Paulin katedraali ja Old St Paul's (Lontoo) | `fokuskohteet-gbr.js`: "kartalle riittää yksi merkki" (ks. kohta L5; kartalla pisteet ovat silti vielä kaksi). |

## Pariisi

| # | Paikka | Kategoriat ja pisteet | Väli | Ehdotus |
|---|---|---|---|---|
| P1 | Palais d'Orsay | kadonnut (Palais d'Orsay) + nähtävyys/museo (Orsayn taidemuseo) | 37 m | Yksi kohde: kadonnut tähti; museo kohteen nostoksi. Museo seisoo palatsin tontilla. |
| P2 | Palais de l'Industrie | kadonnut + nähtävyys (Grand Palais) | 36 m | Sama: yksi tähti, Grand Palais nostoksi. Grand Palais seisoo kadonneen tontilla. |
| P3 | Eiffel-torni | nähtävyys (Eiffel-torni) + tarina (Eiffel-torni 1888) + tarina (Lustig 1925) | ≤ 89 m | Yksi merkki Eiffel-torni; molemmat tarinat nostoiksi. Sama torni, kolme pistettä. |
| P4 | Palais Garnier | nähtävyys + tarina (Piaf ja Django) | 0 m | Yksi merkki Garnier; tarina nostoksi. Piste on tehty ankkuriksi tarkoituksella (kommentti maakartat.js), joten yhdistäminen on vain merkin poisto. |
| P5 | Panthéon | nähtävyys + tarina (Kaulanauha 1785) | 0 m | **Omistajan valinta.** Kaulanauha-juttu ei tapahtunut Panthéonissa; piste on väliaikainen ankkuri (kommentti: "Versailles on rajauksen ulkopuolella"). Vaihtoehdot: (a) nostoksi Panthéonille ankkurina, (b) pois kartalta, vain nostolista. Sääntö 5 ei suosi (a):ta. |
| – | Bastilji, Tuileries | – | – | Jo yksi merkki (ks. mallitapaukset). |

Lähellä mutta eri paikka, ei yhdistetä: Grand Châtelet – Tour Saint-Jacques (117 m), Les Halles – Saint-Eustache (124 m), Monet 1874 – Lumière 1895 (105 m; molemmat tarinapaikkoja, Boulevard des Capucines, eri osoitteet; sama kategoria, joten ei kaksoiskategoria).

## Lontoo

| # | Paikka | Kategoriat ja pisteet | Väli | Ehdotus |
|---|---|---|---|---|
| L1 | Greenwichin palatsi | kadonnut + nähtävyys (Old Royal Naval College) | 93 m | Yksi kohde: kadonnut tähti; ORNC nostoksi. ORNC seisoo palatsin paikalla. Queen's House ja Royal Observatory pysyvät omina kohteinaan. |
| L2 | Euston Arch | kadonnut + tarina (Sähkötin 1837, Euston station) | 112 m | Yksi kohde: Euston Arch; Sähkötin nostoksi (sama asema, kaaren tontti). Tämä on se hologrammitapaus: tarina ja kadonnut ovat nyt kaksi pistettä. |
| L3 | Westminsterin palatsi | kadonnut (Vanha Westminsterin palatsi) + nähtävyys (Westminsterin palatsi) | 36 m | Yksi kohde: vanha palatsi tähdeksi, nykyinen palatsi nostoksi. Big Ben (130 m) on saman palatsin osa, mutta oma tunnettu kohde; jätetään erilleen. |
| L4 | Trafalgar Square | nähtävyys (aukio) + tarina/esine (Neljäs jalusta) | 0 m | Yksi merkki Trafalgar Square; Neljäs jalusta nostoksi. |
| L5 | St Paulin katedraali | nähtävyys (Old St Paul's) + nähtävyys (Pyhän Paavalin katedraali) | 71 m | Pelkkä tupla, ei kaksoiskategoria: fokuskohde sanoo itse "riittää yksi merkki". Poista Old St Paul's -piste tai yhdistä; kysy KK:lta, sillä Old St Paul's -nimiö on voinut jäädä 6943:n jälkeen. |

Lähellä mutta eri paikka: Victoria Memorial – Buckinghamin palatsi (103 m).

## Rooma

| # | Paikka | Kategoriat ja pisteet | Väli | Ehdotus |
|---|---|---|---|---|
| R1 | Trevin suihkulähde | nähtävyys + tarina (Kolikko olan yli) + tarina (Aqua Virgo) | 0 m | Yksi merkki Trevi; molemmat tarinat nostoiksi. Kolme pistettä samalla koordinaatilla. |
| R2 | Colosseum | nähtävyys (+ fokuskohde `colosseum`) + tarina (Areenan kellari) | 0 m | Yksi kohde: Colosseum; Areenan kellari nostoksi. |
| R3 | Vatikaani | nähtävyys (Pietarinkirkko) + tarina (Michelangelo 1510, Sikstuksen kappeli) + nähtävyys (Vatikaanin palatsi) | 120 m / ~175 m | Michelangelon tarina kuuluu Vatikaanin palatsin/Sikstuksen kappelin kohteen noston alle, ei Pietarinkirkkoon. Pietarinkirkko pysyy omana kohteenaan. |
| – | Meta Sudans | tarina (kadonnut suihkulähde) | 127 m Colosseumista | Oma kohde, ei sama paikka. Huomio: tämä on oikeasti kadonnut kohde, jolla on vain tarinapiste; jos hologrammi halutaan, se on oma kadonneiden eräänsä, ei yhdistämistä. |

Lähellä mutta eri paikka: Pantheon – Norsu ja obeliski (Piazza della Minerva) – Nasone (≤ 88 m); nimiöt voivat osua päällekkäin, mutta paikat ovat eri.

## Wien

| # | Paikka | Kategoriat ja pisteet | Väli | Ehdotus |
|---|---|---|---|---|
| W1 | Kärntnertor-teatteri | kadonnut + tarina (Beethoven 1824, yhdeksäs sinfonia) | ≤ 110 m | Yksi kohde: Kärntnertor-teatteri; Beethoven nostoksi. Ensi-ilta oli juuri siellä. Heinrichshof ja Valtionooppera ovat eri rakennuksia ja jäävät omiksi kohteikseen. |
| W2 | Vanha Burgtheater | kohde + tarina (Mozart 1786, Figaro) | ≤ 56 m | Yksi kohde: Vanha Burgtheater; Mozart nostoksi. Lipizzanit (Michaelerplatz) ovat eri paikka. |
| W3 | Praterin jättiratas | nähtävyys (Jättiratas) + tarina (Praterin jättiratas) | 0 m | Pelkkä tupla samalla koordinaatilla: yksi merkki, tarina nostoksi. |

## Amsterdam

| # | Paikka | Kategoriat ja pisteet | Väli | Ehdotus |
|---|---|---|---|---|
| A1 | Rijksmuseum | nähtävyys/museo + tarina (Maitotyttö) | 0 m | Yksi kohde: Rijksmuseum; Maitotyttö nostoksi. |
| A2 | Dam | nähtävyys (Kuninkaanpalatsi, nosto haikarat) + kadonnut (Vanha raatihuone) + nähtävyys (Waag op de Dam) | ≤ 95 m | Vanha raatihuone ja Kuninkaanpalatsi ovat sama tontti: yksi kohde, kadonnut tähti (vanha raatihuone), palatsi ja haikaratarina nostoiksi. Waag on eri rakennus ja jää omaksi kohteekseen. |

Lähellä mutta eri paikka: Kapein talo – Yövartio (115 m; molemmat tarinapaikkoja, ei kaksoiskategoria).

## Yhteenveto

- **Ehdotusrivejä 18:** Pariisi 5 (P1–P5), Lontoo 5 (L1–L5; L5 on pelkkä tupla), Rooma 3 (R1–R3), Wien 3 (W1–W3), Amsterdam 2 (A1–A2). Lisäksi kolme jo yhtenäistä mallitapausta ja yksi huomio (Meta Sudans).
- **Poistuvia pisteitä** (jos kaikki hyväksytään): Pariisi 6, Lontoo 5, Rooma 4, Wien 3, Amsterdam 2 eli 20 pistettä; kohteita ei poistu, vain merkit.
- **Omistajan valinta:** P5 (Kaulanauha: ankkuri vai pois), L5 (Old St Paul's), R3 (Michelangelo).
- **Hologrammi:** korjaantuu suoraan tapauksissa L2, W1, W2, A2, P1, P2, L1, L3 (tarina tai museo kadonneen kohteen alle). Muissa tapauksissa kyse on vain siitä, että kartalla on yksi merkki kahden tai kolmen sijaan.
- **Mitä data muuttuisi:** `maakartat.js`:n piste poistuu, ja kohteen `nosto` muuttuu taulukoksi (kuten Tuileries); tarinan teksti, kuva ja kysymykset pysyvät. Tarkistettava: tiimalasi/lamppu/lyyra-merkin poiston testit ja karttaselite (kartan-merkit-ja-nimet 15).
