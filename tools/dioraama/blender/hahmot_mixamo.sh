#!/bin/zsh
# Linnan 11 hahmoa Mixamo-leikkeillä (Linnanrakentaja 5.10.2026; omistajan päätös 10.50 ja 12.30: laajennus kaikille).
# Lähde: v26:n hahmot (hahmo_skin.py, UAL-leikkeet) → hahmo_mixamo.py korvaa natiivin leikkeet idle, puhe ja tyo.
# Kävely pysyy UAL:n (natiivin askelpituus mitattu siitä). Kokki, apulainen, renki ja kirjuri pitävät UAL-työleikkeen (Mixamossa ei
# vastinetta: stirring, cooking, sweeping eivät löytyneet 5.10.). Pitkät leikkeet lyhennetään silmukaksi (:<s>).
#   tools/dioraama/blender/hahmot_mixamo.sh <ulos-kansio>
set -euo pipefail
U=${1:?anna ulos-kansio}; mkdir -p $U
B=/Applications/Blender.app/Contents/MacOS/Blender; H=${0:A:h}
V=/Users/Shared/Claude/proto-3d/_valmiit/olavinlinna-blender-v26/hahmot; M=/Users/Shared/Claude/proto-3d/_lahteet/mixamo
YHT=("$M/Breathing Idle.fbx=hengitys:12" "$M/Talking.fbx=puhe_m:12")
tee() {  # nimi [lisäleikkeet...] -- korvaukset
  local n=$1; shift; local l=() k=""
  while [ $# -gt 0 ] && [ "$1" != -- ]; do l+=("$1"); shift; done; shift; k=$1
  nice -n 15 $B -b --factory-startup -P $H/hahmo_mixamo.py -- $V/$n.glb $U/$n.glb $YHT $l --korvaa $k 2>&1 | grep -E "^MIXAMO valmis|Error|Traceback" | sed "s#^#$n: #" | cut -c1-160
}
tee kappalainen-1500 "$M/Praying.fbx=rukous" "$M/Sitting Idle.fbx=istuu:12" "$M/Sitting Talking.fbx=istuu_puhe:12" -- idle=hengitys,puhe=puhe_m,tyo=rukous
tee kirjuri-1500 -- idle=hengitys,puhe=puhe_m  # työ UAL: kirjuri seisoo pulpetin ääressä (istuva Writing leijui 5.10.)
tee vouti-1500 "$M/Pointing Forward.fbx=osoitus:12" -- idle=hengitys,puhe=puhe_m,tyo=osoitus
tee vartija-1500 "$M/Looking Around.fbx=katselu_m:12" -- idle=hengitys,puhe=puhe_m,tyo=katselu_m
tee portinvartija-1500 "$M/Looking Around.fbx=katselu_m:12" -- idle=hengitys,puhe=puhe_m,tyo=katselu_m
tee talonpoika-1500 "$M/Picking Up.fbx=nosto:12" -- idle=hengitys,puhe=puhe_m,tyo=nosto
tee vesipoika-1500 "$M/Picking Up.fbx=nosto:12" -- idle=hengitys,puhe=puhe_m,tyo=nosto
tee soutaja-1500 "$M/Paddling.fbx=melonta:12" -- idle=hengitys,puhe=puhe_m,tyo=melonta
tee kokki-1500 -- idle=hengitys,puhe=puhe_m
tee renki-1500 -- idle=hengitys,puhe=puhe_m
tee apulainen-1500 -- idle=hengitys,puhe=puhe_m
echo "HAHMOT_VALMIS $(ls $U/*.glb | wc -l | tr -d ' ') glb, $(du -sh $U | cut -f1)"
