#!/usr/bin/env python3
"""Asemataulun laitteet: mitä iPadilla ja Blenderillä on juuri nyt ajossa ja kenen ajo se on.

Ajo: python3 -I scratchpad/asemataulu/laitteet.py  → kirjoittaa scratchpad/asemataulu/laitteet.json
(Postivahti kierroksellaan, Päätoimittaja vie artefaktiin; omistaja 10.10.2026 klo 16.5x).
Rooli päätellään prosessin vanhemmista: ensimmäinen Claude-prosessi ja sen työkansio (roolin checkout).
"""
import json, os, re, subprocess, sys, time

JUURI = '/Users/Shared/Claude/'
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
      'natiivi': 'Natiivi-UI', 'linssiseppa2': 'Linssiseppä 2', 'linssiseppa': 'Linssiseppä',
      'linnanrakentaja': 'Linnanrakentaja', 'siirtoseppa': 'Siirtoseppä', 'karttaseppa': 'Karttaseppä',
      'pelikoodari': 'Pelikoodari', 'sisaltokirjuri': 'Sisältökirjuri', 'laitetestaaja': 'Laitetestaaja'}
# Tunnetut iPad-ajot selkokielelle; muuten skriptin nimi viivat välilyönneiksi.
IPAD_AJOT = {'museo-muisti-ipad': 'taidemuseon muistiajo', 'muistitarkka-ipad': 'muistimittaus',
             'muistitarkka-ipad-vali': 'muistimittaus', 'steam-ipad': 'Steam Audio -mittaus',
             'ipad-esittely159': 'esittelyn tallenne', 'ipad-tallenne': 'pelitallenne'}
IPAD = re.compile(r'devicectl|00008103|[\w-]*ipad[\w-]*\.(?:sh|zsh|py)', re.I)
BLENDER = re.compile(r'Blender\.app/Contents/MacOS/Blender\b')
SKRIPTI = re.compile(r'([\w.-]+)\.(?:sh|zsh|py)\b')


def prosessit():
    ulos = subprocess.run(['ps', '-axo', 'pid=,ppid=,etime=,command='], capture_output=True, text=True).stdout
    P = {}
    for rivi in ulos.splitlines():
        osat = rivi.split(None, 3)
        if len(osat) == 4:
            P[int(osat[0])] = (int(osat[1]), osat[2], osat[3])
    return P


def tyokansio(pid):
    r = subprocess.run(['lsof', '-a', '-p', str(pid), '-d', 'cwd', '-Fn'], capture_output=True, text=True).stdout
    return next((l[1:] for l in r.splitlines() if l.startswith('n')), '')


def rooli(pid, P):
    for _ in range(40):
        if pid not in P or pid <= 1:
            return ''
        ppid, _e, cmd = P[pid]
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


def laite(nimi, kuvio, P, oma):
    osumat = [(pid, v) for pid, v in P.items() if kuvio.search(v[2]) and 'grep' not in v[2] and pid != oma
              and 'laitteet.py' not in v[2]]
    if not osumat:
        return {'nimi': nimi, 'tila': 'vapaa'}
    # Vanhin osuma kertoo ajon alun; skriptin nimi kuvaa ajon.
    pid, (ppid, etime, cmd) = max(osumat, key=lambda o: kesto_min(o[1][1]))
    kuvaus = ''
    for p, (_pp, _e, c) in osumat:
        m = SKRIPTI.search(c)
        if m and not c.startswith('/bin/zsh -c'):
            kuvaus = m.group(1)
            break
    tunnettu = nimi == 'iPad' and kuvaus in IPAD_AJOT
    kuvaus = IPAD_AJOT[kuvaus] if tunnettu else kuvaus.replace('_', ' ').replace('-', ' ')
    # tunnettu = selkokielinen ajon nimi; muuten sivu näyttää roolin tehtävän (tehtavat) ja tämän vain varalla.
    return {'nimi': nimi, 'tila': 'käytössä', 'rooli': rooli(pid, P), 'kuvaus': kuvaus, 'tunnettu': tunnettu,
            'kesto_min': kesto_min(etime)}


def main():
    P = prosessit()
    oma = os.getpid()
    data = {'ts': int(time.time() * 1000), 'rivit': [laite('iPad', IPAD, P, oma), laite('Blender', BLENDER, P, oma)]}
    kohde = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'laitteet.json')
    with open(kohde, 'w') as f:
        json.dump(data, f, ensure_ascii=False)
    print(json.dumps(data, ensure_ascii=False))


if __name__ == '__main__':
    sys.exit(main())
