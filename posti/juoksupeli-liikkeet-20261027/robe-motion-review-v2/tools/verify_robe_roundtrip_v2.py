from pathlib import Path
import sys,copy,json,numpy as np
from rig_helpers import GLB
from robe_helpers_v2 import MorphRig
R=Path(__file__).resolve().parents[1];D=R/'robe-motion-review-v2';sys.path.insert(0,str(D/'tools'));from apply_robe_morph import apply
rows=[]
for var,ver in [('perus','robe-v9'),('viitta','robe-v8')]:
 source=R/'work'/ver/var/'puyi-final.glb';g=GLB(source);g.j['meshes'][0].pop('weights',None);g.j['meshes'][0].get('extras',{}).pop('targetNames',None);g.j['meshes'][0]['primitives'][0].pop('targets')
 for n in g.j['nodes']:n.pop('weights',None)
 for a in g.j['animations']:a['channels']=[c for c in a['channels']if c['target']['path']!='weights']
 temp=R/'work/robe-import-validation-v3'/var;temp.mkdir(parents=True,exist_ok=True);base=temp/'base-after-bone-import.glb';g.write(base);out=temp/'with-robe-morph.glb';row=apply(base,R/'robe-motion-review-v1/morph'/var/'manifest.json',out);target=GLB(out);assert all(c['target']['path']!='weights'for a in target.j['animations']for c in a['channels']);assert target.j['animations']==g.j['animations'];name='puyi-perus-liikkeet.glb'if var=='perus'else'puyi-liikkeet.glb';motion=GLB(D/'motions'/name)
 for a in target.j['animations']:
  ma=next(x for x in motion.j['animations']if x['name']==a['name'])
  for c in ma['channels']:
   if c['target']['path']!='weights':continue
   nodeName=motion.j['nodes'][c['target']['node']]['name'];ni=next(i for i,n in enumerate(target.j['nodes'])if n.get('name')==nodeName);ss=ma['samplers'][c['sampler']];sm={'interpolation':ss.get('interpolation','LINEAR')}
   for k in ['input','output']:sm[k]=target.append_array(motion.array(ss[k]),'SCALAR',5126)
   a['channels'].append({'sampler':len(a['samplers']),'target':{'node':ni,'path':'weights'}});a['samplers'].append(sm)
 combined=temp/'simulated-name-import.glb';target.write(combined);r=MorphRig(source);q=MorphRig(combined);error=0.
 for name in ['jump_robe','stairs_robe']:
  for t in np.linspace(0,r.durations[name],97):error=max(error,float(np.max(abs(r.skin(r.sample(name,float(t)))-q.skin(q.sample(name,float(t)))))))
 assert error<1e-9;row.update(variant=var,reimportedSkinnedVertexMaxDeltaM=error,samples=194);rows.append(row)
(D/'MORPH-IMPORT-QA.json').write_text(json.dumps(rows,indent=2)+'\n');print(json.dumps(rows,indent=2))
