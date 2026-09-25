/* Pulun pienet foley-äänet ja niiden ankkurit liikkeessä.
 * Puhdas PCM-synteesi: sama ääni offline-pelissä ja kokeilusivulla. */
export const LIVIA_ELEAANI_TYYPIT=Object.freeze(['flap','land','step','crumb','glass','slide','puff','coo']);
export function livianEleaaniNaytteet(kind,rate=22050){
 if(!LIVIA_ELEAANI_TYYPIT.includes(kind))return new Float32Array(0);
 const duration={flap:.17,land:.13,step:.055,crumb:.095,glass:.19,slide:.27,puff:.15,coo:.22}[kind];
 const data=new Float32Array(Math.ceil(rate*duration));let seed=1337,low=0,phase=0;
 for(let i=0;i<data.length;i++){
  const t=i/rate,u=t/duration;seed=(Math.imul(seed,1664525)+1013904223)>>>0;
  const n=seed/2147483648-1;low+=.12*(n-low);const env=Math.min(1,t/.008)*(1-u)**2;
  let v=0;
  if(kind==='flap')v=low*.46*Math.sin(Math.PI*u)**2;
  if(kind==='land'||kind==='step'){phase+=2*Math.PI*(kind==='land'?180-95*u:310-90*u)/rate;v=Math.sin(phase)*.20+low*.11;}
  if(kind==='crumb')v=(n-low)*.09*(Math.sin(t*180)>0?.8:.2);
  if(kind==='glass')v=(Math.sin(t*2*Math.PI*730)*.13+Math.sin(t*2*Math.PI*1270)*.055)*Math.exp(-u*5);
  if(kind==='slide')v=low*.15*(.4+.6*Math.sin(t*110)**2);
  if(kind==='puff')v=low*.32;
  if(kind==='coo'){phase+=2*Math.PI*(280-90*u+12*Math.sin(u*10))/rate;v=Math.sin(phase)*.10*Math.sin(Math.PI*u);}
  data[i]=v*env;
 }
 return data;
}
const leCues={
 flyAway:[[.18,'flap',.7],[.28,'flap',.5],[.40,'flap',.25]],
 flyBack:[[.29,'flap',.25],[.45,'flap',.55],[.622,'land',.65]],
 clumsyLand:[[.13,'flap',.45],[.28,'flap',.6],[.46,'land',.7]],
 glassCrash:[[.20,'flap',.45],[.37,'glass',.7],[.50,'slide',.45],[.68,'land',.65]],
 walkRight:[.15,.28,.41,.54,.67,.80,.90].map(p=>[p,'step',.38]),
 walkBack:[.10,.23,.36,.49,.62,.75].map(p=>[p,'step',.38]),
 bread:[[.25,'crumb',.42],[.40,'crumb',.34]],crumb:[[.23,'crumb',.3]],
 preen:[[.28,'flap',.15]],puff:[[.65,'puff',.4]],sneeze:[[.47,'puff',.5]],
 shock:[[.24,'coo',.25]],crash:[[.14,'flap',.4],[.32,'land',.55]],
 arrive:[[.17,'flap',.35],[.55,'land',.35]],emerge:[[.60,'land',.2]],
 handoff:[[.43,'flap',.25],[.69,'land',.3]],
};
leCues.leaveRight=leCues.walkRight;
export function livianEleaaniIskut(id){return(leCues[id]||[]).map(([at,kind,level])=>({at,kind,level}));}
