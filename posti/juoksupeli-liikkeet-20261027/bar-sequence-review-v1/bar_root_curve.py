"""Standalone root path for delivered bar clips; data comes from ROOT-PARAMETERS.json.
Metres,+Yup,+Zforward. Origin is bar center's ground projection, not initial runner.
Pass a variant entry and LOCAL clip time. No game code or third-party dependencies.
"""
import math

def h(a,b,va,vb,t,d):
 u=max(0.,min(1.,t/d));return (2*u**3-3*u*u+1)*a+(u**3-2*u*u+u)*d*va+(-2*u**3+3*u*u)*b+(u**3-u*u)*d*vb

def ease(t):
 t=max(0.,min(1.,t));return t*t*(3-2*t)

def integral(u):
 if u<=0:return 0.
 if u>=1:return u-.5
 return u**3-.5*u**4

def heavy(t):return [0.,.28*(1-ease(t/.16)),5*(t-.16*integral(t/.16))+5*.44*integral((t-.34)/.44)]

def root(p,clip,t):
 if clip=='bar_approach_takeoff':
  if t<=.12:return [0.,0.,-2.8+5*t]
  a=[0.,0.,-2.2];va=[0.,5.2,5.];return [h(a[i],p['startRoot'][i],va[i],p['startVelocity'][i],t-.12,.52)for i in range(3)]
 if clip=='bar_swing_over':
  theta=h(.25,-.90,-5.,-8.,t,.24);x,y,z=p['hipBase'];dy=y-1.23;dz=z-.25
  return [0.,2.3+math.cos(theta)*dy-math.sin(theta)*dz-y,math.sin(theta)*dy+math.cos(theta)*dz-z]
 if clip!='bar_release_land_run':raise ValueError(clip)
 if t<=p['airS']:
  return [p['releaseRoot'][0]+p['releaseVelocity'][0]*t,p['releaseRoot'][1]+p['releaseVelocity'][1]*t-.5*9.81*t*t,p['releaseRoot'][2]+p['releaseVelocity'][2]*t]
 s=t-p['airS'];v=heavy(s);v[2]+=p['joinRoot'][2]
 if s<.16:
  v[1]=h(.5,0.,p['joinVelocity'][1],0.,s,.16);v[2]=p['joinRoot'][2]+h(0.,heavy(.16)[2],p['joinVelocity'][2],0.,s,.16)
 return v
