# Lavastajan luovutus 2.11.2026 klo 22.45 (tiivis) — LUE TÄMÄ, ÄLÄ VANHOJA

Edelliset viesti-lavastaja-luovutus-20261102-2215.md ja -2124.md ovat viitteitä (rooli, tapa, työkalujen kulku). Syy: kontekstin pehmeä raja.

## Rooli ja tapa (ennallaan)
- Lavastaja: palatsin rakennukset, tausta, esto, lähikoristeet + omat mallit (Pariisi). Työ /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/, paketit proto-3d/_valmiit/.
- Kulku: PT nimeää → tee → pari PT:lle → kuittaus → paketit → JU-vientipyyntö (local_06f8c680-4618-42bd-a730-9b6a3e17e0b7) + PK-kytkentärivi
  (local_91a1bc27-6870-46aa-9886-66fd33b68880). PT local_5df52e10-10e4-4b72-9554-0049db300dfe, ≤ 3 riviä. Viestit send_messagella id:llä.
- Testijuuri: wt/proto-lavastaja-esto-2f nyt detached dec9efec4 (PK:n kapean reitin sääntö); Peli-testit: MK_JUURI=<pk-juuri> MK_RAKENNUKSET/MK_TAUSTA/MK_ESTO/
  MK_OSAMALLIT/MK_POHJA → ./kaanna.sh Juoksu (151/151 odotettu). 景阳宫:n juuri: sisatilat-3d/pk-juuri (v117/v112/v36 + r89:n pk8, osamallit-v6, lahipuut-v12).

## Tila 22.45
| asia | tila |
|---|---|
| 景阳宫 j3 | PT KUITTASI (myös selvitykset). Paketit: rakennukset-v117 dc1334258647 (v116 4f04147d04 jäi käyttämättä: JU:n vienti keskeytyi, 3 vanhaa glb:tä mediassa), tausta-v112 3c0910636814 VIETY 22.29, esto v36 ennallaan. JU vie v117:n; PK:n SEURAAJA kytkee (jonon kohta 0, PK:n luovutus 2dbd2b48e) → varmista kuittaus. |
| 重华宫 | PT 22.4x: jää pois tästä erästä (ei reitin varrella). |
| Pronssit (OMISTAJAN PÄÄTÖS 21.17) | tilattu Codexilta (posti/lavastaja-codex-palatsin-pronssit-tilaus-20261102.md, origin/claude/postilaatikko), toimitus posti/palatsin-pronssit-20261102/ — EI vielä 22.4x. ETUSIJALLA heti saavuttuaan. |
| Notre-Dame (työlista "Notre-Damen ympäristö siistiksi kaupunkikierroksella") | PT antoi 22.4x pronsseja odotellessa. ALOITTAMATTA (vain lähtötiedot alla). |

## 景阳宫:n opit (sisatilat-3d/LUE.md, j-v1b ja j-v1c)
- Ikkunan V4_ristikko / V4_ikkuna_tausta jatkuvat taustan hallissa kivinauhan taakse → solu_uv1 pinoaa ne sokkelin kanssa → mustat laikut. kuori_j leikkaa y < 1,2.
- sisa-maski.json: rajat EIVÄT saa osua sisäseinien tasoon (0,2 m yli; ulkoseinä 0,36 m kauempana). Muuten puolet seinästä katollisella valolla = musta.
- valokuva_v.py (sisatilat-3d/tyokalut): TAUSTA=a.glb,b.glb, kukin omalla valo_rgbm:llä. kuvapari.zsh: ennen = tausta-vXXX laatat, jälkeen = malli + tausta_pois_*.py-luonnos.
- Sokkelin yläreunan tumma vana = 6 cm ulkonevan yläpinnan varjo (aito; 2048-kartta ei muuta). Pronssien/seuraavien hallien kanssa sama.

## Notre-Dame: lähtötiedot seuraajalle
- Aiempi työ 31.10.: proto-3d/_tyo/linnanrakentaja/nd-jono4/SELVITYS.md (v6k28: kattoatlas tummemmaksi, maa_v9c → v9e kivetys; v6k29: maa_v9f sävy + sakariston katot ×0,9).
  Paketit _valmiit/omat-mallit-vienti-20261031-v6k28 ja -v6k29 (portti 0 virhettä). Työkalut nd-jono4/tyokalut/ (maa.py, katot.py, v29.py, rend.py, uvmaski.py).
- AVOIN: mikä omat-mallit-versio pelissä nyt on (v6k29 viety? docs/raportit/cloudflare-kayttamattomat-20261031.md mainitsee v6k28 → v6k29) → kysy NS:ltä
  (local_99130238-aa54-4a29-bcc9-7a023584944b) ennen muutoksia. Työlistan teksti: "vaalea laikukas maa ja kirkon kyljessä valkoinen osa ilman pintaa" → aukio kivetykseksi,
  puutarha nurmeksi ja poluiksi, kirkon kylki pinnalle; sama tarkistus muille Pariisin malleille (Quai Branly, Concorde, prefektuuri, Banque de France, Louvre).
- Pari PT:lle (kohde kokonaan, sama rajaus). NS:n kanssa, jos vienti koskee runkoa. Työlistan tilanne: python3 -I tools/asemataulu/tyolista.py tilanne "OTSIKKO" "teksti".

## SEURAAVAKSI
1. Varmista JU:n v117-vienti ja PK:n seuraajan kytkentä (v117/v112/v36).
2. Pronssit heti, kun Codex toimittaa (tilaus kertoo paikat: Taihedianin terassi, porttien leijonat, aukioiden vesiastiat).
3. Notre-Dame yllä olevista lähtötiedoista.
