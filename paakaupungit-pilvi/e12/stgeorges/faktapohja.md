# St. George's — rajattu A-lähdekooste C-kirjoitusta varten

12.10.2026, tehtävä 20, vain e12/stgeorges. Oikea NAS-klooni e12. Luettu konteksti, alkuperäinen Dakar-rakenne ja yhteisten ohjeiden nimeämät reseptit/spec. Rajattu A-kooste, ei täyden A:n hyväksyntä. HTML:t ja tekstipoiminnat säilytetty NASilla `valiaikainen/nopea-e12-stgeorges/`; haussa yhteinen sallittu_haku.py, robots ja globaali rajoitus. Ei API-/PDF-/välityspalvelinkiertoa.

## 0. Luetut lähteet ja 1873-kehys

Hakupäivä kaikkialla 12.10.2026, ID = paikallinen tiedosto.

| ID | Lähde | Käytetyt osiot / tila |
|---|---|---|
| S1 | https://en.wikipedia.org/wiki/St._George%27s,_Grenada | johdanto, History, Climate (vain sanallinen), Anglican church, nähtävyysluettelo |
| S2 | https://en.wikipedia.org/wiki/Grenada_National_Museum | johdanto, History, Collection, kohteen oma Coordinates |
| S5 | https://en.wikivoyage.org/wiki/St._George%27s | Understand, Get in, Get around, See, Eat, Sleep; vuoden 2023 käytännön tietoja rajattu |
| S9 | https://museum.gd/about/ | History of the Grenada National Museum, Home Hotel, Antilles Hotel, The National Museum, The Prison and Drill Yard; museon oma vuonna 2021 kirjoitettu historiakuvaus |
| S10 | https://en.wikipedia.org/wiki/Fort_George,_Grenada | johdanto, French and British use, oma Coordinates; nykyisten lisärakenteiden erottelu |
| S11 | https://whc.unesco.org/en/tentativelists/1926/ | Grenadan valtion toimittama Description; alustavan luettelon asema, EI maailmanperintömerkintä |

Epäonnistuneet haut eivät ole faktalähteitä: S3 `puregrenada.com/fort-george-2/`, S6 `/carenage/`, S7 `/product/grenada-national-museum/`, S8 `/fort-frederick/` → HTTP 307 yhteisessä haussa; S4 `en.wikipedia.org/wiki/Sendall_Tunnel` → HTTP 404. Hakukoneen Puregrenada-katkelmia ei käytetä tuotannon todentamiseen. Lähdeesteet säilytetty `lahteet.json`-manifestissa; S10 erillisessä `lahde-lisa.json`-tiedostossa ja S11 HTML:nä/SHA-lähdetodisteessa.

**1873:** Ranskalainen siirtomaakaupunki oli syntynyt 1600-luvulla S1 History. Fort George oli rakennettu 1700-luvun alussa, ja kukkuloille muodostui samalla vuosisadalla puolustusjärjestelmä S10 French and British use, S11 Description. Vuonna 1873 nämä olivat jo osa kaupunkia. Museo nykyisessä rakennuskokonaisuudessa alkoi vasta 1900-luvulla S2 ja S9. Täsmällisiä perustamis-, rakennus- tai museovuosia ei viedä C:hen. Ei väitettä siitä, oliko nimenomaan Home Hotel avoinna 1873: S9 myynti-/muutosväli 1850–1880 ei ratkaise yksittäistä vuotta. Isoisälle ei keksitä tekemisiä.

## 1. Perusfaktat ja rajaus

- Grenadan pääkaupunki länsirannikolla, hevosenkengän muotoinen luonnonsatama, vanhan tulivuoren kraatterin kukkulat S1 johdanto, S5 Understand/See.
- Nykyinen St. George's nimettiin brittihallinnon aikana Englannin suojeluspyhimyksen pyhän Yrjön mukaan S1 History. Fort George sai nimensä kuningas Yrjö III:lta S10 johdanto/History. Ordinaali III on henkilön nimi, ei määräväite.
- Kontekstin kaupungin pallo 12.0525, -61.7531, wiki-avain St. George's; kaupungin pistettä ei lainata kohteille.
- Kontekstin väestöluku 2 681 / 2022 koskee Town of St Georgea, ei koko St. George -seurakuntaa. Luku jätetty C:stä pois, koska tässä työssä ei tehdä väestöauditointia eikä lisätä tarpeetonta numeroa.
- Maan muskottipähkinä-, maustesaaren vienti-, itsenäistymis- ja yleinen sademetsäaihe jätetään maatekstille. Kevyen kaupungin pastellitalo-/punakatto-/kauneussuperlatiiveja ei kopioida nostoksi.

## 2. Kansi: neljä nostoaihetta

1. **Kaupungilla ja linnakkeella on eri Yrjöt** — pyhimys kaupungin nimeen, kuningas linnakkeen nimeen; ranskalaisvaiheen Fort Royal -nimet; nimet eivät tarkoita samaa henkilöä. S1 History + S10 johdanto/History. Wiki St. George's, Grenada.
2. **Kaupungin paikka vaihtui** — alkuperäinen ranskalainen asutus sataman itäreunalla, Saint Louis / Port Louis, tulviminen ja malaria, uusi Ville de Fort Royal. S1 History sanoo syy-yhteyden nimenomaisesti. Ei sijoiteta alkuperäisväestöä kadonneeksi kansaksi eikä siirtomaaherroja sankareiksi. Ei tarkkaa muutosvuotta. Wiki St. George's, Grenada.
3. **Museo hotellien jäljillä** — eri-ikäisten rakennusten kokonaisuus, brittihallinnon poliisitoiminta ja viereinen vankila, hotellit, varastokäyttö, myöhempi museo. S9 Home Hotel/Prison and Drill Yard on ensisijainen erottelulle; S2 johdanto vahvistaa viereisen vankilan ja hotelli-/varastokäytön. S1:n yksioikoinen museossa vankila -väite jätetty pois. Wiki Grenada National Museum.
4. **Kaupunki kukkulan läpi** — Sendallin tunneli Fort Georgen kukkulan alitse, Carenage/Church Street -yhteys, ajoneuvoja, ei erillistä jalkakäytävää, Young Street vaihtoehtona, jyrkät kadut S5 Get around/See. Ei tunnelin pituutta tai rakennusvuotta; oma WP/WD-piste avoin. Wiki St. George's, Grenada (tunnelin erillinen sivu puuttuu).

## 3. Teemasivu: historia / Kukkuloiden kaupungin kerrokset

1. **Satamaa vartioiva linnake** — Fort George, ranskalaisten kivinen rakentaminen 1700-luvun alussa, moniulmainen pohjamuoto/bastionit, sataman valvonta, korkeampi maa linnakkeen yläpuolella, myöhempi maalta tullut ranskalainen lähestyminen brittien hallitessa paikkaa S10 French and British use. Lähde kuvaa tämän maaston ongelman; ei omaa sotilaallista päättelyä. Ei taistelujen yksityiskohtia tai nykypolitiikkaa.
2. **Linnoitus ei ollut yksin** — verkosto kukkuloiden harjanteilla, 1700-luvulla tapahtunut kehitys, ranskalainen/brittiläinen insinöörityö ja paikallinen maasto, Fort George/Frederick/Matthew säilyneinä osina, muut kadonneet/raunioituneet S11 Description, S10 system. Ei tarkkaa linnoitusten määrää; WP käyttää suoraan S11:tä, joten lähteiden riippumattomuutta ei oleteta numerolle. Alustava luettelo erotetaan maailmanperintöasemasta.
3. **Kirkko jatkoi ilman ehjää taloa** — anglikaanisen kirkon pahoin vaurioittanut hurrikaani, vuosia kestänyt raunioitunut vaihe, paikallisten rukous- ja koulukäyttö, myöhempi jälleenrakennus/paluu kirkkokäyttöön S1 Anglican church, S5 kunnostettu rakenne. Hurrikaani yleistetty 2000-luvun alkuun, ei täsmävuotta eikä uhrilukua. Wiki St. George's, Grenada.
4. **Satama vanhan kraatterin sylissä** — vanhan tulivuoren kraatterin kukkulat, hevosenkenkälahti, länsirannikko, alaspäin avautuva satamaympäristö, jyrkät kadut, harjanteiden linnakkeet S1 johdanto, S5 Understand/Get around/See, S11 Description. Ei kraatterin ikää, syvyyttä, geologista muodostumisvuotta tai omaa mekanismiselitystä. Wiki St. George's, Grenada.

Minitehtävä käsittelee anglikaanisen kirkon käyttöä sen ollessa vaurioitunut. Vastaus teeman kirkonostossa, ei toista viittä kaupungin kysymystä; faktalause omin sanoin.

## 4. Opas

- **Perille ja liikkeelle:** Maurice Bishop International Airport lounaassa, pikkubussit/taksit, bussiterminaali risteilyterminaalin pohjoispuolella, kompakti mutta mäkinen keskusta S1 lentoaseman nimi, S5 Get in/Get around. Grand Anse erillinen ranta-/hotellialue etelässä S5 Further out/Sleep. Lentoaseman IATA ei tässä lähdeaineistossa varmennettu; ehdotus vain nimellä, ei arvattua koodia.
- **Carenagen rantakierros:** sisäsatama, suurempien alusten länsipuolinen satama, Fort Georgen kukkula, tunneli ja Young Street S5 See. Ei kuljetuslipun hintoja, lähtöaikoja tai väitettyä turvallisuusluokitusta.
- **Vanhojen rakennusten kaupungissa:** museon kulma Young/Monckton S2/S9, oma historiakuvaus, Church Streetin anglikaaninen kirkko ja katolinen katedraali S1/S5, kukkuloiden linnakkeet S10/S11. Sisäkäyntiä ei luvata; nykyinen pääsy pitää tarkistaa.
- **Mitä täällä syödään:** Carenagen meriruokaan painottuvia ruokapaikkoja ja Lagoon Roadin paikallista kotiruokaa S5 Eat. Ei nimettyä ruokalajia, hintaa, aukioloaikaa tai mausteiden viljelyhistoriaa.
- **Milloin kannattaa tulla:** kostea trooppinen ilmasto, kuiva/sateinen kausi S1 Climate, jyrkkien katujen reittisuunnittelu S5. Ei ilmastoarvoja, kuukausirajoja tai ennusteita. Tauot, lyhyemmät kierrokset ja vierailun varmistaminen ovat kirjoittajan käytännön suosituksia.
- Parasta 5: Carenage, Fort Georgen ympäristö, museon rakennukset, Church Street, Richmond Hillin linnakkeet. Hyvä tietää 4: mäet, tunneli, vierailun varmistaminen, Grand Anse ei vanhaa keskustaa.
- UM-matkustusturvallisuusauditointi tekemättä; ei poikkeuksellista turvallisuusväitettä.

## 5. Kartta ja kohdejutut — PARTIAL 2/6–8

| Kohde | Tyyppi | Paikan oma lähdepiste | Jutun faktat |
|---|---|---|---|
| Fort George | rakennus | S10 Coordinates 12.0492, -61.7539 → 12.04920, -61.75390 | ranskalainen rakentaminen 1700-luvun alussa, Fort Royal/Fort George, Yrjö III, moniulmainen rakenne/bastionit, satama/korkeampi maa, 1873 jo olemassa S10/S11 |
| Grenadan kansallismuseo | rakennus | S2 Coordinates 12.050576, -61.752655 → 12.05058, -61.75266 | Young/Monckton-kokonaisuus, alkuperäinen poliisikäyttö, viereinen vankila erillään, hotellit/varasto, ei nykyistä museota 1873, museo vasta 1900-luvulla, kokoelmien historialliset aihepiirit S2/S9 |

Rajaus pohjoinen 12.05358, etelä 12.04620, länsi -61.75697, itä -61.74959, noin 300 m marginaali. Ei yleistä kaupunkipistettä lainattu. Ei suojattua rakennusta naamioitu luontokohteeksi.

Sendallin tunneli, Carenage, kirkot ja Fort Frederick/Matthew odottavat paikan omaa WP/WD-pistettä ja riittävää kohdefaktapakettia. Wikivoyagen pisteitä ei vaihdeta WP-pisteiksi. Fort Georgen modernit muistomerkit, muistolaattasisällöt ja uudet lisärakenteet eivät ole kohdejuttujen kuvatarpeita. Museokuvan aiheeksi vanha historiallinen kulmatalo; S9 mainitsemaa myöhempää Young Streetin siipeä ei oleteta vapaan teoksen kuvaksi. Kuvat tarvitsevat oman tekijä-/teosauditoinnin.

## 6. Kysymykset ja tiedot

Kysymykset 5: maa S1 (taso 1), kaupungin pyhimys vastaan linnakkeen kuningas S1/S10 (3), Carenagen muoto S1 (2), verkoston maasto S10/S11 (3), museon aikaisempi hotelli-/varastokäyttö S2/S9 (2). Kaikilla HTTPS-Wikipedia-artikkelilähde, vastaukset mukana teksteissä.

Tiedot 3: eri Yrjöt S1/S10; tunneli ja Young Street S5; linnoitusjärjestelmän alustava UNESCO-asema S11. Ei isoisän ääntä.

## 7. Kuvatarpeet — B avoinna

20 roolia: 3 laajaa kaupunkikantta, 8 nostoa, 1 matkailijalle-pysty, 5 opasjaksoa, 2 kohdejuttua, 1 matkakirjan valokuva. Jokaisen roolin tiedosto/lyhyt/selite/lahde tyhjiä. Ei kuvaehdokkaita, hakua tai generointia.

Aiheet kuvaputkelle: laajat Carenagen/kukkuloiden/keskustan näkymät; vanhat nimet ja historiallinen linnake ilman moderneja teoksia; kaupungin siirtymisen historiallinen havainne; vanha museokulmatalo/hotelli; Sendallin tunnelin nykyinen kulkupaikka; Fort Georgen vanhat muurit; kukkuloiden linnoitusverkosto; anglikaanisen kirkon historiallinen rakennus ja korjausten historia; kraatteriin kuuluvat kukkulat; oppaan nykyiset kaupunkipaikat. Älä kuvaa Christ of the Abyss -veistosta, modernia vedenalaista veistospuistoa, muistoteoksia tai suojattuja lisärakenteita.

## 8. Epävarmat ja avoimet

- Rajattu A, 2/6–8 karttakohdetta; puuttuvia pisteitä ei arvata.
- S1:n kasarmi/vankila/museo-ketju poikkeaa museon omasta S9-kuvauksesta. Ratkaisu: S9:n erottelu, brittihallinnon poliisitoiminta ja vankila takana; kasarmiväite poistettu C:stä.
- S9 ei ratkaise, missä käyttövaiheessa museon kulmatalo oli juuri 1873, joten hotellia sinä vuonna ei väitetä. Nykyistä kansallismuseota ei silloin vielä ollut (S2/S9 museo 1900-luvulta).
- S2/S5 kuvaavat museon sulkemista, osa käytännön tiedoista on vuodelta 2023. S9 on historiakuvaus, ei tämän päivän aukioloauditointi. Oppaan tekstissä ei luvata sisäänpääsyä. Sama varaus Fort Georgelle: lähteet kuvaavat eri-ikäisiä remontti- ja pääsytilanteita.
- UNESCO S11 on alustava luettelo, vanha hakemus. Nykyisestä poliisitoiminnasta/aukiolosta kertovia hakemuksen lauseita ei käytetä; S10 kertoo myöhemmistä muutoksista.
- Lentoaseman IATA-koodi ja tarkka liikenneaikataulu avoinna. Ei sääarvoja: 48/48 primäärivarmennus avoin, saatiedot null, saa.json koskematon.
- Riippumattomat D/E/F, tekijä-/teos-/kuvaoikeudet, pelin kytkentä ja julkaisu avoinna. Paikallinen tarkistin ei tarkista faktoja.

## 9. Pois jätetty

Nyky-/konfliktipolitiikka, vallankumousten ja väkivallan yksityiskohdat, Josephinen kylpyammeen varma attribuutio (S2 johdanto sanoo purportedly ja myöhempi Collection varmemmin), tarkat museon/kaupungin/linnoitusten vuodet ja määrät, Fort Georgen 1705 vs 1706 -ero (yleistetty 1700-luvun alkuun), nykyiset poliisitoimistot, suojattu Christ of the Abyss ja vedenalainen veistospuisto, maustepähkinän virheellinen johdantovuosi S1:ssä, pyöreät turistiväitteet, rauniokaupungin arvottavat matkaopasfraasit, alkuperäiskansojen häviämisromantiikka ja väestöluvun laajuuden sekoittaminen.
