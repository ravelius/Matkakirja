# Islamabad — C-kirjoitusmuistiinpanot 12.10.2026

Tallennettu lähteisiin perustuva tekstiluonnos, ei hyväksytty/toimitusvalmis kaupunki. Aineisto `sisalto.json` ja rajattu `faktapohja.md`. Lähteet, hakupoikkeamat, SHA ja alkuperäiset koneajot NASin omassa `valiaikainen/nopea-e09-islamabad/`-polussa. Ei Git-operaatioita, pelimuutoksia, uusia sessioita/agentteja, kuvia tai julkaisua.

## Tekstit ja mitat

- Artikkeli: intro 915 merkkiä, 9 virkettä, 2 kappaletta, 2 lihavointia; jatkoteksti 1023 merkkiä, 3 kappaletta.
- Kansi 4 nostoa: 496, 470, 486, 502 merkkiä.
- Luontosivu 4 nostoa: 498, 498, 501, 477 merkkiä; yksi minitehtävä.
- Matkailuopas 5 jaksoa, parasta 5, hyvä tietää 4.
- Tietovisa 5 kysymystä, tasot 1–3; 3 tiesitkö-tietoa.
- Kartta partial 2 luontokohdetta; 2 nähtävyysjuttua, kummassakin 2 kappaletta ja 1873-kehys.

## Alkuperäisen paikallisen tarkistimen todellinen tulos

Lopullinen `node paakaupungit-pilvi/tyokalu.mjs tarkista e09 islamabad --lyhyt`: **20 virhettä, 2 varoitusta, 0 kuvaa; paluukoodi 1**. Täysi tuloste varoituksineen `tarkistus-C-taysi.txt`; lyhyt tuloste `tarkistus-C.txt`, paluukoodi `tarkistus-tila.json`.

Kaikki 20 virhettä ovat **tiedosto puuttuu**: valokuva 1, kansikuvat 3, kansinostot 4, matkailijalle 1, opasjaksot 5, luontonostot 4, nähtävyysjuttujen kuvat 2. Kuvien neljä kenttää ovat tarkoituksella tyhjiä kuvaputkea varten. Tarkistinta ei muutettu.

Varoitusten todelliset tekstit:
1. `kohteita 2 (pohjataso 6; perustele RAPORTTI.md:ssä)`.
2. `saatiedot puuttuu (kirjaa syy RAPORTTI.md:hen)`.

Ensimmäinen tarkistus ilmoitti lisäksi `kysymykset[3].source[0]: lähde- tai aineistomaininta lukijan tekstissä (metateksti, luku 4.10)`: listamuotoisen lähteen WP-osoite joutui tarkistimen lukijatekstihakuun. Alkutilanne säilytetty `tarkistus-C-ensimmainen.txt`-tiedostossa. Neljäs kysymys korvattiin Wikipedia-artikkelin suoraan tukemalla fossiilikysymyksellä ja yksittäisellä URL:illa. Valasaihe säilyy artikkelissa ja nostossa oikeilla lähteillä. Lopullisessa ajossa ei teksti-/skeema-/pituus-/kysymysvirheitä.

## Avoimet portit

- B/kuvaputki: kaikki 20 kuvaroolia, oikeudet, katselu ja kuvatekstit avoinna. Museon luonnontieteellinen aihe ei tee nykyisestä mallista tai dioraamasta automaattisesti oikeusvapaata.
- Kartta: puiston ja järven omat yleispisteet eivät ole tietyn portin, polun tai padon pisteitä. Kahden luontokohteen laaja rajaus ei täytä kuuden kohteen historiallista keskustakarttaa. Ei suojattua rakennusta luontopaikan nimellä.
- Rawal: sivun eri koordinaattimuotojen ja mittojen ristiriidat kirjattu faktapohjaan; mittoja ei julkaista, rannan yksilöity piste avoin.
- Sää: `saatiedot:null`, primääriauditointi avoin, olemassa oleva `saa.json` säilytetty eikä sen numeroita käytetty.
- Museoiden jatkolinkit ja Metrobus-jatkosivun erillinen verkkovarmennus sekä riippumaton D/E/F tekemättä.
- Pelikytkentä, hyväksyntä ja julkaisu tekemättä.

Luettu nykyinen UM:n matkustustiedote: tarpeettoman matkustamisen välttäminen mainitaan oppaassa lyhyesti ilman nykykonfliktien tai osapuolten sisältöä. Väkiluku jätetty pois kaupungin/pääkaupunkialueen laajuuksien sekoittumisen estämiseksi. Taxila ja Pakistan-maalehden aiheet rajattu pois.

Tiedostojen täydet SHA-256 tallennetaan oman väliaineiston `SHA256.txt`-tiedostoon.
