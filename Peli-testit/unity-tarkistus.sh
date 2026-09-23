#!/bin/sh
# KÄÄNNÖSTARKISTUS ILMAN EDITORIA (Pelikoodari, erä 3, 23.9.2026).
#
# Kääntää Unityn Roslynilla (csc) samat kaksi assemblya kuin editori:
#   1. Matkakirja.Peli  = Assets/Matkakirja/Peli/*.cs vain netstandard 2.1:tä
#      vasten (asmdef noEngineReferences: UnityEngine-viite olisi virhe);
#   2. Assembly-CSharp  = Assets/Matkakirja/Scripts/**/*.cs Unityn moduuleja,
#      pakettien assemblyjä (UGUI, TextMeshPro, Input System, Cesium,
#      Mathematics …) ja vaiheen 1 tulosta vasten, kahdesti:
#        ios     — iOS/IL2CPP-moduulit, UNITY_IOS (laitekoodi, DllImport-haarat)
#        editori — editorin moduulit, UNITY_EDITOR + UNITY_IOS (#else-haarat)
#
# Pakettien assemblyt luetaan 3D-selvittäjän projektin Library/ScriptAssemblies/
# -kansiosta (vain luku; ne syntyvät, kun editori on kerran avannut projektin).
# Toisen kansion voi antaa: MATKAKIRJA_KIRJASTOT=/polku ./unity-tarkistus.sh
# Käyttö: ./unity-tarkistus.sh [-v]   (-v tulostaa myös varoitukset)
# Poistumiskoodi = virheiden määrä (0 = kaikki kääntyy).
set -e
cd "$(dirname "$0")"
U=/Applications/Unity/Hub/Editor/6000.3.24f1
S=$U/Unity.app/Contents/Resources/Scripting
DN=$S/NetCoreRuntime/dotnet
CSC="$S/DotNetSdkRoslyn/csc.dll"
NS=$S/NetStandard
IOS_MODUULIT=$U/PlaybackEngines/iOSSupport/Variations/il2cpp/Managed
EDITORI_MODUULIT=$S/Managed/UnityEngine
KIRJASTOT=${MATKAKIRJA_KIRJASTOT:-/Users/Shared/Claude/proto-3d/Matkakirja-proto/Library/ScriptAssemblies}
ASSETS=../Assets/Matkakirja
ULOS=rakennus/unity
VAROITUKSET=0
[ "$1" = "-v" ] && VAROITUKSET=1

for p in "$DN" "$CSC" "$NS/ref/2.1.0/netstandard.dll" "$IOS_MODUULIT" "$EDITORI_MODUULIT" "$KIRJASTOT"; do
  [ -e "$p" ] || { echo "unity-tarkistus: puuttuu $p"; exit 100; }
done
mkdir -p "$ULOS"

# netstandard 2.1 ja sen shimit (samat kuin Unityn .rsp-tiedostossa).
NETSTD="-r:$NS/ref/2.1.0/netstandard.dll"
for f in "$NS"/compat/2.1.0/shims/netstandard/*.dll "$NS"/compat/2.1.0/shims/netfx/*.dll; do NETSTD="$NETSTD -r:$f"; done

# Pakettien ajonaikaiset assemblyt: kaikki paitsi editori-, testi- ja
# koodigeneraattoriassemblyt sekä projektin omat (ne käännetään tässä).
PAKETIT=""
for f in "$KIRJASTOT"/*.dll; do
  n=$(basename "$f" .dll)
  case "$n" in
    Assembly-CSharp*|Matkakirja.*|*Editor*|*.Tests|*TestRunner*|*TestFramework*|*CodeGen*|*DocCodeSamples*|*DocCodeExamples*|PPv2URPConverters|Unity.PerformanceTesting*|Unity.AI.Navigation.Updater) ;;
    *) PAKETIT="$PAKETIT -r:$f" ;;
  esac
done

YHTEISET="-nologo -noconfig -nostdlib -target:library -langversion:9.0 -nullable:disable -deterministic -utf8output
  -nowarn:0169,0649,0282,1701,1702"
DEF_YHT="UNITY_6000_3_24;UNITY_6000_3;UNITY_6000;UNITY_5_3_OR_NEWER;UNITY_2019_4_OR_NEWER;UNITY_2020_3_OR_NEWER;UNITY_2021_3_OR_NEWER;UNITY_2022_3_OR_NEWER;UNITY_2023_1_OR_NEWER;UNITY_6000_0_OR_NEWER;UNITY_6000_1_OR_NEWER;UNITY_6000_2_OR_NEWER;UNITY_6000_3_OR_NEWER;ENABLE_INPUT_SYSTEM;ENABLE_UNITYWEBREQUEST;NET_STANDARD_2_0;NET_STANDARD_2_1;NET_STANDARD;NETSTANDARD;NETSTANDARD2_1;CSHARP_7_3_OR_NEWER;UNITY_IOS;UNITY_IPHONE;PLATFORM_IOS"

VIRHEITA=0
kaanna() { # nimi loki csc-argumentit…
  nimi=$1; loki=$2; shift 2
  set +e
  $DN "$CSC" "$@" > "$loki" 2>&1
  set -e
  v=$(grep -c ': error ' "$loki" || true)
  w=$(grep -c ': warning ' "$loki" || true)
  printf '%-28s %3s virhettä, %3s varoitusta\n' "$nimi" "$v" "$w"
  grep ': error ' "$loki" | sed 's#^.*/Assets/#  Assets/#' || true
  [ $VAROITUKSET = 1 ] && { grep ': warning ' "$loki" | sed 's#^.*/Assets/#  Assets/#' || true; }
  VIRHEITA=$((VIRHEITA + v))
}

# 1. Puhdas pelilogiikka ilman UnityEngineä.
kaanna "Matkakirja.Peli" "$ULOS/peli.log" $YHTEISET $NETSTD -out:"$ULOS/Matkakirja.Peli.dll" \
  $(find "$ASSETS/Peli" -name '*.cs')
[ -f "$ULOS/Matkakirja.Peli.dll" ] || { echo "unity-tarkistus: Matkakirja.Peli ei kääntynyt"; exit 1; }

SKRIPTIT=$(find "$ASSETS/Scripts" -name '*.cs')

# 2a. iOS-laite (IL2CPP): UNITY_IOS ilman UNITY_EDITORia.
IOS=""
for f in "$IOS_MODUULIT"/UnityEngine*.dll; do IOS="$IOS -r:$f"; done
kaanna "Assembly-CSharp (ios)" "$ULOS/ios.log" $YHTEISET $NETSTD $IOS $PAKETIT -r:"$ULOS/Matkakirja.Peli.dll" \
  -define:"$DEF_YHT;ENABLE_IL2CPP" -out:"$ULOS/Assembly-CSharp-ios.dll" $SKRIPTIT

# 2b. Editori iOS-kohteella: UNITY_EDITOR, joten #else-haarat käännetään.
EDI=""
for f in "$EDITORI_MODUULIT"/*.dll; do EDI="$EDI -r:$f"; done
EDI="$EDI -r:$S/Managed/UnityEditor.dll"
kaanna "Assembly-CSharp (editori)" "$ULOS/editori.log" $YHTEISET $NETSTD $EDI $PAKETIT -r:"$ULOS/Matkakirja.Peli.dll" \
  -define:"$DEF_YHT;UNITY_EDITOR;UNITY_EDITOR_OSX;UNITY_EDITOR_64" -out:"$ULOS/Assembly-CSharp-editori.dll" $SKRIPTIT

echo "unity-tarkistus: $(echo "$SKRIPTIT" | wc -l | tr -d ' ') skriptiä + $(find "$ASSETS/Peli" -name '*.cs' | wc -l | tr -d ' ') pelilogiikkatiedostoa, virheitä yhteensä $VIRHEITA"
exit $VIRHEITA
