# Lissabonin nähtävyysminiatyyrien tyyliarvio 27.9.2026

Fablen Euroopan tyyliuudistuksen kaikki Lissabonin 10 karttaminia verrattiin omistajan hyväksymiin Ateenan viistoihin muste-vesiväripienoismalleihin. [Koko kaupungin ennen–jälkeen-kontaktiarkissa](kuvat/lissabon-miniatyyrit-ennen-jalkeen-20260927.jpg) näkyvät viisi paikallista WebP:tä ja viisi R2-kuvaa vaalealla pelikarttapaperilla. Molemmat puolet ovat samat, koska yksikään fyysinen kohde ei poikennut tyylistä niin, että se pitäisi generoida uudelleen.

| Karttakohde | Lähde | Päätös |
| --- | --- | --- |
| Rossio | Paikallinen WebP | Säilytä: aukion rajattu, viisto pienoismalli; teatteri kuuluu välittömään aukioon. |
| São Jorgen linna | Paikallinen WebP | Säilytä: eristetty viisto linnan pienoismalli. |
| Tuomiokirkko | Paikallinen WebP | Säilytä: yksittäinen viisto katedraali. |
| Kauppatori | Paikallinen WebP | Säilytä: rajattu viisto aukion rakennusryhmä. |
| Kansallispanteoni | Paikallinen WebP | Säilytä: viisto rakennus, vain pieni välitön katutila mukana. |
| Calçada | R2 PNG | Säilytä: eristetty viisto katukiveyksen näyte. |
| Largo da Severa | R2 PNG | Säilytä: rajattu viisto talo- ja aukiopienoismalli. |
| Alves dos Reis | R2 PNG | Säilytä Fablen esinekuvapoikkeuksena: setelit, ei kartan fyysinen paikka. |
| Ultimaatum 1890 | R2 PNG | Säilytä Fablen tapahtumakuvapoikkeuksena: karttakäärö. |
| Kolumbus 1484 | R2 PNG | Säilytä Fablen tapahtuma-/henkilökuvapoikkeuksena: karttapöytä. |

Kaikissa viidessä paikallisessa WebP:ssä on 1024 × 1024 pikseliä, todellinen alpha ja läpinäkyvä ulkoreuna. Jokaisen SHA-256:n 16 ensimmäistä merkkiä vastaavat `tools/miniatyyri-mitat.json`-manifestia, eikä leikkaustestin poikkeuslistaan tarvita muutosta. Viisi R2-osoitetta palauttivat HTTP 200:n ja `image/png`-sisällön; kaksi on 512 × 512 ja kolme 1024 × 1024 pikseliä. Kaikissa on todellinen alpha ja täysin läpinäkyvä ulkoreuna. R2-kuvat ovat tässä vain auditoituja julkisia objekteja; auditointi ei osoita niiden näkymistä julkaistun pelin kartassa.

Paikalliset alkuperäiset ja R2:n tarkistuskopiot sekä R2-vastausten tekniset tiedot ovat tuotannon `output/style-audit-europe-20260927/lissabon/`-hakemistossa. Kuviin, mittamanifestiin, leikkauspoikkeuksiin tai pelin koodiin ei tehty muutoksia. Haarassa on vain tämä raportti ja kontaktiarkki; ei versionnostoa, PR:ää, mergeä tai julkaisua.
