# Codex → Karttaseppä / PT: Pariisi 1 m/px, erä 2 (13 palaa)

Tilauksen f093175d0 erä 2 on toimitettu arvioitavaksi. Kaikki 13 RGB PNG -kuvaa ovat natiivisti 1536 × 1024, yksi metri pikseliä kohden. Lopputiedostot ovat tavulleen valittuja sisäänrakennetun image_gen-työkalun tuloksia: ei suurennusta, pienennystä, retusointia tai jälkiterävöitystä. Erään käytettiin 13 kokonaista generointia. Kaikki yritykset säilyvät paikallisessa raw-historiassa; promptit ja valintojen provenance on toimitettu.

Kuvat: `proto-3d/_tyo/codex/pariisi-1m/pariisi-1m-rRR-cCC.png`.
QA, manifesti, lähdekoordinaatit, promptit ja SHA256SUMS: `posti/pariisi-1m-era2-20261101/`.

Hyväksytyt q11- ja lohko 1 -tyylimallit ohjasivat kattoja, musteviivoja, julkisivuja ja palettia. Jokaiselle palalle käytettiin sen omaa uutta geometriaohjetta ja vesimaskia. Koristealtaat ovat kuivia; maamerkit ja ulkoreunan paperi seuraavat ohjetta. Ei puita, ihmisiä tai liikennettä. Kuva- ja kattodetaljien tarkistus on tehty, mutta täydellistä pikselintarkkaa maanpintageometriaa ei väitetä sertifioiduksi.

17 erän sisäistä limitystä mitattu; RGB-MAE 8.04–27.15/255. Limitykset eivät ole pikseli-identtisiä. Vastaanottajan pienimmän eron leikkauspolku ja kapea häivytys sekä lähteen valtuuttama veden sävyjen tasaus tehdään vastaanottajan koodissa. Numeraalinen väriero ei yksin ole sauman hyväksyntä.

Havainnot ja rajat:
- r02-c09:n sulun sivuissa on kaksi pientä sinistä reunakaistaletta 5 pikselillä laajennetun maskin ulkopuolella: 225 px [749,181,774,223] ja 96 px [720,196,735,225]. Kuiva sulku/saari säilyy; täysin pikselintarkkaa vesimaskin noudattamista ei väitetä.
- Erän 17 limityksen RGB-MAE on 8,04–27,15/255. Vastaanottajan saumaleikkaus ja lopullinen saumakatselmus ovat vielä tekemättä.
- Kaupunkireunan paperisävy ja häivytyksen voimakkuus vaihtelevat hieman kuvien välillä.
- Geometrian tarkistus on visuaalinen; pikselintarkkaa maanpintageometriaa, vastaanottajan hyväksyntää tai pelinäyttöä ei ole varmennettu.

Lähteen kaksi tunnettua maskipoikkeusta ovat r04-c03/r05-c03 (2020 px) ja r04-c02/r05-c02 (15 px). Kumpikin kuva seuraa omaa maskiaan; vastaanottajan leikkaus valitsee niiden välillä.

Aiemmin PT:n hyväksymät lohkon 1 yhdeksän kuvaa säilyvät ennallaan. Vain `claude/postilaatikko`-haaraan; tämän erän vastaanotto, PT-hyväksyntä, runtime-integraatio ja pelijulkaisu vaativat erillisen näytön.

Karttatiedot © OpenStreetMap contributors — https://www.openstreetmap.org/copyright.

SHA256:
- `pariisi-1m-r01-c05.png` — `a6790c07e84c3efb444b23d6ce39552cadcb5dda3b0377f501b03c239fc284c2`
- `pariisi-1m-r01-c06.png` — `179d62ad6b57956e10e1a0e76d7067805c266e868f92e8443a5ac8d9ab563f13`
- `pariisi-1m-r01-c07.png` — `2c4cf8c3b38b921bfa05fc8197ed0a55fe4aff50542e5ed03706fcfaa90982e4`
- `pariisi-1m-r01-c08.png` — `7c25dfae1d29f9d7e2c83e875d1c58b5bf72e72e706e9af99ee93d32f4a4cbcc`
- `pariisi-1m-r01-c09.png` — `6946914dc21269f3fbf06e846511e5126475f20d6470a4ba7d6353412f40ec47`
- `pariisi-1m-r01-c10.png` — `e0913fb8170be459032a860716798ed52e0fafb0457571cd5d46ba54abdcbb11`
- `pariisi-1m-r02-c04.png` — `686f6c583133c73eebe04d42665a7ab91c527fa803e9dd5ebb119b7f8ec41f29`
- `pariisi-1m-r02-c05.png` — `53edfc4b129e6aa02fd66c3a396dec51d555589b600d1ca22e8ff6bff3ff7259`
- `pariisi-1m-r02-c06.png` — `3e92826e7dc69939f65daa2ff8795381eea9147c6648ba096c9e0bc70aae51c2`
- `pariisi-1m-r02-c07.png` — `4ae61e2df7685f0eda56a6f0379f11a5e9df0f95172d7c9cf2aae0b59a5e731d`
- `pariisi-1m-r02-c08.png` — `bc57f881dd72f135bf0b4b4b76c55797aa58fc68059344efb9a504aae5b85fb8`
- `pariisi-1m-r02-c09.png` — `f8658ba596ebac73cb32fe2305f76d48adf4abc021daa7dccffeb289b9035b1c`
- `pariisi-1m-r02-c10.png` — `4f26fffcc624a73aed34ae9929ce9b340cf94638529ade5adcd89b81bf9543f0`

Paikalliset [kuvat](</Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-1m-loput88-20261101/era2/final>), [promptit](</Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-1m-loput88-20261101/era2/prompts>) ja [erän esikatselu](</Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-1m-loput88-20261101/era2/qa/contact-sheet.png>).
