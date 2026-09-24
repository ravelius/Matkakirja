import math
R=6371000.0
def v(lat,lon):
    la,lo=math.radians(lat),math.radians(lon)
    return (math.cos(la)*math.cos(lo),math.cos(la)*math.sin(lo),math.sin(la))
def add(a,b,s=1): return tuple(x+s*y for x,y in zip(a,b))
def mul(a,s): return tuple(x*s for x in a)
def dot(a,b): return sum(x*y for x,y in zip(a,b))
def cross(a,b): return (a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0])
def nrm(a): n=math.sqrt(dot(a,a)); return mul(a,1/n)
class Kamera:
    def __init__(s,lat,lon,korkeus,kall,suunt=0,fov=50,W=1024,H=1366):
        ylos=v(lat,lon); kohde=mul(ylos,R)
        pohj=nrm(add((0,0,1),ylos,-dot((0,0,1),ylos))); ita=nrm(cross(pohj,ylos))
        b=math.radians(suunt); eteen=add(mul(pohj,math.cos(b)),mul(ita,math.sin(b)))
        k=math.radians(kall); suunta=add(mul(ylos,math.cos(k)),mul(eteen,-math.sin(k)))
        s.silma=add(kohde,mul(suunta,korkeus)); s.f=mul(suunta,-1)
        s.up=nrm(add(mul(eteen,math.cos(k)),mul(ylos,math.sin(k))))
        s.right=nrm(cross(s.f,s.up)); s.t=math.tan(math.radians(fov)/2); s.W,s.H=W,H; s.asp=W/H
    def ruutu(s,lat,lon):
        p=mul(v(lat,lon),R); d=add(p,s.silma,-1); z=dot(d,s.f)
        x=dot(d,s.right)/z/(s.t*s.asp); y=dot(d,s.up)/z/s.t
        return ((x+1)/2*s.W,(1-y)/2*s.H)
    def maa(s,px,py):
        x=(2*px/s.W-1)*s.t*s.asp; y=(1-2*py/s.H)*s.t
        d=nrm(add(add(s.f,mul(s.right,x)),mul(s.up,y)))
        b=dot(s.silma,d); c=dot(s.silma,s.silma)-R*R; disc=b*b-c
        if disc<0: return None
        t=-b-math.sqrt(disc); p=add(s.silma,mul(d,t))
        return (math.degrees(math.asin(p[2]/R)),math.degrees(math.atan2(p[1],p[0])))
