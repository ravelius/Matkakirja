#!/usr/bin/env python3
# Linnakirjasto, erä 2 (Linnanrakentaja 4.10.2026; omistajan tilaus 30.9., speksi docs/raportit/linnakirjasto-20260930.md):
# Olavinlinnan valmiit, jo hyväksytyt assetit kirjastoon tunnuksin. Ei uusia malleja (Päätoimittaja 4.10.).
#   hahmo/<henkilo>   skinnatut linnahahmot (Quaternius CC0, omistaja hyväksyi 2.10.) + leikkeet ja kävelysykli (json)
#   taivas/<id>       Poly Havenin CC0-HDRI:t, joilla kuori, maasto ja tilat on leivottu
#   esiasetus/<id>    valo- ja tunnelma-arvot, joilla Olavinlinna leivottiin (päivä ja hämärä) -> seuraava linna samoin
# Kopioi tiedostot proto-3d/_kirjasto/valmiit/<laji>/<id>/ ja lisää rivit js/dioraama/kirjasto/lahteet.json:iin
# (sha256 + tavuja). Materiaali- ja tarrarivit (kirjasto_valmista.py) säilyvät ennallaan. Ajo on idempotentti.
#   python3 tools/dioraama/kirjasto_lisaa.py
import hashlib, json, os, shutil

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
V = '/Users/Shared/Claude/proto-3d/_kirjasto/valmiit'
HAHMOT_GLB = '/Users/Shared/Claude/proto-3d/_valmiit/olavinlinna-blender-v26/hahmot'   # julkaistu (blender 916731d7 → c3654322)
HAHMOT_JSON = '/Users/Shared/Claude/proto-3d/_valmiit/linna-hahmot/v1'
TAIVAAT = '/Users/Shared/Claude/proto-3d/_lahteet/polyhaven/taivaat'
MANIFESTI = os.path.join(REPO, 'js/dioraama/kirjasto/lahteet.json')

QUATERNIUS = {
    'lahde': 'https://quaternius.itch.io/modular-character-outfits-fantasy', 'tekijat': ['Quaternius'],
    'lisenssi': 'CC0 1.0 (https://creativecommons.org/publicdomain/zero/1.0/)', 'palvelu': 'Quaternius',
    'osat': ['Modular Character Outfits – Fantasy [Standard] (asut)', 'Universal Base Characters [Standard] (pää, hiukset, parta)',
             'Universal Animation Library [Standard] (leikkeet idle, kavely, puhe, tyo)'],
    'muokkaukset': ['vaatteiden sävytys henkilön värillä (js/dioraama/pankit/henkilot.js, savyta.py)',
                    'perusväri 1,35·p^0,8 (hämärävalo), hiusten väri kuvaan', 'kampaus noin vuodelta 1500',
                    'Decimate ~9 000 kolmiota, normaali/ORM pois', 'kasvot +Z, kävely paikallaan (kavely_sykli_m)'],
    'tyokalut': ['tools/dioraama/blender/hahmo_skin.py', 'proto-3d/_valmiit/linna-hahmot/v1/{savyta.py,era1.sh}'],
}
TAIVAS = {
    'hamara': ('qwantani_dusk_2_puresky', 'Qwantani Dusk 2 (Pure Sky)', 'hämärän taivas: kuoren, maaston ja tilojen hämäräleivonta'),
    'pilvinen': ('kloofendal_48d_partly_cloudy_puresky', 'Kloofendal 48d Partly Cloudy (Pure Sky)', 'päivän taivas: kuoren ja maaston päiväleivonta'),
}
ESIASETUKSET = {
    'paiva': {
        'nimi': 'Päivä (Olavinlinna, omistajan valopäätös 29.9.: "B + tummempi valo")',
        'aurinko': {'atsimuutti': 225, 'korkeus': 36, 'vari_sisa': '#ffd29a', 'vari_ulko': '#fff2e0', 'voima': 1.5, 'kulma_aste': 1.5},
        'taivas': {'yla': '#8fa3bc', 'ala': '#3a2c20', 'voima': 0.5, 'hdri': 'taivas/pilvinen', 'leivonta_voima_ulko': 0.8},
        'sisalla': {'aurinko': 0.2, 'taivas': 0.3},
        'tilavalot': {'tulisija_w': 260, 'rekvisiitta_w': 25, 'keila_w': 60, 'varjo_tulisija_m': 0.35, 'varjo_rekvisiitta_m': 0.05},
        'lahde_koodissa': ['js/dioraama/rakennukset/olavinlinna.js valaistus', 'tools/dioraama/blender/leivo_tila.py'],
    },
    'hamara': {
        'nimi': 'Iltahämärä (tunnelma 29.9., tavoitekuva 1.10.): soihdut päävalona, ikkunoista ei päivänvaloa',
        'taivas': {'malli': 'Blender Sky MULTIPLE_SCATTERING', 'aurinko_korkeus_aste': -1.5, 'aurinko_atsimuutti': 225,
                   'ilman_tiheys': 1.2, 'aerosolit': 2.5, 'voima': 0.9, 'hdri': 'taivas/hamara'},
        'aurinko': {'voima': 0.0, 'vari': '#ff9a5c', 'korkeus': 4, 'huom': 'vanha hämärä (ilman --tavoite): voima 0,3, taivas #34466e × 0,45'},
        'savytys': {'muunnos': 'AgX', 'look': 'AgX - Medium High Contrast', 'valotus': 0.6},
        'tilavalot': {'tulisija_w': 260, 'rekvisiitta_w': 25, 'keilat': 'pois'},
        'liekit': {'tulisija_m': 0.52, 'soihtu_m': 0.6, 'kynttila_m': 0.1, 'lahde': 'js/dioraama/pankit/liekit.js koko_m'},
        'lahde_koodissa': ['tools/dioraama/blender/leivo_tila.py --hamara --tavoite', 'tools/dioraama/blender/kuori_hamara.py --tavoite'],
    },
}


def sha(p):
    h = hashlib.sha256()
    with open(p, 'rb') as f:
        for b in iter(lambda: f.read(1 << 20), b''): h.update(b)
    return h.hexdigest()


def kopioi(lahde, tunnus, nimi):
    os.makedirs(os.path.join(V, tunnus), exist_ok=True); kohde = os.path.join(V, tunnus, nimi)
    if not os.path.exists(kohde) or sha(kohde) != sha(lahde): shutil.copyfile(lahde, kohde)
    return {'polku': f'{tunnus}/{nimi}', 'sha256': sha(kohde), 'tavuja': os.path.getsize(kohde)}


def main():
    m = json.load(open(MANIFESTI)); ennen = len(m)
    for f in sorted(os.listdir(HAHMOT_GLB)):
        if not f.endswith('.glb'): continue
        id_ = f[:-4]; t = f'hahmo/{id_}'
        tied = [kopioi(os.path.join(HAHMOT_GLB, f), t, f), kopioi(os.path.join(HAHMOT_JSON, id_ + '.json'), t, id_ + '.json')]
        j = json.load(open(os.path.join(HAHMOT_JSON, id_ + '.json')))
        m[t] = dict(QUATERNIUS, nimi=f'Linnan hahmo: {j.get("nimi", id_)} (aikakerros n1500)', toisto_m=1.0,
                    kavely_sykli_m=j.get('kavely_sykli_m'), leikkeet=j.get('leikkeet'), tiedostot=tied,
                    huom='Skin 65 luuta, perusväri 512 px; skaala = henkilot.js pituus / json pituus_m (js/dioraama/hahmot-skin.json).')
    for id_, (ph, nimi, kaytto) in TAIVAS.items():
        t = f'taivas/{id_}'
        m[t] = {'nimi': nimi, 'lahde': f'https://polyhaven.com/a/{ph}', 'tekijat': ['Greg Zaal', 'Jarod Guest'],
                'lisenssi': 'CC0 1.0 (https://polyhaven.com/license)', 'palvelu': 'Poly Haven', 'muokkaukset': [], 'toisto_m': 1.0,
                'kaytto': kaytto, 'tiedostot': [kopioi(os.path.join(TAIVAAT, f'{ph}-4k.hdr'), t, f'{id_}-4k.hdr')]}
    for id_, e in ESIASETUKSET.items():
        t = f'esiasetus/{id_}'; os.makedirs(os.path.join(V, t), exist_ok=True); p = os.path.join(V, t, f'{id_}.json')
        uusi = json.dumps(e, ensure_ascii=False, indent=1) + '\n'
        if not os.path.exists(p) or open(p).read() != uusi: open(p, 'w').write(uusi)
        m[t] = {'nimi': e['nimi'], 'lahde': 'https://github.com/ravelius/Matkakirja/blob/main/docs/raportit/linnakirjasto-20260930.md',
                'tekijat': ['Matkakirja (Linnanrakentaja)'], 'lisenssi': 'CC0 1.0 (oma työ)', 'muokkaukset': [], 'toisto_m': 1.0,
                'tiedostot': [{'polku': f'{t}/{id_}.json', 'sha256': sha(p), 'tavuja': os.path.getsize(p)}]}
    m = dict(sorted(m.items()))
    open(MANIFESTI, 'w').write(json.dumps(m, ensure_ascii=False, indent=1) + '\n')
    print(f'lahteet.json: {ennen} → {len(m)} assettia;', ', '.join(sorted({k.split("/")[0] for k in m})))


if __name__ == '__main__':
    main()
