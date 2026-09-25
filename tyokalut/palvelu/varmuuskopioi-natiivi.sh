#!/bin/zsh
# Varmuuskopioi proto-gitin (natiivi peli; pelilogiikka on Assets/Matkakirja/Peli) GitHubiin ravelius/Matkakirja-natiivi.
# SÄÄNTÖ (Fable 25.9.2026 klo 10.4x): peili on varmuuskopio, jossa PAIKALLINEN ON TOTUUS.
#  1) kaikki haarat force-pushataan etuliitteen alle: +refs/heads/*:refs/heads/peili/proto/*
#  2) master ja juna/* pushataan lisäksi omilla nimillään (proto/master, proto/juna/*) VAIN fast-forwardina; hylkäys
#     kirjataan tiedostoon VIKA (Postivahti välittää Fablelle rivinä) eikä pysäytä ajoa.
# Kutsu: post-merge-koukku (master), juna-ajo.sh vahti (kun edellisestä onnistuneesta ajosta on yli tunti) ja käsin.
export PATH=/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin
PROTO=/Users/Shared/Claude/proto-3d/Matkakirja-proto
TILA=/Users/Shared/Claude/proto-3d/lokit/varmuuskopio-viimeisin.txt
VIKA=/Users/Shared/Claude/proto-3d/lokit/varmuuskopio-VIKA.txt
aika() { date '+%d.%m. %H:%M'; }
git -C $PROTO remote get-url natiivi-backup >/dev/null 2>&1 \
  || git -C $PROTO remote add natiivi-backup https://github.com/ravelius/Matkakirja-natiivi.git
virheet=()
git -C $PROTO push natiivi-backup --force --quiet "+refs/heads/*:refs/heads/peili/proto/*" 2>&1 || virheet+=("peili (force)")
nimetyt=(refs/heads/master ${(f)"$(git -C $PROTO for-each-ref --format='%(refname)' 'refs/heads/juna/*')"})
for r in $nimetyt; do
  [[ -n $r ]] || continue
  git -C $PROTO push natiivi-backup --quiet "${r}:refs/heads/proto/${r#refs/heads/}" 2>&1 || virheet+=("${r#refs/heads/} ei fast-forward")
done
if (( ${#virheet} )); then
  echo "$(aika) VARMUUSKOPIO: ${(j:, :)virheet}" | tee -a $VIKA
else
  echo "$(aika) $(git -C $PROTO rev-parse --short master)" > $TILA
  echo "Varmuuskopiointi valmis: $(date -u +%FT%TZ)"
fi
