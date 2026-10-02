#!/bin/zsh
# Linnan skinnatut hahmot, erä 1 (Linnanrakentaja 2.10.2026): henkilö | asu | paidan väri (henkilot.js vaate) | lisäliput
S=/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-linnanrakentaja/d8961c2f-90a2-4ad4-958a-3d12f9b25b51/scratchpad/liike
L=/Users/Shared/Claude/proto-3d/_lahteet; Q="$L/quaternius-asut/Modular Character Outfits - Fantasy[Standard]/Exports/glTF (Godot-Unreal)/Outfits"
U=/Users/Shared/Claude/proto-3d/_valmiit/linna-hahmot/v1; mkdir -p $U $S/savyt
BL=/Applications/Blender.app/Contents/MacOS/Blender
tee() {  # nimi asu vari alue lisäliput...
  local n=$1 asu=$2 vari=$3; shift 3
  local tex korv
  if [[ $asu == *Ranger* ]]; then tex=T_Ranger_BaseColor; python3 $S/savyta.py "$Q/T_Ranger_BaseColor.png" $S/savyt/$n-ranger.png vihrea $vari >/dev/null; korv="T_Ranger_BaseColor=$S/savyt/$n-ranger.png"
  else python3 $S/savyta.py "$Q/T_Peasant_BaseColor.png" $S/savyt/$n-peasant.png paita $vari >/dev/null; korv="T_Peasant_BaseColor=$S/savyt/$n-peasant.png"
    python3 $S/savyta.py "$Q/T_Ranger_BaseColor.png" $S/savyt/$n-ranger.png vihrea $vari >/dev/null; korv="$korv,T_Ranger_BaseColor=$S/savyt/$n-ranger.png"; fi
  $BL -b -P $S/vartija.py -- "$Q/$asu.gltf" $U $n --korvaa $korv --kolmiot 9000 --vain-perusvari --perusvari 512 --kirkkaus 1.35 "$@" 2>&1 | grep -E "^HAHMO|Error|Traceback" | cut -c1-90
}
tee talonpoika-1500 Male_Peasant '#7b6a52' --lisa Male_Ranger_Head_Hood --parta --hiusvari 0.48,0.37,0.27
tee renki-1500 Male_Peasant '#4f5d3a' --lisa Male_Ranger_Head_Hood --hiukset Hair_Buzzed --hiusvari 0.45,0.35,0.26 --tyo PickUp_Table
tee soutaja-1500 Male_Peasant '#6f7a8a' --parta --hiukset Hair_Buzzed --hiusvari 0.45,0.35,0.26 --tyo Push_Loop
tee vesipoika-1500 Male_Peasant '#5a4a6e' --lisa Male_Ranger_Head_Hood --hiukset Hair_Buzzed --hiusvari 0.5,0.38,0.27
tee kokki-1500 Male_Peasant '#7a3b2e' --parta --hiukset Hair_Buzzed --hiusvari 0.4,0.3,0.22
tee kirjuri-1500 Male_Peasant '#2f4560' --hiukset Hair_Buzzed --hiusvari 0.42,0.32,0.24 --tyo Sitting_Idle_Loop
tee kappalainen-1500 Male_Peasant '#2a2624' --hiukset Hair_Buzzed --hiusvari 0.8,0.78,0.74
tee vouti-1500 Male_Ranger '#8a2e20' --pois Hood --parta --hiukset Hair_Buzzed --hiusvari 0.38,0.29,0.22 --tyo Idle_Talking_Loop
tee portinvartija-1500 Male_Ranger '#5a4a3a' --pois Pauldron,Bracer --parta --hiusvari 0.5,0.4,0.3
tee apulainen-1500 Female_Peasant '#4f5d3a' --nainen --lisa Female_Ranger_Head_Hood --hiusvari 0.5,0.38,0.27
echo ERA_VALMIS
