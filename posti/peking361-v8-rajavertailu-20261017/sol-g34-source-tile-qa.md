# Sol — G34 source tile QA

**Reject G34 for direct periodic use. Keep it unchanged as an appearance-reference candidate, not an approved or bound PBR asset.** Native1254×1254 image was viewed. T7 SHA matches receipt; originalNAS match: True. No source pixels were edited.

## Actual stone layout differs from prompt

Measured ordinary stone width **209.00px**, course pitch **70.50px**, pixel aspect **2.965:1**. This is approximately **6width periods and18visible course pieces**, not the requested10periods/20courses. There are17strong interior horizontal grout lines. Border-adjacent vertical grout can appear at bothx0/x1253; these duplicate edge detections are not extra physical stone columns.

Strong horizontal grout rows:[61, 132, 203, 274, 344, 414, 485, 555, 626, 697, 767, 837, 908, 978, 1048, 1119, 1189]. Ordinary interior course spacing is70–71px. The first visible piece is61px high and the last65px; together they span126px across a wrap.

## Direct-repeat seam fails

**Top/bottom cyclic grout gap is126px**, or **1.787× ordinary course pitch**, with no comparable strong horizontal separator at the join. The top and bottom vertical-joint phases differ by median98.50px, approximately half a stone. Direct wrap therefore produces a double-height/broken stagger course rather than the requested toroidal continuation.

| Border | Mean RGB8 jump | Ordinary adjacent-pixel mean | Ratio |95th percentile jump|
|---|---:|---:|---:|---:|
|top_bottom|23.5731|10.4262|2.261|58.0|
|left_right|14.3089|8.6095|1.662|38.0|

Left/right course-grout heights align within2px in the sampled22px edge strips; this does not prove grain/color continuity. Both border pairs show elevated differences; top/bottom has the structural phase/gap failure. Border difference alone is not a universal visual threshold, but here the geometric evidence independently rejects direct periodic use.

## Physical-scale calibration is not a repair

Matching ordinary median stones to nominal .95×.50m suggests about **5.70000×8.89362m** image extent; rough6×18count calibration gives5.7×9m. Neither is an approved seamless period. A square-world repeat would retain the roughly3:1 pixel stone ratio, and carrying over old30.4×32m or the prompt9.5×10m would mis-scale these actual stones.

For example, prompt9.5×10m extent makes ordinary stones about1.583×0.562m rather than .95×.50m. UV scale cannot supply the missing wrap course joint or correct stagger/color phase.

## Registered material remains a proposal

The mineral grain and worn/chipped edges can inform appearance feedback alongside immutableG33 and the visually rejectedC7. This is not a ready material. Any normal/MR and whole-cell mask must derive from validated **G34’s actual** mortar/stone boundaries, share its UV registration, and explicitly handle uncertain border components. OldC7analytic normals/MR/cell masks or G33labels do not match this network. Single-RGB grain brightness is not measured height or roughness.

Registered per-stone donors or UV-resynthesis read from the unchanged source are possible next investigations, not implemented/accepted here. No further generation loop, partial repainting or3Dbinding was performed. Receiver water evidence remains a separate pending dependency; this texture QA does not resolve it.

Only this MD/JSON pair written through externalT7 wrapper. No asset/source editing, Blender, image generation, Git, receiver message or delegation.
