#!/usr/bin/env python3
"""Asemataulun laitteet: mitä iPadilla, Blenderillä, Unityllä, simulaattoreissa, pilvessä ja Codexilla on juuri nyt ajossa.

Ajo: python3 -I scratchpad/asemataulu/laitteet.py  → kirjoittaa scratchpad/asemataulu/laitteet.json
(Postivahti kierroksellaan paivita.py:n kautta; omistaja 10.10.2026 klo 16.3x: iPad + Blender, 16.4x kortti: Unity-käännökset,
Pilviajot, Simulaattorit, Codex-tilaukset + prosessori). Rooli päätellään prosessin vanhemmista: ensimmäinen Claude-prosessi
ja sen työkansio (roolin checkout). Prosessori = prosessien %cpu yhteensä / ytimet (0–100).
"""
import json, os, re, subprocess, sys, time
from datetime import datetime, timezone

JUURI = '/Users/Shared/Claude/'
REPO = '/Users/Shared/Claude/Matkakirja-fable'
SIMUSARJA = '/Users/Shared/Claude/proto-3d/tyokalut/simusarja.sh'
YTIMET = os.cpu_count() or 1
ROOLIT = {
    'Matkakirja-fable': 'Päätoimittaja', 'Matkakirja-julkaisija': 'Julkaisija',
    'Matkakirja-3d-selvittaja': 'Natiiviseppä', 'Matkakirja-natiivi-ui': 'Natiivi-UI',
    'Matkakirja-linssiseppa': 'Linssiseppä', 'Matkakirja-linssiseppa-2': 'Linssiseppä 2',
    'Matkakirja-linnanrakentaja': 'Linnanrakentaja', 'Matkakirja-siirtoseppa': 'Siirtoseppä',
    'Matkakirja-karttaseppa': 'Karttaseppä', 'Matkakirja-pelikoodari': 'Pelikoodari',
    'Matkakirja-sisaltokirjuri': 'Sisältökirjuri', 'Matkakirja-laitetestaaja': 'Laitetestaaja',
    'Matkakirja-posti': 'Postivahti',
}
WT = {'fable': 'Päätoimittaja', 'julkaisija': 'Julkaisija', 'natiiviseppa': 'Natiiviseppä',
      'natiivi-ui': 'Natiivi-UI', 'natiivi': 'Natiivi-UI', 'linssiseppa2': 'Linssiseppä 2', 'linssiseppa-2': 'Linssiseppä 2',
      'linssiseppa': 'Linssiseppä', 'linnanrakentaja': 'Linnanrakentaja', 'siirtoseppa': 'Siirtoseppä',
      'karttaseppa': 'Karttaseppä', 'pelikoodari': 'Pelikoodari', 'sisaltokirjuri': 'Sisältökirjuri',
      'laitetestaaja': 'Laitetestaaja'}
# Tunnetut iPad-ajot selkokielelle; muuten skriptin nimi viivat välilyönneiksi.
IPAD_AJOT = {'museo-muisti-ipad': 'taidemuseon muistiajo', 'muistitarkka-ipad': 'muistimittaus',
             'muistitarkka-ipad-vali': 'muistimittaus', 'steam-ipad': 'Steam Audio -mittaus',
             'ipad-esittely159': 'esittelyn tallenne', 'ipad-tallenne': 'pelitallenne'}
IPAD = re.compile(r'devicectl|00008103|[\w-]*ipad[\w-]*\.(?:sh|zsh|py)', re.I)
BLENDER = re.compile(r'Blender\.app/Contents/MacOS/Blender\b')
UNITY = re.compile(r'Unity\.app/Contents/MacOS/Unity\b.*-batchmode|/usr/bin/xcodebuild\b|\bxcodebuild\s')
SKRIPTI = re.compile(r'([\w.-]+)\.(?:sh|zsh|py)\b')
SIMU = re.compile(r'^\s+(.+?) \(([0-9A-F-]{36})\) \(Booted\)')


def prosessit():
    ulos = subprocess.run(['ps', '-axo', 'pid=,ppid=,etime=,%cpu=,command='], capture_output=True, text=True).stdout
    P = {}
    for rivi in ulos.splitlines():
        osat = rivi.split(None, 4)
        if len(osat) == 5:
            try:
                P[int(osat[0])] = (int(osat[1]), osat[2], osat[4], float(osat[3].replace(',', '.')))
            except ValueError:
                pass
    return P


def tyokansio(pid):
    r = subprocess.run(['lsof', '-a', '-p', str(pid), '-d', 'cwd', '-Fn'], capture_output=True, text=True).stdout
    return next((l[1:] for l in r.splitlines() if l.startswith('n')), '')


def esivanhemmat(pid, P):
    """Prosessin ja sen vanhempien komennot alhaalta ylös (enintään 40)."""
    ketju = []
    for _ in range(40):
        if pid not in P or pid <= 1:
            break
        ketju.append(P[pid][2])
        pid = P[pid][0]
    return ketju


def rooli(pid, P):
    for _ in range(40):
        if pid not in P or pid <= 1:
            return ''
        ppid, _e, cmd, _c = P[pid]
        if 'MacOS/claude' in cmd:
            polku = tyokansio(pid)
            if polku.startswith(JUURI):
                osa = polku[len(JUURI):].split('/')
                if osa[0] in ROOLIT:
                    return ROOLIT[osa[0]]
                if osa[0] == 'wt' and len(osa) > 1:
                    nimi = osa[1].removeprefix('proto-')
                    for avain in sorted(WT, key=len, reverse=True):
                        if nimi.startswith(avain):
                            return WT[avain]
            return ''
        pid = ppid
    return ''


def kesto_min(etime):
    # ps etime: [[dd-]hh:]mm:ss
    paivat, _, aika = etime.rpartition('-')
    osat = [int(x) for x in aika.split(':')]
    while len(osat) < 3:
        osat.insert(0, 0)
    return (int(paivat or 0) * 1440) + osat[0] * 60 + osat[1]


def prosentti(cpu):
    return max(0, min(100, round(cpu / YTIMET)))


def osumat(kuvio, P, oma):
    return [(pid, v) for pid, v in P.items() if kuvio.search(v[2]) and 'grep' not in v[2] and pid != oma
            and 'laitteet.py' not in v[2]]


def laite(nimi, kuvio, P, oma):
    o = osumat(kuvio, P, oma)
    if not o:
        return {'nimi': nimi, 'tila': 'vapaa'}
    # Vanhin osuma kertoo ajon alun; skriptin nimi kuvaa ajon.
    pid, (ppid, etime, cmd, _c) = max(o, key=lambda x: kesto_min(x[1][1]))
    kuvaus = ''
    for p, (_pp, _e, c, _cc) in o:
        m = SKRIPTI.search(c)
        if m and not c.startswith('/bin/zsh -c'):
            kuvaus = m.group(1)
            break
    tunnettu = nimi == 'iPad' and kuvaus in IPAD_AJOT
    kuvaus = IPAD_AJOT[kuvaus] if tunnettu else kuvaus.replace('_', ' ').replace('-', ' ')
    # tunnettu = selkokielinen ajon nimi; muuten sivu näyttää roolin tehtävän (tehtavat) ja tämän vain varalla.
    rivi = {'nimi': nimi, 'tila': 'käytössä', 'rooli': rooli(pid, P), 'kuvaus': kuvaus, 'tunnettu': tunnettu,
            'kesto_min': kesto_min(etime)}
    if nimi == 'Blender':
        rivi['prosessori'] = prosentti(sum(v[3] for _p, v in o))
    return rivi


def unity(P, oma):
    """Unityn eräajot ja Xcode-käännökset roolin mukaan; Actions-ajurin ajo = TestFlight-käännös (CI)."""
    ryhmat = {}
    for pid, v in osumat(UNITY, P, oma):
        ketju = esivanhemmat(pid, P)
        teksti = ' '.join(ketju)
        if 'actions-runner' in teksti or 'Runner.Worker' in teksti:
            avain, mita = 'CI', 'TestFlight-käännös (CI)'
        else:
            avain = rooli(pid, P) or 'tuntematon'
            if '-runTests' in v[2] or re.search(r'-testit/', teksti):
                mita = 'testit'
            elif 'unity-tarkistus' in teksti or 'tarkista.sh' in teksti:
                mita = 'tarkistus'
            elif 'xcodebuild' in v[2]:
                mita = 'Xcode-käännös'
            else:
                mita = 'käännös'
        g = ryhmat.setdefault(avain, {'mita': mita, 'cpu': 0.0})
        g['cpu'] += v[3]
        if mita == 'Xcode-käännös' and g['mita'] != 'Xcode-käännös':
            g['mita'] = mita
    if not ryhmat:
        return {'nimi': 'Unity', 'tila': 'vapaa'}
    cpu = prosentti(sum(g['cpu'] for g in ryhmat.values()))
    if len(ryhmat) == 1:
        avain, g = next(iter(ryhmat.items()))
        return {'nimi': 'Unity', 'tila': 'käytössä', 'rooli': '' if avain in ('CI', 'tuntematon') else avain,
                'kuvaus': g['mita'], 'tunnettu': True, 'prosessori': cpu}
    kuvaus = ' · '.join(g['mita'] if a in ('CI', 'tuntematon') else f"{a}: {g['mita']}" for a, g in ryhmat.items())
    return {'nimi': 'Unity', 'tila': 'käytössä', 'rooli': '', 'kuvaus': kuvaus, 'tunnettu': True, 'prosessori': cpu}


def simulaattorit(P):
    """Käynnissä olevat simulaattorit (T7:n laitesarja); nimi = <rooli>-<laite>, esim. siirtoseppa-iPad13."""
    try:
        ulos = subprocess.run(['zsh', SIMUSARJA, 'simctl', 'list', 'devices', 'booted'], capture_output=True, text=True,
                              timeout=20).stdout
    except (OSError, subprocess.SubprocessError):
        return {'nimi': 'Simulaattorit', 'tila': 'vapaa'}
    laitteet = [SIMU.match(r).groups() for r in ulos.splitlines() if SIMU.match(r)]
    if not laitteet:
        return {'nimi': 'Simulaattorit', 'tila': 'vapaa'}
    nimet = []
    for nimi, _udid in laitteet:
        osa, _, malli = nimi.rpartition('-')
        malli = re.sub(r'^(iPad|iPhone)(\d)', r'\1 \2', malli)
        omistaja = next((WT[a] for a in sorted(WT, key=len, reverse=True) if osa.startswith(a)), osa or nimi)
        nimet.append(f'{omistaja} ({malli})' if osa else nimi)
    # Laitesarja on T7:llä (…/Simulaattorit/Sarja/<UDID>/data/…), joten osuma pelkällä UDID:llä.
    cpu = sum(v[3] for v in P.values() if any(u in v[2] for _n, u in laitteet))
    return {'nimi': 'Simulaattorit', 'tila': 'käytössä', 'rooli': '', 'kuvaus': ', '.join(nimet), 'tunnettu': True,
            'prosessori': prosentti(cpu)}


def gh(*argumentit):
    r = subprocess.run(['gh', *argumentit], capture_output=True, text=True, timeout=20, cwd=REPO)
    if r.returncode != 0:
        raise RuntimeError(r.stderr.strip()[:200])
    return json.loads(r.stdout)


def maiden_nimet():
    try:
        teksti = open(os.path.join(REPO, 'js/packs/maailmankartta.js'), encoding='utf-8').read()
    except OSError:
        return {}
    return dict(re.findall(r'"([A-Z]{3})":\s*\{"nimi":"([^"]+)"', teksti))


def ika_min(iso):
    t = datetime.fromisoformat(iso.replace('Z', '+00:00'))
    return (datetime.now(timezone.utc) - t).total_seconds() / 60


def pilviajot():
    """Pulun pilvisessiot: haara pulu-<iso3>-pilvi, jossa commit alle 40 min sitten (sessiot pushaavat erien välein)."""
    kysely = ('query{repository(owner:"ravelius",name:"Matkakirja"){refs(refPrefix:"refs/heads/",query:"-pilvi",first:100)'
              '{nodes{name target{... on Commit{committedDate}}}}}}')
    try:
        data = gh('api', 'graphql', '-f', f'query={kysely}')
    except (RuntimeError, OSError, subprocess.SubprocessError, ValueError):
        return {'nimi': 'Pilviajot', 'tila': 'vapaa'}
    nimet = maiden_nimet()
    aktiiviset = []
    for n in data['data']['repository']['refs']['nodes']:
        m = re.fullmatch(r'pulu-([a-z]{3})-pilvi', n['name'])
        pvm = (n.get('target') or {}).get('committedDate')
        if m and pvm and ika_min(pvm) < 40:
            aktiiviset.append(nimet.get(m.group(1).upper(), m.group(1).upper()))
    if not aktiiviset:
        return {'nimi': 'Pilviajot', 'tila': 'vapaa'}
    return {'nimi': 'Pilviajot', 'tila': 'käytössä', 'rooli': '', 'kuvaus': 'Pulu: ' + ', '.join(sorted(aktiiviset)),
            'tunnettu': True}


def codex():
    """Codexin postilaatikko (claude/postilaatikko): tilaus = Clauden commit "Tilaus Codexille: …"; Codexin toimitukset ovat
    englanninkielisiä. Käytössä, kun uusin tilaus on uudempi kuin Codexin uusin toimitus tai Codex toimitti alle 15 min sitten
    eikä viesti ala sanalla Complete."""
    try:
        commitit = gh('api', 'repos/ravelius/Matkakirja/commits?sha=claude/postilaatikko&per_page=30')
    except (RuntimeError, OSError, subprocess.SubprocessError, ValueError):
        return {'nimi': 'Codex', 'tila': 'vapaa'}
    tilaus = toimitus = None
    for c in commitit:
        viesti = c['commit']['message'].split('\n')[0]
        pvm = c['commit']['committer']['date']
        if re.match(r'(Tilaus|Fable|Päätoimittaja|PT)\b', viesti):
            tilaus = tilaus or (pvm, viesti)
        else:
            toimitus = toimitus or (pvm, viesti)
        if tilaus and toimitus:
            break
    if not tilaus:
        return {'nimi': 'Codex', 'tila': 'vapaa'}
    otsikko = re.sub(r'^Tilaus Codexille:\s*', '', tilaus[1])
    odottaa = toimitus is None or tilaus[0] > toimitus[0]
    tyossa = toimitus is not None and ika_min(toimitus[0]) < 15 and not toimitus[1].startswith('Complete')
    if odottaa or tyossa:
        return {'nimi': 'Codex', 'tila': 'käytössä', 'rooli': '', 'kuvaus': otsikko[:80], 'tunnettu': True}
    return {'nimi': 'Codex', 'tila': 'vapaa'}


def main():
    P = prosessit()
    oma = os.getpid()
    rivit = [laite('iPad', IPAD, P, oma), laite('Blender', BLENDER, P, oma), unity(P, oma), simulaattorit(P),
             pilviajot(), codex()]
    data = {'ts': int(time.time() * 1000), 'rivit': rivit}
    kohde = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'laitteet.json')
    with open(kohde, 'w') as f:
        json.dump(data, f, ensure_ascii=False)
    print(json.dumps(data, ensure_ascii=False))


if __name__ == '__main__':
    sys.exit(main())
