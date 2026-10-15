#!/usr/bin/env python3
"""Manual native-coordinate segmentation from the K5/v1 actual photo only."""
from pathlib import Path
from PIL import Image,ImageDraw
import hashlib,json
PHOTO=Path('/Users/samireivinen/.codex/generated_images/01a06e21-9b03-73e1-8856-44c9ffffb635/exec-d2f9d330-d2e2-4779-a377-f1414349f964.png')
OUT=Path('/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/kuvatuotanto/louvre-tavoitehavainnekuvat-20261015/K5/v1')
PALACE=[
(0,367),(5,365),(10,372),(12,384),(34,383),(55,378),
(79,378),(85,374),(91,379),(115,378),(122,374),(130,377),
(151,379),(177,381),(185,362),(196,346),(210,332),
(218,319),(223,319),(228,305),(232,302),(237,314),
(243,317),(248,309),(254,310),(258,305),(264,310),
(272,313),(280,321),(288,321),(292,317),(297,322),
(304,318),(308,326),(317,327),(323,325),(329,335),
(340,334),(344,347),(350,363),(357,378),(363,395),
(374,410),(382,424),(387,442),(400,443),(414,446),
(419,438),(421,410),(426,398),(444,398),(465,397),
(474,403),(478,420),(484,441),(491,441),(495,422),
(499,416),(503,419),(508,436),(516,439),(536,439),
(539,423),(542,414),(547,418),(549,439),
(572,440),(596,439),(620,439),(644,439),(668,439),
(692,439),(716,438),(735,437),(739,419),(742,406),
(742,391),(746,387),(751,390),(757,389),(765,386),
(771,386),(773,379),(776,387),(785,389),(790,386),
(795,390),(800,388),(804,394),(805,412),(811,427),(816,439),
(840,439),(864,439),(888,439),(912,439),(936,440),
(960,440),(982,440),(992,435),(995,424),(1001,417),
(1006,423),(1009,439),(1029,441),(1045,439),(1050,424),
(1055,417),(1059,423),(1064,442),(1070,441),
(1074,413),(1079,395),(1085,392),(1101,392),(1118,390),
(1125,398),(1130,415),(1138,447),(1152,448),(1166,445),
(1168,426),(1175,413),(1182,397),(1188,381),(1196,363),
(1202,353),(1207,338),(1213,335),(1219,339),(1225,334),
(1227,328),(1235,333),(1242,328),(1248,330),(1256,326),
(1261,322),(1270,325),(1281,320),(1293,316),(1301,320),
(1308,317),(1316,317),(1325,315),(1331,312),(1334,337),
(1349,346),(1361,363),(1374,383),(1383,396),
(1386,396),(1393,402),(1397,447),(1412,449),(1432,447),
(1455,445),(1474,447),(1490,446),(1513,449),(1535,452),
(1535,862),(1515,850),(1492,837),(1468,823),(1444,810),
(1421,797),(1397,783),(1373,770),(1349,756),(1326,742),
(1302,728),(1278,714),(1255,701),(1231,687),(1208,675),
(1184,661),(1162,648),(1139,636),(1118,624),(1097,613),
(1078,602),(1059,591),(1040,581),(1022,571),(1005,564),
(990,558),(966,558),(942,558),(918,558),(894,558),
(870,558),(846,558),(822,558),(798,558),(774,558),
(750,558),(726,558),(702,558),(678,558),(654,558),
(630,558),(606,558),(582,558),(550,558),
(531,565),(513,574),(495,583),(477,592),(459,602),
(441,612),(422,622),(403,631),(385,641),(367,650),
(349,660),(331,670),(313,678),(295,684),(276,690),
(259,700),(235,712),(211,725),(187,737),(163,750),
(139,763),(115,775),(91,788),(67,800),(43,813),
(19,825),(0,834)
]
# Occluding lamps/people are not architecture. These polygons may extend into
# already-black paving; only their overlap with the building changes the mask.
OCCLUSIONS=[
[(25,835),(28,812),(29,796),(27,793),(27,786),(30,785),(30,779),(33,778),(34,786),(39,788),(39,794),(36,796),(36,814),(40,836)],
[(156,771),(159,748),(159,734),(155,733),(155,726),(161,723),(162,718),(165,722),(170,725),(170,733),(166,735),(166,751),(170,770)],
[(196,748),(199,725),(198,715),(195,713),(196,706),(201,703),(203,706),(207,707),(208,714),(204,716),(204,729),(208,748)],
[(273,713),(276,691),(275,684),(272,682),(273,676),(278,672),(281,676),(284,678),(284,683),(280,686),(281,697),(284,713)],
[(305,691),(308,675),(307,665),(309,658),(312,658),(315,665),(314,674),(317,691)],
[(1473,882),(1479,850),(1480,817),(1477,811),(1478,803),(1482,801),(1483,795),(1486,801),(1491,804),(1492,811),(1487,817),(1487,850),(1493,881)],
[(1342,790),(1346,766),(1347,749),(1343,746),(1344,740),(1348,736),(1351,739),(1356,741),(1356,747),(1352,751),(1353,768),(1358,790)],
[(1269,753),(1273,731),(1273,715),(1269,712),(1270,706),(1275,701),(1280,706),(1281,713),(1277,716),(1278,735),(1282,752)],
[(1238,715),(1242,698),(1242,686),(1239,683),(1241,676),(1245,673),(1249,679),(1249,686),(1246,689),(1247,703),(1250,715)],
[(1209,701),(1212,682),(1211,672),(1214,663),(1217,666),(1220,673),(1216,678),(1218,701)],
[(1167,675),(1169,658),(1168,650),(1171,643),(1174,648),(1174,656),(1172,660),(1175,675)],
[(1139,666),(1141,649),(1139,641),(1143,635),(1146,640),(1145,648),(1147,666)],
[(1116,638),(1118,620),(1116,613),(1119,607),(1122,612),(1121,622),(1124,638)],
[(1090,628),(1093,610),(1092,603),(1095,597),(1098,602),(1097,612),(1100,629)],
[(1070,613),(1072,596),(1071,590),(1074,584),(1077,589),(1075,597),(1078,614)],
[(1049,600),(1051,583),(1050,577),(1053,571),(1056,576),(1054,584),(1057,600)],
[(1030,589),(1032,572),(1031,566),(1034,560),(1037,566),(1035,573),(1038,590)],
# Court statue, including any silhouette crossing the distant facade base.
[(604,609),(608,580),(610,568),(610,559),(613,553),(614,547),(618,547),(620,551),(624,556),(626,565),(629,575),(633,609)],
# Small people touching the back facade foot, traced conservatively.
[(700,565),(701,556),(703,553),(705,556),(706,565)],
[(714,565),(714,556),(717,553),(719,557),(719,565)],
[(726,563),(726,554),(728,551),(730,554),(731,563)],
[(756,564),(756,554),(758,552),(760,555),(760,564)],
[(804,564),(804,555),(806,552),(808,555),(809,564)],
[(973,566),(973,556),(976,552),(978,556),(979,566)],
[(984,569),(984,557),(987,554),(989,558),(990,570)]
]

def main():
 im=Image.open(PHOTO).convert('RGB')
 assert im.size==(1536,1024)
 mask=Image.new('L',im.size,0)
 d=ImageDraw.Draw(mask)
 d.polygon(PALACE,fill=255)
 for p in OCCLUSIONS:d.polygon(p,fill=0)
 mask.save(OUT/'own-mask.png')
 tint=Image.blend(im,Image.new('RGB',im.size,(25,255,80)),.34)
 overlay=Image.composite(tint,im,mask)
 edge=Image.new('L',im.size,0)
 ed=ImageDraw.Draw(edge)
 ed.line(PALACE+[PALACE[0]],fill=255,width=2)
 overlay.paste((255,55,40),mask=edge)
 overlay.save(OUT/'own-mask-overlay.png')
 data={
 'photo':str(PHOTO),'photoSHA256':hashlib.sha256(PHOTO.read_bytes()).hexdigest(),
 'width':1536,'height':1024,'mode':'L','values':[0,255],
 'method':'Manual native-coordinate silhouette and occlusion polygons from only the actual K5/v1 photograph, rasterized with Pillow without scaling or antialiasing. White denotes visible palace walls, roofs and connected architectural sculpture; black denotes everything else.',
 'blindness':'No source renders, reference/target masks, camera files, prompts, previous images or metrics were inspected for this trace.',
 'included':'Visible palace facades, roofs, connected architectural sculpture and building surfaces in shadow.',
 'excluded':'Open paving and ground shadows, court statue, lamps and small people where they overlap palace, sky, distant city, trees and non-palace background.',
 'uncertainEdges':[
 {'region':[0,300,1535,453],'detail':'Fine roof ornaments and connected sculpture are traced approximately; typical 2-5 pixel uncertainty, with some thin sculpture/finial microdetail omitted.'},
 {'region':[0,550,1535,865],'detail':'Oblique facade-to-paving contact traced manually. Typical 2-5 pixel uncertainty on steps, projecting bases and local shadowed contacts.'},
 {'region':[0,550,1535,882],'detail':'Small lamp and person occlusions are manual approximate silhouettes, typically 1-3 pixels uncertain. Very distant tiny people may be unresolved at native resolution.'},
 {'region':[383,397,551,447],'detail':'Background openings between stepped left roofs are kept black, with 2-5 pixel uncertainty along small ornamental edges.'}
 ],
 'foregroundPixels':mask.histogram()[255],
 'maskSHA256':hashlib.sha256((OUT/'own-mask.png').read_bytes()).hexdigest()
 }
 (OUT/'own-mask-provenance.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
 print(json.dumps({'size':mask.size,'mode':mask.mode,'colors':mask.getcolors(),'photoSHA256':data['photoSHA256'],'maskSHA256':data['maskSHA256'],'foregroundPixels':data['foregroundPixels']}))
if __name__=='__main__':main()
