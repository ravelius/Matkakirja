import {livianSvgAsento,livianSvgKuva,livianSvgMalli,livianSelityseleenVariantti} from '../js/livia-svg.js';

const $=id=>document.getElementById(id);
const nimet={1500:'Tromssa c1',2820:'Marseille c1',4480:'Lissabon c1',5779:'Madrid c1',6200:'Berliini c1'};
let duration=6200,mediaMs=0,rate=1,pathRate=1,playing=false,ended=false,raf=0,last=0,oldPhase=0,autoRate=false;
const reduced=()=>$('motion').value==='reduced';
const compact=()=>$('viewport').value==='mobile';
const clamp=n=>Math.max(0,Math.min(1,n));

function modelX(state){return Math.round(livianSvgMalli(state).x*10)/10;}
function restState(){return {...livianSvgAsento('blink',0),compactExplain:compact()};}
function candidateState(){
 if(ended)return restState();
 let state=livianSvgAsento('cityExplain',reduced()?0.45:clamp(mediaMs/duration),{cueKestoMs:duration,playbackRate:pathRate,voimakkuus:.4});
 if(reduced())state={...state,x:0,walk:null,cityExplain:{...state.cityExplain,amount:0}};
 return {...state,compactExplain:compact()};
}
function oldState(){
 if(ended)return restState();
 let state=livianSvgAsento('cityExplain',reduced()?0.45:oldPhase,{cueKestoMs:6200,playbackRate:1,voimakkuus:.4});
 if(reduced())state={...state,x:0,walk:null,cityExplain:{...state.cityExplain,amount:0}};
 return {...state,compactExplain:compact()};
}
function paint(){
 const old=oldState(),next=candidateState(),p=clamp(mediaMs/duration);
 $('old').innerHTML=livianSvgKuva(old,{right:44,prefix:'cue-old'});
 $('next').innerHTML=livianSvgKuva(next,{right:44,prefix:'cue-next'});
 $('position').value=Math.round(p*1000);$('progress').textContent=Math.round(p*100)+' %';
 $('old-meta').textContent=ended?'cueEnd → lepo':`vaihe ${(oldPhase*100).toFixed(1)} % · x ${modelX(old)} · pitkä`;
 $('new-meta').textContent=ended?'cueEnd → lepo':`äänivaihe ${(p*100).toFixed(1)} % · x ${modelX(next)} · ${livianSelityseleenVariantti(duration,pathRate)}`;
 $('status').textContent=`${nimet[duration]} · ${(mediaMs/1000).toFixed(2)} / ${(duration/1000).toFixed(2)} s · ${rate}×${ended?' · cue päättyi':playing?' · soi':' · tauko'}`;
 $('pause').textContent=ended?'Toista uudelleen':playing?'Tauko':mediaMs>0?'Jatka':'Toista';
 for(const id of ['old-stage','new-stage']){$(id).classList.toggle('mobile',$('viewport').value==='mobile');$(id).dataset.reduced=String(reduced());}
}
function pause(){cancelAnimationFrame(raf);raf=0;playing=false;paint();}
function cueEnd(){cancelAnimationFrame(raf);raf=0;playing=false;ended=true;paint();}
function start({resetOld=true}={}){
 if(mediaMs>=duration)mediaMs=0;ended=false;if(resetOld)oldPhase=0;pathRate=rate;playing=true;last=performance.now();cancelAnimationFrame(raf);raf=requestAnimationFrame(tick);paint();
}
function tick(now){
 if(!playing)return;const dt=Math.min(80,Math.max(0,now-last));last=now;mediaMs=Math.min(duration,mediaMs+dt*rate);oldPhase=Math.min(1,oldPhase+dt/6200);
 if(autoRate&&mediaMs/duration>=.45&&rate!==2){rate=2;$('rate').value='2';autoRate=false;/* pathRate jää tarkoituksella cuen alun arvoon: ei x-napsahdusta. */}
 paint();if(mediaMs<duration)raf=requestAnimationFrame(tick);else cueEnd();
}
$('play').onclick=()=>{mediaMs=0;rate=Number($('rate').value);autoRate=false;ended=false;start();};
$('pause').onclick=()=>{if(playing)pause();else start();};
$('half').onclick=()=>{duration=6200;$('case').value='6200';mediaMs=duration*.5;rate=Number($('rate').value);autoRate=false;start();};
$('rate-change').onclick=()=>{duration=6200;$('case').value='6200';mediaMs=0;rate=1;$('rate').value='1';autoRate=true;start();};
$('position').oninput=()=>{pause();mediaMs=duration*Number($('position').value)/1000;oldPhase=0;ended=mediaMs>=duration;pathRate=rate;paint();};
$('case').onchange=()=>{pause();duration=Number($('case').value);mediaMs=0;oldPhase=0;ended=false;paint();};
$('rate').onchange=()=>{rate=Number($('rate').value);if(!playing)pathRate=rate;paint();};
$('viewport').onchange=paint;$('motion').onchange=paint;
document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();});
paint();
