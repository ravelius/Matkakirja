# Marseillen R2-miniatyyrien tyyliaudit 27.9.2026

Kaupungin kartassa on kuusi R2-PNG-tunnusta eikä paikallisia WebP-miniatyyrejä. Hain ja tarkistin kuusi nykyistä kuvaa julkisista R2-osoitteista. Ne esittävät fyysisiä paikkoja ja sopivat hyväksyttyihin Ateenan viistoihin muste-vesiväridioraamoihin. [Koko kaupungin ennen/jälkeen-kontaktiarkissa](kuvat/marseille-miniatyyrit-ennen-jalkeen-20260927.jpg) jälkeen-rivit ovat samat, koska kuvia ei vaihdettu.

| R2-tunnus | Mitat | Täyttö | Reuna | Päätös |
| --- | --- | ---: | ---: | --- |
| `marseille-marseillen-katedraali-vari2` | 1024×1024 | 0.441 | 0.000 | säilytetty |
| `marseille-mucem-vari2` | 1024×1024 | 0.423 | 0.000 | säilytetty |
| `marseille-notre-dame-de-la-garde-vari2` | 1024×1024 | 0.345 | 0.000 | säilytetty |
| `marseille-saint-charlesin-asema-vari2` | 1024×1024 | 0.469 | 0.000 | säilytetty |
| `marseille-saint-victorin-kirkko-vari2` | 1024×1024 | 0.455 | 0.000 | säilytetty |
| `marseille-vanhasatama-vari2` | 1024×1024 | 0.276 | 0.000 | säilytetty |

## Visuaalinen arvio

Marseillen katedraali, MuCEM, Notre-Dame de la Garde, Saint-Charlesin asema, Saint-Victorin kirkko ja Vanhasatama ovat eristettyjä, viistosta ylhäältä nähtyjä pienoismalleja. Paletti on hillittyä mustetta ja akvarellia. Taivasta, horisonttia, ympäröivää maisemaa, pyöreää vinjettiä tai tarinallista tapahtumaa ei ole. Vanhasatamassa veneet ovat altaan mittakaava- ja paikkavihjeitä. Karttateksti määrittää merkin juuri satama-altaaksi. Kuvan linnoitusmainen altaan rajaus on erillinen sisällöllisen tarkkuuden arviointikysymys, ei tämän tyyliauditin hylkäysperuste.

## Tekninen QA ja poikkeukset

Kaikki kuusi live-R2-kuvaa ovat 1024×1024 RGBA-PNG:tä. Alfa kattaa välin 0–255, neljä kulmaa ovat läpinäkyvät ja leikkausreuna jokaisessa 0,000; leikkauspoikkeuksia ei ole. 1024 pikselin koko poikkeaa tilaustekstin 512 pikselin tavoitteesta. Täyttö vaihtelee 0,276–0,469.

Live-kuvien SHA-256, alfa, mitat, täyttö ja lähdeosoitteet ovat `output/style-audit-europe-20260927/marseille/qa.json`-manifestissa. `old/` sisältää auditointihetken kopiot; `raw/` ja `rejected/` ovat tyhjiä, koska kuvia ei generoitu.

Lähteet: `js/packs/miniatyyrit.js` (kuusi R2-tunnusta), `js/packs/maakartat.js` (fyysiset karttapaikat ja Vanhasataman allas), Sisältökirjurin 27.9.2026 tyyliuudistustilaus commitissa `389efbb3`.

AGENTS-portit: kaksoisavaimet, niputus, savukkeet ja nimiolimitys läpäisivät. Koko `node --test tests/*.test.mjs`: 4 503 testiä, 4 488 läpäisi, 15 ohitettiin, 0 epäonnistui (väliaikainen polku ilman välilyöntejä).
