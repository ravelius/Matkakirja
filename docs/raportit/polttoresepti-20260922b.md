# Pohjapoltto 2026-09-22b-pohja — VESIVIIVOITUS POIS

Omistaja 22.9.2026 klo 14.55 (Fablen kautta): vesiviivoitus otetaan kokonaan
pois 30.8.2026 päätöksen mukaisesti; isobaatit (`--syvyyskayrat 200,1000,3000`)
jäävät, peitto ennallaan 0,55. **Poltto käynnistetään aikaisintaan klo 17.00.**

Perustelu: docs/raportit/meriviivat-selvitys-20260922.md (PR #2803). Raskas,
zoomatessa hyppivä viivanippu oli patinan `--vesiviivoitus tumma`
(VESIVIIVAT_TUMMA: 6 viivaa, voima 0,42, etäisyydestä rantaan), ei isobaatit.
Lisähavainto vedoksista 22.9.: vesiviivoituspassi myös **peittää isobaattien
musteen** — `--syvyyskayrapeitto 0` ja `1` antoivat tavulleen saman laatan,
kun `tumma` oli päällä. Ilman vesiviivoitusta peitto toimii (0,4 / 0,55 / 0,7 /
1,0 antavat eri laatat) ja isobaatit näkyvät ohuina viivoina.

## Muutos edelliseen ajoon (ajo-20260922)

Vain yksi lippu pois: `--vesiviivoitus tumma`. Muu resepti ennallaan
(joet pohjaan, isobaatit 200/1000/3000, syvyyskohina lauta, litistys 0,8,
merikoristeet, GSHHG-ranta rantatasolla, rannikon harvennus 0,004, laatu 0,9,
patina kevyt).

## Versiot

| Taso | Versio | Huom |
| --- | --- | --- |
| pohja | `2026-09-22b-pohja` | UUSI |
| viivat | `2026-09-22b-viivat` | UUSI, sama sisältö (skripti vaatii) |
| ranta | `2026-09-21-ranta` | ennallaan |
| nostot | `2026-09-22b-nostot` | UUSI, sama sisältö |
| nimiöt | `2026-09-22g-nimiot` | ENNALLAAN (versio h ei tässä ajossa) |
| pallotunniste | `20260922b` | UUSI |

Nimiöversio h (CHE-siirrot, `nimiot-poltto-5.json`) on tässä kansiossa
valmiina, mutta **sitä ei ajeta tässä erässä** ilman Fablen vahvistusta:
tämä erä muuttaa vain meren, ja nimiöiden sekoittaminen samaan tekisi
tuntumatestistä kaksimuuttujaisen. Jos Fable haluaa h:n mukaan, aja-2.sh:n
`--nimioversio 2026-09-22h-nimiot --nimiot $U/nimiot-poltto-5.json`.

## Ajo

1. `zsh /Users/koodaus/pyramidi-poltto/ajo-20260922b/aja-1.sh` — pohja z0–z8 +
   viivat + ranta, ~75 min (114 shardia, 16 ydintä), vienti ämpäriin
   shardeittain.
2. `zsh /Users/koodaus/pyramidi-poltto/ajo-20260922b/aja-2.sh` — nostot +
   nimiöt + pallon sarja 20260922b, ~50 min; luettelo jää vientikansioon
   (`--ei-luettelovientia`).
3. Julkaisija: `js/pallo.js` `PALLO_LAATTAVERSIO` → `2026-09-22b-pohja`,
   `PALLO_LAATTATUNNISTE` → `20260922b`; versio mainiin.
4. Luettelo ämpäriin VASTA kun osoitin on mainissa (edellinen luettelo
   talteen: `ampari-luettelo-edellinen.json`).

CI-tauko noin 2 h (vaiheet 1–2 peräkkäin) — sovittu Julkaisijan kanssa,
mittausikkuna klo 17–19, ei savukkeita polton aikana.

## Vedokset tarkistettavaksi (ennen ajoa)

`docs/raportit/kuvat/vedos-rannikko-20260922b.jpg` (Lioninlahti, pyramidi z7:
ylärivi nykyinen tuotanto, keskirivi uusi peitto 0,55, alarivi peitto 0,70) ja
`docs/raportit/kuvat/vedos-valimeri-20260922b.jpg` (Sardinian pohjoispuoli,
sama järjestys). Avomerellä ero on pieni, rannikolla nippu katoaa ja jäljelle
jää yksi ohut mannerjalustan käyrä.
