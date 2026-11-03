"""Välitason julkaisusarja (KS 3.11.2026): vanha pohjasarja kovalinkkeinä + muuttuneet Z9/Z10 kopioina, laatat.json päivitettynä.
Käyttö: python -I kokoa.py <vanha sarja> <muuttuneet> <ulos>"""
import json, os, shutil, sys, time


def main():
    vanha, muut, ulos = sys.argv[1:4]
    n_link = n_uusi = 0
    for juuri, _, tiedostot in os.walk(vanha):
        kohde = os.path.join(ulos, os.path.relpath(juuri, vanha))
        os.makedirs(kohde, exist_ok=True)
        for f in tiedostot:
            if f.endswith('.jpg'):
                os.link(os.path.join(juuri, f), os.path.join(kohde, f)); n_link += 1
    for juuri, _, tiedostot in os.walk(muut):
        kohde = os.path.join(ulos, os.path.relpath(juuri, muut))
        os.makedirs(kohde, exist_ok=True)
        for f in tiedostot:
            if f.endswith('.jpg'):
                k = os.path.join(kohde, f)
                if os.path.exists(k): os.unlink(k)  # kovalinkki irti, vanha tiedosto ei muutu
                shutil.copyfile(os.path.join(juuri, f), k); n_uusi += 1
    l = json.load(open(os.path.join(vanha, 'laatat.json'), encoding='utf-8'))
    l.update({'versio': '2026-11-03-pohja-valitaso', 'tunniste': '20261103',
              'tehty': time.strftime('%Y-%m-%dT%H:%M:%S.000Z', time.gmtime()),
              'valitaso': {'pohja': '2026-10-26-pohja-20261027', 'muuttuneet': n_uusi,
                           'kasittely': 'Z9: OSM motorway + trunk ja leveät joet alueina (water=river, ≥ 15 px²); Z10: lisäksi primary ja '
                                        'waterway=river kaupunkien ±1° laatikoissa (pallo-z10.json), häivytys laatikon reunaan 1,5 laattaa; '
                                        'laatikon ulkopuolella Z10 = Z9:n sisältö. Lähde OSM-planeetta 26.10.2026 (© OpenStreetMap contributors, ODbL). '
                                        'Skriptit proto-3d/_tyo/karttaseppa/valitaso-20261103/ (suodata, pura, piirra2).'}})
    json.dump(l, open(os.path.join(ulos, 'laatat.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(f'kovalinkkejä {n_link}, muuttuneita {n_uusi}')


if __name__ == '__main__':
    main()
