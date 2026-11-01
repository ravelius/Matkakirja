# Codex → Karttaseppä / PT: Pariisi 1 m/px, erä 3 (20 palaa)

Tilauksen f093175d0 erä 3 on toimitettu arvioitavaksi. Kaikki 20 RGB PNG -kuvaa ovat natiivisti 1536 × 1024, yksi metri pikseliä kohden. Lopputiedostot ovat tavulleen valittuja sisäänrakennetun image_gen-työkalun tuloksia: ei suurennusta, pienennystä, retusointia tai jälkiterävöitystä. Erään käytettiin 51 kokonaista generointia. Kaikki yritykset säilyvät paikallisessa raw-historiassa; promptit ja valintojen provenance on toimitettu.

Kuvat: `proto-3d/_tyo/codex/pariisi-1m/pariisi-1m-rRR-cCC.png`.
QA, manifesti, lähdekoordinaatit, promptit ja SHA256SUMS: `posti/pariisi-1m-era3-20261101/`.

Hyväksytyt q11- ja lohko 1 -tyylimallit ohjasivat kattoja, musteviivoja, julkisivuja ja palettia. Jokaiselle palalle käytettiin sen omaa uutta geometriaohjetta ja vesimaskia. Koristealtaat on kuivattu jäljempänä kuvatuin rajoin; maamerkit ja ulkoreunan paperi seuraavat ohjetta. Ei puita, ihmisiä tai liikennettä. Kuva- ja kattodetaljien tarkistus on tehty, mutta täydellistä pikselintarkkaa maanpintageometriaa ei väitetä sertifioiduksi.

27 erän sisäistä limitystä mitattu; RGB-MAE 4.91–25.02/255. Limitykset eivät ole pikseli-identtisiä. Vastaanottajan pienimmän eron leikkauspolku ja kapea häivytys sekä lähteen valtuuttama veden sävyjen tasaus tehdään vastaanottajan koodissa. Numeraalinen väriero ei yksin ole sauman hyväksyntä.

Havainnot ja rajat:
- Kaikki20 kuvaa ovat natiiveja1536x1024RGB ja tavuiltaan valittujen alkuperäisten PNG:iden kopioita.51kokonaista generointia, ei osaretusointia tai koonmuutosta. V2-maskit käytössä; kuuden vaaditun palan kokonaiset uusinnat tehty.
- r04-c01:12kokonaisen yrityksen jälkeen valittiin11.otto parhaan maanpinnan ja paperihäivytyksen perusteella. Uusi keskioikean kanavahaaran kapea nauha on mukana, mutta oikean reunan vesikaaren sijainti on edelleen osin maskin yläpuolella:4216px bbox1416,277,1536,394; kuivaksi merkityn välin ylittää237px ohut sininen viiva. Pääjoen paperipuoli jää osin maskin sisällä vaaleaksi (10680px ja2008px proxyalueet). Tämä pala toimitetaan nimenomaisesti arvioon, EI virheettömäksi tai runtime-valmiiksi hyväksyttynä.
- r04-c02:9.otto palauttaa vasemman kanavan kärjen kuvan reunaan; keskikohdan kapea2451px rantaviivan sivusiirtymä bbox152,142,342,366 jää arvioitavaksi. Oikean alakulman735px vesiproxyalue jää vaaleaksi. Keski- ja alareunan koristealtaat ovat kuivat.
- r03-c08: lähdeoppaan kanavassa on sinistä427px bbox1059,251,1096,299 ja391px bbox711,782,740,817, vaikka v2-maskissa kyseiset osat ovat mustia. Lähikatselu vahvistaa, että kanavat seuraavat värillistä geometriaohjetta; kuivat sillat ovat mukana. Maskin ja geometriaohjeen ristiriita annetaan vastaanottajan arvioitavaksi, ei automaattista PASSia.
- Reunarakennusten haaleus ja musteen vahvuus vaihtelevat hieman. r03c02:n +90px maskimuutos ei edellyttänyt uuden kuvan valintaa aiemman katselun perusteella. Kuivia saaria ja siltoja ei maalattu vedeksi.
- 27sisälimityksen RGB-MAE4.91–25.03/255 on mittaus, ei sauman lopullinen hyväksyntä. Vastaanottajan pienimmän eron leikkauspolku+kapea häivytys sekä katureunojen mittaus ovat vielä erilliset.

Vesimaskien lähdekorjaus afd3613cc on huomioitu: source-v2-maskit ja niiden SHA256 on kirjattu kuvan QA-tietoihin. Alkuperäiset maskit ja yritykset säilyvät historiassa. Alkuperäisen maskiversion limityspoikkeamaraportti on historiatieto; nykytilan arvio tehdään uusilla maskeilla.

Aiemmin PT:n hyväksymät lohkon 1 yhdeksän kuvaa säilyvät ennallaan. Vain `claude/postilaatikko`-haaraan; tämän erän vastaanotto, PT-hyväksyntä, runtime-integraatio ja pelijulkaisu vaativat erillisen näytön.

Karttatiedot © OpenStreetMap contributors — https://www.openstreetmap.org/copyright.

SHA256:
- `pariisi-1m-r03-c02.png` — `3dff577e50e0c6c68f94ae8348c44791514e1b74d3131d2778aaa94ac831fcef`
- `pariisi-1m-r03-c03.png` — `8bc82df848773d57aff6aa62c18bef5b8b32c6605693543fb80d48b47ee2c6b3`
- `pariisi-1m-r03-c04.png` — `f4bd541b9d09d89807039608c056799d58b4d3e337d7d49b48147bdd46e6da16`
- `pariisi-1m-r03-c05.png` — `0aa424bdfc9f4e825efc1a868660ba6d5d0ccf367ea8ac5c1401059c1dee97b1`
- `pariisi-1m-r03-c06.png` — `2a749bf31a5ac94d97691bebd7e26ce4c720b244e57d5b78cd6927c357cd1b41`
- `pariisi-1m-r03-c07.png` — `52c7f449b99ada76432b6faf908b9e9b72e58cf77c47a3006e2edc32beb2898d`
- `pariisi-1m-r03-c08.png` — `0408c08e9dfeba53cc83feb37ae5bddb8c8fb943ae8bb8ff9d465ddc2645339e`
- `pariisi-1m-r03-c09.png` — `bbab8e2b055553bdd0a2db7aef45aa96d298dc54cd158beffae52cc6a4b7f77b`
- `pariisi-1m-r03-c10.png` — `96b3d39d1069ca7c7cc8ce08238f228b979727aa1d47797c9cbee4ae367def18`
- `pariisi-1m-r04-c01.png` — `40fc6f3757d57933bc69d339050ab15183cd03e490b01550da57a001224acbe1`
- `pariisi-1m-r04-c02.png` — `123d87b47e0843f756ea1140c2997d1aab771b60d80aec80e7f7ebd9831cd829`
- `pariisi-1m-r04-c03.png` — `4b8cfc52584260ada1e9e5de268943f29d74430b125cebcd2a9209083c075e78`
- `pariisi-1m-r04-c04.png` — `ad9f42b311741e7be0f99e5fda1fa678f050973d0c49383308261c526febaeed`
- `pariisi-1m-r04-c05.png` — `37885e1287658176c0bacd1f4e7f8067f1399ab45ca7c10aad4a302e398b22c6`
- `pariisi-1m-r04-c06.png` — `34de843e11dda919eb5a243f8ae8790db2ead5412915a8997d3dd4bd71222272`
- `pariisi-1m-r04-c07.png` — `e0fdeffc85183cddcc6382dc81480b72a5d3c4f36bf175688b65041dc4c3f6ee`
- `pariisi-1m-r04-c08.png` — `e1177e621a6ec33963b89760fa1c7dc5a8d5614a87f5789d5bbc449354ea4866`
- `pariisi-1m-r04-c09.png` — `686461b48799efdb514d0fa6826512d56130722b09de9dd2c80f386f48e1ffb7`
- `pariisi-1m-r04-c10.png` — `e773ad05d555856e927187402380bc9a44db3b72a1918f83dc9d232816be5381`
- `pariisi-1m-r04-c11.png` — `3c6783103688897ef4f9874b2ef0dc1657b5f6620a636c24baf4067a9c34edd8`

Paikalliset [kuvat](</Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-1m-loput88-20261101/era3/final>), [promptit](</Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-1m-loput88-20261101/era3/prompts>) ja [erän esikatselu](</Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-1m-loput88-20261101/era3/qa/contact-sheet.png>).
