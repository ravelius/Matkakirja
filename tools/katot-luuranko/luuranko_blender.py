# KS 9.11.2026 (PT 23.3x, kaupungit koodilla osa A, koe): suoraviivaranka Blenderin Pythonissa (bpypolyskel tarvitsee mathutilsin).
# Ajo: Blender -b --factory-startup --python luuranko_blender.py -- sisaan.json ulos.json
# sisaan: [{osm, renkaat:[[[x,y],...] ulko CCW, reiät CW], ...}]  (renkaat valmiiksi laajennettuina)
# ulos:   {osm: {kasvot:[{reuna:i, p:[[x,y,d],...]}], virhe:str|None}}; d = etäisyys reunasta (tan 1)
import json, sys, time
sys.path.insert(0, "/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/katot-luuranko/kirjasto/bpypolyskel")
from mathutils import Vector
from bpypolyskel import bpypolyskel

arg = sys.argv[sys.argv.index("--") + 1:]
data = json.load(open(arg[0]))
ulos = {}
alku = time.time(); virheita = 0
for k, b in enumerate(data):
    renkaat = b["renkaat"]
    if not renkaat: continue
    verts = []; holes = []
    for j, r in enumerate(renkaat):
        if j > 0: holes.append((len(verts), len(r)))
        verts.extend(Vector((x, y, 0.0)) for x, y in r)
    n0 = len(renkaat[0])
    # reunan numero renkaiden yhteisessä järjestyksessä: kärki i -> reuna i (i -> i+1 omassa renkaassaan)
    try:
        faces = bpypolyskel.polygonize(verts, 0, n0, holes or None, 0.0, 1.0, None, None)
        kasvot = []
        for f in faces:
            a, bb = f[0], f[1]
            kasvot.append({"reuna": a, "p": [[verts[i].x, verts[i].y, verts[i].z] for i in f]})
        ulos[b["osm"]] = {"kasvot": kasvot, "virhe": None}
    except Exception as e:  # kirjaston poikkeus -> varakatto
        virheita += 1
        ulos[b["osm"]] = {"kasvot": [], "virhe": type(e).__name__ + ": " + str(e)[:200]}
    if k % 500 == 0: print("LUURANKO", k, "/", len(data), round(time.time() - alku, 1), "s", flush=True)
json.dump(ulos, open(arg[1] + ".tmp", "w"))
import os; os.replace(arg[1] + ".tmp", arg[1])
print("LUURANKO VALMIS", len(data), "virheita", virheita, round(time.time() - alku, 1), "s", flush=True)
