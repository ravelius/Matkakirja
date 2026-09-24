#!/usr/bin/env python3
# Matkakirjan tileset-varjostin Cesiumin oletuksesta (Natiiviseppä 24.9.2026, Fablen käsky: huntu häivytetään zoomin
# funktiona, ei laattakohtaisesti). Kopioi com.cesium.unityn CesiumDefaultTilesetShader.shadergraphin ja
# CesiumRasterOverlay.shadersubgraphin ja lisää raster-paikoille 0–2 globaalin alfan (_overlayAlfa_0/1/2, Shader.SetGlobalFloat):
# alikaavion lerp-painona on tekstuurin alfa × alfa. Muu kaavio (valaistus, PBR, Clipping) on sanatarkasti Cesiumin.
# Satelliittilento (24.9.2026): alikaavion lerp on Custom Function MatkakirjaSekoitus (sama tulos oletussyötteillä),
# joka paikassa 1 korvaa puuttuvan rasterin lennon varakartalla ja paikassa 2 värjää Sentinelin tumman meren.
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

def jarjesta(o):
    # Unityn järjestys: m_SGVersion, m_Type, m_ObjectId ensin (MultiJson), muut ennallaan.
    alku = [k for k in ("m_SGVersion", "m_Type", "m_ObjectId") if k in o]
    return {**{k: o[k] for k in alku}, **{k: v for k, v in o.items() if k not in alku}}

def kirjoita(p, objs):
    with open(p, "w", encoding="utf-8") as f:
        f.write("\n\n".join(json.dumps(jarjesta(o), indent=4) for o in objs) + "\n")

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

# ---- Alikaavio: Cesiumin lerp korvataan sekoitusfunktiolla (Natiiviseppä 24.9.2026, satelliittilento) ----
# Cesiumin alikaavio: Lerp(baseColor, näyte, näyte.A). Tilalle Custom Function MatkakirjaSekoitus, jonka tulos
# on sama kuin ennen (lerp(base, s, s.a × alfa)), kun uudet syötteet ovat oletusarvoissaan (0). Uudet syötteet:
#   varaVari, vara   paikka 1 lennon aikana: jos laatan rasteri puuttuu (Cesium ei ole liittänyt tekstuuria →
#                    varjostimen oletus "black" = (0,0,0,0), a = 0), käytetään varakartan väriä (Z2-mosaiikki).
#   meriVari, kynnys paikka 2 (Sentinel): tumma sinertävä avomeri värjätään kohti alla olevan paikan 1 (bathy)
#                    väriä samassa pisteessä; jos se ei itse ole merta (karkea Z7 rannikolla), kohti meriVari-vakiota.
#                    Luokittelu sRGB-arvoilla (tekstuurit ovat sRGB, varjostin näkee lineaarisen arvon → pow 1/2,2).
# Testitilat (komento "lentoharmaa", KarttaKerrokset.LentoTesti): vara 2 = magenta, missä varakartta laukeaisi;
# vara 3 = paikan 1 kattavuus (vihreä = rasteri, magenta = puuttuu); vara 4 = varakartan UV väreinä (r = u, g = v,
# punainen = maan akselit puuttuvat); vara 5 = paikan 1 rasterin taso: vihreä = oma, keltainen → punainen =
# esivanhemman rasteri 1…8 tasoa ylempää (translationAndScale.z < 1), syaani = rasteri laattaa pienempi, magenta = ei. varaVari.a < 0,5 = varakartta ei käytettävissä (UV ei kelpaa) → pohja näkyy.
# kynnys < 0 = paikan 2 peitto syaanina (alfa sellaisenaan).
SEKOITUS_RUNKO = (
    "float4 s = nayte;\n"
    "if (vara > 4.5) { float d = log2(1.0 / max(ts.z, 1e-6)); s = s.a < 0.5 ? float4(1.0, 0.0, 1.0, 1.0)\n"
    "    : ts.z > 1.01 ? float4(0.0, 1.0, 1.0, 1.0) : d < 0.25 ? float4(0.0, 1.0, 0.0, 1.0)\n"
    "    : float4(1.0, 1.0 - saturate(d / 8.0), 0.0, 1.0); }\n"
    "else if (vara > 3.5 || (vara > 0.5 && vara < 1.5))\n"
    "{\n"
    "    // Varakartta myös, kun Cesium antaa kaukaisen esivanhemman rasterin (d >= varaTaso tasoa ylempää) tai kun\n"
    "    // rasterin UV on [0,1]:n ulkopuolella (clamp venyttäisi reunapikselin); diagnoosi 2, 24.9.2026.\n"
    "    float d = log2(1.0 / max(ts.z, 1e-6));\n"
    "    bool ulkona = any(ouv < -0.002) || any(ouv > 1.002);\n"
    "    bool kaukainen = varaTaso > 0.0 && d >= varaTaso;\n"
    "    if ((s.a < 0.5 || ulkona || kaukainen) && varaVari.a > 0.5) s = float4(varaVari.rgb, 1.0);\n"
    "}\n"
    "else if (vara > 2.5) s = s.a < 0.5 ? float4(1.0, 0.0, 1.0, 1.0) : float4(0.0, 1.0, 0.0, 1.0);\n"
    "else if (vara > 1.5) { if (s.a < 0.5) s = float4(1.0, 0.0, 1.0, 1.0); }\n"
    "if (kynnys < 0.0) s = float4(0.0, 1.0, 1.0, s.a);\n"
    "else if (kynnys > 0.0)\n"
    "{\n"
    "    float3 g = pow(max(s.rgb, 1e-5), 0.4545);\n"
    "    float3 p = pow(max(base.rgb, 1e-5), 0.4545);\n"
    "    float luma = dot(g, float3(0.2126, 0.7152, 0.0722));\n"
    "    float meri = (1.0 - smoothstep(kynnys * 0.8, kynnys, luma)) * smoothstep(0.02, 0.08, g.b - g.r);\n"
    "    float bathy = smoothstep(0.02, 0.08, p.b - p.r);\n"
    "    s.rgb = lerp(s.rgb, lerp(meriVari.rgb, base.rgb, bathy.xxx), meri.xxx);\n"
    "}\n"
    "ulos = lerp(base, s, (s.a * alfa).xxxx);\n")
# Alikaavion uudet syötteet: (nimi, viite, tyyppi, kiinteä GUID, solmun paikka-id pääkaaviossa)
ALI_SYOTTEET = [("varaVari", "_varaVari", "v4", "b2e5c8d1-4f6a-4b7c-9d0e-1f2a3b4c5d6e", 710000),
                ("vara", "_vara", "v1", "c3f6d9e2-5a7b-4c8d-8e1f-2a3b4c5d6e7f", 710001),
                ("meriVari", "_meriVari", "v4", "d4a7e0f3-6b8c-4d9e-9f2a-3b4c5d6e7f80", 710002),
                ("meriKynnys", "_meriKynnys", "v1", "e5b8f1a4-7c9d-4eaf-8a3b-4c5d6e7f8091", 710003),
                ("varaTaso", "_varaTaso", "v1", "f6c9a2b5-8dae-4fb0-9b4c-5d6e7f8091a2", 710004)]
# Sekoitusfunktion syöttöpaikat ALI_SYOTTEET-järjestyksessä (7 = ulos, 8 = ts, 10 = ouv).
ALI_CF_PAIKAT = [3, 4, 5, 6, 9]

def ali_ominaisuus(nimi, viite, tyyppi, guid):
    o = {"m_SGVersion": 1, "m_ObjectId": uusi_id(), "m_Guid": {"m_GuidSerialized": guid}, "m_Name": nimi,
         "m_DefaultRefNameVersion": 1, "m_RefNameGeneratedByDisplayName": nimi, "m_DefaultReferenceName": viite,
         "m_OverrideReferenceName": "", "m_GeneratePropertyBlock": True, "m_UseCustomSlotLabel": False,
         "m_CustomSlotLabel": "", "m_Precision": 0, "overrideHLSLDeclaration": False, "hlslDeclarationOverride": 0,
         "m_Hidden": False}
    if tyyppi == "v1":
        o.update({"m_Type": "UnityEditor.ShaderGraph.Internal.Vector1ShaderProperty", "m_Value": 0.0, "m_FloatType": 0,
                  "m_RangeValues": {"x": 0.0, "y": 1.0}})
    else:
        o.update({"m_Type": "UnityEditor.ShaderGraph.Internal.Vector4ShaderProperty",
                  "m_Value": {"x": 0.0, "y": 0.0, "z": 0.0, "w": 0.0}})
    return o

def ominaisuussolmu_v4(ominaisuus, x, y):
    ulos = {"m_SGVersion": 0, "m_Type": "UnityEditor.ShaderGraph.Vector4MaterialSlot", "m_ObjectId": uusi_id(), "m_Id": 0,
            "m_DisplayName": ominaisuus["m_Name"], "m_SlotType": 1, "m_Hidden": False, "m_ShaderOutputName": "Out",
            "m_StageCapability": 3, "m_Value": {"x": 0.0, "y": 0.0, "z": 0.0, "w": 0.0},
            "m_DefaultValue": {"x": 0.0, "y": 0.0, "z": 0.0, "w": 0.0}, "m_Labels": []}
    solmu, _ = ominaisuussolmu(ominaisuus, x, y)
    solmu["m_Slots"] = [{"m_Id": ulos["m_ObjectId"]}]
    return solmu, ulos

ali = lue(os.path.join(lahde, "CesiumRasterOverlay.shadersubgraph"))
g = ali[0]
byid = {o["m_ObjectId"]: o for o in ali}
lerp = next(o for o in ali if o["m_Type"].endswith("LerpNode"))
naytteenotto = next(o for o in ali if o["m_Type"].endswith("SampleTexture2DNode"))
ulostulo = next(o for o in ali if o["m_Type"].endswith("SubGraphOutputNode"))
perus = next(o for o in ali if o["m_Type"].endswith("ColorShaderProperty"))
perus_solmu = next(o for o in ali if o["m_Type"].endswith("PropertyNode") and o["m_Property"]["m_Id"] == perus["m_ObjectId"])
kat = next(o for o in ali if o["m_Type"].endswith("CategoryData"))
# Lerp ja sen paikat pois; sekoitusfunktio tilalle.
lerp_paikat = {s["m_Id"] for s in lerp["m_Slots"]}
ali = [o for o in ali if o["m_ObjectId"] != lerp["m_ObjectId"] and o["m_ObjectId"] not in lerp_paikat]
g["m_Nodes"] = [n for n in g["m_Nodes"] if n["m_Id"] != lerp["m_ObjectId"]]
g["m_Edges"] = [e for e in g["m_Edges"] if lerp["m_ObjectId"] not in (e["m_InputSlot"]["m_Node"]["m_Id"], e["m_OutputSlot"]["m_Node"]["m_Id"])]
alfa = kellu_ominaisuus("alfa", "_alfa", False)
alfa_solmu, alfa_ulos = ominaisuussolmu(alfa, 900.0, -30.0)
V4 = {"x": 0.0, "y": 0.0, "z": 0.0, "w": 0.0}
def sf_paikka(tyyppi, id_, nimi, suunta):
    arvo = 0.0 if tyyppi == "Vector1MaterialSlot" else {"x": 0.0, "y": 0.0} if tyyppi == "Vector2MaterialSlot" else dict(V4)
    return {"m_SGVersion": 0, "m_Type": "UnityEditor.ShaderGraph." + tyyppi, "m_ObjectId": uusi_id(), "m_Id": id_,
            "m_DisplayName": nimi, "m_SlotType": suunta, "m_Hidden": False, "m_ShaderOutputName": nimi,
            "m_StageCapability": 2, "m_Value": arvo, "m_DefaultValue": arvo, "m_Labels": []}
sf_paikat = [sf_paikka("Vector4MaterialSlot", 0, "base", 0), sf_paikka("Vector4MaterialSlot", 1, "nayte", 0),
             sf_paikka("Vector1MaterialSlot", 2, "alfa", 0), sf_paikka("Vector4MaterialSlot", 3, "varaVari", 0),
             sf_paikka("Vector1MaterialSlot", 4, "vara", 0), sf_paikka("Vector4MaterialSlot", 5, "meriVari", 0),
             sf_paikka("Vector1MaterialSlot", 6, "kynnys", 0), sf_paikka("Vector4MaterialSlot", 7, "ulos", 1),
             sf_paikka("Vector4MaterialSlot", 8, "ts", 0), sf_paikka("Vector1MaterialSlot", 9, "varaTaso", 0),
             sf_paikka("Vector2MaterialSlot", 10, "ouv", 0)]
sf = {"m_SGVersion": 1, "m_Type": "UnityEditor.ShaderGraph.CustomFunctionNode", "m_ObjectId": uusi_id(), "m_Group": {"m_Id": ""},
      "m_Name": "MatkakirjaSekoitus (Custom Function)", "m_DrawState": {"m_Expanded": True, "m_Position": {
      "serializedVersion": "2", "x": 1100.0, "y": -415.0, "width": 208.0, "height": 200.0}},
      "m_Slots": [{"m_Id": s["m_ObjectId"]} for s in sf_paikat], "synonyms": ["code", "HLSL"], "m_Precision": 0,
      "m_PreviewExpanded": False, "m_PreviewMode": 0, "m_CustomColors": {"m_SerializableColors": []},
      "m_SourceType": 1, "m_FunctionName": "MatkakirjaSekoitus", "m_FunctionSource": "", "m_FunctionBody": SEKOITUS_RUNKO}
uudet = [alfa, alfa_solmu, alfa_ulos, sf] + sf_paikat
ts_om = next(o for o in ali if o["m_Type"].endswith("Vector4ShaderProperty") and o["m_Name"] == "translationAndScale")
ts_solmu = next(o for o in ali if o["m_Type"].endswith("PropertyNode") and o["m_Property"]["m_Id"] == ts_om["m_ObjectId"])
uv_reuna = next(e for e in g["m_Edges"] if e["m_InputSlot"]["m_Node"]["m_Id"] == naytteenotto["m_ObjectId"]
                and e["m_InputSlot"]["m_SlotId"] == 2)
reunat = [reuna(perus_solmu["m_ObjectId"], 0, sf["m_ObjectId"], 0), reuna(naytteenotto["m_ObjectId"], 0, sf["m_ObjectId"], 1),
          reuna(uv_reuna["m_OutputSlot"]["m_Node"]["m_Id"], uv_reuna["m_OutputSlot"]["m_SlotId"], sf["m_ObjectId"], 10),
          reuna(ts_solmu["m_ObjectId"], 0, sf["m_ObjectId"], 8),
          reuna(alfa_solmu["m_ObjectId"], 0, sf["m_ObjectId"], 2), reuna(sf["m_ObjectId"], 7, ulostulo["m_ObjectId"], 1)]
omat = [alfa]
for i, (nimi, viite, tyyppi, guid, _) in enumerate(ALI_SYOTTEET):
    om = ali_ominaisuus(nimi, viite, tyyppi, guid)
    solmu, ulos = (ominaisuussolmu_v4 if tyyppi == "v4" else ominaisuussolmu)(om, 900.0, 40.0 + 60.0 * i)
    reunat.append(reuna(solmu["m_ObjectId"], 0, sf["m_ObjectId"], ALI_CF_PAIKAT[i]))
    uudet += [om, solmu, ulos]
    omat.append(om)
g["m_Edges"] += reunat
for om in omat:
    g["m_Properties"].append({"m_Id": om["m_ObjectId"]})
    kat["m_ChildObjectList"].append({"m_Id": om["m_ObjectId"]})
g["m_Nodes"] += [{"m_Id": o["m_ObjectId"]} for o in uudet if o["m_Type"].endswith("Node")]
ali += uudet
kirjoita(os.path.join(kohde, "MatkakirjaRasteri.shadersubgraph"), ali)

# ---- Pääkaavio: paikat 0–2 uuteen alikaavioon, alfa globaalista ominaisuudesta ----
kaavio = lue(os.path.join(lahde, "CesiumDefaultTilesetShader.shadergraph"))
G = kaavio[0]
G["m_Path"] = "Matkakirja"
byid = {o["m_ObjectId"]: o for o in kaavio}
KAT = next(o for o in kaavio if o["m_Type"].endswith("CategoryData"))
lisat = []
paikkasolmut = {}
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
    # Alikaavion uudet syötteet (sekoitus): oletus 0 = ei vaikutusta; kytketään alempana paikoille 1 ja 2.
    for nimi, viite, tyyppi, guid, pid in ALI_SYOTTEET:
        sp = {"m_SGVersion": 0, "m_ObjectId": uusi_id(), "m_Id": pid, "m_DisplayName": nimi, "m_SlotType": 0,
              "m_Hidden": False, "m_ShaderOutputName": viite, "m_StageCapability": 2, "m_Labels": []}
        if tyyppi == "v1":
            sp.update({"m_Type": "UnityEditor.ShaderGraph.Vector1MaterialSlot", "m_Value": 0.0, "m_DefaultValue": 0.0})
        else:
            sp.update({"m_Type": "UnityEditor.ShaderGraph.Vector4MaterialSlot", "m_Value": dict(V4), "m_DefaultValue": dict(V4)})
        o["m_Slots"].insert(len(o["m_Slots"]) - 1, {"m_Id": sp["m_ObjectId"]})
        o["m_PropertyGuids"].append(guid)
        o["m_PropertyIds"].append(pid)
        lisat.append(sp)
    paikkasolmut[n] = o
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
# ---- Satelliittilento (Natiiviseppä 24.9.2026, Fablen päätökset 2 ja 3) ----
# Paikka 2 (Sentinel-2): meren värjäys globaaleista _s2MeriVari (rgb sRGB→lineaarinen C#:ssa) ja _s2MeriKynnys
# (sRGB-luma; 0 = pois). Paikka 1 (Blue Marble): lennon varakartta _lentoVaraKartta (Z2-mosaiikki Web Mercatorissa,
# koko maailma) näytteistetään fragmentin maailmanpisteen leveys- ja pituusasteesta, kun _lentoVara = 1.
# Maan akselit Unityn maailmassa: _maaKeski ja _maaAkseli (KorkeusKerroin) sekä _maaNolla (ECEF +X, lon 0) ja
# _maaIta (ECEF +Y, lon 90° E). Geosentrinen leveys riittää (virhe < 0,2°, mosaiikin pikseli 0,35°).
VARA_UV_RUNKO = (
    "uv = float2(-1.0, -1.0);\n"
    "if (dot(nolla.xyz, nolla.xyz) > 0.5 && dot(akseli.xyz, akseli.xyz) > 0.5)\n"
    "{\n"
    "    float3 n = normalize(pos - keski.xyz);\n"
    "    float lat = asin(clamp(dot(n, akseli.xyz), -1.0, 1.0));\n"
    "    float lon = atan2(dot(n, ita.xyz), dot(n, nolla.xyz));\n"
    "    float la = clamp(lat, -1.4844222, 1.4844222);   // Web Mercator: 85.05 deg\n"
    "    uv = float2(lon * 0.15915494 + 0.5, log(tan(0.78539816 + la * 0.5)) * 0.15915494 + 0.5);\n"
    "}\n")
SX = paikkasolmut["1"]["m_DrawState"]["m_Position"]["x"] - 900.0
SY = paikkasolmut["1"]["m_DrawState"]["m_Position"]["y"] + 400.0
vara_om = kellu_ominaisuus("lentoVara", "_lentoVara", True); vara_om["m_Value"] = 0.0
varataso_om = kellu_ominaisuus("lentoVaraTaso", "_lentoVaraTaso", True); varataso_om["m_Value"] = 0.0
meriv_om = vektori_ominaisuus("s2MeriVari", "_s2MeriVari")
kynnys_om = kellu_ominaisuus("s2MeriKynnys", "_s2MeriKynnys", True); kynnys_om["m_Value"] = 0.0
nolla_om = vektori_ominaisuus("maaNolla", "_maaNolla")
ita_om = vektori_ominaisuus("maaIta", "_maaIta")
kartta_om = {"m_SGVersion": 0, "m_Type": "UnityEditor.ShaderGraph.Internal.Texture2DShaderProperty", "m_ObjectId": uusi_id(),
             "m_Guid": {"m_GuidSerialized": str(uuid.uuid4())}, "m_Name": "lentoVaraKartta", "m_DefaultRefNameVersion": 1,
             "m_RefNameGeneratedByDisplayName": "lentoVaraKartta", "m_DefaultReferenceName": "_lentoVaraKartta",
             "m_OverrideReferenceName": "", "m_GeneratePropertyBlock": False, "m_UseCustomSlotLabel": False,
             "m_CustomSlotLabel": "", "m_Precision": 0, "overrideHLSLDeclaration": True, "hlslDeclarationOverride": 1,
             "m_Hidden": False, "m_Value": {"m_SerializedTexture": "{\"texture\":{\"instanceID\":0}}", "m_Guid": ""},
             "isMainTexture": False, "useTilingAndOffset": False, "m_Modifiable": True, "m_DefaultType": 1}
vara_solmu, vara_ulos = ominaisuussolmu(vara_om, SX + 600.0, SY + 300.0)
meriv_solmu, meriv_ulos = vektori_ominaisuussolmu(meriv_om, paikkasolmut["2"]["m_DrawState"]["m_Position"]["x"] - 250.0,
                                                  paikkasolmut["2"]["m_DrawState"]["m_Position"]["y"] + 260.0)
kynnys_solmu, kynnys_ulos = ominaisuussolmu(kynnys_om, meriv_solmu["m_DrawState"]["m_Position"]["x"],
                                            meriv_solmu["m_DrawState"]["m_Position"]["y"] + 60.0)
keski2_solmu, keski2_ulos = vektori_ominaisuussolmu(keski_om, SX - 300.0, SY + 60.0)
akseli2_solmu, akseli2_ulos = vektori_ominaisuussolmu(akseli_om, SX - 300.0, SY + 120.0)
nolla_solmu, nolla_ulos = vektori_ominaisuussolmu(nolla_om, SX - 300.0, SY + 180.0)
ita_solmu, ita_ulos = vektori_ominaisuussolmu(ita_om, SX - 300.0, SY + 240.0)
kartta_ulos = {"m_SGVersion": 0, "m_Type": "UnityEditor.ShaderGraph.Texture2DMaterialSlot", "m_ObjectId": uusi_id(), "m_Id": 0,
               "m_DisplayName": "lentoVaraKartta", "m_SlotType": 1, "m_Hidden": False, "m_ShaderOutputName": "Out",
               "m_StageCapability": 3, "m_BareResource": False}
kartta_solmu = solmupohja("PropertyNode", "Property", SX + 250.0, SY - 60.0, [kartta_ulos], m_Property={"m_Id": kartta_om["m_ObjectId"]})
maailma_ulos = slotti("Vector3MaterialSlot", 0, "Out", 1, v3())
maailma_solmu = solmupohja("PositionNode", "Position", SX - 300.0, SY, [maailma_ulos], m_SGVersion=1, m_Space=4,
                           m_PositionSource=0, m_DismissedVersion=0)
uv_slotit = [slotti("Vector3MaterialSlot", 0, "pos", 0, v3()), slotti("Vector4MaterialSlot", 1, "keski", 0, v4()),
             slotti("Vector4MaterialSlot", 2, "akseli", 0, v4()), slotti("Vector4MaterialSlot", 3, "nolla", 0, v4()),
             slotti("Vector4MaterialSlot", 4, "ita", 0, v4()), slotti("Vector2MaterialSlot", 5, "uv", 1, {"x": 0.0, "y": 0.0})]
for s in uv_slotit: s["m_StageCapability"] = 2
uv_cf = solmupohja("CustomFunctionNode", "LentoVaraUV (Custom Function)", SX, SY, uv_slotit, m_SGVersion=1,
                   synonyms=["code", "HLSL"], m_SourceType=1, m_FunctionName="LentoVaraUV", m_FunctionSource="",
                   m_FunctionBody=VARA_UV_RUNKO)
nayte_slotit = [slotti("Vector4MaterialSlot", 0, "RGBA", 1, v4()), slotti("Vector1MaterialSlot", 4, "R", 1, 0.0),
                slotti("Vector1MaterialSlot", 5, "G", 1, 0.0), slotti("Vector1MaterialSlot", 6, "B", 1, 0.0),
                slotti("Vector1MaterialSlot", 7, "A", 1, 0.0)]
for s in nayte_slotit: s["m_StageCapability"] = 2
nayte_tex = {"m_SGVersion": 0, "m_Type": "UnityEditor.ShaderGraph.Texture2DInputMaterialSlot", "m_ObjectId": uusi_id(), "m_Id": 1,
             "m_DisplayName": "Texture", "m_SlotType": 0, "m_Hidden": False, "m_ShaderOutputName": "Texture",
             "m_StageCapability": 3, "m_BareResource": False,
             "m_Texture": {"m_SerializedTexture": "{\"texture\":{\"instanceID\":0}}", "m_Guid": ""}, "m_DefaultType": 0}
nayte_uv = {"m_SGVersion": 0, "m_Type": "UnityEditor.ShaderGraph.UVMaterialSlot", "m_ObjectId": uusi_id(), "m_Id": 2,
            "m_DisplayName": "UV", "m_SlotType": 0, "m_Hidden": False, "m_ShaderOutputName": "UV", "m_StageCapability": 3,
            "m_Value": {"x": 0.0, "y": 0.0}, "m_DefaultValue": {"x": 0.0, "y": 0.0}, "m_Labels": [], "m_Channel": 0}
nayte_ss = {"m_SGVersion": 0, "m_Type": "UnityEditor.ShaderGraph.SamplerStateMaterialSlot", "m_ObjectId": uusi_id(), "m_Id": 3,
            "m_DisplayName": "Sampler", "m_SlotType": 0, "m_Hidden": False, "m_ShaderOutputName": "Sampler",
            "m_StageCapability": 3, "m_BareResource": False}
nayte_slotit += [nayte_tex, nayte_uv, nayte_ss]
nayte = solmupohja("SampleTexture2DNode", "Sample Texture 2D", SX + 500.0, SY, nayte_slotit, m_TextureType=0,
                   m_NormalMapSpace=0, m_EnableGlobalMipBias=True)
# VaraVari: näyte → paikan 1 varaVari. UV ei kelpaa (akselit puuttuvat, uv < 0) → a = 0, jolloin varakarttaa ei
# käytetä (ennen: kulman pikseli, Etelämanner, valkoinen). Testitila 4 (_lentoVara) → UV väreinä.
VARA_VARI_RUNKO = (
    "bool kelpaa = uv.x >= 0.0;\n"
    "vari = kelpaa ? float4(nayte.rgb, 1.0) : float4(0.0, 0.0, 0.0, 0.0);\n"
    "if (tila > 3.5) vari = kelpaa ? float4(uv.x, uv.y, 0.0, 1.0) : float4(1.0, 0.0, 0.0, 1.0);\n")
vv_slotit = [slotti("Vector4MaterialSlot", 0, "nayte", 0, v4()), slotti("Vector2MaterialSlot", 1, "uv", 0, {"x": 0.0, "y": 0.0}),
             slotti("Vector1MaterialSlot", 2, "tila", 0, 0.0), slotti("Vector4MaterialSlot", 3, "vari", 1, v4())]
for s in vv_slotit: s["m_StageCapability"] = 2
vv_cf = solmupohja("CustomFunctionNode", "VaraVari (Custom Function)", SX + 750.0, SY, vv_slotit, m_SGVersion=1,
                   synonyms=["code", "HLSL"], m_SourceType=1, m_FunctionName="VaraVari", m_FunctionSource="",
                   m_FunctionBody=VARA_VARI_RUNKO)
vara2_solmu, vara2_ulos = ominaisuussolmu(vara_om, SX + 600.0, SY + 360.0)
varataso_solmu, varataso_ulos = ominaisuussolmu(varataso_om, SX + 600.0, SY + 420.0)
p1, p2 = paikkasolmut["1"]["m_ObjectId"], paikkasolmut["2"]["m_ObjectId"]
G["m_Edges"] += [reuna(maailma_solmu["m_ObjectId"], 0, uv_cf["m_ObjectId"], 0),
                 reuna(keski2_solmu["m_ObjectId"], 0, uv_cf["m_ObjectId"], 1),
                 reuna(akseli2_solmu["m_ObjectId"], 0, uv_cf["m_ObjectId"], 2),
                 reuna(nolla_solmu["m_ObjectId"], 0, uv_cf["m_ObjectId"], 3),
                 reuna(ita_solmu["m_ObjectId"], 0, uv_cf["m_ObjectId"], 4),
                 reuna(uv_cf["m_ObjectId"], 5, nayte["m_ObjectId"], 2),
                 reuna(kartta_solmu["m_ObjectId"], 0, nayte["m_ObjectId"], 1),
                 reuna(nayte["m_ObjectId"], 0, vv_cf["m_ObjectId"], 0),
                 reuna(uv_cf["m_ObjectId"], 5, vv_cf["m_ObjectId"], 1),
                 reuna(vara2_solmu["m_ObjectId"], 0, vv_cf["m_ObjectId"], 2),
                 reuna(vv_cf["m_ObjectId"], 3, p1, 710000),
                 reuna(vara_solmu["m_ObjectId"], 0, p1, 710001),
                 reuna(varataso_solmu["m_ObjectId"], 0, p1, 710004),
                 reuna(meriv_solmu["m_ObjectId"], 0, p2, 710002),
                 reuna(kynnys_solmu["m_ObjectId"], 0, p2, 710003)]
for om in (vara_om, varataso_om, meriv_om, kynnys_om, nolla_om, ita_om, kartta_om):
    G["m_Properties"].append({"m_Id": om["m_ObjectId"]})
    KAT["m_ChildObjectList"].append({"m_Id": om["m_ObjectId"]})
satsolmut = [vara_solmu, meriv_solmu, kynnys_solmu, keski2_solmu, akseli2_solmu, nolla_solmu, ita_solmu, kartta_solmu,
             maailma_solmu, uv_cf, nayte, vv_cf, vara2_solmu, varataso_solmu]
for s in satsolmut:
    G["m_Nodes"].append({"m_Id": s["m_ObjectId"]})
lisat += [vara_om, varataso_om, meriv_om, kynnys_om, nolla_om, ita_om, kartta_om, vara_ulos, meriv_ulos, kynnys_ulos, keski2_ulos,
          akseli2_ulos, nolla_ulos, ita_ulos, kartta_ulos, maailma_ulos, vara2_ulos, varataso_ulos] + satsolmut + uv_slotit + nayte_slotit + vv_slotit
print("paikka 1 ← lennon varakartta (_lentoVara, _lentoVaraKartta); paikka 2 ← meren värjäys (_s2MeriVari, _s2MeriKynnys)")

kaavio += lisat
kirjoita(os.path.join(kohde, "MatkakirjaTileset.shadergraph"), kaavio)

# .metat Cesiumin omista (alikaavio ja kaavio käyttävät eri ScriptedImporteria), uusi GUID.
for nimi, guid, malli in (("MatkakirjaRasteri.shadersubgraph", ALI_GUID, "CesiumRasterOverlay.shadersubgraph.meta"),
                          ("MatkakirjaTileset.shadergraph", KAAVIO_GUID, "CesiumDefaultTilesetShader.shadergraph.meta")):
    meta = open(os.path.join(lahde, malli), encoding="utf-8").read()
    alku = meta.split("guid: ")[0]
    loppu = meta.split("\n", 2)[2]
    open(os.path.join(kohde, nimi + ".meta"), "w", encoding="utf-8").write(alku + "guid: " + guid + "\n" + loppu)
