/* Livian lähikasvot: alkuperäinen kokonaispikseleillä piirretty pelihahmo.
 * 22 × 22 lepo, 22 × 44 läpinäkyvä näyttämö. Lisätila vain ylös.
 * Omistajan 9.9.2026 hyväksymä pikselisuunta; ei kuvatiedostoja. */
// Exact integer pixel cells. No tracing, interpolation or image smoothing.
export const LIVIA_PIX_W=22, LIVIA_PIX_H=44;
const lpWIDTH=LIVIA_PIX_W, lpHEIGHT=LIVIA_PIX_H;
export const LIVIA_PIX_PALETTI=[null,'#171717','#ffffff','#898989'];
const lpK=1,lpW=2,lpG=3;
const lpgrid=(height=22)=>Array.from({length:height},()=>Array(lpWIDTH).fill(0));
function lpdot(g,x,y,c=lpK){if(y>=0&&y<g.length&&x>=0&&x<lpWIDTH)g[y][x]=c;}
function lprect(g,x,y,w,h,c=lpK){for(let j=y;j<y+h;j++)for(let i=x;i<x+w;i++)lpdot(g,i,j,c);}
function lpline(g,x,y,ex,ey,c=lpK){let dx=Math.abs(ex-x),sx=x<ex?1:-1,dy=-Math.abs(ey-y),sy=y<ey?1:-1,err=dx+dy;for(;;){lpdot(g,x,y,c);if(x===ex&&y===ey)break;let e=2*err;if(e>=dy){err+=dy;x+=sx;}if(e<=dx){err+=dx;y+=sy;}}}
function lppolygon(g,pts,c){for(let y=0;y<g.length;y++)for(let x=0;x<lpWIDTH;x++){let inside=false;for(let i=0,j=pts.length-1;i<pts.length;j=i++){const a=pts[i],b=pts[j];if((a[1]>y+.5)!==(b[1]>y+.5)&&(x+.5)<(b[0]-a[0])*(y+.5-a[1])/(b[1]-a[1])+a[0])inside=!inside;}if(inside)lpdot(g,x,y,c);}}
function lpbase(){
  const g=lpgrid();
  // Crown and neck cropped: the area belongs to lpeyes and short pigeon lpbeak.
  lppolygon(g,[[9,0],[22,0],[22,22],[10,22],[8,19],[8,16],[5,13],[4,8],[4,5],[6,2]],lpW);
  lpline(g,8,0,5,3);lpline(g,4,4,4,7);lpline(g,21,6,21,16);
  lpline(g,20,17,21,19);lpline(g,8,19,10,21);return g;
}
function lpeyes(g,mood='rest'){
  lprect(g,5,4,15,7,lpW);
  if(mood==='blink'){lpline(g,5,8,9,8);lpline(g,12,8,19,8);lpdot(g,18,9);return;}
  if(mood==='glance'){lpline(g,5,7,9,7);lpline(g,12,6,19,5);lpline(g,12,7,19,6);lprect(g,12,7,2,2);lpline(g,13,10,18,10);lpline(g,13,3,19,2);return;}
  if(mood==='fluster'){lprect(g,5,5,4,6,lpK);lprect(g,6,6,2,4,lpW);lpdot(g,7,7);lpline(g,12,6,19,7);lprect(g,14,8,2,2);lpline(g,13,10,18,10);lpline(g,12,3,18,5);return;}
  lpline(g,5,6,9,7);lpline(g,5,7,9,8);lpdot(g,7,8);lpdot(g,8,9);
  lpline(g,12,6,19,5);lpline(g,12,7,19,6);lprect(g,15,7,2,3);
  lpline(g,13,10,18,10);lpline(g,12,3,18,1);lpdot(g,19,1);
}
function lpbeak(g,open=false){
  lppolygon(g,[[4,10],[7,9],[10,11],[8,13],[2,15],[0,16],[1,13]],lpK);
  lppolygon(g,[[4,11],[7,10],[8,11],[5,12],[2,14],[1,14]],lpG);
  lprect(g,5,10,2,1,lpW);lpdot(g,6,11,lpK);lpline(g,1,15,8,12);
  if(open){lppolygon(g,[[2,16],[8,14],[10,15],[8,18],[4,19]],lpK);lpline(g,4,18,8,17,lpG);}
  else{lpline(g,2,16,7,15);lpline(g,7,15,9,13);lpdot(g,2,17);}
}
function lpnormal(mood='rest',open=false){const g=lpbase();lpeyes(g,mood);lpbeak(g,open);return g;}
const lprest=lpnormal(),lpblink=lpnormal('blink'),lpglance=lpnormal('glance');
const lpcrumb=lpnormal(),lpchew=lpnormal('blink',true),lpfluster=lpnormal('fluster'),lpcaught=lpnormal('fluster');
for(const g of [lpcrumb,lpchew,lpcaught])lpdot(g,2,14,lpW);
for(const g of [lpfluster,lpcaught]){lpdot(g,20,2,lpG);lpdot(g,20,3,lpG);}
const lpshock=lpgrid(30);
lppolygon(lpshock,[[7,6],[22,6],[22,30],[11,30],[9,26],[4,21],[4,12]],lpW);
lprect(lpshock,4,5,6,14,lpK);lprect(lpshock,5,6,4,12,lpW);lpdot(lpshock,7,11);
lprect(lpshock,12,1,9,18,lpK);lprect(lpshock,13,2,7,16,lpW);lpdot(lpshock,16,10);
lpline(lpshock,13,0,18,0);lpline(lpshock,5,3,8,2);
lppolygon(lpshock,[[6,18],[9,18],[11,20],[7,22],[3,22],[1,24],[1,21]],lpK);
lpline(lpshock,3,21,8,19,lpG);lpdot(lpshock,7,19,lpW);
lppolygon(lpshock,[[5,23],[10,22],[13,26],[11,29],[5,28]],lpK);
lpline(lpshock,7,27,10,27,lpG);lpline(lpshock,21,19,21,27);
const lponlyEyes=lpgrid();
for(let y=0;y<12;y++)for(let x=4;x<20;x++)if((x>=5&&x<=9&&y>=5&&y<=10)||(x>=12&&x<=19&&y>=4&&y<=11))lponlyEyes[y][x]=lprest[y][x]||lpW;

// Ilmeet vaihtavat silmäluomia, nokkaa ja pään asentoa, eivät koko kuvakkeen kokoa.
function lpIlme(tunne) {
 const g=lpnormal(); lprect(g,5,1,15,10,lpW);
 const pari=(vasen,oikea)=>{vasen(5,5);oikea(12,5);};
 const auki=(x,y)=>{lprect(g,x,y,7,6,lpK);lprect(g,x+1,y+1,5,4,lpW);lpdot(g,x+3,y+3);};
 const littea=(x,y)=>{lpline(g,x,y+2,x+6,y+2);lprect(g,x+3,y+3,2,2);};
 if(tunne==='angry') { lpline(g,5,3,10,6);lpline(g,5,4,10,7);lpline(g,12,6,19,2);lpline(g,12,7,19,3);lprect(g,8,7,2,3);lprect(g,14,7,2,3);lpline(g,5,10,9,10);lpline(g,13,11,18,11); }
 else if(tunne==='embarrassed') {lpline(g,5,6,9,6);lpdot(g,8,7);lpline(g,12,6,19,7);lprect(g,17,8,2,2);lpline(g,5,3,9,4);lpline(g,13,3,18,4);lprect(g,10,12,3,1,lpG);lprect(g,17,12,3,1,lpG);}
 else if(tunne==='bored') {pari(littea,littea);lpline(g,5,11,9,11,lpG);lpline(g,13,12,19,12,lpG);}
 else if(tunne==='sleep') {lpline(g,5,7,9,8);lpline(g,12,8,19,7);lpdot(g,6,8);lpdot(g,17,8);}
 else if(tunne==='manic') {pari(auki,auki);lprect(g,7,7,3,3);lprect(g,14,7,3,3);lpdot(g,8,7,lpW);lpdot(g,15,7,lpW);lpline(g,4,2,9,1);lpline(g,13,1,20,2);}
 else if(tunne==='disbelief') {lprect(g,5,3,5,9);lprect(g,6,4,3,7,lpW);lpdot(g,7,8);lpline(g,12,6,20,5);lprect(g,16,7,2,3);lpline(g,13,11,19,11);lpline(g,12,2,19,0);}
 else if(tunne==='happy'||tunne==='smug') {lpline(g,5,6,7,4);lpline(g,7,4,10,6);lpline(g,12,6,15,3);lpline(g,15,3,19,5);if(tunne==='smug'){lprect(g,14,6,2,3);lpline(g,12,9,19,9);}}
 else if(tunne==='confused') {auki(12,4);lpline(g,5,7,10,7);lpdot(g,8,8);lpline(g,5,3,9,4);lpline(g,13,1,17,0);}
 else if(tunne==='love') {for(const x of[5,13]){lprect(g,x,5,2,2);lprect(g,x+3,5,2,2);lprect(g,x,7,5,2);lprect(g,x+1,9,3,1);lpdot(g,x+2,10);}}
 else if(tunne==='up') {pari(auki,auki);lprect(g,7,6,2,2);lprect(g,14,6,2,2);}
 else if(tunne==='down') {pari(auki,auki);lprect(g,7,9,2,2);lprect(g,14,9,2,2);}
 else lpeyes(g);
 return g;
}
function lpEdesta() {
 const g=lpgrid();lppolygon(g,[[4,0],[18,0],[21,4],[21,18],[18,22],[4,22],[1,18],[1,4]],lpW);
 lpline(g,3,0,0,4);lpline(g,19,0,21,3);lpline(g,0,5,0,16);lpline(g,21,5,21,16);
 lpline(g,3,5,9,7);lpline(g,3,6,9,8);lpline(g,12,7,18,4);lpline(g,12,8,18,5);
 lprect(g,6,8,2,3);lprect(g,13,8,2,3);lpline(g,3,12,8,12);lpline(g,13,12,18,12);
 lppolygon(g,[[9,12],[13,12],[16,15],[11,19],[6,15]],lpK);lpline(g,8,15,14,15,lpG);lprect(g,10,12,3,1,lpW);
 return g;
}
function lpProfiili(oikea=false) {
 const g=lpgrid();lppolygon(g,[[10,0],[22,0],[22,22],[9,22],[8,18],[6,15],[5,7],[7,2]],lpW);
 lpline(g,9,0,5,4);lpline(g,5,5,5,8);lpline(g,10,21,8,18);
 lpline(g,9,5,19,3);lpline(g,9,6,19,4);lprect(g,12,6,3,4);lpline(g,9,11,18,11);lpbeak(g);
 return oikea?g.map(row=>[...row].reverse()):g;
}
const lpExtra={front:lpEdesta(),left:lpProfiili(),right:lpProfiili(true)};
for(const mood of['angry','embarrassed','bored','sleep','manic','disbelief','happy','smug','confused','love','up','down'])lpExtra[mood]=lpIlme(mood);
lpExtra.puff=lpIlme('bored');
lppolygon(lpExtra.puff,[[1,16],[4,14],[8,15],[11,19],[16,15],[20,14],[22,17],[22,22],[0,22]],lpW);
lpline(lpExtra.puff,0,16,0,20);lpline(lpExtra.puff,1,21,5,21);lpline(lpExtra.puff,20,15,21,16);lpline(lpExtra.puff,21,17,21,21);lpline(lpExtra.puff,6,16,10,16);lpdot(lpExtra.puff,9,17);
lpExtra.yawn=lpIlme('sleep');lpbeak(lpExtra.yawn,true);lprect(lpExtra.yawn,4,16,6,5);
lpExtra.talk=lpnormal('rest',true);lpExtra.talkSmall=lpnormal();lpline(lpExtra.talkSmall,3,17,8,16);lpdot(lpExtra.talkSmall,7,17);
lpExtra.chewManic=lpIlme('manic');lpbeak(lpExtra.chewManic,true);lpdot(lpExtra.chewManic,2,14,lpW);
lpExtra.preen=lpnormal('blink');lppolygon(lpExtra.preen,[[12,22],[11,16],[15,11],[18,8],[19,14],[22,18],[22,22]],lpG);lpline(lpExtra.preen,12,20,16,15);lpline(lpExtra.preen,15,21,19,16);lpline(lpExtra.preen,18,21,20,19);
lpExtra.cover=lpIlme('embarrassed');lppolygon(lpExtra.cover,[[10,22],[9,13],[12,5],[14,4],[14,11],[17,5],[19,6],[17,13],[21,9],[22,11],[20,19],[22,22]],lpG);lpline(lpExtra.cover,10,20,12,11);lpline(lpExtra.cover,14,19,17,11);
lpExtra.wing=lpnormal();lppolygon(lpExtra.wing,[[17,22],[16,15],[18,11],[20,14],[21,7],[22,7],[22,22]],lpG);lpline(lpExtra.wing,18,19,20,16);
export const LIVIA_PIX_RUUDUT=Object.freeze({rest:lprest,blink:lpblink,glance:lpglance,crumb:lpcrumb,chew:lpchew,fluster:lpfluster,caught:lpcaught,shock:lpshock,eyes:lponlyEyes,...lpExtra});

// Kesto sisältää tauot. Vain suuntakohtaiset tulo-/poistumisklipit eivät pääty lepoon.
export const LIVIA_PIX_ELEET=Object.freeze([
 ['blink','Räpäytys',1500,'Pieni ele'],['glance','Mulkoilu',2300,'Pieni ele'],
 ['turn','Pään kääntö',3000,'Pää'],['lookRight','Katse oikealle',2200,'Pää'],['lookUp','Katse ylös',2400,'Pää'],['lookDown','Katse alas',2200,'Pää'],['tilt','Mitä ihmettä?',2400,'Pää'],['nod','Kyllä kyllä',1800,'Pää'],['shake','Ei todellakaan',2100,'Pää'],['doubleTake','Hetkinen!',2600,'Pää'],
 ['shock','Kääk!',2400,'Ilme'],['embarrassed','Nolostuminen',3200,'Ilme'],['angry','Tuohtuminen',2800,'Ilme'],['bored','Kyllästyminen',3600,'Ilme'],['puff','Pieruposket',3100,'Ilme'],['manic','Maaninen pullan tuijotus',3300,'Ilme'],['expert','Arvokas tietäjä',3200,'Ilme'],['disbelief','Ei voi olla',3300,'Ilme'],['confused','Häh?',2800,'Ilme'],['happy','Vahingonilo',2500,'Ilme'],['love','Ihastus',3800,'Ilme'],['facepalm','Voi minua',3000,'Ilme'],
 ['talk','Puhe',1500,'Puhe'],['listen','Kuuntelen',2600,'Puhe'],['think','Ajatus jumissa',3400,'Puhe'],['reading','Pienellä painettu',3200,'Puhe'],
 ['crumb','En minä syönyt',3800,'Touhu'],['bread','Pulla voittaa',4100,'Touhu'],['preen','Sulkapuku kuntoon',3600,'Touhu'],['yawn','Haukotus',3000,'Touhu'],['sleep','Nukahdus',5400,'Touhu'],['wake','Enhän minä nukkunut',2200,'Touhu'],['sneeze','Aivastus',2100,'Touhu'],['wind','Vastatuuli',2900,'Touhu'],['rain','Siipi sateensuojana',3500,'Touhu'],['sun','Liian kirkasta',3000,'Touhu'],['snow','Lumi nokalla',3600,'Touhu'],
 ['peek','Viivan alta kurkistus',3300,'Liike'],['owl','Käyn pöllöllä',4400,'Liike'],['arrive','Saapuminen oikealta',1900,'Liike'],['crash','Rymistellen paikalle',2600,'Liike'],['emerge','Ylös viivan alta',1700,'Liike'],['leaveRight','Oikealle pois',1100,'Liike'],['leaveDown','Alas piiloon',1100,'Liike'],['handoff','Pöllön sijainen',4700,'Liike'],
].map(([id,label,duration,group])=>Object.freeze({id,label,duration,group})));
const lpStep=(p,stops)=>{let result=stops[0][1];for(const[at,value]of stops){if(p<at)break;result=value;}return result;};
const lpRamp=(p,a,b,from,to)=>Math.round(from+(to-from)*Math.max(0,Math.min(1,(p-a)/(b-a))));
const lpPulse=(p,n=8)=>Math.floor(p*n)%2;
export function livianPikseliAsento(id,p=0) {
 p=Math.max(0,Math.min(1,p));const s={frame:'rest',x:0,y:0,line:false,crumbY:null,eyesAhead:false,tilt:0,fx:null,phase:p===1?0:Math.floor(p*12),owlX:null};
 const tulot=['arrive','crash','emerge','handoff'],poistumiset=['leaveRight','leaveDown'];
 if(p===0&&!tulot.includes(id)||p===1&&!poistumiset.includes(id))return s;
 const seq=(stops)=>{s.frame=lpStep(p,[[0,'rest'],...stops,[.94,'rest']]);};
 if(id==='blink')seq([[.30,'blink'],[.43,'rest']]);
 if(id==='glance')seq([[.15,'glance'],[.67,'blink'],[.74,'rest']]);
 if(id==='turn')seq([[.12,'front'],[.25,'left'],[.51,'front'],[.67,'right'],[.81,'front']]);
 if(id==='lookRight')seq([[.13,'front'],[.26,'right'],[.70,'front']]);
 if(id==='lookUp'||id==='lookDown'){seq([[.18,id==='lookUp'?'up':'down'],[.78,'blink']]);s.y=p>.18&&p<.78?(id==='lookUp'?-2:1):0;}
 if(id==='tilt'){seq([[.15,'confused'],[.76,'blink']]);s.tilt=p>.24&&p<.65?1:0;}
 if(id==='nod'){seq([[.1,'front'],[.86,'rest']]);if(p>.18&&p<.76)s.y=lpPulse(p,12)?2:0;}
 if(id==='shake'){seq([[.13,'front'],[.23,'left'],[.35,'right'],[.47,'left'],[.59,'right'],[.72,'front']]);}
 if(id==='doubleTake')seq([[.1,'right'],[.27,'rest'],[.34,'front'],[.42,'shock'],[.67,'disbelief']]);
 if(id==='shock'){seq([[.12,'blink'],[.23,'shock'],[.66,'fluster'],[.84,'rest']]);if(p>=.23&&p<.38)s.y=-1;}
 if(id==='embarrassed'){seq([[.12,'embarrassed'],[.50,'down'],[.62,'embarrassed']]);if(p>.2&&p<.8)s.y=1;}
 if(id==='angry'){seq([[.1,'angry'],[.77,'blink'],[.85,'angry']]);if(p>.25&&p<.60){s.y=-lpPulse(p,15);s.fx='anger';}}
 if(id==='bored')seq([[.12,'bored'],[.42,'glance'],[.57,'bored'],[.80,'blink']]);
 if(id==='puff'){seq([[.12,'puff'],[.65,'talk'],[.72,'fluster'],[.85,'rest']]);if(p>.25&&p<.64)s.y=-lpPulse(p,15);if(p>=.65&&p<.80)s.fx='pfft';}
 if(id==='manic'){seq([[.12,'manic'],[.82,'caught']]);if(p>.2&&p<.8){s.y=-lpPulse(p,20);s.fx='bread';}}
 if(id==='expert'){seq([[.13,'smug'],[.54,'front'],[.68,'smug']]);if(p>.2&&p<.82)s.y=-2;}
 if(id==='disbelief')seq([[.13,'disbelief'],[.51,'blink'],[.57,'disbelief'],[.8,'front']]);
 if(id==='confused'){seq([[.15,'confused'],[.79,'blink']]);if(p>.3&&p<.7){s.tilt=1;s.fx='question';}}
 if(id==='happy'){seq([[.12,'happy'],[.45,'chew'],[.53,'happy'],[.7,'smug']]);if(p>.3&&p<.6)s.y=-lpPulse(p,14);}
 if(id==='love'){seq([[.12,'love'],[.78,'embarrassed']]);if(p>.16&&p<.79){s.fx='hearts';s.y=-1;}}
 if(id==='facepalm')seq([[.12,'embarrassed'],[.32,'cover'],[.74,'embarrassed']]);
 if(id==='talk')s.frame=lpStep(p,[[0,'rest'],[.08,'talk'],[.17,'talkSmall'],[.26,'rest'],[.35,'talk'],[.47,'talkSmall'],[.57,'talk'],[.68,'blink'],[.76,'talkSmall'],[.86,'talk'],[.95,'rest']]);
 if(id==='listen'){seq([[.15,'front'],[.36,'glance'],[.68,'front']]);s.tilt=p>.36&&p<.68?-1:0;}
 if(id==='think'){seq([[.13,'up'],[.40,'confused'],[.63,'up'],[.82,'smug']]);if(p>.22&&p<.75)s.fx='dots';}
 if(id==='reading'){seq([[.13,'down'],[.3,'glance'],[.47,'down'],[.63,'confused'],[.83,'blink']]);s.y=p>.13&&p<.80?2:0;}
 if(id==='crumb'||id==='bread'){
  seq([[.08,id==='bread'?'manic':'crumb'],[.22,'chew'],[.31,'crumb'],[.39,id==='bread'?'chewManic':'chew'],[.46,'caught'],[.63,'blink'],[.69,'caught'],[.74,'fluster'],[.86,'rest']]);
  if(p>=.63&&p<.69)s.y=-lpPulse(p,60);if(p>=.74&&p<.87)s.crumbY=lpRamp(p,.74,.87,35,44);if(id==='bread'&&p>.08&&p<.22)s.fx='bread';
 }
 if(id==='preen')seq([[.1,'down'],[.23,'preen'],[.36,'down'],[.46,'preen'],[.62,'preen'],[.78,'smug']]);
 if(id==='yawn')seq([[.12,'bored'],[.32,'yawn'],[.71,'sleep'],[.86,'blink']]);
 if(id==='sleep'){seq([[.1,'bored'],[.24,'blink'],[.34,'bored'],[.45,'sleep'],[.86,'fluster']]);if(p>.45&&p<.86){s.y=3;s.tilt=1;s.fx='z';}}
 if(id==='wake'){seq([[.0,'sleep'],[.20,'shock'],[.40,'front'],[.56,'smug']]);if(p>.2&&p<.4)s.y=-2;}
 if(id==='sneeze'){seq([[.12,'up'],[.32,'confused'],[.46,'yawn'],[.57,'blink'],[.71,'fluster']]);if(p>.46&&p<.57){s.y=-2;s.fx='pfft';}}
 if(id==='wind'){seq([[.1,'glance'],[.25,'blink'],[.68,'fluster']]);if(p>.2&&p<.75){s.tilt=1;s.x=lpPulse(p,15);s.fx='wind';}}
 if(id==='rain'){seq([[.1,'up'],[.33,'wing'],[.78,'angry']]);if(p>.15&&p<.8)s.fx='rain';}
 if(id==='sun'){seq([[.12,'up'],[.3,'blink'],[.50,'wing'],[.78,'bored']]);if(p>.14&&p<.8)s.fx='sun';}
 if(id==='snow'){seq([[.12,'up'],[.42,'disbelief'],[.68,'blink'],[.8,'fluster']]);if(p>.14&&p<.8)s.fx='snow';}
 if(id==='peek'){
  s.line=p>=.1&&p<.94;if(p<.28)s.y=lpRamp(p,.13,.28,0,24);else if(p<.42)s.y=24;
  else if(p<.52)s.y=lpRamp(p,.42,.52,24,10);else if(p<.68){s.y=10;s.frame='glance';}else if(p<.77)s.y=lpRamp(p,.68,.77,10,24);else s.y=lpRamp(p,.79,.92,24,0);
 }
 if(id==='owl'){
  if(p<.28){s.x=lpRamp(p,.12,.28,0,24);s.frame=p>.12?'right':'rest';}
  else if(p<.55)s.x=24;else if(p<.69){s.frame='eyes';s.x=lpRamp(p,.55,.65,24,0);}
  else if(p<.79){s.frame='fluster';s.x=lpRamp(p,.69,.79,22,0);s.eyesAhead=true;}
  else{seq([[.79,'fluster'],[.84,'blink'],[.89,'rest']]);s.y=p<.84?-1:0;}
 }
 if(id==='arrive'){s.x=lpRamp(p,.08,.54,24,0);seq([[0,'left'],[.56,'front'],[.76,'smug']]);}
 if(id==='crash'){s.x=lpRamp(p,.05,.29,24,0);seq([[0,'shock'],[.36,'fluster'],[.62,'front'],[.77,'smug']]);if(p>.29&&p<.55){s.y=lpPulse(p,20)?-3:1;s.fx='stars';}}
 if(id==='emerge'){s.line=true;s.y=lpRamp(p,.08,.57,24,0);seq([[0,'glance'],[.65,'smug']]);}
 if(id==='leaveRight'){s.frame='right';s.x=lpRamp(p,.15,.85,0,24);}
 if(id==='leaveDown'){s.frame='down';s.line=true;s.y=lpRamp(p,.15,.85,0,24);}
 if(id==='handoff'){
  s.line=true;s.owlX=lpRamp(p,.17,.37,0,24);s.y=p<.39?24:lpRamp(p,.40,.66,24,0);
  s.frame=lpStep(p,[[0,'wing'],[.43,'glance'],[.68,'shock'],[.77,'smug']]);if(p>.39)s.owlX=null;
 }
 return s;
}
function lpKoriste(g,fx,phase) {
 const heart=(x,y)=>{lprect(g,x,y,2,2);lprect(g,x+3,y,2,2);lprect(g,x,y+2,5,1);lprect(g,x+1,y+3,3,1);lpdot(g,x+2,y+4);};
 if(fx==='hearts'){heart(3,11-phase%3);heart(14,3+phase%3);}
 if(fx==='bread'){lprect(g,8,5,8,5,lpG);lpline(g,9,4,14,4);lpline(g,7,6,7,9);lpline(g,16,6,16,9);lpline(g,8,10,15,10);lpdot(g,10,6,lpW);lpdot(g,13,7,lpW);}
 if(fx==='anger'){lpline(g,12,7,15,10);lpline(g,16,7,13,10);lpline(g,17,11,20,14);lpline(g,20,11,17,14);}
 if(fx==='question'){lpline(g,10,6,14,6);lpdot(g,9,7);lpline(g,15,7,15,9);lpline(g,14,10,12,11);lpdot(g,12,12);lpdot(g,12,15);}
 if(fx==='dots')for(let i=0;i<3;i++)if(i<=phase%4)lprect(g,6+i*5,12,2,2);
 if(fx==='z'){lpline(g,11,6,16,6);lpline(g,16,7,11,11);lpline(g,11,12,16,12);if(phase%2)lpdot(g,18,3);}
 if(fx==='pfft'||fx==='wind'){for(let i=0;i<3;i++)lpline(g,12+i,8+i*4,19,8+i*4,lpG);}
 if(fx==='stars'){for(const[x,y]of[[5,9],[16,6]]){lpline(g,x-2,y,x+2,y);lpline(g,x,y-2,x,y+2);}}
 if(fx==='rain'){lprect(g,5,4,13,3,lpG);lprect(g,8,2,6,3,lpG);for(let i=0;i<3;i++)lpline(g,6+i*5,10+(phase+i)%4,5+i*5,12+(phase+i)%4);}
 if(fx==='sun'){lprect(g,12,5,5,5,lpW);lpline(g,12,4,16,4);lpline(g,12,10,16,10);lpline(g,11,5,11,9);lpline(g,17,5,17,9);lpdot(g,14,1);lpdot(g,14,13);lpdot(g,8,7);lpdot(g,20,7);}
 if(fx==='snow')for(const[x,y]of[[5,6],[14,11],[18,3]]){const yy=y+phase%5;lpdot(g,x,yy,lpW);lpdot(g,x-1,yy,lpG);lpdot(g,x+1,yy,lpG);lpdot(g,x,yy-1,lpG);lpdot(g,x,yy+1,lpG);}
}
export function livianPikselit(s) {
 const out=lpgrid(lpHEIGHT);let f=LIVIA_PIX_RUUDUT[s.frame]||lprest;
 if(s.mouth&&f.length===22&&!['front','right','left'].includes(s.frame)){f=f.map(r=>[...r]);const nokka=LIVIA_PIX_RUUDUT[s.mouth]||lprest;for(let y=10;y<22;y++)for(let x=0;x<11;x++)f[y][x]=nokka[y][x];}
 else if(s.mouth&&['front','right','left'].includes(s.frame)){f=f.map(r=>[...r]);if(s.mouth==='talk'){if(s.frame==='front')lprect(f,9,17,5,4,lpK);else if(s.frame==='right')lprect(f,14,16,4,3,lpK);else lprect(f,4,16,4,3,lpK);}}
 const top=lpHEIGHT-f.length+s.y-1;
 for(let y=0;y<f.length;y++)for(let x=0;x<lpWIDTH;x++){
  if(s.line&&y+top>=lpHEIGHT-1)continue;
  const shear=s.tilt?Math.round((y-10)/9)*s.tilt:0;
  if(f[y][x])lpdot(out,x+s.x+shear,y+top,f[y][x]);
 }
 if(s.eyesAhead)for(let y=0;y<lponlyEyes.length;y++)for(let x=0;x<lpWIDTH;x++)if(lponlyEyes[y][x])lpdot(out,x,y+21,lponlyEyes[y][x]);
 if(s.owlX!==null&&s.owlX!==undefined){const x=s.owlX;lprect(out,x+4,29,14,12,lpG);lprect(out,x+5,31,5,5,lpW);lprect(out,x+12,31,5,5,lpW);lpdot(out,x+7,33);lpdot(out,x+14,33);lpline(out,x+4,28,x+7,30);lpline(out,x+17,28,x+14,30);lpdot(out,x+10,37);lpdot(out,x+11,38);}
 if(s.line)lprect(out,1,lpHEIGHT-1,21,1,lpK);
 if(s.crumbY!==null&&s.crumbY!==undefined)lpdot(out,2,s.crumbY,lpK);
 if(s.fx)lpKoriste(out,s.fx,s.phase||0);return out;
}
export function luoLivianPikselit(canvas,scale=2) {
 if(!Number.isInteger(scale)||scale<1)throw new RangeError('Pikselimittakaavan on oltava positiivinen kokonaisluku.');
 canvas.width=lpWIDTH*scale;canvas.height=lpHEIGHT*scale;canvas.style.width=`${canvas.width}px`;canvas.style.height=`${canvas.height}px`;
 const ctx=canvas.getContext('2d');if(!ctx)throw new Error('Canvas ei ole käytettävissä.');ctx.imageSmoothingEnabled=false;
 function paint(state){ctx.clearRect(0,0,canvas.width,canvas.height);const data=livianPikselit(state);for(let y=0;y<lpHEIGHT;y++)for(let x=0;x<lpWIDTH;x++)if(data[y][x]){ctx.fillStyle=LIVIA_PIX_PALETTI[data[y][x]];ctx.fillRect(x*scale,y*scale,scale,scale);}}
 paint(livianPikseliAsento('blink',0));return{paint};
}
