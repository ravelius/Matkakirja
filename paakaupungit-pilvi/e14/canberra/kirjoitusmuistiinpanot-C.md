# Canberra — C-kirjoitusmuistio 12.10.2026

Tila: koko C-tekstiluonnos, rajattu A; kuvien ja kartan vuoksi ei valmis kaupunkitoimitus.

## Tekstit

- Artikkeli: intro 914 merkkiä, 9 virkettä, 2 kappaletta, 2 lihavointia; Lue lisää 884 merkkiä, 3 kappaletta.
- 2 lehtisivua, 4 + 4 nostoa; nostot 473–508 merkkiä.
- Matkailijalle-kappale ja 5 opasjaksoa, parasta 5 ja hyvä tietää 3.
- 5 kysymystä lähteineen (tasot 1–3), 3 tietoa, 1 teemasivun minitehtävä.
- 3 kohde-/nähtävyysjuttua: 812, 834 ja 750 merkkiä, 2 kappaletta kussakin.
- Nykyisen Australia-maalehden aiheet luettu kontekstista. Ei toisteta sen alkuperäiskansa-, kaivos-, lammas-, lennätin- tai ruokahistorian nostoja. Paikallinen maantiede ja kaupungin suunnittelu ovat omat aiheet.

## Alkuperäisen tarkistimen tulos

Komento: node paakaupungit-pilvi/tyokalu.mjs tarkista e14 canberra --lyhyt
Exit 1. Todellinen tulos: 21 virhettä, 2 varoitusta, 0 kuvaa.

Kaikki 21 virhettä ovat täsmälleen tyyppiä 'tiedosto puuttuu': valokuva 1, kansikuvat 3, kannen nostot 4, matkailijalle-kuva 1, opasjaksot 5, teemanostot 4, nähtävyyskuvat 3. Muissa tekstin tai rakenteen kentissä tarkistin ei ilmoita virhettä.

Täyden tulosteen varoitukset:
- kohteita 3 (pohjataso 6; perustele RAPORTTI.md:ssä).
- saatiedot puuttuu (kirjaa syy RAPORTTI.md:hen).

Kuvaroolit säilytetään rakenteessa, mutta tiedosto, lyhyt, selite ja lahde ovat kaikki tyhjät. Tarkistinta ei ole muutettu, virheitä ei ole piilotettu. Alkuperäiset tulosteet: valiaikainen/nopea-e14-canberra/tarkistus-lyhyt.txt ja tarkistus-kaikki.txt.

## Avoimet portit ja toimitushuomiot

Kartta partial 3/6–8: vain luonnonmäkien omat WP-pisteet. Red Hillin artikkeli on myös kaupunginosa eikä sen infobox-piste kelpaa mäelle; jätetty pois. Modernien teosten tekijäketjun selvittämistä ei korvata luonnonkohdenimellä. 21 kuvaa odottaa erillistä kuvaputkea; kuvissa mäet itsenään, ei suojattuja torneja, teoksia tai rakennuksia hallitsevina kohteina.

National Capital Authorityn kaksi lähdehakua aikakatkaistiin. Niitä ei käytetä faktatodisteina. Tarkat vuosiluvut, etäisyydet, korkeudet ja lajimäärät on jätetty pois. Mökin lähteessä on 1858/1860-ristiriita; teksti käyttää 1800-lukua. Kiinteä 1873-kehys erottaa vanhan asutuksen myöhemmästä pääkaupungista eikä keksi isoisän tekemisiä.

Sää: saatiedot null, koska 48/48-lukujen primääriauditointi puuttuu; alkuperäinen saa.json koskematon. Oppaassa vain lähdepohjainen laadullinen vuodenaikakuvaus.

B, riippumaton D, mahdollinen E, F, hyväksyntä, peliin kytkentä ja julkaisu avoinna. Ei Git-operaatioita, pelimuutoksia, kuvahakuja eikä generointia.
