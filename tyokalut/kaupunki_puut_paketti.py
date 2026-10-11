# KAUPUNKIEN PUUT → ÄMPÄRIPAKETTI (Linssiseppä 10.10.2026, juna 181). Karttasepän puut-20261010/peli/puut-<id>.bytes + .json (meta)
# → <ulos>/kaupunkipuut-v1-vienti-<pvm>/kartta/puut/v1/, jonka KaupunkiPuut lataa osoitteesta PuuRuudukko.Juuri
# (https://media.matkakirja.app/kartta/puut/v1/puut-<id>.bytes). Tarkistaa otsakkeen (PUU1, ruututaulun loppu = puita, koko) ja metan
# sha256:n ja tavumäärän, kirjoittaa LAHTEET.md:n (ei SHA256SUMS:iin) ja SHA256SUMS:n (vie-paketti.sh). Peli tarkistaa koon
# PuuRuudukko.Kaupungit-taulusta: uusi data → uusi kansio (v2) ja taulun päivitys, ei ylikirjoitusta.
# Käyttö: python3 -I kaupunki_puut_paketti.py <Karttasepän puut-kansio> <_valmiit> [id …]   (oletus pariisi tukholma)
import datetime, hashlib, json, os, shutil, struct, sys


def tarkista(b, meta):
    if b[:4] != b'PUU1': raise SystemExit('ei PUU1-otsaketta')
    nx, ny, rm, n = struct.unpack('<HHfI', b[4:16])
    loppu = struct.unpack('<I', b[16 + nx * ny * 4:20 + nx * ny * 4])[0]
    koko = 16 + (nx * ny + 1) * 4 + n * 8
    if loppu != n or koko != len(b): raise SystemExit(f'ruututaulun loppu {loppu} / puita {n} / koko {len(b)} ≠ {koko}')
    if n != meta['puita'] or len(b) != meta['tavuja'] or hashlib.sha256(b).hexdigest() != meta['sha256']:
        raise SystemExit('meta (puita, tavuja, sha256) ei täsmää')
    return nx, ny, rm, n


def main():
    if len(sys.argv) < 3: sys.exit('käyttö: kaupunki_puut_paketti.py <puut-kansio> <_valmiit> [id …]')
    lahde, valmiit = sys.argv[1], sys.argv[2]
    idt = sys.argv[3:] or ['pariisi', 'tukholma']
    paketti = os.path.join(valmiit, f'kaupunkipuut-v1-vienti-{datetime.date.today():%Y%m%d}')
    ulos = os.path.join(paketti, 'kartta', 'puut', 'v1')
    os.makedirs(ulos, exist_ok=True)
    rivit, kuvaus = [], []
    for i in idt:
        meta = json.load(open(os.path.join(lahde, 'peli', f'puut-{i}.json'), encoding='utf-8'))
        b = open(os.path.join(lahde, 'peli', f'puut-{i}.bytes'), 'rb').read()
        nx, ny, rm, n = tarkista(b, meta)
        for paate in ('bytes', 'json'):
            shutil.copyfile(os.path.join(lahde, 'peli', f'puut-{i}.{paate}'), os.path.join(ulos, f'puut-{i}.{paate}'))
        kuvaus.append(f'- puut-{i}.bytes ({len(b)} t, {n} puuta, {nx}×{ny} ruutua à {rm:.0f} m; origo {meta["origo"]["lat"]}, {meta["origo"]["lon"]}; '
                      f'OSM {meta["osm"]}, latvusmalli {meta["chm"]}) ja puut-{i}.json (meta: muoto, suvut, krediitti)')
        print(f'{i}: {n} puuta, {len(b) / 1e6:.1f} Mt, sha256 ok', flush=True)
    for nimi in sorted(os.listdir(ulos)):
        p = os.path.join(ulos, nimi)
        rivit.append(f'{hashlib.sha256(open(p, "rb").read()).hexdigest()}  kartta/puut/v1/{nimi}')
    open(os.path.join(paketti, 'SHA256SUMS'), 'w').write('\n'.join(rivit) + '\n')
    with open(os.path.join(paketti, 'LAHTEET.md'), 'w', encoding='utf-8') as f:
        f.write('# Kaupunkien puut v1: vientipaketin lähteet ja lisenssit\n\n'
                'Paketin kokosi Linssiseppä 10.10.2026 (tyokalut/kaupunki_puut_paketti.py) Karttasepän aineistosta '
                '_tyo/karttaseppa/puut-20261010 (LUEMINUT.md). Kansiorakenne vastaa ämpärin polkuja (kartta/puut/v1/). '
                'Peli: KaupunkiPuut (kaupunkinäkymän korttipuut Pariisissa ja Tukholmassa).\n\n'
                '## Tiedostot\n\n' + '\n'.join(kuvaus) + '\n\n'
                '## Lähteet ja lisenssit\n\n'
                '- **OpenStreetMap** (Geofabrik .osm.pbf): natural=tree ja natural=tree_row. © OpenStreetMap contributors, '
                'lisenssi ODbL 1.0 (johdettu tietokanta, sama lisenssi).\n'
                '- **Meta and World Resources Institute (WRI), High Resolution Canopy Height Maps v1** (1 m, AWS Open Data '
                'dataforgood-fb-data/forests/v1): latvushuiput niissä kohdissa, joissa OSM-puuta ei ole; lisenssi CC BY 4.0 '
                '(Tolan ym. 2024, Remote Sensing of Environment).\n'
                '- Käsittely (oma tuotanto, Karttaseppä): huippujen haku, karsinta ja pakkaus 250 m:n ruutuihin (T7 latvus-chm/chm-puut.py, '
                'pakkaa-puut.py). Googlen aineistoa ei ole käytetty. Pariisin avoimen datan puurekisteriä ei käytetty (robots.txt).\n\n'
                'Krediitti pelissä (oppaan Lähteet-näkymä, PuuRuudukko.Krediitti): "Puut: © OpenStreetMap contributors (ODbL); '
                'Meta and World Resources Institute (WRI), High Resolution Canopy Height Maps, CC BY 4.0".\n\n'
                '## Äänet ja mallit\n\nPaketissa ei ole ääniä, kuvia eikä 3D-malleja.\n')
    print(f'→ {paketti} ({len(rivit)} tiedostoa)')


if __name__ == '__main__':
    main()
