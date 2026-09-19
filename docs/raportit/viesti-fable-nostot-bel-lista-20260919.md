# Viesti Fablelle: Belgian hahmotelmanostojen kohdelista (vaihe 1)

19.9.2026, Sonnet-sisältösessio "Matkakirja Sonnet nostot", haara `sonnet-nostot-bel`
(pohja origin/main 5e02e295, v1959). **26 ehdotusta, odotan hyväksyntää ennen vaihetta 2.**
Sisältöjä ei ole vielä kirjoitettu. Vaiheessa 2 mukaan tulevat myös rahavisat (~10 noston kenttä `visa`).

## Miten lista tarkistettiin

- Koordinaatit haettu en-Wikipedian rajapinnasta (`prop=coordinates`, 19.9.2026); artikkeli taulukossa. Yhtään lukua ei ole arvattu.
- Laudat ja fokuslehden osuma laskettu pelin omalla työkalulla (`tools/johda-maastokohteet.mjs` `laudat`, `osuuLehteen('BEL')`):
  **26/26 osuu Belgian fokuslehteen.** Kaikki 26 ovat pelin karkean BEL-renkaan sisällä, mutta kolme aivan reunalla: Zwin 0,1, Orval 0,4,
  Ében-Émael 0,5 lautayksikköä renkaan reunasta (rannikko ja raja; koordinaatit ovat Wikipedian todelliset). Muut: Kalmthoutse Heide 1,6,
  Hoge Kempen 2,3, Bastogne 2,4, Bouillon 2,4, Semois 2,7, High Fens 3,0, Chimay 3,9, Tournai 4,1, Grand-Hornu 4,1, Turnhout 4,7.
- **Belgiassa ei ole yhtään nykyistä karttanostoa eikä pelikaupunkia** (`nostojenKarttapaikat()` antaa 0 BEL-riviä; `cityCountry`-taulussa ei BEL:ää),
  joten päällekkäisyyttä ja kaupungin kohdalla -rajaa (7) ei voi rikkoa. Belgia on pieni, joten ehdotukset on **harvennettu keskenään**:
  lähimmät parit ovat High Fens – Spa 7,5, Lion's Mound – Tervuren 7,7, Zwin – Bruggen tuomiokirkko/Belfry 8,1, Hoge Kempen – Ében-Émael 8,9.
  (Tiheämmät ehdokkaat pudotettu: Signal de Botrange, Gileppen pato, Herve, Hallerbos, Villers-la-Ville, Spiennes, Binche, Stavelot, Herstal,
  Westvleteren, Diksmuide, Mesen, Geel — kaikki < 7 yksikön päässä jostakin valitusta, ja tämän vuoksi nimiöt eivät kilpaile samalla alalla.)
- Ei suuria kaupunkeja: Bryssel, Antwerpen, Gent, Liège, Charleroi, Namur, Leuven, Mechelen, Mons, Bruges (kaupunkina) jätetty pois. Mukana on
  pieniä kaupunkeja ja paikkoja, joiden kohde on jokin muu kuin kaupunki: Bruggen Belfry-torni, Dinantin Sax, Spa, Durbuy (kaupunki-tunnus),
  Oudenaarde (kuvakudokset), Turnhout (pelikortit), Kortrijk (Kultaisten kannusten taistelu), Tervuren (museo).
- Tyypit ovat pelin oman `KOHDE_TYYPPISYMBOLIT`-taulun arvot (luonto = vuori / saari / jarvi / meri / joki; muut historia, kulttuuri, ruoka, kauppa, tekniikka).
  Belgiassa ei ole saaria eikä järviä; luontotyyppejä puuttuu metsälle, nummelle ja luolalle, joten Hoge Kempen ja Kalmthoutse Heide ovat `kulttuuri`
  (kuten Dwingelderveld NLD:ssä) ja Han-sur-Lessen luolat `joki` (Lesse virtaa niiden läpi).
- Lähdesääntö: artikkelien johdanto-osat on luettu ja avainväitteet grep-tarkistettu koko artikkelista. Geel (perhehoito) pudotettiin, koska artikkeli ei mainitse
  sitä. Vaiheessa 2 kirjoitan tekstit vain artikkelin tukemista väitteistä ja kirjaan poikkeamat.

## Lista

### Luonto (6)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 1 | hahmotelma-high-fens | Hautes Fagnes (High Fens) | vuori | 50,5444 / 6,0778 | High Fens | Belgian suurin luonnonsuojelualue: nummi- ja turvesoiden ylänkö, jonka korkein kohta Signal de Botrange (694 m) on koko maan korkein. |
| 2 | hahmotelma-semois | Semois | joki | 49,8806 / 4,7384 | Semois | Ardenneilta Maasiin virtaava joki, jonka mukaan on nimetty paikallinen tupakkalaji. |
| 3 | hahmotelma-han-sur-lesse | Han-sur-Lessen luolat | joki | 50,1261 / 5,1879 | Han-sur-Lesse | Lesse-joen kalliokukkulaan uurtama luolakompleksi, jonne turistit ajavat maaseudun raitiotiellä. |
| 4 | hahmotelma-zwin | Zwin | meri | 51,3583 / 3,3653 | Zwin | Pohjanmeren rannikon luonnonsuojelualue, entinen vuorovesisalmi, joka yhdisti Bruggen mereen (1134). |
| 5 | hahmotelma-hoge-kempen | Hoge Kempen | kulttuuri | 51,0 / 5,6667 | Hoge Kempen National Park | Flanderin ensimmäinen kansallispuisto (2006): nummea ja mäntymetsää Maasin ja Demerin vedenjakajalla. |
| 6 | hahmotelma-kalmthout | Kalmthoutse Heide | kulttuuri | 51,3953 / 4,4411 | De Zoom–Kalmthoutse Heide Cross-Border Park | Belgian ja Alankomaiden yhteinen rajapuisto, jota peittää suurelta osin nummi. |

### Historia (7)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 7 | hahmotelma-lions-mound | Waterloon leijonakumpu | historia | 50,6783 / 4,4047 | Lion's Mound | Vilhelm I:n vuonna 1820 rakennuttama keinotekoinen kumpu Waterloon taistelupaikalla (valmis 1826). |
| 8 | hahmotelma-menin-gate | Menin Gate | historia | 50,8522 / 2,8917 | Menin Gate | Ypresin muistomerkki Ensimmäisessä maailmansodassa kaatuneille, joiden hautoja ei tunneta. |
| 9 | hahmotelma-bastogne | Bastognen muistomerkki | historia | 50,0097 / 5,7389 | Battle of the Bulge Monument | Viisisakarainen tähti Ardennien taistelun amerikkalaisten muistoksi (1946 alkaen). |
| 10 | hahmotelma-bouillon | Bouillonin linna | historia | 49,7929 / 5,0657 | Bouillon Castle | Semoisin mutkassa kallionkielekkeellä; Godfrey of Bouillon peri sen 1082. |
| 11 | hahmotelma-tournai | Tournain tuomiokirkko | historia | 50,6066 / 3,3889 | Tournai Cathedral | 1100-luvulla alkanut romaaninen ja goottilainen kirkko, Unescon maailmanperintöä (2000). |
| 12 | hahmotelma-eben-emael | Ében-Émaelin linnake | historia | 50,7976 / 5,6790 | Fort Ében-Émael | "Läpipääsemätön" linnake (1931–35), jonka saksalaiset purjelentäjät ottivat 10.–11.5.1940. |
| 13 | hahmotelma-kortrijk | Kultaisten kannusten taistelu | historia | 50,8289 / 3,2758 | Battle of the Golden Spurs | Flanderin kaupunkien jalkaväki löi ranskalaisen ritariston Kortrijkin luona 1302. |

### Kulttuuri ja ruoka (8)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 14 | hahmotelma-orval | Orvalin luostari | ruoka | 49,6397 / 5,3489 | Orval Abbey | Sistersiläisluostari (1132), joka valmistaa trappistiolutta ja juustoa. |
| 15 | hahmotelma-chimay | Chimay | ruoka | 50,05 / 4,3167 | Chimay | Trappistiolut ja -juusto Scourmontin luostarin munkeilta. |
| 16 | hahmotelma-dinant | Dinant | kulttuuri | 50,2667 / 4,9167 | Dinant | Maasin varren kaupunki, jossa Adolphe Sax, saksofonin keksijä, syntyi. |
| 17 | hahmotelma-spa | Spa | kulttuuri | 50,4925 / 5,8642 | Spa, Belgium | Ardennien kylpyläkaupunki, jonka nimestä tuli yleisnimi kylpylälle. |
| 18 | hahmotelma-brugge-belfry | Bruggen Belfry | kulttuuri | 51,2083 / 3,2247 | Belfry of Bruges | Keskiaikainen kellotorni, jossa oli aarrekammio ja kaupungin arkisto; Unescon perintöä. |
| 19 | hahmotelma-tervuren | Tervurenin Afrikka-museo | kulttuuri | 50,8309 / 4,5185 | Royal Museum for Central Africa | Rakennettu esittelemään kuningas Leopold II:n Kongon vapaavaltiota maailmannäyttelyssä 1897. |
| 20 | hahmotelma-durbuy | Durbuy | kulttuuri | 50,3522 / 5,4563 | Durbuy | Kaupunki, joka mainostaa itseään "maailman pienimpänä". |
| 21 | hahmotelma-oudenaarde | Oudenaarde | kulttuuri | 50,85 / 3,6 | Oudenaarde | Kuvakudosten tuotantokeskus 1400–1700-luvuilla (Scheldtin ranta). |

### Tekniikka ja kauppa (5)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 22 | hahmotelma-canal-du-centre | Canal du Centren laivanostimet | tekniikka | 50,4781 / 4,11 | Canal du Centre (Belgium) | Neljä hydraulista laivanostinta (1888–1917), jotka nostavat 66 metriä; Unescon perintöä. |
| 23 | hahmotelma-grand-hornu | Grand-Hornu | tekniikka | 50,4353 / 3,8394 | Grand-Hornu | Henri De Gorgen 1810–1830 rakentama hiilikaivos ja työläiskylä; Unescon perintöä. |
| 24 | hahmotelma-bois-du-cazier | Bois du Cazier | tekniikka | 50,3811 / 4,4433 | Bois du Cazier | Marcinellen hiilikaivos, jonka onnettomuudessa 8.8.1956 kuoli 262 miestä (paljon italialaisia). |
| 25 | hahmotelma-seraing | Seraingin terästehdas | tekniikka | 50,5833 / 5,5 | Seraing | John Cockerillin vuonna 1817 perustama yhtiö, joka mullisti teräksen valmistuksen. |
| 26 | hahmotelma-turnhout | Turnhout | kauppa | 51,3167 / 4,95 | Turnhout | Tunnettu pelikorttiteollisuudestaan. |

## Huomiot Fablelle

1. **Herkät kohteet (13+, asiallinen sävy)**: Menin Gate ja Bastogne (sotamuistomerkit), Bois du Cazier (kaivosonnettomuus 1956, 262 kuollutta), Tervuren (siirtomaanäyttely).
   Dinantin 1914 verilöylystä en kirjoita; kohde on Sax ja Maas. Kuvissa ei verta.
2. **Watteninsaarten tapaan renkaan reunalla**: Zwin, Orval ja Ében-Émael ovat renkaan sisällä mutta ≤ 0,5 yksikköä reunasta; anchor-lukko kattaa tarvittaessa.
3. **Pieni maa, suuri tiheys**: jos haluat tiheämmän listan (esim. Signal de Botrange erillisenä, Gileppen pato, Herve-juusto, Villers-la-Ville, Spiennesin piilouhokset),
   ne ovat < 7 yksikön päässä valituista ja aiheuttaisivat nimiölimityksen (`tests/nimiolimitys.test.mjs`). Vaihtoehtoisia ehdokkaita valmiina, jos jokin nykyinen putoaa
   kuvien puutteen takia: Herve (juusto), Villers-la-Ville (luostarin rauniot), Binche (karnevaali), Stavelot, Malmedy.
4. **Kuvariskit**: Oudenaarden kuvakudoksesta ja Turnhoutin pelikorteista voi olla vaikea löytää kelvollista kuvaa; varasuunnitelma Herve tai Villers-la-Ville, jos kaksi kelvollista kuvaa ei löydy.
5. **Rahavisat**: vaiheessa 2 kirjoitan ~10 visaa (joka kolmas nosto, eri tyyppejä, 4 vaihtoehtoa, vastaus noston tekstistä).
