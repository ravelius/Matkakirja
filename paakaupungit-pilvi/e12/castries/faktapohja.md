# Castries — rajattu A-faktapohja, tehtävä 19

Luettu ja kirjoitettu 12.10.2026 NAS-kloonissa e12. Tämä on C-kirjoituksen lähdekooste, ei täyden A/B/D/E/F-putken hyväksyntä. Omistus: vain Castries ja Kingstown. Lähdetallenteet: sessio-72-20261011/valiaikainen/nopea-e12-castries/. Tavalliset sivut haettiin yhteisellä sallittu_haku.py-apurilla; robots ja uudelleenohjaukset tarkistettiin.

## 0. Luetut lähteet ja 1873-kehys

Kaikkien onnistuneiden tallenteiden hakupäivä 12.10.2026. HTML ja siitä luettu teksti sekä SHA ovat omassa lähdekansiossa.

- C1: en-Wikipedia, [Castries](https://en.wikipedia.org/wiki/Castries), johdanto, History, Tourism, Transport, nimi/Etymology. Tallenne castries-wp. Sisäiset vuosivirheet rajattu pois (kohta 8).
- C2: en-Wikivoyage, [Castries](https://en.wikivoyage.org/wiki/Castries), Get in, Get around, See, Do, Buy, Eat. Tallenne castries-voy. Ei hintoja, aukioloaikoja tai sen vanhaa asukaslukua.
- C3: en-Wikipedia, [Castries Market](https://en.wikipedia.org/wiki/Castries_Market), pääteksti ja sivun oma koordinaatti. Tallenne market-wp.
- C4: en-Wikipedia, [Derek Walcott Square](https://en.wikipedia.org/wiki/Derek_Walcott_Square), pääteksti ja sivun oma koordinaatti. Tallenne square-wp.
- C5: en-Wikipedia, [Morne Fortune](https://en.wikipedia.org/wiki/Morne_Fortune), pääteksti ja sivun oma koordinaatti. Tallenne morne-wp.
- C6: en-Wikipedia, [W. Arthur Lewis](https://en.wikipedia.org/wiki/W._Arthur_Lewis), henkilön johdanto ja Biography. Tallenne lewis-proper-wp. Arthur Lewis -sivu oli täsmennyssivu, sitä ei käytetä henkilölähteenä.
- C7: en-Wikipedia, [Derek Walcott](https://en.wikipedia.org/wiki/Derek_Walcott), Early life and childhood, Career, Legacy. Tallenne walcott-wp.
- C8: Nobel Foundation, [Sir Arthur Lewis – Biographical](https://www.nobelprize.org/prizes/economic-sciences/1979/lewis/biographical/), omaelämäkerta. Tallenne nobel-lewis. Opettajavanhemmat, kirjurin työ, konekirjoitus ja arkistointi, kaupalliset opinnot ja uran yliopistot.
- C9: Nobel Foundation, [Derek Walcott – Biographical](https://www.nobelprize.org/prizes/literature/1992/walcott/biographical/). Tallenne nobel-walcott. Castriesissa syntyminen, äidin koulu, saaren opinnot, Trinidad ja Boston.

1873: Castries oli jo kaupunki (C1). Torirakennus on 1800-luvun lopulta (C3), joten myöhempi rakennus ei ollut olemassa isoisän matkavuonna. Walcott syntyi 1900-luvulla (C7+C9), joten hänen nimensä ei ollut aukion nimenä 1873. Morne Fortunella oli ranskalaiskaudella rakennettu ja brittien haltuun siirtynyt sotilasalue (C5; 1700-/1800-luku, ei tarkkoja rakennusvuosia). Ei isoisän käyntejä, reittiä, tekemisiä tai lainauksia.

## 1. Perusfaktat

- Saint Lucian pääkaupunki, luonnonsatama ja laiva-/bussiliikenteen solmukohta (C1–C2; pääkaupunkiasema myös konteksti.json).
- Aikaisempi nimi Carénage. Nykyinen nimi viittaa Charles Eugène Gabriel de La Croix, markiisi de Castriesiin, Ranskan laivasto- ja siirtomaaministeriin. Arvonimi liittyy Etelä-Ranskan Castriesin kuntaan (C1). Ei varmaa nimenvaihdosvuotta.
- Englanti virallinen ja ranskaan pohjautuva kreoli arjessa: konteksti.json, maanPerustiedot, ei uutta kieltä koskevaa tarkkaa lukua.
- Väestö C-tekstissä pois. Kontekstin 36 431 / 2022 tarkoittaa Castries Cityn ja Castries Suburbanin kotitalousväestön summaa, ei koko piiriä; sitä ei esitetä pelkän kaupungin lukuna. Ei uutta PDF-hakua.

## 2. Kansi: neljä eri aihetta

1. Höyrylaivan ostoslista: hiilikauppa, sitä palvelleet laiturit, höyrylaivojen saapuminen; nykyristeilyalukset ja Pointe Seraphine (C1 History/Tourism, C2 Understand/Get in). Laiturin vuosia ei käytetä. wiki Castries.
2. Ministeri jäi kartalle: Carénage, markiisi, ministerin tehtävä, Ranskan samanniminen kunta, kielihistorian rinnakkaisuus (C1 Etymology/History, konteksti). wiki Castries.
3. Tori sai oman jatko-osan: Liverpoolin Bruce & Still, 1800-luvun lopun rakennus, alkuperäinen tavarakirjo, kalamyynnin/teurastuksen muutos, Vendor’s Arcade ja jalankulkijoiden ruuhkan vähentäminen (C3; sijainti/ruoka C2). Tarkat rakentamis-/avaamisvuodet pois. wiki Castries_Market.
4. Vihreä kilpi kertoo kyydistä: yksityiset reittibussit Castriesista saaren eri osiin, vihreä kilpi ja M-alkuinen tunnus (C1 Transport); Gros Islet ja Soufrière reittisuuntina (C2 Get around). Ei hintoja tai reittinumeroita. wiki Castries.

## 3. Teemasivu: historia — Satamasta maailmalle

1. Tulipalot 1800-luvun alkupuolella ja 1900-luvun puolivälissä, jälleenrakennus (C1 History; myös nykyinen kevytSisalto). Ei tarkkoja palovuosia tai uhrilukuja.
2. Aukion eri nimet: Place d’Armes, Promenade Square, Columbus Square ja Derek Walcott Square; katedraali ja keskuskirjasto laidalla (C4). Place d’Armes = aseaukio, promenade = kävely; tämä on käännös, ei lähteen ulkopuolinen väite aukion todellisesta käytöstä.
3. Arthur Lewis opettajien perheestä, kirjurin työ ja käytännön taidot, kaupalliset opinnot ja myöhempi taloustiede/Nobel-muistopalkinto (C6+C8; college C5). Ei täsmällisiä ikä-/vuosilukuja.
4. Walcottin opettajaäiti lausui runoja; äiti rahoitti painamisen Trinidadissa; poika myi kirjoja ystäville ja sai kulut takaisin (C7 Early life). Runot/näytelmät ja Nobel (C7+C9). Ei teoskatkelmia, suojattujen teosten kuvia tai teosnimisiä karttakohteita.

Minitehtävä: aseisiin viittaava vanha aukion nimi; vastaus nimien nostossa. Ei toista viisikon maata, hiiltä, Walcottin palkintoalaa, M-kilpeä tai lentoasemaa. Faktan muotoilu on oma.

## 4. Opas

- Perille: George F. L. Charles Airport Castriesin lähellä, IATA SLU (C1 Transport, C2 Get in). Hewanorra Vieux Fortin luona etelässä (C1); ei täsmämatka-aikaa. Pointe Seraphine (C1+C2), bussit (C1+C2).
- Keskusta: tori/Jeremie Street, Vendor’s Arcade, aukio, katedraali ja keskuskirjasto (C2–C4).
- Nähtävää: Morne Fortune etelässä; historiallinen sotilasalue, oppilaitokset, pohjoispuolen näkymät (C5+C2). Vigien ranta (C1+C2).
- Ruoka: paikalliset ruokapaikat torin viereisellä kujalla/Jeremie Streetillä ja Vendor’s Arcadessa, kasvikset/yrtit/mausteet (C2+C3). Ei ilman lähdettä nimettyä kansallisruokaa.
- Milloin: matkustustapa ja siirtyminen etelän lentoasemalta; ulkokohteet ja matkapäivän ennusteen tarkistaminen. Ei ilmastonormaalien lukuja eikä kuukausikohtaista suositusta.
- Parasta 5: tori, aukio, kukkula, Vigien ranta, torin ruoka. Hyvä tietää 3: eri kentät, bussit, Castries vs. muu saari. Pitonit muualla saarella: konteksti maanPerustiedot, ei kaupungin kohteeksi.
- Turvallisuus: ei varmennettua poikkeavaa UM-havaintoa; ei turvalliseksi julistamista eikä keksittyä rajoitusta.

## 5. Kohdekartta — partial 3/6–8

Koordinaatit kohteen omalta Wikipedia-sivulta, eivät kaupungin pisteestä. Kartta rajattu eteläisen kukkulan ja keskustan ympärille noin 300 m marginaalilla.

| Kohde | Tyyppi | lat | lon | Paikkalähde ja aika |
|---|---|---:|---:|---|
| Castriesin tori | rakennus | 14.01180 | -60.98940 | C3; 1800-luvun loppu, Bruce & Still. Ei uudempaa taideteosta kohteena. |
| Derek Walcottin aukio | aukio | 14.00861 | -60.99056 | C4; historiallinen paikka, nykyinen nimi 1900-luvun lopulta. Ei aukion patsaita kohteeksi. |
| Morne Fortune | luonto | 13.98886 | -60.99137 | C5; aidosti maaston kukkula, ei suojatun rakennuksen naamio. Sotilasalue historiallisena taustana. Ei muistomerkkiä, hautamuistomerkkiä tai modernia college-rakennusta kohteeksi. |

Jutut kertovat rakennuksen/aukion/kukkulan historian ja vuoden 1873 tilanteen. Katedraalin sisämaalaukset ja muut modernit teokset sekä nykyiset oppilaitosrakennukset on rajattu pois kuvatilauksesta. Lisäkohteita ei keksitty; 6–8-portti avoin.

## 6. Kysymykset ja tiedot

Kysymykset: maa C1; höyrylaivojen polttoaine C1; Walcottin palkintoala C7+C9; M-kilpi C1; George F. L. Charlesin kenttä C1+C2. Kaikki vastausten aiheet tekstissä. Tiedot: ministerin nimi C1, Vendor’s Arcade C3+C2, college Morne Fortunella C5.

## 7. Kuvatarpeet

21 roolia: 3 kansi (satama, aukio ympäristöineen, kukkula/satamanäkymä), 8 nostoa, matkailijalle pysty, 5 opasjaksoa, 3 kohdejuttua, 1 matkakirjan valokuva. Kaikki kentät tiedosto/lyhyt/selite/lahde tyhjiä. Ei kuvaehdokkaita eikä hakuja. Kuvaputki ja kuvien myöhempi katselu ratkaisevat lopulliset selitteet; kirjoittaja ei keksi kuvan sisältöä.

## 8. Epävarmat ja hylätyt

- C1 antaa nimenvaihdokselle 1756 ja 1785. Vuotta ei valita, käyttöön vain henkilöyhteys.
- C1 sisältää lauseen "In 1835 ... in 1642". Laiturivuosi kokonaan pois; myös ensimmäisyys/ensimmäisen höyrylaivan vuosi pois.
- Castries Marketin tarkat rakennus- ja avausvuodet vain yhdellä luetulla lähteellä: käytetään 1800-luvun loppua. Sama periaate palovuosissa ja linnoitushistoriassa.
- Arthur Lewis oli täsmennyssivu. Käyttöön vain W. Arthur Lewis ja C8; ei täsmennyssivun sekoittamista henkilöön.
- Matkailuviranomaisen stlucia.org-linkki epäonnistui robots-tason 301-uudelleenohjaukseen; ei sisältöä luettu/käytetty. SLASPA:n vanha about-linkki palautti 404; ei käytetty. Mahdollinen National Trust -täydennys kirjataan erikseen muistiinpanossa.
- Sää 48/48 primäärivarmennus avoin. saatiedot null, saa.json koskematon.

## 9. Poisjätöt

Ei kansiaiheen Pitoneja, valtion itsenäistymiskertomusta tai kevyen kuvauksen pelkkää toistoa omiksi nostoiksi. Tulipalot ja tori syvennetään lähteiden yksityiskohdilla. Ei nykypolitiikkaa, sotakohtauksia tai kriminaliteettia. Ei kuvahakua/generointia. Ei git-, peli- tai julkaisumuutoksia.
