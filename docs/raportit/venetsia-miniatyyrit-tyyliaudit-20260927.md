# Venetsian R2-miniatyyrien tyyliaudit 27.9.2026

Kaupungin kartassa on yhdeksän live-R2-PNG:tä eikä paikallisia WebP-miniatyyrejä. Hain kaikki yhdeksän kuvaa ja vertasin niitä hyväksyttyyn Ateenan viistoon, hillittyyn muste-vesiväridioraamaan. Seitsemän kuvaa säilytettiin. Pyhän Markuksen torille ja Dogen palatsille tehtiin uudet **R2-toimitusta odottavat ehdokkaat**, koska nykyiset kuvat eivät esitä tunnistettavasti karttamerkin fyysistä paikkaa. [Koko kaupungin ennen/jälkeen-kontaktiarkki](kuvat/venetsia-miniatyyrit-ennen-jalkeen-20260927.jpg) näyttää kaikki yhdeksän rinnakkain.

| R2-tunnus | Ehdokas | Täyttö | Reuna | Päätös |
| --- | --- | ---: | ---: | --- |
| `venetsia-aldon-paino-vari2` | 1024×1024 | 0.370 | 0.000 | nykyinen 1024×1024 PNG säilytetty |
| `venetsia-arsenaali-vari2` | 1024×1024 | 0.430 | 0.000 | nykyinen 1024×1024 PNG säilytetty |
| `venetsia-canal-grande-vari2` | 1024×1024 | 0.493 | 0.000 | nykyinen 1024×1024 PNG säilytetty |
| `venetsia-dogen-palatsi-vari2` | 512×512 | 0.396 | 0.000 | uusi 512×512 PNG, odottaa R2-toimitusta |
| `venetsia-la-fenicen-oopperatalo-vari2` | 1024×1024 | 0.540 | 0.000 | nykyinen 1024×1024 PNG säilytetty |
| `venetsia-markuksen-hevoset-vari2` | 1024×1024 | 0.405 | 0.000 | nykyinen 1024×1024 PNG säilytetty |
| `venetsia-pyhan-markuksen-tori-vari2` | 512×512 | 0.477 | 0.000 | uusi 512×512 PNG, odottaa R2-toimitusta |
| `venetsia-rialton-silta-vari2` | 1024×1024 | 0.364 | 0.000 | nykyinen 1024×1024 PNG säilytetty |
| `venetsia-san-giorgio-maggiore-vari2` | 1024×1024 | 0.396 | 0.000 | nykyinen 1024×1024 PNG säilytetty |

## Korjatut poikkeamat

`Pyhän Markuksen tori` on kartalla aukio. Vanha live-kuva oli kupolirakennus ja minareettia muistuttava torni, eikä siinä näkynyt avointa toritilaa. Uusi ehdokas näyttää viistosta ylhäältä suuren kiveyksen, sitä rajaavat Procuratie-kaarikäytävät, basilikan päässä ja erillisen tiilisen campanilen. Ensimmäinen uusi raakaehdokas hylättiin, koska torikiveys katkesi kuvan alareunaan; toinen hyväksyttiin.

`Dogen palatsi` oli vanhassa kuvassa kupolillinen fantasia-arkkitehtuuri. Uusi ehdokas näyttää Venetsian goottilaisen palatsin pitkän suorakulmaisen massan, kahden kerroksen kaaristot ja vaalean vinoneliökuvioisen yläseinän. Fyysisen muodon tarkistuksessa käytettiin [Palazzo Ducalen museon rakennuskuvausta](https://palazzoducale.visitmuve.it/en/building-and-history/).

Muut viisi fyysistä paikkaa pysyvät ennallaan. La Fenicen oopperatalon kuva näyttää tunnistettavan teatteritilan leikkauskuvana, joten se esittää edelleen nimettyä fyysistä paikkaa. `Markuksen hevoset` ja `Aldon paino` ovat tarinan taide-/esineaiheita, eivät tämän eristetyn karttapaikan tyylikorjauksen kohteita.

ImageGenillä tehtiin kolme täysin uutta raakaehdokasta yksi kerrallaan. Alkuperäiset live-R2-kuvat, raakatiedostot, hylätty vaihtoehto ja kaksi hyväksyttyä PNG:tä ovat `output/style-audit-europe-20260927/venetsia/`-kansiossa. Hyväksytyt tiedostot ovat:

- `final/venetsia-dogen-palatsi-vari2.png`, SHA-256 `a08023fb0d2b3d158a900e4ab0951d9c1afa6def4213b316b42ca256aec8b73f`
- `final/venetsia-pyhan-markuksen-tori-vari2.png`, SHA-256 `045f063611cc2176172e03250e80398e72005f2f20192a9395a05e1e5adec47b`

**Kumpaakaan ei ole ladattu R2:een.**

## Tekninen QA ja poikkeukset

Molemmat uudet PNG:t ovat 512×512 RGBA, upotettu sRGB-profiili, alfa 0–255 ja neljä täysin läpinäkyvää kulmaa. Täyttö on 0,396 (palatsi) ja 0,477 (tori); leikkausreuna on kummallakin 0,000. Leikkauspoikkeuksia ei ole. Seitsemän säilytettyä live-R2-kuvaa ovat 1024×1024 RGBA ja niidenkin leikkausreuna on 0,000. Niiden mitat poikkeavat 512 pikselin toimitustavoitteesta, mutta tyyliä ei muutettu pelkän koon vuoksi.

Vanhojen ja ehdokkaiden SHA-256, mitat, alfa, täyttö, R2-osoitteet ja päätökset ovat `output/style-audit-europe-20260927/venetsia/qa.json`-manifestissa. Käytettyjen promptien sisältö on `prompt.txt`-tiedostossa.

Lähteet: `js/packs/miniatyyrit.js` (yhdeksän R2-tunnusta), `js/packs/maakartat.js` (karttamerkkien tyypit), `js/packs/nahtavyysjutut.js` (torin ja palatsin nostot), Sisältökirjurin 27.9.2026 tyyliuudistustilaus commitissa `389efbb3`, [Venetsian kaupungin San Marco -kuvaus](https://www.veneziaunica.it/en/things-to-do-in-venice/venice-areas/sestieri/san-marco) ja [Palazzo Ducalen museo](https://palazzoducale.visitmuve.it/en/building-and-history/).

AGENTS-portit kaksoisavaimet, niputus, savukkeet ja nimiolimitys läpäisivät. Koko `node --test tests/*.test.mjs`: 4 512 testiä, 4 497 läpäisi, 15 ohitettiin, 0 epäonnistui (väliaikainen polku ilman välilyöntejä).
