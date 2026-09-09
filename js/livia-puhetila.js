/* Kasvoanimaation vain luku -signaali. Äänen käynnistys ja omistajuus
 * pysyvät soittimilla. Eri soittimien loput eivät kumoa toisiaan. */
const liviaKasvoAanet=new Map(), liviaKasvoKuulijat=new Set(), liviaKasvoMedia=new WeakMap();
export function livianKasvopuheenTila(){return [...liviaKasvoAanet.values()];}
export function ilmoitaLivianKasvopuhe(tunnus,puhuu,teksti=''){
 if(!tunnus)return;
 const ennen=liviaKasvoAanet.get(tunnus),sisalto=String(teksti||'');
 if(puhuu){if(ennen?.teksti===sisalto)return;liviaKasvoAanet.set(tunnus,{teksti:sisalto});}
 else if(!liviaKasvoAanet.delete(tunnus))return;
 const tila=livianKasvopuheenTila();
 for(const f of liviaKasvoKuulijat){try{f(tila);}catch{/* kuvan virhe ei koske ääneen */}}
}
export function kuunteleLivianKasvopuhetta(f){liviaKasvoKuulijat.add(f);f(livianKasvopuheenTila());return()=>liviaKasvoKuulijat.delete(f);}
export function lopetaLivianKasvoAanite(audio){liviaKasvoMedia.get(audio)?.();}
export function seuraaLivianKasvoAanitetta(audio,teksti=''){
 if(!audio?.addEventListener)return()=>{};
 lopetaLivianKasvoAanite(audio);
 let toistuu=false;
 const alkoi=()=>{toistuu=true;ilmoitaLivianKasvopuhe(audio,!audio.muted&&audio.volume>0,teksti);};
 const tauko=()=>{toistuu=false;ilmoitaLivianKasvopuhe(audio,false);};
 const tapahtumat={playing:alkoi,volumechange:()=>{if(toistuu&&!audio.paused&&!audio.ended)alkoi();},pause:tauko,waiting:tauko,stalled:tauko,ended:lopeta,error:lopeta,emptied:lopeta};
 function lopeta(){tauko();for(const[n,f]of Object.entries(tapahtumat))audio.removeEventListener(n,f);liviaKasvoMedia.delete(audio);}
 for(const[n,f]of Object.entries(tapahtumat))audio.addEventListener(n,f);
 liviaKasvoMedia.set(audio,lopeta);return lopeta;
}
export function seuraaLivianKasvoLausumaa(lausuma,persoona){
 if(persoona!=='pollo'||!lausuma)return()=>{};
 let elossa=true;
 lausuma.onstart=lausuma.onresume=()=>{if(elossa)ilmoitaLivianKasvopuhe(lausuma,true,lausuma.text);};
 lausuma.onpause=()=>ilmoitaLivianKasvopuhe(lausuma,false);
 return()=>{elossa=false;ilmoitaLivianKasvopuhe(lausuma,false);lausuma.onstart=lausuma.onresume=lausuma.onpause=null;};
}
