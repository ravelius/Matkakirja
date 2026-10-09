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
    'olavinlinna.historia.1500.vuosi': '1500–1600-luvut', 'olavinlinna.historia.1500.sanat': 'Tornit korotetaan, uusi esilinna ja Kijlin torni',
    'olavinlinna.historia.1743.vuosi': '1743', 'olavinlinna.historia.1743.sanat': 'Turun rauha: linna Venäjälle, bastionit 1750-luvulla',
    'olavinlinna.historia.1847.vuosi': '1847–1869', 'olavinlinna.historia.1847.sanat': 'Varuskunta lähtee, palot 1868 ja 1869',
    'olavinlinna.historia.1872.vuosi': '1872–1975', 'olavinlinna.historia.1872.sanat': 'Restauroinnit, oopperajuhlat vuodesta 1967',
}


def hae(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'curl/8 matkakirja-tekstit'}), timeout=30) as r:
        return json.loads(r.read().decode('utf-8'))


def tunnus(s):
    return re.sub(r'[^a-z0-9]+', '-', (s or '').lower()).strip('-')


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
