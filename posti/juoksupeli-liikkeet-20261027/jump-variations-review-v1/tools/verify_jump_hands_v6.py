from pathlib import Path
import argparse,json,numpy as np
from rig_helpers import Rig,skin_matrices,skinned
from robe_surface_intersections import intersections
from author_jump_variations_v6 import source_time
R=Path(__file__).resolve().parents[1]
ap=argparse.ArgumentParser();ap.add_argument('var');ap.add_argument('--probe',action='store_true');a=ap.parse_args();D=R/'work/jump-variations-v6'/a.var;r=Rig(D/'puyi.glb');g=r.g;p=g.j['meshes'][0]['primitives'][0]
F=g.array(p['indices']).reshape(-1,3);J=g.array(p['attributes']['JOINTS_0']).astype(int);wt=g.array(p['attributes']['WEIGHTS_0']);js=g.j['skins'][0]['joints'];hand={}
for side in ['Left','Right']:
    ids=[k for k,i in enumerate(js)if side+'Hand'in g.j['nodes'][i].get('name','')];hw=np.where(np.isin(J,ids),wt,0).sum(1);hand[side]=(F[np.all(hw[F]>.7,1)],F[np.all(hw[F]<.1,1)])
def contacts(v):
    W=r.W(v);P=skinned(g,skin_matrices(g,W));out={}
    for side,(HF,BF)in hand.items():
        anchor=W[r.n['mixamorig:'+side+'Hand'],:3,3];indices=np.flatnonzero(np.linalg.norm(P[BF].mean(1)-anchor,axis=1)<.24);B=BF[indices]
        out[side]={(int(i),int(indices[j]))for i,j in intersections(P[HF],P[B])}
    return out
rows=[]
for name in ['jump_small','jump_long']:
    records=[];duration=r.durations[name]
    for t in ([0.,.01,.02,.025,.03,.035,.04,.045,.05,.055,.06,.065,.07,.08,.09,.1,.14,.3,.44,.74,.82226,.90,.96] if name=='jump_small' else [0.,.01,.02,.025,.03,.035,.04,.045,.05,.055,.06,.065,.07,.08,.09,.1,.14,.44,.59,1.04,1.12226,1.20,1.26]) if a.probe else np.linspace(0,duration,round(duration*240)+1):
        hit=contacts(r.sample(name,float(t)))
        if any(hit.values()):
            base=contacts(r.sample('vault_low',source_time(name,float(t))))
            for side,h in hit.items():
                if h:records.append({'time':float(t),'side':side,'pairs':len(h),'sourcePairsAtCorrespondingTime':len(base[side]),'newPairs':len(h-base[side])})
    rows.append({'clip':name,'crossingSamples':len(records),'newPairSamples':sum(x['newPairs']>0 for x in records),'crossings':records})
q={'status':'PASS'if not any(x['crossingSamples']for x in rows)else'REVIEW_REQUIRED','variant':a.var,'sampleHz':None if a.probe else 240,'reports':rows,'scope':'Exact sampled hand-versus-low-hand-weight triangles, local24cm broad phase; original matching vault pose recorded separately, no failures hidden.'}
(D/('HAND-PROBE.json' if a.probe else 'HAND-QA.json')).write_text(json.dumps(q,indent=2)+'\n');print(json.dumps({**q,'reports':[{k:v for k,v in x.items()if k!='crossings'}for x in rows]}))
