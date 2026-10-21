# Valoseppä → Codex / TRIPO 3D -sessio: Peking 1900 -taustan 6 mallia juoksupeliin (21.10.2026 klo 10.4x)

Vastaanottaja: Codexin Tripo 3D -sessio. Lähettäjä: Valoseppä (PT:n välittämä omistajan lupa).

Omistajan pyyntö 10.18 sanatarkasti: "dronessa taustalla näkyy kielletty kaupunki maisemassa uudestaan. maisema pitää tehdä uusiksi
niin että ympärillä näkyy muuta kaupunkia 1900 luvun alun mukaisessa asussa".
OMISTAJAN PÄÄTÖS klo 10.40 (kortti) sanatarkasti: "Kyllä, 6 mallia (Suositus)" → **6 TRIPO-GENEROINTIA, ei uusintoja ilman uutta lupaa.**

KÄYTTÖ: Kielletyn kaupungin juoksupelin taustamaisema vallihaudan ulkopuolella 0,3–1,8 km (pelissä pohja.json-kehys: X itä, Z pohjoinen,
Y ylös, metrit). Mallit monistetaan pelissä satoja kertoja (pihatalot) → kevyet. Näkyvät dronesta ja avauslennosta 100–1800 m:n
päästä, myöhäisen iltapäivän kultaisessa valossa (aurinko 258° / 19°).

| # | Malli | Mitat (m, L × S × K) | Huom |
|---|---|---|---|
| 1 | Pihatalon pääsali (zhengfang) | 11 × 6 × 7 (räystäs 4,5) | 3 jännettä, harmaa tiilinen satulakatto harjoineen, harmaa tiiliseinä, punaiset puiset ikkunakehikot ja ovi, kivijalka 0,5 |
| 2 | Pihatalon sivusali (xiangfang) | 9 × 5 × 5,8 (räystäs 3,8) | kuten 1, matalampi, ovi pitkällä sivulla |
| 3 | Kujan porttitalo + muuriosa (daozuofang + katuportti) | 14 × 5 × 5,5 | kujan puolelle umpinainen harmaa tiiliseinä, pieni katettu porttiovi (punainen ovi) toisessa päässä |
| 4 | Porttitorni (jianlou, Zhengyangmenin tapaan) | 50 × 24 × 38 (muurin alusta 12) | harmaa tiilijalusta, monikerroksinen harmaa/vihreä katto, tykkiaukot riveissä |
| 5 | Kaupunginmuurin pala | 40 × 14 × 12 | harmaa tiili, sakaraharja ulkoreunalla, kallistuva ulkopinta; päät avoimet jatkamista varten |
| 6 | Jingshanin paviljonki (Wanchunting) | 17 × 17 × 18 | kolmikerroksinen neliömäinen katto keltaisin lasitiilin, punaiset pilarit, kivinen alusta |

TEKNISET TOIVEET: origo pohjan keskellä maan tasolla, +Z pohjoinen (glTF), mittakaava metreinä kuten taulukossa. LOD: LOD0 (talot ≤ 6 000,
torni ja muuri ≤ 20 000, paviljonki ≤ 12 000 kolmiota) + LOD1 noin 1/4 + LOD2 noin 1/16 (pelkkä massa ja katto). Tekstuuri
1024² per malli (talot 1–3 saavat jakaa yhden atlaksen), baseColor + normal, ei läpinäkyvyyttä. Staattinen, ei luurankoa.
TYYLI: sama maalauksellinen tyyli kuin pelin palatsimalleissa, noin 1900 Peking, ei nykyrakennuksia, ei tekstejä, ei ihmisiä.
TOIMITUS: postiin pohjan codex-3d-toimitus.md mukaan (glb + esikatselukuvat + manifest + lisenssi/alkuperä), kansio
posti/tripo-peking1900-6-mallia-20261021/. Kuittaa ensin osaluettelo (6) ennen ensimmäistä generointia.
Valoseppä kokoaa mallit vallihaudan ulkopuolelle (proseduraalinen hutong-rengas valmiina kytkimen takana) ja vie kuvaparin PT:lle;
peliin vasta hyväksytyn kuvaparin jälkeen.
