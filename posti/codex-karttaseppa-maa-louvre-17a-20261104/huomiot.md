# louvre — tilaus #1996, yksi otto

Lähde posti/karttaseppa-codex-nahtavyysalueet-20261104.md, commit 26a112454a821448d927573c70a1e87077de1d7a, blob fa871b192993a91701b621d422d5c94981054dac. Koko posti, molemmat työohjeet ja tämän kohteen kaikki 11 manifestitiedostoa luettu ja SHA256-varmennettu. Ei junaan.

Yksi kokonaan uusi generointi, yksi sisäänrakennetun image_gen-työkalun kutsu. 1536 × 1024 RGBA, natiivit PNG-tavut säilytetty. Ei maskikorjausta, rajausta, värikorjausta, osittaista editointia tai lisäottoa.
SHA256: de3a1dc5185ec9aa0c54da213305079d09170ceb5a965000ba23a1549f0de8d9

## Alfan vastaavuus

Maski SHA256 a9e3ea9c5fd91de96a3f64dccbb72ff583e2836c33915e0c9318240df3a1955b, maskin pinta-ala 729516 px.
alpha>=128 XOR **425409 px** = ulkopuolella 416047 + sisältä puuttuu 9362. IoU 0.628646.
Täsmällinen alfaero maskiin: 1509515 px. Alfa min/max [0, 253]; alpha255-pikseleitä 0.
Kahden pikselin Chebyshev-toleranssin ulkopuolella alpha>0: 764374 px, alpha>=16: 606755 px, alpha>=128: 403600 px. Erodoidun sisäalueen puuttuva alpha>=128: 5985 px.

## Mitä uusi ehdokas muutti

- Louvren eteläjulkisivun ja joen välinen irtonainen talosilppu korvautui yhtenäisellä kivetyllä rantaterassilla, rantamuurilla ja istutuskaistoilla.
- Rakennuksen alle tuli laaja kiveys. Louvre-palatsia ja pyramideja ei maalattu uuteen kerrokseen.
- Maalle piirtyi kaakkoon suuntautuva rakennuksen varjo; istutuksia ja pieniä puita lisättiin etelä- ja itäpuolelle.

Paikallisessa QA-yhdistelmässä muuttumaton Louvre seisoo aiempaa yhtenäisemmällä maakaistalla. Natiivi ehdokas kuitenkin sisältää myös Tuileriesin puutarhan, joen sekä tausta- ja vastarannan kortteleita sallittua maskia laajemmin; osa näistä on läpikuultavia. Ne näkyvät sinitaustalla eivätkä ole vain alpha0-alueen piilovärejä.

## Poikkeamat

- Maskin ulkopuolella on 416 047 peittävää (alpha>=128) pikseliä; kuva ei ole rajattu tilattuun maakerrokseen.
- Vettä ja maskin ulkopuolisia kortteleita on maalattu, mukaan lukien Rivolin suunta; lähteen kielto ei toteudu.
- Täsmällinen alfa=maski ja enintään 2 px reuna eivät toteudu. Täysin peittäviä alpha255-pikseleitä ei ole.

**Kokonais-QA: EI LÄPÄISTY.** Toimitus on yhden sallitun oton kokeiluehdokas, ei hyväksytty tuotantokerros. Reunojen täsmällistä katu-/talorivijatkumoa ei voi väittää varmennetuksi maskin ulkopuolisen maalauksen vuoksi. Vastaanottajan/KK:n hyväksyntä, koodikoostaminen, pelikytkentä ja julkaisu ovat erillisiä.

Lukittu rakennus säilyi tiedostona koskemattomana: SHA256 6780c271963926fe1ab75f4870d62737a0a65bcde3e85beb07f7373b6ab14346. QA-yhdistelmä tehtiin vain paikallista tarkastusta varten: alkuperäinen pohja + natiivi ehdokas ilman maskikorjausta + muuttumaton lukittu rakennus. Yhdistelmä ei ole toimituskuva, pelitoteutus tai runtime-testi.
Kuva, täysi kehote prompt.json, QA ja yhdistelmä: /Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-alueet-1996-1997-20261104/louvre
