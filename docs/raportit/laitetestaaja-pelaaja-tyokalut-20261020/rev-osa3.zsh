#!/bin/zsh
# jatkaa Cupolassa olevaa appia. Käyttö: V=<kansio> L=<konsoli> tunniste (esim. "")
U=00008103-001819421413401E; B=fi.matkakirja.peli.kehitys
V=${V:?}; L=${L:?}; P=${P:-}
S=/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-laitetestaaja/ecad9e7c-04cb-4bd4-b915-86ece02ee747/scratchpad/ipad; mkdir -p $S
laita() { print -r -- "$2" > $S/$1; xcrun devicectl device copy to --device $U --domain-type appDataContainer --domain-identifier $B --source $S/$1 --destination "Documents/$1" >/dev/null 2>&1; }
ui() { laita ui-komento.txt "$1"; sleep 2.5; }
lk() { laita linssi-komento.txt "$1"; sleep 2.5; }
hae() { xcrun devicectl device copy from --device $U --domain-type appDataContainer --domain-identifier $B --source Documents/$2 --destination $1 >/dev/null 2>&1; }
kuva() { laita komento.txt "kuva $P$1"; sleep 3.5; hae $V/$P$1.png $P$1.png; }
mittaa() { n=$P$1; echo "== $n $(date +%H.%M.%S)"; laita komento.txt "mittaus alku $n
odota 10
mittaus loppu"; ui "ui lasi mittaa 10 $n"; sleep 13; hae $V/mittaus-$n.txt mittaus-$n.txt; }
sleep 5
sleep 12
lk "astro kyyti revontulet tila"; sleep 1
mittaa R5
lk "astro kyyti revontulet _Elava=0"; lk "astro kyyti linnunrata revontulet 1"; sleep 4; mittaa V4
lk "astro kyyti revontulet _Elava=1"; lk "astro kyyti linnunrata revontulet 0.45"; sleep 4; mittaa R5b
lk "astro kyyti revontulet _Elava=0"; lk "astro kyyti linnunrata revontulet 1"; sleep 4; kuva V4
lk "astro kyyti revontulet _Elava=1"; lk "astro kyyti linnunrata revontulet 0.45"; sleep 4; kuva R5
laita komento.txt "kuva ${P}R5-t0
odota 3
kuva ${P}R5-t3
odota 3
kuva ${P}R5-t6
odota 3
kuva ${P}R5-t9
odota 2"
sleep 25
for k in t0 t3 t6 t9; do hae $V/${P}R5-$k.png ${P}R5-$k.png; done
echo "REV2 VALMIS $(date +%H.%M)"
