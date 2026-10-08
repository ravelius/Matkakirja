#!/bin/zsh
# KÄÄNNÖSPALVELU (omistaja 24.9.2026 klo 22.2x, Raamattu "TYÖTAVAN NELJÄ PARANNUSTA"; Natiiviseppä).
# Kääntää proto-gitin haaran (tai useamman yhdistettynä) omassa Unity-projektikopiossaan ja asentaa .app:n
# nimettyihin simulaattoreihin. Kuka tahansa sessio saa kutsua; Natiivisepän editori ei lukitse tätä.
#
#   proto-kaanna.sh <haara|SHA>[+<haara|SHA>…] [UDID …]
#   esim. proto-kaanna.sh natiivi-ui/tyyppikuvake FB234D08-4693-4496-9C7A-6C7C15B03963
#         proto-kaanna.sh natiiviseppa/radio-mastot+natiivi-ui/radio-mastonimi 503000D1-34AC-4C42-BDF8-7E36753A87CD
#
# Kopio: /Users/Shared/Claude/proto-3d/Matkakirja-proto-kaannos = proto-gitin worktree (irrotettu HEAD), oma
# Library ja Build. Haarat näkyvät heti ilman pushia (sama git). Pohja on aina master; annetut haarat
# mergetään sen päälle (--no-ff, ei tallennu mihinkään haaraan). Jono: yksi käännös kerrallaan, seuraava odottaa
# lukkoa (/tmp/matkakirja-kaannospalvelu.lukko). Unity -batchmode -nographics.
# Vaiheet: merge → tyokalut/tarkista.sh → LuoPallo → IosSimulaattori → xcodebuild → simctl install (+ käynnistetty
# simulaattori) → [PROTO_APP_KOPIO=<kansio>: .app:n kopio] → välitiedostojen siivous (aina). Loki: proto-3d/lokit/kaannospalvelu/<aika>-<nimi>.log; tulos viimeisellä rivillä:
#   KÄÄNNETTY <SHA> <haarat> → asennettu <UDID…>    tai    VIKA <vaihe>: <syy>
# Unityn luomat/täydentämät .metat kopioidaan ennen nollausta kansioon <loki>-metat/ (polut säilyvät).
# Toisten simulaattoreihin asennetaan vain niiden omistajan pyynnöstä (Raamattu, SIMULAATTORIEN OMISTUS).
setopt pipe_fail
KOPIO=/Users/Shared/Claude/proto-3d/Matkakirja-proto-kaannos
UNITY="/Applications/Unity/Hub/Editor/6000.3.24f1/Unity.app/Contents/MacOS/Unity"
LUKKO=/tmp/matkakirja-kaannospalvelu.lukko
LOKIT=/Users/Shared/Claude/proto-3d/lokit/kaannospalvelu
[[ $# -ge 1 ]] || { sed -n 2,17p "$0"; exit 2; }
HAARAT=$1; shift; SIMS=("$@")
# T7-LAITESARJA (omistaja 7.10. 23.0x; Natiiviseppä 8.10.): simulaattorit vain T7:llä (simusarja.sh: xcrun simctl → --set T7);
# vanhat sisäiset UDID:t käännetään saman nimisen T7-laitteen UDID:iksi. T7 puuttuu → VIKA, ei paluuta sisäiseen sarjaan.
if (( ${#SIMS} )); then
  source /Users/Shared/Claude/proto-3d/tyokalut/simusarja.sh || { print "VIKA T7: simulaattorisarja puuttuu (/Volumes/T7 4TB)"; exit 2; }
  SIMS=(${(f)"$(for s in $SIMS; do mk_kaanna $s; done)"})
fi
mkdir -p $LOKIT
NIMI=$(print -r -- $HAARAT | tr '/+' '-_' | cut -c1-60)
LOKI=$LOKIT/$(date +%Y%m%d-%H%M%S)-$NIMI.log
vika() { print -r -- "VIKA $1" | tee -a $LOKI; exit 1; }
# KUORMARAJA (omistaja Fablen ja Julkaisijan kautta 28.9.2026, voimassa klo 17 asti): kun lippu /tmp/matkakirja-kuormaraja on
# olemassa, Unity ja xcodebuild ajetaan matalammalla prioriteetilla (nice 10 — alle taustapolttojen 15 —, xcodebuild -jobs 4) ja asennus odottaa, kunnes
# Macilla ei ole muita käynnissä olevia simulaattoreita (koko Macilla enintään yksi; odotus enintään 20 min, sitten .app jää
# talteen asentamatta). Lippu pois: rm -f /tmp/matkakirja-kuormaraja.
RAJA=/tmp/matkakirja-kuormaraja
# PRIORITEETTI (Päätoimittaja 7.10.2026 klo 03.2x, TF 155: Unity nice 19:llä ja taustapoltot nice 15:llä → Burst nälkiintyi):
# juna- ja TF-käännökset ajetaan AINA pienemmällä nicellä kuin taustapoltot (nice 15) — tavallisesti 0, kuormarajalla tai
# kevyt-lipulla nice 10. Omistajan omat työt (nice 0) menevät silti edelle kuormarajan aikana.
NICE=(); [[ -e $RAJA ]] && NICE=(nice -n 10)

# Jono: odota vuoroa (enintään 60 min), sitten lukko omaksi.
oma=0
for i in {1..360}; do
  if mkdir $LUKKO 2>/dev/null; then oma=1; break; fi
  # Kaatuneen ajon lukko: prosessia ei enää ole.
  p=$(cat $LUKKO/pid 2>/dev/null); [[ -n $p ]] && ! kill -0 $p 2>/dev/null && { rm -rf $LUKKO; continue; }
  [[ $i == 1 ]] && echo "jonossa: $(cat $LUKKO/kuka 2>/dev/null)"
  sleep 10
done
(( oma )) || vika "jono: lukko ei vapautunut tunnissa ($(cat $LUKKO/kuka 2>/dev/null))"
echo $$ > $LUKKO/pid; echo "$HAARAT $(date +%H:%M)" > $LUKKO/kuka
trap "rm -rf $LUKKO" EXIT

# BURST-LINKKERI (selvitys docs/raportit/burst-linkkeri-selvitys-20260929.md, omistajan lupa 29.9.2026): edellisen ajon
# Unity-lapset (Burstin bcl-palvelin, burst-lld, shader-kääntäjä) voivat elää hetken -quit:n jälkeen samassa kopiossa, ja
# Burstin editorin esikäännös (macOS-isännän .bundle) kaatuu silloin: AotLinkerException, 12–34 s. Odotetaan enintään 30 s,
# kunnes kopioon ei viittaa yksikään prosessi (työhakemisto tai komentorivi), ja annetaan ajolle oma lyhyt TMPDIR
# (ei yhteisiä $TMPDIR/tmp*.tmp-tiedostoja; lyhyt polku, koska Burstin palvelin voi luoda sinne soketteja).
kopion_prosessit() {
  { pgrep -f "$KOPIO"
    lsof -a -d cwd -Fpn 2>/dev/null | awk -v k="$KOPIO" '/^p/ { p = substr($0, 2) } /^n/ { n = substr($0, 2); if (n == k || index(n, k "/") == 1) print p }'
  } | sort -u | grep -v -x -e "$$"
}
cd /   # oma työhakemisto ei saa näkyä kopion prosessina (kutsuja voi olla kopion sisällä)
for i in {1..30}; do
  jaljella=$(kopion_prosessit | tr '\n' ' ')
  [[ -z ${jaljella// } ]] && break
  (( i == 1 )) && echo "odotetaan edellisen ajon prosesseja kopiossa: $jaljella" >> $LOKI
  sleep 1
done
(( i > 1 )) && echo "odotus $(( i - 1 )) s${jaljella:+, jäljellä yhä: $jaljella}" >> $LOKI
TMPDIR=$(mktemp -d /tmp/mkk.XXXXXX) && export TMPDIR
trap "rm -rf $LUKKO $TMPDIR" EXIT

df_g=$(df -g /Users/Shared | awk 'NR==2{print $4}')
(( df_g >= 25 )) || vika "levy: vain $df_g Gt vapaana (raja 25)"

cd $KOPIO || vika "kopio puuttuu: $KOPIO"
# Käännös funktiona, jonka vaiheet palauttavat koodin 11–17 (return): ennen 28.9.2026 lohko { … } >> $LOKI ja sen exit
# päättivät koko ajon ennen VIKA-riviä, jolloin vahti kirjasi tyhjän rivin (junakäännös 17.07, Burst-linkkeri; omistajan lupa
# korjaukseen 28.9. klo 19.0x).
kaanna() {
  echo "== $(date '+%d.%m. %H:%M') $HAARAT → ${SIMS[*]:-ei asennusta}"
  git merge --abort 2>/dev/null; git reset -q --hard; git clean -fdq Assets/ Packages/ ProjectSettings/
  git checkout -q --detach master || return 11
  for h in ${(s:+:)HAARAT}; do
    git rev-parse -q --verify "$h^{commit}" >/dev/null || { echo "tuntematon haara $h"; return 12; }
    git -c user.name=Kaannospalvelu -c user.email=kaannospalvelu@localhost merge --no-ff -q "$h" -m "Käännöspalvelu: $h" \
      || { git diff --name-only --diff-filter=U; return 13; }
  done
  echo "pohja $(git rev-parse --short HEAD)"
  ./tyokalut/tarkista.sh || return 14
  # LuoPallo ei rakenna pelaajaa: Burstin editorikäännös pois (UNITY_BURST_DISABLE_COMPILATION, BurstCompilerOptions.cs). EI
  # IosSimulaattori-riville: sama lippu ohittaisi iOS:n AOT-kirjastot (BurstAotCompiler.cs 377, 403).
  # VAIHEAJAT (omistaja 7.10.2026 klo 21.5x Päätoimittajan kautta): luo, Unity-vienti (sis. IL2CPP-muunnos) ja xcodebuild lokiin.
  t0=$SECONDS
  UNITY_BURST_DISABLE_COMPILATION=1 $NICE "$UNITY" -batchmode -nographics -quit -projectPath . -executeMethod Matkakirja.Editori.Rakennus.LuoPallo -logFile tulokset/luo.log || return 15
  t_luo=$(( SECONDS - t0 ))
  ! grep -q "error CS\|Aborting batchmode" tulokset/luo.log || { grep "error CS" tulokset/luo.log | sort -u | head; return 15; }
  # .DS_Store (Finder, käyttäjä koodaus) Build-kansioissa kaatoi Unityn kansion poiston "IOException: Directory not empty"
  # (30.9.2026 klo 08.34, 11.56, 15.56; omistajan lupa 30.9. Natiivisepän sessiossa): poistetaan juuri ennen käännöstä.
  find Build -name .DS_Store -delete 2>/dev/null
  # Uusinta kerran (1.10.2026 klo 16.24: .DS_Store syntyi kesken käännöksen; omistajan lupa Päätoimittajan kautta): jos kaatuminen
  # on "Directory not empty", siivotaan .DS_Storet ja käännetään kerran uudelleen; sim.log talteen sim-1.log:ksi.
  if ! $NICE "$UNITY" -batchmode -nographics -quit -projectPath . -buildTarget iOS -executeMethod Matkakirja.Editori.Rakennus.IosSimulaattori -logFile tulokset/sim.log; then
    grep -q "Directory not empty" tulokset/sim.log || return 16
    cp tulokset/sim.log tulokset/sim-1.log
    echo "uusinta: Directory not empty → .DS_Store-siivous ja toinen yritys" | tee -a $LOKI
    find Build -name .DS_Store -delete 2>/dev/null
    $NICE "$UNITY" -batchmode -nographics -quit -projectPath . -buildTarget iOS -executeMethod Matkakirja.Editori.Rakennus.IosSimulaattori -logFile tulokset/sim.log || return 16
  fi
  ! grep -q "error CS\|Aborting batchmode" tulokset/sim.log || { grep "error CS" tulokset/sim.log | sort -u | head; return 16; }
  t_vienti=$(( SECONDS - t0 - t_luo ))
  # Kuten aja.sh xcode-sim. Omistaja 29.9.2026 klo 19.3x (Natiivisepän sessiossa): -jobs 8; kevyt-lipulla
  # /tmp/matkakirja-kevyt tai kuormarajalla -jobs 4 ja nice 10 (alle taustapolttojen 15, ks. PRIORITEETTI).
  python3 tyokalut/simulaattorimerkinta.py Build/iOS-sim/Libraries/com.cesium.unity/Plugins/iOS
  # Omistaja 7.10.2026 klo 21.5x ("ota käyttöön", kumoaa osin 29.9.:n -jobs 8 -linjan): -jobs 12 (Mac Studion 12 tehoydintä), kun
  # omistaja ei käytä konetta (HIDIdleTime > 300 s käännöksen alkaessa); muuten -jobs 8; kevyt/kuormaraja ennallaan (-jobs 4, nice 10).
  # IL2CPP-muunnos (Unity-viennissä) käyttää oletuksena jo kaikkia ytimiä; C++-käännös tapahtuu tässä xcodebuildissa.
  joutilas=$(( $(ioreg -c IOHIDSystem 2>/dev/null | awk '/HIDIdleTime/ {print $NF; exit}') / 1000000000 ))
  if [[ -e $RAJA || -e /tmp/matkakirja-kevyt ]]; then XJ=(nice -n 10 xcodebuild -jobs 4)
  elif (( joutilas > 300 )); then XJ=(xcodebuild -jobs 12)
  else XJ=(xcodebuild -jobs 8); fi
  echo "xcodebuild: ${XJ[*]} (HIDIdleTime ${joutilas} s)" >> $LOKI
  t1=$SECONDS
  $XJ -project Build/iOS-sim/Unity-iPhone.xcodeproj -scheme Unity-iPhone -configuration Release \
    -sdk iphonesimulator -destination 'generic/platform=iOS Simulator' -derivedDataPath Build/dd-sim \
    ARCHS=arm64 ONLY_ACTIVE_ARCH=YES CODE_SIGNING_ALLOWED=NO build > tulokset/xcode-sim.log 2>&1 || { tail -40 tulokset/xcode-sim.log; return 17; }
  echo "vaiheajat: luo ${t_luo} s, Unity-vienti ${t_vienti} s (sis. IL2CPP-muunnos), xcodebuild $(( SECONDS - t1 )) s (${XJ[*]})"
}
kaanna >> $LOKI 2>&1
r=$?
SHA=$(git rev-parse --short HEAD)
case $r in
  0) ;; 11) vika "master: checkout";; 12|13) vika "merge: $(tail -3 $LOKI | tr '\n' ' ')";;
  14) vika "tarkista: $(grep -E 'error CS|virheitä' $LOKI | tail -3 | tr '\n' ' ')";;
  15) vika "luo: $({ grep 'error CS' $LOKI; grep -a '^MATKAKIRJA: ' tulokset/luo.log; } | head -2 | cut -c1-200 | tr '\n' ' ') (tulokset/luo.log)";;
  16) vika "unity-sim: $({ grep 'error CS' $LOKI; grep -a '^MATKAKIRJA: ' tulokset/sim.log; } | head -2 | cut -c1-200 | tr '\n' ' ') (tulokset/sim.log)";;
  17) vika "xcode: $(grep 'error:' $LOKI | head -2 | tr '\n' ' ')";;
  *) vika "tuntematon ($r)";;
esac
APP=$(ls -d Build/dd-sim/Build/Products/Release-iphonesimulator/*.app | head -1)
ok=()
# simctl install vaatii käynnissä olevan simulaattorin. Asennuksen jälkeen sammutetaan ne, jotka eivät olleet käynnissä
# ennen ajoa (Fable 25.9. klo 10.2x: käännösvahti jätti 8 simulaattoria muistiin); käynnissä olleet jäävät ennalleen.
kaynnissa=(${(f)"$(xcrun simctl list devices booted | grep -oE '[0-9A-F]{8}-[0-9A-F-]{27}')"})
for s in $SIMS; do
  if [[ -e $RAJA ]] && (( ! ${kaynnissa[(Ie)$s]} )); then
    muut=1
    for w in {1..120}; do
      muut=$(xcrun simctl list devices booted | grep -oE '[0-9A-F]{8}-[0-9A-F-]{27}' | grep -vc "$s")
      (( muut == 0 )) && break
      (( w == 1 )) && echo "kuormaraja: asennus $s odottaa, muita simulaattoreita käynnissä $muut" | tee -a $LOKI
      sleep 10
    done
    (( muut == 0 )) || { echo "kuormaraja: $s jäi asentamatta (muita käynnissä 20 min), .app: $APP" | tee -a $LOKI; continue; }
  fi
  xcrun simctl boot $s 2>/dev/null
  xcrun simctl install $s "$APP" >> $LOKI 2>&1 && ok+=($s) || echo "asennus epäonnistui: $s" | tee -a $LOKI
  if (( ! ${kaynnissa[(Ie)$s]} )); then xcrun simctl shutdown $s 2>/dev/null; echo "sammutettu: $s" >> $LOKI; fi
done
# APP-KOPIO JA SIIVOUS (Päätoimittaja 7.10.2026 klo 01.4x ja 02.0x, Julkaisijan ehdotus): PROTO_APP_KOPIO=<kansio> → .app kopioidaan
# sinne (ditto). Sen jälkeen siivous (ks. INKREMENTAALINEN alla); .app jää Productsiin. Epäonnistunut kopio jättää välitiedostot.
siivoa=1
if [[ -n $PROTO_APP_KOPIO ]]; then
  mkdir -p "$PROTO_APP_KOPIO"
  if ditto "$APP" "$PROTO_APP_KOPIO/${APP:t}" >> $LOKI 2>&1; then
    echo "app-kopio: $PROTO_APP_KOPIO/${APP:t}" | tee -a $LOKI
  else
    siivoa=0; echo "app-kopio epäonnistui: $PROTO_APP_KOPIO (Intermediates ja dSYM jäivät)" | tee -a $LOKI
  fi
fi
if (( siivoa )); then
  # INKREMENTAALINEN (omistaja 7.10.2026 klo 21.5x): viimeisimmän käännöksen välitiedostot (dd-sim/Intermediates.noindex,
  # Build/iOS-sim; Library/Bee ja Il2cppBuildCache ovat Libraryssä ja säilyvät aina) jäävät seuraavaa käännöstä varten. Polut ovat
  # kiinteät, joten sarjoja on aina vain yksi (uusi korvaa vanhan, ~4,5 Gt). dSYM poistetaan aina. Levyraja 36 Gi: alle sen
  # välitiedostot poistetaan kuten ennen (Päätoimittaja 7.10. klo 09.1x).
  rm -rf Build/dd-sim/Build/Products/Release-iphonesimulator/*.dSYM(N)
  vapaa=$(df -g /System/Volumes/Data | tail -1 | awk '{print $4}')
  if (( vapaa < 36 )); then
    rm -rf Build/dd-sim/Build/Intermediates.noindex Build/iOS-sim
    echo "siivous: dSYM, Intermediates.noindex ja Build/iOS-sim poistettu (levyä vain $vapaa Gi < 36)" >> $LOKI
  else
    echo "siivous: dSYM poistettu; välitiedostot säilytetty inkrementaalista käännöstä varten (levyä $vapaa Gi)" >> $LOKI
  fi
fi
# Unityn luomat tai täydentämät .metat talteen ennen nollausta (kirjoittaja commitoi ne omaan haaraansa).
METAT=${LOKI%.log}-metat
for f in ${(f)"$(git status --porcelain --untracked-files=all | awk '{print $2}' | grep '\.meta$')"}; do
  mkdir -p $METAT/${f:h}; cp "$f" $METAT/$f
done
[[ -d $METAT ]] && echo "metat talteen: $METAT" | tee -a $LOKI
# Kopio takaisin puhtaaksi masteriksi (Library ja Build säilyvät).
git reset -q --hard; git clean -fdq Assets/ Packages/ ProjectSettings/; git checkout -q --detach master
print -r -- "KÄÄNNETTY $SHA $HAARAT → asennettu ${ok[*]:-–} ($(date +%H:%M), loki $LOKI)" | tee -a $LOKI
