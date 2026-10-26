#!/usr/bin/env python3
"""Asemataulun koneen kuorma: muistin ja prosessorin käyttö prosentteina (omistaja 10.10.2026 klo 16.3x).

Ajo: python3 -I scratchpad/asemataulu/kone.py → tulostaa {"muisti": N, "prosessori": M}
Muisti = 100 − memory_pressuren vapaa-%, prosessori = 100 − topin idle-% (toinen näyte, 1 s).
"""
import json, re, subprocess


def muisti():
    ulos = subprocess.run(['memory_pressure'], capture_output=True, text=True).stdout
    m = re.search(r'free percentage:\s*(\d+)%', ulos)
    return 100 - int(m.group(1)) if m else None


def prosessori():
    ulos = subprocess.run(['top', '-l', '2', '-n', '0', '-s', '1'], capture_output=True, text=True).stdout
    idle = re.findall(r'CPU usage:.*?([\d.]+)% idle', ulos)
    return round(100 - float(idle[-1])) if idle else None


if __name__ == '__main__':
    print(json.dumps({'muisti': muisti(), 'prosessori': prosessori()}))
