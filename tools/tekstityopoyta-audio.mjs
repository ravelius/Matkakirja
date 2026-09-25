// One owner-confirmed immutable speech. Keys remain in GitHub Actions secrets.
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {pathToFileURL} from 'node:url';
const exec=promisify(execFile);
const hash=value=>createHash('sha256').update(value).digest('hex');
const strip=text=>text.replace(/\[[^\]\r\n]*\]/gu,'').replace(/\s+/gu,' ').trim();
export function validateRequest(input){
  assert.ok(typeof input==='string'&&input.length<=30000,'Bounded request required');
  const data=JSON.parse(input),{payloadHash,requestId,...payload}=data;
  assert.match(requestId,/^aani-[a-f0-9]{24}$/);assert.match(payloadHash,/^[a-f0-9]{64}$/);
  assert.equal(hash(JSON.stringify(payload)),payloadHash,'Immutable payload hash');
  assert.equal(payload.schemaVersion,1);assert.ok(['livia','horatio','slogan'].includes(payload.role));
  assert.match(payload.cityId,/^[a-z0-9-]{1,80}$/);
  for(const value of [payload.visibleText,payload.ttsText])assert.ok(typeof value==='string'&&value.trim().length>0&&value.length<=8000);
  assert.equal(strip(payload.ttsText),strip(payload.visibleText));
  assert.equal(payload.voiceId,payload.role==='horatio'?'Sz0tRTEpybtDJ9ru2kgD':'piI8Kku0DcvcL6TTSeQt');
  assert.equal(payload.model,'eleven_v3');assert.equal(payload.stability,0.5);
  assert.equal(payload.outputFormat,'mp3_44100_192');assert.equal(payload.postprocess,'none');
  assert.equal(payload.preservePrevious,true);assert.equal(payload.autoPublish,false);
  if(payload.role!=='livia'){assert.equal(payload.visibleText,payload.ttsText);assert.ok(!/[\[\]]/.test(payload.ttsText));}
  return {...payload,requestId,payloadHash};
}
export async function generate(input,{dryRun=false}={}){
  const p=validateRequest(input),key=`audio/textdesk/${p.requestId}/${p.payloadHash}`;
  if(dryRun){console.log(JSON.stringify({validated:true,requestId:p.requestId,cityId:p.cityId,role:p.role,characters:p.ttsText.length,paidCalls:0}));return;}
  for(const name of ['ELEVEN_API_KEY','AWS_ACCESS_KEY_ID','AWS_SECRET_ACCESS_KEY','R2_ACCOUNT_ID','R2_BUCKET'])assert.ok(process.env[name],`Missing ${name}`);
  assert.equal(process.env.GITHUB_RUN_ATTEMPT,'1','Rerunning a paid attempt is forbidden');
  await fs.mkdir('textdesk-output',{recursive:true});
  const aws=['--endpoint-url',`https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`];
  const put=async(suffix,file,type)=>{
    await exec('aws',['s3api','put-object','--bucket',process.env.R2_BUCKET,'--key',key+suffix,'--body',file,'--content-type',type,'--cache-control','public, max-age=31536000, immutable','--if-none-match','*',...aws],{timeout:60000,maxBuffer:8192});
  };
  // Atomic storage reservation before the only paid call. A failed/uncertain run
  // is never automatically retried, even if an operator reruns Actions manually.
  await fs.writeFile('textdesk-output/planned.json',JSON.stringify({requestId:p.requestId,payloadHash:p.payloadHash,runId:process.env.GITHUB_RUN_ID}));
  await put('.planned.json','textdesk-output/planned.json','application/json');
  const response=await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${p.voiceId}?output_format=${p.outputFormat}`,{
    method:'POST',headers:{'xi-api-key':process.env.ELEVEN_API_KEY,'Content-Type':'application/json',Accept:'audio/mpeg'},
    body:JSON.stringify({text:p.ttsText,model_id:p.model,voice_settings:{stability:p.stability}}),signal:AbortSignal.timeout(180000),redirect:'error',
  });
  assert.ok(response.ok,`Speech generation HTTP ${response.status}; no automatic retry`);
  const bytes=Buffer.from(await response.arrayBuffer());assert.ok(bytes.length>1000&&bytes.length<25000000,'Invalid audio size');
  await fs.writeFile('textdesk-output/raw.mp3',bytes); // Original bytes, no resampling or encoding.
  const probe=await exec('ffprobe',['-v','error','-show_entries','format=duration','-of','default=noprint_wrappers=1:nokey=1','textdesk-output/raw.mp3'],{timeout:30000});
  const duration=Number(probe.stdout.trim());assert.ok(Number.isFinite(duration)&&duration>0.5&&duration<600);
  await exec('ffmpeg',['-v','error','-i','textdesk-output/raw.mp3','-f','null','-'],{timeout:60000,maxBuffer:8192}); // Decode-only validation.
  await put('.mp3','textdesk-output/raw.mp3','audio/mpeg');
  // Verify the uploaded object against the original bytes using the authenticated
  // object API, avoiding cached public 404s and preserving failed paid outputs.
  await exec('aws',['s3api','get-object','--bucket',process.env.R2_BUCKET,'--key',key+'.mp3',...aws,'textdesk-output/readback.mp3'],{timeout:60000,maxBuffer:8192});
  assert.equal(hash(await fs.readFile('textdesk-output/readback.mp3')),hash(bytes));
  const receipt={schemaVersion:1,status:'completed',requestId:p.requestId,payloadHash:p.payloadHash,cityId:p.cityId,role:p.role,
    visibleText:p.visibleText,ttsText:p.ttsText,voiceId:p.voiceId,model:p.model,stability:p.stability,postprocess:'none',
    url:`https://media.matkakirja.app/${key}.mp3`,receiptUrl:`https://media.matkakirja.app/${key}.json`,
    batchId:p.requestId,sourceCommit:process.env.GITHUB_SHA,runId:process.env.GITHUB_RUN_ID,recordedAt:new Date().toISOString(),duration,sha256:hash(bytes)};
  await fs.writeFile('textdesk-output/completed.json',JSON.stringify(receipt,null,2)+'\n');
  await put('.json','textdesk-output/completed.json','application/json');
  console.log(JSON.stringify({status:'completed',requestId:p.requestId,duration,receiptUrl:receipt.receiptUrl}));
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href)await generate(process.env.REQUEST_JSON,{dryRun:process.env.DRY_RUN==='true'});
