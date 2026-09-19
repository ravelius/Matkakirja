# Viesti Fablelle: Luxemburgin hahmotelmanostojen kohdelista (vaihe 1)

19.9.2026, Sonnet-sisältösessio "Matkakirja Sonnet nostot", haara `sonnet-nostot-lux`
(pohja origin/main a2acffc2, v1964). **15 ehdotusta, odotan hyväksyntää ennen vaihetta 2.**
Sisältöjä ei ole vielä kirjoitettu. Vaiheessa 2 mukaan tulevat myös rahavisat (~6 noston kenttä `visa`, pieni maa) uuden visakielisäännön mukaan.

## Miten lista tarkistettiin

- Koordinaatit haettu en-Wikipedian rajapinnasta (`prop=coordinates`, 19.9.2026); artikkeli taulukossa. Yhtään lukua ei ole arvattu. Luxembourg Cityn piste on kaupungin artikkelista (Bockin kasemattien alue), Grevenmacherin ja Remichin omista artikkeleista.
- Laudat ja fokuslehden osuma laskettu pelin omalla työkalulla (`tools/johda-maastokohteet.mjs` `laudat`, `osuuLehteen('LUX')`): **15/15 osuu Luxemburgin fokuslehteen.** **Karkean renkaan ulkopuolella 3 kohdetta**: Vianden 0,4, Schengen 0,3 ja Grevenmacher 0,2 lautayksikköä (Pohjois- ja Moselin raja; rengas on yksinkertaistettu; koordinaatit ovat Wikipedian todelliset); reunalla sisäpuolella Remich 0,4, Echternach 0,6, Mondorf 1,4, Esch 1,5.
- **Luxemburgissa ei ole pelikaupunkia eikä yhtään nykyistä karttanostoa** (`cityCountry` LUX tyhjä, `nostojenKarttapaikat()` antaa 0 LUX-riviä), joten kaupunkikohteet (Luxembourg City, Esch, Diekirch) ovat sallittuja eikä päällekkäisyyttä nykyisten kanssa voi tulla. Kaupunki voi tulla myöhemmin omistajan päätöksellä.
- **Luxemburg on pieni** (laudalla vain noin 8 × 10 yksikköä): nostot on **harvennettu keskenään vähintään 3,1 lautayksikön päähän**. Lähimmät parit: Schengen – Mondorf 3,1, Bourscheid – Diekirch 3,1, Beaufort – Larochette 3,2, Remich – Schengen 3,2. Tiheämmät ehdokkaat pudotettu: Müllerthal/Berdorf (2,2 Beaufortista), Esch-sur-Sûre ja Yläsûren tekojärvi (2,4 Wiltzistä; tekojärvi 5,3 BEL Bastognesta), Troisvierges (2,9 Clervaux'sta), Mersch (2,3), Hollenfels (0,6 Ansembourgista), Fischbach (1,8 Larochettesta), Brandenbourg (1,9 Bourscheidistä), Ettelbruck (2,2 Diekirchistä), Wormeldange (3,2 Remichistä), Differdange ja Dudelange (3,2 ja 3,5 Eschistä).
- **Naapurimaiden nostot rajan takana** (`nostojenKarttapaikat()`, eri ISO): Wiltz – BEL Bastogne 6,8 (alle 7), Clervaux – Bastogne 9,9, Bourscheid 12,3; muut ≥ 13. Eri maa, ei haittaa.
- **Ösling** ei ole erillisenä (2,7 Clervaux'sta): Ösling kerrotaan Clervaux'n tekstissä. **Müllerthal** kerrotaan Beaufort- ja Echternach-tekstissä (Pikku-Sveitsi).
- Tyypit ovat pelin oman `KOHDE_TYYPPISYMBOLIT`-taulun arvot (luonto = vuori / saari / jarvi / meri / joki; muut historia, kulttuuri, ruoka, kauppa, tekniikka, merenkulku).
- **1873-näkökulma**: Luxemburgin suurherttuakunta on Hollannin kuninkaan henkilöunioni (Vilhelm III suurherttuana; Nassau-Weilburg 1890); Lontoon sopimus 1867 julisti maan pysyvästi puolueettomaksi ja määräsi Luxemburgin linnoituksen purettavaksi (purku alkaa 1867, kestää 16 vuotta: nappi); Luxemburg kuuluu Saksan tulliliittoon (Zollverein) vuoteen 1919; rauta- ja terästeollisuus alkaa 1870-luvulla (Esch); Schengenin sopimus 1985 on vasta myöhemmin (nappi "vasta 1985"); Vianden: Victor Hugon oleskelu 1870–71 (jos artikkelissa). Nappi-alaotsikot kertovat kohteen 1873.
- Lähdesääntö: artikkelien johdanto-osat on luettu ja avainväitteet tarkistetaan koko artikkeleista. Vaiheessa 2 kirjoitan tekstit vain artikkelin tukemista väitteistä ja kirjaan poikkeamat.

## Lista

### Kulttuuri (2)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 1 | hahmotelma-clervaux | Clervaux ja Ösling | kulttuuri | 50,0544 / 6,0293 | Clervaux Abbey | Pohjoinen Ösling: Clervaux'n benediktiiniluostari (1909) ja linna; Ardennien Luxemburgin puoli. |
| 2 | hahmotelma-wiltz | Wiltz | kulttuuri | 49,9661 / 5,9325 | Wiltz | Ylä-Luxemburgin kaupunki, linna; **BEL Bastogne 6,8.** |

### Historia (9)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 3 | hahmotelma-vianden | Viandenin linna | historia | 49,935 / 6,2022 | Vianden Castle | Sûre-joen laakson linna; Victor Hugon oleskelu 1871. Renkaan ulkopuolella 0,4. |
| 4 | hahmotelma-echternach | Echternach | historia | 49,8117 / 6,4217 | Echternach | Pyhän Willibrordin luostari (698), hyppelykulkue; Müllerthalin (Pikku-Sveitsin) portti. |
| 5 | hahmotelma-beaufort | Beaufortin linna | historia | 49,8339 / 6,2856 | Beaufort Castle, Luxembourg | Müllerthalin linnan rauniot ja uusi renessanssilinna. |
| 6 | hahmotelma-bourscheid | Bourscheidin linna | historia | 49,9053 / 6,0798 | Bourscheid Castle | Luxemburgin suurimpia keskiaikaisia linnoja. |
| 7 | hahmotelma-luxembourg | Luxembourgin kaupunki | historia | 49,6114 / 6,13 | Luxembourg City | Bockin kasemattit ja "pohjoisen Gibraltar": Lontoon sopimus 1867 → linnoituksen purku. |
| 8 | hahmotelma-larochette | Larochette | historia | 49,7836 / 6,2194 | Larochette | Linna kalliolla, Pikku-Sveitsin eteläosa. |
| 9 | hahmotelma-useldange | Useldangen linna | historia | 49,7683 / 5,9803 | Useldange Castle | Linnan rauniot Attert-joen laaksossa. |
| 10 | hahmotelma-schengen | Schengen | historia | 49,4694 / 6,3589 | Schengen, Luxembourg | Moselin kylä; sopimus tehtiin vasta 1985 (nappi 1873: viinikylä Moselin rajalla). Renkaan ulkopuolella 0,3. |
| 11 | hahmotelma-diekirch | Diekirch | kauppa | 49,8681 / 6,1567 | Diekirch | Sûren varren vanha kaupunki; olutpanimo (1871). |

### Kulttuuri, ruoka ja tekniikka (4)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 12 | hahmotelma-remich | Remich | ruoka | 49,5444 / 6,3667 | Remich | Moselin viini- ja kauppakaupunki; kuohuviini. Renkaan sisäreunalla 0,4. |
| 13 | hahmotelma-grevenmacher | Grevenmacher | ruoka | 49,6806 / 6,4417 | Grevenmacher | Moselin viinialue, Bernard-Massard-kuohuviini. Renkaan ulkopuolella 0,2. |
| 14 | hahmotelma-esch | Esch-sur-Alzette | tekniikka | 49,4969 / 5,9806 | Esch-sur-Alzette | Rauta- ja terästeollisuus alkaa 1870-luvulla (punainen maa). |
| 15 | hahmotelma-mondorf | Mondorf-les-Bains | kulttuuri | 49,5069 / 6,2806 | Mondorf-les-Bains | Kylpyläkaupunki (lämpölähteet 1847). **Schengen 3,1.** |

## Huomiot Fablelle

1. **Luxemburgissa ei ole pelikaupunkia, ei nostoja**: siksi kaupunkikohteet sallittuja. Lista on 15 (Belgian tavoin harvennettu); voin karsia 12:een (pudotettaisiin Mondorf, Diekirch, Useldange), jos haluat vähemmän.
2. **Ösling** ja **Müllerthal** eivät ole erillisiä (< 3 yksikköä muista); ne kerrotaan Clervaux'n ja Beaufort/Echternach-tekstissä.
3. **Herkät aiheet (13+)**: Wiltz/Clervaux (Ardennien taistelu 1944) jätetään pois ja teksti pysyy luostarissa ja linnassa; Luxembourgin kaupunki kertoo linnoituksen purun 1867.
4. **Tyypit tarkistan artikkelien mukaan** vaiheessa 2 (Diekirchin olut, Eschin rauta, Mondorfin kylpylä) ja kirjaan poikkeamat.
5. **Rahavisat**: vaiheessa 2 ~6 visaa (eri tyyppejä, 4 vaihtoehtoa, lyhyet vaihtoehdot ≤ 40 merkkiä, kysymys ≤ 95 merkkiä, vastaus noston tekstistä).
6. **Rekisteröinti** (vaihe 2): import/lohko v1964-pohjan mukaan.
