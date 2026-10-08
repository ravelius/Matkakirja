#!/bin/sh
# Prototyypin komentorivi. Käyttö: ./aja.sh luo | sim | xcode-sim | asenna-sim <UDID> | kaikki <UDID>
set -e
cd "$(dirname "$0")"
UNITY="/Applications/Unity/Hub/Editor/6000.3.24f1/Unity.app/Contents/MacOS/Unity"
mkdir -p tulokset
case "$1" in
  luo)
    [ -f "Assets/TextMesh Pro/Resources/Fonts & Materials/LiberationSans SDF.asset" ] || \
      "$UNITY" -batchmode -quit -projectPath . -importPackage "$(find Library/PackageCache -name 'TMP Essential Resources.unitypackage' | head -1)" -logFile tulokset/tmp.log
    "$UNITY" -batchmode -quit -projectPath . -executeMethod Matkakirja.Editori.Rakennus.LuoPallo -logFile tulokset/luo.log ;;
  sim)
    "$UNITY" -batchmode -quit -projectPath . -buildTarget iOS -executeMethod Matkakirja.Editori.Rakennus.IosSimulaattori -logFile tulokset/sim.log ;;
  xcode-sim)
    # Cesium toimittaa vain laitekirjastot: merkitään kopio simulaattorille (ks. tyokalut/).
    python3 tyokalut/simulaattorimerkinta.py Build/iOS-sim/Libraries/com.cesium.unity/Plugins/iOS
    # Omistaja 7.10.2026 klo 21.5x: -jobs 12, kun omistaja ei käytä konetta (HIDIdleTime > 300 s), muuten -jobs 8; kevyt-lipulla tai
    # kuormarajalla -jobs 4 ja nice 10 (sama linja kuin proto-3d/tyokalut/proto-kaanna.sh).
    joutilas=$(( $(ioreg -c IOHIDSystem 2>/dev/null | awk '/HIDIdleTime/ {print $NF; exit}') / 1000000000 ))
    if [ -e /tmp/matkakirja-kuormaraja ] || [ -e /tmp/matkakirja-kevyt ]; then XJ="nice -n 10 xcodebuild -jobs 4"
    elif [ "$joutilas" -gt 300 ]; then XJ="xcodebuild -jobs 12"; else XJ="xcodebuild -jobs 8"; fi
    $XJ -project Build/iOS-sim/Unity-iPhone.xcodeproj -scheme Unity-iPhone -configuration Release \
      -sdk iphonesimulator -destination 'generic/platform=iOS Simulator' -derivedDataPath Build/dd-sim \
      ARCHS=arm64 ONLY_ACTIVE_ARCH=YES CODE_SIGNING_ALLOWED=NO build > tulokset/xcode-sim.log 2>&1 || { tail -40 tulokset/xcode-sim.log; exit 1; }
    ls -d Build/dd-sim/Build/Products/Release-iphonesimulator/*.app ;;
  asenna-sim)
    APP=$(ls -d Build/dd-sim/Build/Products/Release-iphonesimulator/*.app | head -1)
    # T7-laitesarja (Natiiviseppä 8.10.): simulaattorit vain T7:llä, vanha UDID käännetään (simusarja.sh)
    SIMUSARJA=/Users/Shared/Claude/proto-3d/tyokalut/simusarja.sh
    zsh $SIMUSARJA simctl install "$2" "$APP"
    zsh $SIMUSARJA simctl launch "$2" app.matkakirja.proto3d ;;
  kaikki)
    "$0" luo && "$0" sim && "$0" xcode-sim && "$0" asenna-sim "$2" ;;
  *) echo "käyttö: $0 luo | sim | xcode-sim | asenna-sim <UDID> | kaikki <UDID>"; exit 1 ;;
esac
