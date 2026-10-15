"""PUHDAS VIIVAOHJAUS (Karttaseppä 9.10.2026, PT: ikkunat ±3 px:n sisään): syvyyden epäjatkuvuudet + renderin ikkunalaatikot
(ruskea paikkamateriaali, HSV-sävy 10–32, kyll. ≥ 90) ääriviivoina, ilman renderin pintatekstuuria.
Käyttö: python3 viivat.py <kansio> <nimi>   (lukee <nimi>_renderi.png ja <nimi>_syvyys16.png → <nimi>_viivat.png, <nimi>_ikkunareunat.png)
Parempi: Blenderin ikkunamaski (ID-passi) suoraan ikkunoiksi; tämä on paikkamateriaalin värin varassa."""
import sys
from PIL import Image, ImageFilter, ImageChops
D,n=sys.argv[1],sys.argv[2]
import os
MASKI=f'{D}/{n}_ikkunat.png'   # LR:n Blender-ikkunamaski (lasi + karmit); jos puuttuu, värintunnistus
r=Image.open(f'{D}/{n}_renderi.png').convert('RGB'); s=Image.open(f'{D}/{n}_syvyys16.png').convert('L')
sy=s.filter(ImageFilter.FIND_EDGES).point(lambda x:255 if x>6 else 0)
hsv=r.convert('HSV'); H,S_,V=hsv.split()
ikk=Image.merge('RGB',(H,S_,V)).point(lambda x:x)  # paikka
hp,sp,vp=H.load(),S_.load(),V.load(); W,Hh=r.size
m=Image.new('L',r.size); mp=m.load()
for y in range(Hh):
    for x in range(W):
        if 10<=hp[x,y]<=32 and sp[x,y]>=90 and 60<=vp[x,y]<=200: mp[x,y]=255   # ruskea ikkunalevy
m=m.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.MaxFilter(3))
if os.path.exists(MASKI): m=Image.open(MASKI).convert('L').resize(r.size, Image.NEAREST).point(lambda x:255 if x>127 else 0); print('ikkunamaski', MASKI)
mr=m.filter(ImageFilter.FIND_EDGES).point(lambda x:255 if x>0 else 0)
v=ImageChops.lighter(sy, mr)
v.save(f'{D}/{n}_viivat.png'); mr.save(f'{D}/{n}_ikkunareunat.png'); print(n, 'ikkunapikseleitä', sum(1 for p in m.getdata() if p))
