# Matkakirja: kaupunkien matalapolyiset 3D-maamerkit (oma työ, CC0). Omistajan kortti 24.9.2026.
#
#   /Applications/Blender.app/Contents/MacOS/Blender -b -P maamerkit.py -- <kaupunki-id> \
#       [--ulos <Maamerkit-kansio>] [--esikatselu <kansio>] [--koko 1024] [--saikeet 8] [--glb <kansio>]
#
# --glb: lisäksi sisältöpaketin GLB <kansio>/<id>-<sha8>.glb (atlas upotettuna) ja rivi
# tools/vienti/maamerkit.json:iin tulostettuna (MAAMERKKIRIVI {...}); ks. ../LUE.md "Sisältöpaketti".
#
# Tuottaa <ulos>/<id>.fbx, <ulos>/Tekstuurit/<id>_vari.png (albedo + AO, sRGB, 1024², ei alfaa) ja
# esikatselukuvat (<esikatselu>/<id>-*.png; oletus Lahde~/esikatselu). Kaupunki on moduuli
# kaupungit/<id>.py, jossa ovat NIMI, PAINOT, AO_ETAISYYS, NAKYMAT, rakenna(v) ja maalaa(g);
# katso ../LUE.md (uuden kaupungin lisääminen).
#
# VAIN taustatilassa (-b) ja VAIN CPU:lla (mm_kirjasto.alusta): Cycles Metal kaatoi Blenderin ja
# avasi ikkunan omistajan työpöydälle (24.9.2026). EEVEE ja Workbench vaativat GPU-kontekstin,
# joten esikatselut piirretään Cyclesillä CPU:lla pienellä näytemäärällä.
import sys, os, importlib
sys.dont_write_bytecode = True   # ei __pycache__-kansioita Lahde~/-kansioon
TAMA = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, TAMA)
import numpy as np
import mm_kirjasto as mk

argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
def valinta(nimi, oletus):
    if nimi in argv:
        i = argv.index(nimi); arvo = argv[i + 1]; del argv[i:i + 2]; return arvo
    return oletus
KOKO = int(valinta("--koko", 1024))
SAIKEET = int(valinta("--saikeet", 8))
ULOS = valinta("--ulos", os.path.dirname(TAMA))
ESIKATSELU = valinta("--esikatselu", os.path.join(TAMA, "esikatselu"))
GLB = valinta("--glb", None)
if not argv: raise SystemExit("anna kaupunki-id, esim. -- lontoo")
ID = argv[0]

kaupunki = importlib.import_module("kaupungit." + ID)
scene = mk.alusta(SAIKEET)
mat = mk.bpy.data.materials.new("Maamerkki_" + ID)
mat.use_nodes = True

v = mk.Verkko(kaupunki.NIMI)
kaupunki.rakenna(v)
o = v.olio(scene, mat)
me = o.data
kolmiot = len(me.polygons)
P = np.array([x.co[:] for x in me.vertices])
mk.loki("%s: %d kolmiota, %d kärkeä, rajat x %.0f..%.0f y %.0f..%.0f z %.1f..%.1f m" % (
    ID, kolmiot, len(me.vertices), P[:, 0].min(), P[:, 0].max(), P[:, 1].min(), P[:, 1].max(), P[:, 2].min(), P[:, 2].max()))
osat = mk._osat_silmukoittain(me)
laskuri = {}
for p in me.polygons: laskuri[int(osat[p.loop_start])] = laskuri.get(int(osat[p.loop_start]), 0) + 1
nimet = {arvo: nimi for nimi, arvo in vars(kaupunki).items() if nimi.isupper() and isinstance(arvo, int) and nimi not in ("KOKO",)}
for k in sorted(laskuri): mk.loki("  osa %2d %-14s %5d kolmiota" % (k, nimet.get(k, "?"), laskuri[k]))

mk.uv_atlas(scene, o, kaupunki.PAINOT)
tih = mk.tekselitiheys(o, KOKO)
mk.loki("tekselitiheys (px/m) osittain: " + ", ".join("%s %.1f" % (nimet.get(k, k), t) for k, t in sorted(tih.items())))

g = mk.leivo(scene, o, KOKO, getattr(kaupunki, "AO_ETAISYYS", 10.0), getattr(kaupunki, "AO_NAYTTEET", 32))
g["K"] = KOKO
albedo = kaupunki.maalaa(g)
os.makedirs(os.path.join(ULOS, "Tekstuurit"), exist_ok=True)
vari = mk.tallenna_albedo(os.path.join(ULOS, "Tekstuurit", ID + "_vari.png"), albedo, g["AO"], g["kattavuus"],
                          getattr(kaupunki, "AO_VOIMA", 0.6))

if ESIKATSELU and ESIKATSELU != "-":
    mk.esikatselu(scene, o, vari, ESIKATSELU, ID, kaupunki.NAKYMAT, getattr(kaupunki, "MAAN_VARI", "#d9cba5"),
                  int(os.environ.get("MM_NAYTTEET", "24")))

if GLB:
    import json, shutil
    os.makedirs(GLB, exist_ok=True)
    valiaikainen = os.path.join(GLB, ID + "-uusi.glb")
    tavuja, sha = mk.vie_glb(scene, o, vari, valiaikainen)
    nimi = "%s-%s.glb" % (ID, sha[:8])
    shutil.move(valiaikainen, os.path.join(GLB, nimi))
    mk.loki("MAAMERKKIRIVI " + json.dumps({
        "id": ID, "kaupunki": ID, "mallinKorkeus": round(float(P[:, 2].max()), 1),
        "malli": {"url": "https://media.matkakirja.app/maamerkit/" + nimi, "sha256": sha, "tavuja": tavuja},
        "lisenssi": "CC0-1.0", "tekija": "Matkakirja (oma työ)",
        "lahde": "Blender-skripti Kartta/Maamerkit/Lahde~/kaupungit/%s.py" % ID}, ensure_ascii=False))

mk.vie_fbx(scene, o, os.path.join(ULOS, ID + ".fbx"))
mk.loki("VALMIS %s: %d kolmiota, korkeus %.1f m" % (ID, kolmiot, P[:, 2].max()))
