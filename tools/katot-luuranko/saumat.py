import sys
import numpy as np
from PIL import Image
L='/Users/Shared/Claude/proto-3d/lokit/'
B={'lahi-45':(1100,870,1800,1000)}
def im(k,n): return np.asarray(Image.open(L+f'karttaseppa-katot-a-pariisi-{k}/ka-pariisi-{k}-{n}.png').convert('RGB')).astype(int)
for n,(x0,y0,x1,y1) in B.items():
    k6=im('koe6',n)[y0:y1,x0:x1]; k3=im('k3x97',n)[y0:y1,x0:x1]
    era=(np.abs(k6-k3).max(2)>24)
    for k in sys.argv[1:]:
        a=im(k,n)[y0:y1,x0:x1]; d6=(np.abs(a-k6).max(2)>24)&era; d3=(np.abs(a-k3).max(2)>24)&era
        print(f'{n} {k:6s} saumapikseleitä koe6:ssa {era.sum()}: jäljellä (≈koe6) {(era & ~d6).sum()}, poissa (≈k3) {(era & ~d3).sum()}')
