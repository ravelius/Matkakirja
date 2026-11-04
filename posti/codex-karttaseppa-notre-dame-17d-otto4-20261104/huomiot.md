# Notre-Dame /17d, koko Cité-saari, otto 4 — tehtävä #2001

Lähde posti/karttaseppa-codex-nd-otto4-20261104.md, commit be5831299aec28d0f3f29ae7a2e2f47428598173, blob a56a91e611a9cf9155aef1bc0466187b93728ef0. Uusi lähde avasi vain Notre-Damen yhden uuden oton. Koko lähdeposti, TILAUS.md ja 13 manifestiliitettä luettu, kaikki lähdekuvat tarkastettu ja SHA256-varmennettu. Louvre pysyy pysäytettynä; aiemmat kuvat säilyvät.

Yksi kokonaan uusi sisäänrakennetun image_gen-työkalun kutsu. Natiivi **1536 × 1024 RGB**, täysin peittävä. Tämän tilauksen alfa=maski-vaatimus on poistettu; vastaanottaja leikkaa alkuperäisellä maskilla.
SHA256 a5b062630009aceb4c9cb8db5680ce3eb0e78163cbb995478feb76ff623346be.
Toimitus-PNG säilyttää generaattorin alkuperäiset tavut. Ei koon, värien, alfan tai sisällön jälkikorjausta, ei viidettä ottoa.

## Talojen koko ja muutokset
Palatsimaiset umpikorttelit jäivät pois ja saarelle syntyi tiheämpi tavallisten pienempien talojen verkko, kapeita kujia ja pieni länsiosan kivipiha. Notre-Dame ja Sainte-Chapelle puuttuvat natiivista. Katedraalin alkuperäisellä maskilla tehty QA-koeyhdistelmä paljastaa kuitenkin, että kivimaskin eteläreunaan ja itänousuun jää talojen kattoja/julkisivuja sekä puita; pohjoisrannan erilliseen kivikaistaan jää myös vettä ja taloja. Itäkärjen rantamuuri on natiivissa alkuperäistä maskia sisempänä, jolloin maskin sisälle jää ylimääräinen vesikaista. Ympäristön talot eivät enää ole palatsikokoisia, mutta kaikkien talojen alle60px-ehtoa ei voi vahvistaa.

**Pisin tarkastuksessa tunnistettu yhtenäinen talomainen kuvio: noin74px leveä ×72px korkea**, akselisuuntainen rajaus x802–876,y681–753. Käsin tehty rajausarvio, epävarmuus noin±3px; mukana katon perspektiivisyvyys. Kuvio voi hahmottua yhteen liittyviksi taloiksi, eikä yksittäisten talojen rajoja voi tässä todistaa yksiselitteisiksi. Tämä ei ole rakennuksen karttatason pitkän sivun mitta eikä automaattinen kaikkien talojen segmentointi. **Enintään60px jokaiselle talolle ei ole varmennettu.**
Mittauskuva: /Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-notre-dame-2001-20261104/notre-dame-otto4/qa/largest-house-like-form-measurement.jpg

## Poikkeamat
- Vain kiveä sallivassa kivi-alue.png-maskissa näkyy talojen kattoja, julkisivuja, ikkunoita, puita ja vettä. Virhe näkyy sekä eteläisessä U-kaistassa että pohjoisrannan erillisessä kaistassa.
- Cité-saaren itäkärjen rantaviiva siirtyi sisäänpäin ja pohjoisrannan muodot muuttuivat. Alkuperäisellä maskilla leikattaessa saaren sisälle jää vettä ja rantamuurin jatkuvuus katkeaa.
- Pisin tarkastuksessa tunnistettu yhtenäinen talomainen kuvio on kuvan akseleissa noin74px leveä. Se voi hahmottua vierekkäisiksi taloiksi, mutta yksittäisten talojen rajat eivät ole yksiselitteiset; enintään60px-ehto ei ole varmennettu.

**Kokonais-QA: EI LÄPÄISTY.** Palatsien poistuminen ja pienempi talomittakaava ovat edistystä, mutta kivikaista ja rantaviiva eivät täytä ehtoja. Karttaseppä/KK arvioi tämän yhden sallitun oton. Viidennestä päättää KK; sitä ei tehdä ilman uutta tilausta.

## Tarkistusnäytöt
Alkuperäinen koko saaren maski SHA256 b3820a2feca71308b75cbe5384c14815738a646191c1e0fc28e35e2a05d1ee80, pinta-ala240731px.
Kivi-alueen SHA256 fa1cfd87cc335e5f38d0a8cbc2e2229de4c568b513097395764ba4010f594474, pinta-ala23958px.
Lukittu kirkko muuttumaton, SHA256 3614d0a6d3ebed0109ec98d6097d22149144f9698eea22fd0aa8d596aa1ea488.
Koeyhdistelmä käyttää alkuperäistä pohjaa, natiivia alkuperäisellä saaren maskilla ja muuttumatonta lukittua katedraalia. Se on vain paikallinen QA-kuva, ei toimitus-PNG eikä pelikytkentä.
- Yhdistelmä: /Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-notre-dame-2001-20261104/notre-dame-otto4/qa/masked-context-with-locked-building.jpg
- Vain kivimaskin sisältö: /Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-notre-dame-2001-20261104/notre-dame-otto4/qa/stone-only-inspection.jpg
- Maskin ja kivialueen reunat natiivin päällä: /Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-notre-dame-2001-20261104/notre-dame-otto4/qa/native-with-source-boundaries.jpg
- Kehote: /Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-notre-dame-2001-20261104/notre-dame-otto4/prompt.json

Vastaanottajan/KK:n hyväksyntä, Karttasepän koostaminen, pelikytkentä ja julkaisu ovat erillisiä avoimia tiloja. Ei junaan.
