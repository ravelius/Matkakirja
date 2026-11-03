# Notre-Dame k2 – toimitus tarkastukseen, 3.11.2026

Tilaus #1937: yksi kokonainen uusi ImageGen-otto. Kuva on generaattorin alkuperäinen 1536 × 1024 RGBA PNG tavuilleen muuttamattomana: ei rajausta, skaalausta, maskikorjausta eikä uudelleenpiirtämistä. Maa 0,635 px/m on lähteen nykyinen mittakaava. Aiemmat kuvat on säilytetty.

## Toteutunut
- Kaksi tasakattoista tornia ja ruusuikkuna katsovat suoraan pelaajaa kohti. Tämä on nykyisen omistajaohjeen mukainen suunta.
- Katedraali on voimakkaasti liioiteltu, keskitorni nousee lähes kuvan yläreunaan. G-kuvan värit ja yhtenäinen piirrostapa näkyvät lähiympäristössä.
- Kirkko peittää pääosan Citéstä. Sainte-Chapelle ei erotu itsenäisenä; tavallisia taloja ja aukioita on pienennetty tai korvattu. Sillat ja rantakorttelit on järjestetty uudelleen kirkon ympärille. Näille yksittäisille siirroille ei ole tuotettu tarkkoja koordinaatteja.

## Havaitut poikkeamat – ei valmis suoraan peliin
- Katedraalin leveys on silmämääräisesti noin 450–470 px, ei pyydetty 600–650 px. Korkeus kasvoi leveyttä enemmän.
- Lähdemaskin valkoisista 498 116 pikselistä 489 906 (98,35 %) peittyy alfalla vähintään 128. Peitto ei osoita kohdistuksen onnistumista: luoteen tavalliset talot ulottuvat maskin yli, ja joen sekä rantaviivan liittymät eivät osu pohjaan. Luoteen vertailupisteen ero on noin 80 px, lännen noin 66 px ja kaakon noin 13 px. Nämä ovat käsin valittuja suuntaa antavia pisteitä, eivät automaattinen rantaviivamittaus.
- Maskin ulkopuolella on 96 981 pikseliä alfalla vähintään 128. Osa kuuluu sallittuun kirkon ylitykseen; konservatiivisen kirkkoalueen ulkopuolelle jää silti 39 248 pikseliä. Kirkon poissulkeva suorakulmio on vain arvio, ei tarkka esinemaski.
- Läpinäkyvyys ei täytä reunavaatimusta täydellisesti: 952 840 pikseliä on alfa 0, mutta 28 661 pikseliä on alfa 1–8. Suurin alfa on 254. Hôtel de Villen suoja-alueen vieressä näkyy myös musta kulmikas kohta, joka pitää tarkistaa pohjaan yhdistettäessä.
- Generaattori lisäsi Seineen veneitä. Niitä ei pidä tulkita hyväksytyiksi, koska aiempi animointiohje varasi veneet erillisiksi liikkuviksi osiksi. Tämän oton promptista puuttui veneiden nimenomainen kielto.

Paikallinen QA: overlay-on-source.jpg, overlay-mask-boundary.jpg, parchment-preview.jpg ja checks.json kansiossa output/pariisi-notre-dame-k2-1937-20261103/qa. Geometria-/reuna-QA ei läpäissyt. Tilausmäärän mukainen yksi otto on käytetty; uutta ottoa ei tehty. Vastaanottajan hyväksyntä, peliin kytkentä ja julkaisu eivät sisälly tähän toimituskuittiin.

Lähde: posti/karttaseppa-codex-nahtavyysalue-notre-dame-k2-20261103.md, commit e758cbac48c6ff80dcf2bc1d48d8e44907ea35ba, blob ef9f05f2e80cc80b7dc3c9bd8dcbd4eb7623489b. Täysi prompti, lähdeohje ja viitteet ovat paikallisessa source-and-prompt.json-tiedostossa. Työkalutila: oletus sisäänrakennettu ImageGen, läpinäkyvä tausta.
