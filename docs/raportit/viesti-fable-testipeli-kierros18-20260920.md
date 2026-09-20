# Testipeli, kierros 18 — v1973 (20.9.2026 klo 8.17–8.38)

Laite: iPhone-simulaattori (402 pt; screenshot 920 px = 2,289 px/pt, jpg-kaappaus 414 px ≈ 1,03 px/pt). Tuotanto **v1973** (☰-valikossa "v1973 · kehittäjä"). Maailma PÄÄLLÄ 8.25–8.37, **POIS 8.37 (vahvistettu ratasvalikosta)**, äänet pois. Kaappaukset: `docs/raportit/kaappaukset/kierros17-20260920/` (`k18-*`, `kbh-*`, `tal-*`, `pulu-*`).

## Tulokset
| Kohta | Tulos |
|---|---|
| **Seinen ja Loiren mutkat (peli-/maalehden kartta)** | **Ranskan pelikartalla ei näy jokiviivoja lainkaan** millään zoomilla (`k18-loire-1/2`, `k18-i`): vain nimiö "Loire ≈" ja jokisymboli, ei viivaa; Seinestä ei nimiötäkään Pariisin lähellä. Maalehden kartta (Ranska → "Kaupungit ja maasto kartalla") on **rasterikartta** (Eric Gaba, Wikimedia Commons): joet näkyvät ohuina rasterin osana, ei piikkejä (`k18-g`, `k18-h`, Kokoruutu + / − toimii). Jos "mutkat maalehden kartalla" tarkoittaa jokiviivoja pelikartalla, ne puuttuvat. |
| **Gironden rannikko lähizoomilla** | **Yhä kaksinkertainen** (`k18-gir-7`): paksu ruskea viiva seuraa suistoa mutkitellen, mutta merialueen täyttö ja ohut rantaviiva ovat erillään suorana (~ 30 px vasemmalla). Sama kuin v1971/v1972. Espanjan kartalla rannikko on yksi viiva. |
| **Ranskan väritaso** | Pelikartta on beige/keltainen korkeuskarttapohja; **vihreää väritasoa ei näy** (`k18-b`). Maalehden rasterikartta on värillinen (vihreä/sininen). En tiedä, kumpaa tarkoitetaan. |
| **Pallonäkymä (Maailma päälle)** | Latautuu heti (kuvat 1–5 kaksi sekuntia pinch-outin jälkeen), pallo näkyy Euroopan kohdalla, Ranska korostettuna ruskealla ääriviivalla. **Pyörii pyyhkäisystä** (yksi swipe 130 pt kierti ≈ 50°). **Ei pyöri itsestään** (kolme kaappausta 4–5 s välein identtiset). Maailma sen jälkeen pois: OK. |
| **Kööpenhaminan nostot** | Saapuminen ok (postikortti "Kööpenhamina, 1873. Orkesteri sai odottaa omassa tahdissaan.", "Ohita" ei tarvittu). **Frederiksborgin linna**: tekstinosto (ei kuvaa), LISÄÄ ok, pulu-kysymykset, arvonimi **"Jules Vernen neuvonantajalta"** (DNK Frederiksborg). Pulun vastaus asiallinen (J. C. Jacobsen, Carlsberg). Muita Kööpenhaminan nostoja (Roskilde, Kronborg, Trelleborg) en avannut. **Vika: Tanskan ääriviiva näyttää kaukokuvassa paksulta mustalta möykyltä** (`k18-tal-1`, `k18-tal-2`) — rannikko/saaret piirtyvät tiheinä paksuina viivoina. Sama Viron kartalla (`k18-bry-nav`). |
| **Tallinnan nostot** | Saapuminen ok (postikortti "Reval, 1873. Apteekkari sai suuremman palan Soomaan."). Padisen luostari: kuva ok (kivimuurit, torni), LISÄÄ ok, pulu-kysymykset, arvonimi **"Pariisin salonkien pöllöltä"** (EST Padise) — **väärän maan nimi** (sama kuin Fablen mainitsema Rumšiškės-vika, ei vielä korjattu tässä nostossa). Muita Tallinnan nostoja en avannut. |
| **Brysselin kohdekartta (Nähtävyydet)** | **Toimii:** shakkinappula → liuska "Bryssel / **Nähtävyydet** / Turistiopas / Kulttuuri ja ruoka (1)". Nähtävyydet avaa sivun "NÄHTÄVYYDET": OSM-pohjakartta (500 m -mittakaava, "© OpenStreetMap-tekijät (ODbL)") + **numeroympyrät 1–7** + Kokoruutu-nappi + esittelyteksti Grand-Placesta. Numero 1 → kortti **"Brysselin pörssi"** (kuva, Wikipedia-teksti, "Lähde: Wikipedia (CC BY-SA) — lue artikkeli", pulu ja Sulje) (`k18-bry-nahtavyydet`, `k18-bry-numero1`). **Huomio:** pörssin tekstissä "22. syyskuuta 2000 … Euronext … Lissabonin pörssi 2002" — nykyaikaista, vaikka pelin vuosi on 1873; ehkä tarkoituksellinen "nykyisin" -teksti. |
| **Ljubljanan kohdekartta** | **Toimii:** liuska "Ljubljana / Nähtävyydet / Turistiopas / Historia (1)". Nähtävyydet-sivun OSM-kartta: **numeroympyrät 1–8**; **3 ja 4 sekä 7 ja 8 osuvat osittain päällekkäin** (`k18-lju-nahtavyydet`). Numero 1 → "Tivoli-puisto", "KOHDE 1 · 1813", kuva (Tivolin puiston näkymä n. 1855), historiaa (`k18-lju-numero1`). |
| **Pulun kuvakortti ("Avaa juttu")** | **Ei löytynyt:** pulun vastaukset Frederiksborgista (`pulu-kortti-b`) ja aiemmin Ochtinskásta/Dubaista näyttävät tekstiä ja pienen kuvan, mutta "Avaa juttu" -nappia en nähnyt. En tiedä, missä tilanteessa kortti ilmestyy — kerro kysymys/kohde. |

## Muut havainnot
1. Ljubljanan nostojen (Idrija, Tivoli) tekstit ja Ljubljanan/Brysselin Nähtävyydet-sivut latautuivat sujuvasti (1–2 s).
2. Vahinko-hyppy: pari tapia osui Barcelona-merkkiin/liuskan kohtiin — ei vaikutusta havaintoihin.
3. Pulun kupla: v1971:ssä havaittu istuntokeskustelujen vuoto Ljubljanassa → **ei tarkistettu v1973:lla**.

## Ei ehditty
Kööpenhaminan muut nostot, Tallinnan muut nostot, Brysselin numerot 2–7 ja Ljubljanan numerot 2–8, Kokoruutu-tila Nähtävyydet-kartalla, pulun kuvakortti ("Avaa juttu").
