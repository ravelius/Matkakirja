# La Paz — C 12.10.2026

Tehtävä 23, vain e13/lapaz. Rajattu A-lähdekooste ja kokonainen C-tekstiluonnos kirjoitettu NAS-klooniin; ei Git-operaatioita, kuvia, pelimuutoksia tai julkaisua. Ei uutta agenttia. Dakar-mallista käytetty rakenne, ei sisältöä. Kontekstin maanlehti/lähikaupunki-aiheet erotettu tämän kaupungin aiheista.

## Sisältö ja mitat

- Artikkeli: intro 947 merkkiä, 9 virkettä, 2 kappaletta, 2 lihavointia; jatko 894 merkkiä, 3 kappaletta.
- Kansi 4 nostoa, teemasivu historia 4 nostoa; kaikki 508–562 merkkiä.
- Opas 5 jaksoa, parasta 5, hyvä tietää 3.
- Visa 5 (tasot 1/2/3), tiedot 3, minitehtävä 1.
- Kartta 2 varmennettua omaa pistettä; kohdejutut 2 (782/850 merkkiä).
- Kuvat 0 valittu / 0 haettu / 0 generoitu. Kaikkien 20 roolin tiedosto/lyhyt/selite/lahde tyhjiä.
- Saatiedot null; saa.jsonia ei muokattu.

## Alkuperäisen paikallisen tarkistimen todellinen tulos

`node paakaupungit-pilvi/tyokalu.mjs tarkista e13 lapaz --lyhyt`: **20 virhettä, 2 varoitusta**, exit 1. Lyhyt tuloste `valiaikainen/nopea-e13-lapaz/tarkistus-lyhyt.txt`. Sama alkuperäinen tarkistin ilman --lyhyt-vipua tallentaa varoitustekstit `tarkistus-kaikki.txt`-tiedostoon.

Kaikki virheet ovat `tiedosto puuttuu`: valokuva 1, kansikuvat 3, nostokuvat 8, matkailijalle 1, oppaan kuvat 5, kohdejutut 2. Varoitukset täsmälleen `kohteita 2 (pohjataso 6; perustele RAPORTTI.md:ssä)` ja `saatiedot puuttuu (kirjaa syy RAPORTTI.md:hen)`. Muita tekstin, kysymysten, mittojen, avainten, koordinaattien tai rakenteen konevirheitä ei ilmoitettu. Tarkistinta ei muutettu. Tämä ei ole nollavirheinen kokonainen kaupunki.

## Avoimet portit

Täysi A: kuuden kohteen fakta-, paikkapiste- ja oikeusketju; rajattu kartta on partial. B: erillisen kuvaputken 20 kuvaa ja todellinen katselu/creditit. Sää: 48/48 primääriauditointi. D: riippumaton kaikkien väitteiden tarkistus, erityisesti WV:n yksin tukemat soitinmuseon nykyiset kokoelmat/kokeilumahdollisuus ja oppaan käytännöt. E/F erillisiä myöhempiä vaiheita. Ei hyväksyntää, pelikytkentää tai julkaisua.

La Pazin hallinnon siirtymä ja San Franciscon rakentamisaikojen ristiriidat yleistetty vuosisataan, väestö pois. Ensimmäiset 404-sivut eivät ole lähteitä. Torin oikea The Witches' Market -sivu löytyi pääartikkelin linkistä; nosto korvattiin sen konkreettisilla faktoilla. Calle Jaénin tiedot kaupungin pääsivusta ja Wikivoyagesta. Plaza Murillon nykyiset suojatut monumentit eivät ole kohteita. Soitinkeksintö on tekstiä, ei kuvattava teos tai karttakohde.

## Todisteet

Oma NAS-väliaineisto: `valiaikainen/nopea-e13-lapaz/` (lähde-HTML/tekstit, URL/virhemanifesti lahteet.json, mitat.json, molemmat tarkistintulosteet, lähteiden SHA-todisteet ja lopullinen SHA256SUMS.txt). SHA-lista kattaa faktapohja.md, sisalto.json ja tämän muistion; ei Git-committia.
