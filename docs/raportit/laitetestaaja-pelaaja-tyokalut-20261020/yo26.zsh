#!/bin/zsh
# kierros25: autopilotti-ajo (avaus ~40 s + >=130 s juoksu, ei kosketusta) + varjojen GPU. Konsoli kiinnitetty ennen ajoa.
U=00008103-001819421413401E; B=fi.matkakirja.peli.kehitys
V=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/varjot-koko/kierros25; L=$V/konsoli.txt
S=/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-laitetestaaja/ecad9e7c-04cb-4bd4-b915-86ece02ee747/scratchpad/ipad
laita() { print -r -- "$2" > $S/$1; xcrun devicectl device copy to --device $U --domain-type appDataContainer --domain-identifier $B --source $S/$1 --destination "Documents/$1" >/dev/null 2>&1; }
ui() { laita ui-komento.txt "$1"; sleep 3; }
hae() { xcrun devicectl device copy from --device $U --domain-type appDataContainer --domain-identifier $B --source Documents/$2 --destination $1 >/dev/null 2>&1; }
mittaa() { n=$1; s=${2:-10}; echo "== $n $(date +%H.%M.%S)"; laita komento.txt "mittaus alku $n
odota $s
mittaus loppu"; ui "ui lasi mittaa $s $n"; sleep $(( s + 3 )); hae $V/mittaus-$n.txt mittaus-$n.txt; }
termi() { grep -a "lampo {" $L | tail -1 | grep -o '"thermal":[0-9]' | tail -1 | cut -d: -f2; }
sleep 40
t=0; until [[ "$(termi)" == "0" || "$(termi)" == "1" ]] || (( t > 1500 )); do sleep 15; (( t+=15 )); done
echo "THERMAL ALKU=$(termi) odotus ${t}s $(date +%H.%M.%S)"
laita peli-komento.txt "uusi-peli 5 amsterdam"; sleep 40
ui "ui konsoli pois
ui kierto pysty"; sleep 3
ui "ui juoksupeli botti 1"
n0=$(grep -a -c "avaus: LentoAlkaa" $L)
laita ui-komento.txt "ui juoksupeli v4"; sleep 0.8
txt=""; for k in $(seq 1 18); do txt="${txt}kuva Lataus-pysty-$k
odota 0.3
"; done
laita komento.txt "$txt"
sleep 25; for k in $(seq 1 18); do hae $V/Lataus-pysty-$k.png Lataus-pysty-$k.png; done
t=0; until (( $(grep -a -c "avaus: LentoAlkaa" $L) > n0 )) || (( t > 90 )); do sleep 1; (( t++ )); done; echo "lento alkaa t=$t $(date +%H.%M.%S)"
mittaa JA 150
echo "autopilotti-ajo päättyi $(date +%H.%M.%S)"
grep -a "juoksupeli mittari" $L > $V/mittari-rivit.txt; wc -l < $V/mittari-rivit.txt
M=$V/mittari-rivit.txt
python3 -I - "$L" "$V" <<'PYEOF'
import sys,re
L,V=sys.argv[1],sys.argv[2]
rows=open(L,errors='replace').read().splitlines()
tauko=0; kaan=alku=katto=hyp=muu=0; taukoruudut=[]
for i,r in enumerate(rows):
    if 'juoksupeli mittari:' not in r: continue
    pause=any('applicationDidBecomeActive' in x or 'applicationWillResignActive' in x for x in rows[max(0,i-15):i])
    if ('NYKÄYS' in r or 'KAMERAHYPPY' in r) and pause:
        taukoruudut.append(re.sub(r'^.*mittari: ','',r)[:90]); continue
    if 'KÄÄNNÖSNYKÄYS' in r: kaan+=1
    elif 'ALKUNYKÄYS' in r: alku+=1
    elif 'KATTO/SEINÄ KATOSI' in r: katto+=1
    elif 'KAMERAHYPPY' in r: hyp+=1
    elif 'NYKÄYS ruutu' in r: muu+=1
print(f"TULOSRIVI: käännösnykäykset {kaan} | alkunykäykset {alku} | kattoja/seiniä katosi {katto} | muut nykäykset {muu} | kamerahypyt {hyp}")
print(f"TAUKORIVI (sovelluksen tauko/resignActive, ei lasketa): {len(taukoruudut)} ruutua" + (": "+" ; ".join(taukoruudut) if taukoruudut else ""))
PYEOF
tail -1 $M | sed 's/MATKAKIRJA juoksupeli mittari: //'
grep -a "ohjaus pelaajalle t" $M | head -2
ui "ui juoksupeli uudestaan 777"; sleep 11.5
ui "ui juoksupeli valo jaady 1"; sleep 2
mittaa A
ui "ui juoksupeli valo jaady 0"
mittaa J 25
# VÄRINÄ-vertailu (VS c1637075b): jäädytetty ruutu, siirto 0 vs 1, 5 kuvaa kummallakin
ui "ui juoksupeli uudestaan 777"; sleep 11.5
ui "ui juoksupeli valo jaady 1"; sleep 2
for sv in 0 1; do
  ui "ui juoksupeli valo siirto $sv"; sleep 2
  for k in 1 2 3 4 5; do laita komento.txt "kuva V-siirto$sv-$k"; sleep 3.5; hae $V/V-siirto$sv-$k.png V-siirto$sv-$k.png; done
done
ui "ui juoksupeli valo jaady 0"
# latausjakso vaaka
ui "ui kierto vaaka"; sleep 3
ui "ui juoksupeli pois"; sleep 5
laita ui-komento.txt "ui juoksupeli v4"; sleep 0.8
txt=""; for k in $(seq 1 18); do txt="${txt}kuva Lataus-vaaka-$k
odota 0.3
"; done
laita komento.txt "$txt"
sleep 25; for k in $(seq 1 18); do hae $V/Lataus-vaaka-$k.png Lataus-vaaka-$k.png; done
ui "ui kierto pysty"
echo "THERMAL LOPPU=$(termi) $(date +%H.%M.%S)"
echo "YO26 VALMIS $(date +%H.%M)"
