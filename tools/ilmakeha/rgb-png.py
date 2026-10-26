"""Raaka RGB8 → PNG (Karttaseppä 8.10.2026; ilmakeha-lut.mjs:n esikatselut ja pilvet.mjs). Käyttö: rgb-png.py <rgb> <leveys> <korkeus> <png>"""
import sys
from PIL import Image

src, w, h, dst = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), sys.argv[4]
Image.frombytes('RGB', (w, h), open(src, 'rb').read()).save(dst)
