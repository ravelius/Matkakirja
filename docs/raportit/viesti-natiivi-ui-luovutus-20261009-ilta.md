# Natiivi-UI: luovutus 9.10.2026 ilta (kontekstin nollaus, PT:n käsky)

Työtila: proto-worktree /Users/Shared/Claude/wt/proto-natiivi-ui-olavpeli (nykyinen haara natiivi-ui/pallo-katselmointi),
web-checkout /Users/Shared/Claude/Matkakirja-natiivi-ui (haara natiivi-ui-luovutus-20261005, vain raportit). Muistio: muisti
natiivi-ui-tila-20261009.md.

## Juna 172 (Natiivisepällä)

- natiivi-ui/katalogikuvat **e7c7474d2**: katalogin havainnekuvat (yökartta, maapallon vuosi, tavli -v2), varustekuvien foto-minit
  erä 1 (0f2a2cec1), luentavienti kaikki kaupunki- ja maalehdet + @etusivu (1e3e247df, c59a4d53c), `ui puluvienti` (16f5c9f14),
  kuvasuurennos kuvat-2048 (e7c7474d2).

## Juna 173 (Natiivisepällä, ketjussa päällekkäin; uusin kärki 064b5a7f7 sisältää kaiken)

| SHA | Haara | Sisältö |
|---|---|---|
| 80625b5c2 | natiivi-ui/pulu-valmiit | Pulun valmiit vastaukset (Peli/PuluValmiit, UI/Pulu/PuluValmiitLataus, PuluChat, Nostokortti) |
| 8e7b0a8bb | natiivi-ui/varustekuvat-foto-2 | varustekuvien fotot erä 2 (20 linssiä ja peliä, mini + iso) |
| c3270b673 | natiivi-ui/nyt-rivi | NytRivi (Pariisin intron nyt-rivi; LS1 kytki e72956ff3) |
| 38ec50e9f | natiivi-ui/nyt-rivi | Pulun valmiit: koko FRA testiin, jäsennys taustasäikeessä |
| f6af5f0a8 | natiivi-ui/nyt-rivi | testipaketti Sisältökirjurin korjaamaksi (295 + 654) |
| a2ae61457 | natiivi-ui/pallo-katselmointi | OpasValikko leveys turva-alueeseen, .mk-saadin min-width 96 |
| 064b5a7f7 | natiivi-ui/pallo-katselmointi | metrolinjan kauempien asemien peitto 0,6 → 0,85 |

## Pulun valmiit vastaukset

- Ranska ämpärissä (14.34): pulu/vastaukset/v1/FRA.json + maat.json (versio 202610091132). Natiivi hakee FRA.json?v=<versio>.
- Web-haara pulu-ranska-pilvi (caea0c2cd): GENEROINTI.md, tools/pulu-esigenerointi/ (valmistele, tarkista-era, koosta, lataa-data).
- PuluValmiitLataus.LiveVainKehittajalle = false, kunnes koko Eurooppa on valmis (PT 9.10.).
- Muut maat vasta omistajan päätöksellä (pilviajo Sonnet effort low; Ranska 40 min, 3,1 M tokenia).

## Odottaa

- Tähtien (tahdet) ja ihmisen matkan (ihmisen-matka-2) foto-uusinnat Sisältökirjurilta → vaihda Linssivalitsin.FotoMinit/FotoIsot
  uusiin avaimiin (-v3 tms.), tarkista 200 R2:ssa ennen kytkentää.
- Pallon UI-katselmoinnin laitetodennus TF 173:lla: iPhone pysty Kysy oppaalta -lista ei leikkaudu, mikserin urat näkyvät,
  metrolinjan rivit luettavat yöllä ja päivällä. Skenaario: scratchpad sk-pallo-ui.txt ja sk-pallo-mikseri.txt (kopio
  todisteissa proto-3d/lokit/todistus-pallo-ui-*-20261009-15xx/). Mikseri avataan `ui valikko` → Mikseri (ei `ui mikseri`,
  joka on linnan vanha paneeli). Simuvuoro Julkaisijalta.
- Nyt-rivin paikka introssa: LS1:n iPad-vaaka-kuva-arkki (lupasi lähettää).

## Omat ajot

Ei käynnissä olevia ajoja, käännöksiä eikä simulaattoreita (molemmat vapautettu Julkaisijalle 15.13).
