"""Oma viivapiirros: pelkistetty kolmiulotteinen rakennusgeometria, ei kuvan jäljennös."""
from pathlib import Path
import math, random, json, html
random.seed(1475)
OUT=Path(__file__).parent
INK='#44372c'
W,H=2048,1560
S=7.4
# Itä oikealle, etelä etualalle. Oma kaaviollinen koordinaatisto, ei mittapiirros.
def P(x,y,z=0): return (520+S*x+2.5*y, 770-2.1*x+4.0*y-7.0*z)
def ps(points): return ' '.join(f'{x:.2f},{y:.2f}' for x,y in points)
shapes=[]; clips=[]
def line(a,b,sw=1.1,op=1):
 shapes.append(f'<path d="M{a[0]:.2f},{a[1]:.2f} L{b[0]:.2f},{b[1]:.2f}" fill="none" stroke-width="{sw}" opacity="{op}"/>')
def path(d,sw=1.8,fill='black',extra=''):
 shapes.append(f'<path d="{d}" stroke-width="{sw}" fill="{fill}" {extra}/>')
def poly(pts,sw=1.7,fill='black'):
 shapes.append(f'<polygon points="{ps(pts)}" stroke-width="{sw}" fill="{fill}"/>')
def ellipse(x,y,rx,ry,sw=1.2,fill='black'):
 shapes.append(f'<ellipse cx="{x}" cy="{y}" rx="{rx}" ry="{ry}" stroke-width="{sw}" fill="{fill}"/>')
def hatch(pts,step=9):
 cid=f'clip-{len(clips)}'; clips.append(f'<clipPath id="{cid}"><polygon points="{ps(pts)}"/></clipPath>')
 lo=min(p[0] for p in pts);hi=max(p[0] for p in pts);yb=max(p[1] for p in pts);yt=min(p[1] for p in pts)
 shapes.append(f'<g clip-path="url(#{cid})" fill="none" stroke-width="0.62" opacity="0.55">')
 x=lo-(yb-yt)
 while x<hi:
  line((x,yb+2),(x+yb-yt+4,yt-2),.62,.7);x+=step
 shapes.append('</g>')
def stone_face(a,b,z0,z1,texture=True):
 face=[P(*a,z0),P(*b,z0),P(*b,z1),P(*a,z1)];poly(face)
 if not texture:return
 if z1-z0>=6:
  t=.12; c=(a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t)
  hatch([P(*a,z0),P(*c,z0),P(*c,z1),P(*a,z1)],7)
 for h in range(int(z0)+2,int(z1),2):
  # Discontinuous mortar lines: enough masonry to suggest stone, without a tile grid.
  for t in [0.02,.27,.55,.79]:
   u=min(1,t+random.uniform(.11,.21)); v=h+random.uniform(-.25,.25)
   p0=P(a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,v)
   p1=P(a[0]+(b[0]-a[0])*u,a[1]+(b[1]-a[1])*u,v+.1)
   line(p0,p1,.55,.72)
 for t in [.1,.34,.64,.86]:
  x=a[0]+(b[0]-a[0])*t;y=a[1]+(b[1]-a[1])*t
  line(P(x,y,z0+.3),P(x,y,z0+1.4),.6,.6)
def wall(a,b,height=7,width=2):
 dx=b[0]-a[0];dy=b[1]-a[1]; ll=math.hypot(dx,dy); nx=-dy/ll*width;ny=dx/ll*width
 a2=(a[0]+nx,a[1]+ny);b2=(b[0]+nx,b[1]+ny)
 stone_face(a,b,0,height)
 poly([P(*a,height),P(*b,height),P(*b2,height),P(*a2,height)],1.1)
 for t in [.12,.32,.52,.73,.9]:
  x=a[0]+dx*t;y=a[1]+dy*t
  q=P(x,y,height*.54);path(f'M{q[0]-3},{q[1]} l6,-1 l0,5 l-6,1 Z',.6,'white')
def block(x,y,w,d,height,roof=0):
 # Two visible elevations; roof ridges are explicitly drawn, not projected photo edges.
 stone_face((x+w,y),(x+w,y+d),0,height)
 stone_face((x,y+d),(x+w,y+d),0,height)
 poly([P(x,y,height),P(x+w,y,height),P(x+w,y+d,height),P(x,y+d,height)],1.5)
 if roof:
  r0=P(x,y+d/2,height+roof);r1=P(x+w,y+d/2,height+roof)
  poly([P(x,y,height),P(x+w,y,height),r1,r0],1.5)
  poly([r0,r1,P(x+w,y+d,height),P(x,y+d,height)],1.5)
  for t in [.08,.17,.27,.38,.5,.62,.73,.84,.94]:
   line(P(x+w*t,y+d/2,height+roof),P(x+w*t,y+d,height),.75,.85)
 for h in range(4,int(height)-1,5):
  for t in [.17,.43,.7,.9]:
   xx=x+w*t
   a=P(xx-.45,y+d+.08,h); b=P(xx+.45,y+d+.08,h+1.6)
   path(f'M{a[0]},{a[1]} L{b[0]},{a[1]-.7} L{b[0]},{b[1]} L{a[0]},{b[1]+.7} Z',.8,'white')
def bastion(points,height=6):
 # Open courtyard: inner parapet and stone faces keep bastion shape readable.
 for i in range(len(points)):
  a=points[i];b=points[(i+1)%len(points)]
  if (a[1]+b[1])/2>30:stone_face(a,b,0,height)
 poly([P(x,y,height) for x,y in points],1.5)
 cx=sum(x for x,y in points)/len(points);cy=sum(y for x,y in points)/len(points)
 inner=[(cx+(x-cx)*.73,cy+(y-cy)*.73) for x,y in points]
 poly([P(x,y,height-.8) for x,y in inner],1)
 # Floor hatch only in a corner of the enclosed yard.
 hatch([P(*inner[0],height-.8),P(*inner[1],height-.8),P(cx,cy,height-.8)],10)
def tower(x,y,r,height=29,roofh=10):
 bx,by=P(x,y,0);tx,ty=P(x,y,height)
 rx=r*S;ry=r*3.5
 d=f'M{tx-rx},{ty} A{rx},{ry} 0 0 0 {tx+rx},{ty} L{bx+rx},{by} A{rx},{ry} 0 0 1 {bx-rx},{by} Z'
 path(d,2.1)
 for z in range(2,height,2):
  cx,cy=P(x,y,z)
  for l in range(4):
   start=-.93+l*.47;end=min(.94,start+random.uniform(.21,.38));x0=cx+rx*start;x1=cx+rx*end
   yy0=cy+ry*math.sqrt(1-start*start);yy1=cy+ry*math.sqrt(1-end*end)
   path(f'M{x0},{yy0} Q{(x0+x1)/2},{max(yy0,yy1)+.5} {x1},{yy1}',.64,'none')
  if z%4==0:
   for t in [-.72,-.21,.32,.77]:
    y0=cy+ry*math.sqrt(1-t*t)
    line((cx+rx*t,y0),(cx+rx*t,y0+6),.55,.6)
 for z,t in [(8,-.22),(17,.21),(24,-.15)]:
  cx,cy=P(x,y,z);xx=cx+rx*t;yy=cy+ry*math.sqrt(1-t*t)
  path(f'M{xx-3.2},{yy+4} L{xx-3.2},{yy-9} Q{xx},{yy-14} {xx+3.2},{yy-9} L{xx+3.2},{yy+4} Z',.8,'white')
 # Overhanging upper course and octagonal roof with a short, vertical lantern at the tip.
 ellipse(tx,ty-3,rx+5,ry+2,1.5)
 apex=P(x,y,height+roofh)
 poly([(tx-rx-5,ty-4),apex,(tx+rx+5,ty-4)],2)
 hatch([(tx-rx-5,ty-4),apex,(tx-rx*.3,ty-4+ry*.5)],7)
 for t in [-.84,-.6,-.34,0,.36,.65,.88]:
  line(apex,(tx+(rx+5)*t,ty-4+ry*.75*math.sqrt(1-t*t)),.9)
 for k in range(1,8):
  t=k/9; yy=apex[1]+(ty-4-apex[1])*t; rr=(rx+5)*t
  line((tx-rr*.91,yy),(tx-rr*.55,yy+5),.75,.65)
 line((apex[0],apex[1]),(apex[0],apex[1]-16),1)
 return (tx,ty)
# Island contour is deliberately drawn freehand around the building masses.
island=[(-5,20),(1,8),(15,9),(38,8),(60,4),(91,-4),(105,2),(110,24),(117,33),(117,48),(108,58),(95,74),(85,78),(72,90),(60,82),(40,81),(18,92),(6,86),(1,57),(-7,43)]
poly([P(x,y,-.6) for x,y in island],1.8)
for a,b in zip(island[5:],island[6:]+[island[0]]):
 line(P(*a,-.8),P(*b,-2.1),.72,.6)
for _ in range(38):
 x=random.uniform(10,106); y=random.uniform(73,87)
 if x<34 or x>77:
  q=P(x,y,-.8);line(q,(q[0]+random.uniform(5,17),q[1]-3),.75,.6)
# Far defences: northern curtain, Suvorov's long narrow outwork, eastern battery.
wall((42,12),(91,5),9)
bastion([(95,-1),(104,1),(109,22),(113,22),(114,32),(105,35),(101,19)],5)
wall((94,10),(99,37),10)
# Esilinnan north range and barracks.
block(45,14,45,9,14,4)
block(49,26,26,10,9,3)
# Courtyard: shallow stone paving with a light broken-line texture.
for _ in range(35):
 x=random.uniform(53,91);y=random.uniform(41,64);q=P(x,y,.1)
 line(q,(q[0]+random.uniform(4,12),q[1]-1),.56,.6)
# Main castle north wing, east range, adjutant residence. Courtyard remains open.
block(16,18,22,11,17,3)
block(35,26,9,29,17,4)
block(18,34,12,11,11,4)
# Kijli, Church and Bell towers: exactly three surviving towers.
tower(92,6,7,28,10)
tower(40,17,7.1,30,11)
tower(15,24,7.6,31,11)
# Late outer bastions and batteries, foreground faces drawn after towers.
bastion([(-5,23),(0,16),(9,18),(10,30),(0,32)],5)
bastion([(4,50),(14,50),(23,61),(18,78),(5,87),(-1,60)],6)
bastion([(89,46),(100,42),(109,53),(102,65),(87,63)],6)
bastion([(57,71),(70,69),(76,78),(67,90),(56,81)],5)
wall((14,44),(36,63),9)
wall((31,64),(55,72),6)
block(58,62,24,9,10,3)
block(43,49,6,9,9,2)
wall((82,65),(93,48),9)
# Western main gate, new outer court and gate passage.
wall((0,38),(5,49),7)
wall((1,36),(11,46),7)
block(10,44,15,8,8,0)
# Portal opening on front face; arched vault.
q=P(4,44,1);path(f'M{q[0]-12},{q[1]} l0,-24 Q{q[0]},{q[1]-39} {q[0]+12},{q[1]-24} l0,24 Z',1,'white')
# Extant foundations of demolished Eerik tower: low annular ruin, not a fourth tower.
cx,cy=P(40,62,.5);ellipse(cx,cy,21,10,1.4);ellipse(cx,cy,11,5,1)
# Pontoon footbridge approaches from southwest; deck and railings.
bridge=[(-18,84),(2,46),(6,48),(-14,86)]
poly([P(x,y,0) for x,y in bridge],1.5)
for t in [i/15 for i in range(16)]:
 x=-18+20*t;y=84-38*t
 line(P(x,y,0),P(x+4,y+2,0),.65)
 if t in [0,.2,.4,.6,.8,1.0]:
  line(P(x,y,0),P(x,y,1.8),.75);line(P(x+4,y+2,0),P(x+4,y+2,1.8),.75)
line(P(-18,84,1.8),P(2,46,1.8),1);line(P(-14,86,1.8),P(6,48,1.8),1)
# Current jetty position is a game interpretation; no fictitious moored fleet.
poly([P(-1,58,0),P(-9,64,0),P(-7,67,0),P(1,61,0)],1.2)
for k in range(7):
 line(P(-1-k,58+k*.75,.1),P(1-k,61+k*.75,.1),.65)
# Small quiet marks in the surrounding water, not a painted background.
for x,y,span in [(-10,70,6),(10,99,10),(39,89,7),(76,99,9),(111,67,10),(118,48,6),(-8,36,5),(104,-5,7)]:
 q=P(x,y,-3);line(q,(q[0]+span*S,q[1]-2),.65,.5)
# Label targets are in the same coordinate system. Interior/tulkinta leaders dashed.
labels=[]
def L(name,target,side,source,kind='osa',detail='',sub=''):
 labels.append(dict(name=name,target=P(*target),side=side,source=source,kind=kind,detail=detail,sub=sub))
PDF='Senaatti / Hakanpää 2019, paikannuskartta s. 6'
L('Kellotorni',(15,24,38),'left',PDF)
L('Kellotornin fatabuuri',(15,24,3),'left','Peli: fatabuuri.js; Hakanpää 2019, s. 183','tila','Sisätila, B 101','sisätila')
L('Päälinnan pohjoissiipi',(26,22,19),'left',PDF)
L('Keskushalli ja väentupa',(27,27,10),'left','Peli: keskushalli.js; Hakanpää 2019, s. 193','tila','Pelin nimi; pohjoissiiven keskushalli D 101','sisätila')
L('Adjutantin rakennus',(24,42,14),'left',PDF)
L('Päälinna (pääkastelli)',(29,28,17),'left',PDF)
L('Päälinnan piha',(31,48,0),'left',PDF+'; s. 33')
L('Läntinen kehämuuri',(23,52,8),'left',PDF,'osa','Päälinnan läntinen kehämuuri')
L('Tornin kierreportaat (tulkinta)',(11,28,17),'left','Peli: kierreportaat.js','tulkinta','Pelin sisätilan tulkinta, ei rakennusinventointi','pelin tulkinta')
L('Kellobastioni',(1,26,4),'left',PDF)
L('Uusi esilinna',(16,47,7),'left',PDF)
L('Pääportti',(4,44,3),'left','Hakanpää 2019, s. 56')
L('Vesiportin bastioni',(9,66,5),'left',PDF)
L('Ponttonisilta',(-8,66,0),'left','Hakanpää 2019, s. 56')
L('Laituri ja kavassit',(-4,62,0),'left','Peli: laituri.js','tulkinta','Nimi on pelistä; nykyisen laiturin paikka on kaaviollinen. Kavasseja ei ole piirretty nykyasuun.','pelin tulkinta')
L('Kirkkotorni',(40,17,36),'top',PDF)
L('Kirkkotornin kappeli',(40,17,19),'top','Peli: kappeli.js','tila','Tornin kappeli, kolmas kerros','sisätila')
L('Muurinharja',(28,20,17),'top','Peli: muurinharja.js','tila','Pelin kulkutila päälinnan pohjoisreunalla','kulkutila')
L('Esilinnan pohjoissiipi',(62,19,17),'top',PDF)
L('Kijlin torni',(92,6,34),'top',PDF)
L('Suvorovin esilinna',(107,20,4),'right',PDF)
L('Itäpatteri',(96,27,7),'right',PDF)
L('Kotkaportti',(94,38,2),'right','Hakanpää 2019, s. 17 / K 104')
L('Tykistökasarmi',(63,32,11),'right',PDF)
L('Esilinnan piha',(73,49,0),'right',PDF+'; s. 17')
L('Päälinnan itäsiipi',(40,39,19),'right',PDF)
L('Linnan keittiö',(36,41,2),'right','Peli: keittio.js','tila','Pieni linnanpiha, itäsiiven alakerta; paikka pelin tulkinta','sisätila / pelin paikka')
L('Päälinnan porttikäytävä',(39,51,2),'right','Hakanpää 2019, s. 17 / E 102')
L('Kansliarakennus',(46,54,10),'right',PDF)
L('Vartiotupa (tulkinta)',(43,54,5),'right','Peli: vartiotupa.js','tulkinta','Pelin tulkinta; tämän kuvan johtoviivan paikka ei todista nykyistä huonejakoa','pelin tulkinta')
L('Paksu bastioni',(98,54,5),'right',PDF)
L('Eteläpatteri',(76,66,10),'right',PDF)
L('Panimoportti',(69,70,3),'right','Hakanpää 2019, s. 17 / N 109')
L('Pikkuportin bastioni',(67,81,4),'right',PDF)
L('Rautaportin paikka',(44,64,.1),'bottom','Hakanpää 2019, s. 17–18','raunio','Keskiaikaisen portin kaivauksessa todettu paikka, ei nykyinen sisäänkäynti','historiallinen paikka')
L('Kurtiini',(44,67,5),'bottom',PDF,'osa','Bastionien välinen muuri')
L('Pyhän Eerikin tornin jäännös',(40,62,.5),'bottom',PDF+'; s. 19','raunio','Purettu torni: merkitty vain säilyneen alapohjan paikaksi','purettu torni')
leaders=[];names=[]
# Avoid crossed margin leaders by sorting target heights within each side.
for side in ['left','right']:
 arr=sorted([l for l in labels if l['side']==side],key=lambda l:l['target'][1])
 for i,l in enumerate(arr):
  yy=300+i*68;tx,ty=l['target'];xx=70 if side=='left' else 1560
  end=xx+405 if side=='left' else xx-18
  lane=490+i*4 if side=='left' else 1530-i*4
  dash='stroke-dasharray="4 4"' if l['kind'] in ['tila','tulkinta'] else ''
  leaders.append(f'<path d="M{end},{yy+8} L{lane},{yy+8} L{tx:.2f},{ty:.2f}" {dash}/><circle cx="{tx:.2f}" cy="{ty:.2f}" r="3" fill="{INK}"/>')
  names.append(f'<text x="{xx}" y="{yy}" font-size="18.5">{html.escape(l["name"])}</text>')
  if l['sub']:names.append(f'<text x="{xx}" y="{yy+23}" font-size="12" opacity=".74">{html.escape(l["sub"])}</text>')
arr=sorted([l for l in labels if l['side']=='top'],key=lambda l:l['target'][0])
for i,l in enumerate(arr):
 xx=615+i*192; yy=238-(i%2)*50;tx,ty=l['target']
 dash='stroke-dasharray="4 4"' if l['kind']=='tila' else ''
 leaders.append(f'<path d="M{xx},{yy+35} L{xx},{yy+52} L{tx},{ty}" {dash}/><circle cx="{tx}" cy="{ty}" r="3" fill="{INK}"/>')
 # Wrap top labels cleanly.
 words=l['name'].split(); rows=[l['name']] if len(l['name'])<20 else [' '.join(words[:1]),' '.join(words[1:])]
 names.append(f'<text x="{xx}" y="{yy}" text-anchor="middle" font-size="18.5">'+' '.join(f'<tspan x="{xx}" dy="{0 if j==0 else 23}">{html.escape(t)}</tspan>' for j,t in enumerate(rows))+'</text>')
for i,l in enumerate([l for l in labels if l['side']=='bottom']):
 xx=615+i*420;yy=1320;tx,ty=l['target'];leaders.append(f'<path d="M{xx},{yy-20} L{xx},{yy-42} L{tx},{ty}"/><circle cx="{tx}" cy="{ty}" r="3" fill="{INK}"/>')
 names.append(f'<text x="{xx}" y="{yy}" text-anchor="middle" font-size="18.5">{html.escape(l["name"])}</text>')
svg=f'''<svg xmlns="http://www.w3.org/2000/svg" width="4096" height="3120" viewBox="0 0 {W} {H}" role="img" aria-labelledby="title desc">
<title id="title">Olavinlinna – linnan osat nimettyinä</title>
<desc id="desc">Oma kaaviollinen aksonometrinen mustepiirros nykyisen linnan säilyneistä rakennusosista. Kolme säilynyttä tornia, bastionit, pihat ja ponttonisilta. Sisätilat ja pelin tulkinnat merkitty erikseen. Ei mittapiirros.</desc>
<g id="piirros"><defs>{''.join(clips)}<mask id="mustejaljet" maskUnits="userSpaceOnUse" x="0" y="0" width="{W}" height="{H}" style="mask-type:luminance"><rect width="{W}" height="{H}" fill="black"/><g fill="black" stroke="white" stroke-linejoin="round" stroke-linecap="round">{''.join(shapes)}</g></mask></defs><rect width="{W}" height="{H}" fill="{INK}" mask="url(#mustejaljet)"/></g>
<g id="viittausviivat" fill="none" stroke="{INK}" stroke-width=".85" stroke-linecap="round" opacity=".7">{''.join(leaders)}</g>
<g id="nimet" fill="{INK}" font-family="Courier New, Courier Prime, monospace">
<text x="70" y="90" font-size="44" font-weight="bold" letter-spacing="4">OLAVINLINNA</text>
<text x="72" y="127" font-size="17" letter-spacing="1.4">LINNAN OSAT • SAVONLINNA</text>
{''.join(names)}
<text x="70" y="1430" font-size="17">Nykyinen rakennusasu • kaaviollinen näkymä lounaasta • ei mittapiirros</text>
<text x="70" y="1460" font-size="15">Katkoviiva: sisätila tai pelin tulkinta. Pyhän Eerikin torni on purettu.</text>
<text x="70" y="1490" font-size="15">Rakennusosien nimet: Senaatti / Päivi Hakanpää 2019. Pelin nimet: Matkakirjan Olavinlinna.</text>
</g></svg>'''
(OUT/'olavinlinna-nimet.svg').write_text(svg)
# Keep same vector marks and editable labels on paper, without changing any geometry.
(OUT/'olavinlinna-pergamentti.svg').write_text(svg.replace('<g id="piirros">','<rect id="pergamentti" width="2048" height="1560" fill="#f3e6d0"/><g id="piirros">',1))
(OUT/'nimet-ja-kohdat.json').write_text(json.dumps(labels,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'labels':len(labels),'shapes':len(shapes),'viewbox':[W,H]},ensure_ascii=False))
