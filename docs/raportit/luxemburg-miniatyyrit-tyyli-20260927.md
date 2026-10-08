# Luxemburgin nähtävyysminiatyyrien tyyliuudistus 27.9.2026

Fablen Euroopan tyyliuudistuksen kaikki kuusi Luxemburgin paikallista WebP:tä verrattiin omistajan hyväksymiin Ateenan viistoihin muste-vesiväripienoismalleihin. R2-viitteitä ei kaupungilla ole tämän inventaarion mukaan. [Koko kaupungin ennen–jälkeen-kontaktiarkki](kuvat/luxemburg-miniatyyrit-ennen-jalkeen-20260927.jpg) näyttää neljä kokonaan uudelleen tehtyä kuvaa ja kaksi ennalleen jätettyä.

| Karttakohde | Päätös |
| --- | --- |
| Adolphe-silta | Uusi viisto rakennemalli korvaa suoran etunäkymän. |
| Guillaume II:n aukio | Uusi yläviisto aukion ja kaupungintalon malli korvaa suoran katunäkymän. |
| Notre-Damen katedraali | Uusi yläviisto katedraali näyttää myös sivuseinän ja katon. |
| Suurherttuallinen palatsi | Uusi yläviisto palatsi näyttää myös sivuseinän ja katon. |
| Chemin de la Corniche | Säilytä: eristetty viisto katurakenteen pienoismalli. |
| Bockin kasematit | Säilytä: eristetty viisto linnoituksen sisätilan leikkaus. |

Neljä uutta kuvaa luotiin ImageGenillä yksi kerrallaan. Raakakuvat olivat RGB-muotoisia ja niissä oli maalattu shakkiruudukko, joten tausta erotettiin ulkoreunasta ennen 512 × 512 WebP-koodausta. Alkuperäiset, raakakuvat, hylätty alpha-kokeilu ja tuotannon SHA-256-/QA-manifesti säilyvät `output/style-audit-europe-20260927/luxemburg/`-hakemistossa. Valmiit kuvat tarkistettiin vaalealla pelikarttapaperilla. Kaikissa kuudessa kuvassa on todellinen alpha ja täysin läpinäkyvä ulkoreuna. `tools/miniatyyri-mitat.json` päivitettiin neljän uuden kuvan SHA-256:n ja täytön mukaiseksi. Suurherttuallisen palatsin alun perin liian suuri täyttö 0,614 pienennettiin 0,540:een väljemmällä läpinäkyvällä rajauksella, joten leikkaustestin poikkeuslistaa ei muutettu.

Tämä haara sisältää paikalliset kuvat ja niiden auditointiaineiston. Se ei vielä ole PR, merge eikä todennettu julkaisu tai asennetun pelin näkymä. Pelin versionumeroon ei koskettu.
