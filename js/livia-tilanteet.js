/* Pelitilanteiden kuvasignaali. Ei käynnistä tai pysäytä puhetta. */
const liviaTilanneKuulijat=new Set(),liviaNostoTiedot=new WeakMap();
export const LIVIAN_PITKAN_ODOTUKSEN_VIIVE=6000;
export function ilmoitaLivianTilanne(laji,tiedot={}) {
 for(const f of liviaTilanneKuulijat){try{f(laji,tiedot);}catch{/* ele ei estä peliä */}}
}
export function kuunteleLivianTilanteita(f){liviaTilanneKuulijat.add(f);return()=>liviaTilanneKuulijat.delete(f);}

/** Pyynnön elinkaari toimii myös ilman näkyvää chatin odotusriviä.
 * Kukin pyyntö omistaa oman tunnuksensa; lopetus on idempotentti. */
export function aloitaLivianOdotus(tiedot={}){
 const tunnus={};let valmis=false;
 ilmoitaLivianTilanne('waiting',{...tiedot,tunnus});
 const lopeta=()=>{if(valmis)return;valmis=true;ilmoitaLivianTilanne('waitingEnd',{tunnus});};
 // Tuottaja voi sitoa hyväksytyn vastauksen samaan pyyntöön ilman että
 // nykyinen kutsuttava, idempotentti lopetusrajapinta muuttuu.
 lopeta.tunnus=tunnus;return lopeta;
}

/**
 * Sisällön julkinen tunnetagirajapinta. Tarinaan kirjoitetaan vain
 * `{ tunne: 'utelias', voimakkuus: 0.6 }`: eleen tekninen nimi jää tänne,
 * eikä tagi koskaan päädy puhetekstiin tai ruudulla näkyvään tekstiin.
 */
export const LIVIAN_TUNTEET=Object.freeze({
 utelias:'lookUp',lammin:'smile',ilo:'grin',hammastys:'disbelief',
 miettiva:'think',vakava:'listen',ylpea:'expert',rakkaus:'love',
 hammentynyt:'confused',jannitys:'doubleTake',
});
export function livianTunnetaginTiedot(tagi={}){
 const tunne=String(tagi?.tunne??'').trim().toLocaleLowerCase('fi-FI');
 const ele=LIVIAN_TUNTEET[tunne],luku=tagi?.voimakkuus===undefined?.5:Number(tagi.voimakkuus);
 if(!ele||!Number.isFinite(luku))return null;
 return Object.freeze({tunne,voimakkuus:Math.max(0,Math.min(1,luku)),ele});
}
export function ilmoitaLivianTunne(tagi,tiedot={}){
 const tunne=livianTunnetaginTiedot(tagi);if(!tunne)return null;
 ilmoitaLivianTilanne('emotion',{...tiedot,...tunne});return tunne;
}
/**
 * Oman puhevuoron sisältömerkitys. Tämä ei ole ElevenLabs-tagi:
 * tuottaja kohdistaa pysyvän cue-id:n oikeaan, parhaillaan kuuluvaan
 * puhetunnukseen. Tekninen SVG-ele valitaan vasta tässä rajapinnassa.
 */
export const LIVIAN_PUHEMERKITYKSET=Object.freeze({selittaa:'cityExplain'});
export function livianPuheeleenTiedot({tarkoitus,voimakkuus}={}){
 const merkitys=String(tarkoitus??'').trim().toLocaleLowerCase('fi-FI');
 const ele=Object.hasOwn(LIVIAN_PUHEMERKITYKSET,merkitys)?LIVIAN_PUHEMERKITYKSET[merkitys]:null,luku=voimakkuus===undefined?.5:Number(voimakkuus);
 if(!ele||!Number.isFinite(luku))return null;
 return Object.freeze({tarkoitus:merkitys,voimakkuus:Math.max(0,Math.min(1,luku)),ele});
}
export function ilmoitaLivianPuheEle(cue,tiedot={}){
 const ele=livianPuheeleenTiedot(cue);if(!ele)return null;
 ilmoitaLivianTilanne('speechCue',{...tiedot,...ele});return ele;
}
/** Fablen tekstikohtainen tarkoitus; ei avainsana-arvontaa tai ääntä. */
export function livianLuentareaktionTiedot({tarkoitus,voimakkuus}={}){
 if(typeof voimakkuus!=='number'||!Number.isFinite(voimakkuus)||voimakkuus<=0)return null;
 const voima=Math.min(1,voimakkuus);
 const kartta={myotailee:'nod',epailee:'shake',torjuu:'shake',
  huvittuu:voima<.4?'smile':voima<.55?'grin':'chuckle',
  hammastyy:voima<.65?'doubleTake':'disbelief',vakavoituu:'listen'};
 const ele=Object.hasOwn(kartta,tarkoitus)?kartta[tarkoitus]:null;
 return ele?{ele,voimakkuus:voima}:null;
}
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
/** Yksi kertojan vuoro riippumatta siitä, mikä äänitekniikka soittaa. */
export function luoLivianKuunteluvuoro(tunnus={}, {lahde,reaktiotAjastettu}={}){
 let viime=-Infinity,vuoro=0,soi=false,elossa=true,viimeAjastettu=null;
 const tauko=(luonnollinenLoppu=false)=>{if(!soi)return;soi=false;ilmoitaLivianTilanne('narrationEnd',{tunnus,...(luonnollinenLoppu?{luonnollinenLoppu:true}:{})});};
 return {
  paivita(paalla,aika=performance.now()/1000,teksti=''){
   if(!elossa)return;
   if(!paalla){tauko();return;}
   // Paluu tauolta reagoi heti; virkkeiden välinen sauma ei ole tauko.
   if(!soi){viime=-Infinity;soi=true;}
   aika=Number(aika)||0;
   if(aika<viime)viime=-Infinity;
   // Kohdistus latautuu asynkronisesti. Tuottaja omistaa validoinnin;
   // lukija välittää tilan seuraavasta oikeasta äänitapahtumasta eikä
   // odota 12 s sykliä. Getterin virhe palauttaa peruskuuntelun.
   let ajastettu=false;
   try{ajastettu=(typeof reaktiotAjastettu==='function'?reaktiotAjastettu():reaktiotAjastettu)===true;}catch{/* turvallinen peruskuuntelu */}
   if(aika-viime<12&&ajastettu===viimeAjastettu)return;viime=aika;viimeAjastettu=ajastettu;
   // Isoisää kuunnellaan katse yläviistossa, ei pueta laseja tai
   // näytellä tekstin avainsanoja. Lehden/lukijan aiemmat eleet säilyvät.
   const ele=vuoro++===0?'lookUp':lahde==='matkakirja'?'nod':vuoro%2?'nod':livianAiheEle({symboli:'sana',teksti});
   ilmoitaLivianTilanne('narration',{ele,tunnus,...(lahde?{lahde}:{}),...(reaktiotAjastettu===undefined?{}:{reaktiotAjastettu:ajastettu})});
  },
  lopeta(luonnollinenLoppu=false){if(!elossa)return;elossa=false;tauko(luonnollinenLoppu===true);},
 };
}

/** Todellinen soittimen aika: tauko, puskurointi ja vaihto eivät jätä elejonoa. */
export function seuraaLivianKuuntelua(audio,voimassa,haeTeksti=()=> '',asetukset={}){
 if(!audio?.addEventListener)return()=>{};
 const vuoro=luoLivianKuunteluvuoro(audio,asetukset);
 let soi=false,elossa=true;
 const reagoi=()=>{if(elossa&&soi&&!audio.paused&&!audio.ended&&voimassa())vuoro.paivita(true,audio.currentTime,haeTeksti());};
 const alkoi=()=>{if(!elossa)return;soi=true;reagoi();};
 const tauko=()=>{soi=false;vuoro.paivita(false);};
 // Pehmeän lopun omistaja lähettää tämän ENNEN omaa pausea.
 // Käyttäjän pausea tai lähellä loppua olevaa currentTimea ei arvata lopuksi.
 const paattyi=()=>lopeta(voimassa()===true);
 const events={playing:alkoi,timeupdate:reagoi,pause:tauko,waiting:tauko,stalled:tauko,error:tauko,ended:paattyi,'matkakirja:luenta-loppu':paattyi,emptied:lopeta};
 function lopeta(luonnollinenLoppu=false){if(!elossa)return;elossa=false;soi=false;vuoro.lopeta(luonnollinenLoppu===true);for(const[n,f]of Object.entries(events))audio.removeEventListener(n,f);}
 for(const[n,f]of Object.entries(events))audio.addEventListener(n,f);
 return lopeta;
}

/** Selaimen puheääni: ei ajastinta tai speak()-kutsusta arvattua alkua.
 * Sama vuoro jatkuu lausumasta seuraavaan; lukija omistaa sen lopetuksen. */
export function seuraaLivianKuuntelulausumaa(lausuma,vuoro,voimassa=()=>true){
 let elossa=true,alkoi=false;
 const reagoi=()=>{if(elossa&&alkoi&&voimassa())vuoro.paivita(true,undefined,lausuma.text);};
 lausuma.onstart=lausuma.onresume=()=>{alkoi=true;reagoi();};
 lausuma.onboundary=reagoi;
 lausuma.onpause=()=>{if(!elossa||!voimassa())return;alkoi=false;vuoro.paivita(false);};
 return()=>{elossa=false;lausuma.onstart=lausuma.onresume=lausuma.onpause=lausuma.onboundary=null;};
}
