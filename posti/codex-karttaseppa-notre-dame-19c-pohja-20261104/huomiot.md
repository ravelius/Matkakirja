# Notre-Dame /19c — yhden oton arviointitoimitus

**Oma kokonais-QA: EI LÄPÄISSYT. Ei käyttövalmis.** Karttaseppä tarkistaa ja vie KK:lle; mahdollisesta seuraavasta otosta päättää KK tilauksen mukaisesti.

Lähteet: #2007 /19c, commit b8bf2207f1f595b764fe208bd9581a7deadf8223, blob c7fe9a32a41c983efebca60c8debbb9ea7d2d96a. Lisäys #2008, commit e2ead094a0128b566fb57559b1f89fa1833e6694, blob 01c885dd5fb8b55156ff4facdf9d655565e66d1b. Molemmat luettu kokonaan ja kuuden paikallisen lähdetiedoston SHA256 tarkistettu ennen tuotantoa.

Yksi sisäänrakennetun ImageGenin kutsu / yksi uusi kuva. PNG on täsmälleen 1536 × 1024 RGB. Alkuperäiset generoidut tavut on säilytetty: ei rajausta, skaalausta, retusointia eikä maskin ulkopuolen takaisinliimausta.
SHA256: b2450aa6e5ff29226b8f9f63720713a8e5b8a64c52e8914d704d828ddc794acc

## Kirkon paikka
Keskiosa on tyhjää tasaista kiveystä, mutta koko 240 × 330 m jalanjälki ei täytä ehtoa:
- oikean reunan sisälle jää rakennuspohjia, esimerkiksi (960,750);
- koilliskulma (1028,634) on yhä vedessä;
- kaakkoiskulma (940,856) on puistoa.

Koordinaatit ovat alkuperäisen 1536 × 1024 ruudukon pikseleitä vasemmasta yläkulmasta. Jalanjälkimaskissa on 79 620 pikseliä; suuntaa-antava RGB-luokitus löytää 75 325 vaaleaa kiveyspikseliä (94,6 %), 2 342 rakennusväristä, 139 veden kaltaista ja 1 814 muuta. Tämä ei ole tarkka semanttinen mittaus. Poikkeamat varmistettiin myös jalanjäljen diagnostisella ääriviivalla.

## Joki, reunat ja lisäys
Seine kiertää saarta silmämääräisesti ehjänä ja Saint-Louis pysyy yleisellä paikallaan. Kirkkoa, perspektiiviseiniä, pystyssä olevia puita, veneitä, tekstejä tai muita liikkuvia osia ei ole piirretty.

Maskin ulkopuoli ei säilynyt pikselilleen: 864 839 / 867 171 pikseliä eroaa pohjasta, RGB-kanavien keskimääräinen absoluuttinen ero noin 6 / 255. Eroluku sisältää sävy- ja piirtojälkierot eikä ole geometriavirheen pinta-ala. Reunojen tarkkaa saumattomuutta ja kaikkien katu-/jokiliitosten geometriaa ei ole hyväksytty.

Lisäyksen #2008 vaatimus on mukana kehotteessa. Maskin sisällä ei näy korostettuja punertavia datakaistoja; Square Jean-XXIII on muiden puistoalueiden vaimea sävy. Puiston ulottuminen jalanjälkeen on silti yllä mainittu virhe. Maskin ulkopuolisia alkuperäisiä datamerkintöjä ei tarkoituksella poistettu.

## Tallenteet ja rajaus
Kuva: /Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/notre-dame-pohja-19c-2007-20261104/delivery/alue-notre-dame.png
Täysi kehote: /Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/notre-dame-pohja-19c-2007-20261104/prompts/otto1.txt
QA ja diagnostinen ääriviiva: /Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/notre-dame-pohja-19c-2007-20261104/qa/
Tila: /Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/notre-dame-pohja-19c-2007-20261104/state.json

Toimitus vain claude/postilaatikko-haaraan ja sovittuun Shared-arviointikansioon. Vastaanottajan hyväksyntä, KK:n käyttöpäätös, 3D-kytkentä, runtime ja julkaisu eivät ole valmiita. Aiemmat /19a-kirkon pohjakuvat säilyvät erillisenä toimituksena. Ei junaan.
