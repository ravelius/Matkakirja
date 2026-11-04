# notre-dame — tilaus #1997, yksi otto

Lähde posti/karttaseppa-codex-nahtavyysalueet-20261104.md, commit 26a112454a821448d927573c70a1e87077de1d7a, blob fa871b192993a91701b621d422d5c94981054dac. Koko posti, molemmat työohjeet ja tämän kohteen kaikki 11 manifestitiedostoa luettu ja SHA256-varmennettu. Ei junaan.

Yksi kokonaan uusi generointi, yksi sisäänrakennetun image_gen-työkalun kutsu. 1536 × 1024 RGBA, natiivit PNG-tavut säilytetty. Ei maskikorjausta, rajausta, värikorjausta, osittaista editointia tai lisäottoa.
SHA256: ea2fdc0ae4282e67482f730d9c0193ebced0ea57bd81810db57f977459d22477

## Alfan vastaavuus

Maski SHA256 d8fa97b4406567b980a04dd977c0ac724b5a4f9baa25510f8a20ca565e4a1424, maskin pinta-ala 386543 px.
alpha>=128 XOR **1124881 px** = ulkopuolella 1124881 + sisältä puuttuu 0. IoU 0.255748.
Täsmällinen alfaero maskiin: 1527075 px. Alfa min/max [0, 253]; alpha255-pikseleitä 0.
Kahden pikselin Chebyshev-toleranssin ulkopuolella alpha>0: 1129209 px, alpha>=16: 1113939 px, alpha>=128: 1113558 px. Erodoidun sisäalueen puuttuva alpha>=128: 0 px.

## Mitä uusi ehdokas muutti

- Katedraali jätettiin pois uudesta kerroksesta; sen paikalle syntyi kivipintaa, puistokaistoja, pyöreitä puita ja tavallisia talorivejä.
- Katedraalin jalkojen ympärille syntyi yhtenäinen kapea kivikaista ja Cité-saaren kärkeen puutarha.

Sinisellä taustalla ja muuttumattomalla lukitulla katedraalilla tehdyssä paikallisessa QA-yhdistelmässä tarkastettu. Jalkojen kivikaista näyttää yhtenäisemmältä, mutta natiivi kuva on käytännössä koko kartta: vesi, Saint-Louis ja ympäröivät korttelit ovat mukana. Lukitun katedraalin tiedostoa ei muutettu.

## Poikkeamat

- Alfa ei noudata maskia: alpha>=128 XOR 1124881 px, kokonaan maskin ulkopuolella; kahden pikselin toleranssin ulkopuolella 1113558 px.
- Vettä, Saint-Louis-saarta ja muita maskin ulkopuolisia kaupunginosia maalattiin nimenomaisesta kiellosta huolimatta.
- Kuvan alareunassa on tasainen ruskea kaista ja läpinäkyvää reunaa. Koko kartan rajaus/reunajatkuvuus ei vastaa vaadittua erillistä maakerrosta.
- Alpha255-pikseleitä ei ole, joten maskin sisäaluekaan ei ole täysin peittävä. Täsmällistä kaakkoon suuntautuvaa maavarjoa ei voitu hyväksyä.

**Kokonais-QA: EI LÄPÄISTY.** Toimitus on yhden sallitun oton kokeiluehdokas, ei hyväksytty tuotantokerros. Reunojen täsmällistä katu-/talorivijatkumoa ei voi väittää varmennetuksi maskin ulkopuolisen maalauksen vuoksi. Vastaanottajan/KK:n hyväksyntä, koodikoostaminen, pelikytkentä ja julkaisu ovat erillisiä.

Lukittu rakennus säilyi tiedostona koskemattomana: SHA256 3614d0a6d3ebed0109ec98d6097d22149144f9698eea22fd0aa8d596aa1ea488. QA-yhdistelmä tehtiin vain paikallista tarkastusta varten: alkuperäinen pohja + natiivi ehdokas ilman maskikorjausta + muuttumaton lukittu rakennus. Yhdistelmä ei ole toimituskuva, pelitoteutus tai runtime-testi.
Kuva, täysi kehote prompt.json, QA ja yhdistelmä: /Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-alueet-1996-1997-20261104/notre-dame
