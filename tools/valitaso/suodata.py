"""VÄLITASO vaihe 1 (KS 3.11.2026): OSM-tiedostosta (planeetta) vain välitason tiet ja vedet viittauksineen.
Käyttö: python -I suodata.py <lähde.osm.pbf> <ulos.osm.pbf>
Tiet motorway/trunk/primary, joet waterway=river, leveät joet alueina (water=river, waterway=riverbank).
BackReferenceWriter lisää viitatut solmut ja relaatioiden jäsentiet toisella lukukierroksella."""
import sys, time
import osmium

LUOKAT = (('highway', 'motorway'), ('highway', 'trunk'), ('highway', 'primary'),
          ('waterway', 'river'), ('water', 'river'), ('waterway', 'riverbank'))


def main():
    lahde, ulos = sys.argv[1:3]
    t0 = time.time(); n = 0
    fp = osmium.FileProcessor(lahde, osmium.osm.WAY | osmium.osm.RELATION).with_filter(osmium.filter.TagFilter(*LUOKAT))
    with osmium.BackReferenceWriter(ulos, ref_src=lahde, overwrite=True) as w:
        for o in fp:
            w.add(o); n += 1
            if n % 1000000 == 0:
                print(f'{time.strftime("%H.%M")} {n} kohdetta', flush=True)
        print(f'{time.strftime("%H.%M")} suodatettu {n} kohdetta {time.time() - t0:.0f} s, viittaukset…', flush=True)
    print(f'{time.strftime("%H.%M")} VALMIS {time.time() - t0:.0f} s', flush=True)


if __name__ == '__main__':
    main()
