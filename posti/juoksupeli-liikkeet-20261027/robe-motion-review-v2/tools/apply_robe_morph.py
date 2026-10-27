"""Add the hash-matched robe morph to a COPY without adding animation weight channels (receiver1187).
Python standard library only. Never overwrite input/output. Refuses changed geometry,
rig or existing morphs. Animation channels stay byte-exact. This is an offline asset tool, not game code.
Usage: python3 apply_robe_morph.py BASE.glb morph/perus/manifest.json NEW.glb
"""
from pathlib import Path
import argparse,copy,hashlib,json,struct
SIZE={5120:1,5121:1,5122:2,5123:2,5125:4,5126:4}
WIDTH={'SCALAR':1,'VEC2':2,'VEC3':3,'VEC4':4,'MAT2':4,'MAT3':9,'MAT4':16}
def sha(b):return hashlib.sha256(b).hexdigest()
def canonical(x):return json.dumps(x,sort_keys=True,separators=(',',':'),ensure_ascii=False).encode()
def clean_nodes(j):return [{k:v for k,v in n.items()if k not in ['mesh','skin','weights']}for n in j['nodes']]
def load(path):
 b=Path(path).read_bytes();assert b[:4]==b'glTF' and struct.unpack_from('<II',b,4)==(2,len(b));n=struct.unpack_from('<I',b,12)[0];assert b[16:20]==b'JSON' and b[24+n:28+n]==b'BIN\x00';return json.loads(b[20:20+n]),bytearray(b[28+n:28+n+struct.unpack_from('<I',b,20+n)[0]])
def array_bytes(j,b,i):
 a=j['accessors'][i];assert 'sparse'not in a;v=j['bufferViews'][a['bufferView']];assert v['buffer']==0
 width=SIZE[a['componentType']]*WIDTH[a['type']];off=v.get('byteOffset',0)+a.get('byteOffset',0);stride=v.get('byteStride',width)
 return b''.join(b[off+k*stride:off+k*stride+width]for k in range(a['count']))
def floats(j,b,i):
 a=j['accessors'][i];assert a['componentType']==5126 and a['type']=='SCALAR';raw=array_bytes(j,b,i);return struct.unpack('<'+'f'*(len(raw)//4),raw)
def write(path,j,b):
 j['buffers']=[{'byteLength':len(b)}];raw=json.dumps(j,ensure_ascii=False,separators=(',',':')).encode();raw+=b' '*(-len(raw)%4);bb=bytes(b)+b'\x00'*(-len(b)%4)
 with Path(path).open('xb')as f:f.write(struct.pack('<4sII',b'glTF',2,28+len(raw)+len(bb))+struct.pack('<I4s',len(raw),b'JSON')+raw+struct.pack('<I4s',len(bb),b'BIN\x00')+bb)
def apply(source,manifest,dest):
 source=Path(source);manifest=Path(manifest);dest=Path(dest);assert not dest.exists()and source.resolve()!=dest.resolve();m=json.loads(manifest.read_text());j,b=load(source);before=bytes(b);old=copy.deepcopy(j)
 assert sha(canonical(clean_nodes(j)))==m['baseNodesSHA256'],'node/rest mismatch'
 p=j['meshes'][m['meshIndex']]['primitives'][m['primitiveIndex']];assert not p.get('targets'),'morphs already present'
 assert {k:sha(array_bytes(j,b,i))for k,i in p['attributes'].items()}==m['baseAttributeSHA256'],'geometry/skinning mismatch'
 assert sha(array_bytes(j,b,p['indices']))==m['baseIndexSHA256'],'topology mismatch'
 sk=j['skins'][0];assert sk['joints']==m['baseSkinJoints']and sha(array_bytes(j,b,sk['inverseBindMatrices']))==m['baseInverseBindSHA256'],'bind mismatch'
 payload=(manifest.parent/m['binary']).read_bytes();assert sha(payload)==m['binarySHA256'];node=m['meshNode'];assert j['nodes'][node]['mesh']==m['meshIndex']
 def add(raw,typ,count,minmax=None,target=None):
  b.extend(b'\x00'*(-len(b)%4));v={'buffer':0,'byteOffset':len(b),'byteLength':len(raw)}
  if target:v['target']=target
  j['bufferViews'].append(v);b.extend(raw);a={'bufferView':len(j['bufferViews'])-1,'componentType':5126,'count':count,'type':typ}
  if minmax is not None:a.update(min=minmax[0] if isinstance(minmax[0],list) else [minmax[0]],max=minmax[1] if isinstance(minmax[1],list) else [minmax[1]])
  j['accessors'].append(a);return len(j['accessors'])-1
 target={}
 for name,field in m['fields'].items():
  raw=payload[field['byteOffset']:field['byteOffset']+field['byteLength']];assert sha(raw)==field['sha256'];assert len(raw)==field['count']*12
  vals=struct.unpack('<'+'f'*(len(raw)//4),raw);bounds=([min(vals[k::3])for k in range(3)],[max(vals[k::3])for k in range(3)])
  target[name]=add(raw,'VEC3',field['count'],minmax=bounds,target=34962)
 p['targets']=[target];mesh=j['meshes'][m['meshIndex']];mesh['weights']=[0.];mesh.setdefault('extras',{})['targetNames']=[m['name']];j['nodes'][node]['weights']=[0.]
 assert bytes(b[:len(before)])==before
 for k in ['skins','materials','images','textures']:assert j.get(k)==old.get(k)
 write(dest,j,b);jj,bb=load(dest)
 for i in range(len(old['accessors'])):assert array_bytes(old,before,i)==array_bytes(jj,bb,i)
 return {'output':str(dest),'sha256':sha(dest.read_bytes()),'oldAccessorArraysByteExact':True,'clips':len(j['animations']),'newMorph':m['name'],'animationWeightsAdded':False,'runtimeVerified':False}
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('source');p.add_argument('manifest');p.add_argument('dest');a=p.parse_args();print(json.dumps(apply(a.source,a.manifest,a.dest),indent=2))
