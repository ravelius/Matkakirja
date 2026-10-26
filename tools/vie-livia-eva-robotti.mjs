/* Vie robottikäden lisäkerrokset samasta SVG-piirroksesta webiin ja natiiviin.
 * SHARP_JS=/polku/sharp node tools/vie-livia-eva-robotti.mjs [kohdekansio]
 * Varren, köyden ja pidikkeiden peittävät reunapikselit lukitaan alfaan 255;
 * valokerroksen läpikuultavat pikselit säilyvät. */
import {writeFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import {livianEvaRobottiKerrosSvg} from '../js/livia-svg.js';
import {avaaChromium} from './selain.mjs';

const juuri=fileURLToPath(new URL('..',import.meta.url));
const kohde=process.argv[2]??`${juuri}assets/livia`;
const require=createRequire(import.meta.url);
const sharp=require(process.env.SHARP_JS??'sharp');
const kerrokset={varsi:'varsi',reunavalo:'reunavalo','turvaköysi':'turvakoysi',pidikkeet:'pidikkeet'};

async function lukitsePeittavaAlfa(png){
  const {data,info}=await sharp(png).ensureAlpha().raw().toBuffer({resolveWithObject:true});
  for(let i=3;i<data.length;i+=4)if(data[i]>=240)data[i]=255;
  return sharp(data,{raw:{width:info.width,height:info.height,channels:4}}).png().toBuffer();
}

const selain=await avaaChromium();
try{
  const sivu=await selain.newPage({viewport:{width:152,height:800},deviceScaleFactor:2});
  for(const [kerros,tiedosto] of Object.entries(kerrokset)){
    const svg=livianEvaRobottiKerrosSvg(kerros);
    await sivu.setContent(`<!doctype html><html><body style="margin:0;background:transparent">${svg}</body></html>`);
    let png=await sivu.locator('svg').screenshot({omitBackground:true});
    if(kerros!=='reunavalo')png=await lukitsePeittavaAlfa(png);
    const nimi=`livia-eva-robotin-${tiedosto}-2x.png`;
    writeFileSync(`${kohde}/${nimi}`,png);
    console.log(`${nimi} ${png.length} tavua`);
  }
}finally{
  await selain.close();
}
