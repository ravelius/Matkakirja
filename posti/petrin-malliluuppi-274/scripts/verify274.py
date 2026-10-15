from pathlib import Path
from datetime import datetime,timezone
import json,hashlib
import numpy as np
from PIL import Image,ImageDraw
P=Path('/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/kuvatuotanto/petrin-tavoitehavainnekuvat-20261014');C=P/'models/continuation-274'
def read(p):return json.loads(p.read_text())
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
rows=[];audits=[]
for N in range(11,16):
 R=f'M{N:02}';root=P/'models'/R;m=read(root/'qa/metrics.json');log=read(root/'round-log.json');audit=read(root/'saved-model-audit.json')
 assert audit['savedBlendReadbackPassed'] and audit['actualGroundShoeConnectedComponents']==8 and not audit['targetImageTextureNodes']
 assert sha(root/f'petrin-{R}.blend')==log['actualModelSHA256']
 assert max(x['absoluteErrorM'] for x in audit['actualBindingHeightMeasurements'].values())<.0001
 assert 66.5<=read(root/'configuration.json')['mast_top']<=71
 audits.append({'round':R,'savedModelSHA256':log['actualModelSHA256'],'savedModelAuditSHA256':sha(root/'saved-model-audit.json'),'auditPassed':True,'bindingHeightReadback':audit['actualBindingHeightMeasurements']})
 for v in ['K1','K2','K3','K4','K5']:
  item=next(x for x in m['perView'] if x['view']==v)
  for f,k in [(f'inputs/targets/{v}.png','targetImageSHA256'),(f'inputs/targets/{v}-mask.png','targetMaskSHA256'),(f'inputs/cameras/{v}.json','cameraSHA256'),(f'renders/{v}-model.png','modelImageSHA256'),(f'renders/{v}-geometry-alpha.png','rawGeometryAlphaSHA256'),(f'qa/{v}-model-filled-mask.png','modelFilledMaskSHA256')]:assert sha(root/f)==item[k]
  for f in [f'{v}.png',f'{v}-mask.png']:assert sha(root/'inputs/targets'/f)==sha(P/'models/M09/inputs/targets'/f)
  target=np.asarray(Image.open(root/f'inputs/targets/{v}-mask.png'))>0;model=np.asarray(Image.open(root/f'qa/{v}-model-filled-mask.png'))>0
  raw=np.asarray(Image.open(root/f'renders/{v}-geometry-alpha.png').getchannel('A'))>=128
  assert not raw[0].any() and not raw[-1].any() and not raw[:,0].any() and not raw[:,-1].any()
  filled=Image.fromarray(raw.astype('uint8')*255).copy();ImageDraw.floodfill(filled,(0,0),128);independentfilled=np.asarray(filled)!=128
  assert np.array_equal(independentfilled,model),(R,v,'independent Pillow outside fill mismatch')
  inter=int((target&model).sum());union=int((target|model).sum());iou=inter/union
  assert inter==item['intersectionPixels'] and union==item['unionPixels'] and abs(iou-item['silhouetteIoU'])<1e-12
  assert (iou>=(.85 if v=='K1' else .9))==item['IoUThresholdPassed']
  rows.append({'round':R,'view':v,'nativeDimensions':item['nativeDimensions'],'intersectionPixels':inter,'unionPixels':union,'recomputedIoUPercent':100*iou,'thresholdPercent':item['requiredIoUPercent'],'passed':item['IoUThresholdPassed'],'rawAlphaMaskIndependentlyFloodFilledWithPillow':True,'immutableTargetAndCameraAndRenderHashesVerified':True})
j=read(C/'loop-journal.json');assert len(j['rounds'])==5 and j['completedTotalRounds']==15
best=max([j['baseline']]+j['rounds'],key=lambda x:(min(r['silhouetteIoUPercent']/r['requiredIoUPercent'] for r in x['metrics']['perView']),x['metrics']['meanIoUPercent']))['round'];assert best==j['bestRound']=='M15'
v=read(C/'M15-software-projection-validation.json');native=[x for x in v['rows'] if x['scale']==1.0]
report={'taskNumber':274,'verifiedAt':datetime.now(timezone.utc).isoformat(),'verificationActor':'producer independent-algorithm numeric readback, not the separate visual reviewer','verifiedNativeViews':25,'roundsVerified':['M11','M12','M13','M14','M15'],'oldTenRoundsRemainInTask273VerifiedHistory':True,'completedTotalModelRounds':15,'authorizedNewRounds':5,'additionalRoundsCompleted':5,'allTargetImagesAndMasksUnchanged':True,'eightFootComponentsEverySavedModel':True,'savedModelBindingHeightsAudited':True,'bindingHeightsM':[58.7,20,51],'bestRound':best,'latestRound':'M15','allIoUThresholdsPassed':False,'fourViewsPassLatest':True,'bindingMaterialDeltaE':None,'materialColorThresholdPassClaimed':False,'newAIImageGenerations':0,'finalNativeSoftwareMaxDifferencePercentagePoints':max(x['absoluteDifferencePercentagePoints'] for x in native),'softwareMetricIsNotBinding':True,'rows':rows,'savedModels':audits,'furtherModelRoundsAuthorized':False}
(C/'final-numerical-verification.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'nativeViewsVerified':25,'bestRound':best,'fourOfFivePass':True,'allFivePass':False,'savedModelHeightAudits':5}))
