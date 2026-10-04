# Dubrovnikin R2-miniatyyrien tyyliaudit 27.9.2026

Kartassa on kuusi R2-PNG:tä eikä paikallisia WebP-miniatyyrejä. Hain kuusi live-kuvaa ja vertasin niitä hyväksyttyihin Ateenan viistoihin muste-vesiväridioraamoihin. Kaikki kuusi esittävät fyysisiä paikkoja ja sopivat tyyliin. [Koko kaupungin ennen/jälkeen-kontaktiarkissa](kuvat/dubrovnik-miniatyyrit-ennen-jalkeen-20260927.jpg) jälkeen-rivit ovat samat, koska kuvia ei uusittu.

| R2-tunnus | Mitat | Täyttö | Reuna | Päätös |
| --- | --- | ---: | ---: | --- |
| `dubrovnik-dubrovnikin-katedraali-vari2` | 1024×1024 | 0.417 | 0.000 | säilytetty |
| `dubrovnik-lovrijenacin-linnake-vari2` | 1024×1024 | 0.492 | 0.000 | säilytetty |
| `dubrovnik-mincetan-torni-vari2` | 1024×1024 | 0.458 | 0.000 | säilytetty |
| `dubrovnik-pilen-portti-vari2` | 1024×1024 | 0.501 | 0.000 | säilytetty |
| `dubrovnik-sponzan-palatsi-vari2` | 1024×1024 | 0.502 | 0.000 | säilytetty |
| `dubrovnik-vanhasatama-vari2` | 1024×1024 | 0.544 | 0.000 | säilytetty |

## Visuaalinen arvio

Dubrovnikin katedraali, Lovrijenacin linnake, Minčetan torni, Pilen portti, Sponzan palatsi ja Vanhasatama ovat eristettyjä viistoja fyysisten paikkojen pienoismalleja. Paletti on hillittyä mustetta ja akvarellia. Lovrijenacin kallio sekä satama-altaan vesi ja pienet veneet kuuluvat itse paikkamotiiveihin; erillistä taivasta, horisonttia, ympäröivää maisemaa, vinjettiä tai tarinallista toimintaa ei ole. Karttadata sijoittaa linnakkeen omalle kalliolleen ja Vanhasataman laiturille.

## Tekninen QA ja poikkeukset

Kaikki kuusi live-R2-kuvaa ovat 1024×1024 RGBA-PNG:tä. Alfa kattaa välin 0–255, neljä kulmaa ovat läpinäkyvät ja leikkausreuna jokaisessa 0,000; leikkauspoikkeuksia ei ole. 1024 pikselin koko poikkeaa tilaustekstin 512 pikselin tavoitteesta. Täyttö vaihtelee 0,417–0,544.

Live-kuvien SHA-256, alfa, mitat, täyttö ja lähdeosoitteet ovat `output/style-audit-europe-20260927/dubrovnik/qa.json`-manifestissa. `old/` sisältää auditointihetken kopiot; `raw/` ja `rejected/` ovat tyhjiä, koska kuvia ei generoitu.

Lähteet: `js/packs/miniatyyrit.js` (kuusi R2-tunnusta), `js/packs/maakartat.js` (fyysiset karttapaikat), Sisältökirjurin 27.9.2026 tyyliuudistustilaus commitissa `389efbb3`.

AGENTS-portit: kaksoisavaimet, niputus, savukkeet ja nimiolimitys läpäisivät. Koko `node --test tests/*.test.mjs`: 4 505 testiä, 4 490 läpäisi, 15 ohitettiin, 0 epäonnistui (väliaikainen polku ilman välilyöntejä).
