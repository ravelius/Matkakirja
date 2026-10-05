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
# Seisonta ja puhe hahmoittain (omistaja 5.10. klo 14.3x "liikkeet outoja": kaikilla sama Breathing Idle ja Talking näytti kloonilta).
# Saman huoneen hahmoilla eri leikkeet; pitkät leikkeet 12 s:n silmukoiksi.
# Eleet (Kevin Iglesias Human Basic Motions, omistaja osti 5.10.; FBX:t _lahteet/kevin-iglesias-hbm/fbx, ei repossa): kertaliikkeet,
# natiivi soittaa vuoron ele-kentän mukaan (kohtaukset-v3.js). Vain hahmon vuoroissa käytetyt eleet.
K=/Users/Shared/Claude/proto-3d/_lahteet/kevin-iglesias-hbm/fbx
E() { local s=$1; shift; for e in "$@"; do case $e in
  kumarrus) echo "$K/Human$s@Reverence01.fbx=ele_kumarrus";; kysymys) echo "$K/Human$s@Question01.fbx=ele_kysymys";;
  nyokkays) echo "$K/Human$s@HeadNod01.fbx=ele_nyokkays";; pudistus) echo "$K/Human$s@HeadShake01.fbx=ele_pudistus";;
  puhe1) echo "$K/Human$s@Talk01.fbx=ele_puhe1";; puhe2) echo "$K/Human$s@Talk02.fbx=ele_puhe2";; puhe3) echo "$K/Human$s@Talk03.fbx=ele_puhe3";; esac; done; }
BI="$M/Breathing Idle.fbx"; BO="$M/Bored.fbx"; UI="$M/Unarmed Idle.fbx"; OM="$M/Old Man Idle.fbx"
TA="$M/Talking.fbx"; GC="$M/Talking General Conversation.fbx"; OH="$M/Talking One Hand Question.fbx"; AR="$M/Standing Arguing.fbx"
tee() {  # nimi idle-fbx puhe-fbx [lisäleikkeet...] -- korvaukset
  local n=$1 i=$2 p=$3; shift 3; local l=() k=""
  while [ $# -gt 0 ] && [ "$1" != -- ]; do l+=("$1"); shift; done; shift; k=$1
  nice -n 15 $B -b --factory-startup -P $H/hahmo_mixamo.py -- $V/$n.glb $U/$n.glb "$i=hengitys:12" "$p=puhe_m:12" $l --korvaa $k 2>&1 | grep -E "^MIXAMO valmis|Error|Traceback" | sed "s#^#$n: #" | cut -c1-160
}
tee kappalainen-1500 "$OM" "$GC" "$M/Praying.fbx=rukous:12" "$M/Sitting Idle.fbx=istuu:12" "$M/Sitting Talking.fbx=istuu_puhe:12" ${(f)"$(E M puhe1 puhe2)"} -- idle=hengitys,puhe=puhe_m,tyo=rukous
tee kirjuri-1500 "$BI" "$OH" ${(f)"$(E M puhe1 puhe2 puhe3 kysymys)"} -- idle=hengitys,puhe=puhe_m  # työ UAL: kirjuri seisoo pulpetin ääressä (istuva Writing leijui 5.10.)
tee vouti-1500 "$BO" "$AR" "$M/Pointing Forward.fbx=osoitus:12" ${(f)"$(E M kumarrus kysymys)"} -- idle=hengitys,puhe=puhe_m,tyo=osoitus
tee vartija-1500 "$BO" "$TA" "$M/Looking Around.fbx=katselu_m:12" ${(f)"$(E M puhe1 puhe2 pudistus)"} -- idle=hengitys,puhe=puhe_m,tyo=katselu_m
tee portinvartija-1500 "$BI" "$GC" "$M/Looking Around.fbx=katselu_m:12" -- idle=hengitys,puhe=puhe_m,tyo=katselu_m
tee talonpoika-1500 "$UI" "$TA" "$M/Picking Up.fbx=nosto:12" ${(f)"$(E M puhe1 puhe2)"} -- idle=hengitys,puhe=puhe_m,tyo=nosto
tee vesipoika-1500 "$UI" "$OH" "$M/Picking Up.fbx=nosto:12" ${(f)"$(E M nyokkays)"} -- idle=hengitys,puhe=puhe_m,tyo=nosto
tee soutaja-1500 "$BI" "$GC" "$M/Paddling.fbx=melonta:12" ${(f)"$(E M puhe1 pudistus)"} -- idle=hengitys,puhe=puhe_m,tyo=melonta
tee kokki-1500 "$BO" "$AR" ${(f)"$(E M puhe1 puhe3)"} -- idle=hengitys,puhe=puhe_m
tee renki-1500 "$UI" "$OH" ${(f)"$(E M puhe2 kumarrus)"} -- idle=hengitys,puhe=puhe_m
tee apulainen-1500 "$BI" "$GC" ${(f)"$(E F puhe3)"} -- idle=hengitys,puhe=puhe_m
echo "HAHMOT_VALMIS $(ls $U/*.glb | wc -l | tr -d ' ') glb, $(du -sh $U | cut -f1)"
