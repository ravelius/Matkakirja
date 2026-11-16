#!/bin/zsh
# Rakentaa "Päivitä Matkakirja.app":n (applet + paivita.zsh + oma kuvake). Käyttö: zsh rakenna.zsh <ulos-kansio> [pelin .icns]
# Allekirjoitus erikseen (vain omistajan päätöksellä): codesign -f -s "Developer ID Application: …" --options runtime <app>
set -e; H=${0:A:h}; O=${1:?ulos-kansio}; IC=${2:-}
A="$O/Päivitä Matkakirja.app"; rm -rf "$A"; mkdir -p "$O"
osacompile -o "$A" "$H/paivita.applescript"
cp "$H/Päivitä Matkakirja.command" "$A/Contents/Resources/paivita.zsh"
/usr/libexec/PlistBuddy -c "Set :CFBundleIdentifier app.matkakirja.paivitys" "$A/Contents/Info.plist" 2>/dev/null || /usr/libexec/PlistBuddy -c "Add :CFBundleIdentifier string app.matkakirja.paivitys" "$A/Contents/Info.plist"
/usr/libexec/PlistBuddy -c "Add :CFBundleShortVersionString string 1.0" "$A/Contents/Info.plist" 2>/dev/null || true
if [[ -n $IC && -f $IC ]]; then python3 -I "$H/kuvake.py" "$IC" "$A/Contents/Resources/applet.icns"; rm -f "$A/Contents/Resources/Assets.car"; /usr/libexec/PlistBuddy -c "Delete :CFBundleIconName" "$A/Contents/Info.plist" 2>/dev/null || true; fi
xattr -cr "$A"; echo "$A"
