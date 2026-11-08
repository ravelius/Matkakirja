#!/bin/zsh
# Merenpohja 3D koealue 2 (--naytetaso 9: karkeiden tasojen reunat z9:n näytteistä, NS:n helmarako) (KS 8.11.2026): 8 osaa rinnakkain, sitten layer.json
W=/Users/Shared/Claude/wt/karttaseppa-merenpohja
D=/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/merenpohja-3d
U=$D/koe2-20261108
H=/Users/Shared/Claude/proto-3d/_tyo/karttaseppa-kohokartta-raaka/maailma-3d15.json
Y=(--raaka $H --ulos $U --laatat $D/lista-koe.txt --tasot 0-9 --versio 2026-11-08-merenpohja-koe)
for i in 0 1 2 3 4 5 6 7; do
  node $W/tools/maasto/tee-maasto.mjs $Y --virhekerroin 0.25 --dem-normaalit --korostus 15 --korostus-alas --naytetaso 9 --osa $i/8 > $D/koe2-osa$i.log 2>&1 &
done
wait
node $W/tools/maasto/tee-maasto.mjs $Y --luettelo > $D/koe2-luettelo.log 2>&1
echo "KOE VALMIS $?"
