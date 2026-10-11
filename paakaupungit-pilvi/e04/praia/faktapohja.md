# Praia — faktapohja, vaihe A

Kaupunki `praia`, maa `CPV`, erä `e04`; koottu 11.10.2026. Konteksti ja valmis saa.json luettu. Ohjeet samat kuin Rabatin/Nouakchottin A:ssa: AGENTS.md, CODEX.md, PILVIOHJE 3, 4, 7, 13 ja LISÄSÄÄNTÖ sekä lehtityöresepti ja Nairobi-mallin rakenne. Kirjoitus vain tämän kaupungin faktapohjaan; ei pelitiedostoja, gittoimia tai kuvan hyväksyntää.

Omistajan hyväksymällä kanavapoikkeuksella käytettiin robots-sallittuja tavallisia Wikipedia-/Wikivoyage-lähdesivuja estettyjen API-polkujen sijasta. Wikidata EntityData toimii. Jokainen oma lähdepyyntö ja uudelleenohjaus tarkistettiin `sallittu_haku.py`:llä. Tarkat vuosiluvut, mitat ja määrät joko pyöristetään/vuosisataistetaan tai jätetään pois, ellei riippumattomia lähteitä ole. Koordinaatit, lähdeasiakirjan päiväys ja säätaulukon metatiedot säilyvät jäljitettävyyttä varten. Sama väite Wikipedia-artikkelissa ja sen käyttämässä UNESCO-tekstissä ei ole automaattisesti riippumaton pari.

**Kuvaportti:** B:n alustavassa CPV-oikeustarkistuksessa nousi esiin kaupallisen teospääaiheen panorama-raja sekä julkisen omistuksen teosten käyttöön mahdollisesti liittyvä paikallinen ennakkolupa/maksu. B varmistaa alkuperäispykälät ja soveltamisalan. Tässä A:ssa historiallisten kohteiden ikä **ei** ole PD/FOP-hyväksyntä, eikä maksulliseen käyttöön ole annettu lupaa. Teksti- ja paikkafaktat erotetaan myöhemmästä kuvan oikeusketjusta.

## 0. Luetut lähteet ja 1873-kehys

Hakupäivä kaikissa 11.10.2026. NAS-raaka-aineisto ja tekstipoiminnat: `/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/paakaupungit-codex/sessio-72-20261011/valiaikainen/praia-A/`. Verkkopyyntöloki ylemmän valiaikainen-hakemiston `sallitut-haut.jsonl`.

| Tunnus | Otsikko, kieli ja luetut osiot |
| --- | --- |
| P1 | [Praia](https://en.wikipedia.org/wiki/Praia), en: johdanto, History, Geography, Transport, Culture ja Architecture. Climate luettiin vain ristiriidan tunnistamiseksi, sääluvut saa.json:sta. |
| P2 | [Plateau (Praia)](https://en.wikipedia.org/wiki/Plateau_(Praia)), en: johdanto, History, Cityscape. Tasanne/kaupunginosa, ei yksittäinen rakennus. |
| P3 | [Praça Alexandre Albuquerque](https://en.wikipedia.org/wiki/Pra%C3%A7a_Alexandre_Albuquerque), en: koko kohdekuvaus ja koordinaatti. Aukion nykyiset rintakuvat erillisiä teoksia, eivät kuvalupaa. |
| P4 | [Quartel Jaime Mota](https://en.wikipedia.org/wiki/Quartel_Jaime_Mota), en: johdanto, rakennusvaiheet, koordinaatti. Nimen myöhempi konfliktitausta ja museo-/ministeriöhankkeen vanha tulevaisuuslupaus eivät pelaajatekstiin. |
| P5 | [Dona Maria Pia Lighthouse](https://en.wikipedia.org/wiki/Dona_Maria_Pia_Lighthouse), en: infolaatikko ja johdanto. Ei valon kantama-, korkeus- tai välähdysaikalukuja ilman erillistä vahvistusta. |
| P6 | [Ilhéu de Santa Maria](https://en.wikipedia.org/wiki/Ilh%C3%A9u_de_Santa_Maria), en: johdanto, vanha käyttö ja koordinaatti. Modernin hotellihankkeen osio merkitty päivitystä vaativaksi; ei tulevaisuuslupausta. |
| P7 | [Museu Etnográfico da Praia](https://en.wikipedia.org/wiki/Museu_Etnogr%C3%A1fico_da_Praia), en: johdanto, rakennuksen ikä, sijainti, koordinaattirivin ja infolaatikon ero. |
| P8 | [Instituto do Património Cultural: Museu Etnográfico da Praia](https://ipc.cv/museus/museu-etnografico-da-praia/), pt: alkuperä, kokoelmien muodostaminen, pysyvä näyttely, suullisen perinteen aineisto. Virallinen ensisijainen täydentävä lähde; ei aukioloaikoja, hintoja tai nykyisiä henkilöitä. |
| P9 | [UNESCO: Centre historique de Praia](https://whc.unesco.org/en/tentativelists/6103), fr: Description, Authenticity/Integrity ja Comparison. Tämä on **ehdokasluettelo**, ei Praian maailmanperintöstatuksen todistus. Tekstin historiallisissa ajoituksissa on myös ilmeinen ristiriita (8). |
| P10 | [Praia Harbor](https://en.wikipedia.org/wiki/Praia_Harbor), en: johdanto, History, lahti/luoto/niemet. Koordinaatti on väärä satamapisteeksi (8); paikkafaktat käytössä ilman satamakoordinaatin kopiointia. |
| P11 | [Chã de Areia](https://en.wikipedia.org/wiki/Ch%C3%A3_de_Areia), en: johdanto, Gamboan ranta, vanha satama ja entinen tullitalo. Koko kaupunginosan koordinaatti ei ole suoraan rannalle kuuluva piste. |
| P12 | [Quebra Canela](https://en.wikipedia.org/wiki/Quebra_Canela) ja [Ponta Temerosa](https://en.wikipedia.org/wiki/Ponta_Temerosa), en: paikka- ja rantakuvaukset. Quebra Canelan infolaatikossa väärä kaupunginosanimi ja laaja piste; ei kuudennen rantakohteen automaattinen koordinaatti. |
| P13 | [Charles Darwin: Journal of researches…, Chapter I](https://en.wikisource.org/wiki/Journal_of_researches_into_the_natural_history_and_geology_of_the_countries_visited_during_the_voyage_of_H.M.S._Beagle_round_the_world/Chapter_1), en, alkuperäistekstin digitaalinen julkaisu: vain Porto Praya / St. Jago -saapuminen ja rannikon geologinen havainto. Historiallinen ensisijainen lähde. Ei kolonialistisia ihmiskuvauksia, ilmastolukuja tai myöhempiä muun maan havaintoja. |
| P14 | [Tabanka](https://en.wikipedia.org/wiki/Tabanka), en: As general music ja Significance; Praian kaupunginosien perinteet, laulu-vastaus, instrumentit ja yhteisöllisyys. Kiistanalainen alkuperä, tarkat kiellon vuodet ja nykyartistien kappaleet pois. |
| P15 | [Praia, Wikivoyage](https://en.wikivoyage.org/wiki/Praia), en: Get in, Get around, Museums and culture, Buy, Eat, Do. Päivitysikä huomioidaan; ei hintoja, aikatauluja, väestölukuja tai ”parhaat aallot” -superlatiivia. |
| P16 | [Cape Verdean cuisine](https://en.wikipedia.org/wiki/Cape_Verdean_cuisine), en: Overview ja Meals. Oppaan yleinen ruokatausta; ei Praian omaksi keksinnöksi nimeämistä. |
| P17 | [Nelson Mandela International Airport](https://en.wikipedia.org/wiki/Nelson_Mandela_International_Airport), en: johdanto ja IATA; vanha Francisco Mendes -kenttä erotetaan nykyisestä. Koordinaattia ei käytetä nähtävyyskartalla. |
| P18 | [UM: Kap Verde, matkustustiedote](https://um.fi/matkustustiedote/-/c/CV), fi: päiväys 31.7.2026, turvallisuustaso, liikenne ja käytännön varovaisuus. Ei politiikkaa, rikostapauksia tai lääketieteellisiä neuvoja peliin. |
| WD1 | [Praia Q3751 EntityData](https://www.wikidata.org/wiki/Special:EntityData/Q3751.json): P17, P1376, P625 ja P571:n merkitysero. |
| WD2 | [Museu Etnográfico Q3330560 EntityData](https://www.wikidata.org/wiki/Special:EntityData/Q3330560.json): P625. |
| WD3 | [Ilhéu de Santa Maria Q23007125 EntityData](https://www.wikidata.org/wiki/Special:EntityData/Q23007125.json): P625. |
| WD4 | [Quartel Jaime Mota Q3413006 EntityData](https://www.wikidata.org/wiki/Special:EntityData/Q3413006.json) ja [Quebra Canela Q28232321 EntityData](https://www.wikidata.org/wiki/Special:EntityData/Q28232321.json): P625:n tarkkuus ja merkitys verrattuna artikkeliin. |

Museon vanha `www.ic.cv`-verkkotunnus ei ratkennut, eikä sen sisältöä käytetty. Wikipedian viittaama caboverde-info.com:n matkailuresurssi-PDF jäi hakematta, sillä domainin robots kieltää kaiken kummallekin tarkistetulle agentille. Sucupira-Wikipedia-otsikko on brasilialaisista/televisioaiheista kertova täsmennyssivu, ei Praian tori; sitä ei käytetty torin lähteenä. Praia City Hall -otsikko ohjautuu kunta-artikkeliin; ei raatihuonekoordinaatiksi.

### 1873-kehys

Praia **oli olemassa** isoisän matkavuonna 1873. Paikkakunta oli kehittynyt sataman vierelle varhaismodernilla ajalla, ja siitä tuli Kap Verden siirtomaahallinnon keskus 1700-luvun loppupuolella. Plateau-tasanteen ruutukaavan ja hallintorakennusten kehittäminen kuuluu etenkin 1800-luvulle (P1 History; P2 History; P9 Description). Isäntäväestöä tai aiempia kerroksia ei poisteta keksimällä ”ennen eurooppalaisia täällä oli vain tyhjää”.

Aukio oli jo olemassa, mutta sen nykyinen nimi on myöhemmästä 1800-luvun vaiheesta; lähde antaa aiemmaksi nimeksi Praça do Pelourinho (P3). Kasarmin ensimmäinen rakennusvaihe on 1800-luvun alkupuolelta (P4). Santa Marian luodon tullitalo ja varastot ovat vuosisadan puolivälin rakennuksia (P6). Nämä ajoitukset asettuvat ennen matkavuotta; päätelmä kirjataan ajalliseksi, ei isoisän havainnoksi.

Maria Pian majakka on 1800-luvun loppupuolelta ja sitä **ei vielä ollut** matkavuonna 1873 (P5:n ajoitus). Museo toimii 1800-luvun talossa, mutta tämän aineiston perusteella ei tiedetä, oliko juuri talon nykyinen rakennusvaihe jo vuonna 1873; museotoiminta alkoi vasta myöhäisellä 1900-luvulla (P7; P8). Nykyiset hotellit, silta, veistokset, terminaali tai myöhemmin uudistettu satama eivät ole 1873-maisemaa.

Ei isoisän tekemisiä, reittiä, päiväkirjamerkintöjä tai lainauksia. Darwinin todellinen aiempi matka on eri henkilön historiallinen tapahtuma; hänen kuvaustaan ei panna isoisän suuhun.

## 1. Perusfaktat

- **Nimi:** Praia on portugalin sana rannalle (P1 johdanto; P15). Ei keksittyä lisäetymologiaa.
- **Asema:** Kap Verden pääkaupunki, Santiagon saaren eteläosassa (P1; WD1 P1376/Q1011 ja P17).
- **Sijainti:** Atlantin rannikolla. Historiallinen ydin on satamaa hallitsevalla Plateau-tasanteella; muu kaupunki levittäytyy tasanteille ja niiden välisiin laaksoihin (P1 Geography; P2).
- **Muoto:** alueen monia tasanteita kutsutaan sanalla achada. Keskustan erityisnimi Plateau tulee ranskan tasannetta tarkoittavasta sanasta (P1 Geography; P2 johdanto).
- **Synty:** sataman lähellä varhaismodernilla ajalla syntynyt asutus. Lähteiden 1500-/1600-lukujen ensimmäisen maininnan ero kirjataan osioon 8; pelaajatekstiin ei tarkkaa perustamisvuotta.
- **Väestö:** kontekstin 2021 laskennan lähtöluku on **141 219 Praian kaupungissa**, ei koko Praian concelho-kunnassa. N1 toistaa saman luvun, mutta ei osoita riippumattomuutta INE-lähteeseen nähden. Pelaajalle **”noin 140 000 asukasta Praian kaupungissa (2021)”** tai luku pois. Kunta ja kaupunki erotetaan, eikä P15:n vanhempaa kunta-/arviolukua sekoiteta tähän.
- **Pallo:** konteksti sellaisenaan lat 14.9177, lon −23.5092.
- **Wikiavain:** `Praia`, konteksti ja WD1 sitelinkit.
- **Ambience-ehdotus:** `satama`, kaupungin satamapainotuksen perusteella; toimituksellinen äänimaisema, ei kaupungin ainoa toiminto.
- **Sataman asema:** kontekstin ”saarivaltion tärkein satama” ei ole sama kuin rahtitilaston suurin. P10:n vanhempi rahtimittari asettaa Praian Porto Granden jälkeen; ei käytetä superlatiivia. ”Pääkaupungin tärkeä satama” riittää.

## 2. Kansi ja neljä nostoaihetta

**Johdantoehdotus:** Praian vanha keskusta on meren yläpuolisella tasanteella, mutta kaupungin yhteydet ovat kulkeneet sataman kautta. Nykyiseen pääkaupunkiin kuuluvat myös torit, paikalliset musiikkiyhteisöt ja arjen esineitä säilyttävä museo. (P1; P2; P8; P14; P15.)

Artikkeli-introon sopivat nimi/ranta, Santiagon etelärannikko, tasanteet ja laaksot, varhaisen satamakylän kehitys, siirtomaahallinnon keskus, 1800-luvun ruutukaava, nykykaupungin kasvu sekä torien ja paikallisten musiikkiperinteiden arki. Ei maataustan itsenäistymisvuotta, saarten lukumäärää tai mornaa nostoiksi uudestaan.

### K1 — Keskusta nostettiin tasanteelle

Wiki `Plateau (Praia)`; P1 Geography, P2 History / Cityscape, P9 Description.

1. Plateau on Praian historiallinen keskusta, korkeammalla meren ja sataman yläpuolella.
2. Nimi tarkoittaa tasannetta; kaupungin muutkin tasanteet kuuluvat paikalliseen topografiaan.
3. Sijainti helpotti sataman ja kaupankäynnin valvontaa, lähteen mukaan.
4. Tasanteen kaupunkikuvaa kehitettiin 1800-luvulla ruutukaavalla.
5. Katuverkkoon sijoittuu aukioita, vanhoja hallintotaloja ja asuinrakennuksia.
6. Praça Alexandre Albuquerque on historiallisen ytimen keskeinen aukio.
7. Tasanteen ulkopuoliset kaupunginosat kehittyivät eri tavoin; nyky-Praia ei ole vain vanha Plateau.

Ei korkeutta metreinä, vanhan kaupunginosan asukaslukua tai väitettä kaikkien värikkäiden talojen iästä ilman kuvakohtaista tunnistusta.

### K2 — Arjen esineestä tuli museon aineistoa

Wiki `Museu Etnográfico da Praia`; P7, ensisijainen P8 (kokoelmien alkuperä ja Saber Mais), P15 Museums and culture.

1. Museo sijaitsee vanhassa Plateau-kaupunginosassa 1800-luvun talossa.
2. Museotoiminta syntyi myöhäisen 1900-luvun kulttuuriperintöhankkeesta.
3. Kokoelmia muodostettiin eri saarilla tehdyillä keruukampanjoilla, ei vain pääkaupungista.
4. Aineisto esittelee etenkin arjen taitoja ja maaseudun käytännön elämää.
5. Kokoelmissa käsitellään maataloutta, karjanhoitoa ja kalastusta.
6. Käsityöaineistoon kuuluu kudontaa, korinpunontaa ja keramiikkaa.
7. Myös suullista perinnettä, kuten kertomuksia ja arvoituksia, on tallennettu museon aineistoksi.

Museoesineen kuva ei ole automaattisesti PD: sen ikä/tekijä/oikeudet ja CPV-sääntö tarkistetaan B:ssä. Ei esinettä väärällä nimellä eikä väitettä, että kokoelmien kaikki esineet olisivat vanhempia kuin vuosi 1873.

### K3 — Rumpuun vastataan laululla

Wiki `Tabanka`; P14 As general music / Significance.

1. Tabanka on Santiagoon ja paikallisiin yhteisöihin liittyvä musiikki- ja juhlintaperinne.
2. Praian Várzean, Achada Granden ja Achada de Santo Antónion kaupunginosissa on nimettyjä tabanka-perinteitä.
3. Laulaja esittää säkeen, johon muut vastaavat yhdessä.
4. Rytmiä tehdään rummuilla.
5. Soittimina käytetään myös kotilotorvia ja viheltimiä.
6. Tabanka ei ole vain laululaji: siihen liittyy yhteisötoimintaa ja keskinäistä avunantoa.
7. Alkuperää ei tunneta varmasti; ei yhtä keksittyä syntyvuotta.

Ei tarkkaa tempoa, tahtilukujen luetteloa, nykyartistien suojattuja kappaleita/lyriikoita tai juhlapäiväkalenteria. Kuvan tarkka perinne ja paikka varmistettava; yleinen afrikkalainen rumpukuva ei sellaisenaan todista Praian tabankaa. Kansantaiteen kuvaoikeusketju B:lle.

### K4 — Torit ovat eri paikkoja

Wiki `Praia`; käytännön ensisijainen opaslähde P15 Buy / Eat.

1. Plateau-ytimen Mercado Municipal tunnetaan myös Mercado Central -nimellä.
2. Siellä myydään ruokaa ja käsityötuotteita.
3. Sucupira on toinen erillinen markkinapaikka, ei sama tori toisella nimellä.
4. Torit muodostavat osan kaupungin kauppa-arkea, eivät vain turistinäyttämöä.
5. Niiden nykyistä toimintaa voi käsitellä oppaassa, mutta perustamisvuotta ei tässä aineistossa vahvistettu.
6. Keskustan katuverkko ja torit liittyvät toisiinsa paikallisina asiointipaikkoina; kummallekaan ei väitetä dokumentoimatonta karavaani- tai siirtomaahistoriaa.

Ei hintoja, aukioloaikoja, torin kokoa tai ostosuositusta tietylle kojulle. Kuvassa oikea tori, ei samanniminen brasilialainen paikkakunta tai tv-sarjan kuvitus.

## 3. Teemasivu: historia

Vakioaihe `historia`, nimi **”Sataman eri vuosisadat”**.

**Johdantoehdotus:** Praian lahden kautta kulkivat laivat ja tavarat jo ennen nykyisiä terminaaleja. Rannalle jäi myös havaintoja, joista luonnontutkija Charles Darwin etsi saaren menneisyyttä. (P9 Description; P10 History; P13.)

### H1 — Laiva tarvitsi muutakin kuin laiturin

Wiki `Praia Harbor`; P9 Description, P10 History.

1. Praian satama sijaitsee Atlantin luonnonlahdessa.
2. Rannikkokylä kasvoi meriliikenteen yhteydessä.
3. Satamassa laivat saivat vettä ja ruokaa.
4. Paikkaa käytettiin myrskysuojana ja laivojen korjaamiseen, P9:n mukaan.
5. Satama kuului Portugalin, Afrikan ja Amerikan välisiin reitteihin.
6. Näihin reitteihin kuului myös orjuutettujen ihmisten kuljettaminen; jos mainitaan, neutraalisti ja ilman yksityiskohtia tai sankarikehystä.
7. Vanhat laiturit olivat eri paikassa kuin lahden itäosan myöhemmin uudistetut satamarakenteet.

Ei suojatun modernin terminaalin pääkuvaa, täsmällisiä rahtimääriä tai nykyisiä lautta-aikatauluja. Vanha PD-kartta vain B:n oikeus- ja merkintätarkistuksin.

### H2 — Luoto varastoi ja eristi

Wiki `Ilhéu de Santa Maria`; P6, P10 lahden maantiede.

1. Santa Maria on pieni tuliperäinen luoto Praian lahden suulla.
2. Se on vastapäätä Gamboan rantaa ja lähellä historiallista keskustaa.
3. Vanhoissa lähteissä esiintyy nimi Quail Island.
4. Luodolle rakennettiin 1800-luvun puolivälissä tullitalo ja varastoja.
5. Rakennuksia käytettiin myös karanteeniin.
6. Karanteenikäyttö siirtyi myöhemmin Ponta Temerosa -niemen uuteen lazarettoon.
7. Nykyinen hotellihanke ja silta ovat eri ajalta; vanhoista lähteistä ei voi päätellä niiden nykyistä valmistumistilaa.

Ei luodon mittoja, pinta-alaa tai eristettävien ihmisten kokemuksia/arvattuja sairauksia. Ei nykyistä hotellia, kasinoa tai modernia siltaa kuvan pääteokseksi.

### H3 — Simpukan kuori mustan kiven välissä

Wiki-tausta `Praia`, ensisijainen historiallinen lähde P13 Chapter I / St. Jago -geologiakohta.

1. Darwinin Beagle-matka pysähtyi Praian satamaan 1800-luvun alkupuolella.
2. Hän kuvasi rannikon kalliossa vaakasuuntaisen valkoisen kerroksen.
3. Kerros sisälsi kalkkipitoista materiaalia ja simpukankuoria.
4. Sen alla olivat vanhemmat vulkaaniset kivet ja päällä basalttilaava.
5. Darwin tulkitsi kerroksen olleen merenpohjaa, jonka päälle laava oli virrannut.
6. Hän tutki myös laavan lämmön muuttamaa kalkkipitoista materiaalia.
7. Tämä on historiallinen dokumentoitu geologinen havainto, ei isoisän oma havainto eikä nykyisen luodon tarkka geokohdekoordinaatti.

Ei kerroksen korkeutta, laavan ikää tai ajankohtaista vulkaanista aktiivisuusväitettä. P13:n muun maan myöhempiä kohtia ei kuvata Santiagon havainnoiksi. Kuva vain oikeasta tunnistetusta geologiasta tai selkeästi yleisen ilmiön kuvana.

### H4 — Majakka tuli myöhemmin

Wiki `Dona Maria Pia Lighthouse`; P5 ja P12 Ponta Temerosa.

1. Majakka seisoo Ponta Temerosa -niemellä, Praian lahden sisääntulon yhteydessä.
2. Se rakennettiin 1800-luvun loppupuolella.
3. Nimi tulee tuolloisesta Portugalin kuningattaresta Maria Piasta.
4. Majakan torni on kahdeksankulmainen ja muurattu.
5. Torni liittyy matalampaan majakanvartijan rakennukseen.
6. Torni on valkoinen; valon ja parvekkeen rakenne tunnistetaan kuvan kanssa.
7. Majakka palvelee merenkulun navigointia.
8. Sitä ei vielä ollut isoisän matkavuonna 1873.

Ei tarkkaa korkeutta, kantamaa, välähdysmäärää tai linssin tyyppiä: varsinaista nykyistä optiikkaa ei lähteissä vahvistettu. Rakennuksen ikä ei ole B:n CPV-oikeusportin läpäisy.

**Minitehtävä:** mitä Darwinin Praiassa kuvaama vaalea kerros sisälsi? Oikea: simpukankuoria. Vaihtoehdot: simpukankuoria / metallisia laivanosia / tummia hiilikappaleita / puun lehtiä. Vastaus löytyy H3:sta; kaupungin visa ei toista tätä kerrosfaktaa.

## 4. Matkaopas

### Jakso 1 — Perille ja liikkeelle

- Nykyinen lentoasema on **Nelson Mandela International Airport / Praia International Airport (RAI)** (P17 johdanto ja infolaatikko). Vanha Francisco Mendes -kenttä ei ole matkailijan nykyinen saapumiskohde.
- Kaupungissa on linja-autoliikennettä ja takseja (P1 Transport; P15 Get around). Ei tarkkoja hintoja, vuorovälejä tai lentokenttälinjan toimivuuslupausta.
- Plateau-ytimessä kohteet ovat lähellä toisiaan, mutta maasto nousee ja laskee tasanteiden välillä (P1 Geography; P2). Ei laskettua linnuntietä kävelymatkana.
- UM suosittelee liikenteessä varovaisuutta etenkin pimeällä (P18 Liikenne).

### Jakso 2 — Plateau ja vanhat talot

- Vanhassa ytimessä on ruutumainen katuverkko ja keskeinen Praça Alexandre Albuquerque -aukio (P2; P3).
- Entinen kasarmi kuuluu 1800-luvun rakennuskerroksiin; museo toimii vanhassa talossa (P4; P7).
- Museon virallinen sivu kertoo näyttelyaineiston arjesta ja perinteisistä taidoista (P8); ei lupauksia tietystä esineestä tai näyttelystä ilman kuvatunnistusta.
- Plateau on UNESCO-ehdokasluettelossa; **ei ”UNESCO-maailmanperintökaupunki”**. Lähellä oleva Cidade Velha on eri paikka, eikä sen historiaa kirjoiteta Praian omaksi (P9).

### Jakso 3 — Lahden reunalla

- Gamboan ranta sijaitsee vanhan keskustan alapuolella, ja siitä avautuu näkymä Santa Marian luotoon (P11; P6).
- P15 ei suosittele Gamboaa uintipaikaksi; oppaassa sitä kuvataan kaupunki- ja rantamaiseman paikkana, ei uimarantana.
- Quebra Canelalla on paikallisten ja vierailijoiden suosima ranta (P12; P15). Suosio ei ole uimaturvallisuuden tai vedenlaadun vahvistus.
- Maria Pian majakka seisoo Ponta Temerosa -niemellä (P5). Ulkoa katsomista voi kuvailla, mutta tornin sisäänpääsyä tai luodon/hotellin vierailua ei luvata.

### Jakso 4 — Maissi, pavut ja kala

- Kapverdeläisessä keittiössä maissi ja pavut ovat perustavia raaka-aineita (P16 Overview).
- Cachupa on maissiin ja muihin aineksiin perustuva pataruoka; siihen on eri versioita (P16 Meals).
- Kala ja merenelävät kuuluvat saarivaltion ruokaan (P16). Ei väitetä kaikkia raaka-aineita juuri Praian rannasta pyydetyiksi.
- Torit ovat ruokakaupan paikkoja (P15 Buy); ei hintoja tai tietyn kojun suositusta.
- Oppaan tausta on koko maan ruokaperinne, ei Praian yksinoikeus. Alkoholibrändejä, kilpikonnaruokia tai muilta saarilta lainattua paikallista herkkua ei nosteta kaupungin omaksi.

### Jakso 5 — Milloin kannattaa tulla

Valmis `paakaupungit-pilvi/e04/praia/saa.json` luettu, ei muutettu. Pääsessio teki alkuperäisen `tyokalu.mjs saa` -ajon omistajan hyväksymällä sallitun lähdesivun verkkosovituksella; A ei kopioinut eikä laskenut omaa ilmastoriviä.

- Artikkeli **Praia**, revisio **1377102448**, luettu **11.10.2026**.
- Taulukko **Climate data for Praia (Nelson Mandela International Airport) 1991–2020**.
- Normaalikausi **1991–2020**. Lähderivin kosteuden **1981–2010** ei ole tämän lämpötila-/saderivin normaalikausi.
- `lahde.nimi` on en-Wikipedia, ilmastotaulukko. Taulukon lähderivi: **Source 1: NOAA, Instituto Nacional de Meteorologia e Geofísica (humidity 1981-2010) | Source 2: Deutscher Wetterdienst (extremes, sun)**.
- `keskilampo` on **Daily mean °C (°F)**, ei ylin-/alin-rivien keskiarvolla korvattu arvo. `sade` on **Average precipitation mm (inches)**. Taustan vuosisade **176 mm**; A ei muuta eikä tee vaihtoehtoista normaalisarjaa.
- Lat/lon 14.92/−23.51 ovat työkalun kaupungille tallentamat pisteet; niitä ei esitetä lentoaseman erikseen varmennettuna mittauspisteenä.
- Pelin `saatiedot` saa tiedoston kentät ilman `tausta`a. Jokainen tekstin ilmastoluku vain tästä tiedostosta, pyöristettynä. Ei P1:n Climate-johdannon toista vuosisadetta, Wikivoyagen sääyleistystä, ennusteita tai ennätyslukuja. Leipätekstin ilmastolauseessa ei lähdemainintaa.

**Lukujen tukema kausikuva:** alkuvuoden päivän ylimmät normaalit ovat noin 27–28 astetta ja yön alimmat noin 20 astetta; loppukesällä ja alkusyksyllä päivän ylimmät noin 31 astetta. Suurin osa sateesta painottuu elo–lokakuuhun. ”Aina hyvä sää”, ”ei koskaan sada” tai turvallisin matkakuukausi eivät seuraa taulukosta.

### Parasta (5)

1. **Plateau ja aukio (3 tähteä):** vanhan keskustan katuverkko ja kaupunkinäkymät (P2; P3).
2. **Etnografinen museo (2):** saarten arjen ja käsityötaitojen kokoelmia (P8), ei tietyn aukioloajan tai kohdekuvan lupausta.
3. **Maria Pian majakkaniemi (2):** historiallisen majakan paikka lahden suulla (P5; P12), oikeudet B:ssä.
4. **Torit (2):** Mercado Municipal ja Sucupira ovat erilaiset paikallisen kaupankäynnin paikat (P15).
5. **Gamboan rantamaisema (1):** vanha ydin ja Santa Marian luoto samalla näkymällä (P11; P6), ei uintisuositus.

Tähdet ovat toimituksellinen suositus, eivät lähteen ranking.

### Hyvä tietää (4)

1. **Tasanteet:** kaupungin maasto vaihtuu korkeampien tasanteiden ja laaksojen välillä (P1 Geography). Reittiä suunnitellessa varaudu nousuihin.
2. **Pimeällä:** huolehdi kuljetuksesta ja vältä yksin liikkumista pimeässä; UM:n käytännön varovaisuusohje (P18).
3. **Torit:** pidä tarpeettomat arvoesineet poissa näkyvistä ja mukana vain tarvittava; käytännön neuvo, ei rikostarinan sisältöä (P18).
4. **Ranta:** Gamboaa ei esitetä uimapaikkana; muutenkin paikalliset olot ja ohjeet tarkistetaan (P15).

**Turvallisuus:** UM:n Kap Verde -sivun 31.7.2026 taso on ”Noudata tavanomaista varovaisuutta”. Ei yleistä matkustuskieltoa tai rajoituksen keksimistä Praiaan. Pelaajalle asialliset käytännön huomiot yllä, ei nykypolitiikkaa tai rikostapauksia.

## 5. Kohdekartta: viisi erillistä paikkaa

**Perusteltu 1–5-kohteen poikkeus:** Praia on pieni pääkaupunkikohde ja historiallinen Plateau-ydin erittäin kompakti. Valittiin viisi erillistä paikkaa historiallisen keskustan ja sen lahden ympäriltä. Kuudetta ei lisätty kaupunginosan/virheellisen satamapisteen perusteella eikä suojattuna modernina monumenttina. Rannat jäävät oppaaseen; niiden tarkat Wv-pisteet eivät korvaa ohjeen WP/WD-koordinointia. Tämä kohdejoukko on A:n tekstisuunnitelma, **kuvien CPV-oikeusportti vielä B:ssä**.

| # | Nimi täsmälleen | Tyyppi | lat | lon | Lähde ja merkitys | Aika |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Praça Alexandre Albuquerque -aukio | aukio | 14.91770 | -23.50910 | P3:n aukion oma koordinaatti; ei koko Plateau-piste | vanha aukio, 1800-luvun kehitys |
| 2 | Jaime Motan entinen kasarmi | rakennus | 14.91620 | -23.50880 | P4:n rakennuskoordinaatti; WD4:n epätarkempaa poikkeavaa pistettä ei käytetty | 1800-luku, useita vaiheita |
| 3 | Praian etnografinen museo | rakennus | 14.92090 | -23.50720 | WD2 P625, P7:n infolaatikko sama; WP-header poikkeaa hieman | 1800-luvun talo, myöhempi museo |
| 4 | Maria Pian majakka | rakennus | 14.90042 | -23.50906 | P5:n 14.900417/−23.509056, lähteen tarkkuudesta pyöristetty 5 desimaaliin | 1800-luvun loppu |
| 5 | Santa Marian luoto | luonto | 14.90778 | -23.50750 | WD3 P625; WP:n luotokoordinaatti on saman luodon hieman eri piste | tuliperäinen luoto, 1800-luvun käyttö |

**Rajaus:** pohjoinen 14.92360, etelä 14.89772, länsi −23.51194, itä −23.50436, johdettu paikkojen minimi-/maksimikoordinaateista noin 300 metrin marginaalilla. Desimaaliformaatti ei lisää alkuperäisen lähdepisteen mittaustarkkuutta. Etnografisen museon WD-pisteen precision on 0.001 astetta, joten se on kohdetta edustava sijainti eikä oven senttimetrimittaus.

Aukio ja kasarmi ovat melko lähellä, mutta erillisiä paikkoja ja eri juttuaiheita. Palatsia tai kirkkoa ei lisätty saman aukion ympärille määrän kasvattamiseksi. Majakkaa ja Ponta Temerosa -niemeä ei pisteytetty erikseen samaan paikkaan.

**Esittelyehdotus:** Praian vanha keskusta nousee lahden yläpuolelle. Aukio, entinen kasarmi ja museo kuuluvat kaupunkikerroksiin, kun taas luoto ja majakkaniemi kertovat sataman reunasta. (P2–P7.)

### 1 — Praça Alexandre Albuquerque -aukio

P3 koko kohdekuvaus; P2 Cityscape. Kuvissa ei rintakuvia/modernia oikeustaloa pääteoksena.

1. Praian historiallinen keskusaukio Plateaun lounaisosassa.
2. Aukion aikaisempi nimi oli Praça do Pelourinho.
3. Nykyinen nimi liittyy 1800-luvun lopun nimenvaihtoon ja siirtomaakuvernöörin nimeen; ei henkilön sankarikuvausta.
4. Aukion keskellä on puistomainen julkinen tila.
5. Reunoilla on eri-ikäisiä julkisia rakennuksia ja kaupunkitaloja.
6. Aukio liittyy Rua Serpa Pinton ja muiden keskustakatujen verkkoon.
7. Siellä olevat 1900-luvun pronssirintakuvat ovat myöhempiä; ne eivät ole automaattisesti vapaita vanhan aukion iän vuoksi.
8. **1873:** aukio oli jo olemassa vanhemmalla nimellä; nykyisiä rintakuvia tai aukion kaikkia nykyisiä rakennuksia ei sijoiteta matkavuoteen.

### 2 — Jaime Motan entinen kasarmi

P4 johdanto ja rakennusvaiheet; P2 Landmarks. Ei tarkkoja rakennusvuosia leipätekstiin.

1. Historiallinen kasarmirakennus Plateaun eteläpäässä.
2. Se sijaitsee Avenida Andrade Corvon eteläpään yhteydessä.
3. Lähellä on myöhempi presidentinpalatsi; tätä ei sekoiteta samaan rakennukseen.
4. Ensimmäinen kasarmivaihe on 1800-luvun alkupuolelta.
5. Nykyiseen rakennuskokonaisuuteen kuuluu uusmanueliinista tyyliä ja myöhempiä laajennuksia.
6. Rakennusta muutettiin 1800-luvun lopulla ja 1900-luvun alussa; kaikki julkisivun yksityiskohdat eivät ole ensimmäistä vaihetta.
7. Nykynimi tuli myöhemmin; ei militantin kuolemaan/konfliktiin perustuvaa nimitarinaa pelaajalle.
8. **1873:** kasarmin ensimmäinen vaihe oli jo olemassa. Ei väitetä nykyistä nimeä, tankkia tai kaikkia myöhempiä osia matkavuoden näkymäksi.

Vanha artikkeli kuvaa restaurointi-/museo-/ministeriöhanketta tulevana; sitä ei muuteta lupaukseksi nykyisestä museokäynnistä. Kuvan nykyiset laitteet/mahdolliset suojatut lisäykset B tarkistaa.

### 3 — Praian etnografinen museo

P7, P8 kokoelmien muodostaminen / Saber Mais, P15 Museums and culture; koordinaatti WD2.

1. Etnografinen museo vanhassa Plateau-ytimessä, Rua 5 de Julholla.
2. Se toimii 1800-luvun rakennuksessa.
3. Museon synty liittyi myöhäisen 1900-luvun kulttuuriperintöhankkeisiin.
4. Kokoelmia kerättiin eri Kap Verden saarilta; museo ei edusta yksin pääkaupungin esineistöä.
5. Näyttely käsittelee arjen taitoja, kalastusta ja muita perinteisiä elinkeinoja.
6. Kudonta, korinpunonta ja keramiikka kuuluvat kokoelmien käsityöaiheisiin.
7. Myös kertomuksia, arvoituksia ja muita suullisen perinteen tallenteita on sisällytetty aineistoon.
8. **1873:** rakennuksen tarkka vaihe suhteessa matkavuoteen jäi vahvistamatta. Museo ja nykyiset näyttelyt eivät vielä olleet olemassa. Ei tunnetun vanhan esineen ikää koko talon oikeustodisteeksi.

Objekti-/julkisivukuvan oikeudet B:n CPV-portin kautta. Nykynäyttelyn esinettä ei nimetä väärin eikä luvata aina nähtäväksi.

### 4 — Maria Pian majakka

P5 johdanto/infolaatikko; P12 Ponta Temerosa.

1. Merenkulun navigointiin käytettävä majakka.
2. Sijaitsee Ponta Temerosa -niemellä Praian lahden sisääntulossa.
3. Niemi kuuluu Santiagon eteläiseen rannikkoon.
4. Rakennus on 1800-luvun loppupuolelta.
5. Nimi tulee Maria Piasta, tuolloisesta Portugalin kuningattaresta.
6. Muurattu torni on kahdeksankulmainen ja valkoinen.
7. Torniin liittyy matalampi majakanvartijan rakennus ja lanterni/parveke.
8. **1873:** nykyistä majakkaa ei vielä ollut; niemi ja lahti olivat olemassa. Ei romanttista isoisän majakkakäyntiä.

Mitat, kantama ja nykyisen valon tekniikka pois. B varmistaa rakennuksen/kuvan oikeudet; vanha rakentamisaika ei yksin riitä.

### 5 — Santa Marian luoto

P6, P10 lahden maantiede; koordinaatti WD3.

1. Pieni tuliperäinen luoto Santiagon rannan edustalla.
2. Sijaitsee Praian lahden suulla Gamboan rannan vastapäätä.
3. Vanha englanninkielinen nimi on Quail Island.
4. Luodolle rakennettiin tullitalo ja varastoja 1800-luvun puolivälissä.
5. Rakennuksia käytettiin karanteeniin, joka myöhemmin siirrettiin Ponta Temerosaan.
6. Luodon vanhoja rakennusjäännöksiä ei sekoiteta moderniin hotellihankkeeseen.
7. Artikkelin modernin sillan/hotellin rakennussuunnitelma on vanha ja vaatii nykytilan päivitystä; A ei lupaa vierailua tai valmistumista.
8. **1873:** luoto ja aiemmat tullin/varastoinnin rakennukset olivat jo olemassa. Karanteenitoiminnan tarkkaa tilaa juuri matkavuonna ei vahvistettu.

Luontokohde tekstinä; kuva ei nosta hotellia, kasinoa tai siltaa pääteokseksi. Ei nykyistä ”asumaton”-statusta varmana vanhan lähteen perusteella uuden rakentamisen jälkeen. Ei pinta-alaa, korkeutta tai varastomääriä.

## 6. Viisi kysymysaihetta ja kolme tietoa

| Taso | Kysymysaihe | Oikea vastaus/ajatus | Lähde |
| --- | --- | --- | --- |
| 1 | Minkä maan pääkaupunki Praia on? | Kap Verden | P1; WD1 P1376 |
| 1 | Mitä portugalin Praia tarkoittaa? | Rantaa | P1 johdanto; P15 |
| 2 | Millaisessa paikassa vanha Plateau-keskusta on? | Tasanteella lahden yläpuolella | P2 |
| 2 | Mihin tarkoitukseen Maria Pian majakkaa käytetään? | Merenkulun suunnistamiseen | P5 |
| 3 | Mikä on tyypillistä paikalliselle tabanka-laululle? | Laulajan säkeeseen vastataan yhdessä | P14 As general music |

Oikea ei ole toisen pelikaupungin nimi; väärät samanmittaisia. Ei vuosi-, korkeus- tai asukaslukukysymystä. Minitehtävän Darwin-simpukka-asia jää erilliseksi.

Kolme tiedot-aihetta ilman isoisää:

1. Praian vanha keskus on korkealla tasanteella, mutta nykyinen kaupunki jatkuu myös laaksoihin ja muille tasanteille (P1 Geography).
2. Museon arkiset välineet ja suullisen perinteen tallenteet kertovat useiden saarten elämästä, eivät vain pääkaupungista (P8).
3. Praian nykyisen sataman vieressä on luoto, jolla oli aiemmin tullivarastoja ja karanteenikäyttöä (P6; P10).

## 7. Kuvatarpeet vaiheelle B

**CPV-oikeusportti auki:** allakaan ei ole hyväksyttyjä kuvatiedostoja. B:n alustavasti esille nostamat panorama-/PD-luvan ja maksun rajat on varmistettava alkuperäislähteestä. Maksulliseen käyttöön ei ole lupaa. Kuvan CC-merkintä ei yksin takaa kuvattavan teoksen oikeutta. Jos pääteokselle ei löydy ilmaista kelvollista oikeusketjua, se jätetään pois tai aihekuvaa muutetaan asianmukaisesti; raporttiin syy.

| Kohta | Aihe/hakusanat tai tunnettu Commons-identiteetti | Mitä varmistetaan |
| --- | --- | --- |
| Kansi 1 | Praia Plateau panorama / old town rooftops | Laaja kaupunkinäkymä; ei suojattua yksittäistä arkkitehtuuri-/veistospääteosta. |
| Kansi 2 | Praia Gamboa bay panorama | Laaja luonnonlahti ja vanha ydin ympäristössään; ei väärää satamakoordinaattia kuvatekstiin. |
| Kansi 3 | Ponta Temerosa / Dona Maria Pia Lighthouse panorama | Majakka ympäristössä vain jos oikeusportti sallii; vaihtoehtona luonnollinen niemi/lahti. |
| K1 | Plateau Praia street grid | Katutila/vanha kaupunkikuva, ei modernin Diogo Gomes -veistoksen pääkuva. |
| K2 | Museu Etnográfico Praia historical daily object | Esineen identiteetti ja ikä/tekijä/oikeusketju; ei kansanperinteen automaattinen PD. |
| K3 | Tabanka Praia conch drum / distant procession | Oikea perinne; lähikasvot, suojatut kansantaideteokset ja nykykappaleet pois. Instrumentti funktionaalisena esineenäkin tarkistetaan. |
| K4 | Mercado Sucupira Praia / Mercado Municipal Praia | Oikea toritila, ei väärä Brasilia; ihmiskasvot eivät luettavia. |
| H1 | Praia harbour historical map / natural bay | PD-vedoksenkin CPV-käyttöportti ja kuvasivun tekijä/lisenssi; publisherin omat karttanumerot vain ohjeen poikkeuksella. |
| H2 | Ilhéu de Santa Maria old buildings | Vanha tullivarastojen paikkakuva tai luontoluoto, ei hotelli/kasino/silta pääteoksena. |
| H3 | Santiago Praia geology shell limestone basalt | Oikea simpukkainen kalkkikerros/luontokivi. Muun maan esimerkkikuva ei kuvatekstissä Praian kallio. |
| H4 | Farol de Dona Maria Pia tower | Eri kuva kuin kansi/kohde; oikeudet ratkaistava, ei linssiselitettä kuvasta johon optiikka ei kuulu. |
| Matkailijalle | Praia Plateau street vertical / natural headland vertical | Tuore maltillinen pysty, w/h 0,60–0,85. Vanhan teoksen oikeus epäselvä -> luontopaikka. |
| Opas 1 | Praia street transport | Tuore kulkuneuvo-/katutilakuva, ei nykyisen terminaalin suojattua arkkitehtuuria pääaiheeksi. |
| Opas 2 | Plateau streets / everyday heritage objects | Oikeusketju varmistettu; ei väärän talon selite. |
| Opas 3 | Praia Gamboa natural bay / coast | Tuore luonnonranta; ei uintilupausta tai uuden hotellin pääkuvaa. |
| Opas 4 | Cachupa / corn beans Cape Verde | Oikea ruoka, ei modernia pakkausta/mainosta tai väärin nimettyä riisiruokaa. |
| Opas 5 | Sää | Voi kuvaton; sääluvut eivät tule kuvasta. |
| Aukion kohdejuttu | Praça Alexandre Albuquerque general square | Pronssirintakuvat/moderni oikeustalo eivät pääteoksia; aukio identifioitu. |
| Kasarmin kohdejuttu | Quartel Jaime Mota historic exterior | Ei tankkia tai modernia suojattua lisäystä pääaiheeksi; talon oikeudet B:ssä. |
| Museon kohdejuttu | Museu Etnográfico (Praia) | Ei väärää museota tai nykyteosta; ikä/oikeusketju erikseen. |
| Majakan kohdejuttu | Farol D. Maria Pia | Eri tiedosto kuin muut; B:n CPV-portti. |
| Luodon kohdejuttu | Ilhéu de Santa Maria | Luontoluoto, moderni hotellityömaa/silta ei pääteos; nykytila tarvittaessa tunnistettu. |
| Valokuva | Praia historical panorama / map / 1800s | Enintään vuodelta 1900, vähintään 1200 px ja oikeusketju; ei arkistoleimaa tai vesileimaa. Jos ei löydy, erillinen nykyinen luontolahti/yleisnäkymä eikä ennen–nyt-paria. |

Sama tiedosto vain kerran, paitsi ohjeen valokuva/ennen–nyt-poikkeus. Aihetoisto perustellaan: majakka on sekä historiateksti että paikkajuttu, mutta eri näkökulma ja eri kuva tarvitaan. Modernin teoksen poisjättöä ei peitetä näyttämällä väärää kohdetta. Tässä A:ssa ei tehty Commons-hakuja, ladattu kuvaehdokkaita tai katsottu hyväksyttyjä esikatseluja.

## 8. Ristiriidat ja epävarmuudet

1. **Satamapiste:** P10:n koordinaatti on täsmälleen P2:n Plateau-piste maalla. Praia Negra myös ohjautuu satama-artikkeliin. Ei hyväksytä nähtävyys-/rannikkopisteeksi; tekstin oikeat lahden maantiedefaktat erotetaan huonosta pisteestä.
2. **Raatihuone:** Praia City Hall -ohjaus johtaa Praian kunta-artikkeliin ja koko kunnan pisteeseen. Sitä ei käytetty raatihuoneen koordinaattina eikä kuudennen kohteen täytteenä.
3. **Museopiste:** P7:n header ja infolaatikko antavat hieman eri latitudit. WD2 P625 ja infolaatikko ovat 14.9209/−23.5072; valittu se. WD precision 0.001 astetta, joten ilmoitettu kohdesijainti ei tarkka ovi. Ero ei vaadi kuvitteellista uutta museota.
4. **Kasarmipiste:** WD4:n P625 on epätarkka ja hieman eri paikassa kuin rakennuksen Wikipedia-piste. Valittiin artikkelin nimenomainen rakennuskoordinaatti; ei laskettua keskiarvoa.
5. **Luotopiste:** WD3 ja Wikipedia antavat saman pienen luodon eri kohdepisteet. Käytetään WD3:ta, eikä pistettä nimetä sillan sisäänkäynniksi tai tietyn rakennuksen koordinaatiksi.
6. **Quebra Canela:** P12:n infolaatikko käyttää väärää nimeä Achadinha, mutta pääteksti on Quebra Canelan kaupunginosasta. WD-pistekin on kaupunginosan laaja piste. Wv antaa erillisen rantapisteen; alkuperäinen karttavaatimus WP/WD pysyy, joten rantaa ei lisätty arvaten.
7. **Perustaminen:** P1 kertoo ensimmäisestä Praia de Santa Maria -maininnasta 1600-luvun alussa, P2 puhuu 1500-luvun alkuasutuksesta ja P9 satamakäynnistä 1500-luvulla. Ensimmäinen maininta, pysyvä asutus ja hallinnollinen asema eivät ole sama perustamispäivä. Varhaismoderni asutus / 1500–1600-lukujen kehitys, ei yksi tarkka vuosi.
8. **UNESCO-tekstin ilmeinen ajoitusongelma:** P9:ssa on Alcatrazin kehitystä koskeva 1400-luvun varhaisen vaiheen ilmaus, joka ei sovi muiden lähteiden Santiagon asuttamiskronologiaan. Sitä ei toisteta. Kohteen kuvaus ei tee Praiaa maailmanperintöluetteloon merkityksi kaupungiksi.
9. **WD inception:** WD1 P571 viittaa Praian 1800-luvun kaupunkistatukseen, ei ensimmäisen kylän syntyyn. Ei ”Praia perustettiin vuonna 1858” -kopiointia.
10. **Väestö ja kunta:** 141 219 koskee kontekstin Praian kaupunkia vuonna 2021. Kuntaluvut ja opassivun vanhemmat arviot ovat muuta laajuutta/vuotta; pelaajalle noin 140 000 ja nimetty kaupunki. Ei tarkkaa populaatiota ilman riippumatonta vahvistusta.
11. **Satamaranking:** kontekstin tärkein-sana ja P10:n rahtitilaston toiseksi vilkkain eivät ole sama mittari. Superlatiivi pois.
12. **Sää:** P1:n Climate-leipäteksti sisältää eri vuosisateen kuin valmis normaalitaulukko. Kaikki ilmastoluvut vain saa.json:sta, 1991–2020, revisio 1377102448. Ei vanhaa noin 210 mm-riviä tai aina-hyvää-säätä.
13. **Nykyiset rakennusvaiheet:** kasarmi laajeni, kirkko/palatsi ja aukion veistokset ovat eri vaiheista. Pelkkä paikan vanhuus ei ajoita kaikkia kuvassa näkyviä teoksia. CPV:n panorama-/PD-portti avoinna B:ssä.
14. **Luodon nykytila:** vanhat hotelli-/kasinosuunnitelmat ja sillan rakennustieto ovat päivitystä vaativia. Ei asumatonta luotoa tai valmistunutta hotellivierailua varmana nykyoppaan tietona. Luodon luonnollinen muoto ja historiallinen käyttö voidaan kuvata.
15. **Darwin:** P13 on hänen aikansa havainto ja tulkinta, ei nykyinen geologinen mittaus tai säälähde. Hänen värillisiä/kolonialistisia asukaskuvauksiaan ei toisteta; esiintyviä tarkkoja vuosia tai korkeuksia ei kopioida numerofaktoiksi ilman riippumatonta tukea.
16. **Museon keruuaineisto:** kokoelman hankinta-aika ei ole esineen valmistusvuosi tai oikeuden päättymispäivä. Vanha museotalo ei vapauta uutta näyttelyteosta eikä päinvastoin.
17. **Tabanka:** alkuperä ja tarkat historialliset kiellot tarvitsevat tarkemmat lähteet; tässä musiikillinen laulu-vastaus, soittimet ja nimetty paikallisuus. Kansanperinne ei automaattisesti vapaa CPV-lain mukaan.
18. **Aukiolo/pääsy:** vanha kasarmin museo-/ministeriösuunnitelma ja opassivun museotiedot eivät vahvista nykyistä sisäänpääsyä. Ei hintoja, aukioloa tai maksettujen lupien oletusta.

## 9. Poisjätöt ja toimitukselliset rajat

- Maalehti puuttuu kontekstista, mutta maan perustietojen saarimäärä, valtion itsenäistyminen, morna, kielten esittely ja rahalähetykset eivät uusia Praian nostoja. Tabanka rajataan Praian nimettyihin kaupunginosiin.
- Cidade Velha on eri paikka: sen UNESCO-statusta, tuhoutunutta katedraalia ja omia nähtävyyksiä ei viedä Praian kartalle tai historiaa nimetä Praian omaksi.
- Diogo Gomes -monumentti, Cruz do Papa, aukion pronssirintakuvat, moderni oikeustalo, uusi terminaali, hotellihanke ja modernit kulttuurirakennukset: ei suojatuiksi kuvapääteoksiksi tai karttakohteiksi. Kuvausmaan ja teostyypin oikeusketju B:ssä.
- Presidentinpalatsia ei lisätty määrän vuoksi kasarmin viereen; sen eri-ikäinen rakennushistoria ja nykyinen poliittinen käyttö eivät ole tarpeen tähän karttaan. Kirkko jäi aukion taustakontekstiksi, ei erilliseksi teos-/numerokohteeksi.
- Niemeä ja siinä seisovaa majakkaa ei tehdä kahdeksi lähes samaksi pisteeksi; luonnonrannoille ei keksitty WP/WD-paikkatietoa.
- Nykyhallitsijat, vaalit, puolueet, levottomuudet ja rikostapaukset pois. Vanha siirtomaa-/satamahistoria neutraalisti, ei merirosvo- tai valloittajasankarikehystä.
- Darwinin matkakuvauksen asukkaiden halventava/eksotisoiva kieli pois. Geologinen havainto käsitellään historian kautta, ilman hänen tekemisiään isoisän tekemisiksi vaihtamista.
- Kalenteri, torihinnat, lento-/lautta-ajat, metrimäärät ja rahakurssit pois. Ruokaoppaan yleinen maatausta nimetään siksi, eikä toisen saaren annosta väitetä Praian omaksi.
- **RAPORTTI.md:hen:** viiden kohteen pieni-kaupunki-/kompakti-ydin-perustelu, satama-/kunta-/rantapisteiden hylkäykset, poikkeavat museokoordinaatit, caboverde-info-robots-kielto, vanhan museodomainin toimimattomuus ja kuvatoimittajan lopullinen CPV-oikeusportti. Tekstifaktat eivät tarkoita kuvien tai lopullisen sisalto.json:n hyväksyntää.
