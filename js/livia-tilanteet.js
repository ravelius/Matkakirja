/* Pelitilanteiden kuvasignaali. Ei käynnistä tai pysäytä puhetta. */
const liviaTilanneKuulijat=new Set(),liviaNostoTiedot=new WeakMap();
export function ilmoitaLivianTilanne(laji,tiedot={}) {
 for(const f of liviaTilanneKuulijat){try{f(laji,tiedot);}catch{/* ele ei estä peliä */}}
}
export function kuunteleLivianTilanteita(f){liviaTilanneKuulijat.add(f);return()=>liviaTilanneKuulijat.delete(f);}
export function merkitseLivianNosto(kerros,tiedot){liviaNostoTiedot.set(kerros,tiedot);}
export function livianNostonTiedot(kerros){return liviaNostoTiedot.get(kerros)||{};}
/** Aiheen sävy voittaa luokan: vakavaa tarinaa ei tervehditä virneellä. */
export function livianAiheEle({symboli='',otsikko='',teksti=''}={}){
 const s=otsikko+' '+teksti;
 if(/kuol|surma|hirt|orju|orjia|sota|soda|nälänhä|vainot|hauta|teloit/iu.test(s))return 'listen';
 if(/ihast|rakast|rakkaus/iu.test(s))return 'love';
 if(/pulla|leipä|leivän|leipom|muru/iu.test(s))return 'manic';
 if(symboli==='elain')return /lintu|linnut|kyyhky|pulu/iu.test(s)?'grin':/hevonen|hevos|varsa/iu.test(s)?'doubleTake':'tilt';
 return ({huuto:'disbelief',silma:'lookUp',historia:'glasses',luonto:'tilt',ruoka:'smile',kulttuuri:'smile',tekniikka:'glasses',kauppa:'expert',sana:'glasses',merenkulku:'lookUp',urheilu:'grin',kaupunki:'present',ihme:'disbelief',hetki:'glasses'})[symboli]||'listen';
}
/** Todellinen soittimen aika: tauko, puskurointi ja vaihto eivät jätä elejonoa. */
export function seuraaLivianKuuntelua(audio,voimassa,haeTeksti=()=> ''){
 if(!audio?.addEventListener)return()=>{};
 let viime=-Infinity,vuoro=0,soi=false;
 const reagoi=()=>{
  if(!soi||audio.paused||audio.ended||!voimassa())return;
  const aika=Number(audio.currentTime)||0;
  if(aika<viime)viime=-Infinity;
  if(aika-viime<12)return;viime=aika;
  ilmoitaLivianTilanne('narration',{ele:vuoro++===0?'listen':vuoro%2?'nod':livianAiheEle({symboli:'sana',teksti:haeTeksti()}),tunnus:audio});
 };
 const alkoi=()=>{soi=true;reagoi();};
 const tauko=()=>{soi=false;ilmoitaLivianTilanne('narrationEnd',{tunnus:audio});};
 const events={playing:alkoi,timeupdate:reagoi,pause:tauko,waiting:tauko,stalled:tauko,error:tauko,ended:lopeta,emptied:lopeta};
 function lopeta(){tauko();for(const[n,f]of Object.entries(events))audio.removeEventListener(n,f);}
 for(const[n,f]of Object.entries(events))audio.addEventListener(n,f);
 return lopeta;
}
