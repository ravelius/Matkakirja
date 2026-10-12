# Georgetown — rajattu A-lähdekooste, 12.10.2026

Tila: C-kirjoitusta tukeva rajattu A, ei täysi A-hyväksyntä. Omistus e13/georgetown. Oma konteksti luettu; kloonin AGENTS/CODEX/PILVIOHJE ja sitovat yhteisresepti/spec-mantereet/kaupunkilehtiohje ovat byteittäin samat kuin ensimmäisen oman kaupungin e12-kloonissa. Dakar-malli luettu ja tallennettu omaan NAS-väliaineistoon. Ei Git-operaatioita tai pelimuutoksia.

## 0. Lähteet ja hakutodisteet

Yhteinen `valiaikainen/sallittu_haku.py`: robots.txt ennen sivua, polkutarkistus, redirectit ja yhteinen 1s-verkkolukko. HTML/tekstit omassa `valiaikainen/nopea-e13-georgetown/`-kansiossa; hakuloki- ja SHA-ote `lahdetodisteet.json`. Luettu 12.10.2026.

- S1 https://en.wikipedia.org/wiki/Georgetown,_Guyana — lead, History, Geography, Transportation, Points of interest.
- S2 https://en.wikipedia.org/wiki/Stabroek_Market — lead, Construction, Market, kohteen oma Coordinates.
- S3 https://en.wikipedia.org/wiki/Georgetown_Lighthouse,_Guyana — infobox, lead, Coordinates. Ensimmäinen `Georgetown_Lighthouse` oli täsmennyssivu, ei faktalähde; korjattu maan sisältävään otsikkoon.
- S4 https://en.wikipedia.org/wiki/Guyana_Botanical_Gardens — lead, Description, History, Environs, Coordinates. `Georgetown_Botanical_Gardens` palautti saman artikkelin sisäisen redirectin; ei kaksi riippumatonta lähdettä.
- S5 https://en.wikipedia.org/wiki/St._George%27s_Cathedral,_Georgetown — lead, infobox ja Coordinates. Sisäiset ristiriidat vuosissa/korkeudessa, ks. 9.
- S6 https://en.wikipedia.org/wiki/Promenade_Gardens — lead, ympäristö ja Coordinates.
- S7 https://en.wikipedia.org/wiki/St._Andrew%27s_Kirk,_Georgetown — lead/history ja Coordinates.
- S8 https://en.wikivoyage.org/wiki/Georgetown_(Guyana) — Understand/Climate, Get in, Get around, See, Eat, Stay safe.

HTTP 404: `St._Andrew_Kirk,_Guyana`, ei käytetty. National Trust of Guyanan Historic Stabroek -primäärisivu `https://nationaltrust.gov.gy/history-of-georgetown/historic-stabroek/` palautti HTTP 503; ei käytetty todisteena. Ei estettyjen polkujen tai PDF:n kiertoa. S8:n selvästi virheellistä väestöväitettä, vanhoja hintoja, hotelleja, lentoyhtiö-/vuorotietoja ja hassua julkkismainintaa ei käytetty.

## 1. Perustiedot ja 1873-kehys

- Guyanan pääkaupunki, Atlantin rannikko, Demeraran suun itäranta; hallinnon, kaupan ja rahoituksen keskus (S1 lead/Geography). Ei superlatiivista väkiluku-/suurin-kaupunkiväitettä.
- Kaupunki perustettiin 1700-luvun lopun lyhyen ranskalaismiehityksen aikana; Longchamps → hollantilainen Stabroek → brittiläinen Georgetown, nimetty Yrjö III:n mukaan. Stabroek säilyy kaupunginosassa (S1 History) ja torissa (S2).
- Georgetownin majakka ja St. Andrew's Kirk olivat olemassa ennen vuotta 1873: S3 ensimmäinen/uusi majakka 1800-luvun alussa, S7 kirkon rakentaminen/avaaminen 1800-luvun alussa. Tarkkoja vuosia ei tekstiin.
- Nykyinen Stabroek Marketin halli ja St. George's Cathedral vasta 1800-luvun loppupuolella (S2 Construction, S5 rakennusvuosien eri versiot); ei vuoden 1873 havainnoiksi.
- Kontekstin 125 683/2022 koskee laskennan Georgetownia, mutta kaupunki/taajama-laajuus ei saa sekoittua S8:n eri lukuun. Asukasluku jätetään luonnoksesta pois kokonaan.

## 2. Kansi — 4 nostoa

1. Stabroek Market: rauta/teräsrakenne ja kellotorni; korut, vaatteet, elintarvikkeet; alue taksi-/minibus- ja Demeraran jokilauttaliikenteen solmu (S2 lead/Market). Tori on arjen risteys, ei superlatiivia. Nimi Stabroek lähteestä S1.
2. Botanical Gardens: manaattilampi eläintarhan lähellä mutta ulkopuolella, manaatteja alueella 1800-luvun loppupuolelta; myös National Parkissa. Puutarha hylätyn Plantation Vlissengenin sokeritilan maalla, kaupungin silloisella itärajalla (S4 Description/History, S1 Points of interest ympäröivät asuinalueet). Ei eläinten nykyisiä lukumääriä eikä ruokintaohjeita.
3. St. George's Cathedral: uusgotiikka, puurakenteinen, Arthur Blomfield, Church Street, anglikaanisen piispan istuin, kansallinen muistomerkki; 1800-luvun loppu (S5). Vuosia ja korkeutta ei täsmennetä ristiriidan vuoksi. Ei maailman korkeimpia -superlatiivia.
4. Lentokenttänimet: Cheddi Jagan entinen Timehri, kaupungin eteläpuolella Demeraran rannalla; lähempänä oleva Eugene F. Correia entinen Ogle. Jälkimmäisellä myös helikopteritoimintaa merellä tapahtuvan öljy-/kaasutuotannon tueksi (S1 Air). Ei aikataulua, etäisyyttä, IATA-koodeja tai palvelulupausta. Vanha ja uusi nimi kuuluvat samalle kentälle, kaksi kenttää eikä neljä.

## 3. Historia — 4 nostoa

- Longchamps, Stabroek, Georgetown ja nimikerrosten säilyminen (S1 History/S2 torin nimi); ei tarkkoja perustamis-/nimeämisvuosia.
- Maanpinta paikoin nousuveden korkeutta alempana; merivalli ja kanavat/kokers-sulut vedenpoistoon. Hollantilainen ja brittiläinen rakennuskerros, ruudukon rinnalla kanavat (S1 Geography/Points of interest, S8 See). EI tarkkaa 0,91/1/2 metrin lukua eikä keskimääräisen merenpinnan väitettä. Porttien aukaisun vuorovesiaikataulua ei arvata.
- Majakka: Water Street, greenheart-paaluperustus, kivinen ylöspäin kapeneva torni, parveke/lyhty, punavalkoraidat (S3 infobox). Ensimmäinen hollantilaisaikana, nykyinen varhain 1800-luvulla. Kivisen tornin puinen perustus suoraan lähteestä, ei päätelty maan olosuhteiden syyksi.
- St. Andrew's Kirk: hollantilainen reformoitu hanke keskeytyi rahavaikeuksissa; skotlantilaiset presbyteerit avasivat; Brickdamin koilliskulma parlamentin lähellä; koulu, konsertit ja resitaalit (S7). Ei nykyistä kirkon kutsumista hollantilaiseksi S8:n epätarkan kuvauksen perusteella. Ei "ensimmäinen kirkko" -superlatiivia eikä nykyistä politiikkaa.

## 4. Opas — 5 jaksoa

- Lentoaseman nykyinen/vanha nimi ja sijainti S1/S8; taksit/pikkubussit, torialueen solmu S1/S2/S8. Sovittu kuljetus, hinta etukäteen ja päivällä liikkuminen ovat S8 Get around/Stay safe -ohjeiden pohjalta käytännön varautumista. Ei hintoja tai taksiyrityksiä.
- Tori ja Church Streetin katedraali S2/S5; nykyinen vierailukäytäntö tarkistettava, ei aukiololupausta.
- Botanical Gardens / Promenade Gardens / Parade Ground pidetään erillisinä paikkoina (S4/S6/S8). Eläintarha kuvan kohteena ei ole puutarha, eikä puutarhan piste mene eläintarhan rakennukselle.
- Torin cookshops ja kaupungissa curry, roti, dhalpuri; kasvis-/liharuokia (S8 Eat). Ei hintoja eikä vanhojen yritysten aukiololupauksia.
- Trooppinen ympärivuotinen kosteus; sateisemmat/kuivemmat jaksot ilman täysin kuivaa kautta (S1 Climate, S8 Climate). Ei kuukausi-, aste- tai millimetrilukuja. Ajantasainen matkustusturvallisuuden viranomaisvarmennus avoin; yleinen kuljetus-/päiväaikaneuvo ei lupaa turvallisuutta. Ei nykyistä rikollisuusaihetta lehteen.

## 5. Kohdekartta — partial 3/6

| Kohde | Tyyppi | Oma WP-piste → tallennus | Lähde | 1873 / rajaus |
|---|---|---|---|---|
| Georgetownin majakka | rakennus | 6.8236966, -58.1643569 → 6.82370, -58.16436 | S3 Coordinates | 1800-luvun alun torni, olemassa ennen 1873. Ei modernia valaistusta teoskuvana; vanha toiminnallinen majakkarakenne. |
| Promenade Gardens | luonto | 6.81661, -58.16626 | S6 Coordinates | Nykyinen puutarha. Perustamisajankohta/1873 avoin, aika tyhjä. Ei suojattua Mahatma Gandhi -patsasta tai soittolavaa kuvan aiheeksi. |
| Guyana Botanical Gardens | luonto | 6.80547, -58.14602 | S4 Coordinates | 1800-luvun loppupuolen puutarha; perustamisen täsmällinen 1873-suhde avoin. Ei Seven Pondsin/mausoleumien/veistosten kuvia tai nykyistä politiikkaa. |

Rajaus omien pisteiden ympärillä. Koordinaatteja ei oteta S8:n kartoista; sen eri Promenade/Botanical-pisteet jätetään pois. Kohdejutut käyttävät yllä olevia faktoja, puutarhoissa S8:n trooppisia kasveja/palmuja/lumpeita. Majakan punainen/valkoinen valon sektori S3 infobox, ei nykyisten lamppujen teknistä speksiä. Promenaden eteläpuolen Parade Groundin 1800-luvun alun orjuutettujen kapinan teloitukset S6 lead; kerrotaan neutraalisti ilman tarkkaa vuotta tai yksityiskohtia. Paikat eivät yhdisty samaksi kohteeksi.

Marketin, Cathedralin ja Kirkin omat pisteet löytyivät, mutta tekijä-/rakennusketjuja ei ole tässä rajatussa A:ssa auditoitu; niitä ei nosteta tähän karttaan. Ei suojattujen kohteiden naamiointia luontopisteiksi. Täysi 6–8 portti avoin, ei väitettä että kaupungissa olisi vain kolme kohdetta.

## 6. Sää

`saatiedot:null`. 48/48 primääriauditointi avoin. Ei saa.json-muutoksia eikä itse kopioituja sääaseman numeroita. Oppaan laadullinen ilmastokuvaus S1/S8, ei lämpötila-/sadekauden kuukausilukuja.

## 7. Kysymykset, tiedot ja minitehtävä

Viisi kysymystä: Demerara S1, manaatit S4, puukatedraali S5, vedenpoiston kokers S1, Stabroek-nimi S1/S2. Tasot 1,1,2,3,2. Kolme tietoa: kanavat/sulut S1, torin liikennesolmu S2, manaatit eläintarhan ulkopuolisessa lammessa S4. Tehtävä: Kirkin hankkeen loppuun vienyt skotlantilainen yhteisö; vastaus historian neljännessä nostossa, ei sama visakysymys.

## 8. Kuvat ja poisjätöt

21 tyhjää kuvapaikkaa: 1 matkakirjakuva, 3 kansikuvaa, 8 nostokuvaa, 1 oppaan avaus, 5 jaksoa, 3 kohdetta. Kaikkien neljä kuvakenttää tyhjiä, ei kuvahakuja/generointia eikä keksittyjä nimiä. Kansi vaatii eri puolten laajoja näkymiä. Oikeusketju arvioitava rakennuksille ennen kuvaa, puutarhakuvissa modernit patsaat/mausoleumit/valaistukset pois.

## 9. Ristiriidat ja avoimet portit

- S5 St. George's Cathedral: infobox 1889–1894/consecrated 1894, lead avaus 1892/valmis 1899. S8 myös eri korkeus (45 m) vs S5 (43,5 m). Luonnokseen vain 1800-luvun loppu/puu/uusgotiikka, ei tarkkaa rakennusvuotta tai korkeutta.
- S1 listaa torin yhteydessä 1792 mutta S2 nykyisen hallin 1880–1881; markkinapaikan ja nykyisen rakennuksen iät erotetaan. Vuonna 1873 ei tätä nykyistä hallia. Tarkat vuodet pois.
- S1/S8 vedenkorkeusluvut/laajuus epäyhtenäisiä. Kirjoitetaan nousuveden korkeudesta, ei metreistä eikä arvausta keskimerenpinnasta.
- S8 puutarhapisteet eroavat omista WP-pisteistä; vain oman kohteen piste. S8:n puutarha "inside zoo" vs S4 "next to zoo" ratkaistaan oman artikkelin täsmällisellä manaattilammella eläintarhan ulkopuolella.
- Promenade Gardensin perustaminen/1873 ja Botanical Gardensin täsmäperustaminen/1873 avoimia. Pelaajatekstiin ei auditoinnin metatekstiä tai keksittyä 1873-ulkoasua.
- A rajattu, B kuvat, riippumaton D, E/F, täysi kartta, sää, nykyinen matkustusturvallisuus ja vierailukäytännöt avoimia. Ei hyväksyntää, pelikytkentää tai julkaisua.
