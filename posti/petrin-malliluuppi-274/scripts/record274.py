from pathlib import Path
from datetime import datetime,timezone
import sys,json,fcntl,os,tempfile,hashlib,copy
P=Path('/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/kuvatuotanto/petrin-tavoitehavainnekuvat-20261014')
W=Path('/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2')
O=W/'output/petrin-tavoitehavainnekuvat-20261014';C=P/'models/continuation-274';R=sys.argv[1];mode=sys.argv[2];N=int(R[1:]);now=datetime.now(timezone.utc).isoformat()
assert 11<=N<=15
def read(p):return json.loads(p.read_text())
def atom(p,d):
 p.parent.mkdir(parents=True,exist_ok=True);fd,t=tempfile.mkstemp(prefix='.petrin-',dir=p.parent)
 with os.fdopen(fd,'w') as f:json.dump(d,f,ensure_ascii=False,indent=2);f.write('\n');f.flush();os.fsync(f.fileno())
 os.replace(t,p)
changes={'currentModelRound':R,'modelRoundsIssued':N,'maximumTotalModelRounds':15,'productionActive':True,'modelLoopAuthorized':True,'requiredWorkComplete':False,'updatedAt':now}
if mode=='completed':
 root=P/'models'/R;m=read(root/'qa/metrics.json');audit=read(root/'saved-model-audit.json');assert audit['savedBlendReadbackPassed']
 for row in m['perView']:
  for f,k in [(f"inputs/cameras/{row['view']}.json",'cameraSHA256'),(f"renders/{row['view']}-model.png",'modelImageSHA256'),(f"inputs/targets/{row['view']}-mask.png",'targetMaskSHA256')]:assert hashlib.sha256((root/f).read_bytes()).hexdigest()==row[k]
 reviews=json.loads(sys.argv[3]) if len(sys.argv)>3 else []
 record={'round':R,'completedAt':now,'configuration':read(root/'configuration.json'),'actualModelSHA256':hashlib.sha256((root/f'petrin-{R}.blend').read_bytes()).hexdigest(),'metrics':m,'savedModelAudit':audit,'producerPersonallyViewedComparisonSheet':True,'producerVisibleDifferences':reviews,'independentReviewPath':str(root/'qa/independent-review.json') if (root/'qa/independent-review.json').exists() else None,'cameraChangesAgainstM01':{},'modelFinalAcceptanceVerified':False}
 for v in ['K1','K2','K3','K4','K5']:
  original=read(P/f'models/M01/inputs/cameras/{v}.json');current=read(root/f'inputs/cameras/{v}.json')
  record['cameraChangesAgainstM01'][v]={k:{'original':original[k],'current':current[k]} for k in ['cameraAzimuthDegrees','distanceM','heightM','pitchDegrees','verticalFOVDegrees','principalPointNativePx'] if original[k]!=current[k]}
 atom(root/'round-log.json',record)
 journal=read(C/'loop-journal.json') if (C/'loop-journal.json').exists() else {'sourceTask':274,'maximumAdditionalRounds':5,'maximumTotalRounds':15,'parentRound':'M09','priorRoundsCompleted':10,'baseline':{'round':'M09','metrics':read(P/'models/M09/qa/metrics.json'),'PTAcceptedAsBasisOnly':True},'rounds':[]}
 assert not any(x['round']==R for x in journal['rounds']),'Completed round already recorded'
 journal['rounds'].append(record)
 best=max([journal['baseline']]+journal['rounds'],key=lambda x:(min(r['silhouetteIoUPercent']/r['requiredIoUPercent'] for r in x['metrics']['perView']),x['metrics']['meanIoUPercent']))
 journal.update(bestRound=best['round'],bestSelectionCriterion='Maximize worst threshold-normalized native rendered IoU; mean IoU breaks ties',completedTotalRounds=N,updatedAt=now)
 atom(C/'loop-journal.json',journal);atom(O/'models/continuation-274/loop-journal.json',journal)
 changes.update(modelRoundsCompleted=N,modelAdditionalRoundsCompleted=N-10,modelRoundsRemainingAuthorized=15-N,modelCurrentRoundMetricsPath=str(root/'qa/metrics.json'),modelBestRound=best['round'],modelCurrentIoUPercent={r['view']:r['silhouetteIoUPercent'] for r in m['perView']},allIoUThresholdsPassed=m['allIoUThresholdsPassed'])
elif mode!='issued':raise ValueError(mode)
with (P/'.generation-budget.lock').open('a+') as lock:
 fcntl.flock(lock,fcntl.LOCK_EX);d=read(P/'production-state.json');assert d['generationCallsIssued']==7;d.update(changes);atom(P/'production-state.json',d);atom(O/'production-state.json',d)
with (W/'output/fable-mailbox-work-orders/.monitor-transaction.lock').open('a+') as lock:
 fcntl.flock(lock,fcntl.LOCK_EX)
 for file in ['output/fable-mailbox-work-orders/ledger.json','output/kuvatuotanto-jatko-20261007.json']:
  p=W/file;d=read(p);d['petrinTargetIllustrationTasks252to254'].update(changes)
  if 'tasks' in d:
   for t in d['tasks']:
    if isinstance(t,dict) and t.get('taskNumber')==274:t.update({'currentRound':R,'modelRoundsIssued':N,'modelRoundsCompleted':N if mode=='completed' else N-1,'productionActive':True,'status':'model-loop-active-no-final-delivery-yet','latestProgressAt':now})
  d['updatedAt']=now;atom(p,d)
print(json.dumps({'round':R,'mode':mode,'completedRounds':changes.get('modelRoundsCompleted'),'bestRound':changes.get('modelBestRound')}))
