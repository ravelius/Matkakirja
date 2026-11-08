#!/opt/homebrew/bin/python3
# Merenpohja 3D -maastosarjan vientipaketti kovalinkeillä, LAHTEET.md ja SHA256SUMS (KS 8.11.2026). tee-vienti.py <lahde> <paketti> <amparipolku> <kuvaus>
import hashlib, os, shutil, sys
L, V, P, kuvaus = sys.argv[1:5]
rivit = []; n = 0
for juuri, _, tied in sorted(os.walk(L)):
    for f in sorted(tied):
        if not (f.endswith('.terrain') or f == 'layer.json'): continue
        lahde = os.path.join(juuri, f); suht = os.path.relpath(lahde, L)
        kohde = os.path.join(V, P, suht); os.makedirs(os.path.dirname(kohde), exist_ok=True)
        if not os.path.exists(kohde):
            try: os.link(lahde, kohde)
            except OSError: shutil.copy2(lahde, kohde)   # T7 → sisäinen: kopio
        rivit.append(f'{hashlib.sha256(open(kohde, "rb").read()).hexdigest()}  {P}/{suht}'); n += f.endswith('.terrain')
open(f'{V}/SHA256SUMS', 'w').write('\n'.join(rivit) + '\n')
open(f'{V}/LAHTEET.md', 'w').write(f'''# Kohokartan 3D-maasto, merenpohja ({kuvaus}; Karttaseppä 8.11.2026, PT:n erä merenpohja 3D osa 1)
Oma tuotos (tools/maasto/tee-maasto.mjs --raaka, haara karttaseppa/merenpohja-3d; kenttä tee-3d15.py: maa > 0 m GLO-90, muualla min(0, ETOPO 2022 15″), syvyys silotettu 6 km kuten kohokartan v6-värit). Tasot z0–9, --virhekerroin 0.25, --dem-normaalit, korostusvara 15 ylös ja alas (otsakkeen min/max).
- Maa: Copernicus DEM GLO-90. "Produced using Copernicus WorldDEM-90 © DLR e.V. 2010-2014 and © Airbus Defence and Space GmbH 2014-2018 provided under COPERNICUS by the European Union and ESA; all rights reserved." Lisenssi: Copernicus DEM vapaa käyttölisenssi, lähdemaininta.
- Meri: NOAA NCEI ETOPO 2022 15″ (ETOPO_2022_v1_15s_*_surface). Lisenssi: PD (public domain).
Polku ämpärissä: {P}/{{z}}/{{x}}/{{y}}.terrain ({n} laattaa), Content-Type application/vnd.quantized-mesh, Content-Encoding gzip; layer.json viimeisenä.
''')
print('laattoja', n)
