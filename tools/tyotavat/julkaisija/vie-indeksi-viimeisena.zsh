#!/bin/zsh
# Vie paketin rinnakkain (4 osaa) niin, että */index.json -rivit menevät viimeisinä erillisenä pakettina <nimi>-index-vienti-<pvm> (Julkaisija 9.10.2026).
# Käyttö: vie-indeksi-viimeisena.zsh /Users/Shared/Claude/proto-3d/_valmiit/<nimi>-vienti-<pvm>
P=${1%/}; [[ -d $P && ! -L $P && ${P:t} == *-vienti-* ]] || { echo "Käyttö: $0 <_valmiit/*-vienti-* kansio>" >&2; exit 2; }
b=${P:t}; M=${P:h}/${b%%-vienti-*}-index-vienti-${b##*-vienti-}; L=/Users/Shared/Claude/julkaisija-tyokalut/talvi-vienti
[[ -e $M ]] && { echo "$M on jo olemassa" >&2; exit 3; }
idx=(${(f)"$(awk '$2 ~ /(^|\/)index\.json$/ {print $2}' $P/SHA256SUMS)"})
if (( ${#idx} )); then
  mkdir -p $M && cp $P/LAHTEET.md $M/
  for f in $idx; do mkdir -p $M/${f:h} && mv $P/$f $M/$f; done
  awk '$2 ~ /(^|\/)index\.json$/' $P/SHA256SUMS > $M/SHA256SUMS
  awk '$2 !~ /(^|\/)index\.json$/' $P/SHA256SUMS > $P/SHA256SUMS.uusi && mv $P/SHA256SUMS.uusi $P/SHA256SUMS
fi
pids=(); for i in 0 1 2 3; do /Users/Shared/Claude/julkaisija-tyokalut/vie-paketti.sh --osa=$i/4 $P > $L/${b}-osa$i.log 2>&1 & pids+=$!; done
ok=1; for p in $pids; do wait $p || ok=0; done; tail -qn1 $L/${b}-osa{0,1,2,3}.log
if (( ${#idx} )); then [ $ok = 1 ] && /Users/Shared/Claude/julkaisija-tyokalut/vie-paketti.sh $M 2>&1 | tail -1 || echo "INDEKSIÄ EI VIETY ($b)"; fi
