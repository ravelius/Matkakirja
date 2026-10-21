#!/usr/bin/env python3
"""ASEMATAULU YHDELLÄ KOMENNOLLA (omistaja 19.10.2026 klo 19.51: "asemataulu pitää olla yksi tarkkaan speksattu työnkulku
jotta se ei hajoa aina tilin vaihdon yhteydessä jollain tavalla"). Speksi: docs/moduulit/asemataulu.md.

  python3 -I tools/asemataulu/asemataulu.py              # rakentaa / päivittää taulun työkansion millä tahansa tilillä
  python3 -I tools/asemataulu/asemataulu.py --tarkista   # ei kirjoita: kopiot = main ja säännöt kunnossa (tilinvaihto-valmis.mjs)
  --tyopuu  lähde tämän checkoutin tiedostoista eikä origin/mainista (vain testaukseen ennen mergeä)
  --taulu <kansio>  työkansio (oletus /Users/Shared/Claude/Matkakirja-fable/scratchpad/asemataulu); --osoitekirja <polku> testeille
  python3 -I TAULU/asemataulu.py --kierros   # synkka.py ajaa joka A-kierroksella: koodi ja ohje mainista, nykyinen.json
                                             # osoitekirjasta; hiljainen, kun mikään ei muutu (speksi luku 2, KIERROS)

Rakennus: 1) KOODI (taulukko KOODI alla) kopioidaan origin/mainista työkansioon; eroava vanha kopio siirtyy ensin kansioon
_ennen-repoa/<aika>/ (ei poisteta). Työkansion koodia ei muokata käsin: muutos = docs-PR tools/asemataulu/:iin + tämä komento.
2) TILA (data/talo/*.json, osoitteet.md) luodaan repon siemenestä vain, jos se puuttuu; olemassa olevaan ei kosketa.
3) nykyinen.json: tämän tilin taulun osoite ja roolien id:t osoitekirjasta (ohjeissa ei ole id:itä eikä osoitteita).
4) Tarkistin (tarkista-junat.py) kaikille säännöille. 5) vienti/uusi-taulu-batch.json: koko kokoelma talo uudelle taululle.
Paluukoodi 0 = valmis, 1 = puutteita (tulostetaan rivit PUUTE|… ja VIRHE: …).
"""
import argparse
import datetime
import importlib.util
import json
import os
import re
import shutil
import subprocess
import sys

TAMA = os.path.dirname(os.path.abspath(__file__))
FABLE = "/Users/Shared/Claude/Matkakirja-fable"
# Repossa (tools/asemataulu/) lähde on tämä checkout; työkansion kopiossa lähde luetaan nykyinen.json:n kentästä lahde
# (komento kirjoittaa sen), oletuksena PT:n checkout.
REPO = os.path.dirname(os.path.dirname(TAMA)) if os.path.basename(os.path.dirname(TAMA)) == "tools" else FABLE
OSOITEKIRJA = "/Users/Shared/Claude/osoitekirja.md"
OLETUS_TAULU = "/Users/Shared/Claude/Matkakirja-fable/scratchpad/asemataulu"
OHJE = "ASEMATAULU-ROOLI.md"
# repon polku (tools/asemataulu/…) → työkansion polku. KAIKKI tools/asemataulu/:n koodi ja ohje (paitsi data/ ja osoitteet.md,
# jotka ovat siemen) on tässä; tests/asemataulu-komento.test.mjs valvoo, ettei uusi tiedosto jää pois (tyolistavahti.py jäi 20.10.).
KOODI = [
    ("asemataulu.html", "asemataulu-julkaisu.html"),
    ("asemataulu.py", "asemataulu.py"),
    (OHJE, OHJE),
    ("tyolistavahti.py", "tyolistavahti.py"),
    ("paivita.py", "paivita.py"),
    ("kone.py", "kone.py"),
    ("laitteet.py", "laitteet.py"),
    ("synkka.py", "synkka.py"),
    ("syke.py", "syke.py"),
    ("elevenlabs.py", "elevenlabs.py"),
    ("tarkista-junat.py", "tarkista-junat.py"),
    ("hoitaja/kierros.py", "hoitaja/kierros.py"),
]
SIEMEN = ["osoitteet.md"]  # + data/talo/*.json repon siemenkansiosta
# Poistetut dokumentit (omistaja 20.10.2026 klo 23.32–23.48): Sinulle-osio, Kulutus ja käsin kirjoitettu tehtavat. Niitä ei viedä uudelle taululle.
POISTETUT = {"viestit", "kulutus", "tehtavat"}
ROOLIT_NYKYINEN = {"paatoimittaja": "PÄÄTOIMITTAJA", "keskustelukanava": "KESKUSTELUKANAVA",
                   "asemataulu": "Asemataulu", "postivahti": "Postivahti", "julkaisija": "Julkaisija",
                   "natiiviseppa": "Natiiviseppä"}
URL_RE = re.compile(r"https://claude\.ai/artifact/[A-Za-z0-9]+")
ID_RE = re.compile(r"local_[0-9a-f]{8}-[0-9a-f-]{27}")


def git(*args):
    return subprocess.run(["git", "-C", REPO] + list(args), capture_output=True, timeout=60)


def lahde(polku, tyopuu):
    """Repon tiedoston sisältö (bytes) origin/mainista tai työpuusta; None jos puuttuu."""
    if tyopuu:
        p = os.path.join(REPO, polku)
        return open(p, "rb").read() if os.path.exists(p) else None
    r = git("show", "origin/main:" + polku)
    return r.stdout if r.returncode == 0 else None


def kirjoita(polku, sisalto):
    os.makedirs(os.path.dirname(polku), exist_ok=True)
    tmp = polku + ".tmp"
    with open(tmp, "wb") as f:
        f.write(sisalto)
    os.replace(tmp, polku)


def lue_json(polku):
    try:
        with open(polku, encoding="utf-8") as f:
            return json.load(f)
    except (OSError, ValueError):
        return None


def nykyinen(taulu, puutteet, osoitekirja=OSOITEKIRJA):
    """Tämän tilin taulun osoite ja roolien id:t osoitekirjasta; osoitteet.md:n KÄYTÖSSÄ-rivin pitää täsmätä."""
    ok = open(osoitekirja, encoding="utf-8").read() if os.path.exists(osoitekirja) else ""
    if not ok:
        puutteet.append("osoitekirja puuttuu: " + osoitekirja)
    idt = {}
    for r in ok.split("\n"):
        solut = [x.strip() for x in r.split("|")]
        if len(solut) > 2 and ID_RE.search(solut[2]):
            for avain, nimi in ROOLIT_NYKYINEN.items():
                if solut[1].split(" (")[0] == nimi:
                    idt[avain] = ID_RE.search(solut[2]).group(0)
    for avain in ROOLIT_NYKYINEN:
        if avain not in idt:
            puutteet.append("osoitekirjasta puuttuu rooli %s" % ROOLIT_NYKYINEN[avain])
    m = re.search(r"^Asemataulu \(tämän tilin taulu\):\s*(\S+)", ok, re.M)
    url = m.group(1) if m and URL_RE.match(m.group(1)) else None
    if not url:
        puutteet.append("osoitekirjasta puuttuu rivi 'Asemataulu (tämän tilin taulu): <osoite>' (uusi tili: julkaise ensin, ks. SEURAAVAKSI)")
    kaytossa = []
    op = os.path.join(taulu, "osoitteet.md")
    if os.path.exists(op):
        for r in open(op, encoding="utf-8"):
            if r.startswith("|") and "KÄYTÖSSÄ" in r and URL_RE.search(r):
                kaytossa.append(URL_RE.search(r).group(0))
    if len(kaytossa) != 1:
        puutteet.append("osoitteet.md: KÄYTÖSSÄ-merkintä pitää olla täsmälleen yhdellä tilirivillä (nyt %d)" % len(kaytossa))
    elif url and kaytossa[0] != url:
        puutteet.append("osoitteet.md:n KÄYTÖSSÄ-rivi %s ≠ osoitekirjan taulu %s" % (kaytossa[0], url))
    return {"taulu": url, "idt": idt, "paivitetty": datetime.datetime.now().astimezone().isoformat(timespec="minutes")}


def tarkistin(taulu, puutteet):
    sp = importlib.util.spec_from_file_location("tarkista_junat", os.path.join(os.path.dirname(os.path.abspath(__file__)), "tarkista-junat.py"))
    t = importlib.util.module_from_spec(sp)
    sp.loader.exec_module(t)
    data = os.path.join(taulu, "data", "talo")
    virheet, varoitukset = [], []
    junat, et = lue_json(os.path.join(data, "junat.json")), lue_json(os.path.join(data, "eteneminen.json"))
    if junat is None:
        puutteet.append("data/talo/junat.json puuttuu tai on rikki")
    else:
        v, w = t.tarkista(junat, et)
        virheet += v
        varoitukset += w
    tl = lue_json(os.path.join(data, "tyolista.json"))
    if tl is not None:
        virheet += t.tarkista_tyolista(tl)[0]
    roolit = lue_json(os.path.join(taulu, "hoitaja", "roolit.json"))  # Asemataulu-session kokoama, viety versio
    if roolit is not None:
        virheet += t.tarkista_roolit(roolit, lue_json(os.path.join(taulu, "hoitaja", "odottaa.json")))[0]
    for v in virheet:
        print("VIRHE: " + v)
    print("TARKISTIN|%d virhettä|%d varoitusta" % (len(virheet), len(varoitukset)))
    if virheet:
        puutteet.append("tarkistin: %d virhettä (VIRHE-rivit yllä); kirjoittaja korjaa ennen vientiä" % len(virheet))


def lahde_tieto(tyopuu):
    """Mistä työkansion --kierros hakee koodin: työpuu (testit) tai checkoutin pääkansio (worktree voidaan poistaa mergen jälkeen)."""
    if tyopuu:
        return {"repo": REPO, "tyopuu": True}
    r = git("rev-parse", "--path-format=absolute", "--git-common-dir")
    yhteinen = r.stdout.decode().strip() if r.returncode == 0 else ""
    return {"repo": os.path.dirname(yhteinen) if yhteinen.endswith("/.git") else REPO, "tyopuu": False}


def kierros_nykyinen(taulu, puutteet, a):
    """--kierros: nykyinen.json kirjoitetaan vain, kun taulun osoite tai id:t muuttuivat ja osoitekirja on ehjä (puutteellinen
    osoitekirja ei koskaan korvaa toimivaa tiedostoa). Hiljainen, kun mikään ei muutu."""
    polku = os.path.join(taulu, "nykyinen.json")
    vanha = lue_json(polku) or {}
    omat = []
    ny = nykyinen(taulu, omat, a.osoitekirja)
    ny["lahde"] = vanha.get("lahde") or lahde_tieto(a.tyopuu)
    if omat:
        puutteet += omat
    elif (ny["taulu"], ny["idt"]) != (vanha.get("taulu"), vanha.get("idt")):
        kirjoita(polku, json.dumps(ny, ensure_ascii=False, indent=1).encode("utf-8"))
        muuttui = sorted(k for k in set(ny["idt"]) | set(vanha.get("idt") or {}) if ny["idt"].get(k) != (vanha.get("idt") or {}).get(k))
        print("NYKYINEN MUUTTUI|%s|lue %s uudelleen" % (", ".join((["taulu"] if ny["taulu"] != vanha.get("taulu") else []) + muuttui), polku))
    for p in puutteet:
        print("PUUTE|" + p)
    return 1 if puutteet else 0


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--tarkista", action="store_true")
    ap.add_argument("--tyopuu", action="store_true")
    ap.add_argument("--taulu", help="työkansio (oletus %s; työkansion kopiossa se itse)" % OLETUS_TAULU)
    ap.add_argument("--osoitekirja", default=OSOITEKIRJA)
    ap.add_argument("--kierros", action="store_true", help="A-kierroksen päivitys (synkka.py): koodi ja nykyinen.json, ei siemeniä eikä batchia")
    ap.add_argument("--repo", help="lähdecheckout (oletus: tämä checkout, työkansiossa nykyinen.json:n lahde)")
    a = ap.parse_args()
    repossa = os.path.basename(os.path.dirname(TAMA)) == "tools"
    taulu = os.path.abspath(a.taulu or (OLETUS_TAULU if repossa else TAMA))
    global REPO
    if a.kierros:
        aiempi = (lue_json(os.path.join(taulu, "nykyinen.json")) or {}).get("lahde") or {}
        if not a.repo and aiempi.get("repo") and os.path.isdir(aiempi["repo"]):
            REPO = aiempi["repo"]
            a.tyopuu = a.tyopuu or bool(aiempi.get("tyopuu"))
    if a.repo:
        REPO = os.path.abspath(a.repo)
    puutteet = []
    if not a.tyopuu and git("fetch", "-q", "origin", "main").returncode != 0:
        puutteet.append("git fetch origin main epäonnistui; kopiot verrataan viimeksi haettuun mainiin")
    aika = datetime.datetime.now().strftime("%Y%m%d-%H%M%S")

    for repo_p, taulu_p in KOODI:
        uusi = lahde("tools/asemataulu/" + repo_p, a.tyopuu)
        kohde = os.path.join(taulu, taulu_p)
        if uusi is None:
            puutteet.append("repossa ei ole tools/asemataulu/%s" % repo_p)
            continue
        vanha = open(kohde, "rb").read() if os.path.exists(kohde) else None
        if vanha == uusi:
            continue
        if a.tarkista:
            puutteet.append("%s eroaa mainista (aja asemataulu.py ilman --tarkista)" % taulu_p if vanha is not None else "%s puuttuu" % taulu_p)
            continue
        if vanha is not None:
            talteen = os.path.join(taulu, "_ennen-repoa", aika, taulu_p)
            os.makedirs(os.path.dirname(talteen), exist_ok=True)
            shutil.copy2(kohde, talteen)
        kirjoita(kohde, uusi)
        print("PÄIVITETTY|%s%s" % (taulu_p, "" if vanha is None else " (vanha: _ennen-repoa/%s/)" % aika))
        if a.kierros and taulu_p == OHJE:
            print("OHJE PÄIVITETTY|%s|lue %s uudelleen ennen seuraavaa kierrosta" % (OHJE, kohde))

    if a.kierros:
        return kierros_nykyinen(taulu, puutteet, a)

    if not a.tarkista:
        siemenet = [(s, s) for s in SIEMEN]
        r = git("ls-tree", "--name-only", "HEAD" if a.tyopuu else "origin/main", "tools/asemataulu/data/talo/")
        siemenet += [(p[len("tools/asemataulu/"):], p[len("tools/asemataulu/"):]) for p in r.stdout.decode().split()]
        for repo_p, taulu_p in siemenet:
            kohde = os.path.join(taulu, taulu_p)
            if os.path.exists(kohde):
                continue
            uusi = lahde("tools/asemataulu/" + repo_p, a.tyopuu)
            if uusi is not None:
                kirjoita(kohde, uusi)
                print("LUOTU SIEMENESTÄ|%s" % taulu_p)

    ny = nykyinen(taulu, puutteet, a.osoitekirja)
    ny["lahde"] = lahde_tieto(a.tyopuu)
    if not a.tarkista:
        kirjoita(os.path.join(taulu, "nykyinen.json"), json.dumps(ny, ensure_ascii=False, indent=1).encode("utf-8"))
        print("NYKYINEN|taulu %s|id:t %s" % (ny["taulu"] or "-", ", ".join(sorted(ny["idt"]))))
    tarkistin(taulu, puutteet)

    if not a.tarkista:
        data = os.path.join(taulu, "data", "talo")
        writes = [{"op": "set", "collection": "talo", "doc_id": n[:-5], "file_path": os.path.join(data, n)}
                  for n in sorted(os.listdir(data)) if n.endswith(".json") and n[:-5] not in POISTETUT] if os.path.isdir(data) else []
        bp = os.path.join(taulu, "vienti", "uusi-taulu-batch.json")
        kirjoita(bp, json.dumps(writes, ensure_ascii=False, indent=1).encode("utf-8"))
        print("SEURAAVAKSI (vain uusi tai tyhjä taulu; käynnissä olevan taulun vienti jatkuu synkka.py:llä):")
        print("  1. Artifact publish %s (capabilities {\"comments\": {}, \"db\": {}}, icon dashboard) %s" % (
            os.path.join(taulu, "asemataulu-julkaisu.html"),
            "osoitteeseen " + ny["taulu"] if ny["taulu"] else "uutena; kirjaa osoite osoitekirjaan ja osoitteet.md:hen (KÄYTÖSSÄ) ja aja tämä komento uudelleen"))
        print("  2. ArtifactData batch, writes = %s (%d dokumenttia)" % (bp, len(writes)))
        print("  3. Asemataulu-sessio lukee ASEMATAULU-ROOLI.md:n ja nykyinen.json:n ja luo cronin A (*/5; kulutus- ja B-cronia ei ole)")

    for p in puutteet:
        print("PUUTE|" + p)
    print("ASEMATAULU %s" % ("EI VALMIS: %d puutetta" % len(puutteet) if puutteet else "VALMIS"))
    return 1 if puutteet else 0


if __name__ == "__main__":
    sys.exit(main())
