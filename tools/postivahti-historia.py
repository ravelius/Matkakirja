import json,os,sys,time
d='/Users/Shared/Claude/Matkakirja-fable/scratchpad/asemataulu/'
viikko,viisi=int(sys.argv[1]),int(sys.argv[2])
now=int(time.time()*1000)
rows=[]
try:
    rows=[json.loads(l) for l in open(d+'historia.jsonl') if l.strip()]
except FileNotFoundError: pass
def near(age):
    t=now-age
    c=[r for r in rows if r['ts']<=t+600000]
    return min(c,key=lambda r:abs(r['ts']-t)) if c else None
rows.append({"ts":now,"viikko":viikko,"viisi":viisi})
rows=[r for r in rows if r['ts']>now-86400000]
open(d+'historia.jsonl.tmp','w').write('\n'.join(json.dumps(r) for r in rows)+'\n'); os.replace(d+'historia.jsonl.tmp',d+'historia.jsonl')
m=json.load(open(d+'mittarit.json'))
for l in m['laatat']:
    if l['nimi']=='Viikko':
        p=near(5*3600000)
        if p: l['muutos']='+%d %%'%(viikko-p['viikko'])
    if l['nimi']=='5 tuntia':
        p=near(3600000)
        if p: l['muutos']='nollautui' if viisi<p['viisi'] else '+%d %%'%(viisi-p['viisi'])
        l['prosentti']=viisi
        if len(sys.argv)>4: l['nollautuu']=sys.argv[4]
    if l['nimi']=='Viikko': l['prosentti']=viikko
m["ts"]=now
m["pt_konteksti"]=int(sys.argv[3]) if len(sys.argv)>3 else m.get("pt_konteksti")
open(d+'mittarit.json.tmp','w').write(json.dumps(m,ensure_ascii=False)); os.replace(d+'mittarit.json.tmp',d+'mittarit.json')
