# Ehdotus: maaston offline-koon pienentäminen (Siirtoseppä, 27.9.2026)

Fablen tilaus 27.9.: Euroopan offline-latauksen maasto (quantized-mesh, poltto `2026-09-23b`) on liian iso. Tässä on
vaihtoehdot ja koot. Toteutusta ei aloiteta ennen päätöstä.

## Lähtötilanne (mitattu)

Laatta-agentti haki Euroopan kaikki 96 811 maastolaattaa ämpäristä 27.9. (kaikki 200). Levyllä laatat ovat purettuina,
koska iOS purkaa gzipin latauksessa (Natiiviseppä). Siirrossa ne ovat gzip-pakattuina, noin 0,43 × purettu koko.

| Taso | Laattoja | Purettu Mt | Kertymä purettu | Kertymä siirto (gzip) |
|---|---:|---:|---:|---:|
| z0–z8 | 11 323 | 9 | 9 | 4 |
| z9 | 1 120 | 17 | 26 | 11 |
| z10 | 4 162 | 75 | 101 | 44 |
| z11 | 16 223 | 365 | 466 | 201 |
| z12 | 63 983 | 1 718 | **2 184** | **939** |

Taso z12 on 79 % koko maastosta. Siitä suurin osa on Ranskaa (0,97 Gt), Espanjaa, Saksaa, Italiaa ja Sveitsiä, eli
maita, joissa maasto on poltettu tarkimmalle tasolle. Natiivi käyttää maastoa tasolle 12 asti
(`KarttaKerrokset.cs`, layer.json maxzoom 12). Verkossa pelatessa mikään vaihtoehdoista ei muuta mitään: maasto haetaan
yhä tarkimmalla tasolla. Vaihtoehdot koskevat vain offline-latausta.

## Vaihtoehdot (Eurooppa, 47 kaupunkia ilman merentakaisia alueita)

| # | Vaihtoehto | Levy | Siirto | Säästö | Mitä offline-pelaaja menettää |
|---|---|---:|---:|---:|---|
| 0 | Nykyinen (koko maa z12 asti) | 2 184 Mt | 939 Mt | – | – |
| A1 | Tasoraja z11 koko maassa | 466 Mt | 201 Mt | −79 % | vuorten tarkin muoto lähellä maata |
| A2 | Tasoraja z10 koko maassa | 101 Mt | 44 Mt | −95 % | lähikuvan maastomuoto kaikkialla |
| B1 | Koko maa z10 + z11–z12 kaupunkien ympärillä 50 km | 218 Mt | 94 Mt | −90 % | tarkka maasto kaupunkien ulkopuolella |
| B2 | Koko maa z10 + z11–z12 kaupunkien ympärillä 25 km | 128 Mt | 55 Mt | −94 % | kuten B1, suppeammin |
| B3 | Koko maa z10 + z11–z12 kaupunkien ympärillä 100 km | 518 Mt | 223 Mt | −76 % | vähän |
| B4 | Koko maa z9 + z10–z12 kaupunkien ympärillä 50 km | 147 Mt | 63 Mt | −93 % | z10 kaupunkien välissä |
| C | Laatat levylle gzip-pakattuina (natiivi purkaa luettaessa) | = siirto | ennallaan | levy −57 % | ei mitään (vaatii natiivimuutoksen) |

Vaihtoehto C yhdistyy muihin: esimerkiksi B1 + C on levyllä noin 94 Mt ja siirrossa 94 Mt.

Muita keinoja arvioin pienemmiksi tai riskisemmiksi:

- Laattojen uudelleenkoodaus ilman laajennuksia (normaalit, vesimaski) tai tarkkuuden karsinta (mesh-simplify) vaatii
  uuden polton, eli Karttasepän työtä, ja säästö on arviolta 20–40 %. Tätä en ole mitannut.
- Brotli gzipin sijaan säästäisi siirrossa noin 10–15 %, mutta Cloudflaren ja iOS:n tuki pitää todentaa.

## Suositus

**B1 + C:** koko maa tasolle z10 ja z11–z12 vain 50 km:n säteellä pelin kaupungeista (sama periaate kuin rasterin
z9/z10 `kaupunkiRasteri`, skeema 1.51), ja natiivi säilyttää laatat levyllä gzip-pakattuina. Euroopan maasto pienenee
siirrossa 939 → 94 Mt ja levyllä 2,18 Gt → noin 94 Mt (ilman C:tä 218 Mt). Pelaaja näkee kaupungeissa ja niiden
ympäristössä saman tarkan maaston kuin verkossa. Kaupunkien välillä maasto on tasolla z10 (laatta noin 20 km),
mikä riittää pallolla ja maakunnan korkeudelta.

Jos C:tä ei haluta natiiviin, **B1 yksin** on levyllä 218 Mt ja siirrossa 94 Mt.

## Toteutus päätöksen jälkeen (arvio)

- **Siirtoseppä:** `offline.json`:ssa `maat.*.maasto` rajataan tasolle z10, ja uusi avain `maat.*.kaupunkiMaasto`
  { "11": [[x0,y,x1,y],…], "12": … } sisältää vain kaupunkien ympäristön. Tämä on skeema 1.53, ja
  `tavuja.maasto`/`levy` päivittyvät. Vanhat buildit lataavat pienemmän `maasto`-kentän, eivätkä ne tunne uutta avainta.
  Offline-tilassa ne saavat siis vain z10-tason, mikä on hyväksyttävä heikennys; tämä pitää vahvistaa Natiivisepältä.
  Työtä noin 2–3 h testeineen.
- **Natiiviseppä:** `kaupunkiMaasto`-luku (kuten `kaupunkiRasteri`) ja vaihtoehdossa C gzip-tallennus.
- **Karttaseppä:** ei polttoa. Kaikki tasot ovat jo ämpärissä.
