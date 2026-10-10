#!/bin/zsh
# EDITOR-KOODIN KÄÄNNÖSTARKISTUS (Natiivi-UI 10.10.2026): unity-tarkistus.sh ei käännä Assets/**/Editor-kansioita, joten esim.
# Editor/AsetteluTesti.cs käännetään erikseen Assembly-CSharp-editori.dll:ää vasten. Aja ENSIN tyokalut/tarkista.sh samassa
# haarassa (dll on sen viimeisimmästä ajosta). UnityEditor.dll jätetään pois (moduulien kanssa CS0433), samoin SteamAudio*.
#   tyokalut/kaanna-editori.sh [tiedosto.cs …]   (oletus: Assets/Matkakirja/Editor/AsetteluTesti.cs)
cd "$(dirname "$0")/.."
# Editori ja versiomääritteet projektin ProjectVersion.txt:n mukaan (Julkaisija 10.10.2026, omistaja: 6.7 päälinjaksi).
U=$(zsh /Users/Shared/Claude/proto-3d/tyokalut/unity-polku.sh --hakemisto .) || exit 2
UVER_DEF=$(zsh /Users/Shared/Claude/proto-3d/tyokalut/unity-polku.sh --maaritteet .) || exit 2
S=$U/Unity.app/Contents/Resources/Scripting
NS=$S/NetStandard
K63=/Applications/Unity/Hub/Editor/6000.3.24f1/Unity.app/Contents/Resources/Scripting   # kääntäjäketju 6.3:sta (6.7:ssä eri rakenne)
R=Peli-testit/rakennus/unity
K=${MATKAKIRJA_KIRJASTOT:-$(zsh /Users/Shared/Claude/proto-3d/tyokalut/unity-polku.sh --kirjastot .)}   # saman Unity-version Library (6.7: CS0433 6.3-Librarylla)
TIED=("$@"); (( ${#TIED} )) || TIED=(Assets/Matkakirja/Editor/AsetteluTesti.cs)
ULOS=$(mktemp -d)
args=(-nologo -noconfig -nostdlib -target:library -langversion:9.0 -nullable:disable -nowarn:0169,0649,0282,1701,1702
  -define:"$UVER_DEF;UNITY_EDITOR;UNITY_EDITOR_OSX;ENABLE_INPUT_SYSTEM;NETSTANDARD"
  -r:$NS/ref/2.1.0/netstandard.dll -out:$ULOS/editori.dll)
for f in $NS/compat/2.1.0/shims/netstandard/*.dll $NS/compat/2.1.0/shims/netfx/*.dll $S/Managed/UnityEngine/*.dll; do args+=(-r:$f); done
for f in $R/Assembly-CSharp-editori.dll $R/Assembly-CSharp-firstpass-editori.dll $R/Matkakirja.Kartta-editori.dll $R/Matkakirja.Linssit.Ydin.dll $R/Matkakirja.Peli.dll; do args+=(-r:$f); done
for f in $K/*.dll; do case ${f:t} in Assembly-CSharp*|Matkakirja.*|SteamAudio*) ;; *) args+=(-r:$f);; esac; done
virheet=$($K63/NetCoreRuntime/dotnet $K63/DotNetSdkRoslyn/csc.dll $args $TIED 2>&1 | grep -E ': error ' | sort -u)
rm -rf $ULOS
if [[ -n $virheet ]]; then print -r -- "$virheet"; echo "kaanna-editori: $(print -r -- "$virheet" | wc -l | tr -d ' ') virhettä"; exit 1; fi
echo "kaanna-editori: 0 virhettä (${#TIED} tiedostoa)"
