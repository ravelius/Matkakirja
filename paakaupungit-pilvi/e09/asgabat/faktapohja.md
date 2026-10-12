# Ašgabat — rajattu A-lähdekooste C-kirjoitukselle

Tilanne 12.10.2026: lähteisiin perustuva tekstiluonnos, ei täysi A/B/D/E/F eikä toimitusvalmis kaupunki. Omistus vain e09/asgabat. Lähteet ja hakutodisteet NASilla `valiaikainen/nopea-e09-asgabat/`. Tavalliset HTTPS-sivut haettiin yhteisellä `sallittu_haku.py`-apurilla: robots kummallekin user-agentille ennen polkua, redirectit erikseen, globaali lukko ja vähintään sekunnin hakuväli. Ei API-kiertoa eikä kuvia.

## 0. Luetut lähteet ja 1873-kehys

Kaikki alla luettu 12.10.2026; hakujen HTTP 200 ja SHA-256 ovat oman väliaineiston `lahteet.json`-tiedostossa.

| Tunnus | Sivun otsikko, kieli ja olennaiset osiot | Osoite | Tallenne |
|---|---|---|---|
| S1 | Ashgabat, en; alku, Etymology, Urban layout, History/Russian Empire, Transport, Culture, Parks | https://en.wikipedia.org/wiki/Ashgabat | ashgabat.html/txt |
| S2 | Ashgabat, en Wikivoyage; Get in, Get around, Museums, Buy, Eat, Registration | https://en.wikivoyage.org/wiki/Ashgabat | voyage.html/txt |
| S3 | Ashgabat Botanical Garden, en; Overview, Exposure garden, sivun oma koordinaatti | https://en.wikipedia.org/wiki/Ashgabat_Botanical_Garden | botanical.html/txt |
| S4 | Turkmen Carpet Museum, en; kokoelma, Institutional authority | https://en.wikipedia.org/wiki/Turkmen_Carpet_Museum | carpet-museum.html/txt |
| S5 | Nisa, Turkmenistan, en; History, Excavations, oma koordinaatti | https://en.wikipedia.org/wiki/Nisa,_Turkmenistan | nisa.html/txt |
| S6 | Parthian Fortresses of Nisa, UNESCO, en; Description, Outstanding Universal Value | https://whc.unesco.org/en/list/1242 | nisa-unesco.html/txt |
| S7 | Dutar making craftsmanship and traditional music performing art combined with singing, UNESCO, en; elementin kuvaus | https://ich.unesco.org/en/RL/dutar-making-craftsmanship-and-traditional-music-performing-art-combined-with-singing-01565 | dutar.html/txt |
| S8 | Epic art of Gorogly, UNESCO, en; elementin kuvaus | https://ich.unesco.org/en/RL/epic-art-of-gorogly-01028 | epic.html/txt |
| S9 | Kushtdepdi rite of singing and dancing, UNESCO, en; elementin kuvaus | https://ich.unesco.org/en/RL/kushtdepdi-rite-of-singing-and-dancing-01259 | dance.html/txt |
| S10 | Turkmenistan: matkustustiedote, UM, fi; 7.9.2026, turvallisuustaso, liikenne, maan lait ja käytännöt, maahantulo | https://um.fi/matkustustiedote/-/c/TM | um.html/txt |

S1 kuvaa turkmeenikylää ennen modernin varuskuntakaupungin perustamista 1800-luvun lopulla. Tästä rajattu 1873-kehys: paikalla oli kylä; nykyinen kaupunki ei ollut vielä syntynyt. Ei isoisän reittiä, havaintoa tai tekemistä. S5–S6 kuvaavat Nisassa antiikin raunioita; tarkkaa 1873-ulkoasua ei pystytä todentamaan ja tämä sanotaan juttuun suoraan. Vuosiluku 1873 on tehtävän aikakehys. Modernin kaupungin tarkka perustamisvuosi ja radan saapumisvuosi poistettiin tekstistä, koska tässä koosteessa ei ole niille kahta riippumatonta lähdettä.

## 1. Perusfaktat

- S1: Turkmenistanin pääkaupunki; sijainti Karakumin ja Köpet Dagin välisellä tasangolla; kylä ennen nykyistä kaupunkia; rautatieyhteys Kaspianmeren suuntaan; katulinjojen säilyminen jälleenrakennuksessa.
- S1 Etymology: nyky­persian tulkinta rakkauden/kiintymyksen kaupungista; mahdollinen kansanetymologia; vaihtoehtoinen yhteys partialaisten Arsakes-nimeen. Ei romanttista perustamislegendaa eikä varmaa alkuperää.
- Asukaslukua ei käytetä: kontekstin Ašgabatin kaupungin hallintoalueen laskentatieto jää kontekstiin. Ei pinta-alalukuja.
- Kaupunkipallo kopioitu kontekstista (37.95, 58.3833); se ei ole nähtävyyskoordinaatti.
- Artikkelin kaikkien lauseiden pohja S1/S2/S4/S6/S7: marmori vain yleiskuvan orientaatiossa, rautatie ja eriytyneet kaupunginosat, maanjäristys yleisesti, museoiden sisältö, musiikin esitysperinne.

## 2. Kansi: neljä nostoaihetta

1. **Rakkauden kaupunki, ehkä**, wiki Ashgabat (S1 Etymology): persian tulkinta, tulkinnan epävarmuus, Arsakes-vaihtoehto, Askhabad/Ashkhabad-kirjoitusasut, historiallinen Poltoratsk, vanhan nimen palautuminen. Ei nimen alkuperää varmaksi.
2. **Asema sai omat naapurinsa**, wiki Ashgabat (S1 Urban layout ja Russian Empire): radan tulo 1800-luvun lopulla; rautatieläiset ja käsityöläiset aseman lähellä; matalammat ja tiheämmät talot; pienemmät puutarhat; linnoituksen hallintoydin; torin kauppiaskeskus. Vanha kaupunkikuvaus nimetään vanhaksi eikä esitetä nykyhavaintona.
3. **Esirippu, joka jäi museoon**, wiki Turkmen Carpet Museum (S4; esiripun liiallinen paino S2 Museums): Bolšoi-esiripuksi tarkoitettu kudos, liian painava käyttöön, vanhat/uudet matot, tekstiilipussit ja laukut, eri puolilta eri kuvioiset tekstiilit. Täsmälliset mitat, määrät, valmistusvuodet ja ennätys jätettiin pois. Ei nykykudosta kuvan kohteeksi ilman oikeusvarmennusta.
4. **Puutarha kokeilee kasvien kotiutumista**, wiki Ashgabat Botanical Garden (S3 Overview/Exposure): 1800-luvun lopun asema ja koulu, myöhemmin puutarha, kukkien/puiden/pensaiden kokeilu, paikallinen kasvisto, kasvihuoneet, siemenkeruu. Ei määriä, tarkkoja perustamisvuosia eikä vanhin-superlatiivia.

## 3. Teemasivu: musiikki — Soitin, ääni ja kertomus

- **Kaikuosa ja kaula kasvavat eri puissa**, wiki Dutar (S7): pitkäkaulainen luuttu; päärynämäinen kaikuosa; ohut kansi; mulperipuu kaikuosaan ja kanteen; kuivattu aprikoosipuu kaulaan; kovertaminen, hiominen, kuumentaminen, luuliima, kokoaminen. Tarkka kielten määrä ja kuumennuksen kesto jätetty pois yhden lähteen rajauksen vuoksi.
- **Kertoja vaihtaa puheesta lauluun**, wiki Music of Turkmenistan (S7): soitto yksinään vs. laulun säestys; bagshy; kertominen, laulu, improvisaatio; runous/proosa; juhlat, seremoniat, kokoontumiset. Ei paikallista esiintymispaikkaa tai säännöllistä esitysaikaa keksitty.
- **Eepos istuu esiintyjän mukana**, wiki Epic of Koroghlu (S8): Gorogly-taruperinne; proosa, runous, laulu, improvisaatio; istuen kielisoittimen säestyksellä; tapojen ja taitojen välittäminen; nais- ja miesesittäjät; mestarin opetus ja julkiset esitykset. Eepoksen sankari nimetään tarun hahmoksi.
- **Hyvä toivotus saa askelia**, wiki Kushtdepdi (S9): laulun improvisointi; kädet, eleet ja askeleet; hyvät toivotukset; seremoniat; suullinen/käytännöllinen opetus; musiikkikoulut ja kulttuurikeskukset.
- Minitehtävä: aprikoosipuu dutarin kaulaan. Ei kaupungin viittä visakysymystä toistava; vastaus samassa teemasivun nostossa, faktavirke oma muotoilu.
- Musiikkiperinteet ovat Turkmenistanin perinteitä; ei väitetä niiden syntyneen Ašgabatissa. Wikipedia-jatkolinkkien otsikot kuuluvat vielä D/F-verkkotarkistukseen.

## 4. Opas: viisi jaksoa

1. Perille/liikkeelle: kansainvälinen lentoasema (ASB S2), lentoasemabussit S1, viralliset taksit S2/S10, bussiverkko/Teke-solmukohta S2. Viisumi ja rekisteröinti tarkistettavia valmisteluja, ei täsmällisiä määräaikoja; S2/S10.
2. Maton monet tehtävät: S4 kokoelma, S10 maastavientilupa. Käyttöesineet S4. Ei lupamenettelyn nykyhintoja tai takarajoja.
3. Nisa/museo: S5–S6 arkeologia; S2 National Museum Nisa-esineet. Puutarhan pääsy varmistettava: S3 kertoo kunnostussulusta, nykyistä avautumista ei vahvistettu.
4. Ruoka: S2 Eat turkmeeniruoka/šašlik ja erilaiset istumistavat; S2 Buy Gülistanin hedelmät ja vihannekset. Ei plov- tai kansallisruoka-anekdoottia eikä nimettyjen ravintoloiden aukioloa.
5. Milloin tulla: S1 Climate kuuma kesä ja viileämpi talvi; kevät/syksy kävelyyn on laadullinen käytännön arvio. Ei ilmastonumeroita. Säärivin primääriauditointi avoin.

Parasta: mattomuseo, Nisa, museon Nisa-löydöt, Gülistan, dutar-esitys ohjelman salliessa. Hyvä tietää: maahantulo/rekisteröinti, kuvausrajoitukset, mattovienti, puutarhan pääsy. S10 turvallisuustaso tavanomainen varovaisuus; rajavyöhykkeiden luvat ovat rajoitus, ei yleistä matkustusvaaraväitettä tai nykykonfliktia.

## 5. Kohdekartta ja juttu — partial

| Kohde | Tyyppi | Oma WP-piste | Lähde ja faktat |
|---|---|---|---|
| Nisa | rakennus/arkeologinen alue | 37.96667, 58.19500 | S5 oman sivun koordinaatti; S6 maailmanperintöalue kattaa Vanhan/Uuden Nisan; Partia, kauppareitit, asuin/hallinto/uskonnolliset rakennukset, iranilaiset/hellenistiset vaikutteet, asiakirjat ja rhyton-astiat, eroosion vaikutus nykyhahmoon. |

Rajaus 37.963–37.970, 58.191–58.199 ympäröi tätä piste-ehdotusta; ei lainattu kaupunkipistettä. Kartta EI täytä kuuden kohteen minimiä eikä historiallisen keskustan vaatimusta. Nisan oma yleispiste ei ole tietyn linnoituksen tai portin piste: nimi tarkoituksella Nisa, ei Vanha Nisa. Pääsession D/F:n tulee ratkaista, hyväksytäänkö tämä erillinen arkeologinen retkikohde vai rajataanko kartta toisin.

Puutarhan oma WP-piste 37.953, 58.347 on ristiriidassa saman sivun itäistä sijaintia kuvaavan tekstin kanssa. Puutarhan karttakohde jätettiin pois. Ei uuden museorakennuksen nimeämistä luontokohteeksi; nykymuistomerkit, nykyveistokset ja epävarmojen suunnittelijoiden rakennukset eivät ole kohteina.

## 6. Kysymykset ja tiedot

Viisi kysymystä: Turkmenistan (S1, taso 1), nimen persialainen tulkinta (S1), rautatie (S1), Nisan Partia-yhteys (S5–S6, taso 3), painava esirippumatto (S2/S4). Kaikissa https-Wikipedia-lähde, neljä eri vaihtoehtoa, vihje ei anna vastausta. Opetus löytyy lehden/artikkelin teksteistä.

Kolme tietoa: erilaiset vanhat asuinalueet S1; eri puolilta erilaiset mattokuviot S4; dutarin puulajit S7. Ei isoisän ääntä, väestö-/pinta-alalukua tai sääarvoa.

## 7. Kuvatarpeet

Ei B-valintaa. Kaikki `tiedosto`, `lyhyt`, `selite`, `lahde` tyhjiä. Kuvaputkelle: kolme erilaista kaupungin yleiskuvaa oikeusrajoitukset huomioiden; nimihistorian yleisaihe; vanhan aseman ympäristö/historiallinen kaupunki; tekstiilien käyttöesineet oikeusvarmennuksen jälkeen; puutarhan kasvit ilman nykyveistoksia; dutarin rakentaminen; dutar/lauluesitys; eepoksen esittäjä; laulun ja tanssin yhteisö; matkailijalle pysty; viisi oppaan kuvaa; Nisan arkeologinen alue; matkakirjan valokuva. Ei kuvatiedostonimeä, Commons-creditiä eikä kuvatekstiä ennakkoon.

## 8. Ristiriidat ja epävarmat

- Puutarhan sijainti ja nykyinen pääsy avoinna; ei karttapistettä eikä varmaa vierailusuositusta.
- Nisan yleispiste/retkikohde ja kartan minimi avoinna. Ruinikoordinaatti kuuluu koko Nisa-sivulle, ei yksittäiseen nimettyyn rakennukseen.
- Nimen tulkinta ei varma alkuperä. Ei käytetä rakkauslegendaa.
- Kuvat, oikeudet, katselut, jatkolinkkien verkkovarmennus ja D/E/F avoinna.
- `saatiedot:null`: ei sääpoiminnan numeroita ilman primäärivarmennusta. `saa.json`-tiedostoja ei muutettu.
- Tarkat vuosiluvut, etäisyydet, ennätykset, määrät ja väestöluku jätetty pois tai yleistetty. Eri Wiki-sivujen saman lähteen kopioita ei laskettu riippumattomiksi.

## 9. Poisjätöt

Ei nykypolitiikkaa, nykykonflikteja, uutisosioita, katastrofin uhrimääriä, isoisän fiktiota, monumenttien kohteita/kuvia tai aiempien marmori-/maanjäristysnostojen toistoa. Kontekstin yleinen marmori, vuoristo ja Nisa esiintyvät orientaatiossa; uudet nostot kertovat muista, tarkemmista aiheista.
