# Pjongjang — C-tekstiluonnos 12.10.2026

Tehtävä 12. Washington kirjoitettiin ja tarkistettiin ensin. Pjongjangin C kirjoitettiin vasta, kun e10:n viidessä tavallisessa kaupungissa (male, vientiane, phnompenh, kualalumpur, bandarseribegawan) oli sisalto.json:n kaikki vaaditut tekstiosiot ja C-muistio. Niiden read-only-porttitodiste ja SHA:t ovat `valiaikainen/nopea-e10-pjongjang/e10-tavallisten-tekstiportti.json`. Toisiin kaupunkeihin ei kirjoitettu.

Kirjoitettu: artikkeli (intro 860 merkkiä, 9 virkettä, 2 kappaletta / 2 lihavointia; lisäteksti 980 merkkiä / 3 kappaletta), kansi ja ruoka-teemasivu, 8 nostoa (503–551 merkkiä), 5 oppaan jaksoa, matkailijalle-kappale, 5 parasta / 4 hyvä tietää, 5 kysymystä (tasot 1–3), 3 tietoa ja Moran-kukkulan kohdejuttu (781 merkkiä / 2 kappaletta). Teeman minitehtävä koskee pitkän elämän toivotusta, ei kaupungin kysymysten nuudelien raaka-ainetta.

Rajattu A-lähdekooste: 13 onnistunutta robots-sallittua lähdettä. Kolme tarkoituksenmukaista alkuperäislähdettä: UNESCO ICH:n raengmyon-perinne, UNESCO WHC:n Goguryeo-kulttuurikohde sekä UM:n ajantasainen maakohtainen matkustustiedote. Kolme ensimmäistä URL-yritystä antoi 404:n; niitä ei käytetty faktana. Kelttikeiton oikea linkki luettiin kaupungin sivulta ja UM:n oikea maareitti haki varsinaisen tiedotteen. Säässä ei lukuja, väestö- ja etäisyyslukujen sekä rakennusvuosien täsmällisyys jätetty pois. 1873 on väljä menneisyyden aikakehys, ei keksitty paikallinen tapahtuma; tarkka ulkoasu jää avoimeksi.

## Alkuperäinen paikallinen tarkistin

`node paakaupungit-pilvi/tyokalu.mjs tarkista e10 pjongjang --lyhyt`

Todellinen tulos: **19 virhettä, 2 varoitusta, 0 kuvaa, exit 1**. Kaikki 19 virhettä: `tiedosto puuttuu` tyhjässä kuvaroolissa. Täysi ajo paljastaa molemmat varoitukset: `kohteita 1 (pohjataso 6; perustele RAPORTTI.md:ssä)` ja `saatiedot puuttuu (kirjaa syy RAPORTTI.md:hen)`. Tekstien rakenne- tai mittavirheitä ei jäänyt. Lyhyen ja täyden ajon tulosteet ja returncode tallennettu omaan väliaineistoon. Tarkistinta ei muutettu; kuvavirheitä tai kartan vajetta ei peitetty.

## Partial-kartta ja oikeusraja

Kartalla vain Moran-kukkulan oma WP-piste: 39.04028, 125.75833. Kohde on luonnollinen kukkula ja puisto, ei siellä sijaitseva TV-torni, monumentti, riemukaari, teatteri tai muu moderni teos. Tuleva kuvavalinta saa esittää luonnollista puistomaisemaa; modernit teokset eivät saa tulla mukaan tämän nimen kautta.

Pubyokilta puuttuu oma varmennettu WP/WD-piste; kukkulan pistettä ei lainata paviljongille. Taedongmunin ja Ryongwangin pisteet on luettu mutta nykyisten korjaus-/restaurointiversioiden tekijäketju/oikeusraja on avoin. Ne jätettiin kartasta ja tulevasta kuvitusvalinnasta odottamaan auditointia, vaikka niiden paikkahistoriasta kirjoitettiin. Pyongyang Castle -sivu ei antanut riittävästi erillisen näkyvän kohteen faktoja. Taedong-joen yleispistettä ei lainattu kaupungin rantakohteelle. **6–8 karttakohteen portti on avoin**, puuttuvia kohteita ei arvattu.

## Kuvaroolit ja kuvaputki

19 roolia: valokuva 1, kansi 3, nostot 8, matkailijalle 1, oppaan jaksot 5, Moran-juttu 1. Kaikissa tiedosto, lyhyt, selite ja lahde tyhjiä. Ei kuvahakua, generointia, esikatseluita tai Commons-tiedostojen keksimistä. Tarpeet: laajat kaupungin/joen/luonnollisen puistomaiseman kansiaiheet; vanha jokiliikenteen porttipaikka ja paviljonkien historia vain oikeusketjun jälkeen; kylmä tattarinuudelikulho, talvinen juhla-ateria, taitojen opetus ja kelttikeitto; oppaan tavalliset nykypaikat ilman poliittisia/suojattuja teoksia. Matkailijalle-kuva myöhemmin maltillisena pystynä. Jos paikkakuvan oikeusketju ei ratkea, aihe jätetään kuvituksesta pois. Havainnekuvat tulevat erillisellä asset-liitteellä.

## Faktaratkaisut ja avoimet portit

- Nyky-/juntta-/konfliktipolitiikka, sotatapahtumat ja rikollisuus jätetty pois. Oppaassa vain matkailun välttämätön nykyrajoitus: tarpeetonta matkustamista ei suositella, liikkuminen ohjattua, kuvauslupa ja järjestelyt varmennettava. Matkan toteutumista tai yhteyksiä ei luvata.
- City-artikkelin “trout”-tervehdys ei vastaa varsinaista kelttikalaa; anekdootti jätetty pois, kala nimetyn ruokalajin ja oman artikkelin mukaan. Ei lähteetöntä pitkien nuudelien terveystulosta: toive pitkään elämään kuvataan perinteenä.
- Rakennusten kuolinvuosi-/tekijäketjuja ei arvata. Moderneja suojattuja teoksia ei valittu karttakohteiksi tai kuviksi.
- 1873:n yksityiskohtainen paikallinen ulkoasu/aikataso, puuttuvat karttapisteet ja A:n täysi vähimmäistaso avoinna.
- Sään 48/48 primäärivarmennus avoin; saatiedot:null, saa.json säilytetty muuttamatta.
- B, riippumaton D, korjaukset E, pääsession F, hyväksyntä, pelikytkentä ja julkaisu avoinna. Ei Git-operaatioita eikä pelimuutoksia.

Tiedostojen ja lähteiden SHA-manifesti: `valiaikainen/nopea-e10-pjongjang/sha-ja-tarkistus.json`.


## Task118 korjaus 13.10.2026
Korjauslistan tekstilöydökset käsitelty lähdepohjan ja tallennettujen sivujen avulla. Pjongjang: Mugil cephalus on virallisessa EU-komission suomenkielisessä kalanimistössä juovakeltti, ei korjauslistan ehdottama harmaakefaali: https://fish-commercial-names.ec.europa.eu/fish-names/species/mugil-cephalus_fi . Malé: UNESCO5812 vahvistaa tongue/groove/pins; selkeä termi pontti-uraliitos, https://whc.unesco.org/en/tentativelists/5812/ . Pjongjangin talvinuudelifakta oli jo maalehdessä ja korvattiin juhla-/pitkän elämän perinteen käsittelyllä. Poliittisesti herkän kaupungin rajaukset säilytetty. ISS066-E-7985 paikkaristiriita jää mediaomistajan NASA-auditointiin; teksti ei nimeä jokea. Kuva-, kartta- ja sääportit erillisiä.
```text
VIRHE pjongjang: kansikuva 3: tiedosto puuttuu
VIRHE pjongjang: kansi nosto 1: tiedosto puuttuu
VIRHE pjongjang: kansi nosto 2: tiedosto puuttuu
VIRHE pjongjang: kansi nosto 3: tiedosto puuttuu
VIRHE pjongjang: kansi nosto 4: tiedosto puuttuu
VIRHE pjongjang: matkailijalle.kuva: tiedosto puuttuu
VIRHE pjongjang: opas jakso 1: tiedosto puuttuu
VIRHE pjongjang: opas jakso 2: tiedosto puuttuu
VIRHE pjongjang: opas jakso 3: tiedosto puuttuu
VIRHE pjongjang: opas jakso 4: tiedosto puuttuu
VIRHE pjongjang: opas jakso 5: tiedosto puuttuu
VIRHE pjongjang: teemasivu ruoka nosto 1: tiedosto puuttuu
VIRHE pjongjang: teemasivu ruoka nosto 2: tiedosto puuttuu
VIRHE pjongjang: teemasivu ruoka nosto 3: tiedosto puuttuu
VIRHE pjongjang: teemasivu ruoka nosto 4: tiedosto puuttuu
== pjongjang: 15 virhettä, 3 varoitusta, 4 kuvaa
YHTEENSÄ 1 kaupunkia: 15 virhettä, 3 varoitusta
```
SHA256 e358bfaf5179e07ccf006579dcbc21bb89ef5bdf07bad7275e1073fb4a596811

Lopullinen Task118-tarkistus: kuvatiedostot/creditit, koordinaatit, rajat, sää ja vastausindeksit täsmälleen baselinen mukaiset. Tiedostohash 9bcc937be30819365f0d55c1eec1204cb56c4ea880a7849d9229b994ee9f49fe. Muuttuvat ohjeet keskitetty, kuvatekstitoisto ja merkistövirheet tarkistettu.

```text
VAROITUS pjongjang: kohteita 1 (pohjataso 6; perustele RAPORTTI.md:ssä)
VAROITUS pjongjang: saatiedot puuttuu (kirjaa syy RAPORTTI.md:hen)
```
