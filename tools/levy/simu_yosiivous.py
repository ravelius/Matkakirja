"""Simulaattorien yösiivous (omistaja 1.11.2026 klo 10.1x, Julkaisija): T7-sarjan SAMMUTETUISTA laitteista tyhjennetään vain
data/Library/Application Support/PRBPosterExtensionDataStore -kansion sisältö (iOS:n lukitusnäytön poster-välimuisti, iOS luo
uudelleen). Appeihin, pelin dataan ja muuhun laitteen dataan ei kosketa; käynnissä olevat laitteet ohitetaan.

  python3 -I tools/levy/simu_yosiivous.py               kuiva-ajo: koot, ei poistoja
  python3 -I tools/levy/simu_yosiivous.py --aja         tyhjennys (launchd-yöajo fi.matkakirja.simu-yosiivous)
  python3 -I tools/levy/simu_yosiivous.py --udid <UDID> vain yksi laite (kokeilu)
Loki: /Users/Shared/Claude/_levy/simu-yosiivous-<vvvvkkpp>.log (lisäys).
"""
import json, os, shutil, subprocess, sys, time

SARJA = '/Volumes/T7 4TB/Simulaattorit/Sarja'
ALI = os.path.join('data', 'Library', 'Application Support', 'PRBPosterExtensionDataStore')
LOKIT = '/Users/Shared/Claude/_levy'
aja = '--aja' in sys.argv
vain = sys.argv[sys.argv.index('--udid') + 1].upper() if '--udid' in sys.argv else None

os.makedirs(LOKIT, exist_ok=True)
loki = open(os.path.join(LOKIT, time.strftime('simu-yosiivous-%Y%m%d.log')), 'a')


def kirjaa(rivi):
    rivi = time.strftime('%H:%M:%S ') + rivi
    print(rivi)
    loki.write(rivi + '\n')
    loki.flush()


def tilat():
    tulos = subprocess.run(['xcrun', 'simctl', '--set', SARJA, 'list', '-j', 'devices'],
                           capture_output=True, text=True, timeout=120)
    if tulos.returncode != 0:
        raise RuntimeError(tulos.stderr.strip())
    return {d['udid'].upper(): d['state'] for ds in json.loads(tulos.stdout)['devices'].values() for d in ds}


def koko(p):
    t = subprocess.run(['du', '-xsk', p], capture_output=True, text=True)
    return int(t.stdout.split()[0]) if t.returncode == 0 and t.stdout else 0


if not os.path.isdir(SARJA):
    kirjaa(f'T7-sarjaa ei löydy ({SARJA}) → ei siivousta')
    sys.exit(2)
kirjaa(f'alku {"TYHJENNYS" if aja else "kuiva-ajo"}{" vain " + vain if vain else ""}')
juuri = os.path.realpath(SARJA) + os.sep
yht = ohitettu = 0
for udid, tila in sorted(tilat().items()):
    if vain and udid != vain:
        continue
    kansio = os.path.join(SARJA, udid, ALI)
    if not os.path.isdir(kansio) or os.path.islink(kansio) or not os.path.realpath(kansio).startswith(juuri):
        continue
    kt = koko(kansio)
    if tila != 'Shutdown':
        kirjaa(f'OHITETTU {udid} ({tila}) {kt / 2**20:.1f} Gt')
        ohitettu += 1
        continue
    if aja:
        # Tila uudelleen juuri ennen tyhjennystä: rooli on voinut käynnistää laitteen listauksen jälkeen.
        if tilat().get(udid) != 'Shutdown':
            kirjaa(f'OHITETTU {udid} (käynnistyi kesken)')
            ohitettu += 1
            continue
        for n in os.listdir(kansio):
            p = os.path.join(kansio, n)
            if os.path.isdir(p) and not os.path.islink(p):
                shutil.rmtree(p, ignore_errors=True)
            else:
                os.unlink(p)
        jaljella = koko(kansio)
        kirjaa(f'TYHJENNETTY {udid} {kt / 2**20:.1f} Gt → {jaljella / 2**20:.2f} Gt')
        yht += kt - jaljella
    else:
        kirjaa(f'TYHJENNETTÄISIIN {udid} {kt / 2**20:.1f} Gt')
        yht += kt
kirjaa(f'loppu: {"vapautettu" if aja else "vapautuisi"} {yht / 2**20:.1f} Gt, ohitettu {ohitettu} käynnissä olevaa')
