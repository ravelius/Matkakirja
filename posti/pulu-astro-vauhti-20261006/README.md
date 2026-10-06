# Pulu-astronautin vauhti-ilmeet — katselmusehdokas 6.10.2026

Tila: **Päätoimittajan katseluun; ei integroitu natiivipeliin eikä julkaistu.**

| PNG | Nopeus | Ilme |
| --- | --- | --- |
| `pulu-astro-vauhti-0.png` | 1–30× | Nykyinen lepoilme. |
| `pulu-astro-vauhti-1.png` | 100–300× | Suuret kiiltävät silmät, hieman auki hymyilevä nokka, taakse painuneet höyhenet. |
| `pulu-astro-vauhti-2.png` | 1000× | Silmät ja nokka viiruina, taakse venyvät posket/höyhenet ja pieni hikipisara. |

Kaikki kolme ovat läpinäkyviä 456 × 912 px RGBA-PNG-kuvia samasta
152 × 304 -yksikön SVG-kankaasta (@3x). Alfapikselien yhteinen rajaus on
`x=264…432, y=708…904` (0-pohjainen); vartalo, kypärä ja ankkuri eivät
vaihdu. Muuttuvien pikselien rajaus on ilmeessä 1 `x=282…396, y=730…800`
ja ilmeessä 2 `x=280…397, y=730…799`. Toimituskuvat ovat EVA-hahmon
peruskerroksia: robotin varsi, pidikkeet ja valot ovat natiivissa erillisiä.

`esikatselu.png` on katselua helpottava kolmen ilmeen kooste, jossa
peruskerros on valaistu ja kypärälamput näkyvät. Se ei ole korvaava
pelitekstuuri eikä täsmällinen natiivin kasvovalon simulointi.

Integraatiohuomio: nykyinen `LiviaKuva.cs` piirtää peruskerroksen lisäksi
`perus-kasvot.png`-tekstuurista kasvovalon soikion. Natiivi-UI:n täytyy
vaihtaa myös tuon soikion ilme nopeuden mukana (tai muuttaa kompositointia),
ettei vanha lepoilme peitä uusia kasvoja. Tässä haarassa ei ole muutettu
natiivikoodia, nopeusohjausta eikä julkaistua peliä.

Uudelleenvienti: `node tools/vie-pulu-astro-vauhti.mjs`. Tarkistukset:
`node --test tests/pulu-astro-vauhti.test.mjs`; koko `npm test` 5303 läpi,
19 ohitettua, 0 virhettä (5322 yhteensä); `git diff --check` puhdas.

Lähdepyyntö: `posti/fable-codex-pulu-vauhti-ilmeet-20261006.md`
postilaatikkohaarassa. Sen 300 × 420 px kuva on läpinäkymätön pelikaappaus;
varsinainen vaihdettava natiivisprite on 304 × 608 px (@2x) ja sama
vektorikangas @3x-muodossa 456 × 912 px. Mittaero on tarkoituksellinen.
