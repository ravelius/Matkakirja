import {LIVIA_SVG_ELEET,livianSvgAsento,livianSvgKuva,livianEleenVoima} from '../js/livia-svg.js';
const $=id=>document.getElementById(id),reduced=matchMedia('(prefers-reduced-motion: reduce)');
let selected='expert',phase=0,strength=livianEleenVoima(selected),raf=0,playing=false,all=false,timer=0,last=0;
for(const name of new Set(LIVIA_SVG_ELEET.map(e=>e.group))){const g=document.createElement('optgroup');g.label=name;for(const e of LIVIA_SVG_ELEET.filter(e=>e.group===name)){const o=document.createElement('option');o.value=e.id;o.textContent=e.label;g.append(o);}$('gesture').append(g);}
function current(){return LIVIA_SVG_ELEET.find(e=>e.id===selected);}
function paint(){
 const s=livianSvgAsento(selected,phase,{voimakkuus:strength});
 $('actual').innerHTML=livianSvgKuva(s,{right:44,prefix:'actual'});
 let big=livianSvgKuva(s,{right:44,prefix:'zoom'});
 if(current().group!=='Liike')big=big.replace('viewBox="0 0 196 304"','viewBox="0 125 196 179"');
 $('zoom').innerHTML=big;$('position').value=Math.round(phase*1000);$('progress').textContent=Math.round(phase*100)+' %';
 $('strength-label').textContent=Math.round(strength*100)+' %';
}
function stop(){cancelAnimationFrame(raf);clearTimeout(timer);raf=0;playing=false;$('pause').textContent='Jatka';}
function cancelAll(){all=false;$('all').setAttribute('aria-pressed','false');}
function run(){
 if(document.hidden||reduced.matches)return;
 stop();playing=true;$('pause').textContent='Pysäytä';const start=performance.now(),from=phase,duration=current().duration*($('slow').checked?2.5:1);
 const tick=now=>{phase=Math.min(1,from+(now-start)/duration);if(now-last>=30||phase>=1){paint();last=now;}if(phase<1)raf=requestAnimationFrame(tick);else{stop();if(all){timer=setTimeout(()=>{const i=LIVIA_SVG_ELEET.findIndex(e=>e.id===selected);if(i===LIVIA_SVG_ELEET.length-1){cancelAll();$('description').textContent='Kaikki 51 elettä näytetty.';}else choose(LIVIA_SVG_ELEET[i+1].id);},450);}}};
 raf=requestAnimationFrame(tick);
}
function choose(id){stop();selected=id;$('gesture').value=id;strength=livianEleenVoima(id);$('strength').value=Math.round(strength*100);phase=reduced.matches?.45:0;$('description').textContent=current().label;paint();run();}
$('gesture').onchange=()=>{cancelAll();choose($('gesture').value);};
$('strength').oninput=()=>{strength=Number($('strength').value)/100;paint();};
$('position').oninput=()=>{cancelAll();stop();phase=Number($('position').value)/1000;paint();};
$('play').onclick=()=>{cancelAll();stop();phase=reduced.matches?.45:0;paint();run();};
$('pause').onclick=()=>{cancelAll();if(playing)stop();else{if(phase>=1)phase=0;run();}};
$('all').onclick=()=>{if(all){cancelAll();stop();}else if(!reduced.matches){all=true;$('all').setAttribute('aria-pressed','true');choose(LIVIA_SVG_ELEET[0].id);}};
$('slow').onchange=()=>{if(playing)run();};
function motion(){stop();cancelAll();$('reduced').hidden=!reduced.matches;phase=reduced.matches?.45:0;paint();}
reduced.addEventListener('change',motion);document.addEventListener('visibilitychange',()=>{stop();cancelAll();});
$('reduced').hidden=!reduced.matches;choose(selected);
