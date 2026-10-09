#!/bin/zsh
# TODISTUSAJO (Pelikoodari 5.10.2026, Päätoimittajan erä; tarkistuslista: Laitetestaaja
# docs/raportit/laitetestaaja-tarkistuslista-20261005.md). Yksi ajo tuottaa merge-pyynnön todisteet:
#   1 build: .appin Data/Raw/kaannos.txt = pyydetty SHA (+ ancestor-tarkistus haaran commitille)
#   2 napautuspolku OIKEILLA HID-kosketuksilla (simkosketus, sama reitti kuin sormi; ei `ui napauta`)
#   3 poikkeukset ja VIRHE-/error-rivit konsolilokista (tunnetut suodatettu)
#   4 stillit tiloista, tila + laite + SHA merkittynä kuvaan, ja kuva-arkki
#   5 äänikaappaus (kaappaa → <nimi>.wav + -natiivi.wav): ffprobe, kesto, mean/max dB; `aani mittaa` rms/huippu
#   6 aiemmat palautteet (palaute-rivit) OK/PUUTE lokista
#   5b Macin ulostuloon ei ääntä: pelin oma mykistysraportti (Unity + natiivit moottorit) heti alussa ja linssien jälkeen,
#      muuten ajo keskeytetään (sovellus kiinni, simu alas)
#   7 kuormahuomio (käännös/poltto käynnissä → toimintatesti, ei fps/laatu/A-V)
#   8 ei-testattu-lista (skenaarion ei-testattu-rivit + automaattiset)
# Tulos: proto-3d/lokit/todistus-<erä>-<aika>/TODISTUS.md (+ kuvat/, kuva-arkki.png, aani/, konsoli).
#
# Käyttö (simuvuoro Julkaisijalta ensin: SIMULAATTORI NYT, vain luvan UDID):
#   todistusajo.sh --era <nimi> --udid <UDID> --app <polku.app> --sha <käännöksen SHA> --skenaario <tiedosto>
#                  [--haara <commit, jonka pitää sisältyä käännökseen>] [--laite iphone|ipad] [--jata-paalle] [--nyt]
#                  [--peli "odota-tila Aloitus 40;uusi-peli 5 marseille;odota-tila Kartta 40"]
#
# Skenaario (yksi rivi = yksi askel, # kommentti):
#   peli|linssi|ui|komento <komento>    kirjoitetaan Documents/<kanava>-komento.txt (komento → komento.txt)
#   tap <x> <y> [kesto_s]               oikea kosketus pisteinä (kesto > 0,5 = pitkä painallus)
#   tap-teksti <teksti|nimi|luokka>     `ui puu` → ensimmäinen näkyvä elementti, jonka teksti/nimi täsmää → keskipiste
#   veto <x1> <y1> <x2> <y2> [kesto_s]  pyyhkäisy;  polku x,y[,dt_ms] …  vapaa veto
#   odota <s>
#   oleta <s> <regex> [-- selite]       odottaa lokiriviä edellisen askeleen jälkeen → polkutaulukkoon OK/PUUTE
#   ei-oleta <s> <regex> [-- selite]   lokiin EI saa tulla riviä s sekunnissa (esim. selite ei soi itsestään)
#   palaute <s> <regex> -- <palaute>    sama, mutta kohtaan 6 (aiempi palaute tarkistettu)
#   nakyy <s> <teksti> [-- selite]      tila UI-puusta: näkyvä elementti, jonka teksti/nimi sisältää tekstin (ilman lokiriviä)
#   ei-nay <s> <teksti> [-- selite]     sama käänteisenä (esim. ohinapautus sulki paneelin)
#   maara <s> <luokka> <n> [-- selite]  näkyviä elementtejä luokalla täsmälleen n (UI-puusta)
#   video-alku [nimi] / video-loppu     ruutuvideo L/<nimi>.mp4 (ei ääntä)
#   kuva <tunnus> <tilan selite>        still → kuvat/<tunnus>.png merkinnöin
#   aani <s> <nimi>                     äänikaappaus s sekuntia (linssi-kanava `kaappaa`), odottaa valmistumisen
#   aanitaso <s>                        `aani mittaa <s>` (Unityn mikseri) → rms/huippu raporttiin
#   ei-testattu <selite>                kohtaan 8
#   kaynnista-uudelleen [peli-komennot;…]  sovellus kiinni ja auki (tallennus säilyy), esim. Jatka matkaa -testiin
#   alku <peli-komento;peli-komento…>   (ensimmäinen rivi) käynnistyksen peli-komennot --peli-oletuksen tilalle
set -u
setopt extendedglob 2>/dev/null
TYOKALUT=${0:A:h}
BID=app.matkakirja.proto3d
PROTO=/Users/Shared/Claude/proto-3d/Matkakirja-proto
ERA= UDID= APP= SHA= SKEN= HAARA= LAITE=iphone JATA= NYT= SALLI_VANHA= PELI="odota-tila Aloitus 40;uusi-peli 5 marseille;odota-tila Kartta 40"
while (( $# )); do
  case $1 in
    --era) ERA=$2; shift 2 ;; --udid) UDID=$2; shift 2 ;; --app) APP=$2; shift 2 ;; --sha) SHA=$2; shift 2 ;;
    --skenaario) SKEN=$2; shift 2 ;; --haara) HAARA=$2; shift 2 ;; --laite) LAITE=$2; shift 2 ;;
    --jata-paalle) JATA=1; shift ;; --nyt) NYT=1; shift ;; --salli-vanha-mykistys) SALLI_VANHA=1; shift ;; --peli) PELI=$2; shift 2 ;;
    *) echo "tuntematon valitsin $1"; exit 2 ;;
  esac
done
[[ -n $ERA && -n $UDID && -n $APP && -n $SHA && -f $SKEN ]] || { sed -n 13,17p $0; exit 2; }
[[ -d $APP ]] || { echo "ei .appia: $APP"; exit 2; }
# T7-LAITESARJA (omistaja 7.10.2026; Natiiviseppä 8.10.): xcrun simctl → T7-sarja (simusarja.sh), vanha sisäinen UDID → saman
# nimisen T7-laitteen UDID. T7 puuttuu → virhe, ei paluuta sisäiseen sarjaan. HUOM: nohup/xargs/timeout ohittavat xcrun-funktion → niissä --set "$MK_SIMSET" itse.
source /Users/Shared/Claude/proto-3d/tyokalut/simusarja.sh || exit 2
UDID=$(mk_kaanna $UDID)
# Skenaarion oma aloitus: "alku <peli-komennot ;-eroteltuina>" korvaa --peli-oletuksen (esim. aloitusnäkymä ilman uutta peliä).
alku=$(grep -m1 -E '^alku ' $SKEN | cut -d' ' -f2-); [[ -n $alku ]] && PELI=$alku

L=/Users/Shared/Claude/proto-3d/lokit/todistus-$ERA-$(date +%Y%m%d-%H%M)
mkdir -p $L/kuvat $L/aani
T=$L/tulokset.tsv; : > $T            # kohta<TAB>tila<TAB>teksti → raportti
LOKI=$L/konsoli-stdout.log; VLOKI=$L/konsoli-stderr.log
kirjaa() { echo "$(date +%T) $*" | tee -a $L/ajo.log; }
tulos() { printf '%s\t%s\t%s\n' "$1" "$2" "$3" >> $T; kirjaa "[$1] $2 $3"; }
SK=$L/.simkosketus
clang -fobjc-arc -O2 -framework Foundation -o $SK $TYOKALUT/simkosketus.m 2>>$L/ajo.log || { kirjaa "simkosketus ei käänny"; exit 3; }

# --- simuvuoro: vain tämä UDID saa olla käynnissä (Julkaisijan vuoro, ehto n == 0) ---
muut=$(xcrun simctl list devices booted | grep Booted | grep -v -c $UDID)
# --nyt: Julkaisijan SIMULAATTORI NYT -viesti myönsi vuoron, vaikka toinen simu (esim. junan käännös) on käynnissä.
(( muut == 0 )) || [[ -n $NYT ]] || { kirjaa "muita simulaattoreita käynnissä ($muut): ei vuoroa (Julkaisijan NYT → --nyt)"; exit 4; }

# --- 7 kuorma ---
kuorma=$(ps -axo args= | grep -o -E '^[^ ]*(Unity -batchmode|xcodebuild|proto-kaanna\.sh|[Bb]lender|gdal[a-z_]*|tippecanoe)' | grep -v -E '^/bin/zsh$' \
  | sed 's|.*/||' | sort -u | tr '\n' ' ')
la=$(sysctl -n vm.loadavg | awk '{print $2}')
(( ${la%.*} > $(sysctl -n hw.ncpu) )) && kuorma="${kuorma:+$kuorma| }kuormitus $la > $(sysctl -n hw.ncpu) ydintä"
if [[ -n $kuorma ]]; then tulos 7 KUORMA "toimintatesti, ei fps/laatu/A-V (load $la): $kuorma"
else tulos 7 OK "kone kuormaton (load $la)"; fi

# --- 1 build ---
kaannos=$(tr -d '[:space:]' < $APP/Data/Raw/kaannos.txt 2>/dev/null)
if [[ -n $kaannos && ( $kaannos == $SHA* || $SHA == $kaannos* ) ]]; then tulos 1 OK "kaannos.txt $kaannos = $SHA"
else tulos 1 PUUTE "kaannos.txt '${kaannos:-puuttuu}' ≠ $SHA"; fi
if [[ -n $HAARA ]]; then
  if git -C $PROTO merge-base --is-ancestor $HAARA ${kaannos:-$SHA} 2>/dev/null; then tulos 1 OK "haaran $HAARA sisältyy käännökseen"
  else tulos 1 PUUTE "haaran $HAARA EI sisälly käännökseen ${kaannos:-$SHA} (tai commit puuttuu proto-gitistä)"; fi
fi

# --- käynnistys ---
xcrun simctl boot $UDID 2>&1 | grep -v "current state: Booted" | tail -1
xcrun simctl bootstatus $UDID -b >/dev/null 2>&1; sleep 3
read KW KH <<< "$($SK $UDID koko)"
VERSIO=${kaannos:-$SHA}; VERSIO=${VERSIO:0:8}
kirjaa "laite $LAITE $UDID ${KW}×${KH} pt, versio $VERSIO"
xcrun simctl uninstall $UDID $BID 2>/dev/null
xcrun simctl install $UDID "$APP" || { tulos 1 PUUTE "asennus epäonnistui"; exit 5; }
D="$(xcrun simctl get_app_container $UDID $BID data)/Documents"; mkdir -p "$D"
printf 'hiljaa\n' > "$D/komento.txt"
print -l -- ${(s:;:)PELI} > "$D/peli-komento.txt"
rm -f "$D"/{linssi,ui}-komento.txt "$D"/ui-puu*.json(N)
: > $LOKI
xcrun simctl launch --terminate-running-process --stdout=$LOKI --stderr=$VLOKI $UDID $BID >/dev/null || { kirjaa "käynnistys epäonnistui"; exit 5; }

rivit() { wc -l < $LOKI | tr -d ' '; }
odota_rivi() {  # odota_rivi <regex> <s> <alkurivi> → 0 löytyi
  local i; for i in {1..$(( $2 * 4 ))}; do tail -n +$(( $3 + 1 )) $LOKI | grep -a -q -E -- "$1" && return 0; sleep 0.25; done; return 1
}
kirjoita() {   # kirjoita <tiedosto> <rivi>: odottaa, että peli on lukenut edellisen
  local i; for i in {1..40}; do [[ -e "$D/$1" ]] || break; sleep 0.25; done
  print -r -- "$2" > "$D/.$1.tmp" && mv "$D/.$1.tmp" "$D/$1"
}
if [[ $PELI == *uusi-peli* ]]; then odota_rivi 'kerronta ohi' 400 0 || kirjaa "peli ei käynnistynyt (ei 'kerronta ohi')"
else odota_rivi 'testimykistys|peli-komento' 120 0; sleep 15; fi   # ilman uutta peliä (aloitusnäkymä): skenaario odottaa itse
# MACIN ULOSTULOON EI ÄÄNTÄ (Päätoimittaja 5.10. 13.15, omistajan kaiuttimista kuului simulaattorin striimi): Unityn JA
# natiivien moottoreiden mykistys varmistetaan pelin omalla raportilla ennen yhtäkään askelta ja jokaisen linssin jälkeen.
# Jos kumpikaan puuttuu, ajo keskeytetään heti (sovellus kiinni, simu alas). --salli-vanha-mykistys: käännös ennen
# natiivia mykistystä (8ff03da0), vain skenaarioille ilman linssejä, radiota ja Pulun puhekanavaa.
mykistys() {
  local r=$(rivit); kirjoita peli-komento.txt "aani mykistys"
  odota_rivi 'mykistys (päällä|pois)' 15 $r || { echo "ei vastausta"; return 1; }
  local m=$(tail -n +$(( r + 1 )) $LOKI | grep -a -m1 -E 'mykistys (päällä|pois)' | sed 's/.*=mykistys/mykistys/' | cut -c1-140)
  echo "$m"
  [[ $m == *"unity päällä"*"natiivi päällä"* ]] && return 0
  [[ -n $SALLI_VANHA && $m == *"mykistys päällä"* ]] && return 0
  return 1
}
keskeyta_aani() {
  xcrun simctl terminate $UDID $BID 2>/dev/null; xcrun simctl shutdown $UDID 2>/dev/null
  tulos 5 PUUTE "AJO KESKEYTETTY: mykistys ei varmistettu ($1) — ääni olisi voinut mennä Macin kaiuttimiin"
  python3 $TYOKALUT/todistusraportti.py raportti $L "$ERA" "${VERSIO:-$SHA}" "$LAITE" "$UDID" "$SKEN"; exit 6
}
if m=$(mykistys); then tulos 5 OK "Macin ulostulo mykistetty: $m"; else keskeyta_aani "$m"; fi
sleep 3
kirjoita linssi-komento.txt "kehittaja 1"; sleep 1

# --- skenaario ---
VIIM=0          # rivi, josta seuraava oleta etsii (edellisen askeleen alku)
kuva() {
  local tunnus=$1; shift
  xcrun simctl io $UDID screenshot $L/kuvat/$tunnus.raaka.png >/dev/null 2>&1
  # Kuvan suunta (PT 10.10.: linnan arkit 90° kierrossa): simctl tallentaa aina laitteen pystykehyksen; vaaka-UI:n (linna) kuva
  # käännetään raportissa oikein päin. Paneelin mitat ui-puusta, suunta (LandscapeLeft/Right) konsolin viimeisestä asentorivistä.
  rm -f "$D/ui-puu.json"; kirjoita ui-komento.txt "ui puu"; sleep 1.5
  local pw=$(python3 -c 'import json,sys; d=json.load(open(sys.argv[1]))["paneeli"]; print("vaaka" if (d["w"] or 0) > (d["h"] or 0) else "pysty")' "$D/ui-puu.json" 2>/dev/null)
  local asento=$(grep -o "asento toteutui Landscape[A-Za-z]*" $LOKI 2>/dev/null | tail -1 | awk '{print $3}')
  [[ $pw == vaaka ]] && asento=${asento:-LandscapeLeft} || asento=Portrait
  printf '%s\t%s\t%s\n' $tunnus "$*" $asento >> $L/kuvat.tsv
}
napautus_kirjaus() { printf '%s\t%s\n' "$1" "$2" >> $L/polku.tsv; }
while IFS= read -r rivi || [[ -n $rivi ]]; do
  rivi=${rivi%%[[:space:]]#}; [[ -z $rivi || $rivi == \#* ]] && continue
  sana=${rivi%% *}; loput=${rivi#* }; [[ $loput == $rivi ]] && loput=""
  case $sana in
    peli|linssi) VIIM=$(rivit); kirjoita $sana-komento.txt "$loput"; kirjaa "→ $sana $loput"
      # VIIM jää komennon alkuun: linssin avausrivi (linssit: auki: …) tulee usein ennen mykistystarkistusta (5.10. ajo).
      if [[ $sana == linssi && $loput == linssi* ]]; then sleep 2; m=$(mykistys) || keskeyta_aani "linssin jälkeen: $m"; fi ;;
    ui) VIIM=$(rivit); kirjoita ui-komento.txt "ui $loput"; kirjaa "→ ui $loput" ;;
    komento) VIIM=$(rivit); kirjoita komento.txt "$loput" ;;
    odota) sleep $loput ;;
    tap|veto|polku)
      VIIM=$(rivit)
      if $SK $UDID ${=rivi}; then napautus_kirjaus "$rivi" "lähetetty"; kirjaa "✋ $rivi"
      else napautus_kirjaus "$rivi" "HID-VIRHE"; tulos 2 PUUTE "kosketus epäonnistui: $rivi"; fi ;;
    tap-teksti)
      kirjoita ui-komento.txt "ui puu"; sleep 1.5
      xy=$(python3 $TYOKALUT/todistusraportti.py etsi "$D/ui-puu.json" "$loput" $KW $KH)
      if [[ -z $xy ]]; then napautus_kirjaus "$rivi" "EI LÖYDY ui-puusta"; tulos 2 PUUTE "elementtiä '$loput' ei ui-puussa"
        cp "$D/ui-puu.json" "$L/ui-puu-$(date +%H%M%S).json" 2>/dev/null   # skenaarion korjaukseen
      else VIIM=$(rivit); $SK $UDID tap ${=xy}; napautus_kirjaus "$rivi → tap $xy" "lähetetty"; kirjaa "✋ $rivi → $xy"; fi ;;
    tap-kohta|veto-kohta)
      # tap-kohta <fx> <fy> <haku>: oikea kosketus elementin laatikon kohtaan (0–1), esim. Tavlin piste laudalla.
      # veto-kohta <fx1> <fy1> <fx2> <fy2> <pito_s> <haku>: alas kohdassa 1, liuku kohtaan 2, pito, ylös (joystick).
      set -- ${=loput}
      if [[ $sana == tap-kohta ]]; then f1=($1 $2); f2=(); pito=0; shift 2; else f1=($1 $2); f2=($3 $4); pito=$5; shift 5; fi
      haku="$*"
      kirjoita ui-komento.txt "ui puu"; sleep 1.5
      p1=$(python3 $TYOKALUT/todistusraportti.py etsi "$D/ui-puu.json" "$haku" $KW $KH $f1)
      [[ -n $f2 ]] && p2=$(python3 $TYOKALUT/todistusraportti.py etsi "$D/ui-puu.json" "$haku" $KW $KH $f2) || p2=""
      if [[ -z $p1 ]]; then napautus_kirjaus "$rivi" "EI LÖYDY ui-puusta"; tulos 2 PUUTE "elementtiä '$haku' ei ui-puussa"
        cp "$D/ui-puu.json" "$L/ui-puu-$(date +%H%M%S).json" 2>/dev/null
      else
        VIIM=$(rivit)
        if [[ -z $f2 ]]; then $SK $UDID tap ${=p1}; kosketus="tap $p1"
        else a=(${=p1}); b=(${=p2}); ms=$(( ${pito%.*} * 1000 + 50 ))
          $SK $UDID polku "${a[1]},${a[2]}" "${b[1]},${b[2]},250" "${b[1]},${b[2]},$ms"; kosketus="polku $p1 → $p2, pito ${pito} s"; fi
        napautus_kirjaus "$rivi → $kosketus" "lähetetty"; kirjaa "✋ $rivi → $kosketus"
      fi ;;
    oleta|palaute)
      s=${loput%% *}; ehto=${loput#* }; selite=""
      [[ $ehto == *" -- "* ]] && { selite=${ehto#* -- }; ehto=${ehto%% -- *}; }
      if odota_rivi "$ehto" $s $VIIM; then
        osuma=$(tail -n +$(( VIIM + 1 )) $LOKI | grep -a -m1 -E -- "$ehto" | sed 's/.*MATKAKIRJA //' | cut -c1-200)
        [[ $sana == oleta ]] && napautus_kirjaus "  oletus: ${selite:-$ehto}" "OK: $osuma" || tulos 6 OK "$selite — $osuma"
      else
        [[ $sana == oleta ]] && { napautus_kirjaus "  oletus: ${selite:-$ehto}" "PUUTE: ei riviä ${s} s:ssa"; tulos 2 PUUTE "${selite:-$ehto}: ei lokiriviä"; } \
          || tulos 6 PUUTE "$selite — ei riviä /$ehto/"
      fi ;;
    talteen|vertaa)
      # talteen <nimi> <s> <regex ryhmillä>: odottaa riviä (edellisen askeleen jälkeen) ja tallettaa sen ryhmät.
      # vertaa <nimi> <s> <tol1,tol2,…> <regex> [-- selite]: uusi rivi samalla regexillä; jokainen luku saa muuttua enintään
      # toleranssin verran talletetusta (desimaalipilkku sallittu). Esim. pallolukko: kamera ei liiku pallon vedosta.
      # Toleranssi ">…" kääntää: vähintään yksi luku muuttuu yli (vian toisto, esim. lukko pois).
      nimi=${loput%% *}; r1=${loput#* }; s=${r1%% *}; r2=${r1#* }; tol=""
      if [[ $sana == vertaa ]]; then tol=${r2%% *}; r2=${r2#* }; fi
      ehto=$r2; selite=""; [[ $ehto == *" -- "* ]] && { selite=${ehto#* -- }; ehto=${ehto%% -- *}; }
      if odota_rivi "$ehto" $s $VIIM; then
        osuma=$(tail -n +$(( VIIM + 1 )) $LOKI | grep -a -E -- "$ehto" | tail -1)
        if [[ $sana == talteen ]]; then print -r -- "$osuma" > "$L/talteen-$nimi.txt"; napautus_kirjaus "  talteen $nimi" "OK: ${osuma#*MATKAKIRJA }"
        else
          tulos_v=$(python3 - "$ehto" "$tol" "$L/talteen-$nimi.txt" "$osuma" <<'VERTAA'
import re, sys
ehto, tol, tiedosto, uusi = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]
vanha = open(tiedosto).read() if __import__('os').path.exists(tiedosto) else ''
a, b = re.search(ehto, vanha), re.search(ehto, uusi)
if not a or not b: print('PUUTE ei vertailtavaa'); sys.exit()
vahintaan = tol.startswith('>')   # ">1,1,100,3": vähintään yksi luku muuttuu yli toleranssin (vian toisto A/B)
t = [float(x) for x in tol.lstrip('>').split(',')]
erot = [abs(float(y.replace(',', '.')) - float(x.replace(',', '.'))) for x, y in zip(a.groups(), b.groups())]
yli = [f'{i + 1}: {e:.3g} > {t[min(i, len(t) - 1)]:g}' for i, e in enumerate(erot) if e > t[min(i, len(t) - 1)]]
ok = bool(yli) if vahintaan else not yli
print(('OK ' if ok else 'PUUTE ') + ' / '.join(f'{x}→{y}' for x, y in zip(a.groups(), b.groups())) + (' (' + '; '.join(yli) + ')' if yli else ' (ei muutosta yli toleranssin)'))
VERTAA
)
          if [[ $tulos_v == OK* ]]; then napautus_kirjaus "  vertaa: ${selite:-$nimi}" "$tulos_v"
          else napautus_kirjaus "  vertaa: ${selite:-$nimi}" "$tulos_v"; tulos 2 PUUTE "${selite:-$nimi}: ${tulos_v#PUUTE }"; fi
        fi
      else napautus_kirjaus "  $sana $nimi" "PUUTE: ei riviä ${s} s:ssa"; tulos 2 PUUTE "${selite:-$sana $nimi}: ei lokiriviä"; fi ;;
    ei-oleta)
      # Negatiivinen oletus: lokiin EI saa tulla riviä s sekunnissa (esim. selite ei soi itsestään).
      s=${loput%% *}; ehto=${loput#* }; selite=""
      [[ $ehto == *" -- "* ]] && { selite=${ehto#* -- }; ehto=${ehto%% -- *}; }
      if odota_rivi "$ehto" $s $VIIM; then
        osuma=$(tail -n +$(( VIIM + 1 )) $LOKI | grep -a -m1 -E -- "$ehto" | sed 's/.*MATKAKIRJA //' | cut -c1-160)
        napautus_kirjaus "  ei-oletus: ${selite:-$ehto}" "PUUTE: $osuma"; tulos 2 PUUTE "${selite:-$ehto}: rivi tuli ($osuma)"
      else napautus_kirjaus "  ei-oletus: ${selite:-$ehto}" "OK: ei riviä ${s} s:ssa"; fi ;;
    nakyy|ei-nay)
      s=${loput%% *}; ehto=${loput#* }; selite=""
      [[ $ehto == *" -- "* ]] && { selite=${ehto#* -- }; ehto=${ehto%% -- *}; }
      ok=""; for i in {1..$(( s * 2 > 1 ? s * 2 / 3 : 1 ))}; do
        rm -f "$D/ui-puu.json"; kirjoita ui-komento.txt "ui puu"
        for j in {1..12}; do [[ -s "$D/ui-puu.json" ]] && break; sleep 0.25; done
        xy=$(python3 $TYOKALUT/todistusraportti.py etsi "$D/ui-puu.json" "$ehto" $KW $KH 2>/dev/null)
        if [[ $sana == nakyy && -n $xy ]] || [[ $sana == ei-nay && -z $xy && -s "$D/ui-puu.json" ]]; then ok=1; break; fi
        sleep 1
      done
      kuvaus="${selite:-$sana $ehto}"
      if [[ -n $ok ]]; then napautus_kirjaus "  ui-puu: $kuvaus" "OK: '$ehto' $([[ $sana == nakyy ]] && echo "näkyy ($xy)" || echo "ei näy")"
      else napautus_kirjaus "  ui-puu: $kuvaus" "PUUTE"; cp "$D/ui-puu.json" "$L/ui-puu-$(date +%H%M%S).json" 2>/dev/null; tulos 2 PUUTE "$kuvaus: '$ehto' $([[ $sana == nakyy ]] && echo "ei näy" || echo "näkyy yhä")"; fi ;;
    kuva) kuva ${=loput} ;;
    maara)
      # maara <s> <luokka> <n> [-- selite]: näkyviä elementtejä, joilla luokka, täsmälleen n (esim. Pulun sirut = 2).
      s=${loput%% *}; r1=${loput#* }; luokka=${r1%% *}; r2=${r1#* }; n=${r2%% *}; selite=""
      [[ $r2 == *" -- "* ]] && selite=${r2#* -- }
      ok=""; saatu=0
      for i in {1..$(( s > 1 ? s : 1 ))}; do
        rm -f "$D/ui-puu.json"; kirjoita ui-komento.txt "ui puu"
        for j in {1..12}; do [[ -s "$D/ui-puu.json" ]] && break; sleep 0.25; done
        saatu=$(python3 $TYOKALUT/todistusraportti.py laske "$D/ui-puu.json" "$luokka" 2>/dev/null || echo 0)
        [[ $saatu == $n ]] && { ok=1; break; }; sleep 1
      done
      if [[ -n $ok ]]; then napautus_kirjaus "  määrä: ${selite:-$luokka}" "OK: $luokka × $saatu"
      else napautus_kirjaus "  määrä: ${selite:-$luokka}" "PUUTE: $saatu ≠ $n"; tulos 2 PUUTE "${selite:-$luokka}: $saatu kpl, odotettiin $n"; fi ;;
    video-alku)
      # Video simulaattorin ruudusta (ei ääntä; testimykistys). video-loppu lopettaa.
      nohup xcrun simctl --set "$MK_SIMSET" io $UDID recordVideo --codec=h264 --force "$L/${loput:-video}.mp4" > $L/video.log 2>&1 &
      VIDEO_PID=$!; sleep 1.5; kirjaa "video alkoi: ${loput:-video}.mp4" ;;
    video-loppu)
      [[ -n ${VIDEO_PID:-} ]] && { kill -INT $VIDEO_PID; sleep 3; kirjaa "video valmis"; VIDEO_PID=""; } ;;
    aani)
      s=${loput%% *}; nimi=${loput#* }
      rm -f "$D/$nimi.wav" "$D/$nimi-natiivi.wav"; kirjoita linssi-komento.txt "kaappaa $s $nimi"
      for i in {1..$(( (s + 20) * 2 ))}; do [[ -s "$D/$nimi.wav" ]] && break; sleep 0.5; done; sleep 1
      # Natiivikaappaus (MatkakirjaSilmukat) valmistuu omassa tahdissaan: odota sen valmis-riviä, ennen kuin kopioidaan.
      for i in {1..20}; do cat $L/konsoli-*.log 2>/dev/null | grep -a -q "natiivikaappaus valmis: .*$nimi-natiivi.wav" && break; sleep 0.5; done
      cp "$D/$nimi.wav" "$D/$nimi-natiivi.wav" $L/aani/ 2>/dev/null
      [[ -s $L/aani/$nimi.wav ]] || tulos 5 PUUTE "kaappausta $nimi.wav ei syntynyt" ;;
    aanitaso)
      # komento.txt "hiljaa" nollaa kuuntelijan (rms 0): mittauksen ajaksi "aanet", vain kun testimykistys on varmistettu
      # (ulostulo nollataan suotimessa, ei Macin kaiuttimiin).
      if ! grep -a -q 'testimykistys päällä' $LOKI; then tulos 5 PUUTE "aani mittaa ohitettu: testimykistystä ei varmistettu"; continue; fi
      kirjoita komento.txt "aanet"; sleep 0.5
      r=$(rivit); kirjoita peli-komento.txt "aani mittaa $loput"
      if odota_rivi 'rms [0-9]' $(( ${loput%.*} + 10 )) $r; then
        m=$(tail -n +$(( r + 1 )) $LOKI | grep -a -m1 'rms [0-9]' | sed 's/.*rms /rms /' | cut -c1-160)
        [[ $m == "rms 0.00000"* ]] && tulos 5 PUUTE "aani mittaa: hiljaista ($m)" || tulos 5 OK "aani mittaa: $m"
      else tulos 5 PUUTE "aani mittaa: ei tulosriviä"; fi
      kirjoita komento.txt "hiljaa" ;;
    ei-testattu) tulos 8 EI "$loput" ;;
    alku) ;;   # käsitelty ennen käynnistystä
    kaynnista-uudelleen)
      # Sovellus kiinni ja uudelleen auki samalla datalla (tallennus säilyy): uusi konsoliloki konsoli-stdout-<n>.log.
      xcrun simctl terminate $UDID $BID 2>/dev/null; sleep 2
      [[ -n $loput ]] && print -l -- ${(s:;:)loput} > "$D/peli-komento.txt"
      kaynnistyksia=$(( ${kaynnistyksia:-1} + 1 )); LOKI=$L/konsoli-stdout-$kaynnistyksia.log; : > $LOKI; VIIM=0
      xcrun simctl launch --terminate-running-process --stdout=$LOKI --stderr=$L/konsoli-stderr-$kaynnistyksia.log $UDID $BID >/dev/null \
        && kirjaa "uudelleenkäynnistys $kaynnistyksia" || tulos 2 PUUTE "uudelleenkäynnistys epäonnistui"
      odota_rivi 'testimykistys|peli-komento' 120 0; sleep 10 ;;
    *) kirjaa "tuntematon skenaariorivi: $rivi" ;;
  esac
done < $SKEN

# --- 3 poikkeukset ---
sleep 2
pk=$(cat $L/konsoli-*.log 2>/dev/null | grep -a -c -i 'exception')
(( pk == 0 )) && tulos 3 OK "Exception-rivejä 0" || tulos 3 PUUTE "Exception-rivejä $pk (ks. poikkeukset.txt)"
cat $L/konsoli-*.log | grep -a -i -B1 -A4 'exception' | head -200 > $L/poikkeukset.txt
TUNNETUT='varuste-poikkileikkaus\.jpg|ASTC.*JPEG|JPEG.*ASTC'
vr=$(cat $L/konsoli-stdout*.log | grep -a -E 'VIRHE|[Ee]rror' | grep -a -v -E "$TUNNETUT" | sed 's/.*MATKAKIRJA //' | sort | uniq -c | sort -rn | head -15)
[[ -z $vr ]] && tulos 3 OK "ei VIRHE-/error-rivejä (tunnetut suodatettu)" || { tulos 3 HUOM "VIRHE-/error-rivejä (tarkista uudet):"; print -r -- "$vr" > $L/virherivit.txt; }

# --- loppu ---
xcrun simctl terminate $UDID $BID 2>/dev/null
if [[ -z $JATA ]]; then xcrun simctl shutdown $UDID 2>/dev/null; kirjaa "simulaattori $UDID sammutettu"; fi
python3 $TYOKALUT/todistusraportti.py raportti $L "$ERA" "$VERSIO" "$LAITE" "$UDID" "$SKEN"
rm -f $SK
kirjaa "valmis: $L/TODISTUS.md"
