/* Kortin ja linnun omat tilat; ei nosteta lintua tekstin päälle. */
import { livianNostonTiedot } from './livia-tilanteet.js';
export function livianNostoAsettelu({width,height,top=0,left=0,headerBottom=0,birdBottom,birdLeft}){
 const y=Math.max(top+12,headerBottom+12),side=height<480;
 const bottom=side?top+height-12:Math.min(top+height-12,birdBottom-118);
 return {top:y,bottom:top+height-bottom,left:left+12,right:side?Math.max(12,left+width-birdLeft+14):12,height:Math.max(0,bottom-y)};
}
export function asennaLivianNostoTila(pollo,pinta,reagoi,muuttui){
 const doc=pollo.doc,win=doc.defaultView;
 if(!doc.head||!win||!doc.querySelectorAll)return null;
 const style=doc.createElement('style');
 style.textContent=`
 @media(max-width:560px){.pollo-nappi.pollo-kelluu.pollo-kelluu-kartalla.livia-kasvot-valmis:not(.livia-chat-nappi){bottom:calc(3.8rem + env(safe-area-inset-bottom,0px));}}
 .livia-kortille.livia-kortille{box-sizing:border-box;padding:var(--lv-top) var(--lv-right) var(--lv-bottom) var(--lv-left);align-items:flex-end;}
 .livia-kortille.livia-kortille>div[role="dialog"]{box-sizing:border-box;max-height:var(--lv-height);min-height:0;overflow-y:auto;}
 .livia-lentonayttamo.livia-nosto-nakyva{z-index:47;}
 `;
 doc.head.append(style);
 let kortit=[],kuollut=false;
 const selector='.fokusnosto-kerros,.elaintaky-kerros,.syvennys-kerros';
 function paivita(){
  if(kuollut)return;
  const n=pollo.nappi,visible=!n.hidden&&n.isConnected&&n.getClientRects().length>0&&win.getComputedStyle(n).visibility!=='hidden';
  const seuraavat=[...doc.querySelectorAll(selector)],vv=win.visualViewport;
  const height=vv?.height||win.innerHeight,width=vv?.width||doc.documentElement.clientWidth,top=vv?.offsetTop||0,left=vv?.offsetLeft||0;
  const rect=n.getBoundingClientRect(),a=livianNostoAsettelu({width,height,top,left,headerBottom:doc.querySelector('.topbar')?.getBoundingClientRect().bottom||0,birdBottom:rect.bottom,birdLeft:rect.right-88});
  const on=visible&&seuraavat.length>0;
  for(const k of seuraavat){
   k.classList.toggle('livia-kortille',visible);
   if(!visible)continue;
   for(const key of ['top','bottom','left','right','height']){const value=Math.round(a[key])+'px';if(k.style.getPropertyValue('--lv-'+key)!==value)k.style.setProperty('--lv-'+key,value);}
  }
  pinta.classList.toggle('livia-nosto-nakyva',on);
  const uusi=seuraavat.at(-1);
  if(on&&uusi&&!kortit.includes(uusi))reagoi('card',livianNostonTiedot(uusi));
  if(!seuraavat.length&&kortit.length)reagoi('cardEnd');
  kortit=seuraavat;
 }
 function koko(){paivita();muuttui();}
 const vahti=new MutationObserver(paivita);vahti.observe(doc.body,{childList:true});
 win.addEventListener('resize',koko);win.visualViewport?.addEventListener('resize',koko);win.visualViewport?.addEventListener('scroll',koko);
 paivita();
 return {paivita,onkoAuki:()=>kortit.length>0,tuhoa(){kuollut=true;vahti.disconnect();style.remove();for(const k of kortit)k.classList.remove('livia-kortille');pinta.classList.remove('livia-nosto-nakyva');win.removeEventListener('resize',koko);win.visualViewport?.removeEventListener('resize',koko);win.visualViewport?.removeEventListener('scroll',koko);}};
}
