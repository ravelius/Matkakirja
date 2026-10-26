#!/usr/bin/env python3
"""Ulkoinen TestFlight-ryhmä (apurahan arvioijien julkinen linkki).

Omistaja 30.9.2026: ulkoisen ryhmän pitää saada AINA uusin PASS-build
(korvaa 23.9.:n säännön "vain omistajan kortilla"). Omistaja 11.10.2026: raadille
oma ryhmä "Beta-testaajat" omalla linkillä, sama build kaikille julkisen linkin
ryhmille (--ryhma tyhjä = kaikki ne; --luo-ryhma luo uuden ryhmän).

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

--vain-arvio (omistaja 14.10.2026: ulkoiset testaajat saavat junan nopeammin):
vaatii --buildin; odottaa käsittelyn ja lähettää buildin beta-arvioon heti, mutta
EI liitä sitä mihinkään ryhmään eikä vanhenna/irrota mitään (muut liput ohitetaan).
Myöhempi normaali ajo samalla buildilla liittää ryhmiin ja toteaa arvion olevan jo
olemassa. Tulostaa rivin "ARVIO LÄHETETTY <build> (<tila>)" tai "ARVIO JO <tila> <build>".

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
    p.add_argument('--ryhma', default='', help='ulkoisten ryhmien nimet pilkuin (tyhjä = kaikki julkisen linkin ryhmät)')
    p.add_argument('--luo-ryhma', default='', help='luo ulkoinen ryhmä julkisella linkillä (raja 100), ellei ole')
    p.add_argument('--odota-min', type=int, default=45)
    p.add_argument('--alusta', default='IOS', help='IOS tai MAC_OS: sama build-numero voi olla molemmilla (oletus IOS)')
    p.add_argument('--vanhenna', default='', help='pilkuin erotetut CFBundleVersionit, jotka vanhennetaan ensin')
    p.add_argument('--poista', default='', help='pilkuin erotetut CFBundleVersionit, jotka irrotetaan ulkoisesta ryhmästä (sisäisille jäävät)')
    p.add_argument('--vanhenna-vanhemmat', default='', help='CFBundleVersion N: vanhenna KAIKKI N:ää vanhemmat buildit (iOS + Mac)')
    p.add_argument('--vain-arvio', action='store_true',
                   help='lähetä --build vain beta-arvioon: ei ryhmäliitosta, ei vanhennuksia eikä irrotuksia')
    a = p.parse_args()
    if a.vain_arvio and not a.build.strip():
        virhe('Build puuttuu', '--vain-arvio vaatii --build <CFBundleVersion>.')

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

    def odota_build():
        """Odottaa, että --build on käsitelty (VALID); palauttaa buildin id:n."""
        raja = time.time() + a.odota_min * 60
        while True:
            tila, d = kutsu('GET', f'/v1/builds?filter[app]={app_id}&filter[version]={a.build}&limit=5'
                             f'&filter[preReleaseVersion.platform]={a.alusta}')
            if tila != 200:
                virhe('Buildia ei saatu', f'{tila}: {d}')
            build = d['data'][0] if d.get('data') else None
            tilanne = build['attributes'].get('processingState') if build else 'ei vielä näkyvissä'
            if tilanne == 'VALID':
                return build['id']
            if tilanne in ('FAILED', 'INVALID'):
                virhe('Apple hylkäsi buildin', f'{a.build}: {tilanne}')
            if time.time() > raja:
                virhe('Käsittely kesti liian kauan', f'{a.build}: {tilanne}')
            print(f'Build {a.build}: {tilanne} — odotetaan 60 s')
            time.sleep(60)

    def arvion_tila(build_id):
        """Olemassa olevan beta-arvion tila tai None. Ensin submission; jos sitä ei näy, buildBetaDetailin
        externalBuildState (Apple voi hyväksyä saman version myöhemmät buildit ilman omaa submissionia)."""
        tila, d = kutsu('GET', f'/v1/builds/{build_id}/betaAppReviewSubmission')
        olemassa = d.get('data') if tila == 200 and isinstance(d, dict) else None
        if olemassa:
            return olemassa['attributes'].get('betaReviewState') or 'olemassa'
        tila, d = kutsu('GET', f'/v1/builds/{build_id}/buildBetaDetail')
        ulk = (d.get('data') or {}).get('attributes', {}).get('externalBuildState') if tila == 200 else None
        if ulk in ('WAITING_FOR_BETA_REVIEW', 'IN_BETA_REVIEW', 'BETA_APPROVED', 'READY_FOR_BETA_TESTING',
                   'IN_BETA_TESTING', 'BETA_REJECTED'):
            return ulk
        return None

    def laheta_arvio(build_id):
        """Idempotentti: jo lähetetty/hyväksytty arvio ei ole virhe (ei toista POSTia)."""
        jo = arvion_tila(build_id)
        if jo:
            kirjaa(f'ARVIO JO {jo} {a.build}')
            return
        tila, d = kutsu('POST', '/v1/betaAppReviewSubmissions', {'data': {
            'type': 'betaAppReviewSubmissions',
            'relationships': {'build': {'data': {'type': 'builds', 'id': build_id}}}}})
        if tila in (200, 201):
            kirjaa(f"ARVIO LÄHETETTY {a.build} ({d.get('data', {}).get('attributes', {}).get('betaReviewState')})")
            return
        # Kilpaileva ajo tai Applen oma lähetys ehti väliin (esim. 409): tarkistetaan tila uudelleen ennen virhettä.
        jo = arvion_tila(build_id)
        if jo:
            kirjaa(f'ARVIO JO {jo} {a.build} (lähetys vastasi {tila})')
            return
        virhe('Beta-arvioon lähetys epäonnistui', f'{tila}: {d}')

    tila, d = kutsu('GET', f'/v1/apps?filter[bundleId]={a.bundle_id}')
    if tila != 200 or not d.get('data'):
        virhe('Appia ei löydy', f'{a.bundle_id}: {tila}')
    app_id = d['data'][0]['id']

    # VAIN ARVIO (omistaja 14.10.2026): arvio käyntiin heti, ryhmäliitos myöhemmin normaalilla ajolla.
    # Ei ryhmien tilaa, luontia, liitosta, vanhennusta eikä irrotusta.
    if a.vain_arvio:
        ohitetut = [n for n, v in (('--ryhma', a.ryhma), ('--luo-ryhma', a.luo_ryhma), ('--vanhenna', a.vanhenna),
                                   ('--poista', a.poista), ('--vanhenna-vanhemmat', a.vanhenna_vanhemmat)) if v.strip()]
        if ohitetut:
            print(f"::warning::--vain-arvio: ohitetaan {', '.join(ohitetut)}")
        kirjaa(f'## Beta-arvio (vain arvio, ei ryhmäliitosta): build {a.build} ({a.alusta})')
        laheta_arvio(odota_build())
        return

    tila, d = kutsu('GET', f'/v1/apps/{app_id}/betaGroups?limit=50')
    if tila != 200:
        virhe('Testiryhmiä ei saatu', f'{tila}: {d}')
    ulkoiset = [g for g in d.get('data', []) if not g['attributes'].get('isInternalGroup')]
    if not ulkoiset:
        if not a.luo_ryhma:
            virhe('Ulkoista testiryhmää ei ole', 'Luo ulkoinen ryhmä: --luo-ryhma <nimi>.')

    # UUSI RYHMÄ (omistaja 11.10.2026 09.5x: "oma linkki testaajille, mutta sama versio kummallekin"): --luo-ryhma luo
    # ulkoisen ryhmän julkisella linkillä (raja 100) ja liittää siihen samat voimassa olevat buildit kuin julkisen linkin
    # ryhmissä on, jotta molemmissa on sama versio heti. Olemassa olevaa samannimistä ryhmää ei luoda uudelleen.
    if a.luo_ryhma and not any(g['attributes'].get('name') == a.luo_ryhma for g in ulkoiset):
        tila, d = kutsu('POST', '/v1/betaGroups', {'data': {
            'type': 'betaGroups',
            'attributes': {'name': a.luo_ryhma, 'publicLinkEnabled': True, 'publicLinkLimitEnabled': True,
                           'publicLinkLimit': 100, 'feedbackEnabled': True},
            'relationships': {'app': {'data': {'type': 'apps', 'id': app_id}}}}})
        if tila not in (200, 201):
            virhe('Ryhmän luonti epäonnistui', f'{a.luo_ryhma}: {tila}: {d}')
        uusi = d['data']
        kirjaa(f"Ryhmä {a.luo_ryhma} luotu: julkinen linkki {uusi['attributes'].get('publicLink')}, raja 100.")
        lahteet = [g for g in ulkoiset if g['attributes'].get('publicLinkEnabled')]
        liitettavat = set()
        for g in lahteet:
            tila, r = kutsu('GET', f"/v1/betaGroups/{g['id']}/builds?limit=200&fields[builds]=version,expired")
            liitettavat |= {b['id'] for b in r.get('data', []) if not b['attributes'].get('expired')} if tila == 200 else set()
        if liitettavat:
            tila, r = kutsu('POST', f"/v1/betaGroups/{uusi['id']}/relationships/builds",
                            {'data': [{'type': 'builds', 'id': i} for i in sorted(liitettavat)]})
            if tila not in (200, 204):
                virhe('Buildien liitos uuteen ryhmään epäonnistui', f'{tila}: {r}')
            kirjaa(f'Uuteen ryhmään liitetty {len(liitettavat)} voimassa olevaa buildia (sama versio kuin muissa).')
        ulkoiset.append(uusi)

    kirjaa('## Ulkoiset TestFlight-ryhmät')
    for g in ulkoiset:
        at = g['attributes']
        tila, t = kutsu('GET', f"/v1/betaGroups/{g['id']}/betaTesters?limit=1")
        maara = t.get('meta', {}).get('paging', {}).get('total', '?') if tila == 200 else f'? ({tila})'
        raja = at.get('publicLinkLimit') if at.get('publicLinkLimitEnabled') else 'ei rajaa'
        kirjaa(f"- **{at.get('name')}**: julkinen linkki {'päällä' if at.get('publicLinkEnabled') else 'pois'}"
               f" ({at.get('publicLink') or '–'}), raja {raja} (max 100), testaajia {maara}")

    # KOHDERYHMÄT (omistaja 11.10.2026: Arvioijat + Beta-testaajat saavat saman buildin): --ryhma pilkuin erotettuina;
    # tyhjä = kaikki ulkoiset ryhmät, joilla julkinen linkki on päällä (tai ainoa ulkoinen ryhmä).
    if a.ryhma:
        nimet = [x.strip() for x in a.ryhma.split(',') if x.strip()]
        ryhmat = [g for g in ulkoiset if g['attributes'].get('name') in nimet]
        puuttuu = set(nimet) - {g['attributes'].get('name') for g in ryhmat}
        if puuttuu:
            virhe('Ryhmää ei löydy', ', '.join(sorted(puuttuu)))
    elif len(ulkoiset) == 1:
        ryhmat = ulkoiset
    else:
        ryhmat = [g for g in ulkoiset if g['attributes'].get('publicLinkEnabled')]
        if not ryhmat:
            virhe('Ryhmä epäselvä', 'Useita ulkoisia ryhmiä ilman julkista linkkiä; anna --ryhma.')
    kirjaa(f"Kohderyhmät: {', '.join(g['attributes'].get('name') for g in ryhmat)}")

    for ryhma in ryhmat:
        ryhma_id = ryhma['id']
        nimi = ryhma['attributes'].get('name')
        tila, d = kutsu('GET', f'/v1/betaGroups/{ryhma_id}/builds?limit=5&fields[builds]=version,uploadedDate,expired,processingState')
        if tila == 200:
            buildit = sorted(d.get('data', []), key=lambda b: b['attributes'].get('uploadedDate') or '', reverse=True)
            if buildit:
                kirjaa(f'{nimi}: uusimmat buildit:')
                for b in buildit[:3]:
                    bat = b['attributes']
                    vanha = ' (vanhentunut)' if bat.get('expired') else ''
                    kirjaa(f"  - {bat.get('version')} ladattu {bat.get('uploadedDate')}{vanha}")
            else:
                kirjaa(f'{nimi}: ryhmässä ei ole buildeja.')
        else:
            kirjaa(f'::warning::{nimi}: ryhmän buildeja ei saatu: {tila}')

        # betaTesterUsages vaatii groupBy=betaTesters (ilman sitä 400, ajo 36689621711).
        for mittari, kysely in (('publicLinkUsages', ''), ('betaTesterUsages', '?groupBy=betaTesters&period=P365D')):
            tila, d = kutsu('GET', f'/v1/betaGroups/{ryhma_id}/metrics/{mittari}{kysely}')
            if tila != 200:
                syy = '; '.join(e.get('detail') or e.get('title', '') for e in d.get('errors', [])) if isinstance(d, dict) else ''
                kirjaa(f'- {nimi} {mittari}: ei saatu ({tila}) {syy[:200]}')
                continue
            yhteensa = {}
            for sarja in d.get('data', []):
                for piste in sarja.get('dataPoints', []):
                    for k, v in (piste.get('values') or {}).items():
                        if isinstance(v, (int, float)):
                            yhteensa[k] = yhteensa.get(k, 0) + v
            kirjaa(f"- {nimi} {mittari}: {', '.join(f'{k} {v}' for k, v in sorted(yhteensa.items())) or 'ei käyttöä'}")

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

    # VAIN UUSIN LADATTAVISSA (omistaja 11.10.2026 klo 22.2x PT:n kautta: "TestFlightista saa ladata vain uusimman version"):
    # --vanhenna-vanhemmat N vanhentaa kaikki voimassa olevat buildit, joiden CFBundleVersion < N, molemmilla alustoilla.
    # Ajetaan, kun N on hyväksytty beta-arviossa ja jaettu ulkoisille ryhmille. Ei paluuta vanhaan (korjataan uudella buildilla).
    if a.vanhenna_vanhemmat.strip():
        raja = int(a.vanhenna_vanhemmat.strip())
        polku, vanhennetut, virheet = f'/v1/builds?filter[app]={app_id}&filter[expired]=false&limit=200&fields[builds]=version,expired', [], []
        while polku:
            tila, d = kutsu('GET', polku)
            if tila != 200:
                virhe('Buildien haku epäonnistui', f'{tila}: {d}')
            for b in d.get('data', []):
                try:
                    nro = int(b['attributes'].get('version'))
                except (TypeError, ValueError):
                    continue
                if nro >= raja or b['attributes'].get('expired'):
                    continue
                t, r = kutsu('PATCH', f"/v1/builds/{b['id']}", {'data': {
                    'type': 'builds', 'id': b['id'], 'attributes': {'expired': True}}})
                (vanhennetut if t == 200 else virheet).append(f"{nro}" if t == 200 else f"{nro}: {t}")
            seuraava = d.get('links', {}).get('next')
            polku = seuraava.replace('https://api.appstoreconnect.apple.com', '') if seuraava else None
        kirjaa(f'Vanhennettu {len(vanhennetut)} {raja}:ää vanhempaa buildia (iOS + Mac): {", ".join(sorted(vanhennetut, key=int)) or "ei yhtään"}.')
        if virheet:
            virhe('Osa vanhennuksista epäonnistui', '; '.join(virheet)[:900])

    # Irrotus ulkoisista kohderyhmistä (Päätoimittaja 7.10.2026: TF 162 vikainen, jää vain sisäisille).
    for pb in [x.strip() for x in a.poista.split(',') if x.strip()]:
        tila, d = kutsu('GET', f'/v1/builds?filter[app]={app_id}&filter[version]={pb}&limit=5')
        kaikki_osumat = d.get('data', []) if tila == 200 else []
        for ryhma in ryhmat:
            ryhma_id, nimi = ryhma['id'], ryhma['attributes'].get('name')
            # Sama CFBundleVersion voi olla iOS- ja macOS-buildilla (TF 162: 2 osumaa) → vain ryhmään liitetyt.
            tila_r, r = kutsu('GET', f'/v1/betaGroups/{ryhma_id}/relationships/builds?limit=200')
            ryhmassa = {x['id'] for x in r.get('data', [])} if tila_r == 200 else set()
            loydetyt = [b for b in kaikki_osumat if b['id'] in ryhmassa]
            if not loydetyt:
                kirjaa(f'Build {pb}: ei ryhmässä {nimi}, ei irrotettavaa.')
                continue
            tila, d = kutsu('DELETE', f'/v1/betaGroups/{ryhma_id}/relationships/builds',
                            {'data': [{'type': 'builds', 'id': b['id']} for b in loydetyt]})
            if tila not in (200, 204):
                virhe('Irrotus ulkoisesta ryhmästä epäonnistui', f'{pb} {nimi}: {tila}: {d}')
            kirjaa(f'Build {pb}: irrotettu ryhmästä {nimi}.')

    if not a.build:
        return

    build_id = odota_build()

    for ryhma in ryhmat:
        tila, d = kutsu('POST', f"/v1/betaGroups/{ryhma['id']}/relationships/builds",
                        {'data': [{'type': 'builds', 'id': build_id}]})
        if tila not in (200, 204):
            virhe('Buildin liitos ulkoiseen ryhmään epäonnistui', f"{ryhma['attributes'].get('name')}: {tila}: {d}")
        kirjaa(f"Build {a.build} liitetty ryhmään {ryhma['attributes'].get('name')}.")

    # Beta-arvio on buildikohtainen: yksi lähetys kattaa kaikki ulkoiset ryhmät. Jos --vain-arvio-ajo on jo
    # lähettänyt sen (tai Apple hyväksynyt), laheta_arvio toteaa tilan eikä lähetä uudelleen.
    laheta_arvio(build_id)


if __name__ == '__main__':
    main()
