# Karttaseppä: luovutus 1.11.2026 klo 05.03 (KS local_740947d7)
Edellinen luovutus on viesti-karttaseppa-luovutus-20261101-0444.md, ja sen kohdat 1–5 on nyt tehty. Kaikki työkansiot ovat polun
`/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-pohja/` alla (= P). Codexin kuvat ja posti ovat polussa
`/Users/Shared/Claude/wt/karttaseppa-postilaatikko/` (haara seuraa claude/postilaatikkoa; push `git push origin HEAD:claude/postilaatikko`).
Luovutuksen syy: konteksti 25 % (pehmeä raja).

## 1. PARIISI 1 m/px: POHJA 97/97 VALMIS, PT KUITTASI KOOSTEEN (PT 05.4x: "kuitattu, hieno. PT vie KK:lle")
- Erät 3–6 on tarkistettu (`era-qa.py`, v2-maskit) ja kuitattu Codexille: 86d1ad110 (erät 3–4) ja 013b5feba (erät 5–6).
  Kuusi uutta maamerkkiä on kuitattu: cf0ef8abf. Tarkistuskansiot: `P/codex-pseudo3d/tarkistus-1m-era{3,4,5,6}-*`.
- PT:n tietämät hyväksytyt poikkeamat: Seine on Bois de Boulognen länsireunalla kapea (r04-c01/c02, r05-c01, r06-c01), ja
  Bois de Vincennesin tiet ovat hiekanvärisiä.
- **Kooste** `P/codex-pseudo3d/kooste-97-20261101/` (MUISTIO.md, 1-4, 1-2, 1:1-rajaukset ja G:n rinnalla).
  Muutokset `P/kooste-1m.py`:ssä (varmuuskopio `P/kooste-1m.ennen-paperi-20261101.py`):
  1. paperihäivytys kaupungin rajaa pitkin, kuten renderoi-g6 (PT:n 05.0x-havainto on korjattu);
  2. Pont Alexandre III:n pylväs sillan neljään kulmaan;
  3. uusien maamerkkien jalusta jalanjäljen eteläreunaan;
  4. **pelivienti**: `KOOSTE_PELI=<kansio>` kirjoittaa samaan muotoon kuin kokoa-g.py.
- Ajokomento (75 s, noin 17 Gt muistia):
  `KOOSTE_PELI=P/kokoelma/G1m python3 P/kooste-1m.py <wt>/proto-3d/_tyo/codex/pariisi-1m
  P/codex-pseudo3d/ohjeet-1m-loput88,<wt>/posti/karttaseppa-codex-pariisi-1m-lohko1-20261101 P/codex-pseudo3d/vesimaskit-v2
  P/codex-pseudo3d/kerros-1m <wt>/proto-3d/_tyo/codex/pariisi-spritet P/codex-pseudo3d/kooste-97-20261101/pariisi-1m-kooste`
  (`<wt>` = postilaatikko-wt).

## 2. SEURAAVA TYÖ: PELIKYTKENTÄ (PT 05.4x: "Jatka pelikytkentään (natiivi + web); kuvat iPadilta/selaimesta PT:lle")
- **Valmis aineisto: `P/kokoelma/G1m/`** (42 Mt): `natiivi/<r>-<c>.jpg` + `-maski.jpg` (55 laattaa, 2048 px, res 2 -kangas
  20736 × 9728) + `natiivi/natiivi.json`, rajat samat kuin koe-mallissa (pohjoinen 48.905348, etelä 48.801845,
  länsi 2.221391, itä 2.504519) ja `web-5184.webp`. Laattoja ei ole vielä katsottu yksitellen: avaa pari (esim. 2-4, 3-5) ennen vientiä.
- **Natiivi** (luovutus 20261031-2210, kohta 4): proto-repon paikallinen haara `karttaseppa/piirros-pariisi-216`, kärki
  c7700d99c (PiirrosKerros.cs, vakiot 20736 × 9728 ja 2048 täsmäävät). Aineisto ladataan polusta
  `media.matkakirja.app/kohtaamiset/piirroskartta/pariisi/`; kehityksessä `MATKAKIRJA_PIIRROS=<kansio>` (osoita P/kokoelma/G1m/natiivi).
  Tarkista ensin, onko haara jo yhdistetty juna 216:n runkoon (NS:n runko bb115574d) ja onko vie-assetit-perhe
  "piirroskartta" lisätty. Media-vienti on julkaisu (muistisääntö "Media-vienti = julkaisu"): PK vahvistaa viittaukset ennen vientiä.
- **Web** (sama luovutus, kohta 5): haara `karttaseppa-pariisi-piirros` f9657ff11. Vaihda kuva `web-5184.webp` →
  `assets/kartat/pariisi-piirroskartta.webp` (kansion ulkopuolelle, katso ohje siellä) ja poista koelaatat.
- **Valmis-ehto**: webin ja natiivin PR:t, NS yhdistää junaan, ja simusta/iPadilta sekä selaimesta kuvapari G:n
  rinnalle PT:lle. Juna 216 lähtee, kun Pariisin kartta on pelissä valmis (omistaja 31.10. klo 21.08).

## 3. MUUT AVOIMET (ennallaan)
- Maaston 2026-09-24 → 2026-10-29 -vaihdon pieni PR (luovutus 20261031-2325, kohta 4). 60 FPS koe D ei mene junaan.
- Levyllä on vapaata 74 Gi: älä tallenna koko kaupungin 1x-kuvia (kooste tallentaa vain 1/2, 1/4, rajaukset ja laatat).
- Postilaatikko-wt säilytetään, kunnes Pariisi on pelissä.
