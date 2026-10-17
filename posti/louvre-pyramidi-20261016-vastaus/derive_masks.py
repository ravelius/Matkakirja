from pathlib import Path
import json,hashlib,datetime,sys,shutil
from PIL import Image,ImageDraw,ImageFilter
import numpy as np
P=Path(__file__).resolve().parent
O=Path('/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/louvre-pyramidi-20261017')
# All coordinates manually observed on the NEW native photographs and diagnostic grids.
# No source mask is read by derive(); no alignment, warping, target contour copy or metric optimization.
PALACE={
'K1':[[[0,783],[40,746],[77,708],[120,682],[176,621],[211,602],[237,581],[316,488],[335,446],[351,429],[378,433],[400,450],[503,416],[539,435],[563,410],[578,380],[601,378],[601,300],[621,275],[740,271],[753,262],[774,263],[786,274],[920,274],[936,303],[953,350],[977,379],[1082,378],[1107,398],[1130,423],[1157,466],[1185,504],[1205,535],[1230,575],[1270,599],[1328,650],[1336,676],[1381,709],[1418,741],[1437,764],[1473,807],[1505,842],[1535,873],[1535,1023],[1410,1023],[1243,697],[997,696],[908,433],[636,433],[533,692],[310,693],[42,1023],[0,1023]]],
'K2':[[[68,615],[66,552],[134,453],[177,427],[196,394],[210,355],[253,375],[493,377],[544,321],[618,316],[628,331],[902,325],[938,311],[1098,324],[1115,312],[1378,310],[1399,285],[1427,294],[1433,399],[946,402],[944,454],[540,454],[501,525],[597,539],[605,521],[740,549],[750,507],[774,487],[793,508],[806,546],[934,546],[945,523],[965,540],[990,633],[1101,640],[1398,655],[1417,641],[1535,660],[1535,778],[1006,746],[1006,719],[480,692],[478,618]]],
'K3':[
[[0,525],[113,485],[258,484],[281,500],[304,520],[540,524],[550,444],[563,412],[583,439],[730,444],[737,417],[751,395],[775,409],[794,441],[906,443],[932,409],[956,426],[973,459],[1010,439],[1029,461],[1048,526],[1075,540],[1084,630],[0,628]],
[[210,267],[212,195],[229,166],[249,177],[251,197],[597,217],[615,211],[640,216],[741,212],[751,190],[770,194],[780,212],[952,221],[971,250],[987,274],[993,334],[607,334],[594,280]],
[[982,278],[1032,267],[1040,250],[1064,260],[1225,264],[1245,237],[1263,239],[1276,267],[1311,285],[1364,322],[1365,345],[1426,413],[1447,423],[1469,474],[1456,523],[1051,522],[1006,442],[999,350]]],
'K4':[[[230,1023],[259,923],[279,883],[320,798],[350,742],[196,741],[197,665],[217,610],[268,574],[310,524],[351,477],[410,403],[450,379],[462,306],[498,258],[523,223],[551,223],[571,259],[572,319],[585,357],[617,382],[618,415],[599,454],[549,677],[720,683],[724,654],[747,622],[779,621],[803,655],[807,681],[942,679],[938,580],[908,527],[905,456],[913,399],[935,372],[978,385],[981,415],[1022,411],[1020,320],[1008,285],[1009,262],[1073,259],[1097,291],[1098,333],[1150,386],[1196,414],[1214,446],[1250,511],[1292,582],[1292,675],[1292,740],[1109,741],[1146,803],[1188,883],[1255,1023],[1100,1023],[1002,841],[500,842],[430,1023]]],
'K5':[[[0,365],[13,373],[15,385],[156,383],[174,397],[189,356],[218,321],[228,302],[240,321],[260,308],[278,314],[297,323],[329,325],[361,388],[383,418],[408,444],[424,400],[473,399],[493,454],[530,453],[538,418],[548,418],[555,440],[730,438],[739,412],[744,388],[779,383],[794,390],[805,439],[997,441],[1030,447],[1043,424],[1071,392],[1123,392],[1156,451],[1173,423],[1199,394],[1216,343],[1256,322],[1280,318],[1294,313],[1318,318],[1340,315],[1358,383],[1393,446],[1535,449],[1535,844],[1050,583],[1000,558],[540,558],[490,568],[0,844]]],
'K6':[
[[0,235],[90,214],[188,238],[188,213],[280,209],[312,125],[353,115],[375,116],[420,145],[419,131],[733,142],[760,109],[781,111],[815,123],[824,142],[1078,137],[1108,127],[1140,128],[1221,132],[1235,112],[1243,80],[1256,75],[1267,117],[1298,127],[1394,129],[1425,118],[1438,87],[1447,75],[1460,75],[1467,118],[1535,119],[1535,272],[1218,279],[1216,386],[195,386],[0,590]],
[[0,648],[30,657],[41,644],[76,645],[153,672],[184,700],[226,743],[682,748],[682,660],[698,624],[738,622],[750,590],[783,592],[809,588],[835,610],[876,628],[894,660],[905,744],[1314,747],[1361,682],[1407,672],[1444,674],[1452,647],[1482,653],[1535,671],[1535,1023],[0,1023]]],
'K7':[
[[338,0],[480,0],[790,82],[798,34],[810,34],[815,89],[1060,143],[1106,116],[1175,111],[1193,135],[1191,199],[1535,290],[1535,690],[1475,667],[1250,562],[1000,441],[770,339],[655,299],[649,216],[663,137],[695,124],[722,130],[751,181],[895,224],[918,197],[951,179],[984,176],[1007,195],[1033,215],[1074,229],[1090,218],[1090,181],[1065,160],[810,109],[340,43]],
[[0,377],[45,357],[85,366],[101,381],[117,376],[130,393],[141,449],[169,484],[209,507],[231,522],[251,534],[268,513],[304,499],[341,493],[358,510],[393,544],[407,570],[429,575],[448,602],[464,634],[469,688],[520,739],[603,795],[720,866],[744,887],[773,895],[810,929],[852,903],[888,911],[916,943],[930,971],[961,1000],[981,1023],[0,1023]],[[1535,980],[1535,1023],[1518,1023]]],
'L1':[[[0,403],[33,279],[200,268],[274,279],[382,323],[395,375],[405,375],[405,354],[425,354],[425,372],[524,362],[524,354],[544,354],[544,361],[640,350],[765,342],[881,363],[900,367],[918,299],[956,298],[971,203],[997,205],[1002,207],[1029,192],[1057,190],[1063,157],[1088,148],[1105,162],[1110,187],[1157,200],[1195,220],[1214,230],[1217,276],[1248,273],[1255,303],[1259,340],[1370,357],[1370,353],[1390,355],[1390,360],[1494,367],[1492,355],[1513,355],[1510,371],[1535,374],[1535,744],[0,744]]],
'L3':[[[0,0],[458,0],[463,37],[479,57],[480,118],[495,135],[499,119],[523,118],[524,139],[553,140],[553,128],[570,128],[574,147],[602,149],[610,141],[629,154],[632,118],[697,107],[744,109],[748,124],[775,114],[786,122],[787,176],[821,182],[846,178],[860,173],[860,157],[874,156],[879,175],[916,178],[930,194],[945,192],[945,184],[1165,194],[1175,180],[1175,150],[1190,139],[1198,101],[1216,103],[1228,93],[1259,89],[1264,85],[1270,101],[1301,102],[1324,144],[1325,189],[1390,182],[1409,181],[1409,161],[1420,162],[1420,181],[1473,178],[1474,159],[1484,159],[1484,178],[1535,177],[1535,368],[1240,369],[800,365],[500,399],[0,436]]]
}
HOLES={
'K1':[[[644,337],[897,337],[890,350],[637,350]]],
'K2':[[[250,455],[443,455],[424,524],[193,524]]],
'K3':[[[1070,338],[1262,336],[1318,421],[1103,421]]],
'K4':[[[405,536],[478,536],[452,614],[324,614]]],
'K6':[[[431,207],[731,207],[731,214],[426,214]]],
'K7':[[[797,161],[892,140],[892,194],[865,208],[831,203]]]
}
PYRAMIDS={
'K1':[[[769,474],[843,540],[855,598],[677,598],[689,543]],[[611,541],[589,566],[636,572]],[[920,538],[892,563],[944,570]],[[765,616],[738,644],[767,660],[795,646]]],
'K2':[[[865,445],[795,473],[797,527],[935,528],[927,478]],[[607,493],[585,509],[624,518]],[[871,526],[855,544],[887,550]]],
'K3':[[[742,334],[793,391],[801,432],[677,431],[678,388]],[[565,390],[539,409],[581,415]],[[897,390],[874,409],[920,415]]],
'K4':[[[770,379],[839,427],[848,491],[691,490],[701,428]],[[656,438],[635,461],[680,470]],[[875,439],[853,462],[896,471]],[[771,513],[741,542],[795,554]]],
'K5':[[[769,504],[920,685],[616,685]],[[462,627],[412,667],[504,673]],[[1072,626],[1027,666],[1116,672]],[[767,687],[699,746],[767,763],[826,744]]],
'K6':[[[789,439],[899,504],[916,625],[656,625],[673,507]],[[789,398],[753,423],[788,440],[821,426]],[[570,520],[532,551],[568,573],[615,553]],[[1006,524],[962,555],[1007,576],[1049,557]]],
'K7':[[[785,427],[953,573],[801,700],[590,588]],[[433,463],[401,483],[405,517],[475,508]],[[913,429],[879,453],[886,478],[949,475]],[[1046,649],[1008,657],[1014,708],[1092,706]]],
'L1':[[[776,420],[1172,840],[352,841]],[[110,699],[20,782],[196,784]],[[1424,699],[1332,782],[1515,785]],[[771,751],[966,938],[773,983],[557,944]]],
'L3':[[[1023,131],[1288,413],[1226,456],[692,432]],[[529,350],[473,405],[582,404]],[[1457,347],[1385,399],[1521,405]]]
}
BASINS={
'K1':[[[644,478],[737,497],[624,540]],[[800,496],[891,477],[908,533]],[[612,579],[731,624],[592,663]],[[802,626],[921,579],[938,663]]],
'K2':[[[632,494],[741,465],[743,495]],[[632,501],[740,501],[741,546]],[[935,464],[1047,494],[940,496]],[[938,502],[1048,502],[943,548]]],
'K3':[[[605,350],[698,357],[601,399]],[[784,358],[865,351],[873,399]],[[599,406],[677,427],[664,437]],[[805,428],[879,407],[881,438]]],
'K4':[[[656,425],[726,396],[694,440]],[[812,398],[878,425],[841,441]],[[648,479],[744,524],[637,532]],[[793,525],[888,480],[898,532]]],
'K5':[[[498,628],[676,592],[615,650]],[[849,592],[1042,626],[919,651]],[[383,701],[535,661],[698,733]],[[835,733],[993,663],[1160,707]]],
'K6':[[[511,439],[736,441],[641,520]],[[851,442],[1087,443],[947,519]],[[374,697],[618,576],[672,701]],[[953,577],[1196,701],[913,700]]],
'K7':[[[476,516],[763,407],[748,473]],[[476,526],[654,513],[568,584]],[[579,611],[777,713],[559,716]],[[835,715],[969,654],[1002,733]],[[933,482],[1237,633],[997,634]]],
'L1':[[[0,777],[352,769],[352,842],[287,849],[0,800]],[[1176,770],[1535,775],[1535,808],[1259,852],[1173,840]],[[0,810],[349,846],[668,846],[558,924]],[[894,844],[1177,845],[1535,811],[976,926]]],
'L3':[[[282,419],[592,406],[713,461]],[[595,395],[772,380],[735,403]],[[1277,405],[1535,406],[1535,461],[1226,479]],[[1264,487],[1535,469],[1535,526]]]
}
STATUE_L3=[[982,218],[995,237],[993,252],[1008,263],[1002,294],[1020,314],[1017,342],[1028,372],[1015,399],[1020,438],[987,440],[985,416],[965,403],[963,371],[944,360],[935,331],[947,301],[961,286],[952,268],[965,256],[965,241]]
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def write(p,obj):p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(obj,ensure_ascii=False,indent=2)+'\n')
def raster(polys):
 im=Image.new('L',(1536,1024),0);d=ImageDraw.Draw(im)
 for poly in polys:d.polygon([tuple(x) for x in poly],fill=255)
 return np.array(im)>=128
def derive():
 md=P/'masks';md.mkdir(exist_ok=True);assert not (md/'MASK-FREEZE.json').exists()
 records={}
 for c in PALACE:
  src=P/'images'/f'louvre-{c}.png';im=Image.open(src).convert('RGB');assert im.size==(1536,1024)
  palace=raster(PALACE[c])&~raster(HOLES.get(c,[]));glass=raster(PYRAMIDS[c]);basins=raster(BASINS[c]);area=glass|basins
  total=palace|glass
  if c=='L3':
   statue=raster([STATUE_L3]);area&=~statue;total&=~statue;glass&=~statue
  # Visible foreground palace roofs occlude pyramid/basin area in K2/K3/K6. Exclude native traced palace in area mask.
  if c in ['K2','K3','K6']:
   fg=palace & (np.arange(1024)[:,None]>={'K2':490,'K3':398,'K6':590}[c]);area&=~fg;glass&=~fg
  for suffix,a in [('maski',total),('pyramidi-maski',area),('palace-only-DIAGNOSTIC',palace),('glass-only-DIAGNOSTIC',glass)]:Image.fromarray(a.astype('uint8')*255).save(md/f'louvre-{c}-{suffix}.png')
  overlay=np.array(im).copy();overlay[total]=(overlay[total]*.72+np.array([240,50,40])*.28).astype('uint8');overlay[area]=(overlay[area]*.60+np.array([0,255,255])*.40).astype('uint8');Image.fromarray(overlay).save(P/'qa'/f'{c}-native-derived-mask-overlay.jpg',quality=95)
  records[c]={'nativeSHA256':sha(src),'nativeDimensions':[1536,1024],'method':'manual native-pixel polygon tracing on new generated photograph and its 100px grid, solid architectural silhouette with courtyard holes; visible glass+basin footprints traced separately','palacePolygons':PALACE[c],'courtyardHoles':HOLES.get(c,[]),'glassPolygons':PYRAMIDS[c],'basinPolygons':BASINS[c],'foregroundStatueExcluded':STATUE_L3 if c=='L3' else [],'inputMasksReadByDerivation':False,'inputMasksSeenPreviouslyAsGenerationReferences':True,'copyInputMask':False,'alignOrWarp':False,'thresholdTuning':False,'approximation':True,'typicalBoundaryUncertaintyPixels':{'palace':20,'pyramidArea':8},'strictBoundaryErrorBoundAvailable':False,'limitations':'Coarse tracing: typical palace20px / pyramid-area8px; no strict bound; tiny chimneys, dormers, arches and cornice sculpture not pixel-exact; no claim of automatic/precise segmentation or metric acceptance. Foreground overlap traced from visible native image.'}
 write(md/'MASK-DERIVATION.json',records)
 print('Nine pairs derived; inspect overlays then freeze BEFORE any target IoU comparison')
def freeze():
 md=P/'masks';assert not (md/'MASK-FREEZE.json').exists()
 paths=[x for x in md.glob('*.png') if not x.name.startswith('._')];write(md/'MASK-FREEZE.json',{'frozenAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'basis':'new native photos only, manually traced; target masks not used by derivation; no target IoU computed before freeze','files':{x.name:sha(x) for x in paths}});print('frozen')
def compare():
 md=P/'masks';f=json.loads((md/'MASK-FREEZE.json').read_text());assert all(sha(md/n)==h for n,h in f['files'].items());out=[]
 for c in PALACE:
  metrics={}
  for suffix,targetname,threshold in [('maski',f'louvre-{c}-maski-k59.png',.95),('pyramidi-maski',f'louvre-{c}-pyramidi-maski.png',.80 if c in ['K2','K3'] else .90)]:
   ownp=md/f'louvre-{c}-{suffix}.png';targetp=P/'inputs/louvre-pyramidi-20261016'/targetname;own=np.array(Image.open(ownp).convert('L'))>=128;target=np.array(Image.open(targetp).convert('L'))>=128;assert own.shape==target.shape==(1024,1536)
   inter=int((own&target).sum());union=int((own|target).sum());iou=inter/union if union else None
   er=np.array(Image.open(ownp).filter(ImageFilter.MinFilter(17)))>=128;di=np.array(Image.open(ownp).filter(ImageFilter.MaxFilter(17)))>=128;low=float((er&target).sum()/(di|target).sum());high=min(1.,float((di&target).sum()/max(1,(er|target).sum())))
   diff=np.zeros((1024,1536,3),dtype='uint8');diff[own&target]=[230,230,230];diff[target&~own]=[0,160,255];diff[own&~target]=[255,70,40];Image.fromarray(diff).save(P/'qa'/f'{c}-{suffix}-difference.png')
   metrics[suffix]={'ownMaskSHA256':sha(ownp),'targetSHA256':sha(targetp),'targetBlobSourceSnapshot':'23488c7f37e155e4216a67de12e78d36967da1cd','ownPixels':int(own.sum()),'targetPixels':int(target.sum()),'intersectionPixels':inter,'unionPixels':union,'iou':iou,'requiredIoU':threshold,'nominalThresholdReached':iou>=threshold,'morphologicalSensitivityPixels':8,'morphologicalSensitivityRange':[low,high],'strictBoundaryErrorBoundAvailable':False,'reliableThresholdAcceptance':False,'reason':'coarse native tracing, exact/robust acceptance not claimed'}
  oldpath=Path(json.loads((P/'prompts'/f'{c}-arguments.json').read_text())['referenced_image_paths'][0]);old=np.array(Image.open(oldpath).convert('RGB')).astype(int);new=np.array(Image.open(P/'images'/f'louvre-{c}.png').convert('RGB')).astype(int);palace=np.array(Image.open(md/f'louvre-{c}-palace-only-DIAGNOSTIC.png'))>=128;area=np.array(Image.open(md/f'louvre-{c}-pyramidi-maski.png'))>=128;scope=palace&~area;d=np.abs(old-new);changed=np.any(d>0,axis=2);gt10=np.max(d,axis=2)>10
  preservation={'scope':'new-photo traced palace pixels outside new pyramid/basin area, direct same-coordinate RGB comparison to approved reference photo','scopePixels':int(scope.sum()),'anyChannelChangedPixels':int((changed&scope).sum()),'maxChannelDifferenceOver10Pixels':int((gt10&scope).sum()),'meanAbsoluteChannelDifference':float(d[scope].mean()),'palacePixelInvarianceMet':not bool((changed&scope).any()),'notAlignmentCorrected':True,'limitation':'new trace only, not correspondence/occlusion proof; full new generation changes texture and potentially geometry'}
  out.append({'view':c,'nativeSHA256':sha(P/'images'/f'louvre-{c}.png'),'measurements':metrics,'palacePixelPreservation':preservation,'overallAccepted':False})
 write(P/'qa/IoU-report.json',{'method':'direct native1536x1024, no warp/align/crop, masks frozen before target comparison','coarseMasks':True,'typicalBoundaryUncertaintyPixels':{'palace':20,'pyramidArea':8},'strictUncertaintyBoundAvailable':False,'generationCalls':9,'results':out});print(json.dumps([{'view':x['view'],'buildingIoU':x['measurements']['maski']['iou'],'pyramidAreaIoU':x['measurements']['pyramidi-maski']['iou'],'palacePixelInvariant':x['palacePixelPreservation']['palacePixelInvarianceMet']} for x in out],indent=2))
if __name__=='__main__':{'derive':derive,'freeze':freeze,'compare':compare}[sys.argv[1]]()
