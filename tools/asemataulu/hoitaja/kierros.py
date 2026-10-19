#!/usr/bin/env python3
"""Kohta A: kokoaa mittarit.json ja roolit.json hoitaja/-kansioon.
Käyttö: kierros.py --viikko N --viikko-reset ISO --h5 N --h5-reset ISO --pt N --kk N --levy N
Sessiot luetaan hoitaja/sessiot.json (list_sessions-tuloste)."""
import argparse, json, os, time, datetime
H = os.path.dirname(os.path.abspath(__file__)); T = os.path.dirname(H)
a = argparse.ArgumentParser()
for k in ("viikko", "h5", "pt", "levy"): a.add_argument("--" + k, type=float, required=True)
a.add_argument("--viikko-reset", required=True); a.add_argument("--h5-reset", required=True)
a.add_argument("--kk", type=float, default=None)  # Keskustelukanavan konteksti (get_usage local_593b89a1), omistaja 14.10. 22.37
a.add_argument("--muisti", type=float, required=True); a.add_argument("--prosessori", type=float, required=True)
a = a.parse_args()
def lue(p):
    with open(p, encoding="utf-8") as f: return json.load(f)
def kirjoita(p, d):
    with open(p + ".tmp", "w", encoding="utf-8") as f: json.dump(d, f, ensure_ascii=False)
    os.replace(p + ".tmp", p)
ed = lue(os.path.join(T, "mittarit.json"))
vanha = {l["nimi"]: l for l in ed["laatat"]}
ts = int(time.time() * 1000)
levy = {"nimi": "Levy", "arvo": "%d Gi" % a.levy}
if a.levy < 100: levy["lisa"] = "alle 100 Gi"
laatat = [
 {"nimi": "Viikko", "palkki": True, "prosentti": int(a.viikko), "arvo": "%d %%" % a.viikko, "nollautuu": a.viikko_reset},
 {"nimi": "5 tuntia", "palkki": True, "prosentti": int(a.h5), "nollautuu": a.h5_reset},
 levy,
 {"nimi": "Muisti", "arvo": "%d %%" % a.muisti},
 {"nimi": "Prosessori", "arvo": "%d %%" % a.prosessori},
 {"nimi": "Raati", "arvo": vanha["Raati"]["arvo"]},
 {"nimi": "Testaajat", "arvo": vanha["Testaajat"]["arvo"]},
]
m = {"laatat": laatat, "pt_konteksti": int(a.pt), "ts": ts}
if a.kk is not None: m["kk_konteksti"] = int(a.kk)
kirjoita(os.path.join(H, "mittarit.json"), m)
ss = lue(os.path.join(H, "sessiot.json"))
rivit = []
# Odotukset (omistaja 19.10. 19.24): "Levossa" vain roolille, jolla ei ole mitään jonossa; muuten lyhyesti mitä se odottaa.
# odottaa.json = {rooli: "odottaa …"} (PT päivittää työlistan ja jonojen mukaan); vanha listamuoto = "odottaa käännösvuoroa".
ODOTTAA = {}
try:
    _o = json.load(open(os.path.join(H, "odottaa.json"), encoding="utf-8"))
    ODOTTAA = _o if isinstance(_o, dict) else {n: "odottaa käännösvuoroa" for n in _o}
except (OSError, ValueError):
    pass
def rivi(nimi, malli, effort, kay, iso):
    t = datetime.datetime.fromisoformat(iso.replace("Z", "+00:00")).astimezone() if iso else datetime.datetime.now().astimezone()
    if not kay and nimi in ODOTTAA:
        return {"nimi": nimi, "malli": malli, "effort": effort, "tila": "odottaa",
                "teksti": ODOTTAA[nimi], "aika": t.strftime("%H.%M")}
    return {"nimi": nimi, "malli": malli, "effort": effort, "tila": "työ" if kay else "lepo",
            "teksti": "Työ käynnissä" if kay else "Levossa", "aika": t.strftime("%H.%M")}
nyt = datetime.datetime.now().astimezone().strftime("%H.%M")
for s in ss:
    if s["title"].startswith("Postivahti"): continue
    n, rest = s["title"].split(" (", 1); m, e = rest.rstrip(")").split(", ")
    r = rivi(n.replace("PÄÄTOIMITTAJA", "Päätoimittaja").replace("KESKUSTELUKANAVA", "Keskustelukanava"), m.split()[0], e, s["isRunning"] or n.startswith(("PÄÄTOIMITTAJA","KESKUSTELUKANAVA")), None)
    r["aika"] = nyt; rivit.append(r)
oma = rivi("Asemataulu", "Sonnet", "high", True, None); rivit.append(oma)
kirjoita(os.path.join(H, "roolit.json"), {"rivit": rivit, "ts": ts})
print(len(rivit), "roolia")
