/* Kasvoanimaation vain luku -signaali. Äänen käynnistys ja omistajuus
 * pysyvät soittimilla. Eri soittimien loput eivät kumoa toisiaan. */
const liviaKasvoAanet=new Map(), liviaKasvoKuulijat=new Set(), liviaKasvoMedia=new WeakMap(),liviaKasvoElinkaariKuulijat=new Set();
function ilmoitaElinkaari(tunnus,vaihe,teksti=''){
 for(const f of liviaKasvoElinkaariKuulijat){try{f({tunnus,vaihe,teksti:String(teksti||'')});}catch{/* vain luku */}}
}
export function kuunteleLivianKasvopuheenElinkaarta(f){liviaKasvoElinkaariKuulijat.add(f);return()=>liviaKasvoElinkaariKuulijat.delete(f);}
export function livianKasvopuheenTila(){return [...liviaKasvoAanet.values()];}
export function ilmoitaLivianKasvopuhe(tunnus,puhuu,teksti='',elinkaari=true){
 if(!tunnus)return;
 const ennen=liviaKasvoAanet.get(tunnus),sisalto=String(teksti||'');
 if(puhuu){if(ennen?.teksti===sisalto)return;liviaKasvoAanet.set(tunnus,{teksti:sisalto});}
 else if(!liviaKasvoAanet.delete(tunnus))return;
 if(elinkaari)ilmoitaElinkaari(tunnus,puhuu?'puhuu':'loppu',sisalto||ennen?.teksti);
 const tila=livianKasvopuheenTila();
 for(const f of liviaKasvoKuulijat){try{f(tila);}catch{/* kuvan virhe ei koske ääneen */}}
}
export function kuunteleLivianKasvopuhetta(f){liviaKasvoKuulijat.add(f);f(livianKasvopuheenTila());return()=>liviaKasvoKuulijat.delete(f);}
export function lopetaLivianKasvoAanite(audio){liviaKasvoMedia.get(audio)?.();}
export function seuraaLivianKasvoAanitetta(audio,teksti=''){
 if(!audio?.addEventListener)return()=>{};
 lopetaLivianKasvoAanite(audio);
 let toistuu=false,elossa=true,vaihe='';
 const elinkaari=(uusi)=>{if(elossa&&vaihe!==uusi){vaihe=uusi;ilmoitaElinkaari(audio,uusi,teksti);}};
 const paivitaKuultavuus=()=>ilmoitaLivianKasvopuhe(audio,toistuu&&!audio.muted&&audio.volume>0,teksti,false);
 const alkoi=()=>{toistuu=true;paivitaKuultavuus();elinkaari('puhuu');};
 const tauko=()=>{toistuu=false;paivitaKuultavuus();elinkaari('loppu');};
 const odottaa=()=>{toistuu=false;paivitaKuultavuus();elinkaari('odottaa');};
 const tapahtumat={playing:alkoi,volumechange:()=>{if(toistuu&&!audio.paused&&!audio.ended)paivitaKuultavuus();},pause:tauko,waiting:odottaa,stalled:odottaa,ended:lopeta,error:lopeta,emptied:lopeta};
 function lopeta(){if(!elossa)return;elinkaari('loppu');elossa=false;toistuu=false;ilmoitaLivianKasvopuhe(audio,false,'',false);for(const[n,f]of Object.entries(tapahtumat))audio.removeEventListener(n,f);liviaKasvoMedia.delete(audio);}
 for(const[n,f]of Object.entries(tapahtumat))audio.addEventListener(n,f);
 elinkaari('odottaa');
 liviaKasvoMedia.set(audio,lopeta);return lopeta;
}
export function seuraaLivianKasvoLausumaa(lausuma,persoona){
 if(persoona!=='pollo'||!lausuma)return()=>{};
 let elossa=true;
 lausuma.onstart=lausuma.onresume=()=>{if(elossa)ilmoitaLivianKasvopuhe(lausuma,true,lausuma.text);};
 lausuma.onpause=()=>ilmoitaLivianKasvopuhe(lausuma,false);
 return()=>{elossa=false;ilmoitaLivianKasvopuhe(lausuma,false);lausuma.onstart=lausuma.onresume=lausuma.onpause=null;};
}
