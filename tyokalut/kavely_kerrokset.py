# Avaruuskävelyn Codex-kerrokset peliin (Linssiseppä 2, 29.9.2026; ~/Documents/Codex/2026-09-29/avaruuskavely-kerrokset):
# peittävien kerrosten alfa ≥ 240 → 255 (Codexin "läpinäkymätön" 240–254 päästää maan läpi), kerrokset rajataan sisältönsä
# kokoisiksi (koko kangas veisi muistia turhaan) ja rajaukset kirjoitetaan C#-tauluun KavelyKerrokset.Rajaukset.cs.
# Käyttö: python3 tyokalut/kavely_kerrokset.py <codex-kansio>
import sys, os, json
from PIL import Image
D = sys.argv[1]
K = 'Assets/Matkakirja/UI/Resources/KavelyKerrokset'
LAPIKUULTAVAT = ('valo-', 'visiiri')
m = json.load(open(f'{D}/manifest.json'))
rivit = []
for v in ['iphone', 'ipad']:
    os.makedirs(f'{K}/{v}', exist_ok=True)
    for f in sorted(os.listdir(f'{D}/final/{v}')):
        if not f.endswith('.png'): continue
        n = f[:-4]
        im = Image.open(f'{D}/final/{v}/{f}').convert('RGBA')
        if not n.startswith(LAPIKUULTAVAT):
            r, g, b, a = im.split()
            im = Image.merge('RGBA', (r, g, b, a.point(lambda x: 255 if x >= 240 else x)))
        bb = (0, 0) + im.size if n == 'vertailukortti' else im.getchannel('A').getbbox()
        im.crop(bb).save(f'{K}/{v}/{n}.png', optimize=True)
        rivit.append(f'            {{ "{v}/{n}", new RectInt({bb[0]}, {bb[1]}, {bb[2] - bb[0]}, {bb[3] - bb[1]}) }},')
        print(v, n, bb)
ulko = {x['variant']: x for x in m['variants']}
lukko = {x['variant']: x for x in m['airlock_variants']}
def P(p): return f'new Vector2({p[0]}, {p[1]})'
def R(b): return f'Rect.MinMaxRect({b[0]}, {b[1]}, {b[2]}, {b[3]})'
vv = []
for v in ['iphone', 'ipad']:
    u, l = ulko[v], lukko[v]
    vv.append(f'            {{ "{v}", new Variantti {{ Kangas = {P(u["canvas"])}, Karabiini = {P(u["karabiini_piste"])}, '
              f'KoysiAnkkuri = {P(u["koysi_ankkuri"])}, Vapaa = {R(u["vapaa_alue_bounds"])}, HorisonttiY = {u["horisontti_y"]}, '
              f'Sarana = {P(l["luukku_sarana"])}, Aukko = {R(l["aukko_bounds"])}, LuukunKulma = {l["luukku_avautumiskulma"]["degrees"]} }} }},')
c = m['comparison_card']
open('Assets/Matkakirja/UI/Linssit/KavelyKerrokset.Rajaukset.cs', 'w').write(f'''// GENEROITU tyokalut/kavely_kerrokset.py (Codexin manifest.json {m["order"].split(" at ")[-1][:8]}): älä muokkaa käsin.
using System.Collections.Generic;
using UnityEngine;

namespace Matkakirja.Natiivi
{{
    public static partial class KavelyKerrokset
    {{
        /// <summary>Kerroksen rajaus kankaalla (px, y alas): tiedosto on rajattu tähän.</summary>
        public static readonly Dictionary<string, RectInt> Rajaukset = new Dictionary<string, RectInt>
        {{
{chr(10).join(rivit)}
        }};

        public static readonly Dictionary<string, Variantti> Variantit = new Dictionary<string, Variantti>
        {{
{chr(10).join(vv)}
        }};

        /// <summary>Vertailukortin alueet (1600 × 1000): kuvat vasen/oikea, tekstit vasen/oikea ja sulku.</summary>
        public static readonly Rect KuvaVasen = {R(c["kuva_vasen_bounds"])}, KuvaOikea = {R(c["kuva_oikea_bounds"])},
            TekstiVasen = {R(c["teksti_vasen_bounds"])}, TekstiOikea = {R(c["teksti_oikea_bounds"])}, Sulku = {R(c["sulku_bounds"])};
        public static readonly Vector2 KortinKangas = {P(c["canvas"])};
    }}
}}
''')
