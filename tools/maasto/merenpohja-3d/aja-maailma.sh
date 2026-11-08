#!/bin/zsh
# Merenpohja 3D koko maailma z0–9 (KS 8.11.2026, KK:n sana 10.3x; --naytetaso 9 NS:n helmaraosta, PT 10.3x): 8 osaa rinnakkain, sitten layer.json
W=/Users/Shared/Claude/wt/karttaseppa-merenpohja
D=/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/merenpohja-3d
U=/Users/Shared/Claude/proto-3d/_tyo/karttaseppa-merenpohja-laatat/maailma-20261108
H=/Users/Shared/Claude/proto-3d/_tyo/karttaseppa-kohokartta-raaka/maailma-3d15.json
Y=(--raaka $H --ulos $U --alue -180,-90,180,90 --maailma 9 --tasot 0-9 --versio 2026-11-08-merenpohja)
for i in 0 1 2 3 4 5 6 7; do
  node $W/tools/maasto/tee-maasto.mjs $Y --virhekerroin 0.25 --dem-normaalit --korostus 15 --korostus-alas --naytetaso 9 --osa $i/8 > $D/maailma-osa$i.log 2>&1 &
done
wait
grep -h "^valmis" $D/maailma-osa*.log
node $W/tools/maasto/tee-maasto.mjs $Y --luettelo > $D/maailma-luettelo.log 2>&1
echo "MAAILMA VALMIS $?"
