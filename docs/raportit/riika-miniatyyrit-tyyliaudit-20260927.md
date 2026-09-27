# Riian miniatyyrien tyyliaudit 27.9.2026

Tarkistin kuusi paikallista WebP-miniatyyriä itsenäisesti alkuperäistiedostoista. R2-viitteitä ei ole. Kaikki kuusi ovat hyväksyttyjen Ateenan kuvien kaltaisia viistoja, hillittyjä muste-vesiväripienoismalleja. [Koko kaupungin ennen/jälkeen-kontaktiarkissa](kuvat/riika-miniatyyrit-ennen-jalkeen-20260927.jpg) jälkeen-rivit ovat samat, koska kuvia ei vaihdettu.

| Kuva | Mitat | Täyttö | Reuna | Päätös |
| --- | --- | ---: | ---: | --- |
| `riika-keskustori` | 1024×1024 | 0.229 | 0.000 | säilytetty |
| `riika-kolme-veljesta` | 1024×1024 | 0.350 | 0.000 | säilytetty |
| `riika-mustapaiden-talo` | 1024×1024 | 0.243 | 0.000 | säilytetty |
| `riika-pyhan-pietarin-kirkko` | 1024×1024 | 0.131 | 0.000 | säilytetty |
| `riika-riian-tuomiokirkko` | 1024×1024 | 0.232 | 0.000 | säilytetty |
| `riika-vapaudenpatsas` | 1024×1024 | 0.091 | 0.000 | säilytetty |

## Visuaalinen arvio

Keskustori, Kolme veljestä, Mustapäiden talo, Pyhän Pietarin kirkko, Riian tuomiokirkko ja Vapaudenpatsas ovat yksittäisiä irrallisia fyysisiä paikkoja. Viisto kuvakulma, hillitty akvarellipaletti ja mustepiirros pysyvät yhtenäisinä. Taivasta, horisonttia, ympäröivää maisemaa, pyöreää vinjettiä tai tarinallista toimintaa ei ole. Vapaudenpatsaan kapea muoto jättää enemmän tyhjää ympärille, mutta kuva on ehjä.

## Tekninen QA ja poikkeukset

Kaikki kuusi ovat 1024×1024 RGBA:ta. Alfa kattaa välin 0–255, neljä kulmaa ovat läpinäkyvät ja leikkausreuna jokaisessa 0,000; leikkauspoikkeuksia ei ole. 1024 pikselin koko poikkeaa tilaustekstin 512 pikselin tavoitteesta. Vapaudenpatsaan täyttö 0,091 on muotoon nähden odotettu, eikä yksin tyylipoikkeus.

Alkuperäistiedostojen SHA-256, alfa, mitat ja täyttö ovat `output/style-audit-europe-20260927/riika/qa.json`-manifestissa. `old/` sisältää auditointihetken kopiot; `raw/` ja `rejected/` ovat tyhjiä, koska kuvia ei generoitu.

Lähteet: `js/packs/miniatyyrit.js` (kuusi paikallista viitettä), `js/packs/maakartat.js` (kaupungin karttakonteksti), Sisältökirjurin 27.9.2026 tyyliuudistustilaus ja tyylilista commitissa `389efbb3`.

AGENTS-portit: kaksoisavaimet, niputus, savukkeet ja nimiolimitys läpäisivät. Koko `node --test tests/*.test.mjs`: 4 500 testiä, 4 485 läpäisi, 15 ohitettiin, 0 epäonnistui (väliaikainen polku ilman välilyöntejä).
