#!/bin/zsh
# LAV 6.11.: koejuuri-levyt7, kivireunus-sivut, 10 kuvaa, vain Mac, JU:n vuorolla. Ei vientiä.
P=${0:A:h}; cd /Users/Shared/Claude/wt/proto-pelikoodari-tarkastelu || exit 2
export PROTO_LINJA=${1:-1}
R=$(nice -n 15 zsh tyokalut/esikatselu.sh ${2:?sha} $P/sk-levyt7p.txt 2>&1 | tail -1); print "$R"; E=${R##* }
mkdir -p $P/kuvat-levyt7p; cp $E/*.png $E/loki.txt $E/unity.log $P/kuvat-levyt7p/ 2>/dev/null
grep -E "^MATKAKIRJA juoksupeli: .* puuttuu" $P/kuvat-levyt7p/unity.log | sed -E 's#^MATKAKIRJA juoksupeli: ##; s# puuttuu.*##; s#^file:///.*/koejuuri-[^/]*/##; s#^https://media.matkakirja.app/juoksupeli/#media:#' | sort -u > $P/kuvat-levyt7p/404.txt
print "404: $(wc -l < $P/kuvat-levyt7p/404.txt | tr -d ' ') tiedostoa ($P/kuvat-levyt7p/404.txt)"
print "LEVYT7P AJETTU $(date +%H.%M) $P/kuvat-levyt7p"
