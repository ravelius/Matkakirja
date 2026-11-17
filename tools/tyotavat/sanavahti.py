#!/usr/bin/env python3
"""SANAVAHTI (muisti pala 5; suunnitelma scratchpad/keskustelukanava/suunnitelmat/20261117-muisti-ilman-uudelleenkertomista.md,
luvut 4, 5 ja 7). Yksi moottori, säännöt tietona tiedostossa sanavahti-saannot.json (uusi vartija = uusi sääntörivi).
Pohjana mittausehto-vahti.py (ennallaan; sen S-01-lausekkeet ovat tämän S-01:n pohja).

Säännöt (vain varoitus, ei koskaan estä; esto vasta omistajan luvalla, luku 7):
  S-01            ei junaan ennen mittausta / laitelukuja / yöajoa (omistaja P-261117-55)
  S-02            ei junaan ennen koetta / kuva-ajoa / paria / KK:n katsetta (P-261116-20/21); sallittu vain lajissa koe
  OMISTAJAN-NIMI  ehto, jossa "(omistaja pp.kk. hh.mm)" ilman P-tunnusta; tarkistaa päätöslokista
  KK-PAATOS       "KK:N PÄÄTÖS" ilman merkintää "aiempi: P-…" tai "ei aiempaa (haettu: …)"

Käyttö:
  python3 -I sanavahti.py --kerran [--paiva VVVVKKPP | --kaikki] [tiedosto …]   pyyhkäisy kerran; poistumiskoodi 1 jos osumia
  python3 -I -u sanavahti.py --vahti                                           Monitor: 5 min välein vain uudet osumat
  echo "teksti" | python3 -I sanavahti.py --teksti                              yksittäinen teksti (viestit); koodi 1 jos osumia
  python3 -I sanavahti.py --hook < hook.json                                    PostToolUse (viesti) / UserPromptSubmit (talteen)
  python3 -I sanavahti.py --itsetesti                                           esimerkit + vanhat rikkomukset + säännön oma teksti
Pyyhkäisyn lähteet: päivän luovutukset (/Users/Shared/Claude/luovutukset/), KK:n aloitus.md ja odottaa-ja-luvatut.md,
päivän tehtavat/, työlistan avoimet rivit ja kirjanpidon (tyolista.json "asiat") avoimet asiat.
Tulosterivi: SANAVAHTI|<sääntö>|<lähde>|<rivi>|<teksti>; viestille lisäksi korjausohje ja talteenotto (kirjaa / tyolista.py avaa).
"""
import glob
import json
import os
import re
import sys
import time

HAKEMISTO = os.path.dirname(os.path.abspath(__file__))
SAANNOT = os.environ.get("SANAVAHTI_SAANNOT") or os.path.join(HAKEMISTO, "sanavahti-saannot.json")
JUURI = "/Users/Shared/Claude/Matkakirja-fable"
KK = JUURI + "/scratchpad/keskustelukanava"
TYOLISTA = os.environ.get("SANAVAHTI_TYOLISTA") or JUURI + "/scratchpad/asemataulu/data/talo/tyolista.json"
LUOVUTUKSET = os.environ.get("SANAVAHTI_LUOVUTUKSET") or "/Users/Shared/Claude/luovutukset"
PAATOKSET = JUURI + "/docs/raamattu/paatokset"
SUUNNITELMA = KK + "/suunnitelmat/20261117-muisti-ilman-uudelleenkertomista.md"
P_TUNNUS = re.compile(r"P-\d{6}-\d+")
TALTEEN = ("TALTEEN: jos ehto on aiheellinen, kirjaa se kerran lähteen kanssa: python3 -I tools/asemataulu/tyolista.py avaa "
           "--kuka <KK|PT|rooli> --laji EHTO --mita \"…\" --sana <omistaja:P-…|KK:<tunnus>|rooli:<nimi>> (ilman omistajan "
           "P-tunnusta se on KK:n tai roolin oma ehto). Omistajan pysyvät sanat: node tools/kirjaa.mjs sanat [--rooli X].")


# ---------------------------------------------------------------- säännöt

class Saanto:
    def __init__(self, d, mitta, ehto):
        self.d = d
        self.tunnus = d["tunnus"]
        self.laji = d.get("laji", "rivi")
        liput = 0 if d.get("kirjainkoko") else re.I

        def k(x, f=liput):
            return re.compile(x.replace("{MITTA}", mitta).replace("{EHTO}", ehto), f)
        self.este = [k(x) for x in d.get("este", [])]
        self.salli = [k(x, re.I) for x in d.get("salli", [])] + [k(x, 0) for x in d.get("salli_kirjainkoko", [])]
        self.vaatii = k(d["vaatii"], re.I) if d.get("vaatii") else None
        self.nimi = k(d["nimi_lauseke"], re.I) if d.get("nimi_lauseke") else None
        self.ikkuna = int(d.get("ikkuna", 1))
        self.nimi_ikkuna = int(d.get("nimi_ikkuna", 80))
        self.korjaus = d.get("korjaus", "")


def lataa_saannot(polku=SAANNOT):
    with open(polku, encoding="utf-8") as f:
        d = json.load(f)
    return [Saanto(s, d.get("mitta", ""), d.get("ehto", "")) for s in d["saannot"]], d.get("talteen") or {}


def lainauksessa(rivi, alku):
    """Osuma lainausmerkkien sisällä on säännön lainaus, ei ehto (esim. 'Älä kirjoita ehtoja "ei junaan ennen mittausta"')."""
    ennen = rivi[:alku]
    return ennen.count('"') % 2 == 1 or ennen.count("“") > ennen.count("”") or ennen.count("«") > ennen.count("»")


_loki = None


def paatosloki():
    global _loki
    if _loki is None:
        _loki = []
        for p in sorted(glob.glob(PAATOKSET + "/*.md")):
            try:
                with open(p, encoding="utf-8", errors="replace") as f:
                    _loki.extend(r for r in f if r.startswith("- [P-"))
            except OSError:
                pass
    return _loki


def etsi_omistajan_sana(m):
    """(pp, kk, hh, mm) nimi-lausekkeen osumasta → päätöslokin P-tunnukset samalta päivältä ja tunnilta."""
    g = m.groups()
    pp, kk, hh, mi = (g[0], g[1], g[2], g[3]) if g[0] else (None, None, g[4], g[5])
    if pp and not (1 <= int(pp) <= 31 and 1 <= int(kk) <= 12):  # "omistaja 21.16" = kellonaika
        pp, kk, hh, mi = None, None, pp, kk
    osumat = []
    for r in paatosloki():
        if pp and not re.search(r"\b%d\.%d\.20\d\d\b" % (int(pp), int(kk)), r):
            continue
        if hh and not re.search(r"klo %02d\.%s" % (int(hh), mi[0]), r) and not re.search(r"klo %d\.%s" % (int(hh), mi[0]), r):
            continue
        if not pp and not hh:
            continue
        t = P_TUNNUS.search(r)
        if t:
            osumat.append(t.group(0))
    return osumat if pp else osumat[-3:]  # pelkkä kellonaika: vain arvaus, enintään 3


def tarkista_teksti(teksti, saannot, nimi="teksti"):
    """Palauttaa listan (sääntö, nimi, rivinro, rivi, lisätieto)."""
    rivit = teksti.splitlines()
    out = []
    for i, rivi in enumerate(rivit):
        for s in saannot:
            if any(x.search(rivi) for x in s.salli):
                continue
            m = None
            for e in s.este:
                for mm in e.finditer(rivi):
                    if not lainauksessa(rivi, mm.start()):
                        m = mm
                        break
                if m:
                    break
            if not m:
                continue
            lisa = ""
            if s.laji == "puuttuu":
                ikkuna = "\n".join(rivit[i:i + s.ikkuna]) if nimi != "viesti" else teksti
                if s.vaatii and s.vaatii.search(ikkuna):
                    continue
            elif s.laji == "omistaja-lahde":
                # nimi kuuluu ehtoon vain, jos se tulee ehdon jälkeen (esim. "ei junaan ennen lukuja (omistaja 16.11. 15.50)");
                # "Omistaja 21.41: kokeillaan …; ei junaan ilman korttia" kertoo työn lähteen, ei ehdon lähdettä
                n = next((x for x in s.nimi.finditer(rivi) if m.start() <= x.start() <= m.end() + s.nimi_ikkuna), None) if s.nimi else None
                if not n:
                    continue
                loydetyt = etsi_omistajan_sana(n)
                lisa = ("päätöslokissa samalta ajalta: %s (tarkista, tukeeko sana ehtoa)" % ", ".join(loydetyt) if loydetyt
                        else "omistajan sanaa ei löydy päätöslokista tältä ajalta")
            out.append((s, nimi, i + 1, rivi.strip()[:220], lisa))
    return out


# ---------------------------------------------------------------- pyyhkäisy

def lue(p):
    with open(p, encoding="utf-8", errors="replace") as f:
        return f.read()


def lahteet(paiva=None, kaikki=False, tiedostot=None):
    if tiedostot:
        for p in tiedostot:
            yield os.path.basename(p), lue(p)
        return
    paiva = paiva or time.strftime("%Y%m%d")
    for p in (KK + "/aloitus.md", KK + "/odottaa-ja-luvatut.md"):
        if os.path.exists(p):
            yield "kk:" + os.path.basename(p), lue(p)
    kuvio = "/*.md" if kaikki else "/*-%s*.md" % paiva
    for p in sorted(glob.glob(LUOVUTUKSET + kuvio)):
        yield os.path.basename(p), lue(p)
    for p in sorted(glob.glob(KK + "/tehtavat/%s*.md" % paiva)):
        yield "tehtavat:" + os.path.basename(p), lue(p)
    try:
        d = json.load(open(TYOLISTA, encoding="utf-8"))
    except (OSError, ValueError):
        yield "tyolista-virhe", ""
        return
    for r in d.get("rivit", []):
        if not isinstance(r, dict) or str(r.get("tila", "")).startswith(("tehty", "valmis")):
            continue
        nyky = str(r.get("tilanne", "")).split("\n\nAiempi:")[0]
        yield "tyolista:" + str(r.get("otsikko", "?"))[:50], "\n".join(str(r.get(k, "")) for k in ("teksti", "lisa")) + "\n" + nyky
    for a in d.get("asiat", []) or []:
        if not isinstance(a, dict) or a.get("suljettu"):
            continue
        osat = [str(a.get(k, "")) for k in ("mita", "odottaa", "sitten")]
        osat += [str(m.get("teksti", "")) for m in a.get("merkinnat") or [] if isinstance(m, dict)]
        sana = str(a.get("sana", ""))
        teksti = "\n".join(x for x in osat if x)
        # Kirjanpidon EHTO, jonka lähde on omistaja ilman P-tunnusta: nimi tarkistetaan lokista (luku 7, omistajan nimi ehdossa)
        if a.get("laji") == "EHTO" and sana.lower().startswith("omistaja:") and not P_TUNNUS.search(sana):
            teksti += "\nEHTO: ei junaan ennen ehtoa (%s)" % sana.replace(":", " ", 1)
        yield "asia:%s" % a.get("tunnus", "?"), teksti


def pyyhi(saannot, **kw):
    out = []
    for nimi, teksti in lahteet(**kw):
        out.extend(tarkista_teksti(teksti, saannot, nimi))
    return out


def rivi_ulos(o):
    s, nimi, i, t, lisa = o
    return "SANAVAHTI|%s|%s|%d|%s%s" % (s.tunnus, nimi, i, t, (" ‖ " + lisa) if lisa else "")


# ---------------------------------------------------------------- viesti ja hook

def viestin_varoitus(osumat):
    if not osumat:
        return ""
    rivit = ["SANAVAHTI (varoitus, ei estä): lähtevässä tekstissä %d osumaa omistajan pysyvää sanaa vastaan. "
             "Lähetä korjaus vastaanottajalle SAMASSA VUOROSSA." % len(osumat)]
    nahty = set()
    for s, _, i, t, lisa in osumat:
        rivit.append("- %s rivi %d: %s%s" % (s.tunnus, i, t[:180], (" (" + lisa + ")") if lisa else ""))
        if s.tunnus not in nahty:
            nahty.add(s.tunnus)
            rivit.append("  KORJAUS %s: %s" % (s.tunnus, s.korjaus))
    rivit.append(TALTEEN)
    return "\n".join(rivit)


def talteen_muistutus(prompt, talteen):
    """Omistajan viesti (ei cross-session, ei ajastus): mahdollinen pysyvä sana tai toisto (luku 4, Talteenotto)."""
    p = str(prompt or "")
    if not p.strip() or "cross-session-message" in p or p.lstrip().startswith(("JONOKIERROS", "<", "Another Claude session")):
        return ""
    m = re.search(talteen.get("lauseke") or r"(?!)", p, re.I)
    if not m:
        return ""
    return ("SANAVAHTI (talteenotto): omistajan viestissä \"%s\": mahdollinen pysyvä sana tai toisto. Kirjaa: "
            "node tools/kirjaa.mjs paatos <aihe> --klo HH.MM --kuka KK \"<sanat>\" --pysyva \"<nimi>\" --roolit kaikki|… "
            "tai --toisto S-nn (näe ensin: node tools/kirjaa.mjs sanat), tai sano miksi ei." % m.group(0))


def viestin_teksti(tool_input):
    ti = tool_input or {}
    for k in ("message", "text", "content", "prompt"):
        if isinstance(ti.get(k), str) and ti.get(k).strip():
            return ti[k]
    return ""


def hook_teksti(d, saannot=None, talteen=None):
    """Palauttaa varoitustekstin tai tyhjän. Kutsutaan pt-taulu-muistutus.py:stä (sama kansio) tai --hook-tilassa."""
    if saannot is None:
        saannot, talteen = lataa_saannot()
    tapahtuma = d.get("hook_event_name") or "PostToolUse"
    if tapahtuma == "UserPromptSubmit":
        return talteen_muistutus(d.get("prompt"), talteen or {})
    return viestin_varoitus(tarkista_teksti(viestin_teksti(d.get("tool_input")), saannot, "viesti"))


# ---------------------------------------------------------------- itsetesti

VANHAT = [  # (tiedosto luovutuksissa, rivi, sääntö, rivin teksti, jos tiedosto puuttuu)
    ("natiivi-ui-20261117-0640.md", 49, "S-01",
     "  fps, liuku) kolmelta nostolta YHTENÄ viestinä KK:lle + arvio syystä, jos iPad nykii. Ei junaan ennen lukuja. Macin VIERITYS3 = kuiva-ajo."),
    ("natiivi-ui-20261117-0900.md", 29, "S-01",
     "  KK 09.01 hyväksyi (linkki 224.205 ensin). Analyysi: Lavoisier 1. vs 4. (järjestys), 4. vs 5. (sumennus). Tulos YHTENÄ viestinä KK:lle: yli 20 ms nostoittain, GPU ms, alkuviive; f7021c838 EI junaan ennen laitelukuja."),
    ("natiivi-ui-20261117-0805.md", 19, "S-01",
     "  Jos alkuviive > 50 ms: EHDOTA (älä tee) 60 fps heti kosketuksen alusta noston ollessa auki. Ei junaan ennen laitelukuja."),
    ("ju-ei-junaan-20261117.md", 30, "KK-PAATOS",
     "## KK:N PÄÄTÖS 17.11. klo 12.51 (taulusta; KK tarkisti itse gitistä junan 3bbf0ba06 esi-isät: 693c26153, 16cdf9d17, 3d5aaa932, 58c85e854, 9599dd931, 1ce092cdc JUNASSA; ff30da2cc, 28055a6ad, 6630a3daa, 092a57421, e73dd2071, c5082b36c, 976432ff7 EI)"),
    (KK + "/arkisto/aloitus-historia-20261117-0752.md", 56, "OMISTAJAN-NIMI",  # TULOS-periytyminen P7 (ei luovutus)
     "- NUI: … iPadin GPU 30,7 ms nosto auki → NUI KORJAA (… kuvapari); ei junaan ennen lukuja (omistaja 16.11. 15.50). Ve"),
    ("pelikoodari-20261116-2350.md", 29, "S-02",
     "  EI JUNAAN ennen M4:ää (16e8413f2, KK:n sana) ja KK:n kuuntelua; yöajo (kaappaus) puuttuu."),
]

OMA_TEKSTI = [  # säännön oma teksti (suunnitelman luvut 4 ja 7) ei saa osua; käytetään, jos suunnitelmaa ei ole
    'S-01 MITTAUSTA EI ODOTETA · sanottu 8 kertaa, viimeksi 17.11.2026 klo 12.26 [P-261117-55] · roolit: kaikki · vartija: sanavahti mittausehto',
    '  "ei koskaan odoteta mittausta vaan lisätään kaikki aina heti peliin ilman mittausta. …"',
    '| S-01 mittausta ei odoteta | on: mittausehto-vahti → sanavahdin ensimmäinen sääntö; lisäksi viestit ja kirjanpito | PT | ei |',
    '| S-02 ilman koetta | sanavahti: "ei junaan ennen … (koe, kuva-ajo, pari, KK:n katse)" omistajan pyytämässä työssä; sallittu vain lajissa koe | PT | ei |',
    '| KK päättää hakematta aiempaa sanaa (3+ kertaa) | sanavahti lähtevään viestiin: "KK:N PÄÄTÖS" ilman merkintää "aiempi: P-…" tai "ei aiempaa (haettu: …)" → varoitus | PT | ei |',
    '| Omistajan nimi KK:n ehdossa | kirjanpito: lähde `omistaja:` vaatii P-tunnuksen tai päivän ja kellonajan, jonka kone löytää lokista tai tallenteesta | PT | ei |',
    'Huomaa, että rikkomus ei ollut itse junasanassa (sen tekee jo junasana.zsh) vaan sanan pidättämisessä: KK:n viesteissä rooleille, tehtävänannoissa ja tilariveissä.',
]


def suunnitelman_luvut(polku, luvut=("4", "5", "7")):
    try:
        t = lue(polku)
    except OSError:
        return None
    osat = re.split(r"(?m)^## ", t)
    return "\n".join(o for o in osat if o.split(".", 1)[0].strip() in luvut)


def itsetesti():
    saannot, talteen = lataa_saannot()
    virheet, ok = [], 0
    by = {s.tunnus: s for s in saannot}
    # 1. sääntöjen omat esimerkit
    for s in saannot:
        ex = s.d.get("esimerkit") or {}
        for t in ex.get("osuu", []):
            if any(o[0].tunnus == s.tunnus for o in tarkista_teksti(t, [s])):
                ok += 1
            else:
                virheet.append("%s ei osunut: %s" % (s.tunnus, t[:90]))
        for t in ex.get("ei_osu", []):
            o = tarkista_teksti(t, saannot)
            if o:
                virheet.append("%s väärä hälytys (%s): %s" % (s.tunnus, o[0][0].tunnus, t[:90]))
            else:
                ok += 1
        if not ex.get("osuu") or not ex.get("ei_osu"):
            virheet.append("%s: esimerkit puuttuvat" % s.tunnus)
    # 2. vanhat rikkomukset luovutuksista (tiedostosta, jos on; muuten talletettu kopio)
    vanhat_ulos = []
    for tiedosto, nro, tunnus, kopio in VANHAT:
        p = os.path.join(LUOVUTUKSET, tiedosto)
        rivi, lahde = kopio, "kopio"
        if os.path.exists(p):
            rr = lue(p).splitlines()
            if len(rr) >= nro:
                rivi, lahde = rr[nro - 1], "tiedosto"
        o = [x for x in tarkista_teksti(rivi, saannot, os.path.basename(tiedosto)) if x[0].tunnus == tunnus]
        if o:
            ok += 1
            vanhat_ulos.append("  osuu %s %s:%d (%s): %s" % (tunnus, os.path.basename(tiedosto), nro, lahde, rivi.strip()[:120]))
        else:
            virheet.append("vanha rikkomus ei osunut: %s:%d %s" % (tiedosto, nro, tunnus))
    # 3. säännön oma teksti: suunnitelman luvut 4, 5 ja 7 sekä talletettu kopio ja tämän ohjelman ohje
    luvut = suunnitelman_luvut(SUUNNITELMA)
    for nimi, teksti in (("suunnitelma luvut 4/5/7", luvut), ("oma teksti (kopio)", "\n".join(OMA_TEKSTI)),
                         ("sanavahti.py ohje", __doc__), ("mittausehto-vahti.py ohje", _mittausehto_ohje())):
        if teksti is None:
            continue
        o = tarkista_teksti(teksti, saannot, nimi)
        if o:
            virheet.extend("säännön oma teksti osui: %s" % rivi_ulos(x) for x in o)
        else:
            ok += 1
    # 4. hook: viesti ja omistajan talteenotto
    v = hook_teksti({"hook_event_name": "PostToolUse", "tool_input": {"message": "NS: valmis. Ei junaan ennen iPad-lukuja."}},
                    saannot, talteen)
    (virheet.append("hook-viesti ei varoittanut") if "SANAVAHTI" not in v or "tyolista.py avaa" not in v else None)
    if not hook_teksti({"hook_event_name": "PostToolUse", "tool_input": {"message": "NS: valmis, junaan heti."}}, saannot, talteen) == "":
        virheet.append("hook-viesti väärä hälytys")
    t = hook_teksti({"hook_event_name": "UserPromptSubmit", "prompt": "sanoin jo että iPhonella ei testata"}, saannot, talteen)
    (virheet.append("talteenotto ei muistuttanut") if "kirjaa.mjs" not in t else None)
    if hook_teksti({"hook_event_name": "UserPromptSubmit", "prompt": '<cross-session-message from="x">aina</cross-session-message>'},
                   saannot, talteen):
        virheet.append("talteenotto muistutti roolin viestistä")
    ok += 4 - sum(1 for x in virheet if x.startswith(("hook", "talteen")))
    print("\n".join(vanhat_ulos))
    for x in virheet:
        print("VIRHE: " + x)
    print("sanavahti itsetesti: %d ok, %d virhettä (%d sääntöä)" % (ok, len(virheet), len(saannot)))
    return 0 if not virheet else 1


def _mittausehto_ohje():
    p = os.path.join(HAKEMISTO, "mittausehto-vahti.py")
    try:
        t = lue(p)
    except OSError:
        return None
    m = re.search(r'"""(.*?)"""', t, re.S)
    return m.group(1) if m else None


# ---------------------------------------------------------------- pää

def main(argv):
    if "--itsetesti" in argv:
        return itsetesti()
    if "--hook" in argv:
        try:
            d = json.load(sys.stdin)
            t = hook_teksti(d)
            if t:
                print(json.dumps({"hookSpecificOutput": {"hookEventName": d.get("hook_event_name") or "PostToolUse",
                                                         "additionalContext": t}}, ensure_ascii=False))
        except Exception:  # noqa: BLE001 — hook ei saa koskaan kaataa vuoroa
            pass
        return 0
    saannot, _ = lataa_saannot()
    if "--teksti" in argv:
        o = tarkista_teksti(sys.stdin.read(), saannot, "viesti")
        if o:
            print(viestin_varoitus(o))
        return 1 if o else 0
    paiva = argv[argv.index("--paiva") + 1] if "--paiva" in argv else None
    tiedostot = [a for a in argv if not a.startswith("--") and a != paiva]
    kw = dict(paiva=paiva, kaikki="--kaikki" in argv, tiedostot=tiedostot)
    if "--vahti" not in argv:
        o = pyyhi(saannot, **kw)
        for x in o:
            print(rivi_ulos(x))
        if o:
            print(TALTEEN)
        print("sanavahti: %d osumaa" % len(o))
        return 1 if o else 0
    nahty, eka, aloitus_mtime = set(), True, None
    while True:
        saannot, _ = lataa_saannot()  # säännöt luetaan joka kierroksella: uusi rivi tiedostoon riittää
        o = pyyhi(saannot, **kw)
        for x in o:
            avain = (x[0].tunnus, x[1], x[3])
            if avain not in nahty:
                nahty.add(avain)
                print(rivi_ulos(x), flush=True)
        try:
            mt = os.path.getmtime(KK + "/aloitus.md")
            if aloitus_mtime is not None and mt != aloitus_mtime:
                print("SANAVAHTI-ALOITUS|aloitus.md muuttui %s" % time.strftime("%H.%M", time.localtime(mt)), flush=True)
            aloitus_mtime = mt
        except OSError:
            pass
        if eka:
            print("SANAVAHTI-TILA|%d osumaa alussa" % len(o), flush=True)
            eka = False
        time.sleep(300)


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
