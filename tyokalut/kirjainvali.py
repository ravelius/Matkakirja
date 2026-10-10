#!/usr/bin/env python3
# KIRJAINVÄLI (Natiivi-UI 25.9.2026; Pelikoodarin mittaus 25.9.): UI Toolkitin letter-spacing ei ole pikseleitä vaan
# TextCoren characterSpacing, yksikkö em/100 (American Typewriter 17,27 pt: arvo 1 lisää ~0,17 pt merkkiä kohden).
# Webistä kopioitu "letter-spacing: 2.4px" antoi siis vain ~1/6 webin harvennuksesta.
#
# Muunnos: webin X px fonttikoossa F px → X / F × 100, ja webin arvo jää kommenttiin: letter-spacing: 15px; /* web 2.4px */
# Merkitty rivi ohitetaan, joten työkalun voi ajaa uudelleen uusille säännöille. Fonttikoko otetaan samasta säännöstä tai,
# jos sitä ei ole, saman viimeisen luokan sääntöä ilman yhdistelmäselektoria etsien (muuten 16 px ja varoitus).
# TUPLAMUUNNOKSEN ESTO (Natiivi-UI 10.10.2026): ebcb70046 muunsi jo UITK-yksiköissä olleet, muulla kommentilla selitetyt
# arvot uudelleen (6,98 → 43,62). Siksi kaikki rivit, joiden perässä on mikä tahansa kommentti, ohitetaan (kommentti =
# arvo on tarkoituksellinen), ja font-size: var(--tk-koko-…) luetaan Tyylikirja.uss:n arvosta (ei 16 px:n oletusta).
#
#   python3 tyokalut/kirjainvali.py            muuntaa kaikki Assets/**/*.uss-tiedostot
#   python3 tyokalut/kirjainvali.py --tarkista listaa merkitsemättömät (uss-tarkistus voi kutsua), exit 1 jos löytyy
import glob, re, sys

MERKKI = "/* web "
tarkista = "--tarkista" in sys.argv
tiedostot = sorted(glob.glob("Assets/**/*.uss", recursive=True))
saannot = re.compile(r"([^{}]+)\{([^{}]*)\}")
MUUNNETTAVA = r"letter-spacing:\s*([-\d.]+)px;(?!\s*/\*)"
tyylikirja = next((open(t, encoding="utf-8").read() for t in tiedostot if t.endswith("/Tyylikirja.uss")), "")
tk_koot = {m.group(1): float(m.group(2)) for m in re.finditer(r"(--tk-koko-[\w-]+):\s*([\d.]+)px", tyylikirja)}


def fonttikoko(runko):
    """Säännön fonttikoko pikseleinä: font-size: Npx tai var(--tk-koko-…), muuten None."""
    fs = re.search(r"font-size:\s*([\d.]+)px", runko)
    if fs:
        return float(fs.group(1))
    fv = re.search(r"font-size:\s*var\((--tk-koko-[\w-]+)\)", runko)
    return tk_koot.get(fv.group(1)) if fv else None


def perusfontit(teksti):
    """Yksinkertaisen luokkaselektorin (.luokka { … }) fonttikoko."""
    koot = {}
    for m in saannot.finditer(teksti):
        sel = m.group(1).strip().split("\n")[-1].strip()
        fs = fonttikoko(m.group(2))
        if fs is not None and re.fullmatch(r"\.[\w-]+", sel):
            koot[sel] = fs
    return koot


kaikki = {}
for f in tiedostot:
    kaikki.update(perusfontit(open(f, encoding="utf-8").read()))

merkitsemattomat = 0
for f in tiedostot:
    teksti = open(f, encoding="utf-8").read()
    ulos, kohta, muutettu = [], 0, 0
    for m in saannot.finditer(teksti):
        runko = m.group(2)
        koko = fonttikoko(runko)
        if koko is None:
            luokat = re.findall(r"\.[\w-]+", m.group(1).strip().split("\n")[-1])
            koko = next((kaikki[l] for l in reversed(luokat) if l in kaikki), None)
            if koko is None:
                koko = 16.0
                if re.search(MUUNNETTAVA, runko):
                    print(f"varoitus: {f}: {m.group(1).strip()[:60]}: ei fonttikokoa, oletus 16 px", file=sys.stderr)

        def muunna(r):
            global merkitsemattomat
            x = float(r.group(1))
            if x == 0:
                return r.group(0)
            merkitsemattomat += 1
            arvo = round(x / koko * 100, 2)
            return f"letter-spacing: {arvo:g}px; {MERKKI}{x:g}px */"

        uusi = re.sub(MUUNNETTAVA, muunna, runko)
        if uusi != runko:
            muutettu += 1
        ulos.append(teksti[kohta:m.start(2)])
        ulos.append(uusi)
        kohta = m.end(2)
    ulos.append(teksti[kohta:])
    if muutettu and not tarkista:
        open(f, "w", encoding="utf-8").write("".join(ulos))
        print(f"{f}: {muutettu} sääntöä")

if tarkista and merkitsemattomat:
    print(f"kirjainvali: {merkitsemattomat} merkitsemätöntä letter-spacing-arvoa (aja tyokalut/kirjainvali.py)")
    sys.exit(1)
