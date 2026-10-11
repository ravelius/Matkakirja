#!/bin/zsh
# kaupunki.sh <maanosa> <maa> <kaupunki>  → rivi tulos.tsv
source $SCRATCH/ajo.env
K=$S/k.sh
D="/Volumes/T7 4TB/Simulaattorit/Sarja/$U/data/Containers/Data/Application/5BF11E61-48F7-487C-AE09-B9ED54E02AA4/Documents"
L="$D/linssi-loki.txt"
mn=$1; maa=$2; kau=$3; slug=${kau//[^A-Za-z0-9]/_}
has() { $K puu hae "$1" >/dev/null 2>&1; }
kirj() { echo "$kau	$1	$2" >> $S/tulos.tsv; echo "$(date +%T) $kau $1 $2" >> $S/kaupunki-ajo.log; }
# avaa ☰-valikko (jos jo auki, 2. napautus avaa uudelleen)
if has "Vaihda kohde"; then $K tv 1348 38; sleep 1; fi
$K tv 1348 38; sleep 1.5
if ! has "Vaihda kohde"; then $K tv 1348 38; sleep 1.5; fi
$K tt "Vaihda kohde" >/dev/null || { kirj VIKA "Vaihda kohde -valikkoa ei löydy"; exit 1; }
sleep 1.3
if ! has "‹ $mn" && ! has "‹ $maa"; then $K tt "$mn" >/dev/null || { kirj VIKA "maanosaa $mn ei löydy"; exit 1; }; sleep 1.2; fi
if ! has "‹ $maa"; then $K tt "$maa" >/dev/null || { kirj VIKA "maata $maa ei löydy"; exit 1; }; sleep 1.4; fi
n0=$(wc -l < "$L"); t0=$(date +%s)
$K tt "$kau" >/dev/null || { kirj VIKA "kaupunkia ei listassa"; exit 1; }
sleep 3; $K kuva "c-$slug-1" "valittu, siirtoruutu"
# esittelyn alku
ok=""; for i in {1..90}; do
  tail -n +$((n0+1)) "$L" | grep -a -q -E "opas: vastaus [0-9]+ " && { ok=1; break; }; sleep 2; done
blk=$(tail -n +$((n0+1)) "$L")
ts() { echo "$blk" | grep -a -m1 -E "$1" | awk -F'[ ,]' '{print $1"."$2}'; }
t_v=$(ts "opas: kaupunki vaihtuu"); t_a=$(ts "opas: vastaus [0-9]+ "); t_p=$(ts "PCM-virta soittovalmis")
lat=$(python3 -I -c "print(round(float('${t_a:-0}')-float('${t_v:-0}'),1) if '$t_a' and '$t_v' else -1)")
kohde=$(echo "$blk" | grep -a -m1 -E "opas: vastaus [0-9]+ " | sed -E 's/.*vastaus [0-9]+ ([^(]*) \(.*/\1/')
err=$(echo "$blk" | grep -a -c -i -E "virhe|epäonnistui|aikakatkaisu")
ts0=$(date +%s); saap=""; for i in {1..90}; do
  tail -n +$((n0+1)) "$L" | grep -a -q -E "opas: saapui " && { saap=1; break; }; sleep 2; done
tscene=$(( $(date +%s) - t0 ))
sleep 2; $K puu lista > $S/puu-$slug-2.txt
oh=$(awk -F'\t' '$3=="mk-ohjausnappi" {split($1,a,","); if (a[2]>500 && a[2]<900) print a[1]","a[2]}' $S/puu-$slug-2.txt | sort -t, -k1 -n | tail -1)
sleep 3; $K kuva "c-$slug-2" "esittely käynnissä, kohde näkyy"
$K puu lista > $S/puu-$slug-2.txt
nappi=$(grep -c "mk-opas-nappi__teksti" $S/puu-$slug-2.txt)
n1=$(wc -l < "$L"); ohita="EI"
if [[ -n $oh ]]; then x=${oh%,*}; y=${oh#*,}; $K tv $x $y; for i in {1..12}; do
  tail -n +$((n1+1)) "$L" | grep -a -q -E "opas: seuraava \(ohitettiin" && { ohita=OK; break; }; sleep 1.5; done; else ohita="NAPPIA EI LÖYDY"; fi
sleep 6; $K kuva "c-$slug-3" "Ohita jälkeen"
$K puu lista > $S/puu-$slug-3.txt
metro=$(grep -c "mk-metrolinja__nimi" $S/puu-$slug-3.txt)
tila=OK; [[ -z $ok ]] && tila=VIKA; [[ $ohita != OK ]] && tila=VIKA
kirj $tila "esittely alkoi ${lat}s valinnasta, saapuminen ${tscene}s valinnasta ${saap:+(ok)} (${kohde:-ei}); Ohita ${ohita}; kohdelista rivejä ${metro}; opas-nappeja ${nappi}; virhelokirivejä ${err}"
