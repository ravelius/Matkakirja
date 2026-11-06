# LAV 7.11.: kohta 1-1 poikkileikkaus z -258: vaakapinnat x -231..-224 ja sivun ylä- ja alareuna. Vain mittaus.
import os
import numpy as np
A='/Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/aukot/'
exec(open(A+'mittaa3.py').read().split("print('## kuvan pisteet")[0])
T,M,P=lue(KT+'koejuuri-levyt7/'+TV.replace('*','1-1'),(-231,-224,-258.2,-257.8))
for x in (-229.6,-229,-228.7,-228.52,-228.42,-228.3,-228,-227,-226,-225):
    print(x,lay(T,M,float(x),-258.))
