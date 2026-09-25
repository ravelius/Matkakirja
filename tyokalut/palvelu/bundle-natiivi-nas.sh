#!/bin/sh
# Yöllinen git bundle -varmuuskopio proto-3d:sta ja pelilogiikasta NASiin.
# Bundle sisältää KAIKKI haarat kokonaisena gittinä (eri asia kuin GitHub-
# varmuuskopio, joka on vain remote-osoite — bundle toimii offline/NAS-vain
# -tilanteessakin).
set -e
NAS=/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/natiivi-git-bundlet
PVM=$(date -u +%Y%m%d)
[ -d /Volumes/NAS-Homes ] || { echo "NAS ei ole liitetty, ohitetaan"; exit 0; }
mkdir -p "$NAS"

git -C /Users/Shared/Claude/proto-3d/Matkakirja-proto bundle create \
  "$NAS/proto-3d-$PVM.bundle" --all
git -C /Users/Shared/Claude/natiivi-peli bundle create \
  "$NAS/pelilogiikka-$PVM.bundle" --all

# Säilytä 30 vrk, siivoa vanhemmat.
find "$NAS" -maxdepth 1 -name '*.bundle' -mtime +30 -delete

echo "Bundlet valmiit: $(date -u +%FT%TZ)"
