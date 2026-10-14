#!/bin/zsh
# VALOSEPÄN VAHTI (omistaja 14.10.2026 10.56 "Kyllä, Valoseppä ensin (Suositus)", PT; Julkaisija). Olavinlinna-vahdin malli.
# Jokainen Valosepän proto-haaran (oletus linssiseppa2/*) uusi kärki käännetään vapaalla käännöslinjalla ja ajetaan
# simulla Valosepän vakioskenaario (kaupunki, pallo, ISS) → kuvat + arkki + nopeusluvut. Ei käsin pyyntöjä.
#   - Haarakuviot: valoseppa-haarat.txt (git for-each-ref -kuvio per rivi, # = kommentti), luetaan joka kierroksella.
#   - Minuutin välein kärjet; käynnistyshetken kärkiä ei käännetä. Muutos → 120 s hiljaisuus (peräkkäiset commitit yhteen).
#     Jonossa vain kunkin haaran uusin kärki; vanhin muutos ensin.
#   - Käännös proto-kaanna.sh <haara> (master + haara), PROTO_APP_KOPIO=<tuloskansio>; linja 2 jos vapaa, muuten linja 1
#     jos vapaa; ei jonota lukon taakse. Taukolippu /tmp/matkakirja-valovahti-tauko ("<rooli> <syy>") pysäyttää uudet käännökset.
#   - Simuvuoro Julkaisijalta: vahti kirjoittaa SIMU-PYYNTÖ lokiin ja odottaa lippua /tmp/matkakirja-valovahti-simu.nyt
#     (Julkaisija: touch; vahti poistaa). Ajo: $VAKIO <app> <tuloskansio> (skripti aloittaa `aani mykistys`, sammuttaa simun);
#     lopuksi "SIMU VAPAA" lokiin. Lippua odotetaan enintään 60 min, sitten kuvat jäävät ajamatta (app säilyy).
#   - Tulos lokit/valoseppa-auto-<kkpp-hhmm>-<haaran loppu>/ (Matkakirja3D.app, haara.txt, kuvat, arkki, nopeus);
#     linkki lokit/valoseppa-uusin → uusin onnistunut ajo. Säilytetään 3 uusinta + alle 90 min ikäiset.
#   - Tila yhdellä rivillä: lokit/valoseppa-tila.txt; loki julkaisija-tyokalut/valoseppa-vahti.log.
# Käynnistys irrotettuna (setsid), pysäytys: kill $(cat /tmp/matkakirja-valovahti.pid).
T=/Users/Shared/Claude/julkaisija-tyokalut
P=/Users/Shared/Claude/proto-3d
G=(git -C $P/Matkakirja-proto-kaannos)
LISTA=$T/valoseppa-haarat.txt
LOKI=$T/valoseppa-vahti.log
TILA=$P/lokit/valoseppa-tila.txt
TAUKO=/tmp/matkakirja-valovahti-tauko
SIMULIPPU=/tmp/matkakirja-valovahti-simu.nyt
VAKIO=${VALOVAHTI_VAKIO:-$(sed -n 's/^vakio=//p' $LISTA 2>/dev/null | head -1)}
HILJAISUUS=120
echo $$ > /tmp/matkakirja-valovahti.pid
loki() { print -r -- "$(date +%d.%m.\ %H.%M) $*" >> $LOKI; }
tila() { print -r -- "$(date +%H.%M) $*" > $TILA; }

kuviot() { grep -v '^[[:space:]]*\(#\|$\|!\)' $LISTA | grep -v '='  | awk '{print "refs/heads/"$1}'; }
pois() { sed -n 's/^!\([^[:space:]]*\).*/\1/p' $LISTA; }   # !<haara> = suljetaan pois
karjet() {
  local r p
  for r in ${(f)"$($G for-each-ref --format='%(refname:short)=%(objectname:short=9)' ${(f)"$(kuviot)"})"}; do
    for p in ${(f)"$(pois)"}; do [[ ${r%%=*} == $p ]] && continue 2; done
    print -r -- $r
  done
}
vapaa_linja() {
  [[ -e /tmp/matkakirja-kaannospalvelu-2.lukko ]] || { print 2; return; }
  [[ -e /tmp/matkakirja-kaannospalvelu.lukko ]] || { print 1; return; }
  return 1
}
NAS=/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/julkaisija/valoseppa-vahti
siivoa() {  # PT 14.10. 12.0x: app vain uusimmasta; 2 seuraavaa ilman appia (arkki + nopeus + lokit); vanhemmat NAS:lle.
  local d t n=0                     # Alle 30 min ikäisiin ei kosketa (käynnissä oleva simuajo voi käyttää appia).
  for d in $P/lokit/valoseppa-auto-*(N/om); do
    (( n++ < 1 )) && continue
    [[ -n $(find $d -maxdepth 0 -mmin -30) ]] && continue
    if (( n <= 3 )); then
      [[ -d $d/Matkakirja3D.app ]] && rm -rf $d/Matkakirja3D.app && loki "app pois ${d:t} (arkki + nopeus jäävät)"
      continue
    fi
    [[ -d $NAS:h ]] || { loki "NAS puuttuu, ${d:t} jää"; continue; }
    mkdir -p $NAS
    t=$(readlink $d/todistus)
    if nice -n 15 rsync -aL --exclude Matkakirja3D.app $d $NAS/ && [[ -z $(rsync -anL --exclude Matkakirja3D.app --out-format='%n' $d $NAS/ | grep -v '/$') ]]; then
      rm -rf $d; [[ $t == $P/lokit/todistus-valovahti-* ]] && rm -rf $t
      loki "NAS:lle ${d:t}"
    else loki "NAS-siirto epäonnistui ${d:t}, jää"; fi
  done
}

[[ -f $LISTA ]] || { echo "lista puuttuu: $LISTA" >&2; exit 2; }
typeset -A nahty muuttui
KASITELLYT=$T/valoseppa-kasitellyt.txt   # haara=sha käännösvuoron saaneista; uudelleenkäynnistys jatkaa tästä (ei hukkaa jonoa)
for r in ${(f)"$(karjet)"}; do nahty[${r%%=*}]=${r#*=}; done
[[ -f $KASITELLYT ]] && for r in ${(f)"$(<$KASITELLYT)"}; do [[ -n ${nahty[${r%%=*}]} ]] && nahty[${r%%=*}]=${r#*=}; done
merkitse() { local k; typeset -A m; [[ -f $KASITELLYT ]] && for k in ${(f)"$(<$KASITELLYT)"}; do m[${k%%=*}]=${k#*=}; done
  m[$1]=$2; for k in ${(k)m}; do print -r -- "$k=${m[$k]}"; done > $KASITELLYT; }
typeset -a jono   # "haara=sha"
loki "VAHTI KÄYNNISTYI (pid $$): ${#nahty} haaraa, vakio=${VAKIO:-PUUTTUU}"; tila "vahti päällä; ${#nahty} haaraa, odottaa uutta committia"
while true; do
  sleep 60
  VAKIO=${VALOVAHTI_VAKIO:-$(sed -n 's/^vakio=//p' $LISTA 2>/dev/null | head -1)}
  for r in ${(f)"$(karjet)"}; do
    h=${r%%=*}; s=${r#*=}
    [[ ${nahty[$h]} == $s ]] && continue
    nahty[$h]=$s; muuttui[$h]=$(date +%s)
    jono=(${jono:#$h=*} "$h=$s"); loki "muutos: $h=$s (jonossa ${#jono})"
  done
  for p in ${(f)"$(pois)"}; do jono=(${jono:#$p=*}); done   # Valoseppä 14.10.: poissulku koskee myös jonoa
  (( ${#jono} )) || continue
  kohta=${jono[1]}; h=${kohta%%=*}; s=${kohta#*=}
  (( $(date +%s) - ${muuttui[$h]:-0} < HILJAISUUS )) && { tila "muutos $h=$s, odottaa ${HILJAISUUS} s hiljaisuutta"; continue; }
  [[ -e $TAUKO ]] && { tila "tauko: $(cat $TAUKO 2>/dev/null) – jonossa ${#jono}"; continue; }
  L=$(vapaa_linja) || { tila "odottaa vapaata käännöslinjaa – jonossa ${#jono} ($h=$s)"; continue; }
  jono=(${jono[2,-1]}); merkitse $h $s
  K=$P/lokit/valoseppa-auto-$(date +%m%d-%H%M)-${h:t}
  loki "KÄÄNNÖS L$L → ${K:t}: $h=$s"; tila "kääntää L$L ${K:t} ($h=$s)"
  alku=$(date +%s)
  tulos=$(cd $P && PROTO_LINJA=$L PROTO_APP_KOPIO=$K zsh tyokalut/proto-kaanna.sh $s 2>&1 | tail -1)
  if [[ $tulos != KÄÄNNETTY* || ! -d $K/Matkakirja3D.app ]]; then
    loki "VIKA ${K:t}: $tulos"; tila "VIKA ${K:t}: $tulos"
    [[ $tulos == *"jono: lukko"* ]] && jono=("$h=$s" $jono)
    continue
  fi
  print -r -- "$h $s ${${(s: :)tulos}[2]} L$L käännös $(( $(date +%s) - alku )) s" > $K/haara.txt
  loki "KÄÄNNETTY ${K:t} ${${(s: :)tulos}[2]} ($(( $(date +%s) - alku )) s)"
  if [[ -z $VAKIO || ! -f $VAKIO ]]; then
    loki "VALMIS ${K:t} ilman kuvia (vakioskripti puuttuu)"; ln -sfn $K $P/lokit/valoseppa-uusin
    tila "VALMIS ${K:t} (app, ei vakiokuvia) = lokit/valoseppa-uusin; $h=$s"; siivoa; continue
  fi
  rm -f $SIMULIPPU
  loki "SIMU-PYYNTÖ ${K:t} ($h=$s)"; tila "odottaa simuvuoroa Julkaisijalta ($SIMULIPPU) – ${K:t}"
  odota=0
  until [[ -e $SIMULIPPU ]] || (( odota >= 3600 )); do sleep 10; (( odota += 10 )); done
  if [[ ! -e $SIMULIPPU ]]; then
    loki "SIMUVUORO EI TULLUT 60 min: ${K:t} ilman kuvia"; ln -sfn $K $P/lokit/valoseppa-uusin
    tila "VALMIS ${K:t} ilman kuvia (ei simuvuoroa)"; siivoa; continue
  fi
  rm -f $SIMULIPPU
  loki "SIMU ALKAA ${K:t}"; tila "simuajo ${K:t} ($h=$s)"
  alku=$(date +%s)
  zsh $VAKIO $K/Matkakirja3D.app $K > $K/vakio.log 2>&1; rc=$?
  loki "SIMU VAPAA ${K:t} (rc $rc, $(( $(date +%s) - alku )) s)"
  if (( rc == 0 )); then
    ln -sfn $K $P/lokit/valoseppa-uusin
    loki "VALMIS ${K:t}: $(ls $K | grep -i arkki | head -1)"; tila "VALMIS ${K:t} = lokit/valoseppa-uusin ($h=$s)"
  else
    loki "VIKA AJO ${K:t} rc $rc: $(tail -1 $K/vakio.log)"; tila "VIKA AJO ${K:t} rc $rc – ks. vakio.log"
  fi
  siivoa
done
