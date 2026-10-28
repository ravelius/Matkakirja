#!/bin/zsh
# RAKENNA-LUETTELO (Julkaisija 28.10.2026, omistajan päätös klo 12.28: R2-kulut alas).
# Rakentaa ämpärin paikallisen luettelon ListObjectsV2-sivutuksella (1000 avainta / pyyntö, ~11 600 pyyntöä
# 11,6 milj. objektille). Työkalut (vie-paketti.sh, eheysvartija, offline.mjs, tarkista-luettelo …) lukevat tätä
# HEAD-pyyntöjen sijaan. Täysi uudelleenrakennus vain harvoin (esim. kerran viikossa tai kun epäillään eroa).
#
# Käyttö (yksinään): zsh /Users/Shared/Claude/julkaisija-tyokalut/rakenna-luettelo.zsh [rinnakkaisuus, oletus 16]
#
# Tiedostot (/Users/Shared/Claude/julkaisija-tyokalut/):
#   amparin-luettelo.tsv         avain<TAB>koko<TAB>etag, LC_ALL=C-järjestyksessä (sama kuin ListObjectsV2), ei otsaketta
#   amparin-luettelo.lisays.tsv  viennit lisäävät tänne rivinsä (sama muoto, järjestämätön); lukijat lukevat molemmat
#   amparin-luettelo.tila        rakennuksen aika ja määrät
# Rakennuksen alussa lisays.tsv kierrätetään (.vanha) ja poistetaan vasta onnistuneen rakennuksen lopussa,
# jotta rakennuksen aikana viedyt avaimet eivät katoa. Avaimia ei tulosteta eikä kirjoiteta mihinkään.
set -euo pipefail
T=/Users/Shared/Claude/julkaisija-tyokalut
L=$T/amparin-luettelo.tsv; LIS=$T/amparin-luettelo.lisays.tsv; TILA=$T/amparin-luettelo.tila
RINN=${1:-16}
source ~/.zshrc >/dev/null 2>&1 || true
export AWS_DEFAULT_REGION=auto AWS_REQUEST_CHECKSUM_CALCULATION=when_required AWS_RESPONSE_CHECKSUM_VALIDATION=when_supported
export AWS_MAX_ATTEMPTS=10 AWS_RETRY_MODE=adaptive
AMPARI=${AMPARI:-${R2_BUCKET:-}}; PAATE=${PAATE:-${R2_ACCOUNT_ID:+https://$R2_ACCOUNT_ID.r2.cloudflarestorage.com}}
for v in AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY AMPARI PAATE; do [ -n "${(P)v:-}" ] || { echo "Ympäristöstä puuttuu $v" >&2; exit 7; }; done
export AMPARI PAATE

TYO=$(mktemp -d -t amparin-luettelo)
ALKU=$(date '+%Y-%m-%d %H:%M:%S')
[ -f $LIS ] && mv $LIS $LIS.vanha
echo "$ALKU luettelon rakennus alkaa (rinnakkaisuus $RINN, työkansio $TYO)"

# 1) Etuliitteiden laajennus delimiterillä syvyyteen SYV (rinnakkaiset lehtilistaukset). Tason suorat avaimet talteen.
SYV=3
taso() { # $1 = etuliite ('' = juuri); tulostaa alietuliitteet, suorat avaimet osaan suorat-*.tsv
  local e=$1 n=${2:-x}
  aws s3api list-objects-v2 --bucket "$AMPARI" --delimiter / --prefix "$e" --endpoint-url "$PAATE" \
    --query 'CommonPrefixes[].Prefix' --output text | tr '\t' '\n' | grep -v '^None$' | grep . || true
  aws s3api list-objects-v2 --bucket "$AMPARI" --delimiter / --prefix "$e" --endpoint-url "$PAATE" \
    --query 'Contents[].[Key,Size,ETag]' --output text | grep -v '^None$' >> "$TYO/suorat-$n.tsv" || true
}
nykyiset=('')
for (( d = 1; d <= SYV; d++ )); do
  seuraavat=()
  i=0
  for e in "${nykyiset[@]}"; do i=$((i + 1)); seuraavat+=(${(f)"$(taso "$e" "$d-$i")"}); done
  nykyiset=($seuraavat)
  echo "taso $d: ${#nykyiset} etuliitettä"
  [ ${#nykyiset} -gt 0 ] || break
  [ $d -lt $SYV ] || break
done

# 2) Lehtietuliitteet kokonaan rinnakkain (CLI sivuttaa itse, 1000 / pyyntö).
print -l -- "${nykyiset[@]}" > $TYO/etuliitteet.txt
LISTAA=$TYO/listaa.zsh
cat > $LISTAA <<'EOS'
#!/bin/zsh
e=$1; o=$2
aws s3api list-objects-v2 --bucket "$AMPARI" --prefix "$e" --page-size 1000 --endpoint-url "$PAATE" \
  --query 'Contents[].[Key,Size,ETag]' --output text > "$o.osa" || { echo "LISTAUS EPÄONNISTUI: $e" >&2; exit 1; }
grep -v '^None$' "$o.osa" > "$o" || true
EOS
i=0
while read -r e; do i=$((i + 1)); print -r -- "$e"; print -r -- "$TYO/osa-$i.tsv"; done < $TYO/etuliitteet.txt \
  | xargs -n 2 -P "$RINN" zsh $LISTAA

# 3) Yhdistys: lainausmerkit pois ETagista, C-järjestys, atominen vaihto.
cat $TYO/suorat-*.tsv(N) $TYO/osa-*.tsv(N) 2>/dev/null | awk -F'\t' 'NF >= 3 { gsub(/"/, "", $3); print $1 "\t" $2 "\t" $3 }' \
  | LC_ALL=C sort -t $'\t' -k1,1 -u > $L.uusi
N=$(wc -l < $L.uusi | tr -d ' ')
[ "$N" -gt 0 ] || { echo "HYLÄTTY: tyhjä luettelo" >&2; exit 8; }
mv $L.uusi $L
rm -f $LIS.vanha
rm -rf $TYO
TAVUT=$(awk -F'\t' '{s += $2} END {printf "%.0f", s}' $L)
LOPPU=$(date '+%Y-%m-%d %H:%M:%S')
printf 'rakennettu\t%s\nvalmis\t%s\nobjekteja\t%s\ntavuja\t%s\n' "$ALKU" "$LOPPU" "$N" "$TAVUT" > $TILA
echo "$LOPPU luettelo valmis: $N objektia, $TAVUT tavua → $L"
