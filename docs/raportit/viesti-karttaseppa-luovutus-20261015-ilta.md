# Karttasepän luovutus 15.10.2026 klo 16.2x (konteksti 33 %, PT ja Postivahti)

Linjaukset: Raamattu + muisti `karttaseppa-tila-*` (päivän rivit 15.10.). VIESTIT aina `send_message` session id:llä tiedostosta
`/Users/Shared/Claude/osoitekirja.md` (uuden tilin id:t 15.10.: PT local_5df52e10…, Postivahti local_a24c43c0…, Valoseppä local_c238f4af…,
Pelikoodari local_7fcab04b…), PT:lle ≤ 3 riviä. Edellinen luovutus: `viesti-karttaseppa-luovutus-20261015.md` (0e8b2d67d).

## Aloitusviesti uudelle sessiolle

> Olet Karttaseppä (Opus, high). Aja git fetch origin, lue CLAUDE.md ja `git show <SHA>:docs/raportit/viesti-karttaseppa-luovutus-20261015-ilta.md`
> KOKONAAN (haara karttaseppa-tyo-20260922). Viestit send_messagella id:llä (osoitekirja.md), PT:lle ≤ 3 riviä. Jatka kohdasta 1.

## 1. KIERROSTEN MAASTO JA MAAMERKIT (PT 16.0x, omistaja 16.02: Lontoon, Prahan ja Ateenan hionta) — TEHTY, odottaa kuittausta

Läpilento datasta (ei simua: omistajan "vain automaattiset testit"), raportti ja kuvat `proto-3d/_tyo/karttaseppa/kierrostarkistus-20261015/`
(LUEMINUT.md, ateena-maanpinta-v1-v2.jpg, lontoo-maanpinta-v2-greenwich.jpg, tarkista.py, tulos-*.txt). PT:lle lähetetty 16.1x.
- **Ateenan maanpinta v2** (Akropolis/Filopappos/Lykabettos/vuoret ~50 m liian matalat → korjattu, T7 `vesimaski/maa-kukkulat.py`) ja
  **Lontoon maanpinta v2** (Greenwich +8,7 km oli ulkopuolella → itään +10 km): `_valmiit/maa-ateena-lontoo-v2-vienti-20261015` → Julkaisija.
  Natiivi poimii -v2:n itse (OmaKorkeus.MaaVersiot).
- **Tuulten tornin muoto**: natiivi wt `/Users/Shared/Claude/wt/proto-karttaseppa-kierrokset-194`, haara karttaseppa/kierrokset-194
  **5222f796b** (muodot-ateena.json + Q372717) → NS junaan 194 PT:n kuittauksella.
- **Avoin koodiehdotus** (LS1/Valoseppä, ei KS): korostuksen pohja DTM:stä — nyt DSM-kehä kelluu (Abbey +7, Petřín +14, Vyšehrad +9 m).
- Jos PT pyytää lisää: seuraavaksi näkyvimmät ovat koodissa; datassa ei avoimia vikoja (saumat, kuopat ja muotojen osumat ok).

## 2. Muut tämän vuoron erät (valmiit)

- **Pilvet-v4** (kippikaupungit SYNOPista, NOAA ISD AWS; v3:n METAR katkaisi Lontoon/Prahan < 1500 m): `_valmiit/ilmakeha-pilvet-v4-vienti-20261015`,
  Valoseppä kytki linssiseppa2/pilvet-v4-193 7908e421a; lähderivi #4579 (MERGED). Työkalut T7 `isd-pilvet/`.
- **Pysäkit 193b**: Bern (Valais), Bratislava (Nitra), Podgorica (Berane) siirrettyinä maan sisällä, PT (a): San Marino ja Andorra kevyiksi.
  629658db2, wt `/Users/Shared/Claude/wt/karttaseppa-paakaupungit-pysakeiksi-193b` → Pelikoodari yhdistää pelikoodari-pysakit-193b:hen.
  Punaiset SK:lle/PK:lle (kysymykset, tiedot, saapumistekstit, fokusvirrat, natiivin kultaiset). Sveitsin eläintäky Vaudiin 46,55/6,5.
- **Kööpenhaminan maanpinta v3** (DHM Terræn 2 m + 5 m ±8 km, `korkeus-dhm.py --maa`): `_valmiit/maa-koopenhamina-dhm-v3-vienti-20261015`,
  PT kuittasi junaan 194.
- #4609 ja #4579 MERGED; niiden worktreet poistettu.

## 3. Worktreet (poista kun mergetty)

karttaseppa-paakaupungit-pysakeiksi-193b (PK:n haara junassa), proto-karttaseppa-kierrokset-194 (NS:n junassa),
proto-karttaseppa-iss-skanneri-193 (NUI yhdisti omaan haaraansa; poista kun NUI:n iss-haara on junassa).

## Muistiinpanot

- Googlen laatoista ei mitata mitään; robots.txt ennen skriptattua hakua (NCEI /data kielletty → AWS-kopio; Wikidata EntityData sallittu).
- Ateenalle ei tarkempaa avointa DEM:iä (Mapterhornissa ei Kreikkaa, Ktimatologion lisenssi epäselvä) — älä selvitä uudelleen.
- Natiivirepo: /Users/Shared/Claude/proto-3d/Matkakirja-proto (remote natiivi-backup), omat haarat karttaseppa/<aihe>, NS kokoaa junat.
