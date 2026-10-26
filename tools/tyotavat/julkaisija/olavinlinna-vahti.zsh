#!/bin/zsh
# OLAVINLINNA-VAHTI (PT 11.10.2026 09.3x, omistajan kysymys "linnan nopeutus"; Julkaisija).
# Kääntää linnan yhdistelmän automaattisesti aina, kun jokin haara (tai proto master) muuttuu. Ei käsin yhdistämistä.
#   - Haarat: olavinlinna-haarat.txt (yksi nimi per rivi, # = kommentti), luetaan joka kierroksella → muokattavissa lennossa.
#   - Minuutin välein kärjet; muutos → odotetaan 120 s hiljaisuutta (peräkkäiset pushit samaan käännökseen).
#   - merge-tree-kuivaharjoitus; ristiriita → lokit/olavinlinna-ristiriita.txt + tila, ei käännöstä ennen uutta kärkeä.
#   - Käännös proto-kaanna.sh:lla vain, kun käännöslukko on vapaa (ei jonota juna-/muiden käännösten edelle) ja
#     taukolippua /tmp/matkakirja-linnavahti-tauko ei ole (juna 181 / VIE / muistiajo / iPad-mittaus: tekijä luo lipun
#     `echo "<rooli> <syy>" > /tmp/matkakirja-linnavahti-tauko` ja poistaa sen lopuksi).
#   - Tulos lokit/olavinlinna-auto-<kkpp-hhmm>/Matkakirja3D.app; linkki lokit/olavinlinna-uusin → uusin onnistunut.
#     Säilytetään 2 uusinta + kaikki alle 90 min ikäiset (käynnissä olevat simuajot eivät menetä appiaan).
#   - Tila yhdellä rivillä: lokit/olavinlinna-tila.txt; loki julkaisija-tyokalut/olavinlinna-vahti.log.
# Käynnistys irrotettuna (setsid), pysäytys: kill $(cat /tmp/matkakirja-linnavahti.pid).
# Valinnainen 1. argumentti --ohita-nykyiset: nykyisiä kärkiä ei käännetä (ne ovat jo käännetty käsin).
T=/Users/Shared/Claude/julkaisija-tyokalut
P=/Users/Shared/Claude/proto-3d
G=(git -C $P/Matkakirja-proto-kaannos)
LISTA=$T/olavinlinna-haarat.txt
LOKI=$T/olavinlinna-vahti.log
TILA=$P/lokit/olavinlinna-tila.txt
RISTI=$P/lokit/olavinlinna-ristiriita.txt
LUKKO=/tmp/matkakirja-kaannospalvelu.lukko
TAUKO=/tmp/matkakirja-linnavahti-tauko
HILJAISUUS=120
echo $$ > /tmp/matkakirja-linnavahti.pid
loki() { print -r -- "$(date +%d.%m.\ %H.%M) $*" >> $LOKI; }
tila() { print -r -- "$(date +%H.%M) $*" > $TILA; }

haarat() { grep -v '^[[:space:]]*\(#\|$\)' $LISTA | awk '{print $1}'; }
avain() {  # master + kaikkien haarojen kärjet
  local h out="master=$($G rev-parse --short=9 master 2>/dev/null)"
  for h in ${(f)"$(haarat)"}; do out+=" $h=$($G rev-parse --short=9 $h 2>/dev/null || echo PUUTTUU)"; done
  print -r -- $out
}
kuiva() {  # 0 = puhdas; muuten kirjoittaa ristiriidan
  local L=(${(f)"$(haarat)"}) t b r
  t=$($G rev-parse master) || return 1
  for b in $L; do
    r=$($G merge-tree --write-tree --name-only $t $b) || {
      print -r -- "$(date +%H.%M) RISTIRIITA: $b vs. edelliset (${L[1,$(( ${L[(i)$b]} - 1 ))]})"$'\n'"${r#*$'\n'}" > $RISTI
      return 1; }
    t=$($G commit-tree -p $t -p $b -m kuiva ${r%%$'\n'*})
  done
}
siivoa() {  # vanhat auto-kansiot: säilytä 2 uusinta + alle 90 min ikäiset + linkin kohde
  local kohde=$(readlink $P/lokit/olavinlinna-uusin) d n=0
  for d in $P/lokit/olavinlinna-auto-*(N/om); do
    (( n++ < 2 )) && continue
    [[ $d == $kohde || -n $(find $d -maxdepth 0 -mmin -90) ]] && continue
    rm -rf $d && loki "poistettu vanha ${d:t}"
  done
}

[[ -f $LISTA ]] || { echo "lista puuttuu: $LISTA" >&2; exit 2; }
viimeksi=""; [[ $1 == --ohita-nykyiset ]] && viimeksi=$(avain)
edellinen=$(avain); muuttui=$(date +%s); tarkistettu=""
loki "VAHTI KÄYNNISTYI (pid $$): $edellinen"; tila "vahti päällä; odottaa muutosta ($edellinen)"
while true; do
  sleep 60
  nyt=$(avain)
  [[ $nyt != $edellinen ]] && { edellinen=$nyt; muuttui=$(date +%s); loki "muutos: $nyt"; tila "muutos havaittu, odottaa ${HILJAISUUS} s hiljaisuutta"; continue; }
  [[ $nyt == $viimeksi ]] && continue
  (( $(date +%s) - muuttui < HILJAISUUS )) && continue
  [[ $nyt == *PUUTTUU* ]] && { [[ $tarkistettu != $nyt ]] && { loki "haara puuttuu: $nyt"; tila "VIKA: haara puuttuu ($nyt)"; tarkistettu=$nyt; }; continue; }
  if [[ $tarkistettu != $nyt ]]; then
    tarkistettu=$nyt
    if ! kuiva; then loki "$(head -1 $RISTI)"; tila "RISTIRIITA – ks. $RISTI (myöhempi pushaaja yhdistää toisen haaran omaansa)"; viimeksi=$nyt; continue; fi
    rm -f $RISTI
  fi
  [[ -e $TAUKO ]] && { tila "tauko: $(cat $TAUKO 2>/dev/null) – käännös odottaa"; continue; }
  [[ -e $LUKKO ]] && { tila "odottaa käännöslukkoa ($(cut -c1-60 $LUKKO/kuka 2>/dev/null))"; continue; }
  K=$P/lokit/olavinlinna-auto-$(date +%m%d-%H%M)
  loki "KÄÄNNÖS → ${K:t}: $nyt"; tila "kääntää ${K:t} ($nyt)"
  tulos=$(cd $P && PROTO_APP_KOPIO=$K zsh tyokalut/proto-kaanna.sh ${(j:+:)${(f)"$(haarat)"}} 2>&1 | tail -1)
  viimeksi=$nyt
  if [[ $tulos == KÄÄNNETTY* && -d $K/Matkakirja3D.app ]]; then
    print -r -- "$nyt" > $K/haarat.txt
    ln -sfn $K $P/lokit/olavinlinna-uusin
    loki "VALMIS ${K:t} ${${(s: :)tulos}[2]}"; tila "VALMIS ${K:t} (${${(s: :)tulos}[2]}) = lokit/olavinlinna-uusin/Matkakirja3D.app; $nyt"
    siivoa
  else
    loki "VIKA ${K:t}: $tulos"; tila "VIKA ${K:t}: $tulos"
    [[ $tulos == *"jono: lukko"* ]] && viimeksi=""   # jonoaikaraja → yritä uudelleen
  fi
done
