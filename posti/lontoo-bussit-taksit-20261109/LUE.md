# Lontoon kaksi bussia ja kaksi taksia — 9.11.2026

Karttasepän tehtävät #2203–2206. Neljä oikeaa 3D-mallia, ei Tripo-generointia.

| Tiedosto | Kolmiota | Pituus × leveys × korkeus, m |
|---|---:|---|
| `bussi-1-routemaster.glb` | 332 | 11.20 × 2.55 × 4.40 |
| `bussi-2-tavallinen.glb` | 260 | 10.50 × 2.55 × 4.30 |
| `taksi-1-uusi.glb` | 196 | 4.85 × 1.94 × 1.88 |
| `taksi-2-vanha.glb` | 200 | 4.58 × 2.00 × 1.83 |

GLB, metrit, Y ylös, keula +Z. Origo on ajoneuvon keskellä maan tasossa; renkaiden alapinta Y=0. Mitat sisältävät taksien valolaatikon. Jokaisessa yksi mesh, yksi primitive ja yksi materiaali, COLOR_0-värit. Ei tekstuureja, normaalikarttoja, sisätiloja, matkustajia, pyörän sisäosia, tekstejä, logoja tai rekisterikilpiä. Vasemman ja oikean puolen geometria ja värit ovat symmetriset.

Värit ovat lineaarisia glTF-verteksivärejä; materiaalin baseColorFactor on valkoinen. Näytön sRGB-perusvärit: bussit #AB3536/#B33A36, taksikori #25292C. Laseissa tasaväri ja opaque-materiaali, ei läpinäkyvyyden järjestysongelmia. Mallit on tehty etäiseen karttanäkymään, ei lähikameran tuotekuviksi.

`esikatselu-<malli>.png`: 1024×1024, 45 astetta ylhäältä ja 30 astetta sivulta, harmaa maa ja pehmeä päivänvalo. Kuvat renderöitiin toimitettavista GLB-tiedostoista Blenderillä. `rivi-kaikki.png`: samassa mittakaavassa vasemmalta Routemaster, tavallinen bussi, uusi taksi, vanha taksi ja 4,5 m henkilöautolaatikko (1,8 m leveä, 1,5 m korkea). Vertailulaatikko ei kuulu GLB-toimitukseen.

QA.json sisältää riippumattoman vientitiedostojen tavuntarkistuksen: kolmiot, mitat, symmetria, normaalit ja värit. SHA256SUMS sisältää kaikkien muiden tämän kansion tiedostojen SHA-256-tarkistussummat.

Vastaanottajan hyväksyntä ja pelikokeilu ovat avoinna. Karttaseppä tarkistaa mitat ja kolmiot; PT/KK arvioivat kuvat. Pelikytkentä odottaa Pariisin autojen osa 5:n kuittausta sekä Lontoon osan vuoroa PT:n mukaan. Tämä toimitus ei muuta peliä eikä julkaise mitään.

Tilaus: posti/karttaseppa-codex-lontoo-bussit-taksit-20261109.md
Lähdecommit: 6cb23554b13ac4e3371d07e4f281b173b4961a4c
Lähdeblob: 2bb70660c869b47200752c754a6d431b11665eee
