#!/bin/zsh
# Välitaso Z9–Z10 koko ketju (KS 3.11.2026): odottaa planeetan latauksen, tarkistaa md5:n, suodattaa, purkaa ja piirtää.
O="/Volumes/T7 4TB/Matkakirja-karttaseppa/valitaso-osm"
V=/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/valitaso-20261103
PY="/Volumes/T7 4TB/Matkakirja-karttaseppa/venv-kartta/bin/python"
P=/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/tasangot-poltto-20261027/delta/lavastus
Z10=/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/valitaso-20261103/pallo-z10.json
until [ -s "$O/planet.osm.pbf" ]; do pgrep -f "planet.osm.pbf.osa" >/dev/null || { sleep 5; [ -s "$O/planet.osm.pbf" ] && break; pgrep -f "lataa.zsh" >/dev/null && continue; echo "VIRHE lataus loppui ilman tiedostoa"; exit 1; }; sleep 20; done
echo "$(date +%H.%M) md5…"
odotettu=$(awk '{print $1}' "$O/planet-latest.osm.pbf.md5"); saatu=$(md5 -q "$O/planet.osm.pbf")
[ "$odotettu" = "$saatu" ] || { echo "VIRHE md5 $saatu != $odotettu"; exit 1; }
echo "$(date +%H.%M) md5 ok, suodatus…"
"$PY" -I $V/suodata.py "$O/planet.osm.pbf" "$O/valitaso.osm.pbf" 2>&1 | grep -E "VALMIS|suodatettu|Error|error|Traceback" || exit 1
[ -s "$O/valitaso.osm.pbf" ] || { echo "VIRHE suodatus"; exit 1; }
echo "$(date +%H.%M) purku… $(stat -f %z "$O/valitaso.osm.pbf")"
"$PY" -I $V/pura.py "$O/valitaso.osm.pbf" "$O/eurooppa.npz" 2>&1 | grep -v -E "^[0-9.]+ [0-9]+$" || exit 1
[ -s "$O/eurooppa.npz" ] || { echo "VIRHE purku"; exit 1; }
echo "$(date +%H.%M) piirto…"
PROSESSEJA=8 "$PY" -I $V/piirra2.py "$O/eurooppa.npz" $P $V/sarja $Z10 2>&1 | grep -E "VALMIS|laattoja|ladattu|000/|Error|error|Traceback"
echo "$(date +%H.%M) KETJU LOPPUI"
