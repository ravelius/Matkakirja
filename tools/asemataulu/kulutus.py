#!/usr/bin/env python3
"""Asemataulun Kulutus-osio: kuka on kuluttanut token-kiintiötä (omistaja 13.10.2026 klo 10.5x: "Saisiko tilannetauluun uuden
otsikon, minkä alle tulisi tietoja token-kulutuksista?").

Ajo: python3 -I scratchpad/asemataulu/kulutus.py → kirjoittaa scratchpad/asemataulu/hoitaja/kulutus.json ja tulostaa saman JSONin
viimeiselle riville. Hoitaja vie sen tauluun dokumenttina talo/kulutus, jota sivun Kulutus-osio lukee.

Lähteet: Clauden keskustelulokit /Users/koodaus/.claude/projects/<hakemisto>/*.jsonl (pääsessiot) ja
<hakemisto>/<uuid>/subagents/ alla olevat .jsonl-tiedostot (ali-agentit, myös workflows-alikansiot). Vain rivit, joilla
"type":"assistant" ja message.usage; saman viestin useat rivit lasketaan kerran message.id:llä (isoin tuloste jää).
Rooli lokihakemiston nimestä kuten laitteet.py:ssä (ROOLIT, WT); tuntemattomat ovat "Muut".
Ikkunat hoitaja/mittarit.json:sta: laatta Viikko (nollautuu − 7 vrk) ja laatta "5 tuntia" (nollautuu − 5 h).

Painot ovat ARVIO API:n hintasuhteista, eivät Clauden oikeaa kiintiölaskentaa: viestin paino = mallikerroin (Opus 5, Sonnet 3,
Haiku 1, muu 5) × (syöttö × 1 + välimuistin kirjoitus 5 min × 1,25 + 1 h × 2 + välimuistista luku × 0,1 + tuloste × 5).
Tokenit = syöttö + välimuistin kirjoitukset + tuloste (ei välimuistista luettuja). kiintio = roolin osuus viikon painosta ×
viikon käyttö-% (%-yksikköä viikkokiintiöstä).

Inkrementaalinen: hoitaja/kulutus.sqlite (tiedostot: polku, koko, offset, mtime; viestit: id, ts, rooli, agentti, malli, paino,
tokenit). Joka ajolla luetaan vain tiedostot, joiden mtime ≥ viikon alku − 1 vrk, ja niistä vain uudet tavut tallennetusta
offsetista (kokonaiset rivit; lyhentynyt tiedosto luetaan alusta). Yli 8 vrk vanhat viestit karsitaan. Ensimmäinen ajo lukee
viikon aikana muuttuneet lokit kokonaan, seuraavat vain uuden osan.
"""
import argparse
import json
import os
import sqlite3
import sys
import time
from datetime import datetime, timezone

LOKIT = '/Users/koodaus/.claude/projects'
HOITAJA = '/Users/Shared/Claude/Matkakirja-fable/scratchpad/asemataulu/hoitaja'
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
OSA = 16 * 1024 * 1024
# Nopea esisuodatin, joka ei riipu JSONin välilyönneistä: sekä "type":"assistant" että "role":"assistant" sisältävät tämän;
# tarkka tarkistus (type == assistant) tehdään jäsentämisen jälkeen.
TYYPPI = b'"assistant"'
UPSERT = ('INSERT INTO viestit (id, ts, rooli, agentti, malli, paino, tokenit) VALUES (?, ?, ?, ?, ?, ?, ?) '
          'ON CONFLICT(id) DO UPDATE SET ts = excluded.ts, rooli = excluded.rooli, agentti = excluded.agentti, '
          'malli = excluded.malli, paino = excluded.paino, tokenit = excluded.tokenit WHERE excluded.paino > viestit.paino')


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
        sisalto = list(os.scandir(kansio))
    except OSError:
        return
    for e in sisalto:
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
            sisalto = list(os.scandir(h.path))
        except OSError:
            continue
        for e in sisalto:
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


def lue_uudet(polku, offset, rooli, agentti, raja_ms):
    """Tiedoston kokonaiset rivit offsetista alkaen → (viestirivit, uusi offset). Sama viesti useana rivinä: suurin paino jää."""
    viestit = {}
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
                if TYYPPI not in rivi:
                    continue
                try:
                    d = json.loads(rivi)
                except ValueError:
                    continue
                if not isinstance(d, dict) or d.get('type') != 'assistant':
                    continue
                v = viesti(d, raja_ms)
                if v and (v[0] not in viestit or v[3] > viestit[v[0]][5]):
                    viestit[v[0]] = (v[0], v[1], rooli, agentti, v[2], v[3], v[4])
    return list(viestit.values()), pos


def avaa_tila(hoitaja):
    polku = os.path.join(hoitaja, 'kulutus.sqlite')
    for yritys in (1, 2):
        db = None
        try:
            db = sqlite3.connect(polku, timeout=60)
            db.execute('PRAGMA synchronous = NORMAL')
            db.execute('CREATE TABLE IF NOT EXISTS tiedostot (polku TEXT PRIMARY KEY, koko INTEGER, offset INTEGER, mtime INTEGER)')
            db.execute('CREATE TABLE IF NOT EXISTS viestit (id TEXT PRIMARY KEY, ts INTEGER, rooli TEXT, agentti INTEGER, '
                       'malli TEXT, paino REAL, tokenit INTEGER)')
            db.execute('CREATE INDEX IF NOT EXISTS viestit_ts ON viestit (ts)')
            db.commit()
            return db
        except sqlite3.DatabaseError:
            if db is not None:
                db.close()
            if yritys == 2 or not os.path.exists(polku):
                raise
            os.replace(polku, polku + '.rikki')  # tila rikki: aloitetaan alusta, vanha jää talteen


def paivita_tila(db, tiedostot, sailyta_ms, verbose):
    """Lukee uudet tavut muuttuneista lokeista tilaan ja karsii vanhat."""
    tallessa = {p: (k, o, m) for p, k, o, m in db.execute('SELECT polku, koko, offset, mtime FROM tiedostot')}
    tiedostoja = tavuja = 0
    for polku, rooli, agentti, koko, mtime in tiedostot:
        vanha = tallessa.get(polku)
        if vanha and vanha[0] == koko and vanha[2] == mtime:
            continue
        offset = vanha[1] if vanha and koko >= vanha[1] else 0
        try:
            viestit, uusi = lue_uudet(polku, offset, rooli, agentti, sailyta_ms)
        except OSError:
            continue
        with db:
            db.executemany(UPSERT, viestit)
            db.execute('INSERT OR REPLACE INTO tiedostot (polku, koko, offset, mtime) VALUES (?, ?, ?, ?)',
                       (polku, koko, uusi, mtime))
        tiedostoja += 1
        tavuja += uusi - offset
    with db:
        db.execute('DELETE FROM viestit WHERE ts < ?', (sailyta_ms,))
        for polku in tallessa:
            if not os.path.exists(polku):
                db.execute('DELETE FROM tiedostot WHERE polku = ?', (polku,))
    if verbose:
        print(f'luettu {tiedostoja} tiedostoa, {tavuja // 1000000} Mt; tilassa {len(tallessa)} tiedostoa', file=sys.stderr)


def laske(db, v_alku, h_alku, viikko_pros):
    """Rivit rooleittain: viikon osuus, kiintiöosuus, 5 h:n osuus, ali-agenttien osuus, tokenit; pienet yhdistetty riviin Muut."""
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
        return []
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
    return rivit


def main():
    ap = argparse.ArgumentParser(description='Asemataulun Kulutus-osion tiedot Clauden lokeista')
    ap.add_argument('-v', '--verbose', action='store_true', help='tulosta ajon tiedot (stderr)')
    ap.add_argument('--hoitaja', default=HOITAJA, help='kansio, jossa mittarit.json, kulutus.sqlite ja kulutus.json ovat')
    ap.add_argument('--lokit', default=LOKIT, help='Clauden projektilokien kansio')
    a = ap.parse_args()
    alku = time.time()
    nyt = int(alku * 1000)
    v_alku, h_alku, viikko_pros, huom = ikkunat(a.hoitaja, nyt)
    sailyta_ms = min(nyt - SAILYTYS_VRK * PAIVA_MS, v_alku)
    os.makedirs(a.hoitaja, exist_ok=True)
    db = avaa_tila(a.hoitaja)
    try:
        paivita_tila(db, loki_tiedostot(a.lokit, (v_alku - PAIVA_MS) / 1000), sailyta_ms, a.verbose)
        data = {'ts': nyt, 'viikko_alku': iso(v_alku), 'viisi_h_alku': iso(h_alku), 'viikko_pros': viikko_pros,
                'rivit': laske(db, v_alku, h_alku, viikko_pros)}
    finally:
        db.close()
    if huom:
        data['huom'] = '; '.join(huom)
    kohde = os.path.join(a.hoitaja, 'kulutus.json')
    with open(kohde + '.tmp', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False)
    os.replace(kohde + '.tmp', kohde)
    if a.verbose:
        print(f'kesto {time.time() - alku:.1f} s', file=sys.stderr)
    print(json.dumps(data, ensure_ascii=False))


if __name__ == '__main__':
    sys.exit(main())
