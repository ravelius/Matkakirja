# Santiago de Chile — rajattu A-lähdekooste 12.10.2026

Tehtävä 23, omistus vain e13/santiagodechile. Ohjeet, Dakar-mallin rakenne ja konteksti luettu. Tämä on C-kirjoituksen rajattu lähdepohja, ei täysi A-hyväksyntä. Kaikki tuotanto NASilla. Haku yhteisellä sallittu_haku.py:llä, robots ensin, redirectit tarkistettu ja vain HTTP 200 -sivut todisteina. Omat lähde-HTML:t/tekstit, manifestit ja SHA:t `valiaikainen/nopea-e13-santiagodechile/`. Ei kuvia eikä Git-operaatioita.

## 0. Luetut lähteet ja 1873-kehys

Haettu ja luettu 12.10.2026:

- S1: https://en.wikipedia.org/wiki/Santiago — Name, History, Geography, Climate, Transport, Historic places, Museums and libraries.
- S2: https://en.wikivoyage.org/wiki/Santiago_de_Chile — Understand, Get in/Get around, See, Eat; ei hintoja, aukioloaikoja tai maksuvaatimuksia.
- S3: https://en.wikipedia.org/wiki/La_Moneda_Palace — pääteksti, Colonial mint, Government palace, Architecture ja oma koordinaatti.
- S4: https://en.wikipedia.org/wiki/Mercado_Central_de_Santiago — pääteksti, rakenne ja oma koordinaatti. Ensimmäinen `Central_Market,_Santiago`-osoite palautti 404, ei käytetä.
- S5: https://en.wikipedia.org/wiki/Santa_Luc%C3%ADa_Hill — pääteksti, History ja oma koordinaatti.
- S6: https://en.wikipedia.org/wiki/Plaza_de_Armas_(Santiago) — pääteksti, History ja oma koordinaatti. Arkeologian kiistanalaiset/sekavat väitteet pois.
- S7: https://en.wikipedia.org/wiki/Estaci%C3%B3n_Mapocho — History, Cultural Centre. Ei kohdepistettä C:hen: nykyinen uudistus suojattu ja oikeusketju avoin.
- S8: https://en.wikipedia.org/wiki/Quinta_Normal_Park — pääteksti, museoalue, Transport.
- S9: https://en.wikipedia.org/wiki/Chilean_Museum_of_Pre-Columbian_Art — ohjautui oikeaan artikkeliin, pääteksti, Building, Collection. Ei kohdetta tai kuvaa nykyisestä suojatusta laajennuksesta.
- S10: https://www.memoriachilena.gob.cl/602/w3-article-661475.html — Chilen kansalliskirjaston Memoria Chilena: El cerro Santa Lucía, Presentación ja aikalaismuistioiden bibliografia.
- S11: https://www.memoriachilena.gob.cl/602/w3-article-658.html — Joaquín Toesca, Presentación, kronologia.
- S12: https://www.memoriachilena.gob.cl/602/w3-article-132542.html — La Quinta Normal, Presentación.

Muistomerkkiviraston www.monumentos.gob.cl robots-haku aikakatkaistiin: kyseisen domainin verkkohakutuloksia ei käytetä faktatodisteina eikä PDF-kiertoa tehty. Memoria Chilena on robots-sallittu ja haettu tavallisina HTML-sivuina.

1873 on kaanonin kiinteä matkavuosi, ei keksitty vierailu: kaupunki 1500-luvulta S1/S6; La Moneda oli jo rakennettu ja hallinnon käytössä S3 (myös rakennuksen vanha perusta S11), Mercado Central avattu S4; Santa Lucían puistomuutos S5/S10 sijoittuu matkavuoden molemmin puolin. S5 ja S10 tukevat työn aloitusta 1872; S10 tukee valmistumista 1874 ja sisältää vuoden 1873 työmuistion otsikon. C ei käytä näitä paikallisia tapahtumavuosia tarkkoina lukuina vaan vuosisataa ja 1873-kehystä. Asema S7 ja kansalliskirjaston nykyinen talo S1 ovat vasta 1900-luvulta, niitä ei siirretä isoisän aikaan. Historiallisten aikavertailujen riippumaton D jää avoimeksi.

## 1. Perusfaktat

S1: Chilen pääkaupunki, Andien ja rannikkovuoriston välisen Santiagon altaan kaupunki, Mapocho-joki, sisäiset erilliskukkulat Santa Lucía ja San Cristóbal. Laaksossa asutusta ennen espanjalaisen kaupungin perustamista. Plaza de Armas ruutukaavan ydin. Santiago Centro on keskustakunta, ei koko metropoli. Kontekstin 2024 väestöluku koskee comuna-kuntaa; ei käytetä C:ssä. Ei asukas-, pinta-ala-, korkeus-, talous- tai välimatkalukuja. Pallo kontekstista -33.4375, -70.65.

## 2. Kansi — 4 aihetta

1. Alameda alkoi joenhaarana: S1 History — Mapochon eteläisen haaran kuivuva uoma La Cañada, kaatopaikkakäyttö ja muuttuminen Alameda de las Delicias -kaduksi; S1/S2 yliopiston päärakennus ja kansalliskirjasto väylällä, Santa Lucía eteläreunasta rajautuu Alamedaan S5. Ei jokiuomasta keksittyä syyselitystä. Wiki Santiago.
2. La Monedan alkuperä rahapajana: S3/S11 — Joaquín Toesca, italialaissyntyinen, uusklassinen suunnittelu, valmis 1800-luvun alussa hänen kuolemansa jälkeen, rahapajatyö ja hallintokäyttö rinnakkain 1800-luvulla; nykyinen kokonaisuus myöhempine muutoksineen erotettava alkuperäisestä. Wiki La Moneda Palace.
3. Santa Lucían monet tehtävät: S5/S10 — Huelén-nimi, rakennuskiven louhinta, katoliseen kirkkoon kuulumattomien hautausmaa, 1800-luvun astronominen havaintopaikka Auringon parallaksille (S5), Benjamín Vicuña Mackennan puistomuutos S5/S10. Ei tarkkoja vuosia, korkeutta tai puistoalaa. Wiki Santa Lucía Hill.
4. Mercado Centralin rautakatto: S4 — valurauta, Glasgow, Laidlaw’n yritys, Edward Woods/Charles Henry Driver, paikallista rakentamista johtanut Fermín Vivaceta, ympärillä muuraus, katolla keskuspyramidi ja kupolitorni, korvasi palaneen Plaza del Abaston. Ei tarkkaa avaamis-/palovuotta, vaikka 1873-aikavertailu lähteen kronologiasta. Wiki Mercado Central de Santiago.

## 3. Teemasivu historia — Vanha paikka, uusi tehtävä

1. Estación Mapocho: S7 — 1900-luvun alun asema, aseman käyttö päättyi, muutos kulttuurikeskukseksi, näyttelyitä/musiikkia/tapahtumia, suuri metallinen kattorakenne, rakennus Mapocho-joen etelärannalla. Ei asemasta keksittyä 1873-junamatkaa. Ei nykyisiä näyttelykalentereita. Wiki Estación Mapocho.
2. Quinta Normal: S8/S12 — 1800-luvun maatalouden kokeilu- ja opetuspaikka, kasvien viljely ja totuttaminen, metsä-/viini-/kasvitutkimus, myöhemmät luonnonhistorian sekä tieteen ja tekniikan museot, nykyinen virkistyspuisto ja lampi. S8 perustaminen 1841, S12 1842: C vain 1800-luku. Wiki Quinta Normal Park.
3. Esikolumbiaanisen taiteen museo: S9/S1 — Palacio de la Real Aduana eli vanha tullitalo; Sergio Larraín García-Moreno keräilijä ja perustaja, kaupungin tuki; alueita Mesoamerikasta Andeihin, keramiikka/tekstiilit; ennen eurooppalaisten saapumista, ei vain nykyinen Chile. Ei kappale-/ikä-/laajuuslukuja eikä suojattua nykylaajennusta kohteeksi/kuvaksi. Wiki Chilean Museum of Pre-Columbian Art.
4. Kansalliskirjasto: S1 Museums and libraries — laitos 1800-luvun alusta, nykyinen talo 1900-luvun alusta Alamedan varrella; erillinen Biblioteca de Santiago Matucanan alueella 2000-luvulta. Ei väitetä nykyisen talon olleen olemassa 1873. Wiki Santiago.

Minitehtävä: Quinta Normalin alkuperäinen maataloustehtävä. Vastaus sivun nostossa; kaupungin visa ei kysy samaa.

## 4. Opas

5 jaksoa: (1) S1/S2 Arturo Merino Benítez (SCL), Pudahuel länsipuolella, bussit ja järjestetyt kuljetukset, Pajaritos vaihtopaikka, metro/bussit/kävely; (2) S6 Plaza de Armas, S3 La Moneda, S4 Mercado Central; (3) S5 Santa Lucía näköala/portaat, S8/S12 Quinta Normal museoineen, S9 esikolumbiaaninen museo; (4) S2 completo, italiano sisältää tomaattia/avokadoa/majoneesia, pienet voileipäpaikat ja katukeittiöt, mote con huesillo persikka+vehnä, Mercado Centralin ravintolat S2 See; (5) S1 lämmin/kuiva kesä ja viileämpi/sateisempi talvi, eteläisen pallonpuoliskon vuodenajat, laakson talvinen savusumu. Ei säänumeroita eikä lämpötilasuperlatiiveja. Ruokaoppaan suomalaiselle ymmärrettävät termit; lippuvärietymologia jätetty pois, koska sitä ei luetussa lähteessä sanota.

Parasta 5: aukio, Santa Lucía, esikolumbiaaninen museo, kauppahalli, Quinta Normal. Hyvä tietää 3: alueen laajuus, kukkulan portaat, vuoriston näkymä ei aina kirkas. Ei nykyrikollisuutta tai vahvistamatonta turvallisuusluokitusta.

## 5. Kartta — partial 4/6

Pisteet vain kohteen omalta WP-sivulta, pyöristys 5 desimaaliin:

- Plaza de Armas, aukio: S6 -33.43791, -70.65036. 1500-luvun aukio; ei nykyisiä muistomerkkejä kohteiksi. Juttu S1/S6.
- La Moneda, rakennus: S3 -33.44302, -70.65387. Alkuperäisen Toescan rahapajan historiallinen rakennusaihe; Toescan kuolema 1799 S3/S11, yli 70 v. Nykyinen kulttuurikeskus, nykytaide tai uudisrakennuksen osat eivät omia kohteita/kuvia. Juttu S3/S11.
- Mercado Central, rakennus: S4 footer-tarkkuus -33.4336833, -70.6510278 → -33.43368, -70.65103. Infobox antaa sekuntipyöristyksen -33.43361, -70.65111; samassa rakennuksessa pieni ero, tarkempi footer valittu. Historiallinen 1800-luvun rakennus; Woods/Driver/Vivaceta ovat 1800-luvun tekijöitä. Tarkka tekijäketju ja kuva valitaan B:ssä. Juttu S4/S2.
- Santa Lucían kukkula, luonto: S5 -33.44000, -70.64400. Kohde on fyysinen luonnonkukkula, jonka nimi on myös Huelén, ei suojatun rakennuksen naamiointi. Yksittäiset puiston patsaat, portaalit, suihkulähteet tai uusitut rakennukset eivät kohteita eikä niistä tilata kuvaa. Juttu S5/S10.

Rajaus kaikkien ympärille noin 300 m marginaalilla: pohjoinen -33.43068, etelä -33.44602, länsi -70.65737, itä -70.64050.

6–8 portti auki: lisää historiallisia rakennuksia vain omien pisteiden ja oikeusketjujen varmennuksen jälkeen. Museo S9 laajennettu nykyarkkitehdin suunnittelulla; Estación Mapocho S7 uudistettu elävien/uudemmin kuolleiden arkkitehtien toimesta, joten kummastakaan ei tässä kohdetta tai kuvaa. Quinta Normalin oma piste on tiedossa S8, mutta laaja puiston nykyinen maisema-/rakennusketju jätetty myöhemmäksi, ei liimata mukaan numeroa täyttämään.

## 6. 5 kysymystä, 3 tietoa

Visa: Chile S1; La Moneda rahapajaksi S3; rautarakenne Glasgow/Skotlanti S4; museon entinen tullitalo S9; Santa Lucían Auringon parallaksin tutkimus S5. Tasot 1, 2 ja 3; neljä eri uskottavaa vaihtoehtoa, eivät toisen pelikaupungin nimiä.

Tiedot: kolikot ja hallinto samassa La Monedassa S3; Quinta Normal tutkimus/opetus S12; kansalliskirjasto laitoksena taloa vanhempi S1. Ei isoisän ääntä.

## 7. Kuvatarpeet

Kaikki 22 roolia täysin tyhjiä: valokuva 1, kansi 3, nostot 8, matkailijalle 1 pysty, opas 5, kohdejutut 4. Aiheet teksteissä; kohdekuvat alkuperäiseen historialliseen rakennusaiheeseen tai fyysiseen kukkulaan ilman suojattuja nykyteoksia. Mapochon uusi kulttuuritila ja esikolumbiaanisen museon nykylaajennus eivät kuvituksen teosaiheita ilman oikeusketjua. B ei tehty. Ei Commons-hakuja, generointia tai keksittyjä tiedostonimiä/creditia/selitteitä.

## 8. Ristiriidat, epävarmat ja portit

- La Moneda: S3 avaaminen 1805, S11 luovutus 1802; eri vaiheiden täsmällistä eroa ei selitetä arvaamalla. C 1800-luvun alku.
- Quinta Normal: S8 1841, S12 1842; C 1800-luku.
- Mapochon artikkeli S7 sisältää 1900-luvun alun rakentamisen rinnalla väitteen 1800-luvun kansainvälisten matkustajien asemasta. Jälkimmäinen hylätty anakronismina; C asema vasta 1900-luvulta.
- Santa Lucían S5 tarkkoja korkeus-/koko-/laukauksen aikataulutietoja ei käytetä. S10 vahvistaa puistomuutoksen vaiheet; historiallinen 1873-vertailu tarkistetaan vielä D:ssä. S6:n vaikeaselkoista inkakeskusväitettä ei C:hen.
- Sää: saatiedot null; 48/48 primäärivarmennus puuttuu. Olemassa olevaa saa.jsonia ei muuteta eikä siitä tehdä käsinkopioituja lukuja. Oppaassa vain laadullinen S1-kuvaus.
- B kuvat, täydentävä A-kohde/oikeusketju, riippumaton D, E/F, hyväksyntä/pelikytkentä/julkaisu avoinna.

## 9. Poisjätöt

Ei Chilen maanlehden itsenäisyysjulistusta, Atacamaa, maanjäristyksen kaukovaikutusta, Carménèreä, kuoppakypsennystä, maissipiirakkaa, savustettua maustetta tai soitinaiheita. Ei Valparaíson hissejä, merireittihistoriaa, Nerudan taloja tai sanomalehteä. Ei lähinoston MM-ottelun väkivaltaa. Ei nykyhallitsijoita, puolueita tai nykykonflikteja. Ei suojattuja nykyveistoksia tai nykylaajennuksia kartalle, ei fiktiivistä isoisän toimintaa eikä väestöalueiden sekoittamista.
