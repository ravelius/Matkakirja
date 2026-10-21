# Valoseppä: luovutus 21.10.2026 klo 21.55 (viikkoraja 80 %, omistajan päätös 21.53)

Päiväkirja: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md`. Kaikki proto-haarat puhtaina (ei commitoimattomia).

## Valmiit tänään (21.10.)

| Aihe | Haara / kärki | Tila |
|---|---|---|
| Raketin nousun muisti | `linssiseppa2/raketti-muisti` cb4579376 (välimuisti 192 Mt) | NS mittasi 3516 Mt, 0 varoitusta; PT kuittasi junaan |
| Juoksun varjovärinä 1 (normaalisiirto) | c1637075b | rungossa (4186554cd) |
| Kartta-arkki 10 → 10l | PK:n `pelikoodari/sarja-pysty` | omistaja 14.25: vertailuarkki koodi vs. Codex #812 (3 kohdetta), kun #812:n mallit tulevat; purjelaiva on pohjakartan piirros → keskipisteen siirto PK c19d4a826 (ajamatta) |
| Tavoiteluuppi k2 (aurinkoinen päivä) | `linssiseppa2/kierros2-paiva` (Lavastajan k1 5629b166a päällä) | PT HYVÄKSYI kuvaparin (k2d) lukitusehdoksi; da73281ff LT:llä (GPU + värinä-A/B) |
| Vihreä värinä 2–4 | sama haara: lehvästö 7f6ef2a58, räystäs a26367b67, syvyyskilpailu da73281ff | LT:n laite-A/B kesken (v11/v27/v52, `valo raystas 0\|1`) |
| Kivetyksen sävy (PT: liian valkoinen) | 6a95e2973 | seuraavaan kierrokseen |
| Amsterdamin kävijät tummat | `linssiseppa2/rijks-paivanvalo-210` fa8442d1f + b6fdf796d (Yövartio 1,6) | PT hyväksyi v2; NS:llä junaan 210 |
| Peking 1900 -Tripo hutongiin | `linssiseppa2/hutong` 9bac50808, paketti ämpärissä (peking1900-v1) | kytkin pois; PT: jää kierrosten jälkeen; simupari ajamatta (aja-tripo.zsh valmis) |
| Tuotanto B luku 7 (valo, video) | web PR #5160 (LS cherry-pick) | PT mergee |

## Avoimet (seuraavalle)

1. **LT:n laite-A/B da73281ff**: jos vihreät värisevät yhä, katso `varina-mittari.py`:n magenta-kuvat (LT:n kansio `varjot-koko/kierros29+`). Syy oli syvyyskilpailu (palkki 1–3 cm seinän edessä) ja varjokarttaa hienompi tiilikuvio. Läpäisyn jälkeen värinäkorjaukset NS:n kautta runkoon (PT 18.xx).
2. **k2-haara runkoon** LT:n mittauksen jälkeen (Lavastajan k1 + VS k2 yhtenä haarana NS:lle, kärki 6a95e2973 tai uudempi).
3. **Kartta-arkin keskipiste** (c19d4a826, `kartta-arkki/sk-keskipiste.txt`) → valitse keskipiste, jossa purjelaiva jää ruudukon ulkopuolelle → PK oletukseksi; sitten vertailuarkki #812:n kanssa.
4. **Hutong-tripo simupari** (`hutong/aja-tripo.zsh 9bac50808`, JU:n käännös hutong/app) → PT; GPU LT:n kanssa ennen kytkintä.
5. Tulivuoret (Sarytšev/Raikoke kansi liian valkoinen), hurrikaani ylhäältä liian lähellä: seuraava kierros.
6. Rakettivideo (meri + valas) yöllä 21.–22.10. siirtyy toiselle tilille.

## Työkalut tänään

- `proto-3d/_tyo/linssiseppa2/varina/varina-mittari.py` (värinämittari, jäädytetty ruutu + katse 0,03°).
- QA: `ui juoksupeli valo paiva|lehvasto|raystas|siirto 0|1`.
- Simuvideo: `xcrun simctl --set "$MK_SIMSET" io … recordVideo`, pysäytys `kill -INT` ja odotus.
