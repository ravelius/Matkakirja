# Opus → Fable: savuke-astro-pallo 45c deterministiseksi (19.9.2026)

Erä `opus-local-45c`, Matkakirja Opus local (Mac Studio), 15.05–15.15 Suomen aikaa.

## Juurisyy

45c ei ollut kuormapunainen. Sädekehä (`.satelliitti-sadekeha`, 28 px,
radiaaligradientti α 0,26 → 0, `mix-blend-mode: screen`) nostaa pikseliä
määrän α·c·(255 − tausta)/255: sama sädekehä kirkastaa tummaa merta
enemmän kuin vaaleaa maata. Mittari valitsee ruudun keskustaa lähimmän
pisteen, ja se piste vaihtuu ajosta toiseen (kamera pysähtyy hieman eri
kohtaan; mitatut pisteet 195,426 / 300,426 samalla puhelinnäytöllä).
Kiinteä raja "nosto ≥ 5" mittasi siis sen, minkä maaston päälle piste
sattui osumaan, ei pelin hehkua. Kaappaukset olivat vakaat (40 px:n kehä
muuttui −0,1…0,4, pilvikuori piilossa), joten feidi tai kesken jäänyt
animaatio ei ollut syy. Peliä ei tarvinnut korjata.

## Muutokset

- `tools/savukkeet/savuke-astro-pallo.mjs`: 45c vertaa nostoa
  kirkastumisvaraan: `suhteellinen = valaisu / (255 − lahellaIlman)`,
  vaatimus ≥ 0,02 ja valaisu ≥ 2 (taustan ehto |40 px:n muutos| ≤ 3
  ennallaan). Selitteeseen suhde, vara ja pisteen ruutupaikka. Kommentti
  perusteluineen. Sädekehä piilossa nosto on 0 → mittari osaa yhä mennä
  punaiseksi.
- `tools/savukkeet/sarjat.json`: 45c poistettu tunnetuista punaisista
  riveiltä `#puhelin` ja `#tyopoyta` (lista tyhjeni, avain poistettu);
  huomautukseen yksi lause juurisyystä ja päivästä.

## Mittaukset (Chromium, Mac Studio, portit 8910/8911)

| Ajo | Tausta 10 px (ilman kehää) | Nosto | Suhde varaan | 45c | Kaikki |
| --- | --- | --- | --- | --- | --- |
| ENNEN puhelin yksin | 78,1 | 5,5 | (0,031) | OK | 49/49 |
| ENNEN puhelin rinnakkain 1 | 39,1 | 6,5 | (0,030) | OK | 49/49 |
| ENNEN puhelin rinnakkain 2 | 79,2 | 4,9 | (0,028) | FAIL | 48/49 |
| JÄLKEEN puhelin yksin | 58,9 | 5,3 | 0,027 | OK | 49/49 |
| JÄLKEEN puhelin rinnakkain | 60,7 | 5,9 | 0,030 | OK | 49/49 |
| JÄLKEEN tyopoyta,ei-vartija rinnakkain | 72,1 | 5,8 | 0,032 | OK | 49/49 |

Suhde pysyy välillä 0,027–0,032 riippumatta taustasta ja kuormasta;
raja 0,02 jättää noin 30 % marginaalin.

`node --test tests/*.test.mjs`: # pass 3650, # fail 0.
`node tools/tarkista-savukkeet.mjs`: kunnossa.

## Jäi tekemättä

- WebKit-ajoa ei tehty (tehtävänanto: Chromium yksin + rinnakkain).
- 45b:n kiinteä raja (≥ 3) on samaa sukua: se vertaa 10 px:n ja 40 px:n
  maastoa, joten sekin riippuu pisteen alla olevasta maastosta. Ei
  punainen nyt (ero 7–13), ei muutettu.
