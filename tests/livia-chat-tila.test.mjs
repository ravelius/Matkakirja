import test from 'node:test';
import assert from 'node:assert/strict';
import {livianChatAsettelu,asennaLivianChatTila} from '../js/livia-chat-tila.js';

const cases=[
 ['pieni puhelin',320,568,0,0,{}],['iPhone',390,844,0,0,{bottom:34}],
 ['ruutukaappauksen leveys',464,800,0,0,{}],['näppäimistö',390,360,0,130,{}],
 ['pieni näppäimistö',320,280,0,170,{}],['vaaka',844,390,0,0,{left:47,right:47}],
 ['tabletti',768,1024,0,0,{bottom:20}],['työpöytä',1440,900,0,0,{}],
 ['zoomattu ruutu',340,420,50,70,{}],
];
for(const [name,width,height,x,y,safe] of cases)test(`suuri kasvo ja chat eivät peity: ${name}`,()=>{
 const {paneeli:p,kasvo:k,nappi:n}=livianChatAsettelu({width,height,x,y,safe});
 assert.ok(p.top+p.height<=k.top-13||p.left+p.width<=k.left-13,'kasvon ympärillä on rako');
 for(const r of [p,k,n]){
  assert.ok(r.left>=x&&r.top>=y,JSON.stringify(r));
  assert.ok(r.left+r.width<=x+width&&r.top+r.height<=y+height,JSON.stringify(r));
 }
 assert.ok(p.width>=170&&p.height>=200,'chatilla on käyttökelpoinen tila');
 assert.equal(n.width,48);assert.equal(n.height,48);
});

test('avaus, näppäimistö ja sulkeminen palauttavat paikan ilman muutoskehää',()=>{
 let writes=0,repaints=0;
 const element=()=>{const props=new Map(),classes=new Set();return{
  style:{getPropertyValue:k=>props.get(k)?.[0]||'',getPropertyPriority:k=>props.get(k)?.[1]||'',
   setProperty(k,v,p=''){writes++;props.set(k,[v,p]);},removeProperty(k){writes++;props.delete(k);}},
  classList:{contains:k=>classes.has(k),add(k){writes++;classes.add(k);},remove(k){writes++;classes.delete(k);}}
 };};
 const n=element(),p=element(),vv=new EventTarget(),win=new EventTarget();
 Object.assign(vv,{width:390,height:844,offsetTop:0,offsetLeft:0});
 Object.assign(win,{visualViewport:vv,innerHeight:844,getComputedStyle:()=>({getPropertyValue:()=>0})});
 n.classList.add('pollo-kelluu');n.style.setProperty('--livia-chat-nappi-x','19px','important');
 const pollo={nappi:n,paneeli:p,doc:{defaultView:win,documentElement:{clientWidth:390}},auki:true};
 const tila=asennaLivianChatTila(pollo,()=>repaints++);tila.paivita();
 const baseline=writes;tila.paivita();assert.equal(writes,baseline,'ei uusia style/class-mutaatioita');
 const before=p.style.getPropertyValue('--livia-chat-leveys');
 vv.height=360;vv.offsetTop=130;vv.dispatchEvent(new Event('resize'));
 assert.notEqual(p.style.getPropertyValue('--livia-chat-leveys'),before);assert.ok(repaints>0);
 pollo.auki=false;tila.paivita();
 assert.equal(n.style.getPropertyValue('--livia-chat-nappi-x'),'19px');
 assert.equal(n.style.getPropertyPriority('--livia-chat-nappi-x'),'important');
 assert.equal(n.style.getPropertyValue('--livia-chat-nappi-y'),'');
 assert.equal(p.classList.contains('livia-chat-tila'),false);
 pollo.auki=true;tila.paivita();tila.tuhoa();
 const end=writes;vv.dispatchEvent(new Event('resize'));win.dispatchEvent(new Event('resize'));
 assert.equal(writes,end,'irrotetut kuuntelijat eivät muuta paikkoja');
});
