import sys, statistics
from PIL import Image
D = sys.argv[1]
def med(px): return tuple(int(statistics.median(c[i] for c in px)) for i in range(3))
def h(m): return '#%02X%02X%02X' % m
L = lambda c: 0.3*c[0]+0.59*c[1]+0.11*c[2]
R = [('p9','pal-etu',(1380,760,2000,960)), ('p9','pal-piha-pohj',(1000,20,1900,150)), ('p9','pal-piha-lansi',(760,20,860,200)),
     ('p9','talo-o-etu',(1760,1760,2300,1990)), ('p9','talo-v-sivu',(300,1300,800,1700)),
     ('p11','talo-etu',(700,1300,1200,1700)), ('p8','talo-oik',(1950,300,2600,800)), ('p10','talo-etu',(700,1300,1200,1650))]
ims = {}
for k, n, b in R:
    im = ims.setdefault(k, Image.open(f'{D}/{k}-uusi.png').convert('RGB'))
    px = [c for c in im.crop(b).getdata() if c[0] > c[2] + 8]   # ruskeat (seinä + ikkuna), ei harmaata kattoa
    l = sorted(L(c) for c in px); seinal = l[len(l)*3//4]
    seina = med([c for c in px if abs(L(c) - seinal) < 0.06*seinal]); ikk = [c for c in px if L(c) < 0.75*seinal]
    i = med(ikk)
    print(f'{k:4} {n:15} seinä {h(seina)}  ikkuna {h(i)} ({100*len(ikk)//len(px)} %)  suhde {[round(a/s,2) for a,s in zip(i,seina)]}')
