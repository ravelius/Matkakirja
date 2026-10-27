from pathlib import Path
import argparse,json,time,numpy as np
from rig_helpers import Rig,skin_matrices,skinned
from author_jump_variations_v4 import PARAMS,root,source_time
R=Path(__file__).resolve().parents[1]
def box(P,F,mn,mx):
 mn=np.array(mn);mx=np.array(mx);center=(mn+mx)/2;extent=(mx-mn)/2;V=P[F]-center;V=V[np.all(V.min(1)<=extent,1)&np.all(V.max(1)>=-extent,1)]
 if not len(V):return 0
 E=[V[:,1]-V[:,0],V[:,2]-V[:,1],V[:,0]-V[:,2]];axes=[np.cross(E[0],E[1])]+[np.cross(e,b)for e in E for b in np.eye(3)];ok=np.ones(len(V),bool)
 for a in axes:
  p=np.einsum('nij,nj->ni',V,a);rad=np.sum(abs(a)*extent,1);ok&=(p.min(1)<=rad)&(p.max(1)>=-rad)
 return int(ok.sum())
def main():
 ap=argparse.ArgumentParser();ap.add_argument('var');ap.add_argument('--file',default='puyi.glb');a=ap.parse_args();D=R/'work/jump-variations-v4'/a.var;r=Rig(D/a.file);g=r.g;F=g.array(g.j['meshes'][0]['primitives'][0]['indices']).ravel().reshape(-1,3);rows=[];start=time.monotonic()
 for name,param in PARAMS.items():
  dur=r.durations[name];floor=9.;hits=0;minAir=9.;maxStep=0.;worst=None;last=None
  for t in np.linspace(0,dur,round(dur*960)+1):
   v=r.sample(name,float(t));P=skinned(g,skin_matrices(g,r.W(v)))+root(name,t);low=float(P[:,1].min());floor=min(floor,low)
   if .22<t<param['airS']+.06:minAir=min(minAir,low)
  for t in np.linspace(0,dur,round(dur*240)+1):
   v=r.sample(name,float(t))
   if last is not None:
    for k,x in v.items():
     if k[1]=='rotation':
      step=float(np.degrees(2*np.arccos(np.clip(abs(x@last[k]),-1,1))))
      if step>maxStep:maxStep=step;worst={'t':float(t),'bone':g.j['nodes'][k[0]].get('name')}
   last=v
  for t in np.linspace(0,dur,round(dur*480)+1):
   P=skinned(g,skin_matrices(g,r.W(r.sample(name,float(t)))))+root(name,t);hits=max(hits,box(P,F,param['obstacle']['min'],param['obstacle']['max']))
  def delta(v,q):return max(min(float(np.max(abs(v[k]-q[k]))),float(np.max(abs(v[k]+q[k]))))if k[1]=='rotation'else float(np.max(abs(v[k]-q[k])))for k in q)
  entryV=r.sample(name,0);sourceV=r.sample('vault_low',0);entry=delta(entryV,sourceV);exempt={(r.n['mixamorig:'+n],'rotation') for n in ['RightArm','RightHand']};entryBody=delta({k:v for k,v in entryV.items() if k not in exempt},{k:v for k,v in sourceV.items() if k not in exempt});entryArmDeg=max(float(np.degrees(2*np.arccos(np.clip(abs(entryV[k]@sourceV[k]),-1,1))))for k in exempt);exit=delta(r.sample(name,dur),r.sample('vault_low',r.durations['vault_low']));passed=floor>=-.0001 and hits==0 and maxStep<15 and max(entryBody,exit)<1e-5 and entryArmDeg<=10
  rows.append({'clip':name,'durationS':dur,'floorMinimumM':floor,'middleAirMinimumM':minAir,'maxAngularStep240HzDeg':maxStep,'worstAngular':worst,'maxTriangleBoxHits':hits,'obstacle':param['obstacle'],'entrySourceDelta':entry,'entryBodyExcludingDeclaredArmChannelsDelta':entryBody,'entryArmClearanceDeg':entryArmDeg,'entryExemptChannels':['RightArm.rotation','RightHand.rotation'],'exitSourceDelta':exit,'externalRootEnd':root(name,dur).tolist(),'pass':passed})
 q={'status':'PASS'if all(x['pass']for x in rows)else'FAIL','variant':a.var,'reports':rows,'runtimeVerified':False,'limits':'Defined obstacle, floor, angular steps and endpoint poses. Actual game root/transition and all cloth collision pending.','seconds':time.monotonic()-start};(D/(Path(a.file).stem+'-QA.json')).write_text(json.dumps(q,indent=2)+'\n');print(json.dumps(q))
if __name__=='__main__':main()
