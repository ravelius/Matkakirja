#!/usr/bin/env python3
"""Asemataulun 5 min -vienti (omistaja 10.10. 21.4x): jos katsojan syke (talo/katsoja.ts) on alle 6 min vanha,
ajaa paivita.py:n (vienti/*.json) ja tulostaa TUORE; muuten VANHA. Argumentti: ArtifactData list -kansion talo/-polku."""
import json, os, subprocess, sys, time

kansio = sys.argv[1]
try:
    ts = json.load(open(os.path.join(kansio, 'katsoja.json'))).get('ts', 0)
except (OSError, ValueError):
    ts = 0
ika = time.time() - ts / 1000
if ika > 360:
    print(f'VANHA ({int(ika // 60)} min)')
    sys.exit(0)
subprocess.run([sys.executable, '-I', os.path.join(os.path.dirname(os.path.abspath(__file__)), 'paivita.py')],
               capture_output=True, timeout=120, check=True)
print('TUORE')
