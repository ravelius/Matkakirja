#!/bin/zsh
# Natiivin Mac-sovelluksen plugarit (Natiiviseppä 6.10.2026): Unity ei käännä .mm-lähteitä macOS-pelaajalle, joten
# jokainen tyokalut/mac-plugarit/<Nimi>.mm käännetään valmiiksi Assets/Plugins/macOS/<Nimi>.bundle:ksi (arm64,
# macOS 13+). Aja muutoksen jälkeen ja committaa .bundle; .metat tulevat ensimmäisellä kerralla mukana (uuidgen).
set -e
cd "$(dirname "$0")/../.."
KOHDE=Assets/Plugins/macOS
mkdir -p $KOHDE
[[ -f Assets/Plugins/macOS.meta ]] || printf 'fileFormatVersion: 2\nguid: %s\nfolderAsset: yes\nDefaultImporter:\n  externalObjects: {}\n  userData: \n  assetBundleName: \n  assetBundleVariant: \n' "$(uuidgen | tr -d - | tr A-F a-f)" > Assets/Plugins/macOS.meta
for lahde in tyokalut/mac-plugarit/*.mm; do
  nimi=$(basename $lahde .mm)
  b=$KOHDE/$nimi.bundle
  rm -rf $b; mkdir -p $b/Contents/MacOS
  clang++ -bundle -fobjc-arc -arch arm64 -mmacosx-version-min=13.0 -O2 -framework AppKit -o $b/Contents/MacOS/$nimi $lahde
  cat > $b/Contents/Info.plist <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>CFBundleExecutable</key><string>$nimi</string>
  <key>CFBundleIdentifier</key><string>fi.matkakirja.plugari.$nimi</string>
  <key>CFBundleName</key><string>$nimi</string>
  <key>CFBundlePackageType</key><string>BNDL</string>
  <key>CFBundleInfoDictionaryVersion</key><string>6.0</string>
  <key>CFBundleVersion</key><string>1</string>
</dict></plist>
EOF
  if [[ ! -f $b.meta ]]; then
    cat > $b.meta <<EOF
fileFormatVersion: 2
guid: $(uuidgen | tr -d - | tr A-F a-f)
folderAsset: yes
PluginImporter:
  externalObjects: {}
  serializedVersion: 2
  iconMap: {}
  executionOrder: {}
  defineConstraints: []
  isPreloaded: 0
  isOverridable: 1
  isExplicitlyReferenced: 0
  validateReferences: 1
  platformData:
  - first:
      Any:
    second:
      enabled: 0
      settings: {}
  - first:
      Editor: Editor
    second:
      enabled: 0
      settings:
        DefaultValueInitialized: true
  - first:
      Standalone: OSXUniversal
    second:
      enabled: 1
      settings:
        CPU: ARM64
  userData:
  assetBundleName:
  assetBundleVariant:
EOF
  fi
  echo "$b $(lipo -archs $b/Contents/MacOS/$nimi) $(stat -f%z $b/Contents/MacOS/$nimi)"
done
