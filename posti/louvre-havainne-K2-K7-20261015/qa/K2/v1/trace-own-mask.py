#!/usr/bin/env python3
"""Replay a manual, photo-only palace trace. No reference/target mask is read."""
from pathlib import Path
from PIL import Image, ImageDraw
import hashlib, json

PHOTO = Path('/Users/samireivinen/.codex/generated_images/01a06e21-9b03-73e1-8856-44c9ffffb635/exec-fd7b4dff-2583-482f-8076-bd255d792555.png')
OUT = Path('/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/kuvatuotanto/louvre-tavoitehavainnekuvat-20261015/K2/v1')
# Native 1536 x 1024 coordinates. Follow visible rooflines, then the inner
# edge of the large open court, then the foreground roof and street facade.
PALACE = [
 (61,498),(65,481),(77,476),(83,463),(93,455),(99,441),(109,431),
 (116,418),(127,411),(134,398),(143,391),(151,378),(161,371),
 (169,358),(182,348),(188,339),(201,330),(210,320),(226,309),
 (237,305),(245,310),(251,318),(267,318),(277,314),(290,315),
 (296,320),(312,319),(320,315),(339,315),(349,317),(366,315),
 (376,310),(390,305),(400,310),(411,318),(432,318),(436,314),
 (439,318),(461,319),(465,314),(469,319),(487,319),(491,315),
 (495,320),(507,319),(511,308),(519,304),(526,307),(534,305),
 (541,299),(550,302),(555,292),(562,291),(565,284),(577,282),
 (585,277),(593,275),(601,274),(607,270),(613,276),(616,284),
 (623,285),(628,282),(633,286),(655,285),(660,281),(664,285),
 (684,285),(690,281),(694,286),(711,285),(716,281),(721,285),
 (739,283),(744,277),(745,253),(748,249),(747,237),(752,235),
 (756,242),(759,230),(764,231),(766,238),(778,238),(781,232),
 (784,235),(786,241),(802,239),(807,232),(812,231),(813,237),
 (834,236),(838,239),(850,238),(857,242),(865,239),(870,243),
 (880,240),(885,244),(892,245),(896,251),(897,262),(903,267),
 (909,260),(916,257),(922,248),(930,248),(934,253),(943,250),
 (949,243),(954,246),(957,240),(960,239),(963,246),(969,249),
 (975,248),(978,242),(985,242),(990,249),(1004,248),(1009,245),
 (1014,249),(1021,247),(1024,240),(1029,241),(1031,247),
 (1042,247),(1047,242),(1051,244),(1054,251),(1062,251),
 (1069,245),(1076,245),(1082,250),(1090,249),(1093,255),
 (1100,254),(1104,272),(1114,278),(1120,277),(1123,273),
 (1129,278),(1141,279),(1144,274),(1148,279),(1160,279),
 (1163,275),(1167,280),(1182,279),(1187,275),(1192,278),
 (1205,278),(1210,274),(1214,278),(1228,275),(1232,272),
 (1238,277),(1251,277),(1257,273),(1261,278),(1277,278),
 (1282,273),(1285,278),(1300,277),(1305,272),(1309,277),
 (1323,276),(1328,272),(1333,276),(1344,273),(1353,274),
 (1356,260),(1359,247),(1361,226),(1365,220),(1366,215),
 (1371,217),(1375,221),(1377,231),(1385,233),(1390,229),
 (1395,222),(1399,219),(1403,222),(1405,229),(1412,231),
 (1416,237),(1421,251),(1423,272),(1427,283),(1428,307),
 (1428,341),(1417,345),(1384,344),(1366,343),(1349,343),
 (1346,339),(1337,341),(1268,339),(1255,339),(1232,341),
 (1224,339),(1207,338),(1206,345),(1196,347),(1172,346),
 (1103,343),(1097,336),(1076,336),(1057,336),(1032,336),
 (1013,337),(990,336),(963,337),(944,336),(943,392),
 (913,393),(911,390),(900,391),(887,391),(864,391),
 (840,391),(814,391),(786,391),(761,391),(738,392),
 (716,391),(691,391),(670,391),(649,392),(624,393),
 (603,392),(581,393),(560,393),(540,394),
 (536,415),(534,433),(527,453),(523,467),(515,477),
 (522,480),(528,476),(535,477),(541,475),(550,479),
 (561,476),(568,480),(579,481),(583,471),(587,463),
 (589,456),(596,454),(607,455),(613,462),(620,468),(624,482),
 (632,483),(637,480),(641,484),(654,484),(658,480),
 (662,484),(678,485),(681,480),(684,485),(701,485),
 (705,481),(708,486),(722,486),(728,482),(731,486),
 (744,486),(745,462),(749,456),(750,445),(756,442),
 (759,443),(761,437),(765,439),(768,444),(774,442),
 (775,436),(779,439),(780,445),(788,445),(792,451),
 (796,461),(800,483),(813,485),(819,482),(823,486),
 (836,486),(840,482),(844,487),(858,487),(863,483),
 (867,488),(881,488),(884,483),(889,488),(902,489),
 (906,483),(911,488),(926,488),(932,482),(934,471),
 (938,466),(940,460),(944,462),(948,465),(955,459),
 (959,457),(964,460),(965,469),(971,474),(977,476),
 (979,491),(981,510),(982,542),(985,572),
 (991,576),(997,573),(1001,578),(1007,579),(1010,570),
 (1015,570),(1019,579),(1026,578),(1031,582),
 (1039,580),(1045,570),(1051,570),(1054,575),(1060,570),
 (1065,572),(1073,580),(1081,583),(1088,580),(1091,582),
 (1095,577),(1100,579),(1104,584),(1114,583),(1117,579),
 (1121,584),(1135,585),(1139,581),(1143,586),(1157,586),
 (1161,582),(1165,587),(1179,588),(1182,584),(1187,589),
 (1200,589),(1203,585),(1208,591),(1222,591),(1226,586),
 (1230,592),(1245,592),(1248,588),(1253,593),(1268,594),
 (1271,590),(1275,595),(1289,595),(1293,590),(1298,595),
 (1310,596),(1315,592),(1320,596),(1332,596),
 (1335,590),(1340,592),(1344,604),(1351,614),(1363,612),
 (1372,606),(1380,600),(1385,592),(1390,594),(1397,591),
 (1403,596),(1415,597),(1423,595),(1430,598),(1442,597),
 (1451,599),(1457,596),(1465,601),(1477,601),
 (1485,599),(1489,604),(1501,605),(1509,603),(1514,608),
 (1525,608),(1535,611),(1535,746),
 (1508,744),(1489,743),(1463,741),(1440,739),(1420,737),
 (1394,734),(1371,734),(1343,732),(1324,729),(1299,728),
 (1275,726),(1249,725),(1223,723),(1197,721),(1173,719),
 (1148,716),(1122,715),(1098,713),(1076,711),(1050,709),
 (1023,706),(1008,705),(1002,698),(980,696),(955,693),
 (932,691),(907,689),(883,687),(856,685),(830,682),
 (806,680),(780,679),(756,677),(730,675),(704,673),
 (680,670),(654,668),(630,665),(604,663),(579,660),
 (553,658),(529,656),(504,652),(481,650),(470,646),
 (467,570),(446,570),(420,570),(397,570),(374,569),
 (350,570),(331,569),(313,572),(296,573),(280,573),
 (259,572),(251,566),(230,567),(207,568),(184,569),
 (162,568),(143,570),(135,576),(119,577),(98,575),
 (77,572),(70,566),(68,541),(65,519)
]
# The visible floor of the enclosed western court, excluding all shaded walls.
WEST_COURT_FLOOR = [
 (272,395),(286,395),(307,396),(328,396),(350,396),
 (371,396),(393,395),(414,396),(435,396),(463,395),
 (462,405),(467,412),(463,425),(459,437),(455,448),
 (450,462),(447,468),(427,470),(406,470),(384,470),
 (363,470),(341,469),(320,469),(312,466),(305,460),
 (300,462),(294,468),(283,470),(263,470),(241,470),
 (221,470),(201,469),(192,468),(201,457),(212,447),
 (220,437),(228,430),(235,420),(244,412),(252,406),
 (260,399)
]
# Actual tiny exposed court floors can be identified at the lower edges of
# the north wing recesses. Dark vertical windowed facades remain palace.
SMALL_COURT_FLOORS = [
 [(628,317),(646,317),(666,317),(687,317),(709,318),(731,318),(745,316),
  (744,321),(722,322),(701,322),(680,322),(658,321),(638,321)],
 [(798,315),(817,315),(837,315),(858,315),(878,315),(887,314),
  (887,319),(868,320),(848,319),(828,319),(809,319)]
]

def main():
    im = Image.open(PHOTO).convert('RGB')
    if im.size != (1536,1024):
        raise ValueError(f'Unexpected photo size {im.size}')
    mask = Image.new('L', im.size, 0)
    draw = ImageDraw.Draw(mask)
    draw.polygon(PALACE, fill=255)
    draw.polygon(WEST_COURT_FLOOR, fill=0)
    for p in SMALL_COURT_FLOORS:
        draw.polygon(p, fill=0)
    mask.save(OUT/'own-mask.png')
    green = Image.new('RGB',im.size,(25,255,80))
    layer = Image.blend(im,green,.34)
    overlay = Image.composite(layer,im,mask)
    edge = Image.new('L',im.size,0)
    ed = ImageDraw.Draw(edge)
    ed.line(PALACE+[PALACE[0]],fill=255,width=2)
    ed.line(WEST_COURT_FLOOR+[WEST_COURT_FLOOR[0]],fill=255,width=2)
    for p in SMALL_COURT_FLOORS:
        ed.line(p+[p[0]],fill=255,width=1)
    overlay.paste((255,55,40),mask=edge)
    overlay.save(OUT/'own-mask-overlay.png')
    photo_sha = hashlib.sha256(PHOTO.read_bytes()).hexdigest()
    provenance = {
      'photo':str(PHOTO),'photoSHA256':photo_sha,
      'width':1536,'height':1024,'mode':'L','values':[0,255],
      'method':'Manual native-coordinate polygons traced visually from the supplied photo only, rasterized with Pillow without resizing or antialiasing. White means visible palace roofs and facades; black means all other pixels.',
      'blindness':'No target masks, source renders, camera files, prompts, previous images, or metrics were inspected.',
      'included':'Visible palace wings and pavilions, including their shadowed facades.',
      'excluded':'Open western court floor and narrow visible floors of two north-wing recesses; large open court; streets; city blocks; trees; statue; people; all other surroundings.',
      'uncertainEdges':[
        {'region':[585,273,749,323],'detail':'Small north-wing recess: dark windowed vertical faces retained; narrow floor boundary partly occluded by foreground roof. Manual floor estimate may vary by about 3-5 pixels.'},
        {'region':[790,285,895,323],'detail':'Second north-wing recess: narrow visible floor separated from dark facade by a manual estimate; about 3-5 pixel ambiguity.'},
        {'region':[741,228,1110,282],'detail':'Back roofline has fine chimneys and partial tree occlusions. Polygon follows visible architectural outline, with about 2-4 pixel uncertainty on small details.'},
        {'region':[1354,214,1429,345],'detail':'Fine tower pinnacles and roof ornaments traced approximately to their visible silhouettes; several 1-3 pixel ornaments may be omitted.'},
        {'region':[60,305,275,575],'detail':'Western oblique edge and facade foot: local vegetation overlap and small roof ornaments give about 2-4 pixel boundary uncertainty.'},
        {'region':[465,437,1535,746],'detail':'Long foreground roofline and facade base include manual small-scale tracing; subpixel and fine rail/chimney details are approximate.'}
      ],
      'maskSHA256':hashlib.sha256((OUT/'own-mask.png').read_bytes()).hexdigest(),
      'foregroundPixels':mask.histogram()[255]
    }
    (OUT/'own-mask-provenance.json').write_text(json.dumps(provenance,ensure_ascii=False,indent=2)+'\n')
    print(json.dumps({'size':mask.size,'mode':mask.mode,'values':mask.getextrema(),'photoSHA256':photo_sha,'foregroundPixels':provenance['foregroundPixels']}))

if __name__ == '__main__':
    main()
