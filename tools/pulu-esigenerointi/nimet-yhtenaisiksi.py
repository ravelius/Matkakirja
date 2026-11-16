#!/usr/bin/env python3
# PAIKANNIMET YHTENÄISIKSI PULUN PAKETEISSA (KK 16.11.2026 klo 07.40; KS:n inventaario proto-3d/_tyo/karttaseppa/paikannimet-20261116/
# EHDOTUS.md; sääntö tekstit-ja-kieli 13 "Nimi kirjoitetaan koko pelissä samoin").
#   Alsace* → Elsass* · Lorraine pysyy · Elsass-Lothringen vain vuosien 1871–1918 alueesta (Alsace-Lorraine, irralliset parit) ·
#   Habsburg-Lothringen pysyy · Tuileries'n / Tuileries'ssa suoralla heittomerkillä; Tuileriat/Tuileriain → Tuileries'n palatsi/rauniot.
# Tunnisteet (kohtien avaimet, syvennys:pariisi-tuileriat) eivät muutu; lisaa-taulun avain seuraa käsitettä (PuluValmiit.Avain).
# Käyttö: python3 -I nimet-yhtenaisiksi.py [--kirjoita] <json>…   → muutokset tulosteeseen (ennen → jälkeen); --kirjoita tallentaa.
# Poistumiskoodi 2, jos lisaa-avain törmää olemassa olevaan tai jäljelle jää vanha muoto.
import json, re, sys

# Kontekstikorjaukset ensin (sanatarkat, KK:n päätöksen kohdat), sitten yleiset taivutussäännöt.
LAUSEET = [
    ("Alsacen ja Lothringenin menetys", "Elsass-Lothringenin menetys"),
    ("Miksi Alsace ja Lothringen olivat niin tärkeitä?", "Miksi Elsass-Lothringen oli niin tärkeä?"),
    ("Elsassin ja Lothringenin alueesta", "Elsass-Lothringenin alueesta"),
    ("lähes koko [[Elsassin]] ja osan Lothringenia", "lähes koko [[Elsassin]] ja osan Lorrainea"),   # 1871: osa Lorrainea, ei aluetta
    ("suuren osan [[Elsassin]] ja Lothringenin alueesta", "suuren osan [[Elsassin]] ja Lorrainen alueesta"),   # vanhempi asu samasta
    ("mutta Tuileriat jäivät paikoilleen", "mutta Tuileries'n rauniot jäivät paikoilleen"),
    ("Mitä Tuileriain paikalla", "Mitä Tuileries'n palatsin paikalla"),
    ("Tuileriain palatsi", "Tuileries'n palatsi"),
    ("Tuileriat sijaitsivat", "Tuileries'n palatsi sijaitsi"),
    ("Tuileriat paloivat", "Tuileries'n palatsi paloi"),
]
# Alsace-Lorraine / Alsace-Lothringen → Elsass-Lothringen (sijamuodon pääte säilyy suomalaisittain).
YHDISTE = re.compile(r"\bAlsace-(?:Lorraine|Lothringen)(n|ssa|sta|en|a|in|issa|ista|iin|ia)?\b")
YHDISTE_P = {None: "", "n": "in", "in": "in", "ssa": "issa", "issa": "issa", "sta": "ista", "ista": "ista", "en": "iin", "iin": "iin", "a": "ia", "ia": "ia"}
ALSACE = re.compile(r"\b(A|a)lsace(lai\w*|n|ssa|sta|en|a|lla|lle|lta|ksi)?\b")
ALSACE_P = {None: "", "n": "in", "ssa": "issa", "sta": "ista", "en": "iin", "a": "ia", "lla": "illa", "lle": "ille", "lta": "ilta", "ksi": "iksi"}
KAAREVA = re.compile(r"Tuileries’")
JAANNOS = re.compile(r"Alsac|Tuileriat|Tuileriain|Tuileries’|Alsace-Lorrain|(?<![Hh]absburg-)(?<!Elsass-)\bLothring")


def korjaa(s):
    for a, b in LAUSEET:
        s = s.replace(a, b)
    s = YHDISTE.sub(lambda m: "Elsass-Lothringen" + YHDISTE_P[m.group(1)], s)

    def alsace(m):
        p = m.group(2)
        if p and p.startswith("lai"):
            return ("E" if m.group(1) == "A" else "e") + "lsassi" + p   # alsacelainen → elsassilainen
        return ("E" if m.group(1) == "A" else "e") + "lsass" + ALSACE_P[p]
    s = ALSACE.sub(alsace, s)
    return KAAREVA.sub("Tuileries'", s)


def avain(k):
    return re.sub(r"\s+", " ", (k or "").strip()).lower()


def kasittele(o, polku, muutokset, virheet):
    if isinstance(o, list):
        return [kasittele(v, f"{polku}[{i}]", muutokset, virheet) for i, v in enumerate(o)]
    if isinstance(o, str):
        u = korjaa(o)
        if u != o:
            muutokset.append((polku, o, u))
        return u
    if not isinstance(o, dict):
        return o
    uusi = {}
    for k, v in o.items():
        v2 = kasittele(v, f"{polku}/{k}", muutokset, virheet)
        k2 = k
        # lisaa-taulun avain = käsite pienellä (PuluValmiit.Avain); kohtien tunnisteet eivät muutu.
        if polku.endswith("/lisaa") and isinstance(v2, dict) and isinstance(v2.get("kasite"), str) and avain(v2["kasite"]) != k:
            k2 = avain(v2["kasite"])
            if k2 in o or k2 in uusi:
                virheet.append(f"{polku}: avain {k!r} → {k2!r} törmää olemassa olevaan")
                k2 = k
            else:
                muutokset.append((f"{polku} (avain)", k, k2))
        uusi[k2] = v2
    return uusi


MUODOT = [(None, False), (2, False), (1, False), (4, False), (None, True), (2, True), (1, True)]


def kirjoitus(d, muoto, rivinvaihto):
    sis, ascii_ = muoto
    return json.dumps(d, ensure_ascii=ascii_, indent=sis, separators=None if sis else (",", ":")) + ("\n" if rivinvaihto else "")


def main(argv):
    kirjoita = "--kirjoita" in argv
    tiedostot = [a for a in argv if a != "--kirjoita"]
    yht, virheet = 0, []
    for f in tiedostot:
        teksti = open(f, encoding="utf-8").read()
        d = json.loads(teksti)
        muutokset = []
        d2 = kasittele(d, "", muutokset, virheet)
        for polku, a, b in muutokset:
            print(f"{f}\t{polku}\n  - {a}\n  + {b}")
        jaljella = [m.group(0) for s in [json.dumps(d2, ensure_ascii=False)] for m in JAANNOS.finditer(s)]
        if jaljella:
            virheet.append(f"{f}: jäljellä {sorted(set(jaljella))}")
        yht += len(muutokset)
        if kirjoita and muutokset:
            # Sama muotoilu kuin alkuperäisessä: valitaan muoto, jolla alkuperäinen toistuu tavulleen; muuten ei kirjoiteta.
            muoto = next((m for m in MUODOT if kirjoitus(d, m, teksti.endswith("\n")) == teksti), None)
            if muoto is None:
                virheet.append(f"{f}: muotoilu ei toistu, ei kirjoitettu")
            else:
                open(f, "w", encoding="utf-8").write(kirjoitus(d2, muoto, teksti.endswith("\n")))
    print(f"MUUTOKSIA {yht} tiedostoissa {len(tiedostot)}" + ("" if kirjoita else " (kuiva ajo)"))
    for v in virheet:
        print("VIRHE", v)
    return 2 if virheet else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
