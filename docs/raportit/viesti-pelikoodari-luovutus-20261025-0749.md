# Pelikoodarin luovutus 25.10.2026 klo 07.49 (Postivahdin kova raja 38 %)

## Tila lyhyesti

- Juna 210 auki, NS:n runko `natiiviseppa/juna-210` 406d88bb6 (sisältää venynyt-ruutu e597ffa6d, PT kuittasi).
- Täysi kuva-ajo (01/02/03/05 + piha, muurikujan video, lautaspöytä, 03A/B, 04) vasta VS:n B8-rungosta PT:n sanalla (ei vielä annettu).
- Kolme erää kesken / PT:lle ilmoitettavana (alla). Ajossa voi olla esikatselu `sk-puut-yla` (Unity batch, valmistuu ~07.55):
  tulos `proto-3d/lokit/esikatselu-20261025-07xx/puut-{ennen,jalkeen}-{a,b,c}.png` (uusin esikatselu-kansio).

## Erät

| Erä | Haara (proto, /Users/Shared/Claude/wt/) | Kärki | Tila |
|---|---|---|---|
| Maakolmiot (LR:n työ, PT) | pelikoodari/nurmi-v47 (wt/proto-pelikoodari-nurmi-v47) | 928ebc35b | tausta-v47 paketti VALMIS, ei vielä PT:lle |
| Lehvästö v1 palatsipuihin (LR:n työ, PT) | sama haara (LahipuutKansio v6) | 928ebc35b | lahipuut-v6 sisältö valmis, PAKETTI TEKEMÄTTÄ, korttireunat tarkistamatta |
| GC-varaukset (PT, LT 406d88bb6) | pelikoodari/gc-juoksu (wt/proto-pelikoodari-gc-juoksu) | e9b3a9875 | 0 virhettä, 733/733; editoriajo tekemättä; ei vielä PT:lle |

### 1. Tausta-v47 (maakolmiot)

- Syy: LR:n v47 (`_tyo/linnanrakentaja/.../peking/tausta47`, korjaa_nurmi.py) poisti nurmikolmiot mutta ei liittänyt korvaavia
  V4_lattia-primitiivejä meshiin (`lisa` jäi käyttämättä) → reiät, taivas näkyi sinisinä kolmioina (LR:n kuva tausta-v46-v47-nurmi.png).
- Korjattu kopio: `proto-3d/_tyo/pelikoodari/nurmi-v47/korjaa_nurmi.py` (liitetään, tyhjät primitiivit pois, IRTO 4 → 8: Meridiaaniportin
  länsipuolen 8 kolmion viuhka −77, −423). 243/921 nurmikolmiota, 93 osaa; puistojen isot nurmet jäävät.
- Paketti: `_valmiit/juoksupeli-kk-tausta-peking-v47-vienti-20261025` tunniste **455b763e82cc** (68 tiedostoa, v46:n LAHTEET + v47-rivi).
- Kuvapari (editori, puut pois, 07-testikamera 380 m): `proto-3d/_tyo/pelikoodari/nurmi-v47/kuvat/nurmi-07-ennen-jalkeen.png` — kaikki
  vihreät kolmiot poissa, muu ennallaan. Lähetä PT:lle 3 riviä (SHA + kuvapari).

### 2. Lähipuut-v6 (Valosepän lehvästö v1)

- Sisältö: `proto-3d/_tyo/pelikoodari/nurmi-v47/kielletty-lahipuut-v6/` (idantuija/kiinankataja/pagodipuu.glb = puut-962964/*-lehvasto.glb,
  chiwen, harjaelaimet, koristeet.json v5:stä; puut.json v5:n paikat, lajit neidonhiuspuu → idantuija, jalava → kiinankataja).
- Paketti tekemättä: `python3 <scratch>/paketti.py` -tyylisesti (LAHTEET v5:stä + v6-rivi, SHA256SUMS, tunniste = sha256(SHA256SUMS)[:12]).
  Skripti kopiona: tee uudelleen samalla logiikalla (paketti.py oli session scratchpadissa).
- Tarkistettava: keskimmäisen puun (kiinankataja) vaaleat korttireunat pelikuvasta. Esikatselut 07 ja 01/piha eivät näyttäneet lähipuita
  tarpeeksi läheltä, 2 ajoa kameralla seinän sisällä. Viimeisin ajo `sk-puut-yla` (yläkuvat −220, 300 / −220, 560 / −220, 545).
- Esikatselun mallijuuret: `nurmi-v47/juuri-jalkeen` (v47) ja `juuri-puut` (v47 + v6), komento `ui juoksupeli palatsi mallit file:///…/`
  (kansionimet junan vakioiden mukaan v46/v5, symlinkit v47/v6:een).

### 3. GC-varaukset (e9b3a9875)

- LT 406d88bb6: 7 venynyttä ruutua 21–25 ms, 5/7 GC. Korjattu: palatsin LOD-silmukan new int[5]/osa/ruutu, kameran sulkeumat (Hk-lambdat →
  kerran luodut delegaatit + kentät) ja new[]-taulukot, varjonheittäjien taulukot kasvaviksi, JuoksuLeike-params jaetuiksi, SoitaEfektit
  Kerta-metodiksi + Hetki täyttää listan, piilo-HUDin tekstit, peukalotaulukko, botin/vartijoiden lambdat, KaupunkiMerkit ja Nimikerros
  pysähtyvät kun pallo peitossa.
- Ennen PT-riviä: lyhyt editoriajo REF=pelikoodari/gc-juoksu (botti 30 s, kuva + loki: ei poikkeuksia, kamera normaali). Sitten PT:lle 1 rivi.

## Avoimet

- Täysi kuva-ajo B8-rungosta PT:n sanalla.
- d7d85b5d5:n rungot alkulennossa: vahvistus seuraavasta alkulentokuvasta.
- worktreet jäljellä: proto-pelikoodari-{havainne-210, juoksupeli-kamera-204, kuvaruudut-210, lahikulma-210, lento-wasd, nappainlento-204,
  raketti-video-211, juoksuverkko-211*, juna210-testi*, nurmi-v47, gc-juoksu} (* mergetty, seuraamattomia tiedostoja).
