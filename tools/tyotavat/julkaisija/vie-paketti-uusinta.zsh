#!/bin/zsh
# Ajaa vie-paketti.sh:n uudelleen, kunnes se onnistuu (paluu 0) tai yrityksiä on 8 (13.10.2026: osat kaatuvat paluuarvoon 139 kuormassa).
# Käyttö: vie-paketti-uusinta.zsh <paketti> [--osa=I/N]. Olemassa olevat objektit ohitetaan, joten uusinta jatkaa siitä mihin jäi.
for i in {1..8}; do
  /Users/Shared/Claude/julkaisija-tyokalut/vie-paketti.sh "$@" && exit 0
  echo "$(date '+%Y-%m-%d %H:%M') uusinta $i/8 (paluu $?)"
  sleep 10
done
exit 1
