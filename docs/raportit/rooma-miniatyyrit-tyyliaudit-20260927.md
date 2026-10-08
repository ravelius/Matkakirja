# Rooman pienoiskuvien tyyliauditointi 27.9.2026

Vertailu: Sisältökirjurin 27.9.2026 tyyliuudistustilaus ja omistajan hyväksymät `ateena-akropolis.webp`, `ateena-antiikin-agora.webp`, `ateena-zeuksen-temppeli.webp` ja `ateena-syntagman-aukio.webp`. Katsottu kaikki `js/packs/miniatyyrit.js`:n Rooman 16 riviä: 12 paikallista WebP:tä, kaksi toimivaa R2-PNG:tä ja kaksi R2:n 404-riviä. Koko kartan vertailu: [ennen ja jälkeen](kuvat/rooma-miniatyyrit-ennen-jalkeen-20260927.jpg).

**Yksi korjaus:** `rooma-trevin-suihkulahde.webp` on piirretty kokonaan uudelleen vinosta yläkulmasta. Edellinen kuva oli lähes suora julkisivunäkymä. Uudessa näkyvät Palazzo Polin rakenteen sivu ja katto, lähteen veistokset sekä altaan syvyys yhtenä irrallisena pienoismallina. Mallina käytettiin myös [Rooman kaupungin kohdekuvausta](https://turismoroma.it/en/node/1286). Kuva on 512 × 512 WebP, RGBA, sRGB, aito alfa: kulmien alfa 0, alfa-alue 0–255. SHA-256: `980622e9522965d161f5dc84e30ae08a79e45fae1f5057970ffeecc760a6a151`. Raaka PNG, alkuperäinen WebP ja liian suurena hylätty väliversio ovat paikallisessa työaineistossa `output/style-audit-europe-20260927/rooma/`.

| Kohde | Lähde | Koko | Täyttö / reuna | Päätös |
| --- | --- | --- | --- | --- |
| Pietarinkirkko | WebP | 1024² | 0,230 / 0 | Säilyy: viisto irrallinen rakennus |
| Castel Sant’Angelo | WebP | 1024² | 0,236 / 0 | Säilyy: viisto linnoitus |
| Espanjalaiset portaat | WebP | 1024² | 0,197 / 0 | Säilyy: viisto porraspaikka |
| Trevin suihkulähde | WebP | 512² uusi | 0,546 / 0 | **Uusittu** |
| Pantheon | WebP | 1024² | 0,194 / 0 | Säilyy: viisto rakennus |
| Colosseum | WebP | 1024² | 0,380 / 0 | Säilyy: viisto rakennus |
| Torre Argentina | R2-tunnus | 404 | – | Toisen agentin puuttuva kuva; ei tässä erässä |
| Vatikaanin palatsi | R2-tunnus | 404 | – | Toisen agentin puuttuva kuva; ei tässä erässä |
| Forum Romanum | R2 PNG | 1024² | 0,470 / 0 | Säilyy: viisto raunioalue, aito alfa |
| Banca Romana | R2 PNG | 1024² | 0,406 / 0 | Säilyy: skandaalin kuvallinen pankkiaihe, ei paikka |
| Sikstus 1510 | WebP | 512² | 0,765 / 0,149 | Säilyy: historian hetken toimintakuva |
| Kolikko olan yli | WebP | 512² | 0,837 / 0,441 | Säilyy: toimintakuva, ei nähtävyyden rakennuskuva |
| Areenan kellari | WebP | 512² | 0,699 / 0 | Säilyy: fyysisen paikan viisto leikkauskuva; mittapoikkeus |
| Norsu ja obeliski | WebP | 512² | 0,225 / 0 | Säilyy: irrallinen veistos |
| Aqua Virgo | WebP | 512² | 0,619 / 0 | **Sisältöpoikkeus:** maisemallinen kuva, mutta `tyyppi: 'esine'` ja nosto kuvaa 22 km:n enimmäkseen maanalaista vesijohtoa, ei yhtä näkyvää vierailupaikkaa. Tarvitsee sisältöpäätöksen ennen uutta paikkaikonikuvaa. |
| Nasone | WebP | 512² | 0,463 / 0 | Säilyy: irrallinen katulähde |

Täyttö ja reuna on mitattu 256 × 256 -alfasta rajalla `alfa > 200`. Paikallisten kuvien mitta on `tools/miniatyyri-mitat.json`:ssa; R2:n kahdelle PNG:lle laskettiin sama mitta erikseen. R2:n nykytilat tarkistettiin osoitteesta `media.matkakirja.app/kohtaamiset/miniatyyrit/<tunnus>.png` 27.9.2026. Puuttuvien kuvien 404-tilaa tai sisältöä ei muutettu.

**Leikkauspoikkeukset:** `Sikstus 1510` ja `Kolikko olan yli` ovat tarkoituksellisia tapahtumakuvia Ateenan hyväksytyn sisältölinjan mukaan. `Areenan kellari` ylittää täyttörajan 0,6, vaikka silmämääräisesti on paikalle uskollinen irrallinen kolmiulotteinen leikkaus. `Aqua Virgo` ylittää saman rajan ja jää odottamaan sisältöpäätöstä. `Trevi` alittaa rajan korjauksen jälkeen eikä kosketa ruudun kehää.

Generointikehote (built-in ImageGen): “Generate an entirely new illustration of the Trevi Fountain as a single isolated historical architectural diorama: Palazzo Poli's pale Baroque facade, central Oceanus niche, shell chariot, horses, sculpted rocks and broad basin. Elevated three-quarter isometric view showing roof and side depth; fine dark-brown architectural ink lines, restrained limestone watercolor and muted blue water. Square, genuine transparent alpha, no sky, city, tourists, text, vignette or frontal postcard view.”

Julkaisutila: ainoastaan tämän haaran paikallinen WebP ja mittaustiedosto on muutettu; ei versionnostoa, R2-toimitusta, PR:ää, mergeä eikä peliin näkyvyyden väitettä.
