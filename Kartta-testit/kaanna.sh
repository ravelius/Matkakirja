#!/bin/sh
# Kartan puhtaat funktiot (Assets/Matkakirja/Kartta/*.cs ilman UnityEngineä: Saapumisnakyma.cs, NimiLadonta.cs,
# LennonAikajana.cs, Panorointi.cs, NostoSaannot.cs, Maakuntajako.cs + Linssien Kamerakoreografia.cs, MaatAineisto.cs + MastoGeometria.cs; lista LAHTEET: yksi tiedosto per rivi,
# jotta haarojen lisäykset yhdistyvät junassa rivien unionina) ja
# testit Unityn mukana tulevalla dotnetilla ja Roslynilla ilman editoria. Sama kaava kuin
# Peli-testit/kaanna.sh (oma testiajuri Testit/Ajuri.cs); JSON luetaan pelin MiniJsonilla.
# Käyttö: ./kaanna.sh [testin nimen osa]
# Mittaustaulukko: SAAPUMINEN_MITAT=<polku.md> [SAAPUMINEN_MAARAJAT=<maarajat.json>] ./kaanna.sh Saapumisnakyma
# Rajakorkeussarja: VEKTORIT_KOE=<kansio> ./kaanna.sh Vektorisolut (esim. /Users/Shared/Claude/maasto-poltto/rajakorkeus/2026-09-25-gshhs-korkeus)
# Nimikerroksen koepaketti: NIMET_KOE=<paketin kansio> ./kaanna.sh NimiLadonta (oletus /Users/Shared/Claude/sisalto-koe-2/v8)
# Maakunnat maittain oikealla aineistolla (skeema 1.42) ja kestot: MAAKUNTARAJAT=<maakuntarajat.json> ./kaanna.sh Maakuntajako
# Maakuntien värinumerot webin <ISO>.json-tiedostoihin verrattuna: MAAKUNTARAJAT=<…> MAAKUNNAT_WEB=<kansio> ./kaanna.sh MaakuntaVarit
# Kultaiset arvot uusiksi: node Kultaiset/tee-saapuminen.mjs <webin juuri: js/ ja assets/data/maapolygonit.json>
set -e
cd "$(dirname "$0")"
R=/Applications/Unity/Hub/Editor/6000.3.24f1/Unity.app/Contents/Resources/Scripting
DN=$R/NetCoreRuntime/dotnet
REF=$R/NetCoreRuntime/shared/Microsoft.NETCore.App/6.0.21
mkdir -p rakennus
VIITTEET=""
for f in "$REF"/*.dll; do case "$(basename "$f")" in Microsoft.VisualBasic*|mscorlib.dll|netstandard.dll|System.Private.*) ;; *) VIITTEET="$VIITTEET -r:$f";; esac; done
VIITTEET="$VIITTEET -r:$REF/System.Private.CoreLib.dll -r:$REF/netstandard.dll -r:$REF/mscorlib.dll"
# Lähteet yksi per rivi (juna yhdistää haarojen lisäykset rivien unionina).
LAHTEET="
../Assets/Matkakirja/Peli/MiniJson.cs
../Assets/Matkakirja/Kartta/EtusivunLento.cs
../Assets/Matkakirja/Kartta/Horisonttiusva.cs
../Assets/Matkakirja/Kartta/KameraEleet.cs
../Assets/Matkakirja/Kartta/Karttavalo.cs
../Assets/Matkakirja/Kartta/LennonAikajana.cs
../Assets/Matkakirja/Kartta/Maakuntajako.cs
../Assets/Matkakirja/Kartta/MastoGeometria.cs
../Assets/Matkakirja/Kartta/NimiLadonta.cs
../Assets/Matkakirja/Kartta/NostoSaannot.cs
../Assets/Matkakirja/Kartta/Panorointi.cs
../Assets/Matkakirja/Kartta/Reikakorjaus.cs
../Assets/Matkakirja/Kartta/ReittiMitat.cs
../Assets/Matkakirja/Kartta/Saapumisnakyma.cs
../Assets/Matkakirja/Kartta/Siirtokoreografia.cs
../Assets/Matkakirja/Kartta/Vektorisolut.cs
../Assets/Matkakirja/Kartta/Viivaleveys.cs
../Assets/Matkakirja/Linssit/Ydin/Kamera/Kamerakoreografia.cs
../Assets/Matkakirja/Linssit/Ydin/LinssiSopimus.cs
../Assets/Matkakirja/Linssit/Ydin/Maat/MaaOsuma.cs
../Assets/Matkakirja/Linssit/Ydin/Maat/MaatAineisto.cs
"
$DN "$R/DotNetSdkRoslyn/csc.dll" -nologo -nowarn:1701,1702 -langversion:9.0 -nullable:disable -target:exe \
  -out:rakennus/KarttaTestit.dll $VIITTEET $(find Testit -name '*.cs') \
  $(printf '%s\n' $LAHTEET | sort -u)
cat > rakennus/KarttaTestit.runtimeconfig.json <<J
{"runtimeOptions":{"tfm":"net6.0","framework":{"name":"Microsoft.NETCore.App","version":"6.0.21"}}}
J
$DN rakennus/KarttaTestit.dll "$@"
