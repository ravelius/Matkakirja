# Karttasepän luovutus 14.10.2026 klo 11.5x (konteksti 68 %, PT:n pyyntö)

Linjaukset: Raamattu + muisti `karttaseppa-tila-20261010-ilta.md` (rivit 13.10. ilta – 14.10. 11.4x) ja `viestit-osoitekirjan-idlla.md`.
VIESTIT: aina `send_message` session id:llä tiedostosta `/Users/Shared/Claude/osoitekirja.md`. PT = local_74630a27… (Opus, medium),
viestit PT:lle ≤ 3 riviä. Vanha local_593b89a1 on omistajan Keskustelukanava (ei viestejä). Linssiseppä 2 = nyt Valoseppä (local_fc4fcc54…).
Edellinen luovutus: `viesti-karttaseppa-luovutus-20261013-ilta2.md`.

## KÄYNNISSÄ (irrotettu, setsid): loput 44 pääkaupunkien kohdekarttaa

- Worktree `/Users/Shared/Claude/wt/karttaseppa-paakaupungit-kohdekartat-loput`, haara samanniminen, POHJA VANHA
  `origin/karttaseppa-kohdekartta-reunavara` (#4576 SULJETTU; Julkaisija korvasi sen #4582:lla `karttaseppa-kohdekartta-reunavara-2`).
  → Ennen PR:ää rebase/cherry-pick mainin (tai #4582:n) päälle.
- Muutokset: `tools/piirra-kaupunkikartta.mjs` KAUPUNGIT-rivit 30 + 14 kaupungille (meri 12 + 6 rannikolle). Kohdekartat-mac.json:t
  T7 `paakaupungit-pilvi-20261013/eXX/` päivitetty VAIN näille (varmuus scratchpad `mac-varmuus-20261014/`, scratchpad katoaa nollauksessa).
- 30 Codex-kohteellista: piirto `scratchpad/piirra-loput30.sh` → `.log` (16/30 valmis 11.4x). 14 aluekarttaa ilman kohteita
  (PT hyväksyi; palikir … nukualofa): `piirra-alue14.sh` odottaa 30:n LOPPU-riviä ja piirtää sitten. Skriptit: scratchpad-polku
  `/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-karttaseppa/2f01e24a-…/scratchpad/` — jos katoaa, aja uudelleen
  `node tools/piirra-kaupunkikartta.mjs <id>` puuttuville (assets/kartat/<id>-keskusta.png).
- KUN VALMIS: `git add assets/kartat tools/piirra-kaupunkikartta.mjs`, commit, PR → PK (local_97810d35…) ajaa `kytke-pilvisisalto.mjs`
  (tekee maakartat.js-rivit mac.json:sta) ja kytkee SK:n esittelyt junaan 190. Sen jälkeen `tarkista-kohdekarttavarat.mjs iphone|ipad --pk`.

## Tämän session valmiit (14.10.)

- Kohdekarttojen pikselivara (karttavarat.mjs, tarkista-/korjaa-kohdekarttavarat.mjs, test) → #4576 → Julkaisijan #4582 (73/73 0 rikettä).
- PR #4579 lähdeluettelo (js/lahteet.js + README: IGN, LM, DHM, EA, ČÚZK, Mapterhorn, WorldCover, AERONET, IEM, Sentinel-2) — AUKI.
- Kippikaupungit Kööpenhaminan tasolle (Lontoo, Praha, Ateena; omistaja: Lontoo → Praha → Ateena kehityskaupungeiksi):
  - korkeus-lontoo-v2 (EA LIDAR) ja korkeus-praha-v2 (ČÚZK DMP 1G) ämpärissä + Valoseppä kytki. Ateena: ei avointa tarkkaa DSM:ää (GLO-30).
    Työkalu T7 `vesimaski/korkeus-ea.py` (--lahde ea|cuzk, suorakaideosat, --alin, kuoppamediaani).
  - Elävä kaupunki L/P/A (T7 `_tyo/karttaseppa/kaupunki-{lontoo,praha,ateena}-elava-20261014/`), Valoseppä kytki (GB/CZ/GR-lippukuviot).
    muodot-lontoo Q62408 + Elizabeth Tower 12 × 12 m, korkeus 98 → Valoseppä kytkee.
  - Ilmakehä + pilvet-v3 + vari-v3 + aerosoli-kaudet-v2 ämpärissä, kytketty. AVOIN: Lontoon/Prahan METAR vain < 5000 ft → pilvet vinossa (PT päättää).
- Pallokierrokset: Lontoo pallokierros-v3 (Trafalgar 172°/70–85 m) ämpärissä + kytketty. Josefov 340°/55–70 EI vielä (PT odottaa uutta ruutua).
  Ateena: kierros SK:lle (8 pysäkkiä) ja kamerat LS1:lle `_tyo/karttaseppa/ateena-pallokierros-kamerat-20261014.json` (LS1 → v7 + simu;
  SK:n korkeus_m 204/115 näyttää pituudelta).
- Vesi: Tampere v9 (Näsijärvi 96,0, Pyhäjärvi 78,4) kuitattu. Praha praha2 + index-v22 ämpärissä. Praha v3 (jokilisa myös Šítkov–Staroměstský
  -altaaseen, lat 50,0857) Valosepän testissä → hyväksynnän jälkeen praha3 + index-v23 vientiin (pohja index-v22).
- Työkalut (T7 vesimaski/, varmuuskopiot `.ennen-*-20261013/14`): vesirelaatiot.mjs ulkorenkaat + roolikokoaminen; vesipinta.mjs
  --jokilisa m[:S,W,N,E], OLETUKSENA pystyhelmat tasoportaisiin (--ei-helmoja) ja kalteva joki ei nelipuulohkoiksi.

## Avoimet

1. Loput 44 kohdekarttaa (yllä). 2. Praha v3 → Valosepän kuva → vienti. 3. Josefov → PT:n kuittaus → praha pallokierros-v3.
4. #4579 merge (Julkaisija). 5. Pilvivinouma (PT). 6. Levy: 4 wt poistettu 14.10. (~6,6 Gt).
