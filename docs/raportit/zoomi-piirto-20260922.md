# Ranska z6 zoomin "piirto"-kehykset: mittari ja kokeet (Pelikoodari 22.9.2026)

Lähtökohta: Laitetestaajan iPhone (docs/raportit/sulavuus-liikevara-iphone-20260922.md,
haara laitetestaaja): porras 4 Ranska zoomi p95 18 ms, **porras 6 (tuotanto) p95 50 /
max 194 ms**, pisimmät kehykset ilman laskurimuutosta ("piirto"). Ero syntyy siis
portaiden 4 → 6 välissä (CSS2D-kohteet, pulu, ui, äänet), ei laatoissa — laatat ovat
mukana jo portaalla 1 (p95 17–31).

## Mittari

`tools/savukkeet/mittaa-zoomipiirto.mjs` (Chromium `--use-angle=metal` + CDP-profiloija
250 µs, tai WebKit) ja sivun sisäinen `js/pallolauta/kehysprofiili.js`
(`__kehysprofiili.aloita()/lopeta()/teksti()`, asentuu kun `?kerrokset=` tai `?koe=`
on osoitteessa). Jokainen kehys jaetaan kahtia: **varattu** = rAF:n alusta pääsäikeen
vapautumiseen (MessageChannel-viesti ajetaan tyylin, asettelun ja maalauksen jälkeen),
**vapaa** = dt − varattu (GPU/vsync-odotus). Pitkistä kehyksistä (> 25 ms) raportoidaan
varatun osuus, absoluuttiset laskurit (drawcalls, kolmiot, laattoja scenessä, häipyviä)
ja Chromiumilla profiloijan self-aika funktioittain kutsupolulla.

## Kokeet (`?koe=a,b`, toimivat myös laitepalvelimen kautta)

Laatat (js/pallolaatat.js `laattakerroksenKokeet`): `aniso1` (anisotropia 1), `eimip`
(ei mipmappeja), `silmat40` (verkko ≤ 40 × 40), `eihaive` (ei häivettä, ei kahta kerrosta
päällekkäin), `vientilepo` (tekstuurien vienti vain levossa; pallo.js antaa kerrokselle
kameran liiketiedon `paivita(kehys, true, { liike })`).
DOM-kerrokset (js/pallolauta/kerrokset.js `asennaPiirtokokeet`): `eiliike`
(.pallolauta-liike: sävy, pilven varjo, ylilentävä pulu), `eiblend` (sävyn ja pilven
mix-blend-mode normal), `eikasvot` (Pulun SVG), `eipollo` (nappi + kasvot), `eicss2d`
(CSS2D-kerros), `leijuvanha` (Pulun leijunta vanhalla tavalla, ks. alla).

## Tulokset Macilla (390 × 844 dpr 3, Ranska z6 zoomi, porras 6)

- Chromium CPU 4×, pitkien kehysten varattu-osuus 30–55 %: pääsäie on vapaana noin
  puolet pitkästä kehyksestä → osa on aidosti GPU/komposiittori-odotusta.
- Profiloijan pääsäikeen työ pitkissä kehyksissä: `(program)` (selaimen natiivi:
  tyyli/asettelu/maalaus/WebGL-synkronointi) suurin; sitten `texSubImage2D` (laatan
  vienti, 2–3 ms/kehys), `getImageData`/`maalaaKermaMaamaskilla` (laatan valmistelu
  liikkeessä), `getBoundingClientRect ← livia-eleet sijoita` ja `paint livia-svg`
  (Pulun leijunta: koko SVG innerHTML:llä 30 Hz kartan liikkuessa).
- **Yksikään laattakoe ei muuttanut p95:tä** headless WebKitillä (perus 37, aniso1 43,
  eimip 35, eihaive 41, vientilepo 39 — kohina ±5). Edes ilman yhtään tekstuurin
  vientiä ja häivettä (vientilepo: häipyviä 0) zoomi ei nopeutunut → laattatekstuurit
  eivät ole Macilla pullonkaula.
- DOM-kerroskokeet (eiliike, eiblend, eikasvot, eipollo, eicss2d) olivat Macilla
  kohinan sisällä (p95 39–60 samalla asetuksella eri ajoissa; koneen kuorma 4–25).
  **Macin headless-mittaus ei erota näitä** — ratkaisu vaatii laitteen.

## Tehty korjaus: Pulun leijunta paikataan, ei rakenneta (js/livia-svg.js `paikkaa`)

Kartan liikkuessa Pulu leijuu (mapHover) ja `paint` rakensi koko SVG:n innerHTML:llä
joka 32 ms + `sijoita()` pakotti asettelun (`getBoundingClientRect`). Nyt kun vain
leijunnan vaihe muuttuu (korkeus 1, muu asento sama), päivitetään linnun ja siipien
`transform`-attribuutit paikalleen eikä asettelua lueta; koko kuva rakennetaan vasta
kun asento vaihtuu. Profiloijassa livia-rivit katosivat pitkistä kehyksistä; p95-vaikutus
mitataan laitteella (`?koe=leijuvanha` = vanha tapa vertailuksi).

## Pyyntö Laitetestaajalle (iPhone, porras 6, Ranska z6 zoomi)

Sama menetelmä kuin ennen, osoitteeseen `&koe=<nimi>`; tulos `__kehysprofiili.teksti()`
näytölle. Ajot: perus, leijuvanha, eikasvot, eipollo, eiliike, eiblend, eicss2d,
vientilepo, eihaive, aniso1. Kaksi toistoa kohdalta jos mahdollista. Kiinnostavin luku:
p95 ja pitkien kehysten varattu-osuus — jos osuus on pieni (< 40 %) ja jokin
DOM-koe (eiliike/eiblend/eicss2d) pudottaa p95:n, syy on komposiittorissa (esim.
mix-blend-mode WebGL-kankaan päällä pakottaa erillisen sekoituspinnan joka kehyksellä).
