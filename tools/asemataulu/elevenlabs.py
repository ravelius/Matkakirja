#!/usr/bin/env python3
"""ElevenLabsin krediittimäärä -> data/talo/elevenlabs.json (omistaja 16.10.2026 klo 13.55).
Ajo (avain tulee Macin ympäristöstä, ei koskaan tiedostoon, lokiin eikä tauluun):
  zsh -c 'source ~/.zshrc; python3 -I elevenlabs.py'
Kirjoittaa {kaytetty, raja, nollautuu (ISO), ts}. Virhetilanteessa ei kirjoita mitään ja tulostaa vain virheen tyypin."""
import json, os, sys, urllib.request, datetime

KANSIO = os.path.dirname(os.path.abspath(__file__))
UT = os.path.join(KANSIO, "data", "talo", "elevenlabs.json")

avain = os.environ.get("ELEVEN_API_KEY")
if not avain:
    sys.exit("ELEVEN_API_KEY puuttuu ympäristöstä")
pyynto = urllib.request.Request("https://api.elevenlabs.io/v1/user/subscription", headers={"xi-api-key": avain})
try:
    with urllib.request.urlopen(pyynto, timeout=20) as v:
        d = json.load(v)
    kaytetty = int(d["character_count"])
    raja = int(d["character_limit"])
    nollaus = d.get("next_character_count_reset_unix")
except Exception as e:  # ei tulosteta vastausta eikä otsakkeita
    sys.exit("haku epäonnistui: " + type(e).__name__)
iso = datetime.datetime.fromtimestamp(nollaus, datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ") if nollaus else None
tmp = UT + ".tmp"
with open(tmp, "w", encoding="utf-8") as f:
    json.dump({"kaytetty": kaytetty, "raja": raja, "nollautuu": iso, "ts": int(datetime.datetime.now().timestamp() * 1000)}, f, ensure_ascii=False)
os.replace(tmp, UT)
print("ok", kaytetty, "/", raja, iso)
