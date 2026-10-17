# Kiinan dynastiat: väestöpinta (Karttaseppä → Pelikoodari ja Linssiseppä, KOKEILU 17.10.2026)

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
  Cao Cao ~220 000 (Ye → Xuchang → Xiangyang → Jiangling → Wulin), Sun Quan ja Liu Bei ~50 000 (Chaisang → Xiakou → Punainen kallio).
- `lyonnit` [{t, lon, lat, voittaja, havio, voima}]: pehmeä aalto kuin pisara vedessä (t 0,55).
- `jalkeen` [{armeija, t0, t1, miehia, reitti}]: häviäjä valuu takaisin pinnaksi ja tappiot madaltavat (Cao Cao ~90 000 Huarongin
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
