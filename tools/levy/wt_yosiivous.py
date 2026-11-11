#!/usr/bin/env python3
"""PT:n yöajo: poistaa /Users/Shared/Claude/wt/-työkopiot, joiden PR on yhdistetty tai suljettu.

Raamattu 12.19 (omistaja 11.11.2026 klo 23.34, KK 23.40). Ehdot jokaiselle kopiolle:
- se on git-worktree (ei päächeckout) ja sen haaralla on GitHubissa PR, jonka tila on MERGED tai CLOSED;
- puu on puhdas (git status --porcelain tyhjä) eikä haaralla ole pushaamattomia committeja;
- poisto tehdään `git worktree remove` ilman --force-lippua (git itse kieltäytyy, jos jotain on kesken).
Ilman --aja tulostaa vain listan. Haaroja ei poisteta.
"""
import argparse, json, os, subprocess, sys, time

WT = '/Users/Shared/Claude/wt'


def git(cwd, *a):
    r = subprocess.run(['git', '-C', cwd, *a], capture_output=True, text=True)
    return r.returncode, r.stdout.strip(), r.stderr.strip()


def pr_tila(cwd, haara):
    r = subprocess.run(['gh', 'pr', 'list', '--head', haara, '--state', 'all', '--json', 'state,number',
                        '--limit', '5'], cwd=cwd, capture_output=True, text=True)
    if r.returncode != 0:
        return None, None
    lista = json.loads(r.stdout or '[]')
    if not lista:
        return None, None
    tilat = {p['state'] for p in lista}
    if 'OPEN' in tilat:
        return 'OPEN', lista[0]['number']
    return lista[0]['state'], lista[0]['number']


def koko_mt(polku):
    r = subprocess.run(['du', '-sm', polku], capture_output=True, text=True)
    try:
        return int(r.stdout.split()[0])
    except Exception:
        return 0


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--aja', action='store_true')
    ap.add_argument('--kansio', default=WT)
    a = ap.parse_args()
    poistettu = 0
    for nimi in sorted(os.listdir(a.kansio)):
        p = os.path.join(a.kansio, nimi)
        if not os.path.isdir(p) or not os.path.isfile(os.path.join(p, '.git')):
            continue  # päächeckoutit (.git-kansio) ja tavalliset tiedostot jäävät
        rc, haara, _ = git(p, 'rev-parse', '--abbrev-ref', 'HEAD')
        if rc != 0 or haara == 'HEAD':
            print(f'JÄÄ {nimi}: ei haaraa'); continue
        _, st, _ = git(p, 'status', '--porcelain')
        if st:
            print(f'JÄÄ {nimi}: puu ei puhdas'); continue
        rc, ahead, _ = git(p, 'rev-list', '--count', '@{u}..HEAD')
        pushattu = rc == 0 and ahead == '0'
        # Yhdistetty oletushaaraan ilman PR:ää (proto-3d:n paikalliset yhdistämiset) = sama kuin yhdistetty PR.
        rc2, _, _ = git(p, 'merge-base', '--is-ancestor', 'HEAD', 'origin/main')
        if rc2 == 0:
            tila, nro = 'MERGED', 'main'
        elif not pushattu:
            print(f'JÄÄ {nimi}: pushaamatta tai ei ylävirtaa ({haara})'); continue
        elif 'luovutus' in haara:
            # luovutuskopio: sisältö on originissa; alle 6 h vanha jää (rooli voi vielä lisätä siihen)
            _, ts, _ = git(p, 'log', '-1', '--format=%ct')
            if time.time() - int(ts or 0) < 6 * 3600:
                print(f'JÄÄ {nimi}: tuore luovutus ({haara})'); continue
            tila, nro = 'LUOVUTUS', 'pushattu'
        else:
            tila, nro = pr_tila(p, haara)
        if tila not in ('MERGED', 'CLOSED', 'LUOVUTUS'):
            print(f'JÄÄ {nimi}: PR {tila or "ei"} ({haara})'); continue
        mt = koko_mt(p)
        if not a.aja:
            print(f'POISTUISI {nimi}: PR {nro} {tila}, {mt} Mt'); continue
        _, juuri, _ = git(p, 'rev-parse', '--path-format=absolute', '--git-common-dir')
        rc, _, err = git(os.path.dirname(juuri), 'worktree', 'remove', p)
        if rc == 0:
            poistettu += mt
            print(f'POISTETTU {nimi}: PR {nro} {tila}, {mt} Mt')
        else:
            print(f'JÄÄ {nimi}: git kieltäytyi: {err}')
    print(f'Yhteensä vapautettu {poistettu / 1024:.1f} Gi' if a.aja else 'Kuivaharjoitus (lisää --aja)')


if __name__ == '__main__':
    sys.exit(main())
