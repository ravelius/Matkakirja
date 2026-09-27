# Sevillan R2-miniatyyrien tyyliaudit 27.9.2026

Kaupungin kartassa on seitsemän R2-PNG:tä eikä paikallisia WebP-miniatyyrejä. Hain kaikki seitsemän live-kuvaa ja vertasin niitä hyväksyttyihin Ateenan viistoihin, hillittyihin muste-vesiväridioraamoihin. Kuusi kuvaa säilytettiin. `Victorian laituri` sai uuden **R2-toimitusta odottavan havainnekuvan**, koska vanhaa kuvaa hallitsi Victoria-laiva eikä karttamerkin nimeämä fyysinen laituri. [Koko kaupungin ennen/jälkeen-kontaktiarkki](kuvat/sevilla-miniatyyrit-ennen-jalkeen-20260927.jpg) näyttää muutoksen.

| R2-tunnus | Lopullinen ehdokas | Täyttö | Reuna | Päätös |
| --- | --- | ---: | ---: | --- |
| `sevilla-alcazar-vari2` | 1024×1024 | 0.509 | 0.000 | nykyinen 1024×1024 PNG säilytetty |
| `sevilla-katedraali-ja-giralda-vari2` | 1024×1024 | 0.440 | 0.000 | nykyinen 1024×1024 PNG säilytetty |
| `sevilla-maestranzan-areena-vari2` | 1024×1024 | 0.525 | 0.000 | nykyinen 1024×1024 PNG säilytetty |
| `sevilla-plaza-de-espana-vari2` | 1024×1024 | 0.379 | 0.000 | nykyinen 1024×1024 PNG säilytetty |
| `sevilla-torre-del-oro-vari2` | 1024×1024 | 0.354 | 0.000 | nykyinen 1024×1024 PNG säilytetty |
| `sevilla-trianan-silta-vari2` | 1024×1024 | 0.284 | 0.000 | nykyinen 1024×1024 PNG säilytetty |
| `sevilla-victorian-laituri-vari2` | 512×512 | 0.339 | 0.000 | uusi 512×512 PNG, odottaa R2-toimitusta |

## Korjattu tyylipoikkeus

`Victorian laituri` on `maakartat.js`-tiedostossa nimetty fyysiseksi laituriksi. Vanha R2-kuva esitti pääasiassa suurta purjelaivaa ja vain pientä kivilaiturin kappaletta. Uusi havainnekuva esittää viistosta ylhäältä kivisen joenrannan rantautumispaikan: portaat, pollarit, kiinnitysrenkaat ja kapea vesikaistale. Laiva, ihmiset ja tapahtuma puuttuvat. Tämä on kuvallinen tyylikorjaus, ei väite vuoden 1519 laiturin täsmällisestä rakenteesta.

ImageGenillä tehtiin kaksi kokonaan uutta ehdokasta yksi kerrallaan. Ensimmäinen hylättiin liian terävän/renderöidyn pinnan vuoksi. Toinen hyväksyttiin koko kaupungin kontaktivertailussa. Alkuperäinen live-R2-kuva, molemmat raaka-PNG:t, hylätty ehdokas ja hyväksytty PNG säilyvät `output/style-audit-europe-20260927/sevilla/`-kansiossa. Hyväksytty tiedosto on `final/sevilla-victorian-laituri-vari2.png`, SHA-256 `838c1dbb6ee72549ac5260008a4528155a3ce3b538757594f2fd44d7b62b501a`. Sitä **ei ole vielä ladattu R2:een**.

## Tekninen QA ja poikkeukset

Hyväksytty uusi PNG on 512×512 RGBA, upotettu sRGB-profiili, alfa 0–255, neljä täysin läpinäkyvää kulmaa, täyttö 0,339 ja leikkausreuna 0,000. Kuusi säilytettyä live-R2-kuvaa ovat 1024×1024 RGBA; niidenkin kulmat ovat läpinäkyviä ja reuna 0,000. Leikkauspoikkeuksia ei ole. Säilytettyjen kuvien 1024 pikselin koko poikkeaa tilaustekstin 512 pikselin tavoitteesta, mutta tyyliä ei muutettu pelkän mitan perusteella.

Vanhojen ja hyväksyttyjen kuvien SHA-256, mitat, alfa, täyttö, R2-osoitteet ja päätökset ovat `output/style-audit-europe-20260927/sevilla/qa.json`-manifestissa; käytetyt ImageGen-promptit ovat `prompt.txt`-tiedostossa.

Lähteet: `js/packs/miniatyyrit.js` (seitsemän R2-tunnusta), `js/packs/maakartat.js` (fyysiset karttapaikat), `js/packs/nahtavyysjutut.js` (Victorian laiturin nostoteksti), Sisältökirjurin 27.9.2026 tyyliuudistustilaus commitissa `389efbb3`.

AGENTS-portit: kaksoisavaimet, niputus, savukkeet ja nimiolimitys läpäisivät. Koko `node --test tests/*.test.mjs`: 4 512 testiä, 4 497 läpäisi, 15 ohitettiin, 0 epäonnistui (väliaikainen polku ilman välilyöntejä).
