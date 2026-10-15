from pathlib import Path
from datetime import datetime,timezone
import json,subprocess,hashlib,os,tempfile,fcntl,copy,shutil
ROOT=Path('/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2')
P=Path('/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/kuvatuotanto/petrin-tavoitehavainnekuvat-20261014')
O=ROOT/'output/petrin-tavoitehavainnekuvat-20261014';WT=ROOT/'output/worktrees/petrin-tavoitehavainnekuvat-20261014';C=P/'models/continuation-274'
REF='refs/remotes/codex-petrin/claude-postilaatikko';now=datetime.now(timezone.utc).isoformat()
def read(p):return json.loads(p.read_text())
def git(*args):return subprocess.check_output(['git','-C',str(WT),*args])
def atom(p,d):
 p.parent.mkdir(parents=True,exist_ok=True);fd,t=tempfile.mkstemp(prefix='.petrin-',dir=p.parent)
 with os.fdopen(fd,'w') as f:json.dump(d,f,ensure_ascii=False,indent=2);f.write('\n');f.flush();os.fsync(f.fileno())
 os.replace(t,p)
def remotecheck(n,v):
 b=git('show',REF+':'+n);assert len(b)==v['bytes'] and hashlib.sha256(b).hexdigest()==v['sha256'],n
staged=read(C/'staging-files.json');commit=git('rev-parse','HEAD').decode().strip();subprocess.run(['git','-C',str(WT),'merge-base','--is-ancestor',commit,REF],check=True)
for n,v in staged['files'].items():remotecheck(n,v)
protected={}
for a in ['K1/review-v1','K1/v2','K1/v3','K2/v1','K3/v1','K4/v1','K5/v1','models/M01','models/continuation-273']:
 for n,v in read(P/a/'handoff-receipt.json')['files'].items():remotecheck(n,v);protected[n]=v
assert len(protected)==336
sources={'posti/petrin-codex-tilaus.md':'9432d692cf55990413625adfb099e7d2c6a8a820','posti/petrin-faktat.md':'2bc92eedd1ae31f5bda7f9a72d0234ad705d119a','posti/petrin-LISAYS-maskit.md':'e1ff52aa5a15fe969cc0c2f4be4a529142a7e587','posti/fable-codex-petrin-K5-hyvaksytty-20261015.md':'b074b1943dceb2d1faefff44a4f3d64be00cd78f','posti/fable-codex-petrin-K5-maskikorjaus-20261015.md':'a5a8769b17a6d7071ed66bc5107eaacffe955fcb','posti/fable-codex-petrin-M01-palaute-20261015.md':'d7a51d3d4e1f39cec063e530e9ce1eb445601a24','posti/fable-codex-petrin-M09-palaute-20261015.md':'b93049955540c0e6bf5ff853eb66d58b54be9840'}
for n,b in sources.items():assert git('rev-parse',REF+':'+n).decode().strip()==b,n
assert not git('status','--porcelain').strip()
m=read(P/'models/M15/qa/metrics.json');ious={r['view']:r['silhouetteIoUPercent'] for r in m['perView']}
receipt={'taskNumber':274,'commit':commit,'mailboxBranch':'claude/postilaatikko','deliveryVerifiedAt':now,'commitReachableFromRemote':True,'remoteAllPayloadBytesVerified':True,'files':staged['files'],'oldAttachmentsVerifiedUnchanged':len(protected),'sourceBlobsVerified':sources,'worktreeClean':True,'completedTotalRounds':15,'additionalModelRounds':5,'bestRound':'M15','latestRound':'M15','bestAndLatestAreSameArtifact':True,'bestIoUPercent':ious,'latestIoUPercent':ious,'allIoUThresholdsPassed':False,'passedViews':['K1','K2','K3','K4'],'failedViews':['K5'],'modelFinalAcceptanceVerified':False,'M09PTAcceptedAsBasisOnly':True,'K5MaskV2PTAccepted':True,'newAIImageGenerations':0,'furtherModelRoundAuthorized':False,'stopReason':'Five additional rounds M11-M15 completed, best/latest M15 delivered for PT feedback; M16 not authorized','R2Used':False,'gameIntegrated':False,'mainMerged':False,'published':False,'bestModelPath':str(P/'models/M15/petrin-M15.blend'),'latestModelPath':str(P/'models/M15/petrin-M15.blend'),'previousTask273ReceiptPath':str(P/'models/continuation-273/handoff-receipt.json')}
for f in [C/'handoff-receipt.json',O/'models/continuation-274/handoff-receipt.json']:atom(f,receipt)
change={
 'status':'task274-five-additional-rounds-delivered-awaiting-PT-feedback','productionActive':False,'modelGeometryProductionActive':False,
 'modelLoopAuthorized':False,'furtherModelRoundAuthorized':False,'requiredWorkComplete':False,'thisModelLoopAuthorizedScopeComplete':True,
 'modelRoundsIssued':15,'modelRoundsCompleted':15,'maximumTotalModelRounds':15,'maximumModelRoundsThisStep':5,'modelAdditionalRoundsAuthorized':5,'modelAdditionalRoundsCompleted':5,
 'modelRoundsRemainingAuthorized':0,'modelRoundCapReached':True,'modelRoundReviewDelivered':True,'modelReviewPending':True,
 'modelCurrentContinuationTask':274,'currentModelRound':'M15','modelBestRound':'M15','modelLatestRound':'M15',
 'modelReviewCommit':commit,'modelReviewReceiptPath':str(C/'handoff-receipt.json'),'modelReviewDeliveredAt':now,
 'modelPreviousLoopReceiptPath':str(P/'models/continuation-273/handoff-receipt.json'),
 'modelBestPath':receipt['bestModelPath'],'modelLatestPath':receipt['latestModelPath'],'modelRoundRoot':str(P/'models/M15'),
 'modelRoundIoUPercent':ious,'modelBestRoundIoUPercent':ious,'modelLatestRoundIoUPercent':ious,'modelCurrentIoUPercent':ious,
 'modelCurrentRoundMetricsPath':str(P/'models/M15/qa/metrics.json'),'modelRoundMetricsPath':str(P/'models/M15/qa/metrics.json'),
 'modelRoundComparisonSheetPath':str(P/'models/M15/qa/petrin-M15-comparison-sheet.png'),
 'modelRoundSavedBlendAuditPath':str(P/'models/M15/saved-model-audit.json'),'modelRoundIndependentReviewPath':str(C/'final-independent-review.json'),
 'modelRoundLogPath':str(C/'loop-journal-as-delivered.json'),'modelRoundNewAIImageGenerations':0,
 'modelFinalAcceptanceVerified':False,'allIoUThresholdsPassed':False,'bindingMaterialDeltaE':None,'bindingMaterialColorPassVerified':False,
 'K5MaskPTAccepted':True,'K5MaskReviewPending':False,'K5MaskCorrectionPTPending':False,'K5MaskPTAcceptancePath':str(P/'K5/mask-v2/PT-acceptance-272.json'),
 'allFivePTAcceptanceVerified':True,'allFivePTImageAcceptanceVerified':True,'acceptedTargetImages':5,'acceptedIoUMasks':5,
 'modelM09AcceptedAsBasisOnly':True,'modelStopReason':receipt['stopReason'],'stopReason':receipt['stopReason'],
 'gameIntegrated':False,'R2Used':False,'mainMerged':False,'published':False,'updatedAt':now,
}
def gate(e):
 g=e.setdefault('feedbackGate',{});g.update(state='task274-five-additional-round-cap-and-verified-delivery-await-PT-feedback',modelLoopAuthorized=False,modelRoundMayStart=False,generationMayStart=False,nextStepRequiresModelFeedback=True,K5CorrectedMaskPTConfirmationPending=False,completedTotalModelRounds=15,maximumTotalModelRounds=15,maximumModelRoundsThisStep=5,modelRoundsCompleted=15,additionalModelRoundsCompleted=5,furtherModelRoundAuthorized=False,deliveryCommit=commit,stoppedAt=now)
with (P/'.generation-budget.lock').open('a+') as lock:
 fcntl.flock(lock,fcntl.LOCK_EX);d=read(P/'production-state.json');assert d['generationCallsIssued']==d['generationCallsCompleted']==7;d.update(change);gate(d)
 for row in d.get('cameraRows',[]):
  r=next(x for x in m['perView'] if x['view']==row['id']);row.update(modelRound='M15',modelLatestRound='M15',modelSilhouetteIoU=r['silhouetteIoU'],modelSilhouetteIoUThresholdPassed=r['IoUThresholdPassed'],modelReviewDeliveryCommit=commit,fullModelSilhouetteFitVerified=False,modelFinalAcceptanceVerified=False)
 atom(P/'production-state.json',d);atom(O/'production-state.json',d)
 inv=read(P/'current-five-view-inventory.json');inv.update(allFivePTAccepted=True,PTAcceptedMasks=5,modelLoopAuthorized=False,K5CorrectedMaskFeedbackPending=False,modelReviewFeedbackPending=True,modelRoundsCompleted=15,modelReviewCommit=commit,modelBestRound='M15',modelLatestRound='M15',updatedAt=now)
 for row in inv['views']:
  r=next(x for x in m['perView'] if x['view']==row['view']);row.update(modelRound='M15',modelLatestRound='M15',modelSilhouetteIoU=r['silhouetteIoU'],modelIoUThresholdPassed=r['IoUThresholdPassed'],modelDeliveryCommit=commit,modelFinalAcceptanceVerified=False)
 atom(P/'current-five-view-inventory.json',inv);atom(O/'current-five-view-inventory.json',inv)
with (ROOT/'output/fable-mailbox-work-orders/.monitor-transaction.lock').open('a+') as lock:
 fcntl.flock(lock,fcntl.LOCK_EX)
 for f in [ROOT/'output/fable-mailbox-work-orders/ledger.json',ROOT/'output/kuvatuotanto-jatko-20261007.json']:
  d=read(f);before=copy.deepcopy(d);e=d['petrinTargetIllustrationTasks252to254'];assert e['generationCallsIssued']==7;e.update(change);gate(e)
  for t in d.get('tasks',[]):
   if t.get('taskNumber')==274:
    assert t.get('processingStarted') is True
    t.update(status='five-additional-round-cap-reached-best-latest-M15-delivered-awaiting-PT-feedback',productionActive=False,delivered=True,deliveredAt=now,deliveryVerifiedAt=now,deliveryCommit=commit,deliveryReceiptPath=str(C/'handoff-receipt.json'),deliveryBytesVerified=True,modelFinalAcceptanceVerified=False,modelRoundsCompleted=15,additionalModelRoundsCompleted=5,maximumTotalModelRounds=15,modelRoundsRemainingAuthorized=0,furtherModelRoundAuthorized=False,targetLimitsMet=False,requiredWorkComplete=False,thisAuthorizedScopeComplete=True,bestRound='M15',latestRound='M15',latestMonitorEvidenceAt=now,latestMonitorEvidence='Verified exact mailbox bytes for five additional rounds M11-M15; best/latest M15, K1-K4 pass, K5 86.823/90; final fresh review delivered; stopped for PT feedback, no M16.',completionScope='All five authorized continuation rounds and capped handoff complete; overall model final acceptance remains open')
  for k,v in before.items():
   if k not in ['petrinTargetIllustrationTasks252to254','tasks','updatedAt']:assert d[k]==v,'Unrelated top-level field changed: '+k
  if 'tasks' in before:
   assert len(d['tasks'])==len(before['tasks'])
   for old,new in zip(before['tasks'],d['tasks']):
    if old.get('taskNumber')!=274:assert old==new,'Unrelated task changed'
  d['updatedAt']=now;atom(f,d)
for root in [C,O/'models/continuation-274']:
 src=root/'loop-journal.json';snap=root/'loop-journal-as-delivered.json'
 if not snap.exists():shutil.copy2(src,snap)
 live=read(src);live.update(deliveryPending=False,deliveryCommit=commit,deliveryReceiptPath=str(C/'handoff-receipt.json'),productionActive=False,modelLoopAuthorized=False,modelFinalAcceptanceVerified=False,updatedAt=now);atom(src,live)
check={'taskNumber':274,'reconciledAt':now,'deliveryCommit':commit,'verifiedNewMailboxFiles':len(staged['files']),'previousMailboxFilesPreserved':len(protected),'modelRoundsCompleted':15,'additionalModelRoundsCompleted':5,'newAIImageGenerations':0,'AIImageCallsRemain':7,'bestRound':'M15','latestRound':'M15','modelFinalAcceptanceVerified':False,'passedViews':['K1','K2','K3','K4'],'K5IoUPercent':ious['K5'],'productionActive':False,'furtherModelRoundAuthorized':False,'waitingForPTFeedback':True,'thisAuthorizedScopeComplete':True,'R2Used':False,'gameIntegrated':False,'mainMerged':False,'published':False}
for f in [P/'production-state.json',O/'production-state.json',ROOT/'output/fable-mailbox-work-orders/ledger.json',ROOT/'output/kuvatuotanto-jatko-20261007.json']:
 d=read(f);e=d if f.name=='production-state.json' else d['petrinTargetIllustrationTasks252to254'];assert e['modelRoundsCompleted']==15 and not e['productionActive'] and not e['modelLoopAuthorized'] and not e['furtherModelRoundAuthorized'];assert e['modelReviewCommit']==commit and e['modelRoundRoot'].endswith('/M15')
for f in [C/'completion-checkpoint.json',O/'models/continuation-274/completion-checkpoint.json']:atom(f,check)
print(json.dumps(check,ensure_ascii=False))
