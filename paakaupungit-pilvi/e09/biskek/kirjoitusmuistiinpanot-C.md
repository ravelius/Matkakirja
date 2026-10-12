# Biškek — C-tekstiluonnos 12.10.2026

Tila: tekstit kirjoitettu ja alkuperäinen paikallinen tarkistin ajettu; koko kaupunki ei ole valmis. Rajattu A-lähdekooste tehtiin ennen sisalto.jsonin kirjoittamista. B-valintaa eikä D/E/F-hyväksyntää ei ole. Ei Git-operaatioita, pelikoodia, kuvatyötä tai julkaisua.

Tuotanto: artikkeli (intro 882 merkkiä / 8 virkettä / 2 kappaletta / 2 lihavointia; jatkoteksti 970 merkkiä / 3 kappaletta), kansi ja historia-teema, 8 nostoa (508, 513, 521, 537, 516, 523, 532, 524 merkkiä), opas 5 jaksoa, 5 kysymystä, 3 tietoa, 1 kohdejuttu (Osh-tori 816 merkkiä / 2 kappaletta). Matkailun parasta 5 ja hyvä tietää 3 riviä. Tarkat väestöluvut ja paikalliset tapahtumavuodet jätetty pois. Ainoa historiallinen numeroviite 1873 on pelin kehys, ei keksitty matka tai paikallistapahtuma.

## Alkuperäisen tarkistimen todellinen tulos

`node paakaupungit-pilvi/tyokalu.mjs tarkista e09 biskek --lyhyt`

19 VIRHEttä, 3 VAROITUSta, 0 kuvaa; tarkistimen exit 1. Todisteet `valiaikainen/nopea-e09-biskek/tarkistus-lyhyt.txt` ja `tarkistus-kaikki.txt`. Kaikki 19 virhettä ovat **tiedosto puuttuu** tyhjissä kuvarooleissa: valokuva 1 + kansi 3 + nostot 8 + matkailijalle 1 + opas 5 + kohdejuttu 1. Jokaisen roolin tiedosto/lyhyt/selite/lahde ovat tyhjiä. Tarkistinta ei muokattu eikä virheitä piilotettu.

Varoitukset täsmälleen:

- kysymys 4: source ei ole Wikipedia-artikkeli. Gamburger-väite on luetusta Wikivoyagen Eat-osiosta. Tarkistettua vastaavaa Wikipedia-väitettä ei keksitty eikä lähdettä vaihdettu näennäisesti.
- kohteita 1 (pohjataso 6). Varmennettu vain Osh-torin oma WP-piste; ei kaupungin pisteellä täytettyjä nähtävyyksiä. Partial ei johdu kaupungin pienuudesta. Muut 5–7 kohdetta ja suojattujen rakennusten tekijäketjut avoimet.
- saatiedot puuttuu. Saatiedot:null, koska sääaineiston 48/48 primääriauditointi puuttuu. Ei säähaun lisäkierrosta eikä saa.jsonin muutoksia.

## Faktapoikkeamat ja toimitusvalinnat

Linnoituksen valtaukselle lähteissä 1860/1862, joten C käyttää vuosisataa. Pišpekin asutuksen perustamista ja myöhempää uudelleenkehittämistä ei yhdistetty yhdeksi täsmälliseksi vuodeksi. Kaupunginnimen lastaselitys epävarma, jätetty pois. Huimin_Bao-polku antoi 404; lehden faktalähde on Bishkek/Culture, ja wiki-kenttä on Bishkek. Merian historia ja Railway eivät palautuneet sallitulla apurilla, joten ensikäden lähteiden täydentäminen on avoin A-portti. Manasin lentoaseman IATA-koodi ei ole varmennettu; ehdotukset.lentoasema:null.

Kontekstin alkuperäisten vesioja- ja maisemateemojen päälle kirjoitettiin uudet jutut konttikaupasta, rautatieverkosta, gamburgerista, dungaanilehdestä, linnoitusvaiheesta, museon sisällä säilytetystä kodista, katujen rinnakkaisnimistä ja pihallisista asuinkortteleista. Oppaan viides jakso käsittelee retken suunnittelua ilman ilmastolukuja.

Kuvaputken roolit: laaja kaupunkinäkymä / puistokatu / torikokonaisuus (kansi), Dordoin konttikäytävä, rautatieyhteyttä kuvaava hyväksyttävä ympäristö, gamburger, dungaanilehden kulttuurinen aihe, Pišpekin historiaan sopiva vanha vapaa aineisto, Frunzen vanha kotitalo vain tekijäketjun jälkeen, katuosoite, asuinkorttelin piha, matkailijan pysty, viisi oppaan roolia, Osh-tori, matkakirjan valokuva. Ei suojattuja patsaita tai moderneja museojulkisivuja. Tämä lista ei ole kuva-/lisenssivalinta.

Avoimet portit: A:n ensikäden ja kartta-aineiston täydennys, B, sääauditointi, riippumaton D, E/F, omistajan hyväksyntä, pelikytkentä, julkaisu. Lähde- ja tiedosto-SHA:t sekä mitat NASin omassa väliaineistossa.
