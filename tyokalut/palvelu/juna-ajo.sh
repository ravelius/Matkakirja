#!/bin/zsh
# BUILD-JUNA: kääntää integraatiohaaran käännöspalvelulla Laitetestaajan ja pariteetin simulaattoreihin, jos juna on
# muuttunut edellisestä onnistuneesta ajosta.
#   juna-ajo.sh          ajastin (launchd fi.matkakirja.juna, joka toinen tasatunti 08–22; omistaja 24.9. klo 22.5x)
#   juna-ajo.sh vahti    tapahtumaohjattu (launchd fi.matkakirja.juna-vahti, 10 min kierros; omistaja 25.9. klo 04.1x):
#                        lähtee heti, kun junaan on tullut uusi commit, mutta vasta kun kärki on ollut 10 min ennallaan
#                        (peräkkäiset merget niputetaan), ja vain jos palvelun jono on vapaa (muuten seuraava kierros).
# Juna = uusin juna/b<N> (juna/b13 korvaa juna/b12 automaattisesti), ellei JUNA ole annettu.
export PATH=/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin
GIT=/Users/Shared/Claude/proto-3d/Matkakirja-proto
JUNA=${JUNA:-$(git -C $GIT for-each-ref --format='%(refname:short)' 'refs/heads/juna/b*' | sort -V | tail -1)}
SIMS=(1572C658-6455-4E55-8C05-3F88CB3C32F6 3B4CDACB-CCBE-42EC-809D-FB4D0B43CC7D C1D5E34C-DFA8-4326-AD85-92B58A672AA7 993F8873-E2D9-4230-81CE-CBF9230D9B55)
TILA=/Users/Shared/Claude/proto-3d/lokit/kaannospalvelu/juna-viimeisin.txt
aika() { date '+%d.%m. %H:%M'; }
# Tunnin varmuuskopio GitHubiin (Fable 25.9. klo 10.4x): vahdin 10 min kierros ajaa sen (synkronisesti: launchd lopettaisi taustaprosessin), kun edellisestä
# onnistuneesta ajosta on yli tunti (varmuuskopioi-natiivi.sh; uutta launchd-agenttia ei tarvita).
VK=/Users/Shared/Claude/proto-3d/lokit/varmuuskopio-viimeisin.txt
if [[ ! -f $VK ]] || (( $(date +%s) - $(stat -f %m $VK) > 3600 )); then
  touch $VK   # ei päällekkäisiä ajoja, jos edellinen on kesken
  /Users/Shared/Claude/proto-3d/tyokalut/varmuuskopioi-natiivi.sh >> /Users/Shared/Claude/proto-3d/tyokalut/varmuuskopiointi.log 2>&1
fi
[[ -n $JUNA ]] || { echo "$(aika) ei junaa"; exit 0; }
nyt=$(git -C $GIT rev-parse --short "$JUNA" 2>/dev/null) || { echo "$(aika) ei junaa $JUNA"; exit 0; }
[[ "$(cat $TILA 2>/dev/null)" == "$JUNA $nyt" || "$(cat $TILA 2>/dev/null)" == "$nyt" ]] && { [[ $1 == vahti ]] || echo "$(aika) $JUNA $nyt ennallaan"; exit 0; }
if [[ $1 == vahti ]]; then
  ika=$(( $(date +%s) - $(git -C $GIT log -1 --format=%ct "$JUNA") ))
  (( ika >= 600 )) || { echo "$(aika) vahti: $JUNA $nyt uusi, odotetaan niputusta ($ika s < 600 s)"; exit 0; }
  [[ -d /tmp/matkakirja-kaannospalvelu.lukko ]] && { echo "$(aika) vahti: jono varattu ($(cat /tmp/matkakirja-kaannospalvelu.lukko/kuka 2>/dev/null)), seuraava kierros"; exit 0; }
fi
tulos=$(/Users/Shared/Claude/proto-3d/tyokalut/proto-kaanna.sh "$JUNA" $SIMS 2>&1 | tail -1)
echo "$(aika) ${1:-ajastin}: $tulos"
[[ "$tulos" == KÄÄNNETTY* ]] && echo "$JUNA $nyt" > $TILA
