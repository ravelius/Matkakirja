# Kiinan dynastiat: väestöpinta, taistelut ja valopisteet (Karttaseppä → Pelikoodari, Natiivi-UI ja Linssiseppä, 17.10.2026)

Omistaja 17.10.2026 klo 07.36 PT:n kautta: "Voisiko ihmisten ja sotajoukkojen määrää kuvata värillisellä korkeuskartalla?
Niissä muutokset ja 'lyönnit' pitäisi kuvata pehmeillä animaatioilla." Päätös 07.37: "Kyllä, kokeilu videona (Suositus)".
Ensimmäinen hetki: Punaiset kalliot 208. Onnistuessa korvaa väestöpisteet (`kerrokset` / `vaesto`) ja taistelunuolet.
Tämä on datan muoto; armeijahuiput ja lyöntiaalto ovat Pelikoodarin (liikepohja), kytkentä linssiin Linssisepän.

Tiedostot kansiossa `vaestopinta/` (tuottaja `tools/kiinan-dynastiat/vaestopinta.py`, lisenssi CC0):

| Tiedosto | Sisältö |
|---|---|
| `vaestopinta-<vuosi>.bytes` | Tiheys, uint16 LE, `leveys × korkeus` (208: 240 × 220), arvo = henkeä/km² × 10. Rivi 0 = pohjoinen. |
| `omistus-<vuosi>.bytes` | uint8 samassa hilassa: 0 = ei kenenkään (meri, aavikko), i = `dynastiat[i − 1]` (väri = linssin värisääntö). |
| `vaestopinta-<vuosi>.json` | `hila` (lon0 100, lon1 124, lat0 20, lat1 42, askel 0,1°; solun keskipiste lon0 + (c + 0,5)·askel, lat1 − (r + 0,5)·askel), `tiheys` (max, p99, summa), `omistus`, `dynastiat` [{avain, nimi, vari, tyyppi}], `hetki`, `lahteet`. |

`hetki` (Punaiset kalliot, `tools/kiinan-dynastiat/vaestopinta_data.py`), aika `t` 0–1 hetken sisällä:
- `armeijat` [{avain, nimi, dynastia, miehia, arvio, keraus [{lon, lat, sade_km, osuus}], reitti [{t, lon, lat, paikka}]}]:
  armeija kerää miehet keräysalueilta (pinta painuu, huippu kasvaa; huipun korkeus = miehiä) ja kulkee reittiä ajassa t.
  Cao Cao noin 150 000–240 000, piirrossa 200 000 (Ye → Xuchang → Xiangyang → Jiangling → Wulin), Sun Quan ja Liu Bei noin 40 000–50 000 (Chaisang → Xiakou → Punainen kallio).
- `lyonnit` [{t, lon, lat, voittaja, havio, voima}]: pehmeä aalto kuin pisara vedessä (t 0,55).
- `jalkeen` [{armeija, t0, t1, miehia, reitti}]: häviäjä valuu takaisin pinnaksi ja tappiot madaltavat (tappioista ei lähteissä lukua: `visuaalinen` = vain kuvan mittasuhde; Cao Cao Huarongin
  tietä Jianglingiin ja Xiangyangiin); voittajat etenevät Jianglingiin.
- `toipuminen` {t0, t1}: keräysalueiden painuma palautuu hitaasti; tappiot jäävät pois.

Korkeuden muunnos (ehdotus piirtoon): korkeus ∝ tiheys (lineaarinen; p99 ≈ 66 hlö/km², max ≈ 122), armeijahuippu samassa
mittakaavassa: miesmäärä jaettuna huipun pohjan pinta-alalla. Kamera matalaan kulmaan; pehmeät käyrät liikepohjasta.

**Kaikki luvut ovat arvioita.** Tiheys: kokonaisväki 208 ≈ 34 milj. (Hanin laskenta 140: 49,7 milj. → arvio 250: 25 milj.,
lineaarisesti), alueosuudet `kerrokset_data.OSUUDET`, matalikot ETOPO1 (NOAA, PD) ja jokilaaksot Natural Earth 50 m (PD).
Korvataan HYDE 3.2.1 (CC0, doi 10.17026/dans-25g-gez3) tai 3.3 (CC BY 4.0, doi 10.24416/UU01-67UHB4) -ruudukolla samaan
muotoon, kun aineisto on ladattu (skriptihaku estetty: robots.txt ja Anubis; vaatii käsilatauksen). Omistusvärit vuoden 250
rajoista (Wei = Cao Caon Han-hovi, Wu = Sun Quan; Shun alue oli 208 vielä Liu Zhangin).

Esikatselu (matplotlib, ei pelin piirto): `vaestopinta_kuva.py vaestopinta 208 <ulos.png>`.

## Kaikki 19 pysäkkiä (omistaja 17.10.2026 klo 11.32, 11.38 ja 11.44 PT:n kautta)

"Käydäänkö siinä kaikki dynastia läpi? Pitää käydä": pinta jokaiselle linssin pysäkille, tiedostot nimetty **pysäkin vuodella**
(`vaestopinta-<pysäkki>.json`, `vaestopinta-<pysäkki>.bytes`, `omistus-<pysäkki>.bytes`; 208:n kokeilu on nyt `-250`).
Tuottaja `tools/kiinan-dynastiat/vaestopinta.py kaikki <rajat-kansio> <korkeus-kiina-005.npy> <ne-kansio> <ulos>`.

- **Hila per pysäkki**: omistettujen alueiden rajaus ∪ ydin (lon 100–124, lat 20–42), leikattu lon 73–135 / lat 18–54; askel 0,1°,
  isoilla alueilla 0,15–0,2° (≤ 90 000 solua; iPad laskee normaalit joka ruudussa hetken aikana).
- **Tiheys**: `vaestopinta_data.VAESTO` (tarkistettu 17.10., lähteet `vaestopinta/lahteet/vaesto-alueittain.md`) ydinalueille
  osuuksin `OSUUDET` (15 aikakautta) ja reuna-alueet `REUNAT` (Mantšuria, Yunnan–Guizhou, Guangxi, Gansu, Mongolia, Tiibet,
  Xinjiang, Taiwan); kansalliseen lukuun sisältyvät reunat vähennetään ytimestä. Painotus matalikoille Copernicus GLO-90
  (© DLR e.V. 2010–2014 ja © Airbus Defence and Space GmbH 2014–2018, ESA; vapaa käyttö), mosaiikki `korkeus_mosaiikki.py`.
- **`tiheys.korotus`**: pysäkin korkeuskerroin (74 / p99)^0,8 (208:n kokeilussa hyväksytty 4000 m/(hlö/km²) kun p99 = 74, V0d
  11.08): 25 milj. ja 420 milj. ovat molemmat luettavia; p99:n korkeus ~250 km (250) → ~415 km (1912).
- **Taistelut** (`vaestopinta_data.HETKET`, pysäkki = `rajat_vuosi`): Changping −260 (pysäkki −221), Punaiset kalliot 208 (250),
  Fei-joki 383 (440), Yamen 1279 (1280), Shanhain sola 1644 (1644). Lähteet ja varoitukset `vaestopinta/lahteet/taistelu-*.md`.
  Armeijan dynastia, jolla ei ole aluetta pysäkin rajoissa (esim. Zhao), on `dynastiat`-listan lopussa (`alueeton`), väri kaikista
  rajoista. Kaikki luvut arvioita, tappioista ei esitetä lukuja.

## Valopisteet ja Silkkitie (`valopisteet.json`)

`valopisteet` [{avain, laji keksinto|uskonto, nimi, vuosi, pysakki, paikka, lon, lat, epavarma, eurooppaan {vuosi, paikka}, lahde}]:
paperi, kompassi, ruuti, kirjapaino; kungfutselaisuus, taolaisuus, buddhalaisuuden, islamin ja kristinuskon saapuminen (neutraalisti).
`silkkitie` {pisteet [[lon, lat, paikka]], lahde}: Chang'anista Antiokiaan. Natiivi: KiinaKerros sytyttää pysäkin pisteet yksi
kerrallaan (edellinen himmenee 40 %:iin, lopussa tähtikuvio) ja piirtää Silkkitien juovan, kun keksintö saapuu Eurooppaan
pysäkkien välillä. Perustelut ja epävarmuudet `vaestopinta/lahteet/valopisteet.md`.

- Natiivin lisätiedostot (sama sisältö kuin `Assets/Matkakirja/Linssit/Resources/Kiina/`, juna 202): `kiina-puherivit.json`
  (Williamin pysäkkilauseet, Sisältökirjurin käsikirjoitus v2), `nykyinen-kiina.json` (nykyraja Natural Earth 10 m, nimiö "Nykyinen Kiina"),
  `valopisteet.json` ja `vaestopinta/` (MUOTO-VAESTOPINTA.md).
