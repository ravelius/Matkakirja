import { PEILI_JUURI } from './media.js';
export const LIVIAN_KASVOKUVA = `${PEILI_JUURI}hahmot/livia-kasvot-B-r20260909-v1.png`;
// Owner-selected B, animated from the original image. No replacement drawing.
export const LIVIAN_KASVOELEET = [
  {id:'blink', label:'Räpäytys', duration:1800, text:'Asiantuntija kuuntelee. Ainakin näyttää siltä.'},
  {id:'glance', label:'Sivusilmäys', duration:2900, text:'Hetkinen. Mitä sinä juuri sanoit?'},
  {id:'crumb', label:'Muru nokassa', duration:5300, text:'Pieni häiriö asiantuntijapalvelussa. Tilanne on täysin hallinnassa.'},
  {id:'peek', label:'Kurkistus', duration:3100, text:'Ei täällä ketään ole. Paitsi ehkä yksi asiantuntija.'},
  {id:'owl', label:'Pöllön luona', duration:3600, text:'Käyn varmistamassa yhden aivan pienen asian.'}
];
const liviaKasvoRajaa=x=>Math.max(0,Math.min(1,x));
const liviaKasvoPehmenna=x=>{x=liviaKasvoRajaa(x);return x*x*(3-2*x)};
function liviaKasvoValita(t,points){
  let a=points[0],b=points.at(-1);
  for(let i=1;i<points.length;i++)if(t<=points[i][0]){a=points[i-1];b=points[i];break;}
  return a[1]+(b[1]-a[1])*liviaKasvoPehmenna((t-a[0])/(b[0]-a[0]||1));
}
export function livianKasvoAsento(id,t){
  t=liviaKasvoRajaa(t);
  const p={silma:1,gazeX:0,gazeY:0,tilt:0,lift:0,crumb:0,crumbDrop:0,x:0,y:0,line:0};
  if(id==='blink')p.silma=liviaKasvoValita(t,[[0,1],[.3,1],[.37,.06],[.45,1],[1,1]]);
  if(id==='glance'){
    p.gazeX=liviaKasvoValita(t,[[0,0],[.15,0],[.3,-28],[.7,-28],[.9,0],[1,0]]);
    p.silma=liviaKasvoValita(t,[[0,1],[.26,1],[.4,.66],[.72,.66],[.9,1],[1,1]]);
    p.lift=liviaKasvoValita(t,[[0,0],[.35,1.3],[.7,1.3],[1,0]]);
  }
  if(id==='crumb'){
    p.crumb=liviaKasvoValita(t,[[0,0],[.12,0],[.13,1],[.72,1],[.77,0],[1,0]]);
    p.crumbDrop=liviaKasvoValita(t,[[0,0],[.13,0],[.26,1],[.66,1],[.75,0],[1,0]]);
    p.gazeX=liviaKasvoValita(t,[[0,0],[.32,0],[.4,-34],[.59,-34],[.72,0],[1,0]]);
    p.gazeY=liviaKasvoValita(t,[[0,0],[.33,0],[.43,12],[.59,12],[.72,0],[1,0]]);
    p.silma=liviaKasvoValita(t,[[0,1],[.31,1],[.325,.08],[.345,1],[.36,1],[.375,.08],[.4,1],[.79,1],[.82,.06],[.87,1],[1,1]]);
    p.tilt=liviaKasvoValita(t,[[0,0],[.48,0],[.53,6],[.6,6],[.635,-10],[.66,10],[.685,-7],[.71,0],[1,0]]);
    p.lift=liviaKasvoValita(t,[[0,0],[.62,0],[.65,2],[.69,1],[.72,0],[.85,0],[.91,1],[1,0]]);
  }
  if(id==='peek'){
    p.line=liviaKasvoValita(t,[[0,0],[.1,1],[.85,1],[1,0]]);
    p.y=liviaKasvoValita(t,[[0,0],[.22,42],[.36,42],[.5,24],[.7,24],[.77,29],[1,0]]);
    p.gazeX=liviaKasvoValita(t,[[0,0],[.5,0],[.59,-26],[.71,-26],[1,0]]);
  }
  if(id==='owl'){
    p.x=liviaKasvoValita(t,[[0,0],[.13,0],[.32,50],[.66,50],[.81,4],[.87,0],[.92,2],[1,0]]);
    p.lift=liviaKasvoValita(t,[[0,0],[.12,1],[.27,12],[.67,12],[.86,0],[1,0]]);
    p.tilt=liviaKasvoValita(t,[[0,0],[.15,-5],[.32,-5],[.67,7],[.87,-5],[1,0]]);
  }
  return p;
}

// Pixel coordinates refer to the selected, untouched 1254px B source.
const LIVIA_KASVORAJAUS={x:150,y:135,w:950,h:700};
const silma={x:545,y:318,w:237,h:118};
export function piirraLivianKasvot(ctx,image,p,{width=46,height=96,zoom=false}={}){
  const vh=zoom?62:96;
  ctx.clearRect(0,0,width,height);
  ctx.save();ctx.scale(width/46,height/vh);
  if(zoom)ctx.translate(0,-34);
  ctx.beginPath();ctx.rect(0,0,46,96);ctx.clip();
  const s=42/LIVIA_KASVORAJAUS.w, left=3, top=53;
  const angle=p.tilt*Math.PI/180;
  ctx.save();
  if(p.line){ctx.beginPath();ctx.rect(0,0,46,87);ctx.clip();}
  ctx.translate(26+p.x,80-p.lift+p.y);ctx.rotate(angle);ctx.translate(-26,-80);
  ctx.drawImage(image,LIVIA_KASVORAJAUS.x,LIVIA_KASVORAJAUS.y,LIVIA_KASVORAJAUS.w,LIVIA_KASVORAJAUS.h,left,top,LIVIA_KASVORAJAUS.w*s,LIVIA_KASVORAJAUS.h*s);
  if(p.silma!==1||p.gazeX||p.gazeY){
    const ex=left+(silma.x-LIVIA_KASVORAJAUS.x)*s, ey=top+(silma.y-LIVIA_KASVORAJAUS.y)*s;
    ctx.drawImage(image,550,470,230,110,ex-.2,ey-.2,silma.w*s+.4,silma.h*s+.4);
    const open=liviaKasvoRajaa((p.silma-.12)/.38), h=silma.h*s*Math.max(.3,p.silma);
    ctx.save();ctx.globalAlpha=open;
    ctx.drawImage(image,silma.x,silma.y,silma.w,silma.h,
      ex+p.gazeX*s,ey+(silma.h*s-h)*.46+p.gazeY*s,silma.w*s,h);
    // The original curved lower eyelid doubles as the closed eyelid.
    ctx.globalAlpha=1-open;
    ctx.drawImage(image,590,389,138,44,
      ex+(45+p.gazeX)*s,ey+(43+p.gazeY)*s,138*s,44*s);
    ctx.restore();
  }
  if(p.crumb){
    ctx.globalAlpha=p.crumb;ctx.fillStyle='#302a22';
    ctx.beginPath();ctx.ellipse(5,19+48*p.crumbDrop,.9,1.15,.4,0,Math.PI*2);ctx.fill();
  }
  ctx.restore();
  if(p.line){ctx.globalAlpha=p.line;ctx.strokeStyle='#302a22';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(5,87.5);ctx.lineTo(44,87.5);ctx.stroke();}
  ctx.restore();
}
export async function luoLivianKasvot(host,{zoom=false,imageUrl=LIVIAN_KASVOKUVA}={}){
  const image=new Image();image.crossOrigin='anonymous';image.src=imageUrl;
  await image.decode();
  const canvas=document.createElement('canvas');canvas.setAttribute('aria-hidden','true');
  canvas.style.cssText='display:block;width:100%;height:auto;mix-blend-mode:multiply';
  const cssWidth=zoom?138:46,cssHeight=zoom?186:96;
  const ratio=Math.max(1,Math.min(3,devicePixelRatio||1));
  canvas.width=Math.round(cssWidth*ratio);canvas.height=Math.round(cssHeight*ratio);
  host.append(canvas);const ctx=canvas.getContext('2d');
  const paint=p=>piirraLivianKasvot(ctx,image,p,{width:canvas.width,height:canvas.height,zoom});
  paint(livianKasvoAsento('blink',0));return{paint,remove:()=>canvas.remove()};
}
