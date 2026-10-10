#!/usr/bin/env python3
# PULUN VALMIIDEN VASTAUSTEN KULTAISET ÄMPÄRISTÄ (Pelikoodari 10.10.2026, PT erä 3): uusi maa PuluValmiitMaatTestit-testiin yhdellä
# komennolla. Hakee ämpärin hakemiston pulu/vastaukset/v1/maat.json, maiden paketit (?v=<versio>) ja ajantasaisen sisältöpaketin
# (sisalto/1/uusin.json → karttavalot + täkynostot), vertaa Kultaiset/pulu-<iso>.json-tiedostoihin tavu tavulta ja tulostaa:
#   - maittain SAMA / ERO / UUSI, koko ja versio = luotu -tarkistus
#   - testirivit [Testi] … Maa("ISO", kohtia, kysymysvastauksia, lisaa) ja testin kohteet-tiedoston nimen
#   - löydökset, jotka testi kaataisi: puuttuvat kohteet, väärän maan kortit, valmiittomat linkit, saavuttamattomat Kerro lisää
#     -vastaukset (PurettujenJaanteet-ehdokkaat) ja rikkinäiset jatkot (lataaja purkaa [[ ]], muut viat jäävät)
# Käyttö: python3 -I pulu-kultaiset.py [--kirjoita]   (--kirjoita päivittää Kultaiset/-tiedostot; ilman sitä vain raportti)
# Ei avaimia: julkinen ämpäri media.matkakirja.app.
import hashlib, json, os, re, sys, time, urllib.request

AMPARI = 'https://media.matkakirja.app/'
KULTAISET = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'Kultaiset')
KUVIO = re.compile(r'\[\[([^\[\]\n]{1,60})\]\]')   # = PuluChat.KasiteKuvio
KATTO = 12                                          # = PuluChat.KasitteidenKatto


def hae(polku):
    # Oma User-Agent: CDN torjuu Pythonin oletustunnisteen (403).
    pyynto = urllib.request.Request(AMPARI + polku, headers={'User-Agent': 'matkakirja-pulu-kultaiset/1'})
    with urllib.request.urlopen(pyynto, timeout=60) as r:
        return r.read()


def avain(s):
    return re.sub(r'\s+', ' ', (s or '').strip()).lower()


def linkit(teksti):
    out = []
    for m in KUVIO.finditer(teksti):
        k = m.group(1).strip()
        if not k:
            continue
        a = k.split('|')[0].strip() or k.split('|')[-1].strip()
        out.append(a.replace('"', ''))
    return out[:KATTO]


def pura(j):   # = PuluValmiit.PuraLinkit (NUI 569ffce3d): [[aihe|muoto]] → muoto, [[aihe]] → aihe
    return re.sub(r'\[\[([^\[\]|]*\|)?([^\[\]]*)\]\]', lambda m: m.group(2).split('|')[-1], j)


def tarkista(maa, d, kohteet):
    viat, orvot = [], []
    for kid, ko in d['kohdat'].items():
        if kid not in kohteet:
            viat.append(f'kohde puuttuu sisällöstä: {kid}')
        elif kohteet[kid] != maa:
            viat.append(f'{kid}: kortin maa {kohteet[kid]}')
        kys = ko.get('kysymykset', [])
        lisaa = {avain(v.get('kasite') or a) for a, v in ko.get('lisaa', {}).items()}
        if len(kys) != 5:
            viat.append(f'{kid}: kysymyksiä {len(kys)}')
        for q in kys + list(ko.get('lisaa', {}).values()):
            t = q.get('vastaus') or ''
            if t.count('[[') != t.count(']]') or t.count('[[') != len(KUVIO.findall(t)):
                viat.append(f'{kid}: [[ ]] rikki: {t[:60]}')
            for j in q.get('jatkot', []):
                j2 = pura(j.strip())
                if not (8 <= len(j2) <= 70 and j2.endswith('?')):
                    viat.append(f'{kid}: jatko rikki: {j}')
        for q in kys:
            for a in linkit(q.get('vastaus') or ''):
                if avain(a) not in lisaa:
                    viat.append(f'{kid}: linkillä ei valmista vastausta: {a}')
        linkatut = {avain(a) for q in kys for a in linkit(q.get('vastaus') or '')}
        orvot += [f'"{kid} / {l}",' for l in sorted(lisaa - linkatut)]
    return viat, orvot


def main():
    kirjoita = '--kirjoita' in sys.argv
    t = int(time.time())
    osoitin = json.loads(hae(f'sisalto/1/uusin.json?t={t}'))
    versio = osoitin['versio']
    kohteet = {}
    for a in json.loads(hae(f'sisalto/1/v{versio}/kokoelmat/karttavalot.json'))['alkiot']:
        kohteet[a['id']] = a.get('maa')
    for a in json.loads(hae(f'sisalto/1/v{versio}/kokoelmat/takynostot.json'))['alkiot']:
        kohteet['nosto:' + a['id']] = a.get('maa')
    hakemisto_raaka = hae(f'pulu/vastaukset/v1/maat.json?t={t}')
    hakemisto = json.loads(hakemisto_raaka)['maat']
    print(f'sisältö v{versio}, hakemistossa {len(hakemisto)} maata: {", ".join(sorted(hakemisto))}')
    testirivit, kaikki_orvot = [], []
    for maa, v in sorted(hakemisto.items()):
        raaka = hae(f'pulu/vastaukset/v1/{maa}.json?v={v}')
        d = json.loads(raaka)
        polku = os.path.join(KULTAISET, f'pulu-{maa.lower()}.json')
        vanha = open(polku, 'rb').read() if os.path.exists(polku) else None
        tila = 'UUSI' if vanha is None else 'SAMA' if vanha == raaka else 'ERO'
        luotu = re.sub(r'[^0-9]', '', d.get('luotu', '')[:16])
        kys = sum(len(k.get('kysymykset', [])) for k in d['kohdat'].values())
        lis = sum(len(k.get('lisaa', {})) for k in d['kohdat'].values())
        viat, orvot = tarkista(maa, d, kohteet)
        print(f'{maa} {tila} {len(raaka) // 1024} kt sha {hashlib.sha256(raaka).hexdigest()[:12]} versio {v}'
              f'{"" if luotu == v else " ≠ luotu " + luotu}, kohtia {len(d["kohdat"])}, {kys} + {lis}, vikoja {len(viat)}, jäänteitä {len(orvot)}')
        for x in viat[:20]:
            print('    VIKA', x)
        kaikki_orvot += orvot
        testirivit.append(f'        [Testi] static void {maa}Paketti() => Maa("{maa}", {len(d["kohdat"])}, {kys}, {lis});')
        if kirjoita and tila != 'SAMA':
            open(polku, 'wb').write(raaka)
    print('\nTestirivit (PuluValmiitMaatTestit; nimeä suomeksi kuten muut):')
    print('\n'.join(testirivit))
    print(f'        HakemistoKaikkiMaat: "{",".join(sorted(hakemisto))}"')
    if kaikki_orvot:
        print('\nSaavuttamattomat Kerro lisää -vastaukset (PurettujenJaanteet, jos puretun linkin jäänne):')
        print('\n'.join('            ' + o for o in kaikki_orvot))
    if kirjoita:
        open(os.path.join(KULTAISET, 'pulu-maat.json'), 'wb').write(hakemisto_raaka)
        maat = set(hakemisto)
        nimi = 'pulu-kohdat.tsv'   # versio otsikkorivillä (testi lukee aina saman nimen)
        with open(os.path.join(KULTAISET, nimi), 'w') as f:
            f.write(f'# Karttavalot (kohde:<id>) ja täkynostot (nosto:<id>) maittain sisältöpaketista v{versio} '
                    f'({", ".join(sorted(maat))}), Pulun valmiiden vastausten testiin (pulu-kultaiset.py)\n')
            for i, m in sorted((i, m) for i, m in kohteet.items() if m in maat):
                f.write(f'{i}\t{m}\n')
        print(f'\nKirjoitettu Kultaiset/: muuttuneet paketit, pulu-maat.json, {nimi} (sisältö v{versio})')


if __name__ == '__main__':
    main()
