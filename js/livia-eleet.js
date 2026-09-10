import { kuunteleLivianTilanteita, livianAiheEle } from './livia-tilanteet.js';
import { asennaLivianNostoTila } from './livia-nostotila.js';
/* Livian kokopulun SVG-eleet. Nykyinen chat ja puhekuplat omistavat sisällön;
 * tämä sovitin kuuntelee niitä ja äänen todellista toistotilaa. */
import { LIVIA_SVG_ELEET, livianSvgAsento, luoLivianSvg, livianEleenVoima } from './livia-svg.js';
import { sfx, AANIVALINTA_TAPAHTUMA } from './sound.js';
import { livianEleaaniIskut } from './livia-tehosteet.js';
import { kuunteleLivianKasvopuhetta, livianKasvopuheenTila } from './livia-puhetila.js';
import { asennaLivianChatTila } from './livia-chat-tila.js';

/** Jo näkyvä täytelause määrää liikkeen. Ei uutta repliikkiä tai arvontaa. */
export function livianMietintaEle(teksti='') {
 if(/pulla|pullalla|mur[uui]/iu.test(teksti))return 'crumb';
 if(/sulki|sulka|siiven alla|kynä.*siiv/iu.test(teksti))return 'preen';
 if(/mär|sade/iu.test(teksti))return 'rain';
 if(/vastatuul|tuuli vei/iu.test(teksti))return 'wind';
 if(/väärinpäin|väärässä|pudotin|jumissa/iu.test(teksti))return 'confused';
 if(/pöll|kysyn|kysymässä|oikealta linnulta|vien viestin|lent|kaart|kierrosta|kaukana|käyn hakemassa/iu.test(teksti))return 'flyAway';
 if(/pienellä|käsial|luen|painettu/iu.test(teksti))return 'reading';
 if(/(?:^|[^\p{L}])(?:kaivan|arkist|hylly|katto|katolle|kirjaan|kirjan|sähkeitä)/iu.test(teksti))return 'peek';
 if(/ajattel|ajatuk|tarkistan|tiedon|fakta|muistan/iu.test(teksti))return 'think';
 if(/ikkun|katson/iu.test(teksti))return 'lookRight';
 return 'glance';
}
/** Vain näkyvän pulurepliikin sävy, ei pelaajan piilotettua pelitietoa. */
export function livianRepliikinEle(teksti='') {
 if(/kääk|apua!|kauhist|hui!/iu.test(teksti))return 'shock';
 if(/aivan tavallinen|ihast|rakas|rakast|sydämeni/iu.test(teksti))return 'love';
 if(/pulla|pullaa|pullan|muru/iu.test(teksti))return /tuijot|näen|tuoksu|pulla ensin/iu.test(teksti)?'manic':'bread';
 if(/en minä|nol|anteeksi|hups|vahingossa|minun vik/iu.test(teksti))return 'embarrassed';
 if(/en voi uskoa|ei voi olla|uskomaton|oikeastiko|yhdeksäntuhatta/iu.test(teksti))return 'disbelief';
 if(/pah!|kehtaa|tuoht|hävy|epäreilu|suut/iu.test(teksti))return 'angry';
 if(/en tiedä|mitähän|kummall|häh/iu.test(teksti))return 'confused';
 if(/pitkäst|kylläst|odotellaan|taasko/iu.test(teksti))return 'bored';
 if(/pöh|puh!|posk|pier/iu.test(teksti))return 'puff';
 if(/nuk|uness|väsyt/iu.test(teksti))return 'yawn';
 if(/lum|hiutale/iu.test(teksti))return 'snow';
 if(/sade|sataa|märkä/iu.test(teksti))return 'rain';
 if(/aurinko|häikäis/iu.test(teksti))return 'sun';
 if(/tuuli|mistral/iu.test(teksti))return 'wind';
 if(/kyllä kyllä|juuri niin|aivan oikein|olet oikeassa/iu.test(teksti))return 'nod';
 if(/oikein|löysit|onnistu|hienoa|hah/iu.test(teksti))return 'grin';
 if(/väärin|ei todellakaan/iu.test(teksti))return 'shake';
 if(/tiedän|asiantunt|minähän sanoin|tietenkin|selvennys|kuulehan/iu.test(teksti))return 'expert';
 return 'blink';
}
export function asennaLivianKasvot(pollo) {
 const doc=pollo?.doc,nappi=pollo?.nappi;
 if(!doc?.createElement||!nappi?.append||typeof MutationObserver==='undefined'||typeof requestAnimationFrame==='undefined')return null;
 const pinta=doc.createElement('span'),canvas=doc.createElement('span');
 pinta.className='livia-kasvot-pinta livia-svg-pulu livia-lentonayttamo';pinta.setAttribute('aria-hidden','true');pinta.append(canvas);
 let kasvot;try{kasvot=luoLivianSvg(canvas);}catch{return null;}
 doc.body.append(pinta);nappi.classList.add('livia-kasvot-valmis');
 const vahenna=typeof matchMedia==='function'?matchMedia('(prefers-reduced-motion: reduce)'):null;
 let kuollut=false,raf=0,kello=0,jatkoAjastin=0,nykyinen=null,alkoi=0,osuus=0,viimePiirto=-Infinity;
 let odotusrivi=null,odotusteksti='',viimeToimi=performance.now(),viimeEle=0,tyhjaVuoro=0;
 let puhe=false,puheAlku=0,lepoTila=null,auki=Boolean(pollo.auki),oliNakyva=false,ensisaapuminen=false,paluuVuoro=0;
 let aaniPois=[],aaniIndeksi=0,viimeAsento=null,viimeTilanne=-Infinity;
 let nostoTila=null;
 let lehtiPaalla=false,odotusVuoro=0;
 const odotukset=new Set();
 const luennat=new Map();
 const lepo=()=>livianSvgAsento('blink',0);
 const nakyy=()=>!doc.hidden&&(!nappi.getClientRects||nappi.getClientRects().length>0)&&!nappi.hidden&&nappi.isConnected&&getComputedStyle(nappi).display!=='none'&&getComputedStyle(nappi).visibility!=='hidden';
 function sijoita(){
  if(kuollut)return;const rect=nappi.getBoundingClientRect?.()||{right:152,bottom:304};
  const viewport=doc.documentElement?.clientWidth||rect.right;
  const gap=Math.max(0,viewport-rect.right);
  const lehti=doc.getElementById?.('arrival-dialog'),lehdessa=Boolean(lehti?.open&&lehti.classList?.contains('lehti'));
  const kohde=nappi.closest?.('dialog[open]')|| (lehdessa?lehti:doc.body);
  if((pinta.parentNode||pinta.parent)!==kohde)kohde.append(pinta);
  pinta.classList[lehdessa?'add':'remove']('livia-lehdessa');
  kasvot.resize(gap);pinta.style.left=`${rect.right-152}px`;pinta.style.top=`${rect.bottom-304}px`;
  pinta.style.width=`${152+gap}px`;pinta.style.height='304px';pinta.hidden=!nakyy();
 }
 const piirra=s=>{if(!kuollut){viimeAsento=s;sijoita();
  const lasit=s.ele==='glasses'&&s.p<.32?Math.max(0,Math.min(1,(s.p-.12)/.20)):1;
  kasvot.paint(lehtiPaalla?{...s,glasses:lasit}:s);
 }};
 function vaienna(){for(const stop of aaniPois)stop?.();aaniPois=[];}
 function iskut(){
  if(!nykyinen)return;const cues=livianEleaaniIskut(nykyinen.id);
  while(aaniIndeksi<cues.length&&cues[aaniIndeksi].at<=osuus){const cue=cues[aaniIndeksi++];
   if(!sfx.enabled||sfx.saneluTauko||sfx.taustaTauko||nykyinen.hiljaa||osuus-cue.at>.09||!nakyy()||vahenna?.matches)continue;
   const ui=pollo.haeUi?.(),duck=(puhe||ui?.liviaAani||ui?.diaryVoice)?0.25:1;
   try{const stop=sfx.play('liviaEle',{kind:cue.kind,voima:cue.level*duck});if(stop)aaniPois.push(stop);}catch{/* tehoste ei estä kuvaa */}
  }
 }
 function paikkaMuuttui(){if(viimeAsento)piirra(viimeAsento);}
 const chatTila=asennaLivianChatTila(pollo,paikkaMuuttui);
 function katkaise(){cancelAnimationFrame(raf);clearTimeout(jatkoAjastin);raf=0;nykyinen=null;vaienna();}
 function piirraNyt(nyt){
  let s=nykyinen?livianSvgAsento(nykyinen.id,osuus,{voimakkuus:nykyinen.voimakkuus}):(lepoTila||lepo());
  // Nokan liike on rytmitetty ele, ei foneemikohtainen huulisynkka.
  if(puhe&&!s.flight&&!s.walk&&s.x===0&&s.y<5&&!['shock','puff','cover','preen','chew','chewManic','yawn'].includes(s.frame)){
    s={...s,mouth:livianSvgAsento('talk',((nyt-puheAlku)%1500)/1500).frame};
  }
  piirra({...s,propsRight:Boolean(pollo.auki)});
 }
 function askel(nyt){
  raf=0;if(kuollut||!nakyy()||vahenna?.matches){katkaise();piirra(lepo());return;}
  if(nykyinen){
    osuus=Math.min(1,(nykyinen.fromProgress||0)+(nyt-alkoi)/nykyinen.duration);iskut();
    if(osuus>=1){
      const valmis=nykyinen;nykyinen=null;
      if(['leaveRight','leaveDown','flyAway','walkRight'].includes(valmis.id))lepoTila=livianSvgAsento(valmis.id,1);
      if(valmis.nuku)lepoTila={...lepo(),frame:'sleep',y:3,tilt:1};
      if(valmis.jatko)jatkoAjastin=setTimeout(()=>toista(valmis.jatko,{hiljaa:valmis.hiljaa}),800);
    }
  }
  if(nyt-viimePiirto>=32){piirraNyt(nyt);viimePiirto=nyt;}
  if(nykyinen||puhe)raf=requestAnimationFrame(askel);else piirraNyt(nyt);
 }
 function kaynnista(){if(!raf&&!kuollut&&nakyy()&&!vahenna?.matches)raf=requestAnimationFrame(askel);}
 function toista(id,asetukset={}){
  if(id==='owl')id='flyAway';
  const ele=LIVIA_SVG_ELEET.find(e=>e.id===id);if(!ele||kuollut)return false;
  katkaise();lepoTila=null;
  if(!nakyy()||vahenna?.matches){piirra(lepo());return false;}
  nykyinen={...ele,voimakkuus:livianEleenVoima(id),...asetukset};osuus=asetukset.fromProgress||0;aaniIndeksi=0;alkoi=performance.now();viimeEle=alkoi;viimePiirto=-Infinity;
  piirraNyt(alkoi);kaynnista();return true;
 }
 /** Ei jonoa: vanha kuva tai luenta ei saa reaktiota toisessa kaupungissa. */
 function jatkaKuunteluaTaiOdotusta(){
  if(puhe)return;
  const luenta=[...luennat.values()].at(-1);
  if(luenta)tilanne('narration',luenta);
  else if(odotukset.size&&!nostoTila?.onkoAuki())toista(lehtiPaalla?'scratch':'think',{hiljaa:true,omistaja:'waiting'});
 }
 function tilanne(laji,tiedot={}){
  if(laji==='narration')luennat.set(tiedot.tunnus,tiedot);
  if(laji==='waiting'){
   odotukset.add(tiedot.tunnus);viimeToimi=performance.now();
   if(!puhe&&!luennat.size)toista(lehtiPaalla?'scratch':'think',{hiljaa:true,omistaja:'waiting'});
   return true;
  }
  if(laji==='waitingEnd'){
   odotukset.delete(tiedot.tunnus);
   if(!odotukset.size){odotusrivi=null;odotusteksti='';
    if(!puhe&&!luennat.size&&(!nykyinen||nykyinen.omistaja==='waiting'))palaa();
   }
   return true;
  }
  if(laji==='narrationEnd'||laji==='cardEnd'){
   if(laji==='narrationEnd'&&!luennat.delete(tiedot.tunnus))return false;
   const omistaja=laji==='cardEnd'?'card':'narration';
   if(nykyinen?.omistaja===omistaja&&(!tiedot.tunnus||nykyinen.tunnus===tiedot.tunnus)){katkaise();piirraNyt(performance.now());kaynnista();}
   if(laji==='cardEnd'||!nykyinen)jatkaKuunteluaTaiOdotusta();
   return false;
  }
  const nyt=performance.now();
  if(!nakyy()||(laji!=='narration'&&(odotusrivi||odotukset.size))||nykyinen?.group==='Liike'||lepoTila?.flight||lepoTila?.walk)return false;
  // Reaktio kuuluu vain näkymään, jossa myös Pulu itse on. Pelkkä
  // modaalin olemassaolo ei estä lehden sisällä näkyvän Pulun kuuntelua.
  if(doc.querySelector('dialog[open]')&&!nappi.closest?.('dialog[open]'))return false;
  if(luennat.size&&!['narration','card'].includes(laji))return false;
  if(laji==='narration'&&(puhe||pollo.auki||nostoTila?.onkoAuki()))return false;
  if(laji!=='card'&&nykyinen?.omistaja==='card')return false;
  if(!['card','narration','chatOpen','chatClose','microphone','answer'].includes(laji)&&nyt-viimeTilanne<2800)return false;
  if(puhe&&laji!=='photo')return false;
  if(puhe&&laji==='photo'&&nykyinen&&!['blink','talk','smile','present','welcome'].includes(nykyinen.id))return false;
  const ele=laji==='card'?livianAiheEle(tiedot):laji==='narration'||laji==='emotion'?tiedot.ele:
   laji==='photo'?(tiedot.cityId==='venetsia'?'love':'present'):
   laji==='chatOpen'?'welcome':laji==='chatClose'?'wink':laji==='microphone'?'listen':
   laji==='answer'?(livianRepliikinEle(tiedot.teksti)==='blink'?'smile':livianRepliikinEle(tiedot.teksti)):
   laji==='success'?'grin':laji==='retry'?'nod':null;
  if(!ele)return false;
  viimeTilanne=nyt;viimeToimi=nyt;
  return toista(ele,{hiljaa:true,omistaja:laji,tunnus:tiedot.tunnus,voimakkuus:laji==='narration'?.25:laji==='emotion'?tiedot.voimakkuus:livianEleenVoima(ele)});
 }
 function palaa(){
  const s=nykyinen?livianSvgAsento(nykyinen.id,osuus,{voimakkuus:nykyinen.voimakkuus}):lepoTila;
  if(s?.flight){const id=!puhe&&++paluuVuoro%7===0?'glassCrash':'flyBack';toista(id,{duration:id==='glassCrash'?2600:1400,fromProgress:id==='flyBack'&&s.flight.kind==='away'?Math.max(0,(1-s.flight.t)*.58):0});}
  else if(s?.walk)toista('walkBack');else if(s?.x>0)toista('arrive');else if(s?.y>5)toista('emerge');else{katkaise();lepoTila=null;piirra(lepo());kaynnista();}
 }
 function mietintaMuuttui(){
  const rivi=pollo.auki?pollo.virta?.querySelector('.pollo-odottaa'):null,teksti=rivi?.textContent||'';
  if(rivi===odotusrivi&&teksti===odotusteksti)return;
  const oli=odotusrivi,ele=nykyinen?.id;odotusrivi=rivi;odotusteksti=teksti;
  if(!rivi){if(oli&&!odotukset.size&&!luennat.size&&!puhe)palaa();return;}
  if(odotukset.size)return;
  if(puhe||luennat.size||rivi===oli&&(ele==='flyAway'||lepoTila?.flight))return;
  toista(livianMietintaEle(teksti),{voimakkuus:livianEleenVoima(livianMietintaEle(teksti),teksti)});
 }
 function rauhallinen(){
  const ui=pollo.haeUi?.();
  return nakyy()&&!luennat.size&&!nostoTila?.onkoAuki()&&!pollo.auki&&!odotusrivi&&!puhe&&!ui?.liviaAani&&!ui?.diaryVoice
    &&!doc.querySelector('dialog[open], .pollo-kuplapino-kehys:not([hidden])')
    &&!doc.body.classList.contains('aikajana-paalla')&&!doc.body.classList.contains('flight-active')&&!doc.body.classList.contains('kartalento');
 }
 function ajasta(){
  clearTimeout(kello);if(kuollut||vahenna?.matches)return;
  kello=setTimeout(()=>{
   const nyt=performance.now(),tauko=nyt-viimeToimi;
   if(!nykyinen&&!puhe&&!luennat.size&&nakyy()&&odotukset.size){
    toista(lehtiPaalla?'scratch':['think','lookRight','reading'][odotusVuoro++%3],{hiljaa:true,omistaja:'waiting'});
   }else if(!nykyinen&&!puhe&&!luennat.size&&nakyy()&&lehtiPaalla&&!pollo.auki&&nyt-viimeEle>=22000){
    toista('scratch',{hiljaa:true});
   }else if(!nykyinen&&!lepoTila&&rauhallinen()&&tauko>=30000&&nyt-viimeEle>=22000){
    if(tauko>=180000)toista('sleep',{nuku:true});
    else{const id=['blink','turn','preen','bored','glance','puff','crumb','tilt','lookUp','lookDown','doubleTake','facepalm','sneeze','leaveDown','walkRight','flyAway'][tyhjaVuoro++%16];toista(id,{hiljaa:true,jatko:id==='leaveDown'?'emerge':id==='walkRight'?'walkBack':id==='flyAway'?'flyBack':null});}
   }
   ajasta();
  },8000);
 }
 function toiminta(){const nukkui=lepoTila?.frame==='sleep';viimeToimi=performance.now();if(nukkui)toista('wake');else if(!odotusrivi&&!puhe&&lepoTila)palaa();}
 function saapuminen(){if(!ensisaapuminen){ensisaapuminen=true;toista('handoff');}else toista(++paluuVuoro%7===0?'glassCrash':'clumsyLand');}
 const nappiVahti=new MutationObserver(()=>{
  chatTila?.paivita();nostoTila?.paivita();
  const n=nakyy();if(!n){katkaise();piirra(lepo());}else{paikkaMuuttui();if(!oliNakyva)saapuminen();}oliNakyva=n;
  if(Boolean(pollo.auki)!==auki){auki=Boolean(pollo.auki);odotusrivi=null;odotusteksti='';if(!puhe)tilanne(auki?'chatOpen':'chatClose');mietintaMuuttui();}
 });
 const lehti=doc.getElementById?.('arrival-dialog')??null;
 function lehtiMuuttui(){
  const auki=Boolean(lehti?.open&&lehti.classList?.contains('lehti')),muuttui=auki!==lehtiPaalla;
  lehtiPaalla=auki;paikkaMuuttui();
  if(muuttui){if(auki&&!puhe&&!luennat.size&&!odotukset.size)toista('glasses',{hiljaa:true});else piirraNyt(performance.now());}
 }
 const lehtiVahti=lehti?new MutationObserver(lehtiMuuttui):null;lehtiVahti?.observe(lehti,{attributes:true,attributeFilter:['open','class']});
 const virtaVahti=new MutationObserver(mietintaMuuttui);
 const kokoVahti=typeof ResizeObserver==='function'?new ResizeObserver(paikkaMuuttui):null;kokoVahti?.observe(nappi);
 function liikeAsetus(){katkaise();lepoTila=null;piirra(lepo());ajasta();if(!vahenna?.matches)kaynnista();}
 function tausta(){
  if(doc.hidden){katkaise();piirra(lepo());}else{puhe=livianKasvopuheenTila().length>0;puheAlku=performance.now();kaynnista();}
  viimeToimi=performance.now();
 }
 const irrotaPuhe=kuunteleLivianKasvopuhetta(tilat=>{
  const oli=puhe;puhe=tilat.length>0;
  if(puhe&&nykyinen?.omistaja==='narration')katkaise();
  if(puhe&&!oli){puheAlku=performance.now();
    if(nykyinen?.id==='flyAway'||lepoTila?.flight||nykyinen?.id==='peek'||nykyinen?.id.startsWith('leave')||nykyinen?.id==='walkRight'||lepoTila?.walk)palaa();
    else if(!nykyinen){lepoTila=null;const teksti=tilat.at(-1)?.teksti||'',ele=livianRepliikinEle(teksti);toista(ele,{voimakkuus:livianEleenVoima(ele,teksti)});}
  }
  if(!puhe){piirraNyt(performance.now());if(oli)jatkaKuunteluaTaiOdotusta();
   if(!luennat.size&&!odotukset.size&&odotusrivi&&!nykyinen)toista(livianMietintaEle(odotusteksti));}
  kaynnista();
 });
 function tuhoa(){
  if(kuollut)return;kuollut=true;irrotaTilanteet();nostoTila?.tuhoa();chatTila?.tuhoa();katkaise();clearTimeout(kello);irrotaPuhe();nappiVahti.disconnect();lehtiVahti?.disconnect();virtaVahti.disconnect();pinta.remove();nappi.classList.remove('livia-kasvot-valmis');
  doc.removeEventListener('pointerdown',toiminta,true);doc.removeEventListener('keydown',toiminta,true);doc.removeEventListener('visibilitychange',tausta);vahenna?.removeEventListener('change',liikeAsetus);globalThis.removeEventListener?.('pagehide',tausta);globalThis.removeEventListener?.('resize',paikkaMuuttui);doc.removeEventListener('scroll',paikkaMuuttui,true);nappi.removeEventListener('transitionend',paikkaMuuttui);doc.removeEventListener(AANIVALINTA_TAPAHTUMA,vaienna);kokoVahti?.disconnect();
 }
 const irrotaTilanteet=kuunteleLivianTilanteita(tilanne);
 nostoTila=asennaLivianNostoTila(pollo,pinta,tilanne,paikkaMuuttui);
 nappiVahti.observe(nappi,{attributes:true,attributeFilter:['hidden','class','aria-expanded','style']});
 if(pollo.virta)virtaVahti.observe(pollo.virta,{childList:true,subtree:true,characterData:true});
 doc.addEventListener('pointerdown',toiminta,true);doc.addEventListener('keydown',toiminta,true);doc.addEventListener('visibilitychange',tausta);vahenna?.addEventListener('change',liikeAsetus);globalThis.addEventListener?.('pagehide',tausta);globalThis.addEventListener?.('resize',paikkaMuuttui);doc.addEventListener('scroll',paikkaMuuttui,true);nappi.addEventListener('transitionend',paikkaMuuttui);doc.addEventListener(AANIVALINTA_TAPAHTUMA,vaienna);
  chatTila?.paivita();oliNakyva=nakyy();if(oliNakyva)saapuminen();lehtiMuuttui();ajasta();mietintaMuuttui();
 return{
  kupla(teksti,{saapuu=false}={}){viimeToimi=performance.now();if(odotusrivi)return;if(nykyinen?.id==='handoff')return;const ele=saapuu?'clumsyLand':livianRepliikinEle(teksti);toista(ele,{voimakkuus:livianEleenVoima(ele,teksti)});},
  tilanne,toista,palaa,tuhoa,eleet:LIVIA_SVG_ELEET,
 };
}
