#!/usr/bin/env python3
# Matkakirjan tileset-varjostin Cesiumin oletuksesta (Natiiviseppä 24.9.2026, Fablen käsky: huntu häivytetään zoomin
# funktiona, ei laattakohtaisesti). Kopioi com.cesium.unityn CesiumDefaultTilesetShader.shadergraphin ja
# CesiumRasterOverlay.shadersubgraphin ja lisää raster-paikoille 0–2 globaalin alfan (_overlayAlfa_0/1/2, Shader.SetGlobalFloat):
# alikaavion lerp-painona on tekstuurin alfa × alfa. Muu kaavio (valaistus, PBR, Clipping) on sanatarkasti Cesiumin.
# Lisäksi verteksivaiheeseen korkeuserojen liioittelu (globaali _korkeusKerroin, Kartta/KorkeusKerroin.cs; löydös 29).
# Käyttö: python3 tee_tileset.py <Cesium-paketin Resources-kansio> <kohdekansio>
import json, sys, uuid, os

lahde, kohde = sys.argv[1], sys.argv[2]
ALI_GUID = "6d1a5c2e9b0f4e7a8c3d2b1a0f9e8d7c"      # MatkakirjaRasteri.shadersubgraph
KAAVIO_GUID = "3f8e2a1c7b6d4e5f9a0b1c2d3e4f5a6b"   # MatkakirjaTileset.shadergraph
CESIUM_ALI = "32a57007547bea945b18e32888758b60"
ALFA_GUID = "a1f4b7c2-3d5e-4f60-8a9b-0c1d2e3f4a5b"

def lue(p):
    return [json.loads(x) for x in open(p, encoding="utf-8").read().split("\n\n") if x.strip()]

def kirjoita(p, objs):
    with open(p, "w", encoding="utf-8") as f:
        f.write("\n\n".join(json.dumps(o, indent=4) for o in objs) + "\n")

def uusi_id():
    return uuid.uuid4().hex

def kellu_ominaisuus(nimi, viite, globaali):
    return {"m_SGVersion": 1, "m_Type": "UnityEditor.ShaderGraph.Internal.Vector1ShaderProperty", "m_ObjectId": uusi_id(),
            "m_Guid": {"m_GuidSerialized": str(uuid.uuid4()) if globaali else ALFA_GUID}, "m_Name": nimi,
            "m_DefaultRefNameVersion": 1, "m_RefNameGeneratedByDisplayName": nimi, "m_DefaultReferenceName": viite,
            "m_OverrideReferenceName": "", "m_GeneratePropertyBlock": not globaali, "m_UseCustomSlotLabel": False,
            "m_CustomSlotLabel": "", "m_Precision": 0, "overrideHLSLDeclaration": globaali,
            "hlslDeclarationOverride": 1 if globaali else 0, "m_Hidden": False, "m_Value": 1.0, "m_FloatType": 0,
            "m_RangeValues": {"x": 0.0, "y": 1.0}}

def ominaisuussolmu(ominaisuus, x, y):
    ulos = {"m_SGVersion": 0, "m_Type": "UnityEditor.ShaderGraph.Vector1MaterialSlot", "m_ObjectId": uusi_id(), "m_Id": 0,
            "m_DisplayName": ominaisuus["m_Name"], "m_SlotType": 1, "m_Hidden": False, "m_ShaderOutputName": "Out",
            "m_StageCapability": 3, "m_Value": 0.0, "m_DefaultValue": 0.0, "m_Labels": []}
    solmu = {"m_SGVersion": 0, "m_Type": "UnityEditor.ShaderGraph.PropertyNode", "m_ObjectId": uusi_id(), "m_Group": {"m_Id": ""},
             "m_Name": "Property", "m_DrawState": {"m_Expanded": True, "m_Position": {"serializedVersion": "2", "x": x, "y": y,
             "width": 120.0, "height": 34.0}}, "m_Slots": [{"m_Id": ulos["m_ObjectId"]}], "synonyms": [], "m_Precision": 0,
             "m_PreviewExpanded": True, "m_PreviewMode": 0, "m_CustomColors": {"m_SerializableColors": []},
             "m_Property": {"m_Id": ominaisuus["m_ObjectId"]}}
    return solmu, ulos

def reuna(a, a_slot, b, b_slot):
    return {"m_OutputSlot": {"m_Node": {"m_Id": a}, "m_SlotId": a_slot}, "m_InputSlot": {"m_Node": {"m_Id": b}, "m_SlotId": b_slot}}

# ---- Alikaavio: lerp T = näyte.A × alfa ----
ali = lue(os.path.join(lahde, "CesiumRasterOverlay.shadersubgraph"))
g = ali[0]
byid = {o["m_ObjectId"]: o for o in ali}
lerp = next(o for o in ali if o["m_Type"].endswith("LerpNode"))
naytteenotto = next(o for o in ali if o["m_Type"].endswith("SampleTexture2DNode"))
kerto_malli = next(o for o in ali if o["m_Type"].endswith("MultiplyNode"))
alfa = kellu_ominaisuus("alfa", "_alfa", False)
alfa_solmu, alfa_ulos = ominaisuussolmu(alfa, 900.0, -30.0)
kerto = json.loads(json.dumps(kerto_malli)); kerto["m_ObjectId"] = uusi_id()
kerto["m_DrawState"]["m_Position"].update({"x": 1040.0, "y": -120.0})
paikat = []
for s in kerto_malli["m_Slots"]:
    k = json.loads(json.dumps(byid[s["m_Id"]])); k["m_ObjectId"] = uusi_id(); paikat.append(k)
kerto["m_Slots"] = [{"m_Id": k["m_ObjectId"]} for k in paikat]
reunat = [e for e in g["m_Edges"] if not (e["m_InputSlot"]["m_Node"]["m_Id"] == lerp["m_ObjectId"] and e["m_InputSlot"]["m_SlotId"] == 2)]
reunat += [reuna(naytteenotto["m_ObjectId"], 7, kerto["m_ObjectId"], 0), reuna(alfa_solmu["m_ObjectId"], 0, kerto["m_ObjectId"], 1),
           reuna(kerto["m_ObjectId"], 2, lerp["m_ObjectId"], 2)]
g["m_Edges"] = reunat
g["m_Properties"].append({"m_Id": alfa["m_ObjectId"]})
g["m_Nodes"] += [{"m_Id": alfa_solmu["m_ObjectId"]}, {"m_Id": kerto["m_ObjectId"]}]
kat = next(o for o in ali if o["m_Type"].endswith("CategoryData"))
kat["m_ChildObjectList"].append({"m_Id": alfa["m_ObjectId"]})
ali += [alfa, alfa_solmu, alfa_ulos, kerto] + paikat
kirjoita(os.path.join(kohde, "MatkakirjaRasteri.shadersubgraph"), ali)

# ---- Pääkaavio: paikat 0–2 uuteen alikaavioon, alfa globaalista ominaisuudesta ----
kaavio = lue(os.path.join(lahde, "CesiumDefaultTilesetShader.shadergraph"))
G = kaavio[0]
G["m_Path"] = "Matkakirja"
byid = {o["m_ObjectId"]: o for o in kaavio}
KAT = next(o for o in kaavio if o["m_Type"].endswith("CategoryData"))
lisat = []
for o in list(kaavio):
    if not (o["m_Type"].endswith("SubGraphNode") and CESIUM_ALI in o["m_SerializedSubGraph"]):
        continue
    tekstuuri = None
    for e in G["m_Edges"]:
        if e["m_InputSlot"]["m_Node"]["m_Id"] == o["m_ObjectId"] and e["m_InputSlot"]["m_SlotId"] == -590019148:
            pn = byid[e["m_OutputSlot"]["m_Node"]["m_Id"]]
            tekstuuri = byid[pn["m_Property"]["m_Id"]]["m_DefaultReferenceName"]
    if tekstuuri is None or not tekstuuri[-1].isdigit():
        continue   # Clipping jää Cesiumin alikaavioon
    n = tekstuuri[-1]
    o["m_SerializedSubGraph"] = o["m_SerializedSubGraph"].replace(CESIUM_ALI, ALI_GUID)
    paikka_id = 700000 + int(n)
    paikka = {"m_SGVersion": 0, "m_Type": "UnityEditor.ShaderGraph.Vector1MaterialSlot", "m_ObjectId": uusi_id(), "m_Id": paikka_id,
              "m_DisplayName": "alfa", "m_SlotType": 0, "m_Hidden": False, "m_ShaderOutputName": "_alfa", "m_StageCapability": 2,
              "m_Value": 1.0, "m_DefaultValue": 1.0, "m_Labels": []}
    o["m_Slots"].insert(len(o["m_Slots"]) - 1, {"m_Id": paikka["m_ObjectId"]})
    o["m_PropertyGuids"].append(ALFA_GUID)
    o["m_PropertyIds"].append(paikka_id)
    om = kellu_ominaisuus("overlayAlfa_" + n, "_overlayAlfa_" + n, True)
    pos = o["m_DrawState"]["m_Position"]
    solmu, ulos = ominaisuussolmu(om, pos["x"] - 200.0, pos["y"] + 160.0)
    G["m_Properties"].append({"m_Id": om["m_ObjectId"]})
    KAT["m_ChildObjectList"].append({"m_Id": om["m_ObjectId"]})
    G["m_Nodes"].append({"m_Id": solmu["m_ObjectId"]})
    G["m_Edges"].append(reuna(solmu["m_ObjectId"], 0, o["m_ObjectId"], paikka_id))
    lisat += [paikka, om, solmu, ulos]
    print("paikka", n, "→ _overlayAlfa_" + n)

# ---- Korkeuserojen liioittelu (omistajan löydös 29, build 9 → 10; Natiiviseppä 24.9.2026) ----
# Verteksivaiheessa pinnan piste siirtyy ellipsoidin normaalin suuntaan: p' = p + n·max(h, 0)·(k − 1), missä
# h = |p − c| − R(suunta) (WGS84, geosentrinen likiarvo; virhe alle metrin pallon mittakaavassa) ja k globaali
# _korkeusKerroin. Meri (h ≤ 0) ei kuoppaannu. Normaali kallistetaan kuin pinta z = k·f(x, y): tangentiaalinen osa × k,
# säteittäinen ennallaan (paikallinen likiarvo, riittää valaistukseen). k ≤ 0 (globaalia ei asetettu) tai k = 1 →
# geometria ja normaali täsmälleen ennallaan. Maan keskipiste c (_maaKeski.xyz) ja napa-akseli (_maaAkseli.xyz)
# Unityn maailmakoordinaateissa tulevat KorkeusKerroin.cs:stä (georeferenssi TrueOrigin → c = 0).
# Siirto lasketaan maailmassa vektorina ja muunnetaan objektiavaruuteen suuntana (ei edestakaista pistemuunnosta,
# joka lisäisi float-pyöristystä ~6,4e6 m:n koordinaateissa).
KORKEUS_RUNKO = (
    "posOut = posOS; nrmOut = nrmOS;\n"
    "float k = kerroin > 0.0 ? kerroin : 1.0;\n"
    "if (k != 1.0)\n"
    "{\n"
    "    const float ekv = 6378137.0;        // WGS84 isoakseli\n"
    "    const float nap = 6356752.314245;   // WGS84 pikkuakseli\n"
    "    float3 d = TransformObjectToWorld(posOS) - keski.xyz;\n"
    "    float3 ak = dot(akseli.xyz, akseli.xyz) > 0.5 ? normalize(akseli.xyz) : float3(0.0, 1.0, 0.0);\n"
    "    float r = max(length(d), 1.0);\n"
    "    float z = dot(d, ak);\n"
    "    float uz = z / r;\n"
    "    float sade = ekv * nap / sqrt(nap * nap * (1.0 - uz * uz) + ekv * ekv * uz * uz);\n"
    "    float h = max(r - sade, 0.0);\n"
    "    float3 n = normalize(d + ak * z * (ekv * ekv / (nap * nap) - 1.0));\n"
    "    posOut = posOS + mul((float3x3)GetWorldToObjectMatrix(), n * (h * (k - 1.0)));\n"
    "    float3 nw = TransformObjectToWorldNormal(nrmOS);\n"
    "    float nr = dot(nw, n);\n"
    "    nrmOut = TransformWorldToObjectNormal(normalize((nw - n * nr) * k + n * nr));\n"
    "}\n")

def slotti(tyyppi, id_, nimi, suunta, arvo):
    return {"m_SGVersion": 0, "m_Type": "UnityEditor.ShaderGraph." + tyyppi, "m_ObjectId": uusi_id(), "m_Id": id_,
            "m_DisplayName": nimi, "m_SlotType": suunta, "m_Hidden": False, "m_ShaderOutputName": nimi,
            "m_StageCapability": 3, "m_Value": arvo, "m_DefaultValue": arvo, "m_Labels": []}

def v3(z=0.0): return {"x": 0.0, "y": 0.0, "z": z}
def v4(): return {"x": 0.0, "y": 0.0, "z": 0.0, "w": 0.0}

def solmupohja(tyyppi, nimi, x, y, slotit, **muut):
    s = {"m_SGVersion": 0, "m_Type": "UnityEditor.ShaderGraph." + tyyppi, "m_ObjectId": uusi_id(), "m_Group": {"m_Id": ""},
         "m_Name": nimi, "m_DrawState": {"m_Expanded": True, "m_Position": {"serializedVersion": "2", "x": x, "y": y,
         "width": 208.0, "height": 120.0}}, "m_Slots": [{"m_Id": sl["m_ObjectId"]} for sl in slotit], "synonyms": [],
         "m_Precision": 0, "m_PreviewExpanded": False, "m_PreviewMode": 0, "m_CustomColors": {"m_SerializableColors": []}}
    s.update(muut)
    return s

def vektori_ominaisuus(nimi, viite):
    return {"m_SGVersion": 1, "m_Type": "UnityEditor.ShaderGraph.Internal.Vector4ShaderProperty", "m_ObjectId": uusi_id(),
            "m_Guid": {"m_GuidSerialized": str(uuid.uuid4())}, "m_Name": nimi, "m_DefaultRefNameVersion": 1,
            "m_RefNameGeneratedByDisplayName": nimi, "m_DefaultReferenceName": viite, "m_OverrideReferenceName": "",
            "m_GeneratePropertyBlock": False, "m_UseCustomSlotLabel": False, "m_CustomSlotLabel": "", "m_Precision": 0,
            "overrideHLSLDeclaration": True, "hlslDeclarationOverride": 1, "m_Hidden": False, "m_Value": v4()}

def vektori_ominaisuussolmu(ominaisuus, x, y):
    ulos = slotti("Vector4MaterialSlot", 0, ominaisuus["m_Name"], 1, v4())
    ulos["m_ShaderOutputName"] = "Out"
    solmu = solmupohja("PropertyNode", "Property", x, y, [ulos], m_Property={"m_Id": ominaisuus["m_ObjectId"]})
    return solmu, ulos

VX = G["m_VertexContext"]["m_Position"]["x"] - 700.0
VY = G["m_VertexContext"]["m_Position"]["y"]
paikka_ulos = slotti("Vector3MaterialSlot", 0, "Out", 1, v3())
paikka_solmu = solmupohja("PositionNode", "Position", VX - 300.0, VY, [paikka_ulos], m_SGVersion=1, m_Space=0,
                          m_PositionSource=0, m_DismissedVersion=0)
normaali_ulos = slotti("Vector3MaterialSlot", 0, "Out", 1, v3(1.0))
normaali_solmu = solmupohja("NormalVectorNode", "Normal Vector", VX - 300.0, VY + 140.0, [normaali_ulos], m_Space=0)
kerroin_om = kellu_ominaisuus("korkeusKerroin", "_korkeusKerroin", True)
kerroin_solmu, kerroin_ulos = ominaisuussolmu(kerroin_om, VX - 300.0, VY + 280.0)
keski_om = vektori_ominaisuus("maaKeski", "_maaKeski")
keski_solmu, keski_ulos = vektori_ominaisuussolmu(keski_om, VX - 300.0, VY + 340.0)
akseli_om = vektori_ominaisuus("maaAkseli", "_maaAkseli")
akseli_solmu, akseli_ulos = vektori_ominaisuussolmu(akseli_om, VX - 300.0, VY + 400.0)
cf_slotit = [slotti("Vector3MaterialSlot", 0, "posOS", 0, v3()), slotti("Vector3MaterialSlot", 1, "nrmOS", 0, v3()),
             slotti("Vector1MaterialSlot", 2, "kerroin", 0, 1.0), slotti("Vector4MaterialSlot", 3, "keski", 0, v4()),
             slotti("Vector4MaterialSlot", 4, "akseli", 0, v4()), slotti("Vector3MaterialSlot", 5, "posOut", 1, v3()),
             slotti("Vector3MaterialSlot", 6, "nrmOut", 1, v3())]
cf = solmupohja("CustomFunctionNode", "Korkeusliioittelu (Custom Function)", VX, VY, cf_slotit, m_SGVersion=1,
                synonyms=["code", "HLSL"], m_SourceType=1, m_FunctionName="Korkeusliioittelu", m_FunctionSource="",
                m_FunctionBody=KORKEUS_RUNKO)
lohko = {byid[b["m_Id"]]["m_SerializedDescriptor"]: b["m_Id"] for b in G["m_VertexContext"]["m_Blocks"]}
assert not any(e["m_InputSlot"]["m_Node"]["m_Id"] in lohko.values() for e in G["m_Edges"]), "verteksilohkoon jo reuna"
G["m_Edges"] += [reuna(paikka_solmu["m_ObjectId"], 0, cf["m_ObjectId"], 0),
                 reuna(normaali_solmu["m_ObjectId"], 0, cf["m_ObjectId"], 1),
                 reuna(kerroin_solmu["m_ObjectId"], 0, cf["m_ObjectId"], 2),
                 reuna(keski_solmu["m_ObjectId"], 0, cf["m_ObjectId"], 3),
                 reuna(akseli_solmu["m_ObjectId"], 0, cf["m_ObjectId"], 4),
                 reuna(cf["m_ObjectId"], 5, lohko["VertexDescription.Position"], 0),
                 reuna(cf["m_ObjectId"], 6, lohko["VertexDescription.Normal"], 0)]
for om in (kerroin_om, keski_om, akseli_om):
    G["m_Properties"].append({"m_Id": om["m_ObjectId"]})
    KAT["m_ChildObjectList"].append({"m_Id": om["m_ObjectId"]})
for s in (paikka_solmu, normaali_solmu, kerroin_solmu, keski_solmu, akseli_solmu, cf):
    G["m_Nodes"].append({"m_Id": s["m_ObjectId"]})
lisat += [paikka_solmu, paikka_ulos, normaali_solmu, normaali_ulos, kerroin_om, kerroin_solmu, kerroin_ulos,
          keski_om, keski_solmu, keski_ulos, akseli_om, akseli_solmu, akseli_ulos, cf] + cf_slotit
print("verteksi → Korkeusliioittelu (_korkeusKerroin, _maaKeski, _maaAkseli)")
kaavio += lisat
kirjoita(os.path.join(kohde, "MatkakirjaTileset.shadergraph"), kaavio)

# .metat Cesiumin omista (alikaavio ja kaavio käyttävät eri ScriptedImporteria), uusi GUID.
for nimi, guid, malli in (("MatkakirjaRasteri.shadersubgraph", ALI_GUID, "CesiumRasterOverlay.shadersubgraph.meta"),
                          ("MatkakirjaTileset.shadergraph", KAAVIO_GUID, "CesiumDefaultTilesetShader.shadergraph.meta")):
    meta = open(os.path.join(lahde, malli), encoding="utf-8").read()
    alku = meta.split("guid: ")[0]
    loppu = meta.split("\n", 2)[2]
    open(os.path.join(kohde, nimi + ".meta"), "w", encoding="utf-8").write(alku + "guid: " + guid + "\n" + loppu)
