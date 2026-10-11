# Asmara — vaihe A: faktapohja

**Tila 11.10.2026:** osiot 0–9, neljä kansiaihetta, neljä historianostoaihetta, viisi opasjaksoa, visa/tiedot ja kuvaroolit koottu lähteistä. **A:n karttahyväksyntä on avoin:** kuuden–kahdeksan hyväksyttävän paikan joukkoa ei ole osoitettu nykyisellä tekijän kuolemasta kuluneen 70 vuoden rajauksella. Ruusukon Neitsyt Marian kirkon alkuperäinen suunnittelija ja tämän varhainen kuolinvuosi on vahvistettu; muiden paikkojen tarkat puutteet eritelty osiossa 5. Kuusi tai useampi oma lähdekoordinaatti ei yksin tarkoita hyväksyttyä kohdejoukkoa.

**Sää on valmis:** alkuperäisen työkalun `saa.json`, normaalikausi **1961–1990**, ei 1991–2020. UM:n tarkistettu luokitus on **Noudata erityistä varovaisuutta**, ei kaupungista poistumiskehotus. B–F ei ole kuitattu tällä A-työllä. Ei Commons-hakuja, Git-operaatioita, uusia agentteja, sisältö-JSONia, pelitiedostomuutoksia tai käynnistyslevylle tallennettua työaineistoa.

## 0. Luetut lähteet ja 1873-kehys

### Lähteet ja kanava

Luettu **11.10.2026**. Omistajan hyväksymä tavallisten robots-sallittujen Wikipedia-/Wikivoyage-lähdesivujen poikkeus on käytössä. Uudet tunnukset, polut ja uudelleenohjaukset on tarkistettu yhteisen `sallittu_haku.py`-apurilla; kiellettyjä `/w/`- tai `/api/`-reittejä ei pyydetty. Wikidata luettu sallitusta EntityData-reitistä. Raaka-HTML, tekstit, PDF-lähteet ja katsotut lähdesivut NAS:n `valiaikainen/asmara-A`-kansiossa, hakuloki yhteisessä `valiaikainen/sallitut-haut.jsonl`-tiedostossa.

Hakukoneella on paikannettu otsikoita, henkilöitä ja lähdeosoitteita; aineiston väitteet on luettu sallituista lähteistä. Sivullisia Commons-hakutuloksia ei avattu eikä käytetty kuvavalintana tai koordinaattitodisteena. UNESCO-ehdotuksen kuvat ovat lähdedokumentin osia, eivät valittuja pelin kuvia.

| Tunnus | Lähde ja luettu rajaus | Käyttö |
|---|---|---|
| S1 | [en-Wikipedia: Asmara](https://en.wikipedia.org/wiki/Asmara), revisio **1378508016**, pääartikkeli: historia, maantiede, kulttuuri, rakennukset, kahvilat, liikenne, säätaulukko | Kaupunki, ylänkö, paikallinen perimätieto, kahvila-/ruoka-aiheiden Asmara-yhteys. Infoboksin uutta väkilukua ei vaihdeta kontekstin tarkistetun arvion tilalle. |
| S2 | [en-Wikipedia: History of Asmara](https://en.wikipedia.org/wiki/History_of_Asmara), Pre-colonial Asmara, Declared as a capital, City plan, vanha rakennus- ja kaupunkihistoria | Vanhempi asutus ja toripaikka, 1873:n matkakuvaus, suunnitelmien eri vaiheet. Rajauksen ulkopuoliset nykyiset konfliktit, politiikka ja rikollisuus eivät pelaajatekstiin. |
| S3 | [en-Wikipedia: Timeline of Asmara](https://en.wikipedia.org/wiki/Timeline_of_Asmara), vanha kronologia ja kohdelinkit | Otsikoiden paikannin ja ristiriitojen näkyväksi tekeminen. Ei itsenäinen toinen lähde, jos alkuperäisviite sama. |
| S4 | [en-Wikipedia: Church of Our Lady of the Rosary, Asmara](https://en.wikipedia.org/wiki/Church_of_Our_Lady_of_the_Rosary,_Asmara), revisio **1367240856**, koko kohdeartikkeli | Kirkon oma paikka, arkkitehti Oreste Scanavini, myöhempi kellotorni, kirkko/katedraali-nimen ero. Kohteen oma tekijäketju, ei oletus siirtomaatalojen yleisestä PD:stä. |
| S5 | [en-Wikipedia: Asmara Theatre](https://en.wikipedia.org/wiki/Asmara_Theatre), revisio **1253435047**, koko artikkeli | Odoardo Cavagnarin alkuperäinen teatteri ja myöhempi elokuvakäyttö. Ristiriita alku-/muutosvuosissa U2:n kanssa. |
| S6 | [en-Wikipedia: Enda Mariam Cathedral](https://en.wikipedia.org/wiki/Enda_Mariam_Cathedral), revisio **1367290243**, koko artikkeli | Eri kirkkovaiheet, nykyinen julkisivu, paikallinen rakennustapa. Sisäinen virhe Cavagnarin/Fiat Taglieron ketjussa ei siirry sisältöön. |
| S7 | [en-Wikipedia: Great Mosque of Asmara](https://en.wikipedia.org/wiki/Great_Mosque_of_Asmara), revisio **1366877509**, koko artikkeli | Nimi, oma piste ja vaiheet. Guido Ferrazza/maakaupunkisuunnitelma erotettava rakennuksen tuntemattomasta alkuperäisestä arkkitehdistä ja Giuseppe Aratan myöhemmästä muutoksesta U2:ssa. |
| S8 | [en-Wikipedia: Fiat Tagliero Building](https://en.wikipedia.org/wiki/Fiat_Tagliero_Building), revisio **1318954999**, koko artikkeli | Oma piste, todellinen suunnittelija Giuseppe Pettazzi; pois kohteista nykyisellä rajauksella. Ase-/uhkauslegendaa ei nostoiksi. |
| S9 | [en-Wikipedia: Giuseppe Pettazzi](https://en.wikipedia.org/wiki/Giuseppe_Pettazzi), revisio **1362033689**, koko henkilösivu | Elinvuosiketju; kuolinvuosi 2001 lähdemetatietona. WP ja siitä tuotu WD eivät kaksi riippumatonta elämäkertaa. |
| S10 | [en-Wikipedia: Cinema Impero](https://en.wikipedia.org/wiki/Cinema_Impero), revisio **1312368578**, koko artikkeli | Mario Messinan rakennus, oma piste; ei hyväksytty suojatuksi teospääaiheeksi tai kohteeksi. |
| S11 | [en-Wikipedia: Guido Ferrazza](https://en.wikipedia.org/wiki/Guido_Ferrazza), revisio **1372332524**, koko henkilösivu | Arkkitehdin kuolinvuosi 1961, sama alkuperäisketju kuin A2:n Treccani. |
| S12 | [en-Wikipedia: Governor's Palace, Asmara](https://en.wikipedia.org/wiki/Governor%27s_Palace,_Asmara), revisio **1221937156**, koko artikkeli | **Artikkelin piste on nykyiselle kaupungintalolle**, vaikka nimi muistuttaa vanhasta palatsista. Ei siirretä vanhan State Palacen pisteeksi. |
| S13 | [en-Wikipedia: Asmara Synagogue](https://en.wikipedia.org/wiki/Asmara_Synagogue), revisio **1367750151**, koko artikkeli | Seurakunta ja rakennus, luokkahuoneet, hautausmaa ja rukoustila. Arkkitehti/kuolinvuosi puuttuu. Ei yksittäisen henkilön tämänhetkistä asemaa vanhan lehtijutun perusteella. |
| S14 | [en-Wikipedia: National Museum of Eritrea](https://en.wikipedia.org/wiki/National_Museum_of_Eritrea), revisio **1336060088**, koko artikkeli | Museon siirtyminen palatsista entiseen Comboni-sisarten kouluun, kokoelma- ja tutkimustoiminta. Paikkapisteen tarkkuus ja nykyisen rakennuksen ketju avoinna. |
| S15 | [en-Wikipedia: Eritrean Railway](https://en.wikipedia.org/wiki/Eritrean_Railway), Construction, Characteristics, Operations ja kalusto | Massawan ja Asmaran rata, jyrkän nousun rakennustyö, kapea raideleveys ja vanha tekninen kalusto. Ei nykyistä aikataulu- tai retkilupausta. |
| S16 | [it-Wikipedia: Stazione di Asmara](https://it.wikipedia.org/wiki/Stazione_di_Asmara), revisio **123763046**, koko kohdeartikkeli | Aseman oma lähdekoordinaatti, pääteasema ja toteutumaton siirtosuunnitelma. Oman aseman alkuperäinen tekijä U2:ssa tuntematon. |
| S17 | [en-Wikipedia: Italian Eritrean cuisine](https://en.wikipedia.org/wiki/Italian_Eritrean_cuisine), Characteristics, History, popular dishes | Asmaran paikallinen pasta ja kahvila-ateria; pois leipätekstin kolonialistinen identiteettitulkinta. Ruoka ei muutu vain Asmarassa syntyneeksi annokseksi. |
| S18 | [en-Wikipedia: Berbere](https://en.wikipedia.org/wiki/Berbere), johdanto | Pastan mausteen lyhyt selitys, ei koko maalehden maustesekoitusjuttu tai pakkausmainos. |
| S19 | [en-Wikipedia: Asmara International Airport](https://en.wikipedia.org/wiki/Asmara_International_Airport), johdanto ja paikkatieto | Lentoasema **ASM**. Historialuku sekoittaa Guran ja Asmaran vaiheita; ei noston perustamisvuodeksi eikä nykyisten lentoaikataulujen lupaukseksi. |
| S20 | [en-Wikipedia: Asmara–Massawa Cableway](https://en.wikipedia.org/wiki/Asmara-Massawa_Cableway), vanha tekninen historia | Luettu erottamaan tavarankuljetuksen vaijerirata rautatiestä. Ei maailman pisin -superlatiivia, käsin laskettuja pituuksia tai nykyistä käytössäoloa. |
| V1 | [en-Wikivoyage: Asmara](https://en.wikivoyage.org/wiki/Asmara), See, Get around, Eat, Buy, Cope | Kahvilat, keskustan arkitavara ja kulkemisaiheet; ei hintoja, kellonaikoja tai vanhojen bussilinjojen palvelulupauksia. Turvallisuus- ja lakiväitteet tarkistetaan T1:stä. |
| T1 | [UM: Eritrea, matkustustiedote](https://um.fi/matkustustiedote/-/c/ER), **1.9.2026**, kaikki maakohtaiset osiot, luettu 11.10.2026 | **Noudata erityistä varovaisuutta**. Asmaran ulkopuolelle matkustuslupa; hoidon saatavuus, kulkeminen, rahanvaihtokuitti ja kuvausrajat. Nykyisen konfliktin tai rikollisuuden kertomusta ei tehdä. |
| U1 | [UNESCO: Asmara — A Modernist African City](https://whc.unesco.org/en/list/1550/), kuvaus, Outstanding Universal Value, Integrity/Authenticity ja rajauksen kuvaus | Hyväksytty alue koostuu eri suunnitteluvaiheista sekä paikallisista Arbate Asmeran ja Abbashawelin alueista. Ei vain yksittäisiä uusia julkisivuja. Suojeltu perintö ei tarkoita automaattisesti tekijänoikeudesta vapaata teosta. |
| U2 | [UNESCOssa julkaistu valtion Asmara-ehdotus, Nomination Text](https://whc.unesco.org/document/155767), 204 PDF-sivua; luetut relevantit kokonaiset aukeamat alla | Alkuperäinen kohdeinventaario. Vastuu sisällöstä on ehdotuksen toimittaneella valtiolla, ei nimettömällä UNESCO-tekijällä; U1:n hyväksymispäätös ei vahvista jokaista arkkitehtiattribuutiota. |
| U3 | [UNESCO: Factual errors letters](https://whc.unesco.org/document/158822), p.58 / PDF-sivu 59 | Suunnitelmavuosien korjausketju ja Cavagnarin elinvuosi. Sama ehdotus-/arviointiketju, ei kaksi riippumatonta elämäkertaa U2:n rinnalle. |
| A1 | [Italian kulttuuri-instituutti Hampuri: Spazi Italiani — ERITREA, Asmara](https://iicamburgo.esteri.it/it/gli_eventi/calendario/spazi-italiani-eritrea-asmara/), kohteiden tekijäluettelo | Riippumaton virallinen näyttelyteksti vahvistaa Rosary/Scanavini- ja teatteri/Cavagnari-yhteyttä. Enda Mariamin nykyisen vaiheen tekijä poikkeaa U2:sta; ei ratkaista valitsemalla hiljaa. |
| A2 | [Treccani, Dizionario Biografico degli Italiani: Guido Ferrazza](https://www.treccani.it/enciclopedia/guido-ferrazza_%28Dizionario-Biografico%29/), Marida Talamona, elämäkerta | Henkilön kuolema **1.2.1961** luettu alkuperäisestä elämäkertalähteestä, ei vain WD:n infoboksista. |
| A3 | [The Wolfsonian–FIU: Hidden Clues in Mario Messina's Architectural Drawings](https://wolfsonian.org/blog/2026/hidden-clues-in-mario-messinas-architectural-drawings.html), museon oma arkistoselvitys | **Mario Messina 1899–1987**, Cinema Impero nimetty hänen toteutuneeksi työkseen. Henkilö/kuolinvuosi erotettu muista samannimisistä. |
| A4 | [Barnabiti Studi 13, Carlo Mariani](https://www.barnabiti.net/wp-content/uploads/2020/01/Barnabiti_Studi_13.pdf), painettu s.196, **viite 212**, koko PDF-sivu 156 katsottu | **Oreste Scanavini 1874–1942**. Tutkimus perustuu tekijän Politecnico di Milanon opinnäytteen ja arkistojen aineistoon; kyseinen elämäkertaviite nimeää myös yksityisen Ambrogio Scanavinin arkiston. Ei päätelmä rakennusvuodesta. |
| W1 | `asmara/saa.json` ja `valiaikainen/e07/saa/alkuperainen-saa-ajo.txt` | Alkuperäisen työkalun hyväksytty sääsarja **1961–1990** ja tarkat poimintametatiedot osiossa 4. Ei muutettu A:ssa. |

**U2:n täsmälliset lukukohdat:** Urban Planning s.40–41 (PDF23); Harnet Avenue s.62–63 (PDF34); Catholic Mission s.66–67 (PDF36); Asmara Theatre s.70–71 (PDF38, myös koko aukeama katsottu); Market Square s.118–119 (PDF62); Mosque Square s.128–129 (PDF67); Grand Mosque s.132–133 (PDF69); State Palace s.144–145 (PDF75); Central Post Office s.154–155 (PDF80); Mai Jah Jah s.216–217 (PDF111); Railway Station s.230–231 (PDF118); Medeber Market s.234–235 (PDF120); St Mary's and Dege Selam s.240–241 (PDF123); Fiat Tagliero s.112–113 (PDF59). Arkistokuvia ei ole hyväksytty kuvitukseksi.

A4:n raakatekstin fonttikoodaus oli poikkeava; tekstin dekoodaus auttoi löytämään viitteen, mutta kuolinvuosi **1942** ja lähdeviite on tarkistettu **renderöidystä kokonaisesta sivusta**, ei oletetusta korjausalgoritmista. U2:n tekstin palstajärjestys tarkistettiin erityisesti teatteriaukeaman kuvasta. NAS-esikatselut ovat lähdetyön tarkastuksia, eivät kuvatilauksen tuloksia.

### Wikidata: omat paikat ja tekijät

Luetut JSONit ovat `valiaikainen/asmara-A/Q*.json`; P625-rankki, precision ja identiteetti luettu, ei ensimmäisen luvun sokkopoimintaa.

| Entiteetti | Tarkistettu tieto |
|---|---|
| [Q3642: Asmara](https://www.wikidata.org/wiki/Special:EntityData/Q3642.json) | Karkea kaupungin yleispiste, ei keskustan aukion tai Harnetin oma piste. Kontekstin pallopiste säilyy. |
| [Q2061047: Rosary-kirkko](https://www.wikidata.org/wiki/Special:EntityData/Q2061047.json) | Oma P625 **15.33674722, 38.93789167**; P84 Scanavini Q136461018. |
| [Q136461018: Oreste Scanavini](https://www.wikidata.org/wiki/Special:EntityData/Q136461018.json) | P570 **1942**, ei viitettä. A4 on erikseen luettu elämäkertalähde; WD:n ja A4:n riippumattomuutta ei oleteta. |
| [Q1652119: Asmara Theatre](https://www.wikidata.org/wiki/Special:EntityData/Q1652119.json) | Oma P625 **15.335822, 38.935225**, P84 Odoardo Cavagnari Q104666209. Ei myöhempien tekijöiden täydellinen ketju. |
| [Q104666209: Odoardo Cavagnari](https://www.wikidata.org/wiki/Special:EntityData/Q104666209.json) | P570 **1920**, ei viitettä. U2/U3 ilmoittavat saman; alkuperäinen teos ja myöhemmät lisäykset eri asioita. |
| [Q1972822: Enda Mariam](https://www.wikidata.org/wiki/Special:EntityData/Q1972822.json) | Oma P625 **15.339806, 38.944173** on kirkkokokonaisuudelle; ei itsenäinen Dege Selamin rakennuspiste. |
| [Q11957212: Great Mosque](https://www.wikidata.org/wiki/Special:EntityData/Q11957212.json) | P625 omalle moskeijalle; P84 Ferrazza, mutta U2:n kohdeattribuutio tarkempi/eri. Ei käytetä varmaksi täydelliseksi rakennuksen tekijäketjuksi. |
| [Q55227524: Guido Ferrazza](https://www.wikidata.org/wiki/Special:EntityData/Q55227524.json) | P570 **1.2.1961**, lähde Treccani/GND; A2:n elämäkerta luettu erikseen. |
| [Q1410651: Fiat Tagliero](https://www.wikidata.org/wiki/Special:EntityData/Q1410651.json) | P625 omalle rakennukselle; **P84 osoittaa virheellisesti Ferrazzaan Q55227524**, vastoin S8/U2/A1:n Pettazzi-attribuutiota. |
| [Q5565500: Giuseppe Pettazzi](https://www.wikidata.org/wiki/Special:EntityData/Q5565500.json) | Oma henkilö, P570 **8.10.2001**, WP-tuonti. Ei sama henkilö kuin Ferrazza tai Cavagnari. |
| [Q954653: Cinema Impero](https://www.wikidata.org/wiki/Special:EntityData/Q954653.json) | Oma P625; tekijä Mario Messina vahvistuu S10/A3:sta, ei lisätä väärää samannimistä. |
| [Q1758861: Governor's Palace / City Hall](https://www.wikidata.org/wiki/Special:EntityData/Q1758861.json) | Oman kaupungintaloartikkelin piste; ei vanhan State Palacen pisteeksi. |
| [Q256573: Asmara Synagogue](https://www.wikidata.org/wiki/Special:EntityData/Q256573.json) | Oma P625 **15.337309, 38.940728**, ei ilmoitettua arkkitehtia tai kuolinvuotta. |
| [Q1968666: National Museum of Eritrea](https://www.wikidata.org/wiki/Special:EntityData/Q1968666.json) | Ei P625:tä tässä luetussa entiteetissä. Koordinaatti saadaan vain museon omasta S14-artikkelista. |
| [Q3968917: Asmara railway station](https://www.wikidata.org/wiki/Special:EntityData/Q3968917.json) | Oman aseman P625 **15.338936, 38.949323**, precision **0.00001**, italialaisen WP:n tuonti. Ei muiden rannikon asemien piste. |

### Luku- ja vuosikuri

- Tarkat koordinaatit, hakupäivä, revisio, UM-päiväys, säätaulukon poimintametatieto ja oikeusketjun sisäiset henkilötiedot ovat **työmuistion metatietoja**. Historiallisen pelaajatekstin tarkat luvut tarvitsevat kaksi riippumatonta alkuperäislähdettä. WP + siitä tuotu WD tai samaa kirjaa käyttävä toinen Wiki eivät riitä.
- Rosary-kirkon valmistumisvuosi **1923** esiintyy S4:ssä, U2:n inventaariossa ja A1:n virallisessa näyttelytekstissä. Usea lähdesivu tukee sitä, mutta A1/U2/S4:n tarkkaa alkuperäistä riippumattomuutta ei ole täysin osoitettu. Tarkkaa vuotta ei vielä hyväksytä pelaajatekstiin kahden riippumattoman lähteen portin läpäisseeksi. Nostossa ja kohdejutussa riittää **1900-luvun alkupuoli**. Kellotornin eri rakennusvaihe ja moderni kello on silti erotettava.
- Teatterin S5 **1918 / 1936** vs. U2 **1919–20 / 1937** ja S3/A1 **1920**: eri suunnittelu-, valmistumis- ja muutosvaiheita. Pelaajalle **1900-luvun alkupuolella rakennettu ja myöhemmin elokuvateatteriksi muutettu**, ei yhden vuoden hiljaista valintaa.
- Synagoga **1906**, asema **1911**, Medeber **1914**, Dege Selam **1917**, moskeijan eri vaiheet **1906 / 1937–38 / 1943**: tarkat lähdevuodet metatietona; pelaajalle vuosisata tai tarvittava erillinen kahden lähteen taulu. Rakennusvuosi ei yksin todista tekijän kuolemasta kulunutta aikaa.
- Perimätiedon kylien yhdistyminen on **kerrottu tarina**, ei tarkka historiallinen väestönlaskenta. Ei myyttistä perustamispäivää tai empiiriseksi faktaksi muutettua henkilölukua.
- Korkeus pelaajalle **noin 2 300 metriä**, ei maailman-/Afrikan pääkaupunkien korkeusjärjestystä. Metatietona S1 ja konteksti 2325 m, U1 yli 2000 m.
- Väkiluvun eri rajaukset ja vuoden 2020 arvio eivät muodosta nykypäivän virallista laskentaa. Pois tarkka nykyinen väkiluku ja vanhat väestökasvusarjat ilman yhdenmukaista laajuutta.
- Sääteksteissä kaikki aste- ja mm-luvut **vain W1:stä**. Vanha kausi 1961–1990 mainitaan taustassa; siihen ei liitetä nykyisen kauden otsikkoa.

### 1873-kehys

Asmara **oli olemassa** isoisän matkavuonna. S2 kuvaa vanhaa kylä-/toripaikkaa ja matkailija E. A. De Cossonin tuon vuoden havaintoa paikan hiljaisuudesta. Hänen kuvauksensa ei ole isoisän tekemä merkintä, eikä yhden vierailijan sana todista koko kaupungin täydellistä tyhjyyttä. Pelaajalle riittää: **1873 täällä oli vanhempi asutus- ja kauppapaikka; nykyisen keskustan kirkot, teatteri, rautatieasema ja modernistiset talot rakentuivat myöhemmin.** Ei sepitettyä isoisän torikauppaa, junaa, kahvilaa, lainattua päiväkirjaa tai paikallista tuttavuutta.

Nykyiset karttapaikat voivat olla 1873:a nuorempia (PILVIOHJE 4.5). Nuoruus ei automaattisesti tarkoita suojattua taideteosta; jokainen rakennuksen teosketju ja luonnon-/aukiopaikan identiteetti ratkaistaan erikseen. Asmara ei myöskään ollut siirtomaasuunnittelijan tyhjä kangas: S2/U2 kuvaavat paikallisen asutuksen, maaston ja kaupan ennen suuria rakennusvaiheita.

## 1. Perusfaktat

- **Nimi:** Asmara; kontekstin alkuperäiskieli **ኣስመራ (Asmera, tigrinja)**. Artikkeliavain `Asmara`; ei korvata nimeä italiankielisellä puhekielinimellä. [konteksti; S1]
- **Maa:** Eritrea, `ERI`; asema maan pääkaupunki ja Keskisen alueen keskus. [konteksti; S1]
- **Pallopiste:** kontekstin **15.3366, 38.9363** säilyy. S1:n kaupunkipiste **15.33583, 38.94111** ja WD Q3642:n karkea **15.333333333333, 38.916666666667** poikkeavat; niitä ei vaihdeta pallo- tai paikkakoordinaateiksi ilman pääsession päätöstä.
- **Ympäristö:** ylänkö ja rannikon alankoa kohti laskeva maasto. Ei maantieteellistä rankingiä; noin 2300 m on sallittu pyöristys. [S1, Geography; U1]
- **Äänimaisemaehdotus:** `ylanko`; paikallinen kaupunkielämä on keskustan aihe, mutta ei päätellä tästä nykyisten liikenteen/kahviloiden äänilupauksia.
- **Väestö:** kontekstin **963 000 / 2020** on CIA World Factbookista WD:hen tullut **kaupunkiarvio**, ei itsenäisen Eritrean virallinen väestönlaskenta. Sen täsmällinen kaupunkikeskittymän/kunta-alueen raja ei yhdisty S1:n uusien arvioiden tai YK:n eri rajauksen kanssa. **Kaupungin introsta väkiluku pois**, ellei C nimetä juuri tämän arvion laajuutta ja vuotta. Ei kirjoiteta 963 000 kaupungin kunnalliseksi asukasluvuksi ilman sitä tukevaa rajauslähdettä.
- **Maailmanperintö:** U1 nimeää alueen *Asmara: A Modernist African City*. Alue kattaa eri suunnitteluvaiheiden kaupunginosia, paikallisia suunnittelemattomia alueita ja kulttuurisesti erilaisia rakennus- ja käyttöpaikkoja. Ei “koko nykyinen miljoonakaupunki on sellaisenaan UNESCOssa”.
- **Lentoasema:** Asmara International Airport, **ASM**. S19:n lentoasema-identiteetti; ei Massawan kenttä tai Guran kenttä. Ei nykyisen lentoyhtiölistan kopiointia oppaaseen.
- **Paikallinen ruoka-/kahvilaelämä:** S1/S17 kuvaavat espressoa, cappuccinoa, gelatoa ja italialais-eritrealaista ruokaa Asmarassa. Nimettyjen tuotteiden esiintyminen ei anna lupaa suojattuun kahvilajulkisivuun, tuotemainokseen tai pakkauksen pääaiheeseen.

### Artikkelin rakennusaineet C:lle

Introon 7–10 virkettä, 700–1100 merkkiä, 2–3 kappaletta. Lähteistetyt virkefunktiot: maan pääkaupunki ja ylänkö; nykyistä rakennettua keskustaa vanhempi asutus; paikallinen perimätieto kylien yhdistymisestä tarinana; maastoon mukautunut katuverkko; rakennuksia täydentävät tori-/pihapaikat; Medeberin käsityö ja kierrätys; rautatien nousu rannikon suunnasta; kahvilat ja paikallisesti maustettu pasta. Vältetään samaa kevyen pisteen “futuristiset rakennukset ja palmukatu” -nostoa sellaisenaan.

Lue lisää -tekstin kolme kappaletta: vanha paikallinen asutus/toripaikka ennen siirtomaakaupunkia; katuverkon ja eri toimintojen muodostama kaupunki; nykyisen arjen paikalliset jatkumot ja perintöä ylläpitävä käyttö. Ei Mussolinin sankarikertomusta, kaupungin puhtaasti eurooppalaista omistamista tai nykyisen politiikan kuvailua. Maaperästä ja ilmastosta ei sepitettyä yksittäistä syy-seurausketjua.

## 2. Kansi ja neljä nostoaihetta

**Sivu:** `kaupunki`, nimi Asmara. **Johdannon aihe:** ylängön vanha asutus, myöhempi kaupunkirakenne ja asukkaiden arki. Neljä seuraavaa ovat lähdeaiheita, joista C kirjoittaa 440–660 merkin nostot; faktalistat eivät ole lopullisia kuvatekstejä.

### K1 — Naiset saivat kylät yhteen

1. Kaupungin nimeen liittyy paikallinen tigrinjankielinen **suullinen perustamistarina**. [S1, History; S2, Etymology/Pre-colonial]
2. Tarinassa alueella oli erillisiä kyläyhteisöjä. Se ei ole nykyisen kaupunginosajaon tilasto. [S1/S2]
3. Yhteisöjen naiset kokoontuvat pohtimaan kylien yhteistä turvaa. [S1/S2]
4. He ehdottavat yhdistymistä erillisten kylien sijasta. [S1/S2]
5. Kertomuksessa miehet suostuvat ja yhteinen paikka saa nimen **Arbate Asmara**. [S1/S2]
6. Nimen merkitykseen liittyy yhdistäminen; tarkkaa sanarakenne- ja lukumääräselitystä ei tehdä erillisestä kertomuksesta empiiriseksi historialuvuksi. [S1, History]

**Toimitusraja:** C:n alussa selvä “Paikallinen perimätieto kertoo…”; ei esitetä dokumentoituna perustamistapahtumana, päivämääränä tai kaikkien asukkaiden yhtenä uskomuksena. S2:n lounaan epäämisen versio on vain yhden tarkennetun kertomusversion piirre: pois ilman alkuperäisen tradition lisävarmennusta. Naiset ovat paikallisia toimijoita, ei nimetöntä eksoottista lavastetta.

**1873:** kertomus on aiemman asutuksen muisti, ei tarkka raportti tuosta vuodesta. **Kuva-aihe:** vanha laaja asutus-/torikuva, jos oikea identiteetti ja lisenssi löytyvät; ei nykynaisten kuvaa lavastettuna perustamistarinaan, ei rituaalikuvaa ilman vastaavaa faktaa.

### K2 — Karavaanipaikasta kierrätyspaja

1. **Medeber/Medebar** oli alun perin karavaanien pysähdyspaikka, jossa voitiin korjata varusteita, hankkia tarvikkeita ja käydä kauppaa. [U2, s.234–235]
2. Sen paikka siirrettiin kaupungin koilliseen teollisuusalueeseen 1900-luvun alussa. [U2, s.234–235]
3. Uuden kokonaisuuden suunnitteli Odoardo Cavagnari; siihen kuului vaaka, toimistotiloja ja klinikkatoimintaa. Tarkka rakennusvuosi on työmuistiossa, ei varmistamattomana pelaajatekstin lukuna. [U2]
4. Paikka muuttui pysähdyspaikasta tavaran, erityisesti tekstiilien, kaupankäyntikeskukseksi. [U2]
5. Myöhemmässä vaiheessa paikalliset käsityöläiset tekivät kierrätysmateriaaleista käyttöesineitä, esimerkiksi metallisia uuneja. [U2]
6. Suuri osa alkuperäisistä rakennuksista menetettiin; säilyneiksi kuvataan pienempiä reunan tiloja ja tunnistettava vanha portti. Ei luoda kuvaa täysin säilyneestä karavaanitalosta. [U2]
7. Nykyisemmiksi kuvatuissa työpajoissa on sekä valmistusta että chilipippurin jauhamista. Ei väitetä jokaista jauhinmyllyä Cavagnarin alkuperäiseksi laitteeksi. [U2]

**Kulma:** käyttötarkoitus ja materiaalit saavat uuden elämän. Käsityöläisten työ ei ole pelkkä siirtomaaportin taustakoriste. Ei valmistettua modernia veistosta pääaiheeksi, ei hautamuistomerkkiä tai tekijäketjultaan epävarmaa nykyistä porttikoristetta.

**Kuva-aihe:** yleinen tekninen työ-/kierrätysmateriaali tai tunnistettu Medebarin vanha portti vasta oman paikka- ja teosketjun tarkistuksen jälkeen. Oma WP/WD-piste ei vielä löytynyt.

### K3 — Pasta sai berbereä

1. Asmarassa tarjotaan italialais-eritrealaista ruokaa. [S1, Restaurants, bars, cafes; S17]
2. **Pasta al sugo e berbere** tarkoittaa pastaa tomaattikastikkeella ja berbere-mausteella. [S1; S17, Characteristics]
3. Berbere on mausteseos, jossa on tyypillisesti chiliä sekä muita mausteita; yhtä kaikkien keittiöiden ainesosaluetteloa ei määrätä. [S18, johdanto]
4. Asmaran paikallisessa ruokakuvauksessa esiintyy myös lasagne. [S1; S17]
5. Kahviloiden tarjontaan kuuluvat espresso ja cappuccino. [S1; S17]
6. S1/S17 mainitsevat myös gelaton; ei superlatiivia tai yhden jäätelökaupan nykyistä terveyslupausta. [S1; S17]
7. Ruokakulttuuri kuvataan lähteessä italialaisten ruokalajien ja paikallisten ruokien/mausteiden yhdistelmäksi, ei entisten siirtomaaisäntien poliittiseksi hyväksymiseksi. [S17, johdanto; poistettu kolonialistinen lainaus]

**Kulma:** tuttu pasta ja paikallinen mauste samassa annoksessa. Ei väitettä berberen, pastan tai espresson syntymisestä vain tässä kaupungissa. Ei koko Eritrean yleistä ruokajuttua; kuvitus ja kirjoitus sidotaan Asmaran kahvila-ateria-aiheeseen.

**Kuva-aihe:** tunnistettu pasta/mauste/espresso, tarvittaessa geneerinen valmistuskuva selvästi yleiseksi rajattuna. Tavallinen bolognesekuva ei yksin todista berbereä. Kahvikone on tekninen esine, mutta mainos/tuotemerkki, uusi suojattu muotoiluteos tai pakkaus ei kuvan pääaiheeksi.

### K4 — Rata joutui nousemaan rannikon tasolta

1. Rautatie yhdistää historiallisesti Punaisenmeren Massawan ja ylängön Asmaran. [S15, Construction; U2 s.230–231]
2. Rakentaminen eteni rannikolta kohti sisämaan ylänköä. [S15, Construction]
3. Pitkä nousu ja tarvittavat sillat, tunnelit ja muut rakennustyöt hidastivat etenemistä; kausaalisuus on lähteen sanoma, ei itse laskettu korkeusero. [S15, Construction]
4. Rata on kapearaiteinen. Tarkka 950 mm jätetään nostosta pois ilman erillistä tuplavarmennusta; tekninen periaate riittää. [S15]
5. Asmaran pääteaseman yhteyteen rakennettiin myös työpajoja ja muita rautatietoiminnan tiloja. [U2, s.230–231]
6. Historiassa rataa jatkettiin Asmaran ohi pohjoiseen. Pääteasema rannikon linjalle ei tarkoita koko verkon olleen aina vain tämä osuus. [S15, Route; S16]
7. Vanhoihin teknisiin kalustotyyppeihin kuuluvat höyryveturit ja Littorina-moottorivaunut. Ei lupaa juuri tänään lähtevästä museojunasta. [S15, Characteristics/kalusto]

**1873:** rataa ja nykyistä asemaa ei ollut. **Kuva-aihe:** tekninen rata-/kalustokuva tai oma vanha asema vain hyväksytyllä ketjulla; ei rannikolla olevan aseman kuvaa Asmaraksi. Asema-artikkelin tekijäpuute ja nykykuvan mahdolliset suojatut teokset ovat erillinen portti.

## 3. Teemasivu: historia

**Vakioaihe:** `historia`. **Nimi:** Kaupunki ei ole pelkkä julkisivu.

Johdantoaine: Asmaran katuverkko, uskonnollisen pihapiirin palvelut, teatterin eri käyttötavat ja museon muutot kertovat kaupungista myös rakennusten mainetta syvemmältä. Ei “tyhjä kaupunki, jonka italialaiset yksin rakensivat” -kehystä. Nykyisen maan politiikan, sodan tai rikollisuuden tarinaa ei kirjoiteta.

### H1 — Ruutukaava oppi kiertämään maastoa

1. Asmaran suunnittelussa käytettiin sekä suorakulmaista ruutua että kaartuvia/radiaalisia katuja. [U1, Criterion iv; U2 s.40–41]
2. Luonnolliset korkeuserot ja aiemmat paikalliset paikat vaikuttivat suunnitteluun. [U1; U2, Urban Planning]
3. Esimerkiksi Mai Bela -joki, vanha toripaikka, Arbate Asmeran kylä ja ylängön reunajyrkänne ovat U2:n nimeämiä suunnittelun lähtökohtia. [U2 s.40–41]
4. Myöhemmässä Cavagnarin suunnitelmassa katuverkko ulottui tuolloin rakennettua kaupunkia kauemmas. [U2 s.40–41]
5. Koillinen teollisuusalue erottui vinosti asetetusta katuverkosta ja suuremmista tonteista. [U2]
6. Torien ja muiden yhteisten toimintojen sijainti liittyi eri kaupunkialueiden väliseen arkiseen vuorovaikutukseen. [U1; U2]
7. Samalla siirtomaahallinto erotteli asukkaiden asuinalueita. Tämä todetaan neutraalina historiallisena reunaehtona, ei ihannoida valikoivaa “puutarhakaupunkia” kaikkien yhtäläiseksi etuoikeudeksi. [U1, Criterion ii/iv; S2, City plan]

**Kulma:** ruutu ei ole kaupungin ainoa viiva eikä kartan kaava kaikki sen elämä. Ei suunnitelmavuosien määrällistä luetteloa, nykyisiä väestöprosentteja tai lähteiden äänekkäitä siirtomaalainauksia. Modernin suojatun julkisivun ei tarvitse olla kuvan pääaihe, jotta katuverkon voi ymmärtää.

**Kuva-aihe:** hyväksytty vanha suunnitelmakartta, maastoa ja katuja näyttävä yleiskuva tai geneerinen kaavatyön havainnollistus selväksi yleiseksi rajattuna. Karttateoksen oma oikeus varmistetaan; koko UNESCO-PDF:n kuvitusta ei lainata.

### H2 — Kirkon pihapiirissä oli myös painokone

1. Rosary-kirkon kokonaisuus kehittyi vanhan katolisen lähetysaseman ympärille. [U2 s.66–67; S4]
2. Nykyistä kirkkoa edelsi pienempi Pyhän Markuksen kirkko. [U2]
3. Kasvavan yhteisön tarpeisiin rakennettiin myöhemmin suurempi kirkko Oreste Scanavinin suunnitelmalla. [U2; S4]
4. Kokonaisuuteen kuului koulutoimintaa ja kirjasto. [U2 s.66–67]
5. Painokoneella tuotettiin uskonnollisia ja koulutekstejä paikallisilla kielillä. [U2]
6. Erillinen kellotorni valmistui kirkon päävaihetta myöhemmin. [S4, History; U2]
7. Kirkkorakennuksen tyylinä on lombardialainen uusromaanisuus ja näkyvä ruskea tiili. [S4; U2]
8. Paikkaa kutsutaan yhä katedraaliksi, vaikka kohdeartikkeli täsmentää sen olleen apostolisen vikaarikunnan pääkirkko eikä varsinaisen hiippakuntapiispan katedraali; nykyinen katolinen katedraali on eri paikka, Kidane Mehret. [S4, johdanto]

**1873:** nykyistä Scanavinin kirkkoa, tornia ja tätä lähetysasemakokonaisuutta ei vielä ollut. **Oikeusrajat:** Scanavinin kuolema 1942 on A4:n alkuperäisessä tutkimusviitteessä katsottu; alkuperäinen teos on lupaava yli 70 vuoden ketju. Kellotornin osat, uudempi kello, freskot, patsaat ja mahdolliset restauroinnin uudet teokset tarkistettava B:ssä erikseen. Ei sisäkuvan maalausta pääaiheeksi rakennusarkkitehdin kuolinvuoden perusteella.

**Kuva-aihe:** vanhan rakennuksen oma julkisivu/tiilirakenne ilman uudempaa suojattua teospääaihetta. Painotekniikkaa voi havainnollistaa geneerisellä vanhalla teknisellä painokoneella, mutta sitä ei nimetä kirkon omaksi koneeksi.

### H3 — Teatteri sai uuden katselutavan

1. Asmaran teatterin alkuperäisen suunnitelman teki Odoardo Cavagnari. [S5; U2 s.70–71; A1]
2. Rakennus sijaitsee ylöspäin nousevan pääkadun yhteydessä. [S5; U2]
3. Julkisivu ja sisäänkäynti käyttävät kaaria, pylväitä ja portaita, jotka yhdistävät näyttämöpaikan katutasoon. [U2]
4. Yläosan alkuperäinen portiikki ja myöhemmin lisätyt katutason liiketilat ovat eri rakennusvaiheita. [U2]
5. Rakennus muutettiin myöhemmin elokuvateatteriksi ja sinne asennettiin projektoritila. [U2]
6. Muutoksia tekivät Antonio Vitaliti ja Pietro del Fabro. [U2]
7. Alkuperäinen katto oli Francesco Saverio Fresan maalaama; maalaajan kuolinvuosi ei selviä tästä, eikä Cavagnarin kuolema vapauta hänen taidettaan. [U2; A1]
8. Lähteen inventaario kuvaa myöhemmän teatterikäytön. Se ei vahvista tämän päivän ohjelmistoa tai avointa katsomoa. [U2; S5:n vanhat käyttövuodet]

**Kulma:** sama rakennus, eri käyttötapoja ja erillisiä tekijöitä. Ei yksittäisten oopperoiden esityslistaa varmistamattomina tarkkoina vuosina; ei suojattuja julisteita tai elokuvaruutuja kuvitukseksi.

**1873:** nykyistä teatteria ei ollut. **Kuva-aihe:** alkuperäinen ulkoarkkitehtuurin osa vain jos B pystyy osoittamaan kuvassa juuri Cavagnarin pääteoksen ja erottamaan myöhemmät tekijät; muussa tapauksessa yleinen tekninen projektorikuva. Teatterin karttapaikka on vielä ehdollinen.

### H4 — Museo vaihtoi palatsin kouluun

1. National Museum of Eritrea on Asmarassa toimiva kansallinen museo. [S14]
2. Se perustettiin 1900-luvun loppupuolella. Tarkka perustamisvuosi ei tule ilman tuplavarmennusta. [S14]
3. Se toimi alkuvaiheessa entisessä kuvernöörin palatsissa. [S14]
4. Museo siirrettiin myöhemmin entiseen Comboni-sisarten tyttökouluun. Vanhaa palatsia ja nykyistä museota ei merkitä samaksi rakennukseksi. [S14]
5. Toimintaan kuuluu historiallisten esineiden ja kulttuuriaineiston säilyttäminen ja esittely. [S14, Functions]
6. Museon tehtävissä mainitaan arkeologiset kartoitukset ja kaivaukset. [S14]
7. Kokoelmassa on myös paikallisista arkeologisista kohteista peräisin olevaa vanhaa aineistoa. Se kertoo museon tutkimusroolista; ei siitä, että jokainen uuden ajan esine tai maalaus olisi PD:tä. [S14]

**Kulma:** rakennuksen aiempi koulukäyttö ja museon paikallinen tutkimustyö. Ei nykyisen sodan/politiikan näyttelyitä, taistelumuistomerkkejä, suojattuja uuden ajan maalauksia tai museon kohdekiintiön täyttämistä sijoittamalla kaukainen arkeologinen paikka sen museopisteeseen.

**1873:** nykyistä kansallismuseota ei ollut. **Kuva-aihe:** aidosti tunnistettu vanha kokoelmaesine vain sen oman oikeus-/kuvausketjun jälkeen, tai geneerinen tutkimusväline. Nykyisen koulutalon arkkitehtiketju ei selviä museon perustamisvuodesta.

### Minitehtävä: mikä yllättävä työ kuului kirkkokokonaisuuteen?

Oikea vastaus: **Paikalliskielisten koulu- ja uskonnollisten tekstien painaminen.** Väärät vaihtoehdot samaa toimintalajia: rannikon laivojen korjaaminen; rautatiekaluston kokoaminen; karavaanien punnitseminen.

Faktaselitys löytyy H2:sta: kirkkokokonaisuus oli myös koulun, kirjaston ja painotyön ympäristö. C muotoilee selityksen omaksi lauseekseen. Kaupungin viisassa ei kysytä painokoneesta, eikä minitehtävä sisällä palkkiomainintaa.

## 4. Opas

### Nykyinen turvallisuus- ja lupakehys

T1 päivätty **1.9.2026**, tarkistettu **11.10.2026**. **Noudata erityistä varovaisuutta.** Tämä ei ole sama kuin Juban/Khartumin poistumiskehotus. Asmaran ulkopuolelle tarvitaan erillinen etukäteen haettava matkustuslupa, jota ei aina myönnetä. Eritrean ja Etiopian raja on suljettu ja rajaseuduille annetaan erillisiä rajoituksia. Oppaassa sanotaan tämä käytännön ehto asiallisesti; ei nykyisten jännitteiden, sotien tai rikollisuuden tarinaa.

Pelaajalle pääkappaleen runko 4–7 virkkeeseen: **Asmaraan matkustettaessa tulee noudattaa erityistä varovaisuutta. Keskustan katuja, toreja ja kahviloita voi tarkastella omaa tahtiaan, mutta viranomaiskohteiden kuvaamista ja pimeässä matkustamista tulee välttää. Kaupungin ulkopuolelle tarvitaan ennakkoon haettava matkustuslupa. Hoidon ja lääkkeiden saatavuus on rajoitettua. Ylängön iltoihin kannattaa varata lämpimämpää vaatetta.** [T1; viimeinen virke W1:n alimmat normaalit]

Lopullisessa opastekstissä ei “UM:n mukaan” -metatekstiä. Varovaisuutta ei ylitetä V1:n väitteellä kaupungin äärimmäisestä turvallisuudesta tai yökävelyn ongelmattomuudesta. Pelkän kahvilan/torin lähdesivun olemassaolo ei ole aukiolon tai esteettömyyden lupaus.

### O1 — Perille ja liikkeelle

- **Asmara International Airport (ASM)** on saapumispaikan nimi. Ei Massawa eikä Gura. [S19]
- T1 kertoo Eritrean julkisesta liikenteestä, lähinnä busseista, sekä taksien saatavuudesta Asmarassa. Ei aikatauluja, linjanumeroita, kellonaikoja tai hintaluetteloa.
- Keskusta on katujen, torien ja kahviloiden kokonaisuus; asiointipaikat saa nimetä yleisesti V1:n nykyopasaiheena, mutta rakennusketjun avoin kuvapääaihe ei muutu hyväksytyksi nähtävyydeksi.
- Kaupungin ulkopuolinen retki tarvitsee luvan. Lähteessä oleva tarkka 10 päivän hakuaika on metatietona, mutta ilman kahta riippumatonta nykyistä lähdettä ohje on **hae lupa etukäteen**. [T1]
- Pimeässä matkustamista vältetään. [T1]

**Kuva-aihe:** tuore yleinen katu-/liikennenäkymä, jossa suojattu rakennus, viranomais-/sotilaskohde tai mainos ei pääaihe. Ei lentoaseman valokuvausta ehdottava toimintakuva.

### O2 — Tori ja käsityön kaupunginosa

- Keskustan markkinapaikka sijaitsee pääkirkon pohjoispuolella. V1:n paikannus on oppaan tekstiperuste, ei tilauksen oma WP/WD-karttapiste. [V1, See]
- Medeberissä voi kertoa dokumentoiduista käsityön, kierrätyksen ja chilin jauhatuksen toiminnoista. Nykyisiä työpaja-aikoja tai vierailuoikeutta ei luvata. [U2 s.234–235]
- V1 mainitsee toritavaroina muun muassa puuvillatekstiilejä ja keraamisia kahvipannuja. Ei valmistajaa, valheellista käsityöaitoutta tai nykyistä halvin/suosituin-ostopaikkaa.
- Nykyiset tekijän luomat kuviot/esineet tarvitsevat oman kuvapääaiheporttinsa; käsityömarkkina ei tee kaikkea siellä myytävää automaattisesti PD:ksi.

**Kuva-aihe:** tuore tavarakoju, käyttö-/kierrätysmateriaali tai yleinen torin arki ilman tunnistettavia lähikasvoja, pakkausmainosta tai modernia suojattua veistosta.

### O3 — Historiallisten rakennusvaiheiden lukeminen

- Rosary-kirkossa varhaisempi kirkkorakennus ja myöhempi kellotorni ovat eri vaiheita. [S4; U2]
- Teatterissa alkuperäinen pääteos ja myöhemmät katutason liiketilat eivät ole sama tekijäketju. [U2 s.70–71]
- Synagoga, moskeija ja Enda Mariam kuuluvat kaupungin uskonnolliseen ympäristöön, mutta sisäänpääsy tai nykyisten osien oikeudet eivät seuraa yleisen kohdemaininnan perusteella. [S6–S7; S13]
- Oppaassa käytetään kunnioittavaa pukeutumista ja huomioidaan paikan rajoitukset. [T1]
- Kuvan katsominen ja kohteen nimi eivät korvaa rakennuskohtaisia tekijätietoja. Näitä ei kirjoiteta pelaajan käyttöliittymän tekniseksi oikeusluetteloksi; faktapohjan ja B–F:n toimitusportti ratkaisee kuvat.

**Kuva-aihe:** vanhan kirkon hyväksyttävä julkisivu tai tekninen rakennusyksityiskohta, joka ei ole uusi suojattu teos. Eri tiedosto kuin H2 tai hyväksytty karttakohteen kuva.

### O4 — Kahvilaan ja paikallisesti maustetulle pastalle

- Espresso, cappuccino ja italialais-eritrealaista ruokaa ovat paikallisia Asmara-aiheita. [S1; S17]
- Pastan tomaattikastikkeeseen voi kuulua berbere. Seos ei ole yksi standardiresepti. [S17–S18]
- Lasagne ja gelato mainitaan kaupungin ruokakuvauksessa. [S1]
- V1 kuvaa kahviloita etenkin Harnet Avenuen ja Sematat Avenuen suunnalla. Ei yhden nimetyn kahvilan nykyistä hinnastoa, takuulla parasta kahvia tai aukiolokelloa.
- V1:n väite muiden jäätelöpaikkojen aiheuttamista vatsavaivoista on perusteeton yleistys: pois. T1:n terveys- ja hoitorajoite säilyy ilman ruokapelottelua.

**Kuva-aihe:** tuore kahvi-/ruokakuva, tarkka annostunnistus ja paikkaväite vain todistettuna. Geneerinen pasta tai espresso nimetään selitteessä geneeriseksi.

### O5 — Milloin ja mitä vaatetta

Kaikki seuraavat **vain W1:n valmiista sarjoista**:

- Vuorokauden keskilämpö on normaalikuukausissa noin **13–18 °C**. Ei ylintä ja alinta keskenään laskettua korviketta.
- Päivän ylin normaalilämpö on noin **22–25 °C** ja alin noin **4–11 °C**. Illan ja aamun vaatetusvaraus perustuu näihin, ei tämänpäiväiseen sääennusteeseen.
- Sade painottuu **heinä–elokuuhun**; valmis aineisto heinäkuu **175 mm**, elokuu **156 mm**. Muihin oppaan kuukausiin ei tuoda toisen lähteen poikkeavaa kausijakoa.
- Vuosisade noin **520 mm**; työkalun vuositausta **519 mm**, ei käsin muutettua 518/518.6-sarjaa.
- Talvikuukausissa sade on vähäistä. V1:n alle nollan yöt, helle-/kosteusääriväitteet ja nykyisen päivän sää eivät lähteeksi tämän normaaliluonnehdinnan lukuihin.

Pelaajatekstin ehdotus: **Asmara on päivisin leuto ja öisin selvästi viileämpi, joten mukaan kannattaa ottaa lämmin kerros. Sateet painottuvat heinä–elokuuhun. Käytännön liikkumis- ja lupaehtoja pitää noudattaa vuodenajasta riippumatta.** [W1; T1]

**Kuva-aihe:** tuore yleinen kaupunki-/luontokuva. Kuvan ajankohtaa tai sääennustetta ei päätellä sen vihreydestä. Ei uutta suojattua rakennusta pääaiheeksi.

### Säätausta: alkuperäinen 1961–1990-sarja

Valmis `asmara/saa.json` säilyy muuttamattomana. Lähde/poiminta:

- Artikkeli **Asmara**, revisio **1378508016**, luettu **2026-10-11**.
- Taulukko **Climate data for Asmara, Eritrea (1961–1990 normals, extremes 1903–2012)**.
- Normaalikausi **1961–1990**. Ääriarvojen 1903–2012 ei ole normaalisarjan kausi. Tätä ei nimetä 1991–2020:ksi eikä nykyiseksi sääennusteeksi.
- Lähderivit: **NOAA**; **Meteo Climat (extremes)**. Meteo Climatin ääriarvoja ei käytetä aineiston ylimpinä/alimpina normaaleina.
- Keskilämmön poiminta **Daily mean °C (°F)**, ei `(ylin + alin) / 2`.
- Sateen poiminta **Average precipitation mm (inches)**.
- `huomiot: []`.
- Sääpiste **15.34, 38.94**; lähdetaulukosta ei nimetä lentokentän nykyistä asemaa arvaamalla.
- Alkuperäinen ajon todiste `valiaikainen/e07/saa/alkuperainen-saa-ajo.txt`, Asmara-rivi.

| W1-sarja | Tammi–joulu, valmiin tiedoston arvot |
|---|---|
| keskilampo | 13.8, 14.9, 16.3, 17, 17.6, 17.6, 16.3, 16.1, 15.7, 14.9, 14, 13.2 |
| ylin | 22, 24, 25, 25, 25, 25, 22, 22, 23, 22, 22, 22 |
| alin | 4, 5, 8, 9, 10, 11, 11, 11, 9, 8, 7, 5 |
| sade | 4, 2, 15, 33, 41, 39, 175, 156, 16, 15, 20, 3 |

Taustan vuosisade **519**; alkuperäinen taulukko näyttää **518.6**. Työkalun pyöristys säilyy, ja C käyttää vain `saa.json`:ia sellaisenaan ilman `tausta`-kenttää. A:n taulukko on valmisarvojen dokumentointia, ei uusi käsin rakennettu sääaineisto. Kaikki muun lehden mahdolliset ilmastoluvut tulevat samasta W1:stä. Ei sateisuus-/leutoussuperlatiivia, ilman riippumatonta varmennusta.

### Parasta: viisi aihetta

Tähdet kuvaavat toimituksellista aihepainoa, eivät aukioloa, sisäänpääsyä tai turvallisuusluokitusta. Suojatun modernin teoksen mainos ei pääaiheeksi.

| Aihe | Tähdet | Lähteistetty selitteen ydin |
|---|---:|---|
| Katuverkon ja ylängön kohtaaminen | 3 | Suorat ja kaartuvat kadut mukautuvat aiempiin paikkoihin ja maastoon. U1/U2. |
| Kirkon vanha tiiliarkkitehtuuri | 3 | Rosary-kirkon oma, varmistettu varhainen suunnitteluketju; B:n pääaiherajaus. S4/U2/A4. |
| Medeberin materiaalien uusi käyttö | 2 | Paikallinen käsityö ja kierrätys. U2. |
| Kahvila-ateria | 2 | Espresso ja berberellä maustettu pasta paikallisessa ruokakuvauksessa. S1/S17. |
| Radan historiallinen nousu | 2 | Rannikon suunnan yhteys ja Asmaran vanha asema. S15/S16/U2. |

### Hyvä tietää: neljä riviä

1. **Lupa kaupungin ulkopuolelle:** haettava etukäteen, myöntämistä ei voi olettaa. Rajaseutujen rajoitukset eivät ole keskustan turistireittiä. [T1]
2. **Hoidon saatavuus:** hoito ja lääkkeet ovat rajoitetusti saatavilla. Ajantasaiset rokotus-/terveystiedot ja vakuutuksen kattavuus tarkistettava ennen matkaa. [T1]
3. **Rahanvaihto ja kuitit:** epävirallista rahanvaihtoa vältetään ja viralliset vaihtokuitit säilytetään maasta poistumista varten. Ei valuuttakursseja tai käteisrangaistusten tarinaa. [T1]
4. **Kuvaaminen ja pukeutuminen:** tarkista paikalliset kuvausrajat, vältä viranomais-/sotilaskohteiden ja lentoaseman kuvaamista; pukeudu vaatimattomasti. Ei Juban lupakieltoa siirretä Eritrean yleissäännöksi. [T1]

## 5. Kohdekartta: lähdekoordinaatit, tekijäketjut ja vaje

**Ei hyväksyttyä 6–8 kohteen kokonaisuutta.** Asmara ei ole pieni pääkaupunki tällä perusteella. Pisteet ovat historiallisesta keskusta-alueesta, mutta tekijä- ja osaketju voi estää kohteen. Sääntö ei tarkoita kaikkien 1900-luvun rakennusten automaattista kieltoa: Rosary-kirkon vanha tekijäketju on nimenomaan selvitetty. Toisaalta nykyisen kokonaisuuden kaikki osat eivät vapaudu vanhan perusarkkitehdin kuolinvuodella.

Seuraavat A–E ovat **ehdokasdossiereita**, eivät valmiin kartan numerointia. F–H ovat omapisteisiä mutta nykyrajauksella poisjääviä teosketjuja. I–K ovat lupaavia paikkoja tai vanhoja osia ilman tilauksen mukaista omaa WP/WD-pistettä. Kartan rajat ja 300 m marginaali laaditaan vasta hyväksyttyyn listaan; ei epävarmoista pisteistä muodostettua valmista bboxia.

### A. Ruusukon Neitsyt Marian kirkko — varmistettu vanha arkkitehti, B:n osarajaus

**Piste:** WD Q2061047 **15.33675, 38.93789**, alkuarvo **15.33674722, 38.93789167**, normaalirankki, precision **0.00000277777777778**. Kohteen oma S4-WP näyttää **15.33667, 38.93778** (pyöristetty DMS). Molemmat koskevat samaa kirkkoa; tarkempi WD-omapiste valitaan dokumentoidusti, ei keskiarvoa. Tyyppi rakennus.

**Tekijä:** S4, U2 s.66–67 ja A1 nimeävät **Oreste Scanavinin**. A4 painettu s.196 viite212/katsottu PDF156 ja WD Q136461018 ilmoittavat kuolinvuoden **1942**. Alkuperäinen suunnitelma on yli 70 vuoden ketjua **tekijän kuolemasta**, ei vain rakennusvuodesta. WD on tässä viitteetön, eikä sen riippumattomuutta A4:stä oleteta. Oikeusmuistion elämäkertadata ei tarkoita yhden lähteen tarkkojen vuosien julkaisemista nostossa.

Kohdejutun kahdeksan faktaa:

1. Katolinen kirkko Asmaran keskustassa. [S4]
2. Nimi on Our Lady of the Rosary; paikallinen katedraali-nimitys ei tarkoita samaa asiaa kuin nykyinen Kidane Mehret -katedraali. [S4]
3. Suunnittelija on Oreste Scanavini; työmaata valvoi Mario Mazzetti. Työmaanvalvonta ja arkkitehdin suunnittelu erotetaan. [S4]
4. Tyylissä on lombardialaisia uusromaanisia piirteitä. [S4; U2]
5. Ruskeaa tiiltä käytettiin rakennuksessa ja lähetyskokonaisuudessa. [U2]
6. Pohjakaavassa on keskilaiva, sivulaivat ja poikkilaiva. [S4]
7. Kellotorni on erillinen ja kirkon päävaihetta myöhempi. [S4; U2]
8. Pihapiirissä oli koulu-, kirjasto- ja painotoimintaa. [U2]

**1873:** nykyistä kirkkoa/kompleksia ei ollut. **A:n arvio:** alkuperäinen ulkoarkkitehtuuri on lupaava hyväksyttävä kohde; **ei koko nykykompleksin ja kaikkien kuvassa näkyvien teosten lopullista hyväksyntää**. Mazzettin mahdollinen teosrooli, myöhemmät muutokset, torni/moderni kello ja erillinen taide tarkistetaan B:n pääaiheessa. S4 nimeää uudemman sähköisen kellon, sisällä on myös erillisten taiteilijoiden teoksia; näitä ei vapauteta Scanavinin kuolemalla. Katolinen/ortodoksinen kirkkokokonaisuus pidetään nimissä erillään.

### B. Asmaran teatteri — alkuperäinen osa ja myöhemmät tekijät

**Piste:** WD Q1652119 **15.33582, 38.93523**, alkuarvo **15.335822, 38.935225**; oma S5-WP **15.33580, 38.93520**. Molemmat saman rakennuksen omia pisteitä; WD tarkempi. Tyyppi rakennus.

**Tekijäketju:** alkuperäinen **Odoardo Cavagnari**, U2/WD kuollut **1920**. U2 s.70–71 nimeää myöhempien muutosten arkkitehdeiksi **Antonio Vitalitin ja Pietro del Fabron**. Näiden kuolinvuodet eivät ole vahvistettuja. Katon **Francesco Saverio Fresan** maalaus on oma teosketjunsa, ei Cavagnarin rakennusteos.

Kahdeksan lähteistettyä faktanäkökulmaa:

1. Paikka on teatteri, jota kutsutaan myös Asmara Operaksi. [S5]
2. Sijainti Harnet Avenuen ja Beleza Streetin yhteydessä. S5:n “Harriet” on kirjoitusasupoikkeama; U2:n katu on Harnet. [S5; U2]
3. Alkuperäisen rakennuksen suunnitteli Cavagnari 1900-luvun alkupuolella. [S5; U2; A1]
4. Symmetrinen julkisivu yhdistää uusromaanisia ja renessanssipiirteitä. [U2]
5. Kaarikäytävä ja portaat yhdistävät rakennuksen kadulle. [U2]
6. Myöhemmässä muutoksessa tilaan tuli elokuvakäyttöä ja projektoritila. [U2]
7. Katutasoon lisättiin kaupallisia tiloja; ne eivät ole sama alkuperäinen rakennusvaihe. [U2]
8. Rakennus koostuu vastaanotto-, katsomo-/näyttämö- ja taustatiloista. [U2]

**1873:** ei nykyistä teatteria. **Ehdollinen:** voi hyväksyä vain yksilöidyn alkuperäisen pääteoksen, jos B erottaa sen myöhemmistä pääaiheista. Koko nykyisen julkisivu-/liikekokonaisuuden teosketju ei ratkea Cavagnarin vuoden 1920 kuolemalla. Ei hyväksytty koko kohteena ennen osaporttia. Ei kuvia Fresan maalauksesta ilman omaa oikeusketjua.

### C. Asmaran synagoga — oma paikka, tuntematon rakennuksen tekijä

**Piste:** WD Q256573 **15.33731, 38.94073**, alkuarvo **15.337309, 38.940728**, normaalirankki, precision **0.00000277777777778**. Oma S13-WP **15.33722, 38.94083**, pienempi tarkkuus. Oma seurakunta- ja rakennuspaikka, ei koko kaupungin juutalaisyhteisön historiallinen alue. Tyyppi rakennus.

Kuusi kohdefaktaa:

1. Rakennus on Asmaran synagoga. [S13]
2. Se liittyy ortodoksijuutalaiseen seurakuntaan. [S13]
3. Sijainti Haile Mariam Mammo Streetillä. [S13]
4. Seurakunnan perustamisvaihe liittyy Adenista tulleisiin jemenin juutalaisiin. [S13]
5. Kokonaisuuteen kuuluivat rukoustila ja luokkahuoneita. [S13]
6. Kokonaisuuteen liittyy myös hautausmaa. [S13]

**1873:** tämän lähteen kuvaama rakennus ja seurakunnan perustaminen ovat myöhempiä, 1900-luvun alun vaiheita. **Portti:** arkkitehti/tekijä ja kuolinvuosi eivät selviä S13:sta tai omasta WD-entiteetistä. Rakennusvuosi 1906 ei yksin todista 70 vuoden rajaa. Tuntematon nimi ei tarkoita dokumentoidusti anonyymiä teosta. **Ei hyväksytty kohde nyt**, mutta lupaava vanhan ytimen selvityspaikka. Vanhojen lehtilähteiden “viimeinen asukas”/“ainoa perhe” -väitteitä ei kirjoiteta nykytilaksi tai eksotiikkakertomukseksi.

### D. Eritrean kansallismuseon nykyinen paikka — kokoelmateema, rakennus/piste vielä varmistettava

**Piste:** S14:n oman museon WP **15.33333, 38.92722**, sama V1:n listingissä. **WD Q1968666 ei sisällä P625:tä.** Artikkelin piste on karkea; V1:n sama luku ei ole itsenäinen paikantaminen. Älä nimeä sitä entisen State Palacen pisteeksi tai yksittäisen arkeologisen esineen löytöpaikaksi. Mahdollinen rakennuspaikka.

Seitsemän faktaa kohdejutulle ovat H4:n museon oma toiminta, palatsi-/koulupaikan ero, säilytys, esittely ja arkeologinen tutkimus. [S14]

**1873:** nykyistä kansallismuseota ei ollut. **Portti:** nykyisen fyysisen koulutalon tekijä/ikävaiheet ja WP-pisteen täsmällinen yhteys juuri nykyiseen Comboni-sisarten koulupaikkaan eivät tässä varmistu kahdella paikantavalla ketjulla. Museon toiminnallinen luokitus ei automaattisesti tarkoita suojattua rakennusteosta, mutta se ei myöskään vapauta rakennusta sen institutionaalisella perustamisvuodella. Jos kohde hyväksytään kokoelman vanhojen esineiden kautta, B:n pääaihe on tarkasti oikea vanha esine ilman suojattua nykyteosta; tämä ei tee epävarmaa rakennuspistettä tarkaksi. **Ehdollinen, ei hyväksytty karttarivi.**

### E. Asmaran rautatieasema — oma vahva piste, rakennuksen tekijä avoin

**Piste:** WD Q3968917 **15.33894, 38.94932**, alkuarvo **15.338936, 38.949323**, normaalirankki, precision **0.00001**. Oman S16:n DMS **15°20′20.17″N, 38°56′57.56″E** vastaa samaa paikkaa. Ei Arbaroban, Nefasitin tai Massawan aseman piste. Tyyppi rakennus/asemapaikka toimituksen ratkaistavaksi.

Seitsemän kohdefaktaa:

1. Asema palvelee historiallisesti Eritrean pääkaupunkia. [S16]
2. Se on Massawan linjan pääteasema. [S16]
3. Sen avaus liittyi Arbaroba–Asmara-osuuden valmistumiseen. [S16]
4. Linja jatkui myöhemmin myös pohjoiseen; eri verkonvaiheet erotetaan. [S16; S15]
5. Aseman siirtämistä keskeisemmälle paikalle suunniteltiin 1900-luvulla, mutta siirto ei toteutunut. [S16]
6. Aseman, työpajojen ja muiden rautatietilojen kokonaisuus sijaitsi kaupungin itäreunalla. [U2 s.230–231]
7. Rata toi Asmaran rannikolle ja Punaisenmeren kaupankäyntiyhteyksiin. [U2; S15]

**1873:** ei nykyistä asemaa tai rataa. **Portti:** U2 nimeää aseman alkuperäiseksi arkkitehdiksi **unknown**. Ei todistetta tekijän kuolinvuodesta eikä nimen puute automaattinen anonyymin teoksen suoja-aika. Toiminnallista ratapihaa tai teknistä rakennusta ei automaattisesti väitetä suojatuksi taiteeksi, mutta täsmällinen hyväksyttävä pääaihe ja mahdollinen rakennusteosketju on ratkaistava. **Ehdollinen, ei hyväksytty ilman sitä.** Vanhat avaamis-/uudelleenavaamisvuodet tai nykyliikenteen vanhat väitteet eivät takaa tänään lähtevää junaa.

### F. Enda Mariam — myöhempi pääkirkko ja erillinen vanha Dege Selam

**Pääkirkon oma piste:** WD Q1972822 **15.33981, 38.94417**, alkuarvo **15.339806, 38.944173**. S6:n oma WP **15.33980, 38.94420**. Tätä ei nimetä erillisen **Dege Selamin** omaksi rakennuspisteeksi.

Lähteistetyt faktat: Eritrean ortodoksikirkon kirkko; Arbate Asmara Street; aiempi yksinkertainen paikallinen kirkkorakenne; myöhempi E. Gallon kirkkovaihe; nykyinen suurempi 1900-luvun vaihe; vaakasuoran kivi-/puurakenteen paikalliset esikuvat; erilliset tornit; samassa kokonaisuudessa oleva Cavagnarin suunnittelema Dege Selam. [S6; U2 s.240–241]

**Tekijäketjun ratkaisu:** U2 **St Mary's: E. Gallo (1920); unknown (1938–39); Dege Selam: Odoardo Cavagnari (1917)**. A1 attribuoi vuoden 1938 nykykirkon Gallolle; S6 attribuoi vuoden 1920 osan eri lähteissä Gallolle ja Cavagnarille. Näitä ei yhdistetä kaikkiin nykyosiin samaa kuolinvuotta soveltavaksi ketjuksi. S6:n väite Cavagnarista Fiat Taglieron tekijänä on virheellinen (Fiat Pettazzi), joten tätä viitettä ei käytetä arkkitehtivarmennuksena.

**1873:** lähteiden nykyisiä 1900-luvun kirkkorakennuksia ei ollut; vanhasta paikallisesta kirkkoperinteestä voi kertoa, mutta ei väittää kuvassa olevan nykyisen kirkon jo seisoneen siellä. **Pääkirkko pois hyväksytystä kohteesta** tekijäketjun vuoksi. **Dege Selam on lupaava erillinen vanha osa**, Cavagnarin kuolema varhainen, mutta oma WP/WD-koordinaatti ja mahdollisen enkelimaalaustaiteen tekijäketju puuttuvat: ei pääkirkon pisteen siirtoa tai kokonaiskuvan vapauttamista.

### G. Cinema Impero ja Fiat Tagliero — tekijät selvitetty, nykyrajauksella pois

- **Cinema Impero:** oma WP/WD **15.33667, 38.94028** (Q954653 alkuarvo 15.33666667, 38.94027778). Tekijä **Mario Messina**, A3:n arkistomuseon oma elämäkerta **kuollut 1987**. Tämä on oikea Asmaran Cinema Impero -arkkitehti, ei samanniminen sattuma. **Ei kohteeksi eikä suojatuksi teospääaiheeksi** nykyisellä alle/ylitse 70 vuoden rajauksella. Vanha rakennusvuosi ei muuta ratkaisua.
- **Fiat Tagliero:** oma WP/WD **15.32833, 38.92583** (Q1410651 alkuarvo 15.32833333, 38.92583333). Tekijä **Giuseppe Pettazzi**, S8/U2/A1, oma henkilö Q5565500/S9 kuollut **2001**. WD-rakennusentiteetin virheellistä Ferrazza-P84:ää tai S6:n Cavagnari-attribuutiota ei käytetä. **Pois kohteena ja suojattuna teospääaiheena**. Uhkailu-/aselegendaa tai siipien ristiriitaisia mittoja ei nostoiksi.

Nämä ovat kontekstin tunnettuja maamerkkejä, eivät salaa hyväksyttyjä uusia karttakohteita. Nykyisen kartan salliminen ei ohita teosrajausta.

### H. Suurmoskeija ja kaupungintalo — suunnitteluketju/identiteetti ei riitä

**Moskeijan oma piste:** Q11957212/S7 **15.33889, 38.94167**; WD precision noin **0.00931**, ei oven tarkkuus. S7:n pääteksti **Guido Ferrazza**; U2 kohderivi **unknown; Giuseppe Arata (1943)** ja Ferrazza nimenomaan laajemman aukiosuunnitelman tekijänä. A1 nimeää **Ferrazza ja Arata**. Ferrazza kuoli A2:ssa **1961**, Aratan kuolinvuosi ei tässä selvitetty. **Ei hyväksytty kohde** nykyrajauksella, vaikka toiminnallinen rukouspaikka on edelleen paikalla. Piste ei kuulu torille tai moskeija-aukiolle erillisenä paikkana.

**S12:n City Hall/Governor's Palace -piste:** Q1758861 **15.33611, 38.94139** (alkuarvo 15.336111111111, 38.941388888889). Artikkeli kuvaa myöhempää kaupungintaloa ja vertaa sitä vanhaan palatsiin. U2:n **State Palace** on eri fyysinen paikka: vanha suunnittelu **Gondolfi Primizio Ramigio**, myöhemmät muutokset **Arturo Mezzedimi**; vanha pääjulkisivu ja uusi portaikko/siivet eri kerroksia. **S12:n pistettä ei siirretä State Palaceen.** Nämä eivät ole nykyisen politiikan/viranomaiskohteen opaskertomuksia tai hyväksyttyjä kohteita.

### I. Medebarin vanha portti — tekijä lupaava, oma WP/WD-piste puuttuu

U2 s.234–235 nimeää alkuperäiseksi arkkitehdiksi Cavagnarin. Säilynyt vanha portti/reuna on yksilöity, suuri osa muusta vanhasta kokonaisuudesta kadonnut. K2:ssa seitsemän käyttö-/rakennushistorian faktaa. **En-Wikipedia Medebar/Medeber/Medebar Market/Medeber Market ja it-Wikipedia Mercato di Medeber/Mercato Medebar eivät antaneet omaa artikkelia. Oma WD-entiteetti/P625 ei löytynyt.** Ei koordinaattia katuosoitteesta, UNESCO-kartasta käsin, toisen torin pisteestä, kaupungin yleispisteestä tai kuvien EXIFistä. Lähdepisteen puute on kirjattu; **ei valmis karttarivi**.

### J. Mai Jah Jah, Harnet ja toriaukiot — oma paikkapiste ja suunnitelman pääaihe

U2 kuvaa Mai Jah Jahin suihkulähteen suunnittelijaksi **Lorenzo Azzonin**, vanhempi kaupunkisuunnitelma ja myöhempi toteutunut suihkulähde eri asioita. Kuolinvuosi puuttuu. Suihkulähteen mahdollisesti suojattua teospääaihetta ei nimetä luonnonpuistoksi oikeusrajan ohittamiseksi. **Omaa WP/WD-paikkapistettä ei löytynyt.**

Harnet Avenue, Market Square ja Mosque Square ovat lähteissä täsmällisiä kaupunkipaikkoja, mutta **oma WP/WD-koordinaatti puuttuu**. Moskeijan pistettä ei siirretä aukiolle. Julkinen aukio tai tie ei automaattisesti ole taideteos, mutta erillinen suojattu moderni veistos, monumentti, suihkulähde tai rakennus ei tule hyväksytyksi kuvan pääaiheeksi aukion nimen alle. U2:n arkkitehtisuunnitelman tekijät ja toteutumattomat osat kirjataan tarvittaessa eikä kaikkia luonnoksia oleteta rakennetuiksi.

### K. Luonto/hautapaikat keskustan ulkopuolella — ei kohdekiintiön täytettä

V1:n Tselot ja Martyrs National Park ovat kaupungin ulkopuolisia retkiaiheita, joihin liittyy T1:n matkustuslupa; eivät tämän historiallisesta keskustasta laadittavan kartan aukon paikkaus. Asmaran sotakalustoromuttamo on eri asia kuin Medeberin käsityö- ja kierrätysmarkkina: ei sitä nimeämällä kierrätystarinaa nykyisen sodan aineistoksi. Civil/war cemetery -paikkojen hautataide ja muistomerkit vaativat omat ketjut, eikä karttapalvelun löytäminen ole oma WP/WD-pistetodiste. Mai Bela -yleisjoki ei korvaa yhden keskustan rantapaikan pistettä.

## 6. Viisi kysymysaihetta ja kolme tietoa

C kirjoittaa jokaisen vastauksen myös varsinaiseen lehtitekstiin. Ainakin tasot 1 ja 3 mukana. Vihje ei toista vastausta; väärät vaihtoehdot samaa lajia ja suunnilleen samaa pituutta. Oikea vaihtoehto ei toisen pelikaupungin nimi.

| Taso | Kysymysaihe | Oikea vastaus ja lähde | Vihjeen suunta |
|---:|---|---|---|
| 1 | Minkä maan pääkaupunki Asmara on? | Eritrea; S1, intro | Maan sijainti Punaisenmeren rannalla, ei maan nimi suoraan. |
| 2 | Keiden yhteiseen aloitteeseen paikallinen perustamistarina liittyy? | Kylien naisten; K1/S1–S2 | Kertomuksen päätöksenteko, ei “naiset” vihjeeseen. |
| 3 | Millaisesta paikasta Medeber kehittyi käsityön ja kierrätyksen keskukseksi? | Karavaanien pysähdyspaikasta; K2/U2 | Matkaajien tavaroiden huolto ja varustautuminen; ei sama vastaussana. |
| 2 | Mikä paikallinen maku liittyy Asmaran tomaattikastikepastaan? | Berbere-mauste; K3/S17–S18 | Ruokalajin täydempi nimi auttaa, mutta vastaussanaa ei vihjeessä. |
| 3 | Mihin käyttöön teatteria muutettiin myöhemmässä rakennusvaiheessa? | Elokuvateatteriksi; H3/U2 | Ajattele katsomisen teknistä tapaa, ei “elokuva” vihjeeseen. |

**Kolme tietoa:**

1. Asmaran katuverkossa on sekä ruutua että kaarevia/radiaalisia linjoja, jotka liittyvät paikalliseen maastoon. [U1/U2; H1]
2. Medeberin käsityöläiset ovat valmistaneet käyttöesineitä kierrätysmateriaaleista. [U2; K2]
3. Pääkirkkona tunnettu Rosary ei ole sama paikka kuin Asmaran nykyinen katolinen Kidane Mehret -katedraali. [S4; H2]

Ei toisteta painotyön minitehtävää visana. Ei sääarvoja, rakennusten määriä, maailmanperintöalueen pinta-alaa, maantieteellisiä korkeusrankingeja tai isoisän keksittyä havaintoa näiksi tiedoiksi.

## 7. Kuvatarpeet B:lle

**Ei Commons-hakuja tai kuvavalintoja tässä A:ssa.** Aiheet ovat rooleja, eivät hyväksyttyjä tiedostonimiä. Lähdesivun oma kuva, UNESCO-ehdotuksen arkistokuva tai hakutulos ei ole lisenssitodiste. Kuvaajan lisenssi, kuvassa näkyvän teoksen ketju, mahdollinen erityislupa ja paikan kuvaus-/käyttöraja ovat erillisiä.

| Rooli | Aihe | Identiteetti ja teosraja |
|---|---|---|
| Kansi 1 | Laaja historiallinen keskustan yleisnäkymä | Nimetty Asmara; suojattu moderni rakennus/monumentti ei kuvan pääaihe. |
| Kansi 2 | Ylängön kaupunki ympäristössään | Paikan oma maisema; ei Tselotin/Massawan kuvaa keskustana. |
| Kansi 3 | Tori-/aukiopaikan laaja yleiskuva | Toiminnallinen paikka tunnistettu; moskeija tai suojattu suihkulähde ei salattu pääaihe. |
| K1 | Vanha paikallinen asutus tai tori | Ei nykyisiä naisia perustamistarinaan lavastettuna. |
| K2 | Medeberin kierrätysmateriaali/tekninen työ | Portti vain alkuperäisosat ja oma paikka tunnistettuna; uudet esineet eivät automaattisesti PD. |
| K3 | Pasta/berbere/espresso | Ruoan tunnistus ja paikka tarkasti; geneerinen kuva yleiseksi. Ei merkkipakkausta. |
| K4 | Rautatie/vanha tekninen kalusto | Oma Asmaran paikka; ei suojattua nykyistä rakennuspääaihetta tai modernia livery-/mainospääaihetta. |
| H1 | Kaava/maasto/katuverkko | Karttateoksen oikeus, ei U2-kuvituksen automaattista lainaamista. |
| H2 | Rosaryn vanha tiiliarkkitehtuuri tai yleinen vanha painokone | Scanavinin ketju; modernit kellot ja erilliset taideteokset tarkistettava. Geneerinen painokone ei kirkon oma. |
| H3 | Teatterin alkuperäinen ulko-osa tai yleinen vanha projektori | Cavagnari vs. myöhemmät Vitaliti/del Fabro; ei Fresan maalausta ilman omaa ketjua. |
| H4 | Vanha tunnistettu museoesine tai tutkimusväline | Ei nykymaalauksia/taistelumuistoja; esineen ja kuvan oikeus erikseen. |
| Matkailijalle | Tuore maltillinen pysty vanhasta hyväksyttävästä kirkon osasta tai teknisestä/arkitavaran aiheesta | w/h 0.60–0.85, yksi selkeä aihe; ei suojattua modernia julkisivua, lähikasvoa tai mainosta. |
| O1 | Tuore yleinen liikenne-/katukuva | Ei sotilas-/viranomais-/lentoasemapääaihetta. |
| O2 | Tuore torin käyttö-/kierrätystavara | Ei väärää nimeämistä, tekijäketju tarvittaessa. |
| O3 | Hyväksytty vanha kirkon ulko-osa | Eri tiedosto kuin H2/karttakohde. |
| O4 | Tuore kahvi-/ateria | Geneerinen annos ei Asmaran paikallisspesiaali ilman tunnistusta. |
| O5 | Tuore yleismaisema | Ei kuvasta johdettua kuukautta, sääennustetta tai normaalilukua. |
| Kohdekuvat | Vasta hyväksytty paikkalista | A–E ehdollisia, F–H suojatut/epävarmat pois; I–J tarvitsevat oman paikkapisteen. |
| Matkakirjan valokuva | Nykyinen laaja hyväksyttävä kaupunki-/luontokuva | Ei 1873:n lavastusta tai ennen–nyt-paria ilman vanhaa hyväksyttyä PD-vedosta. |

**B:n tekniset portit:** Commonsista ≥1200 px leveä; PD/CC0/CC BY/CC BY-SA; ei NC/ND/fair use. Artist sanatarkasti lähdemetatiedosta, ei käyttäjänimen taakse arvattua henkilönimeä. Jokainen kuva katsotaan; ei lähikasvoja, vesileimoja, arkistoleimoja, aikaleimoja, lisättyä tekstipintaa, mainospääaihetta tai epäterävää todistuskuvaa. Yksi tiedosto kerran kaupungissa, sallittu valokuva-/ennen–nyt-poikkeus erikseen. Oppaasta enintään kaksi viidestä jaksosta kuvatonta ilman kirjattua poikkeamaa.

**Oikeusketju:** valokuvan CC ei vapauta kuvattua suojattua teospääaihetta. Puuttuva kaupallinen FOP ei elvytä jo päättynyttä tekijänoikeutta. Pelkkä rakennuksen vanhuus tai tuntematon arkkitehdin nimi ei todista tekijän kuolleen yli 70 vuotta sitten. Voimassa olevaa tilaajan 70 vuoden rajaa ei ole muutettu A:ssa; sen suhde #74:n FOP-sääntöön on pääsession toimituskysymys. Algeriaa/Kap Verdeä koskevia PD-/folklore-maksuja tai erityisehtoja ei siirretä Eritreaan ilman maakohtaista lähdetukea. Eritrean kaupallisen FOP:n oikeusvarmennus ei ole tehty tässä A:ssa.

**Kuvatekstiraja:** kertoo mitä oikeasti kuvassa on ja sen merkityksestä; ei viereisen kirkon tarinaa toisen kirkon kuvan alle. Matkailun tuore kuva ei väitä kaikkia toimintoja nykyisin avoimiksi, ja vanha rautatiekuva ei ole tämänpäiväinen palvelulupaus. Kuvaroolin muutos muuttaa myös tekstin ja selitteen rajauksen näkyvästi.

## 8. Ristiriidat ja avoimet asiat

| Asia | Tarkka havainto | Ratkaisu |
|---|---|---|
| A:n kohdemäärä | Kuusi–kahdeksan hyväksyttyä ydinkohdetta ei vahvistu. | **A avoin karttahyväksynnän osalta**, ei pienen kaupungin poikkeusta. Hyvä historiallinen tekstiaineisto voi valmistua erikseen. |
| Rosary | Arkkitehti Scanavini vahvistettu, kuolema 1942 A4:n arkistopohjaisessa tutkimuksessa; WD ilman viitettä. | Lupaava alkuperäinen rakennus, ei kaikkien nykyosien/taideteosten vapautusta. Tarkat pelaajatekstin vuodet omaan lähdetauluun. |
| Teatteri | Cavagnari 1920; S5 ajoitus1918/1936, U2 1919–20/1937; myöhemmät Vitaliti/del Fabro ja Fresa eri ketjuja. | Vuosisata; alkuperäinen pääaihe erotettava. Koko nykyteatteri ehdollinen. |
| Enda Mariam | U2 Gallo 1920/tuntematon 1938–39; A1 Gallo 1938; S6 Cavagnari/Gallo ja väärä Fiat-attribuutio. | Nykyistä pääkirkkoa ei hyväksytä yhdellä varhaisella kuolinvuodella. Dege Selam erillinen vanha osa, oma piste/taideketju puuttuu. |
| Fiat Tagliero | WD Q1410651 P84 Ferrazza, mutta oma tekijä Pettazzi S8/U2/A1; S6:n Cavagnari-väite väärä. | Rakennuksen oikea tekijäketju kirjataan. Pettazzi 2001 → pois suojattuna pääaiheena/kohteena nykyrajauksella. |
| Cinema Impero | Mario Messina, arkistomuseon oma elinvuosi 1987. | Ei sekoitusta muihin samannimisiin; nykyrajauksella pois. |
| Moskeija | S7 Ferrazza, U2 alkuperäinen tuntematon/Arata1943; Ferrazza suunnitteli laajempaa aukiojärjestelyä. | Täydellistä rakennuksen tekijäketjua ei kuitata; Ferrazza 1961, Aratan kuolema puuttuu. Pois nyt. |
| Synagoga | Rakennus1906 mutta tekijä/kuolema puuttuu. | Ikä ei yksin70-portti, ei “anonyymi” ilman lähdetukea. |
| Museon paikka | Palatsi → entinen koulutalo; oman WP:n piste karkea, WD ei P625. | Ei vanhan palatsin tai arkeologisen löytöpaikan pisteeksi; nykykoulupaikan/tekijän ketju avoin. |
| City Hall vs. State Palace | S12:n nimi sisältää Governor's Palace, mutta koordinaatti nykyiselle kaupungintalolle. U2:n vanha State Palace eri teosketju, Mezzedimin myöhemmät osat. | Ei pistesiirtoa eikä useamman rakennuksen yhdistämistä nimen perusteella. |
| Medeber ja Dege Selam | Varhainen Cavagnari-ketju lupaava, mutta omat WP/WD-pisteet puuttuvat. | Ei siirtoa naapurin, katuosoitteen tai valokuvan pisteestä. |
| Mai Jah Jah | Azzonin suihkulähde ja vanha suunnitelmavaraus eri asioita; ei omaa WP/WD-pistettä/kuolinvuotta. | Ei suojattua suihkulähdettä luonnoksi/aukioksi nimeämällä. |
| Vanhat aukiosuunnitelmat | U2:ssa paljon toteutumattomia jatkoja ja eri arkkitehtien muutoksia. | Ei jokaista suunnitelmakuvaa valmiiksi rakennettuna tai osallista arkkitehtia koko kaupungin tekijäksi. |
| Väestö | Kontekstin2020-arvio vs. WP:n 2023-arvio ja eri YK:n kaupunkikeskittymärajaus. | Ei nykyistä virallista väkilukua tai väärää kunta-/metrolabelia; introsta pois. |
| Maailmanperintörajat | S1 “entirety” ja sen yhteydessä vaihtelevia pinta-aloja; U1 rajaa kohteen ja bufferin. | Ei koko nykykaupungin laajuutta kulttuuriperintöalueeksi. Ei tarkkoja hehtaareja ilman lähdetaulua. |
| Katedraali-nimi | S4 selittää apostolisen pääkirkon/varsinaisen katedraalin eron, V1 sanoo lakanneen olemasta katedraali. | Käytetään Rosary-kirkon omaa täsmällistä nimeä, ei nykyistä katolista katedraalia sen kuvaksi. |
| Sääkausi | Valmis taulukko 1961–1990, ääriarvot 1903–2012. | Ei 1991–2020-otsikkoa, ei Meteo Climatin ääriarvoja normaaleiksi. |
| UM vs. V1 | V1 sanoo äärimmäisen turvalliseksi/yökävely ja prostituution laillisuus; T1 erityinen varovaisuus, pimeän matkustamisen välttäminen ja eri lakiväite. | T1 käytännön opasrajat; lakiaihe ei nosto, yökehotus pois. |
| Ulkopuoliset retket | V1 antaa Tselotin ja puiston bussiohjeita, T1 edellyttää kaupungin ulkopuolista lupaa. | Ei luvattua retkeä/aikataulua eikä alueen pistettä ydinkarttaan kiintiön vuoksi. |
| Tarkat henkilötiedot | WD-tuonnit usein riippuviaWikistä tai Treccanista; yksi elämäkerta ei muutu kahdeksi. | Pelaajatekstin määrät/vuodet riippumattomien alkuperäislähteiden tauluun; oikeusmuistion epävarmuus näkyviin. |

### Hakujen epäonnistumiset ja käyttämättä jätetty aineisto

`Cathedral of Our Lady of the Rosary, Asmara` antoi 404, oikea **Church of...** on S4. `Asmara Opera House`404, oikea **Asmara Theatre** S5. `Odoardo Cavagnari` ja `Ernesto Gallo` en-Wikipedia palautti 404; Cavagnarin WD ja U2/U3, Scanavinin WD/A4 luettu erikseen. Medebar/Medeber/MedeberMarket/MedebarMarket ja italialaiset market-otsikot palauttivat 404. AsmaraCentralStation / Asmara railway station palauttivat 404, oma **it-StazionediAsmara** S16 ja Q3968917 löytyivät S3:n linkistä. MaiJahJah/HarnetAvenue/MaiJahJahPark/AsmaraItalianCemetery/italialainen cemetery-otsikko, AlbergoItalia-otsikko, AsmaraPublicBath ja yleinen National Park of Eritrea palauttivat 404: ei näistä keksittyjä kohteita.

Politecnico di Milanon Cavagnari-abstrakti ja Il Corno d'Africa-sivu palauttivat 403; **ei käytetty todisteena** hakutuloksen perusteella. UCM:n Messina-artikkelin osoite päätyi apurin uudelleenohjausrajaan, sisältöä ei käytetty; A3:n museon alkuperäinen sivu luettiin. DNB/GND-verkkotunnuksen robots-aineisto ei ollut apurin odottamaa UTF-8-koodausta ja tarkistus epäonnistui ennen elämäkertasivun sisällön lukemista: GND:tä ei käytetty uutena lähteenä. Näitä ei ohitettu kielletyllä reitillä tai käsin ohitetulla robots-tarkistuksella.

## 9. Poisjätöt ja toimituksen portit

### Toistorajat ja poisjätöt

- `konteksti.json` luettu: **maalehti null, lähinostot ja lähikaupungit tyhjät**. Ei tähän perusteettomasti toisen kaupungin toistorajaa; olemassa oleva kevyt Asmara-kuvaus ja maaperustietojen maailmanperintö-/modernismimaininta ovat silti käytössä. Uusi lehti syventää paikallista arkea, ei kopioi kevyttä kuvausta nostoksi.
- Fiat Tagliero, Cinema Impero, tuntematon nykyinen Enda Mariam, moskeijan epäselvä täysi ketju ja uudet suojatut teokset eivät ole hyväksyttyjä kuvia tai kohteita nykyrajauksella. Tunnettujen maamerkkien olemassaoloa ei poisteta, mutta se ei ole teosportin ohitus.
- Suojatun suihkulähteen, nykyveistoksen, muistomerkin tai julkisivun nimeäminen luonnoksi/toriksi ei ratkaise oikeutta.
- Lainatut kolonialistiset “valkoisen miehen etuoikeus”-/“tyhjä kangas”-/“italialaiset antoivat kansalle identiteetin” -väitteet ja Mussolinin sankarikehys eivät pelaajatekstiin. Historiallinen erottelu todetaan tarpeen mukaan neutraalisti.
- Nykyinen politiikka, vaalit, rajasota, rikollisuus tai ihmisten kurjuuden korostaminen ei uusia tarinoita. UM:n käytännön lupa- ja hoitorajat kerrotaan asiallisesti.
- Satunnainen “viimeinen juutalainen”, kuninkaanvierailu, arkkitehdin aseuhkaus ja huoltoaseman siipien mitta-/uhkailulegenda pois ilman riittävää todistusketjua; eivät muutenkaan kohdekiintiön täytettä.
- Tarkat kapasiteetit, kulttuuriperintöhehtaarit, rautatietunnelien/siltojen määrät, siipien mitat, väestökasvu ja korkeussuperlatiivit pois ilman tuplavarmennusta. Sääpoikkeus käyttää vain valmista työkalutiedostoa.
- Oppaan vanhat hinnat, kellonajat, bussilinjanumerot, junaretket tai lentoyhtiölistat eivät palvelulupauksiksi.
- Ei sepitettyä isoisän tekemistä tai nykyisen rakennuksen kuvaa vuodesta 1873. Ennen–nyt vain erikseen hyväksytty kuva ja todellinen nykyinen vastinpari.

### Valmius

| Vaihe / osa | Tila |
|---|---|
| A: luetut lähteet, 0–9, 4+4 nostoa, 5 opasjaksoa, kysymykset/tiedot, toistorajat | **Koottu ja lähteistetty**, epävarmuudet ja numerokuri näkyvät. |
| A: hyväksytty 6–8 kohteen paikkajoukko | **Avoin.** Rosary-lähtöketju vahva; teatteri, synagoga, museo ja asema ehdollisia; Medebar, Dege Selam ja aukiot ilman omaa WP/WD-pistettä; tunnetut myöhään kuolleiden tekijöiden teokset pois. |
| Sää | **Valmis 1961–1990**, alkuperäinen `saa.json` muuttamatta; luonnehdinta vain sen luvuista. |
| B: Commons-kuvat ja teos-/lisenssiketju | **Ei tehty A:ssa.** Roolit osiossa 7, ei kuvavalintoja tai oikeuskuittauksia. |
| C: valmiit tekstit / sisältö-JSON | **Ei tehty**, tämä on faktapohja ja kirjoitusaineisto. |
| D/E/F: kuvia vasten tarkistus, lukutaulu, kartta- ja julkaisukelpoisuus | **Ei kuitattu.** 70 vuoden ja FOP-säännön suhde pääsession toimitusportissa; A ei muuta sääntöä. |
| Git, erätarkistus, integraatio, julkaisu | **Ei tehty tässä tehtävässä.** Pääsession vastuu. |

**Paluuraportti:** tekstifaktat, opas ja säätausta koottu; A:ta ei lasketa kokonaan valmiiksi ennen hyväksyttävän karttajoukon vahvistamista. Tarkka lisäselvitys on kohdepisteiden hankinta sekä epäselvien rakennusten/nykyosien tekijäketju. Kuvitus ja F-portti ovat erillisiä. Seuraavaa kaupunkia ei aloiteta tämän A-raportin perusteella omin päin.
