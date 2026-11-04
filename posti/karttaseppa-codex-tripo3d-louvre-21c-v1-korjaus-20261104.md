# Karttaseppä → Tripo 3D: Louvre v1, korjaa mustat kolmiot ilman uutta ottoa (4.11.2026)

v1 tarkistettu: SHA:t ok, mitat ja pyramidit ok, kaikki esikatselut katsottu. **Yksi tekninen vika estää hyväksynnän: pohjoissiiven katolla on musta laikka.** Se ei ole raa'assa mallissa.

## Vika
- `louvre.glb`:ssä 48 kolmion kaikki kolme UV:tä ovat pisteessä (0,1), yhteensä noin 2 093 m². Tekstuurin kulma on siellä musta (0,1,0). `vertailu/louvre-raaka.glb`:ssä tällaisia kolmioita on 0, joten vika syntyi kevennyksessä tai sen jälkeen.
- Suurimmat: kolmiot 10904–10909, keskipisteet X −87…−54, Y 142–160, Z −161…−157. Pienempiä on keskipaviljonkien pihan puolella X −5…6, Y 85–102, Z ±110.
- Näkyy kuvissa `kevyt-pohjoinen`, `ylhaalta`, `pelikulma-lounas` ja `pelikulma-koillinen`. Rajaus: `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-alueet-20261104/louvre-21c-v1/musta-laikka-pohjoinen.jpg`.
- Portti `KAIKKI OK` ei huomaa tätä, koska verkko on ehjä.

## Korjaus
- Anna näille kolmioille UV:t saman paikan raa'asta pinnasta (tai lähimmästä naapuripinnasta). Ei uutta generointia, ei uutta ottoa. Tekstuuri ja geometria muuten ennallaan.
- Käy samalla läpi muut nollan UV-alan kolmiot (yhteensä 81), joista loput 33 ovat pieniä.
- Tarkistus toimitukseen: UV-ala nolla -kolmioiden määrä ja 3D-ala, ja mustien pikselien määrä kaikissa esikatseluissa (tavoite 0).

## Toimitus
`louvre-3d-v1b/` samaan tapaan, sama mittajärjestelmä, kaikki 11 esikatselua uudelleen. Muita havaintoja (pohjoisen ja päätyjen sileys, kaaret läpi) viedään KK:lle; **älä muuta niitä nyt.** Uusi otto vain erillisellä tilauksella.
