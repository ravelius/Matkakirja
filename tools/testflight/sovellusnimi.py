#!/usr/bin/env python3
"""Sovelluksen nimi App Store Connectissa ja TestFlightissä (omistaja 11.10.2026 klo 22.2x).

Omistaja: beta-testaajat näkevät yhä "Matkakirja 3D"; nimen pitää olla kaikkialla pelkkä "Matkakirja".

Lukee aina ja kirjaa yhteenvetoon:
- sovelluksen nimi ja alaotsikko (appInfos → appInfoLocalizations, kaikki kielet ja appInfot),
- TestFlightin beta-lokalisaatiot (betaAppLocalizations: kuvaus, palaute, markkinointi- ja tietosuoja-URL),
- testiryhmien nimet,
- uusimpien buildien Testattavaa-tekstit (betaBuildLocalizations.whatsNew).

--vaihda: korvaa merkkijonon --vanha (oletus "Matkakirja 3D") arvolla --uusi (oletus "Matkakirja") kaikissa
yllä luetelluissa kentissä, joissa se esiintyy. Jos Apple hylkää nimen (esim. varattu tai lukittu, kun
mikään versio ei ole muokattavissa), virhe kirjataan sellaisenaan eikä korvaavaa nimeä keksitä.

Ympäristö: ASC_KEY_ID, ASC_ISSUER_ID, ASC_AVAIN_POLKU.
"""
import argparse
import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

import jwt

YHTEENVETO = os.environ.get('GITHUB_STEP_SUMMARY')
VIRHEITA = []


def kirjaa(rivi):
    print(rivi)
    if YHTEENVETO:
        with open(YHTEENVETO, 'a') as f:
            f.write(rivi + '\n')


def main():
    p = argparse.ArgumentParser()
    p.add_argument('--bundle-id', default='fi.matkakirja.peli')
    p.add_argument('--vanha', default='Matkakirja 3D')
    p.add_argument('--uusi', default='Matkakirja')
    p.add_argument('--vaihda', action='store_true')
    p.add_argument('--buildeja', type=int, default=8, help='montako uusinta buildia (Testattavaa-tekstit)')
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

    def paivita(tyyppi, olio_id, kentat, kuvaus):
        tila, d = kutsu('PATCH', f'/v1/{tyyppi}/{olio_id}',
                        {'data': {'type': tyyppi, 'id': olio_id, 'attributes': kentat}})
        if tila == 200:
            kirjaa(f'  VAIHDETTU {kuvaus}: {kentat}')
        else:
            tiedot = '; '.join(f"{v.get('code')}: {v.get('detail') or v.get('title')}" for v in d.get('errors', [])) or str(d)
            kirjaa(f'  EI VAIHTUNUT {kuvaus}: HTTP {tila}: {tiedot}')
            VIRHEITA.append(f'{kuvaus}: HTTP {tila}: {tiedot}')

    def korvaa(teksti):
        return teksti.replace(a.vanha, a.uusi) if isinstance(teksti, str) else teksti

    tila, d = kutsu('GET', f'/v1/apps?filter[bundleId]={urllib.parse.quote(a.bundle_id)}')
    if tila != 200 or not d.get('data'):
        print(f'::error title=Appia ei löydy::{a.bundle_id}: {tila}')
        sys.exit(1)
    app = d['data'][0]
    app_id = app['id']
    kirjaa(f"## Sovelluksen nimi ({'VAIHTO' if a.vaihda else 'luku'}: \"{a.vanha}\" → \"{a.uusi}\")")
    kirjaa(f"App {app_id}: name=\"{app['attributes'].get('name')}\", bundleId {app['attributes'].get('bundleId')}")

    # 1) App Store -nimi ja alaotsikko jokaisessa appInfossa (muokattava + julkaistu).
    tila, d = kutsu('GET', f'/v1/apps/{app_id}/appInfos?limit=10')
    for info in d.get('data', []) if tila == 200 else []:
        tila_i = info['attributes'].get('appStoreState') or info['attributes'].get('state')
        kirjaa(f"### appInfo {info['id']} ({tila_i})")
        t, ld = kutsu('GET', f"/v1/appInfos/{info['id']}/appInfoLocalizations?limit=50")
        for lok in ld.get('data', []) if t == 200 else []:
            at = lok['attributes']
            kirjaa(f"- {at.get('locale')}: name=\"{at.get('name')}\", subtitle=\"{at.get('subtitle')}\"")
            muutos = {k: korvaa(at.get(k)) for k in ('name', 'subtitle') if isinstance(at.get(k), str) and a.vanha in at.get(k)}
            if a.vaihda and muutos:
                paivita('appInfoLocalizations', lok['id'], muutos, f"appInfo {info['id']} {at.get('locale')}")
    if tila != 200:
        kirjaa(f'appInfos: HTTP {tila}: {d}')

    # 2) TestFlightin beta-lokalisaatiot (kuvaus näkyy testaajille).
    tila, d = kutsu('GET', f'/v1/apps/{app_id}/betaAppLocalizations?limit=50')
    kirjaa('### TestFlight: betaAppLocalizations')
    for lok in d.get('data', []) if tila == 200 else []:
        at = lok['attributes']
        kirjaa(f"- {at.get('locale')}: description=\"{(at.get('description') or '')[:300]}\", "
               f"feedbackEmail={at.get('feedbackEmail')}, marketingUrl={at.get('marketingUrl')}")
        kentat = ('description', 'marketingUrl', 'privacyPolicyUrl', 'tvOsPrivacyPolicy')
        muutos = {k: korvaa(at.get(k)) for k in kentat if isinstance(at.get(k), str) and a.vanha in at.get(k)}
        if a.vaihda and muutos:
            paivita('betaAppLocalizations', lok['id'], muutos, f"betaAppLocalization {at.get('locale')}")

    # 3) Testiryhmien nimet.
    tila, d = kutsu('GET', f'/v1/apps/{app_id}/betaGroups?limit=50')
    kirjaa('### Testiryhmät')
    for g in d.get('data', []) if tila == 200 else []:
        nimi = g['attributes'].get('name') or ''
        kirjaa(f"- {nimi} (sisäinen: {g['attributes'].get('isInternalGroup')})")
        if a.vaihda and a.vanha in nimi:
            paivita('betaGroups', g['id'], {'name': korvaa(nimi)}, f'ryhmä {nimi}')

    # 4) Uusimpien buildien Testattavaa-tekstit.
    tila, d = kutsu('GET', f'/v1/builds?filter[app]={app_id}&sort=-uploadedDate&limit={a.buildeja}')
    kirjaa('### Testattavaa (uusimmat buildit)')
    for b in d.get('data', []) if tila == 200 else []:
        t, ld = kutsu('GET', f"/v1/builds/{b['id']}/betaBuildLocalizations?limit=20")
        for lok in ld.get('data', []) if t == 200 else []:
            teksti = lok['attributes'].get('whatsNew') or ''
            osuu = a.vanha in teksti
            kirjaa(f"- build {b['attributes'].get('version')} {lok['attributes'].get('locale')}: "
                   f"{'SISÄLTÄÄ VANHAN NIMEN' if osuu else 'ok'}")
            if a.vaihda and osuu:
                paivita('betaBuildLocalizations', lok['id'], {'whatsNew': korvaa(teksti)},
                        f"Testattavaa build {b['attributes'].get('version')}")

    if VIRHEITA:
        print('::warning title=Kaikki kentät eivät vaihtuneet::' + ' | '.join(VIRHEITA)[:900])


if __name__ == '__main__':
    main()
