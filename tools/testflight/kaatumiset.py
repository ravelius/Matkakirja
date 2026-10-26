#!/usr/bin/env python3
"""TestFlight-kaatumispalautteet (vain luku): testaajien lähettämät kaatumiset ja niiden lokit.

Päätoimittajan pyyntö 6.10.2026: omistajan iPad Pro kaatui oppaan Prahan linnassa
(TF 146/148). ASC-avain on vain Actionsin secreteissä, joten haku ajetaan
workflow_dispatch-ajolla (.github/workflows/testflight-kaatumiset.yml).

Hakee GET /v1/apps/{id}/betaFeedbackCrashSubmissions (uusin ensin, enintään --maara,
vain --tunnit viimeisen tunnin ajalta) ja kullekin build-version sekä
GET /v1/betaFeedbackCrashSubmissions/{id}/crashLog. Tulostaa laitteen, buildin,
ajan, kaatumistyypin ja lokin alun job summaryyn; täydet lokit kansioon --kansio
(workflow lataa ne artefaktiksi). Ei kirjoita App Store Connectiin mitään.
Sähköposteja, testaajien nimiä tai avaimia ei tulosteta.

Ympäristö: ASC_KEY_ID, ASC_ISSUER_ID, ASC_AVAIN_POLKU.
"""
import argparse
import datetime
import json
import os
import re
import sys
import time
import urllib.error
import urllib.request

import jwt

TYYPPI = re.compile(r'^(Exception Type|Exception Codes|Termination Reason|Triggered by Thread|Crashed Thread)\s*:.*$', re.M)


def virhe(otsikko, viesti):
    print(f'::error title={otsikko}::{viesti}')
    sys.exit(1)


def main():
    p = argparse.ArgumentParser()
    p.add_argument('--bundle-id', required=True)
    p.add_argument('--tunnit', type=float, default=24)
    p.add_argument('--maara', type=int, default=20)
    p.add_argument('--kansio', default='kaatumislokit')
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

    tila, d = kutsu(f'/v1/apps?filter[bundleId]={a.bundle_id}')
    if tila != 200 or not d.get('data'):
        virhe('Appia ei löydy', f'{a.bundle_id}: {tila}')
    app_id = d['data'][0]['id']

    tila, d = kutsu(f'/v1/apps/{app_id}/betaFeedbackCrashSubmissions?sort=-createdDate&limit={a.maara}'
                    '&include=build&fields[builds]=version')
    if tila != 200:
        virhe('Kaatumispalautteita ei saatu', str(tila))
    versiot = {b['id']: b.get('attributes', {}).get('version', '?')
               for b in d.get('included', []) if b.get('type') == 'builds'}
    raja = datetime.datetime.now(datetime.timezone.utc) - datetime.timedelta(hours=a.tunnit)
    os.makedirs(a.kansio, exist_ok=True)

    rivit = [f'## TestFlight-kaatumispalautteet (viimeiset {a.tunnit:g} h)\n']
    loydetty = 0
    for s in d.get('data', []):
        at = s.get('attributes', {})
        luotu = at.get('createdDate') or ''
        try:
            if datetime.datetime.fromisoformat(luotu.replace('Z', '+00:00')) < raja:
                continue
        except ValueError:
            pass
        loydetty += 1
        bid = (s.get('relationships', {}).get('build', {}).get('data') or {}).get('id')
        build = versiot.get(bid, '?')
        laite = at.get('deviceModel') or '?'
        rivit.append(f"### {luotu[:16].replace('T', ' ')} UTC · build {build} · {laite} · iOS {at.get('osVersion', '?')}")
        muisti = at.get('diskBytesAvailable')
        rivit.append(f"- käynnissä {int((at.get('appUptimeInMilliseconds') or 0) / 1000)} s, levyä vapaana "
                     f"{round(muisti / 1e9, 1) if muisti else '?'} Gt, akku {at.get('batteryPercentage', '?')} %")
        if at.get('comment'):
            rivit.append(f"- kommentti: {at['comment'][:300]}")
        t2, log = kutsu(f"/v1/betaFeedbackCrashSubmissions/{s['id']}/crashLog")
        teksti = (log.get('data') or {}).get('attributes', {}).get('logText') if t2 == 200 else None
        if not teksti:
            rivit.append(f'- lokia ei saatu ({t2})\n')
            continue
        with open(os.path.join(a.kansio, f"{luotu[:19].replace(':', '')}-build{build}.crash"), 'w') as f:
            f.write(teksti)
        tyypit = [m.group(0).strip() for m in TYYPPI.finditer(teksti)]
        rivit.append('- ' + ('; '.join(tyypit) if tyypit else 'kaatumistyyppiä ei löytynyt lokista'))
        alku = teksti.find('Crashed')
        pino = teksti[alku:alku + 3000] if alku >= 0 else teksti[:3000]
        rivit.append('```\n' + pino.strip() + '\n```\n')
    if not loydetty:
        rivit.append('Ei testaajan lähettämiä kaatumispalautteita aikaikkunassa. Automaattiset kaatumiset näkyvät vain '
                     'määrinä (testflight-luvut) ja Xcode Organizerissa.')

    teksti = '\n'.join(rivit) + '\n'
    print(teksti)
    yhteenveto = os.environ.get('GITHUB_STEP_SUMMARY')
    if yhteenveto:
        with open(yhteenveto, 'a') as f:
            f.write(teksti)


if __name__ == '__main__':
    main()
