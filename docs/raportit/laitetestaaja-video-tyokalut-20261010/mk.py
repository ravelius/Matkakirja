import subprocess,sys
V='/Users/Shared/Claude/proto-3d/lokit/todistus-j164-video4-20261008-0811/juna164-video-omistajalle.mp4'
name=sys.argv[1];ts=sys.argv[2:]
ins=[];fc=[]
for i,t in enumerate(ts):
    ins+=['-ss',t,'-i',V]; fc.append(f'[{i}:v]scale=560:-1[v{i}]')
lay='|'.join(f'{(k%3)*564}_{(k//3)*424}' for k in range(len(ts)))
f=';'.join(fc)+';'+''.join(f'[v{i}]' for i in range(len(ts)))+f'xstack=inputs={len(ts)}:layout={lay}'
subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y',*ins,'-filter_complex',f,'-frames:v','1',name+'.png'],check=True)
