import {LIVIA_SVG_ELEET,livianSvgAsento,livianSvgKuva,livianEleenVoima,LIVIAN_KARTTAPALUUT,livianKarttavaistonAsento,LIVIAN_PAIVITETYT_ELEET} from '../js/livia-svg.js';
const $=id=>document.getElementById(id),reduced=matchMedia('(prefers-reduced-motion: reduce)');
let selected='expert',phase=0,strength=livianEleenVoima(selected),raf=0,playing=false,all=false,timer=0,last=0;
let mapDemo=false;
LIVIAN_KARTTAPALUUT.forEach((v,i)=>{const o=document.createElement('option');o.value=i;o.textContent=v.nimi;$('map-return').append(o);});
function duration(){const v=LIVIAN_KARTTAPALUUT[Number($('map-return').value)];return mapDemo?3500+v.kurkistus+v.paluu:selected==='cityExplain'?Number($('cue-duration').value):current().duration;}
function mapPose(){
 const i=Number($('map-return').value),v=LIVIAN_KARTTAPALUUT[i],ms=phase*duration();
 return ms<260?livianKarttavaistonAsento('poistuu',ms/260,i):ms<3500?livianKarttavaistonAsento('piilossa',1,i):ms<3500+v.kurkistus?livianKarttavaistonAsento('kurkistaa',(ms-3500)/v.kurkistus,i):livianKarttavaistonAsento('palaa',(ms-3500-v.kurkistus)/v.paluu,i);
}
for(const name of new Set(LIVIA_SVG_ELEET.map(e=>e.group))){const g=document.createElement('optgroup');g.label=name;for(const e of LIVIA_SVG_ELEET.filter(e=>e.group===name)){const o=document.createElement('option');o.value=e.id;o.textContent=e.label;g.append(o);}$('gesture').append(g);}
function drawer(nimi,eleet,{uudet=false}={}){
 const details=document.createElement('details'),summary=document.createElement('summary'),lista=document.createElement('div');
 details.open=uudet;details.className=uudet?'gesture-drawer updated':'gesture-drawer';lista.className='gesture-list';
 summary.textContent=`${nimi} (${eleet.length}${uudet?' + 5 karttapaluuta':''})`;details.append(summary);
 if(uudet){const p=document.createElement('p');p.textContent='22.9.2026: päivitetty rytmi ja viisi uutta paluukoreografiaa. Samat eleet löytyvät myös omista ryhmistään.';details.append(p);
  LIVIAN_KARTTAPALUUT.forEach((v,i)=>{const b=document.createElement('button');b.type='button';b.dataset.return=String(i);b.textContent='Karttapaluu: '+v.nimi;b.onclick=()=>{$('map-return').value=String(i);mapRun();};lista.append(b);});
 }
 for(const e of eleet){const b=document.createElement('button');b.type='button';b.dataset.gesture=e.id;b.textContent=e.label;b.onclick=()=>{cancelAll();choose(e.id);};lista.append(b);}
 details.append(lista);$('gesture-drawers').append(details);
}
drawer('Uudet ja päivitetyt',LIVIA_SVG_ELEET.filter(e=>LIVIAN_PAIVITETYT_ELEET.includes(e.id)),{uudet:true});
for(const nimi of new Set(LIVIA_SVG_ELEET.map(e=>e.group)))drawer(nimi,LIVIA_SVG_ELEET.filter(e=>e.group===nimi));
function markSelection(){for(const b of $('gesture-drawers').querySelectorAll('button'))b.setAttribute('aria-pressed',String(mapDemo?b.dataset.return===$('map-return').value:b.dataset.gesture===selected));}
function current(){return LIVIA_SVG_ELEET.find(e=>e.id===selected);}
function paint(){
 const s=mapDemo?mapPose():livianSvgAsento(selected,phase,{voimakkuus:strength,muunnelma:Number($('variation').value),cueKestoMs:Number($('cue-duration').value)});
 $('cue-duration').disabled=selected!=='cityExplain';
 $('actual').innerHTML=livianSvgKuva(s,{right:44,prefix:'actual'});
 let big=livianSvgKuva(s,{right:44,prefix:'zoom'});
 if(!mapDemo&&current().group!=='Liike')big=big.replace('viewBox="0 0 196 304"','viewBox="0 125 196 179"');
 $('zoom').innerHTML=big;$('position').value=Math.round(phase*1000);$('progress').textContent=Math.round(phase*100)+' %';
 $('strength-label').textContent=Math.round(strength*100)+' %';
}
function stop(){cancelAnimationFrame(raf);clearTimeout(timer);raf=0;playing=false;$('pause').textContent='Jatka';}
function cancelAll(){all=false;$('all').setAttribute('aria-pressed','false');}
function run(){
 if(document.hidden||reduced.matches)return;
 stop();playing=true;$('pause').textContent='Pysäytä';const start=performance.now(),from=phase,kesto=duration()*($('slow').checked?2.5:1);
 const tick=now=>{phase=Math.min(1,from+(now-start)/kesto);if(now-last>=30||phase>=1){paint();last=now;}if(phase<1)raf=requestAnimationFrame(tick);else{stop();if(all){timer=setTimeout(()=>{const i=LIVIA_SVG_ELEET.findIndex(e=>e.id===selected);if(i===LIVIA_SVG_ELEET.length-1){cancelAll();$('description').textContent=`Kaikki ${LIVIA_SVG_ELEET.length} elettä näytetty.`;}else choose(LIVIA_SVG_ELEET[i+1].id);},450);}}};
 raf=requestAnimationFrame(tick);
}
function choose(id){stop();mapDemo=false;selected=id;$('gesture').value=id;strength=livianEleenVoima(id);$('strength').value=Math.round(strength*100);phase=reduced.matches?.45:0;$('description').textContent=current().label;markSelection();paint();run();}
$('gesture').onchange=()=>{cancelAll();choose($('gesture').value);};
$('strength').oninput=()=>{strength=Number($('strength').value)/100;paint();};
$('position').oninput=()=>{cancelAll();stop();phase=Number($('position').value)/1000;paint();};
$('play').onclick=()=>{cancelAll();stop();phase=reduced.matches?.45:0;paint();run();};
$('pause').onclick=()=>{cancelAll();if(playing)stop();else{if(phase>=1)phase=0;run();}};
$('all').onclick=()=>{if(all){cancelAll();stop();}else if(!reduced.matches){all=true;$('all').setAttribute('aria-pressed','true');choose(LIVIA_SVG_ELEET[0].id);}};
$('slow').onchange=()=>{if(playing)run();};
$('variation').onchange=()=>paint();
$('cue-duration').onchange=()=>{cancelAll();stop();phase=0;paint();run();};
function mapRun(){cancelAll();stop();mapDemo=true;phase=0;$('description').textContent=LIVIAN_KARTTAPALUUT[Number($('map-return').value)].nimi+' — liike-esikatselu: nopea lähtö, rauha, kurkistus, paluu. Pelin kameran keskeytykset testataan ohjaintesteissä.';markSelection();paint();run();}
$('map-move').onclick=mapRun;
$('map-return').onchange=()=>{if(mapDemo)mapRun();};
function motion(){stop();cancelAll();$('reduced').hidden=!reduced.matches;phase=reduced.matches?.45:0;paint();}
reduced.addEventListener('change',motion);document.addEventListener('visibilitychange',()=>{stop();cancelAll();});
$('reduced').hidden=!reduced.matches;choose(selected);
