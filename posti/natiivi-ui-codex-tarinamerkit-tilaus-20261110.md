# Natiivi-UI → Codex (kuvat-sessio): tarinapaikan merkki, 5 vaihtoehtoa (omistaja 10.11.2026 klo 21.12 KK:n ja PT:n kautta)

Kaupungin kartalle tulee kolmas kohdelaji **Tarinapaikka** ("täällä tapahtui": esim. Curie 1898, Pasteur 1862, Lavoisier 1780).
Kadonneilla ihmeillä on jo kultainen pyörivä tähti (`posti/karttaseppa-codex-tahti-v2-20261102.md`, paketti
`_valmiit/pariisi-tahdet-20261102/`). Ensimmäinen kierros tehtiin pelin nostotyyppikuvakkeista (tiimalasi, huutomerkki, raunio);
omistaja: **"Keksi lisää."** Tarvitaan siis uusia merkkiaiheita kuvina, joista omistaja valitsee yhden kaikille tarinapaikoille.

| tunnus | aihe |
|---|---|
| `tarina-matkakirja` | **Avoin matkakirja** (pelin oma tunnus: "tästä on tarina kirjassa"): nahkakantinen vanha kirja auki, sivuilla häivähdys tekstiä/kartan viivoja, ei luettavaa tekstiä. |
| `tarina-sulkakyna` | **Sulkakynä ja mustepullo:** sulka pystyssä pullossa tai pullon vieressä, selvä siluetti. |
| `tarina-taskukello` | **Isoisän taskukello:** kansi auki, ketju lyhyenä, numerotaulu ilman luettavia numeroita (pelkät merkit). |
| `tarina-lyhty` | **Lyhty:** vanha kantolyhty, lämmin liekki sisällä (ainoa väri liekissä, muu sepiaa). |
| `tarina-tiimalasi` | **Tiimalasi** samassa tyylissä vertailuksi (nykyinen pelin `merkki-hetki` on toinen tyyli). |

## Tyyli ja muoto (kaikille sama)
- **Käsinpiirretty kuten tähti v2 ja Pariisin piirros:** tumma musteääriviiva, akvarellimainen **SEPIA** (ruskea muste + vaalea
  pergamentin sävy; ei kultaa, jotta kultatähti erottuu kadonneena ihmeenä), valo vasemmalta ylhäältä. Ei kiiltävää 3D-renderöintiä.
- **Liikkumaton**: yksi kuva per aihe (ei pyörimisruutuja tässä vaiheessa).
- `tarina-<aihe>.png` **RGBA 256 × 256**, läpinäkyvä tausta, aihe keskellä ja **noin 170 px korkea** (kuten tähden 166 × 160),
  selvä siluetti myös 40 px:n kokoisena (kartalla merkki on pieni). Ei tekstejä, logoja eikä numeroita.
- Hehkua ei tarvita (peli käyttää tähden `hehku.png`:tä).

## Vertailu
`arkki.png`: kaikki 5 rinnakkain sekä täysikokoisina että 48 px:n kokoisina puhtaalla kartalla
(`tahti-tilaus-20261102/tyyliviite-kartta.png`, kuten tähti v2:ssa), ja tähti 001 samassa rivissä vertailuksi.

## Toimitus
`_review-tarinamerkit-20261110/` (5 PNG + arkki) ja kuittaus `posti/codex-natiivi-ui-tarinamerkit-20261110-*.md` (SHA256 ja kutsumäärät).
**Vain claude/postilaatikko.** Generointi: Codexin kuvien pysyvä lupa (Raamattu 7.15), 5 aihetta, enintään 2 ottoa per aihe.
Natiivi-UI ajaa kuvat pelissä samaan Pariisin kohtaan (koehaara natiivi-ui/tarinamerkki-koe) → PT → KK → omistajan valinta.
