# Prahan miniatyyrien tyyliaudit 27.9.2026

Prahan kartassa on viisi paikallista WebP-kuvaa ja kaksi R2-tunnusta. Vertailu hyväksyttyihin Ateenan viistoihin muste-vesiväripienoismalleihin ei löytänyt uusittavaa fyysistä karttapaikkaa. Koko kaupungin [ennen/jälkeen-kontaktiarkissa](kuvat/praha-miniatyyrit-ennen-jalkeen-20260927.jpg) kaikki seitsemän kohdetta näkyvät samalla mittakaavalla; jälkeen-rivi on tarkoituksella sama kuin ennen-rivi.

| Karttakuva | Lähde | Mitat | Täyttö | Reuna | Päätös |
| --- | --- | --- | ---: | ---: | --- |
| `praha-kaarlensilta` | paikallinen WebP | 1024×1024 | 0.074 | 0.000 | Tyylin mukainen; säilytetty |
| `praha-kansallismuseo` | paikallinen WebP | 1024×1024 | 0.197 | 0.000 | Tyylin mukainen; säilytetty |
| `praha-klementinum` | R2 PNG | 512×512 | 0.454 | 0.000 | Tyylin mukainen; säilytetty |
| `praha-petrinin-nakotorni` | paikallinen WebP | 1024×1024 | 0.098 | 0.000 | Tyylin mukainen; säilytetty |
| `praha-prahan-linna` | paikallinen WebP | 1024×1024 | 0.153 | 0.000 | Tyylin mukainen; säilytetty |
| `praha-tycho-brahe-vari2` | R2 PNG | 1024×1024 | 0.418 | 0.000 | Henkilönosto; säilytetty |
| `praha-vanhauusi-synagoga` | paikallinen WebP | 1024×1024 | 0.266 | 0.000 | Tyylin mukainen; säilytetty |

## Visuaalinen arvio

Viisi paikallista fyysistä kohdetta (Kaarlensilta, Kansallismuseo, Petřínin näkötorni, Prahan linna ja Vanhauusi synagoga) sekä R2:n Klementinum ovat eristettyjä, hillittyjä viistoja akvarelli- ja mustepiirroksia. Niissä ei ole taivasta, horisonttia, ympäröivää kaupunkimaisemaa tai kerronnallista toimintaa. Klementinumin R2-kuva tarkistettiin live-osoitteesta. `Tycho Brahe` on karttadatassa `tyyppi: henkilo`; sen hautaa ja mittalaitetta kuvaavaa R2-kuvaa ei muutettu fyysisen nähtävyyden pienoismalliksi.

## Tekninen QA ja poikkeukset

Kaikissa seitsemässä kuvassa on RGBA-alfa 0–255, läpinäkyvät kulmat ja leikkausmitan reuna 0,000. Leikkauspoikkeuksia ei ole. Viisi paikallista WebP:tä ovat 1024×1024, eivät 512×512; R2:n Tycho-kuva on myös 1024×1024. Ne säilytettiin, koska pelkkä pikselimitta ei tee jo hyväksyttyä piirrostyyliä poikkeavaksi. Kaarlensillan ja Petřínin tornin täyttö on muita pienempi (0,074 ja 0,098); motiivit jäävät silti kokonaan näkyviin, ja lähdelistan tyyliaudit luokitteli Prahan poikkeamattomaksi. Tämä mittakaavaero on kirjattu tarkistettavaksi, jos kartan todellisessa näkymässä ne osoittautuvat liian pieniksi.

Alkuperäisten paikallisten tiedostojen ja live-R2-kuvien SHA-256, alfa, mitat ja täyttö ovat `output/style-audit-europe-20260927/praha/qa.json`-manifestissa. `old/` sisältää auditointihetken kopiot; `raw/` ja `rejected/` ovat tyhjiä, koska kuvia ei generoitu.

Lähteet: `js/packs/miniatyyrit.js` (seitsemän viitettä), `js/packs/maakartat.js` (karttapaikat ja Tychon henkilötyyppi), Sisältökirjurin 27.9.2026 tyyliuudistustilaus sekä tyylilista commitissa `389efbb3`.

AGENTS-portit: kaksoisavaimet, niputus, savukkeet ja nimiolimitys läpäisivät. Koko `node --test tests/*.test.mjs`: 4 498 testiä, 4 483 läpäisi, 15 ohitettiin, 0 epäonnistui (väliaikainen polku ilman välilyöntejä).
