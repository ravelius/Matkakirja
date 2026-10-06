#!/bin/zsh
# Pää + Faceit-ilmeet kaikille linnan hahmoille (Linnanrakentaja 6.10.2026; Päätoimittaja hyväksyi vouti-kokeen 14.5x).
# Lähde mixamo-v4 (leikkeet + esineet) → paa-v2/<hahmo>.glb. Skriptit tässä kansiossa: {hahmo_paa,faceit_paa,faceit_leivo}.py
B=/Applications/Blender.app/Contents/MacOS/Blender; D=/Users/Shared/Claude/proto-3d/_valmiit/linna-hahmot; P=${0:A:h}
L=${LAHDE:-mixamo-v4}; U=$D/${ULOS:-paa-v2}; mkdir -p $U   # 7.10.: LAHDE=mixamo-v5 ULOS=faceit-v2
T=${TMPDIR:-/tmp}/faceit-paa; mkdir -p $T
for h in "$@"; do
  n=${h%%:*}; liput=(); [[ $h == *:nainen ]] && liput=(--nainen)
  nice -n 15 $B -b --factory-startup -P $P/hahmo_paa.py -- $D/$L/$n.glb $T/$n-paa.glb $liput 2>&1 | grep -E "^PAA |Error|Traceback" | sed "s#^#$n: #"
  nice -n 15 $B -b -P $P/faceit_paa.py -- $T/$n-paa.glb x --blend $T/$n.blend $liput 2>&1 | grep -E "^FACEIT (maamerkit|vaihe)|VIRHE|Traceback" | sed "s#^#$n: #"
  nice -n 15 $B -b $T/$n.blend -P $P/faceit_leivo.py -- $U/$n.glb 2>&1 | grep -E "^LEIVO (valmis|.*_paa:)|Traceback" | cut -c1-90 | sed "s#^#$n: #"
done
echo PAA_V2_VALMIS
