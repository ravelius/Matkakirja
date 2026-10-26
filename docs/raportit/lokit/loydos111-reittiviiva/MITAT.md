# Löydös 111 — matkareittien musteviivan mitat (WEB ON MALLI, mitattuna)

Mittaus tehty 2026-09-25 tuotannosta (`https://matkakirja.app/?lauta=pallo&koe=suoraan`,
Playwright + Chromium, `--use-angle=metal`), pallolaudalta. Kaupunki **Ateena**
(sama kuin natiivin vertailukuvissa). Ei koodimuutoksia repoon, ei pushia,
ei simulaattoreita.

## Juurisyy: miksi tools/pariteettikuvat.mjs:n 'liiku'/'noppa-siirtolista' -kuvissa
reittiviivat eivät näkyneet

Ei ajoitusongelma. `tools/pariteettikuvat-nakymat.mjs` avaa liuskan suoraan
`ui.liukuAuki = true; ui.render()`. Tämä EI aseta `ui.matkaSessio`-kenttää,
ja `ui.matkareittienValinta()` (js/ui.js ~7897) palauttaa tyhjän
`reittiTunnukset`-listan aina kun `matkaSessioKesken()` on epätosi — eli
reittidataa ei koskaan laskettu pathsDataan, riippumatta odotuksesta tai
pakotetusta piirrosta. Ainoa tapa, joka asettaa `matkaSessio`n, on
`ui.vaihdaLiuku()` (js/ui.js ~12090-12115), jota nykyinen savuke ei kutsu.
Tässä mittauksessa käytetty skripti kutsuu oikeaa `ui.vaihdaLiuku()`-metodia,
minkä jälkeen reitit piirtyvät pallolle normaalisti (ei tarvinnut pakottaa
lepopiirtoa hereille — `pallo.__piirto.tarvitaan()`/manuaalinen
`renderer().render()` lisättiin silti varmuudeksi ennen jokaista kuvaa).
Tämä on erillinen, koodikorjausta vaativa löydös — ei osa tätä
mittaustehtävää eikä koodia muutettu.

## Mittausmenetelmä

- Ruutukaappaukset: `viewport 393×852 dpr 3` (iPhone) ja `834×1194 dpr 2`
  (iPad 11"), kaksi näkymää (`liiku` = naapurireitit ennen heittoa,
  `noppa` = liftaus heitetty, kantamakaaret) × kaksi zoomia (`saapumis` =
  pelin oma kamera, `lahella` = sama lat/lng, altitude × 0,4).
- Musteviivan (ja varjon) leveys mitattu pikseliprofiililla kohtisuoraan
  viivaa vasten: rivi/sarake-skannaus kapeassa ikkunassa viivan odotetun
  x-paikan ympärillä (jotta maaston piirretyt korkeuskäyrät eivät sotke
  mittausta), korjattu viivan kulmalla pystystä (`leveys_mitattu × cos(kulma)`).
  Mitattu **meren** (avoin, tasainen tausta) yli, koska maan hachures
  (korkeuskäyrät, varjostus) tekevät automaattisesta reunantunnistuksesta
  epäluotettavan; koodin mukaan paksuus on sama vakio kaikille pelin
  reiteille riippumatta maa/meri-väristä (`pathStroke` sama accessor).
- Askelhelmen halkaisija ja reunan paksuus mitattu suoraan pikseliprofiililla
  helmen keskeltä.
- Väri luettu ydinviivan keskipikseleistä usealta riviltä, verrattu
  laskennalliseen sekoitukseen (tausta × (1−α) + reittiväri × α).

## Tulokset — WEB (pallo, tuotanto)

| Suure | iPhone 393×852 dpr3 | iPad 834×1194 dpr2 | Koodin arvo (CSS px) |
|---|---|---|---|
| Ydinviiva (musteviiva) | 8,2 laitepx → **2,73 CSS px** | 5,2 laitepx → **2,6 CSS px** | `MATKAREITIN_PAKSUUS_PX` 2,5 |
| Varjo (koko leveys, sis. ydin) | 11,8 laitepx → **3,93 CSS px** | ~7,5 laitepx → **3,75 CSS px** | `MATKAREITIN_VARJON_PAKSUUS_PX` 4 |
| Askelhelmen ulkohalkaisija | 44 laitepx → **14,7 CSS px** | – (ei mitattu erikseen, sama geometria) | `REITTIHELMEN_HALKAISIJA_PX` 15 |
| Askelhelmen reunan paksuus | 6 laitepx → **2,2 CSS px** | – | `REITTIHELMEN_REUNA_PX` 2,2 |
| Meriviivan väri (mitattu keskeltä) | rgb(150,151,147) | rgb(153,159,159) | ennuste rgba(61,85,112,0,42) taustan päällä ≈ (146,152,153) — **osuu** |
| Maaviivan väri (mitattu keskeltä) | rgb(165,168,155) | – | ennuste rgba(74,58,36,0,42) taustan päällä ≈ (167,153,120) — sinivihreä kanava hieman ennustettua korkeampi (varjokerroksen vaikutus todennäköinen) |
| Katko/väli (yksi näyte, ei vakio) | dash≈13,5 CSS px, väli≈9,5 CSS px (iPad-näyte) | | jakso on ASTEYKSIKKÖ (`MATKAREITIN_KATKO_AST` 0,16°) — CSS-px-pituus **vaihtelee zoomin ja reitin sijainnin mukaan**, ei ole kiinteä pikselimitta kuten leveys |

Tärkeä koodihavainto (js/pallolauta/reitit.js rivit 34-47, kalibroitu
Chromiumilla 5.9.2026): reitti piirretään Globe.gl:n Line2-geometrialla,
jonka `resolution` on kotelon koko **CSS-pikseleinä** eikä laitepikseleinä,
joten leveys pysyy samana CSS-pikselimääränä kaikilla dpr-arvoilla JA
kaikilla kamerazoomeilla (ruutuavaruuden viiva, ei maailma-avaruuden).
Mittaus vahvistaa tämän: iPhone (dpr 3) ja iPad (dpr 2) antavat lähes saman
CSS-px-leveyden sekä `saapumis`- että `lahella`-zoomilla.

## Tulokset — NATIIVI (iPhone 402×874 dpr3, liftaus Ateenasta)

Kuvat: `koodikorjaukset-natiivi/a9-noppa-lepo.png` (kantamakaari, liftaus
heitetty — sama pelitilanne kuin webin `noppa`-näkymä) ja
`b22-lentolista.png` (lentokaari — eri visuaalinen elementti, katso alla).

| Suure | a9 (liftauksen kantamakaari) |
|---|---|
| Ydinviiva | 7,5 laitepx → **2,5 CSS px** |
| Varjo/halo | **ei havaittu** — reuna on pehmeä antialiasoitu liuku suoraan taustaan, ei erillistä vaaleampaa uomaa |
| Askelhelmen ulkohalkaisija | ~50 laitepx → **16,7 CSS px** (karkea, ei täysin keskeltä mitattu) |
| Askelhelmen reunan paksuus | ~8 laitepx → **2,7 CSS px** |
| Ydinviivan väri (mitattu) | rgb(189,178,148) taustalla rgb(219,206,172) |
| Arvioitu alfa (olettaen sama pohjaväri kuin webin maareitti, rgb 74,58,36) | **≈ 0,19–0,21** — noin PUOLET webin 0,42:sta |
| Katko/väli (yksi näyte) | dash≈8–11 CSS px, väli≈7,9 CSS px — samaa suuruusluokkaa, karkea mittaus |

`b22-lentolista.png` näyttää eri elementin (lentokaari/matkan jälki pallon
ympäri, punainen, tiheä hammastettu katko) — se ei ole sama piirtäjä kuin
naapurireitti/kantamakaari, joten sitä ei verrata suoraan tässä taulukossa;
suurennos silti tallennettu (`suurennos-natiivi-b22-lentokaari-3x.png`).

## Johtopäätös

**Ydinviivan GEOMETRINEN leveys on lähes identtinen webissä ja natiivissa**
(~2,5–2,7 CSS-ekvivalenttipikseliä molemmissa) — tämä EI ole pääsyy siihen,
että omistaja näkee webin viivan paksumpana. Kaksi mitattua eroa selittävät
sen:

1. **Web piirtää ~4 CSS px levyisen vaalean varjon/halon** ydinviivan
   ympärille (`MATKAREITIN_VARJON_PAKSUUS_PX`), natiivissa tätä ei ole
   lainkaan — pelkkä pehmeä antialiasointi. Tämä lähes KAKSINKERTAISTAA
   webin viivan silmämääräisen leveyden natiiviin verrattuna.
2. **Webin väri on peittävämpi**: alfa 0,42 (koodivakio, mittaus vahvistaa)
   vs. natiivin arvioitu ~0,19–0,21 — noin puolet. Natiivin viiva jää siksi
   haaleammaksi/ohuemman näköiseksi vaikka ydinleveys on sama.

## Suositus Natiiviseppälle (Viiva.shader `_Paksuus` × `_Kerroin`, 0,75 px AA,
Reitit.cs, ReittiMitat.cs)

- Jos tavoite on **natiivi näyttämään kuten web** (paksumpi, kontrastisempi
  + näkyvä halo): nosta alfa ~0,4:ään ja lisää erillinen vaaleampi
  halo-passi ~4 CSS px leveänä ydinviivan alle — ydinviivan `_Paksuus` voi
  pysyä nykyisellään (2,5 CSS px vastaa jo mitattua natiivia).
- Jos tavoite on päinvastainen (**web kevyemmäksi, natiivin näköiseksi** —
  vaikuttaa omistajan kommentista todennäköisemmältä, koska hän piti webin
  linjaa liian paksuna): tämä on web-puolen muutos (`MATKAREITIN_VARJON_PAKSUUS_PX`
  pienemmäksi/pois ja/tai alfa alemmas) eikä kuulu tähän mittaustehtävään —
  vain kirjattu tiedoksi Pelikoodarille/Fablelle päätöstä varten.
- Askelhelmen koko on jo lähellä paritettia (15 vs. ~17 CSS px) — ei
  kiireellinen.
- Katko/väli on webissä ASTEYKSIKKÖ (osuus reitin pituudesta), ei kiinteä
  ruutupikselimitta — tarkista `ReittiMitat.cs` käyttääkö se maailma-avaruuden
  (asteet/metrit) vai kiinteää ruutupikseliväliä; jos halutaan sama rytmi
  kuin webissä eri zoomeilla, sen pitää skaalautua reitin geometrisen
  pituuden mukaan, ei ruudun mukaan.

## Tiedostot

Kansio: `/Users/Shared/Claude/proto-3d/lokit/loydos111-reittiviiva/`

- `liiku-saapumis-{iphone,ipad}-*.png` / `.json` — naapurireitit, pelin oma
  kamera (pov tallennettu JSONiin: lat 38,325 lng 23,741 altitude 0,146)
- `liiku-lahella-{iphone,ipad}-*.png` / `.json` — sama, altitude × 0,4
- `noppa-saapumis-{iphone,ipad}-*.png` / `.json` — liftaus heitetty,
  kantamakaaret, pelin oma kamera
- `noppa-lahella-{iphone,ipad}-*.png` / `.json` — sama, lähempi zoomi
- `ajo-yhteenveto.json` — koko ajon yhteenveto (polkumäärät, keskipisteet)
- `suurennos-web-iphone-saapumis-meri*.png` — mittauskohta (meri, iPhone)
- `suurennos-web-ipad-saapumis-meri-3x.png` — mittauskohta (meri, iPad)
- `suurennos-web-iphone-lahella-maa-4x.png` — mittauskohta (maa, lähizoomi)
- `suurennos-web-iphone-askelhelmi-4x.png` — askelhelmen mittauskohta
- `suurennos-natiivi-a9-meri-5x.png` — natiivin mittauskohta (kantamakaari)
- `suurennos-natiivi-a9-askelhelmi-3x.png` — natiivin askelhelmen mittauskohta
- `suurennos-natiivi-b22-lentokaari-3x.png` — natiivin lentokaari (eri elementti, ei suoraan verrattu)

Natiivin lähdekuvat (ei kopioitu, alkuperäiset):
`/Users/Shared/Claude/proto-3d/lokit/liikkuminen-pariteetti/koodikorjaukset-natiivi/a9-noppa-lepo.png`
ja `b22-lentolista.png`.

## Varaumat

- Pikselimittaukset ovat käsin valittuja, puhtaita (hachureettomia) kohtia
  yhdestä tai kahdesta näytteestä per suure — ei tilastollista otantaa koko
  reitin matkalta. Ydinviivan ja varjon leveys sekä väri/alfa ovat
  luotettavimmat luvut (toistettu kahdella dpr:llä, samat tulokset).
  Askelhelmen ja katko/välin luvut ovat karkeampia (yksi näyte, käsin
  rajattu keskikohta).
- Natiivin alfa-arvio (0,19–0,21) olettaa saman pohjavärin kuin webin
  maareitillä (rgb 74,58,36) — jos natiivi käyttää eri sävyä, todellinen
  alfa voi poiketa; itse mitattu RGB (189,178,148) taustalla (219,206,172)
  on silti suoraan luotettava havainto riippumatta oletuksesta.
