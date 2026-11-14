#!/bin/sh
# Tyyppimallien luonnokset: osakirjasto (lahde/, juna-224:stä) + oma/ Unityn dotnetilla ja Roslynilla (sama kaava kuin Kartta-testit/kaanna.sh).
set -e
cd "$(dirname "$0")"
K63=/Applications/Unity/Hub/Editor/6000.3.24f1/Unity.app/Contents/Resources/Scripting
DN=$K63/NetCoreRuntime/dotnet
REF=$K63/NetCoreRuntime/shared/Microsoft.NETCore.App/6.0.21
VIITTEET=""
for f in "$REF"/*.dll; do case "$(basename "$f")" in Microsoft.VisualBasic*|mscorlib.dll|netstandard.dll|System.Private.*) ;; *) VIITTEET="$VIITTEET -r:$f";; esac; done
VIITTEET="$VIITTEET -r:$REF/System.Private.CoreLib.dll -r:$REF/netstandard.dll -r:$REF/mscorlib.dll"
mkdir -p rakennus
$DN "$K63/DotNetSdkRoslyn/csc.dll" -nologo -nowarn:1701,1702,0414,0169,0649,0219,0162 -langversion:9.0 -nullable:disable -target:exe -main:Matkakirja.Luonnos \
  -out:rakennus/Luonnos.dll $VIITTEET lahde/*.cs oma/*.cs
cat > rakennus/Luonnos.runtimeconfig.json <<J
{"runtimeOptions":{"tfm":"net6.0","framework":{"name":"Microsoft.NETCore.App","version":"6.0.21"}}}
J
$DN rakennus/Luonnos.dll "${1:-obj}"
