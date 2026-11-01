# Codex → Karttaseppä / PT: Pariisi 1 m/px, erä 5 (22 palaa)

Tilauksen f093175d0 erä 5 on toimitettu arvioitavaksi. Kaikki 22 RGB PNG -kuvaa ovat natiivisti 1536 × 1024, yksi metri pikseliä kohden. Lopputiedostot ovat tavulleen valittuja sisäänrakennetun image_gen-työkalun tuloksia: ei suurennusta, pienennystä, retusointia tai jälkiterävöitystä. Erään käytettiin 30 kokonaista generointia. Kaikki yritykset säilyvät paikallisessa raw-historiassa; promptit ja valintojen provenance on toimitettu.

Kuvat: `proto-3d/_tyo/codex/pariisi-1m/pariisi-1m-rRR-cCC.png`.
QA, manifesti, lähdekoordinaatit, promptit ja SHA256SUMS: `posti/pariisi-1m-era5-20261101/`.

Hyväksytyt q11- ja lohko 1 -tyylimallit ohjasivat kattoja, musteviivoja, julkisivuja ja palettia. Jokaiselle palalle käytettiin sen omaa uutta geometriaohjetta ja vesimaskia. Koristealtaat on kuivattu jäljempänä kuvatuin rajoin; maamerkit ja ulkoreunan paperi seuraavat ohjetta. Ei puita, ihmisiä tai liikennettä. Kuva- ja kattodetaljien tarkistus on tehty, mutta täydellistä pikselintarkkaa maanpintageometriaa ei väitetä sertifioiduksi.

28 erän sisäistä limitystä mitattu; RGB-MAE 4.23–27.63/255. Limitykset eivät ole pikseli-identtisiä. Vastaanottajan pienimmän eron leikkauspolku ja kapea häivytys sekä lähteen valtuuttama veden sävyjen tasaus tehdään vastaanottajan koodissa. Numeraalinen väriero ei yksin ole sauman hyväksyntä.

Havainnot ja rajat:
- r08-c02: oikean reunan paperihäivytyksessä on vaalea sinivihreä vesikiila noin bbox[1500,440,1536,510] kokonaan mustan vesimaskin alueella. Sama aihe esiintyy geometriaohjeessa; finaali säilyttää sen. Tämä on todellinen pieni maskipoikkeama, ei kattoväri. Täysin vedenpitävää maski-PASSia ei anneta.
- r08-c03: joen paperihäivytyksen sininen osa ylittää maskin+5px kolmessa vierekkäisessä komponentissa:755px bbox[256,410,337,429],160px bbox[163,420,206,438] ja119px bbox[207,422,256,428]. Kyse on yhden olemassa olevan joen reunahäivytyksestä, ei kolmesta uudesta vesialueesta.
- r08-c03: pieni koristeallas lähellä683,935 ei kuivunut kokonaan. Sen kärjessä on35px vaaleansininen vesiaihe bbox[679,935,688,944]; tiukalla sinikynnyksellä11px bbox[682,936,687,941]. Riippumaton semanttinen tarkistus täsmentää aiempaa tuotantoraportin harmaanvihreä-vivahdekuvausta: tämä on todellinen jäljelle jäänyt koristevesi, ei vain varjo. Se annetaan vastaanottajan arvioitavaksi eikä sitä retusoitu.
- r07-c11/r07-c13/r08-c13: geometriaohjeiden kuivat saaret säilytettiin vaikka valkoisista maskeista puuttuu saaren reikä. Mittauksen puuttuvan sinisen suurkomponentit7995px bbox[507,569,683,628],2757px bbox[385,990,504,1024] ja23519px bbox[371,96,518,302] vastaavat näitä kuivia saaria. Lähteen tarkennetun tulkinnan mukaan saaria ja rakennuksia ei hukuteta.
- Katot, tavallisten talojen geometria ja paletti vastaavat q11-tyyliä. Reunan rakennusten musteen voimakkuus vaihtelee lähteeseen nähden; tyhjät paperialueet ja kaupunkirajojen paikat säilyvät. Kaikkien maapikselien täydellistä yhtäläisyyttä ei sertifioida.
- 28 erän sisäisen128px-limityksen RGB-MAE4.23–27.63/255 on diagnostiikkaa, ei vastaanottajan saumahyväksyntä. Vastaanottaja tekee lähteen määräämän pienimmän eron leikkauspolun, kapean häivytyksen sekä valtuutetun veden sävyntasauksen.
- Kolme todellista vesimaskipoikkeamaa ovat paikallisia ja pieniä koko kuvan mittakaavassa. Niiden hyväksyntä jää vastaanottajalle/PT:lle; nollapoikkeamatason vaatimus edellyttäisi uutta kokonaista generointia. Tässä valmistelussa ei generoitu eikä muutettu kuvia.

Vesimaskien lähdekorjaus afd3613cc on huomioitu: source-v2-maskit ja niiden SHA256 on kirjattu kuvan QA-tietoihin. Alkuperäiset maskit ja yritykset säilyvät historiassa. Alkuperäisen maskiversion limityspoikkeamaraportti on historiatieto; nykytilan arvio tehdään uusilla maskeilla.

Aiemmin PT:n hyväksymät lohkon 1 yhdeksän kuvaa säilyvät ennallaan. Vain `claude/postilaatikko`-haaraan; tämän erän vastaanotto, PT-hyväksyntä, runtime-integraatio ja pelijulkaisu vaativat erillisen näytön.

Karttatiedot © OpenStreetMap contributors — https://www.openstreetmap.org/copyright.

SHA256:
- `pariisi-1m-r07-c01.png` — `98ba04a9fea6229723e8e2324a57a0f22d33aed5f2d3d5cebf07f60cab4f39f3`
- `pariisi-1m-r07-c02.png` — `10964c5f28c8228679614294e9b335327a09536ffe1cf8c6ddcd2981bd25319f`
- `pariisi-1m-r07-c03.png` — `e898c70ec1fd9ea6dd3f7cabb5701d1c3ea5bd9ea5d5002a52a952659bd60920`
- `pariisi-1m-r07-c04.png` — `5793343e0b68d2e2a9caf94218ae1825cc5bac36920808ac4a5779568dfe5d50`
- `pariisi-1m-r07-c05.png` — `6038b2f33c872c677537e6ec90e2955c0f3c1d0e02191c22f54f957b0249558a`
- `pariisi-1m-r07-c09.png` — `d7a82a5a9b010c7d0c6995252ddb11dded69bc4752a7e825634f2f50c29c7cb2`
- `pariisi-1m-r07-c10.png` — `0a4d7b090a99b5e2662aacd490c7d52cd845000b383b053dcf6c93e3c968a8e9`
- `pariisi-1m-r07-c11.png` — `952a6e6191d6bf45a2aa873120d71c601bd5bd411c60e1bfce90146dc7c14034`
- `pariisi-1m-r07-c12.png` — `9621f798f394d3fe8adef476475c12fac51b0f2128988f76f5debd3c6e56ccae`
- `pariisi-1m-r07-c13.png` — `21b911a715a94b3f39022a8209bc7072b4ce3f53758f1858798c0fd570388b5a`
- `pariisi-1m-r08-c02.png` — `f5d4aa2cdd329afc9cd76350bd97412c44e79cf87752d083386875052c880c58`
- `pariisi-1m-r08-c03.png` — `2dea4409966d9d051120c8adf974be813750bd48d99d9e811f215860c57a3fad`
- `pariisi-1m-r08-c04.png` — `0f3c9d3115331b1c08c7f1593c77f519e2f46527e6243932d253dcf9cdc7e8fd`
- `pariisi-1m-r08-c05.png` — `9cb9fcfc7986024da3dd4b1f6e839b97fa60886a461f6fb5a28c2ecce49f9dbf`
- `pariisi-1m-r08-c06.png` — `5cef005afb5cc9a572f87719d8ccd14ad76e4548bb11ac4fbf4324ab5107681a`
- `pariisi-1m-r08-c07.png` — `0502e0812fc70e221871d20263d16439c577d3ef830041fb284c25348935fd74`
- `pariisi-1m-r08-c08.png` — `c48a7cb023096a28ed38dc33b56041a4211394370fed253b5befc08acd53eaa1`
- `pariisi-1m-r08-c09.png` — `3db435cefdd4c9d5c0cd71f6b3736b0ba10e86b1d666d457b822af3ec8047cfc`
- `pariisi-1m-r08-c10.png` — `11a8f9825d1aeffe37dc5a6fd4341a5635b99934cc489f2d22195b9fdcfd8fc2`
- `pariisi-1m-r08-c11.png` — `4a354bad932c81ef4996aeaf65bb7a4e352fb035486850f91f197e2c487f8558`
- `pariisi-1m-r08-c12.png` — `2a27c90032bb22f8521aee5149d785cdad7f9f4d47b3f49b0fe2a0aef6684967`
- `pariisi-1m-r08-c13.png` — `f48b415f177488848adc1ec3090bce9adb68a6b99981c5ff61873c6764983527`

Paikalliset [kuvat](</Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-1m-loput88-20261101/era5/final>), [promptit](</Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-1m-loput88-20261101/era5/prompts>) ja [erän esikatselu](</Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-1m-loput88-20261101/era5/qa/contact-sheet.png>).
