#!/bin/zsh
# Valoseppä 15.11. budjetti (raportti-5.md): perustalot koko kaupungista nyt vs. poistot poisOsm:ssa. Käyttö: budjetti-aja.zsh <tyokansio> (taulu-pois.json kansiossa = tulos/budjetti-taulu-pois.json).
S=${1:?tyokansio}
K=/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/vaihtelu-20261114; W=/Users/Shared/Claude/wt/proto-karttaseppa-tyokalu1/tyokalut/kaupunki; PY=/opt/homebrew/bin/python3
KJ=/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/koodijuna; L=/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/lontoo
U="env -u KATOT -u KATOT_SEINA -u KATOT_TARKKA -u KATOT_PALETTI -u KATOT_YMPARISTO -u KATOT_PALAT"
for t in kontrolli pois; do
  T=$K/taulu-uusi.json; [ $t = pois ] && T=$S/taulu-pois.json
  $=U KAUPUNKITAULU=$T KAUPUNKI=pariisi nice -n 10 $PY $W/tee_palat.py /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/pariisi-talot $S/p-$t $KJ/raivaus-1-1-montparnasse/korvaus-11.json $KJ/raivaus-1-1-petit-palais/siisti-v41.json > $S/p-$t.log 2>&1; echo "p-$t exit $?" >> $S/tila.txt
  $=U KAUPUNKITAULU=$T KAUPUNKI=lontoo nice -n 10 $PY $W/tee_palat.py $L/osm-d6 $S/l-$t $L/a/korvaa-tyhja.json $L/a/siisti-d6.json > $S/l-$t.log 2>&1; echo "l-$t exit $?" >> $S/tila.txt
done
echo LOPPU >> $S/tila.txt
