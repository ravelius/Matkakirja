#!/usr/bin/env python3
"""Ulkoinen TestFlight-ryhmä (apurahan arvioijien julkinen linkki).

Omistaja 30.9.2026: ulkoisen ryhmän pitää saada AINA uusin PASS-build
(korvaa 23.9.:n säännön "vain omistajan kortilla").

Tila (aina): ulkoiset ryhmät, julkinen linkki ja sen raja, testaajien määrä,
ryhmän uusimmat buildit sekä käyttötilastot (publicLinkUsages,
betaTesterUsages) GitHubin yhteenvetoon.

--vanhenna <b1,b2,…>: vanhentaa (expired=true) luetellut buildit ennen muuta,
jolloin niiden odottavat beta-arviot vapauttavat Applen lähetysrajan (omistaja
30.9.2026: 1.0.67–1.0.72, SUBMISSION_LIMIT_REACHED). Poistaa ne myös sisäisestä
testauksesta.

--build <CFBundleVersion>: odottaa käsittelyä (VALID), liittää buildin
ulkoiseen ryhmään ja lähettää sen Applen beta-arvioon, ellei se ole jo
arviossa tai hyväksytty.

Ympäristö: ASC_KEY_ID, ASC_ISSUER_ID, ASC_AVAIN_POLKU. Virheet ::error-rivinä.
"""
import argparse
import json
import os
import sys
import time
import urllib.error
import urllib.request

import jwt

YHTEENVETO = os.environ.get('GITHUB_STEP_SUMMARY')


def kirjaa(rivi):
    print(rivi)
    if YHTEENVETO:
        with open(YHTEENVETO, 'a') as f:
            f.write(rivi + '\n')


def virhe(otsikko, viesti):
    print(f'::error title={otsikko}::{viesti}')
    sys.exit(1)


def main():
    p = argparse.ArgumentParser()
    p.add_argument('--bundle-id', required=True)
    p.add_argument('--build', default='')
    p.add_argument('--ryhma', default='', help='ulkoisen ryhmän nimi (tyhjä = ainoa tai julkisen linkin ryhmä)')
    p.add_argument('--odota-min', type=int, default=45)
    p.add_argument('--vanhenna', default='', help='pilkuin erotetut CFBundleVersionit, jotka vanhennetaan ensin')
    a = p.parse_args()

    kid = os.environ['ASC_KEY_ID']
    iss = os.environ['ASC_ISSUER_ID']
    avain = open(os.environ['ASC_AVAIN_POLKU']).read()

    def kutsu(metodi, polku, body=None):
        nyt = int(time.time())
        tunnus = jwt.encode({'iss': iss, 'iat': nyt, 'exp': nyt + 600, 'aud': 'appstoreconnect-v1'},
                            avain, algorithm='ES256', headers={'kid': kid, 'typ': 'JWT'})
        data = json.dumps(body).encode() if body is not None else None
        req = urllib.request.Request('https://api.appstoreconnect.apple.com' + polku, data=data, method=metodi,
                                     headers={'Authorization': 'Bearer ' + tunnus, 'Accept': 'application/json',
                                              'Content-Type': 'application/json'})
        try:
            with urllib.request.urlopen(req, timeout=60) as v:
                out = v.read()
                return v.status, (json.loads(out) if out else {})
        except urllib.error.HTTPError as e:
            out = e.read()
            try:
                return e.code, (json.loads(out) if out else {})
            except ValueError:
                return e.code, {'raaka': out.decode(errors='replace')[:500]}

    tila, d = kutsu('GET', f'/v1/apps?filter[bundleId]={a.bundle_id}')
    if tila != 200 or not d.get('data'):
        virhe('Appia ei löydy', f'{a.bundle_id}: {tila}')
    app_id = d['data'][0]['id']

    tila, d = kutsu('GET', f'/v1/apps/{app_id}/betaGroups?limit=50')
    if tila != 200:
        virhe('Testiryhmiä ei saatu', f'{tila}: {d}')
    ulkoiset = [g for g in d.get('data', []) if not g['attributes'].get('isInternalGroup')]
    if not ulkoiset:
        virhe('Ulkoista testiryhmää ei ole', 'Luo ulkoinen ryhmä ja julkinen linkki kerran App Store Connectissa.')

    kirjaa('## Ulkoinen TestFlight-ryhmä')
    for g in ulkoiset:
        at = g['attributes']
        tila, t = kutsu('GET', f"/v1/betaGroups/{g['id']}/betaTesters?limit=1")
        maara = t.get('meta', {}).get('paging', {}).get('total', '?') if tila == 200 else f'? ({tila})'
        raja = at.get('publicLinkLimit') if at.get('publicLinkLimitEnabled') else 'ei rajaa'
        kirjaa(f"- **{at.get('name')}**: julkinen linkki {'päällä' if at.get('publicLinkEnabled') else 'pois'}"
               f" ({at.get('publicLink') or '–'}), raja {raja} (max 100), testaajia {maara}")

    if a.ryhma:
        ryhma = next((g for g in ulkoiset if g['attributes'].get('name') == a.ryhma), None)
        if not ryhma:
            virhe('Ryhmää ei löydy', a.ryhma)
    elif len(ulkoiset) == 1:
        ryhma = ulkoiset[0]
    else:
        linkilliset = [g for g in ulkoiset if g['attributes'].get('publicLinkEnabled')]
        if len(linkilliset) != 1:
            virhe('Ryhmä epäselvä', 'Useita ulkoisia ryhmiä; anna --ryhma.')
        ryhma = linkilliset[0]
    ryhma_id = ryhma['id']
    kirjaa(f"Kohderyhmä: {ryhma['attributes'].get('name')}")

    tila, d = kutsu('GET', f'/v1/betaGroups/{ryhma_id}/builds?limit=5&fields[builds]=version,uploadedDate,expired,processingState')
    if tila == 200:
        buildit = sorted(d.get('data', []), key=lambda b: b['attributes'].get('uploadedDate') or '', reverse=True)
        if buildit:
            kirjaa('Ryhmän uusimmat buildit:')
            for b in buildit[:3]:
                bat = b['attributes']
                vanha = ' (vanhentunut)' if bat.get('expired') else ''
                kirjaa(f"  - {bat.get('version')} ladattu {bat.get('uploadedDate')}{vanha}")
        else:
            kirjaa('Ryhmässä ei ole buildeja.')
    else:
        kirjaa(f'::warning::Ryhmän buildeja ei saatu: {tila}')

    # betaTesterUsages vaatii groupBy=betaTesters (ilman sitä 400, ajo 36689621711).
    for mittari, kysely in (('publicLinkUsages', ''), ('betaTesterUsages', '?groupBy=betaTesters&period=P365D')):
        tila, d = kutsu('GET', f'/v1/betaGroups/{ryhma_id}/metrics/{mittari}{kysely}')
        if tila != 200:
            syy = '; '.join(e.get('detail') or e.get('title', '') for e in d.get('errors', [])) if isinstance(d, dict) else ''
            kirjaa(f'- {mittari}: ei saatu ({tila}) {syy[:200]}')
            continue
        yhteensa = {}
        for sarja in d.get('data', []):
            for piste in sarja.get('dataPoints', []):
                for k, v in (piste.get('values') or {}).items():
                    if isinstance(v, (int, float)):
                        yhteensa[k] = yhteensa.get(k, 0) + v
        kirjaa(f"- {mittari}: {', '.join(f'{k} {v}' for k, v in sorted(yhteensa.items())) or 'ei käyttöä'}")

    for vb in [x.strip() for x in a.vanhenna.split(',') if x.strip()]:
        tila, d = kutsu('GET', f'/v1/builds?filter[app]={app_id}&filter[version]={vb}&limit=5')
        loydetyt = d.get('data', []) if tila == 200 else []
        if len(loydetyt) != 1:
            virhe('Vanhennettavaa buildia ei löydy yksiselitteisesti', f'{vb}: {tila}, {len(loydetyt)} osumaa')
        b = loydetyt[0]
        if b['attributes'].get('expired'):
            kirjaa(f'Build {vb}: jo vanhennettu.')
            continue
        tila, d = kutsu('PATCH', f"/v1/builds/{b['id']}", {'data': {
            'type': 'builds', 'id': b['id'], 'attributes': {'expired': True}}})
        if tila != 200:
            virhe('Vanhennus epäonnistui', f'{vb}: {tila}: {d}')
        kirjaa(f'Build {vb}: vanhennettu.')

    if not a.build:
        return

    raja = time.time() + a.odota_min * 60
    while True:
        tila, d = kutsu('GET', f'/v1/builds?filter[app]={app_id}&filter[version]={a.build}&limit=5')
        if tila != 200:
            virhe('Buildia ei saatu', f'{tila}: {d}')
        build = d['data'][0] if d.get('data') else None
        tilanne = build['attributes'].get('processingState') if build else 'ei vielä näkyvissä'
        if tilanne == 'VALID':
            break
        if tilanne in ('FAILED', 'INVALID'):
            virhe('Apple hylkäsi buildin', f'{a.build}: {tilanne}')
        if time.time() > raja:
            virhe('Käsittely kesti liian kauan', f'{a.build}: {tilanne}')
        print(f'Build {a.build}: {tilanne} — odotetaan 60 s')
        time.sleep(60)
    build_id = build['id']

    tila, d = kutsu('POST', f'/v1/betaGroups/{ryhma_id}/relationships/builds',
                    {'data': [{'type': 'builds', 'id': build_id}]})
    if tila not in (200, 204):
        virhe('Buildin liitos ulkoiseen ryhmään epäonnistui', f'{tila}: {d}')
    kirjaa(f'Build {a.build} liitetty ulkoiseen ryhmään.')

    tila, d = kutsu('GET', f'/v1/builds/{build_id}/betaAppReviewSubmission')
    olemassa = d.get('data') if tila == 200 else None
    if olemassa:
        kirjaa(f"Beta-arvio: jo olemassa ({olemassa['attributes'].get('betaReviewState')}).")
        return
    tila, d = kutsu('POST', '/v1/betaAppReviewSubmissions', {'data': {
        'type': 'betaAppReviewSubmissions',
        'relationships': {'build': {'data': {'type': 'builds', 'id': build_id}}}}})
    if tila not in (200, 201):
        virhe('Beta-arvioon lähetys epäonnistui', f'{tila}: {d}')
    kirjaa(f"Beta-arvio: lähetetty ({d.get('data', {}).get('attributes', {}).get('betaReviewState')}).")


if __name__ == '__main__':
    main()
