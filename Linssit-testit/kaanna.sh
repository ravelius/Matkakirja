#!/bin/sh
# Kääntää linssien puhtaan C#-ytimen (Assets/Matkakirja/Linssit/Ydin) ja testit
# Unityn mukana tulevalla dotnetilla ja Roslynilla ilman editoria, ja ajaa testit.
# Sama kaava kuin Peli-testit/kaanna.sh. Ydin viittaa Matkakirja.Peliin MiniJsonin ja Paatason (raaka data) takia. Käyttö: ./kaanna.sh [testin nimen osa]
set -e
cd "$(dirname "$0")"
# Editori ja versiomääritteet projektin ProjectVersion.txt:n mukaan (Julkaisija 10.10.2026, omistaja: 6.7 päälinjaksi).
R=$(zsh /Users/Shared/Claude/proto-3d/tyokalut/unity-polku.sh --hakemisto "$(git rev-parse --show-toplevel)")/Unity.app/Contents/Resources/Scripting
K63=/Applications/Unity/Hub/Editor/6000.3.24f1/Unity.app/Contents/Resources/Scripting   # kääntäjäketju 6.3:sta (6.7:ssä eri rakenne)
DN=$K63/NetCoreRuntime/dotnet
REF=$K63/NetCoreRuntime/shared/Microsoft.NETCore.App/6.0.21
mkdir -p rakennus
VIITTEET=""
for f in "$REF"/*.dll; do case "$(basename "$f")" in Microsoft.VisualBasic*|mscorlib.dll|netstandard.dll|System.Private.*) ;; *) VIITTEET="$VIITTEET -r:$f";; esac; done
VIITTEET="$VIITTEET -r:$REF/System.Private.CoreLib.dll -r:$REF/netstandard.dll -r:$REF/mscorlib.dll"
$DN "$K63/DotNetSdkRoslyn/csc.dll" -nologo -nowarn:1701,1702 -langversion:9.0 -nullable:disable -target:exe \
  -out:rakennus/LinssiTestit.dll $VIITTEET $(find ../Assets/Matkakirja/Linssit/Ydin Testit -name '*.cs') ../Assets/Matkakirja/Peli/MiniJson.cs ../Assets/Matkakirja/Peli/Paataso.cs
cat > rakennus/LinssiTestit.runtimeconfig.json <<J
{"runtimeOptions":{"tfm":"net6.0","framework":{"name":"Microsoft.NETCore.App","version":"6.0.21"}}}
J
$DN rakennus/LinssiTestit.dll "$@"
