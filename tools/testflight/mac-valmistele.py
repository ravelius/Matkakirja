#!/usr/bin/env python3
"""Mac TestFlightin tili-valmistelu (omistaja kortilla 7.10.2026 klo 01.0x: "Kyllä, kaikki"; Natiiviseppä).

Idempotentti: luo vain puuttuvan, ei koskaan peru eikä poista mitään.
1) macOS-alusta Matkakirja-tietueeseen (universal purchase): jos tietueella ei ole MAC_OS-versiota,
   POST /v1/appStoreVersions (platform MAC_OS, versionString --versio).
2) Identiteetit pysyvään avainnippuun ($AVAINNIPPU): MAC_APP_DISTRIBUTION (allekirjoitus) ja
   MAC_INSTALLER_DISTRIBUTION (.pkg). Uusi avainpari ja varmenne vain, jos yksikään ASC:n varmenne ei
   pariudu nipun avaimeen (sama käytäntö kuin proto3d-testflight.yml).
3) MAC_APP_STORE-profiili App ID:lle, joka sisältää käytettävän MAC_APP_DISTRIBUTION-varmenteen
   (ACTIVE); muuten uusi profiili. Profiili tallennetaan polkuun --profiili.
Tulos GITHUB_ENViin: MAC_APP_SHA1, MAC_ASENNIN_NIMI, MAC_PROFIILI, TEAM_ID_PROFIILISTA.

Ympäristö: ASC_KEY_ID, ASC_ISSUER_ID, ASC_AVAIN_POLKU, TEAM_ID, AVAINNIPPU, NIPPU_SALASANA, RUNNER_TEMP.
"""
import argparse
import base64
import hashlib
import json
import os
import plistlib
import subprocess
import sys
import time
import urllib.error
import urllib.request

import jwt


def main():
    p = argparse.ArgumentParser()
    p.add_argument('--bundle-id', required=True)
    p.add_argument('--versio', required=True)
    p.add_argument('--profiili', required=True)
    a = p.parse_args()

    kid = os.environ['ASC_KEY_ID']
    iss = os.environ['ASC_ISSUER_ID']
    avain = open(os.environ['ASC_AVAIN_POLKU']).read()
    team_id = os.environ['TEAM_ID']
    nippu = os.environ['AVAINNIPPU']
    tmp = os.environ['RUNNER_TEMP']

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

    def virhe(otsikko, tila, d):
        syy = '; '.join(e.get('detail', '') or e.get('title', '') for e in d.get('errors', []))[:400]
        print(f'::error title={otsikko}::{tila}: {syy}')
        sys.exit(1)

    # ── 1) macOS-alusta ──────────────────────────────────────────────────
    tila, d = kutsu('GET', f'/v1/apps?filter[bundleId]={a.bundle_id}&limit=5')
    appit = [x for x in d.get('data', []) if x['attributes'].get('bundleId') == a.bundle_id] if tila == 200 else []
    if not appit:
        virhe('App-tietue puuttuu', tila, d)
    app_id = appit[0]['id']
    tila, d = kutsu('GET', f'/v1/apps/{app_id}/appStoreVersions?filter[platform]=MAC_OS&limit=5')
    if tila != 200:
        virhe('appStoreVersions epaonnistui', tila, d)
    if d.get('data'):
        print(f"macOS-alusta: oli jo ({', '.join(x['attributes'].get('versionString', '?') for x in d['data'])}).")
    else:
        tila, d = kutsu('POST', '/v1/appStoreVersions', {'data': {
            'type': 'appStoreVersions', 'attributes': {'platform': 'MAC_OS', 'versionString': a.versio},
            'relationships': {'app': {'data': {'type': 'apps', 'id': app_id}}}}})
        if tila not in (200, 201):
            virhe('macOS-alustan lisays epaonnistui', tila, d)
        print(f"macOS-alusta: LISÄTTY (versio {a.versio}, {d['data']['id']}).")

    # ── 2) Identiteetit ──────────────────────────────────────────────────
    def nipun_identiteetit(politiikka):
        komento = ['security', 'find-identity', '-v'] + (['-p', politiikka] if politiikka else []) + [nippu]
        out = subprocess.run(komento, capture_output=True, text=True).stdout
        tulos = {}
        for rivi in out.splitlines():
            osat = rivi.strip().split(None, 2)
            if len(osat) == 3 and osat[0].endswith(')') and len(osat[1]) == 40:
                tulos[osat[1].upper()] = osat[2].strip().strip('"')
        return tulos

    def sha1(sisalto_b64):
        return hashlib.sha1(base64.b64decode(sisalto_b64)).hexdigest().upper()

    def tuo(polku, kuvaus):
        t = subprocess.run(['security', 'import', polku, '-k', nippu, '-T', '/usr/bin/codesign',
                            '-T', '/usr/bin/productbuild', '-T', '/usr/bin/security'], capture_output=True, text=True)
        if t.returncode != 0 and 'already exists' not in t.stderr:
            print(f'::error title=security import epaonnistui::{kuvaus}: {t.stderr.strip()}')
            sys.exit(1)

    def tallenna_cer(c):
        polku = f"{tmp}/{c['id']}.cer"
        with open(polku, 'wb') as f:
            f.write(base64.b64decode(c['attributes']['certificateContent']))
        return polku

    def varmista_identiteetti(tyyppi, cn, politiikka):
        tila, d = kutsu('GET', f'/v1/certificates?filter[certificateType]={tyyppi}&limit=200')
        if tila != 200:
            virhe(f'Varmenneluettelo {tyyppi}', tila, d)
        asc = d.get('data', [])
        for c in asc:
            tuo(tallenna_cer(c), f"varmenne {c['id']}")
        kelvot = nipun_identiteetit(politiikka)
        paritetut = [c for c in asc if sha1(c['attributes']['certificateContent']) in kelvot]
        print(f"{tyyppi}: ASC:ssä {len(asc)}, avainnipussa käytettävissä {len(paritetut)}.")
        if paritetut:
            c = paritetut[0]
            s = sha1(c['attributes']['certificateContent'])
            return c['id'], s, kelvot[s]
        print(f'{tyyppi}: ei käytettävää identiteettiä — luodaan avainpari ja varmenne.')
        avainpolku, csrpolku = f'{tmp}/{tyyppi}.key', f'{tmp}/{tyyppi}.csr'
        subprocess.run(['openssl', 'genrsa', '-out', avainpolku, '2048'], check=True, capture_output=True)
        subprocess.run(['openssl', 'req', '-new', '-key', avainpolku, '-out', csrpolku,
                        '-subj', f'/CN={cn}/O={team_id}'], check=True, capture_output=True)
        tuo(avainpolku, f'{tyyppi} yksityinen avain')
        tila, d = kutsu('POST', '/v1/certificates', {'data': {
            'type': 'certificates', 'attributes': {'csrContent': open(csrpolku).read(), 'certificateType': tyyppi}}})
        if tila not in (200, 201):
            virhe(f'Varmenteen luonti {tyyppi}', tila, d)
        uusi = d['data']
        print(f"{tyyppi}: uusi varmenne {uusi['id']} ({uusi['attributes'].get('name')}).")
        tuo(tallenna_cer(uusi), f"uusi varmenne {uusi['id']}")
        s = sha1(uusi['attributes']['certificateContent'])
        kelvot = nipun_identiteetit(politiikka)
        if s not in kelvot:
            print(f"::error title=Identiteetti ei kelpaa::{uusi['id']} tuotiin, mutta find-identity ei hyväksy sitä.")
            sys.exit(1)
        return uusi['id'], s, kelvot[s]

    app_cert, app_sha1, _ = varmista_identiteetti('MAC_APP_DISTRIBUTION', 'Matkakirja Mac App Distribution', 'codesigning')
    _, _, asennin_nimi = varmista_identiteetti('MAC_INSTALLER_DISTRIBUTION', 'Matkakirja Mac Installer Distribution', None)
    t = subprocess.run(['security', 'set-key-partition-list', '-S', 'apple-tool:,apple:,codesign:', '-s',
                        '-k', os.environ['NIPPU_SALASANA'], nippu], capture_output=True, text=True)
    if t.returncode != 0:
        print(f'::error title=set-key-partition-list epaonnistui::{t.stderr.strip()}')
        sys.exit(1)

    # ── 3) MAC_APP_STORE-profiili ────────────────────────────────────────
    tila, d = kutsu('GET', f'/v1/bundleIds?filter[identifier]={a.bundle_id}&limit=20')
    osuma = [b for b in d.get('data', []) if b['attributes'].get('identifier') == a.bundle_id] if tila == 200 else []
    if not osuma:
        virhe('App ID puuttuu', tila, d)
    bundle_res = osuma[0]['id']
    tila, d = kutsu('GET', f'/v1/bundleIds/{bundle_res}/profiles?limit=50')
    if tila != 200:
        virhe('Profiililuettelo', tila, d)
    profiili = None
    for pr in d.get('data', []):
        at = pr['attributes']
        if at.get('profileType') != 'MAC_APP_STORE' or at.get('profileState') != 'ACTIVE':
            continue
        t2, c = kutsu('GET', f"/v1/profiles/{pr['id']}/relationships/certificates")
        if t2 == 200 and any(x['id'] == app_cert for x in c.get('data', [])):
            t3, koko = kutsu('GET', f"/v1/profiles/{pr['id']}")
            if t3 == 200:
                profiili = koko['data']
                break
    if profiili:
        print(f"MAC_APP_STORE-profiili: oli jo ({profiili['attributes'].get('name')}).")
    else:
        nimi = f"Matkakirja Mac App Store {time.strftime('%Y-%m-%d %H%M')}"
        tila, d = kutsu('POST', '/v1/profiles', {'data': {
            'type': 'profiles', 'attributes': {'name': nimi, 'profileType': 'MAC_APP_STORE'},
            'relationships': {'bundleId': {'data': {'type': 'bundleIds', 'id': bundle_res}},
                              'certificates': {'data': [{'type': 'certificates', 'id': app_cert}]}}}})
        if tila not in (200, 201):
            virhe('Profiilin luonti', tila, d)
        profiili = d['data']
        print(f'MAC_APP_STORE-profiili: LUOTU ({nimi}).')
    with open(a.profiili, 'wb') as f:
        f.write(base64.b64decode(profiili['attributes']['profileContent']))
    xml = subprocess.run(['security', 'cms', '-D', '-i', a.profiili], capture_output=True).stdout
    tiedot = plistlib.loads(xml)
    profiilin_team = (tiedot.get('TeamIdentifier') or [team_id])[0]

    with open(os.environ['GITHUB_ENV'], 'a') as f:
        f.write(f'MAC_APP_SHA1={app_sha1}\n')
        f.write(f'MAC_ASENNIN_NIMI={asennin_nimi}\n')
        f.write(f'MAC_PROFIILI={a.profiili}\n')
        f.write(f'TEAM_ID_PROFIILISTA={profiilin_team}\n')
    print(f"Valmis: allekirjoitus {app_sha1}, asennin '{asennin_nimi}', profiili {tiedot.get('Name')} "
          f"(vanhenee {tiedot.get('ExpirationDate')}).")


if __name__ == '__main__':
    main()
