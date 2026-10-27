"""Append/replace named bone clips in a PT1182 motion-only GLB without geometry."""
from pathlib import Path
import copy,argparse,json,hashlib,numpy as np
from rig_helpers import GLB

def clean_nodes(j):return [{k:v for k,v in n.items()if k not in ['mesh','skin','weights']}for n in j['nodes']]
def append(base,source,dest,names):
 base,source,dest=map(Path,[base,source,dest]);assert not dest.exists();g=GLB(base);s=GLB(source);assert not any(k in g.j for k in ['meshes','materials','images','textures']);assert g.j['nodes']==clean_nodes(s.j),'Different rig/node order; do not guess retargeting'
 old=GLB(base);amap={};added=[]
 def acc(i):
  if i not in amap:
   a=s.j['accessors'][i];amap[i]=g.append_array(s.array(i),a['type'],a['componentType'])
  return amap[i]
 for name in names:
  original=next(a for a in s.j['animations']if a['name']==name);a=copy.deepcopy(original);assert not any(c['target']['path']=='weights'for c in a['channels'])
  for sam in a['samplers']:sam['input']=acc(sam['input']);sam['output']=acc(sam['output'])
  idx=next((i for i,z in enumerate(g.j['animations'])if z['name']==name),None)
  if idx is None:g.j['animations'].append(a)
  else:g.j['animations'][idx]=a
  added.append(name)
 g.write(dest);check=GLB(dest)
 for a in check.j['animations']:
  origin=s if a['name']in names else old;b=next(z for z in origin.j['animations']if z['name']==a['name']);assert a['channels']==b['channels']
  for x,y in zip(a['samplers'],b['samplers']):
   assert x.get('interpolation','LINEAR')==y.get('interpolation','LINEAR')
   for k in ['input','output']:assert np.array_equal(check.array(x[k]),origin.array(y[k]))
 assert check.j['nodes']==old.j['nodes'];return {'file':str(dest),'bytes':dest.stat().st_size,'sha256':hashlib.sha256(dest.read_bytes()).hexdigest(),'clips':[a['name']for a in check.j['animations']],'addedOrReplaced':added,'allOldAndNewClipArraysByteExact':True,'geometryIncluded':False}
if __name__=='__main__':
 ap=argparse.ArgumentParser();ap.add_argument('base');ap.add_argument('source');ap.add_argument('dest');ap.add_argument('clips',nargs='+');a=ap.parse_args();q=append(a.base,a.source,a.dest,a.clips);Path(a.dest).with_suffix('.export-qa.json').write_text(json.dumps(q,indent=2)+'\n');print(json.dumps(q,indent=2))
