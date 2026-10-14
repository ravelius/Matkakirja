#!/bin/zsh
# Julkaisija 14.10.2026: vientipaketin CDN-tarkistus. zsh tarkista-cdn.zsh <paketti> [max tiedostoja, oletus 8]
# Jokaiselle SHA256SUMS-riville (enintään max, tasavälein): HTTP-koodi ja SHA media.matkakirja.app:sta. Tulostaa yhteenvedon.
D=$1; MAX=${2:-8}; ok=0; vika=0
rivit=(${(f)"$(grep -v '^#' $D/SHA256SUMS)"}); n=${#rivit}; askel=$(( n > MAX ? n / MAX : 1 ))
for (( i = 1; i <= n; i += askel )); do
  e=${rivit[i]%% *}; f=${${rivit[i]#*  }#./}
  koodi=$(curl -s -o /dev/null -w '%{http_code}' "https://media.matkakirja.app/$f")
  g=$(curl -s "https://media.matkakirja.app/$f" | shasum -a 256 | cut -d' ' -f1)
  if [[ $koodi == 200 && $e == $g ]]; then (( ok++ )); else (( vika++ )); print -r -- "VIKA $koodi $f"; fi
done
print -r -- "CDN $ok OK, $vika vikaa ($n tiedostoa paketissa)"
