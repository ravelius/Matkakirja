# Dublinin pienoiskuvien tyyliauditointi 27.9.2026

Vertailu: Sisältökirjurin 27.9.2026 tyyliuudistustilaus sekä omistajan hyväksymät `ateena-akropolis.webp`, `ateena-antiikin-agora.webp`, `ateena-zeuksen-temppeli.webp` ja `ateena-syntagman-aukio.webp`. Tarkistin kaikki `js/packs/miniatyyrit.js`:n Dublinin yhdeksän kohdetta: kuusi paikallista WebP:tä ja kolme toimivaa R2-PNG:tä. Koko kaupungin [ennen/jälkeen-kontaktiarkki](kuvat/dublin-miniatyyrit-ennen-jalkeen-20260927.jpg) näyttää samat kuvat kummallakin puolella, koska **uusittavaa fyysistä karttapaikkaa ei löytynyt**.

| Kohde | Lähde ja koko | Täyttö / reuna | Arvio |
| --- | --- | --- | --- |
| Guinness-panimo | WebP 1024² | 0,216 / 0 | Viisto irrallinen panimorakennus; säilyy |
| Patrickin katedraali | WebP 1024² | 0,224 / 0 | Viisto irrallinen katedraali; säilyy |
| Dublinin linna | WebP 1024² | 0,228 / 0 | Linna ja lyhyt rakennussiipi pienoismallina; säilyy |
| Ha’penny-silta | WebP 1024² | 0,167 / 0 | Yksittäinen viisto silta; säilyy |
| Spire | WebP 1024² | 0,034 / 0 | Luontaisesti ohut pystysiluetti, ei maisemaa; säilyy |
| Trinity College | WebP 1024² | 0,325 / 0 | Viisto kellotorni ja kampuksen lyhyt rakennussiipi; säilyy |
| St James’s Gate | R2 PNG 512² | 0,540 / 0 | Erottuva irrallinen portti; rootin jo toimittama kuva, ei muutosta |
| Kellsin kirja | R2 PNG 1024² | 0,443 / 0 | Esinekuva, ei arkkitehtuurikohde; säilyy |
| Ouzel Galley | R2 PNG 1024² | 0,201 / 0 | Kadonneen laivan tarinakuva, ei fyysinen vierailupaikka; säilyy |

Kaikissa yhdeksässä kuvassa on aito alfa (alue 0–255, kaikki kulmat 0). Tyyliraja toteutuu kuudessa paikallisessa fyysisessä kohteessa: viisto kolmiulotteinen pienoismalli, läpinäkyvä ympäristö, hillitty muste-vesiväripaletti, ei taivasta tai kaukomaisemaa. Trinity Collegen kampussiipi ja vähäinen kasvillisuus kuuluvat saman rajatun kohteen pienoismalliin. R2:n kirja ja laiva seuraavat hyväksyttyä esine-/tapahtumakuvien poikkeuslinjaa; `js/packs/maakartat.js` merkitsee ne tyypeiksi `esine` ja `henkilo`. Niiden nostotekstit ovat `js/packs/nahtavyysjutut.js`:ssä.

Täyttö ja reuna on mitattu 256 × 256 -alfasta rajalla `alfa > 200`. Paikalliset luvut ovat `tools/miniatyyri-mitat.json`:ssa. Ajoin `node tools/mittaa-miniatyyrit.mjs`: tulos oli 413 kuvaa, **mittamanifestiin ei tullut muutosta**. R2:n kolmelle PNG:lle laskin saman mittarin erikseen. Yksikään Dublinin kuva ei ylitä täyttörajaa 0,6 eikä reunarajaa 0,35; **leikkauspoikkeuslista on tyhjä**. R2:n kaikki kolme tunnusta palauttivat 200 (`image/png`) tarkistushetkellä.

Alkuperäiset paikalliset WebP:t, tarkistuksessa haetut R2-PNG:t ja tekninen QA ovat paikallisessa työaineistossa `output/style-audit-europe-20260927/dublin/`. `raw/` ja `rejected/` ovat tyhjät, sillä uusia generointeja tai hylättyjä ehdokkaita ei tehty. Pelikuvaa, koodia, versionumeroa tai R2-sisältöä ei muutettu. Ei PR:ää eikä mergeä.
