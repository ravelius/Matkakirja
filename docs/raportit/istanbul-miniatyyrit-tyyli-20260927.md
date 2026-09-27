# Istanbulin nähtävyysminiatyyrien tyyliarvio 27.9.2026

Fablen tilausta `posti/sisaltokirjuri-kuvaputki-tyyliuudistus-20260927.md` verrattiin neljään omistajan hyväksymään Ateenan viistoon muste-vesiväripienoismalliin. Kaikki 11 paikallista WebP:tä käytiin läpi sekä vaalealla pelikarttapaperilla että tummalla taustalla. [Koko kaupungin ennen–jälkeen-kontaktiarkki](kuvat/istanbul-miniatyyrit-ennen-jalkeen-20260927.jpg) näyttää samat kuvat molemmilla puolilla, sillä yhtäkään fyysistä paikkaa ei tarvinnut uusia.

| Karttakohde | Päätös |
| --- | --- |
| Suuri basaari | Säilytä: eristetty viisto holvikäytävän pienoismalli. |
| Sininen moskeija | Säilytä: viisto moskeijan pienoismalli. |
| Hagia Sofia | Säilytä: viisto rakennuksen pienoismalli. |
| Topkapın palatsi | Säilytä: rajattu viisto palatsin pienoismalli. |
| Galatan torni | Säilytä: yksittäinen torni ja pieni välitön jalusta, ei näkyvää taustamaisemaa. |
| Üsküdar | Säilytä: Şemsi Paşan moskeijaa esittävä viisto rajattu pienoismalli. |
| Süleymaniyen moskeija | Säilytä: viisto moskeijan pienoismalli. |
| Galatan silta | Säilytä: rajattu sillan rakenteen pienoismalli. |
| Sirkecin asema | Säilytä: viisto rakennuksen pienoismalli. |
| Neitsyttorni | Säilytä: yksittäinen torni pienellä luodolla. |
| Konstantinopoli 1453 | Säilytä Fablen tapahtumakuvalinjausta noudattaen; tämä on piiritystilanne, ei fyysisen paikan pienoismalli. |

Galatan tornin ja Üsküdarin tiedostot sisältävät nolla-alfan RGB-kanavissa vaaleita geometrisia jäämiä, jotka saattavat näkyä kuvankatselimen alfaa sivuuttavassa esikatselussa. Alfa-arvot ovat siellä 0 ja jäämät **eivät piirry** pelin karttapaperille; erillinen tumman taustan tarkastus vahvisti tämän. Niistä ei siksi tehdä uutta kuvaa vain raakadatassa näkyvien näkymättömien värien takia.

Kolme kaupungin R2-viitettä (`istanbul-vararikko-1875`, `istanbul-camondon-portaat`, `istanbul-kaarmepylvas`) eivät palauttaneet julkista kuvaa tämän auditoinnin GET-kokeessa (403). Niiden puuttuvat kuvat ovat erillisen tuotantoagentin tehtävä; niitä ei generoitu tässä työssä eikä sen hakemistoihin koskettu. Tämä dokumentti ei väitä niiden olevan pelissä.

Paikallisten 11 tiedoston mittoja, alfan olemassaoloa ja SHA-256-tunnisteita verrattiin `tools/miniatyyri-mitat.json`-manifestiin. Kuviin tai mittamanifestiin ei tullut muutosta. `tests/miniatyyrit-leikkaus.test.mjs` ja AGENTS.md:n portit ajetaan ennen haaran puskua. Ei versionnostoa, PR:ää, mergeä eikä julkaisuvarmennusta tässä kaupungin auditointierässä.
