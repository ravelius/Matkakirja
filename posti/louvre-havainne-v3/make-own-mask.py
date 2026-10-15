#!/usr/bin/env python3
"""Independent hand-traced visible-palace mask; reads only K1v3 source photograph.
No reference or previous-version masks are read. Pixel coordinates are native.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter
import hashlib, io, json

ROOT = Path(__file__).resolve().parent
SOURCE = ROOT / 'louvre-K1.png'
MASK = ROOT / 'louvre-K1-maski.png'
OVERLAY = ROOT / 'QA-own-mask-overlay.png'
PROVENANCE = ROOT / 'mask-provenance.json'

# Outer contour follows the visible architecture around both arms and the rear
# block, then returns along the visible facade bases bordering the main court.
PALACE_OUTLINE = [
(0,755),(15,745),(27,738),(48,722),(68,706),(89,690),(107,677),
(130,660),(147,645),(167,626),(180,615),(197,600),(214,583),
(232,568),(251,549),(270,531),(288,511),(305,490),(321,473),
(328,457),(325,446),(327,428),(335,402),(341,383),(350,378),
(361,371),(366,364),(379,355),(392,349),(407,338),(421,332),
(438,323),(452,321),(474,315),(493,312),(516,313),(540,313),
(563,313),(572,300),(579,281),(585,262),(591,241),(598,225),
(606,220),(630,220),(648,220),(657,219),(680,220),(700,221),
(719,221),(733,220),(744,220),(752,214),(763,210),(773,214),
(784,219),(810,221),(840,220),(865,218),(881,216),(895,214),
(911,214),(927,218),(932,228),(936,243),(939,261),(947,276),
(956,293),(967,314),(987,321),(1011,320),(1037,320),(1057,319),
(1068,317),(1075,319),(1085,323),(1097,321),(1108,326),
(1117,338),(1128,349),(1135,367),(1146,380),(1154,394),
(1168,409),(1176,426),(1188,440),(1198,454),(1210,470),
(1220,485),(1233,500),(1243,516),(1258,533),(1272,537),
(1291,537),(1297,546),(1306,558),(1312,576),(1324,594),
(1335,612),(1345,628),(1357,644),(1368,660),(1382,680),
(1395,697),(1405,714),(1415,730),(1429,746),(1446,762),
(1458,777),(1473,793),(1488,809),(1502,824),(1516,841),
(1535,855),(1535,1023),(1362,1023),(1357,1005),(1351,988),
(1347,967),(1342,945),(1336,922),(1328,899),(1322,882),
(1316,862),(1308,839),(1300,817),(1294,799),(1287,780),
(1279,759),(1273,742),(1267,724),(1259,705),(1253,685),
(1246,666),(1235,660),(1217,659),(1194,660),(1165,660),
(1139,659),(1112,659),(1085,659),(1054,659),(1025,659),
(1004,660),(990,655),(986,638),(982,619),(980,598),(977,577),
(974,556),(970,535),(967,514),(962,492),(959,469),(953,447),
(947,425),(938,403),(920,395),(902,396),(879,396),(854,396),
(829,396),(802,396),(777,397),(750,396),(723,395),(698,395),
(675,395),(653,396),(634,395),(617,398),(612,416),(606,437),
(600,458),(593,479),(586,501),(579,523),(571,548),(565,570),
(557,594),(549,616),(541,639),(534,657),(514,659),(486,659),
(459,659),(432,659),(405,659),(377,659),(352,659),(326,659),
(299,658),(290,672),(279,688),(269,704),(257,723),(246,741),
(231,761),(218,779),(204,797),(190,815),(177,832),(163,850),
(150,867),(138,883),(125,900),(113,915),(101,933),(89,948),
(78,966),(67,982),(55,998),(44,1011),(29,1023),(0,1023)
]

# Small roofline features are traced separately to avoid smoothing chimneys and
# pinnacles into the surrounding background. Each is visible in the photograph.
ROOFLINE_FEATURES = [
{'id':'left-near-chimney-01','points':[(13,750),(13,732),(17,727),(22,730),(24,744)]},
{'id':'left-near-chimney-02','points':[(41,730),(41,713),(46,708),(51,711),(52,723)]},
{'id':'left-near-chimney-03','points':[(72,707),(73,692),(78,687),(84,691),(85,700)]},
{'id':'left-near-chimney-04','points':[(103,683),(102,674),(106,668),(111,670),(114,680)]},
{'id':'left-near-chimney-05','points':[(135,657),(138,642),(145,637),(151,642),(150,649)]},
{'id':'left-edge-chimney-below-tower','points':[(135,657),(135,645),(139,638),(142,634),(146,636),(151,639),(154,644),(153,649),(148,653)]},
{'id':'left-edge-chimney-tower-side','points':[(160,629),(161,612),(165,604),(169,599),(172,601),(175,599),(179,604),(179,616),(174,621)]},
{'id':'left-tall-chimney','points':[(172,619),(178,602),(179,568),(184,565),(184,559),(189,556),(195,561),(199,564),(201,583),(205,600),(211,612)]},
{'id':'left-tall-chimney-side','points':[(201,607),(202,579),(208,575),(211,579),(213,599)]},
{'id':'left-roof-chimney-06','points':[(228,567),(229,541),(233,536),(239,541),(239,556)]},
{'id':'left-roof-chimney-07','points':[(256,539),(257,516),(260,511),(265,513),(268,519),(268,531)]},
{'id':'left-roof-chimney-08','points':[(285,510),(285,496),(289,490),(294,495),(296,503)]},
{'id':'left-roof-chimney-09','points':[(305,487),(306,477),(310,473),(314,478),(315,480)]},
{'id':'left-roof-statue-10','points':[(322,466),(322,454),(326,451),(330,455),(333,460)]},
{'id':'rear-left-small-roof-pinnacle','points':[(589,245),(595,222),(600,216),(605,220),(605,230)]},
{'id':'rear-crossblock-center-roof-finial','points':[(750,219),(752,207),(757,203),(761,207),(763,214)]},
{'id':'rear-block-roof-decoration-01','points':[(645,223),(646,217),(650,217),(652,222)]},
{'id':'rear-block-roof-decoration-02','points':[(689,223),(690,216),(693,215),(695,222)]},
{'id':'rear-block-roof-decoration-03','points':[(811,224),(812,217),(816,217),(817,222)]},
{'id':'rear-block-roof-decoration-04','points':[(854,222),(855,215),(858,214),(860,220)]},
{'id':'right-upper-chimney-01','points':[(1067,326),(1068,311),(1072,307),(1076,311),(1078,322)]},
{'id':'right-upper-chimney-02','points':[(1088,329),(1089,314),(1093,309),(1098,313),(1099,323)]},
{'id':'right-river-chimney-03','points':[(1144,391),(1143,377),(1147,371),(1150,374),(1151,385)]},
{'id':'right-river-chimney-04','points':[(1173,425),(1173,411),(1177,405),(1182,409),(1183,424)]},
{'id':'right-river-chimney-05','points':[(1205,467),(1207,450),(1211,446),(1216,450),(1219,467)]},
{'id':'right-river-chimney-06','points':[(1235,511),(1238,494),(1241,488),(1247,491),(1248,506)]},
{'id':'right-tall-chimney','points':[(1301,612),(1304,591),(1308,581),(1309,571),(1315,566),(1319,562),(1323,565),(1328,565),(1333,571),(1334,594),(1342,612),(1347,624),(1324,630)]},
{'id':'right-river-chimney-07','points':[(1364,661),(1364,644),(1368,637),(1376,640),(1380,654),(1382,671)]},
{'id':'right-river-chimney-08','points':[(1400,712),(1403,692),(1407,685),(1414,688),(1418,708),(1422,722)]},
{'id':'right-near-tall-chimney','points':[(1414,761),(1420,742),(1420,720),(1425,709),(1430,704),(1431,696),(1438,692),(1443,697),(1450,701),(1454,707),(1457,741),(1467,758),(1470,774),(1445,789)]},
{'id':'right-river-chimney-09','points':[(1482,813),(1484,793),(1488,785),(1495,788),(1498,808),(1502,825)]},
{'id':'right-near-chimney-10','points':[(1518,858),(1519,837),(1523,826),(1528,825),(1534,833),(1535,860)]},
]

# A low carved stone balustrade is connected to the left pavilion. Its paved
# terrace behind the wall remains background.
ATTACHED_STONE = [
{'id':'left-attached-low-stone-front','points':[(219,438),(232,434),(235,431),(240,433),(241,438),(307,437),(318,433),(329,434),(331,446),(320,455),(235,454),(220,450)]}
]

# These exclusions represent visible ground only. Window recesses, arcades and
# inner courtyard facade walls remain palace. Coordinates come from this source.
COURTYARD_GROUND = [
{'id':'left-small-courtyard-visible-ground','points':[(489,347),(536,347),(541,349),(543,352),(537,355),(536,359),(530,359),(530,365),(523,365),(520,370),(514,371),(513,379),(508,380),(507,390),(492,385),(480,382),(467,378),(443,386),(423,394),(408,400),(413,393),(435,375),(458,361),(479,349)]},
{'id':'rear-court-left-ground-strip','points':[(650,300),(738,300),(739,302),(647,302)]},
{'id':'rear-court-right-ground-strip','points':[(798,301),(889,301),(891,303),(798,303)]},
]

RECIPE = {
 'coordinate_system':'native source pixels, x rightward and y downward; polygon vertices included by Pillow ImageDraw.polygon',
 'dimensions':[1536,1024],
 'algorithm':'L-mode zero canvas; draw palace_outline plus roofline_features plus attached_stone at 255 in listed order; subtract courtyard_ground at 0 in listed order; no antialiasing, interpolation, dilation, erosion or target fitting',
 'palace_outline':PALACE_OUTLINE,
 'roofline_features':ROOFLINE_FEATURES,
 'attached_stone':ATTACHED_STONE,
 'courtyard_ground':COURTYARD_GROUND,
 'overlay':'RGB source blended 0.34 with RGB(255,55,35) where mask=255; 1-pixel boundary RGB(0,255,190), computed as MaxFilter(3) != MinFilter(3); diagnostic only',
 'png_encoding':{'format':'PNG','optimize':False,'compress_level':9},
}

def sha(data): return hashlib.sha256(data).hexdigest()
def png_bytes(im):
    buf=io.BytesIO();im.save(buf,format='PNG',optimize=False,compress_level=9);return buf.getvalue()
def render(im):
    mask=Image.new('L',im.size,0);draw=ImageDraw.Draw(mask)
    draw.polygon(PALACE_OUTLINE,fill=255)
    for item in ROOFLINE_FEATURES+ATTACHED_STONE: draw.polygon(item['points'],fill=255)
    for item in COURTYARD_GROUND: draw.polygon(item['points'],fill=0)
    rgba=im.convert('RGB');red=Image.new('RGB',im.size,(255,55,35));tint=Image.blend(rgba,red,0.34)
    over=Image.composite(tint,rgba,mask)
    edge=Image.eval(ImageChops_difference(mask.filter(ImageFilter.MaxFilter(3)),mask.filter(ImageFilter.MinFilter(3))),lambda v:255 if v else 0)
    over.paste((0,255,190),(0,0,*im.size),edge)
    return mask,over

def ImageChops_difference(a,b):
    from PIL import ImageChops
    return ImageChops.difference(a,b)

def main():
    source_bytes=SOURCE.read_bytes();source_sha=sha(source_bytes)
    im=Image.open(io.BytesIO(source_bytes)).convert('RGB')
    assert im.size==(1536,1024),im.size
    mask,overlay=render(im)
    assert mask.mode=='L' and set(mask.get_flattened_data())=={0,255}
    mask_data=png_bytes(mask);overlay_data=png_bytes(overlay)
    replay_mask,replay_overlay=render(im)
    replay_mask_data=png_bytes(replay_mask);replay_overlay_data=png_bytes(replay_overlay)
    assert mask_data==replay_mask_data and overlay_data==replay_overlay_data
    MASK.write_bytes(mask_data);OVERLAY.write_bytes(overlay_data)
    after_sha=sha(SOURCE.read_bytes());assert source_sha==after_sha
    prov={
      'version':'K1v3-independent-own-mask-1',
      'source':{'path':str(SOURCE),'sha256':source_sha,'sha256_after':after_sha,'bytes_preserved':True,'dimensions':list(im.size)},
      'scope':'Actual visible Louvre U-shaped palace and rear closed court block as depicted in this photograph, including roofs and facades. Main court, visible secondary court ground, city, river, planting, people, statue and label excluded.',
      'basis':'Manual visual tracing of only louvre-K1.png. No reference mask, source target, LiDAR, gray mass, instruction image, prior-version photograph, prior-version mask, or other segmentation was read.',
      'independentlyCertified':False,'IoU':None,'referenceMaskRead':False,
      'occlusion_fills':[{'area':'facade bases adjoining the main courtyard','type':'implicit continuous-facade silhouette','description':'Tiny people or ornaments that coincide with the visible facade contour are treated as supported continuous facade mass only up to that contour. No fill extends into the court beyond the traced facade base; no trees or statue are filled.'}],
      'occlusion_policy':'No hidden building geography reconstructed. No foliage or statue fill. Tiny facade windows and arcade recesses remain part of continuous visible facade mass. Pixel-scale roofline details approximated by explicit polygons only.',
      'uncertainties':[
       {'area':'left small side courtyard','description':'Pale and shadowed ground wedge is visible behind the foreground pitched roof; its right boundary is partly interrupted by roof ornaments. Only the confidently visible ground wedge is subtracted.'},
       {'area':'rear closed courtyard','description':'Two 2-3 pixel tan strips at the bottom of the rear facade are interpreted as the only visible court ground. Their separation from the foreground parapet has 1-2 pixel uncertainty. Broad dark recessed arcade bands remain facade mass; hidden court surface is not invented.'},
       {'area':'right three secondary courts','description':'Magnified source inspection shows the dark openings to be visible internal facade/arcade walls down to foreground stone parapets. No confidently visible ground can be isolated, so no artificial rectangular holes are cut in these walls.'},
       {'area':'roofline ornaments','description':'Small chimneys, dormers and pinnacles are hand traced at native resolution; 1-3 pixel silhouette uncertainty remains on fine masonry against vegetation.'},
       {'area':'left attached low stone front','description':'Visible attached carved wall/balustrade is included; its paved terrace and garden surroundings are excluded.'},
       {'area':'lower left facade base','description':'Contour follows visible facade/paving contact to the image edge, excluding trees and people; no facade is extended behind foreground planting.'}
      ],
      'recipe':RECIPE,
      'outputs':{
       MASK.name:{'sha256':sha(mask_data),'mode':mask.mode,'dimensions':list(mask.size),'unique_values':[0,255],'foreground_pixels':sum(mask.histogram()[255:])},
       OVERLAY.name:{'sha256':sha(overlay_data),'mode':overlay.mode,'diagnostic_only':True},
       Path(__file__).name:{'sha256':sha(Path(__file__).read_bytes())}
      },
      'replay':{'mask_sha256':sha(replay_mask_data),'overlay_sha256':sha(replay_overlay_data),'mask_byte_identical':True,'overlay_byte_identical':True,'performed_in_memory':True},
      'provenance_self_hash':'Not embedded: a file cannot contain its own full cryptographic hash. Reported separately after write.',
      'visual_qa':{'source_inspected':True,'mask_inspected':True,'overlay_inspected':True,'crops_inspected':True,'status':'Completed manual inspection of source, final native binary mask, full overlay and enlarged edge/courtyard crops; declared fine-detail uncertainties remain','inspected_crop_bounds':[[250,195,1215,550],[0,505,560,1024],[200,290,660,550],[400,320,580,425],[570,200,980,410],[930,300,1300,550],[1180,510,1536,1024],[0,750,305,1024],[0,340,490,775],[0,430,625,740],[560,200,1240,550],[1005,390,1110,435],[1045,420,1140,460],[1060,515,1180,548],[635,284,745,313],[265,630,335,690],[125,430,340,670],[1180,525,1536,1024]],'crop_files_written':False}
    }
    PROVENANCE.write_text(json.dumps(prov,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
    print(json.dumps({'source_sha256':source_sha,'mask_sha256':sha(mask_data),'overlay_sha256':sha(overlay_data),'script_sha256':sha(Path(__file__).read_bytes()),'provenance_sha256':sha(PROVENANCE.read_bytes()),'foreground_pixels':sum(mask.histogram()[255:])},indent=2))
if __name__=='__main__': main()
