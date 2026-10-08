#!/usr/bin/env python3
"""Increased Memory Limit -oikeus App ID:ille (omistajan lupa 6.10.2026 Julkaisijan sessiossa).

Omistajan iPad Pro kaatui oppaassa (jetsam 5,36 Gt). Natiivisepän muistikatto
(com.apple.developer.kernel.increased-memory-limit) vaatii, että App ID:llä on
capability INCREASED_MEMORY_LIMIT; muuten allekirjoitus hylkää profiilin.

Kullekin --bundle-id:lle: GET /v1/bundleIds?filter[identifier]=… → onko
INCREASED_MEMORY_LIMIT jo bundleIdCapabilities-listassa → jos ei ja --kuiva
ei ole päällä, POST /v1/bundleIdCapabilities. Vanhat App Store -profiilit
muuttuvat tämän jälkeen epäkelvoiksi; proto3d-testflight.yml luo uuden, kun
ACTIVE-profiilia ei löydy. Muita oikeuksia tai asetuksia ei kosketa.

Ympäristö: ASC_KEY_ID, ASC_ISSUER_ID, ASC_AVAIN_POLKU.
"""
import argparse
import json
import os
import sys
import time
import urllib.error
import urllib.request

import jwt

OIKEUS = 'INCREASED_MEMORY_LIMIT'


def main():
    p = argparse.ArgumentParser()
    p.add_argument('--bundle-id', action='append', required=True)
    p.add_argument('--kuiva', action='store_true')
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
                return e.code, {}

    rivit = [f"## Increased Memory Limit {'(kuiva-ajo)' if a.kuiva else ''}\n", '| App ID | Tila |', '|---|---|']
    virheita = 0
    for bid in a.bundle_id:
        tila, d = kutsu('GET', f'/v1/bundleIds?filter[identifier]={bid}&limit=20')
        osuma = [b for b in d.get('data', []) if b.get('attributes', {}).get('identifier') == bid] if tila == 200 else []
        if not osuma:
            t3, kaikki = kutsu('GET', '/v1/bundleIds?limit=200&fields[bundleIds]=identifier,platform')
            loydetyt = sorted(b['attributes']['identifier'] for b in kaikki.get('data', [])
                              if 'matkakirja' in b.get('attributes', {}).get('identifier', '')) if t3 == 200 else []
            rivit.append(f"| {bid} | App ID:tä ei löydy ({tila}); tilillä: {', '.join(loydetyt) or '–'} |")
            virheita += 1
            continue
        resurssi = osuma[0]['id']
        tila, c = kutsu('GET', f'/v1/bundleIds/{resurssi}/bundleIdCapabilities')
        if tila != 200:
            syy = '; '.join(e.get('detail', '') for e in c.get('errors', []))[:300]
            rivit.append(f'| {bid} | oikeuksia ei saatu ({tila}): {syy} |')
            virheita += 1
            continue
        if any(x.get('attributes', {}).get('capabilityType') == OIKEUS for x in c.get('data', [])):
            rivit.append(f'| {bid} | oli jo päällä |')
            continue
        if a.kuiva:
            rivit.append(f'| {bid} | puuttuu (lisättäisiin) |')
            continue
        tila, r = kutsu('POST', '/v1/bundleIdCapabilities', {'data': {
            'type': 'bundleIdCapabilities', 'attributes': {'capabilityType': OIKEUS},
            'relationships': {'bundleId': {'data': {'type': 'bundleIds', 'id': resurssi}}}}})
        if tila == 201:
            rivit.append(f'| {bid} | LISÄTTY |')
        else:
            syy = '; '.join(e.get('detail', '') for e in r.get('errors', []))[:300]
            rivit.append(f'| {bid} | lisäys epäonnistui ({tila}): {syy} |')
            virheita += 1

    teksti = '\n'.join(rivit) + '\n'
    print(teksti)
    yhteenveto = os.environ.get('GITHUB_STEP_SUMMARY')
    if yhteenveto:
        with open(yhteenveto, 'a') as f:
            f.write(teksti)
    if virheita:
        print(f'::error title=Muistioikeus::{virheita} App ID:tä epäonnistui')
        sys.exit(1)


if __name__ == '__main__':
    main()
