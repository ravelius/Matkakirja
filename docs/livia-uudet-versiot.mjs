/* Neljä katseluehdotusta. Pelin ohjain ei tuo tätä moduulia.
 * Piirretyt liikeavaimet ovat samassa aikajanassa: pään ele johtaa,
 * rintakehä ja siipien kärjet seuraavat viiveellä. Ei satunnaisuutta,
 * joten kelaus ja tauko palaavat aina täsmälleen samaan asentoon.
 * Kasvon geometria tulee hyväksytystä SVG-päästä, myös väliruuduissa. */
import {livianSvgPaa} from '../js/livia-svg-paa.js';

export const LIVIAN_UUDET_VERSIOT=Object.freeze([
  {id:'uusi-nod',baseId:'nod',label:'Kyllä kyllä',duration:2100,group:'Uudet versiot',kuvaus:'Pieni valmistelu, napakka nyökkäys ja pienempi vahvistus. Pää palaa rauhassa paikalleen.'},
  {id:'uusi-doubleTake',baseId:'doubleTake',label:'Hetkinen!',duration:2750,group:'Uudet versiot',kuvaus:'Sivusilmäys, havahtuminen ja nopea toinen vilkaisu. Vartalo seuraa päätä hieman jäljessä.'},
  {id:'uusi-welcome',baseId:'welcome',label:'Hauska nähdä',duration:2900,group:'Uudet versiot',kuvaus:'Katse huomaa tulijan, siivet avautuvat eri aikaan ja tervehdys jää hetkeksi elämään.'},
  {id:'uusi-bookStudy',baseId:'bookStudy',label:'Kirjan selaus',duration:4400,group:'Uudet versiot',kuvaus:'Katse seuraa riviä. Siipi hakee sivun, kääntää sen nopeasti ja antaa paperin asettua.'},
].map(Object.freeze));

const rajaa=n=>Math.max(0,Math.min(1,Number.isFinite(n)?n:0));
const pyorista=n=>Math.round(n*1000)/1000;

// Monotoninen Hermite säilyttää nopeuden saman suuntaisilla avaimilla.
// Vain suunnanvaihto ja kirjoitettu pito pysäyttävät liikkeen; yksittäinen
// pehmennys jokaisen avaimen välissä tekisi liikkeestä nykivän.
export function liikearvo(p,avaimet){
  p=rajaa(p);
  const kulma=i=>{
    if(i===0||i===avaimet.length-1)return 0;
    const a=(avaimet[i][1]-avaimet[i-1][1])/(avaimet[i][0]-avaimet[i-1][0]);
    const b=(avaimet[i+1][1]-avaimet[i][1])/(avaimet[i+1][0]-avaimet[i][0]);
    return a*b<=0?0:2*a*b/(a+b);
  };
  for(let i=1;i<avaimet.length;i++){
    const [a,x]=avaimet[i-1],[b,y]=avaimet[i];
    if(p>b)continue;
    const t=rajaa((p-a)/(b-a)),t2=t*t,t3=t2*t;
    return (2*t3-3*t2+1)*x+(t3-2*t2+t)*(b-a)*kulma(i-1)
      +(-2*t3+3*t2)*y+(t3-t2)*(b-a)*kulma(i);
  }
  return avaimet.at(-1)[1];
}

const RADAT={
  'uusi-nod':{
    paaKulma:[[0,0],[.07,0],[.15,8],[.245,-24],[.27,-23],[.40,3],[.53,-12],[.59,-9],[.79,1],[.94,0],[1,0]],
    paaY:[[0,0],[.15,-3],[.25,8],[.40,-1],[.53,4],[.81,0],[1,0]],
    rinta:[[0,0],[.18,-1.2],[.31,3],[.45,0],[.59,1.3],[.85,0],[1,0]],
    rapaytys:[[0,0],[.18,0],[.215,.85],[.275,0],[.81,0],[.84,1],[.88,0],[1,0]],
  },
  'uusi-doubleTake':{
    paaKulma:[[0,0],[.08,0],[.16,7],[.24,7],[.32,0],[.395,15],[.46,-4],[.54,4],[.67,4],[.88,0],[1,0]],
    paaX:[[0,0],[.16,4],[.24,4],[.32,0],[.40,-7],[.48,-4],[.67,-4],[.94,0],[1,0]],
    paaY:[[0,0],[.33,0],[.405,-9],[.48,-4],[.64,-4],[.94,0],[1,0]],
    rinta:[[0,0],[.20,-1],[.33,0],[.45,4],[.55,1.2],[.71,1.2],[.96,0],[1,0]],
    katse:[[0,0],[.095,1],[.26,1],[.32,0],[.37,-.5],[.64,-.5],[.9,0],[1,0]],
    ilme:[[0,0],[.34,0],[.395,1],[.55,1],[.83,0],[1,0]],
    rapaytys:[[0,0],[.27,0],[.30,1],[.33,0],[.81,0],[.85,1],[.89,0],[1,0]],
  },
  'uusi-welcome':{
    paaKulma:[[0,0],[.08,5],[.19,-6],[.29,2],[.40,-2],[.62,-2],[.90,0],[1,0]],
    paaY:[[0,0],[.1,-2],[.20,3],[.31,0],[1,0]],
    rinta:[[0,0],[.12,2],[.25,-4],[.38,-2],[.64,-2],[.89,.5],[1,0]],
    siipi:[[0,0],[.09,0],[.16,.15],[.245,1],[.31,.89],[.45,.89],[.52,1],[.60,.87],[.67,.87],[.90,0],[1,0]],
    takasiipi:[[0,0],[.15,0],[.28,.74],[.38,.62],[.64,.62],[.94,0],[1,0]],
    sulat:[[0,0],[.15,0],[.28,1],[.34,.82],[.54,1],[.69,.84],[.95,0],[1,0]],
    ilme:[[0,0],[.09,.2],[.22,1],[.70,1],[.96,0],[1,0]],
    rapaytys:[[0,0],[.07,0],[.10,1],[.14,0],[.75,0],[.78,.9],[.82,0],[1,0]],
  },
  'uusi-bookStudy':{
    paaKulma:[[0,0],[.10,-10],[.28,-10],[.37,-5],[.49,-5],[.58,-8],[.73,-8],[.88,3],[1,0]],
    paaX:[[0,0],[.11,-3],[.30,1],[.38,-2],[.56,-2],[.70,2],[.88,0],[1,0]],
    paaY:[[0,0],[.12,4],[.30,4],[.39,1],[.55,3],[.73,3],[.88,-1],[1,0]],
    rinta:[[0,0],[.16,-1.8],[.31,-1.8],[.45,-3],[.61,-1.5],[.77,-1.5],[1,0]],
    katse:[[0,0],[.1,-.6],[.29,.6],[.34,-.6],[.57,-.6],[.72,.5],[.86,0],[1,0]],
    ilme:[[0,0],[.10,1],[.73,1],[.9,0],[1,0]],
    siipi:[[0,0],[.30,0],[.40,.65],[.46,.75],[.535,1],[.60,.8],[.73,0],[1,0]],
    sulat:[[0,0],[.34,0],[.44,.75],[.555,1],[.64,.7],[.78,0],[1,0]],
    sivu:[[0,0],[.445,0],[.49,.12],[.565,.88],[.605,1],[1,1]],
    paperi:[[0,0],[.52,0],[.61,1],[.66,-.38],[.72,.12],[.80,0],[1,0]],
    rapaytys:[[0,0],[.305,0],[.326,1],[.35,0],[.83,0],[.855,1],[.885,0],[1,0]],
  },
};

export function uudenEleenAsento(id,p,{voimakkuus=.5}={}){
  const radat=RADAT[id];
  if(!radat)throw new RangeError('Tuntematon katseluele: '+id);
  const s={id,p:rajaa(p),paaKulma:0,paaX:0,paaY:0,rinta:0,siipi:0,takasiipi:0,sulat:0,katse:0,ilme:0,rapaytys:0,sivu:0,paperi:0};
  for(const [avain,rata]of Object.entries(radat))s[avain]=liikearvo(s.p,rata);
  const voima=.55+.9*rajaa(voimakkuus);
  for(const avain of ['paaKulma','paaX','paaY','rinta'])s[avain]*=voima;
  return s;
}

// Samat muodot kuin pelissä. Vain numeeriset SVG-geometriat interpoloidaan:
// värit, id:t ja polkukäskyt pysyvät koskemattomina. Smile-polku lisätään
// erikseen, koska muilla ilmeillä sitä ei ole. Ei päällekkäisiä kasvokuvia.
const GEOMETRIA=/\b(d|transform|cx|cy|rx|ry|x|y)="([^"]*)"/g;
const NUMERO=/-?\d*\.?\d+(?:e[-+]?\d+)?/gi;
const ILMEET=['rest','glance','down','shock','blink','smile'];
const POHJAT=Object.fromEntries(ILMEET.map(frame=>{
  const svg=livianSvgPaa({frame},{prefix:'katselupaa'}).replace(/<path data-part="smile"[^>]*\/>/,'');
  return [frame,{svg,luvut:[...svg.matchAll(GEOMETRIA)].flatMap(m=>[...m[2].matchAll(NUMERO)].map(n=>Number(n[0])))}];
}));
function paa(s,prefix){
  const lepo=POHJAT.rest.luvut,ilme=POHJAT[s.id==='uusi-doubleTake'?'shock':s.id==='uusi-welcome'?'smile':s.id==='uusi-bookStudy'?'down':'rest'].luvut;
  let i=0;
  const kuva=POHJAT.rest.svg.replaceAll('katselupaa',prefix).replace(GEOMETRIA,(_,nimi,arvo)=>`${nimi}="${arvo.replace(NUMERO,()=>{
    const n=i++,avoin=lepo[n]+(ilme[n]-lepo[n])*s.ilme+(POHJAT.glance.luvut[n]-lepo[n])*s.katse;
    return pyorista(avoin+(POHJAT.blink.luvut[n]-avoin)*s.rapaytys);
  })}"`);
  const hymy=s.id==='uusi-welcome'?`<path d="M24 67Q38 71 46 62" fill="none" stroke="#334e5b" stroke-width="1.7" stroke-linecap="round" opacity="${pyorista(s.ilme)}"/>`:'';
  const lasit=s.id==='uusi-bookStudy'?'<g fill="none" stroke="#655a48" stroke-width="2.2"><ellipse cx="37" cy="45.5" rx="8.5" ry="9"/><ellipse cx="61" cy="42.75" rx="13" ry="12"/><path d="M45.5 43.5Q47 37 48 40.75m26-1l8-5m-53.5 9l-4-3"/><path d="M55 36.75l4-2" stroke="#eee9d9" stroke-width="1.5"/></g>':'';
  return kuva.replace(/<\/g>\s*$/,`${hymy}${lasit}</g>`);
}

const VARTALO='<path d="M122 156L139 171L131 172L137 175L122 174L113 163Z" fill="#546b7a"/><path d="M87 137Q97 127 115 133Q131 137 132 152Q134 170 117 175Q100 178 89 165Q82 154 87 137Z" fill="#97a5ac"/><path d="M89 141Q98 134 105 137Q96 147 96 158Q97 170 109 175Q96 171 89 162Q84 152 89 141Z" fill="#b1bcc0"/><path d="M117 135Q132 140 132 154Q134 171 117 175L110 172Q119 161 117 135Z" fill="#738895"/>';
const TAITTUNUT_SIIPI='<path d="M112 136Q128 137 133 150Q135 161 128 171Q116 166 112 151Z" fill="#84959f"/><path d="M119 145Q126 148 130 153L129 157Q123 151 118 150Z M120 155Q126 158 130 163L128 167Q124 162 120 160Z" fill="#4d6472"/>';
function siipi(s,taka=false){
  const t=taka?s.takasiipi:s.siipi,auki=rajaa(t/.22),kirja=s.id==='uusi-bookStudy';
  if(t===0)return taka?'':TAITTUNUT_SIIPI;
  // Kirjaan kurotetaan alhaalta rinnan ohi, ei kasvojen poikki.
  const kulma=165+(kirja?75:-112)*t+(s.sulat-t)*14;
  return `${taka?'':`<g opacity="${pyorista(1-auki)}">${TAITTUNUT_SIIPI}</g>`}<g data-part="${taka?'far':'near'}-wing" opacity="${pyorista(auki)}" transform="translate(${pyorista((taka?88:121)-(kirja?8:0)*t)} ${pyorista(143+(kirja?2:0)*t)}) scale(${taka?-1:1} 1) rotate(${pyorista(kulma)}) scale(${pyorista(.65+.35*t)} ${pyorista(.5+(kirja?.65:.5)*t)})"><path d="M-3 4Q-11-7-4-20L4-38Q7-44 10-37L10-29Q16-42 20-37L17-24Q23-35 26-30L22-17Q29-23 29-17Q23-5 12 3Q4 8-3 4Z" fill="${taka?'#788e99':'#8499a3'}"/><path d="M0-13L8-27M5-7L16-23M10-1L21-15" fill="none" stroke="#506b7a" stroke-width="3.7" stroke-linecap="round"/></g>`;
}
function kirja(s){
  if(s.id!=='uusi-bookStudy')return '';
  const t=s.sivu,karki=22+21*Math.cos(t*Math.PI),kaari=-18*Math.sin(t*Math.PI)-s.paperi*2;
  return `<g data-part="book" transform="translate(48 148) rotate(${pyorista(-10+s.paperi*1.7)})"><path d="M0 0L22 3L43-1L45 24L22 27L2 22Z" fill="#96876c"/><path d="M1-2Q13-4 22 1Q33-4 42-3L43 20Q32 20 22 25Q11 19 2 19Z" fill="#e9dfc5"/><path d="M22 1v24m-17-20l12 2m-12 4l12 2m-12 4l11 2m10-13l12-3m-12 9l12-3m-12 9l12-3" stroke="#9a8c73" fill="none" stroke-width="1.1"/><path data-part="page" d="M22 1Q${pyorista((22+karki)/2)} ${pyorista(kaari)} ${pyorista(karki)} -3L${pyorista(karki+1)} 20Q${pyorista((22+karki)/2)} ${pyorista(19+kaari*.2)} 22 25Z" fill="#f3ead5" stroke="#b6a88d" stroke-width=".8" opacity="${t>0&&t<1?1:0}"/></g>`;
}
export function uudenEleenKuva(s,{prefix='uusi',right=44}={}){
  prefix=prefix.replace(/[^a-zA-Z0-9_-]/g,'');
  const jalka=x=>`<path d="M${x} 177l-1 8m0 0l-7 2m7-2l5 3m-5-3l1 3" fill="none" stroke="#ac7b74" stroke-width="2.1" stroke-linecap="round"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${152+right} 304" width="${152+right}" height="304" aria-hidden="true" data-uusi-versio="${s.id}"><defs><radialGradient id="${prefix}ground"><stop stop-color="#635b4e" stop-opacity=".58"/><stop offset=".55" stop-color="#635b4e" stop-opacity=".32"/><stop offset="1" stop-color="#635b4e" stop-opacity="0"/></radialGradient></defs><ellipse cx="128" cy="301" rx="19" ry="2.8" fill="url(#${prefix}ground)"/><g data-part="whole-bird" transform="translate(128 302) scale(.56) translate(-108 -188)"><g data-part="feet">${jalka(99)}${jalka(118)}</g>${siipi(s,true)}<g data-part="body" transform="rotate(${pyorista(s.rinta)} 109 177)">${VARTALO}</g><g data-part="approach" transform="translate(${pyorista(s.paaX)} ${pyorista(s.paaY)}) rotate(${pyorista(s.paaKulma)} 105 146)"><g transform="translate(44 61) scale(1 .87)">${paa(s,prefix)}</g></g>${siipi(s)}${kirja(s)}</g></svg>`;
}
