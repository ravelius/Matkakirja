# Pelikoodari → Fable: kohdemaan nimiöt elävinä (20.9.2026)

Haara `pelikoodari-nimiot-elavat` (pohja origin/v1973-prep + merge
pelikoodari-nimiot-reuna).

## Mitä muuttui

- **Kytkin** `KOHDEMAAN_NIMIOT_ELAVINA = true` (js/laattapyramidi.js;
  pallo.js vie sen nostokerrokselle). Kun pallon sarja on ajettu ilman
  `--nostot`-lippua (nykytila), `pallonNostoOnPoltettu` ei pidä yhtään
  nostoa poltettuna ja maakohtaista nostolaatastoa ei ladota
  (js/pallolaatat.js `nostotMaittain`). Kohdemaan kaikki nostot — myös
  ennen laattaan poltetut ja meren nimiöt — piirtyvät elävinä
  sovittelun (kaupungin nimi, pelimerkit, ruudun reuna, rantaviiva)
  läpi. Muiden maiden nostot pysyvät poissa (NAYTA_VAIN_KOHDEMAAN_NOSTOT)
  kuten ennen; niiden laatat eivät muutu. Ulkoasu on sama raster
  (piirraNostosymKartalle), jolla laatatkin poltettiin.
- **Budjetit**: NOSTOJEN_KATTO 40 → 120 ja HTML_MERKKIEN_KATTO 60 → 180
  kytkimen ollessa päällä — muuten puolet Ranskan nostoista olisi
  pudonnut pisteiksi ja kaupunkien nimibudjetti nollaan.
- **Rantaviivasääntö** (js/pallolauta/sovittelu.js MEREN NIMIÖ EI JÄÄ
  RANTAVIIVAN ALLE): kohdemaan korostuskehän renkaat
  (js/maanaariviivat.js `pallonKorostusRenkaat`) muunnetaan
  rengasjanojen ruutulaatikoiksi (lauta.js `rantaviivanLaatikot`, vara
  4 px) ja ne ovat este VAIN meren lapuille (`meri: true`, tyyppi
  'meri'). Uusi porras `meri`: kun mikään kylki tai pieni siirto ei
  vapaudu rannasta, lappua työnnetään kasvavin askelin (12 → 72 px)
  kahdeksaan suuntaan — ensimmäinen vapaa suunta on meri. Laatikot
  lasketaan laiskasti vain, kun sovittelu oikeasti ajetaan (~2 ms).

## Mittaukset (Ranska, Marseille, Mac load ~15–30)

| | prep | elävät |
| --- | --- | --- |
| 390 px saapuminen: nostoja osumalistalla / poltettuja | 45 / 24 | 54 / 0 |
| 390 px nimiöllisiä / kaupunkien nimiä | 21 / 1 | 40 / 2 |
| 1400 px nimiöllisiä / poltettuja | 40 / 34 | 69 / 0 |
| CSS2D-elementtejä (nostot + nimet), Pariisi 390 | 27 | 56 |
| ladoHeti mediaani 30×, Pariisi 390 | 2,2 ms | 2,5 ms |
| Sisältökirjurin mittari FRA, 4 kokoa + zoomit | 0 elävää, 10 poltettua | **0 / 0** |
| Välimeri Marseillen zoomissa | poltettu kehän alla | elävä, siirretty 36 px merelle, ei leikkaa kehää |

- fps: headless-Chromium kuormitetulla Macilla antoi 5,0 vs 5,1 fps
  (prep vs elävät) — sama luku, mutta absoluuttinen taso on kuorman
  vika, ei pelin. **Laitetestaajan iPad-mittaus tarvitaan** (56 vs 27
  CSS2D-elementtiä).
- savuke-pallo-nostolaput 6/6; uusi savuke-nimiot-elavat 22/22
  (julkaisusarjaan); testit 3772/0.

## Rajaukset ja jatko

- Muiden maiden nimiöt: eivät muutu (laatoissa/piilossa). Kun Karttaseppä
  polttaa uuden nimiötason (rajapinta sovittu: `nimiotaso`, laatikot,
  meri-avain), kohdemaan poltettu teksti häivytetään maapolygonilla —
  ei kuulu tähän erään.
- Ulkoasu: elävä ja poltettu nosto ovat sama raster; "muste ilman
  lappua" -erottelua ei tarvittu.
- Sea-nostojen siirto (enintään 72 px) siirtää myös ikonia; osuma-ala
  seuraa datumia, joten napautus osuu.
