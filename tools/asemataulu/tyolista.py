#!/usr/bin/env python3
"""Asemataulun työlistan suositeltu kirjoituskomento Päätoimittajalle (omistaja 2.11.2026: "miten tuon työlistankin
saisi jatkossa päivittymään automaattisesti?"): yksi komento kirjaa työlistariville uuden tilanteen ja halutessa samalla
junan Työn alla / Valmiina -kohdan (juna.py), joten kumpaakaan ei jää kirjaamatta.

Käyttö (python3 -I, vain stdlib):
  python3 -I tools/asemataulu/tyolista.py [--kansio <data/talo>] [--tiedosto <tyolista.json>] lisaa "OTSIKKO" --teksti "…" [--lisa "…"] [--tilanne "…"]
  python3 -I tools/asemataulu/tyolista.py … tilanne "OTSIKKO" "teksti" [--edistys N] [--juna N]
  python3 -I tools/asemataulu/tyolista.py … valmis  "OTSIKKO" "teksti" [--juna N [--juna-kohta "osa Työn alla -kohdasta"]]

- lisaa: uusi rivi alkuun (tila "työn alla", edistys 1).
- tilanne: lisää tilanteen eteen "pp.kk. hh.mmx: teksti", vanha tilanne siirtyy kohtaan "Aiempi: …" ,
  päivittää rivin ts:n ja poistaa rivin vahti-kentän. --juna N lisää saman tekstin junan N Työn alle (juna.py lisaa).
- valmis: tila valmis, edistys 5, valmistui = tänään. --juna N siirtää junan N Työn alla -kohdan Valmiinaan (juna.py valmis;
  kohta haetaan tekstillä tai --juna-kohta-osalla).
JONO (omistaja 10.11.2026 klo 07.40, "työlista jonona"): rivillä tekija (rooli, esim. NS) ja jarj (paikka roolin jonossa,
pienin ensin; omistajan vikahavainnot 0). Kullakin tekijällä enintään yksi "työn alla"; muut "jonossa" tai "odottaa" (+ este).
  … lisaa "OTSIKKO" --teksti "…" --tekija NS [--jarj N] [--karki K] [--nyt]   (--nyt = ohi jonon: nykyinen työ jonon kärkeen)
  … jono "OTSIKKO" [--tekija X] [--jarj N] [--karki K] [--tila jonossa|odottaa|myöhemmin] [--este "syy"]
  … tehty "OTSIKKO" "teksti"   (rooli: tila "tehty" = odottaa PT:n kuittausta; roolin seuraava jonossa-rivi työn alle)
  … este  "OTSIKKO" "syy"      (tila "odottaa", este = syy; roolin seuraava jonossa-rivi työn alle)
  … seuraava [TEKIJA]          (tulostaa roolittain: nyt, seuraavat 2; ei kirjoita)
- valmis vapauttaa myös roolin: jos rivi oli työn alla, seuraava jonossa-rivi nousee työn alle.
- OTSIKKO löytyy tarkasti tai yksikäsitteisellä osamerkkijonolla (isoilla/pienillä ei väliä); muuten virhe ja ehdokkaat.
Junavaihe ajetaan ensin: jos juna.py hylkää, työlistaan ei kirjoiteta mitään. Ylätason ts päivitetään nykyhetkeen.
Tallennus: .tmp + os.replace + copymode, tarkistus ennen tallennusta. Paluukoodi 0 = ok, 1 = hylätty, 2 = käyttövirhe.
"""
import argparse
import importlib.util
import json
import os
import re
import shutil
import sys
import time

OLETUS_KANSIOT = ("scratchpad/asemataulu/data/talo", "/Users/Shared/Claude/Matkakirja-fable/scratchpad/asemataulu/data/talo")
AIEMPI = "\n\nAiempi: "


class Virhe(Exception):
    pass


def avain(s):
    return re.sub(r"\s+", " ", str(s).casefold()).strip()


def aikaleima(nyt_s):
    """'pp.kk. hh.mmx' (minuuttien kymmenet, kuten taulun muut kellonajat)."""
    t = time.localtime(nyt_s)
    return "%d.%d. %02d.%dx" % (t.tm_mday, t.tm_mon, t.tm_hour, t.tm_min // 10)


def paiva(nyt_s):
    t = time.localtime(nyt_s)
    return "%d.%d." % (t.tm_mday, t.tm_mon)


def etsi_kansio(arg):
    if arg:
        return arg
    for k in OLETUS_KANSIOT:
        if os.path.isdir(k):
            return k
    return OLETUS_KANSIOT[0]


def lue(polku):
    try:
        with open(polku, encoding="utf-8") as f:
            return json.load(f)
    except (OSError, ValueError) as e:
        raise Virhe("%s ei luettavissa: %s" % (polku, e))


def kirjoita(polku, data):
    tmp = polku + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=1)
        f.write("\n")
    if os.path.exists(polku):
        shutil.copymode(polku, tmp)
    os.replace(tmp, polku)


def tarkista(tl):
    """Rakenne: rivit-lista, jokaisella otsikko, edistys 0-5, tila-merkkijono, ts luku."""
    virheet = []
    if not isinstance(tl, dict) or not isinstance(tl.get("rivit"), list):
        return ["tyolista.json: 'rivit'-lista puuttuu"]
    for i, r in enumerate(tl["rivit"]):
        if not isinstance(r, dict) or not str(r.get("otsikko", "")).strip():
            virheet.append("rivi %d: otsikko puuttuu" % i)
            continue
        ed = r.get("edistys")
        if ed is not None and (isinstance(ed, bool) or not isinstance(ed, (int, float)) or not 0 <= ed <= 5):
            virheet.append("%s: edistys pitää olla 0–5" % r["otsikko"][:50])
        if not isinstance(r.get("tila", ""), str):
            virheet.append("%s: tila pitää olla teksti" % r["otsikko"][:50])
        if r.get("jarj") is not None and (isinstance(r.get("jarj"), bool) or not isinstance(r.get("jarj"), (int, float))):
            virheet.append("%s: jarj pitää olla luku" % r["otsikko"][:50])
    tyossa = {}
    for r in tl["rivit"]:
        if isinstance(r, dict) and r.get("tekija") and str(r.get("tila", "")) == "työn alla":
            tyossa.setdefault(str(r["tekija"]), []).append(str(r.get("otsikko", ""))[:40])
    for t, o in sorted(tyossa.items()):
        if len(o) > 1:
            virheet.append("tekijällä %s on %d työn alla -riviä (enintään 1): %s" % (t, len(o), " | ".join(o)))
    return virheet


def jarj_avain(r):
    j = r.get("jarj")
    return (j if isinstance(j, (int, float)) and not isinstance(j, bool) else 9999, -(r.get("ts") or 0))


def seuraava_tyon_alle(tl, tekija, nyt):
    """Nostaa tekijän pienimmän jarj:n jonossa-rivin työn alle (jos tekijällä ei jo ole). Palauttaa rivin tai None."""
    if not tekija:
        return None
    rivit = [r for r in tl["rivit"] if isinstance(r, dict) and r.get("tekija") == tekija]
    if any(str(r.get("tila", "")) == "työn alla" for r in rivit):
        return None
    jono = sorted((r for r in rivit if str(r.get("tila", "")) == "jonossa"), key=jarj_avain)
    if not jono:
        return None
    jono[0]["tila"] = "työn alla"
    jono[0]["ts"] = nyt
    jono[0].pop("vahti", None)
    return jono[0]


def tulosta_jonot(tl, tekija=None):
    tekijat = sorted({str(r["tekija"]) for r in tl["rivit"] if isinstance(r, dict) and r.get("tekija")})
    for t in tekijat:
        if tekija and avain(t) != avain(tekija):
            continue
        rivit = [r for r in tl["rivit"] if isinstance(r, dict) and r.get("tekija") == t]
        nyt = [r for r in rivit if str(r.get("tila", "")) == "työn alla"]
        jono = sorted((r for r in rivit if str(r.get("tila", "")) == "jonossa"), key=jarj_avain)
        odottaa = [r for r in rivit if str(r.get("tila", "")) in ("odottaa", "tehty")]
        print("%s: NYT %s" % (t, nyt[0]["otsikko"][:70] if nyt else "– (ei työtä)"))
        for r in jono[:2]:
            print("    seuraava [%s] %s" % (r.get("jarj", "?"), r["otsikko"][:70]))
        for r in odottaa[:3]:
            print("    %s: %s%s" % (r.get("tila"), r["otsikko"][:60], (" (" + str(r.get("este"))[:50] + ")") if r.get("este") else ""))


def etsi_rivi(tl, haku):
    rivit = [r for r in tl["rivit"] if isinstance(r, dict)]
    h = avain(haku)
    if not h:
        raise Virhe("otsikko puuttuu")
    tarkat = [r for r in rivit if avain(r.get("otsikko", "")) == h]
    if len(tarkat) == 1:
        return tarkat[0]
    osumat = tarkat or [r for r in rivit if h in avain(r.get("otsikko", ""))]
    if len(osumat) == 1:
        return osumat[0]
    if not osumat:
        osumat = [r for r in rivit if not str(r.get("tila", "")).lower().startswith("valmis")]
        raise Virhe("otsikkoa '%s' ei löydy. Työn alla olevat:%s" % (haku, "".join("\n  – " + str(r.get("otsikko"))[:80] for r in osumat[:15])))
    raise Virhe("otsikko '%s' ei ole yksikäsitteinen, ehdokkaat:%s" % (haku, "".join("\n  – " + str(r.get("otsikko"))[:80] for r in osumat[:15])))


def uusi_tilanne(rivi, teksti, nyt_s):
    teksti = " ".join(str(teksti).split()) if "\n" not in str(teksti) else str(teksti).strip()
    if not teksti:
        raise Virhe("tilanneteksti on tyhjä")
    uusi = "%s: %s" % (aikaleima(nyt_s), teksti)
    vanha = str(rivi.get("tilanne") or "").strip()
    if not vanha:
        return uusi
    return uusi + AIEMPI + vanha  # koko historia säilyy (Asemataulun tapa)


def lataa_juna():
    polku = os.path.join(os.path.dirname(os.path.abspath(__file__)), "juna.py")
    spec = importlib.util.spec_from_file_location("juna_komento", polku)
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    return m


def junavaihe(komento, juna, teksti, kansio):
    """Ajaa juna.py:n lisaa/valmis samassa prosessissa; Virhe, jos juna.py hylkää."""
    j = lataa_juna()
    try:
        with open(os.path.join(kansio, "junat.json"), encoding="utf-8") as f:
            nimet = [str(r.get("nimi", "")) for r in json.load(f).get("rivit", [])]
    except (OSError, ValueError):
        nimet = []
    if "Juna %s" % juna not in nimet:
        raise Virhe("junaa %s ei ole junat.json:ssa (uusi juna: juna.py lisaa suoraan); työlistaan ei kirjoitettu" % juna)
    ns = argparse.Namespace(kansio=kansio, komento=komento, juna=juna, teksti=teksti)
    try:
        j.toiminta(ns)
    except j.Virhe as e:
        raise Virhe("junavaihe hylätty (työlistaan ei kirjoitettu): %s" % e)


def toiminta(args):
    kansio = etsi_kansio(args.kansio) if not args.tiedosto or args.kansio else os.path.dirname(os.path.abspath(args.tiedosto))
    polku = args.tiedosto or os.path.join(kansio, "tyolista.json")
    tl = lue(polku)
    if tarkista(tl):
        raise Virhe("tiedosto on jo virheellinen, korjaa ensin:\n" + "\n".join("  VIRHE: " + v for v in tarkista(tl)))
    nyt_s = time.time()
    nyt = int(nyt_s * 1000)

    if args.komento == "seuraava":
        tulosta_jonot(tl, args.tekija)
        return 0
    if args.komento == "lisaa":
        otsikko = " ".join(args.otsikko.split())
        if any(avain(r.get("otsikko", "")) == avain(otsikko) and not str(r.get("tila", "")).lower().startswith("valmis")
               for r in tl["rivit"] if isinstance(r, dict)):
            raise Virhe("rivi '%s' on jo työlistalla; käytä komentoa tilanne" % otsikko)
        rivi = {"otsikko": otsikko, "teksti": args.teksti.strip(), "lisa": args.lisa or "", "edistys": 1, "tila": "työn alla"}
        if args.tekija:
            rivi["tekija"] = args.tekija
            if args.karki:
                rivi["karki"] = args.karki
            tyossa = [r for r in tl["rivit"] if isinstance(r, dict) and r.get("tekija") == args.tekija and str(r.get("tila", "")) == "työn alla"]
            if args.nyt:
                for r in tyossa:
                    r["tila"] = "jonossa"
                    r["jarj"] = 0
                rivi["jarj"] = args.jarj if args.jarj is not None else 0
            else:
                rivi["jarj"] = args.jarj if args.jarj is not None else 100
                if tyossa:
                    rivi["tila"] = "jonossa"
        if args.tilanne:
            rivi["tilanne"] = "%s: %s" % (aikaleima(nyt_s), " ".join(args.tilanne.split()))
        rivi["ts"] = nyt
        tl["rivit"].insert(0, rivi)
        nimi = otsikko
    else:
        rivi = etsi_rivi(tl, args.otsikko)
        nimi = rivi["otsikko"]
        if args.komento == "tilanne":
            if args.edistys is not None and not 0 <= args.edistys <= 4:
                raise Virhe("--edistys 0–4 (5 = valmis, käytä komentoa valmis)")
            if args.juna is not None:
                junavaihe("lisaa", args.juna, args.teksti, kansio)
            rivi["tilanne"] = uusi_tilanne(rivi, args.teksti, nyt_s)
            if args.edistys is not None:
                rivi["edistys"] = args.edistys
            if str(rivi.get("tila", "")).lower().startswith(("pidossa", "odottaa")):
                muu = rivi.get("tekija") and any(r is not rivi and r.get("tekija") == rivi.get("tekija") and str(r.get("tila", "")) == "työn alla"
                                                  for r in tl["rivit"] if isinstance(r, dict))
                rivi["tila"] = "jonossa" if muu else "työn alla"
                rivi.pop("este", None)
        elif args.komento in ("tehty", "este"):
            oli_tyossa = str(rivi.get("tila", "")) == "työn alla"
            rivi["tilanne"] = uusi_tilanne(rivi, args.teksti, nyt_s)
            if args.komento == "tehty":
                rivi["tila"] = "tehty"
                rivi["edistys"] = 4
            else:
                rivi["tila"] = "odottaa"
                rivi["este"] = " ".join(args.teksti.split())[:200]
            if oli_tyossa:
                seur = seuraava_tyon_alle(tl, rivi.get("tekija"), nyt)
                if seur:
                    print("SEURAAVA %s: %s" % (rivi.get("tekija"), seur["otsikko"]))
        elif args.komento == "jono":
            if args.tekija is not None:
                rivi["tekija"] = args.tekija
            if args.jarj is not None:
                rivi["jarj"] = args.jarj
            if args.karki is not None:
                rivi["karki"] = args.karki
            if args.este is not None:
                rivi["este"] = args.este
            if args.tila is not None:
                rivi["tila"] = args.tila
        else:  # valmis
            oli_tyossa = str(rivi.get("tila", "")) == "työn alla"
            if args.juna is not None:
                junavaihe("valmis", args.juna, args.juna_kohta or args.teksti, kansio)
            rivi["tilanne"] = uusi_tilanne(rivi, args.teksti, nyt_s)
            rivi["tila"] = "valmis"
            rivi["edistys"] = 5
            rivi["valmistui"] = paiva(nyt_s)
            rivi.pop("este", None)
            if oli_tyossa:
                seur = seuraava_tyon_alle(tl, rivi.get("tekija"), nyt)
                if seur:
                    print("SEURAAVA %s: %s" % (rivi.get("tekija"), seur["otsikko"]))
        rivi.pop("vahti", None)
        rivi["ts"] = nyt
    tl["ts"] = nyt

    virheet = tarkista(tl)
    if virheet:
        raise Virhe("tarkistin hylkäsi muutoksen, mitään ei tallennettu:\n" + "\n".join("  VIRHE: " + v for v in virheet))
    kirjoita(polku, tl)
    print("%s: ok (%s)" % (nimi[:60], args.komento))
    return 0


def main(argv):
    ap = argparse.ArgumentParser(prog="tyolista.py", description=__doc__.split("\n")[0])
    ap.add_argument("--kansio", help="data/talo-kansio (oletus scratchpad/asemataulu/data/talo)")
    ap.add_argument("--tiedosto", help="tyolista.json-polku (oletus <kansio>/tyolista.json; testit)")
    sub = ap.add_subparsers(dest="komento", required=True)
    s = sub.add_parser("lisaa")
    s.add_argument("otsikko")
    s.add_argument("--teksti", required=True)
    s.add_argument("--lisa")
    s.add_argument("--tilanne")
    s.add_argument("--tekija")
    s.add_argument("--jarj", type=int)
    s.add_argument("--karki")
    s.add_argument("--nyt", action="store_true")
    s = sub.add_parser("jono")
    s.add_argument("otsikko")
    s.add_argument("--tekija")
    s.add_argument("--jarj", type=int)
    s.add_argument("--karki")
    s.add_argument("--este")
    s.add_argument("--tila", choices=("työn alla", "jonossa", "odottaa", "tehty", "myöhemmin"))
    s = sub.add_parser("tehty")
    s.add_argument("otsikko")
    s.add_argument("teksti")
    s = sub.add_parser("este")
    s.add_argument("otsikko")
    s.add_argument("teksti")
    s = sub.add_parser("seuraava")
    s.add_argument("tekija", nargs="?")
    s = sub.add_parser("tilanne")
    s.add_argument("otsikko")
    s.add_argument("teksti")
    s.add_argument("--edistys", type=int)
    s.add_argument("--juna", type=int)
    s = sub.add_parser("valmis")
    s.add_argument("otsikko")
    s.add_argument("teksti")
    s.add_argument("--juna", type=int)
    s.add_argument("--juna-kohta", dest="juna_kohta")
    for sp in sub.choices.values():
        sp.add_argument("--kansio", default=argparse.SUPPRESS)
        sp.add_argument("--tiedosto", default=argparse.SUPPRESS)
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
