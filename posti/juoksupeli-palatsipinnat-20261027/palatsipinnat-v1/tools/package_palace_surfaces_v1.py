from pathlib import Path
import json,hashlib,shutil,datetime
import numpy as np
from PIL import Image
R=Path(__file__).resolve().parents[1];D=R/'palatsipinnat-v1';D.mkdir(exist_ok=True)
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def cp(src,rel):
 p=D/rel;p.parent.mkdir(parents=True,exist_ok=True)
 if p.exists():assert sha(p)==sha(src)
 else:shutil.copy2(src,p)
def write(rel,text):
 p=D/rel;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(text)
for source,target in [('roof-surfaces-v2','katot'),('frieze-surfaces-v1','friisit'),('plaster-surfaces-v1','rappaus')]:
 for p in sorted((R/source).rglob('*')):
  if p.is_file():cp(p,Path(target)/p.relative_to(R/source))
for family in ['roof','frieze','frieze-v2','plaster']:cp(R/f'{family}-texture-jobs.json','sources/'+family+'-texture-jobs.json')
for name in ['pelikoodari-codex-katot-friisit-seina-tilaus-20261027.md','pelikoodari-codex-katot-friisit-seina-pintamitat-20261027.md']:cp(R/'sources'/name,'sources/'+name)
for s in ['bake_roof_uv_v2.py','bake_frieze_uv_v1.py','bake_plaster_uv_v1.py','package_palace_surfaces_v1.py']:cp(R/'tools'/s,'tools/'+s)
cp(R/'references/sources.json','sources/reference-inventory.json')
checks=[]
for p in sorted(D.glob('*/pinnat/*/*.png')):
 im=Image.open(p);im.load();a=np.asarray(im);group=p.relative_to(D).parts[0];stem=p.name
 size=(512,512) if group=='katot' else ((512,32) if stem.startswith('kultalista') else (2048,512)) if group=='friisit' else ((2048,256) if 'alalika' in stem else (2048,2048))
 assert im.size==size,(p,im.size,size);row=dict(path=str(p.relative_to(D)),sha256=sha(p),bytes=p.stat().st_size,sizePx=list(im.size),mode=im.mode,colorSpace='sRGB' if '-albedo' in stem else 'linear')
 if '-normal-' in stem:
  n=a.astype(np.float32)/127.5-1;err=float(np.max(abs(np.linalg.norm(n,axis=-1)-1)));assert err<.008 and n[...,2].min()>0;row['normalLengthMaxError']=err
 if '-height' in stem:assert im.mode in ['I;16','I']
 if '-roughness' in stem:assert int(a.min())>0 and int(a.max())<255
 checks.append(row)
assert len(checks)==88,len(checks)
write('qa/readback.json',json.dumps(dict(status='PASS',time=datetime.datetime.now(datetime.timezone.utc).isoformat(),pngMaps=88,dimensionsVerified=True,normalVectorsVerified=True,height16bitVerified=True,files=checks),indent=2)+'\n')
write('MANIFEST.json',json.dumps(dict(scope='Roof, frieze, red plaster 2D surfaces per LR metric UV contract',variantsEach=4,maps=checks,imageCallsThisPackage=15,imageCallsIncludingDeliveredStones=19,tripoCalls=0,tripoCredits=0,receiverAccepted=False,gameIntegrated=False,ownerAccepted=False),indent=2)+'\n')
write('KAYTTO.md','''# Palatsin pintakuvat: katto, friisi ja rappaus

Neljä muunnelmaa jokaisesta, Lavastajan 7eb80206:n UV-mitat. Kaikki pinnat ovat paikallisia PNG-materiaaleja; geometrian, törmäykset ja pelin koodin tekee vastaanottaja. Ei uusia Tripo-malleja.

| Pinta | Kuva | Metrit | UV/toisto |
|---|---|---|---|
| katto | 512 ×512 | 1 ×1 | X/Y repeat, u räystään suunta, kuvan yläreuna harjalla, alareuna alamäkeen |
| friisi | 2048 ×512 | 4,13 ×1,03 | X repeat, Y clamp, yläreuna räystäällä |
| kultalista | 512 ×32 | 1 ×0,06 | X repeat, Y clamp |
| rappaus | 2048 ×2048 | 4 ×4 | X/Y repeat, u seinän suunta, UV-v ylös maasta |
| rappauksen alalika | 2048 ×256 | 4 ×0,50 | X repeat, Y clamp, maailman Y 1,20…1,70 m |

Albedo sRGB, kaikki muut kartat lineaarisina. Normal on tangenttiavaruuden OpenGL +Y. Tarvittaessa DirectX-importeri kääntää vihreän kanavan, ei koko kuvaa. Roughness: valkea karhea; smoothness=1−roughness. Katoille ja rappaukselle metallic=0, friisin kultakohtiin ja kultalistaan mukana erillinen maltillinen metallic-kartta (0,7 kullassa, 0 muualla); sitä voi pienentää pelin valaistusvertailussa.

Katto: neljä pyöreää kansitiili/koururiviä metrillä, neljä 0,25 m limitystä alamäkeen. Normaalikartta on laskettu kaarevasta profiilista; korkeusvaihtelu noin viisi senttiä. Vapaaehtoinen 16-bit height: arvo/65535 ×0,065 −0,025 metriä. Käytä oletuksena normalia, älä lisää displacementia tai törmäysgeometriaa automaattisesti. Normal ei muuta katon siluettia tai peitä räystästä; valmiit räystään päätetiilet/harja säilyvät. 2D-esikatselu valaisee tätä profiilia, mutta ei osoita pelin vinon kameran lopputulosta.

Friisi: neljä kukka-/pilvi-/köynnösaihetta. Alkuperäiset kolme liian huonosti toistuvaa ehdokasta säilytetty erillään; toimitetut 1–3 ovat kokonaan uusia kuvia. Variantti 4 on ensimmäisen kierroksen parannettu reunaratkaisu. Toistossa ornamenttien väliin jää kapea sinivihreä rauhallinen alue. Native-kuva 2172 ×724 on normalisoitu kokonaisena LR:n 2048 ×512 UV-suorakulmioon ilman rajausta tai käsinmaalausta: ornamenttien kuvasuhde siis muuttuu, sitä ei väitetä alkuperäisen pikselimitan säilymiseksi. Kultakuvion kohotus 0,35 mm, height=arvo/65535 ×0,001 m. Toistoreunat ovat visuaalisen toleranssin sisällä (keskiero noin 1,15–2,15/255), eivät pikseli-identtiset: etenkin kultaviivan satunnainen noin pikselin porrastus pitää arvioida pelin lähikameralla. Saumat esikatselu/friisi-vNN-toistosauma.png.

Rappaus: neljä sävy-/laikkumuunnelmaa. Native-pohjat 1254 ×1254, toimituksen 2048 px ei ole natiivi 2K-generointi. Materiaaligraafi näytteistää muuttumattomia pohjia neljällä jaksollisella UV-projektiolla pehmeästi; toistorajat jatkuvat, mutta mahdollinen toiston havaittavuus arvioidaan 4 m ruudukolla pelissä. Normaali on maltillinen alle millimetrin pinnan vaihtelu, ei näkyvien värivarjojen automaattinen syvyysarvio. Height=arvo/65535 ×0,002 −0,001 m.

Alalika on erillinen RGB-pintanauha samasta rappauksesta ja lisäksi lineaarinen dirt-mask: 0 ei likaa, 255 täysi. Nauhan alareuna tulee sokkelin yläpuolelle 1,20 m korkeuteen, yläreuna 1,70 metriin. Kuva on laskettu pääseinän maasta alkavan 4 m UV-vaiheen mukaan, joten nauhan yläreuna vastaa seinän samaa kohtaa. Jos LR:n seinä-UV alkaa eri korkeudesta, käytä dirt-maskia oman seinän pohjavärin päällä tai siirrä UV-vaihetta; älä liitä eri varianttia tai eri UV-vaihetta saumattomuuden oletuksella. Lika on materiaalin värikerros, ei valaistu varjo. Height ei vaikuta törmäyksiin.

Kaikki esikatselut ovat teknisiä materiaalikuvia havainteen rinnalla. Varsinainen sama kamera + sama valo -parikuva on LR:n seuraava vaihe. Vastaanottokuittaus, peli-integraatio, KK ja omistajan hyväksyntä ovat erillisiä ja avoimia. Palautteeseen variantti, tiedoston SHA, importin väriavaruudet/normal-suunta ja kuvapari.
''')
write('LAHTEET.md','''# Lähteet ja työmäärä

Omistajan tilaamat kattotiili-, friisi- ja rappauspinnat (Pelikoodari 2258b56d; LR mitat 7eb80206). Tavoitteet havainne-editori-20261027-205842/02, /01, /05, T7-kopiot ja alkuperäisten SHA:t sources/reference-inventory.json. Ei uusia ulkopuolisia kuva- tai 3D-lähteitä.

Sisäänrakennettu ImageGen: katot 4, friisit 7 (kolme ensimmäistä hylätty toistosaumasta ja tehty kokonaan uusiksi, vanhat säilyvät), rappaus 4 = 15 kuvakutsua tässä paketissa. Aiemmin toimitetut kivet 4, koko pintatilauksen yhteensä 19 kutsua. Tripo-kutsuja 0, Tripo-krediittejä 0. Kuvatyökalu ei palauttanut rahakustannusta, sitä ei keksitä. Kaikki sanatarkat kehotteet, native-polut, valitut lähteet ja SHA:t sources/*-texture-jobs.json:ssa. Kuvien tila oli GENERATED ennen vientiä; ei uusintaa jo onnistuneesta samasta jobista.

Alkuperäisiä lähdekuvia ei ylikirjoiteta. UV-mitoitus, analyyttiset kaarevuus-/maalipaksuus-/karheuskartat ja esikatselut tuotetaan paikallisesti mukana olevilla skripteillä yhden CPU-työn kerrallaan. Skriptien lähderoot on alkuperäinen T7-työkansio juoksupeli-kujakivet-11911194-20261027 (lähteet texture-native/ ja references/), ei tämä itsenäinen toimituskansio. Ei raskasta GPU-/videorenderiä, asennusta, ostoa, pelin koodimuutosta tai käyttöoikeusmuutosta.
''')
write('SHA256SUMS',''.join(f'{sha(p)}  {p.relative_to(D)}\n' for p in sorted(D.rglob('*')) if p.is_file() and p.name!='SHA256SUMS'))
text=f'''# Codex → Pelikoodari, Lavastaja, PT: katot, friisit ja punainen rappaus

Tilaus 2258b56d ja tarkat UV-mitat 7eb80206 tehty tekniseen pelivertailuun. Neljä muunnelmaa/kategoria, yhteensä 88 PNG-materiaalikarttaa: katot, friisit ja kultalista, rappaus ja 0,5 m alalikajuova. Albedo + OpenGL +Y normal + roughness; height vapaaehtoinen, kultaan metallic, likaan maski. 12 havainnevertailuarkkia ja neljä friisin saumakuvaa.

T7: `{D}`. Sama paketti postissa `posti/juoksupeli-palatsipinnat-20261027/palatsipinnat-v1/`. SHA256SUMS, MANIFEST ja qa/readback.json mukana. Kaikki 88 PNG:tä luettu takaisin, koot ja normalien yksikköpituudet tarkistettu. Ei Tripo-malleja tai muutoksia pelin koodiin.

Katto 512² / 1 m, neljä kaarevaa tiiliriviä ja 25 cm limitys. Friisi 2048×512 / 4,13×1,03 m; lista 512×32 /1×0,06m. Rappaus 2048² /4m, alalika2048×256 /4×0,5m sokkelin yläpuolella. Väriavaruudet, normalin suunta, toistot ja tarkka alalikan UV-vaihe KAYTTO.md:ssä.

Rajat rehellisesti: normal ei muuta katon siluettia. Rappauksen native1254px on viety2048px:iin; ei natiivi2K-lupaus. Friisin native3:1 on normalisoitu4:1-kuvaan, ja reunoissa voi olla kultaviivan noin pikselin porrastus (reunojen keskiero1,15–2,15/255). Tämä kuuluu pelin lähikameran parikuvatarkastukseen. Lähikuvan toiston huomaamattomuutta ei ole hyväksytty ilman peliä.

Kutsut tässä paketissa15ImageGen:4katto+7friisi+4rappaus; niistä kolme hylättyä friisiä säilytetty. Koko pintatilauksessa kivet mukaan lukien19. Tripo0 /0krediittiä. Kuvatyökalun rahakustannus ei ollut saatavilla.

LR: sovita nykyiseen geometriaan ja ota pari tavoitehavainteen kanssa samalla kameralla ja valolla. KK/omistajan hyväksyntä on avoin. Kivipinnat toimitettu erikseen c56b5c011134f5ab50c2e8a44bfb75fd83af8c32.

Natiivisepälle: luin aarteen teknisen vastaanoton ee4e944f3f0a8299335559e4d8b0487cccf62079 kokonaan ja kirjasin kaikki viisi havaintoa. J3/J4 teknisesti vastaanotettu; en tee korjauksia ennen ilmoittamaasi pelin valon, käsi-/arkkusovituksen ja J4-kahvan kuvaparia. Alkuperäiset ja toimitus pysyvät muuttumattomina.
'''
(R/'TOIMITUS-PALATSIPINNAT-v1.md').write_text(text);print(json.dumps(dict(package=str(D),maps=88,files=sum(1 for p in D.rglob('*') if p.is_file()),bytes=sum(p.stat().st_size for p in D.rglob('*') if p.is_file()),qa='PASS')))
