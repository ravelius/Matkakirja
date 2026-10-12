# Apia — C-kirjoitusmuistio 12.10.2026

Tila: koko C-tekstiluonnos, rajattu A, partial-kartta. Ei valmis kaupunkitoimitus.

## Kirjoitetut tekstit

- Artikkeli: intro 879 merkkiä, 9 virkettä, 2 kappaletta, 2 lihavointia. Lue lisää 870 merkkiä, 3 kappaletta.
- Kansi ja kirjallisuusteema: 4 + 4 nostoa, 471–521 merkkiä.
- Matkailijalle-kappale, 5 opasjaksoa, parasta 5 ja hyvä tietää 3.
- 5 kysymystä lähteineen ja tasoineen 1–3, 3 tietoa, 1 teemasivun minitehtävä.
- Mount Vaean kohdejuttu 836 merkkiä, 2 kappaletta.
- Konteksti luettu; maalla ei ole valmista maalehteä tai lähinostoja. Samoan yleinen itsenäisyys-, maatalous- tai fa'a Samoa -esittely ei ole uusi lehtinosto. Kaupunki, kirjailijan paikalliset vuodet ja arki painopisteinä.

## Tarkistimen todellinen tulos

Alkuperäinen komento: node paakaupungit-pilvi/tyokalu.mjs tarkista e14 apia --lyhyt
Exit 1: 19 virhettä, 2 varoitusta, 0 kuvaa.

Kaikki virheet ovat 'tiedosto puuttuu': valokuva 1, kansikuvat 3, kannen nostot 4, matkailijalle 1, opasjaksot 5, teemanostot 4, kohdekuva 1. Tarkistin ei ilmoittanut teksti- tai muita rakennevirheitä. Kuvakenttiä on pidetty tyhjinä omistajan ohjeen mukaan; tarkistinta tai sen sääntöjä ei muutettu.

Varoitukset täydestä alkuperäisestä ajosta:
- kohteita 1 (pohjataso 6; perustele RAPORTTI.md:ssä).
- saatiedot puuttuu (kirjaa syy RAPORTTI.md:hen).

Todisteet omassa väliaikaiskansiossa: tarkistus-lyhyt.txt, tarkistus-kaikki.txt, lahteet.json, lahteet-viralliset.json, hakutodisteet.json, SHA256SUMS.txt.

## Avoimet portit ja poikkeamat

Kartta partial: Mount Vaean oma WP-piste varmennettu. Papase'ea-haun HTTP 404 ei ole lähde, eikä kohteelle lainata Apian tai Vailiman pistettä. Sen olemassaolo ja luonne ovat Samoa Tourism Authorityn sivulla ja näkyvät oppaassa, mutta kohde-/juttutyö odottaa omaa pistettä. Vailiman WP-piste on kylän, ei varmennetun museorakennuksen. Sataman, torien ja Palolo Deepin WP/WD-pisteitä ei tarkistettu tämän rajatun A:n puitteissa.

Apian kontekstin lon -171.8333 poikkeaa Apia-artikkelin kaupunkipisteestä -171.750. Pallo on säilytetty kontekstin arvoilla ohjeen mukaisesti; ero tulee tarkistaa pääsession paikkatietoauditissa. Uusi kohdepiste on Mount Vaean oman artikkelin piste.

A2-opas antaa väestöluvuksi 42000, joka eroaa kontekstin tilastoviraston luvusta 35974 (Apia Urban Area, 2021). Väestöluku jätetty pois C:stä. Myrskylähteiden alus- ja uhrimäärät sekä motiiviselitykset jätetty pois; historiallinen lähtö/vaurioituminen ja koneiden rooli lähteissä. Tarkkoja vuosia ei käytetä leipätekstissä 1873-kehyksen lisäksi.

Palusamin kääreestä lähteet eroavat (taro/kookos); tekstissä vain kookoskermainen lehtikäärö. Umu kuvataan kuumilla kivillä kypsentämisenä, koska virallinen lähde täsmentää maanpäällisen uunin.

19 kuvaa odottaa erillistä kuvaputkea. Kuvaolioiden tiedosto, lyhyt, selite ja lahde tyhjiä. Ei Commons-hakuja eikä generointia. Mount Vaea kuvataan vuorena/maisemana; suojattua hautamuistomerkkiä tai pronssilaattaa ei naamioida luonnonkohteeksi. Modernit kirkot, parlamentti, kellotorni ja museon lisärakennukset pois kartoista ja kuvista.

Sää saatiedot null, 48/48 primääriauditointi puuttuu, alkuperäistä saa.json:ia ei muutettu. Oppaassa vain lähdepohjainen laadullinen sääkuvaus.

B, riippumaton D, mahdollinen E, F, hyväksyntä, pelikytkentä ja julkaisu avoinna. Ei Git-operaatioita tai pelimuutoksia.
