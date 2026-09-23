#!/bin/sh
# Kääntää puhtaan C#-pelilogiikan (Peli/) ja testit (Testit/) Unityn mukana
# tulevalla dotnetilla ja Roslynilla ilman editoria, ja ajaa testit.
# Kielitaso C# 9 = Unity 6:n taso. Käyttö: ./kaanna.sh [testin nimen osa]
set -e
cd "$(dirname "$0")"
R=/Applications/Unity/Hub/Editor/6000.3.24f1/Unity.app/Contents/Resources/Scripting
DN=$R/NetCoreRuntime/dotnet
REF=$R/NetCoreRuntime/shared/Microsoft.NETCore.App/6.0.21
mkdir -p rakennus
VIITTEET=""
for f in "$REF"/*.dll; do case "$(basename "$f")" in Microsoft.VisualBasic*|mscorlib.dll|netstandard.dll|System.Private.*) ;; *) VIITTEET="$VIITTEET -r:$f";; esac; done
VIITTEET="$VIITTEET -r:$REF/System.Private.CoreLib.dll -r:$REF/netstandard.dll -r:$REF/mscorlib.dll"
$DN "$R/DotNetSdkRoslyn/csc.dll" -nologo -nowarn:1701,1702 -langversion:9.0 -nullable:disable -target:exe \
  -out:rakennus/Testit.dll $VIITTEET $(find ../Assets/Matkakirja/Peli Testit -name '*.cs')
cat > rakennus/Testit.runtimeconfig.json <<J
{"runtimeOptions":{"tfm":"net6.0","framework":{"name":"Microsoft.NETCore.App","version":"6.0.21"}}}
J
$DN rakennus/Testit.dll "$@"
