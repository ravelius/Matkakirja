#!/usr/bin/env python3
"""Päätoimittajan luettava keskustelu omistajalle ennen omaa nollausta (omistaja 7.10.2026; Raamattu FABLEN OMA NOLLAUS 9.10.2026).

Käyttö: python3 tools/tallenna-keskustelu.py [session-uuid, oletus uusin .jsonl] [otsikon kuka, oletus Päätoimittaja]
Kirjoittaa /Users/Shared/Claude/keskustelut/<Kuka>-<pvm>-klo-<alku>-<loppu>.md (Talon tilan Keskustelut-kortti
näyttää kolme uusinta). Mukana: omistajan viestit, kortit vastauksineen ja omat vastaukset. Pois: roolien
viestit, työkalujen tulosteet ja järjestelmän muistutukset.
"""
import glob
import json
import os
import sys
from datetime import datetime
from zoneinfo import ZoneInfo

PROJEKTI = '/Users/koodaus/.claude/projects/-Users-Shared-Claude-Matkakirja-fable'
KANSIO = '/Users/Shared/Claude/keskustelut'
HELSINKI = ZoneInfo('Europe/Helsinki')


def aika(ts):
    try:
        return datetime.fromisoformat(ts.replace('Z', '+00:00')).astimezone(HELSINKI)
    except Exception:
        return None


def tekstit(sisalto):
    if isinstance(sisalto, str):
        return [sisalto], 0
    osat, kuvat = [], 0
    for b in sisalto or []:
        if b.get('type') == 'text':
            osat.append(b['text'])
        elif b.get('type') == 'image':
            kuvat += 1
    return osat, kuvat


def omistajan(teksti):
    t = teksti.lstrip()
    return t and not (t.startswith('<') or t.startswith('Another Claude session') or t.startswith('Base directory for this skill'))


def main():
    if len(sys.argv) > 1 and sys.argv[1]:
        sid = sys.argv[1]
    else:
        sid = os.path.basename(max(glob.glob(f'{PROJEKTI}/*.jsonl'), key=os.path.getmtime))[:-len('.jsonl')]
    kuka = sys.argv[2] if len(sys.argv) > 2 else 'Päätoimittaja'
    rivit, kortit = [], {}
    for rivi in open(f'{PROJEKTI}/{sid}.jsonl', encoding='utf-8'):
        try:
            d = json.loads(rivi)
        except ValueError:
            continue
        hetki = aika(d.get('timestamp', ''))
        if hetki is None:
            continue
        if d.get('type') == 'attachment' and (d.get('attachment') or {}).get('type') == 'queued_command':
            osat, kuvat = tekstit(d['attachment'].get('prompt'))
            teksti = '\n\n'.join(o for o in osat if omistajan(o))
            if teksti or kuvat:
                rivit.append((hetki, 'Omistaja', teksti + (f'\n\n*(liitteenä {kuvat} kuva)*' if kuvat else '')))
        elif d.get('type') == 'user' and not d.get('isMeta'):
            sisalto = (d.get('message') or {}).get('content')
            if isinstance(sisalto, list):
                for b in sisalto:
                    if b.get('type') == 'tool_result' and b.get('tool_use_id') in kortit:
                        vastaus = b.get('content')
                        vastaus = vastaus if isinstance(vastaus, str) else ' '.join(x.get('text', '') for x in vastaus or [])
                        rivit.append((hetki, 'Omistajan vastaus korttiin', vastaus.strip()))
            osat, kuvat = tekstit(sisalto)
            teksti = '\n\n'.join(o for o in osat if omistajan(o))
            if teksti:
                rivit.append((hetki, 'Omistaja', teksti))
        elif d.get('type') == 'assistant':
            for b in (d.get('message') or {}).get('content') or []:
                if b.get('type') == 'text' and b['text'].strip():
                    rivit.append((hetki, kuka, b['text'].strip()))
                elif b.get('type') == 'tool_use' and b.get('name') == 'AskUserQuestion':
                    kortit[b.get('id')] = True
                    kysymykset = (b.get('input') or {}).get('questions') or []
                    kuvaus = '\n'.join(f"- {k.get('question')} ({' / '.join(o.get('label', '') for o in k.get('options', []))})" for k in kysymykset)
                    rivit.append((hetki, f'{kuka}, kortti', kuvaus))
    if not rivit:
        sys.exit('Ei viestejä.')
    alku, loppu = rivit[0][0], rivit[-1][0]
    nimi = f"{kuka.replace('ä', 'a').replace('ö', 'o').replace(' ', '-')}-{alku:%Y-%m-%d}-klo-{alku:%H%M}-{loppu:%H%M}.md"
    otsikko = f'# {kuka}n keskustelu {alku.day}.{alku.month}.{alku.year} klo {alku:%H.%M}–{loppu:%H.%M}\n\n'
    selite = '*Omistajan viestit, kortit vastauksineen ja vastaukset (roolien väliset viestit ja työkalujen tulosteet jätetty pois).*\n\n'
    runko = ''.join(f'**{k} ({h:%H.%M}):**\n\n{t}\n\n' for h, k, t in rivit)
    with open(f'{KANSIO}/{nimi}', 'w', encoding='utf-8') as ulos:
        ulos.write(otsikko + selite + runko)
    print(f'{KANSIO}/{nimi}')


if __name__ == '__main__':
    main()
