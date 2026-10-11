# Bissau — faktapohja, vaihe A

`bissau`, `GNB`, `e04`; koottu 11.10.2026. Konteksti ja valmis saa.json luettu. Ohjeet samat kuin muissa e04-A:ssa: AGENTS.md, CODEX.md, PILVIOHJE 3, 4, 7, 13 ja LISÄSÄÄNTÖ, lehtityöresepti ja Nairobi-mallin rakenne. Ei gittoimia, Commons-hakuja tai muistista otettuja faktoja. Tämä on tekstin ja paikkojen lähdeaineisto; kuvat, niiden oikeudet ja lopullinen sisalto.json eivät ole hyväksyttyjä.

Omistajan hyväksymä kanavapoikkeus: robots-sallitut tavalliset Wikipedia-/Wikivoyage-sivut estettyjen API-polkujen sijasta. Wikidata EntityData sallittu. Kaikki omat pyynnöt ja uudelleenohjaukset tarkistettiin `sallittu_haku.py`:llä. Tarkat luvut/vuodet vain kahden riippumattoman lähteen tuella; muuten vuosisata, pyöristys tai pois. Koordinaatti- ja lähdeasiakirjametadata säilyvät jäljitettävinä.

**Oikeusportit erotetaan:** (1) valokuvan PD/CC-lisenssi ja kuvaajan tiedot, (2) kuvatun teoksen oikeudet ja kaupallinen FOP sekä (3) mahdollinen paikallinen julkisen omistuksen käyttöehto/maksu ja NC-rajoitus. Vanhan rakennuspaikan ikä ei ole kaikkien nykyosien tai esineiden PD-todiste. Maksullista oikeutta ei ole hyväksytty. B tarkistaa GNB:n todellisen soveltuvan oikeusketjun; tässä ei päätellä maksua naapurimaan laista eikä sen puuttumista Commons-merkinnästä.

## 0. Luetut lähteet ja 1873-kehys

Hakupäivä kaikissa 11.10.2026. Alkuperäiset sivut/EntityData ja tekstipoiminnat ovat NASilla: `/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/paakaupungit-codex/sessio-72-20261011/valiaikainen/bissau-A/`. Verkkoloki ylemmän valiaikainen-hakemiston `sallitut-haut.jsonl`.

| Tunnus | Otsikko, kieli ja luetut osiot |
| --- | --- |
| S1 | [Bissau](https://en.wikipedia.org/wiki/Bissau), en: johdanto, Etymology, History, Geography, Transport ja Culture. Climate vain ristiriidan vertailuun; nykyiset poliittiset tapahtumat pois. |
| S2 | [Fortaleza de São José da Amura](https://en.wikipedia.org/wiki/Fortaleza_de_S%C3%A3o_Jos%C3%A9_da_Amura), en: History, Current fortress, Features. Nykyiset hautamuistomerkit ja poliittinen/taisteluhistoria eivät nostojen pääaiheiksi. |
| S3 | [Porto de Bissau](https://pt.wikipedia.org/wiki/Porto_de_Bissau), pt: johdanto, Descrição, História. Eri laiturivaiheet, ei vanhoja kapasiteetti-/ruoppaus-/haaksirikkolukuja tai tulevia investointeja. |
| S4 | [Geba River](https://en.wikipedia.org/wiki/Geba_River), en: Geography / Route / Watershed ja Economy. Jokisuu on laajempi kokonaisuus, ei kaupungin pallo-piste. |
| S5 | [Bissau, Wikivoyage](https://en.wikivoyage.org/wiki/Bissau), en: Get in, Get around, See, Buy, Eat ja Go next. Hinnat, aikataulut, sotilaiden kanssa neuvottelu ja vanhat museo-osoitteet pois. |
| S6 | [Bissau](https://pt.wikipedia.org/wiki/Bissau), pt: Comércio, Porto e serviço de balsas, patrimônio/cultura. Vanhat kauppatilastot, nykyinen politiikka ja väkivallan yksityiskohdat pois. |
| S7 | [National Ethnographic Museum (Guinea-Bissau)](https://en.wikipedia.org/wiki/National_Ethnographic_Museum_(Guinea-Bissau)), en: koko lyhyt artikkeli; vanha kirjasto-/ranking-luku ei käyttöön. |
| S8 | [Museu Etnográfico Nacional da Guiné-Bissau](https://pt.wikipedia.org/wiki/Museu_Etnogr%C3%A1fico_Nacional_da_Guin%C3%A9-Bissau), pt: museon historia, tilojen siirto ja näyttelyn/koevedosten tausta. Vanhan Ajuda-kampuksen koordinaattia ei esitetä uuden museopaikan osoitteena. |
| S9 | [Camões: Guiné-Bissau — Exposição e reabertura do Museu Etnográfico Nacional](https://www.instituto-camoes.pt/sobre/comunicacao/noticias/18584-exposicao-e-reabertura-do-museu-etnografico-nacional-bissau), pt: virallinen näyttelyn/museon uudelleenavauksen tiedote. Ensisijainen täydentävä lähde koevedosten digitointiin ja jäljelle jääneisiin/uusiin kokoelmiin. Alkuperäinen HTML säilytetty; tekstipoiminta ohittaa sivun skriptien merkistöpoikkeamat ilman varsinaisen tekstin korvausmerkkejä. |
| S10 | [Bastion](https://en.wikipedia.org/wiki/Bastion), en: johdanto ja Characteristics. Vain Amuran lähteistetyn bastionirakenteen yleinen käsitteellinen tausta. Ei geneeristä rakennusmallia väitteenä kaikista nykyosista. |
| S11 | [Custom house](https://en.wikipedia.org/wiki/Custom_house), en: johdanto ja tehtävä. Yleinen käsitetausta tulliaukion nimelle, ei Bissaun nykyisen tullin toimintalupausta. |
| S12 | [Guinea-Bissauan cuisine](https://en.wikipedia.org/wiki/Guinea-Bissauan_cuisine), en: johdanto ja Dishes. Artikkelin monet yksittäiset ruokalajit ovat niukasti viitteistettyjä; käytetään lähinnä riisi-/kala-/kastiketaustaa, ei reseptikertomuksia tai terveysväitteitä. |
| S13 | [Osvaldo Vieira International Airport](https://en.wikipedia.org/wiki/Osvaldo_Vieira_International_Airport), en: johdanto ja IATA. Ei lentoyhtiö-/aikataululupausta. |
| S14 | [FCDO: Guinea-Bissau travel advice](https://www.gov.uk/foreign-travel-advice/guinea-bissau), en: Warnings and insurance, current at 11 October 2026, updated 10 December 2025; [Safety and security](https://www.gov.uk/foreign-travel-advice/guinea-bissau/safety-and-security): liikkuminen, raha, herkät/rajoitetut paikat. Ei politiikkaa, rikostapauksia, lääkintäohjeita tai UK-kansalaisen viisumiehtoja pelitekstiin. |
| WD1 | [Bissau Q3739 EntityData](https://www.wikidata.org/wiki/Special:EntityData/Q3739.json): sijainti, maa, estuaariyhteys ja sitelinkit. |
| WD2 | [Amura Q10283638 EntityData](https://www.wikidata.org/wiki/Special:EntityData/Q10283638.json): linnoituksen oma P625. |
| WD3 | [Port of Bissau Q20646352 EntityData](https://www.wikidata.org/wiki/Special:EntityData/Q20646352.json): has-part-ketju, jonka avulla löytyivät tarkat laituripaikat. Koko sataman epätarkkaa P625:tä ei käytetä laituripisteenä. |
| WD4 | [Ponte-cais de Pidjiguiti Q55032287 EntityData](https://www.wikidata.org/wiki/Special:EntityData/Q55032287.json): nimenomainen laituripaikka, P625, part of Port of Bissau ja karkea ikä. |
| WD5 | [Praça da Alfândega Q54901273 EntityData](https://www.wikidata.org/wiki/Special:EntityData/Q54901273.json): P31 square/garden, P138 ja P625. |
| WD6 | [Edifício da Alfândega Q54900839 EntityData](https://www.wikidata.org/wiki/Special:EntityData/Q54900839.json): aukion nimen kohdistus tullitaloon. Nykyinen talo ei erillinen kartta-/kuvapääteos. |

Myös Timeline of Bissau, Bissau Cathedral ja Pidjiguiti massacre luettiin ajoitusten ja poisjättöjen tarkistamiseksi. Ne eivät ole lupa siirtää modernin kirkon/monumentin kuvia tai väkivaltasisältöä tähän lehteen. Otsikko **Ilhéu do Rei** en-Wikipediassa ohjautui **Kap Verden** Ilhéu de Cima -artikkeliin, ei Bissaun saareen. Portugaliotsikon tarkka saarisivu puuttui. **Bandim** pt-Wikipediassa ohjautui kalalajiin Bagre marinus, ei kaupunginosaan/markkinaan. Nämä väärät aiheet/pisteet hylättiin. Bualan kuraattoriartikkelin haku aikakatkaisi; sitä ei käytetty ensisijaisesti ilman onnistunutta lukua. Camõesin tiedote saatiin ja luettiin.

**UM-puute:** `https://um.fi/matkustustiedote/-/c/GW` palautti navigaation ilman Guinea-Bissaun maakohtaista sisältöä. UM-tasoa ei arvata. Käytännön turvallisuus tarkistettiin vaihtoehtoisesta virallisesta FCDO-lähteestä (S14), poikkeama raporttiin.

### 1873-kehys

Bissau **oli olemassa** isoisän matkavuonna 1873. Portugalilaista kauppa-asemaa edelsi ja ympäröi Papel-yhteisöjen oma valtakunta; paikka ei ollut eurooppalaisten saapuessa tyhjä (S1 History). Linnoituksen ensimmäinen vaihe on 1600-luvun lopulta, mutta se tuhoutui/hylättiin, ja nykyisen linnoituksen keskeinen kehitys kuuluu 1700-luvulle ja myöhempiin muutoksiin (S2; ajoitusristiriita osiossa 8).

Vuonna 1873 linnoitus ja kaupankäynti-/satamapaikka olivat jo olemassa. Nykyisen Pidjiguitin nimellä tunnetun laiturin julkinen rakennusvaihe on vasta 1800-luvun loppupuolelta; aiemmin yritykset olivat käyttäneet myös puisiä laitureita (S3 História). Ei siis nykylaituriin sijoitettua isoisän maihinnousua. Tulliaukion nykyisestä puutarha-/aukioasusta ei ole riittävää 1873-kuvausta. Nykykatedraali, nykyiset muistomerkit, modernit museotoiminnot ja uudemmat laiturit eivät ole matkavuoden maisemaa.

Bissau ei ollut vielä nykyisessä muodossaan kansallisvaltion pääkaupunki; hallinnollinen pääkaupunkikeskittyminen tapahtui myöhemmin 1900-luvulla (S1). Ei isoisän tekemisiä, reittiä, ostoksia tai lainauksia.

## 1. Perusfaktat

- **Nimi:** Bissau. S1 esittää Papel-klaanin nimeen liittyvän etymologian, mutta kertomus tunnistetaan perimätiedoksi/teoriaksi, ei yksittäisen henkilön varmaksi elämäkerraksi.
- **Asema:** Guinea-Bissaun pääkaupunki ja tärkeä merisatama (S1; WD1).
- **Sijainti:** Geba-joen laajan estuaarin pohjoisrannalla Atlantin rannikolla (S1 Geography; S4 Route). Kaupunki ei ole sama kuin Geban uloin jokisuupiste.
- **Varhaisempi yhteiskunta:** paikalla ja sen ympärillä oli Papel-yhteisöjen valtakunta. Portugalilainen kauppa-/linnoitusvaihe ei yksin ole koko paikan synty (S1 History).
- **Synty/kehitys:** portugalilainen kauppa-asemavaihe 1600-luvun lopulla, linnoitus- ja satamakehitystä myöhemmin. Ei tarkkaa perustamisvuotta ilman riippumattomia vahvistuksia.
- **Väestö:** kontekstin **466 716 vuodelle 2025** on INE:n **Bissaun autonomisen sektorin väestöprojektio**, jonka pohjana on vanhempi laskenta. Se ei ole uusi vuoden 2025 väestölaskenta. Pelaajalle tarvittaessa **”vuodelle 2025 ennustettiin noin 470 000 asukasta Bissaun autonomiselle sektorille”**, tai väestö pois. Ei tämänhetkinen mitattu kaupungin/taajaman tarkka väkiluku. S1:n infolaatikon toisella vuodella esitetty luku ei riippumaton vahvistus tälle ennusteelle.
- **Pallo:** konteksti sellaisenaan 11.86, −15.5833.
- **Wikiavain:** `Bissau`, konteksti ja WD1.
- **Ambience-ehdotus:** `satama`, estuaarin kauppakaupungin luonteen perusteella.

## 2. Kansi ja neljä nostoaihetta

**Johdantoehdotus:** Bissau kasvoi Geban estuaarin rannalla kauppapaikkana ja linnoituskaupunkina, paikallisten Papel-yhteisöjen mailla. Nykyiseen kaupunkiin kuuluvat vanhan ytimen kadut, satamatyö, Bandimin tori ja monia kerroksia säilyttävä kulttuurielämä. (S1; S2; S3; S5; S6.)

Artikkeli-intro: pääkaupunkiasema, estuaarin pohjoisranta, paikallinen varhaishistoria, kauppa-asema, eri-ikäinen linnoitus, vanhan keskustan käyttö, nykyinen satama/torit ja myöhäisen 1900-luvun museotyö. Ei maataustan cashew-/itsenäistymis-/vallankaappaustarinaa nostoiksi.

### K1 — Kadut ovat yhä käytössä

Wiki `Bissau`; S5 See / Bissau Velho, S1 Culture ja Geography, S6 patrimonio.

1. Bissau Velho on kaupungin vanha keskusta.
2. Siellä on siirtomaa-ajan rakennuskerroksia.
3. Vanhat talot ovat myös nykyisiä asiointipaikkoja, kuten liikkeitä ja apteekkeja (S5).
4. Linnoitus ja satama kuuluvat saman historiallisen ytimen ympäristöön.
5. Nykyinen kaupunki on tätä ydintä laajempi; vanha kortteli ei ole koko Bissaun väestöalue.
6. Kaikkien talojen tai maalipintojen ikää ei päätellä kaupunginosan nimestä.

Kulma on käyttö, ei tyhjäksi tai ”aidommaksi” leimattu siirtomaa-aikalavaste. Kuvassa laaja katutila ja oma kohde, ei moderni suojattu monumentti/taideteos pääaiheeksi.

### K2 — Kauppa ei alkanut tyhjästä

Wiki `Bissau`; S1 History, S6 História (molempien viitteet huomioitava, ei numeerinen riippumaton pari).

1. Bissaun alueella oli Papel-yhteisöjen oma valtakunta ennen eurooppalaisten pysyvää kauppa-asemaa.
2. Paikalliset hallitsijat vaikuttivat ulkomaisten kauppiaiden pääsyyn ja toimintaehtoihin.
3. Portugalilaiset ja muut eurooppalaiset toimivat rannikon kaupassa.
4. Ulkomaisten monopolipyrkimysten ja paikallisen kaupankäynnin välillä oli ristiriitoja.
5. Linnoituksen olemassaolo ei tarkoittanut, että kaikki ympäröivä maa olisi ollut jo Portugalin tosiasiallisessa hallinnassa.
6. S1 sanoo paikallisen Papel-vallan säilyneen vahvana 1700-luvun linnoituskehityksen rinnalla.

Paikalliset omina toimijoinaan. Ei kruunajaisväkivaltaa, taistelun yksityiskohtia, sankarikehystä, klaanien lukumäärää tai nimitarinaa varmana historiatietona.

### K3 — Bandimin torilla arki vaihtaa omistajaa

Wiki `Bissau`; S5 See / Buy, S6 Comércio.

1. Bandim on Bissaun tärkeä markkinapaikka; ei ”Länsi-Afrikan suurin” -superlatiivia.
2. Kaupungin torikauppaan kuuluu ruokaa ja arkisia käyttötavaroita.
3. S6 mainitsee esimerkiksi hedelmät, vihannekset, viljat, vaatteet ja jalkineet kauppatarjonnassa.
4. S5 mainitsee käsinkudottuja tekstiilejä Bandimin myyntiaiheina.
5. Tori ei ole sama asia kuin vientisatama, vaikka molemmat kuuluvat kaupungin kauppaan.
6. Täsmällistä torin perustamisvuotta, nykyistä kojumäärää tai päivittäistä liikevaihtoa ei vahvistettu.

Ei turistikojun/ostotilanteen keksimistä, hintoja tai myyjän taustan tunnistamista kuvasta. Bandim-Wikipedia-otsikon kalalajiohjaus ei ole kohdelähde. Koordinaatti puuttuu, joten toritarina/kuva ei vielä tee karttakohdetta.

### K4 — Pieni koevedos säilytti kuvan muistin

Wiki `Museu Etnográfico Nacional da Guiné-Bissau`; S8, ensisijainen S9 Camõesin tiedote.

1. Museon historiassa esineitä ja valokuvia menetettiin myöhäisen 1900-luvun kriiseissä; neutraali tausta, ei konfliktiosapuolia/yksityiskohtia.
2. Valokuvien pieniä koevedoksia kuitenkin säilyi.
3. Säilyneitä vedoksia digitoitiin museon/kokoelman historian kokoamiseksi.
4. Kuvien avulla tunnistettiin kokoelmien alkuperää ja esineiden käyttöyhteyksiä.
5. Näyttelyn kokonaisuudessa yhdistettiin säilyneet esineet, uudet hankinnat ja kuvallinen tausta.
6. Talteen ottaminen ei tee valokuvista tai esineistä automaattisesti PD:tä.

Ei tarkkaa vedosmäärää tai perustamis-/uudelleenavauspäivää. Kuvaksi luvallinen menetelmän havainnollistus tai varmennettu arkistointikuva; ei museon modernien valokuvien käyttöä vailla erillistä oikeusketjua. Ei isoisän kameratarinaa.

## 3. Teemasivu: historia

Vakioaihe `historia`, nimi **”Muurilta laiturille”**.

**Johdantoehdotus:** Bissaun satamaydin rakentui useina vaiheina. Linnoituksen kulmat, myöhemmät laiturit ja tulliin viittaava aukio kertovat paikan eri tehtävistä. (S2; S3; WD5–WD6.)

### H1 — Linnoitus kasvoi vaiheina

Wiki `Fortaleza de São José da Amura`; S2 History / Current fortress; S1 History.

1. Paikan ensimmäinen linnoitusvaihe oli 1600-luvun lopulla.
2. Ensimmäinen rakennus ei ole kokonaisuudessaan sama kuin nykyinen linnoitus.
3. Varhaista linnaketta hylättiin ja se tuhoutui.
4. Nykyiseen kokonaisuuteen liittyvä kehitys tapahtui 1700-luvulla.
5. Linnoitusta korjattiin myöhemmin 1800-luvulla.
6. Myös 1900-luvulla tehtiin restaurointia; sen tekijä/osat ja oikeusketju erikseen B:lle.
7. Kontekstin 1600-luvun ajoitus sopii ensimmäiseen vaiheeseen, ei koko nykyiseen rakennukseen.

S1/S2:n täsmälliset 1700-luvun vuodet eroavat. ”1700-luvun linnoitusvaihe” on ratkaisu, ei hiljainen valinta yhdelle luvulle. Nykyiset mausoleumit, haudat ja modernit muistomerkit eivät kuvitukseen.

### H2 — Kulma katsoo muurin sivua

Wiki `Fortaleza de São José da Amura`; S2 Features, käsitetausta S10 johdanto / Characteristics.

1. Amuran perusratkaisu kuuluu bastionilinnoituksen tyyppiin.
2. Bastionit ulkonevat muurin kulmista.
3. Yleinen bastionirakenteen tehtävä on mahdollistaa viereisten muuriosien puolustaminen sivusuunnasta (S10); ei oman havaintomme syyselitys.
4. Amuran lähde luonnehtii suunnitelmaa Vauban-tyyliseksi.
5. Linnoitukseen kuului sisäisiä palvelurakennuksia, kuten komentotalo, kasarmeja ja varastoja.
6. Puolustusta täydensi paaluaita/yhteys pienempään merenrannan linnakkeeseen (S2).

Ei tykkien/aukkojen lukumäärää, muurikorkeutta tai taistelukertomusta. Ei nykyisen jokaisen rakennusosan ajoitusta perussuunnitelman perusteella. Kuvan pitää esittää juuri linnoituksen vanhaa hyväksyttävää osaa.

### H3 — Laituri tuli satamaa myöhemmin

Wiki-tausta `Porto de Bissau`; S3 História, WD4 P571.

1. Satamakauppa on vanhempi kuin nykyiset tunnetut laiturirakenteet.
2. Yritykset käyttivät aiemmin myös puisia maihinnousu-/lastauslaitureita.
3. Pidjiguitin julkinen laiturivaihe on 1800-luvun loppupuolelta.
4. Siinä yhdistettiin alkuvaiheessa puuta ja muurattua rakennetta.
5. Sen vanha nimi oli Ponte-cais Correia e Lança, S3:n mukaan.
6. Myöhemmin rakennettiin eri kohtiin uudemmat laiturit; niitä ei nimetty samaksi vanhaksi Pidjiguitiksi.
7. Vanhaa satamaa ei vuonna 1873 kuvata nykyisen betoniterminaalin kaltaiseksi.

Ei laiturin pituutta, syvyyttä, kapasiteettia, tarkkaa aloitusvuotta tai nykyisen muistomerkin kuvapääaihetta. Vanha infrastruktuuri ei yksin todista kuvaoikeutta kaikille nykyosille.

### H4 — Tulli jätti nimensä aukiolle

Paikkalähde WD5 ja WD6; yleinen käsitetausta S11.

1. Bissaussa on Praça da Alfândega -niminen aukio.
2. Alfândega tarkoittaa tullia.
3. Wikidatan nimitys kohdistuu Bissaun tullitaloon.
4. Aukio on luokiteltu myös puutarhatilaksi.
5. Se sijaitsee lähdekoordinaattien perusteella Amuran linnoituksen itäpuolella, satamaytimen yhteydessä; ei laskettua metrimäärää leipätekstiin.
6. Tullitalon yleinen tehtävä liittyy tavaroiden rajanylityksen käsittelyyn, S11:n mukaan. Bissaun nykyistä menettelyä/veroa ei päätellä siitä.
7. Aukion nimi ei tee nykyisen tullitalon arkkitehtuurista vapaata teosta.

**Lähderaja:** aukion historiaa koskeva aineisto on niukka. Ei tarkkaa perustamisvuotta, puiden ikää tai samaa puutarha-asua vuonna 1873. Aihe on nimen ja paikan tehtäväyhteyden esittely, ei modernin talon taidejuttu.

**Minitehtävä:** mihin Praça da Alfândegan nimi viittaa? Oikea: tulliin. Vaihtoehdot: tulliin / kalastajakiltaan / tähtitieteeseen / kaupungin lentokenttään. Vastaus H4:stä; visa ei kysy samaa asiaa.

## 4. Opas

### Jakso 1 — Perille ja liikkeelle

- Lentoasema **Osvaldo Vieira International Airport (OXB)** palvelee Bissauta (S13). Ei vanhojen lentoyhtiöiden tai vuorojen kopiota S5:stä.
- Kaupungissa käytetään myös jaettuja takseja (S5 Get around); kulkujärjestelyt sovitaan etukäteen, ei hinnastoa.
- Tieolot ja ajotavat voivat olla hankalia; S14 neuvoo välttämään yöllistä maantieliikennettä ja huomioimaan rankkasateiden vaikutuksen tieoloihin. Ei itse pääteltyä uuden sääennusteen riskitasoa.
- Satamasta on vesiyhteyksiä lähisaarille ja muualle (S6 Porto); lähtöpaikka, palvelu ja kulku tarkistetaan matkan ajankohtaan, ei vanhan oppaan aikataulu-/hintalupaus.

### Jakso 2 — Vanhan kaupungin kadut

- Bissau Velho on historiallista asiointiympäristöä, jossa vanhoja taloja käytetään edelleen (S5).
- Amuran linnoitus kuuluu vanhaan satamaytimeen (S2).
- FCDO:n ohje kehottaa välttämään herkkiä sotilas-/hallintokohteita; Wv:n neuvottelua sotilaiden kanssa ei toisteta. **Älä lupaa linnoituksen sisäänpääsyä tai suosittele epävirallista lupajärjestelyä.** Paikan historiallisesta merkityksestä voi kertoa ilman sisäkäyntilupausta (S14).
- Modernit muistomerkit ja niiden kuvausrajoitukset eivät tämän lehden nähtävyystavoite.

### Jakso 3 — Tori, satama ja museo

- Bandimissa myydään arkisia tuotteita ja käsityötä (S5 Buy; S6 Comércio), mutta valikoimaa/myyjiä ei luvata tietylle päivälle.
- Pidjiguitin laituri ja uudemmat satamarakenteet ovat eri vaiheista (S3).
- Kansallisen etnografisen museon historiaan kuuluu tilojen siirto: vanha Ajuda-kampuksen/Wv-koordinaatti ei varmista uuden näyttelypaikan osoitetta (S8). Tarkista nykyinen osoite ja pääsy, älä ohjaa vanhaan rakennukseen.
- Museo käsittelee esineitä ja niiden käyttöyhteyksiä; vanhat esineet eivät vapauta modernia museorakennusta tai valokuvaa (S8; S9).

### Jakso 4 — Riisi ja kastike

- Riisi yhdessä kalaa, lihaa tai kasviksia sisältävien keittojen/kastikkeiden kanssa kuuluu Bissau-Guinean ruokataustaan (S12).
- Kala, äyriäiset ja muut rannikon tuotteet ovat ruokaperinteen aineksia (S12; S5 Eat).
- Nimettyjä ruokalajeja tai tarkkoja reseptejä ei tehdä vahvoiksi Bissau-faktoiksi niukasti lähteistetystä luettelosta.
- Cashew-vientiä ei kirjoiteta uudeksi nostoaiheeksi: se on jo maan esittelyssä.
- Ei ruoan turvallisuus-/terveyslupausta, yksittäisen torikojun nimeä, hintaa tai raaka-aineen paikallisen saaliin alkuperää arvaten.

### Jakso 5 — Milloin kannattaa tulla

Valmis `paakaupungit-pilvi/e04/bissau/saa.json` luettu, ei muutettu. Pääsession alkuperäinen `tyokalu.mjs saa` -ajo hyväksytyllä lähdesivusovituksella; A ei tehnyt käsin riviä.

- Artikkeli **Bissau**, revisio **1377808681**, luettu **11.10.2026**.
- Taulukko **Climate data for Bissau (Osvaldo Vieira International Airport) 1991–2020**.
- Normaalikausi **1991–2020**, lähderivi **Source: NOAA**, `lahde.nimi` en-Wikipedia, ilmastotaulukko.
- `keskilampo` on **Daily mean °C (°F)**, ei `(ylin + alin) / 2` -korvike. `sade` on **Average precipitation mm (inches)**. Taustan vuosisade **1 532 mm**.
- Lat/lon 11.86/−15.58 ovat työkalun kaupungille tallentamat koordinaatit, eivät erikseen varmistettu lentoaseman mittauspiste.
- Kaikki ilmastoluvut vain saa.json:sta, pyöristettyinä; ei S1:n Climate-johdannon toista vuosisadetta, Wv:n säälupauksia, ennusteita tai tämän vuoden saalismääriä. Pelin sääolioon kentät ilman `tausta`a; tausta säilyy tässä. Ilmastolauseessa ei lähdemainintaa.

**Lukujen tukema kuvaus:** kevään päivän ylimmät normaalit ovat noin 35–36 astetta, kun elokuussa vastaava normaali on noin 30 astetta. Yöt pysyvät lämpiminä; alkuvuoden alin normaali noin 18–19 astetta. Sateet painottuvat kesä–lokakuuhun, erityisesti heinä–syyskuuhun. Tämä ei ole sadepäivien määrän tai matkapäivän sään lupaus.

### Parasta (5)

1. **Vanhan keskustan katutila (2 tähteä):** Bissau Velhon edelleen käytössä olevat talot ja kauppakadut (S5).
2. **Bandimin tori (2):** kaupungin paikallinen kaupankäynti (S5; S6), ei turvallisuus- tai hintalupaus.
3. **Sataman maisema (2):** Geban estuaarin ja laiturivaiheiden paikka (S3), kulku-/kuvausrajoitukset huomioiden.
4. **Museon kulttuuriperintö (1):** esineet ja kuvallisen aineiston säilyttäminen (S8; S9), nykyinen osoite/pääsy tarkistettava.
5. **Paikallinen ateria (1):** riisi ja kala-/kasvis-/lihakastikkeet maan ruokataustasta (S12).

Tähdet ovat toimituksellisia suosituksia, eivät lähderanking. Amuran sisäkäyntiä, modernia mausoleumia tai sotilaskohdetta ei mainosteta Parasta-listassa.

### Hyvä tietää (4)

1. **Kuljetus:** sovi kuljetus etukäteen ja vältä yöajoa; huomioi tieolojen vaihtelu (S14 Transport).
2. **Raha:** Guinea-Bissau on pääosin käteistalous; korttien ja automaattien toimivuutta ei luvata (S14 Money). Valuutta kontekstista XOF, ei vaihtokurssia.
3. **Rajoitetut paikat:** noudata paikallisia ohjeita ja välttele herkkiä sotilas-/hallintokohteita; ei neuvotteluvinkkiä sotilaille (S14).
4. **Nykyinen osoite:** vanha museo-/satamakuva tai opas ei kerro automaattisesti tämän päivän kulkujärjestelyä (S8; S3; käytännön neuvo).

**Turvallisuustila:** UM:sta ei löytynyt maakohtaista sisältöä. FCDO:n 11.10.2026 ajantasaiseksi merkitty sivu ei esitä koko Guinea-Bissaulle/Bissaulle yleistä matkustuskieltoa, mutta neuvoo varovaisuutta, herkkiin paikkoihin ja liikenteeseen liittyviä huomioita. Opas sanoo suoraan, että matka ja kuljetukset tulee suunnitella huolellisesti; ei ”täysin turvallinen” -väitettä tai keksittyä UM-tasoa. Nykyiset poliittiset/rikolliset tapahtumat ja terveystilastot eivät pelisisältöön.

## 5. Kohdekartta: kolme kompaktin vanhan satamaytimen paikkaa

Pääsession ohjeen mukainen **3–5-kohteen kompakti-ydin-perustelu**: Bissau ei kokonaisuutena ole pieni väestöalue, mutta vanhan sataman ja linnoituksen rajattu ydin on pieni. Valitaan kolme erillistä paikkaa, eikä määrää täytetä nykyisillä suojatuilla monumenteilla, epävarmalla museopisteellä tai väärän maan saarella. Rakennus-/teoskuvien oikeusportit B:ssä, eivät A:n iän perusteella ratkaistuja.

| # | Nimi täsmälleen | Tyyppi | lat | lon | Koordinaattilähde | Aika |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Amuran linnoitus | rakennus | 11.86027 | -15.57862 | WD2 P625 11.860274/−15.578615, sama rakennuspaikka kuin S2 | ensimmäinen 1600-luvun vaihe, nykyinen kokonaisuus 1700-luvun ja myöhempien vaiheiden |
| 2 | Pidjiguitin laituri | rakennus | 11.85618 | -15.57835 | WD4 P625, tarkka **pier in Bissau** ja part of Port of Bissau; ei tapahtuma-artikkelin/yleissataman epätarkka piste | 1800-luvun loppu, myöhemmät muutokset |
| 3 | Tulliaukio | aukio | 11.86026 | -15.57723 | WD5 Praça da Alfândega P625, aukio/puutarhatila; ei tullitalon oma piste | tarkka kehitysvuosi vahvistamatta |

**Rajaus:** pohjoinen 11.86297, etelä 11.85348, länsi −15.58138, itä −15.57447, johdettu lähdekoordinaattien minimi-/maksimiarvoista noin 300 metrin marginaalilla. Kohteet vanhassa satamaytimessä alle 12 km kaupungin pallo-pisteestä. Tulliaukio ja linnoitus ovat lähellä mutta eri paikkoja; modernia tullitaloa ei pisteytetä neljänneksi.

**Esittelyehdotus:** Bissaun vanhassa satamaytimessä linnoitus ja laiturit ovat eri aikakerroksista. Tulliaukion nimi muistuttaa tavaroiden kulkuun liittyneestä toiminnasta. (S2; S3; WD5–WD6.)

### 1 — Amuran linnoitus

S2 History / Current fortress / Features; S1 History; koordinaatti WD2.

1. Bissaun vanhan satamaytimen linnoituspaikka.
2. Ensimmäinen linnoitus rakennettiin 1600-luvun lopun kauppa-asemavaiheessa.
3. Se ei säilynyt koko nykyisen rakennuksen perusmuotona: vaihe hylättiin/tuhoutui.
4. Nykyiseen kokonaisuuteen liittyvät tärkeät rakennusvaiheet ajoittuvat 1700-luvulle.
5. S2 luonnehtii perusratkaisua Vauban-tyyliseksi bastionilinnoitukseksi.
6. Sisätiloihin kuului komentotalo, kasarmeja ja varastorakennuksia.
7. Linnoitusta korjattiin 1800-luvulla ja restauroitiin 1900-luvulla.
8. Nykyiset mausoleumit/haudat ovat eri aiheita; ei modernien muistoteosten kuvausta tämän rakennuksen iällä oikeutettuna.
9. **1873:** vanha linnoitus oli jo olemassa; kaikkia nykyisiä osia tai myöhempiä restaurointiratkaisuja ei sijoiteta matkavuoteen.

Pääteksti historiasta/paikasta, ei pääsylupausta tai nykyisen sotilaslaitoksen esittelyä. B selvittää kuvan vanhan osan, restauroinnin mahdollisen uuden teoksen ja todellisen oikeusketjun.

### 2 — Pidjiguitin laituri

S3 História / Descrição; WD4.

1. Tunnistettu laituripaikka Bissaun satamassa, erillinen tarkka P625.
2. Julkinen laiturivaihe kuuluu 1800-luvun loppupuolelle.
3. Varhaisessa rakenteessa käytettiin sekä muurausta että puuta.
4. Vanha nimi oli Ponte-cais Correia e Lança.
5. Myöhemmin Bissaun sataman muualle tuli uudempia laiturirakenteita.
6. Laituri kuuluu tavaroiden ja alusten maihin kytkeytyvään työympäristöön.
7. Nykyinen muistomerkki ei ole sama kuin laituri, eikä sen oikeutta ratkaise laiturin ikä.
8. **1873:** satamakauppaa ja aiempia puisia yrityslaitureita oli, mutta nykyisen nimellä tunnetun julkisen laiturin vaihe ei vielä ollut. Ei nykyisen laiturin käyttöä isoisän toiminnaksi.

Pidjiguitin 1900-luvun tapahtuma mainitaan korkeintaan neutraalina historian taustana, jos toimitus katsoo välttämättömäksi; ei väkivallan yksityiskohtia, kuolleiden määriä, sankarikehystä tai modernia mustan nyrkin muistomerkkiä kuvan pääaiheeksi. Tässä suunnitelmassa juttu painottuu infrastruktuurin vaiheisiin.

### 3 — Tulliaukio

WD5 square/garden/P138/P625; WD6 nimen kohdistus; S3 satamakonteksti, S11 käsitteen tehtävä.

1. Praça da Alfândega on Bissaun aukio, ei sama kuin Praça dos Heróis Nacionais.
2. Wikidata luokittelee sen myös puutarhatilaksi.
3. Nimi viittaa Bissaun tullitaloon; Alfândega tarkoittaa tullia.
4. Aukion piste on Amuran linnoituksen itäpuolella, satamaytimen lähellä, lähdekoordinaateista havaittava sijaintisuhde.
5. Aukion ja tullitalon pisteet ovat eri paikkoja.
6. Tullitalon yleinen tehtävä liittyy maahan tulevien/lähtevien tavaroiden käsittelyyn; ei nykyistä Bissaun menettelyä tai maksua koskeva väite.
7. Wikidatan laaja vuosisatamerkintä ei vahvista yksittäistä rakentamispäivää tai puutarhan kasvien ikää.
8. **1873:** tämän aukion silloista muotoa ei vahvistettu. Ei nykyinen puutarha tai moderni tullitalo matkavuoden näkymäksi.

**Jutturaja:** paikkaa koskeva historia on niukka, joten teksti nimeää varmat asiat ja sataman tehtäväyhteyden. Ei lisätä kuvitteellista siirtomaa-ajan puistopiknikkiä tai rakennuttajaa. Kuvassa aukio/avoin tila, ei modernin tullitalon suojattu arkkitehtuuri pääteoksena.

## 6. Viisi kysymysaihetta ja kolme tietoa

| Taso | Kysymysaihe | Oikea ajatus | Lähde |
| --- | --- | --- | --- |
| 1 | Minkä maan pääkaupunki Bissau on? | Guinea-Bissaun | S1; WD1 |
| 1 | Minkä joen estuaarin rannalla Bissau on? | Geban | S1; S4 |
| 2 | Mikä yhteisöjen valtakunta oli alueella ennen eurooppalaisten kauppa-asemaa? | Papel-yhteisöjen | S1 History |
| 2 | Miten pieniä valokuvavedoksia käytettiin museotyössä? | Kokoelman historian rekonstruointiin | S8; S9 |
| 3 | Miksi nykyisen Amuran muureja ei ajoiteta vain alkuperäisen kauppa-aseman vuoteen? | Linnoitus rakennettiin uudelleen eri vaiheissa | S2; S1 |

Vihje ei sano maan/joen/yhteisön nimeä tai käytä oikeaa vastausta sellaisenaan. Väärät uskottavia ja suunnilleen samanmittaisia; ei toisen pelikaupungin nimeä oikeaksi. Minitehtävän tulli-kysymys erillinen. Ei tarkkoja numero-/vuosikysymyksiä.

Kolme tiedot-aihetta ilman isoisää:

1. Bissaun satama on Geban laajan estuaarin rannalla, ei sama piste kuin joen uloin suu (S1; S4).
2. Linnoituksen ensimmäinen vaihe ja nykyisen kokonaisuuden keskeinen rakennusvaihe ovat eri aikoja (S2).
3. Museon menneisyyttä voitiin koota säilyneiden pienten valokuvavedosten avulla (S9), mutta säilyminen ei ole kuvan käyttölupa.

Viimeisen tiedon pelaajamuotoon jää kulttuuriperinnön havainto; käyttöoikeusmeta on vain kirjoittajan raja, ei tarpeeton pelaajateksti.

## 7. Kuvatarpeet B:lle

Ei hyväksyttyjä kuvia/Commons-hakuja A:ssa. GNB:n FOP/PD/mahdollinen paikallinen ehto tarkistetaan erillisenä; naapurimaan lain ehdosta ei tehdä GNB-faktaa. NC/ND/Fair use eivät kelpaa. Tekijältään alle 70 vuoden kuolema-ajan suojatut teokset eivät tämän tilauksen kohteiksi. Vanhan osan, uuden restaurointiratkaisun ja modernin muistomerkin ero tarkistetaan kuvaa vasten.

| Kohta | Aiheet/hakusanat | Rajaus |
| --- | --- | --- |
| Kansi 1 | Bissau Velho street panorama | Laaja vanhan keskustan yleiskuva; ei suojatun modernin rakennuksen/teoksen päämotiivi. |
| Kansi 2 | Bissau Geba estuary harbour panorama | Laaja luonnonvesi + kaupunkisatama, ei koko rannikon ulomman suun väärä paikka. |
| Kansi 3 | Bissau Amura old fort surroundings panorama | Vanhan hyväksyttävän osan ympäristön yleiskuva vain oikeusportin kautta; vaihtoehtona satamaytimen laaja katutila. |
| K1 | Bissau Velho used buildings street | Nykyinen katutila, ei väärän talon nimi tai iän päätteleminen maalista. |
| K2 | Bissau historic port landscape / historical trade view | Luvallinen vanha paikkakuva, ei valloittajasankarikehystä tai väärää Papel-yhteisön henkilön nimeä. |
| K3 | Mercado de Bandim Bissau | Oikea tori. Bandim-kalalaji ja muut maat eivät sama kohde; lähikasvot/mainospääaihe pois. |
| K4 | archival photographic proofs / scanning contact sheets | Menetelmän havainnollistus, oikeudet erikseen. Museon moderni kontaktivedos itsessään ei PD; selite erottaa yleisen välineen ja Bissau-tapauksen. |
| H1 | Fortaleza de São José da Amura historic walls | Vanhan vaiheen hyväksyttävä osa; ei mausoleumia tai modernia hautamuistomerkkiä. |
| H2 | Amura bastion wall corner | Oikea bastioni, ei geneerinen toisen maan linnoitus väitettynä Amuraksi. |
| H3 | Ponte-cais de Pidjiguiti harbour pier | Laituri, ei Mão de Timba -nyrkkiteos. Eri kuva kuin kohdejuttu. |
| H4 | Praça da Alfândega Bissau open square | Aukio/puutarhatila; tullitalon moderni arkkitehtuuri ei pääteos eikä ikälupaus. |
| Matkailijalle | Bissau street boat vertical | Tuore maltillinen pysty, w/h 0,60–0,85; ei pääteoksena nykyteos tai luettavat lähikasvot. |
| Opas 1 | Bissau transport street / vehicles estuary | Tuore katutila/kulkuneuvo, ei suojattu terminaali pääaiheeksi. |
| Opas 2 | Bissau Velho daily street | Eri tiedosto kuin K1/kansi; riittävä konteksti, ei sisäänpääsylupausta. |
| Opas 3 | Bandim market / generic ancient utilitarian artifact | Tori tai oikeusketjultaan varmennettu esine; ei väärää museo-osoitetta/uutta suojattua maskia automaattisena PD:nä. |
| Opas 4 | Bissau Guinean rice fish stew | Oikea ruoka, vain kuvasivun tuettu nimi; ei pakkaus-/mainoskuvaa. |
| Opas 5 | Sää | Voi kuvaton. Luvut saa.json:sta. |
| Kohde 1 | Amura historic exterior | Eri kuva kuin nostot/kansi; modernit lisäykset/oikeusketju erikseen. |
| Kohde 2 | Pidjiguiti pier separate view | Tarkka laituri, ei sataman toista uutta laituria väärällä nimellä. |
| Kohde 3 | Praça da Alfândega open space | Oikea aukio, ei Praça Che Guevara tai Heróis Nacionais; lähdepiste oma. |
| Valokuva | Bissau historical 1800s port fort photograph | PD-vedos enintään vuodelta 1900, leveys vähintään 1200 px vain jos löytyy ja oikeusketju kelpaa. Muuten eri nykyinen luonnonvesi/yleiskuva eikä ennen–nyt-paria. |

Sama tiedosto kerran paitsi valokuva/ennen–nyt-nimenomainen poikkeus. Kuvat katsotaan B/C/D:ssä, tekijä ja lisenssi sallitulta lähdesivulta, ei vesileimaa, arkistoleimaa, mainosta tai luettavia lähikasvoja. Vanhan kaupungin/linnoituksen/sataman aihetoisto perustellaan eri rooleilla. Kuvaton parempi kuin väärä teos/oikeusketju; lopullinen C–F-rakenne ei valmis ennen kuvaportteja.

## 8. Ristiriidat ja epävarmuudet

1. **Väestöprojektion laatu:** kontekstin 2025 luku on vuoden 2022 julkaisun tendenssiskenaarion projektio autonomiselle sektorille, ei uusi laskenta. Pelaajalle pyöristetty ennuste nimetyllä laajuudella tai luku pois. S1:n infolaatikon eri vuoden suurempi luku ei laskennan todiste eikä kaksi riippumatonta lähdettä.
2. **Amuran ajoitus:** konteksti/varhainen kauppa-asema on 1600-luvun lopulta, nykyinen kokonaisuus 1700-luvun vaiheista. S1 ja S2 kuvaavat täsmällisiä vuosia eri tavoin: paluu/yritys ja varsinainen uudelleenrakennus eivät sama asia. Yksi vuosi ei julkaisuluvuksi ilman vahvistusta; käytetään vaiheita/vuosisatoja.
3. **Restaurointi:** S2 nimeää 1900-luvun restauroijan Luís Benaventen, mutta hänen kuolinaikaansa tai työn täsmällistä uuden teoksen osuutta ei tässä A:ssa varmennettu. Ei kaikkien nykyisten osien PD-olettamaa. Mausoleumi on erillinen myöhempi teos.
4. **Katedraalin konteksti:** kevyt aineisto käyttää vihkimisvuotta, artikkeli erottaa rakentamisen valmistumisen ja myöhemmän vihkimisen. Nykyrakennus on 1900-luvun puolivälin nimettyjen arkkitehtien teos; jää pois kartalta/kuvapääaiheista, eikä vanhemmasta kirkosta tehdä tämän teoksen ikää.
5. **Porttipisteet:** koko Porto de Bissau- ja Pidjiguiti-tapahtumakoordinaatit ovat karkeita. WD3:n has-part-ketjusta löydetty WD4 kohdistuu nimenomaan laituriin; käytetään sitä. Uudemman Ponte-cais de Bissaun Q55032890-piste on eri kohde, ei kolmas nimi samalle laiturille.
6. **Ilhéu do Rei:** en-otsikko ohjautuu Kap Verden saareen; väärä maa/koordinaatti hylättiin. S5/S6 tukevat Bissaun lähisaaren olemassaoloa mutta eivät tässä haussa sen WP/WD-pistettä. Ei nykyistä hotellin/geonames-kuvan pistettä korvikkeeksi.
7. **Bandim:** löytyi markkinanimi lähdeteksteistä, mutta tarkka WP/WD-kohdepiste ei. Pt-otsikon kalalajiohjaus hylättiin. Tori ei kartalle arvatuin koordinaatein, mutta lähteistetty toriteksti mahdollinen.
8. **Museopaikka muuttui:** S5:n yliopistokampus-/Ajuda-piste ei vastaa S8:n kuvattua uudelleenavausta toisessa rakennuksessa Praça dos Heróis Nacionais -alueella. Museon nykyinen tarkka paikkatieto/pääsy tarkistettava; ei kartalle vanhalla pisteellä.
9. **Museokronologia:** keruun alku, laitoksen synty, avaaminen ja uudelleenavaaminen ovat eri vaiheita; S8/S9:n vuosia ei kopioida yhdeksi perustamispäiväksi. Vain karkea myöhäisen 1900-luvun vaihe leipätekstiin.
10. **Tulliaukio:** WD5 on varma paikkatunniste/koordinaatti, mutta historialliset yksityiskohdat niukkoja ja ilman ulkoisia väitelähteitä. Laajaa vuosisatamerkintää ei muuteta tarkaksi perustamisvuodeksi. Tullitalon oma historia/tyyli ei aukion kuvaoikeus.
11. **Nykyinen satama:** vanhat ruoppaus-/syvyys-/haaksirikko-/investointitiedot eivät 2026 toiminta-/turvallisuusarvio. Ei laivakokoja, liikennemääriä tai tulevia suunnitelmia.
12. **Sää:** S1:n Climate-leipäteksti käyttää toista vuosisadetta kuin valmis normaalitaulukko. Ilmastoteksti vain saa.json:sta, 1991–2020, revisio 1377808681.
13. **UM-puute:** maakohtaista GW-tiedotetta ei saatu. FCDO vaihtoehtoisena virallisena kanavana, päiväys kirjattu. Ei keksittyä UM-luokkaa tai koko maan matkustuskieltoa.
14. **Lupa ja käytäntö:** vanha Wv-neuvo ystävystyä linnoituksen sotilaiden kanssa ei turvallinen pääsylupa. FCDO neuvoo välttämään herkkiä kohteita; sisäkäyntiä ei mainosteta. Virtuaalinen paikkajuttu ja fyysinen vierailulupaus erotetaan.
15. **Modernit aineistot:** museon kontaktivedokset, veistokset, tekstiilit ja valokuvat voivat olla suojattuja. Säilyminen/digitointi tai museotilan vanhuus eivät käyttölupa. Ruoka-artikkelin nimetyt reseptit ovat niukasti viitteistettyjä; oppaaseen vain tuettu yleinen tausta.

## 9. Poisjätöt ja loppurajat

- Maan perustietojen itsenäistymis-/vallankaappaus-/cashew-vientitarinoita ja kielikuvausta ei uusita Bissaun nostoiksi. Maalehteä ei kontekstissa ole; läheisiä valmiita nostoja ei listattu.
- Nykykatedraali, nykyinen presidentinpalatsi, muistomerkit/mausoleumit, Mão de Timba ja modernit nimetyt arkkitehtuuriteokset eivät uusiin kuvapääaiheisiin/kohteisiin. Arkkitehtuurin ikä, FOP ja mahdolliset PD-maksut erillisiä portteja B:ssä.
- Pidjiguitin tapahtuman kuolleiden määrät ja väkivallan yksityiskohdat pois. Satamatyö/infrastruktuuri voidaan käsitellä ilman sankarikehystä.
- Nykypolitiikka, vaalit, sotilaalliset tapahtumat ja rikostapaukset pois. Museon aineiston menetyksen voi mainita neutraalina historiallisena taustana ilman osapuolikehystä.
- Koko Bijagósin saaristo, Casamancen lähiseutu tai Geban ulompi suu eivät kompaktin keskustakartan täytettä. Geban suun WP-piste on etäällä kaupungista; ei nimetä sitä satamakadun sijainniksi.
- Bandimin/Ilhéu do Rein pisteitä ei arvata. Museon vanhaa pistettä, Kap Verden saarta tai kalalajia ei käytetä puuttuvan kohteen korvaajana.
- Tarkat vuodet, korkeudet, laituripituudet, kauppavolyymit, ennustetut asukasluvut ja vedosmäärät ilman riippumatonta tukea pois/pyöristys. Lähde- ja paikkametadata säilyvät tarkistusjäljessä.
- RAPORTTI.md:hen kompakti kolmen paikan vanha satamaydin -perustelu, linnoituksen vaihe- ja kontekstikorjaus, väestöprojektion laajuus/ennusteluonne, väärät saaristo-/museo-/kalalajiohjaukset, aukion historian lähderaja, UM/FCDO-poikkeama sekä lopulliset kuvaratkaisut. A:n tekstifaktat eivät yksin tarkoita B–F-/sisalto.json-valmiutta.
