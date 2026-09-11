import { LIVIAN_PITKAN_ODOTUKSEN_VIIVE, kuunteleLivianTilanteita, livianAiheEle, livianLuentareaktionTiedot } from './livia-tilanteet.js';
import { asennaLivianNostoTila } from './livia-nostotila.js';
/* Livian kokopulun SVG-eleet. Nykyinen chat ja puhekuplat omistavat sisällön;
 * tämä sovitin kuuntelee niitä ja äänen todellista toistotilaa. */
import { LIVIA_SVG_ELEET, livianSvgAsento, luoLivianSvg, livianEleenVoima } from './livia-svg.js';
import { sfx, AANIVALINTA_TAPAHTUMA } from './sound.js';
import { livianEleaaniIskut } from './livia-tehosteet.js';
import { kuunteleLivianKasvopuhetta, livianKasvopuheenTila } from './livia-puhetila.js';
import { asennaLivianChatTila } from './livia-chat-tila.js';
import { livianYlinDialogi, livianDialogiSalliiReaktion, seuraaLivianDialogeja } from './livia-dialogitila.js';

/** Jo näkyvä täytelause määrää liikkeen. Ei uutta repliikkiä tai arvontaa. */
const LIVIAN_MIETINTAELEET=new Map(Object.entries({
 'Hetki, pululla pulla suussa..':'crumb','Odotas, sulka jäi mustepulloon..':'preen','Kaivan sähkeitä, siellä oli jotain tästä..':'peek','Hetkinen, lento vastatuuleen..':'wind','Annas kun mietin. Tai ei — kysyn joltain viisaammalta..':'flyAway','Odota, järjestän ajatukseni oksalle..':'think','Muistan lukeneeni tästä. Mistäs se nyt olikaan..':'think','Setä tiesi tästä jotain. Mietin hetken..':'think','Pieni hetki, untuvia sähkekoneessa..':'preen','Katsotaas. Nokka kirjaan, siipi kartalle..':'bookStudy','Hetki vain, kynä on väärässä siivessä..':'confused','Odotas, luen omat muistiinpanoni. Käsiala on kanan..':'reading','Hetkinen, kirjastonhoitaja on pöllö ja pöllö nukkuu päivisin..':'listen','Pieni hetki, arkiston ovi on jumissa..':'confused','Hetki, tarkistan asian kahdesta paikasta..':'think','Odotas, pudotin muistiinpanot katolle..':'flyAway','Pieni hetki, tästä on jossain sähke..':'peek','Nokka kiinni, minä ajattelen..':'think','Hetkinen, siivet ovat vielä märät sateesta..':'rain','Odota, tämä vaatii kaksi kierrosta tornin ympäri..':'flyAway','Annas kun kaivan tämän muistista. Siellä on ruuhkaa..':'think','Pieni hetki, pulla ensin ja tieto sitten..':'crumb','Hetki vain, kartta on väärinpäin..':'confused','Odotas, luen sen pienellä painetun kohdan..':'bookStudy','Katsotaas, mistä tämä lankakerä alkaa..':'think','Hetkinen, kysyn asiaa oikealta linnulta..':'flyAway','Pieni hetki, arkiston hyllyt ovat minua korkeammalla..':'peek','Odota, tässä on kaksi vastausta ja minä valitsen paremman..':'think','Hetki, murut pois kirjan päältä..':'crumb','Annas kun istun alas. Tämä on istumakysymys..':'think','Pieni hetki, sähkekone rätisee taas..':'scratch','Odotas, muistin juuri jotain ja unohdin sen..':'confused','Hetkinen, tämä osui johonkin minkä olen itse nähnyt..':'think','Katson tästä ikkunasta, näkyisikö vastaus..':'lookRight','Pieni hetki, järjestän faktat riviin..':'think','Hetki, tuuli vei yhden sivun..':'wind',
 'Hyvä kysymys. Käyn kysymässä pöllöltä, pieni hetki..':'flyAway','Tää on pöllön heiniä. Vien viestin, palaan pian..':'flyAway','Minä tiedän kenelle tämä kuuluu. Käyn lentämässä..':'flyAway','Otan tämän kysymyksen mukaani. Kaksi kaartoa ja palaan..':'flyAway','Tämän minä tiedän. Tai tiedän kenen luota se löytyy..':'flyAway','Hyvä että kysyit. Käyn hakemassa tarkan luvun..':'flyAway','Tästä on kirjoitettu. Etsin mistä..':'bookStudy','Sopiva kysymys minulle. Hetki, tarkistan etten muista väärin..':'think','Tuohon on vastaus. Se on vain hieman kaukana..':'flyAway',
 'No nyt kesti. Pöllöllä on pitkä puheenvuoro..':'listen','Vieläkin menossa. Vastatuuli oli luvattua kovempi..':'wind','Kohta tulee. Arkistossa oli enemmän pölyä kuin muistin..':'sneeze','Kestää vielä. Löysin matkalta kaksi mielenkiintoista sivupolkua..':'flyAway','Pian. Sain vastauksen, mutta se oli väärään kysymykseen..':'confused','Vielä hetki. Tämä on isompi asia kuin miltä se näytti..':'think','Anteeksi viive. Pöllö puhuu hitaasti ja pitkästi..':'listen',
}));
export const onkoLivianTarkkaMietinta=teksti=>LIVIAN_MIETINTAELEET.has(String(teksti).trim());
export function livianMietintaEle(teksti='') {
 const tarkka=LIVIAN_MIETINTAELEET.get(String(teksti).trim());if(tarkka)return tarkka;
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
const LIVIAN_RAUHALLISET_TAUSTAELEET=Object.freeze(['blink','turn','preen','glance','tilt','lookUp','lookDown']);
export function valitseLivianTaustaEle(edellinen='',arpa=Math.random()) {
 const vaihtoehdot=LIVIAN_RAUHALLISET_TAUSTAELEET.filter(id=>id!==edellinen);
 return vaihtoehdot[Math.min(vaihtoehdot.length-1,Math.floor(Math.max(0,Math.min(.999999,arpa))*vaihtoehdot.length))];
}
export function asennaLivianKasvot(pollo) {
 const doc=pollo?.doc,nappi=pollo?.nappi;
 if(!doc?.createElement||!nappi?.append||typeof MutationObserver==='undefined'||typeof requestAnimationFrame==='undefined')return null;
 const pinta=doc.createElement('span'),canvas=doc.createElement('span');
 pinta.className='livia-kasvot-pinta livia-svg-pulu livia-lentonayttamo';pinta.setAttribute('aria-hidden','true');pinta.append(canvas);
 let kasvot;try{kasvot=luoLivianSvg(canvas);}catch{return null;}
 doc.body.append(pinta);nappi.classList.add('livia-kasvot-valmis');
 const vahenna=typeof matchMedia==='function'?matchMedia('(prefers-reduced-motion: reduce)'):null;
 let kuollut=false,raf=0,kello=0,jatkoAjastin=0,reaktioAjastin=0,nykyinen=null,alkoi=0,osuus=0,viimePiirto=-Infinity;
 let odotusrivi=null,odotusteksti='',viimeToimi=performance.now(),viimeEle=0,tyhjaVuoro=0;
 let puhe=false,puheAlku=0,lepoTila=null,auki=Boolean(pollo.auki),oliNakyva=false,ensisaapuminen=false,paluuVuoro=0;
 let aaniPois=[],aaniIndeksi=0,viimeAsento=null,viimeTilanne=-Infinity;
 let nostoTila=null;
 let lehtiPaalla=false,lasitPuettu=false,lehtiVuoro=0,odotusVuoro=0;
 let ensiliito=false;
 let alkulento=null;
 let traileri=null;
 let chatOdotus=null;
 const odotukset=new Set();
 const pitkatOdotukset=new Map();
 const luennat=new Map();
 const syodytPullat=new WeakSet();
 // Vain viimeisen luennan rajattu loppupoikkeus. Ei jonoa eikä ajastinta:
 // vastaanotto sulkeutuu 500 ms:ssa, jo alkanut ele saa oman kestonsa.
 let luennanLoppu=null;
 const kohtausPiilossa=()=>Boolean(alkulento||traileri);
 function piilotaKohtaukseen(){katkaise();lepoTila=null;pinta.style.transition='none';pinta.style.opacity='0';}
 function palautaKohtauksesta(){pinta.style.transition=vahenna?.matches?'opacity 180ms ease':'';pinta.style.opacity='1';lepoTila=null;}
 function tyhjennaTraileri({palauta=false}={}){if(traileri?.ajastin)clearTimeout(traileri.ajastin);traileri=null;if(palauta&&!alkulento)palautaKohtauksesta();}
 function tyhjennaAlkulento({palauta=false}={}){if(alkulento?.ajastin)clearTimeout(alkulento.ajastin);alkulento=null;if(palauta&&!traileri)palautaKohtauksesta();}
 function palaaAlkulennosta(){if(!alkulento||doc.hidden)return false;tyhjennaAlkulento();palautaKohtauksesta();if(vahenna?.matches){piirra(lepo());return true;}return nakyy()?toista('trailerBack',{hiljaa:true,omistaja:'startFlight'}):(piirra(lepo()),false);}
 function palaaTrailerista(){
  if(!traileri||doc.hidden)return false;const tila=traileri;tyhjennaTraileri();palautaKohtauksesta();
  if(vahenna?.matches){pinta.style.opacity='1';piirra(lepo());return true;}
  if(!nakyy()||odotukset.size||odotusrivi){piirra(lepo());return false;}
  return toista('trailerBack',{hiljaa:true,omistaja:'trailer',tunnus:tila.tunnus});
 }
 function traileritilanne(tiedot){
  const vaihe=tiedot?.vaihe,tunnus=tiedot?.tunnus;if(!tunnus)return false;
  if(vaihe==='kirjaimet'){
   if(traileri?.tunnus===tunnus)return false;
   const jatkaaAlkulennosta=Boolean(alkulento);tyhjennaAlkulento();tyhjennaTraileri();traileri={tunnus,luenta:null,loppui:false,ajastin:0};
   if(jatkaaAlkulennosta){piilotaKohtaukseen();return true;}
   if(vahenna?.matches){pinta.style.transition='opacity 180ms ease';pinta.style.opacity='0';return true;}
   if(!nakyy()){lepoTila=livianSvgAsento('trailerFlee',1);piirra(lepoTila);return false;}
   return toista('trailerFlee',{hiljaa:true,omistaja:'trailer',tunnus});
  }
  if(!traileri||traileri.tunnus!==tunnus)return false;
  if(vaihe==='peru'){katkaise();tyhjennaTraileri({palauta:true});piirra(lepo());return true;}
  if(vaihe!=='loppu')return false;
  traileri.loppui=true;
  if(traileri.luenta)return palaaTrailerista();
  if(traileri.ajastin)return false;
  traileri.ajastin=setTimeout(()=>{if(traileri?.tunnus===tunnus){traileri.ajastin=0;palaaTrailerista();}},3000);return true;
 }
 function alkulentotilanne(tiedot){
  const vaihe=tiedot?.vaihe,tunnus=tiedot?.tunnus;if(!tunnus)return false;
  if(vaihe==='alku'){
   if(alkulento?.tunnus===tunnus)return false;
   alkulento={tunnus,loppui:false,luenta:null,ajastin:0};tyhjennaTraileri();piilotaKohtaukseen();return true;
  }
  if(!alkulento||alkulento.tunnus!==tunnus)return false;
  if(vaihe==='peru'){katkaise();tyhjennaAlkulento({palauta:true});piirra(lepo());return true;}
  if(vaihe==='loppu'){alkulento.loppui=true;if(tiedot.odottaaTraileria===false&&!alkulento.ajastin)alkulento.ajastin=setTimeout(()=>{if(alkulento?.tunnus===tunnus){alkulento.ajastin=0;palaaAlkulennosta();}},3000);return true;}
  return false;
 }
 function peruPitkaOdotus(tunnus){const tila=pitkatOdotukset.get(tunnus);if(tila?.ajastin)clearTimeout(tila.ajastin);pitkatOdotukset.delete(tunnus);}
 function tyhjennaChatOdotus({lepoon=false}={}){
  const tila=chatOdotus;chatOdotus=null;if(!tila)return false;
  if(nykyinen?.omistaja?.startsWith('chatWait'))katkaise();
  if(lepoon){pinta.style.transition='';pinta.style.opacity='';lepoTila=null;piirra(lepo());}
  return true;
 }
 function pinkaiseChatista(){
  if(!chatOdotus||chatOdotus.lahti||!nakyy()||kohtausPiilossa())return false;
  chatOdotus.lahti=true;
  if(vahenna?.matches){katkaise();lepoTila=livianSvgAsento('chatDashOut',1);pinta.style.transition='none';pinta.style.opacity='0';return true;}
  return toista('chatDashOut',{hiljaa:true,omistaja:'chatWaiting',tunnus:chatOdotus.tunnus});
 }
 function chatVastaus(tiedot){
  if(!chatOdotus||chatOdotus.tunnus!==tiedot?.tunnus||chatOdotus.vastattu)return false;
  const tila=chatOdotus;tila.vastattu=true;odotukset.delete(tila.tunnus);peruPitkaOdotus(tila.tunnus);odotusrivi=null;odotusteksti='';
  if(doc.hidden||!pollo.auki||!nakyy()){tyhjennaChatOdotus({lepoon:true});return false;}
  if(vahenna?.matches){tyhjennaChatOdotus();pinta.style.transition='none';pinta.style.opacity='1';piirra(livianSvgAsento('bookStudy',.42));return true;}
  if(!tila.lahti){tyhjennaChatOdotus();return toista('bookStudy',{hiljaa:true,omistaja:'chatAnswer'});}
  // Vastaus voittaa myös kesken olevan lähdön. Käännä siitä kohdasta,
  // jossa lintu nyt on; sitä ei teleportata ensin ulos odottamaan.
  const fromProgress=nykyinen?.id==='chatDashOut'
   ?1-Math.min(1,(viimeAsento?.ele==='chatDashOut'?viimeAsento.p:(performance.now()-alkoi)/nykyinen.duration)/.55):0;
  chatOdotus=null;lepoTila=null;pinta.style.transition='';pinta.style.opacity='1';
  return toista('chatDashBack',{hiljaa:true,omistaja:'chatAnswer',fromProgress,valmis:()=>{
   if(pollo.auki&&!doc.hidden)toista('chatDustOff',{hiljaa:true,omistaja:'chatAnswer',valmis:()=>{
    if(pollo.auki&&!doc.hidden)toista('bookStudy',{hiljaa:true,omistaja:'chatAnswer'});
   }});
  }});
 }
 function yritaPitkaaOdotusta(){
  if(chatOdotus||nykyinen||puhe||luennat.size||!nakyy()||vahenna?.matches)return false;
  const rivi=[...pitkatOdotukset].find(([tunnus,tila])=>odotukset.has(tunnus)&&tila.valmis&&!tila.esitetty);
  if(!rivi)return false;
  const onnistui=toista('confused',{hiljaa:true,omistaja:'waiting',voimakkuus:.3});
  if(onnistui)rivi[1].esitetty=true;
  return onnistui;
 }
 function ajastaPitkaOdotus(tunnus,viive=LIVIAN_PITKAN_ODOTUKSEN_VIIVE){
  const tila=pitkatOdotukset.get(tunnus);if(!tila||tila.esitetty||tila.ajastin)return;
  tila.paattyy=performance.now()+viive;
  tila.ajastin=setTimeout(()=>{tila.ajastin=0;tila.valmis=true;yritaPitkaaOdotusta();},viive);
 }
 function tauotaPitkatOdotukset(){for(const tila of pitkatOdotukset.values()){if(!tila.ajastin)continue;clearTimeout(tila.ajastin);tila.ajastin=0;tila.jaljella=Math.max(0,tila.paattyy-performance.now());}}
 function jatkaPitkiaOdotuksia(){for(const[tunnus,tila]of pitkatOdotukset){if(tila.valmis)yritaPitkaaOdotusta();else ajastaPitkaOdotus(tunnus,tila.jaljella??LIVIAN_PITKAN_ODOTUKSEN_VIIVE);}}
 function peruLoppu(){if(luennanLoppu)luennanLoppu.sallittu=false;}
 const lepo=()=>livianSvgAsento('blink',0);
 const nappiNakyy=()=>!doc.hidden&&nappi.isConnected&&(ensiliito||((!nappi.getClientRects||nappi.getClientRects().length>0)&&!nappi.hidden&&getComputedStyle(nappi).display!=='none'&&getComputedStyle(nappi).visibility!=='hidden'));
 const nakyy=()=>nappiNakyy()&&livianDialogiSalliiReaktion(doc,nappi,Boolean(pollo.auki));
 function sijoita(){
  if(kuollut)return;const tavallinen=nappi.getBoundingClientRect?.()||{right:152,bottom:304};
  const viewport=doc.documentElement?.clientWidth||doc.defaultView?.innerWidth||tavallinen.right;
  const rect=ensiliito?(pollo.ankkuriLaatikko?.(nappi,doc.defaultView)||{right:viewport-18,bottom:(doc.defaultView?.innerHeight||844)-85}):tavallinen;
  const gap=Math.max(0,viewport-rect.right);
  const lehti=doc.getElementById?.('arrival-dialog'),lehdessa=Boolean(lehti?.open&&lehti.classList?.contains('lehti'));
  const kohde=nappi.closest?.('dialog[open]')|| (lehdessa?lehti:doc.body);
  if((pinta.parentNode||pinta.parent)!==kohde)kohde.append(pinta);
  pinta.classList[lehdessa?'add':'remove']('livia-lehdessa');
  pinta.classList[['passport-dialog','quiz-dialog'].includes(kohde.id)?'add':'remove']('livia-dialogissa');
  kasvot.resize(gap);const perusY=rect.bottom-304,liitoT=viimeAsento?.flight?.kind==='opening'?Math.min(1,viimeAsento.flight.t/.78):1;
  pinta.style.left=`${rect.right-152}px`;pinta.style.top=`${perusY-(1-liitoT)*Math.max(0,perusY-52)}px`;
  const ylin=livianYlinDialogi(doc);
  pinta.style.width=`${152+gap}px`;pinta.style.height='304px';
  pinta.style.overflow=ensiliito?'visible':'hidden';
  pinta.style.zIndex=ensiliito?'47':'';
  pinta.hidden=!nappiNakyy()||Boolean(ylin&&nappi.closest?.('dialog[open]')!==ylin);
 }
 const piirra=s=>{if(!kuollut){viimeAsento=s;sijoita();
  // Kohtaus omistaa myös suorat piirrot: puhe, napin näkyvyys ja
  // taustalta paluu eivät saa palauttaa levossa olevaa lintua sen alle.
  // Vain jo alkanut trailerin väistö saa näkyä matkallaan pois.
  if(kohtausPiilossa()&&!(nykyinen?.omistaja==='trailer'&&nykyinen.id==='trailerFlee'))pinta.style.opacity='0';
  const lasit=!lasitPuettu&&s.ele==='glasses'&&s.p<.32?Math.max(0,Math.min(1,(s.p-.12)/.20)):1;
  if(lehtiPaalla&&lasit>=1)lasitPuettu=true;
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
 function katkaise(){cancelAnimationFrame(raf);clearTimeout(jatkoAjastin);clearTimeout(reaktioAjastin);raf=0;nykyinen=null;vaienna();}
 function piirraNyt(nyt){
  let s=nykyinen?livianSvgAsento(nykyinen.id,osuus,{voimakkuus:nykyinen.voimakkuus}):(lepoTila||lepo());
  // Kuuntelu on tila, ei 2,4 sekunnin välähdys. Myös sisääntulon
  // aikana alkanut luenta näkyy heti liikkeen päätyttyä. Ei elejonoa.
  if([...luennat.values()].at(-1)?.lahde==='matkakirja'&&nakyy()&&!puhe&&!pollo.auki&&!nostoTila?.onkoAuki()
    &&(!nykyinen||nykyinen.omistaja==='narration')&&!s.flight&&!s.walk){
   s={...s,gazeUp:true,glasses:0};
  }
  // Nokan liike on rytmitetty ele, ei foneemikohtainen huulisynkka.
  if(puhe&&nykyinen?.omistaja!=='bunGranted'&&nakyy()&&!s.flight&&!s.walk&&s.x===0&&s.y<5&&!['shock','puff','cover','preen','chew','chewManic','yawn'].includes(s.frame)){
    s={...s,mouth:livianSvgAsento('talk',((nyt-puheAlku)%1500)/1500).frame};
  }
  piirra({...s,propsRight:Boolean(pollo.auki)});
 }
 function askel(nyt){
  raf=0;if(kuollut||!nakyy()||vahenna?.matches){peruLoppu();katkaise();piirra(lepo());return;}
  if(nykyinen){
    osuus=Math.min(1,(nykyinen.fromProgress||0)+(nyt-alkoi)/nykyinen.duration);iskut();
    if(osuus>=1){
      const valmis=nykyinen;nykyinen=null;
      if(['leaveRight','leaveDown','flyAway','chatDashOut','walkRight','trailerFlee'].includes(valmis.id))lepoTila=livianSvgAsento(valmis.id,1);
      if(valmis.id==='bookStudy'&&puhe)lepoTila=livianSvgAsento('bookStudy',.5);
      if(valmis.nuku)lepoTila={...lepo(),frame:'sleep',y:3,tilt:1};
      if(valmis.jatko)jatkoAjastin=setTimeout(()=>toista(valmis.jatko,{hiljaa:valmis.hiljaa}),800);
      // Kortti saa yhden avauseleen. Sen jälkeen yhä soiva lukija
      // kuunnellaan myös kortin ollessa auki (rekisterin päällekkäisyys 7).
      if(['card','bunGranted'].includes(valmis.omistaja))jatkaKuunteluaTaiOdotusta();
      else if(valmis.omistaja==='waiting')yritaPitkaaOdotusta();
      valmis.valmis?.();
    }
  }
  if(nyt-viimePiirto>=32){piirraNyt(nyt);viimePiirto=nyt;}
  // Valmistumiskutsu voi jo käynnistää seuraavan eleen (paluu → pölyt).
  // Älä jätä toista, peruuttamattomaksi jäävää rAF-silmukkaa rinnalle.
  if(nykyinen||puhe){if(!raf)raf=requestAnimationFrame(askel);}else piirraNyt(nyt);
 }
 function kaynnista(){if(!raf&&!kuollut&&nakyy()&&!vahenna?.matches)raf=requestAnimationFrame(askel);}
 function toista(id,asetukset={}){
  if(id==='owl')id='flyAway';
  const ele=LIVIA_SVG_ELEET.find(e=>e.id===id);if(!ele||kuollut)return false;
  if(kohtausPiilossa()&&!['startFlight','trailer'].includes(asetukset.omistaja))return false;
  katkaise();lepoTila=null;
  if(!nakyy()||(vahenna?.matches&&!['reaction','bunGranted'].includes(asetukset.omistaja))){piirraNyt(performance.now());return false;}
  nykyinen={...ele,voimakkuus:livianEleenVoima(id),...asetukset};osuus=asetukset.fromProgress||0;aaniIndeksi=0;alkoi=performance.now();viimeEle=alkoi;viimePiirto=-Infinity;
  if(vahenna?.matches){
   // Yksi staattinen ilme, ei jatkuvaa piirtoa. Sama elinkaari katkaisee
   // myös tämän ajastimen tauolla, dialogissa, chatissa ja äänenvaihdossa.
   osuus=.45;piirraNyt(alkoi);
   reaktioAjastin=setTimeout(()=>{katkaise();piirraNyt(performance.now());},nykyinen.duration);
   return true;
  }
  piirraNyt(alkoi);kaynnista();return true;
 }
 /** Ei jonoa: vanha kuva tai luenta ei saa reaktiota toisessa kaupungissa. */
 function jatkaKuunteluaTaiOdotusta(){
  if(puhe||nykyinen?.omistaja==='bunGranted'||['chatDashBack','chatDustOff'].includes(nykyinen?.id))return;
  const luenta=[...luennat.values()].at(-1);
  if(luenta)tilanne('narration',luenta);
  else if(odotukset.size&&!nostoTila?.onkoAuki())toista(lehtiPaalla?'scratch':'think',{hiljaa:true,omistaja:'waiting'});
 }
 function tilanne(laji,tiedot={}){
  if(kuollut)return false;
  if(laji==='startFlight')return alkulentotilanne(tiedot);
  if(laji==='trailer')return traileritilanne(tiedot);
  if(laji==='waitingAnswer')return chatVastaus(tiedot);
  if(laji==='bunGranted'){
   // Maksutapahtuma, ei repliikin ruokasanan tulkinta. Jokainen ostos
   // esitetään kerran tässä näkymässä; piiloon jäänyttä ei jonoteta.
   const tunnus=tiedot.tunnus;
   if(!tunnus||typeof tunnus!=='object'||syodytPullat.has(tunnus))return false;
   syodytPullat.add(tunnus);
   if(!nakyy()||kohtausPiilossa()||pollo.auki||odotukset.size||odotusrivi||lepoTila?.flight||lepoTila?.walk)return false;
   peruLoppu();viimeTilanne=performance.now();viimeToimi=viimeTilanne;
   return toista('bunFeast',{omistaja:'bunGranted',tunnus});
  }
  if(laji==='chatClose'){
   tyhjennaChatOdotus({lepoon:true});
   if(['chatDashBack','chatDustOff'].includes(nykyinen?.id)){katkaise();lepoTila=null;piirra(lepo());}
  }
  if(['chatOpen','microphone','waiting','card'].includes(laji)){
   peruLoppu();
   if(['reaction','bunGranted'].includes(nykyinen?.omistaja)){katkaise();piirraNyt(performance.now());}
  }
  if(laji==='narration'){
   const uusi=!luennat.has(tiedot.tunnus)||luennanLoppu?.tunnus!==tiedot.tunnus||luennanLoppu?.aika!==null;
   if(uusi){
    luennanLoppu={tunnus:tiedot.tunnus,aika:null,kaytetty:false,sallittu:true};
   }
   if(nykyinen?.omistaja==='reaction'&&(uusi||nykyinen.luentaTunnus!==tiedot.tunnus))katkaise();
   luennat.set(tiedot.tunnus,tiedot);
   if(traileri&&tiedot.lahde==='matkakirja'&&!traileri.luenta){if(traileri.ajastin)clearTimeout(traileri.ajastin);traileri.ajastin=0;traileri.luenta=tiedot.tunnus;if(traileri.loppui)palaaTrailerista();}
   if(alkulento?.loppui&&tiedot.lahde==='matkakirja'&&!alkulento.luenta){if(alkulento.ajastin)clearTimeout(alkulento.ajastin);alkulento.ajastin=0;alkulento.luenta=tiedot.tunnus;palaaAlkulennosta();}
  }
  if(laji==='reactionEnd'){
   if(luennanLoppu?.tunnus===tiedot.luentaTunnus)peruLoppu();
   if(nykyinen?.omistaja!=='reaction'||nykyinen.luentaTunnus!==tiedot.luentaTunnus)return false;
   katkaise();piirraNyt(performance.now());return true;
  }
  if(laji==='reaction'){
   const r=livianLuentareaktionTiedot(tiedot),luenta=[...luennat.values()].at(-1),nyt=performance.now();
   const aktiivinen=luenta?.lahde==='matkakirja'&&luenta.tunnus===tiedot.luentaTunnus;
   const loppu=luennanLoppu?.tunnus===tiedot.luentaTunnus?luennanLoppu:null;
   // Moottorin loppukuuntelija voi olla ennen narrationEnd-kuuntelijaa.
   const jalki=tiedot.jalkireaktio===true&&loppu?.sallittu&&!loppu.kaytetty
    &&(loppu.aika===null?aktiivinen:nyt-loppu.aika<=500);
   if(!r||typeof tiedot.tunnus!=='string'||!tiedot.tunnus||tiedot.lahde!=='matkakirja'||!tiedot.luentaTunnus
    ||(tiedot.jalkireaktio===true?!jalki:!aktiivinen||tiedot.luentaTunnus.paused||tiedot.luentaTunnus.ended)
    ||!nakyy()||puhe||pollo.auki||nostoTila?.onkoAuki()||odotusrivi||odotukset.size
    ||nykyinen?.group==='Liike'||['card','bunGranted'].includes(nykyinen?.omistaja)||lepoTila?.flight||lepoTila?.walk)return false;
   if(nykyinen?.omistaja==='reaction'&&nykyinen.tunnus===tiedot.tunnus&&nykyinen.luentaTunnus===tiedot.luentaTunnus)return false;
   if(jalki){loppu.aika??=nyt;loppu.kaytetty=true;}
   else if(loppu?.aika===null)loppu.sallittu=true;
   viimeTilanne=performance.now();viimeToimi=viimeTilanne;
   return toista(r.ele,{...r,hiljaa:true,omistaja:'reaction',tunnus:tiedot.tunnus,luentaTunnus:tiedot.luentaTunnus});
  }
  if(laji==='waiting'){
   odotukset.add(tiedot.tunnus);viimeToimi=performance.now();
   if(!pitkatOdotukset.has(tiedot.tunnus)){pitkatOdotukset.set(tiedot.tunnus,{ajastin:0,valmis:false,esitetty:false});ajastaPitkaOdotus(tiedot.tunnus);}
   if(pollo.auki){
    const oliPoissa=Boolean(chatOdotus?.lahti||lepoTila?.flight||['flyAway','chatDashOut'].includes(nykyinen?.id));
    if(chatOdotus&&chatOdotus.tunnus!==tiedot.tunnus){
     if(oliPoissa){chatOdotus={tunnus:tiedot.tunnus,lahti:true,vastattu:false};return true;}
     tyhjennaChatOdotus();
    }
    chatOdotus={tunnus:tiedot.tunnus,lahti:oliPoissa,vastattu:false};
    // Pelaajan kysymys lähtee heti, ei vasta odotustekstin DOM-päivityksestä.
    if(['kysymys','vastaus'].includes(tiedot.lahde))pinkaiseChatista();
    return true;
   }
   if(!puhe&&!luennat.size)toista(lehtiPaalla?'scratch':'think',{hiljaa:true,omistaja:'waiting'});
   return true;
  }
  if(laji==='waitingEnd'){
   odotukset.delete(tiedot.tunnus);
   peruPitkaOdotus(tiedot.tunnus);
   if(chatOdotus?.tunnus===tiedot.tunnus&&!chatOdotus.vastattu)tyhjennaChatOdotus({lepoon:true});
   if(!odotukset.size){odotusrivi=null;odotusteksti='';
    if(!puhe&&!luennat.size&&(!nykyinen||nykyinen.omistaja==='waiting'))palaa();
   }
   return true;
  }
  if(laji==='narrationEnd'||laji==='cardEnd'){
   const trailerinLuenta=laji==='narrationEnd'&&traileri?.luenta===tiedot.tunnus;
   const lennonJalkeinenLuenta=laji==='narrationEnd'&&alkulento?.loppui&&alkulento.luenta===tiedot.tunnus;
   if(laji==='narrationEnd'){
    const viimeinen=[...luennat.values()].at(-1);
    if(luennanLoppu?.tunnus===tiedot.tunnus){
     if(tiedot.luonnollinenLoppu===true&&viimeinen?.tunnus===tiedot.tunnus&&viimeinen.lahde==='matkakirja')luennanLoppu.aika??=performance.now();
     else if(tiedot.luonnollinenLoppu!==true)peruLoppu();
    }
   }
   if(laji==='narrationEnd'&&!luennat.delete(tiedot.tunnus)){
    if(tiedot.luonnollinenLoppu!==true&&nykyinen?.omistaja==='reaction'&&nykyinen.luentaTunnus===tiedot.tunnus){katkaise();piirraNyt(performance.now());}
    return false;
   }
   if(laji==='narrationEnd'&&nykyinen?.omistaja==='reaction'&&nykyinen.luentaTunnus===tiedot.tunnus
    &&!(tiedot.luonnollinenLoppu===true&&luennanLoppu?.tunnus===tiedot.tunnus&&luennanLoppu.sallittu))katkaise();
   const omistaja=laji==='cardEnd'?'card':'narration';
   if(nykyinen?.omistaja===omistaja&&(!tiedot.tunnus||nykyinen.tunnus===tiedot.tunnus)){katkaise();piirraNyt(performance.now());kaynnista();}
   if(laji==='cardEnd'||!nykyinen)jatkaKuunteluaTaiOdotusta();
   if(!nykyinen)piirraNyt(performance.now());
   if(trailerinLuenta)palaaTrailerista();
   if(lennonJalkeinenLuenta)palaaAlkulennosta();
   return false;
  }
  // Kiitoskupla ja käynnissä olevan luennan eleet eivät keskeytä
  // puraisuja. Yllä käsitellään silti luennan/odotuksen elinkaari.
  if(nykyinen?.omistaja==='bunGranted')return false;
  const nyt=performance.now();
  const jaksonTunne=laji==='emotion'&&tiedot.lahde==='ihmisen-matka';
  // Visan varoitus ja lopputulos ovat saman tilanteen peräkkäisiä
  // vaiheita: lukitus ei saa jäädä äskeisen varoituseleensä alle.
  // Tuottaja deduplikoi nämä per visaolio. Ohitetaan vain eleiden
  // vähimmäisväli, ei puhe-, luenta-, kortti- tai näkyvyysvartijoita.
  const visanKertatunne=laji==='emotion'&&tiedot.lahde==='visa'&&[
   'aarre.kysymys.viimeinenYritys','aarre.lukittui','aarre.rosvo.voitto','aarre.rosvo.tappio',
  ].includes(tiedot.tunnus);
  // Nopea siirtymä ruoasta sotahistoriaan ei jätä virnettä vakavan
  // sivun päälle. Muut sivunvaihdot noudattavat normaalia eleväliä.
  const vakavaLehti=laji==='emotion'&&tiedot.lahde==='lehti'&&tiedot.tunne==='vakava';
  // Virherivi on jo korvannut odotusrivin, vaikka MutationObserver
  // ei vielä olisi ehtinyt päivittää vanhaa DOM-viitettä.
  if(laji==='error')mietintaMuuttui();
  if(!nakyy()||(laji!=='narration'&&(odotusrivi||odotukset.size))||nykyinen?.group==='Liike'||lepoTila?.flight||lepoTila?.walk)return false;
  // Rekisterin poikkeus: Ihmisen matkan jakson tunne kuuluu alkuun,
  // linssikertojan kuuntelueleet täyttävät vain sen välit.
  if(luennat.size&&!['narration','card'].includes(laji)&&
    !(jaksonTunne&&[...luennat.values()].every(x=>x.lahde==='linssiluenta')))return false;
  if(laji==='narration'&&tiedot.lahde==='linssiluenta'&&
    nykyinen?.omistaja==='emotion'&&nykyinen.lahde==='ihmisen-matka')return false;
  if(laji==='narration'&&(puhe||pollo.auki||(nostoTila?.onkoAuki()&&tiedot.lahde!=='lukija')))return false;
  if(laji==='narration'&&nykyinen?.omistaja==='reaction')return false;
  if(laji!=='card'&&nykyinen?.omistaja==='card')return false;
  if(laji==='narration'&&tiedot.lahde==='matkakirja'&&tiedot.reaktiotAjastettu){
   if(!nykyinen||nykyinen.omistaja==='narration'){katkaise();piirraNyt(nyt);}
   return true;
  }
  if(!jaksonTunne&&!visanKertatunne&&!vakavaLehti&&!['card','narration','chatOpen','chatClose','microphone','answer','error'].includes(laji)&&nyt-viimeTilanne<2800)return false;
  if(puhe&&laji!=='photo')return false;
  if(puhe&&laji==='photo'&&nykyinen&&!['blink','talk','smile','present','welcome'].includes(nykyinen.id))return false;
  const ele=laji==='card'?livianAiheEle(tiedot):['narration','emotion','error'].includes(laji)?tiedot.ele:
   laji==='photo'?(tiedot.cityId==='venetsia'?'love':'present'):
   laji==='chatOpen'?'welcome':laji==='chatClose'?'wink':laji==='microphone'?'listen':
   laji==='answer'?(livianRepliikinEle(tiedot.teksti)==='blink'?'smile':livianRepliikinEle(tiedot.teksti)):
   laji==='success'?'grin':laji==='retry'?'nod':null;
  if(!ele)return false;
  viimeTilanne=nyt;viimeToimi=nyt;
  return toista(ele,{hiljaa:true,omistaja:laji,tunnus:tiedot.tunnus,lahde:tiedot.lahde,voimakkuus:laji==='narration'?.25:['emotion','error'].includes(laji)?tiedot.voimakkuus:livianEleenVoima(ele)});
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
  if(!rivi){if(oli&&!odotukset.size&&!luennat.size&&!puhe&&(!nykyinen?.omistaja||nykyinen.omistaja==='waiting'))palaa();return;}
  if(chatOdotus&&odotukset.has(chatOdotus.tunnus)){
   if(chatOdotus.lahti)return;
   const odotusele=livianMietintaEle(teksti);
   if(odotusele==='flyAway')pinkaiseChatista();
   else if(!puhe&&!luennat.size)toista(odotusele,{hiljaa:true,omistaja:'chatWaiting',tunnus:chatOdotus.tunnus});
   return;
  }
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
   if(!chatOdotus&&!nykyinen&&!puhe&&!luennat.size&&nakyy()&&odotukset.size){
    toista(lehtiPaalla?'scratch':['think','lookRight','reading'][odotusVuoro++%3],{hiljaa:true,omistaja:'waiting'});
   }else if(!nykyinen&&!puhe&&!luennat.size&&nakyy()&&lehtiPaalla&&!pollo.auki&&nyt-viimeEle>=22000){
    toista(['scratch','eyeRub'][lehtiVuoro++%2],{hiljaa:true});
   }else if(!nykyinen&&!lepoTila&&rauhallinen()&&tauko>=30000&&nyt-viimeEle>=22000){
    if(tauko>=180000)toista('sleep',{nuku:true});
    else{const id=valitseLivianTaustaEle(tyhjaVuoro);tyhjaVuoro=id;toista(id,{hiljaa:true});}
   }
   ajasta();
  },8000);
 }
 function toiminta(){const nukkui=lepoTila?.frame==='sleep';viimeToimi=performance.now();if(nukkui)toista('wake');else if(!odotusrivi&&!puhe&&lepoTila)palaa();}
 function saapuminen(){if(!ensisaapuminen){ensisaapuminen=true;toista('handoff');}else toista(++paluuVuoro%7===0?'glassCrash':'clumsyLand');}
 const nappiVahti=new MutationObserver(()=>{
  chatTila?.paivita();nostoTila?.paivita();
  const n=nappiNakyy();if(!nakyy()){peruLoppu();ensiliito=false;katkaise();piirra(lepo());}else{paikkaMuuttui();if(!oliNakyva&&!kohtausPiilossa())saapuminen();}oliNakyva=n;
  if(Boolean(pollo.auki)!==auki){auki=Boolean(pollo.auki);odotusrivi=null;odotusteksti='';
   if(auki){peruLoppu();if(nykyinen?.omistaja==='reaction'){katkaise();piirraNyt(performance.now());}}
   if(!puhe)tilanne(auki?'chatOpen':'chatClose');mietintaMuuttui();if(!nykyinen)piirraNyt(performance.now());}
 });
 const lehti=doc.getElementById?.('arrival-dialog')??null;
 function lehtiMuuttui(){
  const auki=Boolean(lehti?.open&&lehti.classList?.contains('lehti')),muuttui=auki!==lehtiPaalla;
  if(muuttui){lasitPuettu=false;lehtiVuoro=0;
   if(!auki&&['eyeRub','glasses'].includes(nykyinen?.id))katkaise();
  }
  lehtiPaalla=auki;
  // Pukeminen käynnistyy vain kerran. Myöhemmät glasses-korttieleet
  // eivät riisu valmiiksi päässä olevia laseja hetkeksikään.
  if(muuttui&&auki&&!puhe&&!luennat.size&&!odotukset.size){
   if(toista('glasses',{hiljaa:true}))return;
  }
  paikkaMuuttui();
  if(muuttui)piirraNyt(performance.now());
 }
 const lehtiVahti=lehti?new MutationObserver(lehtiMuuttui):null;lehtiVahti?.observe(lehti,{attributes:true,attributeFilter:['open','class']});
 const irrotaDialogit=seuraaLivianDialogeja(doc,()=>{
  // Uusi näkymä ei saa edellisen kortin elettä tai paluulennon häntää.
  peruLoppu();katkaise();lepoTila=null;viimeToimi=performance.now();
  oliNakyva=nappiNakyy();chatTila?.paivita();piirra(lepo());
  // Yhä oikeasti soiva oma puhe saa jatkaa nokkaa, ei vanhaa elettä.
  piirraNyt(performance.now());if(puhe)kaynnista();
  if(kohtausPiilossa())piilotaKohtaukseen();
 });
 const virtaVahti=new MutationObserver(mietintaMuuttui);
 const kokoVahti=typeof ResizeObserver==='function'?new ResizeObserver(paikkaMuuttui):null;kokoVahti?.observe(nappi);
 function liikeAsetus(){
  if(chatOdotus?.lahti){katkaise();lepoTila=livianSvgAsento('flyAway',1);pinta.style.transition='none';pinta.style.opacity='0';ajasta();return;}
  if(kohtausPiilossa()){piilotaKohtaukseen();ajasta();return;}
  if(nykyinen?.omistaja==='opening'){const valmis=nykyinen.valmis;katkaise();lepoTila=null;piirraNyt(performance.now());valmis?.();ajasta();return;}
  katkaise();lepoTila=null;piirraNyt(performance.now());ajasta();if(!vahenna?.matches)kaynnista();
 }
 function tausta(){
  if(doc.hidden){peruLoppu();tauotaPitkatOdotukset();ensiliito=false;katkaise();piirra(lepo());if(kohtausPiilossa())piilotaKohtaukseen();}else{puhe=livianKasvopuheenTila().length>0;puheAlku=performance.now();jatkaPitkiaOdotuksia();if(traileri?.loppui)palaaTrailerista();else if(alkulento?.loppui&&alkulento.luenta)palaaAlkulennosta();else if(kohtausPiilossa())piilotaKohtaukseen();else{piirraNyt(performance.now());kaynnista();}}
  viimeToimi=performance.now();
 }
 const irrotaPuhe=kuunteleLivianKasvopuhetta(tilat=>{
  const oli=puhe;puhe=tilat.length>0;
  if(puhe)peruLoppu();
  if(puhe&&['narration','reaction'].includes(nykyinen?.omistaja))katkaise();
  if(puhe&&!oli){puheAlku=performance.now();
    if(chatOdotus?.lahti)return;
    if(nykyinen?.omistaja==='chatAnswer')return;
    if(nykyinen?.id==='flyAway'||lepoTila?.flight||nykyinen?.id==='peek'||nykyinen?.id.startsWith('leave')||nykyinen?.id==='walkRight'||lepoTila?.walk)palaa();
    else if(!nykyinen){lepoTila=null;const teksti=tilat.at(-1)?.teksti||'',ele=livianRepliikinEle(teksti);toista(ele,{voimakkuus:livianEleenVoima(ele,teksti)});}
  }
  if(!puhe){if(chatOdotus?.lahti){katkaise();lepoTila=livianSvgAsento('flyAway',1);pinta.style.opacity='0';return;}if(lepoTila?.ele==='bookStudy')lepoTila=null;piirraNyt(performance.now());if(oli)jatkaKuunteluaTaiOdotusta();
   if(!luennat.size&&!odotukset.size&&odotusrivi&&!nykyinen)toista(livianMietintaEle(odotusteksti));}
  kaynnista();
 });
 const chatTausta=()=>{if(doc.hidden)tyhjennaChatOdotus({lepoon:true});};
 const chatPagehide=()=>tyhjennaChatOdotus({lepoon:true});
 function tuhoa(){
  if(kuollut)return;kuollut=true;irrotaTilanteet();irrotaDialogit();nostoTila?.tuhoa();chatTila?.tuhoa();tyhjennaChatOdotus();tyhjennaAlkulento();tyhjennaTraileri();katkaise();clearTimeout(kello);for(const tunnus of [...pitkatOdotukset.keys()])peruPitkaOdotus(tunnus);irrotaPuhe();nappiVahti.disconnect();lehtiVahti?.disconnect();virtaVahti.disconnect();pinta.remove();nappi.classList.remove('livia-kasvot-valmis');
  doc.removeEventListener('pointerdown',toiminta,true);doc.removeEventListener('keydown',toiminta,true);doc.removeEventListener('visibilitychange',tausta);doc.removeEventListener('visibilitychange',chatTausta);vahenna?.removeEventListener('change',liikeAsetus);globalThis.removeEventListener?.('pagehide',tausta);globalThis.removeEventListener?.('pagehide',chatPagehide);globalThis.removeEventListener?.('resize',paikkaMuuttui);doc.removeEventListener('scroll',paikkaMuuttui,true);nappi.removeEventListener('transitionend',paikkaMuuttui);doc.removeEventListener(AANIVALINTA_TAPAHTUMA,vaienna);kokoVahti?.disconnect();
 }
 const irrotaTilanteet=kuunteleLivianTilanteita(tilanne);
 nostoTila=asennaLivianNostoTila(pollo,pinta,tilanne,paikkaMuuttui);
 nappiVahti.observe(nappi,{attributes:true,attributeFilter:['hidden','class','aria-expanded','style']});
 if(pollo.virta)virtaVahti.observe(pollo.virta,{childList:true,subtree:true,characterData:true});
 doc.addEventListener('pointerdown',toiminta,true);doc.addEventListener('keydown',toiminta,true);doc.addEventListener('visibilitychange',tausta);doc.addEventListener('visibilitychange',chatTausta);vahenna?.addEventListener('change',liikeAsetus);globalThis.addEventListener?.('pagehide',tausta);globalThis.addEventListener?.('pagehide',chatPagehide);globalThis.addEventListener?.('resize',paikkaMuuttui);doc.addEventListener('scroll',paikkaMuuttui,true);nappi.addEventListener('transitionend',paikkaMuuttui);doc.addEventListener(AANIVALINTA_TAPAHTUMA,vaienna);
  chatTila?.paivita();oliNakyva=nappiNakyy();if(oliNakyva)saapuminen();lehtiMuuttui();ajasta();mietintaMuuttui();
 return{
  ensiliito(valmis,{reducedMotion=false}={}){
   if(kuollut||doc.hidden)return false;
   ensiliito=true;oliNakyva=true;sijoita();
   if(reducedMotion||vahenna?.matches){piirra(lepo());valmis?.();return true;}
   return toista('glideIn',{hiljaa:true,omistaja:'opening',valmis});
  },
  peruEnsiliito(){if(!ensiliito&&nykyinen?.omistaja!=='opening')return;ensiliito=false;katkaise();piirra(lepo());},
  kupla(teksti,{saapuu=false}={}){viimeToimi=performance.now();if(odotusrivi||['opening','bunGranted'].includes(nykyinen?.omistaja))return;if(nykyinen?.id==='handoff')return;const ele=saapuu?'clumsyLand':livianRepliikinEle(teksti);toista(ele,{voimakkuus:livianEleenVoima(ele,teksti)});},
  tilanne,toista,palaa,tuhoa,eleet:LIVIA_SVG_ELEET,
 };
}
