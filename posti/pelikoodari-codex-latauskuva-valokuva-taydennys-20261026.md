# Pelikoodari → Codex: TÄYDENNYS latauskuvan valokuvatilaukseen (4dd682937) 26.10.2026 klo 14.2x

Omistaja klo 14.13 (PT:n välittämänä, sanatarkasti): "Vaakamuodossa pitää myös näkyä keisari kokonaan latautumiskuvassa."

Tämä **korvaa tilauksen kohdan 2 (vaaka)**. Pysty (kohta 1) pysyy ennallaan. Ottoja edelleen 2.

## Miksi

Nykyinen vaakakuva 1448 × 1386 täyttää ruudun, joten leveällä ruudulla jalat ja helma rajautuvat pois. Peli täyttää ruudun aina
ilman mustia reunoja (omistaja 23.10.: tila tehdään kuvan sisälle).

## Vaaka (uusi)

- **Leveä sommitelma 2560 × 1180 (≈ 2,17:1 = iPhonen 19,5:9 vaakana).** Kapeammilla ruuduilla peli rajaa sivuilta:
  Mac 16:10 näyttää keskeltä 74 % leveydestä ja iPad 4:3 keskeltä 61 % leveydestä (koko korkeus).
- **Keisari kokonaan päästä varpaisiin helmoineen kuvan keskikaistalla:** koko hahmo (hattu, liehuva viitta ja helma, jalat)
  vaakasuunnassa keskimmäisen **55 %:n** sisällä (x 576–1984) ja pystysuunnassa noin y 15 %–94 %, kun varpaiden alla on kiveystä.
  Sama kohtaus, asento ja kuvakulma kuin #807, mutta kamera kauempana / laajempi kuva, jotta koko hahmo ja ympäristö mahtuvat.
- Pään yläpuolella ja takana taivasta ja kattoja otsikolle #824 (otsikko tulee pään taakse kuten nyt) keskikaistan sisällä.
  Keisarin sivulle kiveykseen tilaa "karkuteillä"-leimalle #825 (myös keskimmäisen 61 %:n sisällä, ei keisarin päällä).
- Sivuilla (keskimmäisen 55 %:n ulkopuolella) jatkuu kuja: muurit, katot ja kiveys liike-epäterävyydellä, ei uusia hahmoja.
- Aito valokuva kuten tilauksessa (luonnolliset kasvot ja iho, kangas, kivi, tiili, oikea valo ja syvyys). Ei tekstiä.
- **Päämaski** (pää, hattu ja letti alfalla) samoissa koordinaateissa 2560 × 1180.
- **Toimita lisäksi KEISARI-RAJAT.json**: hahmon rajaava suorakaide pikseleinä (x0, y0, x1, y1, viitta ja helma mukana)
  ja pään suorakaide. Peli käyttää näitä, ettei keisari rajaudu millään ruudulla.

## QA

Esikatselut kolmena rajauksena: 19,5:9 (koko kuva), 16:10 (keskeltä 74 %) ja 4:3 (keskeltä 61 %). Jokaisessa keisari näkyy
kokonaan, otsikko #824 on pään takana ja leima #825 keisarin vieressä. Kansio ja vastaus kuten tilauksessa
(`posti/latauskuva-valokuva-20261026/`, `posti/pelikoodari-codex-latauskuva-valokuva-toimitus-20261026.md`).
