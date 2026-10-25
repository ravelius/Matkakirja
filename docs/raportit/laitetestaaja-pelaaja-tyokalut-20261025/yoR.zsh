#!/bin/zsh
# kierros (28+): PK:n mittarit, 2 reittiä (iso aukio: palatsi alku keski; sisätila: -147.5,420), thermal alku/loppu, GPU, varina-mittari, latauskuvat.
# Edellytys: appi asennettu, konsoli kiinni -> $L (manuaalinen launch). Käyttö: V=<kansio> zsh yo30.zsh
U=00008103-001819421413401E; B=fi.matkakirja.peli.kehitys
V=${V:?}; L=$V/konsoli.txt
S=$S/ipad; mkdir -p $S $V
laita() { print -r -- "$2" > $S/$1; xcrun devicectl device copy to --device $U --domain-type appDataContainer --domain-identifier $B --source $S/$1 --destination "Documents/$1" >/dev/null 2>&1; }
ui() { laita ui-komento.txt "$1"; sleep 3; }
hae() { xcrun devicectl device copy from --device $U --domain-type appDataContainer --domain-identifier $B --source Documents/$2 --destination $1 >/dev/null 2>&1; }
mittaa() { n=$1; s=${2:-10}; echo "== $n $(date +%H.%M.%S)"; laita komento.txt "mittaus alku $n
odota $s
mittaus loppu"; ui "ui lasi mittaa $s $n"; sleep $(( s + 3 )); hae $V/mittaus-$n.txt mittaus-$n.txt; }
termi() { grep -a "lampo {" $L | tail -1 | grep -o '"thermal":[0-9]' | tail -1 | cut -d: -f2; }
yhteenveto() { python3 -I - "$L" "$1" "$2" <<'PYEOF'
import sys,re
L,alkuoff,nimi=sys.argv[1],int(sys.argv[2]),sys.argv[3]
data=open(L,errors='replace').read()[alkuoff:]; rows=data.splitlines()
c=dict(kaan=0,alku=0,katto=0,muu=0,hyp=0,kaantyily=0,piilossa=0,kattosis=0,musiikki=0,rajaus=0); tauko=[]
for i,r in enumerate(rows):
    if 'juoksupeli mittari:' not in r: continue
    pause=any('applicationDidBecomeActive' in x or 'applicationWillResignActive' in x for x in rows[max(0,i-15):i])
    if ('NYKÄYS' in r or 'KAMERAHYPPY' in r) and pause: tauko.append(r[-70:]); continue
    if 'KÄÄNNÖSNYKÄYS' in r: c['kaan']+=1
    elif 'ALKUNYKÄYS' in r: c['alku']+=1
    elif 'KATTO/SEINÄ KATOSI' in r: c['katto']+=1
    elif 'KAMERAHYPPY' in r: c['hyp']+=1
    elif 'KÄÄNTYILY' in r: c['kaantyily']+=1
    elif 'PELAAJA PIILOSSA' in r: c['piilossa']+=1
    elif 'KATTO NÄKYVISSÄ SISÄLLÄ' in r: c['kattosis']+=1
    elif 'MUSIIKKI KATKESI' in r: c['musiikki']+=1
    elif 'LATAUSKUVA RAJAUS' in r and not re.search(r'leikkaus 0([,.]0+)? ?%',r): c['rajaus']+=1
    elif 'NYKÄYS ruutu' in r: c['muu']+=1
print(f"TULOSRIVI [{nimi}]: käännösnykäykset {c['kaan']} | alkunykäykset {c['alku']} | kattoja katosi {c['katto']} | muut nykäykset {c['muu']} | kamerahypyt {c['hyp']} | kääntyilyt {c['kaantyily']} | piilossa {c['piilossa']} | katto sisällä {c['kattosis']} | musiikkikatkot {c['musiikki']} | latauskuvan rajaukset {c['rajaus']} | taukoruudut {len(tauko)}")
last=[x for x in rows if 'juoksupeli mittari: t ' in x]
print('  lopputila:',re.sub(r'^.*mittari: ','',last[-1]) if last else '-')
PYEOF
}
sleep 40
t=0; until [[ "$(termi)" == "0" || "$(termi)" == "1" ]] || (( t > 1500 )); do sleep 15; (( t+=15 )); done
echo "THERMAL ALKU=$(termi) odotus ${t}s $(date +%H.%M.%S)"
laita peli-komento.txt "uusi-peli 5 amsterdam"; sleep 40
ui "ui konsoli pois
ui kierto pysty"; sleep 3
ui "ui juoksupeli botti 1"
# --- reitti 1: iso aukio, latausjakson kuvat pysty ---
O1=$(wc -c < $L); n0=$(grep -a -c "avaus: LentoAlkaa" $L)
laita ui-komento.txt "ui juoksupeli v4"; sleep 0.8
txt=""; for k in $(seq 1 18); do txt="${txt}kuva Lataus-pysty-$k
odota 0.3
"; done
laita komento.txt "$txt"; sleep 25; for k in $(seq 1 18); do hae $V/Lataus-pysty-$k.png Lataus-pysty-$k.png; done
t=0; until (( $(grep -a -c "avaus: LentoAlkaa" $L) > n0 )) || (( t > 90 )); do sleep 1; (( t++ )); done; echo "aukio: lento alkaa t=$t $(date +%H.%M.%S)"
mittaa JA 150
yhteenveto $O1 "iso aukio (keski)" | tee $V/tulosrivi-aukio.txt
# --- reitti 2: sisätila ---
ui "ui juoksupeli pois"; sleep 3
ui "ui juoksupeli avaus 0"
ui "ui juoksupeli palatsi alku -147.5,420"
O2=$(wc -c < $L)
ui "ui juoksupeli v4 11"; sleep 15
mittaa JB 100
yhteenveto $O2 "sisätila (-147.5,420)" | tee $V/tulosrivi-sisatila.txt
echo "REITIT VALMIS $(date +%H.%M)"
