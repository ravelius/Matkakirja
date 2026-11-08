# Merenpohja 3D, poltto-skriptit (Karttaseppä 8.11.2026)

Kopiot ajossa käytetyistä skripteistä (koneen polut sellaisinaan, eivät ole työnkulkuja):
- `tee-3d15.py`: kenttä z = GLO > 1e-3 ? GLO : min(0, ETOPO 2022 15″), syvyys silotettu 6 km, int16 = m·2.
- `tee-lista.mjs`, `aja-koe.sh`, `aja-koe2.sh`, `aja-maailma.sh`: laattojen poltto `tools/maasto/tee-maasto.mjs --raaka --korostus 15 --korostus-alas --naytetaso 9`.
- `tee-vienti.py`: vientipaketti (kovalinkit, SHA256SUMS, LAHTEET.md) JU:lle.
- `varjo.py`: kenttäparien varjostus.
Raportti: /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/merenpohja-3d/RAPORTTI.md.
