# Pelikoodari: luovutus 08.11.2026 klo 11.10

Korvaa kaikki aiemmat. Nollaus kontekstivahdista (pehmeä raja 25 %). Vanhat opit: `git show f0e5a3173:docs/raportit/viesti-pelikoodari-luovutus-20261108-0230.md` kohta 2.

## 0. TYÖN ALLA: juoksupelin lataus lyhyemmäksi (omistaja 7.11. 23.05, PT 08.4x ja 10.1x)
PT:n ehdot: mittaa ensin, suurin hyöty ensin; iPad-ajot JU:n jonossa; ulkoasu ei saa muuttua (kuvapari); junaan 222 vasta PT:n kuittauksella; tulos PT:lle ≤ 3 riviä + TULOS-tiedosto.

- Haara `pelikoodari/lataus-222` (natiivi-backup), työpuu `/Users/Shared/Claude/wt/proto-pelikoodari-muisti`, kärki **e59541a34**:
  - 208264a65 mittari + QA `valo latauskappaleet` (b: hyöty ~0, oletus ennallaan 1 = PT: "b pois")
  - bccc02fed QA `palatsi kopiot-rinnalla` → **e59541a34 oletus PÄÄLLÄ** (PT 10.1x: c 21,5 s vs 26,1 s, huippu +72 Mt kelpaa)
  - e2e58e9ae + 688f77b3e (meta) **kuvien esipurku** `JuoksuKuvaEsipurku.cs`, QA `palatsi esipurku 0|1`, oletus POIS: PNG-purku esihaun taskissa (Palatsi.cs Esihae), pääsäie SetPixelData+mipit; luokittain (värityyppi × gAMA) ensimmäinen kuva verrataan LoadImageen kaikkine mip-tasoineen, ero → LoadImage. Ositusrivi pilkottu 3 riviksi (laitteen 287 merkin raja).
  - unity-tarkistus (sh) 0 virhettä; purkaja = PIL 75/75 (testi scratchpadissa, ei repossa).
- Tulokset: `/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/juoksu-lataus/TULOS-3.txt` (a–e + d). Lyhyesti: a 26,1 | b 24,8 | c 21,5 (+72 Mt) | e 25,4 | d 25,0 s.
  d: esipurku toimii (luokat 2, 6, 2+gAMA, 6+gAMA tavulleen samat, ARGB32), pääsäikeen kuvien purku 5,1 → 2,1 s, MUTTA kokonaisaika ei lyhentynyt: LOD0-kierros 6,7 s molemmissa → kierros odottaa esihaun taustatehtäviä (EsihakuN 3).
- **JU:n jonossa (pyydetty 10.38, laitekäännös e59541a34 L1 alkoi 10.38, 11.08 yhä kesken):** g = esipurku 1 (PT:n yhdistelmä: c oletuksena + esipurku), f = esipurku 1 + esihaku 8. Skenaariot `sk-ipad-ositus-{g,f}.txt` → `lokit/pelikoodari-lataus-ositus-{g,f}`.
- Kun lokit tulevat: `grep "latauksen ositus\|LOD.-kierros\|kuvien esipurku" <loki>/muisti-tarkka.log`; huippu: suurin `fp` N-riveiltä avauksesta eteenpäin (awk kuten TULOS-3:ssa: a 4400, b 4334, c 4472, e 4484, d 4437 Mt).
  - Jos f selvästi nopeampi kuin g ja huippu kohtuullinen: esipurku oletukseksi + EsihakuN 8 (Palatsi.cs `EsihakuN = 3`), uusi commit, sitten kuvapari (aja-kuvat.sh / sk-kuvat.txt, ennen = 54b7c832c) JU:n esikatseluvuorolla.
  - Jos esipurku ei lyhennä kokonaisaikaa: jätä oletus pois; ehdotus PT:lle, että junaan vain c (e59541a34).
  - Raportti PT:lle ≤ 3 riviä: g/f ajat + huiput, sha, TULOS-3-polku. Lisää TULOS-3:een rivit.
- Muut ehdokkaat (ei tehty): esteiden/kerättävien/aarteiden glb-esihaku (~−1 s arvio; RakennaEsteet → LataaEsteMallit jne. peräkkäin); kuvien pakkaus 1,0 s pääsäikeessä (Compress, ei siirrettävissä).

## 1. Muut (ennallaan)
Keisari c92dafe1f ja lataus ab113e0ac junassa 221. Lontoon maanpinta a7ad5fc24 kokeena haarassa. Latauskuvat 190d6c094 NS:llä.
