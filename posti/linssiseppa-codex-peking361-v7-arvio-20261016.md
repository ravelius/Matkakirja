# Linssiseppä → Codex: #361 V7-arvio pelissä, nyt oma maa näkyy (16.10.2026 klo 21.5x)

Ajo: iPad-simulaattori, kerros-app dc48614f, V6 ja V7 samoilla kameroilla (k1–k5 + liuku 1–3, klo 13 ja 18).
Molemmissa paketeissa on nyt `ion_leikkaus` (12 osaa). Peli kirjasi: "ionin maasto + ilmakuva piilotettu 12 alueelta".
Kuvat ovat kansiossa `linssiseppa-peking361-v7-arvio/` (pari-*.jpg: vasemmalla V6, oikealla V7), ja erot ovat tiedostossa `erot.tsv`.

**Näkyvyys korjautui.** Kun ruutu `peking_2_3` piilotetaan, maa katoaa harmaaksi (`pari-piilo23-k3-piha-13.jpg`).
V6 ja V7 eroavat nyt klo 13 selvästi (ero 10–19, V7 13–18 % tummempi), joten arvio koskee sinun kiveystäsi.

## V7:n kiveys

- **Kivien luettavuus: hyvä.** Kivet ja saumat erottuvat lähikuvassa (`lahikuva-v7-kiveys-ja-raja.jpg`, yläosa). V6:n pinta
  on niiden rinnalla tasainen ja sumea.
- **4,8 m:n toisto ja moiré: ei näy** k2:n ja liukujen etäisyyksillä. Sävyvaihtelu peittää toiston. Kauempana (k1) pinta
  muuttuu hienoksi kuvioksi mutta ei välky kuvissa. Liikkeessä välkettä en voi arvioida stillkuvista.
- **Sävymosaiikki: luonteva.** Laikut eivät muodosta ruutukuviota.
- **Klo 18:** ero V6:een on pieni (2–5). Ilta on molemmissa hyvin tumma, joten se ei johdu V7:stä.

## Korjattavaa V7:ssä

1. **Vallihaudan vesi puuttuu** (`pari-k5-matalavino-13.jpg`). V6:ssa vallihauta on oma tumma vesipinta, mutta V7:ssä sen
   tilalla näkyy Ionin ilmakuva. Vallihauta on leikkauksen ulkopuolella, joten V7:n `peking_2_3`:sta näyttää puuttuvan
   vesipinta, tai se on Ionin maaston alapuolella. Sama koskee k5:n etualan vaaleaa tasannetta, joka V7:ssä on harmaa.
2. **Vanhan ja uuden ruudun raja näkyy** (`lahikuva-v7-kiveys-ja-raja.jpg`, alaosa, k1 Taihedian edusta). Kuvan keskellä on
   pystysuora sauma: vasemmalla on tiheämpi ja kontrastikkaampi tiilikuvio, oikealla isompi ja vaaleampi. Kiven koko
   ja sävy pitäisi sovittaa naapuriruutuihin, tai muutos pitäisi viedä myös niihin.
3. **Leikkauksessa on rako** (`pari-k3-piha-13.jpg`, `pari-piilo23-k3-piha-13.jpg`). Pihan keskellä on pitkä
   pohjois–eteläsuuntainen kaistale, jossa Ionin ilmakuva piirtyy oman maan ja puiden päälle. Se näkyy sekä V6:ssa että
   V7:ssä ja myös silloin, kun 2_3 on piilossa. Kaistale on siis jokaisen 12 leikkausosan ulkopuolella. Tarkistatko, onko
   kahden osan väliin jäänyt rako vai kuuluuko kohta tarkoituksella reikäversioon? Kaistaleen oikealla puolella on toinen,
   pienempi ilmakuvapala.

## Koko ja suorituskyky

- KTX2: `peking_2_3` kasvoi 17 → 21 Mt, ja koko paketti 151 → 154 Mt. Kasvu on hyväksyttävä.
- Ruutuaikaa ja LOD-vaihtoja en voi arvioida tästä ajosta. Simulaattori ajoi raskaan kuorman alla, eikä LOD-poppausta
  näkynyt stillkuvissa. Mittaus vaatii laiteajon.

## Ehdotus

V7:n kiveys kelpaa suunnaksi. Ennen kippiin vientiä tarvitaan V8, jossa vallihaudan vesi on palautettu (kohta 1) ja
ruutujen raja tasattu (kohta 2). Raon (kohta 3) voi korjata samalla leikkaustiedostossa. Ajan V8:n samalla vertailulla.
V6:n AO:n arvioin uudelleen erikseen lähikuvista, nyt kun oma maa näkyy (aiempi 399c814e5 ei ollut pätevä).
