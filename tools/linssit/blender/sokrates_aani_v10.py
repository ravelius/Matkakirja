# Sokrates v10 -ääniraita (Linnanrakentaja 2.10.2026; omistaja 10.3x). Kesto 115,0 s = prologi 4,0 s + kohtaus 111,0 s.
# - Prologi: hento hallin huone-ääni (ruskea kohina noin −50 dB) ja kytkimen napsahdus 1,0 s:ssa hallin kaiulla
#   (aecho: heijastukset 70–430 ms, alipäästö). Napsahdus = 2. argumentti (Sisältökirjurin CC0/PD; ilman sitä hiljaisuus).
# - Zarathustra (Sascha Ende, CC BY 4.0) koko kohtauksen: trumpetit 13,0–22,5 s → loppusointu 60,5–80,0 s →
#   loppusoinnun urkupohja 66–80 s silmukkana (3 s:n ristihäivytykset) loppuun asti. Satie jää pois.
# Aikaleimat nollataan (asetpts=N/SR/TB) adelayn ja amixin jälkeen: muuten atrim leikkasi 4 s liian aikaisin.
# - Vaimennus tekstien ja luentojen ajaksi −13 dB (×0,22) prologi + 17,5 s:sta, takaisin ×0,7 loppuvetäytymisessä.
#   Luennat a–f kuten v9, siirrettynä prologin verran (+4 s).
#   python3 sokrates_aani_v10.py <ulos.m4a> [napsahdus]
import subprocess, sys

M = '/Users/Shared/Claude/proto-3d/_lahteet/sokrates/musiikki'; L = '/Users/Shared/Claude/proto-3d/_lahteet/sokrates/luennat'
ULOS = sys.argv[1]; KLIK = sys.argv[2] if len(sys.argv) > 2 else None
P, KESTO, SILMUKAT = 4.0, 115.0, 8
LUENNAT = (('a', 20.0), ('b', 32.0), ('c', 51.667), ('d', 62.667), ('e', 80.0), ('f', 88.833))
ST = 'aformat=sample_rates=48000:channel_layouts=stereo'

sis = ['-i', f'{M}/zarathustra-sascha-ende.mp3'] + sum((['-i', f'{L}/{k}-otto1.mp3'] for k, _ in LUENNAT), [])
sis += ['-f', 'lavfi', '-t', str(KESTO), '-i', 'anoisesrc=color=brown:amplitude=0.004:sample_rate=48000']
i_huone = 1 + len(LUENNAT)
if KLIK: sis += ['-i', KLIK]
g = [f'[0]{ST},asplit={2 + SILMUKAT}' + ''.join(f'[s{k}]' for k in range(2 + SILMUKAT))]
g += ['[s0]atrim=13.0:22.517,asetpts=PTS-STARTPTS[zA]', '[s1]atrim=60.5:80.0,asetpts=PTS-STARTPTS[zB]']
g += [f'[s{k + 2}]atrim=66:80,asetpts=PTS-STARTPTS[l{k}]' for k in range(SILMUKAT)]
g += ['[zA][zB]acrossfade=d=0.15:c1=tri:c2=tri[c0]']
g += [f'[c{k}][l{k}]acrossfade=d=3[c{k + 1}]' for k in range(SILMUKAT)]
a0, a1, l0 = P + 17.5, P + 19.5, P + 108.3
vol = f"if(lt(t\\,{a0})\\,1\\,if(lt(t\\,{a1})\\,1-0.78*(t-{a0})/2\\,if(lt(t\\,{l0})\\,0.22\\,0.22+0.48*min(1\\,(t-{l0})/2.2))))"
g += [f'[c{SILMUKAT}]atrim=0:{KESTO - P},asetpts=PTS-STARTPTS,adelay={int(P * 1000)}:all=1,asetpts=N/SR/TB,'
      f'volume=volume={vol}:eval=frame,volume=0.75[zf]']
nimet = ['[zf]']
for j, (k, t) in enumerate(LUENNAT):
    g += [f'[{j + 1}]{ST},adelay={int((t + P) * 1000)}:all=1,asetpts=N/SR/TB[v{k}]']; nimet.append(f'[v{k}]')
g += [f'[{i_huone}]{ST},afade=t=out:st=4:d=2[huone]']; nimet.append('[huone]')
if KLIK:
    g += [f'[{i_huone + 1}]{ST},lowpass=f=6000,aecho=0.8:0.85:70|140|260|430:0.45|0.32|0.2|0.12,adelay=1000:all=1,asetpts=N/SR/TB[klik]']
    nimet.append('[klik]')
g += [''.join(nimet) + f'amix=inputs={len(nimet)}:normalize=0:duration=longest,asetpts=N/SR/TB,atrim=0:{KESTO},'
      f'afade=t=out:st={KESTO - 2.5}:d=2.5,alimiter=limit=0.95[out]']
r = subprocess.run(['ffmpeg', '-y', '-loglevel', 'warning'] + sis + ['-filter_complex', ';'.join(g), '-map', '[out]',
                    '-c:a', 'aac', '-b:a', '192k', ULOS], capture_output=True, text=True)
print(r.stderr[-800:] if r.returncode else f'AANI {ULOS}')
