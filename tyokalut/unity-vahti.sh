#!/bin/zsh
# Ajaa Unity-batchmoden vahdin alla: jos loki ei kasva RAUHA sekuntiin ja Unityn CPU on ~0,
# otetaan sample + lsof + lapsiprosessit lokiin (proto-3d/lokit/vienti-jumi-*) ja ajo tapetaan. Ajossa oleva jälkeläinen
# (Burst AOT bcl.exe) lykkää tappoa JUMIKATTO-sekuntiin asti.
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
    # Koko prosessipuu (TF 155 7.10.2026: Burst AOT -kääntäjä bcl.exe on Unityn lapsi ja ajossa, kun Unity itse on joutilas;
    # kuormassa 486 ja nice 15:llä koko AOT kesti yli 180 s ilman lokirivejä → väärä hälytys). Jos jokin jälkeläinen on ajossa
    # (tila R) tai kuluttaa CPU:ta, odotetaan, mutta kokonaisaika on katossa JUMIKATTO (oletus 1800 s hiljaisuutta).
    puu=$PID; uudet=$PID
    while [ -n "$uudet" ]; do uudet=$(for q in $uudet; do pgrep -P $q; done); [ -n "$uudet" ] && puu="$puu $uudet"; done
    ajossa=$(ps -o state=,%cpu= -p $(echo $puu | tr ' ' ',') 2>/dev/null | awk '$1 ~ /^R/ || $2 > 1 { n++ } END { print n + 0 }')
    if [ "$ajossa" -gt 0 ] && [ $hiljaa -lt ${JUMIKATTO:-1800} ]; then
      [ $((hiljaa % 60)) -eq 0 ] && echo "vahti: loki hiljaa ${hiljaa}s, mutta $ajossa prosessia ajossa (esim. Burst) → odotetaan"
      continue
    fi
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
