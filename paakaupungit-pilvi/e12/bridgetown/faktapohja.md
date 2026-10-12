# Bridgetown — rajattu A-lähdekooste C-kirjoitusta varten

12.10.2026. Omistus e12/bridgetown, tehtävä 20. Tämä on rajattu lähdekooste, ei täyden A-portin eikä riippumattoman D-tarkistuksen kuittaus. Konteksti, alkuperäinen Dakar-rakenne sekä nimetyt resepti- ja spec-ohjeet luettu NAS-kloonista. Lähteet haettu yhteisellä sallittu_haku.py-apurilla tavallisilta robots-sallituilta sivuilta; ei API-, raakateksti- tai PDF-kiertoa. Paikalliset HTML:t, tekstipoiminnat ja SHA-todisteet: valiaikainen/nopea-e12-bridgetown/.

## 0. Luetut lähteet ja 1873-kehys

Kaikkien hakupäivä 12.10.2026. Lähde-ID vastaa väliaineiston tiedostonimeä.

| ID | Lähde | Käytetyt osiot |
|---|---|---|
| B1 | https://en.wikipedia.org/wiki/Bridgetown | johdanto, History, Geography/Careenage, Harbour, Public buses, nähtävyyksien luettelo |
| B2 | https://en.wikipedia.org/wiki/Nidhe_Israel_Synagogue | johdanto, History, Present day, kohteen oma koordinaatti |
| B3 | https://en.wikipedia.org/wiki/Parliament_Buildings_(Barbados) | johdanto, History, East Wing, West Wing, The Clock tower, oma koordinaatti |
| B4 | https://en.wikipedia.org/wiki/Garrison_Historic_Area | johdanto ja historia; koordinaattia EI käytetä |
| B5 | https://en.wikipedia.org/wiki/Chamberlain_Bridge | johdanto, History, setting, nykyinen rakenne |
| B6 | https://en.wikivoyage.org/wiki/Bridgetown | Get in, Get around, See, Do, Eat |
| B7 | https://whc.unesco.org/en/list/1376/ | Description, Outstanding Universal Value, Integrity, Authenticity |
| B8 | https://www.visitbarbados.org/key-buildings | Parliament Buildings and Museum, Blackwoods Screw Dock |
| B9 | https://www.visitbarbados.org/ancient-mikvah-and-jewish-synagogue | mikveh ja museo |
| B10 | https://www.visitbarbados.org/blackwoods-screw-dock | historiallinen telakka; käytetään vain onnistuneen haun jälkeen |

Bridgetownin siirtomaakaupunki oli olemassa jo 1600-luvulla (B1 History, B7 Description/OUV). Vuonna 1873 nykyistä parlamenttirakennusten kokonaisuutta rakennettiin vielä: B3 johdanto antaa rakennusjaksoksi 1870–1874 ja B8 ilmoittaa työn alkaneen 1870 ja valmistuneen neljä vuotta myöhemmin. Molemmat tukevat tätä kehysväitettä. Siipien eri valmistumisvuosia ei viedä tekstiin. Isoisälle ei keksitä käyntiä, havaintoa, lainausta tai reittiä. Nidhe Israelin historia alkoi 1600-luvulla (B2), mutta pelkkää uudelleenrakentamisvuotta ei arvata.

## 1. Perusfaktat ja rajaus

- Barbadosin pääkaupunki, lounaisrannikko, Carlisle Bay: B1 johdanto.
- Vanha mutkitteleva katuverkko muistuttaa englantilaisia kauppakaupunkeja; se poikkeaa alueen espanjalaisten ja hollantilaisten siirtomaakaupunkien ruutukaavoista: B1 History, B7 Description/Authenticity.
- Careenage/Constitution River ei ole Deep Water Harbour. Keskustan altaassa pienveneitä, suuremmassa satamassa rahti- ja risteilyaluksia: B1 Careenage/Harbour; B6 See/Get in.
- Pallo 13.0975, -59.6167 vain konteksti.jsonin kaupungin pisteenä, ei nähtävyyksille.
- Kontekstin 77 394 (2021) koskee St. Michaelin seurakuntaa, EI kaupungin asukaslukua. Väestöluku jätetään C:stä pois.
- Maan yleisesittelyn sokeri-, rommi-, itsenäistymis- ja tasavalta-aiheita ei tehdä kaupungin nostoiksi. UNESCO-asema jää taustaksi, koska kevyessä kuvauksessa se jo mainitaan.

## 2. Kansi: neljä nostoaihetta

1. **Kadut eivät tottele viivoitinta** — serpentine-kadut ja kujat, englantilainen kauppakaupunkivertaus, ero ruutukaavoihin, sataman ympärille kasvanut kaupunki. B1 History; B7 Description/OUV/Authenticity. Wiki Bridgetown.
2. **Kaupunki kahden sataman välissä** — keskustan pienveneallas, suurempi rahti-/risteilysatama, Constitution Riverin suhde Careenageen, parlamentin tuntuma ja sillat. B1 Careenage/Harbour, B6 See/Get in. Ei etäisyyslukua. Wiki Bridgetown.
3. **Synagogan toinen elämä** — alkuperäinen synagoga, hurrikaanituho, uudelleenrakentaminen, myynti, lehterin muuttaminen kerrokseksi, ikkunoiden/lattian muutokset, hautausmaan rappeutuminen, palauttaminen synagogaksi, museo. B2 History/Present day; B9 museoyhteys. Tarkat vuosiluvut poistettu. Wiki Nidhe Israel Synagogue.
4. **Paraateista hevoskilpailuihin** — Garrison Savannahin historiallinen paraatialue, nykyinen laukkakilpailurata, kasarmit, varakkaiden saarelaisten ja sotilasväen kilpailuperinne, entisessä sotilasvankilassa toimiva museo. B4 johdanto/History; B6 See/Do vahvistaa nimenomaan flat racing. Ei ravirata: laukka ja ravi erotettu. Wiki Garrison Historic Area.

## 3. Teemasivu: historia / Sataman koneet ja muuttuvat talot

1. **Nimi muistaa laivan pohjan** — careening tarkoittaa aluksen kallistamista kyljelleen rungon puhdistamista/maalaamista varten; tästä Careenagen nimi. B5 setting, B6 See. Huoltoratkaisun kuvaus, ei keksittyä yksittäistä tapausta. Wiki Chamberlain Bridge.
2. **Telakka nosti koko laivan** — Blackwoods Screw Dock on historiallinen laivannostin rungon puhdistukseen ja korjaukseen; ruuvimekanismi nosti laivan vedestä. B6 See, B8 Blackwoods Screw Dock, B10. Ei rakennusvuotta eikä maailman ainoa/vanhin -superlatiivia. Wiki Bridgetown.
3. **Silta väisti veneitä** — vanha Chamberlain Bridge oli kääntösilta Careenagen sisäaltaaseen kulkeville aluksille, nykyinen on myöhempi nostosilta. B5 johdanto/History/modern bridge. Ei tarkkoja vuosia, materiaaliväitettä tai mittaa. Nykyinen silta EI karttakohteeksi eikä kuvasuositukseksi: teosraja tarkistamatta.
4. **Kellotorni vaihtoi puolta** — alkuperäinen parlamentin itäsiiven kellotorni alkoi vajota huonon perustamismaaperän vuoksi, purettiin ja korvattiin länsisiiven tornilla. B3 The Clock tower. Uusgoottilainen kokonaisuus ja korallikalkkikivi: B3 johdanto/Clock tower, B8 Parliament Buildings. Ei vajoamismittaa tai tornivuosia.

Minitehtävä vertaa vanhan kääntösillan ja telakan liikettä. Vastaukset löytyvät teemasivulta; se EI toista mitään viidestä kysymyksestä. Faktalause on oma tiivistelmä toiminnoista, ei lähdevirkkeen kopio.

## 4. Opas: viisi jaksoa

- **Perille ja liikkeelle:** Grantley Adamsin kansainvälinen lentoasema; BGI B6 Get in, nimi B1. Ei etäisyyttä: B6 suuntatieto on ristiriitainen. Bridgetown on bussikeskus, Princess Alice pohjoiseen / Fairchild Street itään ja etelään B1 Public buses, B6 Get in. Terminaalit eivät ole yksi paikka.
- **Veden ääreltä kujille:** Careenage, parlamenttirakennusten ympäristö, mutkitteleva katuverkko, synagoga+museo+mikveh. B1/B2/B6/B7/B9. Ei parlamentin sisätilojen aukiololupausta: B6 ja B8 ovat tässä ristiriitaisia.
- **Garrison omana retkenään:** keskustan eteläpuoli, laukkakenttä, kasarmit, museon entinen sotilasvankila B4/B6. Tapahtumapäivän tarkistaminen on kirjoittajan käytännön suositus. Sotilasalueen suljettuun St Ann's Fortiin ei ohjata.
- **Lounas vanhoissa varastoissa:** Careenagen vanhoissa varastoissa/laivatarvikeliikkeissä ravintoloita, baareja ja kauppoja; eteläranta jalankulkualuetta; Broad Street/ Cheapside kävelypaikkoja. B6 See/Eat. Ei ruokalajeja päätellä ravintolan nimestä.
- **Milloin kannattaa tulla:** kuiva/sateinen kausi ja verraten vähäinen lämpötilan vuosivaihtelu B1 Climate; ei sääarvoja, kuukausia tai ennusteita. Museoiden käyttö vaihtoehtona ja ajankohtien tarkistaminen ovat kirjoittajan reittisuosituksia.
- Parasta 5: Careenage, Nidhe Israel, parlamenttirakennusten ulkopuoli, Garrison, Cheapside. Hyvä tietää 4: eri satamat, terminaalien suunnat, kilpailujen ajankohta, St Ann’s Fortin suljettu sotilasalue.
- Erillistä ajantasaista matkustusturvallisuusauditointia ei tehty; poikkeuksellista turvallisuusväitettä ei esitetä.

## 5. Kohdekartta ja kohdejutut — PARTIAL 2/6–8

| Kohde | Tyyppi | Oma lähdepiste | Historiatiedot |
|---|---|---|---|
| Nidhe Israelin synagoga | rakennus | B2 Coordinates: 13.09944, -59.61528 | 1600-luvulta alkanut historia, alkuperäisen tuho, uudelleenrakentaminen, myöhemmät käyttötavat, lehterimuutos, kunnostus, museo ja mikveh B2/B9 |
| Parlamenttirakennukset | rakennus | B3 Coordinates: 13.0969861, -59.6139194 → 13.09699, -59.61392 | itä-/länsisiipi, uusgotiikka, paikallinen korallikalkkikivi, 1873 rakennusvaihe B3+B8, kokoussalit/toimistot, tornin vajoaminen ja korvaaminen B3 |

Rajaus p/n/e/w: pohjoinen 13.10244, etelä 13.09399, länsi -59.61828, itä -59.61092; noin 300 metrin marginaali varmennetuille pisteille. Ei kaupungin pistettä lainattu.

Garrison Historic Area: B4:n koordinaatti 13.09667, -59.61389 osuu parlamentin ympäristöön, vaikka saman artikkelin johdanto kuvaa Garrisonin keskustan eteläpuolella. B6 sijoittaa alueen etelään. EI käytetä ristiriitaista pistettä eikä Wikivoyagen aluepistettä vaihdeta salaa omaksi WP/WD-pisteeksi. Chamberlain Bridgen nykyinen rakenne sekä sen nykytaiteellinen muistokaari jätetään kartalta ja kuvista pois. Muita kohteita ei täytetä yleisellä kaupunkipisteellä.

## 6. Kysymykset ja tiedot

Kysymykset 5: pääkaupungin maa B1 (taso 1); mikvehin merkitys B2/B9 (3); katuverkon rakenne B1/B7 (2); ruuvitelakan nostotehtävä B6/B8 (3); Garrison Savannahin laukkakilpailurata B4/B6 (2). Vastaukset esiintyvät teksteissä. Kaikilla HTTPS-Wikipedia-lähde.

Tiedot 3: museo entisessä sotilasvankilassa B4/B6; kellotornin paikan vaihto B3; Careenage ja Deep Water Harbour eri paikkoja B1/B6. Ei isoisän ääntä.

## 7. Kuvatarpeet — B avoinna

Kaikkien roolien tiedosto/lyhyt/selite/lahde tyhjiä. 20 roolia: 3 laajaa kaupunkikantta, 8 nostoa, 1 matkailijalle-pysty, 5 opasjaksoa, 2 kohdejuttua, 1 matkakirjan valokuva. Kuvaputkelle aiheiksi laajat keskustan/Careenagen/Garrisonin näkymät; mutkitteleva katuverkko; satamien eri mittakaavat; Nidhe Israelin historiallinen kokonaisuus; Savannahin laukkakilpailualue; historiallinen aluksen kallistaminen; vanha ruuvitelakka; vanhan kääntösillan historiallinen rakenne; parlamentin historiallinen rakennuskokonaisuus; oppaan nykyiset paikat. Nykyistä Chamberlain-siltaa, muistokaarta, modernia taidetta tai valaistusteosta ei ehdoteta. Ei kuvaehdokkaita, hakua tai generointia tehty.

## 8. Epävarmat ja avoimet portit

- Täyden A:n 6–8 karttakohdetta ja kaikkien kohteiden laaja faktamäärä puuttuvat; tämä on tarkoituksella rajattu A.
- Garrisonin pistetieto ristiriitainen, jätetty pois.
- Parlamentin museon vierailu: B6 sanoo julkisen lehterin/museon olevan remontin vuoksi suljettu; B8 kuvaa kierroksia. Ei nykyistä sisäänpääsyväitettä.
- B8 rinnastaa rakennusten valmistumisen ja parlamentin institutionaalisen ikäjärjestyksen: superlatiivia ei käytetä.
- Synagogan tarkkoja perustamis-, hurrikaani-, uudelleenrakentamis-, myynti- ja kunnostusvuosia sekä mikvehin löydön vuotta ei käytetä. Telakan ja sillan tarkat rakennusvuodet poistettu. Ainoa lukijan historiallinen täsmävuosi on tehtävän kehys 1873; parlamentin rakennusvaihe tuettu kahdesta lähteestä.
- 48/48 sääprimäärivarmennus puuttuu: saatiedot null, saa.json koskematon.
- B ja riippumattomat D/E/F, teos-/kuvaoikeudet, kytkentä ja julkaisu avoinna. Paikallinen tarkistin ei ole faktatarkistus.

## 9. Pois jätetty

Väestöluku aluevirheen estämiseksi, maan rommi/sokeri/itsenäistyminen toiston estämiseksi, Washingtonin matkan yksityiskohdat lisähakujen rajaamiseksi, nykypolitiikka ja nykyrikollisuus, suojaamattomiksi varmistamattomat nykyteokset, historiallinen alkuperäiskansojen sillan tekijän varma nimeäminen lähteiden Taino/Arawak-erojen vuoksi. Kaupungin nimen selitys Tobias Bridgen ja vanhan sillan välillä ristiriitainen; etymologiaa ei esitetä varmana.
