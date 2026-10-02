# Marcus Aurelius -mallivideon ääniraita (Linnanrakentaja 2.10.2026; Päätoimittaja: Eroica, omistaja arvioi videon kanssa).
# Prologi 4 s huone-äänellä; Beethoven, Sinfonia nro 3 "Eroica", II Marcia funebre (Czech National Symphony Orchestra /
# Musopen 2012, CC0) alkaen 75,48 s, jolloin forte (84,88 s) osuu Rembrandt-otokseen 9,4 s:ssa; musiikki jatkuu koko
# videon ja vaimenee −13 dB tekstien ja luentojen ajaksi. Luennat a (10.16) 20 s ja b (elämänkertomus) 32 s (+ prologi).
#   python3 marcus_aani.py <ulos.m4a> [kesto_s ilman prologia, oletus 48.333]
import subprocess, sys

M = '/Users/Shared/Claude/proto-3d/_lahteet/marcus-aurelius/musiikki'; L = '/Users/Shared/Claude/proto-3d/_lahteet/marcus-aurelius/luennat'
ULOS = sys.argv[1]; P = 4.0; KESTO = P + (float(sys.argv[2]) if len(sys.argv) > 2 else 48.333); ALKU = 75.48
ST = 'aformat=sample_rates=48000:channel_layouts=stereo'
a0, a1, l0 = P + 17.5, P + 19.5, KESTO - 2.7
vol = f"if(lt(t\\,{a0})\\,1\\,if(lt(t\\,{a1})\\,1-0.78*(t-{a0})/2\\,if(lt(t\\,{l0})\\,0.22\\,0.22+0.48*min(1\\,(t-{l0})/2.2))))"
g = [f'[0]{ST},atrim={ALKU}:{ALKU + KESTO - P},asetpts=PTS-STARTPTS,adelay={int(P * 1000)}:all=1,asetpts=N/SR/TB,'
     f'volume=volume={vol}:eval=frame,volume=1.6[m]',
     f'[1]{ST},adelay={int((20 + P) * 1000)}:all=1,asetpts=N/SR/TB[va]',
     f'[2]{ST},adelay={int((32 + P) * 1000)}:all=1,asetpts=N/SR/TB[vb]',
     f'[3]{ST},afade=t=out:st=4:d=2[huone]',
     f'[m][va][vb][huone]amix=inputs=4:normalize=0:duration=longest,asetpts=N/SR/TB,atrim=0:{KESTO},'
     f'afade=t=out:st={KESTO - 2.5}:d=2.5,alimiter=limit=0.95[out]']
sis = ['-i', f'{M}/eroica-marcia-funebre-musopen.ogg', '-i', f'{L}/a-otto1.mp3', '-i', f'{L}/b-otto1.mp3',
       '-f', 'lavfi', '-t', str(KESTO), '-i', 'anoisesrc=color=brown:amplitude=0.004:sample_rate=48000']
r = subprocess.run(['ffmpeg', '-y', '-loglevel', 'warning'] + sis + ['-filter_complex', ';'.join(g), '-map', '[out]',
                    '-c:a', 'aac', '-b:a', '192k', ULOS], capture_output=True, text=True)
print(r.stderr[-800:] if r.returncode else f'AANI {ULOS}')
