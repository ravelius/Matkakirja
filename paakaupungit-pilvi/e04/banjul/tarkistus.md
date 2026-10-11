# Banjul — D, riippumaton tarkistus keskeneräiselle luonnokselle

**OSITTAIN TARKISTETTU.** Tarkistus 11.10.2026. Tämä on D-raportti 17 valitun kuvan ja nykyisen tekstiluonnoksen tarkistuksesta. Kaupunki ei ole valmis D/F, toimitusvalmis eikä julkaisuvalmis. Matkailijalle-pysty ja Albertin torin erillinen kohdekuva puuttuvat; niiden myöhempi valinta ja kuvatekstit tarvitsevat jälkitarkistuksen. Myös jäljempänä hylätty K3-lauttakuva tarvitsee B:n uuden valinnan ja D:n tarkistuksen.

**Varsinaiset löydökset: VÄÄRIN 3, EPÄVARMA 1.** Lukumäärä tarkoittaa neljää alla yksilöityä löydöstä, ei jokaista korvattavaa alikenttää. Kaksi ennestään tunnettua kuvapuutetta eivät sisälly tähän lukumäärään. VÄÄRIN sisältää myös ohje- ja tilamuotoiluvikoja, ei väitettä kaikkien kolmen olevan väärää maantiedettä.

Sisalto.jsonia ei muokattu. Kirjoitettu vain tämä raportti ja oma väliaineisto. Ei Git-toimia, uusia agentteja, pelimuutoksia, generointia, R2-toimia tai julkaisua. TMPDIR ja Python-välimuisti ovat oman NAS-väliaineiston alla.

## Menetelmä ja riippumattomuus

En ollut Banjulin A- tai C-agentti. Luin AGENTS.md:n, CODEX.md:n, PILVIOHJE:n luvut 4, 5, 7, 8D, 13 ja LISÄSÄÄNNÖN, koko lehtityöreseptin, kaupunkilehden mitat/kuvat/toistuvat viat sekä spec-mantereiden yleislinjaukset. Faktapohja, kuvat, C-muistiinpanot, konteksti, sisalto.json ja saa.json tarkistettiin. Faktapohjan väitteitä ei pidetty todisteina: alla olevat alkuperäiset lähdesivut ja Wikidata-tietueet luettiin itse. Kaikki 17 lopullista esikatselua avattiin itse; K3 katsottiin lisäksi alkuperäiskokoisena.

Verkkohaku kulki yhteisen `sallittu_haku.py`:n kautta. Uusille verkkotunnuksille robots ensin, jokainen uudelleenohjaus tarkistettu, yhteinen 1/s-lukko ja lähdevarasto käytössä. Commonsin nimet/koot/tekijät/lisenssit tarkistettiin 17 nimen täsmäpyynnöillä `lahdetieto.py`:stä. Omistajan tavallisten robots-sallittujen lähdesivujen poikkeusta sovellettiin; ei API-/w/-polkuja, Commons Special:Search- tai FilePath-hakuja eikä kuvahakuja. Näkyvää Author-kenttää verrattiin suoraan, eikä tavallissivusovitusta esitetä alkuperäisen API:n extmetadata-tarkistukseksi.

Oma aineisto: `/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/paakaupungit-codex/sessio-72-20261011/valiaikainen/banjul-D/`. Kuvametatiedot `kuvametadata.json`, lähdesivut/tekstipoiminnat samassa kansiossa, tarkat korvauskentät myös `korvaukset.json`:ssa. Yhteinen URL-/robots-/redirect-loki `valiaikainen/sallitut-haut.jsonl`.

## Itse luetut lähteet

| Tunnus | Lähde ja tarkistetut osiot |
|---|---|
| B1 | [Banjul](https://en.wikipedia.org/wiki/Banjul): johdanto, History, Climate/ilmastotaulukko, Transport, Attractions. |
| B2 | [Albert Market](https://en.wikipedia.org/wiki/Albert_Market): kohdekuvaus, nimi, Liberation Avenue, 1800-luvun puoliväli ja koordinaatti. Artikkelin lähdevaroitukset säilyvät tiedossa. |
| B3 | [Gambia National Museum](https://en.wikipedia.org/wiki/Gambia_National_Museum): History, Museum Description, Administration. |
| B4 | [Tanbi Wetland Complex](https://en.wikipedia.org/wiki/Tanbi_Wetland_Complex): Geography, Flora and habitat, Fauna, Human activities. |
| B5 | [Ramsar: Tanbi Wetlands Complex](https://rsis.ramsar.org/ris/1657): Overview ja paikka-/suojelumetadata. Viimeisin RIS-tieto on 2006; kuvaus ei todista vuoden 2026 retkipalveluja tai saalismääriä. |
| B6 | [Gambia River](https://en.wikipedia.org/wiki/Gambia_River): johdanto, Geography, Crossings, Bolongs sekä Mouth-koordinaatti. |
| B7 | [Banjul, Wikivoyage](https://en.wikivoyage.org/wiki/Banjul): Understand, Get in/Get around, See, Eat, Stay safe, Go next/Barra. |
| B8 | [NCAC: Cultural Heritage](https://ncac.gm/cultural-heritage/): National Museums, museotalon käyttöhistoria ja museotyön tarkoitus. |
| B9 | [NCAC: Oral Archives](https://ncac.gm/oralarchieve/): A brief history, Research, Audio visual collections, The studio. Sivun ristiriitaista vuosiväliä ei siirretty sisältöön. |
| B10 | [Gambian cuisine](https://en.wikipedia.org/wiki/Gambian_cuisine): yleiset ainekset, Benachin ja Domoda. |
| B11 | [Banjul International Airport](https://en.wikipedia.org/wiki/Banjul_International_Airport): johdanto, History/Yundum ja IATA BJL. |
| B12 | [UM: Gambia](https://um.fi/matkustustiedote/-/c/GM): 24.8.2026, turvallisuustaso, liikenne ja pimeän ajan liikkuminen. Taso on ”Noudata erityistä varovaisuutta”. |
| B13 | [Jollof rice](https://en.wikipedia.org/wiki/Jollof_rice): johdanto, infolaatikko ja Names and origins; benachin on riisiruoka eikä pelkän yhteisen aineluettelon perusteella tehty päätelmä. |
| X1 | [Access Gambia: Albert Market](https://www.accessgambia.com/information/albert-market.html): sijainti/nimi, nykyinen torin käyttö ja historiakuvaus. |
| X2 | [The Gambia Experience: Royal Albert Market](https://www.gambia.co.uk/blog/article?id=949): nimenantaja, Liberation Avenue ja käytävä-/kojuverkosto. |
| X3 | [Access Gambia: Banjulin historia](https://www.accessgambia.com/information/banjul-history.html): 1800-luvun kauppa-/vartioasema ja Bathurst. B1:n omiin viitteisiin kuuluvan X3:n lukemista ei lasketa riippumattomaksi toiseksi lähteeksi samalle tarkalle luvulle. |
| WD1 | [Q3726 Banjul](https://www.wikidata.org/wiki/Special:EntityData/Q3726.json): P625 ja nimi. |
| WD2 | [Q325000 Albert Market](https://www.wikidata.org/wiki/Special:EntityData/Q325000.json): P625. |
| WD3 | [Q1253433 Tanbi](https://www.wikidata.org/wiki/Special:EntityData/Q1253433.json): P625. |
| WD4 | [Q160819 Gambia River](https://www.wikidata.org/wiki/Special:EntityData/Q160819.json): kaksi P625:ttä ja P518-kohdistukset. [Q1233637](https://www.wikidata.org/wiki/Special:EntityData/Q1233637.json) on river mouth. |
| O1 | [Commonsin Gambian oikeussivu](https://commons.wikimedia.org/wiki/Commons:Copyright_rules_by_territory/Gambia): Freedom of panorama, Folklore ja oikeuksien keston erottelu. |

## Varsinaiset löydökset ja koko kentän korvaukset

| Tunnus / JSON-polku | Väite tai vika | Lähde / syy | Tulos | Tarkka korvaus |
|---|---|---|---|---|
| R1 `kaupunkilehti[0].nostot[2]` | K3:n `Barra ferry, Gambia (4075989888).jpg` on hyväksytty valinta. | [Commons-tiedostosivu](https://commons.wikimedia.org/wiki/File:Barra_ferry,_Gambia_(4075989888).jpg), preview-56 ja oma `original-56.jpg`. Oikeassa etualassa ruskeapaitaisen henkilön ja keskiosan sivuun katsovan henkilön kasvonpiirteitä voi lukea. Pelkkä vastavalo ei tee näistä ihmisistä kaukaisia pisteitä tai selin olevia. Lehtityöreseptin koko kasvosääntö hylkää kuvan. | **VÄÄRIN** | Tyhjennä koko noston kuvaosa alla olevalla väliaikaisella korvauksella. Se ei täytä kuvaporttia: B:n pitää toimittaa uusi kuva ja D:n tarkistaa se. En keksi korvaavaa tiedostonimeä. |
| R2 `ehdotukset.huomiot[1]` | Tyhjä kohdekuvalista on ”#74:n kuvattoman kohteen poikkeamana”. | Tehtävänantajan rajaus: puuttuvat kuvat eivät ole hyväksyttyjä poikkeuksia. Alkuperäinen tarkistin antaa Albertin torille oikean virheen. | **VÄÄRIN** | Koko huomio alla; puute ja virhe nimetään avoimeksi. |
| R3 `kysymykset[3]` | Väärät vaihtoehdot ovat meriveden mittaustulokset, rakennuspiirustukset/kartat ja laiva-aikataulut. | B9:n A brief history ja Audio visual collections tukevat oikeaa vastausta. Nykyinen kysymys nimeää jo suullisen perinteen, ja väärät vaihtoehdot ovat pääosin eri aineistomuotoa ja vailla yhteyttä kulttuuriseen muistitietoon; ne eivät täytä luvun 7 uskottavien vaihtoehtojen vaatimusta. Fakta ja NCAC-lähde ovat oikein. | **VÄÄRIN (vaihtoehtojen muoto)** | Koko kysymysolio alla: kaikki vaihtoehdot ovat uskottavia tallenneaineiston luokkia ja saman pituisia; oikea vastaus löytyy K4-nostosta. |
| R4 `nahtavyydet["Gambia-joen suu"].teksti` | ”Nykyiset lautat, laiturit ja rannikon rakennukset kuuluvat myöhempiin kerrostumiin.” | B1 History, B6 Crossings, B7 Go next. Lähteet tukevat vanhaa Bathurstia ja nykyistä lauttareittiä, mutta eivät ajoita jokaista nykyistä laituria tai rannikon rakennusta. Kaikkien nykyisten rakennusten myöhempi ikä ei seuraa siitä, ettei nykykalustoa sijoiteta vuoteen 1873. | **EPÄVARMA** | Koko 874 merkin / 3 kappaleen teksti alla; ikäyleistys poistettu, 1873-kulma säilyy. |

### R1: koko nosto, väliaikainen tyhjennys

Kuvateksti vastaa lautan aihetta, eikä CC BY 2.0-tekijärivi ole väärä. Hylkäyksen syy on kuvan kasvot. Tyhjä kuvaosa on näkyvä keskeneräisyys, ei kuvan poistamisella saatu valmistumismerkintä. Teksti säilyy 469 merkin mittaisena ja nostoja on edelleen neljä.

```json
{
  "otsikko": "Lautta vaihtaa joen rantaa",
  "teksti": "Gambia-joen suulla lautta tekee vesialueesta yhteyden: Banjulista kuljetaan Barraan joen pohjoisrannalle. Mukaan otetaan sekä matkustajia että ajoneuvoja, ja Barrasta maantieyhteydet jatkuvat Senegalin suuntaan. Ylityspaikka on joen leveällä suulla, kaukana yläjuoksun silloista. Pienveneet, laivaliikenne ja lautta käyttävät samaa jokisuun ympäristöä eri tavoin. Reitti liittää joen rannat maantieyhteyksiin, kun taas itse vesialue jatkuu Banjulin viereltä Atlantille.",
  "tiedosto": "",
  "lyhyt": "",
  "selite": "",
  "lahde": "",
  "wiki": "Gambia River"
}
```

### R2: koko huomio

```json
"Albertin torin erillinen kohdekuva puuttuu; kuvat-lista on tyhjä ja alkuperäinen tarkistin raportoi siitä virheen, jota ei ole hyväksytty poikkeukseksi."
```

### R3: koko kysymysolio

```json
{
  "q": "Mitä Gambian kulttuuriperintöorganisaation arkistoon on tallennettu?",
  "options": [
    "Historiaa, laulua ja perinteitä",
    "Sääennusteita ja satamakuulutuksia",
    "Torimainoksia ja kuljetustilauksia",
    "Urheiluselostuksia ja uutislähetyksiä"
  ],
  "correct": 0,
  "level": 2,
  "hint": "Arkistoa ylläpitää sama kulttuuriperintöorganisaatio kuin kansallismuseota.",
  "fact": "Arkistoon on kerätty haastatteluja, kertomuksia, laulua ja seremonioihin liittyvää tietoa.",
  "source": "https://ncac.gm/oralarchieve/"
}
```

Vaihtoehtojen pituudet: 31 / 34 / 34 / 37 merkkiä. Vihje kertoo ylläpitäjäyhteydestä eikä sano oikeaa aineistolajia. Lähde säilyy arkiston oman ylläpitäjän ensisijaisena lähteenä; Wikipedia-URL:ää ei vaihdeta varoituksen piilottamiseksi.

### R4: koko nähtävyysteksti

```json
"Gambia-joki saavuttaa Atlantin Banjulin kohdalla. Pääkaupungin St Mary's -saari on jokisuun reunassa, ja vastarannalla on Barra. Rannikon lähellä joki levenee laajaksi estuaariksi, jossa meri ja joen alajuoksu liittyvät samaan vesialueeseen.\n\nBanjulin ja Barran lautta ylittää tätä suualuetta sekä matkustajien että ajoneuvojen kanssa. Barrasta yhteydet jatkuvat pohjoisrannan teitä pitkin Senegalin suuntaan. Ylitys on eri paikassa kuin yläjuoksun sillat; jokisuun kuva ei myöskään esitä joen lähdettä kaukana sisämaassa.\n\nIsoisän matkavuonna 1873 jokisuu ja Bathurst-niminen kaupunki olivat jo olemassa. Nykyisestä lauttaliikenteestä tai rannikon rakennuksista ei voi päätellä suoraan matkavuoden näkymää. Paikan jatkuva merkitys liittyy veden muodostamaan yhteyteen: samassa ympäristössä kulkevat pienveneet, laivaliikenne ja joen rannalta toiselle siirtyvät matkustajat."
```

## Ennalta tunnetut puutteet ja koneportti

Nämä ovat erillään yllä olevista uusista D-löydöksistä:

| Kohta | Tila | Jälkitarkistus |
|---|---|---|
| P1 `kaupunkilehti[0].matkailijalle.kuva` | `{}`: tiedosto puuttuu. Tämä on **avoin konevirhe**. | Tuore paikallinen maltillinen pysty, w/h 0,60–0,85; koko, kuvausaika, lisenssi, kuvatun aiheen oikeus, kasvot ja kuvaa vastaava kuvateksti tarkistettava uuden B-valinnan jälkeen. |
| P2 `nahtavyydet["Albertin tori"].kuvat` | `[]`: erillinen kohdekuva puuttuu. Tämä on **avoin konevirhe**, ei hyväksytty #74-poikkeus. | Erillinen oikean Albert Marketin kuva; koko/tekijä/lisenssi, mahdollinen portin rakennusteos ja mainokset/kuvapakkaukset, kasvot sekä kuvateksti tarkistettava. |

Alkuperäinen paikallinen `tyokalu.mjs tarkista e04 banjul` ajettiin D:ssä muuttamattomalle sisalto.jsonille. Todellinen tulos:

```text
VIRHE banjul: matkailijalle.kuva: tiedosto puuttuu
VIRHE banjul: juttu Albertin tori: kuvia 1–3
VAROITUS banjul: kysymys 4: source ei ole Wikipedia-artikkeli
VAROITUS banjul: kohteita 3 (pohjataso 6; perustele RAPORTTI.md:ssä)
== banjul: 2 virhettä, 2 varoitusta, 17 kuvaa
YHTEENSÄ 1 kaupunkia: 2 virhettä, 2 varoitusta
```

Kone ei tunnista K3:n kasvoja. Sen nykyinen 17 kuvan määrä ei hyväksy K3:a. R1-välikorjaus jättää myös K3-roolin avoimeksi; uutta nollavirhetulosta ei väitetä.

NCAC-varoitus on verkkotunnussääntö: lähdesivu toimii ja kertoo aineistosta itse. Kolmen kohteen määrä sallitaan ohjeessa pienelle pääkaupungille perustellen; pääsession RAPORTTI.md:hen tarvitaan edelleen tori/jokisuu/Tanbi-perustelu ja modernien suojattujen teosten sekä muiden kaupunkien paikkojen poisjätöt. En täytä määrää väärillä kohteilla.

## Muut faktat, kysymykset ja sisältörajat

| JSON-polku / väitejoukko | Lähde ja osio | Tulos |
|---|---|---|
| `kaupunki` / Gambian pääkaupunki, St Mary's Island, GMB, Banjul-wiki, satama-äänimaisema | B1 johdanto/Transport, WD1, konteksti | OK. Pallo vastaa kontekstia 13.4531 / −16.5775; sitä ei siirretä kohdekartan keskukseksi. |
| `artikkeli.intro`, `artikkeli.teksti` / saarikaupunki vastaan Suur-Banjul ja Kanifing mantereella | B1 johdanto, B7 Understand | OK. Kaupunki, laajempi kaupunkialue ja matkailijoiden mantereen majoitusalueet erotetaan. |
| `artikkeli` / 1800-luvun alkupuolen kauppa-/vartioasema, Bathurst | B1 History, X3 historiallinen kuvaus | OK. Ei tarkkaa perustamis- tai nimenvaihtovuotta; ei brittiläistä sankarikehystä. |
| `artikkeli.intro`, K1 ja Albertin tori / kaupunki ja tori ennen vuotta 1873 | B1 History, B2 kohdekuvaus | OK annetulla karkealla ajoituksella. B1 sijoittaa kaupungin 1800-luvun alkupuolelle, B2 torin 1800-luvun puoliväliin. Teksti ei väitä nykyisten katosten/kojujen olleen silloin olemassa. Tarkka torin valmistumisvuosi ei ole varmennettu eikä sitä lisätä. |
| `tiedot[0]` ja K2 / Kanifing, saari, lännen sillat ja alueiden ero | B1 johdanto/Transport, B7 Understand | OK. Ei asukas- tai pinta-alalukua eikä eri aluerajojen sekoitusta. |
| `kysymykset[0]` / Gambian pääkaupunki | B1 johdanto | OK. Senegal, Guinea ja Ghana ovat vääriä mutta uskottavia maiden vaihtoehtoja; oikea ei pisin, vihje ei nimeä Gambiaa. |
| `kysymykset[1]` / Gambia-joki ja Barra | B6 johdanto/Crossings, B7 Go next | OK. Senegaljoki, Nigerjoki ja Volta-joki väärin; oikea saman mittainen pisimmän väärän kanssa. |
| `kysymykset[2]` / Suur-Banjulin Kanifing | B1 johdanto | OK. Entinen nimi, pohjoisranta ja saaren virallinen nimi ovat vääriä; vaihtoehdot 37/37/41/37 merkkiä. |
| `kysymykset[3].fact/source`, `tiedot[1]`, K4 / haastattelut, laulu, seremoniat, Senegambia, myöhäinen 1900-luku, museon yhteys | B9 A brief history/Audio visual collections, B8 DCH/National Museums, B3 Administration | OK faktojen osalta; kysymysolion muotovika R3. Arkiston ja museon rooleja ei sekoiteta radiolähetystoimintaan tai nauhurin kuvauspaikkaan. |
| `kysymykset[4]` ja K1 / prinssi Albert, Victorian puoliso, torin nimi ja Liberation Avenue | B2 kohdekuvaus, X1 ja X2 | OK. Oikea 37 merkkiä, lähin väärä 35: oikea ei selvästi pisin. Vihje viittaa hoviin nimeämättä puolisoa. |
| K3 ja jokisuun juttu / matkustaja- ja ajoneuvolautta, pohjoisrannan Barra, tiet Senegaliin, yläjuoksun sillat eri paikassa | B6 Crossings, B7 Go next/Barra | OK reittifaktat. Ei lautan nykyistä nimeä, kapasiteettia, vuoroväliä, hintaa tai kulkuaikaa. K3-kuva R1 ja rantakohteiden ikä R4 erillisinä. |
| L1 / länsi–lounas, St Mary'sin länsirannat, Laminin suunta, mangrovet, bolongs, laguunit, suolamarskit ja lieju | B4 Geography/Flora and habitat, B5 Overview | OK. Laminin kuvaa ei nimetty Banjulin keskustan tai kartan edustuspisteen kuvaksi. |
| L2, `tiedot[2]`, artikkeli ja Tanbin juttu / veden ja sateen vastaanotto, rannan vakaus, sedimentit/ravinteet, pohjavesi, tulvaveden hallinta, hydrologinen puskuri | B5 Overview ensisijainen; B4 Flora and habitat käyttää samaa lähdettä | OK. Ramsar sanoo sediment and nutrient retention and export sekä hydrological buffer zone. Sanamuoto ei lupaa täydellistä tulvasuojaa. Näitä kahta sivua ei lasketa kahdeksi riippumattomaksi lähteeksi samalle luvulle. |
| L2 / mangroven varjon katkarapujen lisääntymisympäristö | B5 Overview: shade of the mangroves / breeding ground; B4 Fauna | OK. Ei kirjoittajan oma valokuvasta tekemä syy-yhteys. Katkarapulajia tai määrää ei nimetty. |
| L3 / pienimuotoinen kalastus, osterien keruu, Jola-naisten keruu/paahtaminen/myynti, puutarha- ja riisinviljely reunoilla | B4 Human activities, B5 Overview | OK perinteisten elinkeinojen kuvauksena. Lähteiden vanha aikataso tiedossa; ei vuoden 2026 saalis-, osallistuja- tai työpäivälukua. Kuva ei tunnista kerääjän etnisyyttä. |
| L4 ja opas 3 / Tanbin muuttolinnut, sääksi ja mustapyrstökuiri pohjoisen talvella | B4 Fauna; B5 tukee kosteikon luonnon arvoa | OK lajien esiintymisväitteelle B4:n lähdeviitteen rajoissa. Ei lajimäärää, nykyistä uhanalaisuusluokkaa tai retkihavaintolupausta. L4:n kala jätettiin oikein pois, koska se ei erotu esikatselussa riittävästi. |
| `kaupunkilehti[1].tehtava` / bolongs | B4 Flora and habitat, B6 Bolongs, saman sivun L1 | OK. Oikea löytyy saman sivun L1-nostosta. Ei toista viittä kysymystä, ei palkkiota. Fakta on omin sanoin eikä nostovirke sanatarkasti. |
| Matkailijalle-kappale ja opas 1 / saari ja majoitusalueet erillään, lentoasema Yundumissa, paikallisliikenne/taksit, järjestelyt tarkistetaan | B7 Understand/Get in/Get around/Go next, B11 johdanto/History | OK. Ei tarkkaa etäisyyttä, aikataulua tai nykykalustolupausta. |
| Opas 2 ja `hyvaTietaa` / Albertin tori, kuljetus/pimeä, arvoesineiden varovaisuus | B2/X2 torin paikka, B12 ja B7 Stay safe | OK. Lyhyttä käytännön varovaisuutta, ei rikostapauskertomusta. |
| Opas 3 / museotalon klubi, British Council, lainsäädäntökokous ja kirjasto | B8 National Museums | OK. Kyse on historiallisista käyttötavoista. Rakennuksen valmistumisvuotta tai olemassaoloa 1873 ei päätellä. |
| Opas 3 ja ranta-varaukset / voimakkaat virtaukset, ei valvotuksi oletettua uimapaikkaa | B7 Stay safe/Swimming & currents | OK. Ei uimisen turvallisuuslupausta. |
| Opas 4 ja `parasta` / kala, riisi, maapähkinä, benachin, domoda, merenelävät ja osterit | B10 johdanto/Dishes, B13 johdanto/Names, B7 Eat, B4 Human activities | OK. Yleisen Filippiinien riisivalokuvan ei väitetä esittävän gambialaista annosta. Yksittäisen annoksen alkuperää ei johdeta Tanbin läheisyydestä. |
| Tanbin nähtävyysjuttu / Ramsar-status myöhempi kuin 1873, matkavuoden laajuus ja kanavat epävarmoja, piste ei retkiportti | B4, B5 paikkametadata/Overview, WD3 | OK. Ei nykysuojelurajoja, palveluja tai nykyistä kasvillisuuslaajuutta sijoitettu vuoteen 1873. |
| `ehdotukset.lentoasema` / Banjul International Airport (BJL) | B11 johdanto/infolaatikko | OK. |
| Koko sisältö / nykysota, nykypolitiikka, vaalit, nykyrikostarinat, suojatut monumentit, ukin teot | Tekstien oma läpiluku, PILVIOHJE 4 | OK. Ei keksittyä ukin vierailua/ostosta/repliikkiä, päiväkirjamerkintää tai reittiä. Arch 22 ja modernit teokset eivät uusia kohteita. |

## Luvut, vuodet, väestö ja sää

- Pelaajatekstissä ei ole asukaslukua, pinta-alaa, lajimäärää, arkiston tallennemäärää, matka-aikaa, kapasiteettia tai tarkkaa rakennus-/perustamisvuotta. Banjulin kaupungin/LGA:n väestö ja Suur-Banjulin väestö pysyvät erillään. Aineiston tarkkaa 26 461 -lukua ei julkaista tämän D:n perusteella; Wikipedia ja sen samaan laskentaan palaava lähde eivät olisi kaksi riippumatonta vahvistusta.
- 1800-luvun alku/puoliväli ja 1900-luvun loppupuoli ovat lähteiden karkean ajoituksen mukaisia. 1873 on tehtävän annettu matkavuosi, jonka olemassaoloväitteet on tarkistettu kronologiaa vasten. Suoria isoisän tekoja ei keksitä.
- Kuvatekstien 2013/2022/2024/2026 ja valokuvan `vuosi: "2013"` ovat valitun kuvan suoraa Date-/EXIF-metatietoa. Kuvaus- ja latausvuosi erotettu; Date ja EXIF ovat saman alkuperän metatietoa, eivät kaksi riippumatonta historiatutkimusta. Niitä käsitellään kuva-aineiston jäljitettävyytenä, kuten lähderevisionumeroita ja normaalitaulukon kautta.
- Säädata tarkistettiin annetun saa.json:n sekä itse luetun B1 Climate data for Banjul (1991–2020) -taulukon kautta; ei Open-Meteoa eikä uutta normaaliaineistoa. `lat`, `lon`, kaikki 48 kuukausilukua ja `lahde` ovat **täsmälleen samat** kuin saa.json:ssa. `tausta` jää pois pelin olion kopiosta. Wikipedian ja sen WMO-lähteen yhtä taulukkoa ei kutsuta kahdeksi riippumattomaksi normaalisarjaksi.

| Säärivi | Tarkistettu sisältö | Tulos |
|---|---|---|
| `keskilampo` | 25.3, 25.9, 26.3, 26.1, 26.5, 27.5, 27.7, 27.7, 27.9, 28.9, 28.4, 26.6 | OK; Daily mean, ei ylimmän ja alimman keskiarvosta keksitty sarja. |
| `ylin` | 33, 33, 33, 32, 32, 32, 32, 32, 32, 34, 34, 33 | OK; työkalun pyöristys Mean daily maximum -rivistä. |
| `alin` | 18, 19, 20, 20, 21, 23, 24, 24, 24, 24, 23, 20 | OK; työkalun pyöristys Mean daily minimum -rivistä. |
| `sade` | 1, 1, 0, 0, 3, 55, 175, 354, 244, 76, 1, 0 | OK; Average precipitation -rivistä. |
| `saatiedot.luonnehdinta` ja opas 5 | Noin 32–34 °C, alkuvuoden alimmat noin 18–20 °C, kesä–lokakuun sateet, elokuussa noin 350 mm, marras–huhtikuussa vain vähän | OK; kaikki näistä riveistä. Elokuu on 12 oman luvun suurin, ei maantieteellinen ilmastosuperlatiivi. |

Ei lähdemainintaa ilmastolauseissa eikä sääriviä nimetä omin päin lentoaseman mittausasemaksi. UM:n tai Wikivoyagen muut ilmastoluvut eivät korvaa tätä sarjaa.

## Kartta: lähde, piste, tyyppi ja rajaus

| Kohde / JSON-polku | Itse tarkistettu lähdearvo | Tulos |
|---|---|---|
| Albertin tori / `kohteet[0]` | WD2 P625 13.45430451 / −16.57194549 → 13.45430 / −16.57195. B2:n artikkelipiste on läheinen 13.45417 / −16.57194. | OK; torin oma piste, tyyppi `aukio` soveltuu katutoripaikkaan. Nollan puuttuminen JSON-luvun lopusta ei muuta viiden desimaalin arvoa. |
| Gambia-joen suu / `kohteet[1]` | WD4:n **toinen** P625 13.4667 / −16.5667, P518 = Q1233637 river mouth. | OK; tyyppi `luonto`. Ensimmäinen P625 on lähdepiste Guineassa eikä sitä käytetä. B6:n Mouth tukee sijaintia. |
| Tanbin kosteikko / `kohteet[2]` | WD3 P625 13.416666666667 / −16.616666666667 → 13.41667 / −16.61667. B4 sama piste. | OK; tyyppi `luonto`. Laajan kosteikon edustuspiste, ei rakennus tai retken lähtölaituri. Ramsar antaa eri edustuspisteen; sitä ei sekoiteta tähän. |
| `kohdekartta.rajat` | pohjoinen 13.4694, etelä 13.41397, länsi −16.61945, itä −16.56392 | OK: kaikki kolme pistettä sisällä; laskettu pohjois-/etelämarginaali 300 m ja itä-/länsimarginaali 301 m. Rajaus ei väitä kattavansa Tanbin koko Ramsar-aluetta. |
| `nahtavyydet` avaimet | Albertin tori, Gambia-joen suu, Tanbin kosteikko | OK; vastaavat kohdenimiä täsmälleen. Tekstit 895/856/976 merkkiä ja kolme kappaletta; R4-korvaus 874 merkkiä / kolme kappaletta. |

Kolme kohdetta on konevaroitus, joka tarvitsee pääsession pienkaupunkiperustelun. Modernia monumenttia, museoarkkitehtuuria ilman oikeusketjua tai Serrekundan/Bakaun paikkaa ei lisätä määrän täyttämiseksi.

## Kaikki 17 kuvaa: oma silmätarkistus ja kuvatekstit

Katsottu B:n lopullisesta selected.json:sta; 17 eri tiedostoa. Tiedostonimet ja kaikki 17 lähderiviä täsmäävät sisalto.jsonin kanssa. Tavallissivujen Author-, alkuperäiskoko- ja lisenssitiedot tarkistettiin itse. Kaikkien leveys vähintään 1200 px. Itsensä toistavia tiedostonimiä ei ole eikä omassa `js/packs`-täsmähaussa löytynyt aiempaa käyttöä kanonisena/alaviiva/JS-heittomerkkimuotona.

| Rooli / esikatselu | Oma havainto | Kuvateksti, lähderivi ja valintatulos |
|---|---|---|
| C1 / 53 | Värillinen laaja ASTER-satelliittinäkymä: saarikaupungin kärki, mantereella levittäytyvä kaupunkikudos, kanavainen vihreä kosteikko ja jokisuu. Ei lisättyjä karttanimiä tai merkintöjä. | OK. 2727 × 1656; NASA/METI/AIST/Japan Space Systems, and U.S./Japan ASTER Science Team, PD. Kuvateksti koskee Banjulin/Tanbin paikkasuhdetta. |
| C2 / 27 | Kaareva hiekkaranta, laaja vesi, etäällä käyttöveneitä ja pisteiksi jääviä ihmisiä; vasemmalla taustataloja. | OK tässä laajassa rantakäytössä. 3872 × 2592; dorothy.voorhees, CC BY-SA 2.0. Ei tarkkaa rantapistettä tai rakennuksen tunnistusta väitetty. |
| C3 / 21 | Matala vesialue, mudan reunaa, yhtenäinen mangroveranta ja useita lintuja kaukana. | OK. 3648 × 2736; Wolfgang Weigelt from Berlin, Germany, CC BY 2.0. Tanbi-luokitus/GPS tukevat aluetta; lajeja tai lukumäärää ei nimetä. |
| K1 / 46 | Vaaleita epäsäännöllisiä paloja säkissä ja tavaraa uudelleenkäytetyssä mittapurkissa. Purkin punakeltaista painatusta näkyy osittain alhaalla; tavara hallitsee. | OK torin irtotavarana. 4000 × 3000; tjabeljan, CC BY 2.0. Ei tuotteen lajia tai purkin brändiä arvattu. Tämä ei ole mainos-/pakkausesittely; painatusta ei saa irrottaa lähikuvan aiheeksi. |
| K2 / 14 | Hillitty ISS-yleiskuva laajasta jokisuusta: vastakkaiset rannat ja alempana kaupunkikärki sekä kanavainen kosteikko. | OK. 4256 × 2832; NASA Astronauts, PD. Laaja maantiede, ei nimettyä yksittäistä rakennusta. |
| K3 / 56 | Lautan portaat, lähietäisyydellä matkustajia osin selin mutta myös sivuprofiilissa, suuri vesialue ja veneitä. Alkuperäiskoossa etualan kasvonpiirteet erottuvat. | **HYLÄTTY / R1.** 2436 × 1479; Mishimoto from Leiden, Netherlands, CC BY 2.0 on oikea lisenssirivi, mutta kasvot rikkovat koko reseptin sääntöä. Kuvateksti on lautta-aiheeseen sopiva. |
| K4 / 34 | Kelanauhuri, suojakansi ja suuret kuulokkeet sisätilan tasolla. Laitteen merkinnät ovat laitteessa, eivät kuvan päälle lisättyä tekstiä. | OK yleisenä teknisenä välineenä. 4272 × 2848; Richard Ash, CC BY-SA 2.0. Manchester/GPS ja kuvausaika 2018 lähdemetadatasta; ei NCAC:n omaksi laitteeksi väitetty. |
| L1 / 50 | Kaarevia mangroven juuria, lehvästöä, liejua ja juurten välissä matalia vedellisiä uomia. | OK Laminin seutuna. 3607 × 2297; Paul Walter, CC BY 2.0. Ei tarkkaa Tanbin karttapistettä tai retkiporttia. |
| L2 / 22 | Tiheää juuristoa ja reiällistä liejumaata; muutama lehti. Ei rakennuksia tai ihmisiä. | OK. 3648 × 2736; Wolfgang Weigelt from Berlin, Germany, CC BY 2.0. Hydrologia on B5:n tekstifakta eikä valokuvasta keksitty mekanismi. |
| L3 / 26 | Tiheä kasa avonaisia/erillisiä osterinkuoria; ei ihmisiä tai myyntiannosta. | OK. 3648 × 2736; Wolfgang Weigelt from Berlin, Germany, CC BY 2.0. Osterilaji, työvaihe ja kerääjän tausta jätetty nimeämättä. |
| L4 / 60 | Sääksi lentää sinistä taivasta vasten. Saaliskala ei erotu esikatselussa niin selvästi, että se pitäisi nimetä. | OK lajikuvana. 5057 × 3371; Paul Danese, CC BY-SA 4.0. Yhdysvallat/2026 metadatassa ja selitteessä; ei Tanbin havaintokuva. Kalaväitteen poisjättö oikein. |
| O1 / 52 | Mustavalkoinen vinoneliömäinen SAR-havainto: kaupunkikärki, kanavat, vettä ja mustat no-data-kulmat. Ei nimiä tai päälle lisättyä kehystä. | OK opas 1:n maantieteellisenä kuvana. 2265 × 2263; Capella Space, CC BY 4.0. Selite sanoo **tutkakuva/2024**, ei optinen nykykalustovalokuva. |
| O3 / 35 | Sääksi kokonaan näkyvissä, siivet levällään vaaleaa taivasta vasten. | OK lajikuvana. 5731 × 4149; Jules Verne Times Two, CC BY-SA 4.0. Yhdysvallat/2022 oikein. Maine-tiedostonimessä ja GPS:ssä oleva ristiriita ei siirry selitteeseen. |
| O4 / 59 | Valkoista keitettyä riisiä tavallisella lautasella, alhaalla käsi ja kovan päivänvalon varjoa; ei pakkausta, hintaa tai kasvoja. | OK yleisenä riisikuvana. 4608 × 3456; JFVelasquez Floro, CC0. GPS Filippiineillä, Date 2021. EXIF **Flash did not fire, auto mode**: ei salamahylkäystä kovan varjon perusteella. Ei benachiniksi/domodaksi tai gambialaiseksi annokseksi nimetty. |
| N2 / 28 | Vesialue, pieniä veneitä, luonnonrantaa ja oikealla lautan tavallinen pakoputki/tuki. Rannan ihmiset pisteitä. | OK jokisuun lauttareitin kuvana. 3872 × 2592; dorothy.voorhees, CC BY-SA 2.0. Ei joen lähde eikä täsmällisestä Mouth-koordinaatista otetuksi väitetty. |
| N3 / 20 | Mangrovejuuret veden äärellä, juuriin kiinnittyneitä vaaleita kuoria. | OK. 3648 × 2736; Wolfgang Weigelt from Berlin, Germany, CC BY 2.0. Kuoret jätetty lajitta; ei vierailuportti. |
| PHOTO / 23 | Lintu oksalla tiheässä mangrovejuuristossa, vettä alla. Ei ihmisiä. | OK. 3648 × 2736; Wolfgang Weigelt from Berlin, Germany, CC BY 2.0. Date 2013 ja Tanbi/GPS tukevat selitettä; ei lajiväitettä tai vuoden 1873 näkymää. Valokuvaosiossa `Commons`-muoto oikein. |

Satelliitti-, mangrove- ja sääksiaiheita toistuu eri tiedostoissa, eri rooleissa: kaupungin maantiede, hydrologia, luonnonpaikka, muuttolintu ja oppaan lajikuva. Aihetoisto on perusteltu. Kansi ei sisällä ruoka-/esine-/sisäkuvaa. O1/O3/O4 on rajattu maantieteeksi tai yleiseksi laji-/ainekuvaksi, eikä ulkomaista tai tutkakuvattua aineistoa nimetä paikalliseksi matkavalokuvaksi. Oppaan jaksojen 2 ja 5 kuvattomuus on kaksi sallittua kuvatonta jaksoa; se ei täytä Matkailijalle-pystyä.

## Valokuvan lisenssi, kuvatun teoksen oikeus ja FOP erikseen

1. **Kuvan oma lisenssi:** kaikilla 17 tarkistetulla tiedostosivulla on sallittu PD/CC0/CC BY/CC BY-SA, tarkat näkyvät tekijät ja vähintään 1200 px leveys. Ei NC/ND/fair usea. Lisenssirivit täsmäävät. PD satelliittikuvassa ei tarkoita kaupunkirakennusten PD-statusta.
2. **Kuvattu aihe:** luonnon vesi, mangroven juuret, kuoret, eläimet ja riisi eivät ole kuvatun teoksen oikeutta vaativia luomuksia. Nauhuri on dokumentoitu tekninen väline, ei NCAC-teos. K1:n osittainen purkkipainatus on tavaran sivuosassa eikä erillinen pakkausgrafiikan kuva. C2:n/N2:n taustataloja ei hyväksytä itsenäisiksi julkisivukuviksi; nykyisessä laajassa rantakäytössä pääaihe on luonnonrantaviiva ja vesi. Satelliittikuvissa yksittäisen modernin teoksen ilmaisua ei irroteta kuvituksen kohteeksi.
3. **Gambian FOP:** O1-maasivun mukaan erityistä julkisten suojattujen teosten panoramavapautta ei ole. Tätä ei ohiteta valokuvaajan CC-lisenssillä. Suojattuja monumentteja, hallitsevia moderneja julkisivuja tai folkloreteoksia ei hyväksytty. FOP:n puute ei itsessään tee luonnonaiheesta suojattua teosta. K3 hylätään kasvojen takia, vaikka sen valokuvalisenssi on sallittu.
4. **Oikeuslähteen rajat:** WIPOn [lakikortti](https://www.wipo.int/wipolex/en/legislation/details/9346) avattiin. Vanhan WIPO `/edocs/lexdocs/`-lakitekstipolun haku pysähtyi robots-kieltoon, eikä kiellettyä PDF:ää luettu tai käytetty. Varsinainen FOP/folklore-yhteenveto perustuu Commonsin maasivuun; en väitä koko alkuperäisen lain riippumatonta soveltamisalaselvitystä tehdyksi. Tässä hyväksynnät eivät perustu oletukseen yleisestä Gambian FOP-vapaudesta.

## Mitat ja jälkitarkistuksen raja

Nykyinen artikkeli-intro 856 merkkiä / 9 virkettä / 3 kappaletta / 3 lihavointia; Lue lisää 771 merkkiä / 3 kappaletta. Kannella ja luontosivulla kummallakin neljä nostoa, mitat 509/505/469/500 ja 522/489/507/487 merkkiä. Oppaassa viisi jaksoa, `parasta` viisi ja `hyvaTietaa` neljä. Nähtävyystekstit 895/856/976 merkkiä. R4:n korvaus säilyttää 700–1400 merkin ja 2–3 kappaleen rajat. K3-välikorjaus säilyttää noston tekstimitan mutta jättää aidon kuvaportin auki.

Sisalto.jsonin tarkistettu SHA-256: `fa1e27413219427c5b6ada49db2b8a408f92baba61273e228113af994dcaf6d5`. Tarkistuksen lopuksi sama kuin lähtötilassa. Faktapohjan/kuvien/sään C:n kirjaamat SHA:t täsmäsivät; niiden sisältöä ei muokattu.

Jatko vaatii R1–R4:n korjausten soveltamisen, B:n uudet valinnat kolmeen avoimeen kuvarooliin (kaksi ennestään puuttuvaa sekä K3:n hylätty valinta), niiden lisenssi-/teos-/kasvo-/kuvatekstitarkistuksen, pääsession kolmen karttakohteen perustelun ja todellisen koneportin uusinnan. **OSITTAIN TARKISTETTU** pysyy, kunnes puuttuvien ja korvaavien kuvien jälkitarkistus on tehty. Tässä raportissa ei ole koko kaupungin valmis-D/F-merkintää.


## Korjattu

E-korjaus 11.10.2026. **KAUPUNKI ON EDELLEEN KESKENERÄINEN.** En ollut Banjulin A-, C- tai D-agentti. Luin AGENTS.md:n, CODEX.md:n, PILVIOHJE:n luvut 7, 8E ja 13 sekä LISÄSÄÄNNÖN, lehtityöreseptin ja kaupunkilehden/spec-mantereiden sitovat linjaukset. Sovelsin vain tämän D-raportin R1–R4-korvaukset. Ei uusia kuvavalintoja, Commons-kuvahakuja, muita agentteja, Git-toimia tai pelitiedostomuutoksia. Väliaineisto, TMPDIR ja Python-välimuisti ovat NASilla `valiaikainen/banjul-E/`.

| D-kohta | Sovellettu korvaus | Tulos |
|---|---|---|
| R1, VÄÄRIN — `kaupunkilehti[0].nostot[2]` | Koko nosto vaihdettu D:n sanatarkkaan väliaikaisolioon. `tiedosto`, `lyhyt`, `selite` ja `lahde` ovat tyhjiä merkkijonoja; otsikko, 469 merkin teksti ja wiki säilyvät. | Luettavien kasvojen vuoksi hylätty `Barra ferry, Gambia (4075989888).jpg` poistettu sisällöstä. Uutta kuvaa ei keksitty. K3-rooli on **avoin kuvavirhe** ja vaatii B:n valinnan sekä D:n jälkitarkistuksen. |
| R2, VÄÄRIN — `ehdotukset.huomiot[1]` | Koko huomio vaihdettu D:n sanatarkkaan korvaukseen. | Albertin torin erillinen kohdekuva nimetään puuttuvaksi, tarkistimen virhe nimetään avoimeksi eikä #74:ään viitata hyväksyttynä kuvapoikkeuksena. `kuvat: []` säilyy aidosti puuttuvana. |
| R3, VÄÄRIN — `kysymykset[3]` | Koko kysymysolio vaihdettu D:n sanatarkkaan korvaukseen: kysymys, neljä vaihtoehtoa ja vihje muuttuvat. | Vaihtoehdot koskevat tallenneaineistoja. `correct: 0`, `level: 2`, fakta ja NCAC-lähde säilyvät. NCAC-verkkotunnusta koskeva varoitus on edelleen näkyvä; lähdettä ei vaihdettu varoituksen peittämiseksi. |
| R4, EPÄVARMA — `nahtavyydet["Gambia-joen suu"].teksti` | Koko teksti vaihdettu D:n sanatarkkaan 874 merkin / 3 kappaleen korvaukseen. | Nykyisten lauttojen, laiturien ja rannikon rakennusten yhteinen ikäyleistys poistettu. Vuoden 1873 kulma säilyy; nykymaisemasta ei päätellä matkavuoden näkymää. |

Korvauslista tarkistettiin sekä raportin neljästä JSON-lohkosta että D:n `korvaukset.json`:sta: **4 korvauskohdetta, 12 muuttunutta yksittäistä JSON-arvoa**. Neljä alikenttää on R1:ssä, yksi R2:ssa, kuusi R3:ssa ja yksi R4:ssa. Kaikki neljä korvausta täsmäävät sanatarkasti. Muutoksia ei ole muiden JSON-polkujen arvoissa. Ennen/jälkeen-vertailu on `valiaikainen/banjul-E/sisalto-muutokset.json`, tekstiero `sisalto.diff` ja varmistukset `vertailu.json` samassa kansiossa.

Säärivi ja kaikki aiemmat ilmastotekstit säilyivät muuttumattomina. `lat`, `lon`, `keskilampo`, `ylin`, `alin`, `sade` ja `lahde` verrattiin taas `saa.json`:iin: kaikki samat. Uusia ilmastolukuja tai tekijä-/lisenssiarvauksia ei lisätty. Säätä, faktapohjaa, kuvat.md:tä, kontekstia ja alkuperäistä tarkistintyökalua ei muokattu.

Alkuperäinen paikallinen tarkistin sekä alkuperäinen `--verkko`-tarkistin ajettiin E-korjauksille. Verkkotarkistuksessa käytettiin tehtävän sallittua `valiaikainen/lahdesovitus.mjs`-kuljetusta: robots-sallitut tavalliset tiedosto-/artikkelisivut, ei Commons-hakua eikä kiellettyjen API-polkujen hakua. Tarkistintyökalun sisältö säilyi alkuperäisenä. Tavallissivujen Author-/lisenssi-/kokotietojen sovitusta ei esitetä natiivina API-extmetadata-hakuna eikä uutena kuvasisällön hyväksyntänä.

Molempien ajojen todellinen tulos, lopetuskoodi 1:

```text
VIRHE banjul: kansi nosto 3: tiedosto puuttuu
VIRHE banjul: matkailijalle.kuva: tiedosto puuttuu
VIRHE banjul: juttu Albertin tori: kuvia 1–3
VAROITUS banjul: kysymys 4: source ei ole Wikipedia-artikkeli
VAROITUS banjul: kohteita 3 (pohjataso 6; perustele RAPORTTI.md:ssä)
== banjul: 3 virhettä, 2 varoitusta, 16 kuvaa
YHTEENSÄ 1 kaupunkia: 3 virhettä, 2 varoitusta
```

Koneportti on siis **3 virhettä, 2 varoitusta, 16 kuvaa**. Avoimet kuvaroolit ovat K3-lauttanosto, Matkailijalle-pysty ja Albertin torin erillinen kohdekuva. Mikään niistä ei ole hyväksytty nollavirhepoikkeus. Kaksi varoitusta tarvitsevat pääsession perustelut: NCAC on arkiston ensisijainen lähde ja kolmen karttakohteen pienkaupunkirajaus perustellaan RAPORTTI.md:ssä. Kuvavalinnat ja niiden tekijä-/lisenssi-/teos-/kasvo-/kuvatekstitarkistus ovat yhä tekemättä näille kolmelle roolille. Tässä ei ole valmis-C/E/F-, toimitusvalmis- eikä julkaisuvalmis-merkintää.

Sisalto.json SHA-256 ennen E:tä: `fa1e27413219427c5b6ada49db2b8a408f92baba61273e228113af994dcaf6d5`. Korjausten jälkeen: `5cc82baca6b375d1a285a61c04821861c15b4c5bccbc25d30141e472faebd348`. Tarkistinlokit ovat `valiaikainen/banjul-E/tarkistus-paikallinen.txt` ja `tarkistus-verkko.txt`. D-raportin aiempi sisältö säilyy sanatarkasti tämän lisäosion edellä; sen 17 kuvan tarkistukset kuvaavat E:tä edeltävää aineistoa, johon K3 vielä kuului.
