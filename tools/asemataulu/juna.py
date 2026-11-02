#!/usr/bin/env python3
"""Asemataulun junarivien ainoa kirjoituskomento (omistaja 2.11.2026): junarivi kirjoitetaan VAIN tällä, ei käsin.

Käyttö (python3 -I, vain stdlib):
  python3 -I tools/asemataulu/juna.py [--kansio <data/talo>] lisaa   --juna N "teksti"        # Työn alle
  python3 -I tools/asemataulu/juna.py [--kansio <data/talo>] valmis  --juna N "teksti tai osa" # Työn alla -> Valmiina
  python3 -I tools/asemataulu/juna.py [--kansio <data/talo>] lukitse --juna N                  # vain Valmiina jää
  python3 -I tools/asemataulu/juna.py [--kansio <data/talo>] tf      --juna N --aika HH.MM     # TF-rivi

Komento muotoilee rivin speksin mukaan (docs/moduulit/asemataulu.md luku 4), poistaa kohdista päivämäärät ja kellonajat,
päivittää rivin ja ylätason ts:n, ajaa tarkistimen (tarkista-junat.py) ENNEN tallennusta ja hylkää muutoksen virheiden vuoksi.
Tallennus: .tmp + os.replace + copymode. Paluukoodi 0 = ok, 1 = hylätty, 2 = käyttövirhe.
"""
import argparse
import importlib.util
import json
import os
import re
import shutil
import sys
import time
from datetime import datetime

OLETUS_KANSIOT = ("scratchpad/asemataulu/data/talo", "/Users/Shared/Claude/Matkakirja-fable/scratchpad/asemataulu/data/talo")
OSIOT = ("työn alla", "valmiina")
DASH = "–"


def lataa_tarkistin():
    polku = os.path.join(os.path.dirname(os.path.abspath(__file__)), "tarkista-junat.py")
    spec = importlib.util.spec_from_file_location("tarkista_junat", polku)
    moduuli = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(moduuli)
    return moduuli


class Virhe(Exception):
    pass


def puhdista(teksti):
    """Poistaa päivämäärät, kellonajat ja klo-sanan sekä alkuviivan; yksi rivi."""
    t = " ".join(str(teksti).split())
    t = t.lstrip("–-• ")
    t = re.sub(r"\b\d{1,2}\.\d{1,2}\.(?:\d{4})?", "", t)
    t = re.sub(r"(?:\bklo\s*)?\b\d{1,2}\.\d[\dx]\b", "", t, flags=re.I)
    t = re.sub(r"\bklo\b", "", t, flags=re.I)
    t = re.sub(r"\s+([,;:.)])", r"\1", t)
    t = re.sub(r"\(\s*\)", "", t)
    t = re.sub(r"\s+", " ", t).strip()
    t = re.sub(r"^[\s:;,\-–]+", "", t).strip()
    if not t:
        raise Virhe("kohta jäi tyhjäksi aikojen poiston jälkeen")
    return t


def avain(k):
    return re.sub(r"\s+", " ", k.lower()).strip()


def jasenna(teksti):
    """teksti -> {"työn alla": [...], "valmiina": [...], "on": {osiot, jotka löytyivät}}"""
    tulos = {o: [] for o in OSIOT}
    on, nykyinen = set(), None
    for rivi in str(teksti).split("\n"):
        r = rivi.strip()
        if not r:
            continue
        if r.startswith(("–", "-", "•")):
            if nykyinen is None:
                raise Virhe("kohta ennen osion otsikkoa: %s" % r[:50])
            tulos[nykyinen].append(r.lstrip("–-• ").strip())
        elif r.endswith(":") and r[:-1].strip().lower() in OSIOT:
            nykyinen = r[:-1].strip().lower()
            on.add(nykyinen)
        else:
            raise Virhe("tuntematon rivi tekstissä (korjaa käsin ei, vaan poista rivi tai anna lisaa/valmis): %s" % r[:50])
    tulos["on"] = on
    return tulos


def muodosta(tyo, valmiina, lukittu):
    if lukittu:
        osat = ["Valmiina:"] + [DASH + " " + k for k in valmiina]
        return "\n".join(osat)
    osat = ["Työn alla:"] + [DASH + " " + k for k in tyo] + ["", "Valmiina:"] + [DASH + " " + k for k in valmiina]
    return "\n".join(osat)


def etsi_kansio(arg):
    if arg:
        return arg
    for k in OLETUS_KANSIOT:
        if os.path.isdir(k):
            return k
    return OLETUS_KANSIOT[0]


def lue(polku):
    with open(polku, encoding="utf-8") as f:
        return json.load(f)


def kirjoita(polku, data):
    tmp = polku + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=1)
        f.write("\n")
    if os.path.exists(polku):
        shutil.copymode(polku, tmp)
    os.replace(tmp, polku)


def toiminta(args):
    kansio = etsi_kansio(args.kansio)
    jp = os.path.join(kansio, "junat.json")
    ep = os.path.join(kansio, "eteneminen.json")
    try:
        junat = lue(jp) if os.path.exists(jp) else {"rivit": []}
    except (OSError, ValueError) as e:
        raise Virhe("%s ei luettavissa: %s" % (jp, e))
    et = lue(ep) if os.path.exists(ep) else None
    et_uusi = et
    rivit = junat.setdefault("rivit", [])
    nyt = int(time.time() * 1000)
    nimi = "Juna %d" % args.juna
    rivi = next((r for r in rivit if r.get("nimi") == nimi), None)
    tk = lataa_tarkistin()
    lukitut = {et.get("nimi")} if isinstance(et, dict) and et.get("jakso") == "matka" else set()

    if args.komento == "lisaa":
        uusi = puhdista(args.teksti)
        if rivi is None:
            rivi = {"nimi": nimi, "tila": "Työn alla", "edistys": 0, "teksti": "Työn alla:\n\nValmiina:"}
            rivit.append(rivi)
        if tk.junan_laji(rivi, lukitut) != "avoin":
            raise Virhe("%s on lukittu; Työn alle lisätään vain avoimeen junaan (seuraavan junan asia kuuluu seuraavalle riville)" % nimi)
        j = jasenna(rivi["teksti"])
        if avain(uusi) in {avain(k) for k in j["työn alla"] + j["valmiina"]}:
            print("%s: kohta on jo rivillä, ei muutosta: %s" % (nimi, uusi))
            return 0
        j["työn alla"].append(uusi)
        rivi["teksti"] = muodosta(j["työn alla"], j["valmiina"], False)
    elif args.komento == "valmis":
        if rivi is None:
            raise Virhe("%s-riviä ei ole" % nimi)
        if tk.junan_laji(rivi, lukitut) != "avoin":
            raise Virhe("%s on lukittu; siinä on vain Valmiina" % nimi)
        j = jasenna(rivi["teksti"])
        haku = avain(puhdista(args.teksti))
        osumat = [k for k in j["työn alla"] if haku in avain(k)]
        tarkat = [k for k in osumat if avain(k) == haku]
        if len(tarkat) == 1:
            osumat = tarkat
        if len(osumat) != 1:
            raise Virhe("Työn alla -kohtia, joihin '%s' sopii: %d (pitää olla 1)%s" % (args.teksti, len(osumat), "".join("\n  – " + k[:80] for k in osumat)))
        kohta = osumat[0]
        j["työn alla"].remove(kohta)
        if avain(kohta) not in {avain(k) for k in j["valmiina"]}:
            j["valmiina"].append(kohta)
        rivi["teksti"] = muodosta(j["työn alla"], j["valmiina"], False)
    elif args.komento == "lukitse":
        if rivi is None:
            raise Virhe("%s-riviä ei ole" % nimi)
        j = jasenna(rivi["teksti"])
        if j["työn alla"]:
            raise Virhe("%s: Työn alla ei ole tyhjä (%d kohtaa); siirrä ne valmiiksi (valmis) tai poista ennen lukitusta" % (nimi, len(j["työn alla"])))
        rivi["tila"] = "Lukittu"
        rivi.setdefault("edistys", 0)
        rivi["teksti"] = muodosta([], j["valmiina"], True)
    elif args.komento == "tf":
        if rivi is None:
            raise Virhe("%s-riviä ei ole" % nimi)
        m = re.fullmatch(r"(\d{1,2})\.(\d{2})", args.aika or "")
        if not m:
            raise Virhe("--aika pitää olla muotoa HH.MM")
        j = jasenna(rivi["teksti"])
        if j["työn alla"]:
            raise Virhe("%s: Työn alla ei ole tyhjä; siirrä kohdat valmiiksi tai poista ennen TF-riviä" % nimi)
        aika = "%02d.%s" % (int(m.group(1)), m.group(2))
        pv = datetime.now()
        otsikko = "Uutta (%d.%d. klo %s; myös Macille):" % (pv.day, pv.month, aika)
        rivi["nimi"] = "TF %d" % args.juna
        rivi["tila"] = "Testaajilla (TestFlight sisäisillä %s)" % aika
        rivi["aika"] = aika
        rivi.pop("edistys", None)
        for k in ("valmis_arvio", "valmiit", "odottaa", "lisa"):
            rivi.pop(k, None)
        rivi["teksti"] = "\n".join([otsikko] + [DASH + " " + k for k in j["valmiina"]])
        if isinstance(et, dict) and et.get("nimi") == nimi:
            et_uusi = {"ts": nyt}
    rivi["ts"] = nyt
    junat["ts"] = nyt

    virheet, _ = tk.tarkista(junat, et_uusi)
    if virheet:
        raise Virhe("tarkistin hylkäsi muutoksen, mitään ei tallennettu:\n" + "\n".join("  VIRHE: " + v for v in virheet))
    kirjoita(jp, junat)
    if et_uusi is not et:
        kirjoita(ep, et_uusi)
    print("%s: ok (%s)" % (rivi["nimi"], args.komento))
    return 0


def main(argv):
    ap = argparse.ArgumentParser(prog="juna.py", description=__doc__.split("\n")[0])
    ap.add_argument("--kansio", help="data/talo-kansio (oletus scratchpad/asemataulu/data/talo)")
    sub = ap.add_subparsers(dest="komento", required=True)
    for nimi in ("lisaa", "valmis", "lukitse", "tf"):
        sp = sub.add_parser(nimi)
        sp.add_argument("--juna", type=int, required=True)
        if nimi in ("lisaa", "valmis"):
            sp.add_argument("teksti")
        if nimi == "tf":
            sp.add_argument("--aika", required=True)
        sp.add_argument("--kansio", dest="kansio", default=argparse.SUPPRESS)
    try:
        args = ap.parse_args(argv[1:])
    except SystemExit as e:
        return 2 if e.code else 0
    try:
        return toiminta(args)
    except Virhe as e:
        print("HYLÄTTY: %s" % e)
        return 1


if __name__ == "__main__":
    sys.exit(main(sys.argv))
