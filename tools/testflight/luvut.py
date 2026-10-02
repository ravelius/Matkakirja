#!/usr/bin/env python3
"""TestFlight-luvut (vain luku): viimeisimpien buildien käyttö ja testiryhmien koot.

Omistajan kysymys 2.10.2026 (Päätoimittajan kautta): näkyykö TestFlightin
latausmäärä? ASC-avain on vain Actionsin secreteissä, joten luvut haetaan
workflow_dispatch-ajolla (.github/workflows/testflight-luvut.yml).

Hakee:
1) viimeisimmät --buildit buildia ja kullekin
   GET /v1/builds/{id}/metrics/betaBuildUsages
   (installCount, sessionCount, crashCount, feedbackCount, inviteCount),
2) testiryhmien testaajamäärät,
3) julkisen linkin ryhmille GET /v1/betaGroups/{id}/metrics/publicLinkUsages.

Tulostaa Markdown-taulukot stdoutiin ja $GITHUB_STEP_SUMMARY:iin. Ei kirjoita
mitään App Store Connectiin. Avaimia, tunnisteita tai sähköposteja ei tulosteta.

Ympäristö: ASC_KEY_ID, ASC_ISSUER_ID, ASC_AVAIN_POLKU. Argumentit: --bundle-id, --buildit.
"""
import argparse
import json
import os
import sys
import time
import urllib.error
import urllib.request

import jwt

MITTARIT = ['installCount', 'sessionCount', 'crashCount', 'feedbackCount', 'inviteCount']
OTSAKKEET = ['Asennukset', 'Istunnot', 'Kaatumiset', 'Palautteet', 'Kutsut']


def virhe(otsikko, viesti):
    print(f'::error title={otsikko}::{viesti}')
    sys.exit(1)


def summa_pisteista(data):
    """betaBuildUsages/publicLinkUsages: data[].dataPoints[].values → summat avaimittain."""
    summat = {}
    for sarja in data or []:
        for piste in sarja.get('dataPoints', []) or []:
            for k, v in (piste.get('values') or {}).items():
                if isinstance(v, (int, float)):
                    summat[k] = summat.get(k, 0) + v
    return summat


def main():
    p = argparse.ArgumentParser()
    p.add_argument('--bundle-id', required=True)
    p.add_argument('--buildit', type=int, default=10)
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

    rivit = []

    # 1) Buildit ja niiden käyttö
    tila, d = kutsu(f'/v1/builds?filter[app]={app_id}&sort=-uploadedDate&limit={a.buildit}'
                    '&fields[builds]=version,uploadedDate,processingState,expired')
    if tila != 200:
        virhe('Buildeja ei saatu', str(tila))
    rivit.append(f'## TestFlight-buildit (viimeisimmät {a.buildit})\n')
    rivit.append('| Build | Ladattu | Tila | ' + ' | '.join(OTSAKKEET) + ' |')
    rivit.append('|---|---|---|' + '---:|' * len(OTSAKKEET))
    yhteensa = {k: 0 for k in MITTARIT}
    for b in d.get('data', []):
        at = b.get('attributes', {})
        ladattu = (at.get('uploadedDate') or '')[:16].replace('T', ' ')
        tilateksti = 'vanhennettu' if at.get('expired') else (at.get('processingState') or '')
        t2, m = kutsu(f"/v1/builds/{b['id']}/metrics/betaBuildUsages")
        if t2 == 200:
            s = summa_pisteista(m.get('data'))
            arvot = [str(int(s.get(k, 0))) for k in MITTARIT]
            for k in MITTARIT:
                yhteensa[k] += int(s.get(k, 0))
        else:
            arvot = [f'– ({t2})'] + [''] * (len(MITTARIT) - 1)
        rivit.append(f"| {at.get('version', '?')} | {ladattu} | {tilateksti} | " + ' | '.join(arvot) + ' |')
    rivit.append('| **Yhteensä** | | | ' + ' | '.join(f'**{yhteensa[k]}**' for k in MITTARIT) + ' |')

    # 2) Testiryhmät ja 3) julkinen linkki
    tila, d = kutsu(f'/v1/apps/{app_id}/betaGroups?limit=50'
                    '&fields[betaGroups]=name,isInternalGroup,publicLinkEnabled,publicLinkLimit')
    if tila != 200:
        virhe('Testiryhmiä ei saatu', str(tila))
    rivit.append('\n## Testiryhmät\n')
    rivit.append('| Ryhmä | Tyyppi | Testaajia | Julkinen linkki | Linkin katselut | Linkin hyväksynnät |')
    rivit.append('|---|---|---:|---|---:|---:|')
    for g in d.get('data', []):
        at = g.get('attributes', {})
        t2, tt = kutsu(f"/v1/betaGroups/{g['id']}/betaTesters?limit=1&fields[betaTesters]=state")
        testaajia = (tt.get('meta', {}).get('paging', {}).get('total') if t2 == 200 else None)
        testaajia = '–' if testaajia is None else str(testaajia)
        linkki = 'kyllä' if at.get('publicLinkEnabled') else 'ei'
        katselut = hyvaksynnat = ''
        if at.get('publicLinkEnabled'):
            t3, pl = kutsu(f"/v1/betaGroups/{g['id']}/metrics/publicLinkUsages")
            if t3 == 200:
                s = summa_pisteista(pl.get('data'))
                katselut = str(int(s.get('viewCount', 0)))
                hyvaksynnat = str(int(s.get('acceptedCount', 0)))
            else:
                katselut = f'– ({t3})'
        tyyppi = 'sisäinen' if at.get('isInternalGroup') else 'ulkoinen'
        rivit.append(f"| {at.get('name', '?')} | {tyyppi} | {testaajia} | {linkki} | {katselut} | {hyvaksynnat} |")

    teksti = '\n'.join(rivit) + '\n'
    print(teksti)
    yhteenveto = os.environ.get('GITHUB_STEP_SUMMARY')
    if yhteenveto:
        with open(yhteenveto, 'a') as f:
            f.write(teksti)


if __name__ == '__main__':
    main()
