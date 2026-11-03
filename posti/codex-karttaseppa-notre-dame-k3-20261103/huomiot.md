# Notre-Dame alue k3 – yksi otto, tarkastettava ehdokas (3.11.2026)

Tilaus #1945 tehty yhdellä uudella kokonaisella ImageGen-otolla. Alkuperäinen 1536 × 1024 RGBA toimitetaan tavuilleen muuttamattomana. Ei skaalausta, rajausta, alfan kynnystystä, maskikoostamista tai kuvakorjausta. Aiempi k2 säilyy historiassa.

## Toteutunut
Kirkko ja sen aukio ovat silmämääräisesti Citén maalla, eivät joen päälle levitettyinä. Molemmat Seinen haarat ovat auki; vain kapea keskitornin huippu nousee pohjoisveden päälle. Saarelle siirtynyt rakennus peittää tavallisia taloja ja osa niistä on poistunut sen paikalta. Sinisellä taustalla tarkistettu läpinäkyvyysesitys osoittaa selvästi joen aukot. Ei veneitä, autoja, lintuja tai muita liikkuvia osia havaittu.

## Poikkeamat – QA ei läpäissyt
- Katedraali pieneni liikaa: etujulkisivu on arviolta 90–105 px leveä pyydetyn 200–260 px sijaan. Koko rakennuksen siluetin leveys on noin 150–165 px. Mitat ovat käsin kuvasta arvioituja, eivät segmentointiin perustuvia.
- Kaksi etutornia sai harmaat pyramidimaiset katot. Ne eivät ole pyydetyt tasakatot. Julkisivu osoittaa pääosin pelaajaan, mutta on hieman vinossa.
- Mustan alueen läpinäkyvyys epäonnistui: generaattori maalasi suuren osan koko pohjakartasta eikä rajannut tulosta maamaskiin. Valkoisen maamaskin ulkopuolella on 984 015 pikseliä alfalla vähintään 128; kirkon sallittu kapea ylitys selittää tästä vain osan.
- Vesi ei ole täysin alfa 0. Vesimaskin 191 779 pikselistä vain 2 803 on täysin läpinäkyviä ja 28 406:lla alfa on vähintään 128. Varovaisen kirkon pystysiluetin suorakulmion (x620–855, y200–620) ulkopuolelle jää 24 649 vesimaskin pikseliä alfalla vähintään 128. Suorakulmio on diagnostinen arvio, ei tarkka tornimaski.
- 1 530 107 pikseliä on puoliläpinäkyviä (alfa 1–254), eikä kuvassa ole yhtään alfa 255 -pikseliä. Maalattava maa peittyy lähes kokonaan (340 047 / 342 000 pikseliä alfalla vähintään 128), mutta tämä ei tarkoita rajauksen onnistumista. Tiukka alfa 0/255 ja enintään 2 px reunapehmennys eivät toteutuneet.
- Vesirajojen täsmällistä osumista alkuperäisiin pikseleihin ei vahvisteta. Vaikka kirkon jalanjälki näyttää maalla pysyvältä, maski- ja vesitarkistus eivät salli suoraa käyttöön kytkentää.

Tarkistuskuvat alpha-on-blue.jpg, overlay-on-source.jpg, cathedral-detail3x.png ja alpha.png sekä checks.json ovat paikallisessa output/pariisi-notre-dame-k3-1945-20261103/qa-kansiossa. Sininen tausta on vain QA-esitys, ei toimitetun kuvan väritys. Lähde e8493f157d2bad74536861451491ffa841f0e5b1 / blob e3274a1366ffbdd9659dd80870488edfc1706164. Kaikki 13 manifestitiedostoa varmennettiin. Täysi prompti ja viitteet on tallennettu source-and-prompt.json-tiedostoon; oletus sisäänrakennettu ImageGen, transparent_background=true.

Yksi sallittu otto käytetty. Ei uusia yrityksiä. Vastaanotto, omistajan hyväksyntä, pelin maskikorjaus, pelikytkentä ja julkaisu ovat erillisiä; niitä ei tällä toimituksella väitetä tehdyiksi.
