import json,re,sys,urllib.parse
sys.path.insert(0,'.')
import kuvat
rec=kuvat.kerää()
kaup={k['id']:k for k in json.load(open('data/kaupungit.json'))['alkiot']}
OVR={'thessaloniki':'GRC','lyon':'FRA','nizza':'FRA','noumea':'FRA','monaco':'MCO'}
# oppaan v8 kohteet
d=json.load(open('data/opas-kuvat-v8.json'))
def cmaa(c): return OVR.get(c) or kaup.get(c,{}).get('maa')
for kid,k in d['kaupungit'].items():
    for x in k.get('kuvat',[]):
        rec.append(dict(polku='opas-v8-kaupunki',avain='url',kuva=x['url'],ctx={'nimi':k['nimi']},lyhyt=x.get('selite',''),lahde=x.get('tekija') or '',lisenssi=x.get('lisenssi') or '',lahdeUrl=x.get('lahdeUrl'),tyyppi=x.get('tyyppi'),
            lahdeaineisto='opas-v8',alkio=kid,maa=cmaa(kid),kaupunki=kid))
for q,k in d['kohteet'].items():
    for x in k.get('kuvat',[]):
        rec.append(dict(polku='opas-v8-kohde',avain='url',kuva=x['url'],ctx={'nimi':k['nimi'],'id':q},lyhyt=x.get('selite',''),lahde=x.get('tekija') or '',lisenssi=x.get('lisenssi') or '',lahdeUrl=x.get('lahdeUrl'),tyyppi=x.get('tyyppi'),
            lahdeaineisto='opas-v8',alkio=k['kaupunki'],maa=cmaa(k['kaupunki']),kaupunki=k['kaupunki']))
KW_GR=re.compile(r'akropol|acropol|parthenon|erechth|erekht|propyl|delphi|delfoi|olympia(?!kos)|knoss|knos|mycena|mykene|epidaur|meteora|vergina|\bdelos|sounion|bassae|vassai|corinth|korintti|agora|hephaist|hefaist|olympieion|panathena|panathin|mystras|daphni|hosios|loukas|phaist|festos|akrotiri|lindos|samothrac|antikythera|agamemnon|charioteer|artemision|kouros|karyatid|caryatid|nike|tuulten torni|tower of the winds|odeon|herodes|kallimarmaro|aigai|nafplio|palamidi|santorini|rhodes|rodos|rodokselle|kreeta|crete|heraklion|iraklion|national archaeological|kansallinen arkeologinen|akropolis-museo|acropolis museum|elgin|parthenonin marmori',re.I)
KW_FR=re.compile(r'louvre|tuileries|tuilerie|carrousel|versailles|fontainebleau|chambord|compi[eè]gne|saint-cloud|rambouillet|saint-germain-en-laye|marly|meudon|malmaison|vincennes|pierrefonds|coucy|villers-cotter|angers|\bpau\b|palais du rhin|palais-royal|palais de la cit|conciergerie|sainte-chapelle|[eé]lys[eé]e|pyramide',re.I)
def avain(r):
    u=r.get('lahdeUrl') or ''
    m=re.search(r'File:([^?#]+)',u)
    if m: return urllib.parse.unquote(m.group(1)).replace('_',' ')
    v=r['kuva']
    if r['avain']=='tiedosto': return v.replace('_',' ')
    return v
from collections import defaultdict
res={'GRC':{},'FRA':{}}
for r in rec:
    txt=' '.join([r['kuva'],r.get('lyhyt') or '',str(r.get('ctx'))])
    for tag,KW in (('GRC',KW_GR),('FRA',KW_FR)):
        inscope=(r['maa']==tag)
        hit=bool(KW.search(txt))
        if not (inscope or (hit and r['maa'] not in ('GRC','FRA'))): continue
        k=avain(r)
        e=res[tag].setdefault(k,dict(avain=k,kuva=r['kuva'],selite=r.get('lyhyt') or '',tekija=r.get('lahde') or '',lisenssi=r.get('lisenssi') or '',lahdeUrl=r.get('lahdeUrl'),tyyppi=r.get('tyyppi'),kayttopaikat=[],maa=r['maa'],osuma=hit))
        e['kayttopaikat'].append(f"{r['lahdeaineisto']}:{r['alkio']}:{(r.get('ctx') or {}).get('otsikko') or (r.get('ctx') or {}).get('nimi') or ''}")
        if not e['selite'] and r.get('lyhyt'): e['selite']=r['lyhyt']
        if not e['lisenssi'] and r.get('lisenssi'): e['lisenssi']=r['lisenssi']
for t in res:
    lst=list(res[t].values())
    json.dump(lst,open(f'kandidaatit-{t}.json','w'),ensure_ascii=False,indent=1)
    sc=sum(1 for e in lst if e['maa']==t);print(t,len(lst),'maassa',sc,'avainsana-osumaa muualta',len(lst)-sc)
