import {LIVIA_SVG_ELEET,livianSvgAsento,livianSvgKuva,livianEleenVoima} from '../js/livia-svg.js';
const $=id=>document.getElementById(id),reduced=matchMedia('(prefers-reduced-motion: reduce)');
let selected='glideIn',phase=0,strength=livianEleenVoima(selected),raf=0,playing=false,all=false,timer=0,last=0;
// Katselusivun "uudet" tarkoittaa nykyisen SVG-kokopulun myöhemmin
// lisättyjä koreografioita. Ne ovat myös omissa varsinaisissa ryhmissään.
const UUDET_ELEET=new Set(['glideIn','trailerFlee','trailerBack','chatDashOut','chatDashBack','chatDustOff','mapPeck','bunFeast','cityExplain','smile','grin','wink','welcome','present','glasses','bookStudy','scratch','eyeRub','chuckle']);
const KATEGORIAT=[{id:'uudet',nimi:'Uudet eleet',eleet:LIVIA_SVG_ELEET.filter(ele=>UUDET_ELEET.has(ele.id))},...[...new Set(LIVIA_SVG_ELEET.map(ele=>ele.group))].map(nimi=>({id:nimi,nimi,eleet:LIVIA_SVG_ELEET.filter(ele=>ele.group===nimi)}))];
let kategoria='uudet';
function piirraKategoriat(){
 $('gesture-categories').replaceChildren();
 for(const ryhma of KATEGORIAT){const nappi=document.createElement('button');nappi.type='button';nappi.dataset.category=ryhma.id;nappi.textContent=`${ryhma.nimi} (${ryhma.eleet.length})`;nappi.setAttribute('aria-pressed',String(ryhma.id===kategoria));nappi.onclick=()=>{cancelAll();kategoria=ryhma.id;piirraKategoriat();piirraElevalinnat();choose(ryhma.eleet[0].id,true);};$('gesture-categories').append(nappi);}
}
function piirraElevalinnat(){
 const ryhma=KATEGORIAT.find(r=>r.id===kategoria);$('gesture-options').replaceChildren();
 for(const ele of ryhma.eleet){const nappi=document.createElement('button');nappi.type='button';nappi.dataset.gesture=ele.id;nappi.textContent=ele.label;nappi.onclick=()=>{cancelAll();choose(ele.id,true);};$('gesture-options').append(nappi);}
 merkitseValittu();
}
function merkitseValittu(){for(const nappi of $('gesture-options').querySelectorAll('button'))nappi.setAttribute('aria-pressed',String(nappi.dataset.gesture===selected));}
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
 const tick=now=>{phase=Math.min(1,from+(now-start)/duration);if(now-last>=30||phase>=1){paint();last=now;}if(phase<1)raf=requestAnimationFrame(tick);else{stop();if(all){timer=setTimeout(()=>{const i=LIVIA_SVG_ELEET.findIndex(e=>e.id===selected);if(i===LIVIA_SVG_ELEET.length-1){cancelAll();$('description').textContent=`Kaikki ${LIVIA_SVG_ELEET.length} elettä näytetty.`;}else choose(LIVIA_SVG_ELEET[i+1].id);},450);}}};
 raf=requestAnimationFrame(tick);
}
function choose(id,pidaKategoria=false){
 stop();selected=id;
 if(!pidaKategoria){const ryhma=KATEGORIAT.find(r=>r.id!=='uudet'&&r.eleet.some(ele=>ele.id===id));if(ryhma&&ryhma.id!==kategoria){kategoria=ryhma.id;piirraKategoriat();piirraElevalinnat();}}
 strength=livianEleenVoima(id);$('strength').value=Math.round(strength*100);phase=reduced.matches?.45:0;$('description').textContent=current().label;merkitseValittu();paint();run();
}
$('strength').oninput=()=>{strength=Number($('strength').value)/100;paint();};
$('position').oninput=()=>{cancelAll();stop();phase=Number($('position').value)/1000;paint();};
$('play').onclick=()=>{cancelAll();stop();phase=reduced.matches?.45:0;paint();run();};
$('pause').onclick=()=>{cancelAll();if(playing)stop();else{if(phase>=1)phase=0;run();}};
$('all').onclick=()=>{if(all){cancelAll();stop();}else if(!reduced.matches){all=true;$('all').setAttribute('aria-pressed','true');choose(LIVIA_SVG_ELEET[0].id);}};
$('slow').onchange=()=>{if(playing)run();};
function motion(){stop();cancelAll();$('reduced').hidden=!reduced.matches;phase=reduced.matches?.45:0;paint();}
reduced.addEventListener('change',motion);document.addEventListener('visibilitychange',()=>{stop();cancelAll();});
$('reduced').hidden=!reduced.matches;piirraKategoriat();piirraElevalinnat();choose(selected,true);
