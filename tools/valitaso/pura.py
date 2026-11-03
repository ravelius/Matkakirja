"""VÄLITASO vaihe 2 (KS 3.11.2026): suodatetusta pbf:stä koordinaatit Euroopan rajaukseen luokittain (npz).
Käyttö: python -I pura.py <suodatettu.osm.pbf> <ulos.npz>
Luokat: motorway, trunk, primary, joki (waterway=river -viivat), vesi (water=river / waterway=riverbank -alueet).
Jokaisesta kohteesta pisteet (lon, lat float32), alku-indeksi ja rajaus; vedessä renkaat ja tieto ulko/sisä."""
import sys, time
import numpy as np
import osmium

RAJA = (-32.0, 25.0, 50.0, 72.0)  # lon0, lat0, lon1, lat1: pelialue Eurooppa (kaupunkien Z10-laatikot mahtuvat)
TIET = ('motorway', 'trunk', 'primary')
# Solmuindeksi levylle (T7): flex_mem kasvoi planeetan suodatuksella 10 Gt:hen ja ajoi koneen swapille 3.11. 04.4x.
SOLMUT = 'sparse_file_array,/Volumes/T7 4TB/Matkakirja-karttaseppa/valitaso-osm/solmut.idx'


class Kerays:
    def __init__(self):
        self.pisteet, self.alut, self.sisa = [], [0], []

    def lisaa(self, pts, sisa=False):
        a = np.asarray(pts, dtype=np.float32)
        if len(a) < 2:
            return
        if a[:, 0].max() < RAJA[0] or a[:, 0].min() > RAJA[2] or a[:, 1].max() < RAJA[1] or a[:, 1].min() > RAJA[3]:
            return
        self.pisteet.append(a); self.alut.append(self.alut[-1] + len(a)); self.sisa.append(sisa)

    def tallenna(self, d, nimi):
        p = np.concatenate(self.pisteet) if self.pisteet else np.zeros((0, 2), np.float32)
        d[nimi + '_p'] = p; d[nimi + '_a'] = np.asarray(self.alut, np.int64); d[nimi + '_s'] = np.asarray(self.sisa, bool)


def main():
    lahde, ulos = sys.argv[1:3]
    t0 = time.time()
    k = {n: Kerays() for n in TIET + ('joki', 'vesi')}
    fp = (osmium.FileProcessor(lahde, osmium.osm.NODE | osmium.osm.WAY | osmium.osm.RELATION | osmium.osm.AREA)
          .with_locations(SOLMUT).with_areas(osmium.filter.TagFilter(('water', 'river'), ('waterway', 'riverbank')))
          .with_filter(osmium.filter.EntityFilter(osmium.osm.WAY | osmium.osm.AREA)))  # solmut eivät Pythoniin
    n = 0
    for o in fp:
        n += 1
        if n % 1000000 == 0:
            print(f'{time.strftime("%H.%M")} {n}', flush=True)
        t = o.tags
        if o.is_area():
            if t.get('water') == 'river' or t.get('waterway') == 'riverbank':
                for ulko in o.outer_rings():
                    k['vesi'].lisaa([(p.lon, p.lat) for p in ulko if p.location.valid()])
                    for sisa in o.inner_rings(ulko):
                        k['vesi'].lisaa([(p.lon, p.lat) for p in sisa if p.location.valid()], True)
        elif o.is_way():
            h = t.get('highway'); luokka = h if h in TIET else ('joki' if t.get('waterway') == 'river' else None)
            if luokka:
                k[luokka].lisaa([(p.lon, p.lat) for p in o.nodes if p.location.valid()])
    d = {}
    for nimi, kk in k.items():
        kk.tallenna(d, nimi)
        print(f'{nimi}: {len(kk.sisa)} kohdetta, {len(d[nimi + "_p"])} pistettä', flush=True)
    np.savez(ulos, **d)
    print(f'{time.strftime("%H.%M")} VALMIS {time.time() - t0:.0f} s', flush=True)


if __name__ == '__main__':
    main()
