# Firenzen nähtävyysminiatyyrien tyyliarvio 27.9.2026

Fablen Euroopan tyyliuudistuksen kaikki yhdeksän paikallista WebP:tä ja kaksi R2-kuvaa käytiin läpi. [Koko kaupungin ennen–jälkeen-kontaktiarkki](kuvat/firenze-miniatyyrit-ennen-jalkeen-20260927.jpg) vertaa niitä omistajan hyväksymiin Ateenan viistoihin muste-vesiväripienoismalleihin. Alkuperäinen Fablen otoslista merkitsi Firenzen puhtaaksi, mutta tarkempi näkymä paljasti kaksi lähes suoraa paikallista etunäkymää ja yhden R2:n väärän taustakaupungin.

| Karttakohde | Päätös |
| --- | --- |
| Duomo | Säilytä: rajattu rakennusmalli, jossa näkyvät sivuseinä ja kupolin syvyys. |
| Palazzo Vecchio | Säilytä: eristetty viisto palatsin pienoismalli. |
| Uffizi | Säilytä: eristetty viisto rakennusryhmän pienoismalli. |
| Ponte Vecchio | Uusi yläviisto sillan pienoismalli korvaa lähes suoran sivunäkymän. |
| Santa Croce | Säilytä: rajattu viisto kirkon pienoismalli. |
| Bobolin puutarha | Säilytä: rajattu viisto puutarhan pienoismalli. |
| Bargello | Säilytä: viisto rajattu sisäpihan pienoismalli. |
| Galleria dell'Accademia | Säilytä: museon sisätilaa ja teosta esittävä kuva Fablen esine-/sisältöpoikkeuksena. |
| Santa Maria Novella | Uusi yläviisto basilika korvaa pelkän suoran julkisivun. |
| Poggin terassi (R2) | Vanha R2-kuva sisältää Firenzeen sopimattoman minareettimaisen taustakaupungin. Uusi eristetyn terassin ja loggian PNG on **paikallinen ehdokas** uudella `firenze-poggin-terassi-vari3.png`-avaimella. |
| Porcellino (R2) | Säilytä: rajattu viisto suihkulähdepienoismalli. |

Kaksi uutta WebP:tä luotiin ImageGenillä kokonaan uudelleen, taustan RGB-shakkiruudukko poistettiin, ja tulokset tarkistettiin vaalealla pelikarttapaperilla. Molemmat ovat 512 × 512, todellisella alfalla ja täysin läpinäkyvällä ulkoreunalla. `tools/miniatyyri-mitat.json` päivitettiin kahden muuttuneen kuvan mukaan. Täyttö on 0,289 ja 0,450, joten leikkauspoikkeusten listaa ei muutettu. Nykyiset R2-kuvat palauttivat HTTP 200:n ja `image/png`-sisällön. Uusi Poggin terassin ehdokas on 1024 × 1024 RGBA PNG; sitä ei ole tässä haarassa lähetetty R2:een. `js/packs/miniatyyrit.js` viittaa jo uuteen avaimeen **vain tässä PR-haarassa**. R2-objekti on toimitettava ja tarkistettava ennen haaran yhdistämistä, jotta pelin viite ei jää rikkinäiseksi.

Alkuperäiset, raakakuvat, hylätty kokeilu, julkisten R2-kuvien tarkistuskopiot, lähteet ja SHA-256-/QA-manifesti ovat tuotannon `output/style-audit-europe-20260927/firenze/`-hakemistossa. Poggin terassin loggian ja balustradin lähtökohtana on Firenzen kaupungin [virallinen Piazzale Michelangiolon kuvaus](https://www.feelflorence.it/en/points-interest/piazzale-michelangiolo); ehdokkaan kohdetunnistettavuus vaatii vielä lopullisen visuaalisen tarkistuksen. Kaikki varsinaiset AGENTS.md-portit sekä täysi testisarja menivät läpi. Erillinen karttapistetarkistin huomauttaa Ponte Vecchion merkin olevan vedessä; se on sillan kohdalla odotettu aiempi tilanne, eikä tässä työssä muutettu koordinaatteja. Haara ei merkitse PR:ää, mergeä, julkaisua eikä asennetussa pelissä varmennettua näkymää. Versionumeroon ei koskettu.
