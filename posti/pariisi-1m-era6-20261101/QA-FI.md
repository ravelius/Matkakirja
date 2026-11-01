# Codex → Karttaseppä / PT: Pariisi 1 m/px, erä 6 (17 palaa)

Tilauksen f093175d0 erä 6 on toimitettu arvioitavaksi. Kaikki 17 RGB PNG -kuvaa ovat natiivisti 1536 × 1024, yksi metri pikseliä kohden. Lopputiedostot ovat tavulleen valittuja sisäänrakennetun image_gen-työkalun tuloksia: ei suurennusta, pienennystä, retusointia tai jälkiterävöitystä. Erään käytettiin 23 kokonaista generointia. Kaikki yritykset säilyvät paikallisessa raw-historiassa; promptit ja valintojen provenance on toimitettu.

Kuvat: `proto-3d/_tyo/codex/pariisi-1m/pariisi-1m-rRR-cCC.png`.
QA, manifesti, lähdekoordinaatit, promptit ja SHA256SUMS: `posti/pariisi-1m-era6-20261101/`.

Hyväksytyt q11- ja lohko 1 -tyylimallit ohjasivat kattoja, musteviivoja, julkisivuja ja palettia. Jokaiselle palalle käytettiin sen omaa uutta geometriaohjetta ja vesimaskia. Koristealtaat on kuivattu jäljempänä kuvatuin rajoin; maamerkit ja ulkoreunan paperi seuraavat ohjetta. Ei puita, ihmisiä tai liikennettä. Kuva- ja kattodetaljien tarkistus on tehty, mutta täydellistä pikselintarkkaa maanpintageometriaa ei väitetä sertifioiduksi.

20 erän sisäistä limitystä mitattu; RGB-MAE 1.80–20.04/255. Limitykset eivät ole pikseli-identtisiä. Vastaanottajan pienimmän eron leikkauspolku ja kapea häivytys sekä lähteen valtuuttama veden sävyjen tasaus tehdään vastaanottajan koodissa. Numeraalinen väriero ei yksin ole sauman hyväksyntä.

Havainnot ja rajat:
- Erä6:17natiivia kuvaa,23kokonaista kutsua. Reunapalojen suuret paperialat ovat tarkoituksellisia ja seuraavat ohjetta; r10-c11 on lähes kokonaan paperia, oikean yläkulman hyvin haalea fragmentti säilyy.
- r09-c09:n neljäs kokonainen otto korjasi kolmannen jokijakson aiemman pitkän ylityksen. Valkoisen maskin sisällä338px ei-sininen alue bbox1039,287,1105,323 on viimeisen vesijakson lyhyen päätyrajan ja talojen reunalla. Ei väitettä pikseli-identtisestä geometriasta.
- r09-c12:n pienet keskialtaat korjattu kolmannella otolla; oikean reunan kanavassa67px sininen jäämä bbox1415,851,1424,866 jää vastaanottajan arvioon. r09-c07:77px pieni rajapoikkeama bbox139,541,164,560. Muut siniproxyn pienet havainnot ovat pääosin kattosävyjä.
- Reunojen haaleiden talojen mustevoimakkuus vaihtelee hieman lähteeseen nähden. r09-c09 muutama lähes näkymätön haamujalanjälki häviää aiemmin; r09-c10,r10-c06/r10-c13 osa viivoista hieman tummempia. r10-c12:n etelärivi korjattu erillisellä uudella otolla alkuperäisen haaleaksi.
- 20sisälimityksen RGB-MAE 1.80–20.04/255; vastaanottajan leikkauspolku/kapea häivytys ja veden sävyjen tasaus erillinen. Ei runtime-/julkaisunäyttöä.

Vesimaskien lähdekorjaus afd3613cc on huomioitu: source-v2-maskit ja niiden SHA256 on kirjattu kuvan QA-tietoihin. Alkuperäiset maskit ja yritykset säilyvät historiassa. Alkuperäisen maskiversion limityspoikkeamaraportti on historiatieto; nykytilan arvio tehdään uusilla maskeilla.

Aiemmin PT:n hyväksymät lohkon 1 yhdeksän kuvaa säilyvät ennallaan. Vain `claude/postilaatikko`-haaraan; tämän erän vastaanotto, PT-hyväksyntä, runtime-integraatio ja pelijulkaisu vaativat erillisen näytön.

Karttatiedot © OpenStreetMap contributors — https://www.openstreetmap.org/copyright.

SHA256:
- `pariisi-1m-r09-c03.png` — `981cb785c80967b42e7b364ce29afa5669bb0a8c3e250e96c2fa8aad8c227141`
- `pariisi-1m-r09-c04.png` — `54a7b0c802ee89e2f1aba4b69c2eafc365b61a7a73cb4d59a35bc1772ee24d32`
- `pariisi-1m-r09-c05.png` — `a96d39ffa6bbfdb9682b2a4c83caacc06fd0277d776e9158a5c19118407898af`
- `pariisi-1m-r09-c06.png` — `e0a0bf2d26604662796d86328bd64f22f405bac980e08bb62744c8d5c7913240`
- `pariisi-1m-r09-c07.png` — `6e92298292a55ea6b42475e71e610d990f468a94e9fa3d5c73ec11551786d23e`
- `pariisi-1m-r09-c08.png` — `3f2b7e1098f04e6363f366d2cc0bc90d970acf0959c6d22ca32b4e13d7664c5a`
- `pariisi-1m-r09-c09.png` — `1ad648ecaed6c3cc96a87bdc2205bb99573fc1825c2ff28bc2e8061f67db0b8a`
- `pariisi-1m-r09-c10.png` — `ffd990f8d932bde2b1cb9f3092bb22531c61d3cef736fcb14844caf982c72dbd`
- `pariisi-1m-r09-c11.png` — `ed5b55742fe26a293fd4b73b43aba108d85f717716ba2ad3810381d66b68f5f5`
- `pariisi-1m-r09-c12.png` — `39aad61bc086a4f0ae92fc577798496fe78a6ca9be800c615697c875b9bc5a26`
- `pariisi-1m-r09-c13.png` — `fb6b33c405e1dc5d86b4b65f6f4d7b9b530c38aa5c8159c255453f3826b3d939`
- `pariisi-1m-r10-c06.png` — `b6ef1750f1ceb7dab0b884bbaa7e9cdf43f92160fac131827c69a3d64b8473f4`
- `pariisi-1m-r10-c07.png` — `a7f115857a5ee30ea373143951e806adc716f6105a87d96dc0e787757c250309`
- `pariisi-1m-r10-c08.png` — `1cd7677c217ec4ac4a1296dbefe9ec05dc81f631e8347a26abc6f04c3d6b412b`
- `pariisi-1m-r10-c11.png` — `30988e1cd2552a3769ca6f3e29a1e2f22b94a9b52df56e07d528d05e6218dce4`
- `pariisi-1m-r10-c12.png` — `a701dc733b7f12a2b37f1c9c347b8291c475e88e0c6966bdb4c16708ae9c1cae`
- `pariisi-1m-r10-c13.png` — `94a66d033d9f6f8d854a9ef586e4f30a8c2d21e78743703512478bb1e7359049`

Paikalliset [kuvat](</Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-1m-loput88-20261101/era6/final>), [promptit](</Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-1m-loput88-20261101/era6/prompts>) ja [erän esikatselu](</Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-1m-loput88-20261101/era6/qa/contact-sheet.png>).
