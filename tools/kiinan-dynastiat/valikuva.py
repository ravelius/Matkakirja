#!/usr/bin/env python3
"""Välikuva PT:lle ja omistajalle: neljä avainvuotta 2 × 2 ilman vertailuviivoja."""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
import matplotlib; matplotlib.use('Agg')
import matplotlib.pyplot as plt
import piirra
K = piirra.K
fig, axs = plt.subplots(2, 2, figsize=(20, 13.6), dpi=90)
for ax, v in zip(axs.flat, [-221, -100, 1142, 1760]): piirra.piirra(v, False, ax)
fig.suptitle('Kiinan dynastiat -linssi: ensimmäiset neljä avainvuotta (luonnos)', fontsize=22, family='serif', x=0.02, ha='left')
fig.text(0.02, 0.01, 'Lämpimät värit: kiinalaiset dynastiat · viileät ja keltainen: ulkoiset hallitsijat · vinoviivat: kotiseutu · pisteet: protektoraatti · '
         'neliö: pääkaupunki.  Oma piirros (CC0), rannat ja joet Natural Earth; rajoja verrattu Cliopatriaan (CC BY 4.0).',
         fontsize=12, family='serif')
fig.tight_layout(rect=(0, 0.03, 1, 0.96)); fig.savefig(f'{K}/tulos/valikuva-4-vuotta.jpg', pil_kwargs={'quality': 88})
