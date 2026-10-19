"""SUOMI AINA PAKOTETTUNA ElevenLabsin puhekutsuissa (omistaja 6.10.2026, 17.10. klo 23.04 ja 18.10. klo 17.55: "pidä huoli että jatkossa kaikki ovat pakotettuja").
Python-vastine tools/elevenlabs-kieli.mjs:lle. Jokainen puhekutsu (text-to-speech, text-to-dialogue, with-timestamps) kulkee `pyynto`n kautta:
se lisää runkoon `language_code: fi`, heittää virheen jos runko väittää muuta tai malli ei tue kielikoodia (multilingual), eikä lähetä mitään ilman.
Käyttö (stdlib vain):  from elevenlabs_kieli import pyynto, kieli_fi
  v = pyynto(f'/v1/text-to-speech/{ÄÄNI}/with-timestamps?output_format=pcm_44100', {'text': t, 'model_id': 'eleven_v4_turbo', 'voice_settings': {'style': 0}})
Vienti-ääniporttia varten: `kirjoita_kieli_json(kansio)` kirjaa paketin `kieli.json`-tiedoston (aaniportti.py vaatii sen)."""
import json, os, re, sys, urllib.error, urllib.request

KIELI = 'fi'
API = 'https://api.elevenlabs.io'
PUHEPAATE = re.compile(r'/v1/text-to-(?:speech|dialogue)\b')


def kieli_fi(malli):
    """Palauttaa runkoon liitettävän {'language_code': 'fi'}; malli, joka ei tue kielikoodia (multilingual), on virhe."""
    if re.search('multilingual', str(malli or ''), re.I):
        raise ValueError(f'malli {malli} ei tue language_code-kenttää; suomi pitää pakottaa → käytä eleven_v4_turbo, eleven_v4 tai eleven_v3')
    return {'language_code': KIELI}


def pakota(runko):
    """Palauttaa rungon, jossa language_code on 'fi'. Toinen kielikoodi on virhe. Ei muuta alkuperäistä."""
    r = dict(runko)
    if r.get('language_code', KIELI) != KIELI:
        raise ValueError(f"language_code {r['language_code']!r}: suomi aina pakotettuna")
    r.update(kieli_fi(r.get('model_id')))
    return r


def pyynto(polku, runko, avain=None, aikaraja=300):
    """POST ElevenLabsiin. Puhepäätteessä runko pakotetaan suomeksi; muuten (esim. /v1/user) mennään sellaisenaan.
    Palauttaa JSON-vastauksen tai {'VIRHE': koodi, 'runko': …} (kuten vanhat tee.py:t)."""
    if PUHEPAATE.search(polku):
        runko = pakota(runko)
    k = avain or os.environ.get('ELEVENLABS_API_KEY') or os.environ.get('ELEVEN_API_KEY') or sys.exit('ElevenLabs-avain puuttuu (source ~/.zshrc)')
    req = urllib.request.Request(API + polku, data=json.dumps(runko).encode(), method='POST',
                                 headers={'xi-api-key': k, 'Content-Type': 'application/json'})
    try:
        with urllib.request.urlopen(req, timeout=aikaraja) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as e:
        return {'VIRHE': e.code, 'runko': e.read().decode(errors='replace')[:800]}


def kirjoita_kieli_json(kansio, mallit=()):
    """Kirjaa vientipaketin `kieli.json`: ääniportti (tyokalut/aaniportti.py) hylkää paketin ilman sitä."""
    p = os.path.join(kansio, 'kieli.json')
    with open(p, 'w') as f:
        json.dump({'language_code': KIELI, 'mallit': sorted(set(mallit))}, f, ensure_ascii=False)
    return p
