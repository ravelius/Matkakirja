/* Kokonainen Livia: sama eleaikajana, optinen lähestyminen ja siipien eleet. */
import {LIVIA_PIX_ELEET,livianPikseliAsento} from './livia-pikselit.js';
import {livianSvgPaa} from './livia-svg-paa.js';
export const LIVIA_SVG_ELEET=LIVIA_PIX_ELEET;
const lvClamp=n=>Math.max(0,Math.min(1,Number.isFinite(n)?n:0));
const lvEase=n=>{n=lvClamp(n);return n*n*(3-2*n);};
const lvGate=p=>lvEase((p-.06)/.18)*(1-lvEase((p-.79)/.18));
const lvRound=n=>Math.round(n*1000)/1000;
const lvEmotion={shock:1,embarrassed:.6,angry:.9,bored:.3,puff:.72,manic:1,expert:.65,disbelief:.8,confused:.55,happy:.65,love:.65,facepalm:.6,doubleTake:.75,bread:.85};
export function livianEleenVoima(id,text='') {
 let strength=lvEmotion[id]??.35;
 if(/!{2,}|aivan mahdoton|todellakaan|kääk!/iu.test(text))strength+=.15;
 return lvClamp(strength);
}
export function livianSvgAsento(id,p=0,{voimakkuus=livianEleenVoima(id)}={}) {
 return {...livianPikseliAsento(id,p),ele:id,p:lvClamp(p),voimakkuus:lvClamp(voimakkuus)};
}
export function livianSvgMalli(s,{right=0}={}) {
 const id=s.ele||'',p=lvClamp(s.p??0),strength=lvClamp(s.voimakkuus??livianEleenVoima(id));
 const gate=lvGate(p),moving=Boolean(s.flight||s.walk||['arrive','crash','emerge','leaveDown','handoff','peek','owl','flyAway','flyBack','clumsyLand','glassCrash','walkRight','walkBack','leaveRight'].includes(id));
 const lean=!moving&&id in lvEmotion?strength*gate:0;
 const m={id,p,strength,gate,lean,headScale:1/(1-.48*lean),bodyLean:-9*lean,
  x:128+(s.x||0)*4,y:302+(moving?(s.y||0)*4:0),headY:moving?0:(s.y||0)*2,headAngle:(s.tilt||0)*(3+5*strength),scale:.56,angle:0,squash:1,visible:true,
  flight:Boolean(s.flight),walking:Boolean(s.walk),mirror:s.walk?.direction===1,face:s.frame||'rest',wing:'fold',wingAmount:0};
 if(s.walk){const t=s.walk.direction===1?s.walk.t:1-s.walk.t;m.x=128+(right+96)*t;m.y=302-2*Math.sin(p*Math.PI*14);if(t>=1)m.visible=false;}
 if(['arrive','crash','owl'].includes(id)&&!s.flight&&!s.walk){const edge=id==='arrive'?1-lvEase((p-.08)/.46):id==='crash'?1-lvEase((p-.05)/.24):lvClamp((s.x||0)/24);m.x=128+(right+100)*edge;}
 if(s.flight){
  const f=s.flight,t=lvClamp(f.t);m.face='rest';m.wing='flap';m.wingAmount=Math.sin(p*Math.PI*22);
  if(f.kind==='away'||f.kind==='back'){
   const near=f.kind==='away'?1-t:f.near?.45+.55*t:t;
   m.x=(152+right-8)*(1-near)+128*near;m.y=25*(1-near)+284*near;
   m.scale=.56*Math.max(.018,near);m.angle=(1-near)*-20;
   if(f.kind==='away'&&t>=1||f.kind==='back'&&t<=0)m.visible=false;
  } else if(f.kind==='glass'){
   m.x=128;m.y=25+230*t;m.scale=.015+.55*t+.16*lvEase((t-.68)/.32);m.face=t>.8?'shock':'front';
  } else if(f.kind==='splat'){
   m.x=123;m.y=271+140*lvEase((t-.3)/.7);m.scale=.70;m.squash=.57;m.face='fluster';m.wing='spread';m.wingAmount=1;
  }
 }
 if(!s.flight){
  if(s.frame==='wing')m.wing='shade';
  else if(s.frame==='cover')m.wing='cover';
  else if(s.frame==='preen')m.wing='preen';
  else if(id==='expert'&&gate>.01)m.wing='point';
  else if(id==='angry'&&gate>.01)m.wing='spread';
  else if(['disbelief','confused'].includes(id)&&gate>.01)m.wing='shrug';
  else if(['embarrassed','facepalm'].includes(id)&&gate>.01)m.wing='shy';
  else if(['bread','manic'].includes(id)&&s.side)m.wing=s.propsRight?'reachRight':'reach';
  else if(s.frame==='shock')m.wing='spread';
  m.wingAmount=gate*(.25+.75*strength);
  if(['shade','cover','preen'].includes(m.wing))m.wingAmount=1;
 }
 if(id==='wind')m.bodyLean+=8*gate;
 return m;
}

function lvWing(kind,side,amount,phase=0) {
 const anchor=side==='near'?121:88,flip=side==='near'?1:-1;
 let angle=0,raised=false;
 if(kind==='flap'){angle=25+amount*65;raised=true;}
 if(kind==='spread'){angle=38+amount*35+Math.sin(phase*6)*amount*8;raised=true;}
 if(kind==='shrug'){angle=34+amount*20;raised=true;}
 if(kind==='point'&&side==='near'){angle=-12;raised=true;}
 if(['shade','cover','shy','preen','reach','reachRight'].includes(kind)&&side==='near'){angle=kind==='shade'?-67:kind==='reachRight'?80:kind==='reach'?-110:kind==='preen'?-115:-78;raised=true;}
 if(!raised)return side==='near'?`<path d="M112 136Q128 137 133 150Q135 161 128 171Q116 166 112 151Z" fill="#84959f"/><path d="M119 145Q126 148 130 153L129 157Q123 151 118 150Z M120 155Q126 158 130 163L128 167Q124 162 120 160Z" fill="#4d6472"/>`:'';
 const shift=kind==='shade'?-55:kind==='cover'?-38:kind==='shy'?-16:0;
 return `<g data-part="${side}-wing" transform="translate(${anchor} ${143+shift}) scale(${flip} 1) rotate(${angle})"><path d="M-3 4Q-11-7-4-20L4-38Q7-44 10-37L10-29Q16-42 20-37L17-24Q23-35 26-30L22-17Q29-23 29-17Q23-5 12 3Q4 8-3 4Z" fill="${side==='near'?'#8499a3':'#788e99'}"/><path d="M0-13L8-27M5-7L16-23M10-1L21-15" fill="none" stroke="#506b7a" stroke-width="3.7" stroke-linecap="round"/></g>`;
}
function lvFeet(m,s) {
 const step=m.walking?Math.sin(m.p*Math.PI*14):0;
 const foot=(x,dy)=>`<path d="M${x} ${177+dy}l-1 8m0 0l-7 2m7-2l5 3m-5-3l1 3" fill="none" stroke="#ac7b74" stroke-width="2.1" stroke-linecap="round"/>`;
 return `<g data-part="feet">${foot(99,step*5)}${foot(118,-step*5)}</g>`;
}
function lvBird(s,m,prefix){
 const headState={...s,frame:m.mirror?'left':m.face};
 const down=s.frame==='sleep'?10:s.frame==='preen'?8:0;
 // Foot anchors stay fixed. The chest leans and the neck is occluded as the head approaches the camera.
 const body=`<g transform="rotate(${m.bodyLean} 109 177)"><path d="M122 156L139 171L131 172L137 175L122 174L113 163Z" fill="#546b7a"/><path d="M87 137Q97 127 115 133Q131 137 132 152Q134 170 117 175Q100 178 89 165Q82 154 87 137Z" fill="#97a5ac"/><path d="M89 141Q98 134 105 137Q96 147 96 158Q97 170 109 175Q96 171 89 162Q84 152 89 141Z" fill="#b1bcc0"/><path d="M117 135Q132 140 132 154Q134 171 117 175L110 172Q119 161 117 135Z" fill="#738895"/></g>`;
 const head=`<g data-part="approach" transform="translate(${-8*m.lean} ${8*m.lean+down+m.headY}) rotate(${m.headAngle} 105 146) translate(105 146) scale(${lvRound(m.headScale)}) translate(-105 -146)"><g transform="translate(44 61) scale(1 .87)">${livianSvgPaa(headState,{prefix,lean:m.lean,strength:m.strength})}</g></g>`;
 return `<g data-part="whole-bird" transform="translate(${lvRound(m.x)} ${lvRound(m.y)}) rotate(${lvRound(m.angle)}) scale(${lvRound(m.scale*(m.mirror?-1:1))} ${lvRound(m.scale*m.squash)}) translate(-108 -188)">
 ${lvFeet(m,s)}${lvWing(m.wing,'far',m.wingAmount,m.p*12)}${body}${head}${lvWing(m.wing,'near',m.wingAmount,m.p*12)}
 </g>`;
}
function lvProps(s,m,prefix){
 let out='';const x=m.x,y=m.y;
 if(s.side?.kind==='bread'){
  const bx=s.propsRight?x+12:x-80+(s.side.x||0)*2,by=y-50+(s.side.y||0)*1.5;
  out+=`<g transform="translate(${bx} ${by}) scale(${s.propsRight?.62:1})"><defs><mask id="${prefix}bite"><rect x="-8" y="-25" width="60" height="60" fill="white"/>${s.side.bite?'<circle cx="35" cy="-11" r="7" fill="black"/><circle cx="41" cy="0" r="7" fill="black"/>':''}</mask></defs><g mask="url(#${prefix}bite)"><path d="M0 9C-3-4 4-14 18-14C32-16 41-7 40 7Q38 21 20 20Q2 22 0 9Z" fill="#c18b48"/><ellipse cx="20" cy="1" rx="18" ry="13" fill="#e0b875"/><path d="M11 4C9-9 34-8 32 5C30 15 15 15 15 5C15 0 25-1 25 5" fill="none" stroke="#ab743f" stroke-width="2.5" stroke-linecap="round"/></g></g>`;
 }
 if(s.crumbY!==null&&s.crumbY!==undefined)out+=`<path d="M${x-34} ${y-36+(s.crumbY-35)*4}l4 1-2 4-3-1Z" fill="#c18b48"/>`;
 if(s.side?.kind==='pfft')out+=`<path d="M${x-47} ${y-46}q-16-10-22-4m20 8q-15 2-23 12" fill="none" stroke="#9b9c91" stroke-width="1.6" stroke-linecap="round"/>`;
 const fy=y-108,phase=s.phase||0;
 if(m.id==='reading'&&m.gate>.1)out+=`<g transform="translate(${x-66} ${y-33}) rotate(-12)"><path d="M0 0L18 2L33-2L35 21L18 24L1 20Z" fill="#daceaf"/><path d="M18 2v22m-13-17l9 1m-9 4l9 1m8-6l7-2m-7 8l8-2" stroke="#9a8c73" stroke-width="1"/></g>`;
 if(s.fx==='hearts')for(let i=0;i<2;i++)out+=`<path transform="translate(${x-42+i*38} ${fy-(phase+i)%3*5}) scale(.7)" d="M0 10C-20-2-9-17 0-7C9-17 20-2 0 10Z" fill="#a97078"/>`;
 if(s.fx==='stars'||s.flight?.kind==='splat')for(let i=0;i<3;i++)out+=`<path d="M${x-36+i*29} ${fy-5+i%2*9}l3 5 6 1-5 4 1 6-5-3-5 3 1-6-5-4 6-1Z" fill="#bca362"/>`;
 if(['dots','question','z'].includes(s.fx))out+=`<text x="${x-20}" y="${fy-4}" font-family="Georgia,serif" font-size="${s.fx==='z'?16:22}" fill="#657780">${s.fx==='dots'?'.'.repeat(phase%3+1):s.fx==='question'?'?':s.fx==='z'?'z Z':'♯'}</text>`;
 if(s.fx==='anger')out+=`<path d="M${x-31} ${fy-11}q8 0 8-8m5 8q0-8 8-8m-21 13q8 0 8 8m5-8q0 8 8 8" fill="none" stroke="#967368" stroke-width="2.5" stroke-linecap="round"/>`;
 if(s.fx==='wind')out+=`<path d="M${x-105} ${y-86}q40-15 65 0m-77 14q24-5 45 0m-24 15q24-5 42 0" fill="none" stroke="#a5b1b5" stroke-width="1.5"/>`;
 if(s.fx==='sun')out+=`<g stroke="#c2a35a" stroke-width="1.5"><circle cx="${x-57}" cy="${fy-7}" r="10" fill="#e2c877"/><path d="M${x-57} ${fy-24}v-5m0 34v5m-17-17h-5m34 0h5"/></g>`;
 if(s.fx==='rain'||s.fx==='snow'){
  out+=`<path d="M${x-68} ${fy-22}q-5-14 9-15q10-17 22-2q20-5 21 17Z" fill="#a4b0b6"/>`;
  for(let i=0;i<6;i++){const px=x-68+i*9,py=fy-9+((phase*5+i*17)%47);out+=s.fx==='rain'?`<path d="M${px} ${py}l-3 7" stroke="#7a9aa9" stroke-width="1.5"/>`:`<path d="M${px-3} ${py}h6m-3-3v6" stroke="#cad5d8" stroke-width="1.5"/>`;}
 }
 return out;
}
export function livianSvgKuva(s,{right=0,prefix='livia'}={}) {
 right=Math.max(0,Number.isFinite(right)?right:0);prefix=prefix.replace(/[^a-zA-Z0-9_-]/g,'');
 const m=livianSvgMalli(s,{right}),width=152+right;
 let markup=m.visible?lvBird(s,m,prefix)+lvProps(s,m,prefix):'';
 if(s.owlX!==null&&s.owlX!==undefined){const ox=128+(right+80)*s.owlX/24;markup+=`<g transform="translate(${ox-14} 267)" fill="#73654f"><path d="M0 3L4-3L11 2L20-3L23 3V23Q12 35 0 23Z"/><circle cx="7" cy="10" r="5" fill="#e8ddc4"/><circle cx="17" cy="10" r="5" fill="#e8ddc4"/><circle cx="7" cy="10" r="2"/><circle cx="17" cy="10" r="2"/><path d="M9 15h6l-3 5Z" fill="#e8ddc4"/></g>`;}
 if(s.line)markup+=`<path d="M94 303H${Math.min(width,152)}" stroke="#988d79" stroke-width="1.3" stroke-linecap="round"/>`;
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} 304" width="${width}" height="304" overflow="hidden" aria-hidden="true" data-livia-visible="${m.visible}">${markup}</svg>`;
}
let lvSerial=0;
export function luoLivianSvg(element) {
 let right=0;const prefix='livia'+(++lvSerial);
 function resize(extra=0){right=Math.max(0,extra);element.style.width=`${152+right}px`;element.style.height='304px';}
 function paint(s){element.innerHTML=livianSvgKuva(s,{right,prefix});}
 resize();paint(livianSvgAsento('blink',0));return {resize,paint};
}
