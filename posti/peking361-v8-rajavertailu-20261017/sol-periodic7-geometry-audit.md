# Sol — periodic7 independent technical audit

**C7 passes the bounded source-geometry and raw-byte checks for private rendering.** C5 remains rejected for size; C6’s stored slivers required cleanup. This is not visual, runtime, receiver, device or owner acceptance. #362 remains separate.

## Actual C7 bytes and protected source

All three actual GLBs, their leaves and12NPZ maps were read. All72 sourceV6 GLB sizes were summed and three pilot replacements applied: **164,084,512B**, ceiling164,326,250B, **241,738B headroom**. These are source raw bytes, not KTX2 size or memory.

| LOD | GLB bytes | Actual triangles | Removed C6 slivers | Stored zero/negative faces |
|---|---:|---:|---:|---:|
|0|12,608,540|113,754|40|0/0|
|1|5,755,160|66,350|40|0/0|
|2|4,792,324|65,018|40|0/0|

Every inherited V6 image payload/material value remains exact; source texture/sampler prefix, nodes/scenes, tree indices/attributes and nonpaving ordered corner attributes remain exact. InteriorRepeat and collarClamp are distinct new opaquePBR materials, with PBR onUV0 and exactly preserved sourceAO binding onUV1. NoCOLOR_0 orUV2. All18 embedded new payloads match fresh whole generation2, which reads immutableg31 at32×16 perstone instead of16×8. No earlier raster was edited or upscaled.

## Exact survivor comparison and bounded removal

Every actual C7 ordered corner attribute, including POSITION, NORMAL, UV0 and AO UV1, matches the independently identified C6 survivors bit-for-bit. NPZ source IDs, barycentric weights, direction-zone IDs and collar-segment IDs exactly match the same retained subset. This independently verifies that cleanup removed only29 cast-zero and11 cast-negative slivers perLOD; it did not flip triangles or modify good faces. Every original source paving face still has surviving representation.

Conservative inherited bounds for new points: POSITION component interpolation error≤1.52396282829e-05m; NORMAL component error≤2.22044604925e-16; AO UV1 component error≤2.97990021547e-08; source-plane distance≤3.73583962917e-07m. Actual measured C6 point-rounding distance≤15.239643µm applies to its unchanged C7 survivors as an upper bound. There is no intended source-height or footprint displacement.

The40 removed faces perLOD sum **0.000161570758251m² before casting**, but **2.14446994522e-05m² of actual triangle area**. Their maximum actual edge extent is35.362m while all minimum altitudes are≤2.794µm. Comparing unions per original source face, removing them loses only **2.33361325598e-11m² actualXY area**, max1.88568899265e-11m² per source face. Actual C7 survivors exactly equal the virtually tested cleaned C6 set, so this measured bound carries over.

This is an explicit numerical-source tolerance judgment. It is not a claim of exact perfect unrounded coverage. BuilderfaceNewArea/maxPerSourceAreaPartitionError counts discarded pre-cast faces; that value alone cannot prove the stored C7 surface is a perfect mathematical partition. Both pre-cast discarded area and actualF32 union-loss bound are disclosed above. Leaf discard lists repeat between role summaries:80 raw records deduplicate to40 perLOD, not80 discarded faces. JSON carries each bad face’s source ID/role/weights/areas and per-source-face union loss.

## Direction zones, UV mapping and normals

Only artistic material-zone boundaries use a .005m simplification operation. Independent coordinates17,992→6,631, sum original-zone symmetric difference4.439243m²; actual paving-middle label change4.105006m². Measured raw-zone Hausdorff **5.639831mm**; .005m is the operation parameter, not a strict5mm Hausdorff maximum. Source building/ground footprints are never simplified. Zone angles remain unchanged; thin reassigned regions can switch to background0°, up to13.08943°. Source zone priority is retained.

C6’s independent UV/formula audit transfers through the exact C7 survivor comparison: each interior triangle uses its declared zone rotation and30.4×32m repeat mapping; each collar triangle uses the correct west/north/south atlas slot. The atlas raster deliberately uses original unsimplified direction zones, so the5.64mm mesh-zone approximation is explicit rather than exact zone-boundary preservation.

All72 actual collar normal/MR slots were independently reconstructed from source images and the periodic2 formula. Max encoded error is1 byte (west/north normal slots exact, south≤1); no new normal-direction discontinuity is inferred from that quantization-scale reconstruction residual. All12 generation2 normal/MR PNG payloads are byte-identical to whole generation1. New normal field is evaluated from the procedural height, not enlargedV7 pixels.

Current readable OmaMalli.shader uses raw RGB*2−1 and a derivative cotangent frame; its comment declares Cesium flipsV and image together, green unchanged. Under that declared imported-V frame, recipe(-dhE,-dhN) and slot rotations west(E,N), north(-N,E), south(N,-E) are consistent. Without that importV flip, the sign interpretation differs. The exact receiver loader/image/V handling and active shader build remain unverified; no unconditional target normal acceptance follows. Blender preview basis remains separate.

## New maps and periodicity

Whole generation2 image bytes: **3,784,208B**. LOD0 active albedo12,189,696px (72.65625% ofV7); each normal/MR958,464px (91.40625%). Texture dimensions are unchanged from the rectangular atlas plan and were read from encoded files. Actual GPU memory and receiver NPOT/block/mip conversion remain open.

Independent generation2 period shifts30.4m and32m give color/height/roughness errors≤2.1e−14 and finite-difference height-derivative mismatch≤1.04e−11 at the tested points. This is finite analytic evidence, not a proof of imperceptibleJPEG or mip seams. Periodic UV phases and zone direction match by formula; actual visual transitions/corners still require images.

Stone width .95m is nominal: the finite tile has row counts{'31': 17, '32': 21, '33': 26} for31/32/33 columns, giving aggregate mean width0.945843461m; row pitch averages .50m with a small periodic warp. Authored wear path and .025zone tone are omitted intentionally. Coarse boundary normal/MR bandwidth, original-old-stone segmentation, sourceUV-fit approximation, atlas gutters and coarse-mip bleeding remain separate quality limits.

## Remaining gates

Independent actual-frame review must evaluate new stone identity/direction, west/north/south old-edge and interior-edge sharpness, corners, grain and mip artifacts. Receiver conversion must preserve two material groups, Repeat/Clamp samplers and sourceAO UV1 and demonstrate rectangular texture support. Runtime normal-frame pin, motion/LOD, memory/FPS, device and owner acceptance are still required. No delivery approval is given by this source audit.

Only the authorized C5/6 and C7 MD/JSON report pairs were written through the externalT7 launcher. No Blender, GUI/browser, image/mesh/source/Git edits, receiver message or delegation.
