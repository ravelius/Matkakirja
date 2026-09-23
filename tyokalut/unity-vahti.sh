#!/bin/zsh
# Ajaa Unity-batchmoden vahdin alla: jos loki ei kasva RAUHA sekuntiin ja Unityn CPU on ~0,
# otetaan sample + lsof + lapsiprosessit lokiin (proto-3d/lokit/vienti-jumi-*) ja ajo tapetaan.
# Käyttö: tyokalut/unity-vahti.sh <lokitiedosto> <unityn argumentit...>
# Paluukoodi 0 = onnistui, 3 = jumi (tapettu), muu = Unityn oma virhe.
LOKI="$1"; shift
UNITY="/Applications/Unity/Hub/Editor/6000.3.24f1/Unity.app/Contents/MacOS/Unity"
RAUHA=${RAUHA:-180}
JUMIT=/Users/Shared/Claude/proto-3d/lokit
rm -f "$LOKI"
"$UNITY" "$@" -logFile "$LOKI" &
PID=$!
edell=0; hiljaa=0
while kill -0 $PID 2>/dev/null; do
  sleep 10
  koko=$(stat -f %z "$LOKI" 2>/dev/null || echo 0)
  if [ "$koko" = "$edell" ]; then hiljaa=$((hiljaa+10)); else hiljaa=0; edell=$koko; fi
  if [ $hiljaa -ge $RAUHA ]; then
    cpu=$(ps -o %cpu= -p $PID | tr -d ' ')
    leima=$(date +%H%M%S)
    D="$JUMIT/vienti-jumi-$leima"; mkdir -p "$D"
    echo "jumi: loki hiljaa ${hiljaa}s, cpu $cpu" | tee "$D/tila.txt"
    tail -30 "$LOKI" > "$D/loki-tail.txt"
    pstree $PID > "$D/puu.txt" 2>/dev/null || ps -ax -o pid,ppid,%cpu,etime,command | awk -v p=$PID '$2==p||$1==p' > "$D/puu.txt"
    ps -ax -o pid,ppid,%cpu,state,etime,command | awk -v p=$PID '$2==p' >> "$D/puu.txt"
    sample $PID 5 -file "$D/sample.txt" >/dev/null 2>&1
    lsof -p $PID > "$D/lsof.txt" 2>/dev/null
    for c in $(pgrep -P $PID); do sample $c 3 -file "$D/sample-lapsi-$c.txt" >/dev/null 2>&1; done
    kill $PID; sleep 5; kill -9 $PID 2>/dev/null
    pkill -9 -P $PID 2>/dev/null
    exit 3
  fi
done
wait $PID
