#!/usr/bin/env python3
# Matkakirjan tileset-varjostin Cesiumin oletuksesta (Natiiviseppä 24.9.2026, Fablen käsky: huntu häivytetään zoomin
# funktiona, ei laattakohtaisesti). Kopioi com.cesium.unityn CesiumDefaultTilesetShader.shadergraphin ja
# CesiumRasterOverlay.shadersubgraphin ja lisää raster-paikoille 0–2 globaalin alfan (_overlayAlfa_0/1/2, Shader.SetGlobalFloat):
# alikaavion lerp-painona on tekstuurin alfa × alfa. Muu kaavio (valaistus, PBR, Clipping) on sanatarkasti Cesiumin.
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
kaavio += lisat
kirjoita(os.path.join(kohde, "MatkakirjaTileset.shadergraph"), kaavio)

# .metat Cesiumin omista (alikaavio ja kaavio käyttävät eri ScriptedImporteria), uusi GUID.
for nimi, guid, malli in (("MatkakirjaRasteri.shadersubgraph", ALI_GUID, "CesiumRasterOverlay.shadersubgraph.meta"),
                          ("MatkakirjaTileset.shadergraph", KAAVIO_GUID, "CesiumDefaultTilesetShader.shadergraph.meta")):
    meta = open(os.path.join(lahde, malli), encoding="utf-8").read()
    alku = meta.split("guid: ")[0]
    loppu = meta.split("\n", 2)[2]
    open(os.path.join(kohde, nimi + ".meta"), "w", encoding="utf-8").write(alku + "guid: " + guid + "\n" + loppu)
