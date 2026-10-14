#!/bin/zsh
# PT 12.10. 18.5x: Cesium-tunnuksen vaihdon jälkeinen tarkistus. EI tulosta tunnusta: vain HTTP-koodit ja vastauksen pituus/tyyppi.
U=https://matkakirja-pollo.samireivinen.workers.dev/opas/tunnus
OT=$1; ID=$2   # natiiviotsakkeen nimi ja bundle id
f=$(mktemp); k=$(curl -s -o $f -w '%{http_code}' -H "$OT: $ID" -A "Matkakirja/1.0 $ID" "$U"); echo "natiivi: $k, vastaus $(wc -c < $f | tr -d ' ') tavua, avaimet: $(python3 -c 'import json,sys; d=json.load(open(sys.argv[1])); print(sorted(d.keys()) if isinstance(d,dict) else type(d).__name__)' $f 2>/dev/null), tiiviste $(python3 -c 'import json,sys,hashlib; print(hashlib.sha256(json.load(open(sys.argv[1]))["tunnus"].encode()).hexdigest()[:8])' $f 2>/dev/null)"
rm -f $f
k2=$(curl -s -o /dev/null -w '%{http_code}' -H 'Origin: https://evil.example' "$U"); echo "selain (vieras origin): $k2"
k3=$(curl -s -o /dev/null -w '%{http_code}' "$U"); echo "ilman otsakkeita: $k3"
