# Edinburghin pienoiskuvien tyyliauditointi 27.9.2026

Vertailu: Sisältökirjurin 27.9.2026 tyyliuudistustilaus ja omistajan hyväksymät `ateena-akropolis.webp`, `ateena-antiikin-agora.webp`, `ateena-zeuksen-temppeli.webp` sekä `ateena-syntagman-aukio.webp`. Tarkistin kaikki `js/packs/miniatyyrit.js`:n Edinburghin seitsemän kohdetta: kuusi paikallista WebP:tä ja yhden R2-PNG:n. Koko kaupungin [ennen/jälkeen-kontaktiarkki](kuvat/edinburgh-miniatyyrit-ennen-jalkeen-20260927.jpg) näyttää samat kuvat kummallakin puolella: **uusittavaa fyysistä karttapaikkaa ei löytynyt**.

| Kohde | Lähde ja koko | Täyttö / reuna | Arvio |
| --- | --- | --- | --- |
| Charlotte Square | WebP 1024² | 0,153 / 0 | Viisto rajattu aukion rakennusrivi; säilyy |
| Edinburghin linna | WebP 1024² | 0,247 / 0 | Irrallinen linna omalla kalliollaan; säilyy |
| Greyfriars Bobby | WebP 1024² | 0,287 / 0 | Bobbyn muistopatsas katuympäristössä; henkilöjuttu, säilyy sisältöpoikkeuksena |
| Calton Hill | WebP 1024² | 0,232 / 0 | Kukkulan Kansallismonumentti ja Nelsonin torni yhdessä; säilyy |
| Holyroodin palatsi | WebP 1024² | 0,198 / 0 | Palatsi ja sen viereisen luostarin rauniot rajattuna kokonaisuutena; säilyy |
| St Gilesin katedraali | WebP 1024² | 0,202 / 0 | Viisto katedraali ja tunnusomainen kruunutorni; säilyy |
| Scott-monumentti | R2 PNG 512² | 0,193 / 0 | Irrallinen goottilainen torni viistosta, kiven luontainen tumma sävy; säilyy |

Kaikissa seitsemässä kuvassa on aito alfa (alue 0–255, kulmat 0). Kuvakulma, rajaus ja muste-vesiväripaletti vastaavat Ateenan hyväksyttyjä malleja. Greyfriars Bobbyn kuvaa ei tulkita rakennuspienoismalliksi: `js/packs/maakartat.js` merkitsee kohteen tyypiksi `henkilo`, ja `js/packs/nahtavyysjutut.js` kertoo koirasta sekä sille 1873 pystytetystä muistolähteestä. Sen katuympäristö jäi ennalleen hyväksytyn henkilö- ja tapahtumakuvien poikkeuslinjan mukaan. Calton Hillin kaksi monumenttia ja Holyroodin viereiset rauniot kuuluvat niiden nostojen kuvaamiin paikkoihin.

Täyttö ja reuna on mitattu 256 × 256 -alfasta rajalla `alfa > 200`. Paikallisten kuvien luvut ovat `tools/miniatyyri-mitat.json`:ssa; R2-kuvalle käytettiin samaa mittaria erikseen. Ajoin `node tools/mittaa-miniatyyrit.mjs`: 413 kuvaa, **mittamanifestiin ei tullut muutosta**. Yksikään Edinburghin kuva ei ylitä täyttörajaa 0,6 eikä reunarajaa 0,35; **leikkauspoikkeuslista on tyhjä**. Scott-monumentin R2-tunnus palautti 200 (`image/png`) tarkistushetkellä.

Alkuperäiset WebP:t, tarkistuksessa haettu R2-PNG ja tekninen/visuaalinen QA ovat paikallisessa `output/style-audit-europe-20260927/edinburgh/`-työaineistossa. `raw/` ja `rejected/` ovat tyhjät, koska uusia kuvia ei tarvittu. Pelikuvaa, koodia, versionumeroa tai R2-sisältöä ei muutettu. Ei PR:ää eikä mergeä.
