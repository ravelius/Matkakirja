# Bissau — D, riippumaton tarkistus keskeneräiselle luonnokselle

**OSITTAIN TARKISTETTU.** Tarkistus 11.10.2026. **Varsinaiset löydökset: VÄÄRIN 1, EPÄVARMA 2.** VÄÄRIN on vastausta paljastava vihje; EPÄVARMA-kohdat ovat lähteen ajoitus- ja sisältörajaa tarkempia väitteitä. Kolme ennestään tunnettua kohdekuvapuutetta ovat erillään tästä löydöslukumäärästä.

Kaikki 16 valittua kuvaa katsottiin itse ja niiden lähdemetadata tarkistettiin. Tarkistetussa roolituksessa ei löytynyt hylättävää kuvaa. Kaupunki ei ole valmis D/F tai toimitusvalmis: Amuran, Pidjiguitin ja Tulliaukion erilliset kohdekuvat puuttuvat. Uudet kohdekuvat ja kuvatekstit on jälkitarkistettava. #74 tai kompaktin ytimen perustelu ei tee puuttuvista kuvista hyväksyttyä nollavirheporttia.

Sisalto.jsonia ei muutettu. Kirjoitettu vain tämä raportti ja oma NAS-väliaineisto. Ei Git-operaatioita, uusia agentteja, pelimuutoksia, generointia, R2-toimia tai julkaisua. TMPDIR, Python-välimuisti, lähteet ja renderöinnit ovat `valiaikainen/bissau-D/`:ssä.

## Menetelmä ja lähteiden rajat

En ollut Bissaun A- tai C-agentti. Samat sitovat ohjeet kuin Banjulin D:ssä: AGENTS.md, CODEX.md, PILVIOHJE 4/5/7/8D/13/LISÄSÄÄNTÖ, lehtityöresepti, kaupunkilehden mitat/kuvat/toistuvat viat ja spec-mantereiden yleislinjaukset. Bissaun faktapohja, konteksti, kuvat.md, C-muistiinpanot, sisalto.json ja saa.json luettiin. Faktapohjan selostuksen sijaan alkuperäiset lähdesivut/Wikidata-tietueet luettiin itse. Kaikki 16 lopullista esikatselua avattiin; lisäksi TRAVELER/K3/H3:n alkuperäiskuvat kasvorajaa varten.

Verkko: yhteinen `sallittu_haku.py`, robots ennen uutta verkkotunnusta, tarkistetut redirectit, yhteinen 1/s-lukko ja lähdevarasto. Omistajan tavallisten robots-sallittujen Wikipedia/Commons/Wikivoyage-lähdesivujen poikkeus; ei /w/- tai API-polkuja, Commons Special:Search/FilePath-hakuja tai kuvahakuja. Näkyvät Author- ja lisenssitiedot tarkistettiin `lahdetieto.py`:n täsmänimipyynnöillä, ei arvatulla käyttäjänimen taustalla.

**SVG-sovituksen havaittu raja:** tuolloin käytössä ollut yhteinen apuri ei tunnistanut tiedostosivun ”Original file (SVG file, nominally 5,300 × 4,600 pixels)” -muotoa. H2:n lähdesivu haettiin sallitusta tavallisesta osoitteesta ja koko, näkyvä Author **Ludwig Dupas** ja lisenssitemplaatti **CC BY-SA 4.0** luettiin siitä itse. Kaikki kolme täsmäävät B:n valintaan. Oma `file50.html` ja `kuvametadata.json` tallentavat suoran nominally-poiminnan rajauksen. Pääsessio ilmoitti korjaavansa lähdesivun lukusovituksen; alkuperäisen tarkistimen sääntöä tai mittoja ei tässä muutettu eikä tämän D:n paikallista tarkistusta kutsuta myöhemmän verkkotarkistimen tulokseksi.

Oma aineisto: `/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/paakaupungit-codex/sessio-72-20261011/valiaikainen/bissau-D/`. `kuvametadata.json`: 16 valintaa, suorat metatiedot ja SVG-poiminnan merkintä. `korvaukset.json`: alla olevat täydet kenttäkorvaukset. Yhteinen verkkoloki `valiaikainen/sallitut-haut.jsonl`.

## Itse luetut lähteet

| Tunnus | Alkuperäinen lähde / osiot |
|---|---|
| S1 | [Bissau, en](https://en.wikipedia.org/wiki/Bissau): johdanto, History, Geography and climate, Transport, Culture. |
| S2 | [Fortaleza de São José da Amura](https://en.wikipedia.org/wiki/Fortaleza_de_S%C3%A3o_Jos%C3%A9_da_Amura): History, Current fortress, Features. |
| S3 | [Porto de Bissau, pt](https://pt.wikipedia.org/wiki/Porto_de_Bissau): johdanto, Descrição, História. |
| S4 | [Geba River](https://en.wikipedia.org/wiki/Geba_River): Geography/Route ja estuaarin kuvaus. |
| S5 | [Bissau, Wikivoyage](https://en.wikivoyage.org/wiki/Bissau): Get in/Get around, See/Bissau Velho, Buy/Bandim ja Go next. |
| S6 | [Bissau, pt](https://pt.wikipedia.org/wiki/Bissau): História, Comércio, Porto e serviço de balsas, kulttuuriperintö. |
| S7 | [National Ethnographic Museum (Guinea-Bissau)](https://en.wikipedia.org/wiki/National_Ethnographic_Museum_(Guinea-Bissau)): koko lyhyt artikkeli. |
| S8 | [Museu Etnográfico Nacional da Guiné-Bissau, pt](https://pt.wikipedia.org/wiki/Museu_Etnogr%C3%A1fico_Nacional_da_Guin%C3%A9-Bissau): historia ja Exposição 30 Anos de História. |
| S9 | [Camões: museon näyttely ja uudelleenavaus](https://www.instituto-camoes.pt/sobre/comunicacao/noticias/18584-exposicao-e-reabertura-do-museu-etnografico-nacional-bissau): varsinaiset näyttely-/digitointikappaleet. Alkuperäinen HTML säilytetty; näissä kappaleissa ei ole poiminnan korvausmerkkejä. |
| S10 | [Bastion](https://en.wikipedia.org/wiki/Bastion): johdanto ja Effectiveness. |
| S11 | [Custom house](https://en.wikipedia.org/wiki/Custom_house): johdanto ja tullitalon yleinen tehtävä. |
| S12 | [Guinea-Bissauan cuisine](https://en.wikipedia.org/wiki/Guinea-Bissauan_cuisine): johdanto, riisi/keitot/kastikkeet ja merenelävät. |
| S13 | [Osvaldo Vieira International Airport](https://en.wikipedia.org/wiki/Osvaldo_Vieira_International_Airport): johdanto ja IATA OXB. |
| S14 | [FCDO: Guinea-Bissau](https://www.gov.uk/foreign-travel-advice/guinea-bissau), [Safety and security](https://www.gov.uk/foreign-travel-advice/guinea-bissau/safety-and-security): Money, Road conditions, herkät paikat. Still current at 11 October 2026, updated 10 December 2025. |
| WD1–WD6 | [Bissau Q3739](https://www.wikidata.org/wiki/Special:EntityData/Q3739.json), [Amura Q10283638](https://www.wikidata.org/wiki/Special:EntityData/Q10283638.json), [satama Q20646352](https://www.wikidata.org/wiki/Special:EntityData/Q20646352.json), [Pidjiguitin laituri Q55032287](https://www.wikidata.org/wiki/Special:EntityData/Q55032287.json), [Tulliaukio Q54901273](https://www.wikidata.org/wiki/Special:EntityData/Q54901273.json), [tullitalo Q54900839](https://www.wikidata.org/wiki/Special:EntityData/Q54900839.json). P625, P31, P138 ja kohteen/yleissataman erottelu. |
| O1 | [Commonsin Guinea-Bissaun oikeussivu](https://commons.wikimedia.org/wiki/Commons:Copyright_rules_by_territory/Guinea-Bissau): nykylaista esitetty lähderaja, art. 152 ja FOP. |
| O2 | [WIPOn GW-maaprofiili](https://www.wipo.int/wipolex/en/members/profile/GW), [lakikortti 8448](https://www.wipo.int/wipolex/en/legislation/details/8448): luettelon nykyinen Latest Version in WIPO Lex on vanha koodi. Koko lakitekstiä ei luettu. |

INE:n alkuperäinen väestöprojektio haettiin robots-sallitusta lähdeosoitteesta. Luettu metodologia/alkupopulaatio s. 11, SAB:n nimitys s. 12 ja alueprojektioiden taulukko 14 s. 87–88; s. 88 renderöitiin ja katsottiin kokonaisena. PDF:n s. 6 ilmoittaa INE – Novembro 2022, s. 4 © 2023; kumpaakaan ei muuteta uuden vuoden 2025 laskennan päivämääräksi.

:codex-file-citation{path="/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/paakaupungit-codex/sessio-72-20261011/valiaikainen/bissau-D/ine-projektio.pdf" purpose="source"}

WIPOn CDIP/35/4:n Annex I, page 8 / PDF-sivu 9 luettiin kokonaan ja katsottiin B:n säilyttämästä alkuperäislähteen renderöinnistä. Legislative progress kertoo ministerineuvostovaiheesta ja kesken olevista jatkohyväksynnöistä; se ei ole todistus kaikista vuoden 2026 voimaantulotoimista.

:codex-file-citation{path="/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/paakaupungit-codex/sessio-72-20261011/valiaikainen/bissau-B/wipo-cdip35.pdf" purpose="source"}

## Varsinaiset löydökset

| JSON-polku | Väite / vika | Lähde ja syy | Tulos | Tarkka korvaus |
|---|---|---|---|---|
| R1 `kysymykset[4].hint` | ”Varhaisen linnakkeen jälkeen paikalla rakennettiin ja korjattiin lisää.” | S2 Current fortress tukee faktan, mutta vihje sanoo käytännössä oikean vastauksen ”Useat rakentamisen vaiheet” uudelleen. PILVIOHJE 7/8D: vihje ei paljasta vastausta. | **VÄÄRIN (vihje)** | Koko hint-merkkijono alla. Kysymys, oikea vastaus, vaihtoehdot, taso, fakta ja lähde säilyvät. |
| R2 `nahtavyydet["Pidjiguitin laituri"].teksti` | ”Isoisän matkavuonna 1873 rannalla oli siis kaupankäynnin rakenteita …” yksityisistä puulaitureista kertovan virkkeen jälkeen. | S3 História sanoo hallinnon tavoitelleen julkista laituria 1870-luvun alusta ja yritysten käyttäneen ajoittain puulaitureita ennen myöhempää julkista laituria. Se ei ajoita yksityisten puulaiturien tarkkaa tilannetta vuoteen 1873. Vuoden 1889 julkinen vaihe on lähteessä selvä, mutta ”ennen 1889” ei tarkoita automaattisesti ”jo 1873”. | **EPÄVARMA** | Koko 988 merkin / 3 kappaleen juttu alla. Satamakauppa vuonna 1873 säilyy; yksityislaiturien matkavuoden tila nimetään epävarmaksi. |
| R3 `kaupunkilehti[0].nostot[3].teksti` | ”Kuvat auttoivat tunnistamaan esineiden alkuperää …” | S8 Exposição kertoo museon/kokoelman historian rekonstruoinnista. S9 kertoo kokoelman historian kokoamisesta ja esineiden etnografisesta taustoituksesta. Nämä eivät sano, että kuvista tunnistettiin esineiden alkuperä; ne kuvaavat kokoelman historiaa ja näyttelyn taustoitusta. Kulttuurinen tausta ja esineen täsmällinen alkuperä ovat eri tarkkuustasoja. | **EPÄVARMA** | Koko 477 merkin nosto alla. Vedosten merkitys ja näyttelyn säilyneet/uudet esineet säilyvät; alkuperästä tehdyn tarkemman päätelmän tilalle lähteen tukema kulttuurinen tausta. |

### R1 — koko hint-kenttä

```json
"Linnoitus sijaitsee Bissaun vanhassa satamaytimessä."
```

### R2 — koko Pidjiguitin teksti-kenttä

```json
"Pidjiguiti on tunnistettu laituripaikka Bissaun satamassa. Sen julkinen laiturivaihe kuuluu 1800-luvun loppupuolelle. Varhaisessa rakenteessa yhdistettiin puuta ja muurausta, ja paikka tunnettiin nimellä Ponte-cais Correia e Lança. Sataman ja laiturin tarinat alkavat kuitenkin eri kohdista.\n\nBissaussa käytiin satamakauppaa jo ennen tätä julkista laituria. Satamassa oli myös yritysten käyttämiä puisia lastaus- ja maihinnousulaitureita, mutta niiden tarkkaa tilannetta isoisän matkavuonna 1873 ei ole ajoitettu. Bissau oli tuolloin jo kauppapaikka, kun taas Pidjiguitin julkisen laiturin rakennusvaihe kuuluu myöhempään aikaan.\n\nMyöhemmin Bissaun sataman muualle rakennettiin uudempia laitureita. Ne kuuluvat saman sataman historiaan mutta ovat eri paikkoja kuin vanha Pidjiguiti. Laiturin nimi kohdistuu alusten ja tavaroiden maihin kytkeytyvään työympäristöön. Sen vaiheita voi seurata erottamalla vanhan satamapaikan, julkisen laiturin ja myöhemmän satamainfrastruktuurin toisistaan."
```

### R3 — koko K4-noston teksti-kenttä

```json
"Kansallisen etnografisen museon historiassa pieni valokuvan koevedos osoittautui arvokkaaksi. Esineitä ja valokuvia oli menetetty myöhäisen 1900-luvun kriiseissä, mutta pieniä vedoksia säilyi. Niitä digitoitiin kokoelmien historian kokoamiseksi. Näyttelyssä kuvien rinnalla kerrottiin esineiden kulttuurisesta taustasta. Säilyneet esineet, uudet hankinnat ja kuvallinen aineisto täydensivät toisiaan. Pienen paperikuvan sisältämä tieto ulottui sen omaa kokoa paljon pidemmälle."
```

## Tunnetut kuvapuutteet ja koneportti

| Puute | Nykyinen kenttä | Tila ja jatko |
|---|---|---|
| N1 Amuran linnoitus | `nahtavyydet["Amuran linnoitus"].kuvat = []` | Erillinen kohdekuva puuttuu. H1:n kuvaa ei toisinneta. Uusi kohde, kuvateksti, oikeusketju ja kasvoraja jälkitarkistettava. |
| N2 Pidjiguitin laituri | `nahtavyydet["Pidjiguitin laituri"].kuvat = []` | Erillinen kohdekuva puuttuu. H3:n kuvaa ei toisinneta; myöhemmän sataman yleiskuva ei kelpaa vanhan laiturin täsmäkuvaksi. |
| N3 Tulliaukio | `nahtavyydet["Tulliaukio"].kuvat = []` | Oikean avoimen aukion kuva puuttuu. H4:n uudempi satama ei kuvaa Tulliaukiota. |

Nämä eivät ole hyväksyttyjä kuvattomia poikkeuksia. Alkuperäinen paikallinen tarkistin ajettiin muuttamattomalle C-luonnokselle:

```text
VIRHE bissau: juttu Amuran linnoitus: kuvia 1–3
VIRHE bissau: juttu Pidjiguitin laituri: kuvia 1–3
VIRHE bissau: juttu Tulliaukio: kuvia 1–3
VAROITUS bissau: kohteita 3 (pohjataso 6; perustele RAPORTTI.md:ssä)
== bissau: 3 virhettä, 1 varoitusta, 16 kuvaa
YHTEENSÄ 1 kaupunkia: 3 virhettä, 1 varoitusta
```

Ei muuta tekstin/skeeman konevirhettä. Koneen tulos ei tarkista lähdejohtopäätöksiä tai vihjeen paljastavuutta. Kolmen kohteen varoitus tarvitsee pääsession hyväksymän kompaktin satamaytimen perustelun RAPORTTI.md:hen; Bissau kokonaisuutena ei ole pieni väestöalue. Kuvapuutteita ei hyväksytä määrän perustelulla eikä #74:llä nollavirheiksi.

## Muut tekstifaktat ja vastausten tarkistus

| Kenttä / väitejoukko | Lähde ja osio | Tulos |
|---|---|---|
| `kaupunki`, artikkeli ja kysymykset 1–2 / pääkaupunki, Guinea-Bissau, Geban leveä estuaari ja pohjoisranta | S1 Geography, S4 Route/estuaarin kuvaus, S6, WD1 | OK. Kaupungin satamapaikka ja Geban uloin suu eri paikkoja. Pallo 11.86 / −15.5833 on kontekstin piste. |
| `artikkeli`, K1 ja opas 2 / Bissau Velhon vanhat talot käytössä, liikkeet/apteekit | S5 See/Bissau Velho, S6 kulttuuriperintö | OK yleisenä kaupunginosan käytön kuvauksena; yksittäisen kuvatun talon tämänhetkistä käyttöä tai julkisivun ikää ei luvata. |
| Artikkeli, K2 ja kysymys 3 / Papel-yhteisöjen valtakunta, paikalliset hallitsijat, portugalilaiset/muut eurooppalaiset ja monopoliristiriidat | S1 History; S6 História taustana | OK. Linnoituksen olemassaolosta ei päätellä ympäröivän alueen Portugalin hallintaa; lähde sanoo Papel-kuninkaiden tosiasiallisen vallan säilyneen. Paikalliset omina toimijoinaan. |
| K3 ja opas 3 / Bandimin ruokatarjonta, vaatteet, jalkineet, käsinkudotut tekstiilit | S6 Comércio, S5 Buy | OK; S6:n kaupungin torikaupan kuvaus ja S5:n Bandim täsmäävät. Ei myyntimäärää, hintaa tai päivittäistä varmaa valikoimaa. |
| Artikkeli, tiedot 3, K4 ja kysymys 4 / digitoidut koevedokset, museon/kokoelman historia, menetetyt esineet, näyttelyn kuvallinen tausta ja uudet hankinnat | S8 Exposição, S9 Camões | OK yleisessä muodossa. K4:n esineiden alkuperän tarkempi väite R3. Museokokoelmien historian/alkuperän kokoaminen ei väitä jokaisen esineen täydellistä alkuperäketjua. |
| H1, tiedot 2, Amuran juttu, kysymys 5 / ensimmäinen 1600-luvun linnake hylätty/tuhoutunut, nykyinen kokonaisuus 1700-luvun vaiheista, 1800-luvun korjaukset ja 1900-luvun restaurointi | S2 History/Current fortress, S1 History | OK. S1 ja S2 eroavat täsmällisissä 1700-luvun vuosissa; C käyttää vuosisataa. Ensimmäisen linnakkeen ikää ei siirretä kaikkiin nykyosiin. Nykyisiä muistomerkkejä tai mausoleumia ei ajoiteta vanhaksi. |
| H2 ja Amuran juttu / bastionit ulkonevat kulmista, sivusuuntainen puolustus, Vauban-tyyli, komentotalo/kasarmit/varastot | S2 Features, S10 johdanto/Effectiveness | OK. Puolustustarkoitus löytyy lähteestä, ei omasta kaavion päätelmästä. H2 on yleinen periaatekaavio, ei Amuran pohjapiirros tai todiste bastionien määrästä. |
| H3 ja Pidjiguitin juttu / vanhempi satamakauppa, julkinen laiturivaihe 1800-luvun loppupuolella, puu/muuraus, Ponte-cais Correia e Lança, uudemmat laiturit eri paikoissa | S3 Descrição/História, WD4 | OK. Tarkka julkisen laiturin aloitusvuosi on lähteessä, mutta pelaajalle vain vuosisadan loppupuoli; yksityislaiturien vuoden 1873 tilanne R2. |
| H4, Tulliaukion juttu ja minitehtävä / Praça da Alfândega, tulli, nimenantaja tullitalo, aukio/puutarha, linnoituksen itäpuoli, yleinen tullitalon tehtävä | WD5 P31/P138/P625, WD6 custom house, S11 johdanto | OK. Aukio ja tullitalo erotetaan; ei nykyistä tullin menettelyä, vero-/maksuväitettä tai tarkkaa perustamisvuotta. |
| `kaupunkilehti[1].tehtava` / vastaus tulliin | H4-nosto, WD5/WD6 ja S11 | OK. Vastaus löytyy saman sivun H4:stä, ei toista viittä visakysymystä, ei palkkiota. Fakta ei ole nostovirke sanatarkasti. |
| Kysymys 1 / oikea Guinea-Bissaun | S1 johdanto | OK; Guinean tasavalta, Sierra Leone, Senegal vääriä mutta uskottavia. Vaihtoehdot 14/18/13/20 merkkiä; oikea ei pisin. |
| Kysymys 2 / oikea Geban | S1 Geography, S4 | OK; Gambia, Senegal, Niger vääriä. Vihje ei nimeä Gebaa. Vaihtoehdot 5/7/9/7. |
| Kysymys 3 / oikea Papel-yhteisöjen | S1 History | OK; Wolof-, Mandinka- ja Bijagó-yhteisöt eivät tämän valtakunnan vastaus. Vaihtoehdot 16/16/19/17; vihje ei nimeä Papel-yhteisöjä. |
| Kysymys 4 / kokoelmien historian kokoaminen | S8 Exposição/S9 | OK. Museotilat, kävijäluettelo ja tonttijaon mittaus eivät tämän digitoinnin tarkoitus. Vaihtoehdot 32/38/37/33. Vihje ei sano kokoelman historiaa suoraan. |
| Kysymys 5 / useat rakennusvaiheet | S2 History/Current fortress | OK vastauksen/faktan osalta; vaihtoehdot 26/27/31/36, oikea ei pisin. Vihje korjattava R1. |
| Opas 1, `ehdotukset.lentoasema` / Osvaldo Vieira (OXB), jaetut taksit, vesiyhteydet | S13 johdanto/infolaatikko, S5 Get around, S6 Porto e serviço de balsas | OK. Ei vanhoja aikatauluja, hintoja tai lento-/vesiyhteyslupausta matkalle. |
| Matkailijalle, opas 2–3 ja `hyvaTietaa` / suunnittele kuljetus, yöajoa vältettävä, herkät kohteet, pääsy/osoite tarkistettava | S14 Road conditions/sensitive areas/Money, S8 museon tilasiirto | OK. Ei sisäänpääsylupausta, ohjausta vanhaan Ajuda-pisteeseen tai neuvotteluvinkkiä sotilaiden kanssa. |
| Opas 4 ja paikallinen ateria / riisi, kala/liha/kasvikset, keitot/kastikkeet, äyriäiset | S12 johdanto, S5 Eat | OK maataustana. Nepalissa kuvatulle riisille ei annettu paikallisen annoksen tai alkuperän nimeä. |
| Sääjakson tievaraus / rankkasateet vaikeuttavat tieoloja | S14 Road conditions | OK suora lähdeväite, ei kuvasta päätelty sääennuste. |
| Koko teksti / nykysota, nykypolitiikka, nykyrikostarinat ja ukin tekemiset | Oma läpiluku | OK. Myöhäisen 1900-luvun museomenetykset neutraalina historian taustana; ei osapuoli-/väkivaltakehystä, keksittyä ukin käyntiä, päiväkirjamerkintää tai lainauksia. |

## 1873, väestö, luvut ja sää

**1873:** kauppapaikka ja linnoitus olivat olemassa lähteiden aiempien vaiheiden perusteella. Bissau ei ollut vielä nykyisen kansallisvaltion pääkaupunki; nykyinen asema on myöhempi. Nykyisten linnoitusosien/restaurointien ikää ei sijoiteta automaattisesti matkavuoteen. Pidjiguitin julkinen laiturivaihe tulee myöhemmin; yksityisten puulaiturien matkavuoden tarkka tila R2. Tulliaukion vuoden 1873 ulkoasu jätetty avoimeksi eikä nykyistä puutarhaa/tullitaloa esitetä matkavuoden näkymäksi.

**Väestö:** INE:n taulukon 14, s. 88, SAB-rivin 2025-sarakkeessa on 466716; s. 12 nimeää SAB:n Setor Autónomo de Bissauksi. Otsikko sanoo nimenomaisesti *população projetada*, joten tämä on autonomisen sektorin projektio, ei vuoden 2025 uusi laskenta eikä vanhan satamaytimen asukasluku. S. 11 nimeää projektioiden alkupopulaatioksi vuoden 2014 väestön ja kertoo ikä-/sukupuolirakenteen arvioinnista ja korjauksesta. Raportin eri syöteaineistovuosia ei yksinkertaisteta väitteeksi, että yksin vuoden 2009 laskenta olisi suora alkupopulaatio. C:n asukasluvun poisjättö ja projektiohuomio oikein; täsmällistä lukua ei tämän D:n perusteella lisätä pelaajalle.

**Lukukuri:** pelaajatekstissä ei tarkkaa perustamis-/rakennusvuotta, väestö-/pinta-alalukua, laiturin pituutta/kapasiteettia, valokuvavedosten määrää, matka-aikaa tai hintaa. Ristiriitaiset historia-ajoitukset ovat vuosisatoja. 1873 on annettu matkavuosi; tarkistetut olemassaoloväitteet perustuvat kronologiaan. Kuvien vuodet 2007/2015/2017/2019/2022/2023/2025/2026, kaavion laatimisvuosi ja normaaliaineiston kausi ovat suoraa kuva-/aineistometatietoa. Date ja EXIF tai Wikipedia ja sen sama taulukkolähde eivät muutu kahdeksi riippumattomaksi historiatutkimukseksi.

Sääolion lat/lon, kaikki 48 kuukausilukua ja `lahde` ovat täsmälleen saa.json:n arvot. Tausta jää vain pois pelin kopion kentistä. S1:n itse luettu **Osvaldo Vieira International Airport, 1991–2020, NOAA** -taulukko tukee samoja rivejä. Bissaun artikkelin toinen 1974–1994-taulukko ja johdannon noin 2000 mm eivät ole käytetty säälähde.

| Sarja / teksti | Tarkistettu sisältö | Tulos |
|---|---|---|
| `keskilampo` | 25.3, 27.1, 28.2, 28, 28.5, 28.1, 27.2, 26.9, 27.3, 27.9, 27.7, 26 | OK: Daily mean, ei ylimmän/alimman keskiarvo. |
| `ylin` | 32, 35, 36, 35, 35, 33, 31, 30, 31, 32, 33, 33 | OK: työkalun pyöristys Mean daily maximum -rivistä. |
| `alin` | 18, 19, 20, 21, 22, 23, 23, 23, 23, 24, 23, 19 | OK: työkalun pyöristys Mean daily minimum -rivistä. |
| `sade` | 0, 0, 0, 0, 11, 140, 371, 468, 364, 167, 11, 0 | OK: työkalun pyöristys Average precipitation -rivistä. |
| Opas 5 ja `luonnehdinta` | Kevään ylin noin 35–36 °C, elokuun ylin noin 30 °C, alkuvuoden alimmat noin 18–19 °C, elokuun sade noin 470 mm, kesä–lokakuun sadekauden painotus | OK. Alkuvuoden nollat tarkoittavat työkalun kokonaismillimetreihin pyöristettyä normaalisarjaa, eivät sateettomuuden lupausta jokaiselle päivälle. Ei ilmastolähteen nimeä pelaajalauseissa. |

Tallennetut sääkoordinaatit 11.86/−15.58 ovat työkalun kaupunkipiste, eivät erikseen varmennettu lentoaseman asemakoordinaatti. NOAA-taulukkoa ei korvata toisella asemalla, Open-Meteolla tai valokuvan vehreydestä tehtävällä arviolla.

## Kolme karttapistettä, tyypit ja rajaus

| Kohde | Itse tarkistettu WD-arvo / rajaus | Tulos |
|---|---|---|
| Amuran linnoitus | WD2 P625 11.860274 / −15.578615 → 11.86027 / −15.57862. S2 artikkelipiste samaa linnoitusta. | OK; rakennus/oletustyyppi. Ensimmäistä vaihetta ei samasteta kaikkiin nykyosiin. |
| Pidjiguitin laituri | WD4 P625 11.85618 / −15.57835, kuvaus *pier in Bissau*, P361 = Port of Bissau. | OK; rakennettu laituripaikka/oletustyyppi. Sataman WD3:n epätarkkaa kokonaispistettä tai tapahtuman muistomerkkiä ei käytetä. |
| Tulliaukio | WD5 P625 11.86026 / −15.57723, P31 aukio/puutarha, P138 WD6:n tullitalo. WD6:n erillinen piste 11.86071 / −15.57683 ei ole aukion piste. | OK; tyyppi `aukio`. Linnoituksen itäpuoliset longitudit tukevat sijaintisuhdetta. P571:n karkea merkintä ei anna tarkkaa kehitysvuotta. |
| `rajat` | pohjoinen 11.86297, etelä 11.85348, länsi −15.58138, itä −15.57447 | OK. Kaikki kolme pistettä sisällä; laskettu marginaali pohjoisessa/etelässä noin 300,23 m ja idässä/lännessä noin 300,35 m. |
| Nähtävyysavaimet | Amuran linnoitus, Pidjiguitin laituri, Tulliaukio | OK; täsmälleen kartan nimet. Nykyiset tekstit 944/946/873 merkkiä ja kolme kappaletta; R2:n korvaus 988 merkkiä / kolme kappaletta. |

## Kaikki 16 kuvaa: omat havainnot ja kuvateksti

Kaikki ovat lopullisesta selected/provenance-valinnasta. JSONissa 16 eri tiedostonimeä, kaikki 16 lähderiviä täsmäävät. Koko/tekijä/lisenssi verrattu alkuperäisiltä tiedostosivuilta; vähintään 1200 px leveys jokaisella, SVG:llä sivun nimelliskoko. Omassa `js/packs`-täsmähaussa ei löytynyt aiempaa käyttöä kanonisena/alaviiva/JS-heittomerkkimuotona.

| Rooli / nro | Oma havainto ja kuvatekstin vastaavuus | Koko, tekijä, lisenssi / tulos |
|---|---|---|
| C1 / 2 | Laaja katujen liittymä, useita talorivejä, autoja, puita ja fyysisiä viirinauhoja. Bissau Velhon katutila 2019; ei yksittäisen talon valmistumisvuotta. | 4608×2592; Jcornelius; CC BY-SA 4.0. OK. |
| C2 / 8 | Suuri vesiala, pitkä laiturilinja ja satamatekniikka kaukana. Kuva kertoo nykyisemmästä satamaympäristöstä 2017 eikä vanhasta Pidjiguitista. | 4483×2328; Joehawkins; CC BY-SA 4.0. OK. |
| C3 / 6 | Kattojen yli nähty kaupunkipanoraama, puustoa, kortteleita ja urheilukenttä. Amuraa ei nimetä näkymättömäksi pääkohteeksi. | 4032×3024; Aboubacarkhoraa; CC0. OK, 2023. |
| K1 / 43 | Kaksikerroksinen talo, kaari-aukot, yläkuistin pyykki, kulunutta rappausta; ei ihmisiä. Talon arki 2007 ilman nykykäytön lupausta. | 2272×1704; (WT-en) Pis bus at English Wikivoyage; PD. OK. Kuvausvuosi 2007 näkyy myös EXIF:ssä, ei pelkkä siirto/latausvuosi. |
| K2 / 47 | Laaja optinen satelliittinäkymä, kaupungin pohjoisranta, vesialueen matalikot ja kanavaiset rannat. Maantiede, ei Papel-historian tapahtumakuva. | 2048×1280; Axelspace Corporation; CC BY-SA 4.0. OK, Hodoyoshi-1/2017. |
| K3 / 12 | Avenue ylhäältä, busseja/autoja, ihmisvirtaa ja markkinarakennuksen laita. Alkuperäiskoossakin kasvot ovat pieniä tai tumman varjon peittämiä; kasvonpiirteet eivät luettavissa. | 4608×2592; Joehawkins; CC BY-SA 4.0. OK. Kuvasivu nimeää avenuen ja Bandimin hallin oikealle, kuten selite 2017. |
| K4 / 45 | Avatun skannerin muovirunko, lukupään kisko, piirilevy ja kaapeli; alusta tyhjä. Kuvateksti on yleinen menetelmä, ei museon laite. | 1829×1737; Effib; CC BY-SA 4.0. OK, sivun Date 2007. |
| H1 / 17 | Amuran suuri sisäpiha, puut, parkkitilaa, matalia palvelurakennuksia ja tavallisia tykkejä; ihmiset kaukaisia pisteitä. Ei mausoleumia tai muistomerkkiä pääaiheena. | 4608×2592; Joehawkins; CC BY-SA 4.0. OK sisäpihan 2017 yleisnäkymänä; ei kaikkien nykyosien ikäväitettä tai pääsylupausta. |
| H2 / 50 | Geometrinen ruskea runko ulkonevine kulmineen, vihreä reuna ja ohuet apuviivat. Ei nimiä/leimaa/legendaa. | SVG 5300×4600; Ludwig Dupas; CC BY-SA 4.0. OK yleisenä vuonna 2019 laadittuna Vauban-periaatekaaviona; EI Amuran pohjapiirros. Mitat itsenäisesti nominally-esityksestä. |
| H3 / 14 | Pidjiguitin veneitä, mutarantaa ja matalaa vettä, taustalla muita laitureita. Ihmiset kaukaisia, selin tai tummassa varjossa; alkuperäiskoossa ei luettavia kasvonpiirteitä. | 2272×1704; (WT-en) Pis bus at English Wikivoyage; PD. OK. EXIF 21.6.2007 vahvistaa kuvausvuoden; sivun 27.11.2007 on alkuperäinen lataus. Selite ei nimeä kaikkia taustarakenteita Pidjiguitiksi. |
| H4 / 35 | Veden takana rahtialus, pieni käyttövene, teknisiä laituri-/satamarakenteita. | 4608×2592; Joehawkins; CC BY-SA 4.0. OK satamakaupan yleiskuvana 2017; EI Tulliaukion valokuva. |
| TRAVELER / 1 | Kahden talon välinen kuja avautuu Geban vedelle; auto, palmu, penkki ja kaukana tumma istuva hahmo. Alkuperäiskoossa hahmon kasvonpiirteitä ei voi lukea. | Näytetty 3000×4000, suhde 0,75; Laércia Valeriana Insali; CC BY 4.0. OK, Date/EXIF 22.8.2026. JPEG:n raakapikselit 4000×3000 + EXIF Rotated 90° CCW: oikein päin näytetty pysty, ei oma rajaus-/kiertomuokkaus. |
| O3 / 40 | Auki oleva skanneri, tyhjä lasialusta, lattia ja kaapeli. Ei kopioitavaa kuvaa, pakkausta tai mainossommittelua. | 1485×2282; Bultro; CC BY-SA 4.0. OK yleisenä 2023 digitointivälineenä, ei museon laite. |
| O4 / 44 | Keitettyä valkoista riisiä metallisessa astiassa; jyvät tunnistettavia, tausta pehmeä. Ei nimettyä kastiketta/ateriaa tai kasvoja. | 3024×4032; Gaurav Dhwaj Khadka; CC BY-SA 4.0. OK, Nepal GPS 27.702254/85.348812 + luokitus, vuosi 2022. Ei Guinea-Bissaun paikallinen annos; Date/EXIF päivissä ero mutta sama kuvausvuosi. |
| O5 / 4 | Laaja puusto etualalla, kattoja kauempana, pilvinen taivas. Paikallinen São Paulon kaupunginosa, ei Brasilian kaupunki tai ilmastonormaalin todiste. | 4032×2268; Bnhamadjo; CC BY-SA 3.0. OK, elokuu 2025. |
| PHOTO / 3 | Mustavalkoinen talon seinusta, puut ja pyykkinaru; ei ihmisiä. Oveen fyysisesti kiinnitetty paperi ei ole kuvan päälle lisätty leima/mainos. | 5184×3456; Barnabe Freixo; CC BY 2.0. OK Bissaun arkisena vuoden 2015 valokuvana; ei vuoden 1873 näkymä tai ennen–nyt-pari. Valokuvarivin Commons-muoto oikein. |

Kasvoraja koski koko reseptiä, ei vain varsinaisia lähikuvia. Ihmisen pelkkä läsnäolo ei ollut hylkäyssyy: kaukaiset pisteet, selin olevat ja varjoon jäävät lukukelvottomat kasvot sallittu. K3/H3/TRAVELER katsottiin sekä esikatselusta että alkuperäisestä. Moderni nyrkkimuistomerkki, mausoleumi, muistoteos tai GPS-ristiriitainen vuoden 2026 bastionikuva ei ole valittujen 16 joukossa.

Katu-, satama- ja skanneriaiheiden toisto eri tiedostoissa on roolituksessa perusteltu. Kansikuvat ovat laajoja kaupungin/sataman yleisnäkymiä. Pysty täyttää tuoreuden ja 0,60–0,85-suhteen. Oppaan O1/O2 ovat kaksi sallittua kuvatonta jaksoa; O3/O4/O5 on kuvattu 2023/2022/2025. Ei samaa tiedostoa kahdesti tai historiakuvaa nykylaitteeksi.

## Oikeudet erikseen

- **Valokuvan/kaavion oma oikeus:** sallittu PD/CC0/CC BY/CC BY-SA, tekijä ja koko tarkistettu. Lähderivit sanatarkasti näkyvistä Author-tiedoista; ei arvattua oikeaa nimeä. H2 on modernin tekijän CC BY-SA -kaavio, ei automaattinen PD pelkän Vauban-nimen perusteella.
- **Kuvatun aiheen oikeus:** luonnonvesi/puusto/riisi ja tyhjät tekniset laitteet eivät ole museoteosten toisintamista. Rakennusten vanhan paikan ikää ei käytetä kaikkien nykyosien PD-todisteena. Amuran sisäpihakuva ei toisinna valittua mausoleumia/muistomerkkiä; matalat palvelurakennukset ja funktionaaliset esineet ovat laajan piha-aiheen osia. K1:n talon nykyisen pintakerroksen tekijää tai ikää ei arvailla.
- **FOP / julkaisuperuste:** O1:n art. 152 -yhteenveto erottaa julkistetun arkkitehtuuri-/3D-teoksen kuvan toisintamisen kuvatun teoksen PD-statuksesta. GNB:n tätä julkaisuperustetta ei vaihdeta naapurimaan kielloksi tai PD-lupamaksuksi. Omistajan modernien suojattujen muistoteosten rajaus säilyy; sellaisia ei valittu.
- **Ajantasaisuuden/lähteen raja:** WIPOn nykyinen profiili ja lakikortti listaavat vanhan koodin. WIPO CDIP/35/4:n koko relevantti sivu tukee uuden lain keskeneräisten hyväksyntävaiheiden tilaa vuonna 2025. Tämä ei sulje pois kaikkia myöhempiä toimia. Art. 152:n sanamuoto luettiin Commonsin yhteenvedosta; alkuperäislain koko tekstiä ja kaikkia paikallisia käyttöehtoja ei väitetä itsenäisesti läpikäydyiksi. Erityistä maksua ei tässä varmennettu eikä maksullista oikeutta hyväksytty.

## Mitat, koskemattomuus ja jatko

Itsenäisesti mitattu: intro 880 merkkiä / 9 virkettä / 3 kappaletta / 3 lihavointia; Lue lisää 835 / 3 kappaletta. Kansi 465/499/489/502 ja historia 507/493/489/510 merkkiä, kummallakin neljä nostoa. Opas viisi jaksoa, parasta viisi, hyvaTietaa neljä. Nähtävyydet 944/946/873 merkkiä, jokaisessa kolme kappaletta. R3:n korvaus on 477 merkkiä, R2:n korvaus 988 merkkiä / kolme kappaletta; mitat säilyvät.

Sisalto.jsonin SHA-256 tarkistuksen alussa/lopussa: `44a16038b3a3e2b8f901a0e14fd055f5a3be8336f33479cadf7b1631b721a741`. Se jäi muuttamatta. Raportin korvauslohkot ovat JSON-merkkijonoja kokonaisille nimetyille kentille; niitä ei sovellettu tässä vaiheessa.

Jatko: R1–R3:n soveltaminen, kolme erillistä kohdekuvaa B:n kautta, niiden itsenäinen D-kuva-/lisenssi-/teos-/kasvo-/kuvatekstitarkistus, kompaktin ytimen perustelu pääsession RAPORTTI.md:hen ja koneportin uusinta. **OSITTAIN TARKISTETTU** pysyy, kunnes puuttuvien kuvien jälkitarkistus on tehty; ei koko kaupungin valmis-D/F-merkintää.

## Korjattu

### E-kierros 1 — kolme tekstikorjausta

E-korjaus 11.10.2026 uudella agentilla, joka ei ollut Bissaun A-, C- tai D-agentti. D:n varsinaiset löydökset **VÄÄRIN 1 ja EPÄVARMA 2** sovellettiin kokonaisina kenttäkorvauksina **3/3 sanatarkasti** raportin R1–R3-JSON-lohkoista; myös D:n `korvaukset.json` täsmää niihin.

| D-kohta | Tehty korjaus / nykytila |
|---|---|
| R1 `kysymykset[4].hint` — VÄÄRIN | Koko vihje korvattu sanatarkasti: ”Linnoitus sijaitsee Bissaun vanhassa satamaytimessä.” Paljastava rakentamis-/korjaamisvihje poistui. Kysymys, vaihtoehdot, oikea vastaus, taso, fakta ja lähde ennallaan. |
| R2 `nahtavyydet["Pidjiguitin laituri"].teksti` — EPÄVARMA | Koko R2-juttu korvattu sanatarkasti (988 merkkiä, kolme kappaletta). Vuoden 1873 satamakauppa säilyy; yksityisten puulaiturien tuon vuoden tarkkaa tilannetta ei ole ajoitettu. |
| R3 `kaupunkilehti[0].nostot[3].teksti` — EPÄVARMA | Koko R3-nosto korvattu sanatarkasti (477 merkkiä). Esineiden täsmällisen alkuperän tunnistamista koskevan päätelmän tilalla on näyttelyn esineiden kulttuurinen tausta. |
| N1 Amuran linnoituksen kohdekuva | `kuvat = []` säilyy. Erillinen hyväksyttävä kohdekuva puuttuu; H1:tä ei toisinnettu. |
| N2 Pidjiguitin laiturin kohdekuva | `kuvat = []` säilyy. Erillinen kohdekuva puuttuu; H3:tä tai uudemman sataman yleiskuvaa ei käytetty korvikkeena. |
| N3 Tulliaukion kohdekuva | `kuvat = []` säilyy. Aukion avoimen tilan oma kuva puuttuu; H4 ei ole Tulliaukion kuva. |
| Kolmen kohteen määrän varoitus | Säilyy. Kompaktin satamaytimen perustelu kuuluu pääsession RAPORTTI.md:hen; se ei hyväksy puuttuvia kuvia nollavirheiksi. Ei hyväksymätöntä #74-poikkeusta. |

**Koskemattomuus:** syvä vertailu osoittaa vain kolme yllä nimettyä JSON-arvon muutosta. Kaikki muut arvot, avainjärjestys ja listojen pituudet säilyivät. `saatiedot` on kokonaan ennallaan ja sääperusarvot ovat samat kuin `saa.json`:ssa. `saa.json`, faktapohja, konteksti ja kuvat.md jäivät tavutasolla ennalleen. Kaikki 16 eri kuvavalintaa, lähderiviä ja kuvatekstiä säilyivät. H2 on yleinen bastioniperiaatekaavio, ei Amuran pohjapiirros; H4 on yleinen satamakauppakuva, ei Tulliaukion kuva. Ei uusia kuvahakuja, kuvanvaihtoja, toistoa tai keksittyä kuvaa.

Alkuperäinen `paakaupungit-pilvi/tyokalu.mjs` on ennallaan (SHA-256 `78c2150e6510ffcd51f05a44898316122f6d98100abd6dc51666de706fd1467c`). Ajettiin paikallisesti:

```text
VIRHE bissau: juttu Amuran linnoitus: kuvia 1–3
VIRHE bissau: juttu Pidjiguitin laituri: kuvia 1–3
VIRHE bissau: juttu Tulliaukio: kuvia 1–3
VAROITUS bissau: kohteita 3 (pohjataso 6; perustele RAPORTTI.md:ssä)
== bissau: 3 virhettä, 1 varoitusta, 16 kuvaa
YHTEENSÄ 1 kaupunkia: 3 virhettä, 1 varoitusta
```

Paikallinen ajo: exit 1. Ajettiin myös `node --import ../valiaikainen/lahdesovitus.mjs paakaupungit-pilvi/tyokalu.mjs tarkista e04 bissau --verkko` sallitulla yhteisellä lähdesovituksella, alkuperäistä tarkistinta muuttamatta:

```text
VIRHE bissau: juttu Amuran linnoitus: kuvia 1–3
VIRHE bissau: juttu Pidjiguitin laituri: kuvia 1–3
VIRHE bissau: juttu Tulliaukio: kuvia 1–3
VIRHE bissau: wiki "Museu Etnográfico Nacional da Guiné-Bissau" ei löydy fi- eikä en-Wikipediasta
VIRHE bissau: wiki "Porto de Bissau" ei löydy fi- eikä en-Wikipediasta
VAROITUS bissau: kohteita 3 (pohjataso 6; perustele RAPORTTI.md:ssä)
== bissau: 5 virhettä, 1 varoitusta, 16 kuvaa
YHTEENSÄ 1 kaupunkia: 5 virhettä, 1 varoitusta
```

Verkkoajo: exit 1. Kolmen kuvapuutteen lisäksi verkkotarkistin paljasti kaksi ennestään paikallisessa ajossa näkymätöntä otsikkovirhettä: `kaupunkilehti[0].nostot[3].wiki` = `Museu Etnográfico Nacional da Guiné-Bissau` ja `kaupunkilehti[1].nostot[2].wiki` = `Porto de Bissau` eivät löydy fi- tai en-Wikipediasta. Niitä ei muutettu tämän E-toimeksiannon kolmen JSON-kentän rajauksen vuoksi; pääsessiolle raportoitu. Ei muita verkkotarkistimen kuva-, leveys-, tekijä- tai lisenssivirheitä/varoituksia.

Yhteinen `lahdetieto.py` tunnisti H2:n lähdesivun todellisen `Original file (SVG file, nominally 5,300 × 4,600 pixels)` -mittamuodon. Verkkovarmennus palautti 5300×4600, tekijän Ludwig Dupas ja lisenssin CC BY-SA 4.0; oma tallenne `h2-verkkovarmennus.json`. Tarkistimen sääntöjä, mittoja tai sisältöarvoja ei sovitettu puutteen peittämiseksi.

Sisalto.json ennen: `44a16038b3a3e2b8f901a0e14fd055f5a3be8336f33479cadf7b1631b721a741`. Jälkeen: `1077c72a36dcbdb8541b13648716a657518083ed07d1255da353ef13c87e430b`. Korvaus-, vertailu- ja ajotodisteet NASilla `valiaikainen/bissau-E/`; TMPDIR ja Python-välimuisti myös siellä. C-muistiinpanoihin lisättiin vain nykytilan päivitys.

**OSITTAIN TARKISTETTU** säilyy. Ei valmis-C/E/F-merkintää eikä toimitusvalmiutta. Jatko: kolme hyväksyttävää erillistä kohdekuvaa, niiden riippumaton D-jälkitarkistus, verkkotarkistimen kaksi otsikkokorjausta valtuutetussa jatkotyössä, kohdemäärän perustelu ja koneportin uusinta. Ei Git-operaatioita, uusia agentteja, pelitiedostomuutoksia, generointia, R2-toimia tai julkaisua.


### E-kierros 2 — kaksi wiki-linkkiä

Rajattu toinen E-kierros 11.10.2026 pääsession toimeksiannosta: korjattiin vain ensimmäisen --verkko-ajon paljastamat kaksi wiki-arvoa sekä raporttien nykytila. Omat olemassa olevat englanninkieliset artikkelit varmennettiin itse robots-sallituilta tavallisilta lähdesivuilta. Yhteinen `sallittu_haku.py` tarkisti sallitut polut ja redirectit; ei /w/- tai API-hakuja eikä uusia kuvahakuja.

| JSON-polku | Vanha arvo | Uusi arvo | Itse luettu lähde / sisältövastaavuus |
|---|---|---|---|
| `kaupunkilehti[0].nostot[3].wiki` | `Museu Etnográfico Nacional da Guiné-Bissau` | `National Ethnographic Museum (Guinea-Bissau)` | [Oma en-artikkeli](https://en.wikipedia.org/wiki/National_Ethnographic_Museum_(Guinea-Bissau)), revisio 1112534234. Näkyvä otsikko sama; johdanto nimeää Guinea-Bissaun kansallisen etnografisen museon Bissaussa. |
| `kaupunkilehti[1].nostot[2].wiki` | `Porto de Bissau` | `Port of Bissau` | [Oma en-artikkeli](https://en.wikipedia.org/wiki/Port_of_Bissau), revisio 1265263619. Näkyvä otsikko sama; johdanto ja Layout-osio käsittelevät Bissaun satamaa ja Pidjiguitin laitureita. [WD Q20646352:n en-sitelink](https://www.wikidata.org/wiki/Special:EntityData/Q20646352.json) antaa saman otsikon ja osoitteen. |

Wiki-arvot ovat oikeita en-artikkelien otsikkoja, eivät portugalin otsikoiden väärää kielimerkintää, keksittyä ohjausta tai aiheeseen liittymätöntä ylempää sivua. Museon lyhyt en-artikkeli tunnistaa museon; se ei korvaa kokoelman historiaa ja digitointia koskevia alkuperäisiä S8/S9-faktalähteitä. Sataman S3 `Porto de Bissau` -faktalähde säilyy. Faktapohja, Q4:n portugalinkielinen source-arvo sekä kaikki faktaväitteet jäivät ennalleen.

Toisen kierroksen syvä JSON-vertailu: vain yllä nimetyt kaksi wiki-arvoa muuttui. Ensimmäisen kierroksen R1–R3-korvaukset ovat edelleen **3/3 sanatarkasti** D:n täydellisten korvauslohkojen mukaiset. Kaikki muu teksti, sää, kuvavalinnat, kuvatekstit, kohdekartta ja kolme tyhjää kohdekuvalistaa säilyivät. H2 ja H4 säilyvät hyväksytyillä yleisen kaavion / satamakaupan rooleillaan.

Alkuperäinen `tyokalu.mjs` ajettiin jälleen `--verkko`-tilassa samalla sallitulla `valiaikainen/lahdesovitus.mjs`:llä. Tarkistin ennallaan; exit 1:

```text
VIRHE bissau: juttu Amuran linnoitus: kuvia 1–3
VIRHE bissau: juttu Pidjiguitin laituri: kuvia 1–3
VIRHE bissau: juttu Tulliaukio: kuvia 1–3
VAROITUS bissau: kohteita 3 (pohjataso 6; perustele RAPORTTI.md:ssä)
== bissau: 3 virhettä, 1 varoitusta, 16 kuvaa
YHTEENSÄ 1 kaupunkia: 3 virhettä, 1 varoitusta
```

**Nykytila:** ensimmäisen E-kierroksen kaksi wiki-virhettä poistui. Jäljellä ovat vain kolme todellista kohdekuvavirhettä ja yksi kohdemäärävaroitus. Ei muuta verkkotarkistimen virhettä tai varoitusta. Kolme kuvapuutetta eivät ole hyväksytty poikkeus; erilliset kohdekuvat, niiden riippumaton D-jälkitarkistus ja kompaktin satamaytimen perustelu ovat edelleen tarpeen. **OSITTAIN TARKISTETTU** säilyy, eikä valmis-C/E/F-merkintää tai toimitusvalmiutta anneta.

Sisalto.json ennen kierrosta 2: `1077c72a36dcbdb8541b13648716a657518083ed07d1255da353ef13c87e430b`. Jälkeen: `ff73eae8b0f6479a92781bd5947b65cd9e5b1980b0c424d36c10a0613190e906`. Omat lähdesivut, WD-tietue, näkyvien otsikoiden/sisällön varmennus, tarkat wiki-korvaukset ja alkuperäisen tarkistimen ajo ovat NASilla `valiaikainen/bissau-E/kierros2/`. TMPDIR ja Python-välimuisti myös siellä. Ei Git-operaatioita, uusia agentteja, muiden JSON-kenttien muutoksia, pelitiedostomuutoksia, generointia, R2-toimia tai julkaisua.
