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
AVOIMET ASIAT (suunnitelma 20261117-muisti-ilman-uudelleenkertomista, luku 5 ja pala 3): tyolista.json:n avain "asiat" on kirjanpito
siitä, mitä joku odottaa ja mitä sitten tehdään. Rivi kirjoitetaan kerran; myöhemmin vain merkitään tai suljetaan näytöllä.
  … avaa --kuka KK --laji LUPAUS --mita "…" [--odottaa "…"] [--sitten "…"] --sana omistaja:P-261117-55 [--rivi "OTSIKKO"]
  … merkitse A-261117-1 "lisätieto"                 (lisää merkinnän; alkuperäistä tekstiä ei voi muuttaa)
  … sulje A-261117-1 --naytto "PR #7010 / sha / polku / versio 224.3 / kerrottu omistajalle klo 12.40 / peruttu: <lähde>"
  … avoimet [--kuka X] [--laji Y] [--vanhat PV] [--suljetut]      … tila [--kuka KK]   (aloitusnäkymä ≤ 6 kt; ei kirjoita)
- Lajit: ODOTTAA, KATSO, LUPAUS, KYSYMYS, EHTO. Lähde (--sana) pakollinen: omistaja:P-yymmdd-n, omistaja:pp.kk.[vvvv] [klo ]hh.mm,
  KK:<päiväkirjan tunnus> tai rooli:<nimi>. Ilman lähdettä avaa hylätään; EHTO ilman omistajan lähdettä tulostuu "KK:n oma ehto".
- Sulkeminen vaatii näytön: polku, sha (7–40 heksaa), PR (#N), versio/juna/TF N, "kerrottu omistajalle klo hh.mm" tai
  "peruttu: <lähde>". Asia-komennot eivät muuta työlistan ts:ää (vanhenemisvahti katsoo työlistan rivejä).
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


OMISTAJA_VAIHEET = ("ei aloitettu", "kesken", "seuraavaan", "valmis")


def omistajalle_teksti(t):
    """Omistajan kielellä, enintään 12 sanaa (KK 16.11. 16.1x, omistaja 15.50/15.55): asennussivun rivi = versiorivi."""
    t = " ".join(str(t).split())
    if not t or len(t.split()) > 12:
        raise Virhe("--omistajalle: 1–12 sanaa (nyt %d)" % len(t.split()))
    return t


ASIA_LAJIT = ("ODOTTAA", "KATSO", "LUPAUS", "KYSYMYS", "EHTO")
ASIA_KOMENNOT = ("avaa", "merkitse", "sulje", "avoimet", "tila")
ASIA_TUNNUS_RE = re.compile(r"^A-\d{6}-\d+$")
MITA_MAX = 160
KENTTA_MAX = 160
MERKINTA_MAX = 300
TILA_RAJA = 6000  # tavua (UTF-8): tila-näkymän yläraja (suunnitelma luku 5: ≤ 6 kt)
TILA_RIVI_MAX = 200
VANHA_PV = 3
# Lähteet (luku 5 ja 7): omistajan sana vaatii P-tunnuksen tai päivän ja kellonajan; muut ovat roolin omia.
SANA_OMISTAJA_RE = re.compile(r"omistaja:\s*(P-\d{6}-\d+|\d{1,2}\.\d{1,2}\.(?:\d{4})?\s+(?:klo\s+)?\d{1,2}[.:]\d{2})")
SANA_MUU_RE = re.compile(r"(KK|rooli):\s*([^\s:][^\n]{0,79})")
NAYTTO_RE = (
    re.compile(r"\bPR\s*#?\d+|#\d{2,}", re.I),
    re.compile(r"\b(?=[0-9a-f]*\d)(?=[0-9a-f]*[a-f])[0-9a-f]{7,40}\b"),  # sha
    re.compile(r"[\w.~-]*/[\w.\-]+|\b[\w-]+\.(?:md|py|mjs|js|json|jsonl|cs|swift|png|jpg|webp|txt|log|zsh|sh|html|ipa)\b"),  # polku
    re.compile(r"\b(?:versio|juna|TF)\s*\d+|\b\d{3}\.\d+\b", re.I),
    re.compile(r"kerrottu omistajalle\s+(?:\d{1,2}\.\d{1,2}\.(?:\d{4})?\s+)?klo\s+\d{1,2}[.:]\d{2}", re.I),
)


def lahde(sana, tarkka=True):
    """Tarkistaa lähteen. Palauttaa (laji, tunnus): ("omistaja", "P-…"), ("KK", "bck") tai ("rooli", "NS"); muuten Virhe."""
    sana = " ".join(str(sana or "").split())
    for rx in (SANA_OMISTAJA_RE, SANA_MUU_RE):
        m = rx.fullmatch(sana) if tarkka else rx.match(sana)
        if m:
            return ("omistaja", m.group(1)) if rx is SANA_OMISTAJA_RE else (m.group(1), m.group(2).strip())
    raise Virhe("lähde puuttuu tai on väärän muotoinen (%r); sallitut: omistaja:P-261117-55, omistaja:17.11. klo 12.26, "
                "KK:<päiväkirjan tunnus>, rooli:<nimi>" % sana)


def lahde_teksti(sana):
    try:
        laji, tunnus = lahde(sana)
    except Virhe:
        return "[LÄHDE PUUTTUU]"
    return "[OMISTAJA %s]" % tunnus if laji == "omistaja" else "[KK:n oma, %s]" % tunnus if laji == "KK" else "[%s:n oma]" % tunnus


def naytto_ok(naytto):
    """Sulkemisen näyttö; 'peruttu' vaatii sanan lähteen."""
    n = " ".join(str(naytto or "").split())
    if n.lower().startswith("peruttu"):
        lahde(n.split(":", 1)[1] if ":" in n else "", tarkka=False)
        return n
    if not n or not any(rx.search(n) for rx in NAYTTO_RE):
        raise Virhe("näyttö puuttuu (%r): anna polku, sha, PR (#N), versio/juna/TF N, 'kerrottu omistajalle klo hh.mm' "
                    "tai 'peruttu: <lähde>'" % n)
    return n


def lyhyt(t, n):
    t = " ".join(str(t or "").split())
    return t if len(t) <= n else t[:n - 1].rstrip() + "…"


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
    return virheet + tarkista_asiat(tl.get("asiat"))


def tarkista_asiat(asiat):
    """Avointen asioiden rakenne: tunnus yksikäsitteinen, laji, kuka, mita ≤ 160, lähde, suljettu vain näytöllä."""
    if asiat is None:
        return []
    if not isinstance(asiat, list):
        return ["tyolista.json: 'asiat' pitää olla lista"]
    virheet, nahty = [], set()
    for i, a in enumerate(asiat):
        if not isinstance(a, dict):
            virheet.append("asia %d: ei objekti" % i)
            continue
        t = str(a.get("tunnus", ""))
        p = "asia %s" % (t or i)
        if not ASIA_TUNNUS_RE.match(t):
            virheet.append("%s: tunnus pitää olla A-yymmdd-n" % p)
        elif t in nahty:
            virheet.append("%s: tunnus kahdesti" % p)
        nahty.add(t)
        if a.get("laji") not in ASIA_LAJIT:
            virheet.append("%s: laji pitää olla %s" % (p, " / ".join(ASIA_LAJIT)))
        if not str(a.get("kuka", "")).strip():
            virheet.append("%s: kuka puuttuu" % p)
        mita = a.get("mita")
        if not isinstance(mita, str) or not mita.strip() or len(mita) > MITA_MAX:
            virheet.append("%s: mita pitää olla 1–%d merkkiä" % (p, MITA_MAX))
        try:
            lahde(a.get("sana"))
        except Virhe as e:
            virheet.append("%s: %s" % (p, e))
        if isinstance(a.get("avattu"), bool) or not isinstance(a.get("avattu"), (int, float)):
            virheet.append("%s: avattu pitää olla aika (ms)" % p)
        if not isinstance(a.get("merkinnat", []), list):
            virheet.append("%s: merkinnat pitää olla lista" % p)
        s = a.get("suljettu")
        if s is not None and (not isinstance(s, dict) or not str(s.get("naytto", "")).strip()):
            virheet.append("%s: suljettu ilman näyttöä" % p)
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
    if args.komento in ASIA_KOMENNOT:
        return asiakomento(args, tl, polku, nyt_s, nyt)
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
        if args.omistajalle:
            rivi["omistajalle"] = omistajalle_teksti(args.omistajalle)
            rivi["omistaja_vaihe"] = "ei aloitettu"
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
            if args.omistajalle:
                rivi["omistajalle"] = omistajalle_teksti(args.omistajalle)
                rivi.setdefault("omistaja_vaihe", "ei aloitettu")
            if rivi.get("omistaja_vaihe") == "ei aloitettu":
                rivi["omistaja_vaihe"] = "kesken"
            if args.edistys is not None:
                rivi["edistys"] = args.edistys
            if args.pidata_kesken is not None:
                if args.pidata_kesken.strip():
                    rivi["pidata_kesken"] = " ".join(args.pidata_kesken.split())
                else:
                    rivi.pop("pidata_kesken", None)
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
        elif args.komento == "vaihe":
            if not rivi.get("omistajalle"):
                raise Virhe("rivillä '%s' ei ole omistajalle-tekstiä; lisää se: tilanne --omistajalle" % nimi)
            rivi["omistaja_vaihe"] = args.vaihe
            if args.versio:
                rivi["omistaja_versio"] = args.versio
            elif args.vaihe != "valmis" or args.versio == "":
                rivi.pop("omistaja_versio", None)
            elif rivi.get("omistaja_versio"):
                # JU 17.11. (KK 09.15, PT): valmis ilman --versio pitää vanhan version; kerrotaan, ettei se jää huomaamatta
                print("HUOM: rivin '%s' versio %s säilyy (uusi: --versio 224.N, tyhjennys: --versio '')" % (nimi, rivi["omistaja_versio"]))
            print("%s: %s%s" % (nimi, args.vaihe, " (%s)" % args.versio if args.versio else ""))
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


def uusi_tunnus(asiat, nyt_s):
    t = time.localtime(nyt_s)
    etu = "A-%02d%02d%02d-" % (t.tm_year % 100, t.tm_mon, t.tm_mday)
    loput = [str(a.get("tunnus", ""))[len(etu):] for a in asiat if isinstance(a, dict) and str(a.get("tunnus", "")).startswith(etu)]
    return etu + str(max([int(x) for x in loput if x.isdigit()] or [0]) + 1)


def etsi_asia(asiat, tunnus):
    for a in asiat:
        if isinstance(a, dict) and str(a.get("tunnus", "")).casefold() == str(tunnus).strip().casefold():
            return a
    raise Virhe("asiaa '%s' ei löydy (avoimet: tyolista.py avoimet)" % tunnus)


def avoimet_asiat(asiat, kuka=None, laji=None):
    return [a for a in asiat if isinstance(a, dict) and not a.get("suljettu")
            and (not kuka or avain(a.get("kuka", "")) == avain(kuka)) and (not laji or a.get("laji") == laji)]


def ika_pv(a, nyt_s):
    return (nyt_s - (a.get("avattu") or 0) / 1000.0) / 86400.0


def asiarivi(a, nyt_s, n=TILA_RIVI_MAX):
    """Yksi asia yhdelle riville (≤ n merkkiä): tunnus, mitä, odottaa, sitten, viimeisin merkintä, lähde, avauspäivä."""
    lahdeosa = lahde_teksti(a.get("sana"))
    if a.get("laji") == "EHTO" and not lahdeosa.startswith("[OMISTAJA"):
        lahdeosa = lahdeosa.replace(" oma", " oma ehto", 1)  # luku 5 sääntö 2: "KK:n oma ehto", ei koskaan omistajan nimellä
    merk = a.get("merkinnat") or []
    hanta = " %s %s%s" % (lahdeosa, aikaleima((a.get("avattu") or 0) / 1000.0).split(" ")[0], " +%d" % len(merk) if merk else "")
    osat = [str(a.get("mita", ""))]
    if a.get("odottaa"):
        osat.append("odottaa: " + str(a["odottaa"]))
    if a.get("sitten"):
        osat.append("→ " + str(a["sitten"]))
    if merk:
        osat.append("viimeksi: " + str(merk[-1].get("teksti", "")))
    alku = "%s " % a.get("tunnus")
    return alku + lyhyt(" · ".join(osat), max(20, n - len(alku) - len(hanta))) + hanta


def tila_osiot(asiat):
    """Aloituksen näkymän osiot tärkeysjärjestyksessä (luku 5): SINÄ, KATSO NYT, LUPAUKSET, ODOTTAA, EHDOT; uusin ensin."""
    def omistajaa(a):
        return a.get("laji") == "KYSYMYS" or "omistaj" in str(a.get("odottaa", "")).casefold()
    osiot = [("SINÄ (odottaa omistajaa)", [a for a in asiat if omistajaa(a)])]
    for nimi, laji in (("KATSO NYT", "KATSO"), ("LUPAUKSET", "LUPAUS"), ("ODOTTAA", "ODOTTAA"), ("EHDOT", "EHTO")):
        osiot.append((nimi, [a for a in asiat if not omistajaa(a) and a.get("laji") == laji]))
    return [(n, sorted(r, key=lambda a: -(a.get("avattu") or 0))) for n, r in osiot]


def tila_teksti(asiat, kuka, nyt_s, raja=TILA_RAJA):
    """Tila-näkymä ≤ raja tavua: liian pitkästä pudotetaan ensin yli 3 pv vanhat (alimmasta osiosta, vanhin ensin),
    sitten muut samassa järjestyksessä; pudotetut näkyvät osion lopussa lukuna."""
    osiot = tila_osiot(asiat)
    pois = set()

    def kokoa():
        rivit = ["TILA %s %s: %d avointa asiaa (%s)" % (kuka or "kaikki", aikaleima(nyt_s), len(asiat),
                 ", ".join("%s %d" % (n.split(" ")[0], len(r)) for n, r in osiot))]
        for n, r in osiot:
            if not r:
                continue
            rivit += ["", "%s:" % n]
            rivit += ["– " + asiarivi(a, nyt_s, TILA_RIVI_MAX - 2) for a in r if id(a) not in pois]
            puuttuu = [a for a in r if id(a) in pois]
            if puuttuu:
                vanhat = sum(1 for a in puuttuu if ika_pv(a, nyt_s) > VANHA_PV)
                rivit.append("– ja %d muuta%s (tyolista.py avoimet%s)" % (
                    len(puuttuu), ", niistä %d yli %d päivää vanhaa" % (vanhat, VANHA_PV) if vanhat else "",
                    " --kuka " + kuka if kuka else ""))
        return "\n".join(rivit) + "\n"
    jarj = [a for _, r in reversed(osiot) for a in reversed(r)]  # alin osio ja vanhin ensin
    jono = [a for a in jarj if ika_pv(a, nyt_s) > VANHA_PV] + [a for a in jarj if ika_pv(a, nyt_s) <= VANHA_PV]
    teksti = kokoa()
    for a in jono:
        if len(teksti.encode("utf-8")) <= raja:
            break
        pois.add(id(a))
        teksti = kokoa()
    return teksti


def asiakomento(args, tl, polku, nyt_s, nyt):
    """avaa, merkitse, sulje (kirjoittavat; työlistan ts ei muutu) sekä avoimet ja tila (vain tuloste)."""
    asiat = tl.setdefault("asiat", [])
    if args.komento == "tila":
        sys.stdout.write(tila_teksti(avoimet_asiat(asiat, args.kuka), args.kuka, nyt_s))
        return 0
    if args.komento == "avoimet":
        if args.suljetut:
            rivit = [a for a in asiat if isinstance(a, dict) and a.get("suljettu") and (not args.kuka or avain(a.get("kuka", "")) == avain(args.kuka))
                     and (not args.laji or a.get("laji") == args.laji)]
        else:
            rivit = avoimet_asiat(asiat, args.kuka, args.laji)
        if args.vanhat is not None:
            rivit = [a for a in rivit if ika_pv(a, nyt_s) > args.vanhat]
        for a in sorted(rivit, key=lambda a: (ASIA_LAJIT.index(a["laji"]) if a.get("laji") in ASIA_LAJIT else 9, -(a.get("avattu") or 0))):
            print("%s %s: %s" % (a.get("laji"), a.get("kuka"), asiarivi(a, nyt_s, 400)))
            if args.suljetut:
                print("    suljettu %s: %s" % (aikaleima(a["suljettu"].get("ts", 0) / 1000.0), a["suljettu"].get("naytto")))
        print("%d %s" % (len(rivit), "suljettua" if args.suljetut else "avointa"))
        return 0
    if args.komento == "avaa":
        mita = " ".join(args.mita.split())
        if not mita or len(mita) > MITA_MAX:
            raise Virhe("--mita: 1–%d merkkiä (nyt %d); kirjoita lyhyesti, yksityiskohdat merkintöinä" % (MITA_MAX, len(mita)))
        if not args.kuka.strip():
            raise Virhe("--kuka puuttuu (KK, PT tai rooli)")
        lahde(args.sana)
        for k in ("odottaa", "sitten"):
            if getattr(args, k) and len(" ".join(getattr(args, k).split())) > KENTTA_MAX:
                raise Virhe("--%s: enintään %d merkkiä" % (k, KENTTA_MAX))
        if any(avain(a.get("mita", "")) == avain(mita) and avain(a.get("kuka", "")) == avain(args.kuka) for a in avoimet_asiat(asiat)):
            raise Virhe("sama asia on jo auki (%s); lisää merkintä: tyolista.py merkitse <tunnus> \"…\"" % mita[:60])
        asia = {"tunnus": uusi_tunnus(asiat, nyt_s), "avattu": nyt, "kuka": args.kuka.strip(), "laji": args.laji, "mita": mita,
                "sana": " ".join(args.sana.split())}
        for k in ("odottaa", "sitten"):
            if getattr(args, k):
                asia[k] = " ".join(getattr(args, k).split())
        if args.rivi:
            asia["rivi"] = etsi_rivi(tl, args.rivi)["otsikko"]
        asia["merkinnat"] = []
        asiat.append(asia)
        tulos = "%s: avattu %s" % (asia["tunnus"], lahde_teksti(asia["sana"]))
    else:
        asia = etsi_asia(asiat, args.tunnus)
        if asia.get("suljettu"):
            raise Virhe("%s on jo suljettu (%s); uusi asia: tyolista.py avaa" % (asia["tunnus"], asia["suljettu"].get("naytto")))
        if args.komento == "merkitse":
            teksti = " ".join(args.teksti.split())
            if not teksti or len(teksti) > MERKINTA_MAX:
                raise Virhe("merkintä: 1–%d merkkiä" % MERKINTA_MAX)
            asia.setdefault("merkinnat", []).append({"ts": nyt, "teksti": teksti})
            tulos = "%s: merkitty" % asia["tunnus"]
        else:  # sulje
            asia["suljettu"] = {"ts": nyt, "naytto": naytto_ok(args.naytto)}
            tulos = "%s: suljettu" % asia["tunnus"]
    virheet = tarkista(tl)
    if virheet:
        raise Virhe("tarkistin hylkäsi muutoksen, mitään ei tallennettu:\n" + "\n".join("  VIRHE: " + v for v in virheet))
    kirjoita(polku, tl)
    print(tulos)
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
    s.add_argument("--omistajalle", help="≤ 12 sanaa omistajan kielellä: asennussivun rivi ja versiorivi")
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
    s.add_argument("--omistajalle", help="≤ 12 sanaa omistajan kielellä (asettaa tai korvaa)")
    s.add_argument("--pidata-kesken", dest="pidata_kesken", metavar="SYY",
                   help="ESI-ISÄTARKISTUS ei siirrä riviä Valmiina-osioon (KK 20.11. 09.33); tyhjä poistaa")
    s = sub.add_parser("vaihe", help="asennussivun tila: juna-yhdista.zsh (seuraavaan) ja linkin julkaisu (valmis --versio)")
    s.add_argument("otsikko")
    s.add_argument("vaihe", choices=OMISTAJA_VAIHEET)
    s.add_argument("--versio")
    s = sub.add_parser("valmis")
    s.add_argument("otsikko")
    s.add_argument("teksti")
    s.add_argument("--juna", type=int)
    s.add_argument("--juna-kohta", dest="juna_kohta")
    s = sub.add_parser("avaa", help="uusi avoin asia (lähde pakollinen)")
    s.add_argument("--kuka", required=True, help="kuka seuraa: KK, PT tai rooli")
    s.add_argument("--laji", required=True, type=str.upper, choices=ASIA_LAJIT)
    s.add_argument("--mita", required=True, help="≤ 160 merkkiä, kirjoitetaan kerran")
    s.add_argument("--odottaa", help="keneltä tai mitä")
    s.add_argument("--sitten", help="mitä tehdään, kun se tulee")
    s.add_argument("--sana", default="", help="lähde: omistaja:P-…, omistaja:pp.kk. klo hh.mm, KK:<tunnus>, rooli:<nimi>")
    s.add_argument("--rivi", help="työlistan rivin otsikko (tai yksikäsitteinen osa)")
    s = sub.add_parser("merkitse", help="lisää merkinnän avoimeen asiaan")
    s.add_argument("tunnus")
    s.add_argument("teksti")
    s = sub.add_parser("sulje", help="sulkee asian näytöllä")
    s.add_argument("tunnus")
    s.add_argument("--naytto", required=True)
    s = sub.add_parser("avoimet", help="avoimet asiat (ei kirjoita)")
    s.add_argument("--kuka")
    s.add_argument("--laji", type=str.upper, choices=ASIA_LAJIT)
    s.add_argument("--vanhat", type=float, help="vain yli N päivää vanhat")
    s.add_argument("--suljetut", action="store_true")
    s = sub.add_parser("tila", help="aloituksen näkymä ≤ 6 kt (ei kirjoita)")
    s.add_argument("--kuka")
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
