#!/usr/bin/env python3
"""Mac TestFlightin lähtötila (Päätoimittajan kuittaus 7.10.2026, Natiiviseppä): VAIN LUKU.

Natiivi Mac -käännös halutaan samaan App Store -tietueeseen kuin iOS (universal
purchase). Tämä kertoo, mitä ASC:ssä jo on ja mitä Mac-TestFlight vielä tarvitsee:
1) App ID:n alusta (IOS / MAC_OS / UNIVERSAL) ja oikeudet,
2) app-tietueen alustat (appStoreVersions ja preReleaseVersions platformin mukaan),
3) Mac-jakeluun kelpaavat varmenteet (DISTRIBUTION, MAC_APP_DISTRIBUTION,
   MAC_INSTALLER_DISTRIBUTION) ja
4) App ID:n profiilit (MAC_APP_STORE?).
Mitään ei luoda eikä muuteta.

Ympäristö: ASC_KEY_ID, ASC_ISSUER_ID, ASC_AVAIN_POLKU.
"""
import argparse
import json
import os
import time
import urllib.error
import urllib.request

import jwt


def main():
    p = argparse.ArgumentParser()
    p.add_argument('--bundle-id', action='append', required=True)
    a = p.parse_args()

    kid = os.environ['ASC_KEY_ID']
    iss = os.environ['ASC_ISSUER_ID']
    avain = open(os.environ['ASC_AVAIN_POLKU']).read()

    def kutsu(polku):
        nyt = int(time.time())
        tunnus = jwt.encode({'iss': iss, 'iat': nyt, 'exp': nyt + 600, 'aud': 'appstoreconnect-v1'},
                            avain, algorithm='ES256', headers={'kid': kid, 'typ': 'JWT'})
        req = urllib.request.Request('https://api.appstoreconnect.apple.com' + polku, method='GET',
                                     headers={'Authorization': 'Bearer ' + tunnus, 'Accept': 'application/json'})
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

    def virhe(tila, d):
        return f"{tila}: " + '; '.join(e.get('detail', '') for e in d.get('errors', []))[:200]

    rivit = ['## Mac TestFlight -lähtötila (vain luku)\n']

    rivit += ['### App ID:t', '| App ID | Alusta | Oikeudet | Profiilit (tyyppi, tila, vanhenee) |', '|---|---|---|---|']
    for bid in a.bundle_id:
        tila, d = kutsu(f'/v1/bundleIds?filter[identifier]={bid}&limit=20')
        osuma = [b for b in d.get('data', []) if b.get('attributes', {}).get('identifier') == bid] if tila == 200 else []
        if not osuma:
            rivit.append(f'| {bid} | EI LÖYDY ({virhe(tila, d)}) | | |')
            continue
        b = osuma[0]
        alusta = b['attributes'].get('platform')
        tila, c = kutsu(f"/v1/bundleIds/{b['id']}/bundleIdCapabilities")
        oikeudet = ', '.join(sorted(x['attributes'].get('capabilityType', '?') for x in c.get('data', []))) \
            if tila == 200 else virhe(tila, c)
        tila, pr = kutsu(f"/v1/bundleIds/{b['id']}/profiles?limit=50")
        profiilit = '; '.join(f"{x['attributes'].get('profileType')} {x['attributes'].get('profileState')} "
                              f"{(x['attributes'].get('expirationDate') or '')[:10]}"
                              for x in pr.get('data', [])) if tila == 200 else virhe(tila, pr)
        rivit.append(f'| {bid} | {alusta} | {oikeudet} | {profiilit or "–"} |')

    rivit += ['', '### App-tietueet', '| App ID | Tietue | appStoreVersions (alusta: versiot) | preReleaseVersions (alusta: versiot) |',
              '|---|---|---|---|']
    for bid in a.bundle_id:
        tila, d = kutsu(f'/v1/apps?filter[bundleId]={bid}&limit=5')
        appit = [x for x in d.get('data', []) if x.get('attributes', {}).get('bundleId') == bid] if tila == 200 else []
        if not appit:
            rivit.append(f'| {bid} | ei tietuetta ({virhe(tila, d) if tila != 200 else "0"}) | | |')
            continue
        appi = appit[0]

        def alustoittain(polku):
            t, v = kutsu(polku)
            if t != 200:
                return virhe(t, v)
            ryhmat = {}
            for x in v.get('data', []):
                ryhmat.setdefault(x['attributes'].get('platform', '?'), []).append(
                    x['attributes'].get('versionString') or x['attributes'].get('version') or '?')
            return '; '.join(f"{k}: {', '.join(sorted(set(vs))[-4:])}" for k, vs in sorted(ryhmat.items())) or '–'

        asv = alustoittain(f"/v1/apps/{appi['id']}/appStoreVersions?limit=50")
        prv = alustoittain(f"/v1/apps/{appi['id']}/preReleaseVersions?limit=50")
        rivit.append(f"| {bid} | {appi['attributes'].get('name')} | {asv} | {prv} |")

    rivit += ['', '### Jakeluvarmenteet', '| Tyyppi | Nimi | Vanhenee |', '|---|---|---|']
    tila, d = kutsu('/v1/certificates?filter[certificateType]=DISTRIBUTION,IOS_DISTRIBUTION,MAC_APP_DISTRIBUTION,'
                    'MAC_INSTALLER_DISTRIBUTION&limit=200')
    if tila != 200:
        rivit.append(f'| – | {virhe(tila, d)} | |')
    for x in sorted(d.get('data', []), key=lambda x: x['attributes'].get('certificateType', '')):
        at = x['attributes']
        rivit.append(f"| {at.get('certificateType')} | {at.get('name')} | {(at.get('expirationDate') or '')[:10]} |")

    teksti = '\n'.join(rivit) + '\n'
    print(teksti)
    yhteenveto = os.environ.get('GITHUB_STEP_SUMMARY')
    if yhteenveto:
        with open(yhteenveto, 'a') as f:
            f.write(teksti)


if __name__ == '__main__':
    main()
