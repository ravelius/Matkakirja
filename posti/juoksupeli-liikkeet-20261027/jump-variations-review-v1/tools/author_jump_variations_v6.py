"""Two bounded jump variations; receiver58b86738 confirms .6/.9s air times."""
from pathlib import Path
import argparse,json,time,hashlib,numpy as np
from rig_helpers import Rig,qmat,axis
from author_dodges_v3 import smooth5
from author_vault_low_v3 import phase
from limb_reference_ik_v3 import leg
R=Path(__file__).resolve().parents[1]
PARAMS={'jump_small':{'airS':.6,'heightM':.55,'obstacle':{'min':[-1.8,.002,1.9],'max':[1.8,.5,2.4]}},'jump_long':{'airS':.9,'heightM':.55,'obstacle':{'min':[-1.8,.002,2.4],'max':[1.8,.5,3.5]}}}
def duration(name):return .36+PARAMS[name]['airS']
def source_time(name,t):
    air=PARAMS[name]['airS'];return float(t+(.6-air)*smooth5((t-.14)/air))
def root(name,t):
    T=source_time(name,t);u=(T-.14)/.6
    return np.array([0.,PARAMS[name]['heightM']*4*u*(1-u) if 0<u<1 else 0.,5*(t+phase(T)-T)])
def pose(r,name,t):
    T=source_time(name,t);v=r.sample('vault_low',T);reach=0.
    if name=='jump_small':
        w=smooth5((t-.14)/.10)*(1-smooth5((t-.64)/.10))
        if w>1e-8:
            W=r.W(v);F={s:W[r.n['mixamorig:'+s+'Foot']].copy()for s in ['Left','Right']}
            for side,other,sg in [('Left','Right',1),('Right','Left',-1)]:
                target=(1-w)*F[side][:3,3]+w*F[other][:3,3]*[-1,1,1]
                reach=max(reach,leg(r,v,side,target,np.array([sg*.12,0,1.]),0.))
                r.rotate(v,r.n['mixamorig:'+side+'Foot'],F[side][:3,:3])
    guard=max(1-smooth5(T/.06),smooth5((T-.79)/.02)*(1-smooth5((T-.84)/.03)))
    if guard>1e-9:
        W=r.W(v);h=r.n['mixamorig:RightHand'];a=r.n['mixamorig:RightArm'];rotation=W[h,:3,:3].copy()
        r.rotate(v,a,qmat(axis([0,0,1],-.12*guard))@W[a,:3,:3]);r.rotate(v,h,rotation)
    leftguard=smooth5(T/.025)*(1-smooth5((T-.065)/.035))
    if leftguard>1e-9:
        W=r.W(v);h=r.n['mixamorig:LeftHand'];a=r.n['mixamorig:LeftArm'];rotation=W[h,:3,:3].copy()
        r.rotate(v,a,qmat(axis([0,1,0],-.35*leftguard))@W[a,:3,:3]);r.rotate(v,h,rotation)
    return v,reach
def main():
    ap=argparse.ArgumentParser();ap.add_argument('var',choices=['viitta']);a=ap.parse_args()
    D=R/'work/jump-variations-v6'/a.var;D.mkdir(parents=True,exist_ok=True)
    src=R/f'bar-sequence-review-v1/models/puyi-{a.var}-parkour.glb';r=Rig(src);start=time.monotonic();rows=[]
    for name,p in PARAMS.items():
        dur=duration(name);ts=np.linspace(0,dur,round(dur*480)+1);frames=[];miss=0.
        for t in ts:
            v,e=pose(r,name,float(t));frames.append(v);miss=max(miss,e)
        r.add(name,frames,ts,{'source':'verified vault_low; small switches leading leg only in air, long retimes air','durationS':dur,'externalRoot':'author_jump_variations_v6.root(name,t)','gameVerified':False,'entryArmClearanceRad':.12,'entryBodyAndFeetUnchanged':True})
        rows.append({'clip':name,'durationS':dur,'maxReachResidualM':miss,**p})
    r.save(D/'puyi.glb');q={'status':'CANDIDATE_PENDING_DENSE_VISUAL_QA','variant':a.var,'source':str(src),'sourceSHA256':hashlib.sha256(src.read_bytes()).hexdigest(),'clips':rows,'newTripoCalls':0,'credits':0,'seconds':time.monotonic()-start}
    (D/'QA.json').write_text(json.dumps(q,indent=2)+'\n');print(json.dumps(q))
if __name__=='__main__':main()
