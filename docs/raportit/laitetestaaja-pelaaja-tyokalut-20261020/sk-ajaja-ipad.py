#!/usr/bin/env python3
"""LT: ajaa simulaattorin sk-skenaarion (ui / odota / kuva / oleta / oleta-uusi / alku) isolla iPadilla tiedostokanavan kautta.
Käyttö: python3 -I sk-ajaja-ipad.py <skenaario.txt> <tulos-kansio> <konsolilokin-polku>
Edellytys: appi asennettu ja käynnistetty --console -> <konsolilokin-polku> (laite UDID/bundle alla)."""
import sys, os, re, time, subprocess, tempfile
U = '00008103-001819421413401E'; B = 'fi.matkakirja.peli.kehitys'
sk, out, log = sys.argv[1], sys.argv[2], sys.argv[3]
os.makedirs(out, exist_ok=True)
tmp = tempfile.mkdtemp()
def sh(*a): subprocess.run(a, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
def laita(nimi, teksti):
    p = os.path.join(tmp, nimi); open(p, 'w').write(teksti + '\n')
    sh('xcrun', 'devicectl', 'device', 'copy', 'to', '--device', U, '--domain-type', 'appDataContainer', '--domain-identifier', B, '--source', p, '--destination', 'Documents/' + nimi)
def hae(nimi, kohde):
    sh('xcrun', 'devicectl', 'device', 'copy', 'from', '--device', U, '--domain-type', 'appDataContainer', '--domain-identifier', B, '--source', 'Documents/' + nimi, '--destination', kohde)
def loki(): return open(log, errors='replace').read()
def odota_loki(kuvio, max_s, uusi=False):
    alku = len(loki()) if uusi else 0
    t0 = time.time()
    while time.time() - t0 < max_s:
        if kuvio in loki()[alku:]: return True
        time.sleep(0.5)
    return False
lokirivit = []
for rivi in open(sk, errors='replace'):
    rivi = rivi.rstrip('\n')
    if not rivi.strip() or rivi.startswith('#'): continue
    k = rivi.split(' ', 1)
    cmd, arg = k[0], (k[1] if len(k) > 1 else '')
    if cmd == 'alku':
        # sim-ajon "alku odota-tila Aloitus 40;uusi-peli 5 lontoo;odota-tila Kartta 40" -> laite: uusi-peli (kaupunki sk:sta)
        m = re.search(r'uusi-peli (\d+ \w+)', arg)
        time.sleep(20); laita('peli-komento.txt', 'uusi-peli ' + (m.group(1) if m else '5 amsterdam')); time.sleep(40)
    elif cmd == 'ui':
        if arg.startswith('kierto vaaka') or arg.startswith('kierto pysty'): pass
        laita('ui-komento.txt', 'ui ' + arg); time.sleep(2.5)
    elif cmd == 'odota':
        time.sleep(float(arg))
    elif cmd == 'kuva':
        nimi = arg.split(' ', 1)[0]
        laita('komento.txt', 'kuva ' + nimi); time.sleep(3.5)
        hae(nimi + '.png', os.path.join(out, nimi + '.png'))
        lokirivit.append('kuva ' + nimi)
    elif cmd in ('oleta', 'oleta-uusi'):
        m = re.match(r'(\d+)\s+(.*?)(\s+--\s+.*)?$', arg)
        ok = odota_loki(m.group(2), float(m.group(1)), uusi=(cmd == 'oleta-uusi'))
        lokirivit.append(f'{cmd} {m.group(2)!r}: {"OK" if ok else "AIKAKATKAISU"}')
    else:
        lokirivit.append('TUNTEMATON ' + rivi)
open(os.path.join(out, 'sk-ajo-loki.txt'), 'w').write('\n'.join(lokirivit) + '\n')
print('SK VALMIS', len(lokirivit), 'riviä; aikakatkaisuja:', sum('AIKAKATKAISU' in r for r in lokirivit))
