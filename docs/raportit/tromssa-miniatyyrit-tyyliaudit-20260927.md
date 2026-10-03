# Tromssan R2-miniatyyrien tyyliaudit 27.9.2026

Kaupungin kartassa on viisi live-R2-PNG:tä eikä paikallisia WebP-miniatyyrejä. Hain kaikki viisi kuvaa ja vertasin niitä hyväksyttyyn Ateenan viistoon, hillittyyn muste-vesiväridioraamaan sekä pelikuvauksissa nimettyihin fyysisiin paikkoihin. Neljä kuvaa säilytettiin. Polarialle tehtiin uusi **R2-toimitusta odottava ehdokas**, sillä vanha kuva ei vastaa rakennuksen tunnistettavaa muotoa. [Koko kaupungin ennen/jälkeen-kontaktiarkki](kuvat/tromssa-miniatyyrit-ennen-jalkeen-20260927.jpg) näyttää kaikki viisi rinnakkain.

| R2-tunnus | Ehdokas | Täyttö | Reuna | Päätös |
| --- | --- | ---: | ---: | --- |
| `tromssa-polaarimuseo-vari2` | 1024×1024 | 0.441 | 0.000 | nykyinen 1024×1024 PNG säilytetty |
| `tromssa-tromssan-silta-vari2` | 1024×1024 | 0.125 | 0.000 | nykyinen 1024×1024 PNG säilytetty |
| `tromssa-tromssan-tuomiokirkko-vari2` | 1024×1024 | 0.299 | 0.000 | nykyinen 1024×1024 PNG säilytetty |
| `tromssa-jaamerenkatedraali-vari2` | 1024×1024 | 0.313 | 0.000 | nykyinen 1024×1024 PNG säilytetty |
| `tromssa-polaria-vari2` | 512×512 | 0.302 | 0.000 | uusi 512×512 PNG, odottaa R2-toimitusta |

## Korjattu poikkeama

Polarian vanha kuva näyttää vaakasuoraan pinotuilta kerroksilta. Karttamerkin ja noston kohde on kuitenkin Polarian rakennus, jonka tunnusomainen ulkomuoto koostuu rantaan ajautuneita jäälauttoja muistuttavista vinosti nousevista valkoisista levyistä. Uusi ehdokas esittää juuri tätä matalaa, pitkää ja kulmikasta rakennusta viistosta ylhäältä. Ulkomuodon tarkistuksessa käytettiin [Visit Norwayn Polaria-kuvausta](https://www.visitnorway.com/listings/entrance-ticket-polaria/230587/).

Polaarimuseon punainen laiturimakasiini, pitkä betonisilta, keltainen puutuomiokirkko ja Jäämerenkatedraalin terävät kattolaatat säilyvät. Ne ovat jo eristettyjä fyysisiä paikkoja, joiden hillitty muste-vesivärityyli sopii hyväksyttyyn sarjaan. Sillan täyttö on pieni (0,125), koska pitkä ja matala rakenne on luonnostaan kapea neliökuvassa; se ei ole leikkaus- eikä tyylipoikkeama.

ImageGenillä tehtiin yksi täysin uusi raakaehdokas ja se hyväksyttiin koko kaupungin kontaktivertailussa. Alkuperäiset live-R2-kuvat, raakatiedosto ja hyväksytty PNG ovat `output/style-audit-europe-20260927/tromssa/`-kansiossa. Hylättyjä uusia ehdokkaita ei syntynyt. Hyväksytty tiedosto on `final/tromssa-polaria-vari2.png`, SHA-256 `9ca0db391cd3bff98d1bc1fadfb9f5d739cd1eabb649bbc9c41c7bbd926d5bed`. Sitä **ei ole ladattu R2:een**.

## Tekninen QA ja poikkeukset

Uusi Polaria-PNG on 512×512 RGBA, upotettu sRGB-profiili, alfa 0–255 ja neljä täysin läpinäkyvää kulmaa. Täyttö on 0,302 ja leikkausreuna 0,000. Neljä säilytettyä live-R2-kuvaa ovat 1024×1024 RGBA; niissäkin on läpinäkyvät kulmat ja leikkausreuna 0,000. Leikkauspoikkeuksia ei ole. Säilytettyjen kuvien 1024 pikselin koko poikkeaa 512 pikselin toimitustavoitteesta, mutta tyyliä ei muutettu pelkän koon perusteella.

Vanhojen ja ehdokkaan SHA-256, mitat, alfa, täyttö, R2-osoitteet ja päätökset ovat `output/style-audit-europe-20260927/tromssa/qa.json`-manifestissa. ImageGen-prompti on `prompt.txt`-tiedostossa.

Lähteet: `js/packs/miniatyyrit.js` (viisi R2-tunnusta), `js/packs/maakartat.js` (fyysiset kohteet), `js/packs/nahtavyysjutut.js` (Polarian ja muiden nostot), Sisältökirjurin 27.9.2026 tyyliuudistustilaus commitissa `389efbb3`, [Visit Norway: Polaria](https://www.visitnorway.com/listings/entrance-ticket-polaria/230587/) ja [Visit Norway: Jäämerenkatedraali](https://www.visitnorway.com/listings/the-arctic-cathedral/127032//).

AGENTS-portit kaksoisavaimet, niputus, savukkeet ja nimiolimitys läpäisivät. Koko `node --test tests/*.test.mjs`: 4 512 testiä, 4 497 läpäisi, 15 ohitettiin, 0 epäonnistui (väliaikainen polku ilman välilyöntejä).
