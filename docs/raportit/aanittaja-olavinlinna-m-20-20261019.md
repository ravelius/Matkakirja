# Olavinlinna M-osa: 20 repliikkiä generoitu ja viety (Äänittäjä 19.10.2026 klo 09.1x)

Lupa: omistajan päätös 09.10 (KK-kortti, "Kyllä, kaikki 20"), PT:n LUPA 09.10. **20 ottoa, 685 näkyvää merkkiä (16 pakollista 552 + 4 varalla 133), lähetetty 876 mrk tunnetageineen (≈ 55 kr).** Yksi otto per repliikki, eleven_v4_turbo, language_code fi (pyynto-rungossa `olavinlinna-m-repliikit.py`), äänet hahmoittain: vartija = mies-45-jamakka-karhea, kello-vartija = mies-30-letkea-pelimies, vesipoika = mies-18-reipas-nuorukainen.

**Ämpäri:** `seikkailu/olavinlinna/repliikit-lapi-v4/` (manifest.json 20 riviä, aani/*.mp3, ajat/*.json, yhteensä 63,1 s). Ääniportti (viennin ehto) 0 hylättyä; kieli.json mukana. Työ: `proto-3d/_tyo/olavinlinna-m-valinnaiset-20261019/` (kasikirjoitus20.md, aja.zsh, paketoi.py); raaka `_valmiit/olavinlinna-repliikit-lapi-v2/`; vientipaketti `_valmiit/olavinlinna-repliikit-lapi-v4-vienti-20261019`.

**Huomiot**
- `repliikit-lapi-v1` (9.10.), `-v2` (10.10.) ja `-v3` (12.10.) olivat jo ämpärissä samoilla 16 tekstillä; v4 on siksi uusi. Ensimmäiset vientiyritykseni menivät v2:een ja v3:een (ämpäri ei ylikirjoita): niihin tuli vain 4 uutta otto-paria (varalle jäävät) + juureen `kieli.json`. Haitaton, ei poistettu.
- Sanaportti (`aaniportti.py --puhe`, ei viennin ehto): Whisper-epäily 15/20 (huudot, kuiskaukset, lyhyet lauseet), kuuntelematta. Kuuntelu/uusinta vaatii luvan (yksi otto per repliikki -ehto).
- Tasot: LUFS −15…−18 (puhe, sama käsittely kuin ennen: −17,2 dB + alimiter 0,79), true peak kunnossa (v1:n vesipoika +0,1 dBTP -ongelma ei toistu).

## Vertailu: v4:n 16 vs v1:n 16 (PT:n pyyntö, ei uusintoja)
Sama käsikirjoitus, sama ääni, sama malli. Sanaportti (Whisper) hylkää 16/16 molemmissa, samat lauseet ("Kuluika", "tuoli?", "liikkuigotuolla"…) → ei erottele, eikä kumpaakaan ole kuunneltu. Kesto ±0,3 s (v4 +0,0…+0,3 s pidempi: paluu-1 4,07→4,38, rotat-1 3,61→3,88, epaily-2 2,68→2,82). LUFS −15…−18 molemmissa (v4 0,0…0,9 dB hiljaisempi). **True peak: v1 −4,6…+0,1 dBTP (9/16 yli −1; tyrma-vesipoika-1 +0,1 = portin hylkäys), v4 −5,1…−1,7 (kaikki ≥ 1,7 dB marginaalilla).**
**Suositus: v4** (sama sisältö, portin marginaali, +4 varaotto samassa manifestissa). Jos kuuntelussa v1:n tietty otto kuulostaa paremmalta, kyseinen id voidaan ottaa v1:stä, mutta tyrma-vesipoika-1 vain v4:stä.
Vahinkolisäykset: `repliikit-lapi-v2/` ja `-v3/` saivat 4 otto-paria (muuri-vartija-rauha-3, muuri-vartija-epaily-3, kello-vartija-halytys-2, tyrma-vartija-vienti-2: aani/ + ajat/) ja ämpärin juureen `kieli.json`; manifestit ennallaan (16 riviä), joten peli ei käytä niitä. Ei poistettu.
