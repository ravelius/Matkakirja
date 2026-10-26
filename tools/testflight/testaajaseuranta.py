#!/usr/bin/env python3
"""TestFlight-testaajien seuranta, VAIN LUKU (omistaja 11.10.2026 09.5x: "haluan vain nähdä milloin raatilaiset lataavat
pelin itselleen"). Kirjoittaa JSONin (--ulos) ryhmittäin: liittyneet, tilat (INSTALLED/ACCEPTED/…), julkisen linkin
käyttö (näytöt, hyväksynnät, viimeisin liittymispäivä), asentaneet testaajat (tila INSTALLED), buildeittain
asennukset/istunnot/kaatumiset (koko buildin luvut, kaikki ryhmät yhteensä) sekä testaajarivit (nimi tai nimetön, kutsutapa, tila, istunnot, kaatumiset). Sähköposteja ei tallenneta.
Applen mittarit ovat päiväkohtaisia (dataPoints start/end), joten "viimeisin" on päivä, ei kellonaika.
EI muuta mitään App Store Connectissa. Ympäristö: ASC_KEY_ID, ASC_ISSUER_ID, ASC_AVAIN_POLKU."""
import argparse
import collections
import datetime
import json
import os
import sys
import time
import urllib.error
import urllib.request

import jwt


def main():
    p = argparse.ArgumentParser()
    p.add_argument('--bundle-id', required=True)
    p.add_argument('--ulos', required=True)
    a = p.parse_args()
    kid, iss = os.environ['ASC_KEY_ID'], os.environ['ASC_ISSUER_ID']
    avain = open(os.environ['ASC_AVAIN_POLKU']).read()
    varoitukset = []

    def hae(polku):
        nyt = int(time.time())
        tunnus = jwt.encode({'iss': iss, 'iat': nyt, 'exp': nyt + 600, 'aud': 'appstoreconnect-v1'},
                            avain, algorithm='ES256', headers={'kid': kid, 'typ': 'JWT'})
        req = urllib.request.Request(polku if polku.startswith('http') else 'https://api.appstoreconnect.apple.com' + polku,
                                     method='GET', headers={'Authorization': 'Bearer ' + tunnus, 'Accept': 'application/json'})
        try:
            with urllib.request.urlopen(req, timeout=60) as v:
                return v.status, json.loads(v.read() or b'{}')
        except urllib.error.HTTPError as e:
            try:
                return e.code, json.loads(e.read() or b'{}')
            except ValueError:
                return e.code, {}

    def kaikki(polku):
        rivit, seur = [], polku
        while seur:
            tila, d = hae(seur)
            if tila != 200:
                varoitukset.append(f'{polku}: {tila}')
                break
            rivit += d.get('data', [])
            seur = d.get('links', {}).get('next')
        return rivit

    def mittari(polku):
        """Summat + viimeisin päivä, jolla kukin arvo > 0; per-dimensio (testaaja) erikseen."""
        tila, d = hae(polku)
        if tila != 200:
            varoitukset.append(f'{polku}: {tila}')
            return None
        summat, viimeisin, per = collections.Counter(), {}, {}
        for sarja in d.get('data', []):
            dim = ((sarja.get('dimensions') or {}).get('betaTesters') or {}).get('data', {}) or {}
            for piste in sarja.get('dataPoints', []):
                for k, v in (piste.get('values') or {}).items():
                    if isinstance(v, (int, float)):
                        summat[k] += v
                        if v > 0:
                            paiva = (piste.get('end') or piste.get('start') or '')[:10]
                            viimeisin[k] = max(viimeisin.get(k, ''), paiva)
                        if dim.get('id'):
                            per.setdefault(dim['id'], collections.Counter())[k] += v
        return {'summat': dict(summat), 'viimeisin_paiva': viimeisin, 'per_testaaja': {i: dict(c) for i, c in per.items()}}

    tila, d = hae(f'/v1/apps?filter[bundleId]={a.bundle_id}')
    if tila != 200 or not d.get('data'):
        print(f'::error::Appia ei löydy: {a.bundle_id} {tila}')
        sys.exit(1)
    app_id = d['data'][0]['id']

    ryhmat = []
    for g in kaikki(f'/v1/apps/{app_id}/betaGroups?limit=50'):
        at = g['attributes']
        testaajat = kaikki(f"/v1/betaGroups/{g['id']}/betaTesters?limit=200"
                           "&fields[betaTesters]=firstName,lastName,inviteType,state")
        kaytto = mittari(f"/v1/betaGroups/{g['id']}/metrics/betaTesterUsages?groupBy=betaTesters&period=P365D")
        per = (kaytto or {}).get('per_testaaja', {})
        rivit = []
        for t in testaajat:
            ta = t['attributes']
            nimi = ' '.join(x for x in (ta.get('firstName'), ta.get('lastName')) if x and x.strip()).strip()
            m = per.get(t['id'], {})
            rivit.append({'nimi': nimi or None, 'nimeton': not nimi, 'kutsutapa': ta.get('inviteType'),
                          'tila': ta.get('state'), 'istunnot': m.get('sessionCount'), 'kaatumiset': m.get('crashCount'),
                          'palautteet': m.get('feedbackCount')})
        buildit = []
        for b in kaikki(f"/v1/betaGroups/{g['id']}/builds?limit=200&fields[builds]=version,uploadedDate,expired"):
            ba = b['attributes']
            if ba.get('expired'):
                continue
            bm = mittari(f"/v1/builds/{b['id']}/metrics/betaBuildUsages")
            buildit.append({'versio': ba.get('version'), 'ladattu': ba.get('uploadedDate'),
                            'asennukset': (bm or {}).get('summat', {}).get('installCount'),
                            'istunnot': (bm or {}).get('summat', {}).get('sessionCount'),
                            'kaatumiset': (bm or {}).get('summat', {}).get('crashCount'),
                            'viimeisin_asennuspaiva': (bm or {}).get('viimeisin_paiva', {}).get('installCount')})
        buildit.sort(key=lambda x: x['ladattu'] or '', reverse=True)
        linkki = mittari(f"/v1/betaGroups/{g['id']}/metrics/publicLinkUsages") if at.get('publicLinkEnabled') else None
        ryhmat.append({
            'nimi': at.get('name'), 'ulkoinen': not at.get('isInternalGroup'),
            'julkinen_linkki': at.get('publicLink'), 'linkki_paalla': bool(at.get('publicLinkEnabled')),
            'raja': at.get('publicLinkLimit') if at.get('publicLinkLimitEnabled') else None,
            'liittyneita': len(testaajat),
            'tilat': dict(collections.Counter(r['tila'] or '?' for r in rivit)),
            'kutsutavat': dict(collections.Counter(r['kutsutapa'] or '?' for r in rivit)),
            'nimettomia': sum(r['nimeton'] for r in rivit),
            'linkin_kaytto': linkki and {'summat': linkki['summat'], 'viimeisin_paiva': linkki['viimeisin_paiva']},
            # Ryhmän asentaneet testaajien tilasta; buildien mittarit (betaBuildUsages) ovat koko buildin, kaikkien ryhmien.
            'asentaneita': sum(r['tila'] == 'INSTALLED' for r in rivit),
            'buildien_asennukset_kaikki_ryhmat': sum(x['asennukset'] or 0 for x in buildit),
            'viimeisin_asennuspaiva_kaikki_ryhmat': max((x['viimeisin_asennuspaiva'] or '' for x in buildit), default='') or None,
            'buildit': buildit[:10],
            'testaajat': rivit,
        })

    tulos = {'paivitetty': datetime.datetime.now(datetime.timezone.utc).isoformat(timespec='seconds'),
             'bundle_id': a.bundle_id, 'ryhmat': ryhmat, 'varoitukset': varoitukset}
    valiaik = a.ulos + '.tmp'
    with open(valiaik, 'w') as f:
        json.dump(tulos, f, ensure_ascii=False, indent=1)
    os.replace(valiaik, a.ulos)
    for r in ryhmat:
        print(f"{r['nimi']}: liittyneitä {r['liittyneita']} {r['tilat']}, nimettömiä {r['nimettomia']}, "
              f"asentaneita {r['asentaneita']}, linkki {r['julkinen_linkki']}")
    for v in varoitukset:
        print(f'::warning::{v}')


if __name__ == '__main__':
    main()
