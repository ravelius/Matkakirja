# Ašgabat — C-kirjoitusmuistiinpanot 12.10.2026

Tallennettu lähteisiin perustuva tekstiluonnos, ei hyväksytty/toimitusvalmis kaupunki. Aineisto: `sisalto.json` ja rajattu `faktapohja.md`. Lähteet ja koneajot NASin omassa `valiaikainen/nopea-e09-asgabat/`-polussa. Ei Git-operaatioita, pelimuutoksia, kuvia tai julkaisua.

## Tekstit ja mitat

- Artikkeli: intro 888 merkkiä, 9 virkettä, 2 kappaletta ja 2 lihavointia; jatkoteksti 900 merkkiä ja 3 kappaletta.
- Kansi 4 nostoa: 506, 483, 497, 503 merkkiä.
- Musiikkisivu 4 nostoa: 483, 496, 495, 486 merkkiä; yksi oma minitehtävä.
- Opas 5 jaksoa, parasta 5, hyvä tietää 4.
- Tietovisa 5 kysymystä, tasot 1–3; 3 tiesitkö-tietoa.
- Yksi nähtävyysjuttu Nisasta; kartta partial, yksi arkeologinen piste.

## Alkuperäisen tarkistimen tulos

`node paakaupungit-pilvi/tyokalu.mjs tarkista e09 asgabat --lyhyt`:
**19 virhettä, 3 varoitusta, 0 kuvaa**. Koneajon todellinen paluukoodi omassa `tarkistus-tila.json`-tiedostossa; alkuperäinen tuloste `tarkistus-C.txt`.

Kaikki 19 virhettä ovat **tiedosto puuttuu**: valokuva 1, kansikuvat 3, kansinostot 4, matkailijalle 1, opasjaksot 5, musiikkinostot 4 ja Nisa-juttu 1. Kuvien neljä kenttää on jätetty tarkoituksella tyhjiksi erillistä kuvaputkea varten. Tarkistinta ei muutettu.

Varoitukset todettu myös alkuperäisen tarkistimen täydestä tulosteesta (`tarkistus-C-taysi.txt`):
1. `kohteita 1 (pohjataso 6; perustele RAPORTTI.md:ssä)`.
2. `kohde Nisa: 17 km kaupunkipisteestä` — tarkistimen pyöristys, ei julkaistava lähdeluku.
3. `saatiedot puuttuu (kirjaa syy RAPORTTI.md:hen)`.

Kone ei ilmoita teksti-/pituus-/skeema-/kysymysvirheitä. Tämä ei ole riippumaton faktatarkastus.

## Avoimet portit

- B: kaikki 19 kuvaroolia, oikeudet, katselu ja kuvatekstit avoinna; ei nykyteoksia näennäisesti luontopaikkoina.
- Kartta: Nisan yleinen arkeologinen piste ei täytä keskustakartan minimiä. Ei väitetä yksittäisen linnoituksen pisteeksi. Pääsessio ratkaisee retkikohteen soveltuvuuden.
- Kasvitieteellinen puutarha: lähteen koordinaatin ja itäisen sijaintikuvauksen ristiriita; nykyinen pääsy varmentamatta. Siksi ei karttakohteeksi.
- Sää: `saatiedot:null`, primääriauditointi avoin, ei muutoksia sääpoimintaan eikä numeroita teksteihin.
- Jatkolinkkien verkkotarkistus, D/E/F sekä pelikytkentä/julkaisu tekemättä.
- Tarkat vuodet, määrät ja ennätykset yleistetty tai poistettu; 1873 on tehtävän aikakehys, ei keksitty tapahtuma.

Tiedostojen SHA-256 tallennetaan oman väliaineiston `SHA256.txt`-tiedostoon.


## Task118 korjaus 13.10.2026
Nimetyt löydökset käsitelty; lähdepohja ja tallennetut /wiki/-lähteet tarkistettu. Visojen vastauslähteet, vaihtoehdot, vihjeet, nimi-/termiasut, kuvatekstit sekä tuotantometalauseet korjattu. Dhakan rikshamaalaus korvattu paikannimien kauppayhteisöhistorialla (Dhaka, Mughal period; tuore mainin BGD.Dhaka sisältää jo rikshamaalauksen). Kuva-/kartta-/sääomistus säilytetty; näiden portit edelleen avoimet.
```text
VIRHE asgabat: kansikuva 3: tiedosto puuttuu
VIRHE asgabat: kansi nosto 1: tiedosto puuttuu
VIRHE asgabat: kansi nosto 2: tiedosto puuttuu
VIRHE asgabat: kansi nosto 3: tiedosto puuttuu
VIRHE asgabat: kansi nosto 4: tiedosto puuttuu
VIRHE asgabat: matkailijalle.kuva: tiedosto puuttuu
VIRHE asgabat: opas jakso 1: tiedosto puuttuu
VIRHE asgabat: opas jakso 2: tiedosto puuttuu
VIRHE asgabat: opas jakso 4: tiedosto puuttuu
VIRHE asgabat: opas jakso 5: tiedosto puuttuu
VIRHE asgabat: teemasivu musiikki nosto 1: tiedosto puuttuu
VIRHE asgabat: teemasivu musiikki nosto 2: tiedosto puuttuu
VIRHE asgabat: teemasivu musiikki nosto 3: tiedosto puuttuu
VIRHE asgabat: teemasivu musiikki nosto 4: tiedosto puuttuu
== asgabat: 14 virhettä, 3 varoitusta, 5 kuvaa
YHTEENSÄ 1 kaupunkia: 14 virhettä, 3 varoitusta
```
SHA256 94a666fb0046e17297a1451b7dac801764b2f9d98c7cc94a1e08ef4d5eb9c404

Lopullinen Task118-tarkistus: kuvatiedostot/creditit, koordinaatit, rajat, sää ja vastausindeksit täsmälleen baselinen mukaiset. Tiedostohash 3455f6150af2ce50fbc9130e4f21c40a37b351cff0a1903e4c5fc64b977fca2c. Muuttuvat ohjeet keskitetty, kuvatekstitoisto ja merkistövirheet tarkistettu.

```text
VAROITUS asgabat: kohteita 1 (pohjataso 6; perustele RAPORTTI.md:ssä)
VAROITUS asgabat: kohde Nisa: 17 km kaupunkipisteestä
VAROITUS asgabat: saatiedot puuttuu (kirjaa syy RAPORTTI.md:hen)
```

Lopullinen Task118-tarkistus: kuvatiedostot/creditit, koordinaatit, rajat, sää ja vastausindeksit täsmälleen baselinen mukaiset. Tiedostohash 3455f6150af2ce50fbc9130e4f21c40a37b351cff0a1903e4c5fc64b977fca2c. Muuttuvat ohjeet keskitetty, kuvatekstitoisto ja merkistövirheet tarkistettu.

```text
VAROITUS asgabat: kohteita 1 (pohjataso 6; perustele RAPORTTI.md:ssä)
VAROITUS asgabat: kohde Nisa: 17 km kaupunkipisteestä
VAROITUS asgabat: saatiedot puuttuu (kirjaa syy RAPORTTI.md:hen)
```
