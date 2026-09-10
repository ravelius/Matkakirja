/* Chat jättää tilan suurelle kasvolle. Mitat ovat CSS-pikseleitä;
 * visualViewport pitää myös näppäimistön yläpuolen käytettävissä. */
export function livianChatAsettelu({x=0,y=0,width,height,safe={}}) {
 const s={top:0,right:0,bottom:0,left:0,...safe};
 const sivulla=height<480;
 const right=x+width-Math.max(sivulla?24:42,s.right+24),bottom=y+height-s.bottom-20;
 const nappi={left:right-48,top:bottom-48,width:48,height:48};
 // 88 px kasvo + kääk-ilmeen venymä ja kömpelön laskeutumisen pomppu.
 const kasvo={left:right-88,top:bottom-156,width:88,height:156};
 const panelRight=sivulla?kasvo.left-14:right-12;
 const panelBottom=sivulla?bottom:kasvo.top-14;
 const panelTop=y+Math.max(sivulla?12:72,s.top+12);
 const panelLeft=Math.max(x+s.left+12,panelRight-384);
 const panelHeight=Math.max(0,Math.min(640,panelBottom-panelTop));
 return {nappi,kasvo,sivulla,paneeli:{left:panelLeft,top:panelBottom-panelHeight,
  width:Math.max(0,panelRight-panelLeft),height:panelHeight}};
}

export function asennaLivianChatTila(pollo,paikkaMuuttui=()=>{}) {
 const paneeli=pollo?.paneeli,nappi=pollo?.nappi,doc=pollo?.doc,win=doc?.defaultView;
 if(!paneeli?.style||!nappi?.style||!win)return null;
 let aktiivinen=false,kuollut=false;
 const keysN=['--livia-chat-nappi-x','--livia-chat-nappi-y'];
 const keysP=['--livia-chat-x','--livia-chat-alareuna','--livia-chat-leveys','--livia-chat-korkeus'];
 let alkuN=[],alkuP=[];
 const tallenna=(el,keys)=>keys.map(k=>[el.style.getPropertyValue(k),el.style.getPropertyPriority(k)]);
 const palauta=(el,keys,arvot)=>keys.forEach((k,i)=>{const [v,p]=arvot[i];if(v)el.style.setProperty(k,v,p);else el.style.removeProperty(k);});
 const aseta=(el,k,v)=>{const val=`${Math.round(v)}px`;if(el.style.getPropertyValue(k)!==val)el.style.setProperty(k,val);};
 function nollaa(){
  if(!aktiivinen)return;aktiivinen=false;
  palauta(nappi,keysN,alkuN);palauta(paneeli,keysP,alkuP);
  nappi.classList.remove('livia-chat-nappi');paneeli.classList.remove('livia-chat-tila');
  paikkaMuuttui();
 }
 function paivita(){
  if(kuollut)return;
  if(!pollo.auki||!nappi.classList.contains('pollo-kelluu')){nollaa();return;}
  if(!aktiivinen){alkuN=tallenna(nappi,keysN);alkuP=tallenna(paneeli,keysP);aktiivinen=true;}
  const vv=win.visualViewport,css=win.getComputedStyle(paneeli),safe={};
  for(const edge of ['top','right','bottom','left'])safe[edge]=parseFloat(css.getPropertyValue(`--livia-safe-${edge}`))||0;
  const layoutHeight=win.innerHeight||doc.documentElement.clientHeight;
  const a=livianChatAsettelu({x:vv?.offsetLeft||0,y:vv?.offsetTop||0,
   width:vv?.width||doc.documentElement.clientWidth,height:vv?.height||layoutHeight,safe});
  aseta(nappi,keysN[0],a.nappi.left);aseta(nappi,keysN[1],a.nappi.top);
  aseta(paneeli,keysP[0],a.paneeli.left);aseta(paneeli,keysP[1],layoutHeight-a.paneeli.top-a.paneeli.height);
  aseta(paneeli,keysP[2],a.paneeli.width);aseta(paneeli,keysP[3],a.paneeli.height);
  if(!nappi.classList.contains('livia-chat-nappi'))nappi.classList.add('livia-chat-nappi');
  if(!paneeli.classList.contains('livia-chat-tila'))paneeli.classList.add('livia-chat-tila');
 }
 function koko(){paivita();paikkaMuuttui();}
 win.addEventListener('resize',koko);win.visualViewport?.addEventListener('resize',koko);
 win.visualViewport?.addEventListener('scroll',koko);
 return {paivita,tuhoa(){kuollut=true;nollaa();win.removeEventListener('resize',koko);
  win.visualViewport?.removeEventListener('resize',koko);win.visualViewport?.removeEventListener('scroll',koko);}};
}
