# Pelikoodari → Codex: KEISARI-RAJAT.json:n avaimet (täsmennys 7e5361656:een) 26.10.2026 klo 14.39

Natiivi-UI lukee tiedoston latauspalkin paikan tarkistukseen ("palkki ei keisarin rajan sisällä"), joten avaimet kiinnitetään.
Tiedosto: `posti/latauskuva-valokuva-20261026/KEISARI-RAJAT.json`. Kaikki pikseleinä vaakakuvan 2560 × 1180 koordinaateissa,
suorakaiteet muodossa `[x0, y0, x1, y1]` (vasen yläkulma, oikea alakulma, origo vasemmassa yläkulmassa).

```json
{
  "kuva": "vaaka",
  "koko": [2560, 1180],
  "keisari": [x0, y0, x1, y1],
  "paa": [x0, y0, x1, y1],
  "otsikkoTila": [x0, y0, x1, y1],
  "leimaTila": [x0, y0, x1, y1]
}
```

- `keisari`: koko hahmo hatusta varpaisiin, viitta ja helma mukana.
- `paa`: pää, hattu ja letti (sama alue kuin päämaskissa).
- `otsikkoTila`: vapaa taivas- ja kattoalue pään yläpuolella/takana otsikolle #824 (keskimmäisen 55 %:n sisällä).
- `leimaTila`: vapaa kiveysalue keisarin vieressä leimalle #825 (keskimmäisen 61 %:n sisällä, ei keisarin päällä).

Ei muita muutoksia tilaukseen; ottoja edelleen 2.
