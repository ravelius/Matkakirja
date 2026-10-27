from pathlib import Path
import json,hashlib,shutil,datetime
import numpy as np
from PIL import Image
R=Path(__file__).resolve().parents[1];D=R/'stone-surfaces-v3'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def write(rel,t):
 p=D/rel;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(t)
def cp(src,rel):
 p=D/rel;p.parent.mkdir(parents=True,exist_ok=True)
 if p.exists():assert sha(p)==sha(src)
 else:shutil.copy2(src,p)
m=json.loads((D/'MATERIALS.json').read_text());jobs=json.loads((R/'texture-jobs.json').read_text());audit=[]
expected={'reunakivi':(360,266),'sokkeli':(1024,614),'sokkelin-ylapinta':(1024,51),'pilarin-etu':(307,614),'pilarin-sivu':(205,614),'lattialaatat':(1024,1024)}
assert len(m['materials'])==24
for mat in m['materials']:
 row={'name':mat['name'],'variant':mat['variant'],'files':[]}
 for f in mat['maps']:
  p=D/f['path'];assert sha(p)==f['sha256'];im=Image.open(p);im.load();assert im.size==expected[mat['name']];a=np.asarray(im);kind=f['kind'];check={k:f[k] for k in ['path','sha256','sizePx','colorSpace','bitDepth']}
  if kind=='normal-opengl':
   v=a.astype(float)/127.5-1;l=np.linalg.norm(v,axis=-1);assert np.max(abs(l-1))<.008;assert v[...,2].min()>0;check.update(maxUnitLengthError=float(np.max(abs(l-1))),minZ=float(v[...,2].min()))
  elif kind=='roughness':assert a.min()>=180 and a.max()<=245;check.update(min=int(a.min()),max=int(a.max()))
  elif kind=='height':assert im.mode in ['I;16','I'];h=a.astype(float)/65535*.007-.006;assert h.min()>=-.006 and h.max()<=.001;check.update(minMeters=float(h.min()),maxMeters=float(h.max()))
  else:assert a.ndim==3 and a.shape[-1]==3
  row['files'].append(check)
 audit.append(row)
for call in jobs['calls']:assert sha(Path(call['output']))==call['sha256']
for q in m['qa']:assert max(q['pillarCornerAlbedoHeightRoughnessMaxDelta'])<1e-6
write('qa/file-readback.json',json.dumps({'time':datetime.datetime.now(datetime.timezone.utc).isoformat(),'status':'PASS','materials':24,'maps':96,'dimensionsFromLRVerified':True,'hashesVerified':True,'sourcesUnchanged':True,'rows':audit},indent=2)+'\n')
for name in ['pelikoodari-codex-kujien-kivet-2d-pinnat-20261027.md','pelikoodari-codex-kujien-kivet-pintamitat-20261027.md','pelikoodari-codex-katot-friisit-seina-pintamitat-20261027.md']:cp(R/'sources'/name,'sources/'+name)
cp(R/'texture-jobs.json','SOURCE-INVENTORY.json');cp(R/'tools/bake_stone_uv_v3.py','tools/bake_stone_uv_v3.py');cp(Path(__file__),'tools/package_stones_v3.py')
write('KAYTTO.md','''# Kivipinnat 1191–1194 — Lavastajan UV-sopimus

Neljä muunnelmaa jokaiseen pintaan. Valitse sama v01–v04 sokkelille, sen yläpinnalle sekä pilarin etu- ja sivupinnalle. LR tekee geometrian ja asettaa pinnat nykyiseen peliin; tässä ei ole Tripo-malleja tai pelin koodimuutoksia.

| Pinta | Metriä (kuvan leveys × korkeus) | PNG px | Toisto |
|---|---|---|---|
| reunakivi | 0,70 × 0,52 | 360 × 266 | yksi kivi, Clamp |
| sokkeli | 2,00 × 1,20 | 1024 × 614 | X Repeat, Y Clamp |
| sokkelin-ylapinta | 2,00 × 0,10 | 1024 × 51 | X Repeat, Y Clamp |
| pilarin-etu | 0,60 × 1,20 | 307 × 614 | Clamp |
| pilarin-sivu | 0,40 × 1,20 | 205 × 614 | Clamp |
| lattialaatat | 2,00 × 2,00 | 1024 × 1024 | X/Y Repeat |

Sokkelissa neljä 0,30 m kivikertaa. Kuvan yläreuna on ylin kerta ja vastaa yläpintanauhan saumoja. Nauhan y=0 vastaa etureunaa. Pilarin etukuvan OIKEA reuna ja sivukuvan VASEN reuna liittyvät samaan ulkokulmaan: pitkä/lyhyt 0,40/0,20 m kivi vaihtuu kerroksittain, ei maalattua saumaa itse kulmaan. Kuvien korkeussuuntaa ei saa kääntää erikseen. Kaikkien varianttien kulman albedo/height/roughness-jatkuvuus tarkistettu yhtenäisen materiaaligraafin samassa kulmapisteessä.

Reunakiven avattu poikkileikkaus kuvan yläreunasta: 0,30 m yläpinta, 0,02 m viiste, 0,20 m etupinta (rajat pikselikoordinaateissa 153,462 ja 163,692). Ei päätysaumaa albedossa: 6 mm V-urasaumat tehdään LR:n geometriassa. Reunojen kuluma on maltillinen korkeus-/normaalipinta.

Lattian kuvan pystysuunta on kujan suunta. Neljä 0,50 m kaistaa, kivien pituus 0,60–1,20 m, lomitus; sokkelin kivipituudet 0,55–0,80 m. Sauma 1 cm, reunoilla alle millimetrin epäsäännöllisyys. Lattian kivet ovat viidessä lähellä toisiaan olevassa harmaassa sävyssä. Toistuva geometrinen jako ja lähikuvan mahdollinen toisto arvioidaan pelin kameralla.

Jokaisessa kansiossa:
- albedo: sRGB PNG, valaisematon pohjaväri. Esikatselun valoa/AO:ta/varjoa ei ole leivottu siihen.
- normal-opengl: lineaarinen tangenttiavaruuden +Y-normal map. PNG:n rivit kulkevat alas, tavallinen UV-v kulkee ylös. Jos importer käyttää DirectX/-Y-normalia, käännä vihreä kanava importerissa. Älä käännä koko kuvaa yhden kanavan sijasta.
- roughness: lineaarinen harmaasävy, valkea = karhea. Jos moottori käyttää smoothnessia, smoothness=1−roughness. Metallic=0.
- height: vapaaehtoinen 16-bit lineaarinen PNG, korkeus metreinä = arvo/65535 ×0,007 −0,006. Älä lisää displacementia normaalin lisäksi automaattisesti; normal riittää mobiiliin. Nämä eivät muuta törmäyspintaa.

Albedo on näytteistetty neljästä muuttumattomasta tekoälymateriaalipohjasta mittatarkan materiaaligraafin UV:illa. Saumat, viisteet ja vähäinen mikrokohouma ovat koodilla määriteltyjä. Normal/height eivät ole generoidun kuvan varjoista pääteltyä syvyyttä. Tämä on tekninen materiaalipaketin bake, ei uusi kuvagenerointi tai alkuperäisten havainnekuvien maalaus.

PNG-mitat ovat tarkoituksella osin ei-kahden-potensseja: ne ovat LR:n tarkka tilaus. Älä anna importerin neliöidä tai rajata niitä; mahdollinen kompressio/resample pitää säilyttää UV-alue. 512 px/m on pyöristetty annettuihin pikselimittoihin. Native-materiaalipohjat ovat 1254 ×1254, niiden alkuperäiset pikselit ja SHA:t T7:llä SOURCE-INVENTORY.json:n poluissa.

Tarkistettu: 96 tiedoston SHA/readback, tarkat koot, normalin yksikköpituus ja eteenpäin osoittava Z, height-metrialue, karheuden rajat, jatkuvat toistorajat, sokkelin yläpinnan samat saumakeskikohdat, pilarikulman yhteinen piste. Vertailuarkit näyttävät havainteen ja materiaalin teknisen esikatselun. Ne eivät ole valmiin pelin samasta kamerasta otettu parikuva. LR tekee seuraavaksi varsinaisen parikuvan; KK/omistajan hyväksyntä on avoin.
''')
write('LAHTEET.md','''# Lähteet ja kustannukset

Omistajan 27.10. hyväksymä Pelikoodarin 2D-pintatilaus bead49937 ja Lavastajan mitat bba13fd6b. Havainne-editorin 205842-02-kuva on tavoitekuva, alkuperäiset polut ja SHA:t projektijuuren references/sources.json:ssa. Neljä materiaalipohjaa tehtiin sisäänrakennetulla ImageGen-työkalulla tätä tilausta varten; 4 kutsua, 0 Tripo-kutsua, 0 Tripo-krediittiä. Kuvatyökalun rahakustannusta ei palautettu, sitä ei arvioida keksityllä numerolla.

Pohjien yhteinen kehotteen tarkoitus: vaalea lämmin/neutraali harmaa hienosti hakattu palatsikivi, litteä saumaton materiaaliväri ilman rakenteellisia saumoja, perspektiiviä, tekstiä, esineitä tai leivottuja varjoja. Muunnelmat: lämmin vaakahakkaus, viileämpi vaakahakkaus, sileämpi hieno vino jälki, lyhyt vaihteleva hakkaus. Tämä on aiempien kutsujen tarkoituksen yhteenveto, ei väite alkuperäisen kehotteen sanatarkasta taltiosta. Alkuperäiset kutsut keskustelun työkalulokissa, tiedostot ja hashit SOURCE-INVENTORY.json:ssa.

Uusia ulkopuolisia kuvalähteitä ei käytetty. Paikallinen materiaaligraafi ja bake-skripti mukana toistettavuutta varten; lähdekuvat säilyvät T7:llä muuttumattomina. V1/V2-kokeet säilyvät erillään; V3 poistaa lähdetekstuurin peilausrajan yksittäisten kivien sisältä ja toimitetaan. Ei gamecode-, haara-, käyttöoikeus-, asennus- tai ostomuutoksia.
''')
write('SHA256SUMS',''.join(f'{sha(p)}  {p.relative_to(D)}\n' for p in sorted(D.rglob('*')) if p.is_file() and p.name!='SHA256SUMS'))
report=f'''# Codex → Pelikoodari, Lavastaja, PT: kujien kivipinnat 1191–1194

Neljä muunnelmaa kuhunkin tilattuun pintaan on valmis tekniseen pelivertailuun: reunakivi, nelikerroksinen sokkeli, sen yläpinta, pilarin etu- ja sivupinta sekä lattialaatat. 24 pintasarjaa / 96 PNG:tä: albedo, OpenGL +Y normal, roughness ja vapaaehtoinen 16-bit height. Ei Tripo-geometriaa; muodot ja UV:t ovat LR:n työtä kuten muutetussa tilauksessa.

T7: `{D}`. Postissa samat PNG:t, metadata ja neljä havainnevertailua: `posti/juoksupeli-kujakivet-11911194-20261027/stone-surfaces-v3/`. SHA256SUMS kattaa kaikki. PNG-readback ja materiaalien rajat läpäisty; mitat juuri bba13fd6b:n mukaan, myös ei-kahden-potenssin kuvat. Sokkelin yläsaumat yhtyvät nauhaan, pilarin oikea etureuna yhtyy vasempaan sivureunaan. KAYTTO.md kertoo UV-suunnat, rajat ja väriavaruudet.

Neljä uutta ImageGen-pohjaa, ei lisäkuvakutsuja niiden jälkeen. Tripo 0 kutsua / 0 krediittiä. Normaalit, saumat ja karheus ovat mittatarkan materiaaligraafin tuotantoa; lähdepohjat säilyvät muuttumattomina. Esikatselun valo ei ole albedossa. 4–5 lähellä toisiaan olevaa kivisävyä, maltillinen kuluma. Tämä ei vielä vahvista pelin lähikameran materiaali-ilmettä tai toiston huomaamattomuutta.

LR: sovita nykyisiin muotoihin ja ota sama kamerakulma/valaistus havainteen kanssa. Huomioi UV:n suunnat, lineaariset normal/roughness-kartat ja smoothness-inversio tarvittaessa. Palauta SHA + asetukset + parikuva, jos korjattavaa. KK/omistaja hyväksyy parikuvasta; tekninen paketti ei ole peli-integraation kuittaus.

Jatkan tilaamassanne järjestyksessä keltatiilikattoihin, friiseihin ja rappaukseen, tarkat pintamitat 7eb80206 luettu. Olavinlinnan J3/J4-aarteet toimitettiin erikseen 0cba769bd3a742e530b2fe36271c03e68062e7a1.
'''
(R/'TOIMITUS-KIVET-v3.md').write_text(report);print(json.dumps(dict(materials=24,maps=96,qa='PASS',package=str(D))))
