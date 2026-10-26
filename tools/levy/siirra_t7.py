"""Siirtää yli 12 h koskemattomat kansiot T7:lle ja jättää linkin vanhaan paikkaan.
Omistajan kortti KK:ssa 19.10.2026 klo 18.5x: "Kyllä, nyt ja joka yö (Suositus)".
Käyttö: python3 -I siirra_t7.py --koe | --aja
Ei koske linkkeihin (rmtree ei koskaan linkin läpi), muiden käyttäjien kansioihin, venveihin,
käännöspalveluun, työkaluihin eikä Unity-projekteihin. Appikopiot siirretään ilman linkkiä."""
import os, sys, json, time, shutil, subprocess

TAALLA = '/Users/Shared/Claude/_levy'; os.makedirs(TAALLA, exist_ok=True)
KARTOITUS = '/Users/Shared/Claude/_levy/ika_kartoitus.json'
T7 = '/Volumes/T7 4TB/koodaus'
P = '/Users/Shared/Claude/proto-3d'
RAJA_S = 12 * 3600
BOTTI_RAJA_S = 2 * 3600          # linnan botin ajot (linna tauolla 17.05): koskematon 2 h
MIN_TAVUT = 5 * 2**20            # alle 5 Mt jää paikalleen
EI_KOSKAAN = ('venv-', 'kaannospalvelu', '/tyokalut', 'Matkakirja-proto', 'natiiviseppa-tyokalut',
              'SIIRRETTY.txt', 'ALA-POISTA', '.DS_Store')
APP_MERKIT = ('-app', 'app-', 'juna-', '-mac-tf-', '.app')
nyt = time.time()


def kohde(polku, ryhma):
    if ryhma == 'lokit':
        return T7 + '/proto-lokit-arkisto/' + os.path.basename(polku)
    if ryhma in ('tyo', 'valmiit'):
        return T7 + '/proto-arkisto/' + os.path.relpath(polku, P)
    return T7 + '/arkisto-checkoutit/' + os.path.basename(polku)


def muuttunut(polku, raja_s):
    raja = nyt - raja_s
    if os.lstat(polku).st_mtime > raja:
        return True
    if os.path.isdir(polku):
        for juuri, kansiot, tiedostot in os.walk(polku):
            if '/.git' in juuri:
                continue
            for n in tiedostot + kansiot:
                if n in ('.DS_Store', '.git'):
                    continue
                try:
                    if os.lstat(os.path.join(juuri, n)).st_mtime > raja:
                        return True
                except OSError:
                    pass
    return False


def laske(polku):
    if not os.path.isdir(polku):
        return 1, os.lstat(polku).st_size
    n, koko = 0, 0
    for juuri, kansiot, tiedostot in os.walk(polku):
        for t in tiedostot:
            st = os.lstat(os.path.join(juuri, t))
            n += 1
            koko += st.st_size
    return n, koko


def valitse():
    for x in json.load(open(KARTOITUS)):
        p, r, botti = x['polku'], x['ryhma'], 'botti-pelaa' in x['polku']
        if x['linkki'] or any(e in p for e in EI_KOSKAAN) or x['gt'] * 2**30 < MIN_TAVUT:
            continue
        if r == 'checkout' and not p.endswith('Matkakirja-mallinseppa'):
            continue
        if not botti and (x['ika_h'] or 0) <= RAJA_S / 3600:
            continue
        yield p, r, botti


def main(aja):
    tulos, yht = [], 0
    for p, r, botti in valitse():
        rivi = {'polku': p, 'kohde': kohde(p, r)}
        try:
            if not os.path.lexists(p) or os.path.islink(p):
                rivi['tila'] = 'OHITETTU: ei olemassa tai linkki'
            elif os.lstat(p).st_uid != os.getuid():
                rivi['tila'] = 'OHITETTU: toisen käyttäjän'
            elif muuttunut(p, BOTTI_RAJA_S if botti else RAJA_S):
                rivi['tila'] = 'OHITETTU: muuttunut äskettäin'
            elif os.path.lexists(rivi['kohde']):
                rivi['tila'] = 'OHITETTU: kohde jo T7:llä'
            else:
                n, koko = laske(p)
                rivi['gt'] = round(koko / 2**30, 3)
                if not aja:
                    rivi['tila'] = 'SIIRRETTÄISIIN'
                else:
                    os.makedirs(os.path.dirname(rivi['kohde']), exist_ok=True)
                    subprocess.run(['ditto', p, rivi['kohde']], check=True)
                    if laske(rivi['kohde']) != (n, koko):
                        rivi['tila'] = 'EPÄONNISTUI: kopio ei täsmää, lähde jäi'
                    else:
                        if os.path.isdir(p):
                            shutil.rmtree(p)
                        else:
                            os.unlink(p)
                        app = any(m in os.path.basename(p) for m in APP_MERKIT)
                        if not app:
                            os.symlink(rivi['kohde'], p)
                        rivi['tila'] = 'SIIRRETTY' + (' (appikopio, ei linkkiä)' if app else ' + linkki')
                if rivi['tila'].startswith('SIIRR'):
                    yht += koko
        except Exception as e:
            rivi['tila'] = 'EPÄONNISTUI: ' + repr(e)[:200]
        tulos.append(rivi)
        if aja:
            print(rivi['tila'], rivi.get('gt', ''), p, flush=True)
    nimi = 'tulos-' + ('aja' if aja else 'koe') + time.strftime('-%Y%m%d-%H%M') + '.json'
    json.dump(tulos, open(os.path.join(TAALLA, nimi), 'w'), ensure_ascii=False, indent=1)
    if aja:
        for kansio in (P + '/lokit', P + '/_tyo', P + '/_valmiit'):
            rivit = [t for t in tulos if t['tila'].startswith('SIIRRETTY') and t['polku'].startswith(kansio + '/')]
            if rivit:
                with open(kansio + '/SIIRRETTY.txt', 'a') as f:
                    for t in rivit:
                        f.write(os.path.relpath(t['polku'], kansio) + ' → ' + t['kohde'] + '\n')
    laskuri = {}
    for t in tulos:
        k = t['tila'].split(':')[0]
        laskuri[k] = laskuri.get(k, 0) + 1
    print('YHTEENVETO', laskuri, 'yhteensä %.1f G' % (yht / 2**30), nimi)


if __name__ == '__main__':
    if sys.argv[1:] not in (['--koe'], ['--aja']):
        sys.exit('käyttö: --koe | --aja')
    main(sys.argv[1] == '--aja')
