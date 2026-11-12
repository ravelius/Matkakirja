#!/usr/bin/env python3
"""TALON KUNTOTARKASTUS (omistaja 12.11.2026 klo 08.5x, KK 08.57; suunnitelma
scratchpad/keskustelukanava/suunnitelmat/20261112-kuntotarkastus.md). Mittaa, ei kysy.

Ajo kerran päivässä klo 06.30 ajastetulla Sonnet-sessiolla (scheduled task matkakirja-kuntotarkastus):
  python3 -I kuntotarkastus.py [--viikko PROS --nollaus ISO] [--kirjaa]
Tulostaa KK:lle menevän viestin (≤ 15 riviä). --kirjaa lisää päivän rivin historiaan (yksi rivi per päivä;
saman päivän uusinta korvaa rivin). Vain luku: ei muuta mitään muuta.

Luvut ja rajat päättää KK (suunnitelman v1). v1:n arviot:
 1 SEISOKKI = roolin pisin tauko sessiolokeissa 24 h:n aikana, jos sillä on nyt työlistassa "työn alla"/"jonossa"-rivi.
 4 KIERROKSET = Macin ajoja samalle tunnukselle (JU:n jonoloki) 24 h:n aikana.
 5 ODOTUS KK:N KATSEELLE: ei v1:ssä (ei halpaa mittaria).
 6 MACIN AJOJONO: JU ei kirjaa jonoon tuloa → v1 näyttää ajojen määrän ja pisimmän ajon.
"""
import argparse
import csv
import datetime as dt
import glob
import json
import os
import re
import subprocess
import statistics
import difflib

REPO = "/Users/Shared/Claude/Matkakirja-fable"
PROJ = "/Users/koodaus/.claude/projects"
HIST = os.environ.get("KUNTO_HISTORIA") or "/Users/Shared/Claude/_kunto/historia.csv"
TYOLISTA = f"{REPO}/scratchpad/asemataulu/data/talo/tyolista.json"
MEMORY = f"{PROJ}/-Users-Shared-Claude-Matkakirja-fable/memory/MEMORY.md"
KK_ALOITUS = f"{REPO}/scratchpad/keskustelukanava/aloitus.md"
KK_JARJ = f"{REPO}/scratchpad/keskustelukanava/jarjestys.md"
KK_ARKISTO = f"{REPO}/scratchpad/keskustelukanava/arkisto"
RAAMATTU = "js/tyohuone-raamattu.js"
JU = "/Users/Shared/Claude/julkaisija-tyokalut"
MACLOKI = f"{JU}/jono-20261103-ilta.txt"
LINKKI = f"{JU}/linkki-224-uutta"
IKKUNA = 1_000_000

ROOLIT = {  # projektikansion pääte → lyhenne
    "3d-selvittaja": "NS", "aanittaja": "ÄÄ", "asemataulu": "AT", "julkaisija": "JU", "karttaseppa": "KS",
    "laitetestaaja": "LT", "linnanrakentaja": "LAV", "linssiseppa-2": "VS", "natiivi-ui": "NUI",
    "pelikoodari": "PK", "posti": "PV", "sisaltokirjuri": "SK", "fable": "PT/KK",
}
TEKIJA = {"Natiivi-UI": "NUI", "Äänittäjä": "ÄÄ", "Karttaseppä": "KS", "Pelikoodari": "PK", "Sisältökirjuri": "SK",
          "Natiiviseppä": "NS", "Lavastaja": "LAV", "Valoseppä": "VS", "Julkaisija": "JU"}
TS = re.compile(r'"timestamp":"([0-9T:.\-]+)Z"')


def git(*a):
    return subprocess.run(["git", "-C", REPO, *a], capture_output=True, text=True).stdout


def koko_kt(p):
    try:
        return round(os.path.getsize(p) / 1024, 1)
    except OSError:
        return None


def utc(s):
    return dt.datetime.fromisoformat(s[:19]).replace(tzinfo=dt.timezone.utc)


def sessiot(alku):
    """{rooli: [(tiedosto, [aikaleimat], malli)]} 24 h:n ikkunasta."""
    out = {}
    for kansio in glob.glob(f"{PROJ}/-Users-Shared-Claude-Matkakirja-*"):
        rooli = ROOLIT.get(kansio.split("Matkakirja-", 1)[1])
        if not rooli:
            continue
        for f in glob.glob(f"{kansio}/*.jsonl"):
            if os.path.getmtime(f) < alku.timestamp():
                continue
            ajat, malli = [], ""
            with open(f, encoding="utf-8", errors="replace") as h:
                for rivi in h:
                    m = TS.search(rivi)
                    if m:
                        ajat.append(utc(m.group(1)))
                    if not malli and '"model":"claude-' in rivi:
                        mm = re.search(r'"model":"(claude-[a-z0-9\-]+)"', rivi)
                        malli = mm.group(1) if mm else ""
            if not ajat:
                continue
            r = rooli
            if rooli == "PT/KK":
                r = "KK" if "fable" in malli else "PT"
            out.setdefault(r, []).append((f, ajat, malli))
    return out


def kk_aloitusmuisti(tiedostot, alku):
    """KK-sessioiden muisti 20. mallikutsun kohdalla (≈ aloituksen jälkeen), suurin %."""
    suurin = None
    for f, ajat, _ in tiedostot:
        if min(ajat) < alku:
            continue
        n, k = 0, None
        with open(f, encoding="utf-8", errors="replace") as h:
            for rivi in h:
                if '"type":"assistant"' not in rivi or '"usage"' not in rivi:
                    continue
                try:
                    u = json.loads(rivi)["message"]["usage"]
                except (ValueError, KeyError, TypeError):
                    continue
                k = u.get("input_tokens", 0) + u.get("cache_read_input_tokens", 0) + u.get("cache_creation_input_tokens", 0)
                n += 1
                if n >= 20:
                    break
        if k:
            p = round(100 * k / IKKUNA, 1)
            suurin = p if suurin is None else max(suurin, p)
    return suurin


def macloki(nyt):
    """JU:n jonolokin rivit 24 h ajalta (lokissa vain HH.MM: luetaan lopusta, yksi vuorokausiraja)."""
    try:
        rivit = open(MACLOKI, encoding="utf-8", errors="replace").read().splitlines()
    except OSError:
        return []
    out, paiva, edel = [], nyt.date(), None
    for r in reversed(rivit):
        m = re.match(r"(\d\d)\.(\d\d) ", r)
        if not m:
            continue
        t = dt.time(int(m.group(1)), int(m.group(2)))
        if edel is not None and t > edel:
            paiva -= dt.timedelta(days=1)
        edel = t
        hetki = dt.datetime.combine(paiva, t)
        if hetki < nyt - dt.timedelta(hours=24):
            break
        out.append(r)
    return out


def mittaa(a):
    nyt_l = dt.datetime.now()
    nyt = dt.datetime.now(dt.timezone.utc)
    alku = nyt - dt.timedelta(hours=24)
    git("fetch", "-q", "origin")
    L = {}
    try:
        rivit = json.load(open(TYOLISTA, encoding="utf-8"))["rivit"]
    except (OSError, ValueError, KeyError):
        rivit = []
    ses = sessiot(alku)

    # 1 SEISOKKI
    aktiiviset = {}  # rooli → vanhimman aktiivisen rivin ts (ts = viimeisin muutos ≥ syntyhetki; varovainen alaraja)
    for x in rivit:
        if x.get("tila") in ("työn alla", "jonossa"):
            r = TEKIJA.get(x.get("tekija"), x.get("tekija"))
            t = dt.datetime.fromtimestamp(x.get("ts", 0) / 1000, dt.timezone.utc)
            aktiiviset[r] = min(aktiiviset.get(r, t), t)
    pisin, kuka = 0, "-"
    for r, tt in ses.items():
        if r not in aktiiviset:
            continue
        raja_t = max(alku, aktiiviset[r])
        ajat = [raja_t] + sorted(t for _, a_, _ in tt for t in a_ if t >= raja_t) + [nyt]
        for x, y in zip(ajat, ajat[1:]):
            g = (y - x).total_seconds() / 60
            if g > pisin:
                pisin, kuka = g, f"{r} {x.astimezone().strftime('%H.%M')}–{y.astimezone().strftime('%H.%M')}"
    L["1 seisokki min"] = (round(pisin), 30, kuka)

    # 2 ALOITUKSEN HINTA
    luov = {}
    for p in git("ls-tree", "--name-only", "origin/main", "docs/raportit/").split():
        m = re.match(r"docs/raportit/viesti-(.+?)-luovutus-(\d{8}-\d{4})", p)
        if m and (m.group(1) not in luov or p > luov[m.group(1)]):
            luov[m.group(1)] = p
    ju = sorted(glob.glob(f"{JU}/LUOVUTUS-ju-sivusessio-*.md"))
    kokot = {f"luovutus {k}": round(int(git("cat-file", "-s", f"origin/main:{p}") or 0) / 1024, 1)
             for k, p in luov.items() if p >= f"docs/raportit/viesti-{k}-luovutus-{(nyt_l - dt.timedelta(days=7)):%Y%m%d}"}
    if ju:
        kokot["luovutus JU"] = koko_kt(ju[-1])
    for p in glob.glob(f"{REPO}/docs/aloitusviestit/*.md"):
        kokot["aloitus " + os.path.basename(p)[:-3]] = koko_kt(p)
    yli = sorted(f"{k} {v}" for k, v in kokot.items() if v and v > 8)
    L["2 aloitus yli 8 kt"] = (len(yli), 0, ", ".join(yli[:4]))
    L["2 KK aloitus.md kt"] = (koko_kt(KK_ALOITUS), 15, "")
    L["2 KK jarjestys.md kt"] = (koko_kt(KK_JARJ), 6, "")
    L["2 MEMORY.md kt"] = (koko_kt(MEMORY), 10, "")
    L["2 KK muisti aloituksen jälkeen %"] = (kk_aloitusmuisti(ses.get("KK", []), alku), 10, "20. mallikutsu")

    # 3 NOLLAUKSET
    noll = {r: sum(1 for _, a_, _ in tt if min(a_) >= alku) for r, tt in ses.items()}
    L["3 nollaukset KK"] = (noll.get("KK", 0), 12, "")
    muut = sorted(((v, r) for r, v in noll.items() if r != "KK"), reverse=True)
    L["3 nollaukset muut (suurin)"] = (muut[0][0] if muut else 0, 20, ", ".join(f"{r} {v}" for v, r in muut[:5]))
    rm = sorted(((kk_aloitusmuisti(tt, alku) or 0, r) for r, tt in ses.items() if r != "KK"), reverse=True)
    L["3 roolin muisti aloituksen jälkeen %"] = (rm[0][0] if rm else None, 10, ", ".join(f"{r} {v}" for v, r in rm[:4]))

    # 4 KIERROKSET + 6 MAC
    ml = macloki(nyt_l)
    ajot = {}
    for r in ml:
        m = re.match(r"\d\d\.\d\d AJO ([A-ZÄÖ]+) (\S+) ([0-9a-f]{7,})", r)
        if m:
            ajot.setdefault(f"{m.group(1)} {m.group(2)}", []).append(m.group(3))
    n = [len(v) for v in ajot.values()]
    top = max(ajot.items(), key=lambda kv: len(kv[1]), default=("-", []))
    L["4 asioita yli 3 kierroksen"] = (sum(1 for v in n if v > 3), 0,
                                     f"suurin {top[0]} {len(top[1])}; mediaani {statistics.median(n) if n else 0}")
    kestot = [int(m.group(1)) for r in ml for m in [re.search(r" kesto (\d+) min", r)] if m]
    L["6 Mac-ajoja"] = (len(kestot), None, f"pisin ajo {max(kestot, default=0)} min; jonoon tuloa ei kirjata")

    # 7 TULOS
    versiot = [p for p in glob.glob(f"{LINKKI}/*.aika") if os.path.getmtime(p) >= alku.timestamp()]
    valmiit = [x for x in rivit if x.get("tila") in ("valmis", "tehty") and x.get("ts", 0) / 1000 >= alku.timestamp()]
    pariisi = [x for x in rivit if "Pariisi" in x.get("otsikko", "") and x.get("tila") not in ("valmis", "tehty")]
    L["7 linkkiin versioita"] = (len(versiot), None, "")
    L["7 suljettuja rivejä"] = (len(valmiit), None, "")
    L["7 Pariisi avoimia rivejä"] = (len(pariisi), None, "")

    # 8 SÄÄNTÖJEN KASVU (verrataan historiaan)
    L["8 Raamattu kt"] = (round(int(git("cat-file", "-s", f"origin/main:{RAAMATTU}") or 0) / 1024, 1), 450, "")
    pohja = git("rev-list", "-1", f"--before={alku.isoformat()}", "origin/main").strip()
    ero = git("diff", "-U0", pohja, "origin/main", "--", RAAMATTU) if pohja else ""
    kohta = re.compile(r"^([+-])\s*'(\d+\.\d+) ([^:]{1,60})")
    lisatty, poistettu = {}, set()
    for r in ero.splitlines():
        m = kohta.match(r)
        if m:
            (lisatty.__setitem__(m.group(2), m.group(3).strip()) if m.group(1) == "+" else poistettu.add(m.group(2)))
    uudet = [f"{k} {v}" for k, v in sorted(lisatty.items()) if k not in poistettu]
    L["8 Raamattu-kohtia muuttui"] = (len(lisatty), 3, ("UUDET: " + "; ".join(uudet))[:160] if uudet else "")

    # 9 VANHAT RIVIT
    vanhat = [x for x in rivit if x.get("tila") == "työn alla" and nyt.timestamp() - x.get("ts", 0) / 1000 > 6 * 3600]
    omistaja = [x for x in rivit if x.get("tila") == "odottaa" and re.match(r"\s*SINÄ", (x.get("lisa") or "") + (x.get("teksti") or ""))
                and nyt.timestamp() - x.get("ts", 0) / 1000 > 86400]
    L["9 työn alla yli 6 h"] = (len(vanhat), 0, ", ".join(x["otsikko"][:30] for x in vanhat[:3]))
    L["9 omistajaa odottaa yli 1 vrk"] = (len(omistaja), 0, ", ".join(x["otsikko"][:30] for x in omistaja[:3]))

    # 10 VARAT
    st = os.statvfs("/System/Volumes/Data")
    gi = round(st.f_bavail * st.f_frsize / 2**30)
    L["10 levy vapaana Gi"] = (gi, 150, "")
    if a.viikko is not None and a.nollaus:
        loppu = dt.datetime.fromisoformat(a.nollaus)
        if loppu.tzinfo is None:
            loppu = loppu.astimezone()
        kulunut = (nyt - (loppu - dt.timedelta(days=7))).total_seconds()
        if a.viikko > 0 and kulunut > 0:
            taysi = loppu - dt.timedelta(days=7) + dt.timedelta(seconds=kulunut * 100 / a.viikko)
            L["10 viikkoraja %"] = (a.viikko, None, f"tahdilla täysi {taysi.astimezone():%d.%m. %H.%M}" +
                                    (" ENNEN nollausta" if taysi < loppu else ""))

    # 11 KK:N OMAT VIRHEET
    eilen = (nyt_l - dt.timedelta(days=1)).strftime("%Y%m%d")
    osumat = 0
    for p in glob.glob(f"{KK_ARKISTO}/jarjestys-historia-*.md"):
        if re.search(r"(\d{8})", os.path.basename(p)).group(1) >= eilen:
            osumat += sum(1 for r in open(p, encoding="utf-8", errors="replace") if re.search(r"virhe|oikaisu", r, re.I))
    L["11 KK virhe/oikaisu-rivit"] = (osumat, None, "")

    # 12 PÄÄLLEKKÄISET KIRJAUKSET (KK 12.11. 09.02): lähes samat MEMORY.md-rivit ja avoimet työlistan otsikot
    def parit(tekstit, raja):
        n, esim = 0, []
        for i, x in enumerate(tekstit):
            for y in tekstit[i + 1:]:
                if difflib.SequenceMatcher(None, x.lower(), y.lower()).ratio() >= raja:
                    n += 1
                    esim.append(f"{x[:22]} ≈ {y[:22]}")
        return n, esim
    try:
        mem = [re.sub(r"\(.*?\.md\)", "", r).strip("- \n") for r in open(MEMORY, encoding="utf-8") if r.startswith("- [")]
    except OSError:
        mem = []
    m_n, m_e = parit(mem, 0.6)
    t_n, t_e = parit([x.get("otsikko", "") for x in rivit if x.get("tila") not in ("valmis", "tehty")], 0.8)
    L["12 päällekkäisiä kirjauksia"] = (m_n + t_n, None, f"muisti {m_n}, työlista {t_n}: " + "; ".join((m_e + t_e)[:2]))
    return nyt_l, L


def punainen(nimi, arvo, raja, lisa=""):
    if "ENNEN nollausta" in lisa:
        return True
    if raja is None or arvo is None:
        return False
    if nimi.startswith("10 levy"):
        return arvo < raja
    return arvo > raja


def lue_historia():
    try:
        return list(csv.DictReader(open(HIST, encoding="utf-8")))
    except OSError:
        return []


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--viikko", type=float, help="viikkorajan käyttö prosentteina (get_usage)")
    ap.add_argument("--nollaus", help="viikkorajan nollaushetki ISO")
    ap.add_argument("--kirjaa", action="store_true")
    a = ap.parse_args()
    nyt, L = mittaa(a)
    hist = lue_historia()
    paiva = nyt.strftime("%Y-%m-%d")
    eilen = next((h for h in reversed(hist) if h.get("pvm") != paiva), {})
    rivit = []
    for k, (v, raja, lisa) in L.items():
        e = eilen.get(k, "")
        pun = punainen(k, v, raja, lisa)
        t = f"{'🔴' if pun else '·'} {k}: {v}" + (f" (eilen {e})" if e != "" else "") + (f" [raja {raja}]" if raja is not None else "") + (f" – {lisa}" if lisa else "")
        rivit.append((not pun, t))
    rivit.sort(key=lambda x: x[0])
    pun = sum(1 for p, _ in rivit if not p)
    print(f"KUNTOTARKASTUS {nyt:%d.%m.%Y %H.%M}: {pun} rajan yli")
    tiivis = [t for _, t in rivit]
    if len(tiivis) > 14:  # ≤ 15 riviä: punaiset aina, vihreät yhdistetään
        pun_r = [t for p, t in rivit if not p]
        muut = [t.lstrip("· ") for p, t in rivit if p]
        tila = 14 - len(pun_r)
        koko = len(muut)
        ryhmat = [muut[i::tila] for i in range(tila)] if tila > 0 else [muut]
        tiivis = pun_r + ["· " + " | ".join(r) for r in ryhmat if r]
        if koko == 0:
            tiivis = pun_r
    print("\n".join(tiivis[:14]))
    if a.kirjaa:
        os.makedirs(os.path.dirname(HIST), exist_ok=True)
        uusi = {"pvm": paiva, **{k: v for k, (v, _, _) in L.items()}}
        hist = [h for h in hist if h.get("pvm") != paiva] + [uusi]
        kentat = list(dict.fromkeys(k for h in hist for k in h))
        tmp = HIST + ".tmp"
        with open(tmp, "w", encoding="utf-8", newline="") as f:
            w = csv.DictWriter(f, fieldnames=kentat)
            w.writeheader()
            w.writerows(hist)
        os.replace(tmp, HIST)


if __name__ == "__main__":
    main()
