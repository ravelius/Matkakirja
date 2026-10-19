#!/usr/bin/env python3
"""Asemataulun junat-dokumentin muototarkistin (omistaja 18.10.2026, C5).

Käyttö: python3 -I tools/asemataulu/tarkista-junat.py [junat.json] [eteneminen.json]
Aja ennen jokaista vientiä. Paluukoodi 0 = ok, 1 = virheitä, 2 = tiedostoa ei voi lukea.
Ohje ja sallitut kentät: docs/moduulit/asemataulu.md, kohta "Asemataulun merkinnät".
"""
import json
import os
import re
import sys
from datetime import datetime

NIMI_MAX = 12  # "Juna 204" / "TF 204"
TILA_MAX = 80
NIMI_RE = re.compile(r"^(Juna|TF) (\d+)$")
KENTAT = {"nimi", "teksti", "tila", "edistys", "valmis_arvio", "aika", "lisa", "valmiit", "odottaa", "ts"}
PAKOLLISET = ("nimi", "teksti", "tila")
# Sama kuin asemataulu.html:n siruLuokka: nämä sanat tilassa tekevät junasta valmiin (ei valoja, ei lihavointia).
VALMIS_RE = re.compile(r"valmis|testflight|julkaistu", re.I)
# Sama kuin asemataulu.html:n OSIO_OTSIKKO-laajennus: rivi, joka on otsikko (ei luetelmakohta), päättyy kaksoispisteeseen.
OTSIKKO_RE = re.compile(r"^\s*([A-ZÅÄÖ][^:\n–\-]{0,40}):\s*$|^\s*(Työn alla|Valmiina|Korjatut|Uutta|Junassa\s+\d+)\b[^:\n]{0,60}:", re.I)
SALLITUT_JUNA = ("työn alla", "valmiina")
SALLITUT_TF = ("uutta",)


def otsikon_perus(rivi):
    m = re.match(r"^\s*([^:\n(]{1,60}?)\s*(?:\(.*?\))?\s*:", rivi)
    return m.group(1).strip().lower() if m else ""


def tarkista_rivi(r, i, nakyva, virheet, varoitukset):
    p = "rivi %d" % (i + 1)
    if not isinstance(r, dict):
        virheet.append("%s: ei objekti" % p)
        return
    nimi = r.get("nimi")
    if isinstance(nimi, str):
        p = "%s (%s)" % (p, nimi)
    for k in PAKOLLISET:
        if not isinstance(r.get(k), str) or not r.get(k).strip():
            virheet.append("%s: pakollinen kenttä '%s' puuttuu tai ei ole tekstiä" % (p, k))
    for k in r:
        if k not in KENTAT:
            virheet.append("%s: tuntematon kenttä '%s' (sallitut: %s)" % (p, k, ", ".join(sorted(KENTAT))))
    if not isinstance(nimi, str):
        return
    m = NIMI_RE.match(nimi)
    if not m or len(nimi) > NIMI_MAX:
        virheet.append("%s: nimi pitää olla lyhyt 'Juna N' tai 'TF N' (enintään %d merkkiä), selitys kuuluu kenttään teksti" % (p, NIMI_MAX))
        return
    on_juna = m.group(1) == "Juna"
    tila = r.get("tila") if isinstance(r.get("tila"), str) else ""
    if len(tila) > TILA_MAX:
        virheet.append("%s: tila yli %d merkkiä (%d); pitkä selitys kuuluu kenttään teksti" % (p, TILA_MAX, len(tila)))
    ed = r.get("edistys")
    if "edistys" in r and (isinstance(ed, bool) or not isinstance(ed, (int, float)) or not 0 <= ed <= 5):
        virheet.append("%s: edistys pitää olla luku 0–5 (nyt %r); merkkijono '0' ei sytytä valoja" % (p, ed))
    va = r.get("valmis_arvio")
    if va is not None:
        try:
            datetime.fromisoformat(str(va).replace("Z", "+00:00"))
        except ValueError:
            virheet.append("%s: valmis_arvio pitää olla ISO-aika (nyt %r)" % (p, va))
    for k in ("valmiit", "odottaa"):
        if k in r and (isinstance(r[k], bool) or not isinstance(r[k], int)):
            virheet.append("%s: %s pitää olla kokonaisluku" % (p, k))
    if "aika" in r and (not isinstance(r["aika"], str) or len(r["aika"]) > 20):
        virheet.append("%s: aika pitää olla lyhyt teksti (enintään 20 merkkiä)" % p)
    valmis = bool(VALMIS_RE.search(tila))
    if on_juna and valmis:
        virheet.append("%s: Juna N -rivin tila '%s' sisältää sanan valmis/TestFlight/julkaistu, jolloin liikennevalot eivät pala; käytä esim. 'Työn alla', 'Lukittu' tai 'Käännössä'" % (p, tila))
    if on_juna and not isinstance(ed, (int, float)):
        virheet.append("%s: Juna N -rivillä pitää olla edistys 0–5 (liikennevalot)" % p)
    if not on_juna and not valmis:
        virheet.append("%s: TF N -rivin tilassa pitää olla sana TestFlight, valmis tai julkaistu (nyt '%s'), muuten rivi lihavoituu ja näyttää keskeneräiseltä" % (p, tila))
    if not on_juna and "edistys" in r and isinstance(ed, (int, float)) and ed:
        varoitukset.append("%s: TF-rivillä ei pitäisi olla edistystä" % p)
    # Otsikot ja kukin asia kerran
    teksti = r.get("teksti") if isinstance(r.get("teksti"), str) else ""
    sallitut = SALLITUT_JUNA if on_juna else SALLITUT_TF
    nahty, kohdat, kohta_ryhma = set(), {}, None
    for rivi in teksti.split("\n"):
        if rivi.strip().startswith(("–", "-", "•")):
            k = re.sub(r"\s+", " ", rivi.strip().lstrip("–-• ").lower())
            k = re.sub(r"\s*\((?:pyysit|päätit|hyväksyit|kysyit)[^)]*\)\s*$", "", k)
            k = re.sub(r";? mukaan, jos ehtii", "", k)
            if kohta_ryhma is not None and k in kohdat and kohdat[k] != kohta_ryhma:
                (virheet if nakyva else varoitukset).append("%s: sama asia sekä '%s' että '%s' -osiossa: %s" % (p, kohdat[k], kohta_ryhma, k[:60]))
            elif k in kohdat and kohdat[k] == kohta_ryhma:
                (virheet if nakyva else varoitukset).append("%s: sama asia kahdesti osiossa '%s': %s" % (p, kohta_ryhma, k[:60]))
            kohdat.setdefault(k, kohta_ryhma)
            continue
        if not rivi.strip() or not rivi.rstrip().endswith(":") and not re.match(r"^\s*(Työn alla|Valmiina|Korjatut|Korjattu|Uutta|Junassa\s+\d+)\b[^\n]{0,60}:", rivi, re.I):
            continue
        o = otsikon_perus(rivi)
        if not o:
            continue
        if o not in sallitut:
            (virheet if nakyva else varoitukset).append("%s: teksti-osion otsikko '%s' ei sallittu (sallitut: %s)" % (p, rivi.strip()[:40], ", ".join(s.capitalize() for s in sallitut)))
        if o in nahty:
            (virheet if nakyva else varoitukset).append("%s: osio '%s' esiintyy kahdesti" % (p, o))
        nahty.add(o)
        kohta_ryhma = o
    if on_juna and not nahty and len(teksti) > 0 and not teksti.strip().startswith("–"):
        varoitukset.append("%s: Juna N -rivin tekstissä ei ole 'Työn alla:'- eikä 'Valmiina:'-osiota" % p)


def tarkista(junat, eteneminen=None):
    """Palauttaa (virheet, varoitukset)."""
    virheet, varoitukset = [], []
    if not isinstance(junat, dict) or not isinstance(junat.get("rivit"), list):
        return ["juurella pitää olla objekti, jossa 'rivit' on lista"], []
    rivit = junat["rivit"]
    # Näkyvät rivit = kolme uusinta numeron mukaan (sama kuin sivu)
    def nro(r):
        m = NIMI_RE.match(r.get("nimi", "")) if isinstance(r, dict) and isinstance(r.get("nimi"), str) else None
        return int(m.group(2)) if m else 0
    nakyvat = {id(r) for r in sorted(rivit, key=nro, reverse=True)[:3]}
    nimet = {}
    for i, r in enumerate(rivit):
        tarkista_rivi(r, i, id(r) in nakyvat, virheet, varoitukset)
        if isinstance(r, dict) and isinstance(r.get("nimi"), str):
            if r["nimi"] in nimet:
                virheet.append("nimi '%s' esiintyy kahdesti" % r["nimi"])
            nimet[r["nimi"]] = r
    if eteneminen is not None:
        if not isinstance(eteneminen, dict):
            virheet.append("eteneminen: ei objekti")
        else:
            en = eteneminen.get("nimi")
            if en not in nimet:
                virheet.append("eteneminen: nimi %r ei vastaa mitään junat-dokumentin riviä; eteneminen ohittaa vain saman nimisen rivin, joten valot eivät pala" % en)
            ed = eteneminen.get("edistys")
            if isinstance(ed, bool) or not isinstance(ed, (int, float)) or not 0 <= ed <= 5:
                virheet.append("eteneminen: edistys pitää olla luku 0–5 (nyt %r)" % (ed,))
            va = eteneminen.get("valmis_arvio")
            if va is not None:
                try:
                    datetime.fromisoformat(str(va).replace("Z", "+00:00"))
                except ValueError:
                    varoitukset.append("eteneminen: valmis_arvio ei ole ISO-aika (%r), jäljellä-aikaa ei näytetä" % (va,))
    return virheet, varoitukset


def lue(polku):
    with open(polku, encoding="utf-8") as f:
        return json.load(f)


def main(argv):
    polku = argv[1] if len(argv) > 1 else os.path.join(os.path.dirname(os.path.abspath(__file__)), "data", "talo", "junat.json")
    try:
        junat = lue(polku)
    except (OSError, ValueError) as e:
        print("VIRHE: %s ei luettavissa: %s" % (polku, e))
        return 2
    et_polku = argv[2] if len(argv) > 2 else os.path.join(os.path.dirname(os.path.abspath(polku)), "eteneminen.json")
    eteneminen = None
    if os.path.exists(et_polku):
        try:
            eteneminen = lue(et_polku)
        except (OSError, ValueError) as e:
            print("VIRHE: %s ei luettavissa: %s" % (et_polku, e))
            return 2
    virheet, varoitukset = tarkista(junat, eteneminen)
    for v in varoitukset:
        print("varoitus: " + v)
    for v in virheet:
        print("VIRHE: " + v)
    print("%s: %d virhettä, %d varoitusta" % (polku, len(virheet), len(varoitukset)))
    return 1 if virheet else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
