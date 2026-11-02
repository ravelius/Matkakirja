#!/usr/bin/env python3
"""ASEMATAULUN MUISTUTUS Päätoimittajalle (omistaja 12.10.2026 klo 21.4x: "tee korjaus joka pitää huolen
että työlista ja asemataulu pysyy päivitettynä kaikissa tilanteissa") + KONTEKSTIVAHTI (omistaja 15.10.2026
klo 14.39: "selvitä miksi päätoimittajan konteksti pääsi karkaamaan ja varmista että ... jatkossa ei tapahdu").

Hook (vain Päätoimittajan checkout, Matkakirja-fable/.claude/settings.local.json):
- PostToolUse SendMessage|send_message: kun PT:n viesti kuittaa, lukitsee tai kertoo junasta/TF:stä,
  lisätään kontekstiin muistutus kirjata se Asemataulun tiedostoihin.
- UserPromptSubmit: kun omistaja kirjoittaa (ei roolien viestit eikä ajastukset), muistutus lisätä uusi
  pyyntö työlistaan.
- KONTEKSTIVAHTI (molemmat tapahtumat, myös roolien viestit): lukee session oman tallenteen viimeisen
  mallikutsun kontekstin ja muistuttaa 30/35/40 %:ssa (PT 30 pehmeä / 40 kova; KK 35 aloitus.md / 40 kortti).
  Viesti kertoo kummankin säännön, koska koukku ei tiedä roolia. Ei riipu Postivahdista.
- KK:N VÄLITTÄMÄT OMISTAJAN PÄÄTÖKSET (2.11.2026): UserPromptSubmit-viesti, jossa cross-session-message ja rivi
  "OMISTAJAN PÄÄTÖS|OMISTAJAN PYYNTÖ|OMISTAJA klo", muistuttaa kirjaamaan sen työlistaan tools/asemataulu/tyolista.py:llä
  (omistaja puhuu vain Keskustelukanavan kautta, joten ennen näitä viestejä ei muistutettu lainkaan).
- TYÖLISTAN AKTIIVISET VANHENTUNEET (molemmat tapahtumat): enintään 3 "työn alla" -riviä, joiden ts on yli 3 h mutta alle 48 h vanha.
Muistutus enintään kerran 10 minuutissa per laji ja sessio (tila /Users/Shared/Claude/hooks/.pt-taulu-tila.json).
Ei koskaan estä mitään; virheessä hiljaa.
"""
import json
import os
import re
import subprocess
import sys
import time

TILA = os.environ.get("PT_TAULU_TILA") or "/Users/Shared/Claude/hooks/.pt-taulu-tila.json"
VALI = 600
DATA = os.environ.get("PT_TAULU_DATA") or "/Users/Shared/Claude/Matkakirja-fable/scratchpad/asemataulu/data/talo"
TARKISTIN = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "asemataulu", "tarkista-junat.py")
if not os.path.exists(TARKISTIN):  # asennettu kopio /Users/Shared/Claude/hooks/ (KK 2.11.)
    TARKISTIN = "/Users/Shared/Claude/Matkakirja-fable/tools/asemataulu/tarkista-junat.py"
OMISTAJAN_VIESTI = re.compile(r"OMISTAJAN PÄÄTÖS|OMISTAJAN PYYNTÖ|OMISTAJA klo")
TYOLISTA_KOMENTO = "python3 -I tools/asemataulu/tyolista.py"
VANHA_H = 3
JUNA = re.compile(r"KUITATTU|LUKITSE|OMISTAJA PYYSI|BUILD 1\d\d|TF 1\d\d|juna(an)? 1\d\d", re.I)
IKKUNA = 1_000_000  # Opus 1 M (get_usage: contextWindow 1000000)
LOPPU_TAVUT = 3_000_000  # viimeinen mallikutsu löytyy tallenteen lopusta


def lue_tila():
    try:
        with open(TILA, encoding="utf-8") as f:
            return json.load(f)
    except (OSError, ValueError):
        return {}


def kirjoita_tila(t):
    try:
        tmp = TILA + ".tmp"
        with open(tmp, "w", encoding="utf-8") as f:
            json.dump(t, f)
        os.replace(tmp, TILA)
    except OSError:
        pass


def saa_muistuttaa(laji, sessio="", vali=VALI):
    # 14.10.2026: raja per sessio (PT ja Keskustelukanava jakavat kansion, eivät saa kuluttaa toistensa muistutuksia)
    avain = f"{laji}:{sessio}" if sessio else laji
    t = lue_tila()
    nyt = time.time()
    if nyt - float(t.get(avain, 0)) < vali:
        return False
    t[avain] = nyt
    kirjoita_tila(t)
    return True


def konteksti_prosentti(polku):
    """Viimeisen pääkeskustelun mallikutsun konteksti prosentteina, tai None."""
    with open(polku, "rb") as f:
        f.seek(0, os.SEEK_END)
        koko = f.tell()
        f.seek(max(0, koko - LOPPU_TAVUT))
        rivit = f.read().splitlines()
    for rivi in reversed(rivit):
        if b'"usage"' not in rivi:
            continue
        try:
            e = json.loads(rivi)
        except ValueError:
            continue
        if e.get("type") != "assistant" or e.get("isSidechain"):
            continue
        u = (e.get("message") or {}).get("usage") or {}
        tokenit = u.get("input_tokens", 0) + u.get("cache_read_input_tokens", 0) + u.get("cache_creation_input_tokens", 0)
        if tokenit:
            return round(100 * tokenit / IKKUNA)
    return None


def kontekstivahti(d, sessio):
    """PT ja KK jakavat kansion, eikä koukku tiedä roolia: viesti kertoo kummankin säännön, sessio toimii omansa mukaan."""
    polku = str(d.get("transcript_path") or "")
    if not polku or not os.path.exists(polku):
        return None
    p = konteksti_prosentti(polku)
    if p is None or p < 30:
        return None
    if p >= 40:
        if not saa_muistuttaa("konteksti-40", sessio, VALI):
            return None
        return (f"KONTEKSTIVAHTI (hook): konteksti {p} % ≥ 40 %. PÄÄTOIMITTAJA: KOVA RAJA (Raamattu NOLLAUSRAJAT 30/40) → "
                "lopeta uudet työt, kirjoita luovutus ja aloitusviesti, tallenna keskustelu "
                "(python3 tools/tallenna-keskustelu.py <keskustelu-uuid> Paatoimittaja), pushaa ja lähetä Postivahdille "
                "LUOVUTUS VALMIS; toistuu 10 min välein. KESKUSTELUKANAVA: päivitä aloitus.md ja kysy kortilla \"Nollaanko nyt?\".")
    if p >= 35:
        if not saa_muistuttaa("konteksti-35", sessio, 2 * VALI):
            return None
        return (f"KONTEKSTIVAHTI (hook): konteksti {p} % ≥ 35 %. PÄÄTOIMITTAJA: pehmeä raja ylitetty → ei uusia isoja tehtäviä, "
                "luovutus ja nollaus ensimmäisellä luontevalla tauolla. KESKUSTELUKANAVA: päivitä scratchpad/keskustelukanava/aloitus.md.")
    if not saa_muistuttaa("konteksti-30", sessio, 2 * VALI):
        return None
    return (f"KONTEKSTIVAHTI (hook): konteksti {p} % ≥ 30 %. PÄÄTOIMITTAJA: pehmeä raja → ei uusia isoja tehtäviä, luovutus ja "
            "nollaus ensimmäisellä luontevalla tauolla, viimeistään 40 %:ssa; raskaat lukemat ali-agentille. (Keskustelukanavalle ei toimia ennen 35 %.)")


def taulumuistutus(d, tapahtuma, sessio):
    if tapahtuma == "UserPromptSubmit":
        p = str(d.get("prompt") or "")
        if "cross-session-message" in p and OMISTAJAN_VIESTI.search(p):
            if saa_muistuttaa("omistaja-kk", sessio):
                return ("ASEMATAULU (hook): Keskustelukanava välitti omistajan päätöksen tai pyynnön. Kirjaa se työlistaan "
                        f"samassa vuorossa: {TYOLISTA_KOMENTO} lisaa \"OTSIKKO\" --teksti \"…\" --lisa \"…\" (uusi) tai "
                        f"{TYOLISTA_KOMENTO} tilanne \"OTSIKKO\" \"teksti\" [--juna N] (olemassa oleva rivi); valmis: … valmis \"OTSIKKO\" \"teksti\".")
            return None
        if not p.strip() or "cross-session-message" in p or p.lstrip().startswith(("JONOKIERROS", "<", "Another Claude session")):
            return None
        if saa_muistuttaa("omistaja", sessio):
            return ("ASEMATAULU (hook): jos omistajan viesti on uusi pyyntö tai päätös: Keskustelukanava välittää sen "
                    "sanatarkasti Päätoimittajalle, ja Päätoimittaja lisää sen työlistaan "
                    f"({DATA}/tyolista.json: oma paketti tai Työn alla -rivi) samassa vuorossa.")
        return None
    viesti = str((d.get("tool_input") or {}).get("message") or "")
    if JUNA.search(viesti) and saa_muistuttaa("juna", sessio):
        return ("ASEMATAULU (hook): päivitä tämä kuittaus/junatapahtuma tiedostoihin "
                f"{DATA}/junat.json (Valmiina / Työn alla) ja tyolista.json (paketin tilanne, 'Junassa N:') "
                "ennen vuoron loppua; Postivahti vie muuttuneet tiedostot tauluun.")
    return None


def junarivivahti(d, sessio):
    """Junarivien muoto (omistaja 2.11.2026): ajaa tarkistimen paikalliselle talo-kansiolle ja ilmoittaa virheet
    (enintään 3 riviä, kerran 5 min välein per sessio). Aikaraja 10 s; virheessä hiljaa."""
    if not os.path.isdir(DATA) or not os.path.exists(TARKISTIN):
        return None
    try:
        r = subprocess.run([sys.executable, "-I", TARKISTIN, "--kansio", DATA], capture_output=True, text=True, timeout=10)
    except (OSError, subprocess.SubprocessError):
        return None
    virheet = [x[7:] for x in r.stdout.splitlines() if x.startswith("VIRHE: ")]
    if not virheet or not saa_muistuttaa("junarivit", sessio, 300):
        return None
    return ("JUNARIVIT VIRHEELLISET: %d virhettä, korjaa junat.json tools/asemataulu/juna.py:llä (ei käsin): %s"
            % (len(virheet), " | ".join(v[:140] for v in virheet[:3])))


def tyolistavanhat(d, sessio):
    """Yli 3 h päivittämättömät työn alla/kesken -rivit ja keskeneräiset rivit, joiden uusin tilanne sanoo valmis
    (omistaja 2.11. 11.49: "Työlistassa on vielä vanhoja juttuja"); enintään 3 kumpaakin, kerran 10 min per sessio."""
    polku = os.path.join(DATA, "tyolista.json")
    if not os.path.exists(polku):
        return None
    with open(polku, encoding="utf-8") as f:
        tl = json.load(f)
    nyt = time.time() * 1000
    vanhat = []
    valmiit = []
    for r in tl.get("rivit") or []:
        if not isinstance(r, dict) or not re.search(r"työn alla|kesken|jonossa", str(r.get("tila", "")), re.I):
            continue
        uusin = str(r.get("tilanne", "")).split("\n")[0]
        if re.search(r"\bvalmis\b|valmiina junassa|junassa 2\d\d \(TF", uusin, re.I) and not re.search(r"\bei valmis|kun .* valmis", uusin, re.I):
            valmiit.append(str(r.get("otsikko", "?"))[:60])
        ts = r.get("ts")
        if isinstance(ts, str) and ts.strip().isdigit():
            ts = int(ts)
        if isinstance(ts, bool) or not isinstance(ts, (int, float)):
            continue
        ika_h = (nyt - ts) / 3_600_000
        if ika_h > VANHA_H:
            vanhat.append((ika_h, str(r.get("otsikko", "?"))[:60]))
    if not (vanhat or valmiit) or not saa_muistuttaa("tyolista-vanha", sessio):
        return None
    vanhat.sort(reverse=True)
    osat = []
    if vanhat:
        osat.append("työn alla -rivejä ilman tuoretta tilannetta: "
                    + "; ".join("%s (%d h)" % (o, h) for h, o in vanhat[:3]))
    if valmiit:
        osat.append("tilanne sanoo valmis mutta tila ei: " + "; ".join(valmiit[:3]))
    return (f"TYÖLISTA (hook): {'. '.join(osat)}. Päivitä: "
            f"{TYOLISTA_KOMENTO} tilanne \"OTSIKKO\" \"teksti\" [--juna N] tai valmis.")


def odottavat_aamulla(d, sessio):
    """Odottaa-rivit kerran päivässä aamulla (omistaja 2.11.2026 klo 11.59): ensimmäisellä tapahtumalla klo 6–12."""
    nyt = time.localtime()
    if not 6 <= nyt.tm_hour < 12:
        return None
    polku = os.path.join(DATA, "tyolista.json")
    if not os.path.exists(polku):
        return None
    with open(polku, encoding="utf-8") as f:
        tl = json.load(f)
    odottavat = [r for r in tl.get("rivit") or [] if isinstance(r, dict) and str(r.get("tila", "")) == "pidossa"]
    if not odottavat or not saa_muistuttaa("odottavat-" + time.strftime("%Y%m%d", nyt), sessio, vali=86400):
        return None
    return (f"TYÖLISTA (hook, kerran päivässä aamulla): käy {len(odottavat)} Odottaa-riviä läpi: valmiit valmiiksi, "
            f"korvautuneet pois, jatkuvat Työn alle, muille tämän päivän tilanne ({TYOLISTA_KOMENTO} tilanne|valmis).")


def main():
    try:
        d = json.load(sys.stdin)
    except ValueError:
        return
    tapahtuma = d.get("hook_event_name") or "PostToolUse"
    sessio = str(d.get("session_id") or "")
    tekstit = []
    for osa in (kontekstivahti, junarivivahti, tyolistavanhat, odottavat_aamulla, lambda d_, s_: taulumuistutus(d_, tapahtuma, s_)):
        try:
            t = osa(d, sessio)
        except Exception:  # noqa: BLE001 — yksi osa ei saa kaataa toista
            t = None
        if t:
            tekstit.append(t)
    if tekstit:
        print(json.dumps({"hookSpecificOutput": {"hookEventName": tapahtuma, "additionalContext": "\n".join(tekstit)}},
                         ensure_ascii=False))


if __name__ == "__main__":
    try:
        main()
    except Exception:  # noqa: BLE001 — hook ei saa koskaan kaataa vuoroa
        pass
