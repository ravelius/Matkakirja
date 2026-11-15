"""Asemahallien kattoväri = kaupungin talokattojen perusväri (KK 15.11. 05.26 kohta 3). Kaatuu, jos talojen paletti muuttuu eikä vientiä ajeta uudelleen.
python3 -I testi_kattovari.py [<pelin Resources/Elava -kansio>]"""
import importlib.util, os, struct, sys
TY = os.path.dirname(os.path.abspath(__file__))
sp = importlib.util.spec_from_file_location('vie', os.path.join(TY, 'vie.py')); vie = importlib.util.module_from_spec(sp); sp.loader.exec_module(vie)
ELAVA = sys.argv[1] if len(sys.argv) > 1 else '/Users/Shared/Claude/wt/valoseppa-tyyppimallit-peliin/Assets/Matkakirja/Linssit/Resources/Elava'
virheet = 0
# Sääntö: perhe-haara ja tasatilanne (listan ensimmäinen) samasta lähteestä.
lahde = open(os.path.join(vie.KAUPUNKI_TYOKALU, 'katot.py'), encoding='utf-8').read()
for perhe in ('pariisi', 'lontoo'):
    lista = vie.perheen_katot(lahde, perhe); paras = max(o for _, o in lista)
    oikea = next(v for v, o in lista if o == paras)
    print(f'perhe {perhe}: {oikea} (osuus {paras})')
for k in vie.ORIGO:
    odotus, selite = vie.kattovari(k)
    d = open(os.path.join(ELAVA, f'merkit-{k}-kartta.bytes'), 'rb').read()
    n = struct.unpack_from('<H', d, 4)[0]
    asemat = [struct.unpack_from('<f', d, 32 + 24 * i + 12)[0] for i in range(n) if d[32 + 24 * i] == 7]
    vaarat = [a for a in asemat if int(a) != odotus]
    tila = 'OK' if asemat and not vaarat else 'VIRHE'
    virheet += tila != 'OK'
    print(f'{tila} {k}: {len(asemat)} asemamallia, odotus #{odotus:06X} ({selite}), väärät {[f"#{int(a):06X}" for a in vaarat]}')
sys.exit(1 if virheet else 0)
