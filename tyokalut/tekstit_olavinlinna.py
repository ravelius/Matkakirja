#!/usr/bin/env python3
# OLAVINLINNAN TEKSTITAULU (PT 9.10.2026, käännettävyys englanniksi): kokoaa pelin näkyvät ja puhutut tekstit fi-avaimin tauluun
# Assets/Matkakirja/Linssit/Resources/Tekstit/olavinlinna.fi.json (Peli/Tekstit.cs). Lähteet:
#   - koodin tekstit (verbit, löytökortit, historian avainsanat): KOODI alla (koodi lukee ne Tekstit.T-avaimilla),
#   - kertoja + avainsanat: kiinnitetyn paketin rakennus.json (PelattavaPala.Hash),
#   - repliikit: seikkailu/olavinlinna/repliikit-v4/manifest.json (teksti),
#   - tietokortit: seikkailu/olavinlinna/tietokerros-v1/tietokerros.json (otsikko, lyhyt, teksti).
# Datan tekstit luetaan pelissä Tekstit.TaiData(avain, data): taulu voittaa, data on varalla. Aja uudelleen, kun data muuttuu:
#   python3 tyokalut/tekstit_olavinlinna.py
import json, os, re, sys, urllib.request

JUURI = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ULOS = os.path.join(JUURI, 'Assets/Matkakirja/Linssit/Resources/Tekstit/olavinlinna.fi.json')
MEDIA = 'https://media.matkakirja.app'

KOODI = {
    # Toimintonapin verbit (SeikkailuEsineet, -Komero, -Kynttilat, -Pako; Natiivi-UI näyttää ja lukee VoiceOverilla sellaisenaan).
    'olavinlinna.verbi.avaa': 'Avaa', 'olavinlinna.verbi.sulje': 'Sulje', 'olavinlinna.verbi.kiinnita': 'Kiinnitä',
    'olavinlinna.verbi.anna': 'Anna', 'olavinlinna.verbi.heita': 'Heitä', 'olavinlinna.verbi.aseta': 'Aseta',
    'olavinlinna.verbi.laske': 'Laske', 'olavinlinna.verbi.irrota': 'Irrota', 'olavinlinna.verbi.kaada': 'Kaada',
    'olavinlinna.verbi.pue': 'Pue', 'olavinlinna.verbi.poimi': 'Poimi', 'olavinlinna.verbi.koputa': 'Koputa',
    'olavinlinna.verbi.kiipea': 'Kiipeä', 'olavinlinna.verbi.raavi': 'Raavi', 'olavinlinna.verbi.kaanna': 'Käännä',
    'olavinlinna.verbi.sytyta': 'Sytytä', 'olavinlinna.verbi.ota': 'Ota', 'olavinlinna.verbi.puhalla': 'Puhalla',
    'olavinlinna.verbi.sammuta': 'Sammuta', 'olavinlinna.verbi.katkaise': 'Katkaise',
    # Löytökortit (Natiivi-UI:n Paljastus-pohja).
    'olavinlinna.loyto.kappeli.otsikko': 'Kappelin kätkö',
    'olavinlinna.loyto.kappeli.teksti': 'Liinaan kääritty hopeinen kalkki ja pateeni sekä liuskekivi, johon on kaiverrettu kaksi toisiaan kohti kallistuvaa kilpeä, kaari ja pieni kello.',
    'olavinlinna.loyto.arkku.otsikko': 'Kellotornin arkku',
    'olavinlinna.loyto.arkku.teksti': 'Arkun pohjalla kuunvalossa hopea välkkyy.',
    # Linnan historia (Historiajana; Sisältökirjurin faktatarkistus 9.10., #4249).
    'olavinlinna.historia.jaakausi.vuosi': 'jääkauden jälkeen', 'olavinlinna.historia.jaakausi.sanat': 'Saimaa nousee esiin, vesi virtaa Kyrönsalmen läpi',
    'olavinlinna.historia.kivikausi.vuosi': 'kivikausi', 'olavinlinna.historia.kivikausi.sanat': 'Asukkaita Saimaan rannoilla',
    'olavinlinna.historia.1475.vuosi': '1475', 'olavinlinna.historia.1475.sanat': 'Erik Akselinpoika Tott aloittaa linnan, ensin puuvarustus',
    'olavinlinna.historia.1477.vuosi': '1477–1480-luku', 'olavinlinna.historia.1477.sanat': 'Kivilinna: kolme tornia ja muurit',
    'olavinlinna.historia.1499.vuosi': '1499', 'olavinlinna.historia.1499.sanat': 'Erik Turesson Bielke linnan haltijaksi',
    'olavinlinna.historia.1500.vuosi': '1500–1600-luvut', 'olavinlinna.historia.1500.sanat': 'Tornien korotus, uusi esilinna',   # Kijlin tornin vuosi epävarma (#4259)
    'olavinlinna.historia.1743.vuosi': '1743', 'olavinlinna.historia.1743.sanat': 'Turun rauha: linna Venäjälle, bastionit 1750-luvulla',
    'olavinlinna.historia.1847.vuosi': '1847–1869', 'olavinlinna.historia.1847.sanat': 'Varuskunta lähtee, palot 1868 ja 1869',
    'olavinlinna.historia.1872.vuosi': '1872–1878', 'olavinlinna.historia.1872.sanat': 'Ensimmäinen restaurointi (Kiseleff)',
    'olavinlinna.historia.1961.vuosi': '1961–1975', 'olavinlinna.historia.1961.sanat': 'Suuri restaurointi, oopperajuhlat vuodesta 1967',
    # Historian kertoja (9 riviä; Sisältökirjuri #4249, rivi 6 #4259). Ääni vasta omistajan luvalla.
    'olavinlinna.historia.jaakausi.kertoja': 'Kun jää suli, Saimaa nousi esiin, ja sen vedet kulkevat yhä ahtaan Kyrönsalmen läpi.',
    'olavinlinna.historia.kivikausi.kertoja': 'Rannoilla asui ihmisiä jo kivikaudella; he jättivät maahan saviastioiden palasia ja palanutta luuta.',
    'olavinlinna.historia.1475.kertoja': 'Vuonna 1475 Erik Akselinpoika Tott alkoi rakentaa salmen kalliolle linnaa Pyhän Olavin nimiin. Ensin nousi puuvarustus, kivi vasta 1477.',
    'olavinlinna.historia.1477.kertoja': 'Kun ulkomaiset muurarit olivat tehneet työnsä, kolme tornia ja niiden väliset muurit seisoivat valmiina 1480-luvun puolivälin tienoilla.',
    'olavinlinna.historia.1499.kertoja': 'Vuonna 1499 linnan haltijaksi tuli Erik Turesson Bielke, ja linna kesti vielä yhden hyökkäyksen.',
    'olavinlinna.historia.1500.kertoja': 'Kustaa Vaasan aikana tornit korotettiin ja esilinna vahvistui, ja 1600-luvun vaihteessa rakennettiin uusi esilinna ja Kijlin torni.',
    'olavinlinna.historia.1743.kertoja': 'Pikkuvihan jälkeen Turun rauha 1743 liitti linnan Venäjään, ja 1750-luvulla sen ympärille nousivat bastionit.',
    'olavinlinna.historia.1847.kertoja': 'Venäläinen varuskunta lähti 1847, ja linna autioitui. Palot 1868 ja 1869 tuhosivat sen puuosia ja esilinnan rakennuksia.',
    'olavinlinna.historia.1872.kertoja': 'Korjaukset alkoivat 1870-luvulla, ja suuri restaurointi 1961–1975 avasi linnan yleisölle. Vuodesta 1967 linnan pihalla on järjestetty oopperajuhlat kesäisin.',
}


def hae(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'curl/8 matkakirja-tekstit'}), timeout=30) as r:
        return json.loads(r.read().decode('utf-8'))


def tunnus(s):
    return re.sub(r'[^a-z0-9]+', '-', (s or '').lower()).strip('-')


def obj(x):
    return x if isinstance(x, dict) else None


def esittely(r, t):
    """Linnan esittelyn tekstit (sama avainkaava ja suodatus kuin DioraamaData.Tekstikohteet + rakennuksen jäsennys)."""
    a0 = tunnus(r.get('id'))

    def A(*osat):
        return '.'.join([a0] + [str(o) if isinstance(o, int) else tunnus(o) for o in osat])

    def L(avain, teksti):
        if teksti: t[avain] = teksti

    def taulu(o, *etu):
        if not obj(o): return
        L(A(*etu, 'otsikko'), o.get('otsikko'))
        kohdat = [k for k in (o.get('kohdat') or []) if obj(k)]
        for i, k in enumerate(kohdat): L(A(*etu, 'kohta', i), k.get('teksti'))

    L(A('rakennus', 'nimi'), r.get('nimi')); L(A('rakennus', 'otsikko'), r.get('otsikko'))
    taulu(r.get('taulu'), 'taulu')
    L(A('pulu'), (obj(r.get('pulu')) or {}).get('teksti'))
    for e in [e for e in (r.get('etsinnat') or []) if obj(e) and e.get('id') is not None]:
        L(A('etsinta', e['id'], 'nimi'), e.get('nimi')); L(A('etsinta', e['id'], 'kuvaus'), e.get('kuvaus'))
        kortti = [k for k in ((obj(e.get('kortti')) or {}).get('kohdat') or []) if obj(k)]
        for i, k in enumerate(kortti): L(A('etsinta', e['id'], 'kortti', i), k.get('teksti'))
    for j in [j for j in ((r.get('kertoja') or {}).get('jaksot') or []) if obj(j)]:
        nimet = [n for n in (j.get('nimet') or []) if obj(n) and n.get('paikka') is not None and n.get('teksti')]
        for i, n in enumerate(nimet): L(A('kertoja', j.get('id'), 'nimi', i), n['teksti'])
    for ti in [x for x in (r.get('tilat') or []) if obj(x)]:
        tid = ti.get('id')
        L(A('tila', tid, 'nimi'), ti.get('nimi'))
        taulu(ti.get('taulu'), 'tila', tid, 'taulu')
        L(A('tila', tid, 'pulu'), (obj(ti.get('pulu')) or {}).get('teksti'))
        it = obj(ti.get('infotaulu'))
        if it:
            L(A('tila', tid, 'infotaulu', 'nimi'), it.get('nimi'))
            for i, ri in enumerate([x for x in (it.get('rivit') or []) if obj(x)]): L(A('tila', tid, 'infotaulu', 'rivi', i), ri.get('teksti'))
        for k in [k for k in (ti.get('kuunnelma') or []) if obj(k) and k.get('teksti')]:
            L(A('tila', tid, 'kuunnelma', k.get('id'), 'nimi'), k.get('nimi')); L(A('tila', tid, 'kuunnelma', k.get('id'), 'teksti'), k['teksti'])
            for i, v in enumerate([v for v in (k.get('vuorot') or []) if obj(v)]): L(A('tila', tid, 'kuunnelma', k.get('id'), 'vuoro', i), v.get('teksti'))
        for h in [h for h in (ti.get('hahmot') or []) if obj(h)]:
            for i, rp in enumerate([x for x in (h.get('repliikit') or []) if obj(x)]): L(A('tila', tid, 'hahmo', h.get('id'), 'repliikki', i), rp.get('teksti'))
            if obj(h.get('reaktio')): L(A('tila', tid, 'hahmo', h.get('id'), 'reaktio'), h['reaktio'].get('teksti'))
        for i, v in enumerate([v for v in (ti.get('etsinta') or []) if obj(v)]):
            L(A('tila', tid, 'etsinta', i, 'teksti'), v.get('teksti') or (obj(v.get('repliikki')) or {}).get('teksti'))
            L(A('tila', tid, 'etsinta', i, 'pulu'), v.get('pulu')); L(A('tila', tid, 'etsinta', i, 'rivi'), v.get('rivi'))


def main():
    t = dict(KOODI)
    hash_ = re.search(r'Hash = "([0-9a-f]+)"', open(os.path.join(JUURI, 'Assets/Matkakirja/Linssit/Ydin/Seikkailu/PelattavaPala.cs'), encoding='utf-8').read()).group(1)
    r = hae(f'{MEDIA}/dioraama/olavinlinna/{hash_}/rakennus.json')
    for j in (r.get('kertoja') or {}).get('jaksot', []):
        k = f"olavinlinna.kertoja.{tunnus(j.get('id'))}"
        if j.get('teksti'): t[k + '.teksti'] = j['teksti']
        for i, a in enumerate(j.get('avainsanat') or []):
            if a.get('vuosi'): t[f'{k}.avainsana.{i}.vuosi'] = a['vuosi']
            if a.get('sanat'): t[f'{k}.avainsana.{i}.sanat'] = a['sanat']
    esittely(r, t)
    if len(sys.argv) > 1:   # kopio testejä varten (Linssit-testit/kultaiset/olavinlinna-<versio>-rakennus.json)
        with open(sys.argv[1], 'w', encoding='utf-8') as f: json.dump(r, f, ensure_ascii=False)
    m = hae(f'{MEDIA}/seikkailu/olavinlinna/repliikit-v4/manifest.json')
    for x in (m if isinstance(m, list) else m.get('repliikit') or m.get('aanet') or []):
        if x.get('tunnus') and x.get('teksti'): t[f"olavinlinna.repliikki.{tunnus(x['tunnus'])}"] = x['teksti']
    tk = hae(f'{MEDIA}/seikkailu/olavinlinna/tietokerros-v1/tietokerros.json')
    for x in tk.get('kortit', []):
        k = f"olavinlinna.tietokortti.{tunnus(x.get('id'))}"
        for kentta in ('otsikko', 'lyhyt', 'teksti'):
            if x.get(kentta): t[f'{k}.{kentta}'] = x[kentta]
    os.makedirs(os.path.dirname(ULOS), exist_ok=True)
    with open(ULOS, 'w', encoding='utf-8') as f:
        json.dump(dict(sorted(t.items())), f, ensure_ascii=False, indent=1)
        f.write('\n')
    print(f'{ULOS}: {len(t)} avainta (koodi {len(KOODI)}, paketti {hash_})')


if __name__ == '__main__':
    sys.exit(main())
