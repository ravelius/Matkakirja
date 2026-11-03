#!/bin/zsh
# Viedyt _valmiit/*-vienti-* -paketit NAS:lle (Julkaisija 10.10.2026, PT: levy < 100 Gi).
# Korjattu 1.11.2026 (PT 03.3x): 1.11. ajo siirsi käytössä olevia vientejä (v99, tausta-v89d), koska viittaukset
# haettiin vain työkaluskripteistä. Nyt KUIVA-AJO ON OLETUS; siirto vain --aja-lipulla ja PT:n kuittauksella.
# Siirretään vain paketti, joka täyttää KAIKKI ehdot:
#   1) vie-paketti.log: "<nimi>: viety …, virheitä 0" (kaikki osat), ei virheellisiä osia; ei symlinkki
#   2) muokattu ennen rajaa (--raja "VVVV-KK-PP HH:MM", oletus 2026-10-31 12:00; KK/PT tarkistavat uudempia)
#   3) samasta sarjasta on uudempi versio (nimi …-v<N>[kirjain]-…; versioton paketti ei koskaan siirry)
#   4) mikään ei viittaa nimeen: kaikki git-checkoutit (/Users/Shared/Claude/Matkakirja-*, wt/*, proto-3d/Matkakirja-proto*,
#      seurattu + seuraamaton), proto-3d/_tyo, proto-3d/tyokalut, julkaisija-tyokalut-skriptit ja symlinkit
#      (wt/, proto-3d/_tyo, proto-3d/lokit, proto-3d/tyokalut)
# Siirto: rsync → rsync -c tarkistus → lähde pois; koot du -skx (vain sisälevy). NAS luo ._*-tiedostoja (AppleDouble):
# ne ohitetaan; palautuksessa NAS:lta aina rsync -a --exclude="._*" (1.11. palautukset toivat 15 654 ._-tiedostoa)
# Käyttö: nas-arkistoi-viedyt.zsh [--aja] [--raja "2026-10-31 12:00"]
V=/Users/Shared/Claude/proto-3d/_valmiit; N=/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/julkaisija/vienti-arkisto
VL=/Users/Shared/Claude/julkaisija-tyokalut/vie-paketti.log; LOKI=/Users/Shared/Claude/julkaisija-tyokalut/nas-arkistoi.log
C=/Users/Shared/Claude; KUIVA=1; RAJA="2026-10-31 12:00"
while (( $# )); do case $1 in --aja) KUIVA=0 ;; --raja) RAJA=$2; shift ;; *) echo "tuntematon: $1" >&2; exit 1 ;; esac; shift; done
RAJA_S=$(date -j -f '%Y-%m-%d %H:%M' "$RAJA" +%s) || exit 1
[ -d $N ] || { echo "NAS ei saatavilla: $N" >&2; exit 2; }
T=$(mktemp -d -t nas-arkistoi); trap 'command rm -rf $T' EXIT

# Ehdokkaat ehdoilla 1–2
for d in $V/*-vienti-*(/N); do
  n=${d:t}; [ -L $d ] && continue
  : # raja: tiedostojen (ei kansioiden) muokkausaika, koska ._-siivous ja palautus muuttavat kansioaikoja
  [ -z "$(find $d -type f -newermt "$RAJA" ! -name "._*" -print -quit)" ] || continue
  grep -qE "^[0-9-]+ [0-9:]+ $n( \(osa [0-9]+/[0-9]+\))?: viety [0-9]+, oli jo [0-9]+, virheitä 0" $VL || continue
  grep -qE "^[0-9-]+ [0-9:]+ $n( \(osa [0-9]+/[0-9]+\))?: .*virheitä [1-9]" $VL && continue
  echo $n
done > $T/ehd.txt

# Ehto 3: uudempi versio samasta sarjasta (_valmiit:ssa tai NAS:lla)
{ ls $V; ls $N; } 2>/dev/null | grep -E -- '-v[0-9]+[a-z]*-' | sort -u > $T/kaikki.txt
: > $T/uudemmat.txt
while read -r n; do
  [[ $n =~ '^(.*)-v([0-9]+)([a-z]*)-(.*)$' ]] || continue
  pre=$match[1]; num=$match[2]; suf=$match[3]
  while read -r m; do
    [[ $m =~ '^(.*)-v([0-9]+)([a-z]*)-' ]] || continue
    [[ $match[1] == $pre ]] || continue
    if (( match[2] > num )) || { (( match[2] == num )) && [[ $match[3] > $suf ]]; }; then echo $n >> $T/uudemmat.txt; break; fi
  done < $T/kaikki.txt
done < $T/ehd.txt

# Ehto 4: viittaukset
: > $T/viit.txt
for r in $C/Matkakirja-*(/N) $C/wt/*(/N) $C/proto-3d/Matkakirja-proto*(/N); do
  [ -e $r/.git ] || continue
  git -C $r grep -h -o -I -F --untracked -f $T/uudemmat.txt -- . ':!*.log' 2>/dev/null >> $T/viit.txt
done
grep -r -h -o -I -F -f $T/uudemmat.txt --include='*.md' --include='*.json' --include='*.txt' --include='*.sh' --include='*.zsh' \
  --include='*.py' --include='*.mjs' --include='*.js' --include='*.cs' --include='*.tsv' \
  $C/proto-3d/_tyo $C/proto-3d/tyokalut 2>/dev/null >> $T/viit.txt
grep -h -o -I -F -f $T/uudemmat.txt $C/julkaisija-tyokalut/*.(sh|zsh|py|mjs)(N) 2>/dev/null >> $T/viit.txt
find $C/wt $C/proto-3d/_tyo $C/proto-3d/lokit $C/proto-3d/tyokalut -maxdepth 6 -type l 2>/dev/null \
  | while read -r l; do readlink "$l"; done | grep -o -F -f $T/uudemmat.txt >> $T/viit.txt
sort -u $T/viit.txt > $T/viit-u.txt

summa=0
while read -r n; do
  grep -qxF "$n" $T/viit-u.txt && { echo "viitattu, jää: $n"; continue; }
  d=$V/$n; k=$(du -skx $d | cut -f1); summa=$((summa + k))
  if (( KUIVA )); then printf "%6.2f G %s\n" $((k/1048576.0)) $n; continue; fi
  nice -n 15 rsync -a --exclude="._*" "$d/" "$N/$n/" || { echo "$(date +%H.%M) VIRHE rsync $n" >> $LOKI; continue; }
  [ -z "$(rsync -anc --exclude="._*" --out-format='%n' "$d/" "$N/$n/" | grep -v '/$')" ] || { echo "$(date +%H.%M) EROJA $n" >> $LOKI; continue; }
  rsync -a --exclude="._*" --remove-source-files "$d/" "$N/$n/" && find "$d" -depth -type d -empty -delete
  echo "$(date +%H.%M) OK $n → NAS vienti-arkisto" >> $LOKI
done < $T/uudemmat.txt
echo "ehdokkaita (valmis + ennen rajaa $RAJA): $(wc -l < $T/ehd.txt | tr -d ' '), joista uudempi versio olemassa: $(wc -l < $T/uudemmat.txt | tr -d ' ')"
printf "yhteensä %.1f G%s\n" $((summa/1048576.0)) "$( (( KUIVA )) && echo ' (kuiva-ajo; siirto vain --aja ja PT:n kuittaus)')"
