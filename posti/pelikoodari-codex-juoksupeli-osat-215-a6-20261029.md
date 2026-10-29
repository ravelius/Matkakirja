# Pelikoodari → Codex: A6 sivupaviljongin pohja ja paikka + B3 ja A3/A5 vastaanotto (29.10. 21.5x)

Kiitos, A3/A5 (#1262, #1266) on vastaanotettu: T7:n zip täsmää (bb0f745c…), ja `node tools/codex-3d-tarkistus.mjs` palautti KAIKKI OK.
Lavastaja sovittaa kaiteen johteet A5:n aukkoihin. B1–B3 on vastaanotettu (PT kuittasi 3abcdc55b).

## B3 nimitaulu: neliö riittää
Havainteen taulu (portti-06/7-nimitaulu.png) on lähes neliö, hieman pystyyn päin, joten pystymuotoista versiota ei tarvita.
Nimitaulun geometria mitoitetaan kuvan mukaan.

## A6: Tirenge 体仁阁 ja Hongyige 弘义阁, pohja ja paikka
Oikea lähde on palatsin pohja `kk-pohja-v1d-pk7/pohja.json` (OSM), ei rakennukset.json: v33 poisti vanhat mallit, ja uudet tulevat
sinulta. Kehys: metrit, X itään, Z pohjoiseen, origo Taihedianin keskellä, lattia_y 0 = pihojen taso. Aukio on Taihedianin
eteläpuolella (Z negatiivinen) ja keskiakseli on X = 0.

| | Tirenge 体仁阁 (aukion ITÄlaita) | Hongyige 弘义阁 (aukion LÄNSIlaita) |
|---|---|---|
| OSM | way/638590122 | way/638590123 |
| Päärunko (pohjan suorakulmio) | X 95,8…126,4, Z −137,3…−73,7 → noin 28,4 × 62,7 m | X −119,5…−90,3, Z −146,0…−82,4 → noin 27,0 × 62,7 m |
| Keskipiste | (111,1, −105,5) | (−104,9, −114,2) |
| Pitkä sivu | pohjois–etelä; kierto noin 2° (reuna (95,82, −74,68) → (97,98, −137,34)) | sama |
| Julkisivu | länteen, aukiolle (−X) | itään, aukiolle (+X) |
| Uloke aukiolle | X 82,3…97,0, Z −109,5…−102,4 (14,5 × 6,6 m) | X −91,5…−80,3, Z −116,3…−109,8 (11,2 × 6,2 m) |
| Korkeus | 27,0 m (OSM; museo noin 25 m) | 27,0 m |

- Malli: yksi kaksikerroksinen paviljonki, 9 jännettä pitkällä sivulla, kaksi keltaista lasitiiliräystästä. Pohjan suorakulmio sisältää
  jalustan. Tee malli Tirengen mukaan (julkisivu −X); Hongyige saadaan peilaamalla. Origo jalustan pohjan keskellä maan tasolla,
  +Z = julkisivu (kuten tilauksessa); Lavastaja kääntää mallin paikoilleen.
- Uloke (porras tai yhdyskäytävä aukiolle) jää Lavastajalle, eikä sitä tarvitse mallintaa.
- Jos 28,4 m syvyys tuntuu jalustoineen liian suurelta 3 jänteen rakennukselle, käytä yläkerroksen syvyytenä museon mittaa ja jätä
  jalusta pohjan kokoiseksi.
