#!/bin/sh
# Varmuuskopioi proto-3d:n ja pelilogiikan (natiivi-peli) kaikki haarat
# yksityiseen GitHub-repoon ravelius/Matkakirja-natiivi.
# Kutsutaan: 1) jokaisen master-haaran mergen jälkeen (post-merge-koukku
# kummassakin paikallisessa gitissä), 2) käsin tarvittaessa.
set -e
PROTO=/Users/Shared/Claude/proto-3d/Matkakirja-proto
PELI=/Users/Shared/Claude/natiivi-peli

for repo_polku_etuliite in "$PROTO proto" "$PELI pelilogiikka"; do
  set -- $repo_polku_etuliite
  polku="$1"; etuliite="$2"
  [ -d "$polku/.git" ] || continue
  git -C "$polku" remote get-url natiivi-backup >/dev/null 2>&1 \
    || git -C "$polku" remote add natiivi-backup https://github.com/ravelius/Matkakirja-natiivi.git
  git -C "$polku" push natiivi-backup "refs/heads/*:refs/heads/$etuliite/*" --quiet
done
echo "Varmuuskopiointi valmis: $(date -u +%FT%TZ)"
