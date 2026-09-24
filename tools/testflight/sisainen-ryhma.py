#!/usr/bin/env python3
"""Vie ladatun TestFlight-buildin sisäiselle testiryhmälle.

1) varmistaa, että testaaja (ASC-käyttäjä) on appin sisäisessä ryhmässä,
2) odottaa, että Apple on käsitellyt buildin (processingState VALID),
3) liittää buildin sisäiseen ryhmään (ellei ryhmä saa kaikkia buildeja
   automaattisesti).

Ympäristö: ASC_KEY_ID, ASC_ISSUER_ID, ASC_AVAIN_POLKU (.p8-tiedosto),
TESTAAJA (sähköposti, valinnainen; oletus tilin omistaja). Argumentit: --bundle-id, --build
(CFBundleVersion), --odota-min (käsittelyn aikaraja).
Kaikki virheet näkyvät ::error-rivinä ja lopettavat nollasta poikkeavasti.
"""
import argparse
import json
import os
import sys
import time
import urllib.error
import urllib.request

import jwt


def virhe(otsikko, viesti):
    print(f'::error title={otsikko}::{viesti}')
    sys.exit(1)


def main():
    p = argparse.ArgumentParser()
    p.add_argument('--bundle-id', required=True)
    p.add_argument('--build', required=True)
    p.add_argument('--odota-min', type=int, default=45)
    a = p.parse_args()

    kid = os.environ['ASC_KEY_ID']
    iss = os.environ['ASC_ISSUER_ID']
    avain = open(os.environ['ASC_AVAIN_POLKU']).read()
    testaaja = os.environ.get('TESTAAJA', '').strip()

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
            return e.code, (json.loads(out) if out else {})

    tila, d = kutsu('GET', f'/v1/apps?filter[bundleId]={a.bundle_id}')
    if tila != 200 or not d.get('data'):
        virhe('Appia ei löydy', f'{a.bundle_id}: {tila}')
    app_id = d['data'][0]['id']

    tila, d = kutsu('GET', f'/v1/apps/{app_id}/betaGroups?limit=50')
    if tila != 200:
        virhe('Testiryhmiä ei saatu', f'{tila}: {d}')
    ryhma = next((g for g in d.get('data', []) if g['attributes'].get('isInternalGroup')), None)
    if not ryhma:
        virhe('Sisäistä testiryhmää ei ole', 'Luo sisäinen ryhmä kerran App Store Connectissa.')
    ryhma_id = ryhma['id']
    kaikki_buildit = bool(ryhma['attributes'].get('hasAccessToAllBuilds'))
    print(f"Sisäinen ryhmä: {ryhma['attributes'].get('name')} (kaikki buildit automaattisesti: {kaikki_buildit})")

    if not testaaja:
        # Oletustestaaja on tilin omistaja (ACCOUNT_HOLDER) — osoitetta ei
        # tarvitse tallentaa minnekään.
        tila, d = kutsu('GET', '/v1/users?filter[roles]=ACCOUNT_HOLDER&limit=5')
        if tila != 200 or not d.get('data'):
            virhe('Tilin omistajaa ei löydy', f'{tila}: {d}')
        testaaja = d['data'][0]['attributes'].get('username', '')
        print('Testaaja: tilin omistaja.')

    if testaaja:
        tila, d = kutsu('GET', f'/v1/betaGroups/{ryhma_id}/betaTesters?limit=200')
        if tila != 200:
            virhe('Ryhmän testaajia ei saatu', f'{tila}: {d}')
        if any(t['attributes'].get('email', '').lower() == testaaja.lower() for t in d.get('data', [])):
            print('Testaaja on jo ryhmässä.')
        else:
            tila, d = kutsu('POST', '/v1/betaTesters', {'data': {
                'type': 'betaTesters', 'attributes': {'email': testaaja},
                'relationships': {'betaGroups': {'data': [{'type': 'betaGroups', 'id': ryhma_id}]}}}})
            if tila not in (200, 201):
                virhe('Testaajan lisäys epäonnistui',
                      f'{tila}: {d} — sisäisen ryhmän testaajan on oltava App Store Connect -käyttäjä.')
            print('Testaaja lisätty sisäiseen ryhmään.')

    raja = time.time() + a.odota_min * 60
    build = None
    while True:
        tila, d = kutsu('GET', f'/v1/builds?filter[app]={app_id}&filter[version]={a.build}&limit=5')
        if tila != 200:
            virhe('Buildia ei saatu', f'{tila}: {d}')
        if d.get('data'):
            build = d['data'][0]
            tilanne = build['attributes'].get('processingState')
            if tilanne == 'VALID':
                break
            if tilanne in ('FAILED', 'INVALID'):
                virhe('Apple hylkäsi buildin', f'{a.build}: {tilanne}')
        else:
            tilanne = 'ei vielä näkyvissä'
        if time.time() > raja:
            virhe('Käsittely kesti liian kauan', f'{a.build}: {tilanne} {a.odota_min} min jälkeen')
        print(f'Build {a.build}: {tilanne} — odotetaan 60 s')
        time.sleep(60)
    build_id = build['id']
    print(f'Build {a.build} käsitelty (id {build_id}).')

    if build['attributes'].get('usesNonExemptEncryption') is None:
        print('::warning::Buildilta puuttuu vientivalvontatieto (ITSAppUsesNonExemptEncryption) — '
              'se voi jäädä "Missing Compliance" -tilaan.')

    if kaikki_buildit:
        print('Ryhmä saa kaikki buildit automaattisesti — liittämistä ei tarvita.')
        return
    tila, d = kutsu('POST', f'/v1/betaGroups/{ryhma_id}/relationships/builds',
                    {'data': [{'type': 'builds', 'id': build_id}]})
    if tila not in (200, 201, 204):
        virhe('Buildin liittäminen ryhmään epäonnistui', f'{tila}: {d}')
    print('Build liitetty sisäiseen ryhmään.')


if __name__ == '__main__':
    main()
