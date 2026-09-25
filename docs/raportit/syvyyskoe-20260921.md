# Syvyysviivakoe: portaat vs. atlaslehden isobaatit (Karttaseppä 21.9.2026)

Omistajan kysymys (Fable 21.9.): toimisiko Stieler-vedoksen tapainen
syvyyskäyräpiirros? Koelaatat Biskajanlahti (lon −8…0, lat 43…48,5) ja
Lioninlahti (2…8, 41…44,5), z6–z7, pohjataso muuten tuotannon reseptillä
(joet pohjaan, vesiviivoitus tumma, litistys 0,8, GSHHG-ranta rantatasolla).

Kuvat `docs/raportit/kaappaukset/syvyyskoe-20260921/`:
`<tyyli>-<alue>-<näkymä>-<lat>_<lng>_0.2.webp` (puhelin z7, työpöytä z6) ja
**`vertailu-biskaja-tyopoyta-200pros.png`** (sama rajaus rinnakkain, Biskajan
mannerjalusta).

| tyyli | mitä |
|---|---|
| **portaat** (nykyinen tuotanto) | `--syvyysportaat 30,120,600,1500,3000`: vyöhykkeet tasaisina sävyinä, raja sävyhyppynä |
| **kayrat** (koe) | `--syvyyskayrat 200,1000,3000`: meren sävy jatkuva ramppi, syvyysraja OHUENA VIIVANA (1 px laatassa, muste rgb(64,78,104), peitto 0,55) — Stielerin "Tiefenlinie" |

Toteutus: `tools/fokuskartta/maailmapiirto.js` `syvyysKayrat` /
`syvyysKayraMuste` / `syvyysKayraPeitto` (vyöhykepuskuri meripikseleille,
isobaatti = vyöhykkeen raja oikeaan tai alapuoliseen naapuriin, sama
kohina kuin portailla), `tools/generoi-laattapyramidi.mjs`
`--syvyyskayrat m,m,…` `--syvyyskayrapeitto`. Portaat ja käyrät voi
yhdistää (molemmat liput). Rannikon viivoitus (patina) on kummassakin sama.

Havainnot: käyrät näkyvät työpöydän z6:lla ohuina ja luettavina Biskajan
jalustan reunalla; puhelimen z7:llä viivat ovat samat pikselit eli
ohuemmat suhteessa ruutuun — iPhonella niitä näkyy vähemmän, kuten
omistaja arveli. Askel 200/1000/3000 on harva; tiheämpi (100/200/500/
1000/2000/4000) on yksi lippu. Tuotantoon vaatii koko pohjatason
uusintapolton (~1,5–2 h, ks. Fablen viesti 21.9.), ei kosketa nimiö-,
viiva- eikä rantatasoa.
