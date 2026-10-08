# Pallon ja oppaan äänitasot 37 kaupungissa (Linssiseppä 8.10.2026, juna 169)

Proto-haara `linssiseppa/pallo-aanitasot-169` 3058fb964 (dbc488776:n päällä, 967/967, unity 0). Testi `PalloKaupungitTestit.AanitasotKaikissaKaupungeissa`, mitatut tasot `Linssit-testit/kultaiset/pallo-aanitasot-20261008.json` (ffmpeg astats + EBU R128). Kertojan ääninäyte on siltalauseet-v4, sama William-ääni. Ketjut ovat Ydin-luokassa `OpasAanitasot`, jota sovitin ja testi käyttävät.

Mikserin oletukset: Lukija 0,9, Tehosteet 1, Sää 1. Tehosteet −3 dB (omistaja TF 166).

## Mitatut leikkeet

| Lähde | integroitu / hetkellinen maks | huippu |
|---|---|---|
| kertoja (William, 8 siltalausetta) | −17,4 LUFS / −13,6 | −1,6 dBFS |
| tuuli-01 (äänimaisema) | −20,4 LUFS | −2,0 |
| sade-01 | −20,3 LUFS | −1,8 |
| ukkonen 01–04 | hetkellinen −12,2 | −1,7 |
| korin narina | hetkellinen −18,0 | −3,7 |
| liekin humahdus | hetkellinen −10,7 | −0,6 |

## Löydökset ja korjaukset

1. **Mikserin säätimet eivät vaikuttaneet oppaaseen:**
   - Kertoja ja siltalauseet soivat aina voimakkuudella 1,0. Ne seuraavat nyt Lukija-säädintä.
   - Pallon kori ei noudattanut Tehosteet-säädintä. Nyt noudattaa.
2. **Ukkonen ei väistänyt kertojaa.** Kumahdus oli hetkellisesti kertojan tasolla (−0,3 dB). Nyt se väistää −9 dB puheen alla, liukuen 0,25 s, ja on 7,8 dB kertojan alla.
3. **Leikkautuminen:** kertojan, ukkosen ja korin huiput olivat yhdessä noin 1,4 × täysi taso. Nyt myös kori väistää puheen alla, ja huippusumma on 0,98.

## Tulos puheen aikana (kaikki 37 kaupunkia)

- tuuli kameran korkeudelta ja rankkasade yhdessä: 14,1–15,9 dB kertojan alla (raja 10)
- ukkonen ja korin narina hetkellisesti: 7,8 dB kertojan alla (raja 6)
- huippusumma: 0,97–0,98 (raja 1,0)
- tuulen taso enintään 0,47–0,71 (korkeudesta riippuen)

## Avoinna (Siirtosepän soitin)

Kaupungin äänimaisema (KaupunkiAanimaisemaSoitin: tuuli, sade, kaupunki) ei vielä seuraa mikserin Tausta- ja Sää-säätimiä. Natiivi-UI on välittänyt asian Siirtosepälle. Testin tasot olettavat oletussäätimet, joten tulos pysyy samana, kun kytkentä tehdään.

Tarkistus on vain automaattinen. Kuuntelua laitteella ei ole tehty junasääntöjen mukaisesti.
