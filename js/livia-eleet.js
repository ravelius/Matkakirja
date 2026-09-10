/* Livian pikselieleet. Nykyinen chat ja puhekuplat omistavat sisällön;
 * tämä sovitin kuuntelee niitä ja äänen todellista toistotilaa. */
import { LIVIA_PIX_ELEET, livianPikseliAsento, luoLivianPikselit } from './livia-pikselit.js';
import { sfx, AANIVALINTA_TAPAHTUMA } from './sound.js';
import { livianEleaaniIskut } from './livia-tehosteet.js';
import { kuunteleLivianKasvopuhetta, livianKasvopuheenTila } from './livia-puhetila.js';

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
 if(/oikein|löysit|onnistu|hienoa|hah/iu.test(teksti))return 'happy';
 if(/väärin|ei todellakaan/iu.test(teksti))return 'shake';
 if(/tiedän|asiantunt|minähän sanoin|tietenkin|selvennys|kuulehan/iu.test(teksti))return 'expert';
 return 'blink';
}
export function asennaLivianKasvot(pollo) {
 const doc=pollo?.doc,nappi=pollo?.nappi;
 if(!doc?.createElement||!nappi?.append||typeof MutationObserver==='undefined'||typeof requestAnimationFrame==='undefined')return null;
 const pinta=doc.createElement('span'),canvas=doc.createElement('canvas');
 pinta.className='livia-kasvot-pinta livia-pikselit livia-lentonayttamo';pinta.setAttribute('aria-hidden','true');pinta.append(canvas);
 let kasvot;try{kasvot=luoLivianPikselit(canvas);}catch{return null;}
 doc.body.append(pinta);nappi.classList.add('livia-kasvot-valmis');
 const vahenna=typeof matchMedia==='function'?matchMedia('(prefers-reduced-motion: reduce)'):null;
 let kuollut=false,raf=0,kello=0,jatkoAjastin=0,nykyinen=null,alkoi=0,osuus=0,viimePiirto=-Infinity;
 let odotusrivi=null,odotusteksti='',viimeToimi=performance.now(),viimeEle=0,tyhjaVuoro=0;
 let puhe=false,puheAlku=0,lepoTila=null,auki=Boolean(pollo.auki),oliNakyva=false,ensisaapuminen=false,paluuVuoro=0;
 let aaniPois=[],aaniIndeksi=0,viimeAsento=null;
 const lepo=()=>livianPikseliAsento('blink',0);
 const nakyy=()=>!doc.hidden&&(!nappi.getClientRects||nappi.getClientRects().length>0)&&!nappi.hidden&&nappi.isConnected&&getComputedStyle(nappi).display!=='none'&&getComputedStyle(nappi).visibility!=='hidden';
 function sijoita(){
  if(kuollut)return;const rect=nappi.getBoundingClientRect?.()||{right:114,bottom:228};
  const viewport=doc.documentElement?.clientWidth||rect.right;
  const gap=Math.max(0,viewport-rect.right);
  kasvot.resize(gap);pinta.style.left=`${rect.right-114}px`;pinta.style.top=`${rect.bottom-228}px`;
  pinta.style.width=`${114+gap}px`;pinta.style.height='228px';pinta.hidden=!nakyy();
 }
 const piirra=s=>{if(!kuollut){viimeAsento=s;sijoita();kasvot.paint(s,{compact:!nykyinen&&!puhe&&!s.flight&&!s.walk&&s.y<5});}};
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
 function katkaise(){cancelAnimationFrame(raf);clearTimeout(jatkoAjastin);raf=0;nykyinen=null;vaienna();}
 function piirraNyt(nyt){
  let s=nykyinen?livianPikseliAsento(nykyinen.id,osuus):(lepoTila||lepo());
  // Nokan liike on rytmitetty ele, ei foneemikohtainen huulisynkka.
  if(puhe&&!s.flight&&!s.walk&&s.x===0&&s.y<5&&!['shock','puff','cover','preen','chew','chewManic','yawn'].includes(s.frame)){
    s={...s,mouth:livianPikseliAsento('talk',((nyt-puheAlku)%1500)/1500).frame};
  }
  piirra(s);
 }
 function askel(nyt){
  raf=0;if(kuollut||!nakyy()||vahenna?.matches){katkaise();piirra(lepo());return;}
  if(nykyinen){
    osuus=Math.min(1,(nykyinen.fromProgress||0)+(nyt-alkoi)/nykyinen.duration);iskut();
    if(osuus>=1){
      const valmis=nykyinen;nykyinen=null;
      if(['leaveRight','leaveDown','flyAway','walkRight'].includes(valmis.id))lepoTila=livianPikseliAsento(valmis.id,1);
      if(valmis.nuku)lepoTila={...lepo(),frame:'sleep',y:3,tilt:1};
      if(valmis.jatko)jatkoAjastin=setTimeout(()=>toista(valmis.jatko,{hiljaa:valmis.hiljaa}),800);
    }
  }
  if(nyt-viimePiirto>=65){piirraNyt(nyt);viimePiirto=nyt;}
  if(nykyinen||puhe)raf=requestAnimationFrame(askel);else piirraNyt(nyt);
 }
 function kaynnista(){if(!raf&&!kuollut&&nakyy()&&!vahenna?.matches)raf=requestAnimationFrame(askel);}
 function toista(id,asetukset={}){
  if(id==='owl')id='flyAway';
  const ele=LIVIA_PIX_ELEET.find(e=>e.id===id);if(!ele||kuollut)return false;
  katkaise();lepoTila=null;
  if(!nakyy()||vahenna?.matches){piirra(lepo());return false;}
  nykyinen={...ele,...asetukset};osuus=asetukset.fromProgress||0;aaniIndeksi=0;alkoi=performance.now();viimeEle=alkoi;viimePiirto=-Infinity;
  piirraNyt(alkoi);kaynnista();return true;
 }
 function palaa(){
  const s=nykyinen?livianPikseliAsento(nykyinen.id,osuus):lepoTila;
  if(s?.flight){const id=!puhe&&++paluuVuoro%7===0?'glassCrash':'flyBack';toista(id,{duration:id==='glassCrash'?2600:1400,fromProgress:id==='flyBack'&&s.flight.kind==='away'?Math.max(0,(1-s.flight.t)*.58):0});}
  else if(s?.walk)toista('walkBack');else if(s?.x>0)toista('arrive');else if(s?.y>5)toista('emerge');else{katkaise();lepoTila=null;piirra(lepo());kaynnista();}
 }
 function mietintaMuuttui(){
  const rivi=pollo.auki?pollo.virta?.querySelector('.pollo-odottaa'):null,teksti=rivi?.textContent||'';
  if(rivi===odotusrivi&&teksti===odotusteksti)return;
  const oli=odotusrivi,ele=nykyinen?.id;odotusrivi=rivi;odotusteksti=teksti;
  if(!rivi){if(oli)palaa();return;}
  if(puhe||rivi===oli&&(ele==='flyAway'||lepoTila?.flight))return;
  toista(livianMietintaEle(teksti));
 }
 function rauhallinen(){
  const ui=pollo.haeUi?.();
  return nakyy()&&!pollo.auki&&!odotusrivi&&!puhe&&!ui?.liviaAani&&!ui?.diaryVoice
    &&!doc.querySelector('dialog[open], .pollo-kuplapino-kehys:not([hidden])')
    &&!doc.body.classList.contains('aikajana-paalla')&&!doc.body.classList.contains('flight-active')&&!doc.body.classList.contains('kartalento');
 }
 function ajasta(){
  clearTimeout(kello);if(kuollut||vahenna?.matches)return;
  kello=setTimeout(()=>{
   const nyt=performance.now(),tauko=nyt-viimeToimi;
   if(!nykyinen&&!lepoTila&&rauhallinen()&&tauko>=30000&&nyt-viimeEle>=22000){
    if(tauko>=180000)toista('sleep',{nuku:true});
    else{const id=['blink','turn','preen','bored','glance','puff','crumb','tilt','lookUp','lookDown','doubleTake','facepalm','sneeze','leaveDown','walkRight','flyAway'][tyhjaVuoro++%16];toista(id,{hiljaa:true,jatko:id==='leaveDown'?'emerge':id==='walkRight'?'walkBack':id==='flyAway'?'flyBack':null});}
   }
   ajasta();
  },8000);
 }
 function toiminta(){const nukkui=lepoTila?.frame==='sleep';viimeToimi=performance.now();if(nukkui)toista('wake');else if(!odotusrivi&&!puhe&&lepoTila)palaa();}
 function saapuminen(){if(!ensisaapuminen){ensisaapuminen=true;toista('handoff');}else toista(++paluuVuoro%7===0?'glassCrash':'clumsyLand');}
 const nappiVahti=new MutationObserver(()=>{
  const n=nakyy();if(!n){katkaise();piirra(lepo());}else{paikkaMuuttui();if(!oliNakyva)saapuminen();}oliNakyva=n;
  if(Boolean(pollo.auki)!==auki){auki=Boolean(pollo.auki);odotusrivi=null;odotusteksti='';if(!puhe)toista(auki?'listen':'peek');mietintaMuuttui();}
 });
 const virtaVahti=new MutationObserver(mietintaMuuttui);
 const kokoVahti=typeof ResizeObserver==='function'?new ResizeObserver(paikkaMuuttui):null;kokoVahti?.observe(nappi);
 function liikeAsetus(){katkaise();lepoTila=null;piirra(lepo());ajasta();if(!vahenna?.matches)kaynnista();}
 function tausta(){
  if(doc.hidden){katkaise();piirra(lepo());}else{puhe=livianKasvopuheenTila().length>0;puheAlku=performance.now();kaynnista();}
  viimeToimi=performance.now();
 }
 const irrotaPuhe=kuunteleLivianKasvopuhetta(tilat=>{
  const oli=puhe;puhe=tilat.length>0;
  if(puhe&&!oli){puheAlku=performance.now();
    if(nykyinen?.id==='flyAway'||lepoTila?.flight||nykyinen?.id==='peek'||nykyinen?.id.startsWith('leave')||nykyinen?.id==='walkRight'||lepoTila?.walk)palaa();
    else if(!nykyinen){lepoTila=null;toista(livianRepliikinEle(tilat.at(-1)?.teksti));}
  }
  if(!puhe){piirraNyt(performance.now());if(odotusrivi&&!nykyinen)toista(livianMietintaEle(odotusteksti));}
  kaynnista();
 });
 function tuhoa(){
  if(kuollut)return;kuollut=true;katkaise();clearTimeout(kello);irrotaPuhe();nappiVahti.disconnect();virtaVahti.disconnect();pinta.remove();nappi.classList.remove('livia-kasvot-valmis');
  doc.removeEventListener('pointerdown',toiminta,true);doc.removeEventListener('keydown',toiminta,true);doc.removeEventListener('visibilitychange',tausta);vahenna?.removeEventListener('change',liikeAsetus);globalThis.removeEventListener?.('pagehide',tausta);globalThis.removeEventListener?.('resize',paikkaMuuttui);doc.removeEventListener('scroll',paikkaMuuttui,true);nappi.removeEventListener('transitionend',paikkaMuuttui);doc.removeEventListener(AANIVALINTA_TAPAHTUMA,vaienna);kokoVahti?.disconnect();
 }
 nappiVahti.observe(nappi,{attributes:true,attributeFilter:['hidden','class','aria-expanded','style']});
 if(pollo.virta)virtaVahti.observe(pollo.virta,{childList:true,subtree:true,characterData:true});
 doc.addEventListener('pointerdown',toiminta,true);doc.addEventListener('keydown',toiminta,true);doc.addEventListener('visibilitychange',tausta);vahenna?.addEventListener('change',liikeAsetus);globalThis.addEventListener?.('pagehide',tausta);globalThis.addEventListener?.('resize',paikkaMuuttui);doc.addEventListener('scroll',paikkaMuuttui,true);nappi.addEventListener('transitionend',paikkaMuuttui);doc.addEventListener(AANIVALINTA_TAPAHTUMA,vaienna);
 oliNakyva=nakyy();if(oliNakyva)saapuminen();ajasta();mietintaMuuttui();
 return{
  kupla(teksti,{saapuu=false}={}){viimeToimi=performance.now();if(odotusrivi)return;if(nykyinen?.id==='handoff')return;toista(saapuu?'clumsyLand':livianRepliikinEle(teksti));},
  toista,palaa,tuhoa,eleet:LIVIA_PIX_ELEET,
 };
}
