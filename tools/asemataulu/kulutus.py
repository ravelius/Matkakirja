#!/usr/bin/env python3
"""Asemataulun Kulutus-osio: kuka ja mikä projekti on kuluttanut token-kiintiötä (omistaja 13.10.2026 klo 10.5x: "Saisiko
tilannetauluun uuden otsikon, minkä alle tulisi tietoja token-kulutuksista?"; klo 11.3x: "mitkä projektit työlistalta ovat
kuluttaneet minkä verran, lähinnä top 5").

Ajo: python3 -I scratchpad/asemataulu/kulutus.py → kirjoittaa scratchpad/asemataulu/hoitaja/kulutus.json ja tulostaa saman JSONin
viimeiselle riville. Hoitaja vie sen tauluun dokumenttina talo/kulutus, jota sivun Kulutus-osio lukee.

Lähteet: Clauden keskustelulokit /Users/koodaus/.claude/projects/<hakemisto>/*.jsonl (pääsessiot) ja
<hakemisto>/<uuid>/subagents/ alla olevat .jsonl-tiedostot (ali-agentit, myös workflows-alikansiot). Vain rivit, joilla
"type":"assistant" ja message.usage; saman viestin useat rivit lasketaan kerran message.id:llä (isoin tuloste jää).
Rooli lokihakemiston nimestä kuten laitteet.py:ssä (ROOLIT, WT); tuntemattomat ovat "Muut".
Ikkunat hoitaja/mittarit.json:sta: laatta Viikko (nollautuu − 7 vrk) ja laatta "5 tuntia" (nollautuu − 5 h).

Painot ovat ARVIO API:n hintasuhteista, eivät Clauden oikeaa kiintiölaskentaa: viestin paino = mallikerroin (Opus 5, Sonnet 3,
Haiku 1, muu 5) × (syöttö × 1 + välimuistin kirjoitus 5 min × 1,25 + 1 h × 2 + välimuistista luku × 0,1 + tuloste × 5).
Tokenit = syöttö + välimuistin kirjoitukset + tuloste (ei välimuistista luettuja). kiintio = osuus viikon painosta × viikon
käyttö-% (%-yksikköä viikkokiintiöstä).

Projekti: jokaiselle viestille liitetään työlistan projekti. Pääsessiossa se määräytyy vuoron aloittaneesta viestistä (kirjoitettu
käyttäjäviesti, ajastettu kehote tai toisen session viesti; tool_result-rivit, tehtäväilmoitukset, kuvaselosteet, keskeytykset ja
tiivistelmät eivät vaihda projektia), ali-agentin lokissa sen ensimmäisestä käyttäjäviestistä (tehtävänanto). Projekti on se, jonka
avainsanoja viestissä on eniten (alimerkkijono tai etuliitteellä re: säännöllinen lauseke; isoilla ja pienillä kirjaimilla ei
eroa); tasapelissä aiempi eli korkeampi prioriteetti, ei osumaa = oletus (Muu työ). Projektit ja sanat ovat tiedostossa
scratchpad/asemataulu/kulutus-projektit.json; sen muutos aiheuttaa lokien uudelleenluvun (~10 s). Tulokseen tulee kentäksi
projektit: viisi suurinta nimettyä projektia, Muu työ ja loput yhdistettynä (Muut projektit), kullakin kolme suurinta roolia.

Inkrementaalinen: hoitaja/kulutus.sqlite (tiedostot: polku, koko, offset, mtime, projekti; viestit: id, ts, rooli, agentti, malli,
paino, tokenit, projekti). Joka ajolla luetaan vain tiedostot, joiden mtime ≥ viikon alku − 1 vrk, ja niistä vain uudet tavut
tallennetusta offsetista (kokonaiset rivit; lyhentynyt tiedosto luetaan alusta). Yli 8 vrk vanhat viestit karsitaan. Ensimmäinen
ajo lukee viikon aikana muuttuneet lokit kokonaan, seuraavat vain uuden osan.
"""
import argparse
import hashlib
import json
import os
import re
import sqlite3
import sys
import time
from datetime import datetime, timezone

LOKIT = '/Users/koodaus/.claude/projects'
TAULU = '/Users/Shared/Claude/Matkakirja-fable/scratchpad/asemataulu'
HOITAJA = TAULU + '/hoitaja'
PROJEKTIT = TAULU + '/kulutus-projektit.json'
ETU = '-Users-Shared-Claude-'
ROOLIT = {
    'Matkakirja-fable': 'Päätoimittaja', 'Matkakirja-julkaisija': 'Julkaisija',
    'Matkakirja-3d-selvittaja': 'Natiiviseppä', 'Matkakirja-natiivi-ui': 'Natiivi-UI',
    'Matkakirja-linssiseppa': 'Linssiseppä', 'Matkakirja-linssiseppa-2': 'Linssiseppä 2',
    'Matkakirja-linnanrakentaja': 'Linnanrakentaja', 'Matkakirja-siirtoseppa': 'Siirtoseppä',
    'Matkakirja-karttaseppa': 'Karttaseppä', 'Matkakirja-pelikoodari': 'Pelikoodari',
    'Matkakirja-sisaltokirjuri': 'Sisältökirjuri', 'Matkakirja-laitetestaaja': 'Laitetestaaja',
    'Matkakirja-posti': 'Postivahti', 'Matkakirja-asemataulu': 'Asemataulu', 'Matkakirja-aanittaja': 'Äänittäjä',
}
# Erä-worktreet /Users/Shared/Claude/wt/<rooli>-<aihe> (proto- pois); pisin etuliite ensin. Viimeiset neljä ovat lisäyksiä
# laitteet.py:n listaan (worktreen nimi paatoimittaja-…, asemataulu-…, aanittaja-…, posti-…).
WT = {'fable': 'Päätoimittaja', 'julkaisija': 'Julkaisija', 'natiiviseppa': 'Natiiviseppä',
      'natiivi-ui': 'Natiivi-UI', 'natiivi': 'Natiivi-UI', 'linssiseppa2': 'Linssiseppä 2', 'linssiseppa-2': 'Linssiseppä 2',
      'linssiseppa': 'Linssiseppä', 'linnanrakentaja': 'Linnanrakentaja', 'siirtoseppa': 'Siirtoseppä',
      'karttaseppa': 'Karttaseppä', 'pelikoodari': 'Pelikoodari', 'sisaltokirjuri': 'Sisältökirjuri',
      'laitetestaaja': 'Laitetestaaja',
      'paatoimittaja': 'Päätoimittaja', 'asemataulu': 'Asemataulu', 'aanittaja': 'Äänittäjä', 'posti': 'Postivahti'}
PAIVA_MS = 86400000
SAILYTYS_VRK = 8
MIN_OSUUS = 0.5  # % viikosta; pienemmät roolit yhdistetään riviin "Muut"
TOP_PROJEKTIT = 5  # nimettyjä projekteja omilla riveillään; loput yhdistetään riviin "Muut projektit"
OSA = 16 * 1024 * 1024
# Nopeat esisuodattimet, jotka eivät riipu JSONin välilyönneistä: sekä "type":"assistant" että "role":"assistant" sisältävät
# ensimmäisen, käyttäjärivit toisen; tarkka tarkistus (type) tehdään jäsentämisen jälkeen. tool_result-rivit (lokin painavimmat)
# ohitetaan jäsentämättä.
ASSISTANT = b'"assistant"'
KAYTTAJA = b'"user"'
TOOL_RESULT = b'"tool_result"'
TILAN_VERSIO = 2  # kasvatetaan, kun tilan rakenne tai luokittelun säännöt muuttuvat: tila luetaan silloin alusta
# Käyttäjärivit, jotka eivät aloita vuoroa (alku pienaakkosin): tehtäväilmoitukset, kuvaselosteet, keskeytykset ja järjestelmäilmoitukset.
EI_VUOROA = ('<task-notification', '[image', '[request interrupted', '[usage limit reached', '[cross-session delivery notice')
RISTISESSIO = 'another claude session sent a message'
VIESTIT = re.compile(r'<(cross-session-message|agent-message)\b[^>]*>(.*?)</\1>', re.S)
UPSERT = ('INSERT INTO viestit (id, ts, rooli, agentti, malli, paino, tokenit, projekti) VALUES (?, ?, ?, ?, ?, ?, ?, ?) '
          'ON CONFLICT(id) DO UPDATE SET ts = excluded.ts, rooli = excluded.rooli, agentti = excluded.agentti, '
          'malli = excluded.malli, paino = excluded.paino, tokenit = excluded.tokenit, projekti = excluded.projekti '
          'WHERE excluded.paino > viestit.paino')


def rooli_hakemistosta(nimi):
    """Roolin nimi lokihakemiston nimestä (polun kauttaviivat ovat viivoja); muut kuin Clauden omat kansiot = Muut."""
    if not nimi.startswith(ETU):
        return 'Muut'
    osa = nimi[len(ETU):]
    if osa in ROOLIT:
        return ROOLIT[osa]
    if osa.startswith('wt-'):
        wt = osa[3:].removeprefix('proto-')
        for avain in sorted(WT, key=len, reverse=True):
            if wt.startswith(avain):
                return WT[avain]
    return 'Muut'


def malli_ja_kerroin(nimi):
    s = str(nimi or '').lower()
    for sana, kerroin in (('opus', 5), ('sonnet', 3), ('haiku', 1)):
        if sana in s:
            return sana, kerroin
    return 'muu', 5


def ms_ajasta(x):
    """ISO-aika tai millisekunnit → millisekunnit (None, jos ei tulkittavissa)."""
    if isinstance(x, bool):
        return None
    if isinstance(x, (int, float)):
        return int(x)
    if isinstance(x, str):
        try:
            return int(datetime.fromisoformat(x.replace('Z', '+00:00')).timestamp() * 1000)
        except ValueError:
            return None
    return None


def iso(ms):
    return datetime.fromtimestamp(ms / 1000, timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')


def lataa_projektit(polku):
    """kulutus-projektit.json → {oletus, poista, projektit: [(nimi, [sanat])], tiiviste, huom}; puuttuessa kaikki on oletusprojektia."""
    ohjeet = {'oletus': 'Muu työ', 'poista': [], 'projektit': [], 'tiiviste': 'ei-asetuksia', 'huom': None}
    try:
        with open(polku, 'rb') as f:
            raaka = f.read()
        d = json.loads(raaka.decode('utf-8'))
        ohjeet['oletus'] = str(d.get('oletus') or 'Muu työ')
        ohjeet['poista'] = [str(s).lower() for s in d.get('poista', []) if str(s)]
        for p in d.get('projektit', []):
            nimi = str(p.get('nimi') or '').strip()
            sanat = [sana_kuvio(str(s)) for s in p.get('sanat', []) if str(s)]
            if nimi and sanat:
                ohjeet['projektit'].append((nimi, sanat))
    except (OSError, ValueError, AttributeError, re.error) as e:
        ohjeet['huom'] = 'kulutus-projektit.json puuttuu tai on rikki (%s)' % str(e)[:80]
        ohjeet['projektit'] = []
        return ohjeet
    ohjeet['tiiviste'] = hashlib.sha1(raaka + str(TILAN_VERSIO).encode()).hexdigest()
    return ohjeet


def sana_kuvio(sana):
    """Avainsana → (alimerkkijono pienaakkosin, None) tai, etuliitteellä re:, (None, regex); regexillä voi vaatia sanarajan (\\b)
    tai numeron, esim. re:\\bdem\\b, re:\\btf[ -]?1\\d\\d."""
    if sana.startswith('re:'):
        return None, re.compile(sana[3:], re.I)
    return sana.lower(), None


def luokittele(teksti, ohjeet):
    """Projekti, jonka avainsanoja tekstissä on eniten; tasapelissä aiempi projekti, ei osumaa = oletus."""
    t = teksti.lower()
    for s in ohjeet['poista']:
        t = t.replace(s, ' ')
    paras, eniten = ohjeet['oletus'], 0
    for nimi, sanat in ohjeet['projektit']:
        n = sum(t.count(s) if kuvio is None else len(kuvio.findall(t)) for s, kuvio in sanat)
        if n > eniten:
            paras, eniten = nimi, n
    return paras


def sisalto(teksti):
    """Toisen session ja ali-agentin viestistä vain varsinainen sisältö (ei lähettäjän nimeä eikä vakiotekstiä)."""
    osat = [m.group(2) for m in VIESTIT.finditer(teksti)]
    return '\n'.join(osat) if osat else teksti


def vuoron_teksti(d):
    """Käyttäjärivin teksti, jos rivi aloittaa vuoron: kirjoitettu viesti, ajastettu kehote tai toisen session viesti. Muuten None:
    tool_result-rivit, tehtäväilmoitukset, kuvaselosteet, keskeytykset, tiivistelmät ja muut järjestelmärivit eivät vaihda projektia."""
    if d.get('isCompactSummary'):
        return None
    m = d.get('message')
    c = m.get('content') if isinstance(m, dict) else None
    if isinstance(c, str):
        teksti = c
    elif isinstance(c, list):
        if any(isinstance(b, dict) and b.get('type') == 'tool_result' for b in c):
            return None
        teksti = '\n'.join(str(b.get('text', '')) for b in c if isinstance(b, dict) and b.get('type') == 'text')
    else:
        return None
    alku = teksti.lstrip()[:60].lower()
    if not alku or alku.startswith(EI_VUOROA):
        return None
    if d.get('isMeta') and not (alku.startswith(RISTISESSIO) or d.get('turnOrigin') == 'scheduled'):
        return None
    return sisalto(teksti)


def ikkunat(hoitaja, nyt):
    """(viikon alku ms, 5 h:n alku ms, viikon käyttö-%, huomautukset) mittarit.json:sta; puuttuessa arvio nykyhetkestä."""
    huom = []
    laatat = {}
    try:
        with open(os.path.join(hoitaja, 'mittarit.json'), encoding='utf-8') as f:
            for l in json.load(f).get('laatat', []):
                laatat[str(l.get('nimi', '')).strip().lower()] = l
    except (OSError, ValueError, AttributeError):
        huom.append('mittarit.json puuttuu tai on rikki')
    viikko = laatat.get('viikko') or {}
    h5 = next((l for k, l in laatat.items() if k.startswith('5')), {})
    loppu = ms_ajasta(viikko.get('nollautuu'))
    if loppu is None:
        v_alku = nyt - 7 * PAIVA_MS
        huom.append('viikon nollautumisaika puuttuu, ikkuna = viimeiset 7 vrk')
    else:
        while loppu <= nyt:  # vanhentunut mittari: viikot toistuvat
            loppu += 7 * PAIVA_MS
        v_alku = loppu - 7 * PAIVA_MS
    loppu = ms_ajasta(h5.get('nollautuu'))
    if loppu is None:
        h_alku = nyt - 5 * 3600000
        huom.append('5 h:n nollautumisaika puuttuu, ikkuna = viimeiset 5 h')
    elif loppu <= nyt:  # vanhentunut mittari: uusi ikkuna alkoi viimeistään nollautumisesta
        h_alku = max(loppu, nyt - 5 * 3600000)
    else:
        h_alku = loppu - 5 * 3600000
    pros = viikko.get('prosentti')
    if not isinstance(pros, (int, float)) or isinstance(pros, bool):
        pros = 0
        huom.append('viikon käyttö-% puuttuu')
    return v_alku, h_alku, pros, huom


def jsonl_tiedostot(kansio):
    """Kansion .jsonl-tiedostot (DirEntry) alikansioineen."""
    try:
        sisalto_ = list(os.scandir(kansio))
    except OSError:
        return
    for e in sisalto_:
        if e.is_dir():
            yield from jsonl_tiedostot(e.path)
        elif e.name.endswith('.jsonl') and e.is_file():
            yield e


def loki_tiedostot(lokit, raja_s):
    """Lokitiedostot, joiden mtime ≥ raja_s: (polku, rooli, agentti 0/1, koko, mtime_ns)."""
    ulos = []

    def lisaa(e, rooli, agentti):
        try:
            st = e.stat()
        except OSError:
            return
        if st.st_mtime >= raja_s:
            ulos.append((e.path, rooli, agentti, st.st_size, st.st_mtime_ns))

    try:
        hakemistot = sorted(os.scandir(lokit), key=lambda e: e.name)
    except OSError:
        return ulos
    for h in hakemistot:
        if not h.is_dir():
            continue
        rooli = rooli_hakemistosta(h.name)
        try:
            sisalto_ = list(os.scandir(h.path))
        except OSError:
            continue
        for e in sisalto_:
            if e.name.endswith('.jsonl') and e.is_file():
                lisaa(e, rooli, 0)
            elif e.is_dir() and e.name != 'memory':
                # <uuid>/subagents/*.jsonl ja mahdolliset työnkulkujen alikansiot (subagents/workflows/wf_…/agent-….jsonl)
                for s in jsonl_tiedostot(os.path.join(e.path, 'subagents')):
                    lisaa(s, rooli, 1)
    return ulos


def luku(x):
    return x if isinstance(x, (int, float)) and not isinstance(x, bool) else 0


def viesti(d, raja_ms):
    """(id, ts, malli, paino, tokenit) assistant-rivistä, tai None, jos rivi ei kelpaa tai on rajaa vanhempi."""
    m = d.get('message')
    u = m.get('usage') if isinstance(m, dict) else None
    if not isinstance(u, dict):
        return None
    ts = ms_ajasta(d.get('timestamp'))
    if ts is None or ts < raja_ms:
        return None
    syotto, tuloste = luku(u.get('input_tokens')), luku(u.get('output_tokens'))
    valimuistista, kirjoitettu = luku(u.get('cache_read_input_tokens')), luku(u.get('cache_creation_input_tokens'))
    cc = u.get('cache_creation')
    c5 = luku(cc.get('ephemeral_5m_input_tokens')) if isinstance(cc, dict) else 0
    c1 = luku(cc.get('ephemeral_1h_input_tokens')) if isinstance(cc, dict) else 0
    if c5 + c1 == 0:  # ei erittelyä: kaikki 5 min -hinnalla (× 1,25)
        c5, c1 = kirjoitettu, 0
    malli, kerroin = malli_ja_kerroin(m.get('model'))
    paino = kerroin * (syotto + c5 * 1.25 + c1 * 2 + valimuistista * 0.1 + tuloste * 5)
    tunniste = m.get('id') or d.get('requestId') or d.get('uuid')
    if paino <= 0 or not tunniste:
        return None
    return str(tunniste), ts, malli, paino, syotto + c5 + c1 + tuloste


def lue_tapahtumat(polku, offset, raja_ms):
    """Tiedoston kokonaiset rivit offsetista alkaen → (tapahtumat, uusi offset). Tapahtuma on ('v', teksti) vuoron aloittavasta
    käyttäjäviestistä tai ('m', id, ts, malli, paino, tokenit) assistant-viestistä, tiedoston järjestyksessä."""
    tapahtumat = []
    pos = offset
    with open(polku, 'rb') as f:
        f.seek(offset)
        jaama = b''
        while True:
            osa = f.read(OSA)
            if not osa:
                break
            rivit = (jaama + osa).split(b'\n')
            jaama = rivit.pop()  # viimeinen pala on keskeneräinen rivi
            for rivi in rivit:
                pos += len(rivi) + 1
                if ASSISTANT not in rivi and not (KAYTTAJA in rivi and TOOL_RESULT not in rivi):
                    continue
                try:
                    d = json.loads(rivi)
                except ValueError:
                    continue
                if not isinstance(d, dict):
                    continue
                if d.get('type') == 'assistant':
                    v = viesti(d, raja_ms)
                    if v:
                        tapahtumat.append(('m',) + v)
                elif d.get('type') == 'user':
                    teksti = vuoron_teksti(d)
                    if teksti is not None:
                        tapahtumat.append(('v', teksti))
    return tapahtumat, pos


def liita_projektit(tapahtumat, rooli, agentti, projekti, ohjeet):
    """Tapahtumista viestirivit projekteineen → ({id: rivi}, projekti jonon lopussa). Pääsessiossa jokainen vuoron aloittava viesti
    vaihtaa projektin, ali-agentin lokissa vain ensimmäinen. Sama viesti useana rivinä: suurin paino jää."""
    viestit = {}
    for t in tapahtumat:
        if t[0] == 'v':
            if not agentti or projekti is None:
                projekti = luokittele(t[1], ohjeet)
        else:
            _, tunniste, ts, malli, paino, tokenit = t
            if tunniste not in viestit or paino > viestit[tunniste][5]:
                viestit[tunniste] = (tunniste, ts, rooli, agentti, malli, paino, tokenit, projekti or ohjeet['oletus'])
    return viestit, projekti


def avaa_tila(hoitaja):
    polku = os.path.join(hoitaja, 'kulutus.sqlite')
    for yritys in (1, 2):
        db = None
        try:
            db = sqlite3.connect(polku, timeout=60)
            db.execute('PRAGMA synchronous = NORMAL')
            if db.execute('PRAGMA user_version').fetchone()[0] != TILAN_VERSIO:  # vanha rakenne: aloitetaan alusta
                for taulu in ('viestit', 'tiedostot', 'asetukset'):
                    db.execute('DROP TABLE IF EXISTS ' + taulu)
            db.execute('CREATE TABLE IF NOT EXISTS tiedostot (polku TEXT PRIMARY KEY, koko INTEGER, offset INTEGER, mtime INTEGER, '
                       'projekti TEXT)')
            db.execute('CREATE TABLE IF NOT EXISTS viestit (id TEXT PRIMARY KEY, ts INTEGER, rooli TEXT, agentti INTEGER, '
                       'malli TEXT, paino REAL, tokenit INTEGER, projekti TEXT)')
            db.execute('CREATE TABLE IF NOT EXISTS asetukset (avain TEXT PRIMARY KEY, arvo TEXT)')
            db.execute('CREATE INDEX IF NOT EXISTS viestit_ts ON viestit (ts)')
            db.execute('PRAGMA user_version = %d' % TILAN_VERSIO)
            db.commit()
            return db
        except sqlite3.DatabaseError:
            if db is not None:
                db.close()
            if yritys == 2 or not os.path.exists(polku):
                raise
            os.replace(polku, polku + '.rikki')  # tila rikki: aloitetaan alusta, vanha jää talteen


def tarkista_asetukset(db, ohjeet):
    """Projektiasetusten muuttuessa vanhat luokitukset ovat vanhentuneet: tila tyhjennetään ja lokit luetaan alusta."""
    vanha = db.execute("SELECT arvo FROM asetukset WHERE avain = 'tiiviste'").fetchone()
    if not vanha or vanha[0] != ohjeet['tiiviste']:
        with db:
            db.execute('DELETE FROM viestit')
            db.execute('DELETE FROM tiedostot')
            db.execute("INSERT OR REPLACE INTO asetukset (avain, arvo) VALUES ('tiiviste', ?)", (ohjeet['tiiviste'],))


def paivita_tila(db, tiedostot, sailyta_ms, ohjeet, verbose):
    """Lukee uudet tavut muuttuneista lokeista tilaan ja karsii vanhat."""
    tallessa = {p: (k, o, m, pr) for p, k, o, m, pr in db.execute('SELECT polku, koko, offset, mtime, projekti FROM tiedostot')}
    tiedostoja = tavuja = 0
    for polku, rooli, agentti, koko, mtime in tiedostot:
        vanha = tallessa.get(polku)
        if vanha and vanha[0] == koko and vanha[2] == mtime:
            continue
        offset, projekti = (vanha[1], vanha[3]) if vanha and koko >= vanha[1] else (0, None)
        try:
            tapahtumat, uusi = lue_tapahtumat(polku, offset, sailyta_ms)
        except OSError:
            continue
        viestit, projekti = liita_projektit(tapahtumat, rooli, agentti, projekti, ohjeet)
        with db:
            db.executemany(UPSERT, viestit.values())
            db.execute('INSERT OR REPLACE INTO tiedostot (polku, koko, offset, mtime, projekti) VALUES (?, ?, ?, ?, ?)',
                       (polku, koko, uusi, mtime, projekti))
        tiedostoja += 1
        tavuja += uusi - offset
    with db:
        db.execute('DELETE FROM viestit WHERE ts < ?', (sailyta_ms,))
        for polku in tallessa:
            if not os.path.exists(polku):
                db.execute('DELETE FROM tiedostot WHERE polku = ?', (polku,))
    if verbose:
        print(f'luettu {tiedostoja} tiedostoa, {tavuja // 1000000} Mt; tilassa {len(tallessa)} tiedostoa', file=sys.stderr)


def laske(db, v_alku, h_alku, viikko_pros, oletus):
    """(rivit, projektit): rooleittain ja projekteittain viikon osuus, kiintiöosuus, 5 h:n osuus ym.; pienet roolit yhdistetty
    riviin Muut, nimettyjen projektien viisi suurinta omilla riveillään, sitten oletus (Muu työ) ja loput (Muut projektit)."""
    def nolla():
        return {'paino': 0.0, 'agentit': 0.0, 'tokenit': 0, 'h5': 0.0, 'mallit': {}}

    R = {}
    for rooli, agentti, malli, paino, tokenit in db.execute(
            'SELECT rooli, agentti, malli, SUM(paino), SUM(tokenit) FROM viestit WHERE ts >= ? GROUP BY rooli, agentti, malli',
            (v_alku,)):
        r = R.setdefault(rooli, nolla())
        r['paino'] += paino
        r['tokenit'] += tokenit
        if agentti:
            r['agentit'] += paino
        else:  # roolin malli = pääsession painotetusti yleisin
            r['mallit'][malli] = r['mallit'].get(malli, 0.0) + paino
    for rooli, paino in db.execute('SELECT rooli, SUM(paino) FROM viestit WHERE ts >= ? GROUP BY rooli', (h_alku,)):
        R.setdefault(rooli, nolla())['h5'] += paino
    yht = sum(r['paino'] for r in R.values())
    yht5 = sum(r['h5'] for r in R.values())
    if yht <= 0:
        return [], []
    koonti = {}
    for nimi, r in R.items():
        avain = 'Muut' if nimi == 'Muut' or 100 * r['paino'] / yht < MIN_OSUUS else nimi
        k = koonti.setdefault(avain, nolla())
        for kentta in ('paino', 'agentit', 'tokenit', 'h5'):
            k[kentta] += r[kentta]
        for malli, p in r['mallit'].items():
            k['mallit'][malli] = k['mallit'].get(malli, 0.0) + p
    rivit = []
    for nimi, k in sorted(koonti.items(), key=lambda x: -x[1]['paino']):
        if k['paino'] <= 0:
            continue
        mallit = k['mallit'] or {'opus': 1.0}
        malli = max(mallit, key=mallit.get)
        osuus = 100 * k['paino'] / yht
        rivit.append({
            'nimi': nimi,
            'malli': 'Sonnet' if malli in ('sonnet', 'haiku') else 'Opus',
            'viikko': round(osuus, 1),
            'kiintio': round(osuus * viikko_pros / 100, 1),
            'viisi_h': round(100 * k['h5'] / yht5, 1) if yht5 > 0 else 0.0,
            'agentit': round(100 * k['agentit'] / k['paino'], 1),
            'tokenit_m': int(round(k['tokenit'] / 1e6)),
        })
    return rivit, laske_projektit(db, v_alku, h_alku, viikko_pros, yht, yht5, oletus)


def laske_projektit(db, v_alku, h_alku, viikko_pros, yht, yht5, oletus):
    """Projektirivit {nimi, viikko, kiintio, viisi_h, roolit: kolme suurinta}: viisi suurinta nimettyä projektia, sitten oletus
    (Muu työ) ja loput nimetyt yhdistettynä (Muut projektit)."""
    def nolla():
        return {'paino': 0.0, 'h5': 0.0, 'roolit': {}}

    P = {}
    for projekti, rooli, paino in db.execute(
            'SELECT projekti, rooli, SUM(paino) FROM viestit WHERE ts >= ? GROUP BY projekti, rooli', (v_alku,)):
        p = P.setdefault(projekti or oletus, nolla())
        p['paino'] += paino
        p['roolit'][rooli] = p['roolit'].get(rooli, 0.0) + paino
    for projekti, paino in db.execute('SELECT projekti, SUM(paino) FROM viestit WHERE ts >= ? GROUP BY projekti', (h_alku,)):
        P.setdefault(projekti or oletus, nolla())['h5'] += paino

    def rivi(nimi, p):
        roolit = sorted(((r, w) for r, w in p['roolit'].items() if r != 'Muut'), key=lambda x: -x[1])[:3]
        osuus = 100 * p['paino'] / yht
        return {'nimi': nimi, 'viikko': round(osuus, 1), 'kiintio': round(osuus * viikko_pros / 100, 1),
                'viisi_h': round(100 * p['h5'] / yht5, 1) if yht5 > 0 else 0.0, 'roolit': [r for r, _ in roolit]}

    nimetyt = sorted(((n, p) for n, p in P.items() if n != oletus and p['paino'] > 0), key=lambda x: -x[1]['paino'])
    ulos = [rivi(n, p) for n, p in nimetyt[:TOP_PROJEKTIT]]
    if oletus in P and P[oletus]['paino'] > 0:
        ulos.append(rivi(oletus, P[oletus]))
    if nimetyt[TOP_PROJEKTIT:]:
        yhd = nolla()
        for _, p in nimetyt[TOP_PROJEKTIT:]:
            yhd['paino'] += p['paino']
            yhd['h5'] += p['h5']
            for r, w in p['roolit'].items():
                yhd['roolit'][r] = yhd['roolit'].get(r, 0.0) + w
        ulos.append(rivi('Muut projektit', yhd))
    return ulos


def main():
    ap = argparse.ArgumentParser(description='Asemataulun Kulutus-osion tiedot Clauden lokeista')
    ap.add_argument('-v', '--verbose', action='store_true', help='tulosta ajon tiedot (stderr)')
    ap.add_argument('--hoitaja', default=HOITAJA, help='kansio, jossa mittarit.json, kulutus.sqlite ja kulutus.json ovat')
    ap.add_argument('--lokit', default=LOKIT, help='Clauden projektilokien kansio')
    ap.add_argument('--projektit', default=PROJEKTIT, help='projektit ja avainsanat sisältävä kulutus-projektit.json')
    a = ap.parse_args()
    alku = time.time()
    nyt = int(alku * 1000)
    v_alku, h_alku, viikko_pros, huom = ikkunat(a.hoitaja, nyt)
    ohjeet = lataa_projektit(a.projektit)
    if ohjeet['huom']:
        huom.append(ohjeet['huom'])
    sailyta_ms = min(nyt - SAILYTYS_VRK * PAIVA_MS, v_alku)
    os.makedirs(a.hoitaja, exist_ok=True)
    db = avaa_tila(a.hoitaja)
    try:
        tarkista_asetukset(db, ohjeet)
        paivita_tila(db, loki_tiedostot(a.lokit, (v_alku - PAIVA_MS) / 1000), sailyta_ms, ohjeet, a.verbose)
        rivit, projektit = laske(db, v_alku, h_alku, viikko_pros, ohjeet['oletus'])
        data = {'ts': nyt, 'viikko_alku': iso(v_alku), 'viisi_h_alku': iso(h_alku), 'viikko_pros': viikko_pros,
                'rivit': rivit, 'projektit': projektit}
    finally:
        db.close()
    if huom:
        data['huom'] = '; '.join(huom)
    kohde = os.path.join(a.hoitaja, 'kulutus.json')
    valiaikainen = '%s.tmp%d' % (kohde, os.getpid())  # oma nimi, jos kaksi ajoa osuu samaan aikaan
    with open(valiaikainen, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False)
    os.replace(valiaikainen, kohde)
    if a.verbose:
        print(f'kesto {time.time() - alku:.1f} s', file=sys.stderr)
    print(json.dumps(data, ensure_ascii=False))


if __name__ == '__main__':
    sys.exit(main())
