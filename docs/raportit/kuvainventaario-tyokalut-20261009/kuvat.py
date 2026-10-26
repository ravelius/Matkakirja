import json,re,sys,os
D='data/'
IMG=re.compile(r'\.(jpe?g|png|webp|gif|tiff?)(\?|$)',re.I)
def L(n): return json.load(open(D+n+'.json'))
kaup={k['id']:k for k in L('kaupungit')['alkiot']}
def maa_of(a,coll):
    if a.get('maa'): return a['maa']
    c=a.get('kaupunki') or a.get('id','')
    c=c.split(':')[0]
    return kaup.get(c,{}).get('maa')
def kuvarekordit(o,path,ctx,out):
    if isinstance(o,dict):
        c=dict(ctx)
        for k in ('nimi','otsikko','id','tunnus'):
            if isinstance(o.get(k),str): c[k]=o[k]
        for k in ('tiedosto','osoite','url','kuva','tiedostonimi','src'):
            v=o.get(k)
            if isinstance(v,str) and (k=='tiedosto' or IMG.search(v) or 'commons.wikimedia' in v):
                out.append(dict(polku=path,avain=k,kuva=v,ctx={x:c.get(x) for x in ('nimi','otsikko','id')},
                    lyhyt=o.get('lyhyt') or o.get('selite') or '',lahde=o.get('lahde') or o.get('tekija') or '',lisenssi=o.get('lisenssi') or ''))
        for k,v in o.items(): kuvarekordit(v,path+'/'+k,c,out)
    elif isinstance(o,list):
        for i,v in enumerate(o): kuvarekordit(v,path+f'[{i}]',ctx,out)
def kerää():
    rec=[]
    for coll in ['kaupunkilehdet','maalehdet','nahtavyydet','kohdekartat','fokusvirrat','takynostot','karttavalot']:
        for a in L(coll)['alkiot']:
            m=maa_of(a,coll)
            out=[];kuvarekordit(a,'',{},out)
            for r in out:
                r.update(lahdeaineisto=coll,alkio=a.get('id'),maa=m,kaupunki=a.get('kaupunki'));rec.append(r)
    for f in ['fokuskohteet-grc','fokuskohteet-fra','maastokohteet-fra','hahmotelma-grc','hahmotelma-fra','fokus-grc']:
        d=L(f);out=[];kuvarekordit(d,'',{},out)
        for r in out: r.update(lahdeaineisto=f,alkio=f,maa='GRC' if f.endswith('grc') else 'FRA',kaupunki=None);rec.append(r)
    # oppaan kuvat
    ok=json.load(open(D+'oppaan-kuvat.json'))
    for kid,k in ok['kaupungit'].items():
        m=kaup.get(kid,{}).get('maa')
        for x in k.get('kuvat',[]):
            rec.append(dict(polku='kuvat',avain='tiedosto',kuva=x['tiedosto'],ctx={'nimi':k['nimi']},lyhyt=x.get('selite',''),lahde=x.get('tekija',''),lisenssi=x.get('lisenssi',''),
                lahdeaineisto='oppaan-kuvat',alkio=kid,maa=m,kaupunki=kid,lahdeUrl=x.get('lahdeUrl')))
        for q,x in (k.get('kohdekuvat') or {}).items() if isinstance(k.get('kohdekuvat'),dict) else []: pass
    return rec
if __name__=='__main__':
    rec=kerää()
    json.dump(rec,open('kaikki-kuvarekordit.json','w'),ensure_ascii=False)
    from collections import Counter
    print(len(rec));print(Counter(r['maa'] for r in rec).most_common(5))
    print(Counter((r['lahdeaineisto'],r['maa']) for r in rec if r['maa'] in ('GRC','FRA')).most_common(40))
