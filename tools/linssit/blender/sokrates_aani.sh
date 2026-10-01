#!/bin/zsh
# Sokrates v7 -ääniraita (Linnanrakentaja 1.10.2026): Zarathustra (Sascha Ende, CC BY 4.0) introon leikattuna
# trumpetit 13,0–22,5 s → loppusointu 60,5 s (0,15 s ristihäivytys; sointu osuu Rembrandt-otokseen ~9,4 s),
# Zarathustra häipyy 18–21 s ja Satien Gymnopédie 1 (Robin Alciatore, PD) nousee 18 s alkaen 3 s:ssa.
# Lukija: a (38a) 20,0 s, b (elämänkertomus) 32,0 s. Kesto 48,33 s (1450 ruutua / 30).
#   sokrates_aani.sh <ulos.m4a>
M=/Users/Shared/Claude/proto-3d/_lahteet/sokrates/musiikki; L=/Users/Shared/Claude/proto-3d/_lahteet/sokrates/luennat
ffmpeg -y -loglevel error -i $M/zarathustra-sascha-ende.mp3 -i $M/gymnopedie1-alciatore.ogg -i $L/a-otto1.mp3 -i $L/b-otto1.mp3 \
  -filter_complex "\
[0]aformat=sample_rates=48000:channel_layouts=stereo,asplit=2[z1][z2];\
[z1]atrim=13.0:22.517,asetpts=PTS-STARTPTS[zA];[z2]atrim=60.50:82.0,asetpts=PTS-STARTPTS[zB];\
[zA][zB]acrossfade=d=0.15:c1=tri:c2=tri,afade=t=out:st=18.0:d=3.0,volume=0.75[zf];\
[1]aformat=sample_rates=48000:channel_layouts=stereo,atrim=0:31,asetpts=PTS-STARTPTS,afade=t=in:d=3,adelay=18000|18000,volume=0.85[s];\
[2]aformat=sample_rates=48000:channel_layouts=stereo,adelay=20000|20000,volume=1.0[va];\
[3]aformat=sample_rates=48000:channel_layouts=stereo,adelay=32000|32000,volume=1.0[vb];\
[zf][s][va][vb]amix=inputs=4:normalize=0:duration=longest,atrim=0:48.333,afade=t=out:st=46.3:d=2,alimiter=limit=0.95[out]" \
  -map "[out]" -c:a aac -b:a 192k "$1"
