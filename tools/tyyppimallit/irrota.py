"""Osien irrotus (KK 15.11. 06.15 kohta 2): Ty* → Osa* osakirjastoon. python3 -I irrota.py <Osat.cs> <Tyyppimallit.cs>"""
import sys, re
OS, TY = sys.argv[1], sys.argv[2]
o = open(OS).read(); t = open(TY).read()

def ota(src, alku_merkki):
    """Leikkaa metodin (doc-kommentti mukaan) tekstistä: alkaa rivistä, jossa alku_merkki, päättyy tasapainoiseen }."""
    i = src.index(alku_merkki); ls = src.rfind('\n', 0, i) + 1
    # doc-kommenttirivit ennen
    while True:
        p = src.rfind('\n', 0, ls - 1) + 1
        if src[p:ls].strip().startswith('///'): ls = p
        else: break
    j = src.index('{', i); d = 0; k = j
    while True:
        if src[k] == '{': d += 1
        elif src[k] == '}':
            d -= 1
            if d == 0: break
        k += 1
    le = src.index('\n', k) + 1
    if src[le:].startswith('\n'): le += 1
    return src[ls:le], src[:ls] + src[le:]

# 1) OsaKupoli: sivuja = 32, k = 9 valinnaisina (oletukset = nykyinen osakirjasto → ikonit tavulleen samat)
o = o.replace('int rivat, float lyhtySade, float huippuY)\n        {\n            const int K = 9;',
              'int rivat, float lyhtySade, float huippuY, int sivuja = 32, int k = 9)\n        {\n            int K = k;', 1)
o = o.replace('r.Pyora(cx, cz, q, 32, kupoli, 0f, tays, 1f, false);', 'r.Pyora(cx, cz, q, sivuja, kupoli, 0f, tays, 1f, false);', 1)
o = o.replace('/// korkeuteen huippuY. Palauttaa kupolin laen korkeuden.</summary>',
              '/// korkeuteen huippuY. Palauttaa kupolin laen korkeuden. sivuja ja k (kehiä) valinnaisia: oletus 32 / 9 (ikonit); tyyppimallit 16 / 7 (kolmioraja).</summary>', 1)
# 2) OsaRumpu: sivuja = 32
a0 = o.index('static void OsaRumpu('); a1 = o.index('\n        }\n', a0)
rumpu = o[a0:a1]
r2 = rumpu.replace('Vari kivi, Vari varjo, Vari aukko)', 'Vari kivi, Vari varjo, Vari aukko, int sivuja = 32)', 1)
r2 = r2.replace('}, 32, kivi', '}, sivuja, kivi').replace('}, 32, varjo', '}, sivuja, varjo')
assert r2.count('sivuja') == 5, r2.count('sivuja')
o = o[:a0] + r2 + o[a1:]
o = o.replace('/// jolle OsaKupoli asetetaan.</summary>', '/// jolle OsaKupoli asetetaan. sivuja valinnainen: oletus 32 (ikonit), tyyppimallit 16.</summary>', 1)

# 3) Ty-kopiot pois, kutsut osakirjastoon
_, t = ota(t, 'static float TyKupoli(')
_, t = ota(t, 'static void TyRumpu(')
t = t.replace('TyRumpu(', 'OsaRumpu(').replace('TyKupoli(', 'OsaKupoli(')

# 4) Ehdokkaat yhteisiksi osiksi: TyTorni → OsaTorni, TyTukipilarit → OsaTukipilarit, TyKello → OsaKellotaulu (värit parametreina)
torni, t = ota(t, 'static void TyTorni(')
tuki, t = ota(t, 'static void TyTukipilarit(')
kello, t = ota(t, 'static void TyKello(')
torni = torni.replace('static void TyTorni(', 'static void OsaTorni(').replace('Vari kivi, Vari aukko, Vari huippu)', 'Vari kivi, Vari aukko, Vari huippu, Vari tasakatto)', 1)
torni = torni.replace('kivi, TyKatto);', 'kivi, tasakatto);').replace('TORNI (ehdokas OsaTorni)', 'TORNI (tyyppimalleista, irrotettu KK 15.11. 06.15)')
torni = torni.replace('Huippu 0 = tasakatto ja kaide (katedraalin länsitornit).', 'Huippu 0 = tasakatto (väri tasakatto) ja kaide (katedraalin länsitornit).')
tuki = tuki.replace('static void TyTukipilarit(', 'static void OsaTukipilarit(').replace('TUKIPILARIT (ehdokas OsaTukipilari, ', 'TUKIPILARIT (tyyppimalleista, irrotettu KK 15.11. 06.15; ')
kello = kello.replace('static void TyKello(Rakentaja r, Seina s, float uc, float yc, float sade)', 'static void OsaKellotaulu(Rakentaja r, Seina s, float uc, float yc, float sade, Vari taulu, Vari reuna, Vari viisari)')
kello = kello.replace('0.08f, TyTaulu, 12', '0.08f, taulu, 12').replace('0.1f, TyRauta, 12', '0.1f, reuna, 12').replace('TyViisari)', 'viisari)')
kello = kello.replace('KELLOTAULU (ehdokas OsaKellotaulu; ', 'KELLOTAULU (tyyppimalleista, irrotettu KK 15.11. 06.15; ')
assert 'Ty' not in re.sub(r'//.*', '', torni + tuki + kello).replace('TyyppiM', ''), 'Ty-viite jäi'
t = re.sub(r'\bTyTorni\(([^;]*?)TyHuippu\);', r'OsaTorni(\1TyHuippu, TyKatto);', t)
t = t.replace('TyTukipilarit(', 'OsaTukipilarit(')
t = re.sub(r'TyKello\(([^;]*?)\);', r'OsaKellotaulu(\1, TyTaulu, TyRauta, TyViisari);', t)
t = t.replace('(TyTorni sivuja 0)', '(OsaTorni sivuja 0)')
assert 'TyTorni' not in t and 'TyKello' not in t and 'TyRumpu' not in t and 'TyKupoli' not in t
# lisää osakirjaston loppuun
i = o.rstrip().rfind('}'); i = o[:i].rstrip().rfind('}')
o = o[:i].rstrip('\n') + '\n\n' + torni.rstrip('\n') + '\n\n' + tuki.rstrip('\n') + '\n\n' + kello.rstrip('\n') + '\n    }\n}\n'
t = t.replace('// ehdokkaita yhteisiksi osiksi (OsaTorni, OsaHuippu, OsaTukipilari, OsaKellotaulu), jotka irrotetaan vasta luonnosten hyväksynnän jälkeen.',
              '// irrotettu osakirjastoon (OhjelmaKohdeOsat.cs: OsaTorni, OsaTukipilarit, OsaKellotaulu; OsaKupoli/OsaRumpu sivuja-parametri; KK 15.11. 06.15).')
open(OS, 'w').write(o); open(TY, 'w').write(t)
print('ok')
