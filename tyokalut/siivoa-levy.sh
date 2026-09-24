#!/bin/zsh
# Levyn siivous (omistajan linjaus 24.9.2026, Fablen tilaus; Natiiviseppä kirjoitti, omistaja ajaa/asentaa).
#   zsh tyokalut/siivoa-levy.sh          # listaa poistettavat ja koot, ei poista mitään
#   zsh tyokalut/siivoa-levy.sh poista   # poistaa ja kirjaa proto-3d/lokit/siivous.log
# Ajastus: tyokalut/fi.matkakirja.siivous.plist (klo 03.00, "poista"), asennus tyokalut/README.md.
# Ei koskaan: Build/testflight*, NAS, .git-kansiot, git-haarat.
#  1) proto-3d/lokit/<kansio>, jossa ei ole yli 2 pv:n sisällä muuttunutta tiedostoa: koko kansio pois
#     (omistaja 24.9.2026 klo 13.3x). Ennen poistoa kuvat, joihin pelin repon docs/raportit/*.md viittaa
#     polulla proto-3d/lokit/<kansio>/…, kopioidaan pienennettyinä (leveys ≤ 1600 px, jpg) kansioon
#     docs/raportit/kuvat/<kansio>/, raporttien linkit vaihdetaan ja muutos viedään PR:nä (haara
#     siivous-kuvat-<pvm>, Fable hyväksyy). Jos kopio tai PR epäonnistuu, viitatut kansiot jäävät.
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

# 1) lokikansiot: hiljaiset kansiot kokonaan; raporttien viittaamat kuvat ensin repoon (PR)
typeset -A vanha viitattu
for d in $P/lokit/*(/); do
  [ -n "$(find "$d" -type f -mtime -2 -print -quit)" ] && continue
  vanha[${d:t}]=1
done
if (( ${#vanha} )); then
  PAA=$C/Matkakirja-fable
  pvm=$(date +%Y%m%d)
  WK=$C/wt/siivous-kuvat-$pvm
  git -C $PAA fetch -q origin main 2>/dev/null
  # Viite: valinnainen etuliite (/Users/Shared/Claude/ tai ../) + proto-3d/lokit/<kansio>/<polku>.<kuva>
  typeset -a viitteet
  viitteet=(${(f)"$(git -C $PAA grep -hoE "(/Users/Shared/Claude/|(\.\./)+)?proto-3d/lokit/[^] )\`\"'<>]+\.(png|jpe?g|webp)" \
    origin/main -- 'docs/raportit/*.md' 2>/dev/null | sort -u)"})
  typeset -a kopioitavat
  for viite in $viitteet; do
    suht=${viite#*proto-3d/lokit/}; kansio=${suht%%/*}
    [ -n "${vanha[$kansio]}" ] && [ -f "$P/lokit/$suht" ] || continue
    viitattu[$kansio]=1; kopioitavat+=("$viite")
    [ $POISTA = 0 ] && echo "kuva repoon: $suht"
  done
  pr_ok=0
  if [ $POISTA = 1 ] && (( ${#kopioitavat} )) && git -C $PAA worktree add -q -f -B siivous-kuvat-$pvm $WK origin/main 2>/dev/null; then
    virhe=0
    for viite in $kopioitavat; do
      suht=${viite#*proto-3d/lokit/}; kansio=${suht%%/*}
      nimi=${${suht#*/}:r}; nimi=${nimi//\//-}.jpg
      kohde=docs/raportit/kuvat/$kansio/$nimi
      mkdir -p $WK/${kohde:h}
      leveys=$(sips -g pixelWidth "$P/lokit/$suht" 2>/dev/null | awk '/pixelWidth/{print $2}')
      koko=(); [ "${leveys:-0}" -gt 1600 ] && koko=(--resampleWidth 1600)
      sips -s format jpeg -s formatOptions 82 $koko "$P/lokit/$suht" --out $WK/$kohde >/dev/null 2>&1
      [ -s $WK/$kohde ] || { virhe=1; echo "kuvan kopio epäonnistui: $suht"; continue; }
      # Raportin linkki repon kopioon (suhteessa docs/raportit/-kansioon).
      for md in ${(f)"$(grep -rlF --include='*.md' -- "$viite" $WK/docs/raportit)"}; do
        VIITE="$viite" UUSI="kuvat/$kansio/$nimi" perl -0pi -e 's/\Q$ENV{VIITE}\E/$ENV{UUSI}/g' "$md"
      done
    done
    if [ $virhe = 0 ] \
      && git -C $WK add docs/raportit \
      && git -C $WK commit -q -m "Siivous: raporttien lokikuvat repoon ($pvm, ${#kopioitavat} kuvaa)" \
      && git -C $WK push -q -f origin siivous-kuvat-$pvm; then
      ( cd $WK && { gh pr view siivous-kuvat-$pvm --json state -q .state 2>/dev/null | grep -qx OPEN \
        || gh pr create --base main --head siivous-kuvat-$pvm --title "Siivous: raporttien lokikuvat repoon ($pvm)" \
             --body "Yön siivous (proto-3d tyokalut/siivoa-levy.sh) poistaa yli 2 vrk hiljaiset proto-3d/lokit-kansiot. Raporttien viittaamat ${#kopioitavat} kuvaa on kopioitu pienennettyinä (leveys ≤ 1600 px, jpg) kansioon docs/raportit/kuvat/<lokikansio>/ ja linkit vaihdettu. Fable hyväksyy." >/dev/null; } ) \
        && pr_ok=1
    fi
    git -C $PAA worktree remove --force $WK 2>/dev/null
  fi
  # Viitattu kansio poistetaan vain, kun sen kuvat ovat PR:ssä.
  [ $pr_ok = 1 ] || [ $POISTA = 0 ] || for k in ${(k)viitattu}; do unset "vanha[$k]"; echo "$(date '+%Y-%m-%d %H:%M') jää (kuvat ei PR:ssä): $k" >> "$LOKI"; done
  for k in ${(k)vanha}; do kohteet+=("$P/lokit/$k"); done
fi

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
