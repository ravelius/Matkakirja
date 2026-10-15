#!/usr/bin/env python3
"""Manual blind palace segmentation from the actual K7/v1 photograph."""
from pathlib import Path
from PIL import Image,ImageDraw
import hashlib,json
PHOTO=Path('/Users/samireivinen/.codex/generated_images/01a06e21-9b03-73e1-8856-44c9ffffb635/exec-885158c2-d73a-4ad5-9159-690b56c90680.png')
OUT=Path('/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/kuvatuotanto/louvre-tavoitehavainnekuvat-20261015/K7/v1')
FAR_PALACE=[
(339,0),(603,0),(614,8),(631,9),(641,15),(662,20),
(683,26),(706,32),(729,38),(752,44),(775,51),(785,54),
(785,37),(789,32),(796,35),(797,65),(808,69),
(816,70),(819,81),(826,86),(831,89),(833,81),
(838,84),(842,94),(848,97),(854,89),(859,91),
(863,102),(871,104),(876,99),(882,102),(884,112),
(891,115),(894,109),(899,110),(901,119),
(914,124),(919,114),(923,117),(926,127),(939,131),
(944,121),(949,121),(952,135),(966,137),
(976,130),(982,133),(982,146),(995,151),
(1000,143),(1006,145),(1007,155),(1023,160),
(1033,153),(1037,156),(1035,166),(1054,172),
(1076,177),(1081,171),(1088,149),(1096,125),
(1107,116),(1117,112),(1140,118),(1147,115),
(1153,103),(1158,101),(1164,116),(1178,120),
(1181,141),(1185,160),(1189,181),(1200,185),
(1204,198),(1216,201),(1223,196),(1230,201),
(1230,207),(1251,213),(1261,214),(1266,207),
(1274,210),(1275,220),(1295,227),(1314,233),
(1321,227),(1328,230),(1327,239),(1340,244),
(1348,236),(1356,239),(1355,249),(1374,256),
(1394,262),(1404,255),(1413,260),(1411,270),
(1432,277),(1451,283),(1464,274),(1473,279),
(1472,289),(1492,297),(1502,301),(1505,285),
(1514,277),(1522,283),(1520,300),(1535,305),
(1535,696),(1513,686),(1490,676),(1467,665),
(1444,655),(1421,645),(1398,634),(1375,624),
(1352,614),(1329,603),(1306,593),(1283,583),
(1260,572),(1237,562),(1214,552),(1191,541),
(1168,531),(1145,521),(1122,510),(1099,500),
(1076,490),(1053,479),(1030,469),(1007,459),
(984,448),(961,438),(938,428),(915,417),
(892,407),(869,397),(846,386),(823,376),
(800,366),(777,355),(754,345),(731,335),
(708,324),(685,314),(662,303),(654,298),
(652,276),(651,253),(651,230),(650,209),
(654,194),(660,181),(641,173),(619,164),
(597,155),(575,146),(553,137),(531,128),
(509,119),(487,110),(465,101),(443,92),
(421,83),(399,74),(377,65),(355,56),(340,50)
]
NEAR_PALACE=[
(0,379),(10,368),(29,361),(49,356),(58,358),(69,368),
(79,375),(91,391),(109,403),(111,389),(110,381),(114,373),
(118,375),(120,384),(126,389),(132,395),(138,409),(141,430),(149,437),
(155,430),(161,433),(168,445),(175,457),(184,467),
(193,479),(203,488),(210,500),(220,500),
(226,492),(232,494),(239,509),(247,512),
(253,504),(259,508),(264,503),(273,501),
(286,495),(291,486),(298,483),(307,489),(310,507),
(326,509),(332,498),(337,487),(342,492),(342,510),
(355,515),(359,504),(366,505),(368,520),(382,526),
(389,539),(395,549),(400,552),(401,544),(409,543),
(417,550),(419,567),(431,579),(443,593),(454,606),
(468,614),(475,619),(478,633),(478,653),(481,673),
(486,693),(496,711),(508,719),(513,716),(515,707),
(521,711),(528,732),(538,748),(552,757),(562,751),
(569,759),(574,773),(582,772),(588,781),(589,790),
(604,800),(615,795),(622,799),(627,815),
(642,826),(653,824),(660,831),(664,844),
(680,855),(691,851),(698,857),(701,870),
(711,879),(721,877),(728,884),(734,898),
(744,904),(750,895),(756,900),(759,916),
(775,927),(783,925),(787,920),(792,927),(796,944),
(808,936),(822,924),(834,913),(844,902),(853,906),
(863,906),(870,898),(877,895),(883,901),(886,914),
(901,916),(907,906),(913,910),(915,927),(931,939),
(939,946),(944,952),(950,945),(958,947),(964,958),
(967,978),(971,1000),(973,1023),(0,1023)
]
# Real exposed paving visible in the near side courts. Both continue out of
# frame; shadowed walls remain included above their ground contact.
NEAR_GROUND=[
[(0,674),(18,667),(38,660),(59,651),(75,646),(88,659),
 (100,676),(111,691),(121,706),(118,718),(98,729),(78,740),
 (58,751),(38,762),(18,773),(0,783)],
[(218,1023),(250,1005),(281,987),(312,968),(343,950),
 (352,955),(380,971),(411,988),(442,1005),(478,1023)]
]
# Small non-architectural lamps at the facade foot; these polygons continue
# onto black courtyard paving. The court monument is already outside mask.
OCCLUSIONS=[
[(686,337),(689,320),(690,311),(692,308),(694,312),(693,322),(696,338)],
[(742,360),(744,344),(744,337),(747,333),(749,338),(748,346),(751,361)],
[(807,389),(810,373),(810,365),(813,361),(815,366),(814,375),(817,390)],
[(880,423),(882,407),(882,398),(885,394),(887,400),(886,409),(889,424)],
[(932,449),(935,433),(935,424),(938,420),(940,426),(939,435),(942,450)],
[(979,470),(981,454),(981,444),(984,441),(987,446),(985,457),(988,471)],
[(1029,496),(1032,479),(1032,469),(1035,465),(1037,471),(1036,481),(1039,497)],
[(1094,524),(1097,508),(1097,498),(1100,494),(1102,500),(1101,510),(1104,525)],
[(1169,562),(1172,545),(1172,535),(1175,531),(1177,537),(1176,547),(1179,563)],
[(1280,611),(1283,595),(1283,584),(1286,580),(1289,586),(1287,598),(1290,612)],
[(1360,647),(1364,631),(1364,620),(1367,616),(1370,622),(1368,633),(1371,648)],
[(1484,704),(1488,687),(1488,675),(1491,671),(1494,678),(1492,689),(1496,705)]
]

def main():
 im=Image.open(PHOTO).convert('RGB')
 assert im.size==(1536,1024)
 mask=Image.new('L',im.size,0)
 d=ImageDraw.Draw(mask)
 for p in [FAR_PALACE,NEAR_PALACE]:d.polygon(p,fill=255)
 for p in NEAR_GROUND+OCCLUSIONS:d.polygon(p,fill=0)
 mask.save(OUT/'own-mask.png')
 tint=Image.blend(im,Image.new('RGB',im.size,(25,255,80)),.34)
 overlay=Image.composite(tint,im,mask)
 edge=Image.new('L',im.size,0)
 ed=ImageDraw.Draw(edge)
 for p in [FAR_PALACE,NEAR_PALACE]+NEAR_GROUND:ed.line(p+[p[0]],fill=255,width=2)
 overlay.paste((255,55,40),mask=edge)
 overlay.save(OUT/'own-mask-overlay.png')
 data={
 'photo':str(PHOTO),'photoSHA256':hashlib.sha256(PHOTO.read_bytes()).hexdigest(),
 'width':1536,'height':1024,'mode':'L','values':[0,255],
 'method':'Manual native-coordinate polygons traced from only the actual K7/v1 photograph, rasterized with Pillow without resampling or antialiasing. White denotes visible palace walls, roofs, connected sculpture and glass roofs; black denotes everything else.',
 'blindness':'No source renders, target/reference masks, camera files, prompts, previous images or metrics were read for this trace.',
 'included':'Visible palace facades, shadowed faces, ordinary/glass roofs and connected architectural sculpture.',
 'excluded':'Large open court, court statue, people, external lamps, near open court paving, streets, trees, other city and ground shadows.',
 'recessAssessment':'The far roof recess shows windowed vertical facades down to the occluding front roof. No exposed ground floor can be confidently separated; those shadowed walls remain white. Two near court floors are visibly exposed and explicitly excluded.',
 'uncertainEdges':[
 {'region':[339,0,1535,308],'detail':'Far rear roof/road boundary and chimney/sculpture detail traced manually; typical 2-5 pixel uncertainty.'},
 {'region':[649,290,1535,700],'detail':'Oblique facade-to-ground contact and small lamp/person occlusions have about 2-5 pixel uncertainty; some sub-3-pixel people may be unresolved.'},
 {'region':[0,355,975,1023],'detail':'Near roof and attached sculpture silhouette use reliable main shapes; thin ornament microdetail has about 2-5 pixel uncertainty.'},
 {'region':[0,643,480,1023],'detail':'Near actual courtyard ground contact is partly shadowed; about 3-5 pixel uncertainty at wall bases and steps. Shadowed vertical faces retained.'}
 ],
 'foregroundPixels':mask.histogram()[255],
 'maskSHA256':hashlib.sha256((OUT/'own-mask.png').read_bytes()).hexdigest()
 }
 (OUT/'own-mask-provenance.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
 print(json.dumps({'size':mask.size,'mode':mask.mode,'colors':mask.getcolors(),'photoSHA256':data['photoSHA256'],'maskSHA256':data['maskSHA256'],'foregroundPixels':data['foregroundPixels']}))
if __name__=='__main__':main()
