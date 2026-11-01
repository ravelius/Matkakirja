# Codex → Karttaseppä / PT: Pariisi 1 m/px, erä 4 (16 palaa)

Tilauksen f093175d0 erä 4 on toimitettu arvioitavaksi. Kaikki 16 RGB PNG -kuvaa ovat natiivisti 1536 × 1024, yksi metri pikseliä kohden. Lopputiedostot ovat tavulleen valittuja sisäänrakennetun image_gen-työkalun tuloksia: ei suurennusta, pienennystä, retusointia tai jälkiterävöitystä. Erään käytettiin 31 kokonaista generointia. Kaikki yritykset säilyvät paikallisessa raw-historiassa; promptit ja valintojen provenance on toimitettu.

Kuvat: `proto-3d/_tyo/codex/pariisi-1m/pariisi-1m-rRR-cCC.png`.
QA, manifesti, lähdekoordinaatit, promptit ja SHA256SUMS: `posti/pariisi-1m-era4-20261101/`.

Hyväksytyt q11- ja lohko 1 -tyylimallit ohjasivat kattoja, musteviivoja, julkisivuja ja palettia. Jokaiselle palalle käytettiin sen omaa uutta geometriaohjetta ja vesimaskia. Koristealtaat on kuivattu jäljempänä kuvatuin rajoin; maamerkit ja ulkoreunan paperi seuraavat ohjetta. Ei puita, ihmisiä tai liikennettä. Kuva- ja kattodetaljien tarkistus on tehty, mutta täydellistä pikselintarkkaa maanpintageometriaa ei väitetä sertifioiduksi.

20 erän sisäistä limitystä mitattu; RGB-MAE 3.51–28.94/255. Limitykset eivät ole pikseli-identtisiä. Vastaanottajan pienimmän eron leikkauspolku ja kapea häivytys sekä lähteen valtuuttama veden sävyjen tasaus tehdään vastaanottajan koodissa. Numeraalinen väriero ei yksin ole sauman hyväksyntä.

Havainnot ja rajat:
- V2-lähteen kokonaiset uusinnat: r05-c01,c02,c04; lisäksi r06-c01:n laaja jokirajavirhe korjattu uudella kokonaisella otolla. V1-yritykset säilyvät historiassa.
- Pieniä jäljelle jääviä vesiväripoikkeamia annetaan vastaanottajan arvioon: r05-c01 355px pitkä reunajäämä bbox608,915,619,1024 ja163px bbox568,555,593,609; r05-c02 pieni202px sininen tasku bbox785,98,805,114 sekä24px kanavanpätkä bbox548,224,557,229.
- r06-c01: sallitun lammen yläpuolisessa kapeassa kanavassa on429px sininen jäämä bbox606,13,628,169 sekä68px jatke. Pääjoen aiempi25pxalapään ylitys ja laaja sivusiirtymä poistettu. Ei väitettä täysin pikselintarkasta vesimaskin toteutumisesta.
- r05-c02/c03:n suuret puuttuvan vesivärin mittaushavainnot ovat ohjeessa olevia kuivia nurmisaari- ja niemimuotoja; niitä ei täytetty vedellä. r05-c01/r06-c01:n puuttuvan vesivärin reunahavainnot sisältävät vaalean rantaviivan ja paperihäivytyksen.
- Ulkoreunojen rakennusmusteen voimakkuus vaihtelee hieman; erityisesti r05-c11 on lähteen hyvin haaleaa reunaa tummempi. Maanpinnan kadut ja tyhjät paperialueet säilyvät.
- 20sisälimityksen RGB-MAE 3.51–28.94/255 ei ole vastaanottajan saumahyväksyntä; tarvitaan lähteen pienimmän eron leikkauspolku ja kapea häivytys.

Vesimaskien lähdekorjaus afd3613cc on huomioitu: source-v2-maskit ja niiden SHA256 on kirjattu kuvan QA-tietoihin. Alkuperäiset maskit ja yritykset säilyvät historiassa. Alkuperäisen maskiversion limityspoikkeamaraportti on historiatieto; nykytilan arvio tehdään uusilla maskeilla.

Aiemmin PT:n hyväksymät lohkon 1 yhdeksän kuvaa säilyvät ennallaan. Vain `claude/postilaatikko`-haaraan; tämän erän vastaanotto, PT-hyväksyntä, runtime-integraatio ja pelijulkaisu vaativat erillisen näytön.

Karttatiedot © OpenStreetMap contributors — https://www.openstreetmap.org/copyright.

SHA256:
- `pariisi-1m-r05-c01.png` — `63ee160ae9b920aeb98d28ab7787221a21d83dd6df6cb88b844f50b9d68822ff`
- `pariisi-1m-r05-c02.png` — `d013248a8fc679eaae4d3eac35be1a8b207603c01d9ef52d3b4f85c1f0f1cb56`
- `pariisi-1m-r05-c03.png` — `561b894e69e93095598cb270268b0620af9f3c22d3cc45da2d3e3be560aad141`
- `pariisi-1m-r05-c04.png` — `342ea0ecb32c224070fadd7aea7c1c2cdba8c4e3308efa5a6c61609056b015d1`
- `pariisi-1m-r05-c05.png` — `e6a5b5f0ca44dc17a418d76f4785e42431c9034aeb0f861fc24149ff4853f4b5`
- `pariisi-1m-r05-c09.png` — `5848b53d82c97139d96bfeb69bc3f6075891601f3f78b2773e5e4b5ac110022e`
- `pariisi-1m-r05-c10.png` — `7cd967c41f99b64ab3eddea39b39005cae8b35aae9acb77a7a654470e41eee12`
- `pariisi-1m-r05-c11.png` — `4ec2ae0acdf31edefd1198d7badb2168280c08d3de655be6303190f58c463a16`
- `pariisi-1m-r06-c01.png` — `aa8c057e50941856091df48733f2edb201c67cbcb13de974ce826b3bdfe300f0`
- `pariisi-1m-r06-c02.png` — `2293085081674b31fdbf4d84a8318ee432377d6bef67c63cd31913e73218eada`
- `pariisi-1m-r06-c03.png` — `0d5c4f4a58ced01e569c6b2cf3728ed1e3322f9e76cf5411f3d94d9bcbb1d58f`
- `pariisi-1m-r06-c04.png` — `25842fa1eea7190acd42f5a2f3786865d40ff435cbca13684d797b9c356d6463`
- `pariisi-1m-r06-c05.png` — `656e04837e8bd9fbc50246c28733c2196d36e1e539742df9fe3f4964b74ac323`
- `pariisi-1m-r06-c09.png` — `220b72b98ef4a15ebe6e0baf90cceeadb40b0f37b1ef574e01cc5f2f2c5346be`
- `pariisi-1m-r06-c10.png` — `8d8db8d995ad94c6a47d78364b50f5cbfd93801caa6829230f12a268d25d0680`
- `pariisi-1m-r06-c11.png` — `d9ffabfd9fd4bc3838cfbc0784834bb815767945be8ef46157402100dd90822b`

Paikalliset [kuvat](</Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-1m-loput88-20261101/era4/final>), [promptit](</Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-1m-loput88-20261101/era4/prompts>) ja [erän esikatselu](</Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-1m-loput88-20261101/era4/qa/contact-sheet.png>).
