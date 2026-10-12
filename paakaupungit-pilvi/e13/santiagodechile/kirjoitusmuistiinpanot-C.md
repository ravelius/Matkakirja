# Santiago de Chile — C 12.10.2026

Tehtävä 23, vain e13/santiagodechile. Rajattu A-lähdekooste ja kokonainen C-tekstiluonnos kirjoitettu oikeaan e13 NAS-klooniin. Dakar-mallista rakenne, ei sisältöä. Ei Git-operaatioita, uusia agentteja/sessioita, kuvahakua/generointia, pelimuutosta tai julkaisua.

## Sisältö ja mitat

- Artikkeli: intro 993 merkkiä, 9 virkettä, 2 kappaletta, 2 lihavointia; jatko 971 merkkiä, 3 kappaletta.
- Kansi 4 nostoa ja historia-teemasivu 4 nostoa, kaikki 534–581 merkkiä.
- Opas 5 jaksoa, parasta 5, hyvä tietää 3.
- Visa 5, tasot 1/2/3; tiedot 3, minitehtävä 1.
- Kartta 4 omalta WP-sivulta varmennettua pistettä, kohdejutut 4 (807–840 merkkiä).
- Kuvat 0 valittu / 0 haettu / 0 generoitu. Kaikkien 22 roolin tiedosto/lyhyt/selite/lahde tyhjiä.
- Saatiedot null, saa.jsonia ei muutettu; ei säänumeroita teksteissä.

## Alkuperäisen paikallisen tarkistimen tulos

`node paakaupungit-pilvi/tyokalu.mjs tarkista e13 santiagodechile --lyhyt`: **22 virhettä, 2 varoitusta**, exit 1. Tuloste `valiaikainen/nopea-e13-santiagodechile/tarkistus-lyhyt.txt`. Sama alkuperäinen tarkistin ilman --lyhyt-vipua tallensi varoitukset `tarkistus-kaikki.txt`-tiedostoon.

Kaikki 22 virhettä ovat `tiedosto puuttuu`: valokuva 1, kansi 3, nostot 8, matkailijalle 1, opas 5, kohdejutut 4. Varoitukset täsmälleen `kohteita 4 (pohjataso 6; perustele RAPORTTI.md:ssä)` ja `saatiedot puuttuu (kirjaa syy RAPORTTI.md:hen)`. Muita teksti-, kysymys-, mitta-, avain-, koordinaatti- tai rakennevirheitä ei ilmoitettu. Tarkistinta ei muutettu. Ei nollavirheinen kokonainen kaupunki.

## Lähderatkaisut

12 onnistunutta luettua lähdesivua: pääkaupunki/WV/kohde-WP:t sekä 3 tarkoituksenmukaista Chilen kansalliskirjaston Memoria Chilena -sivua. Ensimmäinen Mercado Central -osoite 404, oikea sivu haettu; virhesivu ei todiste. Muistomerkkiviraston robots-aikakatkaisun jälkeen kyseisen domainin tuloksia ei käytetty. Ei PDF-kiertoa.

La Monedan luovutus/avaamisvuoden ja Quinta Normalin perustamisvuoden erot yleistetty vuosisataan. Mapochon asema-artikkelin 1800-luvun junamatkaväite hylätty: nykyinen asemarakennus vasta 1900-luvulta. Vain kaanonin 1873 toistuu tarkkana matkavuotena, ei keksittyä isoisän toimintaa. Muut tekstiin kirjoitetut ajankohdat vuosisatoina. Väestöluvut pois, keskustakunnan ja suurkaupungin laajuus erotettu.

## Avoimet portit

Täysi A: 6–8 kohteen fakta- ja oikeusketju; kartta partial 4/6. B: 22 kuvaa erillisestä putkesta, todellinen katselu ja creditit. Sää: 48/48 primääriauditointi. D: riippumaton jokaisen väitteen auditointi, erityisesti 1873-vertailut, S5:n astronominen historia ja ajantasaiset opaskäytännöt. E/F myöhemmin. Hyväksyntä, pelikytkentä ja julkaisu erikseen.

Santa Lucía on fyysinen kukkula, ei suojatun rakennuksen korvaava nimi. Sen nykyiset patsaat, suihkulähteet tai uusitut rakennukset eivät kohteita/kuva-aiheita. Mapochon kulttuurikeskuksen uudistus ja esikolumbiaanisen museon nykylaajennus jätetty pois kartasta/kuvituksesta oikeusketjun vuoksi. Nykytaidenäyttelyistä ei teoskuvia. Maanlehden ja Valparaíson toistoaiheet faktapohjan kohdassa 9.

## Todisteet

Oma NAS-väliaineisto `valiaikainen/nopea-e13-santiagodechile/`: lähde-HTML:t/tekstit, URL/virhemanifestit, `mitat.json`, lyhyt ja täydellinen paikallinen tarkistintuloste, lähteiden SHA-todisteet ja `SHA256SUMS.txt`. Viimeinen kattaa faktapohja.md, sisalto.json ja tämän muistion. Ei Git-committia.
