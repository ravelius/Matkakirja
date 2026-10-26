#!/usr/bin/env python3
"""Kohta A: kokoaa mittarit.json ja roolit.json hoitaja/-kansioon.
Käyttö: kierros.py --viikko N --viikko-reset ISO --h5 N --h5-reset ISO --pt N --kk N --levy N --muisti N --prosessori N
        kierros.py --vain-roolit   (Boost pois: vain roolit.json, mittarit ennallaan)
Sessiot luetaan hoitaja/sessiot.json (list_sessions-tuloste sellaisenaan: title, isRunning, lastActivityAt).

ROOLIKORTTI JOHDETAAN JOKA KIERROKSELLA (omistaja 20.10.2026 klo 23.48: "roolit taitavat kuitenkin laahata perässä";
docs/moduulit/asemataulu.md luku 6):
- tila "työ", kun session viimeisin toiminta (list_sessions lastActivityAt) on alle 15 min vanha tai sessio on juuri nyt
  käynnissä; muuten "odottaa" (odottaa.json) tai "lepo". Hetken busy/idle-tila ei yksin ratkaise.
- työssä olevan kortin teksti = työlistan (data/talo/tyolista.json) "työn alla" -rivien otsikot, joiden lisa-kentässä roolin
  nimi on (pilkuin tai nuolin eroteltu; vanhat nimet huomioiden), enintään 2, uusin (ts) ensin; muuten "Työ käynnissä".
Käsin kirjoitettavaa tehtavat-dokumenttia ei enää ole.
"""
import argparse, json, os, re, time, datetime

H = os.path.dirname(os.path.abspath(__file__)); T = os.path.dirname(H)
TYO_RAJA_S = 15 * 60
OTSIKOITA = 2
# Vanhat roolinimet → nykyinen nimi (muisti MEMORY.md, roolien tilaraportit).
VANHAT_NIMET = {"Linnanrakentaja": "Lavastaja", "Siirtoseppä": "Projektiseppä", "Linssiseppä 2": "Valoseppä",
                "Linssiseppä2": "Valoseppä", "Fable": "Päätoimittaja", "PT": "Päätoimittaja", "KK": "Keskustelukanava",
                "PÄÄTOIMITTAJA": "Päätoimittaja", "KESKUSTELUKANAVA": "Keskustelukanava"}


def lue(p):
    with open(p, encoding="utf-8") as f: return json.load(f)


def lue_tai(p, oletus):
    try:
        return lue(p)
    except (OSError, ValueError):
        return oletus


def kirjoita(p, d):
    with open(p + ".tmp", "w", encoding="utf-8") as f: json.dump(d, f, ensure_ascii=False)
    os.replace(p + ".tmp", p)


def nimet_lisasta(lisa):
    """Lisa-kentän roolinimet joukkona nykyisin nimin: "Lavastaja (ent. Linnanrakentaja), Codex" → {Lavastaja, Linnanrakentaja→Lavastaja, Codex}."""
    tulos = set()
    for osa in re.split(r"[,;→/]|\bja\b", str(lisa or "")):
        osa = osa.strip()
        if not osa:
            continue
        perus = osa.split("(")[0].strip()
        ehdokkaat = [perus] + [m.strip() for m in re.findall(r"ent\.\s*([^)]+)", osa)]
        for e in ehdokkaat:
            if e:
                tulos.add(VANHAT_NIMET.get(e, e))
    return tulos


def tyon_alla_otsikot(tyolista, nimi, n=OTSIKOITA):
    """Työlistan "työn alla" -rivien otsikot, joiden lisa-kentässä rooli on; uusin (ts) ensin, enintään n."""
    rivit = (tyolista or {}).get("rivit") if isinstance(tyolista, dict) else None
    nimi = VANHAT_NIMET.get(nimi, nimi)
    osumat = []
    for r in rivit or []:
        if not isinstance(r, dict) or str(r.get("tila") or "").strip().lower() != "työn alla":
            continue
        otsikko = str(r.get("otsikko") or "").strip()
        if not otsikko or otsikko.lower().startswith("odottaa"):
            continue
        if nimi in nimet_lisasta(r.get("lisa")):
            ts = r.get("ts")
            osumat.append((ts if isinstance(ts, (int, float)) else 0, otsikko))
    osumat.sort(key=lambda x: -x[0])
    return [o for _, o in osumat[:n]]


def aika_s(iso):
    """lastActivityAt (ISO) → epoch-sekunnit tai None."""
    if not iso:
        return None
    try:
        return datetime.datetime.fromisoformat(str(iso).replace("Z", "+00:00")).timestamp()
    except ValueError:
        return None


def kortti(nimi, malli, effort, aina_tyo, kaynnissa, viimeksi, odottaa, tyolista, nyt):
    """Yksi roolikortti. viimeksi = viimeisimmän toiminnan epoch-sekunnit (None = ei tietoa)."""
    tuore = viimeksi is not None and nyt - viimeksi < TYO_RAJA_S
    tyo = aina_tyo or kaynnissa or tuore
    aika = time.strftime("%H.%M", time.localtime(viimeksi if viimeksi is not None else nyt))
    r = {"nimi": nimi, "malli": malli, "effort": effort, "aika": aika}
    if tyo:
        otsikot = tyon_alla_otsikot(tyolista, nimi)
        r.update(tila="työ", teksti="; ".join(otsikot) if otsikot else "Työ käynnissä")
    elif nimi in odottaa:
        r.update(tila="odottaa", teksti=odottaa[nimi])
    else:
        r.update(tila="lepo", teksti="Levossa")
    return r


def roolikortit(sessiot, odottaa, tyolista, nyt=None):
    nyt = time.time() if nyt is None else nyt
    rivit = []
    for s in sessiot:
        title = str(s.get("title") or "")
        if title.startswith(("Postivahti", "Asemataulu")) or " (" not in title:
            continue
        n, rest = title.split(" (", 1)
        osat = rest.rstrip(")").split(", ")
        m, e = osat[0], (osat[1] if len(osat) > 1 else "")
        ohjaava = n.startswith(("PÄÄTOIMITTAJA", "KESKUSTELUKANAVA"))
        nimi = n.replace("PÄÄTOIMITTAJA", "Päätoimittaja").replace("KESKUSTELUKANAVA", "Keskustelukanava")
        rivit.append(kortti(nimi, m.split()[0], e, ohjaava, bool(s.get("isRunning")),
                            aika_s(s.get("lastActivityAt")), odottaa, tyolista, nyt))
    rivit.append(kortti("Asemataulu", "Sonnet", "high", True, True, nyt, odottaa, tyolista, nyt))
    return rivit


def lue_odottaa():
    # Odotukset (omistaja 19.10. 19.24): "Levossa" vain roolille, jolla ei ole mitään jonossa; muuten lyhyesti mitä se odottaa.
    # odottaa.json = {rooli: "odottaa …"} (PT päivittää työlistan ja jonojen mukaan); vanha listamuoto = "odottaa käännösvuoroa".
    o = lue_tai(os.path.join(H, "odottaa.json"), {})
    return o if isinstance(o, dict) else {n: "odottaa käännösvuoroa" for n in o}


def main():
    a = argparse.ArgumentParser()
    a.add_argument("--vain-roolit", action="store_true")
    for k in ("viikko", "h5", "pt", "levy", "muisti", "prosessori"): a.add_argument("--" + k, type=float)
    a.add_argument("--viikko-reset"); a.add_argument("--h5-reset")
    a.add_argument("--kk", type=float, default=None)  # Keskustelukanavan konteksti (get_usage), omistaja 14.10. 22.37
    a = a.parse_args()
    ts = int(time.time() * 1000)
    if not a.vain_roolit:
        puuttuu = [k for k in ("viikko", "h5", "pt", "levy", "muisti", "prosessori", "viikko_reset", "h5_reset") if getattr(a, k) is None]
        if puuttuu:
            raise SystemExit("puuttuu: " + ", ".join("--" + k.replace("_", "-") for k in puuttuu) + " (tai --vain-roolit)")
        mittarit(a, ts)
    sessiot = lue(os.path.join(H, "sessiot.json"))
    tyolista = lue_tai(os.path.join(T, "data", "talo", "tyolista.json"), {})
    rivit = roolikortit(sessiot, lue_odottaa(), tyolista)
    kirjoita(os.path.join(H, "roolit.json"), {"rivit": rivit, "ts": ts})
    print(len(rivit), "roolia")


def mittarit(a, ts):
    ed = lue_tai(os.path.join(T, "mittarit.json"), {"laatat": []})
    vanha = {l["nimi"]: l for l in ed.get("laatat", [])}
    levy = {"nimi": "Levy", "arvo": "%d Gi" % a.levy}
    if a.levy < 100: levy["lisa"] = "alle 100 Gi"
    laatat = [
     {"nimi": "Viikko", "palkki": True, "prosentti": int(a.viikko), "arvo": "%d %%" % a.viikko, "nollautuu": a.viikko_reset},
     {"nimi": "5 tuntia", "palkki": True, "prosentti": int(a.h5), "nollautuu": a.h5_reset},
     levy,
     {"nimi": "Muisti", "arvo": "%d %%" % a.muisti},
     {"nimi": "Prosessori", "arvo": "%d %%" % a.prosessori},
     {"nimi": "Raati", "arvo": vanha.get("Raati", {}).get("arvo", "–")},
     {"nimi": "Testaajat", "arvo": vanha.get("Testaajat", {}).get("arvo", "–")},
    ]
    m = {"laatat": laatat, "pt_konteksti": int(a.pt), "ts": ts}
    if a.kk is not None: m["kk_konteksti"] = int(a.kk)
    kirjoita(os.path.join(H, "mittarit.json"), m)


if __name__ == "__main__":
    main()
