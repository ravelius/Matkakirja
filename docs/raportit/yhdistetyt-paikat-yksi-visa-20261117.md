# Yhdistetyt paikat: yksi pelaajalle esitettävä visa (SK 17.11.2026, KK:lle)

Pohja: omistaja 10.37 ("jos paikkoja yhdistetään, niin niihin kannattaa jättää vain yksi kysymys pelaajalle"), KK 10.39. **Pulun valmiit kysymykset (`kysymykset`-kenttä) pysyvät kaikilla; tämä koskee vain pelaajalle esitettävää tehtäväkysymystä:** takynoston ja syvennyksen `visa`, skandaalin `visa` ja historian hetken `lehtiTehtava`. Vain docs; ei datamuutoksia.

Luettu koodista: kaikki kaupunkikartat (`KAUPUNKIKARTAT`), pisteet joilla `nosto`-taulukossa on vähintään kaksi nostoa, vaiheen A haaran (`sk/yhdistaminen-a`, e05b76b4d1) mukaan, ja jokaisen noston visa tunnuksella (`nosto-` → takynostot, `syvennys-` → takyt, `skandaali-` → SKANDAALIT, `hetki-` → HISTORIAN_HETKET). Kohdekorteilla (fokuskohde, hahmotelma) ei ole visaa. Skripti: scratchpad `visat.mjs` (ei repossa; ajettavissa pyynnöstä).

## 1. Kaksi tai kolme visaa samassa paikassa: ehdotus, kumpi jää

Periaate: jää se visa, joka liittyy **paikkaan itseensä** (rakennus, kohde, siellä nähtävä asia); tarina, joka kertoo muualla tapahtuneesta (huijaus, henkilö), saa visansa pois.

### Vaiheen A tuottamat (nosto-taulukko nyt haarassa)
| Paikka | Visat nyt | Jää | Pois |
|---|---|---|---|
| Eiffel-torni (Pariisi) | 72 nimeä (kullattu nimilista parvekkeen alla), hetki 1888 (ei yhtään reikää osissa), Lustig (huijarin uhri) | **72 nimeä** (nähtävissä tornissa) | hetki 1888 (`lehtiTehtava`) ja Lustig |
| Trevin suihkulähde (Rooma) | kolikko (kenelle lahjoitetaan), Aqua Virgo (mitä syöttää yhä) | **kolikko** (paikan oma tapa) | Aqua Virgo |
| Vatikaanin palatsi (Rooma) | syvennys (1871 takuulaki, miksi paavi ei ottanut), hetki Michelangelo 1510 (maalausasento) | **Michelangelo** (Sikstuksen kappeli on palatsin osa) | takuulaki |
| Vrain-Lucas (Pariisi; syntyi Kaulanauhan jaosta, d563f33a87) | skandaali (mikä paljasti Kleopatran kirjeet) ja `pariisin-vuosisadat` (sama kysymys: "mikä niissä oli pielessä") | **skandaali** | `pariisin-vuosisadat`-visa; **huomio:** kortti `pariisin-vuosisadat` on sama Vrain-Lucas-tarina kuin skandaali, joten KK:n kannattaa päättää, poistuuko koko kortti pisteeltä (Pulun vastaukset pysyvät tunnuksella) |

### Jo ennen yhdistämistä samassa pisteessä (sama sääntö, jos halutaan)
| Paikka | Visat | Jää | Pois | Huom. |
|---|---|---|---|---|
| Helsinki, Sibelius 1899 | hetki (Finlandian väliaikaiset nimet), syvennys (miksi nimet vaihtuivat) | syvennys | hetki | sama aihe kahdesti |
| Praha, Tycho Brahe | syvennys (nenäproteesin aine), skandaali (2010 haudanavaus) | skandaali | syvennys | haudanavaus liittyy hautaan paikassa |
| Rooma, Torre Argentina | syvennys (mitä kuopasta paljastui), `nosto-kissat` (suojan perustamisvuosi) | syvennys | `nosto-kissat` | molemmat paikassa; syvennys kertoo paikan |
| Krakova, Wawel | syvennys (nimikirjoitukset muurissa), skandaali (Szczerbiecin paluu) | syvennys | skandaali | muuri on paikka |
| Tallinna, E-valtio | syvennys (ensimmäiset nettivaalit), skandaali (Rummu Jüri pakeni Toompean lossivankilasta) | syvennys | skandaali | skandaali ei liity pisteen nimeen; KK:n kannattaa katsoa, kuuluuko se tähän pisteeseen |
| Riika, Mustapäiden talo | syvennys (balsamin pullo), skandaali (kalenteririidat) | **KK ratkaisee**: en voinut varmistaa kumpi liittyy Mustapäiden taloon | | katso tarinoiden tekstit |

Ei kahta visaa (ei muutosta): Istanbul Käärmepylväs 1, Tuileries 1, Bastilji 1, Kärntnertor-teatteri 1, Euston Arch 1, Colosseum 1, Sofia Serdican areena 1 (nosto-areena ilman visaa).

## 2. Vaihe B (kadonnut + nykyinen; `liittyy`)
Luettu kaikki kuusi paria (P1 Orsay, P2 Industrie/Grand Palais, L1 Greenwich, L3 Westminster, L5 Pyhä Paavali / Old St Paul's, A2 Vanha raatihuone / Kuninkaanpalatsi): **yhdessäkään parissa ei ole kahta visaa.** Kadonneilla on vain kohdekortti (`hahmotelma-*`, ei visaa), nykyisillä ei nostoa lainkaan. Poikkeus A2: Haikaroiden visa on Kuninkaanpalatsin nostossa ja siirtyy Vanhalle raatihuoneelle, joten sielläkin yksi.

## 3. Haikaroiden 2 uutta kysymystä tätä vasten
Haikarat (`syvennys-amsterdam-haikarat`) on A2:ssa ainoa tarina, ja sillä on yksi visa ("Mikä muutti harmaahaikaran ja ihmisen välimatkan Alankomaissa vuonna 1963?"). Kaksi uutta kysymystä ("Millainen harmaahaikara oli vielä noin vuonna 1900?", "Miksi kaupungin haikarat pesivät joskus jo tammikuun lopussa?") ovat **Pulun kysymyksiä** (`kysymykset`), eivät visoja, joten ne eivät riko sääntöä. Ei muutosta.

## 4. Toteutus ja riskit
- Visan "pois" tarkoittaa `visa`-kentän (tai hetken `lehtiTehtava`) poistoa tai piilotusta; tekstit, kuvat ja Pulun kysymykset eivät muutu. Hetken `lehtiTehtava` kuuluu lehden tehtävälistaan: poisto vaikuttaa lehteen, joten sen voi sijaan piilottaa vain kartan kortista (NUI/NS päättää).
- Tarkistettava data-PR:ssä: visojen oikean vastauksen jakauma (`tests/visajakauma.test.mjs`), minikysymyskiintiö ja lehtitehtävien lukumäärät.
- Päätettävää KK:lle: (1) kolmen ehdotuksen (Eiffel, Trevi, Vatikaani) ja kuuden vanhan pisteen valinnat, (2) poistuuko kortti `pariisin-vuosisadat` Vrain-Lucas-pisteeltä, (3) toteutustapa: kentän poisto vai piilotus.
