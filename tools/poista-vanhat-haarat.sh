#!/usr/bin/env bash
#
# Poistaa vanhat, jo mergatut tyohaarat GitHubista.
#
# MIKSI: repon koko oli 23.8.2026 kasvanut 2031 Mt:aan (GitHubin suositus
# on 1 Gt). Syy on dist/matkakirja.html ja dist/matkakirja.partial.html
# (10,7 Mt kumpikin), jotka oli committoitu 973 committiin ennen kuin
# dist/ lisattiin .gitignoreen — yhteensa 1756 blobia, 10,3 Gt raakana.
#
# Mainin OMASSA historiassa ei ole yhtaan dist-committia, joten historiaa
# EI tarvitse kirjoittaa uusiksi. Paisuma on kokonaan vanhoissa haaroissa:
# 241 haarasta 235 kantoi dist-committeja.
#
# TATA EI VOI AJAA agenttiymparistossa: sielta on estetty seka
# "git push --delete" etta GitHubin REST-rajapinnan kirjoitus. Aja tama
# omalla koneellasi, jossa on gh- tai git-tunnukset.
#
#   bash tools/poista-vanhat-haarat.sh          # nayttaa mita poistaisi
#   bash tools/poista-vanhat-haarat.sh --poista # poistaa oikeasti
#
# HELPOMPI TAPA ilman omaa konetta (myos puhelimella ja tabletilla):
# GitHub → Actions → "Siivoa vanhat haarat" → Run workflow. Se tekee
# saman samoilla suojasaannoilla. Ks. .github/workflows/siivoa-haarat.yml.
#
# SUOJATUT: main, julisteet-vienti (herokuvien vientiputki), avoimien
# PR:ien haarat seka kaikki haarat joissa on committeja viimeisen
# NELJAN vuorokauden ajalta (rinnakkaiset sessiot).
#
# HUOM: haarojen poisto tekee objekteista saavuttamattomia, mutta GitHub
# ajaa roskienkeruun omaan tahtiinsa. Jos koko ei pienene muutamassa
# paivassa, sita voi pyytaa GitHubin tuelta.

set -euo pipefail

PAIVIA=4
SUOJATUT_LISAT="${SUOJATUT_LISAT:-claude/julisteet-vienti}"

git fetch --prune origin

# Avoimien PR:ien haarat suojaan (vaatii gh:n; ilman sita lisaa kasin
# ymparistomuuttujaan SUOJATUT_LISAT valilyonnilla eroteltuna).
AVOIMET=""
if command -v gh >/dev/null 2>&1; then
  AVOIMET=$(gh pr list --state open --json headRefName --jq '.[].headRefName' 2>/dev/null || true)
fi

RAJA=$(date -d "$PAIVIA days ago" +%Y-%m-%d 2>/dev/null || date -v-${PAIVIA}d +%Y-%m-%d)

suojattu() {
  local h="$1"
  [ "$h" = "main" ] && return 0
  for s in $AVOIMET $SUOJATUT_LISAT; do [ "$h" = "$s" ] && return 0; done
  return 1
}

LISTA=$(git for-each-ref --format='%(committerdate:short) %(refname:short)' refs/remotes/origin \
  | grep -v 'origin/HEAD' \
  | awk -v r="$RAJA" '$1 < r {sub(/^origin\//, "", $2); print $2}')

POISTETTAVAT=()
for h in $LISTA; do
  suojattu "$h" || POISTETTAVAT+=("$h")
done

echo "Poistettavia haaroja: ${#POISTETTAVAT[@]}"
printf '  %s\n' "${POISTETTAVAT[@]}"

if [ "${1:-}" != "--poista" ]; then
  echo
  echo "Tama oli kuiva ajo. Aja --poista kun lista nayttaa oikealta."
  exit 0
fi

# Poisto eraissa: git push ottaa monta refspecia kerralla, mika on
# huomattavasti nopeampaa kuin haara kerrallaan.
ERA=50
for ((i=0; i<${#POISTETTAVAT[@]}; i+=ERA)); do
  git push origin --delete "${POISTETTAVAT[@]:i:ERA}"
done

echo "Valmis. Tarkista koko: GitHub → Settings, tai pelissä KIINTIOT-nakyma."
