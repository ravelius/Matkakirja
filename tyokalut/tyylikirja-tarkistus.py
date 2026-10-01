#!/usr/bin/env python3
# Tyylikirja (omistaja 1.10.2026, UI-pohjat): Tyylikirja.uss ja Tyylikirja.cs on generoitu webin repon
# tyylikirja/tyylikirja.json:sta (node tools/tyylikirja.mjs --natiivi <proto>), jonka kopio on tyylikirja/tyylikirja.json.
# Tarkistus: kopion sha256 (12 merkkiä) = generoitujen tiedostojen "lähde"-tunniste. Ero = käsin muokattu tai vanha kopio.
import hashlib, re, sys, os
os.chdir(os.path.join(os.path.dirname(__file__), '..'))
tunniste = hashlib.sha256(open('tyylikirja/tyylikirja.json', 'rb').read()).hexdigest()[:12]
virheet = 0
for p in ['Assets/Matkakirja/UI/Resources/MatkakirjaUI/Tyylikirja.uss', 'Assets/Matkakirja/UI/Tyylikirja.cs']:
    m = re.search(r'lähde ([0-9a-f]{12})', open(p, encoding='utf-8').read())
    if not m or m.group(1) != tunniste:
        print(f'TYYLIKIRJA: {p} ei vastaa tyylikirja.json:ia ({m.group(1) if m else "ei tunnistetta"} ≠ {tunniste}); aja webin repossa node tools/tyylikirja.mjs --natiivi <proto>')
        virheet += 1
sys.exit(1 if virheet else 0)
