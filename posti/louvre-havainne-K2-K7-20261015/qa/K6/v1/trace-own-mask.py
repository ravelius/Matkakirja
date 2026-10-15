#!/usr/bin/env python3
"""Blind actual-photo palace polygons for K6/v1, replayed at native resolution."""
from pathlib import Path
from PIL import Image,ImageDraw
import hashlib,json
PHOTO=Path('/Users/samireivinen/.codex/generated_images/01a06e21-9b03-73e1-8856-44c9ffffb635/exec-84d0ab9a-be92-4301-89c4-8dd0e20e0833.png')
OUT=Path('/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/kuvatuotanto/louvre-tavoitehavainnekuvat-20261015/K6/v1')
FAR_PALACE=[
(0,221),(17,220),(23,212),(28,213),(31,219),(44,219),
(49,212),(54,212),(58,219),(75,218),(78,211),(83,211),
(87,217),(101,217),(105,210),(109,211),(113,218),
(132,217),(136,210),(141,211),(146,217),(164,216),
(168,208),(173,209),(178,217),(187,214),(195,223),
(201,235),(210,235),(214,221),(219,217),(224,225),
(230,237),(254,238),(278,238),(286,231),
(289,216),(297,201),(305,185),(314,172),(322,159),
(327,145),(333,136),(333,120),(338,116),(343,121),
(347,128),(353,126),(361,121),(379,120),(392,119),
(403,116),(411,120),(429,120),(442,123),(451,121),
(454,113),(459,111),(465,132),(469,142),(480,144),
(504,144),(528,143),(552,143),(576,142),(600,142),
(624,142),(648,141),(672,141),(696,141),(720,141),
(735,140),(736,131),(742,126),(748,132),(750,143),
(762,138),(767,129),(775,128),(783,122),(789,130),
(795,133),(803,128),(809,132),(815,140),(821,151),
(832,150),(836,136),(840,133),(846,141),(850,144),
(873,143),(897,143),(921,142),(945,142),(969,142),
(993,141),(1017,141),(1041,141),(1064,139),
(1072,146),(1080,145),(1098,155),(1101,141),
(1108,126),(1116,125),(1122,121),(1128,127),
(1152,126),(1176,125),(1200,125),(1218,125),
(1227,119),(1233,111),(1241,97),(1248,91),
(1253,84),(1259,82),(1265,88),(1268,105),
(1265,120),(1272,127),(1296,127),(1320,126),
(1344,126),(1368,125),(1392,125),(1416,124),
(1430,122),(1437,105),(1444,97),(1448,86),
(1453,83),(1460,87),(1464,100),(1460,116),
(1469,122),(1492,122),(1515,121),(1535,120),
(1535,260),(1512,260),(1488,260),(1464,260),
(1440,260),(1416,260),(1392,260),(1368,261),
(1344,261),(1320,261),(1296,261),(1272,262),
(1248,262),(1222,264),(1218,287),(1216,311),
(1213,335),(1210,359),(1206,384),
(1183,385),(1159,385),(1135,385),(1111,385),
(1087,386),(1063,386),(1039,386),(1015,386),
(991,386),(967,386),(943,386),(919,386),
(895,386),(871,387),(847,387),(823,387),
(799,387),(775,388),(751,387),(727,387),
(703,387),(679,387),(655,387),(631,388),
(607,388),(583,388),(559,388),(535,388),
(511,388),(487,388),(463,389),(439,389),
(415,389),(391,389),(367,389),(343,390),
(319,390),(295,390),(271,390),(247,391),
(223,391),(199,391),(175,390),(165,397),
(152,416),(139,435),(126,453),(113,472),
(100,491),(87,510),(74,529),(61,547),
(48,566),(35,585),(22,603),(9,622),(0,632)
]
NEAR_ROOF=[
(0,708),(16,710),(23,699),(30,687),(39,675),
(50,661),(62,651),(69,645),(78,650),(102,649),
(126,647),(134,641),(140,640),(145,645),(150,655),
(160,660),(169,669),(179,676),(190,688),(202,696),
(215,707),(221,698),(229,696),(236,704),(241,717),
(247,713),(251,706),(256,710),(263,724),(269,729),
(278,720),(285,718),(291,727),(296,740),
(307,739),(310,722),(316,716),(323,718),(330,727),
(337,740),(358,740),(377,739),(381,731),(386,729),
(391,739),(411,740),(430,739),(435,732),(440,733),
(445,740),(466,740),(486,740),(491,733),(496,735),
(500,741),(521,742),(541,742),(546,734),(551,737),
(556,743),(576,743),(597,743),(610,741),
(614,726),(620,717),(626,716),(632,725),(633,744),
(654,745),(676,747),(680,730),(681,711),
(681,606),(686,600),(691,600),(695,595),(701,598),
(706,605),(707,645),(716,633),(726,622),(738,615),
(742,599),(743,593),(750,593),(755,597),(759,605),
(774,605),(781,599),(787,600),(791,595),(802,596),
(808,606),(818,606),(824,597),(828,592),(833,591),
(837,596),(840,602),(837,607),(847,615),(856,627),
(866,642),(875,659),(878,607),(882,602),(888,600),
(893,599),(898,605),(899,650),(899,702),
(905,724),(910,744),(930,745),(945,744),(949,727),
(954,721),(961,719),(968,728),(972,745),(992,746),
(1006,745),(1010,733),(1016,733),(1021,745),
(1041,746),(1053,745),(1056,731),(1062,724),(1067,730),
(1071,746),(1093,747),(1116,747),(1139,748),
(1154,747),(1156,733),(1163,727),(1170,729),(1177,746),
(1197,748),(1204,741),(1211,737),(1218,741),(1225,749),
(1246,749),(1258,746),(1263,733),(1270,732),(1279,741),
(1286,751),(1307,753),(1315,739),(1320,735),(1327,741),
(1335,753),(1356,752),(1355,738),(1357,724),(1361,716),
(1360,709),(1364,703),(1368,705),(1370,714),(1377,718),(1380,727),(1382,724),(1395,707),(1406,694),(1418,683),(1431,671),
(1443,661),(1450,653),(1452,646),(1458,640),(1463,644),
(1467,654),(1474,664),(1493,665),(1515,664),(1535,664),
(1535,1023),(0,1023)
]
# Small external occluders crossing distant facade foot; court statue and most
# people already lie in the black court outside both palace polygons.
OCCLUSIONS=[
[(169,400),(172,389),(172,382),(175,377),(178,383),(177,391),(180,401)],
[(238,394),(240,383),(242,379),(244,383),(245,394)],
[(266,394),(268,384),(271,379),(273,384),(274,394)],
[(330,395),(332,383),(335,378),(337,384),(338,395)],
[(389,393),(390,382),(393,378),(395,383),(396,394)],
[(439,393),(440,381),(443,377),(445,382),(446,394)],
[(542,395),(543,384),(546,380),(548,384),(549,395)],
[(690,394),(691,383),(694,380),(696,384),(697,394)],
[(736,395),(737,383),(740,379),(742,384),(743,395)],
[(785,397),(786,384),(789,380),(791,384),(792,398)],
[(850,395),(851,384),(854,381),(856,385),(857,395)],
[(1074,395),(1075,383),(1078,380),(1080,385),(1081,395)],
[(1188,395),(1189,384),(1192,379),(1194,385),(1195,395)]
]

def main():
 im=Image.open(PHOTO).convert('RGB')
 assert im.size==(1536,1024)
 mask=Image.new('L',im.size,0)
 d=ImageDraw.Draw(mask)
 for p in [FAR_PALACE,NEAR_ROOF]:d.polygon(p,fill=255)
 for p in OCCLUSIONS:d.polygon(p,fill=0)
 mask.save(OUT/'own-mask.png')
 tint=Image.blend(im,Image.new('RGB',im.size,(25,255,80)),.34)
 overlay=Image.composite(tint,im,mask)
 edge=Image.new('L',im.size,0)
 ed=ImageDraw.Draw(edge)
 for p in [FAR_PALACE,NEAR_ROOF]:ed.line(p+[p[0]],fill=255,width=2)
 overlay.paste((255,55,40),mask=edge)
 overlay.save(OUT/'own-mask-overlay.png')
 data={
 'photo':str(PHOTO),'photoSHA256':hashlib.sha256(PHOTO.read_bytes()).hexdigest(),
 'width':1536,'height':1024,'mode':'L','values':[0,255],
 'method':'Manual native-coordinate boundary polygons from only the K6/v1 actual photo, rasterized with Pillow without scaling or antialiasing. White denotes visible palace walls, roofs and connected architectural sculpture; black denotes everything else.',
 'blindness':'No source render, target/reference mask, camera files, prompts, prior images or metrics were inspected for this trace.',
 'included':'Near palace roof mass, distant palace wings, all shadowed vertical faces, and connected architectural sculpture.',
 'excluded':'Actual courtyard paving, ground shadows, statue, people, river, trees and streets. External occlusions at facade foot are approximately traced.',
 'courtAssessment':'No confidently separable exposed ground is visible inside the narrow rear roof recesses; the windowed vertical faces and occluding roofs remain white.',
 'uncertainEdges':[
 {'region':[0,82,1535,271],'detail':'Distant roof/chimney/sculpture silhouette and local vegetation overlaps have typical 2-5 pixel uncertainty; thin ornament microdetail approximate.'},
 {'region':[0,375,1222,633],'detail':'Distant facade foot and oblique left wing ground contact are manually traced, typical 2-5 pixels uncertain. Shadowed building faces retained.'},
 {'region':[0,589,1535,759],'detail':'Near roof sculpture and chimney silhouettes traced with main architectural shape preserved; small 2-5 pixel ornament uncertainty.'},
 {'region':[0,375,1222,633],'detail':'Very small people and lamp overlap at distant facade foot is approximate; some sub-3-pixel silhouettes may be unresolved.'}
 ],
 'foregroundPixels':mask.histogram()[255],
 'maskSHA256':hashlib.sha256((OUT/'own-mask.png').read_bytes()).hexdigest()
 }
 (OUT/'own-mask-provenance.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
 print(json.dumps({'size':mask.size,'mode':mask.mode,'colors':mask.getcolors(),'photoSHA256':data['photoSHA256'],'maskSHA256':data['maskSHA256'],'foregroundPixels':data['foregroundPixels']}))
if __name__=='__main__':main()
