#!/bin/zsh
# Levyn siivous (omistajan linjaus 24.9.2026, Fablen tilaus; Natiiviseppä kirjoitti, omistaja ajaa/asentaa).
#   zsh tyokalut/siivoa-levy.sh          # listaa poistettavat ja koot, ei poista mitään
#   zsh tyokalut/siivoa-levy.sh poista   # poistaa ja kirjaa proto-3d/lokit/siivous.log
# Ajastus: tyokalut/fi.matkakirja.siivous.plist (klo 03.00, "poista"), asennus tyokalut/README.md.
# Ei koskaan: Build/testflight*, NAS, .git-kansiot, git-haarat.
#  1) proto-3d/lokit/<kansio>, jossa ei ole yli 2 pv:n sisällä muuttunutta tiedostoa: kaikki paitsi
#     *.png *.jpg *.jpeg *.txt *.md (iPadin Documents-kopiot, äänet, sisältöpaketit)
#  2) Build/dd-sim, Build/iOS-sim, Build/yo, jos yli 1 pv vanhoja eikä Unity/xcodebuild ole käynnissä
#  3) Xcode DerivedData: projektikansiot, joiden WorkspacePath ei ole proto-3d:ssä (välimuistit jäävät)
#  4) /Users/Shared/Claude/wt/*: pelin repon worktree, jonka haara on mergetty origin/mainiin (tai PR MERGED), työpuu
#     puhdas ja viimeinen commit yli 1 pv vanha → git worktree remove (haara jää)
#  5) {pyramidi,reliefi,maasto}-poltto/ajo-*, joissa Karttasepän merkki .ampari-ok (laatat tarkistettu
#     ämpäristä): alikansioiden pohja, viivat, ranta, nostot, pallo, valimuisti ja lahde-levylta tiedostot
#     paitsi *.json *.txt *.md *.log; tyhjät alikansiot pois; ilman merkkiä ohitetaan
setopt null_glob
export PATH=/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin   # launchd antaa suppean PATHin (gh)
C=/Users/Shared/Claude
P=$C/proto-3d
B=$P/Matkakirja-proto/Build
LOKI=$P/lokit/siivous.log
POISTA=0; [ "$1" = poista ] && POISTA=1
typeset -a kohteet worktreet
kb() { du -sk "$1" 2>/dev/null | awk '{print $1}'; }
yht=0

# 1) lokikansiot
for d in $P/lokit/*(/); do
  [ -n "$(find "$d" -type f -mtime -2 -print -quit)" ] && continue
  while IFS= read -r -d '' f; do kohteet+=("$f"); done < <(find "$d" -type f \
    ! \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.txt' -o -iname '*.md' \) -print0)
done

# 2) simulaattori- ja yökäännökset
if ! pgrep -qf "Unity.app/Contents/MacOS/Unity" && ! pgrep -qx xcodebuild; then
  for d in $B/dd-sim $B/iOS-sim $B/yo; do
    [ -e "$d" ] && [ -n "$(find "$d" -maxdepth 0 -mtime +1 -print)" ] && kohteet+=("$d")
  done
else
  echo "Unity tai xcodebuild käynnissä: Build/-kansiot ohitetaan"
fi

# 3) DerivedData
for d in $HOME/Library/Developer/Xcode/DerivedData/*(/); do
  [ -f "$d/info.plist" ] || continue
  polku=$(plutil -extract WorkspacePath raw "$d/info.plist" 2>/dev/null)
  [[ "$polku" == $P/* ]] && continue
  kohteet+=("$d")
done

# 4) mergetyt worktreet (vain pelin repo, jossa origin/main)
typeset -A haettu
for w in $C/wt/*(/); do
  [ -e "$w/.git" ] || continue
  git -C "$w" rev-parse -q --verify origin/main >/dev/null 2>&1 || continue
  yhteinen=$(git -C "$w" rev-parse --git-common-dir 2>/dev/null)
  if [ -z "${haettu[$yhteinen]}" ]; then git -C "$w" fetch -q origin main 2>/dev/null; haettu[$yhteinen]=1; fi
  haara=$(git -C "$w" symbolic-ref -q --short HEAD) || continue
  [ -z "$(git -C "$w" status --porcelain 2>/dev/null)" ] || continue
  [ $(( $(date +%s) - $(git -C "$w" log -1 --format=%ct) )) -gt 86400 ] || continue
  # Squash-mergeä git ei tunnista, joten myös PR:n tila (gh): MERGED.
  if ! git -C "$w" branch --merged origin/main --format='%(refname:short)' | grep -qx "$haara"; then
    [ "$(cd "$w" && gh pr view "$haara" --json state -q .state 2>/dev/null)" = MERGED ] || continue
  fi
  worktreet+=("$w")
done

# 5) poltot, jotka Karttaseppä on merkinnyt ämpärissä oleviksi: vain laatta- ja välimuistialikansioiden
#    tiedostot; parametrit, lokit ja luettelot (*.json *.txt *.md *.log) jäävät, kansiota ei poisteta kokonaan
for d in $C/{pyramidi,reliefi,maasto}-poltto/ajo-*(/); do
  [ -f "$d/.ampari-ok" ] || continue
  for a in $d/{pohja,viivat,ranta,nostot,pallo,valimuisti,lahde-levylta}(/); do
    while IFS= read -r -d '' f; do kohteet+=("$f"); done < <(find "$a" -type f \
      ! \( -iname '*.json' -o -iname '*.txt' -o -iname '*.md' -o -iname '*.log' \) -print0)
  done
done

# Kansiot du:lla (listataan), yksittäiset tiedostot yhdellä stat-ajolla (laattoja voi olla satoja tuhansia).
for k in "${kohteet[@]}" "${worktreet[@]}"; do
  [ -d "$k" ] || continue
  s=$(kb "$k"); yht=$((yht + ${s:-0}))
  [ $POISTA = 0 ] && printf '%8d Mt  %s\n' $(( ${s:-0} / 1024 )) "$k"
done
tied=$(for k in "${kohteet[@]}"; do [ -f "$k" ] && print -rn -- "$k"$'\0'; done | xargs -0 stat -f %z 2>/dev/null | awk '{s+=$1} END {printf "%d", s/1024}')
yht=$((yht + ${tied:-0}))
[ $POISTA = 0 ] && echo "yksittäisiä tiedostoja yhteensä $(( ${tied:-0} / 1024 )) Mt"
echo "tiedostoja/kansioita ${#kohteet[@]}, worktreitä ${#worktreet[@]}, yhteensä $((yht / 1024)) Mt"

if [ $POISTA = 1 ]; then
  {
    echo "== $(date '+%Y-%m-%d %H:%M') siivous: ${#kohteet[@]} kohdetta, ${#worktreet[@]} worktreetä, $((yht / 1024)) Mt"
    for k in "${kohteet[@]}"; do rm -rf -- "$k" && echo "poistettu $k"; done
    for w in "${worktreet[@]}"; do
      paa=$(git -C "$w" worktree list --porcelain | awk 'NR==1{print $2}')
      git -C "$paa" worktree remove "$w" && echo "worktree pois $w"
    done
    find $P/lokit $C/{pyramidi,reliefi,maasto}-poltto -mindepth 1 -type d -empty -delete 2>/dev/null
    echo "vapaana $(df -h /Users/Shared | awk 'END{print $4}')"
  } >> "$LOKI" 2>&1
  tail -1 "$LOKI"
fi
