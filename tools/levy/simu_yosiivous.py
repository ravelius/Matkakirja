"""Simulaattorien yösiivous (omistaja 1.11.2026 klo 10.1x, Julkaisija): T7-sarjan SAMMUTETUISTA laitteista tyhjennetään vain
data/Library/Application Support/PRBPosterExtensionDataStore -kansion sisältö (iOS:n lukitusnäytön poster-välimuisti, iOS luo
uudelleen). Appeihin, pelin dataan ja muuhun laitteen dataan ei kosketa; käynnissä olevat laitteet ohitetaan.

Lisäksi (omistaja 7.11.2026 klo 17.48) iPad-asennuksen välimuisti: vain AppInstallationBinaryDeltas/fi.matkakirja.peli.kehitys
tyhjennetään. Ohitetaan, jos devicectl on käynnissä tai iPad-lukko on olemassa. Ei riipu T7:stä; --udid ohittaa tämän osan.

  python3 -I tools/levy/simu_yosiivous.py               kuiva-ajo: koot, ei poistoja
  python3 -I tools/levy/simu_yosiivous.py --aja         tyhjennys (launchd-yöajo fi.matkakirja.simu-yosiivous)
  python3 -I tools/levy/simu_yosiivous.py --udid <UDID> vain yksi laite (kokeilu)
  python3 -I tools/levy/simu_yosiivous.py --paiva --aja  PÄIVÄSIIVOUS (omistaja 8.11.2026 klo 17.4x): vain iPad-välimuisti
      ja vain, kun levyllä on alle 30 Gi vapaana; simuihin ei kosketa (Postivahti mittauskierroksella, Raamattu 12.19).
Loki: /Users/Shared/Claude/_levy/simu-yosiivous-<vvvvkkpp>.log (lisäys).
"""
import json, os, shutil, subprocess, sys, time

SARJA = '/Volumes/T7 4TB/Simulaattorit/Sarja'
IPAD_VALIMUISTI = os.path.expanduser('~/Library/Containers/com.apple.CoreDevice.CoreDeviceService/Data/Library/Caches/'
                                     'AppInstallationBinaryDeltas/fi.matkakirja.peli.kehitys')
IPAD_LUKKO = '/tmp/matkakirja-ipad.lukko'
ALI = os.path.join('data', 'Library', 'Application Support', 'PRBPosterExtensionDataStore')
LOKIT = '/Users/Shared/Claude/_levy'
aja = '--aja' in sys.argv
vain = sys.argv[sys.argv.index('--udid') + 1].upper() if '--udid' in sys.argv else None
paiva = '--paiva' in sys.argv
PAIVA_RAJA_GI = 30

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


def devicectl_kaynnissa():
    # Pelkkä xcrun-kääre tai CoreDeviceService ei ole ajo; pgrep -x täsmää vain devicectl-prosessiin.
    return subprocess.run(['pgrep', '-x', 'devicectl'], capture_output=True).returncode == 0


def tyhjenna(kansio):
    for n in os.listdir(kansio):
        p = os.path.join(kansio, n)
        if os.path.isdir(p) and not os.path.islink(p):
            shutil.rmtree(p, ignore_errors=True)
        else:
            os.unlink(p)


def ipad_valimuisti():
    k = IPAD_VALIMUISTI
    if not os.path.isdir(k) or os.path.islink(k):
        kirjaa('iPad-välimuisti: ei kansiota, 0.0 Gt')
        return 0
    kt = koko(k)
    if os.path.exists(IPAD_LUKKO) or devicectl_kaynnissa():
        kirjaa(f'iPad-välimuisti OHITETTU (iPad-lukko tai devicectl käynnissä) {kt / 2**20:.1f} Gt')
        return 0
    if not aja:
        kirjaa(f'iPad-välimuisti TYHJENNETTÄISIIN {kt / 2**20:.1f} Gt')
        return kt
    tyhjenna(k)
    jaljella = koko(k)
    kirjaa(f'iPad-välimuisti TYHJENNETTY {kt / 2**20:.1f} Gt → {jaljella / 2**20:.2f} Gt')
    return kt - jaljella


if paiva:
    vapaa_gi = shutil.disk_usage('/Users/Shared').free / 2**30
    if vapaa_gi >= PAIVA_RAJA_GI:
        kirjaa(f'päiväsiivous: levyllä {vapaa_gi:.0f} Gi ≥ {PAIVA_RAJA_GI} Gi → ei tyhjennystä')
        sys.exit(0)
    kirjaa(f'päiväsiivous: levyllä {vapaa_gi:.0f} Gi < {PAIVA_RAJA_GI} Gi')
    vapautettu = ipad_valimuisti()
    kirjaa(f'loppu: {"vapautettu" if aja else "vapautuisi"} {vapautettu / 2**20:.1f} Gt (päiväsiivous, vain iPad-välimuisti)')
    sys.exit(0)

ipad_kt = 0 if vain else ipad_valimuisti()
if not os.path.isdir(SARJA):
    kirjaa(f'T7-sarjaa ei löydy ({SARJA}) → ei siivousta')
    sys.exit(2)
kirjaa(f'alku {"TYHJENNYS" if aja else "kuiva-ajo"}{" vain " + vain if vain else ""}')
juuri = os.path.realpath(SARJA) + os.sep
yht = ipad_kt
ohitettu = 0
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
        tyhjenna(kansio)
        jaljella = koko(kansio)
        kirjaa(f'TYHJENNETTY {udid} {kt / 2**20:.1f} Gt → {jaljella / 2**20:.2f} Gt')
        yht += kt - jaljella
    else:
        kirjaa(f'TYHJENNETTÄISIIN {udid} {kt / 2**20:.1f} Gt')
        yht += kt
kirjaa(f'loppu: {"vapautettu" if aja else "vapautuisi"} {yht / 2**20:.1f} Gt, ohitettu {ohitettu} käynnissä olevaa')
