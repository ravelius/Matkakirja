/* Livian 45 pikselielettä. Nykyinen chat ja puhekuplat omistavat sisällön;
 * tämä sovitin kuuntelee niitä ja äänen todellista toistotilaa. */
import { LIVIA_PIX_ELEET, livianPikseliAsento, luoLivianPikselit } from './livia-pikselit.js';
import { kuunteleLivianKasvopuhetta, livianKasvopuheenTila } from './livia-puhetila.js';

/** Jo näkyvä täytelause määrää liikkeen. Ei uutta repliikkiä tai arvontaa. */
export function livianMietintaEle(teksti='') {
 if(/pulla|pullalla|mur[uui]/iu.test(teksti))return 'crumb';
 if(/sulki|sulka|siiven alla|kynä.*siiv/iu.test(teksti))return 'preen';
 if(/mär|sade/iu.test(teksti))return 'rain';
 if(/vastatuul|tuuli vei/iu.test(teksti))return 'wind';
 if(/väärinpäin|väärässä|pudotin|jumissa/iu.test(teksti))return 'confused';
 if(/pöll|kysyn|kysymässä|oikealta linnulta|vien viestin|lent|kaart|kierrosta|kaukana|käyn hakemassa/iu.test(teksti))return 'owl';
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
 pinta.className='livia-kasvot-pinta livia-pikselit';pinta.setAttribute('aria-hidden','true');pinta.append(canvas);
 let kasvot;try{kasvot=luoLivianPikselit(canvas);}catch{return null;}
 nappi.append(pinta);nappi.classList.add('livia-kasvot-valmis');
 const vahenna=typeof matchMedia==='function'?matchMedia('(prefers-reduced-motion: reduce)'):null;
 let kuollut=false,raf=0,kello=0,jatkoAjastin=0,nykyinen=null,alkoi=0,osuus=0,viimePiirto=-Infinity;
 let odotusrivi=null,odotusteksti='',viimeToimi=performance.now(),viimeEle=0,tyhjaVuoro=0;
 let puhe=false,puheAlku=0,lepoTila=null,auki=Boolean(pollo.auki),oliNakyva=false,ensisaapuminen=false;
 const lepo=()=>livianPikseliAsento('blink',0);
 const nakyy=()=>!doc.hidden&&!nappi.hidden&&nappi.isConnected&&getComputedStyle(nappi).display!=='none'&&getComputedStyle(nappi).visibility!=='hidden';
 const piirra=s=>{if(!kuollut)kasvot.paint(s);};
 function katkaise(){cancelAnimationFrame(raf);clearTimeout(jatkoAjastin);raf=0;nykyinen=null;}
 function piirraNyt(nyt){
  let s=nykyinen?livianPikseliAsento(nykyinen.id,osuus):(lepoTila||lepo());
  // Nokan liike on rytmitetty ele, ei foneemikohtainen huulisynkka.
  if(puhe&&s.x===0&&s.y<5&&!['shock','puff','cover','preen','chew','chewManic','yawn'].includes(s.frame)){
    s={...s,mouth:livianPikseliAsento('talk',((nyt-puheAlku)%1500)/1500).frame};
  }
  piirra(s);
 }
 function askel(nyt){
  raf=0;if(kuollut||!nakyy()||vahenna?.matches){katkaise();piirra(lepo());return;}
  if(nykyinen){
    osuus=Math.min(1,(nyt-alkoi)/nykyinen.duration);
    if(nykyinen.id==='owl'&&odotusrivi?.isConnected&&!puhe&&osuus>=.48){osuus=.48;piirraNyt(nyt);return;}
    if(osuus>=1){
      const valmis=nykyinen;nykyinen=null;
      if(valmis.id==='leaveRight'||valmis.id==='leaveDown')lepoTila=livianPikseliAsento(valmis.id,1);
      if(valmis.nuku)lepoTila={...lepo(),frame:'sleep',y:3,tilt:1};
      if(valmis.jatko)jatkoAjastin=setTimeout(()=>toista(valmis.jatko),400);
    }
  }
  if(nyt-viimePiirto>=65){piirraNyt(nyt);viimePiirto=nyt;}
  if(nykyinen||puhe)raf=requestAnimationFrame(askel);else piirraNyt(nyt);
 }
 function kaynnista(){if(!raf&&!kuollut&&nakyy()&&!vahenna?.matches)raf=requestAnimationFrame(askel);}
 function toista(id,asetukset={}){
  const ele=LIVIA_PIX_ELEET.find(e=>e.id===id);if(!ele||kuollut)return false;
  katkaise();lepoTila=null;
  if(!nakyy()||vahenna?.matches){piirra(lepo());return false;}
  nykyinen={...ele,...asetukset};osuus=0;alkoi=performance.now();viimeEle=alkoi;viimePiirto=-Infinity;
  piirraNyt(alkoi);kaynnista();return true;
 }
 function palaa(){
  const s=nykyinen?livianPikseliAsento(nykyinen.id,osuus):lepoTila;
  if(s?.x>0)toista('arrive');else if(s?.y>5)toista('emerge');else{katkaise();lepoTila=null;piirra(lepo());kaynnista();}
 }
 function mietintaMuuttui(){
  const rivi=pollo.auki?pollo.virta?.querySelector('.pollo-odottaa'):null,teksti=rivi?.textContent||'';
  if(rivi===odotusrivi&&teksti===odotusteksti)return;
  const oli=odotusrivi,ele=nykyinen?.id;odotusrivi=rivi;odotusteksti=teksti;
  if(!rivi){if(oli)palaa();return;}
  if(puhe||rivi===oli&&ele==='owl')return;
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
    else{const id=['blink','turn','preen','bored','glance','puff','crumb','tilt','lookUp','lookDown','doubleTake','facepalm','sneeze','leaveDown','leaveRight'][tyhjaVuoro++%15];toista(id,{jatko:id==='leaveDown'?'emerge':id==='leaveRight'?'arrive':null});}
   }
   ajasta();
  },8000);
 }
 function toiminta(){const nukkui=lepoTila?.frame==='sleep';viimeToimi=performance.now();if(nukkui)toista('wake');else if(!odotusrivi&&!puhe&&lepoTila)palaa();}
 function saapuminen(){if(!ensisaapuminen){ensisaapuminen=true;toista('handoff');}else toista('arrive');}
 const nappiVahti=new MutationObserver(()=>{
  const n=nakyy();if(!n){katkaise();piirra(lepo());}else if(!oliNakyva)saapuminen();oliNakyva=n;
  if(Boolean(pollo.auki)!==auki){auki=Boolean(pollo.auki);odotusrivi=null;odotusteksti='';if(!puhe)toista(auki?'listen':'peek');mietintaMuuttui();}
 });
 const virtaVahti=new MutationObserver(mietintaMuuttui);
 function liikeAsetus(){katkaise();lepoTila=null;piirra(lepo());ajasta();if(!vahenna?.matches)kaynnista();}
 function tausta(){
  if(doc.hidden){katkaise();piirra(lepo());}else{puhe=livianKasvopuheenTila().length>0;puheAlku=performance.now();kaynnista();}
  viimeToimi=performance.now();
 }
 const irrotaPuhe=kuunteleLivianKasvopuhetta(tilat=>{
  const oli=puhe;puhe=tilat.length>0;
  if(puhe&&!oli){puheAlku=performance.now();lepoTila=null;
    if(nykyinen?.id==='owl'||nykyinen?.id==='peek'||nykyinen?.id.startsWith('leave'))palaa();
    else if(!nykyinen)toista(livianRepliikinEle(tilat.at(-1)?.teksti));
  }
  if(!puhe){piirraNyt(performance.now());if(odotusrivi&&!nykyinen)toista(livianMietintaEle(odotusteksti));}
  kaynnista();
 });
 function tuhoa(){
  if(kuollut)return;kuollut=true;katkaise();clearTimeout(kello);irrotaPuhe();nappiVahti.disconnect();virtaVahti.disconnect();pinta.remove();nappi.classList.remove('livia-kasvot-valmis');
  doc.removeEventListener('pointerdown',toiminta,true);doc.removeEventListener('keydown',toiminta,true);doc.removeEventListener('visibilitychange',tausta);vahenna?.removeEventListener('change',liikeAsetus);globalThis.removeEventListener?.('pagehide',tausta);
 }
 nappiVahti.observe(nappi,{attributes:true,attributeFilter:['hidden','class','aria-expanded','style']});
 if(pollo.virta)virtaVahti.observe(pollo.virta,{childList:true,subtree:true,characterData:true});
 doc.addEventListener('pointerdown',toiminta,true);doc.addEventListener('keydown',toiminta,true);doc.addEventListener('visibilitychange',tausta);vahenna?.addEventListener('change',liikeAsetus);globalThis.addEventListener?.('pagehide',tausta);
 oliNakyva=nakyy();if(oliNakyva)saapuminen();ajasta();mietintaMuuttui();
 return{
  kupla(teksti,{saapuu=false}={}){viimeToimi=performance.now();if(odotusrivi)return;if(nykyinen?.id==='handoff')return;toista(saapuu?'crash':livianRepliikinEle(teksti));},
  toista,palaa,tuhoa,eleet:LIVIA_PIX_ELEET,
 };
}
