#!/usr/bin/env python3
# Matkakirjan tileset-varjostin Cesiumin oletuksesta (Natiiviseppä 24.9.2026, Fablen käsky: huntu häivytetään zoomin
# funktiona, ei laattakohtaisesti). Kopioi com.cesium.unityn CesiumDefaultTilesetShader.shadergraphin ja
# CesiumRasterOverlay.shadersubgraphin ja lisää raster-paikoille 0–2 globaalin alfan (_overlayAlfa_0/1/2, Shader.SetGlobalFloat):
# alikaavion lerp-painona on tekstuurin alfa × alfa. Muu kaavio (valaistus, PBR, Clipping) on sanatarkasti Cesiumin.
# Satelliittilento (24.9.2026): alikaavion lerp on Custom Function MatkakirjaSekoitus (sama tulos oletussyötteillä),
# joka paikassa 1 korvaa puuttuvan rasterin lennon varakartalla ja paikassa 2 värjää Sentinelin tumman meren.
# Lisäksi verteksivaiheeseen korkeuserojen liioittelu (globaali _korkeusKerroin, Kartta/KorkeusKerroin.cs; löydös 29).
# Radiouudistus (build 12): fragmentin perusväri ja emissio kulkevat RadioHamara-funktion läpi (hämärä, maavalo ja
# yövalot; Kartta/RadioMastot.cs). Globaalit 0 = ennallaan. Yövalot (build 13): NASA Black Marble omassa raster-paikassa
# sekoituspainolla 0, ja RadioHamara näytteistää saman paikan tekstuurin ja lisää sen emissiona (_radioYovalot).
# Pallon tummennus (löydös 98, build 14): _pallonTummuus kertoo perusvärin (1 − t), web satelliitti-avaruus.js
# PALLON_SAVY 0x999999 linssin ajaksi; 0 = ennallaan (KarttaKerrokset.PallonSavy).
# Valokeila (Ihmisen matka II, 25.9.2026): pallo hämärtyy paitsi yhden tai kahden keilan kohdalla (_keila0/1, _keilaRajat,
# _keila0Vari/_keila1Vari, _keilaHamaryys; KarttaKerrokset.Valokeila, kaavat Kartta/Valokeilalaskenta.cs). Perusväriin
# tummennuksen jälkeen ja ennen radion hämärää; keilan hehku ja muu emissio eivät tummu. 0 = ennallaan.
# Hunnun paljastus (elävä kartta, build 19; Varitaso.Paljastus): paikan 2 sekoituspaino kerrotaan säteittäisellä
# peitolla — pikselin suunta n = normalize(pos − _maaKeski.xyz), jänne c = |n − k| (k = _paljastus.xyz, kuten
# valokeilassa), kohinalla rikottu reuna; peitto = smoothstep(r − w/2, r + w/2, c + kohina). _paljastusReuna.w = 0 →
# ennallaan (paljastus pois). Vain paikka 2 kytketään; muilla syötteet ovat oletusarvossa 0.
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
# punainen = maan akselit puuttuvat); vara 5 = paikan 1 rasterin absoluuttinen taso: punainen = taso <= varaTaso
# (varakartta käytössä), keltainen → vihreä = tasot 2…8, magenta = rasteri puuttuu, sininen = varakartta puuttuu.
# varaVari.a = 0: varakartta ei käytettävissä (UV ei kelpaa) → pohja näkyy; muuten 64 + log2(|d uv_vara|).
# kynnys < 0 = paikan 2 peitto syaanina (alfa sellaisenaan).
# Rasterin absoluuttinen taso z (Web Mercator): rasterin UV muuttuu 2^z kertaa nopeammin kuin koko maailman
# varakartan UV (molemmat Mercatorissa lineaarisia), joten z = log2(|d ouv|) − log2(|d uv_vara|). Varakartan
# derivaatta tulee varaVari.a:ssa koodattuna (VaraVari). Derivaatat ennen haarautumista (tasainen ohjausvuo).
SEKOITUS_RUNKO = (
    "float4 s = nayte;\n"
    "float dr = length(ddx(ouv)) + length(ddy(ouv));\n"
    "float z = log2(max(dr, 1e-12)) - (varaVari.a - 64.0);\n"
    "z = (z > -64.0 && z < 64.0) ? z : 64.0;\n"
    "bool varaOk = varaVari.a > 0.5;\n"
    "if (vara > 4.5) s = s.a < 0.5 ? float4(1.0, 0.0, 1.0, 1.0) : !varaOk ? float4(0.0, 0.0, 1.0, 1.0)\n"
    "    : z <= varaTaso ? float4(1.0, 0.0, 0.0, 1.0) : float4(1.0 - saturate((z - 2.0) / 6.0), 1.0, 0.0, 1.0);\n"
    "else if (vara > 3.5 || (vara > 0.5 && vara < 1.5))\n"
    "{\n"
    "    // Z2 fallback when the raster is missing, when the raster used is itself at level <= varaTaso (the\n"
    "    // fallback is then never worse), or when the raster UV is outside [0,1] (clamp would smear an edge texel).\n"
    "    bool ulkona = any(ouv < -0.002) || any(ouv > 1.002);\n"
    "    bool karkea = varaTaso > 0.0 && z <= varaTaso;\n"
    "    if ((s.a < 0.5 || ulkona || karkea) && varaOk) s = float4(varaVari.rgb, 1.0);\n"
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
    "float peitto = 1.0;\n"
    "// Veil reveal (living map, Varitaso.Paljastus): radial dry-out from the arrival city with a noisy edge.\n"
    "if (paljastusReuna.w > 0.5)\n"
    "{\n"
    "    float3 kn = normalize(pos.xyz - keski.xyz);\n"
    "    float c = length(kn - paljastus.xyz);\n"
    "    float3 q = kn * paljastusReuna.z;\n"
    "    float kohina = sin(q.x + 1.7 * sin(q.y * 1.3)) * sin(q.y * 1.1 + 1.3 * sin(q.z * 1.7))\n"
    "        + 0.5 * sin(q.z * 2.3 + 1.1 * sin(q.x * 2.9));\n"
    "    float w = max(paljastusReuna.x, 1e-6);\n"
    "    peitto = smoothstep(paljastus.w - 0.5 * w, paljastus.w + 0.5 * w, c + kohina * paljastusReuna.y);\n"
    "}\n"
    "ulos = lerp(base, s, (s.a * alfa * peitto).xxxx);\n")
# Alikaavion uudet syötteet: (nimi, viite, tyyppi, kiinteä GUID, solmun paikka-id pääkaaviossa)
ALI_SYOTTEET = [("varaVari", "_varaVari", "v4", "b2e5c8d1-4f6a-4b7c-9d0e-1f2a3b4c5d6e", 710000),
                ("vara", "_vara", "v1", "c3f6d9e2-5a7b-4c8d-8e1f-2a3b4c5d6e7f", 710001),
                ("meriVari", "_meriVari", "v4", "d4a7e0f3-6b8c-4d9e-9f2a-3b4c5d6e7f80", 710002),
                ("meriKynnys", "_meriKynnys", "v1", "e5b8f1a4-7c9d-4eaf-8a3b-4c5d6e7f8091", 710003),
                ("varaTaso", "_varaTaso", "v1", "f6c9a2b5-8dae-4fb0-9b4c-5d6e7f8091a2", 710004),
                ("paljastus", "_paljastus", "v4", "a7d0b3c6-9ebf-4a01-8c5d-6e7f8091a2b3", 710005),
                ("paljastusReuna", "_paljastusReuna", "v4", "b8e1c4d7-afc0-4b12-9d6e-7f8091a2b3c4", 710006),
                ("keski", "_keski", "v4", "c9f2d5e8-b0d1-4c23-8e7f-8091a2b3c4d5", 710007),
                ("pos", "_pos", "v4", "d0a3e6f9-c1e2-4d34-9f80-91a2b3c4d5e6", 710008)]
# Sekoitusfunktion syöttöpaikat ALI_SYOTTEET-järjestyksessä (7 = ulos, 8 = ts, 10 = ouv).
ALI_CF_PAIKAT = [3, 4, 5, 6, 9, 11, 12, 13, 14]

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
             sf_paikka("Vector2MaterialSlot", 10, "ouv", 0), sf_paikka("Vector4MaterialSlot", 11, "paljastus", 0),
             sf_paikka("Vector4MaterialSlot", 12, "paljastusReuna", 0), sf_paikka("Vector4MaterialSlot", 13, "keski", 0),
             sf_paikka("Vector4MaterialSlot", 14, "pos", 0)]
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
# RINNEVALON TASAUS (omistajan löydös 46, build 12; Kartta/Karttavalo.cs): _maaKeski.w = paino w (0–1,
# KorkeusKerroin.Tasaus). Normaali kierretään (Rodrigues) sillä kierrolla, joka vie pisteen ellipsoidinormaalin n kohti
# kameran alapisteen geosentristä normaalia n0 = normalize(_WorldSpaceCameraPos − c): tasamaa saa koko ruudulla saman
# N·L:n (matala aurinko ei vaalenna luodetta eikä tummenna kaakkoa), rinteiden kulma n:ään nähden säilyy. w = 0 →
# normaali täsmälleen ennallaan (pallon mittakaava, lento, linssit).
KORKEUS_RUNKO = (
    "posOut = posOS; nrmOut = nrmOS;\n"
    "float k = kerroin > 0.0 ? kerroin : 1.0;\n"
    "float w = saturate(keski.w);\n"
    "if (k != 1.0 || w > 0.0)\n"
    "{\n"
    "    const float ekv = 6378137.0;        // WGS84 isoakseli\n"
    "    const float nap = 6356752.314245;   // WGS84 pikkuakseli\n"
    "    float3 d = TransformObjectToWorld(posOS) - keski.xyz;\n"
    "    float3 ak = dot(akseli.xyz, akseli.xyz) > 0.5 ? normalize(akseli.xyz) : float3(0.0, 1.0, 0.0);\n"
    "    float r = max(length(d), 1.0);\n"
    "    float z = dot(d, ak);\n"
    "    float3 n = normalize(d + ak * z * (ekv * ekv / (nap * nap) - 1.0));\n"
    "    float3 nw = TransformObjectToWorldNormal(nrmOS);\n"
    "    if (k != 1.0)\n"
    "    {\n"
    "        float uz = z / r;\n"
    "        float sade = ekv * nap / sqrt(nap * nap * (1.0 - uz * uz) + ekv * ekv * uz * uz);\n"
    "        float h = max(r - sade, 0.0);\n"
    "        posOut = posOS + mul((float3x3)GetWorldToObjectMatrix(), n * (h * (k - 1.0)));\n"
    "        float nr = dot(nw, n);\n"
    "        nw = normalize((nw - n * nr) * k + n * nr);\n"
    "    }\n"
    "    if (w > 0.0)\n"
    "    {\n"
    "        // Rinnevalon tasaus (loydos 46): kierto, joka vie n:n kohti kameran alapisteen normaalia n0 (painolla w).\n"
    "        float3 n0 = normalize(_WorldSpaceCameraPos - keski.xyz);\n"
    "        float3 t = normalize(n + (n0 - n) * w);\n"
    "        float c = dot(n, t);\n"
    "        float3 a = cross(n, t);\n"
    "        nw = nw * c + cross(a, nw) + a * (dot(a, nw) / max(1.0 + c, 1e-4));\n"
    "    }\n"
    "    nrmOut = TransformWorldToObjectNormal(nw);\n"
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
    "bool kelpaa = uv.x >= 0.0 && uv.x <= 1.0 && uv.y >= -0.01 && uv.y <= 1.01;\n"
    "float koodi = 64.0 + log2(max(length(ddx(uv)) + length(ddy(uv)), 1e-12));\n"
    "// NaN/inf-safe: a valid fallback must never look unavailable (the base map would show through).\n"
    "koodi = (koodi > 1.0 && koodi < 127.0) ? koodi : 1.0;\n"
    "vari = kelpaa ? float4(nayte.rgb, koodi) : float4(0.0, 0.0, 0.0, 0.0);\n"
    "if (tila > 3.5 && tila < 4.5) vari = kelpaa ? float4(uv.x, uv.y, 0.0, koodi) : float4(1.0, 0.0, 0.0, 64.0);\n")
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
# Hunnun paljastus paikkaan 2: _paljastus, _paljastusReuna, _maaKeski ja maailmapaikka (Absolute World).
palj_om = vektori_ominaisuus("paljastus", "_paljastus")
preuna_om = vektori_ominaisuus("paljastusReuna", "_paljastusReuna")
PX = paikkasolmut["2"]["m_DrawState"]["m_Position"]["x"] - 250.0
PY = paikkasolmut["2"]["m_DrawState"]["m_Position"]["y"] + 380.0
palj_solmu, palj_ulos = vektori_ominaisuussolmu(palj_om, PX, PY)
preuna_solmu, preuna_ulos = vektori_ominaisuussolmu(preuna_om, PX, PY + 60.0)
keski4_solmu, keski4_ulos = vektori_ominaisuussolmu(keski_om, PX, PY + 120.0)
ppos_ulos = slotti("Vector3MaterialSlot", 0, "Out", 1, v3())
ppos_solmu = solmupohja("PositionNode", "Position", PX, PY + 180.0, [ppos_ulos], m_SGVersion=1, m_Space=4,
                        m_PositionSource=0, m_DismissedVersion=0)
G["m_Edges"] += [reuna(palj_solmu["m_ObjectId"], 0, p2, 710005), reuna(preuna_solmu["m_ObjectId"], 0, p2, 710006),
                 reuna(keski4_solmu["m_ObjectId"], 0, p2, 710007), reuna(ppos_solmu["m_ObjectId"], 0, p2, 710008)]
for om in (palj_om, preuna_om):
    G["m_Properties"].append({"m_Id": om["m_ObjectId"]})
    KAT["m_ChildObjectList"].append({"m_Id": om["m_ObjectId"]})
for o in (palj_solmu, preuna_solmu, keski4_solmu, ppos_solmu):
    G["m_Nodes"].append({"m_Id": o["m_ObjectId"]})
lisat += [palj_om, preuna_om, palj_solmu, palj_ulos, preuna_solmu, preuna_ulos, keski4_solmu, keski4_ulos, ppos_solmu, ppos_ulos]
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

# ---- Radion hämärä, maavalo ja yövalot (radiouudistus build 12, Natiiviseppä 24.9.2026) ----
# Suunnitelma docs/raportit/linssi-radiouudistus-suunnitelma-20260924.md luvut 3 ja 5. Globaalit asettaa
# Kartta/RadioMastot.cs (IRadioMastot); asettamattomina ne ovat 0, jolloin tulos on täsmälleen ennallaan.
#   _pallonTummuus     t 0…1: pohja × (1 − t) ennen hämärää (avaruuslinssi, löydös 98; 0 = ennallaan)
#   _keila0, _keila1   xyz = keilan keskipisteen geosentrinen yksikkösuunta Unityn maailmassa, w = sisäjänne (täysi valo)
#   _keilaRajat        x = keilan 0 ulkojänne (pimeä), y = keilan 0 voimakkuus 0…1, z/w = samat keilalle 1
#   _keila0Vari, _keila1Vari   rgb = valon väri lineaarisena (valkoinen = ei sävyä), a = keskustan lisäkirkkaus 0…0,3
#   _keilaHamaryys     kh 0…1: keilan ulkopuolinen perusväri × (1 − 0,95 kh)
#                      Pikselin suunta n = normalize(pos − _maaKeski.xyz); jänne c = |n − k| (acos-vapaa ja floatina tarkka
#                      pienilläkin keiloilla, Valokeilalaskenta.Janne); valo v = (1 − smoothstep(sisä, ulko, c)) × voimakkuus.
#                      Pikseli saa keiloista valoisamman: pohja × lerp(1 − 0,95 kh, 1, max v) × lerp(1, väri, v);
#                      hehku emisOut += pohja × Σ väri × kirkkaus × v² (kohta hehkuu, ei vain säästy hämärältä).
#   _radioHamara       h 0…1: pohja → lerp(pohja, pohja × (0,18, 0,17, 0,24) + (0,006, 0,006, 0,016), h), lineaarinen
#   _radioMaavalo      xyz = valitun maston juuri Unityn maailmassa, w = säde (m) = 110 km + 30 km × kirkkaus
#   _radioMaavaloVari  rgb = lämmin #ff8a4a lineaarisena × kirkkaus; lisätään emissiona (valaisee paperia)
#   _radioYonValot     xyz = valitun maston juuri, w = paikallinen tehostus 0…1 (RadioMastot.YonValot)
#   _radioYovalot      x = yövalojen raster-paikka (1 tai 2; 0 = pois), y = voimakkuus (0,85), z = 1: poltto on jo
#                      suodatettu (lämpimän valon paino ohitetaan), w varalla (RadioMastot.PaivitaYovalot)
# YÖVALOT (NASA Black Marble, Karttasepän sarja 2026-09-25 Z0–Z6, musta tausta): kerros on tavallinen Cesiumin
# raster-overlay paikassa n (KarttaKerrokset.LisaaRasteri), mutta sen sekoituspaino _overlayAlfa_n = 0, joten
# MatkakirjaSekoitus ei peitä pohjaa mustalla. Tämä funktio näytteistää saman tekstuurin (_overlayTexture_n) Cesiumin
# alikaavion tavalla: UV = texCoord[_overlayTextureCoordinateIndex_n] × ts.zw + ts.xy (ts =
# _overlayTranslationAndScale_n), näyte kohdassa (u, 1 − v) (CesiumRasterOverlay.shadersubgraph) ja lisää valot
# emissioon HÄMÄRÄN JÄLKEEN (perusväri tummuu, valot eivät):
#   w     = saturate((R − 48/255) / (170/255)) × saturate((R − B + 10/255) / (40/255))   sRGB, vain lämmin valo
#   lähi  = (1 − smoothstep(60 km, 230 km, etäisyys valittuun mastoon)) × _radioYonValot.w
#   valo  = w × voimakkuus × (0,5 + 0,5 × lähi) × (1,05, 0,82, 0,52)                        natriumin sävy, sRGB
#   emisOut += lineaarinen(valo) × h
# (suunnitelma docs/raportit/linssi-radiouudistus-suunnitelma-20260924.md luku 3). Bloom on filmipinon (Filmipino.asset).
# Tekstuurien nimet viitataan suoraan (Shader Graph julistaa ne kaavion ominaisuuksista samoilla nimillä), UV-kanavat
# tulevat UV-solmuista 0–3. Näyte _GRAD-muodossa, derivaatat ennen haarautumista.
HAMARA_RUNKO = (
    "variOut = vari.rgb * (1.0 - saturate(tummuus)); emisOut = emis;\n"
    "// Spotlight (Ihmisen matka II, KarttaKerrokset.Valokeila): the globe outside one or two beams dims by keilaHamaryys;\n"
    "// chord |n - k| against chord limits (acos-free, precise in float even for small beams); brighter beam wins.\n"
    "// Applied to the base colour only, before the radio dusk: emission (night lights, ground glow) never dims.\n"
    "float kh = saturate(keilaHamaryys);\n"
    "if (kh > 0.0 || keilaRajat.y > 0.0 || keilaRajat.w > 0.0)\n"
    "{\n"
    "    float3 kn = normalize(pos - keski.xyz);\n"
    "    float k0 = (1.0 - smoothstep(keila0.w, max(keilaRajat.x, keila0.w + 1e-6), length(kn - keila0.xyz))) * saturate(keilaRajat.y);\n"
    "    float k1 = (1.0 - smoothstep(keila1.w, max(keilaRajat.z, keila1.w + 1e-6), length(kn - keila1.xyz))) * saturate(keilaRajat.w);\n"
    "    float3 ksavy = k0 >= k1 ? lerp(float3(1.0, 1.0, 1.0), keila0Vari.rgb, k0) : lerp(float3(1.0, 1.0, 1.0), keila1Vari.rgb, k1);\n"
    "    float3 kpohja = variOut;\n"
    "    variOut = kpohja * lerp(1.0 - 0.95 * kh, 1.0, max(k0, k1)) * ksavy;\n"
    "    emisOut += kpohja * (keila0Vari.rgb * (keila0Vari.a * k0 * k0) + keila1Vari.rgb * (keila1Vari.a * k1 * k1));\n"
    "}\n"
    "float h = saturate(hamara);\n"
    "if (h > 0.0)\n"
    "{\n"
    "    float3 ham = variOut * float3(0.18, 0.17, 0.24) + float3(0.006, 0.006, 0.016);\n"
    "    variOut = lerp(variOut, ham, h);\n"
    "}\n"
    "// Ground glow around the selected mast (b12d: was too faint): bright core 1.3 f^2 plus a long linear tail 0.45 f,\n"
    "// lighting the unshaded paper (coastlines and relief stay readable) with a floor so dark sea glows too.\n"
    "if (maavalo.w > 0.0)\n"
    "{\n"
    "    float f = saturate(1.0 - length(pos - maavalo.xyz) / maavalo.w);\n"
    "    emisOut += maavaloVari.rgb * (1.3 * f * f + 0.45 * f) * (vari.rgb * 1.6 + 0.12);\n"
    "}\n"
    "// Night lights (NASA Black Marble, plan ch. 3): yovalot.x = raster slot 1/2 (0 = off), y = strength, z = 1 when the\n"
    "// burn is pre-filtered. The slot's blend weight is 0 (RadioMastot), so the black tile never covers the map; the same\n"
    "// texture is sampled here like CesiumRasterOverlay (uv = texCoord[index] * ts.zw + ts.xy, v flipped) and added as\n"
    "// emission after the dusk (the dusk darkens the base colour, not the lights). yonValot.xyz = selected mast,\n"
    "// yonValot.w = local boost (full within 60 km, fading out by 230 km).\n"
    "int yp = (int)(yovalot.x + 0.5);\n"
    "int yi = (int)((yp == 2 ? _overlayTextureCoordinateIndex_2 : _overlayTextureCoordinateIndex_1) + 0.5);\n"
    "float4 yts = yp == 2 ? _overlayTranslationAndScale_2 : _overlayTranslationAndScale_1;\n"
    "float2 ytc[4] = { tc0, tc1, tc2, tc3 };\n"
    "float2 yuv = ytc[clamp(yi, 0, 3)] * yts.zw + yts.xy;\n"
    "yuv.y = 1.0 - yuv.y;\n"
    "float2 ydx = ddx(yuv), ydy = ddy(yuv);\n"
    "if ((yp == 1 || yp == 2) && yovalot.y > 0.0 && h > 0.0)\n"
    "{\n"
    "    float4 yn;\n"
    "    if (yp == 2) yn = SAMPLE_TEXTURE2D_GRAD(_overlayTexture_2, sampler_overlayTexture_2, yuv, ydx, ydy);\n"
    "    else yn = SAMPLE_TEXTURE2D_GRAD(_overlayTexture_1, sampler_overlayTexture_1, yuv, ydx, ydy);\n"
    "    float3 yg = pow(max(yn.rgb, 1e-5), 0.4545);   // sRGB texture, linear sample -> sRGB values for the thresholds\n"
    "    float yw = yovalot.z > 0.5 ? dot(yg, float3(0.2126, 0.7152, 0.0722))\n"
    "        : saturate((yg.r - 0.188235) / 0.666667) * saturate((yg.r - yg.b + 0.039216) / 0.156863);\n"
    "    yw *= yn.a;   // tile not loaded yet: Cesium's default black (0,0,0,0)\n"
    "    float ylahi = (1.0 - smoothstep(60000.0, 230000.0, length(pos - yonValot.xyz))) * saturate(yonValot.w);\n"
    "    float3 yvalo = yw * yovalot.y * (0.5 + 0.5 * ylahi) * float3(1.05, 0.82, 0.52);\n"
    "    emisOut += pow(max(yvalo, 1e-6), 2.2) * h;\n"
    "}\n")
flohko = {byid[b["m_Id"]]["m_SerializedDescriptor"]: b["m_Id"] for b in G["m_FragmentContext"]["m_Blocks"]}
def sisaan(lohko_id):
    return next(e for e in G["m_Edges"] if e["m_InputSlot"]["m_Node"]["m_Id"] == lohko_id)
vari_reuna, emis_reuna = sisaan(flohko["SurfaceDescription.BaseColor"]), sisaan(flohko["SurfaceDescription.Emission"])
G["m_Edges"] = [e for e in G["m_Edges"] if e is not vari_reuna and e is not emis_reuna]
FX = G["m_FragmentContext"]["m_Position"]["x"] - 450.0
FY = G["m_FragmentContext"]["m_Position"]["y"] - 300.0
ham_slotit = [slotti("Vector4MaterialSlot", 0, "vari", 0, v4()), slotti("Vector3MaterialSlot", 1, "emis", 0, v3()),
              slotti("Vector3MaterialSlot", 2, "pos", 0, v3()), slotti("Vector1MaterialSlot", 3, "hamara", 0, 0.0),
              slotti("Vector4MaterialSlot", 4, "maavalo", 0, v4()), slotti("Vector4MaterialSlot", 5, "maavaloVari", 0, v4()),
              slotti("Vector4MaterialSlot", 6, "yonValot", 0, v4()), slotti("Vector3MaterialSlot", 7, "variOut", 1, v3()),
              slotti("Vector3MaterialSlot", 8, "emisOut", 1, v3()), slotti("Vector4MaterialSlot", 9, "yovalot", 0, v4())]
ham_slotit += [slotti("Vector2MaterialSlot", 10 + i, "tc%d" % i, 0, {"x": 0.0, "y": 0.0}) for i in range(4)]
ham_slotit.append(slotti("Vector1MaterialSlot", 14, "tummuus", 0, 0.0))
# Valokeila: 15 = maan keskipiste (_maaKeski), 16–20 keilat, 21 = hämäryys.
ham_slotit += [slotti("Vector4MaterialSlot", 15, "keski", 0, v4()), slotti("Vector4MaterialSlot", 16, "keila0", 0, v4()),
               slotti("Vector4MaterialSlot", 17, "keila1", 0, v4()), slotti("Vector4MaterialSlot", 18, "keilaRajat", 0, v4()),
               slotti("Vector4MaterialSlot", 19, "keila0Vari", 0, v4()), slotti("Vector4MaterialSlot", 20, "keila1Vari", 0, v4()),
               slotti("Vector1MaterialSlot", 21, "keilaHamaryys", 0, 0.0)]
for s in ham_slotit: s["m_StageCapability"] = 2
ham_cf = solmupohja("CustomFunctionNode", "RadioHamara (Custom Function)", FX, FY, ham_slotit, m_SGVersion=1,
                    synonyms=["code", "HLSL"], m_SourceType=1, m_FunctionName="RadioHamara", m_FunctionSource="",
                    m_FunctionBody=HAMARA_RUNKO)
ham_om = kellu_ominaisuus("radioHamara", "_radioHamara", True); ham_om["m_Value"] = 0.0
tumma_om = kellu_ominaisuus("pallonTummuus", "_pallonTummuus", True); tumma_om["m_Value"] = 0.0
maavalo_om = vektori_ominaisuus("radioMaavalo", "_radioMaavalo")
maavari_om = vektori_ominaisuus("radioMaavaloVari", "_radioMaavaloVari")
yon_om = vektori_ominaisuus("radioYonValot", "_radioYonValot")
yovalot_om = vektori_ominaisuus("radioYovalot", "_radioYovalot")
keila0_om = vektori_ominaisuus("keila0", "_keila0")
keila1_om = vektori_ominaisuus("keila1", "_keila1")
krajat_om = vektori_ominaisuus("keilaRajat", "_keilaRajat")
kvari0_om = vektori_ominaisuus("keila0Vari", "_keila0Vari")
kvari1_om = vektori_ominaisuus("keila1Vari", "_keila1Vari")
khamaryys_om = kellu_ominaisuus("keilaHamaryys", "_keilaHamaryys", True); khamaryys_om["m_Value"] = 0.0
keski3_solmu, keski3_ulos = vektori_ominaisuussolmu(keski_om, FX - 300.0, FY + 1060.0)
keila_solmut, keila_ulot = [], []
for i, om in enumerate((keila0_om, keila1_om, krajat_om, kvari0_om, kvari1_om)):
    ks, ku = vektori_ominaisuussolmu(om, FX - 300.0, FY + 1120.0 + 60.0 * i)
    keila_solmut.append(ks); keila_ulot.append(ku)
khamaryys_solmu, khamaryys_ulos = ominaisuussolmu(khamaryys_om, FX - 300.0, FY + 1420.0)
ham_solmu, ham_ulos = ominaisuussolmu(ham_om, FX - 300.0, FY + 120.0)
tumma_solmu, tumma_ulos = ominaisuussolmu(tumma_om, FX - 300.0, FY + 1000.0)
maavalo_solmu, maavalo_ulos = vektori_ominaisuussolmu(maavalo_om, FX - 300.0, FY + 180.0)
maavari_solmu, maavari_ulos = vektori_ominaisuussolmu(maavari_om, FX - 300.0, FY + 240.0)
yon_solmu, yon_ulos = vektori_ominaisuussolmu(yon_om, FX - 300.0, FY + 300.0)
yovalot_solmu, yovalot_ulos = vektori_ominaisuussolmu(yovalot_om, FX - 300.0, FY + 360.0)
# UV-kanavat 0–3 (Cesiumin CesiumSelectTexCoords-alikaavion tapaan: UV-solmun Vector4 → Vector2-syöte).
uv_solmut, uv_ulot = [], []
for i in range(4):
    u = slotti("Vector4MaterialSlot", 0, "Out", 1, v4())
    uv_solmut.append(solmupohja("UVNode", "UV", FX - 300.0, FY + 420.0 + 140.0 * i, [u], synonyms=["texcoords", "coords", "coordinates"],
                                m_OutputChannel=i))
    uv_ulot.append(u)
hpaikka_ulos = slotti("Vector3MaterialSlot", 0, "Out", 1, v3())
hpaikka_solmu = solmupohja("PositionNode", "Position", FX - 300.0, FY + 60.0, [hpaikka_ulos], m_SGVersion=1, m_Space=4,
                           m_PositionSource=0, m_DismissedVersion=0)
H = ham_cf["m_ObjectId"]
G["m_Edges"] += [reuna(vari_reuna["m_OutputSlot"]["m_Node"]["m_Id"], vari_reuna["m_OutputSlot"]["m_SlotId"], H, 0),
                 reuna(emis_reuna["m_OutputSlot"]["m_Node"]["m_Id"], emis_reuna["m_OutputSlot"]["m_SlotId"], H, 1),
                 reuna(hpaikka_solmu["m_ObjectId"], 0, H, 2),
                 reuna(ham_solmu["m_ObjectId"], 0, H, 3),
                 reuna(maavalo_solmu["m_ObjectId"], 0, H, 4),
                 reuna(maavari_solmu["m_ObjectId"], 0, H, 5),
                 reuna(yon_solmu["m_ObjectId"], 0, H, 6),
                 reuna(yovalot_solmu["m_ObjectId"], 0, H, 9),
                 reuna(tumma_solmu["m_ObjectId"], 0, H, 14),
                 reuna(H, 7, vari_reuna["m_InputSlot"]["m_Node"]["m_Id"], vari_reuna["m_InputSlot"]["m_SlotId"]),
                 reuna(H, 8, emis_reuna["m_InputSlot"]["m_Node"]["m_Id"], emis_reuna["m_InputSlot"]["m_SlotId"])]
G["m_Edges"] += [reuna(uv_solmut[i]["m_ObjectId"], 0, H, 10 + i) for i in range(4)]
G["m_Edges"] += [reuna(keski3_solmu["m_ObjectId"], 0, H, 15), reuna(khamaryys_solmu["m_ObjectId"], 0, H, 21)]
G["m_Edges"] += [reuna(keila_solmut[i]["m_ObjectId"], 0, H, 16 + i) for i in range(5)]
for om in (ham_om, maavalo_om, maavari_om, yon_om, yovalot_om, tumma_om, keila0_om, keila1_om, krajat_om, kvari0_om, kvari1_om,
           khamaryys_om):
    G["m_Properties"].append({"m_Id": om["m_ObjectId"]})
    KAT["m_ChildObjectList"].append({"m_Id": om["m_ObjectId"]})
hsolmut = [ham_cf, ham_solmu, tumma_solmu, maavalo_solmu, maavari_solmu, yon_solmu, yovalot_solmu, hpaikka_solmu] + uv_solmut
hsolmut += [keski3_solmu, khamaryys_solmu] + keila_solmut
for s in hsolmut:
    G["m_Nodes"].append({"m_Id": s["m_ObjectId"]})
lisat += [ham_om, tumma_om, tumma_ulos, maavalo_om, maavari_om, yon_om, yovalot_om, ham_ulos, maavalo_ulos, maavari_ulos, yon_ulos, yovalot_ulos,
          hpaikka_ulos] + uv_ulot + hsolmut + ham_slotit
lisat += [keila0_om, keila1_om, krajat_om, kvari0_om, kvari1_om, khamaryys_om, keski3_ulos, khamaryys_ulos] + keila_ulot
print("fragmentti → RadioHamara (_radioHamara, _radioMaavalo, _radioMaavaloVari, _radioYonValot, _radioYovalot + UV 0–3,"
      " valokeila _keila0/1, _keilaRajat, _keila0Vari/_keila1Vari, _keilaHamaryys)")

kaavio += lisat
kirjoita(os.path.join(kohde, "MatkakirjaTileset.shadergraph"), kaavio)

# .metat Cesiumin omista (alikaavio ja kaavio käyttävät eri ScriptedImporteria), uusi GUID.
for nimi, guid, malli in (("MatkakirjaRasteri.shadersubgraph", ALI_GUID, "CesiumRasterOverlay.shadersubgraph.meta"),
                          ("MatkakirjaTileset.shadergraph", KAAVIO_GUID, "CesiumDefaultTilesetShader.shadergraph.meta")):
    meta = open(os.path.join(lahde, malli), encoding="utf-8").read()
    alku = meta.split("guid: ")[0]
    loppu = meta.split("\n", 2)[2]
    open(os.path.join(kohde, nimi + ".meta"), "w", encoding="utf-8").write(alku + "guid: " + guid + "\n" + loppu)
