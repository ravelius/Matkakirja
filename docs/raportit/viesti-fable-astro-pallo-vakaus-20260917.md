# Viesti Fablelle: savuke-astro-pallo — varjovartiot pysäytetystä tilasta

Opus-agentti, 17.9.2026 (Suomen aika). Haara
`claude/bold-ride-vow4ki-astro-pallo-vakaus` origin/mainin päältä.

## Juurisyy

Varjovartiot lukevat kolme kuvakaappausta `.pallo-kotelo`sta noin
sekunnin välein (päällä → kytkin pois → takaisin päälle) ja vertaavat
samoja pikselipisteitä (0,94 × säde, kulmat −22/0/+22 molemmilla
reunoilla, 7 × 7 pikselin keskiarvo). Kaappausten VÄLISSÄ ruutu eli,
vaikka pallo ei pyörinyt (Actions-lokin MITAT-rivi: `avaruus.pyorii`
false):

1. **ISS-merkki ja ratakaari.** `js/linssit/satelliitti-avaruus.js`
   `luoAvaruusKalvo → paivita` ajetaan joka kehyksellä ja asettaa
   `aika = performance.now() / 1000`; ratakaari piirretään uudelleen
   SVG-polkuna ja merkki siirtyy. Kaari kulkee juuri REUNAN yli — eli
   näytepisteiden läpi — ja merkillä on leveä `box-shadow`. Yksi kirkas
   viiva 7 × 7 pikselin näytteessä siirtää keskiarvoa kymmeniä
   yksiköitä. Tämä selittää myös 17.9. uuden punaisen (Actions
   35221065011, PR #2555 v1931): päällä 63,5 → pois 83,5 → takaisin
   57,9, eli sama kytkinasento antoi 5,6 yksikköä eri lukeman.
2. Pienemmät liikkujat: tähtipölyn ajautuma (`js/pallolauta/tahdet.js`
   `kierto`) ja pinnan viimeinen lataus (reliefi 8k/4k), joka voi
   vaihtaa pikselit kesken mittauksen.

Pelikoodissa ei ole erillistä "pysäytä animaatio" -koukkua savukkeille;
`reduced`-tila jäädyttää kalvon, mutta se on koko näkymän
liikkeenvähennystila eikä sovi tähän mittaukseen.

## Korjaus (vain savuke, ei pelikoodia)

`tools/savukkeet/savuke-astro-pallo.mjs`, luku 3:

- **Pinta odotetaan lopulliseksi:** `waitForFunction`, joka vaatii
  `reliefinKestoMs > 0` ja että `pinnanOsoite | reliefinTarkkuus |
  reliefi` on sama viidellä peräkkäisellä lukemalla.
- **Liike pysäytetään mittauksen ajaksi:** `autoRotate` pois ja
  savukkeen oma tyylisääntö `.astro-rata, .astro-iss { display: none }`.
  Varjo ja valoreuna — ne joita väitteet koskevat — jäävät paikoilleen.
  Jäädytys puretaan heti varjoväitteiden jälkeen, joten loput väitteet
  katsovat pelaajan omaa ruutua. Pelin ulkoasu ja käytös eivät muutu.
- **Sama kamera-asento:** `pointOfView()` luetaan ennen ja jälkeen, ja
  ero on oma väitteensä.
- **Jokainen näyte otetaan vasta kun kaksi peräkkäistä kaappausta ovat
  samat** (raja 0,5; enintään neljä yritystä). Jos ruutu ei rauhoitu,
  se näkyy omana punaisenaan eikä satunnaisena häilyvyytenä.
- **Uusi vartio:** "varjomittaus tehdään pysäytetystä tilasta ja samasta
  kamera-asennosta" — muiden kolmen ehto.
- Toleranssit pysyivät ennallaan (ei kasvatettu mitään).

## Mittaus (Mac, Chromium 1234, NAKYMAT=tyopoyta,puhelin)

Kaksi peräkkäistä ajoa, molemmissa **100/102 läpi**. Kaikissa
näytteissä peräkkäisten kaappausten ero oli **0** ja kamera-asento
täsmälleen sama.

| Vartio | työpöytä | puhelin |
| --- | --- | --- |
| varjon puoli tummuu | 66,7 → 49,8 | 85,3 → 65,3 |
| valon puoli kirkastuu | 57,4 → 65,7 | 49,2 → 57,4 |
| keskusta jää koskematta | 67,6 → 67,6 | 86,7 → 86,7 |
| varjo ei ulotu puoliväliin | 120,9 → 120,9 / 65,1 → 65,1 | 112,7 → 112,7 / 65,8 → 65,8 |
| varjon syvyys | 25 % | 23 % |
| VASTAKOE: kytkin pois palauttaa pikselit | päällä 49,8, pois 66,7, takaisin **49,8** | päällä 65,3, pois 85,3, takaisin **65,3** |
| näytteiden ero (vakaus) | 0 / 0 / 0 | 0 / 0 / 0 |

Ensimmäisen ajon luvut olivat käytännössä samat (puhelin: 64,2 / 84,9 /
64,2). "Takaisin" osui molemmissa ajoissa TÄSMÄLLEEN samaan lukuun kuin
"päällä" — mittaus on nyt deterministinen.

`tools/savukkeet/sarjat.json`: kolme tunnettua punaista poistettu,
huomautus päivitetty ("korjattu 17.9.2026, mittaus pysäytetystä
tilasta"). `VASTAKOE: kytkin pois palauttaa pikselit` EI lisätty
tunnetuksi punaiseksi, koska se on nyt vihreä ja deterministinen.

## Jäljelle jäänyt punainen (eri juuri, ei tässä erässä)

Molemmissa Mac-ajoissa kaatui **"pyöriminen loppuu, kun pelaaja tarttuu
palloon" (puhelin)**: `pyorii false`, mutta kulma liikkui yhä
0,145–0,161° kahdessa sekunnissa (raja 0,05). Toisessa ajossa kaatui
myös sen pari "VASTAKOE: sama mittari näki liikkeen ennen tarttumista"
(ennen 0,641°, jälkeen 0,161° — suhde jäi alle neljän). Kyse on vedon
jälkeisestä liu'usta (js/pallo.js vauhti), joka ei ehdi sammua neljässä
sekunnissa Macin nopealla kehysluvulla. Tämä on varjovartioiden
ULKOPUOLELLA (ennen niitä samassa ajossa) eikä liity tähän korjaukseen —
jätän sen Fablen päätettäväksi omaksi eräkseen.

## Yksikkötestit

`node --test tests/*.test.mjs`: **# pass 3572, # fail 0** (3585 testiä,
loput ohitettuja).

## Oletukset

- Savukkeen oma DOM-jäädytys (`display: none` kahdelle kalvon
  elementille) on mittausväline, ei pelin muutos: se elää vain
  savukkeen ajon ajan ja puretaan heti varjoväitteiden jälkeen.
  Pelikoodiin ei siis tarvittu testikoukkua.
- Tähtipölyn ajautumaa ei pysäytetty: näytepisteet ovat pallon
  siluetin sisällä, eikä pöly näy niissä. Mittaus (ero 0) vahvistaa.
- Vakausraja 0,5 valittiin siksi, että pysäytetyssä tilassa ero on 0 —
  raja on siis varalla, ei säädin.
