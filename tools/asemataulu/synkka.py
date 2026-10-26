#!/usr/bin/env python3
"""ASEMATAULUN SYNKKA (omistaja 12.10.2026 klo 21.4x: "tee korjaus joka pitää huolen että työlista ja asemataulu
pysyy päivitettynä kaikissa tilanteissa").

Totuus on tiedostoissa data/talo/<dokumentti>.json (Päätoimittaja kirjoittaa). Postivahti ajaa tämän joka
kierroksella heti ArtifactData listin jälkeen:

  python3 -I synkka.py --lista <listin out_dir>/talo --versiot junat=6,tyolista=2,... [--ulos kirjoitukset.json]

0) VALMIIDEN ARKISTOINTI (omistaja 20.10.2026 klo 23.32: "valmistuneet lista voisi olla 10 viimeisintä vain"): tyolista.json:iin
   jää valmiista riveistä 10 uusinta (valmistui, sitten ts); vanhemmat siirtyvät tiedostoon data/talo-arkisto/tyolista-valmiit.jsonl
   (yksi rivi per kohde, ei viedä tauluun). Rivi "ARKISTOITU|tyolista|<määrä>|<arkisto>". Valmis = sama sääntö kuin sivulla.
1) Vertaa PT:n dokumentteja (junat, tyolista, huom) taulun nykyiseen sisältöön. Erot
   kirjoitetaan --ulos-tiedostoon valmiiksi ArtifactData batchin writes-listaksi (op set, file_path,
   if_version listin versioista). Rivi "VIE|<doc>|<syy>" per kirjoitus. Tyhjällä taululla (uusi tili) kaikki.
2) Vanhenemisvahti: jos junat tai tyolista on vanhempi kuin viimeisin tapahtuma (PT:n kirjattavat-tiedosto,
   mainin viimeisin commit) yli 45 min, tai tyolista yli 6 h päivällä (07–24), tulostaa
   "VANHA|<doc>|<ikä min>|<viimeisin tapahtuma HH.MM>" — Postivahti viestii sen Päätoimittajalle
   (enintään kerran tunnissa per dokumentti; tila data/.vanha-ilmoitettu.json).
3) Tarkistin ennen vientiä (omistaja 19.10.2026 klo 19.51, docs/moduulit/asemataulu.md): junat (+ eteneminen) ja tyolista
   ajetaan tarkista-junat.py:n läpi; dokumentti, jossa on VIRHE, jää viemättä ja tulostuu rivi
   "ESTO|<doc>|<virheiden määrä>|<ensimmäinen virhe>" — Asemataulu-sessio kertoo sen PT:lle, PT korjaa tiedoston.
4) VANHOJEN TOIMI-DOKUMENTTIEN SIIVOUS (omistaja 20.10.2026 klo 23.48: vanha toimi-keskustelukanava-odottaa jäi punaiseksi, vaikka
   asiaan oli vastattu): taulun talo/toimi-*-dokumentti poistetaan (batchin op delete, if_version listin versioista), kun se on
   yli 30 min vanha ja asia on kuitattu, tai yli 2 h vanha, kun kuittaustietoa ei ole. Kuitattu = dokumentissa kenttä kuitattu/hoidettu,
   tai toimi-<rooli>-odottaa-dokumentin roolin sessio ei enää odota (~/.claude/sessions/*.json, status ≠ waiting; sama kuin
   odottajat-vahti.py). Rivi "SIIVOA|<doc>|<ikä min>|<syy>"; paikallinen kopio siirtyy data/talo-arkisto/toimi/-kansioon.
5) Työlistavahti (omistaja 20.10.2026 klo 23.12, Raamattu 7.39 TYÖLISTAVAHTI): ennen valmiiden arkistointia ja tarkistinta
   tyolistavahti.py korjaa data/talo/tyolista.json:n (valmiit Valmistuneisiin, yli 48 h päivittämättä työn alla → pidossa,
   edistys ≤ 5, kenttä vahti) ja tulostaa rivit "TYOLISTA <laji>|…" PT:lle; sama rivi enintään kerran 6 tunnissa
   (tila data/.vanha-ilmoitettu.json).
6) KOODI JA OHJE MAINISTA JOKA KIERROKSELLA (21.10.2026: #5120:n ohje jäi työkansioon päivittämättä 16 tunniksi, koska komento
   piti muistaa ajaa käsin): ennen muuta synkka ajaa työkansion `asemataulu.py --kierros` (vain kun kansiossa on nykyinen.json eli
   kyseessä on oikea työkansio). Sen rivit tulostuvat sellaisinaan: PÄIVITETTY|… (ei toimia), OHJE PÄIVITETTY|… (Asemataulu lukee
   ohjeen uudelleen), NYKYINEN MUUTTUI|… (id:t tai osoite vaihtui) ja PUUTE|… (rivi PT:lle). Speksi luku 2, KIERROS.
7) TAULUN ETENEMISEN TARKISTUS (21.10.2026): Natiiviseppä ja Julkaisija kirjoittavat talo/eteneminen suoraan tauluun, joten synkka
   tarkistaa listin eteneminen-dokumentin (junat listista tai tiedostosta) ja tulostaa "TARKISTA|eteneminen|<määrä>|<1. virhe>|<kirjoittaja>",
   kun dokumentissa on virhe (sama sisältö kerran; tila data/.vanha-ilmoitettu.json). Asemataulu välittää rivin PT:lle.
Ei kirjoita tauluun itse; data-tiedostoista muuttaa vain tyolista.json:n työlistavahdin sääntöjen mukaan (kohta 5) ja valmiiden
arkistoinnin (kohta 0) sekä toimi-kopiot (kohta 4).
Tehtavat-dokumentti poistettiin (omistaja 20.10.2026 klo 23.48): roolikortin teksti johdetaan työlistasta (hoitaja/kierros.py).
Sinulle-osio (talo/viestit) ja Kulutus (talo/kulutus, kulutus.py) poistettiin (omistaja 20.10.2026 klo 23.32–23.35).
"""
import argparse
import glob
import importlib.util
import json
import os
import re
import shutil
import subprocess
import time

TAMA = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(TAMA, "data", "talo")
FABLE = "/Users/Shared/Claude/Matkakirja-fable"
PT_DOCS = ["junat", "tyolista", "huom"]
SESSIOT = os.path.expanduser("~/.claude/sessions")
TOIMI_ARKISTO = os.path.join(TAMA, "data", "talo-arkisto", "toimi")
TOIMI_KUITATTU_MIN = 30
TOIMI_ILMAN_KUITTAUSTA_MIN = 120
TILA = os.path.join(TAMA, "data", ".vanha-ilmoitettu.json")
ARKISTO = os.path.join(TAMA, "data", "talo-arkisto", "tyolista-valmiit.jsonl")
VALMIIT_NAKYY = 10
# Sama kuin sivun OSIO_OTSIKKO ja TYON_ALLA (asemataulu.html, vainValmiita).
OSIO_OTSIKKO = re.compile(r"^\s*(Työn alla|Valmiina|Korjatut|Uutta|Junassa\s+\d+)\b[^:\n]{0,60}:", re.I)
TYON_ALLA = re.compile(r"^\s*Työn alla", re.I)
VALMISTUI_RE = re.compile(r"(\d{1,2})\.(\d{1,2})\.")
RAJA_TAPAHTUMA = 45 * 60
RAJA_TYOLISTA = 6 * 3600
ILMOITUSVALI = 3600
TYOLISTA_ILMOITUSVALI = 6 * 3600


def lue(polku):
    try:
        with open(polku, encoding="utf-8") as f:
            return json.load(f)
    except (OSError, ValueError):
        return None


def on_valmis(r):
    """Sivun onValmis: tila alkaa "valmis" tai tilanteessa on osio-otsikoita mutta ei Työn alla -osiota."""
    if re.match(r"valmis", str(r.get("tila") or ""), re.I):
        return True
    otsikot = [x for x in str(r.get("tilanne") or "").split("\n") if OSIO_OTSIKKO.match(x)]
    return bool(otsikot) and not any(TYON_ALLA.match(x) for x in otsikot)


def valmistumis_avain(r, nyt=None):
    """(vuosi*10000 + kk*100 + pv, ts); sama kuin sivun uusinEnsin. Kuluvaa kuukautta myöhempi kuukausi = edellinen vuosi."""
    lt = time.localtime(nyt)
    m = VALMISTUI_RE.search(str(r.get("valmistui") or ""))
    paiva = 0
    if m:
        kk = int(m.group(2))
        paiva = (lt.tm_year - (1 if kk > lt.tm_mon else 0)) * 10000 + kk * 100 + int(m.group(1))
    ts = r.get("ts")
    return (paiva, ts if isinstance(ts, (int, float)) else 0)


def arkistoi_valmiit(data=DATA, arkisto=ARKISTO, nakyy=VALMIIT_NAKYY):
    """Siirtää tyolista.json:n valmiista riveistä muut kuin `nakyy` uusinta arkistoon. Palauttaa siirrettyjen määrän."""
    polku = os.path.join(data, "tyolista.json")
    tl = lue(polku)
    if not isinstance(tl, dict) or not isinstance(tl.get("rivit"), list):
        return 0
    valmiit = [r for r in tl["rivit"] if isinstance(r, dict) and on_valmis(r)]
    if len(valmiit) <= nakyy:
        return 0
    jaavat = set(id(r) for r in sorted(valmiit, key=valmistumis_avain, reverse=True)[:nakyy])
    siirrettavat = [r for r in valmiit if id(r) not in jaavat]
    # Sama rivi (PT kirjoitti vanhan listan uudelleen) ei tule arkistoon kahdesti.
    olemassa = set()
    if os.path.exists(arkisto):
        with open(arkisto, encoding="utf-8") as f:
            for rivi in f:
                try:
                    olemassa.add(json.dumps(json.loads(rivi).get("rivi"), ensure_ascii=False, sort_keys=True))
                except (ValueError, AttributeError):
                    pass
    os.makedirs(os.path.dirname(arkisto), exist_ok=True)
    nyt = int(time.time() * 1000)
    with open(arkisto, "a", encoding="utf-8") as f:
        for r in siirrettavat:
            avain = json.dumps(r, ensure_ascii=False, sort_keys=True)
            if avain not in olemassa:
                f.write(json.dumps({"arkistoitu": nyt, "rivi": r}, ensure_ascii=False) + "\n")
                olemassa.add(avain)
    pois = set(id(r) for r in siirrettavat)
    tl["rivit"] = [r for r in tl["rivit"] if id(r) not in pois]
    tmp = polku + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(tl, f, ensure_ascii=False, indent=2)
    shutil.copymode(polku, tmp)
    os.replace(tmp, polku)
    return len(siirrettavat)


def toimi_doc_id(rooli):
    """Sama kuin odottajat-vahti.py:n doc_id: "Keskustelukanava" → "toimi-keskustelukanava-odottaa"."""
    s = str(rooli or "").split(" (")[0].strip().lower()
    for x, y in (("ä", "a"), ("ö", "o"), ("å", "a"), ("é", "e")):
        s = s.replace(x, y)
    s = "".join(c if c.isalnum() else "-" for c in s).strip("-")
    while "--" in s:
        s = s.replace("--", "-")
    return "toimi-" + s + "-odottaa"


def odottavat_toimet(kansio=SESSIOT):
    """Joukko toimi-*-odottaa-doc_id:itä, joiden sessio odottaa juuri nyt; None, jos sessiotietoa ei ole."""
    if not os.path.isdir(kansio):
        return None
    tulos, luettu = set(), False
    for p in glob.glob(os.path.join(kansio, "*.json")):
        d = lue(p)
        if not isinstance(d, dict):
            continue
        luettu = True
        if str(d.get("status", "")) == "waiting":
            tulos.add(toimi_doc_id(d.get("name")))
    return tulos if luettu else None


def siivottavat_toimet(lista, nyt=None, sessiot=SESSIOT):
    """[(doc, ikä min, syy)] taulun toimi-*-dokumenteista, jotka poistetaan (luku 6, VAATII TOIMIA)."""
    nyt = time.time() if nyt is None else nyt
    odottavat = odottavat_toimet(sessiot)
    tulos = []
    for p in sorted(glob.glob(os.path.join(lista, "toimi-*.json"))):
        doc = os.path.basename(p)[:-5]
        d = lue(p)
        ts = d.get("ts") if isinstance(d, dict) else None
        if not isinstance(ts, (int, float)) or ts <= 0:
            try:
                ts = os.path.getmtime(p) * 1000
            except OSError:
                continue
        ika = (nyt - ts / 1000.0) / 60.0
        if isinstance(d, dict) and (d.get("kuitattu") or d.get("hoidettu")):
            kuitattu = True
        elif doc.endswith("-odottaa") and odottavat is not None:
            kuitattu = doc not in odottavat
        else:
            kuitattu = None
        if kuitattu and ika > TOIMI_KUITATTU_MIN:
            tulos.append((doc, int(ika), "kuitattu"))
        elif kuitattu is None and ika > TOIMI_ILMAN_KUITTAUSTA_MIN:
            tulos.append((doc, int(ika), "ei kuittaustietoa, yli 2 h"))
    return tulos
def tyolistavahti(nyt):
    """Ajaa tyolistavahti.py:n tyolista.json:lle (kirjoittaa muutokset) ja palauttaa PT:lle tulostettavat rivit (6 h raja)."""
    sp = importlib.util.spec_from_file_location("tyolistavahti", os.path.join(TAMA, "tyolistavahti.py"))
    v = importlib.util.module_from_spec(sp)
    sp.loader.exec_module(v)
    _, rivit = v.aja_tiedostolle(os.path.join(DATA, "tyolista.json"), True)
    tila = lue(TILA) or {}
    ulos = []
    for r in rivit:
        avain = "tl:" + r
        if nyt - float(tila.get(avain, 0)) > TYOLISTA_ILMOITUSVALI:
            ulos.append(r)
            tila[avain] = nyt
    if ulos:
        tmp = TILA + ".tmp"
        with open(tmp, "w", encoding="utf-8") as f:
            json.dump(tila, f)
        os.replace(tmp, TILA)
    return ulos


def tarkistimen_virheet():
    """{doc: [virheet]} tarkista-junat.py:n mukaan (sama kansio)."""
    sp = importlib.util.spec_from_file_location("tarkista_junat", os.path.join(TAMA, "tarkista-junat.py"))
    t = importlib.util.module_from_spec(sp)
    sp.loader.exec_module(t)
    tulos = {}
    junat = lue(os.path.join(DATA, "junat.json"))
    if junat is not None:
        tulos["junat"] = t.tarkista(junat, lue(os.path.join(DATA, "eteneminen.json")))[0]
    tl = lue(os.path.join(DATA, "tyolista.json"))
    if tl is not None:
        tulos["tyolista"] = t.tarkista_tyolista(tl)[0]
    return tulos


def doc_ts(doc, sisalto):
    ts = sisalto.get("ts") if isinstance(sisalto, dict) else None
    if isinstance(ts, (int, float)) and ts > 0:
        return ts / 1000.0
    try:
        return os.path.getmtime(os.path.join(DATA, doc + ".json"))
    except OSError:
        return 0.0


def viimeisin_tapahtuma():
    ajat = []
    for p in glob.glob(os.path.join(FABLE, "scratchpad", "kirjattavat-*.md")):
        try:
            ajat.append(os.path.getmtime(p))
        except OSError:
            pass
    try:
        r = subprocess.run(["git", "-C", FABLE, "log", "-1", "--format=%ct", "origin/main"],
                           capture_output=True, text=True, timeout=10)
        if r.stdout.strip().isdigit():
            ajat.append(float(r.stdout.strip()))
    except (OSError, subprocess.SubprocessError):
        pass
    return max(ajat) if ajat else 0.0


def hhmm(t):
    return time.strftime("%H.%M", time.localtime(t))


def koodi_mainista():
    """Kohta 6: työkansion koodi ja ohje origin/mainista ja nykyinen.json osoitekirjasta (asemataulu.py --kierros)."""
    if not os.path.exists(os.path.join(TAMA, "nykyinen.json")):
        return []
    komento = os.path.join(TAMA, "asemataulu.py")
    if not os.path.exists(komento):
        return ["PUUTE|työkansiosta puuttuu asemataulu.py: aja kerran python3 -I tools/asemataulu/asemataulu.py"]
    try:
        r = subprocess.run(["python3", "-I", komento, "--kierros", "--taulu", TAMA], capture_output=True, text=True, timeout=120)
    except (OSError, subprocess.SubprocessError) as e:
        return ["PUUTE|koodin päivitys mainista epäonnistui: %s" % e]
    rivit = [x for x in r.stdout.splitlines() if x.strip()]
    if r.returncode not in (0, 1):
        rivit.append("PUUTE|asemataulu.py --kierros paluukoodi %d: %s" % (r.returncode, (r.stderr.strip().splitlines() or ["-"])[-1][:160]))
    return rivit


def eteneminen_taulussa(lista):
    """Kohta 7: listin eteneminen tarkistimella; palauttaa (virheet, kirjoittaja, avain) tai None."""
    et = lue(os.path.join(lista, "eteneminen.json"))
    if not isinstance(et, dict) or not et.get("nimi"):
        return None
    junat = lue(os.path.join(lista, "junat.json")) or lue(os.path.join(DATA, "junat.json"))
    if junat is None:
        return None
    sp = importlib.util.spec_from_file_location("tarkista_junat", os.path.join(TAMA, "tarkista-junat.py"))
    t = importlib.util.module_from_spec(sp)
    sp.loader.exec_module(t)
    virheet = [v for v in t.tarkista(junat, et)[0] if v.startswith("eteneminen")]
    return (virheet, et.get("kirjoittaja") or "-", json.dumps(et, sort_keys=True, ensure_ascii=False)) if virheet else None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--lista", required=True, help="ArtifactData listin out_dir/talo")
    ap.add_argument("--versiot", default="", help="doc=versio,doc=versio (listin tulosteesta)")
    ap.add_argument("--ulos", default=os.path.join(TAMA, "data", "kirjoitukset.json"))
    ap.add_argument("--sessiot", default=SESSIOT, help="Clauden sessioiden tilatiedostot (toimi-*-odottaa-kuittaus)")
    a = ap.parse_args()

    versiot = {}
    for osa in filter(None, (x.strip() for x in a.versiot.split(","))):
        k, _, v = osa.partition("=")
        if v.strip().isdigit():
            versiot[k.strip()] = int(v)

    for r in koodi_mainista():
        print(r)
    for r in tyolistavahti(time.time()):
        print(r)
    siirretty = arkistoi_valmiit()
    if siirretty:
        print(f"ARKISTOITU|tyolista|{siirretty}|{ARKISTO}")

    kirjoitukset = []
    estot = tarkistimen_virheet()
    for doc in PT_DOCS:
        oma_polku = os.path.join(DATA, doc + ".json")
        oma = lue(oma_polku)
        if oma is None:
            continue
        if estot.get(doc):
            print(f"ESTO|{doc}|{len(estot[doc])}|{estot[doc][0][:160]}")
            continue
        live = lue(os.path.join(a.lista, doc + ".json"))
        if live == oma:
            continue
        k = {"op": "set", "collection": "talo", "doc_id": doc, "file_path": oma_polku}
        if live is not None:
            if doc not in versiot:
                print(f"VERSIO PUUTTUU|{doc}|anna --versiot {doc}=<versio listin tulosteesta>")
                continue
            k["if_version"] = versiot[doc]
            print(f"VIE|{doc}|sisältö eroaa taulusta")
        else:
            print(f"VIE|{doc}|puuttuu taulusta")
        kirjoitukset.append(k)
    for doc, ika, syy in siivottavat_toimet(a.lista, sessiot=a.sessiot):
        if doc not in versiot:
            print(f"VERSIO PUUTTUU|{doc}|anna --versiot {doc}=<versio listin tulosteesta>")
            continue
        kirjoitukset.append({"op": "delete", "collection": "talo", "doc_id": doc, "if_version": versiot[doc]})
        oma = os.path.join(DATA, doc + ".json")
        if os.path.exists(oma):
            os.makedirs(TOIMI_ARKISTO, exist_ok=True)
            os.replace(oma, os.path.join(TOIMI_ARKISTO, "%s-%d.json" % (doc, int(time.time()))))
        print(f"SIIVOA|{doc}|{ika}|{syy}")
    tmp = a.ulos + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(kirjoitukset, f, ensure_ascii=False, indent=1)
    os.replace(tmp, a.ulos)
    print(f"KIRJOITUKSIA|{len(kirjoitukset)}|{a.ulos}")

    nyt = time.time()
    tapahtuma = viimeisin_tapahtuma()
    tila = lue(TILA) or {}
    muuttui = False
    et = eteneminen_taulussa(a.lista)
    if et and tila.get("eteneminen-tarkista") != et[2]:
        print(f"TARKISTA|eteneminen|{len(et[0])}|{et[0][0][:160]}|{et[1]}")
        tila["eteneminen-tarkista"] = et[2]
        muuttui = True
    for doc in ("junat", "tyolista"):
        sis = lue(os.path.join(DATA, doc + ".json"))
        if sis is None:
            continue
        ts = doc_ts(doc, sis)
        vanha = (tapahtuma - ts > RAJA_TAPAHTUMA and nyt - ts > RAJA_TAPAHTUMA)
        if doc == "tyolista" and 7 <= time.localtime(nyt).tm_hour <= 23 and nyt - ts > RAJA_TYOLISTA:
            vanha = True
        if vanha and nyt - float(tila.get(doc, 0)) > ILMOITUSVALI:
            print(f"VANHA|{doc}|{int((nyt - ts) / 60)}|{hhmm(tapahtuma) if tapahtuma else '-'}")
            tila[doc] = nyt
            muuttui = True
    if muuttui:
        os.makedirs(os.path.dirname(TILA), exist_ok=True)
        tmp = TILA + ".tmp"
        with open(tmp, "w", encoding="utf-8") as f:
            json.dump(tila, f)
        os.replace(tmp, TILA)


if __name__ == "__main__":
    main()
