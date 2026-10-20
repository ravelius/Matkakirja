#!/usr/bin/env python3
"""Asemataulun tarkistin (omistaja 18.10.2026, C5; laajennettu 19.10.2026 klo 19.18–19.51 ja 20.10.2026 klo 09.56,
speksin kaikki säännöt).

Käyttö:
  python3 -I tools/asemataulu/tarkista-junat.py [junat.json] [eteneminen.json]
  python3 -I tools/asemataulu/tarkista-junat.py --kansio <data/talo> [--odottaa <hoitaja/odottaa.json>] [--tf-lokit <kansio>]
--kansio tarkistaa junat, eteneminen, roolit ja tyolista (puuttuvat ohitetaan); odottaa.json oletuksena
<kansio>/../../hoitaja/odottaa.json. --tf-lokit vertaa junarivejä Julkaisijan TF-lokeihin (tfN-ketju.log, rivi
"SISAINEN … success HH.MM"); Boostin täysi tarkistus ajaa sen. Aja ennen jokaista vientiä (synkka.py ja asemataulu.py
ajavat sen itse).
Paluukoodi 0 = ok, 1 = virheitä, 2 = tiedostoa ei voi lukea.
Speksi ja säännöt: docs/moduulit/asemataulu.md (ainoa speksi).
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
SALLITUT_LUKITTU = ("valmiina",)
SALLITUT_TF = ("uutta",)
# Ei valintamerkkejä junarivillä (omistaja 19.10. 19.20).
MERKIT_RE = re.compile("[\u2610\u2611\u2612\u2705\u2713\u2714\u274C\u2B1C]")
# Lukittu Juna N -rivi (omistaja 19.10. 19.48): tila alkaa näillä tai etenemisen jakso on "matka".
LUKITTU_RE = re.compile(r"^\s*(lukittu|käännös|käännössä|matkalla|ipa|applelle|applella)", re.I)
# Ei-pelin asiat eivät kuulu junariveille (omistaja 19.10. 19.48): Raamattu, taulun ohje, työkalut.
EI_PELIN_RE = re.compile(r"\b(raamat\w*|asemataulu\w*|tarkistin\w*|tuotantopohj\w*|työkalu\w*)", re.I)
# Matkan vaiheiden kirjoittajat (omistaja 19.10. 19.18): Natiiviseppä 1–2, Julkaisija 3–5.
MATKA_KIRJOITTAJA = {1: "Natiiviseppä", 2: "Natiiviseppä", 3: "Julkaisija", 4: "Julkaisija", 5: "Julkaisija"}
ROOLI_TILAT = ("työ", "odottaa", "lepo", "kysyy")
TYOLISTA_KIELLETYT_RE = re.compile(r"\((?:palautteesi|pyyntösi|päätöksesi)", re.I)
# TF-otsikko (omistaja 20.10. 09.56, KK): "Uutta (pp.kk. klo HH.MM; myös Macille[ HH.MM]):"; aika = TF sisäisille testaajille.
TF_OTSIKKO_RE = re.compile(r"^Uutta \(\d{1,2}\.\d{1,2}\. klo \d{1,2}\.\d[\dx](?:; myös Macille(?: \d{1,2}\.\d[\dx])?)?\):$")
# Juna N -rivin tila ei kerro testaajista; testaajilla oleva juna on "TF N" (206 ja 207 jäivät Juna-riveiksi 20.10.).
TESTAAJILLA_RE = re.compile(r"testaaj", re.I)
SISAINEN_RE = re.compile(r"^SISAINEN \S+ completed success (\d{1,2})\.(\d{2})\s*$", re.M)


def junan_laji(r, lukitut=()):
    """avoin / lukittu / tf (sama kuin asemataulu.html:n junaLaji)."""
    nimi = r.get("nimi") if isinstance(r, dict) and isinstance(r.get("nimi"), str) else ""
    m = NIMI_RE.match(nimi)
    if m and m.group(1) == "TF":
        return "tf"
    tila = r.get("tila") if isinstance(r.get("tila"), str) else ""
    return "lukittu" if nimi in lukitut or r.get("jakso") == "matka" or LUKITTU_RE.match(tila) else "avoin"


def nro(r):
    m = NIMI_RE.match(r.get("nimi", "")) if isinstance(r, dict) and isinstance(r.get("nimi"), str) else None
    return int(m.group(2)) if m else 0


def jarjestys(rivit, lukitut=()):
    """Sivun järjestys (omistaja 20.10. 09.56): avoin juna ensin, sitten lukittu, sitten TF; kukin uusin ensin."""
    paino = {"avoin": 0, "lukittu": 1, "tf": 2}
    return sorted(rivit, key=lambda r: (paino[junan_laji(r, lukitut)], -nro(r)))


def otsikon_perus(rivi):
    m = re.match(r"^\s*([^:\n(]{1,60}?)\s*(?:\(.*?\))?\s*:", rivi)
    return m.group(1).strip().lower() if m else ""


def tarkista_rivi(r, i, nakyva, virheet, varoitukset, lukitut=()):
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
    lukittu = on_juna and (nimi in lukitut or bool(LUKITTU_RE.match(tila)))
    sallitut = SALLITUT_LUKITTU if lukittu else SALLITUT_JUNA if on_juna else SALLITUT_TF
    ilmoita = virheet if nakyva else varoitukset
    if on_juna and TESTAAJILLA_RE.search(tila):
        virheet.append("%s: tila '%s': testaajilla oleva juna on 'TF %s' ja sen teksti 'Uutta (pp.kk. klo HH.MM; myös Macille):'" % (p, tila, m.group(2)))
    if not on_juna:
        otsikot = [x.strip() for x in teksti.split("\n") if x.strip() and not x.strip().startswith(("–", "-", "•")) and x.rstrip().endswith(":")]
        if not otsikot or not TF_OTSIKKO_RE.match(otsikot[0]) or len(otsikot) > 1:
            virheet.append("%s: TF-rivillä vain yksi otsikko 'Uutta (pp.kk. klo HH.MM; myös Macille):' (aika = TF sisäisille), nyt %s" % (p, " | ".join(otsikot)[:80] or "ei otsikkoa"))
    if MERKIT_RE.search(teksti) or MERKIT_RE.search(tila):
        virheet.append("%s: valintamerkit (☑/☐/✅/✓) eivät kuulu junariville; vain otsikot ja ranskalaiset viivat" % p)
    eka = next((x for x in teksti.split("\n") if x.strip()), "")
    if eka and otsikon_perus(eka) not in sallitut + ("työn alla", "valmiina", "uutta"):
        virheet.append("%s: teksti alkaa johdannolla '%s'; ensimmäinen rivi on otsikko (%s)" % (p, eka.strip()[:40], ", ".join(x.capitalize() + ":" for x in sallitut)))
    for rivi in teksti.split("\n"):
        if rivi.strip().startswith(("–", "-", "•")) and EI_PELIN_RE.search(rivi):
            ilmoita.append("%s: ei-pelin asia junarivillä (Raamattu, taulu, työkalut eivät kuulu junalle): %s" % (p, rivi.strip()[:60]))
    nahty, kohdat, kohta_ryhma = set(), {}, None
    for rivi in teksti.split("\n"):
        if rivi.strip().startswith(("–", "-", "•")):
            k = re.sub(r"\s+", " ", rivi.strip().lstrip("–-• ").lower())
            k = re.sub(r"\s*\((?:pyysit|päätit|hyväksyit|kysyit)[^)]*\)\s*$", "", k)
            k = re.sub(r";? mukaan, jos ehtii", "", k)
            if kohta_ryhma is not None and k in kohdat and kohdat[k] != kohta_ryhma:
                ilmoita.append("%s: sama asia sekä '%s' että '%s' -osiossa: %s" % (p, kohdat[k], kohta_ryhma, k[:60]))
            elif k in kohdat and kohdat[k] == kohta_ryhma:
                ilmoita.append("%s: sama asia kahdesti osiossa '%s': %s" % (p, kohta_ryhma, k[:60]))
            kohdat.setdefault(k, kohta_ryhma)
            continue
        if not rivi.strip() or not rivi.rstrip().endswith(":") and not re.match(r"^\s*(Työn alla|Valmiina|Korjatut|Korjattu|Uutta|Junassa\s+\d+)\b[^\n]{0,60}:", rivi, re.I):
            continue
        o = otsikon_perus(rivi)
        if not o:
            continue
        if o not in sallitut:
            syy = "; lukitulla junalla vain Valmiina (lukitusversion sisältö), seuraavan junan asiat seuraavalle riville" if lukittu and o == "työn alla" else ""
            virheet.append("%s: teksti-osion otsikko '%s' ei sallittu (sallitut: %s)%s" % (p, rivi.strip()[:40], ", ".join(s.capitalize() for s in sallitut), syy))
        if o in nahty:
            virheet.append("%s: osio '%s' esiintyy kahdesti" % (p, o))
        nahty.add(o)
        kohta_ryhma = o
    if on_juna and not nahty and len(teksti) > 0 and not teksti.strip().startswith("–"):
        varoitukset.append("%s: Juna N -rivin tekstissä ei ole 'Työn alla:'- eikä 'Valmiina:'-osiota" % p)


def tarkista(junat, eteneminen=None, tf_lokit=None):
    """Palauttaa (virheet, varoitukset). tf_lokit = {N: "HH.MM"} (TF sisäisille, Julkaisijan lokeista)."""
    virheet, varoitukset = [], []
    if not isinstance(junat, dict) or not isinstance(junat.get("rivit"), list):
        return ["juurella pitää olla objekti, jossa 'rivit' on lista"], []
    rivit = junat["rivit"]
    lukitut = set()
    if isinstance(eteneminen, dict) and eteneminen.get("jakso") == "matka":
        lukitut.add(eteneminen.get("nimi"))
    # Näkyvät rivit = kolme ensimmäistä sivun järjestyksessä (avoin, lukittu, TF; uusin ensin)
    nakyvat = {id(r) for r in jarjestys([r for r in rivit if isinstance(r, dict)], lukitut)[:3]}
    nimet = {}
    for i, r in enumerate(rivit):
        tarkista_rivi(r, i, id(r) in nakyvat, virheet, varoitukset, lukitut)
        if isinstance(r, dict) and isinstance(r.get("nimi"), str):
            if r["nimi"] in nimet:
                virheet.append("nimi '%s' esiintyy kahdesti" % r["nimi"])
            nimet[r["nimi"]] = r
    # Juna N, jota uudempi juna on jo TF:ssä, on itsekin perillä (tai vanhentunut): rivi muutetaan TF N:ksi.
    tf_max = max([nro(r) for r in rivit if isinstance(r, dict) and junan_laji(r) == "tf"] or [0])
    for r in rivit:
        if isinstance(r, dict) and junan_laji(r, lukitut) != "tf" and 0 < nro(r) < tf_max:
            virheet.append("%s: juna %d on jo TF:ssä, koska uudempi TF %d on; muuta rivi 'TF %d' (Uutta-otsikko) tai poista se" % (r.get("nimi"), nro(r), tf_max, nro(r)))
    # Junat TF-lokeja vasten (Boostin täysi tarkistus): sisäisille saapunut juna on TF-rivi, ja Uutta-otsikon aika = lokin aika.
    for n, aika in sorted((tf_lokit or {}).items()):
        if n < tf_max - 2:
            continue
        if "Juna %d" % n in nimet:
            virheet.append("Juna %d: TF:ssä sisäisillä klo %s (Julkaisijan loki); muuta rivi 'TF %d', teksti 'Uutta (pp.kk. klo %s; myös Macille):'" % (n, aika, n, aika))
        elif "TF %d" % n not in nimet:
            virheet.append("TF %d puuttuu junariveistä, vaikka se on TF:ssä sisäisillä klo %s (Julkaisijan loki)" % (n, aika))
        elif "klo %s" % aika not in str(nimet["TF %d" % n].get("teksti", "")).split("\n")[0]:
            varoitukset.append("TF %d: Uutta-otsikon aika ei ole lokin sisäisen ajan klo %s" % (n, aika))
    if isinstance(eteneminen, dict) and not eteneminen.get("nimi"):
        eteneminen = None  # PT tyhjensi etenemisen, kun juna saapui TF:ään
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
            et_tila = eteneminen.get("tila") if isinstance(eteneminen.get("tila"), str) else ""
            if VALMIS_RE.search(et_tila) and not (isinstance(ed, (int, float)) and ed >= 5):
                virheet.append("eteneminen: tila %r sisältää sanan valmis/TestFlight/julkaistu ennen vaihetta 5; sana kuuluu tilaan vasta, kun juna on TF:ssä (valot sammuvat)" % et_tila)
            jakso = eteneminen.get("jakso")
            if jakso not in (None, "matka"):
                virheet.append("eteneminen: jakso on joko puuttuva (lastaus, oranssi) tai \"matka\" (lukituksesta TF:ään, vihreä), nyt %r" % (jakso,))
            if jakso == "matka":
                if isinstance(ed, bool) or not isinstance(ed, int) or not 1 <= ed <= 5:
                    virheet.append("eteneminen: matkan edistys on kokonaisluku 1–5 (1 lukittu + käännös alkoi, 2 käännös valmis, 3 testit + IPA, 4 Applelle, 5 TF:ssä), nyt %r" % (ed,))
                elif eteneminen.get("kirjoittaja") and eteneminen.get("kirjoittaja") != MATKA_KIRJOITTAJA[ed]:
                    virheet.append("eteneminen: matkan vaiheen %d kirjoittaja on %s (Natiiviseppä 1–2, Julkaisija 3–5), nyt %r" % (ed, MATKA_KIRJOITTAJA[ed], eteneminen.get("kirjoittaja")))
    return virheet, varoitukset


def tarkista_roolit(roolit, odottaa=None):
    """Roolikortit (omistaja 19.10. 19.24 ODOTUS EI OLE LEPO). Palauttaa (virheet, varoitukset)."""
    virheet = []
    if not isinstance(roolit, dict) or not isinstance(roolit.get("rivit"), list):
        return ["roolit: juurella pitää olla objekti, jossa 'rivit' on lista"], []
    odottaa = odottaa if isinstance(odottaa, dict) else {}
    for r in roolit["rivit"]:
        if not isinstance(r, dict):
            virheet.append("roolit: rivi ei ole objekti")
            continue
        n, t, s = r.get("nimi", "?"), r.get("tila"), str(r.get("teksti") or "")
        if t not in ROOLI_TILAT:
            virheet.append("roolit (%s): tila pitää olla %s, nyt %r" % (n, " / ".join(ROOLI_TILAT), t))
        if t == "lepo" and s != "Levossa":
            virheet.append("roolit (%s): lepäävän roolin teksti on \"Levossa\", nyt %r" % (n, s))
        if t == "odottaa" and not s.startswith("odottaa "):
            virheet.append("roolit (%s): odottavan roolin teksti kertoo mitä se odottaa (\"odottaa …\"), nyt %r" % (n, s))
        if s.lower().startswith("odottaa") and t != "odottaa":
            virheet.append("roolit (%s): teksti %r mutta tila %r; odottava rooli on tilassa odottaa" % (n, s, t))
        if t == "lepo" and n in odottaa:
            virheet.append("roolit (%s): odotus ei ole lepo: odottaa.json sanoo %r, kortissa Levossa" % (n, odottaa[n]))
    return virheet, []


def tarkista_tyolista(tyolista):
    """Työlistan tyylisäännöt (omistaja: ei (palautteesi)/(pyyntösi)/(päätöksesi) -merkintöjä)."""
    virheet = []
    if not isinstance(tyolista, dict) or not isinstance(tyolista.get("rivit"), list):
        return ["tyolista: juurella pitää olla objekti, jossa 'rivit' on lista"], []
    for r in tyolista["rivit"]:
        if not isinstance(r, dict):
            continue
        for k, v in r.items():
            if isinstance(v, str) and TYOLISTA_KIELLETYT_RE.search(v):
                virheet.append("tyolista (%s): kenttä %s sisältää merkinnän (palautteesi/pyyntösi/päätöksesi …)" % (str(r.get("otsikko", "?"))[:40], k))
    return virheet, []


def lue_tf_lokit(kansio):
    """{N: "HH.MM"} Julkaisijan tfN-ketju.log-tiedostoista (rivi "SISAINEN <ajo> completed success HH.MM")."""
    tulos = {}
    for nimi in os.listdir(kansio):
        m = re.match(r"^tf(\d+)-ketju\.log$", nimi)
        if not m:
            continue
        try:
            with open(os.path.join(kansio, nimi), encoding="utf-8", errors="replace") as f:
                osumat = SISAINEN_RE.findall(f.read())
        except OSError:
            continue
        if osumat:
            tulos[int(m.group(1))] = "%s.%s" % osumat[0]
    return tulos


def tarkista_kansio(kansio, odottaa_polku=None, tf_kansio=None):
    """Tarkistaa kansion junat, eteneminen, roolit ja tyolista. Palauttaa (virheet, varoitukset, luettu)."""
    virheet, varoitukset, luettu = [], [], []

    def lue_jos(nimi):
        p = os.path.join(kansio, nimi + ".json")
        if not os.path.exists(p):
            return None
        luettu.append(nimi)
        return lue(p)
    junat, et = lue_jos("junat"), lue_jos("eteneminen")
    tf = lue_tf_lokit(tf_kansio) if tf_kansio else None
    if tf is not None:
        luettu.append("TF-lokit %d" % len(tf))
    if junat is not None:
        v, w = tarkista(junat, et, tf)
        virheet += v
        varoitukset += w
    # Roolit: viety versio on TAULU/hoitaja/roolit.json (Asemataulu-session kokoama); data/talo/roolit.json vain, jos sitä ei ole.
    hoitaja = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(kansio))), "hoitaja")
    if os.path.exists(os.path.join(hoitaja, "roolit.json")):
        roolit = lue(os.path.join(hoitaja, "roolit.json"))
        luettu.append("hoitaja/roolit")
    else:
        roolit = lue_jos("roolit")
    if roolit is not None:
        op = odottaa_polku or os.path.join(hoitaja, "odottaa.json")
        od = lue(op) if os.path.exists(op) else None
        v, w = tarkista_roolit(roolit, od)
        virheet += v
        varoitukset += w
    tl = lue_jos("tyolista")
    if tl is not None:
        v, w = tarkista_tyolista(tl)
        virheet += v
        varoitukset += w
    return virheet, varoitukset, luettu


def lue(polku):
    with open(polku, encoding="utf-8") as f:
        return json.load(f)


def main(argv):
    if len(argv) > 2 and argv[1] == "--kansio":
        kansio = argv[2]
        liput = dict(zip(argv[3::2], argv[4::2]))
        try:
            virheet, varoitukset, luettu = tarkista_kansio(kansio, liput.get("--odottaa"), liput.get("--tf-lokit"))
        except (OSError, ValueError) as e:
            print("VIRHE: %s ei luettavissa: %s" % (kansio, e))
            return 2
        for v in varoitukset:
            print("varoitus: " + v)
        for v in virheet:
            print("VIRHE: " + v)
        print("%s (%s): %d virhettä, %d varoitusta" % (kansio, ", ".join(luettu) or "ei tiedostoja", len(virheet), len(varoitukset)))
        return 1 if virheet else 0
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
