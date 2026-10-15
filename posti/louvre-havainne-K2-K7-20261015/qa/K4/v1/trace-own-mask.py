#!/usr/bin/env python3
"""Replay the blind photo-only K4/v1 palace trace at native resolution."""
from pathlib import Path
from PIL import Image, ImageDraw
import hashlib,json
PHOTO=Path('/Users/samireivinen/.codex/generated_images/01a06e21-9b03-73e1-8856-44c9ffffb635/exec-8e478221-c4fe-4a2b-a85f-136bd49e9f84.png')
OUT=Path('/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/kuvatuotanto/louvre-tavoitehavainnekuvat-20261015/K4/v1')
# Exterior silhouette, including both sides of the open main court and the
# near court that continues outside the image. Glass roofs belong to palace.
PALACE=[
(237,1023),(241,1003),(248,983),(251,963),(256,942),
(264,919),(266,899),(282,891),(315,886),(324,875),(333,851),
(340,827),(348,807),(354,786),(362,767),(368,748),
(310,751),(287,753),(264,754),(240,754),(212,750),
(207,737),(205,709),(205,680),(210,657),(218,639),
(230,628),(241,611),(254,588),(264,577),(278,566),
(289,564),(299,547),(309,533),(319,517),(329,502),
(340,487),(350,469),(361,453),(371,438),(381,422),
(392,406),(406,394),(416,379),(428,371),(439,357),
(451,339),(464,321),(479,305),(489,287),(502,272),
(512,259),(516,244),(520,231),(526,218),(534,215),
(540,208),(546,211),(551,216),(560,215),(566,227),
(569,244),(573,255),(577,271),(576,288),(568,310),
(559,329),(553,349),(548,369),(540,389),
(555,390),(559,383),(563,375),(570,371),(582,371),
(589,378),(594,388),(602,394),(609,407),(613,419),
(619,432),(620,445),(615,463),(607,482),(601,502),
(592,523),(585,545),(578,567),(570,589),(562,611),
(554,633),(546,654),(541,670),(539,684),
(558,686),(580,687),(602,687),(624,688),(646,688),
(669,688),(691,687),(712,687),(716,665),(718,644),
(721,632),(725,629),(731,634),(738,630),(745,625),
(752,621),(758,625),(763,619),(768,623),(775,623),
(781,621),(788,627),(793,638),(800,645),(804,682),
(824,685),(846,686),(868,685),(891,686),(913,686),
(936,685),(957,684),(950,665),(941,647),(935,628),
(930,610),(923,592),(918,572),(912,552),(909,533),
(904,515),(899,497),(890,485),(885,480),(886,464),
(889,448),(895,435),(897,415),(902,397),(908,382),
(915,373),(923,369),(930,372),(934,382),(941,390),
(946,404),(953,414),(967,408),(985,405),(1005,406),
(1023,409),(1018,392),(1011,374),(1005,354),(999,337),
(994,319),(988,302),(983,285),(986,269),(990,260),
(997,252),(1004,249),(1010,250),(1015,258),
(1032,258),(1048,257),(1053,263),(1063,263),
(1068,276),(1071,296),(1079,317),(1086,336),
(1093,356),(1098,375),(1105,395),(1113,416),
(1122,421),(1128,417),(1133,423),(1149,425),
(1157,429),(1164,438),(1166,454),(1164,475),
(1170,492),(1178,510),(1187,530),(1195,551),
(1203,572),(1211,592),(1220,608),(1227,613),
(1231,626),(1238,633),(1246,633),(1256,647),
(1254,670),(1251,694),(1249,718),(1246,742),
(1225,743),(1202,744),(1178,744),(1155,744),
(1107,745),(1114,768),(1122,791),(1129,814),
(1136,839),(1145,863),(1151,877),(1183,881),(1191,882),
(1206,887),(1214,906),(1220,928),(1226,949),
(1243,959),(1248,980),(1255,1002),(1260,1023),
(1072,1023),(1065,1000),(1059,978),(1053,955),
(1046,933),(1040,911),(1033,888),(1026,866),
(1016,848),(1003,842),(980,842),(956,842),
(933,841),(909,842),(885,841),(862,841),
(838,841),(815,841),(791,841),(768,841),
(744,841),(720,841),(697,841),(673,840),
(650,840),(626,840),(603,840),(579,840),
(556,839),(532,839),(509,839),
(499,858),(493,881),(487,904),(480,927),
(474,951),(467,975),(461,999),(455,1023)
]
WEST_COURT_FLOOR=[
(390,561),(405,561),(422,561),(448,560),
(446,567),(449,573),(443,586),(437,599),(430,613),
(426,620),(411,619),(397,619),(391,610),
(375,609),(359,609),(345,609),(351,596),
(360,585),(369,575),(379,566)
]

def main():
 im=Image.open(PHOTO).convert('RGB')
 assert im.size==(1536,1024)
 mask=Image.new('L',im.size,0)
 d=ImageDraw.Draw(mask)
 d.polygon(PALACE,fill=255)
 d.polygon(WEST_COURT_FLOOR,fill=0)
 mask.save(OUT/'own-mask.png')
 tint=Image.blend(im,Image.new('RGB',im.size,(25,255,80)),.34)
 overlay=Image.composite(tint,im,mask)
 edge=Image.new('L',im.size,0)
 ed=ImageDraw.Draw(edge)
 for p in [PALACE,WEST_COURT_FLOOR]:ed.line(p+[p[0]],fill=255,width=2)
 overlay.paste((255,55,40),mask=edge)
 overlay.save(OUT/'own-mask-overlay.png')
 data={
 'photo':str(PHOTO),'photoSHA256':hashlib.sha256(PHOTO.read_bytes()).hexdigest(),
 'width':1536,'height':1024,'mode':'L','values':[0,255],
 'method':'Manual native-coordinate polygons traced from the actual K4/v1 photograph alone; Pillow rasterization without scaling or antialiasing. Main building boundaries are traced; fine ornament microdetail is approximate. White denotes visible palace architecture; black denotes everything else.',
 'blindness':'No source renders, target/reference masks, prompts, camera data, previous images or metrics were read for this trace.',
 'included':'Visible palace roofs, facades and glass roof structures, including shadowed vertical building faces.',
 'excluded':'Main open court, near open court and statue, visible west courtyard floor, unrelated city, trees, streets, river, ground and ground shadows.',
 'courtAssessment':'The northern small west-wing recess shows windowed vertical faces down to the occluding foreground roof; no confidently separable exposed ground is visible there. Those building faces are retained.',
 'uncertainEdges':[
 {'region':[205,208,622,758],'detail':'Oblique west-side facade/roof edge and small finials traced approximately; typical boundary uncertainty 2-5 pixels, with a few thin ornaments omitted.'},
 {'region':[341,558,451,623],'detail':'West courtyard ground contact, shadowed wall foot and small roof projection have about 3-5 pixel uncertainty.'},
 {'region':[883,248,1258,748],'detail':'East wing glass roofs retained. Oblique roof edge and decorative details have about 2-5 pixel uncertainty.'},
 {'region':[235,619,1263,1023],'detail':'Near roof ornaments, perspective facade foot and image-edge intersections are manual; about 2-5 pixel uncertainty. The near courtyard remains black to the image edge.'}
 ],
 'foregroundPixels':mask.histogram()[255],
 'maskSHA256':hashlib.sha256((OUT/'own-mask.png').read_bytes()).hexdigest()
 }
 (OUT/'own-mask-provenance.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
 print(json.dumps({'size':mask.size,'mode':mask.mode,'colors':mask.getcolors(),'photoSHA256':data['photoSHA256'],'maskSHA256':data['maskSHA256'],'foregroundPixels':data['foregroundPixels']}))
if __name__=='__main__':main()
