#!/usr/bin/env python3
"""Todistusajon apuri (Pelikoodari 5.10.2026), todistusajo.sh kutsuu:
  etsi <ui-puu.json> <teksti> <leveys_pt> <korkeus_pt> [fx fy]  → "x y" pisteinä (näkyvän elementin keskipiste tai
      kohta fx,fy ∈ 0–1 elementin laatikossa: 0,0 vasen yläkulma; esim. Tavlin piste laudalla, joystickin reuna)
  raportti <kansio> <erä> <versio> <laite> <udid> <skenaario>
                                                         → merkityt kuvat, kuva-arkki.png, ääniarvot, TODISTUS.md
"""
import json, os, re, subprocess, sys
from collections import defaultdict

OTSIKOT = {
    "1": "Build ja asennus", "2": "Napautuspolku oikeilla kosketuksilla", "3": "Poikkeukset ja virherivit",
    "4": "Stillit tiloista", "5": "Ääni", "6": "Aiemmat palautteet", "7": "Kone kuormassa", "8": "Ei testattu",
}


def etsi(puu, haku, kw, kh, fx=0.5, fy=0.5):
    d = json.load(open(puu))
    pw, ph = d["paneeli"]["w"] or 1, d["paneeli"]["h"] or 1
    kw, kh = float(kw), float(kh)
    # Vaakanäkymä (linna) pystysimussa: paneeli on vaaka, ruutu pysty → kierretty 90°: x = W − y_v, y = x_v (Laitetestaaja 5.10.)
    kierretty = (pw > ph) != (kw > kh)
    h = haku.strip().lower()
    # "luokka#n": n:s täsmäosuma vasemmalta (samanluokkaiset kuvakenapit ilman tekstiä, esim. oppaan ☰ = mk-ohjausnappi#2)
    nro = 0
    if "#" in h and h.rsplit("#", 1)[1].lstrip("-").isdigit():   # #-1 = oikeanpuoleisin
        h, nro = h.rsplit("#", 1)[0], int(h.rsplit("#", 1)[1])
    ehdokkaat = []
    for e in d["elementit"]:
        teksti, nimi = (e.get("teksti") or "").strip().lower(), (e.get("nimi") or "").lower()
        if e.get("opasiteetti", 1) < 0.3 or e["w"] <= 0 or e["h"] <= 0:
            continue
        luokat = (e.get("luokat") or "").lower().split()
        if teksti == h or nimi == h or h in luokat:   # luokka: kuvakenapit ilman tekstiä (esim. mk-linssitNappi)
            ehdokkaat.append((0, -e["kerros"], e))
        elif h and (h in teksti):
            ehdokkaat.append((1, -e["kerros"], e))
    if not ehdokkaat:
        return
    ehdokkaat.sort(key=lambda t: (t[0], t[1]))   # täsmäosuma ensin, ylin kerros ensin
    e = ehdokkaat[0][2]
    if nro:
        tasma = sorted((t[2] for t in ehdokkaat if t[0] == 0 and t[1] == ehdokkaat[0][1]), key=lambda x: (x["x"], x["y"]))
        if len(tasma) < abs(nro):
            return
        e = tasma[nro - 1] if nro > 0 else tasma[nro]
    cx, cy = e["x"] + e["w"] * float(fx), e["y"] + e["h"] * float(fy)
    if kierretty:
        print(f"{kw - cy * kw / ph:.1f} {cx * kh / pw:.1f}")
    else:
        print(f"{cx * kw / pw:.1f} {cy * kh / ph:.1f}")


def laske(puu, luokka):
    d = json.load(open(puu))
    n = sum(1 for e in d["elementit"] if luokka in (e.get("luokat") or "").split() and e.get("opasiteetti", 1) >= 0.3)
    print(n)


def fontti(koko):
    from PIL import ImageFont
    for p in ("/System/Library/Fonts/Supplemental/Arial Bold.ttf", "/System/Library/Fonts/Helvetica.ttc",
              "/Library/Fonts/Arial Unicode.ttf"):
        if os.path.exists(p):
            return ImageFont.truetype(p, koko)
    return ImageFont.load_default()


def merkitse(raaka, ulos, teksti):
    from PIL import Image, ImageDraw
    im = Image.open(raaka).convert("RGB")
    w, h = im.size
    f = fontti(max(18, w // 26))
    kerros = Image.new("RGBA", im.size, (0, 0, 0, 0))
    dr = ImageDraw.Draw(kerros)
    rivit, rivi = [], ""
    for sana in teksti.split(" "):   # rivitys leveyteen
        koe = (rivi + " " + sana).strip()
        if dr.textlength(koe, font=f) > w * 0.94 and rivi:
            rivit.append(rivi); rivi = sana
        else:
            rivi = koe
    rivit.append(rivi)
    rk = int(f.size * 1.25)
    # Merkintä ALAREUNAAN (5.10.: yläreunan palkki peitti iPadilla kuvaselitteen, eli juuri todistettavan kohdan).
    korkeus = rk * len(rivit) + rk // 2
    y0 = h - korkeus
    dr.rectangle([0, y0, w, h], fill=(0, 0, 0, 165))
    for i, r in enumerate(rivit):
        dr.text((int(w * 0.03), y0 + rk // 4 + i * rk), r, font=f, fill=(255, 255, 255, 255))
    Image.alpha_composite(im.convert("RGBA"), kerros).convert("RGB").save(ulos, optimize=True)
    return w, h


def arkki(kuvat, ulos, sarakkeet):
    from PIL import Image
    if not kuvat:
        return
    ims = [Image.open(k) for k in kuvat]
    kork = 900
    pienet = [im.resize((int(im.width * kork / im.height), kork)) for im in ims]
    lev = max(p.width for p in pienet)
    rivit = (len(pienet) + sarakkeet - 1) // sarakkeet
    a = Image.new("RGB", (lev * min(sarakkeet, len(pienet)), kork * rivit), (0, 0, 0))
    for i, p in enumerate(pienet):
        a.paste(p, ((i % sarakkeet) * lev, (i // sarakkeet) * kork))
    a.save(ulos, optimize=True)


def aanitiedot(polku):
    r = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "stream=codec_type,codec_name,sample_rate,channels:format=duration",
                        "-of", "json", polku], capture_output=True, text=True)
    try:
        d = json.loads(r.stdout)
    except ValueError:
        return None
    s = next((s for s in d.get("streams", []) if s.get("codec_type") == "audio"), None)
    v = subprocess.run(["ffmpeg", "-hide_banner", "-nostats", "-i", polku, "-af", "volumedetect", "-f", "null", "-"],
                       capture_output=True, text=True).stderr
    mean = re.search(r"mean_volume: (\S+) dB", v)
    peak = re.search(r"max_volume: (\S+) dB", v)
    return {"virta": s, "kesto": float(d.get("format", {}).get("duration", 0) or 0),
            "mean": mean.group(1) if mean else "?", "max": peak.group(1) if peak else "?"}


def lue_tsv(p):
    if not os.path.exists(p):
        return []
    return [r.rstrip("\n").split("\t") for r in open(p, encoding="utf-8") if r.strip()]


def raportti(L, era, versio, laite, udid, skenaario):
    tulokset = defaultdict(list)
    for r in lue_tsv(f"{L}/tulokset.tsv"):
        tulokset[r[0]].append((r[1], r[2] if len(r) > 2 else ""))

    # 4 kuvat: merkinnät suoraan kuvaan (tila · laite + suunta · versio), sitten arkki
    valmiit = []
    for tunnus, selite in lue_tsv(f"{L}/kuvat.tsv"):
        raaka = f"{L}/kuvat/{tunnus}.raaka.png"
        ulos = f"{L}/kuvat/{tunnus}.png"
        if not os.path.exists(raaka) and os.path.exists(ulos):   # raportin uusinta: kuva on jo merkitty
            from PIL import Image
            w, h = Image.open(ulos).size
            valmiit.append(ulos)
            tulokset["4"].append(("OK", f"[{tunnus}.png](kuvat/{tunnus}.png): {selite} ({w}×{h} px, {'pysty' if h >= w else 'vaaka'})"))
            continue
        if not os.path.exists(raaka):
            tulokset["4"].append(("PUUTE", f"{tunnus}: kuvakaappaus epäonnistui"))
            continue
        from PIL import Image
        w, h = Image.open(raaka).size
        suunta = "pysty" if h >= w else "vaaka"
        merkitse(raaka, ulos, f"{selite} · {laite} {suunta} · {versio}")
        os.makedirs(f"{L}/kuvat/raaka", exist_ok=True)
        os.replace(raaka, f"{L}/kuvat/raaka/{tunnus}.png")   # merkitsemätön talteen (merkintä ei saa hävittää sisältöä)
        valmiit.append(ulos)
        tulokset["4"].append(("OK", f"[{tunnus}.png](kuvat/{tunnus}.png): {selite} ({w}×{h} px, {suunta})"))
    if valmiit:
        arkki(valmiit, f"{L}/kuva-arkki.png", 4 if laite == "iphone" else 3)
    else:
        tulokset["4"].append(("PUUTE", "ei yhtään stilliä (skenaariossa ei kuva-rivejä)"))
    if not any("vaaka" in t for _, t in tulokset["4"]):
        tulokset["8"].append(("EI", "vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella"))

    # 5 ääni: ffprobe + volumedetect jokaisesta kaappauksesta. <nimi>.wav = Unityn miksaus, <nimi>-natiivi.wav =
    # AVAudioEnginen äänet (silmukat, puhekanava). Pari on hiljainen vain, jos kumpikin on hiljainen; yksittäinen
    # hiljainen puolisko on normaali (esim. linssin humina soi vain natiivisti) → HUOM.
    parit = defaultdict(dict)
    for f in sorted(os.listdir(f"{L}/aani")):
        if f.endswith(".wav"):
            parit[f[:-len("-natiivi.wav")] if f.endswith("-natiivi.wav") else f[:-4]][f] = aanitiedot(f"{L}/aani/{f}")
    for nimi, tiedostot in parit.items():
        aanessa = False
        rivit = []
        for f, a in tiedostot.items():
            if not a or not a["virta"]:
                rivit.append(("PUUTE", f"{f}: ei ääniraitaa"))
                continue
            s = a["virta"]
            hiljainen = a["max"] in ("?", "-inf") or float(a["max"]) <= -80
            aanessa |= not hiljainen
            rivit.append(("HUOM" if hiljainen else "OK",
                          f"[{f}](aani/{f}): {s.get('codec_name')} {s.get('sample_rate')} Hz {s.get('channels')} kan, "
                          f"{a['kesto']:.1f} s, mean {a['mean']} dB, max {a['max']} dB" + (" — hiljainen" if hiljainen else "")))
        if not aanessa:
            rivit = [("PUUTE" if t == "HUOM" else t, x.replace("— hiljainen", "— HILJAINEN")) for t, x in rivit]
        tulokset["5"] += rivit
    if not tulokset["5"] or all(t.startswith("testimykistys") for _, t in tulokset["5"]):
        tulokset["5"].append(("EI", "erässä ei äänikaappausta (skenaariossa ei aani-/aanitaso-riviä)"))
    if any(t == "KUORMA" for t, _ in tulokset["7"]):
        tulokset["8"].append(("EI", "A/V-ajoitus, fps ja laatu: kone kuormassa"))
    else:
        tulokset["8"].append(("EI", "A/V-ajoitus: ei mitattu tässä ajossa (vaatii merkki + videokaappauksen)"))

    polku = lue_tsv(f"{L}/polku.tsv")
    if any("PUUTE" in r[1] or "VIRHE" in r[1] or "EI LÖYDY" in r[1] for r in polku):
        pass  # PUUTE-rivit on jo kirjattu kohtaan 2 ajossa
    elif polku:
        tulokset["2"].insert(0, ("OK", f"{sum(1 for r in polku if not r[0].startswith('  '))} kosketusta, kaikki oletukset täyttyivät"))
    else:
        tulokset["2"].append(("PUUTE", "skenaariossa ei kosketuksia"))
    if not tulokset["6"]:
        tulokset["6"].append(("EI", "skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)"))

    puutteet = [(k, t) for k in OTSIKOT for tila, t in tulokset[k] if tila == "PUUTE"]
    tila = "OK" if not puutteet else "PUUTE — " + "; ".join(f"{k}: {t}" for k, t in puutteet[:3])
    out = [f"# Todistusajo: {era} {versio}", "",
           f"**{era} {versio}: {tila}**", "",
           f"Laite {laite} `{udid}`, skenaario `{os.path.basename(skenaario)}`, kansio `{L}`.", "",
           "![kuva-arkki](kuva-arkki.png)" if valmiit else "", ""]
    for k, otsikko in OTSIKOT.items():
        out.append(f"## {k}. {otsikko}")
        if k == "2" and polku:
            out += ["", "| askel | tulos |", "|---|---|"]
            out += [f"| `{r[0].strip()}` | {r[1] if len(r) > 1 else ''} |".replace("|  oletus", "| ↳ oletus") for r in polku]
            out.append("")
        for t, teksti in tulokset[k]:
            out.append(f"- **{t}** {teksti}")
        if k == "3":
            for nimi in ("poikkeukset.txt", "virherivit.txt"):
                if os.path.exists(f"{L}/{nimi}") and os.path.getsize(f"{L}/{nimi}"):
                    out.append(f"- [{nimi}]({nimi})")
        out.append("")
    out += ["Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).", ""]
    open(f"{L}/TODISTUS.md", "w", encoding="utf-8").write("\n".join(out))
    print(tila)


if __name__ == "__main__":
    if sys.argv[1] == "etsi":
        etsi(*sys.argv[2:8])
    elif sys.argv[1] == "laske":
        laske(*sys.argv[2:4])
    elif sys.argv[1] == "raportti":
        raportti(*sys.argv[2:8])
