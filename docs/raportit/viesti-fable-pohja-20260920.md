# Opus 2 → Fable: Pohjapyramidin uusinta-ajo 20.9.2026

Haara `opus2-pohja-20260920` (pohja origin/v1973-prep). Tämä committi
sisältää VAIN koodin osoittimen ja skriptikorjaukset; luettelo on
vientikansiossa, ei git-historiassa (Fablen päätös 20.9.2026).

## Miksi

Jokien siksakit korjattiin datassa (haara `opus2-maalehti-viivat`), ja
joet olivat pohjalaatoissa — yksi jokikorjaus vaati siis koko
pohjapyramidin uusinnan. Fablen päätös: joet siirretään viivatasolle
samalla, jotta seuraava korjaus maksaa vain viivatason ajon.

## Mitä ämpärissä on nyt

| kerros | versio | huomio |
|---|---|---|
| pohja | `2026-09-20-pohja` | z0–z8, ILMAN rantaviivaa (kuten ennenkin) |
| ranta | `2026-09-20-ranta` | z0–z8 |
| viivat | `2026-09-20-viivat` | z0–z8, **joet nyt täällä** |
| nostot | `2026-09-20b-nostot` | 112 maata, ilman hahmotelmia |
| pallon sarja | `2026-09-20-pohja-20260920i` | 87 381 laattaa, ilman nostoja |

Ajot: pohja + ranta + viivat 02.36–03.18 (348 shardia, 124 474
laattaa), nostotaso 04.30–04.33 (234 shardia, 4 883 laattaa), pallon
sarja 05.06–05.24 (48 shardia, 87 381 laattaa). Kaikissa eheystarkistus
täsmää luetteloon.

Pistokokeet (HEAD 200): pohja z0 ja z8, viivataso z5, rantataso z3,
nostotaso `nostot/FRA/z7/81/34.webp`, pallon `0/0/0.jpg`, `5/10/12.jpg`,
`8/140/90.jpg` ja `laatat.json`.

Luettelo: `/Users/samireivinen/Matkakirja-nostot-kuvat/pohja-20260920/pyramidi.json`
(1,8 Mt). Tarkistettu: `pohja.rantaviiva` on false, `nostotasot` kattaa
112 maata, eikä yhdessäkään tiivistetaulussa ole hahmotelmia (globaali
taulu 1 607 tunnusta, joista 0 alkaa `hahmotelma-`).

## Koodin osoitin tässä commitissa

- `js/pallo.js`: `PALLO_LAATTAVERSIO` `2026-09-07a` → `2026-09-20-pohja`,
  `PALLO_LAATTATUNNISTE` `i` → `20260920i`.
- `sw.js`: `LAATTAKANSIO` ja `LAATTAKANSIO_SYVA` samaan.
- `tests/pallo.test.mjs`: kansio- ja laattaosoiteväitteet uuteen sarjaan.

Tunniste on `20260920i` eikä `2026-09-20-i`, koska
`tools/tee-pallolaatat.mjs` hyväksyy vain a–z ja 0–9.

**Peli ei näe uutta pohjaa ennen kuin pyramidi.json on ämpärissä.** Vie
luettelo vasta kun tämä committi on mainissa, muuten luettelo lupaa
laattoja versiolle, johon koodi ei osoita.

## Skriptikorjaukset (tools/polta-paikallisesti.sh)

Kolme vikaa, jotka kaikki löytyivät tämän ajon aikana:

1. **Hahmotelmat poltettiin laattaan.** Skripti ei maininnut
   hahmotelmia lainkaan, joten ensimmäinen nostotasoajo poltti ne mukaan
   ja koko versio oli kelvoton. Nyt `--ilman-hahmotelmia` on OLETUS ja
   hahmotelmien poltto vaatii `--hahmotelmat`.
2. **Tyhjä maa luettiin kaatumiseksi.** BEL, LUX, MLT, SVK ja SVN ovat
   hahmotelmamaita, joilla ei ole yhtään poltettavaa nostoa;
   generaattori poistuu niillä koodilla 1. Se pysäytti koko ajon ennen
   luetteloa ja pallosarjaa. Nyt "maalla ei ole poltettavaa nostoa" on
   onnistuminen.
3. **Luetteloa ei voinut koota viemättä sitä.** `--ei-luetteloa` jättää
   koko vaiheen väliin ja `--ei-vie` estäisi myös laattojen viennin.
   Uusi `--ei-luettelovientia` kokoaa luettelon mutta jättää julkaisun
   erilliseksi teoksi.

Lisäksi aiemmin korjattu `--koe`, joka kuoli aina SIGPIPEen.

## Velkaa (en korjannut tässä)

- **Nostoajon luettelovaihe kirjoittaa pohjan kentän.** Nostotasoajo
  asetti `pohja.rantaviiva: true`, vaikka pohja oli poltettu ilman
  rantaviivaa; jouduin kokoamaan luettelon vielä kerran oikeilla
  lipuilla. Nostoajo ei saisi koskea pohjan kenttiin lainkaan.
- **Valmis-merkinnät eivät tunne versiota.** Shardin merkintä on
  `lokit/<shardi>.valmis`, joten uusi versio ohitti kaikki 234
  nostoshardia "valmiina" — se olisi julistanut vanhat laatat uudeksi
  versioksi. Kiersin `--uudestaan`-lipulla. Merkintään kuuluisi versio.
- **`yhdista-nostoluettelo.mjs` esti pallovaiheen** ("pohjan versio
  eroaa: ämpärissä 2026-09-07a"). Vahti on oikea, mutta se ei tunne
  tilannetta, jossa pohja on tarkoituksella uusi ja julkaisematon.
  Ajoin pallosarjan erikseen omalla luettelollamme.
- **Pallosarjan oletus on nostojen kanssa.** Tuotanto käyttää sarjaa
  ilman nostoja (`PALLO_SARJASSA_NOSTOT = false`), joten `--pallo`
  yksinään tuottaa väärän sarjan. Fablen päätös: oletus muutetaan.

Roskaksi jääneet kansiot `2026-09-20-nostot` ja
`2026-09-20-pohja-nostot-20260920i` poistettiin ämpäristä omistajan
päätöksellä 20.9.2026 klo 05.12.
