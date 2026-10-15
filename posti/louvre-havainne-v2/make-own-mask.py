#!/usr/bin/env python3
"""Replay an independent manual palace trace made only from louvre-K1.png."""
from pathlib import Path
import hashlib
import json
import numpy as np
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent
SOURCE = ROOT / 'louvre-K1.png'
MASK = ROOT / 'louvre-K1-maski.png'
OVERLAY = ROOT / 'QA-own-mask-overlay.png'
PROVENANCE = ROOT / 'mask-provenance.json'

# Native-image integer coordinates. Pillow's inclusive polygon rasterization,
# no resampling, antialiasing, smoothing, dilation, erosion, or target fitting.
PALACE = [
 (0,816),(25,790),(55,761),(83,736),(105,715),(133,687),(164,657),
 (174,648),(174,639),(181,636),(184,623),(190,607),(194,588),
 (198,604),(203,631),(215,628),(230,611),(244,595),(260,576),
 (276,558),(292,539),(307,521),(322,503),(337,485),(337,468),
 (341,449),(347,435),(351,429),(361,427),(377,429),(387,440),
 (393,450),(405,435),(422,416),(441,394),(444,384),(452,381),
 (457,375),(464,373),(469,377),(491,374),(502,375),(507,368),
 (553,368),(560,370),(567,350),(573,338),(580,325),(586,323),
 (592,311),(597,302),(599,285),(604,275),(608,268),(615,270),
 (621,276),(633,272),(741,274),(747,269),(754,266),(762,264),
 (769,265),(776,270),(784,275),(881,272),(891,274),(897,270),
 (904,276),(915,275),(922,273),(928,278),(931,287),(932,307),
 (940,321),(949,335),(955,343),(958,359),(969,368),(977,384),
 (987,380),(996,372),(1005,375),(1017,380),(1075,382),
 (1083,375),(1088,375),(1092,386),(1098,386),(1100,397),
 (1110,407),(1114,419),(1124,430),(1132,440),(1138,449),
 (1143,459),(1152,469),(1155,478),(1169,493),(1178,507),
 (1187,516),(1195,527),(1205,540),(1215,551),(1225,564),
 (1234,575),(1245,575),(1249,565),(1254,563),(1257,578),
 (1265,590),(1275,592),(1286,599),(1291,602),(1294,613),
 (1300,612),(1305,620),(1310,623),(1316,630),(1318,621),
 (1322,609),(1326,608),(1327,603),(1329,608),(1335,611),
 (1338,617),(1338,636),(1340,642),(1343,642),(1344,650),
 (1340,650),(1341,663),(1348,667),(1353,674),(1360,680),
 (1364,686),(1372,691),(1376,700),(1385,703),(1391,712),
 (1393,722),(1402,732),(1408,741),(1410,733),(1414,722),
 (1416,716),(1418,714),(1420,720),(1424,722),(1429,743),
 (1429,753),(1435,758),(1439,768),(1440,788),(1455,798),
 (1464,803),(1475,817),(1485,830),(1494,831),(1504,837),
 (1508,843),(1518,850),(1521,844),(1524,851),(1524,861),
 (1531,870),(1535,879),(1535,1023),(1361,1023),(1350,999),
 (1341,983),(1334,966),(1325,952),(1329,938),(1322,929),
 (1327,916),(1324,903),(1331,891),(1341,881),(1335,875),
 (1320,864),(1306,837),(1293,816),(1276,787),(1263,764),
 (1251,740),(1238,715),(1231,695),(1023,695),(1000,693),
 (987,679),(982,659),(974,638),(969,615),(962,590),
 (952,566),(945,542),(938,516),(932,493),(925,468),
 (920,450),(915,433),(878,433),(878,430),(798,430),
 (797,433),(750,433),(749,430),(622,430),(620,433),
 (614,433),(605,470),(599,495),(593,521),(585,547),
 (579,575),(569,601),(562,624),(554,649),(543,672),
 (534,694),(513,696),(489,697),(485,693),(315,693),
 (313,690),(286,691),(274,712),(251,743),(223,784),
 (191,828),(158,876),(124,925),(91,978),(62,1023),(0,1023)
]

COURTYARD_FLOORS = {
 'rear_left_floor': [(649,339),(739,339),(735,350),(648,350)],
 'rear_right_floor': [(796,339),(880,339),(881,351),(799,351)],
 'right_upper_floor': [(1007,459),(1109,459),(1114,464),(1008,464)],
 'right_lower_floor': [(1061,572),(1176,572),(1181,576),(1066,577)],
}

def sha256(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def main():
    source_hash_before = sha256(SOURCE)
    with Image.open(SOURCE) as opened:
        photo = opened.convert('RGB')
    if photo.size != (1536,1024):
        raise ValueError(f'Unexpected native source size: {photo.size}')
    mask = Image.new('L', photo.size, 0)
    draw = ImageDraw.Draw(mask)
    draw.polygon(PALACE, fill=255)
    for polygon in COURTYARD_FLOORS.values():
        draw.polygon(polygon, fill=0)
    values = np.unique(np.asarray(mask))
    assert set(values.tolist()) == {0,255}
    mask.save(MASK)

    # Diagnostic only. The binary mask above is the actual deliverable mask.
    overlay = photo.convert('RGBA')
    tint = Image.new('RGBA', photo.size, (0,215,255,0))
    alpha = mask.point(lambda v: 76 if v else 0)
    tint.putalpha(alpha)
    overlay = Image.alpha_composite(overlay,tint)
    edge = ImageDraw.Draw(overlay)
    edge.line(PALACE+[PALACE[0]], fill=(0,255,255,255), width=2)
    for polygon in COURTYARD_FLOORS.values():
        edge.line(polygon+[polygon[0]], fill=(255,195,0,255), width=1)
    overlay.convert('RGB').save(OVERLAY)
    assert source_hash_before == sha256(SOURCE), 'Source bytes changed'

    provenance = {
      'schema': 'independent-own-palace-mask-v1',
      'source': {'path': str(SOURCE), 'sha256': source_hash_before,
                 'nativeWidth':1536,'nativeHeight':1024,
                 'readOnly':True,'nativeBytesPreserved':True},
      'mask': {'path': str(MASK), 'sha256': sha256(MASK),
               'mode':'L','bitsPerPixel':8,'values':[0,255],
               'foregroundPixels': int(np.count_nonzero(np.asarray(mask)))},
      'overlay': {'path': str(OVERLAY), 'sha256': sha256(OVERLAY),
                  'diagnosticOnly':True,'foregroundTint':'cyan, alpha 76/255'},
      'replay': {'path':str(Path(__file__).resolve()),
                 'sha256':sha256(Path(__file__).resolve()),
                 'python':'/Users/samireivinen/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3',
                 'dependencies':['Pillow','NumPy'],
                 'operation':'Draw PALACE as 255 using Pillow ImageDraw.polygon, then COURTYARD_FLOORS as 0; native dimensions; no resampling or smoothing.',
                 'polygons':{'palaceForeground':PALACE,'courtyardBackground':COURTYARD_FLOORS}},
      'method':'Independent manual visual segmentation from the actual generated photograph only; native source and source-only enlarged crops inspected.',
      'scope':'Visible intended U-shaped Louvre palace, its connecting wings and the rear transverse block. Facade windows and arcades filled as facade mass.',
      'excluded':['side city buildings','river','sky','trees and large vegetation masses','central paving and courtyard floor strips','people','equestrian statue'],
      'occlusionFills':[
        {'area':'tiny interruptions at palace roofline and facade foot',
         'policy':'Short straight connections between visible adjacent palace edges; small roof ornaments and windows are included as building mass.'},
        {'area':'lower-right inner edge approximately x1322-1341, y875-952',
         'policy':'Edge follows visible building around vegetation. Large foreground trees are not filled.'}
      ],
      'uncertainties':[
        'Generated fine roof ornaments and finials are visually soft; the contour is manually approximated at native pixel scale.',
        'Narrow rear courtyard floor strips are partly hidden by the front central dome; only visible floor on either side is excluded.',
        'The two narrow right-wing courtyard floor strips are shaded; floor edges are approximate and no hidden courtyard geometry is inferred.',
        'Large foreground vegetation obscures the inner foot of the far-right wing; only visible mass is followed there.',
        'Dark slate surfaces on the left wing are interpreted as visible roof, supported by their continuous roof texture and roof-edge dormers.'
      ],
      'independentlyCertified':False,
      'IoU':None,
      'referenceMaskRead':False,
      'otherSegmentationRead':False,
      'targetFittingPerformed':False,
      'sourceVisualInspection':True,
      'maskOverlayVisualInspection':True,
      'visualInspectionNotes':'Full native overlay and source-only enlarged crops reviewed. Right-wing finials corrected from the actual photograph before finalizing.'
    }
    PROVENANCE.write_text(json.dumps(provenance,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(json.dumps({'sourceSHA256':source_hash_before,'maskSHA256':sha256(MASK),
       'overlaySHA256':sha256(OVERLAY),'replaySHA256':sha256(Path(__file__).resolve()),
       'foregroundPixels':provenance['mask']['foregroundPixels']}))

if __name__ == '__main__':
    main()
