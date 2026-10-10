#!/usr/bin/env python3
"""TestFlight-ryhmien TILA, vain luku (Julkaisija 10.10.2026, omistaja 08.0x: live-tekoäly vain 18+ → julkisen linkin
tilanne tarkistettava). Tulostaa jokaisesta beta-ryhmästä: nimi, sisäinen/ulkoinen, julkinen linkki päällä + raja,
testaajien määrä kutsutavoittain (EMAIL / PUBLIC_LINK) ja ryhmään liitetyt buildit. EI muuta mitään App Store Connectissa.
Ympäristö: ASC_KEY_ID, ASC_ISSUER_ID, ASC_AVAIN_POLKU (kuten sisainen-ryhma.py)."""
import argparse
import collections
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
    a = p.parse_args()
    kid, iss = os.environ['ASC_KEY_ID'], os.environ['ASC_ISSUER_ID']
    avain = open(os.environ['ASC_AVAIN_POLKU']).read()

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
            return e.code, json.loads(e.read() or b'{}')

    def kaikki(polku):
        rivit, seur = [], polku
        while seur:
            tila, d = hae(seur)
            if tila != 200:
                print(f'::warning::{polku}: {tila}'); break
            rivit += d.get('data', [])
            seur = d.get('links', {}).get('next')
        return rivit

    tila, d = hae(f'/v1/apps?filter[bundleId]={a.bundle_id}')
    if tila != 200 or not d.get('data'):
        print(f'::error::Appia ei löydy: {a.bundle_id} {tila}'); sys.exit(1)
    app_id = d['data'][0]['id']
    for g in kaikki(f'/v1/apps/{app_id}/betaGroups?limit=50'):
        at = g['attributes']
        testaajat = kaikki(f"/v1/betaGroups/{g['id']}/betaTesters?limit=200&fields[betaTesters]=inviteType,state")
        tavat = collections.Counter(t['attributes'].get('inviteType') or '?' for t in testaajat)
        tilat = collections.Counter(t['attributes'].get('state') or '?' for t in testaajat)
        buildit = kaikki(f"/v1/betaGroups/{g['id']}/builds?limit=200&fields[builds]=version,uploadedDate,expired")
        voimassa = sorted((b['attributes'].get('version') for b in buildit if not b['attributes'].get('expired')), key=lambda v: str(v))
        print(f"RYHMÄ {at.get('name')!r}: {'sisäinen' if at.get('isInternalGroup') else 'ulkoinen'}, "
              f"julkinen linkki {'PÄÄLLÄ' if at.get('publicLinkEnabled') else 'pois'}"
              f"{' (raja ' + str(at.get('publicLinkLimit')) + ')' if at.get('publicLinkLimitEnabled') else ''}, "
              f"testaajia {len(testaajat)} {dict(tavat)} tilat {dict(tilat)}, "
              f"voimassa olevia buildeja {len(voimassa)}: {', '.join(map(str, voimassa[-8:]))}")


if __name__ == '__main__':
    main()
