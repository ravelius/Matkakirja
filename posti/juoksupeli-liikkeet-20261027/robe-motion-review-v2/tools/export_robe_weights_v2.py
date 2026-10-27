"""Receiver1187: weights only in motion files; geometry-only morph installer."""
from pathlib import Path
import copy,hashlib,json,numpy as np
from rig_helpers import GLB
R=Path(__file__).resolve().parents[1];D=R/'robe-motion-review-v2';D.mkdir(exist_ok=True)
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def main():
 rows=[]
 for var,name,ver in [('perus','puyi-perus-liikkeet.glb','robe-v9'),('viitta','puyi-liikkeet.glb','robe-v8')]:
  old=R/'robe-motion-review-v1/motions'/name;s=GLB(old);d=GLB(old);full=GLB(R/'work'/ver/var/'puyi-final.glb');manifest=json.loads((R/'robe-motion-review-v1/morph'/var/'manifest.json').read_text());node=manifest['meshNode'];nodeName=d.j['nodes'][node]['name'];assert nodeName==full.j['nodes'][node]['name'];curves=[]
  for a in d.j['animations']:
   if a['name'] not in ['jump_robe','stairs_robe']:continue
   source=next(b for b in full.j['animations']if b['name']==a['name']);c=next(c for c in source['channels']if c['target']['path']=='weights');ss=source['samplers'][c['sampler']];assert c['target']['node']==node
   sm={'interpolation':ss.get('interpolation','LINEAR')}
   for k in ['input','output']:sm[k]=d.append_array(full.array(ss[k]),'SCALAR',5126)
   a['channels'].append({'sampler':len(a['samplers']),'target':{'node':node,'path':'weights'}});a['samplers'].append(sm);curves.append(a['name'])
  d.j.setdefault('extras',{})['delivery']='Receiver1187: motion-only plus named mesh-node weights, robeHemLiftLeft. Geometry and morph deltas remain in separately assembled main model.'
  out=D/'motions'/name;out.parent.mkdir(exist_ok=True);assert not out.exists();d.write(out);x=GLB(out);assert x.j['nodes']==s.j['nodes'];assert not any(k in x.j for k in ['meshes','materials','images','textures'])
  for i in range(len(s.j['accessors'])):assert np.array_equal(s.array(i),x.array(i))
  for a,b in zip(s.j['animations'],x.j['animations']):
   assert b['channels'][:len(a['channels'])]==a['channels'];assert b['samplers'][:len(a['samplers'])]==a['samplers']
   wc=[c for c in b['channels']if c['target']['path']=='weights'];assert len(wc)==int(a['name']in curves)
   if wc:
    source=next(z for z in full.j['animations']if z['name']==a['name']);cc=next(c for c in source['channels']if c['target']['path']=='weights');ss=source['samplers'][cc['sampler']];tt=b['samplers'][wc[0]['sampler']]
    for k in ['input','output']:assert np.array_equal(full.array(ss[k]),x.array(tt[k]))
  rows.append({'variant':var,'file':str(out),'bytes':out.stat().st_size,'sha256':sha(out),'baseSHA256':sha(old),'meshNodeIndex':node,'meshNodeName':nodeName,'morphName':'robeHemLiftLeft','weightClips':curves,'allOldAccessorsAndChannelsUnchanged':True,'weightsByteExactToReviewedFullModel':True,'noGeometry':True,'runtimeVerified':False})
 source=(R/'robe-motion-review-v1/tools/apply_robe_morph.py').read_text();start=source.index(" names={a['name']");end=source.index(" payload=",start);source=source[:start]+source[end:];start=source.index(" for a in j['animations']:");end=source.index(' assert bytes(b[:len(before)])',start);source=source[:start]+source[end:]
 source=source.replace('after bone clips have been imported.','without adding animation weight channels (receiver1187).').replace('rig, existing morphs or missing robe clips.','rig or existing morphs. Animation channels stay byte-exact.').replace('import bone clips first','').replace("'runtimeVerified':False}","'animationWeightsAdded':False,'runtimeVerified':False}")
 (D/'tools').mkdir(exist_ok=True);(D/'tools/apply_robe_morph.py').write_text(source)
 (D/'EXPORT-QA.json').write_text(json.dumps(rows,indent=2)+'\n');print(json.dumps(rows))
if __name__=='__main__':main()
